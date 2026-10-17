# Row 88 — Numbers Court → THE EQUAL-SIGN BEAM (1.OA.D.7)

## 0. Identity
- id `numbers-court.judge-balance.1-oa-d-7` (KEPT; slugs/metadata frozen en..sv; da/no/fi slug, title and intro are new at build, grade 1) · grade 1 · CCSS 1.OA.D.7 · Operations & Algebraic Thinking · own files `sign-beam-core.js`, `sign-beam-activity.js`, `sign-beam-activity.html`, `sign-beam-activities.json` (the row leaves `numbers-court-activities.json`, emptied to `[]`; `judge-balance-core.js` is left untouched for anything else that loads it; the id is unchanged).
- page title (frozen): "Numbers Court — Is the Equation Fair? (Grade 1)". Page intro (frozen) stays true: the child is the Judge, rules each claim TRUE or FALSE on a balance beam where "=" means both sides hold the same amount — not "the answer comes next" — then proves it and sometimes makes it fair. The beam here is literally the equal sign.
- worksheets covered: **G1-208** Mental Math to 20 · **G1-214** Mental Math to 10 · **G1-216** Addition Practice to 20 · **G1-217** Subtraction Practice to 20 · **G1-428** Subtraction Maze within 20 (every claim is a mental fact on each side) · **G3-350** Make It Balance (mode "Make it balance": find the missing number with an operation on both sides).
- old activity: Judge Tess (a hand-drawn SVG tortoise in a wig — removed: no hand-drawn characters), a generated pool of 12 claims (forms: commutative, reversed "7 = 3 + 4", both sides "a + b = c + d", subtraction "c = a − b", canonical capped, equal "a = a"; 40–60 % true), verdict → justify (heavier pan / deposit tokens) → repair on some false claims; beam static until the verdict. **Kept:** the court, the Judge role, the claim forms and their distribution rules (now as fixed tables so the gate can check every round), verdict BEFORE motion (the truth is the reward, never the hint), repair of false claims, the no-directional-leak rule. **Changed:** Tess is the library tortoise (pets/tortoise); witnesses are library animals; the beam IS the "=" sign. **Added:** a "Make it balance" mode (G3-350), the turn-around proof for true claims, a To 20 level.

## 1. The pitch
"The equal sign is the balance itself: its top bar is a fixed level and its bottom bar is the beam — it only lies flat and reads = when both sides hold the same amount; otherwise it tips into a < or > that opens toward the bigger side."

## 2. Why a child will want it again (the fun)
- **The sign comes alive.** The giant "=" in the middle of the courtroom is a real machine. Bang the gavel and the clamp lets go: the lower bar swings, the pans sway, and the sign settles into a perfect "=" — or tips and touches at one end so it suddenly reads ">" or "<". Children gasp the first time the equal sign turns into a different sign.
- **Being the Judge.** A witness (a library animal on the witness stand) makes a claim; the child decides with a big stamp — the "=" stamp or the "≠" stamp — and bangs it down with a satisfying thump. Judge Tess the tortoise (library picture) nods slowly when the court agrees.
- **Fixing the claim.** A false claim gets a second chance: one number on the pans turns into a dial; the child sets it and bangs the gavel again — and watches the tipped sign close back into "=".
- **Free play ("Court practice"):** both pans have dials; build any two sides, bang the gavel, watch the sign; turn the court round.

## 3. The skill and the misconception
- **Skill (1.OA.D.7):** understand the meaning of the equal sign; decide whether equations with addition and subtraction are true or false (6 = 6, 7 = 8 − 1, 5 + 2 = 2 + 5, 4 + 1 = 5 + 2). G3-350 / 1.OA.D.8: find the missing number that makes both sides equal (8 + 4 = □ + 5).
- **Misconception 1 — "=" means "the answer comes next":** children reject "7 = 3 + 4" (the answer is on the wrong side) and accept "6 + 2 = 8 + 1" (because 8 comes after "=") and fill "8 + 4 = □ + 5" with 12. **Push back:** the sign responds only to AMOUNTS on each side: "7 = 3 + 4" lies flat; "6 + 2 = 8 + 1" tips toward the 9; "12 + 5" makes the right pan drop and the sign gapes as "<" toward 17.
- **Misconception 2 — the equal sign is a direction (left to right):** **Push back:** after a true claim the child can turn the court round: the claim reads backwards ("3 + 4 = 7") and the sign stays exactly "=".
- **Misconception 3 — false means "looks wrong":** "5 + 3 = 3 + 5" is ruled false by some (the numbers swapped). **Push back:** the sign lies flat; swapping the parts changes nothing on the pans.

