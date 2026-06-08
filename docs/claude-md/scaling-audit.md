# §A.14 Scaling Arc Audit Doctrine — full detail (relocated from CLAUDE.md)

> Full text + empirical anchors for §A.14 (scale-ceiling order, pre-publish-wave audit checklist, audit infrastructure scripts). CLAUDE.md keeps the terse rule + pointer. Relocated 2026-06-08 — nothing deleted.

### A.14 Scaling Arc audit doctrine

`[CHORE][AUDIT]` commissions measure publish-cli's path against scale targets without production change.

#### A.14.1 Scale-ceiling order
publish-cli's ceilings under realistic catalog growth:
1. **Time-death tolerance** at ~10K decks (10 min wall-clock at 59.3ms/deck)
2. **Within-batch slug collision rate** at ~5K-10K decks
3. **Sharp + chown overhead** at ~30K-55K decks (CPU-bound; subprocess-spawn dominates)
4. **Stale-staging-dir lockout** (any scale, low probability per batch)

Engineer: chunked batches > pre-collision-check > subprocess-free chown via `fchown` > auto-cleanup. No memory ceiling within 55K (216 MB peak RSS at 440-deck baseline). No disk ceiling within 250K (379 GB free + 28.8M inodes at audit). Origin: `f765b991`.

#### A.14.2 Defer-trigger heuristic for performance commissions
Each commission has explicit empirical trigger; default-defer rather than engineer-now:
- **Checkpoint/resume** — at 5K+ decks/batch OR first real mid-batch death event
- **Within-batch slug collision pre-check** — at 5K+ decks/batch
- **Subprocess-free chown via fchown** — at 30K+ decks/batch
- **Stale-staging-dir auto-cleanup** — after first lockout

**Anti-pattern:** engineering ahead of empirical trigger.

#### A.14.3 Sequential publish is a feature
publish-cli's sequential await loop is intentional. Concurrency would introduce within-batch races on slug-collision detection + `create.deck` — two parallel publishes of same `(language, slug)` either deadlock on unique constraint OR produce numeric-suffixed slug racing canonical. Sequential prevents both by construction.

**Operational:** to handle larger batches, **chunk** via `--staging-dir` (split 10K into 3 × 3.3K) rather than parallelize. Chunk boundaries race-safe.

#### A.14.4 publish-cli non-idempotent retry posture
Re-running partial-completion bulk-publish requires staging-dir hygiene; NOT safe to retry blind. Bulk-publish completing M of N before process-death produces M `Deck` rows + M asset trees + partially-consumed staging dir. Re-running same `publish-bulk <staging-dir>` attempts re-INSERT of M already-published → unique-constraint violations. Recovery: identify M completed; move ZIPs out of staging; re-run against N-M unpublished.

**Anti-pattern:** assuming `publish-bulk` idempotent. Future briefs implying blind-retry must surface manual-recovery.

#### A.14.5 Asset-tree audit-only `[CHORE][AUDIT]` commission shape
Read-only audits produce audit-report deliverable + Phase 3 operator-strategic questions; no production change, no DB writes, no FS modification, no `deploy.sh`. Audit-report at `docs/<arc-name>-audit-<utc-date>.md`.

**Phase shape:** (1) Inventory; (2) Empirical recon (read-only on production OR isolated-snapshot); (3) Findings — headline + supporting data + Phase 3 questions; (4) Doctrine carry-forward.

**Triggers:** explicit operator commission OR precipitating event (near-miss, downstream commission benefit).

Origin: `9850df93` (Arc 3 at 731-deck-catalog) + `f765b991` (Arc 5 at 440-wave snapshot).

#### A.14.6 Backup-coverage audit class
Backup-coverage is distinct class from scale-ceiling audits. Backup gaps surface as **URGENT** — catastrophic FS loss is unrecoverable without backup, and gap structurally cheap to close (~40 LOC bash + cron).

**Triggers:** audit commission discovers asset-tree without backup coverage OR new asset-tree at `/var/www/lcs-media/<dir>/`; verify backup OR file [FIX][OPS] alongside create.

**Off-host backup deferred trigger:** ~10 GB asset bytes OR ~6-7K decks. At scale, same-host weekly tarball becomes fallback to off-host.

Origin: `9850df93` (URGENT finding: `/var/www/lcs-media/decks/` zero backup at 731-deck state) + `15be6ef5` (closure: `backup-decks.sh`).

#### A.14.7 Scale-projection methodology extension
Scale-projection decomposes into two layers; both measured.

