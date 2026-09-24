---
name: project_cold_line_tool
description: "Premium tool #43 (key cold-line, shown as \"Upright and Flat\") — a thermometer you tip until it is a number line; what its gates and eleven panels caught"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-08-01T11:44:22.207Z
---

**v4 tool #43, key `cold-line`, DISPLAY NAME "Upright and Flat"** — catalog slot
B7, closing wave 2 (the measurement spine: [[project_unit_handle_tool]] #40 ·
[[project_unroll_tape_tool]] #41 · [[project_comparison_planks_tool]] #42 ·
this). Built 2026-08-01. A liquid column with a numbered scale that **slides**,
**continues below zero**, and **tips flat** — at which point it is a number
line. Same scale, same marks, same distance.

**The thesis:** a thermometer and a number line are the same object, and you can
tip it. Against its siblings: #40 held the object still and changed the UNIT;
#41 laid a curved length straight; #42 made a difference into a carryable piece;
here the whole instrument turns and *nothing changes*, which is the point.

**Anchoring (operator ruling):** a MEASUREMENT instrument, not an integers one.
The platform terminates at grade 3 on three independent axes and has no CCSS
layer at all; 6.NS is grade 6. Scale-reading is K-3 and the scale continues
below zero because real thermometers do. **And no unit is named** — which is not
a limitation but the reason one object can be both things, and it dissolves the
catalog's flagged Fahrenheit risk.

## ⭐ The fence — occupied on three of four surfaces

⭐ **It found a thermometer three consecutive fences had missed**, because they
searched `types/**/primitives/` — which does not exist. The real path is
**`scripts/worksheet-gen/primitives/`, a SIBLING of `types/`**.
- **TAKEN:** the vertical thermometer (`primitives/thermometer.js`, consumed by
  `G3-345`, fixed 0-40 behind a hard THROW) → **may never ask what the reading
  is**. The horizontal number line (#1, #26, Hopper's, 9 printable types with
  their own taxonomy family) → **may never draw a jump**. Liquid in a vessel is
  `measurement-bench`; a rising column is `class-graph`; hot/cold is `K-211`;
  the weather enum is `calendar-wall`.
- **VIRGIN:** a signed POSITION · a numbered VERTICAL axis (nothing in 46 tools
  has one) · a vertical↔horizontal toggle · panning a scale under fixed content.
- ⭐ `draw-bag.js:886` **reserved the minus glyph for this tool by name.**
- ⚠ `open-number-line.js:157` states this tool's premise as doctrine to be
  refused — but the CODE is narrower than its comment (a window-padding guard),
  and that tool refuses *a jump that lands negative*, which is arithmetic. This
  one never calculates.

## ⭐⭐ The name broke two of the tool's own refusals, and I got the reason wrong twice
`line` is on this tool's own TAKEN list (#1 owns the head term in eleven
locales) — #41's title defect repeating in the file that records it. I then told
the operator `cold` was banned as weather vocabulary; a panel checked and
`calendar-wall`'s enum has no hot/cold type. I corrected myself — and a third
panel then found **`G3-345` is TITLED "Hot or Cold?"**, so `cold` IS taken, by
the printable this tool is fenced against, named in the file's own TAKEN block.
⭐ **THE LESSON: run a noun census against the surface that OWNS the word, not
the one that happens to be top of mind.** I checked the weather enum because I
had just written a weather ban. See [[feedback_native_panels_audit_the_source]].

## ⭐ Defects the gates and panels caught — nine of them live

- **The catalog's gate spec refuted for the third build running.** 6,561 pairs
  implies −40..+40 = 4.2px/unit; the real bench, MEASURED, is 226px vertical at
  320px, not the width-derived 343. Band DERIVED instead: window 21, U=36.
  ⚠ My own first derivation had four errors — divided by 21 TICKS not 20 GAPS,
  ignored end margins, **invented** the 8px floor, and clipped the end label
  when tipped.
- ⭐⭐ **My linearity oracle marked its own homework** — it extrapolated between
  two points taken FROM the tool, so a mutation ignoring the window shifted both
  consistently and stayed linear. The window ANCHOR is now its own absolute
  assertion.
