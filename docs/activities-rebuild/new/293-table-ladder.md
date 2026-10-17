# New 293 — The Table Ladder: every lit rung is a rod you can copy — couple two to build a rung you don't know, or lay a long one in and snip a group off (3.OA.C.7)

## 0. Identity
- **id** `table-ladder.play.3-oa-c-7` · grade 3 · CCSS 3.OA.C.7 (fluently multiply within 100, using strategies such as … properties of operations; by the end of grade 3 know from memory all products of two one-digit numbers) · strand Operations & Algebraic Thinking · key `table-ladder` → `table-ladder-core.js`, `table-ladder-activity.js`, `table-ladder-activity.html`, `table-ladder-activities.json`. Start with `node scripts/new-activity.js --num=293`.
- **Worksheets covered:** G3-358 "Times Tables Practice" · G3-364 / 365 / 366 / 367 / 368 "Times Table of 2 / 5 / 10 / 3 / 4" · G3-402 / 403 / 404 / 405 "Times Table of 6 / 7 / 8 / 9" — all "Multiply. Write each product in the box."
- New instrument; no old activity. **Rewritten 2026-10-17** after the critic scored the invention 4: the first version's core action was typing ten recalled facts per pass, and its ▲/▼ climb added one group at a time, so the child watched a derivation instead of doing one. This version makes the derivation the move of the hand.
- Measured scripts: `…/scratchpad/des/work-s293/` — `builds.js` (every build, every strategy, every wrong build), `fit.js` (widths, label fit, fact line, heights), `order.js` (reshuffle). Outputs `builds.out`, `fit.out`, `order.out`.

## 1. The pitch
"Every rung of the times-table ladder is a rod as long as its groups, and a lit rung can be copied: to light a rung you don't know, build its rod out of rungs you do — the 5-rod and the 2-rod make the 7, two 2-rods make the 4, the 10-rod laid in with the 1-rod snipped off makes the 9 — and the rung's track only latches when your rod fills it exactly, so the product is two facts you already own, added or taken away."

