# #54 The Doubling Mirror — three expert critiques of the SHIPPED artefact

Commissioned 2026-08-11 against the live build (`a060454f` + `c94367e1`), after the
model/i18n rebuild had already shipped. Three panels — **art/visual**, **K-2 mathematics
pedagogy**, **interaction design** — each read the source AND the eight captured states at
360/704/1024 (`scripts/_dbm-capture-states.js` → `docs/audit-results/doubling-mirror/states/`).

**Status: this is a SPECIFICATION, not a report of completed work.** Four fixes below were
implemented and verified during the critique pass; the rest are specified and unbuilt. A
geometry change (art item 7 applied without art item 6) broke the render and was reverted —
see "What was attempted and reverted".

---

## Verified defects, with the measurement

| # | Defect | Measured |
|---|---|---|
| **V1** | **The total the tool exists to produce is INVISIBLE.** `_totEl` is a child of `.dbm-hinge{overflow:hidden}`, which is `CHAN_SHUT`=0.22 module tall. | At 704: numeral **46px** inside a **10px** box, **clipped by 37px**. `textContent` reads "8" — and the probe asserted exactly that. The invisible-far-leaf class, one element over, certified by the gate written to catch it. |
| **V2** | **A shut tray renders as two separately-framed beds.** `_paint` splits `whole` into `ceil(n/2)` + rest. The comment directly above it says "the shut tray is ONE bed". | Shut 9 draws 5 above 4; `open` then yields 4-and-4-and-one, so a counter must visibly teleport to reconcile a picture the tray drew. Also: the halving question is asked with its answer laid out in countable counters above the strip. |
| **V3** | **The act strip reflows ~139px under a finger, and `reset()` has no `_busy` guard.** `_gPred` is toggled with `display:none`; `_open` calls `_paint` before the 520ms fold. | "Open the hinge" at y≈852 → "Start again" lands at y≈857, overlapping **39 of 44px**. A double-tap — universal on a whiteboard — **wipes the tray**. `reset` and `_print` were the only controls live during the animation. |
| **V4** | **The empty seat is authored, styled and wired to nothing.** `_sync` takes a seat flag; `.dbm-seat` is styled; both call sites pass hardcoded `false`. | "One counter has NO PARTNER" is made only in words, on a tool whose first law is that it must be legible with the sound off. |
| **V5** | **`.dbm-mouth` is `#0A3F38` — a TWELFTH colour**, outside the eleven-hex palette. | **1.85:1** against its own lip: the "break in the silhouette" its comment promises is invisible. |
| **V6** | **Counters are 22.4px at 360.** `--dbm-c: clamp(19px,7.0cqw,54px)`. | Below the 34px canvas-cell floor. The viewport that can least afford small counters gets the smallest. |
| **V7** | **The prediction chips draw their own answers**, and the two modes' pictures COLLIDE. | `_buildChips` renders chip *v* as `ceil(v/2)` + `floor(v/2)` dots, so split chip "3" is pixel-identical to double chip "6". A child matches pictures instead of doubling. |
| **V8** | **The claim is destroyed at the reveal.** `close` and `open` both set `x.claim = []`. | A predict-then-check routine with **no check**. The class's number vanishes the instant the evidence arrives. |
| **V9** | **The say-line goes stale on reset.** `_say` is called from the moves, never from `render`/`reset`. | Press "Start again" and the tool describes a tray that no longer exists. |
| **V10** | **The gate is not a dialog.** | No `role="dialog"`, no `aria-modal`, no Escape, no focus trap — Tab walks out of the box into the live strip behind the scrim. |

Also measured: leaf face **1.075:1** against the card (the apparatus has no body); the hinge pin
is the **loudest mark on screen at 8.69:1** and carries no meaning; far-leaf counters render
**0.94w × 0.85h** of near-leaf ones in the state that asserts they are equal; rest-state ink
density **2.0%**; `.is-off` composites to **~2.3:1** on controls that are deliberately clickable.

---

## Implemented and verified during this pass

1. **V4 — the seat is wired on** (`seatFar = !s.shut && s.odd === 1`, on the FAR leaf because
   `give` fills the near one). Verified: a dashed circle marks the empty place before the give,
   and the real counter lands in exactly that mirror position after it.
2. **A crash the seat exposed.** `_sync`'s removal loop takes `lastRow.lastChild`, which was a
   SEAT, so the count never came down and it ran on to `removeChild(null)` — **on reset after a
   give**, an ordinary teacher path. Fixed by clearing seats *first* and dropping any row they
   leave empty.
3. **V3 — the reflow and the guards.** `display:none` → `visibility` (box reserved);
   `_busy` guards on `reset` and `_print`.
