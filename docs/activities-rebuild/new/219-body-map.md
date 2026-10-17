# New 219 — The Body Map (health: parts of the body)

## 0. Identity
- id `body-map.play.body-parts` · grade K · framework HEALTH (body parts; `alignment.framework: 'HEALTH'`) · strand Health & Safety (STRAND_NAMES row ×11 if new) · files `body-map-core.js`, `body-map-activity.js`, `body-map-activity.html`, `body-map-activities.json` (scaffold `--num=219`).
- Worksheets covered: K-354 Parts of the Body + G1-356 Write the Word (Label mode, body figure; word tags at "words") · K-344 This Is Me: Label the Face (Label mode, face figure) · K-363 Which Come in Twos? + K-360 How Many? (Twos mode) · K-362 What Is Missing? (Hidden mode) · K-361 Color by Legend: its teaching point (find the named part on the figure) is the Label mode; the colouring itself stays on paper.
- Merged: grade-1 "The Body Tag Figure" — its tag strings ARE this design's pin threads, and its word tags are the "words" setting. Its "assemble the figure from parts" builder is NOT kept: the library part pictures are drawn at different scales and angles and do not assemble into an honest figure (a hand-drawn body would break rule 5).

## 1. The pitch
"Every pin on the doll hides a magnifying lens — drop a label on the wrong pin and the lens shows you what part it really is."

## 2. Why a child will want it again
The doll stands big in the middle like a friend, with little brass pins on her body. Drag a label (a picture of a hand, a foot, an ear) towards her: near the right pin it pins itself with a *pip*, a red thread draws from the label to the pin, and a round **magnifying lens** pops up on the thread showing that very part of the doll, big — her own hand, magnified. Drop it on the wrong pin and the lens there opens instead and shows the truth (a big foot under the "hand" label) before the label swings back to the rail. When every label is pinned the doll does a little hop and all the lenses wink one after another down her body. In Twos mode, putting a "2" on one hand makes the other hand's lens open on the other side — "there's another one!". In Hidden mode a yellow sticky note covers a part; when the right picture is chosen the note peels off with a curl.

