# Stay in scope

Change only what the ask needs.

## Before you edit

For each file you are about to touch:

1. Does this line serve the ask?
2. Would a reviewer ask why this file is in the diff?

If no, leave it. Formatter fixes on lines you already touch are fine.

## Bugs

Smallest diff that fixes the reported behavior. Do not rename neighbors, restyle the page, or “clean up” unrelated code in the same change.

## Do not

- Invent an API, a field, or a component the ask did not need.
- Add a dependency the repo does not already use, unless the user asked, the app cannot be scaffolded without it, or [project-init](../skills/project-init/SKILL.md) lists it as a default.
- Swap the UI kit, data library, or framework.
- Expand a bug fix into a redesign.
- Skip loading, empty, or error states when the screen shows data. Those are in scope, not extras.
- Build screens or features during setup. A Figma URL on setup gives the theme and the shared base components only. Screens wait for the user’s yes to the handoff question in [project-init](../skills/project-init/SKILL.md), then go through [feature-implementation](../skills/feature-implementation/SKILL.md). With no Figma URL, the shell is the end of setup. Do not invent screens.

## Docs stay current

Updating `README.md` and the app-flow doc is part of the change, not extra scope. This section is the full rule. Other skills link here.

- A new app creates `README.md` and `docs/app-flow.md` before setup is done. `docs/app-flow.md` is the only architecture and screen-flow doc.
- A later change updates `docs/app-flow.md` in the same change when routes, screens, data flow, state, folder roles, or how to run the app changed. Update `README.md` when install, scripts, stack, or the folder map changed.
- A color, copy, or alignment fix that does not change those facts leaves both files alone. Example: a badge that sits off its label is a visual fix, and the flow doc stays as it is. A new route is a flow change, and `docs/app-flow.md` updates in that same change.
- An existing app that already has this doc follows the same update rule. Do not invent a second flow doc beside one the repo already keeps.

## Say the assumption

If you proceed on a small choice the user did not spell out, state it in the completion report.