## 2. Why a child will want it again
- **Copying a lit rung.** Press on any lit bar and a copy of it lifts off in your finger — same length, same groups, its product riding on it ("30") — while the original stays lit on the ladder. It feels like pulling a key off a ring and the ring never runs out.
- **Coupling.** Drop the copy into the glowing empty track and it slides home against the track's start with a *clack*; drop a second one and the two couple end to end with a deeper *clunk*, the seam between them glinting. When the rod fills the track to its end stop, the track's latch snaps shut (*chk*) and the seam lights — "30" and "12" sitting side by side on one rod.
- **Snipping.** Drop the 10-rod into the 9 track and it sticks out past the end stop by one group, wobbling. Drop the 1-rod on the overhang and *snip* — the overhanging group drops off the end, bounces once on the ground plank and rolls away, and the latch closes on "60 − 6". Cutting is the most satisfying move on the board, and it is "ten take away one" done with the hand.
- **The rod that will not fit.** Couple the 5 and the 1 into the 7 track and one dashed slot stays open at the end — the latch will not close. Couple past the tenth slot and the rod bumps back off the buffer stop. Nothing scolds; the track simply refuses.
- **The ladder keeps your recipes.** A rung lit by a build fuses into one bar but keeps a faint seam where it was coupled (or a small notch where it was cut), and its recipe ("5 + 2") sits in its tag's corner. At the end of the pass the ladder folds sideways into the printed table column the worksheets use, each line with the recipe the child invented beside it.
- **Then go quick.** The second pass of the same table is fluency: all ten rungs asked in a shuffled order, type straight from memory. The rods are padlocked — but a miss unlocks them for that rung, and the miss-2 help replays *the child's own recipe* from the build pass into the track. The ladder remembers how you got there.
- **Free play:** between rounds every lit rod can be copied and dropped into any empty track to see what it latches — nothing is judged.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** 3.OA.C.7 as the worksheets mean it — write each product of a table — reached the way the standard names: *strategies from properties of operations*. Every non-anchor product is derived from anchors the child owns (×1, ×2, ×5, ×10): **one more group** (3 = 2 + 1), **double** (4 = 2 + 2; later 6 = 3 + 3, 8 = 4 + 4), **five and some** (6 = 5 + 1, 7 = 5 + 2), **ten take away** (8 = 10 − 2, 9 = 10 − 1). The child chooses the build; the track proves it; the child adds or subtracts the two products and types the fact. Then the quick pass asks for the same facts from memory — fluency built on a derivation the child has just done.
- **Misconception 1 — every fact is a separate thing to memorise or count from 1.** **Push-back:** a dark rung cannot be typed in a build pass until its track is filled from lit rungs, and every one of the six derived rungs has at least one two-piece build from the four anchors (measured, `builds.out`: 3 ← 1+2 · 2+1 · 5−2; 4 ← 2+2 · 5−1; 6 ← 1+5 · 5+1; 7 ← 2+5 · 5+2; 8 ← 10−2; 9 ← 10−1). No single anchor rod ever fills a derived track (measured), so every derived fact is genuinely made of two.
- **Misconception 2 — "ten take away one" means subtract the number 1** (9 × 6 = 60 − 1 = 59). **Push-back:** the cutter is the **1-rung rod**: it is one whole group long and carries "6", and the piece that drops off the end is a whole group with a 6 on it. If the child still types 59, the ghost of 59 laid into the nine slots ends five-sixths of the way through a slot — "not a whole number of sixes".
- **Misconception 3 — "five and two" means add 2** (7 × 6 = 30 + 2 = 32). **Push-back:** the 2-rod is two slots long, each slot printed "6", its tag reads "12"; a typed 32 ghosts as five full groups and a third of a slot.
- **Misconception 4 — off by one group** (5 + 1 into the 7 track; 10 − 1 into the 8 track; 2 + 2 into the 3 track). **Push-back:** the track shows it as a shape — one dashed empty slot left (short), or one group still overhanging the end stop (long). Measured: of all 2-drop sequences from the anchors that do not latch (85), every one is visible — 36 leave empty slots, 23 overhang, 26 bump off the buffer stop.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: ladder board 440 × 456 left, fact column 216 right):**
- **Task line** (22 px): **"Fill the glowing track with lit rungs, then write the product."**
- **The ladder** (440 × 456): two wooden rails 10 px wide (outer edges 60 px) on the left, the rung numeral column (k, 18 px) to their left; 10 rungs every 44 px standing on a 16 px ground plank (apparatus, never asked). The only words on the ladder are numerals.
- **The track of each rung:** to the right of the rail, a groove of k **slots**, each slot one group of n: 28 × 28 px, 2 px gaps (10 slots = 298 px), closed at slot k by a brass **end stop** and, past it, a dashed **overhang zone** up to slot 10 where the grooves of all rungs end at a common **buffer stop**. Width (measured, `fit.out`): numeral 18 + 4 + rails 60 + 6 + bar 298 + 6 + tag 44 = **436 ≤ 440 (4 spare)**. An overhanging rod never passes slot 10, because the longest rod is the 10-rod and every track starts at the same x — so an overhang never collides with the tag column.
- **Rods:** a lit bar is a rod — alternating teal / cream group slots with n printed in each (14 px), its product on a rod label centred on it (14 px). Tightest label: the 1-rod of the 10-table, "10" = 19.7 px on a 28 px rod (8.3 spare).
- **Tags** at the end of each rung: 44 × 28 chip — lit: the product (20 px) and, for a built rung, the recipe in its corner (10 px, numerals and + / −). The asked rung's tag is a pulsing teal "?".
- **Seams:** a coupling seam is a 2 px brass line; a cut leaves a 3 px notch at the rod's end.
- **The fact column:** line 1 `7 × 6 =` (40 px numerals); line 2 the build readout `30 + 12 =` (28 px) with the answer box 64 × 56; keypad 3 × 4 (keys 56 × 48; ✓ = Check); a **clear track** button ↺ 44 × 44 beside line 2. Widest line 2 measured: `100 − 20 = ▢` = **211 ≤ 216 (5 spare)**. Line 2 is empty (a dashed line) until the track latches.
- No pictures; everything is apparatus geometry and numerals.

