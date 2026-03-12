'use client';

import Link from 'next/link';

interface ResourceHighlightsProps {
  locale: string;
}

const resources = [
  {
    key: 'tools',
    href: '/tools',
    icon: '\u{1F527}',
    color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
    iconBg: 'bg-indigo-100',
  },
  {
    key: 'guides',
    href: '/guides',
    icon: '\u{1F4D6}',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
  },
  {
    key: 'bundles',
    href: '/bundles',
    icon: '\u{1F4E6}',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100',
  },
  {
    key: 'ideas',
    href: '/ideas',
    icon: '\u{1F4A1}',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
  },
  {
    key: 'start',
    href: '/start',
    icon: '\u{1F680}',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
    iconBg: 'bg-rose-100',
  },
] as const;

const content: Record<string, { sectionTitle: string; cards: Record<string, { title: string; description: string }> }> = {
  en: {
    sectionTitle: 'Explore Resources',
    cards: {
      tools: { title: 'Free Tools', description: 'Try all 33 generators online, no signup' },
      guides: { title: 'How-To Guides', description: '65 step-by-step guides for selling printables' },
      bundles: { title: 'Bundles', description: 'Save with category bundles' },
      ideas: { title: 'Niche Ideas', description: '45 profitable niche ideas for your business' },
      start: { title: 'Get Started', description: 'Complete blueprints for launching your business' },
    },
  },
  de: {
    sectionTitle: 'Ressourcen entdecken',
    cards: {
      tools: { title: 'Kostenlose Tools', description: 'Alle 33 Generatoren online testen, ohne Anmeldung' },
      guides: { title: 'Anleitungen', description: '65 Schritt-für-Schritt Anleitungen zum Verkaufen' },
      bundles: { title: 'Pakete', description: 'Sparen Sie mit Kategoriepaketen' },
      ideas: { title: 'Nischen-Ideen', description: '45 profitable Nischen-Ideen für Ihr Geschäft' },
      start: { title: 'Erste Schritte', description: 'Komplette Anleitungen zum Start Ihres Geschäfts' },
    },
  },
  fr: {
    sectionTitle: 'Explorer les ressources',
    cards: {
      tools: { title: 'Outils gratuits', description: 'Essayez les 33 générateurs en ligne, sans inscription' },
      guides: { title: 'Guides pratiques', description: '65 guides étape par étape pour vendre des imprimables' },
      bundles: { title: 'Packs', description: 'Économisez avec les packs par catégorie' },
      ideas: { title: 'Idées de niches', description: '45 idées de niches rentables pour votre activité' },
      start: { title: 'Démarrer', description: 'Plans complets pour lancer votre activité' },
    },
  },
  es: {
    sectionTitle: 'Explorar recursos',
    cards: {
      tools: { title: 'Herramientas gratis', description: 'Prueba los 33 generadores en línea, sin registro' },
      guides: { title: 'Guías prácticas', description: '65 guías paso a paso para vender imprimibles' },
      bundles: { title: 'Paquetes', description: 'Ahorra con paquetes por categoría' },
      ideas: { title: 'Ideas de nichos', description: '45 ideas de nichos rentables para tu negocio' },
      start: { title: 'Comenzar', description: 'Guías completas para lanzar tu negocio' },
    },
  },
  pt: {
    sectionTitle: 'Explorar recursos',
    cards: {
      tools: { title: 'Ferramentas grátis', description: 'Teste os 33 geradores online, sem cadastro' },
      guides: { title: 'Guias práticos', description: '65 guias passo a passo para vender imprimíveis' },
      bundles: { title: 'Pacotes', description: 'Economize com pacotes por categoria' },
      ideas: { title: 'Ideias de nichos', description: '45 ideias de nichos rentáveis para seu negócio' },
      start: { title: 'Começar', description: 'Guias completos para lançar seu negócio' },
    },
  },
  it: {
    sectionTitle: 'Esplora le risorse',
    cards: {
      tools: { title: 'Strumenti gratuiti', description: 'Prova tutti i 33 generatori online, senza registrazione' },
      guides: { title: 'Guide pratiche', description: '65 guide passo passo per vendere stampabili' },
      bundles: { title: 'Pacchetti', description: 'Risparmia con i pacchetti per categoria' },
      ideas: { title: 'Idee di nicchia', description: '45 idee di nicchia redditizie per la tua attività' },
      start: { title: 'Inizia', description: 'Piani completi per avviare la tua attività' },
    },
  },
  nl: {
    sectionTitle: 'Ontdek bronnen',
    cards: {
      tools: { title: 'Gratis tools', description: 'Probeer alle 33 generators online, zonder registratie' },
      guides: { title: 'Handleidingen', description: '65 stap-voor-stap gidsen voor het verkopen van printables' },
      bundles: { title: 'Bundels', description: 'Bespaar met categoriebundels' },
      ideas: { title: 'Niche-ideeën', description: '45 winstgevende niche-ideeën voor uw bedrijf' },
      start: { title: 'Aan de slag', description: 'Complete plannen om uw bedrijf te starten' },
    },
  },
  sv: {
    sectionTitle: 'Utforska resurser',
    cards: {
      tools: { title: 'Gratisverktyg', description: 'Testa alla 33 generatorer online, utan registrering' },
      guides: { title: 'Guider', description: '65 steg-för-steg guider för att sälja utskrifter' },
      bundles: { title: 'Paket', description: 'Spara med kategoripaket' },
      ideas: { title: 'Nischidéer', description: '45 lönsamma nischidéer för din verksamhet' },
      start: { title: 'Kom igång', description: 'Kompletta planer för att starta din verksamhet' },
    },
  },
  da: {
    sectionTitle: 'Udforsk ressourcer',
    cards: {
      tools: { title: 'Gratis værktøjer', description: 'Prøv alle 33 generatorer online, uden tilmelding' },
      guides: { title: 'Vejledninger', description: '65 trin-for-trin guider til at sælge printables' },
      bundles: { title: 'Pakker', description: 'Spar med kategoripakker' },
      ideas: { title: 'Nicheideer', description: '45 profitable nicheideer til din virksomhed' },
      start: { title: 'Kom i gang', description: 'Komplette planer til at starte din virksomhed' },
    },
  },
  no: {
    sectionTitle: 'Utforsk ressurser',
    cards: {
      tools: { title: 'Gratisverktøy', description: 'Prøv alle 33 generatorer på nett, uten registrering' },
      guides: { title: 'Veiledninger', description: '65 steg-for-steg guider for å selge utskrifter' },
      bundles: { title: 'Pakker', description: 'Spar med kategoripakker' },
      ideas: { title: 'Nisjeideer', description: '45 lønnsomme nisjeideer for din virksomhet' },
      start: { title: 'Kom i gang', description: 'Komplette planer for å starte din virksomhet' },
    },
  },
  fi: {
    sectionTitle: 'Tutustu resursseihin',
    cards: {
      tools: { title: 'Ilmaiset työkalut', description: 'Kokeile kaikkia 33 generaattoria verkossa, ilman rekisteröitymistä' },
      guides: { title: 'Oppaat', description: '65 vaihe vaiheelta opasta tulostettavien myyntiin' },
      bundles: { title: 'Paketit', description: 'Säästä kategoriapaketteilla' },
      ideas: { title: 'Niche-ideat', description: '45 tuottoisaa niche-ideaa liiketoiminnallesi' },
      start: { title: 'Aloita', description: 'Täydelliset suunnitelmat liiketoimintasi käynnistämiseen' },
    },
  },
};

export default function ResourceHighlights({ locale }: ResourceHighlightsProps) {
  const t = content[locale] || content.en;

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          {t.sectionTitle}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {resources.map(res => {
            const card = t.cards[res.key];
            return (
              <Link
                key={res.key}
                href={`/${locale}${res.href}`}
                className={`group p-4 rounded-xl border transition-all ${res.color}`}
              >
                <div className={`w-10 h-10 rounded-lg ${res.iconBg} flex items-center justify-center text-xl mb-3`}>
                  {res.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
