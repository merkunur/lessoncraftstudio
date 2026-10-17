# Row 33 — Bramble's Berry-Juice Stand → THE TIPPING POUR (K.MD.A.2)

## 0. Identity
- id `bramble.holds-more.k-md-a-2` (KEPT; slugs/titles/intros frozen for en, de, fr, es, pt, it, nl; sv/da/no/fi slug, title and intro authored new at build, grade K/förskoleklass equivalents) · grade K · CCSS K.MD.A.2 · Measurement & Data · own files `tipping-pour-core.js`, `tipping-pour-activity.js`, `tipping-pour-activity.html`, `tipping-pour-activities.json` (`bramble-activities.json` emptied to `[]`).
- worksheets: none mapped (the row owns capacity — no printable type does it).
- old activity: predict which drawn cup holds more, then an automatic pour verifies. **Kept**: predict-first (the old core's best rule: no pour before a committed prediction), the cognition taxonomy (clearcut, wide-wins, tall-less, narrow-wins, decouple, fit, same), the on-ramp → tricky order, the page title and the name Bramble. **Dropped**: the hand-drawn Bramble character (eyes and all — a LAW rule-5 violation) and the old core's decoupled capacities (capacity was an authored integer unrelated to the drawn shape — a drawn bottle 30 wide and 92 tall "held more" than a tub 82 wide and 46 tall, which no real bottle can). Capacities are now COMPUTED from each vessel's drawn profile, so every illusion is a real one.

## 1. The pitch
"Call which cup holds more — then pick it up, tip it into the other one and watch: it spills over, leaves a gap, or fills exactly to the brim."

## 2. Why a child will want it again
- Pouring is the oldest water-table joy there is, and here the child's own hand does the tipping: the further you tip, the faster the juice runs. You can pour slowly, stop half way, carry on.
- The suspense is built in: the child has placed a raspberry on their guess before the pour, and the juice decides. The tall skinny glass — "obviously more!" — empties into the low wide bowl and the bowl is not even full. Children gasp and want the next one.
- Three endings with three shows: a spill runs over the rim into the drip tray with a little splash; a gap shows a dashed empty band at the top; an exact match makes the brim sparkle with a bright "ting".
- Bramble the hedgehog (a library picture, standing at the end of the counter) hops when the berry lands in the right cup.
- Free play after every round: pour back and forth as long as you like (the juice is conserved — it never gets more or less), refill from the tap, or tip a cup out into the drip tray.

## 3. The skill and the misconception
- Skill (K.MD.A.2): directly compare two containers by capacity and say which holds more, which holds less, or that they hold the same; the direct comparison IS pouring one into the other.
- Misconceptions: (a) "taller holds more" (the classic Piagetian conservation trap); (b) "wider holds more" (the over-correction once a child has been fooled); (c) the outside of a container is its capacity (thick walls); (d) a pour that does not fill the other one means "same".
- Push-back by physics: capacities are real volumes of the drawn shapes (solids of revolution), so the level in each vessel rises and falls by its own shape — juice climbs fast in a narrow glass and slowly in a wide pan. The three outcomes are physical facts on the screen (spill, gap, brim); the illusion rounds are balanced so that no single look-cue (height, width, area) wins more than half of them.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 470):
- **The counter**: a drawn wooden shelf line across the stage at y = 380 (8 px, #C99A6B with a 3 px ink edge).
- **Vessel A** (left, centred at x = 175) and **Vessel B** (right, centred at x = 485), each in a 220 × 230 box standing on the counter; drawn as clear glass: profile outline 3 px #0F4A40, glass tint #EAF6F8, highlights 2 px white; juice #B03A5B with a lighter meniscus line. Model units: a vessel is ≤ 100 tall and ≤ 90 wide; at 704 one unit = 2.2 px (a 100-unit glass is 220 px tall).
- **The same coaster** between them (x = 330): a 64 × 20 drawn coaster with an "=" icon (two equal bars) — the place to put the berry for "the same".
- **The berry**: fruits/raspberry (library), 56 px, waiting in a small drawn dish at the left edge of the counter.
- **The juice tap**: a drawn spout on a bracket above Vessel A with a round valve knob (56 px tap target).
- **The drip tray**: a shallow drawn grille tray 240 × 18 under Vessel B, sunk into the counter.
- **The tip button**: a 64 px round button with a curved-arrow icon, appearing at the right edge only when A is docked over B (for children who cannot drag-tilt; drag-tilt is the main path).
- **Bramble**: forest-creatures/hedgehog (library), 96 px, at the far right end of the counter. Decorative; hops on success.
- Task line above (≤ 24 px). Bubble under the counter.

At 360 (stage ≈ 336 × 420): unit = 1.3 px (vessels ≤ 130 px tall, boxes 150 × 140) side by side (A at x = 84, B at x = 252), coaster between (48 × 16), berry 48 px, Bramble 64 px tucked under the drip tray's right end, tip button 56 px. Stage height ≈ 60 (tap) + 140 + 24 + 50 = 274 px plus bubble → above the 360 × 740 and 320 × 640 folds (at 320 unit 1.15).

Library pictures: fruits/raspberry (berry), forest-creatures/hedgehog (Bramble) — both verified in `mini tools/pictures/*.json`. The vessels, tap, coaster, tray and juice are drawn apparatus geometry (glassware profiles, no faces, no decoration). No words on the apparatus.

Task line (EN): "Which holds more? Put the berry on it — then pour!" · "Which holds less? Put the berry on it — then pour!" · fit rounds "Will this juice fit in the other one? Put the berry on your guess — then pour!" (fit uses two drawn icons on the coasters: a "fits" icon (level under a rim line) and a "spills" icon (a drop over a rim)).

## 5. The hand
1. **Predict**: drag the raspberry onto Vessel A, Vessel B or the "=" coaster (tap-tap also works). It settles on the vessel's rim (or the coaster) with a little roll (160 ms). It can be moved freely until the pour starts.
2. **Fill**: tap (or hold) the tap's knob → juice streams into A and the level rises by A's own profile (fill time 1.2 s for any vessel); it stops itself at the brim with a sparkle. Pressing the tap before a berry is placed: the berry wiggles in its dish (no fill).
3. **Pour**: drag Vessel A by its body. It lifts (shadow), follows the finger; when its lip comes over B's mouth (a 60 px snap zone) it docks. Now dragging **downwards** tilts it (0° → 120° over 140 px of drag; release holds the angle); juice flows when the liquid surface reaches A's lip, faster the further it tips (flow ∝ tilt beyond the pouring angle). A's level falls by A's profile, B's rises by B's profile, volume exactly conserved. The tip button does the same in steps (each press +20°, holding = continuous). Keyboard: Enter docks, ArrowDown tilts.
4. **Outcomes** (shown by the juice itself):
   - B overflows → juice runs over B's rim on the far side and into the drip tray (a puddle grows); A still holds the rest, visibly.
   - A empties and B is not full → the empty band at the top of B gets a dashed outline.
   - A empties exactly as B reaches its brim (computed volumes equal) → brim sparkle + "ting" (1.6 kHz).
5. **Result**: the berry judges itself — see §7. A drags back to its place by itself (or the child drags it).
- Free play (after success, any time): pour B back into A, pour back and forth, refill at the tap, tip any vessel over the drip tray to empty it. The puddle in the tray slowly drains (2 s).
- Sound is decoration: trickle (filtered noise, pitch rising with the level), splash on spill, "ting" on brim.

**The physics (core)**: each vessel is a list of profile segments `{y0, y1, r0, r1}` (inner radius, model units) for the cavity; volume to height h is Σ π∫r(y)² dy (frustum formula per segment). The level for a given volume is solved by bisection (≤ 20 steps). Thick-walled vessels draw an outer outline and a separate inner cavity outline, walls hatched lightly — capacity uses the cavity only. The SAME rounds solve one vessel's height so both volumes agree to 0.1 %.

## 6. The rounds
Notation: shape kind, then cavity size in model units (r = radius, h = height; frustum r_bottom→r_top). Volumes in units of π·u³ (internal, never shown). Ratio = bigger / smaller.

**Cups: Easy** (appearance agrees with the truth)
| # | A | B | volumes A / B | truth |
|---|---|---|---|---|
| E1 | cup r15 h40 | jug r34 h90 | 9 000 / 104 040 | B more |
| E2 | bowl r22→41 h50 | cup r15 h35 | 51 117 / 7 875 | A more |
| E3 | mug r24 h60 | mug r24 h60 | 34 560 / 34 560 | same |
| E4 | mug r24 h60 | jug r34 h90 | 34 560 / 104 040 | B more |
| E5 | pan r43 h46 | cup r15 h40 | 85 054 / 9 000 | A more |
| E6 | glass r20 h88 | glass r20 h88 | 35 200 / 35 200 | same |
| E7 | cup r15 h40 | bowl r24→41 h50 | 9 000 / 54 017 | B more |
| E8 | bottle (body r26 h64 + neck r10 h24) | mug r22 h50 | 45 664 / 24 200 | A more |
A 3 · B 3 · same 2.

**Cups: Tricky** (the illusions; rebuilt from the old cogs)
| # | cog | A | B | volumes A / B | ratio | truth |
|---|---|---|---|---|---|---|
| T1 | wide-wins | tall glass r23 h92 | bowl r30→42 h48 | 48 668 / 62 784 | 1.29 | B more |
| T2 | tall-less | tall jug r24 h90 | pan r43 h46 | 51 840 / 85 054 | 1.64 | B more |
| T3 | narrow-wins | glass r30 h94 | tub r40 h40 | 84 600 / 64 000 | 1.32 | A more |
| T4 | decouple | thick pot: outer r40 h84, cavity r26 h60 | mug r27 h70 | 40 560 / 51 030 | 1.26 | B more |
| T5 | decouple | plain tall glass r24 h80 | thick stoneware bowl: outer r45 h50, cavity r31 h32 | 46 080 / 30 752 | 1.50 | A more |
| T6 | narrow-wins | flute r20 h94 | dish r40 h18 | 37 600 / 28 800 | 1.31 | A more |
| T7 | transfer (wide) | vial r25 h94 | tub r44 h44 | 58 750 / 85 184 | 1.45 | B more |
| T8 | transfer (narrow) | tall jar r31 h94 | bin r43 h38 | 90 334 / 70 262 | 1.29 | A more |
| T9 | fit | bowl r24→36 h50 → poured into | jug r25 h90 | 45 600 / 56 250 | 1.23 | FITS (gap) |
| T10 | same | tall glass r20 h88 | tub r30 h39.1 (solved) | 35 200 / 35 200 | 1.00 | same |
A 4 · B 4 · fit 1 · same 1. Look-cue audit over T1–T8 (gated, outer outlines): the TALLER vessel holds more in 4 of 8 (T3, T5, T6, T8); the WIDER in 3 of 8 (T1, T2, T7); the larger 2D silhouette AREA in 3 of 8 (T3, T6, T8). Every cue AND its reverse ("the shorter one", "the narrower one", "the smaller-looking one") wins at most 5 of 8 — so neither a look nor a learned anti-look ("tall ones always trick me") beats pouring.

**Question polarity**: in "Which holds less?" rounds the same vessels are used and the right berry place flips (same stays same; the fit round T9 asks its own question and has no polarity). Mixed alternates more / less, starting with more.
- All ratios ≥ 1.22 except same (exact) — big enough that spill or gap is plainly visible (≥ 9 % of B's height).
- **Answer position**: the berry's right place is A, B or "=". Balanced as above per level; the reshuffle also swaps A↔B sides on alternate passes for half of the rounds (the pour always goes from the left vessel into the right one, so the truth flips with the swap — re-derived by the core from volumes, never stored).
- **Order**: Easy first time through (the on-ramp), then order-only reshuffle per pass; Tricky reshuffles freely except T9/T10 are never the first round of a pass.

## 7. Check, the misses, the success
There is no Check button: the pour is the check, and it cannot start until the berry is placed (the old core's predict-first guard, kept and gated).
- tap or drag A before placing the berry → the berry wiggles; bubble "Put the berry on the one you think holds more." (or "…holds less." / "…your guess.") — no miss.
- **The prediction is right** → after the pour, the berry hops into the right vessel's juice with a "plop" (or onto the "=" coaster, which glows), Bramble hops. Bubble: more "Yes — the {side} one holds more! The juice {spilled over / did not fill it}." Precisely: A more "Yes — this one holds more: its juice spilled over!" · B more "Yes — this one holds more: the juice did not fill it!" · same "Yes — they hold the same: full to the brim!" · fit "Yes — it fits, with room to spare!" (less-rounds mirror: "Yes — this one holds less: …").
- **miss 1** (prediction wrong): the pour runs anyway (it is the evidence); then the evidence is ringed — the puddle in the drip tray, or the dashed empty band, or the sparkling brim — and the berry rolls back to its dish. Hint by outcome: spill "Look — the juice spilled over. That cup could not hold it all." · gap "Look — the juice did not fill it. There is room left at the top." · brim "Look — full to the very top, and nothing left over." The child places the berry again (no second pour needed; the juice stays where it is).
- **miss 2** (wrong again): the right place glows (vessel outline or coaster, teal, 2 pulses); hint "The berry goes here."
- a new berry move takes the glow away.
- End-of-round show (any success): the juice in both vessels shimmers once, Bramble hops, and a small berry drops into a basket icon at the left end of the counter (a round counter of pours, not a score — it resets each visit and never says a number).

## 8. Settings
1. **Cups**: Easy / Tricky — the vessels at rest change (E-table vs T-table).
2. **Question**: Holds more / Holds less / Mixed — the task line and the coaster icons change at rest.

## 9. Words (EN source)
- title "Bramble's Berry-Juice Stand" (frozen; per-locale names as shipped: de "Brambles Beerensaft-Stand", fr "Le stand de jus de baies de Bramble", es "El puesto de Bramble", pt "A Barraquinha de Suco do Bramble", it "La bancarella del succo di Bramble", nl "Storms sapkraam"; sv/da/no/fi authored new)
- instruction "Put the berry on your guess, then tip one cup into the other and watch the juice."
- prompts: "Which holds more? Put the berry on it — then pour!" · "Which holds less? Put the berry on it — then pour!" · "Will this juice fit in the other one? Put the berry on your guess — then pour!"
- hints: "Put the berry on the one you think holds more." · "Put the berry on the one you think holds less." · "Put the berry on your guess." · "Look — the juice spilled over. That cup could not hold it all." · "Look — the juice did not fill it. There is room left at the top." · "Look — full to the very top, and nothing left over." · "The berry goes here."
- celebrations: "Yes — this one holds more: its juice spilled over!" · "Yes — this one holds more: the juice did not fill it!" · "Yes — this one holds less: the juice did not fill the other one!" · "Yes — this one holds less: the other one spilled over!" · "Yes — they hold the same: full to the brim!" · "Yes — it fits, with room to spare!" · "Yes — it spills over: it does not fit!"
- settings: "Cups" — "Easy" / "Tricky" · "Question" — "Holds more" / "Holds less" / "Mixed"
- aria: "Left cup", "Right cup", "The same", "Juice tap", "Tip", "Berry".

Locale traps:
- "holds more" is idiomatic, not literal, everywhere: de "Wo passt mehr hinein?" · fr "Lequel contient le plus ?" (for two, "contient plus" / "le plus" — the reviewer picks) · es (es-MX) "¿A cuál le cabe más?" · pt "Em qual cabe mais?" · it "Quale contiene di più?" · nl "Waar past meer in?" · sv "Vilken rymmer mest?" · da "Hvilken kan rumme mest?" · no "Hvilken rommer mest?" · fi "Kumpaan mahtuu enemmän?". Two containers → comparative where the language wants it (fi enemmän, de mehr), superlative where idiom insists (sv mest, da/no mest) — native call.
- "cup" vs "glass" vs "container": the prompts never name the vessel kind (shapes are varied); "this one" / "the other one" are deictic and agree in gender in Romance languages and de — use a neutral noun once per locale ("Behälter"/"Gefäß" de, "récipient" fr, "recipiente" es/pt/it, "bak" nl, "kärl" sv, "beholder" da/no, "astia" fi), chosen by the native reviewer, or rephrase to avoid it.
- "brim" has a natural word in each (bis zum Rand / à ras bord / hasta el borde / até a borda / fino all'orlo / tot de rand / ända upp till kanten / helt op til kanten / helt opp til kanten / piripintaan).
- Berry = raspberry: sv "hallon", da "hindbær", no "bringebær", fi "vadelma" — the label comes from the vocab file; never "berry" generically in a sentence.
- Bramble's name: nl already ships "Storm" — keep it; sv/da/no/fi name chosen by the native reviewer (a hedgehog-ish name) and used only in the title.

## 10. Sound off, access, phones
- Silent-legible: spill, puddle, gap band, brim sparkle and the berry's final place carry all meaning.
- Keyboard: Tab → berry (Enter picks up) → Tab to A / "=" / B (Enter places) → Tab to the tap (Enter fills) → Tab to A (Enter docks over B) → ArrowDown tilts / ArrowUp straightens → Escape returns A.
- aria-live: "Juice: spilled over" / "Juice: room left at the top" / "Juice: full to the brim".
- Taps: tap knob 56, tip button 56–64, coaster 64 × 44 hit area, vessels ≥ 130 px tall on phones.
- Pictures: raspberry 56 at 704 / 48 at 360 (a token, held — the pictured content of the round is the vessels); hedgehog 96 / 64.
- Phone: everything above the fold; the tip button replaces precise drag-tilt for small hands (drag-tilt still works).
- prefers-reduced-motion: the flow is shown in 3 steps instead of a stream; outcomes identical.

## 11. Distinct from
- `measurement-bench` tool (pours between GRADUATED beakers, estimate first): here no graduations, no numbers, real shaped glassware with real illusions, a committed prediction, and the three-outcome direct comparison (spill / gap / brim).
- #209 The Market Scale (weight on a balance) and #32 The Measuring Stations (naming attributes): different attribute, different mechanic.
- #235 The Water Tub (sink/float science, other batch): water as a property test, not capacity.
- Registry: no built activity pours.

## 12. Build plan
- **Core state**: `{round, swap, polarity, berry:null|'A'|'B'|'SAME'|'FITS'|'SPILLS', fillA, fillB, docked, tilt, outcome, misses}`; functions `volume(profile, h)`, `levelFor(profile, V)` (bisection), `capacity(profile)`, `truth(round, swap, polarity)` (from computed capacities only), `place(berry)`, `fill()` (throws without a berry), `pourStep(dt)` (conserves volume; spill when B is full), `outcome()`, `judge()`, `nextTask`.
- **Gate's own ground truth** (`verify-tipping-pour-core.js`): re-computes every capacity from the profile literals with its own frustum integrator (not the core's); asserts each round's truth, ratio ≥ 1.22 (same: |Δ| ≤ 0.1 %); the look-cue audit over the Tricky illusion rounds (taller-wins, wider-wins, larger-area-wins each between 3 and 5 of 8, so no cue and no reversed cue wins more than 5); side balance after the swap rule over a pass; conservation (Σ juice constant to 1e-9 through 10 000 random pour steps, spill counted); predict-first (fill throws with no berry); no stored truth field anywhere in the round data.
- **Mutations**: capacity from 2D area · capacity from outer outline on thick vessels · pour creates juice · spill never triggers · truth read from a stored field · fill allowed before prediction · swap not applied to truth · same round solved to 2 % · polarity ignored · tilt does not change flow · aria omits outcome.
- **Local test**: real pointer: place berry, fill, drag-dock, drag-tilt, tip button, all three outcomes, free pour-back; 7 widths × 11 locales; asserts spill puddle area > 0 only when VA > VB, gap band only when VA < VB.
- **Contact sheet at build**: fruits/raspberry at 48 px (reads as a berry, not a strawberry), forest-creatures/hedgehog.
- **Risks**: drag-tilt on touch needs a generous docking zone; the juice surface stays horizontal while A tilts (clip the liquid polygon against the rotated cavity — a simple polygon clip, ~60 lines). sv/da/no/fi metadata new.
- Nothing BLOCKED.

## 13. The four questions
1. Yes — tipping juice yourself, the gasp when the tall glass leaves a gap, three different endings, free pouring forever.
2. Yes — it IS the K.MD.A.2 direct comparison (pour one into the other), conservation is real physics, no look-cue works, and the old dishonest capacities are gone.
3. Yes — clear glassware and two library pictures, no numbers, no words on the stage, nothing scored.
4. Call which cup holds more, then tip one into the other yourself: it spills, leaves a gap, or fills exactly to the brim.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Recomputed every capacity (frustum formula): all 18 volumes in the tables are right. But the look-cue audit hid a REVERSED tell: the taller vessel held more in only 2 of 8 tricky rounds, so the anti-rule "pick the shorter one" won 6 of 8 (and "pick the smaller-looking one" 6 of 8) — exactly the over-correction misconception (b) the row exists to break. T5 is now a plain tall glass (46 080) against a thick stoneware bowl whose outside is wide and big but whose cavity is shallow (30 752): the thick-wall lesson kept, the tall one wins. T6 is now a flute (37 600) against a shallow dish (28 800): narrow-and-tall wins. Taller wins 4/8, wider 3/8, area 3/8 — every cue and its reverse ≤ 5/8; truth still A 4 · B 4; both new rounds spill visibly; every vessel stays within the 90-unit width box.
- The gate now asserts both directions (each cue 3–5 of 8), not only "≤ 4".
- The fit round has no more/less polarity (stated).
