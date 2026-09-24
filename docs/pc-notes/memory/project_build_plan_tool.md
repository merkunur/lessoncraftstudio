---
name: project_build_plan_tool
description: "Premium tool #44 (key build-plan, \"The Blueprint\") — nine numerals and an isometric building are one state edited from either end; what ten native panels found that no gate could"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-08-01T15:09:15.609Z
---

**v4 tool #44, key `build-plan`, "The Blueprint"** — catalog slot B2,
**OPENING WAVE 3** (space and structure). Wave 2 closed with #43. Built
2026-08-01. A 3×3 blueprint of numerals 0–4 = column heights, beside the
same building drawn isometrically; edit either end and the other
follows. Two flat profiles below (front, side), a quarter-turn chip, and
a payoff chip that produces a **different building with the same two
profiles** — disabled on the 709 where none exists.

**The moat:** *Bauen nach Bauplan* is a weekly K-2 staple in DE/NL/AT/CH
and the Nordics with printed card sets in every cupboard, and **CCSS
codes none of it below 5.MD.C** — the same opening `pattern-bench`
documents for repeating patterns.

## ⭐⭐ The measurement that shaped the design
Checked in Node before any code: **1,953,125** buildings, enumerable in
**9 ms**. The worry was that showing BOTH profiles would collapse the
ambiguity. It does not — **99.96% of buildings share their (front,side)
pair with another**; 4,792 of 5,501 pairs are ambiguous. And the **709
determined pairs became a second payload**: sometimes two views *do* pin
it down, and a child can hunt for those.

⚠ **One law in my own plan was FALSE.** "The turn always changes what you
see" — **125 buildings are turn-invariant**. Measured before it was
gated, so the law was deleted, not the threshold softened. The turn stays
ENABLED there, because a turn that does nothing IS the invariance idea.

