# 089 — Describing Words

## Identity
- Slug: `describing-word-picker`
- Subject / topic: Literacy / adjectives — picking the describing word that matches what a picture shows (red, big, wet, hot, shiny, broken)
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three word tiles under a composed picture; the picture's attribute enacts itself on error)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the adjectives (and their agreement — French "mouillé / mouillée", Italian "rosso / rossa" depend on the pictured noun's gender) are language-bound (F-22) and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15). The pictures and the attribute overlays are language-neutral. The grammar term "adjective" never appears on screen (F-22: explicit grammar terms before 8 only in EN/FR/DE/ES/IT; the game works as a vocabulary game everywhere).

## Learning
- Objective: Looks at a picture that shows one attribute (a dog with drops on it; a pizza with steam; an elephant too big for its card) and taps the describing word that says what the picture shows, not its opposite and not the name of the thing.
- Prerequisites: Reads single words (6-8 decoding); knows colour, size and feeling words orally (5-6 core); knows the pictured objects.
- Curriculum links: F-22 (vocabulary in every system; describing words in the 6-8 writing strand of all twelve — "use adjectives to describe"), F-31 rows "Sort by attribute" (5-6) and "Nouns/verbs/adjectives named" (conservative 8+, market-conditional) → this game bands at 8-9 for the opposite-and-noun distractors while never naming the word class (US L.1.1.f / L.2.1.e "use adjectives … depending on what is to be modified", L.3.1.a; England Y2 "expanded noun phrases to describe and specify"; Germany Klasse 2 "Wie-Wörter / Adjektive"; France CE1 "l'adjectif"; Spain 2º "el adjetivo"; Italy classe 2ª "l'aggettivo qualificativo"; Netherlands groep 4 "bijvoeglijk naamwoord" (terms at 8); Brazil EF02LP "adjetivos" (later); Sweden / Denmark / Norway / Finland: describing words as vocabulary at 7-9, the term later — F-22).
- Common misconceptions (F-22, F-125, F-103), each with this game's response:
  1. **Picking the opposite (dry for a wet dog, cold for a steaming pizza) — the attribute is seen but the word is confused with its pair.** Response: the attribute overlay enacts itself: the drops fall from the dog (`ANIM.drip`), the steam rises (`ANIM.waft`), the sparkles twinkle (`ANIM.twinkle`), the big elephant swells against its card (`ANIM.swell`); the tapped tile nudges; `t("look_carefully")`.
  2. **Naming the thing instead of describing it (tapping "rain" for the wet dog, "diamond" for the shiny diamond — F-22 word-class confusion).** Response: L3 offers the noun as a distractor on purpose; tapping it shows `ART.thingBadge` (a small box picture) at the tile's corner for 1200 ms with `S("thatNames")` ("That names the thing.") on the feedback line, then the attribute overlay enacts. The box is the same "a thing" icon as game 088, so the two games share one visual grammar without a grammar word.
  3. **Reading the picture's most salient feature instead of the marked attribute (tapping "big" for a wet dog because the dog is large on the card).** Response: only ONE attribute is ever marked per picture — the base object is drawn at a neutral 96 px unless size IS the attribute — and on this error the overlay pulses (`ANIM.pulse`) so the eye goes to the marked feature.
  4. **Guessing by tile position.** Response: the correct tile's slot never repeats twice running (§13); after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "Describing Words", the chameleon (`ART.chameleon`) at (360, 200), Start, picker.
2. **Item 1 (L1: a red apple)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the picture card (`ART.pictureCard`, 200 × 190) at (360, 158) holding the base picture (`ART.apple` at 96 px) — no overlay for a colour item; the chameleon at (620, 158) at 56 px. Zone B: the caption `t("choose_answer")` at (360, 282), 22 px `THEME.colour.inkSoft`; three word tiles (`ART.wordTile`, 190 × 96, `makeTile`) at y = 380, x = 150 / 360 / 570, reading "red", "blue", "green" (28 px) in a shuffled order. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Answering**: the child taps a tile.
   - **Correct ("red")**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the word glides (`ANIM.glide`) onto the label card (`ART.labelCard`, 200 × 44) under the picture at (360, 268), where it sits beside a small copy of the object (32 px) — "red" + apple — the describing word attached to its thing; the chameleon `ANIM.flick`; rail dot fills; next item after 900 ms (`ANIM.rise` clears, new picture `ANIM.appear`s).
   - **Wrong — opposite class**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; the attribute enacts (Rules); `t("look_carefully")`. Attempt 2.
   - **Wrong — noun-trap class (L3)**: nudge + tone; `ART.thingBadge` appears at the tile's top-right for 1200 ms and the feedback line shows `S("thatNames")`; then the attribute enacts. Attempt 2.
   - **Wrong — unrelated class**: nudge + tone; the overlay (or the size) `ANIM.pulse`s; `t("look_carefully")`. Attempt 2.
   - **Second wrong tap**: the attribute enacts again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-12**: per Content/Rules. L1 = colour, size and feeling (the attribute is the object itself or its size on the card); L2 = a state shown by an overlay (drops, steam, snowflakes, water in a glass, an open book); L3 = the same states with the OPPOSITE word and the THING's name as the two distractors.
