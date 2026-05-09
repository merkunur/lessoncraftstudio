# `[ARC][SEO][DECK-PAGE]` Phase 1 — finding-class taxonomy + remediation strategy

**Type:** docs-only deliverable per commission spec §2 Phase 1; finding-class diagnosis with failure-shape characterization
**Generated:** 2026-05-09
**Predecessor:** Phase 0 substrate audit at `docs/SEO/deck-page-arc-phase-0-substrate.md` (commit `ad0e49c7`)
**Operator-locked decisions in scope:** 5-item adjudication batch (single-pass / es_MX BCP-47 / Option A retrofit / N≥3 inbound floor / Tier 3+da NSR-flag scope)

---

## §1 — F1 canonical-redirect taxonomy

### Failure shape

Per Phase 0 reconciliation, F1 fires only on apex-form OR no-trailing-slash URLs — substituted www-form trailing-slash canonicals resolve direct HTTP 200. F1 is therefore narrower than commission spec §0 framed.

### Diagnostic candidates (3 source classes)

| Source | Description | Probable cardinality |
|---|---|---|
| **(a) Pre-`6fb6ee3d`-retrofit residue** | deck.html files published before commit `6fb6ee3d` may have apex-form `<link rel="canonical">` content; retrofit script `scripts/publish-cli/rewrite-canonical-host.js` ran but coverage may be incomplete | Phase 1 spot-check: 0/3 sampled decks (de/sudoku, de/addition-image-image, en/pattern-train-winter) carry apex-form residue → small-sample evidence retrofit ran cleanly |
| **(b) Internal-link emission sites** | Any frontend code emitting deck URLs in apex form (vs www form) | Phase 1 grep for `lessoncraftstudio\.com/.*decks` patterns surfaces 12 referrer files (per Phase 0 §6); spot-check confirms all use www form via `${process.env.NEXT_PUBLIC_SITE_URL}` or `BASE_URL = 'https://www.lessoncraftstudio.com'` constants |
| **(c) External-referrer apex links** | Out-of-tree backlinks from external sites using apex form; trigger 1-hop redirect through Cloudflare → www | Out-of-scope for this arc; not under code-side control |

### Predicate-implementation specification

Per concern 4 lock — split into two predicates:

**Publish-time predicate (parser-level):** at `seo-reconciliation.js: reconcileCanonicalURLPattern(manifest, opts)`:
- Parse the rendered post-substitution `<link rel="canonical" href="...">` from deck.html
- Match exactly against pattern `https://www.lessoncraftstudio.com/<locale>/decks/<slug>/`
- HALT classes: `CANONICAL_APEX_FORM` (host = lessoncraftstudio.com without www) | `CANONICAL_NO_TRAILING_SLASH` | `CANONICAL_WRONG_LOCALE` | `CANONICAL_WRONG_SLUG`

**Post-publish predicate (production-side curl):** at Phase 4c verification:
- Curl every published canonical URL; assert HTTP 200 + zero redirect chain
- Failure mode: log to `_phase_4_production_verification.txt`; halt-class for new publishes

### Phase 4a retrofit scope for F1

Bounded — Phase 1 spot-check evidence suggests `rewrite-canonical-host.js` retrofit (commit `6fb6ee3d`) ran cleanly. Phase 4a wider sample (50+ older decks across all locales) verifies; if any apex-form residue surfaces, re-run retrofit script per §15.17 salvage pattern.

---

## §2 — F2 + F3 uniqueness taxonomy

Two structurally distinct uniqueness violations classified per Phase 0 empirical state.

### F3-broader: cross-locale title byte-identical

**Empirical anchor:** `de/sudoku` and `en/sudoku` emit byte-identical `<title>Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio</title>`. The de deck has `<html lang="de">` but the title is entirely English.

**Root cause** at `REFERENCE TRANSLATIONS/catalog-export.js:268 buildSeoHead`:

```js
function buildSeoHead(opts) {
  // ...
  var typeName        = String(opts.exerciseTypeName || '');
  var worksheetWord   = String(opts.worksheetWord || 'Worksheet');
  // ...
  var titleSegments = [typeName + ' ' + worksheetWord];
  // ...
}
```

The `opts` is populated by per-app `extractDeckBundle()` via `t('worksheet')` / `t('seoFreeInteractive')` / etc. Per §17.8.14 srLang-keyed lookup divergence (the canonical root cause class), the `t()` helper's locale-binding diverges per-app:
- `sudoku.html`'s `t()` binds to `currentLocale` (content-correct by accident)
- `cryptogram.html`'s `t()` binds to `uiLocale` (URL-locked; English when URL is en)
- `picture-path.html`'s `t()` binds to `uiLocale` with `currentLocale` fallback

