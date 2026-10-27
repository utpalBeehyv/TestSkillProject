---
name: semantic-html
description: >-
  Use native HTML elements for their job: button, link, label, headings,
  lists, and landmarks. Open whenever you add markup. ARIA does not replace
  a missing native element.
disable-model-invocation: true
---

# Semantic HTML

Open whenever you add or change markup. This is separate from the keyboard and contrast checks in [accessibility](../accessibility/SKILL.md).

The platform already gives you keyboard support, names, and roles. Rebuild that with a `div` and ARIA only when no native element fits.

## Use the element that matches the job

| Job | Element |
|-----|---------|
| Action on the page | `button` |
| Go to a URL | `a href` |
| Name a field | `label` tied to the input (not placeholder-only) |
| Page or section title | `h1`–`h6` in order, one `h1` |
| Group of items | `ul` / `ol` / `li`, or `table` for real tabular data |
| Primary content | `main` |
| Navigation | `nav` |
| Supporting content | `header`, `footer`, `aside` when that is what it is |
| Clickable row that navigates | `a` around the row content, or a `button` inside the row |

## Do not

- `div` or `span` with `onClick` for a button or a link.
- `role="button"` on a non-button when `button` works.
- Heading levels chosen for font size. Style the heading; do not skip levels to look smaller.
- A `table` used only for layout, or a pile of divs used for real tabular data.
- Multiple `main` landmarks.
- An image that conveys meaning with an empty `alt`. Decorative images get `alt=""`.

## Done when

New interactive and structural markup uses the native element. ARIA is added only for a name or state the element does not already expose.
