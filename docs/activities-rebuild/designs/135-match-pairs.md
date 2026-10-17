# Row 135 — Add It Both Ways → THE LEAPFROG PARTS (1.OA.B.3)

## 0. Identity
- id `match-pairs.add-it-both-ways.1-oa-b-3` (KEPT; slugs/metadata frozen in all 11 locales) · grade 1 · CCSS 1.OA.B.3 · Operations and Algebraic Thinking · own files `leapfrog-parts-core.js`, `leapfrog-parts-activity.js`, `leapfrog-parts-activity.html`, `leapfrog-parts-activities.json` (the row leaves `match-pairs-activities.json`; the id is unchanged; other match-pairs rows untouched).
- page title (frozen): "Add It Both Ways"; intro (frozen) promises: adding in any order makes the same total (the commutative property); match each addition to the same numbers added the other way (4 + 7 and 7 + 4); "tap an addition, then tap its swapped twin, and watch the pair link". **All kept true.**
- worksheets also covered: **G1-113** Fact Families · **G1-209** Fact Family Houses · **G1-219** Fact Families to 10 · **G1-220** Fact Family Houses to 20 · **G1-221** Fact House Practice to 10 · **G1-222** Fact Families: Missing Partners — through their two TWIN relations: the two additions of a family are turnaround twins (the parts swap round the "+"), and the two subtractions are take-away twins (the parts swap round the "="). Building all four facts from one whole is #248 Fact Family Bar's job; this activity owns the "both ways" half of every family and the rule that ties them: **the two parts can always trade places — the whole never moves.**
- old activity: eight tasks of six cards (three turnaround pairs), tap-to-pair with a link animation. **Kept:** tap one, tap its twin, watch them link; three pairs per round; every old pair reappears in one of the two levels (to 20: 4 + 7, 5 + 9, 4 + 8, 6 + 9, 3 + 8, 3 + 9, 6 + 7, 2 + 9, 5 + 8, 4 + 9, 6 + 8; to 10: 3 + 6, 2 + 8, 1 + 7, 2 + 5, 1 + 4, 4 + 6, 1 + 8, 3 + 7, 1 + 5, 2 + 6, 3 + 5, 1 + 9), and the old first and third tasks are kept whole as the to-20 talking rounds. **Changed:** the two parts on every card are blocks of snap-cubes that can leapfrog over the sign; a twin is the card you get by leapfrogging — so the match is made by doing the swap and checked by fit, and in most rounds all three pairs have the SAME total, so the total alone can never find a twin.

## 1. The pitch
"Pick a card, then the card you think is its twin — on the way over, its two numbers leapfrog across the plus sign, each carrying its own cubes — 4 + 7 becomes 7 + 4 with nothing gained or lost — and it only settles onto its true twin."

## 2. Why a child will want it again (the fun)
- **Leapfrog!** Each part of a card is a little block of snap-cubes with its numeral riding on top. Send a card to its twin and, in flight, the second block jumps right over the first one in a bouncy arc ("boing!"), landing in front; the "+" stays in the middle. It is a playground game done by numbers.
- **The settle.** The leapfrogged card glides onto the twin the child tapped and, if it is the twin, settles exactly — numeral on numeral, every cube on a cube — with a soft double "click-clack"; the two cards fuse into a twin plate "4 + 7 = 7 + 4" and slide up to the twin shelf.
- **The near miss.** Send 7 + 4 onto 8 + 3: both rows of cubes are 11 long, but the place where the colours change is one cube apart, and that cube glows and wobbles; the numerals don't match either. "Same total, different numbers!" is seen, not told.
- **The stubborn minus.** In take-away rounds, tap the "−" and the whole and the part try to leapfrog — and bounce back ("bonk"): the whole is too big to jump over its own part. Only the two parts (either side of the "=") can trade places. Children try it again and again.
- **The propellers.** Three twins found and the three twin plates spin like propellers together. A small, earned show.
- **Free play ("Cube box"):** set any a + b with two dials, leapfrog it as often as you like, watch the total bar stay exactly the same length.

