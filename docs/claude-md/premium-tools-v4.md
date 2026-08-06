# Premium Tools v4 — the twenty language-light instruments

**Companion to CLAUDE.md §23.** §23 carries the forward-rules and the resume trigger; this file
carries the catalog itself, the fence, the closed strands, the rejected list and the per-tool
build recipe. **Relocated here 2026-07-31 from an out-of-tree, session-named plan file**, which
plan mode overwrites — the approved twenty was one keystroke from being lost. This file is
git-tracked on purpose.

Working record: `[[project_premium_tools_v4_catalog]]` · `[[project_arrow_strip_tool]]` ·
`[[feedback_next_tool_build_recipe]]`.

> ⭐ **If you got here from "build the next tool"** — that phrase means this program and nothing
> else (not the German activity fan-out, which is a paused backlog per CLAUDE.md §20.9; not the
> games program, which is cancelled forever). **The catalog is approved: do not re-research or
> re-design it.** Read the entry for the next tool below, run the four-surface fence, then build
> to the recipe at the end of this file.
> **STATE: `#36 The Number Sieve` · `#37 The Arrow Strip` · `#38 The Draw Bag` ·
> `#39 The Lids` — ALL LIVE. **WAVE 1 IS CLOSED.** `#40 The Unit Handle` (B3) ·
> `#41 All the Way Round` (B4) · `#42 The Planks` (A5) · `#43 Upright and Flat`
> (B7) — ALL LIVE. **WAVE 2 IS CLOSED.** → **NEXT = wave 3, `B2 Build Plan`.**
> Constants for the next build: header ordinal **#44** · `PREV = 'cold-line'` ·
> `TOOL_WRAPPER_VERSION` **7.56 → 7.57** · `TOOL_KEYS` position **47**.

---

## Where v4 came from

Third attempt at a 20-tool catalog. **v2** (2026-07) was generated from teacher pain points and
was rejected — the durable diagnosis being that the five gold tools are not pain-point tools, they
are **curriculum instruments**: the apparatus a teacher stands at the front and teaches *from*, in
a named routine, repeatedly, all year. **v3** (2026-07-30) fixed that, produced the six-gate test,
and shipped six tools (Sorting Hoops · Number Balance · Pattern Bench · Reading Easel · Class Graph
· The Folding Sheet) — but **11 of its 20 were literacy**, and language-teaching tools are now
ruled out entirely. The v3 backlog is holed and superseded; **v3's six-gate test, its build logs,
its market facts and all its lessons remain live.**

## The four operator rulings that define v4

| | Ruling |
|---|---|
| **Scope** | **Clean-sheet replacement.** Unbuilt v3 entries are dead unless a v4 tool independently earns the slot. ⚠ This kills **L2 Asking Bench** (was in progress) and every grammar-based v3 entry. |
| **Subject** | **No language-teaching tools of any kind** — not grammar, not phonics, not syllables, not vocabulary. Maths · measurement · geometry · data · time · money · spatial · science ONLY. |
| **Reach** | **Language-light universal.** Each tool works identically in all 11 languages with almost no authored language. |
| **Money** | **Free apparatus, paid depth + record.** The instrument and the routine work free forever; the curated repertoire, saved setups and print are the subscription. |
| **Rigor** | *(standing)* **If the thing the tool teaches cannot be verified, it is not designed.** Every claim a tool makes must be a theorem a gate can prove. |

## ⭐ The consequence: the moat had to move

Rulings 2+3 together **remove** the v3 thesis (*"build the instruments that cannot be translated
into existence"*). A language-light maths tool is cloneable in a week. There are exactly three
places the moat can go, and all three are available:

1. **THE ROUTINE.** The world's best K-3 routines are beloved, free, world-class — **and rotting
   inside presentation software.** Splat!'s reveal *literally does not work* in Google Slides (the
   author hand-patched 40 lessons); Esti-Mysteries ship an animation-failure FAQ; Math Visuals
   still links Jamboards, dead since Oct 2024; **wodb.ca is a parked domain**; Counting Collections
   has no digital tooling at all. Wyborney alone has 50,000+ subscribers. **Nobody has built the
   native runtime.** That is a vacant category, not a feature gap.
2. **THE REPERTOIRE.** The measured gap on our own shipped tools is content depth, not tool count
   — `wodb` ships 21 grids against wodb.ca's hundreds; `estimation-jar` ships 11 sets against
   Wyborney's 170/year. A curated, **verified** repertoire is both the moat and the paid layer.
   They are the same asset, so **shipping the twenty IS the depth pass** — depth is the
   deliverable, not a follow-up commission.
   ⚠ **200+ per instrument, not wodb's 21.** A language-light catalog with wodb-sized repertoires
   has no moat at all.
3. **CORRECT-BY-CONSTRUCTION.** Amplify productised exactly one routine (WODB on Polypad) and did
   it with a **random generator, which cannot guarantee a valid WODB**. A provably-valid repertoire
   is a thing a competitor cannot ship quickly, because **the proof is the work**.

> **v4 thesis — the instrument is free, the repertoire is the product, and the proof is the moat.**

**Empirical, from the two shipped tools:** `wodb-grids.json` is **84,734 bytes for 21 grids**
because every grid carries an 11-locale title and four 11-locale reasons — which is precisely why
that library is stuck at 21. `number-sieve-boards.json` is **31,607 bytes for 60 boards** and
`arrow-strip-mats.json` **3,120 bytes for 36 mats**, because **neither carries a single authored
word in any locale**. Validity is arithmetic, so both libraries are machine-growable and
machine-provable.

## ⭐ The design law v4 adds: NO WORDS ON THE APPARATUS

The six v3 gates stand unchanged (apparatus · named repeated routine · visible abstraction · the
material pushes back · **manufactures a conversation** · whitespace). v4 adds one law:

> **The stage carries numerals, icons and the material — nothing else.** Authored language is
> chrome (title, settings, the paid chip), never content. **A child who cannot read must be able
> to use every tool in this catalog at full depth.**

Three independent forces converge on it, which is why it is a law and not a preference:

1. **Ruling 3.** 11 locales × 20 tools is 220 authoring passes if the stage carries language, and
   every one is a place for a native panel to find a false friend. Wordless collapses the fan-out
   cost to chrome.
2. ⚠ **A measured fact about our own audio.** `LCSAudio` **never calls `getVoices()`**, and a
   missing voice is **silently substituted** — Finnish read with German phonology. TTS is reliably
   present only in en/de/es/fr/it, so **six of eleven locales get silence.** No v4 tool may depend
   on hearing. Sound may confirm; it may never carry.
3. **It is better pedagogy anyway** for 5-to-9-year-olds, many of them pre-readers or second-
   language learners — an unclaimed default across every competitor (Kahoot and Gimkit bolt
   read-aloud on, and teachers mute it).

**Acceptance test: the tool must be legible with the sound off.** Mechanised as a gate: zero
`<text>` nodes in stage SVG other than numerals and unit marks.

## The fence — four surfaces, and the standard that was wrong

**K-2 CCSS is nearly saturated on this platform**, and tools are free-play — no `tasks`/`nextTask`
→ no `educationalAlignment` → **no code collision is even possible.** So *"no activity claims this
code"* is the **wrong test** and would pass almost nothing.

**The fence is on the MECHANIC and the VERB.** Every candidate is checked against all four:

| # | Surface | Size |
|---|---|---|
| 1 | live tools — `mini tools/*.js` | 38+ |
| 2 | activities — `mini tools/*-activities.json` | ~204 rows / 133 engines |
| 3 | printable types — `scripts/worksheet-gen/types/{k,g1,g2,g3}/` | **240** ⚠ a separate catalog three consecutive fences missed |
| 4 | worksheet generators — `REFERENCE APPS/` | 33 |

> ⭐ **When the fence comes back partially occupied, do not negotiate the overlap — subtract it and
> ship only the remainder.** Class Graph became better than its own catalog entry this way: the
> fence cut it to two defensible parts and the remainder was smaller and stronger than the plan.

## What "verifiable" means here

Ruling 5 is the sharpest constraint and is what will make this catalog hard to copy. The house
standard is exhaustive proof, not sampling:

