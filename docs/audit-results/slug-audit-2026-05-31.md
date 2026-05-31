# Exhaustive deck-slug audit + PDF de-indexing — 2026-05-31

**Trigger:** operator flagged "strange slugs" in Google Search Console, e.g.
`…/en/decks/prepositions-fillin-clothing/prepositions-fillin-clothing-printable.pdf`,
`…/de/decks/muster-arbeitsblatt-insekten-und-kafer-172b/…-printable.pdf`.

**Headline:** the slugs are **correct**. The flagged URLs are printable-PDF files,
and the real issue was that the PDFs were being **indexed** as thin duplicates of
the deck pages. Fixed by de-indexing the PDFs (operator decision). Full-catalog
slug audit found **0 structural defects** across 19,537 decks.

## Catalog scanned
19,537 published decks: en 3872 · es 3204 · pt 3245 · fr 3015 · it 3086 · de 2998 · nl 29 · sv 29 · da 29 · fi 29 · no 1.

## Phase 0 — production-state probe
- PDFs returned `200` with **no** `X-Robots-Tag` → indexable (the problem).
- Old English-token slug URLs already **301** → native slug (the `d69b3f5b` redirect map is live; soft-consolidation is already hard-consolidated). No action needed.
- Deck pages: `200`, self-referential `www` canonical. Correct.

## Phase 1 — exhaustive audit (read-only)
1. **`audit-deck-html.js`** (FS, all 19,537 decks, 13 invariants — canonical self-reference, www-host, single-h1, title/desc uniqueness, theme-keyword, deck-end strip): **structurally clean.** Only non-slug cosmetics: `TITLE_LENGTH_TOO_LONG` ×3 (es 2, fr 1; titles slightly >60 chars), `DECKEND_STRIP_STALE_EMIT` ×1 (the lone `no` deck — no siblings to link).
2. **`audit-slug-fs-db-consistency.js`** (NEW; DB slug ↔ 5 URL columns ↔ on-disk symlink/assets ↔ re-derived native slug): **0 HARD defects** (no symlink/asset/PDF-file 404s, no slug↔htmlUrl mismatch, no column-path drift). INFO only:
   - `PDF_FILENAME_DRIFT` 8781 — exactly the re-slugged non-EN decks; pdfUrl keeps the old English-token filename at the new native path (`/decks/<native>/<old>-printable.pdf`). Resolves 200; cosmetic; harmless now that PDFs are noindexed.
   - `NATIVE_SLUG_REDERIVE_DIFF` 2116 (all en) — benign derivation drift: the slug today's code would generate differs from what was generated at publish (mode tokens now emitted, plural/zero-pad changes, `-vs-` compound fallback). Published URLs are stable + self-canonical; not defects.
3. **`audit-canonicals-crawl.js`** (live sitemap crawl: 9,957 route URLs in full + 600 deck sample; every URL `200` + self-referential canonical): **see crawl-result section** below. Sitemap carries 19,537 deck-PAGE URLs + 8,780 intersections + 1,177 single-axis/static — **no PDF URLs** (PDFs were only reachable via deck-page links).

### Crawl result
`audit-canonicals-crawl.js`: **10,557 URLs crawled (9,957 route in full + 600 deck sample), 10,557 clean (200 + self-referential canonical), 0 defects.** Report `docs/audit-results/canonical-crawl-20260531211607.json`.

## Phase 2 — remediation
- **2a (the fix): PDF de-indexing — DONE + verified.** `patch-nginx-pdf-noindex.py` added a dedicated `/decks/**.pdf` nginx location emitting `X-Robots-Tag: noindex`, before the asset catch-all so PNGs stay indexable. Verified through origin **and** Cloudflare edge:
  - `…-printable.pdf` → `200` + `x-robots-tag: noindex`, still 400 KB downloadable.
  - `…-answer-key.pdf` → `200` + `noindex`.
  - `og-image.png` / `thumbnail.png` → `200`, **no** noindex (stay in image sitemap).
  - deck page → `200`, **no** noindex (single indexable surface preserved).
  - old-slug `301` and legacy bare-`printable.pdf` `301` redirects unaffected.
- **2b: old-slug 301 consolidation — already live** (no-op; verified at Phase 0).
- **2c: structural drift — none found**, nothing to fix.

## `thanksgivinng` typo — FIXED (operator authorized, option A)
**73 decks carried a `thanksgivinng` (double-n) typo** (en 63, es 4, pt 3, de 2,
fr 1) in slug + on-disk PDF filenames + manifest theme + DB title/description
JSON, from an old theme-source typo. `fix-thanksgivinng-typo.js` applied a uniform
`thanksgivinng`→`thanksgiving` token correction across all surfaces (dir + PDF-file
renames, deck.html, manifest, DB slug + 5 URL columns + title + description,
symlink repoint), and the old-slug 301 map was regenerated so each old typo URL
redirects to its corrected slug. **Verified:** corrected pages `200` +
self-canonical, old URLs `301` → corrected, corrected PDFs `200` + noindex,
**0 hard defects on 5-locale re-audit**, 0 residual typo in any published deck.
7 **archived** (non-served, non-indexed) es rows retain the typo by design.

## What this means in Search Console
The PDF URLs will drop out of Google's index over the next few weeks as Googlebot
recrawls and reads the new `noindex` header. This can optionally be accelerated
via GSC "Removals" or by re-submitting the sitemap (operator-side).

## Artifacts
- New tooling (committed): `scripts/publish-cli/audit-slug-fs-db-consistency.js`, `scripts/publish-cli/patch-nginx-pdf-noindex.py`.
- nginx change is server-side (not git); backup at `/root/nginx-backups/lessoncraftstudio.<utc>.bak`. Doctrine: CLAUDE.md §17.8.20.
- Machine outputs on Hetzner: `docs/audit-results/seo-100pct-curl-*.{json,md}` (per-locale deck-html), `slug-fs-db-consistency-*.{json,md}`, `seo-100pct-baseline-*.json`.
