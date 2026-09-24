---
name: project-norwegian-deck-wave
description: "Norwegian (no) catalog deck wave — 3,073 decks published via publish-wave.js with full SEO + OG thumbnails; mirrors the da precedent (46-ZIP theme salvage + benign 'matching' loanword locale-residue false-positive)"
metadata: 
  node_type: memory
  type: project
  originSessionId: add6803a-fa3f-494e-a1e2-4c6705c960ef
---

**3,073 Norwegian (`no`) catalog decks published** (2026-06-08, operator dropped them in `decks/Norwegian/` as 29 per-app subfolders). First `no` deck wave (Tier-3, was substrate-only). Routine §21 deck-publish via the one-command orchestrator — confirms `publish-wave.js` works end-to-end for a full-market `no` wave. `no` = bokmål; native slugs (addisjon-…, gjett-ordet-…, ordsok-…, matching-bokstav-…). DB now 3074 published `no` decks (3073 new + 1 pre-existing `monsterark`).

## How it was done (identical to the da precedent [[project-danish-deck-wave]])
- Local: `tar -cf norwegian-no.tar -C decks Norwegian` (3073 zips, 4.2 GB) → `pscp -pw … -hostkey … -l root norwegian-no.tar 65.108.5.250:/opt/lessoncraftstudio/publish-inbound/` (§A.13.40 `-l user host:path`).
- Hetzner: extract → **flatten** (`mv publish-inbound/Norwegian/*/*.zip publish-inbound/no-wave/` — pre-flight is non-recursive) → run detached with nohup (survives SSH blips on the ~45-min run): `cd frontend && set -a && source .env.production && set +a && nohup node ../scripts/publish-cli/publish-wave.js ../publish-inbound/no-wave --locales=no --confirm > …/no-wave.publish.log 2>&1 &`.
- Wave ran all 12 steps; final: publish applied=3073 failed=0; hreflang 307 cross-locale sibling rewrites (43 groups); audit 2981/3074 clean.

## Two things to know (both benign, both have a da analogue)
1. **Pre-flight caught 46 theme-emit-defect ZIPs** (vs da's 47). Salvaged with `node scripts/publish-cli/rewrite-manifest-theme.js /opt/lessoncraftstudio/publish-inbound/no-wave --themeless-ok` (recovered theme from in-bundle `seoMeta.themeName`, backup at `no-wave.original`), then re-ran. §A.14.8/§15.17 gate working as designed. (The dry-run `errored=574` was all `DESCRIPTION_LENGTH_TOO_LONG` — the expected wordy-locale class auto-fixed by preband under `--confirm`; zero TITLE_NON_UNIQUE/collisions.)
2. **Audit `LOCALE_RESIDUE_DETECTED: 92` is a BENIGN false-positive** (the da-"print" class, §17.8.16 deprecated `lexicon-on-html` path). The token is **"matching"** in title+description of all matching/letter (46) + matching/name (46) decks — and `topics-taxonomy.json` **intentionally** sets `axes.exercise-type.matching.name.no = "Matching"` / `slug.no = "matching"` (a Norwegian loanword, independently configured — NOT an en fallback). The decks are correct Norwegian (h1 "Finn Parene!", instr "Trykk på et bilde…"). The 1 `DECKEND_STRIP_STALE_EMIT` is the pre-existing `monsterark` (pattern-worksheet, one of `already=2`), not from this wave.

## Google-thumbnail stack verified LIVE (operator's explicit ask)
Live curl of `/no/decks/<slug>/` (200): full og:image stack — `og:image` (1200×630) + `secure_url` + `twitter:image` + `og:image:type` + Norwegian `og:image:alt` + `ImageObject`/`thumbnailUrl` JSON-LD. `og-image.png` fetchable at edge (200, image/png, ~190 KB); 1:1 og-image.png coverage across all `no` deck dirs. Sitemap shards 0/1 (`app/sitemap/{0,1}.xml/route.ts`, `revalidate=1800`, unfiltered/unlimited query, ID-parity split 1540/1534) include `no` automatically **after the 30-min ISR window** — origin served a stale snapshot immediately post-publish (NOT a defect; same as how da landed in the sitemap; verify ≤30 min after publish).

## Optional follow-ups (flagged, not done)
- **`no` matching name** is "Matching"; sv/da use "Matchning". Possible native-review polish (NSR §17.5.1) — but changing it re-derives the slug (§10.3 canonical-data) and is out of scope for a publish. Optionally add "matching" to the `no` locale-residue exception lexicon (`scripts/publish-cli/seo-reconciliation-exceptions.json`) for clean future audits.
- **Disk at 91% (39 GB free)** after the wave. Combined `da-wave*` + `no-wave*` inbound recovery backups (~20 GB) under `/opt/lessoncraftstudio/publish-inbound/` are prune candidates (§A.14.6 off-host-backup trigger territory).

## Cleanup state
Removed transient tarballs (local `norwegian-no.tar` + Hetzner copy + empty extracted `Norwegian/`). **Inbound recovery backups PRUNED 2026-06-08** — all 6 da+no wave dirs (`{da,no}-wave`, `.original`, `.preband-backup`, ~24 G) `rm -rf`'d from `/opt/lessoncraftstudio/publish-inbound/` once both waves verified live; safe because published assets live in `/var/www/lcs-media/decks/` and the source ZIPs persist locally (`decks/Danish` 3065 + `decks/Norwegian` 3073). Disk 91%→86% (39 G→63 G free). Both da+no live decks re-confirmed 200 post-prune. (`no-wave.publish.log` 1.2 M kept as the run record.) No git commits (decks out-of-tree §A.8). Cross-ref CLAUDE.md §21.2, §A.14.8, §17.8.16, §17.8.19, §17.10.1; [[project-danish-deck-wave]].
