# SELF-CHECK — every tenth spec (brief §6)

Each entry answers the four questions for the specs written so far, and records any correction made. Emoji lists are extracted from each spec's Art registry by script (`_tools/lint-specs.js` guarantees no emoji exists anywhere else in a spec).

## Check 1 — after specs 001-010 (2026-09-05)

**1. Does every game so far use a pattern from PATTERNS.md?** Yes. 001 P3 · 002 P1 · 003 P6 · 004 P2 · 005 P8 · 006 P1 · 007 P12 · 008 P7 · 009 P9 · 010 P10 — nine distinct patterns across the build-first ten, as the catalogue preamble promised. The linter enforces pattern-id membership on every spec.

**2. Could each be built with shapes, emoji and text alone? Emoji relied on:**
- 001 Feed the Fox — 🦊 🍓 🥣 (all Unicode ≤ 9)
- 002 Numeral Nest — 🐔 🥚 🪹 (Unicode 13, with 🧺 fallback declared)
- 003 Ten-Frame Fill — 🦉
- 004 Bridge of Ten — 🦫 (Unicode 13, with 🐿 fallback declared)
- 005 Shape Sorter — 🦀 (all shapes are Phaser primitives)
- 006 Letter Lantern — 🦋
- 007 Case Pairs — 🐧
- 008 Frog Hops — 🐸, 🪷 (Unicode 14, with 🌸 fallback declared; finish screen only)
- 009 Balance Pans — 🦉
- 010 Array Reveal — 🦝 (Unicode 11, with 🐻 fallback declared)
Every other visual is a `shape` or `text` ART entry with THEME tokens; no image files anywhere. Three specs use a post-2019 emoji and each declares a fallback per BUILD-CONVENTIONS §4 / A-6.

**3. Are any two games effectively the same game?** No. The closest pair is 001/002 (both count 1-10 and end on a numeral choice), which is deliberate repetition of the load-bearing objective with different cognition: 001 the child performs the count (P3, enforced one-to-one), 002 the child reads a set and picks the numeral (P1, the count is only enacted on error). `check-redundancy.js --specs` reports 0 un-annotated hard duplicates.

**4. Is the subject balance tracking the Phase 2 split?** The build-first ten are 8 maths / 2 literacy by design (demand-led, brief §5.2); the catalogue as a whole is 110 / 66 / 24 and bands 64 / 98 / 38, unchanged. Batches 011-050 are maths-heavy (the number core), 061-090 literacy, 091-104 science; the balance is re-checked at every tenth.

**Corrections made during this batch:** the spec-length floor was changed from lines to characters after three complete specs failed at 140-148 lines (A-23); `tone()` gained a semitone `step` so counting games can raise pitch per object (F-213); four specs had an emoji leak into their layout diagram and were fixed to letters; one spec used an undeclared ART key (010 `ghostRow`) and one left keys unreferenced — both fixed. No course correction to the catalogue was needed.

## Check — after specs 021-030 (2026-09-05; written by four writer agents in parallel, batches land out of numeric order — checks are per accepted batch)

**1. Patterns from PATTERNS.md?** Yes: 021 P12 · 022 P2 · 023 P10 · 024 P1 · 025 P10 · 026 P1 · 027 P1 · 028 P3 · 029 P2 · 030 P7. All match their catalogue rows (the gate compares slug, band and pattern to the row).

**2. Buildable from shapes, emoji and text? Emoji relied on:** 021 🐝 · 022 🦜 (fallback 🐦 declared) · 023 🐭 · 024 🐶 · 025 🦢 (fallback 🦆 declared) · 026 🐨 · 027 🦉 · 028 🐹 🍪 · 029 🦆 🐸 · 030 🐐. Everything else is Phaser shapes and text. No image files.

**3. Any two effectively the same game?** No. Read in full: 023 Hidden Part Cup (predict the hidden part, cup lifts, count-on from the visible part, mirror re-queue) and 030 Count-Back Cliff (hop LEFT from the minuend; the start ledge has no hop badge; pitch falls per hop). 030 is the deliberate subtraction twin of 008 Frog Hops with the opposite direction and the counting-back off-by-one as its target misconception; 024/026/027 are three distinct addition strategies (subitised parts, near-doubles card, split-the-second-addend) at the same band — the intended within-objective repetition. `check-redundancy.js --specs` reports 0 un-annotated hard duplicates.

**4. Subject balance?** 20 accepted: maths 18 / literacy 2 — expected at this point (011-050 are the number core); literacy arrives with 061-090 and the science block with 091-104. Bands so far 5-6 7 / 6-8 12 / 8-9 1.

