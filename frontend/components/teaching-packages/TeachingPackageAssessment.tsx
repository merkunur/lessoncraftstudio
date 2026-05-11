import { getTranslations } from 'next-intl/server';
import type { TeachingPackage } from '@/lib/teaching-packages/teaching-package-loader';
import { localizedField } from '@/lib/teaching-packages/teaching-package-loader';

interface Props {
  pkg: TeachingPackage;
  locale: string;
}

export default async function TeachingPackageAssessment({ pkg, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.assessment' });
  const criteria = localizedField(pkg.assessmentCriteria, locale);

  if (!criteria) return null;

  return (
    <section className="mb-10 p-6 rounded-lg bg-sage-50 border border-sage-200">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-3">
        {t('heading')}
      </h2>
      <div className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">
        {criteria}
      </div>
    </section>
  );
}
