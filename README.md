# JLPT exam section

A self-contained exam-taking screen for the N5 Vocabulary section: one question at a time, a countdown timer, and an answer sheet that doubles as navigation. Rebuilt from [gomi-sensei.com/app](https://gomi-sensei.com/app/).

I wrote [`docs/PLAN.md`](./docs/PLAN.md) before writing any code; it covers the observed behaviour, what I took from the reference implementation, and where I deliberately diverged.

![Screenshot of the exam section, showing a kanji-reading question, the timer, and the answer sheet](./docs/screenshot.png)

## Running it

```bash
npm install
npm run dev      # start the dev server
npm test         # run the reducer and data tests
npx oxlint       # lint
npm run build    # typecheck (tsc -b) and build for production
```

## Structure

```
src/
  types.ts               exam/section/problem/question/choice data model
  data/
    n5-exam-1.ts         the N5 exam content, typed against types.ts
    n5-exam-1.test.ts    data integrity: correctChoiceId must point at a real choice
  state/
    examReducer.ts       ExamState, ExamAction, and the reducer
    examReducer.test.ts  reducer tests -- this is the tested surface, not the UI
  components/            StemRenderer, ChoiceList, QuestionCard, AnswerSheet, Timer
  App.tsx                wires useReducer to the components, timer tick, keyboard shortcuts
docs/
  PLAN.md                the plan, written before any code
  section*.png           the reference screens the plan refers to
```

## Key decisions

The reasoning lives in [`docs/PLAN.md`](./docs/PLAN.md); this is the short version.

- **Stems are segments, not HTML strings** (`{ kind: 'text' | 'target' | 'blank' }`), so rendering never touches `dangerouslySetInnerHTML` and a blank stays semantically a blank rather than a string containing （　）.
- **The answer key is a `correctChoiceId`**, not a positional index, so reordering or shuffling choices can't silently break it.
- **State is a single `useReducer`** with six actions (`ANSWER`, `NEXT`, `PREVIOUS`, `GOTO_QUESTION`, `TICK`, `SUBMIT`). No store library: one exam session doesn't need one.
- **Every choice carries a `why`**, shown for right and wrong answers alike once submitted. That explanation is the product, not the quiz.

## Where the type system stops

`correctChoiceId` is a `string`. TypeScript checks that it is one, and nothing more; a typo would compile, run, and mark the wrong answer correct with no error anywhere. That is one mistake in the content that would be invisible, so `data/n5-exam-1.test.ts` asserts every `correctChoiceId` refers to a choice that actually exists.

## What changed along the way

The plan was written before the code and is left as-is on purpose: a plan that matches the implementation exactly is a plan that was edited afterwards. Two things changed while building.

**Question identity in the reducer went from id to index.** The first pass kept `currentQuestionId`, which meant `NEXT`, `PREVIOUS` and `GOTO_QUESTION` each had to be handed the full ordered list of question ids so the reducer could work out "current + 1" without knowing the exam. That worked, but three of six actions were carrying a list they didn't conceptually own: an action should describe what happened, not the context it happened in. Switching to `currentQuestionIndex` plus `totalQuestions` in state turned `NEXT` and `PREVIOUS` into a bare `Math.min` / `Math.max` and `GOTO_QUESTION` into a bounds check, and the reducer stopped needing anything from the caller beyond a number.

**`answers` ended up keyed by index, not question id**: which looks like exactly the inconsistency `correctChoiceId` exists to avoid on the choices side. The difference is that the question list is never reordered or shuffled within a session, unlike choices, which the plan explicitly flags as a future shuffle candidate. Position is stable for as long as the state exists. It's noted as a gap below rather than defended as ideal.

## Known gaps

- **No end-to-end tests.** Vitest covers the reducer and the data in isolation; nothing exercises the rendered UI or a full click-through.
- **No results screen.** Submitting reveals the correct choice and its `why` inline, per question. The separate summary view is out of scope per the plan; the score is derivable from `answers`, so it would be a view on existing state rather than new logic.
- **No choice shuffling.** `correctChoiceId` makes it safe to add, but nothing shuffles yet.
- **No shared reading passages.** Real JLPT reading sections attach several questions to one passage. The structure extends to it; a `passage` field on `Problem`, which already owns shared content; but I'd rather write that down than build it speculatively.
- **`answers` is keyed by index**, see above. Fine today; would need revisiting if questions ever became reorderable mid-session.

## About the content

The questions in `src/data/n5-exam-1.ts` are an original set written in the reference's format (stems, choices and `why` explanations) not a copy of its question bank. Five items match what the reference shows publicly; the rest are written here so the section has its full 21 questions and the answer sheet renders as it would in production.