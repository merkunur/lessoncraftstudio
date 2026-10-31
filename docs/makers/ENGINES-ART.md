# The picture-engine makers — engines (run F2-art)

Answers brief §H points 1–6 and the `[<id>-Q1]` questions for **find-the-differences, dot-to-dot, color-by-number, how-to-draw, picture-tracing, mazes**, plus **coloring-pages** (photo → line art) and the **library-art grid copy of symmetry-grids**. Written 2026-10-31 inside `ARCHITECTURE.md` (run F1: the platform layer §2.2, the art store §17.2, the three verification classes §17.3, spike S6 §17.4) and beside `ENGINES.md` (run F2a). Every code claim cites `file:line` read today; every number is marked **measured** (this PC, Node 22 / headless Chrome, 2026-10-31) or **estimated** (the method is in §1). New templates are NOT designed here (run F2b); each card lists the obvious gaps only.

---

## 0. For the owner — one page

These eight makers are the hard ones because their pages are not made of words and numbers but of **pictures that were measured**: a scene whose five differences were each proven visible by a pixel test, a drawing whose dots were placed so that joining them gives the outline back, a maze whose one way was proven on the printed pixels. Today all of that proving runs on your PC with a Node image library (`sharp`). The browser has no `sharp`; it has a canvas.

The design keeps one rule for all eight: **what needs the picture's pixels is computed once, offline, by you, and shipped as reviewed data; what the teacher's choice changes is computed live in her browser and re-proved there with the same test ported to the canvas.** Measured on this PC, every live step is fast (a find-the-differences page composes in 6 ms and its pixel diff runs in 100 ms in Chrome; a colour-by-number page numbers itself in 130 ms); on a 2019 iPad I estimate ×3, on a cheap Chromebook ×4 — all well inside one second, which spike S6 will confirm on the real devices before anything is built.

Two findings change what the architecture assumed:

1. **Mazes cannot be generated live.** The hand-made maze generator is a search with retries: on this PC one page takes 0.4 s when the first try passes and up to **30 s** when it does not (measured over 5 seeds per face). So the maker ships **pinned mazes** — for every scene and level, a pool of seeds that were measured to build fast — and the browser rebuilds one of them deterministically (the maze Level Set already works this way, `mzl-pin.js`). A teacher still gets "New version" (the next pinned seed) and the live pixel oracle still proves the page.
2. **Picture tracing traces live today** (each page re-derives its guides from the drawing's pixels, 0.1–0.3 s per drawing in Node) and no trace file exists on disk. The maker needs a new precomputed store: one small trace per black-and-white library drawing (≈ 3–17 KB each, ≈ 13 MB for the whole library), built once offline and reviewed.

**The teacher's own photo** is refused in five of the eight (find the differences, dot-to-dot, colour by number, how to draw, grid copy): each needs parts or lines a photo does not have, and there is no honest way to prove the result. It is allowed **whole and unmodified** as the hero or goal of a maze and as a framed picture on a colouring page; two "partly" options (a scanned black-line drawing for tracing; a cut-out with a transparent background for dot-to-dot) are listed for you to decide (§8).

**The picture set grows** the way the published batches grew: a scene or drawing is added to a data file, built offline, **opened on a contact sheet by a person**, refused or accepted in a review file, and only then enters the index the maker reads. No picture reaches a teacher unseen.

---

## 1. What was measured, and how the device budgets are estimated

### 1.1 Measurements (this PC, 2026-10-31; probe script in the session scratchpad, read-only)

| engine · step | where it runs | measured |
|---|---|---|
| find-the-differences `K-395.build` (compose 5 differences + render two SVG panels) | Node | first call 18 ms (loads the scene JSON), then **5–7 ms**; `G2-388` ten-pairs **9–12 ms** |
| `fd-browser-diff` on a K-395 page (panel 384 px, rasterised at 600 units, dilate 5) | headless Chrome | **87 / 100 / 695 ms** (min / median / max of 5) |
| dot-to-dot `K-285.build` (hand figure) · `sceneDotFigure` (20 dots) | Node | **1 ms** · **2 ms**; loading all 200 scene files 89 ms |
| colour-by-number `K-393.build` (art from `data/cbn/lineart`, precomputed labels) | Node | 14 ms first, then **2 ms** |
| `cbn-render.labelArt` (the in-page labeller, 1200 × 1120 canvas) | headless Chrome | **127 / 132 / 193 ms** |
| how-to-draw `K-396.build` (lesson from `data/htd`) | Node | 15 ms first, then **≤ 1 ms**; offline `htd-steps.buildSteps(cat)` **1.3–1.6 s** |
| picture-tracing `traceDrawing` (sharp decode + pure-JS trace at 800 px) | Node | sun **133–342 ms**, giraffe **231–271 ms**; `K-418.build` (traces ≈ 8 drawings live) **1,572 ms** cold, 99 ms warm |
| hand-made maze `build` (generator + composer), 5 seeds each, min / median / max | Node | K-405 base 415 / 1,032 / 1,980 · K-406 first-maze 82 / 211 / 352 · K-411 numbers 176 / 2,775 / **18,055** · G1-420 big 1,638 / 11,327 / **29,538** · G1-422 streets 122 / 161 / 184 · K-408 forest 232 / 531 / 836 · G1-423 strands 14 / 21 / 29 · G1-426 hex 4 / 7 / 24 · G2-393 ops 645 / 1,555 / **17,407** ms |
| maze oracle, canvas port of the pure-JS half of `hm-verify` (rasterise declared corridors + erode/dilate k = 2 + clusters + flood, 640 × 560, scale 1) | headless Chrome | **59 / 63 / 185 ms** |
| data (gzip, whole stores) | disk | fd 665 files **445 MB raw**, `apple-rich.json` 396 KB → **108 KB gz / 66 KB brotli**; htd 200 lessons **15.8 MB gz** (cat 293 → 84 KB); htdx 203 lessons **37.7 MB gz**; cbn lineart 200 files **13.2 MB gz** (farm-sheep 363 → 94 KB); d2d 200 scenes **4.3 MB gz** (apple 202 → **10 KB**), a d2d index 41 KB → 4 KB; a trace JSON 8 → 3 KB (sun), 50 → 17 KB (giraffe) |

### 1.2 Device budgets (estimated until S6)

Method: the PC figure × a single-thread factor. 2019 iPad (7th generation, A10 Fusion) ≈ **×3** for canvas + typed-array JavaScript; a mid-range Chromebook (Celeron N4000/N4020 class) ≈ **×4**. S6 runs the same probe on both devices (§7) and replaces the factors with measurements; nothing below is accepted as a budget before that. Every estimate in the maker sections is written `PC x ms → iPad ≈ 3x · Chromebook ≈ 4x`.

Every live step runs in a **Web Worker** (`makers/worker.js`) except the canvas rasterisation, which needs `OffscreenCanvas` (Safari 16.4+, Chrome 69+ — inside the floor `target` of ARCHITECTURE §2.3) or falls back to the preview iframe's canvas via the Page shim (§6.1).

---

## 2. Decisions shared by the eight makers (inside ARCHITECTURE §17)

### 2.1 The verification split, refined per check (not per maker)

ARCHITECTURE §17.3 names three classes. Reading the engines settles which check is which:

| check | today | class | what the browser build does |
|---|---|---|---|
| FD difference visibility | `lib/fd-browser-diff.js:19-89` — already an in-page canvas diff (rasterise both panels `:26-41`, threshold 60 `:46`, dilate `:47-51`, components `:53-67`, hotspot rules `:69-85`) | **A** | runs unchanged through the Page shim; `K-395.verify` already calls it with `scale`, `dilate: 5` (`types/k/K-395-find-the-differences.js:450-453`) |
| CBN numbering (label placement) and solid-object test | `lib/cbn-render.js:75-137 labelArt` and `:189-228 checkSolid` are `page.evaluate` canvas code (id-colour render, chamfer, pieces) | **A** | run live when a design is numbered for the first time in a session; `labelsAndGate` (`:147-178`) is pure JS |
| maze oracle (page pixels vs the declared graph) | `lib/hm-verify.js:72-181`; `sharp` only decodes the screenshot `:74` and rasterises the declared corridors `:27-34`; morph / clusters / flood `:35-70` are pure | **B** | `platform.rasterSvg` (canvas) for `rasterDeclared` and the scene itself (what the child sees) instead of a screenshot; measured 63 ms on this PC |
| picture-tracing laws a/b | `lib/pt-verify.js:16-20 raster` (sharp) + `:22-36 coverage` + `:40-50 strokeCoverage` (pure) | **B**, offline for the store; **live only for an own scan** (§6.4) | the store ships traces that passed; the browser re-asserts only the per-page band metrics (`K-418.verify`, `types/k/K-418-picture-tracing.js:83-90`) |
| dot-to-dot legibility | `K-285.verify` `types/k/K-285-dot-to-dot.js:183-285` — pure DOM + `canvas measureText` (`:251-258`) | **A** | unchanged |
| grid maze uniqueness | `lib/maze.js:19-60` spanning tree (unique by construction), `expectedWallCount :63-66`, `K-242.verify :58-75` | **A** | unchanged, live generation |
| FD scene layers and candidate differences | `lib/fd-scene.js:220-285` (`sharp` compose via `cbn-lineart.compose :294-339`), `tools/fd-build.js` raster gate `:3-12` | **C** | offline; shipped per scene |
| HTD steps, shapes, vector lessons | `lib/htd-steps.js:89-94` (compose + segment + silhouette), union gate `:306-309`; `lib/htd-vector.js:1-25` laws | **C** | offline; shipped per lesson |
| CBN parts of a drawing (`segmentInk`) | `lib/cbn-lineart.js:188-242` is pure JS, but its input ink mask comes from `compose` (`sharp`, `:294-339`) | **C** for library art | offline; shipped per design |
| d2d outline, dots per count | `tools/d2d-build.js:125-145 greedy`, hero enlargement via `compose` `:168-181` | **C** | offline; shipped per scene |
| picture-tracing traces | `lib/pt-trace.js:270-277` (sharp decode + resize, then pure JS `:24-253`) | **C** (new store) | offline for the 1,302 traceable drawings; shipped per drawing |

Rule kept from §6: **no live generation without its live oracle.** Everything in class C is generated offline *and* gated offline; the browser re-proves only what the teacher's choice changes.

### 2.2 The modules must be split before the browser-safe lint can pass

ARCHITECTURE §2.5 fails the build when any file reachable from a maker imports `sharp`. Today the pure functions the browser needs sit in the same files as the `sharp` callers (measured by `grep require`): `lib/cbn-lineart.js` (segmenter pure `:188-242`, `compose` sharp `:295`), `lib/fd-scene.js` (`applyOps :376-394` + `renderPanel :407-452` pure, `buildLayers :263` sharp), `lib/htd-steps.js` (`stepSvg :346-361` + `fullSvg :364-376` pure, `buildSteps :89` via compose), `lib/pt-trace.js` (`traceDrawing :270` sharp, the rest pure), `lib/pt-render.js` (`modelImage :298-311` reads a WebP with `fs` and inlines base64), `lib/hm-scene.js` (`fs` for `ink-boxes.json :24`, `file://` hrefs `:37-40`), `lib/hm-verify.js` (`sharp :23`). The split, one file each, no logic change:

| new file (pure, bundled) | keeps (Node only) |
|---|---|
| `lib/cbn-lineart-core.js`: `inkMask dilate components rdp contours runPath maskPath segment segmentInk toArt strokeWidth silhouette` | `lib/cbn-lineart.js`: `compose mergeSmallParts` (re-exports the core) |
| `lib/fd-render.js`: `applyOps layerSvg renderPanel transformOf newBbox PALETTE W H U` | `lib/fd-scene.js`: `buildLayers layerFor backgroundFor detailVariant cbnSampler referenceFor paintSmallCells` |
| `lib/htd-render.js`: `stepSvg fullSvg panelBox W H` | `lib/htd-steps.js`: `buildSteps fitShape` |
| `lib/pt-geom.js`: `pathD plen rdp rdpRing chaikin labelInk` (+ a `traceFromMask(ink, W, H, sw)` entry so §6.4's live scan reuses the exact pipeline) | `lib/pt-trace.js`: `traceDrawing` (decode) |
| `lib/pt-render.js`: `modelImage` takes a URL from `platform.imageUrl` (the browser `<image href>` points at the CDN; Node keeps base64) | — |
| `lib/hm-scene.js`: `ink-boxes.json` through `platform.readJson`, hrefs through `platform.imageUrl` | — |
| `lib/hm-verify-core.js`: `morph clusters flood disc analyzeMasks(M, D, graph…)` — `analyzeScene` becomes a 20-line Node wrapper that decodes the PNG and rasterises with sharp; the browser wrapper does both with `platform.rasterSvg` | `lib/hm-verify.js` |

Gate: the §2.5 lint is poisoned with `lib/cbn-lineart.js` reachable from a maker entry (must fail) and `lib/cbn-lineart-core.js` (must pass).

### 2.3 The art store (ARCHITECTURE §17.2, sized)

`/var/www/lcs-media/makers-art/<artVersion>/<family>/…`, immutable, brotli + gzip static, one file per picture, one index per family. Sizes measured in §1.1:

| family | files | per file (gz) | whole store (gz) | index |
|---|---|---|---|---|
| `fd/<scene>.json` + `<scene>-rich.json` | 665 | 30–110 KB; the largest raw file is 1.68 MB → ~450 KB gz — **over the 120 KB line**: the offline writer rounds path coordinates to 0.1 unit (0.06 printed px; today 2 decimals) and writes `cands` into `<scene>.cands.json` — S6 re-measures the tail | ≈ 50 MB | `{ id, base, rich, theme, kind, names ×11, nItems, kinds{remove,add,…: n}, maxN{line,colour}, bytes }` ≈ 60 KB |
| `htd/<slug>.json` (+ `<slug>.keep.json` for the omission faces) | 200 + 203 htdx | 80 KB; htdx 186 KB because of `keep` → split off | 16 + 38 MB | `{ slug, src, names ×11, nSteps, kind(library/vector), guideOk, fragments, tier, bytes }` |
| `cbn/<design>.json` + `labels.json` slice per design | 200 | 66 KB (max 94) | 13 MB | `{ id, kind, level, names ×11, colours, parts, minLabelR, bytes }` |
| `d2d/<scene>.json` | 200 | **10 KB** | 4.3 MB | `{ id, hero, names ×11, fit:{10,20,21,26,27,29 → ok, complexity}, refusedAt }` 4 KB |
| `pt/<theme>/<noun>.json` (NEW: the trace) | 1,302 | 3–17 KB | ≈ 13 MB (est.) | the existing `data/pt/index.json` (band P1/P2/P3/X, paths, density, shortShare, aspect) + `symmetry.json` + the direction mix |
| `hm/scenes.json` + `hmx/*` + `ink-boxes` slices + `pins.json` | 20 + 206 scenes | scenes 1.8 MB total raw; pins = integers | < 1 MB | per scene: `{ id, face, level, hero, goal, cast, pins:[seedVariant…] (per locale for label faces) }` |

Pictures themselves are the existing `themes-512` WebP set (63 MB, `image-cache/derive.js:33-36`: 512 px box, q 88) at `/makers-assets/<av>/themes-512/<theme>/<file>`; the maze pages embed ~15 of them, nothing else in these families embeds raster.

### 2.4 Growth: one loop for all eight

1. Add the source record (a scene in `data/cbn/lineart-scenes.js` or `data/fdx/scenes-b*.js`, a drawing in `data/htd/review.js` OVERRIDES / `data/htdx/units.js`, a maze skin in `data/hmx/scenes-b*.js`, a tracing skin in `data/ptx/scenes-<face>.js`).
2. Build offline with the existing tool (`tools/fd-build.js`, `tools/htd-build.js`, `tools/cbn-lineart-build.js` + `tools/cbn-preview.js` (numbers + gates → `labels.json`), `tools/d2d-build.js`, `tools/pt-trace-all.js`, `tools/hm-reliability.js` + `tools/level-set/mzl-pin.js`).
3. **Open every output on a contact sheet** (`tools/fd-sheets.js`, `htd-sheets.js`, `cbn-lineart-sheets.js`, `d2d-preview.js`, `pt-sheet.js`, `mzl-sheet.js`; memory: a word review cannot see a picture) and record refusals in the family's review file (`data/fd/review.js`, `data/d2d/review.js`, `data/htd/review.js`, `data/htdx/review.js`, `data/fdx/catalog.js refused/noword`, `data/hm/sound-review.js`, `data/pt/index.json band X`).
4. `node scripts/makers/build-art-index.js --family=<f>` writes the index **only from records whose review entry is `reviewed: true`** and whose gate passed; a record without a review line is not indexed (a lint, poisoned both ways).
5. A new `artVersion` directory; recipes pin it (ARCHITECTURE §5.1); nothing is ever overwritten.

Names ×11 come from `REFERENCE TRANSLATIONS/image-vocabulary.js` through the per-locale vocab slice (`image-cache/resolve.js:49-59 labels`), never from a file name (lesson A18); scene names from `data/cbn/names-i18n.js`, `data/fdx/names-i18n.js`, `data/ptx/names-i18n.js`, `data/htdx/names.js` — all native-reviewed in their batches. **en = en-US, es = es-MX, pt = pt-BR** throughout (the es "perico"/"catarina" refusals in `data/hm/sound-review.js` are the precedent: a picture a Mexican child names differently is refused in es, never renamed).

### 2.5 Own pictures: the law for the eight

A teacher's own picture carries no reviewed name, no parts, no ink skeleton and no alpha (ARCHITECTURE §7.2; lessons C7, A18). It may appear **only where it is used whole and unmodified and where the page's correctness does not depend on its content**. Per maker: §3–§8, point 4. The recipe field is `own[] = { slot, fp, w, h }`; a template that needs more refuses the slot with a sentence naming the template that accepts photos.

---

## 3. Find the Differences (`find-the-differences`)

### 3.1 What a teacher can choose, and how every result is proven

| control | values | proof that the page is still correct |
|---|---|---|
| **Scene** (picker over the index: 100 reviewed CBN scenes + 100 "second" scenes + their `-rich` copies + 277 Level Set originals = 665 records, `data/fd` count) | any record whose index says `maxN[mode] ≥ N` | every candidate in a scene file already passed the offline raster gate (`tools/fd-build.js:3-12`: one connected visible component of ≥ 16 × 16 units and ≥ 260 units², inset ≥ 8 from the frame); the browser composes only from those |
| **Differences N** | 3 · 5 · 7 · 10 (10 = two pairs, `G2-388`) | `pickOps` (`lib/fd-compose.js`, a 146-line module — **F3: the line numbers below replace the earlier out-of-range ones**): one op per drawing, rings ≥ 24 printed px apart (`cfg.minSepPx`, `:11`, `:37`), no kind more than a third of the page (`:80`), spread over ≥ 3 quadrants for N ≥ 4 (`:12`, `:130`), `TRIES = 60` restarts (`:22`, `:57`) then **refusal** (`:143`) → the maker says "this scene holds at most *k* differences — choose 3 or another scene" and offers the index's `maxN` |
| **Colour / black-and-white** | colour only on scenes with a reviewed key (`inherited: true` in the record) | a colour candidate is required when the face asks for one (`cfg.needColour`, `:72`), every crayon change survives a B&W copier (`minLumaDelta`, `:48-49`); a coloured picture is fully painted by `paintSmallCells` at build (`lib/fd-scene.js:58`; METHOD-fd §9 last trap) |
| **Kinds of change** | subsets of remove · add · swap · mirror · move · scale · detail · colour (`kinds` per face, `K-395:39-41`) | the pool filter (`:44-54`); two drawings of one WORD never both come in (`:94`); the word faces drop `detail` and same-key swaps (METHOD-fd §10) |
| **Level** | K floor (big changes: `minArea 1800`, `K-395:39`) → G2 | the face configs are the Level |
| **Face** (gallery cards) | the 11 shipped modes + F2b's | `d.mode` dispatch in `K-395` |

**Live proof after composition** (every generation, Page shim): `fd-browser-diff` at the builder's scale (1 px per unit, dilation 5 — `K-395:450-453`), merged nested patches, count = the title's N, no change on the frame (`:471-472`), every hotspot ≥ 100 page px and pairwise disjoint (METHOD-fd §7). The oracle re-composes from the seed + plan in the hotspot meta (`data-lcs-fd-seed`, `data-lcs-fd-plan`; METHOD-fd §5) — the screen's answer map never comes from the page's own stamps alone.

### 3.2 Precomputed vs live

| | what | size / time |
|---|---|---|
| **ships** | `fd/<scene>.json`: `bg`, `items[{idx, src, regions[{d, colour}], ink, bbox, asym}]`, `cands[{kind, item, bbox, diff, area, mode}]` (measured shape, `apple-rich.json`: 8 items, 32 regions on the first, 36 candidates) | 30–110 KB gz per scene after the 0.1-unit rounding; fetched on pick; cached immutable |
| **live** | `composeAll` → `pickOps` → `renderPanel` ×2 (+ key, + screen hotspots) | **PC 6 ms** → iPad ≈ 20 ms · Chromebook ≈ 25 ms |
| **live oracle** | `browserDiff` | **PC 100 ms median** (695 ms once, the first canvas of the session) → iPad ≈ 300 ms · Chromebook ≈ 400 ms; budget **≤ 1.0 s** (S6 line) |
| **screen** | `tap-select` over `[data-lcs-fd-hotspot]` rects; geometry captured live (ARCHITECTURE §3) | — |
| **not live** | layers, candidates, densification, colour inheritance (`buildLayers :263-285`, `cbnSampler :339-352`) | offline |

### 3.3 Growth
§2.4 with `tools/fd-build.js` (`--set=fdx` for original scenes laid out by `lib/fdx-layout.js`), `fd-sheets.js` in BOTH modes, `data/fd/review.js` (`REFUSED`, `REFUSED_OPS`, `REFUSED_WORDS`, `EXCLUDE_SCENES`) and `data/fdx/catalog.js` (1,325 drawings read; 125 refused, 26 `noword`). The pins and the 400-seed census (`qa/fd-unit-sweep.js`) stay offline; the maker's index carries each scene's measured `maxN` per mode so the picker never offers a count the scene cannot compose. Rule from METHOD-fd §9: **regenerate every locale after any pin or engine change** → in the maker: a new `artVersion`.

### 3.4 Own photo — **refused**
A difference is one op on one *layer* (`applyOps :376-394`) with regions and ink; a photo has neither. "Differences between two of the teacher's own photos" (topics file) cannot be gated: the diff can count components but cannot know whether a change is visible *as a thing* to a six-year-old or whether the teacher's two photos differ in ten places she did not intend. Not offered; the refusal names coloring-pages (a photo framed as-is).

### 3.5 Spike (S6 part)
Fetch + parse `apple-rich.json` and the largest file after rounding (pass ≤ 120 KB transferred, ≤ 300 ms parse on iPad); `browserDiff` on K-395 base and G2-388 (four panels) — pass ≤ 1.0 s p95 on iPad / Chromebook; `rasterSvg` mask agreement vs sharp ≥ 99.5 % on one panel (the count and the components must be identical on the probe scenes).

### 3.6 Card (ENGINES Part 2 fields)

| | |
|---|---|
| bundles | `K-395, K-397–400, G1-412–415, G2-388/389`; `lib/fd-compose.js`, `lib/fd-render.js` (split, §2.2), `lib/fd-browser-diff.js`, `lib/b7-common.js bank` + `data/b7/find-the-differences.js` (`loadScene` → `platform.readJson`) |
| data ×11 | scene names `data/cbn/names-i18n.js` + `data/fdx/names-i18n.js` ✓; change words / starters ×11 in the b7 bank ✓; nouns from vocab ✓ |
| controls | Level · *Scene* · *Differences* (3/5/7/10) · *Colour / B&W* · *Kinds* = 5 |
| screens | `tap-select` |
| keep | — |
| risks | the 1.6 MB tail of scene files (rounding + split, measured in S6); colour only on `inherited` scenes; a scene × N refusal must read as a sentence, not an error |
| obvious template gaps (F2b) | odd-one-out of 4 near-identical panels (one op on panel k); "which picture changed?" with 3 scenes; a count-the-kind face (how many *swaps*) |
| effort | 3 + 2 (section H) = **5** (unchanged) |

**[find-the-differences-Q1]** Ship all 665 reviewed scenes as one file each (≈ 50 MB gz store, 30–110 KB per fetch); the diff gate is already client-side (`lib/fd-browser-diff.js`) and costs ≈ 0.3 s on a 2019 iPad (estimated from 100 ms measured in Chrome).

---

## 4. Dot to Dot (`dot-to-dot`)

### 4.1 What a teacher can choose, and how every result is proven

| control | values | proof |
|---|---|---|
| **Picture** (picker: the 200 d2d scenes, filtered by the index to those with `fit[N].ok` for the chosen sequence length; measured today: 10 dots → 112 scenes, 20 → 36, 21 letters → 33, 26 → 15, 27 (es) → 11, 29 (sv/da/no/fi) → **5**; the 16 hand-designed figures `data/b2/figures.js DOT_FIGURES` (star, house, boat, rocket, fish, kite, heart, butterfly, tree, car, cat, ice-cream, umbrella, whale, sailboat, crown) always) | — | the dots were placed offline on the drawing's own outline so that joining them returns the curve (`tools/d2d-build.js:125-145`: next dot as far as the chord stays within 7 units of the smoothed outline, ≥ 22 units apart, never crossing `:54-61`); a count whose fit failed is simply absent from the picker |
| **Sequence** | 1–10 · 1–20 · 11–30 · count back · by 2/5/10 · the locale's alphabet (`data/b2/collation.js`) · sums (F2b) | the labels are the sequence (`values` / `startAt, step`), the dots do not move; `K-285.verify` asserts the sequence, the single coral start dot, ≥ 22 px spacing, no self-intersection, no answer segment drawn (`types/k/K-285-dot-to-dot.js:212-247`) |
| **Dots** | 10 or 20 (the scene stretch), 21–29 for alphabets | `sceneDotFigure` throws when `fit[N]` is missing (`primitives/scene-dot-figure.js:41-42` — **F3: the module is 149 lines; the earlier `:187-268` references were out of range**) and when a number has no free place (`:122`); v2 scenes place numbers on free paper only (`:101-102`, `:117`), never on the line the child draws (`:101`), nearest its own dot (`:113`), a quarter em between numbers (`:108`) |
| **Number size** (Level) | 24 / 20 / 18 px (`K-285:25-26`) | the index records, per scene × count, whether the numbers fit at each `labelPx` (today computed at run time by `d2dPool`, `K-285:81`, over all 200 files — the maker precomputes it into the index so the picker is instant) |
| **Finish-the-picture window** | the hand-figure d1 config only (`K-285:103`: `count: 20, window: 10`); every scene config has `window: null` (`:35-42`) | the pre-printed remainder joins the dots (`verify :222-230`) |

Legibility is measured on the rendered page: label ink boxes from `canvas measureText` (`verify :251-258`) must not overlap each other or a dot (`:261-271`).

### 4.2 Precomputed vs live

| | what | size / time |
|---|---|---|
| ships | `d2d/<id>.json` (`obj`, `body`, `fit[N]{pts, closed, s, dev, complexity, art, lite, ink, liteInk}`) | **10 KB gz** per scene; the whole set 4.3 MB; index 4 KB |
| live | `sceneDotFigure` (label placement) + number strip | **PC 2 ms** → iPad ≈ 6 ms; `K-285.verify` live (DOM + measureText) ≈ 10 ms |
| screen | `tap-order` over `[data-lcs-dot]` (the runtime kind exists, `emit/interactive-runtime.js:60, :431-437`; new wiring: items = the dots in label order) | — |
| not live | the outline, the greedy dot fit, hero enlargement (`d2d-build.js:168-181`, sharp `compose`) | offline |

### 4.3 Growth — and the alphabet problem
`tools/d2d-build.js` runs over the CBN scenes (`:168`). Two extensions, both offline: (a) **hero-alone pictures** from the whole B&W library (1,325 drawings; the builder already composes the hero alone when props step aside `:183-204`) — at today's yield (56 % at 10 dots, 18 % at 20, 2.5 % at 29) that is ≈ 740 / 240 / 33 pictures; (b) **a second stretch** for long alphabets: the dots cover two outline stretches (head and tail) joined by the drawing's own line, which lifts the 29-letter yield without longer outlines — a builder change (`place`/`greedy` over two arcs), gated by the same `dev ≤ 7` and `minSp` rules. Refusals stay in `data/d2d/review.js` (today 14 at 10 dots, 3 at 20). The Nordic alphabet face ships only once (b) or the hero-alone set gives ≥ 20 pictures per locale (a gallery with 5 pictures repeats within 5 "New version" presses).

### 4.4 Own photo — **refused** (v1); "partly" later
The dots need a closed outline from ink (`heroBody`, `d2d-build.js:152-167`); a photo has none. A PNG cut-out with a transparent background has an alpha silhouette (the same fact `same-different-Q1` uses, `image-cache/silhouette.js:15-31`): `contours` + `greedy` are pure JS, so a live dot-to-dot of a cut-out is *possible* and gated by the same `dev`, spacing and crossing rules + `K-285.verify`. Operator decision §8-B; not in v1.

### 4.5 Spike
Index build for 200 scenes × 6 counts × 3 label sizes (offline, minutes); `sceneDotFigure` + `verify` on iPad ≤ 50 ms; `tap-order` on SVG circles at 360 px: every dot ≥ 44 px tap target after the runtime's page crop (METHOD-fd §9: a 44 px target needs ≥ 90 page px) — if not, the screen scales the figure or refuses the screen for 20-dot pages (printable only).

### 4.6 Card

| | |
|---|---|
| bundles | `K-285, K-294–296, K-308/309, G1-285, G1-294, G2-304, G2-314`; `primitives/dot-figure.js`, `scene-dot-figure.js`, `qa/verify-b2-figures.js subdivide/inside` (pure), `data/b2/figures.js`, `data/b2/collation.js` |
| data ×11 | language-free; alphabets ×11 ✓ (it 21, es 27 with Ñ, sv/fi 29 ÅÄÖ, da/no 29 ÆØÅ); names from vocab ✓ |
| controls | Level · *Picture* · *Sequence* · *Dots* (10/20/alphabet) = 4 |
| screens | `tap-order` (new wiring) |
| keep | — |
| risks | alphabet yield (5 Nordic scenes today); the precomputed placeability index replaces a 200-file scan |
| obvious template gaps (F2b) | sums (the topics file; labels = answers, the picker needs `fit[N]` for the number of sums); dot-to-dot with the number words (de "zwanzig") as labels — width-gated by the ink box; two-colour dots (odd/even) |
| effort | 3 + 2 = **5** (unchanged) |

**[dot-to-dot-Q1]** Not from any picture live: the fit needs the hero's silhouette outline from its ink and a greedy chord fit with `sharp` composition (offline, seconds per picture). Precomputed set = the 200 CBN-scene heroes today (10 KB each), grown offline to the hero-alone B&W library and a two-stretch fit for long alphabets; a photo never, a transparent cut-out as a later measured option.

---

## 5. Color by Number & Code (`color-by-number`)

### 5.1 What a teacher can choose, and how every result is proven

| control | values | proof |
|---|---|---|
| **Picture** (200 line-art designs: 100 scenes + 100 pictures, by level — scene L1 26 / L2 37 / L3 37, picture L1 14 / L2 39 / L3 47, `data/cbn/designs.js`) | index | each design's parts were found offline (`cbn-lineart-build.js` → `data/cbn/lineart/<id>.json`) and reviewed on colour sheets (`data/cbn/lineart-colours.js`, METHOD-fd §2); its numbers were placed and gated offline (`tools/cbn-preview.js` → `data/cbn/labels.json {ok, labels[[x,y,r,n]], num}`; a design with `ok !== true` throws, `lib/cbn-type.js:18-26`) |
| **Colours** 2–8 | the design's own colour count (`LEVEL_CAPS`, `lib/cbn-render.js:31`: L1 3–5, L2 5–7, L3 6–8) — the teacher chooses the *level*, not a crayon count | a design builds only at its level (`cbn-type.js:96`) |
| **Key** numbers · shapes · letters · sight words · sums · differences · multiplication (F2b) | number keys on every design; a *code* key (an expression per part) only on designs whose every label has room | label room: a number needs `r ≥ 8.5` units, a compact number `≥ 5.5` (`cbn-render.js:26-27`); a two-term expression "3+4" is ≈ 2.4× a digit's width, so it needs **r ≥ 15** — measured on `labels.json`: of 380 labelled entries, min-r ≥ 8.5 on 204, ≥ 13 on 49, **≥ 15 on 22**, ≥ 18 on 13 → the sums key is offered on ~20 designs; the index carries `minLabelR` and the picker filters |
| **Crayon set** (which 8 crayons; the printed colour words) | `PALETTE :21-24`; words `data/color-words.js` ×11 | the key row throws on a missing word (`cbn-type.js:42`) |
| **Own key** (teacher renames crayons, e.g. "1 = your favourite colour") | text in `edits[op:'word']` on the key chips | never graded: the screen's answer map stays the design's crayon; the chip is marked "teacher-made" |

**Fully painted (standing rule):** the CBN keys keep their small white cells *by design* (METHOD-fd §9: "The CBN keys themselves keep their white cells"); the answer key renders `mode:'colour'` from the same regions, every part a crayon or `none` by the reviewed plan — the rule is enforced offline by the colour-sheet read, and the maker never recolours.

### 5.2 Precomputed vs live

| | what | size / time |
|---|---|---|
| ships | `cbn/<design>.json` (regions `d`, ink, part names) + its `labels.json` slice + `designs` meta | **66 KB gz** median, 94 max; 13 MB store |
| live | `buildArt` + `toSvg` (line / colour / id) + key row | **PC 2 ms** → iPad ≈ 6 ms |
| live when needed | `labelArt` + `labelsAndGate` + `checkSolid` — only for a design not in `labels.json` at this `artVersion` (never, once the index is built) and for the **code keys** (an expression label is re-measured against `r` live — pure arithmetic) | PC 132 ms → iPad ≈ 400 ms · Chromebook ≈ 530 ms; budget ≤ 0.8 s |
| screen | `tap-paint` from the live render (`render/render-instance.js:128-160` logic moved to the student shell: items = `path[data-lcs-region]`, palette = the key chips) | — |
| not live | `segmentInk` of a new drawing (needs `compose`, sharp), the colour plans | offline |

### 5.3 Growth
Any B&W library drawing: `tools/cbn-lineart-build.js` (parts) → a colour plan in `lineart-colours.js` (`BG`/`HERO`/`OVERRIDE`) → `tools/cbn-preview.js` (numbers + the three gates) → `cbn-lineart-sheets.js` read in colour → `labels.json ok:true` → index. Yield to expect: a part needs `r ≥ 5.5` units for its number; thin-lined props (`mergeSmall`, `lineart-scenes.js:406`) are widened in the scene record, never at run time.

### 5.4 Own photo — **refused**
Region detection needs closed parts bounded by ink (`segmentInk :188-242` labels the paper between closed ink); a photo has no ink and its "regions" are gradients. No model is allowed. The refusal names coloring-pages (the photo framed as-is).

### 5.5 Spike
`labelArt` on the two biggest designs on iPad / Chromebook ≤ 0.8 s; `tap-paint` live geometry within 0.5 % of `render-instance`'s capture; the `id` render's exact colour recovery (`idRgb :35`, `(r & 15) === 8` `:90`) holds on Safari's canvas (WebKit may premultiply alpha — the id render has no alpha, but S6 asserts every region id is recovered on both devices, poisoned by one wrong id).

### 5.6 Card

| | |
|---|---|
| bundles | `K-241, K-265–269, K-393/394` (+ `K-266` classic); `lib/cbn-render.js`, `cbn-type.js` (labels via platform), `cbn-lineart-core.js` (split), `primitives/cbn-art/core.js`; `K-241`/`K-267–269` are generated shape pages (`types/k/K-241-color-by-code.js:1-14`), not library art |
| data ×11 | colour words ×11 ✓ (`data/color-words.js`); design names ×11 ✓ (`names-i18n.js`); sight-word / letter-sound keys need the sight-words + letter banks (exist) |
| controls | Level · *Picture* · *Key* (numbers / shapes / letters / words / sums / differences / ×) · *Range* (for the arithmetic keys) = 4 (+ *Colours* is the Level) |
| screens | `tap-paint` |
| keep | — |
| risks | the sums/differences key on library art is thin (~20 designs) until bigger-part designs are reviewed; the shape-coded `K-241` family stays generated |
| obvious template gaps (F2b) | colour by sight word ✓(seed) · colour by letter sound (picture starts with) · colour by multiplication fact · colour by odd/even · colour by number word (de/fr/… — width-gated) · "colour by your own key" (ungraded) |
| effort | 3 + 2 + 1 (code keys on art + the live labeller path) = **6** (+1 vs ENGINES) |

**[color-by-number-Q1]** Any *library* B&W picture — yes, offline (parts + plan + numbers + a human colour read), never live; the labeller itself already runs in a browser (`labelArt`, 132 ms on this PC) and is the live path for code keys. Label placement in small regions is measured (`MIN_R_COMPACT 5.5`), and a piece too small for its number is a gate failure, not a smaller font (`labelsAndGate :158-167`). Fully painted: the reviewed plan, no run-time recolouring.

---

## 6. How to Draw (`how-to-draw`)

### 6.1 What a teacher can choose, and how every result is proven

| control | values | proof |
|---|---|---|
| **Picture** (200 library lessons `data/htd` + 152 Level Set drawings `data/htdx` − 48 refused + 22 drawn vector lessons `data/htdv`) | index (`kind: library | vector`, `nSteps`, `guideOk`, `fragments`) | a library lesson = the drawing's own ink split into steps whose union IS the drawing, pixel-exact (`lib/htd-steps.js:306-309 missing = extra = 0`); a vector lesson obeys laws 1–4 at compile (`lib/htd-vector.js:19-24`) |
| **Steps** 4 / 5 / 6 | `nSteps` recorded per lesson; a different count = a different offline build (`OVERRIDES[slug].steps`, `data/htd/review.js`) | the maker offers only the counts that were built AND read (METHOD-htd §4: a step of one speck, a face split across steps → refused) |
| **Step layers: toggle / reorder** (the competitor's screenshot) | **toggle = hide a step** → the "finish the drawing" model; **reorder = never free**: the structure step must stay first and the details last (METHOD-htd §3 rules 5–6) | precomputed: each lesson ships `steps[k].d` + `kind` (`outline / structure / features / details`, `:311`) and, for the omission faces, the pixel-traced kept drawing `keep[key]` (`:315-327`, the Level Set rule: a drawing "minus a step" leaves ghosts unless traced from the masks) — so a toggle is a lookup of a shipped `keep` key, and a toggle with no `keep` entry is refused ("this step cannot be left out of this drawing"); reorder is restricted to the inner non-structure steps between step 2 and the details step, and gated live by the greyscale law per card (new lines coral, earlier ink, last card black — METHOD-htd §7 (3), ported to canvas as class B) |
| **Task** (gallery) | base · shapes · trace · finish · grid · word · scene · order · copy-steps · write · memory | `K-396` `mode` dispatch; the shapes face only on the 22 `GUIDE_OK` vector lessons (METHOD-htd §13: fitted ellipses never match a drawing) |
| **Size / paper layout** | the face's lane budget (`BODY_LADDER 728`, `BODY_STRIP 740`) | `verify` asserts stack 620–740 at the tallest chrome (METHOD-htd §9) — a page fills its body |
| **Grid density** (grid face) | 3 × 3 / 4 × 4 / 5 × 5 (`K-396:60`) | the Level |

### 6.2 Precomputed vs live

| | what | size / time |
|---|---|---|
| ships | `htd/<slug>.json` `{ bbox, full, steps[{d, share, bbox, kind}], shapes, stats }` + `<slug>.keep.json` for the omission faces | **84 KB gz** (cat); htdx with `keep` 186 KB → split so a lesson fetch stays ≤ 120 KB |
| live | `stepSvg` / `fullSvg` / the face layout | **PC ≤ 1 ms** → iPad ≈ 3 ms |
| live gate | the greyscale law per card (rasterise each card at 150 px on canvas, core pixels luma bands — METHOD-htd §7) only when the teacher toggles/reorders; the shipped faces are gated offline | ≈ 5 cards × a 150-px raster ≈ 30 ms PC → ≈ 100 ms iPad |
| screen | printable (the pencil is the point) | — |
| not live | `buildSteps` (1.3–1.6 s on this PC per drawing, sharp), the shapes fit, `htdv` compile | offline |

### 6.3 Growth
§2.4 with `tools/htd-build.js [--src=…] [--set=htdx]`, `htd-sheets.js` (read EVERY sheet), `review.js OVERRIDES/REFUSED`; drawn vector lessons by hand in `data/htdv/src/<key>.js` + `htdv-build.js` (its contact sheet per drawing). Names ×11 from `data/htdx/names.js` (title form, bare noun, traced word) — the `{L}` / `{N}` tokens (METHOD-htd §9: never strip an article in code).

### 6.4 Own photo — **refused**
A step is a subset of the drawing's ink by part ownership (`htd-steps.js:106-112`); a photo has no ink and no parts. "Draw your own pet" style pages can only show the photo *as a model beside an empty paper* — that is a coloring-pages / blank-paper template, not a lesson; offered there, not here.

### 6.5 Spike
Fetch cat (84 KB) + render the base ladder on iPad ≤ 150 ms; the greyscale-law canvas port agrees with the Node measurement on all 11 shipped faces (core-pixel luma within ±2); toggling a step on a lesson with `keep` shows no ghost at 2× zoom (read, not measured — a ghost is the recorded trap).

### 6.6 Card

| | |
|---|---|
| bundles | `K-396, K-401–404, G1-416–419, G2-390/391`; `lib/htd-render.js` (split), `templates/components-b7/how-to-draw.js`, `data/b7/how-to-draw.js` (+ `VECTOR` map), `lib/htd-vector.js` compile stays offline |
| data ×11 | `{L}`/`{N}` tokens ×11 ✓; starters ×11 ✓ (G2-390); htdx names ×11 ✓; `strings.memory.foldWord` ×11 ✓ |
| controls | Level · *Picture* · *Steps* (4–6, per lesson) · *Hide a step* (finish face) = 3–4; task = gallery |
| screens | printable |
| keep | — |
| risks | the "editable layers" expectation vs the structural rule (toggle = shipped `keep`, reorder = inner steps only); htdx file size without the split |
| obvious template gaps (F2b) | shapes-only youngest level ✓(seed, on the 22 vector lessons) · enlarge on the grid ✓(seed) · draw the other half (symmetric lessons only, `data/pt/symmetry.json`) · draw the family (several lessons on one page) · trace-then-draw with the word in the locale |
| effort | 3 + 2 + 1 (layer toggle/reorder with its live greyscale gate) = **6** (+1) |

**[how-to-draw-Q1]** Precomputed layers per picture + an editor that toggles only steps with a shipped `keep` variant and reorders only inner steps, gated live by the greyscale law; live derivation is a 1.3–1.6 s `sharp` job on this PC with pixel ownership rules that took a month of reads to get right — not a browser job. A teacher's own image: refused (6.4).

---

## 7. Picture Tracing (`picture-tracing`)

### 7.1 What a teacher can choose, and how every result is proven

| control | values | proof |
|---|---|---|
| **Picture / scene** | the 20 face scenes + 300 Level Set skins (`data/ptx`) + **any of the 1,302 traceable B&W drawings** (`data/pt/index.json`: P1 517, P2 589, P3 196, X 23 refused) for the single-picture faces | every trace in the store passed laws a/b offline (`lib/pt-verify.js:52-60`: ≤ 2 % off the ink, ≤ 2 % untraced, every stroke ≥ 85 % covered) and its band was measured (density, short share, paths) |
| **Line** dashed / dotted; **thickness by age** | the band ladder P1–P4 (`lib/pt-render.js`, METHOD-pt §4) | the band follows the Level; a drawing is offered only in bands ≥ its index band (a P3 drawing never on a PreK page) |
| **Task** (gallery) | the 20 faces | `K-418` mode; each face's rules in `faceChecks` |
| **Start dots** | on few-stroke pictures only (≤ 4 strokes, METHOD-pt §4) | the index `paths` count |
| **Count / symmetry / direction faces** | pictures filtered by `symmetry.json` (p95 ≤ 0.005 of ink width), `pt-straight.js directionMix` (≥ 59 % in the column's direction), the hand-read `K422_CURVED` refusals | the index carries both measures; ⚠ the half-difference number cannot see perspective (METHOD-pt §14 traps) → the other-half face offers only pictures on a **reviewed symmetric list**, never the raw index |

Live per page (`K-418.verify`, `:83-90`): the stamped metrics — traced length within the band's budget (PreK ≤ 4,500 · K ≤ 11,000 · G1 ≤ 15,000 px), smallest traced picture ≥ 300 / 130 / 80 px, solid share, vertical extent (fills the body), no text but the word face.

### 7.2 Precomputed vs live — the new store

Today `pt-scene.composeScene` traces every drawing **live** with `sharp` (`lib/pt-scene.js:24-28 traceOf`, `:116`), cached per process; no trace file exists under `data/pt` (only `index.json`, `symmetry.json`). Measured: 133–342 ms per drawing in Node; a K-418 scene 1.57 s cold. In a browser without `sharp` the decode is a canvas (`drawImage` + `getImageData`) and the rest is the same pure JS — feasible but ≈ 0.5–1 s per drawing on an iPad (estimated), 5–10 s for a scene: too slow for "every change redraws at once". Decision: **precompute**.

| | what | size / time |
|---|---|---|
| ships | `pt/<theme>/<noun>.json` `{ W, H, sw, paths[{c, pts}], blobs }` for 1,302 drawings (built by `tools/pt-trace-all.js`, 90 s for the library, METHOD-pt §2) | **3–17 KB gz** each; ≈ 13 MB store (est. 10 KB avg) |
| live | `composeScene` with `traceOf` = a fetch; occlusion cuts, dash alignment, band classify, motifs, `verify` metrics (all pure JS, `lib/pt-scene.js`, `pt-render.js`, `pt-motifs.js`) | the warm K-418 build is **99 ms on this PC** → iPad ≈ 300 ms · Chromebook ≈ 400 ms; budget ≤ 0.6 s |
| the "look" model | `modelImage` → `<image href="/makers-assets/…/themes-512/…">` instead of base64 (`pt-render.js:298-311`) | — |
| screen | printable | — |

### 7.3 Growth
A new drawing in the library → `pt-trace-all.js` (index + trace), `pt-sheet.js --band` read, `pt-symmetry.js`, `pt-straight.js`; refusals = band `X` in the index and the hand-read lists (`K422_CURVED`, the symmetric list). A new face scene/skin per METHOD-pt §13.

### 7.4 Own photo — refused; **a scanned black-line drawing: partly (operator decision §8-C)**
A photo has no ink to trace. A child's or teacher's own *drawing* photographed on white paper is ink: `inkMask` at luma < 150 (`pt-trace.js:277`) works on a clean scan. Possible path, gated live: canvas decode → `traceFromMask` (the pure pipeline, §2.2) → laws a/b ported to canvas (class B) → band metrics; refused when the laws fail (shadows, grey paper, pencil too pale) with the sentence "scan or photograph a dark pen drawing on white paper". Cost ≈ 1 s per drawing on an iPad (estimated from 0.2–0.3 s Node). Not in v1; S6 measures it on 10 real classroom photos only if the operator wants it.

### 7.5 Spike
Fetch 8 traces + compose the base scene on iPad ≤ 0.6 s; the dash rhythm identical to Node's render (hash of the scene SVG = Node's, since the trace is now data — gate 3 `html-parity` applies); optional: the scan path on 10 photos, pass = laws a/b pass on ≥ 7 and no false pass (a reviewer reads the 10 renders).

### 7.6 Card

| | |
|---|---|
| bundles | `K-418–432, G1-429–433`; `lib/pt-scene.js`, `pt-render.js`, `pt-motifs.js`, `pt-geom.js` (split), `lib/ptx.js` (catalog via platform), `data/b9/face-scenes.js`, `data/ptx/*` |
| data ×11 | face strings ×11 ✓; Level Set names/instructions ×11 ✓ (`data/ptx/i18n`); the word face uses vocab + `letter-strokes.js` (Œ added) ✓ |
| controls | Level · *Picture / scene* · *Line* (dashed / dotted) · *Thickness* (by age) = 4 |
| screens | printable |
| keep | — |
| risks | the trace store is new (build + review ≈ 1 session); the composer's measured rules (halo, dash alignment) must stay byte-identical (gate 3 on the 220 published) |
| obvious template gaps (F2b) | "trace a teacher-chosen library picture" ✓(seed: the single-picture faces over the 1,302 index) · trace and colour by number (trace lines + a CBN key on the same drawing: the CBN regions exist for 200) · trace the path between two pictures (pre-writing cross-link) · trace the word's picture then the word (G1-430 generalised to the vocab) |
| effort | 3 + 2 + 1 (trace store + the canvas law port for the gate suite) = **6** (+1) |

**[picture-tracing-Q1]** Precompute the whole B&W library (1,302 traceable of 1,325; ≈ 13 MB gz, 3–17 KB per drawing) with `tools/pt-trace-all.js` and ship traces as data; the browser composes live in ≈ 0.1 s (PC). Running the tracer in the browser is possible (pure JS after a canvas decode) but 5–10 s per scene on an iPad — kept only as the optional own-scan path.

---

## 8. Mazes (`mazes`)

### 8.1 What a teacher can choose, and how every result is proven

Two engines, two proofs:

**Grid mazes** (`K-242, K-270–272`, `lib/maze.js`): a randomised-DFS spanning tree — exactly one path between any two cells **by construction** (`lib/maze.js:19-40`), re-checked structurally (`expectedWallCount :63-66`, `K-242.verify :58-75`: wall count, solution length ≥ cols + rows − 1 and ≥ 25 % of the cells). Live, microseconds, any size the page holds (7 × 8 … 11 × 13 today, `K-242:20-22`; the maker offers the three sizes + "giant"); start / goal pictures from the theme (whole, unmodified).

**Hand-made scene mazes** (`K-405` + 19 faces, `lib/hm-*`): generated route-first with gates (`hm-maze.js:18-34 gateTree`; `generateLooped :105` proves exactly one valid route by search; `generateStreets :247` one shortest way by BFS; `generateForest :337` a derangement; `generateStrands :487`; `generateHexHop :580`), then **re-proved on the rendered pixels** by the raster oracle (`hm-verify.js:72-181`: MISSING / EXTRA clusters, REACH flood, UNIQUE = the road encloses no field patch `:169-179`, per-route reach `:154-161`, strands continuity `:135-144`, hex cell rings `:78-87`).

| control | values | proof |
|---|---|---|
| **Maze** | grid · scene (20 published faces + 206 Level Set skins) · rule (letters / numbers / sums / sounds — the looped faces) | the face |
| **Scene / skin** | the index | each skin measured by `hmx-reliability.js` (builds ≥ 70 % of draws at its level) and **pinned** (`tools/level-set/mzl-pin.js:3-8`: the first `seedVariant` whose page builds, per locale for label faces) |
| **Size / difficulty** | the Level presets (`data/hmx/levels.js`: L1 wider roads, shorter way, fewer dead ends; L3 narrower, longer, more decoys — METHOD-mazes §11) | never a free knob: the presets were measured to build and read |
| **Start / goal pictures** | the scene's hero/goal; swap for any library picture whose ink box fits the island disc (`lib/hm-slots.js`, `ink-boxes.json`) — or an **own photo** (8.4) | the composer refuses a drawing with no island (`K-405:231-236`: 12 attempts, then throws); the live oracle's MISSING test catches a picture over a road |
| **New version** | the next pinned seed of the (scene, level) pool | deterministic rebuild; the oracle runs again |

### 8.2 Precomputed vs live — pinned mazes, live composition, live oracle

Measured (§1.1): the generator's cost is a retry loop; one page costs 0.4 s on a lucky seed and up to **30 s** on an unlucky one *on this PC* (K-411 median 2.8 s, G1-420 median 11 s). On an iPad that is minutes. The same seed is deterministic (`lib/rng.js:13-37`; `mazeFor` is the first rng consumer, `K-405:46`), so the cost of a seed is a property of the seed.

| | what | size / time |
|---|---|---|
| ships | `hm/pins.json`: per (scene, level[, locale]) the seeds `{ seedVariant, ms }` whose build was measured **fast** offline (`mzl-pin.js` extended with a timer: keep seeds ≤ 250 ms in Node ≈ ≤ 1 s iPad; ≥ 12 per cell, 20 where the scene allows); scene records + `ink-boxes` slices | integers; < 1 MB with the scenes |
| live | `mazeFor` at a pinned seed + `composeScene` + strip | the min column of §1.1: 4–415 ms PC (G1-420 1.6 s even at its best seed → its pins are the seeds under 1 s, measured per seed; the index records each face's p95) → iPad ≈ ×3; budget **≤ 1.5 s** at the largest size, in a worker with a progress hint |
| live oracle | `hm-verify-core` on `platform.rasterSvg` of the scene SVG and of the declared corridors | **PC 63 ms** → iPad ≈ 200 ms |
| screen | `trace-path` from the declared graph (`render-instance.js:162-208` logic in the student shell) | — |
| fallback if S6 fails the 1.5 s line | ship the generated graph `m` per pin (≈ 6 KB gz est.) instead of the seed; composition and the oracle stay live | 226 × 3 × 12 × 6 KB ≈ 50 MB gz |

Label faces (alphabets, sound pools, number runs) differ per locale: pins per locale, as `mzl-pin.js` already does; the sound face's card pool per locale from `data/hmx/sound-pools.json` with the human refusals (`data/hm/sound-review.js`).

### 8.3 Growth
A skin in `data/hmx/scenes-b*.js` → `hmx-reliability.js --json` → `mzl-allocate`/`mzl-pin` (+ the timer) → `mzl-sheet.js` read (print + key + screen) → text ×11 from the noun tables (`data/hmx/text-src/<loc>.js`; ⚠ a picture swap changes text in every locale, METHOD-mazes §11) → index. Grid mazes need no growth (generated).

### 8.4 Own photo — **partly: the hero or the goal, whole, square-framed**
The composer places the hero/goal by ink box on the largest free island disc (`lib/hm-scene.js` header `:9`); a photo is given a square box of the slot's size (the `own[]` `w, h`), drawn inside a rounded white frame so the road colour never shows through it; the live oracle excludes the declared `art` box from EXTRA and still reports a covered corridor as MISSING (`hm-verify.js:120-125`). Refused on the babies-and-mothers face (the pairing is content) and on the first-sound face (a photo has no reviewed name). Student links: the photo cannot travel (ARCHITECTURE §18-B).

### 8.5 Spike
On iPad / Chromebook: build at 5 pinned seeds for K-405, G1-420 (the slowest), K-411 (a label face), G1-423 (strands) — pass p95 ≤ 1.5 s in the worker; the canvas oracle vs sharp on the same 5 pages: identical issue lists (0 ≠ 0 is a fail) and mask agreement ≥ 99.5 %; the trace-path screen's route geometry within 0.5 % of `render-instance`'s capture. If the build line fails: the graph-per-pin fallback (8.2) is measured instead (fetch ≤ 10 KB, compose ≤ 300 ms).

### 8.6 Card

| | |
|---|---|
| bundles | `K-242, K-270–272` (`lib/maze.js`); `K-405–413, G1-420–428, G2-392/393` (`lib/hm-graph.js`, `hm-maze.js`, `hm-rules.js`, `hm-scene.js` (platform), `hm-slots.js`, `hm-corridor.js`, `hmx.js`, `hmx-scenery.js`, `hm-verify-core.js` (split); `data/hm/scenes.js`, `data/hmx/*`, `data/tracing/letter-strokes.js`) |
| data ×11 | alphabets / number words / sound pools ×11 ✓; Level Set text ×11 ✓ (`data/hmx/text/<loc>.js` → an explicit index module, ARCHITECTURE §2.2); the 13 screen messages ×11 ✓ |
| controls | Level · *Maze* (grid / scene / rule) · *Scene* · *Start / goal picture* · *Rule* (letters / numbers / sums / sounds) = 5 |
| screens | `trace-path` (scene faces); grid mazes gain `trace-path` over the cell graph (new, small: the grid IS a graph) |
| keep | picture-path: "step only on pictures of a kind" → a looped rule face with a predicate pool (`R.assignPredicate`, `K-405:75`), collectibles ✓ (collect face), distractors ✓, copies min–max → *How many* pages |
| risks | the retry-tail (settled by pins); label faces × 11 pins; the oracle port must be poisoned with `hm-scene-poison.js`'s five cases |
| obvious template gaps (F2b) | grid maze with own start/goal ✓(seed) · picture-path rule ✓(seed) · "two ways, which is shorter" (streets) · a maze with a word to collect (letters along the route spell the vocab word) · count the turns |
| effort | 3 + 2 + 1 (retired) + 1 (pins + oracle port) = **7** (+1) |

**[mazes-Q1]** Yes: the oracle's logic is pure JS (`hm-verify.js:35-70`) and its two `sharp` uses are rasterisation (`:27-34`, `:74`) — on a canvas it ran in **63 ms** on this PC (≈ 0.2 s on a 2019 iPad, estimated) per generation. The generation itself is the problem (8.2), not the oracle.

---

## 9. Coloring Pages (`coloring-pages`)

### 9.1 What a teacher can choose, and how every result is proven
The composer is ENGINES Part 3 §E (1 / 2 / 4 B&W library pictures, caption, trace-the-word lane, writing lines, mirror flag, an ungraded own key, the shell's `ink` brush). Proofs: every `<img>` resolves from a `bw` theme (the localized marker test `bw(\s+\d+)?$`; 50 BW themes, 1,325 nouns measured in `cache/manifest.json`; the colour library is hidden in this maker — **never mixed**), captions = the vocab word, frames inside the body, `pageFill`. A "colour the scene" page composes BW drawings with `mixedScatter` (no overlap by construction). `tap-paint` only for the 200 pictures that have CBN regions (reuse §5).

### 9.2 Precomputed vs live
Nothing precomputed beyond the picture index (`cache/manifest.json` slice per theme) and the CBN store for the paint screen; live = layout, ≈ 1 ms; pictures 22 KB each from `themes-512`.

### 9.3 Growth
The B&W library itself (a new BW theme = new nouns in `image-vocabulary.js`, operator-approved §10.3).

### 9.4 Own photo — **as is: yes; line art: refused in v1 (operator decision §8-D)**
A colouring page needs **closed, clean, big regions**; a photo's edge map (Sobel / Canny / XDoG on a canvas — all feasible in the browser in < 1 s) is broken, textured and tonal: hair, shadows and backgrounds become scribble, and nothing closes a region. Without a model (forbidden) there is no reliable way to make K-3 line art from a classroom photo, and no gate can say whether the result "shows what the word says". So: the photo is placed **as is** (square-fit, a rounded frame, no caption, the "your picture" chip), to colour *around*, decorate, or write about — and a *sketch* filter, if the operator wants to spend a spike on it (§8-D), is offered only behind a teacher-accepted preview and the "your own changes" chip, never as a gated template.

### 9.5 Spike
None required for v1 (no new engine). Optional (§8-D): XDoG + threshold + small-component removal on 10 classroom photos, judged by a reviewer: pass = ≥ 7 of 10 "colourable" by a teacher's reading; a measured line density band becomes the refusal rule.

### 9.6 Card

| | |
|---|---|
| bundles | `types/_shared/coloring-page.js` (new composer, Part 3 §E), `primitives/trace-path.js`, `letter-strokes.js`, the `ink` layer (shell) |
| data ×11 | captions from vocab ×11 ✓; own key = teacher text |
| controls | Level · *Pictures* (BW picker, 1–4) · *Layout* (1 / 2 / 4 / scene) · *Caption* (none / word / trace) · *Lines* (on/off) = 5 |
| screens | `tap-paint` where CBN regions exist; else printable |
| keep | coloring: brush ✓ (`ink`), flip ✓ (`mirror` flag, refused for text-bearing nouns), handwriting lines ✓, name field ✓ |
| risks | the BW marker rule per locale (the display names carry the localized marker; the cache uses EN dir names, METHOD-pt §2); own-photo expectations (the line-art refusal must be a sentence) |
| obvious template gaps (F2b) | colour and name ✓(seed) · colour the scene ✓(seed) · own key ✓(seed) · colour by the word's first letter (phonics bank) · colour the same picture in two sizes (big/small) · colouring + a dotted caption in the school script |
| effort | 3 + 1 (retired) + 1 (composer) = **5** (unchanged) |

**[coloring-pages-Q1]** Own uploads stay "as is" in v1; browser edge-to-line-art is not good enough for K-3 colouring without a model and cannot be gated — a later optional spike (§8-D).

---

## 10. Symmetry & Grid Copy — the library-art grid copy (`symmetry-grids`)

ENGINES [symmetry-grids-Q1] decided: reuse the how-to-draw lesson (`K-396` mode `grid`, `types/k/K-396-how-to-draw.js:246-253`; `templates/components-b7/how-to-draw.js:112 htdGrid`), draw `steps ≤ k` for the Level, grid density from the art's detail, never simplify art live. This run adds what §H asks:

1. **Choices and proof.** *Picture* = any indexed htd lesson (library or vector; 200 + 104 + 22); *Grid* = computed, shown, not free (3 … 8); *Level* = outline only / + big parts / whole drawing; *Labels* A–H / 1–8 on/off; *Axis* for the mirror face only on the reviewed symmetric list (never the raw symmetry index — the perspective trap, METHOD-pt §14). Proof: gate 15 asserts per cell ≤ 8 path segments after RDP at ε = cell/8 and no cell > 40 % ink (ENGINES Q1) — **computed offline into the lesson record** (`grid: { 3: {maxSeg, maxInk}, 4: …, 8: … }` from the step masks in `htd-build.js`, pure counting on the masks it already has) so the picker and the control are instant and the browser only re-asserts the chosen cell count on the rendered SVG (`getTotalLength` per segment per cell).
2. **Precomputed vs live.** The lesson file (84 KB gz) + the `grid` block; live = `htdGrid` layout ≈ 1 ms.
3. **Growth** = the how-to-draw loop (§6.3); the pixel figures (`data/b2/figures.js`, 4 per size) need authoring (ENGINES card: ≥ 12 per size).
4. **Own photo — refused** (no lesson); a library *colour* picture without a lesson — refused in the grid-copy face (the picker shows only lessons).
5. **Spike:** none beyond §6.5; a read of 10 grid pages at 3 × 3 and 5 × 5 by a reviewer (can a child copy square by square?) before the face ships.
6. **Card additions** to ENGINES #21: bundles + `lib/htd-render.js`; controls unchanged (6); effort **4** + 0.5 (the `grid` block) — rounded **4**.

---

## 11. Spike S6 — the refined plan (replaces ARCHITECTURE §17.4)

One session on a 2019 iPad (Safari 16+) and a mid-range Chromebook, one on the PC to prepare. The probe is the §1.1 script moved into the preview shell (so the same code runs on the devices), extended with the device runs below. **Every line is a pass/fail; a miss keeps that step offline (nothing is forced live) or triggers the named fallback.**

| # | measure | pass line | on miss |
|---|---|---|---|
| 1 | device factor: the §1.1 probe on both devices | record the real ×factor per step; replaces the ×3 / ×4 estimates everywhere above | — |
| 2 | FD: fetch + parse `apple-rich` and the largest rounded scene; `browserDiff` on K-395 and G2-388 | ≤ 120 KB transferred, ≤ 300 ms parse, diff ≤ 1.0 s p95; identical components to Node on the probe scenes | split `cands` / lower precision; the diff stays live (it is the family's oracle) |
| 3 | CBN: `labelArt` on the two largest designs; id recovery; `tap-paint` geometry | ≤ 0.8 s; every region id recovered; rects within 0.5 % | code keys precomputed per design instead of live |
| 4 | d2d: `sceneDotFigure` + `verify` + a `tap-order` screen at 360 px | ≤ 50 ms; every dot ≥ 44 px on the screen crop | 20-dot pages printable-only on screen |
| 5 | HTD: fetch + ladder; the greyscale-law canvas port | ≤ 150 ms; luma within ±2 of Node | toggle/reorder shipped as precomputed variants only |
| 6 | PT: fetch 8 traces + compose K-418; scene SVG hash = Node's | ≤ 0.6 s; hash equal | — (the store is the design) |
| 7 | mazes: 5 pinned seeds × 4 faces in a worker; the canvas oracle vs sharp; trace-path geometry | p95 ≤ 1.5 s; identical issue lists, mask ≥ 99.5 %; rects within 0.5 % | ship the graph per pin (≈ 6 KB) |
| 8 | `platform.rasterSvg` on Safari: `<image>` hrefs inside the SVG (maze pages) and `clip-path` (FD panels) rasterise identically to Chrome | mask agreement ≥ 99.5 % across the two devices | inline the WebP as a data URI for the oracle raster only |
| 9 | optional (operator): the own-scan trace path on 10 photos; the sketch filter on 10 photos | §7.4 / §9.5 | not offered |

Deliverable: `docs/makers/S6-RESULTS.md` with the measured table; the budgets in this file are then corrected to measured values.

---

## 12. Found wrong or missing in ARCHITECTURE.md and ENGINES.md (for F3)

> **F3: every row was verified against the code and resolved IN PLACE (marked "F3") — ARCHITECTURE §2.1/§2.2/§2.5 (the split as a lint prerequisite), §6.1 (23 types), §17.1 (pinned mazes; the live tracer and the new trace store), §17.2 (the 1.68 MB tail), §17.3 (class A = the CBN labeller, not a fill test); ENGINES #25/#26/#28/#30/#31 cards (data, controls, efforts 5/6/7/6/6) and the symmetry-grids `grid` block. Two of this run's own citations were corrected in turn: `lib/fd-compose.js` (146 lines) and `primitives/scene-dot-figure.js` (149 lines) were cited at lines past their end (§3.1, §4.1).**

| where | finding | consequence |
|---|---|---|
| ARCHITECTURE §17.1 "mazes … generated live by `lib/hm-maze.js`" | true in Node, but the generator is a retry search: 0.4–30 s per page on this PC (§1.1) | live generation is replaced by pinned seeds (§8.2); S6 line 7 |
| ARCHITECTURE §17.1 picture-tracing "`data/pt` + `ptx` ~1 MB (scenes) + the tracer … run offline" and §17.3 class C "`pt-trace.js`" | the tracer runs **live at build time** today (`lib/pt-scene.js:24-28, :116`); no trace files exist | a new precomputed store of 1,302 traces (§7.2) — ≈ 13 MB, one session of build + review |
| ARCHITECTURE §2.5 lint vs the engine files | the pure functions the browser needs live in files that `require('sharp')` (`cbn-lineart.js`, `fd-scene.js`, `htd-steps.js`, `pt-trace.js`, `hm-verify.js`) — the lint as written fails every picture maker | the module split (§2.2), no logic change |
| ARCHITECTURE §17.3 class A "cbn fully-painted check … over the rendered SVG's `path[data-lcs-region]`" | the fully-painted rule for CBN keys is the offline colour read (the keys keep white cells by design, METHOD-fd §9); the FD colour face paints small cells at build (`fd-scene.js:58`). The live CBN checks are `labelArt` / `checkSolid` (canvas) | the class-A entry for CBN is the labeller, not a fill test |
| ARCHITECTURE §6.1 "the 4 types whose verify uses `page.screenshot` … K-405" | all 20 scene-maze faces inherit K-405's screenshot verify (`K-405:256`), the 19 faces are spread specs | the build-time-only group is 23 types, and for mazes the oracle goes live (class B) |
| ARCHITECTURE §17.2 "an FD scene ≈ 200–400 KB raw → ~60–100 KB" | measured: median in band, but the largest file is 1.68 MB raw (~450 KB gz) | the rounding + `cands` split (§2.3); S6 line 2 |
| ENGINES #25 dot-to-dot "data/d2d 30 MB precomputed" | 30 MB raw = **4.3 MB gz**, 10 KB per scene; the real limit is the alphabet yield (29 letters → 5 scenes) | §4.3 growth |
| ENGINES #26 controls "*Colours* (2–8)" | the colour count is the design's level (`LEVEL_CAPS`, `cbn-type.js:96`), not a knob | control replaced by Level (§5.6) |
| ENGINES #30 controls "*Step layers* (toggle/reorder)" | free reorder would break the lesson's laws; toggle needs a shipped `keep` | restricted as in §6.1 |
| ENGINES #31 "`lib/pt-*.js` (tracer offline …)" | tracer live today (above) | §7 |
| ENGINES #28 effort 6 / #26 5 / #30 5 / #31 5 | +1 each for the pins + oracle port, the code keys + labeller path, the layer editor, the trace store | 7 / 6 / 6 / 6 (§3–§8 cards); section-H total +4 sessions — **F3: written into ENGINES Part 2 and into the reconciled programme figure (≈ 450 sessions, ARCHITECTURE §14.3)** |
| brief §3 "fd 427 MB" vs §H "fd 427 MB" | `du` 427 MiB = 445 MB decimal, 665 files (both figures are the same tree) | — |
| ENGINES symmetry-grids Q1 "gate 15 asserts the per-cell segment count" | asserted live only; nothing records it for the picker | the offline `grid` block (§10.1) |

---

## 13. For the operator

Each with my recommendation and the cost of each option. Nothing here blocks the platform, the pilot or spike S6; A–D decide what the six makers offer at their first release.

**A. Mazes: pinned seeds or shipped graphs.** (A1, recommended) pin fast seeds per scene × level (× locale for label faces) and rebuild live: data is a few integers, the engine is unchanged, "New version" is the next pin; cost: the pin tool gains a timer (≈ 0.3 session) and the pool is 12–20 per cell, so a teacher who presses "New version" 20 times on one scene sees a repeat (she can change the scene or the level). (A2) ship the generated graph per pin (≈ 50 MB gz for 8,000 mazes): zero build time on any device, same repeat limit; cost ≈ 0.5 session + served disk. (A3) live generation with a 2 s cut-off and "try again": cost: the measured tail makes 10–30 % of presses fail on an iPad — rejected. S6 line 7 decides between A1 and A2 on measurement.

**B. Dot-to-dot from a transparent cut-out (own picture).** (B1, recommended) not in v1; (B2) a later measured feature: alpha → silhouette → the greedy fit live, gated by the same rules + `K-285.verify`; cost ≈ 1 session + S6 time; the picture carries no name and the page says "your picture".

**C. Picture tracing of a scanned own drawing.** (C1, recommended) not in v1; (C2) the live scan path of §7.4 with laws a/b on canvas and a plain refusal sentence; cost ≈ 1.5 sessions (the canvas port of `pt-verify`, the band rule for scans, S6 line 9 on 10 real photos). It is the one own-picture feature here that can be *proven* — but only for ink on white paper.

**D. A sketch filter for coloring-pages.** (D1, recommended) photos as-is only; (D2) a one-session spike on XDoG with a teacher-accepted preview under the "your own changes" chip, never gated; cost 1 session + the risk that teachers expect a clean drawing from a holiday photo and get scribble — the refusal sentence must set that expectation.

**E. The Nordic alphabet dot-to-dot (29 letters).** Today 5 pictures fit. (E1, recommended) hold the alphabet face in sv/da/no/fi until the two-stretch builder (§4.3 b) gives ≥ 20 pictures — ≈ 1 session offline + a sheet read; (E2) ship with 5 pictures: cost: visible repetition in four markets.

**F. Colour-by-code on library art (sums / differences / ×).** ≈ 20 designs have room for an expression in every part. (F1, recommended) ship the code keys on those 20 and keep the generated shape pages (`K-241` family) for the rest; (F2) review 30–40 bigger-part designs offline for the code keys: ≈ 1 session of build + colour-sheet reads per 20 designs.

**G. The picture-tracing trace store.** Not a choice of *whether* (the maker cannot ship without it) but of scope: (G1, recommended) all 1,302 traceable drawings now (one offline run, 90 s, + a contact-sheet read of the P1/P2 bands ≈ 0.5 session); (G2) the 300 drawings the faces use: cost: the "trace any library picture" template is withheld until G1.

**H. How-to-draw "editable layers".** (H1, recommended) toggle = shipped `keep` variants, reorder = inner steps only, both gated live; (H2) free toggle/reorder with the ghost risk the Level Set paid for (METHOD-htd §12 traps): rejected — a lesson whose later part sits in front of a drawn line teaches erasing.
