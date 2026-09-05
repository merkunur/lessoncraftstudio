# 076 — Capital and Stop

## Identity
- Slug: `capital-and-stop`
- Subject / topic: Literacy / sentence boundaries — placing a capital letter on the first word and a full stop after the last word of a written sentence (and finding the boundary between two run-together sentences)
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (select a source mark, then tap the word it belongs to), judged per placement
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Locale note: sentences are language-bound (F-128; A-15) and live in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). Statements only — the question mark is game 077's job. German shows its nouns already capitalised (that is correct German, not an error to fix); Spanish statements need no opening mark.

## Learning
- Objective: Fixes a written sentence that starts with a small letter and has no end mark by placing the capital-letter tile on the first word and the full-stop tile after the last word — and, at the top level, does it twice for two sentences run together.
- Prerequisites: Reads short sentences of 3-8 words (games 074/075). Knows a capital and a small letter are the same letter (game 007).
- Curriculum links: F-22 (sentence conventions by 8 in all twelve systems), F-128 ("reassemble … with the boundary as a gap closed by a stop; proofread OTHERS' sentences"), F-31 row "Capital + full stop; sentence order" — conservative 7-8, earliest 5 → 6-8 (US L.1.2.a-b "capitalize … use end punctuation"; England Y1 "capital letters and full stops to demarcate sentences"; Germany Klasse 2 "Satzanfang groß, Punkt am Satzende"; France CP-CE1 "majuscule et point"; Netherlands groep 4 "hoofdletter en punt"; Spain 1º ciclo "mayúscula y punto"; Brazil EF02LP08; Sweden åk 1-3 "stor bokstav och punkt"; Denmark 1.-2. klasse; Norway 2. trinn; Finland 1.-2. luokka "iso alkukirjain ja piste").
- Common misconceptions (F-128), each with this game's response:
  1. **Knows the rule but does not apply it — capital placed on a "big" or important word (the noun) rather than the first word.** Response: the capital settles on that word for 600 ms so the child sees "the Dog" (`ART.capGhost`), then the start flag (`ART.startFlag`, a small teal pennant drawn just before the first word) pulses (`ANIM.pulse`) and the capital tile glides back to the tray — the START is where capitals live.
  2. **Full stop placed mid-sentence (after the verb, after the first "chunk").** Response: the stop attaches for 1000 ms and every word after it dims to alpha 0.35 and slides 12 px right (`ANIM.cutOff`) — those words would be cut off from the sentence; then the stop glides back.
  3. **Cannot find the boundary between two run-together sentences (L3).** Response: a correctly placed stop makes a NEW start flag appear after it (`ART.startFlag`, `ANIM.appear`) — a stop creates a start, so the child can find the second capital's place by finding the stop first; a capital placed on a word that is not a sentence start gets response 1 with the nearest flag pulsing.
  4. **Random capitals (the decoy capital of another word's initial, or a capital on a mid word).** Response: L2's tray holds a decoy capital (the initial of a mid word, e.g. "D" for "dog"); placing it on the first word shows the mis-spelt word ("Dhe") in `THEME.colour.inkSoft` for 800 ms (`ART.capGhost`) and it returns — the letter must be the word's own; placing it on "dog" gets response 1.
  5. **Treating the comma as an end mark (L2 decoy).** Response: the comma tile placed after the last word attaches for 800 ms and the sentence stays "open" — the end slot keeps its dashed look and pulses (`ART.endPulse`) — then the comma returns; no verdict, just the still-open end.

## How it plays
1. **Start screen**: title "Capital and Stop", the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker.
2. **Item 1 (L1: "the sun is hot")**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the sentence as a row of word cards (`ART.wordCard`, height 64, width = text width + 28, min 72) centred as a group at y = 160, 12 px gaps, words at 30 px: "the", "sun", "is", "hot"; the start flag (`ART.startFlag`) 20 px left of the first card; a dashed end slot (`ART.endSlot`, 36 × 64) 8 px right of the last card. The hedgehog sits at (80, 160) holding a pencil pose (no animation). Zone B: the tray — the capital tile (`ART.markTile`, 96 × 96) showing `ART.capLetter` "T" at (260, 400) and the stop tile (`ART.markTile` with `ART.stopGlyph`) at (460, 400). Caption `S("fixSentence")` ("Fix the sentence") at (360, 290), 22 px `THEME.colour.inkSoft`.
3. **Placing**: tap a tray tile (it lifts, `ANIM.lift`, `tone("tap")`), then tap a word card:
   - **Capital on the first word**: the card's first letter is replaced by the capital (`ANIM.glide` of the tile into the card, then the letter swaps), `tone("correct")`, the tray tile is consumed; the start flag turns solid (`ANIM.pop`).
   - **Stop after the last word**: the stop glides to the end slot, which turns solid and shows "." at 30 px, `tone("correct")`.
   - **Capital on any other word / stop after any other word / decoy mark**: the enacted refusal from Learning 1-5 (600-1000 ms), `tone("nudge")`, the tile returns to the tray. Attempt counted for that mark.
   - **Second wrong placement of the same mark**: the refusal again, then the correct destination gains `ART.hintRing` (`ANIM.showMe`) — the first word for a capital, the last word for a stop.
   - **Third wrong placement**: the show-me — both the correct tray tile and its destination carry the ring; placing it completes that mark as solved-with-help.
   - Tapping a placed mark (a capital already on a word, a stop in a slot) returns it to the tray (undo, free), unless the item is complete.
4. **Item complete** (all required marks correctly placed): the sentence line glows (`ART.sentenceGlow`, `ANIM.glow`) and the words light left to right (`ANIM.readBack`), praise pop if no wrong placement, the hedgehog `ANIM.nod`; rail dot; next item after 900 ms.
5. **Items 2-10**: L1 one sentence of 3-4 words, tray = its capital + a stop; L2 one sentence of 4-6 words, tray = its capital + a stop + a decoy capital + a comma tile; L3 two sentences run together (6-8 words), tray = two capitals + two stops (no decoys); the second start flag appears only once the first stop is placed.
6. **Re-queue** (F-41): an item with any wrong placement re-enters after 2 intervening items; the count stays 10.
7. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = the ten fixed sentences as one-line chips (`ART.sentenceChip`, 600 × 30, 18 px, capitals and stops in `THEME.colour.accent`) stacked from y = 300 at 30 px pitch, with `ART.dotFull` / `ART.dotEmpty` at the left for first-try / helped; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  hedgehog:     { kind: "emoji", value: "🦔", size: 80 },                  // mascot (Unicode 10)
  wordCard:     { kind: "shape", shape: "roundRect", w: 72, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },   // width = text width + 28 at runtime; word 30 px display ink
  startFlag:    { kind: "shape", shape: "polygon", points: [[-8,-16],[10,-8],[-8,0]], fill: "structure" },                        // hollow (stroke only) until the capital lands
  endSlot:      { kind: "shape", shape: "roundRect", w: 36, h: 64, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },  // dashed (lineDash [6,4]) while empty
  markTile:     { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  capLetter:    { kind: "text",  value: "", size: 56, font: "display", color: "structure" },
  stopGlyph:    { kind: "text",  value: ".", size: 72, font: "display", color: "structure" },
  commaGlyph:   { kind: "text",  value: ",", size: 72, font: "display", color: "inkSoft" },
  capGhost:     { kind: "text",  value: "", size: 30, font: "display", color: "inkSoft" },
  endPulse:     { kind: "shape", shape: "roundRect", w: 48, h: 76, stroke: "accent", strokeWidth: 3, radius: 10 },
  hintRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },   // resized to the destination card at runtime (w = card w + 12)
  sentenceGlow: { kind: "shape", shape: "roundRect", w: 640, h: 84, fill: "structureSoft", radius: 16 },
  sentenceChip: { kind: "shape", shape: "roundRect", w: 600, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The only emoji is the mascot; the content is text.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tray tile to a word card / end slot and back (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "start flag when its capital lands; end slot when its stop lands" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "start flag after a misplaced capital; endPulse after a comma at the end" },
  cutOff:    { x: "+=12", alpha: 0.35, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "every word card after a misplaced stop" },
  ghostIn:   { alpha: 1, duration: 150, ease: "Sine.Out", yoyo: true, hold: 600, trigger: "capGhost (the word with the wrong capital) drawn over the card (from alpha 0)" },
  readBack:  { alpha: 0.4, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "each word card in turn, 200 ms apart, on completion" },
  glow:      { alpha: 1, duration: 260, ease: "Sine.Out", yoyo: true, trigger: "sentenceGlow behind the row on completion (from alpha 0)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new sentence and tray; the second start flag at L3 (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct destination / tray tile (from alpha 0.2)" },
  nod:       { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog on completion" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │ hedgehog   ▷ [ the ] [ sun ] [ is ] [ hot ] [ : ]   y=160     │  zone A
      │ (80,160)   flag    cards centred as a group, gaps 12   end slot│
      │                                                              │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Fix the sentence" (360,290)                  │
      │           [  T  ]                    [  .  ]    y=400          │  zone B
      │           x=260                      x=460     (96×96)        │
      │   L2 tray: [ T ] [ D ] [ . ] [ , ] at x=180/300/420/540        │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 (two sentences, 6-8 words): the row wraps to two lines at y = 140 and y = 200 when the group is wider than 620 px (break after the 4th word); tray = [ T ] [ T ] [ . ] [ . ] at x = 180 / 300 / 420 / 540. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Word cards: `makeTile` with `ART.wordCard` tokens, width = measured text width + 28 (min 72), height 64, word 30 px `THEME.font.display` `THEME.colour.ink`; the group centred on x = 360 (or per line at L3). `ART.startFlag` 20 px left of a sentence's first card (stroke-only until its capital lands, then filled + `ANIM.pop`). `ART.endSlot` 8 px right of the last card of each sentence (at L3 the first sentence's end slot sits between its last word and the next word — every word card doubles as a stop destination, and the slot that turns solid is drawn after the word tapped).
- Tray: `makeTile` 96 × 96 with `ART.markTile` tokens carrying `ART.capLetter` (the sentence's own capital), `ART.stopGlyph`, and at L2 a decoy `ART.capLetter` and `ART.commaGlyph`. Consumed tiles disappear; an undone mark re-appears in the tray.
- Cues: `ART.capGhost` over a card; `ART.endPulse` around the end slot; `ART.hintRing` around a destination card (resized) or a tray tile; `ART.sentenceGlow` behind the row.
- `ART.hedgehog` at (80, 160). Tap floors: word cards ≥ 72 × 64 (≥ 56), tray 96. Gaps 12.
- Keyboard: Tab walks the tray tiles then the word cards left to right; Enter selects / places; the end of a sentence is placed by "stop then the last word".

## Content
Sentences are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ words: ["the","sun","is","hot"], capitals: [0], stops: [3], decoys: [] | ["D", ","] }` (`capitals` = word indices that take a capital; `stops` = word indices after which a stop goes). Words are shown exactly as listed (German lists carry their capitalised nouns). The English set is complete. **Other locales: a native sentence set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then).

**en**:
- L1 (one sentence, 3-4 words; tray = capital + stop): the sun is hot · the cat sleeps · we like cake · my dog can run · the bus is red · birds can fly · fish swim fast · the frog hops · it is raining · we sing songs
- L2 (one sentence, 4-6 words; tray = capital + stop + decoy capital (the initial of the word in brackets) + comma): the little pig ran home (P) · we play in the park (P) · my cat likes warm milk (C) · the red bus stops here (B) · the owl sleeps all day (O) · ducks swim on the pond (S) · the moon is up now (M) · my hat is too big (H)
- L3 (two sentences run together; tray = two capitals + two stops; `capitals` / `stops` given): the dog barks the cat runs ([0, 3] / [2, 5]) · it is cold put on a hat ([0, 3] / [2, 6]) · we ran home it was late ([0, 3] / [2, 5]) · the sun is up birds sing ([0, 4] / [3, 5]) · i see a frog it hops away ([0, 4] / [3, 6]) · the soup is hot we wait ([0, 4] / [3, 5]) · the bee hums the bird sings ([0, 3] / [2, 5]) · the frog jumps the fish swims ([0, 3] / [2, 5])
- The capital tile shows the uppercase of the first letter of each capitalised word ("T", "W", "M", "B", "F", "I", "D"); at L3 the two capital tiles may show the same letter.

Play list: 10 items per Rules; shuffled within level; no sentence repeats except by re-queue; tray order shuffled per item.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed without a wrong placement → next level (cap L3).
- Adaptation: an item with a wrong placement, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each correct mark lands with `tone("correct")` and `ANIM.pop` on its flag/slot; on completion `ANIM.readBack` + `ANIM.glow`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed without a wrong placement, hedgehog `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Capital on a non-initial word: `ART.capGhost` shows the capitalised word for 600 ms, the nearest start flag pulses, the tile returns; `tone("nudge")`.
  - Stop after a non-final word: the following words `ANIM.cutOff` for 1000 ms, the stop returns.
  - Decoy capital on the first word: `ART.capGhost` shows the mis-spelt word for 800 ms, the tile returns.
  - Comma at the end: attaches for 800 ms while `ART.endPulse` pulses, then returns.
  - Second wrong placement of the same mark: the cue + `ART.hintRing` on the correct destination; third: rings on tile and destination (show-me), solved-with-help.
- Retry behaviour: per mark: attempt 1 → attempt 2 with the destination ring → attempt 3 with the show-me. Undo of a placed mark is always free before completion.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Capital and Stop"; `fixSentence` = "Fix the sentence". Sentences are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on selecting a tray tile; `tone("correct")` when a mark lands correctly; `tone("nudge")` on a refused placement; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=es` plays the English set until a Spanish set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: an 8-word L3 row wraps to two lines and all tray tiles are visible).
- [ ] Keyboard operable (Tab across the tray then the words; Enter selects a mark and places it on a word).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused placements still ends with every mark placed; the show-me rings always complete a mark).
- [ ] Placing "T" on "sun" shows "Sun" for a moment, the flag before "the" pulses, and the T returns to the tray.
- [ ] Placing "." after "is" dims and shifts "hot" for a second, then the stop returns.
- [ ] Placing "T" on "the" makes it "The" and fills the flag; placing "." after "hot" fills the end slot.
- [ ] At the second level the decoy capital on "the" shows a mis-spelt word and returns; the comma at the end leaves the slot open and pulsing.
- [ ] At the third level placing the first stop makes a second flag appear before the next word.
- [ ] Tapping a placed capital or stop before the item completes returns it to the tray.
- [ ] Two clean items in a row bring a longer sentence; a refused placement brings a shorter one next.
- [ ] The finish screen lists the ten fixed sentences with their capitals and stops in coral, and no score.
- [ ] With `?sound=off` nothing is audible.
