---
name: best-practices
description: >-
  How to write frontend React, and what to reject: component layers, state,
  effects, types, tokens, and the anti-patterns that fail a change. Open when
  writing or reviewing UI or data code.
disable-model-invocation: true
---

# Best practices

Open when writing or reviewing React UI or data code. Match the repo. Swap Chakra, MUI, Tailwind, Query, or SWR for whatever the project already uses.

If the repo uses Chakra, MUI, Mantine, Tailwind, or Next App Router, also open that one file under [stacks/](../stacks/).

A new app uses the folder layout in [project-init](../project-init/SKILL.md). An existing app keeps its own folders. Shared controls live in the one shared folder the repo already uses (`shared`, or `common` or `ui` when that is already the name). Do not add a second shared folder.

Example. `AppButton` and `AppField` live in `src/components/shared/`. A list used only on the home screen lives in `src/features/home/`. The kit theme is `src/theme/theme.ts`. `src/theme.ts` next to `App.tsx`, plus both `components/ui` and `components/shared`, is the layout this rule rejects.

## Layers

| Layer         | Job                                                                 | Must not                                             |
| ------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| Kit primitive | `Button`, `Input` from the design system                            | Imported in a page                                   |
| App component | Product wrapper (`AppButton`, `StatusFilter`): props in, events out | Call HTTP; own URL or server cache                   |
| Page          | Assemble components, read the URL, call feature hooks               | Invent shared markup inline; fat multi-step handlers |

Reuse before invent. Extend an existing component with an additive prop before adding a new one. Do not break existing props.

Kit controls are imported only inside app components. Pages import the app component. Multi-part UI (dialog, menu, accordion) uses parts (`Root`, `Trigger`, `Content`) instead of one component with a large prop blob. A single field stays a thin `value` / `onChange` API.

## State

| Kind                                             | Where it lives                                                                                                                   |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Server / async data                              | The library chosen at setup, or the one already installed (TanStack Query, RTK Query, SWR, or server fetch). Do not add a second |
| Filter or tab the user can share                 | URL search params                                                                                                                |
| Open, hover, draft that never leaves the control | Local state                                                                                                                      |
| Form fields                                      | The form library the repo already uses                                                                                           |
| Cross-tree client state                          | Context for small state (session, theme). Zustand or Redux only after the setup answer. Do not add both. RTK Query means Redux   |

Prefer controlled `value` + `onChange` when the page or URL owns the value.

Examples. A signed-in flag is context. A fit filter the user can share is `?fit=strong` in the URL. Opportunity rows come from the data library, not from that context. Choosing RTK Query means the store is Redux; do not also add Zustand.

## Effects

Effects talk to something outside React (a DOM listener, a third-party widget, analytics on mount) and clean up.

| Situation                           | Do                                                            |
| ----------------------------------- | ------------------------------------------------------------- |
| Value comes from props or state     | Compute it while rendering                                    |
| User click, submit, or change       | Event handler                                                 |
| List or detail from the API         | Project data library, not `useEffect` + `fetch`               |
| Reset a draft when the id changes   | `key={id}` on the subtree                                     |
| Typing into a heavy list feels slow | `useDeferredValue` or `startTransition` after you measure lag |

A handler in the page may set state, close a dialog, or call one feature hook. Multi-step network work (read, mutate, poll) belongs in a feature hook. The page keeps navigate and toast at the call site.

## Types

- Respect the project `tsconfig`. Do not weaken `strict`.
- Props are typed, or JSDoc when the file is JavaScript.
- Request and response types live at the client boundary. Reuse shared domain types. Do not add a second `Order` interface.
- No `any` on a public hook or API return.
- Wrappers of native elements extend the native props (`ComponentPropsWithoutRef`) so `className`, `disabled`, and aria attributes stay typed.
- Variant props that exclude each other are a discriminated union, not a pile of optional fields.

## Tokens

Call sites use the project token or semantic role (`text.muted`, `bg.page`), not a one-off hex, when that role already exists. A second theme should be a remap of roles, not a rewrite of pages. Raw hex is allowed only when no token matches; label it one-off. The second use of the same hex becomes a token before you ship.

## Names

A name states the product concept. Pages, components, folders, state, and variables say what they are.

Use `QualificationPage`, `OpportunityRow`, `src/features/opportunities/`, `isFilterDrawerOpen`, `strongFitCount`. Match a name the repo already uses for that concept.

