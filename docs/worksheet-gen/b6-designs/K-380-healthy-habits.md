# K-380 `healthy-habits` (K/G1/G2) : FINAL design (editor merge, 2026-09-23)

Merged from `_work/K-380-pedagogy.md` + `_work/K-380-design-A.md` ("the washroom hooks": peg rail, cream plaques, profile figures, tool removed from the habit) + `_work/K-380-design-B.md` ("the sink sign": one pictogram language, sink close-ups with a state vector, 60 px 1-bit confusability gate); every ruling and why: `_work/K-380-critic.md`. Concept: **A's hooks on the base and A's plaque as the family signature, B's sink-band close-ups and state vector on the hand-washing face, B's minimal-pair gate on every drawn pose, the pedagogy's six moves, bank tables and reason rules, and the lead's binding rulings (brushing sorted by PHASE, never numbered; all-drawn; elbow cough only; no food, no numbers, no mouth-rinse, no masks, no screens, no shaming).** (m) = re-measured 2026-09-23 by read-only node (scratch `K-380-w.js`: `primitives/bankword-width.js` Nunito 800 advances; `data/b2/calendar.js`; `frontend/config/topics-taxonomy.json`; `frontend/content/seo-landing/<loc>.json`; `page/page.css`; `primitives/road-pictogram.js`; `primitives/bin.js`; `templates/components-b3/ordinal-numbers.js`) or by OPENING a picture (editor contact sheet `K-380-critic-pics.png`). *est.* = the engineer measures in the real render (`render/one.js`, woff2 over `file://`). No em-dashes.

**Boundary (load-bearing).** Nothing in the catalogue teaches hygiene or self-care routines (m: `apps['healthy-habits']` registered EN on 2026-09-23 with no landing; `data/science/` holds no hygiene bank; the only contact is the all-about-me "I can brush my teeth" self-report card). Neighbours it must not echo: **K-203** healthy / not-healthy FOOD and **G1-207** food groups (no food, eating, plate, meal, breakfast, fruit, sweets or drink other than water on ANY face, picture, reason, label or title; no "healthy / unhealthy" pair word: de "gesund / ungesund", nl "gezond en ongezond", da "sund / usund", es "saludables" alone) · **human-body K-354** (+K-360..363, G1-356) and the `body_parts` theme (no body part is labelled, counted, named as an answer or used as a title head) · **five-senses K-355** (+5) · **feelings K-319** (every figure is faceless: no emotion) · **all-about-me K-323** (+K-342..346; no "I can" self-report: the chart records a week of DOING) · **K-212** wants / needs (no good / bad bins) · the **road-safety** family K-369 (+K-371..374, G1-384, G2-360/361) and its **K-374 crossing steps** (the hand-washing face orders a HYGIENE routine; titles never carry the step-by-step family: en "step by step", de "Schritt für Schritt", nl "stap voor stap", sv "steg för steg", da "trin for trin", no "steg for steg", es "paso a paso" / "los pasos en orden", pt "passo a passo", fr "étape par étape" / "les étapes", it "passo dopo passo" / "i passi in ordine", fi "vaihe vaiheelta"; m: the live K-374 titles) · **science-sequence G1-203**, **animal-life-cycles G1-377** and **story-sequencing K-379** (never "sequencing / Reihenfolge / volgorde / sequência / séquentielles / järjestykseen" as a head; no daily-routine clock, no "ma journée / mi rutina / Tagesablauf") · **recycling K-357** (the tissue bin is colourless, `bin.js fill:'none'`). **This family owns daily self-care ACTIONS, their tools, their order, the germ-stopping choice, their reason, and a week of doing them.** Every picture on every face is DRAWN by the NEW `primitives/habit-pictogram.js` (0 library pictures: one art source per page, lock ruling 4). **Visual signature:** each habit sits on a cream plaque (the kindergarten washroom hook card); on the base the plaques hang from a peg rail over a shelf of drawn tools.

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-380` / `healthy-habits` / base **K**; F1 hand-washing **K** (`K-3xx (TBD by the emitter)`, content band K); F2 brushing teeth **G1**, F3 stop the germs **G1**, F5 habit chart **G1** (`G1-4xx (TBD by the emitter)`, content band G1); F4 why **G2** (`G2-3xx (TBD by the emitter)`, content band G2); allocated by `tools/alloc-b6var-ids.js` (exists, m) in README order. |
| subject | `apps['healthy-habits'] = {default_subject:'science', default_age_range:'5-7', exercise_type_axis_key:'healthy-habits'}` (registered EN, m; taxonomy 140 keys, m). `assetClass: geometry`, `exerciseType: healthy-habits`. |
| theme axis | **OFF** on all six faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. 0 library pictures. |
| unitAxis | not applicable. |
| CCSS en (honest) | **none** (no CCSS / NGSS hygiene standard). No `educationalAlignment`. en landing: "a kindergarten to grade 2 health unit (National Health Education Standards: practising health-enhancing behaviours); no Common Core standard". |
| strand | NEW additive row `'Health'` in `frontend/lib/seo/strand-names.ts`, written per locale by `tools/apply-b6-locale.js` from the draft's `strandNames['Health']` (the nt10-E `'Social Studies'` precedent, m `:88-95`). Reason: the existing `'Science'` row renders da "Natur/teknologi" (m), which does not carry DK health teaching (the obligatory topic "Sundheds- og seksualundervisning og familiekundskab"). Proposed literals below, panels confirm. |
| new primitives / data | `primitives/habit-pictogram.js` + `qa/verify-b6-habit-pictogram.js` · `templates/components-b6/healthy-habits.js` (exports prefixed `hh`) behind `templates/components-b6.js` · `data/b6/healthy-habits.js` + `data/b6/locales/healthy-habits.<loc>.json` via `lib/b6-common.js bank()` (§5). Reused primitive: `primitives/bin.js` (`fill:'none'`, `colour:'teal'`) for the F3 tissue bin. |

| loc | genre head (rail name, panels confirm) | ASCII slug (collision-free, m) | level K / G1 / G2 (`LEVEL_KEYS`, m) | phase chips F2 (before · during · after; ≤ 152 px measured) | national strand (NEW `'Health'` row) |
|---|---|---|---|---|---|
| en (US) | Healthy Habits and Hygiene (registered, m) | `healthy-habits` | `kindergarten` / `grade-1` / `grade-2` | before · during · after (55.2 / 55.6 / 40.8 px, m) | Health (National Health Education Standards) |
| de | Hygiene und Körperpflege | `hygiene-und-koerperpflege` | `vorschule` / `1-klasse` / `2-klasse` | vorher · dabei · danach (55.4 / 46.7 / 61.1, m) | Gesundheitserziehung (Lehrplan Sachunterricht, Perspektivrahmen) |
| es (MX) | Hábitos de higiene | `habitos-de-higiene` | `preescolar` / `primer-grado` / `segundo-grado` | antes · durante · después (46.7 / 66.7 / 70.1, m) | Vida saludable (SEP/NEM eje articulador) |
| pt (BR) | Hábitos de higiene | `habitos-de-higiene` | `educacao-infantil` / `1o-ano` / `2o-ano` | antes · durante · depois (46.7 / 66.7 / 56.1, m) | Ciências: hábitos de higiene (BNCC) |
| fr | Hygiène corporelle | `hygiene-corporelle` | `maternelle` / `cp` / `ce1` | avant · pendant · après (47.4 / 70.6 / 47.0, m) | Questionner le monde : la santé (programmes officiels) |
| it | Igiene personale | `igiene-personale` | `infanzia` / `classe-prima` / `classe-seconda` | prima · durante · dopo (49.2 / 66.7 / 43.2, m) | Educazione alla salute (Indicazioni nazionali) |
| nl | Hygiëne en verzorging | `hygiene-en-verzorging` | `kleuters` / `groep-3` / `groep-4` | ervoor · tijdens · erna (55.9 / 57.7 / 38.0, m) | Gezondheid (SLO kerndoelen, kerndoel 34) |
| sv | Hygien och goda vanor | `hygien-och-goda-vanor` | `forskola` / `ak-1` / `ak-2` | före · under · efter (34.4 / 49.6 / 40.6, m) | Hälsa (Lgr22) [NSR] |
| da | Hygiejne og gode vaner | `hygiejne-og-gode-vaner` | `boernehaveklasse` / `1-klasse` / `2-klasse` | før · under · efter (24.7 / 49.6 / 40.6, m) | Sundhedsundervisning (Fælles Mål) [NSR] |
| no | Hygiene og gode vaner | `hygiene-og-gode-vaner` | `1-trinn` / `2-trinn` / `3-trinn` | før · under · etter (24.7 / 49.6 / 40.9, m) | Folkehelse og livsmestring (LK20) [NSR] |
| fi | Hygienia ja terveelliset elintavat | `hygienia-ja-terveelliset-elintavat` | `esikoulu` / `1-luokka` / `2-luokka` | panel: short forms (e.g. "ennen · samalla · jälkeen", 51.9 / 66.9 / 61.3); the inflected "harjaamisen jälkeen" is **169.7 px and FAILS** the 152 px chip (m) | Terveys (OPS 2014 ympäristöoppi) [NSR] |

Slugs: none equals, prefixes or is prefixed by any `axes.*` slug in `topics-taxonomy.json` (m, 0 collisions). The sub-heads (hand washing, brushing teeth, germs) are FACE elements; the genre head stays the family's. Never a title word: nl "gezonde gewoontes" (adult lifestyle), fi "terveystieto" (yläkoulu subject), no "helse" / "mat og helse", fr bare "hygiène" / "propreté", en bare "hygiene" (products).

**The rule that locks the type.** Every closed answer is re-derived by the gate from the DRAWN parts of a pictogram (`data-lcs-part` groups parsed from the emitted SVG) through the bank's locale-neutral tables (`TOOL_OF`, `HAND_STATES`, `PHASE_OF`, `GERM_PAIRS`, `REASON_OF`), never from a word, a stamp or `meta`, and **every correct answer is current public-health advice in all 11 countries**: cough and sneeze into the elbow (or a tissue); soap, not water only; brush every surface and spit; **no quantity of any kind is printed or implied** (no seconds, minutes, hours of sleep, times a day, toothpaste amount, glasses of water, clock, timer or sand-glass). Answers ride on POSE and PART presence, never on hue: ink 54 / teal 80 / coral 151 / white 255 luma, and nothing distinguishes two options by teal versus ink alone.

## 2 The base page

**Concept.** "The washroom hooks: what does each child need?" (K). Across the top a teal peg rail with five pegs; from each peg a cream plaque hangs on two strings, and on each plaque a faceless child is in the middle of a habit **with the tool taken out of the picture**: washing at a running tap (no soap), a fist at the mouth with scrub marks (no toothbrush), lying under a blanket beside a moon and two stars (no bed), a hand on the head with three tufts (no comb), both hands cupped at the nose with a small burst (no tissue). Along the bottom a shelf plank carries five DRAWN tools (soap, toothbrush, bed, comb, tissue box) in a deranged order. The child draws a line from the dot under each plaque to the dot over the tool that child needs. Removing the tool is the teaching point: the child must name the SITUATION and recall its tool, which a picture holding its own toothbrush would reduce to shape matching. No word on the apparatus in any locale.

**Chrome budget.** Body **722** (3-line title + 3-line instruction; 814 one-line). Every stack below is designed to **677** (the 4-line fi title); slack is absorbed by the `minmax` line zone.

**Layout d2**
```
.ws-body 675 x 722 : root <div class="hh-hooks" data-ws-content data-lcs-mode="base"> CSS grid, padding 0 18 -> inner 639
  columns 5 x 127.8 (639 / 5); every plaque, dot and tool centred in its column
  rows [rail band 208] [line zone minmax(160px,1fr)] [shelf band 146]
