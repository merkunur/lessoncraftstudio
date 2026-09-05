# 062 — Rhyme Bus

## Identity
- Slug: `rhyme-bus`
- Subject / topic: Literacy / rhyme detection — finding the one of three pictured words that does NOT rhyme with the other two (odd one out)
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three picture tiles)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: **nothing is spoken** (no audio files); each word is carried by a PICTURE whose name the child already knows (A-15). Rhyme families are language-bound and what "rhymes" differs by language (F-126: in French rhyme rests on the final vowel/syllable, in Finnish rhyme plays almost no role in early literacy and syllables carry the awareness work) — every word list lives in `LOCALE_DATA`; the mechanic is universal (F-217).

## Learning
- Objective: Looks at three pictured words, two of which rhyme, and taps the one that does not rhyme.
- Prerequisites: Knows the names of common pictured objects in the play language. No reading — the word labels that appear during feedback are a cue the child may ignore; they never have to be decoded (this is a detection task, so a picture beside a word is allowed here; F-125 applies to decoding tasks only).
- Curriculum links: F-22 (phonological awareness — rhyme — at 5-7 in all twelve systems), F-31 row "Rhyme, syllable clapping" — conservative 6-7, earliest 5 → 5-6 (US RF.K.2.a "recognize and produce rhyming words"; England Reception "rhyme"; Germany Klasse 1 Reime; France GS "rimes"; Spain Infantil rimas; Brazil EF01LP12; Netherlands groep 2 "rijm"; Sweden förskoleklass "rim och ramsor"; Denmark 0. klasse rim; Norway 1. trinn "rim"; Finland esiopetus loruttelu). Demand: F-7 (rhyme-as-concept is universal).
- Common misconceptions (F-126), each with this game's response:
  1. **Matching on the FIRST sound instead of the ending (cat–cow "rhyme" because both start with c).** Response: from L2 the odd one out shares its first sound with one of the rhymers (cat, hat, COW). When the child taps a rhymer, the two rhyming pictures slide together (`ANIM.join`), word labels appear under all three (`ART.wordLabel`) with the RIME letters of the two rhymers coloured `structure` and underlined by `ART.rimeBar`, while the odd word's first letter and the same-onset rhymer's first letter each get an `ART.onsetMark` dot — "same start, different end" shown side by side. 1400 ms, then the labels fade. The child taps again.
  2. **Matching on MEANING (cat–dog, hat–sock: "they go together").** Response: from L3 the odd one out is semantically related to a rhymer (cat, hat, DOG). The same rime cue plays; because the odd word's ending letters are visibly different from the two matching endings, the cue answers the meaning error without words.
  3. **Rhyme detection before production — a child at 5 can HEAR a rhyme but not make one (F-126).** Response: the game never asks the child to produce a rhyme; every item is detection (odd one out) with the answer among three, and the finish screen shows the rhyming pairs found, never asks for more.
  4. **Choosing by position or by the "different-looking" picture.** Response: the odd one's slot is shuffled and never repeats twice running (§13); pictures are the same size and tile style; at L1 the odd word is unrelated but visually similar in category to one rhymer (an animal among animals) so "the odd-looking picture" is not a shortcut.

