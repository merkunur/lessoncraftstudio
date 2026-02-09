import { Metadata } from 'next';
import { generateHomepageSchemas, getHreflangCode, ogLocaleMap, generateImageGallerySchema, generateImageObjectSchema } from '@/lib/schema-generator';
import type { SampleImageData } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHomepageSamplesData } from '@/lib/homepage-samples-data';
import {
  HomepageHero,
  SampleGallery,
  AppCategories,
  HomepageFeatures,
  HowItWorks,
  HomepageBlogPosts,
  HomepageCTA,
  HomepageFAQ,
} from '@/components/homepage';
import { homepageFaqData } from '@/components/homepage/HomepageFAQ';
import { generateFAQSchema } from '@/lib/schema-generator';

// Localized SEO metadata with researched keywords for all 11 languages
const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {
  en: {
    title: 'Free Worksheet Generators for Teachers | LessonCraftStudio',
    description: 'Create free printable worksheets with 33 generators and 3,000+ images. Math, coloring, word searches & puzzles. Download PDF instantly. No signup required.',
    keywords: 'kindergarten worksheets, math worksheets, free printable worksheets, worksheet generator, alphabet worksheets, first grade worksheets, addition worksheets, coloring worksheets, phonics worksheets, tracing worksheets',
    ogAlt: 'LessonCraftStudio - Professional Worksheet Generators'
  },
  de: {
    title: 'Kostenlose Arbeitsblatt-Generatoren | LessonCraftStudio',
    description: 'Erstellen Sie Arbeitsblätter mit 33 Generatoren und 3.000+ Bildern. Mathe, Ausmalbilder, Wortsuche & Rätsel. PDF sofort herunterladen. Keine Anmeldung nötig.',
    keywords: 'Arbeitsblätter Grundschule, Mathe Arbeitsblätter, kostenlose Arbeitsblätter, Vorschule Arbeitsblätter, Ausmalbilder, Buchstaben lernen, Schwungübungen, Einmaleins, Rechnen 1. Klasse, Arbeitsblatt Generator',
    ogAlt: 'LessonCraftStudio - Professionelle Arbeitsblatt-Generatoren'
  },
  fr: {
    title: 'Générateurs de Fiches Gratuits | LessonCraftStudio',
    description: 'Créez des fiches avec 33 générateurs et 3 000+ images. Maths, coloriages, mots cachés & puzzles. Téléchargez le PDF instantanément. Sans inscription.',
    keywords: 'fiches maternelle, exercices CP CE1, coloriage à imprimer, fiches à imprimer gratuit, graphisme maternelle, apprendre à lire, exercices maths, alphabet, tables de multiplication, générateur de fiches',
    ogAlt: 'LessonCraftStudio - G\u00e9n\u00e9rateurs de fiches professionnels'
  },
  es: {
    title: 'Generadores de Fichas Gratis | LessonCraftStudio',
    description: 'Cree fichas con 33 generadores y 3.000+ imágenes. Matemáticas, colorear, sopa de letras y puzzles. Descargue PDF al instante. Sin registro necesario.',
    keywords: 'fichas para imprimir, fichas infantil, fichas preescolar, grafomotricidad, ejercicios matemáticas, dibujos para colorear, abecedario, fichas gratis, lectoescritura, tablas de multiplicar',
    ogAlt: 'LessonCraftStudio - Generadores de fichas profesionales'
  },
  pt: {
    title: 'Geradores de Atividades Grátis | LessonCraftStudio',
    description: 'Crie atividades com 33 geradores e 3.000+ imagens. Matemática, colorir, caça-palavras e quebra-cabeças. Baixe PDF na hora. Sem cadastro necessário.',
    keywords: 'atividades para imprimir, atividades educação infantil, atividades de alfabetização, atividades de matemática, desenhos para colorir, coordenação motora, atividades 1º ano, tabuada, letra cursiva, atividades grátis',
    ogAlt: 'LessonCraftStudio - Geradores de planilhas profissionais'
  },
  it: {
    title: 'Generatori di Schede Didattiche Gratis | LessonCraftStudio',
    description: 'Crea schede didattiche con 33 generatori e 3.000+ immagini. Matematica, colorare, cerca parole e puzzle. Scarica PDF subito. Gratis, senza registrazione.',
    keywords: "schede didattiche, schede didattiche scuola primaria, pregrafismo, schede matematica, disegni da colorare, tabelline, alfabeto, scuola dell'infanzia, numeri da stampare, generatori di schede",
    ogAlt: 'LessonCraftStudio - Generatori di schede professionali'
  },
  nl: {
    title: 'Gratis Werkblad Generatoren | LessonCraftStudio',
    description: 'Maak werkbladen met 33 generatoren en 3.000+ afbeeldingen. Rekenen, kleurplaten, woordzoekers & puzzels. Download PDF direct. Geen registratie nodig.',
    keywords: 'werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, kleurplaten, oefenbladen gratis, letters leren, tafels oefenen, fijne motoriek, sommen tot 20, werkblad generatoren',
    ogAlt: 'LessonCraftStudio - Professionele werkblad-generatoren'
  },
  sv: {
    title: 'Gratis Arbetsblad Generatorer | LessonCraftStudio',
    description: 'Skapa arbetsblad med 33 generatorer och 3 000+ bilder. Matte, målarbilder, ordjaktar & pussel. Ladda ner PDF direkt. Gratis, ingen registrering krävs.',
    keywords: 'arbetsblad gratis, matematik arbetsblad, målarbilder barn, förskoleklass material, bokstäver lära sig, multiplikationstabellen, finmotorik övningar, addition subtraktion, siffror tal, arbetsblad generatorer',
    ogAlt: 'LessonCraftStudio - Professionella arbetsblads-generatorer'
  },
  da: {
    title: 'Gratis Arbejdsark Generatorer | LessonCraftStudio',
    description: 'Lav arbejdsark med 33 generatorer og 3.000+ billeder. Matematik, malebog, ordsøgning & puslespil. Download PDF med det samme. Ingen tilmelding nødvendig.',
    keywords: 'opgaver til print, matematikopgaver, gratis skoleopgaver, arbejdsark, 0. klasse opgaver, 1. klasse, malebog, gangetabeller, finmotorik øvelser, lære bogstaver',
    ogAlt: 'LessonCraftStudio - Professionelle arbejdsark-generatorer'
  },
  no: {
    title: 'Gratis Arbeidsark Generatorer | LessonCraftStudio',
    description: 'Lag arbeidsark med 33 generatorer og 3 000+ bilder. Matte, fargelegging, ordsøk & puslespill. Last ned PDF direkte. Gratis, ingen registrering nødvendig.',
    keywords: 'arbeidsark gratis, matteoppgaver, fargeleggingsbilder barn, oppgavehefter barn, gangetabellen, addisjon subtraksjon, finmotorikk øvelser, bokstaver lære skrive, lesetrening, arbeidsark generatorer',
    ogAlt: 'LessonCraftStudio - Profesjonelle arbeidsark-generatorer'
  },
  fi: {
    title: 'Ilmaiset Työarkki-Generaattorit | LessonCraftStudio',
    description: 'Luo työarkkeja 33 generaattorilla ja 3 000+ kuvalla. Matematiikka, väritys, sanaristikot & pulmat. Lataa PDF heti. Ilmainen, ei rekisteröintiä.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali, matematiikka tehtävät alakoulu, värityskuvia lapsille, kertotaulut, hienomotoriikka harjoitukset, kirjaimet harjoittelu, yhteenlasku vähennyslasku, lukemaan oppiminen, työarkki generaattorit',
    ogAlt: 'LessonCraftStudio - Ammattimaiset ty\u00f6arkki-generaattorit'
  }
};