## 4. The stage
Stacked layout at all widths (the beam is wide).

**At 704 px (content 672):**
- **Task line** 22 px: "Is the claim fair? Stamp = or ≠, then bang the gavel."
- **The bench row (top, 640 × 110):** Judge Tess (library pets/tortoise, 96 × 96) at the left on a raised bench strip; the witness (a library animal, 96 × 96) at the right on a stand; between them the **claim card** (cream, 360 × 72) reading the claim in 34 px Baloo 2, e.g. "6 + 2 = 8 + 1".
- **The Equal-Sign Beam (centre, 600 × 330):**
  - **The post:** a brass column 28 px wide rising from a base plate to the sign.
  - **The top bar (fixed):** a brass bar 340 × 26 px, radius 13 — the level.
  - **The bottom bar (the beam):** a teal bar 340 × 26 px, radius 13, pivoting on the post at its centre; at rest 20 px below the top bar, parallel — the two bars read as a giant "=". The top bar is also the beam's stop: tipping, the light end rises until it touches the top bar (max tilt ≈ 6.7°), the heavy end drops — the pair of bars then reads as a wedge: closed at the light end, open (≈ 40 px) at the heavy end — a "<" or ">" opening toward the bigger side.
  - **The court seal (the "clamp" in the rest of this sheet):** a round red wax seal 48 px across, pressed over the pivot between the two bars, holding them parallel until the ruling. It is NOT a pin pulled by Check (that is the Bet Pan's beat, row 209, and the number-balance tool's Hold): the Judge's own stamp is what goes onto the seal, and only a RIGHT ruling can break it. Re-locking (repair, retry) presses a fresh seal on.
  - **The pans:** two shallow trays 190 × 26 hanging 120 px below the beam's ends on two thin strings each; on each pan, the side's numbers as **crates** (56 × 56 px, cream with a teal rim, numeral 30 px) with the operation signs (+ / − 30 px) between them. Pans are the SAME size whatever they hold; crates are the same size whatever their number (weight comes from the numbers, never from how much space they take).
- **The stamps (under the beam):** two round stamps 96 × 96: the "=" stamp (teal, a large "=") and the "≠" stamp (coral, a large "≠"); small chrome labels under them, 16 px: "true" / "false". Positions fixed (= left, ≠ right).
- **The gavel:** the shell's Check, styled as a gavel button ("Bang the gavel"), at the right of the stamps.
- **Dial** (repair and Make it balance): appears in place of the chosen crate: a drum 64 × 56 with − / + buttons (48 × 48) under it.
- **Bubble** under the stamps.

**At 360 px (content 336):** task line 20 px (2 lines) → bench row: Tess 64 px left, claim card 200 × 56 (26 px) centre, witness 64 px right → beam 336 × 250 (bars 220 × 18, gap 14 px, max tilt ≈ 7.3°, pans 150 × 20 hanging 90 px, crates 44 × 44 with 24 px numerals) → stamps 80 × 80 side by side + gavel 120 × 56 in one row → bubble. Gavel bottom ≈ 640 px at 360 × 740; at 320 × 640 crates 40 px, stamps 72 px: ≈ 588 px.

**Pictures (colour themes, verified in JSONs; contact sheets seen):** pets/tortoise (Judge Tess); witnesses, one per round in turn: forest-creatures/fox, raccoon, squirrel, mouse, hedgehog, badger, beaver, owl, rabbit, pets/hamster, pets/parrot, farm-animals/goat. Nothing else is a picture; the beam, pans, crates and stamps are apparatus geometry.
**Words on the apparatus:** none; numerals and + − = ≠ only (the content).

