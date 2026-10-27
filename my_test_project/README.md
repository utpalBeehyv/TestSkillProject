# my_test_project

A React app scaffolded with Vite, MUI, and Redux Toolkit + RTK Query.
Agent instructions for working in this repo are in `AGENTS.md`.

## Stack

- Package manager: npm
- Framework: Vite
- Language: JavaScript
- UI kit: MUI
- State: Redux Toolkit + RTK Query
- Auth: not required
- Backend contract: no Swagger/OpenAPI URL yet — see `src/services/apiStub.js`

## Install

Requires Node 22 (see `.nvmrc`).

```bash
npm install
```

## Run

```bash
npm run dev
```

Copy `.env.example` to `.env` to set `VITE_API_BASE_URL` (optional in
development — the shared HTTP client falls back to same-origin paths).

## Test

```bash
npm test
```

Vitest + React Testing Library + jsdom. Setup lives in `src/test/setup.js`.

## Lint and format

```bash
npm run lint
npm run format
```

ESLint (flat config, `eslint.config.js`) and Prettier.

## Build

```bash
npm run build
npm run build:analyze   # same build, plus dist/stats.html (bundle visualizer)
```

## Docker

```bash
docker compose up --build
```

Multi-stage build (install, build, serve with nginx on port 8080). SPA
routes fall back to `index.html`; see `docker/nginx.conf`.

## Architecture and screen flow

See [`docs/app-flow.md`](docs/app-flow.md) for routes, folder roles, data
flow, and state. This is a shell — no feature or screen has been built yet.

## Agent instructions

Agent instructions (workflow, code quality, code standards, performance)
live in `AGENTS.md`.
