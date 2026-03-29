import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { guidePageSlugs, getGuideSlugForLocale } from '@/config/guide-page-slugs';
import { getHreflangCode, ogLocaleMap, generateGuidesCollectionSchema, generateGuidesItemListSchema } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getSectionLabel } from '@/config/section-labels';
import { getGuideContent } from '@/config/guide-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

const guidesKeywords: Record<string, string[]> = {
  en: ['printable business how-to guides', 'how to sell worksheets on Etsy', 'Etsy printable seller guides', 'KDP publishing guides for sellers', 'create and sell printables guide', 'printable seller strategies'],
  de: ['Druckvorlagen-Business Anleitungen', 'Arbeitsblätter verkaufen', 'Etsy Druckvorlagen Tutorial', 'KDP Veröffentlichungsanleitung', 'Druckvorlagen erstellen und verkaufen', 'Tipps für Druckvorlagen-Verkäufer'],
  fr: ['guides business imprimables', 'comment vendre des fiches', 'tutoriel Etsy imprimables', 'guide publication KDP', 'créer et vendre imprimables', 'conseils vendeur imprimables'],
  es: ['guías negocio imprimibles', 'cómo vender fichas Etsy', 'tutorial Etsy KDP imprimibles', 'guía publicación KDP Hotmart', 'crear y vender imprimibles', 'consejos vendedor imprimibles'],
  pt: ['guias negócio imprimíveis', 'como vender fichas', 'tutorial Etsy imprimíveis', 'guia publicação KDP', 'criar e vender imprimíveis', 'dicas vendedor imprimíveis'],
  it: ['guide business stampabili', 'come vendere schede', 'tutorial Etsy stampabili', 'guida pubblicazione KDP', 'creare e vendere stampabili', 'consigli venditore stampabili'],
  nl: ['printable business handleidingen', 'werkbladen verkopen', 'Etsy printable tutorial', 'KDP publicatiegids', 'printables maken en verkopen', 'tips printable verkoper'],
  sv: ['guider utskriftsföretag', 'sälja arbetsblad', 'Etsy utskrifts tutorial', 'KDP publiceringsguide', 'skapa och sälja utskrifter', 'tips utskriftssäljare'],
  da: ['vejledninger printable-forretning', 'sælge opgaver', 'Etsy printable tutorial', 'KDP udgivelsesguide', 'oprette og sælge printables', 'tips printable-sælger'],
  no: ['veiledninger utskriftsvirksomhet', 'selge oppgaver', 'Etsy utskrift tutorial', 'KDP publiseringsguide', 'lage og selge utskrifter', 'tips utskriftsselger'],
  fi: ['tulostettavien yritysoppaat', 'myydä tehtäviä', 'Etsy tulostettava opas', 'KDP julkaisuopas', 'luoda ja myydä tulostettavia', 'vinkkejä tulostettavien myyjälle'],
};