**Quality note from the read:** both specs hold the exemplar bar (coordinates for every element, one enacted response per misconception, complete level pools, a worked session, tap floors, Tab order, `?embed=1` note). One weak point to watch across batches: writers occasionally spend the 6-8 text budget on a caption AND an equation; 030 correctly dropped the caption. No corrections needed.

## Check — after specs 011-020 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 011 P10 · 012 P2 · 013 P2 · 014 P4 · 015 P2 · 016 P3 · 017 P12 · 018 P2 · 019 P11 · 020 P6 — all matching their catalogue rows (gate-checked). First uses of P4 and P11 in the corpus.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 011 🐰 · 012 🐿 🌰 · 013 🐶 🦴 · 014 🐸 🪷 (fallback 🍀 declared) · 015 🐛 · 016 🐔 🥚 🧺 · 017 🦦 (fallback 🐻 declared) · 018 🦊 🧸 🚗 ⚽ 🎈 🛍 · 019 🐭 · 020 🐌. Rods, cubes, frames, trays, tags and number lines are all Phaser shapes with THEME tokens. No image files.

**3. Any two effectively the same game?** No. Read in full: 012 Count Out That Many (P2 into a basket that holds exactly N; the lid is the commit; the (N+1)th acorn is refused) — distinct from 001 (tap-each-object count) and 003 (build on a frame); and 018 Tens and Ones Shop (P2 rods/cubes into a tray, self-count on Check, digit-swap hint, zero-placeholder hint, ten cubes bundle into a rod before counting) — distinct from 016 (count full tens then ones, P3), 017 (teen pairs, P12) and 019 (read blocks → keypad, P11), which together are the deliberate place-value cluster of four mechanics. 0 un-annotated duplicates.

**4. Subject balance?** 30 accepted: maths 28 / literacy 2, bands 5-6 12 / 6-8 17 / 8-9 1 — the number core as planned; literacy and science batches follow.

**Quality note:** 018's "no currency symbol — the shop is a frame, not a money objective" is exactly the F-29 discipline; 012's basket-holds-exactly-N is the structural (not verbal) enforcement the brief asks for. No corrections needed.

## Check — after specs 031-040 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 031 P9 · 032 P1 · 033 P2 · 034 P10 · 035 P7 · 036 P7 · 037 P8 · 038 P6 · 039 P3 · 040 P3 — all gate-checked against the catalogue.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 031 🐐 · 032 🐢 · 033 🐿 (fallback 🐭) · 034 🐇 · 035 🐝 · 036 🦘 (fallback 🐸 declared) · 037 🐑 · 038 🐘 · 039 🐱 🧦 🧺 · 040 🐙 🖐 ✌ ☝. Hundred squares, number lines, base-ten blocks, frames and bins are shapes. No image files.

**3. Any two effectively the same game?** No. Read: 033 Fact-Family House (four frames judged per frame; the material refuses 4 − 7 by lifting only four dots; a repeated fact swaps its addends and locks as the other fact) and 040 Fives Hands (tap each hand once; the number-of-hands distractor triggers the finger-dot opening; partial hands at L3 break the "ends in 0 or 5" over-generalisation). 035 and 036 are both P7 traces at 8-9 but opposite operations on different representations (hundred-square moves vs number-line hops crossing ten) — deliberate. 0 un-annotated duplicates.

**4. Subject balance?** 40 accepted: maths 38 / literacy 2; bands 5-6 12 / 6-8 23 / 8-9 5. On plan (number core first). Pattern spread so far: P2 8, P1 6, P3 5, P10 5, P7 4, P6 3, P12 3, P8 2, P9 2, P4 1, P11 1 — every pattern except P5 has appeared; P5 (drag-and-drop) is first used at 8-9 rows later in the catalogue.

**Quality note:** 033's misconception 3 (4 − 7 refused by the dots themselves) is the F-61 "invalid moves are refused" rule in its purest form. No corrections needed.

## Check — after specs 041-050 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 041 P6 · 042 P8 · 043 P2 · 044 P4 · 045 P6 · 046 P11 · 047 P1 · 048 P10 · 049 P1 · 050 P11 — gate-checked against the catalogue.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 041 🐌 · 042 🧤 · 043 🚂 🐱 🐶 🐭 🍎 🍌 🍇 · 044 🦜 (fallback 🐦) 🐟 🐢 🦆 🍎 🍐 🍋 · 045 🐿 (fallback 🐹) · 046 🦊 · 047 🐻 🍎 🍪 🍓 🥕 · 048 🦉 · 049 🐇 · 050 🐙. Pattern items are shapes at L1 and emoji from the registry at L2-3; arrays, hundred squares and staircases are shapes. No image files.

