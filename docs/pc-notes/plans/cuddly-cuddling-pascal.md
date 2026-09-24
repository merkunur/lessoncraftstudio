# Build game 001 — Feed the Fox

## Context

`games/BUILD-LOG.md` says `NEXT: 001`. The operator's trigger "build the next game" routes to
`games/BUILD-WORKFLOW.md`: resolve the spec, run the transformation ensemble in plan mode, get
approval, build, run the gates, hand over a local link. Game **002 Number Nest** is the only game
built so far; it cost eight operator-reported defects that every gate passed, and the whole point
of doing 001 carefully is that the remaining 198 inherit whatever this build establishes.

Spec: `games/design/specs/001-feed-the-fox.md` — maths / counting to 10, band 5-6, pattern **P3**
(tap to count) with a P1 numeral choice. The child taps each berry once to count it, then taps the
numeral that says how many. 8 items, no timer, no score, no losing state.

The spec is the **basis, not the ceiling**. Its objective, band, pattern, misconception responses
and no-punish rules are invariant; item pools, art, motion and feel are raised by the ensemble.

## The headline finding — the spec as written is 80% a re-skin of game 002

The pedagogue's ruling, and it is the reason this build needed plan mode: **spec step 4 prints the
answer before it asks the question.** `ART.totalNumeral` — a big numeral equal to the count —
appears above the set *before* the numeral tiles unlock. Once the answer is on screen, "choose the
numeral" is a matching task, and matching a quantity cue to one of three numerals **is game 002's
catalogue objective verbatim**. Both games would then show countable objects and three numeral
tiles, and 001 would teach nothing 002 does not.

What 001 actually owns, once that line is deleted:

> **002 teaches the numeral. 001 teaches the tagging.**
> In 002 the count is performed *for* the child, by the machine, *and only on failure*. In 001 the
> child performs the one-to-one correspondence with their own finger, on every item, as the main
> act — and the object enforces it. 002 diagnoses numeral-form confusion (its error apparatus is
> the 6/9 mirror). 001 diagnoses **enumeration failure** — the skip and the double-count, whose
> signatures are N−1 and N+1.

Four changes carry that separation, and they drive the whole transformed design:

| | Change | Why |
|---|---|---|
| **A** | **Delete the pre-answer total numeral.** The big numeral appears only *inside* a correction. | Restores the retrieval event (F-40). Without this, 001 *is* 002. |
| **B** | **The correction is performed BY the child, not for them.** Attempt 2 = a guided re-count the child taps out. Attempt 3 = a demonstration the child *completes*. | 002's correction is a cutscene. You cannot learn to tag by watching tagging — and F-46 rung 3 literally says "a demonstration the child completes". |
| **C** | **Distractors are the outputs of tagging errors** (N±1, N±2); **no 6↔9 pair anywhere.** | Makes the two games' error spaces disjoint. |
| **D** | **Item 1 demonstrates ONE tap, not the whole count.** | Demonstrating the full count performs the objective for the child and makes their first act the numeral choice — which is 002 again. |

## Transformed design (pedagogue audit, F-ids in brackets)

### The four misconception responses

1. **One-to-one (double-count / skip).** The double-count half is right and stays: a second tap
   does nothing, no nudge, the badge does not advance [F-101, F-61]. The **skip** half is written
   but *cannot fire*, because the spec disables the numeral tiles until every berry is counted — a
   child physically cannot stop early and report the last word said, which is the commonest real
   counting error. **Fix: tiles unlock after the FIRST berry, not the last** (see below).
2. **Stable order.** As written this is a *non-response* — the game writes the numerals, so there
   is no child behaviour it responds to. **Fix:** give it a reachable failure (unsystematic tagging
   order — tap right, then left, then middle, which is what *produces* skips) and respond with the
   attempt-2 **guided re-count**: badges clear, berries become tappable one at a time in reading
   order with the next one outlined, and the child re-tags the set under enforced order while
   1,2,3… lands left-to-right on the same berries they just tagged at random [F-43, F-101]. Order
   is enforced **only** in the correction — order-irrelevance is itself part of F-101.
3. **Cardinality.** Right in kind, fatal in timing (change A). The last badge's `lastBadge` beat
   *is* the cardinality emphasis, on the object where F-42 wants it. **Correction:** badges of
   berries 1…N−1 fade one at a time, fastest first, leaving only the last, which grows and rises
   beside the fox — *all the counting words go; the last one stands for the whole set*. (002
   collapses the dots *into* the numeral; 001 fades the earlier tags and keeps the last. Same
   principle, visibly different act.)
