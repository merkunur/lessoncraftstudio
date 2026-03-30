/* eslint-disable @next/next/no-img-element */
/**
 * Section F: Bundle Visualization
 * Fanned stack of 3-5 worksheet pages with a page-count badge.
 * Visual volume that communicates bundle value for Category 2 posts.
 */

import type { ImageRef } from '@/config/blog-visual-sections/types';
import { imgUrl } from '@/config/showcase-i18n';
import { worksheetAltText, appDisplayName } from '@/config/blog-visual-sections/alt-text';

interface BundleVisualizationProps {
  images: ImageRef[];
  pageCount: number;
  locale: string;
}

const sectionHeading: Record<string, string> = {
  en: 'Bundle Products Sell Better',
  de: 'Pakete verkaufen sich besser',
  fr: 'Les packs se vendent mieux',
  es: 'Los paquetes se venden mejor',
  pt: 'Pacotes vendem mais',
  it: 'I pacchetti vendono di più',
  nl: 'Bundels verkopen beter',
  sv: 'Paket säljer bättre',
  da: 'Pakker sælger bedre',
  no: 'Pakker selger bedre',
  fi: 'Paketit myyvät paremmin',
};

const pagesLabel: Record<string, string> = {
  en: '{n} Pages', de: '{n} Seiten', fr: '{n} Pages', es: '{n} Páginas',
  pt: '{n} Páginas', it: '{n} Pagine', nl: '{n} Pagina\'s', sv: '{n} Sidor',
  da: '{n} Sider', no: '{n} Sider', fi: '{n} Sivua',
};

export default function BundleVisualization({ images, pageCount, locale }: BundleVisualizationProps) {
  const heading = sectionHeading[locale] || sectionHeading.en;
  const pageLabel = (pagesLabel[locale] || pagesLabel.en).replace('{n}', String(pageCount));
  const displayed = images.slice(0, 5);

  // Each card gets progressively more rotation and offset
  const transforms = [
    'rotate(-8deg) translateX(-20px)',
    'rotate(-4deg) translateX(-10px)',
    'rotate(0deg)',
    'rotate(4deg) translateX(10px)',
    'rotate(8deg) translateX(20px)',
  ];

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-10">
          {heading}
        </h3>

        {/* Fanned stack */}
        <div className="relative flex items-center justify-center h-[340px] md:h-[420px] max-w-md mx-auto">
          {displayed.map((img, i) => {
            const appName = appDisplayName(img.appFolder);
            const zIndex = i === Math.floor(displayed.length / 2) ? 10 : displayed.length - Math.abs(i - Math.floor(displayed.length / 2));
            return (
              <div
                key={i}
                className="absolute w-[180px] md:w-[220px] rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200"
                style={{
                  transform: transforms[i] || 'rotate(0deg)',
                  zIndex,
                }}
              >
                <img
                  src={imgUrl(img.appFolder, img.filename, locale)}
                  alt={worksheetAltText(locale, appName, `bundle page ${i + 1}`)}
                  width={400}
                  height={566}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: '400/566' }}
                />
              </div>
            );
          })}

          {/* Page count badge — floating */}
          <div className="absolute -bottom-2 right-4 md:right-8 z-20">
            <div className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-lg">
              {pageLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
