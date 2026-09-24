---
name: Tier 2 i18n arc — Spanish + Dutch launch recon
description: Comprehensive recon of all surfaces affected by Tier 2 launch (es + nl). Read-only; surfaces gaps + scopes effort + recommends phased arc structure. Drives the next prompt's adjudication. Replaces no prior recon (Tier 2 is new arc territory post-Phase-3a).
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
**Reading rule:** Read at start of any Tier 2 i18n plan-pass session. Drives arc adjudication: which surfaces ship in which order, what blocks what, what runs in parallel.

**Status:** recon-only complete (2026-05-02 / `e1ef7248`). Catalog state, i18n surfaces, vocabulary, taxonomy, routing, and per-app code paths inventoried. **No file edits, no commits, no catalog changes.** Recon-output drives subsequent adjudication.

---

## Executive summary

| Surface | Current state | Tier 2 gap | Effort scale |
|---|---|---|---|
| **Vocabulary system** (`image-vocabulary.js`) | **100% es + nl coverage** (1246 entries × [singular, plural, gender]) | **NONE** | already paid in |
| Locale registry | es + nl already in `SUPPORTED_LOCALES` (11-locale list since pre-pivot) | **NONE** | already paid in |
| `endDeck.*` + `seo.*` i18n | Full 11-locale coverage from Brief A/B | **NONE** | already paid in |
| **Message files** (es.json, nl.json) | Partial: 650 keys (es), 637 keys (nl) vs 795 in en | **260 keys missing × 2 locales = 520 keys to author** | medium-high |
| **Pillar 3 namespaces** (collections, workspace, bulk, share, topicPage) | **0 keys** in es + nl | 124 keys per locale (53+28+18+13+12) | medium |
| `topics-taxonomy.json` axes | en+de slugs+names: 30 + 4 + 5 = 39 axis-keys covered each. **es+nl: 0 of 39** | 39 × 2 locales = 78 axis-key entries to author (slug + name each) | low-medium |
| Topic-page route gate | `TOPIC_LOCALES = ['en','de']` hardcoded at 2 sites | extend to 4 locales | trivial |
| Footer Column 1 | `FOOTER_LANGUAGES` registers en+de only (Tier 2-4 commented placeholders) | add es + nl entries | trivial |
| Catalog content (Deck rows) | en: 29 published / de: 29 published / **es: 0** / **nl: 0** | **29 apps × 2 locales = 58 new ZIPs to author** | high (mirrors Phase-3a effort) |
| Catalog topic/lesson_plan tables | 0 rows in topics, lesson_plans, parent_notes (Pillar 1 not started) | not directly Tier 2 territory; flagged | n/a (Pillar 1 arc) |
| Section 2 breadth grid | 8 picks at 2 locales (en+de) per `e1ef7248` v1 | adjudication: rebalance to 4 locales OR extend to 12-pick grid | operator decision |
| Subscription launch trigger | gates on lesson-plan-per-deck-per-locale | Tier 2 publishing decks before Pillar 1 ships extends the trigger gate's scope | sequencing decision |

**Bottom line:** the **vocabulary system carrying** is the single most consequential preconditions in the operator's favor. Tier 2 launch breaks down into **3 decoupled tracks** that can run in parallel after one prerequisite (taxonomy + routing extension):

1. **i18n authoring** (520 keys × 2 locales) — operator-content-pipeline
2. **Deck catalog authoring** (58 new ZIPs via publish-cli) — operator-content-pipeline
3. **Structural extension** (taxonomy + routing + footer + Section 2) — engineering pass

The 3 tracks converge at Tier 2 launch. **Estimated calendar elapsed:** comparable to Phase-3a if operator-content-authoring cadence is sustainable (Phase-3a closed in 1 calendar day at 5 batches; Tier 2 deck-creation arc is structurally identical at 58 publishes).

---

## 1. Tier 2-4 MISSING_MESSAGE residual inventory

Build-time MISSING_MESSAGE warning count post-`e1ef7248`: **171 homepage.* lines** + footer/dashboard/auth additional residual = total ~250-300 console errors at static-gen time across 9 deferred locales. The es+nl share is roughly 2/9 of that.

**Per-namespace gap (identical for es and nl):**

