# Row 31 — Dewey's Ten-Tank → THE GHOST RAFTS (K.NBT.A.1)

## 0. Identity
- id `ten-tank.ten-frame-tank.k-nbt-a-1` (KEPT; slugs/metadata frozen) · grade K · CCSS K.NBT.A.1 · Number & Operations in Base Ten · own files `ghost-rafts-core.js`, `ghost-rafts-activity.js`, `ghost-rafts-activity.html`, `ghost-rafts-activities.json` (the row leaves `ten-tank-activities.json`; the id is unchanged). Slugs exist en/de/fr/es/pt/it/nl; sv/da/no/fi slug, title and intro are new at build (grade: förskoleklass / børnehaveklasse / 1. trinn / esiopetus–1 per the reviewer).
- page title (frozen): "Dewey's Ten-Tank — Make a Ten and Some Ones (Kindergarten)"; intro (frozen) promises: Dewey the duckling, a pond-tank, glowing bubbles, the tenth bubble making ten SEAL into one ten-raft, leftover bubbles as "and some more", build / take apart / compare 11–19, recorded 10 + N. **Every one of these stays true** (Dewey is now the library duckling picture, not a drawn stub).
- worksheets mapped: none.
- old activity: seven round types (seal, place-a-ready-ten, decompose, regroup, repair, compose-from-audio, compare) on a double ten-frame tank with an SVG stub duck. Kept: the seal, the ten-raft, the seven acts folded into five round kinds, the 10 + N record, the 8 targets (10, 13, 15, 16, 12, 14, 17, 18 and the 13/18 compare). Dropped: the hand-drawn duck, the tap-anywhere-to-drop-a-bubble input.

## 1. The pitch
"The bubbles drift too much to count, so you catch ten on Dewey's raft — and if you pick the wrong number card, its ghost builds what that number really means right beside your tank."

## 2. Why a child will want it again (the fun)
- **Bubbles that won't hold still.** Loose bubbles float in the tank with a slow drift and bob (each its own gentle path, never faster than 12 px/s). You can't count them in place — you have to catch them. Grabbing one makes it squish slightly under the finger.
- **The raft.** A ten-seat raft (2 × 5 seats) floats at the top of the tank. Each bubble dropped on a seat sits with a little "plip". On the 10th, the ten bubbles flash, melt together and SEAL into one shimmering raft-bar with a chord (C–E–G); Dewey the duckling hops from the bank onto it. The ten has become ONE thing.
- **The ghost bay.** Beside the tank is a misty bay. The number cards are not just answers: tap one and drop it on the record, and if it's wrong, its ghost appears in the bay — "41" builds four ghost rafts and one ghost bubble; "4" builds four ghost bubbles and no raft at all. Children start choosing wrong cards ON PURPOSE in free play to see the ghosts — which is exactly the lesson.
- **The paddle lap.** On success Dewey paddles the raft once round the tank, the leftover bubbles trailing behind like ducklings (1.6 s).
- **Pop!** In take-apart rounds you can pop a sealed raft: it bursts back into ten loose bubbles with a soft fizz and they drift off.

## 3. The skill and the misconception
- **Skill (K.NBT.A.1):** compose and decompose 11–19 into ten ones and some further ones, and record it (10 + 4 = 14).
- **Misconception 1: digit reversal** (14 read or written as 41; teen words in en/de/nl/sv/da/no/fi say the ones first). **Push back:** the reversed card builds its own meaning in the ghost bay: 4 rafts + 1 bubble beside the real 1 raft + 4 bubbles — impossible to mistake.
- **Misconception 2: the 1 means one** (picking "4" or "5" because the child counts only the loose ones, or sees the raft as one bubble). **Push back:** the "4" card's ghost has NO raft — the child sees the raft missing from the ghost.
- **Misconception 3: a ten is not still ten ones.** **Push back:** take-apart rounds pop a raft into ten loose bubbles; the record stays the same number.

## 4. The stage
Layout `split` at ≥ 700 px (tank left, record + cards + bubble right); stacked below.

