---
name: project_comparison_planks_tool
description: "Premium tool #42 The Planks (comparison-planks) — the difference promoted to an object; what its gates and native panels caught"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-08-01T09:08:41.465Z
---

**v4 tool #42 `comparison-planks` — "The Planks"**, catalog slot A5, wave 2.
Built 2026-08-01. Two planks from one start line; a bracket over the overhang;
the overhang comes OFF as its own object and lands at the end of the short one,
where the two reach exactly as far. See [[project_premium_tools_v4_catalog]] and
[[feedback_next_tool_build_recipe]].

**The thesis:** the difference is not a number you work out — it is a piece of
the longer plank, and exactly the piece the shorter one was missing. Against its
siblings: in [[project_unit_handle_tool]] the object held still and the number
moved; in [[project_arrow_strip_tool]]'s neighbour #41 everything moved and the
number held still; here the child sets both numbers and the tool answers with a
third quantity it refuses to number.

**Fence came back NOT CLEAN and was subtracted, not negotiated.** CCSS 2.MD.A.4
belongs to `span-length-gap` (the child TYPES the difference on a keypad), and
#40 had already ceded it in writing. Two static proportional bars ship three
times; `bram-board-shop-activity.js:208` already EMITS `smaller + difference =
bigger` as text. The platform could STATE the identity and had never SHOWN it —
that gap is the tool. Virgin: a plank whose length the child sets, two
independently stretchable planks in one frame, a bracket over an overhang, and
the detach (zero prior art repo-wide for promoting a sub-region to an object).

## ⭐ What this build actually bought

- ⭐⭐ **A GATE THAT SAMPLES ONE POINT OF A BAND IS NOT TESTING THE BAND.** The
  numeral-containment check ran the OPENING state (5·9) at every viewport and
  passed everywhere. At the top of the band a plank's end is at 99% of the
  bench, so its numeral was centred there and **"16" shipped clipped in half**.
  The THUMBNAIL GENERATOR found it, not the gate. There is now an L6 walking
  both extremes and both corners.
- ⭐⭐ **A DEFECT CLASS NEEDS ITS OWN GATE WHEN THE SHARED ONE IS BLIND TO IT.**
  #40 and #41 each shipped a Print chip calling `window.print()` with **no
  `@media print` block at all** — printing the whole web page. `audit-tool-
  control-liveness` cannot see it (`window.print` fires, so the control "acts").
  Built `scripts/audit-tool-print-sheets.js`, poison-tested against the pre-fix
  `unroll-tape` from git (fails 5/7). Both retrofitted this session.
- ⭐⭐ **AND THAT PRINT GATE THEN PASSED A BLANK SHEET.** I printed #42's sheet
  and looked at it: a completely white page, after 21 green checks. Three
  shapes of one mistake, all found by rendering the thing and *looking*:
  **(a)** #42's sheet is a PAID feature, so an unentitled click shows the
  paywall and builds nothing — and `display:grid` + `width:1008` are both true
  of a container with zero children and zero height, so the gate passed. It now
  forces the entitled state and asserts descendant count, real height, and
  inked-shape count. **(b)** That ink check then **condemned a correct tool**:
  it counted SVG primitives only, and `unit-handle` contains ZERO SVG
  (`createElementNS` 0, `api.el` 18) — a wrong measurement, not a wrong tool,
  the ban-too-wide shape for the fourth time. **(c)** ⭐ Chasing that found a
  REAL defect: **browsers strip background colours when printing by default**,
  and `unit-handle`'s whole apparatus IS background colour, so its Print chip
  would have printed near-blank on a real printer even with the `@media print`
  block. All three now set `print-color-adjust: exact`.
- ⭐ **THE SAME LESSON HAS TWO HALVES.** Moving the numerals to px SIZE while
  leaving their OFFSET in MODEL units put each numeral inside its own grip (16
  units = 5px on a phone bench). A size and its clearance must be measured in
  the same unit.
- ⭐ **EVERY GATE HERE MEASURED ONE BOX AGAINST A FLOOR; NONE ASKED WHETHER TWO
  RENDERED THINGS COLLIDE.** Overflow, tap size, containment — all satisfied by
  both boxes while they overlapped.
- ⚠ **A `font:` SHORTHAND WITH AN UNQUOTED `Baloo 2` IS INVALID** — the whole
  declaration is dropped, so a `clamp(19px,…)` floor silently never applies and
  the text falls back to inherited 16px. Longhand cannot fail this way.
