---
name: browser-validation
description: >-
  Verify the change in a real browser: load the page, look at every visible
  part and state, then click the flow, including empty and error when they
  apply. A screenshot alone is not done. Clicks alone are not done. Required
  for UI and behavior changes.
disable-model-invocation: true
---

# Browser validation

Required for any UI or behavior change, after [testing](../testing/SKILL.md). A single screenshot is not validation. Do not report a pass you did not perform.

If the app has no URL and will not start, stop and say what blocked you. Do not invent a pass.

## Do this

1. Open the app the way a user would. Sign in if the screen requires it.
2. Wait until the network and the UI settle.
3. Look at the rendered page at the design width, then click, type, and submit. Clicks that prove the flow are not a visual pass.
4. When a frame or a screenshot of the intended UI exists, run the fidelity check in [figma-to-react](../figma-to-react/SKILL.md) (“Fidelity check”) on the rendered page: structure first (every element, its children, their order and count), then every visible part, every text role’s computed type, and every glyph with the fill behind it. A parent value is not proof for the parts inside it. That section is the one list. Do not shorten it here.
5. Open every state the control can show: resting, selected, empty, error, and each sibling in a group (cards, tabs, nav, filters). The item that is selected on first paint does not cover the others. Compare the icon glyph and the tile behind it in each state. A selected background, border, or text color does not excuse a new icon color.
6. Exercise the changed flow:
   - Happy path
   - Empty, when the screen can have no data
   - Error, when a request can fail
   - The bug path, before and after, when this is a fix
7. Check the browser console for new errors.
8. Check a narrow width and the desktop width when layout changed. The layout should stay usable. Do not invent a new breakpoint table. A row the frame keeps on one line at the main width fails when the last item wraps there. Scroll or wrap only below that width.
9. When a Figma map exists, do not call the screen done if the fidelity checklist in [figma-to-react](../figma-to-react/SKILL.md) is empty.
10. Measure a shared button, field, or pill again on this screen. The first screen’s variant does not prove a later use. A text action with an arrow is not the bordered button from another frame.

Two or more screens: check each screen, not only the last one. The count of screens does not shrink the look. The report is one block per screen, not one line. The block names each frame element, then each of its children as present or absent, then pass or fail for the parts that exist, including the computed type and glyph numbers in the report section. “Clicked” without that block is not run. Not run on any screen means the set is not done.

## Examples

The examples of the class live in [figma-to-react](../figma-to-react/SKILL.md) under “Fidelity check”. They are not the only things to look for.

## When something looks wrong

| What you see | Check first |
|--------------|-------------|
| Blank page | Console, URL, auth redirect |
| Control does nothing | Still loading, overlay, wrong element |
| Assertion too early | Wait until the UI has settled |
| A part sits off its label, or spacing, size, type, color, border, radius, or an icon looks wrong | The part’s box, not the parent’s `align-items` or background |
| An icon or tile changes color when the control is selected | That item’s selected frame and its resting frame. Check every sibling, not only the one selected on first paint |

## Report

For each screen, write one block. Name the URL and the viewport. Name each frame element and each of its children as present or absent, then pass or fail for the parts that exist. For every text role, list the computed family, weight, size, line height, letter spacing, and color, then pass or fail against the frame. For every glyph, list the fill behind it (size, color, radius, border), the painted glyph color in each state, the computed width and height against the frame node, and whether the box matches the viewBox ratio, then pass or fail. A ratio line without those two numbers is an empty checklist. “Present” or “clicked” without those numbers is an empty checklist. Step 9 already stops on an empty checklist. “Clicked” without that block is not run.

Not run means the screen is not done. Stop. Do not write the completion report as done while any screen is not run. A green unit run that only checks words or clicks leaves a missing child, a merged structure, wrap, selected fill, button height, computed type, a missing fill behind a glyph, a stretched glyph, and a glyph larger than its frame node open.

Say what you could not verify (no browser tools, auth wall, missing data). Fix a failure you caused, then re-check that flow. A visual mismatch is fixed and looked at again. Recording the gap and calling the screen done is allowed only after a fix attempt, and only when the frame itself cannot be matched.

## Done when

The changed flows have been clicked, the rendered parts and states have been looked at, and each screen’s report block names every frame element and each of its children as present or absent, then pass, fail, or not run, with the computed type and glyph numbers from the report section, including each glyph’s computed width and height against its frame node. A click-through without that block is not done. Not run on any screen means you stop before calling the work done.