| Namespace | Tier 1 keys | es/nl missing | Notes |
|---|---:|---:|---|
| `homepage` | 65 | **65** | Section 1-6 + meta + notify; revisions per `078501a6` not yet propagated |
| `collections` | 53 | **53** | Pillar 3 Tool 1A — entirely unauthored |
| `support` | 37 | **37** | (legacy seller-era footprint; verify still in use) |
| `workspace` | 28 | **28** | Pillar 3 Tool 2A — entirely unauthored |
| `bulk` | 18 | **18** | Pillar 3 Tool 5A — entirely unauthored |
| `share` | 13 | **13** | Pillar 3 Tool 5A (per-card + bulk share affordances) |
| `topicPage` | 12 | **12** | Catalog topic-page surface |
| `dashboard` | 10 | **10** | Member dashboard (legacy seller surface; verify if reshelled) |
| `footer` | 8 | **8** | a06cd835 residual (byLanguage / byTopic / etc.) |
| `faq` | 6 | **6** | |
| `contact`, `license`, `privacy`, `terms` | 2 each | **2 each** | |
| `billing`, `navigation` | 1 each | **1 each** | |
| **Total** | — | **260 per locale** | × 2 locales = **520 keys** |

**Already 100% covered for es+nl** (no authoring needed):
- `endDeck.*` (5 keys) — Brief A authoring
- `seo.*` (5 keys) — Brief A authoring
- Plus partial coverage in `about, auth, billing, contact, dashboard, faq, footer, homepage, license, navigation, privacy, support, terms, worksheetSamples` (most likely seller-era leftover; some keys are valid carryover, others may be stale and should be audited but not chased in this arc).

**Halt-and-surface finding:** `support` (37 keys) is unexpectedly large in the Tier 2 authoring queue. It's likely seller-era support-form content. Worth a quick audit at plan-pass time to determine if it's load-bearing for Tier 2 launch or whether it can stay deferred. **Filed for plan-pass operator decision.**

---

## 2. i18n surfaces beyond message files

### Auth flow

`frontend/app/api/auth/register/route.ts:74` — locale-conditional email subject line: `validatedData.locale === 'de' ? 'Bestätigen...' : '...'`. en+de hardcoded; es+nl fall through to en. **Action at Tier 2:** extend ternary to handle es + nl email subject. **Effort: trivial (4-line change + 2 string authoring × 2 emails).**

### Email templates

Notify-me confirmation email + future subscription receipts. Live at the email-provider level (SMTP_*). Not inspected in this recon — flagged for plan-pass: are templates locale-aware, and if so, are es/nl versions authored? **Effort: low if templates use i18n; medium if hardcoded.**

### Schema-generator hardcoded label

`frontend/lib/schema-generator.ts:388` — `locale === 'de' ? '33 Arbeitsblatt-Generatoren' : ...`. en+de hardcoded; es+nl fall through. **Action at Tier 2:** extend ternary to es + nl variants. **Effort: trivial.**

Likely seller-era "33 Arbeitsblatt-Generatoren" string — should be audited for relevance post-pivot, not just translated.

### Notify-me + Section 5 — already wired

NotifyMe + SubscribeCTA components consume `homepage.notify.*` + `homepage.subscription.*` keys. When es+nl namespaces ship, components render automatically. **No component edit needed.**

### Currency / number formatting

USD globally per SESSION-STATE.md §5 — single currency, no locale formatting. Number formatting via standard JS `Intl.NumberFormat` (no audit blockers). **Effort: zero.**

### Auth flow — post-sign-in redirect

`auth-context.tsx` redirects to `/${locale}/dashboard` or `/${locale}/workspace`. Already locale-parameterized — works for es+nl as soon as messages files have keys. **Effort: zero.**

---

## 3. Locale-conditional code paths

### Topic-page locale gate (CRITICAL — extend at Tier 2)

`frontend/app/[locale]/topic/[slug]/page.tsx:18` and `frontend/app/sitemap.ts:16`:

```ts
const TOPIC_LOCALES = ['en', 'de'] as const;
```

Both sites hardcode Tier 1 locales. Must extend to `['en','de','es','nl']` for Tier 2. After extension:
- `/es/topic/<slug>/` and `/nl/topic/<slug>/` routes serve.
- Sitemap emits topic URLs in es + nl when respective locales have decks.
- hreflang alternates extend to 4 locales when sibling content exists.

**Effort: trivial (2-line change × 2 files).** Both sites are typed via `TopicLocale = (typeof TOPIC_LOCALES)[number]` — dependent type derivation propagates.

### Per-app locale-conditional emission (audit + adjudicate)

Three apps observed with locale-specific code paths:

