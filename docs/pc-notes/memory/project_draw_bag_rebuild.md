---
name: project_draw_bag_rebuild
description: "Tool #38 The Draw Bag rebuilt to the v4 bar 2026-08-06 — the operator's \"bug\" was the paywall sitting on the tool's own thesis, and every gate was green while the row layout was dead on every desktop."
metadata: 
  node_type: memory
  type: project
  originSessionId: 7332850d-b275-49f7-a40b-e0cd4cb1e0b1
  modified: 2026-08-06T11:01:48.107Z
---

**LIVE 2026-08-06.** `mini tools/draw-bag.js` build #4. 220 assertions driven on
production, 11/11 locales. Commits `4d21f05c` → `71d184d9` on
`pivot/printable-business-toolkit`.

The operator said **"Super confusing. I could not get the point at all"** and
**"the objects could not be placed on the second line at all."** Both
reproduced. Neither was the whole story.

## What was measured on the shipped tool, before any fix

- **Placement was a blind 3-cycle.** One piece, six taps:
  `pool→in→out→pool→in→out→pool`. `placeGuess` was `(guess[kind]+1)%3`. You
  could not aim; the middle zone cost three taps. Visible zone labels: `""` —
  **zero characters**; the tints measured 1.13:1 and 1.08:1 on cream.
- ⭐⭐ **The second line WAS the paywall.** At the end of run one: two record
  rows, the second holding 0 cells and unfillable, the bag `disabled` at
  `opacity:.5`, "Run it again" locked, the hint saying "Open the bag", and the
  gate line **not shown at all**. Run two — the entire thesis — was premium.
- ⭐⭐ **"Fill the bag" showed the class the answer.** A free, always-live chip
  painted `[10,7,0,0,0,0]` — byte-identical to `st.bag` — because `openDraft`
  copied the sealed bag into the draft. The tool's first sentence is "Nobody
  may look inside."
- ⭐⭐ **The first tap committed an empty prior.** `draw()` set
  `committed = true` unconditionally and `canDraw` was true on cold load.

## ⭐⭐ The eleven native panels audited MY ENGLISH and found ten more

Three groups, reading the MODEL separately, converged: "row" was a **fourth
named part** in a three-part tool; `hintLook` said "look back UP at both rows"
when the records render BELOW and one row is reachable; `doctrine` asserted a
state false for most of the lesson AND carried an imperative `placeGuess`
refuses; both said "say what **IS** inside" in a tool whose `composition()`
throws so nobody can; the hint ladder was **inverted** (the only string naming
the destinations appeared after you'd found them); and three aria templates
rendered as **"one more the round one"** — pt and it had inherited the shape.
Two catches no English review could make: sv `biten` is also "bitten"; fi
`palaa` is "burns". See [[feedback_native_panels_audit_the_source]].

## ⭐⭐ The defect that survived every gate: the row layout was dead

Measured **after deploying**: the tool page wraps every instrument in
`article.mx-auto.max-w-3xl`, so the iframe is **704px at 1440, 1920 AND 2560,
identical to the pixel**. The tool's row breakpoint was 760 — so it never fired
on any desktop, and the operator (who views on a desktop) always saw the phone
layout. Every local gate was green because the sweep drives `draw-bag.html`
directly at the width it asks for. Breakpoint → 700; **704 is now an explicit
sweep viewport**. The 1367/1800/2400 tiers only ever apply to the full-screen
link. → [[feedback_the_tool_page_pins_every_iframe_at_704]]

## Five of my own gates were broken

- the CVD metric **double-linearised** and reported every pair as identical
  **including its own poison** — a measurement saying everything is the same is
  broken, not a discovery;
- the contrast table asserted **constants the stylesheet no longer used**
  (only the first colour of each pair was checked for presence);
- the FITS check named `.drb-foot` by hand and **missed the chip row 57px
  lower** after I reordered the layout;
- a ban condemned `Element.closest` — ban-too-wide, fourth dress this build;
- `Function.toString()` includes comments, so a read-ban condemned
  `_tagNode`'s own sentence "a 120-bag library".

## Standing

Suite: `verify` 25 groups (6 new: builder-is-blind, premise-is-free,
tag-leaks-nothing, no-swap-mid-run, library-is-a-ladder, contrast+CVD
**measured**) · `mutate` 93/93, 0 anchorless · `local-test` 64 configs +
string reachability by enumeration over a **Proxy over the tool's own strings**
(api is frozen) · `smoke` 44×11 · locale layout 99 cells · liveness 97/0/0 ·
print 10. **0 lines to `lcs-shell` or any other tool.**

CRLF is now collapsed **in the mutation harness**, not asked for in a header.
