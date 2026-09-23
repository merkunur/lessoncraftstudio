# Role brief — PEDAGOGY + CONTENT agent (one per type; writes `_work/<ID>-pedagogy.md`)

Read first: `_STUDIO-BRIEF.md` → `_SUBSTRATE.md` → your type's entry in `_PANEL-FINDINGS.md` → the final design files of the nt20-C / nt10-D neighbours named in your type's Boundary (`../b3-designs/<ID>-<key>.md`, `../b4-designs/<ID>-<key>.md`) and the four selection reports `_work/_selection-*.md` (per-locale heads, traps, refusals) → the existing specs your Boundary names (`scripts/worksheet-gen/types/<band>/<ID>-*.js`, read `build()` AND `verify()`). Measure every pool you cite with read-only node over `scripts/worksheet-gen/cache/manifest.json`, `lib/b2-common.js entriesFor(theme, loc)`, `lib/b3-common.js bank('instructions', loc).objForms`, `data/science/*.json`, `data/b2/sentences.js`. Write NOTHING outside your output file; scratch under the session scratchpad with a `<ID>-` prefix.

Deliver `_work/<ID>-pedagogy.md` with these sections (letters, terse, numbers measured):

**Boundary (load-bearing).** The existing ids this type must not duplicate and the MOVE it therefore owns (one paragraph).

**A. Identity.** Table `| loc | genre head (from _PANEL-FINDINGS) | school year (brief band table) | national strand (framework NAME) | CCSS (en only, honest) |` ×11. Theme axis: themed (which themes qualify, min nouns per theme, measured) / fixed theme / themeless via `b3-picture-index`. `unitAxis` if the type fans on a non-theme unit. The one rule that locks the type (e.g. "the answer is a bank literal keyed by (gender, number)").

**B. The six faces.** Base + F1..F5, each: `### Fn: Title (band, ID-band TBD, PARAM|CODE knob)` · **Move:** what the child DOES that differs · **Child:** the concrete task in one sentence a child understands (= the instruction candidate, ≤150 chars, names only apparatus on the page) · **Params:** d1 / d2 (ships) / d3 as resolved config keys (guards key on the CONFIG) · **verify():** what is stamped (`data-lcs-*`) and how the one answer is re-derived; or "open-ended: no verify" · **Refusals:** per locale, with the measured reason (pool below floor, grammar, notation, curriculum) · **Query face:** the sub-head this face owns. Then **Rejected non-moves.** (one line). A face unbuildable in ≥4 locales is replaced, not kept.

**C. Native rebuild ×11.** Table `| loc | literals the panel authors (counts) | slots/forms needed and where they already exist (objForms key) | refusal/re-target | traps |`. Frames never inflect; every inflected form is a literal.

**D. Data + gates.** The bank shape (fenced), which existing bank it reuses, the validator rules (numbered) and ≥10 poison cases (each must FAIL; the correct draft is the control), plus what `qa/verify-b5-<key>.js` asserts on the render (floors, uniqueness, no answer printed, the 722 stack).

**E. SEO.** Six title patterns (Germanic / Romance / Nordic + fi) + six meta MIDDLEs (the child's instruction, 120-170 whole), the `coordinate` per face (`mode` string, level key, theme or `''`), and the non-cannibalisation pairs (face vs face, face vs the Boundary ids) with an estimated 3-gram Jaccard.

**F. Open questions + summary.** What the engineer must measure; what only a native panel can rule.
