import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

interface PageProps {
  params: {
    locale: string;
    slug: string[];
  };
}

// Supported languages
const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

export default async function StaticPage({ params }: PageProps) {
  const { locale, slug } = params;

  // Check if locale is supported
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Build the file path
  const pagePath = slug.join('/');

  // Try different possible paths
  const possiblePaths = [
    // Direct path with .html
    path.join(process.cwd(), 'public', 'static-pages', locale, `${pagePath}.html`),
    // Path under pages directory
    path.join(process.cwd(), 'public', 'static-pages', locale, 'pages', `${pagePath}.html`),
    // Path under blog directory
    path.join(process.cwd(), 'public', 'static-pages', locale, 'blog', `${pagePath}.html`),
    // Index file in directory
    path.join(process.cwd(), 'public', 'static-pages', locale, pagePath, 'index.html'),
  ];

  // Find the first existing file
  let htmlContent = '';
  let fileFound = false;

  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        htmlContent = fs.readFileSync(filePath, 'utf-8');
        fileFound = true;
        break;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  if (!fileFound) {
    notFound();
  }

  // Update paths in HTML to work with Next.js routing
  htmlContent = htmlContent
    // Fix static page links
    .replace(/href="\/static\//g, 'href="/static/')
    .replace(/href="\/static-pages\//g, 'href="/static/')
    // Fix worksheet generator links
    .replace(/href="\/worksheet-generators\//g, 'href="/worksheet-generators/')
    // Fix asset paths
    .replace(/src="\/images\//g, 'src="/images/')
    .replace(/src="\/js\//g, 'src="/js/')
    .replace(/src="\/css\//g, 'src="/css/')
    // Update language links
    .replace(/href="\/([a-z]{2})\/pages\//g, 'href="/static/$1/')
;

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

// Generate static params for known pages
export async function generateStaticParams() {
  const staticParams: { locale: string; slug: string[] }[] = [];

  // Common pages (exclude 'apps' and 'pricing' - they have their own dedicated routes)
  const commonPages = ['homepage', 'contact', 'about', 'terms', 'privacy'];

  supportedLocales.forEach(locale => {
    commonPages.forEach(page => {
      staticParams.push({
        locale: locale,
        slug: [page]
      });
    });
  });

  return staticParams;
}

// Metadata generation
export async function generateMetadata({ params }: PageProps) {
  try {
  const { locale, slug } = params;
  if (!slug || slug.length === 0) return {};
  const pageName = slug[slug.length - 1];
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Known valid pages that should be indexed with full SEO
  const knownPages = ['homepage', 'contact', 'about', 'terms', 'privacy'];

  // Pages that exist in all locales and need hreflang
  const hreflangPages = ['terms', 'privacy', 'contact', 'faq'];

  // Default metadata based on page — all 11 locales
  const titles: Record<string, Record<string, string>> = {
    homepage: {
      en: 'LessonCraftStudio - Professional Worksheet Generator',
      de: 'LessonCraftStudio - Professioneller Arbeitsblatt-Generator',
      fr: 'LessonCraftStudio - Générateur de Feuilles de Travail Professionnel',
      es: 'LessonCraftStudio - Generador de Hojas de Trabajo Profesional',
      pt: 'LessonCraftStudio - Gerador de Planilhas Profissional',
      it: 'LessonCraftStudio - Generatore di Schede Professionali',
      nl: 'LessonCraftStudio - Professionele Werkblad Generator',
      sv: 'LessonCraftStudio - Professionell Arbetsblads-generator',
      da: 'LessonCraftStudio - Professionel Arbejdsark-generator',
      no: 'LessonCraftStudio - Profesjonell Arbeidsark-generator',
      fi: 'LessonCraftStudio - Ammattimainen Työarkki-generaattori',
    },
    terms: {
      en: 'Terms of Service | LessonCraftStudio',
      de: 'Nutzungsbedingungen | LessonCraftStudio',
      fr: 'Conditions d\'utilisation | LessonCraftStudio',
      es: 'Términos de servicio | LessonCraftStudio',
      pt: 'Termos de serviço | LessonCraftStudio',
      it: 'Termini di servizio | LessonCraftStudio',
      nl: 'Gebruiksvoorwaarden | LessonCraftStudio',
      sv: 'Användarvillkor | LessonCraftStudio',
      da: 'Brugsvilkår | LessonCraftStudio',
      no: 'Brukervilkår | LessonCraftStudio',
      fi: 'Käyttöehdot | LessonCraftStudio',
    },
    privacy: {
      en: 'Privacy Policy | LessonCraftStudio',
      de: 'Datenschutzerklärung | LessonCraftStudio',
      fr: 'Politique de confidentialité | LessonCraftStudio',
      es: 'Política de privacidad | LessonCraftStudio',
      pt: 'Política de privacidade | LessonCraftStudio',
      it: 'Informativa sulla privacy | LessonCraftStudio',
      nl: 'Privacybeleid | LessonCraftStudio',
      sv: 'Integritetspolicy | LessonCraftStudio',
      da: 'Privatlivspolitik | LessonCraftStudio',
      no: 'Personvernerklæring | LessonCraftStudio',
      fi: 'Tietosuojakäytäntö | LessonCraftStudio',
    },
  };

  const descriptions: Record<string, Record<string, string>> = {
    terms: {
      en: 'Read the terms of service for LessonCraftStudio worksheet generators.',
      de: 'Lesen Sie die Nutzungsbedingungen für LessonCraftStudio Arbeitsblatt-Generatoren.',
      fr: 'Lisez les conditions d\'utilisation des générateurs de fiches LessonCraftStudio.',
      es: 'Lea los términos de servicio de los generadores de fichas LessonCraftStudio.',
      pt: 'Leia os termos de serviço dos geradores de planilhas LessonCraftStudio.',
      it: 'Leggi i termini di servizio dei generatori di schede LessonCraftStudio.',
      nl: 'Lees de gebruiksvoorwaarden van LessonCraftStudio werkblad generatoren.',
      sv: 'Läs användarvillkoren för LessonCraftStudio arbetsblads-generatorer.',
      da: 'Læs brugsvilkårene for LessonCraftStudio arbejdsark-generatorer.',
      no: 'Les brukervilkårene for LessonCraftStudio arbeidsark-generatorer.',
      fi: 'Lue LessonCraftStudio työarkki-generaattoreiden käyttöehdot.',
    },
    privacy: {
      en: 'Read our privacy policy. Learn how LessonCraftStudio protects your data.',
      de: 'Lesen Sie unsere Datenschutzerklärung. Erfahren Sie, wie LessonCraftStudio Ihre Daten schützt.',
      fr: 'Lisez notre politique de confidentialité. Découvrez comment LessonCraftStudio protège vos données.',
      es: 'Lea nuestra política de privacidad. Descubra cómo LessonCraftStudio protege sus datos.',
      pt: 'Leia nossa política de privacidade. Saiba como o LessonCraftStudio protege seus dados.',
      it: 'Leggi la nostra informativa sulla privacy. Scopri come LessonCraftStudio protegge i tuoi dati.',
      nl: 'Lees ons privacybeleid. Ontdek hoe LessonCraftStudio uw gegevens beschermt.',
      sv: 'Läs vår integritetspolicy. Lär dig hur LessonCraftStudio skyddar dina data.',
      da: 'Læs vores privatlivspolitik. Lær hvordan LessonCraftStudio beskytter dine data.',
      no: 'Les vår personvernerklæring. Lær hvordan LessonCraftStudio beskytter dine data.',
      fi: 'Lue tietosuojakäytäntömme. Tutustu siihen, miten LessonCraftStudio suojaa tietojasi.',
    },
  };

  const title = titles[pageName]?.[locale] || `${pageName} - LessonCraftStudio`;
  const description = descriptions[pageName]?.[locale] || 'Professional worksheet generators with 100+ themed images for educators and publishers';

  // If page is not in known pages list, add noindex to prevent search engine indexing
  if (!knownPages.includes(pageName)) {
    return {
      title,
      description,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Build hreflang alternates for pages that exist in all locales
  const pagePath = slug.join('/');
  const hreflangLanguages: Record<string, string> = {};
  if (hreflangPages.includes(pageName)) {
    for (const loc of SUPPORTED_LOCALES) {
      const hreflangCode = getHreflangCode(loc);
      hreflangLanguages[hreflangCode] = `${baseUrl}/${loc}/${pagePath}`;
    }
    hreflangLanguages['x-default'] = `${baseUrl}/en/${pagePath}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/${pagePath}`,
      ...(Object.keys(hreflangLanguages).length > 0 && { languages: hreflangLanguages }),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/${pagePath}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
  } catch {
    return {};
  }
}