**At 360 × 740 (stacked, content 328):** fact block on top (line 1 30 px, line 2 26 px + box 56 × 48 + ↺), the ladder full width — numeral 14, rails 48 outer, rung step **38**, slots 20 × 24 + 1 px gaps (10 × 21 = 210) with no numeral inside (tints only; n is on the rod label), tags 40 × 24; row width 14 + 4 + 48 + 4 + 210 + 4 + 40 = **323 ≤ 328** (measured); tightest label "10" 17.4 px on 20 px; keypad two rows of six keys 50 × 44. Height: header 56 + task 40 + fact 86 + ladder 392 + keypad 94 + gaps 28 = **696 ≤ 740** (44 spare).
**At 320 × 640 (content 288):** numeral 12, rails 40 outer, step **34**, ground 6, slots 17 × 22 + 1 px gaps (180), tags 36 × 22, labels 10 px ("10" = 15.2 px on 17 px, 1.8 spare); row 279 ≤ 288; height 56 + task 36 (`instructionShort`, one line) + fact 78 + ladder 346 + keypad 92 + gaps 20 = **628 ≤ 640** (12 spare).

## 5. The hand
- **Copy a rod:** pointerdown on any lit bar (its whole row is the grab area: 44 px / 38 / 34 tall × the bar) — the copy lifts within 50 ms (scale 1.05, shadow), the original stays. Drag: the copy follows the finger with its left end under it.
- **Drop into the asked track:** the asked track accepts a drop anywhere within ±1.5 rung steps of it (132 / 114 / 102 px tall zone); elsewhere the copy flies home (180 ms). Only the asked track accepts in a task round; in free play any dark track accepts.
- **The track's rule (the same rule the gate re-implements):** while the rod in the track is short of or exactly at the end stop, a dropped rod **couples** onto its right end (slide 160 ms, *clunk*) — refused with a bump (120 ms wobble, *thud*) if it would pass the buffer stop at slot 10; while the rod overhangs the end stop, a dropped rod **cuts**: it lays over the rod's right end and that many groups drop off (220 ms, *snip*, a bounce on the ground plank) — refused if the cutter is as long as or longer than the whole rod. **Latch** when the rod ends exactly at the end stop (*chk*, seam glows, line 2 fills `30 + 12 =`). At most 4 pieces; a fifth drop bumps back.
- **Clear track ↺:** the pieces slide back up to their rungs and vanish (200 ms). Keyboard: Escape.
- **Type + Check:** digits into the box (keypad / keyboard); ✓ or Enter checks. In a build round the box is enabled only when the track is latched.
- **Keyboard path for rods:** Tab / ↑ ↓ move focus between lit rungs; **+** couples (or, on an overhang, cuts with) the focused rung's rod into the asked track; the live region reads the track ("7 slots, 6 filled", "overhangs by 1 group", "latched: 30 plus 12").
- **Sound:** clack / clunk / snip / chk (wooden, short), a rising note when a rung lights; TTS (where available) reads the fact on success. All optional.
- **Free play:** rods can be copied and dropped into any dark track between rounds; nothing is judged and nothing lights.

