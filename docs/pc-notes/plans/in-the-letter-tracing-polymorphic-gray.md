# Lowercase letter-tracing worksheets — a new family, surfaced on /worksheets

## Context

`data/tracing/letter-sets.js` has always been **capitals-only**, and its header says why:

> *"Caps only — capital letterforms are school-safe in a rounded display font, while
> lowercase-with-stroke-arrows needs a per-glyph stroke database (a deliberate later
> commission)."*

That commission landed with the centerline rebuild (`e6e7d865`). The stroke database already
covers **all 26 lowercase letters plus 25 accented forms**, with the single-storey school `a`
and `g`. The blocker is gone, so the half of the alphabet a K-3 child actually writes most can
ship — and lowercase carries formation problems capitals do not have (ascenders, descenders,
the x-height band, and the b/d/p/q reversal set).

The operator asked for these pages, and specifically that they appear on
**`/en/worksheets` the way the uppercase pages do**. That is a *separate* mechanism from
publishing decks: a published landing alone does not put a page on the hub.

### Decisions taken (this session)
1. **Its own family card** — a new `lowercase-letter-tracing` exercise-type, full parity with
   the uppercase card, not chips buried under it.
2. **German gets `ä ö ü ß`** — ß is a real lowercase letter with no capital form, so the
   uppercase page structurally could not carry it. One new glyph to author.
3. **English first, then fan out** — ship the engine + 6 EN types + 6 EN landings + the hub card,
   live on `/en/worksheets`, before 60 more landings of native prose are authored.

---

## What is already verified (measured, not assumed)

- **Glyph coverage.** Mirroring the existing per-locale caps sets, exactly **two glyphs are
  missing** across all 11 locales: `ñ` (es) and `æ` (da/no). Everything else — the 26 letters,
  `ä ö ü å é è ê ø` and the `ij` digraph — already resolves.
- **The lane exists in two halves.** `strokeLetterLane` has the guides but **caps** metrics
  (`heightUnits = base − capTop`, dotted rule on the crossbar line 48). `strokeWordLane` has
  exactly the **lowercase** metrics (`heightUnits = base − ascender`, ink from ascender 14 to
  descender 96, dotted rule on the true x-height 44) but no guides. A lowercase lane is the
  first with the second's four values — a flag, not a new emitter.
- **Types are auto-discovered** by directory scan (`lib/load-types.js`) — no registry file.
- **Free ids:** `K-278…K-283` (append after the highest used, K-277, and sit directly after the
  tracing family). `K-215…K-220` is the only other free block; it belongs numerically to the
  science/literacy 201-214 run, so it is the worse choice.
- **`gen-var-specs.js` cannot make a base type.** It only emits `{...base}` spread modules with
  no code. It also stamps ONE param set into all three difficulties, while the letter base needs
  three distinct ones. So the base is hand-written; the five variations are ROWS.
- **Hub surfacing = `scripts/seo-landing/gen-var-highlights.js`**, which regenerates
  `frontend/config/worksheets-new-highlights.ts` from two hand-maintained maps, `BASES` and
  `GROUPS`. It resolves a deck slug as `famSlug(family) + '-' + id.toLowerCase().replace('-','')`
  (→ `letter-tracing-k238`, exactly what the live hub links) and maps it to a landing through the
  locale's corpus. **A variation with no published landing is silently omitted** — landings must
  exist first, or the strip renders empty and nothing errors.

---

## Implementation

### 1. Glyph layer — `data/tracing/letter-strokes.js` (small)

- `ñ` → one `COMPOSED` entry `['n','tilde']`. Both parts already exist (`Ñ` uses that tilde).
- `æ` → one new lowercase ligature, the x-height sibling of the existing `Æ`, built from the
  same `line()` primitives against the x-height band (44…84).
- `ß` → one new glyph. Grundschule Druckschrift form: an **ascender-height** stroke (top 14)
  with the bowl on the baseline. No capital counterpart exists, which is the whole point.
- The accent layer already handles the lowercase band; no change to `markStrokes`.

### 2. Data — lowercase letter sets

Add `LOWERCASE_SETS` to `data/tracing/letter-sets.js` (a real documented export, not derived
inline at the call site). Base rule: lowercase each locale's existing `alphabet` + `specials`,
which preserves every ruling already made there — es keeps `ñ` in alphabetical position, it keeps
its 21-letter alphabet, nl keeps the digraph as `ij`, pt keeps `k w y` as its specials.
**One override:** `de` appends `ß` to both `alphabet` and `specials`.

### 3. Lane — `primitives/trace-path.js`

`strokeLetterLane({ …, lowercase })`. When set, take the four values `strokeWordLane` already
uses — `heightUnits: LM.base − LM.ascender`, `inkTop: LM.ascender`, `yTop` at the ascender,
`yMid` at `LM.xTop` — while keeping the guides (start dot, arrow, badges) and the
designed-box centering. Nothing else changes; the guide, collision and badge code is untouched.

