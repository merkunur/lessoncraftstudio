import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { startPageSlugs, getStartSlugForLocale } from '@/config/start-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { getStartContent } from '@/config/start-content';
import type { SupportedLocale } from '@/config/product-page-slugs';

const baseUrl = 'https://www.lessoncraftstudio.com';

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
    heroTitle: 'Printable Business Guides',
    heroDescription: 'Everything you need to start and grow a profitable printable business. From choosing a niche to scaling your sales.',
    metaTitle: 'Printable Business Guides | Start & Grow Your Business | LessonCraftStudio',
    metaDescription: 'Comprehensive guides for starting and growing a printable business. Learn to sell on Etsy, Amazon KDP, TPT. Pricing, marketing, and niche selection strategies.',
    ctaTitle: 'Ready to Create?',
    ctaDescription: 'Try all 33 printable generators free with watermark. No signup required.',
    ctaButton: 'Try Free Generators',
  },
  de: {
    heroTitle: 'Druckvorlagen-Gesch\u00e4ftsleitf\u00e4den',
    heroDescription: 'Alles, was Sie brauchen, um ein profitables Druckvorlagen-Gesch\u00e4ft zu starten und auszubauen. Von der Nischenwahl bis zur Umsatzsteigerung.',
    metaTitle: 'Druckvorlagen-Gesch\u00e4ftsleitf\u00e4den | Starten & Wachsen | LessonCraftStudio',
    metaDescription: 'Umfassende Leitf\u00e4den zum Starten und Ausbauen eines Druckvorlagen-Gesch\u00e4fts. Verkauf auf Etsy, Amazon KDP, TPT. Preisgestaltung, Marketing und Nischenstrategie.',
    ctaTitle: 'Bereit zum Erstellen?',
    ctaDescription: 'Alle 33 Druckvorlagen-Generatoren gratis mit Wasserzeichen testen. Keine Anmeldung.',
    ctaButton: 'Generatoren gratis testen',
  },
  fr: {
    heroTitle: "Guides pour votre entreprise d\u2019imprimables",
    heroDescription: "Tout ce qu\u2019il faut pour lancer et d\u00e9velopper une entreprise d\u2019imprimables rentable. Du choix de niche \u00e0 la croissance des ventes.",
    metaTitle: "Guides d\u2019entreprise d\u2019imprimables | Lancer et d\u00e9velopper | LessonCraftStudio",
    metaDescription: "Guides complets pour lancer et d\u00e9velopper une entreprise d\u2019imprimables. Vente sur Etsy, Amazon KDP, TPT. Prix, marketing et strat\u00e9gies de niche.",
    ctaTitle: 'Pr\u00eat \u00e0 cr\u00e9er\u00a0?',
    ctaDescription: 'Essayez les 33 g\u00e9n\u00e9rateurs gratuits avec filigrane. Sans inscription.',
    ctaButton: 'Essayer les g\u00e9n\u00e9rateurs',
  },
  es: {
    heroTitle: 'Gu\u00edas de negocio de imprimibles',
    heroDescription: 'Todo lo que necesitas para iniciar y hacer crecer un negocio de imprimibles rentable. Desde elegir un nicho hasta escalar tus ventas.',
    metaTitle: 'Gu\u00edas de negocio de imprimibles | Iniciar y crecer | LessonCraftStudio',
    metaDescription: 'Gu\u00edas completas para iniciar y hacer crecer un negocio de imprimibles. Venta en Etsy, Amazon KDP, TPT. Precios, marketing y estrategias de nicho.',
    ctaTitle: '\u00bfListo para crear?',
    ctaDescription: 'Prueba los 33 generadores gratis con marca de agua. Sin registro.',
    ctaButton: 'Probar generadores gratis',
  },
  pt: {
    heroTitle: 'Guias de neg\u00f3cio de imprim\u00edveis',
    heroDescription: 'Tudo o que precisa para iniciar e fazer crescer um neg\u00f3cio de imprim\u00edveis rent\u00e1vel. Da escolha de nicho ao crescimento das vendas.',
    metaTitle: 'Guias de neg\u00f3cio de imprim\u00edveis | Iniciar e crescer | LessonCraftStudio',
    metaDescription: 'Guias completos para iniciar e fazer crescer um neg\u00f3cio de imprim\u00edveis. Venda no Etsy, Amazon KDP, TPT. Pre\u00e7os, marketing e estrat\u00e9gias de nicho.',
    ctaTitle: 'Pronto para criar?',
    ctaDescription: "Experimente os 33 geradores gr\u00e1tis com marca d\u2019\u00e1gua. Sem registo.",
    ctaButton: 'Experimentar geradores gr\u00e1tis',
  },
  it: {
    heroTitle: 'Guide per il business di stampabili',
    heroDescription: 'Tutto ci\u00f2 che serve per avviare e far crescere un business di stampabili redditizio. Dalla scelta della nicchia alla crescita delle vendite.',
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
    heroTitle: 'Guider f\u00f6r utskriftsf\u00f6retag',
    heroDescription: 'Allt du beh\u00f6ver f\u00f6r att starta och v\u00e4xa ett l\u00f6nsamt utskriftsf\u00f6retag. Fr\u00e5n nischval till f\u00f6rs\u00e4ljningstillv\u00e4xt.',
    metaTitle: 'Guider f\u00f6r utskriftsf\u00f6retag | Starta och v\u00e4x | LessonCraftStudio',
    metaDescription: 'Kompletta guider f\u00f6r att starta och v\u00e4xa ett utskriftsf\u00f6retag. F\u00f6rs\u00e4ljning p\u00e5 Etsy, Amazon KDP, TPT. Priser, marknadsf\u00f6ring och nischstrategier.',
    ctaTitle: 'Redo att skapa?',
    ctaDescription: 'Prova alla 33 generatorer gratis med vattenst\u00e4mpel. Ingen registrering.',
    ctaButton: 'Prova generatorerna gratis',
  },
  da: {
    heroTitle: 'Guider til printable-forretning',
    heroDescription: 'Alt du beh\u00f8ver for at starte og v\u00e6kste en profitabel printable-forretning. Fra nichevalg til salgsv\u00e6kst.',
    metaTitle: 'Guider til printable-forretning | Start og v\u00e6kst | LessonCraftStudio',
    metaDescription: 'Omfattende guider til at starte og v\u00e6kste en printable-forretning. Salg p\u00e5 Etsy, Amazon KDP, TPT. Priser, marketing og nichestrategier.',
    ctaTitle: 'Klar til at skabe?',
    ctaDescription: 'Pr\u00f8v alle 33 generatorer gratis med vandm\u00e6rke. Ingen tilmelding.',
    ctaButton: 'Pr\u00f8v generatorerne gratis',
  },
  no: {
    heroTitle: 'Guider for utskriftsvirksomhet',
    heroDescription: 'Alt du trenger for \u00e5 starte og vokse en l\u00f8nnsom utskriftsvirksomhet. Fra nisjevalg til salgsvekst.',
    metaTitle: 'Guider for utskriftsvirksomhet | Start og voks | LessonCraftStudio',
    metaDescription: 'Omfattende guider for \u00e5 starte og vokse en utskriftsvirksomhet. Salg p\u00e5 Etsy, Amazon KDP, TPT. Priser, markedsf\u00f8ring og nisjestrategier.',
    ctaTitle: 'Klar til \u00e5 lage?',
    ctaDescription: 'Pr\u00f8v alle 33 generatorer gratis med vannmerke. Ingen registrering.',
    ctaButton: 'Pr\u00f8v generatorene gratis',
  },
  fi: {
    heroTitle: 'Tulostettavien yritysoppaat',
    heroDescription: 'Kaikki mit\u00e4 tarvitset kannattavan tulostettavien yrityksen perustamiseen ja kasvattamiseen. Nichevalinnasta myynnin kasvattamiseen.',
    metaTitle: 'Tulostettavien yritysoppaat | Perusta ja kasvata | LessonCraftStudio',
    metaDescription: 'Kattavat oppaat tulostettavien yrityksen perustamiseen ja kasvattamiseen. Myynti Etsyss\u00e4, Amazon KDP:ss\u00e4, TPT:ss\u00e4. Hinnoittelu, markkinointi ja nichestrategiat.',
    ctaTitle: 'Valmis luomaan?',
    ctaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei rekister\u00f6itymist\u00e4.',
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
  'printable-business-legal': { title: 'Printable Business Legal Guide', description: 'Legal essentials for running a printable business \u2014 licenses, taxes, and compliance.' },
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

  return (
    <div className="min-h-screen bg-gray-50">
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
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar m\u00e1s', pt: 'Explorar mais', it: 'Esplora di pi\u00f9', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lis\u00e4\u00e4' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas gr\u00e1tis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis v\u00e6rkt\u00f8jer', no: 'Gratisverkt\u00f8y', fi: 'Ilmaiset ty\u00f6kalut' }[locale] || 'Free Tools'}
            </Link>
            <Link href={`/${locale}/ideas`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Niche Ideas', de: 'Nischen-Ideen', fr: 'Id\u00e9es de niches', es: 'Ideas de nichos', pt: 'Ideias de nichos', it: 'Idee di nicchia', nl: 'Niche-idee\u00ebn', sv: 'Nischid\u00e9er', da: 'Nicheideer', no: 'Nisjeideer', fi: 'Niche-ideat' }[locale] || 'Niche Ideas'}
            </Link>
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Gu\u00edas', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
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
