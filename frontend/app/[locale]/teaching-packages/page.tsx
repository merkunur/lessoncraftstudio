import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { getTranslations } from 'next-intl/server';
import { loadTeachingPackage, localizedField } from '@/lib/teaching-packages/teaching-package-loader';

// /[locale]/teaching-packages/ — Lesson plans (Teaching packages) category
// landing per commission 2026-05-17 §8.1 4-card homepage restructure.
// Companion landing to the existing per-package route at
// /[locale]/teaching-packages/[packageSlug]/.
//
// v1 content shape: build-time scan of docs/lesson-plans/packages/, render
// first N alphabetically as cards linking to per-package pages. Per-package
// title pulled from package.yaml via loadTeachingPackage() with locale fallback
// to en.

const BASE_URL = 'https://www.lessoncraftstudio.com';

// Resolves to <repo-root>/docs/lesson-plans/packages/ regardless of CWD.
// Mirrors the resolution pattern in lib/teaching-packages/teaching-package-loader.ts.
function packagesRoot(): string | null {
  // Walk up from frontend/app/[locale]/teaching-packages/page.tsx looking for
  // a sibling docs/ directory at the repo root.
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(dir, 'docs', 'lesson-plans', 'packages');
    if (fs.existsSync(candidate)) return candidate;
    dir = path.dirname(dir);
  }
  return null;
}

// Cap render at first N packages to keep landing page-load bounded.
// Operator decides if pagination / search is needed later.
const PACKAGE_LIST_CAP = 36;

interface PackageEntry {
  slug: string;
  title: string;
  description: string;
}

function listTeachingPackages(locale: string): PackageEntry[] {
  const root = packagesRoot();
  if (!root) return [];
  let entries: string[];
  try {
    entries = fs.readdirSync(root);
  } catch {
    return [];
  }
  // Filter to directories matching the kebab-case slug pattern.
  const slugs = entries.filter(e => /^[a-z0-9-]+$/.test(e)).sort();
  const result: PackageEntry[] = [];
  for (const slug of slugs.slice(0, PACKAGE_LIST_CAP)) {
    try {
      const pkg = loadTeachingPackage(slug, locale);
      if (!pkg) continue;
      const title = localizedField(pkg.title, locale) || slug;
      const description = localizedField(pkg.description, locale) || '';
      // Truncate description to ~160 chars for card preview.
      const shortDesc = description.length > 160
        ? description.slice(0, 157).trimEnd() + '…'
        : description;
      result.push({ slug, title, description: shortDesc });
    } catch {
      // Skip packages that fail to load.
    }
  }
  return result;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.teachingPackages' });
  return {
    title: `${t('title')} | LessonCraftStudio`,
    description: t('description'),
    alternates: { canonical: `${BASE_URL}/${locale}/teaching-packages/` },
    robots: { index: false, follow: true },
  };
}

export default async function TeachingPackagesIndexPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.teachingPackages' });

  const packages = listTeachingPackages(locale);

  return (
    <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed max-w-3xl mb-12">
        {t('description')}
      </p>

      {packages.length === 0 ? (
        <p className="text-base text-ink-500">Packages loading — check back shortly.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {packages.map(pkg => (
            <Link
              key={pkg.slug}
              href={`/${locale}/teaching-packages/${pkg.slug}`}
              className="block bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-cream-400 rounded-lg p-5 md:p-6 transition-colors"
            >
              <h3 className="font-display font-semibold text-base md:text-lg text-ink-900 mb-2 leading-snug">
                {pkg.title}
              </h3>
              {pkg.description && (
                <p className="text-sm text-ink-600 leading-relaxed">
                  {pkg.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
