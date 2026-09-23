# K-380 `healthy-habits` : editor-critic record (2026-09-23)

Inputs: `_work/K-380-pedagogy.md`, `_work/K-380-design-A.md` ("the washroom hooks"), `_work/K-380-design-B.md` ("the sink sign"), `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md`, `_BUILD-BRIEF.md`, `_work/_selection-*.md`, `_records/harvest-candidates.<loc>.json` + `_records/v2/` ×11, the lead's binding rulings. Output: `../K-380-healthy-habits.md`. Scratch: `K-380-w.js` (chip / label widths via `primitives/bankword-width.js`), `K-380-harv.js` (harvest extraction), `K-380-critic-pics.png` (editor contact sheet). No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base: drawn habit (left) + LIBRARY object column (right); all-drawn only as a fallback | A and B: 0 library pictures on all six faces | **all-drawn** (lead ruling; one art source per page) | lock ruling 4; soap and towel do not exist in the library; the tissue box wears a medical cross (#2) |
| 2 | `hospital/tissue` opened and ACCEPTED as "tissue box" | A, B: pink box with a RED MEDICAL CROSS, reads "first aid" | **refused**; editor opened it (contact sheet): the cross is there | a picture children name differently (nt10-E class); the pedagogy's acceptance is withdrawn |
| 3 | base `.ws-match` 5 rows | A: hooks (rail over a shelf, vertical lines); B: circles-to-squares `.ws-match` | **A's hooks**, with B's print rules and 1-bit gate | the washroom hook row is the image K children own in all 11 countries; one apparatus, generous line zone; A's pictogram is larger than B's once re-measured (#4) |
| 4 | - | A: plaque 116 wide holding a pictogram "h 124" | **pictogram 104** | the unit box is square, so a 124 px pictogram is 124 wide and cannot sit in a 116 plaque; 104 keeps 6 px margins and still beats B's 96 and the pedagogy's 88 |
| 5 | base cue marks: bubbles for brush-teeth, drops for wash-hands | A: soap tool drawn "with 3 bubbles", brush pose with foam bubbles; B: soap tile with bubbles | **no bubbles on any tool; brushing cue = scrub arcs** | a shared mark between a habit and a NON-matching tool is a lexical tell in pictures: the brushing child's foam would pull the line to the bubbly soap; gated as the shared-mark rule |
| 6 | "never together" `brush-teeth` + `drink-water` | B: if blow-nose fails the human read, swap it for `drink ↔ cup` | **swap to `sun-protect ↔ hat`**, never drink | B's fallback breaks the pedagogy's rule (two hands-at-mouth poses on one page) |
| 7 | brushing: phases before / while / after, 8 cards into 3 word bins by lines | A: 4 numbered mirrors (write 1-4); B: cut-and-glue strip with arrows (an order) | **phases**, never numbered (lead ruling); **phase CHIPS under each card, circle one**, not lines into bins | the lead's ruling; eight lines converging on three bins cross the lower row (the K-369 F4 precedent); identical chip order in every cell carries no position cue |
| 8 | "while" as the middle phase | - | en chip **"during"** | a bare chip "while" is not a word a child reads alone; the concept is the lead's, the literal is ours |
| 9 | `rinse-brush` = brush under the tap, no mouth (B: "no foam") | - | **foam must fall off the bristles** | a foam-free brush under a tap is also "wet the brush first", a contested BEFORE step: two right answers across phases |
| 10 | `take-brush` (hand lifting brush from cup) BEFORE vs `brush-in-cup` AFTER | - | **`take-brush` dropped; `open-tube` added** | two cards sharing brush + cup across phases, told apart only by an arrow; confusables are only safe WITHIN a phase (two tube cards, both before) |
| 11 | F3 pairs incl. `nose` (tissue vs sleeve wipe) | A: sleeve wipe REJECTED (same silhouette as the elbow cough); B: adds toilet and wash-before-eating pairs | **cough, tissue, cup, soap** (4 rows); toilet = d3 reserve; sleeve wipe and eating REJECTED | A is right: one pose, two opposite verdicts; the eating pair puts food (a table, a plate) on the page, against the lead's no-food ruling |
| 12 | F3 5 rows at d2 | A, B: 4 rows | **4 rows, pictogram 124** | legibility of `cough-elbow` at size was the lead's named risk; 5 rows force ~110 px; 4 rows allow an exact 2 / 2 balance |
| 13 | F4 d2 includes `cough-elbow`; wash-hands reason "Soap and water take germs off" | A: sun instead of cough, hand reason "before we eat"; B: sun | **sun-protect replaces cough; reasons rewritten** | two germ reasons on one page fit both habits (two right answers); "soap" names the drawn tool (a fact names its column); "before we eat" is a food word |
| 14 | F4 layout ~300 px pills | A: plaques 132 + cards 380 | **plaques 120 + cards 330** | A's widths leave 51 px of line between the dots (615 - 512 - 52), too short to draw at G2; 113 px after the fix |
| 15 | F5: tick boxes + short label literal per row | A: tick squares, pictogram-only rows, an own-habit row at d2; B: colour a star per day | **tick squares 44, labels on, own row at d3 only** | a star is a reward economy (A's own passport argument); labels help the adult reading the chart; a 64 px own-habit frame is too small to draw in at d2 |
| 16 | F5 day order "en/pt/es week starts Sunday" | A: "en/pt Sunday, 9 locales Monday" | **A is right** (m: es `weekStart` 1) | measured `data/b2/calendar.js`; es-MX may want Sunday: `weekStartOverride` is a panel field, never an edit of the shared calendar |
| 17 | new strand row `'Health'` proposed (open) | A, B silent | **NEW additive `'Health'` row** via the draft's `strandNames` | `'Science'` renders da "Natur/teknologi" (m), which does not carry DK health teaching; `apply-b6-locale.js` + `validate-b6-draft.js strandNames` support it (the nt10-E precedent) |
| 18 | tissue bin via `bin.js fill:'none'` | B: bin.js rejected (lid colour = recycling class), draws its own | **reuse `bin.js` `fill:'none'` `colour:'teal'`** | reuse before drawing; m: `fill:'none'` draws every part white with NO mark, so no class shows |
| 19 | - | B: a dashed "slot ring" marks where the missing tool goes | **not used** | an abstract dashed circle reads as a ball or an answer circle to a five-year-old; A's context cues (tap and water, scrub arcs, tufts, burst, moon) carry the situation |
| 20 | sleep: no "Zzz letters" | A: "zz" drawn zigzags | **no Z mark; moon + 2 stars + blanket** | a drawn zigzag IS the letter shape; three redundant non-letter cues serve the lead's sleep-legibility concern |
| 21 | F1 steps: 120 px pictograms, K-374 layout | A: rail cards with hand close-ups; B: sink-band close-ups with a state vector | **B's close-ups and state vector, A's plaque** | the state vector (tap · bubbles · soap · towel) makes every card mechanically distinct and gateable; wet vs rinse differ only by falling bubbles, which is the teaching point |
| 22 | F1 `blankNumeralBox` ≥ 56 | B: 64 x 52 | **64 x 60** | the K minimum element is 56 px; 52 is under it |
| 23 | fi F1 title "Käsienpesu vaihe vaiheelta" | - | **"Käsienpesuohje lapsille"** (measured query) | "vaihe vaiheelta" = step by step, the K-374 family the lead banned |
| 24 | bands: F2 G1 | A: brushing K | **G1** | the move reads three phase words per card |

## 2 Claims removed or downgraded as unverified

- Pedagogy: "`hospital/tissue` (o, tissue box)" accepted: withdrawn (medical cross, opened by A, B, editor).
- Pedagogy: "en/pt/es week starts Sunday `0`": wrong for es (m: 1).
- Pedagogy: "`tools/validate-b6-draft.js` … `check-b6-string-parity.js` (exist, m)": confirmed exist (m); kept.
- A: "plaque 116 x 170, pictogram h 124": impossible geometry (square unit box); replaced (#4).
- A: "5 x 108 + 4 x 12 = 588" F5 reasons with 132 + 380 columns: the height is right, the line zone is not (#14).
- A / B / pedagogy: every "*est.*" F2 / F4 / F5 text width: replaced where it matters by Nunito 800 advance measurements (§3); line counts stay *est.* until the real render.
- B: "`bin.js` lid colour carries a recycling class": true for `fill:'lid'`, false for `fill:'none'` (m).
- B: F2 cards "200 x 262 with a 64 x 52 box": the box is under the K floor (#22).
- Pedagogy: F2 "no mouth-rinse card kind exists in the bank" kept, and extended: no foam-free brush under a tap (#9).
- Pedagogy F4 reason literals: two withdrawn (#13); the remaining ones rewritten as EN SOURCE TO AUDIT.
- All three: "the pose reads as the habit". Downgraded to a named, mandatory human read at 104 px and on a 50 % greyscale print; the 1-bit gate measures confusability, not recognition.

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | re-measured (m) | won |
|---|---|---|---|---|---|
| base stack | - | 534 (plaque 170) | 648 | 208 + 160 + 146 = **514** ≤ 677 | editor (A's shape) |
| base pictogram | 88 | 124 (does not fit 116) | 96 | **104** in a 116 plaque | editor |
| F1 stack | - | 564 | 554 | 2 x 268 + 30 = **566** (box 64 x 60) | B + floor fix |
| F2 chips | - | - | - | worst en/de/es/pt/fr/it/nl/sv/da/no chip ≤ 70.6 px; fi "harjaamisen jälkeen" **169.7 px** > 152 box; "jälkeen" 61.3 | editor (chip 184, text 152) |
| F2 stack | ~483 *est.* (bins) | 628 (mirrors) | 498 (glue) | 4 x 136 + 3 x 14 = **586** | editor |
| F3 stack | - | 648 (rails) | 650 | 4 x 140 + 3 x 20 = **620** | editor (no rails) |
| F4 line zone | - | 51 px | 133 | **113 px** (120 + 330 cols) | editor |
| F5 width / height | 598 *est.* | 608 / 640 | 638 / 540 | **638 / 520** (176 head + 7 x 66) | editor |
| F5 labels (Nunito 800 16) | - | - | - | longest measured "se brosser les dents" 151.1, "escovar os dentes" 134.6: 2 lines in 96 *est.* | open to the render |
| `weekStart` | es 0 | en/pt 0, rest 1 | - | en 0, pt 0, all others 1 | A |
| taxonomy `exercise-type` keys | 135 | - | - | **140** (b6 registered EN) | measured |
| rail slugs ×11 | - | - | - | 0 collisions with any `axes.*` slug | measured |
| K-374 live titles | listed | - | - | en/de/es/fr/it/nl/sv/da/no/fi confirmed in `seo-landing/<loc>.json`; it adds "i passi in ordine" | measured |

## 4 OPEN items

1. **Human read of every pose** (104 px base, 124 px F3, 104 px F2 cards) on screen and on a 50 % greyscale print, by the builder and the pedagogue, before the bank freezes; the d2 contingency (`blow-nose` → `sun-protect ↔ hat`) is data.
2. `'Health'` strand literals ×11 (proposed in §1 table B), confirmed by each panel.
3. es-MX `weekStartOverride` (the shared calendar says Monday).
4. da `coughPhrase` "ærmet" vs "albuen"; every locale's germ word.
5. fi phase chips (short forms that fit 152 px and read naturally at 1. luokka).
6. de `kaiOrder:true` (default) ships only at d3; no other locale may set it without a national source.
7. F5 label line counts in the real render (Nunito 800 16 in 96 px).

## 5 Quality verdict

Would I print this for my kindergarten and grade-1 classes? Yes, and I would pin two of the faces above the sink: the hand-washing plates and the phase chips are the posters I currently buy. What made the merge worth doing is that each input carried one defect I would have been embarrassed to hand out: a tissue box with a red cross that my five-year-olds would call "the doctor box", a soap tile with bubbles sitting beside a child with a foamy mouth so half the class joins them, a brush under a tap that is honestly both "before" and "after", a "wipe it on your sleeve" option drawn in exactly the pose we teach as correct, and a reason card about germs that fits two pictures. All of those are now rules the gate enforces, not hopes. What would still embarrass me is a silhouette that an adult reads and a child does not: a lying figure that looks fallen instead of asleep, two hands at the nose that look like a child crying. No gate can promise that, which is why the human read at size and in greyscale is an OPEN item and not a footnote.
