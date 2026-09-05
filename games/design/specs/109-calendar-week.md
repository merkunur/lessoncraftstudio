# 109 — Calendar Week

## Identity
- Slug: `calendar-week`
- Subject / topic: Mathematics / calendar — the seven days of the week in order, and the day that comes after a given day (including Sunday → Monday)
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (per-tap judgement; tiles glide onto a week strip)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P4. Locale rule (F-211, F-28): day names are language-bound and live in `LOCALE_DATA` for all eleven codes; the mechanic is universal. **Monday is slot 1 in every locale** (the ISO 8601 / school-week convention used by every one of the 12 curricula's school calendars; pt-BR printed calendars often start on Sunday, and the game still starts the week on Monday and shows Sunday as the day after Saturday). No dates, no month, no holiday, no weather appears anywhere. Nothing is spoken.

## Learning
- Objective: Places the days of the week onto a seven-slot strip in Monday-first order, and, given one day, taps the days that follow it in order — wrapping from Sunday to Monday.
- Prerequisites: Reads single words (the day names of the child's language); reads numerals 1-7. No counting beyond 7.
- Curriculum links: F-21 ("calendar (days, months)" in the 12-system maths common core by age 8), F-28 / F-31 row "Calendar days/months; clock to hour/half" — conservative 7-8, earliest 5 → 6-8 (US K.MD / 1.MD "calendar" in most state standards; England Y1 "sequence events … days of the week"; Germany Klasse 1 "Wochentage"; France CP "se repérer dans la semaine"; Netherlands groep 3 "dagen van de week"; Spain 1º ciclo "días de la semana"; Brazil EF01MA17 "dias da semana"; Sweden åk 1 "veckodagar"; Denmark 1. klasse "ugedage"; Norway 1.-2. trinn "ukedager"; Finland grade 1 "viikonpäivät"). F-20 (content keyed to age, never a grade label: no "grade" or date on screen).
- Common misconceptions (F-101, F-116, F-129), each with this game's response:
  1. **The week has no fixed start ("Sunday first" from a wall calendar, or the day the child likes best first — F-129 sequencing by salience).** Response: slot 1 carries `ART.startMark` (a small flag) and the seven slots carry position numerals 1-7 that never move; a tile tapped for slot 1 that is not Monday nudges, slot 1's numeral grows (`ANIM.slotPulse`) and `ART.startMark` pulses — the strip, not a sentence, fixes where the week begins.
  2. **Stable-order errors between look-alike names (Tuesday/Thursday, Dienstag/Donnerstag, martes/miércoles, tirsdag/torsdag, terça/quarta — F-101 "stable-order violation").** Response: per-tap judgement catches the swap at once: the wrong tile nudges and stays in the tray; `ART.nextArrow` slides from the last filled slot to the next free slot (`ANIM.handOff`) — "this one is next"; on the second wrong tap for the same slot the correct tile gains the show-me ring.
  3. **The week ends at Sunday — "nothing comes after Sunday" or "Saturday comes after Sunday" (the cycle not grasped — F-116 unit of repeat).** Response: at L3 the fill order wraps: after slot 7 the next free slot is slot 1, and `ART.wrapArrow` (a curved arrow above the strip from slot 7 back to slot 1) is drawn from the start of every wrapping item; when the child taps Saturday after Sunday, the wrap arrow pulses (`ANIM.arrowPulse`) and `ART.nextArrow` lands on slot 1.
  4. **Before and after confused ("the day after Friday" answered with Thursday).** Response: every L3 tray holds the day BEFORE the anchor as its one distractor; tapping it makes `ART.nextArrow` slide from the anchor slot FORWARD to the next free slot (never backward), so the direction of "after" is enacted, not named.
  5. **Weekend days swapped or forgotten (Sunday placed in slot 6).** Response: the same per-tap refusal; there is no weekend colouring or symbol — Saturday and Sunday are ordinary days whose only cue is their position, so the child learns the order, not a colour.

## How it plays
1. **Start screen**: title "Calendar Week", the rooster (`ART.rooster`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: Monday anchored; tray = the next three days)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the week strip — seven slots (`ART.slot`, 88 × 56) in a row at y = 150, x = 72 + i × 96 (i = 0 … 6), each with its position numeral (`ART.slotNumeral` "1" … "7") faint at the slot's top-left (−34, −18); `ART.startMark` above slot 1 at (72, 108). Anchored days are drawn as `ART.anchorTile` in their slots with the SHORT name from `LOCALE_DATA[lang].short` (not tappable): here Monday in slot 1 and Friday, Saturday, Sunday in slots 5-7. The three empty slots (2, 3, 4) are the rail to fill. The rooster stands at (60, 230) looking at the strip. Zone B: the tray — three tiles (`makeTile` 150 × 64 with `ART.dayTile` tokens) at y = 340, x = 194 / 360 / 526, labelled with the FULL names Tuesday, Wednesday, Thursday from `LOCALE_DATA[lang].full`, in a shuffled order. Caption `S("putInOrder")` ("Put the days in order") at (360, 270), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Tapping in order**: the child taps a tile.
   - **Correct next (the day that belongs in the next free slot)**: `tone("tap", k)` (k = the slot number), `ANIM.pop`; the tile glides (`ANIM.glide`) into the slot, shrinks to 88 × 48 (`ANIM.shrinkToSlot`) and its label switches to the SHORT name; the slot numeral turns solid. The placed tile remains a `makeTile`: tapping it returns it to the tray (`ANIM.glide` back, label back to the full name) — undo, no penalty.
   - **Item complete (last empty slot filled)**: `tone("correct")`, praise pop (`GameCore.showPraise`, next key in rotation), the rooster `ANIM.crow` (a small angle wobble), the rail dot fills; the strip's seven names read left to right for 900 ms (`ART.readBar` slides under the slots, `ANIM.readSweep`); then the next item builds (`ANIM.appear` on new anchors and tray). First-try correct if no wrong tap occurred on the item.
   - **Wrong (a tile that is not the next day)**: `ANIM.nudge` on the tile, `tone("nudge")`, the tile stays in the tray; `ART.nextArrow` appears at the last filled slot (or `ART.startMark` for slot 1) and slides to the next free slot (`ANIM.handOff`), then `ANIM.slotPulse` on that slot's numeral; if the tapped tile was the day BEFORE the correct one, the arrow starts from the correct tile's predecessor slot so the forward direction is visible. All tray tiles `setEnabled(false)` during the cue (≈ 900 ms), then re-enable. Attempt 2 for this slot.
   - **Wrong again on the same slot**: the cue again, and the correct next tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it fills the slot as solved-with-help (the item completes normally; no praise pop; the rooster still crows).
4. **Items 2-10**: per Content/Rules. L1 = three consecutive days with the rest anchored; L2 = all seven days in the tray (two rows of tiles: four at y = 320, three at y = 400) and no anchors; L3 = one anchor day, the tray holds the THREE days that follow it plus the day BEFORE it as a distractor, and the fill order wraps past Sunday to Monday when needed (`ART.wrapArrow` drawn for those items).
5. **Finish**: `t("all_done")` (360, 110); the rooster (360, 200) `ANIM.celebrate`; the summary = the full week strip drawn once more in Monday-first order with all seven SHORT names (`ART.anchorTile` × 7 at y = 340, x = 72 + i × 96) — the learning, not a score; optionally `t("question_x_of_y", {n: first-try solved, total: 10})` at (360, 420); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  rooster:     { kind: "emoji", value: "🐓", size: 80 },
  slot:        { kind: "shape", shape: "roundRect", w: 88, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },      // empty rail slot; dashed look via lineDash [8,6]
  slotNumeral: { kind: "text",  value: "", size: 14, font: "display", color: "inkSoft" },   // "1".."7"; turns color structure when filled
  anchorTile:  { kind: "shape", shape: "roundRect", w: 88, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },  // short name 20 px display ink; not tappable
  dayTile:     { kind: "shape", shape: "roundRect", w: 150, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },    // full name 24 px display ink, fit-to-width, min 20 px, two lines allowed
  startMark:   { kind: "shape", shape: "polygon", points: [[-10,-14],[12,-6],[-10,2]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // a small flag above slot 1; a 2-px ink pole from (-10,-14) to (-10,14)
  nextArrow:   { kind: "shape", shape: "polygon", points: [[-16,-6],[4,-6],[4,-12],[16,0],[4,12],[4,6],[-16,6]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // slides between slots
  wrapArrow:   { kind: "shape", shape: "arc", r: 300, stroke: "structure", strokeWidth: 4 },   // from above slot 7 back to above slot 1; an arrowhead polygon (12 px) at the slot-1 end, drawn by the same helper
  readBar:     { kind: "shape", shape: "rect", w: 96, h: 6, fill: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 162, h: 76, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Day names are text drawn from `LOCALE_DATA`, never from ART. Weekend slots look exactly like weekday slots.

## Animation registry
```js
const ANIM = {
  pop:          { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a correct tile tapped" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile tapped" },
  glide:        { duration: 260, ease: "Sine.InOut", trigger: "tile to its slot / back to the tray (x,y set at call)" },
  shrinkToSlot: { scaleX: 0.58, scaleY: 0.75, duration: 260, ease: "Sine.InOut", trigger: "tile landing in a slot (runs with glide); reversed on return" },
  handOff:      { duration: 400, ease: "Sine.InOut", trigger: "nextArrow slides from the last filled slot (or the start mark) to the next free slot (x set at call; from alpha 0 to 1 over the first 100 ms)" },
  slotPulse:    { scale: 1.5, duration: 250, ease: "Back.Out", yoyo: true, repeat: 1, trigger: "the next free slot's numeral after a wrong tap" },
  arrowPulse:   { alpha: 0.3, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "wrapArrow when a non-wrapping day is tapped for slot 1 at L3" },
  readSweep:    { x: 648, duration: 900, ease: "Sine.InOut", trigger: "readBar slides under the strip from x = 72 to x = 648 when an item completes" },
  crow:         { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "rooster on item completion" },
  fadeOut:      { alpha: 0, duration: 300, ease: "Sine.In", trigger: "nextArrow after a cue" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tray tiles and anchors (from alpha 0, scale 0.6)" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct next tile (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rooster" }
};
```
No flashing: `showMe` cycles at 1 Hz; `arrowPulse` runs three half-cycles in 750 ms; every cue is one continuous motion.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  flag (72,108)  ╭── wrapArrow (L3 only) ──────────────╮        │
      │ [Mon][ 2 ][ 3 ][ 4 ][Fri][Sat][Sun]   strip y=150, x=72+96i   │  zone A
      │  rooster (60,230)                                             │
260   ├──────────────────────────────────────────────────────────────┤
      │            "Put the days in order" (360,270)                 │
      │   [ Tuesday ]    [ Thursday ]    [ Wednesday ]   y=340        │  zone B
      │    x=194           x=360           x=526        (150×64)     │
      │   (L2: four tiles y=320 at x=111/277/443/609; three y=400)    │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The strip spans x = 28 … 692 (inside the 16-px margins). L2 tray: row 1 (four tiles) at y = 320, x = 111 / 277 / 443 / 609 (pitch 166); row 2 (three tiles) at y = 400, x = 194 / 360 / 526. L3 tray: four tiles in one row at y = 340, x = 111 / 277 / 443 / 609.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Strip: seven `ART.slot`s at y = 150, x = 72 + 96 i, drawn dashed while empty (graphics lineDash [8, 6]); `ART.slotNumeral` at each slot's (−34, −18); `ART.startMark` at (72, 108). An anchored day = `ART.anchorTile` centred in its slot with the short name (20 px `THEME.font.display` `THEME.colour.ink`). Each EMPTY slot is a `makeTile` 88 × 56 only so that a placed tile is keyboard-reachable for undo; empty slots do nothing when tapped.
- Tray tiles: `makeTile` 150 × 64 with `ART.dayTile` tokens; label = the full name, 24 px `THEME.font.display` `THEME.colour.ink`, fit-to-width (never below 20 px; two lines allowed for pt "segunda-feira" and fi "keskiviikko" if needed). A placed tile shows the short name at 20 px.
- `ART.nextArrow` travels at y = 108 (above the slots); `ART.wrapArrow` is the arc of a circle of r 300 centred at (360, 380), drawn from the angle above slot 7 to the angle above slot 1 (its top at y ≈ 80), with the arrowhead at the slot-1 end; present only on L3 items whose fill order wraps. `ART.readBar` at y = 184 under the slots. `ART.showRing` behind a tray tile.
- `ART.rooster` at (60, 230). Caption `S("putInOrder")` at (360, 270), two lines max; at L3 the caption is `S("whatComesAfter")` ("What comes after?").
- Tap floors: tray tiles 150 × 64 ≥ 56; strip slots 88 × 56 ≥ 56; gaps ≥ 8 between slots (pitch 96, width 88), 16 between tray tiles. Tab order: tray tiles in reading order, then the strip slots left to right (filled slots only respond). While a cue plays (≈ 1 s) all tray tiles are `setEnabled(false)`.

## Content
Day names are language-bound. `LOCALE_DATA[lang]` = `{ full: [7 names Monday-first], short: [7 short forms] }`. Capitalisation follows each language's rule (en/de capitalised; the others lowercase). Nordic and Finnish rows: [NSR-FLAG] native review.

| lang | full (Monday → Sunday) |
|---|---|
| en | Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday |
| de | Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag |
| fr | lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche |
| it | lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica |
| es | lunes, martes, miércoles, jueves, viernes, sábado, domingo |
| pt | segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo |
| nl | maandag, dinsdag, woensdag, donderdag, vrijdag, zaterdag, zondag |
| sv | måndag, tisdag, onsdag, torsdag, fredag, lördag, söndag — [NSR-FLAG] native review |
| da | mandag, tirsdag, onsdag, torsdag, fredag, lørdag, søndag — [NSR-FLAG] native review |
| no | mandag, tirsdag, onsdag, torsdag, fredag, lørdag, søndag — [NSR-FLAG] native review |
| fi | maanantai, tiistai, keskiviikko, torstai, perjantai, lauantai, sunnuntai — [NSR-FLAG] native review |

| lang | short (Monday → Sunday) |
|---|---|
| en | Mon, Tue, Wed, Thu, Fri, Sat, Sun |
| de | Mo, Di, Mi, Do, Fr, Sa, So |
| fr | lun, mar, mer, jeu, ven, sam, dim |
| it | lun, mar, mer, gio, ven, sab, dom |
| es | lun, mar, mié, jue, vie, sáb, dom |
| pt | seg, ter, qua, qui, sex, sáb, dom |
| nl | ma, di, wo, do, vr, za, zo |
| sv | mån, tis, ons, tor, fre, lör, sön |
| da | man, tir, ons, tor, fre, lør, søn |
| no | man, tir, ons, tor, fre, lør, søn |
| fi | ma, ti, ke, to, pe, la, su |

Items are written with day indices 1-7 (1 = Monday); the game renders the names of `GameCore.lang`. "anchors" are drawn in their slots and are not tappable; "tray" lists the tiles in the tray (shuffled at build); "fill" is the slot order the tray must be placed in.
- **L1** (three consecutive days; the rest anchored): (anchors 1,5,6,7; tray 2,3,4; fill 2,3,4) · (anchors 1,2,6,7; tray 3,4,5; fill 3,4,5) · (anchors 1,2,3,4; tray 5,6,7; fill 5,6,7) · (anchors 1,2,3,7; tray 4,5,6; fill 4,5,6) · (anchors 1,6,7; tray 2,3,4,5; fill 2,3,4,5)
- **L2** (all seven in the tray; no anchors): (tray 1-7; fill 1,2,3,4,5,6,7) — four copies with different shuffles, each used at most once per session; the shuffle never places Monday leftmost in row 1.
- **L3** (one anchor; tray = the three following days + the day BEFORE the anchor as a distractor; the fill order wraps; `ART.wrapArrow` shown when the fill includes slot 1): (anchor 5; tray 6,7,1 + 4; fill 6,7,1; wrap) · (anchor 6; tray 7,1,2 + 5; fill 7,1,2; wrap) · (anchor 7; tray 1,2,3 + 6; fill 1,2,3; wrap) · (anchor 3; tray 4,5,6 + 2; fill 4,5,6) · (anchor 4; tray 5,6,7 + 3; fill 5,6,7) · (anchor 2; tray 3,4,5 + 1; fill 3,4,5)

Play list of 10 per Rules; no item repeats within a session; tray positions shuffled per item; the correct first tile is never in the same tray slot twice running (§13).

Worked example: item 1 (L1, tray Tue/Wed/Thu) all first-try · item 2 (L1) first-try → L2 · item 3 (L2, all seven) taps Sunday first → nudge, the arrow slides from the flag to slot 1, slot 1's numeral grows; then Monday … Sunday in order (helped) → L1 · item 4 first-try · item 5 first-try → L2 · item 6 (L2) first-try · item 7 first-try → L3 · item 8 (L3, anchor Sunday) taps Saturday → the wrap arrow pulses and the arrow lands on slot 1; then Monday, Tuesday, Wednesday (helped) → L2 · items 9-10 first-try → Finish shows the full week strip.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct items → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: per placed tile `tone("tap", k)` + `ANIM.pop` + glide into the slot; on item completion `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ANIM.readSweep`, rooster `ANIM.crow`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - A day other than Monday tapped for slot 1 (no fixed start / Sunday-first): `ANIM.nudge` + `tone("nudge")`; `ART.nextArrow` slides from `ART.startMark` to slot 1 and slot 1's numeral `ANIM.slotPulse`s.
  - A look-alike name tapped (Tuesday for Thursday and the like): nudge + tone; `ART.nextArrow` slides from the last filled slot to the next free slot; the tile stays in the tray.
  - Saturday (or any day) tapped after Sunday at L3 instead of Monday (no wrap): nudge + tone; `ART.wrapArrow` `ANIM.arrowPulse`s and `ART.nextArrow` lands on slot 1.
  - The day BEFORE the anchor tapped at L3 (before/after confused): nudge + tone; `ART.nextArrow` slides FORWARD from the anchor slot to the next free slot.
  - A placed tile tapped: returns to the tray (undo, no penalty, not an attempt).
- Retry behaviour: per slot — attempt 1 unaided → attempt 2 after the arrow cue → attempt 3 with the show-me ring on the correct tile; the ringed tile fills the slot as solved-with-help. No attempt 4. An item with any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Calendar Week"; `putInOrder` = "Put the days in order"; `whatComesAfter` = "What comes after?". Day names come from `LOCALE_DATA`, not from `STRINGS`.

## Sound
`tone("tap", k)` when a tile lands in slot k (pitch climbs through the week, F-213); `tone("tap")` on an undo; `tone("correct")` on item completion; `tone("nudge")` on a wrong tap; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the strip and the arrow carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (with `?lang=fi` the tray reads maanantai … sunnuntai and the slots ma … su; with `?lang=pt` the tiles read segunda-feira … domingo; chrome strings change with the picker).
- [ ] Works at narrow width (400-px iframe: all seven slots, the flag, the tray and the caption fully visible; long names shrink or wrap inside their tiles, never overflow).
- [ ] Keyboard operable (Tab walks the tray tiles then the strip slots; Enter places / returns; anchored days are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with a full strip via the show-me ring).
- [ ] Slot 1 always holds Monday in every language; a Sunday tapped first nudges and the flag-to-slot-1 arrow plays.
- [ ] Tapping the correct day makes it glide into the next empty slot and switch to its short name; tapping it there sends it back with its full name.
- [ ] Tapping Thursday when Tuesday is next nudges and an arrow slides from the last filled slot to the next empty slot.
- [ ] At the third level an item anchored on Sunday shows a curved arrow from slot 7 to slot 1, and Monday is accepted next; Saturday is refused with the arrow pulsing.
- [ ] At the third level the tray's extra tile is the day before the anchor, and tapping it makes the arrow move forward, never backward.
- [ ] Two first-try items in a row bring a seven-tile tray; a wrong tap brings a three-tile tray next.
- [ ] No date, month, holiday, weather or weekend colour appears anywhere.
- [ ] The finish screen shows the full Monday-first week in the play language and no score.
- [ ] With `?sound=off` nothing is audible.
