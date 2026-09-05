# 067 — Letter-Sound Sort

## Identity
- Slug: `letter-sound-sort`
- Subject / topic: Literacy / initial sound families — sorting pictures into two bins labelled by a letter, according to the sound each picture's name starts with
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the picture, then tap a bin; one picture at a time)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (2 bins for 5-6, one item at a time; a wrong bin refuses gently and the bin's rule icon pulses; 3rd wrong → the correct bin pulses). Locale note: **nothing is spoken** (no audio files); each item is a PICTURE whose name the child knows (A-15); the bin labels are LETTERS. Which pictures start with which letter is language-bound (F-122) and lives in `LOCALE_DATA`; the mechanic is universal (F-217). Sibling of game 061 (find every picture for ONE sound); here the child decides BETWEEN two sounds.

## Learning
- Objective: Sorts pictures one at a time into the bin whose letter matches the first sound of the picture's name, choosing between two letters.
- Prerequisites: Knows the names of common pictured objects in the play language; recognises letters as distinct shapes (game 006). No reading.
- Curriculum links: F-22 (letter-sound correspondence and initial sounds at 5-7 in all twelve systems), F-24 (letter-sound games are universal across reading methods), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.3.a; England Reception/Y1 phonics; Germany Klasse 1 Anlaute; France GS "phonologie"; Spain Infantil; Brazil EF01LP05; Netherlands groep 2 "beginklank"; Sweden förskoleklass; Denmark 0. klasse; Norway 1. trinn; Finland esiopetus). Demand: F-7.
- Common misconceptions (F-122, F-121, F-126), each with this game's response:
  1. **Letter NAME used as the sound (F-122).** Response: the bin letters are chosen so that no letter's NAME sound matches the other bin's sound at L1-L2 (b/s, m/t, f/d, l/p …); the wrong-bin cue shows the picture's OWN first letter on the picture (`ART.letterBadge`) beside the two bin letters, so the child compares letter to letter.
  2. **Sounds at the end of the letter name are harder (m "em", s "ess", f "eff", l "ell", n "en", r "ar") — F-122.** Response: L1 pairs one name-initial letter with one name-final letter (S/B, M/T); L2 pairs two name-final letters (M/S, F/L, N/R); the badge cue is the same at every level.
  3. **Mirror letters on the bins (b/d, p/q) sorted by shape confusion, not sound (F-121).** Response: b/d and p/b pairs appear only at L3, and those bins carry the belly-side cue from game 006 (`ART.bellyDot` on the bowl of each bin letter, permanently, at L3) so the bins are told apart by the belly BEFORE the sound decision; a wrong bin at L3 pulses its letter AND its belly dot.
  4. **Matching on a later sound or on meaning (mouse into the S bin because "mouse" ends with s; fish into the D bin because fish is "dinner") — F-126.** Response: the badge shows the picture's FIRST letter; L2 streams include one picture whose name starts with one bin's letter and ends with the other's (mouse for M / S, leaf for F / L) so the error surfaces and is answered by the badge.
  5. **Sorting by the bin's position (always the left bin).** Response: bin sides are shuffled when the pair changes, and the correct bin never sits on the same side more than 3 items running; counts on the bins show the child that both bins fill.

## How it plays
1. **Start screen**: title "Letter-Sound Sort", the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker.
2. **Item 1 (L1 pair S / B; first picture: sun)**: rail of 10 dots (§6). Zone A: a conveyor strip (`ART.belt`) across y = 170 with the hedgehog at (80, 170); the first picture slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 with `ART.picSun` as its label. Zone B: two bins (`ART.bin`, 200 × 130) at (220, 390) and (500, 390); on each bin's front its letter in both cases (`ART.binLetter` "S s" / "B b", 56 px upper + 36 px lower) and a count (`ART.binCount`, "0") in the corner. No caption.
3. **Sorting**: tap the picture (it lifts: `ANIM.lift`, `tone("tap")`), then tap a bin. The picture glides (`ANIM.glide`) into the bin.
   - **Correct bin (S)**: the bin `ANIM.pop`, its count goes 0 → 1, `tone("correct")`; every third correct sort plays a praise pop (rotation) — ten items would make ten pops too many; the rail dot fills; the next picture slides in after 400 ms.
   - **Wrong bin (B)**: the picture glides back to the centre, `tone("nudge")`; `ART.letterBadge` with the picture's first letter ("s") appears on the picture for 1200 ms while the CORRECT bin's letter `ANIM.pulse`s — badge "s" and bin "S s" pulse together, the wrong bin does nothing. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains `ART.showRing` with `ANIM.showMe` (show-me); placing the picture there completes the item as solved-with-help.
   - **Tapping a bin with nothing selected**: the bin's letter `ANIM.pop` (a harmless preview); nothing else.