- ⭐⭐ **A minus sign that ABUTS a tick is not a minus sign.** The glyph rendered
  correctly all along (47.8 units vs 24.4) but sat 62 units from the tube while
  the tick reached 46 — they merged and **every negative read as positive**. No
  string check could see it; `textContent` was right. Found by looking. Now
  gated at ≥3px in both poses.
- ⭐ **A dead control the SHELL drew for me** — `lcs-shell.js:531` calls
  `tool.reset()` if provided; I didn't, so Reset did nothing across 11 paths.
- ⭐ **The two marks differed only in HUE while differing in ROLE** (A drives the
  liquid, B is inert) — #39's rule. Now solid vs outline.
- ⭐ **The bulb was a lie whenever the window wasn't at the bottom.** The liquid
  runs from the WINDOW FLOOR, so sliding grew the colour with no mark moved (7
  units → 15, same reading). Windowing is honest; a bulb at the window floor
  says the column ENDS there. Drawn only at the true domain floor now.
- `hintSet` fired with zero handles on screen (dispatch tested equality before
  visibility) · a mark tap wrapped +30 → −30 · `_next()` skipped its first
  configuration · the scene label was set once and never repainted, so its zero
  sentence was permanently uncorrectable · the print sheet was a mirrored,
  bulbless copy · a `window` listener leak per render.
- ⭐ **"Zero is off the scale" was FALSE** — zero is on the scale, outside the
  WINDOW; and the English idiom means *extraordinarily large*. A panel changed
  the claim, not the wording.
- ⭐ **"tall" is a pose word and I kept it on a bad ruling** — "a thermometer is
  tall by design" is a property of the object at rest, not of the one string a
  screen-reader user hears in BOTH poses.

## ⭐⭐ The three the GATES could not see — all found by looking, or by a gate failing on correct code

- ⭐⭐ **MY OWN LAYOUT FIX BROKE THE APPARATUS, AND EVERY SUITE STAYED
  GREEN.** Capping the bench's HEIGHT (`max-width:660` + `max-height:560`
  on `aspect-ratio:1/1`) does not make a smaller square — it makes a
  **660×560 rectangle**. The SVG letterboxed to 560 with a 50px inset
  while the HTML handles stayed positioned as a % of the 660-wide BOX,
  so every handle drifted off the mark it drives (14.6px at A, 24.2px at
  B, error growing with distance from centre) and **each mark drew as
  TWO CIRCLES** — on a tool whose whole subject is two marks. Invisible
  to all of it: the layout gate measures chips and hints; the pointer
  drags go through `getScreenCTM`, correct in BOTH geometries; the model
  never knew. **Found in one screenshot at 768px.** Cap the WIDTH — the
  square is structural, since `(x,y)→(W−y,x)` is an isometry only on a
  square. And the residual 4.09px was **two formulas never meant to
  agree** (dot at −6, grip at −20); both now come from one `_markX()`.
- ⭐⭐ **THE REACHABILITY GATE COULD NOT ATTACH ITS OWN INSTRUMENT.**
  `lcs-shell.js:482` **freezes the api and `t` is non-writable**, so
  wrapping it silently no-ops — my first recorder reported "0 keys asked
  for" in all 11 locales while every string rendered, a gate failing a
  correct tool. The shell resolves `i18n.t(tool.strings, key)` at CALL
  time, so the recording point is a **Proxy over the tool's own strings**
  (needs nothing writable). And a recorder installed after mount cannot
  see what was read AT mount — three aria keys scored "never asked"
  until the build was re-run through the Proxy. Two keys are genuinely
  exempt (`title`/`instruction`, read by the shell at `:448-449`) and
  the exemption is **a list with a citation each, never a loosened
  pattern**. ⚠ **The first poison did not count** — injecting a 20th key
  was refused upstream by apply-'s ORDER check, so it never reached the
  gate under test; the real poison is a live `t()` call in a **dead
  branch**, which a source scan passes.
- ⭐ **A LIVENESS GATE SAYS NOTHING ABOUT CONSEQUENCE.**
  `audit-tool-control-liveness` scored 33/0/0 over 25 paths; local-test
  had exactly ONE consequence assertion out of eleven controls. New L6
  asserts, per control, a change **elsewhere** — and the non-effect too,
  since half of them are defined by what they leave alone (mark B
  changes the span and **must not** touch the liquid; that is the entire
  difference between the two marks).

