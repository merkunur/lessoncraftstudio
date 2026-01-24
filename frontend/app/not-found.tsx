'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DEFAULT_LOCALE = 'en';

const translations: Record<string, {
  title: string;
  description: string;
  goToHomepage: string;
  browseAllApps: string;
  readOurBlog: string;
  needHelp: string;
  contactUs: string;
}> = {
  en: {
    title: '404 - Page Not Found',
    description: "Sorry, we couldn't find the page you're looking for.",
    goToHomepage: 'Go to Homepage',
    browseAllApps: 'Browse All Apps',
    readOurBlog: 'Read Our Blog',
    needHelp: 'Need help?',
    contactUs: 'Contact us',
  },
  de: {
    title: '404 - Seite nicht gefunden',
    description: 'Die gesuchte Seite konnte leider nicht gefunden werden.',
    goToHomepage: 'Zur Startseite',
    browseAllApps: 'Alle Generatoren ansehen',
    readOurBlog: 'Blog lesen',
    needHelp: 'Brauchen Sie Hilfe?',
    contactUs: 'Kontaktieren Sie uns',
  },
  fr: {
    title: '404 - Page non trouvee',
    description: "Desole, la page que vous recherchez est introuvable.",
    goToHomepage: "Aller a l'accueil",
    browseAllApps: 'Parcourir toutes les applis',
    readOurBlog: 'Lire notre blog',
    needHelp: "Besoin d'aide ?",
    contactUs: 'Contactez-nous',
  },
  es: {
    title: '404 - Pagina no encontrada',
    description: 'Lo sentimos, no pudimos encontrar la pagina que buscas.',
    goToHomepage: 'Ir a la pagina principal',
    browseAllApps: 'Ver todas las aplicaciones',
    readOurBlog: 'Leer nuestro blog',
    needHelp: 'Necesitas ayuda?',
    contactUs: 'Contactanos',
  },
  pt: {
    title: '404 - Pagina nao encontrada',
    description: 'Desculpe, nao conseguimos encontrar a pagina que procura.',
    goToHomepage: 'Ir para a pagina inicial',
    browseAllApps: 'Ver todas as aplicacoes',
    readOurBlog: 'Ler o nosso blog',
    needHelp: 'Precisa de ajuda?',
    contactUs: 'Contacte-nos',
  },
  it: {
    title: '404 - Pagina non trovata',
    description: 'Ci dispiace, non siamo riusciti a trovare la pagina.',
    goToHomepage: 'Vai alla home page',
    browseAllApps: 'Sfoglia tutte le app',
    readOurBlog: 'Leggi il nostro blog',
    needHelp: 'Hai bisogno di aiuto?',
    contactUs: 'Contattaci',
  },
  nl: {
    title: '404 - Pagina niet gevonden',
    description: 'Sorry, we konden de pagina die je zoekt niet vinden.',
    goToHomepage: 'Ga naar startpagina',
    browseAllApps: 'Bekijk alle apps',
    readOurBlog: 'Lees onze blog',
    needHelp: 'Hulp nodig?',
    contactUs: 'Neem contact op',
  },
  sv: {
    title: '404 - Sidan hittades inte',
    description: 'Tyvarr kunde vi inte hitta sidan du letar efter.',
    goToHomepage: 'Ga till startsidan',
    browseAllApps: 'Blaeddra bland alla appar',
    readOurBlog: 'Laes var blogg',
    needHelp: 'Behover du hjaelp?',
    contactUs: 'Kontakta oss',
  },
  da: {
    title: '404 - Siden blev ikke fundet',
    description: 'Beklager, vi kunne ikke finde den side, du leder efter.',
    goToHomepage: 'Ga til forsiden',
    browseAllApps: 'Se alle apps',
    readOurBlog: 'Laes vores blog',
    needHelp: 'Brug for hjaelp?',
    contactUs: 'Kontakt os',
  },
  no: {
    title: '404 - Siden ble ikke funnet',
    description: 'Beklager, vi kunne ikke finne siden du leter etter.',
    goToHomepage: 'Ga til forsiden',
    browseAllApps: 'Se alle apper',
    readOurBlog: 'Les bloggen var',
    needHelp: 'Trenger du hjelp?',
    contactUs: 'Kontakt oss',
  },
  fi: {
    title: '404 - Sivua ei loytynyt',
    description: 'Valitettavasti emme loytaneet etsimaasi sivua.',
    goToHomepage: 'Siirry etusivulle',
    browseAllApps: 'Selaa kaikkia sovelluksia',
    readOurBlog: 'Lue blogiamme',
    needHelp: 'Tarvitsetko apua?',
    contactUs: 'Ota yhteytta',
  },
};

function detectLocale(): string {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  // Try URL pathname first
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && SUPPORTED_LOCALES.includes(pathSegments[0])) {
    return pathSegments[0];
  }

  // Try cookies
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  if (cookies['NEXT_LOCALE'] && SUPPORTED_LOCALES.includes(cookies['NEXT_LOCALE'])) {
    return cookies['NEXT_LOCALE'];
  }

  return DEFAULT_LOCALE;
}

export default function NotFound() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setMounted(true);
  }, []);

  const t = translations[locale] || translations[DEFAULT_LOCALE];

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50" />;
  }

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
            href={`/${locale}/apps`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {t.browseAllApps}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {t.readOurBlog}
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
