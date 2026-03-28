import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { startPageSlugs, getStartSlugForLocale } from '@/config/start-page-slugs';
import { getHreflangCode, ogLocaleMap, generateStartCollectionSchema, generateStartItemListSchema } from '@/lib/schema-generator';
import { getStartContent } from '@/config/start-content';
import type { SupportedLocale } from '@/config/product-page-slugs';

const baseUrl = 'https://www.lessoncraftstudio.com';

const startKeywords: Record<string, string[]> = {
  en: ['start and grow printable business', 'printable business guides for beginners', 'how to sell printables on Etsy KDP', 'Etsy printable seller guide', 'KDP activity book beginner guide', 'passive income with printables'],
  de: ['Druckvorlagen-Geschäft starten', 'Druckvorlagen-Business für Anfänger', 'Druckvorlagen verkaufen', 'Etsy Verkäufer Leitfaden', 'KDP Anfänger Anleitung', 'passives Einkommen Druckvorlagen'],
  fr: ['lancer business imprimables', 'business imprimables débutants', 'comment vendre imprimables', 'guide vendeur Etsy', 'guide débutant KDP', 'revenus passifs imprimables'],
  es: ['iniciar negocio imprimibles', 'negocio imprimibles principiantes', 'cómo vender imprimibles', 'guía vendedor Etsy', 'guía principiante KDP', 'ingresos pasivos imprimibles'],
  pt: ['iniciar negócio imprimíveis', 'negócio imprimíveis iniciantes', 'como vender imprimíveis', 'guia vendedor Etsy', 'guia iniciante KDP', 'renda passiva imprimíveis'],
  it: ['avviare business stampabili', 'business stampabili principianti', 'come vendere stampabili', 'guida venditore Etsy', 'guida principiante KDP', 'reddito passivo stampabili'],
  nl: ['printable bedrijf starten', 'printable business voor beginners', 'printables verkopen', 'Etsy verkopersgids', 'KDP beginnersgids', 'passief inkomen printables'],
  sv: ['starta utskriftsföretag', 'utskriftsföretag nybörjare', 'sälja utskrifter', 'Etsy säljarguide', 'KDP nybörjarguide', 'passiv inkomst utskrifter'],
  da: ['starte printable-forretning', 'printable-forretning begyndere', 'sælge printables', 'Etsy sælgerguide', 'KDP begynderguide', 'passiv indkomst printables'],
  no: ['starte utskriftsvirksomhet', 'utskriftsvirksomhet nybegynnere', 'selge utskrifter', 'Etsy selgerguide', 'KDP nybegynnerguide', 'passiv inntekt utskrifter'],
  fi: ['aloita tulostettavien yritys', 'tulostettavien yritys aloittelijoille', 'myydä tulostettavia', 'Etsy myyjäopas', 'KDP aloittelijan opas', 'passiivinen tulo tulostettavat'],
};

