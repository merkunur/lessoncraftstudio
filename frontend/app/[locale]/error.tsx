'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const messages: Record<string, { heading: string; body: string; retry: string; home: string }> = {
  en: { heading: 'Something went wrong', body: 'We apologize for the inconvenience. Please try again in a moment.', retry: 'Try again', home: 'Go to homepage' },
  de: { heading: 'Etwas ist schiefgelaufen', body: 'Wir entschuldigen uns für die Unannehmlichkeiten. Bitte versuchen Sie es in einem Moment erneut.', retry: 'Erneut versuchen', home: 'Zur Startseite' },
  fr: { heading: 'Une erreur est survenue', body: 'Nous nous excusons pour le désagrément. Veuillez réessayer dans un instant.', retry: 'Réessayer', home: 'Aller à l’accueil' },
  es: { heading: 'Algo salió mal', body: 'Nos disculpamos por las molestias. Por favor, inténtelo de nuevo en un momento.', retry: 'Intentar de nuevo', home: 'Ir al inicio' },
  pt: { heading: 'Algo deu errado', body: 'Pedimos desculpas pelo inconveniente. Por favor, tente novamente em um momento.', retry: 'Tentar novamente', home: 'Ir para o início' },
  it: { heading: 'Qualcosa è andato storto', body: 'Ci scusiamo per l’inconveniente. Riprova tra un momento.', retry: 'Riprova', home: 'Vai alla home' },
  nl: { heading: 'Er is iets misgegaan', body: 'Onze excuses voor het ongemak. Probeer het over een moment opnieuw.', retry: 'Opnieuw proberen', home: 'Naar startpagina' },
  sv: { heading: 'Något gick fel', body: 'Vi ber om ursäkt för besväret. Försök igen om en stund.', retry: 'Försök igen', home: 'Till startsidan' },
  da: { heading: 'Noget gik galt', body: 'Vi beklager ulejligheden. Prøv venligst igen om et øjeblik.', retry: 'Prøv igen', home: 'Gå til forsiden' },
  no: { heading: 'Noe gikk galt', body: 'Vi beklager ulempen. Vennligst prøv igjen om et øyeblikk.', retry: 'Prøv igjen', home: 'Gå til forsiden' },
  fi: { heading: 'Jokin meni pieleen', body: 'Pahoittelemme haittaa. Yritä uudelleen hetken kuluttua.', retry: 'Yritä uudelleen', home: 'Etusivulle' },
};

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (typeof params?.locale === 'string' ? params.locale : 'en') as string;
  const t = messages[locale] || messages.en;

  useEffect(() => {
    console.error('Locale page error:', error);
  }, [error]);

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
          {t.heading}
        </h1>

        <p className="text-gray-600 mb-6">
          {t.body}
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t.retry}
          </button>

          <a
            href={`/${locale}`}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {t.home}
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
