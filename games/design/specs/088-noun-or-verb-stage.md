# 088 — Noun or Verb

## Identity
- Slug: `noun-or-verb-stage`
- Subject / topic: Literacy / grammar — sorting words into "a thing" (noun) and "an action" (verb), including words that are one or the other depending on the sentence
- Age band: `8-9`
- Interaction pattern: `P8` — sort into bins (tap the word card, then tap the box-icon bin or the running-figure bin; a wrong bin shows the word inside a sentence frame)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (two bins, one item at a time). **Market-conditional (F-22):** explicit grammar terms before 8 are taught only in EN / FR / DE / ES / IT (NL at 8; FI / SE / DK / NO / BR later). Therefore the bins carry NO words — a box icon and a running-figure icon are the whole label (a thing / an action) — and the terms "noun" and "verb" never appear on screen; the mechanic is language-neutral. The words, sentences and frames are language-bound and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15; F-128: word order differs, so sentence items are never translations).

## Learning
- Objective: Reads a word (or a word highlighted in a short sentence) and sorts it as a thing or an action, including non-motion actions (think, sleep), event-things (party, race), and words that are a thing in one sentence and an action in another (watch, fish, drink).
- Prerequisites: Reads short sentences (8-9 band); the sorting mechanic (any earlier P8 game).
- Curriculum links: F-22 (explicit grammar terms: EN/FR/DE/ES/IT before 8, NL at 8, others later — market-conditional), F-31 row "Nouns/verbs/adjectives named" — conservative 8+ (7 of 12), earliest 5 → 8-9 (US L.1.1.b/e and L.3.1.a "explain the function of nouns, verbs …"; England Y2-3 "noun, verb" in the grammar appendix; France CE1-CE2 "le nom, le verbe"; Germany Klasse 2-3 "Nomen, Verben" (F-34: Wortarten at 6-7 in Bavaria); Spain 2º-3º "el nombre y el verbo"; Italy classe 2ª-3ª "nome e verbo"; Netherlands groep 5 "zelfstandig naamwoord, werkwoord" (F-36); Brazil, Sweden, Denmark, Norway and Finland teach the terms later (F-37: no parts of speech before 9 in Finland) — in those markets this game is an early-optional item, not a curriculum fit). F-31 note: market-conditional objectives get 1-3 games each (F-216); this is one.
- Common misconceptions (F-22, F-128, F-125), each with this game's response:
  1. **"An action is something that moves" — sleep, think, want, hear sorted as things.** Response: the word appears in its action frame on a frame card (`ART.frameCard`) — "I can sleep." — with the running-figure icon at its left (`ART.runIcon`), and the runner bin's icon pulses; the frame is the test the child can reuse.
  2. **Event-things sorted as actions — party, race, song, holiday ("a party is something you do").** Response: the thing frame — "a party" — appears with the box icon (`ART.boxIcon`) at its left, and the box bin's icon pulses.
  3. **Word-form fixation — "watch" is always a thing (or always an action).** Response: L3 shows the word inside a sentence with the target word in teal (`ART.targetWord`); on a wrong bin the neighbour words that decide it light up (`ART.neighbourMark` under "We" for "We watch the birds." / under "My … is" for "My watch is new.") — the sentence, not the word, decides.
  4. **Sorting by word length or by the last answer.** Response: the stream never sends more than two consecutive cards to the same bin; the bins swap sides at each level change; after two wrong bins the show-me ring identifies the bin.

