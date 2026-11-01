# Spike S6 — the picture engines in the browser

Run 2026-11-01 on the operator PC (12th Gen i9-12900, Windows 11), Node 22.19 + sharp 0.34.5 (libvips 8.17, librsvg 2.61) against headless Chrome (Puppeteer). Script: `node scripts/makers/spikes/s6-picture-engines.js [--cases=hm,pt,htd,cbn,fd,sil] [--assets=512|3x] [--throttle=6]`. Design: ARCHITECTURE §17.3–17.4, ENGINES-ART §2.1–2.2 and §11; handoff task 5 (`docs/makers/handoff/05-picture-engines-browser.md`).

**What was built first.** Every engine that imported `sharp` (`lib/cbn-lineart`, `fd-scene`, `hm-verify`, `htd-vector`, `pt-trace`, `pt-verify`, `image-cache/silhouette` — the measured list, `grep require('sharp')`; `image-cache/derive` is an offline tool, not a page engine) now does its pixel work through `lib/platform` (`picture.*`): in Node the engines' own chains, moved verbatim; in the browser the same contracts on a canvas. **The Node paths are unchanged**: 56 hashes over live pages, oracles and offline derivations are equal before and after (`scripts/makers/spikes/s6-node-identity.js`), and `scripts/makers/tests/picture-platform.test.js` proves each platform contract byte for byte against the raw `sharp` chain it replaced (23 checks, poisoned). The engines bundle through the makers' own esbuild plugin and pass `lint-browser-safe` (engines alone: 26 files, 291 KB raw; with `pt-scene` + the face scenes: 35 files, 546 KB raw).

**How it was measured.** The same inputs go through the Node path and, in a page served from the bundle, through the browser path; outputs are compared (issue lists, laws, masks as the share of equal pixels and the IoU of the set pixels, SVG / path strings byte for byte). Browser calls are timed with `performance.now()` at CPU throttle 1× (this PC) and **6× (read as a 2019 iPad, the S5 convention)**; heap Δ = `performance.memory.usedJSHeapSize` after − before (gc before), retained = after a gc at the end. `--assets=512` serves the published 512 px drawings (what a maker gets); `--assets=3x` serves the 1536 px sources Node reads, to separate the resampler from the picture. **A canvas and librsvg never rasterise identically at anti-aliased edges, and a canvas never resizes like libvips (lanczos3) — identity was measured, never assumed.**

## hm-verify — the maze oracle (browser: `analyzeSvg`, the scene SVG rasterised with its pictures inlined; Node: the screenshot). Assets 512 (the page's own hrefs).

| page | face | identical issues | declared mask equal | seen mask equal | Node (screenshot + sharp) ms | browser ms 1× / 6× at scale 2 | browser ms 1× / 6× at scale 1 | heap Δ MB |
|---|---|---|---|---|---|---|---|---|
| K-405 en | tree | yes | 99.97 % | 99.94 % | 541 | 1181 / 4588 | 215 / 2522 | 41.3 |
| K-405 de | tree | yes | 99.97 % | 99.95 % | 581 | 1016 / 2909 | 186 / 500 | 39.6 |
| K-406 en | tree | yes | 99.99 % | 99.96 % | 331 | 875 / 1096 | 174 / 180 | 22.6 |
| K-408 nl | tree | yes | 99.97 % | 99.92 % | 371 | 1001 / 1660 | 98 / 452 | 20.4 |
| G1-420 en | tree | yes | 99.96 % | 99.92 % | 415 | 1520 / 1681 | 165 / 223 | 20.8 |
| G1-422 fr | looped | yes | 99.99 % | 99.97 % | 233 | 734 / 509 | 37 / 133 | 19.8 |
| G1-423 en | strands | **NO**: "string 3 / 4 is broken on the page" (scale 1: strings 1, 3, 4) | 99.97 % | 99.92 % | 619 | 1581 / 1600 | 130 / 236 | 20.3 |
| G1-426 sv | hex | yes | — (no corridors) | 99.89 % | 136 | 118 / 111 | 35 / 23 | 15.6 |
| G2-393 de | looped | yes | 99.98 % | 99.82 % | 337 | 688 / 628 | 44 / 162 | 21.2 |

