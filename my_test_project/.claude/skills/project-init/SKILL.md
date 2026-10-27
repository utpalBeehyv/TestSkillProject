---
name: project-init
description: >-
  Create a new React frontend app. Use when the user asks to create, start,
  set up, scaffold, or bootstrap a new frontend project or app, or when the
  folder has no package file. Asks eight setup questions in one message with
  defaults, shows the folder tree for approval, scaffolds the defaults, writes
  AGENTS.md, and from a Figma file builds only the theme and base components.
---

# Project init

Open when the folder has no frontend app. Do not scaffold inside an existing app. Follow [workflow-gates](../../rules/workflow-gates.md).

You run in the main conversation. You ask the questions, show the gates, and hand the build work to the `project-scaffolder`, `design-foundations`, and `test-writer` agents. Run the steps in order. A step that ends the turn ends it. Do not start the next step in the same turn.

## Step 1. Ask the setup questions

Send this list in one message, every line, then end the turn. Do not drop a line because the ask, the machine, or a Figma file seems to answer it. Put what you inferred in that line’s default instead.

```text
Setup questions. Reply "defaults" to accept all, or answer only the lines you want to change.

1. Package manager: npm / pnpm / yarn (default: npm)
2. Framework: Vite / Next.js (default: Vite)
3. Language: TypeScript / JavaScript (default: TypeScript)
4. State management, client or server side: Zustand / Redux / RTK Query / TanStack Query (default: Context + Hooks)
5. Backend contract: Swagger/OpenAPI URL or file, or another API doc (default: Swagger; share the URL when you have it)
6. E2E testing: required / not required (default: not required)
7. Auth: required / not required, and which type (default: JWT Bearer via Keycloak)
8. Styling/UI: Tailwind CSS / MUI / Chakra UI / Mantine (default: Tailwind CSS)
```

- With a Figma URL, read the file before you send the list (variables, styles, component names). Set line 8’s default to the kit the file uses, and say why: “(default: MUI, read from the Figma components)”. If the file does not show a kit, keep Tailwind CSS.
- Line 4 may get two picks, one client and one server (for example Zustand + TanStack Query). RTK Query means the store is Redux. Context + Hooks installs no state library.
- Line 5 without a URL is fine. The scaffold uses a typed stub in `src/services/` until the URL arrives. Do not invent endpoints.
- Line 7 “not required” means no auth code.
- Do not add other questions. Ask a follow-up only when an answer is unclear or two answers conflict, in one follow-up message.

## Step 2. Show the structure

After the answers:

1. Create the app from the chosen framework’s template with the chosen package manager.
2. Create the empty folders of the layout below. Write no other code.
3. Show the tree: the folders, and the files Step 3 will add, by name. Ask for changes. End the turn.

On a change, update the tree and show it again. Go on only after an explicit yes.

### Layout

- `src/app/` — entry, router, providers, error boundaries. A small context provider lives here
- `src/theme/` — kit theme and tokens. Not `src/theme.ts`
- `src/components/shared/` — the only shared-component folder. Kit wrappers (`AppButton`, `AppField`) and components used by more than one feature. Do not also create `ui` or `common`
- `src/features/<name>/` — feature-only components and feature hooks
- `src/pages/` — screens that compose ([build-ui](../build-ui/SKILL.md) says what composing means)
- `src/services/` — the one HTTP client and the domain services
- `src/state/` — only when line 4 chose a store
- `src/auth/` — only when line 7 is required
- `src/assets/`, `src/test/` — images, and the test runner setup
- `docs/app-flow.md` — the one architecture and screen-flow doc
- `Dockerfile`, `docker/nginx.conf`, `docker-compose.yml`, `.dockerignore`

Next.js keeps routes in `src/app/` as the App Router expects. Providers and error boundaries move to `src/providers/`. The other folders keep these names.

## Step 3. Scaffold the defaults

Hand off to the `project-scaffolder` agent. Send it the eight answers, the approved tree, the Figma URL if there is one, and this table with each item marked on or off. An item is off only when the user said to leave it out. Do not turn one off yourself ([workflow-gates](../../rules/workflow-gates.md)).

