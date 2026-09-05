# 102 — Material Sort

## Identity
- Slug: `material-sort`
- Subject / topic: Science / everyday materials sorted by an observable, testable property (bends / does not bend; hard / soft) — the SAME object made of different materials
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the item, then tap a bin); a P10-style test enacts the property
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science rule (F-218, F-136): the item is always "an object made of a material" — the object stays the same within a level and the MATERIAL decides; the property is TESTED on screen (the strip bends or resists; the press squashes or bounces), never asserted by colour or a verdict. Bins are labelled by an icon of the test result, never by colour alone.

## Learning
- Objective: Sorts an object made of a named material into the "bends" or "does not bend" bin (later "hard" / "soft") by the material, and watches the property test confirm it.
- Prerequisites: Reads a single word (the material name is printed beside its picture; the picture carries the meaning for a weak reader). Has met the two-tap sort (game 005 territory).
- Curriculum links: F-23 (everyday materials sorted by observable property in 11 of 12 systems), F-30 (world-knowledge subjects at 5-8; property tests), F-31 row "Materials by property" — conservative 8, earliest 5 → 6-8 (England Y1 "describe the simple physical properties of a variety of everyday materials"; US 2-PS1-1 "classify different kinds of materials by their observable properties"; Germany HSU "Stoffe und ihre Eigenschaften"; France "propriétés de la matière" cycle 2; Netherlands kerndoel 42 "materialen"; Spain Conocimiento del Medio "materiales y sus propiedades"; Brazil EF02CI01; Sweden åk 1-3 "material och deras egenskaper"; Denmark natur/teknologi; Norway naturfag 2. trinn; Finland ympäristöoppi (at 9 formally, earlier by practice — F-23 note)). F-218.
- Common misconceptions (F-136, F-103), each with this game's response:
  1. **Object confused with material — "spoons don't bend" (sorting by what the thing IS, not what it is MADE OF).** Response: within a level the object is identical on every card, so the object cannot be the cue; at L3 the object CHANGES from card to card while the bins stay the same, and a card sorted by object gets the test: the material chip (`ART.chipRing` around the swatch) pulses first, then the strip bends or resists.
  2. **All of one look = one property — shiny things are hard, fluffy things are soft, "plastic is plastic".** Response: L2 puts glass (shiny, hard), sponge (dull, soft), rubber (shiny, soft) and paper (dull, bends) together; the enacted press/bend test on error shows the material's behaviour regardless of its look. Card fills are one token for every material, so appearance never carries the answer.
  3. **Bends = breaks — a rigid material "bends because it snaps".** Response: the bend test on a rigid material shows the strip RESIST (`ANIM.resist`: a 3° tilt that springs straight, twice) and stay whole; nothing ever breaks on screen.
  4. **Bigger / thicker = harder (F-103 "bigger object = more").** Response: every card is the same size; the test bar is the same length for every material; only the enacted behaviour differs.

