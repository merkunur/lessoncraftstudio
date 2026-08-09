# Premium Tools v5 — the final twenty

**Ideas only. Nothing is designed here.** Read, cut, reorder — then we design one per session.

---

## Context — why this document exists

The platform ships **47 live tools**, ~204 activities, 240 printable types and 33 generator apps. The
v4 catalog (§23) has shipped nine of its twenty and has **eleven approved-but-unbuilt slots left**.
The operator's brief: find **20 NEW tool ideas** for the **final batch**, at a **higher bar** than
everything already shipped — instruments that solve a real K-3 teaching problem, make a genuinely
hard or laborious teaching task easy, and are exciting enough to compete with the established giants.

Two shipped tools were named as the standard (**learning-clock**, **money-mat**) and two as the
failure (**say-it-board**, **feelings-check-in**).

### What actually separates them — measured, not guessed

I had the four files read side by side. The diagnosis is structural, not a matter of taste:

| | learning-clock / money-mat | say-it-board / feelings-check-in |
|---|---|---|
| Ground truth | a theorem over a named domain (`V4 signed delta` over **129,600** pairs; **DP proof over the full legal price set**) | none — the gates prove *hygiene* and *privacy*, not correctness |
| Refusal | the gearing makes an impossible hand pair unreachable; the purse **only offers coins that still fit the gap** | nothing can be wrong, so nothing can be refused, so nothing can be discovered |
| A numeral moves | the idiom bubble + honey arc; the running total pill | no number anywhere |
| Repertoire | **generated** — 720 times × 11 locales from rules; currency × band × item × proved prices | **five feelings, forever**; ~72 hand-authored cards × 11 = ~790 strings |
| The verb | rotate-under-gearing; compose a multiset | tap-to-select-one-of-N |
| Who is teaching | the teacher teaches **from** it | the class emotes **at** it |
| What the subscription buys | five distinct depths (finer steps, practice, elapsed, saves, print) | a text-entry quota / a name list |

**One line:** the good ones are *instruments with a provable physics and a generated repertoire, where
the child's hand changes a number and the material refuses a lie*. The bad ones are **soundboards**.

Across all 47 shipped tools the split is **26 good / 12 borderline / 9 bad** — and **8 of the 9 bad
are language tools**, which is why §23.1 bans them. **This batch therefore contains zero language
tools** (reasoning in the Rejected section).

### The six bars every idea below had to clear

1. A real physical **verb** (not tap-to-select).
2. A **numeral** that changes because of the hand.
3. The material **refuses** a wrong state — wordlessly, no verdict, no red X.
4. A **theorem over a named finite domain** a gate can prove exhaustively.
5. A **machine-generable** repertoire (hundreds), not a hand-authored list.
6. A named repeatable **routine** with a second move that costs the child something they committed
   to — and it ends in **argument**, not silence.

Plus the operator's own bar: **it must do something a teacher cannot practically prepare or
improvise with paper, card and real classroom objects.**

### How these twenty were chosen

26 candidates were put in front of three independent panels run in parallel — a K-3 didactics expert
(scored all 26 on six axes, killed 3 outright, folded 4, and proposed 10 of its own), a repo fence
auditor (checked every candidate against all five surfaces including the eleven unbuilt v4 slots,
plus a noun census in six languages), and a competitive analyst (prior-art checked every idea against
Polypad, PhET, Toy Theater, Gynzy, ICT Games, NCTM, Mathsframe, Topmarks, SolveMe, Math Learning
Center, and killed 15 as already free elsewhere).

**Only four candidates survived all three panels.** The rest of this list is what survived the merge
plus what the panels produced. Every entry below carries its **fence status** honestly — including
the ones that will have to fight at build time.

### The thesis that emerged

The strongest ideas here share one shape:

> **The instrument shows the structure that only appears when you do something ALL the ways, or very
> many times — which is precisely what a class cannot do by hand.**

All the ways (combinatorics), all the cases (the pyramid run backwards), all the positions (common
multiples), five hundred trials in eight seconds (the pins), every rectangle of perimeter 24. This is
the operator's "make a complex teaching task easier" stated as an engineering property, and it is
also the thing no competitor's *widget* can do, because a widget has no domain.

---

# THE TWENTY

Ranked. **F:** = fence status. **∎** = the theorem.

## A · Number, structure and pattern (8)

