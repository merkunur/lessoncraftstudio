# Ground-truth mechanic ledger — German (de) landing fan-out

Built by mirroring the language-independent mechanic from `docs/seo-landing/mechanic-ledger-mathK.md` (read from `REFERENCE APPS/<app>.html` mode dispatch + `expectedAnswer`/blank-position, NOT slug names) and applying the **STEP-0 German re-grade**. **No P1/P2 may be authored against a slug name — only against this ledger** (the B-failure / body_parts discipline).

## German re-grade (STEP-0 locked)

There is no German "Kindergarten" school grade and no German "K≤10" band. The 4-band EN axis collapses to a **3-band German axis**, with `coordinate.level` **re-derived per coordinate** from mechanic + child-seen quantity (never an EN-band lookup):

| German band | slug token | age | what lands here |
|---|---|---|---|
| **Vorschule** | `vorschule` | 5–6 | readiness/perceptual + pre-numeric (no numeric band) |
| **1. Klasse** | `1-klasse` | 6–7 | numeric **bis 20** |
| **2. Klasse** | `2-klasse` | 7–8 | numeric **bis 100** |

Framework: **Lehrplan** human-facing (KMK-Leitidee *Zahlen und Operationen*); **Bildungsstandards der Kultusministerkonferenz (KMK)** in JSON-LD for coded coordinates. Readiness coordinates carry NO framework chip. Never literal "Common Core" in de.

## Addition (STEP 1 — the lead slice)

All addition modes are **numeric, Zahlenraum bis 20 → 1. Klasse** (the EN-Kindergarten addition band re-grades UP; German school-entry arithmetic is 1. Klasse, not a sub-K grade). Operands are UI-capped 1–10 (default 1–5) so the child-seen total is ≤20; `check-sum-ceiling.js --locale=de --ceiling=20` confirms it per coordinate (any >20 STOPS for a ruling — 2.-Klasse split or removal). Mechanic + genuine skill are language-independent; only the grade-band + framing localize.

| type / mode | mechanic (SHOWN vs BLANK — ground truth) | genuine skill | de grade-band | de framing | source |
|---|---|---|---|---|---|
| addition / image-image | two pictured groups + blank total; count both → total | Mengen zusammenfassen / count-all | **1. Klasse (Zahlenraum bis 20)** | *Rechnen und algebraisches Denken*; zählen und addieren; Mengenvorstellung | addition.html:4740,3639 |
| addition / image-number | pictured addend + numeral addend, blank total | gezählte Menge + geschriebene Zahl addieren | **1. Klasse (Zahlenraum bis 20)** | *Rechnen und algebraisches Denken*; weiterzählen von der geschriebenen Zahl | addition.html:3591,4740 |
| addition / mixed | per-row image-number OR find-the-part (whole + one part shown, blank part) | addieren **+ Zahlzerlegung** (den fehlenden Teil finden) | **1. Klasse (Zahlenraum bis 20)** | *Rechnen und algebraisches Denken*; "den fehlenden Teil / die Zerlegung finden", **NIE "fehlender Summand"** | addition.html:3538,3682 |

**Notes.**
- `find-addend` does not ship as a standalone de coordinate (the lone EN find-addend singleton folds into `mixed`, exactly as the EN arc resolved it).
- addition is **strand-only / no CCSS code** (EN addition carries no `standard`) → de addition shows the strand chip + **no framework chip** (mirrors the EN strand-only treatment), framework named only in prose if at all.
- The `mixed` find-the-part framing as *Zahlzerlegung / den fehlenden Teil finden* (never *fehlender Summand* / "missing addend") is the ledger lock that keeps it 1. Klasse and pedagogically honest.

## Readiness (STEP 2 — Vorschule)

Readiness/perceptual mechanics: NO numeric band → **Vorschule** (5-6). NO CCSS `standard`, NO framework chip; raw `l.strand` = the German Vorläuferfähigkeit label. The `readiness`/`none` validity gate has no countability check → all themes valid (incl. colors/emotions/body_parts/weather/seasons/activities). Differentiate by mechanic copy, not band (within-grade-coupling).

