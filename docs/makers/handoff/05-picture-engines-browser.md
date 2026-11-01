# 05 — Picture engines in the browser, spike S6 (task 5, Fable 5.1, 2026-11-01)

Design: ARCHITECTURE §2.2 / §17, ENGINES-ART §2.1–2.2 / §11. Measured report with every table:
`docs/makers/spikes/S6-picture-engines.md`. Built locally; nothing deployed; **the catalogue is unchanged — 56 Node
hashes (live pages of 8 tracing faces, shadow / mirror match, 5 maze faces, FD / HTD / CBN pages; hm-verify on real
screenshots; pt-trace + pt-verify; htd-vector; cbn-lineart compose + segment; fd-scene layers + panels; htd-steps; the
silhouette signatures, extents and PNG bytes) equal before and after** (`scripts/makers/spikes/s6-node-identity.js`,
baseline taken before the first edit, re-run after; the baseline is reproducible 56/56).

## What is built (commit: see git log for `[FEATURE][MAKERS] S6`)

- **`lib/platform` gains `picture.*`** — the one place the engines touch pixels: `rasterSvg(svg)`, `decode(png)`,
  `trim(file)`, `sized(trimmed, w, h, flip)`, `scaled(file, work)`, `alphaMask24`, `extent`, `silhouette`, `dataUri`.
  Node (`index.js`): the engines' own `sharp` chains, moved verbatim (proven byte for byte by
  `scripts/makers/tests/picture-platform.test.js`, 23 checks, poisoned). Browser (`browser.js`): the same contracts on a
  canvas; an SVG is drawn into a canvas with every `<image href>` inlined as a data URL first (an SVG in an `<img>` loads
  nothing external); drawings come from the asset base (the 512 px set).
- **No engine imports `sharp` any more**: `cbn-lineart`, `fd-scene`, `hm-verify`, `htd-vector`, `pt-trace`, `pt-verify`,
  `image-cache/silhouette`; plus `hm-scene` (ink boxes + hrefs), `pt-render` (the model picture), `cbn-type` (labels),
  `data/cbn/designs.js` (the built parts) read through the platform. All bundle through the makers' own esbuild plugin
  and pass `lint-browser-safe` (the S6 bundle: 26 files, 291 KB raw). **No module split was needed** (ENGINES-ART §2.2
  assumed one): the lint fires on `require('sharp')`, which now exists only inside `lib/platform/index.js`.
- `hm-verify`: `analyzeRgba` (pure oracle on pixels) · `analyzeScene({png})` (the catalogue) · **`analyzeSvg({svg, graph,
  scale})`** (the maker: the scene's own SVG rasterised, no screenshot). `pt-trace.traceRgba` (pure, after the decode).
  `pt-scene.primeTrace(rel, tr)` (a shipped trace instead of a live one). `build-bundles.js` exports `makerPlugin` and
  runs `main()` only as a script — every maker builds exactly as before (full build + all gates re-run, below).
- Spike `scripts/makers/spikes/s6-picture-engines.js` (`--cases --assets=512|3x --throttle`): bundles the engines, runs
  each in headless Chrome beside the Node path, compares, times at 1× and 6× (≈ a 2019 iPad, S5), records heap deltas.

## Per engine (the full tables are in the report)

| engine | browser path | identity, measured | verdict for the maker |
|---|---|---|---|
| hm-verify | built: `analyzeSvg` | **8 of 9 maze faces: identical issue lists**; declared-corridor mask 99.96–99.99 % equal, what-the-child-sees mask 99.82–99.97 %. Strands (G1-423): the canvas raster shows a 1-px anti-aliasing seam where the crossing's redrawn butt-capped piece abuts the string, outside the declared 18-px crossing footprint → "string broken"; the oracle logic is identical (cross-checked: browser oracle on the screenshot passes, Node oracle on the canvas fails) | live oracle (class B). Scale 1 (the maker's size): 35–215 ms 1×, 23–500 ms 6× (one 2.5 s outlier on the first page). Strands: the mazes maker must either close hairline seams in the strands walk or declare the crossing footprint ≥ 26 + W/2 (a stamp change → new pages only) |
| pt-verify | built | **identical**: miss / outside / skeleton px / laws equal on 8 drawings; the guide rasters (librsvg vs canvas) equal to ≥ 99.999 % | live where a gate needs it; 107–160 ms 1×, 0.65–1.1 s 6× |
| htd-vector | built | laws, fails, guides' share / onInk, erase, missing, bbox **identical** on 4 lessons; the raster masks 99.95 % equal; `full` / `steps` path strings differ (traced from the raster) | offline compile stays (class C); the laws can be re-asserted live |
| cbn-lineart compose | built | NOT identical: ink mask 99.87–99.95 % equal (IoU 0.98–0.99 from the @3x source; 0.92–0.95 from the 512 px set), region counts ±1–6, region paths differ | **precompute** (the shipped `data/cbn/lineart/*.json`); the maker never composes |
| fd-scene | built | `buildLayers` live: region counts ±1, sampler 98 % agree, panels differ. **From the shipped layers: `renderPanel` identical** (two ops sets, colour + line, rings, hotspots), 0.4 ms (3.9 ms 6×); a scene JSON 316–359 KB raw | **precompute layers, compose live** (as designed) |
| pt-trace | built (`traceRgba`) | NOT identical: ink 99.9 % equal (IoU 0.986–0.996 @3x), paths ±1–6, length ±1 %; every browser trace passes the Node laws and the browser laws. **From shipped traces `composeScene` is byte-identical** on 5 face scenes (37–209 ms 1×, 0.2–1.2 s 6×). The store must carry `body` (occlusion mask): 2–17 KB per scene run-length | **precompute the trace store** (ENGINES-ART §7.2) incl. `body` packed |
| silhouette | built | extents **identical** (Δ 0); PNG alpha identical, RGB differs on semi-transparent edge pixels (canvas premultiplication, max Δ 58); 24 × 24 signatures 99.95–99.99 % bits equal, max IoU Δ 0.009 — enough to flip `pickDistinctSilhouettes` on 2 of 18 seeds (0.72 threshold) | **precompute the signatures** (72 bytes per noun) and serve the Node PNGs as assets; never pick live |
| image-cache/derive | not a page engine (makes the 512 px set offline) | — | the browser consumes its output |

