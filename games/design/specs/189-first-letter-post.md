# 189 — First Letter Post

## Identity
- Slug: `first-letter-post`
- Subject / topic: Literacy / initial sound → letter: posting the letter that a pictured word starts with onto its parcel [locale word lists; en pilot]
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap a letter tile, then a parcel; judged per placement)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (immediate per-placement judgement: a wrong letter glides back with the hint). Locale rule (F-122, F-211, F-217): the mechanic is universal; the letters and pictures are language-bound and live in `LOCALE_DATA` — the English table is authored in full below and is the **en pilot**; every other locale needs a native-authored word list before it ships (see Content). Zero instruction text on the play screen: the parcels' empty stamp corners and the letter tray are the prompt; the first placement is discoverable by tapping. Nothing is spoken (no letter sounds are played — the picture cues the sound the child says to themselves, and the letter tile's face is the answer).

## Learning
- Objective: Says (silently) the name of each of three pictured things, hears its first sound, and posts the tile with that letter onto the picture's parcel, telling b from d by the side its belly is on.
- Prerequisites: Recognises lowercase letters as distinct shapes (game 006); knows the pictured words in the play language. Sorting pictures by first sound into two bins (game 067) is the natural predecessor; this game asks for the LETTER rather than the bin.
- Curriculum links: F-22 ("letter-sound correspondence taught explicitly at 5-7; phonological awareness — initial sounds — at 5-7" in all twelve systems), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.3.a; England Reception "phase 2 grapheme-phoneme correspondences"; Germany Klasse 1 "Anlaute"; France GS "identifier le phonème initial"; Netherlands groep 2-3 "beginklank"; Spain Infantil "conciencia fonológica"; Brazil EF01LP05; Sweden förskoleklass "bokstavsljud"; Norway 1. trinn "lyd-bokstav"; Finland esiopetus "äänteet"), F-122 (letter names vs sounds — name-final letters harder; per-locale letter tables, never shared), F-121 (b/d/p/q reversals normal to ~7 — the "belly side" cue, never a generic retry), F-124 (segmenting the onset). F-42 (zero text), F-43 (enacted feedback), F-49 (tap-then-tap).
- Common misconceptions (F-121, F-122, F-124), each with this game's response:
  1. **Mirror reversal — d posted for a b-word or b for a d-word (also p for b).** Response: the tile is refused: it glides back to the tray (`ANIM.glide`) with a `ART.bellyDot` (a coral dot) on the belly of BOTH the posted letter and its mirror twin in the tray for 900 ms, and the target picture's parcel `ANIM.pulse`s — "which side is the belly" is shown, never named (F-121). L1 and L2 never put b and d in the same tray; L3 does, on purpose.
  2. **Letter NAME used as the sound (posting w for a "double-u" word that starts with d, y for a w-word, h for a ch-word — F-122).** Response: at L3 the tray contains the name-trap letter; when it is posted the tile glides back and the parcel's picture `ANIM.pulse`s twice while the CORRECT tile in the tray lifts once (`ANIM.lift`) — the picture, not the letter's name, decides.
  3. **Matching by a later sound (posting s for "bus", m for "drum" — the last sound heard).** Response: from L2 one parcel's word ENDS with another tray letter's sound; a tile posted on that parcel glides back and the parcel's `ART.firstMark` (a small "1" flag at the picture's top-left) `ANIM.pulse`s — the FIRST sound is the one wanted.
  4. **Posting any letter anywhere to see what happens (F-65 brute force).** Response: a wrong placement always returns the tile; after the second wrong placement on the same parcel the correct tile gains the show-me ring (`ART.showRing`); an item with any wrong placement never counts as first-try; nothing is gained by guessing.
  5. **Tapping a parcel before a letter is selected.** Response: the parcel's stamp corner `ANIM.pop`s (a harmless preview); nothing else. Tapping the selected tile again de-selects it.

