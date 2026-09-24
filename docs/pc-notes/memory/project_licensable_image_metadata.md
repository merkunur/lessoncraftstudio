---
name: project-licensable-image-metadata
description: "Licensable-image metadata (XMP in worksheet PNGs + landing JSON-LD) to make Search Console's Image-metadata report validate; the report was Valid:0"
metadata: 
  node_type: memory
  type: project
  originSessionId: 48bc9529-fbcd-4850-a3ea-778a761e73bc
  modified: 2026-07-21T01:25:42.625Z
---

# Licensable-image metadata (task #33, DONE + LIVE 2026-07-21)

**Trigger:** operator showed the Search Console **Image Metadata** report reading **Valid: 0** (green historical bars Apr–Jun decayed to zero) and said "Pdf files and the interactive worksheets should get a very descriptive image metadata."

**Key diagnosis (corrected twice — verify, don't assume):**
- That report validates on the **licensing** fields (`license` URL / `acquireLicensePage` / `creditText` / `copyrightNotice` / `creator`), NOT title/description. `dc:title`+`dc:description` alone never make an image "valid".
- The license PAGE **already exists** at `/{locale}/license` (route `frontend/app/[locale]/license/page.tsx`, renders the pre-existing `license` message namespace in all 11 locales, resolves 200). My first Glob brace-pattern falsely reported it missing — always `ls` to confirm.
- The homepage **showcase** images (`schema-generator.ts generateShowcaseImageSchemas`/`generateImageGallerySchema`) **already emit the full valid licensing block** pointing at that live page — yet the report is still 0. → the ceiling is **crawl** (Google not re-rendering the pages), the site-wide collapse, NOT a metadata gap.
- The real product gap: the **worksheet images** carried NO licensing fields — landing `image:` was a bare URL string; deck.html ImageObject (`build-seo-head.js`) has none; og-image XMP had `xmpRights:Marked=True` but no `WebStatement`; thumbnail.png was entirely bare.
- **Embedded-in-file XMP is a crawl-INDEPENDENT channel** — Googlebot-Image fetches the image file from the `<image:image>` sitemap entries and reads its IPTC/XMP directly, not gated on the throttled HTML crawl. So the file-embedding is the part that can pay off now; the on-page JSON-LD waits on crawl (§ crawl-budget-collapse, task #29).

**What shipped (`94736c98` + `7...` fix + deploy):**
1. `frontend/lib/seo/licensable-image.ts` — single SoT `licensableImageObject()` + `licenseUrlFor(locale)` (license→`/{locale}/license`, acquireLicensePage, creditText, creator, copyrightHolder, copyrightNotice). (Did NOT refactor schema-generator's 2 inline copies — its `getBaseUrl()` is env-based, would shift the homepage license URL; noted as future fold.)
2. Landing route `worksheets/[slug]` — bare `image` → licensable ImageObject **array** (og-image representative + thumbnail). Additive JSON-LD, churn-freeze exempt. LIVE at origin (edge ≤1h).
3. `og-image-xmp.js buildXmpPacket` — optional `licenseUrl`/`acquireLicensePage` → emits `xmpRights:WebStatement` + `xmpRights:UsageTerms` + `photoshop:Credit` + `plus:Licensor/LicensorURL`; backward-compat (unchanged when absent); + raw `subjects` list. ⚠ a `dc:*/rights` in a JSDoc `*/` closed the block comment — reword such tokens.
4. `scripts/publish-cli/write-image-metadata.js` — walker embedding that XMP into each deck's **thumbnail.png + og-image.png** via **PNG iTXt chunk surgery** (`XML:com.adobe.xmp`, pixel bytes copied verbatim — NO Sharp re-encode → provably pixel-identical + fast). Sources title/description from the deck.html `<head>`; **dc:subject from the LearningResource JSON-LD `keywords`** field (deck.html has no `<meta name=keywords>`). Atomic (`.new`→rename), one-time `.bak`, idempotent (re-run→skip), per-locale, `--sample`/`--dry-run`.

**Batch result:** 11 locales, **45,753 decks × 2 PNGs embedded, 0 errors**, pixel-identical + well-formed XMP verified on real files. Ran on Hetzner (`nohup node write-image-metadata.js --locales=en,de,...,fi`). ⚠ `ls -d *-v*/` counts ~526/locale extra = **alias symlinks** (trailing-slash glob follows them); the walker's `lstatSync+isDirectory+/-v\d+$/` rule processes each real dir once — reconciled 6093 real + 526 symlink = 6619, all real dirs had og-image.png, no silent gap.

**Left behind / follow-ups:**
- **~13GB `.png.bak`** safety copies on the server — cleanable once satisfied: `find /var/www/lcs-media/decks -name '*.png.bak' -delete`.
- **PDFs**: already carry localized info-dict Title/Subject/Keywords (task #30 done) and are NOT `<image:image>` candidates → not licensable-image surfaces; no PDF XMP added (would be additive-only).
- **Report recovery also needs crawl to return** (task #29). This is a parallel image-search bet, not a traffic promise. The on-page half only helps when pages get re-rendered; the file-embed half rides the independent image-crawl channel.
- deck.html static ImageObject NOT mass-rewritten (churn freeze §21.5a) — deferred.

Related: [[project-crawl-budget-collapse-2026-07]], [[feedback-verify-rendered-not-source]], [[project-seo-real-cause-and-hub-program]].
