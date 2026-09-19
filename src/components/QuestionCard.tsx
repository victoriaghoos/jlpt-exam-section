import type { Problem, Question } from '../types';
import { ChoiceList } from './ChoiceList';
import { StemRenderer } from './StemRenderer';

interface QuestionCardProps {
  problem: Problem;
  question: Question;
  selectedChoiceId?: string;
  onSelect: (choiceId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionCard({
  problem,
  question,
  selectedChoiceId,
  onSelect,
  onNext,
  onPrevious,
}: QuestionCardProps) {
  return (
    <section className="question-card">
      <h2 className="question-card__label">{problem.label}</h2>
      <p className="question-card__instruction" lang="ja">
        {problem.instruction.ja}
      </p>
      <p className="question-card__instruction question-card__instruction--en">{problem.instruction.en}</p>

      <p className="question-card__number">{question.id}</p>
      <p className="question-card__stem">
        <StemRenderer segments={question.stem} />
      </p>

      <ChoiceList
        choices={question.choices}
        choiceLayout={problem.choiceLayout}
        selectedChoiceId={selectedChoiceId}
        onSelect={onSelect}
      />

      <div className="question-card__nav">
        <button type="button" onClick={onPrevious}>
          Back
        </button>
        <button type="button" onClick={onNext}>
          Next
        </button>
      </div>
    </section>
  );
}
