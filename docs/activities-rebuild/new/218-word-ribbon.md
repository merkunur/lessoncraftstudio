# New 218 — The Word Ribbon (L.K.1.a)

## 0. Identity
- **id** `word-ribbon.play.l-k-1-a` · **grade** K · **framework** Common Core L.K.1.a (print letters) with RF.K.1.b/c (words are separated by spaces; print moves left to right) and RF.K.3.c (sight words) · **strand** Language · **files** `mini tools/word-ribbon-core.js`, `word-ribbon-activity.js`, `word-ribbon-activity.html`, `word-ribbon-activities.json` · **key** `word-ribbon`
- **worksheets covered (15):** K-239, K-259, K-260, K-261, K-262, K-263 (Sight Words: Read, Trace, Write + Practice Sets 2–6) · K-388 Sight Word of the Day · K-284 Trace and Write the Words (picture words) · K-289 Trace Your First Words · K-290 Trace Once, Write It Twice · K-291 Trace the Longer Words · K-310 Trace the Words in Capital Letters · K-311 Copy the Word · K-315 Copy the Capitals · K-391 Trace the Sentences.
- **Loaded unchanged (0 lines):** `alphabet-trace-core.js` (the 52 centreline letterforms), `stroke-trace-core.js` (the live-ink judge that credits only arc length the finger swept). The word-layout layer of `scripts/worksheet-gen/data/tracing/letter-strokes.js` (advance widths, the accent layer, Æ / Ø / ß) is ported into `word-ribbon-core.js` with a parity gate against that file, so the screen and the printed pages share one letterform.

## 1. The pitch
"The writing line is a ribbon that only unrolls under your pencil — one letter at a time, left to right — and it will not unroll the next word until you lay a grey space stone down."