Scale 2 = the catalogue's screenshot size (1350 × 1432 px, 1.9 Mpx); scale 1 = the page's CSS size, what a maker would judge (ENGINES-ART §8.2). The first throttled scale-1 run (2.5 s) includes the one-time fetch + inlining of the page's pictures; the same page's second run is 0.5 s. The oracle logic is identical in both hosts — the strands page was cross-checked both ways: the browser oracle on the **screenshot** pixels passes, the Node oracle on the **canvas** pixels reports the broken strings. The cause is the raster: at a crossing the upper string's local piece is redrawn with `stroke-linecap="butt"` (`lib/hm-scene.js composeStrands`); where its end abuts the string's own stroke the canvas raster leaves a 1-px anti-aliasing seam of non-ink colour (conflation of two half-covered edges), 20–26 scene px from the crossing centre — outside the declared crossing footprint (`stand` radius W + 8 = 18) — so the per-string flood stops there. The page screenshot happens to have no seam at that pixel. A pass that depends on that pixel is not a robust pass in Node either. Two honest fixes, neither applied here: close hairline seams (dilate 1 / erode 1) in the strands walk of `analyzeRgba`, or declare the crossing footprint ≥ 26 + W/2 in the stamp (a page byte change → maker pages only, never the catalogue).

**Verdict:** live (class B). Identical verdicts on every non-strands face; masks ≥ 99.9 % equal; 35–215 ms at scale 1 on this PC, 23–500 ms at 6× (pictures cached).

## pt-verify — the tracing laws a / b (browser raster of the guide vs librsvg). Assets 3x (the traces themselves are Node's; only the raster differs).

| drawing | miss N / B | outside N / B | skeleton px N / B | laws N / B | guide-raster masks equal (miss / outside) | browser ms 1× / 6× |
|---|---|---|---|---|---|---|
| animals bw/giraffe | 0.002 / 0.002 | 0 / 0 | 8281 / 8281 | [] / [] | 100.00 % / 100.00 % | 136 / 942 |
| beach bw/sun | 0 / 0 | 0 / 0 | 2052 / 2052 | [] / [] | 100.00 % / 100.00 % | 94 / 607 |
| farm bw/barn | 0.003 / 0.003 | 0 / 0 | 11627 / 11627 | [] / [] | 100.00 % / 100.00 % | 121 / 826 |
| nature bw/tree | 0.002 / 0.002 | 0 / 0 | 3361 / 3361 | [] / [] | 100.00 % / 100.00 % | 97 / 635 |
| animals bw/whale | 0 / 0 | 0 / 0 | 3113 / 3113 | [] / [] | 100.00 % / 100.00 % | 96 / 589 |
| beach bw/starfish | 0.013 / 0.013 | 0 / 0 | 5359 / 5359 | [] / [] | 100.00 % / 100.00 % | 107 / 676 |
| animals bw 2/cat | 0.002 / 0.002 | 0 / 0 | 7706 / 7706 | [] / [] | 100.00 % / 100.00 % | 111 / 705 |
| farm bw/duck | 0.002 / 0.002 | 0 / 0 | 5293 / 5293 | [] / [] | 100.00 % / 100.00 % | 106 / 681 |

**Verdict:** identical (the miss / outside masks equal to ≥ 99.999 %, every number and law equal). Live where a gate wants it: ~0.1 s on this PC, 0.6–0.95 s at 6×.

## pt-trace — the tracer from a canvas decode. Assets 3x; the 512 px set below.

| drawing | stroke w N / B | paths N / B | blobs N / B | length N / B | ink mask equal / IoU | browser laws | Node laws on the browser trace | Node ms | browser ms 1× / 6× | heap Δ / retained MB |
|---|---|---|---|---|---|---|---|---|---|---|
| animals bw/giraffe | 8 / 8 | 93 / 87 | 4 / 5 | 7491 / 7509 | 99.93 % / 0.992 | [] | [] | 304 | 208 / 935 | 25.9 / 11.9 |
| beach bw/sun | 16.7 / 16.7 | 13 / 13 | 0 / 0 | 1921 / 1925 | 99.98 % / 0.997 | [] | [] | 243 | 245 / 744 | 37.6 / 28.5 |
| farm bw/barn | 6 / 6 | 143 / 139 | 4 / 2 | 10891 / 10999 | 99.89 % / 0.990 | [] | [] | 296 | 225 / 908 | 24.8 / 16 |
| nature bw/tree | 13.3 / 13.3 | 16 / 18 | 0 / 0 | 3223 / 3217 | 99.95 % / 0.993 | [] | [] | 210 | 200 / 656 | 36.3 / 28.1 |
| animals bw/whale | 16 / 16 | 14 / 13 | 0 / 0 | 3034 / 3026 | 99.97 % / 0.996 | [] | [] | 152 | 182 / 703 | 43.2 / 28.6 |
| beach bw/starfish | 8 / 8 | 69 / 70 | 0 / 0 | 5340 / 5369 | 99.88 % / 0.986 | [] | [] | 206 | 225 / 923 | 41.1 / 25.6 |
| animals bw 2/cat | 8 / 8 | 81 / 83 | 4 / 5 | 7075 / 7067 | 99.92 % / 0.991 | [] | [] | 152 | 154 / 805 | 22.3 / 15.3 |
| farm bw/duck | 13.3 / 13.3 | 39 / 43 | 2 / 2 | 4691 / 4677 | 99.95 % / 0.995 | [] | [] | 274 | 153 / 1012 | 80.4 / 12.8 |

