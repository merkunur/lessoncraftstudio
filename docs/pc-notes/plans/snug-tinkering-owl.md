# nt20-B-VAR — pedagogically distinct variations of the 20 batch-2 worksheet types, ×11 locales

## Context

On 2026-09-02 the **nt20-B** batch shipped 20 new printable worksheet types × 11 locales
(220 decks + 220 landings, 17 new family keys). Each type has exactly **one** published face per
locale — the wave ships `difficulties: [2]` only, so every spec's authored d1 and d3 have never
been published.

The operator asked for each type to be expanded with pedagogically meaningful variations,
natively rebuilt in all 11 languages (~100 faces = **1,100 worksheets**), targeting ≥1,000
clicks/day, with the standing requirement that clicking a worksheet type in the
`/[locale]/worksheets` sidebar lists **every** sheet of that type.

This is the **nt20-VAR** arc (2026-09-01) re-run against the b2 machinery. Its rulings and traps
are the template.

---

## Operator decisions taken during planning

1. **Demand-weighted allocation**, not uniform 5-per-type — each type gets as many faces as it
   can *honestly sustain*, with the remainder going to types teachers actually search for.
2. **The Finnish `articles` family is re-targeted to partitive vs nominative**
   (`yksi omena / kaksi omenaa`), fixing a live collision with fi `singular-plural`.

---

## What the research established

### The pedagogy pass ratified a face ladder per type, and cut 24 of my draft faces

Grounded in the actual spec files, primitives and locale data banks — not prose. Headlines:

- ⭐ **A theme swap is never a face.** `enumerate.js` already fans themes as an orthogonal
  published axis (`themesPerType`), so a "second theme" face ships the same teaching page twice
  and burns a slot. **All 9 theme-fan faces cut.** (This also answers the quality bar directly.)
- **73 of 100 faces are PARAM** — a ~10-line module spreading the base and overriding
  `{id, slug, difficulty, i18n}`; **none of the 113 shipped VAR files overrides `build`**, so
  PARAM faces carry near-zero regression risk. **27 need CODE** (13 distinct additive changes).
- Faces cut because they **already ship**: "colour ALL the named noun" *is* the current
  read-and-colour page; "multi-colour mystery" *is* the current grid-coordinates page;
  number-line "jumps of 10" is shipped G1-118/119; "halfway" is d3; grid-copy "mirror" duplicates
  the shipped G2-253 symmetry family; calendar "which month"/"different month" are literal
  re-rolls (the month is already randomised per seed).
- **Measured constraints**, not assumed: a 30-dot dot-to-dot would randomly throw (only 9 of 16
  figures resample to 30 dots at the ≥22 px gate); calendar `questions[]` cannot repeat a kind;
  unscramble question frames number only 3–4 per locale and **0 in fi**.
- **Three faces must be filed in a different band than their parent type**: write-the-article is
  G1 (L.1.1.h), number-of-the-day-to-999 is G2 (2.NBT.A.1), number-walls-to-50 is G2 (2.NBT.B.5).
  The id prefix sets the band, so each takes an id from its true band's block.
- **Two honesty flags worth surfacing**: a word-bank-bearing write-the-word page is *matching*,
  not encoding, so faces 1–2 should read `readiness` rather than L.1.2.d; and CCSS has **no
  parts-of-speech identification standard**, so word-classes should read `readiness` rather than
  claiming L.1.1.b/e.

### The SEO pass says the click target will not be met by this batch

Honest central estimate **~140 clicks/day at 12–15 months** (band 90–220), not 1,000. The
required average is 0.91 clicks/page/day, while the best cell in the whole 20×11 demand matrix
(number-lines in es/pt) models at ~0.30 — nothing overshoots, so nothing can carry anything.
Cross-checked from the impressions side: for 1,100 pages (3.5% of the page count) to deliver
1,000 clicks/day they would need ~15× the entire site's current daily impression volume.

**What I verified myself rather than repeating** (a doc we wrote is not a fact — least of all a
two-month-old one):
- ✅ **The blog is still 410** — `/blog` and `/en/blog` both return 410 live. 100+ posts of
  earned authority being discarded. *(CLAUDE.md §21.8 records this as a deliberate
  operator-deferred decision, so I flag it rather than reopen it.)*
