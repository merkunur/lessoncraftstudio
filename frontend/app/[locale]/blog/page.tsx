import { Metadata } from 'next';
import Link from 'next/link';
import { blogPageSlugs, getBlogSlugForLocale } from '@/config/blog-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap, localizedHomeLabel } from '@/lib/schema-generator';
import { getSectionLabel } from '@/config/section-labels';
import { getBlogContent } from '@/config/blog-content';
import type { BlogCategory } from '@/config/blog-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

// Blog post category assignments by blogId
const blogCategoryMap: Record<string, BlogCategory> = {};

// Product-Specific Seller Guides (33 posts — indices 0-32)
const productGuideIds = [
  'sell-addition-worksheets-etsy-guide', 'sell-subtraction-worksheets-online',
  'code-addition-puzzles-sell-etsy', 'math-worksheet-bundles-that-sell',
  'math-puzzle-books-amazon-kdp', 'chart-count-worksheets-business',
  'word-search-printables-profit', 'crossword-books-kdp-niche',
  'cryptogram-worksheets-sell', 'word-scramble-printables-business',
  'word-guess-game-worksheets-sell', 'handwriting-worksheets-etsy-niche',
  'matching-worksheets-toddler-market', 'tracing-worksheets-fine-motor-sell',
  'hidden-object-worksheets-business', 'grid-matching-puzzles-sell',
  'find-and-count-printables-profit', 'missing-pieces-puzzles-kdp',
  'shadow-matching-worksheets-sell', 'picture-maze-worksheets-business',
  'sorting-worksheets-preschool-sell', 'preposition-worksheets-esl-market',
  'coloring-pages-business-2026', 'draw-and-color-worksheets-sell',
  'alphabet-worksheets-best-sellers', 'bingo-cards-printable-business',
  'pattern-worksheets-sell-online', 'pattern-train-worksheets-niche',
  'treasure-hunt-printables-sell', 'picture-sudoku-books-kdp',
  'size-comparison-worksheets-sell', 'more-less-worksheets-sell',
  'odd-one-out-worksheets-sell',
];

// Tool Comparisons & Reviews (15 posts)
const toolComparisonIds = [
  'lessoncraftstudio-vs-book-bolt', 'lessoncraftstudio-vs-bookgenie',
  'lessoncraftstudio-vs-self-publishing-titans', 'lessoncraftstudio-vs-canva',
  'lessoncraftstudio-vs-tangent-templates', 'lessoncraftstudio-vs-activity-book-generator',
  'best-word-search-generators-kdp', 'best-kdp-activity-book-tools',
  'best-worksheet-generators-etsy', 'best-crossword-generators-kdp',
  'best-coloring-page-generators-kdp', 'best-math-worksheet-generators-kdp',
  'best-sudoku-generators-kdp', 'free-vs-paid-worksheet-generators',
  'post-generation-editing-advantage',
];

