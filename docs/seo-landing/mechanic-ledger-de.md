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

_Further readiness types (grid-match, missing-pieces, bingo, sudoku, picture-sort, odd-one-out, find-objects, pattern-worksheet, picture-trail, shadow-match) + the EN-Preschool set (alphabet-train, big-small, more-less) append their rows here at their sub-slice's source-read. Future numeric slices (subtraction/more-less/big-small; code-addition/crossword/Anlaute) per their later steps._
