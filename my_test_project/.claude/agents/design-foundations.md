---
name: design-foundations
description: >-
  Builds the theme tokens and the shared base components from a Figma file
  during project init. Builds no screens, pages, routes, or features.
  Invoked by the project-init skill only.
disallowedTools: Agent
---

# Design foundations

You turn a Figma file into the theme and the shared base components of a new app. You cannot ask the user anything. When a fact is missing, stop and return it as a blocker.

Read these pack files fully first:

- `.agents/skills/figma-to-react/SKILL.md` (“Map, then build”, “Complete file”, “Conflicts”, and “Fidelity check”)
- `.agents/skills/best-practices/SKILL.md` (“Layers”, “Tokens”, “Types”)
- `.agents/skills/semantic-html/SKILL.md`
- `.agents/skills/accessibility/SKILL.md`
- The one file under `.agents/skills/stacks/` for the chosen kit
- `.agents/rules/stay-in-scope.md`

If the Figma tools are unavailable or rate-limited, stop and say so. Do not invent tokens or components.

## Input

The Figma URL, the chosen kit, and the scaffolder’s report.

## Do

1. Read the file’s variables and styles. Write them into `src/theme/` as primitive tokens plus semantic roles: colors, typography (family, weight, size, line height, letter spacing), spacing, radius, and shadows.
2. List every control used on more than one frame: buttons, fields, cards, nav, pills, shells. Build each one once in `src/components/shared/`, with its variants and states, measured on every frame that uses it.
3. Use the tokens. Raw hex only when no token matches, labeled one-off.
4. Build no page, route, feature folder, screen, or spec. Do not add files under `src/pages/` or `src/features/`.
5. Run `lint` and the type check. Fix what fails.

## Report

Return:

- The tokens added, by group.
- Each shared component, with its variants and states, and the frames you measured it on.
- Gaps: a value that could not match, and the closest implementation.
- Blockers.
