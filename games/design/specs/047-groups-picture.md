# 047 — Groups Picture

## Identity
- Slug: `groups-picture`
- Subject / topic: Mathematics / multiplication as equal groups — the number of groups versus the size of each group
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three picture cards)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1.

## Learning
- Objective: Picks, from three pictures, the one that shows exactly N groups of M objects (and not M groups of N), given the prompt "N × [a group of M]".
- Prerequisites: Counts to 25; reads numerals to 5; can recognise that two plates hold "the same amount".
- Curriculum links: F-1 (multiplication / times tables in 10 of 15 sources), F-26 ("groups-of / arrays is a 6-8 objective everywhere" — concept onset EN 5-6, FR 6, NL 6-7, US/DE/IT/BR/SE 7-8), F-21, F-31 row "Multiplication as groups/arrays" — conservative 8, earliest 5-6 → 6-8 (US 2.OA.C.4 / 3.OA.A.1 "interpret 5 × 7 as the total number of objects in 5 groups of 7"; England Y1-2 "multiplication … using arrays and grouping"; Germany Klasse 2 "Malaufgaben: Anzahl der Gruppen × Gruppengröße"; France CE1 "sens de la multiplication: n fois m"; Netherlands groep 4 "keer-som als groepjes"; Spain 1º ciclo; Brazil EF02MA07 "adição de parcelas iguais"; Sweden åk 1-3 "multiplikation som upprepad addition"; Finland grade 2).
- Common misconceptions (F-110), each with this game's response:
  1. **Groups and group-size confused — 3 groups of 4 chosen as 4 plates of 3.** Response: on the wrong tap the chosen card labels itself: each plate gets a group badge (`ART.groupBadge` 1, 2, 3, 4 down the left edge, `tone("tap", k)`), then the items on the first plate get item badges (`ART.itemBadge` 1, 2, 3), and `ART.cardTag` under the card reads "4 groups of 3" (`S("groupsOf")` with the card's numbers); then the prompt's unit plate pulses (`ANIM.pulse`) beside its "3 ×". The child sees plates counted and contents counted as two different counts.
  2. **Choosing by the total ("they both make 12").** Response: the swap card always has the same total as the correct one, so the total can never decide; the enacted labelling (above) shows which count is the number of plates.
  3. **Counting only the objects on the plates, not the plates.** Response: the group badges count PLATES first, before any item is counted.
  4. **"Multiplying always makes bigger" / × 1 unfamiliar.** Response: L3 includes "3 × [a plate of 1]" and "1 × [a plate of 5]" — one plate with five things is one group.
  5. **Repeated addition not linked to the picture.** Response: on a correct tap the card's plates badge 1 … N and `ART.sumText` writes the repeated addition under the cards ("4 + 4 + 4 = 12"), one addend per plate as its badge appears.

## How it plays
1. **Start screen**: title "Groups Picture", the bear (`ART.bear`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 groups of 4 apples)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the prompt — `ART.factText` "3 ×" (44 px) at (250, 140) and the unit plate (`ART.unitPlate`, 170 × 64) at (440, 140) holding four `ART.apple`s at 28 px, pitch 34, centred; the caption `S("groupsOf")` ("3 groups of 4") at (360, 218), 24 px `THEME.colour.inkSoft`; the bear at (60, 140). Zone B: three picture cards (`ART.card`, 200 × 200, `makeTile`) at y = 370, x = 140 / 360 / 580, in a shuffled order: (3 plates of 4), (4 plates of 3), (3 plates of 3). Inside a card, plates (`ART.plate`, 150 × 32) are stacked at pitch 38 and centred vertically; each plate holds its items at 20 px, pitch 26, centred. Zone C: `ART.sumText` line at (360, 500), empty. No Check tile — a tap is the answer (P1).
3. **Answering**: the child taps a card.
   - **Correct**: `ANIM.pop` on the card, `tone("correct")`; the card's plates gain `ART.groupBadge` 1 … 3 one by one (250 ms apart, `tone("tap", k)`) while `ART.sumText` builds "4 + 4 + 4 = 12" one addend per badge; praise pop (rotation); the bear `ANIM.nod`; the rail dot fills; the other two cards `setEnabled(false)`; after 1000 ms the cards clear (`ANIM.rise`) and the next item `ANIM.appear`s. First-try.
   - **Wrong (the swap card, 4 plates of 3)**: `ANIM.nudge` on the card, `tone("nudge")`, the card de-selects and stays enabled; the enacted labelling: group badges 1 … 4 on its plates (`tone("tap", k)`), item badges 1 … 3 on its first plate, `ART.cardTag` "4 groups of 3" under the card, then the prompt's unit plate `ANIM.pulse`s and `ART.factText` `ANIM.pulse`s in turn; badges and tag stay for the rest of the item. All cards disabled during the enactment (≈ 2.5 s). Attempt 2.
   - **Wrong (the other distractor)**: the same labelling on that card ("3 groups of 3"). Attempt 2.
   - **Second wrong tap**: the labelling on that card, then the correct card gains `ART.showRing` (`ANIM.showMe`); tapping it completes the item as solved-with-help (badges and sum still play; no praise pop).
4. **Items 2-12**: per Content/Rules. The object emoji changes per item (apple, cookie, strawberry, carrot in rotation) so the pictures stay fresh without any pedagogical change.
5. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate`; the summary = the twelve solved prompts as `ART.factChip`s (120 × 36, "3 × 4" in 20 px) in three rows of four (y = 330, 376, 422; x = 210 + i × 100), each with a filled `ART.dotFull` at its left for first-try items and a hollow `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  bear:       { kind: "emoji", value: "🐻", size: 64 },
  apple:      { kind: "emoji", value: "🍎", size: 20 },
  cookie:     { kind: "emoji", value: "🍪", size: 20 },
  strawberry: { kind: "emoji", value: "🍓", size: 20 },
  carrot:     { kind: "emoji", value: "🥕", size: 20 },
  factText:   { kind: "text",  value: "", size: 44, font: "display", color: "structure" },        // "3 ×"
  unitPlate:  { kind: "shape", shape: "roundRect", w: 170, h: 64, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 32 },
  card:       { kind: "shape", shape: "roundRect", w: 200, h: 200, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  plate:      { kind: "shape", shape: "roundRect", w: 150, h: 32, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 16 },
  groupBadge: { kind: "shape", shape: "circle", r: 11, fill: "structure" },                       // numeral 14 px display bg; at the plate's left end (x −85)
  itemBadge:  { kind: "shape", shape: "circle", r: 8, fill: "accent" },                          // numeral 11 px display inkOnAccent; above each item on the first plate
  cardTag:    { kind: "text",  value: "", size: 18, font: "body", color: "accent" },              // "4 groups of 3" under a wrongly chosen card
  sumText:    { kind: "text",  value: "", size: 30, font: "display", color: "structure" },        // "4 + 4 + 4 = 12"
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 212, stroke: "structure", strokeWidth: 4, radius: 20 },
  factChip:   { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The unit plate draws its items at 28 px (`draw(scene, key, x, y, { size: 28 })`); cards draw them at the registry size 20 px.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct card (scale kept small — the card is 200 px)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each group / item badge, 250 ms apart (from alpha 0, scale 0.5)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "unit plate, then factText, after a wrong card" },
  nod:       { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bear on a correct card" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "cards, badges and sum clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new prompt and cards (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct card (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ (bear)         3 ×      ( a a a a )   unit plate (440,140)    │  zone A
      │ (60,140)     (250,140)                                        │
      │                   "3 groups of 4" (360,218)                   │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────┐      ┌────────┐      ┌────────┐   cards y=370    │
      │   │ (aaaa) │      │ (aaa)  │      │ (aaa)  │   x=140/360/580  │
      │   │ (aaaa) │      │ (aaa)  │      │ (aaa)  │   (200×200)      │  zone B
      │   │ (aaaa) │      │ (aaa)  │      │ (aaa)  │                  │
      │   │        │      │ (aaa)  │      │        │                  │
      │   └────────┘      └────────┘      └────────┘                  │
480   ├──────────────────────────────────────────────────────────────┤
      │              "4 + 4 + 4 = 12" (360,500)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. `ART.cardTag` is drawn at (card x, 484) under a wrongly chosen card; `ART.sumText` at (360, 500) is used only on a correct tap (never both at once — the tag clears when the item ends).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.bear` (60, 140); `ART.factText` at (250, 140); `ART.unitPlate` at (440, 140) with M items at 28 px, pitch 34, centred (x = 440 − (M − 1) × 17 + i × 34); caption 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 218).
- Cards: `makeTile` 200 × 200 with `ART.card` tokens; P plates at card-local y = −(P − 1) × 19 + p × 38 (p = 0 … P − 1); each plate's M items at 20 px, pitch 26, centred on the plate.
- `ART.groupBadge` at plate-local (−85, 0) with its numeral 14 px `THEME.font.display` `THEME.colour.bg`; `ART.itemBadge` at (item x, plate y − 20) with its numeral 11 px `THEME.colour.inkOnAccent`; `ART.cardTag` at (card x, 484).
- `ART.showRing` behind the correct card. Tap floors 200 ≥ 56; gaps 20.
- Keyboard: Tab across the three cards left to right; Enter taps.

## Content
Language-neutral pictures; the two captions are the only text. Items as (prompt N groups of M; the two distractor cards; the object). Objects map to ART keys: apple = `ART.apple`, cookie = `ART.cookie`, strawberry = `ART.strawberry`, carrot = `ART.carrot`. The swap card (M groups of N) is always present except where N = M; the third card differs in total.
- **L1** (N, M ∈ 2-4, N ≠ M): (3 of 4; 4 of 3, 3 of 3; apple) · (2 of 3; 3 of 2, 2 of 2; cookie) · (4 of 2; 2 of 4, 4 of 4; strawberry) · (3 of 2; 2 of 3, 3 of 3; carrot) · (2 of 4; 4 of 2, 2 of 3; apple) · (4 of 3; 3 of 4, 4 of 4; cookie)
- **L2** (N, M ∈ 2-5): (5 of 2; 2 of 5, 5 of 3; strawberry) · (3 of 5; 5 of 3, 3 of 4; carrot) · (2 of 5; 5 of 2, 2 of 4; apple) · (4 of 5; 5 of 4, 4 of 4; cookie) · (5 of 3; 3 of 5, 5 of 4; strawberry) · (5 of 4; 4 of 5, 5 of 5; carrot)
- **L3** (× 1, one group, equal factors): (3 of 1; 1 of 3, 3 of 2; apple) · (1 of 4; 4 of 1, 2 of 2; cookie) · (4 of 4; 4 of 3, 3 of 4; strawberry) · (2 of 1; 1 of 2, 2 of 2; carrot) · (5 of 1; 1 of 5, 5 of 2; apple) · (1 of 5; 5 of 1, 1 of 4; cookie) · (3 of 3; 3 of 2, 2 of 3; strawberry)

Play list of 12 per Rules with re-queue (a first-try miss re-enters after 2 intervening items, F-41); shuffle within level, levels in order; card order shuffled per item; the correct card never in the same slot twice running.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or non-first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, group badges 1 … N with `tone("tap", k)` while the repeated addition writes itself, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], bear `ANIM.nod`, rail dot, next item after 1000 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`; cards disabled during the enactment):
  - The swap card (M groups of N): group badges count its plates, item badges count its first plate, `ART.cardTag` names it, the prompt's unit plate and "N ×" pulse in turn.
  - The other distractor (a different total): the same labelling with that card's numbers.
  - By-total choosing / plates not counted: covered by the same enactment — the plates are counted before anything else.
- Retry behaviour: attempt 1 → attempt 2 after the labelling → attempt 3 with the show-me ring on the correct card; solved-with-help; the item re-queues later. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Groups Picture"; `groupsOf` = "{a} groups of {b}" ({a} and {b} are replaced by numerals at runtime; the translation keeps both placeholders). Used for the caption and for `ART.cardTag`.

## Sound
`tone("tap", k)` per group badge and per item badge (pitch rises with the count); `tone("correct")` on a correct card; `tone("nudge")` on a wrong card; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("3 groups of 4" caption and card tags, Question x of y, All done, Play again, Menu and praise change with the picker).
- [ ] Works at narrow width (400-px iframe: prompt, unit plate and all three 200-px cards visible and separate; items on a five-plate card legible).
- [ ] Keyboard operable (Tab across the three cards; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The prompt shows "3 ×" beside a plate holding four objects, and the caption reads "3 groups of 4".
- [ ] Exactly one card shows three plates of four; another shows four plates of three; the third has a different total.
- [ ] Tapping the four-plates-of-three card wiggles it, numbers its plates 1-4 down the left, numbers the three objects on its top plate, writes "4 groups of 3" beneath it, then the prompt's plate and "3 ×" pulse.
- [ ] Tapping the correct card numbers its plates 1-3 while "4 + 4 + 4 = 12" writes itself at the bottom.
- [ ] A second wrong tap puts a pulsing ring on the correct card.
- [ ] At level 3 a prompt "3 × [plate of 1]" and "1 × [plate of 5]" appear and are judged correctly.
- [ ] A missed item comes back two items later; the correct card is never in the same position twice running.
- [ ] Two first-try corrects in a row bring five-plate cards; a wrong tap brings smaller numbers next.
- [ ] The finish screen lists the twelve prompts as "3 × 4" chips with filled or hollow dots; no score, no time.
- [ ] With `?sound=off` nothing is audible.
