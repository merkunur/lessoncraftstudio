# Premium Tools v5 — the final twenty, rebuilt

**Ideas only. Nothing is designed here.**
#20 THE MISSING QUESTION survives from the first draft. The other nineteen are new.

---

## What went wrong the first time, and the rule that replaces it

The rejected nineteen were number pyramids, sliced arrays, sliding combs, stars round a circle, a
Galton board, gears. Mathematically elegant **objects that model mathematics**. They came out that
way because I optimised against our own §23 "ruling 5" — *if the thing the tool teaches cannot be
verified, it is not designed* — which selects for things with tidy theorems, and things with tidy
theorems are maths, not teaching.

**THE MISSING QUESTION survived because it is a TEACHING MOVE turned into apparatus.** It withholds
the question, it attacks the hardest thing to teach, and it generates the material a teacher cannot
generate. That is the DNA, and it is now the only entry criterion:

> **Each tool is a great teaching move — or a dreaded topic — turned into wordless front-of-room
> apparatus, doing the one thing the teacher physically cannot do in the moment.**

Three tests, all of which must pass:
1. **Name the teacher's sentence.** *"I can never…"* / *"It takes me all evening to…"* If you cannot
   write that sentence, it is a maths object and it dies.
2. **Name what a child DOES in the first ten seconds** — shout, point, vote, object. Six-year-olds do
   not warm up. If the answer is "consider" or "discuss", it is meta.
3. **A whiteboard and a marker must not be able to do it.**

⚠ **One doctrine has to change, and the operator has already changed it.** §23 ruling 5 kills
THE MISSING QUESTION — it is the Pin Board, which `premium-tools-v4.md:676` cut by name as *"the
largest market hole found anywhere… cut only because its gate proves the tool is honest, not that it
teaches — noticing has no ground truth."* The same file says it is **"first to reinstate if that
ruling ever relaxes."** By keeping THE MISSING QUESTION the operator relaxed it. The working
replacement: **a tool must be honest about what it knows** — not everything worth teaching has a
theorem. (MEMORY.md's own standing rule applies: *a doc is not a fact, least of all one we wrote
ourselves.*)

**And one refusal needs splitting, not scrapping.** "No verdict" exists so no child is ever marked
wrong in front of the room. It must stay. It does **not** mean the tool may never know the truth
about an artefact **it authored itself** — when the tool injects the bug, it knows where the bug is.
That distinction is what makes half this batch legal, and it costs a child nothing.

## How these were chosen

Three panels in parallel, then adjudicated:
- **A teacher panel** (Y2 teacher of 26, an instructional coach, a curriculum lead) scored 19
  candidates on *solves a real problem · makes teaching easier · makes it more effective · fun ·
  would I use it weekly*, killed seven, and proposed ten of their own.
- **A repo fence audit** across all five surfaces.
- **An evidence check** on every instructional move, specifically asking whether it holds at ages
  5-9 — because most instructional research is done on teenagers.

The evidence pass reordered everything, and it is the reason this batch is ranked the way it is.

### ⚠ The honesty ladder — three tiers, and we say which

| Tier | Moves | Wording |
|---|---|---|
| **Evidence-based at ages 5-9** | concreteness fading · retrieval + expanding intervals · spacing for generalisation · number-line magnitude → arithmetic learning · blocks↔written-method linking · explaining **another person's** reasoning | may claim an effect |
| **Research-based, evidence from older learners** | worked examples + fading · comparing two methods · erroneous examples · interleaving · self-explanation | say so explicitly |
| **Practitioner-developed** | hinge questions · low-floor-high-ceiling · information-gap · protégé effect at K-3 · productive failure | the same honest category we already use for WODB, Splat!, Esti-Mysteries, Notice-and-Wonder |

**Two numbers never to repeat:** Black & Wiliam's 0.4-0.7 for formative assessment (Kingston & Nash
put it at **0.20**), and the CRA meta-analysis Tau-BC of 0.996 as if it were a Cohen's *d*.

---

# THE NINETEEN

**T** = evidence tier. **F** = fence.