Reject anonymous names: `Page`, `Component`, `Item`, `Card`, `data`, `items`, `temp`, `flag`, `value`, `obj`, and `handleClick` with no subject. A feature folder is the feature, not `misc`, `common`, or `stuff`.

`value` and `onChange` stay on a field component. That is the field API, not an anonymous local. A boolean can be `isDrawerOpen`. A list can be `opportunities`.

Rename the anonymous name this change introduces. Leave a neighbor this change did not touch, even when its name is `data.ts`.

## Do not

Blocking. Fix these before the change is done.

| Do not                                                                                                                                                                                                                                                                  | Do this                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `div` or `span` with `onClick` and no keyboard path                                                                                                                                                                                                                     | `button` or `a`                                                                     |
| Page imports a kit control when the project wraps them                                                                                                                                                                                                                  | Import the app component (`AppButton`)                                              |
| Shared UI invented inside a page file                                                                                                                                                                                                                                   | Extract or extend a component, then compose it                                      |
| `useEffect` + `fetch` when the project uses Query, SWR, or server fetch                                                                                                                                                                                                 | Use that data library                                                               |
| Props copied into state with an effect                                                                                                                                                                                                                                  | Render from props, or reset with `key`                                              |
| Fake rows returned from a hook                                                                                                                                                                                                                                          | Call the real client, or a typed TODO until a contract exists                       |
| `fetch` in a component when a shared client exists                                                                                                                                                                                                                      | `hook → service → shared client`                                                    |
| Happy-path-only screen                                                                                                                                                                                                                                                  | Loading, empty, error, and success                                                  |
| Hex or `text-[#…]` when a token already maps that color                                                                                                                                                                                                                 | The token or semantic role                                                          |
| `dangerouslySetInnerHTML` on user content without an approved sanitizer                                                                                                                                                                                                 | Render as text                                                                      |
| API keys, tokens, or client secrets in frontend code or `VITE_*`                                                                                                                                                                                                        | Public config only; secrets stay on the server                                      |
| New test runner, or a new component or page with no test                                                                                                                                                                                                                | The repo’s runner, and a test in the same change                                    |
| Figma screen built without a map, or px snapped to a different kit default                                                                                                                                                                                              | Map first; use the measured px or a token that equals that px                       |
| Second UI kit beside the one the repo uses                                                                                                                                                                                                                              | Stay on the existing kit                                                            |
| A part that fails the fidelity check in [figma-to-react](../figma-to-react/SKILL.md): a glyph sitting high in its badge, a selected state that recolors an icon the frame keeps, a baked-in glyph color, text with only a weight set, or a stretched or oversized glyph | Fix it as that check says, then look again                                          |
| Anonymous page, component, folder, state, or variable (`Page`, `Item`, `data`, `flag`, `temp`)                                                                                                                                                                          | Rename it to the product concept. Do not rename neighbors this change did not touch |
| A route component that only returns another component with no props                                                                                                                                                                                                     | Use the view as the route element, or give the page a route job                     |

Should fix, or record why in the completion report.

| Do not                                                                   | Do this                                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Derived label or filtered list stored with state + effect                | Compute during render                                             |
| Toast, navigate, or parent `onChange` fired from an effect               | Fire from the event handler                                       |
| Fat `async` handler in the page                                          | Feature hook; page calls it                                       |
| `useCallback` / `useMemo` / `React.memo` with no measured cost           | Leave it, unless a child or a dependency needs it                 |
| Query key that omits the filter, page, or id                             | Put every input that changes the result in the key                |
| New `QueryClient` per page                                               | The shared client                                                 |
| Mutation that only `console.log`s the error                              | Surface `isError` and the project error handler                   |
| Optimistic update nobody asked for                                       | Wait for the server                                               |
| Placeholder as the only label                                            | A real `label`                                                    |
| Submit disabled until the form is valid                                  | Keep it enabled until the request starts; disable while in flight |
| `outline: none` with no visible `:focus-visible` replacement             | Keep a visible focus ring                                         |
| Marketing layout on a product screen                                     | Match the density of sibling screens                              |
| Desktop-only layout that breaks the flow on a phone                      | Usable at mobile and tablet widths                                |
| Mega `index` import on a hot route when the repo documents a direct path | The direct path                                                   |

## Done when

- Pages compose app components, and server data is not loaded inside a presentational component.
- New pages, components, folders, state, and variables use the product concept, not an anonymous name.
- New public props and API functions have types or JSDoc.
- Colors that already have a token use that token.
- The diff does not introduce a blocking row. Should-fix rows are fixed or called out.
