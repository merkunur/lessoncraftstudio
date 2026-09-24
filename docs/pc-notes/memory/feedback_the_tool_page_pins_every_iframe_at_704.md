---
name: feedback_the_tool_page_pins_every_iframe_at_704
description: "The tool landing page caps every mini-tool iframe at 704px on every desktop, so any breakpoint above ~700 is dead on the real product surface — verify layout on the LIVE render, never only the local sweep."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7332850d-b275-49f7-a40b-e0cd4cb1e0b1
  modified: 2026-08-06T11:02:04.257Z
---

**Measured on production 2026-08-06, at three viewports:**

```
viewport 1440 -> iframe 704px  (parent 704px)
viewport 1920 -> iframe 704px  (parent 704px)
viewport 2560 -> iframe 704px  (parent 704px)
```

`frontend/app/[locale]/tools/[tool]/page.tsx` wraps the instrument in
`<article className="mx-auto max-w-3xl">` (768px) minus padding → **704px,
identical to the pixel at every desktop width.**

**Why:** #38 Draw Bag shipped a `@media (min-width:760px)` row layout — three
claim zones side by side, the bag beside the record. It **never fired on any
desktop a teacher owns.** The operator views on a desktop and saw the phone
layout: zones stacked in a column, bag above the record. Every local gate was
green, because the sweep drives `<tool>.html` **directly** at the width it asks
for and 768/1024/1366 were all in the list. The one width most teachers will
ever see was not.

This is the recorded pinned-iframe class — `pattern-bench`,
`measurement-bench` and `wodb` each shipped at phone size inside one — and it
keeps recurring because the local harness cannot see it.

**How to apply:**
1. **A mini-tool's usable width on the tool page is 704px.** Put any
   single-column→row breakpoint at **700 or below**, or it is decoration.
2. The `1367 / 1800 / 2400` wide tiers apply **only to the full-screen link**
   (`/mini-tools/<key>.html?lang=xx`), which is uncapped. They are not dead —
   but they are not what the landing page shows.
3. **Put 704 in the sweep's viewport list**, explicitly, with a comment saying
   it is the production width.
4. **After every deploy, measure the LIVE iframe** — `getBoundingClientRect()`
   on the `<iframe>` plus `flexDirection` on the layout containers inside it —
   before calling a layout done. Reading the local render is not the same
   thing, and on this build the two disagreed completely.

Widening the page container is a separate, cross-catalog decision affecting 47
tools; do not make it inside a single tool's rebuild.
