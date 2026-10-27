# Agent instructions

## Workflow

For any frontend work in this repo, read and follow `.agents/skills/frontend-skills/SKILL.md` and `.agents/rules/workflow-gates.md`. Do not invent a second workflow.

- A feature, a new screen, or any new behavior, however small: `.agents/skills/feature-implementation/SKILL.md`.
- A bug: `.agents/skills/bug-fix/SKILL.md`.
- Before building, show the scope (or the bug's location and root cause) and the test plan in plain language, with no code. Wait for an explicit yes.

Before coding, read `.agents/rules/ask-only-gaps.md`, `.agents/rules/stay-in-scope.md`, and `.agents/rules/how-to-write.md`.

Skip that sequence only for a trivial non-product ask (a commit message, or a one-line typo with no UI or behavior change). Still follow `.agents/rules/how-to-write.md`.

## Stack

npm, Vite, JavaScript, MUI, Redux + RTK Query, no auth, Swagger (stub pending URL). Routes, screens, data flow, and state are in `docs/app-flow.md`. Keep it current.

## Code quality

- Pages compose shared components from `src/components/shared/`. A page does not invent its own button, field, card, or table.
- Server data goes from the feature hook to a service to the one HTTP client in `src/services/`. No `fetch` in components. No mock rows in hooks.
- Every screen that loads data has loading, empty, error, and success states.
- Every new or changed component and page has a test in the same change. Run `npm test` and `npm run lint` before calling work done.
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
- Run `npm run build:analyze` when a change adds a dependency.
