// a stem is the sentence a question asks about, represented as segments rather than HTML. This allows the renderer to control how targets and blanks are displayed without using dangerouslySetInnerHTML.

export type StemSegment =
  | { kind: 'text'; value: string }
  | { kind: 'target'; value: string }
  | { kind: 'blank' };

export interface Choice {
  id: string;
  text: string;
  why: string; // why this choice is correct or incorrect.
  wordId?: string; // optional link to a dictionary entry, e.g. 'n5-717'.
}

export interface Question {
  id: number;
  stem: StemSegment[];
  translation: string; // English translation of the stem.
  choices: Choice[];
  correctChoiceId: string;
}

export type ProblemKind =
  | 'kanji-reading'
  | 'spelling'
  | 'word-in-context'
  | 'same-meaning';

export interface Problem {
  id: string;
  kind: ProblemKind;
  label: string; // e.g., 'もんだい 1'
  instruction: { ja: string; en: string };
  choiceLayout: 'grid' | 'stack'; // short choices sit in a grid; full sentences stack.
  questions: Question[];
}

export interface Section {
  id: string;
  title: { ja: string; en: string }; // e.g., { ja: 'もじ・ごい', en: 'Vocabulary' }
  minutes: number;
  problems: Problem[];
}

export interface Exam {
  id: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  number: number;
  sections: Section[];
}