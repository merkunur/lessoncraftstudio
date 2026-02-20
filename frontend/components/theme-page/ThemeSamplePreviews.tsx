import { sectionSamplePreviews } from '@/config/theme-page-labels';

interface ThemeSamplePreviewsProps {
  images: string[];
  themeName: string;
  locale: string;
}

export default function ThemeSamplePreviews({ images, themeName, locale }: ThemeSamplePreviewsProps) {
  if (images.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {sectionSamplePreviews[locale] || sectionSamplePreviews.en}
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100 ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={src}
                alt={`${themeName} clipart ${i + 1}`}
                width={i === 0 ? 256 : 128}
                height={i === 0 ? 256 : 128}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
