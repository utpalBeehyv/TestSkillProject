# Chakra UI

Open only when the repo uses `@chakra-ui/react`. Token policy lives in [best-practices](../best-practices/SKILL.md). Use the version the repo already uses. Do not force v3 APIs onto a v2 app.

## Do

- Theme uses `createSystem` / `defineConfig` (v3) or a theme extend (v2), with primitive tokens plus semantic roles (`text.muted`, `bg.page`). On a new app the theme file lives in `src/theme/`, not `src/theme.ts`.
- Call sites use token paths (`color="text.muted"`), not raw hex, when a role exists.
- Shared field components own input chrome. Pages pass value and handlers.
- A second theme remaps semantic tokens. It does not rewrite pages.

## Do not

- Hex in a page or component when a token already maps that value.
- A second UI kit beside Chakra.
- Restyle `Input` at every call site. One `AppInput` owns the chrome.
