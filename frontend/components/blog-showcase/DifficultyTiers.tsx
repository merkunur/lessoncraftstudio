/* eslint-disable @next/next/no-img-element */
/**
 * Section D: Difficulty Tier Showcase
 * Three columns showing beginner/intermediate/advanced worksheets.
 */

import type { ImageRef } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { worksheetAltText, getDifficultyLabels } from '@/config/blog-visual-sections/alt-text';

interface DifficultyTiersProps { beginner: ImageRef; intermediate: ImageRef; advanced: ImageRef; locale: string; accentColor: string }

const sectionHeading: Record<string, string> = {
  en: 'One Generator — Three Product Tiers', de: 'Ein Generator — drei Produktstufen',
  fr: 'Un générateur — trois niveaux de produits', es: 'Un generador — tres niveles de producto',
  pt: 'Um gerador — três níveis de produto', it: 'Un generatore — tre livelli di prodotto',
  nl: 'Eén generator — drie productniveaus', sv: 'En generator — tre produktnivåer',
  da: 'En generator — tre produktniveauer', no: 'En generator — tre produktnivåer',
  fi: 'Yksi generaattori — kolme tuotetasoa',
};
const subtitleText: Record<string, string> = {
  en: 'Create an entire product line from a single tool', de: 'Erstellen Sie eine komplette Produktlinie mit einem einzigen Tool',
  fr: 'Créez une gamme complète de produits avec un seul outil', es: 'Crea una línea de productos completa con una sola herramienta',
  pt: 'Crie uma linha de produtos completa com uma única ferramenta', it: 'Crea un\'intera linea di prodotti con un solo strumento',
  nl: 'Maak een complete productlijn met één tool', sv: 'Skapa en komplett produktlinje med ett enda verktyg',
  da: 'Skab en komplet produktlinje med ét enkelt værktøj', no: 'Lag en komplett produktlinje med ett verktøy',
  fi: 'Luo kokonainen tuotelinja yhdellä työkalulla',
};
const progressionLabel: Record<string, string> = {
  en: 'Increasing difficulty', de: 'Steigender Schwierigkeitsgrad', fr: 'Difficulté croissante',
  es: 'Dificultad creciente', pt: 'Dificuldade crescente', it: 'Difficoltà crescente',
  nl: 'Toenemende moeilijkheid', sv: 'Ökande svårighet', da: 'Stigende sværhedsgrad',
  no: 'Stigende vanskelighetsgrad', fi: 'Kasvava vaikeusaste',
};

const tierGradients = ['from-green-400 to-emerald-500', 'from-blue-400 to-indigo-500', 'from-purple-400 to-violet-500'];
const tierBorders = ['border-green-200', 'border-blue-200', 'border-purple-200'];

export default function DifficultyTiers({ beginner, intermediate, advanced, locale }: DifficultyTiersProps) {
  const labels = getDifficultyLabels(locale);
  const appName = getAppLabel(beginner.appKey);
  const tiers = [
    { image: beginner, label: labels[0], stars: 1 },
    { image: intermediate, label: labels[1], stars: 2 },
    { image: advanced, label: labels[2], stars: 3 },
  ];

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{sectionHeading[locale] || sectionHeading.en}</h3>
          <p className="text-gray-600 max-w-lg mx-auto">{subtitleText[locale] || subtitleText.en}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r ${tierGradients[i]} text-white font-bold text-xs shadow-md mb-3`}>
                {Array.from({ length: 3 }).map((_, si) => (
                  <svg key={si} className={`w-3.5 h-3.5 ${si < tier.stars ? 'opacity-100' : 'opacity-30'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1 uppercase tracking-wide">{tier.label}</span>
              </div>
              <div className={`rounded-lg overflow-hidden shadow-lg bg-white border-2 ${tierBorders[i]} w-full`}>
                <img src={resolveBlogImageUrl(tier.image.appKey, tier.image.idx, locale)} alt={worksheetAltText(locale, appName, tier.label)} className="w-full h-auto" loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex justify-center gap-2 mt-4">
          <span className="text-gray-400 text-2xl">&#8594;</span>
          <span className="text-gray-400 text-sm font-medium self-center">{progressionLabel[locale] || progressionLabel.en}</span>
          <span className="text-gray-400 text-2xl">&#8594;</span>
        </div>
      </div>
    </section>
  );
}
