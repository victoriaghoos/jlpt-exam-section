export interface ExamState {
  currentQuestionId: number; // Welke vraag sta ik nu op?
  answers: Record<number, string>; // questionId -> chosen choiceId 
  secondsRemaining: number; // Hoeveel tijd is er over?
  isSubmitted: boolean; // Is het examen ingediend?
}
