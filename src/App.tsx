import { useEffect, useMemo, useReducer, useRef } from 'react';
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

  // Read inside the keydown listener without making it a dependency, so the
  // listener is bound once instead of rebinding on every question change.
  // Updated in an effect, not during render, since mutating a ref while
  // rendering is a side effect React's docs advise against.
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Ticks once per second; stops once submitted so it doesn't keep
  // dispatching after the exam is locked.
  useEffect(() => {
    if (state.isSubmitted) return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [state.isSubmitted]);

  // Keyboard shortcuts: 1-4 marks a choice, arrows turn the page, Enter advances.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      // don't hijack keys while the user is typing somewhere else
      if (target instanceof HTMLElement && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      // a focused button already activates on Enter; don't also advance the question
      if (target instanceof HTMLElement && target.tagName === 'BUTTON' && event.key === 'Enter') {
        return;
      }

      if (event.key >= '1' && event.key <= '4') {
        // ChoiceList disables its buttons once submitted; keep the keyboard in sync
        if (stateRef.current.isSubmitted) return;
        const currentQuestion = entries[stateRef.current.currentQuestionIndex].question;
        const choice = currentQuestion.choices[Number(event.key) - 1];
        if (choice) dispatch({ type: 'ANSWER', choiceId: choice.id });
      } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
        dispatch({ type: 'NEXT' });
      } else if (event.key === 'ArrowLeft') {
        dispatch({ type: 'PREVIOUS' });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [entries]);

  return (
    <div className="app">
      {/* sr-only: announces the current position separately from the visible timer/count regions */}
      <p className="sr-only" aria-live="polite">
        Question {state.currentQuestionIndex + 1} of {state.totalQuestions}
      </p>

      <div className="app__main">
        <QuestionCard
          problem={problem}
          question={question}
          selectedChoiceId={state.answers[state.currentQuestionIndex]}
          isSubmitted={state.isSubmitted}
          onSelect={(choiceId) => dispatch({ type: 'ANSWER', choiceId })}
          onNext={() => dispatch({ type: 'NEXT' })}
          onPrevious={() => dispatch({ type: 'PREVIOUS' })}
        />
      </div>

      <div className="app__sidebar">
        <Timer secondsRemaining={state.secondsRemaining} />

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
    </div>
  );
}