# 142 — Name Letters

## Identity
- Slug: `missing-letter-name`
- Subject / topic: Literacy / the letters of the child's own name — tapping them in order from a tray, with the faint name fading away over the session
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (per-tap judgement, the 5-6 default; each correct tap glides the letter to the next name slot)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (a tile tapped out of turn nudges and stays; 2nd error → the correct next tile gains a soft outline; 3rd → show-me). Locale note: the alphabet pages of the letter bank and each locale's extra letters live in `LOCALE_DATA` (F-122); no word list exists — the only content is the name the adult or child enters ONCE on the start screen. Names are never authored by the game (cultural neutrality: no people's names in content); the illustrative name in this spec is a tester's example input. Nothing is spoken (no audio files).

## Learning
- Objective: Taps the 3-6 letters of a chosen name in order from a tray of six tiles, first with the name shown faintly, then from the first letter alone, then with no model and the letters in title case.
- Prerequisites: An adult (or the child) can pick the name's letters from a shown alphabet once; the child recognises capital letters as distinct shapes (game 006). No reading.
- Curriculum links: F-22 (letter names and letter forms taught explicitly at 5-7 in all twelve systems — a child's own name is the universal first written word in every one of them), F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d + K writing "print many upper- and lowercase letters"; England Reception ELG "write recognisable letters … such as their name"; Germany Kita/Klasse 1 "den eigenen Namen schreiben"; France GS "écrire son prénom"; Spain Infantil "su nombre"; Brazil EI03EF09 "escrever o próprio nome"; Netherlands groep 2 "eigen naam"; Sweden förskoleklass; Denmark 0. klasse "eget navn"; Norway 1. trinn; Finland esiopetus "oma nimi"). Demand: F-7 (letter recognition is universal).
- Common misconceptions (F-121, F-101, F-125), each with this game's response:
  1. **The name is a picture — the child knows its overall shape but not which letter comes where (F-125).** Response: L1 shows every letter faintly in its slot (`ART.ghostLetter`); L2 shows only the first letter's ghost and the slot numerals; L3 shows no ghost — the letters must be found from memory of the sequence; the ghost of the NEXT letter returns as the hint on the 2nd error, so the model is never gone for good.
  2. **Order slips — the child taps the letters in the wrong order or starts from the last letter (F-101 stable order).** Response: per-tap judgement — the out-of-turn tile nudges and stays; slot 1 is on the LEFT with its numeral (`ART.slotNumeral`), so "first" is a place; after two errors the correct next tile gains `ART.hintRing`.
  3. **Mirror and near-form fillers taken for a name letter (b for d, n for h, M for W — F-121).** Response: L1 fillers are visually unrelated to every name letter; L2 fillers may be near-forms; L3 includes one mirror twin of a name letter when one exists (lowercase b/d, p/q) — a tapped mirror filler shows `ART.bellyDot` on its bowl AND on the true letter's bowl for 900 ms before the nudge.
  4. **Upper and lower case not linked — the child knows the name in capitals only (F-121).** Response: L1-L2 use the name as entered (capitals); L3 shows the tray in title case (first letter capital, the rest lowercase via the locale's lowercase mapping) while the slots keep their capital ghosts on the hint, so the two forms are seen together.
  5. **Duplicate letters (a name with two of the same letter) — the child looks for "the other one".** Response: any tile whose letter equals the next needed letter is accepted, wherever it sits; both copies exist in the tray as separate tiles.

## How it plays
1. **Start screen (the name is entered here, once)**: title "Name Letters" at (360, 70) in `THEME.font.display` 40 px `THEME.colour.structure`; the bear (`ART.bear`) at (664, 300); a name strip of six slots (`ART.nameSlot`, 80 × 80) at y = 150, x = 150 / 234 / 318 / 402 / 486 / 570, with the caption `S("yourName")` ("Your name") at (360, 100) 26 px `THEME.colour.inkSoft`; a backspace tile (`makeTile` 80 × 80 at (664, 150) with `ART.backLabel`); the letter bank — page 1 (A-M): row 1 seven tiles (`ART.bankTile`, 80 × 80) at y = 250, x = 84 + i × 92 (A-G); row 2 six tiles at y = 342, x = 130 + i × 92 (H-M); page 2 (N-Z) laid out the same; page tiles (`makeTile` 80 × 80) at y = 424, x = 250 and 360, labelled from `LOCALE_DATA[lang].pageLabels` ("A-M", "N-Z"), plus a third page tile at x = 470 for locales with extra letters (label = the extras themselves, e.g. "Ä Ö Ü"); the selected page tile shows the library selected look. `makeButton` `start` at (360, 512), disabled (alpha 0.5) until the strip holds 3-6 letters. Language picker (16, 16). Tapping a bank letter places it in the next empty slot (`ANIM.glide` from the bank tile, `tone("tap", k)`); a seventh letter is refused (the bank tile `ANIM.nudge`); backspace removes the last letter (`tone("tap")`). A physical keyboard also works here (A-Z, Backspace, Enter) but is never required. The name is held in memory for the session only; nothing is stored. **Nothing plays until Start is tapped.**
2. **Run 1 (L1; example name "LEO")**: rail of 8 dots (§6). Zone A: three name slots (`ART.slot`, 96 × 96, dashed) at y = 170, x = 360 − (n−1) × 52 + i × 104 (n = name length; for six letters x = 100 … 620), each with `ART.slotNumeral` (1-6) at its top-left and the faint letter `ART.ghostLetter` ("L", "E", "O") centred; the bear at (660, 90). Zone B: a tray of six tiles (`ART.letterTile`, 96 × 96) at y = 380, x = 100 + i × 104: the name's letters plus three fillers (Content), shuffled, letters at 56 px. No caption.
3. **Ordering**: the child taps a tile.
   - **Correct next letter (L)**: `ANIM.pop`, `tone("tap", 1)`, the tile glides (`ANIM.glide`) into slot 1 and settles over the ghost (which hides); the bear `ANIM.nod`. Then E → slot 2 with `tone("tap", 2)`, O → slot 3 with `tone("tap", 3)`.
   - **Out of turn (O first)**: `ANIM.nudge`, `tone("nudge")`, the tile stays. Error 1.
   - **Mirror filler tapped (L3 only; d when the next letter is b)**: `ART.bellyDot` on the tapped tile's bowl and on the correct tile's bowl for 900 ms, then the nudge. Error 1.
   - **Second error on the same run**: nudge + tone; the correct next tile gains `ART.hintRing` (`ANIM.softPulse`) and, whatever the level, the NEXT slot's ghost letter appears (`ANIM.appear`) — the model returns for that one letter.
   - **Third error**: the ring becomes the show-me pulse (`ANIM.showMe`); tapping the ringed tile completes that step as solved-with-help; the run continues with the ring moving to each next letter until the name is complete.
   - **Tapping the last placed slot tile**: it glides back to its tray position (undo, `tone("tap")`) — allowed only for the most recently placed tile, never an error.
4. **Run complete**: the slot tiles `ANIM.wave` left to right (each pops 100 ms after the previous with `tone("tap", k)`), `tone("correct")`, praise pop (rotation), the bear `ANIM.nod` twice, rail dot fills; next run after 700 ms (`ANIM.appear` on a reshuffled tray).
5. **Runs 2-8**: per Content/Rules. L1 full ghost; L2 ghost only in slot 1; L3 no ghost, title-case tray, one mirror/near-form filler.
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 210) `ANIM.celebrate`; the summary = the name spelled large in `ART.nameCard` (a 6-slot strip of `ART.bigLetter`, 64 px, centred at (360, 320)) and below it the eight runs as `ART.runChip` (80 × 30) in a row at y = 420 (x = 360 − 3.5 × 88 + i × 88), each showing the name at 14 px — the record of eight spellings; `play_again` (250, 510) restarts Play with the same name, `menu` (470, 510) returns to the start screen with the name still in the strip (editable); `tone("finish")`.

Session ≈ 4-5 minutes after the one-time name entry.

## Art registry
```js
const ART = {
  bear:        { kind: "emoji", value: "🐻", size: 64 },
  nameSlot:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // start screen; dashed via lineDash [8,6]; holds an entered letter 44 px display ink
  bankTile:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },    // letter 44 px display ink
  backLabel:   { kind: "text",  value: "←", size: 40, font: "display", color: "structure" },
  slot:        { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // play; dashed via lineDash [8,6]
  slotNumeral: { kind: "text",  value: "", size: 20, font: "display", color: "inkSoft" },
  ghostLetter: { kind: "text",  value: "", size: 56, font: "display", color: "inkSoft" },   // drawn at alpha 0.35
  letterTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },    // letter 56 px display ink
  hintRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 3, radius: 18 },
  bellyDot:    { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  nameCard:    { kind: "shape", shape: "roundRect", w: 440, h: 96, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 18 },
  bigLetter:   { kind: "text",  value: "", size: 64, font: "display", color: "structure" },
  runChip:     { kind: "shape", shape: "roundRect", w: 80, h: 30, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },   // name 14 px display ink
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12; no `fallback` needed. The backspace glyph is a plain arrow text entry, not an emoji.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct letter tapped; page tile tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "letter tapped out of turn; a seventh letter on the start screen" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "letter to its slot; back to the tray on undo; bank letter to the name strip (x,y at call)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tray; a returning ghost letter; a bank page (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 200, ease: "Sine.In", trigger: "old bank page; bellyDot after 900 ms" },
  softPulse: { alpha: 0.9, duration: 700, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile (from alpha 0.4)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct next tile after the 3rd error (from alpha 0.2)" },
  wave:      { scale: 1.15, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "each slot tile in turn when the name completes, 100 ms apart" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bear on each correct letter; twice on a complete name" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```
No flashing; the slowest repeating motion is `showMe` at 1 Hz.

## Screen layout
Start screen (name entry, once):
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           Name Letters (360,70)                        │
      │        "Your name" (360,100)                                  │
      │   [ L ][ E ][ O ][   ][   ][   ]  strip y=150      [ ← ](664,150)│
      │   x=150 234 318 402 486 570                                   │
      │   [A][B][C][D][E][F][G]   bank row 1 y=250, x=84+i·92        │
      │     [H][I][J][K][L][M]    bank row 2 y=342, x=130+i·92 bear(664,300)│
      │        [A-M] [N-Z] ([Ä Ö Ü])  page tiles y=424, x=250/360/470 │
      │                  [   Start   ] (360,512)                      │
560   └──────────────────────────────────────────────────────────────┘
```
Play screen (example: a three-letter name):
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28        bear (660,90)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │           1┌────┐  2┌────┐  3┌────┐   slots y=170 (96×96)     │  zone A
      │            │ L  │   │ E  │   │ O  │   ghosts at alpha 0.35    │
      │            └────┘   └────┘   └────┘   x=256 / 360 / 464       │
260   ├──────────────────────────────────────────────────────────────┤
      │   [ O ] [ S ] [ L ] [ E ] [ M ] [ T ]   tray y=380 (96×96)    │  zone B
      │   x=100  204   308   412   516   620                          │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Slots: n slots centred, pitch 104 (for n = 6: x = 100 … 620). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- Start screen: title 40 px `THEME.font.display` `THEME.colour.structure`; `S("yourName")` 26 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.nameSlot` × 6 at y = 150 (entered letters 44 px `THEME.font.display` `THEME.colour.ink`); backspace `makeTile` 80 × 80 at (664, 150) with `ART.backLabel`, disabled while the strip is empty; bank tiles `makeTile` 80 × 80 (`ART.bankTile`), letters 44 px; page tiles `makeTile` 80 × 80 at y = 424 with 22 px labels; `ART.bear` (664, 300); `makeButton` `start` (360, 512), alpha 0.5 while fewer than 3 letters are entered.
- Play: `ART.slot` × n at y = 170 with `ART.slotNumeral` at (−36, −36) and `ART.ghostLetter` centred (alpha 0.35; L1 all slots, L2 slot 1 only, L3 none); `ART.bear` (660, 90).
- Tray: `makeTile` 96 × 96 (`ART.letterTile`), letter 56 px `THEME.font.display` `THEME.colour.ink`; L3 tray letters in title case.
- `ART.hintRing` behind the correct next tile; `ART.bellyDot` on a bowl (tile-centre relative: b (+12, +8) · d (−12, +8) · p (+12, −6) · q (−12, −6)).
- Finish: `ART.nameCard` at (360, 320) with `ART.bigLetter` × n at pitch 72 centred; `ART.runChip` × 8 at y = 420.
- Tap floors: bank/strip 80, tray 96 (≥ 80); gaps ≥ 12 (bank pitch 92, tray pitch 104).
- Tab order on the start screen: bank tiles row-major, backspace, page tiles, Start. In Play: tray tiles left to right, then the last placed slot tile (undo).

## Content
The only content is the entered name — 3-6 letters, uppercase from the bank. Nothing else is authored. `LOCALE_DATA[lang]` supplies the bank pages and page labels and is complete for all 11 locales by construction (no native list required):
- pages 1-2 (all locales): A B C D E F G · H I J K L M · N O P Q R S T · U V W X Y Z; labels "A-M", "N-Z".
- extras page (third page tile, label = the letters): de "Ä Ö Ü" · fr "É È Ê À Ç" · es "Ñ" · pt "Ã Õ Ç Á É" · it "À È É Ì Ò Ù" · sv "Å Ä Ö" · da "Æ Ø Å" · no "Æ Ø Å" · fi "Ä Ö" · en and nl: no third page.
- Lowercase for L3 = `letter.toLocaleLowerCase(lang)` applied to letters 2-n (the first letter stays capital).

Tray composition = the name's letters (duplicates as separate tiles) + fillers to make 6 (for a 6-letter name, no fillers; the tray is the name shuffled):
- **L1 fillers**: letters not in the name and not in the near-form/mirror table of any name letter (table below); chosen at random from the locale's pages 1-2.
- **L2 fillers**: at least one filler is a near-form of a name letter when one exists (else as L1).
- **L3 fillers**: in title case; one filler is the mirror twin of a lowercase name letter when one exists (b↔d, p↔q), else a near-form; the rest as L1.
- Near-form / mirror table (uppercase): B/D, E/F, M/W, N/Z, O/Q, C/G, V/U, I/L, P/R, K/X; (lowercase): b/d, p/q, n/h, u/n, i/l, m/w, a/o, f/t, g/q, v/y.
- Randomisation: the tray is reshuffled for every run; the correct first letter is never in the same tray slot twice running (§13); fillers are re-drawn per run.

Play list: 8 runs of the same name; start at L1; levels per Rules (L1 → L2 → L3 by the fading model, never a different name).

## Rules
- Item count: 8 runs.
- Difficulty progression: 2 consecutive first-try runs (no error in the run) → next level (cap L3): L1 full ghost → L2 first-letter ghost → L3 no ghost, title case, mirror filler.
- Adaptation: any error in a run, or an error in each of 2 consecutive runs → next run one level down (floor L1). The current run is never abandoned.
- What happens on a correct answer: each correct tap `ANIM.pop` + `tone("tap", k)` + glide to slot k + bear `ANIM.nod`; a complete name → `ANIM.wave`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next run after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Out-of-turn name letter (order slip): `ANIM.nudge` + `tone("nudge")`, the tile stays; 2nd error → `ART.hintRing` on the correct next tile AND the next slot's ghost letter returns.
  - Filler tapped (a letter not in the name): the same nudge; the ring and ghost on the 2nd error.
  - Mirror filler at L3 (d for b): `ART.bellyDot` on both bowls for 900 ms, then the nudge.
  - Reversed order (starting from the last letter): the nudge; the slot numerals stay visible; on the 2nd error slot 1's ghost returns.
  - Undo of the last placed tile: never an error.
- Retry behaviour: error 1 → error 2 with ring + ghost → error 3 with the show-me pulse; tapping the ringed tile completes the step as solved-with-help. No attempt 4 on any step. A run with any error is not first-try.
- Finish condition: 8 runs. No losing state, no clock. The start screen's Start stays disabled until the name is 3-6 letters, so a run always has a valid name.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Name Letters"; `yourName` = "Your name" (start screen only, paired with the name strip; ≤ 3 words). The page labels come from `LOCALE_DATA`, not `STRINGS`. No words on the play screen.

## Sound
`tone("tap", k)` on the k-th bank letter entered and on the k-th correctly placed letter (pitch climbs along the name, F-213); `tone("tap")` on backspace / undo; `tone("nudge")` on an out-of-turn tap; `tone("correct")` on a complete name; `tone("finish")` once. Silent under `?sound=off`. The name is never spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` shows a third bank page with Ä Ö Ü, `?lang=da` with Æ Ø Å; `?lang=en` has two pages only).
- [ ] Works at narrow width (400-px iframe: the six-slot strip, backspace, a 7-tile bank row and Start are all visible and separate; a 6-letter name's tray fits).
- [ ] Keyboard operable (Tab through bank tiles, backspace, page tiles, Start; in Play Tab across the tray; Enter taps; physical letter keys also enter letters on the start screen).
- [ ] Never auto-starts (the name screen waits; Start is dimmed until 3 letters are in the strip; nothing plays before Start).
- [ ] No losing state (any number of wrong taps still completes every run through the ring and returning ghosts).
- [ ] A seventh letter tapped on the start screen wiggles the bank tile and changes nothing; backspace removes the last letter.
- [ ] In run 1 every slot shows the name's letter faintly; tapping the tiles in name order fills the slots left to right with rising notes.
- [ ] Tapping the last letter first wiggles it and leaves it in the tray; a second wrong tap outlines the correct tile and shows the next slot's faint letter.
- [ ] After two clean runs the faint letters vanish except the first; after two more, none show and the tray letters are in title case (first capital, rest small).
- [ ] With a lowercase b in the name at the third level, a d tile appears in the tray and tapping it shows a coral dot on both letters' round parts.
- [ ] A name with a repeated letter (e.g. two of the same tile) accepts either copy for that position.
- [ ] Tapping the most recently placed slot tile returns it to the tray without an error.
- [ ] Play again keeps the same name; Menu returns to the name screen with the name still entered.
- [ ] The finish screen shows the name large, eight small copies below it, and no score.
- [ ] With `?sound=off` nothing is audible.
