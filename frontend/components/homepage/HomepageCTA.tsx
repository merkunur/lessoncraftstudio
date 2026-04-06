'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/use-reveal';

interface HomepageCTAProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  titleStart: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustNoCard: string;
  trustFreeGenerators: string;
  trustCancelAnytime: string;
}> = {
  en: {
    badge: 'Start Your Printable Business Today',
    titleStart: 'Ready to Build Your ',
    titleHighlight: 'Printable Empire',
    subtitle: 'Try all 33 generators as a free trial with watermark. See the full quality before you buy. No account required.',
    ctaPrimary: 'Try Free with Watermark',
    ctaSecondary: 'View All 33 Generators',
    trustNoCard: 'No account required',
    trustFreeGenerators: 'All 33 generators included in free trial',
    trustCancelAnytime: 'Commercial license included',
  },
  de: {
    badge: 'Starten Sie Ihr Printable-Business heute',
    titleStart: 'Bereit, Ihr ',
    titleHighlight: 'Printable-Imperium aufzubauen',
    subtitle: 'Testen Sie alle 33 Generatoren als kostenlose Testversion mit Wasserzeichen. Sehen Sie die volle Qualität vor dem Kauf. Kein Konto erforderlich.',
    ctaPrimary: 'Gratis mit Wasserzeichen testen',
    ctaSecondary: 'Alle 33 Generatoren entdecken',
    trustNoCard: 'Kein Konto erforderlich',
    trustFreeGenerators: 'Alle 33 Generatoren in der Testversion',
    trustCancelAnytime: 'Kommerzielle Lizenz inklusive',
  },
  fr: {
    badge: 'Lancez votre business d\'imprimables aujourd\'hui',
    titleStart: 'Prêt à construire votre ',
    titleHighlight: 'empire d\'imprimables',
    subtitle: 'Essayez les 33 générateurs en version d\'essai gratuite avec filigrane. Voyez la qualité complète avant d\'acheter. Aucun compte requis.',
    ctaPrimary: 'Essai gratuit avec filigrane',
    ctaSecondary: 'Explorer les 33 générateurs',
    trustNoCard: 'Aucun compte requis',
    trustFreeGenerators: '33 générateurs en essai gratuit',
    trustCancelAnytime: 'Licence commerciale incluse',
  },
  es: {
    badge: 'Empieza tu negocio de imprimibles hoy',
    titleStart: 'Listo para construir tu ',
    titleHighlight: 'imperio de imprimibles',
    subtitle: 'Prueba los 33 generadores como prueba gratuita con marca de agua. Comprueba la calidad completa antes de comprar. Sin cuenta requerida.',
    ctaPrimary: 'Probar gratis con marca de agua',
    ctaSecondary: 'Explorar los 33 generadores',
    trustNoCard: 'Sin cuenta requerida',
    trustFreeGenerators: '33 generadores en prueba gratuita',
    trustCancelAnytime: 'Licencia comercial incluida',
  },
  it: {
    badge: 'Avvia il tuo business di stampabili oggi',
    titleStart: 'Pronto a costruire il tuo ',
    titleHighlight: 'impero di stampabili',
    subtitle: 'Prova tutti i 33 generatori come prova gratuita con filigrana. Verifica la qualità completa prima di acquistare. Nessun account richiesto.',
    ctaPrimary: 'Prova gratis con filigrana',
    ctaSecondary: 'Esplora tutti i 33 generatori',
    trustNoCard: 'Nessun account richiesto',
    trustFreeGenerators: '33 generatori in prova gratuita',
    trustCancelAnytime: 'Licenza commerciale inclusa',
  },
  pt: {
    badge: 'Comece seu negócio de imprimíveis hoje',
    titleStart: 'Pronto para construir seu ',
    titleHighlight: 'império de imprimíveis',
    subtitle: 'Experimente os 33 geradores como teste gratuito com marca d\'água. Veja a qualidade completa antes de comprar. Sem conta necessária.',
    ctaPrimary: 'Teste grátis com marca d\'água',
    ctaSecondary: 'Explorar todos os 33 geradores',
    trustNoCard: 'Sem conta necessária',
    trustFreeGenerators: '33 geradores em teste gratuito',
    trustCancelAnytime: 'Licença comercial incluída',
  },
  nl: {
    badge: 'Start je printable business vandaag',
    titleStart: 'Klaar om je ',
    titleHighlight: 'printable imperium op te bouwen',
    subtitle: 'Probeer alle 33 generatoren als gratis proefversie met watermerk. Bekijk de volledige kwaliteit voor je koopt. Geen account nodig.',
    ctaPrimary: 'Gratis proberen met watermerk',
    ctaSecondary: 'Bekijk alle 33 generatoren',
    trustNoCard: 'Geen account nodig',
    trustFreeGenerators: 'Alle 33 generatoren in gratis proefversie',
    trustCancelAnytime: 'Commerciële licentie inbegrepen',
  },
  da: {
    badge: 'Start din printable-virksomhed i dag',
    titleStart: 'Klar til at bygge dit ',
    titleHighlight: 'printable-imperium',
    subtitle: 'Prøv alle 33 generatorer som gratis prøveversion med vandmærke. Se den fulde kvalitet før du køber. Ingen konto påkrævet.',
    ctaPrimary: 'Prøv gratis med vandmærke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustNoCard: 'Ingen konto påkrævet',
    trustFreeGenerators: 'Alle 33 generatorer i gratis prøveversion',
    trustCancelAnytime: 'Kommerciel licens inkluderet',
  },
  sv: {
    badge: 'Starta ditt utskriftsföretag idag',
    titleStart: 'Redo att bygga ditt ',
    titleHighlight: 'utskriftsimperium',
    subtitle: 'Testa alla 33 generatorer som gratis provversion med vattenstämpel. Se den fulla kvaliteten innan du köper. Inget konto krävs.',
    ctaPrimary: 'Prova gratis med vattenstämpel',
    ctaSecondary: 'Se alla 33 generatorer',
    trustNoCard: 'Inget konto krävs',
    trustFreeGenerators: 'Alla 33 generatorer i gratis provversion',
    trustCancelAnytime: 'Kommersiell licens ingår',
  },
  no: {
    badge: 'Start din utskriftsvirksomhet i dag',
    titleStart: 'Klar til å bygge ditt ',
    titleHighlight: 'utskriftsimperium',
    subtitle: 'Prøv alle 33 generatorer som gratis prøveversjon med vannmerke. Se den fulle kvaliteten før du kjøper. Ingen konto nødvendig.',
    ctaPrimary: 'Prøv gratis med vannmerke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustNoCard: 'Ingen konto nødvendig',
    trustFreeGenerators: 'Alle 33 generatorer i gratis prøveversjon',
    trustCancelAnytime: 'Kommersiell lisens inkludert',
  },
  fi: {
    badge: 'Aloita tulostettavien liiketoiminta tänään',
    titleStart: 'Valmis rakentamaan ',
    titleHighlight: 'tulostettavien imperiumisi',
    subtitle: 'Kokeile kaikkia 33 generaattoria ilmaisena kokeiluversiona vesileimalla. Näe täysi laatu ennen ostamista. Ei tiliä tarvita.',
    ctaPrimary: 'Kokeile ilmaiseksi vesileimalla',
    ctaSecondary: 'Tutustu kaikkiin 33 generaattoriin',
    trustNoCard: 'Ei tiliä tarvita',
    trustFreeGenerators: 'Kaikki 33 generaattoria ilmaisessa kokeiluversiossa',
    trustCancelAnytime: 'Kaupallinen lisenssi sisältyy',
  },
};

export default function HomepageCTA({ locale }: HomepageCTAProps) {
  const sectionRef = useReveal();
  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            #0a0a0a 0%,
            #1a1a2e 40%,
            #16213e 70%,
            #0f172a 100%
          )`,
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 orb-scale-1"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 orb-scale-2"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
            bottom: '-15%',
            left: '-5%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 orb-scale-3"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
            top: '30%',
            left: '40%',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="max-w-4xl mx-auto text-center reveal"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
              border: '1px solid rgba(6,182,212,0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 dot-pulse" />
            <span className="text-sm font-medium text-cyan-300">
              {content.badge}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.titleStart}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
              }}
            >
              {content.titleHighlight}
            </span>
            {'?'}
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            {content.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/apps`}
              className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.2)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {content.ctaPrimary}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              href={`/${locale}/apps`}
              className="group px-8 py-4 rounded-xl font-semibold text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {content.ctaSecondary}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </Link>
          </div>

          {/* Trust elements */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{content.trustNoCard}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{content.trustFreeGenerators}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{content.trustCancelAnytime}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
