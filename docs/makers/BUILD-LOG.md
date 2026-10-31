# Worksheet makers — build log

The design is in this folder (ARCHITECTURE, ENGINES, ENGINES-ART, NEW-TEMPLATES, REVIEW-F3, OPEN-DECISIONS). This log
records what is BUILT, measured and committed, step by step, so any session can resume. Order: ARCHITECTURE §14.

**NEXT:** P5 release wiring (prepared, not run: website routes + Prisma tables for saving, the old-landing smart links, nginx); owed: the iPad test (S1), the student play page + deck preset (with the first maker that has a screen version). Then build ALL 60 makers locally.

> 🛑 **NO DEPLOY (operator 2026-10-31):** no worksheet maker goes live until all 60 are built, tested and finalized locally. The pilot trio is a LOCAL pilot (built + reviewed at http://localhost:8490/), not a go-live. Everything is committed; nothing maker-related is deployed. The launch is one release of all 60.

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
