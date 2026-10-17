# New 288 — The Walking Dividers: open them once, and every step is the same size (3.OA.A.1)

> The working title was "The Measuring Rod". A rod laid end to end is the same mechanic as New 252 The Washing Line (bags end to end) and Row 100 The One-Hop Helpers (hop exactly one helper long). The invention is replaced by a navigator's pair of dividers. Key and files stay `skip-rod`; the page title and the invention are **The Walking Dividers**.

## 0. Identity
- id `skip-rod.play.3-oa-a-1` · grade 3 · CCSS 3.OA.A.1 (and 3.OA.A.2 as measuring) · strand Operations & Algebraic Thinking · files `mini tools/skip-rod-core.js`, `skip-rod-activity.js`, `skip-rod-activity.html`, `skip-rod-activities.json` (scaffold `node scripts/new-activity.js --num=288`).
- worksheets covered: **G3-308 "Multiplication Hops"** (follow the equal hops from zero, write each landing) · **G3-310 "Hop Down to Zero"** (count the equal hops back to zero, write how many).
- a new instrument (no old activity).

## 1. The pitch
"Open the dividers to the step size and walk them along the number line, leg over leg: the span is locked, so every step is exactly the same, and 6 × 4 is where six steps of four land."

## 2. Why a child will want it again (the fun)
- **The walk.** A pair of brass-hinged dividers stands on the number line. Each step, the back leg lifts, swings over the hinge in a high arc and plants itself one span further — *tick* — leaving a coloured arc in the air. It is a real navigator's trick and it looks like the dividers are walking.
- **The rainbow.** The arcs stay, in rotating soft colours, so after six steps a little rainbow of hops spans the line — and on success they light up one after another with rising notes (a skip-count song).
- **The lock.** Once the first step is taken, the hinge clicks tight (a tiny padlock on the span tag). Fold the dividers up to change the span. That click is satisfying and it IS the mathematics: equal steps.
- **The dance.** Success: the dividers spin a quick pirouette on their front foot and the landing flag waves.
- Free play: between rounds the dividers can be opened to any span and walked anywhere.

## 3. The skill and the misconception
- **Skill:** a × b as a equal steps of b from 0 — the landing is the product (G3-308; skip counting); N ÷ b as the number of steps of b from N back to 0 (G3-310; division as measuring/repeated subtraction).
- **Misconceptions and how the material pushes back:**
  1. *Counting tick marks instead of jumps* (landing 6 × 4 by counting 24 single ticks, or counting the start as "one"). The dividers never count ticks: the count is the arcs in the air, and the landing is read from the line under the front foot.
  2. *Unequal hops* (one hop of 4, the next of 3 because "it looked right"). The span is locked from the first step — an unequal step is physically impossible, and changing the span means folding up and starting again from the start.
  3. *Confusing the number of steps with the landing.* × asks where the steps END; ÷ asks HOW MANY steps — two different things the child writes in two different flags (the landing flag vs the step count).

## 4. The stage
**Stacked layout** (no `layout:'split'`: the line needs the full 620 px stage at 704; the split column is ~350). Bubble under the apparatus.

| element | 704 px | 360 px | kind |
|---|---|---|---|
| task card (top left): the phrase and the rune, e.g. "6 steps of 4" / "6 × 4"; or "24 ÷ 4 — how many steps of 4 back to 0?" | card 200 × 100 px, numerals 30 px | full width × 70 px, 24 px | content numerals + text |
| **minimap** strip above the line: 0–100 with the arcs drawn small and a frame showing the visible window | 600 × 22 px | 320 × 18 px | drawn |
| **number line**: thick teal baseline, a tick every 1, numerals every 5 (bold every 10); it pans to keep the dividers centred | 12 px per unit; numerals 16/20 px | 8 px per unit; numerals 13/16 px | drawn |
| **dividers**: two teal legs, a brass hinge, a span tag on the hinge (the span numeral, ▲ ▼ to set it) | legs 120 px; span numeral 26 px; tag buttons 44 px | legs 86 px; 22 px; 44 px | drawn |
| **arcs**: one per step, above the line, in rotating colours; a pin dot at each landing | 3 px stroke | 2.5 px | drawn |
| **step button** (a big round button with a walking-legs glyph drawn as two lines) and **fold-up** button | 64 px / 48 px | 56 px / 44 px | drawn |
| **flag** at the front foot (× and landings) or **step-count tag** (÷), with a keypad | keys 48 px | keys 44 px | drawn keypad |
| Check | shell button | above the 360×740 fold | shell |

- No library picture: the apparatus is the hero, like the reference tools. No words on the apparatus: numerals only; the task card is the task line.
- **Task lines (EN):** × — "Open the dividers to {b}. Walk {a} steps from 0. Where do they land?" · × with every landing — "Open the dividers to {b} and walk from 0. Write where each step lands." · ÷ — "Start at {N}. Open the dividers to {b} and walk back to 0. How many steps?"

