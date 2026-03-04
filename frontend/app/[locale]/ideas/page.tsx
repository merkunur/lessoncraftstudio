import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { ideaPageSlugs, getIdeaSlugForLocale } from '@/config/idea-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Subcategories for niche ideas
const ideaSubcategories = [
  {
    id: 'age',
    name: 'By Age Group',
    description: 'Printable niches organized by target age group',
    ideaIds: new Set([
      'toddler-printable-ideas', 'preschool-printable-ideas', 'kindergarten-printable-ideas',
      'first-grade-printable-ideas', 'second-grade-printable-ideas', 'third-grade-printable-ideas',
      'middle-school-printable-ideas', 'adult-printable-ideas', 'senior-printable-ideas',
    ]),
  },
  {
    id: 'subject',
    name: 'By Subject',
    description: 'Printable niches organized by educational subject',
    ideaIds: new Set([
      'math-printable-ideas', 'reading-printable-ideas', 'science-printable-ideas',
      'social-studies-printable-ideas', 'art-printable-ideas', 'music-printable-ideas',
      'foreign-language-printable-ideas', 'life-skills-printable-ideas', 'stem-printable-ideas',
    ]),
  },
  {
    id: 'season',
    name: 'By Season & Holiday',
    description: 'Seasonal and holiday-themed printable niches',
    ideaIds: new Set([
      'back-to-school-printable-ideas', 'halloween-printable-ideas', 'christmas-printable-ideas',
      'valentines-day-printable-ideas', 'easter-printable-ideas', 'summer-printable-ideas',
      'thanksgiving-printable-ideas', 'new-year-printable-ideas', 'mothers-day-printable-ideas',
    ]),
  },
  {
    id: 'theme',
    name: 'By Theme',
    description: 'Popular themes for printable products',
    ideaIds: new Set([
      'animal-printable-ideas', 'dinosaur-printable-ideas', 'space-printable-ideas',
      'ocean-printable-ideas', 'farm-printable-ideas', 'unicorn-printable-ideas',
      'superhero-printable-ideas', 'princess-printable-ideas', 'sports-printable-ideas',
    ]),
  },
  {
    id: 'format',
    name: 'By Product Format',
    description: 'Different printable product formats and types',
    ideaIds: new Set([
      'worksheet-bundle-ideas', 'activity-book-ideas', 'flashcard-ideas',
      'poster-printable-ideas', 'planner-printable-ideas', 'game-printable-ideas',
      'craft-printable-ideas', 'journal-printable-ideas', 'calendar-printable-ideas',
    ]),
  },
];

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const title = 'Printable Business Niche Ideas | 45 Profitable Niches | LessonCraftStudio';
  const description = 'Discover 45 profitable printable business niches. Product ideas organized by age group, subject, season, theme, and format. Find your perfect niche for Etsy and KDP.';

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/ideas`;
  }
  alternates['x-default'] = `${baseUrl}/en/ideas`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/ideas`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/ideas`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default function IdeasListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Printable Business Niche Ideas
          </h1>
          <p className="text-lg text-gray-600">
            Find your perfect printable niche. 45 profitable ideas with product suggestions, platform tips, and pricing strategies.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {ideaSubcategories.map(subcat => {
            const ideas = ideaPageSlugs.filter(i => subcat.ideaIds.has(i.ideaId));
            if (ideas.length === 0) return null;

            return (
              <div key={subcat.id} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{subcat.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{subcat.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ideas.map(idea => {
                    const slug = getIdeaSlugForLocale(idea.ideaId, locale) || idea.slugs.en;
                    const displayName = idea.ideaId
                      .replace(/-printable-ideas$/, '')
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, c => c.toUpperCase());

                    return (
                      <Link
                        key={idea.ideaId}
                        href={`/${locale}/ideas/${slug}`}
                        className="p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all"
                      >
                        <span className="text-sm font-medium text-gray-900">{displayName}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Niche?</h2>
          <p className="text-amber-100 mb-8 max-w-lg mx-auto">
            Try all 33 printable generators free with watermark. No signup required.
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
          >
            Try Free Generators
          </Link>
        </div>
      </section>
    </div>
  );
}
