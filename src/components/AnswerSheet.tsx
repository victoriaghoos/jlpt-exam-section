import type { QuestionEntry } from '../state/examReducer';

interface AnswerSheetProps {
  entries: QuestionEntry[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  isSubmitted: boolean;
  onSelectQuestion: (index: number) => void;
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

            return (
              <button
                key={question.id}
                type="button"
                className={
                  isCurrent ? 'answer-sheet__row answer-sheet__row--current' : 'answer-sheet__row'
                }
                aria-current={isCurrent ? 'true' : undefined}
                aria-label={`Question ${question.id}, ${selectedChoiceId ? 'answered' : 'not answered'}`}
                onClick={() => onSelectQuestion(index)}
              >
                <span className="answer-sheet__number">{question.id}</span>
                {question.choices.map((choice, choiceIndex) => (
                  <span
                    key={choice.id}
                    className={
                      choice.id === selectedChoiceId
                        ? 'answer-sheet__bubble answer-sheet__bubble--selected'
                        : 'answer-sheet__bubble'
                    }
                  >
                    {choiceIndex + 1}
                  </span>
                ))}
              </button>
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