RAIL BAND 208
  y 0     rail: teal rect 639 x 10, r 5
  y 5     pegs: circle r 7, fill creamDeep, stroke teal 3, at x = 63.9 + k * 127.8
  y 10    strings: two ink 1.5 lines from the peg to the plaque top corners (24 tall)
  y 34    plaque 116 x 150, cream, stroke teal 2.5, r 16 (HTML div)
          pictogram 104 x 104 (unit box 100 -> 104 px), 23 px top pad, centred
  y 184   gap 10
  y 194   match dot 14 x 14 coral, centred
LINE ZONE minmax(160,1fr): empty (677 case: 677 - 208 - 146 = 323 px; 722 case: 368)
SHELF BAND 146
  y 0     tool dot 14 x 14 coral
  y 24    drawn tool box 104 x 104, bottom-aligned on the plank
  y 128   plank teal 639 x 12, r 4 + two teal brackets 10 x 18 under x = 60 and x = 579
height 208 + 160 + 146 = 514 <= 677 <= 722 ; width 18 + 639 + 18 = 675
```
(re-measured: A's plaque 116 wide could not hold A's 124 px pictogram, whose unit box is square, so the pictogram is 104; critic §3.)

**Ladder** (guards key on these config keys, never on the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `layout` | `hooks` | **`hooks`** | `hooks` |
| `habits` | wash-hands, brush-teeth, sleep, comb-hair | **wash-hands, brush-teeth, sleep, comb-hair, blow-nose** | d2 + sun-protect |
| `pairs` | 4 | **5** | 6 |
| `plaque` / `pictoPx` / `toolPx` | 150 x 180 / 132 / 124 | **116 x 150 / 104 / 104** | 98 x 132 / 88 / 88 |
| `cueMarks` | on | **on** | off (pose + context only) |
| `toolOrder` | derangement | **derangement, not the reverse, not a constant shift** | as d2 |

**d3 ruling:** d3 adds a sixth pair and drops the cue marks: a harder page of the same move, never a face, and no copy describes it. d1 is the same move with four. Neither is published. **d2 contingency (data, not code):** if the human read of the 104 px render fails `blow-nose`, d2 swaps it for `sun-protect ↔ hat`; NEVER for `drink-water ↔ glass` (a hand at the mouth next to `brush-teeth`, pedagogy `neverTogether`).

**Composer (seeded, locale-neutral: the same five pictograms in the same order in all 11).** Plaque order: `rng.shuffle(habits)`. Tool order: redraw until it is a derangement of the plaque order (no tool in its own column), not the reverse, not a constant cyclic shift, and no two plaque-tool offsets equal for more than 2 of 5 pairs.

**Answer-hiding + uniqueness.** The page prints each habit's SITUATION and the tools, never a line and never the tool inside the habit. Stamps: plaque `<div data-lcs-habit="<key>">`, pictogram `<g data-lcs-pictogram="habit" data-lcs-pose="<pose>">` with parts `<g data-lcs-part="tap|water|basin|scrub|tufts|burst|moon|stars|blanket|sun|…">`; shelf tool `<div data-lcs-tool="<kind>">` holding `<g data-lcs-glyph="<kind>">`. No `data-lcs-answer` anywhere. **verify():** (1) the pairing re-derived from the bank's `TOOL_OF` (`wash-hands:soap, brush-teeth:toothbrush, sleep:bed, comb-hair:comb, blow-nose:tissue-box, sun-protect:hat`), read from the rendered `data-lcs-pose`, never the plaque stamp; (2) the tool set is a bijection onto `TOOL_OF` of the shown habits; (3) **tool leak:** no `data-lcs-glyph` (a whole tool) inside any plaque; (4) **shared-mark rule:** no part id appears both in a habit pictogram and in a tool glyph that is NOT its tool (the soap glyph is a bare bar on a dish with NO bubbles, and the brushing cue is scrub arcs, NOT foam: bubbles on the soap tile would pull the brushing child's line to the soap); (5) `neverTogether` (`brush-teeth`+`drink-water`, `wash-hands`+`bath`, `toothbrush`+`toothpaste`, `wash-hands`+`towel` on the shelf); (6) derangement rules above on the shipped seed, and **pooled over 400 seeds** no tool sits in any given column more than 30 % of the time and no offset value exceeds 40 % (both directions: a too-regular spread is a tell too); (7) 0 characters inside the body.

**Reused (exact).** `primitives/_svg.js` (`svgRoot el`) · `primitives/_tokens.js` (`color`; NO `codeColors` on any face) · `primitives/road-pictogram.js`: the drawing LANGUAGE (100 x 100 unit box, solid `ink`, head circle r 10, no face, `fmt`), not its back poses (their white head under a hair cap reads as a face with a hat) · `primitives/bin.js` (`fill:'none'`, `colour:'teal'`, F3 only; m: `fill:'none'` draws every part white with NO mark, so no recycling class shows) · `blankNumeralBox({w,h,answer:''})` (`templates/components-b3/ordinal-numbers.js:151`, m; F1 only, always an EMPTY answer) · `.ws-match` / `.ws-match-col` / `.ws-match-item--plain` / `.ws-match-dot--left/--right` (`page/page.css:355-392`, m; F4) · `CALENDAR[loc].weekStart` + `.dayAbbr` (`data/b2/calendar.js`, m; F5) · `rng.shuffle/sample/int`.

**NOT used.** Every library picture (one art source; soap, towel and shower do not exist in the library, so any library page would put a drawn soap beside painted objects). Opened and refused, for the record: `hospital/tissue` = **a pink box with a RED MEDICAL CROSS** (reads "first aid", not "nose"; opened by A, B, editor; the pedagogy's acceptance is withdrawn) · `around the house/glass` = a WINE glass (pedagogy, A, B) · `around the house|kitchen tools/cup` = hot drink (pedagogy, A, B) · `around the house/shampoo` = pump bottle that reads as liquid soap (pedagogy, A, B) · `around the house/sink` (vocab = KITCHEN sink in 7 locales; pedagogy) · `hospital/mask` (excluded topic) · `hospital/bed` (illness) · `around the house/trash_can` (outdoor wheelie bin, red lid; A) · `around the house/brush` = paint brush (pedagogy) · `around the house/faucet` (a blue garden-style tap; A, editor) · `kitchen tools/glass` (a plain tumbler, fine, but library; editor). Also not used: `primitives/family-figure.js` (it draws eyes; this family is faceless) · `body-figure.js` (K-354's apparatus) · `cardGrid` (the numbered badge is an order tell) · `answerBox` (stamps `data-lcs-answer`) · `science-category-sort.build()` (no healthy / unhealthy bins) · `image-vocabulary.js`, `objForms`, `pictureFor` at render.

**NEW `primitives/habit-pictogram.js`** (pure SVG on tokens, Node-testable; 100 x 100 unit box scaled to the requested px, like `road-pictogram.walker`).
```
habitFigure({ pose, parts = POSE_PARTS[pose], px = 104, data = {} }) -> { svg, w, h, meta:{pose, parts[]} }
twoFigures({ pose, px = 124, data = {} })                            -> F3 own-cup / shared-cup
habitTool({ kind, px = 104, data = {} })                             -> { svg, w, h, meta:{kind} }
handsView({ state, px = 176, data = {} })                            -> F1 sink-band close-up
brushCard({ kind, px = 104, data = {} })                             -> F2 close-up
POSES, POSE_PARTS, TOOLS, HAND_STATES, BRUSH_KINDS
```
*Figure grammar (A's profile language, B's print rules).* Every figure faces RIGHT in PROFILE (hand-at-mouth, elbow-over-mouth and hands-at-nose read in profile; front views of them merge into a blob). Head `circle(52,15) r 10` solid ink, NO face, NO hair cap; anchors MOUTH (61,19), NOSE (62,14), CROWN (52,5). Torso `M45,27 H58 Q61,27 61,31 V60 H45 Z`. Legs two round-capped lines stroke 8, hip (49,58)→(48,93) and (55,58)→(57,93), feet rect 10 x 4 r 2. Arms round-capped polylines stroke 7, shoulder (53,31) → elbow E → hand H, hand `circle r 4.5`; a far arm (both-hands poses) is drawn FIRST in `inkSoft`. **A hand that overlaps the head or body carries `stroke white, stroke-width 2, paint-order stroke`** (B) so it separates in 1-bit print. Motion / cue marks: `ink` stroke 2.5, round caps, fill none. Palette: `ink inkSoft teal tealSoft white cream creamDeep coralSoft` only (no `coral` inside a pictogram: coral is the pencil colour of dots and boxes).

| pose | near arm E ; H (far arm) | cue / context parts (`data-lcs-part`) | forbidden on the base |
|---|---|---|---|
| `wash-hands` | (60,42) ; (74,46) (far (57,43) ; (71,48)) | `tap` teal pipe `M70,26 H84 V30 H80 V36 H74 V30 H70 Z`, `water` 3 teal lines x 73/76/79 y 38→46 stroke 2.5, `basin` teal rect x 62..92 y 50..56 r 3 | soap, bubbles, towel |
| `brush-teeth` | (64,34) ; (62,21) | `scrub` two arcs right of MOUTH (`M70,13 q5,7 0,14`, `M76,10 q6,10 0,20`) | toothbrush, bubbles / foam, cup |
| `sleep` | whole standing figure rotated -90° about (50,50), head to the LEFT, on a ground line y 78 | `blanket` coralSoft rect over the body, ink 1.5 outline; `moon` ink crescent r 7 at (22,24); `stars` two 4-point ink stars r 4 | bed, pillow, clock, any "Z" mark or letter |
| `comb-hair` | (62,20) ; (55,6) | `tufts` 3 ink spikes on CROWN (triangles 4 wide, 5 tall) | comb |
| `blow-nose` | (64,34) ; (63,15) (far (61,35) ; (61,17)) | `burst` 3 short ink arcs just in front of NOSE | tissue |
| `sun-protect` (d3 / contingency) | stand | `sun` white disc r 8, ink 2 outline, 8 teal rays at (84,12) | hat |
| `cough-elbow` (F3) | (63,19) ; (53,9), elbow E within 4 units of MOUTH | 3 short puff lines INTO the elbow crook | hand at the mouth |
| `cough-open` (F3) | arm down (53,46) ; (56,60) | `spray` 7 dots r 2.2 fanned from MOUTH x 66..86 | hand at the mouth; dirt, frown |
| `tissue-in-bin` / `tissue-on-floor` (F3) | arm out (72,46) ; (80,52) / arm down | `tissue` white puff 10 x 10 r 3 ink 1.5 at the hand / on the ground line; `bin` = nested `bin.js` 22 x 30 px-equivalent at x 70..92, `fill:'none'`, same position in both | a coloured bin |
| `own-cup` / `shared-cup` (F3, `twoFigures`) | two figures at 0.72 facing each other | `cup` tumbler white ink 2, tealSoft water: one at each mouth / ONE held by both hands between them | hot drink |
| `drink-water`, `move-body` (F4, F5) | A's `drink` (63,36) ; (62,21) with `glass`; A's `run` legs (49,58)→(38,90), (55,58)→(70,86) + 2 motion lines | tools SHOWN on F4 / F5 (the answer there is the reason or the day, not the tool) | ball, sport kit, cup with a hot drink |

*Tools (`habitTool`, product view, 100 x 100, teal body + white fills with ink outlines; NO bubbles on any tool, NO cross).* `soap` bar `rect x22 y48 w56 h26 rx12` white ink 3 on a teal dish `rect x16 y74 w68 h6 rx3` · `toothbrush` (B) group rotated -35° about (50,50): handle teal `rect x12 y46 w58 h8 rx4`, head white ink 2, bristles white with 3 ink slits · `comb` (B) spine teal + 11 teeth · `bed` (B) headboard, footboard, white mattress, pillow, tealSoft blanket · `tissue-box` (B) teal box with a white puff, NO cross · `hat` (A) teal brim + crown · `towel` (never on the base shelf) · `glass` tumbler with tealSoft water (F4, F5 only).

*Close-ups.* `handsView({state})` (F1, B's "view into the same sink"): SINK BAND = teal rim `rect x0 y78 w100 h8 rx4` + white bowl `M4,86 H96 L88,100 H12 Z` teal 2.5 + TAP top-right (riser `rect x82 y8 w7 h22`, spout `rect x62 y8 w27 h7 rx3`, nozzle `rect x62 y15 w7 h5`, teal); two ink mitten hands. `brushCard({kind})` (F2): the same sink band only on the three AFTER-sink cards, a profile head close-up or a top-view arch on the others (§3 F2 table).

**Gate `qa/verify-b6-habit-pictogram.js`** (render-measuring, the `verify-b5-road-pictogram.js` pattern; never reads `meta` or a stamp): renders every pose, tool, hands state and brush card at its shipped size AND at **60 px**, rasterises, converts to 1-bit at luma < 160, and asserts: (1) any two items that may share a page (the bank's `coOccur` table) have 1-bit Jaccard < 0.72; (2) every F3 minimal pair differs by ≥ 6 % of the union's dark pixels and ONLY inside its declared differing parts (`spray`/`elbow`, `tissue`, `cup`, `bubbles`); (3) the F1 hands states are pairwise distinct as state vectors AND as 1-bit images; (4) no habit figure on the base contains a whole tool glyph, and no part id of a habit appears in a non-matching tool glyph (the shared-mark rule); (5) the near hand's rendered centre lies within 6 px of its anchor at 104 px (MOUTH brush, NOSE blow-nose, CROWN comb, tap stream wash); `cough-elbow` elbow box overlaps MOUTH; (6) every part's bbox ≥ 8 px on its short side at the shipped size; (7) no `coral`, no `codeColors`, no `<text>` inside any pictogram. **Poison (each must FAIL, the correct primitive is the control):** a `cough-elbow` drawn as a copy of `cough-open` (fails 2) · rinse without falling bubbles (fails 3) · a toothbrush added to `brush-teeth` (fails 4) · bubbles added to the soap glyph (fails 4) · the comb hand moved to the MOUTH (fails 5) · a `codeRed` fill (fails 7).

**NEW `templates/components-b6/healthy-habits.js`** (behind `templates/components-b6.js`, exports prefixed `hh`; inline CSS, class prefix `hh-`; every stage `data-ws-content`): `hhFace({mode, inner})` · `hhRail({cols, w})` · `hhPlaque({inner, w, h, dot})` · `hhShelf({tools, w, toolPx})` · `hhHooks(...)` (base) · `hhStepCard({state, w, box})` (F1) · `hhPhaseCell({kind, chips})` (F2) · `hhPairRow({left, right})` (F3) · `hhReasonMatch({habits, reasons})` (F4) · `hhWeekChart({rows, days, labels})` (F5).

**Alternatives (rejected).** (1) **B's circles-and-squares `.ws-match`** (5 habit discs 120 / pictogram 96 left, 5 tool squares right): sound, but its 96 px pictogram is smaller than the hooks' 104, its dashed "slot ring" marker is an abstraction a five-year-old reads as a ball or an answer circle, and the washroom-hook row is the one image every K child in all 11 countries already owns. B's print rules and gate are kept. (2) **The pedagogy's library object column** (faucet, toothbrush, bed, comb, tissue box, sunscreen, tumbler, bathtub): breaks the one-art-source ruling, the tissue box wears a medical cross, and the step faces cannot use library art anyway. (3) **A sun-to-moon day arc** (A): teaches WHEN (a daily-routine order, story-sequencing's boundary) and prints times. (4) **One big mirror scene** (A): radiating lines across a faceless figure in a mirror reads eerie at K.

**Risks → mitigations.** *Pose legibility at the smallest size in greyscale* (the lead's named risk): `sleep` is carried by THREE redundant cues (horizontal body + blanket + moon and stars), `blow-nose` by TWO hands at the NOSE + a burst ABOVE the mouth line versus `brush-teeth`'s ONE fist at the MOUTH + scrub arcs to the side, `cough-elbow` by the elbow crook ON the mouth anchor (gated ≤ 4 units) plus puffs stopping at the sleeve; the 60 px 1-bit gate measures confusability, and a **human read of the 104 px render at 100 % and of a 50 % greyscale print** by the builder AND the pedagogue is mandatory before the bank freezes (a gate cannot say a silhouette "reads"). **Palette:** tokens only, no `codeColors` (gated). **Font floor:** no text in the base body; the smallest text on any face is 16 px (F5 labels). **Pencil space:** line zone ≥ 160, dots 14.

## 3 Faces 2-6

All five are CODE faces (a `mode` knob on `build()` + a `verify()` branch, stamped only when declared, so the base stays byte-identical); none is PARAM, because no base level is a different teaching move. Each has a distinct resolved d2 `layout` (`hooks` / `steps-write` / `phase-chips` / `choice-pairs` / `reason-match` / `week-chart`, `tools/gate-variation-distinct.js`), a distinct apparatus and a distinct query face. The plaque (cream, teal 2.5, r 16) is the one element every face shares.

### F1 : Hand Washing Steps (K, `K-3xx (TBD by the emitter)`, CODE `mode:'hand-washing-steps'`)
**Move:** ORDER the hand-washing procedure (one hygiene routine), writing 1 to 5.
**Layout (B's sink plates, A's plaque signature):** five `handsView` close-ups, each on a plaque 188 x 188 (close-up 176) over an EMPTY `blankNumeralBox({w:64,h:60,answer:''})`; card 200 x 268 (6 pad + 188 + 10 + 60 + 4); flex rows 3 + 2 (second row centred), column gap 19: **3 x 200 + 2 x 19 = 638 ≤ 639**; **2 x 268 + 30 = 566 ≤ 677**.
**States (the WHO / CDC order, true in all 11; no seconds, no song, no counting marks, no tap-closing STEP):**

| state | draws | vector (tap · bubbles · soap · towel) |
|---|---|---|
| `wet` | tap ON (water under the nozzle), hands under it, soap bar on the rim, NO bubbles | on · 0 · rim · 0 |
| `soap` | tap OFF, soap bar between the hands, 3 teal drops under the hands | off · 0 · hands · 0 |
| `rub` | tap OFF, hands pressed together, 6 bubbles around them, soap on the rim | off · 1 · rim · 0 |
| `rinse` | tap ON, hands under it, 4 bubbles FALLING into the bowl below the hands | on · 1 · rim · 0 |
| `dry` | tap OFF, the towel held open between the hands above the sink | off · 0 · rim · 1 |

`wet` and `rinse` share the pose and differ ONLY by the falling bubbles (the teaching point: soap comes between them). **Config d2** `{mode:'hand-washing-steps', layout:'steps-write', cards:5, states:bank.handSteps, offBy:>=3}`; d1 `{cards:3, states:['wet','soap','dry']}`; d3 = d2 with a panel verb literal under each box to copy (G1 writing, unpublished).
**Verify:** each card's state re-derived from its PARSED parts (tap stream present, bubble count and position relative to the hands' bbox, soap position, towel present) through `HAND_STATES`, never from `data-lcs-state`; 5 distinct vectors; the key = the index in `handSteps`; printed order differs from the key in ≥ 3 positions, is not the reverse, and holds ≤ 1 adjacent pair that is consecutive in the routine; pooled over 400 seeds no state sits in its own reading slot (0 % by construction) and no state holds one slot > 35 %; 0 characters in any box or card.
**Query face:** hand washing steps ("hand washing steps for kindergarten", "richtig Hände waschen", "pasos lavado de manos preescolar", "como lavar as mãos", "comment se laver les mains maternelle", "come lavarsi le mani", "stappenplan handen wassen kleuters", "tvätta händerna bildstöd", "vaske hænder", "vaske hender", "käsienpesuohje lapsille").
**Refusals:** none.

### F2 : Brushing Teeth: Before, During and After (G1, `G1-4xx (TBD by the emitter)`, CODE `mode:'brushing-teeth'`)
**Move:** place each part of the brushing routine in its PHASE: before, during or after brushing (lead ruling: phases, never a numbered order, because the order of the tooth surfaces is a German school method (KAI) and false as a single numbered answer in 10 locales, while the phase of every card is the same in all 11). The three "during" cards are the three surfaces (chewing, outside, inside), so "brush every side" is taught without an order.
**Layout:** two columns x four rows of PHASE CELLS; root padding 0 10 (inner 655); cell 320 = card 120 x 120 (a plaque, `brushCard` 104) + gap 16 + a vertical stack of the SAME three phase chips in the SAME order top to bottom (before, during, after), each chip 184 x 40 (white, teal 2 border, r 20, Nunito 800 **18**, text box 152), gap 8 (3 x 40 + 2 x 8 = 136). **320 + 15 + 320 = 655 ≤ 675; 4 x minmax(136px,1fr) + 3 x 14 = 586 ≤ 677.** The child circles one chip per card. (Chosen over the pedagogy's eight lines converging on three word bins, which cross the lower row's cards: the K-369 F4 precedent.)
**Cards (8, all drawn; one art source):**

| kind | phase | draws (the cue the gate parses) |
|---|---|---|
| `open-tube` | before | a hand unscrewing the cap of a toothpaste tube, cap drawn beside it; no brush |
| `paste-on-brush` | before | a hand squeezing the tube onto the bristles of a level brush; a small white paste curl (never sized, never labelled) |
| `chewing` | during | side view of 3 molars, bristles ON TOP of the crowns |
| `outside` | during | top-view U arch of 10 white teeth (ink 2), brush head centre OUTSIDE the arch polygon |
| `inside` | during | the same arch, brush head centre INSIDE the arch polygon |
| `spit` | after | profile head leaning over the sink band, 3 drops from the mouth into the bowl; NO cup, NO water glass |
| `rinse-brush` | after | the brush under the tap stream with 3 foam bubbles FALLING off the bristles (foam = used; a foam-free brush under the tap would read as "wet the brush first", a contested BEFORE step: two right answers) |
| `brush-in-cup` | after | the brush standing bristles-up in a cup on the rim, no hand |

Every cross-phase confusable was removed (critic §1 #9-#10): `take-brush` (hand lifting the brush out of the cup) is DROPPED because it shares brush + cup with `brush-in-cup` across phases; the two tube cards share a tube but are both BEFORE, which is harmless. **Never drawn:** rinsing the mouth (NHS / Folktandvården / Tandlægeforeningen advise NOT rinsing, others do), wetting the brush first, flossing, mouthwash, a clock / timer / sand-glass, food, a paste amount.
**Config d2** `{mode:'brushing-teeth', layout:'phase-chips', cards:8, perPhase:{before:2, during:3, after:3}}`; d1 `{cards:6, drop:['open-tube','inside']}`; d3 `{cards:8, kaiOrder:<locale flag>}`: only where the panel sets `kaiOrder:true` (de), the three "during" cards also carry an empty `blankNumeralBox` for K-A-I; every other locale d3 === d2 (recorded, never published).
**Verify:** phase re-derived from the parsed card kind through `PHASE_OF` (bank), never from a stamp; the brush-head centre lies outside / inside the parsed arch polygon on `outside` / `inside`; `rinse-brush` has ≥ 3 bubbles below the bristles; the chips are identical in text and order in every cell (a varying chip order is a position cue); reading order is not grouped by phase (no two same-phase cards adjacent in reading order more than once), is not a staircase (before-before-during-during-...), and pooled over 400 seeds each phase appears in each reading slot between 15 % and 55 % of the time; the bank holds no mouth-rinse kind; 0 characters on any card.
**Query face:** brushing teeth ("brushing teeth worksheet grade 1", "richtig Zähne putzen Klasse 1", "cepillado de dientes primer grado", "escovar os dentes 1º ano", "comment se brosser les dents CP", "lavarsi i denti classe prima", "tanden poetsen groep 3", "borsta tänderna", "børste tænder", "pusse tennene", "hampaiden pesu").
**Refusals:** none; fi must choose chip literals ≤ 152 px (the inflected "harjaamisen jälkeen" is 169.7 px, m).

### F3 : Stop the Germs: Choose the Healthy Way (G1, `G1-4xx (TBD by the emitter)`, CODE `mode:'stop-the-germs'`)
**Move:** CHOOSE between two drawn behaviours the one that stops germs spreading.
**Layout:** four rows, each two plaque tiles 220 x 140 (pictogram 124) 60 apart, row width 500 centred (70 px circling margin each side); rows `minmax(140px,1fr)`, gap 20: **4 x 140 + 3 x 20 = 620 ≤ 677**. The child circles one tile per row (tiles are rounded squares, so a pencil circle is visible around them).
**Pairs (healthy / other; the other twin is a CALM neutral pose: no dirt, no germ monster, no frown, no red X):** `cough` cough-elbow / cough-open · `tissue` tissue-in-bin / tissue-on-floor (same bin in both, so they differ only by where the tissue is) · `cup` own-cup / shared-cup (two figures in each tile, so "the busier tile" is no tell) · `soap` hands-with-foam under the tap / hands under the tap, no foam. Reserve (d3 fifth row): `toilet` wash-after-toilet / walk-away-from-toilet. **Rejected pairs:** blow into a tissue / wipe on the sleeve (the sleeve wipe is the SAME silhouette as the healthy elbow cough: two opposite verdicts on one pose, A) · wash before eating / eat unwashed (food on the page, and not-washing is an absence that cannot be drawn without shaming, A) · cover the cough with the HAND (outdated; never offered as correct, never offered at all) · masks, staying home when ill, screens.
**Config d2** `{mode:'stop-the-germs', layout:'choice-pairs', rows:4, pairs:['cough','tissue','cup','soap']}`; d1 `{rows:3, pairs:['cough','tissue','soap']}`; d3 `{rows:5, pairs:+toilet}`.
**Verify:** per row, the healthy tile re-derived from its parsed parts through `GERM_PAIRS` (`cough`: no `spray` part and elbow on MOUTH; `tissue`: tissue centre inside the bin rect; `cup`: 2 cups; `soap`: ≥ 3 bubbles), exactly one per row; the two tiles of a row share one figure scale (± 5 %); healthy side exactly 2 left / 2 right on the shipped seed and not `LRLR` / `RLRL`; pooled over 400 seeds the healthy tile is left 40-60 % overall and in each row index; the primitive gate's minimal-pair rule holds; no `cough-hand` pose exists in the bank.
**Query face:** germs ("germ worksheets for kindergarten", "Keime / in die Armbeuge husten", "cómo evitar los gérmenes", "como evitar germes", "les microbes CP", "i germi", "hoesten en niezen in je elleboog", "nysa i armvecket", "nys i ærmet", "nys i albuen", "yski hihaan").
**Refusals:** none; a locale whose school phrase is the sleeve (da "ærmet") keeps the same drawing (the elbow crook IS the sleeve).

### F4 : Healthy Habits: Why Do We Do Them? (G2, `G2-3xx (TBD by the emitter)`, CODE `mode:'why-habits'`)
**Move:** READ a reason sentence and match it to the habit it explains (the WHY; BNCC "razões").
**Layout:** `.ws-match` (padding 6 x 30 → inner 615, m): left five plaques 120 x 108 (pictogram 96, tools SHOWN here: soap and bubbles, the brush at the mouth, lying in a bed, running, a hat under a sun), right five reason cards `.ws-match-item--plain` **330** wide x 108, Nunito 800 **18** / line-height 22, ≤ 3 lines, padding 10 14 (text box 298); line zone 615 - 120 - 330 - 2 x 26 = **113 px** of line (A's 132 + 380 left 51 px, m); **5 x 108 + 4 x 12 = 588 ≤ 677**.
**Habits d2:** `wash-hands`, `brush-teeth`, `sleep`, `move-body`, `sun-protect`. (`cough-elbow` is NOT on F4: its reason and the hand-washing reason are both germ reasons, and "our friends do not catch our cold" is true of both: two right answers.)
**Reason literals (EN SOURCE, to AUDIT; each names a BENEFIT, contains no word of its own habit's label, no drawn tool, no body part shown as the habit's locus, no number):** `wash-hands` "It takes away the germs we picked up." · `brush-teeth` "It keeps holes away and our smile clean." · `sleep` "Our body and brain rest and get ready for a new day." · `move-body` "It makes our heart and muscles strong." · `sun-protect` "Our skin does not get burnt." Reserve (d3): `drink-water` "Our body needs it to work well." · `blow-nose` "We can breathe through our nose again." (The pedagogy's "Soap and water take germs off" names the drawn tool, and A's "before we eat" is a food word: both withdrawn.)
**Config d2** `{mode:'why-habits', layout:'reason-match', pairs:5, habits:bank.reasonD2}`; d1 `{pairs:4}` (no sun); d3 `{pairs:6, +drink-water}`.
**Verify:** pairing re-derived from the parsed pose through `REASON_OF` against the pill's `data-lcs-reason-for` (the gate owns the table; the stamp is only compared, never trusted as the answer); one-to-one; right column deranged (≤ 1 straight across) on the shipped seed and pooled over 400 seeds no reason sits beside its habit > 25 %; **no pill contains a `labelStems` entry of ITS habit or of ANY other habit on the page** (`(?<!\p{L})…(?!\p{L})`, case-fold, NFC); no digit, no number word 0-100 (`lib/number-words.js`); every pill ≤ 3 rendered lines.
**Query face:** why ("why do we wash our hands", "Warum putzen wir Zähne?", "¿por qué son importantes los hábitos de higiene?", "por que lavar as mãos", "pourquoi se laver les mains", "perché lavarsi", "waarom handen wassen", "varför tvättar vi händerna", "hvorfor vasker vi hænder", "hvorfor vasker vi hendene", "miksi pestään kädet").
**Refusals:** none expected; a locale whose reason cannot avoid a stem re-targets that habit to a reserve (data).

### F5 : Healthy Habits Chart for the Week (G1, `G1-4xx (TBD by the emitter)`, CODE `mode:'habit-chart'`, OPEN)
**Move:** SELF-MONITOR five habits over a week (an open tracker used all week).
**Layout:** a table on the lane: header row 40 (7 `dayAbbr` heads in the locale's `weekStart` order, Baloo 2 700 18 teal); five rows `minmax(96px,1fr)`: row head 176 = a small plaque 72 x 72 (pictogram 64) + 8 + a label box 96 wide (the panel's short habit label, Nunito 800 **16**, ≤ 2 lines), then 7 day cells 66 wide each holding one tick square 44 x 44 (white, `grid` 1.5 border, r 8; NOT dashed coral: 35 coral boxes would shout); rows alternate white / cream. **176 + 7 x 66 = 638 ≤ 639; 40 + 5 x 96 = 520 ≤ 677.** Rows d2: `brush-teeth`, `wash-hands`, `move-body`, `drink-water`, `sleep`. No clock, no count, no target, no score, no star, no smiley, no good / bad column.
**Config d2** `{mode:'habit-chart', layout:'week-chart', rows:5, days:7, labels:true}`; d1 `{rows:3}`; d3 `{rows:6, ownRow:true}` (a sixth row with an EMPTY plaque: "draw your own habit").
**Verify:** open-ended, no answer verify. Layout verify: 7 day heads equal to `CALENDAR[loc].dayAbbr` rotated to `weekStart` (or the bank's `weekStartOverride`), 35 empty tick squares ≥ 44 px, every label ≤ 2 lines, no digit anywhere on the page.
**Query face:** chart ("healthy habits tracker printable", "Hygiene-Wochenplan", "tabla de hábitos de higiene", "quadro de hábitos de higiene", "tableau des habitudes d'hygiène", "tabella dell'igiene personale", "weekschema hygiëne", "veckoschema goda vanor", "ugeskema gode vaner", "ukeplan gode vaner", "viikkotaulukko terveelliset elintavat").
**Refusals:** none.

**Rejected non-moves.** "moving or resting" sort (0 measured K-3 searches; its move survives as the F5 `move-body` row and the F4 reason) · a numbered brushing order 1-4 or 1-8 (A's mirrors, B's glue strip: lead ruling; the surface order is German-only) · "healthy or not?" circling with a sad twin (shaming) · colour-the-habit (a colouring page) · morning / evening routine and bedtime clocks (story-sequencing's boundary; quantities) · food, snacks, sweets, sugar (K-203 / G1-207) · how long to wash / brush / sleep (CDC 20 s vs WHO 40-60 s; "2 x a day" vs BR "after every meal") · toothpaste amount (pea vs rice grain) · masks · screens · bath versus shower (culture) · a habit word search or crossword (a spelling task) · relabelling base d1 / d3 as a face.

## 4 Native rebuild plan x11

Per locale the panel authors: 6 titles + 6 instructions · **3 phase chips** (F2; each ≤ 152 px at Nunito 800 18, measured by `bankword-width.js`) · **8 habit labels** (F5 rows + the F4 ban stems; short verb phrases, never a noun that agrees with a picture) · **`labelStems`** per habit (the F4 ban list) · **5 + 2 reason literals** (F4) · `kaiOrder` (de may set true; every other locale false: never invent a surface order) · `coughPhrase` (the school phrase: elbow / sleeve / arm crook, used in titles and landings only) · `weekStartOverride` (null unless the panel rules otherwise; es-MX checks it) · `strandNames['Health']` · the rail name + slug. **0 noun forms, 0 `objForms`** (m: no printed word agrees with a picture noun on any face; the base, F1, F2 cards and F3 print no word at all). Frames never inflect. Every instruction names only apparatus on its page. **The EN is a SOURCE TO AUDIT**, not a target: the panel reports any EN defect it finds.

| loc | literals | forms / slots | refusal | traps |
|---|---|---|---|---|
| en | 12 strings · 3 chips · 8 labels · 7 reasons | none | none | "good habits" is en-IN register (meta only); bare "hygiene" ranks for products: compound it; "sequencing" never; "during" not "while" (a bare chip "while" is not a word a child reads alone); US "Color" |
| de | same, `kaiOrder:true` default | none (KEEP_CASE: nouns capitalised in labels) | none | KAI spelt out once in the F2 landing (Kauflächen, Außenflächen, Innenflächen); never "Ernährung", "gesund / ungesund", "Reihenfolge", "Schritt für Schritt", "Tagesablauf"; "Armbeuge" |
| es (MX) | same | none | none | MX "lavado de manos", "cepillado de dientes", "cepillarse los dientes"; "saludables" alone reads FOOD; "gérmenes"; never "los pasos en orden" / "paso a paso" (K-374); "ficha" never in a title; `weekStart` is 1 in `data/b2/calendar.js` (m): the panel confirms or sets `weekStartOverride:0` |
| pt (BR) | same | none | none | "escovar os dentes", "lavar as mãos", "germes"; "corpo" never in a title; BR brushes after every meal: no frequency anywhere; "passo a passo" never; "atividade" never in a title |
| fr | same | none | none | never bare "hygiène" or "propreté" (toilet training); "microbes"; "les étapes" / "étape par étape" never (K-374); "tousser dans son coude"; NBSP before `:` `?` |
| it | same | none | none | "igiene personale" is also a care-work head (OSS): always with a school anchor; "germi"; never "i passi in ordine" / "passo dopo passo" (K-374); "scheda" never in a title |
| nl | same | none | none | **"gezonde gewoontes" never** (adult lifestyle); "gezond en ongezond" is K-203; "stappenplan" belongs to F1 only; "stap voor stap" never (K-374); chips "ervoor / tijdens / erna" (the bare "voor" is ambiguous) |
| sv | same | none | none | "steg för steg" never (K-374): F1 uses "bildstöd"; "nysa och hosta i armvecket"; definite forms written out; `\b` is ASCII-only in any sv lint [NSR] |
| da | same | none | none | "trin for trin" never (K-374); "sund" is the food word (K-203); "nys i ærmet" vs "albuen": the panel picks the school phrase [NSR] |
| no | same | none | none | "steg for steg" never (K-374); never "helse" or "mat og helse" (a food subject); "nys i albuen"; bokmål [NSR] |
| fi | same (chips and reasons written whole) | no nominative token inside a sentence | none | chips ≤ 152 px (m: "harjaamisen jälkeen" 169.7 fails); never "terveystieto"; "tavat" alone = manners; "vaihe vaiheelta" never (the step-by-step family); "pöpöt / bakteerit" the panel's choice; "yski hihaan" [NSR] |

Every panel OPENS one render of every face in its locale and confirms in writing that each pictogram reads as its habit to a child of the band (the gate cannot), that the calm twin on F3 looks calm, and that every reason fits exactly one habit in its language.

## 5 Data + gates

`data/b6/healthy-habits.js` (hand-authored; `module.exports = { HEALTHY_HABITS, COMMON }`, the bank object FIRST because `lib/b6-common.js bankModule` reads the first export, m) + `data/b6/locales/healthy-habits.<loc>.json` GENERATED from `i18n/.draft-b6-<loc>.json` by `tools/apply-b6-locale.js` after `tools/validate-b6-draft.js` (both exist, m; `data/` is gitignored, `git add -f`), read through `lib/b6-common.js bank('healthy-habits', loc)` (throws a REFUSAL on an absent locale, never an en fallback, m). `apply-b6-locale.js` writes BOTH `strings.<mode>` AND `i18n/strings.<loc>.json[<ID>]`; `tools/check-b6-string-parity.js` (exists, m) must report 0.
```
// data/b6/healthy-habits.js
const COMMON = {                          // locale-neutral, the GATE owns these
  TOOL_OF: { 'wash-hands':'soap', 'brush-teeth':'toothbrush', 'sleep':'bed', 'comb-hair':'comb',
             'blow-nose':'tissue-box', 'sun-protect':'hat' },           // drawn tool kinds, never theme/noun
  baseD2: ['wash-hands','brush-teeth','sleep','comb-hair','blow-nose'],
  neverTogether: [['brush-teeth','drink-water'],['wash-hands','bath'],['toothbrush','toothpaste'],['wash-hands','towel']],
  handSteps: ['wet','soap','rub','rinse','dry'],
  HAND_STATES: { wet:['on',0,'rim',0], soap:['off',0,'hands',0], rub:['off',1,'rim',0], rinse:['on',1,'rim',0], dry:['off',0,'rim',1] },
  PHASE_OF: { 'open-tube':'before','paste-on-brush':'before','chewing':'during','outside':'during','inside':'during',
              'spit':'after','rinse-brush':'after','brush-in-cup':'after' },
  kaiSlots: ['chewing','outside','inside'],
  GERM_PAIRS: [ {key:'cough', healthy:'cough-elbow', other:'cough-open'}, {key:'tissue', healthy:'tissue-in-bin', other:'tissue-on-floor'},
                {key:'cup', healthy:'own-cup', other:'shared-cup'}, {key:'soap', healthy:'hands-soap', other:'hands-water-only'},
                {key:'toilet', healthy:'wash-after-toilet', other:'walk-away-toilet', reserve:true} ],
  reasonD2: ['wash-hands','brush-teeth','sleep','move-body','sun-protect'], reasonReserve: ['drink-water','blow-nose'],
  chartRows: ['brush-teeth','wash-hands','move-body','drink-water','sleep'],
  coOccur: { base:[...], F1:[...], F2:[...], F3:[...], F4:[...], F5:[...] },   // for the 1-bit Jaccard gate
  REFUSED_LIBRARY: { 'hospital/tissue':'red medical cross', 'around the house/glass':'wine glass', ... }, // provenance
};
const HEALTHY_HABITS = { en: {
  strings: { base:{title,instruction}, 'hand-washing-steps':{…}, 'brushing-teeth':{…}, 'stop-the-germs':{…}, 'why-habits':{…}, 'habit-chart':{…} },
  phases: { before:'before', during:'during', after:'after' },
  labels: { 'wash-hands':'wash hands', 'brush-teeth':'brush teeth', 'sleep':'sleep', 'move-body':'move', 'drink-water':'drink water',
            'sun-protect':'stay safe in the sun', 'blow-nose':'blow your nose', 'comb-hair':'comb hair' },
  labelStems: { 'wash-hands':['wash','hand','soap'], 'brush-teeth':['brush','teeth','tooth','toothpaste'], 'sleep':['sleep','bed','night'],
                'move-body':['move','run','play','sport'], 'sun-protect':['sun','hat','cream'], 'drink-water':['drink','water','glass'], 'blow-nose':['blow','tissue'] },
  reasons: { 'wash-hands':'It takes away the germs we picked up.', … },
  kaiOrder:false, coughPhrase:'into your elbow', weekStartOverride:null,
} };
module.exports = { HEALTHY_HABITS, COMMON };
```
Helper contract: `stringsFor(loc, mode)`, `phaseLabel(loc, phase)`, `reasonFor(loc, habit)`, `labelFor(loc, habit)` THROW on a missing literal (never fall back to en).

**`tools/validate-b6-draft.js` (`healthy-habits` block; exit 1 on any):**
1. `phases`: exactly 3 non-empty literals, pairwise distinct, each ≤ 152 px at Nunito 800 18 (`bankword-width.js textWidthEm`; a character the table lacks THROWS, it never passes).
2. `labels` covers every `chartRows` + `reasonD2` + `reasonReserve` + `baseD2` key; each label ≤ 2 lines in 96 px at Nunito 800 16 (measured).
3. `reasons` covers `reasonD2`; each ≤ 110 chars; **no reason contains a `labelStems` entry of ITS habit or of any other habit in `reasonD2`** (`(?<!\p{L})…(?!\p{L})`, case-fold, NFC).
4. No FOOD word in any literal (per-locale ban list: food, eat, meal, breakfast, lunch, snack, sweet, sugar, fruit, vegetable, plate + the native equivalents incl. de Frühstück / Essen, nl eten / ontbijt, fi ruoka / aamiainen).
5. No digit and no number word 0-100 (`lib/number-words.js`) in any reason, label, chip or the base / F2-F5 instruction; F1's instruction may contain exactly the numerals 1-5 once each.
6. No quantity or time unit anywhere (seconds, minutes, hours, times a day, per day, twice + native equivalents).
7. The cough rule: no literal pairs cough / sneeze with the hand or "cover your mouth" (native list); `coughPhrase` names the elbow, the sleeve / arm crook, or a tissue.
8. Titles ≤ 70, no worksheet-word, no visible free-word, unique across the six and within the band; none contains a banned head: the step-by-step family ×11 (§ Boundary), "sequencing / Reihenfolge / volgorde / sequência / séquentielles / järjestykseen", "Tagesablauf / ma journée / mi rutina", "gezonde gewoontes", "Ernährung", "ungesund", "terveystieto", "mat og helse", bare "hygiene / hygiène", a body-part theme name (`body_parts` names ×11, m) or the human-body / five-senses / all-about-me type names ×11 (m).
9. Instructions ≤ 150 chars, one sentence, naming only apparatus on the face (base: child + line; F1: numbers + boxes; F2: word + circle; F3: row + picture + circle; F4: habit + sentence + line; F5: box + day + tick); none contains "sort", "cut", "glue", "colour" or a bin.
10. No title / meta / landing literal promises an answer key; no visible "free".
11. `kaiOrder` is boolean; true only where `locale === 'de'` unless the panel records a national source for another locale.
12. `strings` keys === the 6 mode strings; `strandNames['Health']` present and non-empty.

**`qa/verify-b6-healthy-habits.js`:** renders base + 5 faces x 11 locales x d2 through `render/render-instance.js` (file:// fonts) under the 722 stack (3-line de title + 150-char instruction) AND the 677 fi case, over the shipped seed + a **400-seed pooled sweep** for every position rule; asserts `verify()` empty, `qa/lints.js` clean, `verify-b6-habit-pictogram.js` clean; floors itself (no size lint exists): base pictograms ≥ 104 and tools ≥ 104 (K), F1 close-ups ≥ 176 and boxes 64 x 60 (K), F2 cards ≥ 104 and chips ≥ 40 high (G1), F3 pictograms ≥ 124 (G1), F4 pictograms ≥ 96 and text ≥ 18 (G2), F5 tick squares ≥ 44 and labels ≥ 16 (G1); every chip / label / reason `scrollWidth <= clientWidth` and within its line cap; 0 characters in any drawn stage except F2 chips, F4 pills, F5 heads and labels; no `coral` or `codeColors` inside a pictogram; every printed literal === the locale bank; everything above the footer.

**Poison (each must FAIL for its OWN reason; the correct draft and render are the control):** P1 a tool glyph (toothbrush) inside the `brush-teeth` plaque → tool leak · P2 bubbles on the soap glyph → shared-mark rule · P3 base tool order = plaque order shifted by one on the shipped seed → constant-shift rule · P4 en reason for brush-teeth "Brushing keeps teeth clean" → rule 3 (own stems) · P5 en wash-hands reason "We wash before we eat" → rule 4 (food) · P6 es reason "Lávate las manos 20 segundos" → rules 5 + 6 · P7 an F3 `cough-hand` kind marked healthy → rule 7 + gate · P8 nl title "Gezonde gewoontes voor kleuters" → rule 8 · P9 sv F1 title "Tvätta händerna steg för steg" → rule 8 (K-374) · P10 fr phases with "après" twice → rule 1 · P11 fi chip "harjaamisen jälkeen" → rule 1 (169.7 px) · P12 pt chart label "escovar os dentes 3 vezes" → rule 5 · P13 da title "Sunde vaner og sund mad" → rules 4 + 8 · P14 F1 `rinse` card drawn without falling bubbles → state-vector duplicate · P15 F2 `rinse-brush` without foam → gate (two right answers) · P16 F2 chip order varied per cell → identical-chip rule · P17 F3 healthy side `LRLR` on the shipped seed → balance rule · P18 F4 pill naming "soap" beside the wash-hands plaque → rule 3 · P19 F5 with 34 tick squares → layout verify · P20 base d2 guard written as `difficulty === 2` fed a face config → the config guard fires · P21 a `mouth-rinse` kind added to `PHASE_OF` → bank rule.

**Page reads:** `bank('healthy-habits', loc)`, `COMMON`, `primitives/habit-pictogram.js`, `primitives/bin.js`, `data/b2/calendar.js` (F5), `lib/number-words.js` + `bankword-width.js` (validator only); NEVER `image-vocabulary.js`, `pictureFor`, `objForms`, `approved-words-*.json` or any library picture at render.

## 6 SEO plan

| face | title pattern (Germanic en / de / nl · Romance es / pt / fr / it · Nordic sv / da / no + fi; panels rewrite, ≤ 70) | meta MIDDLE (en; the child's instruction; whole 120-170 measured by `tools/measure-instruction-window.js`, exists, m; lengths *est.*) | coordinate |
|---|---|---|---|
| base | Healthy Habits: What Does Each Child Need? · Hygiene und Körperpflege: Was brauche ich? · Hygiëne en verzorging: wat gebruik je? · Hábitos de higiene: ¿qué necesito? · Hábitos de higiene: o que eu uso? · Hygiène corporelle : de quoi a-t-on besoin ? · Igiene personale: che cosa serve? · Hygien och goda vanor: vad behöver vi? · Hygiejne og gode vaner: hvad bruger vi? · Hygiene og gode vaner: hva bruker vi? · Hygienia ja terveelliset elintavat: mitä tarvitaan? | Draw a line from each child to the thing they need to wash, brush, sleep, comb or blow their nose | `{type:'healthy-habits', mode:'base', theme:'', level:<K>}` |
| F1 | Hand Washing Steps · Richtig Hände waschen · Handen wassen: het stappenplan · Pasos del lavado de manos · Como lavar as mãos: os passos · Comment se laver les mains · Come lavarsi le mani · Tvätta händerna med bildstöd · Vaske hænder: sådan gør du · Vaske hender: slik gjør du · Käsienpesuohje lapsille | Write 1 to 5 in the boxes to show how we wash our hands: wet, soap, rub, rinse and dry | `mode:'hand-washing-steps'`, K |
| F2 | Brushing Teeth: Before, During and After · Richtig Zähne putzen: vorher, dabei, danach · Tanden poetsen: ervoor, tijdens en erna · Cepillado de dientes: antes, durante y después · Escovar os dentes: antes, durante e depois · Se brosser les dents : avant, pendant, après · Lavarsi i denti: prima, durante e dopo · Borsta tänderna: före, under och efter · Børste tænder: før, under og efter · Pusse tennene: før, under og etter · Hampaiden pesu: ennen, samalla ja jälkeen | Circle when each picture happens, before, during or after brushing, and brush every side of the teeth | `mode:'brushing-teeth'`, G1 |
| F3 | Stop the Germs: Choose the Healthy Way · Keime stoppen: in die Armbeuge husten · Stop de bacillen: hoest in je elleboog · Alto a los gérmenes: tose en el codo · Como evitar germes: tosse no cotovelo · Stop aux microbes : je tousse dans mon coude · Stop ai germi: tossire nel gomito · Nysa och hosta i armvecket · Host og nys i ærmet · Host og nys i albuen · Yski hihaan: pysäytä pöpöt | In each row circle the picture that stops germs, like coughing into the elbow or throwing a tissue away | `mode:'stop-the-germs'`, G1 |
| F4 | Healthy Habits: Why Do We Do Them? · Hygiene: Warum machen wir das? · Hygiëne: waarom doen we dat? · Hábitos de higiene: ¿por qué los hacemos? · Hábitos de higiene: por que são importantes? · Hygiène corporelle : pourquoi ? · Igiene personale: perché lo facciamo? · Goda vanor: varför gör vi så? · Gode vaner: hvorfor gør vi det? · Gode vaner: hvorfor gjør vi det? · Terveelliset elintavat: miksi teemme niin? | Draw a line from each healthy habit to the sentence that tells why we do it | `mode:'why-habits'`, G2 |
| F5 | Healthy Habits Chart for the Week · Hygiene-Wochenplan zum Abhaken · Weekschema hygiëne en verzorging · Tabla semanal de hábitos de higiene · Quadro semanal de hábitos de higiene · Tableau de la semaine : mes habitudes d'hygiène · Tabella settimanale dell'igiene personale · Veckoschema för goda vanor · Ugeskema med gode vaner · Ukeplan med gode vaner · Viikkotaulukko: terveelliset elintavat | Every day tick the box for each healthy habit you did: brush, wash your hands, move, drink water and sleep | `mode:'habit-chart'`, G1 |

The measured sub-queries lead the faces (m, `_records/` round 1 + `v2/`): hand washing (en "hand washing steps for kindergarten", de "richtig hände waschen arbeitsblatt", es "pasos lavado de manos preescolar", pt "atividade lavar as mãos", fr "comment se laver les mains maternelle", nl "stappenplan handen wassen kleuters", sv "tvätta händerna bildstöd", da / no "vaske hænder / hender plakat børn / barn", fi "käsienpesuohje lapsille") and tooth brushing (en "brushing teeth worksheet kindergarten", de "richtig zähne putzen klasse 1", es "cepillado de dientes preescolar", pt "atividade escovar os dentes educação infantil", fr "comment se brosser les dents cp", it "lavarsi i denti scuola primaria", nl "tanden poetsen werkblad", sv / da / no "borsta tänderna / børste tænder / pusse tenner", fi "hampaiden pesu"). All titles are candidates the panels rewrite (validator rule 8). `coordinate.mode` is ALWAYS the face's mode string (base `'base'`), `theme:''`, level = the K key for base / F1, G1 for F2 / F3 / F5, G2 for F4. h1 = title; eyebrow = level label; strand chip = the NEW `'Health'` row literal; non-EN prose names the framework NAME only (Lehrplan, SEP/NEM, BNCC, programmes officiels, Indicazioni nazionali, SLO kerndoelen, Lgr22, Fælles Mål, LK20, OPS 2014); no `educationalAlignment`. Every landing carries the truth line: "Everything on this page follows the hand-washing and tooth-brushing advice of health authorities; the page shows no times or amounts, because those differ between countries." No title, meta or landing promises an answer key; `seo.words.free_printable` is metadata only, no visible copy claims "free". `topicMeta['healthy-habits']` ≥ 50 chars ×11 + `skill-sentences.<loc>.json['healthy-habits']` via `tools/register-b6-en-content.js` (exists, m) and the panels.

**Non-cannibalisation** (whole-landing 3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL ≥ 0.80 / WARN 0.65; *est.*):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F4 | the tool / a line to a drawn thing vs the reason / read a sentence | 0.20 |
| F1 vs F2 | hands, write 1 to 5 vs teeth, circle before / during / after, every side | 0.12 |
| F3 vs F4 | circle one of two, germs, elbow vs match a reason | 0.12 |
| F5 vs any face | a week, days, tick boxes | ≤ 0.08 |
| F1 vs K-374 crossing steps | hands, soap, towel vs road, look left and right | 0.06 |
| any face vs K-203 healthy food / G1-207 food groups | no food word | 0.04 |
| any face vs human-body K-354 / body_parts theme | no body-part labelling | 0.05 |
| any face vs five-senses K-355 / feelings K-319 | no senses, no faces | 0.03 |
| F5 vs all-about-me K-323 (+K-345 "I can") | a week of doing vs "I can" | 0.05 |
| F2 vs story-sequencing K-379 / G1-203 | phases of a routine vs a story / a life cycle | 0.04 |
| F3 vs recycling K-357 | a tissue into one colourless bin vs sorting waste by bins | 0.04 |

Boundary sentence on every landing: "Your child practises the everyday habits that keep germs away: washing hands, brushing teeth, coughing into the elbow. Healthy food is on the Healthy Food page; the parts of the body are on The Human Body page."

## 7 Hub visibility contract

A face appears under `healthy-habits` on `/[locale]/worksheets` IFF all four hold: (1) `apps['healthy-habits']` exists in `frontend/config/topics-taxonomy.json` with `default_subject:'science'` (PRESENT, m); (2) `axes['exercise-type']['healthy-habits']` has `slug` + `name` in all 11 locales (today en only, m; the other ten come from the panels, §1 table B, collision-free, m); (3) exactly one landing per face per locale with `coordinate.type === 'healthy-habits'` verbatim, `mode` per §6, `theme:''`, the §1 level key (K: base / F1; G1: F2 / F3 / F5; G2: F4), a unique slug and `canonicalDeckSlug` = the published deck; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=healthy-habits` (exists, m; expectations from `b6-designs/hub-expectations.json`, exported by `tools/export-hub-expectations.js --batch=b6`, exists, m; poison = drop one landing / drop `apps['healthy-habits']` must FAIL).

**Expected rows per locale:** en 6 · de 6 · es 6 · pt 6 · fr 6 · it 6 · nl 6 · sv 6 · da 6 · no 6 · fi 6 = **66**. No face is refused at design time. Recorded contingencies, each lowering the matrix explicitly if it fires, never padded: (a) a locale that cannot author three phase chips ≤ 152 px that a G1 child reads REFUSES F2 there (fi is the only measured risk, and its short forms fit, m); (b) a locale that cannot author five reasons clear of every stem REFUSES F4 there after exhausting the two reserves; (c) if the human read fails a base pose, the d2 swap is data (`sun-protect ↔ hat`) and costs 0 rows.
