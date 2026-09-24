---
name: project_baking_tray_tool
description: "TOOL #46 The Baking Tray — build record; the fence rewrote the tool, removing the comb was the biggest fix, and the German panel found eight defects in my English"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-09T22:26:36.459Z
---

**TOOL #46 `baking-tray` — LIVE in all eleven locales, 2026-08-10.** Entry #2 of the approved v5 catalog. Topic:
**deriving a hard multiplication fact from easy ones** — 7×6 out of 5×6 and 2×6. Target
**CCSS 3.OA.B.5**, whose own worked example is `8 × 7 = 8 × (5 + 2)`; in German the
*Kernaufgaben / Ableiten* tradition (Wittmann & Müller).

**The object:** a tray of tear-and-share buns baked TOUCHING, so the seam is a gridline. Three
moves only — TURN a quarter turn · BREAK along one seam into two pieces · PUSH back together. The
count never changes. Max two breaks, three pieces, 1-10 each way, opens on 7×6.

## ⭐ THE FENCE REWROTE THE TOOL

The idea as filed was groups → array → rotate → crack. **Three of those four are built:**
`array-core`'s `build-array` + `equal-groups` (2.OA.C.4, live 11 locales, **3×4 AND 4×3 already
among its eight rounds**) own the construction; `draw-partition-core`'s `winter-piles` owns drawing
a cut line across a given array — **but row boundaries only, and every piece must be EQUAL**.
Subtracted rather than negotiated (§23.3). Empty repo-wide: **ROTATE** (nothing anywhere turns an
array; the printables must draw the transpose as a *second, separate* array) and **THE UNEQUAL
BREAK** (`draw-partition-core` actively grades it WRONG). 3.OA.B.5 claimed by zero activities and
zero printables — measured.

⚠ **Cross-product finding, surfaced not taken:** `winter-piles-activities.json:64` tells the child
*"Those piles aren't equal yet — make them all the same."* A child who has done it arrives already
trained that an unequal cut is an ERROR — which is this tool's headline move.

## ⭐⭐ REMOVING THE COMB WAS THE BIGGEST FIX

First version: one 118u tab per seam in staggered lanes outside the tray, because 9 seams × 34px
cannot fit along a 10-row tray at 320px. **The 10×10 render settled it — eighteen tabs in six lanes
had more visual weight than the material**, and contradicted the art ruling that *this tool has no
implement in any state*. The arithmetic never demanded tabs; it demanded that a child not be asked
to hit a 6px strip. So **the pointer target is the whole tray and a press resolves to the nearest
seam** (deadband 0.40 pitch — at 0.5 every point on the tray belongs to some seam and it becomes one
big button); keyboard/AT get a real button per seam, invisible until focused, `pointer-events:none`
so the finger reaches the bread. **A 10×10 bun went 10.0px → 17.3px at 320px.**

## ⭐ THE GEOMETRY IS THE CONSERVATION GUARANTEE

`pitch = trayBox / (max(R,C) + SLACK)` on a **square** box. `max(R,C)` is **symmetric in R and C**,
so a quarter turn cannot change the bun diameter and **the rotation needs no rescale term at all**.
Break gaps are pre-reserved whether or not the tray is broken. Neither conserving move can alter a
bun by one pixel.

## Defects the BROWSER gate caught that the census could not

Both from one root cause — **`_paint()` rebuilt the hit layer and destroyed the element being
interacted with**: a real press previewed and then never committed, so **the tray could not be
broken by pointer at all** while every model assertion passed; and focusing a seam deleted its own
focused button. Then the keyboard layer, an `inset:0` container painted after the tray, covered the
press target completely.

## ⭐⭐⭐ THE FOUR DEFECTS THE NATIVE PANELS FOUND THAT NO GATE COULD SEE

Ten panels were handed the English as a **source to audit**, not a target to translate. Between them
they found more real defects than the whole gate suite did — and one the gate had *certified*.

