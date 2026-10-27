---
name: frontend-skills
description: >-
  Start here for any frontend task. Read the repo, infer the job, and open
  its owner: project-init for a new app, feature-implementation for a
  feature, bug-fix for a bug. Each owner asks first, shows a gate, then
  delegates to agents that build, test, and review.
disable-model-invocation: true
---

# Frontend skills

Read this file first for any frontend feature, screen, bug, or question. Do not invent a second workflow.

The developer does not name the job type. You infer it from the ask and the repo.

## Always read

1. [rules/workflow-gates.md](rules/workflow-gates.md)
2. [rules/ask-only-gaps.md](rules/ask-only-gaps.md)
3. [rules/stay-in-scope.md](rules/stay-in-scope.md)
4. [rules/how-to-write.md](rules/how-to-write.md)

## Steps

1. Read the repo (package file, `AGENTS.md`, nearby screens, existing components, test runner, styling kit).
2. Infer the job. Do not ask the developer to pick bug, feature, or new app.
3. Open the owner for that job (below) and follow it step by step. Its questions and gates stop the turn ([workflow-gates](rules/workflow-gates.md)).
4. The owner opens the practice skills it needs, through its agents.
5. End with the completion report the owner describes.

## Which job

| Job | Owner |
|-----|-------|
| **No app in the folder** (no package file, or docs only) | [project-init](skills/project-init/SKILL.md). Eight setup questions with defaults, then the folder tree for approval, then the defaults. With a Figma URL, init builds only the theme and the shared base components, then asks before any screen. |
| **A feature, a new screen, or any new behavior in an existing app**, however small | [feature-implementation](skills/feature-implementation/SKILL.md). Scope and test plan with no code, wait for a yes, then the agents build, test, and review. |
| **Bug** | [bug-fix](skills/bug-fix/SKILL.md). Reproduce first (ask for steps if it will not reproduce), then location, root cause, and test plan with no code, wait for a yes, then fix, reproduce again, test, and review. |
| **Question only** | Answer from the repo. Do not write files. |
| **One named skill** (for example “add tests” or “check this page in the browser”) | Run that skill. Ask only if a fact for that skill is missing. |

## Agents

The owners hand work to these agents in [agents/](agents/). Do not call them for new work outside an owner.

| Agent | Called by | Job |
|-------|-----------|-----|
| `project-scaffolder` | project-init | The setup defaults and the agent files |
| `design-foundations` | project-init | Figma tokens and shared base components. No screens |
| `api-integrator` | feature-implementation | Services, types, and the feature hook from the contract |
| `ui-builder` | feature-implementation | The UI from the shared components and the theme |
| `bug-reproducer` | bug-fix | Reproduce, and confirm after the fix. Changes no files |
| `bug-fixer` | bug-fix | The smallest fix at the approved root cause |
| `test-writer` (lighter model) | all three | Tests and browser validation |
| `quality-reviewer` | feature-implementation, bug-fix | Read-only review against `AGENTS.md` and the pack standards |

## Practice skills

The agents open these when the change needs them.

| When | Skill |
|------|--------|
| Writing or changing React UI | [best-practices](skills/best-practices/SKILL.md) |
| Any interactive UI | [semantic-html](skills/semantic-html/SKILL.md), [accessibility](skills/accessibility/SKILL.md) |
| A Figma URL is in the ask | [figma-to-react](skills/figma-to-react/SKILL.md) |
| A screen that needs server data, or a Swagger / OpenAPI / API doc URL | [api-integration](skills/api-integration/SKILL.md) |
| Lists, data loading, or bundle size are in play | [performance](skills/performance/SKILL.md) |
| Auth, HTML injection, storage, redirects, or secrets | [security](skills/security/SKILL.md) |
| UI or behavior change (required) | [testing](skills/testing/SKILL.md), [browser-validation](skills/browser-validation/SKILL.md) |
| Building screens | [build-ui](skills/build-ui/SKILL.md) |
| Repo uses Chakra, MUI, Mantine, Tailwind, or Next App Router | the matching file under [skills/stacks/](skills/stacks/) — one file only |

Match the project’s stack. Do not rewrite a Vite app as Next.js, or swap the UI kit, unless the user asks.

A screenshot of the page is not validation. Clicks that only prove the flow are not validation either. Browser validation looks at every visible part and every state, then clicks the flow. Tests cover the changed component or page. The screen is not done when that look was skipped.

A large page uses the same testing and browser-validation skills for every screen. Do not skip them because the page is long.