## 3. The skill and the misconception
- **Skill (1.OA.B.3 as the page means it):** the commutative property of addition — a + b = b + a — as a strategy (knowing 8 + 3 = 11 means knowing 3 + 8 = 11); with the fact-family worksheets: w − a = b and w − b = a are the take-away twins of one whole.
- **Misconception 1 — "same total" means "same numbers"** (matches 4 + 7 with 3 + 8 because both are 11). **Push back:** in most rounds all six cards make the same total; a leapfrogged card sent to a same-total impostor lies the same length but its colour change sits on a different cube and its numerals differ — the mismatch glows, the card hops home.
- **Misconception 2 — the order changes the total** (thinks 7 + 4 is more than 4 + 7). **Push back:** the leapfrog moves the very same cube blocks; the card's total bar (a thin line under the cubes, end to end) does not change length by a pixel as they jump.
- **Misconception 3 — subtraction can be turned round too** (4 − 11). **Push back:** the "−" is not a hinge: the whole and the part bounce back when they try to swap. The take-away twins come from the parts trading places across the "=" (11 − 4 = 7 ↔ 11 − 7 = 4), while the whole stays first.

## 4. The stage
Layout single column at all widths (six cards fill the stage).

**At 704 px:**
- **Task line** (22 px): the prompt (§9).
- **Six cards** in a 3 × 2 grid (three rows, two columns), each card 320 × 112 (drawn cream card, 3 px ink outline, 12 px radius), 16 px gaps (660 × 368):
  - **Turnaround cards:** two **part blocks** side by side — each a block of snap-cubes (26 px cubes to 10 / 15 px to 20, max 19 cubes in a card = 285 px) with its numeral (Baloo 2 30 px) riding on a small tag above it — and the "+" (28 px) on a tag between the two tags. **Colour by size:** the smaller part's cubes are always coral (#F2784B), the larger part's always teal (#2E9C88) on every card, so a card and its twin show the same colours; a thin **total bar** (2 px ink) runs under all the cubes.
  - **Take-away cards (full facts):** "11 − 4 = 7": the **whole** block (11 cubes in a grey frame) under "11", then the "−"; the subtracted part's cubes (4) are drawn LIFTED above the right end of the whole (dashed, pale) and tagged "4"; the "=" and the remaining part "7" tagged over the solid rest of the whole. The parts are coloured by size (4 coral, 7 teal) as on turnaround cards.
- **The twin shelf** under the grid (660 × 60): three empty plate outlines; matched twin plates (300 × 48, "4 + 7 = 7 + 4" 24 px) slide in.
- **Bubble** (≤ 2 lines) → speaker.

**At 360 px:** task line → cards in one column of six, each 336 × 80 (numerals 24 px, cubes 22 px to 10 / 15 px to 20; 19 × 15 = 285 px fits), 8 px gaps (≈ 528 px) → shelf as three dots beside the progress chip → bubble → Check. Check ≈ 700 px at 360 × 740. **At 320 × 640:** cards 300 × 70 (numerals 20 px, cubes 19 / 13 px), Check ≈ 630 px.

**Words on the apparatus:** none — numerals, + − =, cubes.

## 5. The hand
- **Choose first, then the leapfrog proves it** (critic: in the first draft the card leapfrogged the moment it was picked, so the child then only had to find the card that LOOKED IDENTICAL — a picture-matching task in which no one had to know that 4 + 7 and 7 + 4 are the same sum. Commutativity has to be the child's prediction, and the leapfrog its proof.)
- **Tap a card** (the "tap an addition" of the intro): within 60 ms it lifts 6 px and glows; it does NOT change yet. Tap it again to put it down.
- **Tap a second card** (the twin the child predicts): the lifted card glides over it (300 ms) and, in flight, **its leapfrog plays** (500 ms): the right block with its tag jumps in an arc over the left block and the "+", landing on the left; the left block slides right to fill the gap; the total bar stays fixed. Take-away card: the two PART tags (the lifted 4 and the remaining 7) trade places across the "=" — the lifted cubes drop back, the other part lifts — while the whole and "−" stay put (11 − 4 = 7 → 11 − 7 = 4). Then it lays itself on top of the chosen card, left edges aligned:
  - **twins** — every tag and every cube coincide: "click-clack", a gold link-bar, the two cards fuse into a twin plate that slides to the shelf (500 ms);
  - **same length, different parts** — the cubes whose colours disagree glow coral and the two colour-change points are joined by a coral bracket; the numerals that differ flash; after 1.4 s the card glides home and leapfrogs back. A miss (§7);
  - **different total** — the longer row's overhang glows coral (or the shortfall shows dashed); it goes home. A miss.
- **Tap the "−" on a take-away card:** the whole and the part start to jump and bounce back with a "bonk" (400 ms). Not a miss — a discovery.
- **Drag** works too: drag a card onto another; the leapfrog plays as it is dropped.
- **Test leapfrog** (the long-press on a lifted card, or the L key): the card leapfrogs in place and back once (1 s) so a child can watch the swap before choosing; using it is free but it is not needed, and it never counts as a pick.
- **Undo:** tap a twin plate on the shelf to send both cards back.
- **Free play ("Cube box"):** two dials set a and b; a big leapfrog button swaps them; the total bar is drawn with its numeral fixed under the cubes.

## 6. The rounds
A round = six cards = three twin pairs placed in the grid. Never a double (n + n leapfrogs into itself). Never 0.

**Turnaround rounds, "To 10":**
| # | pairs (each card and its leapfrog twin) | totals |
|---|---|---|
| 1 | 1 + 9 · 2 + 8 · 3 + 7 | all 10 |
| 2 | 1 + 8 · 2 + 7 · 4 + 5 | all 9 |
| 3 | 1 + 7 · 2 + 6 · 3 + 5 | all 8 |
| 4 | 1 + 6 · 2 + 5 · 3 + 4 | all 7 |
| 5 | 4 + 6 · 3 + 6 · 2 + 4 | 10, 9, 6 (talking round) |
| 6 | 1 + 5 · 2 + 4 · 1 + 3 | 6, 6, 4 |
| 7 | 2 + 7 · 3 + 6 · 1 + 5 | 9, 9, 6 |
| 8 | 4 + 6 · 1 + 9 · 3 + 4 | 10, 10, 7 |
| 9 | 1 + 4 · 2 + 3 · 1 + 2 | 5, 5, 3 |

**Turnaround rounds, "To 20"** (holds the old pairs):
| # | pairs | totals |
|---|---|---|
| 1 | 4 + 7 · 3 + 8 · 2 + 9 | all 11 |
| 2 | 3 + 9 · 4 + 8 · 5 + 7 | all 12 |
| 3 | 4 + 9 · 5 + 8 · 6 + 7 | all 13 |
| 4 | 5 + 9 · 6 + 8 · 4 + 10 | all 14 |
| 5 | 6 + 9 · 7 + 8 · 5 + 10 | all 15 |
| 6 | 4 + 7 · 3 + 6 · 2 + 8 | 11, 9, 10 (the old first task, talking round) |
| 7 | 7 + 9 · 6 + 10 · 5 + 11 | all 16 |
| 8 | 2 + 5 · 6 + 9 · 3 + 8 | 7, 15, 11 (the old third task) |
| 9 | 8 + 9 · 7 + 10 · 6 + 11 | all 17 |

**Take-away twin rounds** (setting "Take-away twins"): each pair is w − a = b and w − b = a for one whole w.
- **To 10:** 1) w 10: (1, 9) (2, 8) (3, 7) · 2) w 9: (1, 8) (2, 7) (4, 5) · 3) w 8: (1, 7) (2, 6) (3, 5) · 4) w 7: (1, 6) (2, 5) (3, 4) · 5) w 10: (4, 6) (1, 9) (2, 8) · 6) w 6: (1, 5) (2, 4) and w 5: (1, 4) · 7) w 9: (3, 6) (1, 8) (2, 7) · 8) w 10: (3, 7) (4, 6) (1, 9) · 9) w 5: (1, 4) (2, 3) and w 6: (1, 5). E.g. round 1 cards: 10 − 1 = 9, 10 − 9 = 1, 10 − 2 = 8, 10 − 8 = 2, 10 − 3 = 7, 10 − 7 = 3.
- **To 20:** 1) w 11: (2, 9) (3, 8) (4, 7) · 2) w 12: (3, 9) (4, 8) (5, 7) · 3) w 13: (4, 9) (5, 8) (6, 7) · 4) w 14: (5, 9) (6, 8) (4, 10) · 5) w 15: (6, 9) (7, 8) (5, 10) · 6) w 16: (7, 9) (6, 10) (5, 11) · 7) w 17: (8, 9) (7, 10) (6, 11) · 8) mixed wholes: 11 − 4 / 11 − 7, 9 − 3 / 9 − 6, 10 − 2 / 10 − 8 · 9) w 12: (2, 10) (3, 9) (5, 7).
- **Mixed** setting: rounds alternate a turnaround round and a take-away round (kinds never mix inside one round, so every card has exactly one twin).

