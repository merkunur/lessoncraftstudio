# Row 192 — The Echo Grove → THE CALL AND ITS ECHOES (3.OA.A.1)

## 0. Identity
- id **`echo-grove.match-the-rune.3-oa-a-1`** (kept; slugs and metadata frozen en/de/fr/es/pt/it/nl; sv/da/no/fi slug, title and intro are new at build, grade 3 / åk 3 / 3. klasse / 3. trinn / 3. luokka) · grade 3 · CCSS 3.OA.A.1 · strand Operations & Algebraic Thinking · own files `mini tools/echo-grove-core.js` (rewritten), `echo-grove-activity.js`, `echo-grove-activity.html`, `echo-grove-activities.json`.
- worksheets it also covers: G2-209 Add It Again · G2-210 From Adding to Times · G2-213 Easy Groups · G2-211 Rows and Columns · G2-212 Pick the Array · G3-301 Big Arrays · G3-302 Tricky Groups · G3-311 Times Families · G3-312 The Missing Factor · G3-369 Multiply and Divide Fact Families · G3-358 Times Tables Practice · G3-364/365/366/367/368 Times Tables of 2/5/10/3/4 · G3-402/403/404/405 Times Tables of 6/7/8/9.
- **the old activity:** Pim the owl shows a rune (g × s); the child taps one of 2–3 pre-drawn groves with the same total. **Kept:** Pim and his rune, the "same total, different grouping" foil (now produced by the child's own build), the eight (g, s, fruit) rounds, the per-locale "{g} groups of {s}" phrases and fruit plurals. **Dropped:** the hand-drawn owl and baskets (Pim becomes the library owl), and the card-tap (6 of the 8 old rounds offered only 2 groves — a coin toss — and in both 3-grove rounds the third card was never the answer; see the defect list in the build report).

## 1. The pitch
"Set the call — one pole of beads — and strike the echo stone: every strike plants an exact copy, so 3 × 4 is three echoes of a call of four, and the grove reads its own rune back to Pim."

## 2. Why a child will want it again (the fun)
- **The strike.** A big round echo stone sits under Pim. Strike it and a copy of the call pole rises out of the grass with the call's chime — four beads, four rising pings — and the running count blooms above it: *4… 8… 12*. Multiplication becomes a rhythm the child plays.
- **The live call.** Change the call after striking and *every echo changes with it at once* — a wave of beads sprouting along the grove. Children play with this for its own sake (it is also the key to the missing-factor rounds).
- **The grove reads back.** On Check the grove carves its own rune in the slate under Pim's. When they agree, every pole chimes in turn, then all together (a chord), the beads light in a wave, and Pim gives a little hop.
- **The turn.** In missing-number rounds the solved grove swings round 90° — poles become rows — and the slate writes the four facts of the family, one per swing. Tapping the grove keeps turning it.
- No timer, score or streak; between rounds the child may strike, hush and re-call freely.

## 3. The skill and the misconception
- **Skill:** read g × s as g equal groups of s (3.OA.A.1); see the same picture as an array (rows and columns, G2-211/212, G3-301); write it as repeated addition s + s + … (G2-209/210); find an unknown factor and read the four related facts (G3-311/312/369, 3.OA.B.6 in passing); know the tables 2–10 and derive an unknown fact from a known neighbour (G3-358, 364–405).
- **Misconceptions and how the material pushes back:**
  1. *Swapping groups and size* (building 4 poles of 3 for 3 × 4). Echoes are copies, so the grove is always perfectly equal groups — and on Check the grove carves its OWN rune, "4 × 3", under Pim's "3 × 4": same total, different rune. The twin is no longer a decoy card; it is the child's own grove disagreeing in its own handwriting.
  2. *Unequal groups.* Impossible: an echo is a copy of the call.
  3. *Counting all from 1* (for 8 × 6). The running count above each echo, the repeated-addition tape and the neighbour rounds ("you know 5 × 7 — one more echo") make counting by the group the easy way.
  4. *Division is something else.* In missing-number rounds "12 ÷ 3 = ?" is built with the SAME stone and call: three poles whose call must grow until the grove holds 12 — division as the unknown factor.

## 4. The stage
**Stacked layout** (no `layout:'split'`: the split stage column is ~350 px at 704 and the grove needs 620). Bubble under the apparatus.

| element | 704 px | 360 px | kind |
|---|---|---|---|
| task line | 22 px | 18 px | text |
| **Pim** (library `forest-creatures/owl`) at the top left beside the **slate** | picture 96 px | 64 px | library picture |
| **slate**: Pim's rune in big numerals, e.g. "3 × 4" (locale sign); under it the gloss "3 groups of 4" (Tables up to 5 only); under that, after Check, the grove's own rune | rune numerals 40 px; slate 260 × 120 px | 30 px; 220 × 100 | drawn slate + content numerals |
| **call mould** (left edge of the grove): a vertical pole with s beads, ▲ ▼ beside it, the round's fruit picture on its base | pole 300 px tall; fruit picture 96 px; buttons 48 px | 220 px; 64 px; 44 px | drawn pole + library picture |
| **echo stone** under the slate: a big round drawn stone; beside it a smaller **hush** stone (removes the last echo) | 72 px / 52 px | 60 px / 44 px | drawn |
| **grove**: up to 10 echo poles to the right of the mould; beads are drawn discs in the fruit's colour | field 560 × 330 px; pole pitch 52 px; bead 28 px, bead pitch 30 px | field 300 × 240; pole pitch 30 px; bead 20 px, pitch 22 px | drawn tokens |
| **running count** above each pole (Tables up to 5) | 18 px | 14 px | content numerals |
| **echo tape** under the grove: "4 + 4 + 4" grows one addend per echo | 20 px | 15 px | content numerals |
| **total box** (Tables up to 10 and missing-number rounds): a tag with a 12-key pad (digits, erase) | keys 48 px | keys 44 px (5 × 2 + erase) | drawn keypad |
| Check | shell button | above the 360×740 fold | shell |

- Beads are drawn tokens, not pictures: 100 identical library fruit at the 96/64 px floor cannot fit, and the rulings already make counters in frames tool-grade with one picture as the label. The fruit picture on the mould base is that label (96/64 px).
- Fruits (all seen on `contact/fruits.png`): raspberry, strawberry, apple, lemon, pear, banana, orange, pineapple, kiwi, blueberry. Not cherry (drawn as an apple), plum, peach, mango, persimmon or watermelon (rulings).
- No words on the apparatus except the gloss at the easier level (the gloss IS content — it is how a grade 2/3 child reads the rune).
- **Task lines (EN):** build — "Read Pim's rune. Set the call, then strike the stone to plant the grove." · build + total (Tables up to 10) — "Plant Pim's grove, then write how many in all." · neighbour — "Pim's grove shows {g0} × {s}. Change it into {g} × {s} and write how many in all." · missing — "Find Pim's missing number. Change the grove until it holds {T}." 

## 5. The hand
- **Call ▲ / ▼** (or drag the top bead up/down): one bead more/less on the call pole (1–10); every echo pole changes at the same moment (a 150 ms sprout/shrink wave from left to right, 30 ms per pole), with one ping.
- **Strike the echo stone:** a new pole rises at the next place (220 ms ease-out) while the call's beads ping upward (s rising notes, 60 ms apart; pitch climbs with the running count so 8 × 6 is a rising scale). The running count appears above it; the tape gains "+ s". Max 10 poles: an 11th strike only thuds.
- **Hush stone:** the last pole sinks back (180 ms); the tape loses an addend.
- **Keypad:** digits enter the total box (max 3 digits); erase key.
- **Tap a pole** (free play only, after success): the grove turns 90° (500 ms) — poles become rows — and back.
- **Locks:** in missing-number rounds the known factor's control is locked and shows a small carved copy of the rune's numeral (e.g. 3 poles already planted and the stone greyed for "3 × ? = 12"; the call fixed at 4 for "? × 4 = 12"). In division-rune rounds ("12 ÷ 3 = ?") both controls are open: three poles with a growing call, or a call of three struck until 12 — both are right.
- Everything is undoable until Check.

## 6. The rounds
Order-only reshuffle per pass; never the same order twice; never the same fruit twice running.

**Tables up to 5 · Ask = build** (9 — the eight old rounds kept + one new; gloss shown; running counts shown; no typing):
| # | rune | fruit | note |
|---|---|---|---|
| 1 | 2 × 3 | raspberry | twin of #2 |
| 2 | 3 × 2 | strawberry | twin of #1 |
| 3 | 2 × 4 | apple | twin of #4 |
| 4 | 4 × 2 | lemon | |
| 5 | 2 × 5 | pear | twin of #6 |
| 6 | 5 × 2 | banana | |
| 7 | 3 × 4 | orange | twin of #8 |
| 8 | 4 × 3 | pineapple | |
| 9 | 5 × 4 | kiwi | new |

The twins are deliberate: the child builds 2 × 3 and later 3 × 2 and sees two different groves with one total — the commutative pair is felt, not told.

**Tables up to 10 · Ask = build** (9; no gloss; running counts hidden until Check; type the total):
| # | task | fruit | answer |
|---|---|---|---|
| 1 | 7 × 3 | lemon | 21 |
| 2 | 3 × 9 | blueberry | 27 |
| 3 | 8 × 6 | orange | 48 |
| 4 | 4 × 7 | strawberry | 28 |
| 5 | 9 × 5 | banana | 45 |
| 6 | 6 × 8 | raspberry | 48 (deliberate twin of #3) |
| 7 | neighbour: grove 5 × 7 → make 6 × 7 | apple | 42 (one more echo) |
| 8 | neighbour: grove 10 × 4 → make 9 × 4 | pineapple | 36 (one echo fewer) |
| 9 | neighbour: grove 5 × 9 → make 6 × 9 | kiwi | 54 |

**Tables up to 5 · Ask = missing number** (9):
?×3=12 (4, apple) · 10÷2=? (5, strawberry) · ?×5=15 (3, lemon) · 4×?=16 (4, orange — a square: the turned grove looks the same and the family has only two facts, said in the success line) · ?×2=8 (4, banana) · 3×?=15 (5, pear) · ?×4=20 (5, raspberry) · 12÷4=? (3, pineapple) · ?×2=6 (3, kiwi).

**Tables up to 10 · Ask = missing number** (9):
?×7=42 (6, orange) · 48÷6=? (8, strawberry) · ?×9=27 (3, lemon) · 8×?=56 (7, banana) · ?×6=36 (6, apple — the square) · 7×?=63 (9, raspberry) · ?×8=72 (9, blueberry) · 54÷9=? (6, pineapple) · ?×10=70 (7, kiwi — the 10 table).

**Answer position and guessing** (measured by the critic, own script `work-c40/c192_193.js`; the gate re-measures):
- Build rounds have no position: the child makes the grove. The typed totals are products, never shown before Check.
- Missing-number: unknown first factor 5/9, second 2/9, division form 2/9 in both tables; answers 4,5,3,4,4,5,5,3,3 and 6,8,3,7,6,9,9,6,7 — no value more than 3 times; a "repeat the number you see" bot wins only the square round (1/9).
- *Tables 2–10 all appear:* the up-to-5 tables use factors 2–5; the up-to-10 build table uses 3–10 (10 as the neighbour start grove) and the up-to-10 missing table 3, 6, 7, 8, 9, 10 (the critic swapped ?×4=28 for ?×10=70 so the 10 table is not missing) — every times-table worksheet G3-364…405 has rounds.
- One right answer: in strict locales the build must match g AND s in the locale's reading order; in fr/es/pt/it both orders are right when only the rune is shown (§9a) — that is one right PRODUCT with two honest groupings, and the gloss (when shown) leaves exactly one; totals unique per round; in division-rune rounds the two right groves have the same unknown number.

## 7. Check, the misses, the success
- **Check with no grove** → hint, no miss: "Set the call first, then strike the stone." · **no total typed** (when needed) → "Write how many in all."
- **Miss 1 — the grove reads itself.** The slate carves the grove's own rune under Pim's ("4 × 3" under "3 × 4"); each numeral that disagrees glows coral; the running counts appear above the poles if they were hidden. Wrong total only: the tape completes itself to "7 + 7 + 7 = ?" with the poles' running counts. Hints EN: groups wrong — "Pim's first number is how many poles. Count your poles." · size wrong — "Pim's second number is how many on each pole. Look at your call." · total wrong — "Count by {s}s along the poles."
- **Miss 2 — the rune points.** An arrow runs from Pim's first numeral to the echo stone and from the second to the call; the gloss appears ("3 groups of 4") even at the harder level; the tape shows every running total. Hint EN: "{g} poles, {s} on each pole: {s} + {s} + … {g} times."
- Missing-number misses: miss 1 — the grove's total shows in a jar beside the target {T} (more/less is visible as two numerals); miss 2 — the target's beads appear as faint ghosts filling the grove pattern.
- **Order-dependent strings:** `hintGroups`, `hintSize` and the miss-2 arrows name "first/second number" — they are built from `FACTOR_ORDER` (it: the SECOND number is how many poles, "Il secondo numero dice quanti pali"); in both-order locales a swapped grove is right, so these hints only fire on a grove that matches neither order.
- A new strike, hush or call change clears the miss showing.
- **Success:** each pole chimes in turn then all together, beads light in a wave, Pim hops; the slate shows Pim's rune = the total. Bubble EN: build — "{g} groups of {s} is {T}: {s} + {s} … = {T}, so {g} × {s} = {T}." · neighbour — "{g0} × {s} = {T0}, and one more {s} makes {T}." · missing — "{g} × {s} = {T}. The family: {g} × {s} = {T}, {s} × {g} = {T}, {T} ÷ {g} = {s}, {T} ÷ {s} = {g}." · square — "{g} × {g} = {T}. Turned round it looks the same, so the family has two facts."

## 8. Settings
1. **Tables:** up to 5 × 5 / up to 10 × 10. At rest: the rune's numbers change; the gloss and running counts disappear on the harder level and the total box appears.
2. **Ask:** build the rune / find the missing number. At rest: the slate shows "?" in the rune and a locked control appears.

## 9. Words (EN source)
- title (frozen) "The Echo Grove" · instruction "Read Pim's rune, set the call and strike the echo stone. Tap Check when your grove is ready."
- prompts `promptBuild`, `promptBuildTotal`, `promptNeighbour`, `promptMissing` (section 4) · gloss `runeGloss` "{g} groups of {s}" (kept from the old file in 7 locales).
- hints `hintStart` · `hintTotal` · `hintGroups` · `hintSize` · `hintCount` · `hintStrong` · `hintMissing` (section 7).
- celebrations `winBuild` · `winNeighbour` · `winMissing` · `winSquare`.
- settings "Tables" — "up to 5 × 5" / "up to 10 × 10"; "Ask" — "build the rune" / "find the missing number".
- aria `srRune` "Pim's rune says {g} groups of {s}." (kept) · `srGrove` "Your grove: {n} poles, {k} on each, {t} in all." · `srCall` "The call has {k}."
- **Locale traps:**
  - ⚠ **Which factor counts the groups** — ruled in §9a below (per-locale table; strict in en/de/nl/sv/da/no/fi, both orders right in fr/es/pt/it, it glosses size-first).
  - **Signs** from `scripts/worksheet-gen/types/_shared/notation.js`: × in en/fr/es/pt/it/nl, · in de/sv/da/no/fi; ÷ in en/fr/es/pt, ":" in de/it/nl/da/no/fi, "/" in sv (÷ meant MINUS in older Swedish — forbidden).
  - **"groups of"** — de "3 Gruppen mit je 4", fr "3 groupes de 4", es "3 grupos de 4", it "3 gruppi da 4", nl "3 groepjes van 4", sv "3 grupper med 4 i varje", da "3 grupper med 4 i hver", no "3 grupper med 4 i hver", fi "3 ryhmää, joissa kussakin 4" (partitive after the numeral).
  - **Fruit plurals** for aria labels come from `image-vocabulary.js` (de "Ananas" is invariant — the numeral carries the number; fi partitive singular after numerals: "neljä vadelmaa").
  - **"Times tables"** words in the settings are not used (labels say "up to 5 × 5").


### 9a. ⭐ Which factor counts the groups — the per-locale `FACTOR_ORDER` table (critic ruling, 2026-10-17)

The grove is graded by STRUCTURE (poles = groups, call = group size), so the build must know, per locale, what "a × b" means in that country's classroom. Ruling (the build's shared module `FACTOR_ORDER`, also read by #288 and #289):

| locale | spoken | classroom meaning of "3 × 4" | `FACTOR_ORDER` | grading when only the rune is shown |
|---|---|---|---|---|
| en | "3 times 4" | 3 groups of 4 (CCSS 3.OA.A.1 states it: 5 × 7 = 5 groups of 7) | groupsFirst | strict: 3 poles of 4 only |
| de | "3 mal 4" | 3-mal die 4 = 4 + 4 + 4 (the first factor is how many times) | groupsFirst | strict |
| nl | "3 keer 4" | 3 groepjes van 4 = 4 + 4 + 4 | groupsFirst | strict |
| sv | "3 gånger 4" | 4 + 4 + 4 | groupsFirst | strict |
| da | "3 gange 4" | 4 + 4 + 4 | groupsFirst | strict |
| no | "3 ganger 4" | 4 + 4 + 4 | groupsFirst | strict |
| fi | "3 kertaa 4" | 4 + 4 + 4 (4 lasketaan yhteen 3 kertaa) | groupsFirst | strict |
| fr | "3 fois 4" | "fois" reads 3 groups of 4, but "3 multiplié par 4" (3 taken 4 times) is also taught, and cycle 2 guidance accepts both readings | groupsFirst (default) | **both orders right** |
| es | "3 por 4" | textbooks differ: the multiplicando × multiplicador tradition reads 3 + 3 + 3 + 3; "3 veces 4" reads 4 + 4 + 4 | groupsFirst (default) | **both orders right** |
| pt (BR) | "3 vezes 4" | usually 4 + 4 + 4 ("três vezes o quatro"), but the multiplicando-first reading is still in many books | groupsFirst (default) | **both orders right** |
| it | "3 per 4" | the traditional Italian definition repeats the FIRST factor: 3 × 4 = 3 + 3 + 3 + 3 ("3 preso 4 volte"; it.wikipedia and Codogno, *Il Post* 2015, describe it as the school norm), while many current classrooms also read "3 volte 4" | **sizeFirst (default)** | **both orders right** |

Consequences (all graded the same way in the core, `judge()`):
- **When the gloss is shown** (Tables up to 5) the gloss is the task and decides: one right grove. The gloss is written in the locale's default order — it: "3 × 4" glosses as **"4 gruppi da 3"** (the live it page's "3 gruppi da 4" contradicts Italian practice and is corrected in the activity strings; the frozen it page title/intro are metadata and are NOT touched — flagged to the operator only).
- **When only the rune is shown** (Tables up to 10, missing number): strict locales accept one grove; fr/es/pt/it accept g poles of s AND s poles of g. The read-back still carves the grove's own rune in the locale's default order, and the success line in a both-orders locale names the other grouping too: "{g} groups of {s} — or {s} groups of {g}: both make {T}." The twin is then a second right answer, never a miss — honest to that country's classroom.
- **Neighbour rounds** ("5 × 7 → make 6 × 7") start from the grove drawn in the default order; in strict groups-first locales the change is one more pole; in it (sizeFirst) it is one more bead on every pole; in both-orders locales either change that makes 6 × 7 is right.
- **Missing-number locks** follow the default order (groupsFirst: "? × 3" locks the call at 3 and the child strikes poles; sizeFirst: "? × 3" plants 3 locked poles and the child grows the call). The unknown number is the same either way.
- **Division runes** ("12 ÷ 3") accept both groves in every locale (as before).
- The verify gate asserts: strict locales reject the twin; both-order locales accept it; it's gloss is size-first; the read-back reverses for sizeFirst.

## 10. Sound off, access, phones
- Sound off: poles, beads, the running counts, the tape and the read-back rune carry everything; the pings are extra.
- Keyboard: Tab → call ▲/▼ (↑ ↓ also work) → echo stone (Enter) → hush (Enter) → keypad (digit keys type directly) → Check.
- aria-live: `srGrove` after every strike, hush or call change.
- Taps: stone 72/60, hush 52/44, call buttons 48/44, keys 48/44.
- Pictures: Pim and the fruit label 96 px at 704 / 64 px at 360.
- Phones: the call mould moves above the grove as a horizontal "call bar" (beads in a row) with ▲ ▼ at its end; the grove's poles stay vertical; Pim and slate share the top row; the keypad slides up over the tape only when the total box is tapped. 10 poles × 10 beads fit 300 × 240 px at 360; at 320 px the pole pitch is 27 px and beads 18 px. Check stays above both folds (stage 470 px at 360 including the closed keypad).

## 11. Distinct from
- **baking-tray** (tool) breaks an array into two known facts; **folding-wall** (tool) clears known tables from a 100-card wall — neither builds groups by copying a call.
- **New 252 The Washing Line** (bags end to end with running totals on a line), **New 272 The Double Stamp** (one press prints a picture worth two), **Row 108 The One-Piece Stamp** — copies printed onto a surface; here the copies stay LINKED to the call (change the call, every echo changes), which is what makes the missing-factor rounds work.
- **New 292 The Pouring Frame** (counters pour into a frame of fixed rows; one width leaves nothing over) and **New 293 The Table Ladder** own the frame-search missing factor and the ladder of rungs; the grove's missing factor is solved by the linked call or by striking, and its neighbour facts by one echo more or less.
- **This batch:** #288 The Walking Dividers (equal steps on a line), #193 The Trapdoor Tower (division: pack boxes, drop them onto plates), #289 The Story Tray (word problems).

## 12. Build plan
- **Core state:** `{ rune {g, s, T, unknown: null|'g'|'s'|'div'}, call (1..10), poles (0..10), locked {g?, s?}, typed, fruit, order: 'groupsFirst'|'sizeFirst', misses }`. Functions `setCall(k)`, `strike()`, `hush()`, `total() = poles × call`, `groveRune()` (in the locale's order), `runningCounts()`, `tape()`, `judge()` — build: poles = g ∧ call = s, where g/s are read from the rune through `FACTOR_ORDER` (in fr/es/pt/it with the gloss hidden, poles = s ∧ call = g is also right) (∧ typed = T when needed); missing: total = T ∧ the known factor in place ∧ typed = unknown; division: total = T ∧ (poles = d ∨ call = d) ∧ typed = T/d.
- **Verify gate** (own oracle): every round's arithmetic; the twin pairs are present in the to-5 table; neighbour rounds differ from their start by exactly one group; no product repeats inside the to-10 build table except the declared twin; missing tables: unknown-position split 5/2/2, no answer value > 3 times; the read-back rune of a swapped build differs from Pim's rune; changing the call changes every pole (all poles always equal); reshuffle never repeats an order nor a fruit twice running (1,000 shuffles); `FACTOR_ORDER` reverses the read-back for a sizeFirst locale.
- **Mutations:** echoes copy the call at strike time only (not linked) → linked-call rule; judge accepts the twin → structure rule; running counts shown at the hard level → level rule; neighbour round starts two groups away → neighbour rule; division round accepts only one of the two groves → division rule; ÷ printed in sv → notation rule; a pole with one bead fewer → equal-groups rule.
- **Local test:** real taps/drags on call, stone, hush, keypad at the seven widths, every round of every setting, the full miss ladder; the turn animation.
- **Pictures:** `forest-creatures/owl` (ear tufts — irrelevant here) and the 10 fruits, seen on the contact sheets. **Risks:** the native reviewer confirms the §9a table (the ruling is made; the reviewer may only move a locale between strict and both-orders, never leave it open). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — striking a stone that makes a pole spring up and ping, and a call that makes the whole grove sprout at once.
2. **Would a teacher put it on the board?** Yes — "three echoes of a call of four" is the equal-groups meaning of 3 × 4; the child's own grove disagreeing with Pim's rune is the misconception made visible; arrays, repeated addition, the missing factor and fact families all come out of one apparatus.
3. **Would a parent trust it?** Calm, library owl and fruit, no score.
4. **The invention:** every strike of the echo stone plants a linked copy of the call, so a product is groups you can hear and the grove can read its own rune back.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- The open native question is RULED (§9a): a per-locale `FACTOR_ORDER` table — groups-first and strict in en/de/nl/sv/da/no/fi; fr/es/pt/it genuinely ambiguous in school practice, so both groupings are graded right whenever only the rune is shown; it defaults to size-first (the traditional Italian "3 × 4 = 3 + 3 + 3 + 3", confirmed against it.wikipedia/Codogno) and its gloss becomes "4 gruppi da 3". Locks, neighbour rounds, read-back, hints and the success line all follow the table; the judge and the gate assert it.
- The live it gloss ("3 gruppi da 4") is now flagged as contradicting Italian practice (corrected in the activity strings; frozen metadata untouched).
- Coverage: the 10 times table had no round anywhere — the up-to-10 missing table now has ?×10=70; all tables 2–10 appear (measured).
- Layout: split → stacked (the 620 px grove cannot fit the ~350 px split column).
- Re-measured all four tables with my own script (unknown-position 5/2/2, answers ≤ 3 repeats, repeat-the-shown-number bot 1/9, products).
- Names of the sibling designs updated (New 292 is now The Pouring Frame; #193 is now The Trapdoor Tower).
