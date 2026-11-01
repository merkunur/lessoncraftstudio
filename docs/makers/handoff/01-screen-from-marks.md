# 01 — Screen from the answer marks (task 1, Fable 5.1, 2026-11-01)

Design: `docs/makers/INTERACTIVE-AND-SHARING.md` §A, §B, §F. Built locally, nothing deployed; the catalogue is byte-identical
(slots gate against HEAD; the screen build is a THIRD build, `ctx.screen`, next to the page and the key).

## What is built — commit 8cb6e9dae (+ the G1-454 range hunk inside the main session's 8e6663e4b)

- **Engine** `scripts/makers/screen.js` (browser-safe, in every maker bundle as `mod.screen`): `derive()` runs inside the
  page document and reads the marks → `plan()` turns them into runtime parts (validated by every kind's own rules) →
  `screenDocument()` serves the page with every `data-lcs-*` outside a structural allow-list stripped, the generic
  instruction above it, the page scaled to the viewport (1:1 on a tablet), Check / Try again / score / celebration from
  the shared runtime strings ×11. `buildScreen()` = mount → derive → plan → serve.
- **Runtime** `scripts/worksheet-gen/emit/interactive-runtime-core.js` (NEW, no Node import — the body of
  `interactive-runtime.js`, which is now a thin wrapper; byte-identical output proven by
  `scripts/makers/tests/interactive-runtime-split.test.js` against commit 8ce93793d, 28 builds, poisoned). Added kinds:
  `tap-pair`, `tap-place`, and the composite `marks` (one page, parts of the classes type / choice / select / pair /
  place, one Check; a judge seam `R()` for the poison). `type-word` gains an opt-in `ctx.symbolPad` (a pad of < > = + −).
  A tap target under 36 px is grown to 36 px around its printed box.
- **Mark vocabulary** (read on the screen build): `.ws-answerbox[data-lcs-answer]` / empty `[data-lcs-answer]` →
  type (`data-lcs-typed`, `data-lcs-alts`, `data-lcs-range="lo-hi"`, `data-lcs-set` honoured; chart
  `rect[data-lcs-missing]` too) · `[data-lcs-correct]` among its like siblings or a `[data-lcs-choice]` group → choice ·
  several right among like siblings, `[data-lcs-pick]` (right = key-ring / correct), `[data-lcs-key-ring]` among siblings
  → select ("any N" per group with `data-lcs-want`) · `[data-lcs-key-badge=id]` + `[data-lcs-pair=id]` → pair (mutual
  when the items are the targets) · `[data-lcs-bin=id]` + `[data-lcs-drop][data-lcs-answer=id]` → place. The full
  table is the header of `screen.js`.
- **S\* marking edits** (marks on `ctx.answerKey || ctx.screen`, or screen-only where the key must not change):
  compare-groups K-008/9, K-010, K-007, frame-counting K-024/25, K-011 (want), K-030, scene-count K-059/70, K-392,
  rainbow K-458 (a hit box per numeral; ids `N:v`), compare-more G1-454 (range) [that hunk landed in the main session's
  8e6663e4b], doubles-more G1-450, odd-more G1-455/456, number-chart-more G1-435, number-line-more G3-406, plus two
  additive primitive options: `hundredsChart({cellBoxes})`, `numberLine({tickBoxes})` (transparent hit rects, screen only).
- **Verdicts** `scripts/makers/screen-verdicts.json` (writing / many-answers / material from the design's §E for every
  family; `later` = eligible but not marked yet, reason per id). `scripts/makers/build-screens.js` (spawned by
  build-bundles before the thumbnails) writes `screen` ('declared' | 'marks' | null), `screenLevels`, `screenReason`,
  `verdict` per template plus `runtimeStrings`, `screenInstructions`, `screenUi` ×11 into templates.json.
- **Shell**: a "Screen version" button (header; only where the template's level has a marks screen) opens the student's
  page in a dialog, built in the browser from the gated page's own seed (`pageOptions` + the gate attempt replayed),
  tabs per page, the teacher's drawing on the page. The 443 declared screens are NOT previewed (they need
  render-instance's capture — task 2 / the play page decides).
- **Gate** `scripts/makers/gates/screen-from-marks.js`: per built maker × marks template × screenLevels × en + fi × 2
  copies — derivation, key parity (what the key marks is what the screen grades; a key that draws a sample may mark
  less), solvable by real clicks (right → all right + celebration; wrong → none right; all but one → Check disabled),
  no tell (DOM order, no answer attribute / key layer / attribute-keyed CSS on the served page), tap floor MEASURED on the
  rendered buttons at 768 / 1024 (≥ 34 px items, ≥ 44 px controls; 360 reported), strings ×11, classification
  (exactly one verdict per template). Poisons both ways: two right options, a key ring the screen ignores, a judge that
  marks everything right, a leftover `data-lcs-answer`, a 20 px chip, the verdict rule — and the correct pages pass.
- **Strings** (NEW file, mine): `scripts/worksheet-gen/i18n/screen-instructions.json` — `_generic` type / tap-choice /
  tap-select / tap-pair / tap-place ×11 and `_ui` screenVersion / screenTitle / screenNone / screenLevelNone ×11.

## Measured

- Templates with a screen built from their marks, per maker (final build 2026-11-01): counting 17 · ten-frames 14 ·
  sight-words 3 · number-sequences 5 · number-lines 5 · number-bonds 4 · addition-subtraction 14 · doubles-halves 4 ·
  compare-numbers 15 · odd-even 4 · place-value 16 · fractions 3 · multiplication-division 5 = **109** (plus the declared
  interactive screens: 209). Paper-only: writing 12, many-answers 1, material 10, later 3 (K-454, G1-447, K-389).
- `screen-from-marks` full run on the final build: **1,276 screens pass** (en + fi × 2 copies × every screen level), 288
  templates classified, poisons fire both ways. The one failure in that run (G3-411 "no verdict") was the main session's
  new keyring cards, added to `material` during the run — the gate on the committed verdicts passes.
- Shell: "Screen version" opened in the browser for K-007 (de): 8 pair targets, "Antworten prüfen", no mark left in the
  served DOM; live gate 16,434 pages 0 failing; parity 1,494 cases 0 different; sha1-parity 113,858 seeds; controls budget,
  thumbs, old landings, click / keys / edit / access / themes / saves / exports shells all pass; answer keys 1,328 key
  pages pass (the marking edits did not change a key); the slots gate shows every one of my templates' catalogue output
  identical to HEAD — its 21 failures are the main session's in-progress fractions maker ("exposes no slot"), not this work.
- Tests: `interactive-runtime-split` (28 builds byte-identical to 8ce93793d), recipe, resolve-version pass.

## NOT done / decisions for the operator

- Phone (360 px): the page scales to 0.49 — the smallest page items are ≈ 17 px; the gate reports, does not fail (the brief
  names tablets; the child can pinch). Decision: keep, or demand a phone layout (one column, bigger items) per template.
- `later` verdicts (eligible, not marked): K-454 (the empty ten-frame draws no cells; L3 has many answers), G1-447 (a box
  only on the wrong sums tells which are wrong — needs a right/wrong choice per card), K-389 (key-on-row seating OPEN),
  G2-402 (place-value, main session). Each is one small edit; none is hidden.
- Declared screens (443) have no browser preview and no student page yet — task 2.
- The ARCHITECTURE §15 / §11.1 amendments of the design's §D.1 are not applied to the doc (the main session folds).
- `data-lcs-print` on the celebration's print link is a placeholder (`href="#" hidden`) for the play page.

## Native review needed (55 + 44 strings)

`scripts/worksheet-gen/i18n/screen-instructions.json` — all 11 locales of `_generic.*` (5 sentences) and `_ui.*` (4). Each
sentence names the Check button exactly as translations-shared.js `runtimeCheckAnswers` names it. en = American, es = Mexico,
pt = Brazil. The `_ui` strings belong in `frontend/messages/makers/<loc>.json` (main session).

## Traps paid for

- `interactive-type-plus.js` / `interactive-set-clock.js` assert their judge seam at load; minified by esbuild they threw at
  boot ("the judge seam moved") and every maker died silently (thumbnails "Waiting failed"). build-bundles now ships them
  as Node-computed string literals (plugin), never a re-serialised function.
- Marks are stamped on the KEY build only in a third of the S templates — the design's "the marks are already on the page"
  held for data-lcs-answer boxes and chips, not for rings / badges / groups; hence `ctx.screen`.
- `data-lcs-io="4>8"`: a `>` inside an attribute value broke a naive tag splitter; stripMarks splits on quoted tags.
- Rainbow pairs: the same numeral appears in every row — target ids must be unique page-wide (`N:v`).
- A gate that compares a scaled model instead of the DOM reported 33.99 px as a failure; measure the rendered buttons.
- CRLF files: a patch anchored on "\n" silently matched nothing — split anchors on the file's EOL.
- A select-only page has no "unanswered" question: Check enables on the first tap (as JS_SELECT does); the short bot
  must pick the last NON-select question.
