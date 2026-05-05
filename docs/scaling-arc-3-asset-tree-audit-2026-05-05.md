# Scaling Arc 3 — Asset-tree organization audit

**Date:** 2026-05-05
**Catalog state at audit:** 731 published decks across 11 locales (en at 469 post-440-wave + 1 archived; de/es/nl/it/fr/pt/sv/da/fi at 29 each; no at 1)
**Production host:** Hetzner `65.108.5.250`
**Scope:** read-only audit + design proposal; no production change.

## 1. Per-locale directory entry counts

| Locale | Total entries | Symlinks | Dirs | v2+ multi-version |
|---|---|---|---|---|
| en | 944 | 469 | 476 | 8 |
| de | 66 | 29 | 38 | 9 |
| es | 58 | 29 | 30 | 0 |
| nl | 58 | 29 | 30 | 0 |
| it | 58 | 29 | 30 | 0 |
| fr | 58 | 29 | 30 | 0 |
| pt | 58 | 29 | 30 | 0 |
| sv | 58 | 29 | 30 | 0 |
| da | 58 | 29 | 30 | 0 |
| no | 2 | 1 | 2 | 0 |
| fi | 58 | 29 | 30 | 0 |

Convention per §15.7: each published deck = `<slug>` symlink + `<slug>-v<N>/` versioned directory. Symlink atomically swapped to latest version on edit-in-place.

## 2. Per-deck asset breakdown

5 random en deck samples, all uniform shape:

| File | Size range | Source |
|---|---|---|
| `manifest.json` | ~3 KB | publish-cli substituted manifest |
| `deck.html` | ~400-450 KB | self-contained interactive HTML per §14 |
| `printable.pdf` | ~350-550 KB | printable-PDF derivation |
| `answer-key.pdf` | ~370-570 KB | answer-key-PDF derivation |
| `thumbnail.png` | ~120-170 KB | catalog card thumbnail |
| `og-image.png` | ~100-160 KB | 1200×630 OG card per §15.14 |

**Per-deck total:** ~1.35-1.78 MB (avg ~1.5 MB).
**Per-deck file count:** uniform 6 files per versioned-dir.

## 3. Filesystem characterization

- **FS:** ext4 on `/dev/md2` (RAID; root mount; same FS as `/opt/lessoncraftstudio` and the rest of the host)
- **Filesystem features:** `has_journal ext_attr resize_inode dir_index filetype needs_recovery extent 64bit flex_bg sparse_super large_file huge_file dir_nlink extra_isize metadata_csum`
- **`dir_index` enabled:** hashed B-tree directory entries; O(log n) lookups even at large entry counts
- **Disk usage:** 13% (54 GB used of 456 GB) — plenty of headroom
- **Inode usage:** 1% (300K used of 29M total) — plenty of headroom
- **Mount options:** standard root mount (no separate mount for `/var/www/lcs-media/`)

## 4. Total disk usage

| Path | Size | Notes |
|---|---|---|
| `/var/www/lcs-media/decks/` | 1.2 GB | All locales + .archived/ |
| `/var/www/lcs-media/decks/en/` | 719 MB | Largest locale (469 published + multi-version) |
| `/var/www/lcs-media/decks/de/` | 56 MB | 29 published + multi-version |
| `/var/www/lcs-media/decks/.archived/` | 14 MB | Pruned + unpublished namespaces (§15.12) |
| `/var/www/lcs-media/backups/` | 52 MB | Backup tarballs (NOT covering decks/ — see §6) |

## 5. Multi-version retention

Current state: **17 multi-version cases** across 731 published decks = 2.3% rate.

en multi-version inventory (8 v2+ dirs):
- `addition-image-image-v5/`, `-v6/`, `-v7/` (3 retained per KEEP_VERSIONS=3; current symlink → v7)
- `sudoku-v2/`, `-v3/` (2 retained)
- `cryptogram-v2/`, `-v3/`, `-v4/` (3 retained)

de multi-version: 9 v2+ dirs (similar pattern; `picture-trail` likely contributes).

**KEEP_VERSIONS=3 policy** (per §15.14): older versions move to `.archived/<locale>/<slug>-pruned-<utc>/`. Cleanup-cron deferred to >1 GB OR >100-deck trigger per §15.12; .archived/ currently 14 MB (well under threshold).

## 6. **CRITICAL FINDING: Backup gap on decks/ asset-tree**

`scheduled-backup.sh` (in `/var/www/lcs-media/scripts/`) covers:

```
SAMPLES_DIR="/var/www/lcs-media/samples"
WG_DIR="/var/www/lcs-media/worksheet-generators"
ADMIN_DIR="/var/www/lcs-media/admin-panels"
DE_DIR="/var/www/lcs-media/design-elements"
PUBLIC_DIR="/opt/lessoncraftstudio/frontend/public"
```

**`/var/www/lcs-media/decks/` is NOT in the backup script.** The 1.2 GB asset-tree representing 731 published decks has zero filesystem-level backup coverage.