**3. Any two effectively the same game?** No. Read: 043 Pattern Train (P2 extend-by-two with per-wagon judgement; the wrong placement brackets the units and shows the unit card; mid-unit endings get an open bracket) and 049 Times-Table Tiles (P1 retrieval of 2/5/10 facts; a miss re-shuffles the tiles and draws the array with row totals — the same reveal grammar as 010 used as a REPAIR rather than as the core loop, which is the intended family resemblance; additive-error strip; expanding re-queue 1 → 3). 049/050 share tables but differ in pattern (P1 vs P11) and table sets (2/5/10 vs 3/4/6/8) — deliberate; 047/048 are the groups-vs-size and commutativity faces of one concept. 0 un-annotated duplicates.

**4. Subject balance?** 50 accepted: maths 48 / literacy 2; bands 5-6 13 / 6-8 30 / 8-9 7. The number core is now complete through 050; batches 051-060 (division, fractions, 3D shapes) then 061-090 (literacy) follow. Every pattern except P5 has now appeared at least twice.

**Quality note:** two writers independently chose the tile re-shuffle after a miss as the brute-force guard (F-65) without being told — the PATTERNS P1 contract is being read. No corrections needed.

## Check — after specs 051-060 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 051 P10 · 052 P8 · 053 P10 · 054 P1 · 055 P6 · 056 P1 · 057 P9 · 058 P1 · 059 P3 · 060 P6 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 051 🐻 🍒 · 052 🦔 (fallback 🐿) 🍎 🍪 🍐 🌰 · 053 🦝 (fallback 🐻) · 054 🐸 · 055 🐱 🧵 · 056 🐭 · 057 🐰 · 058 🦉 🔍 🔦 · 059 🐞 · 060 🦋. Fraction bars, cut shapes, quilts, number lines, grids, 3D outlines and the mirror grid are shapes. No image files.

**3. Any two effectively the same game?** No. Read: 054 Fair or Not (judge among three cuts; the unfair pieces flip onto each other and the overhang shows; three-equal-strips distractor caught by counting to 3) and 060 Symmetry Mirror (fill the reflection on a grid; extra cells reflect back across the line onto empty partners; missing cells get horizontal mirror threads; the given half moves to the right on the last L3 items). 051/052/053 are three faces of division (predict a fair share, sort share-vs-group problems, predict remainders) at two bands — deliberate; 054/055/056/057 climb the fraction ladder halves → quarters → compare → number line. 0 un-annotated duplicates.

**4. Subject balance?** 60 accepted: maths 58 / literacy 2; bands 5-6 13 / 6-8 35 / 8-9 12. Literacy begins at 061 (four batches in flight); science at 091.

**Quality note:** 060 puts the given half on the RIGHT for the last two L3 items so "mirror" is not learned as "copy to the right side" — a translation-vs-reflection guard the research (F-115) implies but does not spell out. No corrections needed.

## Check — after specs 061-070 (2026-09-05) — the first literacy batch

**1. Patterns from PATTERNS.md?** Yes: 061 P3 · 062 P1 · 063 P3 · 064 P7 · 065 P7 · 066 P4 · 067 P8 · 068 P1 · 069 P2 · 070 P2 — gate-checked (064/065 is the annotated deliberate pair: two letter cases on one tracing mechanic).

**2. Buildable from shapes, emoji and text? Emoji relied on:** literacy games need a picture VOCABULARY (nothing is spoken), so these registries are large — 061 and 067 ~45 object/animal emoji each, 062 ~55, 063 ~33, 068-070 ~45-55 — every one an object whose English name is unambiguous (bus, bee, hat, sun, sock…), declared with its intended word; 064-066 use 🐌 🐌 🦜 only. All are Unicode ≤ 12; the batch gate initially refused five specs because my "newer than Unicode 12" range wrongly covered Unicode-12 glyphs (chair 🪑, kite 🪁, lamp 🪔, yo-yo 🪀); the rule was corrected to Unicode 13+ code points and poison-checked (chair passes, nest/beaver still flagged) — A-24. Letters, sound boxes, drums, arcs and tracing waypoints are shapes/text. No image files.