## 5. The hand
- **Set the span:** drag the free leg's foot along the line (snaps to whole numbers 1–10, 80 ms) or tap ▲ ▼ on the span tag. The span numeral updates instantly.
- **Step:** tap the step button, or drag the back leg up and over the hinge. The back leg rises, swings over in a 320 ms arc (the arc is drawn as it goes) and plants one span ahead (× forward; ÷ towards 0). *Tick* (pitch rises one note per step). The line pans smoothly (240 ms) so the dividers stay centred.
- **Lock:** the first step tightens the hinge (*click*; padlock on the tag; ▲ ▼ greyed). **Fold up** puts the dividers back at the start with no arcs and unlocks the span.
- **Bounds:** the line ends at 0 and 100 with a wall; a step that would pass a wall is refused with a 6 px bump (in ÷ rounds, if the span does not fit evenly, the last step bumps the 0-wall — the hint then explains).
- **Keypad:** × — the landing number goes in the flag (every-landing setting: a flag at each landing must be filled before the next step is allowed); ÷ — the number of steps goes in the step-count tag.
- Everything is undoable by fold-up until Check.

## 6. The rounds
Order-only reshuffle per pass, never the same order twice, never the same span twice running.

**Mode × · Spans 2, 5, 10** (every landing written — G3-308):
7 steps of 2 → 14 · 4 of 5 → 20 · 6 of 10 → 60 · 9 of 2 → 18 · 9 of 5 → 45 · 8 of 10 → 80 · 5 of 2 → 10 · 7 of 5 → 35 · 10 of 10 → 100.

**Mode × · any span 2–10** (final landing only):
6 of 4 → 24 · 7 of 8 → 56 · 3 of 9 → 27 · 8 of 6 → 48 · 9 of 7 → 63 · 4 of 3 → 12 · 5 of 8 → 40 · 10 of 9 → 90 · 2 of 7 → 14.

**Mode ÷ · spans 2, 5, 10** (G3-310):
16 by 2 → 8 · 45 by 5 → 9 · 70 by 10 → 7 · 10 by 2 → 5 · 35 by 5 → 7 · 90 by 10 → 9 · 8 by 2 → 4 · 40 by 5 → 8 · 30 by 10 → 3.

**Mode ÷ · any span 2–10:**
24 by 4 → 6 · 56 by 8 → 7 · 27 by 9 → 3 · 42 by 6 → 7 · 63 by 7 → 9 · 18 by 3 → 6 · 40 by 8 → 5 · 72 by 9 → 8 · 35 by 7 → 5.

**Mode both** alternates the two tables of the chosen span setting (18 rounds, × and ÷ interleaved).

**Measured** (re-checked by the critic with an own script, `work-c40/c288.js`; the gate re-measures):
- No product repeats inside a × table; no start number repeats inside a ÷ table.
- *Where on the line* (landing / start, by decade 1–10 … 91–100): × spans 2,5,10 — 1, 3, 0, 1, 1, 1, 0, 1, 0, 1; × any — 0, 2, 2, 1, 1, 1, 1, 0, 1, 0; ÷ spans 2,5,10 — 2, 1, 1, 2, 1, 0, 1, 0, 1, 0; ÷ any — 0, 1, 2, 2, 1, 1, 1, 1, 0, 0. The 2-times table cannot go past 20, so the lower decades carry it; the panning line means position is never seen as "left/right of the screen" anyway — the answer is a typed number.
- *Answer spread:* ÷ answers 8, 9, 7, 5, 7, 9, 4, 8, 3 and 6, 7, 3, 7, 9, 6, 5, 8, 5 — no value more than twice. The span is never the answer (span ≠ quotient and span ≠ product in every round).
- *Shortcut bots:* "type the span" wins 0 rounds; "type a × b read off the card" is the skill itself (the × card shows a and b; G3-308 is exactly that).