- `folding-sheet` proves symmetry ⟺ zero unmatched squares over **all 524,288 states** at n=4.
- `number-balance` proves level-iff-equal over **3,721 pairs**.
- `sorting-hoops` evaluates `satisfies()` over **76,235 (rule × item) pairs**.
- `fraction-kitchen` proves every correct cut set **equal-area by point-sampling**.
- `pattern-bench` proves the letter sequence is **identical across all three costumes**.
- `number-sieve` proves order-invariance, minimality and uniqueness with **zero corpus** — ground
  truth is arithmetic over 1..N.
- `arrow-strip` proves the kinematics over **786,240 exhaustive runs**, ground truth being the
  gate's *own* implementation.

**Every tool must name the invariant its `verify-<tool>.js` proves and the domain it proves it
over, and the mutation harness must kill every mutation. A tool whose central claim cannot be
stated as a theorem is not designed.**

Two traps already paid for, carried in as standing rules:
- **An identity claim must first prove there was something there to be identical.** Pattern Bench's
  entire thesis passed on an empty row because `'' === '' === ''`.
- **An IFF that is almost always false is vacuous.** Folding Sheet's ghost invariant sailed past a
  mutation because a disagreement is nearly always present on a random corpus.

## ⭐ The correctness pattern this catalog leans on

**The hidden-real-destination trick — let the LAYOUT answer instead of computing.** Every instance
so far measures **0.00px**:

- `class-graph` — the bar is real DOM at `position:absolute;inset:0` inside the *same wrapper* as
  the stamps; the stamps are never removed, only faded. **The bar IS the pile.**
- `folding-sheet` — the flap is a real copy of the far half reflected by **one CSS matrix** about
  the crease, so where it lands is the layout's own answer.
- `arrow-strip` — the beetle's-eye view is **the same mat DOM under one `rotate()`**, with the
  beetle rendered outside the rotating layer.
- `place-value-lab:2298` — `.pvl-incoming { visibility:hidden }`.

Wherever a v4 tool makes a claim that could drift from what is on screen, it uses this pattern
rather than arithmetic.

## The paid mechanism already exists — do not invent a new one

`estimation-jar-sets.json` carries `freeMax` / `premiumMax` and a per-record `free:true`, and its
own header records the shape: *"Locale-NEUTRAL. The jar shows pictures and the ritual counts them,
so no per-locale word bank exists."* Each v4 tool ships `mini tools/<tool>-sets.json` in that shape.
Two disciplines apply:

- **Capacity caps that break a live lesson are the most-resented gate**; persistence-based gating is
  the least-resented. **Nothing may fail mid-lesson.**
- ⚠ **Never gate the first affordance.** Class Graph opened on three categories with a
  three-category cap, so the very first control a signed-out teacher touched was locked on arrival.
- ⚠ **The offline fallback must degrade to the FREE TIER, not to nothing.** `arrow-strip` shipped an
  empty fallback, which made the Mat Book chip a dead control for a subscriber the moment the file
  404'd. Carry every free record inline, and no paid one.

---

# THE TWENTY

| # | Tool | The apparatus in one line | The withhold that makes the talk |
|---|---|---|---|
| **A1** | **The Number Sieve** ✅ #36 | a grid of every number; sealed clue cards darken what they exclude | the clue is *enacted, never stated* — read the rule off what died |
| **A2** | **Splat Mat** | opaque blobs over a counted set; same-colour blobs hide the same number | the count under the blob, and what the *other* blob must do |
| **A3** | **Counting Tray** | scoop a heap into containers; a picture record, never a number | the tool never utters the total, and the old grouping stays beside the new |
| **A4** | **Carry Wheels** | geared ones/tens/hundreds wheels you can turn slowly and backwards | what the tens wheel is *about to* do |
| **A5** | **Comparison Tape** | two stretchable bars; the gap between them detaches as a third bar | whose bar the difference belongs to |
| **A6** | **The Grouping Dial** | one handle sweeps a number through every group size | which numbers come out even, and which stubbornly never do |
| **A7** | **The Hundred Field** | paint numbers, then change the grid's width and watch the paint travel | why the same numbers make a different shape |
| **B1** | **The Arrow Strip** ✅ #37 | wordless arrow cards build a plan; one tap runs it and draws a trail | which single card to change — and whose left ↺ means |
| **B2** | **The Build Plan** | a numeral plan and an iso building, one state edited from either end | whether two different plans can look identical from the front |
| **B3** | **The Unit Handle** | two tapes under one object, each with a unit you can grow | why a smaller unit makes a bigger number when nothing moved |
| **B4** | **The Unrolling Tape** | a tape wraps a curve, then peels off and lies down straight | *around* or *tall* — committed before the peel |
| **B5** | **The Reshape** | cut a shape and rearrange it; area is welded on, perimeter is not | which of the two numerals they are allowed to trust |
| **B6** | **The Hinge** | two stretchable arms and a wedge; wedges stack around the turn | whether long arms make a bigger angle |
| **B7** | **The Cold Line** | a thermometer you can tip until it becomes a number line through zero | whether −5 to 3 is a bigger jump than 10 to 18 |
| **C1** | **The Draw Bag** ⬅ **NEXT** | an unseen bag drawn from onto a permanent strip — twice | how sure we are what is inside |
| **C2** | **The Shadow Yard** | drag the sun; plant a flag where you think the shadow will land | where the shadow will be at lunchtime |
| **C3** | **The Glass Graph** | a finished graph whose panes slide out and back in any order | which question it can still answer with a pane missing |
| **C4** | **The Splitting Key** | six questions split a heap into a tree; heap size is the feedback | which question to ask first |
| **C5** | **The Ramp** | tilt, release, and every marker records its own setup | which two runs they are allowed to compare |
| **D1** | **The Morning Board** | today's five minutes, sequenced across the instruments | *(not an instrument — the thing that makes the other nineteen a habit)* |

## A · Number, quantity and operations (7)

### A1 · The Number Sieve — ✅ SHIPPED as tool #36
A grid of every number in range, all alight. Tap a **sealed** clue card and it never *says*
anything — it **acts**. **THE INVENTION: the clue is enacted, never stated**, so the class reads
the rule off the *pattern of what died*. Second invention: **scramble the clue order and the
survivors are byte-identical.** Third: the marker is **committed** before clue 1, so the material
evicts it and nobody judges. Six wordless clue families: `range · parity · multiple · digit ·
quantity · nearer`. Fields 1-20 (default; fits 320px) / 1-100 / 1-120. **FREE** the whole apparatus
+ all six families + all three fields + the builder + 8 starter boards; **PAID** the library (60 →
~300), saving, print. **No ISO-week rotation** — that is `wodb`'s signature and is deliberately not
duplicated.

### A2 · Splat Mat — ✅ BUILT as **`#39 The Lids`** (2026-08-01)

> **⚠ THE FENCE SUBTRACTED TWO OF THIS ENTRY'S THREE CLAIMS, and the tool was rebuilt on the
> remainder — read `mini tools/lids.js`'s header, not the paragraph below, for what shipped.**
> DEAD: *"the covered objects leave the DOM"* is written house doctrine twice over
> (`number-balance.js:437`, `part-whole-frame.js:517`) — table stakes, honoured, never sold.
> DEAD: *"cover part of a known total and ask what is under it"* is owned four ways
> (`part-whole-frame` ships THREE cloths free; `number-balance` has the literal string;
> `rekenrek` owns "How many are hiding?" BY NAME plus an authored round; `number-talk-easel`
> owns flash-hide-reveal over this exact canvas). ALIVE and uncontested: **THE VALUE LOCK.**
> So the question became *"what ONE number fits under ALL of them?"* — equal groups with a
> remainder, not a missing addend.
> **⚠ THE GATE SPEC BELOW WAS WRONG.** "~2,300 configurations" is not the generable number;
> the domain is **940** (x≥1) / 1,060 (x≥0), computed. Second catalog gate spec to be off after
> the arrow-strip inverse claim — **re-derive at build time, always.**
> **⚠ DEVIATION FROM THE APPROVED PLAN, stated not buried:** the plan sold PAID as *a second and
> third lid colour* (two simultaneous locks). Implementing it showed multi-colour needs a real
> balanced-allocation solver — greedy by placement order degenerates, the first colour eats
> everything — so **v1 ships ONE colour** and paid is totals to 30 + the 76-setup table book +
> saved + print. The second colour remains a legitimate future increment, not a dropped feature.
> **⚠ A6 The Grouping Dial (wave 4) must fence THIS tool by name when it is built:** they are
> inverses — A6 sets the group SIZE and shows the structure; The Lids sets the NUMBER of groups
> and hides the size.

