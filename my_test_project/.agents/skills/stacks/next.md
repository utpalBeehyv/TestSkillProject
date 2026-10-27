# Next.js App Router

Open only when the repo uses the Next.js App Router. Do not open this for a Vite or other client-only app. Client-side list and bundle rules stay in [performance](../performance/SKILL.md).

## Do

- Leave components on the server unless they need events, browser APIs, or a client-only library.
- Start independent server fetches together (`Promise.all` or a composition that does not force a sequence).
- Follow the repo’s existing cache and revalidation. Do not invent a new cache policy.
- Keep heavy editors and charts out of the first client bundle.

## Do not

- `await` independent server data one after another on a critical path.
- Put `'use client'` at the root so the whole tree becomes a client component.
- Pass a huge serialized prop when a smaller DTO is enough.
- Force server-component patterns onto a client-only package in the same monorepo.
- Add Server Actions or `revalidatePath` when the repo does not already use them.
