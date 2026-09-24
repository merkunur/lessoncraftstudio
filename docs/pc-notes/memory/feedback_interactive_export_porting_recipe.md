---
name: Porting the interactive-HTML export to a new worksheet app (recipe + pitfalls)
description: Step-by-step recipe for adding the Download → Interactive Worksheet (HTML) feature to one of the 19 remaining worksheet apps. Covers both runtime families, the shared attribution edits, the two-step deploy, and the gotchas that have cost real debugging time. Updated 2026-04-24 after 12 apps shipped.
type: feedback
originSessionId: 7b98056c-05c7-44b8-854d-f5430e438a92
---
**Rule:** To port the interactive-HTML export to a new app, follow the phased recipe below. Do NOT skip phases. Each of the listed pitfalls has cost real session time; the recipe encodes what works.

**Why:** 12 apps have shipped (v4 addition through v15 wordsearch) following this pattern. Variations from it have produced: slots clustered at the top-left (wrong positioning math), tiny-unclickable hitboxes (double-scaled offsets), answer boxes floating above the `=` sign (anchoring to bbox center instead of to the `=` sign), find-subtrahend always wrong (forgot to branch expectedAnswer on mode), site serving old HTML (forgot the update-worksheet.sh step after deploy), 100%-found celebration that never fires (placedWordsInfo included words the operator's display filter drops).

**How to apply:**

### Phase 0 — Pick a runtime family and a reference app

Two families are in production (see CLAUDE.md §14.2):

- **Family A — Letter fill-in (v4–v14).** N independent input slots, batch-check. Clean references: `REFERENCE APPS/word-guess.html` v13 (single-kind letter blanks) and `REFERENCE APPS/code-addition.html` v6 (multi-slot number+letter kinds). Use family A when the worksheet has a fixed set of answer positions.
- **Family B — Puzzle drag (v15+).** Pointer-driven spatial selection, no per-answer slots. Reference: `REFERENCE APPS/wordsearch.html` v15. Use family B when the interaction is drawing/selecting a path or region.

### Phase 1 — Metadata patches in the operator's rendering code
All additive, no visual change. Goal: let the exporter understand the app's structure without rewriting generation logic.

1. `worksheetCanvas.problemsData = <data>;` inside `generateWorksheet()`. For family A this is usually the problems array; for family B it's the raw puzzle data (e.g., wordsearch stashes `{ grid, placedWordsInfo, settings }`).
2. For family A: tag every student-fillable cell/line with a boolean (e.g., `isAnswerLine: true`, `isBlankLetterCell: !isAnswerKey && !clues.has(j)`). Include per-slot metadata where it's cheaper to read at tag-time than reconstruct later (e.g., `letterValue`, `letterProblemIndex`).
3. For family B: tag the container group with a type marker (e.g., `isWordsearchGrid: true`) + geometry metadata (rows, cols, cellSize). The exporter uses the group's first-child background rect for the world AABB.
4. For mode-branching worksheets, stash the operator's choice on the canvas so the exporter can read it (e.g., `worksheetCanvas.letterCaseValue = document.querySelector('input[name="letterCase"]:checked').value;`).
5. For worksheets that pre-render visual hints in "example" state, tag those with `isExample: true` (or equivalent) so the exporter can hide them during the JPEG snapshot.

### Phase 2 — Download button + wiring (4 edits)

1. `<button id="downloadInteractiveHtmlBtn" disabled data-translate="interactiveHtml">Interactive Worksheet (HTML)</button>` inside the existing download dropdown, after the PDF buttons and before the grayscale checkbox.
2. `const downloadInteractiveHtmlBtn = document.getElementById("downloadInteractiveHtmlBtn");` (or `getEl(...)`) alongside the other download consts.
3. Un-disable it alongside the other download buttons in `generateWorksheet()`; disable it alongside them in the clear/reset path.
4. `downloadInteractiveHtmlBtn.addEventListener("click", () => downloadInteractiveHtml(worksheetCanvas, '<app>_interactive.html'));`

### Phase 3 — Shared attribution (7 edits — applies to EVERY port)

The shared `LCSAttribution` module is already live on production at `/worksheet-generators/js/attribution-manager.js` (served by nginx; NOT in git because of a symlink conflict — do not try to track it). Every new port includes these 7 edits:

1. Head script: `<script src="/worksheet-generators/js/attribution-manager.js?v=1"></script>` right after `access-guard.js`.
2. Worksheet canvas: `if (window.LCSAttribution) { LCSAttribution.addToCanvas(worksheetCanvas, { currentCanvasConfig }); }` immediately before `worksheetCanvas.renderAll();`.
3. Answer-key canvas: same insertion before `answerKeyCanvas.renderAll();`.
4. Bundle return gets `attribution: { text, url, rect }` using `LCSAttribution.getRectFromCanvas(canvas)` (null-coalesce if module not loaded).
5. CSS block includes:
   ```css
   .lcs-attrib-link{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;cursor:pointer;background:transparent;text-decoration:none;border-radius:4px;outline:none}
   .lcs-attrib-link:focus-visible{outline:2px solid #4E5FE8;outline-offset:2px}
   .lcs-attrib-link:hover{background:rgba(78,95,232,.08)}
   ```
6. `@media print { .lcs-bar, .lcs-footer, .lcs-celebration, .lcs-attrib-link, ... { display:none !important } }`.
7. In the runtime's render function, overlay the clickable `<a class="lcs-attrib-link">` at the attribution rect (same %-position math as slots).

### Phase 4 — Copy the reference block and adapt

From the closest reference (see Phase 0), copy the `// BEGIN: Interactive-HTML export v<N>` through `// END:` block into the target app. Insert it inside the main inline `<script>`, ideally near the other download functions.

Adapt:
- `appType: '<app>'`, `title: '<App> Practice'`, `bundleVersion: '<next>.0.0'`.
- Rewrite `extractDeckBundle` for the new app's slot/grid shape. Reuse `_captureWorksheetImage` and `_worldRectBounds` as-is.
- For family A with mode-branching (e.g., find-addend vs. compute-sum), branch the `expected` value in `extractDeckBundle`, NOT in the runtime. Ship the correct expected value per slot.
- For family A with operator-controlled case, include `caseValue` at the bundle top level and coerce student input in `buildInput`; compare case-insensitively in `isCorrect`.
- For family B, mirror any operator display filter the app uses. **See wordsearch v15 note below** — this was a real bug.

### Phase 5 — Validate, sync, commit

1. Byte-level sanity: `node -e "var s=fs.readFileSync('REFERENCE APPS/<app>.html','utf8');var beg=s.indexOf('// BEGIN: Interactive-HTML export v<N>');var end=s.indexOf('// END: Interactive-HTML export v<N>');var b=s.slice(beg,end);console.log('braces:',((b.match(/{/g)||[]).length-(b.match(/}/g)||[]).length),'parens:',((b.match(/\(/g)||[]).length-(b.match(/\)/g)||[]).length));"` — braces/parens/brackets must balance to 0.
2. `scripts\master-sync.bat` locally.
3. Hard-refresh `http://localhost:3000/worksheet-generators/<app>.html`; manually test Generate + Download + every mode in the downloaded file. Don't skip — every app has had a mode-specific bug that only manifests in the browser.
4. `git add "REFERENCE APPS/<app>.html"` **only** (see `feedback_worksheet_app_commit_scope.md` — leave the two sibling tracked copies drifted).
5. Commit with `feat(<app>): interactive export v<N> — <short description>`.

### Phase 6 — Deploy the two-step way

1. `git push origin pivot/printable-business-toolkit`.
2. `plink -batch -ssh root@65.108.5.250 -pw <pw> -hostkey "<hk>" "bash /opt/lessoncraftstudio/deploy.sh"` (creds in CLAUDE.md §A.1).
3. **Critical second step** — `deploy.sh` alone does not refresh the immutable served HTML:
   `plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"`
4. Verify live: `curl -s https://www.lessoncraftstudio.com/worksheet-generators/<app>.html | grep -c 'Interactive-HTML export v<N>'` → must return ≥ 1. Also check `lcs-attrib-link` count is ≥ 3.

### Pitfalls captured from shipped ports

**Fabric geometry**
- **`getBoundingRect(true, true)` on a grouped child returns GROUP-LOCAL coords in Fabric 5.x**, not world coords. Use `child.calcTransformMatrix()` + `fabric.util.transformPoint({x,y}, matrix)`. The matrix walks the parent chain automatically.
- **`calcTransformMatrix()` already bakes in the object's own scale.** Feed raw `img.width`/`img.height` to `transformPoint`, NOT `getScaledWidth()/getScaledHeight()`. Otherwise offsets are double-scaled and the rect is tiny. (This is why v5's first cross-out hitboxes were tiny.)
- **`exerciseRowGroup.getCenterPoint().y` is not the equation centerline** when operand images aren't square. Use `_findEqualsSign(group)` + `calcTransformMatrix` to anchor to the actual `=` sign.

