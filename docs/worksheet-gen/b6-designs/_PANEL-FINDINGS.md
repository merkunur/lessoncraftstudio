# nt5-F (b6) — THE LOCK (2026-09-23)

The five types were CHOSEN BY THE OPERATOR (2026-09-23, after rejecting "coding"): **cursive-writing · story-sequencing · healthy-habits · habitats · sink-or-float.** Four expert panels + a seeded 11-locale autocomplete harvest then fixed their teaching points, boundaries, faces and title heads. Sources (read the section for your key in EACH; they carry the per-locale heads, tiers, verbatim suggestions, traps and refusals this file does not repeat):
- `_work/_selection-pedagogy.md` (11 curricula; per type: teaching point ×11, Boundary, six faces, refusals, traps, quality rule; the opened-picture table)
- `_work/_selection-seo-germanic.md` (en/de/nl; incl. the collision register + rail names) · `_work/_selection-seo-romance.md` (es-MX/pt-BR/fr/it) · `_work/_selection-seo-nordic.md` (sv/da/no/fi)
- `_records/harvest-candidates.<loc>.json` ×11 (98 seed requests each, 0 errors) · `_records/candidate-seeds.json`

## Raw harvest (unique suggestions; NOT comparable across markets)
| type | en | de | es | pt | fr | it | nl | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| cursive-writing | 149 | 131 | 151 | 115 | 130 | 81 | 50 | 17 | 37 | 28 | 14 |
| story-sequencing | 103 | 87 | 76 | 61 | 78 | 64 | 12 | 10 | 14 | 13 | 11 |
| healthy-habits | 161 | 95 | 157 | 100 | 115 | 49 | 51 | 31 | 31 | 51 | 38 |
| habitats | 143 | 25 | 66 | 48 | 43 | 43 | 23 | 13 | 15 | 14 | 11 |
| sink-or-float | 77 | 41 | 23 | 27 | 20 | 29 | 32 | 14 | 16 | 14 | 2 |

## THE LOCK — keys, base ids, subject, rail names
| # | id | family key | subject | base band | EN rail name | naming rule |
|---|---|---|---|---|---|---|
| 1 | K-379 | `story-sequencing` | letters | K | Story Sequencing | never a bare order word (science-sequence owns "Sequencing & Life Cycles" / "Reihenfolge" / "volgorde"; pt/it "sequência lógica" / "sequenze logiche" = the PATTERNS genre, 293 live pt titles): every title carries a STORY word (Bildergeschichte · secuencias de un cuento · sequência de fatos · images séquentielles · storie in sequenza · verhaal · bildserie/billedserie/bildeserie · kuvasarja) |
| 2 | K-380 | `healthy-habits` | science | K | Healthy Habits and Hygiene | never food / eating / Ernährung / "saludables" alone (K-203, G1-207 own food); nl "gezonde gewoontes" is adult-only, never a title word; no "tracing", no numbers (seconds, hours) anywhere |
| 3 | G1-398 | `habitats` | science | G1 | Animal Habitats | compound heads only (themes `animals`, `ocean_life`, `forest_creatures` are theme slugs); never the G1-202 question "Where Do Animals Live?" / "Waar wonen de dieren?" / "Var bor djuren?" as a title; never a land/water/air sort |
| 4 | G1-399 | `sink-or-float` | science | G1 | Sink or Float | base slug NOT `sink-or-float` (G1-204 deck slug) → `…-experiment`/native equivalent; never the G1-204 titles "Sink or Float?" / "Schwimmt oder sinkt?" / "Zinkt het of drijft het?" / "¿Se hunde o flota?" / "Afunda ou Flutua?" / "Flotte ou coule ?" / "Galleggia o affonda?" / "Sjunker eller flyter?"; every title carries an experiment / predict word; es "flotación" never (100 % off-topic) |
| 5 | G2-377 | `cursive-writing` | letters | G2 (G1 in fr/pt/it, data) | Cursive Writing | the head is the SCRIPT (Schreibschrift + VA/LA · letra cursiva · écriture cursive · corsivo · aan elkaar schrijven · sammenhængende skrift · løkkeskrift/sammenhengende skrift); never "tracing" / "nachspuren" / "Schwungübungen" / "Graphisme" / "Pregrafismo" (pre-writing + tracing families) |