// Subcategories for guides
const guideSubcategories = [
  {
    id: 'platform',
    labelKey: 'platformGuides',
    guideIds: new Set([
      'sell-math-worksheets-etsy', 'sell-word-search-etsy', 'start-etsy-printable-shop',
      'create-etsy-coloring-pages', 'sell-educational-printables-etsy', 'price-etsy-printables',
      'etsy-seo-educational-printables', 'create-etsy-worksheet-bundles',
      'math-activity-books-kdp', 'publish-puzzle-books-kdp', 'word-search-books-kdp',
      'make-money-kdp-activity-books', 'kdp-formatting-worksheets', 'best-kdp-activity-book-niches',
      'sudoku-books-kdp', 'kdp-vs-etsy-printables',
      'create-sell-tpt-resources', 'tpt-store-optimization',
      'sell-printables-gumroad', 'sell-creative-fabrica',
    ]),
  },
  {
    id: 'product',
    labelKey: 'productCreationGuides',
    guideIds: new Set([
      'create-addition-worksheets', 'create-subtraction-worksheets', 'create-word-search-puzzles',
      'create-crossword-puzzles', 'create-math-puzzle-worksheets', 'create-handwriting-sheets',
      'create-coloring-pages', 'create-bingo-cards', 'create-matching-worksheets',
      'create-pattern-worksheets', 'create-picture-sudoku', 'create-maze-worksheets',
      'create-hidden-object-worksheets', 'create-size-comparison-worksheets',
      'create-counting-worksheets', 'create-drawing-worksheets', 'create-sorting-worksheets',
      'create-shadow-matching-worksheets', 'create-odd-one-out-puzzles',
      'create-missing-pieces-puzzles', 'create-treasure-hunt-worksheets',
      'create-alphabet-worksheets', 'create-preposition-worksheets',
      'create-cryptogram-puzzles', 'create-chart-count-worksheets',
    ]),
  },
  {
    id: 'business',
    labelKey: 'businessStrategyGuides',
    guideIds: new Set([
      'create-worksheet-bundles', 'niche-selection-printables', 'create-printable-product-line',
      'pricing-educational-printables', 'scale-printable-business-guide', 'passive-income-worksheets',
      'understanding-commercial-licenses', 'research-profitable-niches',
      'multilingual-printable-business', 'worksheets-multiple-languages',
      'copyright-printable-sellers', 'customer-support-digital-products',
      'automate-printable-business', 'social-media-printable-marketing',
      'pinterest-marketing-worksheets', 'email-marketing-printables',
      'get-reviews-printable-products', 'seasonal-marketing-printables',
      'digital-vs-physical-printables', 'quality-standards-worksheets',
    ]),
  },
];

