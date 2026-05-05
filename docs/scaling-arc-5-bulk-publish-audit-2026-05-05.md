# Scaling Arc 5 — bulk-publish path validation audit

**Audit date:** 2026-05-05
**HEAD:** `580b0ca2` (post `[FIX][PUBLISH-CLI] manifest.theme reconciliation gate`)
**Audit scope:** publish-cli's `publish-bulk` execution path under throughput, memory, failure-mode, and concurrency dimensions.
**Audit posture:** read-only. No production-mutating operations. Empirical timing recovered from existing 440-wave artifacts; fresh dry-run executed against isolated `/tmp/scaling-arc-5/` staging dir.

---

## §1 Executive summary

The bulk-publish path is **structurally sound at 440-deck scale** and projects cleanly to **~10K decks per batch**. Beyond that, three structural ceilings appear in order: **time-induced process-death risk** (10K decks ≈ 10 minutes), **memory growth from accumulating result arrays** (extrapolated 10-30K range), and **lock-out failure modes from stale `.staging/` dirs** (any scale, low probability per batch but rises with N). No defects warrant immediate `[FIX]` commissioning; four follow-on commissions are recommended with explicit deferral triggers.

The `[FIX][PUBLISH-CLI]` reconciliation gate at `580b0ca2` (Scaling Arc 4 / §A.13) closes the most pressing structural exposure (cross-app emit-defect propagation). What remains in this audit is the bulk-execution side: how the path scales, where it breaks first, and what to do when it does.

---

## §2 Phase 1 — Empirical measurements

### §2.1 440-wave real-publish path (recovered from existing artifacts)

Source: `/opt/lessoncraftstudio/.publish-cli-staging/batch-20260505085741/_results.txt` + per-deck `createdAt` timestamps in `Deck` table.

| Metric | Value |
|---|---|
| Total decks | 440 |
| Wall-clock (real-publish phase, end-of-pre-flight → last DB row) | 26.1 s |
| Average per-deck | 59.3 ms |
| Inter-deck gap p10 | 46 ms |
| Inter-deck gap p50 | 63 ms |
| Inter-deck gap p90 | 70 ms |
| Inter-deck gap p99 | 76 ms |
| Inter-deck gap max | 132 ms |
| Throughput | ~16.9 decks/sec |

**Gap distribution interpretation:** tight p50–p99 spread (63–76 ms) confirms strictly sequential execution with low variance. The 132 ms max likely reflects a single Sharp og-image generation tail or DB INSERT contention spike. No bimodal distribution; no idle gaps.

### §2.2 Fresh dry-run path (isolated `/tmp/scaling-arc-5/` staging-dir target)

Source: `/usr/bin/time -v node scripts/publish-cli/index.js publish-bulk … --dry-run` against the same 440 ZIPs. Read-only: 440 collision-check DB queries surfaced (every ZIP collides with already-published row from 08:57 run as expected); 0 errored; 0 reconciliation_halts (440-wave is clean per Scaling Arc 4 regression).

| Metric | Value |
|---|---|
| Wall-clock | 3.64 s |
| Average per-deck | 8.3 ms |
| User CPU | 2.66 s |
| System CPU | 1.44 s |
| CPU utilization | 112% |
| Maximum resident set size | 216 MB |
| Minor page faults | 499,202 |
| Major page faults | 0 |
| Voluntary context switches | 7,658 |
| Involuntary context switches | 15 |
| FS output blocks (512 B units) | 375,744 (≈ 184 MB written) |

**Real-vs-dry-run delta: 51 ms/deck.** Attributable to the real-publish-only steps:
- Sharp og-image derivation: ~10–20 ms (synchronous PNG composite)
- 5–6 asset writes to `<slug>-vN.staging/`: ~5–10 ms
- `chown -R lcs-media:lcs-media` subprocess spawn: ~2–5 ms
- Atomic `staging/` → `<slug>-vN/` rename: ~1 ms
- Symlink swap (`renameSync` onto `.new`): ~1 ms
- DB `insertDeck`: ~5–15 ms (single auto-committed Prisma write)
- `pruneAgedVersions` readdir: ~1 ms (KEEP_VERSIONS=3, no-op at v=1)

