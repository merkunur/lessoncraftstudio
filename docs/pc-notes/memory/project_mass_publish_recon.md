# project_mass_publish_recon.md

**Authored:** 2026-05-03 (post `3569be97` admin-bypass deploy)
**Scope:** readiness recon for the operator-stated 20,000-deck-catalog target across 6 main languages (en, es, pt, it, de, fr).
**Status:** read-only. Zero commits, pushes, deploys, or DB writes during recon. Document persists as a decision-support artifact until operator decides path; no doctrine commit at recon-write time.

**Path-drift recorded (small audit-trail item):** brief referenced `frontend/lib/topics-taxonomy.json`; actual canonical path is `frontend/config/topics-taxonomy.json`. Same correction applies to any other surface that names the lib/ path. Filed for next doctrine pass.

---

## Section A — Locale availability

### A1. Which of the 6 main-target locales are publishable today?

**Three of the six are publishable through publish-cli with zero new arc work: en, de, es.**

The remaining three (pt, it, fr) are NOT publishable today. None of the three layers required for publish-readiness is in place for them:

| Layer | en | de | es | nl | pt | it | fr |
|---|---|---|---|---|---|---|---|
| `TOPIC_LOCALES` registration (frontend/app/[locale]/topic/[slug]/page.tsx:19) | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| topics-taxonomy.json axis-key slug-map coverage (38 of 39 axis-keys) | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `lessonPlanReader` namespace in messages/{locale}.json | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `topicPage` / `workspace` / `collections` namespaces | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `homepage` / `footer` namespaces | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**nl is publishable but is NOT in the operator's stated 6-main-target set** (operator stated: en, es, pt, it, de, fr). nl was Tier 2 launch (`d3b4f962`); the operator's mass-publish target excludes it. This is a meaningful clarification: nl currently has 29 published decks (full Tier 2 catalog) and full chrome but is now de-prioritized in scaling work. See A3.

**Empirical confirmation (Hetzner, post-`3569be97`):**
- Decks published: 29 each in en, de, es, nl. 0 in pt, it, fr.
- Topics seeded: 39 rows, all `language=en` per Schema-intent-B (locale-agnostic English-canonical slug + per-locale title Json map).
- LessonPlans seeded: 4 (en+de × addition+sudoku), per Phase 1c apply at `e912b805`.

### A2. pt + it + fr launch arc shape

Each follows the **Tier 2 ES + NL precedent at `d3b4f962`**: Track A (structural) + Track B (chrome) + Track C (deck-creation), per CLAUDE.md §19 + the 14-commit arc shape recorded in SESSION-STATE.md §6.

**Per-locale forecast** (from the closeout commits at `eefced25` ES and `d3b4f962` NL):

| Track | Scope | Commits | Sessions (≈) | Caveats |
|---|---|---|---|---|
| Track A | TOPIC_LOCALES extension + topics-taxonomy.json slug-map authoring (38 axis-keys × 1 locale) | 1 | 1 | Mechanical authoring once axis-key list is locked |
| Track B Wave 1 | homepage + footer + topicPage namespace authoring | 1 | 1 | Per ES `4e61c24d` + NL `e5679d69` |
| Track B Wave 2 | workspace + collections + bulk + share namespace authoring | 1 | 1 | Per ES `78d5d737` + NL `8bc53301` |
| Track B Wave 3 | lessonPlanReader namespace authoring | 1 | 0.5 | 22-key namespace; smaller than Wave 1+2 |
| Track C | Deck-creation: 7 batches × 4-7 ZIPs per batch = ~28-29 decks | 7 | 7 | Per `b18b8654`–`eefced25` ES + `d361a03e`–`d3b4f962` NL precedent |
| **Total per locale** | **~60 deck publishes + chrome** | **~11** | **~10.5** | |

**Across pt + it + fr:** ~33 commits + ~32 sessions to bring all three up to Tier 2-equivalent state (29 decks + full chrome each = 87 new published decks).

This brings the catalog from 116 → 203 published decks across 7 locales (en+de+es+nl + pt+it+fr). Still well below the operator's 12,000+-deck target across 6 main locales (2,000/locale × 6 = 12,000), but each Tier-2-equivalent launch establishes the substrate for the per-locale mass-publish work that follows.

**publish-cli throughput beyond Tier-2 substrate:** at the operator's stated 2,000 decks/locale, each main locale needs ~1,971 additional decks beyond the 29 Tier-2 baseline. At ~7 decks/batch × ~10 minutes/batch (current observed throughput, ES Track C cadence), that's ~282 batches/locale × 6 main locales = ~1,690 publish-cli batches total = ~169 batch-hours of CLI execution time at 6 locales × 1,971-decks-each over the Tier-2 baseline. See B1 for the throughput discussion.

### A3. nl + Tier 3 (sv/fi/no) + Tier 4 (da) status under the 6-main-target frame

The operator's stated 6 main-target locales are **en + es + pt + it + de + fr**. The platform's 11 supported languages per CLAUDE.md §6 are en, de, fr, es, pt, it, nl, sv, da, no, fi.

**Outside the 6-main-target set:** nl + sv + fi + no + da (5 of 11). The operator should re-confirm the role of these 5 in the scale plan:

| Locale | Current state | Implied role under "6 main + 5 other" |
|---|---|---|
| nl | 29 published decks; full Tier 2 chrome | Maintenance only? Smaller catalog target? Stop-publishing? |
| sv | 0 published decks; homepage+footer chrome only; 121 MISSING_MESSAGE warnings | Tier 3 launch arc deferred per §19 |
| fi | 0 published; homepage+footer chrome only | Tier 3 launch arc deferred |
| no | 0 published; homepage+footer chrome only | Tier 3 launch arc deferred |
| da | 0 published; homepage+footer chrome only | Tier 4 launch arc deferred (paired with NSR posture per §17.5) |

**Decision point:** does the operator want the 5 non-main locales at:
1. **Permanent freeze** (nl stays at 29 decks; sv/fi/no/da never launch) — frees scaling effort entirely for the 6 main
2. **Smaller catalog tail** (e.g., 100-500 decks/locale; mostly themeless app-coverage) — preserves multilingual reach without the per-locale-2000-decks investment
3. **Eventually-equal** (mass-publish scales to 2000/locale across all 11 locales over a longer timeline) — 22,000-deck target rather than 12,000

