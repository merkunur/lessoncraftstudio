# Worksheet makers — build log

The design is in this folder (ARCHITECTURE, ENGINES, ENGINES-ART, NEW-TEMPLATES, REVIEW-F3, OPEN-DECISIONS). This log
records what is BUILT, measured and committed, step by step, so any session can resume. Order: ARCHITECTURE §14.

**NEXT:** finish the settings-space triage (the remaining write-in tells + the gate exemptions with reasons, below); republish the published pages changed this round (list below — a server step); then task 3 (P5 release wiring) — 🛑 NO new agent until the operator says so (2026-11-01). Then the B1 screen retrofit and B2.

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
  recipe must also fix the existing templates — G2-319 family refuses every offered theme (curated allowlist), G3-353
  venn-sort renders blank in the browser with no key, all 20 existing templates expose no slot; decide whether the new
  graded picture sudokus replace or sit beside the published G1-158 / G3-348; cat vs cheetah look-alike pairing data.

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