1. **picture-path** (`REFERENCE APPS/picture-path.html:8174`) — `localeAwareExerciseType = (contentLocale === 'en') ? 'picture-trail' : 'picture-path'`. Per Phase-3a Batch 5b-1 source-edit. **At Tier 2:** es and nl fall through to else → emit `picture-path`. Slug uniqueness is per-locale `(language, slug)` so picture-path-es and picture-path-nl publish cleanly under canonical slug. **No additional source-edit needed at Tier 2.**

2. **find-and-count** (`REFERENCE APPS/find-and-count.html:3555,3585`) — locale-conditional plural-fallback logic for en + de + fr. **At Tier 2:** es + nl fall through to no-rule branch → naïve `+s` fallback. The fallback is rarely reached in practice (vocab system has 100% es+nl coverage, so the fallback only fires on missing-vocab — extremely rare). **Defer; not a Tier 2 launch blocker.**

3. **prepositions** (`REFERENCE APPS/prepositions.html:1255`) — `if (locale === 'de') return shapeName; // German capitalizes nouns`. de-specific noun-capitalization branch. **At Tier 2:** es + nl fall through (no German-style capitalization needed). **No source-edit needed.**

### Schema-generator + register-route locale ternaries

Documented in §2 above. Trivial to extend.

---

## 4. Deck catalog state per locale (verified DB query 2026-05-02)

```sql
SELECT language, status, COUNT(*) FROM decks GROUP BY language, status;
```

| Language | Status | Count |
|---|---|---:|
| en | published | 29 |
| en | archived | 1 (picture-path-en sealed) |
| de | published | 29 |
| es | — | **0** |
| nl | — | **0** |

**Catalog-side tables (zero rows across the board):**
- `topics` — 0 rows (Topic enrichment is Pillar 1 territory; not Tier 2)
- `lesson_plans` — 0 rows (Pillar 1)
- `parent_notes` — 0 rows (Pillar 2 framing)
- `deck_enrichments` — 0 rows (Mac Studio AI service not yet running per CLAUDE.md §15.3)
- `collections` — 0 rows (no real subscriber accounts yet)
- `play_links` — 0 rows
- `embed_configs` — 0 rows
- `deck_favorites` — 0 rows

**Tier 2 launch parity target:** 29 apps × 2 locales = **58 new published Deck rows**. Equivalent volume to Phase-3a (Phase-3a authored 35 net rows; Tier 2 needs 58 fresh rows since the catalog has zero es+nl content).

---

## 5. topics-taxonomy.json es + nl coverage

**Verified inventory (2026-05-02):**

| Axis | Total axis-keys | en slug+name | de slug+name | es slug+name | nl slug+name |
|---|---:|---:|---:|---:|---:|
| `exercise-type` | 30 | 30 | 29 | **0** | **0** |
| `theme` | 4 | 4 | 4 | **0** | **0** |
| `educational-level` | 5 | 5 | 5 | **0** | **0** |
| **Total** | **39** | 39 | 38 | **0** | **0** |

**de gap:** 1 missing (likely picture-trail axis-key was registered en-only at Phase-3a 5b-1 per design — not a de gap, just locale-asymmetric registration).

**Tier 2 authoring volume:** 39 axis-keys × 2 locales × 2 fields (slug + name) = **156 string entries to author**.

Per Pass 7b F4 honesty discipline: missing taxonomy entries directly affect footer surface area + topic-page slug substitution at publish time. publish-cli's missing-locale-skip handles fallback gracefully (per Brief B Phase 5 doctrine), but Footer Column 2 + 3 in es/nl render empty until taxonomy entries land.

**Effort:** low-medium. Authoring 156 strings is mechanical; quality bar is es/nl-native naturalness (mirrors §17.5 Tier 1 stronger-Claude-quality posture, but es and nl land at confidence ratings closer to Tier 2 than Tier 1).

---

## 6. Vocabulary system (`image-vocabulary.js`) coverage

**Verified inventory (1457 lines, 1246 keyed entries):**

| Locale | Entries with [singular, plural, gender?] | Coverage |
|---|---:|---:|
| en | 1246 | **100%** |
| de | 1246 | **100%** |
| es | 1246 | **100%** |
| nl | 1246 | **100%** |

**This is the load-bearing finding for Tier 2.** The 2-year vocabulary investment fully covers es + nl with linguistically-correct singular/plural/gender data:
- es: gender (m/f) + accents (acentos: ó, ñ, é, etc.) + correct plurals (regular -s/-es, irregular)
- nl: gender (d=de-word common / h=het-word neuter) + correct plurals + diaeresis