### 4. Types — 1 hand-written base + 5 generated variations

`types/k/K-278-lowercase-letter-tracing.js` spreads `K-238-letter-tracing.js` and overrides
`id`, `slug`, `exerciseType: 'lowercase-letter-tracing'`, `difficulty` (its own three levels,
each carrying `lowercase: true`) and `i18n`. `K-238`'s `build()` gains a `d.lowercase` branch
that selects `LOWERCASE_SETS` and passes the flag to the lane — the two families then share one
`build`/`verify`, which is what keeps this small.

Then five ROWS in `tools/gen-var-specs.js` over that base, mirroring K-254…K-258 exactly
(`from`/`count`/`pool:'rest'`/`toEnd`/`from:'specials'`), each with `lowercase: true` in its
params and `extra: { exerciseType: 'lowercase-letter-tracing' }`.

EN titles must be **unique per grade band** (`build-en.js` throws otherwise) and must not read as
near-duplicates of the caps titles:

| id | title |
|---|---|
| K-278 | Trace the Lowercase Letters |
| K-279 | Trace the Lowercase Letters g to l |
| K-280 | Trace the Lowercase Letters m to r |
| K-281 | Trace the Lowercase Letters s to z |
| K-282 | Trace the Lowercase Vowels |
| K-283 | My First Small Letters |

⚠ `gen-var-specs` resolves `instruction: null` by **copying the base's text at generate time**,
not at runtime — so the variations must be regenerated whenever the base instruction changes.
Its docblock template also says *"variation of &lt;base&gt; (same family: …)"*; that string will name
the lowercase family correctly only because the base carries the new `exerciseType`.

### 5. Registration (EN pass)

- `frontend/config/topics-taxonomy.json` — new `axes['exercise-type']['lowercase-letter-tracing']`
  (`slug.en` + `name.en`) and the `apps.*` entry (`default_subject:'letters'`,
  `default_age_range:'5-7'`, `exercise_type_axis_key`), per `tools/register-nt20-taxonomy.js`.
  **EN-only** for this pass — `gen-var-highlights` and the landing generator both fall back to
  `.slug.en`, so non-EN is not blocked. ⚠ The `apps.*` key must equal the emitter's literal
  `spec.exerciseType`; the taxonomy file records a past drift (`picture-sudoku` vs `sudoku`).
- `i18n/skill-sentences.en.json` (`{full, short}`) + `frontend/messages/en.json`
  `topicMeta.lowercase-letter-tracing`, per `tools/register-nt20-en-content.js`.
- `node i18n/build-en.js` — regenerates `strings.en.json` and **throws on a per-band EN title
  collision**, which is why the six titles above are worded distinctly from the caps set.
  ⚠ Titles must not contain the word "Worksheet" — the engine appends it.
- `node i18n/lint-locale.js en` — 0 errors.
- A wave file for the 6 types × `en`, then `cli.js generate --wave … --types=K-278,…,K-283`.
  **New decks → INSERT**: no updates-manifest. Read `_summary.txt` for `failed: 0` — a failing
  `verify()` writes no ZIP and does not abort the wave. Publish via
  `publish-cli/publish-wave.js` per §21.2.

### 6. Landings + the hub card (what the operator actually asked for)

- Add the 6 ids to the inline `TYPES` table in `scripts/seo-landing/gen-nt20-landings.js`
  (`{ family:'lowercase-letter-tracing', theme:null, band:'K', standard:'L.K.1.a' }`), author the
  EN prose bank, and run the generator. It derives coordinate / `canonicalDeckSlug` / carousel /
  slotTokens and **refuses before any write** unless: every field present, `p1+p2+p3 ≥ 200`
  words, slug ASCII-kebab and unique against the whole existing corpus, `metaDescription`
  120–175 chars, `title` ≤ 75.
- Add `'K-278': { family:'lowercase-letter-tracing', theme:null }` to `BASES` and the five
  variation ids to `GROUPS` in `gen-var-highlights.js`, re-run, commit the regenerated
  `frontend/config/worksheets-new-highlights.ts`, and **deploy** — it is a frontend config, so
  the card appears only after a build. Watch its output for `no base landing for K-278`.

⚠ **Why the strip is not optional.** The hub's default sort is `interleaveByAxis`, which orders
buckets by **descending size** — a brand-new family is the smallest bucket and lands on page 2-3
of a 24-per-page grid. That is the recorded failure from commit `538b7cff`
(*"I cannot find them on the main worksheets page"*). The strip is the fix, and it renders **only
in the bare hub state**: `!browseActive && page === 1 && sort === 'variety'`.