Original entry, kept for the record:

A total above a scattered set. Drag an opaque blob over some dots; they **leave the DOM**. Drop a
**second blob of the same colour** and the two re-slurp until they hide the *same* number.
**THE INVENTION:** same-coloured blobs are value-locked, so `total = visible + k·x` is enforced by
motion. A paper splat is static ink; a slide splat is a pasted PNG at a fixed z-order that cannot
re-negotiate with a peer. **Gate:** exhaustive over N ∈ 1..30 × k ∈ 1..4 × every valid x (~2,300
configurations) — the hidden count unreachable before reveal, covered dots *removed* not made
transparent, every same-colour group equal in cardinality.
⚠ **Risk:** Splat! is a named brand with a living author. Different name, different apparatus
geometry, and never the word.

### A3 · Counting Tray
A heap spills onto a mat. Drag an empty container *over* the heap and it scoops what is under it.
A record strip draws what you made — as **pictures, never a number**. **THE INVENTION — recount:**
one tap spills the collection back and the previous grouping stays as a ghost record, so two
*different* groupings of the *same* objects are on screen at once. **The tool never utters the
total.** **Gate:** over N ∈ 1..120 × every scoop opcode, the **multiset of token IDs is
byte-identical before and after every regroup** — identity conservation, not a recomputed sum.
⚠ **The research caution lands squarely here:** *do not build virtual counting — a click either
registers or doesn't, a finger can double-count, and that 1:1-correspondence failure IS the
diagnostic.* A3 survives only because its payload is the **regrouping**. **The header and
refuse-list must say A3 does not replace the physical collection.**

### A4 · Carry Wheels
Two or three geared wheels. At 9→0 a visible tooth catches the tens wheel; at 99→100 two teeth fire
in sequence. **THE INVENTION:** you can turn the wheel *slowly* and *backwards* and watch the carry
**mid-engagement** — 29 hanging on the edge of 30. Real odometers snap; paper and slides show only
before and after. **Gate:** all 1,000 values × {±1, ±10, ±100} = 6,000 transitions; the carry fires
**iff** the higher digit actually changed; every intermediate frame shows one of the two endpoint
digits and never a third. **PAID** the hundreds wheel, borrow, and **the boundary preset shelf** —
where the localisation moat survives as *apparatus* rather than words (German *Zahlendreher* at
29→30, French 69→70, Danish 49→50).

### A5 · Comparison Tape
Two stretchable bars; where the longer overhangs, a bracket appears — drag it **downwards** and it
detaches as a third bar. **THE INVENTION:** the difference can be picked up and carried away as an
object. **Gate:** all ordered pairs in 1..40² (1,600) — rendered length ratio equals a/b at
**0.00px**, because the difference bar *is a real DOM copy of the overhang region*; detach/re-attach
is an identity round-trip. *Why it is here:* the bar model / *rekenstrook* / *Balkenmodell* is a
daily European recording routine and a **method rather than a standard**, so every US-built suite
skipped it — the same slot shape that produced Pattern Bench.

### A6 · The Grouping Dial
N objects and one handle that sets *how many in each group*. Whatever will not fill a group stays
loose at the bottom, always visible. **THE INVENTION:** the handle is continuous across the whole
range, so one number's entire factor structure is a single sweep. They start hunting the stubborn
ones, without the word "prime". **Gate:** N ∈ 1..100 × g ∈ 1..N (5,050 states) — `groups·g +
leftover = N` with `0 ≤ leftover < g`, and the rendered rows are **the same DOM nodes re-parented,
never re-created**.
⚠ **Risk:** the fence against the shipped `array.*` activities will be litigated. If it reads as
"array builder with a slider" it dies.

### A7 · The Hundred Field
A filled 1-100 grid. Paint some cells, then drag the width handle 10 → 9 → 7 → 5 and the painted
numbers **keep their paint** while the grid reflows underneath them. **THE INVENTION:** paint is a
property of the **number**, not the cell. Multiples of 9 are a diagonal at width 10 and a vertical
column at width 9. **Gate:** widths 3..12 × all 100 numbers (10,000 placements) — the painted
*number* set survives every reflow byte-identically; cell n sits at `(⌊(n−1)/w⌋, (n−1) mod w)`.
⚠ **The tightest fence in the catalog.** `choral-counting` already ships a Columns chip and a
digit tint, **but changing its width calls `_resetCount` and wipes the grid**, so it can never
reflow a filled chart. This tool must carry no inking, no counting-aloud, no tinting and no preset
shelf — those belong to choral-counting.

## B · Space, shape, measurement and movement (7)

> **Two strands came back CLOSED and no tool is proposed in either — see "Closed strands" below.**

### B1 · The Arrow Strip — ✅ SHIPPED as tool #37
Wordless cards (forward, back, quarter-turn each way) drop into an inert rail; the class predicts;
one tap runs it and the beetle draws its trail. **THE THESIS: two of the four cards move the beetle
nowhere and rewrite what every card after them means.** Inventions: build-then-run separated in
time · the previous run persists as a **ghost** · the **beetle's-eye toggle** rotates the mat under
a fixed beetle. Full record → `[[project_arrow_strip_tool]]`.
⚠ **The catalog's own gate spec for this tool was WRONG and was caught before code:** it claimed
every rail's formal inverse returns the beetle home over all 409,600 runs. False the moment a move
is blocked. Split into inverse-over-non-blocking-runs + **edge honesty** as its own invariant.
**A catalog gate spec is a proposal, not a proof — re-derive it at build time.**

### B2 · The Build Plan
A base grid; on the left a **plan** (one numeral per cell = how many cubes tall), on the right the
isometric building. **THE INVENTION:** plan and building are **one state edited from either end**,
plus a live front/side silhouette panel. **Gate:** all 5⁹ = **1,953,125 buildings** — plan↔building
is a bijection; the three projections match column heights measured off the *rendered* silhouette;
rotation is a group; and — the one that matters — **ambiguity is enumerated exhaustively, so the
discussion the tool manufactures is provably not fake.**
*Why it is here:* *Bauen nach Bauplan* is a weekly K-2 staple across DE/NL/AT/CH and the Nordics
with published card sets in every Grundschule cupboard, and **CCSS codes none of it below 5.MD.C**.
⚠ Header must state the commodity line: a Bauplan is **not** "3-D solids and nets" — it names no
solid and unfolds nothing. It is a plan/elevation *notation*.

### B3 · The Unit Handle — ✅ **BUILT + LIVE as `#40 unit-handle` (2026-08-01, `8af5e1c2` + `b6e13a1f`)**
One object; two tapes beneath it, each built from repeated identical unit tiles, each with **a
single handle that changes the size of its unit**, continuously. The object never changes.
**THE INVENTION:** the unit itself is the draggable thing and both counts are live at once — push
the top unit smaller and its numeral climbs while the bottom sits still. You cannot own a ruler
whose centimetre grows.

**AS SHIPPED, vs the spec above:**
- **It opens on two DIFFERENT units** (`uA:160, uB:100`), so one object carries two numbers in the
  first frame and the question is posed before anyone touches anything. "Same unit on both" is the
  button that collapses them. (The gate initially asserted the opposite, from the howToUse copy.)
- **The gate spec did not survive contact — the fourth time in this catalog.** "every unit size
  1…1000 … 499,500 pairs" is arithmetically right and pedagogically impossible: at `u=1` the tape
  carries **1000 tiles**. The real domain is bounded by LEGIBILITY —
  `u ∈ [ceil(L/MAX_COUNT), floor(L/MIN_COUNT)]`, `MIN_COUNT=2`, `U_MIN=50` **measured** (raised from
  45 when the smallest tile rendered 32.3px against the 34px desktop floor). True figures, printed
  by the gate: **2,212 unit settings, 231,300 monotone pairs.**
- **Monotonicity is NON-STRICT.** `floor(L/u)` is non-*increasing*; for most adjacent pairs it is
  equal. Asserting a strict decrease fails on a correct tool. Asserted non-increasing **plus
  "it decreases somewhere"** so the law cannot be vacuous.