**3. Any two effectively the same game?** No. Read: 063 Syllable Drums (tap the drum per beat, tokens on a rail with undo, slow chunk replay on error; letter-vs-syllable confusion answered by a one-chunk word) and 069 Sound Slide (blend 3-4 tiles into a word, then choose among pictures that share the first letter or first two letters — F-125 three-cueing defeated by construction; digraph = one wider tile; locales may hand it syllable tiles). 061/067 are both initial-sound games at 5-6 but P3 (tap every match in a scene) vs P8 (sort into two letter bins) — deliberate. 0 un-annotated duplicates.

**4. Subject balance?** 70 accepted: maths 58 / literacy 12; bands 5-6 20 / 6-8 38 / 8-9 12. Literacy batches 071-090 are in flight; science 091-104.

**Locale discipline check:** every language-bound list is in `LOCALE_DATA` with the English list authored in full and "other locales: a native word list is required — en pilot" stated where the writer was not confident (A-15). The rhyme and syllable conventions caveat (F-126) is stated in 062/063/069. No corrections needed.

## Check — after specs 071-080 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 071 P1 · 072 P9 · 073 P12 · 074 P12 · 075 P4 · 076 P2 · 077 P8 · 078 P4 · 079 P1 · 080 P1 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** picture vocabularies again (071 ~34, 072 ~29, 073 ~55, 074 ~50, 075 ~24, 078 ~34, 079 ~45, 080 ~36 object/animal/scene emoji, each declared with its intended word); 076 🦔 and 077 🐢 only (text content). All Unicode ≤ 12; no fallbacks needed. Word cards, wagons, wheels, sound boxes and end-mark stamps are shapes/text. No image files.

**3. Any two effectively the same game?** No. Read: 075 Sentence Train (tap cards in order; the capital-letter cue is switched OFF for German via `LOCALE_DATA.de.capitalCue = false` because German capitalises nouns; the full-stop card ghosts to the last wagon; an extra card finds no wagon) and 077 Question or Telling (sort sentences into ask/tell bins with the mark stamped; Spanish opening ¿ via `LOCALE_DATA.open`; twin sentences at L3 differing in one word). 073/074 are both P12 pair boards at 6-8 but pair syllable↔syllable vs word↔picture — deliberate; 078/079 are picture-sequencing (P4 order vs P1 fill the gap) — the two faces of F-129 sequencing. 0 un-annotated duplicates.

**4. Subject balance?** 80 accepted: maths 58 / literacy 22; bands 5-6 21 / 6-8 47 / 8-9 12.

**Locale discipline check:** 073 authored es/it/pt syllable lists and flagged them for native review; 075 authored a German V2 set and flagged it; every other language-bound list says "native set required — en pilot" (A-15). This is the right honesty for a spec: the builder never guesses a locale list.

## Check — after specs 081-090 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 081 P1 · 082 P8 · 083 P12 · 084 P4 · 085 P11 · 086 P2 · 087 P8 · 088 P8 · 089 P1 · 090 P1 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** picture vocabularies (081 ~34 scene/object emoji for inference clues, 082 ~46 for categories, 083 ~18 opposite pairs, 085 ~27, 086 ~16, 087 ~25 singular/plural pictures, 089 ~21 describable objects); 084 🦒 🎈, 088 🐨 📦 🏃 (the box and runner bin icons), 090 🦔. All Unicode ≤ 12. Sound boxes, letter banks, bins, rails and word cards are shapes/text. No image files.

**3. Any two effectively the same game?** No. Read: 085 Spell by Sound (P11 letter bank of eight tiles ≥ 56 px typed into sound boxes on the picture card; wrong letters show the boxes filling; 3rd wrong builds the answer and the child re-types; locale fallback honest) and 088 Noun or Verb (P8 bins labelled by a box icon and a running figure, the words "noun/verb" never on screen; non-motion actions and event-things as the researched traps; the same word as thing and action decided by its sentence at L3; market-conditional status stated per system). 087/088 are both P8 sorts of words but plural-vs-singular (pictures) vs thing-vs-action — deliberate. 0 un-annotated duplicates.

**4. Subject balance?** 90 accepted: maths 58 / literacy 32; bands 5-6 23 / 6-8 49 / 8-9 18. Literacy is now 32 of its 66; the remaining 34 sit at 141-160 and 191-199 plus the five 5-6 replacements. Science (091-104) is in flight.

**Quality note:** 088's rule "the stream never sends more than two consecutive cards to the same bin; the bins swap sides at each level change" is the position-habit guard (F-65) applied to a sorting pattern — the writers are generalising the brute-force rule beyond P1. No corrections needed.

