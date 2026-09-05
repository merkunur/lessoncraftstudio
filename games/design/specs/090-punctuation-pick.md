# 090 — End Marks

## Identity
- Slug: `punctuation-pick`
- Subject / topic: Literacy / sentence punctuation — choosing the end mark (full stop, question mark, exclamation mark) that fits a sentence
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three mark tiles under a sentence with an empty end box; the chosen mark glides into the box)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the sentences, the cue words (question words, inverted verbs, feeling words) and even the mark conventions are language-bound (F-128: word order differs — V2 in de/nl/sv/da/no, free order in fi; Spanish opens a question with an inverted mark, French spaces before ? and !) and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15). The mechanic — a sentence, an empty end box, three big mark tiles, a chip that lights the deciding word — is universal.

## Learning
- Objective: Reads a sentence with no end mark and taps the mark that fits it — a full stop for a telling sentence, a question mark for an asking sentence, an exclamation mark for a sentence with strong feeling — and accepts either mark where a sentence can honestly take both.
- Prerequisites: Reads simple sentences (6-8); knows that a sentence ends with a mark (6-8 sentence conventions, F-22).
- Curriculum links: F-1 (punctuation is niche in demand — 1 of 15 sources — so this is the catalogue's single end-mark game), F-22 ("sentence conventions: capital to start, full stop / question mark to end … by 8" in all twelve systems), F-128, F-31 row "Capital + full stop; sentence order" — conservative 7-8 → the three-mark decision bands at 8-9 (US L.1.2.b / L.2.2 "use end punctuation for sentences"; England Y1-2 "punctuate sentences using a capital letter and a full stop, question mark or exclamation mark"; Germany Klasse 2 "Satzschlusszeichen: Punkt, Fragezeichen, Ausrufezeichen"; France CP-CE1 "la ponctuation de fin de phrase"; Netherlands groep 4 "punt, vraagteken, uitroepteken"; Spain 2º "punto, signos de interrogación y exclamación"; Italy classe 2ª "punto, punto interrogativo, punto esclamativo"; Brazil EF02LP "pontuação: ponto final, de interrogação, de exclamação"; Sweden åk 1-3 "skiljetecken"; Finland grade 2 "välimerkit").
- Common misconceptions (F-128, F-125), each with this game's response:
  1. **Cannot tell an asking sentence from a telling one without hearing it (the rule is known but not applied).** Response: on a wrong tap the deciding words light with a cue chip (`ART.cueChip`) — the question word ("Where") or the inverted pair ("Can you") for a question; the plain subject-verb start ("The cat sat") for a statement — and a voice line draws over the sentence's end: `ART.riseLine` (an arc curving up) for a question, `ART.flatLine` for a statement. The sentence shape is shown, not just the answer.
  2. **The same words in two orders ("Can you swim" / "You can swim") get the same mark.** Response: L2 pairs are dealt within three cards of each other and the cue chip lights the first two words of each — "Can you" against "You can" — so the order is the visible difference.
  3. **The exclamation mark used playfully on a calm telling sentence (F-128: not an error to punish).** Response: a "!" on a plain statement is NOT nudged: the mark glides into the box, then shrinks and settles into a full stop (`ANIM.calmDown`) with `S("calm")` ("This one is calm.") on the feedback line, and the item completes — counted as retried (no praise pop), never as wrong. Sentences that can honestly take either mark ("We won the game") accept both.
  4. **A question mark on any sentence that contains "you" or "can" (keyword matching instead of reading).** Response: the L2 statement twins are built from exactly those words; the cue chip + `ART.flatLine` on "You can swim" shows that the words alone do not decide.
  5. **Position habit.** Response: the three tiles are shuffled per item; the correct tile's slot never repeats twice running (§13); after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "End Marks", the hedgehog (`ART.hedgehog`) at (360, 200) with the three marks (`ART.stopMark`, `ART.questionMark`, `ART.bangMark` at 40 px) at (300, 260), (360, 260), (420, 260), Start, picker.
2. **Item 1 (L1: "Where is my hat")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the sentence card (`ART.sentenceCard`, 640 × 84) at (360, 150) with the sentence (`ART.sentenceText`, 26 px) left-aligned from x = 70 and the empty end box (`ART.endBox`, 44 × 44, dashed) drawn right after the last word; the hedgehog at (620, 230) at 56 px. Zone B: the caption `t("read_the_question")` at (360, 282), 22 px `THEME.colour.inkSoft`; three mark tiles (`ART.markTile`, 96 × 96, `makeTile`) at y = 380, x = 240 / 360 / 480, showing `ART.stopMark` / `ART.questionMark` / `ART.bangMark` at 56 px in a shuffled order. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Answering**: the child taps a mark tile.
   - **Correct ("?")**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); a copy of the mark glides (`ANIM.glide`) into the end box, which turns solid (`ART.endBoxSolved` tokens); the sentence's voice line draws (`ART.riseLine` for a question, `ART.flatLine` for a statement, `ANIM.bounce` on the mark for an exclamation) — the shape is confirmed even when the child is right (F-43); the hedgehog `ANIM.nod`; rail dot fills; next item after 1000 ms (`ANIM.rise` clears, new sentence `ANIM.appear`s).
   - **Wrong — a "." or "!" on a question**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; `ART.cueChip` lights the question word (or the inverted pair) and `ART.riseLine` draws over the end (`ANIM.cueIn`, 1500 ms); `t("look_carefully")`. Attempt 2.
   - **Wrong — a "?" on a statement**: nudge + tone; `ART.cueChip` lights the first two words ("The cat" / "You can") and `ART.flatLine` draws; `t("look_carefully")`. Attempt 2.
   - **Wrong — a "." or "?" on a strong-feeling sentence**: nudge + tone; `ART.cueChip` lights the feeling word ("Wow", "so", "Look out"), and the "!" tile does `ANIM.bounce`; `t("look_carefully")`. Attempt 2.
   - **Soft — a "!" on a plain statement**: no nudge; the "!" glides into the box, `ANIM.calmDown` shrinks it into a full stop, `S("calm")` on the feedback line, `tone("tap")`; the item completes as retried (rail dot fills; no praise pop).
   - **Second wrong tap**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
