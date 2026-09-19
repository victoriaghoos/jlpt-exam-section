import type { Choice } from '../types';

interface ChoiceListProps {
  choices: Choice[];
  choiceLayout: 'grid' | 'stack'; // short choices sit in a grid; full sentences stack
  selectedChoiceId?: string;
  onSelect: (choiceId: string) => void;
}

export function ChoiceList({ choices, choiceLayout, selectedChoiceId, onSelect }: ChoiceListProps) {
  return (
    <div className={`choice-list choice-list--${choiceLayout}`}>
      {choices.map((choice, index) => (
        <button
          key={choice.id}
          type="button"
          className={choice.id === selectedChoiceId ? 'choice choice--selected' : 'choice'}
          aria-pressed={choice.id === selectedChoiceId}
          onClick={() => onSelect(choice.id)}
        >
          <span className="choice__number">{index + 1}</span>
          {choice.text}
        </button>
      ))}
    </div>
  );
}