4. **Length/spread bias.** The spec's own formula *creates* the bias it claims to defeat: a fixed
   92 px pitch makes row width a monotone function of n, so "wider = more" is learnable without
   counting — the exact defect 002 found in its L1. **Fix:** layout is a per-item property authored
   in `CONTENT` (`rows` + `pitch` ∈ {92, 110, 128}), never derived from n, and the pool is authored
   so **at least five items present a larger set narrower than a smaller one**. Plus the response
   the spec never had: when the chosen wrong tile is the *larger* neighbour on a spread layout, the
   correction ends by **sliding the berries together into a compact arrangement, badges intact** —
   Piagetian conservation, enacted, in 600 ms.

### Tiles unlock after the first berry (reverses the spec)

F-61 refuses *invalid* moves. Answering before you have finished counting is not invalid — it is
**the** canonical counting error and the observable form of misconceptions 1 and 2 both. The
blanket disable deletes the diagnostic, makes half the misconception table unreachable, and leaves
keyboard users on a dead control. So: tiles live after the first berry; an early answer pulses the
un-counted berries in reading order and outlines the next one; it **is not an attempt, never
completes the item, and never spoils first-try**. Brute force stays impossible because an early
answer can never complete an item. Refinement: if the answered value equals the number counted so
far, the child's tagging was internally correct and they stopped early — pulse only the remainder.

### Pools: 24 items, 8 per level (spec had 12)

The spec's 12 items exhaust a level within a session, make a replay the same session, and cannot
supply the *second same-count-different-layout* item the re-queue rule needs. Also fixed: the
spec's distractors make the correct answer the numerically **middle** value in 9 of 12 items —
"pick the middle number" wins without counting [F-65]; the rank is now ≈⅓ low / ⅓ mid / ⅓ high per
level. Dropped: the out-of-domain distractor `11`, the duplicated `(8; 7, 9)`, and every 6↔9 pair.

- **L1** counts 2-5, one row · **L2** counts 5-8 · **L3** counts 7-10, second row offset.
- Five conservation pairs across the pools, e.g. `L2b (5 berries → 512 px wide)` vs
  `L2a (6 berries → 184 px)`, and `L3c (7 → 384)` vs `L3g (7 → 276)` — same count, two widths,
  and those two re-queue against each other.
- No item repeats a `(count, rows, pitch)` triple.

### Rules

- 8 items. **Up:** 2 consecutive first-try correct → one level up (cap L3). **Down:** 2 of the last
  3 not first-try, *or* solved-with-help → one level down (floor L1). Never more than one level per
  item. This matches 002 exactly [F-46 reconciled with §8] — a child plays both games and
  difficulty must behave as one behaviour across the catalogue.
- **Ladder:** attempt 1 unaided → attempt 2 guided re-count (+ cardinality fade, + conservation
  re-lay when earned) → attempt 3 the game tags 1…N−1, outlines the **last** berry, the child taps
  it, and the show-me ring appears with the other two tiles disabled. No attempt 4, no way to stall.
- **Re-queue [F-41]:** a missed count re-enters at index+3 (a second miss at +5), never
  back-to-back, max 2 pending, as a *different pool item with the same count, different distractors
  and a different layout* — re-presenting the identical picture tests memory, and re-presenting the
  same arrangement forfeits the conservation re-test.
- **Praise fires only on first-try** (002's precedent: with three tiles, two wrong taps leave the
  answer by elimination, so the celebration is the only thing separating knowing from guessing).
  Solved-with-help still gets the feed animation and the rail dot.
- **Idle cue** at 12 s then +20 s then stop (the spec's 6 s repeating forever nags hardest at the
  child thinking hardest); it pulses only the *next un-counted berry* — telling the child what to
  do, not that they are slow. Nothing about time is displayed; nothing can end.