4. **Items 2-12**: per Content/Rules. L1 = questions that open with a question word vs plain statements; L2 = yes/no questions with an inverted verb vs statement twins made of the same words; L3 = strong-feeling sentences, "either" sentences, and one question among them.
5. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = the twelve sentences as `ART.sentenceChip`s (330 × 30, the sentence at 15 px with its chosen mark in `THEME.colour.accent`) in two columns of six (x = 190 and 530; y = 300 + i × 36), each with a filled `ART.dotFull` at its left for a first-try item and a hollow `ART.dotEmpty` for a retried or helped one — the punctuated sentences, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  hedgehog:      { kind: "emoji", value: "🦔", size: 72 },   // Unicode 10
  sentenceCard:  { kind: "shape", shape: "roundRect", w: 640, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  sentenceText:  { kind: "text",  value: "", size: 26, font: "body", color: "ink" },     // drawn as one text piece per word so a chip can sit on any word
  endBox:        { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 8 },   // dashed [6,5]
  endBoxSolved:  { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  cueChip:       { kind: "shape", shape: "roundRect", w: 80, h: 36, fill: "accent", radius: 8 },   // behind the deciding word(s) at alpha 0.35; w = the words' width + 16
  riseLine:      { kind: "shape", shape: "arc", r: 60, stroke: "accent", strokeWidth: 5 },        // a quarter arc from the last word rising to the end box: "the voice goes up"
  flatLine:      { kind: "shape", shape: "line", w: 120, stroke: "structure", strokeWidth: 5 },   // a level line under the last two words: "the voice stays level"
  markTile:      { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  stopMark:      { kind: "text",  value: ".", size: 56, font: "display", color: "ink" },
  questionMark:  { kind: "text",  value: "?", size: 56, font: "display", color: "ink" },
  bangMark:      { kind: "text",  value: "!", size: 56, font: "display", color: "ink" },
  showRing:      { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  sentenceChip:  { kind: "shape", shape: "roundRect", w: 330, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 6 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. The marks are text art (`kind: "text"`) so the later SVG upgrade can replace them with drawn glyphs without touching the tiles.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "a copy of the mark from its tile to the end box (x,y set at call)" },
  cueIn:     { alpha: 1, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1500, trigger: "cueChip behind the deciding word(s) (to alpha 0.35) and riseLine / flatLine (to alpha 1), hold, then fade" },
  bounce:    { y: "-=16", duration: 160, ease: "Sine.Out", yoyo: true, repeat: 2, trigger: "the exclamation mark (tile or placed copy) on a strong-feeling sentence" },
  calmDown:  { scale: 0.45, duration: 500, ease: "Sine.InOut", trigger: "a playful ! placed on a plain statement shrinks; at the end its text is swapped to the full stop and scale returns to 1 over 150 ms" },
  nod:       { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog on a correct tap" },
  rise:      { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "sentence, chips, lines and placed mark clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new sentence and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌────────────────────────────────────────────────────────┐  │
      │  │  Where  is  my  hat  ┊ ┊       sentenceCard (360,150) │  │  zone A
      │  └───────────── endBox after the last word ───────────────┘  │
      │        cueChip behind "Where"; riseLine arcs up to the box   │
      │                                          hedgehog (620,230)  │
260   ├──────────────────────────────────────────────────────────────┤
      │              "Read the question" (360,282)                    │
      │        [ . ]        [ ? ]        [ ! ]    tiles y=380         │  zone B
      │       x=240        x=360        x=480    (96×96)              │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The sentence is laid out word by word from x = 70 with 10-px spaces; the end box follows the last word with a 6-px gap; a sentence longer than 560 px wraps to a second line at 22 px pitch and the box follows the last word of the second line.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sentenceCard` at (360, 150); words as separate `ART.sentenceText` pieces (26 px `THEME.font.body` `THEME.colour.ink`, origin (0, 0.5)) laid out left to right; `ART.endBox` (dashed) after the last word, becoming `ART.endBoxSolved` with the mark at 32 px `THEME.font.display` when filled.
- `ART.cueChip` centred behind the deciding word(s) at alpha 0.35 (width = measured width + 16); `ART.riseLine` = a quarter arc (radius 60, from 180° to 270°) whose lower end starts under the last word and whose upper end reaches the end box's top; `ART.flatLine` under the last two words at y = +30 on the card.
- `ART.hedgehog` at (620, 230) at 56 px.
- Caption `t("read_the_question")` at (360, 282), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tiles: `makeTile` 96 × 96 with `ART.markTile` tokens at y = 380, x = 240 / 360 / 480; each holds one mark entry at 56 px. `ART.showRing` behind the correct tile.
- Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors 96 ≥ 56; gaps 24. Keyboard: Tab walks the three tiles; Enter taps.

## Content
Language-bound: `LOCALE_DATA[lang].items`. `en` authored in full. **Other locales: a native list is required — en pilot** (a Spanish list needs an opening ¿ / ¡ drawn at the sentence start; a French list needs the space before ? and !; word order in every other locale is its own). Until a native list exists, `LOCALE_DATA[lang]` falls back to `en` for the items only; chrome stays localised.

Notation: sentence (no end mark) — accepted mark(s) — class (`question` / `statement` / `bang` / `either` = "." and "!" both accepted) — cue words (lit by `ART.cueChip` on a wrong tap).

- **L1 — question-word questions vs plain statements**
  1. Where is my hat — ? — question — Where
  2. The cat sat on the mat — . — statement — The cat
  3. What is your name — ? — question — What
  4. My dog likes to run — . — statement — My dog
  5. Who ate the cake — ? — question — Who
  6. We went to the park — . — statement — We went
  7. When is your birthday — ? — question — When
  8. The sun is hot — . — statement — The sun
- **L2 — inverted yes/no questions vs statement twins of the same words**
  9. Can you swim — ? — question — Can you
  10. You can swim — . — statement — You can
  11. Is it raining — ? — question — Is it
  12. It is raining — . — statement — It is
  13. Do you like apples — ? — question — Do you
  14. I like apples — . — statement — I like
  15. Are we there yet — ? — question — Are we
  16. We are nearly there — . — statement — We are
- **L3 — strong feeling, "either", and a question among them**
  17. Wow, what a big dog — ! — bang — Wow
  18. Look out — ! — bang — Look out
  19. That was so much fun — . or ! — either — so much
  20. Happy birthday — ! — bang — Happy birthday
  21. I love this song — . or ! — either — love
  22. Stop right there — ! — bang — Stop
  23. We won the game — . or ! — either — won
  24. Ouch, that hurt — ! — bang — Ouch
  25. Can we go again — ? — question — Can we
  26. The bus is here — . or ! — either — The bus

Stream rules: L2 deals its question/statement twins within three cards of each other (9 near 10, 11 near 12, and so on). Play list of 12 per Rules (shuffle within level, levels in order); no sentence repeats; two consecutive items never share the same accepted mark set; the correct tile's slot never repeats twice running (§13). Sentences use emoji-free everyday content and no people's names (§14).

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: 2 wrong taps on one item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). A soft "calm" completion counts as a retried item for adaptation (not a wrong tap).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items only), the mark glides into the end box, the voice line draws (rise / flat) or the mark bounces (bang), hedgehog `ANIM.nod`, rail dot, next item after 1000 ms. For an `either` item both "." and "!" are correct; "!" draws the bounce, "." draws the flat line.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")` and the tile de-selecting, except the soft case):
  - "." or "!" on a question: cue chip on the question word or inverted pair + `ART.riseLine`; `t("look_carefully")`.
  - "?" on a statement (keyword matching / cannot hear the sentence): cue chip on the first two words + `ART.flatLine`; `t("look_carefully")`.
  - "." or "?" on a bang sentence: cue chip on the feeling word + `ANIM.bounce` on the "!" tile; `t("look_carefully")`.
  - "!" on a plain statement (playful): SOFT — the mark glides in and `ANIM.calmDown`s into a full stop with `S("calm")`; `tone("tap")`; the item completes as retried.
  - "?" on an either sentence: cue chip on the first two words + `ART.flatLine`.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on a correct tile (for `either` items the ring goes on the "." tile); solved-with-help. No attempt 4. Tiles stay enabled.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("read_the_question")`, `t("look_carefully")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`): `title` = "End Marks"; `calm` = "This one is calm.". The 26 sentences with their classes and cue words are `LOCALE_DATA.en.items` (Content), not STRINGS.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", 6)` as a rise line draws (a high note — the voice going up) and `tone("tap", 0)` as a flat line draws (a level note); `tone("tap")` on the soft calm-down; `tone("finish")` once. Silent under `?sound=off`. No sentence is read aloud (no audio files); the voice lines are drawn, never heard.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, Read the question, Look carefully, All done, Play again, Menu and praise change with the picker; the English sentences are the pilot content under every `?lang=`; no raw key names appear).
- [ ] Works at narrow width (400-px iframe: the sentence card with its end box, three tiles and the feedback line are visible; a long sentence wraps inside the card).
- [ ] Keyboard operable (Tab walks the three tiles; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] "Where is my hat" with "." tapped: the word "Where" lights under a coral chip and an arc rises to the end box; the tile nudges.
- [ ] "You can swim" with "?" tapped: "You can" lights and a level teal line draws under the last two words.
- [ ] "Can you swim" and "You can swim" both appear within a few cards of each other.
- [ ] "The cat sat on the mat" with "!" tapped: no nudge; the "!" glides into the box, shrinks into a full stop and the line reads "This one is calm."; the item moves on.
- [ ] "We won the game" accepts both "." and "!".
- [ ] "Wow, what a big dog" with "." tapped: "Wow" lights and the "!" tile bounces.
- [ ] The correct tile is never in the same slot twice in a row.
- [ ] The finish screen lists the twelve punctuated sentences with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
