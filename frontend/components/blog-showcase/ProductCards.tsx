/* eslint-disable @next/next/no-img-element */
/**
 * Section B: Product Showcase Cards
 * Etsy-style cards with sample image, product name, CSS price badge, and star rating.
 */

import type { ProductCardItem } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { productCardAltText } from '@/config/blog-visual-sections/alt-text';

interface ProductCardsProps { items: ProductCardItem[]; locale: string }

const sectionHeading: Record<string, string> = {
  en: 'What Your Listings Could Look Like', de: 'So könnten Ihre Angebote aussehen',
  fr: 'Voici vos futures fiches produit', es: 'Así podrían verse tus listados',
  pt: 'Como seus anúncios poderiam ficar', it: 'Ecco come potrebbero apparire i tuoi annunci',
  nl: 'Zo kunnen uw advertenties eruitzien', sv: 'Så här kan dina annonser se ut',
  da: 'Sådan kunne dine opslag se ud', no: 'Slik kan annonsene dine se ut',
  fi: 'Näin ilmoituksesi voisivat näyttää',
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCards({ items, locale }: ProductCardsProps) {
  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">{sectionHeading[locale] || sectionHeading.en}</h3>
        <div className={`grid gap-5 max-w-4xl mx-auto ${items.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={resolveBlogImageUrl(item.image.appKey, item.image.idx, locale)} alt={productCardAltText(locale, getAppLabel(item.image.appKey), item.productName)} className="w-full h-auto" loading="lazy" decoding="async" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-2">{item.productName}</p>
                <StarRating count={item.stars} />
                <div className="mt-2"><span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-emerald-600 text-white">{item.price}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
