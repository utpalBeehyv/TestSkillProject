---
name: feature-implementation
description: >-
  Build a feature in an existing React frontend app. Use for any new feature,
  screen, page, component, flow, or behavior, however small ("add",
  "build", "implement", "create a screen", "support X"), including Figma
  screens after project init. Shows the scope and test plan with no code,
  waits for approval, then delegates to the api-integrator, ui-builder,
  test-writer, and quality-reviewer agents.
---

# Feature implementation

Open for any new feature or behavior in an existing app, however small. Follow [workflow-gates](../../rules/workflow-gates.md).

You coordinate. You run in the main conversation, show the gate, and hand the work to agents. You do not write production code or tests yourself. If an agent cannot do a part, stop and tell the user. Do not do that part yourself.

## 1. Understand the ask

Read before you ask:

- `AGENTS.md`, `docs/app-flow.md`, and the nearby screens.
- `src/components/shared/` and `src/theme/`, so the plan reuses what init built.
- The services and the API contract.
- With a Figma URL, the frames: [figma-to-react](../figma-to-react/SKILL.md), “Map, then build”, steps 1 and 2. Reading Figma is allowed before the gate.

Ask the missing facts in one list ([ask-only-gaps](../../rules/ask-only-gaps.md)). When the feature needs server data and no contract covers it, the contract is one of those facts. End the turn while answers are pending.

## 2. Gate: scope and test plan

Show, in plain language:

- **Feature:** what the user will be able to do, and the screens or parts it touches.
- **Out of scope:** what this change will not do, and what stays the same.
- **Design source:** the Figma frames by name, or “no design, follows the sibling screens”.
- **Data:** the endpoints from the contract by method and path, or “no server data”.
- **Shared components:** reused, extended, or new, by name.
- **States:** loading, empty, error, success, and any selected or disabled state.
- **Test plan:** each component or page test, with the action it clicks and what it asserts; the browser flows that will be clicked; the states that will be opened.

No code ([workflow-gates](../../rules/workflow-gates.md)). End with “Approve this scope and test plan?” and end the turn. Continue only after an explicit yes. A change to the scope means a new gate.

## 3. Delegate

After the yes, run the agents in this order. Give each one the approved scope, the test plan, and the reports of the agents before it.

1. **`api-integrator`**, only when the feature reads or writes server data. It writes the service, the types, and the feature hook from the contract.
2. **`ui-builder`**. It builds the UI from the shared components and the theme, and calls the feature hook. With Figma, it fills the fidelity checklist for each frame. More than one screen: shared components first, then one `ui-builder` call per screen, in sequence, so two agents are never in the same files.
3. **`test-writer`**. It writes the tests in the test plan, runs them, and runs browser validation for each screen.
4. **`quality-reviewer`**. It reviews the diff against `AGENTS.md` and the pack standards.

If `quality-reviewer` or `test-writer` reports a blocking finding, send it to the agent that owns the file (`api-integrator` or `ui-builder`). Then run `test-writer` and `quality-reviewer` again on what changed. After two rounds, stop and show the user what is still open.

If an agent reports a blocker (a missing contract, Figma tools unavailable, the app will not start), stop and tell the user. Do not work around it.

If the work shows the approved scope was wrong, stop and show a new gate.

## 4. Report

Write the completion report ([how-to-write](../../rules/how-to-write.md)) from the agents’ reports:

- Files changed, and behavior changed.
- Tests run and the result, and the primary action each screen’s test clicked.
- The browser-validation block for each screen.
- Quality findings, fixed and still open.
- Docs updated, or left stale and why ([stay-in-scope](../../rules/stay-in-scope.md)).

## Done when

The user approved the gate, every agent in the order above ran or was skipped for a stated reason (no server data), the tests and browser validation passed, `quality-reviewer` has no open blocking finding, and the report is written.