⚠ **Re-run the robots map after the landings land.** `publish-wave` STEP 7b
(`gen-deck-noindex-exempt-map.js` + nginx reload) noindexes decks that HAVE a `/worksheets/`
landing and exempts those that do not. Publishing decks before their landings therefore marks
them indexable; the boundary only moves back once the map is re-run.

**Standard + cannibalization.** Both families legitimately claim **L.K.1.a** ("print upper- and
lowercase letters"). Per §22.1 that is the *same-code, different-query-face* case, and the
similarity gate (FAIL ≥0.80) is the arbiter. Lowercase landings are the closest possible sibling
to the caps landings, so expect elevated similarity by construction — and fix it the way §22.1
requires, with **mode-true pedagogy** (x-height band, ascenders and descenders, the b/d/p/q
reversal set, letters that start below the top line), never with manufactured divergence and
never by moving the gauge.

---

## Critical files

| File | Change |
|---|---|
| `scripts/worksheet-gen/data/tracing/letter-strokes.js` | `ñ` composition; new `æ`, `ß` |
| `scripts/worksheet-gen/data/tracing/letter-sets.js` | **NEW** `LOWERCASE_SETS` export (de +ß) |
| `scripts/worksheet-gen/primitives/trace-path.js` | `strokeLetterLane({lowercase})` |
| `scripts/worksheet-gen/types/k/K-238-letter-tracing.js` | `d.lowercase` branch in `build()` |
| `scripts/worksheet-gen/types/k/K-278-lowercase-letter-tracing.js` | **NEW** hand-written base |
| `scripts/worksheet-gen/tools/gen-var-specs.js` | 5 ROWS → K-279…K-283 |
| `frontend/config/topics-taxonomy.json` | new exercise-type family (EN) |
| `scripts/seo-landing/gen-nt20-landings.js` | 6 entries in the inline `TYPES` table |
| `scripts/seo-landing/gen-var-highlights.js` | `BASES` + `GROUPS` entries |
| `frontend/content/seo-landing/en.json` | 6 landing entries (generated, not hand-edited) |
| `frontend/config/worksheets-new-highlights.ts` | regenerated |
| `scripts/worksheet-gen/i18n/skill-sentences.en.json` + `frontend/messages/en.json` | family EN content |
| `scripts/verify-letter-strokes.js` | extend coverage to `LOWERCASE_SETS` |

**Reused, not rewritten:** `strokeWordLane`'s metrics, `renderTextRep` / `placeBadge` /
`schoolLines` / `textLaneGeometry`, K-238's `build`/`verify`, `gen-var-specs.js`,
`gen-nt20-landings.js`'s validation contract, `gen-var-highlights.js`, `cli.js --types`.

---

## Verification

1. **`verify-letter-strokes.js` extended** to the lowercase sets and re-poisoned — check B must
   assert the new glyphs' metrics (ß's ascender, æ's x-height), and check D (no parallel-offset
   strokes) must still pass. A new glyph that fails the metric check is the point of the gate.
2. **Every type × d1/d2/d3 rendered**, QA lints + `verify()` clean.
3. **I read the renders myself** — specifically the de `ß` page, the da/no `æ` page, the es `ñ`
   page and the nl `ij` digraph, plus one plain a-f page against a caps page side by side to
   confirm the x-height rule and the descender clearance.
4. **Publish the EN wave**, `_summary.txt` `failed: 0`, then `audit-deck-html.js` (auto).
5. **`gate.js` on `en.json` — BOTH sections, not just the similarity verdict.** §4.B lint
   (≥200 words, banned-phrase list, slot-token present in P1) AND §4.C similarity. Grepping only
   the similarity line once shipped 10 lint failures. Report the actual numbers against the caps
   landings; **never move the gauge** (§22.5).
6. **`verify-hub-autobind.js --locale=en --type=lowercase-letter-tracing`** — the rendered-DOM
   verifier; **LEAK must be 0** (no deck-page link stuck at `/en/decks/` when a landing exists).
   curl cannot see this: the grid is hydration-gated (§A.13.50).
7. **`curl https://www.lessoncraftstudio.com/en/worksheets`** in the bare state and confirm the
   lowercase card AND its pill strip render — the operator's actual request, and the step that
   fails silently if the landings are not in place first. Also spot-check
   `/en/worksheets/<slug>` and `/en/topic/lowercase-letter-tracing/` at 200. Mind the
   Cloudflare 5-min TTL.
8. **Re-run the robots-map** and confirm the 6 new decks are noindexed now that they have
   landings.

## Out of scope for this pass

- **The 10 non-EN locales** (60 landings + `apply-var-locale.js` `TYPE_IDS` + per-locale
  taxonomy slugs) — pass 2, after the EN shape is approved.
- Lowercase **sight-word** or cursive variants.
- Backfilling `ß`/`æ` into any capital page (no capital ß exists; `Æ` already ships).
