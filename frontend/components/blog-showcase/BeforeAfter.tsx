/* eslint-disable @next/next/no-img-element */
/**
 * Section C: Before/After Comparison
 */

import type { ImageRef } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { beforeAfterAltText } from '@/config/blog-visual-sections/alt-text';

interface BeforeAfterProps { lcsImage: ImageRef; locale: string }

const sectionHeading: Record<string, string> = {
  en: 'Generic vs Professional Worksheets', de: 'Generische vs. professionelle Arbeitsblätter',
  fr: 'Fiches génériques vs professionnelles', es: 'Fichas genéricas vs profesionales',
  pt: 'Fichas genéricas vs profissionais', it: 'Schede generiche vs professionali',
  nl: 'Generieke vs professionele werkbladen', sv: 'Generiska vs professionella arbetsblad',
  da: 'Generiske vs professionelle arbejdsark', no: 'Generiske vs profesjonelle arbeidsark',
  fi: 'Yleiset vs ammattimaiset työarkit',
};
const genericLabel: Record<string, string> = { en: 'Generic', de: 'Generisch', fr: 'Générique', es: 'Genérico', pt: 'Genérico', it: 'Generico', nl: 'Generiek', sv: 'Generisk', da: 'Generisk', no: 'Generisk', fi: 'Yleinen' };
const lcsLabel: Record<string, string> = { en: 'With LessonCraftStudio', de: 'Mit LessonCraftStudio', fr: 'Avec LessonCraftStudio', es: 'Con LessonCraftStudio', pt: 'Com LessonCraftStudio', it: 'Con LessonCraftStudio', nl: 'Met LessonCraftStudio', sv: 'Med LessonCraftStudio', da: 'Med LessonCraftStudio', no: 'Med LessonCraftStudio', fi: 'LessonCraftStudiolla' };

export default function BeforeAfter({ lcsImage, locale }: BeforeAfterProps) {
  const appName = getAppLabel(lcsImage.appKey);
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">{sectionHeading[locale] || sectionHeading.en}</h3>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-10 max-w-3xl mx-auto">
          <div className="flex-1 max-w-[280px] mx-auto sm:mx-0">
            <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6 h-full flex flex-col" style={{ filter: 'grayscale(100%) opacity(0.7)' }}>
              <div className="h-3 bg-gray-300 rounded w-3/4 mb-4" /><div className="h-2 bg-gray-200 rounded w-1/2 mb-6" />
              {Array.from({ length: 8 }).map((_, i) => (<div key={i} className="flex gap-2 mb-3"><div className="w-6 h-6 rounded bg-gray-200 flex-shrink-0" /><div className="flex-1 h-2.5 bg-gray-200 rounded self-center" /><div className="w-12 h-2.5 bg-gray-200 rounded self-center" /></div>))}
              <div className="mt-auto h-2 bg-gray-200 rounded w-2/3" />
            </div>
            <p className="mt-3 text-center"><span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-600 uppercase tracking-wide">{genericLabel[locale] || genericLabel.en}</span></p>
          </div>
          <div className="flex items-center justify-center flex-shrink-0"><span className="text-2xl font-black text-gray-300">VS</span></div>
          <div className="flex-1 max-w-[280px] mx-auto sm:mx-0">
            <div className="rounded-lg overflow-hidden shadow-xl border-2 border-emerald-300 ring-2 ring-emerald-100">
              <img src={resolveBlogImageUrl(lcsImage.appKey, lcsImage.idx, locale)} alt={beforeAfterAltText(locale, appName)} className="w-full h-auto" loading="lazy" decoding="async" />
            </div>
            <p className="mt-3 text-center"><span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">{lcsLabel[locale] || lcsLabel.en}</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
