import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ALL_APPS } from '@/config/products';
import { ArrowRight } from 'lucide-react';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';

// /[locale]/worksheet-makers/ — Worksheet creators (Apps) category landing.
// Reopened publicly per operator's 2026-05-17 strategic lock §8.1; daily
// download-limits for free users ship in a downstream quota-system commission
// per §8.6 #3.
//
// v1 content shape: 29 §14.10 canonical apps as a card grid, grouped by
// category. Each card links directly to the nginx-served worksheet generator
// at /worksheet-generators/<htmlFile> (plain <a href> per §15.7 routing-
// contract, NOT Next.js <Link>). Per-app marketing pages don't exist yet —
// direct generator anchor is the v1 surface.

const BASE_URL = CANONICAL_HOST;

// §14.10 canonical 29-app list — the 4 PDF-only apps (coloring / writing /
// draw-and-color / drawing-lines) excluded since they're not catalog-shipping.
const PDF_ONLY_APPS = new Set(['coloring', 'writing', 'draw-and-color', 'drawing-lines']);

interface AppMeta {
  slug: string;
  name: string;
  category: string;
  htmlFile: string;
}

function listCatalogApps(): AppMeta[] {
  const apps: AppMeta[] = [];
  for (const [slug, meta] of Object.entries(ALL_APPS)) {
    if (PDF_ONLY_APPS.has(slug)) continue;
    apps.push({ slug, name: meta.name, category: meta.category, htmlFile: meta.htmlFile });
  }
  // Stable sort: category then name.
  apps.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return apps;
}

// Category display order matches products.ts grouping. `search` is a small
// 4-app cluster (find-and-count / find-objects / crossword / treasure-hunt)
// that appears after puzzle.
const CATEGORY_ORDER = ['math', 'literacy', 'visual', 'matching', 'puzzle', 'search'];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });
  return {
    title: `${t('title')} | LessonCraftStudio`,
    description: t('description'),
    alternates: { canonical: canonicalUrl(localePath(locale, 'worksheet-makers')) },
    robots: { index: false, follow: true }, // noindex until full marketing surface ships
  };
}

export default async function WorksheetMakersPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });

  const apps = listCatalogApps();

  // Group by category for category-section rendering.
  const byCategory = new Map<string, AppMeta[]>();
  for (const app of apps) {
    if (!byCategory.has(app.category)) byCategory.set(app.category, []);
    byCategory.get(app.category)!.push(app);
  }

  // Render in CATEGORY_ORDER; any unknown category appended last.
  const orderedCategories: string[] = [];
  for (const c of CATEGORY_ORDER) {
    if (byCategory.has(c)) orderedCategories.push(c);
  }
  for (const c of byCategory.keys()) {
    if (!orderedCategories.includes(c)) orderedCategories.push(c);
  }

  return (
    <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl">
        {t('description')}
      </p>

      {orderedCategories.map(category => {
        const categoryApps = byCategory.get(category) ?? [];
        // Localized category heading; fall back to the raw slug for any
        // unmapped category so we never render nothing.
        let categoryLabel = category;
        try {
          categoryLabel = t(`categories.${category}`);
        } catch {
          categoryLabel = category;
        }
        return (
          <section key={category} className="mb-12">
            <h2 className="font-display font-semibold text-xl md:text-2xl text-ink-900 mb-4">
              {categoryLabel}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryApps.map(app => (
                <a
                  key={app.slug}
                  id={app.slug}
                  href={`/worksheet-generators/${app.htmlFile}`}
                  target="_blank"
                  rel="noopener"
                  className="group bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-terracotta-400 rounded-lg p-4 md:p-5 transition-colors block"
                >
                  <h3 className="font-display font-semibold text-base md:text-lg text-ink-900 mb-1 group-hover:text-terracotta-600 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-sm text-ink-500 mb-3">
                    {categoryLabel}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
                    {t('cardCta')}
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
