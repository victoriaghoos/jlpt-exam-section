import type { Exam, Problem, Question } from '../types';

export interface ExamState {
  currentQuestionIndex: number; 
  totalQuestions: number; 
  answers: Record<number, string>; 
  secondsRemaining: number; 
  isSubmitted: boolean; 
}

export interface QuestionEntry {
  question: Question;
  problem: Problem; 
}

export function getQuestionEntries(exam: Exam): QuestionEntry[] {
  return exam.sections.flatMap((section) =>
    section.problems.flatMap((problem) =>
      problem.questions.map((question) => ({ question, problem })),
    ),
  );
}

export type ExamAction =
  | { type: 'ANSWER'; choiceId: string; index?: number } 
  | { type: 'NEXT' } 
  | { type: 'PREVIOUS' }
  | { type: 'GOTO_QUESTION'; index: number } 
  | { type: 'TICK' } 
  | { type: 'SUBMIT' };

export function examReducer(state: ExamState, action: ExamAction): ExamState {
  switch (action.type) {
    case 'ANSWER': {
      if (state.isSubmitted) {
        return state;
      }
      const index = action.index ?? state.currentQuestionIndex;
      if (index < 0 || index >= state.totalQuestions) {
        return state;
      }
      return {
        ...state,
        answers: { ...state.answers, [index]: action.choiceId },
      };
    }

    case 'NEXT': {
      const currentQuestionIndex = Math.min(state.currentQuestionIndex + 1, state.totalQuestions - 1);
      return { ...state, currentQuestionIndex };
    }

    case 'PREVIOUS': {
      const currentQuestionIndex = Math.max(state.currentQuestionIndex - 1, 0);
      return { ...state, currentQuestionIndex };
    }

    case 'GOTO_QUESTION':
      return action.index >= 0 && action.index < state.totalQuestions
        ? { ...state, currentQuestionIndex: action.index }
        : state;

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
