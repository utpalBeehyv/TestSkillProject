# App flow

The one architecture and screen-flow doc for this app. Update it in the same
change whenever routes, screens, data flow, state, or folder roles change
(see `.agents/rules/stay-in-scope.md`).

## Status

One screen built: the standalone sign-in screen at `/sign-in` (see
`src/features/sign-in/`). No auth exists in this app (per the stack
below), so it is prototype-only — a valid submit navigates straight to
the placeholder home route. `/` itself is still the shell placeholder.

## Stack

npm, Vite, JavaScript, MUI, Redux Toolkit + RTK Query, no auth, Swagger
(stub pending URL).

## Folder roles

| Folder                   | Role                                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app/`               | Entry composition: `App.jsx` (providers), `router.jsx` (routes, lazy loading), `AppErrorBoundary.jsx` (root + per-route error boundary)                                                                                                                            |
| `src/theme/`             | MUI theme (`theme.js`), semantic palette roles. Overwritten with real tokens once a Figma file is supplied                                                                                                                                                         |
| `src/components/shared/` | Cross-feature components. Today: `AppField`, a react-hook-form `Controller` wrapper around MUI's `TextField`, and `AppButton`, a wrapper around MUI's `Button` with the file's primary/secondary/text treatments — both reused by `SignInForm`                                                                                                     |
| `src/pages/`             | Screens that compose shared components and feature hooks. Today: `HomePage` (placeholder), `SignInPage` (`/sign-in`), `NotFoundPage`                                                                                                                               |
| `src/services/`          | `httpClient.js` (the one shared HTTP client, shared error handler, base URL from `VITE_API_BASE_URL`) and `apiStub.js` (typed TODO stub until a Swagger/OpenAPI URL arrives)                                                                                       |
| `src/state/`             | `store.js` (the Redux store) and `apiSlice.js` (the RTK Query API slice, `baseQuery` adapted from `httpClient`)                                                                                                                                                    |
| `src/test/`              | Vitest + Testing Library setup (`setup.js`)                                                                                                                                                                                                                        |
| `src/assets/`            | Images and other static assets. Today: `sign-in/` — the illustration panel's three slide images and icons, downloaded from Figma                                                                                                                                   |
| `src/features/<name>/`   | Per-feature hooks and feature-scoped components. Today: `sign-in/` (`signInSchema.js`, `useSignInForm.js`, `useIllustrationCarousel.js`, `illustrationSlides.js`, `components/PasswordField.jsx`, `components/IllustrationPanel.jsx`, `components/SignInForm.jsx`) |
| `src/auth/`              | Not created — auth is not required for this app                                                                                                                                                                                                                    |

## Routes

| Path       | Page           | Notes                                                                                                                                      |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`        | `HomePage`     | Placeholder home. Lazy-loaded, wrapped in a per-route error boundary with retry                                                            |
| `/sign-in` | `SignInPage`   | Standalone sign-in screen. Lazy-loaded, same error-boundary treatment. No auth exists in this app, so a valid submit just navigates to `/` |
| `*`        | `NotFoundPage` | Catch-all not-found route. Same lazy-loading and error-boundary treatment                                                                  |

All three routes render inside one `<Suspense>` boundary in `src/app/router.jsx`,
inside the app-root `AppErrorBoundary` in `src/app/App.jsx`.

## Data flow

```
page or feature hook
  -> domain service (src/services/)
    -> httpClient (src/services/httpClient.js)
```

RTK Query endpoints (`src/state/apiSlice.js`) call through the same
`httpClient` via a custom `baseQuery` adapter, so there is still only one
HTTP client in the app, per `api-integration`.

No endpoints exist yet: `src/services/apiStub.js` is a typed TODO, and
`api.injectEndpoints(...)` has nothing injected. **No Swagger/OpenAPI URL
has been supplied.** A future feature that needs server data asks for that
contract before writing a service or an endpoint, per `api-integration`.

The sign-in screen does not go through this path: there is no backend or
auth in this app, so `useSignInForm` validates locally (zod) and navigates
straight to `/` on a valid submit instead of calling a service.

## State

- Redux store: `src/state/store.js`, currently holding only the RTK Query
  `api` reducer.
- No client-state slice exists yet — add one only when a future feature
  needs cross-tree state that is not server data and not local to one
  component (see `.agents/skills/best-practices/SKILL.md`).
- The sign-in screen's state is local/feature-scoped, not cross-tree:
  `useSignInForm` (react-hook-form) and `useIllustrationCarousel` (the
  illustration panel's active slide, play/pause, and auto-advance timer).

## Auth

Not required for this app. There is no `src/auth/` folder and no token
handling. The sign-in screen is a UI-only prototype — see its own note
("Prototype only. Use a made-up password; accounts are not verified.").

## Next step

The sign-in screen (`/sign-in`) was built from a Figma frame via
`feature-implementation`. `/` is still the shell placeholder. The next
step is the next feature or screen's `feature-implementation` pass, or
`design-foundations` if a fuller Figma file arrives.
