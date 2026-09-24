---
name: project_unit_handle_tool
description: "Premium tool #40 The Unit Handle (2026-08-01) — two tapes, one object, a draggable unit; and the four gate defects the build bought"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-08-01T00:54:51.025Z
---

**LIVE 2026-08-01 — v4 tool #40 `unit-handle`, "The Unit Handle"** (`8af5e1c2` build, `b6e13a1f`
gate fixes). Opens **wave 2**, the measurement spine. CCSS **2.MD.A.2**. Next = **B4 The Unrolling
Tape**, ordinal **#41**, `PREV='unit-handle'`, wrapper **7.53 → 7.54**, `TOOL_KEYS` position **44**.

## What it is

One object lies across the bench. Beneath it **two tapes**, each laid from identical tiles end to
end from the object's left edge, each ending in a numeral. The first tile of each tape carries a
grip: drag it and that tile — **the unit** — grows or shrinks under the finger, the whole tape
re-lays itself, and the number climbs or falls. **The other tape does not move. The object never
moves.**

**THE ONE THESIS: THE NUMBER CHANGED AND THE OBJECT DID NOT.** That is the whole of 2.MD.A.2, and
it is the thing a cupboard of fixed unit sets cannot show — **you cannot own a ruler whose unit
grows.**

**It opens on two DIFFERENT units** (`uA:160, uB:100`) so one object carries two numbers in the
first frame and the question is posed before anyone touches anything. "Same unit on both" is the
button that collapses them.

## The fence came back clean — and refuted a closed-strand claim

`2.MD.A.2` appears exactly ONCE in the repo, inside the catalog's own stale claim. `lay-units-core.js:44`
**actively bans** mixed-size units. `measurement-bench` wipes its layout on every unit switch
(`:1215`) — it computes both numbers and throws each away before the other is made, so it does not
own a changeable unit, it **structurally forbids** one. ⚠ So §23.7's "capacity/weight/non-standard
length is CLOSED" is an **ownership** claim that was measured **false on this one point** (it
stands for the rest of the strand). Near-miss cited not hidden: `lay-units-activities.json:258`'s
`inverse-leaf` round **pre-speaks** the conclusion ("Smaller helpers, more of them!") because
telling was all it could do.

## ⭐ FOUR GATE DEFECTS — all four were the gate, not the tool

1. **A VACUOUS SELECTOR.** live-verify keyed on `.unh-tape[data-t="a"]`; the tool emits
   `.unh-tape-a`. Every tape assertion compared two **empty NodeLists** — it would have passed on a
   tool with **no tapes at all**. → assert non-vacuity FIRST, then anything about contents.
2. **THE BAN WAS TOO WIDE, AGAIN.** The no-named-unit ban scanned `document.body.textContent`,
   which includes **Next's RSC flight-data**, which serialises every sibling tool — so it condemned
   the RULER's own correct slug `las-linjalen-mat-i-centimeter`. The ruler legitimately owns
   centimetres (2.MD.A.1). **The fence working is not the fence failing.** → scope content bans to
   the tool's own visible prose.
3. **THE POISON SET WAS MIS-SORTED.** Swedish *"Tum blir det inte tal om här"* sat in MUST_PASS —
   but `tum` **is** the Swedish inch. A mis-sorted example teaches you to **loosen a correct
   regex**. The same run found the ban too NARROW too (`\btomme\b` missed the Norwegian plural
   *tommer*). → sort each example by what it MEANS.
4. **ASSERTED THE OPPOSITE OF THE DESIGN.** It demanded both tapes open on the same unit, because
   the *howToUse* copy said "start with both the same" — but that describes a BUTTON, not the
   opening state. **Write assertions from the artefact, not from the prose about it.**

Plus: `register-unit-handle.js` logged `category "number"` while writing `'measurement'` (the exact
log shape that lets the #38 wrong-category defect survive review), and a `\s` inside a template
literal degraded to a bare `s` and matched only by luck.

⚠ **And two FALSE alarms I raised before measuring properly** — a wrong section label
("Measurement & Data" vs the real **"Measurement, Shape & Data"**) and an anchor scraped out of the
RSC payload instead of the rendered card. Both looked like shipped defects; neither was.
**Verify the measurement before reporting the defect.**

## The gate spec did not survive contact (4th time in this catalog)

The catalog said *"every unit size 1…1000 … 499,500 pairs"*. Arithmetically right, pedagogically
impossible: at `u=1` the tape carries **1000 tiles**. Real domain is bounded by **legibility** —
`MIN_COUNT=2`, `U_MIN=50` **measured** (raised from 45 when the smallest tile rendered 32.3px
against the 34px desktop floor). True figures the gate prints: **2,212 unit settings, 231,300
monotone pairs**. **Monotonicity is NON-STRICT** (`floor(L/u)` is non-*increasing*; asserting a
strict decrease fails on a correct tool) — asserted non-increasing **plus** "it decreases
somewhere". And **V4 tested invariance but not correctness**, so "object hangs off the wrong edge"
survived mutation → **V4b** applies the affine to the trim corners (0.0000px).

## Build notes worth keeping

- **The drag must bind to `window`, not the element.** `_repaint` replaces the tape, and **removing
  a captured element from the document releases pointer capture** — only the FIRST move applied.
- **Percentage `translate()` is element-relative**, so the crayon rendered a third of a screen from
  its tapes. Put the offset in `left`/`top`.
- **Aspect-locking the whole bench** gave 23px tapes at 320px → split into `.unh-objzone`
  (aspect-ratio) + `.unh-tapes` (fixed px).
- **Separate the 44px `.unh-grip` control from the canvas tile** (the tile itself was 13px).
- Keyboard steps by **COUNT** (`stepCount`), not by unit — 5-unit steps changed nothing visible.
- Tiles are laid at `x0 + i*u`, **never an accumulator**.
- The object shelf is **derived** from `measurement-bench.js` by `gen-unit-handle-objects.js`, not
  typed — which is how a hand-typed theme `'sports'` (real: `'camping'`) was caught as a silent 404.

Gates: verify V1–V14 + V4b · mutate **38/38 killed, 0 harness faults** · local-test 36 · smoke
208 × 11 · locale-layout 66 renders · liveness × 3 states · **live-verify 100 assertions on
production** · 0 lines to `lcs-shell.*` or any protected core.

Eleven three-person native panels rebuilt tool strings + landing. ⭐ Every panel independently wrote
the **no-efficacy caveat** into its own second paragraph. Notable catches: fr `unité` → **`étalon`**
(unité collides with place value), it `il banco` collided with the shipped *Il banco delle misure*.

See [[project_premium_tools_v4_catalog]] · [[feedback_next_tool_build_recipe]] ·
[[project_draw_bag_tool]] · [[project_arrow_strip_tool]].
