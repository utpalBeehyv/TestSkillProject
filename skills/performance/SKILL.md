---
name: performance
description: >-
  Frontend performance for lists, data loading, and bundles. Open when the
  change fetches data, renders a large list, or adds a heavy import. Skip
  presentational tweaks with a one-line reason.
disable-model-invocation: true
---

# Performance

Open when the change fetches data, renders a list, adds a heavy dependency, or touches a public page where load time matters. Skip a pure layout tweak and say why.

Do not paste Next.js server rules into a Vite app. Open [stacks/next.md](../stacks/next.md) only when the repo is Next App Router.

Query key shape belongs to [api-integration](../api-integration/SKILL.md). This skill ranks cost.

A new app gets the baseline from [project-init](../project-init/SKILL.md): route-level lazy loading and a `build:analyze` script. A later change keeps it.

## Do when it is needed

Do these in the same change when the screen has that cost. A layout-only change still skips this skill and says why. A list, a fetch, or a heavy import does not skip it.

- Start independent requests together. Do not `await` one, then the next, when they do not depend on each other.
- Do not fetch the same list twice on one page with two hooks.
- Paginate or virtualize a large list. Do not render an unbounded table.
- Keep above-the-fold UI eager. Lazy-load a heavy editor or chart that is not on the first paint.
- Size images the way sibling screens already do. Do not add a new image pipeline.
- Use the project’s existing cache (`staleTime`, HTTP cache).
- Import icons and UI kits the cheap way the repo already documents. Avoid a barrel `index` import on a hot route.
- Defer expensive filter work with `useDeferredValue` or `startTransition` only when typing is actually slow.

## Skip when it costs more

An extra wrapper, chunk, or cache can make the screen slower. Leave these out.

- `useMemo`, `useCallback`, or `React.memo` on a cheap render. Add one only when a measured cost or a child dependency needs it.
- Virtualizing a short list.
- Splitting a tiny module into its own chunk.
- Lazy-loading what is visible on first paint.
- A second cache beside the one the project already uses.
- A derived list stored in state or an effect to “optimize”. Compute it during render.

## Rendering

| Page | Prefer |
|------|--------|
| Public and needs to be crawled, and the stack can server-render | Server render or static generate |
| Signed-in app or internal admin | Client render is fine |
| Almost never changes | Static generate, when the stack supports it |

Do not choose client-only rendering for a public, indexable page when this repo already has server rendering. Do not force server rendering or Next.js onto an internal admin app that does not need it.

## Done when

The needed step was done, or the skip was written down. Critical-path fetches are not duplicated or accidentally sequential, and a large list is bounded. Do not claim a measurement, including a Core Web Vitals pass, unless you measured it with a tool the project already uses.