// Platform & Business Strategy (60 posts — original 30 + SEO overhaul 20 + 10 case studies)
const platformStrategyIds = [
  'etsy-printable-shop-first-month', 'etsy-seo-printable-sellers-2026',
  'etsy-listing-optimization-worksheets', 'kdp-activity-book-formatting-guide',
  'kdp-vs-etsy-which-earns-more', 'printable-business-income-realistic',
  'how-many-listings-etsy-success', 'etsy-printable-pricing-strategy',
  'pinterest-traffic-printable-shop', 'seasonal-printable-calendar-sellers',
  'printable-bundle-strategy-etsy', 'passive-income-printables-truth',
  'printable-business-no-design-skills', 'worksheet-quality-vs-quantity-etsy',
  'best-printable-niches-low-competition', 'etsy-reviews-printable-products',
  'multilingual-printables-advantage', 'commercial-license-printables-explained',
  'printable-shop-branding-tips', 'email-list-printable-business',
  'etsy-ads-printables-worth-it', 'tpt-vs-etsy-worksheets-comparison',
  'printable-business-mistakes-avoid', 'scale-printable-business-automation',
  'printable-mockup-photos-sell-more', 'gumroad-vs-etsy-digital-products',
  'print-on-demand-vs-digital-download', 'customer-service-digital-products',
  'social-media-printable-sellers', 'copyright-printable-sellers-basics',
  // SEO Overhaul: Category B — Platform & Business Guides (20)
  'sell-worksheets-etsy-guide-2026', 'sell-activity-books-amazon-kdp-guide',
  'sell-printables-teachers-pay-teachers-2026', 'sell-printable-puzzles-gumroad',
  'price-kdp-activity-books-maximum-profit', 'etsy-seo-printable-sellers-guide-2026',
  'amazon-kdp-keywords-activity-books', 'etsy-listings-convert-digital-downloads',
  'kdp-categories-puzzle-activity-books', 'bundle-printables-higher-order-value-etsy',
  'start-printable-business-no-design-skills-guide', 'how-much-money-selling-printables-etsy',
  'kdp-activity-book-interior-formatting', 'create-mockup-images-etsy-printables',
  'printable-business-tax-guide-kdp-etsy', 'scale-printable-business-10-to-500-products',
  'seasonal-printables-holiday-demand-planning', 'get-reviews-etsy-digital-products',
  'kdp-expanded-distribution-activity-books', 'pinterest-traffic-etsy-printable-shop',
  // SEO Overhaul: Category E — Case Studies & Income Reports (7 platform-strategy)
  'first-100-dollars-selling-printables-etsy', 'zero-to-100-etsy-sales-printable-seller',
  '500-month-printable-side-hustle-timeline',
  'non-designer-printable-business-lessoncraftstudio', 'anatomy-best-selling-kdp-activity-book',
  'multi-language-printables-doubled-revenue', 'first-month-selling-word-search-books-kdp',
];

// Niche & Seasonal Content (50 posts — original 30 + SEO overhaul 20)
const nicheSeasonalIds = [
  'best-printables-sell-christmas', 'halloween-printables-sell-october',
  'back-to-school-printable-rush', 'valentines-day-printables-sell',
  'easter-printables-business-spring', 'summer-activity-printables-sell',
  'preschool-printables-best-sellers', 'kindergarten-worksheets-market',
  'homeschool-printables-growing-market', 'esl-worksheets-global-market',
  'special-education-printables-sell', 'printable-games-birthday-parties',
  'educational-printables-new-parents', 'toddler-activity-printables-sell',
  'math-fact-fluency-printables-sell', 'sight-words-worksheets-business',
  'fine-motor-activities-printables', 'brain-break-printables-teachers',
  'travel-activity-printables-sell', 'animal-themed-printables-sell',
  'space-themed-worksheets-business', 'printables-sell-mothers-day-fathers-day',
  'thanksgiving-printables-sell-november', 'new-year-printables-january',
  'spring-printables-sell-march-april', 'winter-printables-sell-december-january',
  'dinosaur-printables-sell-evergreen', 'farm-animal-printables-sell',
  'ocean-themed-printables-sell', 'food-themed-worksheets-sell',
  // SEO Overhaul: Category C — Niche Ideas & Market Research (20)
  'profitable-kdp-activity-book-niches-2026', 'low-competition-printable-niches-etsy-2026',
  'non-english-printable-markets', 'best-selling-word-search-themes-kdp',
  'printable-niches-homeschool-market', 'summer-activity-book-niches-seasonal-demand',
  'coloring-book-niches-still-sell-2026', 'educational-printable-trends-2026',
  'find-untapped-niches-printable-niche-finder', 'adult-puzzle-book-niches-kdp',
  'special-education-printables-niche', 'baby-shower-party-printable-niches-etsy',
  'math-workbook-niches-grade-level-demand', 'religious-faith-based-printable-niches',
  'travel-activity-book-niches-kdp', 'large-print-puzzle-books-senior-market-kdp',
  'bilingual-worksheets-growing-niche-etsy', 'occupational-therapy-printable-niches',
  'research-kdp-niches-amazon-search', 'printable-games-niche-bingo-treasure-hunts',
];

