# 113 — Heavier or Lighter

## Identity
- Slug: `heavier-lighter-scale`
- Subject / topic: Mathematics / comparing mass — predicting which of two objects is heavier, then seeing a pan balance tip
- Age band: `5-6`
- Interaction pattern: `P10` — predict then reveal (the commit is a P1 tap on one of two object tiles; the reveal is the balance tipping)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (objects are emoji; masses are shown as stacked blocks, never as numerals or units); no `LOCALE_DATA`. The play screen carries one word.

## Learning
- Objective: Looks at two objects on a held pan balance, taps the one it predicts is heavier, and watches the balance tip and the mass blocks stack to confirm or correct the prediction — including pairs where the bigger object is the lighter one.
- Prerequisites: Knows "heavy" and "light" as words for everyday objects; can tap a tile. No reading, no counting required (the block stacks can be compared by height).
- Curriculum links: F-103 (bigger object = more; response = object size varied independently of the compared quantity from level 2), F-21 ("mass/capacity introduced" in all 12 systems), F-31 row "Mass / capacity" — conservative 7-8, earliest 6; this game sits at the pre-academic edge of the 6-8 row and is levelled 5-6 because it asks only for a comparison, never a unit (US K.MD.A.2 "directly compare two objects with a measurable attribute in common … which object has more of/less of the attribute"; England Reception ELG / Y1 "compare … mass/weight (heavy/light, heavier than, lighter than)"; Germany Klasse 1 "Gewichte vergleichen"; France GS "comparer des objets selon leur masse"; Netherlands groep 1-2 "zwaar/licht vergelijken"; Spain Infantil "pesado/ligero"; Brazil EI03ET01 / EF01MA15 "comparar … massa"; Sweden förskoleklass "jämförelser av massa"; Finland esiopetus).
- Common misconceptions (F-103, F-101), each with this game's response:
  1. **Bigger is heavier (the balloon must be heavier than the pebble).** Response: L1 pairs are congruent (bigger IS heavier) so the mechanic is learned safely; from L2 the bigger-drawn object is the LIGHTER one (balloon vs pebble, feather vs key, sponge vs apple). The reveal enacts it: the pebble's pan drops, and the mass blocks (`ART.massBlock`, one stack per pan) show one block beside the balloon and four beside the pebble — the small thing owns the tall stack.
  2. **The heavier side goes up (misreading a balance).** Response: the prompt icon (`ART.heavyIcon`) is a mini balance with a tall block stack on its LOWER pan; every reveal ends with the heavier pan low AND its taller block stack, so "down" is paired with "more blocks" every time, never with colour.
  3. **Guessing by position or by "the first one" (taps the left tile every time).** Response: a mirrored copy of a missed item (pans swapped) re-enters after 2 items (F-41), and the correct tile's slot never repeats more than twice running, so a position habit never pays.
  4. **Same-size objects are the same weight (a football and a bowling ball).** Response: L3 pairs are drawn at the SAME size; the reveal still tips and the block stacks still differ (2 vs 5), so weight is shown to be a property that size does not tell.
  5. **Reading the reveal as a verdict on the child.** Response: the reveal is identical whether the prediction was right or wrong — the beam tips, the blocks stack — and a wrong prediction only adds the block self-count and the show-me ring; nothing turns red, nothing says "wrong" (F-43, F-47).

