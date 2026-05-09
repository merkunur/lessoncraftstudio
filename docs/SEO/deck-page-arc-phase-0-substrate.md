# `[ARC][SEO][DECK-PAGE]` Phase 0 — substrate audit

**Type:** read-only audit pass per §A.14.5 audit-only commission shape (adapted for arc Phase 0)
**Generated:** 2026-05-09
**Scope:** 9 substrate dimensions per the Phase 0 plan; reconciles against Commission A's `deck-page-indexability.md` (2026-05-08) + extends with empirically-derived findings
**Status of arc:** Phase 0 commencement-authorized; Phase 1 awaits operator 5-item adjudication batch per concern 7

---

## Executive summary

**Phase 0 outcome:** substrate inventory complete across all 9 dimensions; F1–F5 reconciled against current empirical state; **2 NEW findings surfaced beyond Commission A's enumeration** (multi-`<h1>` celebration screen; pattern-broader-than-es title English-only). Pre-Phase-1 strand-selection list draft prepared per concern 7 batching shape.

**Two findings strengthen Commission A's H1 framing:**

1. **F3+H1 affects ALL non-English locales, not just es.** Production curl on `de/sudoku` returns `<title>Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio</title>` — IDENTICAL to `en/sudoku`, ENTIRELY English. Commission A sampled only es; the pattern affects all 10 non-English locales.
2. **Multi-`<h1>` violation NEW.** `en/sudoku` deck.html emits TWO `<h1>` elements: `<h1 class="lcs-title">` (worksheet title) + `<h1 class="lcs-celebration__title">` (celebration screen on completion). §17.8.1 item 1 requires "One `<h1>` per deck. One only." Spec violation NOT in Commission A audit.

**One finding loosens F1's framing:**

