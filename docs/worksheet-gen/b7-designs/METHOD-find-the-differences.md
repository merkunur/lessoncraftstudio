# METHOD — Find the Differences (the template for every future expansion)

Operator OBS (2026-10-09): *"document the methods you use for creating these worksheets in detail because they will also serve as templates for future expansions."* This file is that record for `find-the-differences` (K-395 + 10 faces). Sections 1–4 are final (the engines); 5–9 are completed as the batch ships. Every claim here was measured on 2026-10-09 unless marked (build).

## 1 What a page is
Two pictures of the SAME scene; the second carries N crafted differences; the child circles them (paper), or taps them (screen); the answer key is picture 2 with coral rings. N is printed in the title where the face is count-led (3 / 5 / 7 / 10) and IS the number on the page (gated). Every deck of the family ships PDF + screen + answer key (the family is in `INTERACTIVE_PRINTABLE_FAMILIES`).

## 2 Where the pictures come from — and only from
The image library's B&W line drawings (`scripts/worksheet-gen/cache/themes/<dir>/<noun>@3x.webp`), already reviewed as Color by Number scenes (`data/cbn/lineart-scenes.js`: 100 SCENES = a ground line + props + a hero; 100 SECOND = one hero on a themed ground). Nothing is drawn by hand. Colour pages use the crayons the operator reviewed on the Color by Number answer keys (`data/cbn/lineart-colours.js` via `lib/cbn-render.js`).

**To add a scene:** add it to `lineart-scenes.js` (or a new `data/fd/scenes-extra.js` with the same shape: `{id, theme, hy, lines, items:[{src,x,y,h,…}], fixed}`), OPEN every drawing it uses on a contact sheet (`scratchpad/props-sheet.js` pattern: `node … "<dir>/<noun>" …` → PNG → read it), run the builder (§3), read the scene's sheet (§4), record refusals in `data/fd/review.js`.

**To add a prop** (for ADD / SWAP / densifying): open its picture, then add it to `data/fd/props.js PROPS` (`place` sky|ground, `h` in units, `colour` plan largest-part-first, `alt` swap partners of the same kind and size) and to the themes' lists in `THEME_PROPS`. A prop is never added unseen: `tools/fd-build.js` refuses a src missing from PROPS.