1. **THE COUNT DID NOT SURVIVE THE 11-AND-12 SETTING, AND THE CENSUS PROVED IT CORRECT 118,000
   TIMES.** `rotate`/`crack`/`push` rebuilt state through `_st` without passing the ceiling, so it
   fell back to 10 and `_dim` clamped: a **12×7 tray of 84 buns became 70 on a turn**. The tool's
   only claim, false in the exact configuration its second setting sells. The census enumerated
   1–10 and never built a tray the bug could reach; `verify` even fed `11` into its junk list and
   asserted the result lands at 10 — **the guard certified the bug**. (Portuguese panel, running the
   model in node.) Fix: the ceiling travels ON the state; second census pass at 12; three mutations.
2. **A LITERAL `+` RENDERED ON SCREEN, permanently, in all eleven locales** — in the tool whose
   absolute rule is no operator on the apparatus. `plus.textContent = '+'`. **No string audit could
   reach it**: drawn by code, so it survived every ban, every poison case and eleven string reviews.
   (French panel, reading the source.) Now chevrons.
3. **THE TURN PLAYED BACKWARDS.** `_run` advances the model immediately, so frame one already shows
   the turned grid; interpolating 0→+90 snapped into the post-turn layout, spun *away* from it, and
   snapped back. **Every assertion measured the END state and passed.** (Italian panel, reading the
   model.) ⚠ My first fix was INERT — the transform sat behind `if (rot > 0)` and `rot` is now
   negative; caught only by the new mid-flight angle assertion.
4. **THE PRINTED SHEET COULD NOT CONTAIN THE TOOL'S OWN DERIVATION.** `_printCuts` walked k=1,2,3, so
   a 7-row tray printed breaks after rows 1,2,3 and **never after row 5** — the split the product
   exists for, the one the fifth line is drawn deeper to support. The paper omitted the lesson,
   behind the paywall. (Found independently by es, nl, it, pt.) Swedish then found the same dropped
   ceiling in the print path: with the setting on, **the paid sheet printed ten buns labelled twelve.**

**AND THREE DEFECTS IN MY OWN GATES:** the Spanish ban condemned `por` (the commonest preposition
this tool needs) and bare `son` ("are"), because my counter-poison only exercised German and Italian
— every locale now has a MUST-PASS case; the Swedish ban `är lika` fired on *"det är lika många
bullar som förut"*, **the exact conservation sentence the apparatus exists to make** (Swedish needs
`lika med`); and TOTAL/ADVICE/count-noun all read `.en` only, so a total or a verdict could ship in
ten languages untested.

## ⭐⭐ WHAT THE GERMAN PANEL FOUND IN MY ENGLISH

Before a word of German, and none of it visible to any gate:
- the paywall sold *"the same tray broken six ways"* while the sheet **leads with the whole tray**
  and padded short trays with duplicate whole trays;
- **"1 rows"** — and it lands on the tool's own headline derivation, since seam 1 IS 7-into-6-and-1;
- **two different grammars** for the whole tray vs the pieces, so the identity claim arrived in one
  construction and left in another;
- `breakCol` **dropped the unit** — the one label class that exists for users who cannot see the
  numerals split;
- two push pads with **identical labels** (no `{k}`);
- `hintSquare` promised an event that **cannot occur** on a square tray, and deleted the task;
- the print sheet **ignored its own five-groove setting**;
- the second-person gate's **assertion claimed more than it measured**.

Fixed with a `[x|one|many]` plural mechanism (resolved before interpolation, so a form needs no
placeholder). German name **Das Brötchenblech**; material **Brötchen** (invariant sg=pl — removes a
whole plural-bug class); seam **die Rille**; ⚠ VETO *teilen* (says DIVISION in a multiplication
tool) and *Buchteln* (unknown north of the Main).

## ⚠⚠ THE SAME RULE IN TWO FILES GETS HALF-FIXED — walked into it

Narrowing German `gleich` → `ist gleich` (the panel's correct *"Gleich viele Reihen"* was being
condemned — ban-too-wide on correct native prose) fixed `apply-` while `verify-` kept its own copy
and kept failing the same sentence. **That is #44's recorded defect verbatim.** The ban, its
exemptions and its poison now live in `scripts/_baking-tray-bans.js`, imported by both.

## Gates (all green)

