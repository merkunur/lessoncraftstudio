# 068 — End-Sound Catch

## Identity
- Slug: `end-sound-catch`
- Subject / topic: Literacy / final sound identification — picking the picture whose name ENDS with a shown letter's sound
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three picture tiles)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Sibling of game 061 (initial sound) — the same picture-cued logic applied to the END of the word, with the sound-box feedback that games 069/070 build on. Locale note: **nothing is spoken**; the target is a SHOWN letter in the last of three sound boxes and each answer is a PICTURE whose name the child knows (A-15). Final-sound sets are language-bound and some languages break the letter/sound link at the end of words (F-122, F-124: German final devoicing — "Hund" ends in the sound /t/ but the letter d; French silent final letters; Finnish word-final vowels) — every word list lives in `LOCALE_DATA`; the mechanic is universal (F-217).

## Learning
- Objective: Given a letter shown as the LAST sound box of a word, taps the one of three pictures whose name ends with that sound, including words whose final sound follows a nasal or liquid (tent, lamp, milk).
- Prerequisites: Identifies initial sounds from pictures (games 061/067); recognises lowercase letters. Reads nothing: the words that appear in the feedback boxes are shown AFTER the tap and never need decoding (F-125 applies to decoding tasks; here the picture is the task and the boxes are the explanation).
- Curriculum links: F-22 (phonological awareness and letter-sound correspondence at 5-7; segmenting for spelling at 6-8 in 11 of 12 systems), F-24 (letter-sound games are universal), F-31 row "Letter names + sounds; initial sound" and row "Blending to words (CVC / syllables)" — conservative 7, earliest 4 → 6-8 (US RF.K.2.d "isolate and pronounce the initial, medial vowel, and final sounds" / RF.1.2.c; England Y1 phonics "segment spoken words"; Germany Klasse 1 Auslaute; France CP "phonème final"; Spain 1º conciencia fonémica; Brazil EF01LP07; Netherlands groep 3 "eindklank"; Sweden åk 1; Denmark 1. klasse; Norway 1.-2. trinn; Finland vuosiluokka 1 loppuäänne).
- Common misconceptions (F-124, F-122, F-126), each with this game's response:
  1. **Answering with the INITIAL sound (taps "tiger" for a word ending in t) — the beginning of a word is far more salient than its end.** Response: from L2 one distractor per item STARTS with the target sound. On that tap, the picture's word appears in sound boxes under it (`ART.soundBox` per sound, letters inside) with its FIRST box wearing `ART.onsetMark` (a coral dot) and its LAST box glowing `ART.boxGlow` in `structure`: the t is at the front, the end box holds something else. The target card's boxes (empty, empty, t) sit beside it for comparison.
  2. **Dropping the nasal / liquid before the final sound (says "tet" for tent, "lap" for lamp, "mik" for milk) — F-124.** Response: at L3 the correct picture's word contains a nasal or liquid before the end; on the reveal its boxes appear one by one and the nasal/liquid box arrives LAST with `ANIM.extraBox` (it slides in between the vowel and the final box, pushing the final box right) — the extra sound box made visible. On a wrong tap at L3 the distractor that ends with the nasal alone (sun for tent) shows its boxes ending in n beside the target's t.
  3. **Neighbouring final sounds confused (t/d, n/m, p/b, g/k).** Response: from L2 the second distractor ends with the voiced/unvoiced or nasal neighbour; the feedback boxes show the differing final letter beside the target letter, both glowing, so the two letters are compared directly.
  4. **Treating a two-letter final spelling as two sounds (ck, ll, sh, ss).** Response: a final digraph is ONE box (duck → d, u, ck; bell → b, e, ll; fish → f, i, sh) — F-124 "a digraph is one physical tile"; the target card shows the digraph in its single box.
  5. **Choosing by position.** Response: the correct slot is shuffled and never repeats twice running (§13); after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "End-Sound Catch", the bear (`ART.bear`) with the net (`ART.net`) at (360, 200), Start, picker.
