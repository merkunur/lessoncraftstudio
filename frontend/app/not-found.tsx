import Link from 'next/link';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

// R11b (SEO Part 6): server component — resolve the locale from the request
// path header on the SERVER so the 404 SSR HTML carries the correct-locale
// strings. The prior 'use client' version resolved the locale only after
// hydration, so the server-rendered 404 streamed English strings into every
// locale's flight payload. Mirrors app/[locale]/not-found.tsx:112-125.

const DEFAULT_LOCALE = 'en';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

const translations: Record<string, {
  title: string;
  description: string;
  goToHomepage: string;
  browseAllApps: string;
  needHelp: string;
  contactUs: string;
}> = {
  en: {
    title: '404 - Page Not Found',
    description: "Sorry, we couldn't find the page you're looking for.",
    goToHomepage: 'Go to Homepage',
    browseAllApps: 'Browse Worksheets',
    needHelp: 'Need help?',
    contactUs: 'Contact us',
  },
  de: {
    title: '404 - Seite nicht gefunden',
    description: 'Die gesuchte Seite konnte leider nicht gefunden werden.',
    goToHomepage: 'Zur Startseite',
    browseAllApps: 'Arbeitsblätter durchsuchen',
    needHelp: 'Brauchen Sie Hilfe?',
    contactUs: 'Kontaktieren Sie uns',
  },
  fr: {
    title: '404 - Page non trouvée',
    description: "Désolé, la page que vous recherchez est introuvable.",
    goToHomepage: "Aller à l'accueil",
    browseAllApps: 'Parcourir les fiches',
    needHelp: "Besoin d'aide ?",
    contactUs: 'Contactez-nous',
  },
  es: {
    title: '404 - Página no encontrada',
    description: 'Lo sentimos, no pudimos encontrar la página que buscas.',
    goToHomepage: 'Ir a la página principal',
    browseAllApps: 'Ver las hojas de trabajo',
    needHelp: '¿Necesitas ayuda?',
    contactUs: 'Contáctanos',
  },
  pt: {
    title: '404 - Página não encontrada',
    description: 'Desculpe, não conseguimos encontrar a página que procura.',
    goToHomepage: 'Ir para a página inicial',
    browseAllApps: 'Ver as atividades',
    needHelp: 'Precisa de ajuda?',
    contactUs: 'Contacte-nos',
  },
  it: {
    title: '404 - Pagina non trovata',
    description: 'Ci dispiace, non siamo riusciti a trovare la pagina.',
    goToHomepage: 'Vai alla home page',
    browseAllApps: 'Sfoglia le schede',
    needHelp: 'Hai bisogno di aiuto?',
    contactUs: 'Contattaci',
  },
  nl: {
    title: '404 - Pagina niet gevonden',
    description: 'Sorry, we konden de pagina die je zoekt niet vinden.',
    goToHomepage: 'Ga naar startpagina',
    browseAllApps: 'Bekijk werkbladen',
    needHelp: 'Hulp nodig?',
    contactUs: 'Neem contact op',
  },
  sv: {
    title: '404 - Sidan hittades inte',
    description: 'Tyvärr kunde vi inte hitta sidan du letar efter.',
    goToHomepage: 'Gå till startsidan',
    browseAllApps: 'Bläddra bland arbetsblad',
    needHelp: 'Behöver du hjälp?',
    contactUs: 'Kontakta oss',
  },
  da: {
    title: '404 - Siden blev ikke fundet',
    description: 'Beklager, vi kunne ikke finde den side, du leder efter.',
    goToHomepage: 'Gå til forsiden',
    browseAllApps: 'Se arbejdsark',
    needHelp: 'Brug for hjælp?',
    contactUs: 'Kontakt os',
  },
  no: {
    title: '404 - Siden ble ikke funnet',
    description: 'Beklager, vi kunne ikke finne siden du leter etter.',
    goToHomepage: 'Gå til forsiden',
    browseAllApps: 'Se arbeidsark',
    needHelp: 'Trenger du hjelp?',
    contactUs: 'Kontakt oss',
  },
  fi: {
    title: '404 - Sivua ei löytynyt',
    description: 'Valitettavasti emme löytäneet etsimääsi sivua.',
    goToHomepage: 'Siirry etusivulle',
    browseAllApps: 'Selaa tehtäväsivuja',
    needHelp: 'Tarvitsetko apua?',
    contactUs: 'Ota yhteyttä',
  },
};

export default function NotFound() {
  // Resolve locale server-side from the request path header (mirrors
  // app/[locale]/not-found.tsx) so SSR renders the correct-locale 404.
  let locale = DEFAULT_LOCALE;
  try {
    const headersList = headers();
    const pathname = headersList.get('x-next-url') || headersList.get('x-invoke-path') || '';
    const match = pathname.match(/^\/([a-z]{2})\//);
    if (match && match[1] in translations) {
      locale = match[1];
    }
  } catch {
    // Fallback to English
  }
  const t = translations[locale] || translations[DEFAULT_LOCALE];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <span className="text-6xl" role="img" aria-label="confused face">
            {String.fromCodePoint(0x1F914)}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600 mb-6">{t.description}</p>
        <div className="space-y-3">
          <Link
            href={`/${locale}`}
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t.goToHomepage}
          </Link>
          <Link
            href={`/${locale}/worksheets`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {t.browseAllApps}
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          {t.needHelp}{' '}
          <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">
            {t.contactUs}
          </Link>
        </p>
      </div>
    </div>
  );
}
