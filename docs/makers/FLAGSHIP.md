# The six flagship picture makers — programme record

Operator /goal, 2026-11-06 (shortened): Dot to Dot, Color by Number & Code, Coloring Pages, Find the Differences, How to
Draw and Picture Tracing become the flagship of the site: the largest picture library behind them (every black-and-white
library drawing processed for their templates, plus at least 400 new top-quality child-friendly drawings), theme and picture
pickers instead of only "New version", 5 new templates in each of the six, a top-quality colouring alphabet and numbers used
by Coloring Pages and by every other maker where it is meaningful (all 59 analysed, new templates made). Everything works
flawlessly, nothing breaks in the current templates, work stays local until everything is built, then one deploy.

**Read `NEXT` below first when resuming.**

## NEXT

**Fix round 2026-11-10 evening (operator reports: Mystery Grid painted colour NAMES; Dot to Dot apple with stair-stepped edges and a stray mark).** Commit `dca4cc9f5`:
- **Colour bins paint.** A place bin without `data-lcs-fill` writes its label (runtime interactive-runtime-core.js:584). Fills added in flagship-new.js pixel mode and K-241-color-by-code.js legendBanner (covers K-241, K-265..K-269, K-474, K-475, K-513, G1-487). `scripts/makers/screen.js` now errors on any colour bin without a fill: build-bundles had silently made the K-241 family "no screen" with exit 0.
- **Dot to Dot drawings.** `primitives/scene-dot-figure.js`: `heroSplit` draws whole every group that only touches the hero mask (no 4-unit stairs), edge cells round; `dropScraps` removes loose pieces ≤10 units within 16 of the dot path (1,988 in 723 of 4,793 fits). 5,005 paths: pieces whole + clipped = original.
- Full build-bundles 6,635 s, exit 0, "no screen" 0, 0 thumbnails refused. Against live: 59 makers, 1,098 templates, 0 added / removed / language changes / screen changes.
- **Published Dot to Dot decks republished in place** (printable-only, the drawing is only in the PDF). 682 decks found by rebuilding every deck from its wave instance; generated with `cli.js generate --wave waves/wave-d2d-<loc>.json --force` (+ `wave-b2var-<loc>.json --types=…` for 6). Old vs new: manifest and PDF text identical for all; 656 drawings changed, 23 identical (their scraps lay outside the hero clip); control set of 370 unaffected decks pixel-identical. `check-zips-d2d.js` 1,671 / 0 problems. Published: 676 with `--noindex`, 6 landing-backed without; audit clean 676 + 6, `audit-update-injections.js` 0 lost. The 6 are the only landing-backed ones; `repoint-deck-canonical.js --types=dot-to-dot` ×11 restored the landing canonical on all 110 Dot to Dot landing decks (earlier fix waves had left several self-canonical). Server: 956 superseded versions + 682 `.bak` copies pruned (`prune-superseded-versions.js` now reads variant-1 ZIP names, `18745d7f7`), staging removed.
- 4 de K-295 decks now title "— Set N" (the reviewed word, 6e277f557) where their siblings still say "— Satz N" (titles are metadata: not mass-changed).
- **931 landing-backed decks were self-canonical** in 149 language × type groups (telling-time, money, measurement, symmetry, lowercase tracing …), left by earlier in-place fix waves that skipped the re-point. Fixed on the operator's word ("fix it", 2026-11-10): `repoint-deck-canonical.js --types=<t> --locale=<l>` per group, 2,709 files, 5,768 replacements, 0 failed; site-wide 41,823 / 41,824 landing decks now canonical to their landing (the one left is the `thanksgivinng` alias, canonical to its corrected slug); a second pass changes 0. **Every in-place republish of a landing-backed type must end with this re-point.**
- Dot to Dot landing previews: 75 redrawn (7 templates ×11), plus app / og / ribbon ×11; upload after the deploy. The landing catalog stays as committed (rebuilding it would reorder the fr / nl / da showcase).
- **Gate suite on this build: ALL 30 PASS** (gates-parallel, 6 at a time, 239 min): slots all pass (K-498 / K-501 "catalogue 6/6 identical"), settings-space 0 confirmed tells (its first-pass FAIL lines are re-measured at 4× copies; K-445 alone: "not confirmed"), declared-screens 5,392 screens 0 failed, own-input 644 typed-text cases + 35,311 swaps, live-gate 106,932 pages 0 failing, collision 16,292 pages 0, copy-range 314,111 pages 0.
- **Deployed 2026-11-10 22:10 UTC** (08f2302f2; the K-613 edits kept aside so the release was byte-for-byte the gated build): release 28,231 files verified, 59 version folders installed, flagship drawings 435 protected / 0 differ, smoke tests + payment canary pass (the hero-image / sample-thumbnail WARNs are in every earlier deploy log). Dot to Dot previews (220 + app / og / ribbon ×11) uploaded, hashes equal. Live: screen-paint-check 3 / 3 paint (0 / 3 before); live-sub-pickers en 122 templates, 60 with the picture picker, 0 failing (the probe now tries up to four theme tiles: a tile of the group the page already shows rightly changes nothing); audit-live-landing-walls 647 pages / 11,930 cards PASS; audit-launch-coverage images PASS; old landings 363 / 0 findings. Uploads now extract with `tar --no-same-owner` (an earlier upload had left /var/www/lcs-media owned by the Windows uid 197609; restored to lcs-media).
- **Color the Days (K-613) month choice — commit `2200dad56`** (operator 2026-11-10: "make it possible for the teacher to customize the starting date of the month and number of the days"). The teacher picks the real month (January 2026 – December 2029) in the page header, labelled "Month" ×11; the maker opens on the current month; the grid starts on the month's own weekday in the language's week (Sunday-first en / pt / es) and has its own length (Feb 2028 = 29). One level (the old three only chose 28/30/31 days with a random start); one month is one page, so "New version" is hidden (copiesDiffer []). Saved worksheets keep the version they were made with; K-613 is maker-only (0 published decks). Checked: 528 language × month pages against independent date arithmetic, 0 wrong; native + pedagogy reviewer: all 11 OK; in a browser on the final build all 11 label the chooser in their language, open on the current month, offer 48 months, Feb 2028 = 29 days. Full build-bundles (5,929 s): exit 0, 0 refused, 11 thumbnails redrawn (K-613); against the live templates only K-613 differs (26 makers get a new version folder from the shared glyph module, their templates field-for-field identical). Gates (195 min): 28 PASS at once; slots compares with git HEAD, so it failed on K-613 until the commit and then passed 1,093 / 1,093 identical; declared-screens failed one Mazes screen (G1-425 L2 fi copy 2, a maker this build does not change, live version 0708dc4899a7) and passed 150 / 150 on a rerun of Mazes fi — timing under the suite's load. Calendar previews: the 11 K-613 sheets + app / og / ribbon ×11 redrawn (the sample is January 2026); landing-catalog K-613 levels 3 → 1 (count only, catalog not rebuilt). **Deployed 2026-11-11** (3049b684c; log /root/deploy-k613-2026-11-11.log): release 28,231 files verified, 26 version folders installed + 35 already present and identical, flagship drawings 435 protected / 0 differ, registration 59 / 59, smoke tests pass (the same two hero / sample-thumbnail WARNs), payment canary OK. Calendar previews: the 40 changed files uploaded, all 209 equal to the build by sha1. Live (origin, subscriber quota stubbed): K-613 on calendar 9054ffa3e95c in all 11 languages — chooser label, current month, 48 months, Feb 2028 = 29 days with the 1st in the right weekday column, no script errors; maker landings 647 pages / 11,930 cards PASS; coverage images PASS; Coloring Pages pickers 12 templates, 0 failing. Server staging empty; the PC release pack and scratch copies removed.

