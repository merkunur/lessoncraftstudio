/* eslint-disable @next/next/no-img-element */
/**
 * Section E: Themed Image Grid — 8-12 sample images in responsive grid.
 */

import type { ImageRef } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { worksheetAltText } from '@/config/blog-visual-sections/alt-text';

interface ThemedGridProps { images: ImageRef[]; locale: string }

const sectionHeading: Record<string, string> = {
  en: 'Endless Variety of Themes', de: 'Endlose Themenvielfalt', fr: 'Une variété infinie de thèmes',
  es: 'Variedad infinita de temas', pt: 'Variedade infinita de temas', it: 'Infinita varietà di temi',
  nl: 'Eindeloze variatie aan thema\'s', sv: 'Oändlig variation av teman', da: 'Endeløs variation af temaer',
  no: 'Uendelig variasjon av temaer', fi: 'Loputon teemavalikoima',
};
const subtitleText: Record<string, string> = {
  en: 'Mix and match across 33 generators to create unique products', de: 'Kombinieren Sie 33 Generatoren für einzigartige Produkte',
  fr: 'Combinez 33 générateurs pour créer des produits uniques', es: 'Combina 33 generadores para crear productos únicos',
  pt: 'Combine 33 geradores para criar produtos únicos', it: 'Combina 33 generatori per creare prodotti unici',
  nl: 'Combineer 33 generators voor unieke producten', sv: 'Kombinera 33 generatorer för unika produkter',
  da: 'Kombiner 33 generatorer til unikke produkter', no: 'Kombiner 33 generatorer for unike produkter',
  fi: 'Yhdistä 33 generaattoria ainutlaatuisiksi tuotteiksi',
};

export default function ThemedGrid({ images, locale }: ThemedGridProps) {
  const displayed = images.slice(0, 12);
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{sectionHeading[locale] || sectionHeading.en}</h3>
          <p className="text-gray-600 max-w-lg mx-auto text-sm">{subtitleText[locale] || subtitleText.en}</p>
        </div>
        <div className={`grid gap-3 max-w-4xl mx-auto ${displayed.length <= 6 ? 'grid-cols-2 sm:grid-cols-3' : displayed.length <= 9 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
          {displayed.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition-shadow">
              <img src={resolveBlogImageUrl(img.appKey, img.idx, locale)} alt={worksheetAltText(locale, getAppLabel(img.appKey), `theme ${i + 1}`)} className="w-full h-auto" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