| type / mode | mechanic (SHOWN vs BLANK — ground truth) | genuine skill | de grade-band | de framing (raw l.strand) | source |
|---|---|---|---|---|---|
| pattern-train / null(ab),aab,abb,aabb,abc | a repeating picture pattern (AB / AAB / ABB / AABB / ABC unit); the child reads the rhythm + continues it / fills the gap | Muster erkennen und fortsetzen — sequence/seriation precursor (no counting) | **Vorschule** | *Muster erkennen und fortsetzen (Vorläuferfähigkeit)*; "Schauen statt Zählen"; mode-true copy per AB/AAB/ABB/AABB/ABC | pattern-train.html (5-mode dispatch) |
| grid-match / null | a picture grid, some squares filled + some empty; the child works out which tile completes each empty square | part-to-whole visual perception (no counting) | **Vorschule** | *Visuelle Wahrnehmung (Teil-Ganzes)*; "ein Bild vervollständigen / das fehlende Feld füllen" | grid-match.html |
| bingo / null | listen-and-match: a caller names a picture, the child finds + marks it on the bingo card | visual discrimination + word-picture matching (no counting) | **Vorschule** | *Visuelle Differenzierung (Zuordnen / Vorläuferfähigkeit)*; "hören und zuordnen / wiederfinden" | bingo.html |
| pattern-worksheet / null | a printable repeating-pattern row started; the child completes/continues the row | patterning readiness (no counting) — the GENERIC printable face, distinct from pattern-train's mode-ladder | **Vorschule** | *Muster erkennen und fortsetzen (Vorläuferfähigkeit)*; the no-prep printable copy (no AB/AAB mode names) | pattern-worksheet.html |

| missing-pieces / one-missing, two-missing | a complete picture with ONE (or TWO) piece(s) cut out leaving gap(s); the child picks the correct piece(s) from options to complete it | part-to-whole visual perception (no counting) | **Vorschule** | *Visuelle Wahrnehmung (Teil-Ganzes)*; mode-true per §22 (one-missing "ein Teil/eine Lücke" vs two-missing "zwei Teile/im Blick behalten") | missing-pieces.html (missingCount 1/2) |
| shadow-match / find-shadow, make-whole | find-shadow = match each color picture to its black silhouette; make-whole = match two picture-halves to re-form the whole | visual discrimination (no counting) | **Vorschule** | *Visuelle Differenzierung (Vorläuferfähigkeit)*; distinct copy per mode (Schatten/Umriss vs Hälften/Gegenstück) | shadow-match.html (shadowMatch / makeItWhole) |
| picture-path / **choose-path** | maze grid + a start + multiple destination pictures OUTSIDE; only one is reachable (walls block the rest); trace the path to the correct destination | spatial reasoning / pathfinding (no counting) | **Vorschule** | *Räumliches Denken (Vorläuferfähigkeit)*; "den richtigen Weg finden" | picture-path.html (isChoosePath) |
| picture-path / classic-maze | ⚠️ **INTERRUPT — DEFERRED, awaiting operator ruling.** The de classic-maze = the Treasure-Trail variant: collectibles placed along the path + an "Bild = Anzahl" legend; the child **COUNTS** the collectibles and validates against the legend (picture-path.html:2673 "Count each unique collectible image", :4980 "Treasure Trail redesign", :6815 "CLASSIC MAZE: Only validate collectibles"). That makes it a **numeric-bearing readiness coord** → the locked interrupt clause fires. classic-maze (38 coords) has NO landing yet; its decks stay `/decks/`. Recommend DROP (numeric, not readiness; mirrors the EN arc deferring the counting-maze / treasure-hunt) — operator rules. |

| sudoku / easy, medium | 4×4 picture-Sudoku; place pictures so each appears once per row + column; givens vary by mode (easy = more givens, medium = fewer) | logical reasoning / constraint-satisfaction (no counting; the interactive "n/total" progress counter is deck UI, not a task — EN shipped sudoku as readiness) | **Vorschule** | *Logisches Denken (Vorläuferfähigkeit)*; mode-true per §22 (easy "sanfter Einstieg/wenige Lücken" vs medium "kniffliger/mehr zum Knobeln"); copy is digit-free | sudoku.html (difficulty 4/6) |
| find-objects / **find-odd** | a busy field where most pictures appear as matched pairs; a few are unpaired; the child marks the unpaired ("odd") ones | visual discrimination / search (no counting) | **Vorschule** | *Visuelle Differenzierung (Vorläuferfähigkeit)*; "das Einzelbild ohne Partner aufspüren" | find-objects.html (isOddOneOut) |
| find-objects / i-spy | ⛔ **RULED DROP (numeric).** i-spy = find hidden objects AND **enter a COUNT per target** in a legend, validated `entered===correctCount` (find-objects.html:4853-4987). Numeric-bearing. i-spy (46) has NO landing; decks stay `/decks/` — locale-validity exclusion. |
| odd-one-out / same-theme | a row of 4 pictures from ONE category; one differs by an attribute; the child picks the one that doesn't belong | classification / categorization (no counting; row "exercise numbers" are teacher-facing layout) | **Vorschule** | *Logisches Denken – Klassifizieren (Vorläuferfähigkeit)*; "den Außenseiter finden / was passt nicht" | odd-one-out.html (sameTheme) |
| odd-one-out / cross-theme | **DROPPED** — singleton in de (1 coord). Per the EN singleton-fold precedent it folds out (not worth a mode-frame-set); its 1 deck stays `/decks/`. |

