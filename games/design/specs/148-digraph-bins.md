# 148 — Digraph Bins

## Identity
- Slug: `digraph-bins`
- Subject / topic: Literacy / digraphs as one sound — sorting pictures into bins labelled by the two-letter sound their name contains (sh / ch / th; then sh against plain s)
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the picture, then tap a bin; two bins, then three; one picture at a time)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (a wrong bin refuses gently and the bin's rule icon pulses; 3rd wrong → the correct bin pulses). Locale note: **nothing is spoken** (no audio files); each item is a PICTURE whose name the child knows (A-15). Digraph inventories are language-bound (F-124: en sh/ch/th, de sch/ch, nl oe/ij/ui, sv sj/tj, fi almost none) — every bin set and word list lives in `LOCALE_DATA`; the mechanic is universal (F-217). The bin label is ONE physical tile carrying both letters (F-124: "a digraph is one physical tile"); it is never two letter tiles side by side.

## Learning
- Objective: Sorts pictures one at a time into the bin whose two-letter tile spells the sound heard in the picture's name (at the start or the end of the word), and at the top level keeps sh-words out of the plain-s bin.
- Prerequisites: Knows single letter-sounds (5-6 letter games) and has met sh/ch/th as sounds (classroom or game 070); knows the pictured objects' names. No reading of whole words.
- Curriculum links: F-22 (letter-sound correspondence and spelling by segmenting sounds at 6-8 in 11 of 12 systems), F-24 (synthetic phonics in EN/US teaches digraphs explicitly in the first year; the Fibel in DE teaches "sch"/"ch"; NL klankzuiver teaches the vowel digraphs), F-31 row "Spell regular words by sounds" — conservative 8, earliest 6 → 6-8 (US RF.K.3.a / RF.1.3.a "know the spelling-sound correspondences for common consonant digraphs"; England Y1 "consonant digraphs sh, ch, th"; Germany Klasse 1 "sch, ch"; France CP "ch, ou"; Netherlands groep 3 "oe, ui, ij"; Sweden åk 1 "sj-ljudet"; Denmark 1. klasse; Norway 1.-2. trinn "skj, kj"; Spain/Italy/Brazil "ch", "gn", "nh"/"lh"; Finland — see the fi note in Content). Demand: F-3 (Phonics 2,225 games).
- Common misconceptions (F-124, F-122, F-126), each with this game's response:
  1. **Splitting the digraph — treating "sh" as s + h, so "ship" belongs with "sun" — F-124.** Response: the bin tile is one piece with a join bar under both letters (`ART.digraphTile` + `ART.joinBar`); on a wrong bin the picture's own sound appears on it as a badge (`ART.soundBadge`) with the same join bar ("sh" as one piece, or "s" alone) while the correct bin's tile `ANIM.pulse`s; L3 puts an "s" bin beside the "sh" bin so the split is tested and answered.
  2. **Only hearing the digraph at the START of a word — "fish" has no sh — F-124.** Response: L1 uses initial position only; L2 mixes initial and final (fish, brush, watch, peach, tooth, mouth); the badge sits at the picture's right edge for a final sound and its left edge for an initial sound (position cue).
  3. **Letter names used as sounds — reading the "ch" tile as "c-h" — F-122.** Response: the tiles are lowercase, joined, and never separated; the preview tap on a bin (nothing selected) pops the tile as one piece; the badge repeats the joined form.
  4. **Matching on meaning or a later sound (cheese into the sh bin because it ends with a hiss; sheep with chick because both are animals) — F-126.** Response: the badge shows the word's ACTUAL digraph, so the child compares tile to badge, not picture to picture; L2 streams include one meaning-decoy pair split across bins (sheep / chick).
  5. **Sorting by bin position — F-65.** Response: bin order shuffles when the level changes; the correct bin never sits in the same position more than 3 items running; counts show every bin filling.

## How it plays
1. **Start screen**: title "Digraph Bins", the otter (`ART.otter`) at (360, 200), Start, picker.
2. **Item 1 (L1: bins sh / ch; first picture: ship)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A: a conveyor strip (`ART.belt`) across y = 160 with the otter at (80, 150); the first picture slides in from the right (`ANIM.slideIn`) to the centre (360, 160) as a `makeTile` 120 × 120 with `ART.picShip` as its label. Caption `S("whichSound")` ("Which sound is in the word?") at (360, 80), 24 px `THEME.colour.inkSoft`. Zone B: two bins (`ART.bin`, 200 × 130) at (220, 390) and (500, 390); on each bin's front its digraph tile (`ART.digraphTile`, 110 × 64) with the letters ("sh" / "ch", 40 px, lowercase) and `ART.joinBar` under both letters, plus a count (`ART.binCount`, "0") in the corner.
3. **Sorting**: tap the picture (it lifts: `ANIM.lift`, `tone("tap")`), then tap a bin. The picture glides (`ANIM.glide`) into the bin.
   - **Correct bin (sh)**: the bin `ANIM.pop`, its count 0 → 1, `tone("correct")`; the picture shrinks into the bin as a small copy (`ART.miniPic`) along the bin's bottom edge; every third correct sort plays a praise pop (rotation); the rail dot fills; the next picture slides in after 400 ms.
   - **Wrong bin (ch)**: the picture glides back to the centre, `tone("nudge")`; `ART.soundBadge` appears on the picture's left edge (initial sound) reading "sh" with `ART.joinBar` under it, for 1200 ms, while the CORRECT bin's digraph tile `ANIM.pulse`s — badge and tile pulse together, one piece each; the wrong bin does nothing. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains `ART.showRing` with `ANIM.showMe` (show-me); placing the picture there completes the item as solved-with-help.
   - **Tapping a bin with nothing selected**: the bin's digraph tile `ANIM.pop`s as one piece (a harmless preview); nothing else.
4. **Level changes**: when the level changes (Rules), the bins `ANIM.binOut` and new bins `ANIM.appear` with the new tiles, order shuffled (three bins at x = 150 / 360 / 570, 180 × 130); counts restart at 0; `tone("tap", 4)`.
5. **Items 2-12**: per Content/Rules. L1 sh / ch, initial only; L2 sh / ch / th, initial and final; L3 sh / s / ch, initial and final, with the s-bin trap.
6. **Finish**: `t("all_done")` (360, 110); the otter (360, 200) `ANIM.celebrate`; the summary = the session's bins in a row at y = 400 (up to 8 as `ART.binMini`, 84 × 70, x from 360 − (n−1) × 46) each showing its tile letters and the small pictures it received along its bottom — the sound families; `t("question_x_of_y", {n: firstTry, total: 12})` at (360, 470) 20 px `inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  otter:       { kind: "emoji", value: "🦦", size: 80 },
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  bin:         { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  binMini:     { kind: "shape", shape: "roundRect", w: 84, h: 70, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  digraphTile: { kind: "shape", shape: "roundRect", w: 110, h: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },   // ONE tile: "sh" 40 px display ink; a plain "s" bin uses the same tile 64 wide
  joinBar:     { kind: "shape", shape: "rect", w: 60, h: 6, fill: "structure" },      // under both letters of a digraph; width 24 under a single letter
  binCount:    { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  soundBadge:  { kind: "shape", shape: "roundRect", w: 72, h: 48, fill: "accent", radius: 10 },   // the word's sound 28 px display, color inkOnAccent, with joinBar (fill bg) beneath
  miniPic:     { kind: "text",  value: "", size: 22, font: "body", color: "ink" },     // value = a picture emoji read through ART at runtime
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English word, digraph and its position in the comment; every name unambiguous)
  picShip:    { kind: "emoji", value: "🚢", size: 72 },   // ship sh initial
  picShop:    { kind: "emoji", value: "🛒", size: 72 },   // shop sh initial
  picSheep:   { kind: "emoji", value: "🐑", size: 72 },   // sheep sh initial
  picShell:   { kind: "emoji", value: "🐚", size: 72 },   // shell sh initial
  picShoe:    { kind: "emoji", value: "👞", size: 72 },   // shoe sh initial
  picShark:   { kind: "emoji", value: "🦈", size: 72 },   // shark sh initial
  picFish:    { kind: "emoji", value: "🐟", size: 72 },   // fish sh final
  picBrush:   { kind: "emoji", value: "🖌️", size: 72 },   // brush sh final
  picDish:    { kind: "emoji", value: "🍽️", size: 72 },   // dish sh final
  picChick:   { kind: "emoji", value: "🐤", size: 72 },   // chick ch initial
  picCheese:  { kind: "emoji", value: "🧀", size: 72 },   // cheese ch initial
  picChain:   { kind: "emoji", value: "⛓️", size: 72 },   // chain ch initial
  picChocolate:{ kind: "emoji", value: "🍫", size: 72 },  // chocolate ch initial
  picChopsticks:{ kind: "emoji", value: "🥢", size: 72 }, // chopsticks ch initial
  picChicken: { kind: "emoji", value: "🐔", size: 72 },   // chicken ch initial
  picWatch:   { kind: "emoji", value: "⌚", size: 72 },   // watch ch final
  picPeach:   { kind: "emoji", value: "🍑", size: 72 },   // peach ch final
  picBeach:   { kind: "emoji", value: "🏖️", size: 72 },   // beach ch final
  picThumb:   { kind: "emoji", value: "👍", size: 72 },   // thumb th initial
  picThread:  { kind: "emoji", value: "🧵", size: 72 },   // thread th initial
  picThree:   { kind: "emoji", value: "3️⃣", size: 72 },   // three th initial
  picThermometer:{ kind: "emoji", value: "🌡️", size: 72 }, // thermometer th initial
  picTooth:   { kind: "emoji", value: "🦷", size: 72 },   // tooth th final
  picMouth:   { kind: "emoji", value: "👄", size: 72 },   // mouth th final
  picSun:     { kind: "emoji", value: "☀️", size: 72 },   // sun s initial
  picSock:    { kind: "emoji", value: "🧦", size: 72 },   // sock s initial
  picStar:    { kind: "emoji", value: "⭐", size: 72 },   // star s initial
  picSnake:   { kind: "emoji", value: "🐍", size: 72 },   // snake s initial
  picBus:     { kind: "emoji", value: "🚌", size: 72 },   // bus s final
  picHorse:   { kind: "emoji", value: "🐴", size: 72 }    // horse s final
};
```
No emoji newer than Unicode 12 (otter, tooth and thread are Unicode 11-12); no `fallback` needed. The hen emoji is used here ONLY with the word "chicken".

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new picture from x = 760 to the centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "picture selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "picture to a bin / back to the centre (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct picture; digraph tile preview tap" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's digraph tile and the badge after a wrong bin" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new bins; the sound badge (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "sound badge after 1200 ms" },
  binOut:    { y: "+=40", alpha: 0, duration: 300, ease: "Sine.In", trigger: "old bins when the level changes" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "1 of 12" (600,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            "Which sound is in the word?" (360,80)             │
      │ otter(80,150) ══════════ belt y=160 ══════════ picture in→    │  zone A
      │                  [sh][ picture (360,160) ]  badge at an edge   │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌──────────────┐              ┌──────────────┐           │
      │      │  ┌──────┐  0 │              │  ┌──────┐  0 │  bins     │  zone B
      │      │  │  sh  │    │              │  │  ch  │    │  200×130  │
      │      │  └──────┘    │              │  └──────┘    │           │
      │      │   ‾‾‾‾‾‾     │              │   ‾‾‾‾‾‾     │  joinBar  │
      │      └(220,390)─────┘              └(500,390)─────┘           │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Three bins (L2, L3): 180 × 130 at x = 150 / 360 / 570, y = 390, digraph tile 100 × 64. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28) 18 px `inkSoft`.
- Caption `S("whichSound")` at (360, 80), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 600.
- `ART.otter` (80, 150); `ART.belt` centred (390, 160).
- The item picture: `makeTile` 120 × 120 at (360, 160), fill `THEME.colour.surface`, stroke `THEME.colour.line`, label = the picture emoji (72 px) read through `ART[picKey].value`; selected = library selected + `ANIM.lift`. `ART.soundBadge` during the cue at the picture's LEFT edge (centre (300, 160)) for an initial sound or RIGHT edge (centre (420, 160)) for a final sound, letters 28 px `THEME.font.display` `THEME.colour.inkOnAccent`, `ART.joinBar` (fill `bg`) 14 px below the letters, width 60 for two letters / 24 for one.
- Bins: `makeTile` 200 × 130 (two bins) or 180 × 130 (three bins) with `ART.bin` tokens; `ART.digraphTile` centred at (0, −6) with the letters 40 px `THEME.font.display` `THEME.colour.ink` and `ART.joinBar` at (0, +22); `ART.binCount` at (+78, −44); received pictures as `ART.miniPic` along the bin's bottom edge at y = +48 from x = −80 with 24 px pitch (max 7 shown).
- `ART.showRing` around the correct bin (192 × 142 for three-bin layouts). Tap floors: picture 120, bins ≥ 180 × 130 (≥ 56); gap between bins ≥ 30.
- Tab order: the picture, then the bins left to right.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang]` supplies, per level, the bin set (`["sh","ch"]`) and items `{ pic, sound, position: "initial" | "final" }`. The English (`en`) set is authored in full below. **Other locales: a native list is required — en pilot.** Native authors rebuild the bin sets from that language's digraph inventory (F-124): de "sch" / "ch" / "ei" (Schaf, Schuh, Schiff; Buch, Dach; Ei, Eis), nl "oe" / "ij" / "ui" (boek, ijs, huis), sv "sj" / "tj" (sjö, tjur), da/no "sk"/"kj"-class per the national method, fr "ch" / "ou" / "on" (chat, chou, pont), es "ch" / "ll" / "rr" (chocolate, llave, perro), it "ch" / "gn" / "gli" (chiave, gnomo, foglia), pt "ch" / "nh" / "lh" (chave, ninho, folha); fi has no consonant digraphs — the fi author uses DOUBLE-letter long sounds as the bins ("kk" / "ss" / "ll": kukka, kissa, pallo) or marks the game out of scope for fi. The L3 "plain-letter trap" bin (s beside sh) is rebuilt per language (de "s" beside "sch"; nl "o" beside "oe"). Until then `LOCALE_DATA[lang] = "en"`.

Items (picture; sound; position):
- **L1 — bins sh / ch; initial position only**: (`ART.picShip`; sh; initial) · (`ART.picChick`; ch; initial) · (`ART.picShop`; sh; initial) · (`ART.picCheese`; ch; initial) · (`ART.picSheep`; sh; initial) · (`ART.picChain`; ch; initial) · (`ART.picShell`; sh; initial) · (`ART.picChocolate`; ch; initial) · (`ART.picShoe`; sh; initial) · (`ART.picChopsticks`; ch; initial) · (`ART.picShark`; sh; initial) · (`ART.picChicken`; ch; initial)
- **L2 — bins sh / ch / th; initial and final** (misconceptions 2 and 4; sheep / chick is the meaning-decoy pair and both are streamed when this level is in play): (`ART.picFish`; sh; final) · (`ART.picWatch`; ch; final) · (`ART.picThumb`; th; initial) · (`ART.picBrush`; sh; final) · (`ART.picPeach`; ch; final) · (`ART.picTooth`; th; final) · (`ART.picSheep`; sh; initial) · (`ART.picChick`; ch; initial) · (`ART.picThread`; th; initial) · (`ART.picDish`; sh; final) · (`ART.picBeach`; ch; final) · (`ART.picMouth`; th; final) · (`ART.picThree`; th; initial) · (`ART.picThermometer`; th; initial)
- **L3 — bins sh / s / ch; the plain-s trap** (misconception 1): (`ART.picSun`; s; initial) · (`ART.picShip`; sh; initial) · (`ART.picSock`; s; initial) · (`ART.picChick`; ch; initial) · (`ART.picShell`; sh; initial) · (`ART.picStar`; s; initial) · (`ART.picFish`; sh; final) · (`ART.picBus`; s; final) · (`ART.picWatch`; ch; final) · (`ART.picSnake`; s; initial) · (`ART.picShark`; sh; initial) · (`ART.picHorse`; s; final) · (`ART.picCheese`; ch; initial) · (`ART.picBrush`; sh; final)

Stream rule: within a level, items are drawn shuffled with at most 2 of the same sound in a row and each bin used at least 3 times per 12 items when a level lasts the whole session; a picture is never repeated in a session (pictures listed at two levels are drawn once); the correct bin's position never repeats more than 3 items running.

Play list: 12 items; start at L1; levels per Rules; bins re-labelled and shuffled at each level change.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3) with new bins. Three, not two: sorts take ~10 s.
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1) with that level's bins.
- What happens on a correct answer: picture glides into the bin, bin `ANIM.pop`, count +1, small picture added to the bin, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next picture after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Split digraph (ship into the s bin at L3, or sun into the sh bin): picture returns, `tone("nudge")`, `ART.soundBadge` "sh" (one piece with its join bar) or "s" for 1200 ms while the correct bin's tile pulses.
  - Final-position digraph missed (fish into ch): the badge appears at the picture's RIGHT edge reading "sh" while the sh bin pulses.
  - Meaning or later-sound match (sheep into ch beside chick; cheese into sh): the badge shows the word's real digraph; the correct bin pulses.
  - Bin tapped with nothing selected: tile preview pop; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Digraph Bins"; `whichSound` = "Which sound is in the word?". The bin letters and badge letters are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on selecting a picture; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 4)` when the bins change; `tone("finish")` once. Silent under `?sound=off`. Sounds are NOT spoken; the picture carries the word and the joined tile carries the letters.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: belt, picture and three bins visible and separate).
- [ ] Keyboard operable (Tab: picture, then the bins left to right; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the ring always leads to completion).
- [ ] Each bin's label is a single tile with both letters and a bar under them; it never splits into two letter tiles.
- [ ] The ship tapped then the sh bin makes the bin pop and its count go to 1; the ship into the ch bin returns it with an "sh" badge on its left edge while the sh tile pulses.
- [ ] At the second level the fish into the ch bin returns it with the "sh" badge on its RIGHT edge.
- [ ] At the third level an "s" bin sits beside the "sh" bin; the sun goes in "s", the ship in "sh", and each wrong choice shows the word's own letters as one piece.
- [ ] A bin tapped with nothing selected only pops its tile.
- [ ] Three first-try sorts in a row swap in new bins; a wrong bin brings an easier bin set next.
- [ ] The same picture never appears twice in a session; the correct bin is not in the same position more than three times running.
- [ ] The finish screen shows the session's bins with their small pictures, the first-try count, and no score beyond that count.
- [ ] With `?sound=off` nothing is audible.
