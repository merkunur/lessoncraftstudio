# 052 — Share or Group

## Identity
- Slug: `share-or-group`
- Subject / topic: Mathematics / the two meanings of division — sharing among K (how many each?) versus grouping in Ks (how many groups?)
- Age band: `8-9`
- Interaction pattern: `P8` — sort into bins (tap the card, then tap a bin; drag also accepted with the tap-tap fallback per §3)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Content is language-neutral (picture cards, plates, bags, numerals); no `LOCALE_DATA`.

## Learning
- Objective: Sorts picture problems into "share among K plates" and "make bags of K" bins by reading whether the picture fixes the NUMBER of groups or the SIZE of each group.
- Prerequisites: Has shared objects among plates (game 051); counts to 30; reads numerals to 30. No words are needed to play.
- Curriculum links: F-111 (sharing is learned before grouping; the two models are confused when only numbers are given — "explicit how-many-in-each vs how-many-groups icons"), F-21, F-31 row "Division as sharing/grouping; facts" — conservative 8-9 → 8-9 (US 3.OA.A.2 "interpret whole-number quotients … as the number of objects in each share … or as a number of shares"; England Y2-3 "division as sharing and grouping"; Germany Klasse 2 "Verteilen und Aufteilen" — the two verbs are named separately; France CE1-CE2 "partage et groupement"; Netherlands groep 4-5 "verdelen en opdelen"; Spain 2º ciclo "reparto y agrupamiento"; Brazil EF03MA08 "ideias de repartição e de medida"; Sweden åk 3 "delningsdivision och innehållsdivision"; Norway 3. trinn; Finland grade 3 "jakolasku").
- Common misconceptions (F-111, F-110), each with this game's response:
  1. **Reading only the numbers ("12 and 4 — it's the same problem").** Response: at L2 and L3 the two cards of a pair carry the SAME numbers (12 among 4 plates / 12 in bags of 4) and appear a few items apart, so the numbers cannot decide the bin; on a wrong bin the card's own deal enacts (Rules): plates fill round-robin, or bags fill one at a time — the picture is the information.
  2. **"Bags of 4" read as "4 bags" (divisor given as the number of groups).** Response: the group card shows ONE bag with 4 objects printed on its front (`ART.bagIcon` + `ART.bagCount`) and the question glyph over an empty space where more bags would go (`ART.rowQuestion`); on a wrong bin the objects gather 4 at a time into bags that appear one by one, and the bag COUNT badge grows — the child watches the number of bags be the unknown.
  3. **"Among 4 plates" read as "4 on each plate" (group size given as the answer).** Response: the share card shows 4 EMPTY plates and the question glyph ON a plate (`ART.plateQuestion`); on a wrong bin the deal runs round-robin and each plate's badge counts up to the answer — the number of plates never changes; what grew was the pile on each.
  4. **Sharing is fine, grouping is skipped (grouping learned later).** Response: L1 pairs every group card with a small K (2 or 3) so bags fill quickly, and the enacted grouping animation is the same warm motion as the deal; the bin counts show both models being used equally.
  5. **Sorting by the object pictured (apples go together).** Response: the object on a card is chosen at random from four emoji per item, independently of the bin, so the picture of the object is never a cue; the bin icons are a plate and a bag, never an object.