4. **V9 — the say-line is cleared on reset.**

New gates written for these (`probe` P8 seat / P9 no-reflow), both poison-tested: the reflow
poison moves **nine** controls, the seat poison reports zero seats.

## What was attempted and REVERTED

- **V1 + V2 together** (total out of the barrel; shut = one continuous bed). Correct in the
  model and it renders wrong without the art panel's **cell lattice** (item 6 below): counters
  spilled outside the bed and overlapped the numeral.
- **Art item 7** (`--dbm-c: clamp(34px,10.6cqw,66px)`, leaf `9.0c`) applied WITHOUT item 6 —
  the tray overflowed the card. The panel said explicitly that 6 and 7 change the intrinsic
  geometry together. **Do not apply one without the other.**

---

## The specification, ranked

### Art — the through-line is *make the bed a counted field*
1. **The 5×2 cell lattice.** Replace the flex rows with ten always-drawn `.dbm-cell` places
   (dashed `#7A6A55` ring, **4.73:1**); `_sync` toggles `.is-full` on persistent cells. Far leaf
   fills in order `[5,6,7,8,9,0,1,2,3,4]` so cell *k* is the same distance from the spine on
   both leaves — the property `_buildSheet` already claims for the paper. **Ink density 2.0% →
   ~14%**, and the orphaned 6th counter stops floating.
2. **Then** the sizing: `--dbm-c: clamp(34px,10.6cqw,66px)`, leaf/hinge/plinth `9.0c`, plate
   `1.5c` with the 1.231:1 hairline deleted, bed `left:1.5c right:0.4c`. Closes V6 by clamp.
3. Shut = one field: `CHAN_SHUT: 0`, `.is-closed` hides knuckles/pin/inner walls, near bed spans
   4 grid rows. Total moves onto the tray at `M(2.0)` in `#0E5147` (**8.33:1**).
4. Fold as a **bump** (`FOLD_DEG · sin(πt)`, 0° at both rest states) so equal groups are drawn
   with equal marks.
5. Carcass: walls `0.34`, lip `0.62`, plinth `0.5`. Mouth → `#F6EAD3` (**5.78:1**). Hinge by
   `#F6EAD3` slots, knuckles → `#0D4E44`, **delete the pin**. Counter → flat concentric disc
   (`background #F2784B` + `inset 0 0 0 M(0.1) #A34122`); delete `::before`/`::after`/sheen.
6. Print grid → `cx = 20 + (i%6)*28, cy = 172 + floor(i/6)*20` (the current 3mm vertical gutter
   is not cuttable by a five-year-old).

### Pedagogy — the through-line is *make the child produce a number*
1. **Keep the claim through the reveal** (V8). The class's number and the tray's number on
   screen together. No verdict — the counters are the evidence.
2. **Promote the ladder**: a symmetric `near+1, far+1` control whenever the tray is open and
   `near === far`. The code already does this inside `fetch`; it is locked behind an accident.
   This is the doubles ladder (2,4,6,8,10) and it is the routine the tool is missing.
3. **The double question should hold two rival answers** (currently the *split* one does and the
   double one doesn't — backwards).
4. **Stop asking a question the class just watched answered**: a `dirty` flag so a freshly closed
   tray does not re-arm the split strip (which also removes it from the beat).
5. **Take the answers off the chips** (V7).
6. Allow `near ∈ {far−1, far, far+1}` so double-minus-one exists; raise `CAP` to 10 so 10+10
   exists.
7. Replace `give` with **fetch a partner / send it away**, so the 4|4 survives both moves and
   nine sits visibly between 8 and 10.

### Interaction — the through-line is *twenty targets for four verbs*
1. **One rail, one winner** (five independent booleans currently light two rails at once).
2. **Merge close/open into one fold button** — one of the pair is permanently dead chrome.
3. **Move the prediction into the card under the tray**, height permanently reserved, chips in
   `repeat(5,…)` matching `GEO.ROW`.
4. `.dbm-ctl{gap:20px}` — a 2px difference against `.dbm-g{gap:8px}` is the only grouping signal.
5. Swap the stepper to `[+][−]`; enlarge minis 26 → 32/34.
6. `.is-off` → `opacity:.62` + `color:#7A6A55`, and give AT users the equivalent of the dimming.
7. **Make the gate a dialog** (V10).
8. Shorten `predSplitAsk` (17 words) and `saidOddWaiting` (27 words).

### Evidence
`print-sheet.png` is a screenshot of the app, not the sheet — the print output is **unverified**,
and #40/#41 both shipped a Print chip that printed the whole page. Capture the real sheet before
signing anything off about the paper tray.