## 5. The hand
- **Stamp:** tap a stamp → it lifts, swings over the claim card and comes down with a thump (200 ms), leaving its ink ("=" or "≠") in the card's corner AND on the court seal over the pivot. Tapping the other stamp re-stamps (ink replaced). No motion of the beam yet.
- **Bang the gavel (Check):** if the verdict is right, the seal cracks in two and its halves drop away (150 ms, a dry "crack"), the beam swings and settles (an under-damped swing of 900 ms: overshoot then rest), the pans sway on their strings. True: the bars come to rest parallel — the "=" glows teal. False: the light end rises to touch the top bar with a soft "tock", the heavy end drops; the wedge glows coral and the bigger pan sinks 30 px.
- **Turn the court round** (after a true claim; a 52 px chip with a two-arrow icon): the whole beam with its pans rotates 180° around the post in 600 ms (a half-turn seen from above — the pans pass behind the post), the claim card rewrites itself backwards ("3 + 4 = 7"), and the sign stays "=".
- **Repair (after a false claim is caught):** the beam swings level and the clamp drops back in; one crate on the pans (marked by the round) cracks open into a dial; the child sets it (1–20) and bangs the gavel again: the clamp releases and the sign settles — "=" if fair, the wedge if not.
- **Make it balance mode:** the claim already has a blank crate (□) with its dial; the beam starts clamped; dial → gavel → release.
- **Free play "Court practice":** every crate is a dial; add or remove crates with + / − chips on each pan (up to 3 crates per side); gavel releases; turn the court round any time.

## 6. The rounds
One round = one claim: stamp → gavel → (if false: repair → gavel). In Make it balance: dial → gavel.

**Mode "True or false" (default), level "To 10" — 12 rounds:**

| # | form | claim | left | right | verdict | repair (false only): crate → answer |
|---|---|---|---|---|---|---|
| 1 | turn-around | 3 + 5 = 5 + 3 | 8 | 8 | true | — |
| 2 | answer first | 7 = 3 + 4 | 7 | 7 | true | — |
| 3 | answer first | 9 = 4 + 4 | 9 | 8 | false | **□** = 4 + 4 → 8 |
| 4 | both sides | 2 + 6 = 5 + 3 | 8 | 8 | true | — |
| 5 | both sides | 4 + 3 = 2 + 6 | 7 | 8 | false | 4 + 3 = 2 + **□** → 5 |
| 6 | subtraction | 5 = 9 − 4 | 5 | 5 | true | — |
| 7 | subtraction | 3 = 8 − 4 | 3 | 4 | false | 3 = **□** − 4 → 7 |
| 8 | answer last | 4 + 2 = 6 | 6 | 6 | true | — |
| 9 | answer-next trap | 6 + 2 = 8 + 1 | 8 | 9 | false | 6 + **□** = 8 + 1 → 3 |
| 10 | same number | 6 = 6 | 6 | 6 | true | — |
| 11 | both sides | 9 − 2 = 3 + 5 | 7 | 8 | false | 9 − 2 = 3 + **□** → 4 |
| 12 | both sides | 10 − 3 = 4 + 3 | 7 | 7 | true | — |

**Level "To 20" — 12 rounds:** 7 + 9 = 9 + 7 (true) · 14 = 6 + 8 (true) · 13 = 7 + 5 (false; repair 13 = 7 + **□** → 6) · 9 + 6 = 8 + 7 (true) · 8 + 4 = 12 + 1 (false, the answer-next trap — the 12 sits right after "="; repair 8 + 4 = **□** + 1 → 11) · 8 = 15 − 7 (true) · 9 = 16 − 8 (false; repair **□** = 16 − 8 → 8) · 9 + 5 = 14 (true) · 18 − 9 = 4 + 5 (true) · 7 + 7 = 20 − 5 (false; repair 7 + 7 = 20 − **□** → 6) · 17 = 10 + 7 (true) · 6 + 9 = 11 + 3 (false; repair 6 + 9 = 11 + **□** → 4).

Distribution (both levels, asserted): 7 true / 5 false (58 % true); "answer last" (the operational form) ≤ 2 of 12; at least one turn-around; subtraction appears in ≥ 3 claims; the false claims are off by exactly 1 (so the decision needs the amounts, not a glance).

