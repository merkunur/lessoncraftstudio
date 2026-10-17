# New 205 — The Hopscotch Court: the hopper that has to turn around (K.CC.A.2)

## 0. Identity
- id `hopscotch-back.play.k-cc-a-2` · grade K · CCSS K.CC.A.2 · strand Counting & Cardinality · key `hopscotch-back` → `mini tools/hopscotch-back-core.js`, `hopscotch-back-activity.js`, `hopscotch-back-activity.html`, `hopscotch-back-activities.json` (scaffold `node scripts/new-activity.js --num=205`).
- worksheets it covers: **K-021** Before and After (as before/after rounds) · **K-022** Stuck in the Middle (between rounds) · **K-023** Blast Off! 10, 9, 8… (count-back runs) · **K-308** Dot-to-Dot: Count Back from 10 (the count-back run leaves a dotted hop-trail joining the numbers backwards, ending in the rocket — the dot-to-dot made by the child's own hops).
- new instrument; nothing to keep from an old activity.

## 1. The pitch
"The hopper only hops the way its nose points — so *before* is a turn and one hop, and the number on the square is the one the child chalks there."

## 2. Why a child will want it again
- **A creature to steer.** A library rabbit, frog, squirrel, duck or kangaroo stands on a chalk hopscotch court. Tap it and it does a little jump-and-spin to face the other way (mirror flip with a 6 px hop, 240 ms, a soft "whup"). Tap a square in front of its nose and it hops there in real arcs, one per square, with a chalk-dust puff on each landing. Children turn it back and forth just to watch it spin — that is allowed and costs nothing.
- **The bump.** Tap a square *behind* it and it does not hop: it leans, bonks an invisible wall, shakes (180 ms) and the chalk arrow under its feet flashes. It is funny, never scolding — and it is exactly the lesson.
- **The chalk is yours.** The court is rain-washed: only the hopper's own square still shows its number. After landing, four chalk sticks rise; the child picks one and watches it *write* the numeral onto the square, stroke by stroke (300 ms, a scratchy chalk sound). The court fills with the child's handwriting-in-chalk.
- **Blast off.** In count-back runs every right chalk stick makes the hopper hop one square back and write the number; on square 1 the library rocket appears, the hop-trail of dotted arcs streams into its exhaust, and it lifts off the top of the stage. "10, 9, 8, 7, 6, 5, 4, 3, 2, 1 — blast off!"
- **Earned show per round:** the chalked number thickens to bold white, the hopper does a double bounce, and a drawn pebble (the hopscotch stone, a grey circle) drops onto the square with a click. No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (K.CC.A.2 + the four worksheets):** name the number just before or just after a given number, name the number between two numbers one apart from it, and count backward from a given number to 1 — producing the number, not reading it off a line.
- **Misconceptions and how the material pushes back:**
  - *Before/after swapped* (giving n+1 for "before"): the hopper faces forward (toward bigger numbers) at the start of every round. To go to "before" the child must first TURN it; a tap behind its nose makes it bump in place. "Before" is felt as a change of direction, never as a different square on the same side. If the child lands on the wrong side anyway (they turned it the wrong way twice), Check shows the sign's arrow and the hopper's nose arrow side by side, pointing opposite ways.
  - *Two away* (n−2 / n+2): every hop leaves one dotted chalk arc per square crossed. The sign card shows exactly one arc. A child who lands two squares away sees TWO arcs next to the sign's ONE — and on a miss the arcs number themselves 1, 2.
  - *Cannot count back without restarting from 1*: in count-back runs only the start square carries a number; each next number must be chalked before the hopper can move, so the backward sequence is SAID by the child one step at a time, not read. A wrong stick bounces off; after two bounces on one square the whole stamped run so far glows in order ("10, 9, 8…") so the child re-enters the run from where they are, not from 1.
  - *Between = one of the ends*: in between rounds the hopper starts OUTSIDE the flags (sometimes beyond the higher flag, facing the wrong way), so it has to travel to the gap and stop there — landing on a flag square or beyond the gap is a visible, diagnosable miss; the chalk choices include both flag numbers, so naming an end is a real mistake too (the chalked numeral would repeat a flag's numeral right beside it).

## 4. The stage
**At 704 (card inner width 656):**
- **Task line** (20 px, one line, above everything): see §9.
- **Sign card** (apparatus, top-left above the court, 132 × 72 px, cream with a 3 px teal outline, like a chalkboard placard): icons only. *After* = a chalk arrow pointing right with ONE dotted arc above it. *Before* = the same pointing left. *Between* = two little flag pennants with a dot between them. *Count back* = a left arrow under a run of three arcs, with the rocket square's numeral (usually "1") at the arrow's tip — the destination. Numerals on the sign are content; no words.
- **The court** (apparatus): up to 10 → one row of 10 chalk squares, each 58 × 58 px, 4 px gaps (616 px wide), drawn as white chalk outlines (3 px, slightly rough-dashed) on a slate-teal ground strip (#2F6F64, 92 px tall) — a playground painted on tarmac. Square 1 has a chalk start line on its left; square 10 (or 20) a double line on its right. Numerals: Baloo 2, 30 px, chalk white; blank squares are empty (the rain washed them), not "?".
- **Up to 20** → two rows of 10 (1–10 on top, 11–20 below — reading order, as on a hundreds chart), squares 58 px, 14 px between rows; the link from 10 to 11 is a chalk curve running from the right end of row 1 down to the left end of row 2; a hop across it is one arc drawn along that curve.
- **The hopper** (library picture, short side 96 px) stands ON its square, feet at the square's centre line, overlapping the strip upward; under its feet a small chalk arrow (24 px, apparatus) points the way it faces.
- **Flags** (between rounds; apparatus): a 4 px pole and a 28 × 20 px pennant planted on the upper-left corner of each flag square, coral for the lower flag, teal for the higher.
- **Chalk tray** (appears after a landing in before/after/between; always visible in count-back): a wooden-brown rail (apparatus, 8 px) under the court carrying 4 chalk sticks, each a rounded tile 76 × 56 px with a numeral (Baloo 2, 30 px, white on a pastel stick colour). 12 px gaps.
- **Bubble** (feedback) under the tray; Check button right of the bubble (shell).
- Rocket (count-back finish): `space/rocket`, 110 px tall, appears standing on square 1.

**At 360 (card inner ≈ 328):**
- Up to 10 → the court wraps into **two rows of 5** (1–5, then 6–10), squares 54 px, 6 px gaps (294 px), the 5→6 link a chalk curve down the right side to the next row's left end.
- Up to 20 → **four rows of 5**, squares 52 px (284 px wide, 4 × 52 + 3 × 10 = 238 px tall).
- Hopper short side 64 px (it hops ABOVE the rows; when on rows 2–4 it overlaps the row above, z-ordered on top, 85 % opacity on the square behind it so numbers stay legible).
- Sign card 104 × 56 px, left above the court. Chalk sticks 4 in a row, 70 × 52 px, 8 px gaps (304 px).
- 320 px: squares 48 px, sticks 64 × 50 px.

Picture checks (seen on the contact sheets, theme JSON verified): `pets/rabbit` (side view, faces LEFT), `pets/frog` (three-quarter, faces LEFT), `forest-creatures/squirrel` (faces LEFT), `farm-animals/duck` (faces LEFT), `zoo-animals/kangaroo` (faces LEFT) — each noun stores its native facing; the renderer mirrors with `scaleX(-1)` so the nose always points the hopper's facing. **Refused:** `animals/cat` (the dossier's suggestion) — it sits facing the viewer, so it cannot show a facing. `space/rocket` for the finish (diagonal, nose up-right; it lifts straight up regardless). Everything else (court, sign, flags, arcs, arrow, pebble, tray) is drawn apparatus.

## 5. The hand
- **Tap the hopper** → turns (flip + 6 px hop, 240 ms, "whup"). Unlimited; also the free play between rounds.
- **Tap a square in front of the nose** → the hopper hops square by square to it, 260 ms per square (ease-out up, ease-in down, 18 px apex at 704 / 12 at 360, a 4 px squash on landing), dust puff (three 6 px chalk dots fading, 200 ms), a soft "pat" per landing; each crossed square leaves a dotted chalk arc (2 px, dash 3/4) from centre to centre. First visual response within 60 ms (the hopper crouches). A new hop wipes the previous trail and any chalk the child wrote this round (puff).
- **Tap a square behind the nose** → bump: lean 6° toward it, shake ±4 px × 3 (180 ms), the foot arrow flashes coral twice, a dull "bonk". No hop, no miss counted.
- **Tap its own square** → a squish (scaleY 0.92, 120 ms). Nothing else.
- **After landing** (before/after/between): the tray rises from below (180 ms). **Tap a chalk stick** → the numeral is written onto the landing square as two to four chalk strokes (300 ms, scratch sound); tapping another stick rubs the first out (puff) and writes the new one. Spoken numeral on tap where TTS exists.
- **Count-back runs:** the tray is up from the start. **Tap the right stick** → the hopper hops one square back and the numeral is written on the new square (both in 420 ms). **Tap a wrong stick** → the stick jumps up 8 px, wobbles and drops back (220 ms), "tok"; the hopper stays. Sticks reshuffle after every successful hop.
- **Keyboard:** Tab to the hopper (Enter = turn), ←/→ = hop one square that way (a "behind" press = bump), Tab to the sticks, Enter = chalk. All the same rules.
- **Undo:** any new hop clears that round's chalk; turning never clears anything.
- **Free play:** after a round's success, until "Next", the hopper can be turned and hopped anywhere on the court (it chalks nothing).

## 6. The rounds
A **mixed round** = one task (before / after / between) on one court with one hopper; the child turns if needed, hops, chalks, Checks. A **count-back run** = from a chalked start square back to the rocket square, one stick per hop, ending by itself.

**Mixed, up to 10 (9 rounds)** — hopper always starts facing forward; only the start square (and flag squares) show numbers.

| # | task | start (hopper on) | flags | target | hopper |
|---|------|------|------|------|------|
| 1 | before | 7 | – | 6 | pets/rabbit |
| 2 | after | 3 | – | 4 | pets/frog |
| 3 | between | 8 (beyond the flags — must turn) | 4 & 6 | 5 | forest-creatures/squirrel |
| 4 | before | 10 | – | 9 | farm-animals/duck |
| 5 | after | 6 | – | 7 | zoo-animals/kangaroo |
| 6 | before | 2 | – | 1 | pets/rabbit |
| 7 | between | 3 (below the flags) | 7 & 9 | 8 | pets/frog |
| 8 | after | 1 | – | 2 | forest-creatures/squirrel |
| 9 | after | 2 | – | 3 | farm-animals/duck |

before 3 · after 4 · between 2; targets 1–9 each exactly once; start on an end square (1 or 10) in 2 rounds; "before 1" and "after 10" never asked.

**Mixed, up to 20 (9 rounds)**

| # | task | start | flags | target | hopper |
|---|------|------|------|------|------|
| 1 | before | 14 | – | 13 | zoo-animals/kangaroo |
| 2 | after | 11 | – | 12 | pets/rabbit |
| 3 | between | 12 (below the flags) | 15 & 17 | 16 | pets/frog |
| 4 | after | 19 | – | 20 | forest-creatures/squirrel |
| 5 | before | 11 | – | 10 | farm-animals/duck |
| 6 | after | 10 | – | 11 | zoo-animals/kangaroo |
| 7 | between | 20 (beyond the flags — must turn) | 17 & 19 | 18 | pets/rabbit |
| 8 | before | 16 | – | 15 | pets/frog |
| 9 | after | 13 | – | 14 | forest-creatures/squirrel |

before 3 · after 4 · between 2; targets distinct; rounds 5 and 6 cross the 10/11 link in both directions (the hard place); "after 20" never asked; start on an end square once (round 7, 20). In both levels one between round needs a turn and one does not, so "between" is never "the square after the lower flag".

**Chalk choices (mixed):** four sticks = the target plus three from {n−2, n−1, n+1, n+2} \ {target}, where n = start (for between, n = the middle, so the choices are both flag numbers and n±2). Always includes the *opposite neighbour* (before/after — whenever it exists; round 8 "after 1" has none, so its sticks are {2, 3, 4, 5}) or *both flag numbers* (between). Values outside 1..range or equal to 0 are replaced by the nearest unused value inside the range (never the start number). E.g. round 6 (before 2 → 1): {1, 3, 4, 5}.

**Count-back, up to 10 (8 runs, rocket on square 1):** starts 10, 6, 9, 7, 10, 8, 6, 9 (hops 9, 5, 8, 6, 9, 7, 5, 8). Hoppers cycle rabbit, frog, squirrel, duck, kangaroo, rabbit, frog, squirrel. Squares above the start are dimmed (the court beyond is "out of the game").
**Count-back, up to 20 (8 runs, rocket square varies, never below 1):** 20→11, 15→8, 12→5, 18→10, 14→6, 17→9, 16→8, 13→5 (7–9 hops each; five runs cross the 11/10 link backwards).
**Count-back sticks per hop:** correct n−1 plus n+1 (the forward-counting habit), n−2 (skipping), and n (saying the same number again); n+1 beyond the range is replaced by n−3, and nothing below the rocket square's number−1 or below 1 appears.

**Answer position.** The target *square* is the number itself — its place on the court is the skill, not a tell. The chalk sticks are the tell risk: their order is reshuffled per round (and per hop in runs) with the right stick's slot balanced — over each 9-round pass, slots 1–4 hold the answer 3 / 2 / 2 / 2 times; over all count-back hops of a pass no slot holds the answer > 35 % and never in the same slot three hops running. The gate measures both.
**Order:** order-only reshuffle per pass (never the same order twice); runs keep their internal sequence.

## 7. Check, the misses, the success
- **Check with no hop** → hint "Tap the hopper to turn it, then tap a square to hop." (no miss). **Hopped but no chalk** → "Now pick the chalk number for this square." (no miss).
- **Kinds of wrong** (diagnosed by the core): `direction` (landed on the opposite side), `far` (right side, ≥ 2 squares), `chalk` (right square, wrong numeral), `end` (between: landed on a flag square or outside the gap, or chalked a flag number).
- **Miss 1 — what the apparatus shows:**
  - `direction`: the sign's arrow and the hopper's foot arrow light together (teal / coral) and a ghost arc (dotted, teal) springs out of the start square in the sign's direction. Hint: "The sign points the other way. Turn the hopper first."
  - `far`: the trail's arcs get small chalk numerals 1, 2 (…) above them, beside the sign's single arc, which pulses. Hint: "The sign shows one hop. Count your hops."
  - `chalk`: faint chalk numerals appear on every square from 1 up to the start square (the run the child can count along), the start numeral brightest. Hint: "Count from 1 up to {s}. Which number is next to it?"
  - `end`: both flags wave (rotate ±8°) and the empty space between them glows; if the hopper stands outside the gap, a teal ghost arc runs from it to the gap. Hint: "Land between the flags — one flag on each side of you." (chalked a flag number: "That number is on a flag. Which number sits between the flags?")
- **Miss 2 — stronger showing:** the faint chalk run continues through the target square for 1.5 s, then fades everywhere except the start; the right square pulses (two beats) and the hopper's ghost outline stands on it. Hint: "Look where the hopper should land, then pick its number."
- **Count-back bounces:** two wrong sticks on the same hop → the stamped run so far lights one numeral after another (250 ms each, spoken where TTS works) and the right stick wobbles once. Hint: "Say the numbers you chalked: {run} … what comes next?"
- **Any new move** (turn, hop, chalk) removes the showing until the next Check.
- **Success (mixed):** the numeral thickens to bold white, the pebble drops onto the square, the hopper double-bounces; bubble: before "Yes — {t} comes before {s}!" · after "Yes — {t} comes after {s}!" · between "Yes — {t} is between {a} and {b}!"
- **Success (count-back):** the rocket appears on the rocket square, the trail flows into it, it lifts off (translateY −120 %, 900 ms, a whoosh); bubble "{run} — blast off!" with the full run, e.g. "6, 5, 4, 3, 2, 1 — blast off!".

## 8. Settings (each visibly changes the board at rest)
1. **Numbers:** up to 10 / up to 20 — one court row (two rows on phones) vs two rows (four on phones).
2. **Task:** before, after, between / count back — count back shows the tray from the start, the hopper already facing back, the squares above the start dimmed and the count-back sign (left arrow, three arcs, the rocket square's numeral).

## 9. Words (EN source)
- title: "The Hopscotch Court"
- instruction (mixed): "Follow the sign: hop, then chalk the number." · (count back): "Count back! Tap the next number to hop."
- spoken prompts (TTS + aria): before "What number comes before {s}?" · after "What number comes after {s}?" · between "What number is between {a} and {b}?" · count back "Count back from {s}."
- hints: hintStart "Tap the hopper to turn it, then tap a square to hop." · hintChalkNow "Now pick the chalk number for this square." · hintDirection "The sign points the other way. Turn the hopper first." · hintFar "The sign shows one hop. Count your hops." · hintChalk "Count from 1 up to {s}. Which number is next to it?" · hintEnd "That number is on a flag. Which number sits between the flags?" · hintGap "Land between the flags — one flag on each side of you." · hintStrong "Look where the hopper should land, then pick its number." · hintRun "Say the numbers you chalked: {run} … what comes next?" · hintRunCheck "Keep hopping back to {r}."
- celebrations: as §7.
- settings: "Numbers" · "up to 10" · "up to 20" · "Task" · "before, after, between" · "count back"
- aria: hopper "{animal}, facing {forward|back}, on square {s}" (forward/back as words in the page locale); square "square {k}" / "square {k}, empty"; stick "chalk {n}".
- **Locale traps:**
  - Before/after/between are prepositions with case or word order: fi "Mikä luku tulee ennen lukua {s}?" / "…lukua {s} jälkeen?" / "Mikä luku on lukujen {a} ja {b} välissä?" (the noun *luku* carries the case so the numeral itself never inflects); de "Welche Zahl kommt vor der {s}?" (Zahl is feminine: *vor der 7* / *nach der 7*); fr "Quel nombre vient avant {s} ?" (U+202F before ?); sv "före/efter/mellan"; da/no "før/efter|etter/mellem|mellom"; nl "voor/na/tussen"; es "antes de / después de / entre"; pt "antes de / depois de / entre"; it "prima di / dopo / tra".
  - The game's name differs per country: en hopscotch · de Himmel und Hölle · fr marelle · es (MX) avioncito · pt amarelinha · it campana · nl hinkelbaan · sv hoppa hage · da hinkeleg/paradis · no paradis · fi ruutuhyppely — the title and prose use the native name; the court shape is a straight run of squares (no "heaven" arc), which every one of these accepts.
  - Countdown cultures: many say "…3, 2, 1, 0, start!" — the run stops at 1 and the rocket goes ("lift off": de "Start!", fr "Décollage !", es "¡Despegue!", fi "Lähtö!"); 0 never appears.
  - Facing words "forward/back" appear only in aria; numerals are Arabic in all 11 locales; reading order left→right everywhere, so the wrap 5→6 / 10→11 is right for all.
- **Sound off:** the sign is icons + numerals; the bump, the arcs, the dimmed squares and the rocket carry every message; TTS is a bonus.

## 10. Sound off, access, phones
- Legible with the sound off (§9). Keyboard path in §5. aria-live bubble.
- Taps: squares ≥ 48 px (320) / 52–58 px; sticks ≥ 50 px tall; hopper hit area = its square plus its picture box.
- Pictures: hopper 96 px at 704, 64 px at 360; rocket 110 / 72 px.
- Fold: at 360 × 740 the up-to-20 stack is task line 24 + sign 56 + court 238 + hopper headroom 40 + tray 52 + bubble/Check 56 ≈ 500 px — Check above the fold; at 320 × 640 ≈ 470 px.
- Phone changes: rows of 5; sign smaller; the hop apex shrinks so a hop never leaves the card.

## 11. Distinct from
- **Peek Path (#3)** and **Constellation Thread (#4)** only count forward and hide the run-up; **Number Elevator (#19)** is magnitude; **Creek Map (#21)** compares. Here DIRECTION is the content — the turn is the invention, and nothing built uses facing.
- Tools **number-line** / **open-number-line** draw jumps the teacher sets; **choral-counting** inks a chart. None makes the child turn a body to go back, nor makes the child produce the numeral on a blank square.
- Sibling **#207 Bus Queue** is ordinal places in a line; **#206 Tally Fence** is grouping by five — different hands entirely.

## 12. Build plan
- **Core state:** `{range:10|20, task:'mixed'|'back', round, facing:+1|-1, pos, start, target, flags:[a,b]|null, trail:[squares], chalk:null|n, choices:[4], run:[numbers], rocketAt, miss, help}`.
- **Core functions:** `turn()` · `hopTo(k)` → `{ok:false,reason:'behind'}` when `sign(k−pos) !== facing`, else sets `pos`, `trail`, clears `chalk` · `chalk(n)` (only after a landing) · `check()` → `{ok, kind:'empty'|'noChalk'|'direction'|'far'|'chalk'|'end'}` · `pickBack(n)` → `{ok}` and advances `run` · `choicesFor(round)` · `squareXY(k, width)` (row-wrap layout) · `helpLevel()` / `hintKey()`.
- **Gate ground truth (verify-hopscotch-back-core.js, own oracle):** targets = start−1 / start+1 / middle of flags; flags exactly two apart; every between round starts off both flags and outside the gap, one per level behind the higher flag (needs a turn);
 no 0 anywhere (targets, choices, runs, rocket square ≥ 1); before/after/between counts per table; end-square starts ≤ 2; choices contain the target exactly once plus the opposite neighbour or both flags; count-back choices contain n−1 and n+1 (or n−3 at the top); a hop behind the nose is refused; a new hop clears chalk; the wrap layout puts k and k+1 adjacent or on the link curve; slot balance per pass (3/2/2/2; ≤ 35 % over run hops; no slot three hops running); every round's success sentence names real numbers of that round.
- **Mutations (one per rule):** between round starts on the lower flag · landing on a flag square accepted · allow hop behind
 · target = start±2 · flags three apart · choices drop the opposite neighbour · count-back accepts n+1 · rocket square 0 · chalk survives a new hop · check ignores chalk value · help survives a new move · slot fixed at 1 · wrap layout skips the link (10 and 11 not linked) · facing not reset to forward at round start.
- **Pictures to confirm on a contact sheet at build:** the five hoppers mirrored both ways (nose direction), rocket on a 58 px square.
- **Risks:** the hop arc across the 10→11 link must read as ONE hop (draw it along the link curve, not a long diagonal). The kangaroo is tall — scale by short side so its feet stay on the square.
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — steering a hopping animal that spins, bonks and chalks its own numbers, ending a run with a rocket launch.
2. **Would a teacher put it on the board?** Yes — "before" is visibly a turn, "one before" is visibly one arc, and the class can chant the count-back as the chalk appears; the misconception the worksheets name (n+1 for before) is impossible to do silently.
3. **Would a parent trust it?** Yes — library animals, chalk-on-tarmac apparatus, no words on the court, no score, works on a phone.
4. **The invention, in one sentence:** the hopper only hops the way its nose points, so before means turning round, and the court only remembers the numbers the child chalks.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Between rounds no longer start the hopper on the lower flag (which made "between" the same act as "after the lower flag"): each level now has one between round below the flags and one beyond the higher flag that needs a turn, so the child has to find the gap; landing on a flag or outside the gap is a diagnosed `end` miss with its own showing (ghost arc to the gap) and hint `hintGap`; two mutations added.
- Contact sheet: `pets/frog` faces LEFT (three-quarter), not right — the native-facing table corrected; the other four hoppers (rabbit, squirrel, duck, kangaroo) confirmed facing left and side-on; `animals/cat` stays refused (faces the viewer).
- Up-to-20 end-square starts recorded (one, round 7).
