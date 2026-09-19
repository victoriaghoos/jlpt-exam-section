import type { Exam, Problem, Question } from '../types';

export interface ExamState {
  currentQuestionIndex: number; // position in the flat question list, not a question id
  totalQuestions: number; // bounds for NEXT/PREVIOUS/GOTO_QUESTION, so the reducer never needs the exam itself
  // Keyed by index, not question id -- unlike choices (see correctChoiceId in
  // types.ts), the question list itself is never reordered or shuffled within
  // a session, so position is stable for as long as this state exists.
  answers: Record<number, string>; // questionIndex -> chosen choiceId
  secondsRemaining: number; // time left on the countdown timer
  isSubmitted: boolean; // whether the exam has been handed in
}

export interface QuestionEntry {
  question: Question;
  problem: Problem; // instruction, label and choice layout live on the problem, not the question
}

// Derived, not stored in state:
// The Exam is static input (props), not mutable session state, so storing a flattened copy would just be a duplicate that never changes. Deriving it is cheap (one flatMap) and keeps ExamState free of anything that isn't truly "what changes as the user interacts."
// Used by the UI to build `totalQuestions` and to look up `entries[currentQuestionIndex]` when rendering -- the reducer itself never calls this.
export function getQuestionEntries(exam: Exam): QuestionEntry[] {
  // sections -> problems -> questions is a 3-level tree; flatMap twice turns
  // it into one flat, ordered array, pairing each question with its problem
  // so a renderer never has to search the tree back up for it.
  return exam.sections.flatMap((section) =>
    section.problems.flatMap((problem) =>
      problem.questions.map((question) => ({ question, problem })),
    ),
  );
}

// Every possible thing that can happen to the exam, described as data
// instead of as a function call. The reducer below is the only place
// that turns one of these into an actual state change.
export type ExamAction =
  | { type: 'ANSWER'; choiceId: string; index?: number } // defaults to the current question; an explicit index marks a different one directly
  | { type: 'NEXT' } // bounded by state.totalQuestions, no payload needed
  | { type: 'PREVIOUS' }
  | { type: 'GOTO_QUESTION'; index: number } // validated against state.totalQuestions
  | { type: 'TICK' } // fired once per second by a timer, decrements secondsRemaining
  | { type: 'SUBMIT' };

// The reducer itself: given the current state and an action describing what
// happened, return the NEW state. It never mutates `state` directly --
// every branch returns a fresh object built with `{ ...state, ... }`.
export function examReducer(state: ExamState, action: ExamAction): ExamState {
  switch (action.type) {
    // Record the chosen choice for the target question (current, unless one is given).
    // Once submitted, the exam is locked: answers can never change again.
    case 'ANSWER': {
      if (state.isSubmitted) {
        return state;
      }
      const index = action.index ?? state.currentQuestionIndex;
      return {
        ...state,
        answers: { ...state.answers, [index]: action.choiceId },
      };
    }

    // Move to the next question, but don't go past the last one.
    case 'NEXT': {
      const currentQuestionIndex = Math.min(state.currentQuestionIndex + 1, state.totalQuestions - 1);
      return { ...state, currentQuestionIndex };
    }

    // Same idea, but moving backwards and stopping at the first question.
    case 'PREVIOUS': {
      const currentQuestionIndex = Math.max(state.currentQuestionIndex - 1, 0);
      return { ...state, currentQuestionIndex };
    }

    // Jump straight to a specific question, e.g. from a "question overview" grid.
    // Ignored if out of range, so state never points at a non-existent question.
    case 'GOTO_QUESTION':
      return action.index >= 0 && action.index < state.totalQuestions
        ? { ...state, currentQuestionIndex: action.index }
        : state;

    // Countdown timer tick. Clamped at 0, and hitting 0 auto-submits the exam.
    case 'TICK': {
      const secondsRemaining = Math.max(0, state.secondsRemaining - 1);
      return { ...state, secondsRemaining, isSubmitted: state.isSubmitted || secondsRemaining === 0 };
    }

    case 'SUBMIT':
      return { ...state, isSubmitted: true };

    // Assigning to `never` forces a compile error if a case above is missing.
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}
