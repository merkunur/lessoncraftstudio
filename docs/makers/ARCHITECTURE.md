# The new worksheet makers — architecture (run F1)

Answers G1–G15 of `docs/makers/FABLE-BRIEF.md`. Written 2026-10-31 from the code as it is; every factual claim about the repo cites `file:line`. Run F2 (`ENGINES.md`) answers the per-maker questions inside this architecture; run F3 reviews both.

---

## 0. For the owner — one page in plain language

**What a teacher will see.** She opens, say, *Counting* from the worksheets site. The first screen is a gallery of worksheet templates grouped by what they teach ("Count a set and write the number", "I spy", "Odd or even"), each with a small picture of a finished sheet in her language. She taps one. A finished worksheet is already on the screen — a real, correct page, with pictures from one of our themes. On the left is a short panel: *Level 1 · 2 · 3*, *Pictures* (theme chips), *How many problems*, and for some makers two or three more. Every change redraws the page at once. One big button says **New version** (same settings, different numbers and pictures). She can tap the title or the instruction and retype them, tap any picture to swap it for another, and tap **+ page** to add a second page. Then **Download PDF**, **Save as image**, or **Share with students** (a link that opens the same worksheet as a tap-to-answer screen on any phone or tablet). Under a minute, no manual: the first screen already shows a good worksheet, and nothing she can do makes it a bad one.

**What she cannot do** — on purpose. She cannot drag things around, overlap them, push text off the writing lines or cut off a card at the page edge. The old 33 apps allowed all of that and it is why teachers found them hard and the results uneven. In the new makers the *program* lays the page out and the same quality checks that guard our 10,000 published worksheets run on *her* page, live, before she can download it. If a word she types does not fit, the maker says so in one sentence and offers the fix; it never prints a broken page.

**Why it scales when it goes viral.** The worksheet is made inside the teacher's own browser from small program files and word/picture files that sit on the Cloudflare network, not on our server. Our server does only four tiny things: check who she is, save her recipe (a few KB of text: which maker, which settings, which words and pictures), hand out share links, and count downloads for the free tier. A million people making worksheets costs us Cloudflare bandwidth, not server work. Saved worksheets and student links are *rebuilt* from the recipe every time, so we never store a single rendered page.

**What it costs to build.** Roughly: 25 sessions for the shared platform (the browser engine, the editor shell in 11 languages, accounts/sharing, downloads, the gate suite), then about 2 sessions per simple maker, 3 per maker with some word data, 4 per language-bound maker, plus extra for the eight makers with heavy picture engines. Order of magnitude: **≈ 230 Claude Code sessions for all 60 makers**, front-loaded on the platform and a 3-maker pilot (one per language group) that proves the whole chain — gallery → page → PDF on an iPad → student link — before the other 57 are built on it. Four short measuring spikes (PDF quality on iPad, image export, cross-browser identical layout, bundle size) come first, because those are the only things this design cannot promise from the code alone.

**Growing the collection.** Your goal is an *exhaustive* collection, and the brief now asks for at least five brand-new templates per maker on top of today's 755. The design treats a template as the cheapest thing in the system: one file with the same contract the 831 existing types use, its words in the existing language files, and everything else — the gallery entry, the thumbnail in 11 languages, the settings panel, the quality gates, the student screen — is produced from that file automatically. A new template costs roughly half a session; the six picture-heavy makers (find the differences, dot-to-dot, colour by number, how to draw, picture tracing, mazes) get their own deep design run and a measuring slot before they are built.

**Decisions only you can make** are collected in §18 at the end, each with my recommendation and what each option costs.

---

## 0.1 The goal, as the yardstick for every decision below

| the operator's word | what this architecture does about it | where |
|---|---|---|
| exhaustive | 60 makers over 755 types + ≥ 5 new templates each; a new template is one file and ~½ session | §11 |
| top quality | the published catalogue's gates run on the teacher's page, live; nothing failing can be downloaded; every lesson of the 33 old apps (A1–F5) has a named structural home | §6, §15, §15.1 |
| 11 languages | strings resolved per locale and never English on a non-English page; a template exists in a locale only where its reviewed strings and render pass; native review before publish | §12, §15 |
| easy / self-evident | the first screen already shows a finished, correct worksheet; ≤ 7 visible controls (gated); no free canvas; every refusal is one sentence with the fix | §4, §4.1a |
| comprehensive | every old-app feature mapped or consciously dropped; screens, keys, pages, decoration, own words, own photos | §4, §13 |
| pedagogically correct | a mistake fixed once reaches every saved recipe and student link | §5.3 |
| time saving | under a minute from landing to PDF (§4.5); "Make your own" opens a deck's exact settings | §4.5, §13 |

---

## 1. The shape of the system

```
teacher's browser                                   Cloudflare (CDN, immutable cache)          Hetzner (Next.js 14 + Postgres)
──────────────────────────────                      ─────────────────────────────────          ────────────────────────────────
maker shell (static HTML+JS)  ◄── /makers/app/<v>/ ─┤ static, cached forever                   /api/makers/*  recipes, links
maker bundle  counting@3      ◄── /makers/counting/3/ ┤                                        /api/quota/*   metering (exists)
word banks, strings ×11       ◄── /makers-data/<dv>/ ┤                                        /[locale]/tools/<slug>  SEO landing (exists)
pictures 512 px, fonts        ◄── /makers-assets/<av>/┤                                        /s/<linkId>  → nginx alias to the play shell
student play shell            ◄── /makers/play/<v>/  ┤
```

Everything above the line is a **static versioned file** served by nginx from `/var/www/lcs-media/makers*/` with `Cache-Control: public, max-age=31536000, immutable`. The only server-side work per teacher action is in the right-hand column, and every one of those calls is a single Postgres statement.

Reuse, not rewrite: the worksheet engine under `scripts/worksheet-gen/` keeps producing the published catalogue in Node + Puppeteer exactly as today; the same type modules are **bundled unchanged** for the browser behind a thin platform layer (§2). One code base, two hosts.

---

## 2. G1 — Browser runtime

### 2.1 What the engine already is (measured)

| fact | where |
|---|---|
| A type is a CommonJS module `{ id, slug, gradeBand, exerciseType, themeAxis, difficulty{1,2,3}, i18n, interactive?, build(), verify()? }` | `types/k/K-002-count-and-circle.js:13-32` |
| `build({theme, difficulty, locale, unit}, {rng, …})` returns `{ bodyHtml, meta, tokens? }` — strings only, no DOM | `render/render-instance.js:27`, `K-002:34-72` |
| The seed is `sha1(typeId\|theme\|difficulty\|epoch[\|vN][\|uUnit])` → mulberry32; locale-independent | `lib/rng.js:11-21, 39-46` |
| The page shell wraps the body; Letter for `en`, A4 otherwise; content box 186 × 250 mm; CSS page 703 × 945 px | `render-instance.js:20`, `page/shell.js:19-22, 81-117`, `page/page.css:16-18` |
| Lints and `verify(page)` run **inside the rendered page** via `page.evaluate` (622 call sites) | `qa/lints.js:22`, `K-002:77-78`, grep of `page.evaluate(` |
| The screen version and the answer key are rebuilt from the same seed and asserted identical in `meta` | `render-instance.js:68-73` |
| The screen's tap geometry is captured as % of the page box from `getBoundingClientRect` | `render-instance.js:289-342` |
| Node-only touch points: `fs`/`path` in 43 engine files (loaders), `crypto` in rng, `vm` for translations-shared, `sharp` in 9 lib files (raster oracles + art precompute), `file://` image URIs | grep; `rng.js:11`; `emit/interactive-runtime.js:53-71`; `image-cache/resolve.js:33-47`; `lib/hm-verify.js:23`, `lib/fd-scene.js:343` |
| Images: `cache/manifest.json` → 100 themes, 2,837 nouns; the 512 px derived set is 63 MB, the @3x set 276 MB | `image-cache/resolve.js:10-11`, `du` |
| Text sizes at build time come from **measured tables**, never from a live canvas: `primitives/font-metrics.json`, `bankword-nunito800.advances.json`, `cursive-metrics.json` | `lib/key-on-row.js:13, 33-36`, `primitives/bankword-width.js:12-24` |

The last row is the load-bearing one: because `build()` never measures text in a browser, the HTML of a page is a pure function of `(type, settings, seed, locale, data version)`. That is what makes "same recipe → same page" provable (§16) and what lets the browser produce byte-identical HTML to Puppeteer.

### 2.2 The platform layer (the only engine change that touches many files)

Create **`scripts/worksheet-gen/lib/platform/`** with two implementations of one interface, selected by the bundler:

| file | role |
|---|---|
| `platform/index.js` (Node) | `readText(absPath)`, `readJson(absPath)`, `listDir(absDir)`, `requireData(absPath)`, `imageUrl(theme,file,{full})`, `sha1(str)`, `vocab(locale)`, `sharedTranslations()` — implemented with `fs`, `crypto`, `vm`, `require` exactly as the call sites do today |
| `platform/browser.js` | the same functions over an **in-memory preload map** (`readText`/`readJson`/`listDir`/`requireData` throw `PlatformMissing(path)` when a file was not preloaded); `imageUrl` → `ASSET_BASE + '/themes-512/<theme>/<file>'`; `sha1` → bundled pure-JS SHA-1 (`platform/sha1.js`, ~40 lines, cross-checked against Node `crypto` on the 50,000 published seeds so every "Make your own" preset reproduces its deck); `vocab(locale)` → fetched slice |

Mechanical edits, one pattern each, gated by a lint (§2.5):