Variation faces take the next free ids by CONTENT band: **K-381+ · G1-400+ · G2-378+ · G3-400+** (`tools/alloc-b6var-ids.js` → `_records/b6var-id-allocation.json`, this table's order).

## The six faces per type (locked from the panels; the design studio designs them, it does not re-pick them)
- **story-sequencing:** base order 4 panels (write 1-4) · first-next-last (3 panels, temporal word chips) · what happens next (3 ordered + 3 choices) · beginning-middle-end (draw the missing middle) · sequencing sentences (4 panels ↔ 4 sentences) · retell / write the story with starters (de "Bildergeschichte mit Worthilfen", the most valuable non-base face). Art: NEW palette-only `primitives/story-panel.js`, one art source per story; a story with a second legal order is DROPPED.
- **healthy-habits:** base habit ↔ tool match · hand-washing steps (order) · **brushing teeth** (the de/nl demand leader; order the brushing routine, no numbers; replaces the pedagogy panel's "moving or resting", which had 0 measured K-3 searches) · stop the germs (choose the healthy way; cough into the ELBOW) · why do we do it (habit ↔ reason) · weekly habits chart (open; carries the sleep / move / drink rows). Art: NEW `primitives/habit-pictogram.js` extending `road-pictogram.js` (faceless child silhouettes + drawn soap / towel).
- **habitats:** base animal ↔ habitat (4 tiles, 8 animals) · animal homes (own face; en 24 strings) · who does not live here (odd one out) · how animals adapt (G2-G3) · what animals need from a habitat · my habitat report (open). Art: NEW `primitives/habitat-tile.js` + `primitives/animal-home.js`; the HABITAT SET is per-locale data (de Wald/Wiese/Teich/Meer; Nordic skog/sjö/hav; pt-BR biomas; es-MX selva/bosque/mar); desert excluded everywhere (no pool).
- **sink-or-float:** base predict-test-record experiment table · heavy or light? (the bigger thing floats) · change the shape (clay ball sinks, clay boat floats; NEW `primitives/clay-form.js`) · true or false: why things float · draw what floats and sinks (K) · investigation write-up (G2-G3). Science rulings: never "heavy sinks, light floats"; only items with an unambiguous tap-water result (the opened lists in the pedagogy file).
- **cursive-writing:** base lowercase letters by stroke family · cursive capitals · letter connections (joins) · cursive words · reading cursive (the only closed face) · copy a sentence (print → cursive). Script = **unitAxis**: en us-trad (default) · de **va + la** (both published; the six de landing titles split between them; SAS only after a native check) · da uloopet/loopet (panel picks default) · one script elsewhere (MX, BR, FR Moderne, IT Moderna, NL, NO). Fonts: Google Fonts **Playwrite** (OFL-1.1) vendored woff2 + MEASURED metrics; joins come from the font's contextual alternates (render words, never concatenated glyphs); no stroke arrows (no cursive stroke data exists).

## Cross-panel rulings the design files must obey
1. **Cursive sv + fi: whole type REFUSED** (Lgr22 has no joined-script requirement; OPS 2014 removed kaunokirjoitus; no Playwrite SE/FI; a DK/NO font labelled Swedish would teach wrong letterforms). Hub expectation 0 for both. Possible face refusals: it F2 capitals (if corsivo maiuscolo is not taught), es F2 (panel confirms).
2. **G1-204 and G1-202 stay where they are** (science-sort). The new families never ship a plain float/sink sort or a land/water/air sort, and never reuse those decks' titles. G1-204's bank carried a PLASTIC spoon as "sink" (opened) — fixed 2026-09-23 (`tools/bolt`), its decks are republished in place at Phase I.
3. The live en landing `alphabet-train-letter-hint-camping` ("… cursive alphabet …", not a cursive page) is retitled when the cursive base ships (a repair).
4. One art source per page (drawn primitives OR library pictures, never mixed within a story/panel set).
5. Every correct answer must be true in all 11 countries (cough into the elbow; camel humps store FAT; penguins and polar bears never share a place; whales are not fish).
6. Printable decks ship NO answer key: no title/meta/landing may promise one. No visible "free".
7. The nt10-E landing-audit classes (position/rotation tells, two right answers, fact names its column, pictures named differently, instruction names undrawn apparatus) are gated per face in every locale (`_BUILD-BRIEF.md`).

## Honest click model (panels' midpoints at 9-15-month maturity; near-zero for the first 2-3 months)
| market | low | mid | high |
|---|---|---|---|
| Germanic en/de/nl (90 landings) | 155 | 231 | 309 |
| Romance es/pt/fr/it (120) | 204 | 337 | 474 |
| Nordic sv/da/no/fi (108 after the cursive refusals) | 22 | 42 | 62 |
| **batch (318 landings + their decks)** | **381** | **610** | **845** |
Per type (mid, all markets): cursive ≈ 170 · story-sequencing ≈ 135 · healthy-habits ≈ 128 · habitats ≈ 95 · sink-or-float ≈ 82. The ≥400/day target sits between the low and mid bands; it is reached only if the face titles hit the grade-stamped long tail the panels quoted and the pages get indexed (the site's binding constraint). Deck pages are an additional surface not counted.

## Re-probe (Phase B, before titles are final)
The three SEO files list under-probed heads (de habitats "Lebensraum Wald/Wiese/Teich", "Tierwohnungen"; nl story/habitats; Romance sink-or-float; fi "eläinten talvehtiminen"). Run `harvest-candidates.js` with those seeds into `_records/v2/` before the per-locale titles are fixed.