const guidesContent: Record<string, {
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  subcatDescriptions: Record<string, string>;
}> = {
  en: {
    heroTitle: 'How-To Guides for Printable Sellers',
    heroDescription: '65 step-by-step guides for creating, listing, and selling printable products on Etsy, Amazon KDP, TPT, and more.',
    metaTitle: 'How-To Guides for Printable Sellers | LCS',
    metaDescription: '65 how-to guides for printable sellers. Platform guides for Etsy, KDP & TPT. Product creation tutorials. Business strategies for pricing, marketing & scaling.',
    ctaTitle: 'Start Creating Today',
    ctaDescription: 'Try all 33 printable generators free with watermark. No signup required.',
    ctaButton: 'Try Free Generators',
    subcatDescriptions: {
      platform: 'How to create and sell on specific platforms',
      product: 'How to create specific types of printable products',
      business: 'Growing and scaling your printable business',
    },
  },
  de: {
    heroTitle: 'Anleitungen',
    heroDescription: 'Schritt-für-Schritt-Anleitungen zum Erstellen und Verkaufen von Druckvorlagen. Von Plattform-Tutorials bis zu Geschäftsstrategien.',
    metaTitle: 'Anleitungen | Druckvorlagen erstellen & verkaufen | LessonCraftStudio',
    metaDescription: '65 Schritt-für-Schritt-Anleitungen zum Erstellen und Verkaufen von Druckvorlagen. Plattform-Guides, Tutorials und Geschäftsstrategien für Etsy, KDP, TPT.',
    ctaTitle: 'Jetzt loslegen',
    ctaDescription: 'Alle 33 Druckvorlagen-Generatoren gratis mit Wasserzeichen testen. Keine Anmeldung.',
    ctaButton: 'Generatoren gratis testen',
    subcatDescriptions: {
      platform: 'So erstellen und verkaufen Sie auf bestimmten Plattformen',
      product: 'So erstellen Sie bestimmte Arten von Druckvorlagen',
      business: 'Wachstum und Skalierung Ihres Druckvorlagen-Geschäfts',
    },
  },
  fr: {
    heroTitle: 'Guides pratiques',
    heroDescription: 'Guides étape par étape pour créer et vendre des imprimables. Des tutoriels de plateformes aux stratégies commerciales.',
    metaTitle: 'Guides pratiques | Créer et vendre des imprimables | LessonCraftStudio',
    metaDescription: '65 guides pour créer et vendre des imprimables. Guides de plateformes, tutoriels de création et stratégies commerciales pour Etsy, KDP, TPT.',
    ctaTitle: 'Commencez à créer',
    ctaDescription: 'Essayez les 33 générateurs gratuits avec filigrane. Sans inscription.',
    ctaButton: 'Essayer les générateurs',
    subcatDescriptions: {
      platform: 'Comment créer et vendre sur des plateformes spécifiques',
      product: 'Comment créer des types spécifiques d\'imprimables',
      business: 'Développer et faire grandir votre entreprise d\'imprimables',
    },
  },
  es: {
    heroTitle: 'Guías para vendedores de imprimibles',
    heroDescription: 'Guías paso a paso para crear y vender imprimibles en Etsy, KDP y Hotmart. Desde tutoriales de plataformas hasta estrategias de negocio.',
    metaTitle: 'Guías para vendedores de imprimibles | LCS',
    metaDescription: '65 guías paso a paso para crear y vender imprimibles en Etsy, KDP y Hotmart. Guías de plataformas, tutoriales de creación y estrategias de negocio.',
    ctaTitle: 'Empiece a crear hoy',
    ctaDescription: 'Pruebe los 33 generadores gratis con marca de agua. Sin registro.',
    ctaButton: 'Probar generadores gratis',
    subcatDescriptions: {
      platform: 'Cómo crear y vender en plataformas específicas',
      product: 'Cómo crear tipos específicos de imprimibles',
      business: 'Crecimiento y escalado de su negocio de imprimibles',
    },
  },
  pt: {
    heroTitle: 'Guias para vendedores de imprimíveis',
    heroDescription: 'Guias passo a passo para criar e vender imprimíveis na Hotmart, Kiwify, Etsy e Amazon KDP. Plataformas, criação e estratégias de negócio.',
    metaTitle: 'Guias para vendedores de imprimíveis | LCS',
    metaDescription: '65 guias para criar e vender imprimíveis na Hotmart, Etsy e KDP. Plataformas, criação de produtos e estratégias de negócio para o mercado brasileiro.',
    ctaTitle: 'Comece a criar hoje',
    ctaDescription: 'Teste os 33 geradores grátis com marca d\'água. Sem cadastro.',
    ctaButton: 'Testar geradores grátis',
    subcatDescriptions: {
      platform: 'Como criar e vender em plataformas específicas',
      product: 'Como criar tipos específicos de imprimíveis',
      business: 'Crescimento e expansão do seu negócio de imprimíveis',
    },
  },
  it: {
    heroTitle: 'Guide pratiche',
    heroDescription: 'Guide passo dopo passo per creare e vendere stampabili. Dai tutorial sulle piattaforme alle strategie di business.',
    metaTitle: 'Guide per venditori di stampabili | LessonCraftStudio',
    metaDescription: '65 guide per creare e vendere stampabili su Etsy, KDP e Eduki. Piattaforme, creazione prodotti e strategie di business per il mercato italiano.',
    ctaTitle: 'Inizia a creare oggi',
    ctaDescription: 'Prova tutti i 33 generatori gratis con filigrana. Senza registrazione.',
    ctaButton: 'Prova i generatori gratis',
    subcatDescriptions: {
      platform: 'Come creare e vendere su piattaforme specifiche',
      product: 'Come creare tipi specifici di stampabili',
      business: 'Crescita e scalabilità del tuo business di stampabili',
    },
  },
  nl: {
    heroTitle: 'Handleidingen',
    heroDescription: 'Stapsgewijze handleidingen voor het maken en verkopen van printables. Van platformtutorials tot bedrijfsstrategieën.',
    metaTitle: 'Handleidingen | Printables maken en verkopen | LessonCraftStudio',
    metaDescription: '65 stapsgewijze handleidingen voor het maken en verkopen van printables. Platformgidsen, creatietutorials en bedrijfsstrategieën voor Etsy, KDP, TPT.',
    ctaTitle: 'Begin vandaag met maken',
    ctaDescription: 'Probeer alle 33 generatoren gratis met watermerk. Geen registratie.',
    ctaButton: 'Generatoren gratis proberen',
    subcatDescriptions: {
      platform: 'Hoe je op specifieke platformen maakt en verkoopt',
      product: 'Hoe je specifieke soorten printables maakt',
      business: 'Groei en schaal je printable-bedrijf',
    },
  },
  sv: {
    heroTitle: 'Guider',
    heroDescription: 'Steg-för-steg-guider för att skapa och sälja utskrifter. Från plattformsguider till affärsstrategier.',
    metaTitle: 'Guider | Skapa och sälj utskrifter | LessonCraftStudio',
    metaDescription: '65 steg-för-steg-guider för att skapa och sälja utskrifter. Plattformsguider, skapandeguider och affärsstrategier för Etsy, KDP, TPT.',
    ctaTitle: 'Börja skapa idag',
    ctaDescription: 'Prova alla 33 generatorer gratis med vattenstämpel. Ingen registrering.',
    ctaButton: 'Prova generatorerna gratis',
    subcatDescriptions: {
      platform: 'Hur du skapar och säljer på specifika plattformar',
      product: 'Hur du skapar specifika typer av utskrifter',
      business: 'Tillväxt och skalning av ditt utskriftsföretag',
    },
  },
  da: {
    heroTitle: 'Vejledninger',
    heroDescription: 'Trin-for-trin-vejledninger til at oprette og sælge printables. Fra platformguider til forretningsstrategier.',
    metaTitle: 'Vejledninger | Opret og sælg printables | LessonCraftStudio',
    metaDescription: '65 trin-for-trin-vejledninger til at oprette og sælge printables. Platformguider, oprettelsesguider og forretningsstrategier for Etsy, KDP, TPT.',
    ctaTitle: 'Begynd at skabe i dag',
    ctaDescription: 'Prøv alle 33 generatorer gratis med vandmærke. Ingen tilmelding.',
    ctaButton: 'Prøv generatorerne gratis',
    subcatDescriptions: {
      platform: 'Sådan opretter og sælger du på specifikke platforme',
      product: 'Sådan opretter du specifikke typer printables',
      business: 'Vækst og skalering af din printable-forretning',
    },
  },
  no: {
    heroTitle: 'Veiledninger',
    heroDescription: 'Steg-for-steg-veiledninger for å lage og selge utskrifter. Fra plattformguider til forretningsstrategier.',
    metaTitle: 'Veiledninger | Lag og selg utskrifter | LessonCraftStudio',
    metaDescription: '65 steg-for-steg-veiledninger for å lage og selge utskrifter. Plattformguider, produksjonsguider og forretningsstrategier for Etsy, KDP, TPT.',
    ctaTitle: 'Begynn å lage i dag',
    ctaDescription: 'Prøv alle 33 generatorer gratis med vannmerke. Ingen registrering.',
    ctaButton: 'Prøv generatorene gratis',
    subcatDescriptions: {
      platform: 'Slik oppretter og selger du på spesifikke plattformer',
      product: 'Slik oppretter du spesifikke typer utskrifter',
      business: 'Vekst og skalering av din utskriftsvirksomhet',
    },
  },
  fi: {
    heroTitle: 'Oppaat',
    heroDescription: 'Vaiheittaiset oppaat tulostettavien luomiseen ja myyntiin. Alustaohjeet, luomisoppaat ja liiketoimintastrategiat.',
    metaTitle: 'Oppaat | Luo ja myy tulostettavia | LessonCraftStudio',
    metaDescription: '65 vaiheittaista opasta tulostettavien luomiseen ja myyntiin. Alustaohjeet, luomisoppaat ja liiketoimintastrategiat Etsyyn, KDP:hen ja TPT:hen.',
    ctaTitle: 'Aloita luominen tänään',
    ctaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei rekisteröitymistä.',
    ctaButton: 'Kokeile generaattoreita ilmaiseksi',
    subcatDescriptions: {
      platform: 'Kuinka luoda ja myydä tietyillä alustoilla',
      product: 'Kuinka luoda tiettyjä tulostettavien tyyppejä',
      business: 'Tulostettavien liiketoiminnan kasvu ja skaalaus',
    },
  },
};

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
  const content = guidesContent[locale] || guidesContent.en;
  const title = content.metaTitle;
  const description = content.metaDescription;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/guides`;
  }
  alternates['x-default'] = `${baseUrl}/en/guides`;

  return {
    title,
    description,
    keywords: guidesKeywords[locale] || guidesKeywords.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/guides`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/guides`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

export default async function GuidesListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const content = guidesContent[locale] || guidesContent.en;

  // Load guide content for localized titles
  const guideContents: Record<string, string> = {};
  for (const subcat of guideSubcategories) {
    const guides = guidePageSlugs.filter(g => subcat.guideIds.has(g.guideId));
    for (const guide of guides) {
      const guideContent = await getGuideContent(guide.guideId, locale);
      if (guideContent?.hero?.title) {
        guideContents[guide.guideId] = guideContent.hero.title;
      }
    }
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: content.heroTitle },
    ],
  };

  const collectionSchema = generateGuidesCollectionSchema(locale);
  const allGuides = guidePageSlugs.map(g => ({
    name: guideContents[g.guideId] || g.guideId,
    slug: getGuideSlugForLocale(g.guideId, locale) || g.slugs.en,
  }));
  const itemListSchema = generateGuidesItemListSchema(locale, allGuides);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {guideSubcategories.map(subcat => {
            const guides = guidePageSlugs.filter(g => subcat.guideIds.has(g.guideId));
            if (guides.length === 0) return null;

            return (
              <div key={subcat.id} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{getSectionLabel(subcat.labelKey, locale)}</h2>
                <p className="text-gray-600 text-sm mb-4">{content.subcatDescriptions[subcat.id]}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {guides.map(guide => {
                    const slug = getGuideSlugForLocale(guide.guideId, locale) || guide.slugs.en;
                    const fallbackName = guide.guideId
                      .replace(/^create-/, '')
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, c => c.toUpperCase());
                    const displayName = guideContents[guide.guideId] || fallbackName;

                    return (
                      <Link
                        key={guide.guideId}
                        href={`/${locale}/guides/${slug}`}
                        className="p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all"
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

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar más', pt: 'Explorar mais', it: 'Esplora di più', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lisää' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas grátis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis værktøjer', no: 'Gratisverktøy', fi: 'Ilmaiset työkalut' }[locale] || 'Free Tools'}
            </Link>
            <Link href={`/${locale}/ideas`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Niche Ideas', de: 'Nischen-Ideen', fr: 'Idées de niches', es: 'Ideas de nichos', pt: 'Ideias de nichos', it: 'Idee di nicchia', nl: 'Niche-ideeën', sv: 'Nischidéer', da: 'Nicheideer', no: 'Nisjeideer', fi: 'Niche-ideat' }[locale] || 'Niche Ideas'}
            </Link>
            <Link href={`/${locale}/start`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Get Started', de: 'Erste Schritte', fr: 'Démarrer', es: 'Comenzar', pt: 'Começar', it: 'Inizia', nl: 'Aan de slag', sv: 'Kom igång', da: 'Kom i gang', no: 'Kom i gang', fi: 'Aloita' }[locale] || 'Get Started'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{content.ctaTitle}</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            {content.ctaDescription}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {content.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
