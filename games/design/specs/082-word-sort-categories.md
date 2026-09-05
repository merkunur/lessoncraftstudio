# 082 — Category Baskets

## Identity
- Slug: `word-sort-categories`
- Subject / topic: Literacy / vocabulary — sorting pictured everyday objects into two category baskets (animals vs food; clothes vs toys; fruit vs vegetables)
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the item, then tap a basket; two baskets, one item at a time)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Locale note: content is **language-neutral** — pictures only, no words on the play screen; the category is shown by two member pictures on each basket, never by a word. The category names in this spec (animal, food, clothes, toy, fruit, vegetable) are for the builder and the reviewer, never rendered. No `LOCALE_DATA` is needed (F-7: sorting/classifying transfers to all 11 languages unchanged; F-22: vocabulary categories are taught at 5-7 everywhere).

## Learning
- Objective: Sorts a pictured object into the basket whose two pictured members belong to the same everyday category (animals / food / clothes / toys / fruit / vegetables), including objects that look like, or are used with, members of the other basket.
- Prerequisites: Recognises everyday objects in pictures; taps. No reading; no letter knowledge.
- Curriculum links: F-1 (sorting/classifying in 7 of 15 sources; vocabulary in 3), F-22 (vocabulary and "words for things" in every system's early-literacy strand at 5-7), F-31 row "Sort by attribute; repeating patterns" — conservative 6-7, earliest 4 → 5-6 (US L.K.5.a "sort common objects into categories … to gain a sense of the concepts the categories represent"; England Reception ELG "Speaking: use new vocabulary"; Germany Klasse 1 "Wortschatz: Oberbegriffe"; France GS "catégoriser: animaux, aliments, vêtements"; Netherlands groep 1-2 "woordenschat: categoriseren"; Spain Infantil "clasificar objetos"; Brazil EI03EF "agrupar por semelhanças"; Sweden förskoleklass; Finland esiopetus "käsitteet"). F-215: sorting is in the age-5 pre-academic core.
- Common misconceptions (F-131, F-115, F-103 — the sorting-by-the-wrong-feature family), each with this game's response:
  1. **Thematic grouping instead of category ("the egg goes with the hen", "the carrot goes with the rabbit").** Response: after the item glides back, the correct basket shows its family: three member pictures rise out of it (`ANIM.peek`) and hover for 1200 ms (the egg's family = cheese, bread, banana), then the basket's two label pictures pulse (`ANIM.pulse`). Belonging is shown by company, not by a word.
  2. **Perceptual sorting — by colour or shape (the yellow corn with the yellow banana).** Response: L3 deliberately pairs each vegetable with a same-colour fruit; the three peek members are always three DIFFERENT colours (the table in Content fixes them), so colour is visibly not what the basket collects.
  3. **Look-alike category ("a chicken leg is an animal", "a fish is food").** Response: trap items (flagged in Content) get, after the peek, the sit-with cue: the item itself glides to the correct basket's front and parks between the peeked members for 900 ms (`ANIM.sitWith`) before returning to the belt — the child sees it in its family.
  4. **Position habit — always the same basket.** Response: the two baskets swap sides at every level change (`ANIM.swapSides`), the stream never sends more than two consecutive items to the same basket, and after two wrong taps the show-me ring identifies the basket.

## How it plays
1. **Start screen**: title "Category Baskets", the squirrel (`ART.squirrel`) at (360, 200) between two small baskets (`ART.basket` at 48 px at (290, 250) and (430, 250)), Start, picker.
2. **Round 1 (L1: animals vs food)**: rail of 10 dots (§6). Zone A: a belt (`ART.belt`) across zone A at y = 170 with the squirrel at its left end (80, 170); the first item slides in from the right (`ANIM.slideIn`) to (360, 170) as a `makeTile` 120 × 120 (transparent fill, the item picture at 72 px inside — `ART.cow` for the first item). Zone B: two baskets (`ART.basketTile`, 200 × 140, `makeTile`) at y = 380, x = 220 and 500. Each basket shows `ART.basket` at 56 px at its top and its two label pictures at 30 px below: the left basket `ART.dog` + `ART.cat` (animals), the right basket `ART.apple` + `ART.bread` (food). No caption; no words anywhere.
3. **Sorting**: tap the item (it lifts, `ANIM.lift`, `tone("tap")`), then tap a basket. The item glides (`ANIM.glide`) into the basket.
   - **Correct basket**: the basket `ANIM.pop`s, `tone("correct")`, and a small copy of the item (22 px) is added to the basket's collected row (`ART.collectedRow` slots along the basket's bottom edge, up to 6, left to right) — the live progress and the finish summary; every third correct sort plays a praise pop; the rail dot fills; the next item slides in after 400 ms.
   - **Wrong basket**: the item glides back to (360, 170), `tone("nudge")`; the family peek from the correct basket (`ANIM.peek`), then the correct basket's label pictures `ANIM.pulse`; for a trap item the sit-with cue follows. Attempt 2.
   - **Second wrong basket**: the peek again, then the correct basket gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the item there completes the item as solved-with-help.
   - Tapping a basket with no item selected: its two label pictures `ANIM.pop` (a harmless preview of what it takes).
4. **Rounds**: 10 items per session. L1 animals vs food (categories far apart; two trap items: fish, chicken leg); L2 clothes vs toys (both "things a child owns"); L3 fruit vs vegetables (both food — a split inside a category; each vegetable colour-matched to a fruit). At a level change the baskets' labels change and the baskets swap sides (`ANIM.swapSides`); the collected rows stay on the baskets they were sorted into (a basket keeps its old row until the finish).
5. **Finish**: `t("all_done")` (360, 110); the squirrel (360, 200) `ANIM.celebrate`; the summary = the two baskets (at x = 220 and 500, y = 400) each showing its collected row of small pictures — everything the child sorted, grouped as they sorted it; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  squirrel:    { kind: "emoji", value: "🐿", size: 80 },
  basket:      { kind: "emoji", value: "🧺", size: 56 },                     // Unicode 11
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  basketTile:  { kind: "shape", shape: "roundRect", w: 200, h: 140, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  collectedRow:{ kind: "shape", shape: "roundRect", w: 180, h: 28, fill: "surface2", radius: 8 },   // along the basket's bottom edge; holds up to 6 copies at 22 px, pitch 28
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 152, stroke: "structure", strokeWidth: 4, radius: 20 },
  // L1 labels + stream — animals
  dog:         { kind: "emoji", value: "🐶", size: 30 },   // label: animals
  cat:         { kind: "emoji", value: "🐱", size: 30 },   // label: animals
  cow:         { kind: "emoji", value: "🐄", size: 72 },
  frog:        { kind: "emoji", value: "🐸", size: 72 },
  hen:         { kind: "emoji", value: "🐔", size: 72 },
  horse:       { kind: "emoji", value: "🐴", size: 72 },
  pig:         { kind: "emoji", value: "🐷", size: 72 },
  fish:        { kind: "emoji", value: "🐟", size: 72 },   // trap: an animal that is also eaten
  // L1 labels + stream — food
  apple:       { kind: "emoji", value: "🍎", size: 30 },   // label: food (L1) and fruit (L3)
  bread:       { kind: "emoji", value: "🍞", size: 30 },   // label: food
  cheese:      { kind: "emoji", value: "🧀", size: 72 },
  carrot:      { kind: "emoji", value: "🥕", size: 72 },   // stream (L1) and label: vegetables (L3)
  banana:      { kind: "emoji", value: "🍌", size: 72 },   // stream (L1) and label: fruit (L3)
  egg:         { kind: "emoji", value: "🥚", size: 72 },   // trap: comes from a hen
  chickenLeg:  { kind: "emoji", value: "🍗", size: 72 },   // trap: food that looks like part of an animal
  grapes:      { kind: "emoji", value: "🍇", size: 72 },
  // L2 labels + stream — clothes
  shirt:       { kind: "emoji", value: "👕", size: 30 },   // label: clothes
  shoe:        { kind: "emoji", value: "👟", size: 30 },   // label: clothes
  trousers:    { kind: "emoji", value: "👖", size: 72 },
  socks:       { kind: "emoji", value: "🧦", size: 72 },
  cap:         { kind: "emoji", value: "🧢", size: 72 },
  coat:        { kind: "emoji", value: "🧥", size: 72 },
  gloves:      { kind: "emoji", value: "🧤", size: 72 },
  dress:       { kind: "emoji", value: "👗", size: 72 },
  // L2 labels + stream — toys
  teddy:       { kind: "emoji", value: "🧸", size: 30 },   // label: toys (Unicode 11)
  ball:        { kind: "emoji", value: "⚽", size: 30 },   // label: toys
  kite:        { kind: "emoji", value: "🪁", size: 72 },   // Unicode 12
  balloon:     { kind: "emoji", value: "🎈", size: 72 },
  puzzle:      { kind: "emoji", value: "🧩", size: 72 },
  drum:        { kind: "emoji", value: "🥁", size: 72 },
  yoyo:        { kind: "emoji", value: "🪀", size: 72 },   // Unicode 12
  dice:        { kind: "emoji", value: "🎲", size: 72 },
  // L3 stream — fruit (labels: apple, banana)
  strawberry:  { kind: "emoji", value: "🍓", size: 72 },
  pear:        { kind: "emoji", value: "🍐", size: 72 },
  watermelon:  { kind: "emoji", value: "🍉", size: 72 },
  lemon:       { kind: "emoji", value: "🍋", size: 72 },
  cherries:    { kind: "emoji", value: "🍒", size: 72 },
  // L3 labels + stream — vegetables
  broccoli:    { kind: "emoji", value: "🥦", size: 30 },   // label: vegetables
  corn:        { kind: "emoji", value: "🌽", size: 72 },   // colour-matched to banana / lemon
  cucumber:    { kind: "emoji", value: "🥒", size: 72 },   // colour-matched to pear
  potato:      { kind: "emoji", value: "🥔", size: 72 },
  aubergine:   { kind: "emoji", value: "🍆", size: 72 },   // colour-matched to grapes
  onion:       { kind: "emoji", value: "🧅", size: 72 },   // Unicode 12
  garlic:      { kind: "emoji", value: "🧄", size: 72 },   // Unicode 12
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every picture is drawn through `draw(scene, key, x, y, { size })`: 72 px on the belt, 30 px as a basket label, 32 px in a family peek, 22 px in a collected row. No entry is newer than Unicode 12, so no fallbacks are needed.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new item from x = 760 to the belt centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "item selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "item to a basket / back to the belt centre (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "basket receiving a correct item; label pictures on an empty-handed basket tap" },
  peek:      { y: "-=70", alpha: 1, duration: 320, ease: "Back.Out", yoyo: true, hold: 1200, trigger: "three family members rise out of the correct basket (from its centre, alpha 0) and sink back" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct basket's two label pictures after the peek" },
  sitWith:   { duration: 300, ease: "Sine.InOut", trigger: "a trap item glides to the correct basket's front (x = basket x, y = 300), holds 900 ms, glides back (x,y set at call)" },
  swapSides: { duration: 400, ease: "Sine.InOut", trigger: "both baskets exchange x at a level change (x set at call)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct basket (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ squirrel(80,170) ═══════════ belt y=170 ══════════  item enters→│  zone A
      │                          [ item (360,170) 120×120 ]           │
      │                    peek members hover at y=300 (zone B top)   │
260   ├──────────────────────────────────────────────────────────────┤
      │     ┌──────────┐                     ┌──────────┐            │
      │     │  basket  │  (220,380)          │  basket  │ (500,380)  │  zone B
      │     │ dog  cat │  200×140            │apple bread│           │
      │     │ ······  │  collected row       │ ······  │            │
      │     └──────────┘                     └──────────┘            │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Peek members hover at y = 300 above their basket (x = basket x − 44 / basket x / basket x + 44).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`.
- `ART.squirrel` at (80, 170); `ART.belt` centred (390, 170).
- The item: a `makeTile` 120 × 120 at (360, 170) with fill and stroke passed as `THEME.colour.bg` tokens (invisible tile); the picture is a child drawn at 72 px. Selected look = `ANIM.lift` + the tile's `selectedStroke` (`THEME.colour.structure`, 3 px) as a rounded square around the picture.
- Baskets: `makeTile` 200 × 140 with `ART.basketTile` tokens at (220, 380) and (500, 380); inside each: `ART.basket` at (0, −34) at 56 px; the two label pictures at (−24, +14) and (+24, +14) at 30 px; `ART.collectedRow` at (0, +52) with copies at 22 px, pitch 28, left-anchored at x = −70.
- Family peek: three member pictures at 32 px rising from the basket's centre to y = 300.
- `ART.showRing` behind the correct basket. Tap floors: item 120, baskets 200 × 140 (≥ 80). Gap between baskets 80.
- Keyboard: Tab order = item, left basket, right basket; Enter selects / places.

## Content
Language-neutral (pictures). Each level names its two baskets by their two LABEL pictures, its stream items by ART key, the three PEEK members per basket (three different colours), and its trap items.

- **L1 — animals vs food**
  - Basket A labels `ART.dog` + `ART.cat`; peek members `ART.cow`, `ART.frog`, `ART.pig`.
  - Basket B labels `ART.apple` + `ART.bread`; peek members `ART.cheese`, `ART.carrot`, `ART.grapes`.
  - Stream (12): animals `ART.cow`, `ART.frog`, `ART.hen`, `ART.horse`, `ART.pig`, `ART.fish` (trap) · food `ART.cheese`, `ART.carrot`, `ART.banana`, `ART.egg` (trap), `ART.chickenLeg` (trap), `ART.grapes`.
- **L2 — clothes vs toys**
  - Basket A labels `ART.shirt` + `ART.shoe`; peek members `ART.trousers`, `ART.coat`, `ART.socks`.
  - Basket B labels `ART.teddy` + `ART.ball`; peek members `ART.balloon`, `ART.puzzle`, `ART.drum`.
  - Stream (12): clothes `ART.trousers`, `ART.socks`, `ART.cap`, `ART.coat`, `ART.gloves`, `ART.dress` · toys `ART.kite`, `ART.balloon`, `ART.puzzle`, `ART.drum`, `ART.yoyo`, `ART.dice`. No traps; the difficulty is that both categories are "things a child owns".
- **L3 — fruit vs vegetables (a split inside food)**
  - Basket A labels `ART.apple` + `ART.banana`; peek members `ART.strawberry`, `ART.pear`, `ART.grapes` (red, green, purple).
  - Basket B labels `ART.carrot` + `ART.broccoli`; peek members `ART.corn`, `ART.aubergine`, `ART.potato` (yellow, purple, brown).
  - Stream (12): fruit `ART.grapes`, `ART.strawberry`, `ART.pear`, `ART.watermelon`, `ART.lemon`, `ART.cherries` · vegetables `ART.corn` (colour trap: yellow like lemon), `ART.cucumber` (colour trap: green like pear), `ART.potato`, `ART.aubergine` (colour trap: purple like grapes), `ART.onion`, `ART.garlic`.

Stream rule: at each level the 12 items are shuffled and dealt in order; a trap item is never the first item of its level; no more than two consecutive items belong to the same basket (re-deal if violated). Ten items per session in total, taken from the current level's remaining stream as Rules move the level. Basket sides: L1 A left / B right; each level change swaps sides (so the child cannot keep tapping "the left one"); the peek members for a basket are never the current item.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three, not two: items take ~10-15 s.)
- Adaptation: a wrong basket, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a level change always swaps the basket sides and relabels them.
- What happens on a correct answer: item glides in, basket `ANIM.pop`, `tone("correct")`, a small copy joins the collected row; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct item and on the tenth; rail dot; next item in 400 ms.
- What happens on a wrong answer (per anticipated mistake; each begins with the item gliding back and `tone("nudge")`):
  - Thematic pairing (egg → animals; carrot → animals at L1): the family peek from the correct basket, then its labels pulse.
  - Colour/shape sorting (corn → fruit; cucumber → fruit; aubergine → fruit): the peek shows three differently coloured members, then the labels pulse.
  - Look-alike category (chicken leg → animals; fish → food): peek, labels pulse, then the sit-with cue (the item parks among the peeked members for 900 ms).
  - Any other wrong basket: peek + pulse.
  - Basket tapped with nothing selected: its labels pop; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the peek → attempt 3 with the show-me ring on the correct basket; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Category Baskets". No words on the play screen (5-6 band: zero instruction text; the baskets' label pictures are the prompt).

## Sound
`tone("tap")` on selecting the item; `tone("correct")` on a correct basket; `tone("nudge")` on a wrong basket; `tone("tap", k)` (k = 1, 2, 3) as each family member rises in a peek; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the category is never named.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: belt, item and both baskets fully visible; the peek members stay inside the stage).
- [ ] Keyboard operable (Tab: the item, then the left basket, then the right basket; Enter selects the item / drops it in a basket).
- [ ] Never auto-starts.
- [ ] No losing state (wrong baskets never end the session; the show-me ring always leads to completion).
- [ ] Each basket shows two pictures of its kind (dog + cat; apple + bread) and no word.
- [ ] Putting the egg in the animals basket makes cheese, a carrot and grapes rise out of the food basket, then the apple and bread pulse.
- [ ] Putting the chicken leg in the animals basket shows the peek and then parks the chicken leg among the food members before it returns to the belt.
- [ ] After three first-try corrects in a row the baskets change to clothes vs toys and swap sides; a wrong basket brings animals vs food back (swapped again).
- [ ] At the third level the corn put in the fruit basket shows yellow, purple and brown vegetables rising — not three yellow ones.
- [ ] Each correctly sorted item appears as a small picture along the bottom of its basket; the finish screen shows both baskets with their rows and no score.
- [ ] No more than two items in a row go to the same basket.
- [ ] With `?sound=off` nothing is audible.