## 2. Why a child will want it again (the fun)
- **A ribbon that answers the hand.** The paper strip comes off a fat roll that sits just right of the last letter written. Finish a letter and the roll turns (a 280 ms rolling animation with a soft paper "fff") and unrolls exactly one letter's width, showing the next letter's dotted road and its glowing green start dot. The child is literally pulling the word out of the roll.
- **The space stone.** A smooth grey pebble sits in a little dish at the end of the ribbon. When a word is finished the roll stops dead; drag the stone onto the ribbon and it clunks down snug after the word ("tok", a low wood tone), the roll is pushed one stone-width along, and the next word appears. Children love the weight of it. After the line is finished the stones melt into faint grey ovals — the gaps the child made, still visible.
- **The card that turns over (Remember it).** Before the last repeat of a sight word the word card flips face-down with a soft card "flap" — a teal card back with a little closed-eye mark. Now the ribbon unrolls only if the child writes the right next letter **from memory**. When the word is done the card flips up and its letters drop one by one onto the child's letters, each landing with a tick — "you remembered it". It is the classroom look–say–cover–write–check routine, done by the apparatus.
- **The ink is theirs.** Ink (red-brown #C64A22, Letter Studio's measured contrast) appears only where the finger has been; a finished stroke gives a tiny rising chime; a finished letter gives a brighter one.
- **The earned show — the reading light and the scroll.** When the ribbon is full, it pulls taut, a soft warm light sweeps left to right across it word by word, each word lifting 4 px as the light passes (TTS reads the word where a voice exists; in sentence mode the sentence). Then the ribbon snips off at the roll, rolls itself up into a little scroll tied with a teal band, and drops into the **scroll rack** at the side — nine slots, one per round. The rack of nine scrolls the child wrote is the round-set trophy; tap a scroll and it unrolls to show their own writing.
- Free play: between rounds the child may scribble on a blank practice tail at the end of the ribbon (no judging), and tap any scroll in the rack.

## 3. The skill and the misconception
- **Skill.** Form each letter of a word correctly (stroke order and direction), write the word left to right from the start of the line, read it, then write it on their own; in sentences, leave a finger-space between words and end with a full stop. Read → trace → write (K-239), trace once / write twice (K-290), copy without dashes (K-311, K-315), capitals (K-310), long words (K-291), sentences (K-391), and write a sight word from memory (K-239/K-259–K-263 "then write it yourself", K-388 word of the day).
- **Misconception 0 (sight words): copying letter by letter without knowing the word.** The Remember-it repeat hides the model; the roll only gives the next letter's place, never its shape, so the word has to be recalled as a whole spelling.
- **Misconception 1: letters in the wrong order / a word written as a set of letters.** The material forbids it: everything right of the current letter is still rolled up. There is nowhere to write the third letter first.
- **Misconception 2: starting anywhere on the line.** The ribbon begins at a fixed start post at the left margin; the first start dot is the only lit place on the line.
- **Misconception 3: running words together.** The roll will not advance past a finished word without a stone. A finger tapping or dragging on the roll gets a small "bump" (the roll shudders 2 px) and the stone in its dish hops once. The stone is a fixed width — one lowercase *o* of the current letter size, the classroom finger-space — so the gap is right by construction, and the child learns the habit (put the space down), not a measurement.
- **Misconception 4: strokes drawn backwards or reversed letters (b/d).** The judge (`stroke-trace-core`) inks a stroke only when swept from its start; the Fading-Line slip table names *started at the wrong end*, *flipped*, *the wrong way round*, *stopped short*.

## 4. The stage
Apparatus geometry only (paper strip, roll, stone, dish, rack); one library picture per round in picture-word sets.

**704 px (content ≈ 656):**
- **Task line** (20 px, one line).
- **Word card** (top-left, 200×150): the model word in Baloo 2 44 px (the school print form, single-storey *a* and *g* from the same letterforms, drawn as filled print here, not as a road), and in picture-word / long-word / capitals sets the library picture **112 px** beside it (card grows to 300×150). A small speaker (36 px) reads the word where TTS exists.
- **The ribbon** (y 190, height 150): a cream paper strip 572 wide (656 minus the 72 px scroll rack and a 12 px gap) with the locale's school ruling (`LetterStudio.RULING[locale]`: top line, dashed x-height line where the locale uses one, baseline; fi baseline only). Glyph box **120 px** tall (cap height ≈ 82 px, x-height ≈ 48 px). Left end: a teal **start post** (6×150). The **roll**: a cylinder 40 px in diameter × 150 tall, drawn with two ellipse ends and three paper-edge stripes, sitting just right of the current letter. The road (dotted letters: 7-unit road teal .30 + hairline), the start dot (green, 14 px), stroke numerals where a letter has ≥ 2 strokes.
- **Return sweep (a new line):** the ribbon never slides. When the next repeat would not fit before the right edge, the roll **drops to a new ribbon line under the first, at the left start post** (a 350 ms hop down-and-left, a soft "ding"), and the first start dot of the next repeat lights at the far left — the child's hand has to travel back to the left margin, exactly as on paper (RF.K.1 return sweep). A word never breaks across lines: in sentences the space stone is laid at the end of the line and the next word starts the new line. At most 3 ribbon lines (sentences ≤ 22 letters fit in 3 at glyph 120); a long word that would not fit one line at glyph 120 (measured with the real advance widths) is laid out at glyph 100 for that round. The stage grows downward and the scroll rack column grows with it.
- **Stone dish** (right of the ribbon, 64×40): one grey pebble (rounded rect, radius 18, #9A9389 with a lighter top highlight), width = advance of *o* at the current scale (≈ 62 px).
- **Strip** under the ribbon: **Show me** (a glowing bead walks the next stroke), **Rub out** (clears the current letter), one-line note — Fading Line's controls.
- **Scroll rack** (right edge column 72 wide at ≥ 700 px, `layout:'split'`): nine slots stacked; finished scrolls 56×20 with the word on the tag.
- **Sentence mode:** no picture; the word card shows the whole sentence (24 px); a second ribbon appears under the first in the "trace then write" guide.

**360 px (content ≈ 328):**
- Word card 328×112 (word 32 px, picture 72 px).
- **One letter-size, the pen travels:** the ribbon keeps a traceable glyph box of **150 px** (x-height ≈ 60 px, corridor 16 units ≈ 24 px), so 3–4 letters fit across the screen. The ink stays where it was written; the view **scrolls with the pen** only when the roll reaches 80 % of the screen width (the ribbon frame scrolls horizontally, 250 ms), and a thin overview strip (24 px) above shows the whole line so far in miniature. The child always writes along the line, left to right — there is no fixed writing window and nothing slides under the pen.
- Stone dish under the ribbon, right (the space stone is dragged onto the ribbon, or tapped then the ribbon tapped); scroll rack becomes a 9-dot strip of tiny scrolls under the controls.
- Fold: task 40 + card 112 + overview 24 + ribbon 170 + strip 48 ≈ 394 px at 360×740 (two ribbon lines in sentence mode: + 170 = 564); at 320×640 the glyph box stays 150 (3 letters across) → the same 394 / 564 px. No Check button (completion is by path; see §7), so nothing must sit below.

**Words on the apparatus:** only the word/sentence being written (the content). Stroke numerals are numerals.

## 5. The hand
- **Trace / write a stroke** (pointer down on or near the lit start dot, drag): ink follows the finger instantly (`pointermove` → path append, no smoothing lag); `stroke-trace-core` credits swept arc length inside the corridor (dotted 8 units, start-dot 12, blank 16). A stroke completes at 92 % credited length; chime (C6 sine 90 ms). Next stroke's start dot lights.
- **Letter done:** brighter chime (E6+G6), the letter's ink settles (road fades), the roll turns and unrolls one advance width (280 ms), the next letter's road + start dot appear.
- **A slip** (finger lifted short, reversed, flipped, wrong winding, off-road): the ink of that attempt fades (400 ms) and the note names the slip (Fading Line's slip table, measured from the raw path). No sound of failure.
- **Word done:** the roll stops with a soft "thunk" and stays; the stone in its dish brightens (a 1 s glow, then idle bob every 3 s).
- **Space stone:** drag from the dish; drop anywhere on the ribbon right of the last letter (or on the roll) → it slides snug against the last letter's right edge (200 ms) and clunks; the roll is pushed one stone width and the next word's first start dot lights. Dropped onto the written letters → it slides right to snug (it never covers ink). Tap-tap / keyboard path: tap the stone (it lifts), tap the ribbon (it places); Enter on the focused stone places it. A placed stone cannot be removed (it is not a choice, it is a habit); in a sentence it is mandatory before each next word; it is **not** wanted before the full stop.
- **Full stop** (sentence mode): after the last word, a small lit ring appears on the baseline right next to the word; the child taps (or draws a dot) inside it — the dot inks. A stone dragged there instead bounces back to its dish ("no space before the full stop").
- **Show me:** a glowing bead walks the next stroke once at 220 px/s; does not count as a miss.
- **Rub out:** clears the current letter's ink.
- **Free play:** the blank practice tail (after the last repeat) accepts any ink unjudged; scrolls in the rack unroll on tap.

## 6. The rounds
A round = one word (or sentence) written in repeats along one ribbon, separated by stones, per the Guide setting:
- **Trace and write** (default; K-239 family, K-284, K-289, K-310, K-391-style): repeat 1 dotted · repeat 2 start dots only.
- **Trace once, write twice** (K-290, K-291): dotted · start dots · blank (corridor judged, a faint slot tick shows where the letter goes).
- **Copy** (K-311, K-315): start dots · blank (no dotted letters; the word card is the model).
- **Remember it** (K-239 family, K-388; sight words and picture words): dotted · start dots · **blank with the card face-down**. On the hidden repeat the corridor of the expected letter is judged as in *blank*, and the slot tick shows where the letter goes, never its shape.
- **Sentences** (K-391): repeat 1 the sentence dotted with stones; under "Trace once / Copy" a second ribbon line writes it with start dots.

One right result per round (completion only by the path). 9 rounds per content set; order-only reshuffle per pass. **EN sets:**

| set | 9 rounds |
|---|---|
| **Picture words** (library picture) | cow (farm-animals/cow) · owl (animals/owl) · bee (insects-and-bugs/bee) · ant (insects-and-bugs/ant) · bed (furniture/bed) · kite (toys/kite) · drum (music/drum) · duck (farm-animals/duck) · fish (animals/fish) |
| **Sight words** (no picture; pass k walks the level-set list) | pass 1: the · and · you · see · can · play · look · said · here; pass 2: come · little · down · we · was · not · for · big · went; … through the ~100-word list in `scripts/worksheet-gen/data/literacy/sight-words-levelset.json` (the published 24 first, as K-239…K-263 do) |
| **Long words** (library picture) | elephant (animals) · umbrella (accessories) · pineapple (fruits) · giraffe (animals) · tractor (vehicles) · penguin (animals) · dinosaur (toys) · butterfly (insects-and-bugs) · kangaroo (zoo-animals) |
| **Capitals** (library picture) | BALL (toys/ball) · BOAT (vehicles/boat) · GOAT (farm-animals/goat) · LAMB (farm-animals/lamb) · MOON (space/moon) · STAR (shapes/star) · KEY (around-the-house/key) · VAN (vehicles/van) · OWL (animals/owl) |
| **Sentences** (≤ 5 words, ending in a full stop, from the level-set sentence bank) | I like you. · We run and jump. · We can play now. · She can jump high. · The bus is yellow. · Look at the big dog. · I see a red bird. · I can see the moon. · I can run fast. |

**Other locales (the build authors each list by hand from these sources, then the reviewer reads them):** picture words = library nouns ≤ 4 letters (fi ≤ 5) in the page locale, one picture each, at most two words per first letter in one pass (variety of start strokes): e.g. de **Kuh · Eule · Bett · Ente · Ball · Hut · Zug** (de ≤ 4 letters; nouns keep their capital), sv **ko · bi · säng · anka · fisk · boll · båt**, fi **kala · kuu · auto · pallo · ankka** (fi ≤ 5) — each re-picked per locale by the length rule from library nouns and checked in the vocabulary, never by translating the EN list; sight words = the locale's level-set list (SIGHT_WORDS order); long words = library nouns 7–10 letters (de nouns keep their capital); capitals = the picture words in upper case; sentences = level-set sentences ≤ 5 words, ≤ 22 letters, ending in "." with **no other punctuation** (refuse ?, !, commas, apostrophes, hyphens, quotation marks: es "¿…?" / "¡…!" have no traced glyph for ¿/¡; fr/it apostrophes (l'ami) have none either).

**Answer position:** not applicable — the round is a construction completed only along the letter paths; the gate asserts no tap-only completion is possible (a straight swipe, a scribble or taps on start dots never complete a letter).

## 7. Check, the misses, the success
There is no Check button: the round completes when the last stroke of the last repeat (and the full stop) is done — the Fading Line convention.
- **Nothing done for 8 s** → the start dot pulses and the note: "Start at the green dot."
- **Slip 1 in a letter** → the attempt's ink fades and the road brightens for 600 ms; note names the slip, e.g. "Start at the green dot and go the way of the arrow." / "That one went backwards — start at the dot."
- **Slip 2 in the same letter** → the bead walks the stroke once (as Show me), note "Watch the bead, then you try."
- **Slip 3** → the guide steps up one level for this letter only (blank → start dots → dotted), silently; it steps back down for the next letter.
- **Remember it — a wrong or stuck letter:** slip 1 → the slot tick pulses; slip 2 → the card **peeks** (flips up for 1.5 s, then down again) — "Peek at the card, then write it."; slip 3 → the card stays up for that letter and turns down again for the next (help taken away).
- **Roll tapped / dragged without a stone** → roll shudders, stone hops: "Put down a space stone first."
- **Stone before the full stop** → stone bounces home: "No space before the full stop — just a dot."
- Help is per letter; the next letter starts clean.
- **Success** → (Remember it: the card flips up and its letters drop onto the child's, tick by tick) the reading light sweep, the snip, the scroll into the rack. Bubble: words "You wrote {word} three times, left to right!" (count = repeats) · sentences "You wrote: {sentence} — with a space between every word!"

## 8. Settings
1. **Words:** picture words / sight words / long words / capitals / sentences — the word card changes (picture or none, upper case, sentence).
2. **Guide:** trace and write / trace once, write twice / copy (no dots) / remember it — the ribbon's repeat plan changes visibly at rest (dotted first repeat, start dots only, or a card with a turned-down corner ready to flip).

## 9. Words (EN source)
- title "The Word Ribbon" · instruction "Write the word left to right on the ribbon. Put a space stone between words."
- task: tracePicture "Read the word. Trace it, then write it on your own." · traceTwice "Trace it once, then write it two times." · copy "Copy the word — no dots to help." · sentence "Trace the sentence. Put a space stone between the words." · remember "Read the word. The card will turn over — then write it from memory."
- notes: noteStart "Start at the green dot." · noteReversed "That one went backwards — start at the dot." · noteMirror "That letter is flipped. Watch which way it goes." · noteDirection "Go round the other way." · noteShort "Keep going to the end of the line." · noteOff "Stay on the road." · noteWatch "Watch the bead, then you try." · noteStone "Put down a space stone first." · noteNoSpaceDot "No space before the full stop — just a dot." · noteDot "Now the full stop." · notePeek "Peek at the card, then write it." · noteNewLine "Back to the start of the next line."
- buttons: showMe "Show me" · rubOut "Rub out".
- celebrate: celebrateWord "You wrote {word} {n} times, left to right!" · celebrateSentence "You wrote: {sentence} — with a space between every word!" · celebrateRemember "You remembered {word}!"
- aria: ribbonLabel "writing ribbon, letter {i} of {n}" · stoneLabel "space stone" · rollLabel "rolled-up ribbon" · scrollLabel "your word {word}".
- settings: "Words" — "Picture words" / "Sight words" / "Long words" / "Capitals" / "Sentences" · "Guide" — "Trace and write" / "Trace once, write twice" / "Copy" / "Remember it".
- **Locale traps:** de nouns begin with a capital even in lower-case sets (*Hund* traces a capital H — correct German); sentence-initial capitals everywhere; accents are separate strokes written after their letter (é, è, ê, ñ, ç, ã, õ, ü, ä, ö, å — the letter-strokes accent layer); Æ / Ø and lowercase ß from the authored forms, **no capital ß** (refuse ß words in capitals: *STRAUSS* is not school writing); nl IJ in capitals is one letter — refuse ij-initial words in capitals; es ¿ ¡ and fr/it apostrophes refused (no glyph); fi long compounds — the long-word set caps at 10 letters; school ruling per locale (`LetterStudio.rulingFor`: fr Seyès-like band, fi baseline only, Nordic three-line); the full stop has no space before it in every locale (fr's space-before-? never arises because questions are refused).

## 10. Sound off, access, phones
- Sound off: the word card shows the word; notes are text; the reading light is visual. TTS only reads the word card and the finished ribbon.
- Keyboard: tracing has no keyboard equivalent (it is a motor skill) — keyboard users get **Show me** per stroke and Tab to the stone (Enter places it); stated in the page's teacher notes; screen-reader labels describe progress ("letter 2 of 3 written").
- Taps: stone ≥ 62×40 px (phone ≥ 48×44); the phone glyph box stays 150 px at 360 and 320, so the corridor is ≈ 24 px and the start dot 18 px (hit area 44 px).
- Pictures 112 px at 704, 72 px at 360 (the card is a reference, not the apparatus; the apparatus — the ribbon — is the hero).
- Phone layout: the same ribbon at a fixed traceable letter size, a miniature overview strip above, the view scrolling with the pen (§4).

## 11. Distinct from
- **#5 The Fading Line** (numerals 0–9 in three boxes, guide fades box by box): one glyph per box, no words, no spaces. The Word Ribbon's inventions are the **roll that only unrolls under the pencil** (left-to-right is physical) and the **space stone** (a word boundary is an object you place). Same judge and letterforms — deliberately (one handwriting model for the platform).
- **Row 73 The Writing Carriage** (another batch; same 15 word/sentence worksheets listed under its levels 3–4): its invention is a **fixed window with the paper ratcheting under it**. This design was changed by the critic so that nothing of that survives here — the ribbon never slides, there is no writing window on any width (the earlier draft's "carriage" and phone "writing lens" were removed), lines end with a return sweep to the left margin, and the inventions are the **roll that unrolls only under the pen**, the **space stone** (a visible object, the classroom space-stick, that stays as a grey oval) and the **card that turns over** (write from memory). The word lists are disjoint from Row 73's (no cat/dog/sun/bus/pig/hen/fox/cup). **Coordinator recommendation:** Row 73's frozen page promise is letters A–Z; its word and sentence levels duplicate this activity's whole scope — keep them here and let Row 73 own letter formation.
- **Letter Studio** tool (one huge letter, stroke order): no words, no line, no spacing. **Penny's / Snippy's Letter Trace** (rows 73–74, letters A–Z): single letters. **#222 The Pencil Path**: pre-writing strokes, no letters. **Heart Words** tool: maps sounds, then hides the word — not handwriting.

## 12. Build plan
- **Core state:** `{ loc, set, guide, rounds, r, repeats:[{guide:'dot'|'start'|'blank'}], ri, letters:[{ch, x, strokes, done}], li, si, stones:[x], needStone, needDot, slips, line, hidden:false, rack:[word] }`. Functions: `layoutWord(text, loc, glyphH)` (advance widths, accents, Æ/Ø/ß; parity with letter-strokes), `planFor(guide, set)`, `currentTarget()`, `credit(path)` via `StrokeTraceCore`, `classifySlip(rawPath)`, `placeStone(dropX)` → snug x, `canAdvance()`, `newLineIfNeeded()`, `cardHidden()` / `peek()`, `tapDot(pt)`, `nextRound()`.
- **Gate's own truth (`verify-word-ribbon-core.js`):** every word/sentence in every locale list lays out without a throw (no missing glyph); an ideal-path oracle completes every letter of every round in order; a reversed / mirrored / half / scribble / tap-only path never completes; letter i+1 cannot be credited before letter i; the roll cannot advance across a word boundary without a stone; a stone is refused before the full stop; stone width = advance of *o*; sentences contain only letters, spaces and one final "."; picture words exist in colour themes; layout parity with `letter-strokes.js` (advance widths within 0.5 unit).
- **Mutations:** allow out-of-order letter credit · advance without stone · accept stone before "." · stone width 0 · autocomplete strokes at 60 % · accept reversed stroke · drop the accent stroke · capital ß admitted · es "¿" sentence admitted · the hidden card shows during the Remember-it repeat · a peek that never turns the card back down · the ribbon slides instead of starting a new line at the left post · guide step-up not reset for the next letter.
- **local-test:** real pointer drags along every glyph of every round in 11 locales, widths 320…1366 (view-follow below 560; corridor ≥ 24 px at 320), stone drags, the full stop, one Remember-it round per locale with a deliberate wrong letter (card peeks on slip 2).
- **Pictures:** the picture-word and long-word nouns per locale on a contact sheet. **Risk:** per-locale school print differs in detail (de Grundschrift, sv/no school letters) from the platform manuscript model; the platform rule is one letterform (the same as the printable pages and Letter Studio) and the ruling varies per locale — record for the native reviewer to flag any letter a teacher in that locale would reject. **Nothing blocked.**

## 13. The four questions
1. **Choose it again?** Yes — a ribbon you pull out of a roll with your pencil, a heavy stone to clunk down, and a rack of scrolls you wrote yourself.
2. **Teacher on the board?** Yes — read → trace → write, stroke order judged, and the two K print concepts (left to right; spaces between words) built into the material.
3. **Parent trust?** Calm paper and ink, a library picture, no characters, no score, works on a phone at a traceable letter size.
4. **The invention:** the writing line only unrolls under the pencil, letter by letter, will not give you the next word until you lay down a space stone — and for sight words the card turns over so the last one comes from memory.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 2→5 · reality 4→5
What changed:
- Distinctness: Row 73 (The Writing Carriage, another batch) covers the same 15 worksheets with a FIXED WINDOW and paper that slides under it. This draft had a typewriter "carriage" (the written ribbon sliding left) and a phone "writing lens" (write in a fixed square, the letter flies to the ribbon) — Row 73's invention. Both removed. The ribbon never slides; a full line ends in a return sweep to the left start post (the RF.K.1 return-sweep habit); on phones the letter size stays traceable (glyph 150, corridor ≈ 24 px) and only the view follows the pen, with a miniature overview strip.
- New invention for the sight-word worksheets: **the card that turns over** (Guide "Remember it"): the word card flips face-down before the last repeat, so the ribbon unrolls only for the right next letter written from memory; slip 2 makes the card peek for 1.5 s; at the end its letters drop onto the child's. Look–say–cover–write–check, done by the apparatus.
- Word lists made disjoint from Row 73 (picture words cow / owl / bee / ant / bed / kite / drum / duck / fish; capitals BALL / BOAT / GOAT / LAMB / MOON / STAR / KEY / VAN / OWL). Locale example lists re-picked by the length rule (the old de list repeated Row 73's words).
- Layout: the ribbon width now leaves room for the scroll rack; long words step to glyph 100 if they would not fit one line; words never break across lines. Coordinator recommendation recorded in §11: Row 73 keeps letters A–Z, this activity owns words and sentences.

## 15. Ownership ruling (orchestrator, 2026-10-17)
#218 owns **words, sentences and word spacing**; Row 73 (The Writing Carriage) owns letters A–Z only. The shared handwriting worksheets for words/sentences/spacing count under #218.