### 1. THE PYRAMID · *Zahlenmauer, made operative*
A wall of stones, each the sum of the two below it. **The invention: drag one base stone and fifteen
numbers cascade — and the wall runs BACKWARDS,** fixing the top and letting the machine prove, over
the whole base domain, that exactly one base fits, or that seventeen do. The class discovers the
middle stone counts double (top = a + 3b + 3c + d) without anyone saying "coefficient".
**Routine:** "Move one stone." Predict the top before releasing; then move a *different* stone by the
same amount and explain why the top moved further.
**∎** for every masking pattern, uniqueness of the completion decided exhaustively over the full base
domain. **Repertoire:** number range × row count × masking pattern — tens of thousands, difficulty
graded by *provable* solution count, not by "bigger numbers".
**F: VIRGIN mechanism.** Nothing on any surface propagates a sum upward through a lattice. Every
German Zahlenmauer site is an *exercise generator* — fill the blank, green tick, next. The operative
version does not exist digitally anywhere. ⚠ Name: `wall` is owned by `calendar-wall` and
`picture-word-wall` in EN, DE, NL, SV, DA and NO — hence *Pyramid*, shipping the native name per
locale (*Zahlenmauer*, *Rekenmuur*), which is the whole point.
**Paid:** the graded wall library, missing-stone patterns, operative series, saved class sets, and
the print sheet in the local layout — the single most-printed item in German Klasse 1-2.

### 2. THE QUARTERS · *Malkreuz — the distributive law as physics*
A rectangular dot array. Drag one horizontal and one vertical cut line; four sub-arrays appear, each
with its own product numeral. **The invention: the four products churn wildly while the TOTAL numeral
physically cannot move.**
**Routine:** "Cut it kindly" — find the cut that makes 7×8 easy. Second move: someone else's cut
gives a different pair of easy numbers and the same total. Argument guaranteed.
**∎** ∀ m,n ≤ 20, ∀ cuts i,j: ij + i(n−j) + (m−i)j + (m−i)(n−j) = mn — **144,400 states, exhaustive.**
**F: PARTIAL — ship the CUT, never the build.** `array-core.js` owns building an R×C array;
`G3-313-area-model`, `G3-301`, `G3-314`, `G2-211/212` own counting and commutativity. Nothing anywhere
cuts an array and asserts the four-part invariant. Prior art is **one GeoGebra applet** plus PIKAS
PDFs. *Halbschriftliche Multiplikation* via Malkreuz is examinable Klasse 3 content across DE/AT/CH
and structurally absent from every Anglo product.
**Paid:** the sequenced cut library (the "nice numbers" progression), recording sheets matching the
PIKAS/mahiko convention, saved arrays.

### 3. THE COMBS · *two perforated strips, slid over each other*
Two strips, one punched every 3, one every 4. Slide one over the other; where holes line up, light
comes through. **The invention — SUPERIMPOSITION, a verb no tool on this platform has: the answer is
made by the layout, not computed.** Common multiples appear as the only lit positions, and the class
watches the pattern of light repeat.
**Routine:** "Which numbers do we say when we count in 3s **and** in 4s?" Second move: predict the
next lit hole before sliding.
**∎** lit positions = multiples of lcm(a,b), exhaustive over a,b ≤ 12 × positions ≤ 144. A comb of
period 1 lights everything; two combs of coprime period agree only at ab.
**F: VIRGIN verb.** `choral-counting` owns counting aloud and skip-counting on a grid; nothing
overlays two periodic structures. Consumes the didactics panel's "Two Bands" idea in a better
apparatus.
**Paid:** the comb library (including 3-comb sets), the position-question deck, saved sets, print.

### 4. THE RING · *counting, wrapped round a circle*
Twelve marks in a circle. Step round by 3 and join each landing to the last: a triangle. Step by 5:
a twelve-pointed star. Step by 4: a square, closing after three moves. **The invention: skip-counting
is bent into a closed loop, so the thing that is usually an endless line becomes a SHAPE — and the
shape is different for every step.** Steps that share a factor with the ring close early and never
visit every mark; steps that do not, visit all of them.
**Routine:** "Will this one come home before it has touched every mark?" Commit, then step.
**∎** the orbit of step s in ℤₙ has length n/gcd(n,s); it visits every mark iff gcd(n,s)=1 —
exhaustive over n ≤ 24 × s < n. Also: step s and step n−s draw the identical figure traced backwards.
**F: PARTIAL.** `star-stitcher.connect-sequence.k-cc-a-2` joins dots in counting order on a plane;
`choral-counting` owns the chart and the chant. The **wrap** — counting that returns to its start —
is unowned everywhere, and "times-table circles" is a known UK routine with no tool at all.
**Paid:** ring sizes beyond 12, the two-ring comparison, the printable string-art card.

