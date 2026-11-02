# Worksheet makers — build log

The design is in this folder (ARCHITECTURE, ENGINES, ENGINES-ART, NEW-TEMPLATES, REVIEW-F3, OPEN-DECISIONS). This log
records what is BUILT, measured and committed, step by step, so any session can resume. Order: ARCHITECTURE §14.

**NEXT:** B3 in ARCHITECTURE §14 order — mazes, find-the-differences, how-to-draw, picture-tracing (same-different, sorting, dot-to-dot, color-by-number, coloring-pages built 2026-11-02; logic-puzzles is built); then B4–B7 (health-safety is NOT built: operator 2026-11-02). Mazes: K-405 family verify runs analyzeSvg in the maker (page.live), b8-common reads through the platform; still to do — real levels from data/hmx/levels.js, pinned fast seeds per (face, level[, locale]), the strands seam, the picture-path face (category rule on the sound machinery). Live republish queue on the server: fix1115 (dot-to-dot wording, 702) → fix1119 (beginning-sound bank, 49); local: fix1106 (traced j, 2,201) and fix1120 (chicken = hen, 240) → compare, upload, queue. After the queue: restore injections once, clean server + local.


## B3: Same & Different gated, Sorting, Dot to Dot; picture files on demand (2026-11-02)

**Same & Different** completed: answer marks for every template (odd one out = a choice, Find the Twins / Spot the
Difference = select, shadows / pairs = pair keys that number one side and badge the other, mutual pairs for K-058/K-078),
slots for every picture (K-069 NO_SLOT: its part and choices are drawn together), K-469 / K-470 crop windows marked
`data-lcs-art` for the lints. K-469 level 3 and G1-155 screens run the other way: the NUMBER (gap) is the item and every
offered piece / chip of its row is a target — with only the right pieces tappable the screen told the answer. A pair
part may carry `data-lcs-pair-group` (one row = its own task): settings-space measures chance inside the group (poison
3b). own-input blanks a swapped picture's file name AND vocabulary key in both pages (a picture may stand in two rows).

**Sorting** (B3, retires picture-sort → K-472). New: G1-485 Two-Circle Sort: Shapes and Colours (G3-353's diagram; shape ×
colour drawn by code, the colour WORD under each shape for black-and-white printers; es/pt/it/fr region words agree with
the feminine shapes) and K-472 Sort Into Two Groups (typed group names = free-text slots `slot.text`, any colour picture
of the library per group = `slot.anyPictures` keyed theme/noun, a picture in both groups refused; default page = a
reviewed two-group sort). Shell: the picker opens a text box for a free slot and shows multi-theme slots with theme chips.
Real levels: category sorts level 3 = four a bin (two strip rows), G1-207 level 1 = one food a group, K-264 3/4/5 a group,
K-213 level 1 four helpers + one left-over tool, level 3 six. Keys draw bin numbers (`types/_shared/key-number.js`, a
sample, never a badge: key parity). Long bin labels wrap inside their bin. Tier 3 (attributes) refused: no per-key review.
One review: cheese is dairy, potato / corn are grains outside the US, bacon / sausage, muffin, popcorn-box cereal, rice
and the party balloon retired, blueberry (a blue ball) retired, bed (needs) retired, bicycle a need in nl/da, farmer
holds a rake (never meets the gardener), doctor/nurse never share a page, doctor → thermometer, musician → trumpet, the
pilot pair removed; bin labels (Frukt och bär, Fleisch, Fisch, Eier, Kulkuvälineet …), instructions and printed headings
×11. Live: fix1114 (336 pages).