## How it plays
1. **Start screen**: title "Material Sort", the beaver (`ART.beaver`) at (360, 200), Start, picker.
2. **Item 1 (L1: a strip made of rubber; bins "bends" / "does not bend")**: rail of 12 dots (§6; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`). Zone A: the item card (`ART.card`, 200 × 150, a `makeTile`) centred at (360, 150) showing the object glyph (`ART.objStrip` at (−40, −30)), the material swatch (`ART.matRubber` at (+40, −30)) and the material word (`LOCALE_DATA[lang].material.rubber`, 26 px `THEME.font.body` `THEME.colour.ink`, centred at (0, +26), wordWrap 180); under the card the test bar (`ART.testBar`, 160 × 18) at (360, 236) carrying three small copies of the swatch glyph (18 px) along it. A test tile (`ART.testTile`, 64 × 64, label `ART.pressGlyph`) sits at (560, 150) — optional: tapping it plays the test for this material. Zone B: two bins (`ART.bin`, 200 × 120) at y = 380, x = 230 / 490, labelled by icons: `ART.iconBends` (a curved bar) and `ART.iconRigid` (a straight bar with a small bracket under each end), each with a count sub-label (`ART.binCount`). Caption `S("whichBin")` ("Which bin?") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Sorting**: tap the card (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin; the card glides (`ANIM.glide`) to the bin.
   - **Correct bin**: `tone("correct")`; the test plays INSIDE the bin as confirmation — the bin's icon `ANIM.pop` and the test bar under the card position replays the true behaviour once (`ANIM.bend` for a bending material, `ANIM.resist` for a rigid one); bin count +1; praise pop on every third correct item and the twelfth; rail dot fills; next card `ANIM.appear` after 500 ms.
   - **Wrong bin**: the card glides back to centre, `tone("nudge")`; `ART.chipRing` pulses around the material swatch (`ANIM.pulse`) — "look at the material"; then the test enacts the truth on the test bar: `ANIM.bend` (the bar curves — drawn as `ART.testBarBent`, an arc, swapped in for 700 ms) or `ANIM.resist` (the bar tilts 3° and springs straight, twice). Attempt 2.
   - **Second wrong bin**: the test again, then the correct bin's icon gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the card there completes the item as solved-with-help.
   - **Test tile tapped before sorting**: the test plays (bend / resist, or press for L2); allowed at any time; the item then counts as "tested", which is neither an error nor first-try for progression (Rules).
   - **Tapping a bin with no card selected**: the bin's icon `ANIM.pop` (preview); nothing else.
4. **L2 (hard / soft, object = ball)**: the bins change to `ART.iconHard` (a press pad on a bar that stays flat) and `ART.iconSoft` (a press pad sunk into a dented bar); the test becomes the PRESS: `ART.pressPad` descends onto the test bar (`ANIM.pressDown`); a soft material's bar squashes (`ANIM.squash`, scaleY 0.55 and back); a hard material's bar does not change and the pad bounces (`ANIM.padBounce`).
5. **L3 (bends / does not bend, object varies per card: strip, spoon, cup, ball)**: same bins as L1; the object glyph changes every card; the material decides.
6. **Finish**: `t("all_done")` (360, 110); the beaver (360, 200) `ANIM.celebrate`; the summary = the four bins used this session in a row at y = 400 (x = 150 / 290 / 430 / 570, 120 × 90) with their icons and final counts, and beneath each the small swatches of the materials that went in (18 px, spaced 22) — what was sorted where; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  beaver:      { kind: "emoji", value: "🦫", size: 80, fallback: "🐿️" },   // Unicode 13 → squirrel fallback
  objStrip:    { kind: "emoji", value: "📏", size: 44 },
  objSpoon:    { kind: "emoji", value: "🥄", size: 44 },
  objCup:      { kind: "emoji", value: "🥤", size: 44 },
  objBall:     { kind: "emoji", value: "⚽", size: 44 },
  matWood:     { kind: "emoji", value: "🪵", size: 40, fallback: "🌳" },    // Unicode 13
  matMetal:    { kind: "emoji", value: "🔩", size: 40 },
  matPlastic:  { kind: "emoji", value: "🧴", size: 40 },
  matGlass:    { kind: "emoji", value: "🥛", size: 40 },
  matPaper:    { kind: "emoji", value: "📄", size: 40 },
  matFabric:   { kind: "emoji", value: "🧶", size: 40 },
  matRubber:   { kind: "emoji", value: "🎈", size: 40 },
  matStone:    { kind: "emoji", value: "🪨", size: 40, fallback: "🧱" },    // Unicode 13
  matSponge:   { kind: "emoji", value: "🧽", size: 40 },
  pressGlyph:  { kind: "emoji", value: "👇", size: 32 },                     // test-tile label
  card:        { kind: "shape", shape: "roundRect", w: 200, h: 150, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  chipRing:    { kind: "shape", shape: "circle", r: 30, stroke: "accent", strokeWidth: 4 },
  testBar:     { kind: "shape", shape: "roundRect", w: 160, h: 18, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 9 },
  testBarBent: { kind: "shape", shape: "arc", r: 120, stroke: "structure", strokeWidth: 18 },   // centre (360, 350), from 250° to 290° — a 160-px-wide upward bow replacing testBar during ANIM.bend
  pressPad:    { kind: "shape", shape: "roundRect", w: 48, h: 22, fill: "structure", radius: 6 },
  testTile:    { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  bin:         { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconBends:   { kind: "shape", shape: "arc", r: 40, stroke: "ink", strokeWidth: 6 },           // from 210° to 330°: a bowed bar
  iconRigid:   { kind: "shape", shape: "rect", w: 64, h: 8, fill: "ink" },                      // plus two 3×10 ink feet at (−28,+9) and (+28,+9)
  iconHard:    { kind: "shape", shape: "rect", w: 64, h: 12, fill: "ink" },                     // with pressPad drawn resting ON it (pad at (0,−17))
  iconSoft:    { kind: "shape", shape: "polygon", points: [[-32,-6],[-10,-6],[0,6],[10,-6],[32,-6],[32,6],[-32,6]], fill: "ink" },   // a dented bar; pad drawn at (0,−4) sunk in
  binCount:    { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every card uses `ART.card` with the same fill; the material is carried by the swatch glyph AND the printed word; bins by icon geometry AND position. Nothing is colour-only.

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "card to a bin / back to centre (x,y at call)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin icon on a correct sort; preview tap" },
  pulse:      { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "chipRing around the material swatch after a wrong bin" },
  bend:       { alpha: 1, duration: 250, ease: "Sine.InOut", yoyo: true, hold: 700, trigger: "testBarBent fades in over testBar (from alpha 0) — the strip bows — then fades out" },
  resist:     { angle: 3, duration: 90, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "testBar of a rigid material: tilts 3° and springs straight, twice" },
  pressDown:  { y: "+=34", duration: 220, ease: "Sine.In", trigger: "pressPad from (360, 200) onto the test bar (L2 hard/soft test)" },
  squash:     { scaleY: 0.55, duration: 200, ease: "Sine.InOut", yoyo: true, hold: 300, trigger: "testBar of a soft material under the pad" },
  padBounce:  { y: "-=24", duration: 160, ease: "Back.Out", yoyo: true, trigger: "pressPad bounces off a hard material; testBar unchanged" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new card; new bin icons on a level change (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish beaver" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  beaver           ┌────────────────┐                          │
      │  (90,150)         │ obj    swatch  │  ART.card (360,150) [test]│  zone A
      │                   │   rubber       │  200×150             test │
      │                   └────────────────┘                (560,150) │
      │                 ════ testBar (360,236) ════                    │
260   ├──────────────────────────────────────────────────────────────┤
      │                    "Which bin?" (360,296)                      │
      │      ┌──────────────┐            ┌──────────────┐  bins y=380  │  zone B
      │      │  ⌒ bends  0  │            │  ▬ rigid   0 │  x=230/490   │
      │      └──────────────┘            └──────────────┘  (200×120)   │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. (The diagram's ⌒ / ▬ / [test] stand for `ART.iconBends`, `ART.iconRigid` and the `ART.testTile` labelled with `ART.pressGlyph` — the build draws ART entries, never characters.)

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.beaver` (90, 150). Card: `makeTile` 200 × 150 (`ART.card` tokens) at (360, 150); object glyph at (−40, −30); material swatch at (+40, −30); material word at (0, +26), 26 px `THEME.font.body` `THEME.colour.ink`, wordWrap 180, max 2 lines (Finnish/German words fit: longest "pesusieni" / "Schwamm").
- `ART.testBar` at (360, 236) with three 18-px copies of the current swatch glyph at x offsets −48 / 0 / +48; `ART.testBarBent` at the same place during `ANIM.bend`; `ART.pressPad` parked at (360, 200) alpha 0 until an L2 test; `ART.chipRing` around the swatch.
- Test tile: `makeTile` 64 × 64 (`ART.testTile` tokens) at (560, 150), label `ART.pressGlyph`.
- Bins: `makeTile` 200 × 120 (`ART.bin` tokens) at (230, 380) and (490, 380); icon centred at (0, −18); `ART.binCount` at (0, +38). Bin order left/right shuffled per LEVEL (not per item — bins are stable within a level so the child can learn them); at a level change the new icons `ANIM.appear`.
- `ART.showRing` around the correct bin. Tap floors: card 200 × 150, test tile 64, bins 200 × 120 (≥ 56). Gaps ≥ 60.
- Tab order: card, test tile, left bin, right bin.

## Content
The mechanic and the truth table are universal; only the material WORDS vary by language (`LOCALE_DATA[lang].material`). All 11 codes:

| key | en | de | fr | it | es | pt | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| wood | wood | Holz | bois | legno | madera | madeira | hout | trä | træ | tre | puu |
| metal | metal | Metall | métal | metallo | metal | metal | metaal | metall | metal | metall | metalli |
| plastic | plastic | Plastik | plastique | plastica | plástico | plástico | plastic | plast | plastik | plast | muovi |
| glass | glass | Glas | verre | vetro | vidrio | vidro | glas | glas | glas | glass | lasi |
| paper | paper | Papier | papier | carta | papel | papel | papier | papper | papir | papir | paperi |
| fabric | fabric | Stoff | tissu | stoffa | tela | tecido | stof | tyg | stof | stoff | kangas |
| rubber | rubber | Gummi | caoutchouc | gomma | goma | borracha | rubber | gummi | gummi | gummi | kumi |
| stone | stone | Stein | pierre | pietra | piedra | pedra | steen | sten | sten | stein | kivi |
| sponge | sponge | Schwamm | éponge | spugna | esponja | esponja | spons | svamp | svamp | svamp | pesusieni |

Object glyph per name: strip `ART.objStrip` · spoon `ART.objSpoon` · cup `ART.objCup` · ball `ART.objBall`. Swatch glyph per key: wood `ART.matWood` · metal `ART.matMetal` · plastic `ART.matPlastic` · glass `ART.matGlass` · paper `ART.matPaper` · fabric `ART.matFabric` · rubber `ART.matRubber` · stone `ART.matStone` · sponge `ART.matSponge`.

Truth table (fixed, language-neutral): **bends** = rubber, paper, fabric, sponge; **does not bend** = wood, metal, glass, stone. **soft** = rubber, fabric, sponge; **hard** = wood, metal, glass, stone, plastic. (Plastic is used only at L2, where hard plastic is unambiguous; it never appears in a bend item.)

Items = (object; material → bin):
- **L1** (object `ART.objStrip`; bins bends / does not bend): (strip; rubber → bends) · (strip; wood → rigid) · (strip; paper → bends) · (strip; metal → rigid) · (strip; fabric → bends) · (strip; glass → rigid) · (strip; sponge → bends) · (strip; stone → rigid)
- **L2** (object `ART.objBall`; bins hard / soft; press test): (ball; rubber → soft) · (ball; wood → hard) · (ball; sponge → soft) · (ball; glass → hard) · (ball; fabric → soft) · (ball; plastic → hard) · (ball; stone → hard) · (ball; metal → hard)
- **L3** (object varies; bins bends / does not bend): (spoon; metal → rigid) · (cup; paper → bends) · (ball; rubber → bends) · (strip; glass → rigid) · (spoon; wood → rigid) · (cup; fabric → bends) · (ball; stone → rigid) · (spoon; sponge → bends) · (cup; glass → rigid) · (strip; fabric → bends)

Play list: 12 items per Rules, shuffled within level; no material repeats twice running; the correct bin is never the same side more than 3 times running (reshuffle the draw if it would be).

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct sorts (no test tile used, no wrong bin) → next level (cap L3). A "tested" item (test tile used before sorting) is neutral: it neither advances nor breaks the streak.
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1); at a level change the bins are re-labelled with `ANIM.appear`.
- What happens on a correct answer: card into the bin, `tone("correct")`, the true test replays once, bin `ANIM.pop`, count +1, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct item and on the twelfth, rail dot, next card after 500 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Sorted by object, not material (L3 especially): card returns, `ART.chipRing` pulses around the swatch, then the material's true test enacts (`ANIM.bend` or `ANIM.resist`).
  - Sorted by look (shiny = hard, fluffy = soft; L2): card returns, chip ring, then the press test enacts (`ANIM.pressDown` + `ANIM.squash` or `ANIM.padBounce`).
  - Rigid material put in "bends" (bends = breaks idea): card returns, the bar tilts and springs straight twice (`ANIM.resist`), whole.
  - Bending material put in "does not bend": card returns, the bar bows (`ANIM.bend`).
  - Bin tapped with nothing selected: preview pop only; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the enacted test → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Material Sort"; `whichBin` = "Which bin?". Material names come from `LOCALE_DATA`, not `STRINGS`.