From the 512 px set (what a maker is served): ink masks 99.59–99.92 % equal (IoU 0.965–0.988), paths 93 / 89 · 13 / 13 · 143 / 132 · 16 / 18 · 14 / 14 · 69 / 69 · 81 / 80 · 39 / 39, every browser trace still passing both the browser laws and the Node laws.

**Verdict:** NOT identical — the stroke width, the laws and the ink agree, but the ink mask differs at edges (a canvas resample is not lanczos3, and the published copy is a lossy 512 px re-encode), so a few paths join or split differently and the page SVG would not be Node's. **Precompute the trace store** (ENGINES-ART §7.2). Measured on the composer side:

| scene (mode) | pictures | shipped trace JSON KB (raw) | `body` run-length KB | SVG identical from shipped traces | Node ms (traces live) | browser ms 1× / 6× |
|---|---|---|---|---|---|---|
| first-tracing | 1 | 26 | 2 | yes | 115 | 37 / 216 |
| look-then-trace | 2 | 83 | 7 | yes | 474 | 79 / 485 |
| trace-and-color | 6 | 160 | 16 | yes | 655 | 209 / 1205 |
| trace-and-count | 4 | 176 | 12 | yes | 498 | 162 / 814 |
| finish-the-picture | 6 | 212 | 17 | yes | 663 | 185 / 1122 |