**Layer 1 — filesystem-level.** Disk bytes + inode count per published deck × design-target population. Per-deck-asset: deck.html (~200-400 KB), printable.pdf (~50-150 KB), answer-key.pdf (~30-100 KB), thumbnail.png (~20-50 KB), og-image.png (~80-150 KB). Arc 3 (`9850df93`): ~6 inodes × 731 = ~4,400 at audit, projecting ~330,000 at 55K = 1.1% of ext4 default inode budget. Disk: ~1.5 MB/deck × 55K = ~82.5 GB total (4.6× margin against free-space).

**Layer 2 — publish-cli timing.** Per-deck wall-clock × batch size + concurrency profile. Arc 5 (`f765b991`): empirical 59.3 ms/deck projecting 10 min at 10K/batch — time-death tolerance per §A.14.1.

**Apply:** measure both; use real production state or isolated-snapshot; project linearly; flag non-linear factors (disk-fragmentation, DB index bloat, ext4 dir_index thresholds).

#### A.14.8 Pre-publish-wave audit doctrine

Three defect classes have recurred across multiple operator deck-publish hand-offs and were re-diagnosed from scratch each time. All captured here as pre-publish-wave checklist future sessions MUST run BEFORE invoking `publish-bulk --confirm`.

**Three recurring defect classes:**

1. **Theme-emit defects** — apps' `LCSCatalogExport.export()` or `buildCatalogManifestSettings()` hardcodes `theme: null`, dropping operator's theme. Plus 27 of 29 apps historically didn't populate `bundle.seoMeta.themeName` in `extractDeckBundle()` so deck.html `<title>` + meta description lacked theme keyword. Past fixes: `5110d6e0` (math-worksheet + prepositions defect-A); `0e5f1560` (28-app sweep adding `seoMeta.themeName` via shared `LCSCatalogExport.deriveThemeName()`).

2. **Embed iframe gap (apex/www mismatch)** — `substitute.js: CANONICAL_URL_BASE` was apex; nginx 301 to www breaks embed iframe auto-resize listener via postMessage URL-match. Past fix: `6fb6ee3d` (apex → www + `rewrite-canonical-host.js` retrofit).

