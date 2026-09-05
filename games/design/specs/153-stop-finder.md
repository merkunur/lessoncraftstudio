# 153 — Stop Finder

## Identity
- Slug: `stop-finder`
- Subject / topic: Literacy / sentence boundaries — finding where one sentence ends and the next begins in a short run-on text, and placing the full stop there
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap each sentence boundary once; a Done tile states that every stop is placed)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap marks one seam and plays one rising tone; tapping a placed stop removes it; the Done tile judges completeness). Locale note: **sentence boundaries are language-general; the sentences are language-bound** (F-128; A-15 — V2 order in de/nl/sv/da/no, verb-final subordinates in de, free order in fi) and live in `LOCALE_DATA`. English is authored in full; the other ten locales are declared as needing a native set (en pilot). Statements only (the question mark is game 077's job). Nothing is spoken.

## Learning
- Objective: In a text of two or three sentences run together with no end marks, taps the seam between words where each sentence ends so that a full stop drops in there, and taps nowhere else.
- Prerequisites: Reads short sentences of 3-6 words (games 074-076). Knows what a full stop looks like and that it ends a sentence (game 076 places one on a single sentence; this game FINDS the place in a run-on).
- Curriculum links: F-22 (sentence conventions — full stop to end — by 8 in all twelve systems), F-128 ("cannot find sentence boundaries; reassemble … with the boundary as a gap closed by a stop; proofread OTHERS' sentences"), F-129 (poor comprehenders do not integrate across sentences — the boundary is found by reading for sense), F-31 row "Capital + full stop; sentence order" — conservative 7-8, earliest 5 → 6-8 (US L.1.2.b "use end punctuation for sentences"; England Y1 "full stops to demarcate sentences"; Germany Klasse 2 "Punkt am Satzende"; France CE1 "point en fin de phrase"; Netherlands groep 4 "punt aan het eind van de zin"; Spain 1º ciclo "el punto"; Brazil EF02LP08; Sweden åk 1-3 "punkt"; Denmark 1.-2. klasse; Norway 2. trinn; Finland 1.-2. luokka "piste").
- Common misconceptions (F-128, F-129), each with this game's response:
  1. **Cannot find the boundary — stops after the first "chunk" (after the verb: "the dog barks. the cat runs" is right, but "the dog. barks the cat runs" is the error).** Response: a stop placed mid-sentence attaches for 1000 ms and every word from that seam up to the true end of that sentence dims to alpha 0.35 and slides 12 px right (`ANIM.cutOff`) — those words would be cut off from their sentence; the stop then lifts out again (`ANIM.lift` reversed) and the seam is empty. No verdict; the child sees what the stop would do.
  2. **Stops after a joining word or before it ("the bee hums. and the bird sings").** Response: L2 sentences contain a joining word; a stop placed on either side of it makes `ART.linkGlyph` (a short chain bar) appear under the joining word spanning to both neighbours for 1000 ms — "this word joins" — and the stop lifts out.
  3. **Places one stop and declares Done (does not read on for the second boundary).** Response: Done with boundaries remaining nudges the button; the run-on part from the last placed stop to the end of the text is highlighted as one long run (`ART.runGlow`) and its words light left to right (`ANIM.readBack`) — the run is visibly too long to be one sentence; the hunt continues. On the second Done the missing seam(s) gain `ART.hintRing` (show-me).
  4. **Stops after every word or every two words.** Response: each such stop gets the cut-off cue (misconception 1) and lifts out; nothing sticks that is not a true boundary, so the text can never end up chopped.
  5. **Not linking the stop to a capital (does not expect the next word to change).** Response: a correctly placed stop makes the NEXT word's first letter turn into a capital with `ANIM.pop` — a stop creates a start (the same rule as game 076) — and undoing the stop turns it small again.

## How it plays
1. **Start screen**: title "Stop Finder", the tortoise (`ART.tortoise`) at (360, 200), Start, picker.
2. **Item 1 (L1: "The dog barks the cat runs")**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the text as word cards (`ART.wordCard`, height 56, width = text width + 24, min 56, word 26 px) laid in lines of up to four words — line 1 at y = 120, line 2 at y = 180 (line 3 at y = 240 for L3) — each line centred on x = 360; between every two consecutive words (in reading order) sits a seam tile (`ART.seamTile`, 56 × 64, transparent) with a faint `ART.seamDot` at its bottom centre; a seam that falls at a line break is drawn 56 px to the right of the line's last card. Only the first word of the text is capitalised. The tortoise sits at (70, 180) at 60 px. Zone B: the sentences' characters as pictures (`ART.picDog` at (300, 330), `ART.picCat` at (420, 330), 56 px) and the Done tile (`makeButton ok`) at (360, 430), enabled from the start. Caption `S("findStops")` ("Find where each sentence ends") at (360, 80), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **Placing stops**: the child taps a seam.
   - **A true boundary** (the seam after "barks"): `ART.stopGlyph` drops into the seam (`ANIM.drop`), `tone("tap", k)` (k = stops placed, pitch rising), `ART.countBadge` with k on the stop; the next word's first letter turns into its capital ("The cat runs" — `ANIM.pop` on that card). Tapping the placed stop again removes it (undo, free: the glyph `ANIM.lift`s out and the capital turns small again).
   - **A mid-sentence seam** (after "dog"): the stop drops in, then the cut-off cue plays for 1000 ms (`ANIM.cutOff` on "barks"), `tone("nudge")`, the stop lifts out; the seam stays enabled. Counts as a wrong tap.
   - **A seam beside a joining word** (L2): the stop drops in, `ART.linkGlyph` appears under the joining word for 1000 ms, `tone("nudge")`, the stop lifts out. Counts as a wrong tap.
   - Keyboard: Tab walks the seams in reading order; Enter places / removes.
4. **Done**: the child taps `ok`.
   - **All boundaries stopped** (the only complete state — wrong stops never stay): every sentence glows in turn (`ART.sentenceGlow`, `ANIM.glow`, 400 ms apart) while its words light left to right (`ANIM.readBack`), `tone("correct")`, praise pop (only if no wrong tap), tortoise `ANIM.peek`; rail dot; next item after 900 ms (`ANIM.appear`).
   - **Boundaries remain**: `ANIM.nudge` on Done, `tone("nudge")`; `ART.runGlow` behind the run from the last stop to the end, its words `ANIM.readBack`; the hunt continues. Attempt 2.
   - **Second Done with boundaries remaining**: the run cue again, then `ART.hintRing` (`ANIM.showMe`) on each missing seam — the show-me; placing them and tapping Done completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 two short sentences (6-7 words, one boundary); L2 two sentences of 4-6 words with a joining word inside one of them (one boundary, 9-11 words); L3 three sentences (two boundaries, 8-10 words).
6. **Re-queue** (F-41): an item with any wrong tap or an early Done re-enters after 2 intervening items; the count stays 10.
7. **Finish**: `t("all_done")` (360, 110); the tortoise (360, 200) `ANIM.celebrate`; the summary = the ten texts as one-line chips (`ART.textChip`, 600 × 30, 16 px, each stop and each capital in `THEME.colour.accent`) stacked from y = 300 at 30 px pitch, with `ART.dotFull` at the left of first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  tortoise:     { kind: "emoji", value: "🐢", size: 80 },                    // mascot (slow and careful — the game's pace)
  wordCard:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },   // width = text width + 24 at runtime; word 26 px display ink
  seamTile:     { kind: "shape", shape: "roundRect", w: 56, h: 64, fill: "bg", radius: 8 },        // transparent-looking (bg on bg); the tap target between two words
  seamDot:      { kind: "shape", shape: "circle", r: 4, fill: "line" },                            // marks a tappable seam, at the seam's bottom centre
  stopGlyph:    { kind: "text",  value: ".", size: 44, font: "display", color: "structure" },
  countBadge:   { kind: "shape", shape: "circle", r: 12, fill: "structure" },                     // numeral 14 px display, color bg, above a placed stop
  linkGlyph:    { kind: "shape", shape: "rect", w: 120, h: 6, fill: "accent" },                    // under a joining word, width = word + both gaps at runtime
  runGlow:      { kind: "shape", shape: "roundRect", w: 400, h: 64, fill: "structureSoft", radius: 12 },   // behind the run-on words; width at runtime, may span lines (one per line)
  sentenceGlow: { kind: "shape", shape: "roundRect", w: 400, h: 64, fill: "structureSoft", radius: 12 },   // behind one completed sentence, width at runtime
  hintRing:     { kind: "shape", shape: "roundRect", w: 68, h: 76, stroke: "structure", strokeWidth: 4, radius: 12 },
  textChip:     { kind: "shape", shape: "roundRect", w: 600, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // subject pictures (meaning support in zone B; English gloss in the comment)
  picDog:       { kind: "emoji", value: "🐶", size: 56 },   // dog
  picCat:       { kind: "emoji", value: "🐱", size: 56 },   // cat
  picSun:       { kind: "emoji", value: "☀️", size: 56 },   // sun
  picBird:      { kind: "emoji", value: "🐦", size: 56 },   // bird
  picHouse:     { kind: "emoji", value: "🏠", size: 56 },   // home
  picFrog:      { kind: "emoji", value: "🐸", size: 56 },   // frog
  picFish:      { kind: "emoji", value: "🐟", size: 56 },   // fish
  picHat:       { kind: "emoji", value: "🎩", size: 56 },   // hat
  picBee:       { kind: "emoji", value: "🐝", size: 56 },   // bee
  picPig:       { kind: "emoji", value: "🐷", size: 56 },   // pig
  picHen:       { kind: "emoji", value: "🐔", size: 56 },   // hen
  picDuck:      { kind: "emoji", value: "🦆", size: 56 },   // duck
  picOwl:       { kind: "emoji", value: "🦉", size: 56 },   // owl
  picCake:      { kind: "emoji", value: "🎂", size: 56 },   // cake
  picMoon:      { kind: "emoji", value: "🌙", size: 56 },   // moon
  picMouse:     { kind: "emoji", value: "🐭", size: 56 },   // mouse
  picRain:      { kind: "emoji", value: "🌧️", size: 56 }    // rain
};
```
All emoji are Unicode 9 or older; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  drop:      { y: "+=0", alpha: 1, scale: 1, duration: 180, ease: "Bounce.Out", trigger: "stopGlyph landing in a seam (from y −24, alpha 0, scale 0.6)" },
  lift:      { y: "-=24", alpha: 0, duration: 200, ease: "Sine.In", trigger: "stopGlyph leaving a seam (refused or undone)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the next word's card when its capital appears" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the Done button when boundaries remain" },
  cutOff:    { x: "+=12", alpha: 0.35, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "every word card from a refused seam to the true end of its sentence" },
  linkIn:    { alpha: 1, duration: 150, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "linkGlyph under a joining word (from alpha 0)" },
  readBack:  { alpha: 0.4, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "each word card in turn, 180 ms apart" },
  glow:      { alpha: 1, duration: 260, ease: "Sine.Out", yoyo: true, hold: 400, trigger: "runGlow on an early Done; sentenceGlow per sentence on completion (from alpha 0)" },
  peek:      { y: "-=10", duration: 160, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tortoise on completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new text, seams and pictures (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on each missing seam after the second Done (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish tortoise" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            "Find where each sentence ends" (360,80)          │
      │ tortoise  [ The ]·[ dog ]·[ barks ]·[ the ]      line 1 y=120  │  zone A
      │ (70,180)  [ cat ]·[ runs ]                       line 2 y=180  │
      │            · = a seam tile 56×64 between two words            │
260   ├──────────────────────────────────────────────────────────────┤
      │              [dog]        [cat]       pictures y=330          │  zone B
      │                    [   OK   ] (360,430)                       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 uses three lines at y = 120 / 180 / 240. Lines hold at most four words, so a line is at most 4 cards (≤ 4 × 110) + 3 seams (56) + a trailing seam = ≤ 664 px. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Word cards: `makeTile` with `ART.wordCard` tokens (width = text width + 24, min 56, height 56), word 26 px `THEME.font.display` `THEME.colour.ink`; NOT tappable (`setEnabled(false)`, full alpha) — only seams are targets. Each line's cards + seams are laid out left to right with the seam tile (56) as the gap, the whole line centred on x = 360.
- Seams: `makeTile` 56 × 64 with `ART.seamTile` tokens (fill `bg`, no stroke — invisible against the page) and `ART.seamDot` at (0, +26); the library's focus ring makes a seam visible to keyboard users. A placed stop: `ART.stopGlyph` centred on the seam at (0, +6) with `ART.countBadge` at (0, −22).
- Cues: `ART.linkGlyph` under a joining word at y + 30, width = the word card + 56 each side; `ART.runGlow` / `ART.sentenceGlow` behind a span of cards (one glow per line segment, width = span width + 16, centred on the span); `ART.hintRing` behind a seam.
- Zone B: the item's pictures at 56 px, centred as a group on x = 360 at y = 330, 120 px apart. `makeButton ok` at (360, 430). `ART.tortoise` at (70, 180) at 60 px.
- Tap floors: seams 56 × 64 (≥ 56); OK 220 × 72. Gap between adjacent seams ≥ 56 (a word card lies between).
- Keyboard: Tab walks the seams in reading order, then OK; Enter places / removes a stop.

## Content
Texts are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ words: ["The","dog","barks","the","cat","runs"], stops: [2], joiners: [], pictures: ["picDog","picCat"] }` — `stops` = word indices AFTER which a stop goes (the seam index equals that word index); `joiners` = indices of joining words (the seams on both sides of a joiner get the link cue). The first word is stored capitalised; all others small. The English set is complete. **Other locales: a native sentence set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: 6-11 words; every sentence a complete statement in that language's own order (never translated English); mark the locale's joining word ("und", "et", "y", "e", "en", "och", "og", "ja"); lines wrap every 4 words, so keep words ≤ 10 letters.

