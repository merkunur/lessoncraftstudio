# 087 — Plural Parade

## Identity
- Slug: `plural-parade`
- Subject / topic: Literacy / singular and plural noun forms — reading the word form (dog / dogs, box / boxes, mouse / mice) and sorting it as "one" or "many"
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the word card, then tap the "one" bin or the "many" bin; the bin answers with a picture of that many)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (two bins, one item at a time; a wrong bin refuses gently and the hint names the feature). Locale note: the nouns, their plural forms, the ending that is marked, and the two bin labels are language-bound (F-7: plural -s is English-specific; F-128: morphology differs — German umlaut plurals, French silent -s, Finnish -t, Swedish -ar/-or/-er/-n) and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15). The mechanic — a word card, a bin that shows ONE picture and a bin that shows THREE, the ending lit on error — is universal.

## Learning
- Objective: Reads a noun card and sorts it into the "one" bin or the "many" bin by its word form alone, including forms that end in -es / -ies, singular words that happen to end in s, and irregular plurals.
- Prerequisites: Reads simple words (6-8 decoding); knows the pictured objects; understands one vs many (5-6 core).
- Curriculum links: F-22 (grammar of number is in the 6-8 language strand of the systems that teach explicit grammar early — EN/FR/DE/ES/IT — and in the reading/spelling strand elsewhere), F-128 (morphology and sentence conventions by 8), F-31 row "Capital + full stop; sentence order" (conservative 7-8) as the nearest grammar row → 6-8 (US L.K.1.c "form regular plural nouns orally by adding /s/ or /es/", L.1.1.c "use singular and plural nouns", L.2.1.b "irregular plural nouns (feet, children, teeth, mice, fish)"; England Y1 "regular plural noun suffixes -s or -es"; France CP-CE1 "le nombre: singulier / pluriel"; Germany Klasse 1-2 "Einzahl und Mehrzahl"; Spain 1º "singular y plural"; Italy classe 1ª-2ª "singolare e plurale"; Netherlands groep 4 "enkelvoud en meervoud"; Brazil EF02LP "singular e plural"; Sweden åk 1-3 "substantiv: singular och plural"). Market note: the ENGLISH list is the pilot; every locale's forms are its own.
- Common misconceptions (F-128, F-125, F-7), each with this game's response:
  1. **Reading the stem and ignoring the ending ("dogs" sorted as one).** Response: the "one" bin shows what it means — ONE dog (`ANIM.showCount` of the noun's picture ×1) — while the card's ending lights (`ART.suffixMark`, a coral underline under the -s) and the card nudges back; the mismatch between one picture and a lit -s is the lesson.
  2. **"Every word ending in s is many" (bus, dress, glass sorted as many).** Response: for these trap words the "many" bin shows THREE buses against the word "bus"; the WHOLE word gets `ART.stemLine` (a teal underline, no coral ending) and the pair card (`ART.pairCard`) shows "bus → buses" for 1500 ms — the s is part of the word, the plural adds more.
  3. **Irregular plurals sorted as one because there is no -s ("mice", "feet", "children").** Response: the "one" bin shows one mouse against the word "mice"; the pair card shows "mouse → mice"; the ending mark is not used (there is no suffix to mark — the whole form changes, `ART.stemLine` under the whole word).
  4. **Unchanged plurals (sheep, fish) cannot be decided from the word.** Response: cards for these nouns ALWAYS carry the picture beside the word (one sheep or three sheep at 28 px on the card — `ART.cardPic`), so the child sorts by the picture and the pair card afterwards shows "sheep → sheep": the word does not change.
  5. **Position habit — always the same bin.** Response: the bins swap sides at every level change (`ANIM.swapSides`); no more than two consecutive cards go to the same bin; after two wrong bins the show-me ring identifies the bin.

## How it plays
1. **Start screen**: title "Plural Parade", the flamingo (`ART.flamingo`) at (360, 200) with two small flamingos (`ART.flamingo` at 36 px) at (300, 250) and (420, 250) — one and many — Start, picker.
2. **Card 1 (L1: "dogs")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the parade line (`ART.road`, a long bar at y = 200); the flamingo leads at (80, 170); the word card (`ART.wordCard`, 220 × 96, `makeTile`) slides in (`ANIM.slideIn`) to (360, 150) showing "dogs" at 32 px. Zone B: two bins (`ART.bin`, 220 × 150, `makeTile`) at y = 390, x = 200 and 520. The left bin shows `ART.oneIcon` (one square) at its top with the label `LOCALE_DATA[lang].labelOne` ("one", 24 px) under it; the right bin shows `ART.manyIcon` (three squares) with `labelMany` ("many"). Each bin has a collected column (`ART.binList`) where sorted words stack at 16 px. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Sorting**: tap the card (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The card glides (`ANIM.glide`) to the bin's top edge (bin x, 300).
   - **Correct bin ("many")**: the bin shows the noun's picture three times (`ART.dog` at 40 px, x = bin x − 48 / bin x / bin x + 48, y = 330, `ANIM.showCount`, `tone("tap", k)` per picture), `tone("correct")`, the card shrinks into the bin's list (`ANIM.intoList`) and "dogs" is written on the list at 16 px; every third correct card plays a praise pop; the rail dot fills; the pictures fade after 800 ms and the next card slides in.
   - **Wrong bin ("one")**: the bin shows ONE dog (`ANIM.showCount`), `tone("nudge")`; the card's ending lights (`ART.suffixMark` under "s", `ANIM.cueIn`); the card glides back to (360, 150) with `ANIM.nudge`; the feedback line shows `t("look_carefully")`. Attempt 2.
   - **Second wrong bin**: the count and the cue again, plus `ART.pairCard` ("dog → dogs") at (360, 250) for 1500 ms; then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the card there completes it as solved-with-help.
   - Tapping a bin with no card selected: the bin's icon `ANIM.pop`s (harmless preview).
4. **Cards 2-12**: per Content/Rules. L1 regular -s pairs; L2 -es / -ies forms and the s-ending singular traps; L3 irregular plurals, f → ves forms and the unchanged nouns (with pictures on the card). At each level change the bins swap sides.
5. **Finish**: `t("all_done")` (360, 110); the flamingo (360, 200) `ANIM.celebrate`; the summary = the two bins at (200, 400) and (520, 400) with their full lists — the words the child sorted, grouped as one and many — with a filled `ART.dotFull` beside each first-try word and a hollow `ART.dotEmpty` beside a helped one; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  flamingo:   { kind: "emoji", value: "🦩", size: 72 },   // Unicode 12 — no fallback needed
  road:       { kind: "shape", shape: "roundRect", w: 600, h: 18, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 9 },
  wordCard:   { kind: "shape", shape: "roundRect", w: 220, h: 96, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },   // word 32 px display ink
  cardPic:    { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface2", radius: 8 },   // holds the noun's picture(s) at 28 px on unchanged-plural cards (right end of the card)
  suffixMark: { kind: "shape", shape: "roundRect", w: 24, h: 6, fill: "accent", radius: 3 },       // under the ending; w = 24 per suffix letter
  stemLine:   { kind: "shape", shape: "roundRect", w: 120, h: 6, fill: "structure", radius: 3 },   // under the whole word; w = word width
  pairCard:   { kind: "shape", shape: "roundRect", w: 300, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 12 },   // "dog → dogs" 24 px display structure
  bin:        { kind: "shape", shape: "roundRect", w: 220, h: 150, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  oneIcon:    { kind: "shape", shape: "rect", w: 22, h: 22, fill: "structure" },                    // one square
  manyIcon:   { kind: "shape", shape: "rect", w: 22, h: 22, fill: "structure" },                    // drawn three times, 28 px apart
  binList:    { kind: "shape", shape: "roundRect", w: 200, h: 70, fill: "surface2", radius: 8 },   // the bin's word list, 16 px body ink, up to 6 rows of 3 across
  showRing:   { kind: "shape", shape: "roundRect", w: 232, h: 162, stroke: "structure", strokeWidth: 4, radius: 20 },
  // noun pictures — the comment is the singular word
  dog:       { kind: "emoji", value: "🐶", size: 40 },   // dog
  cat:       { kind: "emoji", value: "🐱", size: 40 },   // cat
  frog:      { kind: "emoji", value: "🐸", size: 40 },   // frog
  pig:       { kind: "emoji", value: "🐷", size: 40 },   // pig
  star:      { kind: "emoji", value: "⭐", size: 40 },   // star
  tree:      { kind: "emoji", value: "🌳", size: 40 },   // tree
  hat:       { kind: "emoji", value: "🎩", size: 40 },   // hat
  ball:      { kind: "emoji", value: "⚽", size: 40 },   // ball
  box:       { kind: "emoji", value: "📦", size: 40 },   // box
  fox:       { kind: "emoji", value: "🦊", size: 40 },   // fox
  bus:       { kind: "emoji", value: "🚌", size: 40 },   // bus
  dress:     { kind: "emoji", value: "👗", size: 40 },   // dress
  glass:     { kind: "emoji", value: "🥛", size: 40 },   // glass
  peach:     { kind: "emoji", value: "🍑", size: 40 },   // peach
  butterfly: { kind: "emoji", value: "🦋", size: 40 },   // butterfly
  cherry:    { kind: "emoji", value: "🍒", size: 40 },   // cherry
  mouse:     { kind: "emoji", value: "🐭", size: 40 },   // mouse
  foot:      { kind: "emoji", value: "🦶", size: 40 },   // foot (Unicode 11)
  tooth:     { kind: "emoji", value: "🦷", size: 40 },   // tooth (Unicode 11)
  child:     { kind: "emoji", value: "🧒", size: 40 },   // child (Unicode 10)
  leaf:      { kind: "emoji", value: "🍃", size: 40 },   // leaf
  wolf:      { kind: "emoji", value: "🐺", size: 40 },   // wolf
  sheep:     { kind: "emoji", value: "🐑", size: 40 },   // sheep
  fish:      { kind: "emoji", value: "🐟", size: 40 },   // fish
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. A bin's count picture is the noun's entry drawn once (the "one" bin) or three times (the "many" bin) at 40 px; on unchanged-plural cards the same entry is drawn at 28 px inside `ART.cardPic`.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new card from x = 760 to the parade centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to a bin's top / back to centre (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "card arriving back after a wrong bin" },
  showCount: { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each count picture above a bin (from alpha 0, scale 0.5), 150 ms apart; all fade with fadeOut after 800 ms (correct) or 1500 ms (wrong)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "count pictures, cues and the pair card" },
  cueIn:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "suffixMark / stemLine under the word (from alpha 0); pairCard (from alpha 0)" },
  intoList:  { scale: 0.3, alpha: 0, duration: 300, ease: "Sine.In", trigger: "the card shrinks into the bin as its word is written on the list" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin icon on an empty-handed tap; bin on a correct card" },
  swapSides: { duration: 400, ease: "Sine.InOut", trigger: "both bins exchange x at a level change (x set at call)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish flamingo" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ flamingo(80,170)      ┌──────────────┐                        │
      │                       │    dogs      │  wordCard (360,150)   │  zone A
      │ ═══════════ road y=200 ═══════════════════════════════════   │
      │            pairCard "dog → dogs" (360,250) on 2nd wrong      │
260   ├──────────────────────────────────────────────────────────────┤
      │      count pictures y=330 above the tapped bin               │
      │   ┌──────────┐                       ┌──────────┐            │
      │   │ ■  one   │  (200,390)            │■■■ many  │ (520,390)  │  zone B
      │   │ list…    │  220×150              │ list…    │            │
      │   └──────────┘                       └──────────┘            │
480   ├──────────────────────────────────────────────────────────────┤
      │                 feedback line (360,500)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The bins swap x at each level change (the icons and labels travel with them).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.flamingo` at (80, 170); `ART.road` centred (390, 200).
- Card: `makeTile` 220 × 96 with `ART.wordCard` tokens at (360, 150); the word 32 px `THEME.font.display` `THEME.colour.ink` centred (or left-shifted by 30 px when `ART.cardPic` is present at the card's right end (+80, 0) with the picture(s) at 28 px inside it — one picture or three at pitch 18). `ART.suffixMark` under the ending letters (x = the ending's centre, y = +30 on the card; width 24 × suffix length); `ART.stemLine` under the whole word (width = measured word width).
- `ART.pairCard` at (360, 250) with "singular → plural" at 24 px `THEME.font.display` `THEME.colour.structure`.
- Bins: `makeTile` 220 × 150 with `ART.bin` tokens at (200, 390) and (520, 390); `ART.oneIcon` at (0, −52) / three `ART.manyIcon` at (−28, −52), (0, −52), (+28, −52); the label at (0, −22) 24 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 200; `ART.binList` at (0, +32) with words at 16 px `THEME.font.body` `THEME.colour.ink` in rows of three (x = −64 / 0 / +64), up to two rows.
- Count pictures at y = 330 above the tapped bin (x = bin x for one; bin x − 48 / bin x / bin x + 48 for three).
- `ART.showRing` behind the correct bin. Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors: card 220 × 96, bins 220 × 150 (≥ 56); gap between bins 100. Keyboard: Tab order = card, left bin, right bin; Enter selects / places.

## Content
Language-bound: `LOCALE_DATA[lang]` = `{ labelOne, labelMany, nouns }`. `en` authored in full. **Other locales: a native list is required — en pilot.** Until a native list exists, `LOCALE_DATA[lang]` falls back to `en` for the labels and nouns; chrome stays localised. (A native list also decides which endings to mark and which nouns are traps in that language.)

`LOCALE_DATA.en.labelOne` = "one"; `LOCALE_DATA.en.labelMany` = "many".

Notation per noun: singular / plural — picture ART key — suffix marked on the plural card (letters lit by `ART.suffixMark`; "—" = none, the whole form changes → `ART.stemLine`) — class (`regular`, `es`, `ies`, `sTrap` = a singular that ends in s, `irregular`, `ves`, `same` = unchanged, card carries the picture).

- **L1 — regular -s**
  1. dog / dogs — `ART.dog` — s — regular
  2. cat / cats — `ART.cat` — s — regular
  3. frog / frogs — `ART.frog` — s — regular
  4. pig / pigs — `ART.pig` — s — regular
  5. star / stars — `ART.star` — s — regular
  6. tree / trees — `ART.tree` — s — regular
  7. hat / hats — `ART.hat` — s — regular
  8. ball / balls — `ART.ball` — s — regular
- **L2 — -es, -ies and the s-ending singular traps**
  9. box / boxes — `ART.box` — es — es
  10. fox / foxes — `ART.fox` — es — es
  11. bus / buses — `ART.bus` — es — sTrap (the singular "bus" ends in s)
  12. dress / dresses — `ART.dress` — es — sTrap
  13. glass / glasses — `ART.glass` — es — sTrap
  14. peach / peaches — `ART.peach` — es — es
  15. butterfly / butterflies — `ART.butterfly` — ies — ies
  16. cherry / cherries — `ART.cherry` — ies — ies
- **L3 — irregular, f → ves, unchanged**
  17. mouse / mice — `ART.mouse` — — — irregular
  18. foot / feet — `ART.foot` — — — irregular
  19. tooth / teeth — `ART.tooth` — — — irregular
  20. child / children — `ART.child` — ren — irregular (the ending "ren" is lit; the vowel change is not marked)
  21. leaf / leaves — `ART.leaf` — ves — ves
  22. wolf / wolves — `ART.wolf` — ves — ves
  23. sheep / sheep — `ART.sheep` — — — same (card shows one or three sheep)
  24. fish / fish — `ART.fish` — — — same (card shows one or three fish)

Card generation: each noun appears at most once per session, in ONE form chosen per card: singular or plural with equal probability, subject to the stream rule (no more than two consecutive cards to the same bin; the first card of a level is never a trap or a same-class noun). An `sTrap` noun is dealt in its SINGULAR form at least half the time it appears (that is the trap). Play list of 12 per Rules (shuffle within level, levels in order); bins swap sides at each level change.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three: cards take ~10-15 s.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive cards → next card one level down (floor L1); every level change swaps the bins' sides.
- What happens on a correct answer: the bin shows the count pictures (one or three) with `tone("tap", k)` per picture, `tone("correct")`, the card shrinks into the bin's list; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct card and on the twelfth; rail dot; next card after the pictures fade (800 ms).
- What happens on a wrong answer (each begins with the bin showing ITS count against the word, `tone("nudge")`, and the card gliding back):
  - Plural sorted as one (ending ignored): `ART.suffixMark` under the ending; `t("look_carefully")`.
  - s-ending singular sorted as many (bus, dress, glass): the "many" bin shows three; `ART.stemLine` under the whole word; `ART.pairCard` "bus → buses" at once (on the first wrong bin, because the rule cannot be seen from the word alone).
  - Irregular plural sorted as one (mice, feet, teeth, children): `ART.stemLine` under the whole word (or `ART.suffixMark` under "ren"); `ART.pairCard` "mouse → mice" at once.
  - Unchanged noun sorted against its picture (sheep, fish): the card's own picture `ANIM.pop`s; `ART.pairCard` "sheep → sheep" at once.
  - Singular regular sorted as many (dog → many): the "many" bin shows three dogs against "dog"; `ART.stemLine`; `t("look_carefully")`.
  - Bin tapped with nothing selected: its icon pops; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the count-and-cue → attempt 3 with the pair card (if not already shown) and the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Plural Parade". The bin labels ("one", "many") and the 24 noun pairs are `LOCALE_DATA.en` (Content), not STRINGS — they change with the native list, not with the translation step. The pair card's arrow is a text glyph drawn from `LOCALE_DATA` as part of the pair string ("dog → dogs").

## Sound
`tone("tap")` on selecting the card; `tone("tap", k)` for each count picture (one note for one, three rising notes for many — the quantity is heard as well as seen, F-213); `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the word is read by the child.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, Look carefully, All done, Play again, Menu and praise change with the picker; the English nouns and the "one" / "many" labels are the pilot content under every `?lang=`; no raw key names appear).
- [ ] Works at narrow width (400-px iframe: the card, both bins with their icons, labels and lists, and the count pictures are all visible).
- [ ] Keyboard operable (Tab: card, left bin, right bin; Enter selects the card / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] Each bin shows a square icon (one square / three squares) AND a word label; the icons stay with their bins when the bins swap sides.
- [ ] Putting "dogs" in the "one" bin shows ONE dog above that bin and a coral line under the s; the card slides back.
- [ ] Putting "bus" in the "many" bin shows THREE buses, a teal line under the whole word and the card "bus → buses".
- [ ] Putting "mice" in the "one" bin shows one mouse and the card "mouse → mice".
- [ ] Cards for "sheep" and "fish" carry a small picture of one or three animals on the card itself.
- [ ] A correct card shows its pictures with rising notes, then shrinks into the bin and its word appears in the bin's list.
- [ ] Three first-try corrects in a row bring -es / -ies words and swap the bins; a wrong bin brings -s words back (swapped again).
- [ ] The finish screen shows both bins with their word lists and filled or hollow dots; no score.
- [ ] With `?sound=off` nothing is audible.
