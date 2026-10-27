# Tailwind

Open only when the repo uses Tailwind. Note v3 (`tailwind.config`) or v4 (`@theme`). Do not migrate versions in a feature change. Token policy lives in [best-practices](../best-practices/SKILL.md).

## Do

- Colors, spacing, and radius come from project tokens or semantic utilities, not a new arbitrary value on every screen. On a new app the token file lives in `src/theme/`.
- Shared components use the variant helper the repo already has (CVA, `tv`, or class helpers).
- Shared fields own chrome. Pages pass value and handlers.
- Focus rings stay visible. Add a `dark` variant only if the product already has dark mode.

## Do not

- A second styling system beside Tailwind.
- `text-[#…]` or `bg-[#…]` when a token or semantic utility already maps that value.
- A marketing gradient on a product screen.
- Pasting a v4 `@theme` starter into a v3 repo.
- `outline-none` without a visible focus replacement.
- `@apply` blocks that rebuild the design system in every page.