**en**:
- **L1** (two sentences, one boundary, 6-7 words):
  1. The dog barks the cat runs — stops [2] — pictures `ART.picDog`, `ART.picCat`
  2. The sun is up birds sing — [3] — `ART.picSun`, `ART.picBird`
  3. We ran home it was late — [2] — `ART.picHouse`, `ART.picMoon`
  4. The frog jumps the fish swims — [2] — `ART.picFrog`, `ART.picFish`
  5. It is cold put on a hat — [2] — `ART.picHat`
- **L2** (two sentences, one boundary, a joining word inside one sentence, 9-11 words):
  6. The bee hums and the bird sings we listen — [6], joiners [3] — `ART.picBee`, `ART.picBird`
  7. The pig rolls in the mud the hen naps — [5] — `ART.picPig`, `ART.picHen`
  8. My cat sleeps all day my dog runs and jumps — [4], joiners [8] — `ART.picCat`, `ART.picDog`
  9. The duck and the frog swim the owl sleeps — [5], joiners [2] — `ART.picDuck`, `ART.picFrog`, `ART.picOwl`
  10. We bake a cake and eat it the plate is empty — [6], joiners [4] — `ART.picCake`
- **L3** (three sentences, two boundaries, 8-10 words):
  11. The sun is hot we swim the fish hide — [3, 5] — `ART.picSun`, `ART.picFish`
  12. The dog barks the cat runs the bird flies — [2, 5] — `ART.picDog`, `ART.picCat`, `ART.picBird`
  13. It rains we stay home the frog is glad — [1, 4] — `ART.picRain`, `ART.picFrog`
  14. The owl hoots the moon is up we sleep — [2, 6] — `ART.picOwl`, `ART.picMoon`
  15. Mouse hides the cat looks it is quiet — [1, 4] — `ART.picMouse`, `ART.picCat`

