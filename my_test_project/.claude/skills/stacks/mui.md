# MUI

Open only when the repo uses `@mui/material` or Joy. Token policy lives in [best-practices](../best-practices/SKILL.md). Use the major version the repo already uses.

## Do

- `sx` and theme keys use the project palette or semantic roles, not one-off hex. On a new app the theme file lives in `src/theme/`.
- Responsive layout uses theme breakpoints.
- App components wrap MUI primitives when the project has that layer. Pages do not restyle every call site.
- Imports match the style the repo already uses.

## Do not

- A second UI kit beside MUI.
- `sx={{ color: '#…' }}` when a theme role already maps that value.
- Hard-coded media queries that fight theme breakpoints.
- v7-only `slots` migrations in a v5 app unless the user asked.
- A barrel `@mui/material` import on a hot route when the repo documents a direct path. See [performance](../performance/SKILL.md).