Section 3's "language-proof" thesis applies to es and nl AS-AUTHORED — the vocabulary system already encodes the correctness the homepage promises. **No vocabulary-authoring pass needed** for Tier 2 launch.

This is the asset Phase-3a got to use at full strength; Tier 2 inherits the same advantage.

---

## 7. Routing + middleware

### Locale registry (already extended)

`frontend/config/locales.ts`:
```ts
export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'] as const;
```

All 11 locales registered since pre-pivot. **No change needed.** `LOCALE_NAMES` mapping includes all 11 with display names.

### Middleware

`frontend/middleware.ts:117` — uses `defaultLocale` from `i18n/request`. Locale routing is consistent across all 11 codes. **No change needed for Tier 2.**

### Sitemap

`frontend/app/sitemap.ts:16` — hardcoded `TOPIC_LOCALES = ['en','de']` (gates topic-URL emission per locale). **Extend to 4 locales at Tier 2 launch.**

### hreflang generation

Topic-page `generateMetadata` builds hreflang alternates per `TOPIC_LOCALES`. After extension, hreflang naturally surfaces es + nl siblings when content exists.

---

## 8. Footer surface implications

### Column 1 (By language)

`FOOTER_LANGUAGES` array (Footer.tsx:10) currently lists en + de with explicit "Tier 2 (Spanish, Dutch) — added when Tier 2 launches" comment. **Tier 2 launch action:** add `{ code: 'es', label: 'Español', tier: 2 }` and `{ code: 'nl', label: 'Nederlands', tier: 2 }`. **Effort: trivial.**

### Column 2 (By topic)

`FOOTER_TOPICS_BY_LOCALE` is a `Record<string, FooterLink[]>`. Currently has `en` and `de` keys. **Tier 2 action:** add `es` and `nl` keys with the appropriate non-empty axis-keys (theme + educational-level) per F4 honesty discipline. Depends on: (a) which themes have es/nl decks, (b) which educational-levels have es/nl decks. **Effort: trivial after taxonomy + deck content lands.**

### Column 3 (By exercise type)

`FOOTER_EXERCISE_TYPES_BY_LOCALE` — same shape. Add `es` and `nl` keys with one entry per app that has a published es/nl deck. **Effort: trivial after deck content lands.**

---

## 9. Section 2 breadth grid implications

**Current state:** `homepage-featured-decks.json` v1 (`e1ef7248`) ships 8 picks across en+de only. Spec amendment locked: 4-language grid (en+de+fr+es per HOMEPAGE-SAVE-STATE.md) deferred to Tier 2-3.

**Operator decision territory at Tier 2 launch:**

| Option | Shape | Notes |
|---|---|---|
| **A — 8 picks, 3 locales** | en×3 + de×3 + es×2 (8 total; rebalance) | Drops 1 en + 1 de pick to make room for 2 es. Tighter; preserves 8-pick budget. Excludes nl until Tier 2 has nl content. |
| **B — 8 picks, 4 locales** | en×2 + de×2 + es×2 + nl×2 (8 total; rebalance) | Drops 2 en + 2 de picks to make room for 4 new picks. Maximizes locale visibility; loses some Tier 1 diversity (4 instead of 8 distinct en+de mechanics). |
| **C — 12-pick grid** | en×3 + de×3 + es×3 + nl×3 (12 total) | Component edit needed (grid CSS); preserves Tier 1 depth + adds Tier 2 visibility. Heaviest option. |
| **D — Stagger by sub-tier** | Ship es-only at first es-launch sub-batch (Option A); add nl when nl ships (rebalance again). | Two micro-amendments instead of one big one; matches catalog content cadence. |

**Recon recommendation:** Option D (stagger) — matches the operator-content-authoring cadence. Each Tier 2 sub-launch (es, then nl) gets a focused Section 2 amendment. Operator decides at plan-pass time.

---

## 10. Subscription launch trigger

Per `docs/SUBSCRIPTION-SCOPE.md` (post-`fbff3466`) launch trigger condition:
1. 1 lesson plan per published deck per locale
2. 7 bundles × 2 locales
3. Pillar 3 Tools 1+2+5 functional ✓ (already satisfied)

**Tier 2 implication:** publishing 58 new es+nl decks extends the launch-trigger gate. Now the gate is **1 lesson plan per published deck × 4 locales** = 4 × 29 = ~116 lesson plans (or 58 × 2 = 116, depending on per-app vs per-deck interpretation).

