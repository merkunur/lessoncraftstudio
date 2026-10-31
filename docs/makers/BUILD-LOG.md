# Worksheet makers — build log

The design is in this folder (ARCHITECTURE, ENGINES, ENGINES-ART, NEW-TEMPLATES, REVIEW-F3, OPEN-DECISIONS). This log
records what is BUILT, measured and committed, step by step, so any session can resume. Order: ARCHITECTURE §14.

**NEXT:** P6 thumbnails (gallery previews per language), then P5 release wiring (prepared, not run: website routes + Prisma tables for saving, the old-landing smart links, nginx); owed: the iPad test (S1), the student play page + deck preset (with the first maker that has a screen version). Then build ALL 60 makers locally.

> 🛑 **NO DEPLOY (operator 2026-10-31):** no worksheet maker goes live until all 60 are built, tested and finalized locally. The pilot trio is a LOCAL pilot (built + reviewed at http://localhost:8490/), not a go-live. Everything is committed; nothing maker-related is deployed. The launch is one release of all 60.

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
