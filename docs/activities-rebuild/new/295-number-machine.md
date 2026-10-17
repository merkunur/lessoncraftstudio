# New 295 — The Two-Way Crank: a number machine whose rule tile carries its undo on the back (3.OA.D.9)

## 0. Identity
- **id** `number-machine.play.3-oa-d-9` · grade 3 · CCSS 3.OA.D.9 (identify arithmetic patterns and explain them) · strand Operations & Algebraic Thinking · key `number-machine` → `number-machine-core.js`, `number-machine-activity.js`, `number-machine-activity.html`, `number-machine-activities.json`. Start with `node scripts/new-activity.js --num=295`. Page title **"The Number Machine"**.
- **Worksheets covered:** G3-328 "Number Machines" (each machine uses its rule on every number — fill in the missing ones; its level 3 also misses an input).
- New instrument; no old activity.

## 1. The pitch
"Two receipts show what the machine did — 4 came out as 8, 7 came out as 11; slot a rule tile and crank, and the machine replays both receipts: a rule that only fits the first one throws a ball in the reject bin. Crank the other way and the tile flips over to show its undo: +4 becomes −4, and a number comes out as the one that went in."

## 2. Why a child will want it again
- **A crank.** The machine (drawn apparatus — a funnel on top, a glass window with gears in the middle, a chute at the bottom, a wheel with a knob on the side; no face) runs only when the child turns its wheel. One full turn runs one ball: it drops into the funnel, the gears turn behind the window, the rule tile glows, and the ball rolls out of the chute with its new number painted on. Children turn it slowly just to watch the ball go round.
- **The reject bin.** Slot "×2" for receipts 4 → 8 and 7 → 11: the first ball comes out "8" and clicks onto the receipt with a teal stamp — yes! — then the second comes out "14", doesn't match "11", and rolls into the reject bin with a clunk. "It fitted the first one!" is exactly the lesson.
- **The flip.** Turn the wheel backwards and the rule tile spins over in its slot to show its back face: the +4 tile's back says −4, the ×3 tile's back says ÷3. Now balls go UP: drop 20 in the chute and 16 pops out of the funnel. Every tile has its undo printed on the back — the child discovers it by cranking the wrong way.
- **The earned show:** when a round is done, the machine runs all the round's balls in a little parade — forwards, then backwards — while the receipts stamp one after another, and a chain of balls hangs from the chute like a necklace: 9 → 13, 12 → 16, 15 → 19, 16 → 20.
- **Free play:** after each round a ball maker (the keypad) lets the child feed ANY number in, forwards or backwards, and watch what the rule does to it.

## 3. The skill and the misconception
- **Skill:** find a rule (add, subtract, multiply by a number) from input/output pairs, apply it to new inputs, and run it backwards to find a missing input (3.OA.D.9 patterns; G3-328 asks for missing outputs and, at its top level, a missing input).
- **Misconception 1 — choosing a rule that fits only the first pair** (4 → 8, so "×2"). **Push-back:** every round's tray holds a tile that fits the first receipt but not the second (18 of 18 rounds — measured); the machine replays BOTH receipts and the second ball goes to the reject bin.
- **Misconception 2 — running the rule forwards to find a missing input** (? → 20 with +4, answering 24). **Push-back:** Check drops the typed input into the funnel and cranks forward: 24 comes out as 28, not 20 — rejected. Cranking backwards flips the tile to −4 and shows where 20 came from.
- **Misconception 3 — "the rule is always add"** (difference-reading). **Push-back:** in the "also ×" setting five rounds of nine are × rules; the "+difference" tile is a decoy in four of them and fails the second receipt (2 → 6 looks like +4; 5 → 15 is not).