**Correctness**
- **`expectedAnswer(s)` must branch on mode.** For any mode where the student types a missing operand (find-addend, find-subtrahend, etc.), `expected = s.operandB`. For modes where the student types the result, `expected = computed result`. A bare `return operandA - operandB` breaks find-subtrahend. Decide this when writing `extractDeckBundle`, not later.
- **Operator/interactive filter mismatch (wordsearch-class bug).** When the operator pre-filters what shows on the worksheet, the interactive export MUST apply the same filter. wordsearch strips non-letters from words before grid placement ("Orange Juice" → "ORANGEJUICE"), then the rendered word-list filter only keeps entries whose original `wordsConfig[i].word` uppercases to match a placed word. That leaves stray entries in `placedWordsInfo` that never appear on the page — and if the interactive export includes them as targets, `words.every(w=>w.found)` is forever false and no celebration fires. Fix: filter `placedWordsInfo` against `wordsConfig` in `extractDeckBundle`. Any puzzle app that shows a subset of what it places needs the same double-check.

**Authoring**
- **Inline runtime stored as array-of-strings** (`INTERACTIVE_RUNTIME_LINES.join('\n')`) to avoid template-literal escaping (`${...}` and backticks). Keep that pattern in every port.
- **`</script>` inside strings must be escaped `<\/script>`** to avoid the outer HTML parser closing the script tag prematurely. Search the new block before committing.
- **The operator may transform (scale/translate/rotate) the rowGroup after generation.** Use `calcTransformMatrix` everywhere; never hardcode offsets.
- **Commit scope:** stage only `REFERENCE APPS/<app>.html`. Leave the two sibling tracked copies (`legacy-apps/public/`, `worksheet generators/apps/`) drifted — matches project convention. See `feedback_worksheet_app_commit_scope.md`.

