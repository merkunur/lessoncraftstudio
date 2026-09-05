# 130 — Number Words

## Identity
- Slug: `number-word-match`
- Subject / topic: Mathematics / number words 1-20 paired with numerals — in the language of play, with the teen words' ones-and-ten structure made visible
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; tap a numeral, then the word that names it)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12 (visible board; two columns rather than a grid because the word tiles are wide). Locale note: the number words are language-bound and live in `LOCALE_DATA` for all 11 codes (§14, F-108, F-211); the mechanic is universal. Nothing is spoken (no TTS, no audio files): the word is READ, and its structure is shown by highlighting its parts.

## Learning
- Objective: Pairs each numeral 1-20 with its written number word in the play language, telling apart the teens from their ones (3 / 13, 4 / 14 …) by reading the whole word.
- Prerequisites: Reads numerals to 20; decodes short words in the play language (game 129's predecessor skills; this is a 6-8 reading task — F-20 places decoding at 6-7 everywhere).
- Curriculum links: F-102 (numeral reading/writing — order reversal 12 ↔ 21, writing "sixteen" as 61; response: every teen numeral carries a ten-and-ones picture, never digits alone), F-108 (place value — teens as "eleventeen", digits as independent numbers, **de/nl/da say the ones before the ten**; response: the spoken order is paired with the tens-then-ones picture, never relied on), F-1 (number recognition / number words in 11 of 15 sources), F-21, F-31 row "Numerals to 20, number words" — conservative 6-7, earliest 5 → 6-8 for the WRITTEN words (US K.CC.A.3 / 1.NBT; England Y1 "read and write numbers from 1 to 20 in numerals and words"; Germany Klasse 1 "Zahlwörter bis 20"; France CP "lire les nombres en lettres"; Netherlands groep 3 "getallen in woorden tot 20"; Spain 1º ciclo "nombres de los números"; Brazil EF01MA — "leitura e escrita de números"; Sweden åk 1 "talens namn"; Finland grade 1 "lukusanat"). Feedback is enacted (F-43); a non-pair is refused, never punished (F-61).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Reading only the first letters — "thir…" is taken for "three", "drei…" for "drei", "kolme…" for "kolme" — so 3 is paired with "thirteen" (or 13 with "three").** Response: both tiles nudge; then the word's parts are underlined from `LOCALE_DATA` segments — the ONES part in accent, the TEN part in the structure colour — while on the numeral tile's picture the dots pulse with the ones part and the rod pulses with the ten part, in the order the language says them; a numeral with no rod shows a dashed `ART.rodGhost` pulsing where the ten would be: this word has a ten in it, 3 does not.
  2. **The de / nl / da (and en / sv / no / fi) ones-first order taken as digit order — "dreizehn" read as 3-then-1 → 31, "vierzehn" → 41 (F-108 language interference).** Response: the board never holds numbers above 20, so 31 is never a tile; the teen numeral's picture is always ONE rod (left) + ones dots (right) in the fixed tens-then-ones layout, whatever the word order; the part cue pulses the dots FIRST for ones-first words, then the rod — the child sees "drei" belongs to the dots and "zehn" to the rod.
  3. **11 and 12 treated like the other teens (looking for "one-teen"; or "twelve" paired with 2 because it starts with "tw").** Response: elf / zwölf, eleven / twelve, elva / tolv, onze / douze have no segments; their pictures still show one rod + 1 or 2 dots, and a wrong pair with 1 or 2 pulses the rod with `ART.rodGhost` on the 1 / 2 tile.
  4. **Pairing 20 with 2 (or with 12).** Response: the 20 tile's picture is TWO rods and no dots; the cue pulses both rods while 2's picture shows two dots and a dashed rod ghost; in Finnish "kaksi|kymmentä" the multiplier part underlines with the two rods pulsing together.
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (no error; `tone("tap")`).

## How it plays
1. **Start screen**: title "Number Words", the parrot (`ART.parrot`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Board 1 (L1: 1-10, five pairs)**: the rail shows 2 dots (§6 — one per board; a third appears if a third board is played). Zones A + B merged: a left column of five numeral tiles (`makeTile` 96 × 64 with `ART.numTile` tokens) at x = 170, rows y = 120 / 196 / 272 / 348 / 424; a right column of five word tiles (`makeTile` 300 × 64 with `ART.wordTile` tokens) at x = 470, same rows. Each numeral tile shows its numeral (30 px) at tile (−22, 0) and its ten-and-ones picture at tile (24, 0): for 1-9, dots (`ART.oneDot`) in two columns of up to five (pitch 8 px); for 10, one rod (`ART.rod`); for 11-19, one rod at (12, 0) and the ones dots to its right; for 20, two rods. Each word tile shows the word from `LOCALE_DATA[GameCore.lang].words[n]` in 26 px `THEME.font.body` (fit-to-width). Both columns shuffled independently so no row is a pair by position. The parrot perches at (600, 60) beside the rail, out of the board. `t("question_x_of_y")` is not used on the board (one board = one item; the rail dots are enough).
3. **Pairing**: tap a numeral tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a word tile:
   - **Pair**: both tiles glide 16 px toward each other (`ANIM.join`), `tone("correct")`; then they lock: alpha 0.6 with `ART.link` drawn between the numeral tile's right edge and the word tile's left edge; for a word with segments, the **part cue** plays as confirmation (below) at half speed — the child sees why. The parrot `ANIM.bob`s.
   - **Not a pair**: both `ANIM.nudge`, `tone("nudge")`, both de-select; then the **part cue** on the two tapped tiles (all tiles disabled for its ≈ 1.6 s): the tapped word's segments underline in order — `ART.onesUnderline` (accent) under an O segment, `ART.tensUnderline` (structure) under a T segment, `ART.tensUnderline` × 2 under an M segment, 500 ms each in the language's order — while, in step, the tapped numeral's picture pulses the matching part (`ANIM.pulse` on its dots for O, on its rod for T, on both rods for M); if the numeral has no such part, `ART.rodGhost` (a dashed rod) or `ART.dotGhost` (a dashed dot) appears in its place and pulses; a word with no segments (fused, e.g. "treize") gets no underline, and the numeral's whole picture pulses once. Then the underlines fade (`ANIM.fadeOut`). If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made. Tapping a word first then a numeral is allowed and works the same way.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all five pairs locked → `GameCore.showPraise` (rotation), the rail dot fills, `ANIM.boardOut`, and the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3**: L2 = five pairs from 11-20; L3 = five pairs mixing a teen with its ones (3 / 13, 4 / 14 …) and 2 / 12 / 20 so that the first letters do not decide. Session = 2 boards at L1/L2 pace, 3 boards when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = every pair made this session as chips (`ART.pairChip`, 200 × 32) reading "13 thirteen" (the numeral 18 px display + the word 18 px body) in rows of three from y = 330 (x = 150 / 360 / 570, rows 40 px apart, up to 15 chips) — the words learned, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  parrot:         { kind: "emoji", value: "🦜", size: 64 },
  numTile:        { kind: "shape", shape: "roundRect", w: 96, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 30 px display ink at (-22,0); picture at (24,0)
  wordTile:       { kind: "shape", shape: "roundRect", w: 300, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },  // word 26 px body ink, fit-to-width
  rod:            { kind: "shape", shape: "roundRect", w: 8, h: 30, fill: "structure", radius: 3 },       // one ten
  oneDot:         { kind: "shape", shape: "circle", r: 3, fill: "structure" },                            // one unit; two columns of up to 5, pitch 8
  rodGhost:       { kind: "shape", shape: "roundRect", w: 8, h: 30, stroke: "accent", strokeWidth: 2, radius: 3 },   // dashed (lineDash [4,3]); the ten a numeral does not have
  dotGhost:       { kind: "shape", shape: "circle", r: 3, stroke: "accent", strokeWidth: 2 },             // dashed; the ones a numeral does not have
  onesUnderline:  { kind: "shape", shape: "rect", w: 40, h: 4, fill: "accent" },                          // under an O segment; w = the segment's text width
  tensUnderline:  { kind: "shape", shape: "rect", w: 40, h: 4, fill: "structure" },                       // under a T (or M) segment
  link:           { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },                       // between a locked pair
  hintRing:       { kind: "shape", shape: "roundRect", w: 312, h: 76, stroke: "structure", strokeWidth: 4, radius: 16 },   // w = tile width + 12 (108 for a numeral tile)
  pairChip:       { kind: "shape", shape: "roundRect", w: 200, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:       { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:        { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The picture never changes with the language: rod(s) on the left, dots on the right, always. The parrot (Unicode 11) needs no fallback.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=6", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a pair moves 16 px toward the other (x set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a non-pair" },
  pulse:     { scale: 1.3, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the dots / rod / rod ghost of the numeral tile in step with the word's segments" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "underlines and ghosts; new board tiles (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "underlines and ghosts after the cue" },
  bob:       { y: "-=8", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "parrot on each pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```
No flashing: `showMe` at 1 Hz; segment cues step at 2 per second.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28        parrot (600,60)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │      [ 13 |▌:. ]              [        dreizehn         ]  y=120  │
      │      [  3 | :. ]              [          drei           ]  y=196  │
      │      [  7 | ::: ]             [        siebzehn         ]  y=272  │  zones A+B
      │      [ 17 |▌::: ]             [          sieben         ]  y=348  │
      │      [ 20 |▌▌  ]              [         zwanzig         ]  y=424  │
      │        x=170 (96×64)                x=470 (300×64)             │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Rows 76 px apart (tiles 64 high, gap 12).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: one `ART.dotEmpty` per board (2, or 3) at y = 28, centred, → `ART.dotFull`.
- Numeral tiles: `makeTile` 96 × 64 with `ART.numTile` tokens at (170, 120 + 76i); numeral 30 px `THEME.font.display` `THEME.colour.ink` at (−22, 0); picture at (24, 0): `ART.rod` at (12, 0) [and a second at (22, 0) for 20]; `ART.oneDot`s in two columns at x = 30 / 38, y = −16 + 8k (k = 0..4), the first column filled first — ten-frame order (F-48).
- Word tiles: `makeTile` 300 × 64 with `ART.wordTile` tokens at (470, 120 + 76i); the word 26 px `THEME.font.body` `THEME.colour.ink`, fit-to-width (the library shrinks "kahdeksantoista" if needed); segment underlines are drawn 18 px below the baseline, each `w` = the measured width of that segment's text.
- Selected = library outline + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two tiles' facing edges at the numeral row's y (the word tile glides to that row on lock: `ANIM.join` also sets its y).
- `ART.hintRing` behind a tile (w = tile width + 12). `ART.parrot` at (600, 60).
- Tap floors 96 × 64 and 300 × 64 (≥ 56); gaps 12 (rows) and 154 (columns). Tab order: numeral column top to bottom, then word column top to bottom. Under `?embed=1` the picker is not created. Text on the play screen: the numerals and the number words only.

## Content
Number words per locale in `LOCALE_DATA[lang]`: `words[1..20]` and `seg` — for the words whose parts are shown, an ordered list of `[text, tag]` with tag `"O"` (the ones part), `"T"` (the ten part), `"M"` (how-many-tens part, 20 only) or `""` (a joiner, never underlined); the segments concatenate to the word exactly. Words without an entry in `seg` are fused (no parts shown). English base (the game reads the play language; English is never shown in another locale).

```js
const LOCALE_DATA = {
  en: { words: ["", "one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"],
        seg: { 13: [["thir","O"],["teen","T"]], 14: [["four","O"],["teen","T"]], 15: [["fif","O"],["teen","T"]], 16: [["six","O"],["teen","T"]], 17: [["seven","O"],["teen","T"]], 18: [["eigh","O"],["teen","T"]], 19: [["nine","O"],["teen","T"]] } },
  de: { words: ["", "eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn","zwanzig"],
        seg: { 13: [["drei","O"],["zehn","T"]], 14: [["vier","O"],["zehn","T"]], 15: [["fünf","O"],["zehn","T"]], 16: [["sech","O"],["zehn","T"]], 17: [["sieb","O"],["zehn","T"]], 18: [["acht","O"],["zehn","T"]], 19: [["neun","O"],["zehn","T"]] } },
  fr: { words: ["", "un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf","vingt"],
        seg: { 17: [["dix","T"],["-",""],["sept","O"]], 18: [["dix","T"],["-",""],["huit","O"]], 19: [["dix","T"],["-",""],["neuf","O"]] } },
  it: { words: ["", "uno","due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici","tredici","quattordici","quindici","sedici","diciassette","diciotto","diciannove","venti"],
        seg: { 11: [["un","O"],["dici","T"]], 12: [["do","O"],["dici","T"]], 13: [["tre","O"],["dici","T"]], 14: [["quattor","O"],["dici","T"]], 15: [["quin","O"],["dici","T"]], 16: [["se","O"],["dici","T"]], 17: [["dici","T"],["a",""],["ssette","O"]], 18: [["dici","T"],["otto","O"]], 19: [["dici","T"],["an",""],["nove","O"]] } },
  es: { words: ["", "uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","once","doce","trece","catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve","veinte"],
        seg: { 16: [["dieci","T"],["séis","O"]], 17: [["dieci","T"],["siete","O"]], 18: [["dieci","T"],["ocho","O"]], 19: [["dieci","T"],["nueve","O"]] } },
  pt: { words: ["", "um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove","vinte"],
        seg: { 16: [["dez","T"],["es",""],["seis","O"]], 17: [["dez","T"],["es",""],["sete","O"]], 18: [["dez","T"],["oito","O"]], 19: [["dez","T"],["e",""],["nove","O"]] } },
  nl: { words: ["", "één","twee","drie","vier","vijf","zes","zeven","acht","negen","tien","elf","twaalf","dertien","veertien","vijftien","zestien","zeventien","achttien","negentien","twintig"],
        seg: { 13: [["der","O"],["tien","T"]], 14: [["veer","O"],["tien","T"]], 15: [["vijf","O"],["tien","T"]], 16: [["zes","O"],["tien","T"]], 17: [["zeven","O"],["tien","T"]], 18: [["acht","O"],["tien","T"]], 19: [["negen","O"],["tien","T"]] } },
  sv: { words: ["", "ett","två","tre","fyra","fem","sex","sju","åtta","nio","tio","elva","tolv","tretton","fjorton","femton","sexton","sjutton","arton","nitton","tjugo"],          // [NSR-FLAG] native review
        seg: { 13: [["tre","O"],["tton","T"]], 14: [["fjor","O"],["ton","T"]], 15: [["fem","O"],["ton","T"]], 16: [["sex","O"],["ton","T"]], 17: [["sju","O"],["tton","T"]], 18: [["ar","O"],["ton","T"]], 19: [["ni","O"],["tton","T"]] } },
  da: { words: ["", "en","to","tre","fire","fem","seks","syv","otte","ni","ti","elleve","tolv","tretten","fjorten","femten","seksten","sytten","atten","nitten","tyve"],             // [NSR-FLAG] native review
        seg: { 13: [["tre","O"],["tten","T"]], 14: [["fjor","O"],["ten","T"]], 15: [["fem","O"],["ten","T"]], 16: [["seks","O"],["ten","T"]], 17: [["syt","O"],["ten","T"]], 18: [["at","O"],["ten","T"]], 19: [["ni","O"],["tten","T"]] } },
  no: { words: ["", "en","to","tre","fire","fem","seks","sju","åtte","ni","ti","elleve","tolv","tretten","fjorten","femten","seksten","sytten","atten","nitten","tjue"],             // [NSR-FLAG] native review (bokmål; sju/tjue forms)
        seg: { 13: [["tre","O"],["tten","T"]], 14: [["fjor","O"],["ten","T"]], 15: [["fem","O"],["ten","T"]], 16: [["seks","O"],["ten","T"]], 17: [["syt","O"],["ten","T"]], 18: [["at","O"],["ten","T"]], 19: [["ni","O"],["tten","T"]] } },
  fi: { words: ["", "yksi","kaksi","kolme","neljä","viisi","kuusi","seitsemän","kahdeksan","yhdeksän","kymmenen","yksitoista","kaksitoista","kolmetoista","neljätoista","viisitoista","kuusitoista","seitsemäntoista","kahdeksantoista","yhdeksäntoista","kaksikymmentä"],   // [NSR-FLAG] native review
        seg: { 11: [["yksi","O"],["toista","T"]], 12: [["kaksi","O"],["toista","T"]], 13: [["kolme","O"],["toista","T"]], 14: [["neljä","O"],["toista","T"]], 15: [["viisi","O"],["toista","T"]], 16: [["kuusi","O"],["toista","T"]], 17: [["seitsemän","O"],["toista","T"]], 18: [["kahdeksan","O"],["toista","T"]], 19: [["yhdeksän","O"],["toista","T"]], 20: [["kaksi","M"],["kymmentä","T"]] } }
};
```
Notes for the translation review: sv "arton" and da/no "atten" are irregular (from åtta / otte / åtte) — the O segment is the historical stem, shown so the child sees the ones-first order, not to teach the etymology; nl "één" carries the accent so the tile is never read as the article; pt uses Brazilian "quatorze" and the "dez-e-…" joiners; fi 20 is the one word whose first part means "two TENS" — tag M, both rods pulse. 11 and 12 have no segments in en / de / fr / es / pt / nl / sv / da / no (elf, zwölf, onze, douze, once, doce, elf, twaalf, elva, tolv, elleve …); they do in it and fi, where the words are transparent.

**Boards** (five pairs each; the numeral column and the word column are shuffled independently):
- **L1** (1-10): boards built by picking 5 of 1-10 without repeats, always including at least two of 6-9: e.g. (1, 4, 6, 8, 10) · (2, 3, 7, 9, 5) · (3, 6, 8, 9, 10) · (1, 2, 5, 7, 9)
- **L2** (11-20): (11, 13, 15, 17, 20) · (12, 14, 16, 18, 19) · (11, 12, 15, 19, 20) · (13, 14, 16, 17, 18)
- **L3** (teens beside their ones; 2 / 12 / 20 together): (3, 13, 4, 14, 7) · (5, 15, 6, 16, 9) · (8, 18, 9, 19, 2) · (7, 17, 3, 13, 20) · (2, 12, 20, 4, 14)

Within a board the two tiles of one pair are never on the same row on a fresh board (so the first tap is never trivially opposite its partner).

Worked example (`?lang=de`): board 1 (L1: 2, 3, 7, 9, 5) — taps 7 then "sieben", 3 then "drei", 9 then "neun", 5 then "fünf", 2 then "zwei": zero wrong → L2 · board 2 (L2: 11, 13, 15, 17, 20) — taps 13 then "siebzehn": both nudge; "sieb" underlines coral while 13's three dots pulse, then "zehn" underlines teal while 13's rod pulses — the dots do not match "sieb"; taps 13 then "dreizehn": pair, and the cue replays as confirmation ("drei" ↔ three dots, "zehn" ↔ the rod); the rest first-try → one wrong pair → L3 · board 3 (L3: 3, 13, 4, 14, 7) — taps 3 then "dreizehn": nudge; "drei" ↔ 3's dots pulse, "zehn" ↔ a dashed rod ghost pulses on the 3 tile (3 has no ten); taps 3 then "drei": pair; the rest first-try · Finish lists fifteen chips.

## Rules
- Item count: one "item" = one board of 5 pairs; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 15 pairs ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, the part cue as confirmation (segmented words only), tiles lock with `ART.link`, parrot `ANIM.bob`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - Teen word paired with its ones numeral (3 + "thirteen") or the reverse (13 + "three"): both nudge, `tone("nudge")`; the word's O and T parts underline in the language's order while the numeral's dots / rod pulse in step; a missing ten shows `ART.rodGhost`, missing ones `ART.dotGhost`.
  - 20 paired with 2 or 12: nudge, tone; 20's two rods pulse (with the M part in fi) against 2's dots / 12's single rod and ghosts.
  - A fused word (treize, quince, elf, tolv …) in a wrong pair: nudge, tone; no underline; the numeral's whole picture pulses once.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern) until the pair is made. The board is never reset.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes (success is certain).
- Finish condition: the session's boards complete. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Number Words". The number words themselves are content from `LOCALE_DATA`, not UI strings, and are not passed through the translation step. Nothing is spoken.

## Sound
`tone("tap")` on select / de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("tap", 2)` and `tone("tap", 9)` as the ones part and the ten part light during the cue (a low note for ones, a high note for the ten, whichever comes first in the language); `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the underlines and the picture carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (`?lang=de` shows dreizehn, `?lang=fi` shows kolmetoista, `?lang=fr` shows treize; chrome strings change with the picker; the longest words fit their tiles).
- [ ] Works at narrow width (400-px iframe: both columns fully visible; five rows remain separate targets).
- [ ] Keyboard operable (Tab walks the numeral column then the word column; Enter selects; a second Enter on the other column attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] All tiles are face up at all times; nothing has to be remembered.
- [ ] Every numeral tile from 11 to 19 shows one rod and the right number of dots; 20 shows two rods; 1-9 show dots only; 10 one rod.
- [ ] In German, pairing 3 with "dreizehn" underlines "drei" in coral while the three dots pulse, then "zehn" in teal while a dashed rod pulses on the 3 tile.
- [ ] In French, pairing 7 with "dix-sept" underlines "dix" first (the rod) then "sept" (the dots) — the opposite order from German.
- [ ] In French, a wrong pair with "treize" shows no underline and the numeral's whole picture pulses once.
- [ ] Making a correct teen pair replays the part cue slowly before the tiles lock.
- [ ] A board with 0-1 mistakes is followed by a harder board; a board with 3+ mistakes by an easier one; at level 3 the board holds 3 and 13 (or 4 and 14) together.
- [ ] The finish screen lists every pair made as "13 thirteen" chips in the play language and no score.
- [ ] With `?sound=off` nothing is audible.