// Localized gallery names for ImageGallery JSON-LD
const galleryNames: Record<string, string> = {
  en: 'Free Worksheet Samples',
  de: 'Kostenlose Arbeitsblatt-Beispiele',
  fr: '\u00c9chantillons de fiches gratuits',
  es: 'Muestras de fichas gratuitas',
  pt: 'Amostras de atividades gratuitas',
  it: 'Esempi di schede didattiche gratuite',
  nl: 'Gratis werkblad voorbeelden',
  sv: 'Gratis arbetsblad exempel',
  da: 'Gratis arbejdsark eksempler',
  no: 'Gratis arbeidsark eksempler',
  fi: 'Ilmaiset ty\u00f6arkkin\u00e4ytteet',
};

// Enable ISR - revalidate every 5 minutes (reduced from 1 hour for faster content updates)
export const revalidate = 300;

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

  // Fetch dynamic homepage images server-side (baked into ISR HTML)
  const { dynamicImages, seoData, heroImages } = await getHomepageSamplesData(locale);

  // Generate ImageGallery JSON-LD from homepage sample thumbnails
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const sampleImages: SampleImageData[] = Object.entries(dynamicImages).map(([appId, thumbUrl]) => ({
    src: thumbUrl,
    name: seoData[appId]?.title || appId,
    description: seoData[appId]?.description || seoData[appId]?.altText || appId,
    caption: seoData[appId]?.caption || seoData[appId]?.altText || appId,
    width: 400,
    height: 566,
    thumbnailSrc: thumbUrl,
    dateModified: seoData[appId]?.updatedAt,
  }));

  if (sampleImages.length > 0) {
    // C2 fix: Generate ImageObject schemas that match the @id references in ImageGallery
    for (let i = 0; i < sampleImages.length; i++) {
      schemas.push(generateImageObjectSchema(sampleImages[i], `${baseUrl}/${locale}`, baseUrl, locale, i, i === 0));
    }
    const gallerySchema = generateImageGallerySchema(
      sampleImages,
      galleryNames[locale] || galleryNames.en,
      `${baseUrl}/${locale}`,
      locale,
      baseUrl
    );
    schemas.push(gallerySchema);
  }

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

      {/* Hero Section - Dark dramatic design */}
      <HomepageHero locale={locale} heroImages={heroImages} />

      {/* Free Sample Downloads - Dark background continues */}
      <SampleGallery locale={locale} dynamicImages={dynamicImages} seoData={seoData} />

      {/* App Categories - Light background transition */}
      <AppCategories locale={locale} />

      {/* Features - Warm amber accents */}
      <HomepageFeatures locale={locale} />

      {/* How It Works - Timeline */}
      <HowItWorks locale={locale} />

      {/* Blog Posts - Bridge equity from homepage to blog content */}
      <HomepageBlogPosts locale={locale} />

      {/* FAQ Section - Adds content + targets long-tail queries + FAQ schema */}
      <HomepageFAQ locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Final CTA - Dark gradient */}
      <HomepageCTA locale={locale} />
    </>
  );
}
