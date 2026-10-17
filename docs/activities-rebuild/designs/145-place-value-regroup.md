# Row 145 — Tuck Makes a Hundred → THE SQUARE VICE (2.NBT.B.7)

## 0. Identity
- **id** `place-value-regroup.add-compose-hundred.2-nbt-b-7` (frozen) · grade 2 · CCSS 2.NBT.B.7 · strand Number & Operations in Base Ten · own files `square-vice-core.js`, `square-vice-activity.js`, `square-vice-activity.html`; the manifest row stays in `place-value-regroup-activities.json` (tool → `square-vice-activity`). Metadata frozen en..sv; da/no/fi new at build. (The sv page title says *åk 3*, the de slug *klasse-3* — grade report only, metadata frozen.)
- **Worksheets covered:** G2-203 Add the Blocks (the "no trade needed" setting — two-digit block sums with no regrouping, plus three-digit warm-ups), G3-357 / G3-359 / G3-361 / G3-363 addition with carrying (the "ones and tens both trade" setting + the written-sum setting). Subtraction sheets G3-357/360/362/363 are carried by rows 146 and 147 (the same Tuck family); the written column method itself is #267.
- **Old activity:** Tuck the hamster beside a base-ten mat; a button "🔁 Make a hundred" bundled ten tens automatically, then the child typed the total. **Kept:** the eight rounds (160+50, 280+30, 340+70, 320+80, 450+60, 130+70, 410+90, 240+60), Tuck (library `pets/hamster`), typing the total, the column names, the idea of *making* a hundred. **Dropped:** the button that bundled by itself — now the child stacks tens into Tuck's vice and cranks it, and the vice only closes on a square.

## 1. The pitch
"Tuck's vice only locks shut on a perfect square: stack your tens in it and crank — ten tens are exactly as tall as one ten is long, so only ten lock, and what comes out is a hundred."

## 2. Why a child will want it again
- **Cranking a vice is a grown-up tool in small hands.** Drag the T-handle down (or round): the screw turns with a ratcheting *tick-tick*, the top jaw sinks onto the stack, and if the stack is right the catch drops into its notch with a heavy *CLUNK*. Children crank it again just to hear the clunk.
- **The square appears.** Behind the stack stands the vice's gauge plate, a pale square with the faint 10 × 10 grid of a hundred. Every rod laid on the bed covers one more stripe of it. At ten the plate is exactly covered, the jaw locks, the seams between the rods fade to the faint grid — and the child is holding a hundred-flat built out of their own tens.
- **The delivery is a show.** The jaw lifts, the new flat (cream-gold, so it reads as *made*) slides down the bench rail into the hundreds bay and drops in with a wooden *tock*; Tuck (library hamster, 96 px, sitting at the bench end) gives a little hop.
- **Nine and eleven are funny, not wrong.** With nine the jaw comes down and stops short — one bare stripe of the square still shows, the catch slips past the notch, and the screw spins back up with a whirr. With eleven the jaw stops high, a rod sticks out over the top of the square, and the catch never reaches its notch. Take one off and crank again.
- **Free play:** between rounds the vice stays open — lay a flat on the bed and crank *up*: the flat splits into its ten rods, which slide back to the tens bay (the trade works both ways); or stack cubes and watch ten of them lock into a rod.