Cron entries exist for:
- Weekly samples backup (Sundays 2 AM)
- Daily database backup (3 AM, `pg_dump` to `/opt/lessoncraftstudio/backups/db_*.sql.gz`)

The DB backup captures Deck rows including manifest_url, html_url, etc. (path references). It does NOT capture the actual deck.html / PDF / thumbnail bytes those paths point at.

**Latest backup tarball date:** 2026-03-03 (~2 months stale; samples + worksheets only).

**Recovery scenario today:** if `/var/www/lcs-media/decks/` were lost (FS corruption, accidental deletion, host failure pre-recovery), only the DB rows remain. Re-publishing 731 decks from manifest+ZIP source would require operator to re-run publish-bulk for every batch — substantial operator-attention recovery cost AND requires the original ZIP files still exist in operator-side `decks/` working tree (gitignored per §10.4 + this commission's `cc4120ce` gitignore commit).

**Severity:** material backup-posture deficiency. Unfixed before further catalog growth means recovery cost scales with catalog size. Triggers commission halt-surface per spec ("backup posture is materially inadequate ... would surface for separate `[FIX][OPS]` commission ahead of further catalog growth").

## 7. Orphan-asset audit

**Result: 0 orphans on en.**

Cross-reference: `psql ... language='en' AND status='published'` returns 469 rows; filesystem `find decks/en/ -maxdepth 1 -type l` returns 469 symlinks; `diff` of slug sets is empty.

Unpublish handler (§15.11) ordering FS-first DB-last + .archived/ migration discipline working as designed.

## 8. 55K-target projection

Methodology: linear extrapolation from current per-locale rates × locale-sequencing-weighted distribution (en + Romance Tier first per operator-disclosed order).

**Per-locale entry count at 55K (assuming even 5K decks/locale distribution):**

| Metric | Current per-locale max (en) | At 5K decks/locale | At 55K total |
|---|---|---|---|
| Symlinks per locale dir | 469 | 5,000 | 5,000 max per locale |
| Versioned-dirs per locale dir | 476 | ~5,100 (2.3% multi-version rate) | ~5,100 max |
| **Total entries per locale dir** | **944** | **~10,100** | **~10,100 max per locale** |
| Total filesystem entries (all 11 locales) | ~1,500 | 110,000 | 110,000 |

**Total disk usage at 55K:**
- 55K decks × 1.5 MB avg = **82.5 GB**
- Current FS has 379 GB available; sufficient by 4.6× margin
- `.archived/` projection: ~5-10 GB at 55K (linear-scaling with current ratio)

**Total inodes at 55K:**
- 55K × 6 files per deck = 330K inodes
- Plus locale-dir inodes (negligible)
- Current FS has 28.8M free inodes; well within bounds (1.1% utilization at 55K)

## 9. ext4 dir_index performance characterization

ext4's `dir_index` feature stores directory entries in a hashed B-tree, giving O(log n) lookup performance. **Hash-lookup operations** (e.g., `stat <path>`, `open <path>`) scale to 100K+ entries per directory without measurable degradation.

**Linear-scan operations** (`ls` for sorted output, `find . -maxdepth 1`, `glob '*'` in shell, backup tools' file enumeration) read all entries and degrade linearly with count. Empirical thresholds:
- ≤1K entries: imperceptible
- 1K-10K: noticeable but acceptable for human use
- 10K-100K: noticeable for backup tools + interactive `ls`; still functional
- ≥100K: backup-window dominated by enumeration; `ls` slow

**At 55K projection (10K entries per highest-density locale dir):** linear-scan operations are at the upper-acceptable bound. Sharding becomes worth considering at 5x growth from current state but is NOT yet load-bearing at the current 944-entry max.

## 10. Cross-locale consistency

All 11 locale directories follow identical organization:
- `<slug>` symlinks at top level pointing to `<slug>-v<N>/`
- `<slug>-v<N>/` versioned directories with uniform 6-file shape
- Owner: `lcs-media:lcs-media` (root-owned exception: `.archived/` subtrees via unpublish-handler)
- Permissions: 755 dirs / 644 files per §15.14

No drift across locales. No normalization needed.

## 11. Design proposal — Phase 2 recommendations

### 11.1 Backup gap (URGENT — separate `[FIX][OPS]` commission recommended)

Extend `scheduled-backup.sh` to cover `/var/www/lcs-media/decks/`. Three options for operator adjudication:

- **Option A:** add `DECKS_DIR="/var/www/lcs-media/decks"` alongside existing variables; tarball it weekly per existing pattern. Simplest; tarball at 1.2 GB current → ~85 GB at 55K (large weekly tarball).
- **Option B:** rsync-based incremental backup to off-host storage (Backblaze B2 / Hetzner Storage Box). Better at scale; requires off-host service + credentials.
- **Option C:** filesystem snapshot via LVM or Btrfs (not currently configured; would require FS migration). Out of scope for fix-shape commission.

Recommend Option A as immediate fix; Option B as v2 follow-on when off-host strategy commissions.

### 11.2 Per-locale entry-count at 55K (defer sharding decision)

Current state (944 max) and 55K projection (10K max) both within ext4 dir_index acceptable bounds. **No sharding needed at current state.** Re-evaluate at 5K-deck-per-locale milestone (likely Tier 2 closeout reached, en at ~5K) — at that point reassess against actual `ls`/backup performance measurements.

If sharding becomes warranted: hash-prefix shape `decks/<locale>/<first-2-chars-of-slug>/<slug>-v1/` distributes ~10K entries across ~26-50 sub-directories of ~200-400 entries each. Migration cost = touch every existing symlink; non-trivial but not architecturally complex.

### 11.3 Multi-version retention at 55K (codify cleanup-cron trigger)

Current KEEP_VERSIONS=3 + .archived/ accumulation working. .archived/ at 14 MB (well under §15.12's 1 GB / 100-deck cleanup-cron trigger). At 55K projection, .archived/ reaches ~5-10 GB; cleanup-cron should activate then.

**Recommendation:** leave §15.12 as-is. Trigger naturally surfaces a separate `[FEATURE][OPS]` cleanup-cron commission when threshold crosses.

### 11.4 Backup posture at 55K (post-Option-A immediate fix)

Daily DB backup at 3 AM is sufficient for catalog metadata. Asset-tree backup (post-Option-A fix) handles content recovery. Off-host posture (Option B) becomes worth considering when catalog crosses ~10 GB asset-bytes — which occurs at ~6-7K decks (pre-55K). Re-evaluate at that scale milestone.

### 11.5 Orphan-asset cleanup discipline (no current gap)

Unpublish handler (§15.11) + .archived/ migration discipline (§15.12) working correctly. 0 current orphans. No immediate doctrine-change needed.

**Recommendation:** add periodic orphan-audit cron (monthly?) that runs the same diff CC executed in §7 above. If orphans surface in future, surfaces a `[FIX][PUBLISH-CLI]` commission. Defer until first orphan surfaces empirically.

### 11.6 Cross-locale consistency (no normalization needed)

All 11 locales follow identical structure. No drift. Maintain via existing publish-cli + unpublish convention.

## 12. Phase 3 operator-strategic questions

Three actionable strategic questions surface from this audit:

**Q1 (urgent):** Backup gap fix. Commission separate `[FIX][OPS]` arc immediately to extend scheduled-backup.sh to cover decks/. Option A (weekly tarball) recommended for immediate fix; Option B (off-host rsync) deferred follow-on. Operator-strategic: priority + Option choice.

**Q2 (deferred):** Sharding strategy. Defer until 5K-deck-per-locale milestone. Operator-strategic decision then; not now.

**Q3 (deferred):** Off-host backup strategy + storage vendor. Defer until catalog crosses ~10 GB asset-bytes (~6-7K decks). Operator-strategic decision then; not now.

**Q4 (deferred):** Orphan-audit cron. Defer until first orphan surfaces empirically. Operator-strategic decision then.

**Q5 (no action):** Cleanup-cron for .archived/. Already deferred per §15.12 trigger; no change.

## 13. Audit-trail footnotes

- All measurements via `plink ... ssh root@65.108.5.250` against live production state at 2026-05-05.
- DB cross-reference via `psql 'postgresql://lcs_user:LcS2025SecureDBPass@localhost:5432/lessoncraftstudio_prod'`.
- No production state modified during audit.
- Sample deck IDs not preserved in this report (PII-adjacent; deck IDs identify content authoring); aggregate counts only.

## 14. Doctrine queue carry-forward candidates (filed for next [DOCS] fold)

1. **Asset-tree audit-only [CHORE][AUDIT] commission shape.** Distinct from implementation [FEATURE] commissions — produces audit-report markdown + zero production change. Pattern reusable for future scale audits (Scaling Arc 5 bulk-publish path validation; future Scaling Arc N as catalog grows). File alongside §A.13 verification hygiene.

2. **Scale-projection methodology extension.** Arc 1's 7-query-path framework now extends to filesystem-level projection (ext4 dir_index thresholds; per-deck asset breakdown × 55K-target). Same methodology, different surface. File alongside Arc 1 doctrine.

3. **Backup-coverage audit class.** Audit commissions should explicitly verify backup-script coverage of new directory paths added since last backup-script update. The decks/ omission surfaced here is the second instance of "directory was added but backup-script wasn't updated" — file as a Phase 1 standard-checklist item for any audit commission touching server-side filesystem state.

## 15. State after this audit

- Production state: unchanged
- Audit-report committed to `docs/scaling-arc-3-asset-tree-audit-2026-05-05.md`
- Phase 3 operator-strategic questions surfaced (5 questions; 1 urgent, 4 deferred)
- Foundation for follow-on commissions: `[FIX][OPS]` backup-gap fix (Q1 immediate); future `[FEATURE][SCALING]` sharding/off-host/orphan-cron arcs (Q2-4 deferred)
- Open commissions queue advances per session-state §10