**UX / scope**
- **Don't duplicate what the baked JPEG already shows.** Early wordsearch v15 rendered an interactive "Find these words" list below the grid — removed immediately because the baked worksheet already listed the targets with images. The overlay layer adds interaction; it doesn't re-present content. A progress counter in the sticky bar is usually sufficient.
- **Case handling in letter fill-in.** Store the operator's letterCase radio choice at generate time, put it in the bundle, coerce student input on the client. Compare case-insensitively — typing the "wrong" case is still correct; only display needs to match.

**Dev/deploy**
- **The sitemap dev-mode rename** (`frontend/app/sitemap.xml/route.ts` ↔ `.DISABLED-FOR-DEV`) must be restored before any push. Pre-existing Next.js route conflict; dev server won't start otherwise.
- **Deploy scope:** `deploy.sh` + `update-worksheet.sh` BOTH required. Skipping the second step is invisible locally but the production site keeps serving the old HTML. Verify with the curl grep after every deploy.

### What to keep from references without revisiting
- Design tokens (warm cream bg `#FEFAF3`, indigo primary `#4E5FE8`, green correct `#4CAF50`, red wrong `#E53935`, sunshine stars `#FFC857`).
- Celebration modal (stars-by-first-try-accuracy, worksheet thumbnail, Do Another/Print).
- Accessibility: aria-live, focus-visible rings, reduced-motion branch, keyboard-tabbable hitboxes.
- Mute toggle persisted in localStorage.
- Print-media CSS.
- Attribution overlay (§14.3).

These are locked. No need to revisit unless the operator asks.