## 3. The skill and the misconception
- **Skill (2.NBT.B.7):** add within 1000 using concrete models and place value, understanding that adding tens can compose a hundred (and, in the both-trade setting, that adding ones composes a ten); relate the model to the written method (the carried 1).
- **Misconception 1 — eleven tens written as "11"** (160 + 50 → 1110, or "1 hundred and 11 tens"): **pushback:** a bay with ten or more pieces cannot be described by one digit box; on Check the bay pulses and the vice's bed glows. Locking ten of them into a hundred is the only way to make every bay describable.
- **Misconception 2 — "a few tens make a hundred" / the wrong number traded:** **pushback by geometry:** a rod is exactly as long as the gauge square is wide, and each rod is one tenth of its height — nine rods leave a bare stripe and the catch misses the notch; eleven stick out over the top. Only ten make the square. Nobody says "ten" — the square does.
- **Misconception 3 — the leftover ten forgotten** (160 + 50 → 200): **pushback:** the vice takes only ten; the eleventh rod stays in the tens bay, and a "0" typed under that bay wobbles against the rod still lying there.
- **Misconception 4 — the carried hundred forgotten in writing** (written-sum setting): the carry box writes its small "1" at the instant the flat drops into the hundreds bay — the written mark and the physical hundred arrive together.
- **Misconception 5 — "a hundred is just a lot of ones":** the flat that comes out still shows its ten rods as faint seams; in free play a flat cranked *up* splits back into exactly ten rods, never into cubes.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout: mat 440 px left, vice column 240 px right):**
- **Task line** (≤ 24 px): see §9.
- **The mat** (440 × 400): three bays side by side — hundreds | tens | ones — 140 px wide each, low walls 2.5 px ink, headed by a block icon (flat / rod / cube, 26 px) and the localized column name in 16 px (the content words of place value, as in row 96).
  - **Flats:** 60 × 60 squares with a faint 10 × 10 grid, stacked in a 2-wide column (up to 10 → 5 rows × 64 px = 320 px).
  - **Rods:** horizontal bars 120 × 14 with ten faint cube segments, stacked one above another (pitch 17 px → 18 rods = 306 px).
  - **Cubes:** 14 px cubes in rows of five (pitch 17 px).
  - **Colours:** the first number's blocks coral, the second number's teal; a flat or rod made in the vice is cream-gold.
