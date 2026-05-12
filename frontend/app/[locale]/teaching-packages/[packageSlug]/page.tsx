import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { loadTeachingPackage, listAvailableLocales, localizedField } from '@/lib/teaching-packages/teaching-package-loader';
import TeachingPackageHeader from '@/components/teaching-packages/TeachingPackageHeader';
import TeachingPackageTaxonomy from '@/components/teaching-packages/TeachingPackageTaxonomy';
import TeachingPackageStructure from '@/components/teaching-packages/TeachingPackageStructure';
import TeachingPackageExerciseList from '@/components/teaching-packages/TeachingPackageExerciseList';
import TeachingPackageMaterialsList from '@/components/teaching-packages/TeachingPackageMaterialsList';
import TeachingPackageAssessment from '@/components/teaching-packages/TeachingPackageAssessment';
import TeachingPackageFlashcardsSection from '@/components/teaching-packages/TeachingPackageFlashcardsSection';
import TeachingPackageLocaleVariants from '@/components/teaching-packages/TeachingPackageLocaleVariants';
import TeachingPackageBundleContext from '@/components/teaching-packages/TeachingPackageBundleContext';
import TeachingPackagePictureCardsSection from '@/components/teaching-packages/TeachingPackagePictureCardsSection';
import TeachingPackageNumeralCardsSection from '@/components/teaching-packages/TeachingPackageNumeralCardsSection';
import TeachingPackageManipulativeCutOutsSection from '@/components/teaching-packages/TeachingPackageManipulativeCutOutsSection';
import TeachingPackageAnswerKeySection from '@/components/teaching-packages/TeachingPackageAnswerKeySection';
import TeachingPackageParentLetterSection from '@/components/teaching-packages/TeachingPackageParentLetterSection';
import TeachingPackageSentenceStripsSection from '@/components/teaching-packages/TeachingPackageSentenceStripsSection';
import TeachingPackageMatchingMatSection from '@/components/teaching-packages/TeachingPackageMatchingMatSection';

// Pillar 1 + Pillar 2 + Pillar 4 evaluation-surface commission Phase 2.
// Per-package teaching-package detail surface composing the full canonical
// schema (header + taxonomy + structure + exercises + materials + assessment)
// + embedding existing FlashcardPackageReader for the flashcards section.
//
// Server-rendered for SSR + SEO. Server-side loads docs/lesson-plans/packages/
// <slug>/package.yaml via teaching-package-loader; defends against unknown
// slugs via notFound().
//
// Subscriber-gated content surface: noindex robots metadata (mirrors
// /[locale]/flashcards/[packageSlug] pattern). Free-tier C5 allowlist works
// without auth via FlashcardPackageReader's client-side gating.

export async function generateMetadata({
  params,
}: {
  params: { locale: string; packageSlug: string };
}): Promise<Metadata> {
  const pkg = loadTeachingPackage(params.packageSlug, params.locale);
  if (!pkg) return { robots: { index: false, follow: false } };

  const title = localizedField(pkg.title, params.locale);
  const description = localizedField(pkg.description, params.locale);

  return {
    title: `${title} | LessonCraftStudio`,
    description: description.slice(0, 160),
    robots: { index: false, follow: false },
  };
}

export default async function TeachingPackageDetailPage({
  params,
}: {
  params: { locale: string; packageSlug: string };
}) {
  const pkg = loadTeachingPackage(params.packageSlug, params.locale);
  if (!pkg) notFound();

  const availableLocales = listAvailableLocales(params.packageSlug);

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'teachingPackagePage',
  });

  return (
    <main className="container mx-auto px-4 max-w-4xl py-12">
      <p className="text-xs text-ink-500 mb-6">
        <a href={`/${params.locale}`} className="hover:text-ink-700">
          {t('breadcrumb.home')}
        </a>
        {' › '}
        <span>{t('breadcrumb.teachingPackages')}</span>
        {' › '}
        <span className="text-ink-700">{pkg.targetSlug}</span>
      </p>

      <TeachingPackageHeader pkg={pkg} locale={params.locale} />
      <TeachingPackageLocaleVariants
        slug={pkg.targetSlug}
        currentLocale={params.locale}
        availableLocales={availableLocales}
      />
      <TeachingPackageTaxonomy pkg={pkg} locale={params.locale} />
      <TeachingPackageStructure pkg={pkg} locale={params.locale} />
      <TeachingPackageExerciseList pkg={pkg} locale={params.locale} />
      <TeachingPackageMaterialsList pkg={pkg} locale={params.locale} />
      <TeachingPackageAssessment pkg={pkg} locale={params.locale} />
      <TeachingPackageFlashcardsSection
        locale={params.locale}
        packageSlug={pkg.targetSlug}
      />
      {(() => {
        const pcMaterial = pkg.materials.find((m) => m.materialSlug === 'picture-cards');
        if (!pcMaterial) return null;
        const cpp = (pcMaterial.customizationParameters?.cardsPerPage as number | undefined) || 6;
        return (
          <TeachingPackagePictureCardsSection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
            cardsPerPage={cpp}
          />
        );
      })()}
      {(() => {
        const ncMaterial = pkg.materials.find((m) => m.materialSlug === 'numeral-cards');
        if (!ncMaterial) return null;
        const cpp = (ncMaterial.customizationParameters?.cardsPerPage as number | undefined) || 4;
        return (
          <TeachingPackageNumeralCardsSection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
            cardsPerPage={cpp}
          />
        );
      })()}
      {(() => {
        const mcoMaterial = pkg.materials.find((m) => m.materialSlug === 'manipulative-cut-outs');
        if (!mcoMaterial) return null;
        const ic = mcoMaterial.customizationParameters?.itemCount as number | undefined;
        const is = mcoMaterial.customizationParameters?.itemSize as string | undefined;
        return (
          <TeachingPackageManipulativeCutOutsSection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
            itemCount={ic}
            itemSize={is}
          />
        );
      })()}
      {(() => {
        const akMaterial = pkg.materials.find((m) => m.materialSlug === 'answer-key');
        if (!akMaterial) return null;
        return (
          <TeachingPackageAnswerKeySection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
          />
        );
      })()}
      {(() => {
        const plMaterial = pkg.materials.find((m) => m.materialSlug === 'parent-take-home-letter');
        if (!plMaterial) return null;
        return (
          <TeachingPackageParentLetterSection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
          />
        );
      })()}
      {(() => {
        const ssMaterial = pkg.materials.find((m) => m.materialSlug === 'sentence-strips');
        if (!ssMaterial) return null;
        return (
          <TeachingPackageSentenceStripsSection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
          />
        );
      })()}
      {(() => {
        const mmMaterial = pkg.materials.find((m) => m.materialSlug === 'matching-mat');
        if (!mmMaterial) return null;
        const pc = mmMaterial.customizationParameters?.pairCount as number | undefined;
        return (
          <TeachingPackageMatchingMatSection
            locale={params.locale}
            packageSlug={pkg.targetSlug}
            pairCount={pc}
          />
        );
      })()}
      <TeachingPackageBundleContext
        packageSlug={pkg.targetSlug}
        locale={params.locale}
      />
    </main>
  );
}
