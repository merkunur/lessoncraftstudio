# G1-380 `digraphs`: the five faces (Phase E, 2026-09-23)

Contract: `G1-380-digraphs.md` §3 (faces) and §5 (data and gates), `_FACE-BRIEF.md` (including the nt10-E additions).
All five faces are **CODE** faces on the base's one additive knob `mode`. `mode: 'base'` stays the base path byte for byte (baseline below).

## Where the faces live
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b5var-rows/digraphs.js` | NEW. Five rows, no handwritten specs. It emits `types/k/K-378-…`, `types/g1/G1-392..394-…` and `types/g2/G2-372-…`. The titles and instructions are read from `DIGRAPHS.en.strings[mode]`. |
| `types/g1/G1-380-digraphs.js` | The face section (additive): `FACE_BUILD[mode]`, `faceVerifyInPage` (the in-page face verify) and the helpers `positionOf`, `printFits`, `seqTell`, `matchTell`, `countTell` and `targetHits`, all exported on `_helpers`. The face dispatch sits after the base's refusal checks. `build()` refuses a `FACE_REFUSALS` face before the bank is read. `verify()` dispatches on `data-lcs-face`. |
| `templates/components-b5/digraphs.js` | NEW components: `teamHouses`, `beadBank`, `gapWordRow`, `beadWord`, `socketCard`, `sentenceLane` and `digraphLineBoxBaseline`. |
| `data/b5/digraphs.js` | Six more EN F5 sentences (s7-s12, hits 1 4 1 3 2 1; every 3-window still totals 5-8). The F4 instruction now says "Color", not "Colour" (the site's en is US, and 2d-shapes says "color"). |
| `qa/verify-b5-digraphs.js` | `validateBank` has three new face rules and per-face apparatus lists. Section 6 calls the face gate. |
| `qa/b5-digraphs-faces.js` | NEW face gate (strings, refusals, node sweeps, renders, poisons). |

Every face stamps its root with `data-lcs-face=<mode>`, `data-lcs-mode`, `data-lcs-teams`, `data-lcs-sounds` and `data-lcs-cfg` (its own resolved config). `verify()` re-derives every answer from `seg`, `snd` and `silent`, never from an answer stamp.

## What every face verify also checks
- **SPARSE:** the blank band between consecutive visible blocks is 40 px or less, and so is the band from the body top to the first block. Blocks side by side in one grid row count as one band row.
- **FILL:** at a body of 800 px or more, the content bottom reaches at least 85 % of the body. At every chrome it stays inside the body, above the footer, and inside the face root.
- **Printed text:** nothing is printed outside the face's own literal surfaces.
- **Answer stamps:** no answer stamp other than `""` appears on the page.
- **Pictures:** every picture has loaded and is at least `cfg.iconPx`.
- **No stubs:** no wire stub sits on a bead inside a word or a card.

## Faces

### F1 K-378 `sort-two`, "Digraph Sort for Kindergarten: sh or ch" (K)
- **Knob:** `{mode:'sort-two', set:'k', pictures:6, split:[3,3], maxRun:2, iconPx:72, iconMax:104, cardW:120, cardMinH:88, rowGap:12, houseW:190, gutter:66, houseBead:150x90/56}`, `gradeBand:'K'`.
- **What the child does:** she names six pictures in a centre column and draws a line from each to one of two team houses (sh / ch). Each house is crowned by one given bead. Every picture has a dot on both sides and is equidistant from both houses.
- **Verify:**
  - houses === `sets.k`;
  - each card's house is re-derived from `seg` (exactly one house team);
  - `bin-of` matches;
  - there is no foil sound;
  - the split equals `cfg.split`;
  - no house takes more than 2 pictures in a row, and the sequence never strictly alternates;
  - both house beads are identical and at least 56 px / 30 px (K floors);
  - every card is at least 56 px, with two dots;
  - every picture is equidistant from the two houses (±1 px).
- **Poisons:** PR6g (6/0 config: spec guard), PR6r (a rendered 6/0 page), AT1 (alternation), AT2 (three in a row), SP1, FH1, FP1.
- **PNG:** `out/dev/K-378-null-d2-en.png`
- **Deviation:** the pictures GROW with their card (CSS `clamp(72px, 100% - 16px, 104px)`), which fills the body at 814.

### F2 G1-392 `gap`, "Missing Digraphs: Write sh, ch or th" (G1)
- **Knob:** `{mode:'gap', rows:8, perTeam:[2,3], maxRun:2, beadW2:96, beadW3:116, beadH:50, wordPx:32, maxLetters:12, gapInitialCapital:false, capPx:72, iconPx:62, rowMin:72, laneW:560, bankBead:90x52/32, bankWireW:360}`.
- **What the child does:** she names the picture and writes the team from the bead bank at the top into ONE blank bead inside the printed word.
  - The bead is dashed coral, with a solid baseline and a dotted x-height line.
  - It has no wire stubs.
  - The bead is one size per page: 96 for 2-letter banks, 116 when a 3-letter team is in the bank.
- **Pool:** item rules (a) and (b); rule 6 (`printFits`); not `noGap`; 12 letters or fewer; never a capital-initial team at index 0 (the capital rule).
- **Verify:**
  - the gap's start and length equal the team's `seg` span;
  - the printed text equals the word minus its team, and the team is never printed;
  - every gap bead is identical w/h and matches `cfg.bead`;
  - the bead's baseline line lies within ±1 px of the word's rendered baseline (a zero-size probe), and its midline within ±1 px of baseline − xHeight·F;
  - there is no bead on a capital-initial team;
  - per-team counts are 2-3, with maxRun 2, no staircase, and no team on rows 1-3.
- **Poisons:** PR1 (a wider bead), PR2 (de Schaf gapped at its capital), PR3 (a stub in a word), AT3 (staircase), SP2, FH2, FP2. The PR2 control shows that the same de block with the capital rule on REFUSES.
- **PNG:** `out/dev/G1-392-null-d2-en.png`
- **Deviation:** cap and row are 72/62/72, not 64/54/64 — measured to fill at 814 and still fit at 677 (650 px).

### F3 G1-393 `match`, "Read Digraph Words and Match the Pictures" (G1)
- **Knob:** `{mode:'match', pairs:6, perPair:2, wordPx:32, beadH:42, iconPx:80, iconMax:104, itemW:250, picW:120, itemMinH:92, maxLetters:10, wordMaxW:226}`.
- **What the child does:** she reads six words. Each word's team sits in an inline given bead, and its letters stay ink. She draws a line to one of six pictures.
- **Verify:**
  - `data-lcs-pair` appears on both sides;
  - the printed word equals `seg`, and the bead text equals the one page team in `seg`;
  - each team has 2 words;
  - every word has 10 letters or fewer and is 226 px or narrower;
  - the order is a derangement: no word sits in its own row, it is not the reversal or a rotation by ±1, and no row offset repeats more than twice.
- **Poisons:** PR7 (a word in its own row), AT4 (reversed), SP3, FH3, FP3.
- **PNG:** `out/dev/G1-393-null-d2-en.png`
- **Deviation:** the items grow (flex) to fill at 814 instead of `space-around`, which would leave bands of more than 40 px.

### F4 G1-394 `position`, "Where Is the Digraph? sh, ch and th in the Word" (G1)
- **Knob:** `{mode:'position', set:'position', cards:8, cols:2, posSplit:[2,3], teamSplit:[2,3], maxRun:2, iconPx:92, cardW:313, colGap:13, cardMinH:150, colW:185, teamBead:70x40/26, socket:56x44, sockGap:8, keyCell:12}`.
- **What the child does:** she names the picture and colours one of three blank sockets, threaded on a wire under first / middle / last position keys, where she hears the card's own team (a given bead).
- **Verify:**
  - the position is re-derived from `seg` minus the `silent` indices (whole-word teams are refused);
  - each position is used 2-3 times, and each team 2-3 times;
  - the answer sockets have no run of more than 2, never repeat with period 2 or 3, and each card column holds at least 2 positions;
  - the sockets are 56x44 blank beads; the keys run 0, 1, 2;
  - the content is centred in the card.
- **Poisons:** PR8 (pt F4 refuses, even with a bank in hand), AT5 (period 3), SP4, FH4, FP4.
- **PNG:** `out/dev/G1-394-null-d2-en.png`

### F5 G2-372 `text`, "Digraphs in Sentences: Circle and Count sh" (G2)
- **Knob:** `{mode:'text', targetIdx:0, sentences:4, hitsPerSentence:[1,4], total:[7,11], textPx:26, textMax:32, textCqh:4.7, lineH:52 (×font), maxLines:2, headBead:104x58/36, laneGap:16, box:56x52}`.
- **What the child does:** she finds every `sh` in four connected sentences (the team is not marked), circles it, and writes the count in each lane's open box (`blankNumeralBox`, answer `""`).
- **Verify:**
  - the printed sentence equals its signed tokens;
  - the count equals the number of target ELEMENTS in `seg`;
  - the target is never a proper substring of an element;
  - each lane has 1-4 hits, and the total is in `cfg.total`;
  - the counts are never all equal and never monotone;
  - each lane has 2 rendered lines or fewer (measured);
  - text is at least 22 px;
  - the box is 56x52 and is the open `ws-blankbox`;
  - the content is centred in the lane.
- **Poisons:** PR9 (a lane forced to 3 lines), PR10 (an answerBox with `data-lcs-answer="undefined"`), AT6 (monotone counts), SP5, FH5, FP5, PD1 (the false pair "mishap" in text), PD2 (a 73-character sentence).
- **PNG:** `out/dev/G2-372-null-d2-en.png`
- **Deviations, measured:**
  - **4 lanes, not 3.** Three 1-2-line sentences end at about 61 % of the 814 body (FILL fails). Stretching three lanes left 60-80 px of empty cream in each. Four lanes at 2 lines or fewer fill the page and still fit at 677.
  - **Adjusted bounds:** the total becomes [7,11], and `maxLines` 2. The text grows with the lanes box (`clamp(26px, 4.7cqh, 32px)`, line-height 2×). 4.7 cqh keeps four 2-line lanes inside the 603 px lanes box at the 677 chrome.
  - **Bank rule** (validator, rule 12): a sentence is 64 characters or fewer.
- **Also:** `font-variant-ligatures:none` on every word surface — the render showed Nunito fusing "fi" in *fish*.

## Validator additions (`validateBank`)
- **Rule 10:**
  - A frame clash is now a FINDING unless the item carries `noGap:true`. The spec also skips `noGap` items at render, because it cannot read approved-words.
  - Poison PD3 (sh-air reads "chair") has a control: a flagged item is not a finding.
- **Rule 12:**
  - Every token shows the target's letters exactly as many times as it holds target elements (PD1).
  - A sentence is 64 characters or fewer (PD2).
- **Rule 13, apparatus (en):** each face's instruction must name its apparatus and may not name what the face does not print (AP1-AP5).

| face | must name | may not name |
|---|---|---|
| F1 | line | write, box, circle, dashed/space, colour |
| F2 | dashed space | line, box, circle, colour |
| F3 | line | write, box, circle, dashed |
| F4 | beginning/middle/end + space | write, line, box, circle |
| F5 | box + circle | line, dashed/space, colour |
| base | — | write, line, box, dashed/space |

## Refusals (the spec THROWS; these lower `hub-expectations.json`)
- **es, it, sv, da, no:** whole family, every face (design §1).
- **pt:** F4 `position` (`FACE_REFUSALS`). No pt word ends in nh / lh / qu, so "end" is unreachable. The spec throws before the bank is read.
- **fi, conditional:** F4 beginnings are exactly aasi · aalto · uuni. If the fi panel rejects `uuni`, F4 fi falls below rule 11's 3 and must be added to `FACE_REFUSALS`.
- **All other shipping locales (de, pt, fr, nl, fi):** no bank block exists yet, so every face refuses (throws) until the panels' blocks land.
- **Expected shipping matrix:** en 6 · de 6 · fr 6 · nl 6 · fi 6 (5 if uuni falls) · pt 5.

## Open items for the panels
- F5 now draws **4** of the locale's sentences:
  - rule 12 still asks for at least 6, but more gives more variety — author 10-12, as EN does;
  - every sentence must be 64 characters or fewer (2 lines);
  - the hits must vary between 1 and 4, or the count tells refuse every draw.
- F2 needs at least 3 gap-eligible items per exemplar team (rule 10): not capital-initial, and the frame unique.
  - de: `Sch`/`Ch`/`Au`-initial nouns never gap, so de needs medial or final sch / ch / au items: Tasche, Fisch, Buch, Maus…
  - Flag any frame clash as `noGap`.
- F3 words must be 10 letters or fewer (and 226 px or less at 32 px).
- Audit the EN strings as a source. The F4 wording "Color one space" names the sockets as "spaces". The F1 title names Kindergarten; the landing states that K is readiness.
- `summer/beach` and `zoo animals/sloth` still need their en panel confirmation (from the base record); sloth appears on F2 and F4 pages.

## Coordinator review round (2026-09-23)

### 1. F4's position cue was unreadable
**Problem.** The design's `positionKey` (cell 12) drew three 10-12 px squares above each socket. That is far under the G1 44 px floor, and a six-year-old cannot read it.

**Fix.** `socketCard` now puts ONE big START → END arrow over the three sockets (`cue: {h:22, gap:6, stroke:4, dotR:9, head:18}`).
- Segment k is exactly its socket's width (56) and sits directly above it.
- Segment 0 opens with a filled start disc (18 px); segment 2 ends with an arrowhead (18 px).
- So beginning, middle and end are shown by POSITION along the arrow.

**What verify checks.**
- There are three segments (0, 1, 2).
- Each segment is at least 44 × 20 px.
- Each segment is centred on its socket (±1) and sits above it.
- The start disc is on segment 0 and the arrowhead on segment 2, each at least 16 px.

**Other guards.**
- The spec guard refuses a cue under its floors.
- Poison PR11 shrinks the cue back to the old 12 px keys; it is KILLED.

### 2. Two pictures read as other words
**Problem.**
- `easter/chick` reads as a duckling, which a child says as "duck".
- `classroom/lunchbox` reads as a treasure chest, said "treasure" or "box".

Neither word the child says carries ch.

**Fix (LEAD RULING, same day: the ban covers the BASE too, since nothing of nt10-E is published).**
- Both items are deleted from `DIGRAPHS.en.teams.ch`.
- Both pictures are listed with reasons in `DIGRAPHS.en.rejectedPics` and in `DIGRAPHS_NEUTRAL.REJECTED_PICS_ALL`.
- The first face-only version (a `faceRejectedPics` / `FACE_REJECTED_PICS_ALL` pair) was withdrawn.
- `validateBank` requires every `REJECTED_PICS_ALL` picture to be LISTED in a shipping block's `rejectedPics`, with its reason, because the base's `_buildWith` reads only the block's list.

**What the gate checks.**
- The base node sweep and every face node sweep assert that 0 of 400 pages draw either picture.
- Poison PX1 puts both back and drops both lists; F1 and the base then draw them: KILLED.
- Poison PX2 is a block whose list omits the chick: KILLED.
- Poison PX3 puts the chick back as a ch item (rule 1): KILLED.

**Other changes.** No replacement was needed. The ch pool keeps 7 stems (chair, cheese, chicken, bench, ostrich, beach, chocolate).

**Base drift, accepted by the lead (who recaptures).** `b3-baseline --check --quick` shows exactly ONE drift, `DRIFT G1-380|nothm|d2|en`, and nothing else (0 missing). I re-rendered the base at d1, d2 and d3 and READ them all: they are clean, with no chick or lunchbox.

## Gate lines

- **After the lead ruling:**
  - Gate: **PASS (331 assertions, 73/73 poisons killed)**.
  - `build-en`: 713 types, title lint clean.
  - Distinctness: every variation differs.
  - `b3-baseline`: 1 drift, `G1-380|nothm|d2|en`, the accepted base change.

- **After the review round (2026-09-23):**
  - `node qa/verify-b5-digraphs.js`: **PASS (330 assertions, 72/72 poisons killed)**. Node sweeps show 0 tells, 0 face-rejected draws, and a maximum per-position answer share of 55 % or less.
  - Distinctness: every variation differs.
  - `build-en`: 708 types, title lint clean.
  - `b3-baseline --check --quick`: 0 drifted, **PASS**.
  - I re-read all five PNGs.

**Earlier run:**
- `node qa/verify-b5-digraphs.js` (full): **PASS (326 assertions, 69/69 poisons killed)**. That covers the team-bead gate PASS (341 assertions, 4/4), bank en 0 findings, and every face render at en / one-line (811) / de 722 (677) / fi 677 (667) with verify 0 and lints 0.
- Face node sweeps (400 seeds each): 0 tells in every face.
  - Maximum per-position answer share: F1 55 %, F2 39 %, F3 24 %, F4 40 %, F5 48 %.
  - Distinct pages: 400 / 400 / 400 / 400 / 384.
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=digraphs`: "every variation differs from the deck its base publishes and from its siblings" (15 pairs).
- `node tools/b3-baseline.js --check --quick`: `checked build 3840 + enum 277 in 23s: 0 drifted (0 expected), 0 missing` **PASS**.
- `node i18n/build-en.js`: 708 types, title lint clean.

I READ all five PNGs (`out/dev/{K-378,G1-392,G1-393,G1-394,G2-372}-null-d2-en.png`). The gate renders are in `out/dev/G1-380-gate/`.
- Nothing is clipped, nothing sits under the footer, and every page reaches the body bottom.
- The beads never touch the letters. Two fixes came from reading the renders: the F2/F3 bead margins went from 3/2 px to 6/4 px, and the F4 socket wire had been painting OVER the sockets (it now sits behind them).
- Every picture says its word.
