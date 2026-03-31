/* eslint-disable @next/next/no-img-element */
/**
 * Section J: CTA with Sample
 * Rotated worksheet sample next to a CTA text block and button.
 */

import Link from 'next/link';
import type { ImageRef } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { ctaAltText } from '@/config/blog-visual-sections/alt-text';

interface CtaWithSampleProps {
  image: ImageRef;
  locale: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

const exploreAllLabel: Record<string, string> = {
  en: 'Explore All 33 Generators', de: 'Alle 33 Generatoren entdecken',
  fr: 'Voir les 33 générateurs', es: 'Explorar los 33 generadores',
  pt: 'Explorar os 33 geradores', it: 'Esplora tutti i 33 generatori',
  nl: 'Alle 33 generators bekijken', sv: 'Utforska alla 33 generatorer',
  da: 'Udforsk alle 33 generatorer', no: 'Utforsk alle 33 generatorer',
  fi: 'Tutustu kaikkiin 33 generaattoriin',
};

export default function CtaWithSample({ image, locale, ctaHeading, ctaDescription, ctaButtonText, ctaButtonUrl }: CtaWithSampleProps) {
  const appName = getAppLabel(image.appKey);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-emerald-600 to-emerald-700 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="flex-shrink-0 w-48 md:w-56">
            <div className="rounded-lg overflow-hidden shadow-2xl bg-white border-2 border-white/30" style={{ transform: 'rotate(-5deg)' }}>
              <img
                src={resolveBlogImageUrl(image.appKey, image.idx, locale)}
                alt={ctaAltText(locale, appName)}
                className="w-full h-auto"
                loading="lazy" decoding="async"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{ctaHeading}</h2>
            <p className="text-emerald-100 mb-6 text-lg max-w-md">{ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href={`/${locale}${ctaButtonUrl}`} className="inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg">
                {ctaButtonText}
              </Link>
              <Link href={`/${locale}/apps`} className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                {exploreAllLabel[locale] || exploreAllLabel.en}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
