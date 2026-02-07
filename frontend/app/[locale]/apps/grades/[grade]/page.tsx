import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap, generateFAQSchema, localizedHomeLabel, localizedAppsLabel } from '@/lib/schema-generator';
import { gradeContent, GRADE_SLUGS, type GradeSlug } from '@/config/grade-content';
import { productPageSlugs } from '@/config/product-page-slugs';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';

export const revalidate = 3600;

export function generateStaticParams() {
  const params: { locale: string; grade: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const grade of GRADE_SLUGS) {
      params.push({ locale, grade });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { locale: string; grade: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const grade = params.grade as GradeSlug;
  const baseUrl = 'https://www.lessoncraftstudio.com';

  if (!GRADE_SLUGS.includes(grade)) return {};

  const content = gradeContent[grade]?.[locale] || gradeContent[grade]?.en;
  if (!content) return {};

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/grades/${grade}`;
  }

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/apps/grades/${grade}`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'website',
      url: `${baseUrl}/${locale}/apps/grades/${grade}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

export default function GradePage({ params }: { params: { locale: string; grade: string } }) {
  const locale = params.locale || 'en';
  const grade = params.grade as GradeSlug;

  if (!GRADE_SLUGS.includes(grade)) notFound();

  const content = gradeContent[grade]?.[locale] || gradeContent[grade]?.en;
  if (!content) notFound();

  const faqSchema = generateFAQSchema(content.faq, locale);

  const apps = content.appIds.map(appId => {
    const slug = getSlugForLocale(appId, locale as SupportedLocale) || appId;
    return { appId, slug };
  });

  const viewAllLabel: Record<string, string> = {
    en: 'View All 33 Apps',
    de: 'Alle 33 Apps ansehen',
    fr: 'Voir les 33 applications',
    es: 'Ver las 33 aplicaciones',
    pt: 'Ver todos os 33 aplicativos',
    it: 'Vedi tutte le 33 app',
    nl: 'Bekijk alle 33 apps',
    sv: 'Visa alla 33 appar',
    da: 'Se alle 33 apps',
    no: 'Se alle 33 apper',
    fi: 'N\u00e4yt\u00e4 kaikki 33 sovellusta',
  };

  const tryNowLabel: Record<string, string> = {
    en: 'Try Now',
    de: 'Jetzt testen',
    fr: 'Essayer',
    es: 'Probar ahora',
    pt: 'Experimentar',
    it: 'Prova ora',
    nl: 'Probeer nu',
    sv: 'Prova nu',
    da: 'Pr\u00f8v nu',
    no: 'Pr\u00f8v n\u00e5',
    fi: 'Kokeile nyt',
  };

  const faqHeading: Record<string, string> = {
    en: 'Frequently Asked Questions',
    de: 'H\u00e4ufig gestellte Fragen',
    fr: 'Questions fr\u00e9quentes',
    es: 'Preguntas frecuentes',
    pt: 'Perguntas frequentes',
    it: 'Domande frequenti',
    nl: 'Veelgestelde vragen',
    sv: 'Vanliga fr\u00e5gor',
    da: 'Ofte stillede sp\u00f8rgsm\u00e5l',
    no: 'Ofte stilte sp\u00f8rsm\u00e5l',
    fi: 'Usein kysytyt kysymykset',
  };

  const appDisplayNames: Record<string, string> = {
    'image-addition': 'Image Addition',
    'math-worksheet': 'Math Worksheets',
    'chart-count-color': 'Chart Count & Color',
    'code-addition': 'Code Addition',
    'math-puzzle': 'Math Puzzle',
    'more-less': 'More or Less',
    'subtraction': 'Subtraction',
    'alphabet-train': 'Alphabet Train',
    'word-scramble': 'Word Scramble',
    'prepositions': 'Prepositions',
    'writing-app': 'Writing Practice',
    'word-search': 'Word Search',
    'image-crossword': 'Image Crossword',
    'word-guess': 'Word Guess',
    'coloring': 'Coloring Pages',
    'draw-and-color': 'Draw and Color',
    'sudoku': 'Sudoku for Kids',
    'image-cryptogram': 'Image Cryptogram',
    'odd-one-out': 'Odd One Out',
    'picture-path': 'Picture Pathway',
    'find-and-count': 'Find and Count',
    'find-objects': 'Find Objects',
    'missing-pieces': 'Missing Pieces',
    'matching-app': 'MatchUp Maker',
    'grid-match': 'Grid Match',
    'shadow-match': 'Shadow Match',
    'picture-sort': 'Picture Sort',
    'drawing-lines': 'Drawing Lines',
    'pattern-train': 'Pattern Train',
    'pattern-worksheet': 'Pattern Worksheets',
    'picture-bingo': 'Picture Bingo',
    'big-small-app': 'Big or Small',
    'treasure-hunt': 'Treasure Hunt',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: content.heading,
          description: content.description,
          url: `https://www.lessoncraftstudio.com/${locale}/apps/grades/${grade}`,
          inLanguage: getHreflangCode(locale),
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'student',
            suggestedAge: content.ageRange,
          },
          isPartOf: {
            '@type': 'WebSite',
            name: 'LessonCraftStudio',
            url: 'https://www.lessoncraftstudio.com',
          },
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
            { '@type': 'ListItem', position: 2, name: localizedAppsLabel[locale] || 'Apps', item: `https://www.lessoncraftstudio.com/${locale}/apps` },
            { '@type': 'ListItem', position: 3, name: content.name },
          ],
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-600 to-green-700 text-white py-14">
        <div className="container mx-auto px-4">
          <nav className="text-green-200 text-sm mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{localizedHomeLabel[locale] || 'Home'}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/apps`} className="hover:text-white">{localizedAppsLabel[locale] || 'Apps'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{content.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{content.heading}</h1>
          <p className="text-sm text-green-200 mb-4">{content.ageRange}</p>
          <p className="text-lg text-green-100 max-w-3xl">{content.intro}</p>
        </div>
      </section>

      {/* App Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apps.map(app => (
              <Link
                key={app.appId}
                href={`/${locale}/apps/${app.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {appDisplayNames[app.appId] || app.appId}
                </h3>
                <span className="mt-auto inline-flex items-center text-green-600 text-sm font-medium">
                  {tryNowLabel[locale] || tryNowLabel.en}
                  <span className="ml-1" aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/apps`}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {viewAllLabel[locale] || viewAllLabel.en}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content.faq.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {faqHeading[locale] || faqHeading.en}
            </h2>
            <div className="space-y-4">
              {content.faq.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900">
                    {item.question}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
