import { describe, expect, it } from 'vitest';
import { n5Exam1 } from './n5-exam-1';

// this test ensures that every correctChoiceId in the n5Exam1 data refers to an existing choice. correctChoiceId is a string, so a typo could otherwise go unnoticed.

describe('n5-exam-1 data', () => {
  it('every correctChoiceId refers to a choice that exists', () => {
    const questions = n5Exam1.sections
      .flatMap((section) => section.problems)
      .flatMap((problem) => problem.questions);

    for (const question of questions) {
      const ids = question.choices.map((choice) => choice.id);
      expect(ids, `question ${question.id}`).toContain(question.correctChoiceId);
    }
  });
});
