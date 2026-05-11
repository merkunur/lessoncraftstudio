import { getTranslations } from 'next-intl/server';
import type { TeachingPackage } from '@/lib/teaching-packages/teaching-package-loader';
import { localizedField } from '@/lib/teaching-packages/teaching-package-loader';

interface Props {
  pkg: TeachingPackage;
  locale: string;
}

export default async function TeachingPackageHeader({ pkg, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.header' });
  const title = localizedField(pkg.title, locale);
  const description = localizedField(pkg.description, locale);

  return (
    <header className="mb-10">
      <p className="text-xs uppercase tracking-wider text-ink-500 mb-2">
        {t('eyebrow')}
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-4">
        {title}
      </h1>
      <p className="text-base md:text-lg text-ink-700 mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-100 text-sage-700 font-medium">
          {t('duration', { minutes: pkg.durationMinutes })}
        </span>
        {pkg.curriculumStandards.map((std) => (
          <span
            key={std}
            className="inline-flex items-center px-3 py-1 rounded-full bg-cream-200 text-ink-700 font-mono text-xs"
          >
            {std}
          </span>
        ))}
      </div>
    </header>
  );
}
