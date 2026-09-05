# 110 — Months Wheel

## Identity
- Slug: `months-wheel`
- Subject / topic: Mathematics / calendar — the twelve months in order around a year wheel, including the wrap from December back to January, with hemisphere-neutral season context
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (per-tap judgement; tiles glide onto the wheel's slots)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P4. Locale rule (F-211, F-135): month names are language-bound and live in `LOCALE_DATA` for all eleven codes; the mechanic is universal. Season rule (F-135): the four season arcs on the wheel are CONTEXT, never a required cue — the objective is month order; the cold arc's position comes from `LOCALE_DATA[lang].coldStart` (December for ten locales, June for `pt` = Brazil, whose south has its cold months in June-August); the season glyphs are thermometer levels, a sprout and a falling leaf — snow never appears. No dates, no holidays, no birthdays. Nothing is spoken.

## Learning
- Objective: Places the twelve months onto a numbered year wheel in order, starting from any given month and continuing round through December into January.
- Prerequisites: Reads single words (the month names of the child's language); reads numerals 1-12; has played a P4 game (109 is the natural predecessor).
- Curriculum links: F-21 ("calendar (days, months)" in the 12-system maths common core), F-28 / F-31 row "Calendar days/months; clock to hour/half" — conservative 7-8 → the full twelve-month cycle with wrapping is placed at 8-9 as the stretch form (US 2.MD / state calendar standards "months of the year"; England Y2 "sequence intervals of time … months"; Germany Klasse 2 "Monate, Jahreszeiten"; France CE1 "se repérer dans l'année"; Netherlands groep 4 "maanden van het jaar"; Spain 1º ciclo "meses del año"; Brazil EF02MA18 "meses do ano"; Sweden åk 1-3 "årets månader"; Denmark 2. klasse "måneder"; Norway 2. trinn "måneder og årstider"; Finland grades 1-2 "kuukaudet"). F-135 (seasons as observable patterns, hemisphere trap), F-38 (Brazil: seasons reversed in the south; the school year starts in February — no "September = start" cue anywhere).
- Common misconceptions (F-116, F-101, F-129, F-135), each with this game's response:
  1. **The year is a line that ends in December ("nothing comes after December"; the wheel treated as a list — F-116 unit of repeat not seen).** Response: the wheel is a circle: slot 12 sits beside slot 1, and every L2/L3 item that starts mid-year continues past slot 12 into slot 1 with `ART.wrapArc` (a short curved arrow between slots 12 and 1) lit for that item; a tile refused at the wrap makes the arc pulse (`ANIM.arcPulse`) and `ART.nextArrow` hop from slot 12 to slot 1.
  2. **Look-alike names swapped (June/July, juin/juillet, junio/julio, juni/juli, Juni/Juli, March/May, Mai/März — F-101 stable order).** Response: per-tap judgement: the wrong tile nudges and stays; `ART.nextArrow` slides from the last filled slot round the rim to the next free slot (`ANIM.handOff`) so the child looks at the next POSITION; on the second wrong tap for the same slot the correct tile gains the show-me ring.
  3. **Ordering by salience — the child's own month, a holiday month, or "the warm months" first (F-129).** Response: slot 1 (January) is marked by `ART.startMark` at the top of the wheel and the fill order always runs clockwise from the item's anchor; there is no holiday and no picture attached to any month, so nothing but position distinguishes them.
  4. **Seasons as fixed to the same months everywhere / winter = snow (F-135).** Response: the season arcs carry thermometer glyphs (`ART.thermoLow` / `ART.thermoMid` / `ART.thermoHigh`) plus `ART.sprout` on the warming arc and `ART.leaf` on the cooling arc — cues true in every hemisphere — and the cold arc sits on June-August when the game runs in `pt`; snow is never drawn. The arcs are never needed to answer; a child who ignores them loses nothing.
  5. **Twelve confused with ten or with the four seasons ("four months in a year").** Response: the wheel has twelve numbered slots from the first item on; L1 anchors eight months and leaves four gaps, so the child sees the whole twelve before placing any.

## How it plays
1. **Start screen**: title "Months Wheel", the tortoise (`ART.tortoise`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: four consecutive months to place, January-April; the other eight anchored)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. The wheel (`ART.wheelRim`, r 120) centred at (176, 270): twelve slots (`ART.wheelSlot`, circles r 28) on the rim at angle θᵢ = −90° + 30° × i (i = 0 … 11; January at the top, clockwise), each with its position numeral (`ART.slotNumeral` "1" … "12") faint at its centre while empty; `ART.startMark` just outside slot 1 at (176, 108). Behind the rim, the four season arcs (`ART.seasonArc`, a 90° band between r 138 and r 156) each carrying its glyph at the arc's middle angle, r 168: cold `ART.thermoLow`; warming `ART.thermoMid` + `ART.sprout`; warm `ART.thermoHigh`; cooling `ART.thermoMid` + `ART.leaf`. The cold arc covers the three slots starting at `LOCALE_DATA[lang].coldStart` (slot 12, 1, 2 for ten locales; slots 6, 7, 8 for `pt`) and the others follow clockwise. Anchored months are drawn as `ART.anchorChip` (r 26) in their slots with the SHORT name from `LOCALE_DATA[lang].short`. The tortoise sits at (176, 470) under the wheel. Zone A/B right: the tray — four tiles (`makeTile` 108 × 56 with `ART.monthTile` tokens) in a 3-column grid at x = 404 / 524 / 644, rows y = 130 / 198 / 266 / 334 (the first four cells used), labelled with FULL names from `LOCALE_DATA[lang].full`, shuffled. Caption `S("putInOrder")` ("Put the months in order") at (540, 90), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 300, two lines.
3. **Tapping in order**: the child taps a tile.
   - **Correct next (the month belonging to the next free slot clockwise)**: `tone("tap", k)` (k = slot number), `ANIM.pop`; the tile glides (`ANIM.glide`) to the slot and becomes an `ART.placedChip` showing the SHORT name (`ANIM.shrinkToSlot`); the slot numeral moves to a small badge below the chip (`ART.slotNumeral` at r 148). Tapping a placed chip returns it to the tray (`ANIM.glide` back) — undo, no penalty.
   - **Item complete (last free slot filled)**: `tone("correct")`, praise pop (`GameCore.showPraise`, next key in rotation), the tortoise `ANIM.nod`, the rail dot fills; `ART.sweepHand` (a thin hand from the wheel centre) sweeps once clockwise from the item's anchor through the placed months (`ANIM.sweep`, 1200 ms) — the order read back as motion; then the next item builds (`ANIM.appear`).
   - **Wrong (a tile that is not the next month)**: `ANIM.nudge` on the tile, `tone("nudge")`, the tile stays; `ART.nextArrow` appears at the last filled slot (or `ART.startMark`) and slides clockwise along the rim to the next free slot (`ANIM.handOff`), whose numeral `ANIM.slotPulse`s; if the next slot is slot 1 reached from slot 12, `ART.wrapArc` `ANIM.arcPulse`s first. All tray tiles `setEnabled(false)` during the cue (≈ 1 s), then re-enable. Attempt 2 for this slot.
   - **Wrong again on the same slot**: the cue again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it fills the slot as solved-with-help (no praise pop; the sweep still plays).
4. **Items 2-10**: per Content/Rules. L1 = four consecutive months (may wrap, e.g. October-January) with eight anchors; L2 = six consecutive months with six anchors, half the items wrapping; L3 = one anchor (or none) and eleven or twelve tiles in the tray (3 columns × 4 rows), the fill running clockwise from the anchor all the way round.
5. **Finish**: `t("all_done")` (360, 110); the tortoise (360, 200) `ANIM.celebrate`; the summary = the whole wheel drawn small (`ART.miniWheel`, r 70, centred (360, 380)) with all twelve SHORT names as `ART.anchorChip`s (r 18) in order and `ART.startMark` at January — the year the child built, not a score; optionally `t("question_x_of_y", {n: first-try solved, total: 10})` at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  tortoise:    { kind: "emoji", value: "🐢", size: 72 },
  sprout:      { kind: "emoji", value: "🌱", size: 22 },
  leaf:        { kind: "emoji", value: "🍂", size: 22 },
  wheelRim:    { kind: "shape", shape: "circle", r: 120, stroke: "structure", strokeWidth: 4 },
  seasonArc:   { kind: "shape", shape: "arc", r: 147, stroke: "structureSoft", strokeWidth: 18 },   // one 90° band per season; start angle set at call from coldStart
  thermoLow:   { kind: "shape", shape: "roundRect", w: 10, h: 26, fill: "surface", stroke: "ink", strokeWidth: 2, radius: 5 },   // a 6-px structure column filling the bottom 6 px; a structure bulb r 5 at the bottom
  thermoMid:   { kind: "shape", shape: "roundRect", w: 10, h: 26, fill: "surface", stroke: "ink", strokeWidth: 2, radius: 5 },   // column fills the bottom 13 px
  thermoHigh:  { kind: "shape", shape: "roundRect", w: 10, h: 26, fill: "surface", stroke: "ink", strokeWidth: 2, radius: 5 },   // column fills the bottom 22 px
  wheelSlot:   { kind: "shape", shape: "circle", r: 28, fill: "surface2", stroke: "line", strokeWidth: 2 },      // empty slot; dashed via lineDash [6,5]
  slotNumeral: { kind: "text",  value: "", size: 14, font: "display", color: "inkSoft" },   // "1".."12"
  anchorChip:  { kind: "shape", shape: "circle", r: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // short name 15 px display ink; not tappable
  placedChip:  { kind: "shape", shape: "circle", r: 26, fill: "surface", stroke: "structure", strokeWidth: 3 },         // short name 15 px display ink; tappable (undo)
  monthTile:   { kind: "shape", shape: "roundRect", w: 108, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // full name 22 px display ink, fit-to-width, min 20 px
  startMark:   { kind: "shape", shape: "polygon", points: [[-9,-13],[11,-5],[-9,3]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // small flag by slot 1; 2-px ink pole
  nextArrow:   { kind: "shape", shape: "polygon", points: [[-14,-5],[3,-5],[3,-11],[14,0],[3,11],[3,5],[-14,5]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // rotated to face along the rim
  wrapArc:     { kind: "shape", shape: "arc", r: 120, stroke: "accent", strokeWidth: 5 },   // the 30° rim segment from slot 12 to slot 1 with a 10-px arrowhead at slot 1
  sweepHand:   { kind: "shape", shape: "rect", w: 4, h: 100, fill: "accent" },              // pivot at the wheel centre; rotates
  showRing:    { kind: "shape", shape: "roundRect", w: 120, h: 68, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniWheel:   { kind: "shape", shape: "circle", r: 70, stroke: "structure", strokeWidth: 3 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Month names are text from `LOCALE_DATA`, never from ART. The three thermometer entries differ by the height of their filled column (6 / 13 / 22 px of the 26-px tube), drawn by one helper from the entry's comment value; the art upgrade may replace them with pictures.

## Animation registry
```js
const ANIM = {
  pop:          { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a correct tile tapped" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile tapped" },
  glide:        { duration: 300, ease: "Sine.InOut", trigger: "tile to its slot / chip back to the tray (x,y set at call)" },
  shrinkToSlot: { scaleX: 0.5, scaleY: 0.9, duration: 300, ease: "Sine.InOut", trigger: "tile becoming a chip (runs with glide); the chip is then redrawn as placedChip" },
  handOff:      { duration: 500, ease: "Sine.InOut", trigger: "nextArrow moves along the rim from the last filled slot to the next free slot (angle tweened; position = rim point at r 120; from alpha 0 over the first 100 ms)" },
  slotPulse:    { scale: 1.5, duration: 250, ease: "Back.Out", yoyo: true, repeat: 1, trigger: "the next free slot's numeral after a wrong tap" },
  arcPulse:     { alpha: 0.3, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "wrapArc when the child does not continue into slot 1" },
  sweep:        { angle: "+=360", duration: 1200, ease: "Sine.InOut", trigger: "sweepHand from the item's anchor angle once round (a partial sweep, angle = 30° × placed count, for L1/L2)" },
  nod:          { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tortoise on item completion" },
  fadeOut:      { alpha: 0, duration: 300, ease: "Sine.In", trigger: "nextArrow after a cue" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tray tiles and anchors (from alpha 0, scale 0.6)" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct next tile (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish tortoise" }
};
```
No flashing: `showMe` at 1 Hz; `arcPulse` three half-cycles in 750 ms; the sweep is one continuous rotation.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │          flag(176,108)          "Put the months in order"    │
      │        (12) (1) (2)              (540,90)                    │
      │     (11)         (3)      [ January ] [ March  ] [ April ]  y=130│
      │   (10)   wheel     (4)    [ February] [        ] [        ] y=198│  zones A+B
      │     (9)  (176,270)  (5)   [        ] [        ] [        ] y=266│
      │        (8) (7) (6)        [        ] [        ] [        ] y=334│
      │   season arcs r 138-156    x=404      x=524      x=644 (108×56)│
      │          tortoise (176,470)                                   │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Slot i centre = (176 + 120 cos θᵢ, 270 + 120 sin θᵢ), θᵢ = −90° + 30° i. The wheel with its arcs spans x = 8 … 344 and y = 102 … 438; the tray spans x = 350 … 698. The tray grid holds 4 / 6 / 11-12 tiles filled in reading order (L1 uses the first four cells, L2 the first six, L3 all twelve).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Wheel: four `ART.seasonArc`s behind (start angle for the cold arc = θ of slot `coldStart` − 15°, each spanning 90°; glyphs at r 168 on each arc's middle angle: cold `ART.thermoLow`; warming `ART.thermoMid` with `ART.sprout` 14 px further out; warm `ART.thermoHigh`; cooling `ART.thermoMid` with `ART.leaf`); `ART.wheelRim`; twelve `ART.wheelSlot`s (dashed while empty) each a `makeTile` 56 × 56 (so a placed chip can be returned by tap/keyboard; empty slots do nothing); `ART.slotNumeral` centred while empty, moved to r 148 (outside the rim, inside the arcs) when filled; `ART.startMark` at (176, 108); `ART.wrapArc` on the rim between slots 12 and 1 (drawn only for wrapping items).
- Chips: `ART.anchorChip` / `ART.placedChip` with the short name (15 px `THEME.font.display` `THEME.colour.ink`).
- Tray tiles: `makeTile` 108 × 56 with `ART.monthTile` tokens; label = full name, 22 px `THEME.font.display` `THEME.colour.ink`, fit-to-width, never below 20 px (the widest names — es "septiembre", fi "marraskuu", it "settembre" — fit at 20 px in the 100-px inner width).
- `ART.nextArrow` rides the rim at r 120, rotated tangent-clockwise; `ART.sweepHand` pivots at (176, 270). `ART.showRing` behind a tray tile. Caption `S("putInOrder")` at (540, 90); at L3 with an anchor, `S("continueFrom")` ("Carry on from here") with the anchor chip drawn solid.
- `ART.tortoise` at (176, 470).
- Tap floors: tray tiles 108 × 56 ≥ 56; slot tiles 56 ≥ 56; gaps: tray 12; rim slots 62 px apart centre to centre (chord of 30° at r 120) → 6 px between r-28 circles — accepted because only PLACED chips respond, and an adjacent chip is a legitimate undo target. Tab order: tray tiles in reading order, then the wheel slots clockwise from slot 1. While a cue plays (≈ 1 s) all tray tiles are `setEnabled(false)`.

## Content
Month names are language-bound. `LOCALE_DATA[lang]` = `{ full: [12 names January-first], short: [12 short forms], coldStart: <slot number of the first cold month> }`. Capitalisation follows each language's rule (en/de capitalised; the others lowercase). Nordic and Finnish rows: [NSR-FLAG] native review.

| lang | full (January → December) | coldStart |
|---|---|---|
| en | January, February, March, April, May, June, July, August, September, October, November, December | 12 |
| de | Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember | 12 |
| fr | janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre | 12 |
| it | gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre | 12 |
| es | enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre | 12 |
| pt | janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro | 6 (southern Brazil: cold June-August; the tropical north reads the thermometer as "mild", which the mid-level glyphs already allow) |
| nl | januari, februari, maart, april, mei, juni, juli, augustus, september, oktober, november, december | 12 |
| sv | januari, februari, mars, april, maj, juni, juli, augusti, september, oktober, november, december — [NSR-FLAG] native review | 12 |
| da | januar, februar, marts, april, maj, juni, juli, august, september, oktober, november, december — [NSR-FLAG] native review | 12 |
| no | januar, februar, mars, april, mai, juni, juli, august, september, oktober, november, desember — [NSR-FLAG] native review | 12 |
| fi | tammikuu, helmikuu, maaliskuu, huhtikuu, toukokuu, kesäkuu, heinäkuu, elokuu, syyskuu, lokakuu, marraskuu, joulukuu — [NSR-FLAG] native review | 12 |

| lang | short (January → December) |
|---|---|
| en | Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec |
| de | Jan, Feb, Mär, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Nov, Dez |
| fr | janv., févr., mars, avr., mai, juin, juil., août, sept., oct., nov., déc. |
| it | gen, feb, mar, apr, mag, giu, lug, ago, set, ott, nov, dic |
| es | ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic |
| pt | jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez |
| nl | jan, feb, mrt, apr, mei, jun, jul, aug, sep, okt, nov, dec |
| sv | jan, feb, mar, apr, maj, jun, jul, aug, sep, okt, nov, dec |
| da | jan, feb, mar, apr, maj, jun, jul, aug, sep, okt, nov, dec |
| no | jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des |
| fi | tammi, helmi, maalis, huhti, touko, kesä, heinä, elo, syys, loka, marras, joulu |

Items are written with month indices 1-12 (1 = January); the game renders `GameCore.lang`'s names. "anchors" = months drawn solid in their slots (not tappable); "tray" = the tiles; "fill" = the slot order (clockwise from the anchor; "wrap" = the fill passes from 12 to 1 and `ART.wrapArc` is drawn).
- **L1** (four consecutive months; eight anchors): (tray 1,2,3,4) · (tray 5,6,7,8) · (tray 9,10,11,12) · (tray 3,4,5,6) · (tray 7,8,9,10) · (tray 10,11,12,1; wrap)
- **L2** (six consecutive months; six anchors): (tray 1-6) · (tray 7-12) · (tray 4-9) · (tray 9,10,11,12,1,2; wrap) · (tray 11,12,1,2,3,4; wrap) · (tray 6-11)
- **L3** (the whole year from an anchor): (no anchor; tray 1-12; fill 1 … 12 from `ART.startMark`) · (anchor 9; tray 10,11,12,1,…,8; fill 10 … 12 then 1 … 8; wrap) · (anchor 6; tray 7 … 12, 1 … 5; wrap) · (anchor 12; tray 1 … 11; fill 1 … 11; wrap)

In every item the fill order is the tray's months in calendar order starting at the anchor + 1 (or January when there is no anchor). Play list of 10 per Rules; no item repeats within a session; tray positions shuffled per item; the correct first tile is never in the same tray cell twice running (§13).

Worked example: item 1 (L1 1-4) first-try · item 2 (L1 5-8) first-try → L2 · item 3 (L2 9-2, wrap) places 9, 10, 11, 12 then taps 3 → nudge, the wrap arc pulses, the arrow hops from slot 12 to slot 1; places 1 then 2 (helped) → L1 · item 4 first-try · item 5 first-try → L2 · items 6-7 first-try → L3 · item 8 (L3 anchor 6) confuses 7 and 8 (juli/juni) → arrow slides to slot 7; completes (helped) → L2 · items 9-10 first-try → Finish shows the mini wheel with all twelve short names.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct items → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: per placed tile `tone("tap", k)` + `ANIM.pop` + glide to the slot; on item completion `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ANIM.sweep`, tortoise `ANIM.nod`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - A tile tapped after December that is not January (no wrap / year ends): `ANIM.nudge` + `tone("nudge")`; `ART.wrapArc` `ANIM.arcPulse`s and `ART.nextArrow` hops from slot 12 to slot 1.
  - A look-alike name tapped (June for July, March for May and the like): nudge + tone; `ART.nextArrow` slides along the rim to the next free slot, whose numeral `ANIM.slotPulse`s.
  - A favourite / later month tapped out of order (salience): the same rim cue; the tile stays in the tray.
  - A tile tapped for slot 1 at the no-anchor L3 item that is not January: nudge + tone; the arrow starts at `ART.startMark` and lands on slot 1.
  - A placed chip tapped: returns to the tray (undo, no penalty, not an attempt).
- Retry behaviour: per slot — attempt 1 unaided → attempt 2 after the rim cue → attempt 3 with the show-me ring on the correct tile; the ringed tile fills the slot as solved-with-help. No attempt 4. An item with any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Months Wheel"; `putInOrder` = "Put the months in order"; `continueFrom` = "Carry on from here". Month names come from `LOCALE_DATA`, not from `STRINGS`. No season is ever named in text.

## Sound
`tone("tap", k)` when a tile lands in slot k (pitch climbs round the year, F-213); `tone("tap")` on an undo; `tone("correct")` on item completion; `tone("nudge")` on a wrong tap; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (with `?lang=fi` the tray reads tammikuu … joulukuu and the chips tammi … joulu; with `?lang=de` the tiles are capitalised; chrome strings change with the picker).
- [ ] Works at narrow width (400-px iframe: the whole wheel with its arcs and a twelve-tile tray fully visible; the longest names fit their tiles at 20 px or larger).
- [ ] Keyboard operable (Tab walks the tray tiles then the wheel slots clockwise; Enter places / returns; anchored chips are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with a full wheel via the show-me ring).
- [ ] Slot 1 is at the top of the wheel with a flag beside it and the slots run clockwise 1 to 12.
- [ ] In an item that wraps, a coral arc with an arrowhead is drawn between slot 12 and slot 1 before any tile is placed; tapping March after December makes it pulse and the arrow hop to slot 1.
- [ ] Tapping July when June is next nudges and an arrow slides along the rim to slot 6.
- [ ] With `?lang=pt` the low-thermometer arc sits on slots 6, 7, 8; in every other language it sits on slots 12, 1, 2. No snow appears in any language.
- [ ] Placing the last month makes a hand sweep once round the placed months before the next item.
- [ ] Two first-try items in a row bring six-tile then twelve-tile trays; a wrong tap brings a four-tile tray next.
- [ ] No holiday, date, birthday or season word appears anywhere on screen.
- [ ] The finish screen shows a small wheel with all twelve short names in order and no score.
- [ ] With `?sound=off` nothing is audible.