## How it plays
1. **Start screen**: title "Heavier or Lighter", the bear (`ART.bear`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: watermelon vs strawberry)**: rail of 8 dots at y = 28 (§6; no numbers anywhere for this band). Zone A: a pan balance — the post (`ART.post`) at (360, 240), the beam (`ART.beam`, 480 × 12) level at y = 120 pivoting at (360, 120), chains (`ART.chain`) from the beam ends down 60 px to the pans (`ART.pan`, 180 × 90) at (140, 200) and (580, 200). The beam is HELD level by `ART.pin` (a small `structure` block under the pivot) — the balance cannot tip until the child commits (predict-then-reveal, F-40). On the left pan sits the watermelon (`ART.watermelon`, drawn at size 96); on the right pan the strawberry (`ART.strawberry`, size 48). The bear stands at (650, 100), right of the beam, watching. Zone B: the prompt at (360, 290): `ART.heavyIcon` (a mini tipped balance with a tall block stack on the low pan) beside `S("heavier")` ("Heavier?") at 32 px `THEME.font.display` `THEME.colour.structure`; below it two tiles (`makeTile` 200 × 130, `ART.choiceTile` tokens) at (240, 400) and (480, 400), each showing its object at a FIXED size 64 (so the tiles never show the size difference — only the pans do), the left tile = the left pan's object, the right tile = the right pan's object.
3. **Predicting**: the child taps a tile. It selects (`api.setSelected(true)`, `ANIM.pop`, `tone("tap")`), both tiles disable, and the reveal begins at once (no Check step at 5-6 — the tap IS the commit).
4. **Reveal**: `ART.pin` slides out (`ANIM.pinOut`, 200 ms); the beam tips toward the heavier object (`ANIM.tip`: angle = 14° × sign, pans and chains following, pans counter-rotated to stay level), `tone("tap", 2)` on the drop; then the mass blocks stack on each pan beside its object (`ART.massBlock`, one per mass unit, stacking upward, `ANIM.blockIn` 180 ms apart, `tone("tap", k)` for the k-th block on each pan — the light pan first, then the heavy pan, so the heavy pan's climb is heard last and higher). The heavy pan ends low with the taller stack.
   - **Prediction correct**: the chosen tile keeps its selected look and `ANIM.pop`s again, `tone("correct")`, `GameCore.showPraise` (next key in rotation), the bear `ANIM.nod`; the rail dot fills; after 900 ms the beam re-levels (`ANIM.level`), the pin returns (`ANIM.pinIn`), blocks fade (`ANIM.fadeOut`) and the next pair `ANIM.appear`s. First-try correct.
   - **Prediction wrong**: `ANIM.nudge` on the chosen tile, `tone("nudge")`, it de-selects; after the reveal the two block stacks count themselves again side by side (each block gets `ART.countDot`, a small `bg` dot, in turn with a tone — no numerals) and the taller stack `ANIM.pulse`s; then the tile of the heavier object gains the show-me ring (`ART.showRing`, `ANIM.showMe`) and re-enables; tapping it completes the item as solved-with-help (`tone("correct")`, no praise pop, rail dot fills). The mirrored item (pans swapped) is re-queued 2 items later; the item count stays 8 (it replaces the last unplayed item of the same level).
5. **Items 2-8**: per Content/Rules. L1 congruent pairs (bigger and heavier); L2 incongruent pairs (bigger-drawn object is lighter); L3 same-size pairs (both drawn at 80; only the reveal tells).
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 210) `ANIM.celebrate`; the summary = the eight pairs as mini tipped balances (`ART.miniBeam`, 64 × 4, rotated 14° toward the heavy side) in a row at y = 400 (x = 360 − 3.5 × 84 + i × 84), each with the two objects drawn at size 24 on its ends (the heavier at the low end) — a row of true comparisons, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4-5 minutes (8 items × 25-35 s including the reveal).

## Art registry
```js
const ART = {
  bear:        { kind: "emoji", value: "🐻", size: 80 },
  watermelon:  { kind: "emoji", value: "🍉", size: 96 },
  strawberry:  { kind: "emoji", value: "🍓", size: 48 },
  brick:       { kind: "emoji", value: "🧱", size: 72 },
  candy:       { kind: "emoji", value: "🍬", size: 40 },
  books:       { kind: "emoji", value: "📚", size: 80 },
  cherries:    { kind: "emoji", value: "🍒", size: 44 },
  melon:       { kind: "emoji", value: "🍈", size: 96 },
  lemon:       { kind: "emoji", value: "🍋", size: 44 },
  balloon:     { kind: "emoji", value: "🎈", size: 96 },
  pebble:      { kind: "emoji", value: "🪨", size: 44, fallback: "🌰" },   // Unicode 13 → chestnut fallback
  feather:     { kind: "emoji", value: "🪶", size: 96, fallback: "🍃" },   // Unicode 13 → leaf fallback
  key:         { kind: "emoji", value: "🔑", size: 40 },
  sponge:      { kind: "emoji", value: "🧽", size: 96 },
  apple:       { kind: "emoji", value: "🍎", size: 48 },
  teddy:       { kind: "emoji", value: "🧸", size: 96 },
  coconut:     { kind: "emoji", value: "🥥", size: 48 },
  bowling:     { kind: "emoji", value: "🎳", size: 80 },
  football:    { kind: "emoji", value: "⚽", size: 80 },
  bread:       { kind: "emoji", value: "🍞", size: 80 },
  tennis:      { kind: "emoji", value: "🎾", size: 80 },
  post:        { kind: "shape", shape: "polygon", points: [[-28,90],[28,90],[6,-90],[-6,-90]], fill: "structure" },
  beam:        { kind: "shape", shape: "rect", w: 480, h: 12, fill: "structure" },
  chain:       { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 3 },      // beam end down to the pan, length 60
  pan:         { kind: "shape", shape: "roundRect", w: 180, h: 90, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  pin:         { kind: "shape", shape: "rect", w: 40, h: 14, fill: "accent" },                // holds the beam level until the child commits
  massBlock:   { kind: "shape", shape: "rect", w: 22, h: 22, fill: "structure", stroke: "bg", strokeWidth: 1 },
  countDot:    { kind: "shape", shape: "circle", r: 5, fill: "bg" },                          // drawn on a block during the self-count
  heavyIcon:   { kind: "shape", shape: "rect", w: 48, h: 4, fill: "structure" },              // mini beam rotated 14°; a 3-block stack (6 × 6 rects, structure) on its low end, 1 block on its high end
  choiceTile:  { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 20 },
  miniBeam:    { kind: "shape", shape: "rect", w: 64, h: 4, fill: "structure" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The `size` on each object entry is its size ON THE PAN (this is the deliberate size cue or non-cue of the level); on the choice tiles every object is drawn at 64 via `draw(scene, key, x, y, { size: 64 })`, on the finish beams at 24. Objects never differ by colour in a way that carries meaning; the block stacks differ by HEIGHT and count.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "tile tapped; again on a correct prediction" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the tile of a wrong prediction" },
  pinOut:    { x: "+=60", alpha: 0, duration: 200, ease: "Sine.In", trigger: "pin slides out of the pivot on commit" },
  pinIn:     { x: "-=60", alpha: 1, duration: 200, ease: "Sine.Out", trigger: "pin returns before the next item" },
  tip:       { duration: 600, ease: "Bounce.Out", trigger: "beam container rotates to ±14° toward the heavier pan; pans counter-rotate; pan y offset = sin(14°) × 240" },
  level:     { angle: 0, duration: 400, ease: "Sine.InOut", trigger: "beam returns to level before the next item" },
  blockIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each mass block stacking on a pan, 180 ms apart (from alpha 0, scale 0.5)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the taller block stack after a wrong prediction" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bear on a correct prediction" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new pair of objects and tiles (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "blocks and count dots when the next item builds" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the heavier object's tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```
