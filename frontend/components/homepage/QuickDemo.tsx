'use client';

import { useReveal } from '@/hooks/use-reveal';
import VideoFacade from '@/app/[locale]/apps/[slug]/VideoFacade';

interface QuickDemoProps {
  locale: string;
  videoId?: string;
}

const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  videoTitle: string;
}> = {
  en: {
    badge: 'See It In Action',
    title: 'Create a Professional Printable in Under 3 Minutes',
    subtitle: 'Watch how easy it is to pick a generator, choose a theme, customize your worksheet, and export a print-ready PDF.',
    videoTitle: 'LessonCraftStudio Word Search Generator Demo',
  },
  de: {
    badge: 'In Aktion sehen',
    title: 'Erstellen Sie ein professionelles Druckprodukt in unter 3 Minuten',
    subtitle: 'Sehen Sie, wie einfach es ist: Generator wählen, Thema aussuchen, Arbeitsblatt anpassen und druckfertiges PDF exportieren.',
    videoTitle: 'LessonCraftStudio Wortsuche-Generator Demo',
  },
  fr: {
    badge: 'Voir en action',
    title: 'Créez un imprimable professionnel en moins de 3 minutes',
    subtitle: 'Découvrez comme c\'est simple : choisir un générateur, sélectionner un thème, personnaliser et exporter un PDF prêt à imprimer.',
    videoTitle: 'Démo du générateur de mots mêlés LessonCraftStudio',
  },
  es: {
    badge: 'Ver en acción',
    title: 'Crea un imprimible profesional en menos de 3 minutos',
    subtitle: 'Mira lo fácil que es: elige un generador, selecciona un tema, personaliza tu ficha y exporta un PDF listo para imprimir.',
    videoTitle: 'Demo del generador de sopas de letras LessonCraftStudio',
  },
  it: {
    badge: 'Guarda come funziona',
    title: 'Crea uno stampabile professionale in meno di 3 minuti',
    subtitle: 'Guarda quanto è facile: scegli un generatore, seleziona un tema, personalizza la scheda ed esporta un PDF pronto per la stampa.',
    videoTitle: 'Demo del generatore di crucipuzzle LessonCraftStudio',
  },
  pt: {
    badge: 'Veja em ação',
    title: 'Crie um imprimível profissional em menos de 3 minutos',
    subtitle: 'Veja como é fácil: escolha um gerador, selecione um tema, personalize sua atividade e exporte um PDF pronto para impressão.',
    videoTitle: 'Demo do gerador de caça-palavras LessonCraftStudio',
  },
  nl: {
    badge: 'Bekijk het in actie',
    title: 'Maak een professionele printable in minder dan 3 minuten',
    subtitle: 'Bekijk hoe makkelijk het is: kies een generator, selecteer een thema, pas je werkblad aan en exporteer een drukklare PDF.',
    videoTitle: 'LessonCraftStudio Woordzoeker Generator Demo',
  },
  da: {
    badge: 'Se det i aktion',
    title: 'Opret en professionel printable på under 3 minutter',
    subtitle: 'Se hvor nemt det er: vælg en generator, vælg et tema, tilpas dit opgaveark og eksportér en printbar PDF.',
    videoTitle: 'LessonCraftStudio Ordsøgning Generator Demo',
  },
  sv: {
    badge: 'Se det i aktion',
    title: 'Skapa en professionell utskrift på under 3 minuter',
    subtitle: 'Se hur enkelt det är: välj en generator, välj ett tema, anpassa ditt arbetsblad och exportera en utskriftsklar PDF.',
    videoTitle: 'LessonCraftStudio Ordsök Generator Demo',
  },
  no: {
    badge: 'Se det i aksjon',
    title: 'Lag en profesjonell utskrift på under 3 minutter',
    subtitle: 'Se hvor enkelt det er: velg en generator, velg et tema, tilpass arbeidsarket ditt og eksporter en utskriftsklar PDF.',
    videoTitle: 'LessonCraftStudio Ordsøk Generator Demo',
  },
  fi: {
    badge: 'Katso toiminnassa',
    title: 'Luo ammattimainen tulostettava alle 3 minuutissa',
    subtitle: 'Katso kuinka helppoa se on: valitse generaattori, valitse teema, muokkaa tehtävää ja vie tulostusvalmas PDF.',
    videoTitle: 'LessonCraftStudio Sananetsintä Generaattori Demo',
  },
};

export default function QuickDemo({ locale, videoId }: QuickDemoProps) {
  const headerRef = useReveal();
  const videoRef = useReveal();

  const content = localeContent[locale] || localeContent.en;

  return (
    <section id="quick-demo" className="relative py-20 overflow-hidden scroll-mt-16" style={{ scrollBehavior: 'smooth' }}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #e2e8f0 0%, #f1f5f9 30%, #f8fafc 70%, #ffffff 100%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-indigo-50 border border-indigo-200">
            <span className="text-indigo-600">{'\u25B6\uFE0F'}</span>
            <span className="text-sm font-medium text-indigo-700">{content.badge}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Video */}
        <div ref={videoRef} className="max-w-4xl mx-auto reveal">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
            {videoId ? (
              <VideoFacade videoId={videoId} title={content.videoTitle} />
            ) : (
              <div
                className="relative w-full flex items-center justify-center"
                style={{ paddingBottom: '56.25%' }}
              >
                <div className="absolute inset-0 bg-stone-900 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm">Demo video coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
