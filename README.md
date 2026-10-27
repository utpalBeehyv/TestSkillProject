# Frontend skills

Skills, rules, and agents for AI coding agents working on a React frontend. Point the agent at [START-HERE.md](START-HERE.md).

The agent reads the ask and the repo, infers the job, and opens one owner for it. The developer does not label the work as a bug, a feature, or a new app.

| Job | Owner | What happens |
|-----|-------|--------------|
| New app | [project-init](skills/project-init/SKILL.md) | Eight setup questions in one message, with defaults → folder tree for approval → defaults scaffolded → `AGENTS.md` → from Figma, only the theme and base components → asks before building screens |
| Feature | [feature-implementation](skills/feature-implementation/SKILL.md) | Scope and test plan with no code → wait for a yes → api-integrator, ui-builder, test-writer, quality-reviewer |
| Bug | [bug-fix](skills/bug-fix/SKILL.md) | Reproduce (ask for steps if it will not) → location, root cause, and test plan with no code → wait for a yes → bug-fixer, reproduce again, test-writer, quality-reviewer |

## Install for your user (Claude Code)

This makes project-init, feature-implementation, and bug-fix start on their own from any folder, and installs the agents.

```bash
sh install/install.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File install/install.ps1
```

The scripts copy `install/skills/*` to `~/.claude/skills/` and `agents/*` to `~/.claude/agents/`, with this checkout’s path filled in. Re-run them after you move or update the pack. A changed file is backed up to `<file>.bak` first. To remove the install, delete those skill folders and agent files.

## Start without installing

```text
@frontend-ai-skills/START-HERE.md
```

Or the slash command `/frontend-skills` when Claude Code runs in this folder.

A new app scaffold copies this pack into the project and adds `AGENTS.md`, `CLAUDE.md`, a Cursor rule, and `.claude/agents/`, so later work there does not need the install or `/frontend-skills`.

## Layout

| Path | What it is |
|------|------------|
| [START-HERE.md](START-HERE.md) | The only entry. Picks the owner for the job. |
| [rules/](rules/) | Always on: workflow gates, ask only gaps, stay in scope, how to write. |
| [skills/](skills/) | The three owners, and the practices the agents open. |
| [skills/stacks/](skills/stacks/) | Chakra, MUI, Mantine, Tailwind, or Next. Open one when the repo uses it. |
| [agents/](agents/) | The agents the owners delegate to. `{{PACK_ROOT}}` in them is filled in by the installer, or set to `.agents` in a scaffolded app. |
| [install/](install/) | User-level skill wrappers and the install scripts. |

## Agents

| Agent | Called by | Job |
|-------|-----------|-----|
| [project-scaffolder](agents/project-scaffolder.md) | project-init | Routing, HTTP client, state, performance baseline, error boundaries, Docker, tests, validation, lint, auth, theme, docs, agent files |
| [design-foundations](agents/design-foundations.md) | project-init | Figma tokens and shared base components. No screens |
| [api-integrator](agents/api-integrator.md) | feature-implementation | Services, types, and the feature hook from the contract |
| [ui-builder](agents/ui-builder.md) | feature-implementation | The UI from the shared components and the theme |
| [bug-reproducer](agents/bug-reproducer.md) | bug-fix | Reproduce, and confirm after the fix. Changes no files |
| [bug-fixer](agents/bug-fixer.md) | bug-fix | The smallest fix at the approved root cause |
| [test-writer](agents/test-writer.md) | all three | Tests and browser validation. Runs on `haiku` |
| [quality-reviewer](agents/quality-reviewer.md) | feature-implementation, bug-fix | Read-only review against the project `AGENTS.md` and the pack standards |

## Practice skills

| Skill | Use when |
|-------|----------|
| [best-practices](skills/best-practices/SKILL.md) | How to write React, and what to reject. |
| [performance](skills/performance/SKILL.md) | Lists, fetches, bundles. |
| [figma-to-react](skills/figma-to-react/SKILL.md) | A Figma URL is the design source. Holds the one fidelity checklist. |
| [api-integration](skills/api-integration/SKILL.md) | Server data, or a Swagger / OpenAPI / API doc URL. The Figma file is not the contract. |
| [accessibility](skills/accessibility/SKILL.md) | Keyboard, names, focus, contrast. |
| [semantic-html](skills/semantic-html/SKILL.md) | Native elements before ARIA or clickable divs. |
| [security](skills/security/SKILL.md) | XSS, secrets, storage, redirects, tokens. |
| [testing](skills/testing/SKILL.md) | Tests for the change. Required for UI work. |
| [browser-validation](skills/browser-validation/SKILL.md) | Real browser flows and a look at every visible part and state. Required for UI work. Clicks alone are not done. |
| [build-ui](skills/build-ui/SKILL.md) | Building screens in an existing app. |

UI or behavior changes are not done until testing and browser validation have run. Browser validation includes the visual look. A click-through that skipped it is not done. Say what you could not run.
