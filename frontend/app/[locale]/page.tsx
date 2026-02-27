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

// Localized SEO metadata with researched keywords for all 11 languages
const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {
  en: {
    title: 'Free Worksheet Generators for Teachers | LessonCraftStudio',
    description: 'Create free printable worksheets with 33 generators and 3,000+ images. Math, coloring, word searches & puzzles. Download PDF instantly. No signup required.',
    keywords: 'free worksheet generator, printable worksheets for kids, math worksheet maker, kindergarten worksheets, first grade worksheets, coloring page generator, word search creator, educational printables, teacher worksheet tools, PDF worksheet download, preschool activities, classroom worksheets',
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
    title: 'Gratis Werkblad Generatoren — PDF | LessonCraftStudio',
    description: 'Maak werkbladen met 33 generatoren en 3.000+ afbeeldingen. Rekenen, kleurplaten, woordzoekers & puzzels. Download PDF direct. Geen registratie nodig. Gratis.',
    keywords: 'werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, kleurplaten, oefenbladen gratis, letters leren, tafels oefenen, fijne motoriek, sommen tot 20, werkblad generatoren',
    ogAlt: 'LessonCraftStudio - Professionele werkblad-generatoren'
  },
  sv: {
    title: 'Gratis Arbetsblad Generatorer för Barn | LessonCraftStudio',
    description: 'Skapa arbetsblad med 33 generatorer och 3 000+ bilder. Matte, målarbilder, ordjaktar & pussel. Ladda ner PDF direkt. Gratis, ingen registrering krävs.',
    keywords: 'arbetsblad gratis, matematik arbetsblad, målarbilder barn, förskoleklass material, bokstäver lära sig, multiplikationstabellen, finmotorik övningar, addition subtraktion, siffror tal, arbetsblad generatorer',
    ogAlt: 'LessonCraftStudio - Professionella arbetsblads-generatorer'
  },
  da: {
    title: 'Gratis Arbejdsark Generatorer til B\u00f8rn | LessonCraftStudio',
    description: 'Lav arbejdsark med 33 generatorer og 3.000+ billeder. Matematik, malebog, ordsøgning & puslespil. Hent gratis PDF med det samme. Ingen tilmelding nødvendig.',
    keywords: 'opgaver til print, matematikopgaver, gratis skoleopgaver, arbejdsark, 0. klasse opgaver, 1. klasse, malebog, gangetabeller, finmotorik øvelser, lære bogstaver',
    ogAlt: 'LessonCraftStudio - Professionelle arbejdsark-generatorer'
  },
  no: {
    title: 'Gratis Arbeidsark Generatorer til Barn | LessonCraftStudio',
    description: 'Lag arbeidsark med 33 generatorer og 3 000+ bilder. Matte, fargelegging, ordsøk & puslespill. Last ned PDF direkte. Gratis, ingen registrering nødvendig.',
    keywords: 'arbeidsark gratis, matteoppgaver, fargeleggingsbilder barn, oppgavehefter barn, gangetabellen, addisjon subtraksjon, finmotorikk øvelser, bokstaver lære skrive, lesetrening, arbeidsark generatorer',
    ogAlt: 'LessonCraftStudio - Profesjonelle arbeidsark-generatorer'
  },
  fi: {
    title: 'Ilmaiset Työarkki-Generaattorit Lapsille | LessonCraftStudio',
    description: 'Luo työarkkeja lapsille 33 generaattorilla ja 3 000+ kuvalla. Matematiikka, väritys, sanaristikot ja pulmat. Lataa PDF heti — ilmainen, ei rekisteröintiä.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali, matematiikka tehtävät alakoulu, värityskuvia lapsille, kertotaulut, hienomotoriikka harjoitukset, kirjaimet harjoittelu, yhteenlasku vähennyslasku, lukemaan oppiminen, työarkki generaattorit',
    ogAlt: 'LessonCraftStudio - Ammattimaiset ty\u00f6arkki-generaattorit'
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
