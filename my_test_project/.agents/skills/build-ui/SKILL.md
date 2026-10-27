---
name: build-ui
description: >-
  Build frontend screens in an existing app: shared components, forms, and
  pages with loading, empty, error, and success. Match the existing stack.
  Read by the ui-builder agent. A new app starts in project-init.
disable-model-invocation: true
---

# Build UI

Open when you are building a screen. Read [best-practices](../best-practices/SKILL.md), [semantic-html](../semantic-html/SKILL.md), and [accessibility](../accessibility/SKILL.md) before you write components.

A new app starts in [project-init](../project-init/SKILL.md). It owns the setup questions, the folder layout, the defaults, and the agent files. Do not scaffold inside an existing app.

A screen is built inside [feature-implementation](../feature-implementation/SKILL.md), after its gate, by the `ui-builder` agent.

Do not add a second styling system. This pack is React.

## Docs stay current

`README.md` and `docs/app-flow.md` are part of the change. [stay-in-scope](../../rules/stay-in-scope.md) has the rule. The completion report names the doc when it was updated, and says so when a flow change left it stale.

## Folder layout

An existing app keeps its own folders. A new app uses the layout in [project-init](../project-init/SKILL.md). Feature folders, pages, and shared components use the names in [best-practices](../best-practices/SKILL.md). `src/pages/Page.tsx` and `src/features/misc/` are rejected.

- One shared-component folder. `src/components/shared/` on a new app. If the repo already uses `common` or `ui` as that one folder, keep that name and do not add a second.
- A page composes when it does route work the view does not: read a param, call the feature hook, pass data in, or place more than one feature component. A file whose only line is `return <View />` is not composition. The route element is the view. Do not add a second component that only renders the first.

## Existing app

Follow folders, aliases, and components that are already there. The scope was approved at the feature-implementation gate. Build in this order:

1. Shared components (new or extended).
2. Forms, using the form library the repo already has.
3. Pages that only compose those components.

A page does not invent a second copy of a filter, table, or field. If the component is missing, add it, then use it.

A complete Figma file follows the same order in [figma-to-react](../figma-to-react/SKILL.md): every shared control first, then the screens, one screen at a time.

## States

A screen that loads data shows:

- **Loading** — the pattern sibling screens use (skeleton or spinner)
- **Empty** — an explanation, and an action when the user can do something
- **Error** — the message and a retry when the user can retry
- **Success** — the data

Forms show field errors in words. Disable the submit button while the request is in flight, not before the user is allowed to submit.

Match the density of neighboring product screens. Do not introduce a marketing hero, gradient, or fake device chrome on an admin or list screen.

## Figma and API

If the ask has a Figma URL, follow [figma-to-react](../figma-to-react/SKILL.md) and build from the map. If the screen needs server data, it comes through the feature hook from [api-integration](../api-integration/SKILL.md). Do not hard-code a pretend payload in the component.

## Done when

The screen uses the project’s components and tokens, the data states exist when data is loaded, and the screen is handed to testing and browser validation.