**Mode "Make it balance", level "To 10" — 8 rounds** (critic: the Numbers setting had no To-10 set for this mode; every side ≤ 10, the blank never 0):
3 + 4 = **□** + 5 → 2 · 6 + 2 = 5 + **□** → 3 · **□** + 4 = 2 + 7 → 5 · 9 − 3 = **□** + 2 → 4 · 2 + **□** = 10 − 1 → 7 · 8 − **□** = 1 + 6 → 1 · **□** − 2 = 3 + 3 → 8 · 5 + 5 = 4 + **□** → 6. (Blank on the left 4 / right 4, first and second crate on each side twice; answers all different; the answer-next number — 7, 8, 9, 6, 9, 7, 6, 10 — is never the answer.)

**Mode "Make it balance", level "To 20" — 10 rounds** (G3-350; every side within 20; the blank never 0):
8 + 4 = **□** + 5 → 7 · 6 + 7 = 10 + **□** → 3 · **□** + 9 = 7 + 8 → 6 · 15 − 6 = **□** + 4 → 5 · 3 + **□** = 13 − 2 → 8 · 9 + 9 = 20 − **□** → 2 · 14 − **□** = 6 + 4 → 4 · **□** − 3 = 2 + 4 → 9 · 12 + 3 = 5 + **□** → 10 · 11 + **□** = 6 + 6 → 1.

**One right answer each:** a verdict has one right stamp; every repair and blank has exactly one value in 1–20 that balances (gate solves each).
**Answer position:** (a) true/false is 7/5 per level and the shuffle never puts more than 2 of the same verdict in a row (10 000 seeds); (b) the stamps never move, so position carries no information; (c) in repair/blank rounds the blank sits on the left pan in 5 of 10 Make-it-balance rounds and on the right in 5, and in every position of a side (first or second crate); (d) the answer-next number (the total of the other side, e.g. 12 for 8 + 4 = □ + 5) is never the answer — the gate asserts it for every blank.
**Order:** order-only reshuffle per pass; never the same order twice; witnesses rotate independently of the claims.

## 7. Check, the misses, the success
- **Gavel with no stamp:** no miss; the stamps bob; bubble: **"Judge, stamp your ruling first: = or ≠."**
- **Miss 1 (wrong verdict):** the clamp HOLDS (the beam does not move — no directional leak). Each pan's crates open their lids and pour their amount into a short dot column under the pan (ten-frame stacks, 14 px dots: 8 dots under the left, 9 under the right; subtraction crates pour the first number and then the taken-away dots drop out of the column). Bubble: **"The court wants evidence. Look at what each pan holds."**
- **Miss 2:** threads join the two columns dot for dot; leftover dots (if any) glow. Bubble: **"Every dot has a partner — or not?"** The child stamps again and bangs the gavel; the beam then releases.
- **Repair / Make it balance, wrong number:** the clamp releases and the sign tips (that IS the showing — which side is heavy is the information the child needs to fix it); after 1.2 s the beam is clamped level again for another try. Miss 2 in repair: the dot columns appear under both pans with the blank's dots dashed. Bubble: **"Too heavy on this side — make it lighter."** / **"Too light on this side — make it heavier."**
- **A new stamp or dial move takes the help away.**
- **Success:** the sign settles; Tess nods (a slow 8° bow, twice); the ink on the claim card turns gold. Bubble — true: **"Fair! Both sides are {n}."** · false caught: **"Not fair: {l} and {r} are different."** · repaired: **"Now it's fair: {left} = {right}."** · after "turn the court round": **"Still fair the other way round!"**

## 8. Settings
1. **Claims:** True or false / Make it balance (default True or false) — at rest the claim has no blank, or a blank crate with a dial.
2. **Numbers:** To 10 / To 20 (default To 10) — at rest the crates carry one-digit or two-digit numbers.

