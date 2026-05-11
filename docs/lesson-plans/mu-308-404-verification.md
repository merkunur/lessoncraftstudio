# (μ) 308 404 class verification — root-cause class identified

**Type:** `[DOCS][PUBLISH-CLI]` (μ) Phase 2 retrofit 308 404 class follow-on recon
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** CLOSED. Root cause: **archive class** per §15.11 unpublish handler. Bounded structural state acceptable (V1); no cleanup commission required.

## 1. Context

(μ) Phase 2 (2a-revised) retrofit recon at `docs/lesson-plans/mu-phase-2-retrofit-recon.md` classified 728 NULL en title_hash residue into 3 sub-classes:
- **308 not-found (404)** — retrofit script logged HTTP 404 when fetching deck.html from production
- **~420 unique-constraint collision** — Prisma threw collision on `@@unique([language, title_hash])` during retrofit
- (The "+0" deck-with-no-title class is empirically zero)

Per operator framing at consolidation cycle close: "(μ) 308 404 class verification at next-session commencement (informational; non-gating)." This recon closes that verification.

## 2. Empirical findings

### 2.1 DB-state inventory

Query: `SELECT slug, status FROM decks WHERE title_hash IS NULL AND language='en'` grouped by status:

| Status | Count | Class correspondence |
|---|---:|---|
| `archived` | **308** | Exact match for 308 not-found (404) class |
| `published` | **420** | Exact match for ~420 collision class |
| **Total** | **728** | en NULL residue (matches recon) |

The 308 vs 420 split is structural — not statistical noise. archived ↔ 404; published-with-collision-class ↔ DB unique-constraint failures.

### 2.2 Production canonical-path verification (sample n=4 from 308 archive class)

```
GET https://www.lessoncraftstudio.com/en/decks/math-worksheet-001/ → 404
GET https://www.lessoncraftstudio.com/en/decks/math-worksheet-150/ → 404
GET https://www.lessoncraftstudio.com/en/decks/math-worksheet-300/ → 404
GET https://www.lessoncraftstudio.com/en/decks/picture-path/        → 404
```

All sampled archive-class URLs return HTTP 404 from production CDN. Expected behavior per §15.11 unpublish handler (symlink removed → immediate 404).

### 2.3 Production canonical-path verification (sample n=3 from 420 collision class)

```
GET https://www.lessoncraftstudio.com/en/decks/code-addition-animals-3/ → 200
GET https://www.lessoncraftstudio.com/en/decks/more-less-animals-3/     → 200
GET https://www.lessoncraftstudio.com/en/decks/more-less-beach-3/       → 200
```

All sampled collision-class URLs return HTTP 200 from production CDN. Decks serve correctly; NULL title_hash is DB-level state (uniqueness constraint blocked retrofit), not serving-level state.

### 2.4 FS-state verification (archive folder)

```
ls /var/www/lcs-media/decks/.archived/en/ | wc -l
=> 316 entries
```

Breakdown of 316 archive entries:
- ~8 entries with `-pruned-<utc>` suffix (per §15.12 KEEP_VERSIONS=3 cleanup)
- **308 entries with `-unpublished-<utc>` suffix** (per §15.11 unpublish handler) ← matches DB archive count exactly

Sample archive folder contents:
```
math-worksheet-001-unpublished-20260507123842
math-worksheet-002-unpublished-20260507123855
math-worksheet-003-unpublished-20260507123857
... (308 such entries)
```

### 2.5 DB-archive-FS correspondence (sample)

Query: `SELECT slug, status, created_at, updated_at FROM decks WHERE slug LIKE 'math-worksheet-00%' AND language='en'`:

```
slug                | status    | created_at              | updated_at
math-worksheet-001  | archived  | 2026-05-07 12:13:43.351 | 2026-05-07 12:38:42.707
math-worksheet-002  | archived  | 2026-05-07 12:13:43.416 | 2026-05-07 12:38:55.502
math-worksheet-003  | archived  | 2026-05-07 12:13:43.48  | 2026-05-07 12:38:55.686
math-worksheet-004  | archived  | 2026-05-07 12:13:43.545 | 2026-05-07 12:38:55.907
```

DB `updated_at` (12:38:42 etc.) matches FS archive folder UTC suffix (`-20260507123842`) exactly per §15.12 archive folder structure. Archive operation timing fully consistent.

## 3. Root-cause classification

**Class i: ARCHIVE CLASS (308 decks)** — NOT CDN-clearing.

Decks were correctly unpublished via §15.11 single-deck unpublish handler:
1. `db.findExistingBySlug` returns `status='published'` row
2. `place-assets.unpublishAssets(locale, slug)` removes `<slug>` symlink (immediate 404) + `fs.renameSync` versioned dirs to `.archived/<locale>/<slug>-unpublished-<utc>/`
3. `db.unpublishDeck(id)` flips `status='archived'`; `updated_at` auto-tracks via Prisma `@updatedAt`

NULL `title_hash` is expected for these rows because:
1. Created pre-2026-05-09 schema migration (`20260509083000_add_seo_hash_columns`) — pre-migration cohort per §A.13.26 timestamp-stratification doctrine
2. Archived shortly after creation (typical: 25 minutes between create + archive); never had post-migration title_hash backfill opportunity at publish-time