- **V4 tested INVARIANCE but not CORRECTNESS**, so "the object hangs off the wrong edge" survived
  mutation. **V4b** applies the placement affine to the trim corners (0.0000px).

**Fence — re-run fresh on all four surfaces, CLEAN.** `2.MD.A.2` appears exactly once in the repo,
inside the catalog's own stale claim (which named only two of the four surfaces and said "38
tools"). `lay-units-core.js:44` **actively bans** mixed-size units; `measurement-bench` wipes its
layout on every unit switch (`:1215`), computing both numbers and throwing each away before the
other is made — so it does not own a changeable unit, it structurally forbids one. **Near-miss
cited, not hidden:** `lay-units-activities.json:258`'s `inverse-leaf` round pre-SPEAKS the
conclusion (`"Smaller helpers, more of them!"`) because telling was all it could do.

⚠ **The §23.7 closed-strand line ("capacity/weight/non-standard length") is an OWNERSHIP claim, and
on this one point it was measured FALSE.** It stands for the rest of the strand.

**Gates as run:** verify V1–V14 + V4b (oracle by repeated subtraction — a deliberately different
algorithm) · mutate **38/38 killed, 0 harness faults** · local-test 36 assertions with real pointer
drags · smoke 208 × 11 · locale-layout 66 renders · liveness × 3 entitlement states ·
**live-verify 100 assertions driven on production**.

### B4 · The Unrolling Tape — ✅ **BUILT + LIVE as `#41 unroll-tape` ("All the Way Round", 2026-08-01)**
A flexible strand lies along the boundary of a flat curved shape; drag its tip and it **slides off
and lies down straight** beside a scale. **THE INVENTION — the unrolling.** A curved length
becoming a straight one is the one abstraction in early measurement with no static representation.
You can do it with real string, which is exactly why it never gets done twice.

**AS SHIPPED, vs the spec above:**
- **The scale is ruled in the SHAPE’S OWN WIDTH** (operator ruling), so the reading is
  `around ÷ across` and is size-invariant BY CONSTRUCTION. A circle reads **3.14 at every size**
  — and so does a **Reuleaux triangle**, which is visibly not a circle (Barbier’s theorem,
  measured to 1.5e-8 constant width). That pairing is the strongest thing the apparatus does.
- **It is a SLIDE along one fixed guide, not a lift.** The strand occupies guide-arclength
  `[L·t, L·t+L]`, so its total is L at every frame BY CONSTRUCTION — measured 2.5e-15 across all
  12 shapes × 65 frames. The exact physical lift is the **involute**, whose free end sweeps to
  ≈6.3r and straight out of frame.
- **“Around or tall” is a RIGGED COIN** — `P ≥ 2·diameter` for every closed curve, so around always
  wins. The binary became a **plantable flag**, frozen by refusal at the first movement, never
  marked and never scored.
- **NO ART.** There is no outline/contour/silhouette for ANY object in this repo, so every
  boundary is analytic. That **dissolves the entry’s flagged authoring cost** and kills a
  modelling lie: a tape round a cup measures its cross-section, not its silhouette.

**⚠ THE ENTRY’S GATE SPEC DID NOT SURVIVE CONTACT — twice.** “within 0.00px” is arithmetically
impossible (chord ≤ arc is a theorem — an inscribed polyline is STRICTLY shorter), so three errors
are reported separately and E1 is a two-sided BAND. And “unchanged under all 360 integer
rotations” is true of the LENGTH and FALSE of the RATIO (an ellipse’s varies 130%, a pebble’s
151%) — so orientation is fixed per shape and there is **no rotation control**.

**Fence — NOT CLEAN, and SUBTRACTED.** `mending-fences-core.js` owns 3.MD.D.8 perimeter but
RECTILINEALLY (boundaryEdges over a polyomino; its “roll of fence” is a text pill printing a
number). → **this tool NEVER WRAPS A POLYGON.** Curved length was virgin: zero `getPointAtLength`
in the repo, no tool sums polyline segments for display, no curve-straightening anywhere.

**Gates as first run (2026-08-01):** verify 188 · mutate 42/42 · local-test 51 · smoke 122 × 11 ·
locale-layout 396 / 66 · liveness 27/27 × 3 states · live-verify 117 · 0 protected-core lines.

---

#### ⭐⭐ REBUILT 2026-08-06 — "I could not set the flag, it was not possible to drag on my screen"

**The flag was INVISIBLE.** On the tool's own page the bench renders **660px**, so one model unit
is 0.66px and the 30-unit pennant drew **under 20px** — behind an **18px OPAQUE TEAL DOT** covering
the pole and half the cloth, at **45% opacity**, which is the universal *disabled* signal. Three
identical dots sat on the bench (size / strand tip / flag) and the hint said *"Drag the flag"*
while no flag was legible anywhere. There was nothing to grab.
Two further causes compounded it: every `pointermove` ran `render()`, which did
`stage.innerHTML=''` — **removing the element mid-`pointerdown`**, with no pointer capture, so on
touch and pen the gesture died after one move; and there was **no way to plant a flag by tapping
the runway**, the gesture a teacher reaches for first.

⭐ **AND NO GATE IN ELEVEN SCRIPTS EVER TOUCHED THE FLAG.** Every `.urt-flag` assertion was
`!!querySelector`; the flag was only ever moved by calling `setFlag` inside `page.evaluate`. The
three DOM paths written *for* it — pointerdown-tap, click, keydown — each carried a comment saying
a liveness gate had reported them dead, and **not one was driven by any test**. The rendered flag
classes appeared **zero times** across `scripts/`. That is why it shipped.

⭐ **EVERY WIDE TIER THE TOOL SHIPPED WAS DEAD ON ITS OWN PAGE.** The tool page pins the iframe at
704px at 1440, 1920 and 2560 alike, and **media queries inside an iframe resolve against the IFRAME
viewport** — so a ladder keyed `(min-width:1367px) and (min-height:880px)` could never match,
`body.urt-wide` did nothing, and the bench stayed 660px on every desktop. It went unseen because
**both QA renders were taken STANDALONE**, where the tiers do fire. The ladder now starts at 680
and carries no `min-height` term. ⚠ **MEASURED, NOT ASSUMED:** the iframe *height* is fine here
(427px, content-driven) — the recorded 422px pin belongs to tools that bind `#lcs-root{height:100%}`
and this one never did, so **no height escape is shipped**. Checking that was the difference between
a real fix and a cargo-cult one.

**What changed.** build/paint split + one gesture object on `window` (`{passive:false}`, rAF,
`pointercancel`+`blur`, **flush on release**) + `setPointerCapture` — a handle can only be dragged
if it survives the drag · **the whole runway plants a flag**, up to **three**, from three children,
so the disagreement is visible and nothing on screen can settle it · the flag is a chequered marker
flag in **HTML** (an SVG pennant is 9px of cloth at a 320px bench), full opacity, parked at the
plate's edge — **not at two acrosses**, where it sat within a third of a step of the default
shape's answer · **adaptive viewBox**: the default shape's dead air was **37% of the stage**; the
plate is now **29% bigger** and the bench **shorter** (aspect .340 → .276) · the size drag handle is
**deleted** for three discrete rungs (a continuous drag is a *zoom*, and invariance is evidence only
with a prediction in between) · the height leaves the runway's number space and stands up the shape
· ⭐ **THE RECORD** — each landing leaves a mark under a miniature of its shape, **every miniature
the same width**; `circle == reuleaux` at 3.1416 is Barbier, they land on one spot, and the marks
**stagger onto two rows** rather than hiding each other · a **twelve-shape shelf** with the seven
locked ones padlocked (the shape gate was previously *unreachable* — `nextShape` only returns null
on a shelf of one, so a free teacher cycled five forever) · the paid Print chip hands over the shape
at **true size (25mm and 50mm)** on a cut line, while a free Ctrl+P still gets the apparatus.

⚠ **THE RUNWAY MUST OUTRUN THE ANSWER.** Sizing the plate to fill the runway exactly put every
landing at ~97% of the scale — a child could guess short but never long, and on the default shape
`addFlag` REFUSED anything past 2.39 while the answer was 2.30. **A guess space that opens one way
is not a guess space.** One whole width of room beyond the landing, always.