## Tier 1 · Direct causal evidence at ages 5-9, and apparatus is genuinely required (6)

### 1. THE LOCKSTEP — the written method and the blocks, welded
*Working title. `column` is #43's noun in all eleven locales.*

> *"Regrouping. I write the little 1 above the tens and I can physically see half the room decide
> that maths is a set of arbitrary marks. It is the topic I dread most in the year."*

Every mark you write moves a block, **in the same instant, in the same place**. Ten ones visibly
shatter out of a ten at the exact moment the digit is crossed out. **The invention: the two notations
are one object, and the layout is your country's** — where the carry digit goes differs across
DE/FR/NL, and a Dutch teacher whose tool writes it in the wrong place closes it forever.
**T: evidence-based, in band.** Fuson & Briars (1990, *JRME*), **grades 1-2**: blocks and numerals
recorded step for step — 6 of 8 classes (N=169) reached meaningful multi-digit addition; 3 classes
(N=75) meaningful subtraction. Brown & VanLehn's repair theory explains *why* it breaks: children hit
an impasse (canonically **a zero in the minuend**) and invent a stable, rational, wrong patch. The
bugs are not slips.
⚠ **Design constraint the evidence forces:** co-temporal and **co-located**. A split screen with a
lag re-creates the very dual-representation problem it is meant to cure — so my own "two columns"
framing was wrong.
**F: the only large virgin payload in the whole batch.** The written column algorithm exists on
**none** of the four surfaces; `REFERENCE APPS/addition.html`'s own analysis lists vertical format as
a non-capability. Subtract `place-value-regroup-core.js` (bundling alone) and A4 Carry Wheels (the
carry alone); what is left — **the lock, plus the national layout** — is unowned.

### 2. THE FADE — the manoeuvre a human hand cannot perform
> *"They can do it with the cubes. Take the cubes away and they are back to nothing. I have never
> known how to get them across that gap, and I cannot slowly dissolve a tray of Numicon."*

One control carries a problem from objects → picture → symbol **mid-solution, without stopping**, so
the child finishes symbolically without noticing they crossed.
**T: the strongest item in the batch, and the evidence is in band.** Ching & Wu (2019), **140
kindergartners**, inversion: fading beat both concrete-only and abstract-only on transfer and on the
delayed post-test. Fyfe, McNeil & Borjas (2015), **grades 2-3**, equivalence: benefited transfer, and
unusually **benefited low- and high-prior-knowledge children alike.**
⚠ **Two constraints, both non-obvious.** The material must be **perceptually BLAND** — McNeil's
*Should you show me the money?* found 5th graders made *more* errors with rich play money, and
Petersen & McNeil found richness hurts precisely when a child already has a real-world script for the
object. **No cute counting bears.** And the fade's benefit shows on **transfer and delayed** measures,
often not on immediate performance — so do not judge it, or instrument it, on in-session accuracy.
**F: partial.** `missing-part-core.js` ships banded `modelState:'countable'|'confirmOnly'|'faded'` in
the activity layer; `letter-studio` fades handwriting forward. No instrument fades. ⚠ It must be an
apparatus, not a dimmer — a bare fade with no material is the "generic slow-reveal runtime" §23.7
already refused.

### 3. THE COLD START — the thing no teacher sustains by hand
*Working title; `cold` and `start` are both taken.*

> *"I know I should go back to what we did three weeks ago. I never do, because building it means
> opening my planning and remembering, and it is 8:40 and someone is crying."*

A wordless three-minute opener built from what **this class** actually did weeks ago. No score, no
timer, no marks — the operator's ban is already the correct design.
**T: evidence-based, and it goes *below* your band.** Fritz et al. (2007), **preschoolers**:
expanding retrieval doubled recall, **d = 1.9** over elaboration. Káldi et al. (2025, *Child
Development*), **5-6 year olds**: the effect is present at preschool age. Vlach & Sandhofer (2012),
**5-7 year olds**: spaced beat massed on **generalisation**.
⚠ **The boundary condition that differs from adults:** young children need **successful** retrieval.
Káldi found a benefit only above a sufficient practice success rate — the adult "desirable
difficulty" logic does **not** port down. Expanding intervals, success-gated, back off on failure,
and the lag scaled to the age rather than inherited from an adult algorithm.
**F: partial, and it is D1 Morning Board's sibling.** It needs the server-side setup store §23
already calls *"the honest prerequisite for selling paid depth + record, and the #1 unbuilt shared
piece"* — confirmed: `api/prisma/schema.prisma` has four models and none of them holds tool state.
**The panel scored this the highest weekly use on the board. It is daily.**

