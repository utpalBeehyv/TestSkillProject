---
name: bug-fix
description: >-
  Fix a bug in an existing React frontend app. Use when something is broken,
  wrong, stays enabled, does not load, crashes, or regressed. Reproduces
  first and asks for steps when it cannot, shows the location, root cause,
  and test plan with no code, waits for approval, then delegates the fix,
  reproduces again, and runs the test-writer and quality-reviewer agents.
---

# Bug fix

The frontend pack is installed at `{{PACK_ROOT}}`.

If this repo has `.agents/skills/bug-fix/SKILL.md`, follow that copy and the rules in `.agents/rules/`, so the repo’s snapshot wins. Otherwise read every file in `{{PACK_ROOT}}/rules/`, then read `{{PACK_ROOT}}/skills/bug-fix/SKILL.md` fully and follow it. Resolve its relative links from that file’s folder.