2. **Item 1 (L1: target t; pictures cat, sun, dog)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (600, 28) in 18 px `inkSoft` (6-8 band may show it). Zone A left: the target card (`ART.card`, 220 × 120) centred at (150, 150) holding three sound boxes (`ART.promptBox`, 56 × 56) at x = 90 / 150 / 210, y = 150 — the first two empty (dashed), the last holding the target letter (`ART.targetLetter`, "t", 40 px, `structure`); above the card the caption `S("endsWith")` ("Which one ends with this sound?") at (360, 80), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600. Zone A right: the bear with the net at (560, 150) — the catcher. Zone B: three picture tiles (`ART.picTile`, 100 × 100) at y = 380, x = 240 / 360 / 480, labels `ART.picCat`, `ART.picSun`, `ART.picDog`, shuffled.
3. **Answering**: the child taps a picture.
   - **Correct (cat)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the word's sound boxes appear under the tile (`ART.soundBox` × 3: c, a, t) with the last box `ART.boxGlow`ing and `tone("tap", 3)` on it — the ending is shown even on success (F-43); then the picture glides (`ANIM.catch`) into the bear's net and shrinks; rail dot fills; `question_x_of_y` updates; next item after 800 ms.
   - **Wrong (dog)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; the boxes for "dog" appear under the tapped tile (d, o, g) with the last box glowing; the target card's t box `ANIM.pulse`s at the same time — "g here, t there". 1400 ms, then the boxes fade (`ANIM.fadeOut`). Attempt 2.
   - **Wrong, onset trap (L2+: tiger for t)**: the same, plus `ART.onsetMark` on the first box — the t is at the start.
   - **Second wrong**: the cue again, then the correct tile gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop). The reveal boxes still play.