- ⚠ **A FILTERED RUN THAT MATCHES NOTHING LOOKS EXACTLY LIKE ONE THAT PASSES.**
  `| grep -E "FAIL|PASS"` printed nothing and I read it as clean; the tool was
  not parsing at all.
- ⚠ **AN INFORMATIONAL READOUT CAN BE AN ARTEFACT OF ITS OWN INITIALISER.**
  `chipOver` started at 0 and only rose, so every chip comfortably INSIDE the
  card reported as flush at 0px with an empty label. Nothing was flush; nothing
  had been measured. Use `-Infinity`.
- ⚠ **THE DEPLOY VERIFICATION GLOB MISSED THE DATA FILE.** `comparison-planks.*`
  does not match `comparison-planks-pairs.json`, so both the `ls` confirmation
  and the `chown` skipped it — the mini-tools-cp-must-include-JSON trap in a new
  dress, where the file IS copied but cannot be seen.

## ⭐⭐ The panels audited the source and found MODEL bugs

Three native panels (§A.13.48), three rounds. **They read the code, not the
copy** — see [[feedback_native_panels_audit_the_source]]:

1. **A live model bug.** The hint ladder gave `hintCarry` to both `lifting` and
   `free`, but `lifting` LOCKS sideways motion — "now carry the piece" was live
   during the one phase where carrying is impossible.
2. **One element, two jobs, one name.** The grip is the bracket's while attached
   and the piece's once free, and announced itself identically. Now two aria
   strings, and the gate ASSERTS the swap. (The French pronoun gender proves it:
   `Faites-la` for the feminine *accolade* vs `Faites-le` for the masculine
   *bout* — a wrong-state label surfaces as wrong grammar, not plausible text.)
3. **⭐ THE #41 DEFECT VERBATIM.** Naming the hollow "the gap" made it a FOURTH
   NAMED PART in a tool whose own line 7 forbids one — and I introduced it while
   fixing a different a11y finding. De-nouned; the absence is now a verb in all
   eleven (*fehlt · il manque · saknar · mangler · puuttuu*).
4. **Gate 5 was carried by NO STRING.** The thesis is that the third number is
   the one the class says aloud, and nothing invited anyone to say it. `hintSay`
   is new.

**Per-locale traps, each of which would have shipped:** de `Klammer` = PARENTHESIS
(and `Bügel`+`Brett` = ironing board; `Rest` = division remainder) → `Henkel` · it
`graffa` = brace AND PAPER CLIP, a banned unit smuggled in via the apparatus's own
name → `parentesi`; and `testa a testa` rejected because its dominant reading is
NECK-AND-NECK, a race idiom under a no-competition lock · es `tabla` = TIMES
TABLES, `par` = EVEN NUMBER · pt `tábua` ≈ `tabuada` · **nl `plank` = SHELF and
heart-words owns it — the tool's own English NAME does not survive Dutch** →
`lat` · sv `bana`'s definite `banan` is the banana; `kant i kant` is
measurement-bench's · da `for enden` is #40's · fi `lauta:laudat` ≈
`lautanen:lautaset` → `lankku`.

## ⭐ The one fence a regex cannot hold

`hintSay` asks the class to say how long the piece is. That has the **same answer**
as `span-length-gap`'s banned "how much longer is it". What separates the two
tools is **BEHAVIOURAL — this one takes no input, ever.** No word-ban can guard
it, and putting one in the apply gate would read as protection while protecting
nothing. If this tool ever grows a keypad, `hintSay` goes first. A panel found
this; I had assumed the phrasing was doing the work.

## Files

`mini tools/comparison-planks.{js,html}` + `comparison-planks-pairs.json` (16
pairs, `freeCount: 5`; the difference is NEVER stored — `diffOf = |a−b|` derived
on every read, and `roleOf` is three-valued, returning null at `a === b`).
SoT `scripts/_comparison-planks-{strings,content}.js` → `apply-` /
`register-comparison-planks.js` (7 points, idempotent).
Gates: `verify-` 82 · `mutate-` 46/46 · `local-test-` 195 · `smoke-` ×11 fresh
browsers · `audit-…-locale-layout` 396 · `audit-tool-print-sheets` 21 ·
`live-verify-`. Registration constants: ordinal **#42**, `PREV='unroll-tape'`,
wrapper **7.54→7.55**, `TOOL_KEYS` 45, category `measurement`.
