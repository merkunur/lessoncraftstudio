# 041 — Stepping Stones

## Identity
- Slug: `skip-trail-hundred`
- Subject / topic: Mathematics / skip counting in 2s, 3s, 5s and 10s on a hundred square, from any start (including off-multiple starts)
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (per-tap judgement variant: each tap either extends the trail or is refused with the jump enacted)
- Frame: THE CROSSING
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (hundred-square skip-count trail). Frame contract: `design/MISSIONS.md` FRAME 1, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the Displacement rule; the RATCHET RULE). The pattern says only how the finger reaches the world; the frame is the game. This game judges every tap at once instead of on a Check tile (P6 allows the spec to say which); a trail is a sequence, and a wrong cell must be caught before the next one is chosen, exactly as P4's per-tap default.

## Learning
- Objective: Continues a skip-count trail on a hundred square by tapping the next four cells in the sequence, when the trail starts on a multiple AND when it starts off a multiple (3, 5, 7 …).
- Prerequisites: Reads numerals to 100; knows the hundred square's reading order (left to right, then down a row); can count on in ones.
- Curriculum links: F-1 (skip counting in 5 of 15 sources; number sequences), F-21 ("skip counting / number sequences" in all twelve systems), F-31 row "Skip counting 2/5/10" — conservative 7-8, earliest 6 → 6-8 (US 2.NBT.A.2 "count within 1000; skip-count by 5s, 10s, and 100s"; England Y1 "count in multiples of twos, fives and tens" / Y2 "count in steps of 2, 3, and 5 from 0, and in tens from any number"; Germany Klasse 1-2 "Zahlenfolgen, Hundertertafel"; France CP-CE1 "suites de nombres"; Netherlands groep 3-4 "tellen met sprongen"; Spain 1º ciclo "series numéricas"; Brazil EF02MA09; Sweden åk 1-3 "talföljder"; Finland grade 1-2 "lukujonot").
- Common misconceptions (F-109, F-108), each with this game's response:
  1. **Rote chant not tied to position ("2, 4, 6, 8 …" recited but the child taps 7 or 9 after 6).** Response: the stone tips 6° under the goat's hoof and rights itself, and the hoof withdraws; then the stride is PACED OUT from the stone the goat is standing on — `ART.wadeMark` counters step across the intervening stones one by one in reading order (1, 2 for a +2 line; 1 … 5 for a +5 line) with a rising `tone("tap", k)`, the last mark lands on the correct stone and grows (`ANIM.lastMark`), then all marks fade. The child watches how far one stride actually goes, laid on the ford, rather than receiving a verdict. The chant did not fail — the FOOT did not reach.
  2. **Losing the sequence / mixing sequences (taps 10 after 3, 5, 7 — a 5s or 10s habit inside a 2s trail).** Response: the same paced stride; then on the second wrong stride against the same target `ART.strideBar` — a physical measure laid along the reading-order run between every consecutive pair of the line's already-set stones, each bar carrying its own "+2" — is laid one bar at a time (`ANIM.appear`, 200 ms apart) and STAYS for the rest of the span, so the rule is measured off the causeway itself. (The escalation had to change shape: the "+n" labels now ride on the causeway from the first frame, because they replaced the deleted jump chip, so the second-miss step is a measured bar rather than a name for one — the same diagnosis at the same rung of the ladder, with more information.)
  3. **Cannot start from a non-multiple (3, 5, 7 → taps 8 or 10, "the next number in the 2s").** Response: L2 and L3 lines are laid off a multiple, out in the middle of the water where somebody else set them, so "a line does not have to begin at the bank" is a physical fact about the causeway the goat is standing on. The paced +2 from 7 lands on 9 with the wade marks, and the stride bars measure "+2, +2" along 3-5-7. The chant is never the route; the position on the square is.
  4. **"Counting in 10s stays in the same column" not seen — taps 34 or 44 after 4, 14, 24 (the place-value structure of the square, F-108).** Response: on +10 lines the enacted stride is `ART.currentBand` — the water's own current, a translucent band running straight downstream from the stone the goat stands on to the stone directly beneath it, with `ART.downArrow` on the target: one row down is +10, and the ones digit is the column the current runs in, so it cannot change. The current is the hint; no words. The whole game repeats it without any correction at all, because a +10 span walks the goat six rows down the ford while a +2 span barely leaves its row.
  5. **Over-generalising "5s end in 0 or 5" to an off-multiple 5s trail (13, 18, 23 → taps 25).** Response: the paced +5 wade marks from 23 land on 28; the second wrong stride lays the "+5" stride bars along 13-18-23, whose ones digits alternate 3 and 8 — and the geometry says it a second time for free, because a five-stride off a multiple visibly ZIGZAGS between two columns where a five-stride from a multiple is a straight two-column ladder.

## Mission
**Mission, as the child would say it.** *Bring them home.*

**The hero.** A goat, in side profile, facing the direction the line runs, 36 px, standing on a stone out in the water. It is the roster's sure-footed animal (ART-BIBLE §3), chosen for three reasons and not for flavour: it is the animal every culture recognises as *the one that does not fall*, so a refusal can be "the stone did not take my weight" instead of anything happening to the creature; it strides deliberately, one hoof at a time, which is exactly a constant jump; and its young is the same animal at 60% with a shorter beard, so one family of drawings serves both the hero and the destination.

**The want (the visible lack), readable from one still frame with no motion and no words.** A wide shallow ford of a hundred flat numbered stones. A big goat standing on one of them out in the middle. A small kid alone on a stone four strides on, looking back at it. On the bank at the bottom of the screen an EMPTY pen, with a mother goat standing at its gate facing the water. A six-year-old reads *"he has to go and get her, and bring her down there"* from the photograph. Nothing is drowning, nothing is rising, nothing is running out: the water is ankle-deep and the whole picture is a lack, not a threat. At item 7 the same still frame reads harder still — six kids already standing in the pen, seven lines of set stones laced across the ford behind the hero, one kid left out on the water.