**Diagnosis:** SEO-emission `t()` calls behave inconsistently per-app; for non-English content language with English URL/UI, English literals leak into title + description.

**Failure-shape category:** `LOCALE_RESIDUE_DETECTED` (per Phase 2 doctrine §6 invariant) — predicate: every word in title resolves against the locale's translation surface, no fallback to English.

### F2/F3-narrow: cross-deck same-locale uniqueness collision

**Empirical anchor:** any 2 sudoku decks at the same level emit identical title (template `Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio` doesn't vary across distinct decks). Two Mongolian sudoku decks at kindergarten level → byte-identical title.

**Root cause at template level:** the title template per §17.8.1 = `<Exercise type, capitalized> Worksheet — <Theme, capitalized> — __EDUCATIONAL_LEVEL_LOCALIZED__`. Themeless apps (e.g., sudoku without theme) collapse the title to `<Exercise type> Worksheet — Kindergarten` — multiple decks share this title.

**Failure-shape category:** `TITLE_NON_UNIQUE` + `DESC_NON_UNIQUE` (per Phase 2 doctrine §1 + §2 invariants).

**Themeless-app handling decision:** themeless decks emit identical (app, level) tuples → title overlaps. Mitigation options:
- (i) **Theme-coalescing**: title includes a level-disambiguator OR a per-deck-id suffix
- (ii) **Variant-id appending**: per `slug.js: deriveSeedFromManifest` line 175-185 (already supports `manifest.variant_id` for slug disambiguation; extend to title)
- (iii) **Multi-mode discriminator**: for multi-mode apps, mode appears in title for non-default modes per §17.8.5 default-mode-emits-null pattern

CC pre-recommendation: option (ii) — extend `manifest.variant_id` semantic to title-disambiguator alongside slug. Phase 2 §1 captures the locked decision.

### Predicate composition

Per concern 5 scaling lock — indexed DB query, NOT in-memory full-table scan:

```js
// At seo-reconciliation.js
async function reconcileTitleUniqueness(manifest, renderedTitle, opts) {
  const titleHash = sha256(renderedTitle);
  const existing = await prisma.deck.findFirst({
    where: { language: manifest.language, titleHash, NOT: { id: opts.thisDeckId } },
    select: { id: true, slug: true }
  });
  if (existing) {
    return { category: 'TITLE_NON_UNIQUE', existing };
  }
  return { category: 'CLEAN' };
}
```

**Schema implication:** new `Deck.titleHash` + `Deck.descriptionHash` columns — additive Prisma migration; backfilled from existing decks at retrofit. Compound unique constraint `@@unique([language, titleHash])` enforces structurally; gate redundancy is defense-in-depth.

Phase 3a wire-in: `reconcileTitleUniqueness` + `reconcileDescriptionUniqueness` added as new predicates in `dryRunOneZip` Step 1d.

---

## §3 — F4 inbound-link taxonomy

### Failure shape

Per Phase 0 + Phase 1 deeper-read reconciliation, F4 is a **density gradient**, not absence:

| Deck class | Inbound-link inventory | Total non-sitemap |
|---|---|---|
| **Popular-axis decks** (e.g., `/en/decks/sudoku/` at high-deck-count axis) | sitemap + topic-page + variety-strip + sibling-strip + cross-axis-pivots + BreadthGrid + featured + EmbedViralityCTA + 6 deck-end-suggestions | ~10+ inbound surfaces |
| **Mid-tier decks** | sitemap + topic-page + variety-strip + 6 deck-end-suggestions | ~4-5 inbound surfaces |
| **Long-tail decks (page-1 of paginated topic)** | sitemap + topic-page (page 1) + 6 deck-end-suggestions | ~3 inbound surfaces |
| **Long-tail decks (page-N≥2 of paginated topic)** | sitemap + topic-page (page N≥2) + 6 deck-end-suggestions | ~3 inbound surfaces (paginated page emits canonical per §16.8.3; counts as authoritative inbound) |
| **Floor case** (deck on page-N of paginated topic + zero deck-end-suggestion linkage) | sitemap + topic-page only | **N=2 non-sitemap** (1 from topic + 1 from variety-strip rotation if surfaced) |

### Phase 1 deeper-read findings

**Locale-root page (`frontend/app/[locale]/page.tsx`) deck-link density:**
- Direct deck-link emissions in this file: ZERO (component-level child surfaces emit deck links)
- Component-level emission via `<FreeExperience>` → `<BreadthGrid>` (8-9 thumbnails per locale per §18.4) + `<EmbedViralityCTA>` (1 featured)
- Locale-root page emits ~10 unique deck links per locale (8 BreadthGrid + 1 featured + 1 EmbedViralityCTA)

**Topic-page pagination behavior (`frontend/lib/topic-decks.ts`):**
- TOPIC_PAGE_SIZE = 24 confirmed at line 520
- `fetchDecksForTopicWithFilters` paginates with `skip: (page - 1) * pageSize, take: pageSize`
- Per §16.8.3 canonical-tag-on-pagination: each paginated page emits canonical pointing to itself; count as authoritative inbound
- Decks on page-N≥2 surface via paginated page → still hub-authority inbound

**Sitemap shard verification (production curl, 2026-05-09):**
- All 4 shards return content (HTTP 200)
- URL distribution: shard 0 = 1,479 (decks-a) + shard 1 = 1,456 (decks-b) + shard 2 = 1,255 (intersections) + shard 3 = 256 (other) = **4,446 URLs total**
- **Commission A's L1 + L3 findings (1 shard / mixed classes) are STALE** — 4-shard architecture is operational
- Total deck-page count via shard 0+1: ~2,935 (significant growth from Commission A's 906 audit at 2026-05-08; reflects continued deck publishing)

### Algorithm specification (concern 4 lock — N≥3 non-sitemap)

**Predicate** at `seo-reconciliation.js: reconcileInboundLinkSurface(deckId, opts)`:
- Count inbound emissions per deck across:
  1. Topic page (always — per axis-key match)
  2. VarietyStrip rotation (cap 6-8 visible per topic; rotational)
  3. SiblingAxisStrip (max 2 per neighboring axis-key; conditional on cardinality ≥2)
  4. CrossAxisPivots (cap 6 per topic page)
  5. BreadthGrid (8 per locale-root; high-curation-density floor)
  6. EmbedViralityCTA (1 per locale-root; primary CTA)
  7. Featured deck tile (1 per locale-root)
  8. Deck-end suggestion strip (6 per deck; deck-to-deck mesh)

- HALT-class (post-Phase-5) / WARN-class (pre-Phase-5): `INBOUND_LINK_COUNT_BELOW_TARGET` if non-sitemap inbound count <3

**Implementation:** per §A.13.4 dynamic-scaling — algorithm uses indexed DB queries + lib helpers (e.g., `listAxisKeys` at `topic-decks.ts:87`) to count emissions; no hard-coded population reference points.

**Predicate-implementation surface (Phase 3a):**
- New helper `frontend/lib/seo/count-inbound-surfaces.ts` queries the 8 surface emissions per deckId
- Gate predicate consumes the helper output; tracks count + per-surface presence
- Test fixture validates (a) 0-deck case (no decks → 0 inbound; expected; warn-class only at gate) (b) low-cardinality case (1-deck axis-key; deck has only topic-page + sitemap + suggestions = 3 non-sitemap; CLEAN); (c) high-cardinality case (popular axis; high inbound; CLEAN)

### Phase 4b inbound-link uplift scope

Targeted remediation for the floor case:
- **Variety-strip composition rules** (§16.2): N=2-cardinality threshold ensures rotational presence; long-tail decks rotate through Strip 4 (catalog-highlights; max-1-per-topicSlug spread)
- **Locale-root page extension** (potential Phase 4b candidate): a "newly published" or "long-tail" surface on locale-root that captures decks not surfaced on BreadthGrid (operator-strategic; Phase 2 §5 captures candidate)
- **Deck-end-suggestion strip composition** (Commission B): 6-slot per deck; per `frontend/scripts/.../deck-end-suggestions.ts` selection algorithm — confirms ≥3 distinct deck targets per emission

---

## §4 — F5 OG tag enumeration + composition rule

### Locked tag set (10 OG tags + 4 Twitter card tags)

| # | Tag | Composition |
|---|---|---|
| 1 | `og:title` | `<title>` minus ` \| LessonCraftStudio` suffix; matches Schema.org JSON-LD `name` field |
| 2 | `og:description` | `<meta name="description">` content; matches Schema.org JSON-LD `description` field |
| 3 | `og:image` | `__BASE__/<locale>/decks/<slug>-v<N>/og-image.png` (1200×630 per §15.14 derivation) |
| 4 | `og:type` | `"website"` (LOCKED — not "article"; decks aren't time-series) |
| 5 | `og:url` | `__CANONICAL_URL__` placeholder; substituted by publish-cli per §17.8.5 |
| 6 | `og:locale` | BCP-47 form per concern 1 supplement; mapped via `ogLocaleMap` from `frontend/lib/schema-generator.ts` |
| 7 | `og:site_name` | `"LessonCraftStudio"` (LOCKED) |
| 8 | `og:image:width` | `1200` (per §15.14 derivation) |
| 9 | `og:image:height` | `630` (per §15.14 derivation) |
| 10 | `og:image:alt` | localized alt text — derived from `<title>` (e.g., "Picture Sudoku Worksheet — Kindergarten") |
| 11 | `twitter:card` | `"summary_large_image"` (LOCKED) |
| 12 | `twitter:title` | mirrors `og:title` |
| 13 | `twitter:description` | mirrors `og:description` |
| 14 | `twitter:image` | mirrors `og:image` |

### Implementation reuse

**`frontend/lib/schema-generator.ts: ogLocaleMap`** is the existing canonical BCP-47 mapping consumed by `frontend/app/[locale]/page.tsx` at line 49. Reuse opportunity: Phase 2 §4 + Phase 3a OG-emission code path consumes `ogLocaleMap` directly rather than re-authoring.

**`frontend/lib/schema-generator.ts: getHreflangCode`** — same module exports the hreflang BCP-47 mapping used by the homepage + sitemap `frontend/app/sitemap.ts:78`. Reuse target for v2 hreflang surface (out of scope for v1 per §17.8.7).

### Substitution-time composition

Per Phase 2 §4 implementation: `buildSeoHead` extension emits OG block AFTER JSON-LD; before `HREFLANG_INSERTION_POINT` marker (which stays last in `<head>` per §17.8.1.5).

Phase 3a substitution surface gains 11 new placeholders (existing CANONICAL_URL + EDUCATIONAL_LEVEL_LOCALIZED already substituted):
- `__OG_TITLE__`, `__OG_DESCRIPTION__`, `__OG_IMAGE__`, `__OG_TYPE__` (always "website"), `__OG_URL__`, `__OG_LOCALE__`, `__OG_SITE_NAME__` (always "LessonCraftStudio"), `__OG_IMAGE_WIDTH__` (always "1200"), `__OG_IMAGE_HEIGHT__` (always "630"), `__OG_IMAGE_ALT__`, `__TWITTER_CARD__` (always "summary_large_image")

Twitter card placeholders mirror og counterparts (no new substitution; copy `__OG_TITLE__` / `__OG_DESCRIPTION__` / `__OG_IMAGE__` values).

### Insertion-point structural extension

Per concern 3 retrofit Option A lock: new `<!-- SEO_INSERTION_POINT -->` marker pair around the entire SEO block (title + meta description + canonical + JSON-LD + OG/Twitter card tags + HREFLANG_INSERTION_POINT). Marker pair enables Phase 4a `republish-seo` mode that re-substitutes only this block.

---

## §5 — Multi-`<h1>` violation taxonomy (NEW per Phase 0)

### Failure shape

Production curl on `/en/decks/sudoku/` reveals two `<h1>` elements:

```html
<h1 class="lcs-title" id="lcs-title">Picture Sudoku</h1>
<h1 class="lcs-celebration__title">{youDidIt}</h1>
```

The celebration screen is hidden by default (CSS class state) but the markup is present in the document. Googlebot indexes hidden content; the multi-h1 dilutes the page's primary heading signal.

§17.8.1 item 1: "One `<h1>` per deck. One only."

### Predicate

`MULTIPLE_H1_DETECTED` halt-class:
- Count `<h1[\s>]` regex matches against rendered post-substitution deck.html
- Expected: exactly 1
- Halt: count != 1

### Authoring-side fix scope

Single shared site (NOT 29-app fan-out):
- `REFERENCE TRANSLATIONS/catalog-export.js` celebration-screen template
- Change: `<h1 class="lcs-celebration__title">` → `<h2 class="lcs-celebration__title">`
- Surface: 1 line edit; ~5-line block diff
- Verification: re-render any deck via `[Generate Worksheet] → Download Interactive HTML` after sync; curl deck.html post-publish; verify 1 `<h1>` element

Phase 3b: ships the celebration-template fix as part of the broader emit-site sweep batch (per concern 3 lock).

---

## §6 — Phase 1 deeper-read findings (consolidated empirical surface)

Six investigations executed during this phase; outputs:

### 6.1 — Locale-root page deck-link density (`frontend/app/[locale]/page.tsx`)
- Direct emissions: 0
- Child-component emissions: BreadthGrid (8 thumbnails per §18.4) + EmbedViralityCTA (1 featured) + FreeExperience nested BreadthGrid
- **Per-locale unique decks linked: ~9-10**
- Implication: locale-root contributes 1 inbound surface per featured/breadth-tile deck; for the 2,935-deck inventory at production state, ~9-10 of those receive locale-root surfacing per locale × 11 locales ≈ ~100 decks captured by locale-root surfacing; rest reach via topic page + sitemap

### 6.2 — fr register sample (`REFERENCE TRANSLATIONS/image-vocabulary.js`)
- `car.fr = "Voiture"` — universal (fr_FR + fr_CA both accept)
- `truck.fr = "Camion"` — universal
- `potato.fr = "Pomme de terre"` — fr_FR canonical-formal; fr_CA also uses "patate" colloquially but "pomme de terre" is the formal-register lexicon
- `computer.fr = "Ordinateur"` — universal
- **Conclusion: fr_FR locked; no Quebec-specific signal in the 1,246-entry vocabulary to discriminate against fr_CA**

### 6.3 — Pre-`6fb6ee3d`-retrofit canonical residue audit
- Sample 3 decks: `de/sudoku` (older), `de/addition-image-image` (older), `en/pattern-train-winter` (newer)
- All 3 emit www-form trailing-slash canonical: `https://www.lessoncraftstudio.com/<locale>/decks/<slug>/`
- **Zero apex-form residue in spot-check**
- Phase 4a wider sample (50+ decks) recommended for completeness

### 6.4 — Sitemap shard verification (4-shard architecture per §17.10.1)
- All 4 shards return HTTP 200 with content
- URL distribution: 1,479 + 1,456 + 1,255 + 256 = **4,446 URLs total**
- **Commission A's L1 + L3 (1 shard / mixed classes) findings are STALE** — 4-shard architecture is operational and load-balanced
- Phase 0 audit §9 "L1 status changed" + "L3 status changed" notes confirmed empirically at production

### 6.5 — Topic-page pagination behavior (`frontend/lib/topic-decks.ts`)
- TOPIC_PAGE_SIZE = 24 confirmed at line 520
- `fetchDecksForTopicWithFilters` paginates correctly with proper `skip` + `take`
- Per §16.8.3 canonical-tag-on-pagination: each paginated page self-canonicalizes; counts as authoritative inbound surface
- **F4 inbound-link gap nuance: deck on page-N≥2 has 1 non-sitemap inbound (topic-page page-N) + deck-end-suggestion-strip mesh contributions (6 per deck)** — N≥3 non-sitemap floor achievable structurally via topic + variety-strip + cross-axis-pivots + suggestions

### 6.6 — Shape A precedent coordination cost (Phase 2 §8 input)
- `44cbdda1` (single-app reference): 2 files, 34 insertions
- `05d0940e` (10-sibling Shape A wave): 20 files, 322 insertions (~32 LoC/app)
- `109a91d4` (16-app Commission ε exerciseMode fix): 19 files, 176 insertions / 95 deletions (~9 LoC/app for mode-emit fix + slug.js refactor)
- **Phase 2 §8 cost-balloon estimate for 29-app path-(b) trace extension:** ~32 LoC/app × 29 apps ≈ ~900-1000 LoC; 1-2 batched commits per Shape A cadence; ~2-3 sessions
- **Bounded; not cost-balloon trigger.** Cost-balloon escape hatch reserved for unexpected complexity (e.g., t() helper architectural divergence per §17.8.14 surfacing deeper structural issues mid-implementation)

---

## Cross-references

- Commission A audit: `docs/audit-results/deck-page-indexability.md` (`4f920f91`)
- Phase 0 substrate audit: `docs/SEO/deck-page-arc-phase-0-substrate.md` (`ad0e49c7`)
- §17.8.1 deck.html SEO surface spec
- §17.8.5 publish-cli substitution responsibility + `manifest.variant_id` extension precedent
- §17.8.7 v1/v2 hreflang split
- §17.8.14 srLang-keyed lookup convention (root cause of locale-residue class)
- §17.10.1 4-shard sitemap architecture
- §A.10 origin nginx www-canonicalization
- §A.13.5 Shape A authoring complement (Phase 3b precedent: `44cbdda1`, `05d0940e`, `109a91d4`)
- §A.14.5 audit-only commission shape
- §16.8.3 canonical-tag-on-pagination
- §18.4 BreadthGrid composition + locale-root deck-link density

---

## Phase 1 → Phase 2 handoff

Phase 1 finding-class taxonomy + Phase 2 doctrinal-extension working draft ship as paired deliverables in single commit. Phase 2 absorbs Phase 1's diagnoses + locked decisions into formal invariants + predicates + cost-balloon evaluation.

*End of Phase 1 finding-class taxonomy.*
