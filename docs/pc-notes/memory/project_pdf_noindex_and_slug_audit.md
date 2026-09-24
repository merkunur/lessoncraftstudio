---
name: project-pdf-noindex-and-slug-audit
description: Deck printable-PDFs are noindexed at nginx; full slug catalog audited clean (2026-05-31)
metadata: 
  node_type: memory
  type: project
  originSessionId: 94fbcffd-31bc-4fd2-82db-cba7f122d986
---

Operator flagged `/decks/<slug>/<slug>-printable.pdf` URLs in Google Search Console as "strange." Investigation (2026-05-31): the slugs are **correct by construction**; the real issue was the printable/answer-key PDFs being **indexed** as thin duplicates of the deck pages.

**Fix (operator decision = noindex PDFs):** `scripts/publish-cli/patch-nginx-pdf-noindex.py` added a dedicated `/<locale>/decks/<slug>/**.pdf` nginx location emitting `X-Robots-Tag: noindex`, inserted BEFORE the generic deck-asset catch-all so `og-image.png`/`thumbnail.png` stay indexable (image sitemap). `noindex` only (follow preserved); NOT robots.txt Disallow (would block the crawl that lets Google see the noindex). Verified live through Cloudflare edge. nginx config is server-side (not git); backup in `/root/nginx-backups/`. Doctrine: CLAUDE.md §17.8.20. PDFs were never in the sitemap.

**Audit:** new read-only `scripts/publish-cli/audit-slug-fs-db-consistency.js` cross-checks DB slug ↔ 5 URL columns ↔ on-disk symlink/assets ↔ re-derived native slug. Full catalog (19,537 decks) = **0 hard defects**. `audit-deck-html.js` per-locale = structurally clean (3 cosmetic title-length, 1 deckend-strip on lone `no` deck). Old English-token slugs already 301→native (the `d69b3f5b` redirect map is live). INFO (benign): `PDF_FILENAME_DRIFT` 8781 (re-slugged non-EN keep old pdf filename), `NATIVE_SLUG_REDERIVE_DIFF` 2116 (derivation drift since publish).

**Run all 3 audits per-locale or with bounded heap** — `audit-deck-html.js` OOMs at 16GB if run across all 19.5K decks in one process; run `--locales=<one>` in a loop.

**`thanksgivinng` typo — FIXED 2026-05-31** (operator chose fix-both). `scripts/publish-cli/fix-thanksgivinng-typo.js` token-corrected 73 published decks (en 63, es 4, pt 3, de 2, fr 1) across slug + PDF filenames + deck.html + manifest + DB slug/URL-cols/title/description + symlink repoint; old-slug 301 map regenerated (`gen-old-slug-redirects.js` + `patch-nginx-deck-redirects.py`). Verified: corrected 200/self-canonical, old 301→new, 0 hard defects on re-audit. 7 archived es rows left (non-served). This fixer is the template for any future single-token slug-data typo. Report: `docs/audit-results/slug-audit-2026-05-31.md`. Commits `1bc9f21e`/`658a422a`/`95142dd4`. See [[feedback_content_publishing_seo_standard]].