- **Tapping the fox replays the count**, free, once per item — child-initiated help beats
  machine-initiated nagging (002's hen precedent).
- The feed animation replays the rising tone ladder one berry at a time, is **identical** for
  first-try and solved-with-help, and the bowl **empties every item** (an accumulating bowl is a
  score) [F-44, F-63].

### Caption ruling

**Keep "How many?"** at 002's exact coordinates with 002's translations. F-42's "zero text at 5-6"
targets *extraneous* text; BUILD-CONVENTIONS §9 explicitly permits a ≤3-word 5-6 string paired with
an ART element, and §6 *requires* the task to be visible. The non-reader is carried by the item-1
demo, the fox's bubble, the tone ladder and self-evident numerals. Acceptance test added to the
checklist: **with the caption hidden and `?sound=off`, a five-year-old must still find the first
move** — if that fails, the demo is wrong, not the caption.

### Delete-the-question test [F-63]

Passes. Remove the question and what survives is berries that grey under your finger and a fox that
eats them — no goal, nothing to be right about, no arcade. The one residue named honestly: the feed
animation is completion-contingent, so it is made identical whether or not the child was right.

## Content — the title does not survive, and one locale is grammatically wrong

**"Feed the Fox" is rejected.** Three defects, one of them behavioural: it is an imperative telling a
child to feed a wild animal, and all eleven countries signpost the opposite in words a five-year-old
has had said to them (*Bitte nicht füttern · Niet voeren · Mata inte djuren · Älä ruoki eläimiä*).
Fox-feeding near settlements is a live issue in DE/NL and the Nordics. The imperative also forces a
verb whose government differs sharply (Finnish needs the partitive `Syötä kettua`, and *syöttää*
also means to feed data or pass a ball; sv/da/no *mata/fodre/mate* carry an animal-husbandry sense).
And it names the reward, not the thinking — the house style is *Frog Hops*, *Balance Pans*,
*Number Nest*, each naming the thing that IS the maths.

**Replacement: "Strawberries for the Fox"**, rebuilt natively in all eleven. **The slug stays
`feed-the-fox`** — exact precedent from 002, whose slug is `numeral-nest` while its title is "Number
Nest". `CATALOGUE.md` row 001's title cell changes with it (the hub reads the title from there).

Rejections worth recording, because each is the `munat` class:

- **sv/da/no `Bär till räven` / `Bær til ræven` / `Bær til reven`** — `bär`/`bær` is simultaneously
  the noun "berries" **and the imperative of "to carry"**. Title-initial, a Swede reads
  **"Carry to the fox!"** first. This is the `banan` collision exactly. Fixed by naming the
  strawberry: `jordgubbar` / `jordbær`.
- **fr `baies` / it `bacche`** — a strawberry is not botanically a berry; those are the botanical
  words, and an adult reading them beside a drawn strawberry sees an error. `fraises` / `fragole`.
- **es: never `la zorra`.** The feminine is a strong vulgar insult across Spain and Latin America.
  **The Spanish fox is masculine `el zorro`, permanently, in this and every future game.** Note the
  reverse in Portuguese — feminine `a raposa` is the neutral standard word — so anyone
  "harmonising" es with pt would break Spanish.
- **es `frutillas`** is Southern-Cone only; `fresas` is pan-Hispanic.

**The caption cannot be copy-pasted from 002 — and this is the finding that would otherwise ship
silently.** `¿Cuántos?` agrees in gender with the counted object. 002 counts `huevos` (masculine);
001 counts `fresas` (**feminine**) → **`¿Cuántas?`**. Italian `Quante?` is correct here only by
coincidence (`fragole` and `uova` are both feminine plural) — worth recording, because the next
Italian counting game over a masculine object needs `Quanti?`. Everything else is byte-identical to
002 by design. **The developer agent flagged this independently** — two agents, separate briefs,
same defect.

**Praise: `["well_done", "you_did_it", "keep_going"]`**, identical to 002. Verified against the
actual strings rather than from memory, and **the `excellent` finding is broader than 002 recorded**:
not five locales but **seven** render it as the literal top school-assessment grade — de
*Ausgezeichnet*, nl *Uitstekend*, sv *Utmärkt*, da *Fremragende*, no *Utmerket*, fi *Erinomaista*,
it *Eccellente*. 002's BUILD-LOG entry should gain `nl` and `it`.

**No `LOCALE_DATA` at all** — everything on screen is a quantity, a Western Arabic numeral (no digit
variation anywhere in these eleven), or one of the two STRINGS keys. `check-build` only validates the
block *if it exists*, so omitting it is gate-clean. The builder must not invent one.

Two standing constraints for the remaining 199, both bought here: **the fox never eats or wants
anything animal** (002's mascot is a hen, and two adjacent hub cards must not read as a food chain),
and **Spanish uses `el zorro`, never `la zorra`**.

Fit: captions run 0.78×–1.22× English, all inside the 1.6× budget, all one line. Titles run 17–24
chars against a ~24-char one-line budget at 52 px — en/de/pt sit at the wrap edge, which is safe
(centred two-line wrap, 348 px of vertical room) **but must be confirmed on the 704 render, not
assumed**. `[NSR-FLAG]` on the sv/da/no/fi **titles only**; the captions are shipped 002 text.

## Developer — the spec's layout numbers do not fit, in four places

The implementation plan is settled (scenes, phases, the drainer, the depth ladder, the gate
walk-through). What matters at approval time is that **reading the gates and doing the arithmetic
refuted the spec's geometry four times**:

1. **n = 10 in one row is impossible.** `10×80 + 9×12 = 908 px` — wider than the whole 720 stage.
   The real rule is not "two rows above 5", it is **5 per row is the hard ceiling**, derived from the
   80 px tap floor plus the 12 px gap floor. Everything ≥ 6 is two rows; 10 is exactly 5 + 5.
2. **The spec's two-row y values give a ZERO vertical gap** — rows at 130 and 210 span 90…170 and
   170…250, so the tiles *touch*. Corrected to **y = 130 / 222** (gap exactly 12).
3. **The spec's one-row centring collides with the fox.** `x = 360 − (n−1)×46` puts the n=5 first
   tile's left edge at 136, inside the fox (60…156) and the bowl (98…154). The berry field is
   **x 190…704, centred at 447**, not 360 — the fox's column (bubble to x 174) is the constraint.
4. **The spec's L3 `+40` row offset overflows the right margin.** Corrected to a symmetric **±20
   stagger**, same "not a 2×5 array" reading at half the cost.

Plus two more the spec could not have known:

- **`ART.totalNumeral` at (392, 96) cannot exist** — every two-row layout puts row 1 at y 90…170, so
  a 52 px numeral at y 96 sits *on* the berries. The total lives in the fox's bubble, which is
  already the voice slot and where the question was asked (002's proven three-state bubble). This is
  moot for the pre-answer total, which change **A** deletes, but the *correction* still needs it.
- **A corner count-badge is arithmetically impossible.** On a 92 px pitch, a badge of radius *r* on
  the tile corner leaves `12 − r` clearance, so **any radius above 12 px overlaps the next tile** —
  while a circle holding a 40 px digit needs r ≈ 15, and `"10"` needs a 52×40 pill. **Fix: the
  numeral goes INSIDE the tile and the berry tucks up to make room** (berry 52 px → scale 0.65,
  y −22; numeral 40 px centred at y +16). Because nothing leaves its own 80×80 box, **inter-tile
  clearance is exactly the tile gap, at every count, in every layout, with no per-count check
  required.** 002's eggs-outside-the-nest defect is impossible here by construction.
- **The Finish buttons touch.** The spec's 250 / 470 with 220-px-wide buttons span 140…360 and
  360…580 — they meet at exactly x = 360. Corrected to **236 / 484** (gap 28).

Structural decisions that carry to the other 198:

- **All ten berry tiles are created once**, in `create()`, and the first *n* are shown per item.
  `game-core` keeps ONE global button list with ONE focus index, so destroying tiles per item would
  put recreated berries *after* the numerals in Tab order and call `_removeButton` 80× a session.
  Cost: hidden tiles still sit in the Tab list, so `Play.update()` bounces the focus ring forward
  off any hidden-or-disabled entry. Do **not** fix it with `container.setActive(false)` —
  `pruneButtons()` would delete the tile permanently with no re-register path.
- **The Boot fox must not be interactive.** `qa-game`'s POINTER check clicks the *biggest*
  interactive target and demands it enters Play; a 112 px fox would outrank the 220×72 Start button
  and fail a correct game.
- **Every `kind:"svg"` entry goes through `LCSArt.get()`, never an inline string** — check-build's
  matcher is `kind:\s*"svg"[^}]*\}`, and `[^}]*` stops at the first brace, so an inline SVG
  containing any `style="…"` silently truncates the match.
- **The stage stays 720×560.** `qa-game` hardcodes `/720` and `/560` in ALIGNMENT and POINTER, so a
  taller stage would click the wrong pixel — and could pass by luck.
- **`LCS_TEST.wrong()` must drive the counting too.** The gate fires `wrong()` then `correct()` on a
  350/900 ms cadence, but the numeral tiles do not become answerable until every berry is tapped, so
  a numeral-only `wrong()` would evaporate forever. Any pending intent means "bring this item to an
  answerable state": the drainer taps one uncounted berry per frame **through the tile's own pointer
  handler**, and there is no private set-state path anywhere in the file. Measured budget: ~10.1 s
  worst-case item, ~65 gate steps against the 400 bound — **6.2× headroom**.

### The one conflict between agents, and how it resolves

The pedagogue authored the pools with pitches {92, 110, 128} and rows chosen per item, to build the
five **conservation pairs** (a larger set drawn *narrower* than a smaller one) that give misconception
4 a real response. The developer then measured the actual berry field — **514 px, not the full
stage**, because the fox's column takes x ≤ 174 — and found `80 + (n−1)·pitch ≤ 514`, which excludes
several of those pitches (n = 5 at 116 already needs 544 px).

**The measurement wins; the intent is preserved.** Conservation pairs remain a hard authoring
requirement, but the pitch table is re-derived against the measured field: one row allows pitch up
to `434/(n−1)` (n=2 → any; n=4 → ≤144; **n=5 → 104 max**), and two-row layouts may also vary their
pitch, since a row of ≤5 has the same budget. That is more than enough to keep pairs like *4 berries
spread wide (464 px) vs 6 berries in two tight rows (264 px)*. The exact per-item table is computed
at build time and **verified by the probe on the live DOM at every count 2→10** — measured, not
trusted. This is the "measure the law before you gate it" discipline: the pedagogue's *rule* was
right and its *numbers* were unmeasured.

### Policy switches (data, not structure) — set to the pedagogue's rulings

`TILES_LOCKED_UNTIL_COUNTED = false` (unlock after the first berry) · `DEMO_ITEM1 = "one-tap"` (not
the full count) · `TOTAL_SLOT = "bubble"` · `FREE_RECOUNT = true` (tap the fox) ·
`PRAISE_FIRST_TRY_ONLY = true` · `STUCK_MS = 12000` then `+20000` then stop · `REQUEUE_GAP = 3` ·
`ROW_MAX = 5` (**derived from the 80 px and 12 px floors — not free**).

## Art direction — the palette has no red, and that decides the game's identity

Three rulings drive everything visual, and the first two forced an operator decision.

**R1 — the fox's body is `#C2603C` (the `accent` DARKER tint), not coral and not near-white.** A fox
is orange, `accent` is orange, and `accent` is the *state* colour. All three alternatives were
rejected on evidence: a `#F6A07E` body is indistinguishable from state coral to a five-year-old and
spends the highlight colour on something that never changes; a cream/white body (the hen's own
construction) **repeats a known unfixed weakness** — BUILD-LOG still lists "the hen's near-white body
on cream leans on its 3 px outline alone for separation" as open, and this is a bigger, more central
character; and a teal body is a *semantic* collision, not merely a chromatic one, because teal means
counted/chosen/correct in this game.

**R2 — the berry cannot be a strawberry, because there is no red in the palette.** Coral would put
ten `accent` objects on one screen (an unarguable rubric-3 failure); teal would lose figure/ground
inside the teal counted cell at exactly the moment the child re-counts, and that is not an edge case
because every cell ends up counted; white is owned by `egg`. **Ruling: `#55555F`, the `inkSoft`
darker tint — a deep slate bilberry**, which is also what a fox actually eats. It is the darkest
thing on a screen that is otherwise all cream and white, it is not a brand colour so it can never
compete with meaning, and it separates cleanly from the fox in both hue and value.

**→ Operator decision:** the title names no fruit at all — **"The Fox's Bowl"**. That resolves the
title/picture contradiction at source and keeps the imperative fix. The eleven titles are being
authored natively now, and the fruit change **re-opens the Spanish and Italian captions** — `fresas`
is feminine but `arándanos` and `mirtilli` are masculine, so `¿Cuántas?` reverts to `¿Cuántos?`.
Exactly the defect class the content panel caught the first time, pointing the other way.

**R3 — the cell is drawn, but at zero fill contrast.** Uncounted = `bg` fill with a `line` hairline:
cream on an off-white mat on a cream ground, three values within 2% of each other. It vanishes at
400 px so the field reads as *berries on a patch*, and up close it still says "tap here". Because
uncounted cells are near-invisible, **the counted cells are the only things on the mat that read as
cards**, which makes the state change enormous rather than incremental. This is the right answer to
a real tension: the child counts berries but taps cells, so a grid of white cards would insert a
second countable object and train one-to-one on the wrong thing.

### The proposed ART-BIBLE §9.4 — the warm-body clause

The fox's body IS its §9.2 identity feature, but a body is not a comb, so the exemption must be paid
for. Proposed amendment, to be added during the build:

> A mascot whose BODY is an `accent` tint spends its entire identity exemption on that body.
> `#F6A07E` and `#F2784B` may then appear **nowhere** on that character, and the game's state coral
> must be (i) geometric rather than organic, (ii) ≥ 120 px from the character's bounding box, and
> (iii) ≤ 600 px². Such a game declares **exactly one** `accent` entry in its ART registry — one
> grep, one number.

This game satisfies all three: its only coral is the r-5 current-item rail dot (79 px², circular,
152 px from the fox). The check is mechanical — grep the ART registry for `"accent"`, expect one
match. The clause will apply again to at least seven more of the fifty mascots (squirrel, deer,
lion, hamster, dog, cow, rooster).

**Finding against the already-shipped 002:** `numeral-nest` declares *two* `accent` entries —
`dotNow` and `sitBar` — and `sitBar` appears during the mirror cue while `dotNow` is on screen, so
that frame carries two corals. Not this build's job, but it should be re-graded before 003 inherits
the pattern.

### Composition and the art/developer reconciliation

The art director and the developer derived the layout independently and agree once the same field is
used. Where they differ I take the art director's numbers, because they are anchored to **002's
actually-shipped metrics** so the two games' answer rows are interchangeable to the eye:

- **Cells 80 × 84** (not 80 × 80) at pitch 92 h / 100 v, rows at **y 118 / 218** — 80-tall tiles at
  an 80 pitch touch exactly, and 84/100 gives a 16 px vertical gap.
- **Numeral tiles 104 × 104 at x 232 / 360 / 488, numeral 72 px** — 002's shipped values.
- **One scene element: `patchMat`**, a 516 × 196 `surface2` roundRect at (446, 168), depth 0, behind
  every cell. **No ground band** — 002's would cross behind row 2 and must not be copied here.
- **The in-cell numeral at 40 px, y +23, berry 38 px at y −17** — 5 px and 6 px from the cell edges,
  18 px each side even for "10". The spec's own `countBadge` (r 18, numeral **22 px**) is internally
  inconsistent: it avoids the overlap only by breaking the §12 40 px floor, and a compliant 52 px
  badge overlaps the neighbour by 8 px.
- **Binding constraint, whole layout: at 400 px a cell is 44.4 × 46.7 real px — 0.4 px above the
  floor.** Do not shrink the cell, do not add a row, do not reduce the pitch. Two rows of five at
  this cell size is the maximum this stage holds at 400 px, and n = 10 is the spec's ceiling — they
  meet exactly.

### The cardinality moment, redesigned

The spec has a separate total numeral appear at (392, 96) *from nowhere*, over the berries. Instead:
**the last berry's own numeral lifts out of its cell and flies to the bubble, growing 40 → 56 px**,
landing where the "?" was, while the original stays in its cell so the trail 1…n survives intact.
That is the cardinality lesson as one movement — *the last number you said, becoming the answer to
how many* — and it preserves the causal link the spec's version breaks.

**The persistent numeral trail is also why 002's fix does not transfer here.** 002 moved the count
into the bubble because a badge could not fit its 35 px egg; but this game's misconception-2 response
*is* the ordered trail with 1, 2, 3, 4 all visible at once, and a bubble shows only the latest.

### The berries must arrive INSIDE the bowl

`bowl` and `bowl.rim` are two entries in the same 96 × 44 frame, the near rim drawn *after* the
berries so arriving berries tuck behind it. This is the `nest` / `nest.rim` lesson and it is the
single most valuable thing 002 bought for this build — without it the berries read as stuck to the
outside of the dish, which is exactly what the operator reported on 002.
⚠ Both are **non-square: their ART rows must read `size: 96, w: 96, h: 44`** or `drawArt` renders a
64 × 29 stamp with no error and no console warning.

### Art entries: 8 new shared, 0 game-specific inline

`fox.idle` · `fox.think` · `fox.happy` · `fox.oops` · `fox.munch` · `berry` · `bowl` · `bowl.rim` —
all registered in `_lib/art.js`, so the next game that wants a fox, a berry or a bowl gets them free.
Built to the hen's template: one shared body string plus a swapped head group per pose, with the
**tail** as the one varying `<g transform>` (the hen varies its wing the same way). The fox's
silhouette inverts the hen's: where the hen's beak is *inside* the body outline, **the fox's muzzle
breaks the skull circle**, and the load is carried by tail plume, ears, then muzzle. Eye separation
is re-derived, not copied — the general rule behind the hen's finding is **separation ≥ 2r + 3**.
`bowl.full` is deliberately *not* an entry: the finish heap is `bowl` + five real `berry` + `bowl.rim`,
so it can never drift out of sync.

### Resolved conflict: blank tiles vs live tiles

The art director wants the numeral tiles **blank until the count completes** (three 72 px numerals
are the loudest thing on the stage and allow guess-by-matching). The pedagogue wants them **live
after the first berry** so that answering early is a readable diagnostic. **The pedagogue wins** —
the art director explicitly deferred this as a pedagogy call, and an early answer is the observable
form of two of the four misconceptions. The hierarchy concern is met instead by `patchMat`, which
makes the berry field the biggest thing in zone A.

### Critic checklist — six game-specific points beyond the 14

15. Is the child counting **berries or cells**? The berry must be figure, the cell ground, in every still.
16. Does the **trail survive**? After the last tap all n numerals must be on screen at once, in order, none clipped.
17. Do the berries arrive **inside** the bowl? Capture the feeding at 60% — an arriving berry must be occluded by `bowl.rim`.
18. **Poison the non-square check**: drop `size` from the `bowl` ART row and confirm the 64 × 29 stamp appears. This failure is silent.
19. **Two rows of five at 400 px**: ten berries, ten numerals, nothing clipped, nothing outside x ∈ [16, 704].
20. **Fox-vs-coral separation ≥ 120 px** (§9.4 clause ii).

Plus two measurement disciplines bought on 002: grade outline weights in **logical** px, not the 2×
render (002's critic read anti-aliasing as stroke and filed two false defects), and grade `fox.oops`
at **420 ms**, inside its 500 ms hold (002's critic captured at 1400 ms and wrongly reported the
mascot never reacts).

## Fixed constraints (from the contract, not negotiable)

| Rule | Source |
|---|---|
| One file: `games/feed-the-fox/index.html`, §1 skeleton verbatim, five `_lib` scripts in order | BUILD-CONVENTIONS §1 |
| Stage 720×560 logical, `RENDER_SCALE = 3`, `stageCam(this)` as the FIRST line of every `create()` | §1, §2 |
| Tap floor **80×80** for the 5-6 band, gaps ≥ 12 px | §3 |
| Hit rect `Rectangle(0,0,w,h)` for centred art; `Rectangle.Contains` **capital C** | §3.1 |
| Chrome (language picker) at depth 1500 — nothing a game depths or re-creates may cover it | §3.2 |
| ART registry is the only place a picture is described; `drawArt` is the only way one is drawn | §4 |
| ANIM registry is the only place motion is described; `playAnim` runs it | §5 |
| STRINGS ×11 locales or it is not built | §17 |
| `window.LCS_TEST` with ready/scene/strings/start/wrong/correct/targets, **no private set-state path** | §16 |
| No `vh`, no `ResizeObserver`, no emoji on the play surface, no raw hex outside `<style>` | §1, §4, check-build |

### Traps already paid for (BUILD-LOG 002) that this build must avoid by construction

1. `ANIM.appear` / any tween of raw `scale` on a `kind:"svg"` entry renders it **double size** —
   `preloadArt` rasterises at 2×, `drawArt` compensates with scale 0.5. Wrap in a container,
   animate the container.
2. A non-square svg entry MUST set `size === w` or `drawArt` renders a postage stamp, silently.
3. `makeLanguagePicker` leaks a ScaleManager resize listener — use the `addPicker()` wrapper that
   diffs the emitter's listener list and drops only what the call added.
4. A synthetic `emit()` is not a tap. At least one assertion must drive a **real pointer**.
5. Screenshots must be read at **desktop** width, not only 400.
6. Never run a global regex over `_lib`.

## The eleven locales (final)

The re-audit of "The Fox's Bowl" paid for itself three times over — every one of these is the
`munat` class, and none is findable from English:

- **`skål` is the TOAST in Swedish, Danish AND Norwegian**, and `X:s skål` is the *fixed idiom* for
  a toast to X — so "Rävens skål" reads to an adult as **"a toast to the fox"**. One word, three
  locales. The fix is a compound, not a different root: `matskål` / `madskål` / `matskål` cannot be
  read as a toast, still contain the word the child knows, and read *warm* (the cat's bowl at home)
  where a real trough (`tråg`, `ho`) reads cold. Finnish `malja` carries the identical trap; `kulho`
  is clean.
- **Norwegian `bolle` is a bun — and `å bolle` is crude slang for having sex.** "Revens bolle" would
  be read that way by any Norwegian adult. Hard reject.
- **Dutch bare `Kom van de vos` reads as the imperative "Come away from the fox!"** (`kom` is also
  the imperative of *komen*). The noun is right; **the definite article `De` is load-bearing.**
- **German `Napf` is an animal's floor-level feeding bowl** (Hundenapf) — it makes the fox a pet
  being fed rather than a character sharing a meal, and a child without a pet does not know the word.
  **`Schale` is also peel/shell** (Bananenschale), which is unfortunate on a screen full of fruit.
  `Schüssel` is the child's cereal bowl. German takes the dative `vom` because the genitive
  `des Fuchses` is a form a five-year-old never hears.
- Trough words rejected in four more: fr `gamelle`, es `comedero`, pt `comedouro`, nl `voerbak`.

```js
const STRINGS = {
  en: { title: "The Fox's Bowl",         howMany: "How many?"   },
  de: { title: "Die Schüssel vom Fuchs", howMany: "Wie viele?"  },
  fr: { title: "Le bol du renard",       howMany: "Combien ?"   },
  it: { title: "La ciotola della volpe", howMany: "Quanti?"     },
  es: { title: "El tazón del zorro",     howMany: "¿Cuántos?"   },
  pt: { title: "A tigela da raposa",     howMany: "Quantos?"    },
  nl: { title: "De kom van de vos",      howMany: "Hoeveel?"    },
  sv: { title: "Rävens matskål",         howMany: "Hur många?"  },
  da: { title: "Rævens madskål",         howMany: "Hvor mange?" },
  no: { title: "Revens matskål",         howMany: "Hvor mange?" },
  fi: { title: "Ketun kulho",            howMany: "Montako?"    }
};
```

**The Italian caption diverges from 002, and that is the finding.** The caption is derived from the
*object*, never inherited. 002 counts `uova` (feminine) → `Quante?`; 001 counts `mirtilli`
(**masculine**) → **`Quanti?`**. Copying 002 here would have shipped a grammatical error onto the
screen. Spanish lands back on `¿Cuántos?` — but by *coincidence* (both `huevos` and `arándanos` are
masculine), not by inheritance. **Standing warning: if the object is ever re-described as a
blackberry (`mora`, feminine), es and it must be re-derived a third time — the object is never named
on screen, so nothing else in the game will catch it.**

Titles run 11–22 chars against a ~24-25 one-line budget; nothing is expected to wrap, and this set is
materially safer than the strawberry set it replaces. `[NSR-FLAG]` on the sv/da/no/fi titles only —
three of them rest on the substantive `skål` editorial call, which is exactly what a native reviewer
should confirm. Captions are shipped 002 text in ten locales.

## Build steps

1. **Round-2 artefact agents** (the workflow's round 2 — they produce artefacts, so they run after
   approval, not in plan mode): the **artist** draws the 8 SVG entries into `_lib/art.js` to the
   briefs above plus a contact sheet at 48/96/192 px; the **graphic designer** fixes the per-level
   coordinate tables; the **animation agent** writes the `ANIM` registry with a timing table.
2. **`_lib/art.js`** — register `fox.idle/.think/.happy/.oops/.munch`, `berry`, `bowl`, `bowl.rim`;
   add the §7 index rows. Re-run `node games/_test/run-tests.js` (85 tests) — `LCSArt.get` throws at
   load time on a typo, which would surface as an 11-locale BOOT failure otherwise.
3. **`ART-BIBLE.md`** — add §9.4 (the warm-body clause) and the new §7 index rows.
4. **`CATALOGUE.md` row 001** — title cell → "The Fox's Bowl"; description cell → the berry wording.
   One line. The hub reads its title from here.
5. **`games/feed-the-fox/index.html`** — the §1 skeleton verbatim, then the registries, the three
   scenes, the phase machine, the deferred-intent drainer, and the `LCS_TEST` hook. Budget ≈ 1,100
   lines against check-build's 1,200 ceiling; if it runs long, comment density gives, never a function.
6. **`_tools/probe-feed-the-fox.js`** — modelled on `probe-numeral-nest.js`, asserting the six things
   the gate structurally cannot reach (geometry at every count 2→10 on the live DOM; one-to-one;
   the show-me ring; a real wrong frame; brute-force never reads as success; `fox.oops` at 420 ms).

## Verification (the gates, in order, none skippable)

1. `node games/_tools/check-build.js feed-the-fox` → PASS
2. `node games/_tools/qa-game.js feed-the-fox` → PASS (11 locales boot, never auto-starts, ≥7
   distinct Start labels, POINTER + ALIGNMENT with a real mouse, a full en session with a wrong
   answer on every item reaches Finish at 400/704/1024, targets ≥ 44 px real)
3. `node games/_tools/probe-feed-the-fox.js` → the states the gate structurally cannot reach
4. `node games/_test/run-tests.js` if `_lib` changed
5. Visual-critic agent over the FULL screenshot sweep against ART-BIBLE §8 (14 points)
6. **I read the 704 and 1024 renders myself**, plus two non-English start screens
7. Pedagogue sign-off on the BUILT pools and feedback
8. `node games/_tools/build-hub.js`

Then: append the `BUILD-LOG.md` entry, move `NEXT:`, update memory, commit with explicit paths,
start `node games/_tools/serve.js` and hand over `http://localhost:8480/feed-the-fox/index.html?lang=en`
plus the ten other locales. **No deploy** — deployment is a separate commission after all 200.