### 4. WHERE DOES IT GO? — the whole class's drift, made visible
> *"'Is 71 nearer 20 or nearer 90?' gets silence. And number-line sense predicts everything
> downstream."*

An empty line, 0 at one end, 100 at the other. Numbers fly in to be placed. The true position is
revealed — and **every previous placement the class has made stays on screen**, so the room sees its
own drift: everyone crams 60-90 into the last inch.
**T: evidence-based and CAUSAL, in band.** Booth & Siegler (2008, *Child Development*), **first
graders, mean age 7.2**: presenting addends and sums as positions on a 0-100 line **improved learning
of the answers to arithmetic problems** — magnitude representation predicted arithmetic learning after
controlling for prior knowledge, short-term memory and attainment.
**F: partial.** `number-line` and `open-number-line` own the line; `track-repair-core` owns continuous
placement with an ε tolerance. The remainder is the **accumulated class record and the true-position
reveal** — placement as a whole-class instrument rather than a single child's task.

### 5. THE LONG PATH — the hour that closed a gap
> *"The children who arrive without number sense never catch up, and I have nothing that moves them
> in the time I have."*

A giant linear 1-10 path across the front of the room. Move along it, and the count is spoken from
**your current position**, not restarted from one.
**T: evidence-based, in band, and the result is extraordinary.** Ramani & Siegler: four 15-20 minute
sessions of a **linear** 1-10 numerical board game improved low-income preschoolers on magnitude
comparison, number-line estimation, counting and numeral identification, holding at **9 weeks** — and
experiment 2 **eliminated the SES gap in estimation proficiency in about an hour of play.**
⚠ **Linearity is the active ingredient — the circular board did nothing.** And the
count-on-from-where-you-are verbalisation has to be *enforced*, which is exactly what a teacher with
26 children cannot do.
**F: partial** — subtract `number-line` (the ruled instrument) and `arrow-strip` (movement by a plan).
The remainder is the enforced count-on and the linear-vs-circular contrast.

### 6. THE HAND — the one gesture that works
> *"I wave at the board and hope."*

A large, paced, spatially-anchored hand on screen models the exact movement — sweeping under each
side of an equation — and the class copies it in the air, in time.
**T: evidence-based, grades 3-4.** Cook & Goldin-Meadow: children taught mathematical equivalence
with a specific instructed hand movement learned in a way that lasted **longer**, and — the decisive
detail — **only that gesture, not other hand movements, produced success on generalisation problems.**
**F: VIRGIN.** Nothing on any surface cues a movement. Wordless by definition, physical, and every
child participates without a device. **The cheapest instrument in the batch to build and the only one
where the children move their bodies.**

## Tier 2 · The great teaching moves, with the constraints the evidence forces (6)

### 7. SOMEBODY ELSE'S WORK — *the teacher panel's #1, at 24 of 25*
> *"I want to put a wrong answer up and pull it apart, but I cannot use Amir's book — he would never
> write anything again. So I invent one at 10pm, and mine is always too obviously wrong. Real
> children's mistakes are neat and confident and look right."*

