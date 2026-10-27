---
name: figma-to-react
description: >-
  Turn a Figma URL into React that matches the file. Map the frame, build
  shared components then screens, then check every visible part and state
  for size, spacing, type, color, and alignment. Open only when a Figma URL
  is part of the ask.
disable-model-invocation: true
---

# Figma to React

Open when the ask includes a Figma URL. If there is no URL, do not ask for one unless the user said the design lives in Figma.

If Figma tools are unavailable or rate-limited, stop and say so. Do not invent the layout. The user can enable the tool, paste a screenshot plus specs, or explicitly allow a layout inferred from sibling screens.

## Map, then build

1. Find the product frame. Cover collages and marketing covers are not the screen.
2. Read structure, design context, and a screenshot for **this** frame. Skip hidden layers.
3. Record measured values as facts: width, height, padding, gap, radius, font, color, and content alignment (`left`, `center`, `right`). Compute a gap from coordinates when auto-layout is missing. Do not round to a nearby theme step unless that token’s pixel value is equal.
4. Classify each piece: already in the repo, extend it, or new. Prefer reuse, then extend, then new.
5. Map colors to a project token only on an exact match. A near token (`#3A7EEA` → `blue.500`) is wrong. One-off hex is allowed only when no token matches. The second use of that hex becomes a token.
6. Download assets into the project asset folders. Bind each file to its source node. Do not leave temporary Figma URLs in code. Prefer a transparent image over an opaque plate on a different background.
7. Build from the map. Treat generated Figma code as a picture, not as app code. Use flex or grid, and keep the measured sizes.

Responsive default: match the main frame exactly, and keep the layout usable on mobile and tablet. Do not invent pixel specs for widths you did not measure. If the user gave separate desktop, tablet, and mobile frames, match each frame you were asked to build.

## Complete file

During [project-init](../project-init/SKILL.md), a Figma file gives the theme tokens and the shared components only. Screens wait for the user’s yes to the handoff question.

In [feature-implementation](../feature-implementation/SKILL.md), a complete Figma file or page is the ask for every product frame on it. Foundations, covers, and extra states of a screen already in the file are not extra screens. A named screen that the user did not include is still out of scope.

Before any screen file, list every control used on more than one frame: buttons, fields, cards, nav, pills, shells. Build that list once in the one shared folder (`src/components/shared/`, or the repo’s existing `common` or `ui`). Include selected and resting variants there.

Then build screens. A screen only composes those components. It does not paste a second button, field, or card.

Measuring a shared button, field, or pill when you first build it does not cover a later screen. Measure that control again on each frame that uses it. One variant is wrong when the same name is a different size or treatment on the next frame. Extend the shared component for the treatment that frame shows.

When the file has more than one product screen, the shared list is built first. Then feature-implementation calls the `ui-builder` agent once per screen, in sequence, and only after those shared components exist. A screen call does not edit a shared component except to fix a gap a screen check found, and that fix stays in the shared component. One screen at a time, so two agents are not in the same files.

Example. A file with sign-in and home. Shared first: field, button, pill, summary card, shell. Then one `ui-builder` call per page builds the two pages from those. It does not rebuild the summary card inside the home page.

## Many screens

Count the product frames before coding. Foundations stay tokens. Extra states stay states of a screen already in the file.

Build one screen, fill its fidelity checklist, then the next. The number of frames does not shrink that checklist. A set is not done when the checklist is empty for any frame, or when a gap is recorded before the three fix attempts. A heading on the page is not that checklist.

## Conflicts

| Conflict | Prefer |
|----------|--------|
| Figma alignment vs a kit’s centered default | The Figma alignment |
| Exact px vs the nearest spacing token | Exact px, or a token that equals that px |
| Parent sized, child left at the kit default | Width and height on the interactive control |
| Figma color vs contrast | Report the contrast gap. Do not recolor in secret |
| New control vs an existing component | Extend the existing component |
| Cover page vs the named feature frame | The feature frame |
| `flex-wrap: wrap` vs a frame that keeps the row on one line | One line at the main frame width. Scroll or wrap only below that width |

## Fidelity check

After the screen is built, compare the rendered UI to the map at the main frame width and 100% zoom. A screenshot alone, a unit test, or a parent CSS value is not this check. Clicks that prove the flow are not this check either. [browser-validation](../browser-validation/SKILL.md) repeats this look. The screen is not done when the look was skipped.

Before comparing pixels, list every element on the frame. The list is not closed: header, title row, banner, nav, table, card, form, button group, side panel, and footer are examples. Any other block on the frame is an element too. For each one, record its children, their order, and their count. An element that is absent, or whose children were dropped or merged into a different structure, fails. Words that remain do not make the missing child present. Do not start the size checklist until that list is filled.

