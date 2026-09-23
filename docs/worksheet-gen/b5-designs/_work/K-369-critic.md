# K-369 `road-safety`: editor-critic record (2026-09-23)

Inputs: `K-369-pedagogy.md`, `K-369-design-A.md` ("street furniture on a kerb": 3 x 2 cards, light on a post over STOP / GO chips, glow ears), `K-369-design-B.md` ("six little streets": the fork, side rays, over-the-shoulder frames, letters into equal-box bins). Output: `../K-369-road-safety.md`. Measurements by read-only node in the session scratchpad: `K-369-measure.js` (Baloo 2 700 18 / Nunito 800 16 widths with the shell woff2 from `assets/fonts/fonts.css` over `file://`, `document.fonts.check` true/true), luma from `primitives/_tokens.js`, `page/page.css` (`.ws-cardgrid` gap 14, `.ws-card` border 2 + padding 12, `.ws-match` padding 6 x 30, col gap 12, dots ±26, `.ws-pill` padding 6 x 24), `templates/components-b3/ordinal-numbers.js:151`, `topics-taxonomy.json`, `gen-b3-landings.js LEVEL_KEYS`, `types/k/K-065-left-and-right.js`, `K-210`. Pictures opened: contact sheet `K-369-pics.png` (`occupations/crossing_guard`, `occupations/crossing_guard_2`, `vehicles/car`, `vehicles/school_bus`). No em-dashes.

## Concept ruling (per face)

