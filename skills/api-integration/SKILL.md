---
name: api-integration
description: >-
  Wire the frontend to an API from Swagger, OpenAPI, or another doc URL.
  Shared HTTP client, typed services, and the project data library. Do not
  invent endpoints. Open when scaffolding a new app, when a Figma URL is the
  only design source, or when a screen needs server data.
disable-model-invocation: true
---

# API integration

Open when a screen reads or writes server data, when the user gives an API contract, or when a new app is being scaffolded. A Figma URL is the screen. It does not replace the contract question. Ask for the Swagger, OpenAPI, or other doc URL before writing screen data.

## Contract first

1. **Swagger or OpenAPI URL, or a spec file in the repo:** use that contract for paths, methods, and types. Generate or hand-write the client from it. Do not drift from the spec.
2. **Another API doc URL:** read it and type the calls you use. Quote the path from the doc.
3. **No contract, and the screen needs data:** ask for the Swagger, OpenAPI, or doc URL. Do not invent paths, fields, or status codes.
4. **User says to stub:** add a typed TODO at the service boundary and label it as a stub. Do not put fake rows inside a hook.
5. **New app, no URL yet:** [project-init](../project-init/SKILL.md) defaults to Swagger. Scaffold the shared client and a typed stub service labeled TODO in `src/services/`, with no endpoints, and name the missing URL in the report. A later feature that needs data still asks for the contract.

Example. The user gives a Figma file of a list and no Swagger URL. Ask for the contract. Do not invent `GET /opportunities` and render five hard-coded rows from the page. A stub, only if they asked for one, is a typed TODO in `src/services/`, and the screen still shows loading, empty, and error.

## Shape

```text
page or feature hook
  → domain service
    → one shared HTTP client
```

- One client for the app (the fetch wrapper or axios instance the repo already has). Do not add a second client.
- UI does not call `fetch` directly when that client exists.
- Auth headers and the shared error handler live on the client, not in each screen.
- Types for the response live next to the client. Reuse them. Do not create a parallel DTO.
- Public config only in frontend env (`VITE_*` base URL, public client id). No secrets.

## Data library

Use the library the repo already uses. On a new app, that is the one chosen at setup: TanStack Query, RTK Query, or the library they named. Do not install a second. Rules stay the same if the API names differ:

- The query key includes every input that changes the result (filter, id, page).
- A detail query runs only when the id is present.
- Mutations invalidate the keys they change and surface errors. Do not infinite-retry a mutation.
- Do not create a new client instance per page.
- Do not optimistic-update unless the user asked.
- Multi-step work (read, then mutate, then poll) lives in a feature hook. The page calls the hook.
- Rapid filter changes must not apply a stale response. Abort or ignore the older request.

## Do not

- Load server data in `useEffect` when a data library is the project standard.
- Return mock arrays from hooks.
- Hide errors behind `console.log` when the screen needs an error state.
- Implement the backend.

## Done when

Calls match a real contract or an explicit stub, the shared client is used, and query keys include the inputs that change the result. Loading, empty, and error still belong to the screen ([build-ui](../build-ui/SKILL.md)).