4. **Pair changes**: when the level changes (Rules), the bins `ANIM.binOut` (drop and fade) and two new bins `ANIM.appear` with the new letters, sides shuffled; the counts restart at 0; `tone("tap", 4)`.
5. **Items 2-10**: per Content/Rules. L1 pairs: one name-initial + one name-final letter (S/B, M/T, F/D, L/P); L2: two name-final letters (M/S, F/L, N/R, S/F); L3: mirror or voicing pairs (B/D, P/B, M/N) with the belly dots on B/D/P bins.
6. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = the session's bins in a row at y = 400 (up to 6 bins as `ART.binMini`, 96 × 72, x from 360 − (n−1) × 56) each showing its letter and the pictures it received as small emoji (`ART.miniPic`, 22 px) along its bottom — the sorted families; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  hedgehog:    { kind: "emoji", value: "🦔", size: 80 },
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  bin:         { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  binMini:     { kind: "shape", shape: "roundRect", w: 96, h: 72, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  binLetter:   { kind: "text",  value: "", size: 56, font: "display", color: "ink" },        // "S" 56 px with "s" 36 px beside it (two text objects)
  binCount:    { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  bellyDot:    { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  letterBadge: { kind: "shape", shape: "circle", r: 22, fill: "accent" },                    // the picture's first letter 26 px display, color inkOnAccent
  miniPic:     { kind: "text",  value: "", size: 22, font: "body", color: "ink" },           // value = a picture emoji read through ART at runtime
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name in the comment; every name unambiguous and starting with the key's letter sound)
  picSun:      { kind: "emoji", value: "☀️", size: 72 },   // sun
  picSnake:    { kind: "emoji", value: "🐍", size: 72 },   // snake
  picSock:     { kind: "emoji", value: "🧦", size: 72 },   // sock
  picStar:     { kind: "emoji", value: "⭐", size: 72 },   // star
  picBus:      { kind: "emoji", value: "🚌", size: 72 },   // bus
  picBee:      { kind: "emoji", value: "🐝", size: 72 },   // bee
  picBear:     { kind: "emoji", value: "🐻", size: 72 },   // bear
  picBanana:   { kind: "emoji", value: "🍌", size: 72 },   // banana
  picBell:     { kind: "emoji", value: "🔔", size: 72 },   // bell
  picMoon:     { kind: "emoji", value: "🌙", size: 72 },   // moon
  picMouse:    { kind: "emoji", value: "🐭", size: 72 },   // mouse
  picMonkey:   { kind: "emoji", value: "🐵", size: 72 },   // monkey
  picMushroom: { kind: "emoji", value: "🍄", size: 72 },   // mushroom
  picTree:     { kind: "emoji", value: "🌳", size: 72 },   // tree
  picTiger:    { kind: "emoji", value: "🐯", size: 72 },   // tiger
  picTurtle:   { kind: "emoji", value: "🐢", size: 72 },   // turtle
  picTent:     { kind: "emoji", value: "⛺", size: 72 },   // tent
  picTomato:   { kind: "emoji", value: "🍅", size: 72 },   // tomato
  picFish:     { kind: "emoji", value: "🐟", size: 72 },   // fish
  picFox:      { kind: "emoji", value: "🦊", size: 72 },   // fox
  picFrog:     { kind: "emoji", value: "🐸", size: 72 },   // frog
  picFlower:   { kind: "emoji", value: "🌸", size: 72 },   // flower
  picDog:      { kind: "emoji", value: "🐶", size: 72 },   // dog
  picDuck:     { kind: "emoji", value: "🦆", size: 72 },   // duck
  picDrum:     { kind: "emoji", value: "🥁", size: 72 },   // drum
  picDonut:    { kind: "emoji", value: "🍩", size: 72 },   // donut
  picDinosaur: { kind: "emoji", value: "🦕", size: 72 },   // dinosaur
  picLion:     { kind: "emoji", value: "🦁", size: 72 },   // lion
  picLemon:    { kind: "emoji", value: "🍋", size: 72 },   // lemon
  picLeaf:     { kind: "emoji", value: "🍃", size: 72 },   // leaf
  picLock:     { kind: "emoji", value: "🔒", size: 72 },   // lock
  picPig:      { kind: "emoji", value: "🐷", size: 72 },   // pig
  picPen:      { kind: "emoji", value: "🖊️", size: 72 },   // pen
  picPizza:    { kind: "emoji", value: "🍕", size: 72 },   // pizza
  picPear:     { kind: "emoji", value: "🍐", size: 72 },   // pear
  picPenguin:  { kind: "emoji", value: "🐧", size: 72 },   // penguin
  picNose:     { kind: "emoji", value: "👃", size: 72 },   // nose
  picNut:      { kind: "emoji", value: "🥜", size: 72 },   // nut
  picNewspaper:{ kind: "emoji", value: "📰", size: 72 },   // newspaper
  picRabbit:   { kind: "emoji", value: "🐰", size: 72 },   // rabbit
  picRocket:   { kind: "emoji", value: "🚀", size: 72 },   // rocket
  picRainbow:  { kind: "emoji", value: "🌈", size: 72 },   // rainbow
  picRing:     { kind: "emoji", value: "💍", size: 72 }    // ring
};
```
No emoji newer than Unicode 12 (the hedgehog and dinosaur are Unicode 10); no `fallback` needed.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new picture from x = 760 to the centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "picture selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "picture to a bin / back to the centre (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct picture; bin letter preview tap" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's letter (and belly dot at L3) after a wrong bin" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "letter badge after 1200 ms" },
  binOut:    { y: "+=40", alpha: 0, duration: 300, ease: "Sine.In", trigger: "old bins when the pair changes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new bins; letter badge (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ hedgehog(80,170) ═══════════ belt y=170 ═══════════ picture in→│  zone A
      │                        [ picture (360,170) ] 120×120          │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌──────────────┐              ┌──────────────┐           │
      │      │   S  s     0 │              │   B  b     0 │  bins     │  zone B
      │      │  (220,390)   │              │  (500,390)   │  200×130  │
      │      └──────────────┘              └──────────────┘           │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22, y = 28) → `ART.dotFull`.
- `ART.hedgehog` (80, 170); `ART.belt` centred (390, 170).
- The item picture: `makeTile` 120 × 120 at (360, 170), fill `THEME.colour.surface`, stroke `THEME.colour.line`, label = the picture emoji (72 px) read through `ART[picKey].value`; selected look = library selected + `ANIM.lift`; `ART.letterBadge` centred on it during the cue, letter 26 px `THEME.font.display` `THEME.colour.inkOnAccent` (lowercase).
- Bins: `makeTile` 200 × 130 (`ART.bin` tokens) with `ART.binLetter` upper at (−20, −10) 56 px and lower at (+28, 0) 36 px (`THEME.font.display` `THEME.colour.ink`), `ART.binCount` at (+78, −44); at L3 `ART.bellyDot` on the bowl of the upper letter (B: (+2, −10) relative to the letter centre; D: (+6, −10); P: (+4, −22)) and of the lower letter (b: (+8, +6); d: (−8, +6); p: (+8, −2)).
- `ART.showRing` around the correct bin. Tap floors: picture 120, bins 200 × 130 (≥ 80); gap between bins 80.
- Tab order: the picture, then the left bin, then the right bin.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].pairs` supplies, per level, the letter pairs and the picture keys for each letter. The English (`en`) table is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors must rebuild the pairs from that language's letter names (F-122: which letters are name-initial / name-final differs; German "Vau", Spanish "hache", French "double-vé") and choose pictures whose native name starts with the letter's primary sound (de: "Sonne" S but "Käse" for cheese; es: "sol" S, "queso" Q not C; fi: "aurinko" for sun is A); the mirror pairs B/D and P/B transfer to every Latin-script locale, the pictures do not.

Per letter, the English picture pool (a session draws from these without repeating a picture):
- S: `ART.picSun`, `ART.picSnake`, `ART.picSock`, `ART.picStar` · B: `ART.picBus`, `ART.picBee`, `ART.picBear`, `ART.picBanana`, `ART.picBell` · M: `ART.picMoon`, `ART.picMouse`, `ART.picMonkey`, `ART.picMushroom` · T: `ART.picTree`, `ART.picTiger`, `ART.picTurtle`, `ART.picTent`, `ART.picTomato` · F: `ART.picFish`, `ART.picFox`, `ART.picFrog`, `ART.picFlower` · D: `ART.picDog`, `ART.picDuck`, `ART.picDrum`, `ART.picDonut`, `ART.picDinosaur` · L: `ART.picLion`, `ART.picLemon`, `ART.picLeaf`, `ART.picLock` · P: `ART.picPig`, `ART.picPen`, `ART.picPizza`, `ART.picPear`, `ART.picPenguin` · N: `ART.picNose`, `ART.picNut`, `ART.picNewspaper` · R: `ART.picRabbit`, `ART.picRocket`, `ART.picRainbow`, `ART.picRing`

Pairs by level (the pair in play changes only when the level changes):
- **L1 — one name-initial + one name-final letter, acoustically and visually distinct**: S / B · M / T · F / D · L / P
- **L2 — two name-final letters** (misconception 2); where the pool allows, the stream includes one picture whose name starts with one bin's letter and ENDS with the other's (misconception 4): M / S (trap `ART.picMouse` — starts m, ends s) · F / L (trap `ART.picLeaf` — starts l, ends f) · N / R (no trap picture in the pool) · S / F (no trap picture in the pool)
- **L3 — mirror and voicing pairs with belly dots** (misconception 3): B / D (bins carry `ART.bellyDot`) · P / B (belly dots) · M / N

Stream rule: at each item the game draws a picture from one of the two current letters at random, with at most 2 pictures of the same letter in a row and each letter used at least 4 times per 10 items when a pair lasts the whole session; a picture is never repeated in a session. At L2 the trap picture (mouse for M / S; leaf for F / L) is included once whenever that pair is in play.

Play list: 10 items; start at L1 with a random L1 pair; the pair changes per Rules (a new pair at the new level, sides shuffled); the correct bin's side never repeats more than 3 items running.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3) and a new pair (bins swap with `ANIM.binOut` / `ANIM.appear`). Three, not two: sorts are quick (~12 s).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1) with a new pair from that level.
- What happens on a correct answer: picture glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next picture after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong bin, first sound misjudged (or letter name used as the sound): picture returns, `tone("nudge")`, `ART.letterBadge` with the picture's first letter for 1200 ms while the correct bin's letter `ANIM.pulse`s.
  - Wrong bin because the word ENDS with that letter (mouse into S): the same cue — the badge "m" beside the bins carries the answer.
  - Wrong bin at L3 by mirror confusion (dog into the B bin): the same cue plus `ANIM.pulse` on the correct bin's belly dot.
  - Bin tapped with nothing selected: letter preview `ANIM.pop`; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Letter-Sound Sort". No words on the play screen; the bin letters, badge letters and counts are content.

## Sound
`tone("tap")` on selecting a picture; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 4)` when the pair changes; `tone("finish")` once. Silent under `?sound=off`. Letter sounds are NOT spoken; the picture carries the sound and the badge carries the letter.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: belt, picture and both bins visible and separate).
- [ ] Keyboard operable (Tab: picture, left bin, right bin; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the ring always leads to completion).
- [ ] With bins S and B, the sun tapped then the S bin makes the bin pop and its count go to 1; the sun into the B bin returns it with an "s" badge while the S bin's letter pulses.
- [ ] A bin tapped with nothing selected only pops its letter.
- [ ] The count on a bin rises only on correct sorts.
- [ ] Three first-try sorts in a row swap in two new bins with different letters; a wrong bin brings an easier pair next.
- [ ] At the third level the B and D bins carry a coral dot on the belly side of each letter, and a wrong bin pulses the dot as well as the letter.
- [ ] The same picture never appears twice in a session; the correct bin is not on the same side more than three times running.
- [ ] The finish screen shows the session's bins with their small pictures and no score.
- [ ] With `?sound=off` nothing is audible.