3. **F1 (canonical redirect) does NOT fire on www-form trailing-slash canonicals.** Commission A's "redirects=0; final URL = canonical" finding holds. The 301 only fires on apex-form OR no-trailing-slash. Substituted canonicals (per `substitute.js: CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'`) resolve direct 200. F1 is therefore narrower than commission spec §0 framed — likely pre-`6fb6ee3d`-retrofit canonicals OR external-referrer apex links that don't exist in current canonical state.

**One finding raises an operator-strategic adjudication beyond concern 1's pt_BR lock:**

4. **`es` register is Latin American with Mexican lead.** `image-vocabulary.js` carries `apricot.es = "Chabacano"` (strongly Mexican; European Spanish = "albaricoque") + `aguacate` (Latin American). The CC pre-recommendation `es_ES` may be wrong on the same grounds the original `pt_PT` draft was wrong: vocabulary register diverges from country-code default. Phase 1 5-item batch surfaces `es_MX` (or `es_419`) as candidate.

---

## §1 — Concurrent-arc territory verification (D8)

Per §5 commission spec concurrent-arc protections + operator's response confirmation:

- **Sole-arc state confirmed.** None of the 4 carry-forward draft-specs (Arc 14 / Pillar 2 Arc 3 / Stream A Arc 2 / Pillar 4 Arc 2) per CONVERSATION-HANDOFF §0 has commenced.
- **Territory at this arc:** `scripts/publish-cli/seo-reconciliation*` (new sibling) + `scripts/seo-retrofit/*` (new) + `frontend/components/topic/` + `frontend/components/locale-page/` + `frontend/lib/seo/*` + `docs/SEO/` (this directory, new) + `REFERENCE TRANSLATIONS/catalog-export.js` (per-app emit-site sweep at Phase 3b)
- **Future overlap risk if any concurrent arc commences:**
  - **Stream A Arc 2 (highest):** if Phase 3b path-(b) trace surfaces vocabulary-substrate gaps (per concern 3 routing), those land in Stream A territory (`REFERENCE TRANSLATIONS/image-vocabulary.js`). Coordination point at Phase 3b commencement.
  - **Pillar 4 Arc 2:** flashcard renders consume the catalog deck-page surface but don't write to it; no territory overlap.
  - **Arc 14 / Pillar 2 Arc 3:** `docs/lesson-plans/*` territories; no overlap.

No concurrent-arc conflicts at Phase 0 commencement. Phase 3b commencement re-verifies.

---

## §2 — §15.16 reconciliation gate architecture (D6 — Phase 3 wire-in target)

The new `seo-reconciliation.js` will be a sibling to `slug.js`'s existing reconciliation functions. Empirical anchor:

### Existing gate dimensions (canonical patterns to mirror)

`scripts/publish-cli/slug.js` exports two predicate functions:

```js
reconcileManifestTheme(manifest)
  → { category, declared, primary, secondary, deckId, app }

reconcileExerciseMode(manifest)
  → { category, declared, appClass, deckId, app }
```

Categories: `CLEAN` | `MISSING_THEME` | `MISSING_PRIMARY` | `THEME_DISAGREE` | `MODE_NULL_FROM_HARDCODED_APP`. Halts batch if any non-CLEAN.

### Wire-in pattern (per `bulk.js: dryRunOneZip`, lines 102–131)

Predicates run AFTER manifest validation, BEFORE slug derivation:

```js
// Step 1b: theme reconciliation
var recon = slugMod.reconcileManifestTheme(manifest);
if (recon.category !== 'CLEAN') {
  result.errors.push('manifest.theme reconciliation [' + recon.category + ']: ...');
  return result;
}

// Step 1c: exerciseMode reconciliation
var modeRecon = slugMod.reconcileExerciseMode(manifest);
if (modeRecon.category !== 'CLEAN') {
  result.errors.push('manifest.exerciseMode reconciliation [' + modeRecon.category + ']: ...');
  return result;
}

// Step 1d: SEO reconciliation (NEW — Phase 3)
// var seoRecon = seoReconMod.reconcileDeckPageSEO({manifest, substitutedHtml, ...});
// halt classes per commission spec §3.1 predicate table
```

### Aggregation pattern (per `bulk.js: writeBatchArtifacts`, lines 299–414)

`_reconciliation.txt` artifact emits per-category tally + per-app breakdown + per-deck table. New SEO dimension extends the artifact with a third section after theme + exerciseMode.

### Predicate-level test pattern

`scripts/publish-cli/slug.test.js` (56 unit tests) + `scripts/publish-cli/reconciliation.integration.test.js` (5 integration tests) — new SEO predicates ship with parallel coverage.

### Phase 3 wire-in scope

- New file: `scripts/publish-cli/seo-reconciliation.js` (predicate functions returning `{category, ...metadata}` shape)
- New file: `scripts/publish-cli/seo-reconciliation.test.js` (predicate unit tests)
- New file: `scripts/publish-cli/seo-reconciliation.integration.test.js` (gate-firing integration tests)
- Edit: `scripts/publish-cli/bulk.js` `dryRunOneZip` — add Step 1d invocation; `writeBatchArtifacts` — extend `_reconciliation.txt` Section 3
- Edit: `scripts/publish-cli/publish.js` — wire same predicates same way (single-deck path)

The structural complement (per §A.13.5) at apps-side ships in Phase 3b emit-site sweep.

---

## §3 — publish-cli substitution surface inventory (D4)

`scripts/publish-cli/substitute.js: apply(opts)` enumerates **32 placeholders** across two locked groups:

### Group 1 — base substitutions (13 placeholders)

| # | Placeholder | Source | Fallback path |
|---|---|---|---|
| 1 | `__CANONICAL_URL__` | computed `${CANONICAL_URL_BASE}/${locale}/decks/${slug}/` | error if slug empty |
| 2 | `__EDUCATIONAL_LEVEL__` | `metadata.age_range` → §17.8.6 mapping | taxonomy `default_age_range` if missing |
| 3 | `__EDUCATIONAL_LEVEL_LOCALIZED__` | i18n `seo.educational_level.<key>` | i18n.resolve fallback chain |
| 4 | `__END_DECK_HEADING__` | i18n `endDeck.heading` | i18n.resolve fallback chain |
| 5 | `__LINK_MORE_TYPE__` | `taxonomy.exerciseTypeFor(app, locale)` → `/<locale>/topic/<slug>/` | skip with warning if no taxonomy slug |
| 6 | `__LINK_TEXT_MORE_TYPE__` | i18n `endDeck.moreType` + `{type}` interpolation | i18n.resolve fallback chain |
| 7 | `__LINK_MORE_THEME__` | `taxonomy.themeFor(theme, locale)` (conditional on theme set) | skip + compound theme handling |
| 8 | `__LINK_TEXT_MORE_THEME__` | i18n `endDeck.moreTheme` + `{theme}` interpolation | conditional skip |
| 9 | `__LINK_MORE_LEVEL__` | `taxonomy.levelFor(ageRange, locale)` | skip with warning if no taxonomy slug |
| 10 | `__LINK_TEXT_MORE_LEVEL__` | i18n `endDeck.moreLevel` + `{level}` interpolation | i18n.resolve fallback chain |
| 11 | `__LINK_BROWSE_ALL__` | computed `/<locale>/` | always populated |
| 12 | `__LINK_TEXT_BROWSE_ALL__` | i18n `endDeck.browseAll` | i18n.resolve fallback chain |
| 13 | `<!-- HREFLANG_INSERTION_POINT -->` | v1 always empty | warns if `content_family_id` non-null |

### Group 2 — Commission B deck-end suggestion strip (19 placeholders)

`__DECK_END_SUGGESTIONS_HEADER__` (1) + `__SUGGESTION_<N>_URL__` / `__SUGGESTION_<N>_TITLE__` / `__SUGGESTION_<N>_THUMB__` for N=1..6 (18) — graceful degradation when suggestion array is short.

### Gap surface per Phase 0 — what's MISSING

The commission's F5 finding (OG tags absent) is structurally because:
- `substitute.js` enumerates ZERO OG tag placeholders (no `__OG_TITLE__`, `__OG_DESCRIPTION__`, `__OG_IMAGE__`, `__OG_TYPE__`, `__OG_URL__`, `__OG_LOCALE__`, `__OG_SITE_NAME__`)
- `substitute.js` enumerates ZERO Twitter card placeholders (no `__TWITTER_CARD__`, etc.)
- `catalog-export.js: buildSeoHead` (lines 268–331) doesn't EMIT OG/Twitter placeholder strings
- Therefore: even if publish-cli added OG-substitution logic, deck.html `<head>` has no insertion points

**Phase 2 doctrine extension scope:** §17.8.1 item 7 (NEW) enumerates OG + Twitter card tag set. Phase 3 implementation: extend `buildSeoHead` to emit placeholders + extend `substitute.js` to substitute them.

### Substitution-time contract clarifications

- **`CANONICAL_URL_BASE` is www-form** per §A.10 (line 48). The apex form was eliminated at commit `6fb6ee3d` to fix embed-iframe auto-resize per §A.14.8 step 3. Phase 0 audit confirms the constant is correct.
- **Idempotency:** substitution iterates the explicit allowlist (NOT generic regex match). Running twice produces identical output. New OG substitutions must preserve this property.
- **Order matters** for placeholder 3 vs 10 (level localized resolves before level link text). New OG substitutions must respect implicit dependency (e.g., og:title may depend on level, so resolves AFTER 3).

---

## §4 — deck.html `<head>` template state vs §17.8.1 spec (D3)

`REFERENCE TRANSLATIONS/catalog-export.js: buildSeoHead(opts)` at lines 268–331 emits 4 elements; §17.8.1 spec lists 6 items.

### Line-by-line diff

| §17.8.1 item | Spec requirement | Emitted? | Surface |
|---|---|---|---|
| 1 | `<html lang="...">` from manifest language | ✓ (outside buildSeoHead, in deck.html shell) | confirmed empirically (en→`<html lang="en">`; de→`<html lang="de">`) |
| 2 | `<title>` w/ `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder | ✓ partial | **emits English-only literal `worksheetWord`** at line 282 (root cause of F3+H1) |
| 3 | `<meta name="description">` w/ `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder | ✓ partial | **emits English-only literal `freeInteractive`/`forWord`/`printOrPlay`** at lines 291–294 (root cause of F2+H1) |
| 4 | `<link rel="canonical" href="__CANONICAL_URL__">` | ✓ (line 328) | publish-cli substitutes correctly to www form |
| 5 | `<!-- HREFLANG_INSERTION_POINT -->` marker | ✓ (HREFLANG_MARKER constant at line 336) | v1 substituted to empty string per §17.8.7 |
| 6 | Schema.org `LearningResource` JSON-LD | ✓ (lines 299–319) | inLanguage = bare ISO 639-1 (Phase 1 5-item batch upgrades to BCP-47) |

### NEW spec item the gate must enforce

| §17.8.1 item (proposed Phase 2 extension) | Requirement | Current state |
|---|---|---|
| 7 (NEW) | OG + Twitter card tags | ❌ NOT emitted — F5 |

### F3+H1 root cause located at catalog-export.js

The English-text intermixing (Commission A H1 + Phase 0 F3 broader observation) traces to `buildSeoHead` opts — caller-side passes `worksheetWord`, `freeInteractive`, `forWord`, `printOrPlay` as English literals. Per `extractDeckBundle()` in each of the 29 §14.10 apps, these are sourced from `t('worksheet')`, `t('seoFreeInteractive')`, `t('seoFor')`, `t('seoPrintOrPlayOnline')` — but per §17.8.14 srLang-keyed lookup convention, the `t()` helper's locale-binding diverges per-app (sudoku binds `currentLocale`; cryptogram binds `uiLocale`; picture-path mixed).

**For SEO emission, the `t()` resolution at deck-generation time may be returning English keys when content language is non-English** — same root cause class as the `srLang` fix at `573f69e0` (cryptogram + picture-path lookup-mechanism fix).

Phase 1 strand-selection adjudication: locale-residue path (b) trace per concern 3 instruments these emit-sites at the apps' `extractDeckBundle()` boundary. This is the 29-app emit-site sweep at Phase 3b.

### Multi-`<h1>` violation (NEW finding)

Production curl `https://www.lessoncraftstudio.com/en/decks/sudoku/`:

```html
<h1 class="lcs-title" id="lcs-title">Picture Sudoku</h1>
<h1 class=\"lcs-celebration__title\">"+T("youDidIt")+"</h1>
```

Two `<h1>` elements emitted. The celebration screen is hidden by default (CSS class state) but the HTML is in the document, indexable by Googlebot. §17.8.1 item 1: "One `<h1>` per deck. One only."

**Phase 1 strand-selection adjudication:** include this as a halt-class predicate in the Phase 3a gate (`MULTIPLE_H1_DETECTED`). Authoring-side fix at Phase 3b: change `<h1 class="lcs-celebration__title">` to `<h2 class="lcs-celebration__title">` or remove the celebration screen's heading element. Touches `REFERENCE TRANSLATIONS/catalog-export.js` celebration template (single shared site) — small surface; 29-app fan-out unnecessary.

---

## §5 — Production-side empirical state (D2)

Sample curl results across en + de + apex / canonical / no-trailing-slash variants on 2026-05-09:

### Routing matrix

| URL form | HTTP status | Notes |
|---|---|---|
| `https://www.lessoncraftstudio.com/en/decks/sudoku/` | **200 ✓** | Direct resolution; no redirect chain. `cf-cache-status: DYNAMIC` (5-min TTL per §15.8). |
| `https://lessoncraftstudio.com/en/decks/sudoku/` (apex) | **301** → www form | §A.10 origin nginx www-canonicalization fires. **F1 source if internal/external links use apex form.** |
| `https://www.lessoncraftstudio.com/en/decks/sudoku` (no trailing slash) | **404** | §15.7 nginx trailing-slash-strict; falls through to Next.js catch-all which returns 404. |

### Deck.html emission samples

**en/sudoku (extracted via grep):**
- `<html lang="en">` ✓
- `<title>Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio</title>`
- `<meta name="description" content="Free interactive Picture Sudoku Worksheet for Kindergarten. Print or play online.">`
- `<link rel="canonical" href="https://www.lessoncraftstudio.com/en/decks/sudoku/">`
- `<h1 class="lcs-title">Picture Sudoku</h1>`
- `<h1 class="lcs-celebration__title">...</h1>` ❌ (multi-h1; new finding)
- **NO** `<meta property="og:*">` tags (F5)
- **NO** `<link rel="alternate" hreflang="...">` tags (M1; expected v1 per §17.8.7)

**de/sudoku (extracted via grep):**
- `<html lang="de">` ✓
- `<title>Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio</title>` ❌ — IDENTICAL to en title; ENTIRELY ENGLISH despite `lang="de"`
- `<meta name="description" content="Free interactive Picture Sudoku Worksheet for Kindergarten. Print or play online.">` ❌ — ENTIRELY ENGLISH
- `<link rel="canonical" href="https://www.lessoncraftstudio.com/de/decks/sudoku/">` ✓ (locale-correct path)
- **NO** OG tags
- **NO** hreflang

### F1 framing reconciliation

Operator commission spec §0 framed F1 as "canonical URL redirected (canonical points at a URL that 301/302s before resolving 200)." Phase 0 empirical state: **the substituted canonical URL on production decks resolves direct 200; the 301 only fires on apex form OR no-trailing-slash form.** F1 is therefore narrower than the framing suggests — three candidate sources to investigate at Phase 1:

1. **Pre-`6fb6ee3d`-retrofit decks.** Decks published before 2026-05-XX may have apex-form canonicals. Commit `6fb6ee3d` shipped `rewrite-canonical-host.js` retrofit. Phase 1 verifies whether all production decks have www-form canonicals OR whether apex-form residue persists.
2. **Internal links pointing to apex form.** Some component code may emit apex-form URLs. Phase 1 surveys all deck-link emission sites for apex form.
3. **External-referrer reports.** If F1 surfaced from external SEO-tool audit (Google Search Console, Ahrefs, etc.), the report may reflect 1-hop redirects from external referrers using apex form. Out of scope for this arc; not a code defect.

### F4 framing reconciliation

Operator commission spec §0 framed F4 as "no internal links pointing to deck pages." Phase 0 empirical state: **internal links to deck pages exist but density is uneven** (D5 detail).

---

## §6 — Inbound-link surface state (D5)

12 source files emit `/<locale>/decks/<slug>/` URLs. Density classification:

| Surface | Per-deck inbound count | Class |
|---|---|---|
| **Sitemap shards 0+1** (`frontend/app/sitemap.ts`) | 1 entry per published deck | crawler-side; not user-side hub authority |
| **Topic destination pages** (`frontend/app/[locale]/topic/[slug]/page.tsx`) | 1 entry per matching axis-key (3 axes per deck per §16.5: exercise-type, theme, educational-level) | hub authority; substantial |
| **Variety strips** (`frontend/components/catalog/VarietyStrip.tsx`) | rotational; cross-locale + neighboring axes per §16.2 | discovery; rotational |
| **Sibling axis strip** (per `15444fe8` Arc 6a) | 1-2 entries per neighboring axis-key | hub authority |
| **Cross-axis pivots** | rotational | discovery |
| **Homepage BreadthGrid** (`frontend/components/homepage-v2/BreadthGrid.tsx`) | 8 thumbnails (6 visiting + 2 cross-locale) per §18.4 | concentrated authority; 9-cell day-of-week rotation |
| **Featured deck tile** (`frontend/lib/featured-deck-by-locale.ts`) | 1 per locale | concentrated authority |
| **EmbedViralityCTA** (homepage Section 1) | 1 per locale | primary CTA |
| **Locale-root page** (`frontend/app/[locale]/page.tsx`) | varies | needs Phase 1 deeper read |
| **Subscriber surfaces** (collections, workspace, BulkAddToCollectionPicker) | gated; not authoritative SEO | excluded |
| **Deck-end suggestion strip** (Commission B) | 6 outbound per deck | deck-to-deck mesh, not hub-to-spoke |

### F4 framing nuance

The gap is NOT "no internal links" — it's **uneven density gradient**:

- **Popular-axis decks** (e.g., `/en/decks/sudoku/`): topic-page + variety-strip + sibling-strip + BreadthGrid + featured + EmbedViralityCTA + 6 deck-end suggestions = ~10+ inbound links
- **Long-tail decks** (e.g., a single en deck at a 1-deck axis-key): topic-page + sitemap + 6 deck-end suggestions = ~7-8 inbound links
- **Sitemap-only ceiling:** if a deck doesn't surface on its own topic page (per §16.8.1 TOPIC_PAGE_SIZE=24 pagination), it falls behind; sitemap entry alone is the floor

Per commission spec §3.1 predicate "Inbound-link surface for this deck includes ≥ minimum invariant," Phase 1 5-item batch surfaces:
- Adjudication: minimum N inbound links per deck (CC pre-recommends N≥3 from non-sitemap surfaces; structural minimum ensures no deck is sitemap-only)
- Implementation: gate predicate at Phase 3a uses indexed DB + lib query to count inbound surface emissions; warn-class pre-Phase-5; halt-class post-Phase-5 per commission spec §3.1

### Topic-page architecture reference (per `frontend/app/[locale]/topic/[slug]/page.tsx`)

- 11-locale TOPIC_LOCALES coverage (full launch envelope per §19)
- ISR `revalidate=3600`
- Honest sibling enumeration via `getTopicSiblings()` — only declares hreflang siblings with ≥1 deck and localized slug per §17.4
- Renders DeckGridClient + VarietyStrip + SiblingAxisStrip + CrossAxisPivots + FilterSidebar + Pagination per Arc 6 split
- Per §16.8.1 TOPIC_PAGE_SIZE=24 — paginated beyond 24 decks per (axis-key, locale)

Topic page IS the dominant deck-page authority surface. F4 remediation likely targets:
1. **Locale-root page** deck enumeration density (Phase 1 deeper read needed)
2. **Long-tail deck surfacing** beyond pagination (related-decks strips on deck pages? cross-axis discovery beyond topic-page-only?)
3. **Sitemap-only ceiling** mitigation (every deck reachable from ≥N hub surfaces)

---

## §7 — Image-vocabulary register cross-check (D7)

Sample of `REFERENCE TRANSLATIONS/image-vocabulary.js` (1,246 entries; ~1,263 post Stream A Arc 12 +17 family/action additions per SESSION-STATE).

### Per-locale register signals

**`pt`** (Brazilian Portuguese canonical per §6 lock at `589fd554`):
- `baby.pt = "Bebê"` (BR circumflex; EU = "Bebé")
- `baby-bottle.pt = "Mamadeira"` (BR; EU = "biberão")
- `baby-carriage.pt = "Carrinho de bebê"` (BR diminutive)
- `bandage.pt = "Bandagem"` (BR)
- Confirmed BR-canonical; matches §6 caminhão / ônibus / educação infantil pattern

**`es`** (Latin American with Mexican signal):
- `apricot.es = "Chabacano"` — **strongly Mexican**; European Spanish + most Latin American = "albaricoque"
- `avocado.es = "Aguacate"` — Latin American canonical (some EU usage)
- `apple-pie.es = "Pay de manzana"` — **strongly Mexican** (EU + most LatAm = "tarta de manzana")
- `baby-carriage.es = "Carriola"` — **strongly Mexican** (EU = "carrito de bebé"; Argentina = "cochecito")
- `bell-pepper.es = "Pimiento"` — universal
- `bagel.es = "Bagel"` — loanword

**Cumulative signal: es register is es_MX**. Stronger signal than just es_419 (LatAm-canonical). The Mexican-specific entries (chabacano, pay, carriola) wouldn't be in es_ES OR es_AR vocabulary.

**Other locales — sampled and uncontroversial:**
- `de` — universal Hochdeutsch (no Austrian/Swiss German variants)
- `nl` — universal Dutch (no Flemish-specific variants surfaced)
- `fr` — needs Phase 1 deeper sample (sufficient signal not surfaced in 100-row sample; verify against weekend / fin de semaine + automobile / voiture distinctions)
- `it` — universal
- Nordic (`sv`, `da`, `no`, `fi`) — uncontroversial; single dominant register per locale
- `en` — international school / multilingual K-3 context; en_US captures default orthography (color/airplane)

### Phase 1 implication

**`es_MX` (or `es_419`) supersedes `es_ES`** as the locked BCP-47 candidate. Operator-strategic at Phase 1 5-item batch:
- `es_MX` is country-specific; reads cleaner to crawler signals; matches the strongest Mexican-specific lexicon entries
- `es_419` is region-specific (UN regional code for Latin America); broader; less precise
- `es_ES` is wrong on the same grounds the original `pt_PT` draft was wrong

CC pre-recommends `es_MX` per the strongest specific signal. Operator confirms.

---

## §8 — BCP-47 candidates per locale (D9)

Final candidate set for Phase 1 5-item batch operator adjudication (per concern 1 supplement + concern 7 batching shape):

| Locale | Pre-recommendation | Phase 0 register evidence | Phase 1 lock candidate |
|---|---|---|---|
| `en` | `en_US` | en_US default orthography per international school audience | `en_US` (uncontroversial) |
| `de` | `de_DE` | Hochdeutsch | `de_DE` (uncontroversial) |
| `es` | `es_ES` | **Mexican signal: chabacano / pay / carriola / aguacate** | **`es_MX`** (revise; or `es_419` regional) |
| `nl` | `nl_NL` | universal Dutch | `nl_NL` (uncontroversial) |
| `it` | `it_IT` | universal | `it_IT` (uncontroversial) |
| `fr` | `fr_FR` | needs deeper Phase 1 sample | `fr_FR` likely (verify Phase 1) |
| `pt` | **`pt_BR`** (locked concern 1) | BR canonical per §6 | `pt_BR` (locked) |
| `sv` | `sv_SE` | universal | `sv_SE` (uncontroversial) |
| `da` | `da_DK` | universal | `da_DK` (uncontroversial) |
| `no` | `no_NO` | bokmål per §6 lock at `a47ea021` | `no_NO` (uncontroversial; matches existing locale code) |
| `fi` | `fi_FI` | universal | `fi_FI` (uncontroversial) |

Final per-locale BCP-47 lock + flag-iconography decoration question (for `pt`: rotate Portugal SVG to Brazil SVG?) lands in Phase 1 5-item batch operator adjudication.

---

## §9 — Filed `[FIX][SEO]` candidate registry verification (D1)

Commission A's `docs/audit-results/deck-page-indexability.md` (2026-05-08, audit commit `4f920f91`) IS the canonical filed-candidate registry for §0 absorption envelope. Reconciliation:

| Commission spec §0 absorption envelope item | Commission A audit reference | Phase 0 status |
|---|---|---|
| H1 (es title English-text intermixing) | §H1 HIGH-severity | **expanded:** F3+H1 affects ALL non-English locales, not just es |
| M1 (hreflang absent) | §M1 MEDIUM | preserved per §17.8.7 v1 split — NOT lifted |
| M2 (Open Graph metadata absent) | §M2 MEDIUM | lifted to active as F5 |
| M3 (robots.txt AI-bot Disallow contradicts §3.5) | §M3 MEDIUM | lifted as adjacent `[CHORE]` per commission spec §6 |
| M4 (hreflang-symmetry.json stale) | §M4 MEDIUM | re-evaluate at Phase 1; small `[CHORE]` candidate |
| L1 (sitemap shard count: 1 / 4 architecture target) | §L1 LOW | **status changed:** Phase 0 confirmed sitemap shards 0+1+2+3 ARE shipping per `frontend/app/sitemap.ts: generateSitemaps`; per Commission A audit only "shard 0" was returning content — that may have been a sitemap query issue OR the architecture has since landed all 4. Verify Phase 1. |
| L2 (no explicit `<meta name="robots">`) | §L2 LOW | informational; not lifted |
| L3 (single sitemap shard mixes URL classes) | §L3 LOW | **status changed:** Phase 0 confirms 4-shard architecture per §17.10.1 IS implemented — partition-by-`Deck.id`-last-char-parity for shards 0+1; intersections at shard 2; other at shard 3. Resolved. |
| L4 (sitemap lastmod stamp) | §L4 LOW | informational; never an issue |

### Newly surfaced at Phase 0 (not in Commission A audit)

| New finding | Severity | Action |
|---|---|---|
| Multi-`<h1>` celebration screen in deck.html | MEDIUM | folded into Phase 3a gate predicate `MULTIPLE_H1_DETECTED`; Phase 3b template fix |
| F3+H1 affects ALL non-English locales (not just es) | HIGH (broader than Commission A) | absorbed by H1 fix scope (concern 3 path-(b) trace) |
| `inLanguage` field BCP-47 alignment with og:locale | MEDIUM | Phase 1 5-item batch + Phase 2 doctrinal absorption |
| `es` register is Latin American (concern 1 supplement extension) | MEDIUM | Phase 1 5-item batch operator adjudication |

### §0 absorption envelope completeness

**Commission A audit + Commission spec §0 + Phase 0 newly-surfaced findings** together cover the empirical landscape. Phase 1 strand-selection list draft below incorporates all.

---

## §10 — Updated F1–F5 framing per Phase 0 reconciliation

| Finding | Original commission spec §0 framing | Phase 0 empirical reconciliation |
|---|---|---|
| F1 — canonical redirected | "canonical points at URL that 301/302s before HTTP 200" | **Narrower than framed.** Substituted canonicals (www form, trailing-slash) resolve direct 200. 301 fires on apex form OR no-trailing-slash. Phase 1 investigates pre-retrofit residue + internal-link emission sites. |
| F2 — meta description not unique | "not unique across deck-page surface" | **Confirmed empirically.** de/sudoku description is byte-identical to en/sudoku. Root cause at `buildSeoHead` lines 291–294 (English literals from `freeInteractive`/`forWord`/`printOrPlay`). |
| F3 — title not unique | "not unique across deck-page surface" | **Stronger than framed.** Cross-locale: de/sudoku title = en/sudoku title (entirely English). Cross-deck same-locale: any 2 sudoku decks at same level emit identical title. Two distinct uniqueness violations. |
| F4 — no internal links pointing to deck pages | "deck-end strip is deck-to-deck mesh; hub-to-spoke is gapped" | **Nuance: density gradient, not absence.** Topic pages + variety strips + BreadthGrid + featured all link to decks. Long-tail-deck inbound count varies. F4 framing for Phase 1: structural minimum per deck (≥N from hub surfaces). |
| F5 — Open Graph tags missing | "some OpenGraph tags missing" | **Confirmed empirically: ALL OG tags missing (zero).** No `<meta property="og:*">` on any sampled deck.html. Doctrinal gap per §8.5 vs §17.8.1 (the spec under-specifies; concern was correct). |

---

## §11 — Pre-Phase-1 strand-selection list draft (5-item adjudication batch)

Per concern 7 batching shape; CC pre-recommends marked **(★)**. Operator surfaces these at Phase 1 close in single batched response.

### Item 1 — Sub-arc shape

| Option | Description |
|---|---|
| **(★) A** — Single-pass remediation | F1+F2+F3+F4+F5 ship as one arc. Recommended per gate-class framing + shared root substrate. |
| B — Split: (gate + retrofit) vs (inbound-link uplift) | F4 inbound-link uplift becomes its own sub-arc; F1+F2+F3+F5 ship in this arc. |
| C — Defer F4 to separate arc | F4 fully separate; this arc ships F1+F2+F3+F5 + retrofit. |

### Item 2 — Per-locale BCP-47 country-suffix locks (per §8 Phase 0 evidence)

| Locale | CC pre-recommendation | Operator action |
|---|---|---|
| `en` | **(★) `en_US`** | confirm |
| `de` | **(★) `de_DE`** | confirm |
| `es` | **(★) `es_MX`** (revised from `es_ES` per §8 register evidence) | confirm OR override to `es_419` (LatAm regional) OR `es_ES` |
| `nl` | **(★) `nl_NL`** | confirm |
| `it` | **(★) `it_IT`** | confirm |
| `fr` | **(★) `fr_FR`** (verify at Phase 1 deeper sample) | confirm OR revise after Phase 1 deeper read |
| `pt` | **`pt_BR`** (locked at concern 1 supplement) | locked |
| `sv` | **(★) `sv_SE`** | confirm |
| `da` | **(★) `da_DK`** | confirm |
| `no` | **(★) `no_NO`** | confirm |
| `fi` | **(★) `fi_FI`** | confirm |

### Item 3 — Retrofit Option A vs B (per commission spec §2 Phase 4a)

| Option | Description |
|---|---|
| **(★) A** — Mutable-regions contract extension | Add `<!-- SEO_INSERTION_POINT -->` markers; allow `republish-seo` mode that re-substitutes only the SEO block. Cheaper but extends §17.8 mutable-regions contract. |
| B — Full deck-republish wave | Regenerate every deck from current manifest with new SEO emission. More expensive; visual-regression risk per §17.8 Phase 4 production-canonical-path verification. |

### Item 4 — Inbound-link minimum invariant N (per commission spec §3.1)

| Option | Description |
|---|---|
| **(★) N≥3** non-sitemap inbound links per deck | Structural minimum ensuring no deck is sitemap-only. Topic page (always) + at least 2 of {variety-strip, sibling-strip, deck-end suggestion, BreadthGrid, locale-root}. |
| N≥2 | Lower bar; sitemap + topic-page always; may leave some long-tail decks under-anchored |
| N≥5 | Higher bar; may require structural extension to small-axis-key topics |

### Item 5 — NSR-flag scope per locale for non-English title/description templates

Per §17.5.1 in-flight bifurcation discipline:
- **(★)** Tier 1 (en, de) — ship without flag; CC quality strong
- **(★)** Tier 2 (es, nl) — ship without flag; CC quality strong (but es register adjudication at Item 2 may surface)
- **(★)** Tier 3 (sv, fi, no) — **ship with NSR flag** per §17.5.1 Nordic posture
- **(★)** Tier 4 (fr, it, da, pt) — operator-strategic split:
  - Romance (fr, it, pt) — likely no flag per stronger Claude Romance assessment
  - Nordic (da) — flag per Nordic posture

### Phase 3 close — predicate halt-vs-warn split adjudication

Deferred to Phase 3 close per concern 7 (single-item adjudication post-Phase-2 doctrinal absorption).

### Phase 6 close — fold-queue batching adjudication

Deferred to Phase 6 close per concern 7.

---

## §12 — Cross-references

- Commission spec: 4-turn ratification chain CC→operator→CC→operator (this conversation)
- Commission A audit deliverable: `docs/audit-results/deck-page-indexability.md` (2026-05-08, commit `4f920f91`)
- H1 follow-on file: `docs/audit-results/fix-seo-h1-es-title-localization.md` (queued; superseded by this arc)
- CLAUDE.md §17.8.1 deck.html SEO surface spec
- CLAUDE.md §17.8.5 publish-cli substitution responsibility
- CLAUDE.md §17.8.7 v1/v2 hreflang split
- CLAUDE.md §17.8.14 srLang-keyed lookup convention (root cause class for F3+H1)
- CLAUDE.md §15.16 reconciliation gate architecture (sibling pattern for new SEO gate)
- CLAUDE.md §15.17 salvage script pattern (Phase 4a retrofit precedent)
- CLAUDE.md §17.10.1 4-shard sitemap architecture
- CLAUDE.md §A.10 origin nginx www-canonicalization
- CLAUDE.md §A.13.5 Shape A authoring complement (Phase 3b emit-site sweep precedent)
- CLAUDE.md §A.13.7 first-publish-verification cadence
- CLAUDE.md §A.13.11 operator-strategic adjudication batching
- CLAUDE.md §A.14.5 audit-only commission shape
- CLAUDE.md §A.14.8 pre-publish-wave audit doctrine
- §6 vocabulary register lock at `589fd554` (pt_BR canonical)
- HOMEPAGE-SAVE-STATE.md Arc 2 flag-iconography precedent (decoration-class, NOT doctrinal — clarified at concern 1)
- `important/SESSION-STATE.md` reminders 1-10 (working-memory operational discipline)

---

## Phase 0 → Phase 1 handoff

Phase 1 commences on operator review of this audit + 5-item batch adjudication response. CC produces:

1. Finding-class taxonomy per F1–F5 (failure-shape diagnosis with Phase 0 reconciliation absorbed)
2. Doctrinal-extension working draft at `docs/SEO/deck-page-arc-phase-1-taxonomy.md` + `docs/SEO/deck-page-arc-phase-2-doctrine-draft.md`
3. Empirical Phase 1 deeper reads on:
   - Locale-root page (`frontend/app/[locale]/page.tsx`) deck-link enumeration density
   - `fr` register sample for fr_FR vs fr_CA Phase 1 lock confirmation
   - Pre-`6fb6ee3d`-retrofit canonical residue audit
   - Sitemap shard 0+1+2+3 production state (Commission A's "1 shard" finding may be stale)

Phase 2 produces doctrinal extension working draft (no code changes; per commission spec §2 Phase 2 framing).

Phase 3a + 3b + 4a + 4b + 5 + 6 follow per commission spec §2 phase structure.

---

*End of Phase 0 substrate audit. Filesystem-level deliverable per §A.14.5 audit-only commission shape; commit per §11 commit conventions: `[ARC][SEO][DECK-PAGE] Phase 0 — substrate audit`.*
