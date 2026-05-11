import { getTranslations } from 'next-intl/server';
import { findBundlesForPackage, localizedBundleField } from '@/lib/bundles/bundle-loader';

interface Props {
  packageSlug: string;
  locale: string;
}

export default async function TeachingPackageBundleContext({ packageSlug, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.bundleContext' });
  const bundles = findBundlesForPackage(packageSlug);

  if (bundles.length === 0) return null;

  return (
    <section className="mb-10 p-6 rounded-lg bg-sage-50 border border-sage-200">
      <h2 className="font-display text-sm font-semibold text-ink-700 mb-2 uppercase tracking-wide">
        {t('heading', { count: bundles.length })}
      </h2>
      <p className="text-xs text-ink-500 mb-4">{t('subheading')}</p>
      <ul className="flex flex-wrap gap-2">
        {bundles.map((bundle) => {
          const title = localizedBundleField(bundle.title, locale);
          return (
            <li key={bundle.bundleSlug}>
              <a
                href={`/${locale}/themed-bundles/${bundle.bundleSlug}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-sage-300 text-ink-700 text-sm hover:border-sage-500 hover:text-sage-700 transition"
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