## How it plays
1. **Start screen**: title "First Letter Post", the postman pigeon (`ART.pigeon`) at (360, 200) with a parcel (`ART.parcel`) at (360, 300), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: dog, ball, moon; tray d, b, m, s)** — with `?lang=en`: rail of 8 dots (§6) at y = 28. Zone A: three parcels (`makeTile` 180 × 150 with `ART.parcel` tokens) at y = 180, x = 140 / 360 / 580; each shows its picture (`ART.picDog` / `ART.picBall` / `ART.picMoon`, 64 px) at the parcel's centre-left (−20, +8) and an empty stamp corner (`ART.stampSlot`, 80 × 80, dashed) at its top-right (+40, −30); `ART.firstMark` sits at the picture's top-left (from L2). The pigeon perches at (60, 300). Zone B: the letter tray — four tiles (`makeTile` 88 × 88 with `ART.letterTile` tokens) at y = 400, x = 180 / 300 / 420 / 540, each showing one lowercase letter (52 px `THEME.font.display`): d, b, m and the distractor s, shuffled. No caption, no words.
3. **Posting**: the child taps a letter tile — it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The child taps a parcel — the tile glides (`ANIM.glide`) to that parcel's stamp corner.
   - **Correct letter for that parcel**: the tile lands, `ANIM.stamp` (a quick press-down), `tone("correct")`; the stamp corner's dashed outline becomes solid; the parcel `ANIM.pop`s; the tile is locked there (`setEnabled(false)`); the pigeon `ANIM.flap`. When the third parcel is stamped, the item completes: praise pop (`GameCore.showPraise`, next key in rotation), the rail dot fills, the three parcels glide off to the right (`ANIM.postOff`) and the next item `ANIM.appear`s after 600 ms. First-try if no wrong placement occurred on the item.
   - **Wrong letter**: the tile reaches the corner, pauses 200 ms, then `tone("nudge")` and glides back to its tray slot with the class-specific cue (Rules: belly dots for a mirror pair; picture pulse + correct tile lift for a name trap; first-mark pulse for a later-sound match; plain parcel pulse otherwise); all tiles disabled during the cue (≈ 1.4 s). Attempt 2 for that parcel.
   - **Second wrong letter on the same parcel**: the cue again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); posting it completes that parcel as solved-with-help.
   - Tapping a parcel with no tile selected: its stamp corner `ANIM.pop`s. Tapping the selected tile again: de-select, `tone("tap")`. A stamped parcel refuses further tiles (they spring back, `ANIM.nudge`, no cue).
