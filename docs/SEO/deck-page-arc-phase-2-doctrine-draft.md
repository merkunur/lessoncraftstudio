# `[ARC][SEO][DECK-PAGE]` Phase 2 — doctrinal-extension working draft

**Type:** doctrinal working draft per commission spec §2 Phase 2; specifies invariants + predicates + implementation hooks for §17.8.1 / §17.8.5 / §A.13.x extensions
**Generated:** 2026-05-09
**Predecessor:** Phase 1 finding-class taxonomy at `docs/SEO/deck-page-arc-phase-1-taxonomy.md`
**Operator-locked decisions:** 5-item adjudication batch (single-pass / es_MX BCP-47 / Option A retrofit / N≥3 inbound floor / Tier 3+da NSR-flag scope)
**Phase 6 fold-cycle target:** this draft is the source for fold patches into canonical CLAUDE.md at next [DOCS] cycle (Phase 6 close)

**Section-numbering hygiene:** numbers proposed below (§17.8.16–19, §A.13.12–13) are placeholders pending canonical-state reconciliation at fold time per concern 6 + SESSION-STATE reminder #8 (snapshot-vs-canonical drift discipline).

---

## §1 — Title uniqueness invariant (proposed §17.8.16)

### Formal predicate

For all decks `D1, D2` with `D1.id != D2.id`:
```
∀ (D1, D2) where D1.language == D2.language:
  hash(D1.rendered_title) != hash(D2.rendered_title)
```

Cross-locale uniqueness is NOT required; same-locale uniqueness IS required.

### Implementation surface

**Schema extension:** additive Prisma migration adds nullable columns:
- `Deck.titleHash` — `String?` — sha256 of rendered post-substitution title
- `Deck.descriptionHash` — `String?` — sha256 of rendered post-substitution meta description

Compound unique constraint: `@@unique([language, titleHash])` enforces structurally at INSERT time.

**Backfill:** Phase 4a retrofit pass computes hashes from existing decks + writes to new columns; nullable until backfilled.

**Predicate function** at `scripts/publish-cli/seo-reconciliation.js`:

```js
async function reconcileTitleUniqueness(manifest, renderedTitle, opts) {
  const titleHash = sha256(renderedTitle);
  const existing = await prisma.deck.findFirst({
    where: {
      language: manifest.language,
      titleHash,
      NOT: { id: opts.thisDeckId }
    },
    select: { id: true, slug: true, titleHash: true }
  });
  if (existing) {
    return {
      category: 'TITLE_NON_UNIQUE',
      declared: renderedTitle,
      hash: titleHash,
      existing,
      deckId: manifest.deck_id,
      app: manifest.exercise_type
    };
  }
  return { category: 'CLEAN', hash: titleHash };
}
```

### Themeless-app handling

Themeless decks (e.g., sudoku without theme) collide on `(app, level)` tuple. Mitigation per §1 selected option (extend `manifest.variant_id` semantic to title-disambiguator):

```
title = `<Type> <Worksheet> [— <Theme>] — <Level>` + ` (Set <variant_id>)` if collision
```

Implementation: at apps' `extractDeckBundle()` boundary, append variant_id suffix to `titleSegments` when manifest.variant_id is non-null. Existing slug.js precedent at line 175-185 (already handles variant_id for slug); title extension follows the parallel pattern.

### Multi-mode-app handling

Per §17.8.5 default-mode-emits-null pattern (§A.13.4): mode appears in title for non-default modes only. e.g., `addition-find-addend` deck title includes `Find Addend` localized variant; standard `addition` deck does not.

### Locale-variant handling

Cross-locale uniqueness NOT enforced. Each locale is its own title space — `de/sudoku` and `en/sudoku` may legitimately produce different localized titles that don't collide cross-locale (and shouldn't, per §6 invariant below preventing English residue).

### Halt-class

