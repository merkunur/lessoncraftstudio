# §16.7 / §16.8 / §17.10 detail (relocated from CLAUDE.md)

> Full text for prose-substrate fallback, filter-sort-pagination architecture, and i18n-hygiene + sitemap-shard sub-doctrines. CLAUDE.md keeps the terse rule + pointer. Relocated 2026-06-08 — nothing deleted.

## §16.7 Prose substrate

## 16.7 Prose substrate

Topic pages render rich descriptive prose above deck grid — locale-natural multi-sentence paragraphs. i18n-keyed per (axis-key, locale).

### 16.7.1 Q3 fallback chain pattern
3-level fallback:
1. **`topicProse.<axisKey>`** (single-axis) or **`topicProse.<a1>__<a2>`** (intersection) — rich prose authored for top-N per locale
2. **`topicPage.intro.<intent>`** where intent ∈ {`exerciseType`, `theme`, `educationalLevel`} — short ICU template
3. **`topicPage.intersection.intro`** — short ICU template

`TopicProseContainer.tsx` checks in order; first non-empty match. Long-tail axis-keys without `topicProse` substrate-honestly fall through (§16.7.3 Path B). Origin: `15444fe8` Arc 6a + `c03fdb8e` Arc 6d (660 prose blocks across 11 locales).

### 16.7.2 topicProse key shape canonical
- **Single-axis:** `topicProse.<axis-key>` — e.g., `topicProse.addition`, `topicProse.kindergarten`
- **2-axis intersection:** `topicProse.<a1>__<a2>` with axis-keys in **alphabetic order** — e.g., `topicProse.addition__animals`

`lookupTopicProse` sorts before constructing lookup. Authoring discipline: i18n message file MUST use alphabetic-ordered keys. Origin: `c03fdb8e`.

### 16.7.3 Path B by default for content-authoring arcs
**Path B:** rich content authored for top-N per locale; long-tail substrate-honestly falls through to template intros via §16.7.1. Caps authoring at high-traffic surfaces while preserving structural coverage. Operator-strategic per arc: which axis-keys are "top-N" (deck-volume / query-volume / audience priority). Default at scale: top-N by published-deck-count. Origin: `c03fdb8e` (Path B + intersection.intro gap-fold; 660 prose blocks + 7 intersection.intro gap-fills).


---

## §16.8 Filter-sort-pagination

## 16.8 Filter-sort-pagination

### 16.8.1 TOPIC_PAGE_SIZE = 24
Per-page count locked at 24 (4 columns × 6 rows desktop). Constant at `frontend/lib/topic-decks.ts: TOPIC_PAGE_SIZE`; all paginated surfaces import. Balances grid density vs page-load weight. Locked Arc 6b Q-pagination adjudication.

### 16.8.2 Filter-sidebar architecture pattern
`FilterSidebar.tsx` renders 3 facet groups in fixed order: **theme → educational-level → exercise-type** (matches §16.5.3 axis-ordering). Per-axis:
- **Theme:** top-N expand pattern — first 12 visible; "Show all themes" button. `FacetGroup.themeTier1Count = 12`.
- **Educational-level:** all 5 visible (small set).
- **Exercise-type:** all 29 visible.

**URL-state truth source:** filter state from URL query-string (§16.5.4), NOT React state. Toggle facet `router.push`es new URL. **Path-bound axis exclusion:** when page anchored on axis (`/en/topic/addition/` filters to `type=addition`), that facet excluded.

Origin: `73640794`. UX truncation defect at `91ae41a7` (label-readability fix per §A.13.1).

### 16.8.3 Canonical-tag-on-pagination
Pagination + sort URLs canonical-redirect to bare path when params equal defaults: `?sort=newest` → bare; `?page=1` → bare; `?sort=alphaAsc&page=1` → `?sort=alphaAsc` (page-1 stripped).

Server component compares incoming `searchParams` against canonical-form; if mismatch, 308-redirect. Prevents duplicate-content SEO penalties.

**Subtle bug class** (`1d105da5` fix): earlier impl compared `sp` (already canonicalized) against `currentSp` (also canonicalized) — always equal, redirect never fired. Fix: compare RAW incoming `searchParams.toString()` against canonical.

---

## §17.10 I18n hygiene + sitemap-shard infrastructure

### 17.10 I18n hygiene + sitemap-shard infrastructure

**17.10.1 4-shard sitemap-index hash-partitioning.** 4 shards: 0/1 = published deck URLs by `Deck.id` last-char ASCII parity (50/50); 2 = 2-axis intersections; 3 = single-axis topic pages + locale-root + meta. Keeps each under Google's 50K limit. Cross-locale through same 4 shards. Origin: `e5bb3cb4` + `85f090a3` Arc 6c.

**Shard routing (post SEO-thumbnail commission 2026-05-19):**
- Shards 0 + 1 served by **custom routes** at `frontend/app/sitemap/0.xml/route.ts` + `1.xml/route.ts`. Emit `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` with per-URL `<image:image>` entries (og-image.png + thumbnail.png; title + caption from `Deck.title`/`description`). Next.js 14.2.18's `MetadataRoute.Sitemap` type doesn't support image fields, hence the bypass.
- Shards 2 + 3 served by Next.js sitemap convention via `frontend/app/sitemap.ts: generateSitemaps()` which returns only `[{id:2},{id:3}]` (omitting 0 + 1 cedes those URLs to the custom routes).
- Index at `frontend/app/sitemap.xml/route.ts` hard-codes `[0,1,2,3]` so all four shards remain listed regardless of `generateSitemaps()` return shape.

**17.10.2 Reuse-existing-i18n-key when strings identical.** Identical (key, locale) values reuse single shared key. Origin: `15444fe8` Arc 6a.

**17.10.3 Substrate-honesty namespace-boundary discipline.** Phase 1 grep ALL platform locale files for namespace's key set; Phase 4 confirm 11/11. Mismatch → raw-key-leak. Origin: `c03fdb8e` Arc 6d.

**17.10.4 Wave-N namespace-migration discipline.** Wave 1 ships baseline for subset (Tier 1+2); Wave 2+ folds remaining. Phase 1 cross-locale audit; Phase 2 per-locale gap-fill OR migration; Phase 3 single commit N locale files; Phase 4 per-locale curl + raw-key-leak grep. Origin: `672e771b` + `a1c78529` Wave 2 footer.

**17.10.5 Runtime-consumer-audit is load-bearing.** Runtime consumer (which keys component actually calls) is load-bearing. Static-text references in admin tooling are isolated. Grep `useTranslations\(['"]<namespace>` + `getTranslations.*<namespace>`. Wave 2 footer: legacy 13-key referenced only in 2 admin HTMLs; deletion safe. Origin: `672e771b`.

**17.10.6 Legacy-namespace-residue audit-on-arc-Phase-1.** Locales with Wave 1 partial coverage carry legacy seller-era shapes as runtime-orphaned residue. Wave 2 footer found 7 newer locales with 13-key seller-era shape. Audit BOTH forward gap AND backward residue. Origin: `672e771b` + `a1c78529`.

**17.10.7 Cross-locale convention parity verification.** Phase 1 samples Tier 1+2 actual canonical TEXT shape — not just key presence — to prevent register divergence. Wave 2 footer initially used bare-prefix ("Par langue") until Phase 4 revealed Tier 1+2 is noun-prefixed ("Worksheets by language" / "Arbeitsblätter nach Sprache"). Fix-up `a1c78529`.

---

