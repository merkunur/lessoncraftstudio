# Pillar 4 Arc 2 commission spec — full-scale flashcard generation + 200-package integration + paid-subscription gating + production ship

**Type:** `[FEATURE][PILLAR-4][FLASHCARDS]` — full-scale generation + integration + gating + production ship
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 5
**Estimated LoC:** ~3,500-5,500
**Estimated sessions:** 3-4
**Status: DRAFT — operator ratification pending at Pillar 4 Arc 1 Phase 5 close.**

## 1. Context

Pillar 4 Arc 1 closed at `da7887d2` (post-iteration-2). Sky+v2 canonical design + pipeline + 72-card validation batch shipped. Arc 1 deliverables ratified by operator at Phase 4 second-surface review.

**Notable arc-1-recon patterns generalizing forward:**
1. Validation batch as iteration substrate (72 cards exposed cross-locale + cross-theme variance).
2. Plan-agent two-pass independent review (spec authoring + implementation verification).
3. Sharp preprocessing as Phase 1 architecture (not Phase 3 fix).
4. Operator scope corrections at ratification time.
5. Composition-element decisions locked spec-time.

**Pillar 4 Arc 2 scope-as-locked (operator ratification 2026-05-08):**
- Simplified 2-element composition (image + word label only)
- ~16,632 render envelope (1,512 color images × 11 platform locales)
- Sentence-frame substrate deferred indefinitely (NOT in Arc 2 scope; never recommissioned unless operator explicitly resurfaces)
- SOFT_HYPHENS substrate carries forward; Arc 2 extends coverage
- Sky+v2 canonical design (with iteration 2 word-band reallocation) locked
- Free-tier 3 packages include flashcards; remaining 197 paywalled
- Pixel-identical visual treatment between free and paid tiers (tier signal lives in package-list UI; lock icon + "3 of 200 free" framing — NOT on flashcard artifact)
- 200-package integration in scope
- Paid-subscription gating implementation in scope
- Print + digital format ship to production

## 2. Pre-locked architecture

Per Pillar 4 Arc 1 ship state (commits `64c6e06d` → `da7887d2`). CC adjudicates within these locks.

- Sky+v2 canonical design — 2:3 portrait card; 60% image; 30% word-band auto-fit; 4mm theme-color accent rule; footer
- Pipeline architecture: TypeScript + Playwright chromium + Sharp; same CSS source for digital + print
- Output formats: `deck.html` (single-card-focus modal primary + horizontal-scroll secondary) + `print-6up.pdf` + `print-9up.pdf`
- IMAGE_VOCABULARY substrate (1,261 entries; all 11 platform locales)
- SOFT_HYPHENS substrate (29 entries from Arc 1; extends in Arc 2)
- Image-key alias table (resolves 72 cross-reference mismatches)
- THEME_PALETTE (~50 themes mapped to semantic colors)
- Image-resize Sharp preprocessing: 600px max-dim; PNG `palette: false`; cache-by-content-hash dedup

## 3. Phase plan

### Phase 1 — pre-generation substrate audit + extension (1 sub-commit)

**Pre-generation audit:**
- Audit SOFT_HYPHENS substrate coverage against full 1,512-image catalog. Identify long-word compounds (≥10 chars in de/sv/fi/no/da) lacking soft-hyphen entries.
- Audit image-key alias table against full image library; classify any new mismatches.
- Audit THEME_PALETTE against all 100 vocabulary theme directories; ensure default-fallback path doesn't dominate (every theme should have a semantic color, not all → muted gray).
- Performance characterization: extrapolate Sharp processing time + Playwright PDF render time at 16,632 scale; surface estimated wall-clock + memory budget.

