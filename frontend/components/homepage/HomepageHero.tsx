'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HomepageHeroProps {
  locale: string;
  heroImages?: { portrait: string; landscape: string };
}

// Localization content - native language versions
const localeContent: Record<string, {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustLanguages: string;
  trustImages: string;
  trustLicense: string;
  answerKey: string;
  previewTitles: string[];
  proofWorksheets: string;
  proofCountries: string;
  proofGenerators: string;
}> = {
  en: {
    badge: 'The Printable Business Opportunity',
    titleLine1: 'Start a Profitable ',
    titleHighlight: 'Printable Business',
    titleLine2: '-- No Design Skills Needed',
    subtitle: 'Thousands of sellers earn $500--$5,000/month selling educational printables on Etsy, Amazon KDP, and TPT. LessonCraftStudio lets you create professional products in minutes, not hours.',
    ctaPrimary: 'See How It Works',
    ctaSecondary: 'Try Free with Watermark',
    trustLanguages: '11 Languages',
    trustImages: '3,000+ Images',
    trustLicense: 'Commercial License',
    answerKey: 'Answer Key',
    previewTitles: ['Addition', 'Word Search'],
    proofWorksheets: '10,000+ worksheets generated',
    proofCountries: 'Sellers in 40+ countries',
    proofGenerators: '33 professional generators',
  },
  de: {
    badge: 'Die Printable-Business-Chance',
    titleLine1: 'Starten Sie ein profitables ',
    titleHighlight: 'Printable-Business',
    titleLine2: '-- Keine Designkenntnisse noetig',
    subtitle: 'Tausende Verkaeufer verdienen 500--5.000 $/Monat mit dem Verkauf von Druckvorlagen auf Etsy, Amazon KDP und TPT. LessonCraftStudio erstellt professionelle Produkte in Minuten statt Stunden.',
    ctaPrimary: 'So funktioniert es',
    ctaSecondary: 'Gratis mit Wasserzeichen testen',
    trustLanguages: '11 Sprachen',
    trustImages: '3.000+ Bilder',
    trustLicense: 'Kommerzielle Nutzung',
    answerKey: 'Loesungsschluessel',
    previewTitles: ['Addition', 'Wortsuche'],
    proofWorksheets: 'Ueber 10.000 Arbeitsblaetter erstellt',
    proofCountries: 'Verkaeufer in 40+ Laendern',
    proofGenerators: '33 professionelle Generatoren',
  },
  fr: {
    badge: 'L\'opportunite business des imprimables',
    titleLine1: 'Lancez un business ',
    titleHighlight: 'd\'imprimables rentable',
    titleLine2: '-- Aucune competence en design',
    subtitle: 'Des milliers de vendeurs gagnent 500 a 5 000 $/mois en vendant des imprimables educatifs sur Etsy, Amazon KDP et TPT. LessonCraftStudio cree des produits professionnels en minutes.',
    ctaPrimary: 'Voir comment ca marche',
    ctaSecondary: 'Essai gratuit avec filigrane',
    trustLanguages: '11 langues',
    trustImages: '3 000+ images',
    trustLicense: 'Usage commercial inclus',
    answerKey: 'Corrige inclus',
    previewTitles: ['Addition', 'Mots meles'],
    proofWorksheets: 'Plus de 10 000 fiches generees',
    proofCountries: 'Vendeurs dans 40+ pays',
    proofGenerators: '33 generateurs professionnels',
  },
  es: {
    badge: 'La oportunidad del negocio de imprimibles',
    titleLine1: 'Inicia un negocio ',
    titleHighlight: 'de imprimibles rentable',
    titleLine2: '-- Sin habilidades de diseno',
    subtitle: 'Miles de vendedores ganan $500--$5,000/mes vendiendo imprimibles educativos en Etsy, Amazon KDP y TPT. LessonCraftStudio crea productos profesionales en minutos, no horas.',
    ctaPrimary: 'Ver como funciona',
    ctaSecondary: 'Probar gratis con marca de agua',
    trustLanguages: '11 idiomas',
    trustImages: '3,000+ imagenes',
    trustLicense: 'Uso comercial incluido',
    answerKey: 'Con respuestas',
    previewTitles: ['Sumas', 'Sopa de letras'],
    proofWorksheets: 'Mas de 10,000 fichas generadas',
    proofCountries: 'Vendedores en 40+ paises',
    proofGenerators: '33 generadores profesionales',
  },
  it: {
    badge: 'L\'opportunita business degli stampabili',
    titleLine1: 'Avvia un business ',
    titleHighlight: 'di stampabili redditizio',
    titleLine2: '-- Nessuna competenza di design',
    subtitle: 'Migliaia di venditori guadagnano $500--$5.000/mese vendendo stampabili educativi su Etsy, Amazon KDP e TPT. LessonCraftStudio crea prodotti professionali in pochi minuti.',
    ctaPrimary: 'Scopri come funziona',
    ctaSecondary: 'Prova gratis con filigrana',
    trustLanguages: '11 lingue',
    trustImages: 'Oltre 3.000 immagini',
    trustLicense: 'Licenza commerciale inclusa',
    answerKey: 'Soluzioni incluse',
    previewTitles: ['Addizioni', 'Cerca parole'],
    proofWorksheets: 'Oltre 10.000 schede generate',
    proofCountries: 'Venditori in 40+ paesi',
    proofGenerators: '33 generatori professionali',
  },
  pt: {
    badge: 'A oportunidade de negocio dos imprimiveis',
    titleLine1: 'Inicie um negocio ',
    titleHighlight: 'de imprimiveis lucrativo',
    titleLine2: '-- Sem habilidades de design',
    subtitle: 'Milhares de vendedores ganham $500--$5.000/mes vendendo imprimiveis educativos no Etsy, Amazon KDP e TPT. LessonCraftStudio cria produtos profissionais em minutos.',
    ctaPrimary: 'Veja como funciona',
    ctaSecondary: 'Teste gratis com marca d\'agua',
    trustLanguages: '11 idiomas',
    trustImages: 'Mais de 3.000 imagens',
    trustLicense: 'Licenca comercial inclusa',
    answerKey: 'Gabarito incluso',
    previewTitles: ['Adicao', 'Caca-palavras'],
    proofWorksheets: 'Mais de 10.000 atividades geradas',
    proofCountries: 'Vendedores em 40+ paises',
    proofGenerators: '33 geradores profissionais',
  },
  nl: {
    badge: 'De printable business-kans',
    titleLine1: 'Start een winstgevend ',
    titleHighlight: 'printable bedrijf',
    titleLine2: '-- Geen designvaardigheden nodig',
    subtitle: 'Duizenden verkopers verdienen $500--$5.000/maand met het verkopen van educatieve printables op Etsy, Amazon KDP en TPT. LessonCraftStudio maakt professionele producten in minuten.',
    ctaPrimary: 'Bekijk hoe het werkt',
    ctaSecondary: 'Gratis proberen met watermerk',
    trustLanguages: '11 talen',
    trustImages: '3.000+ afbeeldingen',
    trustLicense: 'Commerciele licentie',
    answerKey: 'Antwoordblad',
    previewTitles: ['Optellen', 'Woordzoeker'],
    proofWorksheets: 'Meer dan 10.000 werkbladen gemaakt',
    proofCountries: 'Verkopers in 40+ landen',
    proofGenerators: '33 professionele generatoren',
  },
  da: {
    badge: 'Printable-forretningsmuligheden',
    titleLine1: 'Start en profitabel ',
    titleHighlight: 'printable-virksomhed',
    titleLine2: '-- Ingen designfaerdigheder paakraevet',
    subtitle: 'Tusindvis af saelgere tjener $500--$5.000/maaned paa at saelge paedagogiske printables paa Etsy, Amazon KDP og TPT. LessonCraftStudio skaber professionelle produkter paa minutter.',
    ctaPrimary: 'Se hvordan det virker',
    ctaSecondary: 'Proev gratis med vandmaerke',
    trustLanguages: '11 sprog',
    trustImages: 'Over 3.000 billeder',
    trustLicense: 'Kommerciel licens',
    answerKey: 'Facitliste',
    previewTitles: ['Addition', 'Find ord'],
    proofWorksheets: 'Over 10.000 opgaver oprettet',
    proofCountries: 'Saelgere i 40+ lande',
    proofGenerators: '33 professionelle generatorer',
  },
  sv: {
    badge: 'Utskriftsfoeretagets moejlighet',
    titleLine1: 'Starta ett loensamnt ',
    titleHighlight: 'utskriftsfoereag',
    titleLine2: '-- Inga designkunskaper kraevs',
    subtitle: 'Tusentals saeljare tjaenar $500--$5.000/manad paa att saelja pedagogiska utskrifter paa Etsy, Amazon KDP och TPT. LessonCraftStudio skapar professionella produkter paa minuter.',
    ctaPrimary: 'Se hur det fungerar',
    ctaSecondary: 'Prova gratis med vattenstempel',
    trustLanguages: '11 spraak',
    trustImages: 'Over 3.000 bilder',
    trustLicense: 'Kommersiell licens',
    answerKey: 'Facit',
    previewTitles: ['Addition', 'Ordsoek'],
    proofWorksheets: 'Over 10.000 arbetsblad skapade',
    proofCountries: 'Saeljare i 40+ laender',
    proofGenerators: '33 professionella generatorer',
  },
  no: {
    badge: 'Utskriftsvirksomhetens mulighet',
    titleLine1: 'Start en loennsom ',
    titleHighlight: 'utskriftsvirksomhet',
    titleLine2: '-- Ingen designkunnskaper noedvendig',
    subtitle: 'Tusenvis av selgere tjener $500--$5.000/maaned paa aa selge pedagogiske utskrifter paa Etsy, Amazon KDP og TPT. LessonCraftStudio lager profesjonelle produkter paa minutter.',
    ctaPrimary: 'Se hvordan det fungerer',
    ctaSecondary: 'Proev gratis med vannmerke',
    trustLanguages: '11 spraak',
    trustImages: 'Over 3.000 bilder',
    trustLicense: 'Kommersiell lisens',
    answerKey: 'Fasit',
    previewTitles: ['Addisjon', 'Finn ord'],
    proofWorksheets: 'Over 10.000 arbeidsark laget',
    proofCountries: 'Selgere i 40+ land',
    proofGenerators: '33 profesjonelle generatorer',
  },
  fi: {
    badge: 'Tulostettavien liiketoimintamahdollisuus',
    titleLine1: 'Aloita kannattava ',
    titleHighlight: 'tulostettavien liiketoiminta',
    titleLine2: '-- Ei suunnittelutaitoja tarvita',
    subtitle: 'Tuhannet myyjat tienaavat $500--$5.000/kk myymalla opetuksellisia tulostettavia Etsyssa, Amazon KDP:ssa ja TPT:ssa. LessonCraftStudio luo ammattimaiset tuotteet minuuteissa.',
    ctaPrimary: 'Katso miten se toimii',
    ctaSecondary: 'Kokeile ilmaiseksi vesileimalla',
    trustLanguages: '11 kielta',
    trustImages: 'Yli 3.000 kuvaa',
    trustLicense: 'Kaupallinen lisenssi',
    answerKey: 'Vastaukset',
    previewTitles: ['Yhteenlasku', 'Sananetsinta'],
    proofWorksheets: 'Yli 10.000 tehtavaa luotu',
    proofCountries: 'Myyjia 40+ maassa',
    proofGenerators: '33 ammattimaista generaattoria',
  },
};