| today | after | count |
|---|---|---|
| `fs.readFileSync(path.join(__dirname, …), 'utf8')` | `platform.readText(path.join(__dirname, …))` (`path.join` stays — esbuild provides a browser `path` shim; `__dirname` is rewritten by the bundler to the repo-relative dir) | 43 files (`i18n/strings.js:16-17`, `lib/b3-common.js:42,84`, `lib/hm-scene.js:24`, `page/shell.js:11-16`, …) |
| `fs.readdirSync(dir)` + `require(path.join(dir,f))` (namespace merges) | `platform.listDir(dir)` + `platform.requireData(path.join(dir,f))` | `templates/components-b3.js:17-18` and b4–b7 siblings |
| `require('../../data/hmx/text/' + loc + '.js')` (dynamic) | an explicit index module `data/hmx/text/index.js` exporting `{de: require('./de.js'), …}`; the call site reads `INDEX[loc]` | `types/k/K-405-maze-puzzles.js:25, 85` and every other non-literal `require(` (the lint lists them) |
| `crypto.createHash('sha1')` | `platform.sha1` | `lib/rng.js:11-14` |
| `fileUri(theme, noun)` → `file://` | unchanged signature; the Node platform returns `file://`, the browser platform returns the CDN URL | `image-cache/resolve.js:33-47`; callers (`templates/components.js:18`) untouched |
| `vm.runInContext(translations-shared.js)` | `platform.sharedTranslations()`; the browser build ships the 11-locale `runtime*` subset as JSON (36 KB source → ~6 KB) | `emit/interactive-runtime.js:62-71` |
| `page/shell.js` reads `page.css` + `fonts.css` with `file://` rewrites | `platform.readText` for both; the browser platform serves `fonts.css` with `url()` rewritten to `ASSET_BASE/fonts/` | `shell.js:11-16` |

Everything else — primitives, templates, layouts, every `build()`, every `verify()` body — is untouched.

**Preload instead of async loaders.** Loaders such as `bank()` are synchronous and called deep inside `build()`; making them async would touch hundreds of lines. Instead the build step records what each (template, locale) reads: `scripts/makers/record-data-manifest.js` runs every template × 11 locales × 3 levels × 3 seeds under the Node platform with a *recording* `readText/readJson/requireData` and writes `data-manifest.json` per maker (`{ "K-002": { "*": [...files], "de": [...] } }`). At run time the shell `await platform.preload(manifest[template][locale])` fetches those files (small: a word bank is 50–300 KB per locale, pictures are not data) before calling `build()`. A `PlatformMissing` throw at run time is a build-time bug, caught by the gate that replays the manifest in a headless browser (§15).

### 2.3 Bundling and code splitting

- **Tool:** `esbuild` (one dev dependency — operator approval per CLAUDE.md §10.3; it is the only addition this design needs). CommonJS in, ESM out, `splitting: true`, `minify`, `sourcemap: external`, `target: ['chrome100','safari15','firefox100']` (Chromebook/iPad floor; §16).
- **Entries:** `scripts/makers/entries/<maker>.js`, generated from `scripts/makers/topic-map.js` families + `docs/makers/inventory/types.json`: `module.exports = { templates: { 'K-002': () => import('../../worksheet-gen/types/k/K-002-count-and-circle.js'), … }, manifest: require('./<maker>.templates.json') }`. A maker loads its manifest and the shared core at open, and **each template as its own lazy chunk** on first use (`import()` → esbuild splits per template), so a maker that grows from 14 to 25 templates (section N: ≥ 5 new per maker) costs the teacher nothing until she opens one. Shared code (page shell, components, primitives, the interactive runtime, lints) lands in esbuild's shared chunks, fetched once and cached across makers.
- **Aliases:** `lib/platform/index.js` → `lib/platform/browser.js`; `sharp`, `puppeteer`, `fs` → `platform/forbidden.js` (throws with the importing path — a build fails loudly if a type pulls a raster oracle into a bundle).
- **Where built:** in `deploy.sh` on Hetzner, *before* `npm run build` (`node scripts/makers/build-bundles.js`), the same way mini-tools are copied first (CLAUDE.md §20.4). Output: `/var/www/lcs-media/makers/<maker>/<version>/` (the bundle + its `templates.json` + `data-manifest.json` + per-locale string slices) and `/var/www/lcs-media/makers/_shared/<hash>/` chunks. Versions are *never* overwritten or deleted (§5.2).
- **Served by nginx**, not Next (`patch-nginx-makers.py`, same idiom as `patch-nginx-level-sets.py`): `location /makers/ { alias /var/www/lcs-media/makers/; add_header Cache-Control "public, max-age=31536000, immutable"; }` plus `/makers-data/` and `/makers-assets/`, all with `gzip_static on` / brotli where available. Next.js is never in the path of a generation.

### 2.4 Bundle size — estimate now, measure in spike S4

Source bytes reachable from a maker (first-level `uses` from the inventory + the shared core of shell/components/runtime/lints/rng/tokens = 114 KB):

| maker | types | type source | direct deps | expected min+gz (×0.22) | note |
|---|---|---|---|---|---|
| ten-frames | 10 | 7 KB | 9 KB | **~30 KB** | core dominates |
| counting | 14 | 37 KB | 9 KB | **~35 KB** | |
| addition-subtraction | 25 | 33 KB | 18 KB | **~36 KB** | |
| word-writing | 15 | 35 KB | 96 KB | **~55 KB** | tracing primitives |
| spelling | 8 | 95 KB | 114 KB | **~70 KB** | |
| sentences | 21 | 296 KB | 164 KB | **~125 KB** | |
| logic-puzzles | 20 | 181 KB | 319 KB | **~135 KB** | solvers |
| mazes | 24 | 42 KB | 631 KB | **~170 KB** | hm-* engine |

Plus per load: strings slice ≤ 20 KB, fonts 1.1 MB total but only the weights a page uses (Nunito 400/700/800 + Baloo 2 700, latin + latin-ext ≈ 420 KB, cached forever), pictures ~22 KB each from `themes-512`. **Pass line for S4:** every maker's first-load JS ≤ 250 KB gz including shared chunks; mazes/fd/htd may reach 300 KB only if their art loads lazily per picture.

### 2.5 Gate: `scripts/makers/lint-browser-safe.js`

Fails the build when any file reachable from a maker entry (esbuild metafile) (a) imports `fs`, `path` outside `lib/platform/`, `crypto`, `vm`, `sharp`, `child_process`, `puppeteer`; (b) calls `require(` with a non-literal argument; (c) references `__dirname` outside a `path.join(__dirname, …)` passed to `platform.*`. Poisoned both ways on every run (a synthetic offender must fail; the clean tree must pass).

---

## 3. G2 — Output in the browser

No browser API turns a DOM into a vector PDF except the print engine. The decision is therefore a **hybrid with the print engine as the primary vector path**, and one raster fallback built from the same renderer that the PNG export needs anyway.

| output | mechanism | fidelity | where it is the default |
|---|---|---|---|
| **PDF (vector)** | A hidden same-origin `<iframe srcdoc>` containing *all* pages of the worksheet (+ answer key pages when on), each a `.ws-page` wrapped in `<section style="break-after:page">`, with the existing `@page { size … ; margin … }` rule (`shell.js:91`), then `iframe.contentWindow.print()` after `document.fonts.ready`. Chrome/Edge/Chromebook "Save as PDF" and macOS Safari produce vector text + SVG with the woff2 fonts embedded, exact Letter/A4 — the same engine Puppeteer uses (`render-instance.js:60` calls `page.pdf` with `preferCSSPageSize`) | identical to today | Windows, Mac, Chromebook, Android |
| **PDF (raster)** | each page → PNG at 2× (below) → `pdf-lib` (already a dependency, `package.json`: `pdf-lib ^1.17.1`; pure JS, runs in the browser) embeds one JPEG q0.9 per page at exact Letter/A4 size | text not selectable; 1406 × 1890 px per page ≈ 350 KB; prints crisply at 170 dpi | iPad/iPhone Safari *when* spike S1 shows the print path cannot save a file; also the "Download PDF" fallback when `window.print` is blocked (embedded iframe contexts) |
| **PNG / JPEG** | DOM → SVG `<foreignObject>` serialisation → `Image` → `<canvas>` at 2× → `toBlob`. Preconditions: fonts inlined as data URIs into the serialised `<style>` (only the weights used, from the cached woff2), every `<img>` converted to a data URI first (pictures come from our own origin → no canvas taint; we never load a third-party image) | pixel-close to Puppeteer's `el.screenshot` (`render-instance.js:61-62`) — spike S2 measures it | every platform |
| **Interactive screen** | **No backdrop image at all.** The student page renders the same HTML page (fonts + pictures from the CDN) and the tap layer is positioned over it in % of `[data-lcs-page]`, exactly as `emit/interactive-runtime.js` positions items (`:91`, `:178`). The geometry capture that `render-instance.js:289-342` runs in Puppeteer runs in the student's browser after `document.fonts.ready` — the backdrop and the rects are measured by the same renderer, so they cannot disagree | better than today (crisp at any zoom; no 300 KB JPEG) | every platform |

Rules that follow: (1) the `__PDF_URL__` celebration link (`interactive-runtime.js:585`) becomes a "Print my worksheet" that opens the print iframe; (2) the answer key is a second *build* with `{answerKey:true}` (`render-instance.js:357-359`), appended as pages, never a separate file the teacher has to find; (3) the three export paths share one `render/compose-document.js` that returns the multi-page HTML string, so the gate suite can hash it; (4) **white background forced** in every raster path (`ctx.fillRect('#fff')` before `drawImage`, and `print-color-adjust: exact` with an opaque `.ws-page` in print) — the old apps' black-JPEG class (lessons C8); (5) **raster budget** (lessons C9): canvas at 3× = 2109 × 2835 px (≈ 250 dpi on Letter), JPEG q 0.85 in the raster PDF, PNG at 2× for "Save as image"; the vector PDF carries no raster at all; (6) **orientation** (lessons B10): `page/shell.js` `PAGE_SIZES` gains `a4-landscape` / `letter-landscape` (`.ws-page` 945 × 703) and a template declares `orientations: ['portrait'] | ['portrait','landscape']`; the paper control offers only what the template declares; (7) **grayscale output** (lessons E): an export-time `filter: grayscale(1)` on the whole page in print/PNG — the page is uniformly grey, so the never-mix-BW-and-colour rule is untouched.

**Spike S1 — print-engine PDF fidelity.** Build the print iframe for 12 pages (one per runtime family + a cursive page + a Finnish title that wraps three lines). On Chrome/Windows, Safari/macOS, Chromebook (ChromeOS Chrome), iPad Safari 16+: save the PDF; measure with `pdfinfo`/`pdffonts`: page size within 0.5 mm of 215.9 × 279.4 (en) / 210 × 297; fonts listed as embedded subsets; text extractable (`pdftotext` returns the instruction); SVG vectors (no `/Image` XObject on a vector-only page); page count = pages + key pages. **Pass:** all four platforms; if iPad fails only at the "save a file" step, the raster path is the iPad default (§18-A).