## 7. Check, the misses, the success
- **Check with no steps** → hint, no miss: "Open the dividers to {b}, then press the step button." · **no answer typed** → "Write your answer in the flag."
- **Wrong span:** miss 1 — the span tag and the card's {b} both glow (two different numerals) and the arcs flash. Hint EN: "Each step must be {b} long. Fold up and open the dividers to {b}."
- **Wrong number of steps (×):** miss 1 — the arcs number themselves 1, 2, 3 … above. Hint EN: "Count your arcs. The card asks for {a} steps."
- **Wrong landing typed (×):** miss 1 — the arcs number themselves and the line numerals near the front foot enlarge to 24 px. Hint EN: "Read the number right under the front leg." Miss 2 — every landing gets its number under the line (4, 8, 12 …), as on the worksheet. Hint EN: "Count by {b}s: {b}, {2b}, {3b} …"
- **Wrong count (÷):** miss 1 — the arcs number themselves. Hint EN: "Count the arcs — each arc is one step." Miss 2 — each landing is labelled on the way down ({N}, {N−b} … 0) and each arc carries "−{b}". Hint EN: "Every step takes away {b}. How many times until 0?"
- **÷ span that does not reach 0 evenly:** the last step bumps the 0-wall; hint (no miss): "That step would go past 0. Is your span {b}?"
- A fold-up or new step clears the miss showing.
- **Success:** the arcs light in sequence with rising notes, the dividers pirouette on the front foot, the flag waves. Bubble EN: × — "{a} steps of {b} land on {p}: {a} × {b} = {p}." · ÷ — "{N} back to 0 in steps of {b} takes {q} steps: {N} ÷ {b} = {q}."

## 8. Settings
1. **Mode:** lay out (×) / measure back (÷) / both. At rest: the dividers start at 0 or at N, facing the way they will walk.
2. **Spans:** 2, 5, 10 (every landing written) / any 2–10 (final answer only). At rest: the card's numbers change; in the 2/5/10 setting empty landing flags show where steps will land after each step is taken (they appear one at a time, never in advance).

## 9. Words (EN source)
- title **The Walking Dividers** · instruction "Open the dividers to the step size, then walk them along the line."
- task cards `cardMul` "{a} steps of {b}" + rune "{a} × {b}" · `cardDiv` "{N} ÷ {b} — how many steps of {b} back to 0?"
- prompts `promptMul` · `promptMulEvery` · `promptDiv` (section 4).
- hints `hintStart` · `hintWrite` · `hintSpan` · `hintSteps` · `hintRead` · `hintCountBy` · `hintArcs` · `hintTakeAway` · `hintWall` (section 7).
- celebrations `winMul` · `winDiv`.
- settings "Mode" — "lay out (×)" / "measure back (÷)" / "both"; "Spans" — "2, 5, 10" / "any 2 to 10".
- aria `srDividers` "The dividers are open to {b}. They stand on {x}. {k} steps so far." · `srStep` "Step {k}: landed on {x}." (spoken only after Check or in the every-landing setting after the child writes it — never before, so the answer is not read out).
- **Locale traps:**
  - *Signs* from `notation.js`: × en/fr/es/pt/it/nl, · de/sv/da/no/fi; ÷ en/fr/es/pt, ":" de/it/nl/da/no/fi, "/" sv. The card's rune uses the locale sign.
  - *"Steps of 4"* — the classroom word for a number-line move: de "Sprünge" ("6 Sprünge zu je 4"), fr "bonds" ("6 bonds de 4"), es "saltos" ("6 saltos de 4"), pt "saltos", it "salti" ("6 salti da 4"), nl "sprongen" ("6 sprongen van 4"), sv "hopp" ("6 hopp med 4 i varje"), da "hop" ("6 hop på 4"), no "hopp" ("6 hopp på 4"), fi "hyppyä" ("6 hyppyä, jokainen 4"). The dividers "step"; the worksheet "hops" — keep the worksheet's word in each locale so the two match.
  - *The dividers' name* (prose only): de "Stechzirkel", fr "compas à pointes sèches", es "compás de puntas", it "compasso a punte fisse", nl "steekpasser", sv "stickpassare", da "stikpasser", no "stikkpasser", fi "harppi".
  - *Factor order (critic ruling, shared `FACTOR_ORDER` table in Row 192 §9a):* the card's PHRASE ("{a} steps of {b}") is unambiguous in every locale and is what the child acts on; it alone defines the round, so grading is the same everywhere (span = b, steps = a). The RUNE under it is printed in the locale's default order: en/de/nl/sv/da/no/fi/fr/es/pt "{a} × {b}" (· in de/sv/da/no/fi), **it "{b} × {a}"** ("6 salti da 4" = 4 × 6 in Italian practice, 4 + 4 + 4 + 4 + 4 + 4). The success line uses the same order (`winMul`: it "6 salti da 4 arrivano a 24: 4 × 6 = 24").

  | locale | "3 × 4" is read | groups = | card for 6 steps of 4 | grading |
  |---|---|---|---|---|
  | en | 3 times 4 = 3 groups of 4 | first factor | "6 steps of 4" · 6 × 4 | span 4, 6 steps (the phrase) |
  | de · nl · sv · da · no · fi | 3 mal / keer / gånger / gange / ganger / kertaa 4 = 4 + 4 + 4 | first | "6 Sprünge zu je 4" · 6 · 4 (nl 6 × 4) | the phrase |
  | fr · es · pt | 3 fois / por / vezes 4 — school practice varies (both readings taught) | first by default | "6 bonds de 4" · 6 × 4 | the phrase (both readings make the same walk) |
  | it | 3 per 4 = 3 + 3 + 3 + 3 (the first factor is repeated) | SECOND factor | "6 salti da 4" · **4 × 6** | the phrase |

  Because the dividers act the phrase, not the rune, no locale needs "both orders right" here; the table only decides how the rune and the success line are printed.
  - Numerals on the line are plain digits; no thousands separators needed (≤ 100).

