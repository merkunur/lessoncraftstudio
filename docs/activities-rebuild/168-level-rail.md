# #168 — Pip's Stacking Fence → THE LEVEL RAIL (2.MD.D.10; all 11 locales)

ORDER row 168 · id `graph-it.bar-graph.2-md-d-10` (kept). Design: `designs/168-graph-it.md`.

## The invention
- **A spirit level that reads a bar graph.**
  - The bar graph is Pip's fence: a number post and up to four pickets of planks, one plank per unit, with each category's library picture and word under its picket.
  - A clear rail with a bubble vial hangs on a brass slider on the post. Its other end rests on a picket's top.
  - The rail lies level, with the bubble in the middle, only when the slider is at exactly that picket's height. Then the post's reading shows, and every plank of a taller picket above the rail is striped: the overhang is "how many more".
  - At any wrong height the rail visibly tilts.
- **Putting together and taking apart are moves.**
  - "Altogether": tapping one picket and then another stacks the first onto the second. The tower keeps both colours, and the post grows to 20 past 10.
  - "How many are left": planks are dragged off the named picket into Pip's basket. A basket tap puts the last one back.
- **Answers:**
  - a two-wheel number dial for counts (blank until turned; it never shows 0);
  - True / False tags;
  - for "which is the most", a tap on a picket.
- **Miss 1** lays the tool:
  - compare and true/false: the rail lies level on the lower picket of the two, and the hint names both pickets;
  - "most": the rail lies on the second-tallest picket, where something still sticks up;
  - total: the two pickets wobble;
  - left: the picket glows;
  - value: the rail rests on the asked picket, still to be levelled.
- **Miss 2** counts with the child:
  - tags on the planks to count, by the scale;
  - in build rounds, the card row lights up and the plank count is said.
  - A half step is said in words: "2, 4, 6, and the half plank on top makes 7".
- **Success:** Pip hops along the picket tops; Next appears 0.5 s later.
- **Settings:**
  - Level: Build (tally / picture card / table / fix one picket) · Read (default) · Scaled (the post counts by 2, 5 or 10; one picture = 2 or 5; a half picture only at key 2).
  - Spirit level: Show / Hide (hidden at rest; a miss still brings it in).

## Deviations from the design
- **No free play** (Next 0.5 s after success, as in rows 164–167).
- **Pip** sits beside the answer on desktop, not on the post top, which would have cost a row of height.
- **The row stays in `graph-it-activities.json`** (the only row there; tool `level-rail-activity`, old params dropped) instead of a new `level-rail-activities.json`.
- **Picket labels** are the authored category word (es "hongos" for the toadstool, de dative-free plural), not the vocabulary label. Long words carry soft hyphens so they wrap on a phone.
- **Picture cards** show the pictures alone; a row picture beside identical pictures was redundant and cost the phone fold.
- **On a phone, the key card ("[picture] = 2")** sits in the answer row.
- **Taking apart:** a tap on the picket also takes one plank (the keyboard and one-tap path); the drag into the basket is the main gesture.

## Bugs found while building
- The "Pip eats 4" count was stored as `k` and overwrote the round's own index, which broke the order planner. It is renamed `eat`; a gate assertion and a mutation keep it that way.
- An empty picket at Check said "This picket says 0". It now says "This picket is still empty" (counting never says 0); gate plus mutation.
- A second wrong build answer one plank above the post's top clamped to the first, which correctly reads as unchanged; the gate now steps down instead.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE, from the English source into every locale:**
  - "Count what sticks up above it" was misleading, because every taller picket is striped. The hint now names both pickets: "The rail is level on the raspberry picket now. Count the striped part of the leaf picket." It needs per-locale picket phrases: de dative "mit den Blättern", it "della barra dei lamponi", fi genitive "vadelmien pylvään".
  - Scaled compare hints now count in steps of the scale.
  - The table build round no longer says "one plank for each mark".
  - Counts "in steps of 2" no longer end on a 7 or a 3.
  - en "the right picket" (read as right-hand) is now "the mushroom picket".
- **SEVERE, single locale:**
  - es "tabla" meant both the plank and the data table; planks are now tablones.
  - sv title "Pips stapelskog" meant a stacking *forest*; it is now "Pips stapelstaket" in the activity and the prose. The frozen page title is untouched.
  - nl hintMost1 was ungrammatical.
- **MINOR:**
  - "level" said with the spirit-level word: waagerecht / horizontal / in bolla / vågrätt / vandret / vannrett / vaakasuorassa;
  - tally strokes named as such (Strich, trait, tracinho, stanghetta, streepje, streck, streg, strek, viiva);
  - en qMost, hintMost, helpMost and hintLeft; de hintMost, "Staple", "steht für";
  - fr okMost, hintMost, the setting "Étape" (vs niveau); es/pt setting "Modo"; es qMore / qFewer word order; pt hintMost; it hintTotal, hintMost;
  - nl/sv/da/no "Op de kaart staat / Kortet visar / viser";
  - fi post wording ("Tolpan luvut kasvavat…"), the dial hint, hintMost1, and the framework named;
  - da/no/fi metadata (tællestreger, tellestreker; fi title and intro);
  - the prose's second-miss sentence is now true for every level.

## Gates
- `verify-level-rail-core.js` 1,996/0. Ground truth is parsed from the design's §6 tables (8 build, 10 read, 8 scaled rounds) and re-derived by its own bar-graph reading. It checks:
  - every rail state (picket × slider), the bubble and the overhang;
  - stack, take and put back; Check, misses and help;
  - count tags with no 0, said only by the scale;
  - the plan and the "most" position 20–30 %;
  - every rendered line in 11 locales; no dead strings; the row.
- `mutate-level-rail.js` 24/24 killed, control passes.
- `local-test-level-rail.js` in 11 locales. Covered by real drags, taps and keys:
  - the rail's end, the slider, picket tops, planks into the basket;
  - stacking, the dial, the tags, the keyboard;
  - an empty picket's hint; the rail setting.
  
  Then 11 states × 8 widths with Check above the fold at rest.
- visual-qa × 11 locales; hierarchy 702/0; settings efficacy 2 live; prose-claims, SERP copy, content tells, preflight routes, next-delay all PASS.