// How-To Tutorials (54 posts — original 19 + SEO overhaul 20 how-to + 15 tactical)
const howToIds = [
  'create-worksheet-bundle-35-minutes', 'format-worksheets-etsy-listing',
  'create-activity-book-kdp-start-finish', 'worksheet-design-tips-sell-more',
  'answer-key-importance-printable-sales', 'use-themed-images-sell-worksheets',
  'batch-create-worksheets-efficiently', 'worksheet-difficulty-levels-product-tiers',
  'printable-file-formats-pdf-jpeg-guide', 'create-cohesive-printable-brand',
  'repurpose-worksheets-multiple-products', 'worksheet-generator-vs-canva-comparison',
  'free-printable-samples-lead-magnet', 'best-paper-sizes-printable-products',
  'create-printable-curriculum-packs', '11-languages-sell-globally',
  'etsy-keyword-research-printables', 'printable-product-photography-mockups',
  'update-old-printable-listings-boost-sales',
  // SEO Overhaul: Category A — "How to Create [Product]" (20)
  'create-word-search-book-kdp', 'create-math-workbooks-kdp',
  'make-coloring-books-sell-etsy', 'create-activity-books-kids-kdp',
  'make-crossword-puzzle-books-kdp', 'create-sudoku-books-kdp',
  'make-handwriting-practice-books-kdp', 'create-i-spy-books-kdp',
  'make-pattern-worksheets-sell-etsy', 'create-matching-activity-books-kdp',
  'make-word-scramble-books-kdp', 'create-bingo-cards-sell-etsy-tpt',
  'make-cryptogram-puzzle-books-kdp', 'create-alphabet-tracing-books-kdp',
  'make-preschool-workbooks-sell-etsy', 'create-multi-language-printables-global',
  'make-logic-puzzle-books-kdp', 'create-treasure-hunt-printables-sell',
  'make-preposition-worksheets-esl-markets', 'create-learning-packet-sell-tpt',
  // SEO Overhaul: Category E — Case Studies with how-to category (3)
  'created-50-page-kdp-activity-book-one-afternoon',
  '1-to-100-etsy-listings-30-days', 'kdp-activity-book-earnings-calculator',
  // SEO Overhaul: Category F — Tips, Tricks & Tactical Guides (15)
  'kdp-trim-sizes-activity-books', 'how-many-pages-kdp-activity-book',
  'create-answer-keys-printable-worksheets', '300-dpi-vs-150-dpi-print-resolution-sellers',
  'format-printable-pdfs-etsy-digital-downloads', 'us-letter-vs-a4-paper-size-international-sales',
  'write-etsy-descriptions-printable-products', 'best-tags-printable-worksheets-etsy',
  'watermark-free-printable-samples-etsy', 'create-printable-product-series-cross-sells',
  'grayscale-vs-color-printables-what-sells-better', 'themed-image-collections-unique-products',
  'calculate-printable-business-profit-margins', 'avoid-copyright-issues-selling-printables',
  'automate-printable-workflow-creation-listing',
];

for (const id of productGuideIds) blogCategoryMap[id] = 'product-guide';
for (const id of toolComparisonIds) blogCategoryMap[id] = 'tool-comparison';
for (const id of platformStrategyIds) blogCategoryMap[id] = 'platform-strategy';
for (const id of nicheSeasonalIds) blogCategoryMap[id] = 'niche-seasonal';
for (const id of howToIds) blogCategoryMap[id] = 'how-to';