## How it plays
1. **Start screen**: title "Rhyme Bus", the bus (`ART.bus`) at (360, 200) with the koala driver (`ART.koala`) at (300, 200), Start, picker.
2. **Item 1 (L1: cat, hat, sun)**: rail of 8 dots (§6). Zone A: the bus body (`ART.busBody`, 560 × 150) centred at (360, 170) with the koala driver in the front window (`ART.driverWindow` at (110, 150), `ART.koala` on it) and three passenger windows (`ART.window`, 100 × 100) at x = 260 / 380 / 500, y = 160. Each window is a `makeTile` whose label is one passenger picture (`ART.picCat`, `ART.picHat`, `ART.picSun`), positions shuffled. Wheels (`ART.wheel`) at (200, 252) and (520, 252). No caption; the bus and three faces ARE the prompt ("who doesn't belong?"), and a small `ART.oddMark` (a hollow square-with-gap glyph drawn as a shape) sits on the driver's door at (110, 210) as the constant reminder that ONE passenger must get off.
3. **Answering**: the child taps a window.
   - **Correct (sun)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the sun picture glides down out of the bus (`ANIM.getOff`: y +120, alpha 0 over 400 ms); the two rhymers slide together (`ANIM.join`) and their labels appear with the shared rime highlighted (`ART.wordLabel` "cat" / "hat", rime "at" in `structure` with `ART.rimeBar`) for 900 ms — the rhyme is shown even on success (F-43: feedback carries content); the bus does `ANIM.roll` (x +30 and back, wheels `ANIM.spin`); rail dot fills; next item after 700 ms (`ANIM.appear`).
   - **Wrong (a rhymer, e.g. hat)**: `ANIM.nudge`, `tone("nudge")`, the window de-selects and stays enabled; then the **rime cue**: the two rhymers slide together, all three labels appear, rimes highlighted + `ART.rimeBar` under the two matching endings, `ART.onsetMark` on the first letters when the odd word shares an onset (L2+), 1400 ms, then `ANIM.fadeOut`. Attempt 2.
   - **Second wrong**: the cue again, then show-me: the odd window gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-8**: per Content/Rules. L1 odd word unrelated; L2 odd word shares its first sound with a rhymer; L3 odd word is semantically related to a rhymer, and the rhymers have different spellings of the same rime where English allows (bear / chair) so the child cannot rely on identical letters alone — the rime bar still marks the matching SOUND ending.