No flashing: `showMe` at 1 Hz; the tip is one bounce.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        ═════════════════╪═════════════════  beam y=120, pin   │
      │       │                 │                 │   chains          │  zone A
      │  ┌────┴────┐          (post)          ┌────┴────┐  bear(650,100)│
      │  │ melon ▮ │ pan L (140,200)          │ ▮ berry │ pan R (580,200)│
      │  └─────────┘  blocks stack beside      └─────────┘              │
260   ├──────────────────────────────────────────────────────────────┤
      │            [icon] Heavier?  (360,290)                         │
      │        [  melon  ]            [  berry  ]   y=400             │  zone B
      │         (240,400)              (480,400)   200×130            │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The beam, chains and pans are one container rotated about the pivot; at 14° the low pan's centre drops 58 px to y ≈ 258 — still above zone B's prompt at 290.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22) → `ART.dotFull`. No numerals anywhere on the play screen.
- `ART.post` at (360, 240); `ART.beam` centred (360, 120) in a container with `ART.chain`s from (120, 120) and (600, 120) down 60 px; `ART.pan`s centred (140, 200) and (580, 200); `ART.pin` at (360, 134) under the pivot.
- Objects on the pans at (pan x − 30, pan y − 10) at their ART `size`; mass blocks stack at (pan x + 50, pan y + 30 − 24 k) for the k-th block (k = 0 … mass − 1), so the stack rises from the pan surface beside the object.
- `ART.bear` at (650, 100). Prompt: `ART.heavyIcon` at (300, 290) (the mini beam rotated 14° with its block stacks) and `S("heavier")` centred at (390, 290), 32 px `THEME.font.display` `THEME.colour.structure`, `wordWrap` 240.
- Tiles: `makeTile` 200 × 130 with `ART.choiceTile` tokens at (240, 400) and (480, 400); each holds its object at size 64 centred. Tap floors 200 × 130 ≥ 80; gap 40.
- `ART.showRing` around the heavier object's tile; `ART.countDot` on each block during the self-count.
- Tab order: left tile, right tile. While the reveal plays (≈ 2.5 s) both tiles are `setEnabled(false)`.

## Content
Language-neutral (emoji objects; masses are block counts 1-5 and are never written). An item = (left object; right object; mass left; mass right). "Size" is each object's ART size as declared.

