/* eslint-disable @next/next/no-img-element */
/**
 * Section H: Platform Mockup
 * Worksheet inside a CSS-only Etsy listing or KDP book frame.
 * Makes the product feel real in its selling context. Category 2 posts.
 */

import type { ImageRef } from '@/config/blog-visual-sections/types';
import { imgUrl } from '@/config/showcase-i18n';
import { worksheetAltText, appDisplayName } from '@/config/blog-visual-sections/alt-text';

interface PlatformMockupProps {
  platform: 'etsy' | 'kdp';
  image: ImageRef;
  locale: string;
}

const etsyHeading: Record<string, string> = {
  en: 'How It Looks on Etsy', de: 'So sieht es auf Etsy aus', fr: 'Comment ça apparaît sur Etsy',
  es: 'Cómo se ve en Etsy', pt: 'Como aparece no Etsy', it: 'Come appare su Etsy',
  nl: 'Zo ziet het eruit op Etsy', sv: 'Så ser det ut på Etsy', da: 'Sådan ser det ud på Etsy',
  no: 'Slik ser det ut på Etsy', fi: 'Näin se näyttää Etsyssä',
};

const kdpHeading: Record<string, string> = {
  en: 'How It Looks as a KDP Book', de: 'So sieht es als KDP-Buch aus', fr: 'Comment ça apparaît en livre KDP',
  es: 'Cómo se ve como libro KDP', pt: 'Como aparece como livro KDP', it: 'Come appare come libro KDP',
  nl: 'Zo ziet het eruit als KDP-boek', sv: 'Så ser det ut som KDP-bok', da: 'Sådan ser det ud som KDP-bog',
  no: 'Slik ser det ut som KDP-bok', fi: 'Näin se näyttää KDP-kirjana',
};

function EtsyFrame({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <div className="max-w-sm mx-auto">
      {/* Etsy-style card */}
      <div className="rounded-xl shadow-xl bg-white border border-gray-200 overflow-hidden">
        {/* Browser-like header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 ml-2 px-3 py-1 bg-white rounded text-xs text-gray-400 border border-gray-200 font-mono truncate">
            etsy.com/listing/...
          </div>
        </div>

        {/* Worksheet image */}
        <div className="p-3">
          {children}
        </div>

        {/* Etsy-style listing info */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">(127)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">$4.99</span>
            <span className="text-xs text-gray-500 line-through">$9.99</span>
            <span className="text-xs font-semibold text-emerald-600">(50% off)</span>
          </div>
          <div className="mt-2 px-4 py-2 bg-gray-900 text-white text-center text-sm font-semibold rounded-full">
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}

function KdpFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xs mx-auto">
      {/* Book-like frame */}
      <div className="relative">
        {/* Book spine shadow */}
        <div className="absolute left-0 top-2 bottom-2 w-4 bg-gradient-to-r from-gray-400 to-transparent rounded-l-sm z-10" />
        {/* Book cover */}
        <div className="rounded-r-lg rounded-l-sm shadow-2xl bg-white border border-gray-300 overflow-hidden ml-2" style={{ perspective: '800px', transform: 'rotateY(-3deg)' }}>
          <div className="p-2">
            {children}
          </div>
          {/* Book bottom */}
          <div className="px-3 py-2 bg-gray-100 border-t border-gray-200 text-center">
            <span className="text-xs font-medium text-gray-600">Amazon KDP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformMockup({ platform, image, locale }: PlatformMockupProps) {
  const heading = platform === 'etsy'
    ? (etsyHeading[locale] || etsyHeading.en)
    : (kdpHeading[locale] || kdpHeading.en);
  const appName = appDisplayName(image.appFolder);

  const worksheetImg = (
    <img
      src={imgUrl(image.appFolder, image.filename, locale)}
      alt={worksheetAltText(locale, appName, platform === 'etsy' ? 'Etsy listing' : 'KDP book')}
      width={400}
      height={566}
      className="w-full h-auto rounded"
      loading="lazy"
      decoding="async"
      style={{ aspectRatio: '400/566' }}
    />
  );

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
          {heading}
        </h3>
        {platform === 'etsy' ? (
          <EtsyFrame locale={locale}>{worksheetImg}</EtsyFrame>
        ) : (
          <KdpFrame>{worksheetImg}</KdpFrame>
        )}
      </div>
    </section>
  );
}
