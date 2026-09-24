---
name: project-danish-deck-wave
description: "Danish (da) catalog deck wave — 3,065 decks published via publish-wave.js with full SEO + OG thumbnails; the 47-ZIP theme salvage + the benign \"print\" lexicon false-positive"
metadata: 
  node_type: memory
  type: project
  originSessionId: e55a193d-4d0a-4d16-9756-c0f97f1d33af
---

**3,065 Danish (`da`) catalog decks published** (2026-06, operator dropped them in `decks/Danish/` as 29 per-app subfolders). Routine §21 deck-publish via the one-command orchestrator — confirms `publish-wave.js` works end-to-end for a full-market `da` wave.

## How it was done
- Local: `tar -cf danish-da.tar -C decks Danish` (3,065 zips, 4.2 GB) → `pscp -pw … -l root danish-da.tar 65.108.5.250:/opt/lessoncraftstudio/publish-inbound/` (§A.13.40 pscp `-l user host:path` form).
- Hetzner: extract → **flatten** (`mv publish-inbound/Danish/*/*.zip publish-inbound/da-wave/` — publish-wave pre-flight is non-recursive, §21.2) → `cd frontend && set -a && source .env.production && set +a && node ../scripts/publish-cli/publish-wave.js ../publish-inbound/da-wave --locales=da --confirm`.
- The wave ran all 12 steps (pre-flight, preband, publish-bulk, OG images, alt-text, img-dims, lazy-deckend, end-links, topic-slash, embed-hide, hreflang, audit). Slugs are native da (e.g. `addition-billede-billede-4-juli`); DA decks are in the image-sitemap shards.

## Two things to know
1. **Pre-flight caught 47 theme-emit-defect ZIPs** (manifest.theme null/wrong → would have broken SEO at the re-band step). Salvaged with `node scripts/publish-cli/rewrite-manifest-theme.js ../publish-inbound/da-wave --themeless-ok` (recovered each theme from in-bundle image signal, backup at `da-wave.original`), then re-ran. This is the §A.14.8 / §15.17 gate working as designed.
2. **The audit reports "129/3094 clean" — this is a BENIGN false-positive, NOT a defect.** The only flag is `LOCALE_RESIDUE_DETECTED` on the single token **"print"** in the `description` (2,965 decks). "Print" is a normal Danish word ("Print eller spil online"); the deprecated `lexicon-on-html` residue path (§17.8.16, "can false-positive") flags it as English. Every real invariant passes; the descriptions are correctly Danish. Confirmed by reading the live description + that the 11 "2.G.A.3"-style machine anchors / og:image stack match prior sets. **Google-thumbnail stack is identical to prior deck sets** (verified: og:image 6 tags, ImageObject, thumbnailUrl, image-sitemap — all match a prior EN deck; `max-image-preview` is 0/0 on both, i.e. the static deck.html never carried it, so da matches the working pattern).

## Optional follow-up (flagged, not done)
Add `"print"` to the da locale-residue exception lexicon (`scripts/publish-cli/seo-reconciliation-exceptions.json`) so future da audits read clean — the §17.8.16-documented remedy for a legitimately-in-locale word. Audit-reporting cosmetics only; the published decks are correct + live.

## Cleanup state
Transient tarballs removed (local `danish-da.tar` + Hetzner `publish-inbound/danish-da.tar` + extracted `Danish/`). **Inbound recovery backups PRUNED 2026-06-08** (`da-wave`, `.original`, `.preband-backup` `rm -rf`'d alongside the no-wave set when both waves verified live; safe — published assets in `/var/www/lcs-media/decks/da/`, 6217 dirs intact + serving 200, source ZIPs persist locally at `decks/Danish` 3065). No git commits (decks out-of-tree per §A.8). Cross-ref CLAUDE.md §21.2, §A.14.8, §17.8.16, §17.8.19; [[project-norwegian-deck-wave]].