## 9. Words (EN source)
- on-screen title: **Numbers Court**
- instruction: **You are the Judge. A witness makes a claim. Stamp = if both sides are the same amount, or ≠ if they are not. Then bang the gavel and watch the equal sign — it only lies flat when both sides are the same.**
- task line: **Is the claim fair? Stamp = or ≠, then bang the gavel.** · (Make it balance) **Set the missing number so both sides are the same. Then bang the gavel.**
- stamp labels: **true** · **false** · gavel: **Bang the gavel**
- hints: **Judge, stamp your ruling first: = or ≠.** · **The court wants evidence. Look at what each pan holds.** · **Every dot has a partner — or not?** · **Too heavy on this side — make it lighter.** · **Too light on this side — make it heavier.**
- success: **Fair! Both sides are {n}.** · **Not fair: {l} and {r} are different.** · **Now it's fair: {left} = {right}.** · **Still fair the other way round!**
- free play: **Court practice**
- settings: **Claims** — **True or false** / **Make it balance** · **Numbers** — **To 10** / **To 20**

**Locale traps:**
- **"Fair" vs "true":** the court word for the stamp is chrome; school language for a true equation differs — de "stimmt / stimmt nicht", fr "vrai / faux", es "verdadero / falso", pt "verdadeiro / falso", it "vero / falso", nl "klopt / klopt niet", sv "sant / falskt", da "sandt / falsk", no "sant / usant", fi "totta / ei totta". The page intro's TRUE/FALSE stays the vocabulary in each locale (frozen intros already use it in en..sv).
- **"≠"** is taught in every locale's grade 1–2 (de "ungleich", fr "différent de", fi "erisuuri kuin") — the stamp needs no word.
- **"<" / ">"** appear as SHAPES of the beam, not as taught symbols; no hint names them, so locales that introduce < > later (fi, sv) are not ahead of their curriculum — the shape simply opens toward the bigger side.
- **Judge** word: de "Richterin/Richter", fr "juge", es "jueza/juez", it "giudice", nl "rechter", sv "domare", da "dommer", no "dommer", fi "tuomari" — "You are the Judge" uses the gender-neutral or child-inclusive form per locale (de "Du bist heute Richter oder Richterin" → reviewer decides "Du bist das Gericht"). Tess keeps her name.
- Gavel: de "Hammer (Richterhammer)", fr "marteau", es "mazo", pt "martelo", it "martelletto", nl "hamer", sv "klubba", da "hammer", no "klubbe", fi "nuija".

## 10. Sound off, access, phones
- Legible silent: the stamps' ink, the clamp, the sign's shape, the sinking pan and the dot evidence carry everything.
- Keyboard: Tab to the "=" or "≠" stamp, Enter stamps; G bangs the gavel; T turns the court round; ↑/↓ on a dial.
- aria: claim read in full ("six plus two equals eight plus one"); the beam's result announced ("The sign lies flat: both sides are 8." / "The sign tips: the right side is heavier."); the clamp state ("the beam is locked").
- Taps: stamps 96/80 px; gavel ≥ 56 px tall; dial buttons 48 px; Tess and the witness are not tap targets.
- Reduced motion: the beam moves straight to its final angle; no swing, no pan sway.

