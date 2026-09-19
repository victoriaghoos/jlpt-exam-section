import { useMemo, useReducer } from 'react';
import './App.css';
import { StemRenderer } from './components/StemRenderer';
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

  return (
    <div>
      <p>{problem.label}</p>
      <p>
        <StemRenderer segments={question.stem} />
      </p>
      <button onClick={() => dispatch({ type: 'PREVIOUS' })}>Back</button>
      <button onClick={() => dispatch({ type: 'NEXT' })}>Next</button>
    </div>
  );
}