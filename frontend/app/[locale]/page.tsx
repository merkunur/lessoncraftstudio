import { Metadata } from 'next';
import { generateHomepageSchemas, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
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
} from '@/components/homepage';

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

      {/* Blog Posts - Bridge equity from homepage to blog content */}
      <HomepageBlogPosts locale={locale} />

      {/* Final CTA - Dark gradient */}
      <HomepageCTA locale={locale} />
    </>
  );
}
