import type { QuestionEntry } from '../state/examReducer';

interface AnswerSheetProps {
  entries: QuestionEntry[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  isSubmitted: boolean;
  onSelectQuestion: (index: number) => void;
  onMarkAnswer: (index: number, choiceId: string) => void; // marks a choice for a question without it being the current one
  onSubmit: () => void;
}

interface ProblemGroup {
  problemId: string;
  label: string;
  rows: { index: number; question: QuestionEntry['question'] }[];
}

// Entries come out of getQuestionEntries grouped by problem already (the
// source tree is problems -> questions), so a consecutive-run grouping is
// enough -- no need to sort or key by id.
function groupByProblem(entries: QuestionEntry[]): ProblemGroup[] {
  const groups: ProblemGroup[] = [];
  entries.forEach((entry, index) => {
    const currentGroup = groups.at(-1);
    if (currentGroup?.problemId === entry.problem.id) {
      currentGroup.rows.push({ index, question: entry.question });
    } else {
      groups.push({
        problemId: entry.problem.id,
        label: entry.problem.label,
        rows: [{ index, question: entry.question }],
      });
    }
  });
  return groups;
}

export function AnswerSheet({
  entries,
  currentQuestionIndex,
  answers,
  isSubmitted,
  onSelectQuestion,
  onMarkAnswer,
  onSubmit,
}: AnswerSheetProps) {
  const answeredCount = Object.keys(answers).length;
  const groups = groupByProblem(entries);

  return (
    <nav className="answer-sheet" aria-label="Answer sheet">
      <p className="answer-sheet__count" aria-live="polite">
        {answeredCount} / {entries.length} answered
      </p>

      {groups.map((group) => (
        <div key={group.problemId} className="answer-sheet__group">
          <h3 className="answer-sheet__group-label">{group.label}</h3>

          {group.rows.map(({ index, question }) => {
            const selectedChoiceId = answers[index];
            const isCurrent = index === currentQuestionIndex;
            const choiceNumber = question.choices.findIndex((choice) => choice.id === selectedChoiceId) + 1;

            return (
              // A row is a group, not a button: the number navigates, but each
              // bubble is its own button so an answer can be marked directly
              // from the sheet, without nesting interactive elements.
              <div
                key={question.id}
                className={
                  isCurrent ? 'answer-sheet__row answer-sheet__row--current' : 'answer-sheet__row'
                }
                role="group"
                aria-label={`Question ${question.id}, ${selectedChoiceId ? `marked ${choiceNumber}` : 'blank'}`}
              >
                <button
                  type="button"
                  className="answer-sheet__number"
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => onSelectQuestion(index)}
                >
                  {question.id}
                </button>
                {question.choices.map((choice, choiceIndex) => (
                  <button
                    key={choice.id}
                    type="button"
                    className={
                      choice.id === selectedChoiceId
                        ? 'answer-sheet__bubble answer-sheet__bubble--selected'
                        : 'answer-sheet__bubble'
                    }
                    aria-pressed={choice.id === selectedChoiceId}
                    aria-label={`Mark question ${question.id} as ${choiceIndex + 1}`}
                    onClick={() => onMarkAnswer(index, choice.id)}
                  >
                    {choiceIndex + 1}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      <button type="button" className="answer-sheet__submit" disabled={isSubmitted} onClick={onSubmit}>
        {isSubmitted ? 'Handed in' : 'Hand it in'}
      </button>
    </nav>
  );
}