**Gates as rebuilt:** verify **261** · mutate **52/52, 0 harness faults** (⭐ **6 killed ONLY by the
new browser escalation**) · local-test **117** · smoke **133 × 11** · locale-layout **990 checks /
99 renders** · liveness **69 across 3 entitlement states** · print-sheets 10 · wide-viewport 12 ·
**live-verify 117 driven on production** · 0 protected-core lines.

### B5 · The Reshape
A shape on a grid; draw one straight cut and drag or turn either piece. **THE INVENTION:** the
**area numeral is welded to the material and physically cannot move**, while the perimeter numeral
moves freely. One invariant and one not, side by side. And unlike scissors, you can un-cut.
**Gate:** 20 base shapes × a 64×64 cut lattice = **81,920 dissections** — areas sum by 100k-point
sampling; every piece transform is a rigid matrix with determinant asserted **exactly 1**; the two
pieces reassembled at identity are **byte-identical to the original**; perimeter exceeds the
original by exactly twice the cut chord.
⚠ Header must state the commodity line: tangram is seven fixed pieces assembled into a given
outline. **The verb is *dissect*, not assemble or cover** — which separates it from `shapeforge`
and `patchwork-meadow`.

### B6 · The Hinge
Two arms from one pivot with a honey wedge between them; drag a tip to swing, drag *along* an arm to
lengthen it. **THE INVENTION: the arms stretch and the wedge refuses to care**, and a ghost of the
previous angle stays — so the single most documented K-3 geometry misconception (*longer arms mean
a bigger angle*) is made **physically false rather than corrected**. Second: **wedges iterate** —
six 60° wedges close the circle, seven overlap. **Gate:** all 360 integer angles × all 100×100 arm
pairs (**3.6M states**) — the rendered sweep identical to 0.00px, so the arms provably cannot
influence it.
**Fence:** the angle strand is **completely empty** — no protractor, no wedge apparatus anywhere.
**PAID** includes the degree readout: the free tier is deliberately **pre-numerical** (the Fraction
Kitchen meaning-before-notation precedent).
⚠ **Risk:** gate 2 — weekly-in-a-unit rather than daily-all-year.

### B7 · The Cold Line
A tall thermometer; grab the **scale** and slide it, with zero as a fixed honey line. **THE
INVENTION: the thermometer and the number line are the same physical object, and you can tip it.**
One control rotates the instrument to horizontal — same liquid, same ticks, same markers, same
span. **Gate:** the 0 tick's position in the horizontal render equals the vertical under the
rotation matrix within **0.00px**; linearity across zero for all **6,561 ordered pairs** (no squash
at zero — the classic art bug); span = |a−b| for all **3,240 unordered pairs including the 1,500
that cross zero**; typography **U+2212 MINUS SIGN, never a hyphen**, plus the per-locale decimal
separator ×11.
**Fence:** `number-line.js:60` is `min: () => 0`. **There is no negative number anywhere in the
tool suite**, and the printable `primitives/thermometer.js` is `min:0, max:40` and *throws* outside.
⚠ **Risk:** Fahrenheit — `en` is USD-and-inches in this repo, and below-zero is rare in °F.

## C · Data, chance and science (5)

> **Science is corpus-blocked, and the repo proves it.**
> `scripts/worksheet-gen/types/_shared/science-category-sort.js` states outright that *"the library
> carries no science metadata"*, and `data/science/chicken-life-cycle.json` records that the
> butterfly, frog and plant life cycles were **dropped for missing art**. The 21 curated science
> JSONs serve printables, which need six items a sheet; **an instrument needs hundreds to stay
> alive for a year.** So v4 admits science only where ground truth is **geometry, arithmetic or
> physics** (C2, C5) or **our own closed enums** (C4).

### C1 · The Draw Bag — ✅ SHIPPED as tool #38
Full record → `[[project_draw_bag_tool]]`. Headlines: chance was **virgin on all four fence
surfaces**, and four adjacent neighbours were subtracted rather than negotiated (name-sticks owns
without-replacement + the cup + `tipBack`; estimation-jar owns the reveal + the throwing accessor;
class-graph owns record→bar; arrow-strip owns two-run-as-ghost-overlay, so record two lies UNDER
record one). First v4 tool with legitimate randomness → the gate bans **unseeded** randomness.
⚠ **THE CATALOG'S GATE SPEC WAS RIGHT BUT INCOMPLETE:** χ² is only the backstop; the real theorem
is the **exact prefix walk against an expanded-array oracle** (a different algorithm), because a
modulo-bias mutation over ≤24 outcomes is invisible to χ².
⚠ ⭐ **A LAW-LEVEL LESSON: my own D14 ban was too WIDE.** It banned the SUBJECT word alongside the
verdict, so the German panel's `Der Zufallsbeutel` — from *Zufallsexperiment*, the actual
Grundschule register — would have failed the build. The v4 law already says authored language is
chrome "(title, settings, the paid chip)"; **naming the domain is not delivering a verdict.** Bans
are now poison-tested in BOTH directions, and the landing prose may name its official curriculum
strand (KMK *Daten, Häufigkeit und Wahrscheinlichkeit*, BNCC *Probabilidade e estatística*, Lgr22
*Sannolikhet och statistik*) from an explicit, auditable exemption list.