## ⭐⭐ What ten native panels found that no gate could
- **THE SIDE PROFILE WAS DRAWN MIRRORED.** On screen the side face runs
  row 0→2 RIGHT to LEFT (x 917→846→775); the profile drew them left to
  right. For `[0,0,4,0,0,0,1,0,0]` it showed **401 where the eye sees
  104**. The tool's OWN verified law says so — `front(rot(h)) ≡
  reverse(side(h))` — and the renderer ignored its own model.
  ⭐ **EVERY GATE PASSED**, because local-test compared the profile to
  cubes counted in the SAME index order: both sides of the comparison
  carried the identical bug. **MEASURING THE RENDER IS NOT ENOUGH IF THE
  ORACLE SHARES THE CONVENTION.** The new gate asks it in PIXELS — does
  row r's bar sit on the same side as row r's face.
- **`hintTurn` WAS DEAD** — declared once, selected never — and **my
  smoke test had a workaround calling it directly**, with a comment
  excusing the dispatch. I wrote the excuse instead of reading the
  dispatch. **A GATE YOU HELP PAST IS NOT A GATE.**
- **Then fixing it created a FALSE string**: it claimed motion on every
  turn, and **three of the five free settings are turn-invariant**.
- **`hintPlan` reached FOUR buildings out of 1,953,125** (it needed flat
  AND ambiguous; flat-at-zero is determined), so the first hint anyone
  saw was `hintSame` — giving away the payoff before a square was
  touched.
- **The first press of "A different blueprint" showed a free teacher the
  paywall**: `_idx` starts at −1, so press one lands on 0, which the gate
  read as a wrap.
- English defects: "WRITE a number" commanded a gesture the model refuses
  (zero inputs in the file); "see what CHANGES" asserted the law the
  header deletes; `sceneLabel` put both profiles "below the blueprint"
  when the side one is under the BUILDING — and since the tool
  identifies them **by position alone**, that sentence was the only
  channel carrying it to a screen-reader user; both strings said "cubes"
  eleven lines after the header forbids it, which forced the Portuguese
  panel to DROP a clause rather than smuggle in a fifth owned word.

## ⭐ Gate lessons, each bought here
- ⭐⭐ **A GATE THAT REIMPLEMENTS THE THING IT CHECKS IS TESTING A COPY.**
  The hint dispatch lived inline in `_paint()`, so the Node gate had to
  duplicate it — and three mutations of the REAL dispatch sailed through.
  Extracted to `hintKey(st, justTurned, touched)` as model code.
- ⭐⭐ **THE SAME RULE IN TWO FILES WILL BE HALF-FIXED.** The French
  exemption went into `apply-` while `verify-` carried its own copy and
  kept condemning the same sentence.
- ⭐⭐ **`\b` IS ASCII-ONLY** — `\byhteensä\b` and `\bárea\b` can never
  match. Three bans were born dead. It surfaced only because each ban
  carries must-fire examples **in the languages it polices**.
- ⭐⭐ **THE BAN-TOO-WIDE TRAP, THREE TIMES IN ONE BUILD**: "how many cubes
  TALL" (a height, the tool's subject), and French **`dessinée en
  volume`** = *drawn in three dimensions*, a rendering register. Each
  time the ban was mine and the prose was correct.
- ⭐ **"Another BLUEPRINT" contains the word "print"** — `/print/i`
  matched the wrong chip and reported a defect in a working tool; my
  probe then "confirmed" it by making the same mistake. **Reach controls
  BY INDEX.**
- ⭐ **AN INVENTED THRESHOLD IS NOT A MEASUREMENT** (twice): a ">200"
  overlap floor that failed at a correct 45, and a "1,000 states" hint
  floor that condemned two DELIBERATE branches (125 turn-invariant, 1
  empty). Assert against the NAMED set.
- ⚠ **`git checkout --` DISCARDS UNCOMMITTED WORK.** I used it to undo a
  poison experiment and lost fourteen fixes. Restore from a backup.
- ⚠ **`'geometry'` IS NOT A ToolCategory** (number|measurement|literacy|
  classroom). Every shape-and-space tool sits in `measurement`.
  register- now parses the union off source.
- ⚠ **The thumbnail `--fit=auto` CROPPED THE PAYLOAD** (0.955 aspect >
  0.85), cutting both profiles. `--fit=contain` fixed it. The generator
  reported "ok" both times.

## The fence (§23.3) — occupied on three of four, subtracted
⭐ `scripts/worksheet-gen/primitives/unit-cubes.js` **is a real dimetric
iso renderer**, and `G3-346` already asks "count all the cubes" —
deliberately forcing `w=1` because *"a full l×w×h box hides interior
cubes, making 'count all the cubes' impossible."* **That limitation is
this tool's subject**, so we never ask for a total. Also subtracted:
K.G.A.3 solid-naming, 3.MD.C.5/6 area, `parking-tower` (tower/building/
floor/level), `place-value-lab` (blocks), graph tools (stack/column/bar).
⭐ **The cubes get NO NOUN in any locale** — owned four times over,
including as another tool's DICE mode in de/sv/da/no. And **the profiles
are named by DIRECTION**, because "view" is the shell's own word for
*make the window bigger* in ten of eleven locales.
⚠ **The paint order is DERIVED, not copied**: solving the projection
gives view direction (1,1,1), so ascending x+y+z is correct for a RAGGED
build; the shipped primitive's z/y/x loop is correct only for a full box.

⚖ **The German `-plan` ruling** (recorded in the content SoT): a shared
compound HEAD is not a collision — `Plan` is a productive head
(Stundenplan, Fahrplan) — so `Käferplan` does not block `Bauplan`. **But
the NAME stays off `-plan`** because `de.json:1018` already writes "Bauen
nach Bauplan" inside #40's own copy: a SEARCH collision. Name = *Neun
Zahlen, ein Gebäude*.

## Files
`mini tools/build-plan.{js,html}` + `build-plan-sets.json` (16 settings,
5 free — chosen so every header claim is reachable unpaid: baseline,
disagreement, huge ambiguity, a DETERMINED one where the chip goes dead,
and a turn-invariant one). SoT `scripts/_build-plan-{strings,content}.js`.
Gates: `verify-` 97 (exhaustive) · `mutate-` 54/54 · `local-test-` 508 ·
`smoke-` 65 (11 fresh browsers, strings-Proxy recorder) · locale-layout
396 (11×6) · print-sheets · liveness 72/0/3 · two poison suites.
Constants: ordinal **#44**, `PREV='cold-line'`, wrapper **7.56→7.57**,
`TOOL_KEYS` 47, category `measurement`.