## Check — after specs 091-100 (2026-09-05, resumed after a session limit) — the first science batch

**Resume note:** the session limit killed four writer agents mid-batch. On resume 26 of their 40 specs were on disk and all passed lint; 091-100 was complete and is accepted here; 101-108, 111-115 and 121-123 were accepted as partial ranges (the gate records per spec); the gaps (109-110, 116-120, 124-130) were relaunched as two small batches alongside 131-140 and 141-150.

**1. Patterns from PATTERNS.md?** Yes: 091 P8 · 092 P2 · 093 P4 · 094 P8 · 095 P12 · 096 P4 · 097 P2 · 098 P8 · 099 P2 · 100 P1 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** animal/plant/object emoji per registry (091 ~20 incl. cloud, car, robot, cactus, seed; 094-096 animals with whale/penguin/bat at L3; 097 uses a drawn outline figure — no person emoji; 099 clothes and objects; 100 weather symbols). Bins, thermometer bands, time-strips, growth wheels, the body outline and the season scenes are shapes. All Unicode ≤ 12. No image files.

**3. Any two effectively the same game?** No. Read: 091 Living or Not (bins by grow/eat icons; a moving non-living thing put in the living bin MOVES then shows three same-size copies — it moved but did not grow; a plant put in the not-living bin grows across a time-strip and drinks) and 099 Season Dresser (scene = tree state + sky + thermometer band; snow never appears; the bear reacts to the SCENE on a mismatch — shivers, wilts). 093/096 are both P4 life-cycle orderings (plant vs animal) — deliberate; 094/095 classify animals by feature vs pair with habitat. 0 un-annotated duplicates.

**4. Subject balance?** 116 accepted: maths 70 / literacy 32 / science 14; bands 5-6 33 / 6-8 61 / 8-9 22. Science is 14 of its 24 (the rest at 161-174). On plan.

**Quality note:** both science specs cite the hemisphere/locale traps from F-135 and the observational-only rule from F-30 without being reminded — the FINDINGS IDs are doing their job as the writers' brief. No corrections needed.

## Check — after specs 131-140 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 131 P9 · 132 P4 · 133 P1 · 134 P6 · 135 P11 · 136 P10 · 137 P10 · 138 P10 · 139 P2 · 140 P11 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 131 🐊 · 132 🐢 · 133 🐿 🌰 · 134 🐰 👀 · 135 🦔 (fallback 🐿) · 136 🦦 (fallback 🐻) · 137 🐸 · 138 🦆 · 139 🐰 🐻 · 140 🦊 🐻 🍎 🛒. Frames, bars, rods, keypads and the crocodile-mouth symbol are shapes/text. No image files.

**3. Any two effectively the same game?** No. Read: 133 One More One Less (5-6; the prompt is a ghost acorn with a +1 badge, no caption; distractors = the set and the answer + 1) and 139 Compare Problems (build two bars from counters, pairing lines draw from the left, the overhang is the answer; "adding the two numbers" badges all 13 counters and pulses the bracket; "fewer" at L3 flips the bracket toward the short bar). 136/137/138 are three P10 predict-reveal games at 6-8 with distinct cognitions (take-away crossing ten, commutativity swap, join/leave story) — deliberate; 023 was their exemplar. 0 un-annotated duplicates.

**4. Subject balance?** 126 accepted at this gate (133 after 101-120 closed): maths 80 → 87 / literacy 32 / science 14; bands 5-6 35 / 6-8 68-73 / 8-9 23-25. On plan.

**Quality note:** 139's "nothing is taken away anywhere in this game" is the F-106 separation of take-away from difference made structural. No corrections needed.

## Check — after specs 101-110 (2026-09-05; 101-108 landed before the session limit, 109-110 in the gap relaunch)

**1. Patterns from PATTERNS.md?** Yes: 101 P4 · 102 P8 · 103 P10 · 104 P4 · 105 P12 · 106 P8 · 107 P1 · 108 P3 · 109 P4 · 110 P4 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** science 101-104 sky/object/material glyphs from their registries; 105-108 use animal mascots only (clock faces, hands, rings and sectors are shapes); 109 🐓; 110 🐢 🌱 🍂. All Unicode ≤ 12. No image files.

**3. Any two effectively the same game?** No. 105/106/107/108 are the clock ladder o'clock → half → quarter → five-minute with four different patterns (pairs, bins, judge, tap-the-ring) — deliberate and required by F-28; 109/110 order days and months (P4 both) on different content with locale-bound names. 0 un-annotated duplicates.

