# The six flagship picture makers — programme record

Operator /goal, 2026-11-06 (shortened): Dot to Dot, Color by Number & Code, Coloring Pages, Find the Differences, How to
Draw and Picture Tracing become the flagship of the site: the largest picture library behind them (every black-and-white
library drawing processed for their templates, plus at least 400 new top-quality child-friendly drawings), theme and picture
pickers instead of only "New version", 5 new templates in each of the six, a top-quality colouring alphabet and numbers used
by Coloring Pages and by every other maker where it is meaningful (all 59 analysed, new templates made). Everything works
flawlessly, nothing breaks in the current templates, work stays local until everything is built, then one deploy.

**Read `NEXT` below first when resuming.**

## NEXT

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

**Redraw status 2026-11-09: ALL 435 ACCEPTED by the operator and locked** (docs/makers/art-accepted.json, art-lock.json; tools/art-guard.js; mirrored to lcs-backups/flagship-art and lcs-backups/images). Integration: bash scripts/worksheet-gen/tools/fl-integrate.sh (now also rebuilds the K-488..K-492 face pins, build-fd-face-pins.js). Then every check below on the final state, the screen replays with --pool --with-new (the new drawings are left out without it).

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
