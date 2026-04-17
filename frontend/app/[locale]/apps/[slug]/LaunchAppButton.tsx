'use client';

const uiStrings: Record<string, { heading: string; description: (name: string) => string; button: string; footnote: string }> = {
  en: {
    heading: 'Worksheet Generator',
    description: (name) => `Click the button below to launch ${name} in a new window. Create, customize, and export professional worksheets instantly.`,
    button: 'Try Free with Watermark',
    footnote: 'Opens in a new window. No signup required.',
  },
  de: {
    heading: 'Arbeitsblatt-Generator',
    description: (name) => `Klicken Sie auf die Schaltfläche, um ${name} in einem neuen Fenster zu starten. Erstellen, anpassen und exportieren Sie professionelle Arbeitsblätter sofort.`,
    button: 'Kostenlos testen mit Wasserzeichen',
    footnote: 'Öffnet in einem neuen Fenster. Keine Anmeldung erforderlich.',
  },
  fr: {
    heading: 'Générateur de fiches',
    description: (name) => `Cliquez sur le bouton ci-dessous pour lancer ${name} dans une nouvelle fenêtre. Créez, personnalisez et exportez des fiches professionnelles instantanément.`,
    button: 'Essayer gratuitement avec filigrane',
    footnote: "S'ouvre dans une nouvelle fenêtre. Aucune inscription requise.",
  },
  es: {
    heading: 'Generador de hojas de trabajo',
    description: (name) => `Haz clic en el botón para abrir ${name} en una nueva ventana. Crea, personaliza y exporta hojas de trabajo profesionales al instante.`,
    button: 'Prueba gratis con marca de agua',
    footnote: 'Se abre en una nueva ventana. No requiere registro.',
  },
  pt: {
    heading: 'Gerador de folhas de trabalho',
    description: (name) => `Clique no botão abaixo para abrir ${name} numa nova janela. Crie, personalize e exporte folhas de trabalho profissionais instantaneamente.`,
    button: "Experimente grátis com marca d'água",
    footnote: 'Abre numa nova janela. Sem necessidade de registo.',
  },
  it: {
    heading: 'Generatore di schede',
    description: (name) => `Fai clic sul pulsante per aprire ${name} in una nuova finestra. Crea, personalizza ed esporta schede professionali all'istante.`,
    button: 'Prova gratis con filigrana',
    footnote: 'Si apre in una nuova finestra. Nessuna registrazione richiesta.',
  },
  nl: {
    heading: 'Werkbladgenerator',
    description: (name) => `Klik op de knop om ${name} in een nieuw venster te openen. Maak, pas aan en exporteer professionele werkbladen direct.`,
    button: 'Gratis proberen met watermerk',
    footnote: 'Opent in een nieuw venster. Geen registratie vereist.',
  },
  sv: {
    heading: 'Arbetsblad-generator',
    description: (name) => `Klicka på knappen för att starta ${name} i ett nytt fönster. Skapa, anpassa och exportera professionella arbetsblad direkt.`,
    button: 'Prova gratis med vattenstämpel',
    footnote: 'Öppnas i ett nytt fönster. Ingen registrering krävs.',
  },
  da: {
    heading: 'Arbejdsarkgenerator',
    description: (name) => `Klik på knappen for at starte ${name} i et nyt vindue. Opret, tilpas og eksportér professionelle arbejdsark med det samme.`,
    button: 'Prøv gratis med vandmærke',
    footnote: 'Åbner i et nyt vindue. Ingen tilmelding påkrævet.',
  },
  no: {
    heading: 'Arbeidsarkgenerator',
    description: (name) => `Klikk på knappen for å starte ${name} i et nytt vindu. Opprett, tilpass og eksporter profesjonelle arbeidsark umiddelbart.`,
    button: 'Prøv gratis med vannmerke',
    footnote: 'Åpner i et nytt vindu. Ingen registrering nødvendig.',
  },
  fi: {
    heading: 'Tehtäväsivugeneraattori',
    description: (name) => `Napsauta painiketta avataksesi ${name} uuteen ikkunaan. Luo, muokkaa ja vie ammattimaisia tehtäväsivuja välittömästi.`,
    button: 'Kokeile ilmaiseksi vesileimoilla',
    footnote: 'Avautuu uuteen ikkunaan. Rekisteröitymistä ei tarvita.',
  },
};

interface LaunchAppButtonProps {
  appSlug: string;
  sourceFile: string;
  locale: string;
  appName: string;
  appTier?: string;
  tierColor?: string;
}

export default function LaunchAppButton({
  sourceFile,
  locale,
  appName,
}: LaunchAppButtonProps) {
  const handleLaunchApp = () => {
    const url = `/worksheet-generators/${sourceFile}?tier=free&locale=${locale}&utm_source=lcs&utm_medium=internal&utm_campaign=free_trial&utm_content=apps_page`;
    window.open(url, '_blank');
  };

  const strings = uiStrings[locale] || uiStrings.en;

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {appName} — {strings.heading}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {strings.description(appName)}
          </p>
          <button
            onClick={handleLaunchApp}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {strings.button}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            {strings.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
