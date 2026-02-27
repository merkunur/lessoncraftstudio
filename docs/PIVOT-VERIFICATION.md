# Pivot Verification Document

## Branch: `pivot/printable-business-toolkit`
## Created from: `main` at commit `4d6cd2d6`
## Date: 2026-02-27

---

## Pre-Pivot File Counts (Baseline)

### Routes to Remove
| Directory | Count |
|-----------|-------|
| `frontend/app/[locale]/blog/` | 5 |
| `frontend/app/api/blog/` | 14 |
| `frontend/app/[locale]/worksheets/` | 3 |
| `frontend/app/[locale]/pricing/page.tsx` | 1 |
| `frontend/app/[locale]/apps/category/` | 1 |
| `frontend/app/[locale]/apps/grades/` | 1 |
| `frontend/app/buy/` | 3 |
| `frontend/app/feed.xml/` | 1 |
| `frontend/app/sitemap-news.xml/` | 1 |
| `frontend/app/sitemap-images.xml/` | 1 |
| `frontend/app/sitemap_index.xml/` | 1 |
| `frontend/app/api/stripe/` | 13 |
| **Subtotal** | **45** |

### Components to Remove
| Directory | Count |
|-----------|-------|
| `frontend/components/blog/` | 6 |
| `frontend/components/theme-page/` | 17 |
| `frontend/components/product-page/` | 14 |
| `frontend/components/billing/` | 6 |
| `frontend/components/payment/` | 2 |
| `frontend/components/subscription/` | 2 |
| `frontend/components/PricingCards.tsx` | 1 |
| `frontend/components/PricingSection.tsx` | 1 |
| `frontend/components/BillingToggle.tsx` | 1 |
| `frontend/components/WorksheetSamples.tsx` | 1 |
| **Subtotal** | **51** |

### Content to Remove
| Directory | Count |
|-----------|-------|
| `frontend/content/themes/` | 605 |
| `frontend/content/product-pages/` | 363 |
| **Subtotal** | **968** |

### Lib Files to Remove
| File | Count |
|------|-------|
| `frontend/lib/blog-data.ts` | 1 |
| `frontend/lib/blog-heading-validator.ts` | 1 |
| `frontend/lib/blog-internal-links.ts` | 1 |
| `frontend/lib/blog-link-transformer.ts` | 1 |
| `frontend/lib/blog-schema-utils.ts` | 1 |
| `frontend/lib/blog-seo-validator.ts` | 1 |
| `frontend/lib/blog-topic-clusters.ts` | 1 |
| `frontend/lib/sample-seo.ts` | 1 |
| `frontend/lib/sample-utils.ts` | 1 |
| `frontend/lib/stripe-client.ts` | 1 |
| `frontend/lib/stripe-config.ts` | 1 |
| `frontend/lib/stripe-mock.ts` | 1 |
| `frontend/lib/stripe-server.ts` | 1 |
| `frontend/lib/internal-linking.ts` | 1 |
| `frontend/lib/cross-theme-links.ts` | 1 |
| **Subtotal** | **15** |

### Config Files to Remove
| File | Count |
|------|-------|
| `frontend/config/blog-category-slugs.ts` | 1 |
| `frontend/config/blog-redirects.ts` | 1 |
| `frontend/config/theme-app-mapping.ts` | 1 |
| `frontend/config/theme-categories.ts` | 1 |
| `frontend/config/theme-page-content.ts` | 1 |
| `frontend/config/theme-page-labels.ts` | 1 |
| `frontend/config/theme-slugs.ts` | 1 |
| `frontend/config/product-category-slugs.ts` | 1 |
| **Subtotal** | **8** |

### Dashboard Pages to Remove
| File | Count |
|------|-------|
| `frontend/app/dashboard/subscription/page.tsx` | 1 |
| `frontend/app/[locale]/dashboard/billing/page.tsx` | 1 |
| `frontend/app/[locale]/dashboard/subscription/page.tsx` | 1 |
| **Subtotal** | **3** |

### Homepage Components to Rewrite (not delete)
| File | Action |
|------|--------|
| `frontend/components/homepage/AppCategories.tsx` | Rewrite |
| `frontend/components/homepage/HomepageBlogPosts.tsx` | Delete |
| `frontend/components/homepage/HomepageCTA.tsx` | Rewrite |
| `frontend/components/homepage/HomepageFAQ.tsx` | Rewrite |
| `frontend/components/homepage/HomepageFeatures.tsx` | Rewrite |
| `frontend/components/homepage/HomepageHero.tsx` | Rewrite |
| `frontend/components/homepage/HowItWorks.tsx` | Rewrite |
| `frontend/components/homepage/SampleGallery.tsx` | Delete |
| `frontend/components/homepage/VideoLightbox.tsx` | Delete |

---

## TOTAL FILES TO REMOVE: ~1,090

---

## Files to KEEP (Critical)
| File | Reason |
|------|--------|
| `frontend/config/warriorplus-products.ts` | New source of truth |
| `frontend/config/product-page-slugs.ts` | App detail page URLs |
| `frontend/config/locales.ts` | 11-locale support |
| `frontend/config/grade-slugs.ts` | Keep until footer rewrite |
| `frontend/app/[locale]/apps/[slug]/page.tsx` | App detail pages (rewrite) |
| `frontend/app/[locale]/apps/page.tsx` | Apps listing (rewrite) |
| `frontend/app/[locale]/page.tsx` | Homepage (rewrite) |
| `frontend/middleware.ts` | 410 routing (rewrite) |
| `frontend/app/sitemap.ts` | Sitemap (rewrite) |
| `frontend/components/layout/Navigation.tsx` | Nav (rewrite) |
| `frontend/components/layout/Footer.tsx` | Footer (rewrite) |
| Auth system (all files) | Keep intact |
| Admin system (all files) | Keep intact |
| Member portal (`frontend/app/member/`) | Keep intact |
| WarriorPlus integration | Keep (already built) |
| License system | Keep (already built) |

---

## Pre-existing Uncommitted Changes (Carried into Branch)
| File | Change |
|------|--------|
| `.claude/settings.local.json` | Local settings |
| `frontend/lib/email/templates/index.ts` | Added LicenseDeliveryEmail export |
| `frontend/prisma/schema.prisma` | WarriorPlus license tables + formatting |

---

## Recovery
To abandon pivot and return to original: `git checkout main`