5. **Finish**: `t("all_done")` (360, 110); the chameleon (360, 200) `ANIM.celebrate`; the summary = the twelve label cards as `ART.labelChip`s (110 × 40: the word at 16 px + the object at 24 px) in three rows of four (y = 320, 372, 424; x = 195 + i × 110), each with a filled `ART.dotFull` at its left for a first-try item and a hollow `ART.dotEmpty` for a helped one — the describing words the child attached, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  chameleon:   { kind: "emoji", value: "🦎", size: 72 },   // lizard — the mascot that "changes" (Unicode 9)
  pictureCard: { kind: "shape", shape: "roundRect", w: 200, h: 190, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  labelCard:   { kind: "shape", shape: "roundRect", w: 200, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // word 22 px display structure + object at 32 px
  wordTile:    { kind: "shape", shape: "roundRect", w: 190, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // word 28 px display ink, wrap 170
  thingBadge:  { kind: "emoji", value: "📦", size: 28 },   // "that names a thing" — shared with game 088
  showRing:    { kind: "shape", shape: "roundRect", w: 202, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  labelChip:   { kind: "shape", shape: "roundRect", w: 110, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  // base pictures — the comment is the object's ONE intended name
  apple:       { kind: "emoji", value: "🍎", size: 96 },   // apple
  banana:      { kind: "emoji", value: "🍌", size: 96 },   // banana
  frog:        { kind: "emoji", value: "🐸", size: 96 },   // frog
  elephant:    { kind: "emoji", value: "🐘", size: 96 },   // elephant (drawn at 150 px for "big")
  mouse:       { kind: "emoji", value: "🐭", size: 96 },   // mouse (drawn at 32 px for "small")
  happyFace:   { kind: "emoji", value: "😀", size: 96 },   // happy
  sleepyFace:  { kind: "emoji", value: "😴", size: 96 },   // sleepy
  dog:         { kind: "emoji", value: "🐶", size: 96 },   // dog
  pizza:       { kind: "emoji", value: "🍕", size: 96 },   // pizza
  bear:        { kind: "emoji", value: "🐻", size: 96 },   // bear
  book:        { kind: "emoji", value: "📖", size: 96 },   // book (open)
  diamond:     { kind: "emoji", value: "💎", size: 96 },   // diamond
  shirt:       { kind: "emoji", value: "👕", size: 96 },   // shirt
  raceCar:     { kind: "emoji", value: "🏎", size: 96 },   // car
  brokenHeart: { kind: "emoji", value: "💔", size: 96 },   // heart (broken)
  ball:        { kind: "emoji", value: "⚽", size: 96 },   // ball
  // attribute overlays
  drop:        { kind: "emoji", value: "💧", size: 28 },   // wet: three drops at (−50,−40), (+44,−30), (−6,+52) on the card
  flake:       { kind: "emoji", value: "❄", size: 26 },    // cold: three flakes at (−52,−44), (+48,−36), (+40,+48)
  sparkle:     { kind: "emoji", value: "✨", size: 28 },   // shiny: three sparkles at (−50,−46), (+50,−40), (+44,+46)
  steam:       { kind: "shape", shape: "line", w: 4, stroke: "inkSoft", strokeWidth: 4 },     // hot: three vertical 26-px lines at x = −20 / 0 / +20, from y = −60 up to −86
  speedLine:   { kind: "shape", shape: "roundRect", w: 44, h: 5, fill: "inkSoft", radius: 3 },   // fast: three lines to the left of the car at (−78, −16), (−86, 0), (−78, +16)
  mudSpot:     { kind: "shape", shape: "circle", r: 7, fill: "inkSoft" },                        // dirty: four spots at (−18,−10), (12,−22), (−4,14), (20,10) on the shirt
  glassOutline:{ kind: "shape", shape: "roundRect", w: 60, h: 90, stroke: "ink", strokeWidth: 3, radius: 8 },   // the glass
  glassWater:  { kind: "shape", shape: "rect", w: 50, h: 70, fill: "structure" },                              // inside it = full
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. Overlays are drawn as children of the picture card at the offsets in their comments; a size item draws the base picture at 150 px (big — it overflows the card's inner area but stays inside the stage) or 32 px (small).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "the chosen word from its tile to the label card (x,y set at call)" },
  drip:      { y: "+=40", alpha: 0, duration: 600, ease: "Sine.In", yoyo: false, trigger: "each drop falls and fades, 150 ms apart, then all reset (wet items)" },
  waft:      { y: "-=18", alpha: 0.2, duration: 700, ease: "Sine.InOut", yoyo: true, trigger: "each steam line rises and fades back, 120 ms apart (hot items)" },
  twinkle:   { scale: 1.5, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "each sparkle, 100 ms apart (shiny items)" },
  swell:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the base picture on size items (big grows past the card edge; small shrinks by the same tween played in reverse: scale 0.85)" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "overlay elements (flakes, spots, speed lines, water, the open book, the face) on any wrong tap where no other enactment applies" },
  badgeIn:   { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", yoyo: true, hold: 1200, trigger: "thingBadge at a noun-trap tile's corner (from alpha 0, scale 0.5), hold, then out" },
  flick:     { angle: -12, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "chameleon on a correct tap" },
  rise:      { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "picture, overlays and label clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture card contents and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish chameleon" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ┌──────────────┐                          │
      │                    │  drops  dog  │  pictureCard (360,158)   │  zone A
      │                    │   (overlay)  │  200×190     chameleon   │
      │                    └──────────────┘              (620,158)   │
      │                    [ wet  + dog ] labelCard (360,268)        │
260   ├──────────────────────────────────────────────────────────────┤
      │            "Choose the right answer" (360,282)               │
      │   [  wet  ]       [  dry  ]       [ rain  ]   tiles y=380    │  zone B
      │   x=150           x=360           x=570      (190×96)        │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The label card is empty (outline only) until a correct tap fills it.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.pictureCard` at (360, 158) with the base picture centred at 96 px (150 px for "big", 32 px for "small") and the item's overlays at the offsets given in the registry comments; the glass items draw `ART.glassOutline` centred with `ART.glassWater` inside (full) or without it (empty).
- `ART.labelCard` at (360, 268): outline only until solved; then the word at 22 px `THEME.font.display` `THEME.colour.structure` at (−30, 0) and the object at 32 px at (+70, 0).
- `ART.chameleon` at (620, 158) at 56 px.
- Caption `t("choose_answer")` at (360, 282), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 640.
- Tiles: `makeTile` 190 × 96 with `ART.wordTile` tokens at y = 380, x = 150 / 360 / 570; word 28 px `THEME.font.display` `THEME.colour.ink`, `wordWrap` 170, max two lines (fit-to-width shrink to 22 px). `ART.thingBadge` at the tile's (+78, −34). `ART.showRing` behind the correct tile.
- Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors 96 ≥ 56; gaps 20. Keyboard: Tab walks the three tiles; Enter taps.

## Content
Language-bound words: `LOCALE_DATA[lang].items` carry the three words per item; the picture recipe (base + overlay + size) is shared. `en` authored in full. **Other locales: a native list is required — en pilot** (agreement with the pictured noun's gender must be authored per language). Until a native list exists, `LOCALE_DATA[lang]` falls back to `en` for the words only.

Notation: picture recipe — correct word — distractor (class) — distractor (class); classes: `opposite`, `noun` (the thing's name), `unrelated`, `colour` (another colour), `size` (the other size), `feeling` (another feeling).

- **L1 — colour, size, feeling (the attribute is the object or its size)**
  1. `ART.apple` — red — blue (colour) — green (colour)
  2. `ART.banana` — yellow — red (colour) — blue (colour)
  3. `ART.frog` — green — yellow (colour) — red (colour)
  4. `ART.elephant` at 150 px — big — small (size) — red (unrelated)
  5. `ART.mouse` at 32 px — small — big (size) — green (unrelated)
  6. `ART.happyFace` — happy — sad (feeling) — sleepy (feeling)
- **L2 — a state shown by an overlay**
  7. `ART.dog` + three `ART.drop` — wet — dry (opposite) — big (unrelated)
  8. `ART.pizza` + three `ART.steam` — hot — cold (opposite) — small (unrelated)
  9. `ART.bear` + three `ART.flake` — cold — hot (opposite) — happy (unrelated)
  10. `ART.glassOutline` + `ART.glassWater` — full — empty (opposite) — red (unrelated)
  11. `ART.book` — open — closed (opposite) — wet (unrelated)
  12. `ART.sleepyFace` — sleepy — happy (feeling) — hot (unrelated)
- **L3 — the opposite AND the thing's name as distractors**
  13. `ART.dog` + three `ART.drop` — wet — dry (opposite) — rain (noun)
  14. `ART.diamond` + three `ART.sparkle` — shiny — dull (opposite) — diamond (noun)
  15. `ART.shirt` + four `ART.mudSpot` — dirty — clean (opposite) — shirt (noun)
  16. `ART.raceCar` + three `ART.speedLine` — fast — slow (opposite) — car (noun)
  17. `ART.brokenHeart` — broken — whole (opposite) — heart (noun)
  18. `ART.ball` — round — square (opposite) — ball (noun)

Enactment per recipe (what plays on an opposite-class wrong tap and on the second wrong tap): drops → `ANIM.drip`; steam → `ANIM.waft`; sparkles → `ANIM.twinkle`; size → `ANIM.swell`; everything else (flakes, water, open book, faces, spots, speed lines, the broken heart, the ball, colours) → `ANIM.pulse` on the overlay or, where there is none, on the base picture.

Play list of 12 per Rules (shuffle within level, levels in order); no picture repeats; the correct tile's slot never repeats twice running (§13); the same word is never correct twice in a session.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: 2 wrong taps on one item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items only), the word glides onto the label card beside the object, chameleon `ANIM.flick`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")` and the tile de-selecting):
  - Opposite (dry / cold / empty / closed / dull / clean / slow / whole / square, or the other size / feeling / colour): the attribute enacts per its recipe; `t("look_carefully")`.
  - Noun trap (rain / diamond / shirt / car / heart / ball): `ART.thingBadge` at the tile's corner with `S("thatNames")`, then the attribute enacts.
  - Unrelated: the overlay (or base picture) pulses; `t("look_carefully")`.
  - Second wrong tap: the enactment again, then the show-me ring on the correct tile.
- Retry behaviour: attempt 1 → attempt 2 after the enactment → attempt 3 with the show-me ring; solved-with-help. No attempt 4. Tiles stay enabled (no lock-out).
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("choose_answer")`, `t("look_carefully")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`): `title` = "Describing Words"; `thatNames` = "That names the thing.". The 18 items' word triples are `LOCALE_DATA.en.items` (Content), not STRINGS.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", k)` per drop / steam line / sparkle during an enactment (k = 1, 2, 3); `tone("tap")` when the badge appears; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the words are read by the child.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, Choose the right answer, Look carefully, All done, Play again, Menu and praise change with the picker; the English words are the pilot content under every `?lang=`; no raw key names appear).
- [ ] Works at narrow width (400-px iframe: the picture card with its overlays, the label card, three tiles and the feedback line are visible; the big elephant does not leave the stage).
- [ ] Keyboard operable (Tab walks the three tiles; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Every picture shows exactly one marked attribute; the dog with drops is drawn at the same size as the plain dog.
- [ ] Tapping "dry" for the dog with drops makes the drops fall and fade, then reappear.
- [ ] Tapping "rain" for the same picture shows a small box at the tile's corner and the line "That names the thing." before the drops fall.
- [ ] Tapping "small" for the oversized elephant makes it swell past its card edge and back.
- [ ] A correct tap slides the word onto the label card beside a small copy of the object ("wet" + dog).
- [ ] Two first-try corrects in a row bring overlay pictures; two wrong taps bring colour/size/feeling items back.
- [ ] The correct tile is never in the same slot twice in a row, and no word is correct twice in one session.
- [ ] The finish screen shows twelve small word-plus-picture chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