- **Digit boxes:** under each bay a box 56 × 60 (40 px Baloo 2), filled by the typed total right-aligned, one digit per box, so the number's digits stand under the bays they describe.
- **The Square Vice** (right column, 240 × 300), all drawn apparatus geometry:
  - a **bed** (anvil) 180 × 16 on a short bench, with a rail running from the bed's left end down into the hundreds bay (the delivery path);
  - the **gauge plate** standing behind the bed: a square 140 × 140, pale cream with the faint 10 × 10 grid of a hundred. In the both-trade setting, when cubes are on the bed, the plate turns (200 ms flip) into an upright rod's face, 14 × 140, ruled into ten cells — the shape ten cubes become;
  - the **top jaw** 180 × 18 on a vertical screw, with a **T-handle** 64 × 44 on top (the crank) and a small **catch** on the screw post with a **notch** drawn exactly at the top of the gauge square (one tick mark, no number);
  - pieces on the bed lie stacked bottom-up: a rod is drawn 140 × 14 here (exactly the plate's width — a rod is as long as the square is wide), a cube 14 × 14, so ten of either reach the notch.
  - **Tuck** (`pets/hamster`, 96 × 96) sits at the bench's right end, beside the vice.
- **Written sum** (setting on): a column sum on squared paper under the mat (`160 + 50`, 36 px digits), a dashed carry box over the hundreds and the tens columns — de: in the *Übertragszeile* just above the answer rule, under the next column; every other locale above the top number (row 96 §9c) — answer digits mirroring the digit boxes.
- **Feedback bubble** under the mat, 18 px. **No words on the apparatus** except the column names and the numerals.

**At 360 px (stacked):** task line → vice strip 328 × 170 (gauge 100 × 100, bed 130, rods 100 × 10, cubes 10 × 10, jaw 130 × 14, T-handle 52 × 44; Tuck 64 px at the strip's right end) → mat 328 × 290 (bays 104 px; flats 44 × 44 in a 2-wide column; rods 92 × 11, pitch 14; cubes 11 px, pitch 14) → digit boxes 44 × 52 → shell keypad. Drag targets are a whole bay, the whole bed (≥ 130 × 44 hit area) or the T-handle (≥ 52 × 44); a single rod is never the only target. Height ≈ 44 + 170 + 290 + 56 + keypad → Check above 740; at 320 × 640 the gauge is 88 × 88 (pieces 8.8 px thick — the stripes still read, the catch tick is 3 px ink) and the rods 84 × 10 → fits.

## 5. The hand
- **Load the bed:** press on a bay and drag to the vice → the top piece of that bay comes along (≤ 100 ms) and drops onto the stack with a *tock*, covering the next stripe of the gauge. Hold the press on the bay for 300 ms first and a handful counter grows (2, 3, 4 … one more every 250 ms, shown as a chip on the finger) so several pieces travel at once. Pieces of two kinds never share the bed — a cube dropped onto rods slides back to its bay; a flat dropped on an empty bed starts free-play splitting (below).
- **Crank:** drag the T-handle down (any vertical drag ≥ 40 px, or a circular drag around it; a tap = one automatic crank of 700 ms). The jaw sinks with a ratchet tick every 4 px and stops on top of the stack:
  - stack top **at the notch** (exactly ten) → the catch drops into the notch: *CLUNK* (200 ms settle). The seams between the pieces fade to the faint grid; the jaw lifts (300 ms); the new piece — a cream-gold flat from ten rods, or a cream-gold rod from ten cubes — slides down the rail (420 ms) into the next bay up and drops in. In the written-sum setting the carry box writes its "1" as it drops.
  - stack **below** the notch (fewer than ten) → the jaw stops short, the bare stripes of the gauge flash once (the gap is the missing pieces), the catch slips past the notch with a dry click, and the screw spins back up (300 ms whirr). Nothing moves, no miss.
  - stack **above** the notch (more than ten) → the jaw stops on the high stack, the pieces above the square's top edge glow coral, the catch never reaches its notch, the screw springs back. No miss.
- **Take off:** drag the top piece from the bed back to its bay, or tap the bed to return the top piece.
- **Reverse (free play, and undo):** a flat on the empty bed + crank *up* (drag the handle up) → the flat lifts against the jaw and splits along its seams into ten rods, which slide back down into the tens bay (the same for a rod into ten cubes). Any lock can be undone this way until Check.
- **Type:** the shell keypad types the total; digits land right-aligned in the three boxes.
- **Keyboard:** Tab cycles bays → bed → T-handle → keypad; Space lifts one piece from the focused bay; Shift+Space lifts five; Enter on the bed drops; Enter on the handle cranks down, Shift+Enter cranks up; Delete returns the bed's top piece.

## 6. The rounds
One round = one addition; the first number's blocks and the second's are already in the bays.

**Tens make a hundred (default — the frozen title; the old eight):**
| # | sum | tens together | vice | total | tens digit after |
|---|---|---|---|---|---|
| 1 | 160 + 50 | 6 + 5 = 11 | 10 rods → 1 flat | 210 | 1 |
| 2 | 280 + 30 | 8 + 3 = 11 | 10 → 1 | 310 | 1 |
| 3 | 340 + 70 | 4 + 7 = 11 | 10 → 1 | 410 | 1 |
| 4 | 320 + 80 | 2 + 8 = 10 | 10 → 1 | 400 | 0 (exactly ten) |
| 5 | 450 + 60 | 5 + 6 = 11 | 10 → 1 | 510 | 1 |
| 6 | 130 + 70 | 3 + 7 = 10 | 10 → 1 | 200 | 0 |
| 7 | 410 + 90 | 1 + 9 = 10 | 10 → 1 | 500 | 0 |
| 8 | 240 + 60 | 4 + 6 = 10 | 10 → 1 | 300 | 0 |
Half the rounds leave exactly zero tens — the 0 digit is the point; the other half leave one rod outside the vice. All totals different. (No ones in these rounds — the frozen activity is about tens; a 0 ones digit is content, never a count.)

**No trade needed** (warm-up, G2-203):
34 + 25 = 59 · 52 + 36 = 88 · 234 + 52 = 286 · 312 + 46 = 358 · 125 + 63 = 188 · 451 + 127 = 578 · 206 + 81 = 287 · 343 + 215 = 558 — the vice is present but no kind ever reaches ten (tens sums 5–8, ones sums 6–9), so the jaw always stops short — which is itself the lesson. All totals different.

**Ones and tens both trade** (G3-359 / G3-361):
268 + 157 = 425 · 349 + 276 = 625 · 185 + 237 = 422 · 456 + 178 = 634 · 297 + 135 = 432 · 374 + 159 = 533 · 168 + 284 = 452 · 529 + 193 = 722 — every round needs a ones lock (ten cubes → a rod) and a tens lock (the tens already reach 11–14 before the new rod joins them, so the tens bay holds 12–15 rods at its fullest). All totals < 1000 and different. Either lock may run first (both orders give the same bays); the success line names the ones lock first, the order of the written method.

- **Answer position:** typed — nothing to guess by place. **Measured shortcut bots** (gate recomputes): on the default eight, "write the tens count as it is" (1 1 1 0 → 1110 …) 0/8; "trade but drop the leftover ten" right only on the four exactly-ten rounds, which is honest — the gate requires the four 11-tens rounds in every pass; "add the hundreds and tens digits only" 0/8. Both-trade: a no-carry bot 0/8; a "carry the ones, forget the tens" bot 0/8.
- **Order:** order-only reshuffle per pass; never two exactly-ten rounds first in a row.

## 7. Check, the misses, the success
- **Check with nothing typed** → "Type the total under the bays." (no miss).
- **Check while a bay holds ten or more** → the bay's pieces pulse, the vice bed glows; bubble "That bay has too many to write with one digit — make it in the vice first." (no miss: the apparatus shows why; the typed total stays).
- **Miss 1** (a digit does not match its bay) → that bay's pieces count themselves in place-value steps (flats `100, 200`; rods `10, 20 …`; cubes `1, 2 …`, 160 ms each) and its digit box wobbles. EN **"Each box tells how many pieces lie above it."**
- **Miss 2** → the correct count ghosts in pencil above each mismatched bay (`2`, `1`, `0`), and the written sum (shown even if the setting is off, for this look) writes its carry. EN **"{h} hundreds, {t} tens and {o} ones."**
- A new move or keystroke takes the help away until the next Check.
- **Success** → the digit boxes light right to left, the cream-gold flat sparkles once, Tuck hops; EN **"{a} plus {b} makes {c} — ten tens locked into one hundred!"** · both-trade: **"{a} plus {b} makes {c} — ten ones locked into a ten, ten tens into a hundred!"** · warm-up: **"{a} plus {b} makes {c} — nothing reached ten this time."**

## 8. Settings
1. **Numbers:** no trade needed / tens make a hundred (default) / ones and tens both trade — changes the blocks in the bays at rest.
2. **Written sum:** hidden (default) / shown — the column sum appears under the mat at rest.

## 9. Words (EN source)
- in-tool title: **"Tuck Makes a Hundred"** (frozen)
- instruction: **"Stack ten of a kind in the vice and crank it shut to make the next block. Then type the total."**
- prompt (kept): `{a} + {b} = ?`
- hints: hintType **"Type the total under the bays."** · hintTooMany **"That bay has too many to write with one digit — make it in the vice first."** · hintCount **"Each box tells how many pieces lie above it."** · hintShow **"{h} hundreds, {t} tens and {o} ones."** · hintShort (bubble after a short crank) **"The square isn't covered yet."** · hintTall (after a high crank) **"Something sticks out over the square."**
- celebrations as §7. settings: **"Numbers"**: "no trade needed" / "tens make a hundred" / "ones and tens both trade" · **"Written sum"**: "hidden" / "shown". aria: vice **"vice with 9 rods: the square is not covered — it will not lock"**, **"locked: ten rods made one hundred"**.
- **Locale traps:**
  - (a) **The making verb is not one-to-one** (row 96 §9a): de *bündeln* (*zehn Zehner zu einem Hunderter bündeln*), fr *faire une centaine / échanger*, it *fare il cambio / formare un centinaio*, es-MX *formar una centena / reagrupar*, pt *formar uma centena / agrupar*, nl *inwisselen / bundelen*, sv *växla*, da *veksle*, no *veksle*, fi *vaihtaa / koota satanen*. "Make" and "lock" in the bubbles use that locale's classroom verb; the vice shows the act.
  - (b) **"Vice":** de *Schraubstock*, fr *étau*, it *morsa*, es-MX *prensa (de banco)*, pt *morsa / torno de bancada*, nl *bankschroef*, sv *skruvstycke*, da *skruestik*, no *skrustikke*, fi *ruuvipenkki* — bubbles only; the drawn vice needs no word. "Crank" is the plain verb (de *zudrehen*, fr *serrer*, …).
  - (c) **Carry box position:** de *Übertragszeile*; every other locale above the top number (row 96 §9c).
  - (d) **Column names** (content words): de *Hunderter / Zehner / Einer*, fr *centaines / dizaines / unités*, it *centinaia / decine / unità*, es/pt *centenas / decenas|dezenas / unidades*, nl *honderdtallen / tientallen / eenheden*, sv *hundratal / tiotal / ental*, da *hundreder / tiere / enere*, no *hundrere / tiere / enere*, fi *sadat / kymmenet / ykköset*. Bay order H-T-O left to right in all eleven.
  - (e) The digit boxes and numerals carry no number words — de/nl/da ones-first number names never collide with the bay order (row 96 §9d).

## 10. Sound off, access, phones
- Legible with the sound off: the gauge's bare or covered stripes, the jaw's stop height, the catch in or out of its notch, the cream-gold piece sliding down the rail and the counting labels say everything; ticks and the clunk are bonus.
- Keyboard path in §5; aria live: after each piece **"8 rods in the vice"**, at the lock **"locked — ten rods made one hundred"**, after a short crank **"9 rods: one stripe of the square is still bare"**.
- Taps: bays (whole bay ≥ 104 × 200), bed ≥ 130 × 44, T-handle ≥ 52 × 44, keypad ≥ 44 px. Tuck 96 / 64 px. Check above the folds (§4).
- Reduced motion: the jaw jumps to its stop; the lock and the delivery run as one cross-fade.

## 11. Distinct from
- **Balances — Row 88 Equal-Sign Beam, Row 166 Fair Scale, New 209 Bet Pan, New 271 Gram Balance, number-balance (tool):** a beam that tips by a difference and rests level at equality. Nothing here tips or weighs: a screw jaw closes on a stack and its catch either drops into one notch or misses. (This row's first draft was a trading *balance*; it was replaced because it copied the level-means-equal beam.)
- **exchange-machine (tool):** one tap trades automatically. Here the child must stack the pieces and crank, and the vice refuses any stack but a square.
- **Row 94 Ten-Pocket Band / place-value-lab (tool) / counting-cups (tool):** loose ones grouped into a ten by a band, a snap, a cup. Here tens become a hundred, and the test is a shape — ten rods stacked are as tall as one rod is long.
- **Row 96 Roll-Up Mats / Row 97 Nine-Stop Tubes / Row 146 crate packing:** capacity frames, a tube that stops at nine, an outline to pack into. The vice has no compartments: the pieces stack freely and the jaw stops where the stack stops — the catch, not a container, decides.
- **Row 171 Dough Press:** squashing shares into patties to compare areas. Different act, different subject.
- **Rows 146 / 147 (siblings):** taking away — nested crates and the take-away scoop.

## 12. Build plan
- **Core state:** `{ face:'none'|'hundred'|'both', a, b, bays:{H:[src…], T:[…], O:[…]}, bed:{kind:null|'O'|'T'|'H', n}, jaw:'open'|'locked', typed, written:{carry:{T,H}} }`.
- **Functions:** `lift(col, n)` → pieces actually lifted (never more than present) · `place(col)` (refused if the bed holds another kind; refused above 12 pieces) · `crankDown()` → `{stop: n, locked: n === 10 && kind !== 'H'}`; on lock: bed emptied, one piece of the next place added to the next bay (rods → a flat in H, cubes → a rod in T) · `crankUp()` → a single flat (or rod) on the bed splits into ten of the place below, returned to that bay · `describable(col)` ⇔ count ≤ 9 · `check(total)` → `{ok, tooMany:col|null, wrong:[cols]}` · `nextTask`.
- **Gate's own truth (`verify-square-vice-core.js`):** independent column arithmetic: totals, which bays reach ≥ 10, how many locks each round needs (default: exactly one tens lock; both: one ones + one tens; warm-up: none possible — no kind ever reaches ten); `crankDown` locks only at exactly 10 for both kinds and for every n in 1–12; locks and splits conserve value (Σ value before = after) on 10 000 random sequences; Check refuses with any bay ≥ 10; totals distinct per table; exactly four exactly-ten rounds in the default table; a scripted solver using only public functions reaches every total; the reported stop height equals n pieces.
- **Mutations:** lock at 9 · lock at 11 · lock without a crank (automatic at ten) · lock makes a flat worth 9 rods · mixed kinds on the bed · Check accepted with a bay at 11 · digits typed left-aligned · carry box written before the flat lands · de carry box above the top number · leftover rod also swallowed by the lock · crank-up splits a flat into 100 cubes · a warm-up round where a lock is possible · same order twice · celebration with the previous round's numbers.
- **Pictures:** `pets/hamster` (contact sheet: standing, front view). Everything else is apparatus geometry (bed, gauge square, jaw, screw, handle, catch, rail, blocks).
- **Risks:** 18 rods in a 140 px bay → one column at 17 px pitch = 306 px (fits the 400 px mat); at 360, 18 × 14 = 252 px (fits 290). The bed holds up to 12 pieces (so an eleventh can be shown sticking out): 12 × 14 = 168 px against a 140 px notch at 704 → the vice column needs 300 px (given). Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a real vice to crank, a clunk when it locks, and a hundred that comes out of it and slides down to the bay.
2. **Would a teacher put it on the board?** Yes — "ten tens make a hundred" becomes something you can see: ten rods stacked are a square, nine leave a stripe, eleven stick out; the 0-tens rounds and the carry 1 land exactly where the written method puts them.
3. **Would a parent trust it?** Calm, one library hamster, numerals and column names only, no timer or score.
4. **The invention in one sentence:** Tuck's vice only locks shut on a square — ten rods stacked are exactly as tall as one rod is long — so the hundred you need comes out of your own ten tens, and nine or eleven never lock.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 2→5 · reality 5→5
What changed:
- **New invention.** The Trading Scale was a balance whose beam rests level only when both pans are equal — the mechanic of Row 88's Equal-Sign Beam, Row 166's Fair Scale, New 209's Bet Pan, New 271's Gram Balance and the number-balance tool. It is now **the Square Vice**: tens are stacked on a bed in front of a square gauge, the child cranks a screw jaw down, and the catch drops into its notch only when the stack is exactly ten high — exactly when ten rods make a square, i.e. a hundred. Nine leave a bare stripe, eleven stick out over the top; nothing weighs, nothing tips. The same vice makes a rod from ten cubes (the gauge turns into an upright rod's face), and free play cranks a flat back up into its ten rods.
- All three tables re-solved by script (`work-c33/verify.js`): default totals 210 310 410 400 510 200 500 300 (four exactly-ten, four eleven-tens rounds), warm-up totals distinct with tens sums 5–8 and ones sums 6–9 (no lock possible), both-trade totals distinct with tens sums 11–14 before the carried ten — every claim held.
- Notation re-checked against row 96 §9: carry box in the de *Übertragszeile*, above the top number elsewhere.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
