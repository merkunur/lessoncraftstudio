import { Metadata } from 'next';
import { generateHomepageSchemas, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { encodeImagePath } from '@/lib/encode-image-path';
import {
  HomepageHero,
  AppCategories,
  HowItWorks,
  HomepageCTA,
  HomepageFAQ,
  SellerSuccessStories,
  QuickDemo,
  UntappedOpportunity,
  PricingTeaser,
  FreeToolsSection,
} from '@/components/homepage';
import { homepageFaqData } from '@/components/homepage/HomepageFAQ';
import { generateFAQSchema } from '@/lib/schema-generator';

// Locale-specific hero worksheet images for og:image (addition is the most visually representative)
const homepageOgImages: Record<string, string> = {
  en: '/samples/english/addition/addition-fun-1.webp',
  de: '/samples/german/addition/additionsspa-1.webp',
  fr: '/samples/french/addition/addition-amusant-1.webp',
  es: '/samples/spanish/addition/suma-divertida-1.webp',
  pt: '/samples/portuguese/addition/adição-divertida-1.webp',
  it: '/samples/italian/addition/addizione-divertente-1.webp',
  nl: '/samples/dutch/addition/optellen-is-leuk-1.webp',
  sv: '/samples/swedish/addition/addition-övning.webp',
  da: '/samples/danish/addition/sjov-addition-1.webp',
  no: '/samples/norwegian/addition/gøy-addisjon-1.webp',
  fi: '/samples/english/addition/addition-fun-1.webp',
};

// Localized SEO metadata for entrepreneur audience (Etsy, KDP, printables business)
const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {
  en: {
    title: '33 Printable Generators for KDP Publishers & Etsy Sellers | LessonCraftStudio',
    description: 'Create KDP activity books and Etsy printable bundles with 33 generators. Word searches, math drills, coloring books, puzzles. One-time $49, commercial license. Try free trial.',
    keywords: 'KDP activity book generator, printable generator for Etsy sellers, KDP worksheet generator, Book Bolt alternative, create printables to sell, printable business tools, word search maker KDP, coloring book generator',
    ogAlt: 'LessonCraftStudio - 33 Printable Generators for KDP Publishers & Etsy Sellers'
  },
  de: {
    title: 'Printable-Generatoren für Etsy- & KDP-Verkäufer | LessonCraftStudio',
    description: '33 professionelle Printable-Generatoren für Etsy-Verkäufer und KDP-Verleger. Arbeitsblätter, Rätsel, Malbücher und mehr. Kommerzielle Lizenz. Kostenlos testen mit Wasserzeichen.',
    keywords: 'Printable Generator Etsy verkaufen, KDP Arbeitsblätter erstellen, Druckvorlagen erstellen zum Verkaufen, Suchsel Generator kommerziell, Kreuzworträtsel erstellen verkaufen, Printable Business starten',
    ogAlt: 'LessonCraftStudio - Printable-Generatoren für Etsy- & KDP-Verkäufer'
  },
  fr: {
    title: 'Générateurs de printables pour vendeurs Etsy & KDP | LessonCraftStudio',
    description: '33 générateurs de printables pour vendeurs Etsy et éditeurs KDP. Mots mêlés, maths, coloriages et plus. Licence commerciale. Essayer gratuitement avec filigrane.',
    keywords: 'générateur printables vendre Etsy, créer fiches à vendre, KDP cahiers activités, générateur mots mêlés commercial, business printables, licence commerciale fiches',
    ogAlt: 'LessonCraftStudio - Générateurs de printables pour vendeurs Etsy & KDP'
  },
  es: {
    title: 'Generadores de imprimibles para vendedores Etsy & KDP | LessonCraftStudio',
    description: '33 generadores de imprimibles para vendedores Etsy y editores KDP. Sopas de letras, fichas de matemáticas, libros para colorear y más. Licencia comercial. Probar gratis con marca de agua.',
    keywords: 'generador imprimibles vender Etsy, crear fichas para vender, KDP libros actividades, generador sopa de letras comercial, negocio imprimibles, licencia comercial fichas',
    ogAlt: 'LessonCraftStudio - Generadores de imprimibles para vendedores Etsy & KDP'
  },
  pt: {
    title: 'Geradores de printables para vendedores Etsy & KDP | LessonCraftStudio',
    description: '33 geradores de printables para vendedores Etsy e editores KDP. Caça-palavras, fichas de matemática, livros para colorir e mais. Licença comercial. Teste grátis com marca d\'água.',
    keywords: 'gerador printables vender Etsy, criar atividades para vender, KDP livros atividades, gerador caça-palavras comercial, negócio printables, licença comercial atividades',
    ogAlt: 'LessonCraftStudio - Geradores de printables para vendedores Etsy & KDP'
  },
  it: {
    title: 'Generatori di stampabili per venditori Etsy & KDP | LessonCraftStudio',
    description: '33 generatori di stampabili per venditori Etsy e editori KDP. Cruciverba, schede di matematica, libri da colorare e altro. Licenza commerciale. Prova gratis con filigrana.',
    keywords: 'generatore stampabili vendere Etsy, creare schede da vendere, KDP libri attività, generatore cruciverba commerciale, business stampabili, licenza commerciale schede',
    ogAlt: 'LessonCraftStudio - Generatori di stampabili per venditori Etsy & KDP'
  },
  nl: {
    title: 'Printable-generators voor Etsy- & KDP-verkopers | LessonCraftStudio',
    description: '33 professionele printable-generators voor Etsy-verkopers en KDP-uitgevers. Woordzoekers, rekenbladen, kleurboeken en meer. Commerciële licentie. Gratis proberen met watermerk.',
    keywords: 'printable generator Etsy verkopen, werkbladen maken verkopen, KDP activiteitenboeken, woordzoeker generator commercieel, printable business, commerciële licentie werkbladen',
    ogAlt: 'LessonCraftStudio - Printable-generators voor Etsy- & KDP-verkopers'
  },
  sv: {
    title: 'Printable-generatorer för Etsy- & KDP-säljare | LessonCraftStudio',
    description: '33 professionella printable-generatorer för Etsy-säljare och KDP-förläggare. Ordsök, mattepussel, målarböcker och mer. Kommersiell licens. Prova gratis med vattenstämpel.',
    keywords: 'printable generator Etsy sälja, skapa arbetsblad sälja, KDP aktivitetsböcker, ordsök generator kommersiell, printable business, kommersiell licens arbetsblad',
    ogAlt: 'LessonCraftStudio - Printable-generatorer för Etsy- & KDP-säljare'
  },
  da: {
    title: 'Printable-generatorer for Etsy- & KDP-sælgere | LessonCraftStudio',
    description: '33 professionelle printable-generatorer for Etsy-sælgere og KDP-udgivere. Ordleg, regneopgaver, malebøger og mere. Kommerciel licens. Prøv gratis med vandmærke.',
    keywords: 'printable generator Etsy sælge, lave arbejdsark sælge, KDP aktivitetsbøger, ordleg generator kommerciel, printable business, kommerciel licens arbejdsark',
    ogAlt: 'LessonCraftStudio - Printable-generatorer for Etsy- & KDP-sælgere'
  },
  no: {
    title: 'Printable-generatorer for Etsy- & KDP-selgere | LessonCraftStudio',
    description: '33 profesjonelle printable-generatorer for Etsy-selgere og KDP-utgivere. Ordleting, matteoppgaver, fargeleggingsbøker og mer. Kommersiell lisens. Prøv gratis med vannmerke.',
    keywords: 'printable generator Etsy selge, lage arbeidsark selge, KDP aktivitetsbøker, ordleting generator kommersiell, printable business, kommersiell lisens arbeidsark',
    ogAlt: 'LessonCraftStudio - Printable-generatorer for Etsy- & KDP-selgere'
  },
  fi: {
    title: 'Tulostettavien generaattorit Etsy- & KDP-myyjille | LessonCraftStudio',
    description: '33 ammattimaista tulostettavien generaattoria Etsy-myyjille ja KDP-julkaisijoille. Sanasokkelot, matikkatehtävät, värityskirjat ja muuta. Kaupallinen lisenssi. Kokeile ilmaiseksi vesileimalla.',
    keywords: 'tulostettava generaattori Etsy myydä, luoda tehtäviä myyntiin, KDP aktiviteettikirjat, sanasokkelo generaattori kaupallinen, tulostettavien business, kaupallinen lisenssi tehtävät',
    ogAlt: 'LessonCraftStudio - Tulostettavien generaattorit Etsy- & KDP-myyjille'
  }
};

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Use researched localized metadata
  const localizedMeta = homepageMetadata[locale] || homepageMetadata.en;

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en`;

  return {
    title: localizedMeta.title,
    description: localizedMeta.description,
    keywords: localizedMeta.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: localizedMeta.title,
      description: localizedMeta.description,
      type: 'website',
      url: `${baseUrl}/${locale}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [
        {
          url: `${baseUrl}${encodeImagePath(homepageOgImages[locale] || homepageOgImages.en)}`,
          width: 2480,
          height: 3508,
          type: 'image/webp',
          alt: localizedMeta.ogAlt,
        },
        {
          url: `${baseUrl}/api/og?locale=${locale}&type=homepage&title=${encodeURIComponent(localizedMeta.title)}`,
          width: 1200,
          height: 630,
          alt: localizedMeta.ogAlt,
        },
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedMeta.title,
      description: localizedMeta.description,
      images: [`${baseUrl}${encodeImagePath(homepageOgImages[locale] || homepageOgImages.en)}`]
    }
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';

  // Generate JSON-LD schemas for SEO
  const localizedMeta = homepageMetadata[locale] || homepageMetadata.en;
  const schemas = generateHomepageSchemas(locale, undefined, {
    name: localizedMeta.title,
    description: localizedMeta.description
  });

  // Generate FAQ schema from homepage FAQ data
  const faqData = homepageFaqData[locale] || homepageFaqData.en;
  const faqSchema = generateFAQSchema(faqData.items, locale);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero Section - Business opportunity framing */}
      <HomepageHero locale={locale} />

      {/* Market Opportunity Cards */}
      <SellerSuccessStories locale={locale} />

      {/* Quick Demo Video */}
      <QuickDemo locale={locale} videoId="36keBFzJbPo" />

      {/* Why Printable Businesses Work */}
      <UntappedOpportunity locale={locale} />

      {/* How It Works - 3-step process */}
      <HowItWorks locale={locale} />

      {/* Browse Generators by Category */}
      <AppCategories locale={locale} />

      {/* Pricing Teaser */}
      <PricingTeaser locale={locale} />

      {/* Free Business Tools */}
      <FreeToolsSection locale={locale} />

      {/* FAQ Section */}
      <HomepageFAQ locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Final CTA */}
      <HomepageCTA locale={locale} />
    </>
  );
}
