# How to write

Short, plain, and specific to this repo’s stack.

## Chat

- Match length to the task. A one-line fix does not get a long write-up.
- Use the project’s real libraries. Do not suggest a different kit unless the user asked.
- If advice is wrong for this repo, say so and give one correct alternative.
- Prefer one recommendation. Mention a tradeoff only when it changes the choice.
- Ask only when [ask-only-gaps](ask-only-gaps.md) says to. Do not end with an unsolicited follow-up offer. A question or gate that an owner skill requires ([workflow-gates](workflow-gates.md)) is not an unsolicited offer.

## Plans and gates

When you show a plan or a gate before coding:

1. What happens for the user.
2. Why it is wrong or missing today.
3. What you will change (name the files or components in words).
4. What stays the same.
5. Edge cases that affect the normal flow: loading, empty, error, disabled.
6. Test plan: what each test proves, and the flows the browser check will click.

Plain language only. No snippets, no fenced code, no file contents, no diffs. See [workflow-gates](workflow-gates.md).

## Code cites

In a completion report or an answer to a question (not in a plan or a gate), cite existing code as a fenced block with the starting line, ending line, and path, so the reader can open it.

## Completion report

End every write task with:

- Files changed
- Behavior changed
- Checks run, and the result
- Checks not run, and why
- Assumptions or risks
- Docs: name `README.md` or `docs/app-flow.md` when this change updated them. If routes, screens, data flow, state, folder roles, or how to run the app changed and the doc was left stale, say so. A color, copy, or alignment fix can omit this line.

Do not claim a test or a browser check passed unless you ran it. The visual browser check is pass, fail, or not run. Not run means the screen is not done.

Example. A report for a new route says `docs/app-flow.md` was updated, and the visual check failed because the selected card’s icon tile changed color, then passed after the re-check. A report that only says the button click worked is not done.