The cut-off span for a refused seam at index s inside a sentence = the words from s + 1 to the end of that sentence. Play list: 10 items per Rules; shuffled within level; no item repeats except by re-queue.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed with no wrong tap and a first Done → next level (cap L3).
- Adaptation: an item with a wrong tap or an early Done, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- Inactivity cue (never a clock, nothing ends): after 8 s with a boundary unplaced and no tap, the run from the last stop to the end plays `ANIM.readBack` once; repeats every 8 s of inactivity.
- What happens on a correct answer: each true boundary lands with `tone("tap", k)`, `ANIM.drop`, the badge and the next word's capital `ANIM.pop`; on a complete Done each sentence glows and reads back in turn, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed with no wrong tap, tortoise `ANIM.peek`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Stop on a mid-sentence seam (chunk / verb / every-word stopping): the stop drops, the following words of that sentence `ANIM.cutOff` for 1000 ms, `tone("nudge")`, the stop lifts out.
  - Stop beside a joining word: the stop drops, `ART.linkGlyph` under the joiner for 1000 ms, `tone("nudge")`, the stop lifts out.
  - Done with a boundary missing: Done nudges; `ART.runGlow` + `ANIM.readBack` on the run-on part.
  - Second Done with a boundary missing: the run cue + `ART.hintRing` on each missing seam (show-me); completing is solved-with-help.
  - Tapping a placed stop: removes it (undo, free, no count).
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the rings (no attempt 4). An item with any wrong tap never counts as first-try.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Stop Finder"; `findStops` = "Find where each sentence ends". The texts are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` on the k-th stop placed (pitch rising — F-213); `tone("nudge")` on a refused seam or an early Done; `tone("correct")` on a complete Done; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=nl` plays the English set until a Dutch set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: all lines, seams, pictures and OK visible; no card overlaps a seam).
- [ ] Keyboard operable (Tab walks the seams in reading order then OK; Enter drops or lifts a stop; a focused seam shows the focus ring).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused stops or early Dones still ends with every stop placed; the rings always complete an item).
- [ ] Tapping the seam after "barks" drops a stop there, plays a note, and "the" becomes "The".
- [ ] Tapping the seam after "dog" drops a stop, dims and shifts "barks" for a second, and the stop lifts out; "barks" stays small.
- [ ] At the second level tapping a seam next to "and" shows a coral bar under "and" for a second and the stop lifts out.
- [ ] Tapping a placed stop removes it and turns the following capital back to a small letter.
- [ ] Tapping OK with a boundary missing nudges OK and lights the unstopped run word by word; a second OK rings the missing seam.
- [ ] At the third level the text has three sentences and needs two stops; OK completes only with both.
- [ ] Two clean items in a row bring a longer text; a refused stop brings a shorter one next.
- [ ] The finish screen lists the ten texts with their stops and capitals in coral and no score.
- [ ] With `?sound=off` nothing is audible.