*(historical entry follows)*
An opaque bag; tap to draw one thing, it lands on a permanent record strip and goes back in. The bag
is never shown. **THE INVENTION — the same bag can be run twice.** Draw twenty, park that strip,
re-run the *identical* bag, lay strip two under strip one: two different pictures from one identical
cause. You cannot rewind a draw on a carpet, and a slide's second run is authored — the class knows
it and stops believing. Second: draws are permanent, so *"there are no blue ones in there"* dies to a
blue counter rather than to an adult.
**The class talks about** how sure they are what is in the bag, and whether one more draw would
change anyone's mind.
**Gate** (zero corpus — ground truth is the bag's own multiset): impossible outcomes never appear
and certain ones always do, over 10⁶ seeded draws; **a fixed-seed PRNG makes runs deterministic so
Oslo and Lisbon see the identical run**; χ² of empirical against exact multinomial under bound; the
composition structurally unreachable before tip-out; and **no frequency numeral, percentage or
"most likely" label is ever rendered, in any of 11 locales.**
**FREE** one bag, draw, strip, tip-out. **PAID** lid off (build a bag), the two-run comparison, the
certain/possible/impossible rail, a 200-draw fast run, saved bags, print the strip. **24 → ~120.**
*Why it is here:* **chance is completely virgin on all four surfaces** — zero tools, zero
activities, zero of 240 printables, zero apps — and it is the cleanest instance of the European slot
shape: **KMK Primarstufe carries "Daten, Häufigkeit und Wahrscheinlichkeit" from grade 1, and CCSS
has nothing before 7.SP.** An English-first competitor's standards map has no pin there.
⚠ **Risks:** chance without a verdict can drift toward a slot machine — mitigate with the
`name-sticks` no-drumroll doctrine (the strip is the star; the bag is never "won"). And US teachers
will not search for it, so `en` analytics will under-index it. **Do not read that as failure.**
⚠ Fold in **the committed prior estimate** (below).

### C2 · The Shadow Yard
A stick on flat ground and a light you drag through the sky. The shadow is not drawn; it is **cast**.
**THE INVENTION — you can move the sun, and you can leave your prediction on the ground.** Children
plant a flag where they think the shadow tip will land; the light moves; the shadow sweeps past it.
Nobody says anything. Second: the shadow is **a real DOM clone skewed by the light's own transform**
— its length is the layout's answer.
**Gate** (zero corpus — ground truth is trigonometry): length = h·cot(altitude) within 0.5px across
the full sweep at five viewports; |shadow| strictly decreasing in altitude; the planted flag is
**never compared, coloured, counted or scored**; and the premium sun paths match standard
solar-declination equations to under a minute over **365 days × the 11 market latitudes**.
**Fence:** `shadow-match.html` and `K-057` match a silhouette to its object; **nothing anywhere
relates light position to shadow.**
⚠ **Risk:** it is a simulation, and the house rule is *never simulate what the class can do in the
room*. The defence: they cannot do December in July, cannot do Tromsø, and cannot rewind. Ship it as
the indoor companion to the real playground stick, not its replacement.

### C3 · The Glass Graph
A finished graph built from separable panes — bars, scale, category pictures, gridlines. Slide a pane
out and its claim leaves with it. **THE INVENTION — the layers come off in any order and the bars
keep standing.** Pull the scale: *which is biggest* survives, *how many* dies. Ink does not
delaminate; and in a slide deck the reveal order is baked at authoring time, so a class that wants
the scale **back** cannot have it. **Gate:** layer independence over all 2^L pane subsets (32 states
per graph, exhaustive) with bar geometry byte-identical; a removed pane **absent from DOM, aria and
live region**, not merely hidden.
⚠ **Ground truth, stated loudly.** *Tier 1* — counts derivable from assets we own
(`object-attributes.json`, the image manifest). *Tier 2* — hand-authored graphs are **a corpus
commission and must be costed as one.** *Tier 3* — any graph about the real world (rainfall,
populations) is a corpus we do not own: **refuse.**
**Fence:** `class-graph` owns children-generate-the-data plus the pile→bar morph; `graph-it` owns
build-a-bar; nine printables own reading a finished graph. **Nothing removes anything from a graph.**
⚠ The line against `number-talk-easel` must be held in the header: the easel is **additive** (a flash
from nothing); this is **subtractive** (panes leave a complete object). **It is not a curtain.**

### C4 · The Splitting Key
One heap of pictures; pick a question from a closed set of six and the heap **splits into two heaps**.
Pick again on either. **THE INVENTION — a bad question is visibly a bad question, and nobody says
so.** Split 24 things by *does it move by itself?* and you get 12/12; by *does it live in water?* and
you get 2/22. **The heaps are the feedback; lopsidedness is information, not error.** Second: the same
set keyed two ways to the same leaves, side by side.
**Gate:** every split computed from `object-attributes.json` is **total**; **a degenerate split is
still offered, and the gate asserts it renders with no warning, tint or discouragement**; every item
is separable by some sequence; pools with two items identical on all six enums are rejected at build.
⚠ **The hardest fence in the catalog.** `sorting-hoops` consumes the *same* file and the *same* six
enums. What survives: **sequence** (the key is nested and the *order* of questions is the object of
study, where the hoops' two predicates are order-free); **heap size is the payload**; and **nothing is
hidden** — the questions are face-up, making it the *opposite* tool.
⚠ **Hard dependency:** pools may draw only from the **456 human-reviewed rows** of the 933 — see the
corpus prerequisite. If the operator rules this "Sorting Hoops mode 3", ship it as a hoops mode rather
than fighting it.

### C5 · The Ramp
A board you tilt and a ball you release; where it stops, a marker stays — with two tiny icons recording
what the setup was. **THE INVENTION — the apparatus will not let you forget what you changed.** A run
where you changed the slope *and* the ball sits in the fan looking exactly as legitimate as the others,
and the class has to notice it cannot be compared to anything. **The tool never flags it.**
**Gate** (zero corpus — kinematics): **determinism** — an identical setup gives a bit-identical stopping
position, with no hidden randomness anywhere (*the exact opposite invariant to the Draw Bag's, and
asserting both is what makes the pair honest*); stopping distance strictly increasing in release height
at fixed friction; and a marker's recorded setup is **read back from the run**, not stored at click
time, so a marker cannot lie about its own run.
⚠ **Risk:** the weakest routine frequency in the catalog.

## D · The one that is not an instrument (1)

### D1 · The Morning Board — **build LAST**
One surface holding **today's five minutes**: this week's Number Sieve, today's quick image, today's
Draw Bag run, this month's calendar. It advances one step per school day and prints as a strip for the
sub folder. **THE INVENTION: not a launcher — a sequence with memory and a default.**
**Why it outvalues any single instrument:** every tool ships its own free/paid split and its own saved-
setups store, so a subscriber buys **N little repertoires and is expected to remember all of them**.
Two precedents for time-sequenced content already exist and nothing composes them (`number-talk-easel`
authored strings; `wodb.js:183 _isoWeek`). **Teachers do not cancel tools; they forget them, and a
launcher does not fix forgetting.**
**Constraint:** it holds **the teacher's plan and never a record about a child** (the
`feelings-check-in` doctrine that a trend is unrepresentable).
It is worth little until there is something to compose — hence last.

---

## ⚠ Closed strands — do NOT re-propose

- **TIME.** `learning-clock` (+ a premium elapsed band drawn under the ticks) + six clock engines +
  `our-day` + `calendar-wall` + `class-timer` + nine printable types — and **gate 4's timer ban kills
  every duration-comparison apparatus anyway.**
- **MONEY.** `money-mat` with 11-locale real currencies and "make it another way", plus
  `coin-stall-core` and `money-core`. No remainder.
- **CAPACITY / WEIGHT / non-standard length.** `measurement-bench`'s three benches plus
  `pour-measure-core` and `compare-balance-core`.
- **ALL CORPUS SCIENCE** — life cycles, food chains, materials, body systems, sink-float,
  seasons-as-facts. The repo proves the art does not exist (see the C-section note).
- **PUZZLES WITH A SOLUTION** — sudoku, magic squares, matrix reasoning, mazes, picture analogies.
  Owned across printables and apps, and structurally they **fail gate 5**: solving ends the
  interaction, and a solved puzzle produces silence.

## Considered and rejected — recorded so they are not re-proposed blind

| Rejected | Why |
|---|---|
| **The Pin Board** (notice-and-wonder; pins land *on* the thing noticed, and the empty part of the picture is the payload) | ⭐ **The largest market hole found anywhere** — no tool exists; teachers use chart paper, which loses *where* a noticing was about. Cut only because its gate proves the tool is **honest, not that it teaches** — noticing has no ground truth, so it fails ruling 5. **First to reinstate if that ruling ever relaxes.** |
| **The Standing Line** (opinion rail; tap, argue, tap again, the first row stays as a ghost) | Changing your mind becomes something you can *see the room do*, and nothing in the market records a class's before-and-after without recording a child. Same reason as above. |
| **The Pairing Rail** (leftovers from two odd collections pair with *each other*) | Honest exhaustive gate over 2,601 merges — but odd/even is a **unit, not a year** (gate 2), and the repertoire tops out around 30. |
| **The Fold-and-Cut** (*Faltschnitt*; multi-fold, snip, stepwise unfold) | Genuinely different from `folding-sheet` (multi-fold and **subtractive**) and the gate is spectacular — 4.19M unfolds. Cut because the remainder is probably not large enough to stand beside the shipped tool. **Excellent folding-sheet premium mode.** |
| **Number String / Fosnot problem-strings** | A beloved rotting routine — but its apparatus (rekenrek + open number line) is **already shipped**, so a tool is a container and fails gate 1. ⭐ **Ship it as a PAID DECK on the two existing tools: real revenue, zero new apparatus.** |
| **Same / Different** | Second-largest "beloved routine, no tool" hole. After subtracting `wodb` the remainder is content, not apparatus. **Ship as a wodb repertoire mode** (2-cell grids + a two-stem card). |
| **A generic "slow reveal" runtime** | The most tempting reading of the strategic opening and the most dangerous: a reveal engine with no apparatus is chrome around a slideshow. **Gate 1 refuses it.** The Number Sieve and the Glass Graph are the *specific* versions that are apparatus. |
| **Clothesline Math** | Killed three times over: `open-number-line` owns the empty line, `story-line` owns the peg-and-line apparatus *and* its playback, and `track-repair-core` already does continuous magnitude placement with an ε tolerance. |
| **Ten Bridge / make-ten** | The densest square inch on the platform — `G1-106` + two number-bond activities + `ten-stones` + `part-whole-frame` + `rekenrek` + the `ten-frame` tool. Remainder ≈ zero. |
| **The Compass Rose** | N/S/E/W are letters and they differ per locale (de N/O/S/W, fr N/E/S/O). **Killed outright by the no-words law.** |
| **Any positional-vocabulary tool** (the v3 Route Map) | Killed by the no-language ruling. **The Arrow Strip is the wordless survivor.** |
| **The Turn/Flip Table · Shape Feely Bag · Carroll Grid · Growing patterns · Fact-family triangle · Bead string · Subitizing cards · Number of the Day · Number-line estimation · Water conservation · Pictograph key · Class line plot · True-scale shelf · Colour mixing · Logic-grid deduction · The Mill** | Each fully occupied on at least one surface, or fails a gate. |

## The one prerequisite — a corpus commission, before C4

**`object-attributes.json` is 456 of 933 rows human-reviewed, and the habitat tails are thin (water
48, air 36).** The Splitting Key is capped by this, the Glass Graph's Tier-1 data depends on it, and
it is the only thing standing between this catalog and the science strand.

**Recommended, and cheap relative to what it unlocks:** finish the review to 933, fill the water and
air tails, and add two or three further **closed, conceptual-only** enums (`made_of`, `legs`,
`has_wings`). The pipeline exists and is proven — `seed-` → ten parallel reviewers → `merge-` (which
halts on any unknown key, field or enum) → `verify-object-attributes.js`. Far cheaper than buying
world-knowledge facts we would then have to defend in eleven languages. **Run it as its own piece of
work before C4**, exactly as the original corpus was run before Sorting Hoops.

## Build order

One tool per plan-mode session, registration inside the build commit — the proven v3 cadence.

- **Wave 1 — prove the thesis (4). ✅ CLOSED 2026-08-01.** ✅ `A1 Number Sieve` ·
  ✅ `B1 Arrow Strip` · ✅ `C1 Draw Bag` · ✅ `A2 Splat Mat` → shipped as **`#39 The Lids`**.
  The honest test below now applies.
  *Why these four:* A1 has the strongest gate story on the platform and the largest machine-growable
  repertoire; B1 and C1 are the two clearest cases of the European slot shape and both are wordless
  by construction rather than by translation effort; A2 carries the largest proven demand.
- **Wave 2 — the measurement spine (4). ✅ CLOSED.** ~~`B3 Unit Handle`~~ ✅ **#40** ·
  ~~`B4 Unrolling Tape`~~ ✅ **#41 ("All the Way Round")** · ~~`A5 Comparison Tape`~~ ✅
  **#42 ("The Planks")** · ~~`B7 Cold Line`~~ ✅ **#43 ("Upright and Flat")**.
  *The spine reads as one argument:* change the UNIT with the object fixed (#40) → lay a CURVE
  straight (#41) → carry a DIFFERENCE away as its own object (#42) → TURN the whole instrument and
  watch nothing change (#43). Each one moves something a child assumed was fixed.
- **Wave 3 — space and structure (4). ← NEXT.** `B2 Build Plan` · `B5 Reshape` · `B6 Hinge` ·
  `A3 Counting Tray`.
- **Wave 4 — number depth (3).** `A4 Carry Wheels` · `A6 Grouping Dial` · `A7 Hundred Field`.
- **Wave 5 — data, science and the habit (4+1).** *corpus commission first*, then `C4 Splitting Key`
  · `C3 Glass Graph` · `C2 Shadow Yard` · `C5 Ramp`, and finally **`D1 Morning Board`, last**.

⭐ **The honest test at wave-1 close is NOT traffic — it is whether anyone pays for DEPTH:** the
free→paid conversion on the four wave-1 tools, and the fraction of paying sessions that open a
*second* repertoire entry. **If teachers use the free instrument happily and never touch the paid
library, the moat is not where this plan says it is, and waves 2-5 should be re-planned rather than
built.**

---

# The per-tool build recipe

Also in `[[feedback_next_tool_build_recipe]]`; §23 carries the terse form.

## Files
`mini tools/<key>.js` + `<key>.html` (copy an existing wrapper verbatim) + `mini tools/<key>-sets.json`
for the repertoire. **0 lines** to `lcs-shell.{js,css}` or any protected core — copy patterns, import
nothing. ES5 only (`var`, `function`, no arrow/let/template literals). CSS prefix `<xxx>-`, root built
as `api.el('div', '<xxx>-wrap')` — **required**, the liveness gate derives the prefix from it.

## Reuse, verified present
`LCS.drag.linear` for 1-D drag · the 2-D drag **pattern** at `sort-bins-core.js:352-435` (+ the
keyboard fallback at `:360-369`, which the liveness gate needs) · `_NUMBER_WORD_HELPERS` copied
verbatim from `place-value-core.js:~274` · the repertoire loader `fetch('/mini-tools/<key>-sets.json')`
as at `estimation-jar.js:270` · the entitlement block from `pattern-bench.js:239-265` — ⚠ **unknown
entitlement must be PESSIMISTIC** (no `&& premiumKnown` on a control gate) **and locking a control is
not enough: reset the state it produced** · the two-node gate line per `folding-sheet.js:714-723`.

## The header must state
the one thesis · the invention · the moat · the four-surface fence result · and an explicit
**refuse-list**. *A tool without an anti-feature list is a widget.*

## Gates, in this order, none skippable
1. **`verify-<tool>.js`** — exhaustive where the model is finite. ⚠ **The gate implements its own
   ground truth**; reading the expectation off the tool means the gate marks its own homework
   (19 of 51 mutations survived on `number-sieve` for exactly this reason). Env indirection
   `<PREFIX>_TOOL_DIR` so the mutation harness can point it at a copy.
2. **`mutate-<tool>.js`** — **every mutation killed**, `timeout: 30000` (a gate that hangs reports
   nothing). ⚠ An **inert** mutation is a bad mutation, not a gate hole. ⚠ It must **carry every data
   file the gate reads** into its tmp dir, or every mutation is "killed" by a missing file and the
   harness reports a clean sweep of nothing. ⚠ Locale mutations must **self-anchor on the live file**,
   never on a literal string — `apply-…-locales.js` rewrites the whole strings block. ⚠ Keep the tool
   file **LF** or multi-line anchors silently report ANCHOR NOT FOUND.
3. **`local-test-<tool>.js`** — real pointer drags; sweep `320·360·412·768·1024·1366`; two tap floors
   measured separately and **named individually** (controls ≥44px, canvas cells ≥34px — an or-shaped
   assertion hid a missing floor twice); every text-bearing node ≥14px; **per-child right-edge
   containment measured against the CARD**; FITS at ≥768; zero console errors.
4. **`smoke-<tool>-locales.js`** ×11 — **fresh browser per locale** (a shared one caches the module and
   every later locale passes on the first's copy); **print the whole authored string set** with
   seen/unseen marks; reach controls by **index, never an English aria-label**.
5. **`audit-<tool>-locale-layout.js`** — 11 locales × 6 viewports. English fitting proves nothing about
   German compounds or Finnish agglutination.
6. **`audit-tool-control-liveness.js --tool=<key>`** — **all three entitlement states**. Use
   `--depth=1` for grid tools (it is combinatorial); `--depth=2` when the control count is small.
7. **I read the 360 / 768 / 1024 renders myself.**
8. **`live-verify-<tool>.js`** — 11 locales on production, fresh browser each, **driving the main
   control**. Never "it mounts".

## Registration — 5 points, inside the build commit
1. `frontend/config/live-tool-slugs.ts` → `TOOL_KEYS` ⚠ **miss this and all eleven locales return 410**
2. `frontend/lib/seo/tool-content.ts` → 4 edits (`TOOL_KEYS`, `TOOL_MINI_URL`, `TOOL_ACTIVITY_PREFIX`,
   the `ToolContentFile` interface member)
3. `frontend/app/[locale]/tools/[tool]/page.tsx` → `TOOL_WRAPPER_VERSION` bump ⚠ **the one
   non-idempotent step — guard it on a state that IS stable**, or a second `register-` run double-bumps
4. `frontend/lib/manipulatives.ts` → the hub card (11-locale title / tagline / description)
5. 11 × `frontend/messages/tool-content/<locale>.json` → one `ToolEntry` before `labels`, native slug
   matching `/^[a-z0-9-]+$/` (⚠ da folds `ø`→`oe`, no folds `ø`→`o`, so the two never collide)
6. `frontend/lib/tool-categories.ts` → `TOOL_CATEGORY`. ⚠ **Omission does not error** —
   `toolCategory()` falls back to `'number'` and the tool sits in the wrong hub section forever.
7. **the hub thumbnail.** `node scripts/generate-tool-previews.js --only=<key>`, then **scp the
   webp to `/var/www/lcs-media/mini-tools/tool-previews/` BEFORE `deploy.sh`** (§20.4; it is
   gitignored and travels by scp, not git). ⚠ **Omission does not error either** — the card falls
   back to a generic "plus over minus" glyph.
   ⚠ **Add a `SEEDS` entry first if the tool's board is empty at rest.** The generator drives REAL
   controls with real clicks, so a seed can only reach a state a child could. Draw Bag's seed sorts
   two guesses, drops the record to its 10-cell setting so it is ONE row, and draws NINE of ten —
   one short of full, because at ten the bag greys out and the bag is the hero of the card.
   ⚠ **Then measure, do not guess:** `--fit=auto` top-crops anything over 0.85 aspect, and the top
   of a stage is usually chrome. Draw Bag measured 720×559 (0.78) and letterboxed cleanly; had it
   been taller, the top-crop would have cut off the record, which is the payload.

⭐ **All seven are enforced by `scripts/preflight-tool-registration.js` in `deploy.sh`** — 7 checks
× every tool key, poison-tested on every run (7/7 must still fire), preview check self-disabling
where no previews exist. Points 6 and 7 were absent from this list until #38 shipped without both;
**both degrade silently**, which is why this is now a gate and not a longer checklist.

⚠ **The header ordinal is a LEDGER, not the `TOOL_KEYS` index** — it runs 3 behind, because
`class-timer`/`letter-studio` both claim #25, `wodb`/`syllable-splitter` both claim #22, and three early
tools carry no ordinal. Take the next ordinal from the last shipped tool's header, not from the array.

## Locales
**§A.13.48 three-agent native panel per locale** (linguist + K-3 educator + B2C marketing), rebuild
never translate. Expect the panel to **rename the tool** — every panel has, on every tool.
⚠ **The panels cannot see the product lexicon**, so normalise the paid-plan name (`unlock`) against the
shipped tools rather than trusting the panel's coinage. `[NSR-FLAG]` sv/da/no/fi where applicable.

## Deploy
```
git pull  →  cp "mini tools"/<key>.{js,html,json} /var/www/lcs-media/mini-tools/  →  chown lcs-media:  →  deploy.sh  →  live-verify-
```
⚠ **The `*.json` is not optional** — the repertoire is served from there and the habitual chain copies
only `*.html` and `*.js`.
⚠ **The cp must land BEFORE `deploy.sh` runs the build**, or the standalone build indexes a stale static
manifest (§20.4).
⚠ Bump the `?v=N` cache-buster in the wrapper on every `.js` change (§A.13.42).

## Standing traps, each bought by a real defect
- ⭐ **A wildcard in a coverage check manufactures coverage.** A smoke digest matched numeric
  placeholders with `.{1,60}?`, which matches any prose — so a string authored in eleven locales and
  consumed by *nothing* reported as rendered in all of them.
- ⭐ **A control must do WHAT ITS LABEL SAYS.** The generic liveness gate structurally cannot know this
  — it passed a "New cards" chip that set a flag and dealt nothing.
- ⭐ **Containment is measured against the CARD**, not the inner box. Cells inside a mat that itself
  overflows pass every cell-level check, and `overflow-x` absorbs the evidence.
- ⭐ **Sweep every configuration, not just the default.** A mat sized for six columns whatever `n` was
  looked right forever, because six was the default.
- **A15 NO DEAD STRINGS** — scan for *referenced anywhere outside the strings declaration* (a key can be
  reached through a ternary inside `t()` or a lookup map, so scanning for a literal `t('key')`
  false-flags live keys). Exempt only what the shell consumes (`title`, `lcs-shell.js:448`).
- **Assert the MEDIAN, not the mean** — a mean hid a third of a corpus collapsing.
- **`vh` is FORBIDDEN inside a manipulative** — its iframe grows to content, so a `vh` rule is a
  feedback loop the shell deliberately has no path for.
- **Never an inline `background` SHORTHAND** — it resets `background-image` and beats the stylesheet.
- **`margin:0 auto` on the CHILD, never `justify-content:center` on an overflow scroller** — centring a
  flex container that overflows puts the start out of reach.
- **Two nodes for the gate line, never a concatenation** — the recorded localisation smell, and it makes
  the one actionable thing unclickable.
- **Ban invisible characters and poison-test the ban** — a soft hyphen in a Danish string survived every
  assertion and surfaced only because the digest PRINTED it.
- **Poison-test every narrowed regex.** A ban anchored until it cannot fire is worse than no ban.

---

## Companion work this catalog creates

1. ⚠ **The tools index will not survive 58 cards.** `frontend/app/[locale]/tools/page.tsx` renders a flat
   list; it needs grouping (number · space and measure · data and science · the classroom) **before wave
   2 lands**, or the twenty best assets become unfindable.
2. **Per-tool OG images.** Every tool currently hardcodes `/og-homepage.png` — twenty new landing pages
   sharing one social image is a measurable SEO and sharing loss.
3. ⚠ **Saved setups are `localStorage`, per browser, wiped by a cache clear — and "save" is itself a
   premium gate.** We would be charging for a record that can evaporate. A server-side `ToolSetup` store
   is the honest prerequisite for selling "paid depth + record", and is already the #1 unbuilt shared
   piece.
4. **`K-063 mirror-images` is finished, proofed and in no wave** — a Kindergarten symmetry worksheet
   sitting unpublished while `messages/en.json` already markets "explore symmetry".

## Addendum — market research, returned after approval

The independent pass **validates the twenty** (every commodity exclusion confirmed; chance confirmed
virgin; Gynzy confirmed broad-not-deep, which is the entry). Six deltas:

1. ⭐ **A missing primitive the catalog absorbs — the COMMITTED PRIOR ESTIMATE.** The routines that work
   make the child commit *before* clue 1, so the estimate can be compared after the reveal. **Only paper
   does this today.** Folded into A1 (already shipped: the marker is committed and immovable once clue 1
   fires), and required for **A2 and C1**.
2. ⚠ **Aimed at A3** — see the A3 entry. (Best evidence in the report: EEF cluster RCT, 180 schools,
   ~3,600 pupils, **+1 month, and no additional progress for FSM-eligible children.**)
3. 🆕 **The German Zwanzigerfeld carries a *Kraft der Fünf* break line**, so *"a US ten-frame widget is
   not foreign here, it is wrong."* That is a difference in the **geometry of the apparatus**, not the
   language. **Recommend a 5-break variant on the shipped `ten-frame`, not a new slot.**
4. ⚠ **A defect report on a shipped tool.** Dutch *splitshuis*, French *maison des nombres* and German
   *Zahlenhaus* are **three incompatible diagrams for one concept.** If `part-whole-frame` ships one
   generic shape it is **wrong in at least two markets.** Worth an audit; separate commission.
5. **Number of the Day is resolved, not rejected** — the German *Zahl des Tages* is a fixed
   slot-template ritual run ~180×/year, so it is not a tool, it is **a D1 Morning Board sequence.**
6. ⭐ **A marketing-honesty constraint on how this is sold, not on what is built.** **Zero efficacy
   studies exist for WODB, Splat!, Esti-Mysteries, Notice and Wonder, Estimation180, Numberless Word
   Problems or choral counting**; Number Talks was called *"a Black Hole of research on instructional
   practice"* by researchers themselves; CGI's best modern evidence is **g = 0.02 in primary grades**.
   The correct positioning is **"research-based, not evidence-based"** — say that plainly and never
   claim an effect size these routines do not have.
   ⭐ **Subitizing is the exception and is genuinely strong** (n=11,652, predicting >25% of variance in
   timed arithmetic) — **and `number-talk-easel` already implements exactly the validated
   flash-and-identical-reflash primitive. Do not rebuild it; market it.**

**One free feature it identified for a shipped tool:** `reveal_and_hold()` — a third showing that
*persists while the teacher scribes decompositions beside it*. Nobody has it, and it belongs on
`number-talk-easel`.

⚠ **Retractions not to repeat:** wodb.ca is a parked domain (verified three ways) · sentence-combining
ES 0.50 is **grades 4-12**, not K-2 · "7 hours/week searching resources" is a recycled 2017 figure ·
Tier 1/2/3 vocabulary has no validation study · sound walls and heart-word marking are unvalidated
artefacts on validated theories · Boaler's *Fluency Without Fear* is a non-peer-reviewed white paper,
formally contested.
