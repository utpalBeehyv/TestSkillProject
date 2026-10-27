---
name: accessibility
description: >-
  Keyboard, accessible names, focus, and contrast for frontend UI. Open for
  forms, dialogs, menus, tables, and custom controls. Prefer native elements;
  see semantic-html.
disable-model-invocation: true
---

# Accessibility

Open when the change adds or edits a control, form, dialog, menu, table, or custom widget. A color-only tweak can skip this; say so. Do not silently recolor a design token to pass contrast. Report the gap.

Native elements come first. See [semantic-html](../semantic-html/SKILL.md). Add ARIA only when the native element cannot express the name, role, or state.

## Do

- Every pointer action has a keyboard path. Enter and Space activate. Escape closes an overlay. Arrow keys move inside a composite widget (tabs, menu, listbox). Tab moves between widgets.
- Visible `:focus-visible` ring, at least about 2px. Never `outline: none` without a replacement you have checked.
- Only `tabindex="0"` and `tabindex="-1"`. No positive tabindex.
- Dialogs: background inert, focus moves inside on open, focus returns to the trigger on close.
- Every field has a real label. Errors set `aria-invalid` and point at the message with `aria-describedby`. Move focus to the first invalid field.
- Icon-only buttons have an accessible name. Decorative icons are hidden from assistive tech and are not focusable.
- Do not encode status by color alone. Add text or an icon.
- Hit target at least 24×24 CSS pixels. Aim for about 44×44 on touch when density allows.
- Respect `prefers-reduced-motion`. Autoplay has a pause control.
- One `main`. A skip link when chrome comes before the content.
- The page still works at 200% zoom and reflows around 320px without the whole app scrolling sideways.

## Do not

- Leave a control without an accessible name.
- Trap focus incorrectly, or drop focus when a dialog or route closes.
- Put `aria-hidden` on a focusable element.
- Use the placeholder as the only label.
- Disable submit until the form is valid. Disable it while the request is in flight, and keep the original label (a spinner may sit beside it).
- Announce a routine toast with an assertive live region.

## Done when

You can complete the changed flow with the keyboard, each new control has a name, and focus is visible. Contrast gaps are listed, not quietly recolored.