4. **Items 2-12**: per Content/Rules. L1 single-consonant endings, neutral distractors; L2 one onset-trap distractor + one neighbour-sound distractor; L3 the correct word has a nasal/liquid before the final sound (four boxes), one distractor ends in the nasal alone, one is an onset trap.
5. **Finish**: `t("all_done")` (360, 110); the bear with a full net (360, 200) `ANIM.celebrate`; the summary = the twelve caught pictures in two rows of six at y = 340 / 420 as `ART.miniPic` (36 px) each with its final letter beneath (`ART.miniLetter`, 20 px) — the endings caught; optional `t("question_x_of_y")` with first-try count at (360, 480); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  bear:         { kind: "emoji", value: "🐻", size: 80 },
  net:          { kind: "emoji", value: "🥅", size: 64 },
  card:         { kind: "shape", shape: "roundRect", w: 220, h: 120, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  promptBox:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },   // dashed via lineDash [6,4] when empty
  targetLetter: { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  picTile:      { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  soundBox:     { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "surface", stroke: "line", strokeWidth: 2, radius: 6 },    // letters 24 px display ink
  boxGlow:      { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 6 },
  onsetMark:    { kind: "shape", shape: "circle", r: 6, fill: "accent" },
  showRing:     { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniPic:      { kind: "text",  value: "", size: 36, font: "body", color: "ink" },      // value = a picture emoji read through ART at runtime
  miniLetter:   { kind: "text",  value: "", size: 20, font: "display", color: "structure" },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name and its sound boxes in the comment)
  picCat:    { kind: "emoji", value: "🐱", size: 60 },   // cat: c a t
  picHat:    { kind: "emoji", value: "🎩", size: 60 },   // hat: h a t
  picBoat:   { kind: "emoji", value: "⛵", size: 60 },   // boat: b oa t
  picGoat:   { kind: "emoji", value: "🐐", size: 60 },   // goat: g oa t
  picNut:    { kind: "emoji", value: "🥜", size: 60 },   // nut: n u t
  picSun:    { kind: "emoji", value: "☀️", size: 60 },   // sun: s u n
  picPen:    { kind: "emoji", value: "🖊️", size: 60 },   // pen: p e n
  picHen:    { kind: "emoji", value: "🐔", size: 60 },   // hen: h e n
  picMoon:   { kind: "emoji", value: "🌙", size: 60 },   // moon: m oo n
  picSpoon:  { kind: "emoji", value: "🥄", size: 60 },   // spoon: s p oo n
  picLion:   { kind: "emoji", value: "🦁", size: 60 },   // lion: l i o n
  picDog:    { kind: "emoji", value: "🐶", size: 60 },   // dog: d o g
  picFrog:   { kind: "emoji", value: "🐸", size: 60 },   // frog: f r o g
  picPig:    { kind: "emoji", value: "🐷", size: 60 },   // pig: p i g
  picBug:    { kind: "emoji", value: "🐛", size: 60 },   // bug: b u g
  picEgg:    { kind: "emoji", value: "🥚", size: 60 },   // egg: e gg
  picFlag:   { kind: "emoji", value: "🏁", size: 60 },   // flag: f l a g
  picShip:   { kind: "emoji", value: "🚢", size: 60 },   // ship: sh i p
  picCap:    { kind: "emoji", value: "🧢", size: 60 },   // cap: c a p
  picMap:    { kind: "emoji", value: "🗺️", size: 60 },   // map: m a p
  picSheep:  { kind: "emoji", value: "🐑", size: 60 },   // sheep: sh ee p
  picDuck:   { kind: "emoji", value: "🦆", size: 60 },   // duck: d u ck
  picSock:   { kind: "emoji", value: "🧦", size: 60 },   // sock: s o ck
  picClock:  { kind: "emoji", value: "⏰", size: 60 },   // clock: c l o ck
  picBook:   { kind: "emoji", value: "📖", size: 60 },   // book: b oo k
  picBus:    { kind: "emoji", value: "🚌", size: 60 },   // bus: b u s
  picDrum:   { kind: "emoji", value: "🥁", size: 60 },   // drum: d r u m
  picBell:   { kind: "emoji", value: "🔔", size: 60 },   // bell: b e ll
  picOwl:    { kind: "emoji", value: "🦉", size: 60 },   // owl: ow l
  picFish:   { kind: "emoji", value: "🐟", size: 60 },   // fish: f i sh
  picBed:    { kind: "emoji", value: "🛏️", size: 60 },   // bed: b e d
  picBread:  { kind: "emoji", value: "🍞", size: 60 },   // bread: b r ea d
  picLeaf:   { kind: "emoji", value: "🍃", size: 60 },   // leaf: l ea f
  picTiger:  { kind: "emoji", value: "🐯", size: 60 },   // tiger: t i g er (onset trap only)
  picTree:   { kind: "emoji", value: "🌳", size: 60 },   // tree: t r ee (onset trap only)
  picNose:   { kind: "emoji", value: "👃", size: 60 },   // nose: n o se (onset trap only)
  picMouse:  { kind: "emoji", value: "🐭", size: 60 },   // mouse: m ou se (onset trap only)
  picKey:    { kind: "emoji", value: "🔑", size: 60 },   // key: k ey (onset trap only)
  picPear:   { kind: "emoji", value: "🍐", size: 60 },   // pear: p ear (onset trap only)
  picSnake:  { kind: "emoji", value: "🐍", size: 60 },   // snake: s n a ke (onset trap only)
  picBee:    { kind: "emoji", value: "🐝", size: 60 },   // bee: b ee (onset trap only)
  picDonut:  { kind: "emoji", value: "🍩", size: 60 },   // donut: d o n u t (onset trap only)
  picTent:   { kind: "emoji", value: "⛺", size: 60 },   // tent: t e n t
  picAnt:    { kind: "emoji", value: "🐜", size: 60 },   // ant: a n t
  picLamp:   { kind: "emoji", value: "🪔", size: 60 },   // lamp: l a m p (Unicode 12)
  picMilk:   { kind: "emoji", value: "🥛", size: 60 },   // milk: m i l k
  picHand:   { kind: "emoji", value: "✋", size: 60 },   // hand: h a n d
  picWolf:   { kind: "emoji", value: "🐺", size: 60 }    // wolf: w o l f
};
```
No emoji newer than Unicode 12; no `fallback` needed. Words whose emoji name is ambiguous in English (cup/coffee, ball/football, cake/birthday) are deliberately absent.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  boxIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each sound box in turn, 220 ms apart (from alpha 0, scale 0.6)" },
  extraBox:  { x: "+=48", duration: 260, ease: "Sine.InOut", trigger: "L3 reveal: the final box moves right while the nasal/liquid box appears in the gap (boxIn)" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "target letter box on a wrong tap" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "feedback boxes after 1400 ms" },
  catch:     { scale: 0.4, duration: 400, ease: "Sine.In", trigger: "correct picture flies into the net (x,y set to the net at call) and shrinks" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles and target (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   Question 1 of 12│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │          "Which one ends with this sound?"  (360,80)          │
      │   ┌── card (150,150) ──┐                      bear + net      │  zone A
      │   │ [ ] [ ] [t]        │                      (560,150)       │
      │   └────────────────────┘                                     │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ cat ]      [ sun ]      [ dog ]   tiles y=380        │
      │        x=240        x=360        x=480     (100×100)          │  zone B
      │        c a t  ← feedback boxes under a tapped tile, y=450     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Feedback boxes for a tapped tile are centred under it at y = 450, pitch 48 (a 4-box word spans 192 px, so neighbouring tiles' boxes never overlap because only ONE tile's boxes show at a time).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28), 18 px `THEME.font.body` `THEME.colour.inkSoft`.
- Caption `S("endsWith")` at (360, 80), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 600, max 2 lines.
- `ART.card` centred (150, 150) with three `ART.promptBox` at (90, 150), (150, 150), (210, 150); the last holds `ART.targetLetter`; the empty ones are dashed. For a digraph target (ck, ll, sh) the letter text is the digraph at 32 px.
- `ART.bear` at (560, 150) with `ART.net` at (610, 175) overlapping its right side.
- Picture tiles: `makeTile` 100 × 100 (`ART.picTile`), label = the picture emoji (60 px) via `ART[picKey].value`; selected look per §7.2.
- Feedback boxes: n × `ART.soundBox` centred under the tile at y = 450, pitch 48, letters 24 px `THEME.font.display` `THEME.colour.ink`; the final box drawn as `ART.boxGlow`; `ART.onsetMark` at the first box's top-left when the word is an onset trap.
- `ART.showRing` behind the correct tile. Tap floor 100 ≥ 56; gaps 20.
- Tab order: the three tiles left to right.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per item, the target (letter or digraph), the correct picture, the two distractors, and every word's sound boxes. The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors must choose pictures whose native name ENDS in the target sound with the target letter (avoid final-devoicing words in de — "Hund", "Rad" — and silent final letters in fr — "chat", "loup"; fi words mostly end in vowels, so the fi list should target final vowels and the two-letter endings -nen/-kka may be marked out of scope), and must box each word by that language's grapheme-phoneme units (F-124: de "sch", nl "oe/ij", fi almost none).

Each item = (target; correct; distractor A; distractor B). Sound boxes per word are in the ART comments.
- **L1 — single final consonant, neutral distractors**: (t; `ART.picCat`; `ART.picSun`, `ART.picDog`) · (n; `ART.picSun`; `ART.picHat`; `ART.picPig`) · (g; `ART.picDog`; `ART.picBoat`, `ART.picPen`) · (p; `ART.picCap`; `ART.picHen`, `ART.picBug`) · (p; `ART.picSheep`; `ART.picBed`, `ART.picLion`) · (t; `ART.picBoat`; `ART.picMoon`, `ART.picFrog`) · (n; `ART.picMoon`; `ART.picGoat`, `ART.picMap`) · (s; `ART.picBus`; `ART.picNut`, `ART.picEgg`) · (m; `ART.picDrum`; `ART.picShip`, `ART.picLion`) · (d; `ART.picBed`; `ART.picSpoon`, `ART.picFlag`) · (f; `ART.picLeaf`; `ART.picHat`, `ART.picBook`)
- **L2 — one onset-trap distractor (starts with the target) + one neighbour-sound distractor** (misconceptions 1, 3): (t; `ART.picHat`; `ART.picTiger` (onset), `ART.picBed` (ends d)) · (n; `ART.picPen`; `ART.picNose` (onset), `ART.picDrum` (ends m)) · (g; `ART.picPig`; `ART.picGoat` (onset), `ART.picBook` (ends k)) · (p; `ART.picMap`; `ART.picPear` (onset), `ART.picBug` (ends g)) · (d; `ART.picBread`; `ART.picDonut` (onset), `ART.picGoat` (ends t)) · (k; `ART.picBook`; `ART.picKey` (onset), `ART.picFlag` (ends g)) · (m; `ART.picDrum`; `ART.picMouse` (onset), `ART.picSun` (ends n)) · (s; `ART.picBus`; `ART.picSnake` (onset), `ART.picFish` (ends sh)) · (ck; `ART.picDuck`; `ART.picCat` (onset c), `ART.picPig` (ends g)) · (ll; `ART.picBell`; `ART.picLeaf` (onset), `ART.picBug` (ends g)) · (sh; `ART.picFish`; `ART.picShip` (onset), `ART.picBus` (ends s)) · (t; `ART.picNut`; `ART.picTree` (onset), `ART.picBed` (ends d))
- **L3 — the correct word has a nasal/liquid before the final sound (four boxes); one distractor ends in the nasal/liquid alone** (misconception 2): (t; `ART.picTent`; `ART.picSun` (ends n), `ART.picTiger` (onset)) · (t; `ART.picAnt`; `ART.picPen` (ends n), `ART.picTree` (onset)) · (p; `ART.picLamp`; `ART.picDrum` (ends m), `ART.picPear` (onset)) · (k; `ART.picMilk`; `ART.picBell` (ends l), `ART.picKey` (onset)) · (d; `ART.picHand`; `ART.picMoon` (ends n), `ART.picDonut` (onset)) · (f; `ART.picWolf`; `ART.picOwl` (ends l), `ART.picFish` (onset)) · (t; `ART.picTent`; `ART.picHen` (ends n), `ART.picSock` (ends ck)) · (p; `ART.picLamp`; `ART.picClock` (ends ck), `ART.picBee` (ends a vowel))

Distractors never end with the target sound (owl is never a distractor for ll, since it ends in the same sound); exactly one tile is correct in every item.

Play list: 12 items; start at L1; levels per Rules; no correct picture repeats within a session; correct slot never repeats twice running.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the word's boxes appear (`ANIM.boxIn`, the final box glowing; at L3 the nasal/liquid box arrives last with `ANIM.extraBox`), the picture `ANIM.catch`es into the net, rail dot fills, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Onset trap tapped (tiger for t): `ANIM.nudge`, `tone("nudge")`; the word's boxes appear with `ART.onsetMark` on the first box and the last box glowing; the target box `ANIM.pulse`s; 1400 ms.
  - Neighbour final sound tapped (bed for t): nudge + tone; boxes with the last box "d" glowing beside the pulsing target "t".
  - Nasal/liquid-only word tapped at L3 (sun for tent): nudge + tone; the boxes "s u n" with n glowing; the target t pulses; on the eventual correct tap the four boxes of tent show the n box arriving last.
  - Any other wrong picture: nudge + tone; its boxes with the last box glowing; target pulses.
- Retry behaviour: attempt 1 → attempt 2 after the boxes → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "End-Sound Catch"; `endsWith` = "Which one ends with this sound?". The box letters are locale content.

## Sound
`tone("tap")` on a tile tap; `tone("tap", k)` on the k-th sound box as it appears (the last box's note is the "ending", F-213); `tone("correct")` on the right picture; `tone("nudge")` on a wrong one; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome, caption and the question counter change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: card, bear, three tiles and a four-box feedback row visible).
- [ ] Keyboard operable (Tab across the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the ring always completes the item).
- [ ] With the card showing an empty, empty, "t" box, tapping the cat shows c-a-t boxes with the t box highlighted, then the cat flies into the net.
- [ ] Tapping the dog shows d-o-g with the g box highlighted while the card's t pulses.
- [ ] At the second level, tapping the tiger for "t" shows a coral dot on its first box (t) and the last box highlighted.
- [ ] At the third level, the tent's boxes appear as t-e-t first and the n box slides in between, pushing the last t to the right.
- [ ] The duck's boxes are d-u-ck (three boxes, not four); the bell's are b-e-ll.
- [ ] The correct tile is never in the same slot twice running; "Question n of 12" counts up.
- [ ] Two first-try corrects in a row bring onset-trap distractors; a wrong tap brings neutral ones back.
- [ ] The finish screen shows the twelve caught pictures with their final letters and no score other than the optional first-try count.
- [ ] With `?sound=off` nothing is audible.
