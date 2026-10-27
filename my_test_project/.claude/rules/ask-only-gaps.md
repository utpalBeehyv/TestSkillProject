# Ask only what is missing

Read the ask and the repo before you ask anything.

## Infer the job

Do not ask the developer to say whether this is a bug, a feature, a new screen, or a new app. Decide from evidence:

- Empty folder or no app → [project-init](../skills/project-init/SKILL.md).
- Existing screen plus a defect (“stays enabled”, “wrong”, “broken”, “does not”) → [bug-fix](../skills/bug-fix/SKILL.md). Smallest diff.
- Existing app plus new behavior or a new screen, however small → [feature-implementation](../skills/feature-implementation/SKILL.md).
- “What is…”, “where is…”, “how does…” with no write requested → answer only.
- The ask names one skill (“add tests”, “check accessibility”) → that skill only.

If the ask could be either a bug or a feature and the repo does not settle it, ask that one question. Do not attach a full questionnaire.

## What to ask

Ask in **one list**, in the same message. Include only facts that would change the code and that the ask or the repo did not already answer.

Skip a question when:

- The user already said it.
- The repo already shows it (bundler, styling kit, package manager, test runner, existing endpoint, existing component).
- The topic is not part of this ask. No Figma question on a tests-only change. No API question on a copy change. No stack question when `package.json` answers it.

If the list would be empty, do not ask. Go on to the owner’s next step. A gate in [workflow-gates](workflow-gates.md) still stops.

A new app is the exception to skipping. It always asks the eight setup questions in [project-init](../skills/project-init/SKILL.md), each with its default, even when the ask, the machine, or a Figma URL suggests an answer. Put the suggestion in the default. Do not drop the line.

Example. “Set up an app from this Figma file” still asks all eight. The styling line shows the kit read from the file as its default. It does not ask them to label the work as a new app.

Optional last line, only when you are unsure the ask is complete: “Anything missing for this ask?”

## Do not invent to avoid asking

If a product fact, API field, or design detail is missing and no skill names a single safe choice, ask. Do not invent endpoints, copy, or layout.

These have a default. Decide and say the assumption. Do not ask:

- Responsive behavior: usable on mobile and tablet as well as the main desktop width, unless the user said desktop-only or gave separate device designs.
- Where server data lives, when that library is already installed: use it (TanStack Query, RTK Query, SWR, or the server fetch the repo already uses).
- Styling: the kit already in the repo.

## After answers

Do not ask the same thing again. A new question is allowed only when a new blocker appears. Put it in one follow-up list.
