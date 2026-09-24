---
name: project-interactive-storybooks
description: "The interactive-storybook program — foundation SHIPPED (PixiJS player, SBModules contract, sb-1 schema, SEP bridge, Pip's Picnic slice); how to build story"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4ad50326-72ac-40c5-a7e5-078c030b7b92
---

# Interactive storybooks — foundation `17962da7`; library `c76a4445`; STUDIO `c62bb9ac`; SEP EXPORT `ab2e439f` (all 2026-07-02)

## Commission Phase 2 — EVERY generator app feeds storybooks + total verification (IN PROGRESS 2026-07-02, multi-session)
**Approved plan (10 phases): `C:\Users\rkgen\.claude\plans\commission-interactive-eventual-tome.md`. Ground-truth ledger: `docs/storybook/app-coverage-matrix.json`.** Operator locked: run autonomous, commit each phase, DEPLOY + report ONLY at the very end; build all automatable + hand off the 2 human gates (Studio 20-30min acceptance walkthrough + human-composed E2E).
- **Verified ground truth (4 recon agents):** 29 interactive + 4 printable (coloring/writing/draw-and-color/drawing-lines). SEP families A/C/E/F exist; **B (wordsearch/picture-path/treasure-hunt) + D (chart-count) must be BUILT** (mapper in `catalog-export.js:2262` + player branch `sb-mod-worksheet-exercise.js:839` + validator whitelist `validate-story.js:241`; design proven, both miniaturize [realPx≈182/N ≥16px gate]; treasure-hunt 5×5 + chart-count 5×6 locked-small = feature). **The descriptor (not deck runtime) is the contract; each mapper reads the app's `extractDeckBundle()`.** QA is family-agnostic (free once player branch has check+autoSolve). Only the 4 reps had hooks.
- **DECISIONS (locked):** number-fill apps = **family "A" + digit-palette mapper branch** (0 player/validator change). choice-tap apps = **family "C" + choice branch** (options→targets). Per app = **3 ADDITIVE edits**: adapter IIFE (`window.__sepGenerate`/`__sepExport`) + emit-only extractDeckBundle fields + floor-lowering via spec-only `__sbAllowSmall` bypass (NEVER change UI defaults). Standing suite = `baseline-sep.js`(golden day-job-unchanged) + `prove-app-sep.js`(per-app PASS, generalize `prove-sep-export.js`) + `run-all-sep.js`(runner)+`test:storybook`.
- **🔑 CRUX PATTERN CRACKED (the headless-generation unlock for image-heavy apps):** `__sepGenerate` must (a) be DEFINED EARLY (before any hanging init await — matching's hooks sat after `await loadThemes()` which hangs headless; moved the hook to just after the canvas assign inside `init()`), and (b) **DIRECT-SEED, not call the UI-init `generateInitialWorksheet`** (whose `checkThemes` waits on a content theme dropdown never populated headless) — instead: set `window.currentLocale`, fetch `/api/images?theme=&locale=` into the app's pool var, seed the selection + set the mode/theme inputs, seed `Math.random=_sepRng(seed)`, call the CORE `generateWorksheet()` (fire, poll canvas for marker objects), restore Math.random. word-guess/grid-match already did this; find-and-count + matching now do too.
- **✅ PHASE 0 COMPLETE (commits `d1078528`, `daf82159`, `[FIX]`, `a16658ca`; NOT deployed).** All 4 reps (word-guess A / grid-match F / matching E / find-and-count C) **PASS the standing suite** end-to-end (generate headless → place → validate 0 err → qa autoSolve 0 fail → seed-repro → 2-locale; baselines clean). `run-all-sep --only <4 reps>` = 4/4 GREEN.
  - **Suite (`scripts/storybook/`):** `prove-app-sep.js` (per-app PASS) · `run-all-sep.js` (runner, exit=fails, `--only`/`--phase`) · `baseline-sep.js` (golden `--capture`/`--check`) · `baselines/*.json` (4) · `recipe/sep-adapter.template.js`. npm `test:storybook` + `:baseline`. Doc `docs/storybook/sep-rollout-recipe.md`.
  - **5 BUGS FIXED (thorough):** (1) E-mapper anchor jitter → derive from STABLE rect inner-edge; (2) matching reliability → 3× retry gated on `problemsData`, re-seed each attempt; (3) headless isolation → `?__sbHeadless=1` skips the concurrent init tail (no shared-`Math.random` perturbation); (4) font-metric jitter → force-load Google fonts before generating; (5) find-and-count density → `tapOnly` SEP-C (drop tiny count-blanks) + `__sbAllowSmall` 3×3 bypass. `sep-generate.js` loads apps `?__sbHeadless=1`.
- **✅ PHASE 1 COMPLETE** (`e1e0a766` word-scramble, `bc547980` missing-pieces, `9c9a2abc` cryptogram; SEP-A 'grid' broaden `bd9fb3f3`). **7 apps now PASS** the standing suite: word-guess/word-scramble/cryptogram(A) + grid-match/missing-pieces(F) + matching(E) + find-and-count(C). pattern-worksheet→P4, prepositions→P3 (reclassified off letter-fill). cryptogram (the flagged matching-class-hard app) landed in ONE pass — the recipe + patterns (early-in-init hook, ?__sbHeadless isolation, direct-seed, re-seeded retry, /api/themes-translated stub) are now robust. **▶ NEXT = PHASE 2 (number-fill):** build the SEP-A DIGIT-PALETTE mapper branch ONCE (catalog-export.js A mapper — numeric slots → digit palette; 0 player/validator change per the locked decision), then wire addition/subtraction/math-worksheet/code-addition/math-puzzle (code-addition + math-puzzle also need the __sbAllowSmall floor bypass). Each math app's extractDeckBundle likely emits numeric-answer slots — verify slotType + expected shape per app. 🔑 **KEY LEARNING: bundle SHAPES vary per app — the "Edits 1+2 only" was optimistic; each app needs a per-app bundle-shape assessment vs its family mapper, and often an Edit-2 emission or a mapper broadening.** Scoped so far:
  - **cryptogram(A):** ✅ SEP-A mapper BROADENED to accept slots{slotType:'grid'} (`bd9fb3f3`, verified non-regressive). REMAINING (matching-class headless): __sepGenerate = short localized word as phrasesInput.value + themeSelect='alphabet'+renderDictionary+autoAssignImages()+handleGenerate()+poll problemsData, hook placed early-in-init w/ ?__sbHeadless isolation (init auto-generates + polls themes). Alphabet theme must serve headless.
  - **missing-pieces(F):** NEEDS Edit-2 — extractDeckBundle (~:3388) doesn't emit gridCells/paletteTiles/solutionLabels; emit them from its gap/option/solution state.
  - **pattern-worksheet / prepositions:** still need the A-vs-C determination (read their extractDeckBundle).
  - **▶ PHASE 2 (number-fill) IN PROGRESS — digit branch PROVEN, addition+subtraction DONE.** ✅ addition (`13f96314`) + subtraction (`80e247a7`) PASS (Family A digit; Edit-2 maps problems→slots{slotType:'symbol'} from the app's already-computed inputRect + operands; hook forces exerciseMode='image-number' + small operands for single-digit answers + fetch theme imgs + retry). 9 apps now pass total. REMAINING P2: code-addition, math-puzzle (both + __sbAllowSmall floor bypass; check if they share the inputRect helpers or need geometry), math-worksheet (emits slots{symbol} but default config gave 0 answer boxes — needs image operands / a worksheet type). Groundwork below still valid:
  - **(historical) GROUNDWORK (`4e17ba97`):** SEP-A DIGIT branch built (catalog-export.js A mapper: filter += slotType 'symbol'/kind 'number'; isNumeric→digit palette 0-9+'-'; ctx.numeric threaded; 0 player/validator change) + VERIFIED non-regressive (word-guess/word-scramble/cryptogram baselines clean). 2-locale check robustified (text: expected OR visual differs). **BUT no math app passes yet:** addition/subtraction emit NO slots → need Edit-2 (emit slots{slotType:'symbol',kind:'number',expected:digit,rect} from answer-box canvas objects + set maxOperand=4 → single-digit sums); math-worksheet emits slots{symbol} but default headless config gave 0 answer boxes (render branch :3846 not reached — likely needs image operands in selectedImagesPool OR a worksheet type; hook drafted+reverted pending config); code-addition/math-puzzle unassessed (+ __sbAllowSmall floor bypass). **NEXT: get ONE math app passing to prove the digit branch end-to-end (addition Edit-2 is the cleanest path), then the rest.** Reference numeric-slot shape: math-worksheet.html:3846/4399.
  - **HOW TO RESUME each app:** read its extractDeckBundle shape → if it matches the family mapper (like word-scramble), just add the adapter hook; else add Edit-2 to emit the mapper's fields (or broaden the mapper, as cryptogram). Then prove-app-sep --app=<x> + baseline --capture + matrix passing + commit. Reference: word-guess/word-scramble (clean A), find-and-count (image+density+tapOnly), matching (init-isolation+fonts+retry).
  - Original resume detail (unchanged): **Per app:** add the adapter hook per `docs/storybook/sep-rollout-recipe.md` (+ `recipe/sep-adapter.template.js`) — canvas var + extractDeckBundle + answer-predicate + family; direct-seed + force-fonts + retry; place EARLY-in-init if the init hangs → `node scripts/storybook/prove-app-sep.js --app=<x>` PASS → add its `APP_PARAMS` to prove-app-sep.js + baseline-sep.js → `baseline-sep.js --capture --app=<x>` → matrix status=passing → commit. Reference: word-guess(letter)/find-and-count(image+density)/matching(init-isolation). Then Phase 2 number-fill (A digit), 3 choice-tap (C branch), 4 remaining families, 5 new B/D, 6 locked sudoku/treasure-hunt, 7 Studio tests+walkthrough, 8 E2E, 9 deploy (§14.6 two-step + catalog-export.js ?v bump)+evidence. word-guess `?v=31`/grid-match `31`/matching `33`/find-and-count `31`.

## Commission 5 — B-programmatic SEP pipeline + the AUTHORING ENGINE (C) — SHIPPED + DEPLOYED + VERIFIED 2026-07-02
Six commits `37eadcd4`(B) `11eaa6c5`(pre-school) `d807d441`(C1) `b0b20056`(C2) `5fa93f02`(C3+C4) `d77b8a4b`(C5), pushed on `pivot/printable-business-toolkit` (…ab2e439f→d77b8a4b). **DEPLOYED (operator said go):** `deploy.sh` (frontend PK routes live; the IndexNow module-not-found at the end is a pre-existing unrelated missing optional script — build succeeded) + §14.6 two-step synced the 5 served files (`catalog-export.js` + word-guess/grid-match/matching/find-and-count). **KNOWN LIVE BUG FIXED:** served `catalog-export.js` helper refs 0→4 + `_sepRng` present → the live "Export for Storybook" button works again; apps now serve `catalog-export.js?v=31/33`. Ride-along VERIFIED live: en `count-to-10-with-animals` + de `bis-10-zaehlen-mit-tieren` both HTTP 200, `typicalAgeRange:"5-6"`, zero stale "5 to 9".
- **B-programmatic (headless SEP):** `scripts/storybook/sep-generate.js` — spec `{app,family,params,vocabKeys,seed,locale,exId}` → SEP artifact, NO human. Determinism = `_sepRng` mulberry32 (added to `catalog-export.js` API) monkey-patched around generate; locale = a LOCALE-LOCALIZED `/api/images` stub (reads `IMAGE_VOCABULARY[key][locale][0]`, so es 'cat'→'Gato'). Each app got an additive `window.__sepGenerate(spec)` hook beside `__sepExport` (0-line to generation logic; polls for objects built inside the un-awaited async `Image.onload` — THAT was the old headless-stall cause). PROVEN: word-guess/A bilingual (EN "C_T"/es "G_O", different widths, same spec) + grid-match/F (identical elements across runs) → placed → qa-solved. matching(E)+find-and-count(C) hooks installed but headless-init stalls → documented programmatic-rollout; manual `__sepExport` fallback stands. `catalog-export.js?v` bumped 31/31/33/31 (word-guess/grid-match/matching/find-and-count).
- **Pre-school (PK):** grade band added to `gradeToAgeRange`(+PK:'3-4'), activities detail-route + INDEX `GRADE_KEY_MAP`(+PK:'preschool') + `GRADE_ORDER`(["PK",…]); `seo.educational_level.preschool` verified ×11; standards-hub deliberately UNCHANGED (no sub-K CCSS → PK = readiness). Audit `docs/storybook/preschool-audit.md`.
- **C — the AUTHORING ENGINE (docs are data; gates are code):** `docs/storybook/authoring-playbook.md` (5 arcs, per-grade envelope PK/K/1/2/3, voice, mechanic→module table, failure-mode→gate catalog) + `cast-bible.md` (Pip guide; one-guide rule) + `curriculum-ledger.json` (57 teaching points/750 slots, PK=readiness null-code) + `production-protocol.md` (10-step runbook + self-review rubric + onboarding test). `scripts/storybook/gate-story.js` = qualitative gate wrapping validate-story (grade-band numerics from GRADE_ENV SoT, single-answer, no-scoring, one-guide, + blueprint gates single-teaching-point/alignment-honesty/asset-worklist + SEP consistency; `runGates` require-able; `--json`). `blueprint-format.md`(blueprint-1) + `blueprint-to-skeleton.js`.
- **PROOFS:** C2 red-team = 5/5 blueprint + 6/6 story planted defects caught. **C5 (definition-of-done): a haiku-class trial author, docs+gates+exemplars ONLY, on an uncovered G2 point (g2-odd-even) → passed design-gate + validate + full-gate + qa (8/8) on the FIRST try, ZERO engine hand-fixing.** Loop yield = 2 doc fixes (guide-only-vs-companion arcs; provisional zones) — fixed the ENGINE not the story.
- **4 gate-clean qa-solving EXEMPLARS:** `pip-counts-along`(PK,count-tap), `pip-picture-words`(K, the B+C integration: blueprint exerciseSpecs→sep-generate --from-blueprint→qa), `pips-picnic`(G1, multi-mechanic; reclassified G1 + 1 line tightened to pass), `pip-odd-even`(G2, the weak-model artifact).
- **Gate calibration surfaced by the work:** number-ceiling is HARD for PK only; K–3 WARN (place-value/teen standards legitimately exceed the operation ceiling). Doc-synced.
- **DEPLOY (when operator says go):** `git push` done. Then `bash /opt/lessoncraftstudio/deploy.sh` (frontend PK routes) + §14.6 TWO-STEP for the 4 app HTMLs + sync `catalog-export.js` served copy (FIXES the known stale served copy = 0 helper refs, which currently breaks the live "Export for Storybook" button). Then ride-along: curl a live activity page, confirm age-range renders (en "5–6"/de "6–7", no "5 to 9").

## Generator-side SEP export (`ab2e439f`) — the worksheet-generator content supply is LIVE
The PRODUCING side of the SEP bridge (ingestion was already shipped). Operators
generate ONE exercise in a worksheet app → click **Export for Storybook**
(admin-only) → drag the crop box → export a `sep_*.zip` (transparent visual +
crop-space sep-1 descriptor) → unzip into a story's `exercises/` → the Studio
lists + places it. Full recipe: `docs/storybook/sep-format.md` §3.
- **Shared layer:** `LCSCatalogExport.exportStorybookExercise` in
  `REFERENCE TRANSLATIONS/catalog-export.js` — crop UI, transparent render
  (backgroundColor=null + Fabric-5 `toDataURL({left,top,width,height,
  multiplier:2})` → alpha WebP, decoration tags hidden), `SEP_FAMILY_MAPPERS`
  A/F/E/C, JSZip download. Opts: `cropRect` (headless), `returnPackage`
  (the `__sepExport` hook), `noDownload`.
- **Per-app (word-guess A / grid-match F / matching E / find-and-count C):**
  ~1 button + 1 `exerciseObjects` predicate + 1 `window.__sepExport` hook +
  a `catalog-export.js?v=N` bump. Estimate HELD. Generation logic untouched.
- **CRITICAL FIX:** default crop = union of the bundle's PAGE-SPACE element
  rects, NOT Fabric `getBoundingRect` (viewport/zoom-transformed = different
  space → empty exports). See `_sepDefaultCrop`.
- **sep-1 HELD** — no format evolution needed.
- **Proofs:** `prove-sep-export.js` (grid-match/F FULL LIVE chain: generate→
  export→place→validate-story 0 err→qa-storybook plays+solves) +
  `prove-sep-mappers.js` (all four A/F/E/C mappers vs real extractDeckBundle
  shapes → real validator 0 err; loads catalog-export.js in Node via
  `global.window=global` + the `_sepMapForTest`/`_sepDefaultCropForTest` seams).
- **Harness limit (NOT an SEP defect):** matching + find-and-count stall on
  their own `await generateInitialWorksheet()` under the static-server
  emulation (matching's `__sepExport` is even gated behind that await). They
  export normally against the real backend; families mapper-proven. Static
  harness stubs `/api/images` (`{images:[]}`) + `/api/*/themes` (BARE array —
  the apps do `themes.forEach`, an object throws + blocks init).
- **DEPLOY = §14.6 TWO-STEP:** push + deploy.sh, then `update-worksheet.sh`
  for each of the 4 app HTMLs + catalog-export.js (served copies immutable).

## The Storybook Studio (`c62bb9ac`) — visual authoring, story production is now data-work
Operator runs `node scripts/storybook/studio-server.js` → opens the printed
127.0.0.1 URL. Compose by eye → emits validated sb-1 by construction.
Quickstart: `docs/storybook/studio-quickstart.md`. Module-author guide:
`docs/storybook/authoring-guide.md` §4b.
- **Files:** `scripts/storybook/studio-server.js` (local server, forks qa
  serve(); Studio API — story load/save etag-guarded + .bak, library/scene/
  cast/SEP enumeration, scaffold, spawns the REAL validator; NO auth, local
  only). `mini tools/storybook-studio.html` + `studio-core.js` (doc state +
  100-snapshot undo + debounced autosave + localStorage backup) +
  `studio-canvas.js` (WYSIWYG; **atlas frames via canvas drawImage — no Pixi
  in the editor**; feet-anchor drag; ONE scale handle; zone+drawable editing;
  8du snap; nudge) + `studio-inspector.js` (form engine, narration/strings,
  drawers, preview iframe, validate panel).
- **`meta.studio` on all 17 modules** (additive; adapter passes it through):
  `{label, blurb, group, icon, defaults, fields[], drawables[], pattern?,
  spotDiff?}`. 12 field kinds + 2 drawable kinds. No block → guarded JSON
  fallback (open socket). New modules appear in the Studio automatically.
- **THE COORDINATE INVARIANT** (`studio-core.js` toAbsDu/toZoneRel +
  reencodeZoneChildren): operator intent = ABSOLUTE on the art; storage =
  zone-relative; zone moves re-encode children so objects stay put. The single
  most important canvas behavior; proven by prove-studio.js m5.
- **Player: one additive `&page=N` debug-gated preview param** (0 other player
  changes).
- **Proofs:** `prove-studio.js` (m1 du-exact render / m2 drag round-trip+.bak+
  undo+409 / m4 auto-zone form / m5 invariant) + `prove-studio-m7.js`
  (re-authors Pip's Picnic ENTIRELY through the UI → validator 0 err → QA 0
  fail). Both puppeteer, real UI events, scratch-story (never mutates real
  stories).
- **Lessons:** during pointerdown set selection via selQuiet() (no re-render —
  a re-render orphans the dragged element; visuals catch up on pointerup).
  z-order zone(10)<char(20)<drect(30). Store DECODED image srcs (real spaces);
  validate-story urlToLocal now decodeURIComponent (themes have spaces like
  "At the Supermarket"). Placing a drawable selects it → panel switches to the
  object-detail view (must "Back to the page" to add the next). setPointerCapture
  wrapped in try/catch (synthetic PointerEvents lack a real pointer id).
- **Secondary items NOT reached** (budget → Studio complete): portrait reflow,
  keepsake library surface, wrapped-core sound-off gap. Ordered for next window.

## The 17-module mechanic catalog (2026-07-02)
Full catalog + taskData shapes: `docs/storybook/authoring-guide.md` §4.
- **Wrapped cores (SBLegacyAdapter, 0 edits):** sb-choice-board, sb-sort-bins,
  sb-fractions, sb-clock, sb-match-pairs (PROTECTED core), sb-number-bond
  (state modes only), sb-cvc-builder, sb-word-builder. SKIPPED: ten-frame
  (needs --lcs-* CSS vars not loaded), array (keypad-by-design), sound-boxes
  (pure logic lib, no DOM contract).
- **Native (zero new art):** sb-find-object, sb-sequence, sb-pattern,
  sb-memory (mismatch = exploration, never a miss), sb-listen (audio-only
  prompt; word TEXT shown when muted / after 2 misses), sb-connect-dots,
  sb-spot-diff, sb-count-tap.
- **SEP families ingestible: A, F, E, C** (B/D deferred — don't miniaturize).
  E preserves deck semantics (acceptable-set, dashed hints, 1-to-1
  replacement); shadow-match normalizes to the E shape AT EXPORT.
- **Proof story `module-gym`** (15 pages, one per new module; INTERNAL — no
  SEO row; playable at ?story=module-gym). Adding a public story #2 remains
  an operator content decision.
- **Adapter scale-to-fit:** wrapped cores' stages auto-downscale into the
  zone (transform + clipped fit-wrapper) — vw-sized cores (clock) can't
  spill. match-pairs autoSolve must sync `cardsState` (allPaired reads it,
  not pairsFormed). `/audio/inventory.json` 404 is LCSAudio's DESIGNED
  lazy-inventory miss — whitelisted in qa-storybook.
- **ageRange ride-along:** `whatsInsideGrade` hard-coded "5 to 9" replaced by
  `{ageRange}` from `gradeToAgeRange` (activity-content.ts) across all 11
  locale templates — every activity landing shows its true band (K=5–6).

The commissioned foundational layer is BUILT + locally QA-green + deployed
(combined deploy with the German second-batch, operator-authorized — that
deploy SUPERSEDED the 2026-06-29 deploy-hold). Fork report + full build plan:
`C:\Users\rkgen\.claude\plans\commission-interactive-eventual-tome.md`.

## Architecture (locked)
- **Third sibling runtime** (lcs-shell / game-shell / storybook). Loads
  lcs-shell.js for `LCS.i18n`/`LCSAudio`/`LCS.drag`/`LCS.token`; never calls
  `LCS.mount`; reuses the `lcs-activity-resize` postMessage. **PixiJS 7.4.3
  legacy UMD vendored** at `mini tools/vendor-pixi.min.js` (script-tag, no
  bundler; v8 rejected — dropped WebGL1 = crashes weak school tablets).
- **1600×1000 design space**, px-math `toScreen()` sync (never CSS transform);
  16:10 fixed-aspect; deterministic iframe height. **Min tap = 112 design
  units**; below 480px stage width = rotate-hint territory (acknowledged
  degradation, QA warns not fails).
- **Hybrid layers**: Pixi canvas (scene sprite + Performers + transitions +
  T0 particles) + DOM overlay (zone, caption band, Check chrome, pips, tray).
- Files (flat in `mini tools/`): `storybook.html`, `storybook-player.js`
  (boot/chrome/Stage/Degrade/page-FSM/celebration), `storybook-cast.js`,
  `storybook-loader.js` (VRAM ledger ≤150MB, prefetch N+1),
  `storybook-audio.js` (line-ID mp3s + never-overlap arbiter — chime QUEUES
  behind narration), `storybook-interaction.js` (SBModules registry +
  InteractionHost + hint ladder miss#2 replay/miss#3 showHint + idle nudge),
  `sb-legacy-adapter.js`, `sb-mod-{choice-board,sort-bins,find-object,
  worksheet-exercise}.js`.
- Degradation tiers T0/T1/T2 + T3 (reduced-motion clamps): clips atlases
  NEVER loaded when maxPerformers=0 (degradation as a LOADING decision).
- **Rewards**: per-page visual celebration + session sticker tray; story end
  grants ONE `GameCollection.grant({id:'story.<id>', …})` keepsake.
  (`LCS.registerReward` from the commission NEVER existed — corrected.)
- **Narration**: `/mini-tools/stories/<id>/audio/<locale>/<lineId>.mp3`,
  line id = strings key = filename; fallback own-TTS (LCSAudio can't address
  story lines: closed type set + text-derived slugs).

## Story #2..#N = data work (NO engineering)
Recipe: `docs/storybook/authoring-guide.md`. Copy `mini tools/stories/
pips-picnic/`. Gates: `node scripts/storybook/validate-story.js <id>` (fatal;
runs modules' PURE validateTask in a vm sandbox; vocab-canonical checks) +
`node scripts/preflight-activity-routes.js` + `node scripts/storybook/
qa-storybook.js --story=<id>` (4 viewports × pages + reduced-motion,
autoSolve-driven, containment/tap/console gates) + personal Read of
screenshots (`docs/audit-results/storybook/qa/<id>/`, desktop first).
SEO = 1 row/story in `mini tools/storybook-activities.json` (tool
"storybook") + prose[`storybook.<id>`] in activity-content/en.json + preview
webp. Art: `scripts/storybook/pack-atlas.js` (Pixi JSON-hash + WebP;
TexturePacker-compatible); placeholders via `gen-placeholder-art.js`
(asset-stubbed-first; operator worklist per story in docs/storybook/).

## Hard-won lessons (bit me this session)
- **Deploy: a file referenced by a deployed page MUST be in git AND on the
  server BEFORE deploy.sh builds** (§20.4 manifest race). `game-collection.js`
  was untracked local-only → live 404 → keepsake silently ungrained; fixed by
  commit `55a7fa02` + cache-buster bump `72e7834f` + a REBUILD (cp alone does
  NOT surface a new file — the standalone build indexes /mini-tools/ at build
  time). Check `git ls-files` for EVERY script src a new wrapper references.
- **Wrapped cores need `tool.injectCSS()` called by the adapter** — several
  cores rely on their activity WRAPPER to inject CSS at load; without it the
  board renders unstyled/giant. Also `.sb-legacy-stage` must be BLOCK (like
  .lcs-stage), and the player scope needs `box-sizing:border-box` (cores
  assume the shell reset).
- QA needed a **zone-containment gate** (zone scrollWidth/Height spill) —
  document-overflow + FITS gates miss content painting outside its zone.
- SEP board sizing: CSS aspect-ratio can't contain-fit both dims — JS
  `sizeBoard()` via ResizeObserver.
- en.json prose inserts: NEVER hand-splice — parse → insert → stringify(null,2)
  round-trip (file is already machine-formatted; 23-line clean diff).

## Deferred / next (operator's call)
- Real art: operator renders per `docs/character-art-spec.md` STORYBOOK
  APPENDIX + per-story worklist; swap = pure asset replacement.
- EN narration recordings (ElevenLabs) → `audio/en/<lineId>.mp3` (TTS covers
  gaps; validator `--strict-audio` at launch).
- Non-EN locales: ensemble input spec = authoring-guide §8 (strings.json +
  reward.label + SEO row + SEP locales + mp3s → extend story.locales).
- Generator-side SEP export (`LCSCatalogExport.exportStorybookExercise`) —
  operator's build; the target format + mapper spec = `docs/storybook/
  sep-format.md`. Ingestion families A+F live; E next cheapest, then C.
- 'pixi' module mount surface reserved (meta.surfaces additive).
- Portrait-phone reflow (v2); paywall; story-builder (schema stays pure-data).

## PRE-SCHOOL MECHANICS PACK — COMPLETE + DEPLOYED LIVE (2026-07-03, commits a005f6dc→795c9fd2)
7 PK (ages 3-5) interaction modules + a runtime band profile + 5 variants + Studio path/maze editors + an imprecise-touch QA harness. Built, verified, committed, pushed, DEPLOYED LIVE 2026-07-03. storybook.html is UNCACHED (max-age=0/DYNAMIC → always fresh); mini-tools .js are max-age=14400 but the new ones never cached + changed interaction/player verified fresh on edge. Deploy = git pull → cp 16 files+5 story dirs to /var/www/lcs-media/mini-tools/ (real dir, not immutable) → deploy.sh. NOTE: deploy.sh post-step indexnow-submit.js is MISSING on server (pre-existing, non-fatal, separate ops fix). Full report: `docs/storybook/preschool-mechanics-report.md`; plan file `C:\Users\rkgen\.claude\plans\commission-interactive-eventual-tome.md`.
- **Modules** (`mini tools/sb-mod-*.js`): trace · dot-stamp · color-code · shape-fit · complete-picture · listen-place · maze. All native DOM/SVG, 0 protected-core lines.
- **Band** `mini tools/sb-bands.js` (SB_BANDS SoT) → frozen additive `ctx.band` (mirrors `reducedMotion` threading; legacy/K-3 never read it → zero behaviour change). PK FATAL floors (validator-enforced): minTapTarget 200 · minDragHandle 240 · nearFitSnapRadius 180 · pathBandHalfWidth 110 · mazeCorridorWidth 300 · maxTaps 4 · maxDrags 3.
- **Kit** `mini tools/sb-preschool-kit.js` (`SBKit`): hit-geometry (nearestOnPath forward-arc / segIntersect) + drag2d + equity (muted/2-miss reveal) + ghostHand. PEER script, never touches the socket.
- **Imprecise-touch QA** `scripts/storybook/lib/touch-driver.js` + a `qaGesture()` debug seam per module (host.qaGesture passthrough + SB_PLAYER.qaGesture) → qa-storybook drives REAL jittered pointer (path/taps/drops), asserts: wobbly-correct+mid-lift COMPLETES · off-target does NOT falsely complete + stays answerable. **It caught 2 real bugs the eyeball missed: (1) drag pieces mis-centred (setPos to x-TS/2 vs shape centred at 0,0) — masked by PK snap 220, exposed by the gym DEFAULTS band snap 120 → run BOTH surfaces; (2) driver pressed DOWN on the jittered first point → grab-offset drifted the maze token into a wall → press on the exact first point.**
- **Gates**: validate-story threads `v.band` (PK modules enforce band.fatal); gate-story `GRADE_ENV.PK` (3-4 pages, ≤6-word lines) + NON_QUANTITY_KEYS exempts spatial geometry (x1/y1/x2/y2, snapDu/tolDu/corridorWidth, symbol/glyph, missing). Studio expected=24.
- **Studio** path editor (multi-click + Enter) + maze wall drawer; `reencodeZoneChildren` extended to path/maze; prove-studio stage **m8** green.
- **Fixtures**: module-gym g16-g25 · PK stories pk-trace/pk-tap/pk-drag (+ pk-trial = the weak-model trial: Haiku authored it from ONLY the docs+gym → passed all gates 0-fix).
- **Doctrine**: authoring-guide §4 (7-module PK palette + variants + drawable-kind table) · playbook §5 (rows) + §6.1 (the 13 fine-motor traps).