**The goal.** The pen on the bank, `ART.pen` at a constant (360, 690) for the entire session, with the mother at its gate from tap one (Device 1, THE WAITING PARTY). Ten kids in the pen and the water empty.

**S — the single state variable: THE STONE THE GOAT IS STANDING ON.**

- **Mathematical reading:** the last term of the skip-count sequence so far — the number the child has counted to.
- **Physical reading:** the hero's position on the ford — where its feet are.

The transition function is the stride J (2, 3, 5 or 10, set by the causeway the child is continuing). `S → S + J` is the only legal transition of S, and it is legal for a physical reason: a stone bears the goat's weight exactly when it is one stride on from where the goat stands. The child's tap selects a transition of S; it never reports an answer about S.

**There is no `answer` field anywhere in the game.** The four target stones are not stored — they are DERIVED, live, from `hero.stone + stride`, one at a time. The commit handler is `hero.stepTo(stone)` and its test is `stone.n === hero.stone.n + stride`, a predicate on the hero's POSITION. That is the Displacement rule literally (`answer = f(character.position)`, GAME-DESIGN-LAW 2.3). There is no Check tile, no answer tile, no keypad and no numeral to choose between anywhere on the stage.

**The isomorphism — moving IS solving.** *The stone you stand on IS the number you have counted to; continuing the count and continuing the walk are one act.* Skip counting is a constant stride repeated, and a goat crossing a ford has a constant stride, so the hundred square is not a panel the hero stands beside — it IS the ford, and the trail IS the number line, walked (GAME-DESIGN-LAW 2.4a). To count 6, 8, 10 the child does not say it and does not pick it off a tile: it puts the goat's foot on 8, then on 10.

Three consequences fall out for free, and each is a piece of the objective:

- **The four strides of a span are four genuine choices**, each computed from where the feet currently are, so an error at stride 2 does not hand the child stride 3.
- **The stride's SHAPE is the geometry of the walk.** A ten-stride goes straight downstream, one row down, same column, so the ones digit does not change because the goat did not change column. A five-stride off a multiple zigzags between two columns with the ones digits alternating 3, 8, 3, 8. A two-stride is every other stone along a row. By the finish the ford carries ten lines in four different figures, and that picture is the learning summary.
- **The destination sits at (line start + 7J)** — one stride beyond the four the child taps. The kid is standing ON the pattern, further along it than the child will get by tapping. That is what "continue the sequence" means, drawn: the pattern is already true past where you have got to.

**The mark that stays.** Every stone the goat has stood on is SET, and never un-sets, for the whole session (Device 2, and the RATCHET RULE). By item ten the ford carries about seventy set stones in ten lines, and the child can see where the lines cross — that 20 is on the twos line and the fives line and the tens line at once.