**Substrate extensions (CC-adjudicated; surface only at significant gaps):**
- SOFT_HYPHENS extension covering audit-identified long-word compounds (target: ~80-150 entries × 3-4 long-word locales = 250-600 entries; vs Arc 1's 29 entries).
- Image-key alias table extension for new mismatches.
- THEME_PALETTE extension for under-covered themes.

**Phase 1 deliverables:**
- `docs/lesson-plans/flashcard-arc-2-substrate-audit.md` — audit findings + performance characterization
- `frontend/scripts/lib/flashcard-data.ts` — substrate extensions

**Surface gate:** at end of Phase 1, surface to operator if:
- Substrate-extension scope materially exceeds estimates (e.g., >1,000 soft-hyphen entries needed)
- Performance characterization reveals architectural concerns (e.g., 16,632 renders projected to take days, not hours)
- Image-key mismatches require operator-coordination filename renames at scale

If no significant gaps, Phase 1 closes adjudicator-forward and Phase 2 commences.

### Phase 2 — full-scale generation pipeline run (1-2 sub-commits)

**Pre-run preparation:**
- Verify Phase 1 substrate extensions in place
- Configure pipeline for full-scale run; add resume-from-failure capability if needed (16,632 renders is enough that mid-run failure recovery matters)
- Decision: storage destination — operator-side strategic call between (a) commit to git (~3.3GB at 200KB-per-deliverable; significant repo growth); (b) ship to Cloudflare-CDN-served storage on Hetzner per CLAUDE.md §A.1 (`/var/www/lcs-media/flashcards/` likely path); (c) hybrid (commit per-package thumbnails + serve full per-locale decks from CDN).

CC default-recommends **option (b) ship-to-Hetzner-CDN-served** for the full 16,632-render output. Repo grows by minimal Phase 2 deliverable (substrate extensions + integration code; ~5-10MB). Production assets live at CDN-served paths from Phase 2 onward.

**Generation run:**
- Run pipeline against full 1,512-image catalog × 11 locales
- Per-image-per-locale outputs: `deck.html` + `print-6up.pdf` + `print-9up.pdf` (3 deliverables × 16,632 = 49,896 files)
- Group output structure: per-locale subdirectory + per-package or per-image subdir
- Verification: spot-check 5% of output files; full SHA-manifest written to deliverable-dir for content-addressed reference

**CC-adjudicated grouping decisions:**
- Per-package deck.html (collects all flashcards for one teaching package's vocab keys × one locale) — primary surface for subscriber-side flashcard browsing
- Per-image standalone deck.html (single image, single locale, single card) — used for inline-embed contexts (topic destination pages? individual deck pages?) — operator-strategic decision needed at Phase 2 entry

**Phase 2 deliverables:**
- Pipeline configuration changes for full-scale run
- 16,632 generated renders shipped to Hetzner-CDN-served storage (or git, per operator option)
- SHA-manifest for content-addressed verification

### Phase 3 — 200-package integration (1-2 sub-commits)

**Integration architecture:**
- Each TeachingPackage row has `targetSlug` + per-locale availability via locale-variant files. Flashcards integrate by mapping `targetSlug` → vocab-keys-for-package → flashcard-deck-URL.
- Subscriber-side flashcard browse surface (Pillar 4 Arc 2 net-new): catalog browse UI showing per-package flashcard preview + click-through to per-package deck.html viewer.
- Lock icon on paywalled packages; "3 of 200 packages free" framing in browse-list UI.

**Free-tier 3-package allowlist (operator-strategic Phase 3 entry decision):**
- 3 packages get free access to their flashcards
- Default candidates (CC-recommended; operator may override): operator selects from existing 110 published master packages or future Arc 14+ packages
- Allowlist storage: small constant table OR Bundle-row metadata flag

**Subscription-gating implementation:**
- Use existing Lemon Squeezy integration (CLAUDE.md §A.6 — `lemonsqueezy-product-config.ts` (singular) defines $69/year SUBSCRIPTION_PRODUCT)
- Server-side access check on flashcard-deck route: free-tier-3-package OR active-subscription OR grace-period-active → render deck; otherwise → render paywall preview + subscribe CTA
- Free-tier flashcards visually identical to paid (per Plan-agent recommendation + operator ratification)
- Cloudflare CDN cache strategy: paywalled deck-URLs short-cache (5min) on access-check page; static deck.html files long-cache once access-resolved (cache-key one-per-deck-version per CLAUDE.md §4.4)

**Phase 3 deliverables:**
- `frontend/app/[locale]/flashcards/<package-slug>/page.tsx` — per-package flashcard browse + access-gated deck rendering
- `frontend/app/api/flashcards/access-check/route.ts` — subscription access-check endpoint
- `frontend/lib/flashcards/access-control.ts` — free-tier-3-package allowlist + subscription check
- `frontend/components/flashcards/<components>` — browse UI + paywall preview component
- Subscription-gating tests (unit + integration)

### Phase 4 — production ship (1 sub-commit)

**Pre-ship verification:**
- Validation against staging environment (or local production-like env)
- Cloudflare CDN cache verification on flashcard-deck routes
- Cross-browser testing (digital viewer on Chrome + Firefox + Safari + mobile Safari)
- Print verification: print PDFs render correctly via OS print dialog from deck.html (the OS-print path) AND from direct PDF download
- Subscription-flow integration test: free-user → paywall preview → subscribe → deck access; subscribed-user → deck access; lapsed-user → grace-period continue → grace-expired → paywall

**Production deploy:**
- Per CLAUDE.md §A.5 / §14.6 TWO-STEP deploy if applicable
- Cloudflare cache-purge if needed (per CLAUDE.md §15.8 — likely not load-bearing for new routes)

### Phase 5 — recon + Pillar 4 Arc 3 commission spec (1 sub-commit)

- `docs/lesson-plans/flashcard-arc-2-recon.md` — Arc 2 close-out
- `docs/lesson-plans/flashcard-arc-3-commission-spec.md` — Pillar 4 Arc 3 scope (likely candidates: subscriber-data-driven content refinement; per-image sentence frame if signal warrants resurfacing; bundle-flashcard linkage; advanced filtering / discovery surfaces; localization expansion if platform extends past 11 locales)

## 4. Adjudication delegations (CC handles without surfacing)

- Pre-Phase-1 audit run + interpretation
- Substrate extension scope (within stated estimates) at Phase 1
- Generation run mechanics + retry-on-failure logic at Phase 2
- Sharp + Playwright performance tuning if needed at Phase 2
- Per-package vs per-image deck.html grouping decisions (subject to Phase 2 entry surface)
- Subscription-gating implementation patterns at Phase 3
- Browse UI component design (within existing Tailwind + Next.js conventions)
- Test coverage scope at Phases 2 + 3
- Commit cadence within phases

## 5. Surface only at

- Phase 1 entry: surface if substrate-extension scope materially exceeds estimates
- Phase 1 close: surface audit findings + performance characterization for operator review
- Phase 2 entry: per-package vs per-image deck.html grouping; storage destination decision (commit-to-git vs Hetzner-CDN-served); verify operator commitment to ship 49,896 deliverables
- Phase 3 entry: free-tier 3-package allowlist selection
- Phase 3 close: subscription-gating verification before Phase 4 production ship
- Phase 4 production-ship gate
- Phase 5 commit (recon + Arc 3 spec)
- If anything contradicts Pillar 4 Arc 1 architectural locks
- If 200-package integration surfaces UI/UX scope expansion (e.g., subscriber-side flashcard search; advanced filtering; bulk operations) — these are Pillar 4 Arc 3+ candidates, not Arc 2

## 6. Verification

- Substrate audit findings documented at Phase 1
- 16,632 renders generated cleanly at Phase 2 (target: 100% success; mid-run failures recovered; SHA-manifest for content verification)
- 200 teaching packages integrated with flashcard browse surfaces at Phase 3
- Subscription-gating works correctly for free-tier-3 + paid-subscriber + grace-period + lapsed-subscriber paths
- Production deploy successful; Cloudflare CDN serving flashcard assets correctly
- All commits push to origin clean; pre-commit hooks pass
- TypeScript build clean; no type errors

## 7. Out of scope

- Mac Studio AI enrichment for flashcards (Pillar 4 Arc 3+ candidate if signal warrants)
- Subscriber-side flashcard search (Pillar 4 Arc 3+ candidate)
- Subscriber-side flashcard advanced filtering / bulk operations (Arc 3+)
- Bundle-flashcard linkage (Arc 3+ candidate)
- Per-image sentence-frame substrate (deferred indefinitely per Arc 1 close; never recommissioned unless operator explicitly resurfaces)
- Audio for digital flashcards (out of v1 per spec)
- BW-image flashcards (deferred; commission as separate Pillar 4 Arc N+ if operator-side deck-generation expands to BW themes)
- Tier 3+ locale variants (current 11 locales only)
- Mobile native apps (web-only per CLAUDE.md §11)
- App-side modifications per CLAUDE.md §3.2

## 8. Doctrine to load before starting Pillar 4 Arc 2

- §1 (premium-subscriber-feature framing under §1 SEO+embed-virality acquisition flywheel)
- §3.1 (existing codebase is production; treat with care)
- §4.4 (cacheability — same bytes for free + paid teachers; CDN cache key one-per-deck-version)
- §10 (Claude Code session conduct)
- §A.1 (image library + isolated storage at `/var/www/lcs-media/`)
- §A.4 (update helpers — never direct cp on immutable files)
- §A.5 + §14.6 (deployment TWO-STEP rule)
- §A.6 (Lemon Squeezy integration; subscription product config; webhook handler)
- §17 + §17.5.1 (locale coverage discipline)
- v3 SUBSCRIPTION-SCOPE.md §1 Condition 5 (free-tier surface)
- HOMEPAGE-SAVE-STATE.md ThemeStrip pattern (horizontal-scroll reuse)
- Pillar 4 Arc 1 commits `64c6e06d` → `da7887d2` (Sky+v2 + pipeline + validation batch substrate)
- `docs/lesson-plans/flashcard-arc-1-recon.md` (this commit's recon)

## 9. Authorization

Operator ratifies these locks at Pillar 4 Arc 1 Phase 5 (this commit) before Pillar 4 Arc 2 commences:

1. **Phase 1 substrate audit + extensions** — adjudicator-forward; surface only at material-gap-class findings.
2. **Phase 2 full-scale generation** — operator decides at Phase 2 entry: storage destination (commit-to-git vs Hetzner-CDN-served; CC recommends CDN-served) + per-package vs per-image deck grouping.
3. **Phase 3 free-tier 3-package allowlist** — operator selects 3 packages at Phase 3 entry.
4. **Phase 3 subscription-gating implementation** — adjudicator-forward within existing Lemon Squeezy + access-check patterns.
5. **Phase 4 production ship** — operator-coordination at TWO-STEP deploy gate.
6. **Concurrent-arc evaluation** — operator may commission Arc 14 lesson-plan + Pillar 2 Arc 3 + Stream A Arc 2 concurrently per Arc 12+13+P4-Arc-1 precedents OR sequentially.
7. **Surface posture:** standard. No [DOCS] fold; no CLAUDE.md amendments expected.
