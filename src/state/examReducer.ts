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
  return exam.sections.flatMap((section) =>
    section.problems.flatMap((problem) => problem.questions),
  );
}

export type ExamAction =
  | { type: 'ANSWER'; choiceId: string } // always answers the current question, so no questionId needed
  | { type: 'GOTO_QUESTION'; questionId: number }
  | { type: 'TICK' }
  | { type: 'SUBMIT' };