**Spike S2 — DOM→PNG.** Same 12 pages; `pixelmatch` against Puppeteer's `.png`. **Pass:** ≤ 0.5 % differing pixels at 2×, zero missing images/fonts, on the same four platforms. Known Safari risks to probe: `transform: rotate()` on `<img>` inside foreignObject (`components.js:18`), `text-length`/`lengthAdjust` SVG text (`key-on-row.js:39`), CSS grid.

---

## 4. G3 — The editor model

### 4.1 The one rule

**The teacher never moves an element; the maker lays out the page.** Every edit is one of five typed operations stored in the recipe (§5), re-applied on top of a fresh generation, and re-gated. There is no free canvas. This is the whole difference from the old apps (`docs/makers/OLD-APPS.md` §"What every old app does today") and the reason the gates can run on a teacher's page at all.

| kind | what the teacher does | how it is stored | gated? |
|---|---|---|---|
| **setting** | side panel: level, theme, count, mode, range, paper, answer key, language | `settings` + a new `seed` on "New version" | yes — a full regeneration |
| **content edit** | taps a word/number/picture *slot* on the page and retypes / swaps | `edits[]`: `{op:'word', slot:'K-002#2.chip1', value:'…'}` / `{op:'picture', slot, theme, noun}` / `{op:'title'|'instruction', value}` | yes — the type rebuilds with the overrides via a new build ctx `overrides` (§4.3); if the gate fails, the edit is refused with the gate's sentence |
| **pages** | + page (new seed), duplicate (same seed + edits), delete, reorder | `pages[]` | each page gated on its own |
| **decoration** | border, background tint, a design element from the library | `decor` — drawn in the paper margin *outside* the 186 × 250 mm content box (`shell.js:19-22`) and as a page-level background; never inside `.ws-body` | yes — lints still run; decor is excluded from the overflow lint by `data-lcs-decor` the way art panels are (`qa/lints.js:33`) |
| **own layer** | the colouring brush; a handwritten note | `ink[]`: strokes in % of the page, drawn on an SVG layer above the body | not gated; shown with a "Your drawing" chip; never changes content |

### 4.1a What the old apps' design taught (OLD-APP-LESSONS.md §F) — and the structural answer

