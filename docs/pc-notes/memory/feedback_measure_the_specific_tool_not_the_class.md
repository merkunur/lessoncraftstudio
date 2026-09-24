---
name: feedback-measure-the-specific-tool-not-the-class
description: A defect class that is real for four sibling tools can be false for the fifth — and two expert panels plus a source trace can all be wrong together
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 34297790-8054-43df-bd93-6951aac88f8e
  modified: 2026-08-06T17:54:32.029Z
---

**A known, documented, already-fixed defect class is the easiest thing in the world to
diagnose wrongly, because everything about the situation says you have seen it before.**

2026-08-06, Syllable Splitter. The recorded class: `lcs-shell.css` sets
`html,body{height:100%;overflow:hidden}` and `.lcs-app{height:100%}`, `ActivityIframe` starts at
`INITIAL_HEIGHT=420`, so a tool gets latched at 420px and clipped. Four siblings ship the fix
(`pattern-bench`, `sorting-hoops`, `measurement-bench`, `wodb`).

I built a **seven-row table of verified source citations** for it. Two independent expert
panels each reported it, one of them tracing the same chain. The tool's own file even contained
a **half-written, deliberately disarmed** version of the fix with a comment from a previous
session explaining it had not been measured. Everything agreed.

**One browser run refuted it.** The shell posted 420 → 737 → 766; nothing clipped; every
control on screen.

**Why:** I traced `html → body → .lcs-app` and never asked what `.lcs-app`'s *containing block*
was. Its parent `#lcs-root` is unstyled, so its height is `auto`, so the percentage is
indefinite, so `height:100%` **resolves to `auto`** and the app was content-driven all along.

⭐ **CLAUDE.md §23.6 already said exactly this** — *"the recorded 422px pin is real **for tools
that bind `#lcs-root{height:100%}`**. This one never did, so its height was already
content-driven and the fix would have been cargo cult."* The doc was right; the panels, the
citations and I were wrong together.

**And the defect was real one viewport away.** Standalone on a phone there is no iframe to
grow: 320×568 put an 886px app in a 568px window with `scrollY` pinned at 0 and the reveal
control physically unreachable. The assumed case was false; a real case sat next to it.

**How to apply:**
- When a defect matches a recorded class, the recorded *caveat* is the first thing to check,
  not the last. Search the doctrine for the exception before writing the fix.
- **Percentage heights are the specific trap**: `height:100%` only pins if every ancestor up to
  the viewport has a definite height. Check the containing block, not just the two ends.
- Agreement between panels is not evidence — they read the same file and can share a premise.
  ⚠ *Independent* confirmation means a different measurement, not a second reader.
- Do the browser measurement **before** writing the fix, not to validate it afterwards. Here it
  cost one probe and saved shipping a cargo-cult change plus a false headline.
- When you retract, keep hunting: the reasoning that produced a plausible defect usually had a
  real one behind it in a case you had not enumerated.