**Answer position:** the six cards are placed by drawing one of the **15 possible pairings of the six grid places uniformly at random** (critic, enumerated in `work-c22/m135.js`: the first draft's rule — same-row twins ≤ 1 per round AND every relation 25–45 % — cannot both hold: in a 3 × 2 grid same-row pairs are only 3 of 15 place-pairs, so the shares come out row 14 % / column 43 % / diagonal 43 %, failing its own gate). With the uniform draw, a card's twin TOUCHES it (edge to edge) in 46.7 % of rounds — exactly the rate at which any other card touches it — so "the twin is the one next to me" is worth nothing. Which card of a pair shows coral-first is a coin flip per pair (so three coral-first and three teal-first is not forced and cannot be used to pair). The gate measures over 10 000 shuffles: twin-touch rate within 46.7 ± 3 %; every one of the 15 pairings drawn 6.7 ± 1 %; no card repeated within a round; no doubles, no 0.
**Order:** order-only reshuffle per pass (never the same order twice); the first round of a pass is never a talking round.

## 7. Check, the misses, the success
- **Check before three twins are found:** no miss. An unmatched card wiggles; bubble: **"Tap a card, then tap its twin."**
- **Miss 1 (a wrong pair):** the laid card shows it — coral cubes and the colour-change bracket, or the overhang — and hops home. Bubble: same total **"Same total, but not the same numbers."** · different total **"Not the same total — one row sticks out."**
- **Miss 2 (second wrong try with the same first card):** the lifted card leapfrogs in place and stays leapfrogged above its place for the rest of the attempt, glowing, so the child can compare it card by card; the numerals of its two parts are underlined on every card in the grid where they appear. Bubble: **"Find the card that looks exactly like this one now."** (Only now does the picture-match become available — as the help, not the task.)
- **A new pick takes the help away** until the next miss.
- **Success (each pair):** click-clack, the gold link, the twin plate slides to the shelf; bubble reads it: **"4 + 7 = 7 + 4. The parts swapped — still 11!"** (take-away: **"11 − 4 = 7 and 11 − 7 = 4 — the parts swapped, the 11 stayed."**). **Round complete:** the three twin plates spin like propellers: **"Three twins! Add both ways — the total stays the same."**

## 8. Settings
1. **Numbers:** To 10 / To 20 (default To 20, the old content) — the cube size and the numbers on the cards change at rest.
2. **Cards:** Turnarounds / Take-away twins / Mixed (default Turnarounds) — at rest the cards show "+" expressions or full "−" facts with lifted parts.

## 9. Words (EN source)
- on-screen title: **Add It Both Ways**
- instruction: **Tap a card, then tap the card you think is its twin. On the way its two numbers leapfrog and swap places — twins fit cube on cube.**
- prompt (task line): turnarounds **Find the twin that adds the same numbers the other way.** · take-aways **Find the twin that takes away the other part.**
- hints: **Tap a card, then tap its twin.** · **Same total, but not the same numbers.** · **Not the same total — one row sticks out.** · **Find the card that looks exactly like this one now.**
- success: **{a} + {b} = {b} + {a}. The parts swapped — still {s}!** · **{w} − {a} = {b} and {w} − {b} = {a} — the parts swapped, the {w} stayed.** · **Three twins! Add both ways — the total stays the same.**
- free play: **Cube box**
- settings: **Numbers** — **To 10** / **To 20** · **Cards** — **Turnarounds** / **Take-away twins** / **Mixed**

**Locale traps:**
- **Leapfrog** is a known playground game in every market (de "Bockspringen", fr "saute-mouton", es "saltar al burro" / es-MX "brincar el burro", pt "pular carniça", it "la cavallina", nl "haasje-over", sv "bockhoppning", da "buksprings", no "bukkesprang", fi "pukkihyppy"); the instruction may use the game name or simply "jump over each other".
- **Turnaround / twin** have school names: de "Tauschaufgabe" (turnaround) and "Umkehraufgabe", nl "wisselsom", da/no "byttestykke", sv "vända på talen", fr "on peut changer l'ordre", es/it/pt "propiedad conmutativa / proprietà commutativa / propriedade comutativa" (children: "cambiar el orden"), fi "vaihdannaisuus" ("vaihda järjestys"). The success line may name the school term where natural (de "Tauschaufgabe!").
- **Minus sign** U+2212; "=" between the two expressions on twin plates is standard in all 11.
- Numbers are numerals; nouns: "twins" (de "Zwillinge", fi "kaksoset"), "cubes" (only in the instruction; fi "kuutiot").

## 10. Sound off, access, phones
- Legible silent: the leapfrog arc, the settle, the coral cubes, the overhang, the minus bounce, the gold link.
- Keyboard: Tab moves between cards, Enter picks up (leapfrog) / lays on the focused card, Esc puts it back; L leapfrogs in free play.
- aria: card "4 plus 7"; after a pick "now 7 plus 4"; after a lay "twins: 7 plus 4 and 7 plus 4" / "not twins: 7 plus 4 and 8 plus 3, both 11" / "not twins: 11 and 9".
- Taps: whole cards are targets (≥ 300 × 70).
- Reduced motion: the parts swap places instantly; the card moves without gliding.

## 11. Distinct from
- **Row 84 The Turning Domino** (1.OA.B.4, another batch): a whole fact family on one domino that is ROTATED and broken. Here nothing rotates: the two parts swap places by jumping over the sign while the total bar and the whole stay fixed; it is a matching game whose twins are made by the swap, with same-total impostors built into every round, and the minus sign visibly refuses to swap.
- **#025 Spring Switch** turntable (spins two cars for a mirror split). **#248 Fact Family Bar** (this batch): four facts acted on a tray. **#027 match-pairs** and the other rows: pure card pairing.
- No turning, mirroring or domino mechanic (registry checked).

## 12. Build plan
- **Core state:** `{ numbers, cards, order[], idx, round: {kind:'add'|'take', items: Card[6]}, held:null|cardIdx, swapped:bool, matched: Set<pairId>, misses: map cardIdx→int, help }`, `Card = {kind, a, b, w, pairId}`, rendered parts coloured by size.
- **Functions:** `leapfrog(card)` → the swapped card (add: b + a; take: w − b = a), `lay(fromIdx, toIdx)` → `{twins, sameTotal, colourChangeOffset, overhang}`, `minusSwap(card)` → always refused, `pick(i)`, `nextTask(index)`.
- **Gate `verify-leapfrog-parts-core.js` (own oracle):** (0) a picked card is NOT leapfrogged until a second card is chosen (or miss 2 / the test leapfrog); (1) `lay` reports twins iff the leapfrogged card equals the target card, for every ordered pair in every round; (2) same-total non-twins report the colour-change offset = |a − a'|; (3) every card has exactly one twin in its round (kinds never mixed; no double); (4) the total bar length is invariant under leapfrog; the whole never moves in take cards; (5) no 0, ranges respected; colour-by-size holds; coral-first per pair is a fair coin; (6) placement = uniform over the 15 pairings, twin-touch 46.7 ± 3 % over 10 000 shuffles; (7) every old pair appears in one of the levels.
- **Mutations:** the card leapfrogs on pick (the task becomes picture-matching); placement keeps twins apart (or together) more than base rate; twins judged by total only; leapfrog not swapping; take-away leapfrog moves the whole; minus swap allowed; colour by position; a double in a round; add and take mixed in a round; twin always beside its pair; total bar changes length on leapfrog; 0 card.
- **Pictures:** none (snap-cubes are apparatus). **Risks:** 19-cube rows at 320 px (13 px cubes) — knobs dropped below 15 px, the colour change keeps a 3 px ink notch. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — numbers that play leapfrog, a stubborn minus that bounces back, cards that click together, and three plates that spin like propellers.
2. **Would a teacher put it on the board?** Yes — "These are both 11 — are they twins?" Same-total impostors and the swap make "same numbers, other order" visible; the take-away twins and the refusing minus carry the subtraction half of every fact family.
3. **Would a parent trust it?** Calm, numbers and cubes only, no score or timer.
4. **The invention:** the two numbers on every card are blocks of cubes that leapfrog over the plus sign — 4 + 7 becomes 7 + 4 with nothing gained or lost — and the leapfrogged card only settles onto its true twin; across the equals sign the parts can swap too, but the whole never moves.

## 14. Critic review (2026-10-17)
Scores before → after: invention 3→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **The skill had leaked out of the task.** The card leapfrogged the instant it was picked, so the child then only matched two identical pictures; nobody needed to know that 4 + 7 = 7 + 4. Now the child picks a card, PREDICTS its twin, and the leapfrog plays in flight as the proof; the identical-picture view is the miss-2 help. A free "test leapfrog" keeps the toy.
- **The placement rule failed its own gate:** "same-row twins ≤ 1" plus "every relation 25–45 %" is impossible in a 3 × 2 grid (enumerated: 14 / 43 / 43 %). Replaced by a uniform draw over the 15 pairings, which makes the twin exactly as likely to touch the card as any other card (46.7 %). Forced "3 coral-first / 3 teal-first" (a pairing aid) became a coin flip per pair.
- **Two to-10 rounds were near-copies** (rounds 7 and 8 shared two pairs each with rounds 2 and 1); replaced with 2 + 7 · 3 + 6 · 1 + 5 and 4 + 6 · 1 + 9 · 3 + 4 — every old pair still appears, no doubles, no 0 (measured).
- The fact-family sheets are shared on purpose: this row owns the twin relations (turnaround, take-away), New 248 the four facts of one whole, row 84 one domino turned and broken.