**DONE AND LIVE 2026-11-10.** Commit `ae867d94e` (256 files, no images), deployed with deploy.sh. Results: 59 makers registered, 7,857 static pages, smoke tests and the payment canary passed. `scripts/ops/upload-flagship-art.sh` installed the 435 drawings, all protected, 0 differing. 13,871 maker previews were uploaded.
- **Live checks:**
  - `audit-launch-coverage.js images`: 647 pages, PASS.
  - `audit-old-landings-live.js`: 363 pages, 0 findings.
  - `scripts/makers/audit-live-landing-walls.js`: 647 landings, 11,930 cards, equal to the catalog.
  - Pickers seen in a real browser on the origin. Cloudflare blocks headless Chrome, so the probe goes through `--host-resolver-rules=MAP www.lessoncraftstudio.com 65.108.5.250 --ignore-certificate-errors`.
- **CBN numbering fix republished in place:** 2,200 noindex decks, 200 per language. Generation used `cli.js generate --wave waves/wave-cbn-<loc>.json --force`, which writes to `scripts/worksheet-gen/out/staging/`. Checks: check-zips-cbn, verify-cbn-solid, and verify-interactive ×11 (200 played, 0 failed each).
  - Mapped to the live slugs by language + title with `scripts/publish-cli/map-cbn-updates-by-title.js`. The live slugs keep their first copy numbers.
  - Published with `publish-wave.js … --noindex --updates-manifest=… --confirm`: 2,200 UPDATE, audit 200/200 clean ×11, `audit-update-injections.js` 0 lost.
  - Live fox printable: 17 numbers, was 13.