## How it plays
1. **Start screen**: title "Noun or Verb", the koala (`ART.koala`) at (360, 200) between a box (`ART.boxIcon` at 48 px, (280, 250)) and a runner (`ART.runIcon` at 48 px, (440, 250)), Start, picker.
2. **Card 1 (L1: "jump")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a stage floor (`ART.stage`, a wide bar at y = 200) with the koala at its left end (80, 170); the word card (`ART.wordCard`, 220 × 96, `makeTile`) slides in (`ANIM.slideIn`) to (360, 150) showing "jump" at 32 px. Zone B: two bins (`ART.bin`, 220 × 150, `makeTile`) at y = 390, x = 200 and 520: the left bin shows `ART.boxIcon` (a box — a thing) at its top, the right bin `ART.runIcon` (a running figure — an action); each has a word list (`ART.binList`) below its icon. No words on the bins. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Sorting**: tap the card (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The card glides (`ANIM.glide`) to the bin.
   - **Correct bin (runner)**: the bin's icon `ANIM.pop`s, `tone("correct")`; the frame card (`ART.frameCard`) shows the word in its frame for 900 ms — "I can jump." with the runner icon — even on a correct sort (F-43: confirm with the structure); the card shrinks into the bin's list (`ANIM.intoList`) and "jump" is written there at 16 px; every third correct card plays a praise pop; the rail dot fills; the next card slides in.
   - **Wrong bin (box)**: `tone("nudge")`; the frame card appears with the correct frame ("I can jump." + runner icon, `ANIM.cueIn`) and stays 1500 ms; the correct bin's icon `ANIM.pulse`s; the card glides back to (360, 150) with `ANIM.nudge`; the feedback line shows `t("look_carefully")`. Attempt 2.
   - **Second wrong bin**: the frame again; then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the card there completes it as solved-with-help.
   - Tapping a bin with no card selected: its icon `ANIM.pop`s (harmless preview).
4. **Cards 2-12**: per Content/Rules. L1 = concrete things vs motion actions; L2 = event-things vs non-motion actions; L3 = a sentence card (`ART.sentenceCard`, 560 × 96) with the target word in teal, the same word appearing in the session as a thing AND as an action in two different sentences.
5. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = the two bins at (200, 400) and (520, 400) with their full lists — the words sorted as things and as actions — with a filled `ART.dotFull` beside each first-try word and a hollow `ART.dotEmpty` beside a helped one; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  koala:        { kind: "emoji", value: "🐨", size: 72 },
  boxIcon:      { kind: "emoji", value: "📦", size: 44 },   // "a thing" — the noun bin's only label
  runIcon:      { kind: "emoji", value: "🏃", size: 44 },   // "an action" — the verb bin's only label
  stage:        { kind: "shape", shape: "roundRect", w: 600, h: 18, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 9 },
  wordCard:     { kind: "shape", shape: "roundRect", w: 220, h: 96, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },   // word 32 px display ink
  sentenceCard: { kind: "shape", shape: "roundRect", w: 560, h: 96, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },   // sentence 26 px body ink, wrap 520, max 2 lines
  targetWord:   { kind: "text",  value: "", size: 26, font: "display", color: "structure" },   // the word to sort, drawn in teal inside the sentence
  neighbourMark:{ kind: "shape", shape: "roundRect", w: 40, h: 6, fill: "accent", radius: 3 },   // under the deciding neighbour word(s); w = word width
  frameCard:    { kind: "shape", shape: "roundRect", w: 360, h: 60, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 12 },   // frame sentence 22 px display structure, the icon at its left
  bin:          { kind: "shape", shape: "roundRect", w: 220, h: 150, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  binList:      { kind: "shape", shape: "roundRect", w: 200, h: 70, fill: "surface2", radius: 8 },   // sorted words 16 px body ink, rows of three
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 162, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. The bins are labelled by `ART.boxIcon` and `ART.runIcon` only; no grammar term is rendered anywhere.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new card from x = 760 to the stage centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to a bin's top / back to centre (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "card arriving back after a wrong bin" },
  cueIn:     { alpha: 1, scale: 1, duration: 220, ease: "Back.Out", trigger: "frameCard (from alpha 0, scale 0.8); neighbourMark (from alpha 0)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "frameCard and marks after their hold" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's icon after a wrong bin" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin icon on a correct card; on an empty-handed bin tap" },
  intoList:  { scale: 0.3, alpha: 0, duration: 300, ease: "Sine.In", trigger: "the card shrinks into the bin as its word is written on the list" },
  swapSides: { duration: 400, ease: "Sine.InOut", trigger: "both bins exchange x at a level change (x set at call)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ koala(80,170)         ┌──────────────┐                        │
      │                       │    jump      │  wordCard (360,150)   │  zone A
      │ ═══════════ stage y=200 ══════════════════════════════════   │
      │        [runner] I can jump.   frameCard (360,250)            │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌──────────┐                       ┌──────────┐            │
      │   │  [box]   │  (200,390)            │ [runner] │ (520,390)  │  zone B
      │   │ list…    │  220×150              │ list…    │            │
      │   └──────────┘                       └──────────┘            │
480   ├──────────────────────────────────────────────────────────────┤
      │                 feedback line (360,500)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 replaces the word card with `ART.sentenceCard` (560 × 96) at the same centre. Fixed layout, FIT scaling. The bins swap x at each level change; their icons travel with them.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.koala` at (80, 170); `ART.stage` centred (390, 200).
- Card: `makeTile` 220 × 96 with `ART.wordCard` tokens at (360, 150), word 32 px `THEME.font.display` `THEME.colour.ink`. L3: `makeTile` 560 × 96 with `ART.sentenceCard` tokens; the sentence drawn as text pieces at 26 px `THEME.font.body` `THEME.colour.ink` with the target word as `ART.targetWord` (26 px display, teal) inline; `wordWrap` 520, max two lines; `ART.neighbourMark` under the deciding word(s) at y = +30 on the card.
- `ART.frameCard` at (360, 250): the icon (`ART.boxIcon` or `ART.runIcon` at 32 px) at (−150, 0) and the frame sentence at 22 px `THEME.font.display` `THEME.colour.structure` centred at (+20, 0), `wordWrap` 300.
- Bins: `makeTile` 220 × 150 with `ART.bin` tokens at (200, 390) and (520, 390); the icon at (0, −44); `ART.binList` at (0, +32) with words at 16 px `THEME.font.body` `THEME.colour.ink` in rows of three (x = −64 / 0 / +64), up to two rows.
- `ART.showRing` behind the correct bin. Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors: cards 220 × 96 / 560 × 96, bins 220 × 150 (≥ 56); gap between bins 100. Keyboard: Tab order = card, left bin, right bin; Enter selects / places.

## Content
Language-bound: `LOCALE_DATA[lang].items`. `en` authored in full. **Other locales: a native list is required — en pilot.** Until a native list exists, `LOCALE_DATA[lang]` falls back to `en` for the items only; chrome stays localised. A native list keeps the SAME structure (word or sentence; class; frame sentence; neighbour words) — the frames are what a native author must re-invent per language ("I can ___" is an English test frame; German would use "ich kann ___", French "je peux ___", and the noun frame takes the article and gender of that language).

Notation: word — class (`thing` → box bin / `action` → runner bin) — frame (shown on the frame card with the class icon). L3 items are sentences with the target word marked by asterisks in this list (rendered in teal, never with asterisks); `neighbours` = the words `ART.neighbourMark` underlines on a wrong bin.

- **L1 — concrete things vs motion actions**
  1. dog — thing — "a dog"
  2. cup — thing — "a cup"
  3. tree — thing — "a tree"
  4. hat — thing — "a hat"
  5. apple — thing — "an apple"
  6. boat — thing — "a boat"
  7. book — thing — "a book"
  8. chair — thing — "a chair"
  9. jump — action — "I can jump."
  10. sing — action — "I can sing."
  11. eat — action — "I can eat."
  12. swim — action — "I can swim."
  13. run — action — "I can run."
  14. dance — action — "I can dance."
  15. climb — action — "I can climb."
  16. wash — action — "I can wash."
- **L2 — event-things vs non-motion actions**
  17. party — thing — "a party"
  18. song — thing — "a song"
  19. morning — thing — "a morning"
  20. race — thing — "a race"
  21. toy — thing — "a toy"
  22. garden — thing — "a garden"
  23. cake — thing — "a cake"
  24. holiday — thing — "a holiday"
  25. think — action — "I can think."
  26. sleep — action — "I can sleep."
  27. want — action — "I want it."
  28. hear — action — "I can hear."
  29. wait — action — "I can wait."
  30. grow — action — "I can grow."
  31. hide — action — "I can hide."
  32. forget — action — "I forget things."
- **L3 — the same word as a thing and as an action, decided by the sentence**
  33. "We *watch* the birds." — action — "We watch." — neighbours: We
  34. "My *watch* is new." — thing — "a watch" — neighbours: My, is
  35. "They *fish* in the lake." — action — "They fish." — neighbours: They
  36. "The *fish* is red." — thing — "a fish" — neighbours: The, is
  37. "I *drink* milk." — action — "I drink." — neighbours: I
  38. "This *drink* is cold." — thing — "a drink" — neighbours: This, is
  39. "We *paint* the wall." — action — "We paint." — neighbours: We
  40. "The *paint* is wet." — thing — "the paint" — neighbours: The, is
  41. "I *brush* my hair." — action — "I brush." — neighbours: I
  42. "The *brush* is blue." — thing — "a brush" — neighbours: The, is
  43. "We *walk* to school." — action — "We walk." — neighbours: We
  44. "Our *walk* was long." — thing — "a walk" — neighbours: Our, was

Stream rules: L1 and L2 deal a shuffled mix of their things and actions; no more than two consecutive cards to the same bin. L3 deals sentence PAIRS: whenever a word's action sentence is dealt, its thing sentence is dealt within the next three cards (and vice versa), so the child meets both faces of the same word in one session. Play list of 12 per Rules (shuffle within level, levels in order); a word appears at most once per session at L1/L2 and at most twice (its two faces) at L3; bins swap sides at each level change.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive cards → next card one level down (floor L1); every level change swaps the bins' sides.
- What happens on a correct answer: the bin's icon `ANIM.pop`s, `tone("correct")`, the frame card shows the word in its frame with the class icon for 900 ms, the card shrinks into the bin's list; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct card and on the twelfth; rail dot; next card after the frame fades.
- What happens on a wrong answer (each begins with `tone("nudge")`, the frame card with the CORRECT frame and icon for 1500 ms, the correct bin's icon pulsing, and the card gliding back):
  - Non-motion action sorted as a thing (sleep, think, want, hear, wait, grow, hide, forget): frame "I can sleep." with the runner icon; `t("look_carefully")`.
  - Event-thing sorted as an action (party, race, song, holiday, morning): frame "a party" with the box icon.
  - L3 wrong face (the sentence's use ignored): the frame for the sentence's class AND `ART.neighbourMark` under the deciding neighbour word(s) on the sentence card.
  - Concrete thing / motion action sorted wrongly (L1): the frame with its icon.
  - Bin tapped with nothing selected: its icon pops; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the frame → attempt 3 with the frame again and the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Noun or Verb" (the title is the ONLY place a grammar term appears, and only in the chrome — a native list may rename it "Thing or Action"). The 44 items with their frames are `LOCALE_DATA.en.items` (Content), not STRINGS. No word ever labels a bin.

## Sound
`tone("tap")` on selecting a card; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 3)` when a frame card appears; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the words and sentences are read by the child.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, Look carefully, All done, Play again, Menu and praise change with the picker; the English word set is the pilot content under every `?lang=`; no raw key names appear; the bins never show a word in any language).
- [ ] Works at narrow width (400-px iframe: the sentence card at the third level, both bins with icons and lists, and the frame card are all visible).
- [ ] Keyboard operable (Tab: card, left bin, right bin; Enter selects the card / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The two bins are labelled only by a box picture and a running-figure picture; the words "noun" and "verb" appear nowhere on the play screen.
- [ ] Putting "sleep" in the box bin shows "I can sleep." with the running figure, pulses the runner bin's icon and slides the card back.
- [ ] Putting "party" in the runner bin shows "a party" with the box.
- [ ] At the third level, "My watch is new." with "watch" in teal put in the runner bin underlines "My" and "is" and shows "a watch" with the box; "We watch the birds." put in the box bin underlines "We" and shows "We watch." with the runner.
- [ ] Both sentences for the same word appear within a few cards of each other.
- [ ] A correct card also shows its frame briefly before joining the bin's list.
- [ ] Three first-try corrects in a row bring the harder set and swap the bins; a wrong bin brings the easier set back (swapped again).
- [ ] The finish screen shows both bins with their word lists and filled or hollow dots; no score.
- [ ] With `?sound=off` nothing is audible.