## 11. Distinct from
- **number-balance (premium tool #31):** the class AUTHORS both sides; its beam's angle is analog (a near miss leans a little); its "Hold" freezes the beam for a prediction and always lets go; its optional notation layer WRITES "=", "<", ">" beside the beam; a cloth hides a pan for find-the-value. None of that is copied: here the claim is given, the beam IS the sign — two bars whose own geometry reads "=" or a "<"/">" wedge (the top bar is the stop, so every unequal claim tips to the same fixed angle: direction, never magnitude, no text added) — the verdict comes BEFORE any motion, and only a right ruling breaks the seal. Make it balance uses a dial on a crate, not a cloth over a pan.
- **New 209 The Bet Pan (designed):** pick the heavier THING and pull a pin on Check — weight of objects; the pin always releases. Here there are no objects, no pin: numbers on both sides of an equation, and the release is earned by a right true/false ruling.
- **Row 87 The Rung Ladder (this batch):** equality as rung-for-rung correspondence between two expressions the child pairs; here a single claim is judged and repaired.

## 12. Build plan
- **Core state:** `{ mode, level, order[], idx, round:{form, left:[tokens], right:[tokens], blank:null|{side, pos}, repair:null|{side, pos}}, stamp:null|'eq'|'ne', clamped:true, dial:null|n, turned:false, misses, help }`.
- **Functions:** `evalSide(tokens)`, `isTrue(round)`, `heavier(round, dial)`, `stamp(v)`, `gavel()` → `{released, verdictOk, shape:'eq'|'lt'|'gt'}`, `startRepair()`, `setDial(n)`, `solveBlank(round)` (the value that balances), `turnCourt()` (rewrites the claim reversed; asserts truth unchanged), `evidence(round)` → dot columns, `nextTask(index)`.
- **Gate `verify-sign-beam-core.js` (own oracle):** (1) every claim's left/right recomputed; verdict = (left == right); (2) per level 7 true / 5 false; operational form ≤ 2; ≥ 1 turn-around; ≥ 3 subtraction claims; false claims off by exactly 1; (3) every repair/blank has exactly one value in 1–20 that balances, and it is never the left-side result in the answer-next trap rounds; (4) the beam's shape: 'eq' iff equal, otherwise the WEDGE opens toward the bigger side ('lt' when the right is bigger, 'gt' when the left is bigger) — the angle rule: the light end touches the top bar (asserted from geometry); (5) a wrong verdict never releases the clamp (no direction leaks before a right ruling); (6) turning the court keeps the shape and reverses the token order; (7) no verdict runs > 2 over 10 000 seeds; (8) no token is 0 and every side within 0–20; (9) pets/tortoise and every witness picture exist in their colour theme JSONs.
- **Mutations:** release the beam on a wrong verdict; wedge opens toward the lighter side; a false claim off by 3; a blank with two balancing values; the answer-next value balances a trap round; turning the court flips the truth; crates sized by value (weight from space); a verdict run of 3 allowed; Tess drawn as SVG (picture source check); repair reachable on a true claim.
- **Pictures verified:** pets/tortoise (contact sheet), forest-creatures fox/raccoon/squirrel/mouse/hedgehog/badger/beaver/owl/rabbit (contact sheet), pets/hamster, pets/parrot (contact sheet), farm-animals/goat (JSON). **Risks:** the wedge reading at 320 px (gap 14 px → open end ≈ 28 px: measured legible by `visual-qa-activity.js`); the half-turn animation passing pans behind the post (CSS 3D; reduced-motion fallback is a crossfade). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — being the Judge with a real stamp and gavel, and watching the equal sign itself swing, tip and turn into another sign, is theatre every time.
2. **Would a teacher put it on the board?** Yes — "6 + 2 = 8 + 1: fair?" is the exact equal-sign discussion; the class predicts first, then the sign shows; "8 + 4 = □ + 5" with 12 visibly tips the court.
3. **Would a parent trust it?** Library pictures only, no score, the help is evidence (dots and partners), never a verdict handed over.
4. **The invention:** the equal sign is the balance — a fixed top bar and a tipping bottom bar that read "=" only when both sides hold the same amount, and tip into "<" or ">" toward the bigger side when they don't.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- **Distinct from the premium number-balance tool and #209 Bet Pan, explicitly.** The tool already has a Hold that freezes the beam for prediction and a notation layer that writes = < >; the Bet Pan has a pin pulled on Check. The release is now the **court seal**: the Judge's own stamp inks a wax seal over the pivot and only a RIGHT ruling cracks it — the ruling is the key, which neither sibling has. §11 lists every overlap and why it is not copied (given claim vs authored sides; fixed-angle wedge formed by the sign's own two bars vs analog angle + written notation; dial on a crate vs cloth over a pan).
- **Settings gap:** "Make it balance" had no To-10 set, though the Numbers setting offers To 10 — added 8 rounds (every side ≤ 10, blank 4 left / 4 right in both crate positions, answers all different, answer-next number never the answer).
- **Geometry re-derived:** bars 340 px with a 20 px gap → the light end touches the top bar at asin(20/170) = 6.7°, the heavy end opens to 40 px; at 360 bars 220 / gap 14 → 7.3°, open end 28 px. The wedge opens toward the bigger side, so it reads exactly as "<"/">" would. Every claim re-solved by my oracle: 7 true / 5 false per level, false claims off by 1, every repair and blank has one value in 1–20 and is never the answer-next total.