A plausible finished piece of work from a named imaginary child, with exactly **one** deliberate bug.
The class hunts it. **The invention: plausibility at volume.** Generating wrong work that survives
four minutes of argument is the hardest prep job there is, and the tool knows where the bug is
because it put it there.
**T: research-based, evidence from older learners — and it carries a real reversal.** Durkin &
Rittle-Johnson (2012), **grades 4-5**: comparing correct *and* incorrect examples beat correct-only,
including on reducing misconceptions. But **Große & Renkl: learners with NO prior knowledge learned
significantly more from correct examples only** — and a K-3 child meeting a concept for the first
time *is* that group.
⚠ **Four design constraints, non-negotiable:** correct content **first**, errors second · the error
**attributed to a named other** (Durkin & Rittle-Johnson 2016 on epistemic trust — children track who
was wrong) · the error location **highlightable** as an adaptive scaffold (it helped low-prior-
knowledge children significantly and did nothing for the rest) · the task is **detect → explain →
correct**, and it must **end on the corrected version**, never leaving the wrong one last on screen.
The panel's own design note: the imaginary child needs a **name and a face and must come back weekly**
with the same characteristic weakness. Children will adopt them. That is the product.
**F: partial.** `tildy-core.js`, `fix-it-core.js`, `mending-fences-core.js` and `numbers-court` all
show a wrong thing — **all four in the activity layer, single-child and graded. Zero of the 47
instruments do.**

### 8. THE PUPPET WHO GETS IT WRONG — the same mechanism, at five
> *"They will correct a puppet with a passion they will never spend on a worksheet."*

A character does the maths in front of the class and makes **exactly the error this class made
yesterday**. The children teach it.
**T: the protégé-effect literature is ages 10-14 and does not reach down — but there is a better
citation, and it is squarely in band.** Siegler (1995, *Cognitive Psychology*), **5-year-olds**,
number conservation, three conditions: feedback only · feedback + explain your own reasoning ·
**feedback + explain the experimenter's reasoning**. Explaining *the other party's* reasoning produced
**considerably more learning than either of the others.** That is the mechanism, at age five, and it
is the real foundation for both this and #7.
⚠ A character who is wrong too often triggers the epistemic-trust problem. And the protégé effect is
substantially a *motivation* effect — corrected trivially, you get effort without learning.
**F: partial.** ~130 activity decks carry characters; **none of the 47 instruments does.** What we do
not own is the endless supply of exactly the right error in eleven languages without TTS. Build the
error engine, not the puppet. **Split by age from #7: puppet 5-7, marked work 7-9.**

### 9. THE BOUNDARY — thirty edge cases in ninety seconds
> *"Every triangle I draw points up. Every square sits flat. Then they meet a tilted square, call it
> a diamond, and I caused it myself."*

A stream of examples and near-miss non-examples at the very edge of a concept — the triangle rotated
continuously through 360°, morphed from equilateral to needle-thin, then one with a curved side.
Thumbs up, thumbs down, at speed, out loud.
**T: mixed, and worth stating precisely.** Variation theory itself has **no defensible effect size** —
do not attach one. The citable part is Gersten et al. (2009, *RER*), a meta-analysis of 42 RCT/QED
maths interventions that coded *"attention to the range and sequence of examples"* as a component with
a significant mean effect. The misconception is documented in band: Clements, Swaminathan, Hannibal &
Sarama (1999, *JRME*), **3-6 year olds** — children identify shapes by resemblance to a prototype (a
triangle is "a roof") and reject tilted, obtuse and flipped figures.
⚠ **The failure mode is the tool itself:** an unbalanced example set **manufactures** the prototype.
Vary one irrelevant attribute at a time against an invariant background, and make the non-examples
*near* misses — a triangle against a circle teaches nothing.
**F: partial.** `curate-wing-core.js` is this for shapes, explicitly naming the diamond misconception —
but as a graded single-child activity. The evidence check calls this *"the single move where the
apparatus advantage is largest."* Generalise off shapes: is 0 even, is that a half, is 11 a teen.

### 10. TWO WAYS AT ONCE — the inside of two heads
> *"Mia counts on from three every single time and it is killing her. I say 'try bridging through ten'
> and she nods and carries on, because she has never seen what that looks like. And I have one mouth."*