`pt-scene.composeScene` fed Node's traces through the new `primeTrace()` gives **Node's SVG byte for byte** (the model picture's href normalised: base64 in Node, the CDN URL in a maker — the parity gate's normaliser needs that pair). The composer also reads `tr.body` (the drawing's occlusion mask, W × H): the store must carry it, run-length packed (2–17 KB per scene); the raw JSON above is before any rounding or gzip.

## htd-vector — the dotted-shape lessons' four laws (offline compile; the browser can re-assert the laws)

| drawing | fails identical | guides share / onInk identical | erase + missing identical | total ink px N / B | bbox identical | step shares N vs B | full / steps path identical | final mask equal / IoU | Node ms | browser ms 1× / 6× | heap Δ MB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| cat | yes [] | yes | yes | 52623 / 52572 | yes | [0.376,0.274,0.244,0.106] vs [0.377,0.273,0.244,0.106] | no / no | 99.96 % / 0.991 | 936 | 765 / 5048 | 62.2 |
| dog | yes [] | yes | yes | 58933 / 58918 | yes | [0.337,0.238,0.34,0.084] vs [0.338,0.239,0.34,0.084] | no / no | 99.95 % / 0.988 | 804 | 737 / 5592 | 60.3 |
| mushroom | yes [] | yes | yes | 49035 / 49077 | yes | [0.517,0.223,0.098,0.163] vs [0.518,0.223,0.097,0.162] | no / no | 99.94 % / 0.985 | 813 | 584 / 5060 | 78.5 |
| bee | yes [] | yes | yes | 66494 / 66509 | yes | [0.278,0.241,0.412,0.069] vs [0.28,0.24,0.411,0.069] | no / no | 99.95 % / 0.990 | 696 | 612 / 5856 | 55.3 |

**Verdict:** the laws, their numbers and the verdicts are identical; the compiled `full` / `steps` paths are traced from the raster and differ by edge pixels. Compile stays offline (class C, as designed); 5–6 s at 6× is nothing a teacher waits for.

## cbn-lineart — compose + segment (the library drawing trimmed, resized and flipped by a canvas). Assets 3x; the 512 px set below.

| design | kind | ink mask equal / IoU | owner equal | regions N / B | big regions N / B | identical region paths | Node ms | browser ms 1× (compose alone) / 6× | heap Δ / retained MB |
|---|---|---|---|---|---|---|---|---|---|
| cat | picture | 99.87 % / 0.978 | 99.97 % | 170 / 164 | 20 / 20 | 2 of 170 | 2186 | 633 (246) / 3889 | 80 / 67.7 |
| farm-sheep | scene | 99.95 % / 0.994 | 99.99 % | 223 / 222 | 22 / 22 | 9 of 223 | 1707 | 583 (148) / 3610 | 76.8 / 67.2 |
| airplane | picture | 99.95 % / 0.991 | 99.99 % | 149 / 152 | 23 / 23 | 3 of 149 | 1841 | 620 (205) / 4884 | 92.5 / 81.2 |
| pond-duck | scene | 99.95 % / 0.988 | 99.99 % | 87 / 84 | 8 / 8 | 8 of 87 | 1730 | 615 (205) / 3546 | 80.1 / 71.1 |

From the 512 px set: ink 99.47–99.77 % equal, IoU 0.92–0.95, regions 170 / 169 · 223 / 228 · 149 / 152 · 87 / 81. (Node's compose also re-encodes the trimmed drawing as a lossy WebP between its two sharp steps — unreproducible anywhere else.)

**Verdict:** NOT identical — the big parts agree, the small ones (orphan slivers, hairline cells) do not, and a region's path is almost never Node's. **Precompute** (`data/cbn/lineart/<id>.json`, already the published data); a maker never composes. The browser compose itself runs (0.15–0.25 s, 1.1 MB of masks) — usable only for a future own-drawing feature that is gated on its own output.

## fd-scene — layers, the Color-by-Number sampler, the panels. Assets 3x.

| scene | layers: regions N / B (colours equal by index) | sampler agree | asym | from SHIPPED layers: panels identical | shipped scene KB (raw) | renderPanel browser ms 1× / 6× | live buildLayers browser ms 1× / 6× | heap Δ MB |
|---|---|---|---|---|---|---|---|---|
| farm-cow | sun 1 / 1 (1), cloud 1 / 1 (1), barn 162 / 161 (128), cow 75 / 74 (61) | 234/239 | within 0.002 | **yes** | 359 | 0.4 / 3.9 | 1773 / 12319 | 110 |
| farm-goat | sun 1 / 1 (1), cloud 1 / 1 (1), barn 162 / 161 (128), goat 51 / 52 (51) | 209/215 | within 0.002 | **yes** | 316 | 0.3 / 3.9 | 1660 / 11626 | 96 |

**Verdict:** `buildLayers` live is NOT identical (it is compose, above: a region more or less per drawing, the sampler reading a CBN colour raster disagrees at 5 of 239 part points on edges). **From the shipped layers, `applyOps` + `renderPanel` are byte-identical** (remove / mirror / move / colour ops, line and colour modes, rings with halo and index, hotspots) in under a millisecond — the maker path ENGINES-ART §3.2 designed. `fd-browser-diff` was already in-page.

## silhouette (shadow match / mirror match / measurement extents). Assets 3x; 512 below.

| theme | nouns | 24 × 24 mask bits equal | max IoU Δ (any pair) | `pickDistinctSilhouettes` identical (6 seeds) | max extent Δ | silhouette PNG: alpha identical / RGB identical / max channel Δ | browser ms 1× / 6× (14 masks + 6 extents + 6 picks + 1 PNG) |
|---|---|---|---|---|---|---|---|
| animals | 14 | 99.99 % | 0.003 | 6/6 | 0 | 100.00 % / 35.13 % / 58 | 487 / 183 |
| fruits | 14 | 99.95 % | 0.006 | 6/6 | 0 | 100.00 % / 55.23 % / 58 | 524 / 193 |
| toys | 14 | 99.95 % | 0.009 | 4/6 | 0 | 100.00 % / 15.38 % / 58 | 571 / 184 |

From the 512 px set: picks 6/6 · 5/6 · 3/6, bits 98.9–99.1 %, max IoU Δ 0.018–0.037.

**Verdict:** the art extents are **identical** (Δ 0 — the alpha > 8 box is sharp's trim box; `artExtentSync` already reads `data/art-extents.json`); the silhouette's alpha is identical and its RGB differs on semi-transparent edge pixels (a canvas premultiplies: invisible, not byte-identical); the 24 × 24 signatures differ by a few bits, enough to move a pair's IoU across the 0.72 threshold and change the **page content** (which nouns are paired) on 2 of 18 seeds — so the signatures must be **precomputed** (72 bytes per noun, ≈ 200 KB for the library, sliced per theme) and the silhouette PNGs served as assets from Node's `cache/silhouettes/`. Never pick live.

## image-cache/derive

Not a page engine: it makes the 512 px set the browser consumes. No browser path; nothing to measure.

## Findings that change the design

1. **No module split was needed** (ENGINES-ART §2.2 planned one per engine): the lint fires on `require('sharp')`, which now lives only in `lib/platform/index.js`. The engines bundle as they are.
2. **A maker's `build()` is synchronous** (`scripts/makers/runtime.js makePage`); every canvas decode is asynchronous. Shadow match, mirror match and picture tracing have `async build()` today — whatever the pixel step produces (signatures, traces, silhouette hrefs) has to be data before any of them can be a maker. This is structural, not a performance line.
3. The trace store must carry `body` (occlusion) beside the paths; the FD store is 316–359 KB raw per scene before the §2.3 rounding; the model picture's href differs by host and needs the parity normaliser.
4. The strands oracle (above) — a seam, not a logic difference.

## What is still owed

Real devices (S6 lines 1 and 8: a 2019 iPad and a Chromebook; 6× throttle is the proxy, and Safari's canvas was not measured). The K-405 family's `verify` still screenshots (type file): `analyzeSvg` is ready for it.