| F | what went wrong | structural answer in this design |
|---|---|---|
| F1 | free-form canvas edits broke pages (~15 "honor operator edits" commits) | there is no geometry edit at all (§4.1); every edit is a typed recipe operation re-applied inside `build()` and re-gated; `ink` and `decor` are the only free layers and they cannot touch content |
| F2 | 33 copies of the plumbing; every cross-app change a 29× paste | one shell (`/makers/app/<v>/`), one engine (`scripts/worksheet-gen/`), one platform layer (§2.2); a template is one file with no plumbing; gate 2 runs every template of every maker on every build — the "check per app" of C4 is automatic |
| F3 | ~70 controls on one screen | **controls budget, gated**: the three common controls (Level · Pictures · How many) + ≤ 4 template controls = **≤ 7 visible**; `templates.json` may not declare more (gate 15 `controls-budget`); everything else is a *template* in the gallery (big-small's five question types are five gallery cards with one shared "mode" control, not five dropdowns), or an advanced drawer the first-time flow never opens (paper, answer key, decoration) |
| F4 | translations from many files, races, stale caches | strings are sliced into the maker version at build and shipped with it (§12); no runtime string fetch exists; a missing key fails the build |
| F5 | silent fallbacks shipped as defects | §6.2: adjust *with a sentence* or refuse; no English fallback on a non-English page (`i18n/strings.js` chain stops at the locale in the browser build); no theme fallback (A15); every fallback the engine still has (`labels()` returning null, `resolveStrings` source `'en'`) is turned into a refusal in the browser platform |

### 4.2 The old apps' two special editors

- **Writing row editor** (old `writing`): becomes a *template whose settings are the rows*: `settings.rows = [{kind:'trace'|'fade'|'guided'|'empty', text}]`. The `word-writing` / `letter-tracing` makers expose an "Rows" list control (add / delete / reorder / type); the type module builds from the list; every row goes through the tracing primitives and `key-on-row.js` seating. Same for name tracing (F2 decides the per-locale stroke models).
- **Colouring brush** (old `coloring`): the `ink` layer above. Printing includes it (PDF, PNG); the screen version shows it; gates ignore it. Brush = width + colour + eraser, pointer events, stored as simplified polylines (RDP ε 0.5 px, cap 2,000 points per page → < 30 KB).

### 4.3 Content edits without breaking determinism

`build(args, ctx)` gains **one optional field** `ctx.overrides` (`{ words: {slotId: value}, pictures: {slotId: {theme, noun}} }`). The shared components that place words and pictures (`templates/components.js`, `components-b2…b7`) read it through one helper `lib/slot.js: pick(ctx, slotId, generatedValue)`; slot ids are stable strings derived from the type id + card index + role (`K-002#3.pic`), stamped on the element as `data-lcs-slot` so the editor can map a tap to a slot. Types that never call the helper simply have no editable slots (the gallery marks them "settings only"). Overrides are applied *inside* the build so the page's own invariants (counts, answer keys, `meta`) stay true — a swapped picture in an "I spy" scene changes the picture, not the count (F2 counting-Q1 specifies the scene layout).

### 4.4 Font size, titles, instructions

Title and instruction are free text (per page, per locale), gated by the existing footer/overflow lints and by the measured chrome budget types already assume (`types/g1/G1-350-cloze.js` header: a 3-line title + 3-line instruction leave 710 px). A title that wraps past 3 lines is refused: "Shorten the title to fit on three lines." Font size is **not** a free knob; the one size control is *Large print* (level-wide +1 step through the type's `difficulty` sizes via `withLayoutFit` with a negative step, `lib/layout-fit.js:13-29`), offered only where a type declares it.

### 4.5 First-time teacher, under a minute (the flow the build follows)

| t | screen | what she sees / does |
|---|---|---|
| 0 s | `/<loc>/tools/<maker-slug>` (existing SSR landing, `frontend/app/[locale]/tools/[tool]/page.tsx`) | the maker opens in place (the landing's iframe slot, where the old app launches today, `MakerLanding.tsx:75`); **gallery**: sub-topic rows, 5–8 thumbnails each, in her language, "more" per row; a search box; level and grade chips |
| 10 s | tap a template | the page appears **already generated** (level 2, a theme that fits, seed = random). Left panel: Level · Pictures · How many · (≤ 4 template controls, §4.1a). Top: **New version** · **+ page**. Right: **Download PDF · Save image · Share**. Nothing else |
| 20 s | tweak | taps "1–5" level chip → page redraws (< 150 ms); taps a theme chip → pictures swap; taps a picture → a picker with the theme's nouns; taps the title → inline text |
| 40 s | **Download PDF** | signed-out → the sign-in sheet (free account; the recipe is kept in `sessionStorage` and restored after sign-in); signed-in free → meter check (3/month); the print dialog / file appears |
| 55 s | **Share** | one tap → student link + QR + copy; "share with a colleague" link next to it |

Auto-save: every change saves the recipe (debounced 2 s) when signed in; signed-out work lives in `sessionStorage` until sign-in. The workspace (`/[locale]/workspace`, exists) lists "My worksheets" by maker with the template thumbnail.

Design language: Direction A (cream/teal/coral, Baloo 2 + Nunito) as the activities (CLAUDE.md §20.3) — not the competitor's dark admin.

---

## 5. G4 — Recipe schema and versioning

### 5.1 The recipe (JSON, ≤ 16 KB, stored as JSONB)

```json
{
  "v": 1,
  "maker": "counting",
  "makerVersion": 3,
  "dataVersion": "2026-11-04",
  "lang": "de",
  "paper": "a4",
  "title": "Zähle und kreise ein",
  "pages": [
    {
      "template": "K-002",
      "level": 2,
      "seed": "r:9f3a1c2e",
      "settings": { "theme": "farm animals", "cards": 6 },
      "unit": null,
      "strings": { "title": null, "instruction": null },
      "edits": [
        { "op": "picture", "slot": "K-002#3.pic", "theme": "farm animals", "noun": "goat" },
        { "op": "word", "slot": "K-002#1.chip2", "value": "7" }
      ],
      "decor": { "border": "de-012", "tint": "cream" },
      "ink": [],
      "own": [ { "slot": "K-060#2.pic", "fp": "sha256:…", "w": 512, "h": 512 } ]
    }
  ],
  "answerKey": true,
  "screen": true,
  "words": [],
  "presetFrom": { "deck": "wsg-b3-…-de", "slug": "zaehle-und-kreise-ein-tiere" }
}
```

| field | meaning |
|---|---|
| `maker`, `makerVersion` | which bundle rebuilds it: `/makers/<maker>/<makerVersion>/` |
| `dataVersion` | the word-bank/strings/picture-manifest snapshot: `/makers-data/<dataVersion>/` — frozen with the bundle (§5.2) |
| `seed` | `r:<8 hex>` for teacher-made pages; `d:<published instanceSeed string>` when preset from a deck, so the page *is* the deck (`lib/rng.js:39-46` seed strings are stable and public) |
| `settings` | the type's exposed params (`params` in `inventory/types.json`) — the maker's `templates.json` maps each to a control, a label key and a legal range |
| `strings` | `null` = the locale's reviewed string; a string = the teacher's own (never translated) |
| `edits`, `decor`, `ink`, `own` | §4 |
| `words` | the teacher's own word list for word-bank makers (§7); each entry `{ w, lang, pic: {theme, noun} | null }` |
| `presetFrom` | provenance of "Make your own"; informational |

Not in the recipe: any rendered HTML, PDF, image bytes, or photo bytes.

### 5.2 Freezing a version

A **maker version** is a directory that is never modified after deploy:

```
/var/www/lcs-media/makers/counting/3/   bundle.js · templates.json · data-manifest.json · strings.<loc>.json ×11 · thumbs/<loc>/<type>.webp
/var/www/lcs-media/makers/_shared/<hash>/ chunks (content-addressed; shared across versions)
/var/www/lcs-media/makers-data/2026-11-04/   the data snapshot the bundle recorded (banks, i18n slices, vocab slices, picture manifests)
/var/www/lcs-media/makers-assets/a1/       themes-512 (63 MB), silhouettes (6.8 MB), fonts (1.1 MB), design elements
```

`scripts/makers/build-bundles.js` computes the content hash of each maker's bundle + data manifest; a changed hash mints the next integer version and writes `makers/versions.json` (`{ counting: { current: 3, history: [1,2,3] } }`). Kept forever: every version directory, every data snapshot, every asset version (a few MB each; `housekeeping.sh` must list `makers*/` as *exempt*). The server disk rule (CLAUDE.md §A.14.12) holds because these are served files.

### 5.3 Migration when a template is fixed (the pedagogical-mistake rule)

The operator's rule — a mistake is fixed everywhere at once — overrides "rebuilds identically" *for that mistake only*:

1. The fix ships as a new maker version `N+1`.
2. `makers/<maker>/migrations.json` records `{ "from": 3, "to": 4, "templates": ["K-002"], "kind": "content-fix", "note": "…" }`.
3. The recipe row is never mutated. **Resolution happens at load:** the shell reads `versions.json` + `migrations.json`; a recipe pinned to a version with a `content-fix` migration on its template loads the *fixed* version and shows a one-line banner ("This template was corrected on 2026-11-20"). Everything else (layout polish, new templates) leaves old recipes on their pinned version.
4. Student links follow the same resolution, silently.
5. A fix that changes a template's settings schema must ship a `settingsMap` in the migration (`{ "cards": v => Math.min(v, 6) }`); the gate suite replays every recorded recipe shape through it.

The recipe → version resolution is one pure function `lib/makers/resolve-version.js`, unit-tested with poison cases (a fix must re-route; a polish must not).

---

## 6. G5 — Gates in the browser

| gate | today | in the maker | when |
|---|---|---|---|
| `runLints` — blank body, overflow, footer intrusion, broken images, font floor, off-palette, free-claim | `qa/lints.js:20-125`, `page.evaluate` | **live**, unchanged body (the evaluate callback runs in the preview iframe); `freeClaim.selfTest()` at module load (`lints.js:10`) is pure JS and bundles | every generation and every edit |
| type `verify(page)` (169 types) | `page.evaluate` bodies | **live** through the Page shim (§6.1) | every generation and every edit |
| `pageFill` / `cardFill` | `lib/page-fill.js:11-57`, in-page | **live** | every generation |
| answer-key text seating | `qa/key-text-measure.js:11-16` (canvas `measureText`) | **live** when the key is built | before download / share |
| `fd-browser-diff` | already in-page canvas (`lib/fd-browser-diff.js:21-60`) | **live** for any FD page composed in the browser | F2 decides what is live vs precomputed |
| raster oracles that need `sharp` — maze `hm-verify` (`lib/hm-verify.js:23`), `pt-verify`, `cbn-lineart` | Node only | **build time** for precomputed art; a live-generated puzzle needs a canvas port of its oracle (the `fd-browser-diff` pattern) — F2 per engine; the rule: *no live generation without its live oracle* | |
| guessability / answer-position (`qa/guessability.js`) | batch | **build time** over the template's setting space (3 seeds × 3 levels × 11 locales × each setting value); a template whose setting space has a tell is not exposed with that setting | per version |
| native + pedagogy review | panels | **build time**, per template × locale (§15) | per version |

### 6.1 The Page shim

`lib/platform/page-shim.js` runs *inside the preview iframe* and exposes `{ evaluate(fnOrSrc, ...args), $(sel), $$(sel), addStyleTag }`. The host posts `{ fn: fn.toString(), args }` and receives the JSON result — the same serialisation boundary Puppeteer imposes, so every existing `verify` keeps its constraints (no closures) by construction. The 4 types whose verify uses `page.screenshot`/`page.$` for a raster oracle (`G2-377`, `K-252`, `K-253`, `K-405`) are the build-time-only group above.

### 6.2 What happens when a page fails

Order, always the same, implemented once in `lib/makers/generate.js`:

1. **Retry the engine's own knobs** — the type's `qaRetries` (`lib/layout-fit.js:16`: `{layoutFit:1}`, `{layoutFit:2}`), then up to 4 fresh seeds. Silent.
2. **Adjust the setting** toward the nearest legal value (e.g. cards 8 → 6) and say so in one sentence under the panel: "8 problems do not fit on one page in Finnish; showing 6. Add a page for more." The setting control shows the adjusted value.
3. **Refuse the teacher's input** when it is the cause (a word too long for its box, a title past 3 lines, a picture that is not in the theme): the edit is reverted and the reason shown next to the field.
4. **Never ship**: the download / share buttons are disabled while the current page has any gate failure; the failure list is visible under "Why?".

Gate time budget: ≤ 150 ms per page on a 2019 iPad (spike S5: run lints + verify on the 12-page set; pass ≤ 150 ms p95).

---

## 7. G6 — Own words and own pictures

### 7.1 Own words

| rule | mechanism |
|---|---|
| Only one of the 11 languages, declared per word list | the list carries `lang`; the maker's content language is the list's language; the alphabet check uses the locale's letter set (the type-word `ctx.keys` precedent, `interactive-runtime.js:530-536`) |
| Grammar: a sentence frame that cannot take the word is **refused**, never bent | `REFERENCE TRANSLATIONS/lcs-grammar.js` unchanged (80 KB, bundled once in the shared chunk); its refusal becomes the field's error |
| No syllable / phonics / rhyme claim about an unverified word | word-bank makers are typed: `bankPolicy: 'reviewed-only' \| 'own-allowed'` in `templates.json`; syllables, phonics, rhyming, alphabet-sound are `reviewed-only` (F2 confirms per maker; the approved-words pipeline stays the only source) |
| Never a wrong picture for a typed word | a typed word gets a picture **only by exact match** against the locale's vocabulary (singular or plural form, case-folded, from the per-locale vocab slice of `image-vocabulary.js`); no fuzzy match; otherwise the word prints without a picture and the template that needs pictures refuses it ("No picture for *Fahrrad* — choose a word from the list or a template without pictures") |
| Duplicates, length, count | per template limits in `templates.json` (`maxWords`, `maxGlyphs`); the engine's measured widths decide fit (`bankword-width.js`) |

### 7.2 Own photos

Decision (per the brief's recommendation): **photos stay in the browser.**

- On upload: downscale to 512 px square-fit WebP/JPEG ≤ 80 KB, compute `sha256` → `fp`; store `{fp, blob}` in IndexedDB `lcs-makers/photos`; the recipe carries only `{slot, fp, w, h}`.
- Reopen on the same device: the slot is filled from IndexedDB. Another device, or a cleared browser: the slot shows a dashed "Add the photo again" placeholder and the gates treat it as a picture of the declared size (layout is unchanged).
- **Safari warning (fact, not design):** iOS/macOS Safari deletes script-writable storage after 7 days without interaction with the site. The maker must tell the teacher ("Your photos stay on this iPad for 7 days unless you open the site") and offer the print/PDF at once.
- **Student links** for a worksheet with own photos: the link cannot rebuild the photo on the student's device. Two honest behaviours; the operator chooses (§18-B): (B1) the share button is disabled with the reason, offering PDF instead; (B2, later) a subscriber-only photo store on Hetzner Object Storage keyed by `fp`, ≤ 50 MB per subscriber, uploaded only when a student link is created. Recommended: ship B1, design the recipe so B2 is additive (`own[].url` optional).

---

## 8. G7 — Sharing

### 8.1 Storage

Two tables, modelled on `StudioStory` / `StudioShareLink` (`frontend/prisma/schema.prisma:1455-1498`), additive migration:

```prisma
model MakerRecipe {
  id           String    @id @default(cuid())
  teacherId    String    @map("teacher_id")
  makerKey     String    @db.VarChar(40)
  makerVersion Int
  locale       String    @db.VarChar(5)
  title        String    @db.VarChar(200)
  recipe       Json                                // §5.1, ≤ 16 KB enforced in the API
  rev          Int       @default(1)               // optimistic concurrency, StudioStory precedent
  thumbTemplate String?  @db.VarChar(12)           // gallery thumbnail to show in the workspace
  deletedAt    DateTime? @map("deleted_at")
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  teacher User @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  links   MakerShareLink[]
  @@index([teacherId, updatedAt])
  @@map("maker_recipes")
}
model MakerShareLink {
  id        String    @id @default(cuid())
  linkId    String    @unique @db.VarChar(12)      // generateHostedLinkId alphabet, core.ts:62-68
  recipeId  String
  kind      String    @db.VarChar(10)              // "student" | "colleague"
  revokedAt DateTime?
  createdAt DateTime  @default(now())
  recipe MakerRecipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  @@index([recipeId])
  @@map("maker_share_links")
}
```

No view counters in Postgres (a write per view is the one thing that would not scale); counts come from nginx logs if ever wanted.

### 8.2 URLs and caching

| URL | serves | cache |
|---|---|---|
| `/s/<linkId>` (student) | nginx `alias` → `/var/www/lcs-media/makers/play/<v>/index.html` (static shell, noindex meta + `X-Robots-Tag: noindex`) | immutable shell; the link id is read from `location.pathname` |
| `GET /api/makers/links/<linkId>` | `{ recipe, makerVersion, locale, kind }` for a non-revoked link | `Cache-Control: public, max-age=300, s-maxage=300` → Cloudflare edge; a revoke or an edit propagates within 5 min (the hosted-worksheet precedent, `play/w/[linkId]/route.ts:13`) |
| `/<loc>/tools/<slug>?m=<linkId>` (colleague) | the maker landing opens the recipe read-only; "Save a copy" clones it into the colleague's account | the landing is ISR 3600 (`tools/[tool]/page.tsx:50`); the recipe fetch as above |
| `POST /api/makers/recipes` · `PUT …/<id>` · `GET …?mine` · `DELETE` | the teacher's own recipes (Bearer or refresh cookie, `quota.ts:101-134` precedent) | `no-store` |
| `POST /api/makers/links` | mint a link for a recipe the caller owns | `no-store` |

Student play = static shell + edge-cached JSON + CDN bundle/data/pictures. The only origin work per play is the **play meter** (§9), and it is the existing endpoint.

The student page is the screen version (§3) rendered from the recipe in the student's browser; with `screen:false` in the recipe (a page with no interactive kind) the link shows the printable page with a "Print" button.

---

## 9. G8 — Access and metering

Facts in `frontend/lib/quota.ts`: downloads 3 per UTC month and plays 10 per UTC day (`:27-28`); subscribers and crawler UAs unlimited (`:169`, `:202`); **anonymous download attempts are refused with `signup_required`** (`:170-172`, `:203-205`) — a free *account* is required for the 3 monthly downloads (the brief's "anonymous / free: 3 downloads" is not what the code does; §18-D). Plays are metered for anonymous and free alike. Endpoint: `POST /api/quota/check-and-increment {kind}` → 200 / 401 / 402 (`frontend/app/api/quota/check-and-increment/route.ts:11-19`).

| action | metered? | how |
|---|---|---|
| open a maker, generate, edit, preview, add pages | **never** — nothing leaves the browser | — |
| save a recipe, list, share link | not metered; requires sign-in (the workspace rule, CLAUDE.md §7) | own API |
| Download PDF (vector or raster), Save image, "Print my worksheet" from a student page | `download` | the shell calls check-and-increment *before* building the file; 401 → sign-in sheet; 402 → the existing pricing path; 200 → build and save. The file is built client-side only after a 200 |
| open a student link | `play` | the play shell calls check-and-increment `{kind:'play'}` once per load; 402 → the kid-safe "paused" page (the hosted-worksheet precedent) |
| teacher preview of her own screen version | not a play | no call |

Anti-scraping: the maker's value is the maker, which is public by design; nothing rendered exists to scrape. Recipes are readable only by owner or by link id (12-char capability, 32^12). The gallery thumbnails are public images. No watermarks, no resolution limits, no challenges on content pages (memory: real users never pay for scrapers); nginx rate limits on `/api/makers/*` only (the `patch-nginx-bot-limits.py` idiom), and the `/s/` shell is static so a crawl of links costs nothing.

---

## 10. G9 — Scale

### 10.1 Cost per action under a viral spike

| action | Cloudflare (bytes, cached) | origin (Next + Postgres) |
|---|---|---|
| first open of a maker | shell ~40 KB + bundle 30–170 KB + shared chunks ~60 KB + fonts ~420 KB + strings ~15 KB + thumbnails ~12 KB × ~40 | **0** (all nginx static, edge-cached) |
| each generation / edit | 0–20 pictures × 22 KB (cached per theme) | **0** |
| sign-in | — | existing auth |
| save recipe | — | 1 `UPDATE` (≤ 16 KB JSONB), debounced 2 s |
| download | — | 1 upsert on `usage_quotas` (`quota.ts:225-229`) |
| mint link | — | 1 `INSERT` |
| student open | play shell ~30 KB + bundle/data/pictures as above | 1 edge-cached JSON (origin once per 5 min per link) + 1 play upsert |

A spike of 100,000 teachers making 10 worksheets each in a day = ~1 M generations → 0 origin requests; ~300 k downloads (if 30 % download) → 300 k single-row upserts spread over the day ≈ 3.5/s; saves ≈ 1 M debounced updates ≈ 12/s peak-hour. Postgres is idle at that; the constraint is Next.js request CPU (the 2026-10-28 hub freeze, memory `project_hub_facet_crawl_cap_2026_10`): keep every maker API handler to one statement, `force-dynamic`, no session-wide reads, and cap at nginx (`limit_req` 10 r/s per IP on `/api/makers/`).

### 10.2 Postgres at 10 k and 100 k teachers

| | 10 k teachers | 100 k teachers |
|---|---|---|
| `maker_recipes` rows (avg 20 each, 3 KB JSONB) | 200 k rows ≈ 0.7 GB | 2 M rows ≈ 7 GB (TOAST-compressed ≈ 3 GB) |
| `maker_share_links` | ~100 k | ~1 M |
| `usage_quotas` rows/day (free + anon) | ~20 k | ~200 k (the existing `periodStart` index; prune > 90 days — add to `housekeeping.sh`) |
| workspace list query | 1 index scan `(teacher_id, updated_at)` | same |

Add a per-teacher cap (500 recipes; the hosted store uses 300, `core.ts:27`) and a soft-delete sweep after 30 days.

### 10.3 What to measure (and where)

Cloudflare cache-hit ratio on `/makers*` (target ≥ 98 %); origin req/s on `/api/makers/*` and `/api/quota/*`; p95 generation time in the browser (a `performance.measure` posted *only* with the save call, never its own request); gate-failure rate per template × locale (posted with the save as `qaFails`); PDF path chosen per platform; IndexedDB photo loss reports. All in one `MakerTelemetry` JSON column on the recipe row — no new endpoint.

---

## 11. G10 — Templates

### 11.1 From a type to a template

`scripts/makers/build-templates.js` writes `templates.json` per maker from `topic-map.js` + `inventory/types.json` + the type module itself:

```json
{ "id": "K-002", "family": "counting-pictures", "grade": "K", "skill": "Count a set … to 10–20",
  "strand": "Counting & Cardinality", "levels": [1,2,3], "themed": true, "minNouns": 6,
  "controls": [ { "param": "cards", "control": "steps", "values": [4,6], "label": "mk.ctl.cards" } ],
  "screen": "tap-choice", "bankPolicy": "none", "editableSlots": ["pic","chip"],
  "locales": ["en","de","…"], "refused": { "fi": "title wraps > 3 lines at level 3" },
  "thumb": "thumbs/{loc}/K-002.webp" }
```

- `controls` come from the type's `difficulty` keys and `params` (`K-002:20-24`); a param becomes a control only when the build-time setting-space gate (§6) passes for every value; otherwise the level alone drives it.
- `locales`/`refused` come from the recorded render: a template exists in a locale only where its strings exist (`i18n/strings.<loc>.json`, resolved by `i18n/strings.js:25-39` — the maker never falls back to English on a non-English page) and the 11-locale render passed.
- A type with `interactive` (`render-instance.js:68`) gets `screen` = its kind; otherwise the student link shows the printable.

### 11.2 Adding a new template — built for volume (section N: ≥ 5 new per maker ≈ 300+ new types)

One new file `types/<grade>/<ID>-<slug>.js` with the existing contract + its strings in `i18n/strings.<loc>.json` ×11 + (if interactive) `i18n/interactive-instructions.json` (`cli.js:30-37`) + its family in `topic-map.js`. The maker's next build picks it up; the gate suite (§15) is the acceptance. No shell change, no maker-specific code, no new route, no new thumbnail work, no new gate.

What makes it cheap at 300+:

| lever | mechanism |
|---|---|
| one contract, no registration | the entry generator (§2.3) and `build-templates.js` (§11.1) read `topic-map.js` + the type file; nothing else is hand-maintained (the `MANIFEST_FILES` lesson of CLAUDE.md §21.5 is designed out) |
| factories, not pages | most new tasks are a parameterisation of an existing factory under `types/_shared/` (31 today: `compare-groups.js`, `picture-equation.js`, `sort-to-bins.js`, `lit-word-build.js`, …) or a `templates/components-b*` builder; a new template is often 60–150 lines (K-002 is 94 lines including `verify`) |
| strings pipeline exists | `i18n/build-en.js` → `apply-locale.js` → `lint-locale.js` and `check-template-string-parity` (generalised from `tools/check-b*-string-parity.js`) |
| screen kinds are a menu | 11 kinds (`emit/interactive-runtime.js:60`); a template declares `interactive: { kind, item, answerAttr, … }` and the geometry capture, runtime and gate are shared |
| gates are generic | lints, pageFill, settings-space, 11-locale render, thumbnails and the html-parity hash cover a new file with zero configuration; only a *new primitive* needs its own verify |
| scaffold | `node scripts/makers/new-template.js --maker=counting --grade=K --slug=count-then-draw-one-more --skill="…" --screen=type-number` writes the file skeleton, the `strings.en.json` entry, the inventory row and the topic-map line (the `scripts/new-activity.js` precedent, memory `project_activity_coverage_plan`) |
| spec → file | F2's `NEW-TEMPLATES.md` spec fields (sketch, child's action, settings, teaching point, reused engine, screen kind, locales, key rule, risks) map 1:1 onto the module fields `i18n`, `difficulty`, `interactive`, `themeAxis`, `verify`, and the `templates.json` `controls`/`refused` — the spec *is* the build ticket |

Cost: ≈ 0.4–0.6 session per new template on an existing factory (design → native panel pass on its 2 strings ×11 → gates), 1–1.5 when it needs a new primitive. A maker's ≥ 5 new templates ≈ 3 sessions, already inside the per-maker figures of §14.3.

Gallery scale: a maker with 30 templates shows ≤ 8 per sub-topic row with "more"; the per-template lazy chunk (§2.3) keeps first load flat; thumbnails are generated per template on hash change only (§11.3).

### 11.3 Gallery thumbnails

Generated at build time by the existing Node renderer (`render-instance.js` → `.png` → `sharp` → 320 px WebP, q 70, ≈ 12 KB), **per locale** at level 2 with a fixed seed and a fixed per-template theme: 755 × 11 ≈ 8,300 files ≈ 100 MB in `makers/<maker>/<v>/thumbs/<loc>/`. Per locale because the sheet's title is on the picture and a Finnish teacher must see Finnish. Regenerated only for templates whose bundle hash changed.

### 11.4 Grouping

By `skill` (the inventory's sub-topic sentence, `types.json` rows) inside a maker, in the order of `docs/makers/topics/<id>.md`; `strand` and `grade` are filter chips. New templates declare `skill` in the module.

---

## 12. G11 — i18n

| strings | where | who authors | gate |
|---|---|---|---|
| Maker shell UI (≈ 160 keys: controls, buttons, gate sentences, sign-in sheet, share sheet, photo warning) | `frontend/messages/makers/<locale>.json` ×11, sliced into the shell bundle at build | drafted in en-US, then **one native reviewer per locale before publish** (CLAUDE.md #2 rule; §21.3 native ensemble for a new content TYPE) — the English source is handed over as a *source to audit* | key parity ×11 (`lint-i18n-parity`), no English on a non-English page (DOM scan in the 11-locale render gate), no "free" claim |
| Per-template title / instruction / printTitle | existing `scripts/worksheet-gen/i18n/strings.<loc>.json` (136–140 KB each), sliced per maker → `strings.<loc>.json` (≤ 20 KB) | already native-authored per batch; new templates follow the batch process | the existing `i18n/lint-locale.js` + the parity check of `tools/check-b*-string-parity.js` generalised to `check-template-string-parity.js` |
| Screen instructions, level instructions | `i18n/interactive-instructions.json`, `level-instructions.json`, sliced | as today | a locale without the string = the template is refused in that locale for the screen (`cli.js:34-36` behaviour kept) |
| Runtime words (Check, Try again…) | `translations-shared.js` `runtime*` keys → JSON slice | exist ×11 | `runtimeStrings` throws on a missing key (`interactive-runtime.js:74-85`) — kept |
| Maker names, slugs, landing copy | `frontend/messages/maker-content/<locale>.json` (exists for the 33 apps; extended to 60 makers) | native panels, §21.3 | existing landing gates |

Content language vs interface language: separate, as the old apps (`OLD-APPS.md` §"Content language"); the recipe's `lang` is the content language; the shell follows the page locale.

---

## 13. G12 — Replacing the old apps

1. **Build the maker** that owns the app (`OLD-APPS.md` table) with every "special feature to keep" either mapped to a template/control or listed as dropped in `docs/makers/topics/<id>.md` (operator sign-off per drop; the known drops are in §18-F).
2. **Proof = the gate suite green (§15) + a 14-day shadow period**: the landing page shows the new maker; the old app stays reachable one click away ("Use the old generator"); telemetry (§10.3) shows gate-failure rate < 1 % of generations and no locale with zero saves.
3. **Repoint** — zero URL churn, by design: the landing URL `/<loc>/tools/<slug>` stays (CLAUDE.md §21.5a freeze); only `makerGeneratorUrl` (`frontend/lib/seo/maker-content.ts:83-85`) returns the new shell URL for that maker key, so `MakerLanding.tsx:75` launches the maker. `deck-actions.js` builds "Make your own" from the same `maker-content` slug (`:146-158`), so **no deck.html is rewritten**. The preset: the landing passes `?preset=<deckId>` and the shell resolves the deck's `generation.json` → recipe (`seed: d:<instanceSeed>`, settings, theme, locale) through `GET /api/makers/preset/<deckId>` (edge-cached 1 h).
4. **Retire from teacher view**: the "old generator" link is removed; the app stays under `/worksheet-generators/` for the operator's deck regeneration (memory: app decks are regenerated by the operator only), unchanged and never deleted.
5. **Hosted worksheets** (`/play/w/`) keep working untouched; the 200 MB cap stands (`core.ts:31`).

Order = the build order (§14); an app is retired only with its maker: `find-and-count`/`find-objects` with Counting (pilot), then per batch.

---

## 14. G13 — Build order, batching, effort

### 14.1 Platform first (≈ 25 sessions)

| step | deliverable | sessions |
|---|---|---|
| P0 spikes S1–S5 (§3, §6.2, §16) | measured pass/fail per platform; the iPad PDF decision | 3 |
| P1 platform layer + bundler + browser-safe lint + data-manifest recorder; the three pilot bundles build | §2 | 4 |
| P2 maker shell: gallery, panel, page preview iframe, Page shim, generate/retry/refuse loop, edits (§4), pages, decor, ink, i18n ×11 with native review | §4, §12 | 7 |
| P3 outputs: print iframe, DOM→PNG, raster PDF, screen/play shell | §3 | 3 |
| P4 account: Prisma migration, recipe/link APIs, workspace list, metering wiring, landing embed + preset | §5, §8, §9 | 4 |
| P5 gate suite + deploy wiring (`deploy.sh` build step, nginx patch, housekeeping exemption) | §15 | 3 |
| P6 thumbnails pipeline, `templates.json` builder, migrations resolver | §11, §5.3 | 1 |

### 14.2 Pilot — one maker per language group (≈ 12 sessions)

| maker | group | why this one |
|---|---|---|
| **ten-frames** (none, 10 templates) | none | smallest surface; proves gallery → page → PDF → screen on all four platforms |
| **counting** (little, 14 templates, retires `find-and-count` + `find-objects`) | little | first app retirement; picture swapping and the I-spy scene (F2 counting-Q1) |
| **spelling** (bound, 8 templates, retires `word-scramble` + `word-guess`) | bound | own words, exact-vocab picture matching, grammar refusal, a tap-spell screen |

### 14.3 Batches (after the pilot proves the chain)

| batch | makers | sessions |
|---|---|---|
| B1 numbers (none/little, 9) | number-sequences, number-lines, number-bonds, addition-subtraction (retires 3 apps), doubles-halves, compare-numbers, odd-even, place-value, multiplication-division | 22 |
| B2 measure & shapes (8) | money, telling-time, measurement, graphs-data, shapes-geometry, patterns, number-tracing, symmetry-grids | 20 |
| **S6 spike slot — picture engines** (after B2, before B3; F2-art has delivered by then) | art delivery + browser oracles measured on iPad/Chromebook (§17.4) | 3 |
| B3 picture engines (8; the six section-H makers + two neighbours) | logic-puzzles, same-different (5 apps), dot-to-dot, color-by-number, coloring-pages, mazes, find-the-differences, how-to-draw; picture-tracing moves here from B4 | 36 |
| B4 writing (5) | pre-writing, letter-tracing, word-writing, cursive, tangram | 15 |
| B5 literacy A (8) | alphabet, phonics, rhyming, syllables, sight-words, nouns-articles, picture-cards, position-words | 30 |
| B6 literacy B (8) | grammar, word-meaning, sentences, reading, stories-writing, word-problems, number-of-the-day, ordinal-numbers | 30 |
| B7 social + puzzles (7) | calendar, maps-grids, me-family-feelings, health-safety, word-search, crossword, secret-code, bingo | 26 |

Effort rule per maker: **none 2 · little 3 · bound 4** (each including its ≥ 5 new templates, §11.2), +2 for a section-H picture engine (after F2-art's design and the S6 spike), +1 per retired app (feature mapping + shadow period). Total ≈ 25 + 12 + 3 + 182 ≈ **220–240 sessions**. Each maker = one plan-mode session for its contract (templates, controls, drops, F2 engine notes) + build + gates + native review of any new strings; one maker at a time, never parallel fan-outs (CLAUDE.md #1 rule).

---

## 15. G14 — The gate suite every maker passes

All scripts under `scripts/makers/gates/`, run by `node scripts/makers/gate.js --maker=<id>`; wired into `deploy.sh` as HARD for every maker with a `current` version. Every gate is poison-tested in both directions on every run (CLAUDE.md §A.13 discipline).

| # | gate | what it proves | pass line |
|---|---|---|---|
| 1 | `browser-safe` (§2.5) | the bundle has no Node reach | 0 findings |
| 2 | `render-11` | headless Chromium loads the *built* bundle, runs every template × 11 locales × 3 levels × 3 seeds through `generate()`; lints + verify + pageFill; English-on-non-English DOM scan; data-manifest completeness (`PlatformMissing` = fail) | 0 fails; every (template, locale) either passes or is in `refused` with a reason |
| 3 | `html-parity` | for 50 published decks per maker, the browser build's HTML string (`compose-document` output) **equals** the Node renderer's HTML for the same `instanceSeed` (`lib/rng.js:39-46`) | byte-identical after normalising the asset base URL |
| 4 | `recipe-roundtrip` | save → reload → regenerate → identical HTML hash; through `resolve-version` with and without a content-fix migration | identical / re-routed as declared |
| 5 | `visual-qa` | screenshots of the shell at 360 · 768 · 1024 · 1366 and the page preview at 703 px; the page thumbnail vs the Node `.png` (`pixelmatch` ≤ 0.5 %); then the §A.13.62 personal read of 360/768/1024 | measured + read |
| 6 | `pdf-parity` | print-engine PDF of 12 pages per maker vs Puppeteer's: page size, page count, embedded fonts, text extract equal, no raster XObjects | all equal |
| 7 | `screen-geometry` | the student shell's live capture vs `render-instance.js` capture for the same seed: every item rect within 0.5 % | all items |
| 8 | `settings-space` | guessability + answer-position over every exposed control value (§6) | no tell; failing values removed from `controls` |
| 9 | `own-input` | the refusal paths: a 40-glyph word, a title of 4 lines, a word with no picture, a frame lcs-grammar refuses, a BW theme mixed with colour | every case refused with its sentence |
| 10 | `native-pedagogy` | ONE reviewer per locale over the compact text dump of every template's title/instruction/controls/gate sentences in that locale + the shell strings; findings fixed at source and re-run | 0 open findings |
| 11 | `i18n-parity` | shell keys ×11, template string slices ×11, interactive instructions where `screen` | 0 missing |
| 12 | `scale-smoke` | `autocannon` 200 r/s for 60 s on `/makers/<id>/<v>/bundle.js` (nginx) + 20 r/s on `/api/makers/links/<id>` through Cloudflare + 5 r/s on `check-and-increment` | p95 < 50 ms origin for the API; 0 errors; cache-hit ≥ 98 % on static |
| 13 | `registration` | landing slug ×11 in `maker-content`, `makerGeneratorUrl` repointed, `versions.json` current, thumbnails present ×11, housekeeping exemption | 0 missing (the `preflight-tool-registration.js` shape) |
| 14 | `collision` (new rule in `qa/lints.js`) | no two content elements of a card overlap (`[data-lcs-art]`, `img`, `.ws-answerbox`, text, badges — pairwise rects, art panels excluded as in `lints.js:33`); labels sit below their picture with a gap ≥ 4 px | 0 overlaps (lessons B1, B6; CLAUDE.md §23.6 "none asked whether two rendered things collide") |
| 15 | `controls-budget` + `no-repeat` + `write-screen` (static over `templates.json` + the built page) | ≤ 4 template controls; count params `min ≥ 1`; `meta.items` distinct under the template's `sameAs`; a page with `.ws-answerbox`/writing rows declares a `type-*` screen, never a choice kind; a key's `[data-lcs-slot]` rects equal the worksheet's | 0 findings (lessons F3, A16, A1, D6, B5) |

### 15.1 The old apps' lessons → where each is satisfied structurally

`docs/makers/OLD-APP-LESSONS.md` (≈ 280 fix commits, ≈ 1,090 comments). Legend: **C** = by construction (cannot be otherwise), **S** = schema/contract, **G** = gate (number above). A rule marked "F2" keeps its engine-specific answer in `ENGINES.md`, inside the hook named here.

| rule | structural home |
|---|---|
| A1 no repeated exercise; say so when the range is short | **G15** `no-repeat` over `meta.items` (every type returns `meta`, `render-instance.js:72`); **S** the template's `sameAs(item)` (default: deep equality; addition declares `(a,b)` so 2+3 ≠ 3+2); the short-range case is §6.2 step 2 (adjust + sentence) |
| A2 no picture repeats across exercises | **C** `lib/distinct-pictures.js` / `lib/picture-distinct.js` draw without replacement; **G2** blank/short pools throw before render |
| A3 unguessable answer positions | **G8** `settings-space` runs `qa/guessability.js` over every control value × 3 seeds; a value with a tell is removed from `controls` |
| A4 one correct answer, or every equally correct one accepted | **S** `answer` may be a set (`data-lcs-alts`, the `type-word` ALT precedent `interactive-runtime.js:368-369`); **G2** verifies assert exactly-one-or-declared-set |
| A5 instruction matches the task, per mode and level, every language | **S** strings keyed per template (`i18n/strings.<loc>.json`) + `level-instructions.json` + instance tokens (`render-instance.js:31-32` refuses an unfilled token); **G10** native reads every instruction against its render |
| A6 sentences from a refusing grammar engine | **C** `lcs-grammar.js` unchanged in the shared chunk; its refusal → §6.2 step 3 |
| A7 word order per language from frames | **S** frames per locale in the banks (`data/word-problems/frames.js`, `data/b*/locales/*`); the maker never concatenates English order (F2 word-problems-Q1 for names) |
| A8 lists join with `Intl.ListFormat` | **C** the engine's convention (CLAUDE.md §17.8.13); **G1** bans a literal `' and '`/`' und '` join in a type |
| A9 letters are Unicode | **G1** `lint-browser-safe` also flags `\b`, `\w`, `[A-Za-z]`, `/^[A-Z]/` in type code (allowlisted per line); **C** `ctx.keys` letter pads and `toLocaleLowerCase(locale)` folds (`interactive-runtime.js:535`) |
| A10 each language's own alphabet / vowels | **S** per-locale letter tables (`data/b2/collation.js`, `ctx.keys`); the word-search/crossword/secret-code makers read them (F2) |
| A11 multi-word picture names | **C** vocab keys are hyphenated (`resolve.js` manifest `vocabKey`); grid templates declare `wordFilter` (strip spaces vs exclude); **G9** `own-input` feeds "ice cream" |
| A12 bilingual mixes exact; same-language wording; K-3 language names | **S** bilingual templates declare two language controls (`gridLang`, `clueLang`) and three instruction keys (`same`, `mixed`); K-3 language-name table ×11 in the shell strings, native-reviewed (**G10**) |
| A13 a literacy task never shows the answer; hints are an explicit mode | **S** hint = a template or a control value, never a default; **G8** guessability on the printed page; **G2** the screen's `aria-pressed` is false at load (no pre-highlight) |
| A14 named bins are strictly scored | **S** `tap-select`/sort kinds grade exactly (`interactive-runtime.js` JS_SELECT); F2 sorting-Q1 |
| A15 the chosen theme is the theme on the page | **C** the picture picker is bound to `settings.theme`'s manifest slice; an off-theme pick is impossible; the title's `{THEME}` resolves from the same manifest (`unit-axis` token precedent) |
| A16 counts never include 0 | **G15** `min ≥ 1` on every count param in `templates.json`; **G2** no `0` in `meta.items` of counting templates |
| A17 odd-one-out density | F2 same-different-Q1; **G2** `cardFill` + **G14** collision bound it from both sides |
| A18 names from the reviewed vocabulary, never a file name | **C** labels come only from the per-locale vocab slice (`resolve.js labels()`); own photos carry no label (`own[]` has none), and a template that prints a label refuses an own photo in that slot (§7.2) |
| B1 text never overlaps a picture | **G14** collision |
| B2 no wasted band | **G2** `pageFill` (`page-fill.js:28-29`: ≥ 55 % covered, band ≤ 20 %) + the fill-the-body rule |
| B3 constant readable picture clues | **S** template reserves the clue band first (F2 word-search/crossword); **G14/G2** |
| B4 answer boxes 2.5× the printed answer | **S** `components.js answerBox` sizes from `bankword-width.js` measured widths × 2.5; **G15** checks the key's text width vs its box |
| B5 worksheet and key share geometry | **C** same seed rebuild + `sameAs(meta)` (`render-instance.js:70-73`); **G15** slot-rect parity |
| B6 common baseline, badges never overlap | **G14** collision; primitives (F2 measurement) |
| B7 key marks placed exactly | **C** `key-on-row.js` seating by measured x-height; **G2** `judgeKey` on every key |
| B8 crop in the drawn image's space | **C** one image space: `platform.imageUrl` returns `{url, px}` of the variant actually served (`themes-512` unless the call site asks `full`, `resolve.js:38-46`) |
| B9 art with built-in slots needs measured offsets | **S** per-art offset tables next to the art (`data/art-extents.json` precedent); shared by page and key by construction (same build) |
| B10 landscape and portrait; paper follows the choice in every output | §3 rule 6; **C** one `compose-document` feeds PDF/PNG/screen |
| B11 theme heading above the instruction, never stacked | **C** the shell has one `<h1>` (`shell.js:97`); regeneration is a pure function (C1) |
| B12 name/date in the content language | **C** `shell.js:25-37` `CHROME[locale]`, locale = content language |
| C1 regenerating never leaks the previous page | **C** page = f(recipe); the preview iframe is replaced, never mutated; edits keyed by stable `data-lcs-slot` ids (§4.3) |
| C2 language change changes everything | **C** `lang` is a recipe field; a change rebuilds strings, content, key and screen; **G2** English-on-non-English DOM scan |
| C3 one source of truth per setting | **S** `settings` object + `controls` list; **G15** control ids unique; the shell has no second selector anywhere |
| C4 mechanical change checked per app | **C** one engine; **G2** builds every template of every maker × 11 × 3 × 3 on every deploy |
| C5 deterministic from the seed | §16; **G3** html-parity vs Node, **G4** round-trip |
| C6 failed image loads never shift data | **C** slots by id, never array index; **G2** broken-image lint (`lints.js:92-94`) → §6.2 retry |
| C7 teacher uploads have no name and no variant | **S** `own[]` = `{slot, fp, w, h}`; consumers read `px` from the slot; label-printing templates refuse own photos |
| C8 white background in exports | §3 rule 4 |
| C9 print-size budget | §3 rule 5; **G6** pdf-parity records file size |
| D1 feedback deferred until Check | **C** runtime phases `fill` → `reviewed` (`interactive-runtime.js` every kind) |
| D2 tap targets in % of the page | **C** `interactive-runtime.js:91,178` (% positioning); the ≥ 44 px gate applies to *controls*, never to page items |
| D3 revisiting a cell is legal where the clue allows | F2 mazes/maps; the trace-path runtime compares against the declared path (`interactive-runtime.js:318`) |
| D4 every promised interaction exists on the screen | **G10** native reads the screen instruction against the declared `kind`; **G15** `write-screen` |
| D5 the screen respects every display filter | **C** the screen is `build({interactive:true})` of the same type with the same settings (`render-instance.js:82-83`) |
| D6 a writing page gets a writing screen | **G15** `write-screen` |
| E custom word lists · manual picture choice · language mix · modes · counts · bin labels · name/date · exercise numbers · decoration · grayscale | **S** `words[]` (§7.1) · `edits[op:'picture']` (§4.3) · `gridLang/clueLang` (A12) · gallery cards + ≤ 4 controls (F3) · controls · `edits[op:'word']` on `data-lcs-slot` bin labels · shell chrome · `.ws-card-badge` · `decor` (§4.1) · export filter (§3 rule 7) |
| F1–F5 | §4.1a |

---

## 16. G15 — Determinism across browsers

Two different things must be identical, and they have two different guarantees.

**1. The HTML of the page — identical by construction.** `build()` is a pure function of `(type, settings, seed, locale, dataVersion)`: the seed is a string hash (§2.2 bundles SHA-1 and asserts equality with Node), the only text metrics it uses are measured tables (`font-metrics.json`, `bankword-nunito800.advances.json`, `cursive-metrics.json` — §2.1), and no `Date`/`Math.random` reaches a build (gate 1 bans them next to `fs`). Gate 3 proves it against Node; gate 4 proves it across saves. This is the "byte-identical page" the brief asks for, and it holds on every OS because no OS is involved.

**2. The rendering of that HTML — equal within tolerance, measured.** What can differ: font shaping (Blink/HarfBuzz vs WebKit/CoreText), subpixel text widths, line-break decisions. Mitigations already in the engine or added here:

| risk | mitigation |
|---|---|
| different system fonts | never used: self-hosted woff2 subsets with `unicode-range` and `font-display: block` (`assets/fonts/fonts.css`); every measurement waits for `document.fonts.ready` (`render-instance.js:50`) |
| a word wraps on one browser and not another | layouts already carry slack (the cloze build estimates 10 px/glyph against a measured 9.3–10.2, `G1-350-cloze.js` header); the shell sets `hyphens: manual; overflow-wrap: normal` on `.ws-page`; the overflow/footer lints run *in the teacher's browser*, so a wrap that breaks a page is caught there, retried (§6.2) and never printed |
| text on writing lines | seated as SVG `<text>` by measured x-height (`key-on-row.js:30-44`) — SVG text does not wrap and scales with the row |
| cursive (Playwrite) joins | guides come from `cursive-metrics.json` per-em ratios, not pixels; F2 cursive-Q1 specifies the per-OS tolerance; gate 5 includes a cursive page on every platform |
| `textLength` fitting | SVG attribute, honoured identically (`key-on-row.js:39`) |
| zoom / DPR | all geometry is % of `[data-lcs-page]`; the page is a fixed 703 × 945 CSS px box (`page.css:16-18`) |

**Spike S3 — cross-browser layout.** The 12-page set rendered in Chrome/Windows, Safari/macOS, Safari/iPad, Chrome/ChromeOS, Firefox/Windows; for every element with `data-lcs-*`, compare `getBoundingClientRect()` across browsers. **Pass:** every rect within 1.0 px; every lint and verify result identical. A failing class gets a design rule (more slack) before any maker ships, never a per-browser branch.

---

## 17. The picture-engine makers — the slot F2-art fills (brief section H)

find-the-differences, dot-to-dot, color-by-number, how-to-draw, picture-tracing, mazes. F2-art designs each in depth (what a teacher may choose, precomputed vs live, growth, own photos, spike, new templates). This section fixes only what the platform guarantees them, so F2-art designs *inside* it.

### 17.1 Facts the design rests on

| engine | data today | the render-page verification today |
|---|---|---|
| find-the-differences | `data/fd/` 427 MB, 667 files, one JSON per scene (`apple.json` 203 KB, `apple-rich.json` 396 KB: SVG path strings of regions + ink) | `lib/fd-browser-diff.js:21-60` — **already an in-page canvas diff** (rasterises both panel SVGs to canvas, dilates, counts components vs hotspots) |
| how-to-draw | `data/htd/` 53 MB (201 files, ~290 KB each) + `htdx/` 127 MB; steps derived from ink by `lib/htd-steps.js` (uses `cbn-lineart.js`, which uses `sharp`) | the family verify + visual read |
| color-by-number | `data/cbn/` 47 MB: regions + keys per picture (`designs*.js`) | fully-painted check (> 95 % small-cell area, CLAUDE.md §29 trap 8) on the rendered SVG; `tap-paint` screen reads `path[data-lcs-region]` (`render-instance.js:128-147`) |
| dot-to-dot | `data/d2d/` 30 MB, precomputed figures | per-type verify |
| picture-tracing | `data/pt/` + `ptx/` ~1 MB (scenes) + the tracer `lib/pt-trace.js` (chamfer, Zhang-Suen thinning, RDP — heavy CPU, run offline) | `lib/pt-verify.js` (`sharp`) |
| mazes | `data/hm/` + `hmx/` ~1.8 MB; generated live by `lib/hm-maze.js` + `hm-scene.js` | `lib/hm-verify.js` raster oracle: `sharp` rasterises the declared corridors (`:23-35`); the morphology, clustering and flood fill are **pure JS** (`:35-73`; `sharp` returns only at `:74` to decode the screenshot) |

### 17.2 How hundreds of MB of art are split, versioned and delivered

- **One file per picture, fetched on demand, never the catalogue.** `/var/www/lcs-media/makers-art/<artVersion>/<family>/<pictureId>.json` (+ `.rich` variants as separate files). The browser downloads only the picture the teacher picked: an FD scene ≈ 200–400 KB raw → ~60–100 KB after nginx `gzip_static`/brotli (path strings compress well); an htd drawing ≈ 290 KB → ~70 KB; a cbn design a few KB. Pass line for the format: ≤ 120 KB transferred per picture, measured in S6; a picture over the line is re-encoded (quantised coordinates, shared ink) in the offline pipeline, never at load.
- **One small index per family per version**: `makers-art/<artVersion>/<family>/index.json` — `{ id, theme, names ×11, bytes, flags (rich, bw, level) }` ≈ 40–60 KB for 667 scenes; the gallery and the picture picker read only the index; thumbnails come from the same thumbnail pipeline as templates (§11.3), 120 px per picture.
- **Versioned like data**: `artVersion` joins `dataVersion` in the recipe (§5.1); the offline pipeline (today's `fd-build.js`, `htd-steps.js`, `pt-trace.js`, `cbn-lineart.js` — unchanged, still Node + sharp) writes a *new* version directory when pictures are added or re-reviewed; old versions stay (a few hundred MB each; served disk, exempt from housekeeping). Growth = add files + regenerate the index + human picture review on contact sheets (`tools/contact-sheet.js`, memory "a word review cannot see a picture"); a picture enters the index only with `reviewed: true`.
- **Cache**: immutable headers; Cloudflare's free-tier cache takes files up to 512 MB, so every picture is edge-cached after its first request; total art on disk ~700 MB is the one new storage class, planned in `housekeeping.sh` as exempt and in the disk budget (CLAUDE.md §A.14.12).

### 17.3 How the render-page verifications run in or for the browser

Three classes, decided per check, not per maker:

| class | rule | examples |
|---|---|---|
| **A. already browser-native** | run live, unchanged, through the Page shim (§6.1) | `fd-browser-diff` (canvas); cbn fully-painted check when expressed over the rendered SVG's `path[data-lcs-region]` areas (DOM `getTotalLength`/`getBBox` + the same > 95 % rule) |
| **B. sharp-only because of rasterisation** | the *only* thing `sharp` does in these oracles is SVG → pixels; replace it by one platform function `platform.rasterSvg(svgString, w, h) → Uint8ClampedArray` (Node: sharp; browser: `Blob` → `Image` → `canvas.getImageData`, the exact code `fd-browser-diff.js:26-41` already uses). The oracle logic (`hm-verify.js` morph/clusters/flood) is pure JS and bundles as is; `pt-verify` is checked for the same split in S6. Live maze generation then carries its live oracle — the rule of §6: **no live generation without its live oracle** | `hm-verify`, `pt-verify`, `cbn-lineart` checks |
| **C. offline only** | heavy derivation (tracing skeletons, htd step derivation, FD scene densification) runs in the offline pipeline and ships *verified* data; the browser re-verifies only what the teacher's choice changes (which differences are placed, which colours are keyed, which steps are shown) | `pt-trace.js`, `htd-steps.js`, `fd-scene.buildLayers` (`fd-scene.js:343-345`) |

Own photos for these six: the platform offers only what class C can do offline *or* class A/B can prove live on an iPad within budget; F2-art rules per maker (expected: refused for FD/d2d/cbn/pt, "as is" for colouring, a measured maybe for silhouettes).

### 17.4 Spike S6 (the slot in §14.3)

On a 2019 iPad and a mid-range Chromebook: (1) fetch + parse one FD rich scene, one htd drawing, one cbn design from the CDN — pass ≤ 120 KB transferred and ≤ 300 ms parse each; (2) compose + run the live checks — fd diff on one scene ≤ 1.0 s, maze generate + `hm-verify` via canvas ≤ 1.5 s at the largest size offered, cbn fully-painted ≤ 300 ms; (3) `tap-paint` and `trace-path` screens from the live render (no screenshot) — geometry within 0.5 % of `render-instance.js`'s capture; (4) `platform.rasterSvg` browser vs sharp on the same SVG — mask agreement ≥ 99.5 % of pixels. Any miss → that step stays offline/precomputed in F2-art's design; nothing is forced live.

---

## 18. For the operator

Each with my recommendation and the cost of each option. Nothing here blocks the spikes or the platform work; A and B block the pilot's download and share buttons respectively.

**A. The PDF on iPad.** Spike S1 decides whether iPad Safari's print sheet can save our vector PDF to Files. If it cannot: (A1, recommended) iPad gets the raster PDF (crisp print, text not selectable) and desktop keeps vector — cost: nothing extra, one sentence of help text; (A2) iPad users print only, no file — cost: iPad teachers cannot email a worksheet; (A3) a server Puppeteer PDF for iPad only — cost: server CPU on exactly the path we promised to keep off the server; rejected unless A1 fails the spike.

**B. Student links for worksheets with the teacher's own photos.** (B1, recommended now) refuse the share button with the reason and offer PDF — cost: a small feature gap, zero storage; (B2, later) subscriber photo storage on Hetzner Object Storage, ≤ 50 MB per subscriber, uploaded only when a link is minted — cost: ~3 sessions + object-storage fees + a deletion policy; the recipe already has the slot for it.

**C. "Fix everywhere" vs "rebuild identically".** (C1, recommended) a *content* fix re-routes old recipes and student links to the fixed version with a one-line banner; layout polish and new templates do not — cost: a migration record per fix; (C2) every new version re-routes everything — cost: a teacher's saved page can silently change its look; (C3) never re-route — contradicts the standing rule.

**D. Anonymous downloads.** The code requires a free account for any download (`quota.ts:170-172`); the brief says anonymous teachers get 3 a month. (D1, recommended) keep the code: making is free and unlimited for everyone, the first download asks for a free account — the acquisition funnel the metering was built for; (D2) allow 3 anonymous downloads keyed on the `lcs_anon_id` cookie — cost: a 4-line change to `checkAndIncrementQuota` and weaker sign-up conversion.

**E. Gallery thumbnails per language.** (E1, recommended) ~8,300 WebP ≈ 100 MB, every teacher sees her language — cost: 100 MB of served disk + ~20 min of render per full rebuild; (E2) English thumbnails with a localised caption — cost: Finnish teachers see English sheets in the gallery.

**F. Old-app features to drop on purpose** (each needs your yes): the free text box with 7 fonts and outline colours; custom page sizes beyond Letter/A4 (portrait and landscape are kept, §3 rule 6); element lock/align/bring-forward/send-back. Everything else in `OLD-APPS.md` and in `OLD-APP-LESSONS.md` §E maps to a template, a control, a recipe field or an export option (grayscale stays as a whole-page export filter). Cost of keeping any of the three: a free-canvas layer the gates cannot judge — the thing this design exists to remove.

**G. The pilot trio.** ten-frames · counting · spelling (§14.2). Alternative: swap spelling for sentences (more templates, heavier) — cost: +2 sessions before the chain is proven.

**H. One new build dependency.** `esbuild` as a dev dependency (CLAUDE.md §10.3 requires your approval). No runtime dependency is added; `pdf-lib` is already in `package.json`.
