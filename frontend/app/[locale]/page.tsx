import { Metadata } from 'next';
import { generateHomepageSchemas, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  HomepageHero,
  SampleGallery,
  AppCategories,
  HomepageFeatures,
  HowItWorks,
  HomepageCTA,
} from '@/components/homepage';

// Locale to language folder mapping (same as in SampleGallery)
const localeToLanguage: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Types for homepage samples data
interface HomepageSamplesData {
  dynamicImages: Record<string, string>;
  seoData: Record<string, { altText?: string; title?: string }>;
  heroImages: { portrait: string; landscape: string };
}

// Server-side function to fetch homepage dynamic images
async function getHomepageSamplesData(locale: string): Promise<HomepageSamplesData> {
  const result: HomepageSamplesData = { dynamicImages: {}, seoData: {}, heroImages: { portrait: '', landscape: '' } };

  try {
    // Use internal API call on server - absolute URL required for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';
    const response = await fetch(`${baseUrl}/api/homepage-samples/list`, {
      next: { revalidate: 300 } // Match page revalidate (5 minutes)
    });
    const data = await response.json();

    if (data.success && data.matrix[locale]) {
      const langData = data.matrix[locale];

      // Build map of appId -> thumbnail URL
      Object.entries(langData.apps).forEach(([appId, app]: [string, unknown]) => {
        const appData = app as { hasThumbnail?: boolean; hasPreviewWebp?: boolean };
        if (appData.hasThumbnail && appData.hasPreviewWebp) {
          // Homepage thumbnails use hyphenated appId in filename
          // Use _thumb.webp (~12KB) instead of _preview.webp (~35KB) to reduce bandwidth
          // This prevents video buffering when gallery images compete with YouTube stream
          result.dynamicImages[appId] = `/samples/${langData.language}/homepage/${appId}-thumbnail_thumb.webp`;
        }
      });

      // Extract SEO data if available
      if (langData.seo) {
        result.seoData = langData.seo;
      }

      // Extract hero image URLs (baked into ISR HTML for immediate display)
      if (langData.hero) {
        if (langData.hero.hasPortraitPreview) {
          result.heroImages.portrait = `/samples/${langData.language}/homepage/hero-portrait_preview.webp`;
        }
        if (langData.hero.hasLandscapePreview) {
          result.heroImages.landscape = `/samples/${langData.language}/homepage/hero-landscape_preview.webp`;
        }
      }
    }
  } catch (error) {
    // Silent fallback to hardcoded images - no console spam in production
    console.error('Failed to fetch homepage samples:', error);
  }

  return result;
}

