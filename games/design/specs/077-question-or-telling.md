# 077 — Question or Telling

## Identity
- Slug: `question-or-telling`
- Subject / topic: Literacy / end marks — deciding whether a sentence asks or tells and giving it the right end mark (? or .)
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the sentence, then tap a bin; the bin stamps the mark)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Locale note: sentences are language-bound (F-128; A-15) and live in `LOCALE_DATA` together with each locale's opening mark (Spanish questions open with an inverted mark, which the stamp adds at the front); English is authored in full, the other ten locales are declared as needing a native set (en pilot). Nothing is spoken; the child reads the sentence.

## Learning
- Objective: Reads a sentence with no end mark, decides whether it asks or tells, and sorts it into the bin that stamps the matching mark (question mark or full stop).
- Prerequisites: Reads sentences of up to 8 words (games 074-076). Knows the full stop as an end mark (game 076).
- Curriculum links: F-22 (sentence conventions — capital to start, full stop / question mark to end — by 8 in all twelve systems), F-128, F-31 row "Capital + full stop; sentence order" → 6-8 (US L.1.2.b "use end punctuation for sentences"; England Y1 "question marks"; Germany Klasse 2 "Punkt und Fragezeichen"; France CE1 "point et point d'interrogation"; Netherlands groep 4 "vraagteken"; Spain 1º ciclo "signos de interrogación"; Brazil EF02LP09; Sweden åk 1-3 "frågetecken"; Norway 2. trinn "spørsmålstegn"; Finland 2. luokka "kysymysmerkki"). F-6 notes punctuation is a niche game genre (1 of 15 sources) — this is the catalogue's one dedicated ? vs . game.
- Common misconceptions (F-128), each with this game's response:
  1. **Sorts by length or topic instead of by how the sentence starts ("Where is the cat" and "The cat is on the mat" are both about the cat).** Response: the cue is the sentence START. After a wrong bin the sentence glides back and its cue word (`LOCALE_DATA` item `cueIndex`, in English word 0: Where / Can / Is / The / We…) is ringed in coral (`ART.cueRing`, `ANIM.markIn`) for 1000 ms — asks begin with a question word or a verb, tells begin with the thing they are about.
  2. **Cannot see the difference between "You can swim" and "Can you swim" (same words).** Response: L3 streams these as PAIRS in the same session (never back-to-back), so the same words appear in both orders and only the first word differs; the cue ring on word 0 makes the swap visible.
  3. **Knows the rule but does not apply it — stamps a full stop on everything.** Response: a tell placed in the ask bin (or the reverse) is refused gently: the sentence glides back and, on the second wrong bin, the correct bin's mark pulses (`ANIM.pulse` on `ART.askMark` or `ART.tellMark`); the correct stamp is only ever applied by the child's own tap.
  4. **Uses the exclamation mark playfully (F-128: not an error to punish).** Response: there is no exclamation bin and no sentence in the stream is an exclamation; nothing the child does here can be "wrong about !".
  5. **Brute-force sorting (tap bin 1, then bin 2).** Response: a wrong bin plays the 1.2 s cue with the bins disabled, an item solved after any wrong bin is never first-try, and the third wrong bin is the show-me ring — the second bin is never a free guess (F-65).

## How it plays
1. **Start screen**: title "Question or Telling", the turtle (`ART.turtle`) at (360, 200), Start, picker.
2. **Item 1 (L1: "Where is the cat")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the turtle at (360, 84) at 48 px; the sentence card (`ART.sentenceCard`, 560 × 80) centred at (360, 160) with the sentence at 28 px `THEME.font.display` `THEME.colour.ink` and no end mark; a dashed end box (`ART.endBox`, 32 × 44) 8 px after the last word marks where the mark will go. Zone B: two bins (`ART.bin`, 220 × 140) at y = 380, x = 220 / 500: the ASK bin carries `ART.askMark` ("?", 64 px) on its front and the TELL bin `ART.tellMark` (".", 64 px, drawn with `ART.tellDot` beneath the glyph so the small dot reads as a big mark); each bin has a count sub-label (`ART.binCount`, "0"). The bins' left/right order is shuffled per session (not per item — the bins stay put once the session starts, like real sorting trays). Caption `S("askOrTell")` ("Does it ask or tell?") at (360, 262), 22 px `THEME.colour.inkSoft`.
3. **Sorting**: tap the sentence card (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin.
   - **Correct bin**: the card glides (`ANIM.glide`) into the bin and shrinks (`ANIM.stampIn`, scale to 0.6); the bin stamps the mark: `ART.stampMark` ("?" or ".", 28 px `THEME.colour.accent`) appears in the end box scaling down from 1.6 (`ANIM.stamp`) — for a locale with an opening mark (`LOCALE_DATA.es.open = "¿"`) a second `ART.stampMark` appears before the first word at the same time; `tone("correct")`; the bin's count goes up by one and the bin `ANIM.pop`; a praise pop on every third correct sort and on the twelfth; the rail dot fills; the next sentence arrives after 500 ms (`ANIM.slideIn` from the right).
   - **Wrong bin**: the card glides back to (360, 160), `tone("nudge")`; `ART.cueRing` draws around the cue word for 1000 ms; bins disabled during the cue. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin's mark `ANIM.pulse`s; attempt 3.
   - **Third wrong bin**: the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); sorting there completes the item as solved-with-help.
   - Tapping a bin with no sentence selected: the bin's mark `ANIM.pop`s (a harmless preview); nothing else.
