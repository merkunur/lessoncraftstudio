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
| find-objects / i-spy | ⚠️ **INTERRUPT — DEFERRED, awaiting ruling.** i-spy = find hidden objects AND **enter a COUNT per target** in a legend, validated `entered===correctCount` (find-objects.html:4853-4987). Numeric-bearing → interrupt (mirrors find-and-count). i-spy (46) has NO landing; decks stay `/decks/`. Recommend DROP. |
| odd-one-out / same-theme | a row of 4 pictures from ONE category; one differs by an attribute; the child picks the one that doesn't belong | classification / categorization (no counting; row "exercise numbers" are teacher-facing layout) | **Vorschule** | *Logisches Denken – Klassifizieren (Vorläuferfähigkeit)*; "den Außenseiter finden / was passt nicht" | odd-one-out.html (sameTheme) |
| odd-one-out / cross-theme | **DROPPED** — singleton in de (1 coord). Per the EN singleton-fold precedent it folds out (not worth a mode-frame-set); its 1 deck stays `/decks/`. |

_Remaining readiness types (picture-sort de-orphan) + the EN-Preschool set (alphabet-train, big-small, more-less) append their rows at their sub-slice's source-read. Future numeric slices (subtraction; code-addition/crossword/Anlaute) per their later steps._

**Deferred INTERRUPTS awaiting operator ruling (numeric-bearing, decks stay /decks/):** picture-path/classic-maze (38, counts collectibles) + find-objects/i-spy (46, enters target counts). Both mirror the EN arc deferring the counting mechanics; recommend DROP for both.
