---
name: security
description: >-
  Frontend security for XSS, secrets, browser storage, and redirects. Open
  when the change touches HTML injection, auth, storage, redirects, or new
  dependencies. Skip pure layout with a written reason.
disable-model-invocation: true
---

# Security

Open when the diff adds or changes HTML injection, auth UI, tokens, `localStorage`, redirects, or a new dependency. A pure layout change can skip this; write the reason. Do not skip if the diff contains an HTML sink.

This is the client. It does not replace server authorization.

## Do

- Render user content as text. If HTML must render, use a sanitizer the project already approves, and name that policy.
- Keep secrets on the server. A public SPA may hold a public client id. It must not hold a client secret, API key, or session signing key.
- `VITE_*` and other client env values stay non-secret (base URL, public id). Do not commit real secrets in `.env` files.
- Do not log tokens, cookies, or `Authorization` headers.
- Treat a client-side role check as a UX hint. The server still enforces the action.
- Validate or allow-list a URL before `window.location` or a redirect from a query param.
- Avoid putting personal data in `localStorage` or `sessionStorage` unless the user asked and the risk is noted.
- Keycloak or another OIDC login: use a public client with PKCE, no client secret. Keep the access token in memory in the auth provider, refresh it before it expires, and attach it on the shared HTTP client. Do not store tokens in `localStorage`.
- Glance at a new dependency. Do not add an abandoned or untrusted package to get one helper.

## Do not

```tsx
<div dangerouslySetInnerHTML={{ __html: noteFromUser }} />
```

```ts
const API_KEY = 'sk_live_…'
const secret = import.meta.env.VITE_CLIENT_SECRET
```

Render text, or sanitize with an approved policy. Read secrets only on the server.

## Done when

The diff has no unsanitized HTML sink, no client secret, and no open redirect from raw user input. If you skipped the review, the completion report says why.