## 6. The rounds
- **One round** = one rung of the current table. **Default mode "build, then quick"**: each table gets a **build pass** (10 rounds) then a **quick pass** (10 rounds).
- **Build pass:** the four anchors ×1, ×2, ×5, ×10 first, in a shuffled order — typed from memory (no build; their tracks are plain grooves). Then the six derived rungs: every dark rung shows "?" and **the child taps which one to build next**; if nothing is tapped for 4 s, the next one of a shuffled suggestion order pulses. Each derived round: fill the track (≥ 2 pieces), then type the product.
- **Quick pass:** all ten rungs in one shuffled order, nothing to build, type from memory; rods padlocked until a miss on that rung.
- **Tables per setting:** "2, 3, 4, 5, 10" → 2 → 5 → 10 → 3 → 4; "6, 7, 8, 9" → 6 → 7 → 8 → 9; "mixed" → 2 → 5 → 10 → 3 → 4 → 6 → 7 → 8 → 9; the cycle start is seeded per reload.
- **The full round table — every value asked.** Anchors are typed; the six derived columns give the **canonical build** (the one the miss help lays in; the child may use any build that latches) and its readout. `*` = the addition or subtraction crosses a ten. From the second table on, once ×3 and ×4 are lit in a pass, 6 and 8 may also be built as doubles (shown after "/").

| n | ×1 | ×2 | ×5 | ×10 | 3 (2+1) | 4 (2+2) | 6 (5+1) | 7 (5+2) | 8 (10−2) | 9 (10−1) |
|---|---|---|---|---|---|---|---|---|---|---|
| 2 | 2 | 4 | 10 | 20 | 4+2=6 | 4+4=8 | 10+2=12 / 6+6* | 10+4=14 | 20−4=16* / 8+8* | 20−2=18* |
| 3 | 3 | 6 | 15 | 30 | 6+3=9 | 6+6=12* | 15+3=18 / 9+9* | 15+6=21* | 30−6=24* / 12+12 | 30−3=27* |
| 4 | 4 | 8 | 20 | 40 | 8+4=12* | 8+8=16* | 20+4=24 / 12+12 | 20+8=28 | 40−8=32* / 16+16* | 40−4=36* |
| 5 | 5 | 10 | 25 | 50 | 10+5=15 | 10+10=20 | 25+5=30* / 15+15* | 25+10=35 | 50−10=40 / 20+20 | 50−5=45* |
| 6 | 6 | 12 | 30 | 60 | 12+6=18 | 12+12=24 | 30+6=36 / 18+18* | 30+12=42 | 60−12=48* / 24+24 | 60−6=54* |
| 7 | 7 | 14 | 35 | 70 | 14+7=21* | 14+14=28 | 35+7=42* / 21+21 | 35+14=49 | 70−14=56* / 28+28* | 70−7=63* |
| 8 | 8 | 16 | 40 | 80 | 16+8=24* | 16+16=32* | 40+8=48 / 24+24 | 40+16=56 | 80−16=64* / 32+32 | 80−8=72* |
| 9 | 9 | 18 | 45 | 90 | 18+9=27* | 18+18=36* | 45+9=54* / 27+27* | 45+18=63* | 90−18=72* / 36+36* | 90−9=81* |
| 10 | 10 | 20 | 50 | 100 | 20+10=30 | 20+20=40 | 50+10=60 / 30+30 | 50+20=70 | 100−20=80 / 40+40 | 100−10=90 |

- **Measured balances (`builds.out`, `order.out`):**
  - **Strategy families** of the canonical builds per table: one more 1 · double 1 · five and some 2 · ten take away 2 (and doubles become available for 6 and 8 once 3 and 4 are lit) — every strategy the standard names, none dominant.
  - **Direction:** 4 rungs built from below (coupling), 2 from above (cutting) — the child meets both moves every table.
  - **Arithmetic load:** 28 of 54 canonical readouts cross a ten (`*`), 26 do not; the doubling alternatives cross a ten 9 of 18 times — balanced, and the miss-2 help counts on/back group by group across exactly that ten.
  - **Reachability:** every derived rung has ≥ 1 two-piece build from the four anchors (3: 3 builds, 4: 2, 6: 2, 7: 2, 8: 1, 9: 1) and 6–9 three-piece builds; whatever order the child chooses, the next rung is always buildable from what is lit.
  - **Wrong builds:** 85 non-latching 2-drop sequences from the anchors, **85 visible** (36 short, 23 overhang, 26 refused); no single anchor rod latches a derived track.
  - **Answer position:** answers are typed, never chosen, so there is no option position. The asked rung's height: in the quick pass each rung is asked once per pass; over 500 seeded passes each rung was asked first 40–57 times (ideal 50) and its mean position was 4.28–4.66 (ideal 4.5).
  - **Order:** 500 build passes + 500 quick passes, **0** identical consecutive orders (anchors reshuffled among themselves, the suggestion order of the six among themselves, the quick pass whole).
