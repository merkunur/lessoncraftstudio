# 197 — Read the Steps

## Identity
- Slug: `read-the-recipe`
- Subject / topic: Literacy / following written instructions — reading three short recipe steps and performing them in the stated order by putting the named ingredients into a bowl
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap an ingredient on the shelf, then tap the bowl; judged per placement)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (an invalid placement is refused and springs back — F-61; a valid one lands). Locale note: the steps are language-bound (F-129; A-15) and are stored in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). Nothing is spoken; the child reads three steps of at most 5 words each. The text on screen is the CONTENT (reading the steps IS the objective, as in game 080); there is no instruction text beyond it (F-42 budget).

## Learning
- Objective: Reads three written recipe steps and carries them out in the order they are written by tapping the named ingredient (the named number of times) and then the bowl, refusing to put in an ingredient before its step.
- Prerequisites: Reads sentences of up to 8 words (games 074-080); reads the number words one to three; knows the pictured foods by name.
- Curriculum links: F-22 (reading short informational texts with comprehension and sequence by 8 in all twelve systems), F-129 (sequencing by salience rather than by the text's order is the anticipated error), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RI.1.3 / RI.2.3 "describe the connection between a series of … steps in technical procedures in a text"; England Y2 "non-fiction … instructions"; Germany Klasse 2 "Anleitungen lesen und umsetzen"; France CP-CE1 "lire une recette, une notice"; Netherlands groep 4 "instructieteksten"; Spain 1º ciclo "textos instructivos"; Brazil EF12LP17 "textos injuntivos: receitas"; Sweden åk 1-3 "instruerande texter"; Finland 1.-2. luokka "ohjetekstit"). Demand: F-6 (comprehension is a curriculum-weighted niche); recipes are the classic instruction text in every one of these systems.
- Common misconceptions (F-129, F-125, F-101), each with this game's response:
  1. **Sequencing by salience — puts in the favourite or the most striking ingredient first, not the one the first step names.** Response: the bowl REFUSES an ingredient whose step has not come (the tile springs back, `ANIM.nudge`, no message — F-61) and the CURRENT step's card glows (`ART.stepGlow`, `ANIM.glow`) for 1200 ms — "read this one". On the second refusal for the same step the ingredient word in that step is underlined (`ART.wordMark`) and the matching shelf tile gains `ART.hintRing`.
  2. **Reads the picture, not the number — puts in one egg when the step says two (F-125 guessing from the picture).** Response: the bowl shows what it holds as a row of small pictures (`ART.bowlItem`), and the step is not complete until the named count is in; after a placement that leaves the count short, the number word in the step is underlined for 1200 ms and the step stays current; one extra tap of the same ingredient is what the child needs, and the bowl ACCEPTS it (it is the same step). A tap beyond the named count is refused (springs back) and the number word underlines again.
  3. **Skips a step (jumps from step 1 to step 3).** Response: the same refusal — the bowl accepts only the current step's ingredient; the current step glows. The step order is enforced by the bowl, never by a verdict.
  4. **Adds an ingredient that is on the shelf but in no step (L3 distractor).** Response: refused with no message; the tile springs back; the current step glows. Nothing is said about the distractor — the recipe's length IS the recipe.
  5. **Taps the bowl first, or taps two ingredients in a row.** Response: tapping the bowl with nothing selected makes the current step glow (a harmless preview); tapping a second ingredient before the bowl switches the selection (P2 standard).

## How it plays
1. **Start screen**: title "Read the Steps", the bear cook (`ART.bear`) at (360, 200), Start, picker.
2. **Item 1 (L1: steps "First, put in the egg." / "Then add the milk." / "Last, add the honey.")**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the recipe card (`ART.recipeCard`, 400 × 170) at (250, 160) with the three steps as three step cards inside it (`ART.stepCard`, 370 × 44) at y = 116 / 160 / 204, each with its step numeral (`ART.stepNum` "1", "2", "3", 18 px) at the left and the step text at 22 px `THEME.font.body` `THEME.colour.ink`; step 1 carries `ART.stepPointer` (a small coral triangle at its left edge) to mark the current step. The bowl (`ART.bowl`, 200 × 130) at (560, 170) with the spoon (`ART.spoon`) resting on its rim at (620, 110); inside the bowl a row for what it holds (empty at first). The bear stands at (560, 60) at 44 px. Zone B: the shelf (`ART.shelf`, 660 × 120) at (360, 380) holding five ingredient tiles (`ART.ingredientTile`, 96 × 96) at x = 144 / 252 / 360 / 468 / 576, y = 380, each showing one food picture at 56 px (`ART.picEgg`, `ART.picMilk`, `ART.picHoney`, `ART.picApple`, `ART.picCheese`), positions shuffled. No caption.
3. **Placing**: tap an ingredient (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap the bowl.
   - **Right ingredient for the current step (egg)**: the tile's picture glides (`ANIM.glide`) into the bowl and shrinks (`ANIM.tuck`) onto the bowl's row as `ART.bowlItem`; the shelf tile stays (a step may need it twice); `tone("tap", k)` with k = the count placed for this step; when the step's named count is reached the step card takes the done look (`ART.stepDone` tokens, `ANIM.pop`) and `ART.stepPointer` glides to the next step; when all three steps are done the spoon stirs (`ANIM.stir`, three turns), the bowl `ANIM.bob`, `tone("correct")`, praise pop (only if no refusal), the bear `ANIM.wave`; rail dot fills; next recipe after 900 ms (`ANIM.appear`).
   - **Wrong ingredient (milk before egg — salience, skipping, or a distractor)**: the tile springs back to its shelf spot (`ANIM.glide`, `ANIM.nudge`), `tone("nudge")`, and the current step card `ANIM.glow`s for 1200 ms. The item counts as retried.
   - **Right ingredient, count short (one egg placed, step says two)**: the egg lands; the number word in the step is underlined (`ART.wordMark`) for 1200 ms; the step stays current; the pointer does not move.
   - **Right ingredient, count exceeded (a third egg)**: springs back, number word underlined, `tone("nudge")`; counts as retried.
   - **Second refusal for the same step**: the glow again, plus `ART.wordMark` under the ingredient word in the step and `ART.hintRing` (`ANIM.showMe`) on the correct shelf tile until it is used; the item is solved-with-help from here.
   - **Bowl tapped with nothing selected**: the current step `ANIM.glow`s; not an attempt.
4. **Items 2-10**: L1 three steps with order words (First / Then / Last), one of each ingredient, five tiles; L2 three steps where one step names a count of two or three ("Put in two eggs."), five tiles; L3 three steps WITHOUT order words (the reading order is the order), one counted step, and six tiles including one distractor named in no step.
5. **Re-queue** (F-41): an item with any refusal re-enters after 2 intervening items with a fresh shelf shuffle; the count stays 10.
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate`; the summary = the ten finished bowls as small bowls (`ART.bowlMini`, 96 × 60) in two rows of five from y = 330 (x = 152 + i × 104, rows 60 px apart) each showing its ingredients as 18 px pictures in order — the recipes the child followed — with `ART.dotFull` under first-try bowls and `ART.dotEmpty` under helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  bear:           { kind: "emoji", value: "🐻", size: 80 },                   // the cook / mascot
  spoon:          { kind: "emoji", value: "🥄", size: 40 },                   // rests on the bowl; stirs on completion
  recipeCard:     { kind: "shape", shape: "roundRect", w: 400, h: 170, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  stepCard:       { kind: "shape", shape: "roundRect", w: 370, h: 44, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 8 },
  stepDone:       { kind: "shape", shape: "roundRect", w: 370, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  stepGlow:       { kind: "shape", shape: "roundRect", w: 382, h: 54, fill: "accent", radius: 10 },   // behind the current step at alpha 0 → 0.35 → 0
  stepNum:        { kind: "text",  value: "", size: 18, font: "display", color: "structure" },
  stepPointer:    { kind: "shape", shape: "polygon", points: [[0, -10], [14, 0], [0, 10]], fill: "accent" },   // at the current step's left edge
  wordMark:       { kind: "shape", shape: "rect", w: 40, h: 4, fill: "accent" },                             // width = the word's width at runtime
  bowl:           { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 40 },   // radius 40 gives a bowl silhouette; top corners are drawn with radius 8 (two overlapping roundRects) if the build can, else the same radius everywhere
  bowlItem:       { kind: "text",  value: "", size: 32, font: "body", color: "ink" },   // value = an ingredient emoji read through ART at runtime; up to 5 in a row
  bowlMini:       { kind: "shape", shape: "roundRect", w: 96, h: 60, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 18 },
  shelf:          { kind: "shape", shape: "roundRect", w: 660, h: 120, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },
  ingredientTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // food picture 56 px
  hintRing:       { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:       { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:        { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // ingredients (English name in the comment; the step text uses these names)
  picEgg:         { kind: "emoji", value: "🥚", size: 56 },   // egg
  picMilk:        { kind: "emoji", value: "🥛", size: 56 },   // milk
  picHoney:       { kind: "emoji", value: "🍯", size: 56 },   // honey
  picApple:       { kind: "emoji", value: "🍎", size: 56 },   // apple
  picBanana:      { kind: "emoji", value: "🍌", size: 56 },   // banana
  picCheese:      { kind: "emoji", value: "🧀", size: 56 },   // cheese
  picButter:      { kind: "emoji", value: "🧈", size: 56, fallback: "🧀" },   // butter (Unicode 13 → cheese fallback; the fallback shares no item with butter in any step)
  picStrawberry:  { kind: "emoji", value: "🍓", size: 56 },   // strawberry
  picCarrot:      { kind: "emoji", value: "🥕", size: 56 },   // carrot
  picLemon:       { kind: "emoji", value: "🍋", size: 56 },   // lemon
  picTomato:      { kind: "emoji", value: "🍅", size: 56 },   // tomato
  picBread:       { kind: "emoji", value: "🍞", size: 56 },   // bread
  picNut:         { kind: "emoji", value: "🥜", size: 56 },   // nut
  picCorn:        { kind: "emoji", value: "🌽", size: 56 },   // corn
  picPotato:      { kind: "emoji", value: "🥔", size: 56 },   // potato
  picChocolate:   { kind: "emoji", value: "🍫", size: 56 },   // chocolate
  picSalt:        { kind: "emoji", value: "🧂", size: 56 }    // salt (Unicode 11)
};
```
`picButter` is Unicode 13 and carries a fallback; the recipe that uses butter never also uses cheese (Content), so the fallback cannot make two shelf tiles look alike. Everything else is Unicode 11 or older.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "ingredient selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "ingredient picture to the bowl / tile springing back to its shelf spot (x,y at call)" },
  tuck:      { scale: 0.55, duration: 200, ease: "Sine.In", trigger: "the picture shrinking as it lands on the bowl's row" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused ingredient after it springs back" },
  glow:      { alpha: 0.35, duration: 250, ease: "Sine.Out", yoyo: true, hold: 700, trigger: "stepGlow behind the current step (from alpha 0)" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "wordMark under a number word or ingredient word (from alpha 0)" },
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a step card when its step completes" },
  pointer:   { duration: 260, ease: "Sine.InOut", trigger: "stepPointer to the next step's y (y at call)" },
  stir:      { angle: 360, duration: 900, ease: "Sine.InOut", repeat: 2, trigger: "spoon on completion, pivot at its handle end" },
  bob:       { y: "-=10", duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "bowl on completion" },
  wave:      { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "bear on completion" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct shelf tile (from alpha 0.2)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new recipe, bowl row and shelf (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```
Implementation note: each step's text is drawn as one text object per WORD (22 px, 7 px word gaps) so `ART.wordMark` can sit under the number word or the ingredient word; `LOCALE_DATA` names those word indices per step.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────────────────────────────┐        bear (560,60)    │
      │  │ >1 First, put in the egg.  y=116 │      spoon (620,110)    │  zone A
      │  │  2 Then add the milk.      y=160 │   ╭──────────────╮      │
      │  │  3 Last, add the honey.    y=204 │   │  bowl (560,170) │    │
      │  └──────────────────────────────────┘   ╰──────────────╯      │
      │        recipe card (250,160) 400×170        200×130           │
260   ├──────────────────────────────────────────────────────────────┤
      │  ┌────────────────────────────────────────────────────────┐  │
      │  │  [egg]   [milk]  [honey]  [apple] [cheese]  y=380      │  │  zone B
      │  │ x=144    x=252    x=360    x=468   x=576  (96×96)      │  │
      │  └────────────────────────────────────────────────────────┘  │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Six tiles (L3): x = 110 / 210 / 310 / 410 / 510 / 610. Fixed layout, FIT scaling. ">" = `ART.stepPointer`.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.recipeCard` at (250, 160); `ART.stepCard`s at (250, 116 / 160 / 204) with `ART.stepNum` at x = 84 and the text from x = 104, 22 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 320 (5 English words ≈ 150 px; a 1.6× locale fits on one line; a step that still wraps drops to 18 px — never two lines); `ART.stepPointer` at (66, current step y); `ART.stepGlow` behind the current step; done steps switch to `ART.stepDone` tokens.
- `ART.bowl` at (560, 170); `ART.spoon` at (620, 110), angle −30; `ART.bowlItem`s in a row inside the bowl at y = 185, 34 px pitch, centred; `ART.bear` at (560, 60) at 44 px.
- `ART.shelf` at (360, 380); ingredient tiles are `makeTile` 96 × 96 with `ART.ingredientTile` tokens and the food picture (56 px) read through `ART[picKey].value`; the bowl is a `makeTile` 200 × 130 (transparent fill over `ART.bowl`) so it is keyboard-reachable. `ART.hintRing` behind a shelf tile.
- Tap floors: tiles 96, bowl 200 × 130 (≥ 56); gaps ≥ 12 (six tiles at pitch 100 → 4 px gap is too small, so six-tile shelves use 88 × 88 tiles at pitch 100 → 12 px gap).
- Keyboard: Tab walks the shelf tiles left to right, then the bowl; Enter selects / places.

## Content
Recipes are language-bound. `LOCALE_DATA[lang].items` = per level an array of `{ steps: [{ text: "First, put in the egg.", pic: <ART key>, count: 1, numberWordIndex: null, ingredientWordIndex: 4 }, …], shelf: [<ART key>, …] }`; `shelf` lists every tile (the three step ingredients plus fillers; at L3 one filler is a distractor named in no step). English is authored in full. **Other locales: a native set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: ≤ 5 words per step; the locale's own order words at L1-L2 (de zuerst / dann / zuletzt; fr d'abord / ensuite / enfin …) and none at L3; the number words one / two / three in the locale; word indices per step.

**en** — steps (count) · shelf:
- **L1** (order words; one of each; five tiles):
  1. First, put in the egg. (1) · Then add the milk. (1) · Last, add the honey. (1) — shelf `ART.picEgg`, `ART.picMilk`, `ART.picHoney`, `ART.picApple`, `ART.picCheese`
  2. First, put in the banana. · Then add the milk. · Last, add the honey. — shelf `ART.picBanana`, `ART.picMilk`, `ART.picHoney`, `ART.picEgg`, `ART.picStrawberry`
  3. First, put in the bread. · Then add the cheese. · Last, add the tomato. — shelf `ART.picBread`, `ART.picCheese`, `ART.picTomato`, `ART.picApple`, `ART.picCarrot`
  4. First, put in the apple. · Then add the nut. · Last, add the honey. — shelf `ART.picApple`, `ART.picNut`, `ART.picHoney`, `ART.picLemon`, `ART.picMilk`
  5. First, put in the carrot. · Then add the potato. · Last, add the salt. — shelf `ART.picCarrot`, `ART.picPotato`, `ART.picSalt`, `ART.picCorn`, `ART.picTomato`
- **L2** (one counted step; five tiles):
  6. First, put in two eggs. (2) · Then add the milk. · Last, add the butter. — shelf `ART.picEgg`, `ART.picMilk`, `ART.picButter`, `ART.picHoney`, `ART.picApple`
  7. First, put in the milk. · Then add three strawberries. (3) · Last, add the honey. — shelf `ART.picMilk`, `ART.picStrawberry`, `ART.picHoney`, `ART.picBanana`, `ART.picLemon`
  8. First, put in two bananas. (2) · Then add the chocolate. · Last, add the nut. — shelf `ART.picBanana`, `ART.picChocolate`, `ART.picNut`, `ART.picMilk`, `ART.picEgg`
  9. First, put in the corn. · Then add two tomatoes. (2) · Last, add the salt. — shelf `ART.picCorn`, `ART.picTomato`, `ART.picSalt`, `ART.picPotato`, `ART.picCarrot`
  10. First, put in the bread. · Then add the butter. · Last, add three eggs. (3) — shelf `ART.picBread`, `ART.picButter`, `ART.picEgg`, `ART.picMilk`, `ART.picHoney`
- **L3** (no order words; one counted step; six tiles with one distractor):
  11. Put in two apples. (2) · Add the honey. · Add the nut. — shelf `ART.picApple`, `ART.picHoney`, `ART.picNut`, `ART.picLemon`, `ART.picBanana`, `ART.picMilk` (distractor: any tile in no step)
  12. Put in the potato. · Add the carrot. · Add two eggs. (2) — shelf `ART.picPotato`, `ART.picCarrot`, `ART.picEgg`, `ART.picSalt`, `ART.picCorn`, `ART.picTomato`
  13. Put in three strawberries. (3) · Add the milk. · Add the honey. — shelf `ART.picStrawberry`, `ART.picMilk`, `ART.picHoney`, `ART.picBanana`, `ART.picChocolate`, `ART.picEgg`
  14. Put in the bread. · Add two tomatoes. (2) · Add the cheese. — shelf `ART.picBread`, `ART.picTomato`, `ART.picCheese`, `ART.picLemon`, `ART.picCorn`, `ART.picSalt`
  15. Put in the lemon. · Add the honey. · Add two bananas. (2) — shelf `ART.picLemon`, `ART.picHoney`, `ART.picBanana`, `ART.picApple`, `ART.picNut`, `ART.picMilk`
- No recipe uses both butter and cheese (the butter fallback rule). Every step ≤ 5 words.

Play list: 10 items per Rules; shuffled within level; no recipe repeats except by re-queue; shelf positions shuffled per item.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed without a refusal → next level (cap L3).
- Adaptation: an item with a refusal, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each right placement lands with `tone("tap", k)`; a completed step takes the done look with `ANIM.pop` and the pointer moves; on the third step `ANIM.stir` + `ANIM.bob`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item without a refusal, bear `ANIM.wave`, rail dot, next recipe after 900 ms.
- What happens on a wrong answer:
  - Ingredient of a later step (salience / skipping): springs back, `ANIM.nudge`, `tone("nudge")`, the current step `ANIM.glow`s 1200 ms.
  - Distractor ingredient (L3): the same refusal; nothing else.
  - Count short after a placement: the number word underlined 1200 ms; the step stays current (not a refusal — the child continues).
  - Count exceeded: springs back, number word underlined, `tone("nudge")`.
  - Second refusal on the same step: the glow again + `ART.wordMark` under the ingredient word + `ART.hintRing` on the correct shelf tile until used (solved-with-help).
- Retry behaviour: per step: attempt 1 → attempt 2 after the glow → the ringed tile (no attempt 4). A placed ingredient cannot be taken out (a real bowl); the recipe always completes.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Read the Steps". The steps are content from `LOCALE_DATA`; there is no instruction string on the play screen.

## Sound
`tone("tap")` on selecting an ingredient; `tone("tap", k)` on the k-th placement of a step; `tone("nudge")` on a refusal; `tone("correct")` when the bowl completes; `tone("finish")` once. Silent under `?sound=off`. The steps are never read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=fr` plays the English steps until a French set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: recipe card with three steps, bowl and a six-tile shelf visible; no step wraps to two lines).
- [ ] Keyboard operable (Tab across the shelf tiles then the bowl; Enter selects / places).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refusals still ends with a full bowl; the hint ring always names the tile).
- [ ] Tapping the milk then the bowl while step 1 says "egg" springs the milk back to the shelf and lights step 1 for about a second; no message appears.
- [ ] Tapping the egg then the bowl puts a small egg in the bowl, marks step 1 done and moves the pointer to step 2.
- [ ] For "Put in two eggs.", one egg leaves the step open with "two" underlined; a second egg completes it; a third springs back.
- [ ] At the third level the shelf has six tiles and the one named in no step always springs back.
- [ ] Tapping the bowl with nothing selected only lights the current step.
- [ ] Two clean recipes in a row bring a counted step; a refusal brings an easier recipe next.
- [ ] Completing the third step makes the spoon stir and the bowl bob.
- [ ] If the butter emoji is missing on the device a cheese appears instead, and no recipe with butter also has cheese.
- [ ] The finish screen shows ten small bowls with their ingredients and filled/hollow dots, no score.
- [ ] With `?sound=off` nothing is audible.
