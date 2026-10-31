# Worksheet makers — build log

The design is in this folder (ARCHITECTURE, ENGINES, ENGINES-ART, NEW-TEMPLATES, REVIEW-F3, OPEN-DECISIONS). This log
records what is BUILT, measured and committed, step by step, so any session can resume. Order: ARCHITECTURE §14.

**NEXT:** P2 remainder — title/instruction edits (§4.4), pages duplicate/reorder, decor, ink, strings moved to `frontend/messages/makers/<loc>.json` with a parity gate, the controls-budget gate (≤ 7). Then P3.

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
