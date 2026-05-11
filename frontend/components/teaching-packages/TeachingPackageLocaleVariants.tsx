import { getTranslations } from 'next-intl/server';

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  nl: 'Nederlands',
  fr: 'Français',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
};

interface Props {
  slug: string;
  currentLocale: string;
  availableLocales: string[];
}

export default async function TeachingPackageLocaleVariants({
  slug,
  currentLocale,
  availableLocales,
}: Props) {
  const t = await getTranslations({ locale: currentLocale, namespace: 'teachingPackagePage.locales' });

  if (availableLocales.length <= 1) return null;

  return (
    <section className="mb-10 p-4 rounded-md bg-cream-50 border border-cream-200">
      <h2 className="font-display text-sm font-semibold text-ink-700 mb-2 uppercase tracking-wide">
        {t('heading')}
      </h2>
      <p className="text-xs text-ink-500 mb-3">{t('subheading')}</p>
      <div className="flex flex-wrap gap-2">
        {availableLocales.map((loc) => {
          const isCurrent = loc === currentLocale;
          return (
            <a
              key={loc}
              href={`/${loc}/teaching-packages/${slug}`}
              className={
                isCurrent
                  ? 'inline-flex items-center px-3 py-1 rounded-full bg-sage-500 text-cream-50 text-sm font-medium cursor-default'
                  : 'inline-flex items-center px-3 py-1 rounded-full bg-white border border-cream-300 text-ink-700 text-sm font-medium hover:border-sage-400 hover:text-sage-700 transition'
              }
              aria-current={isCurrent ? 'page' : undefined}
            >
              {LOCALE_NAMES[loc] ?? loc}
            </a>
          );
        })}
      </div>
    </section>
  );
}
