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
  HomepageFAQ,
} from '@/components/homepage';
import { homepageFaqData } from '@/components/homepage/HomepageFAQ';
import { generateFAQSchema } from '@/lib/schema-generator';

// Localized SEO metadata with researched keywords for all 11 languages
const homepageMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'Free Worksheet Generators for Teachers | Math, Coloring & More | LessonCraftStudio',
    description: '33 free printable worksheet generators with 3,000+ themed images. Create math worksheets, coloring pages, word searches & puzzles in minutes. Download PDF instantly. Commercial license included.',
    keywords: 'kindergarten worksheets, math worksheets, free printable worksheets, worksheet generator, alphabet worksheets, first grade worksheets, addition worksheets, coloring worksheets, phonics worksheets, tracing worksheets'
  },
  de: {
    title: 'Kostenlose Arbeitsblatt-Generatoren f\u00fcr Lehrer | Mathe, Ausmalbilder & Mehr | LessonCraftStudio',
    description: '33 kostenlose Arbeitsblatt-Generatoren mit 3.000+ Bildern. Mathe-Arbeitsbl\u00e4tter, Ausmalbilder, Wortsuche & R\u00e4tsel in Minuten erstellen. PDF sofort herunterladen. Kommerzielle Lizenz inklusive.',
    keywords: 'Arbeitsblätter Grundschule, Mathe Arbeitsblätter, kostenlose Arbeitsblätter, Vorschule Arbeitsblätter, Ausmalbilder, Buchstaben lernen, Schwungübungen, Einmaleins, Rechnen 1. Klasse, Arbeitsblatt Generator'
  },
  fr: {
    title: 'G\u00e9n\u00e9rateurs de Fiches Gratuits pour Enseignants | Maths, Coloriage & Plus | LessonCraftStudio',
    description: '33 g\u00e9n\u00e9rateurs de fiches gratuits avec 3 000+ images. Cr\u00e9ez fiches maths, coloriages, mots cach\u00e9s & puzzles en minutes. T\u00e9l\u00e9chargez le PDF instantan\u00e9ment. Licence commerciale incluse.',
    keywords: 'fiches maternelle, exercices CP CE1, coloriage à imprimer, fiches à imprimer gratuit, graphisme maternelle, apprendre à lire, exercices maths, alphabet, tables de multiplication, générateur de fiches'
  },
  es: {
    title: 'Generadores de Fichas Gratis para Maestros | Matem\u00e1ticas, Colorear & M\u00e1s | LessonCraftStudio',
    description: '33 generadores de fichas gratis con 3.000+ im\u00e1genes. Cree fichas de matem\u00e1ticas, colorear, sopa de letras y puzzles en minutos. Descargue PDF al instante. Licencia comercial incluida.',
    keywords: 'fichas para imprimir, fichas infantil, fichas preescolar, grafomotricidad, ejercicios matemáticas, dibujos para colorear, abecedario, fichas gratis, lectoescritura, tablas de multiplicar'
  },
  pt: {
    title: 'Geradores de Atividades Gr\u00e1tis para Professores | Matem\u00e1tica, Colorir & Mais | LessonCraftStudio',
    description: '33 geradores de atividades gr\u00e1tis com 3.000+ imagens. Crie atividades de matem\u00e1tica, colorir, ca\u00e7a-palavras e quebra-cabe\u00e7as em minutos. Baixe PDF na hora. Licen\u00e7a comercial inclu\u00edda.',
    keywords: 'atividades para imprimir, atividades educação infantil, atividades de alfabetização, atividades de matemática, desenhos para colorir, coordenação motora, atividades 1º ano, tabuada, letra cursiva, atividades grátis'
  },
  it: {
    title: 'Generatori di Schede Didattiche Gratis per Insegnanti | Matematica, Colorare & Altro | LessonCraftStudio',
    description: '33 generatori di schede gratis con 3.000+ immagini. Crea schede di matematica, disegni da colorare, cerca parole e puzzle in pochi minuti. Scarica PDF subito. Licenza commerciale inclusa.',
    keywords: 'schede didattiche, schede didattiche scuola primaria, pregrafismo, schede matematica, disegni da colorare, tabelline, alfabeto, scuola dell\'infanzia, numeri da stampare, generatori di schede'
  },
  nl: {
    title: 'Gratis Werkblad Generatoren voor Leerkrachten | Rekenen, Kleurplaten & Meer | LessonCraftStudio',
    description: '33 gratis werkblad generatoren met 3.000+ afbeeldingen. Maak rekenwerkbladen, kleurplaten, woordzoekers & puzzels in minuten. Download PDF direct. Commerci\u00eble licentie inbegrepen.',
    keywords: 'werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, kleurplaten, oefenbladen gratis, letters leren, tafels oefenen, fijne motoriek, sommen tot 20, werkblad generatoren'
  },
  sv: {
    title: 'Gratis Arbetsblad Generatorer f\u00f6r L\u00e4rare | Matte, M\u00e5larbilder & Mer | LessonCraftStudio',
    description: '33 gratis arbetsblad generatorer med 3 000+ bilder. Skapa mattearbetsblad, m\u00e5larbilder, ordjaktar & pussel p\u00e5 minuter. Ladda ner PDF direkt. Kommersiell licens ing\u00e5r.',
    keywords: 'arbetsblad gratis, matematik arbetsblad, målarbilder barn, förskoleklass material, bokstäver lära sig, multiplikationstabellen, finmotorik övningar, addition subtraktion, siffror tal, arbetsblad generatorer'
  },
  da: {
    title: 'Gratis Arbejdsark Generatorer for L\u00e6rere | Matematik, Malebog & Mere | LessonCraftStudio',
    description: '33 gratis arbejdsark generatorer med 3.000+ billeder. Lav matematikopgaver, malebog, ords\u00f8gning & puslespil p\u00e5 minutter. Download PDF med det samme. Kommerciel licens inkluderet.',
    keywords: 'opgaver til print, matematikopgaver, gratis skoleopgaver, arbejdsark, 0. klasse opgaver, 1. klasse, malebog, gangetabeller, finmotorik øvelser, lære bogstaver'
  },
  no: {
    title: 'Gratis Arbeidsark Generatorer for L\u00e6rere | Matte, Fargelegging & Mer | LessonCraftStudio',
    description: '33 gratis arbeidsark generatorer med 3 000+ bilder. Lag matteoppgaver, fargeleggingsbilder, ords\u00f8k & puslespill p\u00e5 minutter. Last ned PDF direkte. Kommersiell lisens inkludert.',
    keywords: 'arbeidsark gratis, matteoppgaver, fargeleggingsbilder barn, oppgavehefter barn, gangetabellen, addisjon subtraksjon, finmotorikk øvelser, bokstaver lære skrive, lesetrening, arbeidsark generatorer'
  },
  fi: {
    title: 'Ilmaiset Ty\u00f6arkki Generaattorit Opettajille | Matematiikka, V\u00e4ritys & Lis\u00e4\u00e4 | LessonCraftStudio',
    description: '33 ilmaista ty\u00f6arkki-generaattoria 3 000+ kuvalla. Luo matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia, sanaristikkoja & pulmia minuuteissa. Lataa PDF heti. Kaupallinen lisenssi sis\u00e4ltyy.',
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

  // Generate FAQ schema from homepage FAQ data
  const faqData = homepageFaqData[locale] || homepageFaqData.en;
  const faqSchema = generateFAQSchema(faqData.items, locale);

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