- **Server cleaned:**
  - the 2,320 superseded deck versions (`scripts/publish-cli/prune-superseded-versions.js <manifest> --apply`) and their `.bak` copies
  - the cbn upload and its pre-band backup
  - the fix1104–fix1119 uploads
  - the dry-run batch
  - About 9.3 GB freed.
- Open: nothing in this programme. Unrelated: `.publish-cli-staging` holds 5.7 GB of older dry-run extraction folders (`fix11xx-*-dry`, `venn2-*`, measured 2026-11-10). housekeeping.sh never removes them because it only matches `batch-*`.

**2026-11-07: the operator rejected all 435 new drawings (docs/makers/FLAGSHIP-ART-REVIEW.md) and accepted a 12-drawing trial: "good. This is the standard." They are being redrawn to docs/makers/ART-BRIEF.md: one Opus artist agent at a time, batch by batch from docs/makers/art-queue.json (43 batches, 423 drawings), into art-src/drawn/. Every drawing gets the artist's review and then mine beside the library before it is marked done. After the last batch: install, rerun every engine, rebuild, gates, deploy.**

**Redraw status 2026-11-09: ALL 435 ACCEPTED by the operator and locked** (docs/makers/art-accepted.json, art-lock.json; tools/art-guard.js; backed up once, in C:/Users/rkgen/lcs-backups/images/flagship-art since 2026-11-10). Integration: bash scripts/worksheet-gen/tools/fl-integrate.sh (now also rebuilds the K-488..K-492 face pins, build-fd-face-pins.js). Then every check below on the final state, the screen replays with --pool --with-new (the new drawings are left out without it).

