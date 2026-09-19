import type { Choice } from '../types';

interface ChoiceListProps {
  choices: Choice[];
  choiceLayout: 'grid' | 'stack'; // short choices sit in a grid; full sentences stack
  selectedChoiceId?: string;
  correctChoiceId: string;
  isSubmitted: boolean;
  onSelect: (choiceId: string) => void;
}

export function ChoiceList({
  choices,
  choiceLayout,
  selectedChoiceId,
  correctChoiceId,
  isSubmitted,
  onSelect,
}: ChoiceListProps) {
  return (
    <div className={`choice-list choice-list--${choiceLayout}`}>
      {choices.map((choice, index) => {
        const isCorrect = choice.id === correctChoiceId;
        const isSelected = choice.id === selectedChoiceId;

        return (
          <div key={choice.id} className="choice-wrapper">
            <button
              type="button"
              className={[
                'choice',
                isSelected && 'choice--selected',
                isSubmitted && isCorrect && 'choice--correct',
                isSubmitted && isSelected && !isCorrect && 'choice--incorrect',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isSelected}
              disabled={isSubmitted}
              onClick={() => onSelect(choice.id)}
            >
              <span className="choice__number">{index + 1}</span>
              {choice.text}
              {/* color alone can't distinguish correct/incorrect, so a mark backs it up */}
              {isSubmitted && isCorrect && (
                <span className="choice__mark choice__mark--correct" aria-hidden="true">
                  ✓
                </span>
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <span className="choice__mark choice__mark--incorrect" aria-hidden="true">
                  ✕
                </span>
              )}
            </button>
            {/* every choice carries a why, shown for right and wrong alike once submitted */}
            {isSubmitted && <p className="choice__why">{choice.why}</p>}
          </div>
        );
      })}
    </div>
  );
}

