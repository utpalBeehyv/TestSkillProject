# Workflow gates

Three jobs have one owner each. Do not do them another way.

| Job | Owner |
|-----|-------|
| New app (no package file in the folder) | [project-init](../skills/project-init/SKILL.md) |
| A feature, a new screen, or any new behavior, however small | [feature-implementation](../skills/feature-implementation/SKILL.md) |
| A bug: existing behavior that is wrong | [bug-fix](../skills/bug-fix/SKILL.md) |

The owner runs in the main conversation. It asks, shows the gates, and hands the work to the agents in `agents/`. It does not write production code or tests for a feature or a bug itself.

A small addition is still a feature. “Just add a button” goes through feature-implementation. Only these skip an owner: a question with no write, a copy or token tweak with no behavior change, and an ask that names one skill (“add tests”, “check this page in the browser”).

## Questions

Ask every question in one message. Show each default. End the turn. Do not write files while the answer is pending.

## Gates

A gate is a stop. At a gate:

1. Show what the owner skill lists for that gate, in plain language.
2. Show no code. No snippets, no fenced blocks, no file contents, no diffs. File, component, and endpoint names are fine.
3. Ask for approval and end the turn.
4. Continue only after an explicit yes. A reply that changes the scope is not a yes. Show the gate again with the change.

Before the yes, do not write, scaffold, or install anything the gate covers. Reading the repo, reading Figma, running the app, and reproducing a bug are allowed before a gate.

| Gate | Owner | Shows |
|------|-------|-------|
| Structure | project-init | The folder tree |
| Figma handoff | project-init | One question: build the Figma screens now? |
| Feature | feature-implementation | What is built, and the test plan |
| Bug | bug-fix | Where the bug is, the root cause, and the test plan |

A line elsewhere that says to keep going without approval does not apply to a gate.

## Defaults

A default in project-init is on unless the user said to leave it out. Do not drop one on your own judgement, to save time, or because the dependency is new to the repo. The completion report names each item the user turned off.
