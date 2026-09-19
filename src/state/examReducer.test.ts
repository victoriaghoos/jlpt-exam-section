import { describe, expect, it } from 'vitest';
import { examReducer, type ExamState } from './examReducer';

function makeState(overrides: Partial<ExamState> = {}): ExamState {
  return {
    currentQuestionIndex: 0,
    totalQuestions: 3,
    answers: {},
    secondsRemaining: 60,
    isSubmitted: false,
    ...overrides,
  };
}

describe('examReducer', () => {
  describe('ANSWER', () => {
    it('records the choice under the current question index', () => {
      const state = makeState({ currentQuestionIndex: 1 });
      const next = examReducer(state, { type: 'ANSWER', choiceId: 'c2' });
      expect(next.answers).toEqual({ 1: 'c2' });
    });

    it('overwrites a previous answer for the same question', () => {
      const state = makeState({ currentQuestionIndex: 0, answers: { 0: 'c1' } });
      const next = examReducer(state, { type: 'ANSWER', choiceId: 'c3' });
      expect(next.answers).toEqual({ 0: 'c3' });
    });

    it('is a no-op once the exam is submitted', () => {
      const state = makeState({ isSubmitted: true, answers: { 0: 'c1' } });
      const next = examReducer(state, { type: 'ANSWER', choiceId: 'c2' });
      expect(next).toBe(state);
    });
  });

  describe('NEXT', () => {
    it('advances to the next question', () => {
      const state = makeState({ currentQuestionIndex: 0 });
      const next = examReducer(state, { type: 'NEXT' });
      expect(next.currentQuestionIndex).toBe(1);
    });

    it('stops at the last question', () => {
      const state = makeState({ currentQuestionIndex: 2, totalQuestions: 3 });
      const next = examReducer(state, { type: 'NEXT' });
      expect(next.currentQuestionIndex).toBe(2);
    });
  });

  describe('PREVIOUS', () => {
    it('goes back to the previous question', () => {
      const state = makeState({ currentQuestionIndex: 2 });
      const next = examReducer(state, { type: 'PREVIOUS' });
      expect(next.currentQuestionIndex).toBe(1);
    });

    it('stops at the first question', () => {
      const state = makeState({ currentQuestionIndex: 0 });
      const next = examReducer(state, { type: 'PREVIOUS' });
      expect(next.currentQuestionIndex).toBe(0);
    });
  });

  describe('GOTO_QUESTION', () => {
    it('jumps to a valid index', () => {
      const state = makeState({ currentQuestionIndex: 0, totalQuestions: 3 });
      const next = examReducer(state, { type: 'GOTO_QUESTION', index: 2 });
      expect(next.currentQuestionIndex).toBe(2);
    });

    it('ignores a negative index', () => {
      const state = makeState({ currentQuestionIndex: 1 });
      const next = examReducer(state, { type: 'GOTO_QUESTION', index: -1 });
      expect(next).toBe(state);
    });

    it('ignores an index at or beyond totalQuestions', () => {
      const state = makeState({ currentQuestionIndex: 1, totalQuestions: 3 });
      const next = examReducer(state, { type: 'GOTO_QUESTION', index: 3 });
      expect(next).toBe(state);
    });
  });

  describe('TICK', () => {
    it('decrements secondsRemaining', () => {
      const state = makeState({ secondsRemaining: 10 });
      const next = examReducer(state, { type: 'TICK' });
      expect(next.secondsRemaining).toBe(9);
      expect(next.isSubmitted).toBe(false);
    });

    it('clamps at 0 and auto-submits when time runs out', () => {
      const state = makeState({ secondsRemaining: 1 });
      const next = examReducer(state, { type: 'TICK' });
      expect(next.secondsRemaining).toBe(0);
      expect(next.isSubmitted).toBe(true);
    });

    it('is idempotent once time has already run out', () => {
      const state = makeState({ secondsRemaining: 0, isSubmitted: true });
      const next = examReducer(state, { type: 'TICK' });
      expect(next.secondsRemaining).toBe(0);
      expect(next.isSubmitted).toBe(true);
    });
  });

  describe('SUBMIT', () => {
    it('marks the exam as submitted', () => {
      const state = makeState();
      const next = examReducer(state, { type: 'SUBMIT' });
      expect(next.isSubmitted).toBe(true);
    });
  });

  it('does not mutate the previous state', () => {
    const state = makeState();
    examReducer(state, { type: 'ANSWER', choiceId: 'c1' });
    expect(state.answers).toEqual({});
  });

  it('keeps existing answers when navigating', () => {
    const state = makeState({ currentQuestionIndex: 0, answers: { 0: 'c1' } });
    const next = examReducer(state, { type: 'NEXT' });
    expect(next.answers).toEqual({ 0: 'c1' });
  });
});
