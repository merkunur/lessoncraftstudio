# The new worksheet makers — NEW templates (run F2b)

Answers brief §N of `docs/makers/FABLE-BRIEF.md` ("enrich each worksheet maker with brand new extra templates") for **every one of the 60 makers**, in the `ARCHITECTURE.md` §14 build order (the numbering of `ENGINES.md` Part 2). Written 2026-10-31 from the code, the two engine runs and the demand harvest; every code claim cites `file:line` (paths relative to `scripts/worksheet-gen/` unless they start with `REFERENCE`, `mini tools/`, `frontend/`, `docs/`). Where this document leans on a fact that `ENGINES.md` / `ENGINES-ART.md` measured today, it says so ("per ENGINES …") instead of re-measuring.

**What counts as new.** A template here is a **new task** — a different thing the child does, a different model, or a different classroom use (a cut-out material, a game) — never today's page with other numbers, another theme or another count. Range, theme and count stay *controls* of existing templates (ARCHITECTURE §4.1a). Where a seed idea from `docs/makers/topics/<id>.md` turned out to be a control or an existing type, it is named and dropped, not counted.

**Evidence.** Two sources, quoted per template: (a) the 11-market Google autocomplete harvest `docs/SEO/level-set-demand/harvest.<loc>.json` (a per-type digest was built for this run; phrases are quoted verbatim with their locale — ⚠ the harvest is seeded by worksheet type, so several type buckets are noise outside school use: `calendar` is dominated by "kalender 2026", `measurement` by blood pressure, Nordic `telling-time` by "what time is it in USA"; demand is quoted only where it is a teacher's phrase); (b) the curricula (CCSS en-US · Lehrplan · programmes officiels · SEP/NEM es-MX · BNCC pt-BR · Indicazioni nazionali · SLO kerndoelen · Lgr22 · Fælles Mål · LK20 · OPS 2014) and the gaps listed in `docs/activities-rebuild/coverage/COVERAGE.md`. CCSS codes are given where one exists; national frameworks are named by domain (codes only where certain).

**How to read a spec.** Each template is one block: rank (strongest first within the maker), a sketch, then `Child` · `Settings` (within the ≤ 7-control budget: the 3 common Level · Pictures · How many are not repeated — only the template's own ≤ 4) · `Band` + `Point` · `Reuse` (path, or **NEW** primitive) · `Screen` (one of the 11 kinds in `emit/interactive-runtime.js:60`, `printable`, or `material` = a classroom cut-out with no answer) · `Locales` (11 = all; refusals with the reason) · `Key` (the answer-key rule) · `Risks → how the design prevents them` · `Evidence`. Standing rules every spec obeys without repeating them: Unicode letters (`\p{L}`, A9); pictures only from the reviewed vocabulary, exact match for typed words (word-writing-Q1); never BW and colour mixed; counts start at 1 (A16); a page where the child writes gets a `type-*` screen (D6); the answer key shares the page's geometry (B5); every control value passes the settings-space / guessability gate (ARCHITECTURE gate 8) before it is exposed.

---

## Summary — 303 new templates across 60 makers

| # | maker | new | top 3 (rank order) |
|---|---|---|---|
| 1 | ten-frames | 7 | Double ten-frame to 20 · Rekenrek (20-bead rack) · Dice and domino quick look |
| 2 | counting | 6 | Count and write the number word · Count, then draw one more / one less · Count on from a known group |
| 3 | spelling | 6 | Word scramble · Word guess (blanks + picture) · Look-cover-write-check list |
| 4 | number-sequences | 5 | 120 chart · Hidden picture on the hundreds chart · Blank chart to fill |
| 5 | number-lines | 6 | Open number line · Missing labels on the line · Make-ten bridge on the line |
| 6 | number-bonds | 6 | Zahlenhaus / splitshuis (all pairs of N) · Make-ten bridge · Hidden counters |
| 7 | addition-subtraction | 8 | Facts drill page · True or false equations · Write the whole number sentence |
| 8 | doubles-halves | 5 | Near doubles · Draw the double · Is it a double? |
| 9 | compare-numbers | 5 | Crocodile mouth · Compare expressions · Make it true (open middle) |
| 10 | odd-even | 4 | Odd/even stripes on the chart · Discover the rule · Odd/even card sort to cut |
| 11 | place-value | 5 | Expanded form both ways · How many tens? · Non-standard blocks |
| 12 | fractions | 5 | Fraction wall to cut · Partition it yourself · Colour a fraction of the set |
| 13 | multiplication-division | 7 | Multiplication square · Division facts drill · Table of the day |
| 14 | money | 6 | Make the amount · Fewest coins · Which coin is it? |
| 15 | telling-time | 6 | Time words ↔ clocks · Daily routine timeline · Elapsed time on a time line |
| 16 | measurement | 6 | Estimate, then measure · Ruler to cut out · Which unit? |
| 17 | graphs-data | 5 | Class survey sheet · Count the scene, then graph · Build the pictograph |
| 18 | shapes-geometry | 6 | Rectangles of a given area · Nets to cut and fold · Which two shapes make it? |
| 19 | patterns | 5 | Find the core · Make your own pattern · Fix the pattern |
| 20 | number-tracing | 5 | Number + quantity tracing · Trace the number word · Dotted numbers to 50/100 |
| 21 | symmetry-grids | 5 | Grid copy of a drawing · Two-axis symmetry · Enlarge on the grid |
| 22 | logic-puzzles | 6 | Code addition · Number sudoku · Who am I? number riddles |
| 23 | same-different | 5 | Missing piece · Rebuild the picture · Match the close-up |
| 24 | sorting | 5 | Sort by my own labels · Venn sort · Who does not belong in the bin? |
| 25 | dot-to-dot | 5 | Locale alphabet · Sum dot-to-dot · Even dots only |
| 26 | color-by-number | 6 | Colour by sight word · Colour by odd/even · Colour by multiplication fact |
| 27 | coloring-pages | 6 | Colour and trace the word · Colour the scene · Big and small |
| 28 | mazes | 6 | Grid maze with my pictures · Picture-path rule maze · Collect the letters |
| 29 | find-the-differences | 5 | Odd panel out · Count the kinds · Look, fold, find |
| 30 | how-to-draw | 5 | Shapes-only drawing · Draw it bigger · Draw the other half |
| 31 | picture-tracing | 4 | Trace any library picture · Trace and colour by number · Trace, then write the word |
| 32 | pre-writing | 4 | Cutting lines · Letter-shape strokes · Fading rows |
| 33 | letter-tracing | 5 | Name tracing · Letter + picture · Fading rows |
| 34 | word-writing | 4 | Own-sentence tracing · Label the picture · Word shape boxes |
| 35 | cursive | 4 | Own words and sentences · Cursive letter of the day · Print ↔ cursive match |
| 36 | tangram | 4 | Make your own figure · Three-piece first puzzles · Which figure can you build? |
| 37 | alphabet | 6 | Alphabet train · Alphabet chart · Letter hunt in a scene |
| 38 | phonics | 5 | Clip cards · Blends per language · Same first sound? |
| 39 | rhyming | 3 | Rhyme memory cards · Which does not rhyme? · Rhyme dominoes |
| 40 | syllables | 3 | Syllable puzzle cards · Syllable family chart · Open clapping sheet |
| 41 | sight-words | 4 | Roll and read · Flash cards · Find the word in the text |
| 42 | nouns-articles | 4 | Article + noun + plural table · Count and write the plural · One or many? read and choose |
| 43 | picture-cards | 4 | Memory cards · Word-wall labels · Picture dictionary page |
| 44 | position-words | 4 | Read and draw · Where is it? write · Choose the word |
| 45 | grammar | 5 | Adjective comparison · Colour the word classes in sentences · Conjugation table |
| 46 | word-meaning | 4 | Compound puzzle cards · Name the group · Diminutives |
| 47 | sentences | 6 | Sentence strips · Open cloze · Rebus sentences |
| 48 | reading | 4 | My passage, my questions · True or false on a passage · Best title |
| 49 | stories-writing | 6 | Story map · Comic strip · Roll a story |
| 50 | word-problems | 4 | Compare problems · Two-step problems · Match the story to the number sentence |
| 51 | number-of-the-day | 5 | Number of the day to 1000 · Write it both ways · Numeral–word–quantity match |
| 52 | ordinal-numbers | 4 | Ordinal words to 31 (dates) · Which floor? · Numeral ↔ word match |
| 53 | calendar | 4 | Blank month to fill · Birthday graph · Today's date three ways |
| 54 | maps-grids | 5 | Treasure hunt · Give the directions · Draw your own map |
| 55 | me-family-feelings | 5 | Weekly feelings check-in · Feelings thermometer · Family tree with photos |
| 56 | health-safety | 4 | My safe way to school · Who helps? emergency numbers · Safe or unsafe? |
| 57 | word-search | 5 | Picture-clue search · Hidden message · Bilingual search |
| 58 | crossword | 5 | Picture crossword · Arrow-word (mots fléchés) · Criss-cross fill-in |
| 59 | secret-code | 5 | Number code A = 1 · Picture code · Sum code |
| 60 | bingo | 6 | Sum bingo · Sight-word bingo · Clock bingo |

Below 5 (18 makers): each section opens with the reason — a narrow topic already covered by its faces (odd-even, rhyming, syllables, tangram, cursive, ordinals), a bank-bound topic where every new face needs ×11 native authoring (word-problems, reading, nouns-articles, word-meaning), or a maker whose new value is a *freedom* (any library picture, own words) rather than new tasks (picture-tracing, word-writing). Cross-link cards (a gallery card that opens another maker's template — odd/even maze, sight-word bingo, number-word search) are listed where they belong and counted once, in the maker that owns the type (topic-map: one maker per type).

Data the new templates need that does not exist today (native authoring; sizes are string counts per locale): two-step word-problem frames (~12) · daily-routine words (~12) · adjective triples (~20) · present-tense person forms where the verb bank lacks them · diminutive pairs (~20; en/fr/sv/da/no refused) · definite-article table (10 rows; Nordic as literals) · number-riddle frames (~8) · fraction words (~8, gendered) · ordinals 11th–31st · emergency numbers + helper words (3) · weekday-schedule activity words (~10) · vowel-length flags (fi/nl/de/en, from the approved words) · caller strings. Each is named in its template and totalled in §"For the operator" D.

---

## Pilot

### 1. Ten Frames, Tally Marks & Quick Look (`ten-frames`) — 7 new

**T1 · Double ten-frame to 20** — rank 1
```
 ┌─┬─┬─┬─┬─┐ ┌─┬─┬─┬─┬─┐
 │●│●│●│●│●│ │●│●│●│ │ │      13 = 10 + [ 3 ]
 │●│●│●│●│●│ │ │ │ │ │ │      [ 13 ]
 └─┴─┴─┴─┴─┘ └─┴─┴─┴─┴─┘
```
- Child: sees the full frame as ten, counts on in the second frame; writes the number and the ten-and-some sentence.
- Settings: Range 11–20 · Frames shown (full + partial / both partial) · Dots or pictures.
- Band K–G1 · Point K.NBT.A.1 (teen numbers as ten and ones); Lehrplan "Zahlen bis 20", programmes CP "dizaine", SLO "getallen tot 20".
- Reuse `primitives/ten-frame.js` (`tenFrame({a, b, cell, iconHref})`, `ten-frame.js:13`) twice in `types/_shared/frame-counting.js`.
- Screen type-number (two boxes) · Locales 11 · Key: both boxes filled.
- Risks: none positional (frames fill left-to-right, top row first, `ten-frame.js:5-6`); the teen-word trap (de/nl "dreizehn") is not on this page.
- Evidence: coverage gap "Represent one number many ways / teen numbers" is only on activities (COVERAGE.md G1 row 11); demand "number bonds to 20" (en), "zahlzerlegung bis 20" (de).

**T2 · Rekenrek — the 20-bead rack** — rank 2
```
 ●●●●●○○○○○ ────── ●●●●●○○○○○     How many beads on the left?  [ 7 ]
 ●●○○○○○○○○ ────── ●●●●●●●●○○
```
- Child: reads a bead count pushed left on two rows of 10 (5 red + 5 white per row, so 7 = 5 + 2 at a glance); level 3: shows a number by colouring beads.
- Settings: Rows (1 / 2) · Task (read / show) · Range (to 10 / 20).
- Band K–G1 · Point K.CC.B.5 / 1.OA.C.6 (five-structure, make-ten); SLO "rekenrek" (the standard nl apparatus), Lehrplan "Zwanzigerreihe", Lgr22 "talrad".
- Reuse: **NEW** `primitives/rekenrek.js` (two rows of 10 beads, 5/5 colour split, `pushed` per row; pure SVG on `_tokens.js`); the count/colour tasks reuse `frame-counting.js`.
- Screen type-number (read) / tap-paint beads (show) · Locales 11 · Key: the number / the beads.
- Risks: the five-structure must be visible in greyscale → bead 6 onwards gets a ring, not only a hue (the coins.js "never by hue" rule, `primitives/coins.js:2-5`).
- Evidence: the apparatus of nl/de/da classrooms (no deck has it); demand "splitsen groep 3" (nl), "tiokompisar" (sv), "tiervenner" (da/no) all live on this rack.

**T3 · Dice and domino quick look** — rank 3
```
 [⚄] [⚃]      ⚂|⚅      "Don't count — how many?"   ○5 ○6 ○7
```
- Child: subitizes a die face (1–9 pips) or a domino (two halves) and circles the total.
- Settings: Dice or dominoes · Max pips (6 / 9) · Choices (3 / 4).
- Band K · Point K.CC.B.4 (perceptual + conceptual subitizing); Lehrplan "Anzahlen schnell erfassen".
- Reuse `primitives/dice.js` (`LAYOUTS` 1–9, `dice.js:3,11`), `primitives/domino.js` (`domino({a, b})`, `domino.js:3,10`), `templates/components.js chipRow` (`:95`), `distractorsFor` (`:111`).
- Screen tap-choice · Locales 11 · Key: the circled chip.
- Risks: answer-position tell → chip order from the rng, balanced by gate 8; the three choices stay within ±2 so one is never absurd (A3).
- Evidence: topic seed "dice and domino patterns"; "roll and add" / "domino math" already exist as *addition* (G1-110/111) — the *look-and-know* face does not.

**T4 · Ten-frame subtraction — cross out and count what is left** — rank 4
```
 ┌─┬─┬─┬─┬─┐
 │●│●│●│●│●│   8 − 3 = [ 5 ]     (3 dots crossed)
 │●│●│●│ │ │
 └─┴─┴─┴─┴─┘
```
- Child: the frame shows the minuend with `k` dots crossed; writes the difference (level 3: writes the whole sentence).
- Settings: Range (to 5 / 10) · Crossed dots shown / child crosses them.
- Band K–G1 · Point K.OA.A.1–2 (take-away on a structured model); programmes CP "soustraction".
- Reuse `ten-frame.js` with a `crossed` count (additive param, the coral cross from `templates/components.js` crossout rows used by G1-103); `answerBox` (`components.js:105`).
- Screen type-number · Locales 11 · Key: the difference.
- Risks: a crossed dot must stay legible on a copier → cross stroke ≥ 2.5 px (the trace-path floor, `primitives/trace-path.js:8-9`).
- Evidence: the frame family is addition-only today (G1-105/106); K.OA.A.1 names "drawings" and "mental images" — the frame is the mental image.

**T5 · Three ways to show a number (frame · tally · numeral)** — rank 5
```
   7          ┌─────┐      ||||  ||
  [ 7 ]  →    │●●●●●│  →   ─────────
              │●●   │       [ 7 ]
```
- Child: one representation is given per row; fills the other two (draws dots, draws tallies, writes the numeral).
- Settings: Given (numeral / frame / tally / rotating) · Range (to 10 / 20).
- Band K–G1 · Point K.CC.A.3 + K.CC.B.4 (translate between representations); Lehrplan "Darstellungen wechseln".
- Reuse `ten-frame.js`, `primitives/tally.js` (`tally({n})`, `tally.js:3,9`), `answerBox`.
- Screen type-number for the numeral cell; the drawn cells are printable · Locales 11 · Key: all three cells.
- Risks: the "given" cell must rotate so the numeral is not always first (A3) → the rotation is in the seed and balanced per page.
- Evidence: COVERAGE.md K row 5 lists tallies as a *gap* on activities; teachers search "number of the day" pages that do exactly this translation (de "zahl des tages klasse 1").

**T6 · Ten-frame flash cards to cut** — rank 6
```
 ┌──────────┬──────────┐
 │ ┌┬┬┬┬┐   │ ┌┬┬┬┬┐   │   8 cards per page, scissor line
 │ │●●●●●│  │ │●●●●│ │  │
 └──────────┴──────────┘
```
- Child/teacher: cut the cards; flash for subitizing; back page optional numerals (mirrored so a duplex print lines up).
- Settings: Range (0–10 / 11–20 double frames) · Numerals on the back (on/off).
- Band K · Point K.CC.B.5 fluency with the five/ten structure.
- Reuse `ten-frame.js`; the cut lines of K-240 (`types/k/K-240-cut-and-paste.js`, the dashed scissor line component per ENGINES #24).
- Screen material (no key) · Locales 11 (no words) · Key: none (the gallery card says "classroom material").
- Risks: duplex alignment → the back page mirrors columns; the page carries a 2-cm check square (the measurement footer rule, ENGINES [measurement-Q1]).
- Evidence: "flash cards" / "vocabulary cards" is a head term in en `picture-word-cards`; every K teacher laminates these.

**T7 · Colour the frame to show the parts (make 10 two colours)** — rank 7
```
 ┌─┬─┬─┬─┬─┐
 │ │ │ │ │ │     6 + 4 = 10   colour 6 red and 4 blue
 │ │ │ │ │ │
 └─┴─┴─┴─┴─┘
```
- Child: colours a given decomposition into the empty frame (level 3: finds and colours every pair that makes the whole, one frame per pair).
- Settings: Whole (5 / 10) · Pairs given / child finds them.
- Band K · Point K.OA.A.3 (decompose numbers to 10 and record); it "amici del 10", sv "tiokompisar".
- Reuse `ten-frame.js` (empty frame, `fillStyle`), the colour words from `data/color-words.js` for the two crayons.
- Screen tap-paint (two palette colours; the check accepts the exact counts, any cells — count-based grading, A4) · Locales 11 · Key: a filled frame.
- Risks: a child who fills 6 red + 4 blue in any order is right → the verifier counts colours, never positions.
- Evidence: G1-106 asks "how many more to make 10"; the *record the decomposition* face is the K.OA.A.3 core (COVERAGE.md K row 15 covered only by activities).

### 2. Counting (`counting`) — 6 new

**T1 · Count and write the number word** — rank 1
```
 🐱🐱🐱🐱🐱      [ five ]  ← word bank: three · five · six · eight
```
- Child: counts a set and circles / writes the matching number word; level 3 writes it without a bank.
- Settings: Range (1–5 / 1–10 / 1–20) · Answer (circle word / write from bank / write).
- Band K–G1 · Point K.CC.A.3 + the national number-word lists (de Zahlwörter, fr "nombres en lettres cp", es "números en letras del uno al 20").
- Reuse `lib/number-words.js` (0..100 ×11, `number-words.js:1-16`), `templates/components.js iconScatter` (`:43`), `chipRow`; screen pad from `lib/letter-pad.js` (`letterPad(loc, words)`, `:11`).
- Screen tap-choice (bank) / type-word (write) · Locales 11 · Key: the word.
- Risks: homograph-like distractors (fr "six"/"dix") → distractors differ by ≥ 2 letters after folding; nl "één" override as in G1-210 (`number-words.js` consumer note per ENGINES Q1).
- Evidence: topic seed; demand "number words 1-20" (en), "números en letras del uno al 20" (es), "numeri in lettere 1 20" (it).

**T2 · Count, then draw one more / one less** — rank 2
```
 🍎🍎🍎🍎   4     Draw one more:  🍎🍎🍎🍎 [ ]    Now: [ 5 ]
```
- Child: counts, draws one more (or crosses one out), writes the new number.
- Settings: Direction (one more / one less / mixed) · Range (1–5 / 1–10).
- Band K · Point K.CC.B.4c (each successive number is one larger); SEP/NEM 1° "sucesor y antecesor".
- Reuse `iconScatter` (`components.js:43`), `answerBox` (`:105`), an empty dashed slot (the `.ws-pattern-slot--blank` convention named in `primitives/number-bond.js:4-5`).
- Screen type-number (the new total) · Locales 11 · Key: the number; the drawn item is open.
- Risks: a child draws badly → nothing is graded on the drawing; only the written number is the answer.
- Evidence: topic seed ("the one-more step K.CC.B.4c has no counting sheet"); COVERAGE.md K row 9 (before/after) is an activity gap.

**T3 · Count on from a known group** — rank 3
```
 ┌───┐
 │ 6 │ 🐸🐸🐸        6 … 7, 8, 9   → [ 9 ]
 └───┘  (closed box, 6 inside)
```
- Child: a closed box is labelled with its count; loose pictures sit beside it; counts on from the label and writes the total.
- Settings: Box count (3–10) · Loose (1–5) · Show the counting trail (on/off, level).
- Band K–G1 · Point K.CC.A.2 (count forward from a given number) → 1.OA.C.5 (counting on as a strategy); Lehrplan "Weiterzählen".
- Reuse `iconScatter`, a labelled closed box (SVG rect + numeral), `answerBox`.
- Screen type-number · Locales 11 · Key: the total.
- Risks: a child who opens nothing and counts the pictures gets the loose count → the key is the total; the instruction says "start at the number on the box" (gate 10 reads it).
- Evidence: the counting-on strategy is in every G1 curriculum (programmes CP "surcomptage"); no deck models the closed group.

**T4 · Same number, two arrangements (conservation)** — rank 4
```
 🐟 🐟 🐟 🐟 🐟 🐟      [ 6 ]
   🐟  🐟                      Same?   ○ yes  ○ no
 🐟    🐟  🐟 🐟     [ 6 ]
```
- Child: counts a lined-up set and a scattered set, writes both, circles whether they are the same.
- Settings: Range (1–10) · Pairs (equal / sometimes one more).
- Band K · Point K.CC.B.4b (the number is the same regardless of arrangement); BNCC EF01MA02.
- Reuse `iconRows` (`components.js:10`) + `iconScatter` (`:43`), `chipRow`.
- Screen type-number ×2 + tap-choice · Locales 11 · Key: both counts + yes/no.
- Risks: "yes" always → control "sometimes one more" injects unequal pairs; gate 8 balances the yes/no ratio per page.
- Evidence: topic seed (conservation); Piagetian conservation is explicit in the es-MX NEM and the it Indicazioni (scuola dell'infanzia → classe prima).

**T5 · Draw the set (read the number, make that many)** — rank 5
```
   7    ┌──────────────────┐        4    ┌─────────┐
        │  (draw 7 circles)│             │         │
        └──────────────────┘             └─────────┘
```
- Child: reads a numeral and draws that many marks in the box (production of a set, K-011 only *selects* N from more).
- Settings: Range (1–5 / 1–10 / 1–20) · Box shape (plain / ten-frame guide).
- Band K · Point K.CC.B.5 (given a number, count out that many).
- Reuse `answerBox` frames; optional `ten-frame.js` empty guide.
- Screen printable (drawing has no screen; the gallery card says so) · Locales 11 · Key: none graded — the key page shows one correct set.
- Risks: none graded; the numeral font is the digit model of the locale (`data/tracing/digit-strokes.js FORM_BY_LOCALE`, per ENGINES [number-tracing-Q1]) so a de 1 has its flag.
- Evidence: coverage K row 2 "make a set of a given number" is covered by colour-exactly-N only; the draw-N face is what "count and draw" searches ask for.

**T6 · Which group shows the number?** — rank 6
```
   5      [🐶🐶🐶]   [🐶🐶🐶🐶🐶]   [🐶🐶🐶🐶]      circle one
```
- Child: reads the numeral and circles the one group with exactly that many (distractors ±1, ±2).
- Settings: Range (1–10) · Groups (2 / 3 / 4).
- Band K · Point K.CC.B.5 (inverse of count-and-circle: number → quantity).
- Reuse `iconRows`, `distractorsFor` (`components.js:111`).
- Screen tap-choice · Locales 11 · Key: the group.
- Risks: the biggest group is the answer too often → gate 8 over `groups`; distractors on both sides of the target where the range allows.
- Evidence: K-002 is quantity → numeral; this is numeral → quantity, the pair every K curriculum asks for ("Zahl und Menge zuordnen").

### 3. Spelling & Word Building (`spelling`) — 6 new

**T1 · Word scramble** — rank 1 (the old `word-scramble` app, kept)
```
 [🐸]   g o r f   →  _ _ _ _          vowels tinted (option)
```
- Child: unscrambles the letters of the picture word and writes it.
- Settings: Words (theme / my list) · Letter case (small / CAPITALS) · Colour the vowels (on/off) · Clue (picture / none).
- Band G1–G2 · Point L.1.2.d–e / L.2.2.d (spell untaught words phonetically; conventional spelling); de "Wörter bauen", fr "ordre des lettres".
- Reuse `types/_shared/lit-word-build.js`, `lib/letter-pad.js OWN` (`:11`) for the vowel set per locale, `data/b2/collation.js` letters; per ENGINES #3 the shuffle must differ from the word and from any real word of the locale (approved words + vocab).
- Screen tap-spell · Locales 11 (own words allowed, claim = letters) · Key: the word.
- Risks: a scramble that spells another real word → rejected and reshuffled (ENGINES #3); A11 multi-word entries excluded (`wordFilter: exclude`).
- Evidence: the old app's custom word list is the most-used feature to keep (OLD-APP-LESSONS §E); demand "palavras pontilhadas", "parole tratteggiate" are tracing — the scramble is the puzzle face of the same words.

**T2 · Word guess — blanks with a picture clue** — rank 2 (the old `word-guess` app, kept)
```
 [🚲]   b _ c _ c l _        letters you may use: a e i o u y
```
- Child: fills the blanked letters of the picture word (level 1: vowels blanked; level 3: half the letters).
- Settings: Words (theme / my list) · Blanks (vowels / every other / half) · Letter box of hints (on/off).
- Band G1–G2 · Point RF.1.3 / L.1.2.d; es "completa la palabra", fr "lettres manquantes".
- Reuse `lit-word-build.js`, `primitives/bankword-width.js` measured widths for the boxes (`bankword-width.js:12-24` per ARCHITECTURE §2.1).
- Screen type-word · Locales 11 (own words: letters claim) · Key: the full word.
- Risks: a blank pattern with two valid fillings (en "b_t": bat/bit/but) → the picture decides; additionally the engine rejects a pattern that another vocab/approved word of the locale also fits (the uniqueness scan of ENGINES #3's scramble, reused).
- Evidence: old app; demand "fill in the missing word" (en, noisy) and "lettres manquantes"-class searches.

**T3 · Look, cover, write, check** — rank 3
```
 word        look · cover · write        check
 house       ┌────┐  ┌────┐  ┌────┐      ☐
 garden      │    │  │    │  │    │      ☐
```
- Child: reads the word, folds the flap over it, writes it from memory in column 1 (2, 3), checks and ticks.
- Settings: Words (my list / theme, 6–12) · Attempts (2 / 3) · Fold flap (on/off).
- Band G1–G3 · Point L.2.2.d (spelling lists); de "Lernwörter", nl "woordpakket", sv "veckans ord", fr "mots de la semaine".
- Reuse the ruling rows of `primitives/trace-path.js` (school-lines trio, `trace-path.js:12`); own words via word-writing-Q1 matching (pictures optional).
- Screen type-word (one attempt per word) · Locales 11 (own-allowed) · Key: the list.
- Risks: a word longer than the column → fit refusal with the sentence (gate 9); de capitals preserved (`lib/b2-common.js displayWord`, per ENGINES Q1).
- Evidence: demand "lernwörter klasse 2 / lernwörter blatt / lernwörter blanko" (de), "woordpakket"-class nl searches, "mots outils" (fr); ENGINES #34 named this template and parked it here with the old word-guess.

**T4 · Fix the spelling — circle the right one** — rank 4
```
 [🐘]   elefant   elephant   elephent
```
- Child: circles the correct spelling of the picture word among two misspellings.
- Settings: Misspelling kind (vowel swap / dropped letter / doubled letter / mixed) · Choices (2 / 3).
- Band G1–G3 · Point L.2.2.d, L.3.2.f (spelling patterns); de "Rechtschreibung", nl "spelling".
- Reuse the vocab slice + `collation.js fold`; distractor generator = one edit (swap/drop/double) that is **not** a word in the locale's vocab or approved list (uniqueness scan).
- Screen tap-choice · Locales 11 (bank words only — a misspelling of a typed word cannot be checked against "every word") · Key: the circled word.
- Risks: a distractor that is a real word (en "desert/dessert") → the scan rejects it; two-answer risk zero by construction (one correct string).
- Evidence: demand "spelling rules for kids" (en), "rechtschreibregeln grundschule" (de), "regras de ortografia" (pt), "spellingregels groep 4" (nl).

**T5 · Missing vowels** — rank 5
```
 [🍌]   b _ n _ n _        a e i o u (+ locale vowels ä ö ü å æ ø)
```
- Child: writes every missing vowel of the picture word (all consonants given).
- Settings: Words (theme / my list) · Vowel set shown (on/off).
- Band G1–G2 · Point RF.1.3.b–c (vowel sounds and their letters); es "las vocales", it "pregrafismo vocali" (demand).
- Reuse `lit-word-build.js`; the vowel set per locale from `collation.js` + `letter-pad.js OWN` (fi/sv/da/no/de extra vowels; y is a vowel in sv/da/no/fi, a consonant-or-vowel in en — per-locale vowel list in `data/b2/collation.js`, extend with a `vowels` field, hand-authored ×11).
- Screen type-word (vowel pad only) · Locales 11 (own words: letters claim) · Key: the word.
- Risks: en words where the vowel pattern is ambiguous (b_t) → the picture decides; the uniqueness scan of T2 applies.
- Evidence: demand "grafomotricidad de las vocales" (es, 43), "pregrafismo vocali" (it); the vowel/consonant split is K-230's sort — this is its production.

**T6 · Letter tiles and word mats to cut** — rank 6
```
 ┌─┬─┬─┬─┬─┬─┬─┐      mats:  [🐱]  _ _ _      [🐶]  _ _ _
 │a│b│c│…│ä│ö│ü│
```
- Teacher: cuts the locale alphabet tiles (2 vowel sets); child builds the words of the mats.
- Settings: Words (theme / my list) · Tiles per letter (1 / 2) · Case.
- Band K–G1 · Point RF.K.3 (build words); material for the classroom literacy centre.
- Reuse the K-240 cut lines; `collation.js` alphabet (`collation.js:5-11`: it 21 letters; sv/fi å ä ö after z).
- Screen material · Locales 11 · Key: none (the mats print the pictures; the word key is on page 2).
- Risks: a theme whose words need letters beyond the tile count → tile count is computed from the chosen words.
- Evidence: the hands-on half of "build the word" (K-231) that teachers laminate; demand "bildkarten" / "woordkaartjes maken" (nl, 25) shows the material appetite.

## B1 — numbers

### 4. Number Charts & Counting Sequences (`number-sequences`) — 5 new

**T1 · 120 chart with missing numbers** — rank 1
```
 101 102 [ ] 104 … 110
 111 [ ] 113 …    120
```
- Child: fills the missing cells of a chart that runs to 120 (the K/G1 charts stop at 100).
- Settings: Range (1–120 / 101–120 strip) · Blanks (few / many) · Highlight tens (on/off).
- Band G1 · Point 1.NBT.A.1 (count to 120 starting at any number); SEP/NEM 1° "hasta 100 y más".
- Reuse `primitives/hundreds-chart.js` (`hundredsChart({start, end, missing, highlights})`, `hundreds-chart.js:11` — `end=120` adds two rows; `lib/number-charts-screen.js`).
- Screen type-number · Locales 11 (language-free) · Key: the filled chart.
- Risks: twelve rows at `cell=56` overflow the body → `withLayoutFit` step to `cell=50` (`lib/layout-fit.js:13-29` per ARCHITECTURE §4.4); the strip variant (101–120) is the small-page fallback.
- Evidence: topic seed (CCSS 1.NBT.A.1 counts to 120; charts stop at 100).

**T2 · Hidden picture on the hundreds chart** — rank 2
```
 Colour: 23 24 25 33 35 43 44 45 …   →  a heart appears
```
- Child: reads the number list and colours those cells; a pixel picture appears (the chart-coordinates analogue of G2-279).
- Settings: Picture (pixel figure picker) · List order (sorted / shuffled) · Chart (1–100 / 101–200).
- Band G1–G2 · Point 1.NBT.A.1 + 1.NBT.B.2 (locate numbers by tens and ones); de "Hundertertafel" tasks, fr "tableau des nombres".
- Reuse `hundreds-chart.js highlights` for the key; the pixel figures of `data/b2/figures.js PIXEL_FIGURES` (the `coord-grid.js` source, `coord-grid.js:7-8`) mapped onto the 10×10 cells.
- Screen tap-paint (cells) · Locales 11 · Key: the coloured figure.
- Risks: a figure wider than 10 columns → only figures ≤ 10×10 are offered (the same filter `K-286` applies to its sizes 6/7/8, per ENGINES #21); the list is the answer, so the key is a lookup — no position tell.
- Evidence: topic seed "riddle colouring"; demand "hundertertafel bunt / hundertertafel puzzle" (de), "honderdveld puzzel" (nl), "hundraruta bild" (sv).

**T3 · Blank chart to fill** — rank 3
```
 ┌──┬──┬──┬──┐
 │ 1│  │  │  │ …   (or 101 … 200, or fully empty)
```
- Child: writes every number of the chart from the printed start (level 3: only the first number given; range 101–200 or 201–300).
- Settings: Start (1 / 0 / 101 / 201 …) · Given cells (first row / first column / first only) · Step (1 / 10 for a 10-200 by tens chart).
- Band G1–G2 · Point 1.NBT.A.1, 2.NBT.A.2 (count within 1000); demand-named in five locales.
- Reuse `hundredsChart({start, missing: all})`; the per-cell screen of `lib/hundreds-screen.js`.
- Screen type-number (every cell) · Locales 11 · Key: the full chart.
- Risks: 100 typed cells on a phone is long → the screen splits rows into passes (the `type-number` runtime already pages items, per `emit/interactive-runtime.js`); a start that is not a multiple of 10 shifts the tens column → refused (start must be 10k+1 or 0).
- Evidence: "hundertertafel leer / ohne zahlen / blanko" (de), "honderdveld leeg" (nl), "tabla del 100 en blanco", "tabla del 100 al 200" (es), "quadro numérico de 100 a 200 para completar" (pt, report), "hundraruta tom" (sv).

**T4 · Skip count from any number** — rank 4
```
 37, 47, 57, [ ], [ ], [ ]        step 10
 14, 16, [ ], 20, [ ]             step 2
```
- Child: continues a sequence whose start is not a multiple of the step (bridging tens: 37 → 47; 98 → 100 → 102).
- Settings: Step (2 / 5 / 10 / 100) · Start (any / crossing a ten / crossing a hundred) · Direction.
- Band G1–G2 · Point 1.NBT.C.5 (10 more mentally), 2.NBT.A.2, 2.NBT.B.8 (10/100 more or less); SLO "tellen met sprongen vanaf een willekeurig getal".
- Reuse `types/_shared/number-strip.js` with a free `start` (the strip already takes `start/step`; today's skip types start at the step's multiples).
- Screen type-number · Locales 11 · Key: the strip.
- Risks: a start that makes the strip cross 1000 at range 100 → range gate; the "any rule" of the topic doc is NOT offered (ENGINES #4 risk) — steps stay in the listed set.
- Evidence: the bridging step is the recorded hard point of nl "hoofdrekenen met brug" (nl demand), de "Zehnerübergang"; G1-123/124/125 all start at the step.

**T5 · Three-digit chart piece** — rank 5
```
 301 302 303 … 310
 311 [ ] 313 …
 …            400
```
- Child: fills a 100-cell chart that starts in the hundreds (301–400), reading tens and ones inside a hundred.
- Settings: Hundred (1xx … 9xx) · Blanks (few / many / rows).
- Band G2 · Point 2.NBT.A.1–2 (count within 1000; the hundreds digit stays fixed while tens/ones run); de "Tausenderbuch" page, it "tabella dei numeri fino 1000".
- Reuse `hundredsChart({start: 301, end: 400, missing})` — the primitive takes any start (`hundreds-chart.js:11-14`).
- Screen type-number · Locales 11 · Key: the chart.
- Risks: three-digit numerals at `cell=56` → the layout-fit step reduces the font, not the cell; the `keyText` flag renders the key (`:11`).
- Evidence: "hundertertafel bis 1000" (de), "quadro numérico até 1000" (pt), "tabla del 100 hasta el 1000" (es), "tabella dei numeri fino 1000" (it).

### 5. Number Lines (`number-lines`) — 6 new

**T1 · Open (empty) number line** — rank 1
```
 36 + 27 = [ 63 ]
 ├───────────────────────────────┤      (no ticks; the child draws the jumps)
```
- Child: solves the printed problem by drawing jumps on an empty line and writes the result.
- Settings: Operation (+ / − / mixed) · Range (to 20 / 100 / 1000) · Jumps shown as a model on card 1 (on/off).
- Band G1–G3 · Point 1.NBT.C.4, 2.NBT.B.5/B.7 (strategies based on place value); the standard nl/de/sv model ("lege getallenlijn", "Rechenstrich", "tom tallinje").
- Reuse `primitives/number-line.js` with `tickStep` = none and `labelEvery` = 0 (an additive `open: true` flag that draws the bare line + end arrows; `number-line.js:12`); `answerBox`.
- Screen type-number (the result; the jumps are the child's work) · Locales 11 · Key: the result + one model jump path.
- Risks: a child's jumps are not graded (open strategy); the result is unique (one correct answer). D6: the written answer gets its `type-number` box (ENGINES #5 said "printable" — the box exists, so the screen is required).
- Evidence: topic seed; demand "getallenlijn leeg" (nl), "zahlenstrahl ohne zahlen" (de), "droite numérique vierge" (fr), "recta numerica en blanco" (es), "number lines blank" (en), "reta numerica em branco" (pt).

**T2 · Missing labels on the number line** — rank 2
```
 0 ──┼──┼──┼──┼──┼── 50        [ ] 20 [ ] [ ] 50
```
- Child: works out the step from the printed labels and writes the missing ones (several per line).
- Settings: Range (to 20 / 100 / 1000) · Step (1 / 2 / 5 / 10 / 100) · Labels given (ends / ends + one / two).
- Band G1–G3 · Point 2.MD.B.6 (represent whole numbers on a line with equally spaced points), 2.NBT.A.2.
- Reuse `number-line.js marks/labelText`, `types/_shared/number-line-tasks.js` (per ENGINES #5 reads `notation.js`).
- Screen type-number (per blank tick) · Locales 11 · Key: all labels.
- Risks: two steps fit the given labels (0, _, 20: step 10 or 5 with 4 ticks) → the generator asserts the tick count forces one step (ticks between labels = labels' difference / step, integer and unique) — gate 15 `unique-solution`.
- Evidence: "zahlenstrahl bis 1000 / bis 100" (de), "linea dei numeri fino 100" (it), "lukusuora 0-100" (fi); G1-274… ask "where is the arrow", never "what are the labels".

**T3 · Make-ten bridge on the line** — rank 3
```
 8 + 5:   8 ──╮2╭── 10 ──╮3╭── 13      8 + [2] + [3] = [13]
```
- Child: draws two jumps — to the next ten, then the rest — and fills the three boxes.
- Settings: Range (to 20 / 100) · Operation (+ / −: 13 − 5 = 13 − 3 − 2).
- Band G1–G2 · Point 1.OA.C.6 (make ten), 2.NBT.B.5; de "Zehnerübergang mit Zerlegung", nl "met brug".
- Reuse `number-line.js jumps` (two arcs), three `answerBox` cells; the decomposition is computed (next ten − a).
- Screen type-number ×3 · Locales 11 · Key: the three numbers and both arcs.
- Risks: a problem that does not cross a ten (3 + 4) is not a bridge → the generator only draws crossing pairs; the two parts are unique given the ten.
- Evidence: the strategy every G1 curriculum names (Lehrplan "Zehnerübergang", Lgr22 "tiotalsövergång", programmes "passage de la dizaine"); nl demand "hoofdrekenen met brug" (24).

**T4 · Fractions on the number line — mark it** — rank 4
```
 0 ┼───┼───┼───┼ 1       mark 3/4      (quarters ticked)
 0 ┼─────┼─────┼ 1       mark 2/3
```
- Child: draws / taps the point for a given fraction on a 0–1 line partitioned into b equal spaces (G3-317 only *recognises* a marked dot).
- Settings: Denominators (2 3 4 6 8, multi) · Ticks labelled (none / unit fractions) · Beyond 1 (on/off, level 3: 5/4).
- Band G3 (G2 halves/quarters) · Point 3.NF.A.2 (represent a fraction on a number line); de "Bruchteile am Zahlenstrahl", es "recta numérica de fracciones" (demand 79).
- Reuse `number-line.js` with fractional ticks (`tickStep = 1/b`, labels from `primitives/fraction.js` notation), `lib/number-lines-screen.js`.
- Screen tap-select (the one tick) · Locales 11 · Key: the marked point.
- Risks: equivalent fractions (2/4 = 1/2) → the line is partitioned in the fraction's own denominator, so the answer tick is unique; the fraction glyph is drawn as a stacked SVG fraction (never "3/4" text in locales that write it differently).
- Evidence: "recta numérica de fracciones" (es 79, report), "reta numérica com fração" (pt 61), "zahlenstrahl brüche" (de 34), "droite numerique avec fraction" (fr), "number lines fractions" (en).

**T5 · Vertical number line (thermometer style)** — rank 5
```
   20 ┤
      ┤ ← [ 17 ]
   10 ┤
    0 ┴
```
- Child: reads marked values on a vertical line / marks a given value; prepares thermometer reading and "higher/lower" language.
- Settings: Range (to 20 / 50 / 100) · Labels (all / every 5 / every 10) · Task (read / mark).
- Band G1–G2 · Point 2.MD.B.6; the transfer to measurement scales (jug, thermometer) the measurement maker uses.
- Reuse `number-line.js` with a `vertical: true` flag (per ENGINES #5 a new flag; the tick engine is shared with `primitives/ruler.js` and `thermometer.js`).
- Screen type-number (read) / tap-select (mark) · Locales 11 · Key: the values.
- Risks: label collisions at step 1 to 100 vertically → the fit step raises `labelEvery`.
- Evidence: topic seed; de "zahlenstrahl … senkrecht"-class searches are rare — the value is pedagogical (scale reading, §16 measurement-Q1 thermometer has no unit label today).

**T6 · Desk number line to cut (0–20 / 0–100)** — rank 6
```
 0  1  2  3  4  5  6  7  8  9  10  11 … 20      ✂ ─ ─ ─ ─ ─
```
- Teacher: prints and laminates a desk strip; two strips per page; optional ten-frame dots under each number.
- Settings: Range (0–10 / 0–20 / 0–100 in two rows) · Dots under numbers (on/off) · Tens coloured (on/off).
- Band K–G2 · material for every number lesson.
- Reuse `number-line.js` at full width; K-240 cut lines.
- Screen material · Locales 11 (0 included on a reference strip is correct — the A16 rule is about counting tasks, not the line) · Key: none.
- Risks: none; the 2-cm footer check square keeps the laminated strip true to scale.
- Evidence: "linea dei numeri fino 20 e plastificare" (it), "getallenlijn voor in de klas" (nl), "tallinje vägg / 0 100 vägg" (da/sv), "number lines to 20" (en head term).

### 6. Number Bonds & Fact Families (`number-bonds`) — 6 new

**T1 · Zahlenhaus / splitshuis — every pair of N** — rank 1
```
     ╱‾‾‾‾‾╲
    ╱   7   ╲
   │ 0 │ 7  │
   │ 1 │ 6  │
   │ 2 │ [ ]│
   │ 3 │ [ ]│ …
```
- Child: completes the whole table of decompositions of N (house roof = N; each floor a pair).
- Settings: Whole (5 … 10 / 20) · Floors given (all left / some / none) · Dots beside numerals (on/off).
- Band K–G1 · Point K.OA.A.3 (decompose in more than one way; record each); de "Zahlenhaus", nl "splitshuis", fr "maisons des nombres".
- Reuse `primitives/number-bond.js` for the roof (`blankText`, `partDots`, `number-bond.js:9-12`); a new house body = rows of two `answerBox` cells.
- Screen type-number (each blank) · Locales 11 · Key: the full table. 0 + 7 is kept: the decomposition table legitimately includes 0 (A16 is about *counting* pages, ENGINES #6 names this house).
- Risks: the order 0,1,2… makes the right column predictable → level 3 shuffles the given left numbers; A4: each row has one right answer by the fixed left part.
- Evidence: "zahlzerlegung haus" (de), "splitsen groep 3 / splitsen tot 10" (nl), "maisons des nombres"-class (fr); COVERAGE.md K row 15.

**T2 · Make-ten bridge (8 + 5 = 8 + 2 + 3)** — rank 2
```
 8 + 5 = 8 + [2] + [3] = [13]
         ╱ ╲
        2   3    (the 5 is split)
```
- Child: splits the second addend so the first reaches ten, then adds the rest; the bond under the addend records the split.
- Settings: Range (to 20 / 100: 38 + 7) · Operation (+ / −) · Bond shown (on/off).
- Band G1–G2 · Point 1.OA.C.6 (making ten), 2.NBT.B.5.
- Reuse `number-bond.js` (the small bond under the addend, `blank:'a'|'b'`), three answer cells.
- Screen type-number ×3 · Locales 11 · Key: the split and the sum.
- Risks: a non-crossing pair → only crossing pairs generated; the split is unique.
- Evidence: topic seed; the strategy named in Lehrplan/Lgr22/programmes (see number-lines T3 — the two templates are the same strategy in two models, and the gallery says so).

**T3 · Bonds to 100 in tens, and to 20** — rank 3
```
   (100)          (20)
   ╱   ╲          ╱  ╲
  30   [70]      14  [6]
```
- Child: finds the missing part of 20 (ones) or of 100 (tens); level 3: compléments to 100 with any numbers (47 + 53).
- Settings: Whole (20 / 100) · Parts (tens only / any) · Missing (part / whole).
- Band G1–G2 · Point 1.OA.D.8, 2.NBT.B.5 (add/subtract within 100); fr "compléments à 10, 100 et 1000" (demand).
- Reuse `number-bond.js` with `whole: 100` (numerals only; `dots` off).
- Screen type-number · Locales 11 · Key: the part.
- Risks: none positional (bond geometry fixed); A1 no repeated pair on a page (`sameAs` on the pair).
- Evidence: "compléments à 10 100 et 1000" (fr), "number bonds to 20" (en), "tiokompisar"/"tiervenner" → "hundrakompisar" extension in sv classrooms.

**T4 · Hidden counters (how many under the cup?)** — rank 4
```
   7 in all       🐸🐸🐸   ╭───╮          Hidden: [ 4 ]
                           │ ? │
                           ╰───╯
```
- Child: the total is printed; some pictures show, the rest hide under a cup; writes the hidden part.
- Settings: Total (5 / 10 / 20) · Shown (1–total−1) · Pictures or dots.
- Band K–G1 · Point K.OA.A.4 (for any number 1–9 find the number that makes 10), 1.OA.D.8 (unknown addend).
- Reuse `iconRows` (`templates/components.js:10`); a drawn cup/hand cover (small SVG, no primitive needed — a rounded rect with a `?`); `answerBox`.
- Screen type-number · Locales 11 · Key: the hidden count (and the cup lifted).
- Risks: a tell from the cup's size → the cup is a fixed size regardless of the hidden count (gate 8 checks over `shown`).
- Evidence: the classroom "hiding game" (Lehrplan "Verliebte Zahlen", programmes "boîte cachée"); no deck models hidden quantity.

**T5 · Rainbow bonds — join the pairs that make N** — rank 5
```
   0   1   2   3   4   5   6   7   8   9   10
   ╰───────────────────────────────────────╯
       ╰───────────────────────────────╯   …  (child draws the arcs)
```
- Child: draws arcs joining the pairs that make N (0–10 in a row); level 3: N = 20 with numbers 0–20 shuffled.
- Settings: Whole (10 / 20) · Order (in order / shuffled) · Arcs given (none / one example).
- Band K–G1 · Point K.OA.A.4; it "arcobaleno degli amici del 10" (demand), sv "tiokompisar", da/no "tiervenner".
- Reuse the row of numerals + `primitives/syllable-arcs.js` arc geometry (arcs under a row — the same drawing), the pair screen of the matching family.
- Screen tap-order (tap a, tap b = one arc; the Family-E pairing precedent, CLAUDE.md §14.2) · Locales 11 · Key: the rainbow.
- Risks: the middle number (5 for 10) has no partner but itself → it is drawn with a loop in the key and the instruction names it (gate 10 reads it); shuffled order removes the symmetric tell.
- Evidence: "arcobaleno amici del 10" (it), "tiokompisar bildstöd" (sv), "tiervenner plakat" (da/no).

**T6 · Fact triangle cards to cut** — rank 6
```
      ╱ 9 ╲            flash cards: cover a corner, say the fact
     ╱ 4  5 ╲
```
- Teacher: prints fact triangles (part-part-whole) to cut; sets for +/− within 10/20 and (G3) ×/÷.
- Settings: Range (to 10 / 20) · Operation (+− / ×÷) · Cards per page (6 / 9).
- Band G1–G3 · Point 1.OA.B.3–4, 3.OA.B.6 (inverse relationships); the standard fact-fluency material.
- Reuse `primitives/frame-tree.js` triangle geometry (the fact-family house's sibling, per ENGINES #6 bundles); K-240 cut lines.
- Screen material · Locales 11 (× / : glyph from `types/_shared/notation.js:16-22`) · Key: none.
- Risks: a sv card must show `/`, never `÷` (notation table; the gate 15 `no-foreign-sign` of ENGINES Q1 covers it).
- Evidence: "fact families to 10 / fact family house" (en), "aufgabenfamilien klasse 2" (de), "familias de operaciones" (es).

### 7. Addition & Subtraction (`addition-subtraction`) — 8 new

**T1 · Facts drill page (the classic 60-fact sheet)** — rank 1
```
  3    7    5    9    2    8       …   10 columns × 6 rows, or horizontal rows
 +4   −2   +5   −6   +7   −3
 ──   ──   ──   ──   ──   ──
```
- Child: solves a dense page of facts (no pictures, no scaffold) — the timed-practice sheet teachers print weekly.
- Settings: Operation (+ / − / mixed) · Range (to 5 / 10 / 20) · Layout (vertical / horizontal) · Problems (30 / 48 / 60).
- Band G1–G2 · Point 1.OA.C.6, 2.OA.B.2 (fluency); de "Kopfrechnen bis 20", fr "calcul mental", nl "automatiseren".
- Reuse `types/_shared/column-arithmetic.js problemCard` with scaffold `none` (per ENGINES Q1) in `templates/layouts/card-grid.js`; A1 `sameAs (a,b)` so 3+4 and 4+3 may both appear but 3+4 never twice.
- Screen type-number (one cell per problem; the runtime pages 60 items) · Locales 11 · Key: all answers.
- Risks: 60 problems × range 20 has 420 ordered pairs → never short; range 5 has 36 → the count is capped with the §6.2 sentence ("36 different problems fit this range; showing 36").
- Evidence: topic seed ("teachers expect the classic 60-fact drill"); "mental math practice" (en), "kopfrechnen bis 20" (de), "calcul mental ce1" (fr), "hoofdrekenen" (nl), "huvudräkning arbetsblad" (sv), "hoderegning arbeidsark" (no).

**T2 · True or false equations** — rank 2
```
 5 + 3 = 8   ○ true  ○ false        6 = 2 + 3   ○ true ○ false
 4 + 4 = 7                          9 − 2 = 3 + 4
```
- Child: judges each equation; level 3 has the equal sign in the middle (9 − 2 = 3 + 4) and the sum on the left (8 = 5 + 3).
- Settings: Range (to 10 / 20 / 100) · Forms (a+b=c / c=a+b / a+b=c+d) · False by (±1 / ±2 / mixed).
- Band G1–G2 · Point 1.OA.D.7 (meaning of the equal sign; true/false equations — named verbatim in CCSS).
- Reuse the mental-math card (`lib/mental-math-screen.js` family) with a ✓/✗ chip pair (the D4 check-cross buttons of more-less).
- Screen tap-choice · Locales 11 · Key: ✓/✗ per row.
- Risks: a 50/50 tell → the true/false ratio is drawn per page and balanced by gate 8; "false by ±1" keeps every false one plausible.
- Evidence: 1.OA.D.7 is uncovered by any deck (COVERAGE.md G1 row covered by the `numbers-court` activity only); de "Gleichungen richtig oder falsch", nl "waar of niet waar".

**T3 · Write the whole number sentence from the picture** — rank 3
```
 🐢🐢🐢   🐢🐢        [ 3 ] + [ 2 ] = [ 5 ]
 🐦🐦🐦🐦🐦 (2 crossed)  [ 5 ] − [ 2 ] = [ 3 ]
```
- Child: writes all three numbers of the sentence the picture shows (G1-101/104 give the numbers and ask only the result).
- Settings: Operation (+ / − / mixed) · Range (to 5 / 10) · Operator shown (yes / child writes it too).
- Band K–G1 · Point K.OA.A.1 (represent addition and subtraction with equations), 1.OA.A.1.
- Reuse `types/_shared/picture-equation.js` with all slots blank (`answerBox` ×3).
- Screen type-number ×3 (operator as tap-choice when hidden) · Locales 11 · Key: the sentence.
- Risks: commutativity (2 + 3 vs 3 + 2 for two groups) → both orders accepted (`data-lcs-alts`, A4) for addition; subtraction order is fixed by the crossing.
- Evidence: "écrire l'opération", de "Rechengeschichte als Gleichung" are standard CP/Klasse-1 tasks; every K-1 curriculum asks to *write* the sentence.

**T4 · Three addends** — rank 4
```
  4 + 6 + 3 = [ 13 ]          2 + 5 + 8 = [ ]     (pairs that make ten underlined at level 1)
```
- Child: adds three numbers, grouping two that make ten where possible.
- Settings: Range (to 20 / 30) · Make-ten pair present (always / sometimes) · Pictures (on for G1-112-style groups).
- Band G1 · Point 1.OA.A.2 (word problems with three addends), 1.OA.B.3 (associative property).
- Reuse `picture-equation.js` (three groups, as `G1-112`) and the mental card for the numeral form.
- Screen type-number · Locales 11 · Key: the sum.
- Risks: none positional; A1 `sameAs` on the sorted triple.
- Evidence: topic seed; 1.OA.A.2 verbatim.

**T5 · Mental two-digit (tens and ones without columns)** — rank 5
```
 34 + 20 = [ ]      56 − 4 = [ ]      47 + 6 = [ ]  (with bridging, level 3)
```
- Child: adds/subtracts a multiple of ten or a one-digit number mentally; level 3 bridges the ten.
- Settings: Kind (tens / ones / mixed) · Bridging (never / sometimes / always) · Range (to 100 / 1000).
- Band G1–G2 · Point 1.NBT.C.4–6, 2.NBT.B.5; nl "hoofdrekenen tot 100 zonder brug" (demand), de "halbschriftlich".
- Reuse `lib/mental-math-screen.js` card (`G1-208` family).
- Screen type-number · Locales 11 · Key: the result.
- Risks: none; the bridging control is a 1:1 knob on the generator's carry test.
- Evidence: "hoofdrekenen tot 100 zonder brug / tot 1000" (nl), "kopfrechnen bis 1000" (de), "calcolo mentale classe seconda" (it), "cálculo mental segundo grado" (es).

**T6 · Error finding — mark the wrong answers** — rank 6
```
 7 + 5 = 12 ☐     9 − 4 = 6 ☐ ✗ → [5]     8 + 6 = 14 ☐
```
- Child: checks a worked page, marks the wrong answers and corrects them (checking as a strategy).
- Settings: Range (to 20 / 100) · Wrong answers per page (2 / 4 / 6) · Error kind (±1 / digit swap / wrong operation).
- Band G1–G3 · Point 1.OA.D.7 / 2.NBT.B.9 (explain why strategies work; check); Lehrplan "Rechenfehler finden", Lgr22 "rimlighetsbedömning".
- Reuse the mental card with a printed (sometimes wrong) answer + a ☐ and a correction box; `G3-383`'s find-the-error precedent (`types/g3/G3-383-division-with-remainder-find-the-error.js`).
- Screen tap-select (the wrong ones; the correction is printable + key) · Locales 11 · Key: marked rows with the right answers.
- Risks: a wrong answer that equals another correct fact (7+5=13, 13 is right for 7+6) is fine — the row is still wrong; every wrong answer stays within ±2 of the truth so the task is checking, not spotting absurdities.
- Evidence: topic seed; "find the error" is the one checking strategy in every national framework.

**T7 · Bar model (part–part–whole strip)** — rank 7
```
 ┌───────────────┬────────┐
 │       12      │  [ ]   │   = 20       20 − 12 = [ 8 ]
 └───────────────┴────────┘
```
- Child: reads a bar model with one missing part or the missing whole and writes the number sentence.
- Settings: Missing (part / whole / mixed) · Range (to 20 / 100) · Bars (one / comparison pair, level 3 "how many more").
- Band G1–G2 · Point 1.OA.A.1 (put together / take apart / compare with unknowns), 2.OA.A.1; the Singapore model used in nl/sv/en-US classrooms.
- Reuse: **NEW** `primitives/bar-model.js` (proportional segments, measured labels; pure SVG); `answerBox`.
- Screen type-number · Locales 11 · Key: the number + the sentence.
- Risks: a bar whose segment widths give the answer away → segment widths are proportional (honest) but the scale varies per card so a child cannot measure; gate 8 checks that the blank segment's width does not identify the answer among the page's cards.
- Evidence: the compare-problem gap (COVERAGE.md "how many more" is the hardest K-2 story type — word-problems seed); the model is the bridge between picture and equation.

**T8 · Missing digit in the column** — rank 8
```
   2 [ ]          5 7
 + 3  5         − [ ] 2
 ─────          ─────
   6  1           2  5
```
- Child: finds the missing digit of an addend/minuend from the completed column sum (reasoning backwards, ones first).
- Settings: Digits (2 / 3) · Missing (one digit / two) · Regrouping (none / some).
- Band G2–G3 · Point 2.NBT.B.5–7 (understand the written method), 3.NBT.A.2.
- Reuse `column-arithmetic.js` cells (`:55-103`) with one addend cell blank (`data-lcs-answer`) and the result printed; `lib/column-screen.js`.
- Screen type-number (the digit) · Locales 11 (the scaffold shape follows `data/column-method/methods.js`, ENGINES Q1) · Key: the digit.
- Risks: a missing digit with two solutions (a carry in or not) → the generator asserts uniqueness by brute force over 0–9 (gate 15 `unique-solution`).
- Evidence: "column addition and subtraction" (en), "schriftlich rechnen klasse 3" (de), "operazioni in colonna seconda elementare" (it 78), "continhas armadas" (pt): the column family's one reasoning face.

### 8. Doubles & Halves (`doubles-halves`) — 5 new

Narrow topic (one idea, ten faces already): five genuinely different tasks, no more.

**T1 · Near doubles (6 + 7 = 6 + 6 + 1)** — rank 1
```
 6 + 7 = 6 + 6 + [1] = [13]        8 + 9 = [ ] + [ ] + 1 = [ ]
```
- Child: rewrites a near-double as a double plus one and solves it.
- Settings: Range (to 20) · Form (double + 1 / double − 1 at level 3: 7 + 8 = 8 + 8 − 1).
- Band G1 · Point 1.OA.C.6 (doubles plus one); de "Nachbaraufgaben", programmes CP "presque-doubles".
- Reuse the doubles card of `G1-271` family (`lib/doubles-halves-screen.js`), `answerBox` ×2–3.
- Screen type-number · Locales 11 · Key: the double and the sum.
- Risks: none; A1 on the unordered pair.
- Evidence: topic seed; "what are doubles and near doubles" (en head term).

**T2 · Draw the double** — rank 2
```
 🐞🐞🐞   →   [ draw the same again ]     3 + 3 = [ 6 ]
```
- Child: draws the mirror group beside the given group and writes the double (production, not reading).
- Settings: Range (to 10 / 20) · Pictures or dots.
- Band K–G1 · Point K.OA.A.1 → 1.OA.C.6 (doubles as a mental image).
- Reuse `iconRows` + an empty dashed slot; `answerBox`.
- Screen type-number (the double) · Locales 11 · Key: the number (the drawing is open).
- Risks: none graded on the drawing.
- Evidence: "verdoppeln und halbieren klasse 1" (de, with pictures), "dobro e metade educação infantil" (pt).

**T3 · Is it a double? (circle the numbers you can halve)** — rank 3
```
  6   9   14   7   20   11   →  circle the ones that are a double
```
- Child: decides which numbers are doubles (even) and writes the half for those.
- Settings: Range (to 20 / 50) · Write the half (on/off).
- Band G1–G2 · Point 1.OA.C.6, 2.OA.C.3 (even = two equal addends).
- Reuse the chip row; `tap-select`.
- Screen tap-select (+ type-number for halves) · Locales 11 · Key: the circled set.
- Risks: half the chips are doubles by construction → the ratio varies 40–60 % per page (gate 8).
- Evidence: the halves faces refuse odd numbers (ENGINES #8 risk) — this template makes that refusal the task.

**T4 · Double machine / half machine (in → out, both ways)** — rank 4
```
   in  │ out          in │ out
    4  │ [8]          [ ]│ 10        rule: ×2 (double) / ÷2 (half)
    7  │ [ ]           6 │ [ ]
```
- Child: fills an input–output table for a fixed double or half rule, including inputs from outputs (inverse).
- Settings: Rule (double / half / both tables) · Range (to 20 / 100) · Missing (outputs / inputs / mixed).
- Band G1–G2 · Point 1.OA.B.4 (subtraction as unknown addend → halving as unknown factor), Lgr22 "dubbelt och hälften" (demand).
- Reuse the machine table layout of `G3-328` (`types/g3/G3-328-input-output-table.js`) with a fixed rule.
- Screen type-number · Locales 11 · Key: the table.
- Risks: the half machine with an odd input → inputs are even by construction; de "verdoppeln und halbieren bis 100" is the range control.
- Evidence: "verdoppeln und halbieren bis 100 / zahlenraum 100" (de 44, report), "dubbelt och hälften arbetsblad" (sv), "verdubbelen en halveren groep 4" (nl).

**T5 · Doubles memory cards to cut (6 ↔ 12)** — rank 5
```
 ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │ 6  │ │ 12 │ │ 4  │ │ 8  │   pairs: a number and its double
```
- Teacher: cuts the cards; children pair a number with its double (memory or snap).
- Settings: Range (to 20 / 40) · Pictures on the number cards (on/off).
- Band G1 · Point 1.OA.C.6 fluency; material.
- Reuse K-240 cut lines; `iconRows` for picture cards.
- Screen material · Locales 11 · Key: none (pairs listed on page 2).
- Risks: a card value that is both a double and a half of another on the same page (4 ↔ 8 ↔ 16) → the set is built so each number appears in exactly one pair.
- Evidence: "doubles and halves game" (en), "dubbelt och hälften spel" (sv), "dobro e metade jogo"-class (pt).

### 9. Compare Numbers & Groups (`compare-numbers`) — 5 new

**T1 · Crocodile mouth (< >)** — rank 1
```
  7  🐊<  9        14  >🐊  8       (the mouth opens to the bigger number)
```
- Child: draws / chooses the mouth that eats the bigger number; level 3 writes the symbol.
- Settings: Range (to 10 / 100 / 1000) · Mouth drawn (yes / symbol only at level 3) · Pictures under numbers (K).
- Band K–G2 · Point K.CC.C.7, 1.NBT.B.3, 2.NBT.A.4; the K-1 hook in every locale (de "Krokodil", fr "le crocodile", nl "de krokodil").
- Reuse: **NEW** `primitives/compare-mouth.js` (a `<`/`>` glyph with teeth and an eye, mirrored; language-free); `types/_shared/compare-order.js`.
- Screen tap-choice (left/right mouth / =) · Locales 11 · Key: the symbol.
- Risks: "the bigger is always on the right" tell → sides drawn from the rng and balanced (gate 8, the ENGINES #9 risk).
- Evidence: topic seed; the mouth is the universal K hook (the sv "mattelandet", de Zahlenland registers name it).

**T2 · Compare expressions (3 + 4 ○ 5 + 1)** — rank 2
```
 3 + 4  ○  5 + 1        10 − 2  ○  4 + 4        write < > =
```
- Child: evaluates both sides and writes the symbol; the equality case appears so "=" is a real option.
- Settings: Range (to 10 / 20 / 100) · Operations (+ / − / mixed) · Equal cases (some / none).
- Band G1–G2 · Point 1.OA.D.7 (the equal sign), 2.NBT.A.4; the step to equality thinking.
- Reuse `compare-order.js` + the mental card expressions.
- Screen tap-choice (< = >) · Locales 11 · Key: the symbol.
- Risks: a child compares the first numbers only (3 vs 5) → the generator makes the first-number comparison disagree with the truth on ≥ 40 % of the cards (a measured anti-shortcut; gate 8 reports the share).
- Evidence: topic seed; 1.OA.D.7 verbatim ("5 + 2 = 2 + 5").

**T3 · Make it true (open middle)** — rank 3
```
 24  <  [ ]  <  30          [ ]  >  58          write a number that fits
```
- Child: writes any number that makes the statement true (an accepted set, not one answer).
- Settings: Range (to 20 / 100 / 1000) · Gap width (small / wide) · Two bounds / one bound.
- Band G1–G2 · Point 1.NBT.B.3, 2.NBT.A.4 (reasoning about the number line, not matching); Lgr22 "resonemang".
- Reuse `compare-order.js`; the accepted set is the integer interval (`data-lcs-alts` as a range — a small runtime extension of the ALT list, A4).
- Screen type-number (accepted if inside the interval) · Locales 11 · Key: one example + the interval in words ("any number from 25 to 29").
- Risks: an empty interval (24 < □ < 25) → the generator asserts ≥ 1 integer; the key states the whole set so a teacher never marks a right answer wrong.
- Evidence: the "open middle" task type in nl/sv/fi classrooms (OPS 2014 "ongelmanratkaisu"); no deck offers a many-answer task.

**T4 · Build the biggest / smallest number from digit cards** — rank 4
```
  digits  [3] [7] [1]      biggest: [ 7 3 1 ]     smallest: [ 1 3 7 ]
```
- Child: arranges three (two / four) digit cards to make the greatest and the least number.
- Settings: Digits (2 / 3 / 4) · Zero allowed (no / yes — the leading-zero trap at level 3) · Ask (biggest / smallest / both).
- Band G1–G3 · Point 2.NBT.A.1, A.4 (place value decides order); de "Stellenwert", es "valor posicional".
- Reuse `answerBox` cells; the digit cards as chips (`chipRow`).
- Screen type-number · Locales 11 · Key: both numbers.
- Risks: duplicate digits make two arrangements equal → digits distinct unless level 3 chooses otherwise (then alts accepted).
- Evidence: a staple of G2 textbooks in every locale ("Zahlen legen", "forme le plus grand nombre"); COVERAGE.md G2 "compare and order" is covered by activities only.

**T5 · Which place decides? (compare from the left)** — rank 5
```
   4 6 2        4 7 1       circle the first digit that differs → [ 6 ] < [ 7 ]   so 462 < 471
```
- Child: circles the first place from the left where the two numbers differ and writes the symbol — the algorithm of 2.NBT.A.4 made visible.
- Settings: Digits (2 / 3 / 4) · Same leading digits (always / sometimes).
- Band G2–G3 · Point 2.NBT.A.4 (compare using meanings of the hundreds, tens and ones digits), 4.NBT.A.2 prep.
- Reuse `compare-order.js` with a place-value chart layout (the `G2-224` chart, per ENGINES #11).
- Screen tap-select (the deciding digit pair) + tap-choice (symbol) · Locales 11 · Key: the circled place + symbol.
- Risks: when the leading digits differ the task collapses to "compare the first digit" → "same leading digits: always" at level 2–3.
- Evidence: "comparing numbers … place value" is the explicit CCSS mechanism; de "Zahlen vergleichen Stellenwert".

### 10. Odd & Even (`odd-even`) — 4 new

Narrow topic (one concept; six faces cover pairing, two equal addends, the ones digit and sums). The odd/even **maze** belongs to the mazes maker (rule mazes, `lib/hm-rules.js`) and is listed there; it appears here as a cross-link card only.

**T1 · Odd/even stripes on the hundreds chart** — rank 1
```
 1  [2] 3  [4] 5  [6] …     colour every even number → stripes appear
```
- Child: colours all even (or odd) numbers on a 1–100 chart; the column pattern emerges and is named in the follow-up question ("which digits end the coloured numbers?").
- Settings: Colour (even / odd) · Range (1–50 / 1–100) · Follow-up question (on/off).
- Band G1–G2 · Point 2.OA.C.3 (even/odd via the ones digit); Lehrplan "Muster in der Hundertertafel".
- Reuse `hundreds-chart.js highlights` (key), `tap-paint` cells, `data/b4/odd-and-even.js` strings.
- Screen tap-paint · Locales 11 · Key: the striped chart.
- Risks: none positional (the pattern IS the answer); 50 taps on a phone → the screen offers a "colour the whole column" long-press (runtime: a `tap-paint` fill-column option, small).
- Evidence: "gerade und ungerade zahlen pikas / starke päckchen" (de), "números pares e impares del 1 al 100" (es), "números pares e ímpares de 1 100" (pt), "numeri pari e dispari tabella" (it).

**T2 · Discover the rule (odd + odd = ?)** — rank 2
```
 3 + 5 = [8]  even     7 + 9 = [ ]  ___     1 + 3 = [ ]  ___
 Tick the rule:  ○ odd + odd = odd    ○ odd + odd = even
```
- Child: works three examples of one parity combination, then ticks the rule; four blocks (o+o, e+e, o+e, e+o).
- Settings: Range (to 20 / 100) · Blocks (2 / 4).
- Band G2–G3 · Point 2.OA.C.3 → 3.OA.D.9 (arithmetic patterns, explain with properties); it "numeri pari e dispari classe terza".
- Reuse the mental card + chip pair; `G3-386`'s parity table as the key.
- Screen type-number + tap-choice · Locales 11 · Key: sums + the rule.
- Risks: the rule chip order → balanced per block (gate 8).
- Evidence: G3-386 *applies* the rule; nothing lets the child *find* it (the inquiry step every framework names: Lgr22 "upptäcka mönster").

**T3 · Odd/even card sort to cut and paste** — rank 3
```
 ┌──────── odd ────────┐  ┌──────── even ───────┐
 │                     │  │                     │
 └─────────────────────┘  └─────────────────────┘
 ✂  [13] [8] [21] [6] [17] [30] [9] [12]
```
- Child: cuts the number cards and glues each into the odd or even house.
- Settings: Range (to 20 / 100) · Cards (8 / 12) · Pictures on K cards (dots in pairs).
- Band G1–G2 · Point 2.OA.C.3; hands-on version of G1-351.
- Reuse `types/_shared/sort-to-bins.js` cut-and-paste layout (`K-240`, per ENGINES #24), `primitives/bin.js` or the house frames of `G1-351`.
- Screen tap-select strict (A14) · Locales 11 · Key: the two filled houses.
- Risks: a 50/50 split tell → the split varies 3/5 … 5/3 per page.
- Evidence: "lige og ulige tal 1 klasse" (da), "even en oneven getallen groep 3" (nl), "udda och jämna tal förskoleklass" (sv) — all ask for the hands-on sort.

**T4 · Odd or even — read the number word** — rank 4
```
 fünfzehn   ○ gerade  ○ ungerade        zwölf   ○ gerade  ○ ungerade
```
- Child: reads a number word, decides odd/even (reading + parity in one step; the numeral is on the key only).
- Settings: Range (to 20 / 100) · Show the numeral as a hint (level 1 on).
- Band G1–G2 · Point 2.OA.C.3 + the national number-word lists (number-of-the-day family).
- Reuse `lib/number-words.js` (0..100 ×11), the ✓/✗ chip pair.
- Screen tap-choice · Locales 11 (a locale whose 1000-table is not signed still has 0..100) · Key: odd/even per word.
- Risks: nl "één" override (G1-210 precedent); the word length is no tell (checked by gate 8 over the range).
- Evidence: cross-strand pages ("Zahlwörter + gerade/ungerade") are a Klasse-2 staple; demand "zahlwörter bis 100" (de).

### 11. Place Value & Rounding (`place-value`) — 5 new

**T1 · Expanded form both ways** — rank 1
```
 300 + 40 + 5 = [ 345 ]          [ 600 ] + [ 20 ] + [ 8 ] = 628
```
- Child: composes a number from its expanded form and decomposes a number into hundreds, tens, ones (G2-223/133 only *match* a printed expansion).
- Settings: Digits (2 / 3 / 4) · Direction (compose / decompose / mixed) · Zero place (never / sometimes: 405 = 400 + 5).
- Band G1–G3 · Point 1.NBT.B.2, 2.NBT.A.3 (expanded form), 4.NBT.A.2 prep; de "Stellenwerttafel", pt "decomposição de números" (demand 43).
- Reuse `types/_shared/base-ten-tasks.js`, `answerBox` cells; the words form ("3 Hunderter 4 Zehner 5 Einer") from the G2-224 strings per ENGINES #11.
- Screen type-number (per cell) · Locales 11 · Key: the sentence.
- Risks: the zero place (405 = 400 + 0 + 5 vs 400 + 5) → both forms accepted (`alts`); the thousands cube art is a new `base-ten.js` case only for the blocks face (not needed here).
- Evidence: topic seed; "descomposición de números" (es 35/32, report), "decomposição de números 2 ano" (pt), "zahlzerlegung … stellenwert", "number bonds blank" (en).

**T2 · Place-value chart with digit cards to cut** — rank 2
```
 ┌───┬───┬───┐      ✂ [0][1][2][3][4][5][6][7][8][9] ×2
 │ H │ T │ O │      Teacher says a number; child builds it in the chart
```
- Teacher/child: a laminated H-T-O (locale labels) chart and two digit-card sets; build the number read aloud; record it on the lines below.
- Settings: Places (2 / 3 / 4) · Record lines (0 / 6) · Digit model per locale (automatic, `FORM_BY_LOCALE`).
- Band G1–G3 · Point 1.NBT.B.2, 2.NBT.A.1; material.
- Reuse `G2-224` chart (`primitives/base-ten.js` labels per locale, ENGINES #11), K-240 cut lines, `digit-strokes.js FORM_BY_LOCALE` for the digit glyph shapes.
- Screen material · Locales 11 (place labels ×11 exist in the G2-224 strings) · Key: none.
- Risks: en-US "Hundreds Tens Ones" vs de "H Z E" vs fr "c d u" → the labels are the locale's school abbreviations, authored in the G2-224 strings (gate 10 reads them).
- Evidence: topic seed; "stellenwerttafel" (de head), "tableau des nombres unité dizaine centaine" (fr), "valor posicional" (es).

**T3 · How many tens? (rename the number)** — rank 3
```
 340 = [ 34 ] tens          26 tens = [ 260 ]          1,200 = [ 12 ] hundreds
```
- Child: renames a number by its tens (or hundreds) — the "count the tens" view that grounds ×10 and the column method.
- Settings: Unit (tens / hundreds) · Range (to 100 / 1000 / 10000) · Direction (both).
- Band G2–G3 · Point 2.NBT.A.1a ("100 can be thought of as a bundle of ten tens"), 3.NBT.A.3 (multiply by multiples of 10).
- Reuse `base-ten-tasks.js` + `answerBox`; blocks optional (`baseTenBlocks({h, t, o})`, `base-ten.js:3`).
- Screen type-number · Locales 11 · Key: the renaming.
- Risks: the plural of the unit word in 11 locales ("tens" / "Zehner" / "dizaines" / "tientallen") → strings ×11 (2 words), native-checked.
- Evidence: "how many tens" is the CCSS 1.NBT.B.2/2.NBT.A.1 wording; "zehnerbündel" (de), "bundles of ten" (G1-122 counts rods only to 100).

**T4 · Non-standard blocks (12 tens and 5 ones = ?)** — rank 4
```
 ▮▮▮▮▮▮▮▮▮▮▮▮ (12 rods)  ▪▪▪▪▪ (5 units)     = [ 125 ]
```
- Child: reads a block picture with more than nine of a kind and writes the number (regrouping in reading, the step before carrying).
- Settings: Overflow (tens / ones / both) · Range (to 200 / 1000).
- Band G2 · Point 2.NBT.A.1, 2.NBT.B.7 (compose a hundred from ten tens); de "Bündeln", nl "inwisselen".
- Reuse `baseTenBlocks` with `t > 9` or `o > 9` (the primitive wraps columns, `base-ten.js:3-4`), `answerBox`.
- Screen type-number · Locales 11 · Key: the number (+ the regrouped standard picture).
- Risks: 15 ones at `unit=13` overflow the card → the fit step lowers `unit`; the count of rods stays legible (collision gate 14).
- Evidence: the regrouping trap of G2-206 (bundle ten ones) extended to tens; "schriftlich rechnen" prerequisites (de), "continhas armadas" (pt).

**T5 · Who am I? place-value riddles** — rank 5
```
 I have 4 tens. My ones digit is 2 more than my tens digit.   I am [ 46 ].
```
- Child: reads 2–3 clues and writes the one number they fit.
- Settings: Digits (2 / 3) · Clues (2 / 3) · Range.
- Band G2–G3 · Point 2.NBT.A.1, 2.NBT.A.3 (use place-value language to reason); de "Zahlenrätsel", fr "devinettes de nombres".
- Reuse the clue frames **NEW** `data/place-value/riddles.<loc>.json` (~8 frames ×11: "I have {n} tens", "my ones digit is {k} more than my tens digit", "I am between {a} and {b}", "I am even/odd" — native-authored; numbers from `lib/number-words.js` where a frame wants words); a solver asserts exactly one number satisfies the clue set (gate 15 `unique-solution`, the sudoku `countSolutions` pattern per ENGINES [logic-puzzles-Q1]).
- Screen type-number · Locales 11 once the 8 frames are signed (refused per locale until then) · Key: the number.
- Risks: two numbers satisfy the clues → the solver rejects the set and redraws; a clue the native panel cannot phrase (fi case endings on numerals) → that frame is absent in that locale, never approximated (the A6 refusal rule).
- Evidence: "logicals grundschule" (de 37), "zahlenrätsel"; the riddle form is a Klasse-2 staple; BNCC "Números" reasoning rows.

### 12. Fractions (`fractions`) — 5 new

**T1 · Fraction wall / strips to cut** — rank 1
```
 │              1              │
 │      1/2     │     1/2      │
 │  1/3   │  1/3   │   1/3    │
 │ 1/4 │ 1/4 │ 1/4 │ 1/4     │  …  1/6, 1/8
```
- Child: cuts the strips and compares/lines up fractions; level 3 keeps the labels off (the child writes them).
- Settings: Denominators (2 3 4 6 8, multi-select) · Labels (on / off) · Colour bands (on / off, one hue per row).
- Band G2–G3 · Point 3.NF.A.3 (equivalence, compare), 2.G.A.3; material in every curriculum ("Bruchstreifen", "bandes de fractions", "fraction strips").
- Reuse `primitives/fraction.js` (`shape:'bar'`, `fraction.js:3`) at full width; K-240 cut lines.
- Screen material · Locales 11 · Key: none (labels page).
- Risks: the strips must be exactly equal in length → one `width` for every row (B5); the §A.13.60 exact-equal-area rule holds for bars by construction.
- Evidence: topic seed; "fractions chart" (en), "brüche" (de head), "frações equivalentes" (pt), "breuken leren groep 6" (nl).

**T2 · Partition it yourself (draw the equal parts)** — rank 2
```
 ┌──────────┐      ○        ┌──────────┐
 │          │               │          │    cut into: halves · thirds · fourths
 └──────────┘               └──────────┘
```
- Child: draws the lines that cut each shape into N equal parts (production; G2-232/234 only recognise equal parts).
- Settings: Parts (2 / 3 / 4 / 6) · Shapes (rectangle / square / circle; triangle and hexagon for thirds/sixths) · Shade one part after (on/off).
- Band G1–G2 · Point 1.G.A.3, 2.G.A.3 (partition circles and rectangles into equal shares); SLO "breuken: verdelen in gelijke delen".
- Reuse `fraction.js` outlines (`d: 1`); the key draws the partition — only shapes with an exact equal-area construction for N are offered (the §A.13.60 rule: circle/triangle/hexagon/square/rect for thirds).
- Screen printable (drawing; the gallery says so) · Locales 11 · Key: one valid partition per shape (the key says "or any other equal cut").
- Risks: several correct partitions (a square into halves by a diagonal or a midline) → the key states this; nothing is graded on screen.
- Evidence: 1.G.A.3 verbatim ("partition … into two and four equal shares"); "fair shares?" (G2-232) recognises — the drawing face is the production.

**T3 · Colour a fraction of the set (any 4 of 12)** — rank 3
```
 ○○○○○○○○○○○○      colour 1/3 of the circles   →  [ 4 ] circles
```
- Child: colours the fraction of a set and writes how many that is; any choice of the right number is correct.
- Settings: Fractions (1/2 1/3 1/4 2/3 3/4) · Set size (6–24, divisible by construction) · Pictures or circles.
- Band G2–G3 · Point 3.NF.A.1 → the "fraction of a quantity" step (Lgr22 "del av antal", de "Bruchteil einer Menge", COVERAGE.md G2 row "fraction of a set" = activity gap).
- Reuse `iconRows`; count-based grading (`tap-paint` accepts exactly k painted items, any positions, A4).
- Screen tap-paint + type-number · Locales 11 · Key: one example colouring + the number.
- Risks: a set size not divisible by the denominator → the generator draws divisible sizes only; the number word of the fraction is a glyph, not text.
- Evidence: G2-233/G3-320 circle the fraction of pictures but choose from given rings; "fracciones … para niños" (es), "frações 4 ano" (pt).

**T4 · Shaded and unshaded — the two fractions of one shape** — rank 4
```
 ▮▮▮▯    shaded: [3]/[4]    not shaded: [1]/[4]    together: [4]/[4] = 1
```
- Child: writes the fraction shaded AND the fraction not shaded, then the whole (parts of a whole sum to 1).
- Settings: Denominators (2 3 4 6 8) · Shape (bar / circle / square) · Ask the whole (on/off).
- Band G3 · Point 3.NF.A.1, 3.NF.A.3c (whole numbers as fractions: 4/4 = 1).
- Reuse `fraction.js` (`shaded`), stacked numerator/denominator cells.
- Screen type-number (numerators; denominators pre-printed at level 1) · Locales 11 · Key: both fractions.
- Risks: none positional; A1 on (d, shaded).
- Evidence: "name that fraction" (G3-315) asks one fraction; the complement is the reasoning step textbooks pair with it (de "Restbruch").

**T5 · Fraction words ↔ pictures** — rank 5
```
 [▮▯]  ─── one half        [▮▮▯]  ─── two thirds        [▮▯▯▯]  ─── one quarter
```
- Child: draws lines from fraction words to the pictures (and to the symbols at level 3) — the language of fractions, gendered in Romance locales.
- Settings: Denominators (2 3 4) · Match (word ↔ picture / word ↔ symbol ↔ picture) · Pairs (4 / 6).
- Band G1–G3 · Point 1.G.A.3 ("halves, fourths, quarters" — the words are the standard), 2.G.A.3 ("thirds").
- Reuse `fraction.js`, the matching pair screen; **NEW** `data/fractions/words.<loc>.json` (~8 strings ×11: half/halves, third(s), quarter(s)/fourth(s), sixth(s) — gender/number per locale: fr "un demi / une moitié / un tiers / un quart", es "un medio / la mitad / un tercio / un cuarto", pt "um meio / metade / um terço / um quarto", it "un mezzo / la metà / un terzo / un quarto", de "ein Halb / Hälfte / Drittel / Viertel", nl "de helft / een derde / een kwart", sv "en halv / en tredjedel / en fjärdedel", da "en halv / en tredjedel / en fjerdedel", no "en halv / en tredel / en firedel", fi "puolikas / kolmasosa / neljäsosa") — native-signed, the "en-US quarter vs fourth" convention set by the panel.
- Screen tap-order pairs · Locales 11 after the 8 strings are signed · Key: the lines.
- Risks: "half" vs "halves" number → the picture decides (one shaded half → singular); the panel owns the register (en-US: "fourths" in CCSS, "quarter" in daily speech → both printed where the panel says).
- Evidence: 1.G.A.3 names the words explicitly; demand "breuken uitleg" (nl), "fractions ce1" (fr).

### 13. Multiplication & Division (`multiplication-division`) — 7 new

**T1 · Multiplication square to fill** — rank 1
```
  × │ 1  2  3  4  5  6  7  8  9 10
 ───┼──────────────────────────────
  1 │ 1  2  3  …
  2 │ 2  [ ] 6 …
```
- Child: fills a 10×10 (or 5×5, or one table's row/column) multiplication grid; level 3 gives only the headers.
- Settings: Size (5 / 10 / 12) · Given (most / diagonal / headers only) · Tables (chips; the others greyed in the key).
- Band G2–G3 · Point 3.OA.C.7 (fluency), 3.OA.B.5 (commutativity visible in the symmetry); de "Einmaleins-Tafel", pt "tabuada completa", it "tabelline formato a4".
- Reuse `hundreds-chart.js` cell engine with header row/column (an additive `headers` option) or a 12-line SVG grid; `lib/times-tables-screen.js` takes the `glyph` (per ENGINES Q1).
- Screen type-number · Locales 11 (the × / · glyph from `notation.js:16-22` in the corner) · Key: the full square.
- Risks: 100 cells on a phone → paged items; sv prints `·` (never ×), the `no-foreign-sign` gate.
- Evidence: topic seed; "kleines einmaleins tabelle" (de), "tabuada completa / tabuada grande" (pt), "tablas de multiplicar del 1 al 10" (es), "tabelline 1 10" (it), "gangetabellen fyll inn" (no), "multiplication table" (en).

**T2 · Division facts drill (the locale's sign)** — rank 2
```
 24 : 6 = [ ]     35 : 5 = [ ]     en: 24 ÷ 6   sv: 24 / 6
```
- Child: solves a page of division facts (the × drill's mirror; only ÷ pages are missing today, ENGINES #13).
- Settings: Tables (chips 2–10) · Problems (20 / 40 / 60) · Layout (rows / columns).
- Band G3 · Point 3.OA.C.7; de "Einsdurcheins" (demand "kleines einmaleins und einsdurcheins").
- Reuse `G3-358`'s card with `divGlyph(locale)` (`types/_shared/notation.js`), `lib/times-tables-screen.js glyph`.
- Screen type-number · Locales 11 · Key: quotients.
- Risks: the glyph gate; A1 on (dividend, divisor).
- Evidence: topic seed; "kleines einmaleins division / mal und geteilt" (de), "division" head terms (sv "uppställning division" is written division — out of scope, see §"For the operator" long division).

**T3 · Table of the day (one table, five ways)** — rank 3
```
 ┌ 6 × 4 ────────────────────────────────┐
 │ 🍎🍎🍎🍎 ×6 groups   │ array 6×4      │
 │ 4, 8, 12, [ ], …      │ 6×4=[ ] 4×6=[ ]│
 │ 24 : 4 = [ ]  24 : 6 = [ ] │ story: __ │
 └───────────────────────────────────────┘
```
- Child: works one fact in five representations on one page (equal groups, array, skip strip, both products, both quotients) — the number-of-the-day format for a fact.
- Settings: Fact (table chip + factor, or random) · Boxes (groups / array / strip / facts / story line).
- Band G2–G3 · Point 3.OA.A.1–2, 3.OA.B.5–6 (one fact, all its meanings).
- Reuse `types/_shared/array-tasks.js` (array + groups), `number-strip.js` (skip strip), `lib/fact-families-screen.js` cells.
- Screen type-number (every numeric box) · Locales 11 · Key: the page.
- Risks: layout budget (5 boxes) → measured stack ≤ 740 at the tallest chrome (the b7 fill rule); the `data-lcs-groups` stamp (ENGINES Q1) marks which factor is the group count so the instruction reads right in de/pt/es.
- Evidence: the "number of the day" demand everywhere (de "zahl des tages", fr "le nombre du jour") transferred to a fact; "tabuada do 7 / do 6" (pt) single-table searches.

**T4 · Draw the array** — rank 4
```
 3 × 5        · · · · · · ·
              · · · · · · ·      colour a 3-by-5 rectangle of dots
              · · · · · · ·
```
- Child: colours/marks a rectangle of dots for a given product on a dot grid (production; G2-212 picks a drawn array).
- Settings: Range (tables 2–5 / 2–10) · Grid (6×6 / 10×10) · Ask the total too (on/off).
- Band G2–G3 · Point 2.OA.C.4 (arrays up to 5×5), 3.OA.A.1.
- Reuse the dot grid of `primitives/coord-grid.js` cells (or `grid-copy.js` target grid); verifier: the painted set is a filled rectangle with the two side lengths equal to the factors in either orientation (A4: 3×5 and 5×3 both accepted).
- Screen tap-paint (rectangle check) · Locales 11 · Key: one array.
- Risks: a child colours 15 dots that are not a rectangle → "fill" phase lets her fix it; Check grades the shape (D1 deferred feedback).
- Evidence: "how to do multiplication arrays" (en head), "schieramenti" (it), "keersommen" (nl); the production face is in every G2 book.

**T5 · Strategy chains (double, double again; half of ×10)** — rank 5
```
 6 × 4 = 6 × 2 × 2 = [12] × 2 = [24]        7 × 5 = half of 7 × 10 = half of [70] = [35]
```
- Child: fills a two-step strategy chain for the harder tables (×4 = double ×2; ×8 = double ×4; ×5 = half of ×10; ×9 = ×10 − one group).
- Settings: Strategy (×4 / ×8 / ×5 / ×9 / mixed) · Range.
- Band G3 · Point 3.OA.B.5 (properties as strategies), 3.OA.D.9; Lgr22 "räknestrategier", programmes CE2 "procédures".
- Reuse the mental card with chained `answerBox` cells.
- Screen type-number · Locales 11 · Key: the chain.
- Risks: a child who knows the fact writes the end without the chain → every cell is an answer; the first cell is graded too.
- Evidence: "times tables tips / strategies" (en), "tabelline metodo bortolato" (it), "tafels … automatiseren" (nl) — strategy demand around the tables.

**T6 · Fact triangle cards ×/÷ to cut** — rank 6
- As number-bonds T6 with `×` on top: cover a corner, say the fact; sets per table. Reuse `frame-tree.js`, `notation.js` glyphs; material; Locales 11; Risks: sv `/`. Evidence: "fact families multiplication and division" (en), "aufgabenfamilien mal und geteilt" (de).

**T7 · Keyring table cards (tablas en llavero)** — rank 7
```
 ○ ┌───────────┐  ○ ┌───────────┐     one table per card, hole for a ring
   │  7 × 1 = 7 │    │  8 × 1 = 8 │
   │  7 × 2 = 14│    │  …         │
```
- Teacher: prints the ten tables as small cards with a punch mark; children keep them on a ring (the es-MX "llavero" demand); blank-answer version for self-test.
- Settings: Tables (chips) · Answers (shown / blank) · Cards per page (6 / 8).
- Band G3 · Point 3.OA.C.7; material.
- Reuse the times-table card; K-240 cut lines; a punch circle.
- Screen material · Locales 11 · Key: none (or the answers side).
- Risks: none; glyph gate.
- Evidence: "tablas de multiplicar en llavero / formato llavero" (es 45, report), "tabuada jogo" (pt), "tabelline it" cards (it).

## B2 — measure & shapes

### 14. Money (`money`) — 6 new

**T1 · Make the amount — pay exactly** — rank 1
```
 Price: 47¢      tray: ⓵⓵⓵⓵⓵ ⑤⑤⑤ ⑩⑩⑩ ㉕㉕      circle the coins you pay with
```
- Child: circles coins from a tray that add up to the price (any correct combination accepted); level 3: draws the coins.
- Settings: Up to (1 unit / 5 / 20 whole units) · Coins / coins + notes · Tray size (8 / 12).
- Band G1–G2 · Point 2.MD.C.8 (solve problems with coins and bills); de "Geldbeträge legen", nl "gepast betalen", pt "sistema monetário cédulas e moedas" (demand).
- Reuse `primitives/coins.js` tokens (`coins.js:2-5`, never replicas — money-Q1), `data/money/currencies.js` sets (`:32-44`), the new `lib/money-format.js` (ENGINES Q1) for the price; verifier sums the selected values.
- Screen tap-select (any subset whose sum = price is right — count/sum grading, A4) · Locales 11 · Key: one combination + "or any coins that make 47¢".
- Risks: the tray must always contain ≥ 1 solution → tray built from a solution + decoys; a decoy set that forms a second solution is fine (accepted).
- Evidence: topic seed; "rechnen mit geld klasse 2" (de), "compter la monnaie ce1" (fr), "rekenen met geld groep 4" (nl), "sistema monetário 2 ano" (pt).

**T2 · Fewest coins** — rank 2
```
 63¢  →  ㉕ [2]  ⑩ [1]  ⑤ [0]  ⓵ [3]      (how many of each, using as few as you can)
```
- Child: writes how many of each coin make the amount with the fewest coins (greedy works for every one of the 11 coin sets, asserted by the generator).
- Settings: Up to (1 unit / 5 units) · Coins shown as pictures or as a value table.
- Band G2 · Point 2.MD.C.8; efficiency strategy.
- Reuse `coins.js`, `currencies.js`; the greedy check + a brute-force minimum (gate: greedy = minimum for the set, poison-tested with a non-canonical set).
- Screen type-number per coin · Locales 11 · Key: the counts.
- Risks: a coin set where greedy fails (none of ours: en ¢1/5/10/25, MXN 1/2/5/10, BRL 5/10/25/50, €, kr are canonical) → the gate still runs per locale.
- Evidence: topic seed; "counting money easy / counting money practice" (en), "rechnen mit geld klasse 3" (de).

**T3 · Which coin is it? (name and value)** — rank 3
```
 ⑩  ──── ten cents        ⑤  ──── five cents      ㉕ ──── twenty-five cents
```
- Child: matches coins to their value words / values (the first money skill, before counting).
- Settings: Coins (subset chips) · Match (coin ↔ value numeral / coin ↔ value word) · Pairs (4 / 6).
- Band K–G1 · Point 1.MD (money readiness; 2.MD.C.8 names the coins); Lehrplan "Münzen kennen", SEP 1° "monedas".
- Reuse `coins.js`, `lib/money-format.js` for the printed value; value words from `lib/number-words.js` + the unit word ×11 (cent/Cent/centime/centavo…; strings ×11, ~3 each).
- Screen tap-order pairs · Locales 11 · Key: the lines.
- Risks: tokens differ by size + ring only (`coins.js:4-5`) → never two coins of near size on one page (the set's own sizes are distinct by design).
- Evidence: "counting money for kids" (en), "rechnen mit geld klasse 1" (de), "sistema monetário educação infantil / 1 ano" (pt), "compter la monnaie cp" (fr).

**T4 · Same amount, different coins** — rank 4
```
 purse A: ㉕ ⑩ ⑤      purse B: ⑩ ⑩ ⑩ ⑤ ⑤     purse C: ㉕ ⑩ ⓵     → draw lines between equal purses
```
- Child: matches purses that hold the same amount (equivalence, 2.MD.C.8), or writes = / ≠ between two purses.
- Settings: Up to (1 unit / 5) · Purses (4 / 6) · Task (match pairs / = ≠).
- Band G1–G2 · Point 2.MD.C.8; pt BNCC EF02MA20 ("equivalência de valores entre moedas"), de "Geld wechseln".
- Reuse `coins.js`, the purse of `G1-211` family, `lib/money-screen.js`, the pair screen.
- Screen tap-order pairs / tap-choice · Locales 11 · Key: the pairs.
- Risks: two purses equal by coin count too (a tell) → coin counts differ within a pair by construction.
- Evidence: EF02MA20 verbatim; "which purse has more" (G1-232) compares — equivalence is the missing half.

**T5 · Count notes and coins** — rank 5
```
 [10] [5] ⓵ ⓵ ㉕ ㉕    total: [ 17.50 ]      (notes are flat stylised rectangles — money-Q1)
```
- Child: counts a mixed set of notes and coins and writes the total in the locale's money format (the first decimal money writing).
- Settings: Notes (which denominations) · Up to (20 / 50 / 100 units) · Format hint (on at level 1).
- Band G2–G3 · Point 2.MD.C.8 ("dollar bills, quarters…"), 3.NBT.A.2 in money; the national register (R$ 1,25 · $1.25 · 1,25 € · 1,25 kr — `lib/money-format.js`, panel-confirmed per ENGINES Q1).
- Reuse `coins.js` + the new `notes` list (`currencies.js` additions per ENGINES Q1), `money-format.js`.
- Screen type-number (decimal entry per locale separator) · Locales 11, each locale's total ≥ 1 whole unit only after the formatter table is signed · Key: the total.
- Risks: decimal separator per locale (`,` vs `.`) → the screen keypad shows the locale's separator; the format is data, never code.
- Evidence: "sistema monetário cédulas e moedas" (pt), "rechnen mit geld euro und cent" (de), "counting money … for adults/kids" (en); notes are the one object class the 14 faces lack.

**T6 · Shop price tags and play money to cut** — rank 6
```
 ┌────────┐ ┌────────┐      ✂ coins: ⓵ ⓵ ⑤ ⑩ ㉕ …   notes: [5] [10]
 │ 🍎 1.20 │ │ 🧸 4.50 │
```
- Teacher: prints price tags (theme pictures + prices in the locale format) and token money for a classroom shop.
- Settings: Prices up to (1 / 5 / 20 units) · Tags per page (8 / 12) · Money pages (1 / 2).
- Band K–G2 · Point 2.MD.C.8; role-play material (de "Kaufladen", fr "la marchande", nl "winkeltje").
- Reuse `data/b2/shop-frames.js` prices, `coins.js`, K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: a tag price that no coin set can pay exactly (0.03 in BRL) → prices are multiples of the smallest coin of the locale (`currencies.js` smallest unit).
- Evidence: topic seed; "rekenen met geld in de speelgoedwinkel" (nl), "contar dinero niños" (es).

### 15. Telling Time (`telling-time`) — 6 new

**T1 · Time words ↔ clocks** — rank 1
```
 🕞  ─── halb vier        🕐  ─── Viertel nach eins      🕓 ─── zehn vor vier
```
- Child: matches worded times to clock faces (level 1: o'clock/half; level 3: five-minute idioms); or writes the digital time under a worded time.
- Settings: Time to (hour / half / quarter / 5 min) · Task (match / write digital) · Pairs (4 / 6).
- Band G1–G3 · Point 1.MD.B.3, 2.MD.C.7 in words; the locale's idiom (de "halb vier" = 3:30, nl "tien voor half vier", es "las cuatro menos diez").
- Reuse `primitives/clock.js` (`clock({h, m, hands, numerals})`, `clock.js:3`), the new `lib/time-words.js` ×11 seeded from `mini tools/clock-core.js timeExpr` (ENGINES [telling-time-Q1]); per-locale rows refused until signed — the hour/half rows (slots 0 and 30) are live in all 11 from day one.
- Screen tap-order pairs / type-number · Locales 11 at hour/half; 5-min words per locale after sign-off · Key: the lines.
- Risks: the inverted half-hour (de/nl/sv/da/no/fi "half four" = 3:30) → never derived by string concatenation outside `time-words.js` (ENGINES rule); the 8 fixture rows are the regression.
- Evidence: topic seed ("the hard part in de/nl/sv"); "uhrzeit lernen volle und halbe stunden / viertel vor viertel nach" (de), "klokkijken groep 4" (nl), "leggere l'orologio" (it), "telling time to the nearest 5 minutes" (en).

**T2 · Daily routine timeline** — rank 2
```
 7:00 🛏️→🍳   8:30 🏫   12:00 🍽️   15:30 ⚽   19:30 🛏️
 Draw the hands for each time · or: put the pictures in order
```
- Child: draws the hands for the time of each daily activity (level 1), or orders activity cards by their clock times (level 3).
- Settings: Clocks (4 / 6) · Task (draw hands / order) · 12 h / 24 h (hidden for en-US level 1).
- Band G1–G2 · Point 1.MD.B.3, 2.MD.C.7 (a.m./p.m. in en-US via the routine); Lehrplan "Tagesablauf", programmes "la journée".
- Reuse `clock.js hands:'none'`, `emit/interactive-set-clock.js`; **NEW** strings `data/time/routine.<loc>.json` (~12 activity words ×11: wake up, breakfast, school, lunch, play, dinner, bed … native-authored); activity pictures from the library where a reviewed noun exists (bed, toothbrush, ball), else a pictogram.
- Screen set-clock (draw) / tap-order (order) · Locales 11 after the 12 strings are signed · Key: hands / order.
- Risks: a culturally wrong routine (lunch at 12 is late in es-MX schools / early in Nordic ones) → the times are generated within a per-locale plausible band (the panel sets the band in the JSON), never fixed.
- Evidence: topic seed; "images séquentielles de la journée en maternelle" (fr 38, report), "tagesablauf"-class de searches, "mi rutina diaria" es.

**T3 · Elapsed time on a time line** — rank 3
```
 2:15 ──┼──┼──┼──┼── 3:45        how long?  [ 1 ] h [ 30 ] min
        30 min   1 h
```
- Child: finds the time passed between two clock times by hopping on a number-line-like time line (G3-344 compares whole hours only).
- Settings: Steps (hours / half hours / 15 min / 5 min) · Ask (how long / end time / start time).
- Band G3 (G2 hours) · Point 3.MD.A.1 (elapsed time in minutes on a number line diagram — the CCSS wording); de "Zeitspannen", Lgr22 "tidsskillnad".
- Reuse `number-line.js jumps` with time labels, `clock.js` at both ends, `lib/measurement-screen.js`-style two boxes.
- Screen type-number ×2 · Locales 11 · Key: the hops and the span.
- Risks: crossing noon/midnight at 12 h → spans never cross 12:00 unless 24 h is on; minutes ≥ 60 refused by the two-box form.
- Evidence: 3.MD.A.1 verbatim; "how much time passed" (G3-344) is hour-only; "temps écoulé"/"Zeitspanne" G3 searches.

**T4 · Clock to cut and assemble** — rank 4
```
   ┌───────────┐   hour hand ▶───   minute hand ▶────────
   │  12 1 2   │   ✂ cut, fix with a paper fastener
   │ 9  ●   3  │
```
- Teacher: prints a clock face with two hands to cut and fasten (brass fastener); optional minute ring and "quarter" shading.
- Settings: Face (numbers / ticks / minute ring) · Size (one big / two small) · Quarter shading (on/off).
- Band K–G2 · Point 1.MD.B.3; material in every classroom.
- Reuse `clock.js` (`hands:'none'`, `minuteRing`, `clock.js:3-8`), K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: hand lengths must read as hour/minute in greyscale → different widths + lengths (already the primitive's convention).
- Evidence: "klokkijken maken" (nl), "uhrzeit lernen kinder übungsblätter" (de), "aprender la hora reloj de agujas" (es); the first physical model teachers ask for.

**T5 · a.m./p.m. — or morning/afternoon in 24 h** — rank 5
```
 en-US:  🍳 breakfast 7:00  ○ a.m. ○ p.m.        others: 🍳 7:00 or 19:00? circle
```
- Child: decides a.m./p.m. for routine events (en-US); in the ten 24-h locales the same page asks "7:00 or 19:00?" (the 24-h reading of the same idea).
- Settings: Events (4 / 8) · Form (a.m./p.m. · 12/24 h) — fixed per locale, no control shown.
- Band G2 · Point 2.MD.C.7 ("using a.m. and p.m." — en-US only); 24-h time is the G2–G3 standard elsewhere (Lehrplan "24-Stunden-Zählung").
- Reuse `G3-355`'s 12/24 conversion cells, the routine strings of T2.
- Screen tap-choice · Locales 11 (two forms, one per locale group; never a toggle) · Key: the choice.
- Risks: a.m./p.m. shown in a non-US locale is a locale error → the form is data on the locale row, not a control (the digit-form precedent, ENGINES [number-tracing-Q1]).
- Evidence: 2.MD.C.7 verbatim; "kellonajat englanniksi am pm" (fi, report) shows the foreign-ness of a.m./p.m. outside en-US.

**T6 · Quarters of the clock face (shade the quarter hour)** — rank 6
```
  🕒 "quarter past"  → shade the quarter the minute hand swept      🕕 "half past" → shade half
```
- Child: shades the sector the minute hand has swept since the hour — quarter past = one quarter of the face (the fraction link that explains the words).
- Settings: Times (quarter / half / three-quarters) · Ask the time word too (on/off).
- Band G1–G2 · Point 1.MD.B.3 + 1.G.A.3 (halves and quarters of a circle); de "Viertelstunde", fr "le quart d'heure".
- Reuse `clock.js` + `primitives/fraction.js` circle sectors (`fraction.js:3`, `shape:'circle'`); the sectors are the `tap-paint` regions.
- Screen tap-paint (exact sector set) · Locales 11 · Key: the shaded face.
- Risks: "quarter to" sweeps three quarters (the inverted idiom) → the instruction is the locale's own word from `time-words.js` (never a translation of "quarter to").
- Evidence: the fraction–time link is in Lehrplan/Lgr22 G2 ("Viertelstunde", "kvart"); no deck draws it.

### 16. Measurement & Size (`measurement`) — 6 new

**T1 · Estimate, then measure** — rank 1
```
 📎📎📎📎📎📎  ✏️         I think: [   ]  paper clips      I measured: [ 6 ]
```
- Child: writes a guess, then measures with the drawn units (paper clips, cubes) and writes the count; the same page for several objects.
- Settings: Unit (paper clip / cube / hand) · Objects (3 / 5) · Range (2–12 units).
- Band K–G1 · Point 1.MD.A.2 (express length as a whole number of units laid end to end), K.MD.A.1; Lehrplan "messen mit Einheiten", SLO "meten met natuurlijke maten".
- Reuse `types/_shared/measurement-tasks.js` unit squares (`G1-139`) with a clip icon (`primitives/unit-cubes.js` per ENGINES #16 "paper-clip units"); `artExtentSync` registers the art, not the box (`image-cache/silhouette.js:117-122`).
- Screen type-number (measured; the estimate is open) · Locales 11 · Key: the measured count.
- Risks: a unit row that does not end on a whole unit → the generator places objects whose art extent is an integer number of units (the honest-measurement guarantee of `jug.js:9`).
- Evidence: topic seed; "measurement … for kids" (en), "messen klasse 1" (de), "meten kleuters" (nl), "mittaaminen esiopetus / eskari" (fi, report).

**T2 · Ruler to cut out (cm / inches)** — rank 2
```
 ✂ ├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
   0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 cm
```
- Teacher/child: prints a true-scale ruler (20 cm / 6 in) to cut and use; the footer check square proves the print scale.
- Settings: Unit (cm · en-US: inches or cm) · Length (15 / 20 cm · 6 in) · Half-marks (on/off).
- Band G1–G3 · Point 2.MD.A.1 (measure with appropriate tools); material.
- Reuse `primitives/ruler.js` (`ruler({cm, pxPerCm})`, `ruler.js:3`; the `unit:'in'` extension of measurement-Q1), K-240 cut lines, the 1-inch/2-cm check square.
- Screen material · Locales 11 (inches only in en-US) · Key: none.
- Risks: a browser PDF scaled to "fit" prints a wrong ruler → the check square + a one-line print note ("print at 100 %"); the vector PDF path (ARCHITECTURE §3) keeps the size exact.
- Evidence: topic seed; "measurement conversion chart" (en) adjacent demand; a ruler is the one tool every class lacks on day one.

**T3 · Which unit? (choose the sensible unit)** — rank 3
```
 🐘 weight:  ○ grams  ○ kilograms        ✏️ length:  ○ cm  ○ m       🛁 holds:  ○ ml  ○ l
```
- Child: chooses the appropriate unit (or tool) for measuring an object — the "which unit" reasoning of 2.MD.A.3/A.1 and the metric equivalents.
- Settings: Attribute (length / weight / capacity / mixed) · Units (2 / 3 per card).
- Band G2–G3 · Point 2.MD.A.1, 2.MD.A.3, 3.MD.A.2; en-US adds customary (in/ft, oz/lb, cups) per measurement-Q1; the other 10 metric only.
- Reuse the size-compare cards (`types/_shared/size-compare.js`), `lib/mass-rank.js` + `data/light-objects.js` (heavier/lighter facts) extended with a reviewed **unit class** per noun (heavy/light, long/short, big/small container — ≈ 60 nouns, language-free, panel-checked); unit words ×11 (6 strings).
- Screen tap-choice · Locales 11 · Key: the unit.
- Risks: an object that sits between units (a cat: g or kg?) → only nouns with a clear class are in the table; the table is reviewed on a contact sheet (a word review cannot see a picture).
- Evidence: 2.MD.A.3 verbatim; "medidas de comprimento" (pt), "messen cm" (de); en-US "measurement cups" shows the customary set in daily use.

**T4 · Balance — which pan goes down?** — rank 4
```
    ⚖    [🐘]  vs  [🐭]     draw the tilt / circle the heavier pan
```
- Child: predicts the tilt of a balance from the two objects (real-world mass knowledge), draws it or circles the pan.
- Settings: Pairs (3 / 5) · Show a level balance to draw on (level 3) · Objects (library, from the mass-rank table).
- Band K–G1 · Point K.MD.A.2 (compare measurable attributes: heavier/lighter); Lehrplan "Gewichte vergleichen".
- Reuse `primitives/balance.js` (`tilt: 'left'|'right'|'level'`, `balance.js:2-7`), `lib/mass-rank.js` (heavier facts), `data/light-objects.js`.
- Screen tap-choice (pan) · Locales 11 · Key: the tilted balance.
- Risks: "bigger is heavier" misconception is the point → ≥ 1 pair per page where the bigger picture is lighter (balloon vs stone), from the reviewed table (K-038 precedent).
- Evidence: COVERAGE.md K row 13 (weight compare) is an activity gap; K-038 circles the heavier one — the balance *prediction* adds the apparatus.

**T5 · Which holds more? Order the jugs** — rank 5
```
 🥛 small   🪣 big   🫙 middle     → number 1 (least) to 3 (most)
```
- Child: orders drawn containers by capacity (same shape family, different sizes) or circles the one that holds more.
- Settings: Containers (2 / 3 / 4) · Task (circle / order) · Same shape / different shapes (level 3, same height different width).
- Band K–G1 · Point K.MD.A.2 (capacity as an attribute); programmes "contenances", SLO "inhoud".
- Reuse `primitives/jug.js` outlines at different `w/h` (`jug.js:8`) — drawn vessels, not library art (no capacity table needed); `tap-order`.
- Screen tap-order / tap-choice · Locales 11 · Key: the order.
- Risks: "taller holds more" misconception at level 3 → width differs so the taller is NOT always bigger; the honest volume is w×h of the drawn vessel (the generator asserts the order by area).
- Evidence: K.MD.A.2 verbatim ("has more of/less of the attribute"); capacity compare has no deck (COVERAGE.md lists only length and weight).

**T6 · Perimeter — measure the sides, then add** — rank 6
```
 ┌────────┐        ruler printed below the shape
 │        │ 3 cm    perimeter = [ ] + [ ] + [ ] + [ ] = [ 16 ] cm
 └────────┘ 5 cm
```
- Child: measures each side of a drawn rectangle/triangle with the printed ruler and adds (G3-337 counts unit edges on a grid).
- Settings: Shapes (rectangle / triangle / mixed) · Unit (cm · en-US in) · Sides labelled (none / some).
- Band G3 · Point 3.MD.D.8 (perimeter from side lengths); de "Umfang messen".
- Reuse `ruler.js` (true scale), `primitives/flat-shape.js` outlines at exact cm sizes, `answerBox` cells.
- Screen type-number · Locales 11 · Key: sides + sum.
- Risks: print scale → the check square; a side that is not a whole cm → shapes drawn on whole-cm sizes (half cm at level 3 only in en-US halves, 3.MD.B.4).
- Evidence: 3.MD.D.8; "geometria plana" (pt), "perimeter" G3 searches; the measuring face of perimeter is in every G3 book.

### 17. Graphs & Data (`graphs-data`) — 5 new

**T1 · Class survey sheet (tally, then graph)** — rank 1
```
 Our favourite fruit        tally          graph
 🍎 apple      | | | |  ┆  ▮▮▮▮
 🍌 banana     | | |    ┆  ▮▮▮
 🍇 grapes     ┆
```
- Teacher types 2–5 categories (exact-match pictures or words only); the class collects data; children tally and colour the bars.
- Settings: Categories (my words, 2–5) · Scale (1 / 2) · Question line (my text).
- Band K–G2 · Point K.MD.B.3, 1.MD.C.4, 2.MD.D.10 (collect, organise, represent); the "class survey" of every framework (de "Umfrage in der Klasse", nl "turven").
- Reuse `primitives/bar-graph.js` empty axes (`barGraph({values: [], yMax})`, `bar-graph.js:12`), `primitives/tally.js`, own words via word-writing-Q1 (a typed category without a picture prints as a word).
- Screen printable (open data; no key) · Locales 11 · Key: none (the gallery says "your class's data").
- Risks: a category word too long for the label column → fit refusal with the sentence; never a wrong picture (exact match only).
- Evidence: topic seed; "daten und diagramme grundschule" (de), "grafieken lezen"-class nl, "graphs and data handling" (en).

**T2 · Count the scene, then graph it** — rank 2
```
 [ busy scene: 🐱🐱🐶🐱🐦🐶🐦🐦🐦 ]      🐱 [3]  🐶 [2]  🐦 [4]     → colour the bars
```
- Child: counts each kind in a scene, writes the totals, colours the bar graph (collect → organise → graph on one page).
- Settings: Kinds (2 / 3 / 4) · Counts (to 6 / 10) · Graph (bars / pictograph).
- Band K–G1 · Point K.MD.B.3 → 1.MD.C.4; the old `chart-count` app's core (ENGINES #17 keep).
- Reuse `types/_shared/scene-count.js` (`mixedScatter`, `scene-count.js:37`), `bar-graph.js`/`pictograph.js emptyGrid`.
- Screen type-number + tap-paint · Locales 11 · Key: counts + graph.
- Risks: a count the bar axis cannot show → `yMax` from the max count; `verify()` recounts the scatter (`scene-count.js:66-89` per ENGINES counting-Q1).
- Evidence: topic seed + the retired app; "count and graph" (G1-147) starts from printed counts — this starts from the scene.

**T3 · Build the pictograph (each picture = 1 / 2)** — rank 3
```
 🍎 │ 🍎🍎🍎          key: 🍎 = 2        apples: 6 → draw 3 stamps
 🍌 │ [ ] [ ] [ ]
```
- Child: fills an empty pictograph from a count table; at level 3 one picture stands for 2 (half stamps allowed where the count is odd).
- Settings: Scale (1 / 2 / 5) · Rows (3 / 4) · Half pictures (on/off at scale 2).
- Band G1–G3 · Point 1.MD.C.4, 2.MD.D.10, 3.MD.B.3 (scaled picture graph); G2-238/G3-333 only *read* scaled pictographs.
- Reuse `primitives/pictograph.js` (`emptyGrid`, `scale`, `halfOk`, `pictograph.js:3-8`).
- Screen tap-paint (stamp cells; the exact count per row) · Locales 11 · Key: the filled graph.
- Risks: a count not divisible by the scale without halves → halves on, or counts drawn as multiples (the primitive's own rule, `pictograph.js:6-7`).
- Evidence: COVERAGE.md G2 "make a pictograph where each picture stands for 2" = activity gap; 3.MD.B.3 "draw a scaled picture graph".

**T4 · Make the line plot** — rank 4
```
 lengths measured: 3, 5, 4, 3, 6, 3, 5          X
                                                 X     X
 ├───┼───┼───┼───┼───┤                           X  X  X  X
 2   3   4   5   6   7
```
- Child: marks one X per measurement above the number line (G2-240 reads a plot; this makes one).
- Settings: Data (6 / 10 values) · Range (1–10) · Halves (G3: 3.MD.B.4).
- Band G2–G3 · Point 2.MD.D.9, 3.MD.B.4 (generate data and show it on a line plot).
- Reuse `primitives/line-plot.js` with empty slots; `tap-paint` cells above each value.
- Screen tap-paint (exact X count per column) · Locales 11 · Key: the plot.
- Risks: none positional; A1 — the data list is printed, so the key is deterministic.
- Evidence: 2.MD.D.9 verbatim ("generate measurement data … show by making a line plot").

**T5 · Which graph shows the data?** — rank 5
```
 table: 🍎 4  🍌 2  🍇 5        [graph A]  [graph B]  [graph C]   circle the right one
```
- Child: matches a data table (or a tally) to the one bar graph / pictograph that shows it, among three.
- Settings: Graph kind (bar / pictograph) · Distractor (one bar off / two swapped) · Rows (3 / 4).
- Band G1–G2 · Point 1.MD.C.4, 2.MD.D.10 (interpret representations); reading a graph critically.
- Reuse `bar-graph.js` ×3 small, `chipRow`.
- Screen tap-choice · Locales 11 · Key: the graph.
- Risks: a distractor that differs only in a bar the child cannot read at small size → distractors differ by ≥ 2 units in ≥ 1 bar (measured legibility floor, `bar-graph.js barMax`).
- Evidence: "grafieken lezen en interpreteren" (nl head), "dati e grafici scuola primaria" (it), "lectura de gráficos" classes; the matching face trains reading without producing.

### 18. Shapes & Geometry (`shapes-geometry`) — 6 new

**T1 · Draw a rectangle with area N (grid paper)** — rank 1
```
 · · · · · ·      area 12 → colour a rectangle of 12 squares  (3×4, 4×3, 2×6, 6×2, 1×12 …)
 · · · · · ·
```
- Child: colours any rectangle with the given area on a grid; level 3 asks for two different rectangles with the same area.
- Settings: Area (6–36) · Grid (6×6 / 8×8 / 10×10) · Ask two shapes (on/off).
- Band G3 · Point 3.MD.C.7 (area by tiling, relate to multiplication), 3.MD.C.7d (same area, different shape).
- Reuse `primitives/grid-copy.js` target grid (`grid-copy.js:11`); verifier: filled set is a rectangle of the right cell count (any dimensions, A4).
- Screen tap-paint · Locales 11 · Key: one rectangle (+ the list of all factor pairs).
- Risks: an area with one factorisation (prime) → level 3 draws composite areas only.
- Evidence: topic seed; 3.MD.C.7; "geometria plana" (pt), "géométrie ce2" (fr) adjacent.

**T2 · Nets to cut and fold** — rank 2
```
   ┌───┐
 ┌─┼───┼─┬───┐      cube net (one of the 11), tabs for glue
 └─┼───┼─┴───┘
   └───┘
```
- Child/teacher: cuts and folds a net into a cube, cuboid or pyramid; level 3: "which of these nets folds into a cube?" (tap-choice).
- Settings: Solid (cube / cuboid / square pyramid / triangular prism) · Tabs (on/off) · Size (one big / two small).
- Band G2–G3 · Point 2.G.A.1 (recognise cubes), 3.G.A.1; Lehrplan "Würfelnetze" (a Klasse-3 classic), SLO "ruimtefiguren bouwen".
- Reuse: **NEW** `primitives/net.js` (the 11 cube nets + cuboid/pyramid/prism nets, exact fold geometry, tabs; pure SVG); K-240 cut lines.
- Screen material (folding) / tap-choice (which net folds) · Locales 11 (language-free) · Key: for the choice face, the valid nets.
- Risks: a net too big for the body → scale from the body height (the fill rule); the "which net" distractors are non-nets with 6 squares (verified by the folding check in `net.js`, poison-tested).
- Evidence: topic seed; "würfelnetze" (de, a head term in Klasse 3), "geometrische formen basteln" (de), "forme geometriche … ritagliare" (it), "figuras geométricas … 3d" (pt).

**T3 · Which two shapes make this one?** — rank 3
```
 ▲ + ▲ = ◆ ?    [▲ ▲]  [▲ ■]  [● ▲]     circle the pair that composes the shape
```
- Child: chooses the pair of pieces that compose the target shape (two triangles → square; square + triangle → house; two trapezoids → hexagon).
- Settings: Target shapes (chips) · Pairs shown (3) · Pieces drawn joined / apart.
- Band K–G1 · Point K.G.B.6 (compose simple shapes to form larger shapes), 1.G.A.2.
- Reuse `primitives/flat-shape.js` (`flatShape({kind, rot, flip, aspect})`, `flat-shape.js:7`) with a small composition table (≈ 12 reviewed compositions, exact geometry); `chipRow`.
- Screen tap-choice · Locales 11 · Key: the pair.
- Risks: a distractor pair that also composes the target (two right triangles vs two other triangles) → the table lists all valid pairs per target and excludes them from distractors.
- Evidence: K.G.B.6 verbatim; COVERAGE.md K row "compose shapes" is covered by the tangram activity only.

**T4 · Shape fact table (name · sides · corners)** — rank 4
```
 shape │ name       │ sides │ corners
 ▲     │ [triangle] │ [ 3 ] │ [ 3 ]
 ⬠     │ [        ] │ [   ] │ [   ]
```
- Child: fills the table for 4–6 shapes (K-075 counts sides only; the vertices + the name make the attribute table of 1.G.A.1/2.G.A.1).
- Settings: Shapes (chips, 2D) · Columns (name / sides / corners / "equal sides?" at level 3) · Word bank (on/off).
- Band K–G2 · Point K.G.B.4, 1.G.A.1, 2.G.A.1 (identify and describe by attributes).
- Reuse `flat-shape.js` (verts in `meta`), `data/geometry-words.js` names ×11, `lib/geometry-screen.js`.
- Screen type-word (name) + type-number · Locales 11 · Key: the table.
- Risks: en-US "corners" vs "vertices" register → the panel's word per grade (strings ×11, exist for G2-246); turned shapes (`rot`) so "sides" is counted, not recognised.
- Evidence: "figuras geométricas planas sus lados y vertices niños" (es), "geometrische formen eigenschaften" (de), "2d shapes names" (en), "figuras geométricas planas de 4 lados" (pt).

**T5 · Draw the mirror lines** — rank 5
```
 ▲   ■   ⬡   ♥      draw every line of symmetry on each shape
```
- Child: draws the lines of symmetry on shapes and pictures (G3-342 only counts them).
- Settings: Shapes (geometric / library pictures from the reviewed symmetric list) · Count given (on/off).
- Band G2–G3 · Point 4.G.A.3 prep / the G2–G3 symmetry rows of every national framework (de "Achsensymmetrie Klasse 3", fr "symétrie axiale CE2").
- Reuse `flat-shape.js`, the reviewed symmetric pictures (`data/pt/symmetry.json` + the hand-read list, ENGINES-ART §7), `data/symmetry-review.js`.
- Screen printable (drawing) · Locales 11 · Key: the lines drawn.
- Risks: the perspective trap (a 3/4-view bell looks symmetric by the ink measure) → pictures only from the reviewed list, never the raw symmetry index (METHOD-pt §14 trap).
- Evidence: "mirror line?" (G2-247) and "how many mirror lines" (G3-342) recognise/count — drawing is the production face teachers ask for ("symétrie axiale tracer").

**T6 · Quadrilateral family sort** — rank 6
```
 bins: square · rectangle (not square) · rhombus · other quadrilateral      ← draw lines / write letters
```
- Child: sorts 8 quadrilaterals into four named bins (G3-340 asks rectangle yes/no only).
- Settings: Bins (3 / 4) · Turned shapes (on/off) · Answer (lines / letters).
- Band G3 · Point 3.G.A.1 (shapes in different categories share attributes; quadrilaterals that are not rectangles, rhombuses, squares).
- Reuse `flat-shape.js` (`sub`, `aspect`, `rot`), `types/_shared/sort-to-bins.js`, `data/geometry-words.js`.
- Screen tap-select (strict per bin, A14) · Locales 11 · Key: the bins.
- Risks: a square is also a rectangle and a rhombus → the bin labels say "rectangle (not a square)" (the `data-lcs-alts` precedent of G3-340 per ENGINES #18); the native word for rhombus per locale ("Raute", "losange", "rombo") from geometry-words.
- Evidence: 3.G.A.1 verbatim; "geometriske figurer rombe" (da/no), "figuras geométricas planas de 4 lados" (pt).

### 19. Patterns (`patterns`) — 5 new

**T1 · Find the core (circle the unit that repeats)** — rank 1
```
 🐱🐶🐶🐱🐶🐶🐱🐶🐶      circle the part that repeats → [🐱🐶🐶]   then: name it  A B B
```
- Child: circles the smallest repeating unit and (level 2) writes its letter code (AB / ABB / ABC).
- Settings: Units (AB / ABB / ABC / AABB) · Length (2 / 3 repeats) · Letter code (on/off).
- Band K–G1 · Point the patterns strand of every national framework (de "Muster und Strukturen", Lgr22 "mönster", SLO "patronen", BNCC EF01MA09 "padrões"); CCSS has no K-2 pattern standard (it is MP.7/3.OA.D.9) — the page carries no CCSS code.
- Reuse `types/_shared/pattern-next.js` row; `tap-select` over the first N items.
- Screen tap-select (the core items) · Locales 11 · Key: the ringed core + code.
- Risks: a pattern whose core could be read two ways (ABAB → AB or ABAB) → the core is defined as the shortest; the row shows ≥ 2 full repeats + a partial so the shortest is unambiguous.
- Evidence: COVERAGE.md K row 20 (patterns) is an activity gap; "muster fortsetzen"-class de searches.

**T2 · Make your own pattern** — rank 2
```
 unit: [🐱] [🐶]     ┌──┬──┬──┬──┬──┬──┬──┬──┐
                     │  │  │  │  │  │  │  │  │   draw your pattern (first two given at level 1)
```
- Child: invents and draws a repeating pattern in an empty train/strip; a small picture bank at the top suggests pieces.
- Settings: Cells (6 / 8 / 10) · Bank (theme pictures / shapes / colours) · Starter (none / first unit).
- Band K–G1 · Point creating (not only extending) patterns — named in de/sv/nl/pt frameworks.
- Reuse the train art slots (`data/art-extents.json` offsets per ENGINES #19) or a plain strip; `iconRows` bank.
- Screen printable (open; no key) · Locales 11 · Key: none.
- Risks: none graded.
- Evidence: topic seed; the old pattern-train's blank mode (OLD-APP-LESSONS §E "pattern-worksheet all-blank").

**T3 · Fix the pattern (one piece is wrong)** — rank 3
```
 🔴🔵🔴🔵🔵🔵🔴🔵      circle the wrong one → draw the right one in the box [ ]
```
- Child: finds the element that breaks the pattern and names/draws the correct one.
- Settings: Units · Errors (1 / 2) · Pattern by (picture / colour / shape / size).
- Band K–G1 · Point patterns strand (error detection); Lehrplan "Fehler im Muster".
- Reuse `pattern-next.js` with one injected error (never at position 1–2, never the last — gate 8 balances the error position).
- Screen tap-select (wrong item) + tap-choice (the right one) · Locales 11 · Key: both.
- Risks: an "error" that makes another valid pattern (ABABBA could be ABB from another start) → the generator asserts the corrupted row has exactly one minimal fix (brute force over the row).
- Evidence: error-finding is the standing checking strategy (see addition T6); pattern error tasks are in every K-1 book ("Welches passt nicht?").

**T4 · Translate the pattern (same pattern, other things)** — rank 4
```
 🐱🐶🐱🐶🐱🐶   →   which shows the SAME pattern?   [●■●■●■]  [●●■●●■]  [■■●■■●]
```
- Child: recognises the abstract structure (AB) in a different medium and circles the row with the same structure; level 3 writes the letter code under both.
- Settings: Units · Media pair (pictures ↔ shapes / colours ↔ letters / clap-stamp icons).
- Band K–G1 · Point abstraction of pattern structure (the "AB" labelling that every framework names).
- Reuse `pattern-next.js` rows ×3, `chipRow`.
- Screen tap-choice · Locales 11 · Key: the matching row.
- Risks: distractor rows share the unit length (AB vs AAB are both length ≤ 3) → distractors differ in structure, not only in content.
- Evidence: "Muster übertragen" (de Lehrplan wording), Lgr22 "beskriva mönster".

**T5 · Pattern train to cut and glue** — rank 5
```
 🚂[🐱][🐶][  ][  ][🐱]…      ✂ pieces: 🐶 🐱 🐶 🐱 🐶
```
- Child: cuts the pieces and glues them into the empty wagons to continue the pattern (the old app's train, hands-on).
- Settings: Units · Blanks (2 / 4 / all but the first unit) · Train art (on/off).
- Band K · Point patterns strand; material/fine-motor.
- Reuse the train art with measured slots (B9, `data/art-extents.json`), K-240 cut lines, `pattern-next.js`.
- Screen tap-edit (place pieces, Family F deferred feedback D1) · Locales 11 · Key: the completed train.
- Risks: exactly as many pieces as blanks hands over the answer → +2 decoy pieces (gate 8).
- Evidence: topic seed; the pattern-train app's train format (OLD-APPS keep list).

### 20. Number Tracing (`number-tracing`) — 5 new

**T1 · Trace the number with its quantity** — rank 1
```
  5  5̇ 5̇ 5̇ 5̇  ┌─────┐
                │●●●●●│   (ten-frame or 5 pictures beside each number)
```
- Child: traces the numeral and counts the quantity drawn beside it (symbol ↔ amount on one line).
- Settings: Numbers (chips 0–20) · Quantity (frame / pictures) · Rows (trace / trace + write).
- Band K · Point K.CC.A.3 + K.CC.B.4 (write numerals and connect to quantities).
- Reuse `primitives/trace-path.js` digit lanes, `data/tracing/digit-strokes.js FORM_BY_LOCALE` (the locale's 1 and 7, per ENGINES [number-tracing-Q1]), `ten-frame.js` / `iconRows`.
- Screen printable (the K-252/253 raster verify stays build-time, ENGINES #20) · Locales 11 · Key: none (tracing).
- Risks: 0 with a quantity → the 0 row shows an empty frame (the one honest picture of zero; A16 is about counting tasks).
- Evidence: topic seed; "números punteados del 1 al 10" (es), "números pontilhados até 20" (pt 62, report), "numeri tratteggiati 1 10" (it).

**T2 · Trace the number word** — rank 2
```
  3   t̲h̲r̲e̲e̲   three   ______        (dashed word, model, empty line)
```
- Child: traces the number word under its numeral, then writes it.
- Settings: Numbers (chips 0–20) · Rows (trace / trace + write) · Case (small / capital first).
- Band K–G1 · Point K.CC.A.3 + the national number words; es "números en letras", fr "nombres en lettres cp" (demand).
- Reuse `lib/number-words.js` ×11, `data/tracing/letter-strokes.js` word layout (`:22-28` per ENGINES [letter-tracing-Q1]); the locale's print model (`print-us` now; `print-eu`/`print-nordic` overrides when signed).
- Screen printable · Locales: en/es/pt now (print-us model); de/fr/it/nl/sv/da/no/fi after their override files are signed (refused until then — the letter-tracing rule) · Key: none.
- Risks: a glyph missing in the stroke table (fr "é" in "zéro") → `COMPOSED` covers é; a missing glyph throws → refusal (`letter-strokes.js:38`).
- Evidence: topic seed; "tracing number words" (en), "écriture des chiffres en lettres" (fr), "zahlwörter schreiben" (de).

**T3 · Dotted numbers to 50 / 100 on a grid** — rank 3
```
 1̇ 2̇ 3̇ 4̇ 5̇ 6̇ 7̇ 8̇ 9̇ 1̇0̇
 1̇1̇ 1̇2̇ …                  (tens rows; trace every two-digit number)
```
- Child: traces two-digit numbers in tens rows (the writing side of the hundreds chart).
- Settings: Range (1–30 / 1–50 / 1–100) · Rows per page · Fade (dashed → dotted → empty by row).
- Band K–G1 · Point K.CC.A.1 → 1.NBT.A.1 writing numerals to 120.
- Reuse `trace-path.js` digit lanes in a grid; `FORM_BY_LOCALE`.
- Screen printable · Locales 11 · Key: none.
- Risks: 100 traced numerals on one page are too small → ≤ 50 per page at the K glyph floor; "to 100" is two pages.
- Evidence: "números punteados del 1 al 50 / al 100" (es), "numeros pontilhados ate 50" (pt), "unisci i puntini 1 100" (it) adjacent.

**T4 · Fading rows (trace · trace lighter · write)** — rank 4
```
  7   7̇ 7̇ 7̇   7̣ 7̣ 7̣   ___ ___ ___      (dashed → dotted → empty)
```
- Child: traces a full dashed row, then a faint dotted row, then writes alone (the writing app's row editor, OLD-APP-LESSONS §E).
- Settings: Numbers (chips) · Row kinds (trace / fade / guided / empty — the four old row types) · Rows per number (2 / 3).
- Band K · Point K.CC.A.3 (write numerals).
- Reuse `trace-path.js` dash patterns (model teal / trace dashed grey, `trace-path.js:6-9`) + a lighter `fade` pattern (additive); `settings.rows` per ARCHITECTURE §4.2.
- Screen printable · Locales 11 · Key: none.
- Risks: the faint row must survive a copier → ≥ 2.5 px dots at 40 % grey (the trace-path floor).
- Evidence: the old `writing` app's row editor is the kept feature; "number tracing and writing" (en), "cijfers leren schrijven" (nl).

**T5 · Number formation poster (0–9 with arrows)** — rank 5
```
 ┌─────┬─────┬─────┐
 │ ①→  │ ②→  │ ③→  │   big numerals with start dots and arrows, one page
```
- Teacher: prints the classroom poster of the ten digits in the locale's school form with stroke arrows (and a second page for 10–20).
- Settings: Range (0–9 / 10–20) · Pictures of the quantity (on/off) · Size (one page / two).
- Band K · Point K.CC.A.3; material (the wall chart).
- Reuse `trace-path.js` model rendering + arrows, `digit-strokes.js`.
- Screen material · Locales 11 · Key: none.
- Risks: the de/fr/it crossed 7 and flagged 1 vs plain en/es/pt and uncrossed nl/Nordic → `FORM_BY_LOCALE` (never a control).
- Evidence: "zahlen schreiben lernen" (de head), "écriture des chiffres gs/cp" (fr), "number tracing for 3 year olds" (en) — formation models are what the searches want.

### 21. Symmetry & Grid Copy (`symmetry-grids`) — 5 new

**T1 · Grid copy of a drawing (library art on a grid)** — rank 1
```
 ┌─┬─┬─┐  ┌─┬─┬─┐
 │ 🐓 drawing │  │ empty │     copy square by square
```
- Child: copies a how-to-draw lesson's outline (level 1) / big parts (2) / whole drawing (3) square by square onto an empty grid.
- Settings: Picture (lesson picker) · Level = how much ink · Labels (A–H / 1–8 on/off).
- Band K–G2 · Point visual-spatial copying (SLO "ruimtelijke oriëntatie", de "Gitterbilder"); CCSS none.
- Reuse `templates/components-b7/how-to-draw.js htdGrid` (`:112`), `K-396` grid mode (`types/k/K-396-how-to-draw.js:246-253`); grid density from the lesson's `grid` block computed offline (ENGINES-ART §10).
- Screen printable · Locales 11 (language-free) · Key: the drawing on the grid.
- Risks: a cell with > 40 % ink cannot be copied → the offline `grid` block refuses that density (gate 15 per ENGINES Q1).
- Evidence: topic seed (the competitor's rooster screenshot); "reproduction sur quadrillage" (fr), "gitterbilder" (de), "graphisme quadrillage gs" (fr, report).

**T2 · Two-axis symmetry (complete three quarters)** — rank 2
```
 ■■│      one quarter given; mirror across BOTH dashed lines
 ■ │
 ──┼──
   │
```
- Child: completes a figure given one quarter, mirroring across a vertical and a horizontal axis.
- Settings: Grid (6 / 8 / 10) · Given quarter (any) · Figure (pixel picker).
- Band G2–G3 · Point 4.G.A.3 prep; de "Achsensymmetrie mit zwei Achsen" (Klasse 3), fr "symétrie … deux axes".
- Reuse `primitives/sym-grid.js` (`sym-grid.js:8`) with a second axis (additive `axes: 2`); figures must be 2-axis symmetric (a figure gate at authoring, the K-286 asymmetry gate inverted).
- Screen tap-paint · Locales 11 · Key: the full figure.
- Risks: the figure pool (4 per size, ENGINES #21 "thin") → the ≥ 12-per-size authoring in the batch includes 2-axis figures.
- Evidence: topic seed; the symmetry-drawing faces (G2-253…) are one-axis only.

**T3 · Mirror the drawing (library art, half given)** — rank 3
```
 ┌──────┬──────┐
 │ 🦋 left half │ dashed guide │   draw the right half
```
- Child: completes the right half of a symmetric library drawing on a grid (reviewed symmetric list only).
- Settings: Picture (reviewed symmetric lessons) · Grid (on / off) · Guide dots (on/off).
- Band G1–G2 · Point symmetry drawing; the pt "desenho simétrico", fr "dessin symétrique" classics.
- Reuse `htdGrid` + the half mask from `lib/htd-render.js` (split, ENGINES-ART §2.2), the reviewed symmetric list (never the raw index — METHOD-pt §14).
- Screen printable · Locales 11 · Key: the whole drawing.
- Risks: perspective pictures that read symmetric by measure → reviewed list only.
- Evidence: topic seed; "symmetry picture tracing" exists as tracing (G1-432) — the free-draw mirror face is the step after.

**T4 · Enlarge on the grid (draw it twice as big)** — rank 4
```
 ┌─┬─┬─┬─┐    ┌───┬───┬───┬───┐
 │▪│ │▪│ │ →  │ ■ │   │ ■ │   │   same picture, cells twice the size
```
- Child: copies a pixel figure onto a grid with cells twice as large (scaling, 1 small cell → 1 big cell), or 2× as many cells (1 → 2×2 block) at level 3.
- Settings: Scale (bigger cells / 2×2 blocks) · Grid (4 / 6) · Figure.
- Band G2–G3 · Point scaling/similarity readiness (de "vergrößern", fr "agrandir une figure sur quadrillage" — a CE2/CM1 classic).
- Reuse `grid-copy.js` model + a target grid at 2× cell / 2× count; verifier compares the cell sets (block mapping).
- Screen tap-paint · Locales 11 · Key: the enlarged figure.
- Risks: a 2×2-block copy at grid 8 needs 16×16 cells → grid ≤ 6 at level 3.
- Evidence: "agrandir une figure sur quadrillage" (fr CE2 programme wording), de "Vergrößern am Gitter"; the how-to-draw seed "draw it bigger".

**T5 · Turn the picture (copy it rotated a quarter turn)** — rank 5
```
 ┌─────┐     ┌─────┐
 │ ▲   │  ↻  │   ▶ │   copy the figure turned a quarter turn to the right
 └─────┘     └─────┘
```
- Child: copies a pixel figure rotated 90° (level 3: flipped) onto the empty grid.
- Settings: Transform (quarter turn right / left / flip) · Grid (6 / 8) · Figure.
- Band G2–G3 · Point spatial reasoning with turns/flips (Lgr22 "lägesord och rotation", SLO "spiegelen en draaien").
- Reuse `grid-copy.js`; the rotated answer set is computed (pure index math).
- Screen tap-paint · Locales 11 · Key: the turned figure.
- Risks: a figure symmetric under the chosen turn makes the task trivial → figures with no rotational symmetry for that transform (the asymmetry gate of K-286 extended).
- Evidence: SLO/Lgr22 wording; the tangram face G2-347 ("turned or flipped ones do not match") shows the concept is already in the catalogue — this is its drawing face.

## B3 — picture engines and visual makers

### 22. Logic & Math Puzzles (`logic-puzzles`) — 6 new

**T1 · Code addition (pictures stand for numbers)** — rank 1 (the old `code-addition` app, kept)
```
 🍎 + 🍎 = 6      🍎 + 🍌 = 8      🍌 + 🐸 = 9      🍎 = [3]  🍌 = [5]  🐸 = [4]
 secret word:  3 → T   5 → A   4 → P   → [ T ] [ A ] [ P ]
```
- Child: decodes picture values from a chain of equations (each equation adds one new symbol), then reads the secret word.
- Settings: Symbols (3 / 4 / 5) · Range (to 10 / 20) · Secret word (theme word / my word — letters claim) · Addends per equation (2 / 3).
- Band G1–G3 · Point 1.OA.D.8, 2.OA.B.2 (unknowns in equations) + algebraic thinking.
- Reuse: new `types/_shared/code-addition.js` built as a **chain** (ENGINES [logic-puzzles-Q1]: first equation uses one symbol twice or a known digit; each later equation adds exactly one new symbol → unique by construction; `verify` re-solves greedily); `pictureIndex` nouns distinct by signature; the letters from `collation.js` (A10).
- Screen type-number (values) + type-word (the word) · Locales 11 · Key: values + word.
- Risks: a secret word with a letter outside the locale set → refused by name (A9); a repeated letter in the word maps to one value (fine: the key is value → letter).
- Evidence: the old app; "logicals grundschule" (de), "giochi di logica matematica" (it), "raciocínio lógico matemático" (pt 72, report).

**T2 · Number sudoku 4×4 / 6×6** — rank 2
```
 ┌─┬─┬─┬─┐
 │1│ │3│ │   every row, column and box: 1 2 3 4
 │ │4│ │2│
```
- Child: fills the numerals (the picture engine with numbers).
- Settings: Size (4×4 / 6×6) · Clues given (more / fewer) · Numerals or pictures (the switch between this and G1-158/G3-348).
- Band G1–G3 · Point logic/constraint reasoning (de "Logicals", it "giochi di logica"); CCSS MP.
- Reuse `G1-158` / `G3-348` engines unchanged (`countSolutions`, uniqueness kept while removing clues, per ENGINES Q1) with numeral rendering.
- Screen type-number per cell · Locales 11 · Key: the grid.
- Risks: none new; the 6×6 solver is under the 150 ms budget (ENGINES Q1).
- Evidence: topic seed; "sudoku für kinder"-class searches in every locale (the old `sudoku` app's retirement path).

**T3 · Who am I? number riddles** — rank 3
```
 I am less than 20. I am even. My digits add up to 7.   I am [ 16 ].
```
- Child: solves 2–3 clue riddles with exactly one answer (the "logicals / wer bin ich" format).
- Settings: Range (to 20 / 100) · Clues (2 / 3) · Clue kinds (parity / digit sum / between / tens-ones).
- Band G1–G3 · Point 2.NBT (place-value reasoning), 2.OA.C.3; de "Logicals wer bin ich" (demand), fr "devinettes".
- Reuse the solver pattern (brute force over the range; keep a clue set only while exactly one number fits — gate 15 `unique-solution`); clue frames **NEW** `data/puzzles/riddles.<loc>.json` (~8 ×11, native; shared with place-value T5).
- Screen type-number · Locales 11 after the frames are signed · Key: the number.
- Risks: a frame that inflects the numeral (fi) → absent in that locale rather than approximated (A6).
- Evidence: "logicals wer bin ich" (de), "acertijos de lógica … niños" (es), "giochi di logica per bambini con soluzioni" (it).

**T4 · KenKen-style cages (3×3 / 4×4, + only)** — rank 4
```
 ┌───┬───────┐
 │5+ │ 3+    │   each row/column 1–3; each cage adds to its number
 ├───┴───┬───┤
```
- Child: fills a Latin square whose outlined cages carry a sum (addition-only cages; level 3 adds one × cage).
- Settings: Size (3 / 4) · Operations (+ / + and ×) · Cages (bigger / smaller).
- Band G2–G3 · Point 2.OA.B.2, 3.OA.C.7 in a constraint puzzle.
- Reuse the sudoku engine's Latin-square core; **new** cage generator + its own `countSolutions` (uniqueness asserted, the ENGINES rule for `puzzle: true`); `primitives/logic-grid.js` cell drawing.
- Screen type-number · Locales 11 · Key: the grid.
- Risks: a cage set with two solutions → rejected and redrawn; 4×4 search space is tiny (24 Latin squares × cage checks).
- Evidence: topic seed; "logic puzzles numbers" (en), "logikpussel siffror" (sv).

**T5 · Solve to rebuild the picture (the old `math-puzzle`)** — rank 5
```
 tiles: [7][12][4]…  grid of sums: 3+4 │ 6+6 │ 2+2 …  → place each tile on its answer; a picture appears
```
- Child: solves each cell's sum and places the picture tile with that answer; the tiles rebuild a library picture.
- Settings: Grid (3×3 / 4×4) · Operation (+ / − / ×) · Range.
- Band G1–G3 · Point 1.OA.C.6 / 2.OA.B.2 / 3.OA.C.7 fluency in a jigsaw.
- Reuse the ENGINES #22 design (distinct answers per cell, tiles = CSS crops of the 512-px picture in the drawn image's space, B8); `tap-edit` with a tile palette (Family F, D1).
- Screen tap-edit · Locales 11 · Key: the rebuilt picture.
- Risks: two cells with the same answer break the bijection → answers distinct by construction (the old app's `generateData` rule, `math-puzzle.html:3119-3147` per ENGINES).
- Evidence: the old app; "rechnen und ausmalen" (de head term of colour-by-number — the same "practice disguised as a picture" appetite).

**T6 · Balance with two unknowns (shapes weigh)** — rank 6
```
 ⚖ ▲▲ = ■        ⚖ ■■ = 12        ▲ = [3]  ■ = [6]
```
- Child: reads two balances and finds both shape weights (G3-350 has one unknown per balance).
- Settings: Unknowns (2 / 3) · Range (to 20 / 50) · Pictures or shapes.
- Band G3 · Point 3.OA.D.8 / pre-algebra reasoning (Lgr22 "likhetstecknets betydelse", de "Gleichungen mit Formen").
- Reuse `primitives/balance.js` (`balance.js:8` weights on pans), a two-equation solver (unique by the chain rule: the first balance fixes a ratio, the second a value).
- Screen type-number ×2 · Locales 11 · Key: both weights.
- Risks: an underdetermined pair → the generator builds triangular systems only (gate 15).
- Evidence: "make it balance" (G3-350) is the single-unknown face; "giochi di logica matematica" (it), "logicals klasse 4" (de).

### 23. Same & Different, Shadows & Pairs (`same-different`) — 5 new

**T1 · Missing piece of the picture** — rank 1 (the old `missing-pieces` app, kept)
```
 ┌───────┐
 │ 🐘    │   one piece cut out (circle / square)   →   [piece A] [piece B] [piece C]  circle the one that fits
 │   ◯   │
```
- Child: circles the piece that fits the hole; distractors are rotated/flipped/offset crops of the same picture.
- Settings: Piece shape (circle / ellipse / rectangle / square) · Missing (1 / 2 / 3) · Distractor (very different / similar).
- Band K–G1 · Point visual closure / part-whole (COVERAGE.md K row "find the piece that fits the gap" = activity gap).
- Reuse CSS `background-position` crops of the 512-px picture (per ENGINES #23; B8 crop in the drawn space), `types/_shared/odd-one-out.js` card, `chipRow`.
- Screen tap-choice · Locales 11 (language-free) · Key: the piece.
- Risks: a crop that is a plain patch (sky) matches everywhere → pieces must contain ≥ 20 % ink of the picture's alpha mask (the silhouette IoU idea, `image-cache/silhouette.js:41-84`); own photos: whole only (same-different-Q1) → refused here.
- Evidence: the old app; "fehlersuchbilder"-adjacent de demand; COVERAGE.md K row 22.

**T2 · Rebuild the picture (grid-match)** — rank 2 (the old `grid-match` app, kept)
```
 ┌─┬─┬─┐   pieces ✂: [🐘-a] [🐘-f] [🐘-c] …   → place every piece on its cell (drag on screen, cut-and-glue on paper)
 │ │ │ │
```
- Child: places all 4–16 tiles of a cut picture on the empty grid.
- Settings: Cut (2×2 … 4×4 / strips horizontal / vertical) · Header picture shown (on/off, level).
- Band K–G1 · Point part–whole, spatial; the old app's core.
- Reuse the same crops; `tap-edit` with a palette (Family F: fill, then Check — D1); K-240 cut lines for the paper version.
- Screen tap-edit · Locales 11 · Key: the picture.
- Risks: two identical tiles (symmetric picture) → tiles compared by crop signature; identical ones accepted in either cell (A4).
- Evidence: the old app (OLD-APP-LESSONS §E "grid-match: picture cut into a grid").

**T3 · Match the close-up** — rank 3
```
 [🔍 close-up of an ear]  ───  [🐘] [🐭] [🐰]
```
- Child: matches a detail crop to the whole picture it belongs to.
- Settings: Pairs (4 / 6) · Crop size (big / small) · Distractor (same theme / any).
- Band K–G1 · Point visual closure (K-069 shows a *part* in place; this isolates the detail).
- Reuse the crop mechanism (crop at 2–3× zoom in the drawn image space), the pair screen.
- Screen tap-order pairs · Locales 11 · Key: the lines.
- Risks: a crop with no distinctive ink → the ink-share floor of T1; two pictures sharing the crop (two grey animals) → crops compared by colour histogram distance ≥ a floor (poison-tested).
- Evidence: topic seed; "find the difference for kids"-adjacent; visual-discrimination gap COVERAGE.md K row 18.

**T4 · Find the twin among look-alikes (turned and flipped)** — rank 4
```
 🐟   →   [🐟] [🐠-flipped] [🐟-rotated] [🐟]     circle the exact twin
```
- Child: finds the identical copy among transforms of the same picture (mirror, rotation, a small change) — the b/d/p/q readiness task.
- Settings: Transforms (flip / rotate / both) · Choices (3 / 4).
- Band K–G1 · Point visual discrimination of orientation (RF.K.1 readiness; COVERAGE.md K row "mirror image" gap).
- Reuse CSS transforms on the same 512-px picture; `chipRow`.
- Screen tap-choice · Locales 11 · Key: the twin.
- Risks: a symmetric picture whose flip equals itself → excluded by the reviewed symmetric list (`data/pt/symmetry.json` the other way round); pictures with text (clocks, signs) excluded.
- Evidence: K-063 picks the mirror image; this picks the *unchanged* one among mirrors — the inverse the b/d confusion needs.

**T5 · Overlapping outlines (which pictures are hiding?)** — rank 5
```
   [tangle of 3 silhouettes overlapped]       🐱 🐶 🐟 🐸 🦋   circle the three that are in the tangle
```
- Child: identifies which objects' outlines overlap in a tangle (figure–ground).
- Settings: Overlapped (2 / 3 / 4) · Choices (5 / 6) · Outline / filled grey.
- Band K–G1 · Point figure–ground perception (the perception strand of de/nl/Nordic Vorschule programmes).
- Reuse `image-cache/silhouette.js` alpha masks (browser: canvas alpha, per ENGINES same-different-Q1), drawn as outlines with `mix-blend-mode`-free SVG strokes; `tap-select`.
- Screen tap-select · Locales 11 · Key: the ringed set.
- Risks: outlines too similar (two round fruits) → the silhouette IoU < 0.72 rule of `silhouette.js:41-84` applied to every pair on the card.
- Evidence: "visuelle Wahrnehmung Vorschule" (de), "percezione visiva"; the shadow engine exists, this is its second use.

### 24. Sorting & Categories (`sorting`) — 5 new

**T1 · Sort by my own labels** — rank 1
```
 ┌──── At school ────┐  ┌──── At home ────┐     the teacher typed both labels and
 │                   │  │                 │     dragged each picture into a bin
```
- Teacher: types 2–3 labels and assigns each chosen picture to a bin in the picker; the child sorts (lines / cut-and-paste / write).
- Settings: Bins (2 / 3) · Answer (lines / cut and paste / write) · Pictures per bin.
- Band K–G2 · Point L.K.5.a, K.MD.B.3 (classify by a teacher-defined rule); the most requested sort (ENGINES sorting-Q1 operator item 6).
- Reuse `types/_shared/sort-to-bins.js`, `primitives/bin.js`; the assignment is the recipe's truth (A14 strict scoring); the page carries the "teacher-made" chip.
- Screen tap-select strict · Locales 11 · Key: the teacher's assignment.
- Risks: a picture in both bins → the picker forbids it; a bin with < 2 pictures → refused with the sentence.
- Evidence: the old `picture-sort` Custom Words mode; "clasificar"/"sortieren"-class searches; ENGINES sorting-Q1.

**T2 · Venn sort (two overlapping rings)** — rank 2
```
    ╭───────╮╭───────╮
    │ red   ││  fruit │      🍎 → middle   🍓 → middle   🚗 → left   🍌 → right   🐸 → outside
    ╰───────╯╰───────╯
```
- Child: places pictures in the left ring, right ring, overlap or outside, by two rules (two picture kinds, or kind × a reviewed attribute).
- Settings: Rules (kind A × kind B / kind × attribute) · Pictures (8 / 12) · Outside allowed (on/off).
- Band G1–G3 · Point 3.MD (classify by two attributes; COVERAGE.md G3 row "two-circle Venn" gap).
- Reuse `G3-353`'s `venn-sort` (`types/g3/G3-353-venn-sort.js`), the reviewed attribute slice (456 keys, sorting-Q1 tier 3).
- Screen tap-select per region (strict, A14) · Locales 11 · Key: the four regions.
- Risks: a picture whose attribute is unreviewed → not drawn (the slice makes it invisible); the overlap must be non-empty (≥ 2) by construction.
- Evidence: topic seed; "two-circle sort" exists only as kind × BIG (G3-353).

**T3 · Who does not belong in the bin?** — rank 3
```
 ┌── vehicles ──┐    🚗 🚌 🐘 🚲      circle the intruder → 🐘
```
- Child: finds the one picture that does not belong in each labelled group (category error detection).
- Settings: Groups (3 / 4 per page) · Intruder (far / near category) · Labels (shown / hidden at level 3 — then the child also names the group).
- Band K–G1 · Point L.K.5.a (categories), L.1.5.a; K-043 "which one is different" has no labelled bin — the label makes the rule explicit.
- Reuse `data/literacy/category-vocab.json` bins ×11, `odd-one-out.js` row, `tap-select`.
- Screen tap-select · Locales 11 · Key: the intruders.
- Risks: a "near" intruder that arguably belongs (a toy car in vehicles) → intruders come from a different reviewed category only.
- Evidence: "leia e pinte palavra intrusa de cada grupo" (pt, report "palavra intrusa" = the intruder word — the reading face of the same task), de "Was passt nicht?".

**T4 · Sort by a reviewed rule (food or not · moves by itself)** — rank 4
```
 ┌── you can eat it ──┐  ┌── you cannot ──┐     🍞 🪨 🍌 🧦 🥕 🚲
```
- Child: sorts by a non-science attribute from the reviewed table (edible / not; moves by itself / needs a push — the two non-science attributes; living/natural are science and excluded).
- Settings: Rule (edible / moves) · Pictures (8 / 12) · Answer (lines / cut).
- Band K–G1 · Point L.K.5.a; everyday categorisation (es "clasificar objetos").
- Reuse `mini tools/object-attributes.json` reviewed slice (`reviewed:true` only, ENGINES sorting-Q1 tier 3), `sort-to-bins.js`.
- Screen tap-select strict · Locales 11 (a theme whose reviewed keys cannot fill both bins is refused for that rule) · Key: the bins.
- Risks: an unreviewed key is never drawn; attribute labels ×11 (~6 strings) authored.
- Evidence: ENGINES tier-3 plan; demand "clasificación de objetos niños" (es), "sortieren nach Merkmalen" (de).

**T5 · Sorting mats and picture cards to cut** — rank 5
```
 page 1: two/three labelled mats       page 2 ✂: 12 picture cards     (no glue — a reusable centre)
```
- Teacher: prints mats + cards for a reusable sorting centre (K-240 glues; this does not).
- Settings: Bins (2 / 3) · Rule (kind / named category / my labels) · Cards (12 / 16).
- Band K–G1 · Point L.K.5.a; material.
- Reuse `bin.js` mats, K-240 cut lines, the category banks.
- Screen material · Locales 11 · Key: page 3 lists the answer.
- Risks: none.
- Evidence: "bildkarten … zur sprachförderung" (de), "woordkaartjes thema" (nl): the laminated-centre appetite.

### 25. Dot to Dot (`dot-to-dot`) — 5 new

Precomputed figures (F2-art §4); the lever is the **label sequence** and the dot filter, so each template is a new reading task on the same proven dots.

**T1 · Dot-to-dot in the locale's alphabet** — rank 1
```
 a · b · c … z · å · ä · ö        (29 letters; sv/fi order; da/no æ ø å)
```
- Child: joins the dots in the alphabet order of her language (K-309 runs a–t only).
- Settings: Picture (index filtered by `fit[N].ok` for the letter count) · Case (small / capitals) · Start (a / from a chosen letter).
- Band K–G1 · Point RF.K.1.d + the national alphabet order (`data/b2/collation.js:5-11`).
- Reuse `primitives/scene-dot-figure.js` labels = the alphabet (per F2-art §4.1 the labels are the sequence; the dots do not move).
- Screen tap-order · Locales en/de/fr/es/pt/it/nl now (≤ 27 letters, 11–33 scenes); **sv/da/no/fi held** until the two-stretch builder yields ≥ 20 pictures (F2-art §4.3, operator item E) · Key: the joined picture.
- Risks: it 21-letter school alphabet vs 26 sorting letters → the `strip` of `collation.js` (the shown alphabet), never the sort list.
- Evidence: topic seed; "alphabet dot to dot to z" (en), "prick till prick alfabetet / bokstäver" (sv), "prik til prik med bogstaver" (da).

**T2 · Sum dot-to-dot (join the answers in order)** — rank 2
```
 ·3+4   ·2+1   ·5+5   ·1+1   ·4+4 …   join from the smallest answer upwards
```
- Child: solves each label, then joins the dots in order of the answers (1, 2, 3 …).
- Settings: Operation (+ / −) · Range (to 10 / 20) · Dots (10 / 20).
- Band G1 · Point 1.OA.C.6 fluency in a picture.
- Reuse `scene-dot-figure.js` with expression labels; the label ink box gate (`K-285.verify :251-258`, canvas `measureText` per F2-art) decides which scenes have room for "3+4" (≈ 2.4× a digit — the cbn finding) → the index filters.
- Screen tap-order (by answer) · Locales 11 · Key: the joined picture + the answers.
- Risks: two labels with the same answer → answers distinct 1..N by construction (each dot k gets an expression equal to k).
- Evidence: topic seed; "unisci i puntini con le tabelline" (it 33, report — the ×-table variant at level 3), "punkt zu punkt bis 1000" (de).

**T3 · Number-word dot-to-dot** — rank 3
```
 ·one  ·two  ·three …  (de ·eins ·zwei …)
```
- Child: reads number words and joins them in order.
- Settings: Range (1–10 / 1–20) · Picture.
- Band K–G1 · Point K.CC.A.3 + reading number words.
- Reuse `lib/number-words.js` labels; width-gated per scene (the longest word of the range vs the label ink box — fi "yhdeksäntoista" is 14 letters → fewer scenes).
- Screen tap-order · Locales 11 (scene availability varies: the index records the fit at the longest word) · Key: the picture.
- Risks: label overlap → the legibility verify (`K-285.verify :261-271`) is the gate; scenes failing it are not offered for that range.
- Evidence: F2-art gap list; "number chart number words" (en), "números en letras del uno al 20" (es).

**T4 · Even dots only (parity filter)** — rank 4
```
 ·1 ·2 ·3 ·4 …  join ONLY the even numbers: 2 → 4 → 6 …; the odd dots are decoys
```
- Child: skips the odd-numbered dots and joins the evens (or the odds); a decoy dot sits off the outline.
- Settings: Keep (even / odd) · Range (to 20 / 40) · Picture.
- Band G1–G2 · Point 2.OA.C.3 (identify odd/even) inside the dot-to-dot motivation.
- Reuse the 20-dot fit with labels 2,4,…,40 on the outline and odd labels placed on free paper (the v2 "free paper only" placement, `scene-dot-figure.js:250-261` per F2-art) as decoys.
- Screen tap-order (even dots; tapping an odd dot is a wrong tap at Check — D1) · Locales 11 · Key: the picture.
- Risks: a decoy must never sit on the outline → placed by the same free-paper rule; the key draws only the even path.
- Evidence: F2-art gap "two-colour dots (odd/even)"; "partall og oddetall spill" (no), "even en oneven getallen groep 4" (nl).

**T5 · Capital–small alternating (A a B b …)** — rank 5
```
 ·A ·a ·B ·b ·C ·c …    join capital, then its small letter, then the next capital
```
- Child: joins the alphabet alternating cases — case pairing in motion (K-222 pairs by lines).
- Settings: Range (A–M / A–Z, i.e. 26 or 52 dots) · Picture.
- Band K · Point RF.K.1.d (recognise upper- and lowercase letters).
- Reuse `scene-dot-figure.js` with a 2N-dot fit (the index records `fit[26]`/`fit[52]`; 52 dots need the big scenes → the picker filters; a half alphabet at 26).
- Screen tap-order · Locales 11 (the same alphabet-length caveat as T1 for the Nordic 29 → 58) · Key: the picture.
- Risks: letters whose cases look alike (C/c, O/o, S/s) make the pairing trivial there → fine (it is still the order).
- Evidence: "letter tracing / alphabet dot to dot" (en), "prick till prick bokstäver" (sv).

### 26. Color by Number & Code (`color-by-number`) — 6 new

All keys run on the precomputed designs (F2-art §5); a key is offered on a design only where every label fits its region (`minLabelR` in the index).

**T1 · Colour by sight word** — rank 1
```
 key: the = red   and = blue   you = green      regions carry the words
```
- Child: reads the sight word in each region and colours by the key.
- Settings: Word list (bank / my list, 3–6 words) · Picture · Level.
- Band K–G1 · Point RF.K.3.c (high-frequency words); the de "Lese-Mal-Blätter" / fr "coloriage magique lettres / mots" tradition.
- Reuse `lib/cbn-render.js labelArt` for word labels (a word is ≈ 2–4× a digit → `r ≥ 15–20` designs only, the index filters), `data/literacy/sight-words.js` ×11 (24 per locale; the ≥ 60 authoring of ENGINES #41).
- Screen tap-paint · Locales 11 · Key: the coloured design.
- Risks: a word too wide for every region → the picker shows only designs that fit the longest word; own words: letters claim.
- Evidence: topic seed; "coloriage magique lettres" (fr 38, report), "kleuren op code letters" (nl), "lese-mal-blätter klasse 1" (de).

**T2 · Colour by odd / even** — rank 2
```
 key: even = yellow   odd = blue      regions carry numbers 1–50
```
- Child: decides each region's parity and colours — a two-colour key that runs on **every** design (numbers fit everywhere).
- Settings: Range (to 20 / 50 / 100) · Picture · Third colour for multiples of 5 (level 3).
- Band G1–G2 · Point 2.OA.C.3.
- Reuse `labelArt` number labels (every design), the two-crayon key row (`cbn-type.js`).
- Screen tap-paint · Locales 11 · Key: the design.
- Risks: a design with an uneven split of regions gives one colour dominance → fine (the picture decides); gate: each colour ≥ 1 region.
- Evidence: F2-art gap; "rechnen und ausmalen 2 klasse" (de), "kleuren op code rekenen" (nl), "pinte conforme o resultado" (pt).

**T3 · Colour by multiplication fact** — rank 3
```
 key: 12 = red  18 = blue  24 = green    regions carry 3×4, 6×3, 4×6 …
```
- Child: computes each region's product and colours by the answer key.
- Settings: Tables (chips) · Picture (the ~20 designs with room for an expression) · Colours (3–6 answers).
- Band G3 · Point 3.OA.C.7.
- Reuse the code-key path (`labelArt` re-measured live for expressions, F2-art §5.2), `notation.js` glyph (sv `·`).
- Screen tap-paint · Locales 11 · Key: the design.
- Risks: only ~20 designs have `r ≥ 15` → the picker filters; the gate 15 `no-foreign-sign` on the labels.
- Evidence: topic seed; "color by number multiplication" (en head term), "kleuren op code tafels / keersommen" (nl), "rechnen und ausmalen 3. klasse" (de).

**T4 · Colour by letter (and by first sound)** — rank 4
```
 key: m = red  s = blue  t = green     regions carry letters (level 1) · small pictures (level 3: colour by the picture's first sound)
```
- Child: colours by the letter in each region; at level 3 the regions carry tiny reviewed pictures and the key maps first sounds to colours.
- Settings: Letters (chips, greyed where refused — alphabet-Q1) · Picture · Mode (letter / first sound).
- Band K · Point RF.K.1.d (letters), RF.K.3.a (first sounds).
- Reuse `labelArt` (a letter fits every design); the sound mode needs picture labels ≈ 3× a digit → the big-region designs only; words from the approved first-sound sets (`data/b3/letter-of-the-week.js`, reviewed-only per phonics-Q1).
- Screen tap-paint · Locales 11 (sound mode only for letters with ≥ hits + 4 reviewed items) · Key: the design.
- Risks: a wrong-sound picture (en "knife") → the deny-onset lists of alphabet-Q1; the picture label must be legible at region size → ≥ 24 px, else the design is not offered.
- Evidence: topic seed; "coloriage magique gs lettres" (fr), "buchstaben … ausmalen" (de).

**T5 · Colour by number word** — rank 5
```
 key: drei = red   fünf = blue   acht = green      regions carry the words
```
- Child: reads number words in the regions and colours by the key.
- Settings: Range (1–10 / 11–20) · Picture (width-gated) · Level.
- Band K–G1 · Point K.CC.A.3 + number words.
- Reuse `lib/number-words.js`, the word-label width gate of T1.
- Screen tap-paint · Locales 11 (fi/de long words → fewer designs) · Key: the design.
- Risks: as T1.
- Evidence: F2-art gap; "nombres en lettres cp" (fr), "zahlwörter" (de).

**T6 · Colour by your own key (ungraded)** — rank 6
```
 key: 1 = ______   2 = ______   3 = ______      (the teacher writes the colours — or the child chooses)
```
- Teacher: renames the crayons (or leaves them blank for the child); the page is a numbered design with an open key.
- Settings: Picture · Key slots (3–6) · Labels (my text / blank).
- Band K–G1 · Point following a key; open.
- Reuse the number labels; the key chips as `edits[op:'word']` (ARCHITECTURE §4.3), never graded (the screen's answer map stays the design's crayons — F2-art §5.1).
- Screen tap-paint (ungraded: any colour per number is "done") · Locales 11 · Key: none ("teacher-made" chip).
- Risks: none; the fully-painted rule holds (every region has a number).
- Evidence: F2-art gap; "colour by your own key" seed in coloring-pages; "måla efter siffror egen bild" (sv).

### 27. Coloring Pages (`coloring-pages`) — 6 new

The composer is ENGINES Part 3 §E (BW library only, never mixed with colour); own photos are placed as-is (F2-art §9.4).

**T1 · Colour and trace the word** — rank 1
```
 ┌──────────────┐
 │   🐘 (BW)    │     e̲l̲e̲p̲h̲a̲n̲t̲   elephant   ________
 └──────────────┘
```
- Child: colours the picture and traces/writes its word (vocab word in the locale).
- Settings: Pictures (BW picker, 1 / 2) · Word (trace / trace + write / none) · Lines (on/off).
- Band K–G1 · Point RF.K.1 + L.K.2 (write the word for the picture).
- Reuse the composer (`types/_shared/coloring-page.js`), `trace-path.js strokeWordLane`, `letter-strokes.js` (the locale print model rule applies to the trace lane: en/es/pt now).
- Screen printable (+ tap-paint where CBN regions exist) · Locales 11 for colour + word; the trace lane in en/es/pt until overrides are signed (the page then shows the printed word without a trace lane) · Key: none.
- Risks: a BW picture whose vocab word is multi-word ("ice cream") → the lane keeps the space (A11).
- Evidence: topic seed; "coloriage … écriture"-class, "dibujos repasar y colorear niños" (es, report), "disegni tratteggiati colorare" (it).

**T2 · Colour the scene (several pictures composed)** — rank 2
```
 ┌──────────────────────────────┐
 │  🐓   🐄      🏠     🌳 (BW)  │   a composed farm scene from library drawings
 └──────────────────────────────┘
```
- Child: colours a composed scene of 5–8 BW drawings from one theme (no overlap, by `mixedScatter` construction).
- Settings: Theme (BW themes) · Pictures (5 / 8) · Big one in front (on/off).
- Band K–G1 · Point open colouring; fine-motor.
- Reuse `mixedScatter` at large icons (`templates/components.js:68`, per ENGINES Part 3 §E "iconPx ≤ cell, no overlap by construction").
- Screen printable · Locales 11 · Key: none.
- Risks: scale mismatch (a cow the size of a hen) → the scene uses one icon size per card (honest "icon" scale, not a realistic scene); the gallery card shows it.
- Evidence: topic seed; "coloring pages … for kids" (en), "colorear … niños" (es).

**T3 · Colour by your own key (no regions)** — rank 3
```
 ┌───────────┐     my key:  ■ ______   ■ ______   ■ ______
 │  🐘 (BW)  │     (the teacher writes "ears = grey", the child follows)
```
- Teacher writes a legend of up to 6 swatches + words; the child follows it on a plain BW picture (no numbered regions — the teacher's words are the key).
- Settings: Picture · Swatches (3–6) · Legend text (my words).
- Band K–G1 · Point following written instructions (reading-to-do).
- Reuse the composer's `ownKey` legend (Part 3 §E); never graded.
- Screen printable · Locales 11 · Key: none.
- Risks: none (open).
- Evidence: topic seed.

**T4 · Big and small (the same picture at two sizes)** — rank 4
```
 ┌───────────────┐ ┌────┐
 │  🐘 big (BW)  │ │ 🐘 │     colour the big elephant blue and the small one grey
 └───────────────┘ └────┘
```
- Child: colours the same drawing at two sizes by a two-line instruction (size words).
- Settings: Picture · Sizes (2 / 3) · Instruction (size words / open).
- Band K · Point K.MD.A.2 size language + colouring.
- Reuse the composer with two frames of one BW picture; size words from the measurement strings ×11.
- Screen printable · Locales 11 · Key: none.
- Risks: none.
- Evidence: F2-art gap list; "big and small" (K-032) is the compare face — this is the colouring face.

**T5 · Colour and write a sentence** — rank 5
```
 ┌───────────┐
 │ 🐘 (BW)   │   ____________________________
 └───────────┘   ____________________________     (two writing lines, sentence starter optional)
```
- Child: colours, then writes one or two sentences about the picture (a starter ×11 optional: "This is …", "Das ist …").
- Settings: Picture · Lines (2 / 4) · Starter (on/off).
- Band G1–G2 · Point W.1.3 / L.1.1.j (write simple sentences).
- Reuse the composer's `lines` + `trace-path.js rulingBlock`; starters from `data/b2/sentences.js`-style literals (3 ×11, exist in the picture-writing bank G2-299).
- Screen printable · Locales 11 · Key: none.
- Risks: none (open).
- Evidence: "produção de texto com imagem 1 ano" (pt), "schreiben bild klasse 1" (de), "production d'écrit cp" (fr) — the K-1 entry to picture writing.

**T6 · Mini colouring booklet (fold)** — rank 6
```
 ┌─────┬─────┐
 │ 🐘  │ 🦒  │   four BW pictures laid out to fold into an 8-page booklet (fold lines, cover with the theme word)
 ├─────┼─────┤
 │ 🐒  │ 🦁  │
 └─────┴─────┘
```
- Teacher: prints and folds a booklet; children colour page by page; cover word in the locale.
- Settings: Theme · Pictures (4 / 8) · Cover word (theme name / my word).
- Band K–G1 · material.
- Reuse the composer (rotated frames for the fold layout), fold-line glyphs (K-240 cut-line style, dashed + a fold icon).
- Screen material · Locales 11 · Key: none.
- Risks: the fold layout prints two frames upside down → a measured layout, verified by the visual gate (the frames are rotated by the engine, not by the teacher).
- Evidence: "coloring book"-class demand ("color by number books" en, "coloriage … à imprimer"); the booklet is the format teachers print for free-choice time.

### 28. Mazes (`mazes`) — 6 new

Grid mazes are generated live (`lib/maze.js`, unique by construction); scene mazes come from the pinned pools and the live oracle (F2-art §8). The odd/even and pattern rule mazes listed under other makers live **here** (cross-link cards there).

**T1 · Grid maze with my pictures (and my photo)** — rank 1
```
 🐶 ┌─┬───┬───┐        the start and the goal are the teacher's pictures (library, any theme — or an own photo, whole)
    │ │   │   │
    └─┴───┴─┘ 🦴
```
- Child: draws the way from the start picture to the goal picture.
- Settings: Size (easy / medium / hard / giant) · Start picture · Goal picture (library or own photo).
- Band K–G1 · Point pencil control, spatial; the K-242 family personalised.
- Reuse `lib/maze.js` (spanning tree, `maze.js:19-40`), `K-242.verify` (`:58-75`); own photo whole in a rounded frame (F2-art §8.4); the `trace-path` screen over the cell graph (new, small — F2-art §8.6).
- Screen trace-path · Locales 11 · Key: the path.
- Risks: a photo with the road colour → the frame is opaque white (F2-art rule); student links with an own photo: refused (ARCHITECTURE §18-B1).
- Evidence: topic seed; "labyrinth rätsel erstellen / kinder erstellen" (de — teachers want to *make* mazes), "maze puzzles for kids" (en).

**T2 · Picture-path rule maze (step only on …)** — rank 2 (the old `picture-path` app, kept)
```
 🐱 🐶 🐱 🐱          step only on cats; the one cat-path leads from the start to the goal
 🐶 🐱 🐶 🐱
```
- Child: finds the one path through a grid of pictures stepping only on the chosen kind; collectibles and distractors as in the old app.
- Settings: Kind (the step-on picture) · Grid (5 / 7 / 9) · Collect (on/off) · Copies (pages).
- Band K–G1 · Point visual discrimination + path finding; the old app's rule.
- Reuse the looped rule faces of the hm engine (`lib/hm-rules.js R.assignPredicate`, `K-405:75` per F2-art §8.6) with a picture predicate — or the grid engine with a predicate overlay for the K sizes; pinned seeds for the scene version.
- Screen trace-path · Locales 11 · Key: the path.
- Risks: a second valid path (two cat routes) → the rule face proves one valid route by search (`hm-maze.js generateLooped` per F2-art); D3 revisits legal where the rule allows.
- Evidence: the old app (OLD-APP-LESSONS §E "picture-path: game modes"); "juegos de laberinto niños" (es).

**T3 · Collect the letters (the route spells the word)** — rank 3
```
 🐸 ─h─┬─o─┬─u─┬─s─┬─e─ 🏠      letters on the route spell the goal's word; decoy letters on dead ends
```
- Child: draws the way; the letters passed in order spell the goal picture's word; writes it at the end.
- Settings: Scene / grid · Word (the goal's vocab word) · Case.
- Band K–G1 · Point RF.K.3 + the word's spelling; literacy inside the maze.
- Reuse the hm label faces (letters on route stones, per locale pins as for the alphabet maze K-409), `pictureIndex` words; the end word box (`type-word`).
- Screen trace-path + type-word · Locales 11 (the word is the locale's) · Key: path + word.
- Risks: a dead-end letter set that also spells a real word → decoys are drawn so no dead-end sequence is in the approved list; A11 multi-word goals excluded.
- Evidence: F2-art gap "a maze with a word to collect"; "alfabetização labirinto" (pt), "labyrint dansk" (da).

**T4 · Write the directions (count the turns)** — rank 4
```
 maze solved in grey → write the route:  ↑ 2  → 3  ↓ 1  → 2     turns: [ 3 ]
```
- Child: reads a solved grid maze and writes its route as direction steps and the number of turns (the maps link).
- Settings: Grid (5 / 7) · Write (arrows + counts / turns only) · Compass words (on at level 3: N/E/S/W).
- Band G1–G2 · Point 2.G/maps readiness; the treasure-hunt move frames per locale (A7, maps-grids T1).
- Reuse `lib/maze.js` solution path, arrow glyphs (language-free), `answerBox` cells.
- Screen type-number (turns) + the arrow steps as `tap-order`? → kept printable for the steps (key shows them) with `type-number` for the turn count · Locales 11 · Key: the route + turns.
- Risks: a route description with two valid segmentations ("→ 3" vs "→ 1, → 2") → the key counts turns, and steps are maximal straight runs (stated in the instruction).
- Evidence: F2-art gap "count the turns"; "karten himmelsrichtungen" (de), the treasure-hunt app's directions.

**T5 · Three exits — which one?** — rank 5
```
 🐰 → ┌───┬───┐ → exit A
      │   │   │ → exit B      only one exit is reachable; circle it
      └───┴───┘ → exit C
```
- Child: finds which of three exits the start reaches and circles it (two exits are walled off).
- Settings: Exits (2 / 3) · Size · Scene / grid.
- Band K–G1 · Point reasoning about connectivity (not only tracing).
- Reuse the grid engine with two added wall closures (connectivity recomputed; exactly one exit in the start's component — asserted); the hm `UNIQUE`/`REACH` oracle for scenes (F2-art §8.1).
- Screen tap-choice (exit) + trace-path · Locales 11 · Key: the reachable exit + path.
- Risks: a 1-in-3 guess → the page has 3–4 mazes with the answer exit balanced (gate 8).
- Evidence: "labyrinth rätsel mit 3 ausgängen" (de — verbatim demand), "labyrinth rätsel mit lösung".

**T6 · Pattern maze (follow the sequence)** — rank 6
```
 🔴🔵🔴🔵 … step on the stones in the pattern order; a wrong-colour stone is a dead end
```
- Child: steps on stones following an AB/ABC pattern (or a skip-count: 2, 4, 6 — the G2-392 engine with a chosen step).
- Settings: Rule (AB / ABC / count by 2, 3, 5, 10) · Scene (pinned pools per rule) · Size.
- Band K–G2 · Point patterns strand / 2.NBT.A.2 skip counting.
- Reuse the looped rule faces (`hm-rules.js`, the K-411 number-run and G2-392 skip-count engines), per-locale pins (the labels are language-free here).
- Screen trace-path · Locales 11 · Key: the path.
- Risks: the pinned-pool repeat limit (12–20 seeds per scene × rule) → "New version" changes scene after the pool (F2-art operator item A).
- Evidence: the odd/even maze seed (odd-even topic) generalised; "labyrint matematik" (da), "juegos de sumas y restas laberinto" (es).

### 29. Find the Differences (`find-the-differences`) — 5 new

**T1 · Odd panel out (four near-identical panels)** — rank 1
```
 ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │ 🏡 │ │ 🏡 │ │ 🏡*│ │ 🏡 │    one panel has one change — circle it
 └────┘ └────┘ └────┘ └────┘
```
- Child: compares four copies of a scene and circles the one that differs (one op on panel k).
- Settings: Scene · Panels (3 / 4) · Change kind (big / subtle by level).
- Band K–G1 · Point visual discrimination (the K.MD-adjacent perception strand; COVERAGE.md K row 18).
- Reuse `lib/fd-compose.js pickOps` (one op), `lib/fd-render.js renderPanel` ×4 (split module, ENGINES-ART §2.2), the live `fd-browser-diff` proving the change is visible (`lib/fd-browser-diff.js:19-89`).
- Screen tap-choice (panel) · Locales 11 · Key: the panel + the change ringed.
- Risks: a 1-in-4 tell by position → the changed panel index from the rng, balanced per page (gate 8); four 300-px panels fit the body at ≤ 2 rows.
- Evidence: F2-art gap list; "spot the difference … game" (en), "find fem fejl børn" (da), "jeu des différences … maternelle" (fr).

**T2 · Count the kinds (how many are gone, how many are new?)** — rank 2
```
 picture 1 / picture 2 →   gone: [ 2 ]   new: [ 1 ]   changed colour: [ 2 ]
```
- Child: finds all differences and sorts them by kind, writing a count per kind (G1-413 asks only the total).
- Settings: Differences (5 / 7) · Kinds counted (gone / new / colour / moved — 2 or 3 columns).
- Band G1–G2 · Point categorisation + counting on a visual task; the "what changed" strand.
- Reuse `pickOps` with per-kind quotas (`fd-compose.js:176` "no kind more than a third"), the kind words ×11 from the b7 bank (G1-414 strips).
- Screen type-number ×k (+ tap-select the differences) · Locales 11 · Key: the counts + rings.
- Risks: a `move` that could read as "gone + new" → the counted kinds exclude `move` unless the level names it; the kind of each op is in the plan (`data-lcs-fd-plan`, METHOD-fd §5), never re-derived by the child's reading.
- Evidence: G1-413 (how many) + G1-414 (tick the words) exist; the *per-kind* count is the step between them.

**T3 · Look, fold, find (memory differences)** — rank 3
```
 ┌───────────┐  fold line  ┌───────────┐
 │ picture 1 │ ─ ─ ─ ─ ─ ─ │ picture 2 │   look at 1 for a minute, fold it away, find the 3 changes in 2
```
- Child: studies picture 1, folds it back, then circles what changed in picture 2 from memory.
- Settings: Differences (3 / 5) · Change kind (big only) · Fold (vertical / horizontal).
- Band G1–G2 · Point visual memory (the G2-391 "draw from memory" precedent in how-to-draw).
- Reuse the FD pair with the fold-line glyph and `strings.memory.foldWord` ×11 (exists for G2-391, ENGINES-ART §6.6); the screen hides panel 1 after a timer-free "I'm ready" tap (no countdown — the no-timer rule).
- Screen tap-select (panel 2 only; panel 1 hidden after the tap) · Locales 11 · Key: the rings.
- Risks: subtle ops are unfair from memory → `minArea` at the K floor (`K-395:39`) for this face regardless of level.
- Evidence: "fehlersuchbilder … gedächtnis"-class de, the memory face of how-to-draw; no deck does memory differences.

**T4 · Draw what is missing** — rank 4
```
 picture 1 (complete)   picture 2: three things are gone — DRAW them back in
```
- Child: compares and draws the missing items into picture 2 (production, not circling; K-399 circles the empty places).
- Settings: Missing (2 / 3) · Guide circles (dashed, on at level 1 / off).
- Band K–G1 · Point observation + drawing; fine-motor.
- Reuse `pickOps` with `remove` only, the key = picture 1; dashed guide rings from the hotspot rects.
- Screen printable (drawing) · Locales 11 · Key: picture 1.
- Risks: none graded; the removed items are whole drawings (one op = one layer), so "what to draw" is unambiguous.
- Evidence: "what is missing?" (K-399) is the recognition face; drawing it back is the classic Vorschule "Was fehlt? Zeichne es" page.

**T5 · Find the two that are the same** — rank 5
```
 [🏡-a] [🏡-b] [🏡-c] [🏡-d] [🏡-e]     two panels are identical; every other one has one change — circle the twins
```
- Child: among five panels finds the two identical ones (each other panel carries a different single change).
- Settings: Panels (4 / 5) · Change kind.
- Band G1–G2 · Point visual discrimination (the twins task on scenes, K-062's bigger sibling).
- Reuse one `pickOps` op per non-twin panel, `renderPanel` ×5 at ~250 px; the diff gate proves each change is visible.
- Screen tap-select (two panels) · Locales 11 · Key: the twins.
- Risks: five panels at 250 px lose the small ops → `minArea` raised for this face (the K floor); the twin positions balanced (gate 8).
- Evidence: "find the twins" (K-062) exists for pictures; on scenes it is the 5-panel "finn fem fel" puzzle-book page (sv/da/no demand "finn fem fel bok").

### 30. How to Draw (`how-to-draw`) — 5 new

**T1 · Shapes-only directed drawing (the youngest level)** — rank 1
```
 step 1: ○         step 2: ○ + △ ears      step 3: eyes · · and a smile      → a cat from circle and triangles
```
- Child: builds an animal from circles, triangles and rectangles in 3–4 steps (the 22 hand-drawn vector lessons, `data/htdv`).
- Settings: Picture (the `GUIDE_OK` vector lessons only) · Steps (3 / 4) · Shape names printed (on/off — geometry link).
- Band PreK–K · Point K.G.B.6 (compose shapes into pictures) + directed drawing.
- Reuse `lib/htd-vector.js` lessons (laws 1–4, `:19-24`), `templates/components-b7/how-to-draw.js` ladder; shape names ×11 from `data/geometry-words.js`.
- Screen printable · Locales 11 · Key: none (the model).
- Risks: fitted ellipses never match a library drawing (METHOD-htd §13) → vector lessons only, never derived shapes.
- Evidence: topic seed; "apprendre à dessiner enfant 6 ans" (fr), "disegno guidato scuola infanzia" (it), "leren tekenen kind 4 jaar" (nl), "tegn en kat trin for trin" (da).

**T2 · Draw it bigger on the grid (enlarge)** — rank 2
```
 ┌─┬─┬─┐  3×3 model      ┌───┬───┬───┐  big empty grid (cells 2×)
 │ 🐸  │                 │           │
```
- Child: copies the gridded drawing onto a grid with bigger cells (scaling), then once more without the grid.
- Settings: Picture (lesson) · Grid (3 / 4 / 5) · Scale (1.5× / 2×).
- Band G1–G2 · Point proportion/scaling readiness; the fr "agrandir sur quadrillage" classic.
- Reuse `htdGrid` (`components-b7/how-to-draw.js:112`), two grids at different `cellPx`.
- Screen printable · Locales 11 · Key: the drawing at the big size.
- Risks: the big grid overflows the body at 5×5 × 2× → the fit step limits the scale per grid size.
- Evidence: topic seed; symmetry-grids T4 is the pixel-figure version, this is the drawing version.

**T3 · Draw the other half** — rank 3
```
 ┌──────┬──────┐
 │ 🦋 left │      │   the left half of a symmetric drawing is printed; draw the right half (dashed guide at level 1)
```
- Child: completes the mirror half of a symmetric lesson drawing.
- Settings: Picture (reviewed symmetric lessons only) · Guide (dashed trace / grid / none).
- Band K–G2 · Point symmetry in drawing.
- Reuse `lib/htd-render.js fullSvg` clipped to one half, the reviewed symmetric list (F2-art §7.1, never the raw index).
- Screen printable · Locales 11 · Key: the whole drawing.
- Risks: the perspective trap → reviewed list only (G1-432 traces the half; this one draws it — the step up).
- Evidence: F2-art gap list; "symétrie dessin" (fr), "zeichnen lernen schritt für schritt" (de).

**T4 · Draw the family (a scene from several lessons)** — rank 4
```
 ┌───────────────────────────────┐
 │ steps: 🐓  🐄  🐖  (3 small ladders)  │   draw all three into the empty farm below
 └───────────────────────────────┘
```
- Child: follows three compact step ladders and draws the figures into one scene (the G1-417 "draw it in the scene" with several characters).
- Settings: Theme (lessons from one theme) · Figures (2 / 3) · Scene background (on/off).
- Band G1–G2 · Point composition; the themed "farm / zoo / sea" drawing pages teachers print for projects.
- Reuse `htd-render.js stepSvg` ladders at small size, the scene plates of `K-396` mode `scene`.
- Screen printable · Locales 11 · Key: the three drawings.
- Risks: three ladders + a scene exceed the body → 2 figures at level 1; the stack budget measured (METHOD-htd §9).
- Evidence: F2-art gap; "how to draw … animals" (fr "apprendre à dessiner des animaux"), "rita steg för steg djur" (sv).

**T5 · Step cards to cut and order** — rank 5
```
 ✂ [step 3] [step 1] [step 4] [step 2]   cut, put in order, then draw     (G1-418 orders on the page; this is the card game)
```
- Child: cuts the shuffled step cards, orders them, draws the figure.
- Settings: Picture · Steps (4 / 5) · Numbers on the back (on/off).
- Band K–G1 · Point sequencing + drawing; material.
- Reuse the lesson steps (`steps[k].kind` keeps structure first, details last — the reorder law of F2-art §6.1), K-240 cut lines.
- Screen material · Locales 11 · Key: the order on page 2.
- Risks: a lesson whose middle steps are interchangeable (two equal detail steps) → only lessons with a strict `kind` ladder are offered (the index flag).
- Evidence: "images séquentielles"-style demand (fr 40) applied to drawing; G1-418 exists on-page.

### 31. Picture Tracing (`picture-tracing`) — 4 new

Twenty faces already cover the band ladder; the new value is **freedom** (any of the 1,302 traceable drawings, F2-art §7) plus three cross-strand pages. Four new tasks; more would be the same page with other pictures.

**T1 · Trace any library picture** — rank 1
```
 ┌──────────────────────┐
 │  🦒 (dashed trace)   │    one picture, the band's dash and thickness; look-model beside it (option)
 └──────────────────────┘
```
- Child: traces a teacher-chosen drawing (single-picture faces over the whole index).
- Settings: Picture (1,302 index, filtered by band ≥ the Level) · Line (dashed / dotted) · Thickness (by age) · Model beside (on/off).
- Band PreK–G1 · Point pencil control (the pre-writing strand of every framework).
- Reuse the new trace store `pt/<theme>/<noun>.json` (F2-art §7.2), `lib/pt-render.js`, `K-418.verify` band metrics (`:83-90`).
- Screen printable · Locales 11 (language-free; the name as a caption from vocab, optional) · Key: none.
- Risks: a P3 drawing on a PreK page → the index band filter (never a lower band).
- Evidence: topic seed; "tracing pictures for kids" (en), "dibujos repasar niños de 3 años" (es), "disegni tratteggiati per bambini di 4 anni" (it), "desenhos pontilhados de animais" (pt).

**T2 · Trace and colour by number** — rank 2
```
 ┌──────────────────────┐
 │  🐑 dashed + numbers │    trace the lines, then colour by the key   key: 1 = white  2 = black  3 = green
 └──────────────────────┘
```
- Child: traces the outline, then colours by number (the CBN regions of the same drawing).
- Settings: Picture (the ~200 drawings with both a trace and CBN regions) · Line · Key size.
- Band K–G1 · Point pencil control + numeral recognition.
- Reuse the trace + `lib/cbn-render.js` regions/labels for the same design (F2-art §5), the key row.
- Screen tap-paint (colour) · Locales 11 · Key: the coloured design.
- Risks: the trace dashes and the region numbers collide → numbers placed by `labelArt` away from the ink (its own rule), dashes on the ink; the collision gate 14.
- Evidence: F2-art gap; "trace and color the picture" (K-425) is free colouring — the numbered key is the step up; "dibujos repasar y colorear" (es).

**T3 · Trace the picture, then write the word** — rank 3
```
 ┌───────────┐
 │ 🐟 dashed │   f̲i̲s̲h̲    fish    _______      (G1-430 generalised to any vocab drawing)
 └───────────┘
```
- Child: traces the drawing, traces its word, writes it.
- Settings: Picture (index ∩ vocab with a traceable word) · Word rows (trace / trace + write) · Case.
- Band K–G1 · Point RF.K.1 + L.K.2 (write the word).
- Reuse the trace store, `trace-path.js strokeWordLane`, `letter-strokes.js` (print-model rule: en/es/pt now, others after overrides).
- Screen printable · Locales en/es/pt now; the other 8 when their letter overrides are signed (until then the word is printed, not traced) · Key: none.
- Risks: as coloring T1 (multi-word, model rule).
- Evidence: F2-art gap; "palabras punteadas" (es), "palavras pontilhadas" (pt), "parole tratteggiate" (it) — tracing *words* is a head term in three locales.

**T4 · Tracing booklet (4 pictures, one theme)** — rank 4
```
 ┌─────┬─────┐
 │ 🐘  │ 🦒  │   four traces laid out to fold (as coloring T6), theme word on the cover
 ├─────┼─────┤
```
- Teacher: prints a fold booklet of four traces from one theme at one band.
- Settings: Theme · Band · Pictures (4 / 8).
- Band PreK–K · material.
- Reuse the trace store + the fold layout of coloring T6.
- Screen material · Locales 11 · Key: none.
- Risks: as coloring T6.
- Evidence: "tracing worksheets … dinosaur" (en, report: a themed set), "tracing preschool".

## B4 — writing

### 32. Pencil Control Lines (`pre-writing`) — 4 new

Nine faces already cover every stroke family (lines, zigzags, waves, loops, spirals, shapes, picture-to-picture). Four new *tasks*; the much-searched left-handed variant is a layout control, not a template (§"For the operator" A).

**T1 · Cutting lines (scissor skills)** — rank 1
```
 ✂ ─────────────────     ✂ ╱╲╱╲╱╲╱╲     ✂ ∿∿∿∿∿∿     ✂ ──╮╭──    (a picture at the end of each strip)
```
- Child: cuts along straight, zigzag, wavy and cornered lines; level 3: cuts out a simple shape.
- Settings: Strokes (multi-select) · Strips (4 / 6) · Picture at the end (theme).
- Band PreK–K · Point fine-motor (the pre-writing/scissor strand of every Vorschule/maternelle programme; es "grafomotricidad", fr "découpage").
- Reuse `primitives/trace-path.js` stroke generators with a **NEW** `cut-line` style (dashed heavy + scissors glyph at the start; the K-240 scissor line generalised); strips laid horizontally.
- Screen material (no screen — cutting) · Locales 11 · Key: none.
- Risks: strips too close for scissors → ≥ 24 mm between strips (measured, the fill rule bounds the count).
- Evidence: topic seed; "graphisme découpage"-class fr, "schneiden lernen"-class de, "recortar … niños" es; no deck has cutting.

**T2 · Letter-shape strokes (the strokes letters are made of)** — rank 2
```
 ∩∩∩∩   ∪∪∪∪   ɔɔɔɔ   l l l l   ⌐⌐⌐⌐      (the arches, cups, round and stem strokes of the locale's print model)
```
- Child: traces the component strokes of letters before letters (arches for m n h; cups for u; the c-curve of c a d g o; stems).
- Settings: Stroke families (chips) · Rows (3 / 5) · Size (big / standard).
- Band PreK–K · Point RF.K.1 readiness; it "pregrafismo lettere" (demand 35), es "grafomotricidad de letras" (43), de "Schwungübungen Buchstaben".
- Reuse `trace-path.js` strokes; the families derived from the locale's letter model (`data/tracing/letter-strokes.js` + the `overrides/<loc>.js` of letter-tracing-Q1) so a de child traces the Grundschrift hook, not a US arch.
- Screen printable · Locales en/es/pt now (print-us); others with their override files · Key: none.
- Risks: a family drawn from the wrong model → the family set is computed from the model data, never authored by hand.
- Evidence: "pregrafismo lettere" (it), "grafomotricidad de letras / vocales" (es), "schwung buchstaben" (de head).

**T3 · Dot-grid patterns (join the dots as the model)** — rank 3
```
 · · · ·    · · · ·
 ·╱·╲· ·    · · · ·      copy the zigzag through the dots
 · · · ·    · · · ·
```
- Child: reproduces a model path through a dot grid (a geoboard on paper; the fr "graphisme quadrillage" class).
- Settings: Grid (4×4 / 5×5) · Model (zigzag / steps / diamond / my own at level 3) · Rows (2 / 3).
- Band K–G1 · Point spatial copying (COVERAGE.md K row "copy a picture square by square" adjacent; the SLO "ruimtelijke oriëntatie").
- Reuse `primitives/coord-grid.js` dot layout, `trace-path.js` for the model path; verifier compares the dot sequence.
- Screen printable (drawing; a `trace-path` screen over the dots is possible — optional) · Locales 11 · Key: the model.
- Risks: none.
- Evidence: "graphisme quadrillage gs" (fr 31, report), "pre writing … patterns".

**T4 · Fading rows (model → dashed → dotted → alone)** — rank 4
```
 ∿∿∿∿  ∿̇∿̇∿̇∿̇  ∿̣∿̣∿̣∿̣  ____________      each stroke family on one line that fades to nothing
```
- Child: traces a stroke that fades from full dashes to faint dots to an empty line (the writing app's fade row for strokes).
- Settings: Strokes (chips) · Fade steps (2 / 3) · Line width.
- Band PreK–K · Point pencil control with withdrawal of support.
- Reuse `trace-path.js` dash patterns + the `fade` pattern (number-tracing T4); `settings.rows`.
- Screen printable · Locales 11 · Key: none.
- Risks: faint rows on copiers → the ≥ 2.5 px floor.
- Evidence: the old `writing` app's row kinds (OLD-APP-LESSONS §E); "schwungübungen … vorschule" (de), "schrijfpatronen kleuters" (nl).

### 33. Letter Tracing (`letter-tracing`) — 5 new

**T1 · Name tracing** — rank 1
```
 M̲i̲a̲   Mia   Mia   ________        (capital + lowercase as typed; arrows at level 1)
```
- Child: traces and writes her own name (any typed name in the locale's letter set).
- Settings: Names (my list, one per page or 4 per page) · Rows (trace / trace + copy / fade) · Arrows and dots.
- Band PreK–K · Point L.K.1.a (print letters); the most requested personal sheet (ENGINES [letter-tracing-Q1]).
- Reuse `data/tracing/letter-strokes.js` word layout (`:22-28`), `trace-path.js`; ≤ 14 letters per row or wrap; hyphen/apostrophe glyphs; a letter outside `COMPOSED` → refused by name ("The letter ł is not in the German alphabet").
- Screen printable · Locales en/es/pt now (print-us); de/fr/it/nl/sv/da/no/fi when their override files are signed (ENGINES: refuse the maker in that locale until the panel accepts the model) · Key: none.
- Risks: a name never case-folded (printed as typed); the glyph table throws on unknown glyphs (`letter-strokes.js:38`) → refusal, never a blank.
- Evidence: topic seed; "letter tracing name" (en), "buchstaben nachspuren" (de head), "abecedario punteado" (es), "alfabeto pontilhado" (pt), "lettere tratteggiate" (it).

**T2 · Letter + a picture that starts with it** — rank 2
```
 B b   🍌 banana    B̲ B̲ B̲   b̲ b̲ b̲   ____     (the picture passes the initial-SOUND rule)
```
- Child: traces the letter pair beside a picture whose name starts with that sound, and says the word.
- Settings: Letters (chips; greyed where the sound rule refuses, alphabet-Q1) · Case · Picture word printed (on/off).
- Band K · Point RF.K.1.d + RF.K.3.a (letter–sound link).
- Reuse `trace-path.js`, the alphabet-Q1 refusal tables (`data/alphabet/phonemes.<loc>.json`, deny-onset lists, `chart.<loc>.json`).
- Screen printable · Locales 11 for the letters each locale's table allows (rare letters greyed, never a wrong-sound picture) · Key: none.
- Risks: en "knife" for K → the deny-onset list; a letter with no reviewed picture → the letter is offered without a picture (the chart's "letter alone" convention).
- Evidence: topic seed; "letter of the week b / d" (en), "buchstabeneinführung m / l / o" (de), "veckans bokstav s / m" (sv).

**T3 · Fading rows (trace · fade · guided · empty)** — rank 3
```
 a̲ a̲ a̲ a̲   ạ ạ ạ ạ   a . . . .   ____________
```
- Child: the four old row kinds on one letter: full trace, faint trace, guided (start dots only), empty.
- Settings: Letters (chips) · Row kinds (the four, in order / chosen) · Rows per letter.
- Band K · Point L.K.1.a; the writing app's row editor (ARCHITECTURE §4.2 `settings.rows`).
- Reuse `trace-path.js` patterns + fade; `letter-strokes.js`.
- Screen printable · Locales as T1 · Key: none.
- Risks: as number-tracing T4.
- Evidence: OLD-APP-LESSONS §E (row editor is a keep); "letter tracing practice" (en), "buchstaben nachspuren und schreiben" (de).

**T4 · Capital and small together (Aa Bb)** — rank 4
```
 A̲a̲  A̲a̲  A̲a̲   Aa   ______        B̲b̲  B̲b̲  …
```
- Child: traces the pair on one line (K-238/278 trace one case at a time) — case pairing while writing.
- Settings: Letters (chips / the whole alphabet, 2 pages) · Rows · Arrows.
- Band K · Point RF.K.1.d (recognise and name all upper- and lowercase letters).
- Reuse `letter-strokes.js` pair layout (advance widths), `trace-path.js`.
- Screen printable · Locales as T1 · Key: none.
- Risks: x-height alignment of the pair on the school-lines trio → the pair shares one baseline (the ruling trio of `trace-path.js:12`).
- Evidence: "letter tracing to z" (en), "alfabeto pontilhado … maiúscula e minúscula" (pt), "abecedario punteado mayúsculas y minúsculas" (es).

**T5 · Letter formation cards / poster** — rank 5
```
 ┌─────┬─────┬─────┐
 │ A a │ B b │ C c │   big letters with start dots and arrows, a picture per letter (sound-rule), one letter per card or 26 per poster
```
- Teacher: prints letter cards (cut) or the alphabet poster in the locale's school model with arrows.
- Settings: Format (cards 6/page · poster) · Pictures (on/off) · Case (both / capitals).
- Band K · Point L.K.1.a; material (the wall alphabet, sv "veckans bokstav skylt").
- Reuse `trace-path.js` model + arrows, `letter-strokes.js`, the chart table `chart.<loc>.json` (alphabet-Q1 point 3) for the picture per letter.
- Screen material · Locales as T1 for the model; pictures per the chart table (a letter may be empty with a reason) · Key: none.
- Risks: a wrong-sound picture → the chart table is panel-signed; never a letter-level fallback (alphabet-Q1).
- Evidence: "veckans bokstav skylt" (sv), "letter of the week … preschool" (en), "alphabet poster"-class; the classroom wall.

### 34. Word Tracing & Writing (`word-writing`) — 4 new

Fifteen faces + the own-words control cover tracing, copying, banks, boxes and first letters; "dictée muette" (fr 88) is **G1-260** by another name (an SEO note, not a template). Four new tasks.

**T1 · Own-sentence tracing** — rank 1
```
 T̲h̲e̲ ̲c̲a̲t̲ ̲s̲l̲e̲e̲p̲s̲.̲   The cat sleeps.   ___________________________
```
- Child: traces the teacher's sentence, copies it, writes it (sentences-Q1: strips/trace/copy allowed for own text).
- Settings: Sentences (my list, 1–4) · Rows (trace / copy / write) · Case.
- Band K–G1 · Point L.K.1.a + L.1.2.b (write sentences; capital + end mark); de "Satz nachspuren".
- Reuse `trace-path.js strokeWordLane` per word with word spacing, `letter-strokes.js`; punctuation glyphs; fit refusal on long sentences (measured widths, `bankword-width.js`).
- Screen printable · Locales as letter-tracing T1 (print model) · Key: none.
- Risks: a sentence longer than two rows → "Shorten the sentence to fit two lines"; typographic rules (fr NNBSP before `?`) applied by the shell (`lib/sentence-bank.js tokenize :32-40` per ENGINES).
- Evidence: topic seed; "trace the sentences" (K-391) is bank-bound; "sight words sentences" (en 24, shortlist) and "ecrire des mots cp" (fr).

**T2 · Label the picture (bilder beschriften)** — rank 2
```
 ┌──────────────────────┐
 │  🐓   🐄    🏠   🌳    │   word bank: Huhn · Kuh · Haus · Baum
 │  ___  ___  ___  ___  │
 └──────────────────────┘
```
- Child: writes each object's word on the line under it (bank at level 1–2, none at level 3).
- Settings: Theme · Objects (4 / 6) · Bank (on/off) · Case.
- Band G1 · Point L.1.2.d (spell words with common patterns), vocabulary; de "Bilder beschriften" (demand head), fr "légender l'image".
- Reuse `mixedScatter` at large icons with label lines (`components.js:68`), vocab words, `type-word` with `letter-pad.js`.
- Screen type-word per label · Locales 11 · Key: the labels.
- Risks: A11 multi-word labels (space kept); de capitals preserved.
- Evidence: "bilder beschriften" (de head term), "escribir la palabra" (es), "escreva o nome de cada figura" (pt, report).

**T3 · Word shape boxes** — rank 3
```
 [🐱]  ┌─┬─┬─┐      cat → three x-height boxes      [🐸] ┌┐┌─┬─┬─┐  frog → tall box for f, descender box for g
       │ │ │ │
```
- Child: writes the picture word into boxes shaped by the letters' heights (ascender/descender/x-height) — the classic "word shape" spelling scaffold.
- Settings: Words (theme / my list) · Boxes (shaped / plain) · Case (small only — capitals have one height).
- Band K–G1 · Point L.K.2 / L.1.2.d; visual word shape.
- Reuse `G1-301`'s letter boxes with a per-letter height class (a deterministic table: ascenders b d f h k l t + capitals; descenders g j p q y; per-locale letters å ä ö ü = x-height + mark → x-height box with a cap; ß = ascender; `letter-strokes.js` metrics know the heights) — **NEW** `lib/letter-heights.js` (data, ×11 letter sets).
- Screen type-word · Locales 11 · Key: the word in its boxes.
- Risks: a locale where the shape gives the word away among a bank (all bank words different shapes) → the bank is drawn with ≥ 2 same-shape words (gate 8 `settings-space` measures the shape tell).
- Evidence: a Montessori/Reichen staple ("Wortbild", "silhouette du mot"); the "dictée muette" tradition (fr 88) uses the shape boxes in its CE1 form.

**T4 · My word book page** — rank 4
```
 ┌───────┐  word: ______        ┌───────┐  word: ______
 │  🐱   │  my sentence: _______│  🐶   │  my sentence: ______
 └───────┘  ______________      └───────┘
```
- Child: writes the word under each picture and one sentence of her own (the vocabulary notebook page, per theme).
- Settings: Theme · Entries (2 / 4) · Sentence lines (1 / 2) · Word given (traced / blank).
- Band G1–G2 · Point L.1.6 (use words acquired through conversations/reading), W.1.2.
- Reuse `iconRows`, `trace-path.js rulingBlock`, vocab words.
- Screen type-word (the word; the sentence is open) · Locales 11 · Key: the words.
- Risks: none (open sentence).
- Evidence: "mi cuaderno de palabras / Wörterheft" classroom routine; "vocabulary cards" (en) demand; the picture-cards maker prints cards — this prints the notebook page.

### 35. Cursive Handwriting (`cursive`) — 4 new

Offered in 9 locales (sv + fi refused by data: no joined school script — ENGINES #35; Finnish "kaunokirjoitus" demand is real but OPS 2014 dropped joined writing: §"For the operator" B). Six faces already cover letters, capitals, joins, words, reading and sentences; four new tasks.

**T1 · Own words and sentences in cursive** — rank 1
```
 (cursive grey) 𝓑𝓪𝓾𝓶   𝓑𝓪𝓾𝓶   ___________        the teacher's spelling list in the locale's school script
```
- Child: traces and copies the teacher's words/sentences in cursive (the weekly spelling list in joined writing).
- Settings: Words / sentences (my list) · Script (de VA / LA; others fixed) · Rows (trace + copy counts).
- Band G2–G3 · Point L.2.1 (print/cursive per state standards; CCSS has no cursive — the national frameworks do: programmes CP/CE1 "écriture cursive", Lehrplan "Schreibschrift", BNCC "letra cursiva").
- Reuse `G2-377`'s one-text-node rule (`types/g2/G2-377-cursive-writing.js:18-21`), `primitives/school-ruling.js` per-em metrics (`school-ruling.js:8-16`), the vendored Playwrite units (`assets/fonts/cursive-fonts.css`); glyph coverage refusal (`document.fonts.check` + the offline coverage table, cursive-Q1 (5)).
- Screen printable · Locales 9 (sv/fi refused) · Key: none.
- Risks: a glyph the unit lacks (ß in `mx`) → refused by name; cross-OS ink placement within 1.5 px (spike S3 cursive page, cursive-Q1).
- Evidence: topic seed; "écriture cursive cp à télécharger" (fr 31, report), "letra cursiva pontilhada" (pt), "schreibschrift generator" (de), "skrivstil" (sv — refused, see B).

**T2 · Cursive letter of the day** — rank 2
```
 𝓶   𝓶 𝓶 𝓶 𝓶   𝓶𝓪 𝓶𝓸 𝓶𝓾   𝓶𝓪𝓾𝓼   ________      one letter: alone · joined to vowels · in a word · free line
```
- Child: practises one cursive letter in four steps (alone, in joins, in a word, free) — the per-letter sheet of the fi/de/fr demand ("kaunokirjoitus pieni p", "schreibschrift s", "écriture cursive … lettre").
- Settings: Letter (chip) · Case (small / capital) · Word (bank word containing the letter).
- Band G2 · Point national cursive programmes (per-letter introduction order per locale — the bank's unit axis).
- Reuse `G2-377` grouping engine with one letter, `G2-385`'s join pairs (`types/g2/G2-385-cursive-letter-connections.js`), the cursive word bank `data/b6/locales/cursive-writing.<loc>.json`.
- Screen printable · Locales 9 · Key: none.
- Risks: a join the unit's font renders unjoined (capitals in some scripts) → the join row is omitted for that letter (data flag per unit).
- Evidence: "schreibschrift s / i / l / f" (de), "kaunokirjoitus iso e / pieni r" (fi — refused), "skrivstil litet r" (sv — refused), "cursive writing a to z" (en).

**T3 · Print ↔ cursive match** — rank 3
```
 house  ───  𝓱𝓸𝓾𝓼𝓮        garden ───  𝓰𝓪𝓻𝓭𝓮𝓷        (read the cursive, draw the line to its print form)
```
- Child: matches printed words to their cursive forms (G2-387 matches cursive to *pictures*; this is the transcoding step).
- Settings: Words (theme / my list) · Pairs (5 / 8) · Distractor (a near word).
- Band G2–G3 · Point reading cursive (the national programmes' "lire l'écriture cursive").
- Reuse the cursive text node + the pair screen.
- Screen tap-order pairs · Locales 9 · Key: the lines.
- Risks: two words whose cursive forms look alike at one glance (bat/hat) → pairs differ in ≥ 2 letters (folded).
- Evidence: "letra cursiva e letra de forma" (pt), "corsivo … stampatello" (it), "verbonden schrift versus blokschrift" (nl).

**T4 · Cursive alphabet strip / poster** — rank 4
```
 𝓐𝓪 𝓑𝓫 𝓒𝓬 …   the locale's school script, with the join entry/exit strokes shown (poster) or as a desk strip
```
- Teacher: prints the cursive alphabet in the locale's unit (de VA + LA both), poster or desk strip.
- Settings: Script (where two) · Format (poster / strip) · Case (both / small).
- Band G2–G3 · material.
- Reuse the vendored fonts, `school-ruling.js`.
- Screen material · Locales 9 · Key: none.
- Risks: none.
- Evidence: "schreibschrift alphabet" (de), "letra cursiva alfabeto" (pt), "verbonden schrift alfabet" (nl), "cursive writing abc" (en).

### 36. Tangram (`tangram`) — 4 new

Narrow, wordless family (six faces); four new tasks, each a different thing to do with the seven pieces.

**T1 · Make your own figure (blank board + pieces)** — rank 1
```
 ┌─────────────────────┐   ✂ the seven pieces (colour legend)   My figure's name: ________
 │   (empty board)     │
```
- Child: cuts the pieces, invents a figure on the board, traces its outline and names it.
- Settings: Pieces (coloured / plain) · Board (empty / dotted) · Name line (on/off).
- Band K–G1 · Point K.G.B.6 (compose shapes), creativity; open.
- Reuse `primitives/tangram.js` pieces (`tangram.js:7-12` geometry), K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: none.
- Evidence: topic seed; "tangram puzzles … build" is the K-353 face; the open board is what the operator's competitor shows as "make your own".

**T2 · Three-piece first puzzles** — rank 2
```
 outline of a fish built from 3 pieces (L, M, S)   ✂ the three pieces      (K-358 only draws lines inside shapes)
```
- Child: builds a simple outline from 2–3 pieces (the entry level before seven-piece shadows).
- Settings: Pieces (2 / 3 / 4) · Figures (bank of small outlines) · Outline (with inner lines / shadow).
- Band PreK–K · Point K.G.B.6.
- Reuse `tangram.js` + `data/b4/tangram-figures.js` (sub-figures composed of 2–4 pieces, gated by `tools/gate-tangram-figures.js` per the primitive header).
- Screen material (+ a `tap-choice` "which pieces?" variant) · Locales 11 · Key: the solution lines.
- Risks: a 3-piece outline with two solutions → the figure gate enumerates placements (the exact geometry of `tangram.js`) and keeps figures with one solution or lists all.
- Evidence: the "my first tangram" demand class (de "tangram kinder", fr "tangram maternelle").

**T3 · Which figure can you build with these pieces?** — rank 3
```
 pieces: L L M S S  →   [outline A] [outline B] [outline C]     circle the one these five pieces make
```
- Child: reasons from the given pieces (area, shapes) to the one buildable outline among three.
- Settings: Pieces (5 / 7) · Choices (3) · Shadows (filled / outlined).
- Band G1–G2 · Point 1.G.A.2, area reasoning (the outlines differ in area by construction: the distractors use 4 or 6 pieces).
- Reuse `tangram.js` areas (exact: L 0.25, M 0.125, S 0.0625, `tangram.js:10-12`), `tangram-figures.js`, `chipRow`.
- Screen tap-choice · Locales 11 · Key: the outline.
- Risks: two outlines with equal area → distractors always differ in piece count (hence area).
- Evidence: G2-347 matches a solution to a shadow (orientation); this adds the reasoning-before-building step.

**T4 · Tangram figure ↔ name cards (match the animal)** — rank 4
```
 [🐈 shadow]  ───  cat        [🐇 shadow] ───  rabbit        (the figure names from the bank, ×11)
```
- Child: matches tangram shadows to the words they depict (literacy link; the names exist per figure).
- Settings: Figures (4 / 6) · Words (locale) · Pictures as hints (on/off).
- Band K–G1 · Point vocabulary + shape recognition.
- Reuse `data/b4/tangram-figures.js` names (×11 via the b4 locale files), the pair screen.
- Screen tap-order pairs · Locales 11 (a figure without a reviewed name in a locale is skipped) · Key: the lines.
- Risks: a shadow a child reads differently (a "dog" that looks like a fox) → the figure names were native-reviewed in the b4 batch; pictures as hints at level 1.
- Evidence: "tangram animali" (it), "tangram tiere" (de); the wordless family's one literacy face.

## B5 — literacy A

### 37. Alphabet & Letters (`alphabet`) — 6 new

**T1 · Alphabet train (fill the missing letters)** — rank 1 (the old `alphabet-train` app, kept)
```
 🚂[A][B][ ][D][ ][F]…       (letter hints: the picture starting with the letter on the wagon — an explicit mode, A13)
```
- Child: writes the missing letters on the wagons in alphabet order; the hint mode shows a picture per missing wagon.
- Settings: Alphabet range (A–M / whole, 2 pages) · Missing (few / many) · Case · Hints (on/off).
- Band K · Point RF.K.1.d, alphabet order (`data/b2/collation.js strip`).
- Reuse the train art with measured slots (B9, `data/art-extents.json`), `types/_shared/lit-letter-knowledge.js`, the alphabet-Q1 picture rule for hints.
- Screen type-word (letters) · Locales 11 (it 21-letter strip; sv/fi/da/no extra letters after z) · Key: the train.
- Risks: a hint picture with the wrong sound → the deny lists; the K-223 missing-letters logic reused.
- Evidence: the old app; "alphabet dot to dot"-adjacent; "alphabetisch ordnen" (de), "aakkosjärjestys" (fi).

**T2 · Alphabet chart (a picture for every letter)** — rank 2
```
 A 🍎   B 🍌   C 🐱 …   Å ål   Ä 🍏? …     (each letter → the panel's chart word; empty where the panel left it)
```
- Teacher: prints the classroom alphabet chart in the locale's alphabet with one picture per letter from the signed chart table.
- Settings: Case (both / capitals) · Format (poster / 4 strips) · Words printed (on/off).
- Band K · Point RF.K.1.d; material.
- Reuse `data/alphabet/chart.<loc>.json` (alphabet-Q1 point 3, panel-authored: en X → the panel's call; da Æ → æble; sv Å → ål; fi B → banaani), vocab pictures.
- Screen material · Locales 11 once each chart table is signed · Key: none.
- Risks: a letter with no honest picture prints the letter alone (never a wrong-sound picture).
- Evidence: topic seed; "2d shapes anchor chart"-style demand transfers; "veckans bokstav" (sv), "alphabet chart".

**T3 · Letter hunt in a scene** — rank 3
```
 ┌──────────────────────────┐
 │ busy picture with 8 letters hidden in it (on signs, balloons, kites) │  find and circle every  m
 └──────────────────────────┘
```
- Child: finds all copies of a target letter hidden in a scene among look-alike letters (K-229 is a plain row).
- Settings: Letter (chip) · Copies (4 / 6 / 8) · Look-alikes (b/d/p/q set on/off).
- Band K · Point RF.K.1.d; the "search-lens" gap (COVERAGE.md K row 46).
- Reuse `mixedScatter` of letter tiles (letters as SVG text at `iconPx`, the picture-scatter engine reused for glyphs), `tap-select`.
- Screen tap-select · Locales 11 · Key: the ringed letters.
- Risks: a letter tile rotated reads as another (b/q) → tiles are never rotated when look-alikes are on (the ±8° jitter of `components.js:85` disabled for glyphs).
- Evidence: "find the letter" (K-229); "buchstaben … suchen", "letter hunt" classroom staple.

**T4 · Before and after a letter** — rank 4
```
 [ ] m [ ]        [ ] f [ ]        (write the letter before and the letter after)
```
- Child: names the neighbours of a letter (K-223 fills gaps in the whole alphabet; this isolates the neighbour relation, as K-021 does for numbers).
- Settings: Case · Items (6 / 10) · Neighbours (both / before / after).
- Band K–G1 · Point RF.K.1.d, L.1 alphabetical order readiness.
- Reuse `collation.js strip` (the shown alphabet), `type-word` with a letter pad.
- Screen type-word · Locales 11 (sv/fi "z, å, ä, ö"; it strip skips j k w x y) · Key: the letters.
- Risks: first/last letters have one neighbour → excluded as targets.
- Evidence: "alfabetisk ordning åk 1" (sv), "ordine alfabetico classe seconda" (it); the K-021 analogue.

**T5 · Vowels and consonants in words (colour the vowels)** — rank 5
```
 b a n a n a   →  colour the vowels red      (own words allowed: a letters claim)
```
- Child: colours every vowel in the words (K-230 sorts isolated letters).
- Settings: Words (theme / my list) · Colour (vowels / consonants) · Case.
- Band K–G1 · Point RF.K.1 + the vowel set per locale (the `vowels` field authored for spelling T5; y per locale).
- Reuse `tap-paint` on letter tiles; `collation.js` + the vowel table.
- Screen tap-paint · Locales 11 (own words: letters claim) · Key: the coloured word.
- Risks: en y → the panel's rule (consonant at word start, vowel elsewhere) encoded per locale; a word with no vowel (impossible in the vocab) → refused.
- Evidence: "vowels and consonants" (K-230) sort; "pregrafismo vocali" (it), "grafomotricidad vocales" (es), "word-scramble vowel colouring" (old app's feature, OLD-APP-LESSONS §E).

**T6 · Alphabet cards to cut and order** — rank 6
```
 ✂ [c] [a] [b] [e] [d] …   cut the cards, lay them in alphabet order, read them
```
- Child: orders the cut letter cards (the hands-on alphabet line).
- Settings: Range (A–M / whole) · Case · Pictures on the cards (on/off, chart rule).
- Band K · Point RF.K.1.d; material.
- Reuse K-240 cut lines, `collation.js strip`, the chart table for pictures.
- Screen material · Locales 11 · Key: the ordered strip (page 2).
- Risks: none.
- Evidence: "alphabet … cards" (en), "bildkarten buchstaben" (de), "alfabeto … ritagliare" (it).

### 38. Phonics & Sounds (`phonics`) — 5 new

Reviewed banks only (phonics-Q1); no teacher words on any sound claim.

**T1 · Beginning-sound clip cards** — rank 1
```
 ┌────────────┐
 │    🐱      │   m   c   s    ← clothes-peg on the right letter; answer dot on the back (option)
 └────────────┘
```
- Child: clips a peg on the first-sound letter; self-checking with a dot on the back (duplex, mirrored).
- Settings: Letters (chips, greyed by the sound rule) · Cards per page (6 / 8) · Answer dots (on/off).
- Band K · Point RF.K.3.a; material.
- Reuse `types/_shared/lit-sound-match.js` items from the approved words (`lib/b3-common.js approvedByKey`), K-240 cut lines; the deny-onset lists.
- Screen material · Locales 11 (letters each locale's table allows) · Key: none (dots).
- Risks: a wrong-sound picture → reviewed words only; three letter choices never share the sound (es c/k/q → the panel's letter set per sound).
- Evidence: topic seed; "clip cards"-class en, "anlaut-klammerkarten" (de), "cartes à pince" (fr).

**T2 · Blends per language (bl, st, tr …)** — rank 2
```
 [🐸]  [fr]og      [⭐] [st]ar       (two letters, two sounds — different from a digraph)
```
- Child: writes/circles the initial blend of the picture word; level 3: sorts by blend.
- Settings: Blends (chips from the locale table) · Task (write / circle / sort) · Pictures.
- Band G1 · Point RF.1.3 (consonant blends); de "Konsonantenhäufungen", es "sílabas trabadas" (demand "lectura de sílabas trabadas").
- Reuse `lit-sound-match.js`, `primitives/team-bead.js` capsules (`team-bead.js:5-8`) for the blend; **author** per-locale blend tables (ENGINES #38: en bl/st/tr…, de bl/br/kn/schw…, es bl/br/cl…, pt br/cr/fl…, Nordic sk/st/str…) from the approved words' graphemes.
- Screen type-word (the two letters) / tap-choice · Locales 11 where the blend table is signed (a locale whose approved words carry < 6 items per blend refuses that blend) · Key: the blends.
- Risks: a blend that is a digraph in another locale (nl "sch") → each table is the locale's own; never shared.
- Evidence: topic seed; "digraphs and blends / digraphs vs blends" (en), "sílabas trabadas" (es), "consoantes …" (pt).

**T3 · Same first sound? (yes / no)** — rank 3
```
 [🐱] [🦆]  → same first sound?  ✓ / ✗        [🐱] [🧢] → ✓
```
- Child: judges whether two pictures start with the same sound (the rhyme-or-not format moved to onsets).
- Settings: Pairs (6 / 8) · Difficulty (far sounds / near sounds: m–n, b–p) · Pictures only / with letters at level 1.
- Band K · Point RF.K.3.a, RF.K.2.d (isolate initial sounds); es "sonido inicial", de "Anlaut hören".
- Reuse `lit-sound-match.js` pairs from the approved words, the ✓/✗ chips (K-352 engine).
- Screen tap-choice · Locales 11 (da strict pool) · Key: ✓/✗.
- Risks: "same letter, different sound" (en c-at / c-ity) → pairs built on the *sound* (graphemes[0] + IPA where present, alphabet-Q1 rule), never the letter.
- Evidence: "K-328 M or N?" is one pair of letters; the general same/different judgement is the K.2.d entry task.

**T4 · Letters and sounds — count both** — rank 4
```
 [🚢]  ship   letters: [4]   sounds: [3]        (sh is one sound)
```
- Child: counts the letters of the word and the sounds heard, and sees where they differ (digraphs).
- Settings: Words (digraph-bearing / all) · Items (5 / 8) · Boxes shown (on/off).
- Band G1 · Point RF.1.3.a (digraphs), RF.K.2.d; the "two letters, one sound" insight of K-318.
- Reuse `lib/sound-boxes.js` (`data/b3/sound-boxes.js` graphemes), two `answerBox` cells.
- Screen type-number ×2 · Locales 11 (digraph words refused where the digraph family is refused: es/it/sv/da/no whole-family per CLAUDE.md §27 — there the page uses words where letters = sounds vs words with silent letters only if the bank marks them) · Key: both counts.
- Risks: a word whose sound count is contested (en "box" = 4 sounds) → words with an agreed `graphemes` split only (the approved pipeline's field).
- Evidence: "sound boxes phonics / for phonemic awareness" (en), "laute hören buchstaben schreiben" (de), "hakken en plakken" (nl).

**T5 · Long or short vowel?** — rank 5
```
 [🐑] s_ee_p   ○ long  ○ short        fi: tuli / tuuli  → pitkä vai lyhyt vokaali?
```
- Child: decides vowel length (en long/short; fi/de/nl length by spelling; the demand is strongest in fi: "pitkä vokaali", "lyhyt ja pitkä vokaali").
- Settings: Vowel (chips) · Items (6 / 8) · Minimal pairs (fi/de: tuli–tuuli, Ofen–offen) at level 3.
- Band K–G1 · Point RF.1.2.a (distinguish long from short vowel sounds); OPS 2014 "pitkä ja lyhyt vokaali" (a core Finnish spelling point), nl "open/gesloten lettergreep", de "Dehnung/Schärfung".
- Reuse the approved words with a **NEW** `vowelLength` flag per locale (fi: double letter = long, orthographically exact; nl/de/en: authored per word by the panel); the ✓-style two-chip.
- Screen tap-choice · Locales fi/nl/de/en/sv/da/no where the flag is authored; es/pt/it/fr refused (no phonemic length distinction taught) · Key: long/short.
- Risks: en vowel length is a phonics category, not a duration (bit/bite) → en items from the panel's "long/short vowel" lists only.
- Evidence: "pitkä vokaali / lyhyt ja pitkä vokaali / pitkä vai lyhyt vokaali wordwall" (fi digraphs bucket — the top fi phonics demand), "stavningsregler dubbelteckning" (sv).

### 39. Rhyming Words (`rhyming`) — 3 new

Seven faces already cover pairs, rhyme-or-not, rhyme-and-write, sort, finish, strings and write-your-own; the banks are sound claims (reviewed only). Three new *formats*; rhyme bingo lives in the bingo maker.

**T1 · Rhyme memory cards** — rank 1
```
 ✂ [🐱] [🎩] [🐸] [🪵] …    pairs that rhyme; turn face down and play Memory
```
- Child: matches rhyming picture pairs face down (the game format).
- Settings: Pairs (6 / 8 / 10) · Words under pictures (on/off) · Card size.
- Band K–G1 · Point RF.K.2.a; material/game.
- Reuse `data/b3/rhyming-words.js` pairs ×11 (+ `data/literacy/rhyming-pairs.json`), K-240 cut lines.
- Screen material · Locales 11 · Key: the pairs (page 2).
- Risks: a picture that rhymes with two others on the page → pairs drawn so no cross-rhyme exists (the bank's rhyme classes).
- Evidence: topic seed; "rhyming words game" (en), "reimwörter bildkarten" (de), "rimord med bilder" (sv).

**T2 · Which one does not rhyme?** — rank 2
```
 [🐱] [🎩] [🐸]   → circle the odd one
```
- Child: finds the non-rhyming picture among three (K-352 judges a pair).
- Settings: Items (6 / 8 rows) · Distance (far / near rhyme).
- Band K–G1 · Point RF.K.2.a.
- Reuse the rhyme classes of the bank, `odd-one-out.js` row, `tap-choice`.
- Screen tap-choice · Locales 11 · Key: the odd one.
- Risks: position tell → balanced by gate 8; a "near rhyme" that natives accept (sv "hund/rund" yes; "katt/natt" yes) → the bank's classes are the truth.
- Evidence: "rhyme or not" (K-352) exists; the three-way odd-one-out is the step after.

**T3 · Rhyme dominoes to cut** — rank 3
```
 ✂ [🐱|🎩] [🎩|🐸] [🐸|🪵] …   each domino's right picture rhymes with the next domino's left
```
- Child: chains dominoes by rhyme (the picture–picture chain game).
- Settings: Dominoes (8 / 12) · Chain (closed loop / open) · Words (on/off).
- Band K–G1 · Point RF.K.2.a; material.
- Reuse `primitives/domino.js` tile geometry with pictures instead of pips (`domino.js:3`), the rhyme classes; the chain is built as a Hamiltonian path over classes (each class used twice: once right, once left).
- Screen material · Locales 11 · Key: the chain.
- Risks: a class with only one word cannot chain → classes with ≥ 2 pictures only.
- Evidence: "rhyming words for preschoolers / game" (en), "rimword … spil" (da), "reimwörter … kinder" (de).

### 40. Syllables (`syllables`) — 3 new

Twelve faces exist; every split or count is a safety-gated claim (syllables-Q1), so no teacher words. Three new formats.

**T1 · Syllable puzzle cards** — rank 1
```
 ✂ [🐘 ele][fant]      [🍌 ba][na][na]     (the picture on the first piece; jigsaw tabs so only the right pieces fit)
```
- Child: assembles cut syllable pieces into words (the picture is on piece 1).
- Settings: Syllables (2 / 3 / mixed) · Words (6 / 8) · Tabs (shaped / straight).
- Band G1 · Point RF.1.3.e (syllable patterns); material.
- Reuse `data/b3/syllable-split.js` joins (`approvedByKey`, never a hand copy), `primitives/word-brick.js` dovetail silhouettes (`word-brick.js:6-8`) for the tabs, K-240 cut lines.
- Screen material · Locales 11 (fr written syllables, da strict pool — the banks' own rules) · Key: the words.
- Risks: shaped tabs that fit the wrong word → tab shapes keyed per word (distinct per page).
- Evidence: topic seed; "silbenbögen legen" (de), "lectura de sílabas" (es), "família silábica" (pt).

**T2 · Syllable family chart (ba be bi bo bu)** — rank 2
```
 b + a = ba 🍌(banana)   b + e = be   b + i = bi   b + o = bo 🚤(bote)   b + u = bu
```
- Child: reads a consonant's syllable family with a picture per syllable where the bank has a word starting with it; traces/writes the syllables.
- Settings: Consonant (chips) · Vowels (the locale's) · Trace rows (on/off).
- Band K–G1 · Point the syllabic method of pt/es/it ("família silábica", "lectura de sílabas", "le sillabe"); fr "lecture de syllabes cp".
- Reuse `data/b3/syllable-reading.js` (the carpet banks), the approved words' first syllable; `trace-path.js` for tracing.
- Screen printable (+ `tap-choice` "which syllable starts the picture?") · Locales es/pt/it/fr (the syllabic-method locales); **refused** en/de/nl/sv/da/no/fi (not a teaching convention there — the panel confirms; de "Silbenteppich" is the G1-306 carpet, a different object) · Key: none / the syllables.
- Risks: a syllable with no reviewed picture → printed alone; "família silábica do h" (pt demand) — h is silent: the panel decides whether the h family is offered (pt teaches it; es "ha he hi" too).
- Evidence: "família silábica letra k / l / c" (pt 53, report), "família silábica cursiva" (pt 50), "lectura de silabas directas e inversas" (es), "sillabe … prima elementare" (it).

**T3 · Open clapping sheet (own words, no claim)** — rank 3
```
 word: _______   🐱   claps: ○ ○ ○ ○     (no split, no count, no key — the child claps and writes her number)
```
- Teacher types words (picture if exact-matched); the child claps and writes her count — the page prints **no** syllable claim (syllables-Q1 "the one safe path"; ENGINES operator item 8).
- Settings: Words (my list) · Rows (6 / 10) · Picture (on/off).
- Band K–G1 · Point RF.K.2.b practice (ungraded).
- Reuse the vocab match, empty clap circles; chip "Your own words — the sheet has no answer key".
- Screen printable (ungraded) · Locales 11 · Key: none.
- Risks: none (no claim made).
- Evidence: ENGINES syllables-Q1; "syllable count" demand classes.

### 41. Sight Words (`sight-words`) — 4 new

Eleven faces + own words (letters claim) exist; the sentence faces stay bank-only (sentences-Q1). Sight-word bingo and colour-by-sight-word live in bingo / color-by-number (cross-link cards here).

**T1 · Roll and read** — rank 1
```
 ⚀ the  and  you  a    ⚁ it  is  to  of  …   roll the die, read the column, colour a box each time
```
- Child: rolls a die, reads the words in that column, marks the box — the K-1 fluency game.
- Settings: Words (list / my list, 12–24) · Columns (6 by die faces) · Marks (boxes / stars).
- Band K–G1 · Point RF.K.3.c, RF.1.3.g; game.
- Reuse `primitives/dice.js` faces, the sight-words bank (`data/literacy/sight-words.js`; ≥ 60 per locale per ENGINES #41).
- Screen printable (game) · Locales 11 · Key: none.
- Risks: own words: letters claim only.
- Evidence: topic seed; "sight words games" (en), "flitswoorden" (nl), "lernwörter üben" (de).

**T2 · Flash cards (big print, 8 per page)** — rank 2
```
 ┌──────────┐ ┌──────────┐
 │   the    │ │   and    │   large Nunito 800; duplex option with the word in a sentence on the back
 └──────────┘ └──────────┘
```
- Teacher: prints word cards for the pocket chart / flashing.
- Settings: Words (list / my list) · Cards per page (6 / 8) · Back (blank / the word in a bank sentence).
- Band K–G1 · Point RF.K.3.c; material.
- Reuse `primitives/bankword-width.js` to size the font (measured widths, never shrink below the floor), K-240 cut lines, the K-389 bank sentences for the back (bank words only).
- Screen material · Locales 11 · Key: none.
- Risks: a long word on a small card → the card count drops (6) before the font shrinks.
- Evidence: "flitswoorden groep 3 / maken" (nl), "lernwörter blanko" (de), "mots outils cp" (fr), "sight words … list" (en).

**T3 · Find the word in the text** — rank 3
```
 The cat sat on the mat. The dog ran to the cat.      highlight every  the  → how many? [ 4 ]
```
- Child: highlights every copy of the target word in a short bank text and counts (K-392 finds it among boxes).
- Settings: Word (list) · Text length (2 / 4 sentences) · Count box (on/off).
- Band K–G1 · Point RF.K.3.c in context; the "Wörter im Text finden" routine.
- Reuse `data/b2/sentences.js` frames (bank sentences containing the word; `lib/sentence-bank.js` never inflects — the word appears as is), `tap-select` on word tokens, `answerBox`.
- Screen tap-select + type-number · Locales 11 · Key: highlights + count.
- Risks: the word as part of another (en "the" in "there") → tokens are whole words (`\p{L}+`), and the count is of whole-word matches only; capitalised sentence-initial forms count (fold).
- Evidence: "sight words in a sentence / sight words sentences for grade 1 pdf" (en 24, shortlist), "lernwörter … im text".

**T4 · Spell the sight word (missing letters)** — rank 4
```
 t h _     w _ _ h     s _ i d        (letters claim; bank or own words)
```
- Child: completes sight words with missing letters (read-trace-write faces copy whole words; this spells).
- Settings: Words (list / my list) · Missing (1 / 2 / half) · Pad hint (on/off).
- Band K–G1 · Point RF.K.3.c + L.K.2.d; de "Lernwörter Lückenwörter".
- Reuse spelling T2's blank engine (`lit-word-build.js`), the uniqueness scan against the sight list + vocab.
- Screen type-word · Locales 11 · Key: the words.
- Risks: a pattern two sight words fit (en "w_s": was/wis? no — scanned) → rejected and re-blanked.
- Evidence: "sight words tracing" (en), "lernwörter diktat" (de) — the spelling face of the list.

### 42. One & Many, Articles (`nouns-articles`) — 4 new

Bank-bound (plural and gender are vocabulary facts; own words refused — A6). Four new tasks; the "definite article" face is the one new data item.

**T1 · Article + noun + plural table** — rank 1
```
 🐶  der Hund   →  die Hunde        🐱  die Katze  →  die [ ]       (sv: en hund → hundar → hunden?)
```
- Child: completes the three-column table (article · singular · plural) per picture — the de/nl/sv learner need.
- Settings: Columns (article / plural / both) · Items (6 / 8) · Case for de nouns (automatic capital).
- Band G1–G2 · Point L.1.1.c (singular/plural with matching articles); Lehrplan "Nomen: Artikel und Mehrzahl", SLO "lidwoorden en meervoud".
- Reuse `REFERENCE TRANSLATIONS/image-vocabulary.js` singular/plural/gender via the vocab slice, `data/b2/articles.js` + `articles-overrides.js` (×11), `lib/singular-plural-screen.js`.
- Screen type-word ×2 · Locales 11 (en: a/an + plural; fi: no article → two columns) · Key: the table.
- Risks: the §A.13.58 per-locale gender authority (sv `t`/`n`, no `n`/`m`, de `m/f/n`, nl `d`/`h`) — never cross-applied; plural article in de always "die".
- Evidence: topic seed; "der die das artikel" (de), "de of het" (nl), "en eller ett" (sv/da/no), "articoli determinativi e indeterminativi" (it 57, report), "singular e plural 3 ano" (pt).

**T2 · Count and write the plural (two dogs, three cats)** — rank 2
```
 🐶🐶   two [ dogs ]        🐱🐱🐱   three [ cats ]        (number word + plural noun)
```
- Child: counts the pictures and writes the number word with the plural noun (number agreement).
- Settings: Range (2–5 / 2–10) · Number as numeral / word · Items (6 / 8).
- Band K–G1 · Point L.K.1.c (form regular plurals), K.CC.A.3; es/pt/fr/it gender agreement of the number (fr "deux", pt "duas/dois" — the vocab's gender decides).
- Reuse `iconRows`, vocab plurals, `lib/number-words.js` (+ the gendered forms of 1–2 in pt/es/it where the panel's table has them — the word-problems level set already handles `{Q}` agreement, `lib/word-problems-levelset.js:16-17` per ENGINES), `type-word`.
- Screen type-word · Locales 11 · Key: the phrase.
- Risks: a plural with an irregular form (de Umlaut) → from the vocab, never suffixed (A6); pt "dois/duas" → gender-driven literal, never computed.
- Evidence: "singular and plural nouns" (en head), "einzahl und mehrzahl klasse 2" (de), "enkelvoud en meervoud groep 4" (nl).

**T3 · One or many? read and choose** — rank 3
```
 cats   →  [🐱]  [🐱🐱🐱]        Hund  →  [🐶]  [🐶🐶]      (read the word, circle the matching picture)
```
- Child: reads a singular or plural noun and circles the group it names (the reading direction; K-313/314 write).
- Settings: Items (6 / 8) · Distractor (one vs many only / many vs many-different at level 3).
- Band K–G1 · Point L.K.1.c (reading plural markers; de Umlaut/–e/–en, fr silent –s → the picture is the only clue in fr: level 1 shows the article "les").
- Reuse vocab forms, `chipRow` of two groups, `tap-choice`.
- Screen tap-choice · Locales 11 (fr: article shown, since the plural is often inaudible/invisible — the panel's rule) · Key: the group.
- Risks: a noun whose singular = plural (en sheep, de Mädchen, fr souris) → excluded from this face (the vocab shows the equality).
- Evidence: "one and many" family exists in the write direction; "singular y plural niños" (es), "singolare e plurale … bambini" (it).

**T4 · The or a? definite and indefinite** — rank 4
```
 a dog / the dog     ein Hund / der Hund     en hund / hunden     un chien / le chien      (circle the form the sentence needs; sv/da/no: write the suffix form)
```
- Child: chooses between the indefinite and the definite form for a noun shown first-mentioned and then again (the "a … the …" rule), or writes the Nordic definite suffix form.
- Settings: Items (6 / 8) · Task (circle / write) · Pairs (first mention → second mention).
- Band G1–G2 · Point L.1.1.h (determiners); Lgr22/Fælles Mål/LK20 "bestämd och obestämd form" (a core Nordic grammar point), de "bestimmter/unbestimmter Artikel".
- Reuse the vocab gender + `articles.js`; **author** the definite table (×10: en the; de der/die/das; fr le/la/l'; es el/la; pt o/a; it il/lo/la/l'; nl de/het; sv/da/no definite **suffix** forms as literals per noun — the `sv-render.js` "pure substitution, zero morphology" precedent: `plDef`-style literals, hand-verified, never computed); fi refused (no article; the definite/indefinite contrast is not a Finnish grammar topic).
- Screen tap-choice / type-word · Locales 10 after the table is signed; fi refused · Key: the forms.
- Risks: a computed Nordic suffix (sv "djur" → *djurna) → literals only, asserted at build (the `assertThemeTable` idea of ENGINES §22.5 reused); it "lo/l'" and fr elision → per-noun literals.
- Evidence: "en eller ett" (sv/da/no head terms), "bestemt ubestemt ental og flertal" (da), "entall flertall bestemt ubestemt" (no), "le ou la" (fr), "de of het" (nl).

### 43. Picture Word Cards & Vocabulary (`picture-cards`) — 4 new

Seven card faces exist (word cards, twin set, article cards, one-and-many, bilingual, syllable cards, word–picture lines). Four new card *uses*.

**T1 · Memory cards (picture–picture / picture–word)** — rank 1
```
 ✂ [🐱] [cat] [🐶] [dog] …   16 cards, identical backs (pattern), play Memory
```
- Child: plays Memory with picture–picture or picture–word pairs.
- Settings: Pairs (6 / 8 / 12) · Kind (picture–picture / picture–word) · Words (theme / my list, exact match).
- Band K–G1 · Point RF.K.3.c / vocabulary; game.
- Reuse `data/b3/picture-word-cards.js` card layout, K-240 cut lines, a printed back pattern page (so cards are opaque).
- Screen material · Locales 11 · Key: none.
- Risks: see-through paper → the back page is printed (duplex) or the gallery says "print on card".
- Evidence: topic seed; "memory … kinder" classes; "bildkarten" (de head), "imagier" (fr), "kuvakortit" (fi), "bildekort" (no).

**T2 · Word-wall labels** — rank 2
```
 ┌───────────────────────┐
 │  🪟  window            │   one big card per word (A5 landscape, 2 per page), picture + word (+ article option)
 └───────────────────────┘
```
- Teacher: prints large word-wall cards for the classroom; own words allowed (exact-match pictures or word only).
- Settings: Words (theme / my list) · Size (2 / 4 per page) · Article (on/off, from the bank).
- Band K–G2 · Point L.K.6 vocabulary; material.
- Reuse the card layout at large size; `bankword-width.js` sizing.
- Screen material · Locales 11 · Key: none.
- Risks: an own word without a picture → word-only card (never a wrong picture).
- Evidence: "woordkaartjes maken" (nl 25), "bildkarten zur sprachförderung" (de), "word wall".

**T3 · Picture dictionary page** — rank 3
```
 A  🍎 apple   🐜 ant   🐊 alligator        B  🍌 banana  🐻 bear  …     (one theme or one letter per page, alphabetical)
```
- Child/teacher: a themed or per-letter picture dictionary page in alphabetical order (the "imagier" / "Bildwörterbuch").
- Settings: By (theme / letter) · Entries (6 / 9 / 12) · Article (on/off).
- Band K–G1 · Point L.K.6, alphabetical order (G1-245 family).
- Reuse `collation.js` sort (never `localeCompare` — `collation.js:11-13`), the card grid, vocab words.
- Screen material · Locales 11 · Key: none.
- Risks: it 21-letter alphabet vs loanwords (j k w x y) → the `strip` for letter pages.
- Evidence: "imagier animaux / automne" (fr), "bildkarten obst und gemüse" (de), "picture word cards for kindergarten" (en).

**T4 · Cut and paste the word under its picture** — rank 4
```
 [🐱]   [🐶]   [🐸]     ✂  frog · cat · dog      glue each word under its picture
```
- Child: cuts the words and glues them under the pictures (K-225 draws lines).
- Settings: Items (4 / 6 / 8) · Words (theme / my list) · Distractor word (on/off).
- Band K–G1 · Point RF.K.3.c; hands-on.
- Reuse `types/_shared/lit-vocab-match.js`, K-240 cut lines.
- Screen tap-edit (place the word tiles, D1) · Locales 11 · Key: the placed words.
- Risks: as many words as pictures = a process of elimination → one distractor word at level 2–3 (gate 8).
- Evidence: "cut and paste"-class demand; "recortar y pegar palabras" (es).

### 44. Position Words (`position-words`) — 4 new

Every printed sentence comes from `REFERENCE TRANSLATIONS/lcs-grammar.js prepSentence` (position-words-Q1); a `null` is a refusal of that triple. Four new tasks; the four existing faces are wordless.

**T1 · Read and draw (put the ball under the table)** — rank 1
```
 "Zeichne den Ball unter den Tisch."     🪑 (table)  → the child draws the ball under it
```
- Child: reads a grammar-engine sentence and draws the object in the stated position relative to the landmark picture.
- Settings: Prepositions (chips from `PREP_FORMS` ×11) · Items (4 / 6) · Landmark (theme / shape via `shapeLandmark`).
- Band K–G1 · Point K.G.A.1 (describe positions with terms); the old `prepositions` app's sentence mode.
- Reuse `lcs-grammar.js prepSentence(locale, prepKey, landmark)` (`:404-429` per ENGINES), `shapeLandmark`, `FI_GENITIVES`; the landmark from the vocab slice (`{key, singular, plural, gender}`).
- Screen printable (drawing) · Locales 11 (a `null` → another landmark; a theme that cannot supply the count → refused) · Key: a model drawing.
- Risks: a wrong-case sentence → impossible by construction (the engine refuses); own photos/words as landmarks refused (no vocab entry).
- Evidence: topic seed + the old app; "position words" demand classes; COVERAGE.md K row 23 (position words = partial).

**T2 · Where is it? write the position word** — rank 2
```
 [picture: the cat ON the box]     Die Katze sitzt ____ der Kiste.     (prefix ____ suffix from the engine)
```
- Child: writes the preposition into the gap of the engine's sentence under a scene that shows the relation.
- Settings: Prepositions (chips) · Items (4 / 6) · Word bank (on/off).
- Band K–G1 · Point K.G.A.1 (production).
- Reuse `prepSentence` `{prefix, expected, suffix}` (the worksheet = prefix + ____ + suffix; the key = prefix + expected + suffix — the `prepositions.html:3242` contract), the K-064…067 arrangement renderer for the scene.
- Screen type-word · Locales 11 · Key: the filled sentence.
- Risks: the scene must show one relation unambiguously → one object, one landmark, the relation drawn by the position-words renderer (`types/_shared/position-words.js`), reviewed per preposition.
- Evidence: topic seed; the old app's fill-in mode (OLD-APP-LESSONS §E "prepositions: fill-in / multiple choice").

**T3 · Choose the word (multiple choice)** — rank 3
```
 [scene]   The dog is ___ the box.    ○ on   ○ under   ○ beside
```
- Child: circles the preposition among frame-valid distractors.
- Settings: Choices (2 / 3) · Items · Prepositions.
- Band K–G1 · Point K.G.A.1.
- Reuse `prepDistractorLabels` (`lcs-grammar.js:520` per ENGINES — frame-valid by construction, A4-safe), `tap-choice`.
- Screen tap-choice · Locales 11 · Key: the word.
- Risks: a distractor that is also true of the scene (beside vs next to) → the scene shows one relation; distractors are from a disjoint relation set (the engine's label set).
- Evidence: the old app's MC mode; "prepositions … exercises" classes.

**T4 · Follow the directions — place the stickers** — rank 4
```
 ✂ 🐱 🐶 🐸 ⭐      "Put the cat ON the table. Put the frog UNDER the chair."     [scene with table and chair]
```
- Child: cuts the pictures and glues them where the sentences say (reading + position; the hands-on face).
- Settings: Sentences (3 / 4) · Prepositions · Scene (two landmarks).
- Band K–G1 · Point K.G.A.1 + RF.K.4 (read with purpose).
- Reuse `prepSentence` ×n, the scene renderer, K-240 cut lines; `tap-edit` for the screen (drag the picture to the landmark's zone — zones = the renderer's relation boxes).
- Screen tap-edit (zones; D1) · Locales 11 · Key: the placed scene.
- Risks: two sentences placing two objects in the same zone → zones distinct by construction; an unreadable relation (behind) in 2D → `behind`/`in front of` are drawn with the renderer's overlap convention only where the engine has a row.
- Evidence: "read and do" demand ("leseaufträge" de, "lecture de consignes" fr) crossed with position words.

## B6 — literacy B

### 45. Grammar: Word Classes, Pronouns & Verbs (`grammar`) — 5 new

Bank-bound (word class and inflection are language facts; own words refused). Five new tasks; three need native data (adjective triples, agreement pairs, person forms).

**T1 · Adjective comparison (big · bigger · biggest)** — rank 1
```
 🐘 🐘 🐘 (three sizes)   big   [ bigger ]   [ biggest ]        klein · [kleiner] · am [kleinsten]
```
- Child: writes the comparative and superlative from the base form shown with three pictures of increasing size/degree.
- Settings: Adjectives (chips from the bank) · Forms asked (comparative / both) · Irregulars (on at level 3: good–better–best; gut–besser).
- Band G2–G3 · Point L.2.1.e? (no — L.3.1.g "comparative and superlative adjectives" is the CCSS code; G2 in de "Steigerung", fr CE2 "comparatif").
- Reuse the three-size picture row of `types/_shared/size-compare.js` (baseline-aligned, B6), `type-word`; **author** ~20 adjective triples ×11 (`data/grammar/comparison.<loc>.json`: regular + the locale's irregulars; es "más grande" periphrastic — the panel decides the form the sheet asks: "más grande / el más grande").
- Screen type-word ×2 · Locales 11 after the triples are signed · Key: the forms.
- Risks: periphrastic locales (es/pt/fr/it "plus grand") → the gap is the whole phrase, never a suffix; fi comparative "-mpi" with consonant gradation → literals per adjective.
- Evidence: topic seed; "gegenteile adjektive" (de) adjacent; "i contrari degli aggettivi qualificativi" (it); comparison is in every G2–G3 national grammar list.

**T2 · Colour the word classes in sentences (Montessori symbols)** — rank 2
```
 Der kleine Hund schläft.      ▲ noun = black triangle   ● verb = red circle   ▲small = adjective (blue)
```
- Child: marks each word of a bank sentence with its class (colour or the Montessori symbol) — in context, not in bins (G1-293/G2-275 sort isolated words).
- Settings: Classes (noun+verb / +adjective / +article) · Marking (colour / symbol) · Sentences (4 / 6).
- Band G1–G3 · Point L.1.1.b–f, L.2.1 (word classes in sentences); de "Wortarten … Montessori" (demand), nl "woordsoorten benoemen".
- Reuse `data/b2/sentences.js` frames with per-token class tags (the frames' `{noun}` / `{color}` slots are typed; the fixed words need a class tag per frame — **author** tags per frame ×11, small), `data/b2/word-classes.js`, `tap-paint` on tokens.
- Screen tap-paint (palette = classes) · Locales 11 after the frame tags are added · Key: the marked sentence.
- Risks: a word that is two classes (en "walk") → frames where every token has one class in context (the tag is per frame, so the author decides per sentence); the Montessori symbol colours are a convention the panel confirms per locale.
- Evidence: "wortarten montessori / wortarten bestimmen" (de 51, report), "woordsoorten benoemen" (nl 29), "nature des mots dans une phrase" (fr), "ordklasser … övningar" (sv).

**T3 · Conjugation table (present tense, all persons)** — rank 3
```
 spielen:   ich [spiele]   du [spielst]   er/sie/es [ ]   wir [ ]   ihr [ ]   sie [ ]
```
- Child: fills the present-tense (level 3: past) table of a regular verb; irregular helper verbs as a separate card.
- Settings: Verbs (chips) · Tense (present / past) · Persons (singular / all).
- Band G2–G3 · Point the national grammar programmes (de "Verben konjugieren Klasse 3", fr "conjugaison au présent" — a head term, es/pt "conjugar verbos", nl "werkwoorden vervoegen" — 47, report); en-US: weak demand, the s-form only (L.1.1.e / L.3.1.d) → en offers the "I / you / he / she / we / they" row for -s agreement.
- Reuse `data/b3/verb-forms.js` ×10 **extended with person forms** where the bank holds only today/yesterday forms (author ~15 verbs × 6 persons ×11; the Nordic and en tables are nearly flat — the panel decides whether the table is worth a page there: sv/da/no verbs do not inflect for person → a 2-row "presens/preteritum" table instead, matching "verb presens preteritum" demand).
- Screen type-word ×6 · Locales 11 (shape differs: full table in de/fr/es/pt/it/nl/fi; tense pairs in sv/da/no; s-form row in en) · Key: the table.
- Risks: a locale shape chosen by English logic → the shape is a per-locale data flag; fi personal endings + consonant gradation → literals.
- Evidence: "conjugaison au présent" (fr head), "werkwoorden vervoegen" (nl head), "conjugar verbos" (es head), "conjugação de verbos … 3 ano" (pt), "verb presens preteritum" (sv/no), "udsagnsord nutid og datid" (da), "verbin persoonamuodot" (fi).

**T4 · Capitalise the nouns (and names)** — rank 4
```
 der hund schläft im garten .  →  rewrite: Der Hund schläft im Garten.      (de: every noun; en/others: names, days, I)
```
- Child: finds the words that need a capital and rewrites/marks them (de: all nouns — the Klasse-1/2 core rule; other locales: proper nouns, sentence starts, en "I", de/en weekdays).
- Settings: Rule (nouns [de] / names / sentence starts / mixed) · Sentences (4 / 6) · Task (mark / rewrite).
- Band G1–G2 · Point L.1.2.a, L.2.2.a (capitalise holidays, product names, geographic names); Lehrplan "Nomen großschreiben".
- Reuse `lib/sentence-bank.js corrupt()` (`:8-9`, lower-cases deterministically) over frames with class tags (T2's tags give the nouns), `tap-select` tokens / `type-word` rewrite.
- Screen tap-select · Locales 11 (the rule set per locale is data: de nouns; en I + names; da/no/sv/nl/fi/it/es/pt/fr names only — weekdays lower-case there, `data/b3/days-and-months.js` capitalisation rule) · Key: the corrected sentence.
- Risks: a locale rule mis-stated → the rule table is per locale and native-signed; the corrupt() transform is the one deliberate text transform in the bank.
- Evidence: "capital letters and punctuation for grade 1/2" (en 81-class), "nomen großschreiben"-class de, "majuscule et point cp" (fr), "hoofdletters en leestekens" (nl).

**T5 · Adjective–noun agreement (gender and number)** — rank 5
```
 🐱 une [petite] chatte     🐕 un [petit] chien     🐱🐱 des [petites] chattes      (fr/es/pt/it; sv/da/no: en stor hund / ett stort hus)
```
- Child: writes/chooses the adjective form that agrees with the noun's gender and number.
- Settings: Adjectives (chips) · Number (singular / plural) · Task (choose / write).
- Band G1–G3 · Point programmes CE1 "accord de l'adjectif", SEP/BNCC "concordancia", Indicazioni "concordanza", Lgr22/Fælles Mål/LK20 "adjektivets böjning (en/ett)".
- Reuse vocab gender/plural, **author** adjective form tables ×8 (fr/es/pt/it/sv/da/no/de — de only in the attributive "ein kleiner Hund" with the n-declension table of `lcs-grammar.js:447-452`; en/fi/nl: refused — no gender agreement of adjectives in en/fi; nl has "-e" (de grote hond / het grote huis / een groot huis) → nl included with its one rule).
- Screen tap-choice / type-word · Locales 9 (en, fi refused) · Key: the phrase.
- Risks: computing an ending → literals per adjective × gender × number, never suffixing (A6).
- Evidence: "singulier et pluriel des adjectifs" (fr), "concordancia"-class es/pt, "adjektiv entall og flertall" (no), "ental og flertal tysk/dansk" (da).

### 46. Vocabulary: Opposites, Synonyms & Word Parts (`word-meaning`) — 4 new

24 faces already cover opposites, synonyms, shades, roots, compounds and prefixes; meaning claims are bank-bound. Four new tasks.

**T1 · Compound puzzle cards** — rank 1
```
 ✂ [🌞 Sonne][🌸 Blume]   [🌞][🪞 Brille]   [🦶 Fuß][⚽ Ball]      jigsaw halves; (de/nl/sv/da/no: the joining letter on the tab)
```
- Child: joins two picture halves into a compound and writes it (the joining letter — de "Fugen-s" — printed on the tab where the bank has it).
- Settings: Compounds (6 / 8) · Joining letter shown (on/off) · Tabs (shaped / straight).
- Band G2 · Point L.2.4.d (compound words); de "zusammengesetzte Nomen" (head), nl "samenstellingen", sv/da/no "sammansatta ord".
- Reuse `data/b3/compound-words.js` ×11 (with the joining-letter field, G2-329), `word-brick.js` tabs, K-240 cut lines.
- Screen material (+ tap-order pairs on screen) · Locales 11 (en/fr/es/pt/it compounds are fewer — the banks decide) · Key: the compounds.
- Risks: two halves that form a second real compound → the bank's pairs are checked for cross-combinations (same scan as the sentence halves).
- Evidence: topic seed; "zusammengesetzte nomen klasse 3" (de), "samenstellingen groep 4" (nl), "sammansatta ord arbetsblad" (sv), "compound words for kids" (en).

**T2 · Name the group (category word)** — rank 2
```
 🍎 🍐 🍌  →  [ fruit ]        🚗 🚌 🚲  →  [ ]        bank: fruit · vehicles · clothes
```
- Child: writes the category word for a set of pictures (L.K.5.a "sort into categories to gain a sense of the concepts").
- Settings: Groups (4 / 6) · Bank (on/off) · Pictures per group (3 / 4).
- Band K–G1 · Point L.K.5.a, L.1.5.a; the hypernym step after sorting.
- Reuse `data/literacy/category-vocab.json` (labels ×11), `iconRows`, `type-word` / `tap-choice`.
- Screen type-word (bank) · Locales 11 · Key: the words.
- Risks: a group with two valid names (animals / pets) → the bank's label is the key; alternatives the panel lists are `alts` (A4).
- Evidence: "clases de palabras … sustantivos" adjacent; "Oberbegriffe finden" (de Klasse 1 staple), "mots génériques" (fr CE1).

**T3 · Diminutives (and augmentatives)** — rank 3
```
 🐶 Hund → Hündchen      🏠 casa → casita / casona      🐱 kat → katje      🐭 gato → gatinho
```
- Child: writes the diminutive (pt/it: and augmentative) of the picture noun — a G1–G2 grammar point in pt ("diminutivo e aumentativo 2 ano" — 137-class demand), it ("nomi alterati"), es ("-ito"), de ("-chen/-lein"), nl ("-je"), fr ("-ette", limited).
- Settings: Form (diminutive / augmentative where the locale has it) · Items (6 / 8) · Bank (on/off).
- Band G1–G2 · Point BNCC "formação de palavras", Indicazioni "nomi alterati", Lehrplan "Wortbildung".
- Reuse **author** `data/word-meaning/diminutives.<loc>.json` (~20 pairs for pt/it/es/de/nl; fr ~10; **refused** en, sv, da, no, fi — no productive school diminutive) with the vocab pictures; `type-word`.
- Screen type-word · Locales pt/it/es/de/nl/fr after sign-off; en/sv/da/no/fi refused with the reason on the card · Key: the forms.
- Risks: a computed suffix (de Umlaut: Hund → Hündchen) → literals only; pt "-zinho" vs "-inho" choice → the panel's form per noun.
- Evidence: "diminutivo e aumentativo 2 ano / de casa / de boca" (pt compound-words bucket — the top pt morphology demand), "nomi alterati e derivati scuola primaria" (it), "palabras … diminutivos" (es).

**T4 · Opposites memory / domino cards** — rank 4
```
 ✂ [⬆ big] [⬇ small] [🔥 hot] [❄ cold] …   pairs of opposites with pictures; Memory or dominoes
```
- Child: pairs opposite cards (game format; the K-351/G1-307 faces are on-page).
- Settings: Pairs (6 / 8 / 10) · Words (on/off) · Format (memory / dominoes).
- Band K–G1 · Point L.K.5.b (relate frequently occurring words to their opposites); material.
- Reuse `data/b3/opposites.js` ×11 (pairs with pictures), K-240 cut lines, `domino.js` geometry.
- Screen material · Locales 11 · Key: the pairs.
- Risks: an adjective whose picture is ambiguous (fast/slow) → the bank's reviewed picture pairs only (the b3 panels read them).
- Evidence: "opposites game / opposites for kindergarten" (en), "gegenteile … kinder" (de), "les contraires jeu" (fr), "tegenstellingen spel" (nl), "motsatsord förskola" (sv).

### 47. Sentences (`sentences`) — 6 new

Own sentences only on strips / fix / open cloze (sentences-Q1); unscramble, bank cloze and question words stay frame-bound.

**T1 · Sentence strips to cut and rebuild (own sentences)** — rank 1
```
 ✂ │ The │ cat │ sleeps │ on │ the │ mat │ . │      cut the strip into words; rebuild; glue on the line below
```
- Child: cuts the teacher's sentence into word cards, rebuilds it, glues it — the material-generator strips, now from own text.
- Settings: Sentences (my list / bank, 2–4) · Cut (words / two halves) · Glue line (on/off).
- Band K–G1 · Point L.K.1.f, L.1.1.j (produce complete sentences); the strip is the classroom literacy-centre staple.
- Reuse `lib/sentence-bank.js tokenize` (`:32-40` punctuation rules), K-240 cut lines; typographic rules per locale applied by the shell.
- Screen material (the rebuild on screen would be an unscramble → refused for own text, sentences-Q1) · Locales 11 · Key: the sentence.
- Risks: a 12-word sentence that does not fit one strip → "Shorten the sentence" (gate 9); the teacher's text is printed verbatim (never inflected).
- Evidence: topic seed; "sentence building cards / sentence strips" (en), "schüttelsätze klasse 1" (de — bank), "frases embaralhadas 1 ano" (pt).

**T2 · Open cloze (the teacher marks the gap)** — rank 2
```
 The cat sleeps on the [ mat ].     (teacher typed the sentence and marked one word; alternatives as a comma list)
```
- Child: fills the one gap the teacher marked; the key prints her word (+ alternatives).
- Settings: Sentences (my list, 4–8) · Gap (one word, marked with brackets) · Letter boxes (on/off).
- Band G1–G2 · Point L.1.1 / RF.1.4.c (context); de "Lückentext erstellen" (demand 41, report), fr "texte à trous".
- Reuse the cloze card of `G1-350` (`data/b4/cloze.js` layout) with teacher text; `type-word` with `data-lcs-alts` (A4); the "teacher-made" chip.
- Screen type-word · Locales 11 · Key: the teacher's word(s).
- Risks: a gap with many right answers → the chip says "teacher-made"; the alternatives list is the teacher's responsibility and the page says so.
- Evidence: "lückentext erstellen / lückentext deutsch" (de 78+41, report), "texte à trous" (fr), "completa las oraciones" (es), "complete as frases" (pt), "completa le frasi" (it), "fyll i rätt ord" (sv), "täydennä lauseet" (fi).

**T3 · Rebus sentences (pictures in the sentence)** — rank 3
```
 The 🐱 sleeps on the 🛏.      → write the sentence: ______________________      (frames with {noun} slots → pictures)
```
- Child: reads a bank sentence whose nouns are pictures and writes it out with the words (reading + writing).
- Settings: Sentences (3 / 5) · Pictures per sentence (1 / 2) · Bank (on/off).
- Band K–G1 · Point RF.K.4, L.K.1.f; the pre-reader sentence format.
- Reuse `data/b2/sentences.js` frames (`{noun}` slots with `sg/pl` number — the picture shows one or many accordingly; `lib/sentence-bank.js:4-9`), vocab pictures, `type-word` per picture slot.
- Screen type-word (the picture words) · Locales 11 · Key: the full sentence.
- Risks: a noun the frame inflects (fi partitive) → frames are literal substitution only (sentence-bank rule) so only nominative-slot frames are used — the bank was authored that way.
- Evidence: "lesen lernen bildsätze"-class de, "phrases à trous ce1" (fr), the K-390 sight-word sentence steps.

**T4 · Sentence or not? (fragment vs sentence)** — rank 4
```
 the big dog        ○ sentence  ○ not yet        The dog runs fast.   ○ sentence  ○ not yet
```
- Child: decides whether a word group is a complete sentence; level 3: finishes the fragments.
- Settings: Items (6 / 8) · Fragments (noun phrase / verb phrase / both) · Finish them (on/off).
- Band G1–G2 · Point L.1.1.j (complete sentences), L.2.1.f.
- Reuse frames + a deterministic fragment generator (drop the verb group or the subject of a frame — the frame's slot structure says which tokens form the subject), ✓/✗ chips.
- Screen tap-choice · Locales 11 · Key: ✓/✗ (+ a model completion).
- Risks: a fragment that is a sentence in the locale (es/it/pt drop subjects: "Duerme." is a sentence) → fragments are noun-phrase-only in pro-drop locales (per-locale rule flag).
- Evidence: "sentence building … kindergarten" (en), "satz oder kein satz" (de Klasse 1 staple), "frasi … completa" (it).

**T5 · Match the sentence halves (with a picture anchor)** — rank 5
```
 The cat   ───   sleeps on the mat.  [🐱]        The dog  ───  runs in the garden. [🐶]
```
- Child: draws lines joining subjects to predicates; the picture beside each predicate disambiguates.
- Settings: Pairs (4 / 6) · Picture anchor (on at level 1–2) · Distractor half (on/off).
- Band G1–G2 · Point L.1.1.j; sentence structure.
- Reuse frames split at the subject boundary (the slot structure), pair screen; A4: cross-combinations are grammatical but false to the pictures → the picture is the truth.
- Screen tap-order pairs · Locales 11 · Key: the lines.
- Risks: without pictures two halves could swap truthfully → level 3 (no pictures) uses frames whose predicates are noun-specific (the bank's `uses` field).
- Evidence: "sentence building" (en), "meningsbyggnad" (sv head), "byg sætninger" (da).

**T6 · Stretch the sentence (add when / where / how)** — rank 6
```
 The cat sleeps.   →  Where? ________   When? ________   →  The cat sleeps ______ ______ .
```
- Child: expands a short bank sentence with answers to question words and writes the longer sentence (open writing frame).
- Settings: Sentences (3 / 4) · Questions (where / when / how / which — chips) · Lines.
- Band G1–G2 · Point L.1.1.j (expand sentences), W.1.3; de "Sätze erweitern", fr "enrichir la phrase".
- Reuse frames + `data/b4/question-words.js` words ×11 (the question words exist), `trace-path.js rulingBlock`.
- Screen printable (open) · Locales 11 · Key: none (a model page).
- Risks: none (open).
- Evidence: "sentence building activities" (en), "w-fragen deutsch" (de head), "les mots interrogatifs" (fr).

### 48. Reading Comprehension (`reading`) — 4 new

Passage bank is thin (8 per locale); "no AI" forbids generated questions. Four new tasks — two on own text, two on the bank.

**T1 · My passage, my questions (layout only)** — rank 1
```
 ┌ title ─────────────────────┐
 │ (the teacher's text, ≤ 120 words)      │
 └────────────────────────────┘
 1. ________________?   ____________
 2. ________________?   ○ a  ○ b  ○ c
```
- Teacher types a passage and her own questions (open or multiple choice with her options and her marked answer); the maker lays it out and keys the MC answers.
- Settings: Text (my passage) · Questions (my list, 2–6; open / MC) · Picture (library, optional) · Font size (standard / large).
- Band G1–G3 · Point RL/RI.1–3.1 (ask and answer questions); de "Leseverständnis Klasse 2", nl "begrijpend lezen groep 4", fr "lecture et compréhension ce1" (demand heads).
- Reuse the `G2-254` layout (`lib/reading-comprehension-screen.js`), body-budget refusal ("the text is too long for one page — a second page is added"); the "teacher-made" chip.
- Screen tap-choice (MC) · Locales 11 · Key: the teacher's answers.
- Risks: nothing generated; a passage past the body budget → page 2 (never a smaller font below the floor).
- Evidence: topic seed; "leseverständnis klasse 3 / 2" (de), "begrijpend lezen teksten" (nl 49, report), "comprensión lectora segundo grado" (es), "interpretação de texto 2 ano" (pt), "läsförståelse uppgifter åk 2" (sv), "leseforståelse 2 klasse" (no).

**T2 · True or false on a passage** — rank 2
```
 [bank passage]     The fox was red.   ○ true  ○ false        The fox slept all day.   ○ true ○ false
```
- Child: reads a bank passage and judges statements (the statements are authored with the passage; G1-341 is picture-row true/false).
- Settings: Passage (picker) · Statements (4 / 6) · Mixed with "not in the text" (level 3).
- Band G1–G2 · Point RL.1.1, RI.2.1; the "richtig oder falsch" format.
- Reuse `data/literacy/reading-passages.js` ×11 (+ **author** 4–6 true/false statements per passage — part of the passage programme ENGINES #48 names), ✓/✗ chips.
- Screen tap-choice · Locales 11 for passages with statements · Key: ✓/✗.
- Risks: a statement arguable from the text → statements authored and native-reviewed per passage; the ratio balanced (gate 8).
- Evidence: "read and check: true or false" (G1-341) exists on pictures; "leseverständnis … mit lösungen" (de), "compréhension … vrai ou faux" (fr).

**T3 · Best title / main idea** — rank 3
```
 [bank passage without a title]      Which title fits best?   ○ A day at the pond   ○ The red bicycle   ○ Winter is cold
```
- Child: chooses the title that fits the passage (main idea) — two distractors are titles of other bank passages (deterministic, no authoring).
- Settings: Passage · Choices (3) · Picture (on/off).
- Band G2–G3 · Point RI.2.2 / RL.2.2 (main topic / central message).
- Reuse the passage bank's titles (each passage has one), `chipRow`.
- Screen tap-choice · Locales 11 · Key: the title.
- Risks: two passages on the same topic → distractor titles drawn from passages with a different topic tag (the bank's `rc-levels` metadata).
- Evidence: "reading comprehension strategies" (en), "compréhension de texte … titre"-class fr; a zero-authoring main-idea face.

**T4 · Reading log / book report frame** — rank 4
```
 Title: ________  Author: ________   ★★★★★
 My favourite part: _________________
 Draw it: ┌──────────┐
```
- Child: fills a reading-log page for any book (open material).
- Settings: Fields (title / author / stars / favourite part / new word / drawing — chips) · Lines.
- Band K–G3 · Point RL.K–3 engagement; material (de "Lesetagebuch", fr "carnet de lecture", nl "leeslogboek").
- Reuse `trace-path.js rulingBlock`, strings ×11 (~8 field labels, author).
- Screen material · Locales 11 after the labels are signed · Key: none.
- Risks: none.
- Evidence: "lesetagebuch grundschule"-class de, "reading log"; the one reading page every class uses weekly.

### 49. Stories & Writing (`stories-writing`) — 6 new

**T1 · Story map (beginning · middle · end)** — rank 1
```
 ┌ Beginning ──────┐ ┌ Middle ──────┐ ┌ End ──────┐
 │ who? where?     │ │ what happens? │ │ how does it end? │   (picture box + 3 lines each)
```
- Child: plans or retells a story in three boxes with prompts (open writing frame).
- Settings: Boxes (3 / 4 with "problem") · Prompts (on/off) · Lines (2 / 4) · Picture boxes (on/off).
- Band G1–G3 · Point W.1.3, W.2.3 (narrative with a sequence of events); de "Erzählplan", fr "schéma narratif".
- Reuse `primitives/story-panel.js` frames (`story-panel.js:7-10`), `rulingBlock`; prompt strings ×11 (~8, author).
- Screen printable (open) · Locales 11 after the prompts are signed · Key: none.
- Risks: none.
- Evidence: topic seed; "story sequencing … grade 2" (en), "bildergeschichten 3 klasse" (de), "production d'écrit ce1" (fr head), "produção de texto com imagem 2 ano" (pt), "produzione scritta guidata scuola primaria" (it 35, report).

**T2 · Comic strip (frames + speech bubbles, own or library pictures)** — rank 2
```
 ┌────────┬────────┬────────┐
 │ 🐱 💬  │ 🐶 💬  │ 🐱🐶 💬 │   pictures from the library (or own photos, whole) with empty speech bubbles
```
- Child: writes the dialogue in the bubbles (and a caption) for a 3–4 frame strip; the teacher chooses the pictures.
- Settings: Frames (3 / 4) · Pictures (theme / my photos) · Bubbles (speech / thought / both) · Caption line (on/off).
- Band G1–G3 · Point W.1.3, L.2.2.c (dialogue punctuation at level 3: en quotation marks, de „…“, fr « … »).
- Reuse `story-panel.js` frames, speech-bubble SVG (new small shape), own photos whole (ARCHITECTURE §7.2, no label).
- Screen printable (open) · Locales 11 · Key: none.
- Risks: own photos never travel to student links (B1 rule) → the share button refuses with the reason.
- Evidence: topic seed; "interpretação de texto história em quadrinhos" (pt 38, report), "bd … apprendre à dessiner" (fr), "bildergeschichten" (de head).

**T3 · Roll a story (character · place · problem)** — rank 3
```
 ⚀🐱 ⚁🐶 ⚂🐸 …    ⚀🏠 ⚁🌲 ⚂🏖 …    ⚀ lost  ⚁ hungry  ⚂ a storm …     roll three dice, write your story
```
- Child: rolls for a character, a place and a problem (pictures + words), then writes.
- Settings: Dice (2 / 3) · Theme · Lines (6 / 10).
- Band G1–G3 · Point W.1.3; the writing-centre game.
- Reuse `primitives/dice.js` faces, vocab pictures/words for character and place; **author** ~12 "problem" words ×11 (small).
- Screen printable (game) · Locales 11 after the problem words are signed · Key: none.
- Risks: none (open).
- Evidence: "story dice"-class demand; "picture writing prompts for kids" (en), "production d'écrit cp période 1" (fr).

**T4 · Describe the character** — rank 4
```
 ┌────────┐   My character is a [🐻 bear].   It is ______ and ______ .   It likes ______ .   It lives ______ .
 │  🐻    │   word bank: brown · big · soft · honey · forest
```
- Child: writes a description of a library character with sentence starters and an adjective bank.
- Settings: Picture (theme) · Starters (3 / 4) · Bank (adjectives from the opposites bank / none).
- Band G1–G2 · Point W.1.2 (informative/descriptive), L.1.1.f (adjectives).
- Reuse `G2-299` starters (`data/b2/sentences.js`-style literals ×11), `data/b3/opposites.js` adjectives, `rulingBlock`.
- Screen printable · Locales 11 · Key: none.
- Risks: gendered starters (fr "Il/Elle est") → starters keyed to the noun's gender from the vocab (the `{il}` precedent, word-problems-Q1).
- Evidence: "picture prompts for creative writing" (en), "steckbrief"-class de ("das bin ich steckbrief" adjacent), "produzione scritta guidata" (it).

**T5 · Postcard / letter frame** — rank 5
```
 ┌───────────────────────┬──────────┐
 │ Dear ______,          │ [stamp]  │
 │ ________________      │ To: ____ │
 │ ________________      │ ________ │
 │ From, ______          │          │
 └───────────────────────┴──────────┘
```
- Child: writes a postcard/letter in the locale's letter conventions (greeting, closing, address block — per locale).
- Settings: Format (postcard / letter) · Greeting/closing printed (on/off) · Picture side (theme).
- Band G1–G3 · Point W.1.3 / W.2.3 with letter form; de "Brief schreiben Klasse 2", fr "écrire une carte postale".
- Reuse `rulingBlock`; **author** greeting/closing/address labels ×11 (~6 strings, the panel sets the national letter form).
- Screen printable · Locales 11 after sign-off · Key: none.
- Risks: a wrong national address order → authored per locale.
- Evidence: "production d'écrit … rentrée" (fr), "schreiben … klasse 2" (de), "picture writing prompts elementary" (en).

**T6 · Caption the picture (speech bubble / one line)** — rank 6
```
 ┌──────────┐  💬 ______________        ┌──────────┐  Caption: ______________
 │ 🐱 🐟    │                           │ 🐶 ⚽    │
```
- Child: writes one line per picture (a caption or what the character says) — the K–G1 entry to writing about pictures (G2-278 asks for a paragraph).
- Settings: Pictures (3 / 4) · Form (caption / bubble) · Bank (nouns on/off).
- Band K–G1 · Point W.K.2, W.1.3.
- Reuse `iconRows`/scene snippets, bubble shape, `rulingBlock`.
- Screen printable · Locales 11 · Key: none.
- Risks: none.
- Evidence: "sätze bild schreiben klasse 1" (de), "ord till bilden / meningar till bilden" (sv picture-writing bucket), "setninger til bildet" (no).

### 50. Word Problems (`word-problems`) — 4 new

Frames are native per locale (`data/word-problems/frames.js`); every new story kind is ×11 authoring, so four new kinds, each distinct in structure.

**T1 · Compare problems (how many more / fewer?)** — rank 1
```
 Mia has 8 apples. Tom has 5 apples. How many more apples does Mia have?   [🍎×8 / 🍎×5 side by side]   [ 3 ]
```
- Child: solves compare-type stories (the hardest K-2 type; COVERAGE.md names it) with a side-by-side picture.
- Settings: Range (to 10 / 20 / 100) · Direction (more / fewer / both) · Pictures (on/off) · Names (my class).
- Band G1–G2 · Point 1.OA.A.1 (compare with unknown difference), 2.OA.A.1; Lehrplan "Vergleichsaufgaben".
- Reuse the `compare` kind of the level set (`lib/word-problems-levelset.js:230,241` per ENGINES #50), `iconRows` ×2, own names per word-problems-Q1 (fr gender chip).
- Screen type-number · Locales 11 · Key: the difference.
- Risks: the two groups' pictures drawn in rows make the answer countable without reading — intended at level 1 (the bar-model logic); level 3 hides pictures.
- Evidence: topic seed; "problemas de suma y resta … primer grado" (es), "situações problema adição e subtração 2 ano" (pt 45, report), "räknehändelser åk 1" (sv), "regnehistorier 1 klasse" (da), "regnefortellinger 2 trinn" (no).

**T2 · Two-step problems** — rank 2
```
 Lena has 12 stickers. She gives 4 to Ali and buys 6 more. How many does she have now?   [ 14 ]
 step 1: 12 − 4 = [ ]    step 2: [ ] + 6 = [ ]
```
- Child: solves a two-operation story with two scaffold boxes at level 1–2, one box at level 3.
- Settings: Range (to 20 / 100) · Operations (+− / with ×÷ at G3) · Scaffold (two steps / one answer) · Names.
- Band G2–G3 · Point 2.OA.A.1 (two-step), 3.OA.D.8.
- Reuse the frame engine with **author** ~12 two-step frames ×11 (`frames.js` shape: `{name} {n1} {n2} {n3} {noun}` — the nouns stay bank-only, fi partitive table), `type-number` ×3.
- Screen type-number · Locales 11 after the frames are signed · Key: both steps.
- Risks: a two-step story whose intermediate goes negative → ranges constrained per frame; A1 on the (n1, n2, n3) triple.
- Evidence: topic seed; 2.OA.A.1 verbatim; "sachaufgaben klasse 3" (de), "word problems for 2nd grade" (en), "verhaaltjessommen groep 5" (nl), "problemi con addizioni e sottrazioni classe terza" (it).

**T3 · Match the story to the number sentence** — rank 3
```
 Ben had 7 pens and lost 2.   ───   7 − 2     7 + 2     2 + 7        (circle / draw the line)
```
- Child: chooses the equation that models the story (representation, not computation).
- Settings: Operations (+− / ×÷) · Choices (2 / 3) · Range.
- Band G1–G3 · Point 1.OA.A.1 ("use objects, drawings, and equations"), 3.OA.A.3; de "Rechengeschichte → Gleichung".
- Reuse the frames, `chipRow` of equations (notation glyphs per locale).
- Screen tap-choice · Locales 11 · Key: the equation.
- Risks: commutative pairs (7 + 2 vs 2 + 7) are both right → both accepted (`alts`) or only one offered; the distractor is always a different operation or a swapped subtraction.
- Evidence: "word problems math" (en head), "sachaufgaben grundrechenarten" (de), "situações problema envolvendo as quatro operações" (pt).

**T4 · Write your own story for the number sentence** — rank 4
```
 7 + 5 = 12      [🐸 🐸 …]  Write a story that fits:  ______________________________
```
- Child: writes a story problem for a given equation (the reverse direction; open).
- Settings: Operation · Range · Picture hint (theme, on/off) · Lines.
- Band G1–G3 · Point 1.OA.A.1 / 2.OA.A.1 (represent) in production; Lgr22 "egna räknehändelser" (demand verbatim), de "Rechengeschichten erfinden".
- Reuse the equation card, `rulingBlock`, `iconRows`.
- Screen printable (open) · Locales 11 · Key: none (a model story from the frames).
- Risks: none (open).
- Evidence: topic seed; "egna räknehändelser" (sv), "lage regnefortellinger" (no), "rechengeschichten schreiben" (de).

### 51. Number of the Day & Number Words (`number-of-the-day`) — 5 new

**T1 · Number of the day to 1000** — rank 1
```
 ┌ 347 ────────────────────────────┐
 │ H [3] T [4] O [7] │ 300+40+7 │ +100 [ ] −100 [ ] │ +10 [ ] −10 [ ] │ even/odd ○○ │ in words: _______ │
```
- Child: fills the 3-digit version of the routine page (G1-257 stops at 99).
- Settings: Number (one / random in range) · Range (100–999) · Boxes (chips: chart / expanded / ±100 / ±10 / parity / words / number line).
- Band G2–G3 · Point 2.NBT.A.1, A.3, B.8 (the whole G2 place-value cluster on one page).
- Reuse `G1-243`'s box layout (`data/b2/labels.js` ×11), `base-ten.js`, `number-line.js`; the words box via `lib/number-words.js` 101–1000 (ENGINES [number-of-the-day-Q1] — refused per locale until the 1000 table is signed; the box is hidden there, the page still ships).
- Screen type-number (+ type-word for the words box) · Locales 11 (words box per sign-off) · Key: the page.
- Risks: box count vs body → the chips cap at 6 boxes (fill rule).
- Evidence: "zahl des tages zr 100 / klasse 3" (de), "getal van de dag tot 1000" (nl 516-class), "le nombre du jour ce2 / cm1" (fr), "dagens tall tresifret" (no).

**T2 · Write it both ways (numeral ↔ word, no bank)** — rank 2
```
 thirty-six  →  [ 36 ]        72  →  [ seventy-two ]       (letter pad on screen; de "zweiundsiebzig" unit-first)
```
- Child: converts number words to numerals and numerals to words without a bank (G1-227 copies from a bank).
- Settings: Range (to 20 / 50 / 100 / 1000) · Direction (both / one) · Items (6 / 10).
- Band G1–G3 · Point 2.NBT.A.3 (read and write to 1000 in number names); de "Zahlwörter schreiben" (head), es "números en letras del 1 al 1000", pt "números por extenso de 1 100".
- Reuse `lib/number-words.js` (0..100 ×11; 101–1000 per sign-off), `lib/letter-pad.js` keys (the hyphen of fr, the space of es "noventa y siete" — `letter-pad.js:3-5`).
- Screen type-word / type-number · Locales 11 (range 1000 per locale sign-off) · Key: the forms.
- Risks: alternative spellings (fr rectified "vingt-et-un" vs traditional) → the bank's chosen register is the key, alternatives as `alts` where the panel lists them; nl "één".
- Evidence: "zahlwörter schreiben / ausschreiben" (de), "números en letras del 1 al 1000" (es), "números por extenso de 1 100 / 1000" (pt), "numeri in lettere fino 100" (it), "getallen in woorden schrijven" (nl), "talord / tallord" (da/no head).

**T3 · Numeral · word · quantity — three-way match** — rank 3
```
 8  ───  eight  ───  [●●●●●●●●]        12 ─── twelve ─── [frame+2]
```
- Child: joins each numeral to its word and to its quantity picture (three columns; G1-225 matches two).
- Settings: Range (1–10 / 11–20) · Quantity (ten-frame / pictures / tally) · Pairs (4 / 6).
- Band K–G1 · Point K.CC.A.3 + K.CC.B.4 + number words.
- Reuse `number-words.js`, `ten-frame.js` / `iconRows` / `tally.js`, the pair screen (two link sets).
- Screen tap-order (two passes: numeral→word, word→quantity) · Locales 11 · Key: the lines.
- Risks: column order tells → shuffled per column (gate 8).
- Evidence: "number chart number words" (en), "numeri in lettere 1 20" (it), "lukusanat" (fi head).

**T4 · Number-word word search** — rank 4 (cross-link: the word-search engine)
- The word-search factory (ENGINES Part 3 §A) with the number words of the range as the list; the clue column shows numerals (so the child must read the word to find it). Settings: Range (1–10 / 1–20 / tens) · Grid · Case. Band K–G1 · Point K.CC.A.3. Locales 11 (fi long words → grid ≥ 12). Key: the grid. Evidence: topic seed; "talord krydsord / tallord kryssord" (da/no — number words in puzzles are a head term), "number words 1-20" (en).

**T5 · Number-word cards (word wall / matching)** — rank 5
```
 ✂ [ 7 ] [seven] [●●●●●●●]   cards per number: numeral · word · dots — match or wall
```
- Teacher: prints number-word cards (numeral, word, quantity) for the wall or for matching games.
- Settings: Range (0–10 / 11–20 / tens to 100) · Cards (numeral+word / +dots) · Size.
- Band K–G1 · Point K.CC.A.3; material.
- Reuse `number-words.js`, `ten-frame.js`, K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: none.
- Evidence: topic seed; "number words chart / anchor chart" (en), "nombres en lettres affichage" (fr), "zahlwörter liste" (de).

### 52. Ordinal Numbers (`ordinal-numbers`) — 4 new

Six faces cover find/mark, either-end, write, words→picture, which place and the race; the bank has gender/capital rules (`data/b3/ordinals.js`). Four new tasks.

**T1 · Ordinal words to 31 — dates** — rank 1
```
 the 21st  →  twenty-first        der 3. Oktober → der dritte Oktober        le 1er mai → le premier mai
```
- Child: writes/reads ordinals 11th–31st as words and numerals in the locale's date form (the calendar link).
- Settings: Range (1–10 / 11–20 / 21–31) · Form (numeral → word / word → numeral / dates) · Items.
- Band G1–G2 · Point 1.MD / the national "Ordnungszahlen bis 31 / dates" rows (pt "números ordinais até 100" demand; it "numeri ordinali e cardinali").
- Reuse `data/b3/ordinals.js` (×11 with gender/capital rules, `:15-18` per ENGINES) **extended** 11th–31st (author ×11: fr "1er/1re, 2e…", es "1.º / 1.ª", de "der 21." with the period, en "21st"), `lib/letter-pad.js`.
- Screen type-word · Locales 11 after the 11–31 rows are signed · Key: the forms.
- Risks: gendered ordinals (fr "première", es "primera", pt "primeira", it "prima") → the frame's noun decides (date = masculine day in fr/es/pt/it: "le premier"), literals per row.
- Evidence: topic seed; "números ordinales hasta el 20 / del 1 al 100" (es 51, report), "números ordinais até 100" (pt 61), "ordningstal datum" (sv), "numeri ordinali e cardinali" (it), "ordinal numbers … 1 to 31" classes.

**T2 · Which floor? (ordinals in a column)** — rank 2
```
 ┌──────┐ 4th  🐱
 │      │ 3rd  🐶     Who lives on the third floor?  [ 🐶 ]      Which floor is the bird on? [ 2nd ]
 │      │ 2nd  🐦
 │      │ 1st  🐸
```
- Child: reads ordinals vertically (floors of a house / shelves), from the ground up (the vertical convention the line faces lack).
- Settings: Floors (4 / 6 / 10) · Ask (who is on the Nth / which floor is X) · Ground floor numbering (en-US 1st = ground; de/fr/es/pt/it/nl/sv/da/no/fi: Erdgeschoss/rez-de-chaussée = 0, 1st = the floor above — a per-locale fact flag).
- Band K–G1 · Point K.CC (ordinals to 10); the "which floor" convention is a real locale trap (en-US first floor = European ground floor).
- Reuse `lib/ordinal-numbers-screen.js`, a house/shelf column (simple SVG), `tap-select`/`type-word`.
- Screen tap-select / type-word · Locales 11 with the per-locale floor convention (data flag, native-confirmed; the sheet says "ground floor" explicitly where the convention needs it) · Key: the answers.
- Risks: the floor-numbering trap → never a translated instruction; the convention is a data flag per locale and the panel reads the render.
- Evidence: "rangtelwoorden kleuters" (nl), "ordinal numbers for kindergarten" (en); the vertical reading is the Vorschule "Wer wohnt in welchem Stock?" page.

**T3 · Numeral ↔ word match (1st ↔ first)** — rank 3
```
 3rd ─── third        1st ─── first        2nd ─── second        (fr: 1er ─── premier, 1re ─── première)
```
- Child: joins ordinal numerals to their words (G1-316 joins words to pictures; the symbol ↔ word link is the missing pair).
- Settings: Range (1–5 / 1–10 / 11–20) · Pairs (5 / 8) · Gender forms (fr/es/pt/it: both at level 3).
- Band G1 · Point ordinal notation per locale (de "3.", fr "3e", es "3.º", en "3rd").
- Reuse `data/b3/ordinals.js`, the pair screen.
- Screen tap-order pairs · Locales 11 · Key: the lines.
- Risks: en "1st/2nd/3rd/4th" suffixes vs de ".": each locale's notation from the bank (never English suffixes elsewhere).
- Evidence: "ordinal numbers meaning / asl" classes (en), "ordenstal krydsord" (da), "järjestysluvut" (fi head).

**T4 · Ordinal cards to cut (numeral · word · picture)** — rank 4
```
 ✂ [1st] [first] [🥇]   [2nd] [second] [🥈] …   match or line up
```
- Teacher: prints ordinal card sets for matching/lining up.
- Settings: Range (1–10 / 1–20) · Cards (numeral+word / +picture) · Size.
- Band K–G1 · material.
- Reuse the bank, K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: none.
- Evidence: "ordinal numbers game" (en), "rangtelwoorden herfst" (nl — themed card sets), "ordnungszahlen klasse 1" (de).

## B7 — social and puzzles

### 53. Calendar, Days & Months (`calendar`) — 4 new

Eleven faces cover day/month order, neighbours, abbreviations and reading a month. The harvest's `calendar` bucket is dominated by "kalender 2026" (non-school) — the teacher demand is the routine sheet. Four new tasks.

**T1 · Blank month calendar to fill (any month, any year)** — rank 1
```
  November 2026
  Mo Di Mi Do Fr Sa So        (de: Monday first; en/pt-BR: Sunday first — calendar.js:7-8)
  [ ][ ][ ][ ][ ][ 1][ 2]      the child writes the dates; first day given
```
- Child: fills the dates of a real month from the given first day; level 3 also writes the weekday abbreviations.
- Settings: Month / Year · Given (first day / first week / none) · Abbreviations (printed / child writes) · Stickers (holidays off — no national holiday data; birthday stickers from the class list, optional).
- Band G1–G2 · Point 2.MD (calendar as a measurement of time in national frameworks: Lehrplan "Kalender", programmes CE1 "le calendrier", SLO "kalender"); CCSS has no calendar standard.
- Reuse `primitives/calendar.js` (`calendar({year, month, weekStart, dayAbbr})`, `calendar.js:13-14`; all date math UTC) with empty day cells carrying `data-lcs-answer`; `data/b3/days-and-months.js` ×11 abbreviations + capitalisation rule.
- Screen type-number (dates) / type-word (abbr.) · Locales 11 · Key: the full month.
- Risks: the week-start fact per locale — en + pt-BR Sunday-first in code; **es-MX unconfirmed** (Mexican printed calendars are often Sunday-first; `calendar.js` has Monday) → §"For the operator" F; a 6-row month (`calendar.js:9`) fits by construction.
- Evidence: topic seed; "calendar blank" (en), "kalender … zum ausdrucken" (de), "calendário setembro 2026" (pt — the monthly print appetite), "il calendario di settembre" (it).

**T2 · Birthday graph (class months)** — rank 2
```
 Jan Feb Mar Apr …           colour one box per classmate born in that month; then: which month has the most?
 [ ][ ][ ][ ]…
```
- Child/class: builds a bar graph of birthdays by month (data collection meets the months); questions below.
- Settings: Months (12 / the school year order) · Names (my class list, written on the boxes, on/off) · Questions (most / fewest / how many in spring — the season question is dropped: seasons are science).
- Band G1–G2 · Point 1.MD.C.4, 2.MD.D.10 + months order; the first-week-of-school routine.
- Reuse `primitives/bar-graph.js` with month labels from `days-and-months.js` (abbreviations ×11), `type-number` for the questions.
- Screen printable (open data) + type-number questions · Locales 11 · Key: none for the graph; the questions key reads the teacher's filled data — so questions are printed without a key (open) unless the teacher types the counts.
- Risks: 12 bars × names overflow → names optional; abbreviations per locale.
- Evidence: topic seed; "birthday graph"-class; "daten und diagramme grundschule" (de) crossed with months.

**T3 · Today's date — three ways** — rank 3
```
 Today is  ______day , the [ 14 ]th of [ October ] [ 2026 ].      14 / 10 / 2026      en-US: October 14, 2026 → 10/14/2026
```
- Child: writes today's date in words and in the locale's numeric order (en-US month-first, the ten others day-first; de "14.10.2026", fi "14.10.2026", it "14/10/2026"), plus yesterday/tomorrow.
- Settings: Forms (words / numeric / both) · Yesterday–tomorrow (on/off) · Weekday (on/off).
- Band G1–G2 · Point national "Datum schreiben" rows; the morning-circle routine.
- Reuse `days-and-months.js`, `data/b3/ordinals.js` (the ordinal day where the locale uses it: en "14th", de "14."), the numeric order as a per-locale data flag (never a control).
- Screen type-word / type-number · Locales 11 · Key: the date (the maker takes the date from the recipe's seed, so a saved page keeps its date — the teacher can pick any date).
- Risks: the en-US month-first order shown in another locale → data flag; the date printed in two systems on one page is the *point* (the teacher chooses the forms).
- Evidence: "kalender uhrzeit" (de routine), "how many years months and days" (en — adjacent), the daily "Datum" board in every K-2 class.

**T4 · Weekday timetable (what do we do on …?)** — rank 4
```
 Mon 🎨 art   Tue ⚽ sport   Wed 🎵 music …      "On which day do we have sport?"  [ Tuesday ]
 "What do we do on Friday?" [ 🎨 / ⚽ / 🎵 ]
```
- Child: reads a weekly timetable and answers (day → activity, activity → day); the teacher can set her own class timetable (own words / exact-match pictures).
- Settings: Days (5 / 7) · Activities (bank / my timetable) · Questions (4 / 6).
- Band G1 · Point reading a table + weekday order; de "Stundenplan lesen", fr "l'emploi du temps".
- Reuse `days-and-months.js`, a timetable grid (the logic-grid cells of `primitives/logic-grid.js`), `type-word` / `tap-choice`; **author** ~10 school-activity words ×11 (art, sport, music, reading, maths, swimming, library …).
- Screen type-word / tap-choice · Locales 11 after the activity words are signed · Key: the answers.
- Risks: an own activity word without a picture → word only; weekday capitalisation per locale from the bank.
- Evidence: "days and months chart for kids" (en), "wochentage … lernen" (de), "jours et mois" (fr) — the timetable is how days get read in G1.

### 54. Maps & Coordinates (`maps-grids`) — 5 new

**T1 · Treasure hunt — follow the steps** — rank 1 (the old `treasure-hunt` app, kept)
```
 ┌─🐶─┬───┬───┐    Start at the dog. Go 2 right. Go 1 up. Go 3 right.   → circle where you land  🏆
 │    │   │   │    (level 3: cardinal words: "Gehe nach Osten 2 Felder.")
```
- Child: follows move instructions on a picture grid and circles the landing picture (or traces the route).
- Settings: Grid (4 / 5 / 6) · Steps (3 / 5) · Directions (left/right/up/down · cardinal N/E/S/W) · Pictures (theme).
- Band K–G2 · Point K.G.A.1 (position), 2.G/maps: cardinal directions (G2-369/371 exist); the old app's core.
- Reuse `primitives/coord-grid.js` cells with pictures, `primitives/compass-rose.js` (`compass-rose.js:5-12`); the move frames **per locale** (`moveFrame` table of the old app re-authored ×11 — the A7 lesson "Gehe nach Westen 1 Feld." shipped in 9 locales; number + noun agreement: de "1 Feld / 2 Felder", fr "1 case / 2 cases" → literals per count).
- Screen trace-path (route) + tap-select (landing) · Locales 11 after the frames are signed · Key: route + landing.
- Risks: a revisit (D3) is legal; a route leaving the grid → generator asserts bounds; the frames are never English order with words swapped (A7).
- Evidence: topic seed + the old app; "karten himmelsrichtungen" (de), "kartor med väderstreck" (sv), "kort med verdenshjørner" (da), "kart med himmelretninger" (no), "map skills for kids" (en).

**T2 · Give the directions (write the route)** — rank 2
```
 route drawn from 🐶 to 🦴:   → 2   ↑ 1   → 3        turns: [ 2 ]       (maze T4's sibling on a picture grid)
```
- Child: reads a drawn route and writes it as steps (arrows + counts; cardinal words at level 3) — the production inverse of T1.
- Settings: Grid · Steps (3 / 5) · Form (arrows / words).
- Band G1–G2 · Point maps/cardinal directions in production.
- Reuse `coord-grid.js`, the move frames (key), `type-number` per step count; arrows as glyphs.
- Screen type-number (counts; arrows are tap-choice per step) · Locales 11 · Key: the steps.
- Risks: segmentation ambiguity → steps are maximal straight runs (the instruction says so; the key is unique).
- Evidence: "map skills … grade 2" (en), "orientação e localização" (pt), "puntos cardinales en planos y mapas" (es).

**T3 · Draw your own map with a key** — rank 3
```
 ┌───────────────────────┐   key:  ▲ = ______   ● = ______   ~ = ______      N ↑
 │  (empty plate, compass)│
 └───────────────────────┘
```
- Child: draws a map of her room/school/an island and fills the key with her symbols (open).
- Settings: Plate (empty / island outline / grid) · Key rows (3 / 5) · Compass (on/off).
- Band G1–G2 · Point reading/making a map key (G1-379 reads one); social-studies map rows of every framework.
- Reuse `primitives/island-map.js` (`islandMap({w, symbols, footpaths, northArrow})`, `island-map.js:11` — empty symbols), `primitives/map-symbol.js`, `compass-rose.js`.
- Screen printable (open) · Locales 11 · Key: none.
- Risks: none.
- Evidence: topic seed; "map skills for kids / map skills practice" (en), "lire une carte ce2" (fr), "mapas orientação" (pt).

**T4 · Room plan from above (where is it?)** — rank 4
```
 ┌───────────────────┐   plan of a classroom seen from above (desks ■, door ▭, window ═)
 │ ■ ■   ■ ■   ▭     │   Circle the teacher's desk.  Which is next to the window? [ ]
 └───────────────────┘
```
- Child: reads a simple bird's-eye plan of a room (K-377 matches objects side/above; this reads a whole plan).
- Settings: Room (classroom / bedroom / playground) · Questions (3 / 5) · Labels (pictures / words).
- Band K–G1 · Point the first plan-reading skill (SLO "plattegrond", Lehrplan "Grundriss", programmes "plan de la classe").
- Reuse `primitives/top-side-view.js` (`top-side-view.js`, the K-377 primitive) extended to a **NEW** `room-plan.js` (a plate with 6–10 top-view symbols on committed slots, the island-map pattern), position words from the position-words engine (`prepSentence` for the questions — or picture-only questions).
- Screen tap-select · Locales 11 (questions via `prepSentence`; a `null` → a picture-only question) · Key: the ringed items.
- Risks: a plan object a child cannot identify from above → the K-377 reviewed top-view set only (`top-side-view.js` symbols).
- Evidence: "plattegrond groep 3"-class nl, "grundriss klassenzimmer" (de Sachunterricht), "bird's-eye view" (K-377) is the step before.

**T5 · Coordinate battleship (a game for two)** — rank 5
```
 A B C D E F        two grids per player; hide 3 pictures; call "B3!" — a hit if the partner's picture is there
 1 ■ ■ · · · ·
 2 · · · · · ·
```
- Children: play the coordinate-calling game (letters across, numbers down — `coord-grid.js:3-4` convention) with pictures as ships.
- Settings: Grid (5×5 / 6×6 / 8×8) · Ships (3 / 4) · Pictures (theme).
- Band G2 · Point grid coordinates (G2-279 family), speaking letters/numbers; game material.
- Reuse `coord-grid.js` ×2 per player, K-240 cut line between halves.
- Screen material · Locales 11 · Key: none.
- Risks: none.
- Evidence: "grid coordinates" (en head), "coördinaten rooster" (nl), "coordenadas en malha quadriculada 3 ano" (pt), "pixel art" (fr grid bucket — the coordinate-colouring appetite).

### 55. Me, My Family & Feelings (`me-family-feelings`) — 5 new

**T1 · Weekly feelings check-in** — rank 1
```
        Mon  Tue  Wed  Thu  Fri
 😀     ○    ○    ○    ○    ○      colour the face that shows how you felt
 😐     ○    ○    ○    ○    ○
 😢     ○    ○    ○    ○    ○
```
- Child: marks a face per day for a week (the classroom SEL routine); optional "because …" line.
- Settings: Faces (3 / 5 / 6 feelings) · Days (5 / 7) · Reason line (on/off).
- Band K–G2 · Point SEL rows of every framework (de "Gefühle wahrnehmen", Lgr22 "känslor", BNCC "autoconhecimento"); the "feelings chart" demand head.
- Reuse `data/b3/feelings.js` faces + words ×11 (the K-319 face art), the days bank; **author** ~6 strings ("How did you feel today?", "because").
- Screen printable (open) · Locales 11 after the strings are signed · Key: none.
- Risks: none (open, no judgement).
- Evidence: topic seed; "feelings chart / feelings chart for kids" (en head), "gefühle erkennen und benennen kinder" (de), "känslor förskola" (sv), "tunnetaidot … materiaali" (fi).

**T2 · Feelings thermometer (how strong is it?)** — rank 2
```
 ANGRY   ┃ 5 furious
         ┃ 4
         ┃ 3 cross      colour up to how strong you feel; write what helps: ______
         ┃ 2
         ┃ 1 calm
```
- Child: colours a 5-step scale for a feeling (intensity), writes a calming strategy (open).
- Settings: Feeling (chips) · Steps (3 / 5) · Strategy line (on/off) · Words on the steps (bank / none).
- Band K–G2 · Point SEL (emotion regulation: "Gefühlsthermometer", "termómetro de las emociones", "feelings thermometer" — demand verbatim).
- Reuse `primitives/thermometer.js` (`bands`, `numerals:false`, `thermometer.js:4-14`), `feelings.js` words; step words ×11 (~15, author).
- Screen printable (open) · Locales 11 after sign-off · Key: none.
- Risks: step words are culture-bound ("furious") → native panel per locale.
- Evidence: "feelings thermometer" (en, verbatim), "känslohjulet" (sv), "gefühle erkennen und benennen übung" (de), "las emociones … intensamente" (es).

**T3 · Family tree with my photos** — rank 3
```
    [👵][👴]        [👵][👴]
        └──┬──┘        └──┬──┘
         [👩]  ────  [👨]
              └──┬──┘
             [🧒 me]        photo slots (own photos, whole) or the drawn figures
```
- Child: builds her family tree with own photos (or the drawn family figures), writes the family words from the bank.
- Settings: Generations (2 / 3) · Siblings (0–3) · Photos (my photos / drawn figures) · Words (bank chips).
- Band K–G1 · Point family vocabulary (K-370 family words); the operator's portraits are the drawn fallback (memory: family portraits).
- Reuse `primitives/family-tree.js` (`familyTree({persons, frame, nodeSvg})`, `family-tree.js:9-13`), `primitives/family-figure.js`, own photos whole in the node frames (no label from the photo — the family word is the child's).
- Screen printable · Locales 11 (family words ×11 in `data/b3/*family*` banks; culture-bound words only via the panel) · Key: none.
- Risks: own photos never on student links (B1); a tree shape that does not fit the family (single parent, two mums) → the generations/siblings controls build any shape; no default "mother + father" labels — the child writes the words.
- Evidence: "familie stamboom maken" (nl head), "family tree template" (G1-387 draws), "membros da família em inglês atividades" (pt 70 — the vocabulary appetite), "familie stamtræ skabelon" (da).

**T4 · My friend and me — same and different (Venn)** — rank 4
```
     ╭──── me ────╮╭─── my friend ───╮
     │  …        ││ both: …  │  …   │     write or draw what is only yours, only theirs, and shared
```
- Children (in pairs): fill a two-ring Venn with likes, hair colour, pets … (open; the "same and different" social skill).
- Settings: Prompts (chips: likes / looks / family / can do) · Rings (2) · Draw or write.
- Band K–G2 · Point SEL / the "others and me" strand (Lehrplan "Ich und die anderen", Lgr22 "likheter och skillnader").
- Reuse `G3-353`'s Venn plate (empty), prompt words ×11 (~8, author).
- Screen printable (open) · Locales 11 after sign-off · Key: none.
- Risks: none.
- Evidence: "all about me … for kids" (en head), "das bin ich … kindergarten" (de), "todo sobre mí niños" (es), "dit ben ik kleuters" (nl).

**T5 · Feelings vocabulary cards (face + word)** — rank 5
```
 ✂ [😀 happy] [😢 sad] [😠 angry] [😨 scared] …   cards for the circle time / Memory (face–word pairs)
```
- Teacher: prints feeling cards (face + word) for circle time or as face–word memory pairs.
- Settings: Feelings (chips, 6–12) · Cards (face+word / split pairs) · Size.
- Band K–G1 · Point SEL vocabulary; material.
- Reuse `feelings.js` faces + words ×11, K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: none.
- Evidence: "känslor bilder för barn / förskola" (sv 22, report), "bildkarten gefühle" (de), "imagier des émotions" (fr), "kuvakortit … tunnetaidot" (fi), "bildekort følelser" (no).

### 56. Healthy Habits & Road Safety (`health-safety`) — 4 new

Twelve faces exist; the banks (b5 road-safety, b6 healthy-habits) are small and the topic borders science (excluded). Four new tasks.

**T1 · My safe way to school (draw and label)** — rank 1
```
 ┌──────────────────────────┐   draw your way from 🏠 to 🏫; mark where you cross with 🚶 and a traffic light 🚦
 │ 🏠 ………………………… 🏫          │   label: ______  ______
 └──────────────────────────┘
```
- Child: draws her route and marks crossings with the bank's pictograms; labels with the bank words (open).
- Settings: Plate (empty / street grid) · Pictograms (chips: crossing, light, sign …) · Lines (2 / 4).
- Band K–G1 · Point road safety (Lehrplan "Schulweg", programmes "sécurité routière", SEP "educación vial").
- Reuse `primitives/road-pictogram.js`, `traffic-light.js`, `road-sign.js` (MUTCD en-US / Vienna elsewhere, per ENGINES #56), `rulingBlock`.
- Screen printable (open) · Locales 11 · Key: none.
- Risks: a sign of the wrong convention in a locale → the sign primitive's locale flag (exists).
- Evidence: topic seed; "schulweg … arbeitsblatt"-class de, "sécurité routière cycle 2" (fr).

**T2 · Who helps? emergency numbers** — rank 2
```
 🚒 fire     ───  [ 112 ]        🚑 ambulance ─── [ ]        👮 police ─── [ ]       (en-US 911 · de/… 112 · pt-BR 190/192/193 · no 110/112/113 · fr 15/17/18/112)
```
- Child: matches the helper to the emergency number of her country and writes it (the one number set every K-2 child must know).
- Settings: Helpers (3 / 4) · Task (match / write) · Picture bank (library helpers).
- Band K–G1 · Point the "Notruf" rows (de "W-Fragen Notruf" — demand verbatim "w-fragen notruf"); national civic/safety curricula.
- Reuse the community-helpers pictures (K-213), the pair screen; **author** the number table ×11 (`data/safety/emergency.<loc>.json`: en-US 911; de 112 (police 110); fr 15/17/18/112; es-MX 911; pt-BR 190 police/192 SAMU/193 fire; it 112 (single number); nl 112; sv 112; da 112; no 110 fire/112 police/113 ambulance; fi 112) — panel-confirmed, dated (numbers change).
- Screen tap-order pairs / type-number · Locales 11 after the table is signed · Key: the numbers.
- Risks: a wrong number is a safety defect → the table carries a review date and the gallery card shows it; the page prints "in {country}" so a bilingual class is not misled.
- Evidence: "w-fragen notruf" (de), "community helpers and their tools" (K-213) exists — the number link is the missing civic fact.

**T3 · Safe or unsafe? (sort the pictures)** — rank 3
```
 ┌── safe ──┐  ┌── not safe ──┐     🚶 at the zebra crossing · 🏃 between cars · 🚲 with a helmet · …
```
- Child: sorts road/health scenes into safe / not safe (the b5 pictogram bank).
- Settings: Topic (road / health / both) · Items (6 / 8) · Answer (lines / cut).
- Band K–G1 · Point road safety + health rows; the "richtig / falsch" judgement page.
- Reuse `data/b5/road-safety*` pictograms and `data/b6/*healthy*` items (each with a reviewed safe/unsafe flag — exists for G1-404 "stop the germs", the road flag to **author** ~12), `sort-to-bins.js`.
- Screen tap-select strict (A14) · Locales 11 · Key: the bins.
- Risks: a scene that is unsafe in one country and normal in another (cycling without a helmet is legal in many) → items with a universal verdict only (the panel reads the set).
- Evidence: "road safety … for kids" classes, "verkehrserziehung grundschule" (de), "educación vial niños" (es).

**T4 · Traffic sign cards to cut (the locale's convention)** — rank 4
```
 ✂ [🛑 stop] [⚠ children] [🚸 crossing] …   sign on one card, meaning on another — match or Memory
```
- Teacher: prints sign cards and meaning cards (MUTCD for en-US, Vienna for the ten others) for matching/Memory.
- Settings: Signs (chips from the bank) · Cards (sign+meaning / split) · Size.
- Band G1–G2 · Point G1-384/G2-360 content as material.
- Reuse `primitives/road-sign.js`, the b5 meanings ×11, K-240 cut lines.
- Screen material · Locales 11 · Key: none.
- Risks: the es-MX sign set (SCT, MUTCD-derived — the b5 panel ruled) → the primitive's locale flag.
- Evidence: "road safety traffic signs" (G1-384) exists on-page; the card format is what "bildkarten verkehrszeichen" (de) asks.

### 57. Word Search (`word-search`) — 5 new

The factory (ENGINES Part 3 §A) already carries the three topic seeds as options (picture clues, hidden message, shape masks); they are the gallery's first three cards. Two more tasks on the same engine.

**T1 · Picture-clue word search** — rank 1
```
 ┌ k a t z e ┐   clues: 🐱 🐶 🐦 🐸  (no words printed — the child names the picture, then finds its word)
 │ h u n d … │
```
- Child: finds the words named by pictures (pre-readers; the list is pictures only).
- Settings: Words (theme, 4–10) · Grid (8 / 10) · Directions (across+down / +backwards) · Case.
- Band K–G1 · Point RF.K.3 (decode/recognise words) + vocabulary.
- Reuse `types/_shared/word-search.js` with `clues: pictures` (clue band reserved first, B3), `lib/puzzles/grid-fill.js` (fillers from `letter-freq.<loc>.json`, the union blocklist scan — Part 3 §A).
- Screen mark-grid · Locales 11 · Key: the tinted cells.
- Risks: a picture with two names (en "bat") → homonyms excluded from picture-clue mode (word-writing-Q1 step 5); A11 multi-word entries excluded.
- Evidence: topic seed; "word search … kindergarten" classes; "wortsuche kinder", "sopa de letras para niños" (es), "caça-palavras educação infantil" (pt).

**T2 · Hidden message in the leftover letters** — rank 2
```
 the unused cells, read row by row, spell:  "Have a nice day!"      message: __________
```
- Child: finds the words, then reads the leftover letters in order to find the message and writes it.
- Settings: Words (theme / my list) · Message (bank phrase from `phrases.<loc>.json` / my text) · Grid.
- Band G2–G3 · Point L.2.2 (spelling in context), reading for a purpose.
- Reuse the factory's `hiddenMessage` (free cells = message letters; 32 re-placements then refuse, Part 3 §A), `type-word` for the message.
- Screen mark-grid + type-word · Locales 11 (own message: letters claim) · Key: cells + message.
- Risks: free-cell count ≠ message length → the engine's re-placement/refusal sentence ("Make the message k letters longer/shorter").
- Evidence: topic seed; "word search … hard" (en), "mots mêlés avec message caché" (fr), "wortsuchrätsel lösungswort" (de).

**T3 · Shape word search (letters inside a picture outline)** — rank 3
```
     ♥ ♥ ♥ ♥
   ♥ k a t z e ♥      the grid is masked to a heart / star / tree
     ♥ h u n d ♥
```
- Child: searches a grid shaped like a heart, star, tree or circle (engagement; seasonal use).
- Settings: Shape (heart / star / circle / tree) · Words · Directions.
- Band G1–G3 · Point as T1/T2; the seasonal page.
- Reuse the factory's `shape` cell masks (Part 3 §A).
- Screen mark-grid · Locales 11 · Key: the cells.
- Risks: a mask too small for the list → `auto` grows the grid or refuses by word.
- Evidence: topic seed; "word search … halloween / christmas" seasonal demand classes (fr "mots mêlés noël").

**T4 · Bilingual word search (grid in one language, clues in another)** — rank 4
```
 grid: Spanish words        clues: 🐱 cat · 🐶 dog (English words or pictures)       → find "gato", "perro"
```
- Child: reads a clue in language A (or a picture) and finds the word in language B — the dual-language classroom page (A12 exact mixes).
- Settings: Grid language · Clue language (any of the 11; pictures) · Words (theme) · Grid.
- Band G1–G3 · Point vocabulary in two languages (dual-language/immersion programmes — the platform's core audience).
- Reuse the factory's `gridLang` / `clueLang` (Part 3 §A; the instruction key `same` vs `mixed`, K-3 language names ×11 from the shell strings).
- Screen mark-grid · Locales 11 × 11 pairs · Key: the cells.
- Risks: the old wordsearch's language-mix bugs (A12) → two language controls, one instruction key per case; letters outside the grid language's set never appear in the grid.
- Evidence: the old app's "grid vs clue language" feature (OLD-APP-LESSONS §E); "wordsearch … english"-class in every non-en locale ("finn fem fel engelska"-style cross-language demand).

**T5 · Number-word / sight-word search** — rank 5 (shared with number-of-the-day T4 / sight-words)
- The factory with the number words or the sight list as the word list; numerals as the clue column for number words. Settings: List (numbers 1–20 / tens / sight list) · Grid · Case. Band K–G1. Locales 11. Key: the cells. Evidence: "talord krydsord" (da), "sight words … search" classes.

### 58. Crossword (`crossword`) — 5 new

**T1 · Picture crossword** — rank 1
```
     1↓
  2→ c a t
     o
  3→ d o g        1 🐱  2 🐶 …  (numbered pictures as clues)
```
- Child: writes the picture words into the crossing cells (the pre-reader crossword).
- Settings: Words (theme, 6–10) · Size (auto / 10) · Case (CAPITALS default) · Word bank (on/off).
- Band K–G2 · Point RF.K.3 + L.1.2.d; "mots croisés … maternelle"-class fr, "kreuzworträtsel kinder" (de).
- Reuse `types/_shared/crossword.js` + `lib/puzzles/crossword-layout.js` (multi-start greedy, unbounded map, connectivity by construction — Part 3 §B), picture clues (exact vocab; homonyms excluded).
- Screen type-cross (the 12th kind, Part 3 §B) · Locales 11 · Key: the filled grid.
- Risks: a word sharing no letter with the others → refused by name before layout (the failure rule).
- Evidence: topic seed; the old app's picture clues (OLD-APP-LESSONS §E "crossword: picture clues").

**T2 · Arrow-word with picture clues (mots fléchés / Schwedenrätsel)** — rank 2
```
 ┌───┬───┬───┬───┐
 │🐱→│ c │ a │ t │     the clue picture sits IN the grid, an arrow shows the direction; no numbering
 ├───┼───┼───┼───┤
 │🐶↓│   │   │   │
```
- Child: solves an arrow-word where picture clues occupy cells and arrows point into the word (the French/German puzzle format children know from magazines).
- Settings: Words (theme, 6–12) · Size (10 / 13) · Case · Arrows (right/down only).
- Band G1–G3 · Point as T1; the **fr "mots fléchés" demand is a head term** (four "mots fléchés" phrases in the fr word-tracing bucket), de "Schwedenrätsel".
- Reuse the layout engine with **reserved clue cells** (a layout variant: each word's clue cell is the cell before its first letter; the greedy placement treats clue cells as blocked — ≈ 0.5 session on `crossword-layout.js`), picture clues at cell size (≥ 32 px cells → the picture is legible; the cell floor rule).
- Screen type-cross · Locales 11 · Key: the grid.
- Risks: a clue cell that another word needs → the placer scores clue-cell conflicts as illegal; small pictures → cell floor 32 px for this face (the clue must read).
- Evidence: "mots fléchés" (fr, 4 head phrases in the harvest), "schwedenrätsel kinder" (de), "parole crociate … bambini" (it).

**T3 · Criss-cross fill-in (no clues — the word list by length)** — rank 3
```
 3 letters: cat · dog        4 letters: frog · bird          fit every word into the grid; the lengths and crossings decide
```
- Child: fits the listed words into the empty grid using lengths and shared letters (logic, no reading of clues).
- Settings: Words (theme / my list, 8–15) · Size · Case · One word given (on/off).
- Band G2–G3 · Point spelling + logical fitting (the "Kreuzwort ohne Fragen / fill-in puzzle" format).
- Reuse the layout engine; uniqueness of the fill proven by a solver over the word set (gate 15 `unique-solution`: with one word given, the fill must be unique — else another word is pre-filled).
- Screen type-cross · Locales 11 (own words: letters claim) · Key: the grid.
- Risks: two words of the same length interchangeable → the solver detects and the generator gives one of them; A11 multi-word excluded.
- Evidence: "crossword … fill in" classes; "kreuzworträtsel ohne fragen", the puzzle-book staple in every locale.

**T4 · Crossword with a word bank (own clues)** — rank 4
```
 bank: cat · dog · frog · bird      1→ It says miaow.  2↓ It barks.     (the teacher's own clue sentences)
```
- Child: solves a crossword whose clues are the teacher's sentences (no generated definitions — "no AI"), with a word bank at level 1–2.
- Settings: Words + clues (my list) · Bank (on/off) · Size · Case.
- Band G1–G3 · Point L.2.4 (vocabulary in context) with teacher text.
- Reuse the engine's `clueKind: own` (Part 3 §B), the "teacher-made" chip; clue text fit refusal.
- Screen type-cross · Locales 11 · Key: the grid.
- Risks: a clue fitting two bank words → the teacher's responsibility (the chip); the bank makes the puzzle solvable by elimination at level 1.
- Evidence: topic seed; the old app's "words + clues" (OLD-APP-LESSONS §E); "kreuzworträtsel erstellen" (de — teachers want to *make* them).

**T5 · Bilingual crossword (clue language ≠ grid language)** — rank 5
- The engine with `gridLang`/`clueLang` (picture or the same key's word in the clue language); the instruction key `mixed`; K-3 language names ×11. Settings: Grid language · Clue language · Words · Size. Band G1–G3. Locales 11 × 11. Key: the grid. Evidence: the old app's bilingual grid vs clue (OLD-APP-LESSONS §E), the immersion audience.

### 59. Secret Code (Cryptogram) (`secret-code`) — 5 new

**T1 · Number code (A = 1)** — rank 1
```
 key: a=1 b=2 c=3 … (es: ñ=15; de: ä ö ü = 27 28 29 — printed)      8-1-12-12-15  →  [ h ][ a ][ l ][ l ][ o ]
```
- Child: decodes numbers to letters with the printed key (and encodes at level 3).
- Settings: Message (bank phrase / my text ≤ 60 letters) · Alphabet (the locale's collation order) · Letters given (0–5) · Encode too (on/off).
- Band G1–G3 · Point RF.1.1 (letters) + number order; the "maths link" seed.
- Reuse `types/_shared/cryptogram.js` (Part 3 §C: bijection, the key printed, accented letters as their own symbols — never stripped as the old app did, `cryptogram.html:1454-1457`), `collation.js` order (es ñ after n → 15; sv/fi å ä ö after z → 27–29).
- Screen type-word per word (letter pad ×11) · Locales 11 · Key: the message.
- Risks: a message letter outside the locale's set → refused by name (A9); `given` letters never complete a word.
- Evidence: topic seed; "geheimschrift zahlen"-class de, "código secreto números" (es), the old app's phrases.

**T2 · Picture code** — rank 2
```
 key: 🐱=a 🐶=b 🐸=c …     🐶 🐱 🐸 → [ b ][ a ][ c ]      (one library picture per letter used, distinct by signature)
```
- Child: decodes pictures to letters with the printed key.
- Settings: Theme · Message · Letters given · Lines (1–3).
- Band K–G2 · Point letter recognition + decoding; the old app's picture code.
- Reuse the factory's picture code (`pictureIndex` nouns distinct by signature; a theme with too few → refused with the count, Part 3 §C).
- Screen type-word · Locales 11 · Key: the message.
- Risks: a theme with fewer pictures than distinct letters → refusal sentence; never a picture reused for two letters.
- Evidence: topic seed; the old `cryptogram` app's main mode.

**T3 · Sum code (the letter is the answer of a sum)** — rank 3
```
 key: 3 = a   5 = b   8 = c …      (2+1) (4+1) (6+2)  →  [ a ][ b ][ c ]       (each cell is a sum; its answer looks up the key)
```
- Child: computes each sum, looks up its answer in the key, writes the letter — arithmetic practice disguised as a code (the colour-by-code logic as a cipher).
- Settings: Operation (+ / − / ×) · Range (to 10 / 20 / 100) · Message · Letters given.
- Band G1–G3 · Point 1.OA.C.6 / 2.OA.B.2 / 3.OA.C.7.
- Reuse the factory with a numeric key; sums per cell generated so each cell's answer is its letter's number (distinct answers for distinct letters; several sums per answer allowed — the bingo "sums" rule of Part 3 §D).
- Screen type-word · Locales 11 (glyphs per `notation.js`) · Key: the message.
- Risks: a sum whose answer is not in the key → by construction every answer is a key number; the glyph gate.
- Evidence: "rechnen und ausmalen" (de head term of the colour-by-code appetite), "pinte conforme o resultado" (pt), "colorear por numeros sumas y restas" (es) — the same "practice disguised" demand in code form.

**T4 · Symbol code — complete the key first** — rank 4
```
 ▲ ● ■ ★ ◆      a solved word is printed: ▲●■ = cat  →  so ▲=c ●=a ■=t ; fill the key, then decode the rest
```
- Child: deduces the missing key entries from one solved word, then decodes the message (cryptanalysis-lite, deterministic).
- Settings: Symbols (language-free set) · Message · Key given (partial: one solved word / two).
- Band G2–G3 · Point logical deduction + spelling.
- Reuse the factory's symbol code; the engine prints a solved word covering the letters the message needs that the partial key lacks (uniqueness: every message letter is either in the key or in the solved word).
- Screen type-word · Locales 11 · Key: key + message.
- Risks: a solved word that leaves a letter unknown → asserted at build (every letter resolvable).
- Evidence: "logicals / geheimcode" classes; the old app's "letters revealed" feature generalised.

**T5 · Write your own secret message (blank key + lines)** — rank 5
```
 my key:  a=__ b=__ … (the child invents symbols)        my message: ______________        the code: ______________
```
- Child: invents a cipher and encodes her own message for a friend (open; the creative face).
- Settings: Key form (letters → symbols / numbers) · Lines · Alphabet (the locale's).
- Band G1–G3 · Point letter order + writing; open.
- Reuse the key table rendering (empty cells), `rulingBlock`.
- Screen printable (open) · Locales 11 · Key: none.
- Risks: none.
- Evidence: "cryptogram … kids" classes; the encode direction every child asks for.

### 60. Bingo (`bingo`) — 6 new

The engine (Part 3 §D) makes unique cards + caller cards from any item pool; each template is a different item pool with its own pedagogy.

**T1 · Sum bingo (answers on the card, sums on the caller)** — rank 1
```
 card:  ┌──┬──┬──┐   caller:  "3 + 4" "9 − 2" …   mark 7
        │ 7│12│ 5│
```
- Child: hears a sum, marks its answer on the card.
- Settings: Range (to 10 / 20 / 100) · Operation (+ / − / ×) · Grid (3×3 / 4×4) · Cards (2–30) · Caller cards (on/off).
- Band G1–G3 · Point 1.OA.C.6, 2.OA.B.2, 3.OA.C.7 fluency as a class game.
- Reuse `types/_shared/bingo.js` (pool = distinct answers in the range; one sum per answer on the caller deck; card uniqueness/overlap rule; refusal when the pool is short — F5), `notation.js` glyphs.
- Screen tap-select with an announce-only caller (D1; the bingo Family F precedent) · Locales 11 · Key: the pool list.
- Risks: a range whose answer pool < g² + 2 → the refusal sentence with the count.
- Evidence: topic seed; "bingo … mathe"-class de, "bingo de sumas" (es), the old `bingo` app's number mode.

**T2 · Sight-word bingo** — rank 2
- Pool = the sight list (bank / my list, letters claim); caller cards show the word (level 1) or the word in a bank sentence (level 3). Settings: Words · Grid · Cards · Callers. Band K–G1 · Point RF.K.3.c. Locales 11. Key: the pool. Risks: ≥ g² + 2 words needed → the ≥ 60-word lists (ENGINES #41). Evidence: topic seed (sight-words); "sight words games / bingo" (en), "lernwörter … spiel" (de).

**T3 · Clock bingo** — rank 3
```
 card: 🕒 🕤 🕕 🕐     caller: "half past nine" / "9:30"
```
- Child: hears a time (words or digital), marks the matching clock face.
- Settings: Time to (hour / half / quarter / 5 min) · Caller form (digital / words via `time-words.js`) · Grid · Cards.
- Band G1–G2 · Point 1.MD.B.3, 2.MD.C.7.
- Reuse `primitives/clock.js` faces as items, `lib/time-words.js` (words only where the locale's rows are signed; digital always).
- Screen tap-select + caller · Locales 11 (words per sign-off) · Key: the pool.
- Risks: two cards with near-identical faces (3:00 vs 3:05 at small size) → the pool spacing ≥ 15 min at 3×3 (legibility floor measured on the card cell).
- Evidence: "telling time games" (en), "uhrzeit lernen spiel" (de), "klokkijken … spelletjes" (nl), "tafels spelletjes in de klas" (nl — class games).

**T4 · Letter-sound bingo** — rank 4
- Pool = letters with ≥ 1 reviewed initial-sound picture (alphabet-Q1 rule); the caller shows a picture, the card shows the letter. Settings: Letters (chips) · Grid · Cards. Band K · Point RF.K.3.a. Locales 11 (letters each table allows). Key: the pool. Risks: a wrong-sound caller picture → reviewed words only. Evidence: topic seed; "letter of the week … activities" (en), "anlaut bingo"-class de.

**T5 · Number-word bingo** — rank 5
- Pool = numerals on the card, number words on the caller (or the reverse). Settings: Range (1–20 / tens / to 100) · Grid · Cards. Band K–G1 · Point K.CC.A.3 + number words (`lib/number-words.js`). Locales 11. Key: the pool. Evidence: "number words … game" classes, "talord" (da/no).

**T6 · Shape and colour bingo (K)** — rank 6
```
 card: ▲ ● ■ ◆     caller: "a red triangle"  → colour-word + shape-word items (language-light)
```
- Child: marks the shape (level 1) or the coloured shape (level 2: colour × shape pool) the caller names.
- Settings: Shapes (chips) · Colours (chips, `data/color-words.js` ×11) · Grid (3×3) · Cards.
- Band PreK–K · Point K.G.A.2 (name shapes), colour words.
- Reuse `primitives/flat-shape.js` items, `color-words.js`; the caller card prints the word pair ("un triángulo rojo" — gender agreement: the colour adjective follows the shape noun's gender → literals from the geometry-words + colour-words tables, panel-checked per pair).
- Screen tap-select + caller · Locales 11 · Key: the pool.
- Risks: adjective agreement in Romance locales → literal pairs, never concatenation (A6).
- Evidence: "2d shapes kindergarten / 2d shapes song" (en), "geometrische formen … spiel"-class de, "formas geométricas … juego" (es).

---

## For the operator

Only real choices; each with my recommendation and the cost of each option. Nothing here blocks the platform or the pilot. The pedagogical content of every template above is fixed by the brief's rules (native + pedagogy review before publish; mistakes fixed everywhere) and is not a choice.

**A. A "left-handed layout" control for the tracing makers.** The harvest shows "schwungübungen für linkshänder" (de 34) and "buchstaben und zahlen schreiben lernen für linkshänder" (de). A left-handed sheet puts the model on the RIGHT (the hand does not cover it) and starts rows at the right margin for copying; strokes are traced left→right as for everyone. (A1, recommended) one drawer option *Model on the right* on pre-writing, number-tracing, letter-tracing, word-writing and cursive — cost ≈ 0.3 session (a layout flag in `trace-path.js` lanes + a gate case), no new template; (A2) no option — cost: a real, searched need unmet in de/fr/nl classrooms where left-handed sheets are standard.

**B. Finnish (and Swedish) cursive demand vs the refusal.** "kaunokirjoitus iso e / pieni r / kirjain" are the top three fi cursive phrases (60 · 53 · 26) and sv "skrivstil litet r/t/f" exists, but OPS 2014 teaches only print ("tekstaus") and the sv Lgr22 has no joined script — the cursive maker is refused in sv/fi by data (ENGINES #35). (B1, recommended) keep the refusal; the landing page in fi/sv says why and points to the print letter-tracing maker — cost: a visible refusal on a searched term; (B2) offer a "kaunokirjoitus" page from a vendored joined font as an *optional* craft — cost: a font licence + the panel's objection that it is not the school script; I do not recommend it.

**C. Gallery thumbnails: the template count roughly doubles.** ARCHITECTURE §11.3 budgets 755 × 11 ≈ 8,300 WebP ≈ 100 MB (its decision E). With the 303 templates here: ≈ 1,058 × 11 ≈ 11,600 files ≈ **140 MB** and ≈ 30 min per full rebuild. (C1, recommended) keep per-locale thumbnails (E1) at the new size — cost: +40 MB served disk; (C2) English thumbnails with a localised caption (E2) — cost: a Finnish teacher sees English sheets. The 140 MB is still a served-file class (CLAUDE.md §A.14.12 exempt list).

**D. The native authoring the new templates need — fund it as one batch or per maker.** Fourteen data items, each a native-panel deliverable (sizes = strings per locale): two-step word-problem frames (~12 × 11) · daily-routine words (~12) · school-activity words (~10) · adjective triples (~20 × 11) · present-tense person forms (~15 verbs × 6; shape per locale) · adjective agreement tables (×9) · diminutive pairs (~20 × 6) · definite-article table (×10, Nordic as literals) · number/place-value riddle frames (~8 × 11, shared by two makers) · fraction words (~8 × 11) · ordinals 11th–31st (×11) · emergency numbers + helper words (×11, dated) · vowel-length flags (fi/nl/de/en/sv/da/no, from the approved words) · bingo caller strings + reading-log/story-map/feelings prompts (~30 small strings × 11). Estimated ≈ 1,400 strings ≈ 3–4 panel sessions in total (one reviewer per locale over a compact dump, never a fan-out — CLAUDE.md #1/#2). (D1, recommended) author per maker inside its batch (the template is refused per locale until its data is signed — the standing mechanism, so nothing ships half-authored) — cost: spread, no extra sessions beyond the ×11 work already counted in ENGINES' per-maker effort; (D2) one up-front authoring batch before B1 — cost: 3–4 sessions early, the benefit that every template ships in 11 locales on day one.

**E. Classroom MATERIALS as templates.** About 55 of the 303 are cut-outs, cards, posters, games or open frames with no answer key and no screen (flash cards, word walls, play money, nets, fact triangles, bingo callers, booklets …). The harvest supports them strongly ("bildkarten", "flitswoorden", "tablas en llavero", "woordkaartjes maken", "imagier", "kuvakortit"). (E1, recommended) ship them as gallery cards with a "classroom material" badge (no key, no share-to-students; download metered like any page) — cost: the badge + a gate rule that a material template declares `screen: none` and prints no answer box; (E2) exclude materials from the makers — cost: the most-searched card formats stay unavailable, and teachers keep using Canva for them.

**F. The es-MX week start.** `primitives/calendar.js:7-8` has en and pt-BR Sunday-first and the other nine Monday-first. Mexican printed calendars are very commonly Sunday-first (US convention), while ISO/Monday-first also circulates; the SEP's own school calendar graphics vary. (F1, recommended) ask the es-MX panel to rule and encode it as the locale fact — cost: one panel question; (F2) keep Monday — cost: a possible convention mismatch on every es calendar page.

**G. Cross-link cards.** Several strongly searched tasks belong technically to another maker (odd/even maze → mazes; sight-word bingo → bingo; number-word search → word-search; colour by sight word → color-by-number). The topic-map rule is one maker per type. (G1, recommended) allow a *cross-link card*: a gallery card in maker A that opens maker B's template preset (no type duplication, no second code path) — cost: one shell affordance (a card kind in `templates.json` with a `link` instead of a `template`); (G2) no cross-links — cost: a teacher in Odd & Even never finds the odd/even maze.

**H. Long division and written multiplication.** The harvest asks for them in several locales ("uppställning multiplikation / division" sv, "schriftlich rechnen multiplikation" de, "continhas armadas de multiplicação / divisão" pt, "division with remainders … area model" en). They are above the K-3 core and have no primitive (ENGINES operator item 14). (H1, recommended) out of this programme — cost: a searched G3/G4 topic stays unserved; (H2) a later "written methods" maker with an 11-locale layout table — cost ≈ 2 sessions + native layouts (de "Übertrag", fr "potence", es/pt "casa/chave", nl "staartdeling", sv "liggande stolen"…).

**I. Two templates that touch own photos beyond the ARCHITECTURE B1 rule.** Comic strip (49-T2), family tree (55-T3), grid maze hero (28-T1) and the coloring frame use own photos *whole*; all are refused on student links until the B2 photo store exists (ARCHITECTURE §18-B). (I1, recommended) ship them with the refusal sentence — cost: none; (I2) hold them until B2 — cost: three of the most personal templates wait on a storage decision.

**Total new templates: 303** (median 5 per maker; min 3 — rhyming, syllables; max 8 — addition-subtraction). Eighteen makers are below five, each with its reason at the top of its section. Every template's first-shipped version carries the standing gates: 11-locale render, settings-space/guessability, collision, write-screen, one native + one pedagogy reviewer over the rendered text — before publish, never after.
