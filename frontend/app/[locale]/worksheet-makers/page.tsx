import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ALL_APPS } from '@/config/products';

// /[locale]/worksheet-makers/ — Worksheet creators (Apps) category landing.
// Reopened publicly per operator's 2026-05-17 strategic lock §8.1; daily
// download-limits for free users ship in a downstream quota-system commission
// per §8.6 #3.
//
// v1 content shape: 29 §14.10 canonical apps as a card grid, grouped by
// category. Per-app marketing pages don't exist yet; clicking a card scrolls
// to its anchor on this page (no external link). Full per-app surface
// downstream.

const BASE_URL = 'https://www.lessoncraftstudio.com';

// §14.10 canonical 29-app list — the 4 PDF-only apps (coloring / writing /
// draw-and-color / drawing-lines) excluded since they're not catalog-shipping.
const PDF_ONLY_APPS = new Set(['coloring', 'writing', 'draw-and-color', 'drawing-lines']);

interface AppMeta {
  slug: string;
  name: string;
  category: string;
}

function listCatalogApps(): AppMeta[] {
  const apps: AppMeta[] = [];
  for (const [slug, meta] of Object.entries(ALL_APPS)) {
    if (PDF_ONLY_APPS.has(slug)) continue;
    apps.push({ slug, name: meta.name, category: meta.category });
  }
  // Stable sort: category then name.
  apps.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return apps;
}

// Category display order matches products.ts grouping (math / literacy /
// visual / matching / puzzle).
const CATEGORY_ORDER = ['math', 'literacy', 'visual', 'matching', 'puzzle'];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });
  return {
    title: `${t('title')} | LessonCraftStudio`,
    description: t('description'),
    alternates: { canonical: `${BASE_URL}/${locale}/worksheet-makers/` },
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
        return (
          <section key={category} className="mb-12">
            <h2 className="font-display font-semibold text-xl md:text-2xl text-ink-900 capitalize mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryApps.map(app => (
                <div
                  key={app.slug}
                  id={app.slug}
                  className="bg-cream-50 border border-cream-300 rounded-lg p-4 md:p-5"
                >
                  <h3 className="font-display font-semibold text-base md:text-lg text-ink-900 mb-1">
                    {app.name}
                  </h3>
                  <p className="text-sm text-ink-500 capitalize">
                    {category}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