4. **Items 2-8**: per Content/Rules. L1 = three name-initial letters with distinct shapes and one distractor; L2 = name-final letters and one parcel whose word ends with a tray letter's sound (`ART.firstMark` shown on every parcel); L3 = b and d (or p and b) together in the tray on every item, plus one letter-name trap.
5. **Finish**: `t("all_done")` (360, 110); the pigeon (360, 200) `ANIM.celebrate`; the summary = the eight posted letter sets as `ART.stampChip`s (three small stamped letters "d b m" in 22 px on a 120 × 40 chip) in two rows of four from y = 340 (x = 180 + i × 120) — the letters posted, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  pigeon:      { kind: "emoji", value: "🕊️", size: 72 },
  parcel:      { kind: "shape", shape: "roundRect", w: 180, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },   // a 2-px structure "string" line drawn across at y = +30
  stampSlot:   { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },       // dashed [8,6] while empty; solid structure stroke once stamped
  firstMark:   { kind: "shape", shape: "circle", r: 11, fill: "structure" },      // "1" 14 px display, color bg, at the picture's top-left (L2-L3)
  letterTile:  { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // letter 52 px display ink (Baloo 2: single-storey a and g)
  bellyDot:    { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  showRing:    { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },
  stampChip:   { kind: "shape", shape: "roundRect", w: 120, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (en); a native author adds/removes entries per locale
  picDog:      { kind: "emoji", value: "🐶", size: 64 },
  picDuck:     { kind: "emoji", value: "🦆", size: 64 },
  picDrum:     { kind: "emoji", value: "🥁", size: 64 },
  picDonut:    { kind: "emoji", value: "🍩", size: 64 },
  picBall:     { kind: "emoji", value: "⚽", size: 64 },
  picBus:      { kind: "emoji", value: "🚌", size: 64 },
  picBee:      { kind: "emoji", value: "🐝", size: 64 },
  picBanana:   { kind: "emoji", value: "🍌", size: 64 },
  picMoon:     { kind: "emoji", value: "🌙", size: 64 },
  picMouse:    { kind: "emoji", value: "🐭", size: 64 },
  picMonkey:   { kind: "emoji", value: "🐵", size: 64 },
  picMushroom: { kind: "emoji", value: "🍄", size: 64 },
  picSun:      { kind: "emoji", value: "☀️", size: 64 },
  picSnake:    { kind: "emoji", value: "🐍", size: 64 },
  picSock:     { kind: "emoji", value: "🧦", size: 64 },
  picStar:     { kind: "emoji", value: "⭐", size: 64 },
  picTree:     { kind: "emoji", value: "🌳", size: 64 },
  picTiger:    { kind: "emoji", value: "🐯", size: 64 },
  picTurtle:   { kind: "emoji", value: "🐢", size: 64 },
  picTomato:   { kind: "emoji", value: "🍅", size: 64 },
  picFish:     { kind: "emoji", value: "🐟", size: 64 },
  picFox:      { kind: "emoji", value: "🦊", size: 64 },
  picFrog:     { kind: "emoji", value: "🐸", size: 64 },
  picFlower:   { kind: "emoji", value: "🌸", size: 64 },
  picLion:     { kind: "emoji", value: "🦁", size: 64 },
  picLemon:    { kind: "emoji", value: "🍋", size: 64 },
  picLeaf:     { kind: "emoji", value: "🍃", size: 64 },
  picLock:     { kind: "emoji", value: "🔒", size: 64 },
  picNose:     { kind: "emoji", value: "👃", size: 64 },
  picNut:      { kind: "emoji", value: "🥜", size: 64 },
  picPig:      { kind: "emoji", value: "🐷", size: 64 },
  picPen:      { kind: "emoji", value: "🖊️", size: 64 },
  picPizza:    { kind: "emoji", value: "🍕", size: 64 },
  picPear:     { kind: "emoji", value: "🍐", size: 64 },
  picRabbit:   { kind: "emoji", value: "🐰", size: 64 },
  picRocket:   { kind: "emoji", value: "🚀", size: 64 },
  picRing:     { kind: "emoji", value: "💍", size: 64 },
  picKey:      { kind: "emoji", value: "🔑", size: 64 },
  picKoala:    { kind: "emoji", value: "🐨", size: 64 },
  picWhale:    { kind: "emoji", value: "🐳", size: 64 },
  picWolf:     { kind: "emoji", value: "🐺", size: 64 },
  picYoyo:     { kind: "emoji", value: "🪀", size: 64, fallback: "🎯" },   // Unicode 12; fallback given to be safe
  picHat:      { kind: "emoji", value: "🎩", size: 64 },
  picHorse:    { kind: "emoji", value: "🐴", size: 64 },
  picCheese:   { kind: "emoji", value: "🧀", size: 64 },
  picChick:    { kind: "emoji", value: "🐤", size: 64 }
};
```
Belly-dot offsets on a 52-px lowercase letter (relative to the tile centre): b → (+9, +8) · d → (−9, +8) · p → (+9, +4) · q → (−9, +4). No other emoji or shape parameters appear anywhere in the game; letters are text drawn from `LOCALE_DATA`, never from ART.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "letter tile selected; the correct tile once in the name-trap cue" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to a stamp corner / back to its tray slot (x,y set at call)" },
  stamp:     { scale: 0.9, duration: 100, ease: "Sine.In", yoyo: true, trigger: "a correct tile pressed onto the corner" },
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "parcel receiving a correct letter; stamp corner preview tap" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a tile refused by a stamped parcel" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the target parcel after a wrong letter; the picture in the name-trap cue; firstMark in the later-sound cue" },
  dotIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", yoyo: true, hold: 900, trigger: "bellyDots on the posted letter and its mirror twin (from alpha 0, scale 0.5), then fade" },
  flap:      { angle: 10, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "pigeon on each correct stamp" },
  postOff:   { x: "+=760", duration: 500, ease: "Sine.In", trigger: "the three stamped parcels leave to the right when an item completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new parcels and tray tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile for the parcel in question (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish pigeon" }
};
```
No flashing: `showMe` at 1 Hz; `dotIn` is one fade in, a hold and one fade out.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                     │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌────────┬──┐   ┌────────┬──┐   ┌────────┬──┐   parcels y=180 │
      │  │  dog   │▒▒│   │  ball  │▒▒│   │  moon  │▒▒│   x=140/360/580 │  zone A
      │  │ ───────┴──│   │ ───────┴──│   │ ───────┴──│   (180×150)     │
      │  └───────────┘   └───────────┘   └───────────┘  ▒ = stamp slot │
      │  pigeon (60,300)                                              │
260   ├──────────────────────────────────────────────────────────────┤
      │      [ d ]      [ b ]      [ m ]      [ s ]    tray y=400      │  zone B
      │      x=180      x=300      x=420      x=540    (88×88)         │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. A posted tile shrinks to 72 × 72 inside the 80 × 80 corner (`scale 0.82` applied with the glide); a returning tile restores scale 1.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- Parcels: `makeTile` 180 × 150 with `ART.parcel` tokens at y = 180; picture at (−20, +8); `ART.stampSlot` at (+40, −30), dashed while empty (graphics lineDash [8, 6]), solid `THEME.colour.structure` stroke once stamped; `ART.firstMark` at (−52, −20) with "1" in `THEME.colour.bg` 14 px `THEME.font.display` (L2-L3).
- Tray tiles: `makeTile` 88 × 88 with `ART.letterTile` tokens; letter 52 px `THEME.font.display` `THEME.colour.ink`, lowercase; selected = library selected look + `ANIM.lift`; posted = locked in the corner at scale 0.82.
- `ART.bellyDot` at the offsets in the Art registry; `ART.showRing` behind a tray tile. `ART.pigeon` at (60, 300).
- Tap floors: parcels 180 × 150, tiles 88 (≥ 80); gaps ≥ 32 between tiles, 40 between parcels. Tab order: the three parcels left to right, then the four tray tiles left to right; Enter selects a tile / posts onto a parcel. Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per level, the three (letter, picture) pairs and the distractor letter for each item. The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** A native author must (a) choose pictures from the ART pool (or add emoji to it) whose name in that language STARTS with the letter's primary sound (de: "Sonne" S but the moon is "Mond" M; es: "sol" S, "luna" L, "perro" P for dog; fi: "aurinko" A for sun, "koira" K for dog; fr: "chien" is a digraph — avoid), (b) rebuild the L2 later-sound traps and the L3 letter-name traps from that language's letter names (F-122: German "Vau", Spanish "hache", French "double-vé", Dutch "ij" is not a single tile), and (c) keep the b/d and p/b mirror boards, which transfer to every Latin-script locale while the pictures do not. Digraph onsets (en ch/sh/th, de sch, nl ij) are never targets in this game (F-124 — a digraph is one tile, and this game has single-letter tiles only).

Each item = (parcel 1; parcel 2; parcel 3; distractor). A picture is never repeated in a session. `ART.firstMark` is shown on every parcel from L2.
- **L1 — name-initial letters with distinct shapes (F-122), one distractor; never b and d together**: (d `ART.picDog`; b `ART.picBall`; m `ART.picMoon`; s) · (t `ART.picTree`; k `ART.picKey`; p `ART.picPig`; f) · (b `ART.picBus`; t `ART.picTiger`; k `ART.picKoala`; l) · (p `ART.picPen`; d `ART.picDrum`; t `ART.picTomato`; m) · (m `ART.picMouse`; b `ART.picBee`; s `ART.picSun`; r)
- **L2 — name-final letters; one parcel's word ENDS with the distractor letter's sound (the later-sound trap, marked *)**: (s `ART.picSnake`; d `ART.picDrum`*; f `ART.picFish`; m — drum ends in m) · (l `ART.picLemon`; b `ART.picBus`*; r `ART.picRocket`; s — bus ends in s) · (l `ART.picLeaf`*; m `ART.picMushroom`; r `ART.picRing`; f — leaf ends in f) · (n `ART.picNut`; s `ART.picSock`; t `ART.picTurtle`; l — turtle ends in l) · (f `ART.picFlower`; l `ART.picLock`; s `ART.picStar`; n — lemon is not in this item; the trap is absent by design so the flag is not always the cue) · (m `ART.picMonkey`; n `ART.picNose`; r `ART.picRabbit`; t — rabbit ends in t)
- **L3 — mirror pairs in the tray (b/d, p/b) plus one letter-name trap (F-122)**: (b `ART.picBanana`; d `ART.picDonut`; w `ART.picWhale`; y — y's name starts with a w-sound) · (d `ART.picDog`; b `ART.picBall`; h `ART.picHat`; c — h's name starts with a ch-sound-alike; `ART.picCheese` and `ART.picChick` are never targets) · (p `ART.picPizza`; b `ART.picBee`; w `ART.picWolf`; d) · (b `ART.picBus`; d `ART.picDuck`; y `ART.picYoyo`; w) · (d `ART.picDrum`; p `ART.picPear`; h `ART.picHorse`; b) · (b `ART.picBanana`; d `ART.picDonut`; f `ART.picFox`; p)

Pictures in the pool that no English item uses (`ART.picCheese`, `ART.picChick`, `ART.picLion`, `ART.picFrog`) are there for native authors of other locales (e.g. fr "fromage" F, de "Frosch" F, es "león" L); they never appear on an English parcel. Play list of 8; start at L1; shuffle within level without repeats; parcel order and tray order shuffled per item; a mirror pair is never in the tray before L3; the correct tile for the leftmost parcel never sits in the same tray slot twice running (§13).

Worked example (`?lang=en`): item 1 (dog, ball, moon; d b m s) posts d on dog ✓, b on moon → returns, the moon parcel pulses; m on moon ✓; b on ball ✓ → helped · item 2 (tree, key, pig; t k p f) all first-try · item 3 (pen, drum, tomato; p d t m) first-try → L2 · item 4 (snake, drum*, fish; s d f m) posts m on the drum (it ENDS in m) → returns, the drum's "1" flag pulses; d on drum ✓; the rest ✓ → helped → L1 · items 5-6 first-try → L2 · item 7 first-try → L3 · item 8 (banana, donut, whale; b d w y) posts d on banana → returns with a coral dot on the belly of d and of b; b on banana ✓; y on whale → returns, the whale pulses and w lifts; w ✓; d on donut ✓ → helped → Finish shows eight stamp chips.

## Rules
- Item count: 8 (each = three parcels).
- Difficulty progression: 2 consecutive first-try items → next item from the next level up (cap L3).
- Adaptation: any wrong placement on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: per parcel — `ANIM.stamp`, `tone("correct")`, the corner turns solid, parcel `ANIM.pop`, pigeon `ANIM.flap`; on the third parcel — praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot fills, `ANIM.postOff`, next item after 600 ms.
- What happens on a wrong answer (per anticipated mistake; each begins with the tile pausing on the corner, `tone("nudge")`, and gliding back):
  - Mirror twin posted (d for b, b for d, p for b): `ART.bellyDot` on the posted letter AND its twin in the tray (`ANIM.dotIn`, 900 ms); the target parcel pulses.
  - Letter-name trap posted (y for a w-word, w for a d-word, c for a ch-sounding guess): the parcel's picture pulses twice and the correct tile lifts once.
  - A later-sound letter posted (m on drum, s on bus, f on leaf): the parcel's `ART.firstMark` pulses.
  - Any other wrong letter: the target parcel pulses.
  - A tile posted on an already-stamped parcel: springs back with `ANIM.nudge`; not an attempt.
- Retry behaviour: per parcel — attempt 1 unaided → attempt 2 after the cue → attempt 3 with the show-me ring on the correct tile; posting the ringed tile completes that parcel as solved-with-help. No attempt 4. An item with any wrong placement does not count as first-try.
- Finish condition: 8 items (24 parcels). No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "First Letter Post". No words on the play screen; letters come from `LOCALE_DATA`, never from `STRINGS`.

## Sound
`tone("tap")` on selecting / de-selecting a tile; `tone("correct")` on a stamped parcel; `tone("nudge")` on a returned tile; `tone("tap", k)` when the k-th parcel of an item is stamped (pitch climbs 1-2-3 — F-213); `tone("finish")` once. Silent under `?sound=off`; no audio files. No letter sound is ever played — the picture cues the sound.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; with `?lang=en` the parcels show dog / ball / moon and the tray d / b / m / s on the first item; another locale shows that locale's list once authored).
- [ ] Works at narrow width (400-px iframe: three parcels with their stamp corners and four tray tiles fully visible).
- [ ] Keyboard operable (Tab walks the three parcels then the four tiles; Enter selects a tile / posts it; stamped parcels are skipped).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong placements still ends with every parcel stamped via the show-me ring).
- [ ] Tapping a letter then a parcel moves the tile onto the parcel's corner; a right letter presses down and stays, a wrong one comes back to the tray.
- [ ] Posting d on the ball shows a coral dot on the belly of the d and of the b before the tile returns.
- [ ] At the second level every picture carries a small "1" flag, and posting m on the drum makes that flag pulse.
- [ ] At the third level b and d are both in the tray, and posting y on the whale makes the whale pulse and the w tile lift.
- [ ] A stamped parcel refuses further tiles; tapping a parcel with nothing selected only pops its corner.
- [ ] Two first-try items in a row bring harder letters; a wrong placement brings easier ones next.
- [ ] No letter sound or spoken word is ever played; no digraph word is ever a target.
- [ ] The finish screen shows eight chips of three stamped letters and no score.
- [ ] With `?sound=off` nothing is audible.