`verify` **118,704 assertions over an exhaustive CENSUS of all 3,400 legal states**, own oracle ·
`mutate` **54/54 killed, 0 harness faults, WITH A CONTROL RUN** (it once reported "every mutation
killed" while the gate was *crashing* on `document is not defined`) · `local-test` 64 across six
viewports incl. containment + collision · `smoke` 11 locales with a **Proxy reachability recorder**
(all 30 keys proved *reached*, not merely present) · layout 396 · print 10 · liveness 99 × three
entitlement states · wide 28. **Zero protected-core lines.**

## ⭐ THE PLURAL MECHANISM SATISFIES ALL ELEVEN — confirmed by test, no extension needed

`[x|one|many]`, resolved BEFORE interpolation. Four capabilities the panels depend on, all tested:
a **placeholder inside a form** (sv: `[r|rad med {c}|rader med {c} i varje]`) · the marker on a
**NON-NOUN** (fi: the relative pronoun agrees — `[r|jossa|joissa kussakin]`) · the **same variable
marked twice** in one string · **multi-word forms** (da: `[r|i rækken|i hver række]`).
⚠ **The second slot is NOT a plural.** Finnish `riviä` is the PARTITIVE SINGULAR; the real plural
`rivit` is ungrammatical after a numeral, so anyone "correcting" `7 riviä` → `7 rivit` ships the
"1 rows" bug. Label the slots `one|many`, never `singular|plural`.
⚠ **Finnish needs no case extension ONLY because every `{x}`-plus-noun phrase stays in the SUBJECT
slot.** In an oblique slot the NUMERAL itself must inflect, and an inflected digit is written
`7:llä` — unreadable to a seven-year-old. That is a rule for authors, not a feature.
⚠ **The operator-word gate must NOT sweep `slug`/`metaTitle`/`metaDescription`/`about`.** The
Finnish slug legitimately contains `kertolasku` and `kertotaulu` — they are what teachers search.
It currently validates only the STRINGS SoT, which is correct; keep it that way.

## Shipped

All eleven locales authored (never translated) by native panels. Registered across all seven points
(⚠ `live-tool-slugs.ts` is the 410 trap; `TOOL_WRAPPER_VERSION` 7.80→7.81; category `number`;
thumbnail seeded through a real seam BUTTON, because the pointer path resolves from clientX/clientY
and a synthetic `.click()` carries neither — generated `--fit=contain`, the stage is near-square).

**Two layout defects only the locales could expose:** es/pt hint lines wrap to four lines at 320px
and pushed the bottom control 17px past the fold (English fitted and proved nothing); de/fi were cut
off by 24px at 1920×1080 because the wide tier fired at exactly 1080px of height — **the min-height
FLOOR was the thing that was wrong**, measured against the longest locales, raised to 1160.

**live-verify: 86 assertions on production**, and every structural one can only be true of the NEW
build, so it doubles as a deployed-bytes check — conservation at the 12 ceiling · the chevrons ·
the turn starting at −90° · the sheet reaching the fifth line.

## ⚠ Cross-product findings the panels surfaced (NOT this tool's to fix)

**The paid plan has 2-4 contradictory names in EVERY locale checked.** Older tools say *Premium*;
newer ones say the Teacher-plan form. Counts: it 24 · no 15 · fi 11 legacy + four live forms
(`Opettaja-tilaus` / `Opettajatilaus` / `Opettajan tilaus` / `Premium`) · sv 13 + a third word
(`Lärarpaketet`) · es 12 · pt 16 · de + nl + fr similar. Several locales also contradict themselves
between the pricing page, the billing screen and the dashboard. Each panel independently shipped the
current form and flagged the rest. **This is a platform-wide sweep, worth its own pass.**

**The `es` locale mixes Spain and Mexico registers** (`center-board` literally opens *"En muchos
salones de México…"* while `build-plan` addresses Spain directly). A Spain panel cannot write
against it coherently. Recommendation on file: split `es-ES` / `es-419`.

Related: [[project_exchange_machine_tool]] · [[feedback_next_tool_build_recipe]] ·
[[feedback_native_panels_read_the_model]] ·
[[feedback_a_green_production_gate_is_not_proof_of_deployed_bytes]]