- **Never 0:** the ladder starts at ×1; the ground is apparatus. **One right answer per round:** the product k × n (the build may vary; the product does not).
- The fact is written with the multiplier first (`k × n`, the rung number) — see §9 for locales that print `n × k`.

## 7. Check, the misses, the success
- **Check with the track not latched (build round)** → no miss; the empty or overhanging part pulses. Hint: **"Fill the track to its end with lit rungs first."** **Check with an empty box** → no miss. Hint: **"The track is full. Now write the product."**
- **Miss 1 (wrong product):** the rung does not light; the **ghost** of the typed number lays over the latched rod's slots in coral — whole groups fill, a number that is not a multiple of n ends part-way through a slot, a number too big runs past the end stop into the overhang zone (capped at the buffer stop; beyond it a coral arrow "+{over}"). Hint: **"Your number fills {g} groups. This rung has {k} groups of {n}."** — or, not a multiple: **"That is not a whole number of {n}s. Look at the two rods: {a} and {b}."**
- **Miss 2:** the readout counts across the seam: the first piece's product is shown, then the second piece's slots light one by one with the running total above each — 30 … 36 — and stop **before the last slot** (couple) or the snipped groups count back one by one from the rod's full length — 60 … — and stop before the last (cut). Hint (couple): **"{a} and {m} more group of {n}."** · (cut): **"{a} take away {m} group of {n}."** ({m} = the groups still to count, always 1, so the child does the last step.)
- **Quick pass miss 1:** ghost of the typed number in the empty track + the rods unlock for this rung. Hint: **"Build it: copy lit rungs into the track."** In a quick pass of a table never built (setting "quick"), if no rung is lit yet, the nearest anchor rungs that the canonical build needs light as a gift, with their products, so the build always starts from known facts. **Quick pass miss 2:** the child's own recipe from this table's build pass (or the canonical one) replays into the track and the count across the seam runs as above, stopping before the last group.
- **Any new drop, clear or keystroke** takes the help away until the next Check.
- **Success:** the seams fuse (200 ms) leaving a faint line, the rung lights left to right (40 ms per slot), the tag shows the product and its recipe. Bubble: **"{k} × {n} = {p}. You built it from {a} {op} {b}!"** (build round) · **"{k} × {n} = {p}. Rung {k} is lit!"** (anchor or quick round). Tenth rung of a pass: a rising note per rung up the ladder, then the ladder folds sideways into the table column, each line with its recipe; bubble **"The whole {n} ladder is lit!"** (build pass) · **"You knew the whole {n} table!"** (quick pass, first-try or not — no counting of misses is shown).

## 8. Settings
1. **Table:** "2, 3, 4, 5, 10" (default) / "6, 7, 8, 9" / "mixed". At rest: the rods' group numerals and labels show the first table's n.
2. **Mode:** "build, then quick" (default) / "build" (build passes only) / "quick" (quick passes only — fluency check). At rest: in "quick" the tracks wear a small padlock and the lit bars lose their grip dots; in the build modes the anchors' tracks are plain and the six derived tracks show their brass end stops.

