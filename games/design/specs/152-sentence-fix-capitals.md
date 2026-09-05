# 152 — Capital Hunt

## Identity
- Slug: `sentence-fix-capitals`
- Subject / topic: Literacy / capital letters — finding every word in a short two-sentence text that needs a capital (sentence starts and names; per-locale rules such as German nouns and the English pronoun "I")
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap each word that needs a capital, once; then a Done tile states that the hunt is complete)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap marks one object and plays one rising tone; a second tap on a marked object does nothing; the Done tile judges completeness). Locale note: **capitalisation rules differ by language** (F-128; A-15) — the texts AND the rule set live in `LOCALE_DATA`: sentence starts are capitalised everywhere; names everywhere; German capitalises every noun (`nouns: true`); only English capitalises the pronoun "I" (`pronounI: true`). English is authored in full; a German exemplar shows the noun rule; the other nine locales are declared as needing a native set (en pilot). Statements only; the stops are already in the text — only the capitals are missing. Nothing is spoken.

## Learning
- Objective: In a two-sentence text written entirely in small letters, taps the first letter of every word that needs a capital (each sentence start and each name — plus every noun in German, and "I" in English) and leaves every other word small, then confirms with Done.
- Prerequisites: Reads short sentences of 3-6 words (games 074-076). Knows a capital and a small letter are the same letter (game 007). Has placed a capital on a first word (game 076 — this game generalises it to names and to finding ALL of them).
- Curriculum links: F-22 (sentence conventions — capital to start — by 8 in all twelve systems), F-128 ("knows the rule but does not apply it; random capitals; proofread OTHERS' sentences"), F-31 row "Capital + full stop; sentence order" — conservative 7-8, earliest 5 → 6-8 (US L.1.2.a "capitalize dates and names of people"; England Y1 "capital letters for names … and for the personal pronoun I"; Germany Klasse 2 "Satzanfang und Nomen groß"; France CE1 "majuscule en début de phrase et aux noms propres"; Netherlands groep 4 "hoofdletters bij namen"; Spain 1º ciclo "mayúsculas"; Brazil EF02LP08; Sweden åk 1-3 "stor bokstav"; Norway 2. trinn; Finland 1.-2. luokka "iso alkukirjain").
- Common misconceptions (F-128), each with this game's response:
  1. **Knows the rule but does not apply it — capitalises the first word only and stops.** Response: the Done tile with targets remaining nudges, and every missed target shows its REASON cue for 1200 ms: a missed sentence start gets its start flag (`ART.startFlag`) pulsing together with the full stop that ends the previous sentence (`ART.stopMark`) — "after a stop comes a capital"; a missed name gets the character's picture badge (`ART.nameTag`) pulsing above the word — "this is a name". The hunt continues; nothing is marked wrong.
  2. **Random capitals — capitalising a "big" or important word (the noun in English, the verb, the last word).** Response: tapping a word that must stay small shows the word capitalised in `THEME.colour.inkSoft` for 600 ms (`ART.capGhost` "Dog") and the card nudges; the capital never sticks. In German the same tap on a noun is CORRECT (`LOCALE_DATA.de.rules.nouns = true`) — the rule set, not the mechanic, decides.
  3. **Capitals inside a word (a capital in the middle: "foX").** Response: every word card has two tap regions — the left 40% is the first letter, the rest is "mid-word"; a mid-word tap shows the word with a mid-word capital in `THEME.colour.inkSoft` for 600 ms (`ART.capGhost` "fOx"), the card nudges, and nothing sticks — capitals live at the front of a word.
  4. **Not linking the stop to the next capital (cannot find the second sentence's start).** Response: the previous sentence's stop is drawn as `ART.stopMark` (a slightly larger, teal full stop attached to the last word) so the boundary is visible; the reason cue for a missed start pulses that stop and the flag together.
  5. **Treating the name as an ordinary word when it sits mid-sentence ("fox and owl sit…" — capitalises fox as the start but not owl).** Response: every character named in the text is also PICTURED in zone B; the name cue (`ART.nameTag`) shows the picture above the missed name; at L2 each text carries at least one mid-sentence name.

## How it plays
1. **Start screen**: title "Capital Hunt", the giraffe (`ART.giraffe`) at (360, 200), Start, picker.
2. **Item 1 (L1: "the dog runs. the cat sleeps.")**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the text as word cards (`ART.wordCard`, height 60, width = text width + 28, min 60, word 28 px) in two lines — sentence 1 on line 1 at y = 150, sentence 2 on line 2 at y = 215 — each line centred on x = 360 with 12 px gaps; the last card of each sentence carries its full stop as `ART.stopMark` at its right edge. A hollow start flag (`ART.startFlag`, stroke only) 18 px left of each line's first card. The giraffe stands at (70, 180) at 64 px. Zone B: the story's character pictures (`ART.picDog` at (300, 330), `ART.picCat` at (420, 330), 56 px) and the Done tile (`makeButton ok`) at (360, 430), enabled from the start. Caption `S("findCapitals")` ("Tap the capital letters") at (360, 96), 22 px `THEME.font.body` `THEME.colour.inkSoft`. A running badge is drawn on each capitalised card (`ART.countBadge`, numeral 1, 2, 3 …) so the count of capitals found is written on the text (P3).
3. **Hunting**: the child taps a word card.
   - **A target word, tapped on its first letter** ("the" at line 1): the first letter swaps to its capital (`ANIM.pop` on the card), `tone("tap", k)` (k = number of capitals placed so far, pitch rising), `ART.countBadge` with k at the card's top-right; the start flag beside it turns solid (`ANIM.pop`). A second tap on a capitalised card does nothing (one-to-one enforced by the object).
   - **A non-target word, tapped on its first letter** ("dog"): `ART.capGhost` shows "Dog" over the card for 600 ms (`ANIM.ghostIn`), `ANIM.nudge`, `tone("nudge")`; nothing sticks. Counts as a wrong tap.
   - **Any word tapped mid-word** (right 60% of the card): `ART.capGhost` shows the word with the tapped letter capitalised ("dOg", or "thE") for 600 ms, `ANIM.nudge`, `tone("nudge")`; nothing sticks; counts as a wrong tap. Keyboard Enter always means "first letter".
4. **Done**: the child taps `ok`.
   - **All targets capitalised, no others** (the only possible complete state, since wrong taps never stick): the text glows (`ART.textGlow`, `ANIM.glow`) and the cards light left to right (`ANIM.readBack`), `tone("correct")`, praise pop (only if no wrong tap), giraffe `ANIM.stretch`; rail dot; next item after 900 ms (`ANIM.appear`).
   - **Targets remain**: `ANIM.nudge` on the Done button, `tone("nudge")`; every missed target plays its reason cue for 1200 ms (misconception 1); the hunt continues. Attempt 2.
   - **Second Done with targets remaining**: the reason cues again, then every missed target gains `ART.hintRing` (`ANIM.showMe`) — the show-me; tapping the ringed cards and Done completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 two sentences, sentence starts only (no names in the text); L2 two sentences with the two characters used as names, at least one name mid-sentence; L3 longer sentences (up to 8 words per line) with names AND, in English, the pronoun "i" as a target (`pronounI`); in German the L2/L3 texts add nouns as targets.
6. **Re-queue** (F-41): an item with any wrong tap or a Done-with-targets-remaining re-enters after 2 intervening items; the count stays 10.
7. **Finish**: `t("all_done")` (360, 110); the giraffe (360, 200) `ANIM.celebrate`; the summary = the ten fixed texts as one-line chips (`ART.textChip`, 600 × 30, 16 px, every capital drawn in `THEME.colour.accent`) stacked from y = 300 at 30 px pitch, with `ART.dotFull` at the left of first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  giraffe:    { kind: "emoji", value: "🦒", size: 80 },                     // mascot (Unicode 10)
  wordCard:   { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },   // width = text width + 28 at runtime; word 28 px display ink
  startFlag:  { kind: "shape", shape: "polygon", points: [[-8,-14],[10,-7],[-8,0]], fill: "structure" },   // stroke-only until the capital lands
  stopMark:   { kind: "text",  value: ".", size: 40, font: "display", color: "structure" },              // the full stop on a sentence's last card
  countBadge: { kind: "shape", shape: "circle", r: 14, fill: "structure" },                                // numeral 16 px display, color bg
  capGhost:   { kind: "text",  value: "", size: 28, font: "display", color: "inkSoft" },                   // the word with a refused capital, drawn over the card
  nameTag:    { kind: "shape", shape: "circle", r: 22, fill: "surface", stroke: "accent", strokeWidth: 3 },  // holds the character's picture at 28 px, drawn above a name card
  hintRing:   { kind: "shape", shape: "roundRect", w: 72, h: 72, stroke: "structure", strokeWidth: 4, radius: 14 },   // resized to card w + 12 at runtime
  textGlow:   { kind: "shape", shape: "roundRect", w: 640, h: 150, fill: "structureSoft", radius: 16 },
  textChip:   { kind: "shape", shape: "roundRect", w: 600, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // character pictures (the names in the texts; English gloss in the comment)
  picDog:     { kind: "emoji", value: "🐶", size: 56 },   // Dog
  picCat:     { kind: "emoji", value: "🐱", size: 56 },   // Cat
  picFox:     { kind: "emoji", value: "🦊", size: 56 },   // Fox
  picOwl:     { kind: "emoji", value: "🦉", size: 56 },   // Owl
  picBear:    { kind: "emoji", value: "🐻", size: 56 },   // Bear
  picDuck:    { kind: "emoji", value: "🦆", size: 56 },   // Duck
  picFrog:    { kind: "emoji", value: "🐸", size: 56 },   // Frog
  picPig:     { kind: "emoji", value: "🐷", size: 56 },   // Pig
  picHen:     { kind: "emoji", value: "🐔", size: 56 },   // Hen
  picMouse:   { kind: "emoji", value: "🐭", size: 56 }    // Mouse
};
```
All emoji are Unicode 10 or older; no fallbacks needed. Character names in the texts are the animals' own kind names (Fox, Owl) used as names — never people's names.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a card when its capital lands; its start flag" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a refused card; the Done button when targets remain" },
  ghostIn:   { alpha: 1, duration: 150, ease: "Sine.Out", yoyo: true, hold: 600, trigger: "capGhost over a card (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "startFlag + stopMark of a missed sentence start; nameTag over a missed name" },
  tagIn:     { alpha: 1, y: "-=6", duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "nameTag appearing above a name card (from alpha 0)" },
  readBack:  { alpha: 0.4, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "each word card in turn, 180 ms apart, on completion" },
  glow:      { alpha: 1, duration: 260, ease: "Sine.Out", yoyo: true, trigger: "textGlow behind both lines on completion (from alpha 0)" },
  stretch:   { scaleY: 1.1, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "giraffe on completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new text, pictures (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on every missed target after the second Done (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish giraffe" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │               "Tap the capital letters" (360,96)              │
      │ giraffe   ▷ [ the ] [ dog ] [ runs. ]           line 1 y=150  │  zone A
      │ (70,180)  ▷ [ the ] [ cat ] [ sleeps. ]         line 2 y=215  │
      │           flags 18 px left of each line's first card          │
260   ├──────────────────────────────────────────────────────────────┤
      │              [dog]        [cat]       pictures y=330          │  zone B
      │              (300,330)    (420,330)                           │
      │                    [   OK   ] (360,430)                       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. One sentence per line; a line never exceeds 8 words (Content) and its cards shrink their word to fit if the line would exceed 620 px (fit-to-width per card, floor 22 px).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Word cards: `makeTile` with `ART.wordCard` tokens, width = measured text width + 28 (min 60), height 60, word 28 px `THEME.font.display` `THEME.colour.ink`, each line centred on x = 360, gaps 12. The tile's `onTap` receives the pointer's local x: local x < 0.4 × card width → first-letter tap; otherwise mid-word tap (the letter index = floor((localX − 14) / averageGlyphWidth), clamped to 1 … length − 1). `ART.stopMark` drawn at the last card's right inner edge (x = card right − 12). `ART.startFlag` 18 px left of each line's first card, stroke-only until that capital lands, then filled.
- `ART.countBadge` at a capitalised card's (+ w/2 − 8, −24) with the numeral 16 px `THEME.font.display` `THEME.colour.bg`.
- Cues: `ART.capGhost` centred on the card; `ART.nameTag` centred 44 px above a name card holding the character picture at 28 px; `ART.hintRing` behind a card (w + 12); `ART.textGlow` centred (380, 182) behind both lines.
- Zone B pictures: the item's characters at 56 px, centred as a group on x = 360 at y = 330, 120 px apart (one, two or three pictures). `makeButton ok` at (360, 430). `ART.giraffe` at (70, 180) at 64 px.
- Tap floors: cards ≥ 60 × 60 (≥ 56); OK 220 × 72. Gaps 12.
- Keyboard: Tab walks the word cards line by line, left to right, then OK; Enter on a card = first-letter tap.

## Content
Texts are language-bound. `LOCALE_DATA[lang]` = `{ rules: { sentenceStart: true, names: true, pronounI: bool, nouns: bool }, items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ lines: [["the","dog","runs."], ["the","cat","sleeps."]], targets: [[0, "S"], [3, "S"]], pictures: ["picDog", "picCat"] }` where a target is `[wordIndex (counting across both lines), reasons]` with reason codes `S` = sentence start, `N` = name, `I` = pronoun I, `K` = noun (German). A word with two reasons (a name that starts a sentence) lists both, e.g. `"SN"`; the reason cue plays the first listed. The English set is complete. **Other locales: a native text set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then), except the German exemplar below.

**en** (`pronounI: true, nouns: false`):
- **L1** (sentence starts only; 3-4 words per sentence):
  1. the dog runs. / the cat sleeps. — targets 0 S, 3 S — pictures `ART.picDog`, `ART.picCat`
  2. the frog hops. / the duck swims. — 0 S, 3 S — pictures `ART.picFrog`, `ART.picDuck`
  3. we like cake. / it is sweet. — 0 S, 3 S — (no pictures; the giraffe only)
  4. the hen has an egg. / it is warm. — 0 S, 5 S — pictures `ART.picHen`
  5. the pig is big. / the mouse is small. — 0 S, 4 S — pictures `ART.picPig`, `ART.picMouse`
- **L2** (names; at least one name mid-sentence; 4-6 words per sentence):
  6. fox and owl sit by the pond. / owl sees a fish. — 0 SN, 2 N, 7 SN — pictures `ART.picFox`, `ART.picOwl`
  7. bear hums a song. / duck sings with bear. — 0 SN, 4 S, 7 N — pictures `ART.picBear`, `ART.picDuck`
  8. the cat sees frog. / frog hops away. — 0 S, 3 N, 4 SN — pictures `ART.picCat`, `ART.picFrog`
  9. pig and hen eat corn. / then pig naps. — 0 SN, 2 N, 5 S, 6 N — pictures `ART.picPig`, `ART.picHen`
  10. mouse hides in a box. / dog looks for mouse. — 0 SN, 5 SN, 8 N — pictures `ART.picMouse`, `ART.picDog`
- **L3** (names + pronoun I; up to 8 words per line):
  11. i see fox by the tree. / fox and i go home. — 0 SI, 2 N, 6 SN, 8 I — pictures `ART.picFox`
  12. owl and i like the moon. / i look up. — 0 SN, 2 I, 6 SI — pictures `ART.picOwl`
  13. today i play with bear. / bear and i run fast. — 0 S, 1 I, 4 N, 5 SN, 7 I — pictures `ART.picBear`
  14. duck and hen swim in the pond. / i wave at duck. — 0 SN, 2 N, 7 SI, 10 N — pictures `ART.picDuck`, `ART.picHen`
  15. i give cat a fish. / cat purrs and i smile. — 0 SI, 2 N, 5 SN, 8 I — pictures `ART.picCat`

**de** (exemplar, `pronounI: false, nouns: true` — native review before ship): "ich" stays small; every noun is a target.
- L1: der hund rennt. / die katze schläft. — 0 S, 1 K, 3 S, 4 K — pictures `ART.picDog`, `ART.picCat` · der frosch hüpft. / die ente schwimmt. — 0 S, 1 K, 3 S, 4 K — pictures `ART.picFrog`, `ART.picDuck`
- L2: fuchs und eule sitzen am teich. / eule sieht einen fisch. — 0 SN, 2 N, 5 K, 6 SN, 9 K — pictures `ART.picFox`, `ART.picOwl`
- L3: ich sehe fuchs am baum. / fuchs und ich gehen heim. — 0 S, 2 N, 4 K, 5 SN — pictures `ART.picFox`

Play list: 10 items per Rules; shuffled within level; no item repeats except by re-queue.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed with no wrong tap and a first Done → next level (cap L3).
- Adaptation: an item with a wrong tap or a Done-with-targets-remaining, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- Inactivity cue (never a clock, nothing ends): if 8 s pass with targets remaining and no tap, the next missed target's reason cue plays once; repeats every 8 s of inactivity.
- What happens on a correct answer: each target tap lands with `tone("tap", k)`, `ANIM.pop`, the badge and the solid flag; on a complete Done `ANIM.readBack` + `ANIM.glow`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed with no wrong tap, giraffe `ANIM.stretch`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Non-target word tapped on its first letter (random capital / "important word"): `ART.capGhost` shows the capitalised word for 600 ms, `ANIM.nudge`, `tone("nudge")`; nothing sticks.
  - Mid-word tap on any word: `ART.capGhost` shows a mid-word capital for 600 ms, nudge, tone; nothing sticks.
  - Done with a sentence start missed: Done nudges; that start's flag and the preceding stop `ANIM.pulse` for 1200 ms.
  - Done with a name missed: Done nudges; `ART.nameTag` with the character's picture `ANIM.tagIn` above the name for 1200 ms.
  - Done with "i" (en) or a noun (de) missed: Done nudges; the card `ANIM.pulse`.
  - Second Done with targets remaining: the cues again + `ART.hintRing` on every missed target (show-me); completing is solved-with-help.
  - Second tap on a capitalised card: nothing.
- Retry behaviour: attempt 1 → attempt 2 after the reason cues → attempt 3 with the rings (no attempt 4). An item with any wrong tap never counts as first-try.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Capital Hunt"; `findCapitals` = "Tap the capital letters". The texts are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` on the k-th capital placed (pitch rises with the count — F-213); `tone("nudge")` on a refused tap or an early Done; `tone("correct")` on a complete Done; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` shows the German texts where "hund" and "katze" also take capitals and "ich" stays small; `?lang=fr` plays the English set until a French set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: both lines, the pictures and OK visible; no word card overlaps another).
- [ ] Keyboard operable (Tab across the cards then OK; Enter on a card capitalises its first letter when it is a target and shows the ghost when it is not).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused taps or early Dones still ends with every capital placed; the rings always complete an item).
- [ ] Tapping "the" at the start of a line makes it "The", fills the flag, and plays a rising note; the second capital plays a higher note.
- [ ] Tapping "dog" shows "Dog" in grey for a moment, nudges the card, and leaves it small.
- [ ] Tapping the right-hand part of "fox" shows "fOx" or "foX" in grey for a moment and leaves it small.
- [ ] Tapping OK with a sentence start missed makes that line's flag and the previous full stop pulse; tapping OK with "owl" missed shows the owl picture above the word.
- [ ] A second early OK rings every missed word until it is tapped.
- [ ] At the third level in English, "i" is a target; a mid-sentence "fox" is a target at the second level.
- [ ] Two clean items in a row bring a longer text; a refused tap brings a shorter one next.
- [ ] The finish screen lists the ten texts with their capitals in coral and no score.
- [ ] With `?sound=off` nothing is audible.
