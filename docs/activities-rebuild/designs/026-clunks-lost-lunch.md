# Row 26 — Clunk's Lost Lunch → THE SNAKE-GROOVE LUNCHBOX (K.OA.A.3)

## 0. Identity
- id `clunks-lost-lunch.make-total.k-oa-a-3` (KEPT; slugs/metadata frozen) · grade K · CCSS K.OA.A.3 · Operations & Algebraic Thinking · own files `snake-lunch-core.js`, `snake-lunch-activity.js`, `snake-lunch-activity.html`, `snake-lunch-activities.json` (the row leaves `clunks-lost-lunch-activities.json`, which is emptied to `[]`; the id is unchanged). Slugs en/de/fr/es/pt/it/nl exist; sv/da/no/fi slug, title and intro are new at build.
- Frozen title "Clunk's Lost Lunch — Make the Number Many Ways"; frozen intro promises: Clunk the snack-robot is hungry for an exact number; his adding chip cracked so the child helps; pick snacks off the wall into his lunchbox to make his number any way you like; feed him; then make it again a whole new way. **All kept true** (the wall, the lunchbox, the feed, the second way).
- Worksheets also covered: **K-243** Number Bonds to 10 · **K-273** Number Bonds to 5 · **K-274** Number Bonds Within 10 · **K-414/415/416/417** Number Bonds of 6/7/8/9 (the lunch log records every lunch as a part-part-whole strip) · **K-276** Find the Whole (the "What did Clunk eat?" rounds) · **K-277** Make Ten with Counting Dots (the groove IS a ten-frame folded into a snake; the empty cups are the dots still to fill).
- Old activity: an SVG-stub robot, a wall of snacks each carrying a hunger NUMBER, a lunchbox that deliberately showed no running total, a feed lever that was the only judge, nine rounds in seven schemas (free, two-ways, missing-addend, multi-completer, exact-n, constrained-wall, reduce), targets up to 14. **Kept:** the wall, the lunchbox, the feed lever as the only judge, the "now a whole new way" loop (multiset-distinct, the old rule), every schema and every target of the old table (12 and 14 move to an optional "Big lunch" level so the main levels stay inside K.OA.A.3's "≤ 10"). **Changed:** a snack is no longer a numeral to add in the head — it is a **strand** of identical library treats that physically snakes into a groove of exactly Clunk's number of cups; Clunk is the library toy robot, not an SVG stub.

## 1. The pitch
"Clunk's lunchbox has a snake-shaped groove with exactly his number of cups — lay snack strands in, and the lid only snaps shut when the groove is exactly full: no empty cup, nothing hanging over the edge."

## 2. Why a child will want it again (the fun)
- **The strands slither.** Drop a strand of three strawberries on the box and it does not just appear: it slides in nose-first and follows the snake round the hairpin bend, cup by cup (90 ms per cup, a soft "plip" per treat, each one semitone higher). Children drop strands just to watch them snake.
- **The lid is a real snap.** When the groove is exactly full the lid swings down by itself and clicks — a double "click-CLACK". If a strand is too long, its tail dangles over the rim; tap the lid and it lands on the tail, bonks and springs back open. You SEE why.
- **Clunk eats.** Pull the feed lever: the closed box rolls along a little conveyor to Clunk (library robot), he hops twice, three grey steam puffs rise behind him and a "crunch-crunch-crunch" plays. A box that cannot close cannot be fed — the lever is padlocked until the lid clacks — so nobody is ever told off.
- **The lunch log.** Every lunch Clunk eats prints a strip in his log (cup bars in two or three colours with the equation under them: `10 = 6 + 4`). A second, different way prints a second strip; the log becomes a picture of "many ways".
- **The over-full box** (take-away rounds) arrives bulging, tails dangling, lid bobbing — children love yanking strands out.
- **Free play ("Snack bar"):** any box 2–10, every strand 1–9, no judging, the log writes the equation itself. Just pack lunches.

## 3. The skill and the misconception
- **Skill (K.OA.A.3):** decompose numbers ≤ 10 into pairs (and into three parts) in more than one way, using objects, and record each decomposition (`8 = 5 + 3`). The worksheets add the missing part (K-243/273/414–417), the whole (K-276) and make-ten with dots (K-277).
- **Misconception 1 — "any two snacks will do" / "the parts can add to more than the whole."** **Push back:** the groove has exactly N cups. Too much: the strand's tail physically hangs out of the box and the lid cannot close on it. Too little: empty dimples stay visible and the lid stops 30° above them, resting with a gap the child can see.
- **Misconception 2 — "there is only one way to make 10."** **Push back:** after Clunk eats, the box comes back empty and the log shows one printed strip with dashed blank strips below it. A repeated lunch prints a strip that slides onto its twin and merges — only a NEW way gets a new strip.
- **Misconception 3 — "6 + 4 and 4 + 6 are two different lunches."** Here they are one lunch (the old activity's multiset rule, kept): the log always prints the parts biggest-first, so a 4-strand-then-6-strand lunch lands on the existing `10 = 6 + 4` strip. A lunch is the SET of snacks. (The mirror-as-new-way lesson belongs to row 25's turntable; this activity deliberately teaches the set.)
- **Misconception 4 — re-counting from 1 instead of seeing the part (K-277).** The groove runs in rows of five like a ten-frame, so 6 filled cups read as "a full row and one" and the 4 empty dimples are a picture of the missing part.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (left column 500 px, right column 156 px — the lunchbox needs five full-size cups in a row):**
- **Task line** 22 px, one line: the round prompt (§9).
- **The snack wall** (500 × 260 px, two peg rows of up to four): a pegboard (cream #FBF3E4, 2 px ink outline, faint peg holes) with 3–7 hanging strands. On its peg a **strand is coiled**: ONE library treat at 96 px (the strand's "face"), a round **numeral tag** (36 px disc, 22 px Baloo 2 digit) clipped to its thread, and under it a row of k **pips** — drawn tool-grade dots (12 px, ten-frame rows of five) that show the strand's length. The pips are apparatus, not shrunken pictures (orchestrator size ruling), and with tags hidden they are the K-277 counting dots. A coil is the same size whatever k is, so a long strand does not look "bigger" on the wall. One treat kind per round (identical instances).
- **The lunchbox** (500 × 300 px): a drawn box (teal #146B5E rim 4 px, cream inside) with a **snake groove** of exactly N cups (cup = 98 px dimple, 2 px ink, inner shadow; a treat in a cup is a full 96 px library picture — the strand UNCOILS into k separate treats when it snakes in). Cups run in rows of five: row 1 left→right, a hairpin bend, row 2 right→left. N ≤ 5 → one row; 6–10 → two rows; Big lunch 11–14 → three rows. N is painted on the box's front plate (40 px). The **lid** is a hinged teal panel, open at rest (tilted back 70°, drawn in perspective above the box).
- **Clunk** (right column): library **toys/robot** at 120 px on a short conveyor (drawn rollers) that runs from the lunchbox's right edge to him. Over his head a **hunger cloud** (drawn speech-cloud outline, no words) shows N in 44 px digits — the target.
- **Feed lever** under Clunk: 64 px coral knob on a stand; locked (55 % opacity, small padlock glyph) until the lid clacks.
- **The lunch log** (148 × 150 px slip): each strip = N mini cups (12 px) coloured by part (coral #F2784B, teal, gold #E8A53A for a third part) with the equation at 18 px. Blank strips are dashed: as many as the round asks for.
- **Bubble** (≤ 3 lines, 18 px) under the log; speaker 36 px inline with the task line.

**At 360 px:** stacked: task line → Clunk row (robot 88 px left, hunger cloud 36 px digits, lever 56 px right) → snack wall as a shelf 336 × 200 (two rows of four coils, coil treat 64 px + pips 9 px) → lunchbox 336 × 200 (cups 66 px holding 64 px treats, a row of five = 330 px) → bubble → the log as a row of strip-chips. The lever is the Check. Check (the lever, moved to sit beside the lunchbox's front plate on phones) bottom ≈ 700 px at 360 × 740. **At 320 × 640:** cups 60 px (treats 58 px — the one recorded exception to the ≥ 64 px picture rule, phones under 360 only), coils 56 px, Clunk 64 px, the log collapses to dots (one per way found); the snack wall scrolls sideways in one row so the lever stays ≈ 620 px.

**Treats (library, one kind per round; seen on the contact sheets):** fruits/strawberry, fruits/blueberry, fruits/raspberry, desserts and sweets/muffin, desserts and sweets/cookie, desserts and sweets/donut, desserts and sweets/cupcake. (There is NO macaron in the library — critic check of desserts-and-sweets.json.) Ruled out: fruits/cherry (drawn like an apple, #14's ruling), anything sliced or stacked (cake, pancake, pie, brownie, waffle — not clean units), candy cane (reads as a hook), lollipop (a stick that fights the thread).

**Words on the apparatus:** numerals only (tags, the box plate, the hunger cloud, the log equations).

## 5. The hand
- **Drag a strand** from the wall onto the box (or tap it: it flies to the box, 260 ms). Within 40 ms of touch it lifts (scale 1.06, shadow). On drop the coil **unwinds and snakes in**: the face treat lifts off the peg, the pips become k treats one by one, and the head treat goes to the first empty cup and the rest follow the groove path at 90 ms per cup, "plip" tones rising (C5 upward). The thread is drawn along the groove so the strand stays one visible object, even round the hairpin.
- **Overflow:** if k > empty cups, the strand fills the remaining cups and its extra treats hang out over the rim at the end of the groove (they swing 300 ms, outlined coral). The lid can still be tapped: it swings down, lands on the dangling treats, bonks and springs back (420 ms).
- **Under-fill:** a tap on the lid swings it down to 30° above the cups — a visible gap over empty dimples — and it rises again with a soft low tone.
- **Exactly full:** 300 ms after the last plip the lid closes on its own: "click-CLACK"; the lever's padlock drops off with a bounce.
- **Take a strand out:** tap any treat of a strand in the box → the whole strand slithers back out tail-first (90 ms per cup) and returns to its peg. One tap is always the undo. Locked strands (brass clip) cannot be taken out — they give a tiny shake.
- **Feed:** drag the lever down 40 px or tap it (= Check). Judged (§7). On success the box rolls on the conveyor (600 ms), tucks behind Clunk, Clunk hops twice (translateY −14 px, 2 × 220 ms), three steam circles rise, "crunch ×3"; the log prints the strip (slip extends, 500 ms, paper-feed sound); an empty box slides back (whoosh) and the wall restocks with the same strands on shuffled pegs.
- **Free play ("Snack bar"):** box chooser 2–10, all strands 1–9, no padlock, the log writes itself.

## 6. The rounds
**Round kinds (all from the old table, renamed):**
- **ANY WAY** (old *free*): fill N with any strands; after the first feed the prompt asks "Now a whole new way" once (skipped only if the wall allows a single multiset). Two different lunches end the round.
- **TWO WAYS** (old *two-ways*): two different lunches asked from the start; the log shows two dashed strips.
- **HALF PACKED** (old *missing-addend*): one strand is already locked in the groove; add the ONE strand that fills it. One right answer.
- **FINISH WITH TWO** (old *multi-completer*): a locked strand; fill the rest with exactly two strands (the lid shows two clip slots).
- **EXACTLY K** (old *exact-n*): the lid carries k clip slots; a full box closes, but Clunk takes only k strands.
- **ONLY THESE** (old *constrained-wall*): the wall holds only the listed strands.
- **TOO FULL** (old *reduce*): the box arrives over-full; take strands out until it closes. One right kept set.
- **WHAT DID CLUNK EAT?** (new, K-276 find the whole): two strands lie in a box with a blank plate; the groove is exactly as long as the two strands; Clunk's cloud shows "?"; the child sets the cloud with a numeral row 2–10 (48 px keys). The feed accepts only cloud = cups.

Way-kinds (ANY WAY, TWO WAYS, FINISH WITH TWO, EXACTLY K, ONLY THESE) accept any lunch that satisfies the rule — the standard's "in more than one way" requires it; single-answer kinds (HALF PACKED, TOO FULL, WHAT DID) have exactly one right answer. Every solution list below is the full enumeration of the wall's multisets.

**Level "Up to 5" (K-273) — 8 rounds:**
| # | kind | N | wall / box | right answers |
|---|---|---|---|---|
| 1 | ANY WAY | 5 | wall 1, 2, 3, 4 | {4+1}, {3+2} |
| 2 | TWO WAYS | 4 | wall 1, 2, 2, 3 | {3+1}, {2+2} |
| 3 | HALF PACKED | 5 | locked 3 · wall 1, 2, 4 | 2 |
| 4 | WHAT DID | — | box 2 + 3 | 5 |
| 5 | HALF PACKED | 4 | locked 1 · wall 2, 3, 4 | 3 |
| 6 | ANY WAY | 3 | wall 1, 1, 1, 2 | {2+1}, {1+1+1} |
| 7 | WHAT DID | — | box 1 + 3 | 4 |
| 8 | TOO FULL | 5 | box 2, 2, 3 | keep {3+2} |

**Level "6 to 10" (K-274, K-414–417, K-243, K-277) — 9 rounds (the old table's ≤ 10 rows):**
| # | kind | N | wall / box | right answers |
|---|---|---|---|---|
| 1 | ANY WAY | 10 | wall 2, 3, 4, 6, 7, 8 | {8+2}, {7+3}, {6+4} (old make-ten) |
| 2 | TWO WAYS | 8 | wall 1, 2, 3, 5, 6 | {6+2}, {5+3}, {5+2+1} (old two-ways-eight) |
| 3 | HALF PACKED | 10 | locked 6 · wall 2, 3, 4 | 4 (old clunk-holds-6) |
| 4 | FINISH WITH TWO | 10 | locked 6 · wall 1, 2, 2, 3 | {3+1}, {2+2} (old finish-with-2) |
| 5 | EXACTLY 3 | 10 | wall 2, 3, 3, 4, 4, 6 | {4+4+2}, {4+3+3} (old exactly-three; the 6 is there so a full box of 6 + 4 closes the lid but breaks the clip rule — without it every full box had three strands and the rule could never bite) |
| 6 | ONLY THESE | 10 | wall 3, 3, 4, 6, 7 | {7+3}, {6+4}, {4+3+3} (old no-fives-wall) |
| 7 | TOO FULL | 8 | box 2, 3, 4, 5 | keep {5+3} (old too-full, re-tabled so one kept set exists) |
| 8 | HALF PACKED | 7 | locked 4 · wall 2, 3, 5, 6 | 3 (no two wall strands sum to 3, so "one snack" has one answer) |
| 9 | WHAT DID | — | box 6 + 3 | 9 |

**Level "Big lunch" (optional; the old 12 and 14) — 7 rounds:**
| # | kind | N | wall / box | right answers |
|---|---|---|---|---|
| 1 | ANY WAY | 12 | wall 3, 4, 5, 7, 8, 9 | {9+3}, {8+4}, {7+5}, {5+4+3} (old make-twelve) |
| 2 | TWO WAYS | 14 | wall 4, 5, 6, 7, 7, 8, 9 | {7+7}, {8+6}, {9+5} (old two-ways-14) |
| 3 | HALF PACKED | 12 | locked 7 · wall 3, 4, 5, 6 | 5 |
| 4 | WHAT DID | — | box 8 + 5 | 13 |
| 5 | EXACTLY 3 | 12 | wall 3, 4, 4, 5, 6, 8 | {5+4+3} (8 + 4 closes the lid in two strands — the clip rule refuses it) |
| 6 | TOO FULL | 11 | box 2, 3, 4, 6 | keep {6+3+2} |
| 7 | HALF PACKED | 13 | locked 9 · wall 2, 3, 4, 6 | 4 |

No 0 anywhere (no 0-strand, no empty part, no N + 0). The gate re-derives every solution list by its own brute force and fails the build if a single-answer row has ≠ 1 answer or a way-row has fewer ways than it asks for.

**Answer position:** the wall's peg order is shuffled every round and every restock; the single right strand of HALF PACKED rounds lands in every peg position equally often (gate: uniform ± 3 % over 10 000 seeds); the longest strand is not parked at an end more than chance. Single answers in a level differ round to round (Up to 5: 2, 3, and WHAT DID wholes 5 and 4; 6 to 10: 4, 3; Big lunch: 5, 4, WHAT DID 13).

**Order:** order-only reshuffle per pass; never the same order twice; the first round of each pass is an ANY WAY round (the snake is the hook); no two TOO FULL or WHAT DID rounds adjacent.

## 7. Check, the misses, the success
- **Lever tapped with an empty box:** no miss; the lever wiggles in its padlock, the first strand on the wall bobs; bubble **"Drag a snack into the lunchbox."**
- **Lid tapped / lever tapped with empty cups:** no miss (the lid shows the gap); **"Some cups are still empty."**
- **Lid tapped / lever tapped with a tail over the edge:** no miss (the lid bonks); **"Too much! A snack is hanging over the edge."**
- **Three lid tries in a row without a strand changing** (blind trying): the empty dimples get dotted outlines numbered on from the full part (after 6 full cups the empties read 7, 8, 9, 10) — the count-on picture of K-277. **"Count on to {n}."** (not a miss; it is the help a stuck child needs)
- **Miss 1 — closed box that breaks the round's rule:** EXACTLY K: the lid's clip slots light — filled slots teal, the missing or extra one coral — and the padlock clicks back on. **"Clunk wants exactly {k} snacks."** A repeat way: the matching printed strip lifts and glows. **"Clunk ate that lunch already. Pack a new way!"** WHAT DID with the cloud wrong: the cups light one by one in counting order (160 ms each) and the cloud numeral flashes coral. **"Count all the cups."**
- **Miss 2 (the same rule broken again):** the strands on the wall that could finish a valid lunch RIGHT NOW get a soft teal glow on their tags — all of them, never one, so it is a narrowing, not an answer key; in WHAT DID the lit cups keep small numerals 1, 2, 3 … and the matching key glows. **"These snacks could fit."** / **"There are this many cups."**
- **A new move** (a strand in or out, a key pressed) **takes the help away** until the next Check.
- **Success (each lunch):** the feed show (§5) and the bubble reads the printed strip: **"10 = 6 + 4 — yum!"** After the second different way: **"Two different lunches, and both make 10!"** TOO FULL: **"Just right — 8 = 5 + 3!"** WHAT DID: **"Clunk ate 6 and 3 — that's 9!"** Pass end: the whole log slip prints out and Clunk spins once (360°, 900 ms): **"Clunk's lunch log is full!"**

## 8. Settings
1. **Lunch size:** Up to 5 / 6 to 10 / Big lunch (default 6 to 10) — the groove at rest changes from one row of five cups to two rows to three.
2. **Number tags:** Show / Hide (default Show) — Hide removes the numeral tags from the strands, so the parts must be counted as objects (the K-277 counting-dots stage for children not yet reading numerals); the log still prints numerals.

## 9. Words (EN source)
- on-screen title: **Clunk's Lost Lunch**
- instruction: **Drag snacks into the lunchbox until every cup is full. When the lid clicks shut, pull the lever to feed Clunk.**
- prompts: ANY WAY **Fill Clunk's lunchbox: {n} cups.** · second way **Yum! Now pack {n} a whole new way.** · TWO WAYS **Pack {n} two different ways.** · HALF PACKED **{g} are packed. Add one snack to fill the box.** · FINISH WITH TWO **{g} are packed. Fill the box with exactly two snacks.** · EXACTLY K **Fill {n} cups with exactly {k} snacks.** · ONLY THESE **Only these snacks today! Fill {n} cups.** · TOO FULL **Too full! Take snacks out until the lid shuts.** · WHAT DID **What did Clunk eat? Set his number.**
- hints: **Drag a snack into the lunchbox.** · **Some cups are still empty.** · **Too much! A snack is hanging over the edge.** · **Count on to {n}.** · **Clunk wants exactly {k} snacks.** · **Clunk ate that lunch already. Pack a new way!** · **Count all the cups.** · **These snacks could fit.** · **There are this many cups.**
- success: **{n} = {a} + {b} — yum!** (three parts: **{n} = {a} + {b} + {c} — yum!**) · **Two different lunches, and both make {n}!** · **Just right — {n} = {a} + {b}!** · **Clunk ate {a} and {b} — that's {n}!** · **Clunk's lunch log is full!**
- free play: **Snack bar** · settings: **Lunch size** — **Up to 5** / **6 to 10** / **Big lunch** · **Number tags** — **Show** / **Hide**

**Locale traps:**
- **"Clunk"** stays the name in all 11 locales (a sound-word; the frozen en/de/fr/es/pt/it titles use it; the old nl strings use it too). Reviewer confirms it reads as a name in sv/da/no/fi.
- **"Snack":** keep the old choices — de "Snacks", fr "goûters", es-MX "botanas" + "lonchera", pt "petiscos" + "lancheira", it "bocconcini" + "cestino", nl "hapjes" + "lunchbox"; new: sv "mellanmål" + "matlåda", da "snacks" + "madkasse", no "matbit" + "matboks", fi "välipala" + "eväsrasia".
- **"{g} are packed"** refers to the round's treats and needs the treat plural with agreement: author full per-locale templates using the `image-vocabulary.js` plural ("6 strawberries are packed", de "6 Erdbeeren sind schon drin", fr "6 fraises sont déjà rangées", fi partitive "6 mansikkaa on jo laatikossa"), never "{n} {noun}" concatenation.
- **Equation form** `10 = 6 + 4` (whole first, as the bond worksheets print it) in every locale; "+" and "=" are universal. The WHAT DID success uses per-locale cardinals in their abstract (masculine) form — pt "seis e três", it "sei e tre", es "seis y tres".
- No dates, money, decimal or alphabet issues; numerals 1–14 only.

## 10. Sound off, access, phones
- Legible silent: the snake fills visibly, the lid shows gap / bonk / clack, the padlock shows whether Clunk can eat, the log shows the equation.
- Keyboard: Tab through the wall strands (Enter = send to the box), Tab into the box (Enter on a strand = take it out), L = tap the lid, F or Enter on the lever = feed; in WHAT DID, digits set the cloud.
- aria: strand "strand of {k} {treats}"; box "lunchbox, {n} cups" (the filled count is announced only after a feed or Check, so the count is not done for the child); lever "feed lever, locked/unlocked"; a live region reads each printed log strip.
- Taps: strands ≥ 64 px tall hit area; lever 64/56 px; numeral keys 48 px; cups 64 px (58 at 320).
- Reduced motion: strands appear in their cups without slithering; the lid fades between states; Clunk does not hop.

## 11. Distinct from
- **Row 25 Spring Switch (designed):** a stream of crates routed by a switch into two cars — two parts only, never placed directly. Here the child **chooses whole parts** from a wall into a fixed-length groove; three-part lunches, constraint rounds and take-away rounds exist; the pushback is a lid that cannot close.
- **Row 27 Lantern String (this batch):** two numerals lit from the two ends of one string. **Row 28 Ten-Seat Wheel (this batch):** the missing part as riders boarding a wheel. **Row 30 Overflow Trays:** teens. None packs a fixed container with chosen parts.
- **Built #14 Treat Box:** counts out a given number one by one; here treats arrive pre-counted in strands and the task is composition.
- **part-whole-frame / ten-frame tools:** free counter placement; the snake groove, the strands and the lid are the invention here.

## 12. Build plan
- **Core state:** `{ level, tags, order[], idx, kind, n, wall:[{id,k,peg}], box:[{id,k,locked}], lid:'open'|'gap'|'bonk'|'shut', clipsK:null|int, ways:Set('6+4'), cloud:null|int, misses, lidTries, help }`.
- **Functions:** `drop(id)` (append strand; overflow = max(0, Σ − n)), `takeOut(id)` (refused for locked), `tryLid()` → `'gap'|'bonk'|'shut'`, `feed()` → `{ok, reason:'notShut'|'clips'|'repeat'|'cloud', way}`, `setCloud(v)`, `nextTask(index)`.
- **Gate `verify-snake-lunch-core.js` (own oracle, not the core's code):** (1) `tryLid()==='shut'` iff Σbox = n — exhaustive over every subset of every wall of every table; (2) overflow treats drawn = Σ − n, never negative; (3) `feed` succeeds iff shut AND the kind's rule holds (k strands; a new multiset; cloud = Σ); (4) 6+4 and 4+6 are one way; (5) the gate's own brute force reproduces every solution list in §6, single-answer rows have exactly one answer (for HALF PACKED: no combination of two or more wall strands also fills the gap), way-rows have ≥ the ways they ask; every EXACTLY K wall also allows at least one full box with ≠ k strands (the rule is never vacuous); (6) locked strands cannot be removed; (7) no 0 anywhere; no target > 10 outside Big lunch; (8) peg position of the single right strand uniform ± 3 % over 10 000 seeds; (9) the log prints parts biggest-first; (10) the round-6 "new way" prompt is skipped only when the wall allows one multiset.
- **Mutations (one per rule):** lid shuts at Σ ≥ n; lid shuts at Σ ≤ n; feed allowed with the lid open; order-sensitive ways; a locked strand removable; EXACTLY K ignores k; a repeated way banked; WHAT DID accepts cloud ± 1; overflow drawn as 0; an EXACTLY K wall where every full box already has k strands; a 0-strand on a wall; help persists after a move; peg order fixed; log prints in drop order.
- **Pictures to verify on a contact sheet:** toys/robot, fruits/strawberry, fruits/blueberry, fruits/raspberry, desserts and sweets/muffin, cookie, donut, cupcake (all exist in the theme JSONs; macaron does not). **Risks:** the hairpin path at 320 px must keep cups ≥ 58 px; per-locale plural agreement in "{g} are packed". Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — strands that slither round a bend, a lid that bonks or clacks, a robot that hops and puffs steam: it is a lunchbox toy that only shuts when you get it exactly right.
2. **Would a teacher put it on the board?** Yes — "How else can we fill ten cups?" The empty dimples are the missing part, the dangling tail is the over-count, and the log becomes the class's list of the bonds of 10.
3. **Would a parent trust it?** Calm, library pictures, no score; the child's own strands make every equation, and the lever only feeds a lunch that is genuinely right.
4. **The invention:** a lunchbox whose snake-shaped groove holds exactly Clunk's number, so a lunch is right only when the lid can physically snap shut over it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 2→5
What changed:
- Picture size law: treats were 44 px on the wall and 64 px in the cups at 704 (rule 4 wants 96). The wall now shows each strand COILED — one 96 px treat + its numeral tag + k drawn pips — and the strand uncoils into full 96 px treats (64 at 360) as it snakes into a widened 500 px groove; the pips double as the K-277 counting dots when tags are hidden.
- Both EXACTLY 3 rounds were vacuous (every full box already had three strands, so the clip rule could never refuse anything): a 6 (6-to-10) and an 8 (Big lunch) added so a two-strand full box exists and is refused; the gate and a mutation now forbid a vacuous EXACTLY K wall.
- Up to 5 had two WHAT DID rounds both answering 5 → round 7 is 1 + 3 = 4.
- desserts-and-sweets has no macaron (checked the theme JSON) → muffin. Every other solution list re-enumerated by hand: correct.
- Phone layout re-measured for the larger pictures (lever beside the box, wall scrolls at 320).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
