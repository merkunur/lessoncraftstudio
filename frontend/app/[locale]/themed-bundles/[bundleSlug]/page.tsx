import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { loadBundle, localizedBundleField } from '@/lib/bundles/bundle-loader';
import { loadTeachingPackage, localizedField } from '@/lib/teaching-packages/teaching-package-loader';

// Pillar 2 + Pillar 1 cross-pillar integration — bundle detail page.
// Per pillar-2-cycle-close-out.md: 48 themed bundles spanning 48 canonical-
// color themeAxisKeys; bundle composes 3-5 teaching packages around unifying
// theme. This page surfaces the bundle composition + links to each composed
// teaching package's detail page.
//
// Server-rendered; noindex robots metadata (subscriber-adjacent content).

export async function generateMetadata({
  params,
}: {
  params: { locale: string; bundleSlug: string };
}): Promise<Metadata> {
  const bundle = loadBundle(params.bundleSlug);
  if (!bundle) return { robots: { index: false, follow: false } };

  const title = localizedBundleField(bundle.title, params.locale);
  const description = localizedBundleField(bundle.description, params.locale);

  return {
    title: `${title} | LessonCraftStudio`,
    description: description.slice(0, 160),
    robots: { index: false, follow: false },
  };
}

export default async function BundleDetailPage({
  params,
}: {
  params: { locale: string; bundleSlug: string };
}) {
  const bundle = loadBundle(params.bundleSlug);
  if (!bundle) notFound();

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'bundlePage',
  });

  const title = localizedBundleField(bundle.title, params.locale);
  const description = localizedBundleField(bundle.description, params.locale);
  const thematicCoherence = localizedBundleField(bundle.thematicCoherence, params.locale);

  // Load composed teaching packages for cross-link rendering
  const composedPackages = bundle.teachingPackageSlugs.map((slug) => {
    const pkg = loadTeachingPackage(slug, params.locale);
    return { slug, pkg };
  });

  return (
    <main className="container mx-auto px-4 max-w-4xl py-12">
      <p className="text-xs text-ink-500 mb-6">
        <a href={`/${params.locale}`} className="hover:text-ink-700">
          {t('breadcrumb.home')}
        </a>
        {' › '}
        <span>{t('breadcrumb.bundles')}</span>
        {' › '}
        <span className="text-ink-700">{bundle.bundleSlug}</span>
      </p>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-wider text-ink-500 mb-2">
          {t('header.eyebrow')}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-4">
          {title}
        </h1>
        <p className="text-base md:text-lg text-ink-700 mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-100 text-sage-700 font-medium">
            {t('header.theme')}: {bundle.themeAxisKey}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-cream-200 text-ink-700 font-mono text-xs">
            {t('header.packageCount', { count: bundle.teachingPackageSlugs.length })}
          </span>
        </div>
      </header>

      {thematicCoherence && (
        <section className="mb-10 p-6 rounded-lg bg-cream-50 border border-cream-200">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-3">
            {t('coherence.heading')}
          </h2>
          <div className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">
            {thematicCoherence}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">
          {t('packages.heading')}
        </h2>
        <p className="text-sm text-ink-500 mb-4">{t('packages.subheading')}</p>
        <ol className="space-y-3">
          {composedPackages.map(({ slug, pkg }, idx) => {
            const pkgTitle = pkg ? localizedField(pkg.title, params.locale) : slug;
            const pkgDesc = pkg ? localizedField(pkg.description, params.locale) : '';
            return (
              <li
                key={slug}
                className="rounded-md border border-cream-300 bg-white overflow-hidden hover:border-sage-400 transition"
              >
                <a
                  href={`/${params.locale}/teaching-packages/${slug}`}
                  className="block p-4 group"
                >
                  <header className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <span className="text-sage-600 font-mono text-sm">{idx + 1}.</span>
                    <h3 className="font-display font-semibold text-ink-900 group-hover:text-sage-700 transition">
                      {pkgTitle}
                    </h3>
                  </header>
                  {pkgDesc && (
                    <p className="text-sm text-ink-700 line-clamp-3 leading-relaxed">
                      {pkgDesc}
                    </p>
                  )}
                  <p className="text-xs text-sage-600 mt-2 font-medium">
                    {t('packages.openPackage')} →
                  </p>
                </a>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