**4. Subject balance?** Accepted with 111-120 below.

**Locale discipline check (read 110):** month names for all eleven locales in `LOCALE_DATA`; the cold arc moves to June-August for `pt` (southern Brazil); thermometer/sprout/leaf glyphs, never snow; the seasons are context, never a required cue. Exactly F-135 and F-38.

## Check — after specs 111-120 (2026-09-05; 111-115 landed before the limit, 116-120 in the gap relaunch)

**1. Patterns from PATTERNS.md?** Yes: 111 P1 · 112 P11 · 113 P10 · 114 P9 · 115 P4 · 116 P12 · 117 P1 · 118 P7 · 119 P1 · 120 P11 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** mascots and pictured objects only (117 ~13 shop items, 119 fruit icons, 120 animal icons); rulers, cubes, scales, jugs, coins (circles at REAL relative diameters with the label from `LOCALE_DATA`), pictographs and bar charts are shapes/text. No image files.

**3. Any two effectively the same game?** No. Read: 111 Measure Judge (judge which cube row measures correctly; a gap drops a dashed hole into the row, an overlap stacks the cube, a wrong start draws two edge lines that do not line up; every distractor row spans the same distance so only the layout decides) and 116/118 money (coin equivalents as a P12 board; change by counting on along a money line). 116/117/118 are three faces of money at two bands — deliberate. 0 un-annotated duplicates.

**4. Subject balance?** 133 accepted: maths 87 / literacy 32 / science 14; bands 5-6 35 / 6-8 73 / 8-9 25. On plan; literacy 141-160 and science 161-174 in flight.

**Locale discipline check (money):** 116 and 118 declare all eleven coin sets with real denominations only (en p, € c, pt centavos in 5-step, sv/da/no kr), real diameters so size never signals value (a 2p bigger than a 5p is exploited on purpose), Nordic labels [NSR-FLAG]ged, and the SE/DK/NO "not before 10" caveat in Curriculum links (A-19). No corrections needed.

## Check — after specs 121-130 (2026-09-05; 121-123 landed before the limit, 124-130 in the gap relaunch)

**1. Patterns from PATTERNS.md?** Yes: 121 P1 · 122 P3 · 123 P2 · 124 P4 · 125 P1 · 126 P1 · 127 P3 · 128 P8 · 129 P4 · 130 P12 — gate-checked. (My relaunch prompt still described 128 as the old "net fold" row; the writer correctly followed the binding catalogue row `big-and-small` — the rule "the catalogue wins over the prompt" held.)

**2. Buildable from shapes, emoji and text? Emoji relied on:** 121 animal icons · 122 🐝 · 123 mascot + scene objects · 124 🤖 🚩 · 125 ~20 everyday objects with shape outlines · 126 🐢 · 127 🐨 · 128 ~15 big/small pairs · 129 🐇 · 130 🦜. Grids, hedges, side marks, bars, tallies, number lines, arc-cards and outlines are shapes/text. All Unicode ≤ 12. No image files.

**3. Any two effectively the same game?** No. Read: 124 Left and Right (P4 direction tiles; the robot's own left/right marks rotate WITH it so the mirror problem is enacted; a bump is a refused move and a counted attempt; four turns without Forward pulse the Forward tile) and 130 Number Words (P12 pairs numeral ↔ word with all eleven locales' 1-20 word lists authored, sv/da/no/fi [NSR-FLAG]ged, de/nl/da teen inversion paired with a ten-and-ones picture per F-108). 123/188 are the two position-word surfaces (P2 place vs P1 choose) — deliberate and annotated. 0 un-annotated duplicates.

**4. Subject balance?** 140 accepted: maths 94 / literacy 32 / science 14; bands 5-6 38 / 6-8 76 / 8-9 26. Maths is 94 of 110; literacy and science batches are in flight. On plan.

## Check — after specs 141-150 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 141 P12 · 142 P4 · 143 P12 · 144 P12 · 145 P8 · 146 P1 · 147 P3 · 148 P8 · 149 P1 · 150 P1 — gate-checked (141 is the annotated deliberate second letter-pairs surface: same letter in the two THEME fonts, vs 007's upper/lower).

**2. Buildable from shapes, emoji and text? Emoji relied on:** picture vocabularies for the sound games (143 ~50, 144 ~44, 145 ~37, 146 ~42, 147 ~45, 148 ~31, 149 ~37, 150 ~24 objects/animals, each with its intended word); 141 🐼, 142 🐻. Letter tiles, banks, bins, chips and rails are shapes/text. Unicode ≤ 12 throughout (148 uses a keycap 3️⃣ and 149 a keycap 5️⃣ as picture-words "three"/"five" — keycaps are Unicode 3, fine). No image files.