## 9. Words (EN source)
- **title:** "The Table Ladder"
- **instruction:** "Fill the glowing track with lit rungs, then write the product."
- **instructionShort:** "Fill the track, then write the product."
- **instructionQuick:** "Write the product for the glowing rung."
- **hints:** `notLatched` "Fill the track to its end with lit rungs first." · `empty` "The track is full. Now write the product." · `ghost` "Your number fills {g} groups. This rung has {k} groups of {n}." · `ghostPartial` "That is not a whole number of {n}s. Look at the two rods: {a} and {b}." · `countOn` "{a} and {m} more group of {n}." · `countBack` "{a} take away {m} group of {n}." · `quickBuild` "Build it: copy lit rungs into the track." · `locked` "Try first — the rods unlock if you need them."
- **celebrations:** `built` "{k} × {n} = {p}. You built it from {a} {op} {b}!" · `rung` "{k} × {n} = {p}. Rung {k} is lit!" · `passBuild` "The whole {n} ladder is lit!" · `passQuick` "You knew the whole {n} table!"
- **settings:** "Table" — "2, 3, 4, 5, 10" / "6, 7, 8, 9" / "mixed" · "Mode" — "build, then quick" / "build" / "quick"
- **aria:** rung "Rung {k}: {k} groups of {n}, {state}" — states "lit, {p}" / "lit, {p}, built from {a} {op} {b}" / "not yet"; track "Track of rung {k}: {filled} of {k} groups filled" / "overhangs by {o} groups" / "latched: {a} {op} {b}"; clear "Clear the track".
- **Locale traps:**
  - **Multiplication sign:** `·` in de, sv, da, no, fi; `×` in en, fr, es, pt, it, nl — the shipped set in `mini tools/folding-wall.js:471` (`opGlyph`). Fact line, tags, recipes, celebration and the fold-out table all use it. The minus is U+2212 "−", never a hyphen; the gate asserts the page font covers ×, ·, − (`document.fonts.check`).
  - **Factor order in the written fact:** `factOrder` per locale — `"k×n"` (en, de, nl, sv, da, no, fi; "7 · 6" = seven groups of six) or `"n×k"` (fr, es, pt, it school tables print the 6-table as 6 × 1, 6 × 2 …). Fact line, celebrations and fold-out follow it; the ladder's meaning (rung k = k groups of n) and the hint words "{k} groups of {n}" do not change. The native reviewer confirms each locale's school order. Line 2's width does not depend on factor order (measured worst `100 − 20 = ▢`).
  - **Strategy words** stay numerals on screen ("5 + 2", "10 − 1"); the bubble's "built it from" phrase is authored per locale (de "aus … gebaut", fi "rakensit … ", with the case the fi author chooses — reviewed).
  - **"rung" / "track":** ladder words in every locale (Sprosse, barreau, peldaño, degrau, piolo, sport, pinne, trin, trinn, puola); "track" = the groove (Rille, rainure, ranura, canaleta, scanalatura, gleuf, skåra, rille, rille, ura) — authors pick the child word, never "level".
  - **"groups of {n}":** ICU plurals; fi partitive ("6:n ryhmää" style, authored, reviewed).
  - **Number words** only via TTS; numerals on the apparatus.

## 10. Sound off, access, phones
- **Sound off:** couple, cut, latch, refusal, ghost and counts are all drawn (seam glint, falling group, latch closing, bump wobble, coral ghost, running numerals).
- **Keyboard:** Tab / ↑ ↓ focus lit rungs, + couples or cuts into the asked track, Escape clears, digits type, Enter checks; focus ring teal 3 px.
- **aria:** as §9; live region after each drop and each Check.
- **Taps:** keys ≥ 50 × 44, ↺ 44 × 44, tags 44 × 44 hit areas; rods are grabbed by their whole row — 44 px tall at 704, **38 at 360, 34 at 320** (the canvas-cell floor of 34, never below; every pixel of the ladder belongs to exactly one row, so there is no dead zone). The drop zone is 102–132 px tall.
- **Pictures:** none.
- **Fold:** Check (keypad bottom) at 696 on 360 × 740 and 628 on 320 × 640 (measured).
- **Phone changes:** fact block on top in two lines, ladder full width, slots without numerals (n on the rod label), keypad in two rows.

