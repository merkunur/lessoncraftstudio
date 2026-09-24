---
name: feedback_read_the_webp_the_log_says_ok_either_way
description: "A tool preview card can ship the tool refusing to do something and the generator still logs ok — read the rendered webp, never the log"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: efb9d9af-985f-4250-8ce3-71c680013430
  modified: 2026-08-11T15:58:32.041Z
---

**The hub card for #55 shipped captioned "That is the one they have to work out,
so it cannot be told."** — the tool declining to act, as its first impression on
the hub. `generate-tool-previews.js` reported `ok`.

**Why it happened:** the seed pressed all three "tell" buttons and let the one
that IS the question refuse "harmlessly". The refusal animation is gone in 200ms,
so it looked safe — but **the say-line KEEPS a refusal message**, and that is
what the screenshot caught.

**How to apply:**
- **Read the .webp after every seed change.** The generator's `ok` means it wrote
  a file, not that the file is worth showing. This is already recorded for the
  `--fit=auto` crop; it is equally true of the tool's own STATE.
- **A seed must end on the moment the tool exists for**, never on a refusal, a
  rest state, or a half-finished action.
- Check which control the seed's clicks actually land on: a control that refuses
  in one configuration may succeed in another (here the question niche varies by
  arrangement, so a "harmless" click is only harmless in some families).
- ⚠ A seed whose selectors no longer exist photographs the REST state and still
  logs `ok` — the recorded #54 defect. Name the selectors in the seed's comment
  so a future rename is visible.

Related: [[feedback-activity-page-copy-and-thumbnails]],
[[project_missing_question_rebuild]]
