import type { Problem, Question, Section } from '../types';
import { ChoiceList } from './ChoiceList';
import { StemRenderer } from './StemRenderer';

interface QuestionCardProps {
  section: Pick<Section, 'title' | 'titleEn'>;
  problem: Problem;
  question: Question;
  selectedChoiceId?: string;
  isSubmitted: boolean;
  onSelect: (choiceId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionCard({
  section,
  problem,
  question,
  selectedChoiceId,
  isSubmitted,
  onSelect,
  onNext,
  onPrevious,
}: QuestionCardProps) {
  return (
    <section className="question-card">
      <div className="question-card__header">
        <h2 className="question-card__label">{problem.label}</h2>
        <p className="question-card__section">
          <span lang="ja">{section.title}</span> · {section.titleEn}
        </p>
      </div>
      <p className="question-card__instruction" lang="ja">
        {problem.instruction.ja}
      </p>
      <p className="question-card__instruction question-card__instruction--en">{problem.instruction.en}</p>

      <p className="question-card__number">{question.id}</p>
      <p className="question-card__stem">
        <StemRenderer segments={question.stem} />
      </p>
      {/* the translation is only a spoiler once the answer is already revealed */}
      {isSubmitted && <p className="question-card__translation">{question.translation}</p>}

      <ChoiceList
        choices={question.choices}
        choiceLayout={problem.choiceLayout}
        selectedChoiceId={selectedChoiceId}
        correctChoiceId={question.correctChoiceId}
        isSubmitted={isSubmitted}
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
