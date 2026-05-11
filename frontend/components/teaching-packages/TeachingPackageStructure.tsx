import { getTranslations } from 'next-intl/server';
import type { TeachingPackage, StructurePhase } from '@/lib/teaching-packages/teaching-package-loader';

interface Props {
  pkg: TeachingPackage;
  locale: string;
}

const PHASE_ORDER: Array<keyof TeachingPackage['structure']> = [
  'warmup',
  'contentActivity',
  'scaffold',
  'closure',
];

export default async function TeachingPackageStructure({ pkg, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.structure' });

  const phases = PHASE_ORDER
    .map((key) => ({ key, phase: pkg.structure[key] as StructurePhase | undefined }))
    .filter((entry): entry is { key: keyof TeachingPackage['structure']; phase: StructurePhase } => Boolean(entry.phase));

  if (phases.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
        {t('heading')}
      </h2>
      <ol className="space-y-4">
        {phases.map(({ key, phase }, idx) => (
          <li
            key={key}
            className="p-4 rounded-md border border-cream-300 bg-white"
          >
            <header className="flex items-center justify-between mb-2 gap-3">
              <h3 className="font-display font-semibold text-ink-900">
                <span className="text-sage-600 font-mono mr-2">{idx + 1}.</span>
                {t(`phaseLabel.${key}`)}
              </h3>
              <span className="text-xs text-ink-500 whitespace-nowrap">
                {t('phaseDuration', { minutes: phase.durationMinutes })}
              </span>
            </header>
            <p className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">
              {phase.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