## 3 The engine (how a difference is made)
- `lib/fd-scene.js buildLayers(spec)` composes the background (ground lines → sky / ground / pond regions coloured by the scene's fixed points) and EVERY drawing alone (`lib/cbn-lineart.js compose` + `segmentInk`), so each drawing is a layer `{idx, src, bbox, regions[{d, colour}], ink, asym, inkUnits}`. Colours: a drawing standing exactly as in the reviewed Color by Number key inherits each region's crayon by sampling the painted key at the region's deepest point (`cbnSampler`); any other drawing follows its plan (`HERO[id]` / `BG[src]` / `PROPS[src].colour`) by part rank, small pieces taking their big neighbour's crayon, pieces under 3 units white.
- A difference is ONE op on ONE layer (`applyOps`): `remove` · `add{layer}` · `swap{layer}` (same kind, same place, same size) · `mirror` (about the drawing's own centre; refused when the silhouette's mirror IoU shows `asym < 0.12` — a sun or a cloud mirrored reads as the same drawing) · `move{dx}` · `scale{s}` (about the bottom-centre; 1.22 / 0.8 hero, 1.35 / 0.72 prop) · `detail{layer}` (one INNER part's outline erased so it merges with its neighbour: a window pane, a spot — never a part that touches the paper) · `colour{region, colour}` (one part to a contrasting crayon; colour pages only). Layers are drawn back to front with opaque fills, so a moved hero occludes what is behind it exactly as the composed scene did.
- `tools/fd-build.js` writes `data/fd/<id>.json` (not committed; rebuilds byte-identically) with every CANDIDATE op that passed the **raster gate**: left and right rendered by sharp at 1 px per unit, subtracted, the changed pixels dilated by 5 and counted as components — `remove / add / swap / detail / colour` must be exactly ONE component with min side ≥ 16 units and area ≥ 260 units²; `mirror / move / scale` may be several components (the whole drawing moved) but the drawing's new place must stay inside the frame and must not overlap another drawing it did not already touch; every change box inset ≥ 8 from the frame. Each candidate records `bbox` (the drawing's place in picture 2), `diff` (the change box), `area`, `mode` (`any` | `colour`).
- `--rich` writes `<id>-rich.json`: the scene densified with up to 9 theme props at free spots (sky and ground alternating, placed BEFORE the hero so the hero stays in front; colours inherited only for the reviewed drawings; a scene that cannot take 3 extras gets no rich copy). Measured: a reviewed 4–5-drawing scene separates 3–4 rings; densified scenes (9–10 drawings) carry 5 and 7; ten needs ≥ 12 drawings or the stacked layout (px/unit 1.1) — (build) records what the 10-face finally used.
- `lib/fd-compose.js pickOps(scene, cfg, rng)` picks a page: one op per drawing; no kind more than a third of the page; rings (the change box inflated by 10 units) separated by ≥ `minSepPx` (24 printed px); far moves (change box > 1.8 × the drawing) excluded; spread over the quadrants (n ≥ 4 → ≥ 3 quadrants; n ≤ 3 → all different); `needColour` for the colour face; up to 60 shuffled restarts, then a REFUSAL (the face takes the next scene). Hotspots = the rings (`data-lcs-fd-diff`) + a decoy on every unchanged drawing.
- `lib/fd-browser-diff.js browserDiff(opts)` runs INSIDE the rendered page (`verify()`): both panel SVGs are drawn on canvases at the printed scale (hotspots and rings stripped), subtracted, dilated 3 px, counted; every visible change must sit inside exactly one difference hotspot, every difference hotspot must hold a change, no decoy may touch a change, hotspots ≥ 24 px apart. Poisoned 2026-10-09: a stamp removed, an undeclared change, a stamp without a change — each caught; the correct page passes.

## 4 The human read (never skipped)
`node tools/fd-sheets.js [--only=…] [--mode=colour]` → `%TEMP%\spl\fd-sheets\<mode>\<id>.png`: the base scene, then every candidate's right-hand panel with its ring, captioned with the kind and the measured area. Read at least the scenes a face will pin, in BOTH modes, and the rich copies. Refuse a scene or a candidate in `data/fd/review.js` when the change reads wrong to a six-year-old (a bird in the pond, a prop in the sky's wrong band, a scene whose extras look dumped). The read of 2026-10-09 (farm-cow, garden-cat, pond-duck, forest-fox, garden-bird, winter-snowman, sea-fish, town-bus, farm-cow-rich): colours match the reviewed keys; refused classes found and fixed at the ENGINE: mirrored near-symmetric props (now `asym`), a hero jumping its own width (now excluded), a detail op opening a part to the paper (now inner parts only), the colour op wiped by a second op on the same drawing (now one op per drawing).

## 5 The eleven faces (build)
(the final `K-395-find-the-differences.md` §3 is the contract; this section records what shipped per face: n, mode, kinds, scene ids per locale, px/unit, refusals)

## 6 Native text (build)
(what the panels author: titles ×11 (count-led heads per `_PANEL-FINDINGS.md`), instructions, the tap instruction, the F6 word-bank nouns (vocab words checked against each picture), the F10 sentence frames; the validator rules)

## 7 Gates run before publish (build)
`qa/verify-b7-find-the-differences.js` (+ poisons) · `verify-interactive.js` on every ZIP (+ `--poison`) · the pooled ring-position tell · `seo-landing/gate.js` · `verify-hub-type-rows.js`

## 8 SEO (build)
(titles/metas per locale from the harvested heads; the landing audit; IndexNow; what was measured after 90 days)

## 9 Traps paid for (running list)
- A Bash heredoc collapses `\b` inside a JS string (use the Edit tool or `String.raw`).
- `makeRng` takes a STRING seed.
- A densified scene must carry `base: <id>` so only identical drawings inherit the reviewed colours — an added prop sampled at its own place would be painted sky-blue.
- A pixel-diff gate passes a mirrored sun (its rays move); the honest test is the silhouette's asymmetry.
- Reviewed scenes hold 4–5 drawings: 5 separated rings already need a densified scene.
