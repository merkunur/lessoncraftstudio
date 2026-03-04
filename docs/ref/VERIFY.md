# VERIFICATION STRATEGY

> Extracted from REFERENCE.md Section 14. Cross-references RULES.md Section 1.11 (SEO Perfection Checklist) for item-level detail.

---

Every part must pass the checks below before being marked complete. RULES.md Section 1.11 provides the item-level detail — this section defines *when* and *how* those items are verified.

## Per-File Checks (automated script — run after every content file)

1. File exports `content` object matching expected type
2. All required sections present (description, howItWorks, features, useCases, faq)
3. Word count >= 2,800 per content file (C1 buffer for rendered page >= 3,000)
4. No untranslated English text in non-English files (G1)
5. No duplicate content across files in same category
6. `seoChecklist.primaryKeyword` is unique — no other file in the same locale targets the same keyword (C5)
7. `seoChecklist.titleTag` is <= 60 characters and contains primary keyword (A1)
8. `seoChecklist.metaDescription` is 150-160 characters and contains primary keyword (A2)
9. `seoChecklist.internalLinkTargets` has minimum link count for this page type (C2)
10. Primary keyword appears in the first 100 words of description text (B3)
11. FAQ items count matches `seoChecklist.faqCount` (D1)
12. Opening sentences follow RULES.md Section 1.10.3 hook patterns — no banned openers (C6)
13. Pain-to-solution arc present in description section per RULES.md Section 1.10.4 (C6)
14. All product names, tier names, category names use locale helpers not English strings (G1, RULES.md Section 1.9)
15. Platform references use locale-appropriate domains per BUSINESS.md Section 11.8 (G3)
16. Free trial mention present in content per RULES.md Section 1.12.2 table for this page type (C7)
17. Refund policy FAQ present in FAQ array, positioned among last 3 FAQs (C8)
18. No "limited free version", "basic free version", or "free trial" (implies time limit) language — per RULES.md Section 1.12.4 framing rules

## Per-Build Checks (run after `npm run build`)

1. TypeScript compiles without errors
2. All routes render (no 500 errors)
3. Word count on rendered page >= 3,000 (C1)
4. Exactly one `<h1>` per page, containing primary keyword (B1)
5. Heading hierarchy H1 > H2 > H3 with no skipped levels (B2)
6. All `<img>` tags have alt text in the page's locale language (B5)
7. All YouTube embeds use facade pattern — no raw `<iframe>` in initial HTML (E1)
8. No framer-motion, GSAP, or animation library imports in the page bundle (E4)
9. JSON-LD schema is valid JSON and matches the required `@type` for this page type (A6, D3)
10. All text within JSON-LD matches the page locale — no English in non-EN schemas (D4)

## Per-Deploy Checks (run after deploy.sh on live server)

1. Google Rich Results Test passes for FAQ/HowTo schema — no errors (D3)
2. Sample pages load correctly in all 11 locales (smoke test)
3. Hreflang tags present, bidirectional, all 11 locales + x-default (A4)
4. Canonical URL resolves to self (no redirect chains) (A3)
5. Google PageSpeed Insights >= 90 on mobile for 2 random pages per page type (E1-E5)
6. Random spot-check: pick 3 pages, verify all 35-37 SEO checklist items from RULES.md Section 1.11 pass

## Per-Page SEO Audit (mandatory for every part)

Before any part is marked complete, confirm:

1. **All applicable items from RULES.md Section 1.11** have been addressed (35-37 items depending on page type)
2. **RULES.md Section 1.10 voice rules** are reflected in the content — benefit-first openings, active voice, platform-specific excitement, no anti-patterns from 1.10.7
3. **Keyword uniqueness** — the primary keyword is not used by any other page in the same locale
4. **Link topology** — new pages are linked FROM existing pages (no orphans) and link TO related pages per RULES.md Section 1.7

If any item fails, fix it before marking the part complete. Do not defer SEO fixes to a later phase.
