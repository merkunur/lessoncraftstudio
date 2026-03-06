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
      guides: { title: 'Anleitungen', description: '65 Schritt-f\u00fcr-Schritt Anleitungen zum Verkaufen' },
      bundles: { title: 'Pakete', description: 'Sparen Sie mit Kategoriepaketen' },
      ideas: { title: 'Nischen-Ideen', description: '45 profitable Nischen-Ideen f\u00fcr Ihr Gesch\u00e4ft' },
      start: { title: 'Erste Schritte', description: 'Komplette Anleitungen zum Start Ihres Gesch\u00e4fts' },
    },
  },
  fr: {
    sectionTitle: 'Explorer les ressources',
    cards: {
      tools: { title: 'Outils gratuits', description: 'Essayez les 33 g\u00e9n\u00e9rateurs en ligne, sans inscription' },
      guides: { title: 'Guides pratiques', description: '65 guides \u00e9tape par \u00e9tape pour vendre des imprimables' },
      bundles: { title: 'Packs', description: '\u00c9conomisez avec les packs par cat\u00e9gorie' },
      ideas: { title: 'Id\u00e9es de niches', description: '45 id\u00e9es de niches rentables pour votre activit\u00e9' },
      start: { title: 'D\u00e9marrer', description: 'Plans complets pour lancer votre activit\u00e9' },
    },
  },
  es: {
    sectionTitle: 'Explorar recursos',
    cards: {
      tools: { title: 'Herramientas gratis', description: 'Prueba los 33 generadores en l\u00ednea, sin registro' },
      guides: { title: 'Gu\u00edas pr\u00e1cticas', description: '65 gu\u00edas paso a paso para vender imprimibles' },
      bundles: { title: 'Paquetes', description: 'Ahorra con paquetes por categor\u00eda' },
      ideas: { title: 'Ideas de nichos', description: '45 ideas de nichos rentables para tu negocio' },
      start: { title: 'Comenzar', description: 'Gu\u00edas completas para lanzar tu negocio' },
    },
  },
  pt: {
    sectionTitle: 'Explorar recursos',
    cards: {
      tools: { title: 'Ferramentas gr\u00e1tis', description: 'Teste os 33 geradores online, sem cadastro' },
      guides: { title: 'Guias pr\u00e1ticos', description: '65 guias passo a passo para vender imprim\u00edveis' },
      bundles: { title: 'Pacotes', description: 'Economize com pacotes por categoria' },
      ideas: { title: 'Ideias de nichos', description: '45 ideias de nichos rent\u00e1veis para seu neg\u00f3cio' },
      start: { title: 'Come\u00e7ar', description: 'Guias completos para lan\u00e7ar seu neg\u00f3cio' },
    },
  },
  it: {
    sectionTitle: 'Esplora le risorse',
    cards: {
      tools: { title: 'Strumenti gratuiti', description: 'Prova tutti i 33 generatori online, senza registrazione' },
      guides: { title: 'Guide pratiche', description: '65 guide passo passo per vendere stampabili' },
      bundles: { title: 'Pacchetti', description: 'Risparmia con i pacchetti per categoria' },
      ideas: { title: 'Idee di nicchia', description: '45 idee di nicchia redditizie per la tua attivit\u00e0' },
      start: { title: 'Inizia', description: 'Piani completi per avviare la tua attivit\u00e0' },
    },
  },
  nl: {
    sectionTitle: 'Ontdek bronnen',
    cards: {
      tools: { title: 'Gratis tools', description: 'Probeer alle 33 generators online, zonder registratie' },
      guides: { title: 'Handleidingen', description: '65 stap-voor-stap gidsen voor het verkopen van printables' },
      bundles: { title: 'Bundels', description: 'Bespaar met categoriebundels' },
      ideas: { title: 'Niche-idee\u00ebn', description: '45 winstgevende niche-idee\u00ebn voor uw bedrijf' },
      start: { title: 'Aan de slag', description: 'Complete plannen om uw bedrijf te starten' },
    },
  },
  sv: {
    sectionTitle: 'Utforska resurser',
    cards: {
      tools: { title: 'Gratisverktyg', description: 'Testa alla 33 generatorer online, utan registrering' },
      guides: { title: 'Guider', description: '65 steg-f\u00f6r-steg guider f\u00f6r att s\u00e4lja utskrifter' },
      bundles: { title: 'Paket', description: 'Spara med kategoripaket' },
      ideas: { title: 'Nischid\u00e9er', description: '45 l\u00f6nsamma nischid\u00e9er f\u00f6r din verksamhet' },
      start: { title: 'Kom ig\u00e5ng', description: 'Kompletta planer f\u00f6r att starta din verksamhet' },
    },
  },
  da: {
    sectionTitle: 'Udforsk ressourcer',
    cards: {
      tools: { title: 'Gratis v\u00e6rkt\u00f8jer', description: 'Pr\u00f8v alle 33 generatorer online, uden tilmelding' },
      guides: { title: 'Vejledninger', description: '65 trin-for-trin guider til at s\u00e6lge printables' },
      bundles: { title: 'Pakker', description: 'Spar med kategoripakker' },
      ideas: { title: 'Nicheideer', description: '45 profitable nicheideer til din virksomhed' },
      start: { title: 'Kom i gang', description: 'Komplette planer til at starte din virksomhed' },
    },
  },
  no: {
    sectionTitle: 'Utforsk ressurser',
    cards: {
      tools: { title: 'Gratisverkt\u00f8y', description: 'Pr\u00f8v alle 33 generatorer p\u00e5 nett, uten registrering' },
      guides: { title: 'Veiledninger', description: '65 steg-for-steg guider for \u00e5 selge utskrifter' },
      bundles: { title: 'Pakker', description: 'Spar med kategoripakker' },
      ideas: { title: 'Nisjeideer', description: '45 l\u00f8nnsomme nisjeideer for din virksomhet' },
      start: { title: 'Kom i gang', description: 'Komplette planer for \u00e5 starte din virksomhet' },
    },
  },
  fi: {
    sectionTitle: 'Tutustu resursseihin',
    cards: {
      tools: { title: 'Ilmaiset ty\u00f6kalut', description: 'Kokeile kaikkia 33 generaattoria verkossa, ilman rekister\u00f6itymist\u00e4' },
      guides: { title: 'Oppaat', description: '65 vaihe vaiheelta opasta tulostettavien myyntiin' },
      bundles: { title: 'Paketit', description: 'S\u00e4\u00e4st\u00e4 kategoriapaketteilla' },
      ideas: { title: 'Niche-ideat', description: '45 tuottoisaa niche-ideaa liiketoiminnallesi' },
      start: { title: 'Aloita', description: 'T\u00e4ydelliset suunnitelmat liiketoimintasi k\u00e4ynnist\u00e4miseen' },
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