## ⚠ Traps worth carrying forward
- ⭐⭐ **A CLONED GATE CARRIES THE SIBLING'S GLOBALS, NOT JUST ITS
  SELECTORS.** Both locale gates drove `window.ComparisonPlanks` with
  #42's `{phase,dx,dy}` into a `{lo,a,b,tipped}` tool. They only surfaced
  because that global is absent here — **had the names matched, 11
  locales and 396 cells would have been certified off one untouched
  opening frame.**
- ⭐⭐ **`git checkout` NORMALISES LINE ENDINGS, AND MULTI-LINE MUTATION
  NEEDLES ARE SILENTLY SENSITIVE TO IT.** Seven needles went blind after
  a plain `git checkout --` restored the file through `core.autocrlf`.
  The recorded rule ("never edit through Python text mode") is about MY
  edits and would not have helped. Fix belongs in the **harness** (read
  with `\r\n` collapsed), and the only reason it wasn't seven silent
  passes is that the harness counts a missing needle as a FAULT.
- ⭐ **A NEEDLE THAT ENCODES THE CURRENT TEXT OF WHAT IT MUTATES HAS A
  HALF-LIFE.** Four locale needles carried the English literal inline and
  died the moment apply- rewrote the block for 11 locales instead of 8
  (alignment padding). They now self-anchor via `enNeedle()`, which
  **throws** rather than returning null — a dropped needle shrinks the
  total and the run still says "every mutation killed".
- ⭐⭐ **JS `\b` IS ASCII-ONLY.** `/\bsnö\b/` can never match — the boundary
  beside an accented letter fails. A weather ban was DEAD in Swedish, the one
  locale where snow vocabulary is likeliest. Use `(?<!\p{L})…(?!\p{L})` with `u`.
- ⭐⭐ **The census can prove a STRING is free; it cannot prove a CONCEPT is.**
  Italian `regolo` (0 hits) is the same object as the shipped `righello`;
  `retta` is the formal synonym of the shipped `linea`; `modi`/`tappa` sit
  inside other tools' paywall cards. **Any replacement picked off a free-list
  must NAME the sibling that owns the concept.**
- ⚠ **The count is not the finding.** A raw count said `sted` appears 12× in
  place-value-lab; all twelve are inside `tierverksted`, the *workshop*.
- ⚠ **A place-value trap exists in five locales, differently in each** — de
  `Stelle`, nl `plaats`+`positie`, fi `paikka`, da `plads`, no `plass`, es
  `posición`. "Another place" reads as "another PLACE VALUE" in a maths tool.
- ⚠ **`generate-tool-previews.js` parses TOOL_KEYS**, so the thumbnail CANNOT be
  made before registration — and it reports *"Generated 0 preview(s), 0
  failure(s)"*, a success line for doing nothing. Order: register → generate →
  re-register.
- ⭐ sv **`Skala` as a bare imperative means PEEL**; fi **`kaada` means POUR**,
  fatal on a sealed tube; fr **`échelle` is the LADDER** on this platform and
  `réglage` is the shell's Settings drawer.

## Files
`mini tools/cold-line.{js,html}` + `cold-line-sets.json` (16 settings, 5 free;
the first three share span 8 — span is independent of position, and that is
free). Model: `{lo,a,b,tipped}`, nothing derived stored; the tip is exact
integer `(x,y)→(W−y,x)` on a SQUARE arena, which makes "same span in both poses"
structural rather than asserted. SoT `scripts/_cold-line-{strings,content}.js`.
Gates: `verify-` 76 · `mutate-` 46/46 0 faults · `local-test-` **377**
(L7 = square arena + concentric handles; L6 = per-control consequence) ·
`smoke-` 65 across 11 fresh browsers · `audit-…-locale-layout` 396 (11×6) ·
print-sheets 40 · liveness 33/0/0 · `poison-cold-line-reachability.js` ·
`shoot-cold-line.js` (the renders I read myself, 360/768/1024 × both poses).
Constants: ordinal **#43**, `PREV='comparison-planks'`, wrapper **7.55→7.56**,
`TOOL_KEYS` 46, category `measurement`.
