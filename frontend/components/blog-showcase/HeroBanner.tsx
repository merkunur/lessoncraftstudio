/* eslint-disable @next/next/no-img-element */
/**
 * Section A: Hero Sample Banner
 * Full-width section with 2-3 fanned/overlapping worksheet samples.
 * First image loads eagerly (LCP candidate), rest lazy.
 */

import type { ImageRef } from '@/config/blog-visual-sections/types';
import { resolveBlogImageUrl, getAppLabel } from '@/config/blog-visual-sections/image-resolver';
import { worksheetAltText } from '@/config/blog-visual-sections/alt-text';
import { getSectionLabel } from '@/config/section-labels';

interface HeroBannerProps {
  images: [ImageRef, ImageRef] | [ImageRef, ImageRef, ImageRef];
  accentColor: string;
  locale: string;
}

const gradients: Record<string, string> = {
  amber: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
  blue: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
  cyan: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)',
  emerald: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
  green: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
  indigo: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #c7d2fe 100%)',
  orange: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)',
  pink: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
  purple: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)',
  red: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 50%, #fca5a5 100%)',
  rose: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%)',
  sky: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
  teal: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
  violet: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)',
  yellow: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fef08a 100%)',
};

const borderColors: Record<string, string> = {
  amber: 'border-amber-200', blue: 'border-blue-200', cyan: 'border-cyan-200',
  emerald: 'border-emerald-200', green: 'border-green-200', indigo: 'border-indigo-200',
  orange: 'border-orange-200', pink: 'border-pink-200', purple: 'border-purple-200',
  red: 'border-red-200', rose: 'border-rose-200', sky: 'border-sky-200',
  teal: 'border-teal-200', violet: 'border-violet-200', yellow: 'border-yellow-200',
};

const badgeColors: Record<string, string> = {
  amber: 'text-amber-700', blue: 'text-blue-700', cyan: 'text-cyan-700',
  emerald: 'text-emerald-700', green: 'text-green-700', indigo: 'text-indigo-700',
  orange: 'text-orange-700', pink: 'text-pink-700', purple: 'text-purple-700',
  red: 'text-red-700', rose: 'text-rose-700', sky: 'text-sky-700',
  teal: 'text-teal-700', violet: 'text-violet-700', yellow: 'text-yellow-700',
};

export default function HeroBanner({ images, accentColor, locale }: HeroBannerProps) {
  const bg = gradients[accentColor] || gradients.emerald;
  const border = borderColors[accentColor] || 'border-emerald-200';
  const badge = badgeColors[accentColor] || 'text-emerald-700';
  const appName = getAppLabel(images[0].appKey);
  const hasThree = images.length === 3;

  return (
    <section className="relative overflow-hidden py-10 md:py-14" style={{ background: bg }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 ${badge} shadow-sm`}>
            {getSectionLabel('sampleWorksheets', locale)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-5 max-w-3xl mx-auto">
          <div className="w-1/3 max-w-[220px] flex-shrink-0" style={{ transform: 'rotate(-6deg) translateY(8px)' }}>
            <div className={`rounded-lg overflow-hidden shadow-lg bg-white border-2 ${border}`}>
              <img
                src={resolveBlogImageUrl(images[0].appKey, images[0].idx, locale)}
                alt={worksheetAltText(locale, appName, 'sample 1')}
                className="w-full h-auto"
                loading="eager" decoding="async" fetchPriority="high"
              />
            </div>
          </div>

          <div className="w-1/3 max-w-[240px] flex-shrink-0 z-10" style={{ transform: 'translateY(-8px)' }}>
            <div className={`rounded-lg overflow-hidden shadow-xl bg-white border-2 ${border}`}>
              <img
                src={resolveBlogImageUrl(images[1].appKey, images[1].idx, locale)}
                alt={worksheetAltText(locale, appName, 'sample 2')}
                className="w-full h-auto"
                loading="lazy" decoding="async"
              />
            </div>
          </div>

          {hasThree && images[2] && (
            <div className="w-1/3 max-w-[220px] flex-shrink-0" style={{ transform: 'rotate(6deg) translateY(8px)' }}>
              <div className={`rounded-lg overflow-hidden shadow-lg bg-white border-2 ${border}`}>
                <img
                  src={resolveBlogImageUrl(images[2].appKey, images[2].idx, locale)}
                  alt={worksheetAltText(locale, appName, 'sample 3')}
                  className="w-full h-auto"
                  loading="lazy" decoding="async"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