The same rule covers every kind of element:

- A table fails when the header row is gone, a column is missing, or a cell’s value is painted from a different column. A list of title, subtitle, pill, and button is not that table.
- A card fails when the icon, a labeled field, or a control on the card is gone, or when separate fields are joined into one sentence. An icon button on the card is not covered by a text button elsewhere.
- A banner, title row, or side panel fails when a line, icon, or action the frame shows is missing, or when stacked lines are collapsed into one.
- A button group, nav, or form fails when a control is missing, or when one shared treatment stands in for controls the frame draws differently.

Check every visible part, not a closed list of bug types. For each part, record pass or fail for:

- Size (width and height on that part, not only the parent)
- Padding, gap, overflow, and wrapping
- Alignment of the part itself. `align-items` or `justify-content` on the parent does not prove a count, badge, icon, or chevron shares a center with its label
- Font family, weight, size, line height, letter spacing, and color, read from the rendered part. A font file loaded in the app entry is not a pass. A part that sets no size of its own fails when the computed size is the browser default, or a size the frame does not use. Each text role on the frame is its own part.
- Color and border of that part. A card background does not prove the icon glyph or the tile behind it
- Radius when the map has it
- Icon glyph matches the file, not a similar icon. The glyph and each fill behind it are separate children. The panel, card, or row behind the group does not cover a fill that belongs to the glyph. Record that fill’s size, color, radius, and border. A bare glyph when the frame draws a fill is a missing child. A glyph whose color is baked into the file fails when the frame paints a different color, including a selected state.
- The glyph keeps the frame’s aspect ratio. A non-uniform scale fails. That includes `preserveAspectRatio="none"`, a mask or image sized `100% 100%`, and a box whose width and height do not match the viewBox. `contain` is the fit. The glyph is not cropped to force the box.
- The glyph box and the fill behind it are separate sizes. For each, record the frame node’s width and height and the computed box. Fail when either axis is larger than that node. A matching aspect ratio, `contain`, or a square viewBox is not a size pass. A kit default (24px icon, `1em`, or an omitted width so the file’s own pixel size wins) is not the frame size. A glyph set to the tile’s size fails when the frame draws a smaller mark inside that tile.

Open every state the control can show: resting, selected, empty, error, and each sibling in a group (cards, tabs, nav, filters). The item selected on first paint does not cover the others. Compare the icon glyph and the tile in each state. Fail when selection recolors a glyph or tile and that state’s frame keeps the resting color. Fail when the selected frame shows a different icon color and the built color is not that one.

Example. A section title sets only weight. Computed size is the browser default and line height is normal. The frame’s title size and line height fail.

Example. A nav mark is the glyph alone on the panel. The frame draws a filled, rounded square behind that glyph, and a filled chip behind the collapse control. Both fills are missing. A selected row keeps the resting glyph color. An exported icon sets `preserveAspectRatio="none"` and the box is not square, so the stroke is stretched. The collapse glyph is 14×14 on the frame and 20×20 in the build. The box is square, so the ratio passes and the size fails. That example is not the whole check.

Examples of that class, not the whole checklist:

- Any element whose children were dropped or merged fails before padding is checked. A table loses its header. A card joins two labeled fields into one sentence. A banner loses its icon. A button group replaces an icon button with one shared text button. The words that remain do not make those children present.
- A status chip and its count are centered as a row. The count box is taller than its line height, so the digit sits high. The parent’s `align-items` is not a pass.
- Summary cards are one group. The pressed tile is a different color from the resting tile. First paint only presses the first card. Click each card and compare that card’s icon to its own selected frame.
- A step or tab row in the frame keeps every item on one line, and the current item is a filled number or pill with its own bar. `flex-wrap: wrap` that drops the last item, or a light chip with an underline, fails at the main frame width. Do not call wrap the desktop layout because a phone must stay usable. On a narrow width, scroll or wrap. Do not invent a second desktop layout.
- The same shared button is a bordered action on one frame and a text action with an icon on the next. Fail the later screen until that use is measured and the shared component is extended.

A green test that only checks the words or the click does not close a layout fail. Wrap, the selected fill, the button height, computed type, a missing fill behind a glyph, a stretched glyph, and a glyph larger than its frame node stay open on this checklist.

Fix up to three times, then look again. If a value cannot match, write the gap and the closest implementation. Recording the gap and calling the screen done is allowed only after that fix attempt. Do not say “pixel perfect” without this checklist filled.

Do not finish while any frame’s visual check is not run. Stop. Do not write the completion report as done. A recorded gap is allowed only after the three fix attempts, and only when the frame itself cannot be matched.

## Done when

The map exists, the code follows it, and the fidelity checklist is filled for each screen and each state you built. Then run testing and browser validation for that screen.
