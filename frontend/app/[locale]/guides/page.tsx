import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { guidePageSlugs, getGuideSlugForLocale } from '@/config/guide-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getSectionLabel } from '@/config/section-labels';
import { getGuideContent } from '@/config/guide-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

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
    heroTitle: 'How-To Guides',
    heroDescription: 'Step-by-step guides for creating and selling printable products. From platform tutorials to business strategies.',
    metaTitle: 'How-To Guides | Create & Sell Printables | LessonCraftStudio',
    metaDescription: '65 step-by-step guides for creating and selling printable products. Platform guides, product creation tutorials, and business strategies for Etsy, KDP, TPT sellers.',
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
    heroDescription: 'Schritt-f\u00fcr-Schritt-Anleitungen zum Erstellen und Verkaufen von Druckvorlagen. Von Plattform-Tutorials bis zu Gesch\u00e4ftsstrategien.',
    metaTitle: 'Anleitungen | Druckvorlagen erstellen & verkaufen | LessonCraftStudio',
    metaDescription: '65 Schritt-f\u00fcr-Schritt-Anleitungen zum Erstellen und Verkaufen von Druckvorlagen. Plattform-Guides, Tutorials und Gesch\u00e4ftsstrategien f\u00fcr Etsy, KDP, TPT.',
    ctaTitle: 'Jetzt loslegen',
    ctaDescription: 'Alle 33 Druckvorlagen-Generatoren gratis mit Wasserzeichen testen. Keine Anmeldung.',
    ctaButton: 'Generatoren gratis testen',
    subcatDescriptions: {
      platform: 'So erstellen und verkaufen Sie auf bestimmten Plattformen',
      product: 'So erstellen Sie bestimmte Arten von Druckvorlagen',
      business: 'Wachstum und Skalierung Ihres Druckvorlagen-Gesch\u00e4fts',
    },
  },
  fr: {
    heroTitle: 'Guides pratiques',
    heroDescription: 'Guides \u00e9tape par \u00e9tape pour cr\u00e9er et vendre des imprimables. Des tutoriels de plateformes aux strat\u00e9gies commerciales.',
    metaTitle: 'Guides pratiques | Cr\u00e9er et vendre des imprimables | LessonCraftStudio',
    metaDescription: '65 guides pour cr\u00e9er et vendre des imprimables. Guides de plateformes, tutoriels de cr\u00e9ation et strat\u00e9gies commerciales pour Etsy, KDP, TPT.',
    ctaTitle: 'Commencez \u00e0 cr\u00e9er',
    ctaDescription: 'Essayez les 33 g\u00e9n\u00e9rateurs gratuits avec filigrane. Sans inscription.',
    ctaButton: 'Essayer les g\u00e9n\u00e9rateurs',
    subcatDescriptions: {
      platform: 'Comment cr\u00e9er et vendre sur des plateformes sp\u00e9cifiques',
      product: 'Comment cr\u00e9er des types sp\u00e9cifiques d\u2019imprimables',
      business: 'D\u00e9velopper et faire grandir votre entreprise d\u2019imprimables',
    },
  },
  es: {
    heroTitle: 'Gu\u00edas pr\u00e1cticas',
    heroDescription: 'Gu\u00edas paso a paso para crear y vender imprimibles. Desde tutoriales de plataformas hasta estrategias de negocio.',
    metaTitle: 'Gu\u00edas pr\u00e1cticas | Crear y vender imprimibles | LessonCraftStudio',
    metaDescription: '65 gu\u00edas paso a paso para crear y vender imprimibles. Gu\u00edas de plataformas, tutoriales de creaci\u00f3n y estrategias de negocio para Etsy, KDP, TPT.',
    ctaTitle: 'Empieza a crear hoy',
    ctaDescription: 'Prueba los 33 generadores gratis con marca de agua. Sin registro.',
    ctaButton: 'Probar generadores gratis',
    subcatDescriptions: {
      platform: 'C\u00f3mo crear y vender en plataformas espec\u00edficas',
      product: 'C\u00f3mo crear tipos espec\u00edficos de imprimibles',
      business: 'Crecimiento y escalado de tu negocio de imprimibles',
    },
  },
  pt: {
    heroTitle: 'Guias pr\u00e1ticos',
    heroDescription: 'Guias passo a passo para criar e vender imprim\u00edveis. Dos tutoriais de plataformas \u00e0s estrat\u00e9gias de neg\u00f3cio.',
    metaTitle: 'Guias pr\u00e1ticos | Criar e vender imprim\u00edveis | LessonCraftStudio',
    metaDescription: '65 guias passo a passo para criar e vender imprim\u00edveis. Guias de plataformas, tutoriais de cria\u00e7\u00e3o e estrat\u00e9gias de neg\u00f3cio para Etsy, KDP, TPT.',
    ctaTitle: 'Comece a criar hoje',
    ctaDescription: 'Experimente os 33 geradores gr\u00e1tis com marca d\u2019\u00e1gua. Sem registo.',
    ctaButton: 'Experimentar geradores gr\u00e1tis',
    subcatDescriptions: {
      platform: 'Como criar e vender em plataformas espec\u00edficas',
      product: 'Como criar tipos espec\u00edficos de imprim\u00edveis',
      business: 'Crescimento e expans\u00e3o do seu neg\u00f3cio de imprim\u00edveis',
    },
  },
  it: {
    heroTitle: 'Guide pratiche',
    heroDescription: 'Guide passo dopo passo per creare e vendere stampabili. Dai tutorial sulle piattaforme alle strategie di business.',
    metaTitle: 'Guide pratiche | Creare e vendere stampabili | LessonCraftStudio',
    metaDescription: '65 guide passo dopo passo per creare e vendere stampabili. Guide sulle piattaforme, tutorial di creazione e strategie di business per Etsy, KDP, TPT.',
    ctaTitle: 'Inizia a creare oggi',
    ctaDescription: 'Prova tutti i 33 generatori gratis con filigrana. Senza registrazione.',
    ctaButton: 'Prova i generatori gratis',
    subcatDescriptions: {
      platform: 'Come creare e vendere su piattaforme specifiche',
      product: 'Come creare tipi specifici di stampabili',
      business: 'Crescita e scalabilit\u00e0 del tuo business di stampabili',
    },
  },
  nl: {
    heroTitle: 'Handleidingen',
    heroDescription: 'Stapsgewijze handleidingen voor het maken en verkopen van printables. Van platformtutorials tot bedrijfsstrategie\u00ebn.',
    metaTitle: 'Handleidingen | Printables maken en verkopen | LessonCraftStudio',
    metaDescription: '65 stapsgewijze handleidingen voor het maken en verkopen van printables. Platformgidsen, creatietutorials en bedrijfsstrategie\u00ebn voor Etsy, KDP, TPT.',
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
    heroDescription: 'Steg-f\u00f6r-steg-guider f\u00f6r att skapa och s\u00e4lja utskrifter. Fr\u00e5n plattformsguider till aff\u00e4rsstrategier.',
    metaTitle: 'Guider | Skapa och s\u00e4lj utskrifter | LessonCraftStudio',
    metaDescription: '65 steg-f\u00f6r-steg-guider f\u00f6r att skapa och s\u00e4lja utskrifter. Plattformsguider, skapandeguider och aff\u00e4rsstrategier f\u00f6r Etsy, KDP, TPT.',
    ctaTitle: 'B\u00f6rja skapa idag',
    ctaDescription: 'Prova alla 33 generatorer gratis med vattenst\u00e4mpel. Ingen registrering.',
    ctaButton: 'Prova generatorerna gratis',
    subcatDescriptions: {
      platform: 'Hur du skapar och s\u00e4ljer p\u00e5 specifika plattformar',
      product: 'Hur du skapar specifika typer av utskrifter',
      business: 'Tillv\u00e4xt och skalning av ditt utskriftsf\u00f6retag',
    },
  },
  da: {
    heroTitle: 'Vejledninger',
    heroDescription: 'Trin-for-trin-vejledninger til at oprette og s\u00e6lge printables. Fra platformguider til forretningsstrategier.',
    metaTitle: 'Vejledninger | Opret og s\u00e6lg printables | LessonCraftStudio',
    metaDescription: '65 trin-for-trin-vejledninger til at oprette og s\u00e6lge printables. Platformguider, oprettelsesguider og forretningsstrategier for Etsy, KDP, TPT.',
    ctaTitle: 'Begynd at skabe i dag',
    ctaDescription: 'Pr\u00f8v alle 33 generatorer gratis med vandm\u00e6rke. Ingen tilmelding.',
    ctaButton: 'Pr\u00f8v generatorerne gratis',
    subcatDescriptions: {
      platform: 'S\u00e5dan opretter og s\u00e6lger du p\u00e5 specifikke platforme',
      product: 'S\u00e5dan opretter du specifikke typer printables',
      business: 'V\u00e6kst og skalering af din printable-forretning',
    },
  },
  no: {
    heroTitle: 'Veiledninger',
    heroDescription: 'Steg-for-steg-veiledninger for \u00e5 lage og selge utskrifter. Fra plattformguider til forretningsstrategier.',
    metaTitle: 'Veiledninger | Lag og selg utskrifter | LessonCraftStudio',
    metaDescription: '65 steg-for-steg-veiledninger for \u00e5 lage og selge utskrifter. Plattformguider, produksjonsguider og forretningsstrategier for Etsy, KDP, TPT.',
    ctaTitle: 'Begynn \u00e5 lage i dag',
    ctaDescription: 'Pr\u00f8v alle 33 generatorer gratis med vannmerke. Ingen registrering.',
    ctaButton: 'Pr\u00f8v generatorene gratis',
    subcatDescriptions: {
      platform: 'Slik oppretter og selger du p\u00e5 spesifikke plattformer',
      product: 'Slik oppretter du spesifikke typer utskrifter',
      business: 'Vekst og skalering av din utskriftsvirksomhet',
    },
  },
  fi: {
    heroTitle: 'Oppaat',
    heroDescription: 'Vaiheittaiset oppaat tulostettavien luomiseen ja myyntiin. Alustaohjeet, luomisoppaat ja liiketoimintastrategiat.',
    metaTitle: 'Oppaat | Luo ja myy tulostettavia | LessonCraftStudio',
    metaDescription: '65 vaiheittaista opasta tulostettavien luomiseen ja myyntiin. Alustaohjeet, luomisoppaat ja liiketoimintastrategiat Etsyyn, KDP:hen ja TPT:hen.',
    ctaTitle: 'Aloita luominen t\u00e4n\u00e4\u00e4n',
    ctaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei rekister\u00f6itymist\u00e4.',
    ctaButton: 'Kokeile generaattoreita ilmaiseksi',
    subcatDescriptions: {
      platform: 'Kuinka luoda ja myyd\u00e4 tietyill\u00e4 alustoilla',
      product: 'Kuinka luoda tiettyj\u00e4 tulostettavien tyyppej\u00e4',
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

  return (
    <div className="min-h-screen bg-gray-50">
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
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar m\u00e1s', pt: 'Explorar mais', it: 'Esplora di pi\u00f9', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lis\u00e4\u00e4' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas gr\u00e1tis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis v\u00e6rkt\u00f8jer', no: 'Gratisverkt\u00f8y', fi: 'Ilmaiset ty\u00f6kalut' }[locale] || 'Free Tools'}
            </Link>
            <Link href={`/${locale}/ideas`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Niche Ideas', de: 'Nischen-Ideen', fr: 'Id\u00e9es de niches', es: 'Ideas de nichos', pt: 'Ideias de nichos', it: 'Idee di nicchia', nl: 'Niche-idee\u00ebn', sv: 'Nischid\u00e9er', da: 'Nicheideer', no: 'Nisjeideer', fi: 'Niche-ideat' }[locale] || 'Niche Ideas'}
            </Link>
            <Link href={`/${locale}/start`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Get Started', de: 'Erste Schritte', fr: 'D\u00e9marrer', es: 'Comenzar', pt: 'Come\u00e7ar', it: 'Inizia', nl: 'Aan de slag', sv: 'Kom ig\u00e5ng', da: 'Kom i gang', no: 'Kom i gang', fi: 'Aloita' }[locale] || 'Get Started'}
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