| face | taken from | why |
|---|---|---|
| base | **B** (the fork) + A's pedestrian height cue | (m) A's grid does not fit: it assumed `cardGrid` gap 12 / padding 8; the real gap 14 + border 2 + padding 12 leave a 204.3 px card and A's own stack (708) already overflowed the 677 fi case by 31, which A proposed to solve by capping fi titles at 3 lines (the brief says budget for 677, not forbid it). B's fork fits 660 ≤ 677, puts the light BETWEEN its outcomes (one decision, one glance), and has no numbered badge (a count cue next to a light). B's 306-wide strips with 96-wide cells were too narrow for the words (below); widened to 330 / 110. A's height cue (ped head ≥ 40 px lower) is kept as a fourth, redundant actor signal. |
| F1 | **B's layout, A's content rule** | Both lay six lights on posts; B's continuous kerb rows keep the base's street grammar. B's crayon strip (three swatches in a non-RAG order) is REMOVED: in greyscale the red and green swatches are the same grey blob (m 96 / 111), and a swatch strip is K-241's legend grammar; the instruction already names the colours. A's larger lamps (70) kept. |
| F2 | **B** (over-the-shoulder frames) | Both draw the child from behind; B's frame shows the road and zebra the figure looks across, so the look-left arrow points into a real road; A's strip scene is equivalent but B's card fits 552 at K floors. |
| F3 | **merge** (both `.ws-match`) | A: 6 x 104 + gaps = 704 > 677; B's pitch recomputed with the real `.ws-match` gap 12: item 100 (sign 76), 672 ≤ 677. |
| F4 | **B's letters + A's no-filled-red-disc ruling** | B is right that 8 lines from a 2-row strip into 3 bins cross the lower row's signs; letters into EQUAL box counts cannot leak class size. A is right (and B missed) that a filled red no-entry disc and a filled blue mandatory disc print as the same grey (m: 96 vs 96, not A's 95 / 97); F4 is the one face where that collision would be the answer. |
| F5 | **B** (sentence rows + three tiles) | A's 2 x 3 cards stack 708 > 677; B's rows 650. |

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base: card with light + two pictogram chips | A: 3 x 2 cards 205 x 348; B: fork strips 306 x 212 | B, widened to 330 x 212 | measured buildability (cardGrid geometry, 677 case); single glance decision |
| 2 | lit lamp: code fill + 8 radial ink rays | A: ±30° "glow ears" from the lamp; B: 3 side rays outside the housing | B's side rays, starting 2 px outside the housing, length 10 | B's geometry: radial rays on a 56 lamp with a 6 px gap enter the neighbour lamp; rays must never sit inside the housing (the gate locates the lit lamp from them) |
| 3 | ped lit: lamp filled, figure white | A: lamp coloured, figure white; B: lamp field white, glyph filled | B | filled glyph vs outline glyph is a second greyscale signal; closer to the real light (the FIGURE glows) |
| 4 | pt: until `pedLight.stop` is set, d2 = `{ped:0, car:6}` | A, B: same | NO fallback: pt blocks until the field is set | the seed is locale-neutral; a silent pt-only config forks the base deck; it is one data field |
| 5 | it `pedLamps:3` "set by panel" | none sized it | 3-lamp ped head uses the car padding: 196 px, fits the 212 row; the height-offset gate skips it | the row budget; a 2-lamp substitute would be "not our light" |
| 6 | F1: no key (A) | B: crayon strip | no strip | greyscale (m) + K-241 boundary |
| 7 | F4: lines into bins (pedagogy, A) | B: letters into boxes | B | crossing lines at G2 over signs; equal boxes |
| 8 | F4 includes `no-entry` in "not allowed" | A: no filled red disc on F4 | A, in every locale | m luma red 96 = blue 96 |
| 9 | F4 en regulatory incl. DO NOT ENTER, "no bicycles R5-6" | none drew R5-6 | NEW shape `plateCircle` (US R5-6 / R9-3, MX restrictivas) + per-convention `classOf` tables | the pedagogy's single `classOfGeometry` classified a white square plate as "information", wrong for MUTCD and NOM-034 |
| 10 | Vienna prohibition drawn with `slash` | A: slash optional; B: slash drawn | `slash` a per-sign signed field | most Vienna prohibition signs (de Z 254, fr B9b) carry NO slash; drawing one is a regulation error |
| 11 | es-MX restrictivas | none | drawn as `plateCircle` (reg ?) | NOM-034 restrictive signs are square plates carrying a red-rimmed circle |
| 12 | base instruction "Look at the light that is on. Circle what to do: stop or go." | A, B copied it | "Look at the lamp that is on and circle what to do: stop or go." | brief: ONE sentence |
| 13 | F2 (pedagogy "F3") band K | both K | K | kept; renumbered: final F1 colour, F2 crossing, F3 meaning (G1), F4 kinds, F5 quiz, so faces read in band order |
| 14 | F5 title "Traffic Signs Quiz" / "Verkehrszeichen Test Klasse 2" | | family head + "Which Sign Fits?"; never "Test" | "test / quiz" + the sign head is the driving-theory query in every market; rule 10 requires the family head or a child anchor beside any sign head |
| 15 | pill words 20 px fit-shrink to 18 (B) | A 15 px chip words | fixed Baloo 2 700 18, ≤ 2 lines, inner 94; no fit-shrink | deterministic render; K label floor 18 (m density.K.fontLabel) |
| 16 | car pictogram fill | A: teal; B: ink | teal | ink body next to an ink-rayed lamp is heavy; never a code colour (a coloured car teaches the car's colour) |
| 17 | sv type head "Trafik" | Nordic panel: compound | "Trafikregler" / `trafikregler` (panel may change) | the lock: never bare "Trafik" |

## 2 Claims removed or downgraded as unverified

- A: `cardGrid` column gap 12, card padding 8 → FALSE (m: gap 14, border 2, padding 12). A's base, F1 and F5 stacks are void.
- A: "red 95 / blue 97"; B: "red 96 / blue 97" → measured **96 / 96** (identical). Green 111, orange 128, yellow 166.
- B: base pill cell 96 wide holds the literals → FALSE at `.ws-pill` padding (text box 44) and still false with padding 6 (text 80): nl "oversteken" 91.5, it "attraversare" 101.7 (m). Cells widened to 110 (inner 94); "attraversare" still fails and is a panel trap.
- Pedagogy: "the family draws 0 library pictures (every candidate opened)": the pedagogy missed **`occupations/crossing_guard_2`** (opened by the editor: a red octagon reading "CROSSING", regulation-wrong and baked English). Added to the rejected list.
- A: DO NOT ENTER legible only at s ≥ 80 (8.6 px at 72): downgraded to *est.*; at the MUTCD letter ratio (~1/6 of the disc) text is ~12 px at s 76; the road-sign gate measures.
- Pedagogy F2 d2 sign sets and every code marked (reg ?): unverified by any of us; the family cannot build without the signed table (validator rule 1).
- B's crossbuck removal kept; pedagogy's en d3 `railroad` role dropped.
- The en English source, audited: "Look at the light that is on" (a light is always "on"; the LAMP is); "colour it red, yellow or green" is UK spelling on a US page; the base instruction was two sentences. Fixed in the final's candidates; panels must still audit.

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | measured (editor) | won |
|---|---|---|---|---|---|
| luma codeRed / codeBlue / codeGreen | | 95 / 97 / 111 | 96 / 97 / 111 | 96 / 96 / 111 | measured |
| cardGrid gap / card inset | | 12 / 8 | | 14 / 2 + 12 | measured (A void) |
| base stack | 656 *est.* | 708 (fails 677) | 660 | 660 (330-wide strips) | B, widened |
| pill text width available | | 88 (15 px) | ~72 (20 px) | 94 (110 cell, padding 6, border 2) | editor |
| widest chip words, Baloo 2 700 18 | | | | attraversare 101.7 · oversteken 91.5 · atravessar 86.7 · je traverse 86.8 · wachten 69.7 | measured |
| F1 stack | 500 *est.* | 620 | 636 (with strip) | 584 (lampD 70, no strip) | editor |
| F2 stack | 400 *est.* | 556 | 552 | 552 | B |
| F3 stack | 552 *est.* | 704 | 677 (pitch) | 672 (items 100, gap 12) | editor |
| F4 stack | 383 *est.* | 545 | 518 | 518 | B |
| F5 stack | 590 *est.* | 708 | 674 | 650 (rows 100, gap 10) | editor |
| STOP / ALTO / PARE at Baloo 18 | | | | 42.0 / 41.2 / 41.7 | measured (all fit 0.64·s at s ≥ 68) |
| F4 class labels, Baloo 2 700 18 | | ≤ 18 chars | ≤ 190 px | widest pt "regulamentação" 132.3, sv "varningsmärken" 131.9 (m) in a 199 bin | fits |

## 4 OPEN items

1. **Signed per-locale sign tables** (every (reg ?) in the final's §4): the codes and glyphs of es-MX NOM-034, pt-BR CTB Anexo II (incl. R-3 design), it CdS, nl J-series, sv övergångsställe glyph, no warning-triangle field colour, fi 2020 numbering; plus whether Vienna prohibitions carry a slash per sign. Nothing builds without `signedBy`.
2. pt `pedLight.stop` (standing figure or hand); es-MX confirms the figure pair; it `pedLamps`.
3. es / pt: ≥ 2 drawable informativas / indicação roles in the closed glyph set (else F4 runs 2 bins).
4. Subject bucket (science vs a new social-studies subject, `_PANEL-FINDINGS` open item 1) and the NEW `'Road Safety'` strand literals x11.
5. Engineer measures in `render/one.js`: pedestrian walking vs standing glyph legibility in a 45 px box (0.8·56), the back-view look-left arrow at 180 px, YIELD / CEDA EL PASO / DO NOT ENTER text fit, F5 3-line situations in de / fi at 126 chars.
6. Whether any locale teaches "listen" as a K crossing step (d3 only; no row depends on it).

## 5 Quality verdict

I would print the base for my kindergarten class: six calm little streets, one lit lamp each, the person or the car waiting on the left and going on the right, and nothing to decide except what the lamp says. It survives our black-and-white copier because the answer is where the lamp is and whether the man is standing or walking, not what colour it is; the teal cars cannot teach "green car means go". The crossing-steps page, drawn from behind the child so that left is really left, is the page I would send home. What would embarrass me is not the layout: it is a sign that is almost right. A Swedish warning triangle with a white field, a Brazilian stop sign that says STOP, a slash on a German prohibition sign that has none, or a crossing guard holding an octagon that says "CROSSING" would teach a six-year-old something false about the street outside the school, which is why this family must not build a single sign before a native teacher has signed the table against the regulation. I would also be embarrassed by F5 if its sentences gave the sign away by naming the word printed on it; the leak check is not optional.
