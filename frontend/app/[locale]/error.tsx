'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const messages: Record<string, { heading: string; body: string; retry: string; home: string }> = {
  en: { heading: 'Something went wrong', body: 'We apologize for the inconvenience. Please try again in a moment.', retry: 'Try again', home: 'Go to homepage' },
  de: { heading: 'Etwas ist schiefgelaufen', body: 'Wir entschuldigen uns f\u00fcr die Unannehmlichkeiten. Bitte versuchen Sie es in einem Moment erneut.', retry: 'Erneut versuchen', home: 'Zur Startseite' },
  fr: { heading: 'Une erreur est survenue', body: 'Nous nous excusons pour le d\u00e9sagr\u00e9ment. Veuillez r\u00e9essayer dans un instant.', retry: 'R\u00e9essayer', home: 'Aller \u00e0 l\u2019accueil' },
  es: { heading: 'Algo sali\u00f3 mal', body: 'Nos disculpamos por las molestias. Por favor, int\u00e9ntelo de nuevo en un momento.', retry: 'Intentar de nuevo', home: 'Ir al inicio' },
  pt: { heading: 'Algo deu errado', body: 'Pedimos desculpas pelo inconveniente. Por favor, tente novamente em um momento.', retry: 'Tentar novamente', home: 'Ir para o in\u00edcio' },
  it: { heading: 'Qualcosa \u00e8 andato storto', body: 'Ci scusiamo per l\u2019inconveniente. Riprova tra un momento.', retry: 'Riprova', home: 'Vai alla home' },
  nl: { heading: 'Er is iets misgegaan', body: 'Onze excuses voor het ongemak. Probeer het over een moment opnieuw.', retry: 'Opnieuw proberen', home: 'Naar startpagina' },
  sv: { heading: 'N\u00e5got gick fel', body: 'Vi ber om urs\u00e4kt f\u00f6r besv\u00e4ret. F\u00f6rs\u00f6k igen om en stund.', retry: 'F\u00f6rs\u00f6k igen', home: 'Till startsidan' },
  da: { heading: 'Noget gik galt', body: 'Vi beklager ulejligheden. Pr\u00f8v venligst igen om et \u00f8jeblik.', retry: 'Pr\u00f8v igen', home: 'G\u00e5 til forsiden' },
  no: { heading: 'Noe gikk galt', body: 'Vi beklager ulempen. Vennligst pr\u00f8v igjen om et \u00f8yeblikk.', retry: 'Pr\u00f8v igjen', home: 'G\u00e5 til forsiden' },
  fi: { heading: 'Jokin meni pieleen', body: 'Pahoittelemme haittaa. Yrit\u00e4 uudelleen hetken kuluttua.', retry: 'Yrit\u00e4 uudelleen', home: 'Etusivulle' },
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
