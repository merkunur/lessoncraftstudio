---
name: project-animals-theme-webp-mirror
description: "Grid Match \"pieces change picture on drop\" — an unscaled crop applied to the @3x variant, and the six harnesses that failed to discriminate before a contact sheet did"
metadata: 
  node_type: memory
  type: project
  originSessionId: 22a6e7d0-c74b-474a-83d7-8425a3ae47a2
  modified: 2026-08-03T00:59:11.351Z
---

Fixed 2026-08-03, commit `3e9e4db3` (app fix) after `dacd3ef9` (mirror groundwork). Operator symptom, in their words: **"the images on the crops don't match the images on the grid cells and when they are placed on the cells the image on the crops change into the right image"** — and **"only the animals theme."**

## The real cause
`grid-match` computes `renderScale` and every `cropX/cropWidth` from `imgObj` — the raw **800×800** file. But the canvas bake calls `LCSImageRef.loadCanvasImage()`, which prefers the **@3x lossless variant (1536×1536)** and falls back to the original only on failure. The crop was applied to it **unscaled**: a 267px window on a 1536px image takes ~17% of the picture. Hence hugely zoomed palette tiles, and a clue cell showing a sliver. The reveals draw from `imgObj` directly and were always correct — which is exactly why the picture "changed" on drop.

Fix = `k = img.width / imgObj.naturalWidth` applied to crop x/y/w/h at **both** crop sites (revealed clue cell + palette tiles). `k === 1` when no variant exists, so the 99 unmirrored directories are untouched.

**Animals was the only theme that could hit it** because it is the only one with any @3x present — variants I introduced earlier that day, with Cloudflare still serving 1536px copies of the aliased symlinks from cache. The app was always this fragile; nothing had exercised it. ⚠ So a "harmless" additive asset can activate a latent bug in code that never asked for it.

## ⭐⭐ Six harnesses in a row failed to discriminate
Every one scored the broken theme and the known-good control **the same**, and I reported "fixed" off two of them. What they got wrong:
- palette-crop vs reveal using **my own** rect→backdrop maths — the crop landed off the palette area entirely (a later contact sheet showed that row **blank**). The tell was there earlier: the control scored *worse* than the subject.
- clue-cell identity — wrong cell-index mapping, flagged 3 of 4 in **both** themes.
- assembled-pieces vs source — genuinely correct, but it tests the *reveals*, which were never broken. A passing test of the wrong surface.

**What finally worked: a contact sheet — baked tile above the piece that appears on drop, no score at all.** Control matched on all 9, animals mismatched on all 9. Then `gm-sizes.js` decoded every loaded image and printed `raw 800x800 / VARIANT 1536x1536`, which named the cause outright.

⭐ **When a metric can't separate a known-good control from a known-bad subject, stop tuning it and render the two things side by side.** And **the operator's own screenshots** (worksheet vs answer key, showing piece #5 as an ear where the key said face) carried more diagnostic signal than anything I had built.

## Earlier claims that measurement refuted, each about to drive a change
- "79 themes are missing their mirror" — raw writes `zoo_animals`, mirror writes `zoo animals`. True number: 0.
- "3 URLs serve wrong artwork from Cloudflare" — pixel difference **0.0** (different-animal control 48–70). I compared whether it was the same *picture* and never compared **dimensions** — the dimensions were the whole bug.
- "the mirror is keyed by vocab noun so my filenames are wrong" — the app settled it by what it requests (`<full-stem>@3x.webp`).

## Standing
Gate `scripts/audit-theme-webp-coverage.js` (deploy.sh) — a directory must be uniformly mirrored or uniformly raw; doctrine **CLAUDE.md §A.7.2**. Repair with `generate-theme-webp-variants.js --dir=<dir> --apply` then `--verify`. ⚠ Never alias a missing mirror to another theme's files. The animals variants are parked at `/var/www/lcs-media/image-library-webp/.disabled-variants/`.

⚠ `grep -c "a ? b"` treats `?` as a regex quantifier — that made a correctly-deployed fix report as absent.

See [[feedback-verify-rendered-not-source]].
