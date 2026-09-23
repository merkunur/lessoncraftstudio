# nt10-E FACE BRIEF — the contract for building the FIVE variation faces of ONE family (Phase E)

You are building the five variation faces (§3 of `docs/worksheet-gen/b5-designs/<ID>-<key>.md`) of a family whose BASE spec is already committed and gated. The design file is the contract; the base spec, its component file, its EN bank, its gate and the build record `_work/<ID>-build.md` (read its "open items for the faces" — deferred face poisons, the seams the base left for you, refusals) are the substrate. `_BUILD-BRIEF.md` rules still apply (chrome budgets: body 722 (en/de 3-line chrome; measure your own family — pronouns measured 710) and 677 (the fi four-line title), the 36/44/56 element floors per band, no visible "free", every picture opened, `_buildWith` seam, stamps-only `verify()`).

## Ids are FIXED
`docs/worksheet-gen/b5-designs/_records/b5var-id-allocation.json` gives every (family, face) its id and band directory (`k`/`g1`/`g2`/`g3`) — some faces sit in ANOTHER band than the base (a K family's G1 face takes a G1 id and lives in `types/g1/`). Use exactly those ids; `gen-b5var-specs.js` refuses any other.

## Two kinds of face, one emitter
- **PARAM face** — a row only: `{...base.difficulty[src], ...overrides}` reproduces the face with no new code.
- **CODE face** — an ADDITIVE knob in the base spec (`layout` / `mode` / `steps` / whatever §3 names) read by the base's `build` (+ a `verify()` branch), stamped (`data-lcs-face` / `data-lcs-mode`) ONLY when declared — then a row that sets the knob. The base's existing output must stay BYTE-IDENTICAL: after your edits `node tools/b3-baseline.js --check --quick` must print PASS (the release baseline holds every base coordinate; any drift = you changed the base's default path).
- **HANDWRITTEN spec** — only when a row cannot express it (a factory instance; an `extra` needing a function value such as its own `unitAxis`). Write `types/<dir>/<ID>-<slug>.js` by hand and list it under `HANDWRITTEN` with its `base` id.

## Deliverable 1 — `scripts/worksheet-gen/tools/b5var-rows/<key>.js` (NEW; the only file the emitter reads)
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
Then `node tools/gen-b5var-specs.js` emits `types/<dir>/<id>-<slug>.js` for every row (it prunes a stale file after a slug rename — never leave two files with one id). EN titles: distinct across the family AND the band (`node i18n/build-en.js` lints band-title uniqueness; leave `i18n/strings.en.json` as regenerated — see the nt10-E additions); no "worksheet" in a title; instruction ≤ 150 chars and the instruction/title pair must fit the design's chrome budget.

## Deliverable 2 — base spec + component + bank edits (type-scoped only)
Additive knobs in `types/<band>/<ID>-<key>.js`; new components ONLY in `templates/components-b5/<key>.js` (the namespace loader refuses a duplicate export — check the other `components-b5/*.js` first); new EN bank material in `data/b5/<key>.js` (gitignored; the reviewer force-adds) with `validateBank` extended for every new §5 rule. Nothing outside your family's files: no `enumerate.js`, `render/*`, `emit/*`, `lib/*`, `qa/lints.js`, `templates/components*.js`, `types/_shared/*`, other families' files. If a shared file MUST change, stop and report why.

## Deliverable 3 — the gate grows: `qa/verify-b5-<key>.js`
Every §5 face poison the base deferred now FAILS (with the base + the face configs as controls). Each face renders through the real pipeline at d2 en (`node render/one.js <faceId> <theme|null> 2 en [unit]`) plus the worst legal chrome; floors asserted; `verify()` re-derives from the stamps for every verifiable face (open-ended faces: structure + lints only, as the design says). Print the final line `PASS (N assertions, M/M poisons killed)` or FAIL with exit 1; keep `--quick`.

## Deliverable 4 — distinctness + renders
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=<key>` → must print "every variation differs …" (each face's resolved d2 config ≠ the base's d2 AND ≠ every sibling face).
- `out/dev/<faceId>-<theme|null>-d2-en.png` for all five faces — READ EVERY PNG yourself (a montage is fine) and record what you saw: no clipping, nothing under the footer, floors hold, the face does what its title says.
- `node tools/b3-baseline.js --check --quick` → PASS (paste the line).

## Deliverable 5 — the record: `docs/worksheet-gen/b5-designs/_work/<ID>-faces.md`
Per face: id · kind (PARAM/CODE/HANDWRITTEN) · the knob/override · what the child does · gate assertions/poisons it owns · PNG path · deviations from §3 with the MEASURED reason · per-locale refusals you can already see from the bank shape (these lower `hub-expectations.json` in Phase 4 — say which locale and why) · open items for the panels. Then the gate's final line, the distinctness line, the baseline line.

## Rules
- Do NOT commit. Do NOT re-design: §3 is the contract; where it is unbuildable as written, build the nearest honest face, and say exactly what and why.
- A face must change what the child DOES. A theme swap, a title swap, or a re-statement of the base's own values is not a face (`gate-variation-distinct` is the floor, not the bar).
- Never move a threshold to pass; fix the layout or fix WHAT is measured.
- Write every multi-line script to a file and run it by path (heredocs and `node -e` eat backslashes and backticks).

## nt10-E additions (binding; the base review round paid for each)
- **The base review lessons apply to every face**: (1) SPARSE — max blank band between consecutive content blocks ≤ 40 px at 814/722/677 chromes, top-anchored stage, gated + poisoned both ways (every b5 base gate already has the pattern; extend it to each face); (2) answer-position tells measured per PAGE on the SHIPPED instance, not only pooled across seeds (K-368's shipped base never used slot 1); (3) colour is never tied to sex/gender on any figure; (4) the instruction names ONLY apparatus present on this face's page (K-369 quoted "stop or go" over "wait / walk" cards) — gate it; (5) every drawn thing must read instantly to a child at its SMALLEST used size, in colour AND greyscale (G1-378's Earth read as footprints) — READ the renders.
- **FILL**: a face whose content ends high on the page (≥ 15 % of the body empty below it at the 814 chrome) is a defect even when no band inside it exceeds 40 px — grow the hero element and the rows (the plants F4/F5 review). Gate: content bottom ≥ 85 % of the body at 814, still inside the body at 677, poisoned both ways.
- The loader is `lib/b5-common.js bank(name, loc)` over `data/b5/<name>.js`; shared b3/b4 libs and other families' files are read-only.
- The release baseline was re-captured after all ten b5 bases were committed (`out/b3-baseline.json`); `node tools/b3-baseline.js --check --quick` must print PASS (the base stays byte-identical). The 50 face ids are the accepted drift at the Phase E close — do not `--capture`.
- Refused locales are data: record in `_work/<ID>-faces.md` any face a locale's bank shape cannot carry (the finals already list digraphs es/it/sv/da/no, pt F4; word-parts es/fr F4, fi F3) and make the spec THROW for them.
- Printable decks ship NO answer key: no face string promises one.