**Visual check of every new drawing on every engine: DONE 2026-11-09** (docs/makers/FLAGSHIP-CHECK.md, last section): every refusal is in data/fl/review.js; How to Draw lessons of the new drawings are cut by tools/htd-drawn.js (in fl-integrate.sh). The first full build-bundles (2026-11-09) refused 55 Color by Number thumbnails (font-8 tiny numbers) and all of K-501: fixed (FLAGSHIP-CHECK.md "The full maker build after the install"; K-501's numbers now come from tools/k501-labels.js → data/cbn/k501-labels.json, `git add -f`); the probe build of both makers refuses nothing. NEXT: let the full screen replays finish (declared-screens + screen-from-marks, --pool --with-new), re-run how-to-draw, picture-tracing (K-498, K-501) and color-by-number K-587 / K-588 / G3-479 on the final data and the regenerated pools (flagship/pools.js, 2026-11-09), then build-previews → build-catalog → compile-copy → ONE full build-bundles → run-all-gates.sh → frontend build → commit (git add -f the data/fl/*.js modules; never images) → push → release-pack → deploy → scripts/ops/upload-flagship-art.sh → live verify → republish the 2,200 CBN decks (numbering fix) → clean the server.

**Redraw status 2026-11-07 (later):** 305 of 435 accepted by the operator (docs/makers/art-accepted.json), including six pilot people and animals built on the construction sheet (ART-BRIEF.md), which the operator approved: "The pilot images are also good." One artist agent at a time from batch 40 on. What is left is in docs/makers/art-queue.json.

State (2026-11-07 session 2). Everything is LOCAL and UNCOMMITTED until the last gate is green; nothing is deployed.

Built:
- Library: 435 new drawings in 24 themes (art-src/*.js, tools/fl-art.js); every BW picture processed for the engines:
  tools/fl-batch.js (d2d, htd, cbn), tools/fl-cbn.js, tools/fl-pt.js, tools/fl-fd-scenes.js + fl-fd-build.js (163 scenes), data/fl/pixel-art.js
  (36 hand-drawn mystery grids), tools/fl-slim.js, tools/fl-flip.js, tools/fl-index.js (data/fl/index.json), tools/fl-fd-pins.js.
- Pickers: shell artControl (theme tiles + Choose a picture), lib/fl-art.js, lib/fl-forms.js; wired into K-285 family, K-394, K-396 family,
  K-418 first-tracing + look-then-trace, K-494, K-497, K-498/K-499, K-395 family, K-488..K-492, coloring-page themes.
- Colouring alphabet: lib/color-glyphs.js, data/fl/glyphs.json, tools/fl-glyphs.js. Analysis: docs/makers/COLORING-GLYPHS-ANALYSIS.md.
- New templates: 51 from data/fl/new-templates.js (types/_shared/glyph-tasks.js, flagship-new.js, tools/fl-new-templates.js), K-587, K-588, G3-479
  (lib/cbn-type.js code), G3-480, K-622 (word-search bubble). Strings data/fl/new-strings.js → tools/fl-strings.js; landing cards come from landing/build-catalog.js.
- Hub: unchanged. "Flagship" is a fact about how much these makers matter, not a category on the site: no band, badge, heading or reordering (operator 2026-11-07; a hub band built here was removed before it shipped).

**Landing pages (operator 2026-11-08: "you shouldn't forget to add the new templates to the corresponding worksheet maker landing pages").** The template wall of every maker landing is built from frontend/lib/makers/landing-catalog.json (landing/build-catalog.js), so all 56 new templates appear on their 32 makers' pages with their cards; the six flagship leads carry one new sentence naming the five new templates (frontend/content/maker-landings/src/<loc>.json, 66 sentences; the reviewer's native + teaching check 2026-11-08 fixed 18 (a picture is not "solved", "join the dots" is British, "a model" is not what children draw) plus two clarity changes in every language (two pictures ON ONE PAGE, not "at once"; each child's OWN name page); How to Draw's sentence closes its lead; compile-copy.js keeps every meta description: the first sentence is untouched, and the lead's first two sentences are a fallback candidate). Coloring Pages' meta now says "with answer keys" in 11 languages because Color and Count has a key. After the last drawings are installed and ONE full build-bundles: node scripts/makers/landing/build-previews.js (the 640 px previews were made 2026-11-07, before the fixes) → build-catalog.js → compile-copy.js → gates/landings.js → upload out/maker-previews to /var/www/lcs-media/maker-previews → after deploy, read one flagship landing per language and count its wall cards against the catalog.

To do, in order: fix the reviewer's findings at the source, then run tools/fl-strings.js + extract-type-inventory + landing/build-catalog.js ·
six-maker browser check (tiles, picker, New version, keys, screens) · ONE full build-bundles · run-all-gates.sh · frontend build check · commit explicitly
(git add -f the data/fl/*.js modules; never art renders) · push · release-pack · upload · deploy · live verify · clean the server and $TEMP/fl.

Traps of this session: see memory project_flagship_makers.md. Bash heredocs eat backslashes: write patch scripts with the Write tool. Files are CRLF: patch
through $TEMP/fl/plib.js edit(). data/ is gitignored: git add -f the .js data modules.

## Measured start (2026-11-06)

- Library: 1,325 black-and-white drawings, 50 BW themes, about 800 distinct nouns.
- Picture Tracing: all 1,325 traced (`data/pt/traces`, index 1,302 usable + 23 band X).
- Dot to Dot: 200 scenes. Color by Number: 200 designs, colours by hand. How to Draw: 200 lessons + 203 htdx + 24 vector.
  Find the Differences: about 220 scenes.
- Distinct pictures reachable per template and level (60 copies tried): dot to dot 7-30, color by number scenes 14-47,
  find the differences 3-10 scenes, Coloring Pages themed (a theme strip + tap to swap).
- The tap-to-swap slot system (`lib/slot.js`, shell `openPicker`) already has a picker with theme chips for a multi-theme
  pool (`anyPictures`): the picker work is mainly exposing a pool per template, a panel control, and a per-page theme.

## Design rules for this programme

1. **Additive.** A published page and every saved recipe stay byte-identical: pools are never re-ordered. Copies past the old
   pool, or a teacher's chosen picture or theme, reach the new stores. Gates: parity, sha1-parity, old catalogue copies.
2. **New drawings stay inside the six makers** (and the colouring-glyph templates). They enter `cache/manifest.json` with
   `vocabKey: null`, so word-based makers never see them; their names live in `data/fl/names.json` (11 languages, reviewed).
3. **Every picture is opened by a person on a contact sheet** before it reaches a teacher. Refusals are recorded per engine.
4. Native check + pedagogy check before anything ships (CLAUDE.md rule 2): one reviewer per batch, compact text dump.
5. en = en-US, pt = pt-BR, es = es-MX, always.
