import { Metadata } from 'next';
import { generateHomepageSchemas, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
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
} from '@/components/homepage';
import { homepageFaqData } from '@/components/homepage/HomepageFAQ';
import { generateFAQSchema } from '@/lib/schema-generator';

// Localized SEO metadata for entrepreneur audience (Etsy, KDP, printables business)
const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {
  en: {
    title: 'Printable Worksheet Generator | Create & Sell on Etsy & KDP',
    description: '33 professional worksheet generators with 3,000+ images and 11 languages. Create print-ready PDFs in minutes. Try free — commercial license for Etsy, KDP & TPT.',
    keywords: 'printable worksheet generator, worksheet maker, create printables to sell, printable generator for Etsy sellers, educational worksheet maker, word search maker, bingo card maker, crossword puzzle maker',
    ogAlt: 'LessonCraftStudio - Printable Worksheet Generator for Etsy & KDP'
  },
  de: {
    title: 'Arbeitsblatt Generator | Erstellen & Verkaufen auf Etsy & KDP',
    description: '33 professionelle Arbeitsblatt-Generatoren mit 3.000+ Bildern und 11 Sprachen. Druckfertige PDFs in Minuten. Kostenlos testen — kommerzielle Lizenz für Etsy, KDP & Co.',
    keywords: 'Arbeitsblatt Generator, Arbeitsblätter erstellen, Druckvorlagen erstellen zum Verkaufen, Unterrichtsmaterial Generator, Arbeitsblatt Ersteller, Suchsel Generator, Kreuzworträtsel erstellen',
    ogAlt: 'LessonCraftStudio - Arbeitsblatt Generator für Etsy & KDP'
  },
  fr: {
    title: 'Générateur de fiches pédagogiques | Créer & vendre sur Etsy & KDP',
    description: '33 générateurs de fiches avec 3 000+ images et 11 langues. PDF prêts à imprimer en minutes. Essai gratuit — licence commerciale pour Etsy, KDP & plus.',
    keywords: 'générateur fiches pédagogiques, générateur mots mêlés, générateur mots croisés, fiches maths à imprimer, générateur coloriages, créer fiches à imprimer, générateur sudoku',
    ogAlt: 'LessonCraftStudio - Générateur de fiches pédagogiques pour Etsy & KDP'
  },
  es: {
    title: 'Generador de fichas educativas | Crear y vender en Etsy y KDP',
    description: '33 generadores de fichas con 3.000+ imágenes y 11 idiomas. PDF listos para imprimir en minutos. Prueba gratis — licencia comercial para Etsy, KDP y más.',
    keywords: 'generador de fichas educativas, crear fichas para imprimir, generador de ejercicios, herramientas para crear fichas, generador sopa de letras, generador crucigramas, fichas de matemáticas para imprimir',
    ogAlt: 'LessonCraftStudio - Generador de fichas educativas para Etsy y KDP'
  },
  pt: {
    title: 'Gerador de atividades educativas | Criar e vender no Etsy e KDP',
    description: '33 geradores de atividades com 3.000+ imagens e 11 idiomas. PDF prontos para imprimir em minutos. Teste grátis — licença comercial para Etsy, KDP e mais.',
    keywords: 'gerador de atividades educativas, criar atividades para imprimir, gerador de exercícios, ferramenta para criar atividades, gerador caça-palavras, gerador cruzadinha, atividades de matemática para imprimir',
    ogAlt: 'LessonCraftStudio — Gerador de atividades educativas para Etsy e KDP'
  },
  it: {
    title: 'Generatore di schede didattiche | Creare e vendere su Etsy e KDP',
    description: '33 generatori di schede con 3.000+ immagini e 11 lingue. PDF pronti da stampare in pochi minuti. Prova gratis — licenza commerciale per Etsy, KDP e altro.',
    keywords: 'generatore schede didattiche, creare schede didattiche da stampare, generatore esercizi, strumenti per creare schede, generatore materiale didattico',
    ogAlt: 'LessonCraftStudio - Avvia un business di stampabili redditizio'
  },
  nl: {
    title: 'Werkbladen generator | Maken & verkopen op Etsy & KDP',
    description: '33 professionele werkblad-generatoren met 3.000+ plaatjes en 11 talen. Printklare PDF\'s in minuten. Gratis proberen — commerciële licentie voor Etsy, KDP & meer.',
    keywords: 'werkbladen generator, werkbladen maken printen, lesmateriaal generator, tools voor werkbladen maken',
    ogAlt: 'LessonCraftStudio - Werkbladen generator voor Etsy & KDP'
  },
  sv: {
    title: 'Arbetsblad generator | Skapa och sälj på Etsy & KDP',
    description: '33 professionella arbetsbladsgeneratorer med 3 000+ bilder och 11 språk. Utskrivbara PDF:er på minuter. Prova gratis — kommersiell licens för Etsy, KDP & mer.',
    keywords: 'arbetsblad generator, skapa arbetsblad skriva ut, uppgiftsgenerator, verktyg för att skapa uppgifter, ordsök generator, korsord generator, matteuppgifter generator, målarbilder skapa',
    ogAlt: 'LessonCraftStudio — Arbetsblad generator för Etsy & KDP'
  },
  da: {
    title: 'Arbejdsark generator | Lav og sælg på Etsy & KDP',
    description: '33 professionelle arbejdsark-generatorer med 3.000+ billeder og 11 sprog. Printklare PDF\'er på minutter. Prøv gratis — kommerciel licens til Etsy, KDP & mere.',
    keywords: 'arbejdsark generator, opgaver til print, ordleg generator, krydsord generator, plusstykker til print, regneopgaver generator, malebilleder generator, sudoku til print, sælge printables Etsy.dk',
    ogAlt: 'LessonCraftStudio - Arbejdsark generator til Etsy & KDP'
  },
  no: {
    title: 'Arbeidsark generator | Lag og selg på Etsy & KDP',
    description: '33 profesjonelle arbeidsark-generatorer med 3 000+ bilder og 11 språk. Utskrivbare PDF-er på minutter. Prøv gratis — kommersiell lisens for Etsy, KDP & mer.',
    keywords: 'arbeidsark generator, lage arbeidsark skrive ut, oppgavegenerator, verktøy for å lage oppgaver, ordleting generator, kryssord generator, matteoppgaver generator, fargeleggingsbilder lage',
    ogAlt: 'LessonCraftStudio — Arbeidsark generator for Etsy & KDP'
  },
  fi: {
    title: 'Aloita kannattava tulostettavien liiketoiminta | LessonCraftStudio',
    description: 'Rakenna tulostettavien liiketoiminta Etsyssa, Amazon KDP:ssa tai TPT:ssa. 33 ammattimaista generaattoria, yli 3 000 kuvaa, 11 kielta. Ilmainen kokeiluversio vesileimalla.',
    keywords: 'tulostettavien liiketoiminta, myy tulostettavia Etsy, KDP tehtaevat, lisaetulot tulostettavat, sananetsinta generaattori, ammattimaiset tulostettavat',
    ogAlt: 'LessonCraftStudio - Aloita kannattava tulostettavien liiketoiminta'
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