**3. Any two effectively the same game?** No. Read: 142 Name Letters (the name is entered ONCE on the start screen via an on-screen letter bank with per-locale extra-letter pages, never authored by the game, never stored; then P4 tap its letters in order) and 147 Sound Count (P3 drum per phoneme; one chip per digraph; the missed cluster sound jumps; onset-rime "2" is right for bee/cow and wrong for cat). 063/147 are the annotated syllable/phoneme pair. 0 un-annotated duplicates.

**4. Subject balance?** 150 accepted: maths 94 / literacy 42 / science 14; bands 5-6 42 / 6-8 81 / 8-9 27. Literacy is 42 of 66 with 151-160 and 189-199 in flight; science 161-174 in flight.

**Locale discipline check:** 142's cultural-neutrality note ("names are never authored by the game; the illustrative name is a tester's example") is exactly the brief §7 rule. No corrections needed.

## Check — after specs 151-160 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 151 P12 · 152 P3 · 153 P3 · 154 P2 · 155 P1 · 156 P1 · 157 P4 · 158 P3 · 159 P12 · 160 P1 — gate-checked.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 151 🐨 (text content) · 152 mascot + 10 character pictures · 153 ~18 · 154 ~40 characters/places/objects · 155 ~31 incl. six face emoji as feeling answers · 156 ~30 · 157 ~30 · 158 ~16 · 159 ~44 pairs · 160 🐸 🐱 🐶 🐭 🐦 🐰 🛏 🪑 🌳 ☂. All Unicode ≤ 12. Word cards, text strips, maps and rebus rows are shapes/text. No image files.

**3. Any two effectively the same game?** No. Read: 156 Who Did It (5-6; three picture panels appear in turn, the question is a "?" glyph plus the asked object, three character tiles ≥ 80 px, no words anywhere — language-neutral by construction) and 160 Rebus Reader (5-6; a three-emoji sentence matched to a scene). 152/153/158 are three P3 tap-the-text games (capitals, full stops, spaces) on distinct conventions — deliberate; 154/155/156 are three comprehension faces (setting/character map, feelings, literal recall). 0 un-annotated duplicates.

**4. Subject balance?** Accepted together with 161-170 below.

## Check — after specs 161-170 (2026-09-05) — the second science batch (plus the two 5-6 literacy replacements 165 and 170)

**1. Patterns from PATTERNS.md?** Yes: 161 P12 · 162 P8 · 163 P2 · 164 P9 · 165 P1 · 166 P8 · 167 P2 · 168 P4 · 169 P8 · 170 P3 — gate-checked. (My relaunch prompt named the OLD rows for 165/170 — sun-and-shadow and magnet-test — which were replaced in the rebalance by `which-way-round` and `letter-hunt-scene`; the writer followed the binding catalogue. Lesson recorded: relaunch prompts must be generated from the catalogue rows, not written from memory.)

**2. Buildable from shapes, emoji and text? Emoji relied on:** 161 ~19 adult/young animals (the tadpole drawn as shapes) · 162 ~50 animals and foods, 🪲 and 🫐 (Unicode 13) with fallbacks declared · 163 ~18 · 164 ~19 temperature-scene objects, 🧊/🏜 with fallbacks · 165 🐭 · 166 ~15 push/pull actions, four fallbacks declared · 167 ~33 food-group items (no brands, no national dishes) · 168 face/tooth/water glyphs, brush and cup as shapes · 169 ~14 objects with bottle/jar/spoon drawn as shapes in different material finishes · 170 🦔 (fallback 🐿). No image files.

**3. Any two effectively the same game?** No. Read: 164 Hot or Cold (P9 stepper on a °C tube; scenes are THINGS that show temperature — snowman, ice, scarf, bed, beach, desert — never seasons; band icons appear ON the scale on error; cool separated from freezing at L3) and 175 One Cup Each (read at the previous gate). 161/095 both pair animals with something (young vs habitat) — different content; 162/094 sort animals by diet vs by feature. 0 un-annotated duplicates.

**4. Subject balance?** 180 accepted: maths 100 / literacy 56 / science 24; bands 5-6 57 / 6-8 93 / 8-9 30. Science is COMPLETE at 24; maths needs 10 more (181-188, 190) and literacy 10 more (189, 191-199) — exactly the last two batches in flight.