4. **Items 2-12**: L1 sentences that start with a question word (where / what / who / when / why / how) or with a plain subject; L2 sentences that start with an auxiliary verb (can / is / do / are / did) or a subject; L3 same-word pairs ("Can you swim" / "You can swim") and longer sentences up to 8 words.
5. **Re-queue** (F-41): an item sorted wrong first-try re-enters after 2 intervening items; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the turtle (360, 200) `ANIM.celebrate`; the summary = the two bins at y = 400 (x = 220 / 500) with their final counts and, above each, its sentences stacked as chips (`ART.sentenceChip`, 300 × 24, 14 px, the stamped mark in `THEME.colour.accent`) — the sorted sentences, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  turtle:       { kind: "emoji", value: "🐢", size: 80 },                   // mascot
  sentenceCard: { kind: "shape", shape: "roundRect", w: 560, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },  // sentence 28 px display ink
  endBox:       { kind: "shape", shape: "roundRect", w: 32, h: 44, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },        // dashed (lineDash [6,4])
  bin:          { kind: "shape", shape: "roundRect", w: 220, h: 140, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  askMark:      { kind: "text",  value: "?", size: 64, font: "display", color: "structure" },
  tellMark:     { kind: "text",  value: ".", size: 64, font: "display", color: "structure" },
  tellDot:      { kind: "shape", shape: "circle", r: 14, fill: "structure" },                // drawn under the "." glyph so the tell mark is as visible as the "?"
  binCount:     { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  stampMark:    { kind: "text",  value: "", size: 28, font: "display", color: "accent" },
  cueRing:      { kind: "shape", shape: "roundRect", w: 80, h: 44, stroke: "accent", strokeWidth: 3, radius: 10 },   // resized to the cue word at runtime (w = word width + 16)
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 152, stroke: "structure", strokeWidth: 4, radius: 20 },
  sentenceChip: { kind: "shape", shape: "roundRect", w: 300, h: 24, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 6 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The only emoji is the mascot; the content is text. Colour is never the only cue: the bins differ by their mark glyphs, the stamped mark is a glyph, the cue is a ring.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new sentence card from x = 1000 to centre" },
  lift:      { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "sentence card selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card into a bin / back to centre (x,y at call)" },
  stampIn:   { scale: 0.6, alpha: 0, duration: 300, ease: "Sine.In", delay: 400, trigger: "card shrinks and fades inside the bin after the stamp" },
  stamp:     { scale: 1, duration: 220, ease: "Back.Out", trigger: "stampMark in the end box (and before the first word for locales with an opening mark), from scale 1.6" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin on a correct sort; bin mark preview tap" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "cueRing around the cue word (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "correct bin's mark after the second wrong bin" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish turtle" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                       turtle (360,84)                         │
      │   ┌──────────────────────────────────────────────┐            │  zone A
      │   │  Where is the cat  [ ]   sentence card (360,160) 560×80    │
      │   └──────────────────────────────────────────────┘  end box   │
260   ├──────────────────────────────────────────────────────────────┤
      │              "Does it ask or tell?" (360,262)                 │
      │      ┌──────────┐              ┌──────────┐   bins y=380       │
      │      │    ?     │              │    .     │   x=220 / 500      │  zone B
      │      │    0     │              │    0     │   (220×140)        │
      │      └──────────┘              └──────────┘                    │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.turtle` at (360, 84) drawn at 48 px during play.
- The sentence card is a `makeTile` 560 × 80 with `ART.sentenceCard` tokens; the sentence is drawn as one text object per WORD (28 px, 10 px word gaps, the line centred) so the cue word can be ringed; `ART.endBox` 8 px after the last word; text budget: 8 English words ≈ 420 px at 28 px, so a 1.6× locale fits 560 with the library shrink as the backstop.
- Bins: `makeTile` 220 × 140 with `ART.bin` tokens; `ART.askMark` / `ART.tellMark` (+ `ART.tellDot`) centred at (0, −18); `ART.binCount` at (0, +44). The ask/tell assignment to left/right is shuffled once per session.
- `ART.stampMark` centred in the end box (and, for an opening mark, 16 px before the first word); `ART.cueRing` around the cue word; `ART.showRing` behind the correct bin.
- Caption `S("askOrTell")` at (360, 262), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 480.
- Tap floors: card 560 × 80, bins 220 × 140 (≥ 56). Gap between bins 60.
- Keyboard: Tab: the card, then the two bins; Enter selects / sorts.

## Content
Sentences are language-bound. `LOCALE_DATA[lang]` = `{ open: "", items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ text: "Where is the cat", type: "ask" | "tell", cueIndex: 0, pair: null | <id of its same-words twin> }`. `open` is the mark stamped before the first word of an ask (es: "¿"; all others ""). The English set is complete. **Other locales: a native sentence set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then; the Spanish author sets `open: "¿"`; German/Nordic authors note that asks and tells are separated by verb-first vs subject-first order, so `cueIndex` stays 0).

**en** (all ≤ 8 words):
- L1 (question words vs subject starts): Where is the cat (ask) · The cat is on the mat (tell) · What is in the box (ask) · The box is empty (tell) · Who has the ball (ask) · The dog has the ball (tell) · When do we eat (ask) · We eat at noon (tell) · Why is the sky blue (ask) · The sky is blue (tell) · How many legs does a bee have (ask) · A bee has six legs (tell)
- L2 (auxiliary-verb starts vs subject starts): Can you swim (ask) · You can swim (tell) · Is it raining (ask) · It is raining (tell) · Do you like cake (ask) · I like cake (tell) · Are we there yet (ask) · We are nearly there (tell) · Did the frog hop (ask) · The frog hopped away (tell) · Does the owl sleep all day (ask) · The owl sleeps all day (tell)
- L3 (same-word pairs, `pair` links the twins, never streamed back-to-back; plus longer items): Can the dog jump over the log (ask) / The dog can jump over the log (tell) · Is the water cold today (ask) / The water is cold today (tell) · Will it snow tomorrow (ask) / It will snow tomorrow (tell) · Does the owl sleep all day (ask) / The owl sleeps all day (tell) · Where did the little frog go (ask) · The little frog went home (tell)

Play list: 12 items per Rules; within a level the stream alternates ask/tell no more than two of a kind in a row; a same-word pair is never adjacent; no sentence repeats except by re-queue.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3). (Three: items take ~10-15 s.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: card glides into the bin, `ANIM.stamp` of the mark in the end box (and the opening mark where the locale has one), `tone("correct")`, bin count +1 with `ANIM.pop`; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct sort and on the twelfth; rail dot; next sentence in 500 ms.
- What happens on a wrong answer:
  - Sorted by topic/length (a tell in the ask bin or the reverse): card glides back, `tone("nudge")`, `ART.cueRing` around the first word for 1000 ms.
  - Same-word twin confusion (L3): the same cue — the ring sits on the word that differs between the twins.
  - Second wrong bin: the cue + the correct bin's mark pulses.
  - Third wrong bin: the show-me ring; solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the pulsing mark → the ringed bin. No further attempts needed; the item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Question or Telling"; `askOrTell` = "Does it ask or tell?". Sentences are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on selecting the card; `tone("correct")` on a correct sort; `tone("tap", 6)` as the stamp lands (a higher "click"); `tone("nudge")` on a wrong bin; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=es` plays the English set until a Spanish set exists; once a Spanish set exists an ask is stamped with both the opening and closing marks).
- [ ] Works at narrow width (400-px iframe: the 8-word sentence card and both bins fully visible).
- [ ] Keyboard operable (Tab: sentence, ask bin, tell bin; Enter selects and sorts).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always completes the item).
- [ ] Sorting "Where is the cat" into the ask bin stamps a coral "?" in the end box before the card shrinks into the bin.
- [ ] Sorting "The cat is on the mat" into the ask bin sends the card back and rings "The" for a second.
- [ ] At the third level "Can you swim" and "You can swim" both appear in the session and never one right after the other.
- [ ] The second wrong bin makes the correct bin's mark pulse; the third shows a ring around it.
- [ ] Bin counts go up only on correct sorts; the finish screen shows both bins with their sentences and no score.
- [ ] Three first-try sorts in a row bring auxiliary-verb sentences; a wrong bin brings question-word sentences back.
- [ ] Tapping a bin with nothing selected only pops its mark.
- [ ] With `?sound=off` nothing is audible.
