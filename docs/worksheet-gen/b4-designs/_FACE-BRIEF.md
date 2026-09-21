# nt10-D FACE BRIEF — the contract for building the FIVE variation faces of ONE family (Phase 2)

You are building the five variation faces (§3 of `docs/worksheet-gen/b4-designs/<ID>-<key>.md`) of a family whose BASE spec is already committed and gated. The design file is the contract; the base spec, its component file, its EN bank, its gate and the build record `_work/<ID>-build.md` (read its "open items for the faces" — deferred face poisons, the seams the base left for you, refusals) are the substrate. `_BUILD-BRIEF.md` rules still apply (chrome budgets: body 722 (en/de 3-line chrome; measure your own family — pronouns measured 710) and 677 (the fi four-line title), the 36/44/56 element floors per band, no visible "free", every picture opened, `_buildWith` seam, stamps-only `verify()`).

## Ids are FIXED
`docs/worksheet-gen/b4-designs/_records/b4var-id-allocation.json` gives every (family, face) its id and band directory (`k`/`g1`/`g2`/`g3`) — some faces sit in ANOTHER band than the base (a K family's G1 face takes a G1 id and lives in `types/g1/`). Use exactly those ids; `gen-b4var-specs.js` refuses any other.

## Two kinds of face, one emitter
- **PARAM face** — a row only: `{...base.difficulty[src], ...overrides}` reproduces the face with no new code.
- **CODE face** — an ADDITIVE knob in the base spec (`layout` / `mode` / `steps` / whatever §3 names) read by the base's `build` (+ a `verify()` branch), stamped (`data-lcs-face` / `data-lcs-mode`) ONLY when declared — then a row that sets the knob. The base's existing output must stay BYTE-IDENTICAL: after your edits `node tools/b3-baseline.js --check --quick` must print PASS (the release baseline holds every base coordinate; any drift = you changed the base's default path).
- **HANDWRITTEN spec** — only when a row cannot express it (a factory instance; an `extra` needing a function value such as its own `unitAxis`). Write `types/<dir>/<ID>-<slug>.js` by hand and list it under `HANDWRITTEN` with its `base` id.

## Deliverable 1 — `scripts/worksheet-gen/tools/b4var-rows/<key>.js` (NEW; the only file the emitter reads)
```js
'use strict';
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g1', 'G1-3xx', '<key>-<face-slug>', '<ID>-<key>.js', 2, { layout: 'scene' }, 'EN Title', 'EN instruction.'],
  // extra (9th) = spec-level JSON overrides, e.g. { themeAxis: { applicable: false } } for a themeless face
];
const HANDWRITTEN = []; // [{ id, dir, file, base: '<ID>' }]
module.exports = { ROWS, HANDWRITTEN };
```
Then `node tools/gen-b4var-specs.js` emits `types/<dir>/<id>-<slug>.js` for every row (it prunes a stale file after a slug rename — never leave two files with one id). EN titles: distinct across the family AND the band (`node i18n/build-en.js` lints band-title uniqueness; leave `i18n/strings.en.json` as regenerated — see the nt10-D additions); no "worksheet" in a title; instruction ≤ 150 chars and the instruction/title pair must fit the design's chrome budget.

## Deliverable 2 — base spec + component + bank edits (type-scoped only)
Additive knobs in `types/<band>/<ID>-<key>.js`; new components ONLY in `templates/components-b4/<key>.js` (the namespace loader refuses a duplicate export — check the other `components-b4/*.js` first); new EN bank material in `data/b4/<key>.js` (gitignored; the reviewer force-adds) with `validateBank` extended for every new §5 rule. Nothing outside your family's files: no `enumerate.js`, `render/*`, `emit/*`, `lib/*`, `qa/lints.js`, `templates/components*.js`, `types/_shared/*`, other families' files. If a shared file MUST change, stop and report why.

## Deliverable 3 — the gate grows: `qa/verify-b4-<key>.js`
Every §5 face poison the base deferred now FAILS (with the base + the face configs as controls). Each face renders through the real pipeline at d2 en (`node render/one.js <faceId> <theme|null> 2 en [unit]`) plus the worst legal chrome; floors asserted; `verify()` re-derives from the stamps for every verifiable face (open-ended faces: structure + lints only, as the design says). Print the final line `PASS (N assertions, M/M poisons killed)` or FAIL with exit 1; keep `--quick`.

## Deliverable 4 — distinctness + renders
- `node tools/gate-variation-distinct.js --batch=b4 --diffs=2 --family=<key>` → must print "every variation differs …" (each face's resolved d2 config ≠ the base's d2 AND ≠ every sibling face).
- `out/dev/<faceId>-<theme|null>-d2-en.png` for all five faces — READ EVERY PNG yourself (a montage is fine) and record what you saw: no clipping, nothing under the footer, floors hold, the face does what its title says.
- `node tools/b3-baseline.js --check --quick` → PASS (paste the line).

## Deliverable 5 — the record: `docs/worksheet-gen/b4-designs/_work/<ID>-faces.md`
Per face: id · kind (PARAM/CODE/HANDWRITTEN) · the knob/override · what the child does · gate assertions/poisons it owns · PNG path · deviations from §3 with the MEASURED reason · per-locale refusals you can already see from the bank shape (these lower `hub-expectations.json` in Phase 4 — say which locale and why) · open items for the panels. Then the gate's final line, the distinctness line, the baseline line.

## Rules
- Do NOT commit. Do NOT re-design: §3 is the contract; where it is unbuildable as written, build the nearest honest face, and say exactly what and why.
- A face must change what the child DOES. A theme swap, a title swap, or a re-statement of the base's own values is not a face (`gate-variation-distinct` is the floor, not the bar).
- Never move a threshold to pass; fix the layout or fix WHAT is measured.
- Write every multi-line script to a file and run it by path (heredocs and `node -e` eat backslashes and backticks).

## nt10-D additions (each bought during Phase 1; binding for every face)
- **SPARSE is a defect.** Size every inter-element zone to what the task needs (measured), top-anchor the stage under the instruction so the page's slack falls OUTSIDE the stage, and give every face a "sparse" assertion in the gate (a stage-height floor and/or a max blank band between consecutive rows, with the sparse layout as a poison). K-357's base shipped 430 px of blank paper between a strip and its bins because a design MAXIMUM was read as a target; K-354, G1-351 and G2-346 had the same shape more mildly. A short face (few rows) grows its elements to fill, it never floats a small stage in the middle of the page.
- **A title that lists chips/options lists EXACTLY the shipped d2 chips** (G1-353's base said "Who, What, Where" while the page asked When). Fix at the CONFIG, never by renaming the head the panels chose.
- **Printable decks ship NO answer key** — no title/instruction may say "with answers" or promise a key (the base gates ban it; keep the ban on every face string).
- **`≈` U+2248 and `→` U+2192 are OUTSIDE every font `unicode-range`** — a face needing them uses the SVG glyphs the base ships (`roundGlyph` in `components-b4/rounding.js`); both codepoints are banned as text.
- **The family key for K-356 is `weather-symbols`** (the THEME axis owns `weather`); `withFixedTheme(type,'weather')` stays. Every other family is THEMELESS except odd-and-even's picture faces (F2/F5), which take a theme from `lib/b3-picture-index.js`-compatible pools per §3; `coordinate.mode` = the face string, `coordinate.theme:''` for themeless faces.
- **Banks:** the loader is `lib/b4-common.js bank(name, loc)` over `data/b4/<name>.js`; question-words READS the pronouns bank (portraits + names) and must NOT edit `data/b4/pronouns.js` — if a question-words face needs new pronouns-bank material, stop and report. Shared b3 libs (`lib/b3-picture-index.js`, `lib/b3-instructions.js fillSlots`, `lib/b3-common.js texPool`, `objForms` in `data/b3/instructions.js`) are read-only.
- **The base's shipped output must stay BYTE-IDENTICAL:** the release baseline (`out/b3-baseline.json`, re-captured after Phase 1) holds every base coordinate; `node tools/b3-baseline.js --check --quick` must print PASS after your edits. The 50 face ids are NOT in the baseline yet (they are the accepted drift at the Phase 2 close) — do not `--capture`.
- `node i18n/build-en.js` regenerates `i18n/strings.en.json` from every spec on disk (it now carries the ten bases); run it after your rows exist, leave the file as generated (do NOT `git checkout --` it; the reviewer commits it with the last family).
- Face ids by band: some faces of a K family are G1/G2/G3 ids and live in `types/g1|g2|g3/`; carry `extra { gradeBand: '<band>' }` when the face's band differs from the base's (floors + the manifest read it).
- **Open every picture a face keeps** (the Phase 1 lesson held: an opened file is what its filename says only sometimes); assert on disk that every referenced `<themeDir>/<noun>@2x.webp` exists.
- Read the base's `_work/<ID>-build.md` "open items" first: the base builders recorded which face poisons they deferred and which knobs they left as seams.