One problem, two methods, running **simultaneously and slowly**, side by side. Not a race — *"they both
get there. Look how differently."*
**T: research-based, from older learners, with a hard prerequisite.** Rittle-Johnson, Star & Durkin
(2009): students who had **not** attempted a strategy at pretest learned **more from sequential study
than from comparison** — novices were "overwhelmed." The moderator was **prior knowledge of one of the
specific methods shown, not general attainment**, so it cannot be gated on high attainers.
⚠ Therefore: this is a **consolidation** instrument, never an introduction. Both methods simultaneously
visible (sequential presentation destroys the effect), same problem, explicit *what is the same / what
is different* prompts. Slowing the pace is the documented remedy for novices, and it is expensive.
**F: partial, and pick a different content anchor.** §23.7 records make-ten as *"the densest square
inch on the platform"* and `ten-frame` refusal 17 bans a bridging animation outright. The comparison
mechanic is unowned; the make-ten example is not.

### 11. THE VANISHING EXAMPLE — the scaffold retreats
> *"I model one, then I set thirty, and the drop between them is a cliff."*

A fully worked example; then the same kind with the last step blank; then the last two.
**T: research-based, from older learners — the mechanism is a novice mechanism, so extrapolation is
reasonable, but say so.** The design finding that matters is Renkl, Atkinson & Große (2004): *which*
step is faded barely matters, but **learners learn most about the principle that was faded.** So
**fading is a targeting mechanism, not a difficulty slider** — fade the step you want learned.
⚠ Expertise reversal is happening **inside one class at one moment**: the same worked step helps one
child and loads another. And a K-3 child cannot read a multi-step written solution, so the example
must be **enacted or animated, never printed**.
**F: virgin, but a dependent of #1** — the platform has no written multi-step method to fade yet.
⚠ The panel's verdict: *"this is the dullest thing we are still keeping — a worksheet on a wall."*
Ship it only with a costume: the steps physically lift off and fly away, and the class shouts the
missing one back.

### 12. THE MISSING QUESTION — kept
A wordless situation plays and freezes: five birds on a wire, two lifting off. **No question appears.**
The class argues about what this picture can be asked, finds it can be asked several things, and only
then writes a number sentence.
**T: practitioner-developed** (Notice-and-Wonder / numberless word problems have no efficacy study —
say so). **F: it is the Pin Board, cut by ruling 5 and reinstated by the operator's own choice.**
⚠ The panel's one addition: **the questions the class generated must survive the lesson**, or it
evaporates. That capture is the print hook and the subscription.

## Tier 3 · Dreaded topics, where the apparatus is the whole point (7)

### 13. THE STORY THAT MATCHES — where word problems actually break
> *"They can compute it and then meet it in a story and go blank. And 'how many more' — half my class
> thinks that is addition, forever."*
`12 − 5` sits still while **three wordless ten-second films** play. Only one of them is that sentence:
one is take-away, one is difference, one is a distractor. I cannot animate three situations.
**F: partial** — `ten-frame.solve-the-story` and `vet-diagnosis` present word problems; nothing makes a
sentence compete for its meaning. **#12's sibling, and probably the second-strongest idea in Tier 3.**

### 14. THE HIDDEN CHANGE — the problems nobody sets
> *"I never set change-unknown problems because writing them is a nightmare, so my class thinks maths
> always runs left to right."*
Five things. A screen comes down. Something happens behind it. Nine things. **What happened in the
dark?** Detective energy, ages 5 to 9 by changing the numbers.
**F: partial** — `lids` and `part-whole-frame` hide *quantities*; nothing hides an **action**.

### 15. THAT'S NOT FAIR! — outrage as an engine
> *"Every half I have ever drawn was a fair half, so my class believes 'half' means 'one of two
> pieces'."*
The cake is cut into two wildly unequal pieces and the screen calmly labels the small one ½. A room of
six-year-olds loses its mind — which is the loudest, cheapest and most reliable engagement mechanism
in primary school, aimed at the exact misconception. Extends to thirds, quarters, and *halves need not
be the same shape*.
**F: partial** — `fraction-kitchen` owns cutting and sharing and treats an off-centre cut as physics
rather than a verdict. The remainder is the **deadpan false label**, which is a different move.