**Dot to Dot** (B3). New: K-473 ABC Dot-to-Dot: Capital Letters (the locale's capitals, A–J / A–T / whole alphabet) and
G1-486 Dot-to-Dot Math (the dots carry the answers of a numbered list of problems in a scrambled order; write-in answers =
the screen; the key draws the joined path). Past a level's scene pool the hand-drawn figures that take that many dots
follow (whole Nordic alphabet: 4 scenes + 7 figures). Review: "finish the picture" wherever the picture is partly drawn
(scene pages), American "count by", actions and ranges in every base text. Live: fix1115.

**Color by Number** (B3). New: K-474 Color by Sight Word (a bank word in every shape; the code's words are slots), K-475
Color by First Sound (a picture in every shape, the code the letter its name starts with — the reviewed first-sound bank;
every picture a slot, any picture of the page's letters) and G3-478 Color by Multiplication Fact (each product reached by
two facts) — K-241's engine, modes `words` / `sounds` / `facts`; the five code faces got real levels 1 and 3. Key = every
shape painted its code's colour (a drawn sample); screen = the code is a palette, the shapes drop targets. The illustrated
pictures (K-393 / K-394) are an ART family (data/cbn/lineart fetched per page; no index — the designs are listed in code).
**The first-sound bank was wrong on live pages** (K-228 Sort by Beginning Sound): letters whose picture starts with another
sound (en ship/shoe, de Speck, fr chou/chat/cerf, sv sjö/kök, no sky), pictures a child names with another letter (an ox
that reads as a cow, a sauce bottle = ketchup, a knee = leg, a face for chin, landscapes for lake / trail, blocks = cubes,
sofà = divano, sika = possu, cap = hat, Kohl / kål = salad, padlock = hangslot) and two duplicate words — all replaced IN
PLACE (a page that never held one is unchanged); live: fix1119 (49 decks). Review: one native + pedagogy reviewer.

**Coloring Pages** (B3, retires `coloring` → K-476). `types/_shared/coloring-page.js`: K-476 Coloring Page (1 / 2 / 4
drawings), K-477 Color and Trace the Word (the drawing's name dashed; level 3 also written), K-478 Color the Scene (drawings
of one theme standing together, never overlapping), K-479 Color by the Key (numbered drawings, a key whose lines the teacher
may retype — free-text slots). Black-and-white library themes only (`themeAxis.needsBwSibling`: the maker offers only B&W;
a colour theme is refused), white frames (a cream card prints a tint under the crayons), no key, no screen ("writing").
Own photos not offered (operator: no own-image upload); the old app's flip not kept. The review found **the chicken
picture (a grown hen) named with the chick / meat word** in fr / es / it / sv / da / no → image-vocabulary.js and both raw
copies now carry the hen word (the deploy heal brings the database along), picture indexes rebuilt; live: fix1120.

**Gate changes:** slot.refuse (a type's own refusal: two shadows alike, a conflicting pair) counts as a refusal; a free
slot skips the outside-the-pool probe; a pair slot publishes each pair's partner (`partners`) so a swap blanks it too;
K-057 offers only pictures whose shadow is unlike every drawn one; K-061 / K-213 draw their changes / left-over tools from
the DRAWN page (a swap moves nothing else); collision accepts one box on a one-item level (`ONE_ITEM`).

**Picture files on demand (ART).** A maker may declare `art: ['<dir>']` in topic-map: build-bundles preloads the
directory's `index.json` and copies every file of it into the data version without preloading it; the browser platform
fetches an ART path the build reads (`platform.setFetcher` / `fetchMissing`, pattern LAZY in lib/platform/browser.js)
and runtime.generate builds the same attempt again (also play.js and the parity gate). Dot to Dot: `data/d2d/index.json`
(tools/build-d2d-index.js; `--check` in scripts/makers/tests/d2d-index.test.js) holds each scene's fit summary and, per
figure setting, which scenes' numbers fit — so a page downloads only its own scene; Node reads every scene whole, as
before (216 pages identical in both paths). Extend LAZY and the index for each picture family as its maker is built.

## B2 (end): Number Tracing, Symmetry & Grid Copy; B3 start: Same & Different (2026-11-02; commits `758df5bed`, `0db8c267f`, `1ab7f8762`, `e937d5a71`, `599cf9f4b`)

**Number Tracing** (K-467 trace and count, K-468 number words). Review applied ×11. Digit 8 now starts at the top (it
started at the crossing): 858 live pages regenerated (fix1104). K-237 / K-249–253 are their own key (NO_KEY);
K-252 / K-253 verify uses `page.evaluate`, not puppeteer's `page.$` (the maker runtime has no `$`).

**Stroke font:** a j's hook tucks under the letter before it ("vi jf", "nel jä" on live pages). verify-letter-strokes
measures letter BODIES (it measured whole ink and passed the gap). `tools/impact-scan.js` rebuilds each live deck's page
(no browser) with a probe to find the decks a vector-only change reaches: 2,214 decks with a j inside a word (fix1106).

**Patterns:** rows that overflowed now shrink or stack the choices under the sequence (the choices covered the "?" on
live K-047/K-048/G1-155 — fix1105); K-465 screen choices 92 px, two wagons a row; G1-155 pair ids = the numbers its key
prints in the boxes.

**Shapes & Geometry:** K-464 counts spread (a third of the answers were 1): second pieces where a kind is alone, dealt
targets, the level max enforced (robot/castle/snowman from level 2), the key in a dealt order. G3-475 hours never equal
their card number. G3-356 quarter-hour minutes exempt with reason.

**Symmetry & Grid Copy** (G2-479 two mirror lines, G1-484 draw the other half on how-to-draw line art). sym-grid
mirrors EXACTLY across the drawn line (the published pages needed a column the grid did not have — fix1107, with the
native review's instruction fixes ×11). Faces got real levels; grid-copy arrow fits or is dropped; five new 7×7 pictures.

**Same & Different** (in progress): K-469 Find the Missing Piece, K-470 Picture Puzzle; "match the close-up" WITHDRAWN
(no browser-safe proof of one answer). K-057 / K-063 / K-069 synchronous on `data/picture-masks.json`
(`tools/build-picture-masks.js`, `lib/picture-masks.js`); K-069 part = the drawing's own top, look-alike choices refused
(the shapes theme had two right answers — fix1108); K-063's upside-down choice is a half turn (a vertical flip is a
mirror image too — fix1108).

## B2: Telling Time, Measurement, Graphs & Data, Shapes & Geometry, Patterns (2026-11-02; commits `cd8434375`, `f16580560`)

**Telling Time** (G1-477 time in words, G1-478 my day, G1-479 quarter hours, G2-474 a.m./p.m., G3-475 elapsed time on a
time line, K-462 make your own clock). G3-475: level 2 quarter hours, level 3 five minutes with three DIFFERENT hours per
page and lines from 5 o'clock (writing "2" everywhere and the printed hour labels were tells). Answer position: G1-149,
G2-250, G3-355 (central deal, `bothq` foils) — republished in fix1102.

**Measurement** (K-463 order by size in boxes, G1-480 paper clips, G2-475 rulers to cut out, G2-476 inches, G2-477 which
unit, G3-476 °F); K-035/036/037 draw only tall/long pictures; Short to Long and Paper Clips clear the card badge.

**Graphs & Data** (G1-481 our class graph — survey; G1-482 count, then graph). Native + pedagogy review: the survey names
each choice (vocabulary word), offers only everyday choices of 11 themes, asks as many classmates as a row has boxes
(8/10/12); G1-482's key colours boxes (pictograph `shade`); G2-239's key graph is 40 px shorter (fi key title wraps).

**Shapes & Geometry** (25 templates ×11): K-464 Shape Pictures (8 scenes of exact shapes, outline + colour key + count;
pieces only touch or nest — checked on the geometry —, never squares beside rectangles, pieces ≥ ~7 mm, hexagons ≥ ~10 mm;
level 3 turned shapes), G3-477 Draw Rectangles by Area (level 3: area + perimeter → one rectangle; key "Example" on 1-2),
G2-478 Nets (die / box / pyramid, one grey tab per seam). G2-247/248 picture slots inside their reviewed symmetry class.
`lib/b5-common.js` and `primitives/family-figure.js` read through the platform layer (the bundle refused `fs`).

**Patterns** (12 templates): K-465 Pattern Train (cut and glue; the pattern-train app), K-466 Make Your Own Pattern
(material), G1-483 Number Patterns (levels: repeating; +2/5/10; ±2/5/10). Review: K-466 says the pattern repeats and gives
6 of each picture; trains read left to right with "goes on" arrows; the train's screen has its own sentence
(`interactive-instructions.json <type>["marks:<id>"]`, new in build-screens/runtime). Every picture row is a slot.

**Runtime + gates.** A page with teacher edits keeps its unedited page's attempt (runtime.generate) — a swap on a retried
page was refused before. Picker greys pictures used in any slot. Gates: parity reads each maker's own data version;
declared-screens replays the seed retry; collision clips ink to overflow-hidden ancestors, exempts a balance object in its
pan and a 2 px object/row contact (poisons both ways); guessability reads by item centres; lints fail undefined / NaN;
own-input compares the swapped name as a whole word. Picture cache: 3 pictures had opaque backgrounds
(`image-cache/clear-background.js`, called by derive.js).

## B1 screen retrofit + Money maker + Two-Circle Sort rebuild + coins at their real sizes (2026-11-01)

**B1 screen retrofit (done).** Declared screens build in the maker through `runtime.screenFor()` (declared screen, else
the marks screen); the published face (level 2, copy 1) builds its declared screen only in the maker (`ctx.publishedScreen`,
24 type guards — the catalogue's published pages are unchanged). New: `gates/declared-screens.js` (every declared template ×
its screen levels × en + fi × copies 1-2, played by the bot, poison `shiftAnswers`), `gates/lib/marks-bot.js`, the marks
runtime's optional / blank boxes, counted place groups, sum groups and decimal entry; K-389 / G1-447 / K-454 got screens.
`scripts/makers/run-all-gates.sh` runs the whole suite (unit tests first).

**Money maker (built, local).** Six new templates on `types/_shared/money-more.js`: K-461 Which Coin Is It?, G1-473
classroom store price tags (material), G2-471 Fewest Coins, G2-472 Pay the Exact Price, G2-473 Same Amount, Different
Coins, G3-474 Count Bills and Coins; `lib/money-format.js` (the native-signed money format per locale); two native +
pedagogy reviews applied. Test `tests/money.test.js` (fewest ways = brute force over 1,000+ (set, amount) pairs; every
Fewest Coins card's largest-first way is the only fewest way; coin sizes; format).

**Coins at their real sizes (pedagogical fix, catalogue-wide).** Tokens grew with VALUE, so every page drew the dime
bigger than the penny and the nickel ("bigger = worth more", the misconception a coin page must not teach). Now
`data/money/currencies.js` carries each coin's minted diameter (`mm`) and `primitives/coins.js sizeFor` draws in proportion
(the largest coin = maxPx, never below minPx); the €1 / €2 / R$ 1 coins of a mixed strip are sized among the cents (€1 is
smaller than 50 ct). K-461's coins show their unit ("25 ¢") beside coin NAMES, the bare numeral beside amount labels.
Live: 2,628 decks of G1-211, G1-228–232, G2-276, G2-289–295 republished in place (pinned waves `_fix-coinsize-*`;
`guessfix-compare.js --positions` keeps the pages whose words MOVED — the coin numerals — and drops the rest).

**Two-Circle Sort (G3-353) rebuilt** (operator: "very confusing … make it pedagogically correct"). The old page: a
telegraphic instruction ("Left circle: this kind…"), a stray icon and a crossed-out dot as the circles' names, no box (so
"outside" was the strip), a small elephant against a big mouse (real-world size), twelve lines tangled across two circles,
and — found by the reviewer — two right answers when an "other" was one of the kind (a clownfish beside "Fish"). Now: the
circles named above the box (the kind's picture + its plural word; "Big pictures"); a box for "neither"; every thing drawn
big AND small; numbered pictures, the child writes each number in its region (the key writes them there); regions 1 …
⌈n/4⌉+1; only themes read for look-alikes, generic words (fish, bird, monkey, planet, boat …) never used, look-alike groups
+ IS_A pairs + a per-language word check (de Fische/Goldfische, es Camiones/Camiones de carga) keep the kind and the others
apart; the screen's tap areas fill their regions (verify measures every corner). Instruction ×11 + four titles (fr, it, no,
fi) native-reviewed. Gate `tests/venn.test.js` (5,280 pages over 40 themes; poisons both ways). The 22 live pages
republished in place (`_fix-venn2-*`); their deck titles are the live ones (metadata unchanged).

**Build defect found on the way:** `build-bundles.js` judged a template's languages on the manifest's first two themes, so
the six G2-319-family logic puzzles (G1-349, G2-319, G2-344, G2-345, G3-378, G3-379 — curated themes only) were offered in
NO language. The theme check now runs first (its reads recorded — the first version left the picture manifest out of the
counting bundle; build-thumbs caught it) and a language is judged on themes that build.

## Logic & Math Puzzles maker complete + guessability round 2 + the full suite's findings (2026-11-01, evening)

**Logic & Math Puzzles (built, local): 31 templates** — the 20 existing, task 6's eight (G1-470/471/472, G2-470,
G3-470…473) and three new ones: **G1-474 Secret Word Addition** (the old code-addition app: add the pictures, find the sum
in the code, write its letter in the row's box; the code never lists the letters in the word's order, decoys from the
locale's own alphabet), **G1-475 Solve and Rebuild the Picture** (the old math-puzzle app: each cut-out piece carries an
answer; glued onto its problem it rebuilds a library picture), **G1-476 Number Detective** (who am I? 1-20 / 1-50 /
1-100, clues between / even / odd / digit sum, one proven answer; `pv-more` mode `riddleRange`, G2-405 byte-identical).
Strings ×11 native + pedagogy reviewed. Tap-to-edit slots: the G2-319 logic-grid family (applied to the SETTLED page —
272 swaps, 0 other pictures changed), K-068, G1-157/158, G3-348/351, G3-353 (the kind and the other things; a swap must
keep every region true). Old apps → templates: sudoku G1-471, math-puzzle G1-475, code-addition G1-474 (`topic-map.js`
oldAppTemplates; `build-smart-links.js` rerun). Inventory regenerated; the 11 new logic templates filed under their
coverage points.

**Guessability, round 2** (gate `settings-space`). Every fix leaves the published page (level 2, copy 1) byte-identical
— proven against git HEAD on 20 seeds each:
- **G1-232 Which Purse Has More:** "the purse with more coins" and "the purse with the biggest coin" each pick the richer
  purse on about half the rows (were 85-97 %): the two traps take turns (a richer purse with fewer coins must hold the
  biggest coin), every page holds both kinds, level 1 allows 4 coins (with 3 the biggest-coin trap was impossible at its
  gap), and a row the random draws cannot meet is drawn from every purse pair (fi / nl have no 1 c / 2 c). Test in
  `tests/money.test.js`.
- **G2-471 Fewest Coins:** level 1 mixes 2- and 3-kind cards (with three kinds a 1-2-5 system answers only 1s); level 2 =
  any amount whose fewest way needs at most 4 coins; a coin worth more than the amount is not shown; each page picked for
  balanced answers. **G1-447 Find the Mistakes:** 3-5 of 8 sums wrong (2-3 let "nothing is wrong" score 75 %), sums within
  20 drawn evenly. **Number walls** (G1-246 family): a new copy caps any answer at an eighth of its empty bricks.
  **G3-350** balance: the missing number drawn evenly, different on each row. **G2-397** missing digits differ on a page.
  **G1-449** doubles spread. **G2-400** sums drawn evenly by parity, never equal to a number printed in the block.
  **G2-224** place digits differ; no digit in more than two boxes.
- Reasoned exemptions (EXEMPT may now be scoped per locale): K-031 prev+1, K-389 one word per page, K-437 letter
  frequency, G1-439 card-index (the result box can never be a card number), G1-266 / G1-267 sums of small walls.
- The gate: an OPTIONAL write box ("leave it empty if …") is a yes/no decision measured against 1/2 (kind `blank`), not
  one of N answers; two empty boxes in a row are not "the same number". Poison 5 both ways.

**What the full suite found, fixed:** the doubles family's mirror line (G1-247 + seven faces, the published page too)
was squeezed to 0 px on every card whose two groups overflowed the panel, and the pictures touched the frame — the line
keeps its width, the pictures shrink to fit (`components-b2.js mirrorGroups`); the card-number badge 30 → 24 px (content
reached under it on 8 templates); pdf-parity crashed on a font without a descriptor (`lookupMaybe`) and lost ä / ö / å
(the Windows pdftotext is Xpdf 4.00, Latin-1 by default → `-enc UTF-8`); collision: the two-attribute grid's pictures
sit in their header cells; the G3-377 / G3-380 "noun not cached" builds were the manifest rewrite in flight (rebuilt
clean).

**Live republish** (pinned waves, `guessfix-compare.js`; new `--keep-all` for fixes drawn in strokes or opacity; word
positions via PyMuPDF `tools/pdf-word-boxes.py`): batch 1 coins (2,276 decks), batch 2 G1-230 / G1-232 (352), batch 3
number walls + doubles + the vehicles crane (3,486), batch 4 G1-349 (176). RESULT: batches 1, 2, 4 republished; batch 3
(fix1101, 2026-11-02) 1,702 changed pages republished, 1,784 unchanged dropped, audits clean apart from pre-existing
title notes, injections restored (lostTB 0, lostMeter 0); fix1103 (G1-150 screen order, keep-all, 176) followed.

> 🛑 **NO DEPLOY (operator 2026-10-31):** no worksheet maker goes live until all 60 are built, tested and finalized locally. The pilot trio is a LOCAL pilot (built + reviewed at http://localhost:8490/), not a go-live. Everything is committed; nothing maker-related is deployed. The launch is one release of all 60.

## Task 6 (Fable 5.1): logic puzzles with one proven solution (2026-11-01, commits cae5fff55, 320fa2a38) — the last agent task

- Operator, the same day: **no more Fable agents** (tasks 7–10 are the main session's own work); my own Opus 5.5 agent is
  allowed when needed, one at a time.
- Handoff `handoff/06-logic-puzzles.md` (verified: `lib/logic-puzzles.test.js` 54/54 with independent oracles; the
  screen-from-marks change is a correct one-line bot fix — a bin tap is a toggle).
- Built: four engines `lib/logic-{sudoku,cages,code,balance}.js` (exhaustive uniqueness, technique-graded levels, browser
  p95 59 ms a page), eight templates G1-470/471/472, G2-470, G3-470/471/472/473 (`types/_shared/logic-more.js`), gate
  `unique-solution.js`. Strings: native + pedagogy read by the main session; picture sudoku now "draw the missing pictures
  or write their names" ×11 (as the published G1-158 — drawing six pictures is harder than the puzzle); merged into
  `i18n/strings.<loc>.json` (`_rule` stays in `logic-puzzles-makers.json`, read by the type).
- **The logic-puzzles maker is NOT built yet** (no maker name, inventory, coverage): at its place in the order, the per-maker
  recipe must also: all 20 existing templates expose no slot; decide whether the new graded picture sudokus replace or sit
  beside the published G1-158 / G3-348. (Fixed 2026-11-01: the G2-319 family is offered again — a build defect, see
  above; G3-353 rebuilt with a key and a screen.)

## Task 3 (Fable 5.1): release wiring, prepared locally, never run (2026-11-01, commits 920964550, ae4abee0c)

- Handoff: `handoff/03-release-wiring.md` (verified by the main session: the migration only CREATEs `maker_recipes` +
  `maker_share_links` and adds their foreign keys, no existing table altered; makers-store 47/47).
- Built: Prisma models + migration file (applied to nothing); the real recipe / link APIs behind the local stand-in's
  contract (`frontend/lib/makers/{store,db,auth}.ts`, routes under `frontend/app/api/makers/`), `link-store.ts` backed;
  old-landing smart links (`smart-links.json`; the launch button opens the new maker only once it is released on the
  server — one line in `MakerLanding.tsx`, nothing else on a landing changes); `release-pack.js` → `install-release.js`
  (hash-verified, immutable versions, pointers last), `patch-nginx-makers.py` (noindex, immutable versions), deploy.sh
  step 1c; gate 13 `registration.js` (19 poisons).
- **Server steps at the release (operator, in order; none run):** 1 PC `node scripts/makers/release-pack.js` → rsync to
  `/var/www/lcs-media/_staging/makers-release/`; 2 `patch-nginx-makers.py --dry-run`, then without the flag; 3
  `npx prisma migrate deploy` (§A.5.1); 4 deploy.sh; 5 curl checks (handoff 03).
- Open: the landings' mode cards still launch the old app; no dedicated rate limit for /api/makers/*; makers-assets
  unversioned (30-day cache, a changed picture needs a new name).

## Tasks 2, 4, 5 (Fable 5.1, run in parallel) + the defects their gates found (2026-11-01)

- **Task 2 — student play page + sharing** (`8bf516cd5`, handoff `handoff/02-student-play-and-sharing.md`): `/s/<id>`
  (per-link card, noindex, site chrome), the play shell from a recipe (marks screens played; other pages printable with one
  honest sentence), embed code with two backlinks outside the iframe, the subscriber play-meter bypass, deck → maker
  presets. Website side unbacked until task 3 (`frontend/lib/makers/link-store.ts` contract). Verified: play-shell 83
  checks + poisons, play-ssr 12. Strings `i18n/play-strings.json` 26 × 11: native + pedagogy read by the main session
  (no agent — operator hold): sv "plan" → "abonnemang", it "piano" → "abbonamento". Operator decisions open: a lapsed
  subscriber's links metered (not paused); the student page shows the teacher's typed title.
- **Task 4 — the five missing gates** (`06424af01`, handoff 04): settings-space, collision, screen-geometry, own-input,
  pdf-parity. Measurement fixes by the main session: screen-geometry scrolls each target into the window before reading
  what is under it (a 504-px phone window read every lower target as "nothing"), counts the footer as bare page, and
  does not count one element's two roles (a rainbow number is tapped first OR second) as an overlap — poison 5 fires
  again; screen-from-marks treats a box painted at opacity 0 as invisible (poisoned both ways).
- **Task 5 — picture engines in the browser** (`e8a5ad724`, handoff 05 + `spikes/S6-picture-engines.md`): every engine
  off sharp through `platform.picture`; pt-verify / htd laws / hm-verify (8 of 9 faces) identical in the browser;
  cbn outlines, fd layers, pt traces, silhouettes NOT identical → precompute; catalogue 56/56 hashes unchanged.
- **⚠ Lesson (operator anger):** the agents were told to run the full build + every gate under one shared lock — 70+
  minutes each, so three agents queued for 1.5 h and none finished. Agents now run only their own checks; the main
  session runs the full suite (handoff README rule 8, `e405654cd`). A finished agent can keep running in the background:
  check the task list, not only the agent list.

### Defects found by the new gates, fixed at the source (all levels, all locales)

- **Guessable answers (settings-space, replicated en + fi):** G2-225 the right value was ALWAYS the middle number →
  rank drawn from a per-page bag, the number + digit drawn to make it (33/33/33). Shared `distractorsFor` (K-002,
  K-017, K-018 …) drew ± at random → the rank is drawn first; K-002 offers wrong numbers as far above its top count as
  below its lowest. G1-133 / G2-223 the right expanded form was always the one sharing most pieces with the others →
  wider place-value mistakes, pair chosen so it is "most typical" a third of the time (28–34 %). G2-212 the right array was
  always the biggest → chain shape + side directions drawn for a balanced size rank, a side may go to 1. K-276 L1 sums
  3–6 → 4–7 (a whole of 3 had no believable smaller wrong number). Picture equations (G1-101…104, G1-115), K-451, G1-105
  drew the answer last, so the top sum / "1 left" filled half the boxes → the answer is drawn first (even spread).
- **Round 2 (after the re-run: 95 → 24 replicated tells):** G2-203 / G2-205 base-ten add / subtract drew the first
  number and filled the second to the limit (level 1 total 45 on 29–46 % of rows) → the result's tens and ones first;
  K-028, K-444 L3 (10 on 50–56 %) → the total first; K-450 quick look → the shared balanced-rank helper, as much room
  above the top value as below, ±3 for four choices. 11 more exemptions with reasons (bins, fact families, shared
  denominators, the count-on trail, the facts drill, the make-ten bridge, fact of the day, the ×1 row, rounding within 50).
  **Still open, recorded (mild, 14–25 %, not the lesson):** G2-397 L1 (digit 1 answers 23 %), G2-224 L2 (digits
  1–4), K-031 (marked positions often adjacent → previous + 1), G1-439 L3, G2-400 L2, G1-449 L3, K-437 (vowels are the
  commonest missing letters). The gate's EXEMPT table (30 entries, each tested to match its strategy and no neighbour)
  and its non-vacuity skip of the published level-2 copy-1 page of a declared-screen template (no screen build by design)
  are in settings-space.js.
- **K-243 family L3:** "New version" past copy 2 threw → every further copy is another mixed page.
- **G3-358 times-table faces (G3-364 …) L1/L2:** the same fault (copies planned up / down / turned; copy 3+ threw — found
  by settings-space build errors) → every further copy is 'mixed' (the same facts shuffled from its own seed); planned
  copies byte-identical, copies 3–6 all distinct.
- **Screen geometry:** K-458 hit boxes `fill="none"` took no tap → painted at opacity 0; G3-406 L1 tick boxes reached
  120 px past the line → ≤ 72 px; G2-410 L3 the match target covered the write boxes → it sits on the word.
- **Print order:** the preview now shows the keys after all pages, as Print and the PDF do.
- **Screen version dialog:** its own near-full-window dialog (was the 720-px picker box with two scrollbars).
- **NOT fixed, recorded:** collision hairlines ≤ 3 px (the 30-px card badge over thin card padding — a global padding
  change reflows every page; to decide with a measured plan); own-input's lint reads `/makers-assets/` pictures over
  file:// (361 false fails — serve through serve.js).
- **Exemptions to add to settings-space (the skill itself, not a tell):** K-008/K-009 more/fewer pictures; G1-455 and
  G2-351/G1-369 odd-even stripes and repeats; "any N parts" shading groups (G2-228, G3-316); G1-137/G2-219 the symbols
  in their fixed order < = > (two real outcomes without =); count-on / sequence pages where the answer IS previous + 1;
  the "+1" box of near doubles; unit fractions at G2-409 L1; set placeholders (G1-351, G1-456, G3-387).

### 🛑 Published pages changed by these fixes — need an in-place republish (server step, not done)
G2-225, G1-133, G2-223, G2-212, G2-203, G2-205, K-028, K-002, K-017, K-018 (and every other published user of `distractorsFor`), K-276 (L1
Level Set decks), G1-101, G1-102, G1-103, G1-104, G1-115, G1-105 — plus G2-224 from B1 #8. Interactive decks of these
types must be rebuilt by the publish pipeline, not by hand.

## Every page has its own template (2026-11-01, operator: "When the user adds pages he cannot add different templates")

- The screen kept ONE template for the whole worksheet: Add page could only add another copy of it, and a gallery click
  threw the other pages away. Now every page carries its own template and level (`state.tpls` / `state.lvls`).
- Touching a page selects it (coral outline; the settings start with a "Page 2" badge); the gallery and the settings
  change the SELECTED page. Add page adds a page of the selected page's template and selects it, so the next gallery
  click changes the new page. With several pages each header names its template. The selection follows its page through
  move / duplicate / remove. The theme stays one pick for the worksheet, shown per page as that template offers it.
- The answer-key setting appears when any page has a key; each page prints its own key; New version, the screen version
  and the downloads go page by page.
- Recipe: each page stores its template, level and theme (the schema always had them per page); `fromRecipe` no longer
  refuses a mixed worksheet, it refuses a page without a template or level. A reopened saved worksheet counts every
  template on it as opened (a free account's saved copy stays editable on every page).
- **New version renews the SELECTED page only** (operator, the same day: "it creates new version of all the pages"): that
  page gets a new copy and loses its swaps and drawing; the other pages stay byte-identical. The button shows only where the
  selected page's copies differ at its level, and follows the selection. click-shell +3 checks (page 1 only, then page 2 only).
- Gates: click-shell +7 checks (select page 2, gallery changes page 2 only, labels, gallery mark follows the selection,
  Add page copies the selected template, remove keeps the selection, a mixed worksheet prints); saves-shell saves and
  reopens a K-002 + other-template worksheet byte for byte; recipe test round-trips a mixed recipe.

## Task 1 of the ten (Fable 5.1): screen versions from the answer marks (2026-11-01, commits 8cb6e9dae, fe79ac4ab)

- Handoff: `docs/makers/handoff/01-screen-from-marks.md` (verified by the main session against the commits and files).
- Engine `scripts/makers/screen.js` (in every maker bundle): the screen build (`ctx.screen`) reads the page's answer
  marks → typed boxes, choice, select, pair (`data-lcs-key-badge` + `data-lcs-pair`), place; answers stripped from the
  served page; Check / Try again ×11. Runtime split into `emit/interactive-runtime-core.js` (byte-identical output,
  test `scripts/makers/tests/interactive-runtime-split.test.js`). Verdicts `scripts/makers/screen-verdicts.json`
  (writing / many-answers / material / later, per id and per level), `build-screens.js` writes them into templates.json;
  the maker has a "Screen version" preview. Gate `gates/screen-from-marks.js` (real clicks, key parity, no tell,
  classification).
- Totals after B1 #10: 109 marks screens + 209 declared across the built makers.
- The 5 generic screen sentences + 4 labels ×11 (`i18n/screen-instructions.json`): ONE native reviewer, 8 errors applied
  ("then tap Check" after ONE box → "When you're done, tap Check Answers" ×11, es-MX quotes, no tense, it pronoun, pt
  "quadradinho", da wording ×2, it screenNone) + optional wording.
- Open (operator / later): phone (360 px) page items ~17 px are reported, not failed; `later`: K-454, G1-447, K-389; the
  443 declared screens are not previewed in the maker; ARCHITECTURE §D.1 amendments not yet applied.

## B1 maker 10: Multiplication & Division (`multiplication-division`) — 33 templates + 6 new (2026-11-01) — B1 COMPLETE

- The 33 existing templates bundle with no engine change. G3-380 (share it out) offered the divisor sets "6-9" and
  "2-9", which its level 2 (the published face) refuses (a deal row holds 7 homes; 8 and 9 do not fit): the catalogue never
  built them, so G3-380 now offers only "2-5" (`unitAxis` override; catalogue unchanged). G3-311 passes every page on its
  own retry knob (`arrFit:2`, the published array overflows the browser's first layout) — reported, not changed.
- New templates (NEW-TEMPLATES §13; T6 is the number-bonds triangles, T7 built), `types/_shared/md-more.js`; every sign
  from `types/_shared/notation.js` (· and : / / per country; never ÷ in Swedish — the verify checks the page):
  - G3-407 the multiplication square (5 × 5 / 10 × 10 / headers only); blanks come in mirror pairs (review: a printed
    4 × 2 beside a blank 2 × 4 is copied, not multiplied).
  - G3-408 division facts (20 / 40 / 60; never ÷ 1, never quotient 0).
  - G3-409 fact of the day: groups, array, skip strip, both products, both quotients (panels sized to fill the page).
  - G2-411 draw the array on a dot grid (L2/L3 also the total).
  - G3-410 strategy chains ×4 / ×8 / ×5 / ×9, products within 100.
  - G3-411 keyring table cards (material; L3 answers blank).
- One native + pedagogy reviewer: 11 errors fixed (de Geteiltaufgaben / Tauschaufgabe / Umkehraufgaben, fr par bonds,
  pt conte pulando / cartões / tabuada da divisão, it cartoncini, es-MX argolla, da gangetabellen, en skip-count, nl
  keersommen / deelsommen) + most optional points; layout: commas on the skip strip, parentheses without inner spaces.
  The English "Answer key" heading is my preview script only. The order convention (a × b = a groups of b) matched every
  country; G2-411 states it.
- Coverage: G3-407/408/411 → 3:times-tables, G3-409/410 → 3:commutative, G2-411 → 2:arrays.
- Picture swap on the picture faces: `array-tasks.js` (K-027, G2-209/210/212/213/216/217, G3-301/302/309/311/312/314),
  G2-211, G3-377 and its share face G3-380 (`pic`, one index per card); the numeral templates are on the slots gate's
  no-slot list. Catalogue identical (slots gate).
- **B1 is complete (10 makers).** Next per the operator ruling (INTERACTIVE-AND-SHARING §F): the generic screen engine
  (agent 1, in progress) + the B1 retrofit, then B2.

## B1 maker 9: Fractions (`fractions`) — 16 templates + 5 new (2026-11-01)

- The 16 existing templates bundle with no engine change (all already interactive).
- New templates (NEW-TEMPLATES §12), `types/_shared/fr-more.js` + `data/fractions/words.js` (the "{n} equal parts"
  label and the words for 1/2, 1/3, 2/3, 1/4, 3/4 ×11; never 2/4, which is also one half):
  - G2-406 fraction strips to cut (material): every row exactly the same width; solid outline, thin solid inner lines
    (review: dashed inner lines read as "cut here").
  - G2-407 cut it into equal parts (drawing; the key draws one correct cut): only exact equal-area cuts; no triangle
    thirds (review: the centroid cut is not Grade 2 — a square into thirds instead).
  - G2-408 colour a fraction of the set (any circles of the right count); sizes 4-16, divisible by construction.
  - G2-409 shaded and not shaded (drawn swatches, no words); L3 also d/d = 1; levels 2-3 never a reducible fraction
    (review: a right "1/2" for 2/4 would be marked wrong).
  - G2-410 fraction words ↔ pictures (draw a line; L3 also writes the fraction); tap-pair marks for the screen engine
    (`data-lcs-key-badge` on the word, `data-lcs-pair` on the picture, key and screen builds only).
- One native + pedagogy reviewer: 9 findings applied except the English "Answer key" heading (preview script only):
  strips, triangle thirds, reducible fractions, "the fraction shown in each row" ×10, fr/fi/da/no/sv wording, the word
  page filling its body; optional: de "gleich große Teile" / "Brüche in Worten", no "tredjedel", en/fi wording.
- The screen engine (agent 1, in progress) derives screens for G2-408/409/410; G2-406 (material) and G2-407 (writing)
  need their verdicts in its `screen-verdicts.json` (asked).
- Coverage: G2-407/410 → 2:equal-shares-shapes, G2-408 → 2:fraction-of-a-set, G2-406 → 3:equivalent-fractions,
  G2-409 → 3:fraction-unit-build.

## B1 maker 8: Place Value & Rounding (`place-value`) — 18 templates + 5 new (2026-11-01)

- ⚠ **Published G2-224 printed the English column letters H T O in every language** (German pages "H T O" instead of
  "H Z E"). Fixed at the source: `lib/place-heads.js` (the school letters ×11, shared with the compare maker's
  which-place-decides page), `base-ten-tasks.js` pv-chart reads it. en pages unchanged; the other ten change on
  purpose. **The published G2-224 decks still need an in-place republish** (server step, not done locally).
- G2-223 level 3 (up to nine hundred-flats) ran past the page: the block unit shrinks only when a card has more than six
  flats (the published level 2 never does — catalogue unchanged).
- New templates (NEW-TEMPLATES §11), `types/_shared/pv-more.js` + the per-locale words in
  `data/place-value/words.js` (unit words, the "I am" line, 11 riddle frames ×11):
  - G2-401 expanded form both ways (L1 two-digit with its own line, L3 zero places + parts out of order; no box asks 0).
  - G2-402 place-value chart with the school letters + digit cards to cut (material; three card sets on the
    three-place levels — review: 333 needs three 3s).
  - G2-403 how many tens (L3 hundreds too, and 600 = 60 tens).
  - G2-404 more than nine of a kind (12 rods and 5 cubes …).
  - G2-405 who am I? riddles: the solver checks EVERY number of the range (review: it skipped round numbers, so 70 also
    fit), rejects a riddle an inclusive reading of "between" would break, requires every clue; three-digit riddles name
    the DIGIT ("my tens digit is 5" — 952 has 95 tens, G2-403); the level line says two- or three-digit.
- One native + pedagogy reviewer: 7 errors applied (the riddle solver ×2, the digit frames, three card sets, de "in die",
  pt "charadas", fi school words kymppiä / satasta) + most optional points (pt "quadro valor de lugar", es/nl titles and
  frames, it/fr frames, no "ledetrådene", fi "muodosta"). The English "Answer key" heading is my preview script only.
- Coverage: G2-401/405 → 2:expanded-form-digit-value, G2-402/403 → 2:read-build-3-digit, G2-404 → 2:bundle-ten-ones.

## B1 maker 7: Odd & Even (`odd-even`) — 6 templates + 4 new (2026-11-01)

- The 6 existing (b4) templates could not run in a browser, for two reasons: `lib/b4-common.js` read its banks with
  `fs` (now through `lib/platform/index.js`, the b3-common pattern; the 11 locale files are checked in the order the
  folder listing gave, so the merge order is unchanged), and `lib/picture-refusals.js:291` read `process.env` unguarded
  ("process is not defined"; the second failure, "reading '2'", was a knock-on). Every b4 family and every type that
  uses the picture refusals can now be bundled.
- New templates (NEW-TEMPLATES §10; the odd/even maze stays in the mazes maker), `types/_shared/odd-more.js`. The
  parity words are the published bank words (`data/b4/odd-and-even.js` chips) in the locale's order:
  - G1-455 odd and even number stripes on the number chart (L1 1-50, L2 1-100, L3 odd + the five ones digits).
  - G2-400 find the rule: three sums of one kind, then circle the rule (review: L1 had odd+odd and even+even, so both
    rules ended in "even" — now odd+odd and odd+even; the right rule chip's place is drawn per page). Every number
    from 2 up.
  - G1-456 cut and sort into the odd and even houses: the split varies 3…n-3, each house has n-2 spaces.
  - G1-457 read the number word, circle odd or even (nl 1 = "één"); one font size per page fitted to the longest
    word (fi/de compounds cannot wrap).
- One native + pedagogy reviewer: 6 errors applied (the stripes title said "even" over an odd page — now neutral
  titles; "Circle it" read as "circle the word"; nl honderdveld / eindigen op; sv i hundrarutan; da hundredetavlen) and
  most optional points (es tablero del 100, fi satataulusta, pt/fr/en L3 wording, nl houses). Not applied: fi plural
  house names (the house names are the published chip words).
- Coverage: G1-455/456/457 → 1:odd-even-pairs, G2-400 → 2:odd-even.

## B1 maker 6: Compare Numbers & Groups (`compare-numbers`) — 10 templates + 5 new (2026-11-01)

- The 10 existing templates bundle with no engine change. Replaces the old app `more-less` (oldAppTemplates
  `more-less` → G1-114, the picture-group comparison with < > =).
- Picture swap: K-008 / K-009 (compare-groups.js, one picture per row) and K-010 (three pictures per row: one slot role
  per row, `row1`…`row3`). The six numeral templates are on the slots gate's no-slot list.
- Existing numeral templates, levels 1 and 3 only (level 2 = the published page, unchanged):
  - G1-137 / G2-219 / G3-325 level 1 ran 10 px into the footer (three symbol chips stacked in six single-column rows);
    the chips now sit side by side when there are six rows.
  - G1-137 and G2-219 had the same numbers at every level (docs/worksheet-gen/level-ladder: "SAME-CONFIG"). Now real:
    G1-137 L1 to 20 without equal pairs, L3 the same tens or the digits swapped (38 vs 83); G2-219 L1 two-digit, L3
    the same hundreds. G3-325 keeps its numbers (its 4-digit published page is above Grade 3 — level-ladder records
    the ceiling risk; not changed here).
  - ⚠ The slots gate compares the catalogue output with HEAD, so these intentional level 1/3 changes fail it until the
    commit; it is re-run after the commit.
- New templates (NEW-TEMPLATES §9), `types/_shared/compare-more.js`, print-only with the shared key layer:
  - K-460 hungry crocodile: a drawn mouth (teeth, an eye) that opens toward the bigger number; circle the mouth or =
    (L1 numbers to 10 with dots, L2 two-digit, half sharing the tens); L3 three-digit, write the symbol, the mouths
    shown once above as the reminder (level line). The mouth faces each way equally often.
  - G1-453 compare both sides (3 + 4 ○ 5 + 1): a quarter equal; on at least 40 % of the cards the first numbers point
    the wrong way (the generator plans it, the verify measures it).
  - G1-454 make it true (24 < □ < 30, or one bound written both ways round): the key prints the whole accepted set
    (25–29, 59, 60, …).
  - G2-398 biggest and smallest number from digit cards: the printed row never contains an answer (review: with two
    cards every order IS an answer, so L1 makes two-digit numbers from three cards, its own level line); L3 has a 0
    and says the number cannot start with it.
  - G2-399 which place decides: two numbers in coloured place columns with each school's place letters (H T O, H Z E,
    c d u, C D U, h da u, H T E, S K Y); the key rings the first differing pair.
- One native + pedagogy reviewer: 7 errors, all applied — the digit-card tell, "write them in the boxes" in every
  locale, "Compare Both Sides" (half the cards subtract), it "lati" (the sides of a shape), G2-399 "the first two
  different digits" misreadable as two digits inside one number (now "the first pair, column by column", and "< or >"
  since = never occurs), the missing place headings, five calqued "make it true" titles. Optional points applied:
  sv "gapet", no "kjeften", de/it level-3 wording, fr/es/pt/it "the two calculations", de titles, it "cartellini",
  fi "muodosta", da "begynder".
- Coverage: K-460 → K:compare-groups, G1-453 → 1:true-false-equations, G1-454 → 1:compare-order-two-digit,
  G2-398 / G2-399 → 2:compare-order-3-digit.

## B1 maker 5: Doubles & Halves (`doubles-halves`) — 10 templates + 5 new (2026-11-01)

- The 10 existing templates (G1-247 and its nine faces) could not be bundled at first: `lib/b2-common.js` read the
  vocabulary through `publish-cli/deck-rich-alt.js` (Node `fs`). It now goes through `lib/platform/index.js`
  (`platform.vocab()`, the same loader in Node, so the catalogue is unchanged; the browser build swaps it). Every b2
  type that uses `safeNouns` benefits. ⚠ The bundler swaps the platform only for the explicit `./platform/index.js`
  path; a bare `./platform` is not swapped.
- New templates (NEW-TEMPLATES §8), `types/_shared/doubles-more.js`, print-only with the shared key layer:
  - G1-449 near doubles: 6 + 7 = 6 + 6 + [1] = [13] (L1, the double printed, its own level line), the child writes
    the double (L2, either order), half the cards "double minus one" (L3, its own level line). Within 20.
  - K-459 draw the double: the group, a dashed mirror line, an empty box; n + n. Within 10 at every level (review:
    it reached 20, which is Grade 1); L3 dots. The groups of up to 3 stay on one row.
  - G1-450 is it a double? Circle the doubles (40-60 % per page, drawn per page); L2/L3 write the half. "two equal
    GROUPS", not parts (review: 1 splits into two halves too).
  - G1-451 double and half machines: in → out, L2/L3 some inputs missing (level line), L3 to 100. The pills reuse the
    published G1-247 labels.
  - G1-452 doubles memory cards (material, NO_KEY): every number in one pair, and no number the double of another
    (review: 1 2 4 8 also pairs 2 with 4 — the generator and the verify now refuse a chain). L1 dots in two rows on
    every card (review: a different rule for the double cards told which card was which). No position badges.
- One native + pedagogy reviewer: 10 errors + 11 optional points. Applied: the chain, the K range, Danish/Norwegian
  compound stems and "en dobbelt/dobbel" (not a noun there), nl/sv wording, fi "puolet" (not "puolikas"), de plural
  machines and the result box, es-MX straight quotes, fr "donne la moitié", sv "Nästan dubblor", fi title = the pills.
  Not applied: de L1 naming the 1 (the box is always 1 at that level).
- My own containment check found the K-459 L3 de row 7 px wide and the 20-dot memory card 3 px wide; fixed.
- The published picture family (G1-247 and its picture faces) now lets a teacher swap the page's one picture
  (`lib/slot.js`; the tap target sits at the END of the card tag, because `lib/doubles-halves-screen.js` splits cards
  on the tag's exact opening). A numbers-only page still draws its noun (same random stream) but offers no slot;
  G1-271 (numbers at every level) is on the slots gate's no-slot list. The catalogue output is unchanged (slots gate).
- ⚠ Rebuilding ONE maker (`--makers=`) rewrites the shared data folder with that maker's files only; the parity gate
  then fails other makers with "data 404". Always end with the full build.
- Coverage: K-459, G1-450, G1-451, G1-452 → 1:doubles-halves; new point 1:near-doubles (G1-449).

## B1 maker 4: Addition & Subtraction (`addition-subtraction`) — 25 templates + 8 new (2026-11-01)

- The 25 existing templates bundled with no engine change (parity 150/150, live 1,650 pages). Replaces the old apps
  `addition`, `subtraction`, `math-worksheet` (the swap happens at release).
- New templates (NEW-TEMPLATES §7), `types/_shared/addsub-more.js`, print-only with the shared key layer:
  - G1-442 facts drill: 30 / 48 / 60 vertical facts, each in its own small card (at 10 columns a sign read as the
    neighbour's). L3 is within 20 with a teen in every fact.
  - G1-443 true or false: exactly half true, a false one never shows one of its own numbers (5 = 5 + 2 is false at a
    glance); L2 has the sum on the left, L3 has a sum on both sides. The tick and the cross are drawn.
  - G1-444 write the whole number sentence from a picture (two groups / crossed out; L3 the sign too, its own level
    instruction). `picture-equation.js` exports `group` / `crossoutGroup`; the latter takes an optional size (defaults
    = the published size).
  - G1-445 three addends within 20; L1 underlines the ten pair (level instruction), L3 has a pair on half.
  - G1-446 mental math to 100: L1 tens or ones, L2 the rest of Grade 1 (47 + 6 across a ten, tens on and off), L3
    Grade 2 two-digit ± two-digit.
  - G1-447 find the mistakes: X in the small box, the right answer in the big one, both empty when right. Wrong answers
    off by 1-2; L3 (Grade 2 work, within 100) also the forgotten carry, off by 10.
  - G1-448 bar models, each card at its own scale; L3 compares two bars (level instruction).
  - G2-397 missing digits in a column sum: every page's blanks are proven to have exactly one solution by trying every
    digit; L3 has two blanks in varying places. No pre-printed carry / borrow row (national methods differ;
    `data/column-method/methods.js` from ENGINES Q1 was never built).
- One native + pedagogy reviewer: 17 findings. The pedagogy ones are applied:
  - three addends past 20;
  - true/false items that were false at a glance;
  - mental-math levels 2–3 above Grade 1, now re-levelled;
  - find-the-mistakes never said what to do when an answer is right, in all 11 languages;
  - taking away only 1;
  - trivial facts on the to-20 drill;
  - the same blank places on every card.
  Also applied: wording fixes in 5 languages, fr "schémas en barres", and a clearer English L3 bar sentence.
  Not applied:
  - the English "Answer key" heading (from my preview script only);
  - the key showing a picture sum in picture order (8 + 1 is also right; the teacher reads the key);
  - find-the-mistakes L3 stays Grade 2 work, now said in the code.
- My own "nothing runs out of its card" check (in each template's verify) found three real overflows before the
  reviewer. The live gate then found two more on A4 with the longer de/pt instructions (I had checked Letter only). All
  are fixed; find-the-mistakes now has 8 rows.
- The published picture templates G1-101/102/103/104/112/114/115 (picture-equation.js) and G1-113 now let a teacher swap
  each row's picture (`lib/slot.js`). The catalogue output is unchanged (the slots gate compares against HEAD).
- Old apps: oldAppTemplates `addition` → G1-102, `subtraction` → G1-104, `math-worksheet` → G1-442.
- Coverage: G1-442 → 1:fluency-within-20, G1-445 → 1:add-three-addends, G2-397 → 2:column-method; new points
  1:true-false-equations, 1:check-answers, 1:write-the-equation, 1:bar-model, 1:mental-math-to-100.

## B1 maker 3: Number Bonds & Fact Families (`number-bonds`) — 16 templates + 5 new (2026-11-01)

- The 16 existing templates bundled with no engine change (parity 96/96, live 1,056 pages).
- New templates (NEW-TEMPLATES §6), `types/_shared/number-bond-more.js`, print-only with the shared key layer except
  the cards (material):
  - K-456 number houses (Zahlenhaus / splitshuis): floors 1 … N−1, never 0. L1 three houses of 4-6 with dots;
    L2 two houses of 6-10; L3 floors shuffled and half print the right part.
  - G1-440 number bonds of 100: tens, then fives, then any (no part on the fives). The key writes the answer into the
    dashed circle (an SVG circle is not a box the key layer fills).
  - K-457 how many are hiding: the total = shown pictures + a cup of ONE size; a picture slot per card.
  - K-458 rainbow pairs: arcs join the pairs that make N, and a number that is its own partner gets a ring. L1 has the
    outer pair drawn (its own level instruction); in L2 the order is mixed with partners never side by side (gated);
    L3 goes to 16. Arc height grows with span, so nested arcs never meet.
  - G1-441 fact triangle cards (no key): + − within 10 / 20; L3 is a × ÷ extension (tables 2, 5, 10) with each
    language's signs.
  - T2 make-ten bridge is G1-439 in Number Lines (F3). Cross-link cards are not built yet (no maker has them).
- One native + pedagogy reviewer: 11 findings, all applied. The biggest: the cards' instruction said "cut out the
  triangles along the dashed lines", but the dashed lines run around the CARDS, in all 11 languages. Also:
  - "a number that makes it with itself" became "its own partner";
  - de/nl/fi "up to 100" titles, since every whole is 100;
  - the L3 rainbow to 20 crowded its numbers, so it is capped at 16;
  - × ÷ was cut back to the gentlest tables;
  - wording fixes for fr, sv, da and pt (cup words, calques).
- Coverage: K-456 → K:number-bonds-k; K-457, K-458 → 1:make-10; G1-441 → 1:fact-families + 3:mult-div-relationship;
  new point 1:bonds-to-100 (G1-440).

## B1 maker 2: Number Lines (`number-lines`) — 21 templates + 6 new (2026-11-01)

- The 21 existing templates bundled with no engine change (parity 231/231, live 1,386 pages).
- New templates (NEW-TEMPLATES §5), `types/_shared/number-line-more.js`. All print-only with the shared key layer
  except the desk strips, which are material:
  - G1-438 open number line: a printed sum on an EMPTY line. L1 within 20 with a worked card 1; L2 within 100;
    L3 within 1,000. The key draws one jump path.
  - G1-439 jump to the ten first: a + [to the ten] + [rest]. L1 has a worked card 1; L2 adds subtraction; L3 is
    within 100.
  - G2-395 label the number line: both ends printed and every tick drawn, so the step is unique; no two boxes on
    neighbouring ticks.
  - G2-396 vertical number line: by 1s / 2s / 5s.
  - G3-406 fractions on the number line: cut in the fraction's own denominator; L3 is 0–2.
  - K-455 desk number lines (L3: five strips of 20 to glue into 0–100 — its own level instruction).
- One native + pedagogy reviewer: 15 findings, all applied except one. The biggest: "jump to the NEXT ten" sent
  subtraction the wrong way, in all 11 languages; it is now "the ten". Also: worked models, the box spacing, five
  fractions at L1, and the glue instruction. Rejected: "desk numerals 7–8 pt" — measured 18 px, about 13 pt on paper.
- `slots.js`: a template in a maker with no word data (topic-map `lang: 'none'`) needs a slot only when it draws
  pictures as content. This is a rule, not a growing list of ids.
- Coverage: new point 1:open-number-line (G1-438); G1-439 → 1:fluency-within-20; G2-395/396 →
  2:number-line-not-from-zero; G3-406 → 3:fraction-number-line; K-455 is material (no teaching point).

## B1 maker 1: Number Charts & Counting Sequences (`number-sequences`) — 27 templates + 5 new (2026-11-01)

- The first maker after the pilot. Bundling it needed three engine files made browser-safe, each proven unchanged in
  Node:
  - `lib/answer-slots.js` hashes through `platform.sha1Bytes` (20,000 keys: same slots; `pageSalt` equal);
  - `lib/b3-common.js` reads through the platform, looks up each of our 11 locale files instead of listing the folder,
    and loads its bank modules with the new `platform.requireData` (Node: `require`; browser: the modules the recorder
    saw this maker use, bundled in — `lcs-data-modules`). All b3 banks × 11 locales: identical data and the same 25
    refusals, old vs new code;
  - the component namespaces `templates/components-bN.js` (readdirSync) are generated at bundle time from their folder
    (the same merge, duplicate export = error).
  Parity 352/352, live gate 2,112 pages, 0 failing.
- New templates (NEW-TEMPLATES §4), print-only with the shared key layer, `types/_shared/number-chart-more.js`:
  - G1-434 the 120 chart (most missing numbers past 100);
  - G1-435 hidden picture on the hundreds chart — ONE colour, so it works printed in black and white and needs no
    colour words; the key paints the picture in that one colour; only pictures whose one-colour outline reads (the
    helicopter's rotor floated loose and was dropped);
  - G1-436 fill in an empty chart (L1 first row + column given, L2 first column, L3 101-200 first number only);
  - G1-437 skip count from a number off the step, within 120 (the strip factory, print-only);
  - G2-394 a chart inside one hundred (101-200 … 901-1000). NEW-TEMPLATES T4's steps of 100 went to G2 work, not
    G1-437.
  One native + pedagogy reviewer over the 11 languages and the renders: 20 findings, 17 applied (13 wording, level
  ranges, the one-colour key, the dropped figure). Not applied: the English key suffix (from my review sheet only, not
  the maker), and the same wording points on the published G1-129 (style, not a mistake).
- G1-126 Count in Groups gets a picture slot (the page's one picture); catalogue 18/18 identical.
- Gates: `slots.js` now covers every built maker. Its reference tree needed tracked `.json` files, `publish-cli` and its
  own copy of `data/b3`; otherwise it reported false "catalogue changed" results. It now looks for slots on every
  level, and allows templates that only have decorative pictures to have none. The Ten Frames pilot templates
  (K-446..K-454) had never been run through it; they are now covered. `parity.js`, `live-gate.js` and
  `build-bundles.js` default to every maker in `versions.json`.
- Coverage: G1-434/435/436 → 1:hundreds-chart, G1-437 → 1:skip-counting, new point 2:chart-within-1000 (G2-394).

## Answer keys for every maker template (2026-10-31)

- ONE key layer for all print-only templates (`scripts/makers/runtime.js` KEY_CSS + `keyMarks`): the answers the page
  already carries for its own checks are shown — an empty write-in box / answer cell shows its answer in teal, a right
  choice (`data-lcs-correct`) gets a coral ring, `data-lcs-key-ring` rings a picture or cell, `data-lcs-key-badge` puts
  the matching number on an item. Templates whose task is drawn draw ONE correct example when built with
  `ctx.answerKey` (`data-lcs-key-sample`): ten-frames filled / coloured, tallies drawn, the extra picture faint in its
  slot, the taken-away one crossed out. A key build may add answers, never change the content (the meta check).
- The key-only branches leave the catalogue untouched: 324 published pages + 792 ten-frames compared, 0 different.
- Per level: `build-bundles.js` records `keyLevels` (levels whose page has something to mark); the screen offers the
  Answer key switch under More options only there (K-438 Build the Word: levels 2–3).
- Every rule is scoped to `.lcs-keypage` (the key page's body). Print puts all pages in ONE document; the first version
  took the head of page 1 only, so PRINTED key pages showed no answers — found by the new screen gate, fixed in
  `printAll` (each page keeps its body class on its wrapper; the key layer joins the head).
- No key by design (13): K-012 (any pairing is right), K-239, K-388, K-391, K-433, K-434, K-439 (tracing / writing),
  K-435 (open drawing), K-440 (a game), K-441, K-453 (flash cards), and **OPEN: K-389, K-390** — sentence keys need the
  word seated on the writing line (`lib/key-on-row.js`).
- Gates: `answer-keys.js` (every keyed template × key levels × en + fi × 2 copies: every answer shown, rings and badges
  drawn, ≥ 1 mark, no overflow / footer / broken image; poison: the ring rule removed must fail) — **464 key pages
  pass**; `keys-shell.js` (switch only where a key exists, key page after each page, Print shows answers on the key page
  and none on the worksheet). Read by me: 16 key pages across both makers.

## Ten Frames maker: 7 new templates K-448..K-454 (2026-10-31)

- NEW-TEMPLATES §1 T1–T7, one factory `types/_shared/frame-more.js`: K-448 teen numbers on two ten-frames (L2–3
  "__ = 10 + __", L3 pictures), K-449 rekenrek (**new primitive `primitives/rekenrek.js`**: coral 1–5, white-ringed 6–10,
  readable in B&W; L3 both rows partly pushed), K-450 quick look dice/dominoes, K-451 take away on the ten-frame
  (**`ten-frame.js` gains `crossed`**, default 0 — 792 frames compared byte for byte with the old primitive: 0 different),
  K-452 numeral · ten-frame · tally, K-453 flash cards (L3 a self-contained pairs game), K-454 color the parts of 5 / 10.
  Labels `data/ten-frame-labels.js` (the published K-004/K-014 vocabulary). Coverage: new points K:teen-numbers
  (K.NBT.A.1) and K:take-away (K.OA.A.1); the rest joined count-how-many, subitize, tally-marks, number-bonds-k.
- Read every render and fixed: a squeezed answer box (rekenrek L1), a nonsense "color the beads" level (beads are
  already colored → L3 now reads both rows), tiny dominoes, ten-frames too small to draw in (40 / 30 px squares), frames
  too small to color, a 1-px footer overlap on the flash cards.
- One reviewer (native + pedagogy, 11 locales + sheets): "finish the sentence" → the number sentence / equation per
  language, da/no "lægge sammen" (= add!) + reflexive *sit*, fi partitive, es *maneras* / *Marcas de conteo*, nl *een
  deel van*, no K-446 *tierruten*; repeats removed (K-450 no item twice, L2 faces 4–9; K-451 take away 1/2/3 in equal
  shares, L1 four different cards), K-452 L1 also gives a tally, K-454 L3 "a different way in each frame" + red/blue
  marks by the boxes, en title "Color the Parts of 5 and 10".
- `scripts/makers/sweep-templates.js` (committed): every theme × level × locale × 3 copies — 10,494 builds 0 failing;
  live gate 3,432 pages 0 failing; all gates pass. Ten Frames maker: 17 templates.

## Counting maker: 6 new templates K-442..K-447 (2026-10-31)

- NEW-TEMPLATES §2 T1–T6, one factory `types/_shared/counting-more.js`: K-442 count and circle the number word (L3: write
  it from a word bank with 2 extra words), K-443 one more / one less, K-444 count on from a closed box, K-445 same
  number two ways (conservation), K-446 draw that many (L2: empty ten-frame), K-447 which group has that many.
  Labels `data/counting-labels.js`; per-level instructions in `i18n/level-instructions.json` (K-442 L3, K-443 L1–2,
  K-444 L1, K-446 L2). Coverage: K-442 → count-how-many, K-446/447 → count-out-n, and three new teaching points
  K:one-more-one-less (K.CC.B.4.c), K:count-on (K.CC.A.2), K:conservation (K.CC.B.4.b). Counting maker: 20 templates.
- **Answers placed by a balanced cycle** (never a coin per card); verify fails if the answer always sits in one place,
  and (K-447) if the right group is always the same size rank — the reviewer found n−1 / n / n+1 solvable by comparing.
- **Read every render** (en + fi/de, 3 levels): fixed tiny pictures in big cards (a best-fit row length), long fi words
  overflowing chips, a write-in box drawn over pictures (K-445 redesigned: line on top, spread below, one picture size
  for both groups), the "one more" empty box wrapping away from the row (reading-order grid, ≤ 5 a row), unequal
  picture sizes between groups (K-447: one size per card).
- **One reviewer, native + pedagogy, 11 locales + the sheets:** 17 wording fixes (es-MX *encierra*, da *sæt ring om* /
  *felt*, it *barrare*, fr/it/fi comparisons without a referent …) + K-447 distractors one-sided on part of the page,
  K-444 totals ≤ 10, a taped closed box, "hidden inside", and a worked example card at level 1, K-443 level 3 says what
  each label means, K-442 level 3 bank + 2 words.
- **Found while building:** the makers never applied `level-instructions.json` (147 templates print another instruction
  at some level; none in the 3 built makers, every later maker affected) — the bundle now carries `levels` and the
  screen's `stringsFor()` uses them (page, sample, thumbnails, live gate). And **a rebuild of an unchanged version
  deleted its thumbnails** — the version folder now keeps them, and `build-bundles.js` ends by making thumbnails
  (cached; `--no-thumbs` skips).
- Checks: 49,599 Node builds (every theme × level × locale × 3 copies) 0 failing; live gate 2,970 pages 0 failing; all
  shell gates, controls budget, thumbnails, old landings pass.

## P6 — gallery thumbnails in every language (2026-10-31)

- `scripts/makers/build-thumbs.js` (run after `build-bundles.js`): each template's SAMPLE page, made by the screen's own
  code (`__lcsMaker.sample` → the gated `generate()` ladder; one `sampleOptions()` shared with the screen), drawn at the
  page box, 320 px WebP q70 → `out/makers/<maker>/<version>/thumbs/<locale>/<template>.webp`. Cached by the page html
  (`out/makers/_thumbcache/<sha1>.webp`): first run 429 drawn in 90 s, a rebuild redraws only changed pages (2 s).
  7–17 KB each, 4.3 MB for the pilot (OPEN-DECISIONS #10a projected ≈ 140 MB for all makers).
- The gallery shows the built thumbnail (right-click/drag cancelled); a version without thumbnails falls back to the live
  miniature per card. Read: the fi sight-words and de counting sheets — correct language, nothing to fix.
- Gate `gates/thumbs.js`: every offered template × language has its thumbnail (429), 320 × 430, not blank; the gallery
  shows each card's own, loaded; a missing one → that card alone goes live. Poison: one file removed → FAIL.

## P4 (part 1) — save, reopen, My worksheets, colleague links, version pinning (2026-10-31)

- `shell/recipe.js` (§5.1 as built): a worksheet = settings + copy numbers + picture/word swaps + typed texts + drawings
  + decor, pinned to `makerVersion` / `dataVersion` (the content-hash folders). Drawings are simplified when the pen lifts
  (0.6 px, what is shown is what is saved); cap 256 KB (ten heavily drawn pages measured 154 KB). Test `tests/recipe.test.js`.
- `local-store.js`: the `/api/makers/*` contract of §8.2 served by the preview server (sign-in required, 409 on a stale
  save, 413 over the cap, one link per recipe and kind, public link reads, soft delete). The website routes + Prisma
  tables replace it at release — website code would ship with any unrelated deploy (operator: no maker deploy before all 60).
- Versions (agent): `out/makers/versions.json` history of (maker hash, data hash) pairs, appended by `build-bundles.js`
  (rebuilds are hash-stable); `record-fix.js` writes `docs/makers/migrations/<maker>.json`; `shell/resolve-version.js`
  (pure; 20 tests): a content fix on a recipe's template re-routes it to the fixed version with a dated note
  (ruling #5), polish never does, an unknown pin opens the current version.
- **Fixed:** the screen now loads each maker's OWN data version from the ledger. Before, building one maker alone
  replaced the shared `data/current.txt` with that maker's files and broke the others.
- Screen: Save / "Saved"; the address reopens the worksheet; My worksheets (all makers; open, delete); Share → a
  colleague link: read-only, the same pages, Print offered, "Save a copy" (a free account: one make). Reopening one's own
  worksheet never spends a make.
- Gate `gates/saves-shell.js` (20 checks, store backed up and restored): byte-for-byte reopen with drawing + typed title,
  conflict → new copy, the colleague view, a free colleague's copy, My worksheets + delete, unknown pin, a corrected
  template's re-route + note, anonymous. **It caught a real defect:** a colleague saw the template's sample page, not the
  shared worksheet (the page builder still used the old open/sample switch). Poison: a recipe that drops the typed title → 2 FAIL.
- 18 strings × 11 native-reviewed (4 fixes; de "Kollegin oder Kollege" kept as the school-standard neutral form).
- Not yet: the student link (needs the play page, first maker with a screen version); the deck → maker preset
  (`?preset=<deckId>`, needs the deck manifests — at release); the website side of all of this (P5).

## P3 (part 1) — downloads in the browser + spikes S2, S3, S5 (2026-10-31)

- `shell/export.js`: page html → SVG foreignObject → canvas, every font and picture inlined as a data URI first; white
  background; WebKit draws pictures late, so it redraws until two draws match (before: picture-less PNGs in 1 of 4 WebKit runs).
- **Save as image** (page tools): PNG of the whole sheet at 2×. **Download PDF** (top bar; iPad/iPhone, or `?pdf=raster`):
  one 3× JPEG per page at exact Letter/A4 via pdf-lib (already a dependency; bundled to `out/makers/vendor/`, loaded on
  first use, 431 KB). Both are one download on the meter. Print stays the vector PDF everywhere else.
- **iPad link:** the hub shows this PC's Wi-Fi address (http://192.168.10.240:8490/ today); the firewall already allows Node.
- Phone header: buttons two per row and the header scrolls away (a sticky four-button header took a quarter of 390 px).
- Gate `gates/exports-shell.js` (Playwright Chromium, Firefox, WebKit): PNG size + white paper, PDF pages at exact A4
  points, metering, and **S2** against the browser's own render (pixels differing beyond a 1-px neighbourhood):
  **Chromium 0.05 % · Firefox 0.01 % · WebKit 0.03 %** (line 0.5 %). Poison: an export without pictures → 5.9 % / 6.9 % FAIL.
- **S3** (`spikes/s3-layout.js`, report `docs/makers/spikes/S3-layout.md`): 13 pages × 3 engines, HTML byte-identical,
  lints/verify identical, max rect Δ 0.50 px (line 1.0), after measuring SVG by its geometry box (Firefox's client rect
  includes the stroke). **PASS** on this PC; Safari on a real iPad/Mac and ChromeOS still owed.
- **S5** (`spikes/s5-gate-time.js`, report `S5-gate-time.md`): gate p95 2 / 9 / 12 ms at 1× / 4× / 6× CPU throttle
  (6× ≈ 2019 iPad): **PASS** (line 150 ms). The whole new page (build + mount + gate) is p95 151 ms at 6×.
- Edit gate: "New version drops the choice" now reads the worksheet state, not the pictures (it failed by chance when a
  new copy drew the chosen picture). New strings × 11 native-reviewed (6 fixes).

## P2 (part 3) — the rest of the maker screen (2026-10-31, commits `3b2102860` → `e21e04a95`)

- Screen strings live in `frontend/messages/makers/<loc>.json` (62 keys × 11), checked on every build (`build-ui-strings.js`: parity, empty, untranslated-English with an explicit SAME_IN list).
- Title + instruction editable per page (three-line limit measured on the page; "Original text" restores).
- Pages: duplicate, move up/down (`pageOps` moves pages/edits/units/texts/ink together, padding the optional arrays first). **Page limit (operator): subscribers up to 10; free accounts one page — no Add page, no Duplicate, one line + See plans.**
- More options (closed at first): answer key, paper, border. The preview is the whole sheet of paper; a border is an outline in the margin and prints on one page (`@page{margin:0}` + margin on `.ws-page`).
- Drawing on a page: 5 colours, undo, clear; printed; dropped with new content (new version, template, level, theme, word).
- Gate 15 `gates/controls-budget.js`: ≤ 7 controls on a first screen, declared (429 cells) and shown (78 screens) — poisoned both ways.
- Every new string × 11 native-reviewed (one reviewer, 18 + 2 fixes applied).


## Sight Words maker: 9 new templates (2026-10-31, commit `dc8aa53a4`)

- Operator: "the sight words template collection is very poor" → 15 distinct templates (K-433..K-441 new; K-259..K-263 hidden via topic-map `hideIds`). Recipe and every review finding in the commit message.
- **Open, for the operator:** (1) the published one-word pages K-388..K-392 are airy by the fill measure (K-389 most); fixing them means republishing ~16.5k Level Set decks — not done; (2) a reviewer called Danish "tegn op" (trace) non-standard and proposed "skriv efter" — the published family uses "tegn op", so it was kept everywhere pending a ruling; (3) the coverage map has no teaching point for K-433..K-441 yet (they practise RF.K.3.c like the family).

## P2 (part 2) — access + tap-to-edit (2026-10-31, commits `c12fa0845`, `9eba9a60b`, `a20bf0b2d`)

- Any picture theme, colour or B&W (Color | Black & white switch; one theme per page).
- Making metered (operator ruling): free accounts 3 worksheets/month (one make = one worksheet opened), anonymous = gallery + sample page, subscribers unlimited; Print = a download; Ctrl+P prints a hint. `frontend/lib/quota.ts` kind `make`. Gate `gates/access-shell.js`.
- Tap-to-edit: `lib/slot.js` (pick-level override, catalogue byte-identical), 22 pilot templates exposed; picker of the type's own pool; refused choices undone with a sentence. Gates `gates/slots.js`, `gates/edit-shell.js`.
- Previews/thumbnails/picker cancel right-click save + drag (operator report).
- Every new string x11 native-reviewed (one reviewer per batch).

## P2 (part 1) — the maker screen + live gates (2026-10-31, commits `21b24d9c1`, `6c52f5996`, `578aca897`)

**Built**
- `scripts/makers/shell/` — the screen (Direction A): gallery with live miniatures, level · pictures · word · answer key
  · paper, scaled page previews, add/remove page, print-all frame. `serve.js` previews it like production
  (`node scripts/makers/serve.js` → http://localhost:8490/makers/app/?maker=counting&lang=de).
- `copiesDiffer` (build-bundles): per template, the levels where a new copy changes the page; elsewhere "New version"
  is hidden and "Add page" adds the next word (sight word of the day) — a button that changes nothing is a defect.
- Live gates: `lib/platform/page-shim.js` (Puppeteer-shaped page over the same-origin gate iframe) + `runtime.js`
  `gatePage`/`generate` (lints + verify; the type's qaRetries; 4 fresh seeds; refuse). Print is disabled while a page
  is refused; the gate's English reasons go to the console, never to the teacher.
- UI strings ×11 native-reviewed once (one reviewer, all locales).
- Gates: `gates/click-shell.js` (real clicks; poison: an always-shown New version fails it), `gates/live-gate.js`
  (every template × level × 2 copies × 11 locales live; poisons: unshrinkable overflow, broken picture, failing verify).

**Measured**
- Live gate: **2,310 pages, 0 failing, 0 needed a retry; p95 24 ms/page** on the PC (iPad number = spike S5).
- 390 px: no control overflows, no sideways page scroll (the theme strip had widened the page by ~3,700 px — fixed).

**Found and fixed at the source**
- `types/_shared/scene-count.js` (K-013/K-059/K-060/K-070 — none published): the blank-page lint did not recognise
  the scene (Node refused them too); K-060 level 3's legend ran past the page; the scatter sat in a 500 px band of a
  740 px card. Stamped as content, compact legend above four items, scatter fills the card, fewer pictures → bigger.


## P1 — platform layer + bundles (2026-10-31, commit `1307be86a`; its message wrongly repeats the previous commit's
subject — the content is P1, described here)

**Built**
- `scripts/worksheet-gen/lib/platform/` — `index.js` (Node: exactly the old behaviour), `browser.js` (preloaded files,
  CDN picture/font URLs, no slugify), `sha1.js` (pure JS), `path-shim.js` (posix subset).
- Call sites moved onto it: `lib/rng.js` (sha1 bytes read little-endian by hand), `image-cache/resolve.js` (manifest,
  file URLs, vocab), `page/shell.js` (CSS read on first use; Node font URL unchanged), `data/tracing/letter-strokes.js`
  (mini core run through the platform; the browser gets it pre-bundled, no `new Function`), `lib/sight-words-levelset.js`,
  `lib/unit-axis.js` (slugify through the platform).
- `scripts/makers/runtime.js` — `makePage()`: render-instance's build path (seed, unit tokens, build, shell, answer key).
- `scripts/makers/build-bundles.js` — per maker: records the data files every template × 11 locales × levels × themes ×
  copies reads (ONE list per maker, fresh module cache per maker — engine modules cache their reads); offers a theme
  only if the template builds with it; offers a locale only with native strings (no English fallback); esbuild ESM,
  one lazy chunk per template; Node-only modules refused; browser-safety lint enforced; content-hashed versions.
- Gates (`scripts/makers/gates/`, `scripts/makers/lint-browser-safe.js`), each poison-tested:
  - `parity.js` — the same page built in Chrome from the bundle and in Node: **210 cases, 0 different**.
  - `sha1-parity.js` — **105,038 seed strings, 0 different** (accents, ß, emoji, block boundaries).
  - `lint-browser-safe.js` — Node imports, non-literal require, `new Function`/`eval`, `Math.random`/`Date.now`.

**Measured**
- Node catalogue unchanged: 12 rebuilt published pages + 10 old-vs-new renders (incl. unit templates) byte-identical.
- Pilot bundles, gzip: ten-frames JS 15 KB · counting 17 KB · sight-words 27 KB; data: picture manifest 33 KB, sight-word
  bank 54 KB, CSS 3 KB. Far under the S4 line (250 KB first load) — no per-theme slicing needed yet.
- Offered: ten-frames 10 templates × 11 = 110; counting 14 × 11 = 154 (K-011 only on the 15 themes with a black-and-white
  sibling; K-070 uses its fixed theme); sight-words 11 × 11 = 121.

**Still open from P1** (needed before the batches that use them, not by the pilot)
- The ENGINES-ART §2.2 module split of the `sharp`-importing picture engines (before B3).
- Other Node-only call sites (`i18n/strings.js` is build-time only; `templates/components-b*.js` namespace loaders;
  `lib/distinct-pictures.js` md5) — each maker's build refuses them, so they are fixed batch by batch.
- Spikes S1 (print PDF), S2 (DOM→PNG), S3 (cross-browser layout), S5 (gate time on a 2019 iPad) need the shell (P2/P3)
  and real devices; S4 is answered above for the pilot.