const startPageContent: Record<string, {
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}> = {
  en: {
    heroTitle: 'Start & Grow a Printable Business',
    heroDescription: 'Everything you need to start and grow a profitable printable business. From first product to full-time income.',
    metaTitle: 'Start & Grow a Printable Business — Guides | LCS',
    metaDescription: 'Everything to start and grow a printable business. Guides for Etsy, KDP, marketing, pricing, scaling & legal. From first product to full-time income.',
    ctaTitle: 'Ready to Create?',
    ctaDescription: 'Try all 33 printable generators free with watermark. No signup required.',
    ctaButton: 'Try Free Generators',
  },
  de: {
    heroTitle: 'Druckvorlagen-Geschäftsleitfäden',
    heroDescription: 'Alles, was Sie brauchen, um ein profitables Druckvorlagen-Geschäft zu starten und auszubauen. Von der Nischenwahl bis zur Umsatzsteigerung.',
    metaTitle: 'Druckvorlagen-Geschäftsleitfäden | Starten & Wachsen | LessonCraftStudio',
    metaDescription: 'Umfassende Leitfäden zum Starten und Ausbauen eines Druckvorlagen-Geschäfts. Verkauf auf Etsy, Amazon KDP, TPT. Preisgestaltung, Marketing und Nischenstrategie.',
    ctaTitle: 'Bereit zum Erstellen?',
    ctaDescription: 'Alle 33 Druckvorlagen-Generatoren gratis mit Wasserzeichen testen. Keine Anmeldung.',
    ctaButton: 'Generatoren gratis testen',
  },
  fr: {
    heroTitle: "Guides pour votre entreprise d’imprimables",
    heroDescription: "Tout ce qu’il faut pour lancer et développer une entreprise d’imprimables rentable. Du choix de niche à la croissance des ventes.",
    metaTitle: "Guides d’entreprise d’imprimables | Lancer et développer | LessonCraftStudio",
    metaDescription: "Guides complets pour lancer et développer une entreprise d’imprimables. Vente sur Etsy, Amazon KDP, TPT. Prix, marketing et stratégies de niche.",
    ctaTitle: 'Prêt à créer ?',
    ctaDescription: 'Essayez les 33 générateurs gratuits avec filigrane. Sans inscription.',
    ctaButton: 'Essayer les générateurs',
  },
  es: {
    heroTitle: 'Guías de negocio de imprimibles',
    heroDescription: 'Todo lo que necesitas para iniciar y hacer crecer un negocio de imprimibles rentable. Desde elegir un nicho hasta escalar tus ventas.',
    metaTitle: 'Guías de negocio de imprimibles | Iniciar y crecer | LessonCraftStudio',
    metaDescription: 'Guías completas para iniciar y hacer crecer un negocio de imprimibles. Venta en Etsy, Amazon KDP, TPT. Precios, marketing y estrategias de nicho.',
    ctaTitle: '¿Listo para crear?',
    ctaDescription: 'Prueba los 33 generadores gratis con marca de agua. Sin registro.',
    ctaButton: 'Probar generadores gratis',
  },
  pt: {
    heroTitle: 'Guias de negócio de imprimíveis',
    heroDescription: 'Tudo o que precisa para iniciar e fazer crescer um negócio de imprimíveis rentável. Da escolha de nicho ao crescimento das vendas.',
    metaTitle: 'Guias de negócio de imprimíveis | Iniciar e crescer | LessonCraftStudio',
    metaDescription: 'Guias completos para iniciar e fazer crescer um negócio de imprimíveis. Venda no Etsy, Amazon KDP, TPT. Preços, marketing e estratégias de nicho.',
    ctaTitle: 'Pronto para criar?',
    ctaDescription: "Experimente os 33 geradores grátis com marca d’água. Sem registo.",
    ctaButton: 'Experimentar geradores grátis',
  },
  it: {
    heroTitle: 'Guide per il business di stampabili',
    heroDescription: 'Tutto ciò che serve per avviare e far crescere un business di stampabili redditizio. Dalla scelta della nicchia alla crescita delle vendite.',
    metaTitle: 'Guide per il business di stampabili | Avviare e crescere | LessonCraftStudio',
    metaDescription: 'Guide complete per avviare e far crescere un business di stampabili. Vendita su Etsy, Amazon KDP, TPT. Prezzi, marketing e strategie di nicchia.',
    ctaTitle: 'Pronto a creare?',
    ctaDescription: 'Prova tutti i 33 generatori gratis con filigrana. Senza registrazione.',
    ctaButton: 'Prova i generatori gratis',
  },
  nl: {
    heroTitle: 'Gidsen voor printable-bedrijf',
    heroDescription: 'Alles wat je nodig hebt om een winstgevend printable-bedrijf te starten en te laten groeien. Van niche kiezen tot verkoop opschalen.',
    metaTitle: 'Gidsen voor printable-bedrijf | Starten en groeien | LessonCraftStudio',
    metaDescription: 'Uitgebreide gidsen voor het starten en laten groeien van een printable-bedrijf. Verkopen op Etsy, Amazon KDP, TPT. Prijzen, marketing en nichestrategieën.',
    ctaTitle: 'Klaar om te maken?',
    ctaDescription: 'Probeer alle 33 generatoren gratis met watermerk. Geen registratie.',
    ctaButton: 'Generatoren gratis proberen',
  },
  sv: {
    heroTitle: 'Guider för utskriftsföretag',
    heroDescription: 'Allt du behöver för att starta och växa ett lönsamt utskriftsföretag. Från nischval till försäljningstillväxt.',
    metaTitle: 'Guider för utskriftsföretag | Starta och väx | LessonCraftStudio',
    metaDescription: 'Kompletta guider för att starta och växa ett utskriftsföretag. Försäljning på Etsy, Amazon KDP, TPT. Priser, marknadsföring och nischstrategier.',
    ctaTitle: 'Redo att skapa?',
    ctaDescription: 'Prova alla 33 generatorer gratis med vattenstämpel. Ingen registrering.',
    ctaButton: 'Prova generatorerna gratis',
  },
  da: {
    heroTitle: 'Guider til printable-forretning',
    heroDescription: 'Alt du behøver for at starte og vækste en profitabel printable-forretning. Fra nichevalg til salgsvækst.',
    metaTitle: 'Guider til printable-forretning | Start og vækst | LessonCraftStudio',
    metaDescription: 'Omfattende guider til at starte og vækste en printable-forretning. Salg på Etsy, Amazon KDP, TPT. Priser, marketing og nichestrategier.',
    ctaTitle: 'Klar til at skabe?',
    ctaDescription: 'Prøv alle 33 generatorer gratis med vandmærke. Ingen tilmelding.',
    ctaButton: 'Prøv generatorerne gratis',
  },
  no: {
    heroTitle: 'Guider for utskriftsvirksomhet',
    heroDescription: 'Alt du trenger for å starte og vokse en lønnsom utskriftsvirksomhet. Fra nisjevalg til salgsvekst.',
    metaTitle: 'Guider for utskriftsvirksomhet | Start og voks | LessonCraftStudio',
    metaDescription: 'Omfattende guider for å starte og vokse en utskriftsvirksomhet. Salg på Etsy, Amazon KDP, TPT. Priser, markedsføring og nisjestrategier.',
    ctaTitle: 'Klar til å lage?',
    ctaDescription: 'Prøv alle 33 generatorer gratis med vannmerke. Ingen registrering.',
    ctaButton: 'Prøv generatorene gratis',
  },
  fi: {
    heroTitle: 'Tulostettavien yritysoppaat',
    heroDescription: 'Kaikki mitä tarvitset kannattavan tulostettavien yrityksen perustamiseen ja kasvattamiseen. Nichevalinnasta myynnin kasvattamiseen.',
    metaTitle: 'Tulostettavien yritysoppaat | Perusta ja kasvata | LessonCraftStudio',
    metaDescription: 'Kattavat oppaat tulostettavien yrityksen perustamiseen ja kasvattamiseen. Myynti Etsyssä, Amazon KDP:ssä, TPT:ssä. Hinnoittelu, markkinointi ja nichestrategiat.',
    ctaTitle: 'Valmis luomaan?',
    ctaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei rekisteröitymistä.',
    ctaButton: 'Kokeile generaattoreita ilmaiseksi',
  },
};

