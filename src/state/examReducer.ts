import type { Exam, Question } from '../types';

export interface ExamState {
  currentQuestionId: number; // Welke vraag sta ik nu op?
  answers: Record<number, string>; // questionId -> chosen choiceId
  secondsRemaining: number; // Hoeveel tijd is er over?
  isSubmitted: boolean; // Is het examen ingediend?
}

// Derived, not stored in state:
// The Exam is static input (props), not mutable session state, so storing a flattened copy would just be a duplicate that never changes. Deriving it is cheap (one flatMap) and keeps ExamState free of anything that isn't truly "what changes as the user interacts."
export function getAllQuestions(exam: Exam): Question[] {
  // sections -> problems -> questions is a 3-level tree; flatMap twice turns
  // it into one flat, ordered array of Question.
  return exam.sections.flatMap((section) =>
    section.problems.flatMap((problem) => problem.questions),
  );
}

// Every possible thing that can happen to the exam, described as data
// instead of as a function call. The reducer below is the only place
// that turns one of these into an actual state change.
export type ExamAction =
  | { type: 'ANSWER'; choiceId: string } // always answers the current question, so no questionId needed
  | { type: 'NEXT'; questionIds: number[] } // ordered ids, so the reducer can find "current + 1" without knowing the exam
  | { type: 'PREVIOUS'; questionIds: number[] }
  | { type: 'GOTO_QUESTION'; questionId: number }
  | { type: 'TICK' } // fired once per second by a timer, decrements secondsRemaining
  | { type: 'SUBMIT' };

// The reducer itself: given the current state and an action describing what
// happened, return the NEW state. It never mutates `state` directly --
// every branch returns a fresh object built with `{ ...state, ... }`.
export function examReducer(state: ExamState, action: ExamAction): ExamState {
  switch (action.type) {
    // Record the chosen choice for whatever question we're currently on.
    // Once submitted, the exam is locked: answers can never change again.
    case 'ANSWER':
      if (state.isSubmitted) {
        return state;
      }
      return {
        ...state,
        answers: { ...state.answers, [state.currentQuestionId]: action.choiceId },
      };

    // Move to the next question in the given order, but don't go past the end.
    case 'NEXT': {
      const index = action.questionIds.indexOf(state.currentQuestionId);
      const isLast = index === -1 || index === action.questionIds.length - 1;
      return isLast ? state : { ...state, currentQuestionId: action.questionIds[index + 1] };
    }

    // Same idea, but moving backwards and stopping at the first question.
    case 'PREVIOUS': {
      const index = action.questionIds.indexOf(state.currentQuestionId);
      const isFirst = index <= 0;
      return isFirst ? state : { ...state, currentQuestionId: action.questionIds[index - 1] };
    }

    // Jump straight to a specific question, e.g. from a "question overview" grid.
    case 'GOTO_QUESTION':
      return { ...state, currentQuestionId: action.questionId };

    // Countdown timer tick. Clamped at 0, and hitting 0 auto-submits the exam.
    case 'TICK': {
      const secondsRemaining = Math.max(0, state.secondsRemaining - 1);
      return { ...state, secondsRemaining, isSubmitted: state.isSubmitted || secondsRemaining === 0 };
    }

    case 'SUBMIT':
      return { ...state, isSubmitted: true };

    // TypeScript checks that every ExamAction['type'] is handled above;
    // this default only exists as a safety net and should be unreachable.
    default:
      return state;
  }
}