## 4. The stage
**At 704 px (split: machine board 440 px left, task column 216 px right):**
- **Task line** (22 px): **"Find the rule that makes both receipts. Then use it on the new numbers."**
- **The receipts** (board left, 120 px wide): two receipt strips (paper white, 112 × 56, zig-zag bottom edge) pinned one above the other, each showing an input ball → output ball (balls 40 px circles, 20 px numerals; the arrow is drawn). Which receipt is on top is shuffled per round. A tested receipt shows a teal stamp (tick ring) or a coral ring around the mismatched output.
- **The machine** (centre, 200 × 320): funnel (top, 120 wide), a body with a round glass window (gears drawn as simple toothed discs, turning only while cranked), the **rule slot** (a 96 × 56 recess across the body's front), the chute (bottom, curved), a **reject bin** at the chute's foot on the left (a tray with a lip, coral inside), and the **wheel** on the right side (64 px wheel, a 44 × 44 knob on its rim).
- **The rule tile rack** (under the machine): four double-sided tiles 80 × 56 (28 px), shuffled per round. Front faces show the rule ("+4", "×2", "−4", "+3"); the back faces are hidden until a tile is cranked backwards.
- **The task column:** in the apply phase three **input cards** `9 → ▢`, `12 → ▢`, `15 → ▢` (each 196 × 52, numerals 24 px) and, in the "missing input" setting, a fourth card `▢ → 20`; keypad 3 × 4 (keys 56 × 44; ✓ = Check).
- No words on the apparatus: numerals, rule glyphs, arrows and drawn geometry only.

**At 360 px (stacked, content 328 px):** receipts side by side (2 × 156 × 52) on top; machine 200 × 220 (funnel 96, window 72, slot 88 × 52, wheel 56 with a 44 knob) centred with the reject bin left of the chute; rack one row (4 × 72 × 52, gaps 8 = 312 ✓); input cards in a row of three (3 × 100 × 48), the missing-input card on its own row; keypad two rows of six keys 50 × 44. Budget 360 × 740: header 56 + task 40 + receipts 52 + machine 220 + rack 52 + cards 48 (+48) + keypad 88 + gaps 40 = 644 ✓. **At 320 × 640:** rack tiles 66 × 50 (4 × 66 + 3 × 6 = 282 ✓), cards 3 × 90; the missing-input card replaces the input cards once they are done (one row), budget 56 + 36 + 48 + 210 + 50 + 48 + 88 + 30 = 566 ✓.

## 5. The hand
- **Slot a tile:** drag a tile into the rule slot (or tap it — it flies in, 160 ms); a tile already there swaps back to the rack. Slotting does nothing by itself — the crank runs it.
- **Crank forward:** drag the knob clockwise round the wheel (or tap the wheel: it turns one full turn by itself, 900 ms). Each full turn runs one ball: in the rule-finding phase the receipts' input balls are fed in order (top receipt, then bottom); in the apply phase the next input card's ball. The gears turn with the wheel (1:1), the ball drops (200 ms), the tile glows (300 ms), the ball rolls out (300 ms) carrying its new number.
- **Crank backward:** drag anticlockwise (or long-press the wheel and tap ↺): the tile flips in its slot (a 3-D card flip, 250 ms) to show its back face; an output ball (the missing-input card's, or one from the ball maker) rises up the chute and pops out of the funnel with the undone number. Turning forward again flips the tile back.
- **Type + Check:** in the apply phase, type each card's missing number (cards focus in order), ✓/Enter checks the focused card by cranking its ball (§7).
- **Sound:** a ratchet tick per eighth-turn, gear whir, a *plink* as a ball lands, a stamp *thump* on a match, a *clunk* in the reject bin, a card-flip swish. TTS (where available) reads the found rule ("plus four") and each finished pair.
- **Keyboard:** Tab through tiles, Enter slots; → runs forward, ← runs backward; digits and Enter in the cards.
- **Free play:** after a round the keypad becomes a ball maker — type any number and crank either way.

## 6. The rounds
One round = a rule, two receipts, a tray of four tiles (the rule + a tile that fits only one receipt + two others), three inputs to apply it to and, in the "missing input" setting, one output whose input is missing. Trays listed rule-first; **the runtime shuffles tile order every round and which receipt is on top.**

**Rules: + and −:**

| # | rule | receipts | tray | apply to | missing input |
|---|---|---|---|---|---|
| 1 | +4 | 4 → 8 · 7 → 11 | +4, ×2, −4, +3 | 9, 12, 15 → 13, 16, 19 | ▢ → 20 (16) |
| 2 | −3 | 6 → 3 · 10 → 7 | −3, ÷2, +3, −4 | 8, 13, 19 → 5, 10, 16 | ▢ → 9 (12) |
| 3 | +7 | 7 → 14 · 3 → 10 | +7, ×2, −7, +6 | 5, 11, 16 → 12, 18, 23 | ▢ → 25 (18) |
| 4 | −5 | 10 → 5 · 18 → 13 | −5, ÷2, +5, −6 | 12, 15, 22 → 7, 10, 17 | ▢ → 14 (19) |
| 5 | +6 | 3 → 9 · 9 → 15 | +6, ×3, −6, +5 | 8, 13, 17 → 14, 19, 23 | ▢ → 30 (24) |
| 6 | −8 | 12 → 4 · 11 → 3 | −8, ÷3, +8, −7 | 9, 14, 20 → 1, 6, 12 | ▢ → 12 (20) |
| 7 | +9 | 9 → 18 · 4 → 13 | +9, ×2, −9, +8 | 6, 12, 15 → 15, 21, 24 | ▢ → 27 (18) |
| 8 | −2 | 4 → 2 · 15 → 13 | −2, ÷2, +2, −3 | 7, 11, 18 → 5, 9, 16 | ▢ → 16 (18) |
| 9 | +5 | 5 → 10 · 12 → 17 | +5, ×2, −5, +4 | 3, 9, 14 → 8, 14, 19 | ▢ → 22 (17) |

**Rules: also × (5 × rules, 4 ± rules):**

| # | rule | receipts | tray | apply to | missing input |
|---|---|---|---|---|---|
| 1 | ×3 | 2 → 6 · 5 → 15 | ×3, +4, ×2, +3 | 3, 6, 8 → 9, 18, 24 | ▢ → 21 (7) |
| 2 | +8 | 8 → 16 · 3 → 11 | +8, ×2, −8, +7 | 5, 9, 12 → 13, 17, 20 | ▢ → 19 (11) |
| 3 | ×5 | 3 → 15 · 6 → 30 | ×5, +12, ×4, +5 | 2, 4, 7 → 10, 20, 35 | ▢ → 45 (9) |
| 4 | −6 | 12 → 6 · 20 → 14 | −6, ÷2, +6, −5 | 9, 15, 17 → 3, 9, 11 | ▢ → 8 (14) |
| 5 | ×4 | 2 → 8 · 7 → 28 | ×4, +6, ×3, +4 | 3, 5, 9 → 12, 20, 36 | ▢ → 24 (6) |
| 6 | ×2 | 6 → 12 · 9 → 18 | ×2, +6, ×3, +3 | 4, 7, 11 → 8, 14, 22 | ▢ → 16 (8) |
| 7 | +10 | 10 → 20 · 4 → 14 | +10, ×2, −10, +9 | 6, 13, 25 → 16, 23, 35 | ▢ → 40 (30) |
| 8 | ×10 | 2 → 20 · 5 → 50 | ×10, +18, ×5, +10 | 3, 4, 7 → 30, 40, 70 | ▢ → 60 (6) |
| 9 | −4 | 8 → 4 · 13 → 9 | −4, ÷2, +4, −3 | 10, 16, 21 → 6, 12, 17 | ▢ → 11 (15) |

- **Measured (`work-41/mach.js`):** in every round exactly one tile fits BOTH receipts (the rule); every round (18/18) has a tile that fits the first-listed receipt only (in "+ and −" rounds a times/share tile — ×2 four times, ×3 once, ÷2 three times, ÷3 once; an additive tile can never fit one receipt without fitting both; additive decoys +k in × rounds). Critic change: the designer's "+ and −" set used ×2/÷2 in all nine rounds and its first receipt was always "k → 2k" (the input WAS the rule's number) — two tells a child could learn instead of testing; rounds 5 and 6 now use 3 → 9 (×3 fits) and 12 → 4 (÷3 fits). Re-measured by the critic's own oracle `work-c41/mp.js`: one tile fits both receipts in every round, every output whole 1 … 70, every missing input whole, and the forward-run wrong answer (24 for ▢ → 20, …) is always rejected; every output is a whole number 1 … 70; every missing input is a whole number ≥ 6.
- **Shortcut bots** (rule-finding): "take the first receipt's difference as the rule" — 9/9 in "+ and −" (correct reasoning for add/subtract rules) but 4/9 in "also ×"; "take the first receipt's ratio" — 5/9 in "also ×"; "pick the ×2 tile" — 1/9 ("also ×" r6 only), 0/9 in "+ and −". Only testing both receipts scores 9/9.
- **The honest tell, named:** in the "+ and −" setting the times/share tile is never the rule — a child who notices that can skip it (it still never solves a round: the two other decoys must be tested too). It is still the misconception's mirror (it fits receipt one), and the "also ×" setting removes the tell (×2 is the rule in r6 and a decoy in r2 and r7).
- **Answer position on screen:** the gate runs 2,000 seeded rack shuffles per setting → the rule tile in each of the four rack places 25 % ± 3 %; the decoy-fitting receipt is on top in 50 % ± 5 %.
- **Order:** order-only reshuffle per pass, never the same order twice; in "also ×" no more than two × rules in a row.

## 7. Check, the misses, the success
- **Rule phase:** cranking with no tile → the wheel turns but the ball waits in the funnel; hint **"Slot a rule tile first."** (no miss).
- **Rule phase — miss 1** (a tile rejected on a receipt): the mismatched ball sits in the reject bin beside the receipt's output ball, both numbers big ("14" vs "11"); the passed receipt (if any) keeps its stamp. Hint: **"It worked for one receipt but not the other. A rule must work for both."**
- **Rule phase — miss 2:** jump arrows appear on both receipts with their differences written ("+4", "+4" — or "+4", "+10" for a × rule, so the child sees the jumps are not the same). Hint (equal jumps): **"Both receipts jump by the same amount."** · (unequal jumps): **"The jumps are not the same. Try a times tile."**
- **Rule found:** both receipts stamped, the tile bolts into the slot (*clank*), the rack slides away. Bubble: **"The rule is {rule}!"**
- **Apply phase — Check:** the card's ball runs through the machine; if the outcome equals the typed number, the card stamps. **Miss 1:** the ball stops in the window; the card shows the rule step written under it ("9 + 4 = ▢"). Hint **"Do the rule to {in}: {in} {rule}."** **Miss 2:** the ball comes out and its number shows; the child types it to complete the card. Hint **"The machine made {out}."**
- **Missing input — Check:** the typed input is dropped into the funnel and cranked FORWARD. **Miss 1:** its real output comes out ("24 → 28, not 20") and the tile does a half-flip hint (shows its back edge). Hint **"That number comes out as {got}. Run the machine backwards to find what went in."** **Miss 2:** the tile flips fully to its back face ("−4") and the ball rises one turn; hint **"Backwards the rule is {inverse}: {out} {inverse}."**
- **A new tile, crank or keystroke** clears the showings until the next Check.
- **Success (round):** the parade: all the round's balls run forwards, then backwards, the tile flipping front/back; bubble **"{rule} forwards, {inverse} backwards!"** e.g. "+4 forwards, −4 backwards!"

## 8. Settings
1. **Rules:** "+ and −" (default) / "also ×". At rest the rack's tiles change (no × rules vs a mix) and the receipts' numbers grow.
2. **Ask:** "outputs only" / "outputs and one missing input" (default). At rest the task column shows three cards or three plus the `▢ → n` card, and the wheel shows a small ↺ arrow only in the second setting.

## 9. Words (EN source)
- **title:** "The Number Machine"
- **instruction:** "Find the rule that makes both receipts. Then use it on the new numbers."
- **instructionShort:** "Find the rule, then use it."
- **hints:** `noTile` "Slot a rule tile first." · `rule.more` "It worked for one receipt but not the other. A rule must work for both." · `rule.same` "Both receipts jump by the same amount." · `rule.notSame` "The jumps are not the same. Try a times tile." · `apply.more` "Do the rule to {in}: {in} {rule}." · `apply.most` "The machine made {out}." · `back.more` "That number comes out as {got}. Run the machine backwards to find what went in." · `back.most` "Backwards the rule is {inverse}: {out} {inverse}."
- **celebrations:** `rule` "The rule is {rule}!" · `round` "{rule} forwards, {inverse} backwards!"
- **settings:** "Rules" — "+ and −" / "also ×" · "Ask" — "outputs only" / "outputs and one missing input"
- **aria:** receipts "Receipt: {in} came out as {out}" + state "fits" / "does not fit"; slot "Rule slot: {rule}"; wheel `button` "Run forwards" / "Run backwards"; balls "Ball {n}".
- **Locale traps:**
  - **Rule glyphs** via `notation.js`: "×2" is "·2" in de/sv/da/no/fi; "÷2" is ":2" in de/it/nl/da/no/fi and "/2" in sv — and **never "÷" in sv** (old Swedish minus; Danish/Norwegian commerce reads "÷" as minus — a tile "÷2" could be read "minus 2" there, which is why those locales print ":"). "−" is the true minus sign U+2212 everywhere (never a hyphen).
  - **"receipt"** — a shop slip is a familiar picture word: de Kassenzettel/Bon, fr ticket, es tique/recibo, pt recibo/talão, it scontrino, nl bonnetje, sv kvitto, da kvittering/bon, no kvittering, fi kuitti — authors choose the child's everyday word.
  - **TTS of rules** ("plus four", "times three", "divided by two") is per-locale and only spoken in the 5 TTS locales; nothing depends on it.
  - **Input/output arrows** are drawn; no "in"/"out" words on the apparatus.
  - **Machine metaphor:** some curricula call it "Zahlenmaschine" (de), "machine à nombres" (fr), "máquina de números" (es/pt), "macchina dei numeri" (it), "rekenmachine" is WRONG in nl (= calculator) → nl "getallenmachine"; sv "talmaskin", da "talmaskine", no "tallmaskin", fi "lukukone".

## 10. Sound off, access, phones
- **Sound off:** stamps, the reject bin, numbers painted on balls, jump arrows with their differences, the flipped tile face — all drawn.
- **Keyboard:** Tab to tiles, Enter slots; → / ← crank one turn forwards / backwards; digits + Enter for cards; focus ring teal 3 px.
- **aria:** after every ball a polite live region: "9 came out as 13" / "14 does not match 11 — rejected"; the tile announces "front: plus 4" / "back: minus 4".
- **Taps:** tiles 80 × 56 (704) / 72 × 52 (360) / 66 × 50 (320); knob 44 × 44 and the whole wheel tappable (64 / 56 px); cards ≥ 48 tall; keys ≥ 50 × 44.
- **Pictures:** none (the machine, balls, receipts and tiles are apparatus geometry; the machine has no face).
- **Fold:** Check (keypad) at ≈ 620 px on 360 × 740, ≈ 560 px on 320 × 640 ✓.
- **Phone changes:** receipts side by side, rack one row, input cards in a row, the missing-input card replaces them at ≤ 340 px.

## 11. Distinct from
- **New 259 The Same-Way Machine (analogies, readiness):** a picture goes through, a dial stops, the child chooses what comes out of a second picture. No numbers, no rule tiles, no reverse. Here the rule is a physical tile tested against two receipts, and the tile's back face is its inverse.
- **Tool `exchange-machine`:** regroups ten ones into a ten (place value). **Tool `arrow-strip`:** a plan of moves predicts where a beetle stops. Neither tests a function rule against pairs nor runs one backwards.
- **New 257 The Test Frames:** sentence machines that act a word out. Not numbers.
- **Siblings in this batch:** #296 (also 3.OA.D.9) is about a parity pattern in sums; #290 finds an unknown inside an equation; #295 is the only one where a rule acts on many numbers and is inverted.

## 12. Build plan
- **Core state:** `{ setting:{rules,ask}, round:{ rule, receipts:[[in,out]×2], tray:[4], apply:[in×3], missing:{out} }, slot:null|tile, receiptState:[null|'fit'|'miss'×2], phase:'rule'|'apply'|'back'|'done', cards:[{in,typed,state}], misses, flipped:false }`.
- **Core functions:** `apply(rule, x)`; `inverse(rule)` (+k↔−k, ×k↔÷k); `testTile(tile)` → per-receipt fit; `crankForward()` / `crankBackward()` (sets `flipped`, runs the inverse); `checkCard(i)`; `checkMissing(typed)` = `apply(rule, typed) === out`.
- **Gate ground truth (`verify-number-machine-core.js`):** its own arithmetic: (1) for every round exactly one tray tile fits both receipts and it is the rule; (2) a first-receipt-only tile exists in every round; (3) every apply output and missing input is a whole number in range; (4) `inverse(inverse(r)) === r` and `apply(inverse(r), apply(r, x)) === x` for every rule and x in 1 … 30; (5) `checkMissing` rejects the forward-applied value (out + k, out × k) in every round; (6) the shortcut-bot table of §6 (difference / ratio / ×2) scores as stated; (7) 2,000 seeded shuffles → rule tile 25 % ± 3 % per place, decoy receipt on top 50 % ± 5 %; (8) `notation.js` glyphs render on tiles in all 11 locales ("÷" only in en/fr/es/pt).
- **Mutations:** a tile accepted after fitting one receipt · `inverse` of ×k returns −k · crank backward runs the rule forwards · `checkMissing` compares typed with out directly · the decoy tile removed from trays · rack not shuffled · receipt order fixed (decoy receipt always on top) · apply-phase miss 2 never shows the output (the child is stuck) · miss 1 shows the output (gives it away) · "÷" rendered in sv.
- **Local test:** real pointer drags of tiles and of the crank knob (clockwise, anticlockwise) at 320·360·412·704·768·1024·1366, every round of both settings; read the receipt states and card stamps.
- **Pictures:** none.
- **Risks:** a crank drag on a phone competes with page scroll — `touch-action: none` on the wheel only; the tap-to-turn fallback guarantees access.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a crank, gears, balls with numbers painted on, a reject bin that clunks, and a tile that flips over to run the machine backwards: a real toy.
2. **Would a teacher put it on the board?** Yes — "it fitted the first pair but not the second" happens in front of the class every round, and inverse operations become the back of the same tile.
3. **Would a parent trust it?** Calm, numerals and drawn geometry only, no characters, no timer; every wrong answer is a ball the child can see come out different.
4. **The invention:** "A number machine you crank by hand: a rule tile must make both receipts or a ball goes in the reject bin — and cranking backwards flips the tile to its undo, so a number comes out as the one that went in."

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- **Two learnable tells removed:** in "+ and −" the one-receipt decoy was ×2/÷2 in all nine rounds and the first receipt was always "k → 2k" (its input was the rule's number). Rounds 5 and 6 now use 3 → 9 (×3 fits) and 12 → 4 (÷3 fits).
- Re-solved all 18 rounds with my own oracle (work-c41/mp.js): exactly one tile fits both receipts, a first-receipt-only tile in every round, all outputs and missing inputs whole, the forward-run wrong answer always rejected; difference/ratio/×2 bots match the claims.
- Distinctness checked against new/259 The Same-Way Machine: shared machine look only — no numbers, rule tiles, reject bin or reversible tile there.