## Check — after specs 181-190 (2026-09-05)

**1. Patterns from PATTERNS.md?** Yes: 181 P12 · 182 P11 · 183 P2 · 184 P8 · 185 P2 · 186 P1 · 187 P8 · 188 P1 · 189 P2 · 190 P4 — gate-checked (188 is the annotated deliberate second position-words surface).

**2. Buildable from shapes, emoji and text? Emoji relied on:** 181 🐞 · 182 🐿 🍎 · 183 🐰 🥕 · 184 🐢 · 185 🐨 ⭐ · 186 🦔 · 187 🦉 🔍 · 188 🐱 🐶 · 189 ~48 picture-words (🪀 with fallback 🎯) · 190 🐓. Dot-sets, plates, shaded shapes, jars, ten-frames/rods, attribute objects with pattern glyphs, scenes and clock faces are shapes. No image files.

**3. Any two effectively the same game?** No. Read: 187 Attribute Detective (5-6; bins change attribute each round; every tint carries its own pattern glyph — teal/dots, coral/stripes, green/crosses — so colour is never the only cue, BUILD-CONVENTIONS §12) and 186 About How Many (bands 10/20/50, no exact count to guess; on a tap the beads gather into ten-frames that flip to rods; bead size varied independently of count at L3; the reference jar fades from L2). 183/185 are halving-a-set and fraction-of-a-set by dealing (6-8 vs 8-9) — a deliberate ladder. 0 un-annotated duplicates.

**4. Subject balance?** 190 accepted: maths 109 / literacy 57 / science 24; bands 5-6 61 / 6-8 95 / 8-9 34. The final batch 191-200 (9 literacy + 1 maths) closes the split at exactly 110 / 66 / 24.

## Check — after specs 191-200 (2026-09-05) — the final batch

**1. Patterns from PATTERNS.md?** Yes: 191 P4 · 192 P1 · 193 P8 · 194 P3 · 195 P8 · 196 P4 · 197 P2 · 198 P1 · 199 P12 · 200 P1 — gate-checked. Across all 200: P1 41 · P2 31 · P8 25 · P4 22 · P12 18 · P3 17 · P10 13 · P11 9 · P6 8 · P7 8 · P9 8 · **P5 0** — drag-and-drop was never chosen as a primary pattern because P2 (tap-tap) is strictly more accessible on the evidence (F-49); PATTERNS.md now records P5 as an optional accelerator a P2 build may add. Eleven patterns carry the catalogue.

**2. Buildable from shapes, emoji and text? Emoji relied on:** 191 ~14 · 192 ~28 incl. people emoji as pronoun referents (no names) · 193 🐨 · 194 ~19 · 195 ~50 (🪵 and 🪨 with fallbacks) · 196 🦉 📖 · 197 ~19 ingredients (🧈 with fallback) · 198 ~19 · 199 ~32 · 200 ~14 market items. Catalogue-wide: 396 distinct emoji, 164 fallback entries, median 2 distinct emoji per spec (literacy picture-vocabulary specs up to 59). No image files anywhere.

**3. Any two effectively the same game?** No. Read: 200 Market Day (the closing review game — adds no new fact, interleaves the facts of 003-004 / 015-020 / 030-040 with expanding re-queue 1 → 3 → 7; the wrong-sign distractor is the other operation's result, and the twenty-frame enacts what the sign does) and 191 Question Order (per-locale accepted orders: English do-support/inversion, German verb-first authored as the V2 exemplar, Finnish -ko/-kö noted, Romance statement-order-plus-marks noted). The whole-catalogue run of `check-redundancy.js --specs` found ONE un-annotated pair, 039/040 (socks in twos vs hands in fives — the same tap-each-group mechanic on different units), now annotated deliberate; result 0 un-annotated duplicates.

**4. Subject balance?** Final: maths 110 (55%) / literacy 66 (33%) / science 24 (12%) — exactly the split justified in Phase 2; bands 5-6 64 / 6-8 98 / 8-9 38 (A-21). Band × subject: 5-6 = 24 / 27 / 13; 6-8 = 62 / 27 / 9; 8-9 = 24 / 12 / 2.

**Whole-catalogue verification:** `lint-specs.js` 200/200 pass; `PROGRESS.md` 200 contiguous lines each with a matching file; `SUBSTITUTIONS.md` empty (no spec needed a substitution — every catalogue row was buildable within the constraints); specs 12,247-26,024 characters (median 20,415); 129 specs carry a `LOCALE_DATA` table, 46 declare an "en pilot" gap honestly.