## Sound
`tone("tap")` on selecting the card or pressing the test tile; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 3)` when a bar bends / squashes and `tone("tap", 0)` when it resists / the pad bounces (a higher note for "gives", a lower for "does not give" — the screen shows the same); `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (Question 3 of 12, All done, Play again, Menu, praise change; the material word follows `?lang=` — `?lang=fi` shows "pesusieni" on the sponge card, `?lang=de` "Schwamm").
- [ ] Works at narrow width (400-px iframe: card, test tile, test bar and both bins fully visible).
- [ ] Keyboard operable (Tab: card, test tile, left bin, right bin; Enter selects / tests / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The same object appears on every card within the first level; at the third level the object changes but the bins do not.
- [ ] Putting the wood strip in "bends" makes the bar tilt and spring straight twice; it never breaks.
- [ ] Putting the rubber strip in "does not bend" makes the bar bow upward for a moment.
- [ ] At the hard/soft level the pad drops: the sponge bar squashes, the glass bar does not and the pad bounces.
- [ ] Tapping the test tile before sorting plays the test without counting as a mistake.
- [ ] The coral ring pulses around the material picture, not the object picture, after a wrong bin.
- [ ] Three first-try sorts in a row change the bins to hard/soft with a ball; a wrong bin brings the strip back.
- [ ] Bin counts rise only on correct sorts; the finish screen shows the bins with their counts and swatches and no score.
- [ ] If the log or rock emoji is missing on the device, a tree or a brick appears instead.
- [ ] With `?sound=off` nothing is audible.