// Fallback guide titles (English) used when content file not available
const guideInfoFallback: Record<string, { title: string; description: string }> = {
  'complete-guide-printable-business': { title: 'Complete Guide to Printable Business', description: 'Everything you need to launch and grow a profitable printable business from scratch.' },
  'create-worksheets-that-sell': { title: 'Create Worksheets That Sell', description: 'Design tips and strategies for creating professional, sellable worksheets.' },
  'printable-business-blueprint': { title: 'Printable Business Blueprint', description: 'Step-by-step blueprint for building a successful printable product business.' },
  'etsy-printable-business': { title: 'Etsy Printable Business', description: 'How to create and sell printable products on Etsy for consistent income.' },
  'amazon-kdp-activity-books': { title: 'Amazon KDP Activity Books', description: 'How to create and publish activity books on Amazon KDP.' },
  'create-multilingual-worksheets': { title: 'Create Multilingual Worksheets', description: 'How to reach international customers with multi-language printable products.' },
  'commercial-license-guide': { title: 'Commercial License Guide', description: 'Understanding commercial licenses for printable products.' },
  'printable-business-income': { title: 'Printable Business Income', description: 'Building reliable income streams with digital printable products.' },
  'tools-for-printable-business': { title: 'Tools for Printable Business', description: 'The essential tools and resources you need to run a printable business.' },
  'marketing-printable-business': { title: 'Marketing Your Printable Business', description: 'Marketing strategies to grow your printable product sales.' },
  'scaling-printable-business': { title: 'Scaling Your Printable Business', description: 'How to scale from side hustle to full-time printable business.' },
  'printable-business-legal': { title: 'Printable Business Legal Guide', description: 'Legal essentials for running a printable business — licenses, taxes, and compliance.' },
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
  const t = startPageContent[locale] || startPageContent.en;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/start`;
  }
  alternates['x-default'] = `${baseUrl}/en/start`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: startKeywords[locale] || startKeywords.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/start`,
      languages: alternates,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      type: 'website',
      url: `${baseUrl}/${locale}/start`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

export default async function StartListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const t = startPageContent[locale] || startPageContent.en;

  // Load content for each guide to get localized titles/descriptions
  const guideContentMap = new Map<string, { title: string; description: string }>();
  await Promise.all(
    startPageSlugs.map(async (guide) => {
      const content = await getStartContent(guide.startId, locale);
      if (content) {
        guideContentMap.set(guide.startId, {
          title: content.hero.title,
          description: content.hero.description,
        });
      }
    })
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.heroTitle },
    ],
  };

  const collectionSchema = generateStartCollectionSchema(locale);
  const allStartItems = startPageSlugs.map(s => ({
    name: guideContentMap.get(s.startId)?.title || s.startId,
    slug: getStartSlugForLocale(s.startId, locale) || s.slugs.en,
  }));
  const itemListSchema = generateStartItemListSchema(locale, allStartItems);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {t.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {startPageSlugs.map(guide => {
              const info = guideContentMap.get(guide.startId) || guideInfoFallback[guide.startId];
              if (!info) return null;
              const slug = getStartSlugForLocale(guide.startId, locale) || guide.slugs.en;

              return (
                <Link
                  key={guide.startId}
                  href={`/${locale}/start/${slug}`}
                  className="p-5 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <h2 className="font-bold text-gray-900 mb-2">{info.title}</h2>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </Link>
              );
            })}
          </div>
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
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Guías', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
            {t.ctaDescription}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