5. **Finish**: `t("all_done")` (360, 110); the bus (360, 200) `ANIM.celebrate` with the koala; the summary = the eight rhyming pairs found this session as `ART.pairChip` (120 × 44) in two rows of four from y = 340 (x = 165 / 295 / 425 / 555), each showing the two pictures small (`ART.chipPic`, 28 px) side by side; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  koala:        { kind: "emoji", value: "🐨", size: 64 },
  bus:          { kind: "emoji", value: "🚌", size: 96 },          // start + finish screens only
  busBody:      { kind: "shape", shape: "roundRect", w: 560, h: 150, fill: "structureSoft", stroke: "structure", strokeWidth: 4, radius: 28 },
  driverWindow: { kind: "shape", shape: "roundRect", w: 90, h: 90, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 14 },
  window:       { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  wheel:        { kind: "shape", shape: "circle", r: 22, fill: "ink", stroke: "line", strokeWidth: 4 },
  oddMark:      { kind: "shape", shape: "roundRect", w: 36, h: 36, stroke: "accent", strokeWidth: 4, radius: 6 },   // the "one gets off" glyph on the door
  wordLabel:    { kind: "text",  value: "", size: 28, font: "display", color: "ink" },       // the rime part re-coloured structure at runtime via a second text object
  rimeBar:      { kind: "shape", shape: "rect", w: 44, h: 6, fill: "structure" },            // width set to the rime text width at runtime
  onsetMark:    { kind: "shape", shape: "circle", r: 6, fill: "accent" },
  showRing:     { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:     { kind: "shape", shape: "roundRect", w: 120, h: 44, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  chipPic:      { kind: "text",  value: "", size: 28, font: "body", color: "ink" },          // value = a picture emoji read through ART at runtime
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool — English name in the comment; every name is unambiguous
  picCat:    { kind: "emoji", value: "🐱", size: 60 },   // cat
  picHat:    { kind: "emoji", value: "🎩", size: 60 },   // hat
  picBat:    { kind: "emoji", value: "🦇", size: 60 },   // bat
  picRat:    { kind: "emoji", value: "🐀", size: 60 },   // rat
  picSun:    { kind: "emoji", value: "☀️", size: 60 },   // sun
  picDog:    { kind: "emoji", value: "🐶", size: 60 },   // dog
  picFrog:   { kind: "emoji", value: "🐸", size: 60 },   // frog
  picCow:    { kind: "emoji", value: "🐄", size: 60 },   // cow
  picBee:    { kind: "emoji", value: "🐝", size: 60 },   // bee
  picTree:   { kind: "emoji", value: "🌳", size: 60 },   // tree
  picKey:    { kind: "emoji", value: "🔑", size: 60 },   // key
  picMoon:   { kind: "emoji", value: "🌙", size: 60 },   // moon
  picSpoon:  { kind: "emoji", value: "🥄", size: 60 },   // spoon
  picStar:   { kind: "emoji", value: "⭐", size: 60 },   // star
  picCar:    { kind: "emoji", value: "🚗", size: 60 },   // car
  picBear:   { kind: "emoji", value: "🐻", size: 60 },   // bear
  picPear:   { kind: "emoji", value: "🍐", size: 60 },   // pear
  picChair:  { kind: "emoji", value: "🪑", size: 60 },   // chair (Unicode 12)
  picSnake:  { kind: "emoji", value: "🐍", size: 60 },   // snake
  picCake:   { kind: "emoji", value: "🎂", size: 60 },   // cake
  picFox:    { kind: "emoji", value: "🦊", size: 60 },   // fox
  picBox:    { kind: "emoji", value: "📦", size: 60 },   // box
  picSocks:  { kind: "emoji", value: "🧦", size: 60 },   // socks
  picGoat:   { kind: "emoji", value: "🐐", size: 60 },   // goat
  picBoat:   { kind: "emoji", value: "⛵", size: 60 },   // boat
  picCoat:   { kind: "emoji", value: "🧥", size: 60 },   // coat
  picMouse:  { kind: "emoji", value: "🐭", size: 60 },   // mouse
  picHouse:  { kind: "emoji", value: "🏠", size: 60 },   // house
  picHen:    { kind: "emoji", value: "🐔", size: 60 },   // hen
  picPen:    { kind: "emoji", value: "🖊️", size: 60 },   // pen
  picDuck:   { kind: "emoji", value: "🦆", size: 60 },   // duck
  picTruck:  { kind: "emoji", value: "🚚", size: 60 },   // truck
  picWhale:  { kind: "emoji", value: "🐋", size: 60 },   // whale
  picSnail:  { kind: "emoji", value: "🐌", size: 60 },   // snail
  picBell:   { kind: "emoji", value: "🔔", size: 60 },   // bell
  picShell:  { kind: "emoji", value: "🐚", size: 60 },   // shell
  picClock:  { kind: "emoji", value: "⏰", size: 60 },   // clock
  picLock:   { kind: "emoji", value: "🔒", size: 60 },   // lock
  picNose:   { kind: "emoji", value: "👃", size: 60 },   // nose
  picRose:   { kind: "emoji", value: "🌹", size: 60 },   // rose
  picTrain:  { kind: "emoji", value: "🚂", size: 60 },   // train
  picRain:   { kind: "emoji", value: "🌧️", size: 60 },   // rain
  picSheep:  { kind: "emoji", value: "🐑", size: 60 },   // sheep
  picJeep:   { kind: "emoji", value: "🚙", size: 60 },   // jeep
  picFish:   { kind: "emoji", value: "🐟", size: 60 },   // fish
  picPig:    { kind: "emoji", value: "🐷", size: 60 },   // pig
  picBird:   { kind: "emoji", value: "🐦", size: 60 },   // bird
  picApple:  { kind: "emoji", value: "🍎", size: 60 },   // apple
  picBed:    { kind: "emoji", value: "🛏️", size: 60 },   // bed
  picBread:  { kind: "emoji", value: "🍞", size: 60 },   // bread
  picEgg:    { kind: "emoji", value: "🥚", size: 60 },   // egg
  picLeg:    { kind: "emoji", value: "🦵", size: 60 },   // leg
  picKite:   { kind: "emoji", value: "🪁", size: 60 },   // kite (Unicode 12)
  picLight:  { kind: "emoji", value: "💡", size: 60 }    // light
};
```
No emoji newer than Unicode 12; no `fallback` needed.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct window" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong window" },
  join:      { x: "+=30", duration: 260, ease: "Sine.InOut", yoyo: true, hold: 1100, trigger: "the left rhymer moves right and the right rhymer moves left (−=30) so they touch, hold, and return" },
  getOff:    { y: "+=120", alpha: 0, duration: 400, ease: "Sine.In", trigger: "the odd passenger leaves the bus" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "labels, bars and marks after a cue" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new passengers (from alpha 0, scale 0.6)" },
  roll:      { x: "+=30", duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "bus body after a correct answer" },
  spin:      { angle: 360, duration: 600, ease: "Linear", trigger: "both wheels with roll" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the odd window (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bus" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────────────── busBody (360,170) 560×150 ───────────┐ │
      │   │ [koala]    [ cat ]     [ hat ]     [ sun ]   windows    │ │  zone A
      │   │ (110,150)  x=260       x=380       x=500    y=160 100×100│ │
      │   │  oddMark(110,210)                                       │ │
      │   └─(o)──────────────────────────────────────────(o)────────┘ │
260   ├──── wheels (200,252) (520,252) ──────────────────────────────┤
      │            labels y=300:  "cat"      "hat"      "sun"        │
      │                        rimeBar under "at" "at"               │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. During a cue the two rhymer windows move 30 px toward each other and back; the labels sit at y = 300 under each window's x.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.busBody` centred (360, 170); `ART.driverWindow` at (110, 150) with `ART.koala` on it; `ART.oddMark` at (110, 210); `ART.wheel` at (200, 252) and (520, 252).
- Passenger windows: `makeTile` 100 × 100 (`ART.window` tokens) at (260, 160), (380, 160), (500, 160), label = the picture emoji (60 px) read through `ART[picKey].value`; selected/chosen look per §7.2.
- Cue: `ART.wordLabel` under each window at (x, 300), 28 px `THEME.font.display` `THEME.colour.ink`, the rime letters drawn as a second text object in `THEME.colour.structure` immediately after the onset letters; `ART.rimeBar` under the rime letters at y = 320 (width = rime text width + 8); `ART.onsetMark` 6 px above the first letter at (x − label width / 2 + 8, 282) on the odd word and on the same-onset rhymer (L2+ only).
- `ART.showRing` behind the odd window. Tap floor 100 ≥ 80; gaps 20.
- Tab order: the three windows left to right.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies the two rhymers, the odd word, and the rime spelling to highlight (as a letter count from the end of each rhymer's label). The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors must (a) pick pictures from the ART pool (or add emoji) whose names rhyme in THAT language by that language's rhyme convention (F-126: fr — final vowel/syllable; de/nl/sv/da/no — stressed-vowel-plus-coda as in en; fi — rhyme is rarely taught before 7, so the fi list may be marked "out of scope" and the game hidden for `fi`), (b) rebuild the same-onset and semantic distractors from that language's words, and (c) set the rime letter counts per label.

Each item = (rhymer A, rhymer B; odd; distractor type; rime letters highlighted from the end of A and B).
- **L1 — odd word unrelated, same category look** (F-126 detection first): (`ART.picCat`, `ART.picHat`; `ART.picSun`; neutral; 2) · (`ART.picDog`, `ART.picFrog`; `ART.picBee`; neutral; 2) · (`ART.picMoon`, `ART.picSpoon`; `ART.picFish`; neutral; 3) · (`ART.picStar`, `ART.picCar`; `ART.picPig`; neutral; 2) · (`ART.picBee`, `ART.picTree`; `ART.picDuck`; neutral; 2) · (`ART.picHen`, `ART.picPen`; `ART.picApple`; neutral; 2) · (`ART.picBell`, `ART.picShell`; `ART.picMoon`; neutral; 3) · (`ART.picSnake`, `ART.picCake`; `ART.picBird`; neutral; 3)
- **L2 — odd word shares its FIRST sound with one rhymer** (misconception 1): (`ART.picCat`, `ART.picHat`; `ART.picCow`; onset with cat; 2) · (`ART.picFox`, `ART.picBox`; `ART.picFish`; onset with fox; 2) · (`ART.picFox`, `ART.picSocks`; `ART.picSun`; onset with socks; rime "ox"/"ocks" 2) · (`ART.picGoat`, `ART.picBoat`; `ART.picBee`; onset with boat; 3) · (`ART.picMouse`, `ART.picHouse`; `ART.picMoon`; onset with mouse; 4) · (`ART.picDuck`, `ART.picTruck`; `ART.picDog`; onset with duck; 3) · (`ART.picBat`, `ART.picRat`; `ART.picBed`; onset with bat; 2) · (`ART.picClock`, `ART.picLock`; `ART.picCake`; onset with clock; 3) · (`ART.picSheep`, `ART.picJeep`; `ART.picShell`; onset with sheep; 3) · (`ART.picTrain`, `ART.picRain`; `ART.picTree`; onset with train; 3)
- **L3 — odd word is semantically related to a rhymer; rhymers may spell the rime differently** (misconception 2): (`ART.picCat`, `ART.picHat`; `ART.picDog`; meaning with cat; 2) · (`ART.picBear`, `ART.picChair`; `ART.picFox`; meaning with bear; rime "ear"/"air" 3) · (`ART.picWhale`, `ART.picSnail`; `ART.picFish`; meaning with whale; rime "ale"/"ail" 3) · (`ART.picHen`, `ART.picPen`; `ART.picEgg`; meaning with hen; 2) · (`ART.picNose`, `ART.picRose`; `ART.picLeg`; meaning with nose; 3) · (`ART.picBoat`, `ART.picCoat`; `ART.picCar`; meaning with boat; 3) · (`ART.picBed`, `ART.picBread`; `ART.picChair`; meaning with bed; rime "ed"/"ead" 2) · (`ART.picKite`, `ART.picLight`; `ART.picStar`; meaning with light; rime "ite"/"ight" 3) · (`ART.picPear`, `ART.picBear`; `ART.picApple`; meaning with pear; rime "ear" 3) · (`ART.picKey`, `ART.picBee`; `ART.picLock`; meaning with key; rime "ey"/"ee" 2)

Play list: 8 items; start at L1; levels per Rules; no item repeats in a session; the three windows' order shuffled per item; the odd window's slot never repeats twice running. The pair chips on the finish screen are the eight (A, B) pairs in play order. The word labels use `THEME.font.display` (Baloo 2).

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the odd passenger `ANIM.getOff`, the rhymers `ANIM.join` with their rime labels shown for 900 ms, bus `ANIM.roll` + wheels `ANIM.spin`, rail dot fills, next item after 700 ms.
- What happens on a wrong answer:
  - A rhymer tapped, odd word unrelated (L1 — guessed): `ANIM.nudge`, `tone("nudge")`, the rime cue (rhymers join, labels, rime bars) for 1400 ms.
  - A rhymer tapped, odd word shares an onset (L2 — matched on the first sound): nudge + tone, the rime cue PLUS `ART.onsetMark` on the two same-onset first letters.
  - A rhymer tapped, odd word related in meaning (L3 — matched on meaning): nudge + tone, the rime cue; the two matching rime bars beside the odd word's unbarred ending carry the answer.
  - Same window tapped twice in a row: the second tap is ignored during the cue (windows are `setEnabled(false)` while the 1400 ms cue plays, then re-enabled).
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the odd window; solved-with-help. No attempt 4.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Rhyme Bus". The word labels are locale content (from `LOCALE_DATA`), not UI copy; no other text on the play screen.

## Sound
`tone("tap")` when a window is tapped; `tone("correct")` on the odd one out; `tone("nudge")` on a rhymer; `tone("tap", 3)` then `tone("tap", 3)` again, 250 ms apart, as the two rhymers join (the same note twice = "same ending", a content tone per F-213); `tone("finish")` once. Silent under `?sound=off`. Words are NOT spoken; the pictures carry them.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` with no crash while native lists are pending; the reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: the whole bus with three separate windows is visible).
- [ ] Keyboard operable (Tab across the three windows, Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the ring always completes the item).
- [ ] With cat / hat / sun, tapping the sun makes it leave the bus, and "cat" and "hat" appear under the two remaining windows with "at" coloured and underlined in both.
- [ ] Tapping the hat instead nudges it and shows all three labels with the two "at" endings underlined and "sun" without a bar.
- [ ] At the second level (cat / hat / cow) a wrong tap also shows a dot above the c of "cat" and the c of "cow".
- [ ] At the third level bear / chair are accepted as rhymers although spelt differently, and the bars sit under "ear" and "air".
- [ ] The odd window is never in the same slot twice in a row.
- [ ] Two first-try corrects in a row bring a same-onset distractor; a wrong tap brings an unrelated one back.
- [ ] The finish screen shows eight pair chips with two small pictures each and no score.
- [ ] With `?sound=off` nothing is audible.