// Localized category labels
const categoryLabels: Record<BlogCategory, Record<string, string>> = {
  'product-guide': {
    en: 'Product-Specific Seller Guides',
    de: 'Produktspezifische Verkaufsanleitungen',
    fr: 'Guides de vente par produit',
    es: 'Guias de venta por producto',
    pt: 'Guias de venda por produto',
    it: 'Guide alla vendita per prodotto',
    nl: 'Productspecifieke verkoopgidsen',
    sv: 'Produktspecifika saljguider',
    da: 'Produktspecifikke salgsguider',
    no: 'Produktspesifikke salgsguider',
    fi: 'Tuotekohtaiset myyntiopaat',
  },
  'tool-comparison': {
    en: 'Tool Comparisons & Reviews',
    de: 'Tool-Vergleiche & Bewertungen',
    fr: 'Comparaisons et avis d\'outils',
    es: 'Comparaciones y resenas de herramientas',
    pt: 'Comparacoes e avaliacoes de ferramentas',
    it: 'Confronti e recensioni di strumenti',
    nl: 'Toolvergelijkingen & reviews',
    sv: 'Verktygsjamforelser och recensioner',
    da: 'Vaerktoejssammenligninger og anmeldelser',
    no: 'Verktoysammenligninger og anmeldelser',
    fi: 'Tyokaluvertailut ja arvostelut',
  },
  'platform-strategy': {
    en: 'Platform & Business Strategy',
    de: 'Plattform- & Geschäftsstrategie',
    fr: 'Stratégie de plateforme et business',
    es: 'Estrategia de plataforma y negocio',
    pt: 'Estratégia de plataforma e negócio',
    it: 'Strategia di piattaforma e business',
    nl: 'Platform- & bedrijfsstrategie',
    sv: 'Plattforms- och affärsstrategi',
    da: 'Platform- og forretningsstrategi',
    no: 'Plattform- og forretningsstrategi',
    fi: 'Alusta- ja liiketoimintastrategia',
  },
  'niche-seasonal': {
    en: 'Niches & Seasonal Content',
    de: 'Nischen & saisonale Inhalte',
    fr: 'Niches et contenu saisonnier',
    es: 'Nichos y contenido estacional',
    pt: 'Nichos e conteúdo sazonal',
    it: 'Nicchie e contenuti stagionali',
    nl: 'Niches & seizoensgebonden content',
    sv: 'Nischer och säsongsinnehåll',
    da: 'Nicher og sæsonindhold',
    no: 'Nisjer og sesonginnhold',
    fi: 'Nichet ja kausiluonteinen sisältö',
  },
  'how-to': {
    en: 'Tutorials & Tips',
    de: 'Anleitungen & Tipps',
    fr: 'Tutoriels et astuces',
    es: 'Tutoriales y consejos',
    pt: 'Tutoriais e dicas',
    it: 'Tutorial e suggerimenti',
    nl: 'Tutorials & tips',
    sv: 'Handledningar och tips',
    da: 'Vejledninger og tips',
    no: 'Veiledninger og tips',
    fi: 'Oppaat ja vinkit',
  },
};

const blogIndexMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Blog for Printable Sellers | LessonCraftStudio',
    description: 'Practical guides, tips, and strategies for building your printable business on Etsy, Amazon KDP, and beyond. 112 articles for printable entrepreneurs.',
  },
  de: {
    title: 'Blog für Printable-Verkäufer | LessonCraftStudio',
    description: 'Praktische Anleitungen, Tipps und Strategien für Ihr Printable-Geschäft auf Etsy, Amazon KDP und mehr. 112 Artikel für Printable-Unternehmer.',
  },
  fr: {
    title: 'Blog pour vendeurs d\'imprimables | LessonCraftStudio',
    description: 'Guides pratiques, astuces et stratégies pour développer votre activité d\'imprimables sur Etsy, Amazon KDP et au-delà.',
  },
  es: {
    title: 'Blog para vendedores de imprimibles | LessonCraftStudio',
    description: 'Guias prácticas, consejos y estrategias para construir su negocio de imprimibles en Etsy, Amazon KDP y más.',
  },
  pt: {
    title: 'Blog para vendedores de imprimíveis | LessonCraftStudio',
    description: 'Guias práticos, dicas e estratégias para construir seu negócio de imprimíveis na Hotmart, Etsy, Amazon KDP e além.',
  },
  it: {
    title: 'Blog per venditori di stampabili | LessonCraftStudio',
    description: 'Guide pratiche, suggerimenti e strategie per costruire il tuo business di stampabili su Etsy, Amazon KDP e oltre.',
  },
  nl: {
    title: 'Blog voor printable-verkopers | LessonCraftStudio',
    description: 'Praktische gidsen, tips en strategieën voor het opbouwen van uw printable-bedrijf op Etsy, Amazon KDP en meer.',
  },
  sv: {
    title: 'Blogg för printable-säljare | LessonCraftStudio',
    description: 'Praktiska guider, tips och strategier för att bygga din printable-verksamhet på Etsy, Amazon KDP och mer.',
  },
  da: {
    title: 'Blog for printable-sælgere | LessonCraftStudio',
    description: 'Praktiske guider, tips og strategier til at opbygge din printable-virksomhed på Etsy, Amazon KDP og mere.',
  },
  no: {
    title: 'Blogg for arbeidsark-selgere | LessonCraftStudio',
    description: 'Praktiske guider, tips og strategier for å selge arbeidsark og oppgaver på Etsy, Amazon KDP og mer. 33 generatorer, kommersiell lisens.',
  },
  fi: {
    title: 'Blogi tulostettavien myyjille | Oppaat ja strategiat',
    description: 'Käytännön oppaat tulostettavien tuotteiden liiketoimintaan: Etsy-strategiat, KDP-julkaisu, niche-ideat ja myyntivinkit suomeksi.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as SupportedLocale;
  const meta = blogIndexMetadata[locale] || blogIndexMetadata.en;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/blog`;
  }
  alternates['x-default'] = `${baseUrl}/en/blog`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: alternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/blog`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

// Helper to format blogId as a readable title fallback
function blogIdToTitle(blogId: string): string {
  return blogId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default async function BlogIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;

  // Load content titles where available (async)
  const postTitles: Record<string, string> = {};
  for (const config of blogPageSlugs) {
    const content = await getBlogContent(config.blogId, locale);
    postTitles[config.blogId] = content?.hero?.title || blogIdToTitle(config.blogId);
  }

  const categoryOrder: BlogCategory[] = ['product-guide', 'tool-comparison', 'platform-strategy', 'niche-seasonal', 'how-to'];

  // Group posts by category
  const grouped: Record<BlogCategory, typeof blogPageSlugs> = {
    'product-guide': [],
    'tool-comparison': [],
    'platform-strategy': [],
    'niche-seasonal': [],
    'how-to': [],
  };

  for (const config of blogPageSlugs) {
    // Skip posts that have no slug for the current locale (e.g. EN-only free-tool
    // announcements when the user is on /de/blog).
    if (locale !== 'en' && !config.slugs[locale]) continue;
    const cat = blogCategoryMap[config.blogId] || 'how-to';
    grouped[cat].push(config);
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: getSectionLabel('blog', locale) },
    ],
  };

  const blogH1: Record<string, string> = {
    en: 'Guides, Tips & Strategies for Printable Sellers',
    de: 'Anleitungen, Tipps & Strategien für Printable-Verkäufer',
    fr: 'Guides, astuces et stratégies pour vendeurs d\'imprimables',
    es: 'Guias, consejos y estrategias para vendedores de imprimibles',
    pt: 'Guias, dicas e estratégias para vendedores de imprimíveis',
    it: 'Guide, suggerimenti e strategie per venditori di stampabili',
    nl: 'Gidsen, tips & strategieën voor printable-verkopers',
    sv: 'Guider, tips och strategier för printable-säljare',
    da: 'Guider, tips og strategier for printable-sælgere',
    no: 'Guider, tips og strategier for printable-selgere',
    fi: 'Oppaat, vinkit ja strategiat tulosteiden myyjille',
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogH1[locale] || blogH1.en}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {(blogIndexMetadata[locale] || blogIndexMetadata.en).description}
          </p>
        </div>
      </section>

      {/* Category Sections */}
      {categoryOrder.map((cat) => {
        const posts = grouped[cat];
        if (!posts.length) return null;

        return (
          <section key={cat} className="py-10 md:py-14 even:bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {categoryLabels[cat][locale] || categoryLabels[cat].en}
              </h2>
              <p className="text-gray-500 mb-6">{posts.length} {locale === 'en' ? 'articles' : locale === 'de' ? 'Artikel' : locale === 'fr' ? 'articles' : locale === 'es' ? 'artículos' : locale === 'pt' ? 'artigos' : locale === 'it' ? 'articoli' : locale === 'nl' ? 'artikelen' : locale === 'sv' ? 'artiklar' : locale === 'da' ? 'artikler' : 'articles'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((config) => {
                  const slug = getBlogSlugForLocale(config.blogId, locale) || config.slugs.en;
                  if (!slug) return null;
                  return (
                    <Link
                      key={config.blogId}
                      href={`/${locale}/blog/${slug}`}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all"
                    >
                      <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                        {postTitles[config.blogId]}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {locale === 'en' ? 'Ready to Start Creating?' : locale === 'de' ? 'Bereit loszulegen?' : locale === 'fr' ? 'Prêt à commencer ?' : locale === 'es' ? '¿Listo para empezar?' : locale === 'pt' ? 'Pronto para começar?' : locale === 'it' ? 'Pronto per iniziare?' : locale === 'nl' ? 'Klaar om te beginnen?' : locale === 'sv' ? 'Redo att börja?' : locale === 'da' ? 'Klar til at starte?' : 'Ready to Start Creating?'}
          </h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            {locale === 'en' ? 'Explore all 33 worksheet generators and start building your printable business today.' : locale === 'de' ? 'Entdecken Sie alle 33 Arbeitsblatt-Generatoren und starten Sie noch heute Ihr Printable-Geschäft.' : locale === 'fr' ? 'Découvrez les 33 générateurs et lancez votre activité d\'imprimables dès aujourd\'hui.' : locale === 'es' ? 'Explore los 33 generadores y comience su negocio de imprimibles hoy.' : locale === 'pt' ? 'Explore os 33 geradores e comece seu negócio de imprimíveis hoje.' : locale === 'it' ? 'Esplora tutti i 33 generatori e inizia il tuo business di stampabili oggi.' : locale === 'nl' ? 'Ontdek alle 33 generators en start vandaag nog met uw printable-bedrijf.' : locale === 'sv' ? 'Utforska alla 33 generatorer och starta din printable-verksamhet idag.' : locale === 'da' ? 'Udforsk alle 33 generatorer og start din printable-virksomhed i dag.' : 'Explore all 33 worksheet generators and start building your printable business today.'}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {locale === 'en' ? 'Explore All Generators' : locale === 'de' ? 'Alle Generatoren entdecken' : locale === 'fr' ? 'Découvrir tous les générateurs' : locale === 'es' ? 'Explorar todos los generadores' : locale === 'pt' ? 'Explorar todos os geradores' : locale === 'it' ? 'Esplora tutti i generatori' : locale === 'nl' ? 'Alle generators bekijken' : locale === 'sv' ? 'Utforska alla generatorer' : locale === 'da' ? 'Udforsk alle generatorer' : 'Explore All Generators'}
          </Link>
        </div>
      </section>
    </div>
  );
}
