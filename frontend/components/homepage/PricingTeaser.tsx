'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/use-reveal';

interface PricingTeaserProps {
  locale: string;
}

const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  ctaButton: string;
  tiers: Array<{
    name: string;
    price: string;
    description: string;
    highlighted?: boolean;
  }>;
}> = {
  en: {
    badge: 'Simple Pricing',
    title: 'No Subscriptions. One-Time Payment.',
    subtitle: 'Try before you buy. All 33 generators are available as a free trial with watermark.',
    ctaButton: 'See Full Pricing',
    tiers: [
      {
        name: 'Free Trial with Watermark',
        price: '$0',
        description: 'All 33 generators. Full features. Watermarked exports. No signup required.',
      },
      {
        name: 'Individual App',
        price: '$49',
        description: 'One generator. Clean PDF exports. Commercial license. Lifetime access.',
      },
      {
        name: 'Category Bundle',
        price: '$149',
        description: 'All generators in a category (4-7 apps). Save up to 70%. Best value.',
        highlighted: true,
      },
    ],
  },
  de: {
    badge: 'Einfache Preise',
    title: 'Keine Abonnements. Einmalige Zahlung.',
    subtitle: 'Testen Sie vor dem Kauf. Alle 33 Generatoren sind als kostenlose Testversion mit Wasserzeichen verfuegbar.',
    ctaButton: 'Alle Preise ansehen',
    tiers: [
      {
        name: 'Kostenlose Testversion mit Wasserzeichen',
        price: '$0',
        description: 'Alle 33 Generatoren. Volle Funktionen. Exports mit Wasserzeichen. Keine Anmeldung.',
      },
      {
        name: 'Einzelne App',
        price: '$49',
        description: 'Ein Generator. Saubere PDF-Exports. Kommerzielle Lizenz. Lebenslanger Zugang.',
      },
      {
        name: 'Kategorie-Paket',
        price: '$149',
        description: 'Alle Generatoren einer Kategorie (4-7 Apps). Bis zu 70% sparen. Bester Wert.',
        highlighted: true,
      },
    ],
  },
  fr: {
    badge: 'Tarifs simples',
    title: 'Pas d\'abonnement. Paiement unique.',
    subtitle: 'Essayez avant d\'acheter. Les 33 generateurs sont disponibles en essai gratuit avec filigrane.',
    ctaButton: 'Voir tous les tarifs',
    tiers: [
      {
        name: 'Essai gratuit avec filigrane',
        price: '$0',
        description: '33 generateurs. Toutes les fonctionnalites. Exports avec filigrane. Sans inscription.',
      },
      {
        name: 'Application individuelle',
        price: '$49',
        description: 'Un generateur. PDF sans filigrane. Licence commerciale. Acces a vie.',
      },
      {
        name: 'Pack categorie',
        price: '$149',
        description: 'Tous les generateurs d\'une categorie (4-7 apps). Economisez jusqu\'a 70%. Meilleur rapport.',
        highlighted: true,
      },
    ],
  },
  es: {
    badge: 'Precios simples',
    title: 'Sin suscripciones. Pago unico.',
    subtitle: 'Prueba antes de comprar. Los 33 generadores estan disponibles como prueba gratuita con marca de agua.',
    ctaButton: 'Ver todos los precios',
    tiers: [
      {
        name: 'Prueba gratuita con marca de agua',
        price: '$0',
        description: '33 generadores. Todas las funciones. Exports con marca de agua. Sin registro.',
      },
      {
        name: 'App individual',
        price: '$49',
        description: 'Un generador. PDFs sin marca de agua. Licencia comercial. Acceso de por vida.',
      },
      {
        name: 'Pack de categoria',
        price: '$149',
        description: 'Todos los generadores de una categoria (4-7 apps). Ahorra hasta un 70%. Mejor valor.',
        highlighted: true,
      },
    ],
  },
  it: {
    badge: 'Prezzi semplici',
    title: 'Nessun abbonamento. Pagamento unico.',
    subtitle: 'Prova prima di comprare. Tutti i 33 generatori sono disponibili come prova gratuita con filigrana.',
    ctaButton: 'Vedi tutti i prezzi',
    tiers: [
      {
        name: 'Prova gratuita con filigrana',
        price: '$0',
        description: '33 generatori. Tutte le funzionalita. Export con filigrana. Senza registrazione.',
      },
      {
        name: 'App singola',
        price: '$49',
        description: 'Un generatore. PDF senza filigrana. Licenza commerciale. Accesso a vita.',
      },
      {
        name: 'Pacchetto categoria',
        price: '$149',
        description: 'Tutti i generatori di una categoria (4-7 app). Risparmia fino al 70%. Miglior valore.',
        highlighted: true,
      },
    ],
  },
  pt: {
    badge: 'Precos simples',
    title: 'Sem assinaturas. Pagamento unico.',
    subtitle: 'Experimente antes de comprar. Todos os 33 geradores estao disponiveis como teste gratuito com marca d\'agua.',
    ctaButton: 'Ver todos os precos',
    tiers: [
      {
        name: 'Teste gratuito com marca d\'agua',
        price: '$0',
        description: '33 geradores. Todos os recursos. Exports com marca d\'agua. Sem cadastro.',
      },
      {
        name: 'App individual',
        price: '$49',
        description: 'Um gerador. PDFs sem marca d\'agua. Licenca comercial. Acesso vitalicio.',
      },
      {
        name: 'Pacote de categoria',
        price: '$149',
        description: 'Todos os geradores de uma categoria (4-7 apps). Economize ate 70%. Melhor valor.',
        highlighted: true,
      },
    ],
  },
  nl: {
    badge: 'Eenvoudige prijzen',
    title: 'Geen abonnementen. Eenmalige betaling.',
    subtitle: 'Probeer voor je koopt. Alle 33 generatoren zijn beschikbaar als gratis proefversie met watermerk.',
    ctaButton: 'Bekijk alle prijzen',
    tiers: [
      {
        name: 'Gratis proefversie met watermerk',
        price: '$0',
        description: '33 generatoren. Alle functies. Exports met watermerk. Geen registratie nodig.',
      },
      {
        name: 'Individuele app',
        price: '$49',
        description: 'Eeen generator. Schone PDF-exports. Commerciele licentie. Levenslang toegang.',
      },
      {
        name: 'Categoriepakket',
        price: '$149',
        description: 'Alle generatoren in een categorie (4-7 apps). Bespaar tot 70%. Beste waarde.',
        highlighted: true,
      },
    ],
  },
  da: {
    badge: 'Simple priser',
    title: 'Ingen abonnementer. Engangsbetaling.',
    subtitle: 'Proev foer du koeber. Alle 33 generatorer er tilgaengelige som gratis proeveversion med vandmaerke.',
    ctaButton: 'Se alle priser',
    tiers: [
      {
        name: 'Gratis proeveversion med vandmaerke',
        price: '$0',
        description: '33 generatorer. Alle funktioner. Eksport med vandmaerke. Ingen tilmelding noedvendig.',
      },
      {
        name: 'Enkelt app',
        price: '$49',
        description: 'En generator. Rene PDF-eksporter. Kommerciel licens. Livstidsadgang.',
      },
      {
        name: 'Kategoripakke',
        price: '$149',
        description: 'Alle generatorer i en kategori (4-7 apps). Spar op til 70%. Bedste vaerdi.',
        highlighted: true,
      },
    ],
  },
  sv: {
    badge: 'Enkla priser',
    title: 'Inga prenumerationer. Engaangsbetalning.',
    subtitle: 'Prova innan du koeper. Alla 33 generatorer aer tillgaengliga som gratis provversion med vattenstempel.',
    ctaButton: 'Se alla priser',
    tiers: [
      {
        name: 'Gratis provversion med vattenstempel',
        price: '$0',
        description: '33 generatorer. Alla funktioner. Export med vattenstempel. Ingen registrering kraevs.',
      },
      {
        name: 'Enskild app',
        price: '$49',
        description: 'En generator. Rena PDF-exporter. Kommersiell licens. Livstidsaatkomst.',
      },
      {
        name: 'Kategoripaket',
        price: '$149',
        description: 'Alla generatorer i en kategori (4-7 appar). Spara upp till 70%. Baesta vaerde.',
        highlighted: true,
      },
    ],
  },
  no: {
    badge: 'Enkle priser',
    title: 'Ingen abonnementer. Engangsbetaling.',
    subtitle: 'Proev foer du kjoeper. Alle 33 generatorer er tilgjengelige som gratis proeveversjon med vannmerke.',
    ctaButton: 'Se alle priser',
    tiers: [
      {
        name: 'Gratis proeveversjon med vannmerke',
        price: '$0',
        description: '33 generatorer. Alle funksjoner. Eksport med vannmerke. Ingen registrering noedvendig.',
      },
      {
        name: 'Enkelt app',
        price: '$49',
        description: 'En generator. Rene PDF-eksporter. Kommersiell lisens. Livstidstilgang.',
      },
      {
        name: 'Kategoripakke',
        price: '$149',
        description: 'Alle generatorer i en kategori (4-7 apper). Spar opptil 70%. Beste verdi.',
        highlighted: true,
      },
    ],
  },
  fi: {
    badge: 'Yksinkertainen hinnoittelu',
    title: 'Ei tilauksia. Kertamaksu.',
    subtitle: 'Kokeile ennen ostamista. Kaikki 33 generaattoria ovat saatavilla ilmaisena kokeiluversiona vesileimalla.',
    ctaButton: 'Katso kaikki hinnat',
    tiers: [
      {
        name: 'Ilmainen kokeiluversio vesileimalla',
        price: '$0',
        description: '33 generaattoria. Kaikki ominaisuudet. Vienti vesileimalla. Ei rekisteroeitymistae.',
      },
      {
        name: 'Yksittaeinen sovellus',
        price: '$49',
        description: 'Yksi generaattori. Puhtaat PDF-viennit. Kaupallinen lisenssi. Elinikainen paeasey.',
      },
      {
        name: 'Kategoriapaketti',
        price: '$149',
        description: 'Kaikki kategorian generaattorit (4-7 sovellusta). Saeaestae jopa 70%. Paras arvo.',
        highlighted: true,
      },
    ],
  },
};

export default function PricingTeaser({ locale }: PricingTeaserProps) {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  const content = localeContent[locale] || localeContent.en;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Light background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-violet-50 border border-violet-200">
            <span className="text-violet-600">{'\uD83D\uDCB0'}</span>
            <span className="text-sm font-medium text-violet-700">{content.badge}</span>
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

        {/* Tier cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12 reveal">
          {content.tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white border-2 border-violet-400 shadow-violet-500/25 relative'
                  : 'bg-white border border-stone-200 hover:shadow-xl'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                  BEST VALUE
                </div>
              )}
              <div className={`text-4xl font-black mb-2 ${tier.highlighted ? 'text-white' : 'text-stone-800'}`}>
                {tier.price}
              </div>
              <h3 className={`text-lg font-bold mb-3 ${tier.highlighted ? 'text-white' : 'text-stone-800'}`}>
                {tier.name}
              </h3>
              <p className={`text-sm leading-relaxed flex-1 ${tier.highlighted ? 'text-white/80' : 'text-stone-600'}`}>
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30"
          >
            {content.ctaButton}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