**Structural finding:** `scripts/makers/runtime.js makePage()` calls `build()` synchronously; a canvas decode is async, so
no live picture decode can ever sit inside a maker's `build()` — shadow match (K-057), mirror match (K-063) and picture
tracing (K-418) have `async build()` today and need their pixel step moved to data before they can be makers at all.

## Gates run (under the lock, 2026-11-01 11:31–12:50; stopped at the coordinator's request after `slots`)

Full `build-bundles.js` (273 s) then: access-shell, answer-keys (1,388 key pages), click-shell, controls-budget,
edit-shell, exports-shell, keys-shell, **live-gate 19,008 pages 0 failing**, old-landings, **parity 1,728 cases 0
different**, screen-from-marks (1,304 screens), **sha1-parity 114,758 seeds**, **slots: all pass** — every one rc 0.
Not mine, failing on other agents' unfinished work in the tree: `collision` (task 4; 46 B1 pages), `play-shell`
(task 2; the deck preset's theme is null), `saves-shell` (the colleague link now opens `/s/<id>`, task 2),
`screen-geometry` and `settings-space` (task 4; their own findings on B1 templates). themes-shell passed; `thumbs`
exited 127 while I was stopping the loop (not a verdict — re-run); every `tests/*.test.js` passed (incl.
`picture-platform.test.js`, 23 checks). ⚠ The loop's exit trap removed `out/.makers-lock` at 12:38 after I had
already released it by hand at ~12:33 on the coordinator's request — if another agent took the lock in between, that
agent's lock was removed by my trap; its own run was not touched.

## NOT done / for the operator

- The K-405 family `verify(page)` still takes a screenshot (type file, not mine): wire `analyzeSvg` there when the mazes
  maker is built. Strands: choose seam closing vs a wider stamp (above). `pt-render.modelImage` emits the CDN URL in a
  maker — `gates/parity.js`'s normaliser must map Node's base64 data URI to the same token (gate file, not mine).
- Bank loaders still on `fs`: `lib/b7-common`, `b8-common`, `b9-common`, `lib/ptx` (the b3-common pattern) — needed before
  the FD / HTD / maze / tracing makers bundle.
- Real-device numbers (S6 lines 1, 8 on an iPad / Chromebook) still owed; 6× CPU throttle is the proxy.
- The results JSON sits in `out/s6/` (gitignored); the report carries every number. No new strings.

## Traps paid for

- A `--cases` re-run overwrote the results file: cases now merge. `results-512.json` lost one run's rows before that.
- Two ops on one FD item throw by design (the probe's ops list, not the engine). `analyzeSvg` must accept an SVG with a
  size but no viewBox (the test's synthetic page).
- The browser raster default is TRANSPARENT where nothing is drawn (like librsvg); a white paper is an explicit option —
  the maze and compose paths count alpha.
- Edit a repo file with Python only in binary mode (`newline=''`); a `\n` inside a replacement string became a real line
  break twice.