## 3. The skill and the misconception
- **Skill:** name and find the parts of the body and face; know how many of each we have (1, 2, 10) and which come in twos; recognise a missing part.
- **Misconceptions and how the lenses push back:**
  1. *Mixing up neighbour parts* (hand/arm, foot/leg, elbow/knee, ear/eye in the face) — a wrong drop opens the lens of the pin it landed on, magnifying the doll's own part, so the child sees "this is a foot, not a hand" from the picture itself, not from a message.
  2. *Not realising most parts come in left–right pairs* — Twos mode: a "2" on one part lights its partner across the body (the second lens opens on the far side); a "2" on the nose sends a ring searching the face for a partner, which finds none and fades.
  3. *Fingers vs hand* (10 vs 2) — the count chips 1 / 2 / 10 must be dropped on the part: a "10" on "hand" makes the lens zoom from the hand to its fingers and back to the one hand.
  4. *Left/right labels* — not taught here; both sides of a pair are accepted for a label (left/right is #211's job).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 460 × 460):
- **The figure** (centre-left, 300 px tall = 65 % of the stage): **body figure** = toys/doll (front-facing, full body, arms out, legs apart — seen on the contact sheet); **face figure** = body-parts/head (a big friendly head with both ears, eyes, nose, mouth and hair clearly apart — seen on the contact sheet). The face figure is used for all face parts because on the doll the eyes, nose and mouth sit within 70 px of each other and their pins would overlap.
- **Pins:** 14 px brass discs with a 2 px ink ring at hand-set coordinates (measured once on each picture, stored as fractions):
  - doll: head (crown) · arm ×2 (the sleeve-to-hand stretch) · hand ×2 · leg ×2 (below the shorts) · foot ×2 (the red shoes). **Critic, contact sheet 2026-10-17:** toys/doll is a chibi doll (head ≈ 40 % of her height, short sleeved arms held out, short legs) — her elbows, knees, shoulders and neck are NOT visible, so NO joint pin goes on the doll (§12 BLOCKED).
  - face (body-parts/head — a boy's head, front view): eye ×2 · ear ×2 (both ears clearly at the sides) · nose · mouth · words-only: hair, chin, cheek ×2 (the red cheeks are drawn). No eyebrow pin (the picture has no clear eyebrows).
  - **Drop targets are nearest-pin cells, not fixed circles.** On the face the nose and mouth sit ≈ 28 px apart at 280 px, so two 48 px circles would overlap. Each pin owns its nearest-pin (Voronoi) cell clipped to a 48 px radius, and while a label is carried the pin it WOULD land on shows a ring (hover preview), so the child sees the target before letting go. Gate: every cell ≥ 30 px across at 320, the preview ring always matches the landing pin, and on the doll (parts far apart) every cell is a full 48 px circle.
  - At 360 the face figure in face rounds is 280 px tall (the rail drops under it), not 240.
- **The label rail** (right of the figure at 704, 120 px wide; under the figure below 700): 4 label cards, each 96 px: a library part picture (pictures setting) or the word (words setting) on a cream tag with a hole and a loose thread end.
- **Lenses:** a 72 px circle with a 4 px brass rim; the inside is the same figure picture scaled 3× and positioned so the pin's point is centred (CSS background crop — the doll's own pixels, nothing drawn).
- **Count chips** (Twos mode): round wooden chips 64 px with numerals 1, 2, 10 (and 5 as a distractor at round 6).
- **Sticky note** (Hidden mode): a yellow square 88 px, slightly rotated, with a curled corner — apparatus.

**At 360 px:** figure 240 px tall (stage 336 × 380), pins hit 44–48 px, rail of 4 labels as a row of 76 px cards under the figure, lenses 60 px, chips 56 px. At 320: figure 220 px, labels 70 px.

Library pictures (in `mini tools/pictures`): toys/doll, body-parts/head, and as labels body-parts/ eye, ear, nose, mouth, hand, foot, arm, leg, head, finger. Seen on the contact sheet: all clean single parts. Refused as labels: body-parts/face (overlaps head/face figure), nail, tooth (not visible on either figure), brain, heart (inside parts — another topic). Words-only parts (knee, elbow, shoulder, neck, hair, chin, eyebrow, cheek) have art in the cache but no lcs label — their words come from the reviewed K-354 / K-344 banks (`scripts/worksheet-gen/data/b4/locales/human-body.<loc>.json`).

**Task line** (≤ 24 px): Label "Pin each label on the doll." / "Pin each label on the face." · Twos "Tap every part we have two of." / "How many {part} do you have? Put the number on it." · Hidden "A note is hiding a part. Which part is it?"

No words on the apparatus (in "words" setting the words ARE the content).

## 5. The hand
- **Drag a label** (pointerdown): it lifts 6 px, its loose thread trails behind it.
- **Near its own pin** (within 40 px at release, or while hovering within 28 px): it pins itself — the label flies to a free spot beside the figure on the same side as the pin (layout slots), the thread draws from label to pin (200 ms, slight sag), the pin fills coral, and the lens pops up on the thread's middle (scale 0 → 1, 180 ms, a soft "pip"). Pairs: either pin of the pair accepts it.
- **Wrong pin:** the label settles on that pin for 600 ms and THAT pin's lens opens showing its real part; then the label swings back to the rail on its thread (300 ms). A wrong drop is never a visible mark; it is only counted per label for the help ladder (§7).
- **Drop in empty space:** the label slides back to the rail, nothing else.
- **Tap a pinned lens:** it opens/closes (free play; the doll's part magnified).
- **Twos — tap a part (tap rounds):** a pair part lights BOTH pins with rings (the far one 150 ms later, a little "ting-ting"); a single part shows one ring that stays alone. Tap again to clear.
- **Twos — drop a chip (count rounds):** the chip settles on the glowing pin; a right chip stays (and for "2" both partners ring, for "10" the lens zooms onto the fingers and ten tiny dots tick round them).
- **Hidden — tap one of 3 part pictures** under the figure: it lifts; Check reveals.
- **Undo:** a pinned label can be dragged back to the rail before Check.
- **Free play:** after a round, any pin can be tapped to open its lens.
- Sound (optional): pip on pinning, ting-ting for a pair, paper rustle for the note; TTS speaks a label's word on tap and the celebration.

## 6. The rounds
**Label mode** (4 labels per round; tray order shuffled per pass):
| # | figure | labels (pictures setting) | words setting swaps in |
|---|---|---|---|
| 1 | doll | head, hand, foot, leg | (same parts as words) |
| 2 | face | eye, ear, nose, mouth | hair for ear |
| 3 | doll | arm, leg, hand, head | (same parts as words) |
| 4 | face | mouth, eye, ear, nose | chin for mouth |
| 5 | doll | foot, arm, head, hand | (same parts as words) |
| 6 | face | nose, mouth, eye, ear | cheek for eye |
| 7 | doll | leg, foot, arm, head | (same parts as words) |
| 8 | face | ear, nose, mouth, eye | hair for nose |
| 9 | doll | hand, leg, arm, foot | (same parts as words) |
Body parts used: limbs (arm, hand, leg, foot) and head on the doll; face parts on the face. The words setting (the grade-1 Body Tag Figure) puts the WORD on every tag and adds hair, chin and cheek on the face. The joints (knee, elbow, shoulder, neck) wait for a figure that shows them (§12 BLOCKED) — when that figure lands, doll rounds 1/3/5/7/9 swap in knee, elbow, shoulder, neck, knee+elbow, as first designed.

**Twos mode** (tap rounds and count rounds):
| # | figure | kind | content | answer |
|---|---|---|---|---|
| 1 | doll | tap the twos | pins: head, hand, foot, arm, leg | hand, foot, arm, leg |
| 2 | face | count | nose | 1 |
| 3 | doll | count | hand | 2 |
| 4 | doll | count | finger — two library hands (body-parts/hand and its mirror, 120 px each, five clear fingers) slide in beside the doll and the chip goes on the pair; the doll's own mitten-small hands do not show ten fingers | 10 |
| 5 | face | count | ear | 2 |
| 6 | doll | count | head (chips 1, 2, 5, 10) | 1 |
| 7 | doll | count | foot | 2 |
| 8 | face | count | mouth | 1 |
| 9 | face | tap the twos | pins: eye, ear, nose, mouth | eye, ear |
Chips 1 / 2 / 10 (round 6 adds 5); count answers 1 ×3, 2 ×3, 10 ×1. Never 0.

**Hidden mode** (one part covered by the note; 3 picture choices under the figure, correct slot L/M/R):
| # | figure | covered | choices | correct slot |
|---|---|---|---|---|
| 1 | doll | one foot | foot, hand, ear | L |
| 2 | face | nose | eye, nose, mouth | M |
| 3 | doll | one hand | foot, nose, hand | R |
| 4 | face | one ear | ear, eye, hand | L |
| 5 | doll | one leg | arm, leg, foot | M |
| 6 | face | mouth | nose, ear, mouth | R |
| 7 | doll | one arm | arm, leg, hand | L |
| 8 | face | one eye | ear, eye, nose | M |
| 9 | doll | head | foot, hand, head | R |
(A covered pair part can be found by looking at its partner — that IS the twos idea, said in the miss hint.)

- **Answer position:** Label — tray order is a seeded per-pass shuffle; the gate measures each label's tray slot uniform within ±5 % over 1,000 passes. Hidden — correct slot L 3 / M 3 / R 3 per pass (the table above, reshuffled with its round). Twos count — chips always in numeral order (1, 2, 10), so position = value.
- **Order:** order-only reshuffle per pass (`nextTask`), pass 2 ≠ pass 1.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: Label "Drag a label to its part on the {figure}." · Twos "Tap a part we have two of." / "Pick up a number and put it on the glowing part." · Hidden "Tap the part you think is under the note."
- **Label — miss 1** (Check with an unpinned label, or after 2 wrong drops of the same label): the unpinned label's own lens floats beside it showing a magnified example of its part (the doll's/face's own region, so it matches) · hint "Look at the big picture in the lens. Find that part on the {figure}."
- **Label — miss 2:** that label's pin(s) pulse twice · hint "The glowing pin is waiting for this label."
- **Twos tap — miss 1** (a single part lit, or a pair part missed): every lit single part shows its lone ring wobbling; missed pairs stay dark · hint "Do we have two of each one you lit? Look at the other side."
- **Twos tap — miss 2:** each pair's two pins briefly flash together · hint "Parts that come in twos have one on each side."
- **Twos count — miss 1** (wrong chip): "2" on a single part → a ring searches the other side and finds nothing; "1" on a pair part → the partner lens opens on the other side; "1"/"2" on fingers → the lens zooms on the fingers · hint "Count on your own body too!"
- **Twos count — miss 2:** small dots tick round the part one by one (1, or 2 across both sides, or 10 round the fingers) · hint "Count the dots."
- **Hidden — miss 1:** the note lifts at one corner to show a sliver (5 %); for a pair part the partner on the other side gets a ring · hint "Peek under the corner. Is there another one on the other side?"
- **Hidden — miss 2:** the note turns half see-through · hint "Look through the note."
- A new move takes the help away until the next Check.
- **Success:** the doll (or face) does a little hop; every lens winks in order head to toe; in Hidden mode the note peels off with a curl and falls away. Bubble: Label "Every part has its label: {list}." · Twos tap "We have two {list}." · Twos count "Yes! You have {n} {part}." · Hidden "Yes — the note was hiding the {part}."

## 8. Settings
1. **Mode:** label it / one or two? / what is hidden? — the board at rest: labels on the rail · count chips · a sticky note on the figure.
2. **Labels:** pictures / words — label cards change from part pictures to words (and the words setting swaps in the joints and small face parts).

## 9. Words (EN source)
- title "The Body Map" · instruction "Drag each label to its part of the body. The lens shows you the part up close."
- prompts: promptLabelDoll "Pin each label on the doll." · promptLabelFace "Pin each label on the face." · promptTwos "Tap every part we have two of." · promptCount "How many {part} do you have? Put the number on it." · promptHidden "A note is hiding a part. Which part is it?"
- hints (§7, nine strings): hintStartLabel · hintLens · hintPin · hintTwosStart · hintCountStart · hintHiddenStart · hintTwos1 · hintTwos2 · hintCount1 "Count on your own body too!" · hintCount2 "Count the dots." · hintHidden1 · hintHidden2.
- celebrations: celebrateLabel "Every part has its label!" · celebrateTwos "We have two of each of these." · celebrateCount "Yes! You have {n} {partPlural}." / "Yes! You have 1 {part}." · celebrateHidden "Yes — the note was hiding the {part}."
- settings: setMode "Mode" · modeLabel "Label it" · modeTwos "One or two?" · modeHidden "What is hidden?" · setLabels "Labels" · labelsPictures "Pictures" · labelsWords "Words".
- aria: pin "{part} pin" · label "Label: {part}" · lens "Close-up of the {part}".
- Part words: picture parts from `image-vocabulary.js` (singular + plural in every locale); words-only parts from the K-354 / K-344 banks (all 11 locales present, reviewed). Count sentences use the plural with n = 2 / 10 and the singular with 1: fi partitive after numerals ("kaksi kättä", "kymmenen sormea"), so each {n}{part} phrase is stored whole per part per locale.
- **Locale traps:** pt *mão* plural *mãos*, fr *œil / yeux* (irregular), it *orecchio / orecchie* (gender change), *braccio / braccia*, *dito / dita* (irregular feminine plurals), de *Auge / Augen* fine, nl *oog / ogen*; the doll's "hair" is uncountable (no count round uses hair); "finger" vs "toe": many languages say "fingers of the foot" (es *dedos de los pies*, it *dita dei piedi*, pt *dedos do pé*, fi *varpaat* is separate) — toes are deliberately not in any round. Thumb counted as a finger in all 11 (10 fingers) — reviewer confirms (de *Finger* includes *Daumen* for counting purposes in Grundschule). "Doll" in the prompt: fi *nukke*, sv *docka*, da/no *dukke*.

## 10. Sound off, access, phones
- Legible with sound off: the lens shows the truth visually; pair rings, chip dots and the peeling note are visual.
- Keyboard: Tab to a label, Enter picks it up; Tab/arrow keys move between pins (focus ring), Enter drops. Twos: Tab between pins, Enter taps; chips by number keys 1, 2, 0 (for 10). Hidden: arrow keys over the 3 choices.
- aria-live announces each pinning ("Hand pinned on the hand") and each wrong drop ("That pin is the foot").
- Taps: pin hit zones ≥ 44 px at 320 (overlap forbidden by the gate), labels ≥ 70 px, chips ≥ 56 px.
- Pictures: figure 300 px at 704 / 240 at 360; labels 96 / 76 px (≥ 64).
- Check above the fold: at 360 — header 56, task 52, figure 240, rail 84 → Check ≈ 450 px; at 320 ≈ 430 px.

## 11. Distinct from
- Planned #232 Sense Face (the five senses) and #246 Face Dial (emotions) use faces for other skills; this one names and counts parts.
- `picture-word-wall` tool shows word cards; it does not label a figure.
- Registry: no counting table/peek window mechanic; the lens-that-shows-the-truth pin is new.

## 12. Build plan
- **Core state** `{mode, labelsMode, roundIdx, figure:'doll'|'face', pins:[{part, x, y, side}], tray:[part…], pinned:{part:pinId}, chips, chosen, wrongDrops:{part:n}, help}`. Functions: `nearestPin(point)` (within release radius), `drop(label, point)` → pinned | wrong(pinPart) | none, `tap(pinId)`, `dropChip(n, pinId)`, `choose(slot)`, `check()`, `helpLevel()`, `hintKey()`, `layout(width)`, `pinsFor(figure, width)`.
- **Gate's own truth (verify):** pin coordinate table per picture; at 320/360/704 every pin's hit circle ≥ 44 px and no two different-part hit circles overlap; every label in every round has ≥ 1 pin on its figure; each pair part has exactly 2 pins, single parts 1; count answers from an independent table (nose 1, mouth 1, head 1, eye/ear/hand/foot/arm/leg 2, finger 10); hidden-mode correct slot tally L3/M3/R3; tray slot uniformity ±5 %; no 0 anywhere; every picture key exists in `mini tools/pictures`; every words-only part has a word in all 11 bank files.
- **Mutations:** label accepted at the wrong pin · only one side of a pair accepts its label · "2" accepted on the nose · "1" accepted on a hand · lens shows the dropped label's part instead of the pin's part · partner not lit in tap rounds · single part lights a partner · tray not shuffled · hidden correct slot always M · help kept after a new move · Check with nothing counts a miss · face part pinned on the doll.
- **Pictures to verify on a contact sheet:** toys/doll (pins: crown, upper arms, hands, thighs, feet, knees below the shorts, elbows, shoulders, neck — each confirmed visible; the doll's ears are under her pigtails → ear is a FACE-figure part only), body-parts/head (eyes, ears, nose, mouth, hair, chin, eyebrows, cheeks visible), labels eye, ear, nose, mouth, hand, foot, arm, leg, head, finger.
- **BLOCKED (part, decided on the contact sheet):** the JOINT words (knee, elbow, shoulder, neck — in the K-354 bank and the grade-1 Body Tag Figure) need a front-facing full-body child with visible elbows and knees. The cache holds one (occupations/coach: front view, short sleeves, shorts) but it has no lcs-pictures label. The body-parts cache pictures of elbow/knee/shoulder/neck carry red teaching arrows and are not labelled either. **Fallback, ships now:** the doll with head, arm, hand, leg and foot; the face with eye, ear, nose, mouth, hair, chin and cheek. Every mode and worksheet works except the four joint words. Add "occupations/coach → lcs label 'child' ×11" to `new/ART-NEEDS.md`. The doll's ears really are under her pigtails, so ear lives on the face figure only.

## 13. The four questions
1. **Would a child choose it again?** Yes — a big friendly doll, labels that pin themselves with threads, and magnifying lenses that pop up and show her own hand, foot or ear up close.
2. **Would a teacher put it on the board?** Yes — labelling, counting (1, 2, 10) and twos are the K body-parts worksheets; a wrong drop teaches by showing the real part, and twos light up across the body.
3. **Would a parent trust it?** Library doll and part pictures, no drawn bodies, calm, no score or timer.
4. **The invention:** pins that hide magnifying lenses of the doll's own body — every drop, right or wrong, shows the part up close.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→4 (joint words BLOCKED; everything else is real)
What changed:
- **Reality:** I opened the contact sheets. toys/doll is a chibi doll, and her elbows, knees, shoulders and neck cannot be seen. The words-setting swaps (knee, elbow, shoulder, neck) would have pinned labels to nothing. Removed them from the doll and marked them BLOCKED, with the exact art they need (label occupations/coach). The face figure keeps hair, chin and cheek, which ARE drawn. Eyebrow is dropped because the head picture has no clear brows.
- **Correctness / phones:** on the face figure the nose and mouth are about 28 px apart, so the rule "no two 48 px hit circles may overlap" could never pass. Drop targets are now nearest-pin cells with a hover preview ring on the landing pin, and the gate asserts it. The face figure grows to 280 px at 360 in face rounds.
- Twos round 4 ("10 fingers") pinned to the doll's tiny mitten hands, which do not show ten fingers. Two library hands with five clear fingers each now slide in for that round.
- Kept: the lens-that-shows-the-truth. Every miss shows the part, which is the best invention in the batch.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