- ❌ **The claimed PDF "infinite redirect loop" does not reproduce** — `/en/decks/<slug>/`,
  `/printable.pdf` and `/<slug>-printable.pdf` all resolve **200**. Not repeating that finding.
- ⚠️ I could not reach Search Console, so "~11–15 clicks/day today" stays an unverified doc claim.

**The batch is still worth building** — ~140/day from 1,100 well-targeted long-tail pages is a
good marginal return, and it is genuine catalogue completion for K-3 teachers, which was the
first-stated goal. But ≥1,000/day is a property of the **31,673 landings already live** reaching
maturity, not of adding 3.5% more pages. I will not pad the estimate to hit the number.

**A cheaper lever found along the way:** the corpus converts ~1,890 impressions → ~15 clicks
(**0.79% CTR at avg position 8.2**, where par is 2.5–3.5%). Repairing CTR on the worst decile is
worth ~+32 to +51 clicks/day — a quarter to a third of this entire batch at a fraction of the
cost. It needs a GSC export and must **not** be a mass rewrite (two corpus-wide title rewrites in
two weeks are named among the events that damaged trust).

---

## The allocation

Demand-weighted, **capped by the honest ceiling** the pedagogy pass established for each type
(the approved option's own wording: "as many as it can honestly sustain"). Where a type's demand
target exceeds its honest ceiling, the surplus flows to the next type with real headroom; if the
total lands under 100, that is the honest number and I will report it rather than pad it.

| Faces | Types |
|---|---|
| **10** | number-lines *(all-PARAM ladder; the carry type — ~310 autocomplete hits across all 11 locales)* |
| **8** | money *(`kinds[]` is a difficulty key → all-PARAM)* · word-problems *(`ops[]` likewise)* |
| **7** | word-tracing · dot-to-dot |
| **5** | number-walls · doubles-halves · singular-plural · read-and-colour · write-the-word · capitals-punctuation · word-classes · articles |
| **4** | alphabetical-order · grid-coordinates |
| **3** | number-of-the-day · picture-writing |
| **2** | sentence-unscramble · calendar · grid-copy |

⚠ **Number-lines is the one cell where demand and honest-fit are in tension**: the pedagogy
ladder is 5 clean PARAM faces (0–10 · 0–20 · 0–50 by ones · 0–100 by fives · 0–100 by tens
sparse), and the two obvious extras were cut as duplicates of shipped types. Reaching 10 needs
axes verified at the ledger-lock (count-back split, sparse-label density, band-adjacent ranges) —
if fewer than 10 survive honest-fit, the surplus moves to money/word-problems/word-tracing.

Id blocks: **K-289… · G1-250… · G2-280… · G3-371…**, allocated per type by its final count, with
band-corrected faces taking an id from their true band's block.

## The differentiation rule — one axis per face

Not invented: the live 7-face `money` family already ships exactly this (verified in `de.json`:
`rechnen-mit-geld` → `muenzen-zaehlen-erste-schritte` → `geld-zaehlen-alle-muenzen` →
`muenzen-zaehlen-uebungsblatt` → `zaehlen-mit-1-und-2-cent` → `welcher-geldbeutel-hat-mehr` →
`einkaufen-und-bezahlen-2-klasse`), and `word-problems` mirrors it.

**The published base keeps the naked genre head and never moves.** Every variation adds
**exactly one** axis token — ENTRY · SCOPE · SPLIT · PRACTICE · THEME · BAND — appearing in all
four surfaces: slug, H1, the title's **first 50 characters**, and p1's mechanic description.
Priority 3→2→1→4→5→6, skipping any axis that fails honest-fit. No two faces in a family share an
axis; no variation ships the bare head (that is the base's query — the one fatal case).
Keyword heads are **inherited verbatim** from the 220 base landings, never re-derived.

### Reframes required (types with no native genre outside one or two locales)
`number-of-the-day` (a US teacher-blog format — 0 autocomplete hits in all 11 locales → reframe
to place-value/decomposition) · `number-walls` (a German/Dutch staple only → addition-within-20
elsewhere) · `calendar` (SERP dominated by people wanting a printable calendar → reframe to
days/months) · `grid-copy` (a real genre only in fr/it). ⚠ **fr must not use `coloriage magique`**
for read-and-colour — it means colour-*by-number*, a family already live in the corpus.

### Title/meta patterns
Grade-led **en, es, pt, fr, it**; range-led **de, nl, sv, da, no, fi**. ⚠ ~550 of the 1,100 pages
are non-numeric, and there the range-led locales **fall back to band-led** (`1. Klasse`, `groep 3`,
`åk 1`) — never invent a range. ⚠ de (45 chars) and fi (47) are budget-critical after their
protected free/print/PDF trio: drop the theme first, then the qualifier, never the trio.

---

## How the hub requirement is satisfied (measured, not assumed)

Two separate mechanisms — conflating them is what failed before:

1. **The type-filter path already works.** `?type=<family>` keeps every row with
   `coordinate.type === family`, interleaves by theme, paginates at 24. Rows = landings **plus**
   every `collapseSiblings` deck that resolved a DB title (`worksheets-sheets.ts`, no allowlist).
   nt20/VAR/b2 landings declare no `collapseSiblings`, so the relation is 1:1 → **every variation
   needs its own landing, and then it shows.**
2. **Page-1 reach does not solve itself.** Measured on en: the 24th-largest bucket has 48 rows;
   the nt20-B families sit at 1. Even at 6 they rank ~39–53 of 71. **The strip is the only
   mechanism** — add the 20 `GROUPS` entries to `gen-var-highlights.js` (145 → ~245 links).

---

## Two pipeline gaps this batch must close

- **No cross-variant similarity gate exists for deck titles/descriptions** — uniqueness is
  *exact hash* only, so five near-identical variations pass every gate. Compounding it: the
  description's skill sentence is resolved from the **family** key, so all faces of a type share
  it, and the per-type-id **`instruction` is the only per-variation sentence** feeding the meta
  description. Add a gate reusing the metric in `gate-teaching-similarity.js` (word-3-gram
  Jaccard, FAIL ≥0.80), and brief panels that the instruction must say what is different about
  *this* page.
- **`scan-desc-band` does not exist**, and `preband-staged-descriptions.js` *skips*
  `printable_only` ZIPs (they are banded at emit time). A short-titled variation therefore reaches
  publish and HALTs with `DESCRIPTION_LENGTH_TOO_SHORT` *after* upload. Add a read-only staged-ZIP
  scanner (adm-zip → `extract-html-meta.js` → length assert) run before any SCP.

---

## Execution sequence

**Phase 0 — freeze.** Add the 20 b2 base ids to `b2-baseline.js TYPES` (currently absent, though
this batch edits shared b2 surfaces), then `--capture`. Re-run `--check` after every shared edit.
*Baseline is currently clean: 513 coordinates, 0 drift.*

**Phase 1 — ledger-lock.** Per type: confirm the final face list against the ratified ladder,
resolve the number-lines headroom question, and run `check-sum-ceiling.js` at every
quantity-defined grade boundary. The cap governs the **operation**, not every numeral: number
walls are 1.OA.C.6 so sums stay within 20 at G1, whereas number-of-the-day is place value (1.NBT)
and may legitimately carry two-digit numerals.

**Phase 2 — specs.** `tools/gen-b2var-specs.js` (clone of `gen-var-specs.js`) emits the PARAM
faces. The 27 CODE faces are hand-written, each an **additive-with-fallback** knob on the base
plus a `verify` branch, proven inert by the baseline check.

**Phase 2b — render sweep (non-negotiable).** Produce `out/b2var-sweep/<ID>-<theme>-d2-en.png`
for every face before briefing anyone. **Brief the panels from the GENERATOR, never from prose** —
a spec-reading panel once made 74 false claims, and a panel that reads the source may overrule the
brief.

**Phase 3 — locale content.** `{title, instruction}` × faces × 11 via native 3-agent panels,
each panel writing its own draft file, validated, applied to `i18n/strings.<loc>.json`.
⚠ `lint-locale.js` enforces title uniqueness **per band** — the new K titles compete with 149
existing K titles per locale. ⚠ Every variation needs its own honestly-scoped title: I found the
existing d1 dot-to-dot render headed **"Dot-to-Dot 1 to 20"** while carrying only dots 1–10.

**Phase 4 — waves + build.** `gen-b2var-waves.js` → wave JSON × 11 with **`themeOverrides`
pinned for every type** (never positional round-robin — that cost an 11-locale republish last
batch). Then `node cli.js generate --wave …` → `out/staging/<waveId>/*.zip`. Gate before upload:
desc-band scanner · title/description similarity gate · `lint-locale.js`.

**Phase 5 — publish (Hetzner).** `publish-bulk --dry-run` → `--confirm` (space-form flags) →
capture the **measured** slug list from the confirm log → `regenerate-og-images.js --slugs-file=…
--locales=<all 11>` → `populate-and-inject-hreflang.js --confirm --locales=<all 11>` →
`audit-deck-html.js --slugs-file=…`.
⚠ `--locales` defaults to `en,es,pt` on three of those — passing only the wave locale is a silent
no-op; retrofit flags need `=` form; `audit-deck-html.js` OOMs without `--slugs-file=`.

**Phase 6 — landings, 100% coverage.** `gen-b2var-landings.js` (clone of `gen-b2-landings.js` —
the only composer that reads each wave's `themeOverrides`, which the sv/da/no themes depend on).
Native panels write `.landing-b2var-<loc>.json`, split ~4 files × ~25 keys. Composer enforces
≥200 words, meta 120–170, title ≤75, slug uniqueness. Gate with `gate.js` on a **hand-cut subset
file** — the full en corpus is O(n²) over ~4,000 pages and will not finish.

**Phase 7 — hub + post-publish.** 20 `GROUPS` entries in `gen-var-highlights.js`, resolved against
the **measured** published slug list, with expected counts **derived from the row table** (a
hand-written count certifies a subset — its own poison test once passed at 7). Then deploy →
`repoint-deck-canonical.js --types=<the 20 families> --locale=<each>` →
**`refresh-deck-noindex-exempt.sh`** (adding landings *removes* those decks from the exempt set;
the map fails toward noindex) → `indexnow-submit.js`.

**Phase 8 — verify.** Below.

---

## Files created / touched

**New** (clones of proven originals): `tools/gen-b2var-specs.js` · `tools/gen-b2var-waves.js` ·
`tools/validate-b2var-draft.js` · `tools/apply-b2var-locale.js` ·
`scripts/seo-landing/gen-b2var-landings.js` · `scripts/publish-cli/scan-staged-desc-band.js` ·
`scripts/publish-cli/gate-deck-title-similarity.js` · three `docs/worksheet-gen/b2var-*.md` briefs ·
the ~100 spec modules under `types/{k,g1,g2,g3}/`.

**Modified** (all additive): `tools/b2-baseline.js` (TYPES) · `gen-var-highlights.js` (GROUPS +
derived assertions) · base b2 specs and primitives **only** for the 27 CODE faces ·
`i18n/strings.<loc>.json` ×11 · `frontend/content/seo-landing/<loc>.json` ×11 ·
`frontend/config/worksheets-new-highlights.ts` (generated).

⚠ `scripts/worksheet-gen/data/` is **gitignored** — new data files need `git add -f`.

---

## Verification

- `b2-baseline.js --check` → 0 drift across the 220 live b2 decks.
- `lint-locale.js <loc>` → exit 0 for all 10 non-EN.
- Staged-ZIP scanners: 0 out-of-band descriptions; 0 similarity FAILs.
- `gen-b2var-landings.js <loc> <file> --dry-run` → `dry-run ok` ×11 before any apply.
- `gate.js` on the subset file → 0 FAIL, 0 duplicate titles/metas, ×11.
- `audit-deck-html.js --slugs-file=` → all new decks clean.
- ⚠ **Verify the rendered DOM, not curl** — the deck grid is hydration-gated, so curl reports 0
  links on a good page. `verify-hub-autobind.js --locale=<loc> --type=<family>`.
- ⚠ **Re-query `landings.length` per locale before and after — never an additive tally.**
- Rendered hub check ×11: `?type=<each of 20>` lists every face; bare hub page 1 shows the strip
  at its full link count; a poison run (drop one row) must FAIL the gate.
- Visual critic over the `b2var-sweep` contact sheets; **I read the 360/768/1024 renders myself.**

## Known hazards, each already paid for once

- **The session usage limit kills every running agent at once.** Launch **≤4 panels at a time**
  and check for on-disk drafts before relaunching; a resumed agent keeps its original model.
- A **"commit, no deploy" batch does not stay undeployed** — any later `deploy.sh` carries the
  whole branch. Verify live state rather than trusting a deferred-deploy note.
- Run `deploy.sh > log 2>&1; echo EXIT=$?` — never pipe to `tail`, which hides the exit code.
- Hetzner `git pull` needs `git config http.version HTTP/1.1` (already set).
