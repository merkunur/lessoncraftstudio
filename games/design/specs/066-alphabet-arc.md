# 066 — Alphabet Arc

## Identity
- Slug: `alphabet-arc`
- Subject / topic: Literacy / alphabetical order — tapping 3-4 scattered capital letters in alphabetical order onto an arc
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (per-tap judgement; each correct tap glides the letter to the next arc slot)
- Estimated build size: ~430 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (5-6 default = per-tap judgement so an error is caught at once; a tile tapped out of turn nudges and stays; on the 2nd error the correct next tile gains a soft outline; 3rd → show-me). Locale note: the 26 basic capitals and their order are shared by all eleven languages; the extra letters and their positions differ (sv/fi Å Ä Ö after Z; da/no Æ Ø Å after Z; es Ñ after N; de/fr/it/pt/nl sort their accented letters with the base letter and add nothing) — these live in `LOCALE_DATA` and appear only at L3. Nothing is spoken.

## Learning
- Objective: Taps 3-4 scattered capital letters in alphabetical order, including runs that do not start at A and runs with gaps between the letters.
- Prerequisites: Recognises capital letters as distinct shapes (game 006); has some memory of the alphabet sequence (song or classroom strip). No reading.
- Curriculum links: F-22 (letter names taught explicitly at 5-7 in all twelve systems — alphabetical order is the sequence those names live in), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d "recognize and name all upper- and lowercase letters" + L.1.1.a; England Y1 "alphabetical order" via dictionary work by Y2; Germany Klasse 1-2 "ABC / Alphabet ordnen"; France CP "ordre alphabétique"; Spain 1º "orden alfabético"; Brazil EF01LP04 "ordem alfabética"; Netherlands groep 3-4 "alfabet"; Sweden åk 1 "alfabetet"; Norway 1.-2. trinn "alfabetet"; Finland vuosiluokka 1-2 "aakkosjärjestys"). Demand: F-7 (letter recognition / alphabet are universal-demand topics).
- Common misconceptions (F-101, F-121, F-102, F-129), each with this game's response:
  1. **The sequence only works from A — a run that starts mid-alphabet (K L M) cannot be started, or A-like "first" letters are tapped first (F-101 stable order, F-109 cannot start from a non-initial point).** Response: from L1 half the runs start mid-alphabet; the first tap of a run is judged like any other; on the 2nd error the **strip window** appears (`ART.stripChip` × 5-12 letters at the bottom, showing the alphabet from one letter before the run's lowest to one after its highest) with the run's letters marked (`ART.stripMark`) — the child finds the leftmost marked letter.
  2. **Ordering by salience — the biggest / nearest / first-noticed tile goes first (F-129 sequencing by salience).** Response: tiles are identical in size and style; scatter positions are shuffled per item; the arc slots show their position numbers (`ART.slotNumeral` 1-4) so "first" is a place, not a feeling.
  3. **Look-alike and mirror letters confused in the sequence (M/W, N/Z, C/G, E/F — F-121).** Response: L2 and L3 runs deliberately contain such pairs (L M N O; V W X Y; E F G H); a wrong tap nudges; the strip window shows both letters with their true order.
  4. **Reversed order — placing the run from Z down (12↔21-style order reversal, F-102).** Response: the arc's slot 1 is on the LEFT with its numeral; a first tap on the run's LAST letter is refused with a nudge and, on the 2nd error, the strip window whose leftmost marked letter is the answer.
  5. **Not knowing the extra letters' place (Å Ä Ö, Æ Ø Å, Ñ).** Response: locale-specific L3 runs include them; the strip window shows the locale's true tail (…X Y Z Å Ä Ö) or Ñ in place.

## How it plays
1. **Start screen**: title "Alphabet Arc", the parrot (`ART.parrot`) at (360, 200), Start, picker.
2. **Item 1 (L1: C D E)**: rail of 8 dots (§6). Zone A: the arc — a faint curved rail (`ART.arcRail`) from (200, 220) up through (360, 140) to (520, 220), with three slots (`ART.slot`, 96 × 96, dashed) on it at (240, 190), (360, 140), (480, 190), each with a small `ART.slotNumeral` (1, 2, 3) at its top-left; the parrot perched at the arc's left end (150, 250). Zone B: three letter tiles (`ART.letterTile`, 96 × 96) at scatter positions (250, 340), (360, 410), (470, 340), the letters C, D, E assigned to positions at random; each tile shows its letter at 56 px. No caption.
3. **Ordering**: the child taps a letter.
   - **Correct next letter (C)**: `ANIM.pop`, `tone("tap", 1)`, the tile glides (`ANIM.glide`) to slot 1 and settles; slot 1's numeral hides behind it; the parrot `ANIM.hop`. Next tap D → slot 2 with `tone("tap", 2)`; E → slot 3 with `tone("tap", 3)`.
   - **Out of turn (E first)**: `ANIM.nudge`, `tone("nudge")`, the tile stays where it is. Error 1.
   - **Second error on the same item**: nudge + tone, then the **strip window** appears in zone C (`ANIM.appear`): chips B C D E F (one before to one after), the run's letters carrying `ART.stripMark` beneath; the correct next tile gains `ART.hintRing` (a soft outline, `ANIM.softPulse`). The strip stays until the item completes.
   - **Third error**: the correct next tile's ring becomes the show-me pulse (`ANIM.showMe`); tapping it completes that step as solved-with-help; the item continues (the remaining letters still have to be tapped, with the ring moving to each next letter).
   - **Tapping the last placed arc tile**: it glides back to its scatter position (undo, `tone("tap")`) — allowed only for the most recently placed tile, and never counted as an error.
4. **Run complete**: all slots filled → the arc tiles `ANIM.wave` in order (each pops 100 ms after the previous, left to right, with `tone("tap", k)`), `tone("correct")`, praise pop (rotation), the parrot `ANIM.hop` twice, rail dot fills; next item after 700 ms (`ANIM.appear`).
5. **Items 2-8**: per Content/Rules. L1 3 consecutive letters; L2 4 consecutive letters (four slots at (190, 210), (300, 140), (420, 140), (530, 210); four scatter positions (200, 330), (330, 420), (430, 330), (560, 410)); L3 4 letters with gaps, plus the locale's extra letters where the locale has them.
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = the eight runs as `ART.runChip` (150 × 40) in two rows of four from y = 340 (x = 165 / 295 / 425 / 555), each showing its letters in order ("C D E") at 22 px; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  parrot:      { kind: "emoji", value: "🦜", size: 72 },
  arcRail:     { kind: "shape", shape: "arc", r: 220, stroke: "line", strokeWidth: 6 },        // drawn as an arc centred (360, 360) from 215° to 325° (the top part of a circle)
  slot:        { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // dashed via lineDash [8,6]
  slotNumeral: { kind: "text",  value: "", size: 20, font: "display", color: "inkSoft" },
  letterTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // letter 56 px display ink
  hintRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 3, radius: 18 },
  stripChip:   { kind: "shape", shape: "roundRect", w: 52, h: 52, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },   // letter 32 px display ink
  stripMark:   { kind: "shape", shape: "rect", w: 40, h: 6, fill: "accent" },
  runChip:     { kind: "shape", shape: "roundRect", w: 150, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct letter tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "letter tapped out of turn" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "letter to its arc slot; back to its scatter spot on undo (x,y at call)" },
  hop:       { y: "-=14", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "parrot on each correct letter (twice on a completed run)" },
  wave:      { scale: 1.15, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "each arc tile in turn, 100 ms apart, when the run completes" },
  softPulse: { alpha: 0.7, duration: 700, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile after the 2nd error (from alpha 0.3)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile after the 3rd error (from alpha 0.2)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item; strip window (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        [2] (360,140)                          │
      │           [1] (240,190)  ⌒ arcRail ⌒  [3] (480,190)           │  zone A
      │  parrot (150,250)      slots 96×96, dashed                     │
260   ├──────────────────────────────────────────────────────────────┤
      │           [ E ]                        [ C ]   y=340           │
      │          (250,340)     [ D ]          (470,340)               │  zone B
      │                       (360,410)                               │
480   ├──────────────────────────────────────────────────────────────┤
      │      strip window: [B][C][D][E][F]  y=520, pitch 60 (on error) │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-letter items: slots (190, 210), (300, 140), (420, 140), (530, 210); scatter (200, 330), (330, 420), (430, 330), (560, 410). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.arcRail` drawn once behind the slots; `ART.slot` at the slot positions (each a `makeTile` 96 × 96 so an undo tap is keyboard-reachable), `ART.slotNumeral` at slot (−34, −34); `ART.parrot` at (150, 250).
- Letter tiles: `makeTile` 96 × 96 with `ART.letterTile` tokens, letter 56 px `THEME.font.display` `THEME.colour.ink`; placed tiles keep the selected look (§7.2) and are disabled except the last placed one (undo).
- `ART.hintRing` behind the correct next tile (alpha animated); strip window: 5-12 × `ART.stripChip` centred at y = 520, pitch 60 (48 when more than 9 chips; first x = 360 − (n−1) × pitch / 2), letters 32 px; `ART.stripMark` under the marked chips at y = 548.
- Tap floors 96 ≥ 80; scatter positions are ≥ 110 px apart centre to centre; slots ≥ 110 apart.
- Tab order: the scattered letter tiles in creation order (left to right by scatter x), then the arc slots (undo).

## Content
Letter runs. The base (all 11 locales) is language-neutral; `LOCALE_DATA[GameCore.lang].extraRuns` adds locale L3 runs and `LOCALE_DATA[GameCore.lang].tail` gives the strip window's letter order after Z (and the position of Ñ for es). Each run = the letters in correct order; the scatter order is shuffled per item.

- **L1 — 3 consecutive capitals, half not starting at A**: A B C · C D E · F G H · K L M · M N O · P Q R · S T U · X Y Z
- **L2 — 4 consecutive capitals, including look-alike neighbours** (misconception 3): A B C D · E F G H · H I J K · L M N O · O P Q R · R S T U · T U V W · V W X Y
- **L3 — 4 capitals with gaps** (the strip is the tool): B D F H · A C E G · J L N P · M O Q S · P R T V · S U W Y · C F I L · H K N Q
- **L3 locale extra runs** (`LOCALE_DATA`):
  - `sv`: tail `Z Å Ä Ö` — runs X Y Z Å · Y Z Å Ä · Z Å Ä Ö
  - `fi`: tail `Z Å Ä Ö` — runs X Y Z Å · Z Å Ä Ö
  - `da`, `no`: tail `Z Æ Ø Å` — runs X Y Z Æ · Y Z Æ Ø · Z Æ Ø Å
  - `es`: Ñ between N and O — runs M N Ñ O · L N Ñ P · N Ñ O P
  - `en`, `de`, `fr`, `it`, `pt`, `nl`: no extra runs (accented letters sort with their base letter and are not separate alphabet entries)
  The strip window for a locale run shows the locale tail in order (e.g. sv: W X Y Z Å Ä Ö). Locale runs are drawn at L3 only, mixed with the base L3 runs (1 in 3 L3 items is a locale run where the locale has them).

Strip window rule: the chips run from one letter before the run's lowest to one after its highest (clamped to the alphabet's ends, using the locale tail); consecutive runs give 5-6 chips at pitch 60; gap runs give up to 12 chips (C F I L spans B..M), drawn at pitch 48 whenever there are more than 9 (12 × 48 = 576 px, inside the stage), the letter size unchanged at 32 px.

Play list: 8 items; start at L1; levels per Rules; no run repeats within a session; a session never shows the same first letter twice in a row.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive items with no out-of-turn tap → next level (cap L3).
- Adaptation: an item with 2 or more out-of-turn taps, or out-of-turn taps on 2 consecutive items → next item one level down (floor L1). Undo taps are never errors.
- What happens on a correct answer: per letter — `ANIM.pop`, `tone("tap", k)`, `ANIM.glide` to slot k, parrot `ANIM.hop`; per run — `ANIM.wave`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot fills, next item after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - First letter of a mid-alphabet run not found (starts with the "A-most" looking letter, or any wrong letter): `ANIM.nudge`, `tone("nudge")`, tile stays. On the 2nd error the strip window appears with the run's letters marked and `ART.hintRing` soft-pulses on the correct next tile.
  - Run tapped from the end (order reversal): the same nudge; the strip's leftmost marked letter and the slot numeral 1 on the left carry the correction.
  - Look-alike pair swapped (N tapped for M): the same nudge; the strip window shows M then N side by side.
  - Extra letter placed before Z (Å tapped before Z in sv): the same nudge; the strip window shows the locale tail order.
- Retry behaviour: error 1 → nudge; error 2 → strip window + soft ring; error 3 → show-me ring on the correct next tile; each subsequent letter of that item keeps the show-me ring until tapped. An item with any out-of-turn tap never counts as first-try.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Alphabet Arc". No words on the play screen; letters and slot numerals are content.

## Sound
`tone("tap", k)` when the k-th letter lands on the arc (pitch rises along the run — the order is audible as well as visible, F-213); `tone("nudge")` on an out-of-turn tap; `tone("tap")` on an undo; `tone("correct")` when the run completes (after the wave); `tone("finish")` once. Silent under `?sound=off`. Letter names are NOT spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=sv` shows Å Ä Ö runs at the third level with the strip reading W X Y Z Å Ä Ö; `?lang=es` shows Ñ between N and O; `?lang=de` shows no extra letters).
- [ ] Works at narrow width (400-px iframe: arc, four slots, four scattered tiles and the strip window all visible and separate).
- [ ] Keyboard operable (Tab across the scattered letters, Enter sends the focused letter to the arc if it is next; Tab to the last arc tile and Enter undoes it).
- [ ] Never auto-starts.
- [ ] No losing state (any number of out-of-turn taps still ends with every run on the arc).
- [ ] With C D E scattered, tapping C moves it to slot 1 with a note, D to slot 2 with a higher note, E to slot 3; tapping E first only wiggles it.
- [ ] After two wrong taps on one item, a row of letter chips appears at the bottom with the run's letters underlined, and the right next tile gets a soft outline.
- [ ] Tapping the last placed arc tile returns it to where it was, without a wiggle.
- [ ] Runs that start mid-alphabet (K L M) appear from the first level.
- [ ] At the third level the four letters have gaps (B D F H).
- [ ] Two clean runs in a row bring four-letter runs; two wrong taps on one run bring three-letter runs back.
- [ ] The finish screen shows the eight completed runs as chips and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each letter placed is a higher note than the previous.