`TITLE_NON_UNIQUE` halts the gate per concern 7 Phase 3-close adjudication on halt-vs-warn split. Default: HALT.

---

## §2 — Meta description uniqueness invariant (proposed §17.8.17)

### Formal predicate

Identical shape to §1 but on description hash:

```
∀ (D1, D2) where D1.language == D2.language:
  hash(D1.rendered_meta_description) != hash(D2.rendered_meta_description)
```

### Implementation surface

`Deck.descriptionHash` column (additive Prisma migration alongside `titleHash`).

`reconcileDescriptionUniqueness` at `seo-reconciliation.js` mirrors `reconcileTitleUniqueness`.

### Collision-risk profile

Lower than title because description includes more granular components (theme phrase, instruction sentence, themed-or-not parenthetical). Themeless-app collisions still possible; mitigation parallel to title (variant_id suffix on instruction sentence OR description-disambiguator).

### Halt-class

`DESC_NON_UNIQUE` — same halt-vs-warn adjudication path as §1.

---

## §3 — Canonical URL direct-resolution invariant (proposed §17.8.18)

### Two paired predicates per concern 4 lock

**Publish-time (parser-level):**

```
manifest.canonical_url MUST match exactly:
  /^https:\/\/www\.lessoncraftstudio\.com\/[a-z]{2}\/decks\/[a-z0-9-]+\/$/

Halt classes:
  CANONICAL_APEX_FORM       host = lessoncraftstudio.com (no www)
  CANONICAL_NO_TRAILING_SLASH  ends without `/`
  CANONICAL_WRONG_LOCALE    locale segment != manifest.language
  CANONICAL_WRONG_SLUG      slug segment != computed slug per §17.8.5
```

**Post-publish (production-side curl):**

At Phase 4c verification:

```
curl -sIL <canonical_url>
  → HTTP 200 (final)
  → redirect chain length == 0
  → final URL == canonical_url (exact match)

Halt classes:
  CANONICAL_RESOLVE_REDIRECT_CHAIN  length > 0
  CANONICAL_RESOLVE_NON_200         final HTTP code != 200
  CANONICAL_RESOLVE_URL_MISMATCH    final URL != canonical_url
```

### Implementation surface

**Publish-time predicate** at `seo-reconciliation.js`:

