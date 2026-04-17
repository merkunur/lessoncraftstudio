'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const uiStrings: Record<string, { launching: string; opening: string; wait: string }> = {
  en: { launching: 'Launching', opening: 'Opening your worksheet generator in a new window', wait: 'Please wait...' },
  de: { launching: 'Wird gestartet', opening: 'Ihr Arbeitsblatt-Generator wird in einem neuen Fenster geöffnet', wait: 'Bitte warten...' },
  fr: { launching: 'Lancement de', opening: 'Ouverture de votre générateur de fiches dans une nouvelle fenêtre', wait: 'Veuillez patienter...' },
  es: { launching: 'Iniciando', opening: 'Abriendo tu generador de hojas de trabajo en una nueva ventana', wait: 'Por favor espera...' },
  pt: { launching: 'A iniciar', opening: 'A abrir o seu gerador de folhas de trabalho numa nova janela', wait: 'Por favor aguarde...' },
  it: { launching: 'Avvio di', opening: 'Apertura del generatore di schede in una nuova finestra', wait: 'Attendere prego...' },
  nl: { launching: 'Starten van', opening: 'Uw werkbladgenerator wordt geopend in een nieuw venster', wait: 'Even geduld...' },
  sv: { launching: 'Startar', opening: 'Öppnar din arbetsblad-generator i ett nytt fönster', wait: 'Var god vänta...' },
  da: { launching: 'Starter', opening: 'Åbner din arbejdsarkgenerator i et nyt vindue', wait: 'Vent venligst...' },
  no: { launching: 'Starter', opening: 'Åpner arbeidsarkgeneratoren i et nytt vindu', wait: 'Vennligst vent...' },
  fi: { launching: 'Käynnistetään', opening: 'Tehtäväsivugeneraattori avautuu uuteen ikkunaan', wait: 'Odota hetki...' },
};

interface AutoLaunchAppProps {
  appSlug: string;
  sourceFile: string;
  locale: string;
  appName: string;
  appTier?: string;
}

export default function AutoLaunchApp({
  sourceFile,
  locale,
  appName,
}: AutoLaunchAppProps) {
  const [launched, setLaunched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!launched) {
      setLaunched(true);
      const url = `/worksheet-generators/${sourceFile}?tier=free&locale=${locale}&utm_source=lcs&utm_medium=internal&utm_campaign=free_trial&utm_content=apps_page`;
      setTimeout(() => {
        window.open(url, '_blank');
        router.push(`/${locale}/apps`);
      }, 300);
    }
  }, [launched, sourceFile, locale, router]);

  const strings = uiStrings[locale] || uiStrings.en;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 text-5xl animate-bounce">
            🚀
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          {strings.launching} {appName}...
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {strings.opening}
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
          <span>{strings.wait}</span>
        </div>
      </div>
    </div>
  );
}