### 5. THE PEEPHOLE · *a window over a hidden chart*
The hundred chart is face down. Drag a plus-shaped or L-shaped window over it; only the cells under
the holes show. Say where you are. **The invention: the chart's WIDTH is a control.** Set it to 7 and
it is a calendar; set it to 9 and the multiples of 9 stand in a column. "Down is +10" quietly becomes
"down is +w", and the rule the children thought they knew dissolves.
**Routine:** "Where am I?" Second move: change the width and run the same window again.
**∎** for an interior cell c on a width-w chart the window shows {c−w, c−1, c, c+1, c+w}; any fragment
of ≥2 cells determines its position uniquely — exhaustive over 100 positions × window shapes ×
w ∈ [3..12].
**F: PARTIAL, and it is the OTHER HALF of an approved slot.** v4's unbuilt **A7 Hundred Field** is
*paint the numbers then reflow the grid*; this is *hide the chart and deduce from a fragment*. They
are complementary and should not both be built as written — see the v4 remainder ruling below.
**Paid:** the window library (shapes, widths, edge and corner cases), saved boards, print.

### 6. SIX WAYS · *one quantity, six notations, five of them hidden*
Scattered dots · a ten-frame · a die face · a tally · fingers · the numeral. **All six are bound and
bidirectionally editable — change any one and the other five move.** But five of the six start
**covered**, and the class predicts before the reveal. Without that mask this is the soundboard with
a coat of paint; with it, it is the daily five-minute opener.
**Routine:** "It is seven here. What will it look like there?" Second move: change it from a
*different* panel and watch the numeral you were staring at move on its own.
**∎** the six render functions are mutually consistent bijections on [0..20]; 30 input/ask pairs × 21
values, exhaustive.
**F: PARTIAL, non-place-value only.** `place-value-lab` already binds three displays (blocks /
numeral / number word) and owns that trio; `number-talk-easel` owns the flash-behind-a-curtain and
the 11-locale representation vocabulary — inherit its names by citation, never re-name `Würfelbild`.
The remainder is **simultaneity across six NON-base-ten notations, edited from any end**, which
nobody ships: Polypad, Gynzy and Toy Theater each ship these as *separate objects*.
**Highest frequency item in the batch, and the most shareable six seconds of video.** EdWeek names
"representation transfer" as the hardest thing in Grade 1.
**Paid:** the flash-sequence repertoire (quick images, subitising routines, 0-10 → 0-20 → teens),
saved class routines, matching cards printed from the same set.

### 7. THE CHUTE · *a machine with a rule it will not tell you*
Drop a number in the top; a different one comes out the bottom. The class works out what the machine
does. **The invention: the machine can prove which inputs would actually settle the question** — it
knows when two rules are still alive and refuses to be pinned down by a lazy guess.
**Routine:** "Give it a number that would tell us something." Second move: name a number and predict
the output *before* dropping it.
**∎** over a finite rule set, the pairs that disambiguate any two rules are computable; a rule is
determined by ≤k inputs, exhaustive per rule family.
**F: PARTIAL.** `sorting-hoops` owns hidden-rule deduction over **attributes**; this is over
**numbers**, which is unowned. Polypad and Math Playground ship function machines, but as free-play
canvas tiles with the rule visible — none hides the rule or reasons about disambiguation.
**Paid:** the rule library graded by arity and by how many inputs it takes to pin down, saved
machines, print.

### 8. THE STAIRCASE · *growing patterns, and the leap to term twenty*
Build term 1, term 2, term 3. Then jump straight to term 20 — **the instrument refuses to build the
intervening ones**, so counting on is unaffordable and the class has to find the rule that gets there
in one move. The figure is built from real tiles and it counts itself.
**Routine:** "How many for step 20?" Commit, then build it and count.
**∎** term(n) = a + (n−1)d for linear families and the closed forms for the square/triangular
families, checked against a physical tile count over n ≤ 50 × the generated family set.
**F: PARTIAL.** `pattern-bench` owns **repeating** patterns (the unit of repeat, in three costumes);
`K-053` and `G3-326/327` are printables. Growing patterns are a different object — term-to-term
versus position-to-term is the hinge into algebra, and patterning is the strongest single predictor
of later algebraic competence.
**Paid:** the family library (linear, square, triangular, two-dimensional), saved patterns, print.