// Localized SEO metadata with researched keywords for all 11 languages
const homepageMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'LessonCraftStudio - Free Worksheet Generators for Teachers',
    description: '33 professional worksheet generators with 3000+ themed images. Create kindergarten worksheets, math worksheets, and printable activities in minutes. Commercial license included.',
    keywords: 'kindergarten worksheets, math worksheets, free printable worksheets, worksheet generator, alphabet worksheets, first grade worksheets, addition worksheets, coloring worksheets, phonics worksheets, tracing worksheets'
  },
  de: {
    title: 'LessonCraftStudio - Kostenlose Arbeitsblatt-Generatoren',
    description: '33 professionelle Arbeitsblatt-Generatoren mit 3000+ thematischen Bildern. Erstellen Sie Grundschul-Arbeitsblätter, Mathe-Übungen und druckbare Aktivitäten.',
    keywords: 'Arbeitsblätter Grundschule, Mathe Arbeitsblätter, kostenlose Arbeitsblätter, Vorschule Arbeitsblätter, Ausmalbilder, Buchstaben lernen, Schwungübungen, Einmaleins, Rechnen 1. Klasse, Arbeitsblatt Generator'
  },
  fr: {
    title: 'LessonCraftStudio - Générateurs de Fiches Pédagogiques Gratuits',
    description: '33 générateurs de fiches professionnels avec 3000+ images thématiques. Créez des fiches maternelle, exercices CP et activités à imprimer.',
    keywords: 'fiches maternelle, exercices CP CE1, coloriage à imprimer, fiches à imprimer gratuit, graphisme maternelle, apprendre à lire, exercices maths, alphabet, tables de multiplication, générateur de fiches'
  },
  es: {
    title: 'LessonCraftStudio - Generadores de Fichas Educativas Gratis',
    description: '33 generadores de fichas profesionales con 3000+ imágenes temáticas. Cree fichas infantil, ejercicios de matemáticas y actividades para imprimir.',
    keywords: 'fichas para imprimir, fichas infantil, fichas preescolar, grafomotricidad, ejercicios matemáticas, dibujos para colorear, abecedario, fichas gratis, lectoescritura, tablas de multiplicar'
  },
  pt: {
    title: 'LessonCraftStudio - Geradores de Atividades Educativas Grátis',
    description: '33 geradores de atividades profissionais com 3000+ imagens temáticas. Crie atividades de alfabetização, matemática e coordenação motora.',
    keywords: 'atividades para imprimir, atividades educação infantil, atividades de alfabetização, atividades de matemática, desenhos para colorir, coordenação motora, atividades 1º ano, tabuada, letra cursiva, atividades grátis'
  },
  it: {
    title: 'LessonCraftStudio - Generatori di Schede Didattiche Gratis',
    description: '33 generatori di schede professionali con 3000+ immagini tematiche. Crea schede didattiche, esercizi di matematica e attività da stampare.',
    keywords: 'schede didattiche, schede didattiche scuola primaria, pregrafismo, schede matematica, disegni da colorare, tabelline, alfabeto, scuola dell\'infanzia, numeri da stampare, generatori di schede'
  },
  nl: {
    title: 'LessonCraftStudio - Gratis Werkblad Generatoren',
    description: '33 professionele werkblad generatoren met 3000+ thema afbeeldingen. Maak werkbladen voor groep 3, rekenen en kleurplaten.',
    keywords: 'werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, kleurplaten, oefenbladen gratis, letters leren, tafels oefenen, fijne motoriek, sommen tot 20, werkblad generatoren'
  },
  sv: {
    title: 'LessonCraftStudio - Gratis Arbetsblad Generatorer',
    description: '33 professionella arbetsblad generatorer med 3000+ tema bilder. Skapa matematik arbetsblad, målarbilder och förskoleklass material.',
    keywords: 'arbetsblad gratis, matematik arbetsblad, målarbilder barn, förskoleklass material, bokstäver lära sig, multiplikationstabellen, finmotorik övningar, addition subtraktion, siffror tal, arbetsblad generatorer'
  },
  da: {
    title: 'LessonCraftStudio - Gratis Arbejdsark Generatorer',
    description: '33 professionelle arbejdsark generatorer med 3000+ tema billeder. Lav matematikopgaver, malebøger og skoleopgaver.',
    keywords: 'opgaver til print, matematikopgaver, gratis skoleopgaver, arbejdsark, 0. klasse opgaver, 1. klasse, malebog, gangetabeller, finmotorik øvelser, lære bogstaver'
  },
  no: {
    title: 'LessonCraftStudio - Gratis Arbeidsark Generatorer',
    description: '33 profesjonelle arbeidsark generatorer med 3000+ tema bilder. Lag matteoppgaver, fargeleggingsbilder og oppgavehefter.',
    keywords: 'arbeidsark gratis, matteoppgaver, fargeleggingsbilder barn, oppgavehefter barn, gangetabellen, addisjon subtraksjon, finmotorikk øvelser, bokstaver lære skrive, lesetrening, arbeidsark generatorer'
  },
  fi: {
    title: 'LessonCraftStudio - Ilmaiset Työarkki Generaattorit',
    description: '33 ammattimaista työarkki generaattoria 3000+ teemakuvalla. Luo matematiikka tehtäviä, värityskuvia ja esiopetus materiaalia.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali, matematiikka tehtävät alakoulu, värityskuvia lapsille, kertotaulut, hienomotoriikka harjoitukset, kirjaimet harjoittelu, yhteenlasku vähennyslasku, lukemaan oppiminen, työarkki generaattorit'
  }
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
        alt: 'LessonCraftStudio - Professional Worksheet Generators'
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
  const schemas = generateHomepageSchemas(locale);

  // Fetch dynamic homepage images server-side (baked into ISR HTML)
  const { dynamicImages, seoData, heroImages } = await getHomepageSamplesData(locale);

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

      {/* Final CTA - Dark gradient */}
      <HomepageCTA locale={locale} />
    </>
  );
}
