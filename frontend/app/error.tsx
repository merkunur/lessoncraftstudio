'use client';

import { useEffect, useState } from 'react';

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DEFAULT_LOCALE = 'en';

const translations: Record<string, {
  title: string;
  description: string;
  tryAgain: string;
  goToHomepage: string;
}> = {
  en: {
    title: 'Something went wrong',
    description: 'We apologize for the inconvenience. An unexpected error has occurred.',
    tryAgain: 'Try again',
    goToHomepage: 'Go to homepage',
  },
  de: {
    title: 'Etwas ist schiefgelaufen',
    description: 'Wir entschuldigen uns. Ein unerwarteter Fehler ist aufgetreten.',
    tryAgain: 'Erneut versuchen',
    goToHomepage: 'Zur Startseite',
  },
  fr: {
    title: 'Une erreur est survenue',
    description: 'Nous nous excusons. Une erreur inattendue est survenue.',
    tryAgain: 'Reessayer',
    goToHomepage: "Aller a l'accueil",
  },
  es: {
    title: 'Algo salio mal',
    description: 'Nos disculpamos. Ha ocurrido un error inesperado.',
    tryAgain: 'Intentar de nuevo',
    goToHomepage: 'Ir a la pagina principal',
  },
  pt: {
    title: 'Algo correu mal',
    description: 'Pedimos desculpa. Ocorreu um erro inesperado.',
    tryAgain: 'Tentar novamente',
    goToHomepage: 'Ir para a pagina inicial',
  },
  it: {
    title: 'Qualcosa non ha funzionato',
    description: 'Ci scusiamo per il disagio. Si e verificato un errore imprevisto.',
    tryAgain: 'Riprova',
    goToHomepage: 'Vai alla home page',
  },
  nl: {
    title: 'Er is iets misgegaan',
    description: 'Onze excuses. Er is een onverwachte fout opgetreden.',
    tryAgain: 'Opnieuw proberen',
    goToHomepage: 'Ga naar startpagina',
  },
  sv: {
    title: 'Nagot gick fel',
    description: 'Vi ber om ursakt. Ett ovantat fel har uppstatt.',
    tryAgain: 'Forsok igen',
    goToHomepage: 'Ga till startsidan',
  },
  da: {
    title: 'Noget gik galt',
    description: 'Vi beklager ulejligheden. Der er opstaaet en uventet fejl.',
    tryAgain: 'Prove igen',
    goToHomepage: 'Ga til forsiden',
  },
  no: {
    title: 'Noe gikk galt',
    description: 'Vi beklager ulempen. En uventet feil har oppstaatt.',
    tryAgain: 'Prov igjen',
    goToHomepage: 'Ga til forsiden',
  },
  fi: {
    title: 'Jokin meni pieleen',
    description: 'Pahoittelemme hairiota. Odottamaton virhe on tapahtunut.',
    tryAgain: 'Yrita uudelleen',
    goToHomepage: 'Siirry etusivulle',
  },
};

function detectLocale(): string {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && SUPPORTED_LOCALES.includes(pathSegments[0])) {
    return pathSegments[0];
  }

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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const t = translations[locale] || translations[DEFAULT_LOCALE];

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {t.description}
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t.tryAgain}
          </button>

          <a
            href={`/${locale}`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {t.goToHomepage}
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-red-50 rounded-md text-left">
            <p className="text-sm font-mono text-red-800 break-words">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