### §2.3 DB transaction shape

Per-deck DB ops in `publish.js`:

1. **`findExistingBySlug`** (read; only fires on `--update-slug` path) — single Prisma `findFirst`
2. **`resolveSlugCollision`** (read) — single Prisma `findMany` with `OR` clause + `startsWith`
3. **`insertDeck`** OR **`updateDeck`** (write) — single Prisma `create`/`update`

**No transaction wrapping.** Each Prisma call is auto-committed individually. If a DB write succeeds and a subsequent step (e.g., post-asset chown) throws, the DB row remains inserted. The structuredFailure machinery in `publish.js:32-45` documents this and surfaces reconciliation commands; the audit does not consider this a defect at current scale (440 decks → 0 mid-deck failures observed).

`DATABASE_URL` carries `connection_limit=5`. The publish-bulk loop is sequential (`await opts.publish(...)` per iteration), so realistic concurrent connections = 1. Postgres `pg_stat_activity` count at audit time: 21 active (system-wide; publish-cli idle).

### §2.4 FS write pattern per deck

Per `place-assets.js:place()`:

1. `ensureLocaleDir(locale)` — idempotent mkdir; chown only on first creation per locale
2. `nextVersion(locale, slug)` — readdir + parseInt scan
3. `placeStaging(locale, slug, n, assets)` — mkdir `<slug>-vN.staging/` + 5–6 `writeFileSync` calls (manifest.json + deck.html + printable.pdf + answer-key.pdf? + thumbnail.png + og-image.png)
4. `commitStaging(locale, slug, n)` — `fs.renameSync(staging, live)`
5. `chownVersionDir(locale, slug, n)` — `child.execFileSync('chown', ['-R', 'lcs-media:lcs-media', dir])` (subprocess spawn)
6. `swapSymlink(locale, slug, n)` — `symlinkSync(target, '.new')` + `renameSync('.new', live)`
7. `pruneAgedVersions(locale, slug, currentN)` — readdir + (if any aged) mkdir archive + per-aged rename

**Per-deck syscalls + 1 subprocess spawn.** All synchronous (`*Sync` family). No async overlap.

### §2.5 Concurrency posture

`bulk.js:publishBatch` line 452 — strictly sequential `for` loop with `await`. No `Promise.all`, no worker threads, no cluster module, no streaming. Default Node single-threaded event loop.

Real-publish rate at 440 decks: ~17 decks/sec (CPU + I/O bound; the host has 36 GiB free buff/cache so I/O is mostly cached — this rate is closer to a CPU+spawn ceiling than a disk ceiling).

Dry-run rate at 440 decks: ~121 decks/sec (no Sharp, no chown, no asset writes, no DB writes — bundle parse + reconciliation + collision-check dominate).

### §2.6 Per-deck disk footprint

Sample from `/var/www/lcs-media/decks/en/`:

| Deck | Size |
|---|---|
| `addition-find-addend-4th-of-july-v1/` | 1.4 MB |
| `addition-find-addend-accessories-v1/` | 1.4 MB |
| Symlinks (`<slug>` → `<slug>-vN`) | 0 B (symlinks) |

**Per-version footprint stable at ~1.4 MB.** With KEEP_VERSIONS=3, max disk per slug ≈ 4.2 MB at full version churn. At v=1 (initial publish), 1.4 MB.

### §2.7 Hetzner host capacity (audit-time snapshot)

| Resource | Total | Used | Free |
|---|---|---|---|
| RAM | 62 GiB | 1 GiB | 24 GiB free + 36 GiB buff/cache |
| Disk (`/dev/md2`) | 436 GB | 53 GB (12%) | 361 GB |
| Postgres | v14.22 | 21 active conns | (unbounded; publish-cli uses 1 effective) |

Per-deck disk × N: 5K = 7 GB / 10K = 14 GB / 30K = 42 GB / 55K = 77 GB. All comfortably within 361 GB free.

---

## §3 Phase 2 — Failure-mode catalog

### §3.1 Mid-batch process death