3. **Deckend-suggestions strip stale-emit** — operator's PC `frontend/public/worksheet-generators/` (gitignored serving copy populated by `scripts\master-sync.bat`) goes stale relative to `REFERENCE TRANSLATIONS/catalog-export.js`. When `LCSCatalogExport.buildDeckEndSuggestionsPlaceholder` undefined at deck-generation, apps' `parts.push(deckEndSuggestions)` pushes empty string; deck.html ships without strip. Two failure modes per timestamp ordering: Mode B (oldest, missing all 3 elements) and Mode A (mid-sync, un-hide JS hardcoded but helper undefined → empty section). Result: end-of-deck "Try one of these next:" reel never renders. Past fix: 9-app wave 2026-05-09 — recovery via `scripts/publish-cli/inject-deck-end-strip.js --locale=<X> --rewrite`. Critical for UX + §1 SEO flywheel (deck.html outbound topic-page anchors feed Google's link graph).

**Pre-publish-wave checklist — run BEFORE `publish-bulk --confirm`:**

1. **theme-emit audit.** Sample 1 ZIP per distinct app: `unzip -p <zip> manifest.json | jq .theme` should be non-null when operator selected a theme. If any null:
   - Apply Shape A authoring fix per §A.13.5, OR
   - Run salvage script `scripts/publish-cli/rewrite-manifest-theme.js` per §15.17

2. **seoMeta audit (source app HTML).** Each app's `extractDeckBundle()` should populate `bundle.seoMeta.themeName` via shared `LCSCatalogExport.deriveThemeName(opts)`. If absent, deck.html `<title>` will miss theme keyword. Add helper call at extractDeckBundle return per post-`0e5f1560` canonical pattern.

2b. **bundle-vs-current-app reconciliation (operator ZIP audit).** Step 2 audits SOURCE app HTML; Step 2b audits OPERATOR-GENERATED ZIP. Sample 1 ZIP per app: `unzip -p <zip> deck.html | grep -oE 'seoMeta":\{[^}]*'`. If absent OR `themeName: null` for a deck whose manifest.theme is non-null, halt: operator's bundle predates seoMeta-population fix even though source app is current — typically browser-cache + service-worker staleness. Operator must hard-refresh (Ctrl+Shift+R) and regenerate. If unblocking urgent, recovery via `scripts/publish-cli/rewrite-deck-html-title.js` salvage post-publish (§15.17 — see `ca5d4aa0` for catalog-wide recovery precedent). Origin: 95-deck word-guess + word-scramble wave 2026-05-07 generated ~2h before `0e5f1560`.

3. **canonical-host check.** Confirm `scripts/publish-cli/substitute.js: CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'` (www form) per §A.10. Apex breaks embed iframe auto-resize. If defective:
   - Fix constant (one-line edit)
   - Run `scripts/publish-cli/rewrite-canonical-host.js` against `/var/www/lcs-media/decks/` to retrofit existing
   - Cloudflare 5-min TTL refreshes edge automatically

4. **deckend-suggestions strip presence audit.** Sample 1 ZIP per app: `unzip -p <zip> deck.html | grep -c 'lcs-deckend-suggestions'`. Expected: ≥3 hits per ZIP — CSS block + section element + un-hide JS guard. If 0-2 hits, operator's PC ran with stale `catalog-export.js` (Mode A: 1 hit; Mode B: 0 hits). Recovery:
   - **Pre-publish** (preferred): operator runs `scripts\master-sync.bat` + hard-refresh, regenerates wave
   - **Post-publish salvage**: `scripts/publish-cli/inject-deck-end-strip.js --locale=<X> --rewrite` against `/var/www/lcs-media/decks/` per §15.17 — handles both modes via removeExistingStripAndGuard + re-inject. Idempotent. Cloudflare 5-min TTL refreshes per §15.8

5. **post-publish spot-check.** Pick 1 sample deck per affected app:
   - `curl -s <deck-url> | grep -E '<title>|var url='` — title should include theme word; var url= should be www form
   - `curl -s <deck-url> | grep -c 'lcs-deckend-tile'` should return ≥1
   - Embed deck on test page; verify auto-resize works (no whitespace gap below content)

**Why at doctrine level.** Operator-attention is load-bearing across runway. Re-diagnosing per wave costs ~1-2 hours of CC + operator round-trips. Pre-checking takes ~5 minutes. Asymmetry justifies the doctrine even at one occurrence per quarter; all three classes have recurred multiple times in close succession.

**Apply.** At the START of any commission involving `publish-bulk` on operator-staged ZIPs, run the 5-step checklist before any other work. Surface findings in Phase 1 inventory; fix BEFORE `--confirm`. Each step has documented canonical solution + recovery script.

Origin: surfaced empirically across 345-en-wave + alphabet-train/prepositions embed-gap commission cycles. Step 4 added 2026-05-09 after 9-app wave (picture-sort/shadow-match/bingo/matching/pattern-worksheet/chart-count/pattern-train/big-small) shipped without populated reels; root-cause Mode A + Mode B stale-emit from operator's PC sync lag. Cross-references: §A.10, §A.13.5, §A.13.7, §15.17, §17.8.5.

### A.14.9 SEO-100pct audit infrastructure (canonical reference)

The SEO-100pct commission (2026-05-19) shipped a reusable audit pair under `scripts/publish-cli/`:

1. **`audit-published-baseline.js`** — DB-side enumeration of all published decks for requested locales. Outputs per-deck JSON + per-locale stratified summary (NULL hashes pre vs post 20260509083000 migration; collision sets; cohort breakdown). Reads `frontend/.env.production` for DATABASE_URL on Hetzner. Read-only.

2. **`audit-deck-html.js`** — per-deck FS audit running 10 invariant checks against `/var/www/lcs-media/decks/<locale>/<slug>/deck.html` + sibling `manifest.json`. Bypasses Cloudflare (direct FS read; no rate limits). Concurrency-limited parallel runner. Outputs per-deck JSON + aggregated markdown summary. Reuses `seo-reconciliation.js` predicates + `count-inbound-surfaces.js`.

**Invariants checked:**
1. Title uniqueness (SHA-1 normalized; matches DB titleHash)
2. Description uniqueness (SHA-1 normalized; matches DB descriptionHash)
3. Canonical URL pattern (www-form + locale + native slug + trailing /)
4. OG tags ≥14 (7 og:* + 7 twitter:*)
5. Inbound link count ≥3 (via countInboundSurfacesForDeck)
6. Locale residue absent (lexicon-on-rendered-HTML; trace findings emit as INFO)
7. Single h1
8. Theme keyword in rendered title (when manifest.theme is taxonomy-keyed)
9. Deckend-suggestions strip ≥3 markers
10. Canonical-host var url= www-form (embed iframe compatibility)

**Invocation pattern (on Hetzner via plink):**
```
node scripts/publish-cli/audit-published-baseline.js --locales=en,es,pt
node scripts/publish-cli/audit-deck-html.js --locales=en,es,pt --baseline=<latest baseline json> --concurrency=16
```

Wall-clock at 9,191-deck catalog: baseline 0.6s + per-deck audit 20s. Requires `--max-old-space-size=16384` for full-catalog audit on Node 18.

**Future SEO audits:** invoke these scripts; extend `runChecksForDeck` for new invariant classes; do NOT re-author DB-querying or FS-walking logic.

### A.14.10 Image-SEO retrofit infrastructure (SEO-thumbnail commission, 2026-05-19)

Added beyond the §A.14.9 audit pair:

1. **`og-image-text.js`** — SVG-text builder for og-image right column. DejaVu Sans on Hetzner; manual char-width word-wrap (librsvg lacks `<foreignObject>`).
2. **`og-image-xmp.js`** — XMP packet builder. dc:title/description/creator/rights/subject + xmpRights:Marked; Sharp `.withXmp(string)` API.
3. **`regenerate-og-images.js`** — walks all `/var/www/lcs-media/decks/<locale>/<slug>/`, regenerates og-image.png with two-column composite + XMP embed. ~100ms/deck on Hetzner; 9296 decks in ~15min at commission close.

Custom sitemap routes at `frontend/app/sitemap/0.xml/route.ts` + `1.xml/route.ts` emit `<image:image>` entries inline per Google's image sitemap protocol (Next.js MetadataRoute.Sitemap doesn't support image fields).

