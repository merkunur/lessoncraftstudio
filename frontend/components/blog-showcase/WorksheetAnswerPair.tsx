/* eslint-disable @next/next/no-img-element */
/**
 * Section G: Worksheet + Answer Key Pair
 */

import type { ImageRef, AnswerKeyRef } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, resolveBlogAnswerKeyUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { worksheetAltText, answerKeyAltText } from '@/config/blog-visual-sections/alt-text';

interface WorksheetAnswerPairProps { worksheet: ImageRef; answerKey: AnswerKeyRef; locale: string }

const sectionHeading: Record<string, string> = {
  en: 'Every Worksheet Includes an Answer Key', de: 'Jedes Arbeitsblatt enthält einen Lösungsschlüssel',
  fr: 'Chaque fiche inclut un corrigé', es: 'Cada ficha incluye clave de respuestas',
  pt: 'Cada ficha inclui gabarito', it: 'Ogni scheda include la chiave di risposta',
  nl: 'Elk werkblad bevat een antwoordsleutel', sv: 'Varje arbetsblad innehåller facit',
  da: 'Hvert arbejdsark indeholder facit', no: 'Hvert arbeidsark inkluderer fasit',
  fi: 'Jokaisessa työarkissa on vastausavain',
};
const worksheetLabel: Record<string, string> = { en: 'Worksheet', de: 'Arbeitsblatt', fr: 'Fiche', es: 'Ficha', pt: 'Ficha', it: 'Scheda', nl: 'Werkblad', sv: 'Arbetsblad', da: 'Arbejdsark', no: 'Arbeidsark', fi: 'Työarkki' };
const answerKeyLabel: Record<string, string> = { en: 'Answer Key', de: 'Lösungsschlüssel', fr: 'Corrigé', es: 'Clave de respuestas', pt: 'Gabarito', it: 'Chiave di risposta', nl: 'Antwoordsleutel', sv: 'Facit', da: 'Facit', no: 'Fasit', fi: 'Vastausavain' };

export default function WorksheetAnswerPair({ worksheet, answerKey, locale }: WorksheetAnswerPairProps) {
  const appName = getAppLabel(worksheet.appKey);
  const wsLabel = worksheetLabel[locale] || worksheetLabel.en;
  const akLabel = answerKeyLabel[locale] || answerKeyLabel.en;

  return (
    <section className="py-10 md:py-14 bg-amber-50/50">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">{sectionHeading[locale] || sectionHeading.en}</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
          <figure className="w-full sm:w-5/12">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white border-2 border-amber-200">
              <img src={resolveBlogImageUrl(worksheet.appKey, worksheet.idx, locale)} alt={worksheetAltText(locale, appName, wsLabel)} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" style={{ aspectRatio: '400/566' }} />
            </div>
            <figcaption className="mt-2 text-center"><span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">{wsLabel}</span></figcaption>
          </figure>
          <div className="flex-shrink-0 text-amber-400" aria-hidden="true">
            <svg className="hidden sm:block w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            <svg className="block sm:hidden w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
          </div>
          <figure className="w-full sm:w-5/12">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white border-2 border-emerald-200">
              <img src={resolveBlogAnswerKeyUrl(answerKey.appKey, locale)} alt={answerKeyAltText(locale, appName)} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" style={{ aspectRatio: '400/566' }} />
            </div>
            <figcaption className="mt-2 text-center"><span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">{akLabel}</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