**At 704 px:**
- **Task line** 22 px.
- **The tank** (drawn geometry): a rounded glass rectangle 440 × 330 px, teal 3 px outline, pale water fill #DDF1EE with two faint wave lines. The **raft**: a plank frame 2 × 5 seats, seats 48 px circles, frame 290 × 122 px, floating at the top of the tank. A sealed raft is a bar 290 × 54 px (golden plank with ten small light dots in a row of 5 + 5 — the ten is still visible as ten).
- **Bubbles:** drawn circles 42 px, coral #F2784B with a white highlight arc and a soft glow (the "glowing bubbles"). Loose ones drift in the lower 200 px of the tank.
- **Dewey:** library picture **farm-animals/duckling** (seen: a yellow duckling, wings open, clean edges), 96 px, on the bank (a cream ledge at the tank's top-left corner). On the sealed raft he sits at its left end at 72 px (the raft bar is a stage element, he is a picture — still ≥ 64).
- **Ghost bay:** to the right of the tank, inside the same apparatus column, 150 × 330 px, a misty dashed-outline area. Ghosts are the same shapes at 35 % opacity, scaled 0.6 (ghost raft 174 × 32, ghost bubble 26 px).
- **The reeds** (ready-ten and repair rounds): a strip under the tank 440 × 64 px holding ready sealed rafts and spare loose bubbles.
- **Right column (196 px):** the **record strip** "10 + ☐ = ☐" as two-to-three boxes (numerals 30 px; the "10" is printed, it belongs to the raft) → the **number cards** (3 cards 88 × 64 px, numerals 36 px, stacked) → bubble (≤ 3 lines) → speaker.

**At 360 px:** stacked: task line → tank 328 × 280 (seats 40 px, bubbles 38 px, raft 230 × 100) with the ghost bay as a 328 × 70 strip BELOW the tank (ghosts in a row: rafts as 44 × 14 bars, bubbles 16 px) → reeds 328 × 56 → record strip + 3 cards in a row (100 × 60) → bubble → Check. Dewey 64 px. Check bottom ≈ 700 px at 360×740; at 320×640 the reeds merge into the tank floor and the ghost bay overlays the tank's top-right (the raft moves left) so Check is at ≈ 610 px.

**Words on the apparatus:** numerals only (and in Word rounds the number word on the card — content).

## 5. The hand
- **Drag a loose bubble:** it lifts with a squish (scale 1.1 × 0.92 then back, 120 ms), follows the finger; drop on a free raft seat → "plip" (pitch rises per seat) and it sits; drop elsewhere in the tank → it resumes drifting from there.
- **Tap a loose bubble:** it hops onto the next free seat by itself (for children who find dragging hard) — still one bubble per touch.
- **Tap a seated bubble:** it floats off the seat back into the water.
- **10th seat:** the seal (400 ms flash + melt), chord, Dewey hops on (arc 500 ms).
- **The tow-line (critic: leftovers that keep drifting could never be counted, so the "and some more" would be a guess):** the moment the raft seals, every bubble still loose stops drifting, glides to the raft's tow-line and hooks on in one straight row behind it, 6 px apart, like ducklings behind their mother (60 ms apart, a soft "plink" each). Before the seal nothing in the tank can be counted in place; after it, the ten is ONE raft and the some-more is a row — the structure is what makes the number readable. Popping a raft lets its ten bubbles drift loose again; the tow-line row stays put.
- **Drag a ready raft from the reeds** into the tank: it docks at the top (only one raft fits — a second wiggles back: "one ten is enough for these numbers").
- **Pop a sealed raft:** press and hold it 600 ms (a ring fills round the finger) → it bursts into ten loose bubbles; Dewey hops back to the bank.
- **Drag a number card onto the record's answer box:** it clicks in; if wrong, its ghost builds in the bay (bars and bubbles appear one by one, 80 ms each) — see §7.
- **Free play ("Ghost bay"):** any card 11–99 can be dropped on the record and its ghost builds (up to 9 rafts and 9 bubbles); the tank can be filled freely. This is the exploration toy.

## 6. The rounds
Five round kinds (the old seven acts folded in):
- **CATCH** (old seal/onramp): N loose bubbles drift; catch ten → seal; then choose the number card.
- **DOCK** (old ready-ten/audio/compose): a number is given on a card at the top of the record ("17"); the reeds hold 1 ready raft + 9 spare bubbles; dock the raft and add the right number of bubbles; Check.
- **FIX** (old repair): the tank already holds a raft + some bubbles that do NOT match the given number; add or remove bubbles until it does.
- **POP** (old decompose/regroup): the tank holds a sealed raft + k bubbles and the record shows "10 + k = ?"; the child pops the raft and the task asks to drop the number card that tells how many bubbles NOW — still the same number (conservation of the ten).
- **TWO TANKS** (old compare): two smaller tanks side by side, each with a sealed raft and some bubbles; tap the tank with more; the success shows both records.

**Level "Up to 19" (default) — 9 rounds:**
| # | kind | number | cards offered (slot order before shuffle) |
|---|---|---|---|
| 1 | CATCH | 13 | 13 · 31 · 14 |
| 2 | DOCK | 15 | — (build) |
| 3 | CATCH | 16 | 16 · 61 · 6 |
| 4 | FIX | 14 (tank starts 10 + 2) | — (build) |
| 5 | POP | 12 | 12 · 2 · 10 |
| 6 | CATCH | 18 | 18 · 81 · 17 |
| 7 | DOCK | 17 (number given as a WORD card in the Words setting) | — |
| 8 | TWO TANKS | 13 vs 18 | — (tap the tank) |
| 9 | CATCH | 11 | 11 · 10 · 1 |

**Level "Up to 15" — 9 rounds:** CATCH 12 (12·21·2) · DOCK 11 · CATCH 14 (14·41·15) · FIX 13 (starts 10 + 5) · POP 15 (15·51·5) · CATCH 15 (15·5·10) · DOCK 13 · TWO TANKS 12 vs 14 · CATCH 11 (11·10·1).

(The old onramp "make 10" is free play only: a ten alone is not a teen. No 0 anywhere; 10 appears only as the printed raft value and as a distractor card.)

**Answer position, measured:** card rounds (5 per level). Decoys are of four kinds, each a real misconception: the reversal (31 for 13), ones-only (2 for 12 — forgot the raft), ten-only (10 — forgot the bubbles), neighbour (14 for 13 — miscounted). (a) **Slot:** the right card's slot (top/middle/bottom) is rotated so each slot holds it at least once and at most twice per pass. (b) **Size rank:** among the three cards the right one is smallest / middle / largest — Up to 19: smallest 1 (13·14·31), middle 2 (6·16·61, 17·18·81), largest 2 (2·10·12, 1·10·11); Up to 15: smallest 1 (14·15·41), middle 2, largest 2 — so no rank holds the answer in more than 2 of 5 rounds and "pick the middle-sized one" fails. (c) **Decoy kind:** the reversal appears in 2–3 of 5 rounds, never in all. The gate computes (a)–(c) from the data over 10 000 shuffle seeds. TWO TANKS: the bigger number's tank is left in one level and right in the other, and swapped per pass by a coin.

**Order:** order-only reshuffle per pass; never the same order twice; the first round of a pass is always a CATCH (the seal is the hook).

## 7. Check, the misses, the success
- **Check with nothing done:** no miss. CATCH: a bubble near the raft gets a soft pulse; bubble: **"Catch the bubbles on Dewey's raft. Ten seats make a ten."** DOCK/FIX: the reeds' raft pulses.
- **CATCH/POP — a wrong card on the record:** the card's **ghost builds in the bay**, piece by piece, next to the real tank: "31" → three ghost rafts + one ghost bubble; "3" → three ghost bubbles and no raft; "17" (for 18) → one ghost raft + seven ghost bubbles, and the one real bubble that has no ghost partner glows. Bubble: **"That card means {31}: look at its ghost. Does it match the tank?"** The card returns to the tray after 1.5 s; the ghost fades on the next move. This is miss 1.
- **Miss 2:** the real tank's raft gets a gold badge "10" and each loose bubble a tiny white numeral counting on from 11 (11, 12, 13); bubble: **"One ten and {k} more."**
- **DOCK/FIX — Check with the wrong build:** miss 1: the given number's ghost appears in the bay (what it should look like) beside the real tank; bubble **"Make your tank look like the ghost."** Miss 2: the ghost bubbles that are missing (or extra real bubbles) blink; **"You need {k} bubbles beside the raft."**
- **TWO TANKS wrong tap:** miss 1: both tanks' rafts flash together ("same ten!"), then the loose bubbles line up in two rows one-to-one under the tanks so the extra ones stand alone; **"Both have one ten. Who has more bubbles left over?"** Miss 2: the extra bubbles glow.
- **Help clears** on any new move.
- **Success:** the record fills "10 + 4 = 14" (the numerals pop in left to right), Dewey paddles the lap, the leftover bubbles trailing. Bubble: **"Ten and 4 more make 14!"** POP success: **"Still 14 — ten loose bubbles and 4 more."** TWO TANKS: **"18 is more than 13: the same ten, but 8 more instead of 3."**

## 8. Settings
1. **Numbers:** Up to 15 / Up to 19 (default Up to 19) — the first round's bubble count at rest changes.
2. **Number cards:** Digits / Words (default Digits) — in Words the cards and the DOCK prompt show the number word ("fourteen"), the record still in digits — the word-to-structure link for locales whose teen words reverse.

## 9. Words (EN source)
- on-screen title: **Dewey's Ten-Tank**
- instruction: **Catch ten bubbles on Dewey's raft. Ten bubbles seal into one ten-raft — the rest are the "and some more".**
- prompts: CATCH **How many bubbles? Catch ten first.** · DOCK **Make {n} in the tank.** · FIX **Fix the tank so it shows {n}.** · POP **Pop the raft. How many bubbles now?** · TWO TANKS **Which tank has more?**
- hints: **Catch the bubbles on Dewey's raft. Ten seats make a ten.** · **That card means {m}: look at its ghost. Does it match the tank?** · **One ten and {k} more.** · **Make your tank look like the ghost.** · **You need {k} bubbles beside the raft.** · **Both have one ten. Who has more bubbles left over?** · reeds: **One ten is enough for these numbers.**
- success: **Ten and {k} more make {n}!** · **Still {n} — ten loose bubbles and {k} more.** · **{a} is more than {b}: the same ten, but {ka} more instead of {kb}.**
- free play: **Ghost bay**
- settings: **Numbers** — **Up to 15** / **Up to 19** · **Number cards** — **Digits** / **Words**

**Locale traps:**
- **Teen words that say the ones first** (en four-teen, de vier-zehn, nl veer-tien, sv fjor-ton, da/no fjor-ten, fi neljä-toista) make the 41 reversal likely — the reason the reversed card is a decoy and the ghost is the answer. fr/es/it/pt 11–16 are opaque words (quatorze, catorce, quattordici, quatorze) and 17–19 say ten first (dix-sept, diecisiete, diciassette, dezessete) — in those locales the Words setting is the harder one; the round table is the same.
- Number words for 11–19 (and 11–99 in free play) come from `scripts/worksheet-gen/lib/number-words.js` — the reviewed tables the worksheets use (copied at build; byte-equal gate), checked against the old activity's en/de/fr/es/pt/it/nl words; for the record: sv elva…nitton, da elleve…nitten, no elleve…nitten, fi yksitoista…yhdeksäntoista. pt-BR "dezesseis/dezessete/dezenove" (not pt-PT "dezasseis").
- "Dewey" stays the name in all locales that already have a frozen title containing it (en; the existing de/fr/es/it titles "Deweys Zehner-Tank", "Le réservoir de Dewey", "El tanque de decenas de Dewey", "La vasca di Dewey"); pt "Dudu" and nl "Dobber" are the frozen names in those titles — the on-screen strings use the SAME name as the locale's frozen title. sv/da/no/fi choose a name with the reviewer (a duckling name natural to children; it must not collide with a real brand).
- "ten" as a unit noun: de "Zehner", fr "dizaine", es/pt "decena/dezena", it "decina", nl "tiental", sv "tiotal", da "tier", no "tier", fi "kymppi/kymmenen" — the success frame uses the natural classroom word; agreement with numerals (fi partitive) handled per frame.

## 10. Sound off, access, phones
- Legible silent: bubbles, raft, ghosts, record strip.
- Keyboard: Tab to the tank → Space catches the next bubble onto the next seat; Delete releases the last seat; P pops a sealed raft; Tab to cards → Enter drops on the record; Tab between the two tanks → Enter chooses.
- aria: "Raft, {k} of 10 seats filled" (after Check in task mode only), "Sealed ten-raft", cards "{n}" / the word; live region reads ghost descriptions ("Ghost: three rafts and one bubble").
- Taps: bubbles 42/38 px with 48 px hit areas; cards ≥ 60 px tall; Dewey is not a control.
- Reduced motion: bubbles do not drift (they sit scattered), the seal is an instant swap, the lap is skipped.

## 11. Distinct from
- **#30 Overflow Trays** (this batch): numeral → quantity by pouring into trays that fill top-first. The Ten-Tank goes **quantity → numeral**: a drifting, uncountable pile that the child must structure by catching ten, then the **ghost bay** where every written number builds its own meaning.
- **place-value-lab / counting-cups / exchange-machine (tools):** grouping and regrouping workmats; none renders a wrong numeral's meaning beside the child's model.
- **#13 Roll Book / #1 Counting Table:** counting a set, not unitizing.

## 12. Build plan
- **Core state:** `{ level, cardsMode, order[], idx, kind, n, tank:{raft:0|1, seats:int, loose:int}, reeds:{rafts:int, loose:int}, cards[], record:null|card, ghost:null|{rafts,ones}, tanks2:[{n},{n}], misses }`.
- **Functions:** `catchBubble()`, `release()`, `seal()` (when seats === 10), `pop()`, `dock()`, `value(tank) = raft*10 + seats + loose`, `ghostOf(m) = {rafts: floor(m/10), ones: m % 10}`, `dropCard(m)` → `{ok, ghost}`, `check()`, `nextTask(index)`.
- **Gate `verify-ghost-rafts-core.js` (own oracle):** (1) `seal` happens exactly at the 10th seat and the sealed raft counts 10; (1b) no loose bubble is still drifting once a raft is sealed (all are on the tow-line, in a row) and none is on the tow-line before; (2) `pop` preserves the value; (3) `ghostOf` correct for 1–99 (exhaustive) and a ghost has a raft iff m ≥ 10; (4) every CATCH/POP round offers exactly one right card and two decoys of the named kinds (reversal / ones-only / ten-only / neighbour), each decoy ≠ the right number; (5) slot balance and rank-spread rules (§6) over 10 000 seeds; (6) every target in 11–19, never 0; (7) TWO TANKS: both tanks have exactly one raft; (8) the success numbers equal the tank state; (9) Words mode shows the reviewed word table.
- **Mutations:** seal at 9; pop loses a bubble; ghost of 41 shows 1 raft + 4; accept the reversal; allow a second raft for teens; count drifting bubbles in the aria during the task; put the right card always in slot 1; make every decoy a reversal; TWO TANKS with different raft counts; success sentence from the card instead of the tank; drop the drift cap (bubbles too fast to catch).
- **Pictures to verify:** farm-animals/duckling (seen on the contact sheet). Everything else is apparatus.
- **Risks:** drifting targets on small phones — the drift speed cap (12 px/s) and the tap-to-seat path keep it accessible; reduced motion freezes drift. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — chasing bobbing bubbles, the seal chord, Dewey riding the raft, popping rafts, and summoning ghosts with wrong cards is play they will repeat on purpose.
2. **Would a teacher put it on the board?** Yes — "Is it 14 or 41?" Drop 41: four ghost rafts appear. The reversal argument is settled by a picture, not by the teacher.
3. **Would a parent trust it?** Library duckling, calm motion, no score, no words on the apparatus.
4. **The invention:** you catch drifting bubbles until ten seal into one raft, and any number card you choose builds its own ghost beside the tank, so a wrong number shows what it really means.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **The "some more" became countable:** in the old text the leftover bubbles kept drifting after the seal, so a CATCH round asked the child to count 3–8 moving bubbles — a guess, not place value. Now the seal stops every loose bubble and hooks it onto the raft's **tow-line** in one row behind Dewey's raft: the ten is one raft, the ones are a row. Gate rule 1b + the drift-stop in §5.
- **Number words reuse `lib/number-words.js`** (the worksheets' reviewed tables, byte-equal gate) rather than separate tables.
- Kept as excellent: the ghost bay (a wrong card builds what it really means — 41 as four rafts and one bubble), the five decoy kinds, slot/rank balancing, the frozen-title name per locale.