| big-small / findBig, orderAsc | each box shows the same thing at 2-3 sizes; findBig = circle the biggest; orderAsc = order them small→big | size comparison + seriation (no counting; orderAsc's worksheet ordinals are ordering labels, not counts — EN W7 shipped both as readiness) | **Vorschule** | findBig *Größenvergleich (Vorläuferfähigkeit)* / orderAsc *Größen ordnen (Vorläuferfähigkeit)*; mode-true per §22 (find-biggest vs order-all); copy digit-free. Validity gate keeps only `physical_size_orderable` themes (13 non-orderable dropped). | big-small.html (findBig/orderAsc) |
| more-less / **image-image** | two picture piles side by side; the child perceives which has MORE (no numerals on the worksheet) | pre-numeric magnitude comparison / Mengenverständnis (NO counting) | **Vorschule** | *Mengen vergleichen (Vorläuferfähigkeit)*; "welche Gruppe hat mehr, durch Hinschauen". Validity gate keeps `discrete_countable` themes (8 dropped). | more-less.html (image-image) |
| more-less / image-number, check-cross | ⛔ **RULED DROP (both numeric).** image-number compares a pile to a NUMERAL. **check-cross now source-confirmed NUMERIC** (more-less.html: child COUNTS each group, enters the numeral in dashed boxes — validation = exact count match L5145-5155 — then marks ✓/✗; the numeric count-input is load-bearing). Both keep `/decks/` — locale-validity exclusions. |
| alphabet-train / null | a train of wagons; clue wagons show a picture + letter badge; the child places the right LETTER in each empty wagon so the train spells the ABC in order | letter-recognition + alphabetical sequence (NO phonics/Anlaute — matches letter shapes + order, not sounds; Anlaut-edge pre-ruling resolved CLEAN) | **Vorschule** | *Buchstaben kennenlernen (Vorläuferfähigkeit)*; "das ABC der Reihe nach ordnen" | alphabet-train.html |

| picture-sort / null (`X-vs-Y`) | the pictures of TWO themes jumbled together; the child sorts each into its group (the A-group vs the B-group) | classification / categorization (NO counting — chart-count fence: sort/group lexicon only) | **Vorschule** | *Sortieren und Klassifizieren (Vorläuferfähigkeit)*; body references BOTH themes' concrete nouns (the `-vs-` differentiation). **de-orphan** — the combined `X-vs-Y` subjectTag rides the locale-agnostic `themeSubjectTagsWhere`. **de-native demand-cap: left ∈ {bakery, farm_animals} = 39 of 99 candidate pairs** (the 2 highest-recognition Vorschule sort categories; drops accessories/flowers/tree). | picture-sort.html (`-vs-` decks) |

_All 13 readiness types now have rows. Future numeric slices (subtraction; code-addition/crossword/Anlaute) per their later steps (STEP 3+)._

**The 4 numeric DROPs — RULED (operator, STEP-2 close); LOCALE-VALIDITY EXCLUSIONS, never gaps.** All four are source-confirmed numeric-bearing AND each parent type already has a clean readiness landing from another mode, so DROP loses no type coverage (the EN counting-mechanic deferral logic; NOT teach-nothing removals; NOT forced into a fabricated numeric strand). Decks stay `/decks/`; the landing-presence audit reconciles them as deliberately-absent (EN math-worksheet / category-(d) precedent):
1. **picture-path/classic-maze** (38) — counts collectibles ("Bild=Anzahl" legend). Clean face = choose-path (shipped 47).
2. **find-objects/i-spy** (46) — enters target counts into a validated legend. Clean face = find-odd (shipped 46).
3. **more-less/image-number** (48) — compares a pile to a numeral. Clean face = image-image (shipped 40).
4. **more-less/check-cross** (46) — counts each group + enters numerals + marks ✓/✗ (numeric count-input load-bearing). Clean face = image-image (shipped 40).