## 11. Distinct from
- **Tool `baking-tray`:** splits ONE 2-D array of buns (7 rows of 6 → 5 rows + 2 rows) on the tray — a decomposition of a picture, with no total. Here there is no array: the child copies whole **facts** off a ladder of rods and assembles the unknown one by coupling **or cutting** (subtraction from ×10 and doubling are moves the tray does not have), the end stop proves the length, and the child writes the product — the derived fact is a sum or difference of two known products, used for fluency.
- **Tool `folding-wall` / `doubling-mirror`:** putting away known tables on a 100-card wall; closing a tray to double a quantity. Neither builds one fact from others.
- **New 290 The Station Signal:** two trains stop level to light an "=" between two expressions. Here the target is a fixed-length track on a ladder of facts and the pieces are copies of facts already lit; the move is couple / cut, not compare.
- **Row 192 The Echo Grove · New 288 The Walking Dividers · Row 139 The Accordion Sentence:** what a product IS (copies of one group, equal steps, equal pleats). The ladder assumes that meaning and builds an unknown product from known products.
- **New 291 The Turntable (commutativity) · New 292 The Pouring Frame (unknown factor) · New 305 The Tile Roller (area rows):** different standards; no fact derivation.
- **Row 141 The Flip Pads · New 252 The Washing Line · New 272 The Double Stamp · tool `choral-counting`:** counting by n along a line, scaled pictographs, a chart inked in order. The ladder never counts from zero; rods jump in from the nearest known facts, often downward.
- **Row 87 The Rung Ladder (equal sums) · Built #19 The Number Elevator (comparison) · New 297 The Taut String (patterns):** a ladder/staircase shape, but none has copyable fact rods, coupling, cutting or a latch.
- **The first version of this file:** ▲/▼ added or took one group at a time and the child mostly typed recall. Now the child picks the strategy and does the derivation with the hand.