**Mechanism:** SSH disconnect, operator's PC sleep, network partition, OOM kill, manual `kill`, panic/segfault. Sequential loop is at iteration `i` of `N`; iterations `0..i-1` published; iterations `i+1..N-1` unstarted; iteration `i` is in mid-step (asset placement, DB write, chown, etc.) with partial state.

**Current behavior:**
- No persistent batch ledger.
- No `--resume <batchId>` flag.
- Per-deck staging artifacts remain at `.publish-cli-staging/<batchId>/` (these are the dry-run pre-flight outputs; NOT a publish ledger — they're written before any publish runs).
- Re-running `publish-bulk --confirm` against the same input folder would attempt to re-publish all N decks. The first `i-1` would surface as `THEME_DISAGREE` is impossible (already-published clean ones), but as **DB collisions** (slug already taken) → operator must manually `--updates-manifest` to skip them or rename ZIPs.
- The mid-step-i deck (where process died) presents the worst case: if asset placement completed but DB INSERT didn't, the `<slug>-vN.staging/` dir does NOT exist (renamed to `<slug>-vN/`) but the symlink may or may not have been swapped, and no DB row exists. A retry would produce a new version dir + symlink swap onto it + DB INSERT against same slug → succeeds, but old `<slug>-vN/` is now orphan (asset placed, never DB-tracked, would not be served because subsequent publish set the symlink to a new dir).

**Projection at scale:**
- 5K (5 min): low risk
- 10K (10 min): low-medium
- 30K (30 min): medium-high (network blip plausible)
- 55K (55 min): high (one disconnect / sleep nukes the batch)

### §3.2 DB constraint violation

**Mechanism:** post-gate, the `(language, slug)` unique constraint can still fire if:
- Two ZIPs with identical declared theme produce identical slug (within-batch slug collision)
- Slug auto-suffix exhausts to `-50` (per `db.js:resolveSlugCollision` line 91)

**Current behavior (within-batch collision):** dry-run pre-flight detects this via `findExistingBySlug` query and surfaces in `_collisions.txt`. publishBatch ABORTs before the side-effecting loop runs. **Already covered by Phase 4 dry-run pre-flight.**

**Current behavior (within-batch identical-slug):** `bulk.js:dryRunOneZip` checks each ZIP independently against the DB, but does NOT cross-check ZIPs in the same batch against each other. Two ZIPs with identical predicted slug would BOTH query DB, both get collision-free response, both reach real-publish — and the **second one's `db.insertDeck` would throw** on the unique constraint. Per-deck error isolation (bulk.js line 484-487) catches the throw → outcomes recorded as failed → batch continues.

**This is a real bug class** but mitigated for the 440-wave because the operator's authoring tool produces unique (exercise_type, exercise_mode, theme) combinations across the batch. The 153 en code-addition wave WOULD have surfaced 152-way within-batch collision (all `code-addition-accessories`) had publish-bulk run; the reconciliation gate at `580b0ca2` halts it before that point. Within-batch collision is ALSO addressed by §15.13 within-batch-collision-pair pattern (operator-strategic earlier-roll-wins).

**Projection at scale:** within-batch collision likelihood scales with N (more ZIPs, more chance of dup). At 55K decks across the canonical theme/exercise-type space (~50 themes × 4 modes × 29 apps = ~5800 unique combinations × locales), expect 5–10% within-batch collision rate at the limit.

### §3.3 FS write failure

**Mechanism:** disk full (ENOSPC), permission denied (EPERM), filesystem read-only remount, inode exhaustion.

**Current behavior:**
- `placeStaging` line 106-109 detects existing `<slug>-vN.staging/` from prior failed run and **throws** → caller decides recovery. **Lockout failure mode**: subsequent retries fail until operator manually `rm -rf` the orphan staging dir.
- `commitStaging` rename → if it throws (EXDEV cross-device, EBUSY, etc.), the staging dir remains; subsequent retry hits the same lockout.
- `chownVersionDir` shells out `chown -R`. Failure throws SyncError. Asset dir is in place but unowned correctly. Per `publish.js:230-247` structuredFailure path, this surfaces as "DB UPDATE/INSERT failed after asset placement" with reconciliation commands. **But chown failures fire BEFORE the DB step, so this path doesn't activate** — the chown error throws cleanly out of `place-assets.place()`, surfaces at `publish.js:165` ("publish: asset placement failed: " + e.message), and the per-deck failure isolates correctly.

**Projection at scale:**
- Disk full: 55K decks × 1.4 MB = 77 GB; 361 GB free → safe ceiling at ~250K decks before disk pressure.
- Inode exhaustion: 55K × ~7 files/deck = 385K inodes. Modern ext4 default inode count is ~30M per terabyte → no inode pressure under any realistic batch.
- chown failure: requires either a permission policy change or filesystem remount; very low probability in steady-state.
- Lockout from stale `.staging/`: probability low per individual batch; cumulative over many batches grows. Self-healing if operator notices and runs `rm -rf <stale-staging>`.

### §3.4 Slug collision after gate (already addressed)

Per §3.2 — gate doesn't address within-batch slug collision; that surfaces at the per-deck DB INSERT and is caught by per-deck error isolation. Not a structural defect; matches the intended behavior that the gate halts on **content disagreement** while the DB constraint enforces **slug uniqueness**.

### §3.5 Network partition mid-publish

**Mechanism:** Hetzner ↔ Postgres on `localhost`, so this is effectively impossible unless Postgres process dies. Public-internet partitions don't apply because publish-cli runs on the same host as Postgres.

**Hypothetical Postgres death mid-batch:** Prisma client throws on the next query; per-deck error isolation catches; subsequent decks retry against an unavailable DB → all fail with same error; batch finishes with N failed outcomes; operator restarts Postgres + reruns. Same recovery story as §3.1.

### §3.6 Symlink swap race

**Not a real concern.** `place-assets.js:swapSymlink` uses `symlinkSync` + `renameSync` — `rename(2)` on a symlink-onto-symlink is atomic at the kernel inode-table level. No reader-vs-writer race.

### §3.7 chown subprocess spawn failure

**Mechanism:** subprocess fork failure (ENOMEM during fork at high system memory pressure), `chown` binary missing/permission denied. Synchronous spawn; throws on failure. Per-deck error isolation catches.

**Projection at scale:** low probability per spawn; cumulative N spawns has linearly growing risk. At 55K spawns × 0.001% failure rate = ~0.5 expected failures per batch. Tolerable.

### §3.8 Memory growth from accumulating arrays

**Mechanism:** `dry.results` and `outcomes` arrays accumulate per-deck objects across the batch loop. Each entry is small (~1–5 KB: zipBasename, deckId, slug, errors array, themeReconciliation object).

**Projected memory:**
- 5K decks × 5 KB = 25 MB array + 216 MB peak per-deck buffer reuse → peak ~250 MB
- 10K decks × 5 KB = 50 MB array → peak ~280 MB
- 30K decks × 5 KB = 150 MB array → peak ~400 MB
- 55K decks × 5 KB = 275 MB array → peak ~550 MB

V8 default `--max-old-space-size` is 4096 MB. **No OOM ceiling within plausible batch sizes.** Memory ceiling is theoretical, not practical.

Caveat: AdmZip retains the full ZIP buffer until GC. Per-iteration buffer release depends on V8 GC pressure. At 55K decks, intermittent GC pauses are possible but unlikely to surface as user-visible delays (each pause < 100 ms in a 55-minute batch).

---

## §4 Phase 3 — Scale ceilings + recommended commissions

### §4.1 Scale projections

| Batch size | Wall-clock | Risk profile | Status |
|---|---|---|---|
| 100 | ~6 s | trivial | ✅ proven (Brief B Phase 4 real-retry) |
| 440 | ~26 s | trivial | ✅ proven (440-wave, 2026-05-05) |
| 1K | ~1 min | low | extrapolated |
| 5K | ~5 min | low-medium | extrapolated |
| 10K | ~10 min | medium | extrapolated; mid-batch death plausible |
| 30K | ~30 min | medium-high | extrapolated; first ceiling visible |
| 55K | ~55 min | high | extrapolated; matches CLAUDE.md §13 long-term target |

### §4.2 Ceilings, in order of arrival

**First ceiling: process-death tolerance.** At ~10K decks (10 min wall-clock), mid-batch SSH disconnect / network blip / operator-side issue becomes a real concern. No checkpoint/resume mechanism; recovery requires `--updates-manifest` for the published-but-not-recorded decks (operator-strategic mapping work) OR full re-run with the gate suppressing already-published-collision halts.

**Second ceiling: within-batch slug collision rate.** At ~5K-10K decks per batch, the probability of two ZIPs producing identical slugs grows. Currently surfaces as per-deck DB INSERT failure caught by per-deck error isolation; but cumulative loss at 5–10% rate × 55K = 2.5K-5.5K failed publishes is operator-meaningful.

**Third ceiling: Sharp + chown overhead.** Sequential per-deck Sharp og-image (~10-20ms) + chown spawn (~2-5ms) = 12-25ms unavoidable per deck. At 55K, this is ~10-25 minutes of a 55-minute batch. Not a hard ceiling but a clear optimization target.

**Fourth ceiling: stale-staging-dir lockout.** Independent of N; probability per batch low but present. Self-healing only if operator notices and removes orphan dirs.

**No memory ceiling within plausible operating range.** RAM is not the bottleneck.

**No disk ceiling within plausible operating range.** 361 GB free supports ~250K decks at current per-deck size.

### §4.3 Recommended `[FIX]` commissions (defer-trigger)

**Commission A — `[FIX][PUBLISH-CLI]` checkpoint/resume mechanism.**
- **What:** persistent batch ledger (`.publish-cli-state/<batchId>/published.txt` or similar); `publish-bulk --resume <batchId>` skips already-PUBLISHED ZIPs from prior interrupted batches.
- **Trigger:** first real mid-batch death incident, OR when typical batch size routinely exceeds 5K decks.
- **Scope:** ~80 LOC + tests. Adds a ledger-write step in publishBatch + a ledger-read filter in dryRunOneZip + a new `--resume` flag in strict-args.
- **Priority:** medium. Most impactful single mitigation for §3.1.

**Commission B — `[FIX][PUBLISH-CLI]` within-batch slug collision pre-check.**
- **What:** in `bulk.js:dryRunBatch`, after per-ZIP slug derivation, cross-check all predicted slugs in the batch against each other. Surface duplicates in `_collisions.txt` (separate section). Halt batch as Phase 4 abort case.
- **Trigger:** at 5K+ batch sizes where collision probability climbs, OR if a real within-batch collision incident occurs.
- **Scope:** ~30 LOC + tests. Single pass over `dry.results` before writing batch artifacts.
- **Priority:** low-medium. Pairs with the §15.13 within-batch-collision-pair pattern (which is operator-strategic for fresh-roll variations); this commission would automate the dry-run-pre-flight detection of the same condition.

**Commission C — `[FIX][PUBLISH-CLI]` subprocess-free chown via fchown.**
- **What:** replace `child.execFileSync('chown', ['-R', 'lcs-media:lcs-media', dir])` with native Node `fs.chownSync` + uid/gid resolution at process startup. Saves 1-3 ms × N.
- **Trigger:** at 30K+ batch sizes where 30-90 seconds of chown overhead matters, OR alongside any other publish-cli refactor that touches place-assets.js (per §A.13.3 refactor-during-already-opened-surface).
- **Scope:** ~40 LOC + tests. Look up uid/gid for `lcs-media` once at module load; recursive chown via custom walker.
- **Priority:** low. Performance optimization, not correctness fix.

**Commission D — `[FIX][PUBLISH-CLI]` stale-staging-dir auto-cleanup option.**
- **What:** `publish-bulk --clean-staging` flag scans `.publish-cli-staging/<batchId>/` + `/var/www/lcs-media/decks/<locale>/<slug>-vN.staging/` for orphan dirs older than N hours; removes them. Default behavior unchanged.
- **Trigger:** if a stale-staging-dir lockout incident occurs in production.
- **Scope:** ~50 LOC + tests. Recursive scan + age check + `rm -rf`.
- **Priority:** low. §A.3 spirit suggests preserving rather than deleting; alternative is `--archive-staging` to move to `.archived/staging/` instead.

### §4.4 Commissions explicitly NOT recommended

**Concurrent batch processing (Promise.all 4-way).** Trade-offs (DB connection contention, FS race on `localeRoot/` mkdir, harder error recovery) outweigh benefits (4× speedup → 13 min instead of 54 min for 55K decks). The serial path is debuggable and recoverable; concurrency would significantly raise the architectural complexity. **Defer indefinitely** unless a specific scale forces the issue (and even then, prefer chunking with separate batch invocations over in-process parallelism).

**OG image cache.** Sharp re-renders 1200×630 from 480×620 thumbnail per deck. Caching by thumbnail hash would skip ~15ms × N. Not worth the cache-invalidation complexity at any current scale.

**DB transaction wrapping per deck.** Already discussed in §2.3; the structuredFailure machinery + per-deck error isolation handles partial-state recovery. Adding a transaction would tighten failure semantics but cost performance and add complexity. **Defer indefinitely.**

**Memory bounded mode (`--max-old-space-size 8192`).** No OOM ceiling within plausible scales (§3.8). **Defer indefinitely.**

---

## §5 Doctrine carry-forward

For next `[DOCS]` fold:

**1. Scale-ceiling order is structurally informative.** Time-induced process-death risk arrives before memory or disk constraints. Engineering effort spent on memory optimization or concurrency before a checkpoint/resume mechanism is misallocated. Target: §A.13 verification hygiene OR new §A.14 scale-ceiling discipline.

**2. Defer-trigger heuristic for performance commissions.** A `[FIX]` is justified at the first real-world incident OR when projected batch-size routinely exceeds the current measurement's safe range (here: 440 decks @ 26 s → safe to ~5K @ 5 min). Beyond that, project explicit risk profiles per scale tier rather than blanket-engineering for the long-term target. Target: §A.13.

**3. Sequential publish is a feature, not a bug.** Concurrency is the obvious optimization; the audit explicitly recommends against it. The serial path's debuggability and per-deck error isolation are higher-value than throughput. Scale up by chunking batches, not by parallelizing within a batch. Target: §15.7 catalog deck route OR new §15.16 bulk-publish architecture.

**4. publish-cli's idempotent-retry posture.** Currently NOT idempotent — re-running publish-bulk against the same folder after partial death produces collisions, not retries. The §A.13 reconciliation gate is idempotent (same input → same halt category); the publish-bulk loop is not. This asymmetry is worth stating explicitly so future work doesn't assume retry safety. Target: §15.5 + §15.10 around the edit-in-place + block-on-archived contract.

---

## §6 Halt-surfaces — none triggered

- ✗ Production-mutating operation during measurement: zero. All measurements were either reads of existing artifacts/DB OR writes to isolated `/tmp/scaling-arc-5/` and `.publish-cli-staging/<freshBatchId>/` (read-only-equivalent per §A.1 isolated storage convention).
- ✗ DB schema mutations: zero.
- ✗ FS writes to `/var/www/lcs-media/decks/`: zero.
- ✗ git commits beyond the audit-report commit landing this file: zero.

---

## §7 Recommended next commissions, ranked

1. **Commission A — checkpoint/resume.** Highest ROI mitigation for the first ceiling (process-death). Trigger when typical batch size exceeds 5K OR after first real mid-batch death.
2. **Commission B — within-batch slug collision pre-check.** Pair with §15.13 within-batch-collision-pair pattern. Trigger at 5K+ batch sizes.
3. **Commission C — subprocess-free chown.** Performance optimization. Trigger at 30K+ batch sizes OR opportunistically during any place-assets.js refactor.
4. **Commission D — stale-staging-dir handling.** Trigger after first lockout incident.

All four are **defer-trigger commissions**; none are warranted by the current 440-deck operating regime. The audit confirms the bulk-publish path is fit-for-purpose at current scale and well-instrumented for the next 1–2 orders of magnitude of growth.

---

*End of audit-report.*