| Item             | Default                                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Routing          | React Router (Vite) or the App Router (Next.js), with a not-found route                                                                                                                                                                                                                                                                                |
| HTTP client      | One shared client in `src/services/`. Base URL from env. Auth header and the shared error handler live on the client. Types come from the Swagger spec, or from a typed stub labeled TODO until the URL arrives ([api-integration](../api-integration/SKILL.md))                                                                                       |
| State            | Line 4. Context + Hooks means a provider in `src/app/` and no library                                                                                                                                                                                                                                                                                  |
| Performance      | Route-level lazy loading, a `build:analyze` script with a bundle visualizer, the kit imported the cheap way ([performance](../performance/SKILL.md))                                                                                                                                                                                                   |
| Error boundaries | One at the app root and one per route, each with a fallback and a retry                                                                                                                                                                                                                                                                                |
| Docker           | Multi-stage `Dockerfile` (install, build, serve with nginx), `docker/nginx.conf` with the SPA fallback to `index.html`, `docker-compose.yml`, `.dockerignore`. Next.js uses a Node runtime stage instead of nginx                                                                                                                                      |
| Tests            | Vitest, React Testing Library, and jsdom. Setup in `src/test/`, a `test` script, and one smoke test for the shell                                                                                                                                                                                                                                      |
| Validation       | zod and react-hook-form, wired into one shared `AppField`                                                                                                                                                                                                                                                                                              |
| Lint and format  | ESLint and Prettier, with `lint` and `format` scripts. The Vite template’s oxlint is not the project linter                                                                                                                                                                                                                                            |
| Auth             | Line 7. Keycloak: `keycloak-js`, an `AuthProvider` in `src/auth/`, the token held in memory and refreshed before expiry, the bearer header on the shared client, a protected-route wrapper, and `VITE_KEYCLOAK_URL`, `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID` in `.env.example` (`NEXT_PUBLIC_` on Next.js) ([security](../security/SKILL.md)) |
| E2E              | Playwright with one smoke spec, only when line 6 is required                                                                                                                                                                                                                                                                                           |
| Theme            | The chosen kit’s theme with semantic color roles in `src/theme/`. Open the matching file under [stacks/](../stacks/)                                                                                                                                                                                                                                   |
| Docs             | `README.md` (replace the template: install, run, test, lint, Docker, the stack, a link to `docs/app-flow.md`, and one line that agent instructions are in `AGENTS.md`) and `docs/app-flow.md`                                                                                                                                                          |
| Agent files      | Step 4                                                                                                                                                                                                                                                                                                                                                 |

The agent reports each item as done, or off because the user said so. Any other status means the step is not done. Send the agent back with what is missing. If an item truly cannot be done, tell the user why and ask how to proceed.

Do not build feature UI or screens in this step.

## Step 4. Agent files and AGENTS.md

The same agent writes these. Copy this pack into the project. Do not add a sync script. Do not point the app at the `frontend-ai-skills` checkout. The folder is `.agents`, not `.agent`.

If `AGENTS.md`, `CLAUDE.md`, or `.cursor/rules/` already exist, do not replace them. Add the frontend section, or the one rule, beside what is there.

- `.agents/rules/` — copy `rules/` from this pack.
- `.agents/skills/<name>/` — copy `skills/` from this pack, including `stacks/`. From `.agents/skills/build-ui/SKILL.md`, `../../rules/` still lands on `.agents/rules/`.
- `.agents/skills/frontend-skills/SKILL.md` — `START-HERE.md` from this pack, with links rewritten: `rules/` becomes `../../rules/`, `skills/<name>` becomes `../<name>`, and `agents/` becomes `../../../.claude/agents/`. Name the kit chosen for this app in the stack sentence.
- `.claude/rules/` and `.claude/skills/` — the same tree, so Claude Code can open the same files.
- `.claude/agents/` — copy `agents/` from this pack. Replace every `{{PACK_ROOT}}` with `.agents`.
- `.cursor/rules/frontend-skills.mdc` — `alwaysApply: true`, with the body below.
- `AGENTS.md` at the repo root, with the body below. Fill the `<…>` slots. Do not also add `agent.md`.
- `CLAUDE.md` — one line, `@AGENTS.md`, under a `# CLAUDE.md` heading.

When this setup also creates a separate test project (for example an e2e repo for this app), that project gets its own `AGENTS.md` with the Workflow, Code quality, and Code standards sections, and the [testing](../testing/SKILL.md) rules in place of Performance.

`.cursor/rules/frontend-skills.mdc`:

```markdown
---
description: Auto-run frontend skills in this repo for frontend work
alwaysApply: true
---

# Frontend skills (always on)

For any frontend feature, screen, UI change, or bug fix in this repo:

1. Read and follow `.agents/skills/frontend-skills/SKILL.md` and `.agents/rules/workflow-gates.md`. Do not invent a parallel workflow.
2. A feature or any new behavior, however small, follows `.agents/skills/feature-implementation/SKILL.md`. A bug follows `.agents/skills/bug-fix/SKILL.md`.
3. Before building, show the scope (or the bug’s location and root cause) and the test plan in plain language, with no code. End the turn and wait for an explicit yes.
4. Before coding, read `.agents/rules/ask-only-gaps.md`, `.agents/rules/stay-in-scope.md`, and `.agents/rules/how-to-write.md`.
5. Open only the skills under `.agents/skills/` that the change needs. Read each `SKILL.md` fully before acting.
6. For any UI or behavior change, run `.agents/skills/testing` and `.agents/skills/browser-validation` before calling the work done.

## Trivial skip

Skip the skill sequence only for trivial non-product asks (for example a git commit message, or a one-line typo with no UI or behavior change). Still follow `.agents/rules/how-to-write.md`.
```

