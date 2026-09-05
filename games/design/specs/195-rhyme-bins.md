# 195 — Rhyme Bins

## Identity
- Slug: `rhyme-bins`
- Subject / topic: Literacy / rhyme families — sorting pictures one at a time into the bin whose head picture rhymes with the picture's name
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the picture, then tap a bin; one picture at a time)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (2 bins for 5-6, one item at a time; a wrong bin refuses gently and the bin's rule icon pulses; 3rd wrong → the correct bin pulses). Locale note: **nothing is spoken** (no audio files); each item is a PICTURE whose name the child says in their head, and each bin is headed by a PICTURE of its rhyme family (F-126: rhyme detection is a 5-6 skill; production is 6-8). Which pictures rhyme is entirely language-bound (F-126 "word lists must be native-authored"; A-15) and is stored in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native list (en pilot). Sibling of game 144 (pair two rhyming pictures); here the child decides BETWEEN two families.

## Learning
- Objective: Sorts pictures one at a time into the bin whose head picture rhymes with the picture's name, choosing between two rhyme families and resisting a picture that starts with the same sound as the wrong family's head.
- Prerequisites: Knows the names of common pictured objects in the play language; has met rhyme as "sounds the same at the end" (game 144 or classroom). No reading; the rime letters shown on error are a visual cue, not a reading task.
- Curriculum links: F-22 (phonological awareness — rhyme, syllables, initial sounds — at 5-7 in all twelve systems), F-24 (rhyme is a universal pre-reading skill across the reading-method families), F-31 row "Rhyme / syllables (phonological awareness)" — conservative 6-7, earliest 4 → 5-6 (US RF.K.2.a "recognize and produce rhyming words"; England Reception "rhyme"; Germany Klasse 1 "Reime erkennen"; France GS "rimes"; Spain Infantil "conciencia fonológica: rimas"; Brazil EF01LP07 "rimas"; Netherlands groep 2 "rijmen"; Sweden förskoleklass "rim"; Denmark 0. klasse "rim"; Norway 1. trinn "rim"; Finland esiopetus "riimit"). Demand: F-7 (rhyme is a universal-demand literacy topic).
- Common misconceptions (F-126, F-122), each with this game's response:
  1. **Matches on the FIRST sound instead of the last part (bat goes with bug because both start with b) — the same-onset decoy.** Response: L2 streams one decoy per family pair whose name starts like the WRONG bin's head but rhymes with the other (bat for the cat / bug pair; boat for the bear / goat pair; rock for the sock / ring pair; spoon for the moon / star pair; key for the bee / cake pair; pen for the hen / pan pair). A wrong bin makes the picture glide back and its word appear under it with the rime letters in coral (`ART.rimeWord`: "b" in ink, "at" in accent) while BOTH bin heads show their own words the same way (`ART.binWord`: "c·at" and "b·ug") — the child sees that the coral part matches the cat bin, not the bug bin, even without reading (same letters, same colour, same place).
  2. **Matches on meaning (cat goes with dog because both are pets) — F-126.** Response: L1 pairs are chosen so the two families are semantically mixed (cat / dog is an L1 PAIR, so a cat-family item like "hat" cannot be sorted by pet-ness); the rime cue on error shows that "hat" ends like "cat".
  3. **Cannot hear the rime when only the final consonant differs (cat / pan; sock / dog; bug / sun).** Response: these pairs are L3 only, after success at L1-L2; the rime cue colours the whole rime, so the differing final letter is visibly different (at vs an) — the cue is the same, the pairs are harder.
  4. **Sorts by the bin's position (always the left bin).** Response: bin sides are shuffled when the pair changes, the correct bin never sits on the same side more than 3 items running, and both bin counts rise visibly.
  5. **Says a different name for the picture (calls the hat a "cap").** Response: the picture pool uses objects whose English name is the common one and unambiguous in shape; on a wrong bin the word appears under the picture, which fixes the intended name; a native author picks the unambiguous names for their locale.

## How it plays
1. **Start screen**: title "Rhyme Bins", the frog (`ART.frog`) at (360, 200), Start, picker.
2. **Item 1 (L1 pair cat / dog; first picture: hat)**: rail of 10 dots (§6). Zone A: a conveyor strip (`ART.belt`) across y = 170 with the frog at (80, 170); the first picture slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 with `ART.picHat` (72 px) as its label. Zone B: two bins (`ART.bin`, 200 × 130) at (220, 390) and (500, 390); on each bin's front its head picture at 64 px (`ART.picCat` on one, `ART.picDog` on the other) inside a small frame (`ART.headFrame`) and a count (`ART.binCount`, "0") in the corner. No caption — the two head pictures are the whole prompt.
3. **Sorting**: tap the picture (it lifts: `ANIM.lift`, `tone("tap")`), then tap a bin. The picture glides (`ANIM.glide`) into the bin.
   - **Correct bin (cat)**: the bin `ANIM.pop`, its count goes 0 → 1, `tone("correct")`; every third correct sort plays a praise pop (rotation); the rail dot fills; the next picture slides in after 400 ms.
   - **Wrong bin (dog)**: the picture glides back to the centre, `tone("nudge")`; `ART.rimeWord` ("hat" with "at" in coral) appears under the picture, `ART.binWord` appears under each head picture ("cat" with "at" in coral; "dog" with "og" in coral), and the correct bin's head `ANIM.pulse`s — all for 1200 ms (`ANIM.markIn`), then the words fade. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains `ART.showRing` with `ANIM.showMe` (show-me); placing the picture there completes the item as solved-with-help.
   - **Tapping a bin with nothing selected**: the bin's head picture `ANIM.pop`s (a harmless preview); nothing else.
4. **Pair changes**: when the level changes (Rules), the bins `ANIM.binOut` (drop and fade) and two new bins `ANIM.appear` with the new head pictures, sides shuffled; the counts restart at 0; `tone("tap", 4)`.
5. **Items 2-10**: per Content/Rules. L1 pairs with different vowels and no decoy; L2 pairs with a same-onset decoy in the stream; L3 pairs that share the vowel and differ only in the final consonant.
6. **Finish**: `t("all_done")` (360, 110); the frog (360, 200) `ANIM.celebrate`; the summary = the session's bins in a row at y = 400 (up to 6 bins as `ART.binMini`, 96 × 72, x from 360 − (n−1) × 56) each showing its head picture (28 px) and the pictures it received as small emoji (`ART.miniPic`, 20 px) along its bottom — the sorted rhyme families; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  frog:       { kind: "emoji", value: "🐸", size: 80 },
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  bin:        { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  binMini:    { kind: "shape", shape: "roundRect", w: 96, h: 72, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  headFrame:  { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 12 },
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  rimeWord:   { kind: "text",  value: "", size: 30, font: "display", color: "ink" },        // onset in ink, rime drawn as a second text object in accent
  binWord:    { kind: "text",  value: "", size: 22, font: "display", color: "ink" },        // same two-part drawing under each bin head
  miniPic:    { kind: "text",  value: "", size: 20, font: "body", color: "ink" },           // value = a picture emoji read through ART at runtime
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool — English name in the comment; family heads and members (72 px on the belt, 64 px as a bin head)
  picCat:     { kind: "emoji", value: "🐱", size: 72 },   // cat (-at head)
  picHat:     { kind: "emoji", value: "🎩", size: 72 },   // hat
  picBat:     { kind: "emoji", value: "🦇", size: 72 },   // bat (decoy for the bug bin: starts with b)
  picRat:     { kind: "emoji", value: "🐀", size: 72 },   // rat
  picDog:     { kind: "emoji", value: "🐶", size: 72 },   // dog (-og head)
  picFrogPic: { kind: "emoji", value: "🐸", size: 72 },   // frog (a member, drawn smaller than the mascot; the same glyph)
  picLog:     { kind: "emoji", value: "🪵", size: 72, fallback: "🌳" },   // log (Unicode 13 → tree fallback)
  picFog:     { kind: "emoji", value: "🌫️", size: 72 },   // fog
  picBug:     { kind: "emoji", value: "🐛", size: 72 },   // bug (-ug head)
  picMug:     { kind: "emoji", value: "☕", size: 72 },   // mug
  picHug:     { kind: "emoji", value: "🤗", size: 72 },   // hug
  picPlug:    { kind: "emoji", value: "🔌", size: 72 },   // plug
  picBee:     { kind: "emoji", value: "🐝", size: 72 },   // bee (-ee head)
  picTree:    { kind: "emoji", value: "🌳", size: 72 },   // tree
  picKey:     { kind: "emoji", value: "🔑", size: 72 },   // key (decoy for the cake bin: starts with the k sound)
  picKnee:    { kind: "emoji", value: "🦵", size: 72 },   // knee (Unicode 11)
  picCake:    { kind: "emoji", value: "🎂", size: 72 },   // cake (-ake head)
  picSnake:   { kind: "emoji", value: "🐍", size: 72 },   // snake
  picLake:    { kind: "emoji", value: "🏞️", size: 72 },   // lake
  picStar:    { kind: "emoji", value: "⭐", size: 72 },   // star (-ar head)
  picCar:     { kind: "emoji", value: "🚗", size: 72 },   // car
  picGuitar:  { kind: "emoji", value: "🎸", size: 72 },   // guitar
  picMoon:    { kind: "emoji", value: "🌙", size: 72 },   // moon (-oon head)
  picSpoon:   { kind: "emoji", value: "🥄", size: 72 },   // spoon (decoy for the star bin: starts with s)
  picBalloon: { kind: "emoji", value: "🎈", size: 72 },   // balloon
  picRaccoon: { kind: "emoji", value: "🦝", size: 72 },   // raccoon (Unicode 11)
  picBear:    { kind: "emoji", value: "🐻", size: 72 },   // bear (-air head)
  picChair:   { kind: "emoji", value: "🪑", size: 72 },   // chair (Unicode 12)
  picPear:    { kind: "emoji", value: "🍐", size: 72 },   // pear
  picGoat:    { kind: "emoji", value: "🐐", size: 72 },   // goat (-oat head)
  picBoat:    { kind: "emoji", value: "⛵", size: 72 },   // boat (decoy for the bear bin: starts with b)
  picCoat:    { kind: "emoji", value: "🧥", size: 72 },   // coat (Unicode 11)
  picNote:    { kind: "emoji", value: "🎵", size: 72 },   // note
  picSock:    { kind: "emoji", value: "🧦", size: 72 },   // sock (-ock head)
  picLock:    { kind: "emoji", value: "🔒", size: 72 },   // lock
  picClock:   { kind: "emoji", value: "⏰", size: 72 },   // clock
  picRock:    { kind: "emoji", value: "🪨", size: 72, fallback: "🗿" },  // rock (Unicode 13 → stone-head fallback; decoy for the ring bin: starts with r)
  picRing:    { kind: "emoji", value: "💍", size: 72 },   // ring (-ing head)
  picKing:    { kind: "emoji", value: "🤴", size: 72 },   // king
  picString:  { kind: "emoji", value: "🧵", size: 72 },   // string (Unicode 11)
  picSing:    { kind: "emoji", value: "🎤", size: 72 },   // sing
  picHen:     { kind: "emoji", value: "🐔", size: 72 },   // hen (-en head)
  picPen:     { kind: "emoji", value: "🖊️", size: 72 },   // pen (decoy for the pan bin: starts with p)
  picTen:     { kind: "emoji", value: "🔟", size: 72 },   // ten
  picPan:     { kind: "emoji", value: "🍳", size: 72 },   // pan (-an head)
  picVan:     { kind: "emoji", value: "🚐", size: 72 },   // van
  picCan:     { kind: "emoji", value: "🥫", size: 72 },   // can (Unicode 10)
  picMan:     { kind: "emoji", value: "👨", size: 72 },   // man
  picSun:     { kind: "emoji", value: "☀️", size: 72 },   // sun (-un head)
  picRun:     { kind: "emoji", value: "🏃", size: 72 },   // run
  picOne:     { kind: "emoji", value: "1️⃣", size: 72 }    // one
};
```
`picLog` and `picRock` are Unicode 13 (2020) and carry fallbacks; every other glyph is Unicode 12 or older. The frog mascot and the frog member use the same glyph at different sizes through two ART entries so the art upgrade can separate them.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new picture from x = 760 to the centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "picture selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "picture to a bin / back to the centre (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct picture; bin head preview tap" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's head after a wrong bin" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "rimeWord under the picture + binWords under the heads (from alpha 0)" },
  binOut:    { y: "+=40", alpha: 0, duration: 300, ease: "Sine.In", trigger: "old bins when the pair changes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new bins (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish frog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ frog(80,170) ════════════ belt y=170 ════════════ picture in→ │  zone A
      │                        [ picture (360,170) ] 120×120          │
      │                          "h·at"  (360,246) on error only      │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌──────────────┐              ┌──────────────┐           │
      │      │ [cat]      0 │              │ [dog]      0 │  bins     │  zone B
      │      │  (220,390)   │              │  (500,390)   │  200×130  │
      │      └──"c·at"──────┘              └──"d·og"──────┘  words on error only
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. [cat] / [dog] = the head pictures in `ART.headFrame`.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22, y = 28) → `ART.dotFull`.
- `ART.frog` (80, 170); `ART.belt` centred (390, 170).
- The item picture: `makeTile` 120 × 120 at (360, 170), fill `THEME.colour.surface`, stroke `THEME.colour.line`, label = the picture emoji (72 px) read through `ART[picKey].value`; selected look = library selected + `ANIM.lift`. During a cue `ART.rimeWord` is drawn at (360, 246): the onset as one text object in `THEME.colour.ink` and the rime as a second text object in `THEME.colour.accent`, 30 px `THEME.font.display`, placed side by side so they read as one word (a 4 px gap).
- Bins: `makeTile` 200 × 130 (`ART.bin` tokens) with `ART.headFrame` at (−30, −6) holding the head picture at 64 px; `ART.binCount` at (+78, −44); during a cue `ART.binWord` at (−30, +48) drawn the same two-part way at 22 px.
- `ART.showRing` around the correct bin. Tap floors: picture 120, bins 200 × 130 (≥ 80); gap between bins 80.
- Tab order: the picture, then the left bin, then the right bin. During a cue (1.2 s) bins are `setEnabled(false)`.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].pairs` supplies, per level, the family pairs: `{ headA: <ART key>, rimeA: "at", membersA: [...], headB: <ART key>, rimeB: "og", membersB: [...], decoy: { pic: <ART key>, belongs: "A" | "B" } | null, words: { picKey: ["h", "at"], ... } }`. `words` gives every picture's name split as onset + rime for the cue. The English (`en`) table is authored in full below. **Other locales: a native word list is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Native authors must rebuild every family from their language's own rhymes (the English families do not transfer: cat / hat is Katze / Hut in German, gato / pato in Spanish) and choose pictures from the pool — or add emoji to it — whose native name rhymes; each L2 pair needs its own same-onset decoy.

English families (head first; word split onset · rime):
- **-at**: `ART.picCat` (c·at) · `ART.picHat` (h·at) · `ART.picBat` (b·at) · `ART.picRat` (r·at)
- **-og**: `ART.picDog` (d·og) · `ART.picFrogPic` (fr·og) · `ART.picLog` (l·og) · `ART.picFog` (f·og)
- **-ug**: `ART.picBug` (b·ug) · `ART.picMug` (m·ug) · `ART.picHug` (h·ug) · `ART.picPlug` (pl·ug)
- **-ee**: `ART.picBee` (b·ee) · `ART.picTree` (tr·ee) · `ART.picKey` (k·ey) · `ART.picKnee` (kn·ee)
- **-ake**: `ART.picCake` (c·ake) · `ART.picSnake` (sn·ake) · `ART.picLake` (l·ake)
- **-ar**: `ART.picStar` (st·ar) · `ART.picCar` (c·ar) · `ART.picGuitar` (guit·ar)
- **-oon**: `ART.picMoon` (m·oon) · `ART.picSpoon` (sp·oon) · `ART.picBalloon` (ball·oon) · `ART.picRaccoon` (racc·oon)
- **-air**: `ART.picBear` (b·ear) · `ART.picChair` (ch·air) · `ART.picPear` (p·ear)
- **-oat**: `ART.picGoat` (g·oat) · `ART.picBoat` (b·oat) · `ART.picCoat` (c·oat) · `ART.picNote` (n·ote)
- **-ock**: `ART.picSock` (s·ock) · `ART.picLock` (l·ock) · `ART.picClock` (cl·ock) · `ART.picRock` (r·ock)
- **-ing**: `ART.picRing` (r·ing) · `ART.picKing` (k·ing) · `ART.picString` (str·ing) · `ART.picSing` (s·ing)
- **-en**: `ART.picHen` (h·en) · `ART.picPen` (p·en) · `ART.picTen` (t·en)
- **-an**: `ART.picPan` (p·an) · `ART.picVan` (v·an) · `ART.picCan` (c·an) · `ART.picMan` (m·an)
- **-un**: `ART.picSun` (s·un) · `ART.picRun` (r·un) · `ART.picOne` (·one)
(The rime colouring follows SOUND, so "key", "bear", "pear", "note" and "one" colour their spelt ending; the cue is a same-place, same-colour match, never a spelling lesson.)

Pairs by level (the pair in play changes only when the level changes):
- **L1 — different vowels, no decoy**: cat / dog · bee / star · sun / bear · moon / cake
- **L2 — with a same-onset decoy** (misconception 1): cat / bug (decoy `ART.picBat` → cat) · bear / goat (decoy `ART.picBoat` → goat) · sock / ring (decoy `ART.picRock` → sock) · moon / star (decoy `ART.picSpoon` → moon) · bee / cake (decoy `ART.picKey` → bee) · hen / pan (decoy `ART.picPen` → hen)
- **L3 — same vowel, final consonant differs** (misconception 3): cat / pan · sock / dog · bug / sun

Stream rule: at each item the game draws a member (never a head) from one of the two current families at random, with at most 2 pictures of the same family in a row and each family used at least 4 times per 10 items when a pair lasts the whole session; a picture is never repeated in a session. At L2 the decoy is included exactly once whenever that pair is in play, never as the first item of the pair.

Play list: 10 items; start at L1 with a random L1 pair; the pair changes per Rules (a new pair at the new level, sides shuffled); the correct bin's side never repeats more than 3 items running.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3) and a new pair (bins swap with `ANIM.binOut` / `ANIM.appear`). Three, not two: sorts are quick (~12 s).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1) with a new pair from that level.
- What happens on a correct answer: picture glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next picture after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong bin by first sound (bat into the bug bin — the decoy): picture returns, `tone("nudge")`, `ART.rimeWord` "b·at" under the picture and `ART.binWord`s under both heads for 1200 ms while the cat bin's head `ANIM.pulse`s.
  - Wrong bin by meaning (hat into the dog bin because a dog wears it, or any other wrong family): the same cue — the coral rime under the picture matches the coral rime under the correct head.
  - Wrong bin on a same-vowel pair at L3 (rat into the pan bin): the same cue; the two rimes differ in their last letter, both visible.
  - Bin tapped with nothing selected: head `ANIM.pop`; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Rhyme Bins". No words on the play screen except the on-error rime words, which are content (locale data), not UI copy.

## Sound
`tone("tap")` on selecting a picture; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 4)` when the pair changes; `tone("finish")` once. Silent under `?sound=off`. Words are NOT spoken; the picture carries the word and the coral rime carries the cue.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: belt, picture and both bins visible and separate; the on-error words fit under the picture and heads).
- [ ] Keyboard operable (Tab: picture, left bin, right bin; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the ring always leads to completion).
- [ ] With bins cat and dog, the hat tapped then the cat bin makes the bin pop and its count go to 1; the hat into the dog bin returns it and shows "hat" with "at" in coral under it while "cat" and "dog" appear under the bin heads with their endings in coral and the cat head pulses.
- [ ] At the second level with bins cat and bug, the bat appears once and, put into the bug bin, returns with "b" in ink and "at" in coral.
- [ ] A bin tapped with nothing selected only pops its head picture.
- [ ] The count on a bin rises only on correct sorts.
- [ ] Three first-try sorts in a row swap in two new bins with different head pictures; a wrong bin brings an easier pair next.
- [ ] At the third level the two families share a vowel (cat / pan) and the two coral rimes differ in their last letter.
- [ ] If the log or rock emoji is missing on the device a tree or a stone head appears instead.
- [ ] The same picture never appears twice in a session; the correct bin is not on the same side more than three times running.
- [ ] The finish screen shows the session's bins with their small pictures and no score.
- [ ] With `?sound=off` nothing is audible.