This is **bounded structural state**, NOT cleanup opportunity. The decks SHOULD return 404 (they're archived). The DB rows SHOULD have NULL title_hash (pre-migration archived state). Production canonical-path correctly serves 404 per §15.11 contract.

**Class i sub-population context:**
- ~300 of 308 are math-worksheet-NNN (placeholder rows; archived 2026-05-07 12:38 wave)
- ~5-8 singletons (e.g., picture-path archived at `0ad626cb` per §15.10 worked example for en-only canonical slug rename to picture-trail)

## 4. Recommended cleanup approach — V1 BOUNDED STRUCTURAL STATE ACCEPTABLE

Per the (μ) Phase 2 retrofit recon's three options:

- **(V1) bounded structural state acceptable** — 728 NULL en residue (308 archive + 420 collision) preserved as documented residue; no cleanup commission ✓
- **(V2) small `[CHORE]` cleanup** — DB rows could be modified to reflect archive state — REJECTED (state already correctly reflects archive; no schema change needed)
- **(V3) substrate-gap commission** — substrate gap class — REJECTED (no substrate gap; archive flow is by-design)

**Verdict: V1 BOUNDED STRUCTURAL STATE ACCEPTABLE.**

The 308 archive class is operationally-correct state. Retrofit-uncomputable is expected because:
1. deck.html doesn't exist at production canonical-path (symlink removed per §15.11)
2. Even if archived FS dir is read, the deck.html at archive folder would have stale SEO content from pre-migration era (no `__CANONICAL_URL__` substitution in early archived decks)

Backfilling title_hash from archived deck.html OR from manifest reconstruction would:
- Restore title_hash for decks that don't serve at production (zero-utility-to-user)
- Require ~300 LoC additional script for marginal data-integrity gain
- Not block any operational flow (archived decks don't participate in title_hash uniqueness checks because §A.13.5 emit-correctness applies to publish path; archived rows are inert)

**No cleanup commission required.**

## 5. Cross-class context — the 420 collision class

For completeness: the ~420 collision class is structurally distinct. These are PUBLISHED decks (HTTP 200) whose deck.html `<title>` tags collide with predecessor decks within (app, theme, language, edu-level) tuple. The §11 commission's `variant_id` discriminator (added to post-§11 titles) made post-commission titles unique-by-construction; pre-§11 decks lack the discriminator.

The 420 collision class would benefit from a (μ) slug-rationalization commission per Phase 4a (ι) framing — pre-§11 decks could get bulk-`variant_id` assignment + manifest reconstruction + republish. Filed-as-deferred per `mu-phase-2-retrofit-recon.md` §3.2.

This recon's scope is the 308 404 class only. The 420 collision class context is provided for cross-class clarity.

## 6. §A.13 verification-hygiene application

This recon empirically applied:

- **§A.13.14 Phase 1 Explore-agent fidelity validation** — direct grep + curl + psql queries (NOT Explore agent) for line-precise verification of 308 vs 420 split
- **§A.13.21 Operator-pre-recommendation substrate verification** — operator framing classified 404 class as informational; recon empirically confirmed bounded structural state
- **§A.13.22 Audit-doc-vs-canonical-state divergence** — verified (μ) Phase 2 retrofit recon's 308/420 numbers against current DB state at this recon authoring
- **§A.13.26 Schema migration timestamp-stratification doctrine** — applied to classify pre-migration archive cohort as structurally NULL
- **§A.13.28 Phase 4 production-canonical-path verification** — curl-spot-check at production canonical-path verified 404 vs 200 expected behavior per class

## 7. Standing position

**(μ) 308 404 class verification CLOSED at V1 BOUNDED STRUCTURAL STATE ACCEPTABLE.**

728 NULL en title_hash residue:
- 308 archive class (V1 acceptable; archive flow is by-design)
- 420 collision class (V1 acceptable; (μ) slug-rationalization filed-as-deferred per Phase 4a (ι))

Neither class blocks Subscribe-flip readiness or new-publish correctness. Forward-flow correctness for new publishes confirmed at 100% (post-migration cohort).

## 8. Cross-references

- `docs/lesson-plans/mu-phase-2-retrofit-recon.md` — (μ) Phase 2 retrofit close-out recon (parent doc)
- `scripts/publish-cli/retrofit-mu-pre-migration-residue.js` — retrofit script (logs 308 not-found URLs)
- `docs/lesson-plans/subscribe-flip-readiness-review.md` — Subscribe-flip readiness review (Component (N3) framing)
- §15.10 Block-on-archived UPDATE contract — `@@unique([language, slug])` survives on archived rows
- §15.11 Unpublish handler — FS-first DB-last archive flow producing 404 + structural state
- §15.12 Archive folder structure — `.archived/<locale>/<slug>-unpublished-<utc>/` + `<slug>-pruned-<utc>/` namespaces
- §A.13.26 Schema migration timestamp-stratification doctrine — pre-migration cohort NULL by definition
- Commit `aea7d962` — (μ) Phase 2 retrofit script
- Commit `72f3e271` — (μ) Phase 2 retrofit close-out recon
- Commit `0ad626cb` — picture-path unpublish (worked example for §15.10 block-on-archived)

---

*End of (μ) 308 404 class verification. Status: CLOSED. V1 bounded structural state acceptable.*