Plus 7 bundles × 4 locales = **28 bundles** instead of 14.

**Sequencing question for operator:** does Tier 2 launch ship before Pillar 1 (lesson plans) starts? If so, Tier 2 inflates the Pillar 1 backlog. If Pillar 1 ships first against Tier 1 only, the launch trigger fires for en+de and Tier 2 catalog publishing happens during the Subscribe-mode period (lower-stakes; subscribers without lesson plans for their language fall back to free-tier behavior on those decks).

**Recon recommendation:** stage Tier 2 catalog publishing AFTER Pillar 1 launches against Tier 1. This:
- Respects the "first meaningful subscription revenue months 6-9" target per CLAUDE.md §1.
- Keeps Pillar 1 authoring scoped to Tier 1 (Phase-3a's 58 rows = 58 lesson plans, not 116).
- Lets Tier 2 catalog publishing run during the post-launch growth period.

This is operator-decision territory. Recon flags only.

---

## 11. Deck authoring forecast

**Volume:** 29 apps × 2 locales (es + nl) = **58 new published rows**.

**Per-batch sizing precedent from Phase-3a:** 8 ZIPs/batch tolerable; 6-batch arc closed in 1 calendar day at peak cadence.

**Tier 2 batch shape** (mirrors Phase-3a):
- Batch 1: matching cluster es+nl (4 apps × 2 = 8) — first real-mode test of es+nl publish-cli + topic-page rendering
- Batch 2: math cluster (5 apps zero-shipped × 2 = picks 4 → 8)
- Batch 3: literacy cluster (4 apps × 2 = 8)
- Batch 4a: visual + puzzle residuals (~4 × 2 = 8)
- Batch 4b: search + remainder residuals (~4 × 2 = 8)
- Batch 5: closeout (math-worksheet + picture-path with locale-conditional fork audit)

**Estimated:** 6-8 batches; comparable to Phase-3a calendar elapsed.

**Halt-and-surface considerations:**
- picture-path's `localeAwareExerciseType` fork — at es/nl, falls through to else → emits `picture-path`. Both es and nl will publish under canonical `picture-path` slug. Validate at plan-pass time that the en→picture-trail substitution doesn't surface again for es or nl.
- The 1/29 mode-variant slugs (matching-letter, subtraction-cross-out, prepositions-fillin, big-small-findbig) — verify operator's per-app generators emit the same slug-variant pattern across all locales (they should; the variants are mode-conditional, not locale-conditional).

**Effort: high.** Comparable to Phase-3a — operator-content-authoring is the bottleneck; pipeline is sealed and ready.

---

## 12. Per-app locale-conditional emission audit

Already covered in §3. Net result: **3 apps with locale-specific code; 0 blockers for Tier 2 launch.**

- picture-path: handled (else branch emits canonical slug for non-en).
- find-and-count: defer (fallback path unreachable in practice).
- prepositions: handled (else branch correct for non-de locales).

---

## 13. Recommended phased arc structure

Tier 2 launch breaks into **3 decoupled tracks** that converge at launch. Each track has its own arc:

### Track A — Structural extension (engineering pass; UNBLOCKS B and C)

**Single commit, single deploy:**
1. Extend `TOPIC_LOCALES` in `frontend/app/[locale]/topic/[slug]/page.tsx` and `frontend/app/sitemap.ts` from `['en','de']` to `['en','de','es','nl']`.
2. Add `es` + `nl` entries to `FOOTER_LANGUAGES` (Footer.tsx).
3. Author es + nl entries in `topics-taxonomy.json` for all 39 axis-keys (slug + name).
4. Update `auth/register/route.ts` email-subject ternary (es + nl branches).
5. Update `schema-generator.ts:388` ternary (es + nl branches; or audit relevance post-pivot).

**Effort: low-medium.** Mostly mechanical extensions; the taxonomy-axis-key authoring is the largest sub-task at 156 string entries.

**Gates:** none at Tier 2 — Track A unblocks Tracks B and C.

### Track B — i18n message-file authoring (operator-content-pipeline)

**Per-namespace authoring waves:**

- **Wave 1: load-bearing UX namespaces** (~150 keys × 2 locales = 300):
  - `homepage.*` (65 keys) — public-page surface
  - `footer.*` (8 keys) — appears on every page
  - `topicPage.*` (12 keys) — catalog landing pages
  - `seo.*` already covered (Brief A)
  - `endDeck.*` already covered (Brief A)
  - `notify.*` (subset of homepage; already in scope)

- **Wave 2: subscriber surface** (~112 keys × 2 locales = 224):
  - `collections.*` (53)
  - `workspace.*` (28)
  - `bulk.*` (18)
  - `share.*` (13)

- **Wave 3: long-tail namespaces** (~58 keys × 2 locales = 116):
  - `support.*` (37) — audit if seller-era; may be defer-eligible
  - `dashboard.*` (10) — audit if seller-era
  - `auth.*` partial (~10)
  - `billing/contact/license/privacy/terms/faq` (~10)

**Effort: medium-high.** Wave 1 + 2 are launch-blockers; Wave 3 has audit-then-author pattern. Per §17.5, es and nl land at confidence comparable to Tier 1 EN+DE (not Nordic-tier NSR territory).

**Gates:** Track B Wave 1 must ship before Track C Batch 1 publishes (so topic-page renders in es/nl don't surface MISSING_MESSAGE).

### Track C — Deck catalog authoring (operator-content-pipeline; mirrors Phase-3a)

**6-8 batches × 8 ZIPs/batch = 58 publishes total.** Cluster shape per Phase-3a precedent. Operator-content-authoring is the dominant cost.

**Gates:**
- Track A (taxonomy + routing) must ship before Track C Batch 1 dry-run.
- Track B Wave 1 must ship before Track C Batch 1 deploys (topic-page renders in es/nl require homepage.* + footer.* + topicPage.* messages).

**Effort: high.** Same shape as Phase-3a. Same publish-cli pipeline. Same per-batch operator-coordinated workflow.

### Convergence: Tier 2 launch event

When Track A + Track B Waves 1-2 + Track C complete:
- 4-locale topic-page surface live.
- 4-locale Footer columns live.
- Section 2 breadth grid amended per operator-decided shape (Option A/B/C/D from §9).
- Subscription launch trigger condition reassessed against post-Tier-2 catalog count.

**Track B Wave 3 (long-tail namespaces) can ship post-launch as polish.**

---

## Halt-and-surface findings (operator-decision territory)

1. **Section 2 grid shape at Tier 2** (Option A/B/C/D in §9) — operator-discretion call, not engineering.
2. **Tier 2 vs Pillar 1 sequencing** (§10) — does Tier 2 catalog ship before Pillar 1 launches against Tier 1? Operator-strategic call.
3. **`support.*` namespace audit** (§1) — 37-key namespace; seller-era leftover or load-bearing? Audit at plan-pass.
4. **`dashboard.*` namespace audit** (§1) — 10 keys; seller-era leftover or active? Audit at plan-pass.
5. **schema-generator hardcoded "33 Arbeitsblatt-Generatoren" string** (§3) — seller-era artifact still rendering somewhere; should be audited for relevance, not just translated.

---

## What does NOT need adjudication (proceeds on operator's go)

- Vocabulary system: **already paid in (100% es+nl coverage).**
- Locale registry: **already extended.**
- Per-app emission: **3 apps audited; 0 blockers.**
- publish-cli pipeline: **sealed at Brief B Phase 5, ready for es+nl publishes.**
- Schema: **catalog-side Prisma models support all locales; no schema change needed.**
- AI service: not Tier 2 territory (Mac Studio Pillar 1).

---

## Summary for plan-pass

**Tier 2 launch is structurally simple** — the asset preconditions are 100% in place (vocabulary, locale registry, schema). The work is **3 well-scoped decoupled tracks** (engineering + i18n authoring + deck authoring) that mirror Phase-3a's structure with the addition of an i18n authoring wave.

**Recommended arc shape for plan-pass adjudication:**

1. **Track A — structural extension** (single commit; ~1 day)
2. **Track B Wave 1 — load-bearing i18n** (single commit per locale or batched; ~2-3 days authoring)
3. **Track C — deck catalog authoring** (6-8 batches; ~5-7 days at Phase-3a cadence; depends on operator content-authoring throughput)
4. **Track B Wave 2 — subscriber-surface i18n** (parallel with Track C; ~2-3 days)
5. **Track B Wave 3 — long-tail i18n** (post-launch polish; ~2 days)

**Total elapsed at sustained Phase-3a cadence: ~10-14 days.**

After arc adjudication, plan-pass commissions Track A first (single-commit unblock), then Track C Batch 1 + Track B Wave 1 in parallel.