### 16. THE HOUR HAND ALONE — remove the other hand
> *"They can read 3:47 and have no idea it is nearly four. We taught the minute hand first, and I
> cannot take a hand off the classroom clock."*
A clock with **the minute hand removed**. Roughly what time is it? Then the day runs alongside — light,
dark, breakfast, playtime.
**F: possibly a `learning-clock` mode rather than a tool** — but the teaching point is genuinely
different (the hour hand carries nearly all the information) and time is the topic teachers name as
their most dreaded after regrouping. Tiny idea, real effect.

### 17. THE SCATTER — make counting in ones fail honestly
> *"Nayla will count 24 counters in ones, every time, forever, and she is not going to stop while
> counting in ones still works."*
Objects appear scattered and **drifting** — too many and too mobile to count one at a time. The only
way through is to group. You cannot make counters move on a table.
**F: partial, adjacent to the unbuilt A3 Counting Tray** (scoop a heap into containers). A3's payload
is regrouping; this one's is *making the old method fail without an adult saying so*. Subtract and ship
the remainder, or fold it into A3.

### 18. THE SLOW REVEAL — permission to change your mind
> *"Their first guess is a hill they die on. I cannot teach 'revise your estimate' because I have no
> way to feed evidence in slowly — I cover things with a sheet of paper, badly."*
A picture uncovers gradually, and the class shouts an estimate at every stage **and is allowed to
change it**. The revision is the payload, not the reveal.
**T: careful.** Computational-estimation teaching is thin — four decades of reviews calling their own
field unsatisfactory, and one finding that practice alone ≈ practice plus instruction. The strong
evidence is in **magnitude** estimation, which is #4. Pitch this on the revision habit, not on accuracy.
**F: partial** — `estimation-jar` owns the committed prior and the no-ranking doctrine; §23.7 refuses a
generic slow-reveal runtime. **The permission to revise is the only defensible remainder.**

### 19. THE SHRINKING TABLE — the mountain that collapses
> *"They look at the hundred facts and their faces close before we start."*
The whole times-table grid, and the class crosses off what it already knows: ×1, ×10, ×2, ×5 — then
the commutative twins fold away — until about twenty genuinely hard facts remain.
**F: mechanic virgin** (no table square anywhere on four surfaces) **but the noun is dead in nine of
eleven locales** — de `Tafel` / nl `tafel` / sv `tavla` / da-no `tavle` are the blackboard noun already
owned by five tools, nl `de tafels` *are* the times tables, and es `tabla` / fr `table de
multiplication` / it `tavola pitagorica` / pt `tabuada` all collide.
⚠ Keep the crossing-off **per session and anonymous** — "what we already know", persisted, is a record
of class attainment and collides with the no-record doctrine. Panel's honest note: *a magnificent
lesson, used twice a year.* Ranked last for that reason, not for quality.

---

# Cut, with the reason — so none of these comes back

