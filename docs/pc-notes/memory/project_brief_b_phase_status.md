---
name: Brief B (publish-cli catalog-publish pipeline) — phase progression
description: Sealed-phase ledger for Brief B. Records each phase's seal commit, key decisions, deck production state, and the next-phase boundary. Read when picking up Brief B work mid-session or when the operator references a specific phase.
type: project
originSessionId: 49f6c8a1-da8b-48bf-a994-4276c01c705a
---
**Reading rule:** Authoritative source for "what's done" in Brief B. When the operator authorizes a new Phase, anchor decisions to what's already sealed here.

**Writing rule:** When a Phase seals, append a new section with: (a) phase number + scope summary, (b) sealing commit SHA(s), (c) production state delta (decks, DB rows, FS surfaces), (d) deferred-queue items spawned, (e) next-phase boundary.

---

## Phase 1 — Schema + nginx (sealed `4b91adc0`)

- Prisma `Deck` table created with compound `@@unique([language, slug])` constraint, nullable `contentFamilyId` per §17.8.7.
- nginx location-block `^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/(.+?)/$` deployed to serve static deck.html from `/var/www/lcs-media/decks/<locale>/<slug>/`.
- Production state delta: 0 published decks (table created, no rows yet).
- Deferred-queue: prisma-migration-history-drift family (`20251122011743_add_language_to_blog_pdfs` DB-recorded but folder-missing — surfaced during migration deploy reconciliation).

## Phase 2 — Substitution layer + slug generator + i18n + dry-run (sealed `59a0cde9`)

- Sealed across `3a85111d` (foundation) → `f75e8d1e` (§16 commit) → `86a3b9be` (Drift D3 fix) → `59a0cde9` (Drift D4 fix renaming `picture-sudoku` → `sudoku` in topics-taxonomy.json).
- Substitution placeholders: 13 total per §17.8.5 (`__CANONICAL_URL__`, `__EDUCATIONAL_LEVEL__`, `__EDUCATIONAL_LEVEL_LOCALIZED__`, 4× `__LINK_*__` URLs + 4× `__LINK_TEXT_*__` localized texts, `__END_DECK_HEADING__`, `<!-- HREFLANG_INSERTION_POINT -->`).
- Slug generator: §17.8.5 ASCII-fold (NFD normalize + non-decomposable map ä→a, ß→ss, etc.); collision-suffix appending `-N` per `(language, slug)` uniqueness.
- i18n strings: 110 strings across 11 locales × 10 keys (5× `seo.educational_level.*` + 5× `endDeck.*`). Tier 4 NSR-flagged for sv/fi/no/da per Q3 NSR posture.
- Production state delta: 0 published decks (dry-run only at this phase).
- Deferred-queue: Romance-apostrophe slug treatment (slug-related family) for Tier 4 launch consideration.

## Phase 3 — Asset placement + OG image + symlink + DB write + edit-in-place (sealed `7d59d3bd` + `9bed3bd4`)

