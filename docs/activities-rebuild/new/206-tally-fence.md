# New 206 — The Tally Fence: the gate that latches at five (K.CC.B.5)

## 0. Identity
- id `tally-fence.play.k-cc-b-5` · grade K · CCSS K.CC.B.5 · strand Counting & Cardinality · key `tally-fence` → `mini tools/tally-fence-core.js`, `tally-fence-activity.js`, `tally-fence-activity.html`, `tally-fence-activities.json` (scaffold `--num=206`).
- worksheets it covers: **K-014** Make Your Tally (make mode: every picture becomes one post) · **K-015** Read the Tally (read mode, keypad rounds) · **K-025** Tally Match (read mode, sign rounds: hang the matching number on the gate).
- new instrument; nothing to keep.

## 1. The pitch
"Each animal that comes into the pen drives in one fence post — but a bay only has room for four upright posts, so the fifth one has to be laid across: a tally is a fence, and a closed bay is five."

## 2. Why a child will want it again
- **A herd that obeys a tap.** Identical library farm animals graze in a field. Tap one: it trots (450 ms, a little bounce in its step) through the pen gate, along the lane behind the fence and in at the barn door, and — thunk — a wooden post drops into the fence above it with a bounce and a dust puff.
- **The latch is a toy.** The fifth animal's post does not stand up; it arrives lying flat, hovering over the four uprights with a glowing grip at one end. The child drags it corner to corner across them and it snaps into place with a satisfying wooden *clack*; the gate swings shut on the latch with a little bounce and the bay tints sunny yellow — one closed bundle. Children want to make that clack happen again.
- **The cheeky bounce.** If the child taps another animal while that post is still flat, the gate is jammed open: the animal trots in, does a puzzled loop and trots straight back out to the field. Funny, and the whole lesson in one move.
- **Earned show per round:** the gate swings shut, the closed bays rock one after another while the bay totals rise above them in chalk ("5, 10, 13"), and a gentle "baa/moo" (the round's animal) plays where sound is on. No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (K.CC.B.5 through K-014/015/025):** show how many objects there are with tally marks grouped in fives, and read a tally as fives and ones to say the number.
- **Misconceptions and the push-back:**
  - *Five (or six) uprights before the cross:* a bay is built with exactly four upright slots; after the fourth there is physically no place for another upright. The next post can only be laid across, and until it is, the gate cannot take another animal (the animal comes back out). A fifth upright cannot be made.
  - *Counting every stroke one by one / not seeing a closed bay as five:* a latched bay is five posts that were five animals, latched into one wooden bundle that tints as one group (and in read-mode success five animals step out of the barn for each closed bay); on a miss the closed bays pulse in turn with "5, 10, 15" rising above them, so the bundle is read as a jump of five.
  - *Treating the cross-post as "not a mark"* (reading a closed bay as 4): in sign rounds the wrong signs are exactly n−(number of closed bays) and n+1, so this mistake is a visible choice with its own answer.

## 4. The stage
**At 704 — stacked (the field must hold ten 96 px animals; a side-by-side field would shrink them):**
- **Task line** (20 px) above.
- **Field** (656 × 236 px): pale-green meadow with a few drawn grass tufts (apparatus). Up to 10 identical animals at a time on a hidden 5 × 2 grid (cells 124 × 112, ±8 px jitter, never overlapping), each picture short side **96 px**. Above 10 (to-20 make rounds) the field holds the first 10; when it empties, the rest trot in from the left edge as a second herd (600 ms).
- **The fence** (656 × 128 px) runs along the bottom of the field: at its LEFT end **the gate** (a drawn two-bar gate, 64 × 96 px), then up to 4 **bays**, each 96 px wide with 12 px between bays (4 bays = 420 px). A bay = 4 upright slots; an upright post is a wooden bar 11 × 84 px (fill #C7956A, 3 px ink outline #6E4A2B), slots 15 px apart (4 posts span 89 px). The latch post is the same bar 122 px long laid from 6 px above-left of the first upright to 6 px below-right of the fourth (≈ 52°). A bay is a tally group drawn in wood. Bays fill left to right. Empty slots are faint dotted outlines in make mode, so the four-slot bay is visible before the first post.
- **The pen** (656 × 44 px) is a hay-coloured lane behind the fence ending at the right edge in a drawn **barn doorway** (a 44 × 64 px door frame with a cross-brace, apparatus). An animal that passes the gate walks along the lane behind the posts and in at the barn door — **the post it drove is its record; no shrunken picture is ever left behind** (picture ruling: nothing from the library renders below 96 px at 704 / 64 px at 360).
- **Below the fence**: the keypad row (after the field is empty in make mode; at rest in read mode) — keys 1–9, 0 and ⌫, each 48 × 52 px, in one row of 11 (≈ 560 px) centred, with a readout box (88 × 60 px, Baloo 2 34 px) at its left. In sign rounds the keypad is replaced by three hanging wooden signs (96 × 64 px, numeral 32 px) on a rail.
- **Bubble** under, Check right (shell).

**At 360 — stacked:** field on top (328 × 216 px, up to 10 animals at short side **64 px** on a 4 × 3 grid, cells 82 × 72), the fence below (328 × 100): gate 40 × 72 px, then 4 bays 64 px wide with 6 px gaps (274 px), uprights 8 × 60 px, slots 11 px apart, latch 88 px; pen lane 24 px with the barn doorway 28 × 40 px. Keypad in two rows of 6 (0–5, 6–9 + ⌫), keys 48 × 48. Signs 88 × 56. At 320: the same 64 px animals on the 4 × 3 grid (cells 74 × 72), bays 58 px, keys 44 × 44.

Pictures (theme JSON verified, seen on the farm-animals contact sheet): `farm-animals/` sheep, cow, pig, goat, horse, duck, hen, donkey, rabbit, chick — one noun per round, identical instances (facing does not matter here). `hen` only (hen and chicken are one drawing); `lamb` left out (reads as sheep); `owl`/`bee` (not pen animals); chick and duck are never in one round (they are one noun per round anyway). Fence, posts, latch, gate, field, lane, barn doorway, signs, keypad: drawn apparatus.

## 5. The hand
- **Tap an animal in the field** → it trots along a curved path to the gate, behind the fence and in at the barn door (450 ms), a hoof/patter sound; at the same moment a post drops into the next free upright slot (fall 160 ms, 6 px bounce, "thunk"). First visible response < 60 ms (the animal lifts its head).
- **Fifth animal of a bay** → it trots in like the others, but its post arrives FLAT, hovering 20 px above the bay with a pulsing grip dot on its left end; the gate swings open and stays open.
- **Drag the flat post** (or tap it, or Enter) → drag from the grip down-right: it pivots and follows the finger; released anywhere with the drag vector between 25° and 75° below horizontal and ≥ 50 % of the bay diagonal, it snaps into the latch position (120 ms) with a "clack"; otherwise it floats back flat (200 ms). A tap lays it across by itself (500 ms) — the drag is the toy, the tap the access path. The gate swings shut, the bay tints #FFF1B8, the huddle shuffles together.
- **Tap an animal while a post lies flat** → it trots to the open gate, makes a small loop inside and trots back to its field spot (900 ms total), a puzzled "hm?" chirp. No post appears. Not a miss.
- **Keypad** → typing fills the readout (max 2 digits); ⌫ erases. **Signs** → tap one and it swings onto the gate hook (250 ms); tapping another swaps them.
- **Undo:** in make mode, tapping the last post of an *open* bay lifts it out and its animal trots back out of the barn to its field spot (the last post only — posts come out in reverse order; a latched bay cannot be opened). This lets a child fix a stray tap without a reset button.
- **Free play:** after success, tapping a closed bay makes its five animals peek out of the barn door one after another (the door frame flashes five times) and shows its running total in chalk above the bay.
- **Keyboard:** Tab through field animals (Enter = bring in), Tab to the flat post (Enter = lay across), Tab to keys/signs.

## 6. The rounds
**Make, up to 10 (9 rounds; n animals in the field, one noun):** 4 sheep · 7 cow · 5 pig · 10 goat · 3 horse · 9 duck · 6 hen · 8 donkey · 5 rabbit. Includes 4 (one before the latch), 5 twice (exactly one bay), 9 (one before the second latch), 10 (two closed bays).
**Make, up to 20 (9 rounds):** 9 sheep · 12 duck · 15 pig · 6 cow · 19 hen · 10 goat · 17 rabbit · 14 horse · 20 chick. Includes 10, 15, 20 exactly and 9, 14, 19 (one before a latch). Above 10 the second herd arrives when the field empties.
After the last animal is in, the keypad rises and the child types how many.

**Read, up to 10 (9 finished fences, field and pen empty):** 7, 3, 10, 5, 9, 4, 8, 6, 2 (2–10 each once, never 0). Rounds 3, 5 and 8 (n = 10, 9, 6) are **sign rounds**:
| n | signs (left → right) | right slot |
|---|---|---|
| 10 | **10** · 8 · 11 | 1 |
| 9 | 8 · **9** · 10 | 2 |
| 6 | 5 · 7 · **6** | 3 |
The other six are keypad rounds. (Wrong signs = n minus the number of closed bays — the cross-post not counted — and n+1.)
**Read, up to 20 (9 fences):** 13, 18, 7, 20, 11, 16, 9, 15, 12; sign rounds 2, 5, 8:
| n | signs | right slot |
|---|---|---|
| 18 | 15 · **18** · 19 | 2 |
| 11 | 9 · 12 · **11** | 3 |
| 15 | **15** · 12 · 16 | 1 |
Read rounds reveal their animals on success (noun cycle: sheep, cow, pig, goat, horse, duck, hen, donkey, rabbit).

**Answer position:** keypad rounds have no position. Sign rounds put the right sign in slot 1, 2 and 3 once each per level; the gate asserts this. The fence itself is the content.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check, make mode, animals still in the field** → hint "Bring every animal into the pen." (no miss). **A post still flat** → "Four posts stand up. Lay the next one across them." (no miss). **Keypad empty / no sign hung** → "How many does the fence show? Type the number." / "Hang a number on the gate." (no miss).
- **Miss 1 (wrong number):** the closed bays pulse one after another (300 ms each) with chalk "5", "10", "15" rising above them; the open bay's posts then light one by one with the count continuing ("11, 12, 13") but the final number is NOT shown — the last post lights with a "?" bubble. Hint: "Count the closed bays by fives: 5, 10, … then the posts left over."
- **Miss 2:** every post gets a small numeral under it (1…n, 14 px, the latch post carries the fifth numeral at its lower end), the readout box outlines in teal. Hint: "Count every post. The post across is one post too."
- **A new key/sign** removes the showing until the next Check.
- **Success:** in read mode the animals the fence stands for come out to prove it, bay by bay at full size: a closed bay pulses and five identical animals (96 px / 64 px) trot out of the barn into the field in a row while chalk "5" rises over that bay; they trot back in as the next closed bay sends its five ("10"); then the open bay's posts each send one animal, which stay ("11, 12, 13"); in both modes the gate swings shut and the bays hop in turn with their chalk totals. Bubble: "Yes — {n}! {ladder}" where ladder lists the counting path, e.g. "Yes — 13! 5, 10, 11, 12, 13" · "Yes — 10! 5, 10" · "Yes — 4! 1, 2, 3, 4".

## 8. Settings (each visibly changes the board at rest)
1. **Mode:** make the tally / read the tally — field full of animals and an empty fence vs an empty field, a finished fence and the keypad (or signs).
2. **Numbers:** up to 10 / up to 20 — two bays vs four bays of fence drawn at rest (empty slots faintly outlined in make mode).

## 9. Words (EN source)
- title: "The Tally Fence"
- instruction (make): "Tap each animal to bring it in. The fifth post goes across." · (read): "How many does the fence show?"
- hints: hintField "Bring every animal into the pen." · hintLatch "Four posts stand up. Lay the next one across them." · hintType "How many does the fence show? Type the number." · hintSign "Hang a number on the gate." · hintFives "Count the closed bays by fives: 5, 10, … then the posts left over." · hintEvery "Count every post. The post across is one post too."
- celebration: "Yes — {n}! {ladder}"
- settings: "Mode" · "make the tally" · "read the tally" · "Numbers" · "up to 10" · "up to 20"
- aria: animal "{animal} in the field"; fence "fence: {bays} closed bays and {ones} posts"; flat post "post lying flat — lay it across"; key "{d}"; sign "sign {n}".
- **Locale traps:**
  - The name of the thing: de *Strichliste*, fr *bâtons / traits de comptage*, es *marcas de conteo* (MX "palitos"), pt *tracinhos / marcas de contagem*, it *tacche*, nl *turven / turfstreepjes*, sv *streckräkning*, da *streger / tællestreger*, no *tellestreker*, fi *tukkimiehen kirjanpito*. Prose uses the native term; the apparatus has no words.
  - **The tally SHAPE itself:** the five-bar gate (4 + 1 across) is what the platform's worksheets draw in all 11 locales (`primitives/tally.js`), so the activity matches them. In Brazil and parts of Latin America and France the *box tally* (a square plus a diagonal) is also common — the native reviewer for pt/es/fr confirms the gate form is familiar; prose never claims "the way everyone counts".
  - The ladder is numerals only (no number words, no plurals); "Yes" + "{n}!" carries no noun, so no agreement. fr U+202F before "!" and "?". fi: "Kyllä — 13! 5, 10, 11, 12, 13".
  - Animal names appear only in aria/prose, from `image-vocabulary.js` labels.
- **Sound off:** posts, the flat post, the bounce-back, the pulsing bays and chalk numerals carry everything.

## 10. Sound off, access, phones
- Legible without sound; keyboard path §5; the latch has a tap path and an Enter path (a drag-only handle is dead to keyboards).
- Taps: field animals ≥ 64 px; flat post grip area 48 × 48 px; keys ≥ 44 px; signs ≥ 56 px; the last post of an open bay (undo) has a 44 × 72 px hit area.
- Pictures: every library picture is 96 px at 704 / 64 px at 360 (field animals and the read-mode parade); no picture is ever drawn smaller — the record of an animal is its post.
- Fold: 360 × 740 → task 24 + field 216 + fence 100 + pen 24 + keypad 104 + bubble/Check 56 ≈ 524 px; 320 × 640 ≈ 520 px — Check above the fold in both.

## 11. Distinct from
- **Counting Table (#1)**, **Peek Window (#12)**, **Treat Box (#14)**, **Roll Book (#13)**: count pictures directly; none records with marks. **Fruit Crates (#8)** writes numerals; **Ten-Shelf (#2)** groups by ten in cartons.
- Tools **counting-cups** (cups of ten), **ten-frame**, **rekenrek** (5-structured beads): none builds a tally; the five-structure here is a *latch you must lay*, and the bounce-back animal is the physical refusal of a fifth upright.
- Siblings: #205 is direction on a number court, #207 ordinal places — no overlap.

## 12. Build plan
- **Core state:** `{mode:'make'|'read', range:10|20, n, field:[ids], herd:1|2, posts:k, flatPending:bool, typed:'', sign:null|n, signs:[3], miss, help}`.
- **Core functions:** `bring(id)` → if `flatPending` returns `{bounced:true}` and changes nothing; else increments `posts`, and if the new `posts % 5 === 0` sets `flatPending=true` (that fifth post exists but lies flat until latched) · `latch()` → `flatPending=false` · `undoLast()` (only an open bay's last post) · `bays()` / `ones()` · `type(d)` / `erase()` · `hang(n)` · `check()` → `{ok, kind:'field'|'flat'|'empty'|'wrong'}` · `ladder(n)` · `layout(width)`.
- **Gate ground truth:** posts always equal animals brought in; an upright count in any bay never exceeds 4; a 5th upright is impossible (bring() during flatPending adds nothing); latch only when 4 uprights stand; read fences draw exactly n strokes (uprights + latches); make/read rounds per tables, never 0; sign sets = {n, n − closed bays, n+1} with the right slot 1/2/3 once each per level; ladder(n) correct for every round (5, 10, 15, 20 then ones); second herd size = n − 10.
- **Mutations:** allow a 5th upright · bring() during flatPending adds a post · latch accepted at 3 uprights · read fence draws n−1 strokes · sign set missing the n−bays distractor · right sign always slot 1 · ladder counts the latch as two · undo can open a latched bay · help survives a new key · herd 2 size off by one · a picture rendered below 96 px at 704 / 64 px at 360 (layout check) · the read-mode parade sends six animals for a closed bay.

- **Pictures to confirm at build:** each farm noun at 96 px and 64 px, ten on the 5 × 2 / 4 × 3 grid without overlap.
- **Risks:** the drag snap must be generous on touch screens; the read-mode parade must leave the final group standing so the last frame shows the ones beside a remembered "10".

- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a herd that trots on command, a post to clack into place, a cheeky animal that walks back out.
2. **Would a teacher put it on the board?** Yes — "why does the fifth go across?" answers itself (there is no fifth slot), and reading by fives is shown, not told.
3. **Would a parent trust it?** Yes — library animals, wooden fence apparatus, no words on it, no score.
4. **The invention, in one sentence:** a fence bay has room for four upright posts, so the fifth animal's post must be laid across — and until it is, the gate turns the next animal away.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 5→5 · distinctness 5→5 · reality 2→5
What changed:
- Picture ruling applied: the 44 px / 34 px "huddles" under each bay are gone — an animal now walks behind the fence and in at a drawn barn doorway, and **the post it drove is its record**. The 88 px field animals (below the 96 px floor) are now 96 px at 704 / 64 px at 360, which forced the 704 layout from a cramped split to a stacked field (5 × 2 grid) above the fence; 320 px keeps 64 px animals instead of 60.
- The proof of a number moved to full-size pictures: in read-mode success each closed bay sends five 96 px animals out of the barn in a row while "5, 10, 15" rises, then each loose post sends one — the "closed bay = five" lesson shown with real animals, not shrunken figures. Free play and undo re-routed to posts and the barn door.
- Empty slots shown as dotted outlines at rest so "a bay has room for four" is visible before the first post; fold budget recomputed (≈ 524 px at 360); two mutations added (picture floor, parade size).
