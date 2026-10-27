---
name: testing
description: >-
  Map the change to tests and add them with the code. Every new or changed
  component and page gets an automated test. Use the repo's runner. Required
  before calling UI work done.
disable-model-invocation: true
---

# Testing

Required for any UI or behavior change. Open this before [browser-validation](../browser-validation/SKILL.md). Browser checks do not replace these tests.

Use the runner the repo already has (Vitest, Jest, Testing Library, Playwright, Cypress). Do not add a new framework. A new app gets Vitest and React Testing Library from [project-init](../project-init/SKILL.md), and Playwright only when the user asked for E2E there.

In feature-implementation and bug-fix, the `test-writer` agent runs this skill.

A copy or token tweak with no behavior change can skip automated tests. Say why. A new or changed component or page cannot skip.

## What to cover

List what the user should see, then pick the cheapest test that proves it:

| Need | Usually |
|------|---------|
| Component renders and calls back | Component test |
| Hook key, pure helper | Unit test |
| A control on the screen that changes the route or the screen state | Component test: click it and assert the next heading, dialog, or disabled state. The browser still does the visual check. A test that only finds the title is not that click |
| Real click-through in the browser | Browser validation, plus an e2e test when the repo has that suite (project-init adds it when the user asked for E2E) |
| Loading, empty, error | Component test with the network stubbed, and the browser when the UI is the point |
| Keyboard on a custom control | Component test |

Cover happy, loading, empty, and error when the screen has those states. Include keyboard when the control is custom. Long text, slow network, or offline only when the ask requires them.

## Many screens

Each new page gets assertions for its primary action and each designed state (selected, empty, error, drawer). One walk from the first screen to the last does not cover the other pages. The number of pages does not drop those assertions.

A loop that renders several screens and asserts only the title fails. Each screen’s test names that screen’s primary action and the result. States that exist on that screen are asserted on that screen. A sibling’s test does not cover them.

## Where tests go

- Default: a colocated `__tests__` folder (`src/components/__tests__/StatusFilter.test.tsx`). Do not drop `Foo.test.tsx` beside `Foo.tsx` unless that is the only pattern in the repo.
- If the runner only includes another tree (for example `src/test/`), follow that tree.
- An index file that only re-exports is out of scope. That means `export { X } from './X'`, not a component that returns JSX. A route file that only renders one view is still a screen. If it has no behavior of its own, the test lives on the view and must click that view’s primary action. Do not skip the view because the route file is one line.
- Mock at the network or data-library boundary the repo already mocks. Do not assert translated copy when the test setup returns the key.

## Do not

- Ship a new or changed production component or page with zero automated tests. Layout wrappers count.
- Test only the happy path when empty or error is part of the ask.
- Treat a green unit run as a substitute for the browser.
- Add Cypress or Playwright from scratch for one control.

## Done when

Every new or changed component and page in the diff has a test, the assertions match the ask, and you have run the relevant test command. Record the command and the result. If you could not run it, say why.

For every new or changed screen, the report names the primary action the test clicked. A heading-only assertion means stop. Do not write the completion report as done.
