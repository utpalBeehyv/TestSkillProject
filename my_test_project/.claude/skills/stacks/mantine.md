# Mantine

Open only when the repo uses `@mantine/core`. Token policy lives in [best-practices](../best-practices/SKILL.md). Use the major version the repo already uses. v7 and later style with CSS modules; v6 used Emotion. Do not migrate versions in a feature change.

## Do

- Theme from `createTheme` in `src/theme/`, passed to `MantineProvider` in `src/app/`. Colors are ten-shade tuples. Semantic roles map onto them (`primaryColor`, `other`, or CSS variables).
- Call sites use theme values (`c="dimmed"`, `var(--mantine-color-…)`), not raw hex, when a role exists.
- Style the way the repo does: CSS modules and the `classNames` / `styles` API on v7, not an inline `style` on every call site.
- App components wrap Mantine primitives (`AppButton` over `Button`). Pages import the app component.
- Forms use the library chosen at setup (react-hook-form with zod). Do not add `@mantine/form` beside it.
- Import only the packages in use (`@mantine/core`, `@mantine/dates`), and their CSS once in the app entry.

## Do not

- A second UI kit or styling system beside Mantine.
- `style={{ color: '#…' }}` when a theme color already maps that value.
- Emotion `sx` or `createStyles` patterns in a v7 app.
- Hard-coded media queries that fight theme breakpoints.