`AGENTS.md`:

```markdown
# Agent instructions

## Workflow

For any frontend work in this repo, read and follow `.agents/skills/frontend-skills/SKILL.md` and `.agents/rules/workflow-gates.md`. Do not invent a second workflow.

- A feature, a new screen, or any new behavior, however small: `.agents/skills/feature-implementation/SKILL.md`.
- A bug: `.agents/skills/bug-fix/SKILL.md`.
- Before building, show the scope (or the bug’s location and root cause) and the test plan in plain language, with no code. Wait for an explicit yes.

Before coding, read `.agents/rules/ask-only-gaps.md`, `.agents/rules/stay-in-scope.md`, and `.agents/rules/how-to-write.md`.

Skip that sequence only for a trivial non-product ask (a commit message, or a one-line typo with no UI or behavior change). Still follow `.agents/rules/how-to-write.md`.

## Stack

<package manager>, <framework>, <language>, <styling kit>, <state>, <auth>, <contract>. Routes, screens, data flow, and state are in `docs/app-flow.md`. Keep it current.

## Code quality

- Pages compose shared components from `src/components/shared/`. A page does not invent its own button, field, card, or table.
- Server data goes from the feature hook to a service to the one HTTP client in `src/services/`. No `fetch` in components. No mock rows in hooks.
- Every screen that loads data has loading, empty, error, and success states.
- Every new or changed component and page has a test in the same change. Run `<pm> test` and `<pm> run lint` before calling work done.
- No `any` on public hooks or API returns. Do not weaken `strict`.
- No secrets in frontend code or env. No unsanitized `dangerouslySetInnerHTML`. Tokens stay in memory.

## Code standards

- Follow `.agents/skills/best-practices/SKILL.md`. Its blocking table fails a change.
- Names state the product concept (`OpportunityRow`, `isFilterDrawerOpen`), not `Item`, `data`, or `temp`.
- Colors, spacing, type, and radius come from `src/theme/` tokens. Raw hex only when no token matches, labeled one-off.
- Native elements first (`button`, `a`, `label`). Every control has a keyboard path and an accessible name.
- Prettier formats. ESLint passes with no new warnings.

## Performance

- Follow `.agents/skills/performance/SKILL.md`.
- Routes are lazy-loaded. Above-the-fold UI stays eager.
- Start independent requests together. Do not fetch the same data twice on one page.
- Paginate or virtualize large lists.
- No `useMemo`, `useCallback`, or `React.memo` without a measured cost.
- Run `<pm> run build:analyze` when a change adds a dependency.
```

These files are a snapshot from setup. A later color, copy, or alignment fix does not refresh them. To pick up a newer pack, copy the folders again and keep the Stack section.

## Step 5. Figma: theme and base components only

Only when the ask has a Figma URL. After Step 3 is done, hand off to the `design-foundations` agent with the URL and the chosen kit. It:

- Writes the file’s tokens into `src/theme/`: colors, typography, spacing, radius, and shadows.
- Builds every control used on more than one frame in `src/components/shared/`, with its variants and states ([figma-to-react](../figma-to-react/SKILL.md), “Complete file”).
- Builds no page, route, feature folder, screen, or spec.

Then hand the new shared components to the `test-writer` agent. Each new component gets a test ([testing](../testing/SKILL.md)).

## Step 6. Report and hand off

End with the completion report ([how-to-write](../../rules/how-to-write.md)): each Step 3 item as done or turned off by the user, how to run the app locally and in Docker, and the tokens and components Step 5 built.

- **With a Figma URL:** ask one question, “Setup is done. Do you want to implement the screens from the Figma file now?”, and end the turn. On yes, follow [feature-implementation](../feature-implementation/SKILL.md) with the Figma URL as the ask. On no, stop. Do not build a screen.
- **Without a Figma URL:** stop at the shell. Do not build screens from a guess.

## Done when

- The eight questions were asked in one message, with defaults, and answered.
- The tree was shown and approved before any code beyond the template.
- Every Step 3 item is done or was turned off by the user.
- `README.md`, `docs/app-flow.md`, `AGENTS.md`, `CLAUDE.md`, the `.mdc` rule, and the agent-file snapshot exist.
- `lint`, `test`, and `build` pass, and the app starts.
- With Figma, only tokens and shared components were built, and the handoff question was asked.
