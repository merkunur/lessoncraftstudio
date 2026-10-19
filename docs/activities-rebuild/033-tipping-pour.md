# #33 — Which Holds More? → THE TIPPING POUR (K.MD.A.2)

ORDER row 33 · id `bramble.holds-more.k-md-a-2` (kept).
- **Own files:** `tipping-pour-core.js`, `tipping-pour-activity.js`, `tipping-pour-activity.html`, `tipping-pour-activities.json`.
- `bramble-activities.json` is now `[]` (CRLF kept). The old `bramble-core.js` / `bramble-activity.js` are unreached. **0 lines in any shared core.**
- **Locales:** slug, title and intro are frozen in en, de, fr, es, pt, it and nl. sv, da, no and fi metadata is new. `GRADE_OVERRIDE` adds `no:'1'`, since barnehage is not a school stage.
- **Prose:** rewritten ×11.
- **Design:** `designs/033-bramble.md`.

## The apparatus and its invention: THE JUICE DECIDES
- **The round, step by step:**
  1. **Call first:** the raspberry goes on the left vessel, the right vessel, or the "=" coaster. In the fit round the coasters are "fits" and "spills" instead.
  2. **Fill:** the tap fills the left vessel. It refuses, and the berry wiggles, until the berry is down.
  3. **Pour:** drag the left vessel over the other (or tap it to dock), then tip it by dragging down, with the tip button, or with ArrowDown.
  4. **The outcome:** the juice SPILLS into the drip tray, leaves a dashed GAP, or reaches the BRIM, which sparkles.
- **The physics is real.** Capacities are computed from each vessel's cavity profile, as solids of revolution. A thick stoneware pot is big outside and small inside. What a vessel holds at a given tilt is the share of its cross-section below the line through its inner lip. Juice is conserved exactly.
- **After a right call:** free play. Pour back the other way (the stage grows for it), refill, overflow. The berry goes back to its dish, and a small berry lands in the basket.
- **Rounds:**
  - **Easy:** the design's 8 rounds.
  - **Tricky:** the 10 illusion rounds. The look-cue audit gives taller 4 / wider 3 / area 3 of 8.
  - The sides swap on odd passes. Mixed questions alternate more and less.
  - No berry place answers 3 times running.

## Gates
- **`verify-tipping-pour-core.js` (2,403 checks).** It has its own Simpson re-integration of every capacity against the design tables, and covers:
  - truth for both sides and both questions;
  - ratio ≥ 1.22;
  - the look-cue audit, both directions;
  - gap band ≥ 9 %;
  - that hold is monotone and mirror-symmetric;
  - conservation over 10,000 steps;
  - every round's outcome when tipped all the way;
  - miss 1, miss 2 and the glow;
  - order over 10,000 seeds, plus a same-dealer check;
  - stage reach and sky at 280–1100 px;
  - strings ×11, every key authored and used.
- **`mutate-tipping-pour.js`: 27/27 killed.** That includes the design's 11.
- **`local-test-tipping-pour.js --locales=all`: 720/0.** Real pointer throughout: berry drag, tap-tap, dock drag, tilt drag, tip button, keyboard, free pour-back. Sweep 320–1366 at rest, mid-pour, full tilt and poured back.
- **visual-qa:** 48 renders.
- **Hierarchy:** 338/0.
- **Settings efficacy:** 2 live.
- **Content, prose, SERP, tells, rank, preflight:** all PASS.

## Traps
- **The sky.** A fixed stage height sized for the worst pour (the free-play pour back) left about 90 units of empty sky on every round. The sky is now per round (forward pour only), and the stage grows only while the right vessel is docked over the left.
- **The LAW picture floor.** The raspberry token at 56 px and Bramble at 82 px failed the ≥ 96 / ≥ 64 floor. The dish, the basket and Bramble moved into a strip under the counter, at full size. Bramble is mirrored to face the stand.
- **The shell bubble repeats the win line.** Once the shell's Check fires, the note switches to the free-pour invitation.
- **Three mutation survivors**, each a blind spot in the gate:
  - **Tilt ignored:** the gate only compared flow rates, so it now holds a vessel at 20° and checks that it keeps what lies below its lip.
  - **Repeat order:** random seeds never repeat by chance, so a same-dealer test was added.
  - **Handle out of the look audit:** only the A-side outline was compared; B is now compared too.
- **A bash heredoc broke on the prose**, again. Write the source with the Write tool.

## Review (one agent, native ×11 + pedagogy) — applied
- **Pedagogy:**
  - **Fit prompt.** "Will this juice fit in the other one?" was asked before the fill, so it hid the rule that the left one is poured. It now names the left and right containers in all 11 locales.
  - **Easy first pass.** It replayed in table order on every visit, against §A.13.60. Every pass now shuffles, and the gate checks that 40 visits give at least 30 different orders.
  - **Fit round.** The gate asserts the fit pair is never equal, so "it fits, with room to spare" stays true.
- **Strings:**
  - en aria: "Left/Right container".
  - es: "abre la llave", "se desbordó".
  - it: "c'è ancora spazio".
  - sv / da / no: the okFits lines no longer repeat "plats/plads/plass".
  - da / no: "Lette" (plural, to agree with the other option).
  - fi: "kaikkea" (partitive), "Vaihteleva", "siitä valui mehua yli".
- **Prose:**
  - pt: "bandeja de gotejamento".
  - sv: "högre mer".
  - da: "Matematisk opmærksomhed", "Ingen tidtagning".
  - es: "Abre la llave".
- **FROZEN-NOTE (not changed):**
  - **fr:** the title and intro have plain spaces before punctuation, and "ou pareil" should be "ou autant".
  - **pt:** the intro says "suco de amora" (blackberry), but the berry is a raspberry.
  - **it:** the intro says "succo di more" (blackberries) and calls every container a "bicchiere".
  - **de:** the intro says "Becher".
  - **en:** the intro says "which cup".