```js
function reconcileCanonicalURLPattern(manifest, substitutedHtml, opts) {
  const canonicalMatch = /<link rel="canonical" href="([^"]+)"/.exec(substitutedHtml);
  if (!canonicalMatch) return { category: 'CANONICAL_MISSING' };
  const canonical = canonicalMatch[1];
  const expected = `https://www.lessoncraftstudio.com/${manifest.language}/decks/${opts.slug}/`;
  if (canonical !== expected) {
    return {
      category: classifyMismatch(canonical, expected),
      declared: canonical,
      expected,
      deckId: manifest.deck_id
    };
  }
  return { category: 'CLEAN' };
}
```

**Post-publish predicate** at Phase 4c verification helper:

```js
async function verifyProductionCanonical(canonicalURL) {
  const result = await fetch(canonicalURL, { method: 'HEAD', redirect: 'manual' });
  if (result.status !== 200) return { category: 'CANONICAL_RESOLVE_NON_200', actual: result.status };
  // ... (also follow redirect manually + count chain length)
  return { category: 'CLEAN' };
}
```

### Verification artifact

Phase 4c `_phase_4_production_verification.txt` records per-deck:
- expected canonical
- actual final URL post-curl
- redirect chain length
- HTTP final status

### Halt-class

Both predicates: HALT (publish-time at gate; post-publish at Phase 4c). Phase 4c failure that wasn't caught at publish-time predicate is itself a finding (gate predicate insufficient → strengthen for next pass).

---

## §4 — OG tag enumeration + composition rule per tag (proposed §17.8.19)

### Locked tag set (10 OG + 4 Twitter card)

Per Phase 1 §4 table:

| Tag | Composition | Substitution-time placeholder |
|---|---|---|
| `og:title` | `<title>` minus ` \| LessonCraftStudio` suffix | `__OG_TITLE__` |
| `og:description` | `<meta name="description">` content | `__OG_DESCRIPTION__` |
| `og:image` | `<canonical_url>og-image.png` | `__OG_IMAGE__` |
| `og:type` | `"website"` (LOCKED constant) | NO placeholder; literal in template |
| `og:url` | canonical URL | `__OG_URL__` (or reuse `__CANONICAL_URL__`) |
| `og:locale` | BCP-47 form via `ogLocaleMap[locale]` | `__OG_LOCALE__` |
| `og:site_name` | `"LessonCraftStudio"` (LOCKED constant) | NO placeholder; literal |
| `og:image:width` | `"1200"` (LOCKED per §15.14) | NO placeholder; literal |
| `og:image:height` | `"630"` (LOCKED per §15.14) | NO placeholder; literal |
| `og:image:alt` | localized alt; mirrors `og:title` first segment | `__OG_IMAGE_ALT__` |
| `twitter:card` | `"summary_large_image"` (LOCKED constant) | NO placeholder; literal |
| `twitter:title` | mirrors `og:title` | `__TWITTER_TITLE__` (or reuse `__OG_TITLE__`) |
| `twitter:description` | mirrors `og:description` | `__TWITTER_DESCRIPTION__` (or reuse) |
| `twitter:image` | mirrors `og:image` | `__TWITTER_IMAGE__` (or reuse) |

**Substitution-surface efficiency:** the 11 unique placeholders (excluding constants) reduce to ~7 actual substitution operations because mirrored Twitter card tags reuse OG values. Phase 3a implementation can either (a) duplicate placeholders for explicit symmetry OR (b) reuse `__OG_TITLE__` etc. across both contexts. CC pre-recommends (b) for substitution-table parsimony.

### Implementation surface

**`buildSeoHead` extension at `REFERENCE TRANSLATIONS/catalog-export.js`:**

```js
function buildSeoHead(opts) {
  // ... existing title + description + JSON-LD + canonical emission
  
  // NEW: OG tag block
  var ogTags = [
    '<meta property="og:title" content="__OG_TITLE__">',
    '<meta property="og:description" content="__OG_DESCRIPTION__">',
    '<meta property="og:image" content="__OG_IMAGE__">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="__OG_IMAGE_ALT__">',
    '<meta property="og:type" content="website">',
    '<meta property="og:url" content="__CANONICAL_URL__">',
    '<meta property="og:locale" content="__OG_LOCALE__">',
    '<meta property="og:site_name" content="LessonCraftStudio">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="__OG_TITLE__">',
    '<meta name="twitter:description" content="__OG_DESCRIPTION__">',
    '<meta name="twitter:image" content="__OG_IMAGE__">'
  ];
  
  return [
    '<title>...</title>',
    '<meta name="description" content="...">',
    '<link rel="canonical" href="__CANONICAL_URL__">',
    '<script type="application/ld+json">...</script>',
    ogTags.join('\n')
  ].join('\n');
}
```

**`substitute.js` extension:** add 5 new placeholders (`__OG_TITLE__`, `__OG_DESCRIPTION__`, `__OG_IMAGE__`, `__OG_LOCALE__`, `__OG_IMAGE_ALT__`) to the substitution loop in `apply()`. Reuses existing `__CANONICAL_URL__` for `og:url`.

**Reuse from `frontend/lib/schema-generator.ts`:** import `ogLocaleMap` for BCP-47 mapping per concern 1 supplement; this map already serves `frontend/app/[locale]/page.tsx:49`. Phase 3a publish-cli imports the map (or mirrors the locked locale → BCP-47 mapping if circular-import constraints surface).

### og:image source decision

**Primary:** per-deck `og-image.png` already generated per §15.14 at `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/og-image.png` (1200×630 from existing 480×620 thumbnail composite).

**Fallback:** site-default at `${BASE}/og-default.png` when per-deck og-image.png is missing → warn-class `OG_IMAGE_FALLBACK_USED` (not halt; informational).

Insertion location: OG block emitted AFTER JSON-LD; BEFORE `<!-- HREFLANG_INSERTION_POINT -->` marker (which stays last in `<head>` per §17.8.1.5).

### `<!-- SEO_INSERTION_POINT -->` marker pair (per concern 3 retrofit Option A)

Wrap the entire SEO block:

```html
<!-- SEO_INSERTION_POINT_START -->
<title>...</title>
<meta name="description" content="...">
<link rel="canonical" href="...">
<script type="application/ld+json">...</script>
[OG block]
<!-- HREFLANG_INSERTION_POINT -->
<!-- SEO_INSERTION_POINT_END -->
```

Phase 4a `republish-seo` mode in publish-cli: re-substitute only the content between `SEO_INSERTION_POINT_START` + `SEO_INSERTION_POINT_END` markers; rest of deck.html bytes preserved.

### Halt-classes

- `OG_TAG_MISSING` — any of the locked tag set absent: HALT
- `OG_IMAGE_FALLBACK_USED` — site-default consumed: WARN

---

## §5 — Inbound-link minimum invariant (proposed §A.13.12)

### Formal predicate

For all published decks D, let `count_inbound_non_sitemap(D)` count emissions of D's canonical URL across:

```
SURFACES = [
  topic_page_for_axis_key (axis_key matches D's exerciseType OR theme-tag OR ageRange-level),
  variety_strip_rotation (across all topic pages where D could rotate in),
  sibling_axis_strip (across topic pages whose neighboring axis includes D),
  cross_axis_pivots,
  breadth_grid (homepage Section 2 + locale-root),
  featured_deck_tile (locale-root single per locale),
  embed_virality_cta (locale-root single per locale),
  deck_end_suggestion_strip (other decks linking to D via Commission B mesh)
]

count_inbound_non_sitemap(D) = |{S ∈ SURFACES : D appears on S}|

INVARIANT: ∀ published D: count_inbound_non_sitemap(D) ≥ 3
```

### Predicate-implementation specification

**Helper at `frontend/lib/seo/count-inbound-surfaces.ts` (NEW file at Phase 3a):**

```ts
export async function countInboundSurfacesForDeck(
  deckId: string,
  language: string
): Promise<{
  count: number;
  perSurface: Record<string, boolean>;
}> {
  // Indexed DB queries against Deck table + lib helpers per topic-decks.ts patterns
  // Returns per-surface presence + total count
}
```

**Gate predicate at `seo-reconciliation.js`:**

```js
async function reconcileInboundLinkSurface(manifest, opts) {
  const result = await countInboundSurfacesForDeck(opts.deckId, manifest.language);
  if (result.count < 3) {
    return {
      category: 'INBOUND_LINK_COUNT_BELOW_TARGET',
      count: result.count,
      perSurface: result.perSurface,
      target: 3,
      deckId: manifest.deck_id
    };
  }
  return { category: 'CLEAN', count: result.count };
}
```

### Halt-vs-warn schedule

- **Pre-Phase-5:** WARN-class — operator-side awareness without batch halt; allows Phase 4b inbound-link uplift to ship before gate locks
- **Post-Phase-5:** HALT-class — escalates to halt-class once Phase 4b uplift completes; prevents future under-anchored deck publishes

### Dynamic-scaling property

Per concern 4 lock: algorithm + architecture properties hold identically at any catalog size. The N≥3 floor is a property-based threshold, NOT a hard-coded population reference point. Implementation queries indexed columns (`Deck.exerciseType`, `Deck.subjectTags`, `Deck.ageRange`) via per-locale-bounded scans (per `topic-decks.ts: fetchDecksForAxis` precedent); scale-projection per §A.14.7 holds at 55K-deck design target.

---

## §6 — Locale-correctness invariant (proposed §A.13.13 — companion to §17.8.19)

### Formal predicate

For all published decks D where `D.language != 'en'`:

```
∀ word W in D.rendered_title ∪ D.rendered_meta_description ∪ D.og_tag_strings:
  origin(W) == translation_lookup_for_locale(D.language)
  AND origin(W) != fallback_to_english
```

Equivalent: zero English-language strings in non-English deck pages.

### Implementation paths

Per concern 3 lock — two paths with primary/fallback ordering:

**Path (b) PRIMARY — translation-key-resolution-source-trace:**

Per-app `extractDeckBundle()` extension instruments title-source-trace:

```js
function extractDeckBundle() {
  const bundle = { /* existing fields */ };
  
  // NEW: title-source-trace alongside title
  bundle.titleSourceTrace = {
    typeName: { value: typeName, source: 'translations.<locale>.exercise_type.<app>' },
    worksheetWord: { value: worksheetWord, source: 'translations.<locale>.worksheet' },
    themeName: themeName ? { value: themeName, source: 'translations.<locale>.theme.<key>' } : null,
    levelLocalized: { value: levelLocalized, source: 'i18n.seo.educational_level.<key>' }
  };
  
  // Same for description segments
  bundle.descriptionSourceTrace = { /* parallel structure */ };
  
  return bundle;
}
```

Gate predicate consumes `titleSourceTrace` + `descriptionSourceTrace`:

```js
function reconcileLocaleResidue(manifest, bundle, opts) {
  if (manifest.language === 'en') return { category: 'CLEAN' };
  const traces = [bundle.titleSourceTrace, bundle.descriptionSourceTrace];
  for (const trace of traces) {
    for (const [field, info] of Object.entries(trace)) {
      if (info && info.source.includes('fallback_en')) {
        return {
          category: 'LOCALE_RESIDUE_DETECTED',
          field,
          source: info.source,
          deckId: manifest.deck_id,
          app: manifest.exercise_type
        };
      }
    }
  }
  return { category: 'CLEAN' };
}
```

**Path (a) FALLBACK — curated English-word lexicon (escape hatch per §8):**

If Phase 2 §8 cost-balloon engages (path-(b) infeasible), the gate uses a curated lexicon of English words to detect residue:

```js
const ENGLISH_LEXICON_FOR_LOCALE_RESIDUE = new Set([
  'worksheet', 'free', 'interactive', 'for', 'print', 'play', 'online',
  'kindergarten', 'preschool', 'grade', // ... etc
]);

function reconcileLocaleResidue_LexiconFallback(manifest, renderedTitle, opts) {
  if (manifest.language === 'en') return { category: 'CLEAN' };
  const words = tokenize(renderedTitle);
  const englishWords = words.filter(w => ENGLISH_LEXICON_FOR_LOCALE_RESIDUE.has(w.toLowerCase()));
  if (englishWords.length > 0) {
    return {
      category: 'LOCALE_RESIDUE_DETECTED_LEXICON',
      englishWords,
      deckId: manifest.deck_id
    };
  }
  return { category: 'CLEAN' };
}
```

**Trade-off:** lexicon path has known false-positives on legitimate loanwords (DE `Kindergarten`, FR `weekend`, IT `computer`). Phase 3a config layer maintains an exception list per locale; Phase 3b emit-site sweep eliminates the need for the lexicon entirely once trace lands.

### Halt-class

`LOCALE_RESIDUE_DETECTED` (path-(b)) OR `LOCALE_RESIDUE_DETECTED_LEXICON` (path-(a)): HALT.

### Phase 3a/3b transition

Phase 3a ships gate with path-(a) lexicon-fallback enabled (operator-curated exception list maintained); Phase 3b ships emit-site sweep across 29 apps + flips predicate from path-(a) to path-(b). Lexicon exception list deprecated post-3b.

---

## §7 — Multi-`<h1>` invariant (NEW per Phase 0; proposed §17.8.20)

### Formal predicate

For all rendered post-substitution deck.html documents:

```
count(<h1[\s>]>) == 1
```

### Implementation surface

**Predicate at `seo-reconciliation.js`:**

```js
function reconcileSingleH1(substitutedHtml, opts) {
  const h1Count = (substitutedHtml.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    return {
      category: 'MULTIPLE_H1_DETECTED',
      count: h1Count,
      deckId: opts.deckId
    };
  }
  return { category: 'CLEAN', count: 1 };
}
```

### Authoring-side fix scope (Phase 3b)

**Single shared site:** `REFERENCE TRANSLATIONS/catalog-export.js` celebration-screen template. Change:

```diff
- <h1 class="lcs-celebration__title">{youDidIt}</h1>
+ <h2 class="lcs-celebration__title">{youDidIt}</h2>
```

5-line block diff; 1 file edit; no 29-app fan-out (single shared celebration template across all apps).

### Halt-class

`MULTIPLE_H1_DETECTED`: HALT.

---

## §8 — Phase 2 cost-balloon escape hatch (path-(b) → path-(a) fallback evaluation)

### Per concern 3 lock

If path-(b) trace instrumentation across 29 apps exceeds reasonable envelope at Phase 2 cost-modeling, fallback to path-(a) lexicon. Cost-balloon escape hatch surfaces as operator-strategic single-item adjudication at Phase 2 close.

### Phase 1 §6.6 cost data — empirical anchor

**Shape A precedent commits:**

| Commit | Scope | Files | Insertions | LoC/app |
|---|---|---|---|---|
| `44cbdda1` | single-app reference (code-addition) | 2 | 34 | 34 |
| `05d0940e` | 10-sibling Shape A wave | 20 | 322 | 32 |
| `109a91d4` | 16-app exerciseMode fix (Commission ε) | 19 | 176 | 11 |

**Path-(b) trace extension projection for 29 apps:**
- Expected LoC: ~32 LoC/app × 29 apps = ~928 LoC
- Expected file-count: 29 app HTML files + 29 translation files + 1 catalog-export.js shared helper = ~59 files touched
- Expected commit-count: 1-2 batched commits per Shape A precedent (e.g., `05d0940e` was 1 commit covering 10 apps)
- Expected session-count: 2-3 sessions

**Within bounded envelope.** Path-(b) does NOT trigger cost-balloon escape hatch by these projections.

### Cost-balloon trigger conditions

Path-(b) triggers escape hatch ONLY if Phase 3b empirical work surfaces:
1. **t() helper architectural divergence (§17.8.14) is deeper than projected** — per-app instrumentation requires `t()` helper rewrite per app, not just `extractDeckBundle()` extension. This would 2-3x the LoC/app + push to ~5-6 sessions.
2. **Translation-surface gaps surface across multiple locales** — instrumentation reveals missing translation keys requiring Stream A Arc 2 commencement before Phase 3b can proceed.
3. **Per-app divergence in extractDeckBundle structure** — apps with non-standard bundle shapes (cryptogram, picture-path, sudoku per Group B Phase 0 inventory) require bespoke instrumentation paths.

### Decision rule

CC at Phase 3b mid-execution surfaces cost-balloon trigger if any of the 3 conditions fire empirically. Operator-strategic adjudication at that point: continue path-(b) at expanded envelope OR fallback to path-(a) lexicon.

**Default:** path-(b) primary; cost-balloon escape hatch is a contingency, not the expected outcome.

### Path-(a) lexicon fallback shape

If escape hatch engages, Phase 3b shrinks to:
- Maintain curated lexicon at `scripts/publish-cli/seo-reconciliation.js: ENGLISH_LEXICON_FOR_LOCALE_RESIDUE`
- Per-locale exception list at `scripts/publish-cli/seo-reconciliation-exceptions.json` (loanword carve-outs: DE `Kindergarten`, FR `weekend`, IT `computer`, etc.)
- Predicate uses lexicon-based detection per §6 path-(a) implementation
- Phase 3b emit-site sweep deferred indefinitely; lexicon curation becomes the primary maintenance surface

---

## §9 — Section-numbering hygiene placeholder (Phase 6 fold-cycle dependency)

Proposed sections in this draft (placeholders pending canonical-state reconciliation per concern 6):

| Proposed | Mapped to canonical at fold time | Pending verification |
|---|---|---|
| §17.8.16 — title uniqueness | next-available subsection after current §17.8.15 (in-deck share affordance) | Canonical may have advanced past §17.8.15 by Phase 6 close; verify highest §17.8.x at fold-cycle |
| §17.8.17 — meta description uniqueness | sequential after §17.8.16 | same |
| §17.8.18 — canonical URL direct-resolution | sequential | same |
| §17.8.19 — OG tag enumeration | sequential | same |
| §17.8.20 — multi-h1 invariant | sequential | same |
| §A.13.12 — inbound-link surface invariant | next-available subsection after current §A.13.11 (operator-strategic adjudication batching) | Canonical may have advanced; verify highest §A.13.x at fold-cycle |
| §A.13.13 — locale-correctness invariant | sequential after §A.13.12 | same |

**Phase 6 fold-cycle action:** at fold-draft authoring time, `git pull` canonical CLAUDE.md from main → verify highest §17.8.x and §A.13.x subsection numbers → renumber proposed sections accordingly. This is mechanical; no doctrine drift risk.

Cross-reference: §A.8.2 multi-copy doctrine-file drift discipline + SESSION-STATE reminder #8 (cross-check section number → section content before specifying CLAUDE.md fold targets).

---

## Cross-references

- Phase 0 substrate audit: `docs/SEO/deck-page-arc-phase-0-substrate.md` (`ad0e49c7`)
- Phase 1 finding-class taxonomy: `docs/SEO/deck-page-arc-phase-1-taxonomy.md`
- Commission A audit: `docs/audit-results/deck-page-indexability.md` (`4f920f91`)
- §17.8.1 deck.html SEO surface spec
- §17.8.5 publish-cli substitution + variant_id semantic precedent
- §17.8.7 v1/v2 hreflang split
- §17.8.14 srLang-keyed lookup convention (root cause of locale-residue class)
- §15.16 reconciliation gate architecture (sibling pattern)
- §15.17 salvage script pattern (Phase 4a retrofit precedent)
- §17.10.1 4-shard sitemap architecture
- §A.10 origin nginx www-canonicalization
- §A.13.4 DERIVED-vs-HARDCODED-NULL emit-site classification (parallel pattern)
- §A.13.5 Shape A authoring complement (Phase 3b precedent commits: `44cbdda1`, `05d0940e`, `109a91d4`)
- §A.13.7 first-publish-verification cadence
- §A.13.11 operator-strategic adjudication batching
- §A.14.7 scale-projection methodology (predicate-implementation scaling lock)
- §A.14.8 pre-publish-wave audit doctrine
- `frontend/lib/schema-generator.ts: ogLocaleMap` (BCP-47 reuse target)

---

## Phase 2 → Phase 3 handoff

Phase 2 working draft hands operator-strategic adjudication on:

- **§3 Phase close:** predicate halt-vs-warn split per §3.1 commission spec table (deferred per concern 7)
- **§8 cost-balloon escape hatch:** evaluate at Phase 3b commencement; default no-trigger per Phase 1 §6.6 cost data

Phase 3a code work (publish-cli gate landing with lexicon-fallback locale-residue) commences post operator-strategic Phase 3 close adjudication. Phase 3b code work (29-app emit-site sweep) commences post Phase 3a deploy + verification.

*End of Phase 2 doctrinal-extension working draft.*