For future image-SEO work: extend `og-image-text.js` SVG builder or `og-image-xmp.js` field set; re-run `regenerate-og-images.js`. Do NOT touch Sharp pipeline directly.

### A.14.11 Deploy-window stale-chunk failure mode (login/interactive break) + two-layer fix (2026-05-29)

**Failure mode.** Each `deploy.sh` run produces a new BUILD_ID; all `_next/static` hashed chunk filenames change and the atomic swap (`mv RELEASE_DIR .next/standalone`) deletes the previous build's `.next/static` wholesale. A client (or Cloudflare edge) holding pre-deploy HTML then requests a now-missing chunk hash → Next serves its **404 as `text/html`** → browser "Refused to execute script … MIME type ('text/html') is not executable" → page JS never hydrates. Empirically this broke the **sign-in page** so the operator "could not log in" even though the login API itself SUCCEEDED (server out-log showed repeated `Signin attempt …` reaching `app/api/auth/signin/route.ts:124`, which is AFTER all rejection checks; no 500s). **Frequent redeploys (e.g. the thin-page program's per-batch deploys) make this recur and strand the most-active user.** Diagnostic tell: browser console 404 on `/_next/static/chunks/app/%5Blocale%5D/layout-<hash>.js`; the post-login redirect goes to `/<locale>/workspace` (`signin-client.tsx:200,297`), NOT `/admin`.

**Two-layer fix (both creds-free; no Cloudflare API token exists on the box):**
1. **nginx — never cache a transient 404** (server-side config, NOT in git per §15.7). `/etc/nginx/sites-enabled/lessoncraftstudio` `location /_next/static` now has `proxy_intercept_errors on; error_page 404 = @next_static_miss;` + a named `location @next_static_miss { add_header Cache-Control "no-store" always; return 404; }`. Verified: a missing chunk via CF → `404 + Cache-Control: no-store + cf-cache-status: BYPASS`; real chunks still 200. **NEVER leave an nginx `.bak` inside `sites-enabled/`** — nginx loads it → `duplicate upstream "nextjs"`; keep backups in `/root/nginx-backups/`.
2. **deploy.sh — retain recent builds' chunks so the 404 never happens.** After the swap (replacing the old `rm -rf .next-old`), snapshot THIS build's pristine chunks to `.next-static-archive/<BUILD_ID>/` (a **SIBLING of `.next/`**, NOT inside it — `next build` defaults `cleanDistDir:true` and wipes all of `.next/` every build, so an archive inside `.next/` is destroyed and retention silently degrades to "0 previous"; the sibling survives. Gitignored via `frontend/.gitignore /.next-static-archive/`; never served by nginx), merge the previous `KEEP-1` generations into the live `.next/standalone/.next/static/` with `cp -rn` (current build wins), prune to `KEEP=5`. Bounded (snapshot taken before merge; live rebuilt pristine each swap → no accumulation). Static is served from disk per request, so no extra pm2 restart is needed. A WARN-only post-deploy step (after blog cache warming, before the Google ping) curls `/en/auth/signin` + `/en`, extracts `/_next/static/*.{js,css}`, and reports any non-200 (never `exit 1` — `set -e` is active and the swap already happened). **Lesson:** anything that must survive across deploys cannot live under `.next/` (cleanDistDir wipes it); verify retention shows "current + N previous" (N≥1) from the 2nd deploy after this fix.

`set -e` safety is load-bearing in the retention block: `${ARCHIVE:?}` guard on every `rm -rf`, `${prev%/}/.` separator-safe copy, explicit self-skip (no mtime-tie hazard), `|| true` on the merge.

**Optional future hardening (not shipped):** `generateBuildId` pinning reduces BUILD_ID churn but NOT content-hash churn (retention still required); a Cloudflare cache-purge step in `deploy.sh` or a CF Cache Rule "don't cache 404 on `/_next/static/*`" — both need an operator-provisioned CF API token.

