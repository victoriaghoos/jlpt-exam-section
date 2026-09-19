import { useEffect, useMemo, useReducer } from 'react';
import './App.css';
import { AnswerSheet } from './components/AnswerSheet';
import { QuestionCard } from './components/QuestionCard';
import { Timer } from './components/Timer';
import { n5Exam1 } from './data/n5-exam-1';
import { examReducer, getQuestionEntries } from './state/examReducer';

export default function App() {
  const entries = useMemo(() => getQuestionEntries(n5Exam1), []);
  const [state, dispatch] = useReducer(examReducer, {
    currentQuestionIndex: 0,
    totalQuestions: entries.length,
    answers: {},
    secondsRemaining: n5Exam1.sections[0].minutes * 60,
    isSubmitted: false,
  });

  const { question, problem } = entries[state.currentQuestionIndex];

  // Ticks once per second; stops once submitted so it doesn't keep
  // dispatching after the exam is locked.
  useEffect(() => {
    if (state.isSubmitted) return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [state.isSubmitted]);

  return (
    <div>
      <Timer secondsRemaining={state.secondsRemaining} />

      {/* sr-only: announces the current position separately from the visible timer/count regions */}
      <p className="sr-only" aria-live="polite">
        Question {state.currentQuestionIndex + 1} of {state.totalQuestions}
      </p>

      <QuestionCard
        problem={problem}
        question={question}
        selectedChoiceId={state.answers[state.currentQuestionIndex]}
        onSelect={(choiceId) => dispatch({ type: 'ANSWER', choiceId })}
        onNext={() => dispatch({ type: 'NEXT' })}
        onPrevious={() => dispatch({ type: 'PREVIOUS' })}
      />

      <AnswerSheet
        entries={entries}
        currentQuestionIndex={state.currentQuestionIndex}
        answers={state.answers}
        isSubmitted={state.isSubmitted}
        onSelectQuestion={(index) => dispatch({ type: 'GOTO_QUESTION', index })}
        onMarkAnswer={(index, choiceId) => dispatch({ type: 'ANSWER', choiceId, index })}
        onSubmit={() => dispatch({ type: 'SUBMIT' })}
      />
    </div>
  );
}