## 12. Build plan
- **Core state:** `{ setting:{tables, mode}, n, pass:'build'|'quick', order:[k…], idx, asked, rungs:[{k, state:'dark'|'lit', recipe:null|[[op,r]…]}×10], track:{k, pieces:[[op,r]…], len}, typed, misses, unlocked }`.
- **Core functions:** `product(k,n)`; `drop(r)` → `{result:'couple'|'cut'|'refused', len}` by the rule in §5 (couple while `len ≤ k`, refused past 10; cut while `len > k`, refused if `r ≥ len`; refused at 4 pieces); `latched()` = `len === k && pieces.length ≥ 2` (derived) ; `readout()` = the pieces' products with their ops; `clearTrack()`; `ghost(typed)` → `{full, partial, over}` against k·n; `judge(typed)`; `canonical(k)` = 2+1 / 2+2 / 5+1 / 5+2 / 10−2 / 10−1 (or the child's recipe in a quick pass); `passOrder(table, pass, seed, prev)`.
- **Gate ground truth (`verify-table-ladder-core.js`, its own enumeration — `work-s293/builds.js` is the reference):** (1) for every table 2–10 and k 1–10 `judge` accepts only k·n; (2) re-implement the drop rule independently and compare `drop()` on every sequence of ≤ 4 drops from every lit set ⊆ {1..10} for every k: same result, same length, same refusals; (3) every derived k has ≥ 1 two-piece build from {1,2,5,10} and the counts equal `builds.out` (3/2/2/2/1/1); (4) the 85 non-latching 2-drop sequences from the anchors each leave `len ≠ k` or are refused, and `latched()` is false for all of them; (5) no single rod latches a derived track; (6) `readout()` evaluates to k·n for every latched build in (2); (7) in a build pass the answer box is disabled until latched, and a lit rung's product never appears on the asked rung before success (render text after every drop sequence); (8) ghost: 7 × 6 → 36 = 6 full / 0 partial; 32 = 5 full + 2 partial; 59 for 9 × 6 = 9 full + 5 partial; 420 capped at the buffer stop + arrow "+378"; (9) miss 2 never shows k·n (its last count stops one group short); (10) quick pass: rods locked until a miss; miss 2 replays the stored recipe of that rung; (11) 500 seeded passes → 0 identical consecutive orders, first-asked counts within 30–70; (12) widths/heights of `fit.out` at 320 / 360 / 704 re-measured from the real DOM with ≥ 4 px to spare horizontally and Check ≤ 640 / 740; (13) `opGlyph` and `factOrder` per locale.
- **Mutations (each must be killed):** couple allowed past slot 10 · cut allowed with `r ≥ len` · drop always couples (no cutting) · latch when `len ≥ k` (overhang accepted) · a single piece latches a derived track · answer box enabled before latch · readout sums the multipliers instead of the products (5 + 2 → "7") · cutter removes 1 slot instead of 1 group · ghost floors partial slots (hides "not a multiple") · miss 2 counts the last group (gives the answer) · quick pass rods unlocked from the start · miss-2 replay ignores the child's recipe · anchors not first in a build pass · lit rungs reset between rounds · `factOrder` ignored · `opGlyph` hard-coded "×".
- **Local test:** real pointer drags — copy, couple, cut, refusal, clear — for a full build pass and quick pass of every table at 320 · 360 · 412 · 704 · 768 · 1024 · 1366; assert the copy lifts within 100 ms, the overhang never passes the buffer stop, Check's bottom ≤ viewport; keyboard path for one whole pass; fold-out renders 10 lines in each locale's factor order and glyph.
- **Pictures:** none.
- **Risks:** 320 × 640 has 12 px of height to spare and 1.8 px around the narrowest rod label — any padding change must be re-measured; drag precision at 34 px rows (mitigated by the 102 px drop zone and row-wide grab areas, and by the keyboard path); 28 of 54 readouts cross a ten — the count across the seam is the scaffold, and the "6, 7, 8, 9" setting is where it bites.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — copying a rod that never runs out, the clunk of coupling, the snip that drops a group off the end, a latch that only closes when you got it right, and a ladder that keeps the recipes you invented. The quick pass is the "now I just know it" payoff.
2. **Would a teacher put it on the board?** Yes — "How did you build 8 × 7?" has visible answers (10 − 2, 4 + 4), the strategies of 3.OA.C.7 are done by hand rather than told, off-by-a-group and "subtract 1 instead of a group" errors are diagnosed as shapes, and the quick pass checks fluency.
3. **Would a parent trust it?** Calm, numerals and drawn geometry only, no timer, no score, misses answered by a picture of the child's own number.
4. **The invention:** "Every lit rung is a rod you can copy, and a rung's track only latches when it is filled exactly — so an unknown fact is built by coupling two known ones or by laying in a longer one and snipping a group off."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→4 · (reality 5→4)
What changed:
- **The derivation moved into the hand.** The ▲/▼ one-group climb and the typed-recall core are gone; a build round cannot be answered until the child has assembled the rung from lit rungs, choosing the strategy (one more, double, five and some, ten take away), and the end stop proves it. Measured: every derived rung is reachable in two pieces from the anchors; all 85 non-latching anchor builds are visibly wrong.
- **Fluency kept, not sacrificed:** default mode pairs every build pass with a quick (recall) pass; the build is the miss help there, replaying the child's own recipe.
- Two misconceptions the old file could not show are now material: "ten take away 1" (the cutter is a whole group) and "five and 2" (the 2-rod reads 12).
- Re-budgeted every width and height for two-line fact readouts (the one-line readout overflowed by 1–15 px at all three widths); phone rung steps raised to 38 / 34 so the rod rows meet the 34 px canvas-cell floor.
- **Honest debits:** distinctness drops to 4 — coupling known-fact lengths shares the distributive idea with tool `baking-tray` and length-equality with New 290; the mechanic (copy / couple / cut on a fact ladder) is different, but the mathematics overlaps. Reality drops to 4 — 34 px rows at 320 are dragged with a fingertip (keyboard and wide drop zones mitigate), and 28 of 54 readouts cross a ten, so the 6–9 tables carry real addition load inside a "fluency" instrument.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
