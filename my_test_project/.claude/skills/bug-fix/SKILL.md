---
name: bug-fix
description: >-
  Fix a bug in an existing React frontend app. Use when something is broken,
  wrong, stays enabled, does not load, crashes, or regressed. Reproduces
  first and asks for steps when it cannot, shows the location, root cause,
  and test plan with no code, waits for approval, then delegates the fix,
  reproduces again, and runs the test-writer and quality-reviewer agents.
---

# Bug fix

Open when existing behavior is wrong. Follow [workflow-gates](../../rules/workflow-gates.md).

You coordinate. You run in the main conversation, show the gate, and hand the work to agents. You may read code to find the root cause. You do not edit production code or tests yourself.

## 1. Reproduce

Hand the user’s report to the `bug-reproducer` agent. It returns whether it reproduced the bug, the exact steps, expected and actual results, the evidence, and the suspected location.

If it could not reproduce the bug, do not guess a cause or a fix. Ask the user, in one message, for:

- The steps, starting from the URL
- The account or role, and the data used
- Browser and window width
- What they expected, and what they saw

End the turn. When they reply, reproduce again.

If the app will not start or an auth wall blocks the agent, say what blocked it and ask the user how to proceed.

## 2. Find the root cause

Read the code at the suspected location. The root cause is why it happens, not where it shows. Check that the cause explains every step of the reproduction.

## 3. Gate: location, root cause, and test plan

Show, in plain language:

- **Where:** the screen and flow, and the files or components by name.
- **Root cause:** why it happens.
- **Fix:** the smallest change, in words, and what stays the same.
- **Test plan:** the regression test that fails before the fix and passes after it; the browser re-check of the original steps; the nearby flows that could be affected.

No code ([workflow-gates](../../rules/workflow-gates.md)). End with “Approve this fix and test plan?” and end the turn. Continue only after an explicit yes.

## 4. Fix and confirm

After the yes:

1. **`bug-fixer`** applies the smallest fix at the approved root cause.
2. **`bug-reproducer`** runs the same steps again. The original behavior must be gone. If it is not, send its evidence back to `bug-fixer`. After two failed rounds, stop and tell the user.
3. **`test-writer`** writes the regression test and runs the tests and browser validation, including the bug path before and after.
4. **`quality-reviewer`** reviews the diff against `AGENTS.md` and the pack standards.

If `quality-reviewer` or `test-writer` reports a blocking finding, send it to `bug-fixer`. Then run steps 2 to 4 again on what changed, at most twice.

If `bug-fixer` reports that the approved root cause is wrong, stop and show a new gate.

## 5. Report

Write the completion report ([how-to-write](../../rules/how-to-write.md)): the root cause, files changed, the reproduction before and after, tests run and the result, quality findings, and docs updated or left stale.

## Done when

The bug was reproduced, the user approved the gate, the fix is the smallest diff at that root cause, the original steps no longer reproduce it, the regression test passes, and `quality-reviewer` has no open blocking finding.