## 10. Sound off, access, phones
- Sound off: arcs, pin dots, the line's numerals and the flags carry everything.
- Keyboard: Tab → span tag (↑ ↓) → step button (Enter or →) → fold-up → keypad (digits) → Check.
- aria-live: `srDividers` after each span change or step (without the landing number, see 9).
- Taps: step 64/56, fold-up 48/44, span buttons 44, keys 48/44.
- Phones: the task card spans the top; the line keeps 8 px per unit (numerals every 5 at 13 px — legible), so ~37 units are visible at once and the minimap shows the whole walk; the keypad sits under the line. At 320 px: 7 px per unit, numerals every 10 only (with ticks every 5 longer). Check above both folds (stage 430 px at 360).

## 11. Distinct from
- **number-line** (tool: skip-count as jumps) and **open-number-line** (tool: the child draws free jumps) — free, unequal jumps are possible there; here the span is a locked object, which is the point.
- **New 252 The Washing Line** (bags laid end to end on a peg line, each tag slides to its running total), **Row 100 The One-Hop Helpers** (Inchie hops exactly one helper long along laid units), **Row 157 Hopper's Spring** — bags laid end to end, a creature hopping a helper's length, a loaded spring. In all three the units are separate objects laid or hopped one after another, so a different-size unit or a gap can still be made; the dividers carry ONE span that is set once and locked, so an unequal step cannot exist, and the step count is the arcs in the air, not the units on the ground.
- **#293 The Table Ladder** (batch 41) climbs rungs of a table; **#192 The Echo Grove** builds groups as poles; **#193 The Trapdoor Tower** packs boxes and drops them onto plates. **#300 The Kite Tail** grows a fraction tail at one end (it never walks). Here multiplication and division live on the number line.

## 12. Build plan
- **Core state:** `{ mode: 'mul'|'div', a?, b, N?, span, locked, pos, steps, arcs[], typed, landingsTyped[], misses }`. Functions `setSpan(s)` (refused when locked), `step()` (`pos += dir × span`, refuse past 0/100, lock on first), `foldUp()`, `landing() = pos`, `judge()` — mul: span = b ∧ steps = a ∧ typed = a·b (∧ every landing typed correctly in the 2/5/10 setting); div: span = b ∧ pos = 0 ∧ typed = N/b.
- **Verify gate** (own oracle): every step moves exactly span; span cannot change while locked; no product/start repeats per table; no answer value > 2 per ÷ table; span ≠ answer in every round; decade counts as listed; aria never contains the landing before it is written; reshuffle never repeats a pass order nor a span twice running (1,000 shuffles).
- **Mutations:** step moves span + 1 on the third step → equal-step rule; span changeable after a step → lock rule; ÷ judge accepts the span as the answer → span rule; aria announces the landing early → aria rule; a product repeated → table rule; every-landing setting lets the child step past an empty flag → flag rule; line pans away from the dividers → local-test reads the dividers' x inside the visible window.
- **Local test:** real drags of the free leg, step taps and back-leg drags, fold-up, keypad, at the seven widths, every round of every mode; the miss ladder.
- **Pictures:** none. **Risks:** reading the landing on a panned line at 320 px (numerals every 10) — mitigated by the enlarge-on-miss and the every-landing setting. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — dividers that walk leg over leg and leave a rainbow of arcs, and a hinge that clicks.
2. **Would a teacher put it on the board?** Yes — equal steps are guaranteed by an object, the arcs are the jumps to count (never the ticks), and the same instrument does G3-308 and G3-310.
3. **Would a parent trust it?** Calm, no pictures needed, no score.
4. **The invention:** dividers set once and walked leg over leg, so every step is identical and a product is where a equal steps land.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- Factor order ruled (shared `FACTOR_ORDER`, Row 192 §9a): the phrase "{a} steps of {b}" defines the round in every locale, so grading is identical everywhere; only the printed rune follows the locale (it prints "{b} × {a}"). The draft left this "pending".
- Layout: split → stacked (the line needs the full 620 px).
- Distinctness from New 252 / Row 100 argued concretely (separate laid units vs one locked span); the dividers stay — rod-laying was rightly rejected.
- Re-measured every table with my own script: products/starts unique, ÷ answers ≤ 2 repeats, span never the answer, decade counts as stated, all divisions exact.