- `7d59d3bd` — main Phase 3 v4 source (publish.js, place-assets.js, og-image.js, db.js, extract-html-meta.js, README, single-publish CLI surface).
- `9bed3bd4` — `extract-html-meta.js` switched cheerio → node-html-parser (Hetzner Node 18.20.8 vs. cheerio's transitive undici@7 requiring Node ≥20.18.1).
- Architecture: Hetzner-side execution (publish-cli runs from `/opt/lessoncraftstudio/scripts/publish-cli/`); Postgres bound 127.0.0.1; OG image via Sharp ^0.34.5 (1200×630 white-bg composite of existing 480×620 thumbnail.png at top:5, left:360); atomic symlink swap via `fs.symlinkSync(target, link.new)` + `fs.renameSync(link.new, link)` per amendment A1 (NOT `ln -sfn` which is unlink+symlink — non-atomic); archive-folder `mv` for prunes (NOT `rm`) per §A.3 spirit + amendment A3; `chown lcs-media:lcs-media` on version dirs per amendment A4.
- Edit-in-place: `--update-slug` is the SOLE flag (`--update-deck-id` v3-review nit dropped at pre-Phase-4 hygiene since Phase 1 schema lacks `deck_id` column).
- Production state delta: 4 published decks via single-publish (addition-image-image × en+de, sudoku × en+de) + addition-image-image en bumped to v3 via `--update-slug` smoke.
- Deferred-queue: Hetzner Node 18 past EOL (runtime-hygiene family); methodology entry `feedback_brief_review_against_explicit_rules.md` extended to 4 instances at the `9bed3bd4` cheerio crash.

### Pre-Phase-4 hygiene (sealed `9a30f049`)

- Dropped `--update-deck-id` flag from `index.js`/`db.js`/`publish.js`/`README.md` (Phase 1 schema lacks deck_id column).
- `place-assets.js` `ensureLocaleDir` helper for `lcs-media:lcs-media` ownership on per-locale dirs at first-publish time.
- One-time chown via plink on existing `/var/www/lcs-media/decks/{en,de}/` to fix Phase 3's root-owned creation.
- Filed Hetzner Node 18 deferred-queue entry; methodology entry extended with the cheerio fix-up as 4th instance.

### Phase 3 cleanup turn

- Unintended `addition-image-image-2/v1` deck (created during pre-Phase-4 hygiene verification when `publish foo.zip --update-deck-id bar` silently fell through to new-publish path due to permissive arg parser) cleaned in 3 steps: rm symlink → mv versioned dir to archive → DB DELETE. Production state confirmed 4 decks intact.
- Filed safety-gap finding (5th instance in `feedback_brief_review_against_explicit_rules.md`) + new item 20 in CLAUDE-MD-UPDATES.md (publish-cli strict-arg-parsing contract + paired implementation).

## Phase 4 — Bulk-publish + bulk dry-run + strict-arg parser (sealed `772a3375` + verification retry)

- `772a3375` — main Phase 4 source (`bulk.js` orchestration, `strict-args.js` schema-driven parser with Levenshtein closest-match suggestion, `updates-manifest.js` JSON parser+validator, `index.js` SCHEMAS dispatch, README).
- Strict-arg parser: folded into Phase 4 per Q1 lock; replaces prior permissive parser. Unknown flags now error with structured stderr + closest-known-flag suggestion before any side-effect (validates safety-gap item 20).
- `--confirm` always required for real bulk-publish (Q2 lock); `--updates-manifest` is JSON `{filename: existing-slug}` validated at parse with key=ZIP-exists + value=DB-row-exists checks (Q3 lock).
- Pre-flight runs internally: dry-run pipeline executes first; collisions or errors abort before any DB/FS side-effect. Per-deck error isolation: failed ZIP doesn't abort batch.
- Sequential execution (parallel deferred to v2 if 200+ ZIPs/day proves slow).
- **First 8-ZIP real-mode attempt aborted cleanly** at pre-flight: 4 fresh ZIPs (bingo de, crossword en, pattern-train en, word-scramble de) hit `topics-taxonomy.json` coverage gap (only 4 of 29 apps registered). Production state confirmed unchanged. Filed `taxonomy-coverage` deferred-queue entry; preserved aborted ZIPs at Hetzner `/opt/lessoncraftstudio/publish-inbound/.deferred-pending-taxonomy/`.
- **Verification retry PASS**: substituted cryptogram + picture-path × en+de (already taxonomy-registered) for the failed batch. Real bulk-publish on resolved 8-ZIP batch:
  - 4 UPDATE-routed via `--updates-manifest`: addition-image-image × en (v3→v4) + de (v1→v2); sudoku × en (v1→v2) + de (v1→v2). Existing IDs preserved.
  - 4 INSERT-routed: cryptogram × en+de v1; picture-path × en+de v1. New IDs assigned.
  - 8/8 PUBLISHED, 0 failed, exit 0.
  - KEEP_VERSIONS=3 pruning verified: en/addition-image-image v1 archived to `.archived/en/addition-image-image-pruned-20260429155213/`. Other UPDATEs had ≤3 versions so nothing pruned.
  - Symlinks atomically swapped to latest version dirs; `lcs-media:lcs-media` ownership preserved.
- **Production state delta (Phase 4 close-out, operator browser-inspected)**: 8 decks total in production, all confirmed clean.

  | Deck | Version | DB Row ID |
  |---|---|---|
  | en/addition-image-image | **v4** | cmojv4qew0000gxwofgmuudas |
  | de/addition-image-image | **v2** | cmojv5svm0000gx3lh614z8sn |
  | en/sudoku | **v2** | cmojv5t5n0000gx4h2o6kosuz |
  | de/sudoku | **v2** | cmojv5teq0000gx5dnt78jy66 |
  | en/cryptogram | v1 | cmok8gv390001gxvtsipmiyvc |
  | de/cryptogram | v1 | cmok8gv210000gxvtj8wfz476 |
  | en/picture-path | v1 | cmok8gv7a0003gxvt7vwr241w |
  | de/picture-path | v1 | cmok8gv5b0002gxvt385ael8p |

- Deferred-queue this phase: `taxonomy-coverage` family (4 of 29 apps registered; 25 missing — bingo/crossword/pattern-train/word-scramble ZIPs preserved for regenerate-after-taxonomy-expansion).
- Methodology this phase: `feedback_brief_review_against_explicit_rules.md` extended to 5 instances at addition-image-image-2 cleanup (pre-Phase-4 hygiene).
- CLAUDE-MD-UPDATES.md item 20 queued for Phase 6: publish-cli strict-arg-parsing contract documentation.

## Phase 5 — Coverage gate + failure-mode coverage + unpublish (sealed across 5.1–5.8 on 2026-04-29)

Sealed across 8 sub-phases. v2 brief Q1–Q6 locks: Q1 single-deck-only unpublish (no bulk-unpublish; deferred to future brief); Q2 block-on-archived UPDATE with `status='archived'` enum value (Phase 1 schema's existing enum); Q3 KEEP_VERSIONS=3 cap forever (no per-app param; archive-folder cleanup-cron deferred to trigger); Q4 passive curl observability (no Cloudflare purge-API integration); Q5 UPDATE-only 8-ZIP at first verification batch; Q6 synthetic broken ZIP for failure-mode coverage.

**Sub-phase ledger:**

| Sub-phase | Scope | Commits | Outcome |
|---|---|---|---|
| 5.1 | Coverage gate (republish on 8 published decks; KEEP_VERSIONS=3 verified) | verification only | 8/8 PUBLISHED via UPDATE; en/addition-image-image v6→v7 (KEEP_VERSIONS=3 pruning at v4 archived); other 7 decks bumped 1 version each |
| 5.2 | Slug collision in practice (INSERT-route on a slug taken by an existing published row) | verification only | Pre-flight ABORTed cleanly with `_collisions.txt` showing predicted-slug-collision message + recommendation; production state unchanged |
| 5.3 | Update-then-update beyond v3 (sudoku-en repeatedly bumped) | verification only | en/sudoku v2→v3; KEEP_VERSIONS=3 pruning continued correctly under repeated edit-in-place |
| 5.4 + 5.5 | Unpublish handler implementation + republish-after-unpublish block verification | impl: `0ad626cb` (publish.js + place-assets.js + db.js + bulk.js + index.js + README extensions); verification only at 5.5 | en/picture-path unpublished cleanly (FS atomic archive + DB status='archived'); BOTH republish paths blocked correctly (INSERT-route via differentiated `_collisions.txt` archived-status message; UPDATE-route via publish.js `existingRow.status !== 'published'` rejection); zero side-effects on archived row |
| 5.6 | Bulk corrupt ZIP (per-deck error isolation in real-mode bulk) | verification only | 3-ZIP batch (cryptogram-de A → PUBLISHED; sudoku-en-broken B → FAILED with thumbnail.png missing; cryptogram-en C → PUBLISHED); per-deck atomicity confirmed; en/sudoku DB row unchanged at v3 (broken ZIP did NOT bump version); structured `_failures/<zip>.stderr` populated correctly |
| 5.7 | Dry-run-vs-real-publish parity (semantic equivalence) | verification only | Per-deck staging artifacts (`manifest.json`, `deck.html`, `deck.html.diff`, `substitution-report.{json,txt}`, `warnings.txt`) byte-identical between dry-run and real-mode batches via `diff -r`; `_collisions.txt` and `_errors.txt` byte-identical; `_summary.txt` diverges by design (dry-run = routing+collisions; real-mode = post-publish outcomes+versions); `_results.txt` and `_failures/` are real-mode-only by design |
| 5.8 | CDN cache invalidation observability (passive curl per Q4 lock) | verification only | Origin `Cache-Control: public, max-age=300` honored at every checkpoint (pre-publish + t=0/60/180/300/360); ETag + Last-Modified advanced once at publish-time and stayed stable; new content served immediately (no edge-cache propagation lag because no edge in path); en/picture-path archived state confirmed 404 ~30 min post-unpublish; no Cloudflare API endpoints invoked |

**Production state at Phase 5 seal (8 decks, 7 published + 1 archived):**

| Deck | Version | Status | DB Row ID |
|---|---|---|---|
| en/addition-image-image | v7 | published | cmojv4qew0000gxwofgmuudas |
| de/addition-image-image | v3 | published | cmojv5svm0000gx3lh614z8sn |
| en/cryptogram | **v4** | published | cmok8gv390001gxvtsipmiyvc |
| de/cryptogram | v3 | published | cmok8gv210000gxvtj8wfz476 |
| en/picture-path | v2 | **archived** | cmok8gv7a0003gxvt7vwr241w |
| de/picture-path | v3 | published | cmok8gv5b0002gxvt385ael8p |
| en/sudoku | v3 | published | cmojv5t5n0000gx4h2o6kosuz |
| de/sudoku | v4 | published | cmojv5teq0000gx5dnt78jy66 |

**Q1–Q6 v2 brief decisions answered by Phase 5 verification (and locked in implementation):**
- Q1: single-deck-only unpublish — `index.js` exposes `unpublish <slug> --language X --confirm` subcommand only; no bulk-unpublish-manifest path. Deferred to future brief.
- Q2: block-on-archived UPDATE — implemented at `publish.js` (after `findExistingBySlug`, before any side-effect): `if (existingRow.status !== 'published') throw ...`. Both INSERT (via `_collisions.txt` differentiation) and UPDATE (via publish.js block) paths reject correctly.
- Q3: KEEP_VERSIONS=3 cap forever — no per-app param exposed; `place-assets.js` constant. Archive-folder cleanup-cron deferred (filed in deferred queue under archive-cleanup family).
- Q4: passive-curl observability — no Cloudflare purge-API integration in `scripts/publish-cli/`. 5.8 verified at origin layer; CDN edge layer absent (DNS-only mode surfaced as separate operator-action-required item — see deferred queue).
- Q5: UPDATE-only 8-ZIP first verification batch — Phase 4 retry was 4 UPDATE + 4 INSERT (mixed); Phase 5 inherited the 8 decks for republish-only coverage gate at 5.1.
- Q6: synthetic broken ZIP — 5.6 used AdmZip to construct sudoku-en-broken.zip with thumbnail.png removed (PASSES pre-flight; FAILS at real-mode publish.js:140).

**Deferred-queue items spawned during Phase 5:**
- archive-cleanup family: `.archived/` growth-bound cleanup-cron deferred (trigger: >1 GB or 100+ decks).
- runtime-hygiene family — nginx www-canonicalization 301 redirect (filed at 5.5 close-out).
- publish-cli-feature family — dry-run preview of predicted version bumps (filed at 5.7 close-out as Divergence #1; accepted as v1 architectural property).
- runtime-hygiene family — Cloudflare proxy-mode investigation OPERATOR-ACTION-REQUIRED pre-launch (filed at 5.8 close-out; not bundled with Phase 6 documentation).

**Methodology entries extended during Phase 5:** none. The 5.4+5.5 implementation followed the established Phase 3 v4 failure-mode UX pattern; all 5.x verifications were ship-only-what's-verified clean with no surprises.

## Phase 6 — In progress (drafting 2026-04-30)

**Pre-state at drafting:**
- Cloudflare onboarding RESOLVED-BY-ACTION 2026-04-30 (deferred-queue entry struck through; 28 → 27 active dormant entries; 0 OPERATOR-ACTION-REQUIRED-PRE-LAUNCH).
- CLAUDE-MD-UPDATES.md re-queue authorized: 8 items (5 mandatory + 3 optional all bundled) + 11 §15.x carry-forward = 19 pending items across 2 anticipated commits.
- Section F decisions resolved: §15.3 stays AI service (E.1); §A home for nginx 301 mechanism with §15.7 cross-ref (E.2); all 3 optionals bundled into Commit 1 (E.3); `feedback_prisma_migrations_through_deploy.md` deferred until Drift Y closes (E.4); 5 separate methodology files per `feedback_*` precedent (E.5).

**Anticipated commit split:**

- **Commit 1 — §15.x publish-flow expansion + §3.5 infrastructure correction.** Items 1–8 (5 mandatory + 3 optional) + items 9–19 (11 §15.x carry-forward). Single coherent diff per `b03ff5c9` precedent of "many items, one commit when coherent." New subsections take §15.4–§15.14; existing §15.3 (AI service contract) stays unchanged.
- **Commit 2 — §8.1/§14.10/§10 corrections + 5 methodology MEMORY entries authored + queue close-out.** §8.1 D1 (`contentFamilyId`) + D2 (`@@unique([language, slug])`); §14.10 D4 (canonical-name-vs-emission contract); §10 git-tracked-vs-out-of-tree clarification; cross-reference §17.5 NSR posture to 57-key two-population framing; §11 queued-post-Brief-B sub-paragraph (catalog-page-share revival; topic-destination pages; eleven-deck dry-run; **NEW: taxonomy expansion brief**; Group C; longer-arc items); 5 methodology entries authored as filesystem MEMORY files (out-of-tree).

**Drafting timeline:** brief surfaced for review 2026-04-30 (this session); operator review then explicit authorization to apply commits; MEMORY refresh executed 2026-04-30 (out-of-tree, no commit); commits land sequentially with diff surfaced before each landing per `0c3e8ffe` / `b03ff5c9` / `388dd7d6` / `86a3b9be` cadence.

**Documentation-only.** No code changes; no production state mutation.

## Resolved at Phase 6 entry

- Cloudflare proxy-mode investigation: RESOLVED 2026-04-30 (Commit 1 item 8 lands the §3.5 correction).
- nginx 301 documentation: BUNDLED into Commit 1 (item 7 authorized; lands at §A per E.2).
- Final queue count: 19 items (5 mandatory + 3 optional + 11 carry-forward).