**Diegetic progress (there is no progress furniture of any kind on the play surface).** Three displays, no glyphs, no counter: (1) *within a span*, the shrinking gap — the kid is on screen from the first frame of the item and every correct stride closes the distance by exactly one stone, so four strides in the goat is one stone from it (L3, VISIBLE DESTINATION); (2) *across the session*, the pen filling left to right, 28 px at a time, with the empty part of the pen showing what remains (F-44's *tower built*); (3) *the causeway itself*, accumulating. `mission.progress` for the M4 gate = (kids in the pen) + (set stones); monotone by construction, and driving the session with a wrong answer on every item never decreases it.

## World
Stage **720 × 720** — this spec declares the taller stage, which BUILD-CONVENTIONS §2 permits (max 720 × 720); the Phaser config `height` is 720 and nothing else changes. Zones follow MISSIONS.md 1.4, not BUILD-CONVENTIONS §7.

**Zone T, y 0-56 — chrome only.** `makeLanguagePicker` at (16, 16), depth 1500 (§3.2). **Nothing else.** Three things that stood here in the pre-pivot spec are deleted: the progress circles at y = 28, `t("question_x_of_y")` at (360, 48), and the jump chip at (612, 28). The first two are banned on the play surface by MISSIONS.md 1.4; the third is not deleted so much as re-sited — its information now rides on the causeway as `ART.strideTag` between the stones that are already set, so the abstract notation ("+2") is visible in the same frame as the fiction at the moment of the answer, ON the object rather than on a chrome card (GAME-DESIGN-LAW 2.5, INTEGRATED NEVER CONCEALED).

**Zone W, y 56-720 — THE WORLD.** The canonical zone W is 56-420 on the 720 × 560 stage; on this taller stage it takes the whole remaining height, because the ford and the bank must be in one frame, one saccade apart (F3 co-location). The hero and the goal are both inside it at every moment of the session, and the goal's (x, y) never changes.

- *Water:* `ART.water`, roundRect 616 × 616 centred (360, 362), radius 16. A low-contrast wash, never animated (ART-BIBLE §4).
- *The hundred stones:* 100 × `GameCore.makeTile`, 56 × 56, pitch 60. Column centres **x = 90 + c × 60** → 90, 150, 210, 270, 330, 390, 450, 510, 570, 630. Row centres **y = 92 + r × 60** → 92, 152, 212, 272, 332, 392, 452, 512, 572, 632. Stone *n* is at c = (n − 1) mod 10, r = floor((n − 1) / 10). Grid bounding box x 62-658, y 64-660.
- *The hero:* 36 px at its stone's **top-right corner (cx + 18, cy − 18)**, so the numeral under it stays readable.
- *The current kid:* 30 px at the destination stone's **top-left corner (cx − 18, cy − 18)** — mirrored, so hero and kid never occlude a numeral and read as facing each other across the gap.
- *The bank:* `ART.bank`, a full-width band **y 664-716**.
- *The pen (the goal):* `ART.pen`, roundRect 300 × 44 at **(360, 690)**, with `ART.penGate` — two posts leaving a gap in its right wall at (510, 690). **Its (x, y) never changes for the whole session.**
- *The mother goat:* `ART.motherGoat` 44 px at **(546, 686)**, at the gate, in profile facing LEFT toward the water. Drawn from tap one, never animated during play, changes state ONLY at the finish (Device 1's design rule — a waiting party that reacts to each correct answer is an approval meter, which F-44 bans).
- *Rescued kids:* `ART.kidHappy` standing inside the pen at **x = 224 + i × 30, y = 690**, 28 px, i = 0 … 9 → 224 … 494.

**Zone H, y 420-560 on the canonical stage — EMPTY. Zero controls, zero pixels.** THE CROSSING's canonical property: the world is the hand. The five-control ceiling is spent as zero. Two organs of the pre-pivot spec died here as well as the chip: the four-circle step strip at (560-626, 692), because "how many more to tap" is now the shrinking gap between the goat and the kid, which is the same count made physical; and the caption "Tap the next 4", replaced by the R4 concession — **on the first item of a session the goat takes its first stride unbidden, once, and then holds** (F-42 permits this verbatim: *"the first item of a new mechanic can demonstrate itself once, then fade"*), which teaches "step to the next stone" with no words at all.

**Text budget: 5 English words for the whole game**, against the band's 8. Play screen: **zero**. Start screen: the title (2 words) and the premise (3 words). Finish: `t("all_done")` and the two chrome buttons. The only glyphs on the play surface are numerals and a plus sign.

**F-69 element count (§5.1 reading: an instrument counts as ONE, candidates count individually).** The hundred square is **1 instrument** — the child does not evaluate a hundred alternatives, they compute one number and go to it, which is a keypad's cognitive shape, and this apparatus is the named instrument of the curriculum in five of the twelve systems this spec cites (Hundertertafel, honderdveld, tableau des nombres, hundrafältet, hundralapp). Plus hero (1), current kid (1), pen (1) = **4 elements**. This game depends on that reading, and the dependency is total: if the operator overrules MISSIONS.md 9.4, a hundred square is a hundred targets and 041 cannot exist in any framing. 041 should be named in that ruling.

**Declared risks, and one gate conflict — stated rather than designed around.**

1. **The M3 gate as written will fail this game, and the gate is wrong, not the game.** M3 asserts that the hero's position at the start of item *k+1* equals its position at the end of item *k*. Here the goat WADES from its finishing stone to the head of the next span, in view, as part of the transition — it never teleports, but the two positions are not equal. The correct assertion is *no position discontinuity without a tween the child caused*, not positional equality.
2. **A ten-item continuous route across a hundred square is arithmetically impossible, and any design claiming one is lying.** Each span covers 6J numbers; ten spans at the smallest stride need 120 numbers and the board has 100. This was checked rather than assumed. So the session is not one journey down the ford — it is **ten crossings of one ford**, and persistence is carried by the accumulating set stones and the filling pen rather than by a monotone descent. This is the single structural concession in the design and it is stated instead of hidden. The compensation is real: ten overlapping lines make a better finish picture than one route, because the crossings show the child that 20 lies on the twos, the fives and the tens lines at once.
3. **Board crowding at item 10.** About seventy stones will be set, in two visual states, at a 400 px iframe where a 56 px stone is 31 px real and a 22 px numeral is 12 px real. Mitigated by `ART.stoneLip` (the two states differ in shape, not only tint) and by finished lines dropping to `ART.strideTagPast` at 11 px. This needs measuring on the actual 400 px sweep, not asserting; it is the risk most likely to be found by the operator's eye rather than by a gate.
4. **The mother goat is deliberately inert.** She is drawn from tap one and changes only at the finish. A reviewer will read her as a dead element; she is Device 1 working correctly, and making her react to correct answers would turn her into an approval meter, which F-44 bans.
5. **The ACT budget is comfortable but a builder can blow it.** About 43 s against the 60 s ceiling, on the assumption that a stride is one stone. A goat that crosses the stage instead will exceed it, and `qa-game` must measure rather than trust the estimate (R1).
6. **Redundancy against 020 `hundred-square-trail`.** Same apparatus, adjacent objective, and this is the first fence the design had to clear. It is four-fold: different mathematics (a constant stride repeated four times against a single plus-or-minus 1 / 10 neighbour move), different hero (goat against snail, and 020 keeps the snail), different mission (get the kids into the pen against get the snail home to a named cell), different progress (the pen filling against the trail drawn). `check-redundancy.js` must be re-run against the transformed pair, not the originals.
7. **The motivation claim is unmeasured**, here as everywhere in this programme (Wouters 2013: learning d = 0.29, motivation d = 0.26, not significant). Everything above about how a six-year-old reads a tipping stone or a filling pen is a design judgement. It ships to a local link so a child can settle it.

## How it plays
1. **Start screen.** Title `S("title")` at (360, 200), 52 px `THEME.font.display` `THEME.colour.structure`; premise `S("premise")` at (360, 258), 24 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.goatIdle` 96 px at (360, 360) with a 2% `ANIM.breathe` (permitted on Boot and Finish only, ART-BIBLE §6); `makeButton` `t("start")` at (360, 480); the picker at (16, 16). Never auto-starts.

2. **The ford is built once, and it is a place.** On entering Play the hundred stones are drawn as `ART.stoneWet` with their numerals, the water wash behind them, the bank, the pen, `ART.penGate` and the mother at the gate. Nothing here is rebuilt between items. The stones never move for the whole session — that is what makes the ford a location rather than a board, and it is why the P1 tile re-shuffle is unavailable and a different guard is declared (Rules, THE OPEN WATER).

3. **Item 1 (L1: +2; laid 2, 4, 6; targets 8, 10, 12, 14; the kid on 16).** Stones 2 (150, 92), 4 (270, 92) and 6 (390, 92) switch to `ART.stoneSet` with `ANIM.appear` — somebody else laid them. `ART.strideTag` "+2" appears at the midpoint of each consecutive pair, (210, 92) and (330, 92). The goat is drawn at (408, 74), `ART.goatIdle`. The kid, `ART.kidWait` 30 px, is drawn at (372, 134) on stone 16 (390, 152), looking back along the line. Because this is the first item of the session, the goat now takes its stride to stone 8 (510, 92) **unbidden** — `ANIM.stride`, the stone sets, a "+2" tag appears at (450, 92) — and then holds in `ART.goatThink`. Item 1 therefore takes three child strides; every later item takes four. The demonstration stride is not counted against the first-try record.

4. **The DECIDE state.** Every stone is enabled; the goat holds `ART.goatThink` at one coordinate; zero tweens are running (F1 freeze, the M2 assertion). The whole square is live — all 100 stones, not a fenced set of candidates. This is deliberate and it is a pedagogical requirement, not a convenience: four of the five misconception corrections need their wrong stone to be REACHABLE (7 after 6; 10 inside a 2s line; 34 or 44 on a 10s line; 25 on an off-multiple 5s line), and fencing the field to four candidates leaves those corrections nothing to correct and turns the game into multiple choice.

5. **A stride the world accepts (the child taps 10 at (630, 92)).** `stone.n === hero.stone.n + stride` holds, so the world takes the move. `ART.goatStep` swaps in; `ANIM.stride` carries the goat container to (648, 74); the stone switches to `ART.stoneSet` with `ANIM.settleStone` and gains `ART.stoneLip`; `tone("tap", k)` with k = 1 … 4 along the span so the pitch climbs; a new `ART.strideTag` "+2" appears — and because this pair wraps the row, it is placed in the right margin at (662, 92) rather than at a midpoint off the grid. The goat returns to `ART.goatThink`. The gap to the kid is now three stones. Feedback lands within 300 ms of the commit (F-40); the stride is the feedback.

6. **A stride onto ground already laid.** Lines cross. When the target stone is one stride on AND is already set from an earlier line — 20 is on the twos line, the fives line and the tens line — the move is accepted normally: the goat steps onto firm ground, the stone stays set, and the new line's `ART.strideTag` is added over the pair. Nothing un-sets, ever (RATCHET RULE). This is a correction to an earlier draft of the design, and it is worth stating: that draft refused an already-set target on ratchet grounds, which would have made roughly a third of the authored spans unwalkable (item 2 sets 20 on the tens line; item 3 then needs to stride onto 20 on the fives line). The refusal is chosen by whether the stone is one stride on, never by whether it is set — a bedded stone is MORE walkable, not less, and the two refusal choreographies below are still selected by set-state.

7. **A stride the world refuses.** Two refusals, chosen by the state of the stone, and neither touches the goat's face or body.
   - **An UNSET stone that is not one stride on** (the child taps 7 at (450, 92) after 2, 4, 6): the hoof comes down, the stone **tips 6° and rights itself** (`ANIM.tip`, 80 ms out, 80 ms back) and the hoof withdraws. `tone("nudge")`. The stone does not sink, splash, crack or vanish; it stays a stone and stays tappable.
   - **A stone that is already SET** and is not one stride on: it does **not** tip, because a bedded stone collapsing would be a built thing collapsing, which is a losing state in costume (GAME-DESIGN-LAW 3.1). Instead the goat's **leg extends toward it and comes back** (`ANIM.reachBack`) — the stride does not reach. The stone is untouched. Same `tone("nudge")`, same information.
   Then, always, the enacted correction of Rules, with the whole ford `setEnabled(false)` for the duration so nothing can be tapped mid-teaching, then re-enabled. The span is now "retried" and can never be first-try; that is the entire cost. The goat's pose does not change during any refusal: it holds `ART.goatThink` throughout.

8. **Tapping the kid's own stone.** Refused by the same physics — the goat's stride reaches exactly one gap, never seven. It tips like any other unset stone. This is a refusal and not a scolding, and it teaches the thing the child got wrong: you cannot skip to the end of a count, you land on every term. It is also why the visible destination gives nothing away.

9. **The support ladder, which always ends in success.** Attempt 1 unaided → attempt 2 after the paced stride → attempt 3 after the stride bars → **show-me**: `ART.footRing`, 68 × 68, pulses on the correct stone (`ANIM.showMe`); stepping on it sets it and the walk continues. No attempt 4. No stone is ever locked, there is no dead end, and there is no way for a session to end other than by finishing.

10. **Arrival, and the transition to the next span.** The fourth correct stride leaves the goat one stone from the kid, so there is nothing left to compute; the goat makes the final stride itself (`ANIM.stride`), the kid's stone sets, and the line stands complete at eight stones. `tone("correct")`; `GameCore.showPraise` with the rotation, first-try spans only; `ART.goatHappy` for 400 ms. The kid swaps to `ART.kidHappy` and falls in (`ANIM.kidJoin`). Then one continuous walked chain (`ANIM.wade`): the pair wades off the ford to the bank, the kid steps through `ART.penGate` and takes its place in the pen at x = 224 + i × 30, and the goat wades back out onto the ford to the head of the next span — the next item's last laid stone. The goat never teleports; every position change is a tween the child caused. The moment the span completes, its `ART.strideTag`s step down to `ART.strideTagPast` so exactly one coral region exists on any screen (ART-BIBLE §2), while the finished lines keep their labels for the finish picture.

11. **Items 2-10.** Per Content and Rules. Each begins with its three laid stones appearing (any already set from an earlier line simply stay as they are), its `ART.strideTag`s, and its kid on the destination stone. The stride size changes; the ford does not.

12. **Finish.** The tenth kid walks into the pen and the mother turns from the water to the pen — **her only state change of the session, and it is the arrival**. The goat steps up onto the bank beside her, plays `ANIM.celebrate` once and then holds a 2% `ANIM.breathe`. Ten kids in the pen; the water empty. The ford stays on screen behind them at its play coordinates, laced with the ten lines the child walked, the finished lines keeping their `ART.strideTagPast` labels — so the picture reads *this is what counting in tens looks like, and this is what counting in fives looks like*. That is the session's arithmetic, drawn, not a summary panel (MISSIONS.md 9.1 item 6). The bank furniture (pen, gate, mother, the ten kids) lifts as one group by 50 px to y = 640 so the chrome buttons can take the bank strip. `ART.finishPlaque` at (360, 36) carries `t("all_done")` at 40 px `THEME.colour.structure`. The first-try record sits **on the causeway**: the first stone of each of the ten lines carries a small `ART.dotFull` at its bottom-left corner (cx − 18, cy + 18) if that span was walked unaided, and a hollow `ART.dotEmpty` if it needed the show-me — MISSIONS.md 1.4 permits those two tokens on the Finish screen only. It is a record of what was continued unaided; never a score, never a time, never a star. `makeButton` `t("play_again")` at (200, 690) and `t("menu")` at (520, 690); `tone("finish")` once; `GameCore.reportHeight()`.

Session about 6 minutes. Total ACT time about 43 s against the 60 s ceiling (R1) — 10 spans × (4 strides × 440 ms + a transition chain capped at 1400 ms) plus roughly seven enacted corrections; `qa-game` must measure it rather than trust this estimate, because a builder who makes the goat cross the stage rather than step one stone will blow the budget without any other gate noticing.

## Art registry
```js
const ART = {
  /* the hero and his family — one drawing family, the kid is the same animal at 60% */
  goatIdle:      { kind: "svg", value: LCSArt.get("goat.idle"),   size: 96, fallback: "🐐" },
  goatThink:     { kind: "svg", value: LCSArt.get("goat.think"),  size: 96, fallback: "🐐" },
  goatHappy:     { kind: "svg", value: LCSArt.get("goat.happy"),  size: 96, fallback: "🐐" },
  goatStep:      { kind: "svg", value: LCSArt.get("goat.step"),   size: 96, fallback: "🐐" },
  kidWait:       { kind: "svg", value: LCSArt.get("goat.kid.wait"),  size: 96, fallback: "🐐" },
  kidHappy:      { kind: "svg", value: LCSArt.get("goat.kid.happy"), size: 96, fallback: "🐐" },
  motherGoat:    { kind: "svg", value: LCSArt.get("goat.idle"),   size: 96, fallback: "🐐" },   // drawn flipped, at the gate

  /* the ford */
  water:         { kind: "shape", shape: "roundRect", w: 616, h: 616, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 16 },
  stoneWet:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },        // numeral 22 px display ink
  stoneSet:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  stoneLip:      { kind: "shape", shape: "rect", w: 52, h: 3, fill: "structure" },              // the raised bottom edge of a set stone: state by shape, not only by fill

  /* the notation, on the object */
  strideTag:     { kind: "text", value: "", size: 14, font: "display", color: "accent" },       // "+2" / "+3" / "+5" / "+10" on the LIVE line
  strideTagPast: { kind: "text", value: "", size: 11, font: "display", color: "inkSoft" },      // the same tag once its span is complete

  /* the enacted corrections */
  wadeMark:      { kind: "shape", shape: "circle", r: 9, fill: "accent" },                      // numeral k 12 px display inkOnAccent on it
  strideBar:     { kind: "shape", shape: "rect", w: 6, h: 6, fill: "structure" },               // stretched along the run between two set stones; carries its "+J"
  currentBand:   { kind: "shape", shape: "roundRect", w: 56, h: 116, fill: "accent", radius: 8 },  // drawn at 25% alpha down one column
  downArrow:     { kind: "text", value: "↓", size: 28, font: "display", color: "inkOnAccent" },
  footRing:      { kind: "shape", shape: "roundRect", w: 68, h: 68, stroke: "structure", strokeWidth: 4, radius: 12 },

  /* the bank and the goal */
  bank:          { kind: "shape", shape: "rect", w: 720, h: 52, fill: "structureSoft", stroke: "line", strokeWidth: 2 },
  pen:           { kind: "shape", shape: "roundRect", w: 300, h: 44, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  penGate:       { kind: "shape", shape: "line", points: [0, -22, 0, 22], stroke: "structure", strokeWidth: 3 },  // two posts, a gap between them

  /* Finish screen only */
  finishPlaque:  { kind: "shape", shape: "roundRect", w: 380, h: 56, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 18 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The pose set deliberately omits `oops`. The approved design named one; it is not drawn, because GAME-DESIGN-LAW 3.0 is stricter than the ART-BIBLE pose vocabulary — *the character is never the consequence*, and the reviewer check is literally *look at the wrong-answer screenshot; if the character's state changed, reject*. On every refusal the goat holds `ART.goatThink` and the apparatus does the reacting.

Exactly three `accent` entries exist (`strideTag`, `wadeMark`, `currentBand`) and they are never on screen together: see the coral rule in Visual specification.

## Animation registry
```js
const ANIM = {
  /* TRAVERSAL — the three tweens Test C (instant-cut) patches to duration 0, and no others */
  stride:      { duration: 320, ease: "Sine.InOut", trigger: "the goat container to the chosen stone's top-right corner (x,y set at call)" },
  kidJoin:     { duration: 300, ease: "Sine.InOut", trigger: "the kid falls in behind the goat once the line is complete (x,y set at call)" },
  wade:        { duration: 600, ease: "Sine.InOut", trigger: "the pair off the ford to the bank, the kid into the pen, the goat back out to the head of the next span (x,y set at call)" },

  /* the world's answer to a move */
  settleStone: { scale: 1.1, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a stone switching to stoneSet under the goat's hoof" },
  tip:         { angle: 6, duration: 80, ease: "Sine.InOut", yoyo: true, trigger: "an UNSET stone that is not one stride on" },
  reachBack:   { x: "+=10", duration: 90, ease: "Sine.InOut", yoyo: true, trigger: "the goat's leg toward an already-SET stone that is not one stride on: the stride does not reach" },

  /* the enacted corrections — NOT traversal; never patched by the instant-cut harness */
  pace:        { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "each wadeMark in turn, 220 ms apart (from alpha 0, scale 0.5)" },
  lastMark:    { scale: 1.5, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the wadeMark that lands on the correct stone" },
  glowIn:      { alpha: 0.25, duration: 200, ease: "Sine.Out", trigger: "currentBand (from alpha 0); downArrow arrives with it via appear" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "strideBars 200 ms apart; a span's laid stones; strideTags; downArrow (from alpha 0, scale 0.6)" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "wadeMarks / currentBand / downArrow, 900 ms after the enactment" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "footRing on the correct stone (from alpha 0.2)" },

  /* Boot and Finish only */
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the goat stepping onto the bank at the finish" },
  breathe:     { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the goat on the Boot and Finish screens only (ART-BIBLE §6)" }
};
```

## Screen layout
This game declares the taller stage **720 × 720** (BUILD-CONVENTIONS §2); the Phaser config `height` is 720 and nothing else changes. Zones are MISSIONS.md 1.4 (zone T chrome, zone W the world, zone H the hand), not BUILD-CONVENTIONS §7.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                  │  zone T  0-56
      │                       chrome only, nothing else               │  no progress furniture
 56   ├──────────────────────────────────────────────────────────────┤
      │   1   2   3   4   5   6   7   8   9  10      row y= 92        │
      │  11  12  13  14  15  16  17  18  19  20      row y=152        │  zone W
      │  21  22  …                                   …                │  THE WORLD
      │  …                                           row y=632        │  the ford, 100 stones
      │  x = 90 150 210 270 330 390 450 510 570 630   (stones 56×56)  │  56-720
664   ├──────────────────────────────────────────────────────────────┤
      │  bank ▸  [ pen 300×44 @ (360,690) ][gate 510] mother @ (546)  │  the goal, fixed all session
720   └──────────────────────────────────────────────────────────────┘
```

Fixed layout, FIT scaling. `ART.stoneSet` is an overlay drawn on the same stone position as `ART.stoneWet`, with `ART.stoneLip` along its lower edge. `ART.strideTag` sits at the midpoint of two consecutive stones of a line; for a +10 pair it sits between the two rows in the same column at (cx, cy + 30); for a pair that wraps a row it sits in the right margin at (662, cy) of the upper row. The hero is at its stone's (cx + 18, cy − 18); the current kid at its stone's (cx − 18, cy − 18). Zone H is empty: the world is the hand.

## Visual specification
- Background `THEME.colour.bg`. Zone T carries the language picker and nothing else; there is no chip, no caption, no counter and no progress furniture anywhere on the play surface — progress is the shrinking gap, the filling pen and the accumulating causeway (MISSIONS.md 1.4).
- `ART.water` centred (360, 362), a low-contrast wash, never animated, drawn behind every stone.
- The hundred stones: `GameCore.makeTile` 56 × 56 with `ART.stoneWet` tokens (`fill: THEME.colour.surface`, `stroke: THEME.colour.line`), numeral 22 px `THEME.font.display` `THEME.colour.ink`, 1 at top-left and 100 at bottom-right. A set stone swaps to `ART.stoneSet` and gains `ART.stoneLip` at (cx, cy + 26) — **the two states differ in shape as well as fill**, so meaning is never carried by colour alone (§12); the numeral stays `THEME.colour.ink` on both, because it is the thing being read.
- `ART.goatIdle` / `ART.goatThink` / `ART.goatStep` / `ART.goatHappy` at 36 px, drawn in side profile facing the direction the line runs, at the hero stone's (cx + 18, cy − 18). `ART.kidWait` / `ART.kidHappy` at 30 px, mirrored, at (cx − 18, cy − 18) of its stone. `ART.motherGoat` at 44 px at (546, 686), flipped to face left. `ART.kidHappy` at 28 px for each rescued kid inside the pen.
- **The coral rule (ART-BIBLE §2, one warm region per screen).** In the DECIDE state the only coral on the stage is the live line's `ART.strideTag`s. The instant a span completes they drop to `ART.strideTagPast` at 11 px `THEME.colour.inkSoft`. During an enacted correction the live tags also step to `ART.strideTagPast` for the duration, so the single coral region is the correction itself — `ART.wadeMark` (with its numeral k at 12 px `THEME.font.display` `THEME.colour.inkOnAccent`) or `ART.currentBand` at 25% alpha centred at (cx, cy + 30) with `ART.downArrow` on the target stone. The goat is drawn from the `structure` and `surface2` tint pairs and carries no coral at all, so the ART-BIBLE §10.1 warm-body clause does not apply.
- `ART.strideBar` is stretched 6 px thick along the reading-order run between two consecutive set stones of the line, in `THEME.colour.structure`, each carrying its "+J" at 14 px; laid on the second miss and left in place for the rest of the span.
- `ART.footRing` behind the correct stone for the show-me. `ART.bank` full width at y 664-716 with a `THEME.colour.line` top edge at y = 664. `ART.pen` at (360, 690), `ART.penGate` posts at (510, 668) and (510, 712).
- Tap floors: stones 56 ≥ 56 for the 6-8 band. The 4 px gutter between stones is below §3's ≥ 12 recommendation and is re-declared deliberately, exactly as the pre-pivot spec did — it is the hundred square's own geometry, and a mis-tap here does not lose a mark, it buys a full enacted correction. Keyboard: Tab enters the grid at the hero's stone; arrow keys move the focus ring row-major; Enter strides.
- Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral (numerals and a plus sign only; two Start-screen strings).

Each item = (stride J; the three laid stones; the four target stones in order; the kid's stone). The kid's stone is always the line's first stone + 7J, one stride beyond the last target. All values ≤ 100.

- **L1** (a line laid from a multiple; +2, +5, +10): (+2; 2, 4, 6; 8, 10, 12, 14; kid 16) · (+10; 10, 20, 30; 40, 50, 60, 70; kid 80) · (+5; 5, 10, 15; 20, 25, 30, 35; kid 40) · (+2; 12, 14, 16; 18, 20, 22, 24; kid 26) · (+10; 20, 30, 40; 50, 60, 70, 80; kid 90) · (+5; 25, 30, 35; 40, 45, 50, 55; kid 60)
- **L2** (off-multiple starts): (+2; 3, 5, 7; 9, 11, 13, 15; kid 17) · (+5; 2, 7, 12; 17, 22, 27, 32; kid 37) · (+10; 4, 14, 24; 34, 44, 54, 64; kid 74) · (+2; 15, 17, 19; 21, 23, 25, 27; kid 29) · (+5; 13, 18, 23; 28, 33, 38, 43; kid 48) · (+10; 8, 18, 28; 38, 48, 58, 68; kid 78)
- **L3** (+3 lines; decade crossings mid-line; high +10 lines): (+3; 3, 6, 9; 12, 15, 18, 21; kid 24) · (+3; 4, 7, 10; 13, 16, 19, 22; kid 25) · (+10; 7, 17, 27; 37, 47, 57, 67; kid 77) · (+5; 31, 36, 41; 46, 51, 56, 61; kid 66) · (+2; 37, 39, 41; 43, 45, 47, 49; kid 51) · (+3; 22, 25, 28; 31, 34, 37, 40; kid 43) · (+10; 23, 33, 43; 53, 63, 73, 83; kid 93)

**One authored value moved, and it moved because of the destination geometry.** Every span now needs (first stone + 7J) ≤ 100. Eighteen of the nineteen pre-pivot trails pass unchanged; the L3 trail (+10; 33, 43, 53) would put the kid on 103, so it starts at 23 instead. It is still a high off-multiple ten-line crossing seven rows of the ford, so the misconception coverage is identical.

Play list of 10 per Rules; shuffle within level, levels in order; no span repeats within a session; two consecutive spans never share the same stride size when the level pool allows it.

The enacted correction depends only on the line's stride, never on which stone was tapped: +2 → 2 wade marks; +3 → 3; +5 → 5; +10 → the current band and the arrow (no wade marks). Wade marks walk the square's reading order, so a +5 from 17 marks 18, 19, 20, 21, 22 across the row break.

## Rules
- **Item count**: 10 (one item = one span of four child strides; item 1 has three, because the goat demonstrates the first stride unbidden per the R4 concession).
- **Difficulty progression**: 2 consecutive first-try spans (every stride correct, no refusal) → the next span comes from the next level up (cap L3).
- **Adaptation**: a span with 2 or more refused strides, or a non-first-try span on 2 consecutive items → the next span comes from one level down (floor L1).
- **What happens on a correct answer** (the world accepts the move — `stone.n === hero.stone.n + stride`): `ART.goatStep`, `ANIM.stride` to the stone's top-right corner, the stone switches to `ART.stoneSet` with `ANIM.settleStone` and gains `ART.stoneLip`, `tone("tap", k)` with k = 1 … 4 so the pitch climbs along the span, a new `ART.strideTag` appears on the pair, the goat returns to `ART.goatThink`. An already-set target (two lines crossing) is accepted identically; nothing un-sets. On the last stride: the goat makes the final stride to the kid's stone itself, `tone("correct")`, `GameCore.showPraise` rotating ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] for first-try spans only (helped spans get `tone("correct")` and no praise pop), `ART.goatHappy` 400 ms, `ANIM.kidJoin`, then the `ANIM.wade` chain to the pen and out to the head of the next span, capped at 1400 ms.
- **What happens on a wrong answer** (the world refuses the move). Every refusal begins with `tone("nudge")` and the stone's own reaction — `ANIM.tip` if it is unset, `ANIM.reachBack` if it is already set — and the goat's pose does not change. Then, by anticipated mistake:
  - Next counting number (7 after 2, 4, 6), or any refused stride on a +2 / +3 / +5 line: the `ART.wadeMark`s pace out from the goat's stone to the correct one, `tone("tap", k)` per mark, the last grows (`ANIM.lastMark`), all fade after 900 ms.
  - Mixed sequence (10 after 3, 5, 7): the same paced stride; on the 2nd refusal against this target the `ART.strideBar`s are laid between every consecutive pair of the line's set stones and stay.
  - Off-multiple start error (8 or 10 after 3, 5, 7): the same — the paced stride from 7 lands on 9.
  - +10 line, wrong column or wrong row (34 or 44 after 4, 14, 24): `ART.currentBand` over 24 and 34 with `ART.downArrow` on 34 (`ANIM.glowIn`), fading after 900 ms; the 2nd refusal adds the "+10" bars.
  - "Ends in 0 or 5" (25 after 13, 18, 23): the paced +5 from 23 lands on 28; the 2nd refusal adds the "+5" bars along 13-18-23.
  The ford is `setEnabled(false)` for the whole enactment — about 1.6 s, and about 2.4 s on a +5 line whose five wade marks take longer — so a tap cannot land mid-teaching. This is never shorter than the pre-pivot spec's enactment (GAME-DESIGN-LAW §6: correction duration may not fall, and the world freezes while a correction plays).
- **Retry behaviour**: per target stone — attempt 1 unaided → attempt 2 after the paced stride → attempt 3 after the stride bars → the show-me `ART.footRing` on the correct stone; stepping on it sets it and the walk continues; the span is solved-with-help. No attempt 4. Success is certain.
- **Anti-brute-force guard: THE OPEN WATER.** P1's tile re-shuffle is unavailable and must not be substituted — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes the ford a place (GAME-DESIGN-LAW §6). The named replacement has three parts and is strictly stronger than a re-shuffle. (1) *The field is open, not a candidate set:* all hundred stones are live, so a random tap is correct with probability about 1/93 and a guesser reaches the show-me ladder on essentially every stride and is TAUGHT rather than rewarded; guessing is not merely unprofitable, it is slower than thinking. A re-shuffle defends a four-tile board; an open board needs no defence, because there is nothing to memorise and nothing to eliminate. (2) *The stride is a one-way door:* a stone the goat has stood on is set for the session, the goat never un-steps, there is no undo, and any span containing a refused stride is never first-try whatever happens afterwards. (3) *The candidate set varies per item; the positions never do:* the stones stay exactly where they are forever, and what changes per span is the STRIDE and the START, so no stone is a target twice in a session and a remembered position is worth nothing (F-41's conveyor rule satisfied without moving any furniture — the items are events, the ford is a location). This is also the fixed-world form of §13: *never the same category twice running* replaces *never the same slot twice running*, enforced on the content list. A fourth guard falls out of the destination geometry for free: the obvious cheat, tapping the marked stone the kid is on, is refused because the stride reaches exactly one gap and never seven.
- **Finish condition**: 10 spans completed, ten kids in the pen. No losing state, nothing that counts down, nothing that can be lost. Exactly zero ways a session ends other than by finishing. Nothing in the world ever decays: no set stone un-sets, no kid leaves the pen, the pen never moves, the water never rises, and a refusal costs a stride and nothing else (the RATCHET RULE).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`. `t("question_x_of_y")` is deliberately NOT used — there is no item counter on the play surface.
- Game-specific `STRINGS` (all 11 locales at build time, §17): `title` = "Stepping Stones"; `premise` = "Bring them home." Five English words for the whole game, against the 6-8 band's eight (F6). Both appear on the Start screen only; the play surface carries zero words. The stride labels are a plus sign and a numeral, never a word, in every locale.

## Sound
`tone("tap", k)` on the k-th correct stride of a span (k = 1 … 4, pitch climbing along the line — F-213); `tone("tap", k)` per `ART.wadeMark` during a paced stride; `tone("nudge")` on a refused stride, whether the stone tipped or the leg did not reach; `tone("correct")` when a span completes; `tone("finish")` once. Sound never carries meaning the screen does not also show. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (the title, the premise, All done, Play again, Menu and the praise rotation change with the picker; the ford is numerals and plus signs).
- [ ] Works at narrow width (400-px iframe: all 100 stones legible and tappable, the goat, the kid, the pen and the mother all visible in one frame; the stage is 720 × 720 and scales as one).
- [ ] Keyboard operable (Tab enters the grid at the hero's stone; arrow keys move the focus ring row-major; Enter strides; a real pointer drives at least one assertion per §3.1, and the hit rectangle is mapped, not sampled at the centre).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused strides still ends in a completed span via the show-me ring; nothing can be lost; the session cannot end except by finishing).
- [ ] MISSION — the goat, the current kid and the pen are all on screen in the very first frame of item 1, and the pen's (x, y) is identical in the first and last frames of the session (M1).
- [ ] MISSION — driving a full session, the hero's position changes on at least 9 of the 10 items, and every position change is a tween the child caused (M1; and note the declared M3 conflict in World — the goat wades between spans, so its start position is not EQUAL to its finishing position, and the correct assertion is *no discontinuity without a caused tween*, never positional equality).
- [ ] RATCHET — a session driven with a wrong answer on every item never decreases `mission.progress` (kids in the pen + set stones); no set stone ever un-sets; no kid ever leaves the pen (M4).
- [ ] INSTANT-CUT (Test C) — patching `ANIM.stride`, `ANIM.kidJoin` and `ANIM.wade` to duration 0 produces a byte-identical item log: the same stone tapped, the same stone set, the same tag placed, the same kid reached, in the same order. The harness must NOT patch `ANIM.pace`, `ANIM.glowIn` or `ANIM.appear` — those are the teaching, not the travel, and at duration 0 elaborated feedback collapses to knowledge-of-result.
- [ ] DELETION 1 — strip the numerals from the stones and the tags from the causeway: every stone is identical, nothing distinguishes the stone that bears weight, and no playable walking mode survives.
- [ ] DELETION 2 (`mutate-mission.js`) — remove `mission.hero` and `mission.goal`: the commit IS `hero.stepTo(stone)`, so an item becomes mechanically impossible to complete.
- [ ] FREEZE (M2) — at every decision point of a full session, if any stone is enabled the running tween count is zero; the goat holds one static pose and nothing breathes, drifts or loops during play.
- [ ] The three laid stones of each span are teal-washed with a raised lower edge and carry their "+n" labels, the goat stands on the last of them, and on item 1 only the goat takes its first stride unbidden and then holds.
- [ ] Striding onto 10 after 2, 4, 6, 8 sets the stone, carries the goat there, and places the "+2" in the right margin at (662, 92) because that pair wraps the row.
- [ ] Striding onto 7 after 2, 4, 6 tips that stone 6° and rights it, then two coral counters pace 7, 8 from the 6 with rising notes, the second grows on 8, and they fade — and the goat's pose is identical in the before and after screenshots.
- [ ] Striding onto a stone that is already SET from an earlier line and is NOT one stride on extends the leg and brings it back; the stone is untouched and does not tip.
- [ ] Striding onto a stone that IS one stride on but is already set from an earlier line is ACCEPTED (two lines crossing at 20), and the new "+n" tag is added.
- [ ] On a +10 line a refused stride drops a coral current down the column from the goat's stone with an arrow on the target; a second refusal lays the "+10" bars; a third puts a pulsing ring on the correct stone.
- [ ] A line laid 3, 5, 7 accepts 9 and refuses 8 and 10; a line 13, 18, 23 refuses 25 and accepts 28; a +5 correction from 17 paces across the row break onto 18, 19, 20, 21, 22.
- [ ] Tapping the stone the kid is standing on is refused (the stride reaches one gap, never seven).
- [ ] Only ONE coral region is on screen in any frame: the live line's tags while a choice is open, or the correction while one is playing, never both.
- [ ] Two first-try spans in a row bring an off-multiple start; a span with two refused strides brings a multiple-start span next.
- [ ] The pen fills left to right, one kid per span, at x = 224 + i × 30; the mother does not react to a correct answer and turns to the pen only at the finish.
- [ ] The finish screen re-draws the ford at its play coordinates with all ten lines still laid, a filled dot on the first stone of each unaided line and a hollow one on each helped line; no score, no time, no star.
- [ ] ACT budget: total ACT time across a full session is measured and is under 60 s (R1).
- [ ] With `?sound=off` nothing is audible.