## B · The language of number — the eleven-locale moat (2)

### 9. THE TWO ORDERS · *what you write, and what you say*
One quantity. Two traces run over the same numeral: the order it is **written** and the order it is
**said**. German and Dutch and Danish say the units first — *fünfundzwanzig*, *vierenzestig* — so the
right-hand digit lights before the left while the numeral sits still. French takes a detour through
4×20+10. Danish *halvtreds* is two-and-a-half twenties. Portuguese is perfectly regular, and stands
as the control the other ten are compared against. **The invention: two locales side by side, on the
same number, at the same time.**
**Routine:** "Write what you hear." Then: "Now watch the Portuguese one."
**∎** the utterance-order function verified against a per-locale table for all n ∈ [1..999] × 11
locales; the written order is invariant across all eleven while the said order is not.
**F: CONTESTED — the most fence-exposed idea here, and the most defensible if it survives.**
`place-value-lab` already ships `PV_WORD_SPANS`, gate-verified byte-equal for 0-999 × 11, and already
tints German *vierundzwanzig* so the 4 is visibly said first. The remainder is the **cross-locale
side-by-side**, the **digit-reversal trap** (51 written for 15), and the dictation direction. If the
remainder is judged too thin this becomes a `place-value-lab` premium mode — but it should not simply
be dropped.
**Why it matters:** ~50% of German first-graders' transcoding errors are inversion-related, and
inversion errors at the end of Grade 1 predict poorer **carrying** at the end of Grade 3.
[Zwanzigeins](https://zwanzigeins.jetzt/) has campaigned on this for years and its only artefact is a
research dictation app. **No Anglo company will ever build this.**

### 10. THE OTHER TEN · *the land where they count in fives*
A place-value mat where **ten loose ones will not enter the tens column** — you must bundle them
first, and the bundle snaps together in your hand; to subtract you must physically unbundle before
you can take. Then the control that changes everything: **the bundle size is not ten.** Set it to
five, or four, or two, and run the same number again.
**Routine:** "Make it legal in the fewest moves." Second move: do the same number in base five and
argue about which took fewer.
**∎** base-b representation uniqueness over all n ≤ 9999 and all non-normalised chip configurations;
the normalising path length is determined. Exhaustive over the finite chip domain.
**F: CONTESTED.** `place-value-lab` owns bundle/unbundle and the three linked displays;
`bundle-machine-core` owns ×10 composition. The remainder is **the base as a variable** and the
**enforced** bundling constraint — with real Dienes blocks a child can leave ten unit cubes sitting
in the tens column and nobody notices. Freudenthal's and Dienes' own argument is that ten only
becomes visible as a *choice* once you have counted in something else.

## C · Space (2)

### 11. TWO NUMBERS · *(3,5) is not (5,3)*
A grid where a place is named by an ordered pair. Swap the two numbers and you land somewhere else —
somewhere that is always the mirror of where you were, across the diagonal. **The invention: the pair
is a single object with an order, and the order is visible as a reflection.**
**Routine:** "Say where the treasure is." Second move: swap your two numbers and say where you have
gone.
**∎** the pair→cell map is a bijection; swap is the reflection about the main diagonal, and its fixed
points are exactly the cells (k,k) — exhaustive over all grids to 10×10.
**F: PARTIAL.** `arrow-strip` owns *movement across* a mat by a plan; `parking-tower.place-by-relation`
owns positional language. Nothing on any surface names a place by an ordered pair.
**Mandated at Grade 3 in Norwegian LK20** — *"experiment with and explain positions in the coordinate
system"* — two full grade bands earlier than CCSS, which puts it at Grade 5. A CCSS-first competitor's
standards map has no pin here.

### 12. THE CUPS · *it fits, or it does not*
A shelf of cups. Nest them. **The invention: the refusal is total and needs no words — a wider cup
simply will not go inside a narrower one, and the material never says why.** Then the conflict that
makes it a lesson: a tall thin cup and a short wide one, where the taller cup is the smaller cup.
**Routine:** "Put them in order without pouring anything." Second move: fill them and find out.
**∎** nesting is possible iff the ordering by diameter is total and consistent with the ordering by
height; the generator produces sets where the height order and the volume order **disagree**, and
proves the disagreement. Exhaustive over the generated cup sets.
**F: PARTIAL, and inside a strand §23.7 marks CLOSED (capacity / weight / non-standard length).**
`nesting-pots.seriate.k-cc-c-7` and `measurement-bench` are the incumbents. ⚠ **This is the most
fence-exposed entry in the batch — cut it first if twenty is too many.** The argument for keeping it
is that the payload is *transitivity and conflicting orderings*, i.e. logic, not measurement, and
that **nest** is a virgin verb on a platform where nothing fits inside anything.

## D · Data, chance and combinatorics (4)

### 13. ALL THE WAYS · *the tree, the table, and the things themselves*
Three tops and two bottoms. The tree grows branch by branch; it collapses into a table; the leaves
resolve into a row of six little outfits. **The invention: redraw the same tree with the attributes
in a different order and the shape changes completely while the leaf COUNT refuses to.** That is the
multiplication principle discovered rather than stated.
**Routine:** "Have we got them all?" Second move: start from the other attribute and count again.
**∎** leaves = ∏ branch factors; the leaf set equals the Cartesian product; cardinality is invariant
under attribute order — exhaustive over all factor tuples with product ≤ 60.
**F: PARTIAL — a product, where C4 is a partition.** v4's unbuilt **C4 Splitting Key** draws a tree
too, but its leaves *sum* to the heap; these *multiply*. Same picture, different theorem — expect to
litigate it, and see the remainder ruling below.
**Why it matters:** Kombinatorik is mandated in **KMK** (with tree diagrams and tables named
explicitly), in **Lgr22** (*kombinatoriska situationer*), and in **BNCC EF03MA25** (*identify ALL
possible outcomes*). **CCSS puts tree diagrams in Grade 7.** The nearest prior art is CK-12's outfits
tree, filed under Math 7. Nothing at K-3, nothing multilingual.
**Paid:** the localised context library (Brazilian *lanche*, German Eisdiele, Dutch broodjes),
tree→table export, saved setups.

### 14. THE PINS · *five hundred falls in eight seconds*
Balls drop through a field of pins; each pin sends a ball left or right; the balls pile up in the
slots below. **The invention: the middle fills because MORE PATHS LEAD THERE, and each ball's own
route is drawn as it falls, so the pile is explained rather than asserted.** Ask for one ball, or a
hundred, or five hundred.
**Routine:** "Which slot will win?" Commit before the first ball. Second move: run it again and see
whether the same slot wins.
**∎** the number of paths to slot k after n rows is C(n,k) — the pyramid of #1, standing on its head —
and the empirical distribution converges to it; exhaustive path enumeration for n ≤ 10 against a
seeded run. **No unseeded randomness**: every fall is a pure function of (rig, seed, index), so Oslo
and Lisbon see the identical run.
**F: PARTIAL — the strongest constraint is our own tool.** `draw-bag` owns chance and carries two
permanent refusals this must respect: *no frequency numeral, ever* and *no stacking by kind on the
record*. The pins survive because the payload is **path counting**, not frequency: the pile is a
consequence of a visible tree, and the tool need never print a number for it.
**The best six seconds of video in the whole batch,** and the only entry that ties combinatorics,
chance and the pyramid into one object.

### 15. EVERY PAIR · *the whole sample space, before the first trial*
Two devices. Every one of their combined outcomes is on the table **before anything is rolled** — all
thirty-six pairs, face up. Each trial lights its own cell. **The invention: the outcome space is the
apparatus, not a result.** Seven is common because six cells say seven; twelve is rare because one
does.
**Routine:** "Choose a total to stand behind." Second move: after ten trials, change your mind and
defend the change.
**∎** |{(a,b) : a+b = s}| = 6 − |7 − s|, summing to 36 — a 36-state exhaustive domain; and the same
identity for any pair of devices with any face sets.
**F: PARTIAL — ship the sample space, DROP the histogram.** The histogram is `draw-bag`'s refusal 2
and `class-graph`'s territory. Free two-dice simulators exist (LearnMathClass, InventiveHQ) but they
are adult-register calculators that show the *result*; none puts the sample space up first, which is
the entire pedagogy. ⚠ Two-dice sums are usually taught later — pitch this at *possible outcomes*
(BNCC EF03MA25) rather than at distribution, and it sits correctly in Grade 2-3.

### 16. ONE STANDS FOR · *the data holds still and the picture changes*
A finished pictogram. Drag the key: one icon = 1, then 2, then 5, then 10. **The invention: the
numbers do not move and the picture becomes unrecognisable** — and half-icons appear exactly when the
key does not divide the values.
**Routine:** "Choose a key that fits in eight icons." That is estimation and divisibility in one hand
movement. Second move: choose a key that makes no half-icons, and say how you knew.
**∎** Σ(icons × k) = Σ values, invariant over all k; k produces no half-icon iff k divides gcd(values)
— exhaustive over generated data sets.
**F: PARTIAL, and previously rejected once.** §23.7's rejected list names *"Pictograph key"* as
occupied; the occupying artefacts are `G2-238` and `G3-333` (printables that ask a child to *read* a
scaled pictograph) and `class-graph` (which owns 1:1 and children-generate-the-data). The remainder
is **the draggable key** — nobody, in any product checked, lets the scale move while the data is
locked. Thin wedge over a crowded field; keep only if the gcd payload is built.
**Paid:** the survey bank and the display-poster print — wall displays are a universal primary
obligation and the print is what converts.

## E · The world, verifiably (2)

### 17. COGS · *the only thing here a non-teacher would share*
Mesh two to five toothed wheels and turn one. The others turn — some faster, some slower, and **every
other one turns the wrong way.** **The invention: a gear train a child can build, at a child's
register, where the arithmetic is integer tooth counts and nothing is a formula.**
**Routine:** "Make the red one turn twice as fast." Second move: "now make it turn the *other* way as
well."
**∎** ω₂/ω₁ = −t₁/t₂ along the train; the sign alternates, so wheel k turns the same way as wheel 1
iff k is odd — exhaustive over all trains to 5 wheels from a fixed tooth-count set.
**F: PARTIAL, and it forces a decision about A4.** v4's unbuilt **A4 Carry Wheels** claims *geared
wheels* for the place-value carry; `learning-clock` already ships a live 1:12 gearing. Cogs is a
different payload — ratio and direction parity, not a decimal odometer — but the two should not both
be built. See the remainder ruling.
**Prior art is a genuine hole:** every free gear simulator (NovaSolver, MechSimulator, PhysSandbox) is
an engineering calculator talking about module and pitch circle diameter. The one child-appropriate
version, EduMedia's *Gears sketch*, is behind a paid subscription. PhET has nothing.
**Paid:** the challenge repertoire, saved rigs, and **printable cut-out cardboard gears the children
assemble** — the most coveted paper artefact in the batch.

### 18. WEEK BY WEEK · *the instrument that remembers across the term*
A plant, a beanstalk, a shadow at noon, the days in school. Measure it once a week; the instrument
keeps every previous measurement, draws the change, and asks the class to predict next week before
revealing it. **The invention: nothing else on this platform remembers for longer than a lesson.**
**Routine:** "How much this week?" Second move: predict next week, in writing, and come back to it.
**∎** the difference column is the first difference of the record; a straight-line prediction is
computable and the tool scores the *class's committed* prediction against the measurement, never
against a child. Exhaustive over generated record shapes.
**F: VIRGIN, with an honest dependency.** Nothing spans sessions. ⚠ Saved setups today are
`localStorage` — per browser, wiped by a cache clear — and §23 already names a server-side setup store
as *"the honest prerequisite for selling paid depth + record, and the #1 unbuilt shared piece"*. **This
tool is the argument for building it**, and it makes the subscription genuinely sticky. Constraint
inherited from `feelings-check-in`: it holds the class's measurements and **never a record about a
child**.

## F · Two more (2)

### 19. THE RATTLE · *a total you cannot break*
A closed two-chamber box with a fixed number of beads inside. Shake it. The split changes; the total
cannot. **The invention: the child does NOT author the split — chance does — and every split that
appears is stamped permanently on a strip, so the question becomes "have we found them all?"** Cover
one chamber and the same box is a missing-addend machine.
**Routine:** "Hunt the split we have not seen." Second move: cover a chamber and say what is under it.
**∎** n beads admit exactly ⌊n/2⌋+1 unordered splits; the strip is complete iff all are stamped; the
shake is seeded, so the run is reproducible in every classroom.
**F: PARTIAL, thin remainder — rank it last of the number tools.** Decomposition is quadruply owned:
`part-whole-frame` (*"the whole never changes… conservation is UNREPRESENTABLE"*), six number-bond
activity rows, `chuffer.rail-decompose`, and `lids`. What is left is **the record of every
decomposition, produced by a split nobody chose**. ⚠ The honest objection: a real Schüttelbox costs
€4 and a teacher can shake it. Build this only if the record strip and the covered chamber are both in.

### 20. THE MISSING QUESTION · *the picture stops before anyone asks anything*
A wordless situation plays and freezes: five birds on a wire, two lifting off. No question appears.
**The invention: the withhold is the QUESTION itself** — the class argues about what this picture can
be asked, discovers it can be asked several things, and only then writes a number sentence.
**Routine:** "What could we ask?" Second move: "what could we *not* ask?"
**∎** every generated situation instantiates exactly one of the classic problem structures
(join / separate / part-part-whole / compare × unknown in each position), and the set of questions the
picture can answer is computable and complete — exhaustive over the generated situation space.
**F: PARTIAL.** `ten-frame.solve-the-story` and `vet-diagnosis.word-problems` present word problems;
nothing withholds the question. Word problems are named in every teacher survey as the hardest thing
in Grade 1 *because they are multimodal* — and a wordless situation removes the reading load without
removing the mathematics, which is exactly the eleven-language advantage. Teachers cannot generate
all the problem structures by hand; the tool can, and can prove it covered them.

---

# What was killed, and why — so nobody re-proposes it

**Beaten by a free, well-funded, heavily translated incumbent.** Every slot spent fighting one of
these is a slot not spent on something nobody will ever contest.

| Idea | Killed by |
|---|---|
| Cube nets that fold up | **Polypad** ships fold/unfold on all 3D solids, plus NCTM Cube Nets, EduMedia, OSP Singapore. Also a Year 5-6 investigation. |
| Pentominoes / same-under-rotation | **Polypad** ships pentominoes as snapping, rotating first-class tiles with published lessons. Also: §23.7 already rejected "The Turn/Flip Table". |
| Float / sink with variable mass and volume | **PhET Density** and **PhET Buoyancy** do exactly this, free, in dozens of languages. Also inside the §23.7 closed corpus-science strand. |
| A circuit board | **PhET Circuit Construction Kit** — and it is a puzzle with a solution, so it fails gate 5 twice over. |
| A free-angle mirror line | **Mathsframe ITP Symmetry** is precisely the spec, free, and a generation of UK teachers already knows it. Our own `folding-sheet` owns the generative half; free-angle belongs there as a mode. |
| Adjustable sector spinner | The most saturated slot found anywhere: NCTM, Shodor, three separate Toy Theater spinners, Gynzy, Polypad, NRICH. |
| Area vs perimeter explorer | Toy Theater, Shodor, PhET Area Builder — **and it is v4's own approved B5 Reshape**. |
| Hanging mobile / balance puzzles | **SolveMe Mobiles**: free, 200 puzzles, a builder, a community, an iOS app, already in EN/ES/FR/DE. |
| Zoomable number line | Maths is Fun, GeoGebra, Web Sketchpad — and it is a Grade 3+ decimals tool. |
| Gattegno tens chart | ICT Games ships it free *with* a number-word toggle; Mathsbot ships it free. Only the multilingual saying-order engine survives — as **#9**. |
| Counting stick | Topmarks ships it; and it is also a metre stick, the cheapest apparatus in education. |
| Fractions on a number line | Math Learning Center, Mathsbot, Brainingcamp, SplashLearn, Polypad — and `G3-317` plus `fraction-kitchen`'s *meaning-before-notation* ruling. |
| Day length across the year | The astronomy is already claimed by v4's approved **C2 Shadow Yard** (declination to under a minute × 11 latitudes). Ship it as a C2 mode. |

**Occupied on our own surfaces.** Conservation-of-number two rows (`bead-string-core` states
*"the NUMBER OUTLIVES the ARRANGEMENT"* verbatim) · dot plot / class line plot (`estimation-jar`
already built a real one, stacked by value, anonymous dots) · sorting tree by yes/no questions
(= approved **C4 Splitting Key**) · non-standard-unit measuring (`measurement-bench` + `unit-handle`)
· live class data capture (`class-graph`) · occlusion of a known quantity (`lids`, `part-whole-frame`,
`number-talk-easel`) · structured estimation and reveal (`estimation-jar`) · build-and-view Baupläne
(`build-plan`, shipped as #44) · localised money and till (`money-mat`) · a broken/sliding ruler
(`ruler`) · fair sharing with a remainder (`lids` + approved **A6 Grouping Dial**) · angle with
stretchable arms (approved **B6 Hinge**) · geared demonstration clock (`learning-clock`).

**Ruled out by category.**
- **A wordless "certain / likely / unlikely / impossible" ladder.** There is no theorem — the boundary
  between *likely* and *unlikely* is a linguistic convention, not a fact over a domain. `draw-bag`
  permanently refused it (*"NO LIKELIHOOD WORD in any of eleven languages"*). Ship the BNCC four-term
  and KMK three-term coverage as a **mode** of an existing chance tool, not a slot.
- **Rhythm and pattern-in-time.** Genuinely virgin and genuinely delightful — but it would depend on
  hearing, and `LCSAudio` never calls `getVoices()`, so six of eleven locales get silence. The
  no-audio law kills it.
- **ZERO LANGUAGE TOOLS, deliberately.** §23.1 bans them; 8 of the 9 tools bucketed as the bad pattern
  are language tools; and the biggest un-built literacy artefacts (sound walls, Making Words, word
  ladders, word sorts) are either asset-blocked, already free from UFLI and Toy Theater, or 100%
  authored language on the stage — the exact shape of the two tools the operator rejected.

---

# The v4 remainder — a decision this batch forces

Eleven v4 slots are approved and unbuilt. Twenty new ideas plus eleven old ones is thirty-one more
tools, which is not a "final batch". Three of the eleven now overlap something better above:

| v4 slot | Recommendation |
|---|---|
| **A4 Carry Wheels** | **Supersede with #17 Cogs.** The carry mechanic overlaps `place-value-lab`'s bundling; Cogs takes the same virgin gearing verb somewhere nobody else has been. |
| **A7 Hundred Field** | **Merge with #5 The Peephole** — paint-and-reflow and hide-and-deduce are two halves of one instrument, and the variable width belongs to both. |
| **C4 Splitting Key** | **Keep, and hold the line against #13 All the Ways** — partition versus product. If only one is built, build **All the Ways**: it is curriculum-mandated in three markets, C4 is corpus-blocked behind `object-attributes.json`, and §23.7 already suggests C4 may just be a Sorting Hoops mode. |
| A3 · A6 · B5 · B6 · C2 · C3 · C5 · D1 | Unaffected. **D1 Morning Board still builds last** — and #18 Week by Week is its natural sibling, since both need the server-side setup store. |

---

# Recommended build order

**Wave A — prove the batch (4).** #1 Pyramid · #2 Quarters · #13 All the Ways · #6 Six Ways.
Two DACH flagships, one Brazil/Nordic flagship, one daily driver. Every one of them prints, and print
is what converts.

**Wave B — the structure that only appears in bulk (4).** #3 Combs · #4 Ring · #5 Peephole · #14 Pins.
The batch thesis, shipped as a set. #14 is the marketing asset.

**Wave C — the moat (4).** #9 Two Orders · #10 Other Ten · #11 Two Numbers · #17 Cogs.
The four a CCSS-first competitor structurally cannot ship.

**Wave D — reasoning and data (4).** #7 Chute · #8 Staircase · #15 Every Pair · #16 One Stands For.

**Wave E — the long tail and the platform bet (4).** #12 Cups · #19 Rattle · #20 Missing Question ·
#18 Week by Week (last — it needs the server-side setup store, which is worth building for it).

**Three heroes for marketing:** #17 Cogs (shareable to non-teachers), #6 Six Ways (used every
morning — renewals are won on daily use, not on admiration), #1 Pyramid (culturally explosive in DACH).

---

# Standing warnings for whoever designs these

- **The noun census is nearly exhausted.** Of the twenty-one nouns in the original working titles,
  **sixteen were already another tool's identity in English** and **seven collide in four or five of
  DE/SV/DA/NO/NL as well**: *wall · box · field · ladder · line · grid · tree · key · stack · tank ·
  wheel · face · stick · mirror · row · room*. Only *cog, spinner, net, circuit, mobile* survived a
  first pass, and *mobile* and *net* each fail in at least one target language. **A colliding noun is
  a collision even when the geometry differs.**
- **Drop the "The X" pattern.** Definite articles are gendered in DE/FR/PT/IT/ES and suffixed in
  DA/SV/NO; "The Key" becomes *Der Schlüssel / A Chave / De Sleutel* and loses all crispness. Every
  native panel renames the tool anyway — plan for it.
- **Every gate spec written above is a PROPOSAL, not a proof.** Four of v4's catalog gate specs did
  not survive contact with the code. Re-derive the domain at build time, always.
- **The honest test has still not been run.** §23 set it at wave-1 close: *does anyone pay for
  DEPTH?* — the free→paid conversion on the shipped tools, and the fraction of paying sessions that
  open a **second** repertoire entry. Waves 2 and 3 were built without it. Before committing to
  twenty more repertoire-heavy instruments, run it: it is the single most important input to how many
  of these should carry a 200-item library.