This recon does not propose answers; the question itself is the surface. The empirical state is that nl is currently the only non-main locale with any deck inventory; sv/fi/no/da are full-launch-pending.

### A4. pt + it + fr pedagogical-convention decision points

Each main-target Tier 4 locale carries native-language K-3 pedagogical conventions that need locking before deck content + lesson-plan content can be authored at scale. Tier 1+2 covered en/de/es/nl per the discipline documented in this session's lesson-plan work (CLIL stance + per-locale rendering + native-language slugs per §17.4). pt/it/fr equivalents:

**Portuguese (pt):**
- **Brazilian vs European Portuguese.** This is the most consequential register decision. K-3 vocabulary divergence is significant: BR `caminhão` vs EU `camião`; BR `ônibus` vs EU `autocarro`; BR `trem` vs EU `comboio`. K-3 phonetics differ enough that audio guidance (if any) would diverge. School terminology: BR `educação infantil`/`anos iniciais` vs EU `pré-escolar`/`1.º ciclo`.
- **Decision shape:** pick one as canonical pt OR ship pt-BR + pt-PT as separate locales (which is then 7 main + 1 split, not 6 main).

**Italian (it):**
- Less internal variation at K-3 vocabulary level. Regional dialects exist but classroom Italian is standardized.
- **Classroom-idiom lock:** `scuola dell'infanzia` (3-5) / `scuola primaria` (6-10). These are formal MIUR terms; informal `materna` / `elementari` is also widely used. Pick one register for educational-level axis-key slugs + lesson-plan body language.
- Article-elision conventions in noun phrases (gli/lo/l') need decision when authoring titles. Less consequential than pt-BR/pt-PT.

**French (fr):**
- **Regional variation:** France vs Belgium vs Switzerland vs Quebec. Less consequential than pt-BR/pt-PT but still real at K-3 vocabulary. Belgium/Switzerland use `septante`/`nonante` for 70/90 instead of standard French `soixante-dix`/`quatre-vingt-dix` — relevant if math content is at scale. Quebec orthography differs slightly.
- **Recommended canonical:** France French (Hexagonal). Largest market; aligns with secondary international school audience (most international schools using French follow Métropole conventions). Belgium/Switzerland teachers can adapt.
- **Classroom-idiom:** `école maternelle` (3-6) / `école élémentaire` (6-11). Formal République française terms; well-established.

**Tier 2 precedent:** ES used standard Castilian Spanish (no Latin-American-Spanish split); NL used standard Dutch (no Belgium-Dutch split). Both worked at Tier 2 scale. The pt-BR/pt-PT decision is the most genuinely-divergent one in the pt+it+fr set; it/fr are closer to a Tier-2-style "canonical-only" lock.

---

## Section B — Catalog scale (20,000-deck target capacity)

### B1. publish-cli throughput

**Observed throughput (ES + NL Track C cadence, May 2026):** ~7 decks per batch × ~10 minutes per batch end-to-end, including pscp upload + dry-run + confirm + per-deck DB INSERT + Cloudflare cache TTL window. Source: 14 commits across `b18b8654`–`eefced25` (ES) + `d361a03e`–`d3b4f962` (NL) per SESSION-STATE.md §6, with batches spanning May 2-3 in the publish-inbound dot-prefixed archive dirs (`.phase3a-batch-1-matching` through `.phase3a-batch-5b-2-picture-trail` etc.).

**Mass-publish forecast at 6 main locales × 2,000 decks each = 12,000 decks total:**

| Step | Per-locale | Across 6 main |
|---|---:|---:|
| Decks needed beyond Tier-2 baseline | ~1,971 | ~11,826 |
| Batches at 7 decks/batch | ~282 | ~1,690 |
| Wall-clock at 10 min/batch | ~47 hours | ~282 hours |
| Realistic operator-attended sessions (4-hour shifts) | ~12 | ~70 |

**At 20,000 decks total (operator's catalog target including 5-non-main-locales tail):** add ~8,000 decks over the 12,000 main-set figure (assumed distributed unevenly across nl + Tier 3+4 per A3). ~1,140 additional batches → ~190 hours additional wall-clock.

**Throughput is not architecturally bounded today.** publish-cli works correctly at 7-decks-per-batch + per-locale folder isolation per §15.15. Scaling to mass-publish is the **labor input**, not the **publish pipeline**. Bottleneck shifts to:

1. **Operator authoring** of the source ZIPs (each ZIP requires a deck generated in the originating worksheet-generator app, themed/themeless choice, image curation, then ZIP-export). At ~7 ZIPs per pre-publish-cli batch authoring session, this is a 4-hour authoring session per batch.

2. **Operator strategic call** at mid-arc Section 2 stagger decisions (per `0bb02030` precedent), which currently fire every ~7 batches. At 1,690 mass-publish batches, that's ~240 stagger decisions over the full mass-publish arc. Most can be delegated to mechanical heuristics; a handful need operator pick.

3. **Cloudflare cache TTL windows** at 5min per §15.8. Sequencing 7 cache-invalidations per batch × 1,690 batches = ~11,800 individual edge-cache misses. At Cloudflare free-tier rate limits, this is comfortably under any throttling threshold. See B5.

**Empirical recommendation:** the publish-cli throughput is the labor variable, not the technology variable. The bottleneck is operator-authoring sessions at the source (worksheet-generator apps producing the ZIPs in the first place).

### B2. Build-time `generateStaticParams` performance

**Current build state at 116 decks (post-`3569be97` deploy):**
- BUILD_ID timestamp: 2026-05-03 21:51 — built ~2 minutes after deploy.sh started (21:49 backup creation → 21:51 BUILD_ID).
- `.next/` directory: 4.4GB total
- Topic-page URLs at current scale: ~38 axis-keys × 4 locales (Tier 1+2) = ~152 topic-page URLs generated by `generateStaticParams`. Where `listNonEmptyAxisKeys` returns "decks exist for this axis-key in this locale" (the §16.6 honesty discipline).

**Topic-page URL count at 20,000-deck scale across 6 main locales:**
- 39 axis-keys total (38 + picture-trail en-only) × 6 locales = ~228 topic-page URLs
- Increment: ~76 additional URLs over current

**Build-time forecast:** generateStaticParams performance scales primarily with URL count (not deck count). Per-URL generation = generateMetadata + page render at build time. Currently ~2 minutes total build for 152 URLs ≈ 0.8s per URL on average. At 228 URLs: ~3 minutes total build. Linear extrapolation; nothing in the topic-page architecture would expect non-linear behavior.

**Build-time risk: low.** Even at 5,000+ decks, build stays under 5 minutes. Above 10,000+ decks where topic pages might grow (cross-product topic pages per CLAUDE.md §16.1, currently NOT implemented — only single-axis topic pages exist), build-time risk increases but is bounded by ISR fallback at the route's `generateStaticParams` try/catch (line 86-89): if DB is unreachable OR slow, the catch block falls back to empty array; ALL topic pages become first-hit-ISR rather than build-time-static.

**Mitigation lever already in place:** the topic-page route declares `export const revalidate = 3600;` (1-hour ISR window). Build-time can be 100% empty-array if needed; first hit per (locale × axis-key) URL builds-and-caches at first request. Graceful degradation is built in.

**No explicit Next.js mitigation needed before B-tier scale (~5,000 decks).**

### B3. Sitemap.ts at scale

The current sitemap.ts is hreflang-honest per §17.4 + Pass 7b discipline; deck URLs are NOT in the sitemap (deck routes are nginx-served per §15.7). Topic-page URLs ARE in the sitemap.

**Sitemap size forecast at 6 main locales × 39 axis-keys with hreflang alternates:**
- Topic-page URLs: ~228 (39 × 6 minus the picture-trail en-only)
- hreflang alternate count per URL: average ~5 (some axis-keys exist in 6 locales, some only in fewer)
- Total `<url>` × `<xhtml:link>` entries: ~228 × ~5 = ~1,140 sitemap line entries
- Estimated bytes: ~228KB sitemap size

This is well under Google's 50MB/50,000-URL sitemap soft cap. **No sitemap-index sharding needed at the 12,000-deck-across-6-locales target.**

If cross-product topic pages launch later (CLAUDE.md §16.1 — subject × topic × age × language combinations beyond single-axis), the URL count could grow significantly. At ~30 cross-products × 6 locales = ~180 additional URLs, still well within the 50K cap. Sharding consideration: only at ~10,000+ topic-page URLs, which would require cross-product page commissioning at scale.

### B4. Postgres query performance + index coverage

**Existing indexes on Deck table** (queried via pg_indexes on Hetzner, post-`3569be97`):

```
decks_pkey                       UNIQUE (id)
decks_language_slug_key          UNIQUE (language, slug)
decks_exercise_type_language_idx (exercise_type, language)
decks_status_published_at_idx    (status, published_at)
```

**Existing indexes on Topic + LessonPlan tables:**

```
topics_pkey                              UNIQUE (slug)
topics_subject_language_idx              (subject, language)
lesson_plans_pkey                        UNIQUE (id)
lesson_plans_topic_slug_language_key     UNIQUE (topic_slug, language)
parent_notes_pkey                        UNIQUE (id)
parent_notes_topic_slug_language_tone_key UNIQUE (topic_slug, language, tone)
```

**Missing indexes for catalog-scale read patterns:**

1. **GIN index on `decks.subject_tags`** — needed for the `fetchDecksForAxis` theme-axis filter (`subjectTags: { has: axisKey }` per `frontend/lib/topic-decks.ts:62`). At 20,000 rows scanning for `subject_tags @> ARRAY['animals']` without GIN is a sequential scan. With GIN, milliseconds.
2. **Compound `(language, status, age_range)`** for educational-level axis filter. Currently `(exercise_type, language)` covers exercise-type axis but no index covers `WHERE language=X AND status='published' AND age_range IN (...)` for educational-level filter (5 distinct age_range values). At 20K rows, B-tree compound index makes this constant-time.
3. **Compound `(language, status, exercise_type)`** — covers exercise-type axis filter with the published-status branch in one index (current `(exercise_type, language)` is read-shape correct but doesn't include status; status filter still scans ~17% extra rows assuming archived ratio holds). Marginal at 20K but adds up.

**Recommendation:** ship a small Prisma migration before B-tier scale (~5,000+ decks) adding the 3 missing indexes. Migration cost: ~30 seconds at 20,000-row scale; near-instant at current 116-row scale. Filed as deferred-queue candidate; not a hard blocker for initial mass-publish but should land before catalog crosses 5,000 decks.

**Other catalog-side query concerns at scale:**
- `topic-decks.ts:listNonEmptyAxisKeys` for `axis='theme'` does a full Deck table scan (FROM decks WHERE language=X AND status='published') and aggregates subject_tags client-side. At 20,000 rows × 6 locales × 3 axes called per build, this is the build-time bottleneck for B2 generateStaticParams. With GIN on subject_tags + a `prisma.deck.groupBy` pattern, this becomes index-only.

### B5. Cloudflare cache invalidation policy at scale

Per CLAUDE.md §15.8: deck.html is `Cache-Control: public, max-age=300` (5min); topic pages have ISR revalidate=3600 (1hr); both rely on Cloudflare honoring origin Cache-Control. **No explicit cache-purge calls in publish-cli today.**

**At publish-cli batch scale of 7 decks per batch:**
- 7 deck.html writes → 7 distinct edge-cache keys, populated on first request per region
- 5-min TTL means cache-staleness window is bounded
- Topic pages affected by published decks revalidate within 1 hour (ISR)
- Footer/Section 2/sitemap changes are page-level, not deck-level; deploy.sh re-builds them so they propagate via the `.next/` rebuild

**At mass-publish batch scale of 100+ decks per batch:**
- TTL-based invalidation still works (no rate-limit risk because no API calls are made)
- Cache populates on demand; first-hit-per-region pulls from Hetzner origin
- Hetzner origin is the bottleneck if 100 first-hit requests land simultaneously across regions; current pm2 cluster handles this fine at 116-deck scale

**No mass-publish-blocking concerns at current cache policy.** The 5-min TTL is the only freshness guarantee; teachers loading a topic page see the new deck within 5 min of publish (via ISR + Cloudflare edge propagation).

If operator wants instantaneous propagation at mass-publish scale, the path forward is a `cf.cache.purge_url_list` API call in publish-cli. Cloudflare free-tier allows 30 purge-by-URL per minute per zone. At 7 decks per batch × 60 batches per hour = 420 purges per hour = 7 per minute = comfortably under the limit. Filed as deferred-queue improvement; not a current blocker.

### B6. Hetzner disk + storage forecast

**Empirical baseline (Hetzner du -sh, post-`3569be97`):**

```
/var/www/lcs-media/
  decks/             209M  (4 locale dirs at ~50MB each)
  worksheet-generators/  35M
  blog/                 4.1M
  backups/              52M
  design-elements/     408K
  admin-panels/        436K
  scripts/              68K
  samples/            1.2GB
  image-library/      3.0GB
  image-library-webp/ 2.3GB
  TOTAL:           ~6.6GB

/opt/lessoncraftstudio/
  frontend/           7.2GB (mostly node_modules + .next 4.4GB)
  backups/             14GB (DB dumps, ~15MB each, growing)
  publish-inbound/    159MB (active + archived ZIPs)
  ... other            ~200MB
  TOTAL:              ~21GB

Filesystem: 436GB total, 49GB used (12%), 365GB free
```

**Per-deck storage (sample from `/var/www/lcs-media/decks/en/addition-image-image-v3/`):**
- deck.html: 432KB
- printable.pdf: 358KB
- answer-key.pdf: 397KB
- thumbnail.png: 161KB
- og-image.png: 150KB
- manifest.json: 3KB
- **Per-deck total: ~1.5MB**

**Mass-publish disk forecast at 20,000-deck scale:**
- Decks: 20,000 × 1.5MB = 30GB
- + image-library (already in place; doesn't grow with deck count): 5.3GB
- + .next build cache (grows linearly with route count): ~5-6GB at scale
- + Hetzner backups (15MB compressed × 2x daily × 30 days retention): ~1GB
- **Estimated disk usage at 20K-deck scale: ~50-55GB**

Currently 365GB free. Headroom: 6-7x the forecasted scale need. **Not a disk concern at any reasonable horizon.**

**Caveat: image-library scaling.** If the operator expands image-library coverage for new themes (currently ~3,000 PNGs in 100 themes per CLAUDE.md §A.1), each new image is ~1MB raw + 0.5MB WebP. Adding 1,000 new images = ~1.5GB. Still bounded. Filed as no-concern.

---

## Section C — Subject-tag taxonomy coverage

### C1. Current taxonomy registration empirical state

**topics-taxonomy.json axis-key registration (post-`3569be97`):**

| Axis | Axis-key count | Locales with slug-map coverage |
|---|---:|---|
| exercise-type | 30 | en+de+es+nl (29 axis-keys) + en-only (1: picture-trail) |
| theme | 4 | en+de+es+nl (animals, vehicles, food, fruit) |
| educational-level | 5 | en+de+es+nl (preschool, kindergarten, grade-1, grade-2, grade-3) |
| **Total** | **39** | **38 axis-keys at full Tier 2 coverage; 1 at en-only** |

**Apps registered in topics-taxonomy.json:** all 29 of the §14.10 canonical apps. The `apps` field maps each app to `default_subject` + `default_age_range` + `exercise_type_axis_key`.

**Deck-side empirical state (post-`3569be97`, 116 published decks):**

```
exerciseType distribution (published, all locales pooled):
  29 of the 30 exercise-type axis-keys have ≥1 deck (4 each across locales)
  picture-path has 3 decks (en archived; de+es+nl published)
  picture-trail has 1 deck (en only — replacement slug for archived en/picture-path)

subject_tags distribution (published):
  decks with subject_tags=["animals"]:   49
  decks with subject_tags=[] (themeless): 67
  decks using vehicles/food/fruit:         0

themed-deck app coverage (apps with at least 1 themed deck):
  13 of 30 apps: addition, alphabet-train, bingo, chart-count, find-and-count,
                 grid-match, math-puzzle, missing-pieces, odd-one-out, shadow-match,
                 subtraction, treasure-hunt, word-guess

themeless-only app coverage (apps with NO themed variant):
  17 of 30 apps: big-small, code-addition, crossword, cryptogram, find-objects,
                 matching, math-worksheet, more-less, pattern-train, pattern-worksheet,
                 picture-path, picture-sort, picture-trail, prepositions, sudoku,
                 word-scramble, wordsearch
```

### C2. Divergence from CLAUDE.md / SESSION-STATE.md claims

**Brief claim:** "taxonomy registration covers 4 of 29 apps."
**Empirical:** all 29 §14.10 apps are registered in `topics-taxonomy.json` with `default_subject`, `default_age_range`, `exercise_type_axis_key` fields. All 30 exerciseType axis-keys (29 apps + en-only picture-trail) have slug-maps for en+de+es+nl.

**The "4 of 29" framing in the brief appears to be incorrect.** What is empirically true:
- 4 themes are taxonomy-registered (animals, vehicles, food, fruit)
- Only 1 of those 4 themes is actually used in production decks (animals, 49 decks)
- 3 themes (vehicles, food, fruit) have ZERO published decks

**The honest gap statement:** the topics-taxonomy.json has 4 themes registered but the deck catalog uses only 1 theme. The OTHER 17 of 30 apps emit themeless-only decks (no themed variant exists in their generation logic).

### C3. Taxonomy expansion needed before mass-publish

**At 116-deck scale this works.** The 49 themed (animals) decks fill Footer Col 2 entries for /en/topic/animals/, /de/topic/tiere/, /es/topic/animales/, /nl/topic/dieren/ at non-zero count per locale. Honesty discipline (§16.6 Pass 7b F4) means vehicles/food/fruit topic pages 404 by design (no decks yet); Footer doesn't link to them.

**At 5,000+ decks the gap matters more.** A 5,000-deck catalog where only `animals` is a usable theme and 17 of 30 apps don't theme at all is functionally narrow. Teachers searching for "Halloween-themed decks" or "vehicles for transportation unit" find nothing. The platform's central UX (CLAUDE.md §1: "topic destination page bundling recommended interactive decks + companion PDFs + lesson plan") is reduced to: exercise-type axis (29 pages × 6 locales = 174 pages) + educational-level axis (5 × 6 = 30 pages) + theme axis (1 usable × 6 = 6 pages). 210 navigable topic pages total at 5,000-deck scale.

**At 20,000 decks the gap blocks navigability.** 20,000 decks across 210 topic pages is ~95 decks per page — assemblable via the deck-grid pagination but not selectable via theme-narrowing because themes don't differentiate content.

**Taxonomy expansion needed before B-tier scale:**

1. **Theme axis-key authoring** beyond the 4 registered — operator-strategic call on which themes warrant first-class axis-key status. Candidates per real K-3 classroom relevance:
   - Seasonal: Halloween, Winter holidays, Spring, Summer
   - Curricular: shapes, colors, numbers, letters, body parts
   - Topical: ocean, dinosaurs, space, weather, garden
   - Locale-specific: cultural-celebration themes (Diwali, Lunar New Year, Día de los Muertos)
   
   Recommended scope: 15-25 additional themes beyond the 4 currently registered. Per-theme work: axis-key in topics-taxonomy.json + per-locale slug-map (6 main locales × 1 slug each) + Footer Col 2 entries per locale + populating decks (the dependent labor).

2. **Themed-app coverage extension.** 17 of 30 apps emit no themed variant. Some are appropriately themeless by app-shape (math-worksheet, code-addition, cryptogram, crossword — these are content-format not theme-format). Others could add theme support per app extension (matching, picture-sort, pattern-train, word-scramble, word-guess — these COULD theme but currently don't). Per CLAUDE.md §3.2, app generation logic isn't to be rewritten; theme-extension to apps is per-app commission work outside this recon's scope.

3. **Per-locale theme-slug authoring.** Each new theme axis-key needs slugs in 6 main locales (or all 11 platform locales if the operator wants per-theme topic pages everywhere). At 25 new themes × 6 main locales = 150 new slug-mappings to author (low effort once theme list is locked).

**Forecast:** taxonomy expansion brief = 1 commission, ~4-6 hours operator-strategic + author work, primarily upfront before B-tier scale. **Hard blocker for 5,000+ decks; soft concern at 1,000-2,500-deck checkpoint.**

---

## Section D — Launch-trigger arithmetic decision

### D1. The current SUBSCRIPTION-SCOPE.md clause-(a) text vs. schema reality

**SUBSCRIPTION-SCOPE.md text (Tier 2 closeout subsection):**
> "Clause (a) lesson-plan-per-deck-per-locale: 116 plans realized authoring scope (29 §14.10 apps × 4 locales). Mechanically follows catalog scope; 1 lesson plan per deck per locale per LessonPlan schema's `@@unique([topicSlug, language])` constraint."

**Schema reality:**
```prisma
model LessonPlan {
  topicSlug             String
  language              String
  ...
  @@unique([topicSlug, language])
}

model Topic {
  slug      String @id  // English-canonical axis-key per Phase 1a Schema-intent-B
  language  String      // always 'en' for all 39 rows; per-locale title in `title Json`
  ...
}
```

**The schema enforces `@@unique([topicSlug, language])` — meaning the database CANNOT have more than ONE LessonPlan per (Topic.slug, locale) tuple.**

`Topic.slug` is the **English-canonical axis-key** (per Phase 1a Schema-intent-B at `1114dedb` and confirmed empirically by the 39 Topic rows all having `language='en'`). Examples: `addition`, `sudoku`, `picture-sudoku`, `kindergarten`, `animals`.

**The combinatorial cap on LessonPlan rows is therefore:**
- # distinct Topic.slug values × # locales = 39 × N locales
- For 6 main locales: 39 × 6 = **234 LessonPlan rows MAX** under the current schema
- For 4 Tier-1+2 locales (current): 39 × 4 = 156 plans MAX (currently 4 of 156 = 2.6%)
- For all 11 platform locales: 39 × 11 = 429 plans MAX

**This is the recon's most consequential finding.** It directly contradicts the brief's framing that "at 20,000-deck target across 6 main locales, clause (a) under current doctrine would require 20,000 lesson plans." The schema forbids that count. Lesson-plan authoring scope is bounded by axis-keys × locales, not by deck count.

### D2. How clause (a) is realized at 20,000-deck scale

The text "1 lesson plan per published deck per locale" is reconcilable with the schema by interpreting it as **"every published deck has at least one LessonPlan corresponding to one of its topicSlugs, in the deck's locale."**

A Deck at axis-key=addition, locale=de, topicSlugs=["addition"] satisfies clause (a) iff there exists a LessonPlan with topicSlug="addition" AND language="de". One plan satisfies the clause for ALL de-addition decks (currently 1; at scale could be 100+).

**At 20,000-deck scale across 6 main locales:**
- 30 exercise-type axis-keys × 6 locales = 180 plans cover all exercise-type-axis decks
- 5 educational-level axis-keys × 6 locales = 30 plans cover all level-axis decks IF the doctrine includes those (open question; the 4 plans authored this session are exercise-type only)
- 4 (or 25 if expanded per Section C) theme axis-keys × 6 locales = 24-150 plans cover all theme-axis decks (similarly open)

**Three plausible Path-A interpretations (operator decides):**

| Interpretation | Plan count for 6-main set | Plan count for all 11 |
|---|---:|---:|
| Path A1: exercise-type axis-keys only (30 × N) | 180 | 330 |
| Path A2: all axis-keys in topics-taxonomy.json today (39 × N) | 234 | 429 |
| Path A3: A2 + future taxonomy-expanded themes (≈64 × N) | 384 | 704 |

Even the largest interpretation (A3 at 704) is ~3 orders of magnitude smaller than the brief's "20,000" panic-figure.

### D3. Cooperation-pattern review-loop throughput at 174-234-plan scope

The 4 plans authored this session via cooperation-pattern (CC drafts → operator reviews → CC revises) cleared in approximately 2 sessions of ~3 hours each = ~6 hours for 4 plans = **1.5 hours/plan amortized**.

**At 234-plan scope (Path A2, 6-main set, all 39 axis-keys):**
- 234 × 1.5 hours = **351 hours of cooperation-pattern session time**
- At 10 plans authored per week (a sustainable cadence): 23-24 weeks ≈ **5-6 months to clear**
- At 6 plans per week (the cadence the prior brief named): 39 weeks ≈ **9 months to clear**

**At 180-plan scope (Path A1, 6-main set, exercise-type only):**
- 180 × 1.5 hours = 270 hours
- 18 weeks ≈ **4-5 months at 10/week, 7 months at 6/week**

**At 156-plan scope (current Tier 1+2 locales, all axes):**
- 156 × 1.5 hours = 234 hours
- 16 weeks ≈ **4 months at 10/week, 6 months at 6/week**

**These are tractable timelines.** Pillar 1 launch-gating clause (a) at the operator's stated catalog scale is NOT a never-arc. It's a multi-month commitment, not a multi-year one. The cooperation-pattern path produces a viable timeline.

### D4. Path A consistency with the 4 reference plans

The 4 plans authored this session (en/de × addition+sudoku) are at **exercise-type axis-keys**. Per the lesson-plan revision pass at this session's `e912b805`-precursor work:
- Each plan teaches the topic (addition / sudoku-as-deductive-reasoning), NOT specific deck contents
- The image-vocabulary cross-check halt-and-surface at this session forced revision to use **illustrative-example framing** ("the example below uses cats and dogs; substitute whatever animals your deck includes")
- This framing makes each plan **portable across all decks at the same axis-key in the same locale**

**This is consistent with Path A.** The plans are authored once per (axis-key, locale) and apply to all decks in that bucket. The revision-pass discipline (illustrative-example framing per the session's cross-cutting fix E) was already shaped for the per-axis-key model.

**The brief's framing in this section is correct:** Path A is consistent with the 4 reference plans.

### D5. Recommendation surface (operator decides)

This recon does NOT resolve D1. The operator decides among the 3 Path A interpretations + the cooperation-pattern cadence target. Surface for the decision:

1. **Path A1 (exercise-type only, 180 plans for 6-main):** smallest scope; doesn't cover educational-level / theme axis topic pages; fastest to clear.
2. **Path A2 (all 39 axis-keys, 234 plans for 6-main):** matches the topic-page surface area the catalog actually exposes; means topic pages for educational-level and theme axes also have plans.
3. **Path A3 (A2 + future-expanded themes, ~384 plans):** speculative; depends on Section C theme expansion landing first.

**Doctrine amendment scope:** SUBSCRIPTION-SCOPE.md "Tier 2 closeout post-`d3b4f962` arithmetic" subsection needs a re-read after the operator decides. The current "116 plans realized" framing is correct under the schema-true reading IF "1 deck → 1 plan" is interpreted as "covered by a plan" rather than "1:1 ratio." The recon's read is that the schema ALREADY expresses Path A; the SUBSCRIPTION-SCOPE.md text could be tightened to remove ambiguity.

**Filed as next-doctrine-pass amendment candidate:** rewrite clause (a) as "every (Topic.slug, language) tuple where decks have been published has a corresponding LessonPlan." Plan count at the operator's stated scale = bounded by axis-keys × locales, not by deck count.

---

## Section E — Bundle production at scale

### E1. Current bundle scope vs. mass-publish scaling

**SUBSCRIPTION-SCOPE.md current spec (Tier 2 closeout post-`d3b4f962` arithmetic):**
> "Clause (b) bundle scope: hold at 7 × 2 = 14 (en+de canonical) per Option A. Bundles ship with paired lesson plans (Pillar 2 spec); bundle localization downstream of lesson-plan localization per `@@unique([topicSlug, language])` schema; per-locale bundle authoring is independent labor not arithmetic-derived from Tier 1 work. **es+nl bundle authoring filed as follow-on extension** once en+de bundle library closes."

**The bundle scope is intentionally bounded at clause (a)'s tier-1 scope (en+de × 7 themes = 14).** It does NOT scale with catalog deck count. Even at 20,000-deck mass-publish scale, the clause-(b) bundle threshold remains 14 paired bundle/lesson-plan units.

**Bundle scope at 6-main scaling:**
- If operator decides bundle expansion to 6 main locales: 7 themes × 6 locales = 42 paired bundle/lesson-plan units
- If only Tier 1+2 (en+de+es+nl): 7 × 4 = 28 paired units
- If holds at en+de canonical: 14 units (current decision)

**No bundle production blocking at mass-publish.** Bundle scope is decoupled from deck count entirely. The launch-trigger arithmetic at `d3b4f962` (130 content units = 116 plans + 14 bundles) is recon-correct ONLY under the literal "116 = 29 × 4" reading; under Path A2, the launch-trigger arithmetic is (234 plans + 14 bundles) = 248 content units for the 6-main set, OR (180 + 14) = 194 under Path A1.

### E2. Bundle ↔ lesson-plan pairing semantics

Per SUBSCRIPTION-SCOPE.md "Bundle/lesson-plan pairing": each bundle ships with a paired lesson plan on the same theme. This means clause (b) authoring (14 bundles) effectively requires 14 paired lesson plans authored ALONGSIDE the bundles, IN ADDITION to the clause (a) topic-axis plans.

**Bundle paired plans are theme-keyed** (Halloween, Back-to-school, Winter holidays, etc.) — these are NOT in the current axis-key set (vehicles, food, fruit, animals). The themed-bundle plans need their own axis-key entries OR a separate plan-shape (e.g., per-bundle `LessonPlan` rows with topicSlug = `bundle-halloween` registered as a Topic).

**This is a schema-question for the bundle commission:** does each bundle's lesson plan get a Topic row? Or does it live differently? Open question filed for the bundle commission scope.

### E3. Bundles run orthogonally to mass-publish

Bundle authoring does NOT block mass-deck production; mass-deck production does NOT block bundle authoring. They're separable. The launch-trigger requires both to clear before the Subscribe flip but they can be authored in parallel.

**Recommendation:** treat the bundle commission as parallel-track work. Mass-publish doesn't depend on it; the Pillar 2 launch-trigger threshold (14 bundles + paired plans) is its own scope-bounded effort.

---

## Section F — Gate dependencies summary

Synthesized priority ordering of what blocks 20,000-deck mass-publish at the operator's stated 6-main scale:

### F1. Hard blockers (prevent any mass-publish from succeeding)

1. **pt + it + fr Tier-2-equivalent launch arcs.** Without TOPIC_LOCALES extension + topics-taxonomy.json slug-maps + lessonPlanReader/topicPage/workspace/collections namespaces in messages files, decks cannot be published into pt/it/fr at all. ~33 commits + ~32 sessions across the 3 locales. **Hard blocker for mass-publish in 3 of 6 main locales.**

2. **Operator-decision on pt-BR vs pt-PT split** (or canonical-only choice). Must lock before pt deck-content authoring begins. Operator-strategic call.

### F2. Catalog-quality blockers (allow mass-publish but produce a degraded catalog)

3. **Subject-tag taxonomy expansion.** At 116-deck scale, 1-of-4 themes used (animals only). At 20,000-deck scale, the catalog is functionally non-navigable by theme without theme axis-key expansion. Recommended scope: 15-25 additional themes registered; each with per-locale slug-maps. **Not a hard blocker for the first mass-publish wave (1,000-deck checkpoint per locale per Section G recommendation), but blocks B-tier scale (~5,000+).**

4. **Postgres index work for catalog-scale queries.** GIN on `subject_tags` + compound on `(language, status, age_range)` + compound on `(language, status, exercise_type)` to make topic-page filter queries index-only at 20K-row scale. Migration cost is trivial today; deferring until 5,000+ rows means slower migrations. **Recommended before B-tier scale.**

### F3. Launch-trigger blockers (prevent Subscribe flip even if catalog is shipped)

5. **Lesson-plan clause-(a) scope decision (Path A1/A2/A3).** Operator picks the plan-count target. Authoring effort 234-384 plans across 6-main set, multi-month at sustained cadence. **Not a deck-publish blocker, but a launch blocker.**

6. **Bundle clause-(b) scope decision (hold at 14 vs. expand to 28 or 42).** Independent of mass-publish; can run parallel. **Not a deck-publish blocker.**

### F4. Scale-untested concerns (may or may not surface at mass-publish wave)

7. **deploy.sh build duration at 5,000+ decks.** Linear extrapolation predicts 3-5 minutes; ISR fallback is the safety net. **Recommend: load-test at 1,000-deck checkpoint; address only if observed >8 minutes.**

8. **publish-cli throughput at 100+-deck batch sizes.** Current 7-deck batches succeed cleanly. 100-deck batches may surface Cloudflare cache-purge rate-limits OR origin-server cluster pressure. **Recommend: keep batch sizes ≤ 25 for the first mass-publish wave; increase if no scale concerns surface.**

9. **Build-time generateStaticParams DB query latency at 6 locales × 39 axis-keys.** Current 152-URL build is 2 minutes. 228-URL build expected 3 minutes. Above 5,000-decks per locale, the `listNonEmptyAxisKeys` query may slow without GIN. **Recommend: ship index migration before mass-publish wave 1.**

### F5. Recommended sequencing

Synthesizing F1-F4 into a sequenced arc:

1. **Operator decides Path A interpretation** (D5) — single conversation; updates SUBSCRIPTION-SCOPE.md + CLAUDE.md.
2. **Operator decides pt-BR vs pt-PT** (A4) — single conversation; locks pt convention.
3. **Postgres index migration** (F2.4) — small Prisma migration, 1 commit, instantaneous at 116-row scale.
4. **Taxonomy expansion brief** (Section C) — single multi-week commission; 15-25 new themes registered.
5. **pt + it + fr Tier-2-equivalent launch arcs** (F1.1) — sequenced or parallel; 11 commits per locale × 3 locales.
6. **Mass-publish wave 1: ~500/locale across en + de + es + (newly-launched pt/it/fr)** — checkpoint validates throughput + build behavior.
7. **Lesson-plan authoring (Pillar 1) starts at any point** after step 1 — runs parallel.
8. **Bundle authoring (Pillar 2) starts at any point** — independent track.
9. **Mass-publish wave 2: scale to 2,000/locale per main target.**

This produces a ~6-month arc to the first launch-eligible state at the operator's target catalog scale. Earlier completion if Path A1 (180 plans) is chosen + operator authoring cadence accelerates.

---

## Section G — Path forward options for the operator

Three sequencing options, each tradeoffs different.

### G1. Option 1: Pipeline path

**Start mass-publish in en + de + es immediately at small-batch scale; commission pt + it + fr Tier-2-equivalent launch arcs in parallel; sequence taxonomy expansion mid-stream.**

| Step | Time | Notes |
|---|---|---|
| Operator Path A decision | 1 conversation | Locks plan-scope target |
| Postgres index migration | 1 day | Single commit; deploy-only |
| Taxonomy expansion brief commission | 4-6 weeks | 15-25 new themes registered |
| pt+it+fr launch arcs (parallel) | 6-8 weeks | 33 commits across the 3 locales |
| en+de+es mass-publish wave 1 (500/locale) | 8-10 weeks | ~70 batches per locale; parallelizable with taxonomy + pt/it/fr |
| pt+it+fr mass-publish wave 1 (500/locale) | 8-10 weeks | After their launch arcs land |
| Wave 2 (2,000/locale) | 16-20 weeks | Six-locale parallel mass-publish |
| **Estimated total** | **6-8 months** | Path A2 + 234 plans authoring runs parallel |

**Tradeoffs:** earliest launch-eligibility; multiple work-streams in flight simultaneously; catalog is partially-taxonomized during early mass-publish (degraded UX in mid-stream); operator capacity stretched across launch-arc work + content-publish work + Path A authoring.

**Recommendation strength:** moderate. The parallelization is feasible but operator-attention-heavy.

### G2. Option 2: Foundation-first path

**Commission taxonomy expansion + Postgres indexes + pt+it+fr launch arcs BEFORE any mass-publish starts; mass-publish lands all 6 locales simultaneously into a fully-taxonomized catalog.**

| Step | Time | Notes |
|---|---|---|
| Operator Path A + pt-BR/pt-PT decisions | 1-2 conversations | Lock decisions |
| Postgres index migration | 1 day | Single commit |
| Taxonomy expansion brief | 4-6 weeks | All 15-25 themes locked + slug-maps for 6 locales |
| pt+it+fr launch arcs (sequential) | 12-15 weeks | 1 locale at a time avoids parallel-context overhead |
| Mass-publish across 6 locales (1,000/locale wave 1) | 12-16 weeks | Parallel after substrate is in place |
| Mass-publish wave 2 (to 2,000/locale) | 12-16 weeks | Continues at sustained cadence |
| **Estimated total** | **9-12 months** | Path A2 + 234 plans authoring runs at any point during waves |

**Tradeoffs:** longer total time but cleaner sequencing; catalog is fully-taxonomized when mass-publish begins (no mid-stream UX degradation); operator can run mass-publish + Pillar 1 authoring without cross-context overhead.

**Recommendation strength:** higher than Option 1 for catalog-quality reasons. The 3-4 month additional time is mostly upfront planning work that doesn't compete with mass-publish for operator attention.

### G3. Option 3: Incremental path (recommended)

**1,500-deck first wave (500/locale × 3 ready locales en+de+es) BEFORE pt+it+fr launch arcs. Surface scale issues; address; then proceed to launch arcs + further mass-publish.**

| Step | Time | Notes |
|---|---|---|
| Operator Path A decision | 1 conversation | Lock plan-scope target |
| Postgres index migration | 1 day | Pre-emptive; bounded cost |
| en+de+es mass-publish wave 1 (500/locale = 1,500 decks) | 8-10 weeks | ~70 batches per locale |
| **Checkpoint:** scale assessment | 1-2 weeks | Build-time, query latency, Cloudflare cache, operator authoring fatigue |
| Taxonomy expansion (informed by checkpoint findings) | 4-6 weeks | Theme-list locked based on what surfaced |
| pt+it+fr launch arcs (sequential, informed by checkpoint findings) | 12-15 weeks | Better-locked Track A/B scope |
| Mass-publish across 6 locales (to 2,000/locale) | 16-20 weeks | Wave 2+3 |
| **Estimated total** | **9-12 months** | Identical to Option 2 but front-loaded with empirical learning |

**Tradeoffs:** the same total time as Option 2 but with a real-data checkpoint at 1,500 decks. The checkpoint surfaces actual scale issues before they're costly to fix. Discovers "did our throughput estimate hold?", "did build-time stay under 5 minutes?", "did Cloudflare cache hold up at 70 batches?", "what's the operator authoring fatigue ceiling?" — all answered with real numbers rather than recon estimates.

**Recommendation strength:** highest. The 1,500-deck incremental wave is small enough to not over-commit and large enough to surface scale issues. Operator preserves option to redirect mid-stream if findings warrant.

### G4. Option 4: Hybrid path

**Operator picks parts of Options 1-3:**
- Pre-flight Path A + indexes (from Option 2)
- Run en+de+es Wave 1 + pt+it+fr launch arcs in parallel (from Option 1)
- Hard checkpoint at 1,500-deck mark + at end of pt+it+fr launches (from Option 3)
- Then 6-locale mass-publish wave 2

This is the most operator-attentive path. ~6-8 months to launch-eligibility with Option 3's checkpoint discipline. Most realistic given operator's likely attention budget.

---

## Closeout

**Document path:** `memory/project_mass_publish_recon.md`
**Length:** ~7,500 words / ~590 lines
**Halt-and-surface conditions hit during recon:** none (all queries succeeded; all empirical state matched or refined CLAUDE.md / SESSION-STATE.md claims).

**Two most consequential findings for operator first-look:**

1. **Section D / Schema-true clause-(a) reading.** The brief's "20,000 plans needed at 20,000-deck scale" framing misreads the schema. `LessonPlan @@unique([topicSlug, language])` caps plan count at axis-keys × locales (180-234 plans for 6-main set under Path A1/A2). This is a multi-month authoring scope, NOT a multi-year never-arc. Cooperation-pattern path is viable.

2. **Section A / pt+it+fr substrate gap.** All three new main-target locales need full Tier-2-equivalent launch arcs (TOPIC_LOCALES + topics-taxonomy.json + 4 i18n namespaces) BEFORE any deck publish in those locales is possible. This is the **hard blocker** for the operator's stated 6-main scaling target. Each of the 3 follows the established ES + NL precedent at ~11 commits/locale. Total ~33 commits + ~32 sessions of substrate work before pt/it/fr deck production can start.

**Path-drift recorded:**
- Brief's `frontend/lib/topics-taxonomy.json` → actual `frontend/config/topics-taxonomy.json`. Affects any session referencing the lib/ path.
- Brief's "taxonomy registration covers 4 of 29 apps" claim does not match empirical state. All 29 apps are registered; the actual gap is theme-axis usage (only 1 of 4 themes used in production decks; vehicles/food/fruit have 0 decks).

**Confirmation:**
- 0 commits, 0 pushes, 0 deploys, 0 DB writes during recon.
- All queries Hetzner-side were SELECT/group-by/index-introspect; cleaning up after each query.
- `git status` unchanged from session start (only the pre-existing 947 dirty-tree items per SESSION-STATE.md §7).

This document persists at filesystem level until the operator reviews. Subsequent decisions (Path A interpretation; pt-BR/pt-PT lock; sequencing option pick) become input to a doctrine commit that updates CLAUDE.md / SUBSCRIPTION-SCOPE.md as appropriate.

*End of project_mass_publish_recon.md*