## How it plays
1. **Start screen**: title "Share or Group", the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker.
2. **Card 1 (L1: 6 among 2 plates)**: rail of 12 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: a card (`ART.card`, 300 × 180) slides in from the right (`ANIM.slideIn`) to (360, 158) as a `makeTile` 300 × 180. On the card: the pile — 6 objects (`ART.apple` this time; the object per item is random from `ART.apple` / `ART.cookie` / `ART.pear` / `ART.acorn`, 30 px) in a row at the card's top (y − 52, pitch 34, centred) with the numeral "6" (`ART.pileNumeral`) at the card's top-left corner; beneath the pile, the structure strip: for a SHARE card, K empty plates (`ART.plateIcon`, 40 px) in a row with `ART.plateQuestion` ("?" 22 px) drawn on the first plate; for a GROUP card, one bag (`ART.bagIcon`) showing `ART.bagCount` ("2", drawn on the bag) followed by `ART.rowQuestion` ("?" 28 px) over three dashed empty bag outlines (`ART.bagGhost`). The hedgehog sits at (70, 190). Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 220 and 500: the share bin carries `ART.plateIcon` with a small pile glyph over it (`ART.binShareGlyph`: three plates with a dot on each) and the group bin carries `ART.bagIcon` ×3 (`ART.binGroupGlyph`); each bin has `ART.binCount` ("0") at its bottom. Bin order left/right is shuffled per session and then fixed (the child learns where each bin sits). Zone C: empty (praise pops here). Caption `S("whichKind")` ("Share out, or make groups?") at (360, 290), 22 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Sorting**: tap the card (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. Drag from the card to a bin does the same (a pointer move < 8 px is a tap). The card glides (`ANIM.glide`) toward the bin.
   - **Correct bin**: the card shrinks into the bin (`ANIM.glide` to the bin centre then `ANIM.shrink`), the bin's count goes up by one with `ANIM.pop`, `tone("correct")`; then a **short enact** on the bin's face for 800 ms: the share bin shows `ART.eachTag` ("3 each" built as the answer numeral + `S("each")`) and the group bin shows `ART.bagsTag` (the answer numeral + `S("bags")`) — the answer is shown, not asked. Every second correct sort plays a praise pop. Rail dot fills; the next card slides in after 400 ms.
   - **Wrong bin**: the card glides back to centre, `tone("nudge")`; then the **full enact** on the card itself: for a share card the pile deals round-robin onto the plates (`ANIM.deal`, 220 ms per object, `tone("tap", k)`), each plate's `ART.plateBadge` counting up; for a group card the objects gather into a bag (`ANIM.deal` to the bag), the bag closes (`ANIM.pop`), a new `ART.bagIcon` appears beside it and the `ART.bagBadge` (number of bags so far) counts up, until the pile is empty. The enacted state stays on the card for 1200 ms, then the card resets (`ANIM.appear`). Attempt 2 — the child sorts the same card again.
   - **Second wrong bin**: the enact again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the card there completes the item as solved-with-help (no praise pop).
   - Tapping a bin with no card selected: the bin's glyph does `ANIM.pop` (a preview); nothing else.
4. **Cards 2-12**: per Content/Rules. L1: distinct numbers per card, K ≤ 3, N ≤ 12. L2: same-number PAIRS (12 among 4 / 12 in bags of 4) two to four cards apart, N ≤ 24. L3: same-number pairs adjacent, N ≤ 30, and the structure strip drawn SMALLER (icons 28 px) so the child must look, plus one card per session where K = N ÷ K (16 among 4 / 16 in bags of 4 — the two answers coincide and only the picture separates them).
5. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the two bins side by side at y = 400 (x = 220 / 500) with their final counts — the summary — and under each bin its cards' numerals as a row of small `ART.miniCard`s (12 × 40 × 24) showing "12 ÷ 4" text; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  hedgehog:      { kind: "emoji", value: "🦔", size: 80, fallback: "🐿️" },   // Unicode 11 hedgehog; chipmunk fallback
  apple:         { kind: "emoji", value: "🍎", size: 30 },
  cookie:        { kind: "emoji", value: "🍪", size: 30 },
  pear:          { kind: "emoji", value: "🍐", size: 30 },
  acorn:         { kind: "emoji", value: "🌰", size: 30 },
  card:          { kind: "shape", shape: "roundRect", w: 300, h: 180, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  pileNumeral:   { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  plateIcon:     { kind: "shape", shape: "circle", r: 20, fill: "surface2", stroke: "structure", strokeWidth: 3 },
  plateQuestion: { kind: "text",  value: "?", size: 22, font: "display", color: "accent" },
  plateBadge:    { kind: "shape", shape: "circle", r: 11, fill: "structure" },      // running count 14 px display, color bg
  bagIcon:       { kind: "shape", shape: "roundRect", w: 44, h: 52, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  bagCount:      { kind: "text",  value: "", size: 22, font: "display", color: "structure" },   // drawn on the bag: the group size
  bagGhost:      { kind: "shape", shape: "roundRect", w: 44, h: 52, stroke: "line", strokeWidth: 2, radius: 8 },   // dashed (lineDash [5,5]) empty bag outline
  bagBadge:      { kind: "shape", shape: "circle", r: 11, fill: "structure" },      // number of bags so far, 14 px display, color bg
  rowQuestion:   { kind: "text",  value: "?", size: 28, font: "display", color: "accent" },
  bin:           { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  binShareGlyph: { kind: "shape", shape: "circle", r: 14, fill: "surface2", stroke: "ink", strokeWidth: 3 },   // drawn 3 times, 36 px apart, each with a 5-px structure dot on it
  binGroupGlyph: { kind: "shape", shape: "roundRect", w: 30, h: 36, stroke: "ink", strokeWidth: 3, radius: 6 },   // drawn 3 times, 36 px apart
  binCount:      { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  eachTag:       { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  bagsTag:       { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  showRing:      { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniCard:      { kind: "shape", shape: "roundRect", w: 40, h: 24, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 6 },   // text 12 px display ink
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Pile layout on the card: up to 10 objects in one row (pitch 30 at 30 px), 11-20 in two rows (y − 62 / y − 34), 21-30 in three rows (y − 70 / y − 46 / y − 22), each row centred; the structure strip sits at y + 50 (share: K plates at pitch 48, centred; group: one bag at x − 80 then the "?" and three ghost bags at pitch 52). Colour-blind safety: share vs group is carried by icon geometry (circle plate vs tall rounded bag) and by position, never by hue.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new card from x = 760 to centre" },
  lift:      { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to a bin / back to centre (x,y at call)" },
  shrink:    { scale: 0.2, alpha: 0, duration: 220, ease: "Sine.In", trigger: "card disappearing into a bin" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receiving a card; a bag closing; bin preview tap" },
  deal:      { duration: 220, ease: "Sine.InOut", trigger: "one object from the pile to a plate slot or into the open bag (x,y at call); the next starts 220 ms later" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "card reset after an enact; a new bag icon (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the answer badge(s) at the end of an enact" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            ┌──────────────────────────┐                      │
      │ hedgehog   │ 6  o o o o o o           │  ART.card (360,158)   │  zone A
      │ (70,190)   │    (?)  ( )   plates     │  300×180              │
      │            └──────────────────────────┘                      │
260   ├──────────────────────────────────────────────────────────────┤
      │         "Share out, or make groups?" (360,290)               │
      │   ┌──────────────┐          ┌──────────────┐  bins y=390     │  zone B
      │   │ (·) (·) (·)  │          │  ▯  ▯  ▯     │  x=220 / 500    │
      │   │      0       │          │      0       │  (200×120)      │
      │   └──────────────┘          └──────────────┘                 │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. During an enact the plates / bags are drawn on the card at the structure strip's positions; the answer badges sit above them.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- The card: `makeTile` 300 × 180 at (360, 158) with `ART.card` tokens; `ART.pileNumeral` at the card's (−128, −70); objects per the pile layout; the structure strip per the layout note (`ART.plateIcon` + `ART.plateQuestion`, or `ART.bagIcon` + `ART.bagCount` + `ART.rowQuestion` + `ART.bagGhost` ×3). Selected look: `ANIM.lift` + the tile's `selectedStroke` (`THEME.colour.structure`, 3 px). `scene.input.setDraggable` on the card container; `dragend` tests the two bins by distance (snap radius 60).
- Bins: `makeTile` 200 × 120 (`ART.bin` tokens) at (220, 390) and (500, 390); glyph row centred at (0, −18) (`ART.binShareGlyph` ×3 or `ART.binGroupGlyph` ×3); `ART.binCount` at (0, +38). `ART.eachTag` / `ART.bagsTag` appear at the bin's (0, −18) over the glyphs for 800 ms after a correct sort. `ART.showRing` around the correct bin.
- Enact badges: `ART.plateBadge` at each plate's (0, −28); `ART.bagBadge` at the newest bag's (0, −38).
- Caption `S("whichKind")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), two lines max.
- `ART.hedgehog` at (70, 190). Tap floors: card 300 × 180, bins 200 × 120 (≥ 56); gap between bins 80.
- Tab order: the card, then the two bins left to right.

## Content
Language-neutral. Cards as (N; kind; K; answer) — kind S = share among K plates, G = bags of K. The object emoji per card is drawn at random from the four object keys.
- **L1** (K ≤ 3, N ≤ 12, no shared numbers): (6; S; 2; 3) · (6; G; 3; 2) · (8; S; 2; 4) · (9; G; 3; 3) · (10; S; 2; 5) · (12; G; 2; 6) · (9; S; 3; 3) · (8; G; 2; 4)
- **L2** (same-number pairs 2-4 cards apart, N ≤ 24): (12; S; 4; 3) · (12; G; 4; 3) · (15; S; 3; 5) · (15; G; 3; 5) · (20; S; 5; 4) · (20; G; 5; 4) · (18; S; 3; 6) · (18; G; 3; 6) · (24; S; 4; 6) · (24; G; 4; 6)
- **L3** (pairs adjacent, N ≤ 30, small strip icons; one self-pair per session): (16; S; 4; 4) · (16; G; 4; 4) · (30; S; 5; 6) · (30; G; 5; 6) · (24; S; 6; 4) · (24; G; 6; 4) · (28; S; 4; 7) · (28; G; 4; 7) · (25; G; 5; 5) · (25; S; 5; 5) · (27; S; 3; 9) · (27; G; 3; 9)

Play list of 12 per Rules: L1 cards shuffled; L2 pairs kept 2-4 apart (shuffle pairs, then interleave); L3 pairs placed adjacent with the S/G order of each pair shuffled. The bin order is shuffled once per session; the correct bin therefore varies card to card by content, satisfying §13.

Worked example: cards 1-3 L1 all first-try (→ L2 after the 3rd) · card 4 (12; S; 4) first-try · card 5 (15; G; 3) put in the share bin → the card returns, objects gather three at a time into bags 1…5, then sorted right (helped) · card 6 (12; G; 4) first-try · card 7 (15; S; 3) first-try · card 8 (20; S; 5) first-try → L3 · cards 9-12 L3 with one miss → Finish: share bin 6, group bin 6.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three, not two: a sort takes ~15 s.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive cards → next card one level down (floor L1); a card is never abandoned.
- What happens on a correct answer: card into the bin, bin `ANIM.pop`, count +1, `tone("correct")`, the short enact tag ("3 each" / "4 bags") on the bin for 800 ms; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every second correct card and on the twelfth; rail dot; next card after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Share card put in the group bin (plates read as "K on each"): card returns; the pile deals round-robin onto the K plates with rising tones and each plate's badge counts to the answer; the badges pulse; `tone("nudge")`.
  - Group card put in the share bin (bag of K read as "K bags"): card returns; the objects gather K at a time into a bag, the bag closes with `ANIM.pop`, a new bag appears, the bag badge counts 1, 2, 3 … to the answer; the badge pulses; `tone("nudge")`.
  - Same-number pair confusion (any wrong bin on an L2/L3 pair card): the same enact; additionally the previously sorted partner card's numeral is shown briefly on its bin as `ART.miniCard` (the child sees "12 ÷ 4" already sits in the OTHER bin).
- Retry behaviour: attempt 1 → attempt 2 after the enact → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 cards. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Share or Group"; `whichKind` = "Share out, or make groups?"; `each` = "each"; `bags` = "bags". Tags are built as numeral + space + the word so the translation step replaces only the word.

## Sound
`tone("tap")` on selecting the card; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", k)` per object during an enact (rising through the deal or the bagging); `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Question 3 of 12", All done, Play again, Menu, praise change with the picker; the caption and "each"/"bags" once translated).
- [ ] Works at narrow width (400-px iframe: the card, both bins and the hedgehog visible; the card can still be dragged or tap-tapped into a bin).
- [ ] Keyboard operable (Tab: the card, then the two bins; Enter selects the card / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] A share card shows K empty plates with a "?" on one plate; a group card shows one bag with its number and a "?" over dashed empty bags.
- [ ] Putting a share card in the group bin makes its objects deal round-robin onto the plates with the plate badges counting up.
- [ ] Putting a group card in the share bin makes its objects gather into bags one bag at a time with the bag badge counting up.
- [ ] At level 2 the card "12 among 4 plates" and the card "12 in bags of 4" both appear, a few cards apart, and go to different bins.
- [ ] A correct sort shows "3 each" or "4 bags" briefly on the bin, and the bin's count rises by one.
- [ ] The pictured object (apple, cookie, pear, acorn) never predicts the bin.
- [ ] Three first-try corrects in a row bring same-number pairs; a wrong bin brings simpler cards next.
- [ ] The finish screen shows both bins with their counts and the sorted cards' numerals beneath; no score, no time.
- [ ] With `?sound=off` nothing is audible.