- **L1** (congruent: the bigger-drawn object is heavier; difference ≥ 3 blocks): (`ART.watermelon`; `ART.strawberry`; 5; 1) · (`ART.brick`; `ART.candy`; 4; 1) · (`ART.books`; `ART.cherries`; 4; 1) · (`ART.melon`; `ART.lemon`; 5; 2)
- **L2** (incongruent: the bigger-drawn object is LIGHTER): (`ART.balloon`; `ART.pebble`; 1; 4) · (`ART.feather`; `ART.key`; 1; 3) · (`ART.sponge`; `ART.apple`; 1; 3) · (`ART.teddy`; `ART.coconut`; 2; 4)
- **L3** (same drawn size 80; only the reveal tells): (`ART.bowling`; `ART.football`; 5; 2) · (`ART.brick`; `ART.sponge`; 4; 1 — both drawn at 80 here via `draw(..., { size: 80 })`) · (`ART.pebble`; `ART.bread`; 4; 2 — both at 80) · (`ART.apple`; `ART.tennis`; 3; 1 — both at 80)

Play list: 8 items; start at L1; shuffled within the level without repeats; level changes per Rules; the pans' left/right assignment is randomised per item (the listed order is not fixed) so the heavier object is on the left about half the time; the correct tile's slot never repeats more than twice running. A missed item re-queues mirrored after 2 items (replacing the last unplayed item of its level).

Worked example: item 1 (watermelon/strawberry) taps the watermelon → the pin slides out, the left pan drops, 1 block stacks by the strawberry then 5 by the watermelon; praise · item 2 (brick/candy) first-try → L2 · item 3 (balloon/pebble) taps the balloon → the RIGHT pan drops; 1 block by the balloon, 4 by the pebble; the stacks count themselves, the pebble's stack pulses, the pebble tile gets the ring; taps it (helped) → L1 · item 4 (books/cherries) first-try · item 5 (melon/lemon) first-try → L2 · item 6 = the mirrored balloon/pebble (pebble on the left) taps the pebble first-try · item 7 (feather/key) first-try → L3 · item 8 (bowling/football) first-try → Finish shows eight tipped mini beams.

## Rules
- Item count: 8 (including a mirrored re-queue, which replaces an unplayed item).
- Difficulty progression: 2 consecutive first-try correct predictions → next item from the next level up (cap L3).
- Adaptation: a wrong prediction on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned; a missed item re-queues mirrored after 2 items.
- What happens on a correct answer: the reveal (pin out, beam tips, blocks stack with rising tones), `ANIM.pop` on the tile, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], bear `ANIM.nod`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Bigger chosen as heavier (L2): the reveal drops the SMALL object's pan; the stacks count themselves with dots and tones (light pan first), the taller stack pulses; `tone("nudge")`; the heavier object's tile gains the show-me ring.
  - Same-size pair misjudged (L3): the same reveal and count; the ring.
  - Position habit (always left): the same; the mirrored re-queue puts the heavy object on the other side.
  - Heavier-goes-up reading: the same; the low pan always carries the tall stack, and the prompt icon shows the same pairing.
- Retry behaviour: attempt 1 = the prediction → the reveal is shown regardless → the show-me ring on the heavier tile; tapping it completes the item as solved-with-help. No attempt beyond that; the mirrored item returns later.
- Finish condition: 8 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Heavier or Lighter"; `heavier` = "Heavier?" (one word, paired with `ART.heavyIcon`). No other text on the play screen.

## Sound
`tone("tap")` on the prediction tap; `tone("tap", 2)` when the beam drops; `tone("tap", k)` per mass block as it stacks (the heavy pan's climb is played last and highest, F-213); `tone("correct")` on a correct prediction; `tone("nudge")` on a wrong one; `tone("finish")` once. Silent under `?sound=off`; no audio files. The tilt and the stacks carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; "Heavier?" once translated).
- [ ] Works at narrow width (400-px iframe: both pans, the tipped beam, the prompt and both tiles visible; the low pan never touches the prompt).
- [ ] Keyboard operable (Tab between the two tiles; Enter predicts; the pans and the bear are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong prediction on every item still reaches All done via the show-me ring).
- [ ] The beam is held level by the coral pin and does not move until a tile is tapped.
- [ ] After a tap the pin slides out, the heavier pan drops with a bounce and blocks stack beside each object — more blocks beside the heavier one.
- [ ] At the second level the balloon is drawn twice as big as the pebble and the pebble's pan still drops with the taller stack.
- [ ] At the third level both objects are the same size on the pans; the tiles always show both objects at the same size.
- [ ] A wrong prediction makes the two stacks count themselves with dots, pulses the taller one and rings the heavier object's tile; tapping the ring completes the item.
- [ ] A missed pair comes back two items later with the objects on the opposite pans.
- [ ] No numeral, unit or score appears anywhere in the game.
- [ ] If the pebble or feather emoji is missing on the device a chestnut or leaf appears instead.
- [ ] With `?sound=off` nothing is audible.
