import type { Exam, Problem, Question, Section } from '../types';
import { ChoiceList } from './ChoiceList';
import { StemRenderer } from './StemRenderer';

interface QuestionCardProps {
  exam: Pick<Exam, 'level' | 'number'>;
  section: Pick<Section, 'title'>;
  problem: Problem;
  question: Question;
  selectedChoiceId?: string;
  isSubmitted: boolean;
  onSelect: (choiceId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionCard({
  exam,
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
      <div className="question-card__meta">
        <span>
          {exam.level} Practice Exam {exam.number}
        </span>
        <span>
          <span lang="ja">{section.title.ja}</span> {section.title.en}
        </span>
      </div>
      <h2 className="question-card__label">{problem.label}</h2>

      <p className="question-card__instruction" lang="ja">
        {problem.instruction.ja}
      </p>
      <p className="question-card__instruction question-card__instruction--en">{problem.instruction.en}</p>

      <p className="question-card__number">{question.id}</p>
      <p className="question-card__stem">
        <StemRenderer segments={question.stem} />
      </p>
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
          ‹ Back
        </button>
        <button type="button" onClick={onNext}>
          Next ›
        </button>
      </div>
      <p className="question-card__hint">1 2 3 4 mark • ← → turn • Enter next</p>
    </section>
  );
}