| Idea | Why it died |
|---|---|
| **THE FORK** (hinge question — one item, four responses, each wrong one naming a misconception) | The teacher panel loved it (23/25); the evidence killed it. **No controlled trial of hinge questions exists.** The parent construct is overclaimed 3× (Kingston & Nash: **0.20**, not 0.4-0.7), the EEF's learner-response-system RCT found **no impact on attainment**, there is **zero K-3 evidence**, and a five-year-old cannot read four written options. Our own doctrine also forbids telling a teacher what the class believes (`heart-words.js:1526` — *"the same reasoning that forbids telling a child he is right forbids telling a teacher the split is right"*). |
| **THREE DOORS** (one picture, three depths) | Commercially the most obvious thing on the list and **there is no efficacy evidence for low-floor-high-ceiling at all** — every source is a blog or a publisher. The panel's verdict is also right: it is **a dial that belongs on every tool**, not one icon among 47. Ship it as a dial. |
| **THE STUBBORN MACHINE** (the class's rule obeyed until a counterexample kills it) | **Productive failure is contraindicated at 5-9.** Kapur: it "requires a certain amount of prior knowledge"; Loibl & Rummel: the benefit "does not usually transfer to students younger than the typical age group." The panel called it an epistemology lesson, not a Tuesday. |
| **TWO HALVES** (each partner sees half; neither can answer alone) | Structurally broken — **one projector cannot show two children different things**, and two at the board means twenty-four spectators. Evidence is absent in primary maths (the construct is from language teaching; EEF Dialogic Teaching gave **maths its smallest gain, +1 month**). Alive only as a printed half, which is the paid tier. |
| **IS THAT SENSIBLE?** | I can write "8 + 7 = 52" on the board in four seconds. **No prep is removed.** Fold into #7 as an answer-only mode. |
| **THE ANSWER FIRST** ("it's 12 — what was the question?") | Four words on a whiteboard, zero prep, and the "checks 26 attempts instantly" claim **does not survive contact with a room that has no pupil devices**. The rescue — *map what nobody tried*, so the gaps glow — belongs to #12. |
| **THE FREEZE FRAME** | A specification, not an apparatus. Every animated tool should already stop before the payoff. Also owned: the unbuilt A4's withhold is literally *"what the tens wheel is about to do."* |
| **ONE THING CHANGED** (variation chains) | The name is the diagnosis — an idea *about* teaching; children experience nothing. It is **the engine underneath #9**, not a shelf item. |
| **BOTH OF THEM ARE RIGHT** | For six-year-olds this produces a room that now believes maths has no answers, and it needs language the screen is not allowed to have. Its one good idea (two people measured the same table and got 3 and 47) is **already shipped as `unit-handle` #40**. |
| **THE SPLAT** (`8 + ? = 12`, blobs covering a known total) | The teacher panel's top new idea — and **occupied three ways**: `part-whole-frame` ships three cloths free, `rekenrek` owns *"How many are hiding?"* by name, and v4's Splat Mat already shipped as **`#39 The Lids`**. |
| **THE WRONG RULER** (paperclips 47, hands 9, boot 3) | **Shipped as `#40 unit-handle`** — *"Stretch the unit on one tape and its number climbs while the object has not moved."* Same thesis, already live. |
| **THE CHAMELEON NUMBER / SIX WAYS** (six linked representations) | The teacher panel proposed it independently, which is a real signal — but the operator rejected it in the last batch. Not re-proposed. |

---

# What this batch needs that does not exist yet

- **The server-side setup store.** #3 and #12's capture both need it; `api/prisma/schema.prisma` has
  four models and none holds tool state, so today's "saved setups" are `localStorage` — per browser,
  wiped by a cache clear. §23 already names this the **#1 unbuilt shared piece** and calls it *"the
  honest prerequisite for selling paid depth + record."* **Build it for #3.**
- **A misconception library per topic** — the shared asset under #7, #8 and #9, and the thing that
  makes all three machine-generable rather than hand-authored. This is the batch's real moat: it is
  the same shape as `learning-clock`'s 11-locale idiom engine, and it is what the subscription sells.
- **Names.** Sixteen of the nouns above are already another tool's identity in English, and `table`,
  `frame`, `column`, `question`, `half`, `start`, `chain` and `work` collide in four or five of
  DE/SV/DA/NO/NL as well. All titles here are working titles; expect every native panel to rename.

# Recommended order

**First four — prove the batch.** #1 THE LOCKSTEP (the dreaded topic, the only large virgin payload,
the best in-band evidence) · #7 SOMEBODY ELSE'S WORK (the panel's highest score) · #2 THE FADE (the
strongest evidence) · #13 THE STORY THAT MATCHES (#12's sibling, and #12 is what the operator kept).

**Then:** #8 puppet · #3 cold start *(build the store with it)* · #4 where does it go · #14 hidden
change · #9 boundary · #15 that's not fair · #6 the hand · #10 two ways · #5 long path · #16 hour hand
· #17 scatter · #18 slow reveal · #11 vanishing example · #19 shrinking table.

**The two loudest, for marketing:** #8 the puppet getting it wrong, and #7 catching another child's
mistake. The teacher panel was blunt that these are the only two that will make a class of six-year-
olds shout at the screen — everything else is quieter than it looks on paper.