export default function HomepageHero({ locale, heroImages }: HomepageHeroProps) {
  const [isHovered, setIsHovered] = useState<'left' | 'right' | null>(null);
  const isVideoPlaying = false;
  const containerRef = useRef<HTMLDivElement>(null);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Use server-provided hero images (baked into ISR HTML for immediate display)
  // Falls back to empty strings if prop not provided
  const heroImageSources = heroImages || { portrait: '', landscape: '' };

  // Preview worksheets - real samples
  const getAltText = (type: 'addition' | 'wordsearch') => {
    const altTexts = {
      addition: {
        en: 'Addition Worksheet Sample',
        de: 'Additions-Arbeitsblatt Beispiel',
        fr: 'Exemple de fiche d\'addition',
        es: 'Ejemplo de ficha de sumas',
        it: 'Esempio di scheda di addizioni',
        pt: 'Exemplo de atividade de adicao',
        nl: 'Voorbeeld optelwerkblad',
        da: 'Eksempel paa additionsopgave',
        sv: 'Exempel paa additionsovningsblad',
        no: 'Eksempel paa addisjonsoppgave',
        fi: 'Esimerkki yhteenlaskutehtavasta',
      },
      wordsearch: {
        en: 'Word Search Worksheet Sample',
        de: 'Wortsuche-Arbeitsblatt Beispiel',
        fr: 'Exemple de mots meles',
        es: 'Ejemplo de sopa de letras',
        it: 'Esempio di cerca parole',
        pt: 'Exemplo de caca-palavras',
        nl: 'Voorbeeld woordzoeker',
        da: 'Eksempel paa find ord-opgave',
        sv: 'Exempel paa ordsoeksovningsblad',
        no: 'Eksempel paa finn ord-oppgave',
        fi: 'Esimerkki sananetsintatehtavasta',
      },
    };
    return altTexts[type][locale as keyof typeof altTexts.addition] || altTexts[type].en;
  };

  // Check if we have any hero images to display
  const hasHeroImages = !!(heroImageSources.portrait || heroImageSources.landscape);

  // Create preview worksheets using dynamic hero images (only if available)
  const previewWorksheets = hasHeroImages ? [
    {
      src: heroImageSources.portrait,
      alt: getAltText('addition'),
      title: content.previewTitles[0],
    },
    {
      src: heroImageSources.landscape,
      alt: getAltText('wordsearch'),
      title: content.previewTitles[1],
    },
  ] : [];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Deep gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              #030305 0%,
              #0a0a1a 25%,
              #0f0f2a 50%,
              #0a1628 75%,
              #051020 100%
            )
          `
        }}
      />

      {/* Animated grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated mesh gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary cyan orb */}
        <div
          className={`absolute w-[900px] h-[900px] rounded-full ${isVideoPlaying ? '' : 'hero-orb-pulse'}`}
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
            top: '-20%',
            right: '-15%',
          }}
        />

        {/* Secondary purple orb */}
        <div
          className={`absolute w-[700px] h-[700px] rounded-full ${isVideoPlaying ? '' : 'hero-orb-drift'}`}
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
            bottom: '-10%',
            left: '-10%',
          }}
        />

        {/* Accent pink orb */}
        <div
          className={`absolute w-[500px] h-[500px] rounded-full ${isVideoPlaying ? '' : 'hero-orb-fade'}`}
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 60%)',
            top: '40%',
            left: '30%',
          }}
        />
      </div>

      {/* Floating geometric shapes -- hidden on mobile to reduce paint cost */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* Floating diamond */}
        <div
          className="absolute w-4 h-4 border border-cyan-500/20 float-diamond"
          style={{ top: '15%', left: '10%' }}
        />

        {/* Floating circle */}
        <div
          className="absolute w-3 h-3 rounded-full border border-purple-500/30 float-circle"
          style={{ top: '25%', right: '15%' }}
        />

        {/* Floating plus */}
        <div
          className="absolute text-pink-500/20 text-2xl font-light float-plus"
          style={{ bottom: '30%', left: '8%' }}
        >
          +
        </div>

        {/* More floating elements */}
        <div
          className="absolute w-2 h-8 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full float-bar"
          style={{ top: '40%', right: '8%' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 hero-fade-in hero-stagger-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                />
                <span className="text-sm font-medium text-cyan-300">
                  {content.badge}
                </span>
              </div>

              {/* Title -- NO animation, must be visible instantly (LCP element) */}
              <h1
                className="speakable-headline text-[clamp(2.25rem,8vw,3rem)] lg:text-[clamp(2rem,3vw,2.5rem)] font-black leading-[1.1] tracking-tight mb-6 break-words"
                style={{
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  hyphens: 'none',
                }}
                lang={locale}
              >
                <span className="text-white">{content.titleLine1}</span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                  }}
                >
                  {content.titleHighlight}
                </span>
                <br />
                <span className="text-white">{content.titleLine2}</span>
              </h1>

              {/* Subtitle */}
              <p className="speakable-summary text-lg sm:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed hero-fade-in hero-stagger-2">
                {content.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 hero-fade-in hero-stagger-3">
                <a
                  href="#quick-demo"
                  className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                    boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.2)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {content.ctaPrimary}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>

                <Link
                  href={`/${locale}/apps`}
                  className="group px-8 py-4 rounded-xl font-semibold text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {content.ctaSecondary}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8 hero-fade-in hero-stagger-4">
                {[
                  { icon: '\uD83C\uDF0D', label: content.trustLanguages },
                  { icon: '\uD83C\uDFA8', label: content.trustImages },
                  { icon: '\uD83D\uDCBC', label: content.trustLicense },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <span className="text-base">{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Social proof bar */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start hero-fade-in hero-stagger-5">
                {[
                  content.proofWorksheets,
                  content.proofCountries,
                  content.proofGenerators,
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-white/40 px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <svg className="w-3 h-3 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Preview cards (only shown when hero images are uploaded) */}
            {hasHeroImages && previewWorksheets.length > 0 && (
            <div className="relative hidden lg:block hero-fade-in-right">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Glow effect behind cards */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(168,85,247,0.3) 50%, rgba(236,72,153,0.2) 100%)',
                  }}
                />

                {/* Left preview card */}
                <div
                  className="absolute top-8 left-0 w-[280px] transition-transform duration-300"
                  style={{
                    transform: isHovered === 'left' ? 'scale(1.05) rotateY(5deg) rotateX(-5deg)' : 'rotateY(-5deg) rotateX(5deg)',
                    zIndex: isHovered === 'left' ? 20 : 1,
                  }}
                  onMouseEnter={() => setIsHovered('left')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transform: 'perspective(1000px)',
                    }}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-black/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <span className="ml-3 text-xs text-white/40 truncate">{previewWorksheets[0].title}</span>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[3/4] bg-white">
                      <Image
                        src={previewWorksheets[0].src}
                        alt={previewWorksheets[0].alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 200px, 280px"
                        unoptimized
                      />
                    </div>

                    {/* Floating badge */}
                    <div
                      className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white badge-float"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 20px rgba(6,182,212,0.4)',
                      }}
                    >
                      300 DPI
                    </div>
                  </div>
                </div>

                {/* Right preview card */}
                <div
                  className="absolute bottom-8 right-0 w-[300px] transition-transform duration-300"
                  style={{
                    transform: isHovered === 'right' ? 'scale(1.05) rotateY(-5deg) rotateX(5deg)' : 'rotateY(5deg) rotateX(-5deg)',
                    zIndex: isHovered === 'right' ? 20 : 1,
                  }}
                  onMouseEnter={() => setIsHovered('right')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transform: 'perspective(1000px)',
                    }}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-black/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <span className="ml-3 text-xs text-white/40 truncate">{previewWorksheets[1].title}</span>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={previewWorksheets[1].src}
                        alt={previewWorksheets[1].alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 200px, 300px"
                        unoptimized
                      />
                    </div>

                    {/* Floating badge */}
                    <div
                      className="absolute -top-3 -left-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 badge-float-down"
                      style={{
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 20px rgba(236,72,153,0.4)',
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {content.answerKey}
                    </div>
                  </div>
                </div>

                {/* Center decorative element */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full center-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 scroll-indicator-ring">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
}
