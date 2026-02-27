import { Metadata } from 'next';
import { generateHomepageSchemas, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  HomepageHero,
  AppCategories,
  HomepageFeatures,
  HowItWorks,
  HomepageCTA,
  HomepageFAQ,
} from '@/components/homepage';
import { homepageFaqData } from '@/components/homepage/HomepageFAQ';
import { generateFAQSchema } from '@/lib/schema-generator';

// Localized SEO metadata for entrepreneur audience (Etsy, KDP, printables business)
const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {
  en: {
    title: 'Professional Printable Generators | Create & Sell on Etsy & KDP',
    description: 'Create professional printables with 33 generators. Word searches, math worksheets, coloring pages & puzzles. Try free with watermark. Sell on Etsy, Amazon KDP.',
    keywords: 'printable generator, Etsy printables, KDP worksheets, sell printables online, printable business, word search maker, coloring page creator, math worksheet generator, side hustle printables, commercial license printables',
    ogAlt: 'LessonCraftStudio - Professional Printable Generators'
  },
  de: {
    title: 'Professionelle Druckvorlagen-Generatoren | Erstellen & Verkaufen',
    description: 'Erstellen Sie professionelle Druckvorlagen mit 33 Generatoren. Kostenlos testen mit Wasserzeichen. Verkaufen Sie auf Etsy, Amazon KDP und mehr.',
    keywords: 'Druckvorlagen erstellen, Etsy Druckvorlagen, KDP Arbeitsblätter, Druckvorlagen verkaufen, Printables Business, Wortsuche Generator, professionelle Druckvorlagen',
    ogAlt: 'LessonCraftStudio - Professionelle Druckvorlagen-Generatoren'
  },
  fr: {
    title: "Générateurs d'Imprimables Professionnels | Créer & Vendre",
    description: "Créez des imprimables professionnels avec 33 générateurs. Essai gratuit avec filigrane. Vendez sur Etsy, Amazon KDP et plus.",
    keywords: "générateur imprimables, Etsy imprimables, KDP fiches, vendre imprimables en ligne, business imprimables, mots mêlés générateur, imprimables professionnels",
    ogAlt: "LessonCraftStudio - Générateurs d'imprimables professionnels"
  },
  es: {
    title: 'Generadores de Imprimibles Profesionales | Crear y Vender',
    description: 'Crea imprimibles profesionales con 33 generadores. Prueba gratis con marca de agua. Vende en Etsy, Amazon KDP y más.',
    keywords: 'generador imprimibles, Etsy imprimibles, KDP fichas, vender imprimibles online, negocio imprimibles, sopa de letras generador, imprimibles profesionales',
    ogAlt: 'LessonCraftStudio - Generadores de imprimibles profesionales'
  },
  pt: {
    title: 'Geradores de Imprimíveis Profissionais | Criar e Vender',
    description: "Crie imprimíveis profissionais com 33 geradores. Teste grátis com marca d'agua. Venda no Etsy, Amazon KDP e mais.",
    keywords: 'gerador imprimíveis, Etsy imprimíveis, KDP atividades, vender imprimíveis online, negócio imprimíveis, imprimíveis profissionais',
    ogAlt: 'LessonCraftStudio - Geradores de imprimíveis profissionais'
  },
  it: {
    title: 'Generatori di Stampabili Professionali | Crea e Vendi',
    description: 'Crea stampabili professionali con 33 generatori. Prova gratis con filigrana. Vendi su Etsy, Amazon KDP e altro.',
    keywords: 'generatore stampabili, Etsy stampabili, KDP schede, vendere stampabili online, business stampabili, stampabili professionali',
    ogAlt: 'LessonCraftStudio - Generatori di stampabili professionali'
  },
  nl: {
    title: 'Professionele Printbare Generatoren | Maak & Verkoop',
    description: 'Maak professionele printbare producten met 33 generatoren. Probeer gratis met watermerk. Verkoop op Etsy, Amazon KDP en meer.',
    keywords: 'printbare generator, Etsy printables, KDP werkbladen, printables verkopen, printables business, professionele printables',
    ogAlt: 'LessonCraftStudio - Professionele printbare generatoren'
  },
  sv: {
    title: 'Professionella Utskriftsgeneratorer | Skapa & Sälj',
    description: 'Skapa professionella utskrifter med 33 generatorer. Prova gratis med vattenstämpel. Sälj på Etsy, Amazon KDP och mer.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP arbetsblad, sälja utskrifter online, professionella utskrifter',
    ogAlt: 'LessonCraftStudio - Professionella utskriftsgeneratorer'
  },
  da: {
    title: 'Professionelle Printbare Generatorer | Opret & Sælg',
    description: 'Opret professionelle printbare produkter med 33 generatorer. Prøv gratis med vandmærke. Sælg på Etsy, Amazon KDP og mere.',
    keywords: 'printbar generator, Etsy printables, KDP arbejdsark, sælge printables, professionelle printables',
    ogAlt: 'LessonCraftStudio - Professionelle printbare generatorer'
  },
  no: {
    title: 'Profesjonelle Utskriftsgeneratorer | Lag & Selg',
    description: 'Lag profesjonelle utskrifter med 33 generatorer. Prøv gratis med vannmerke. Selg på Etsy, Amazon KDP og mer.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP arbeidsark, selge utskrifter, profesjonelle utskrifter',
    ogAlt: 'LessonCraftStudio - Profesjonelle utskriftsgeneratorer'
  },
  fi: {
    title: 'Ammattimaiset Tulostusgeneraattorit | Luo & Myy',
    description: 'Luo ammattimaisia tulostettavia 33 generaattorilla. Kokeile ilmaiseksi vesileimalla. Myy Etsyssä, Amazon KDP:ssä ja muualla.',
    keywords: 'tulostusgeneraattori, Etsy tulostettavat, KDP tehtävät, myy tulostettavia, ammattimaiset tulostettavat',
    ogAlt: 'LessonCraftStudio - Ammattimaiset tulostusgeneraattorit'
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
      images: [{
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: localizedMeta.ogAlt
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedMeta.title,
      description: localizedMeta.description,
      images: [`${baseUrl}/opengraph-image.png`]
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

      {/* Hero Section */}
      <HomepageHero locale={locale} />

      {/* App Categories */}
      <AppCategories locale={locale} />

      {/* Features */}
      <HomepageFeatures locale={locale} />

      {/* How It Works */}
      <HowItWorks locale={locale} />

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
