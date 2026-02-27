'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
}> = {
  en: {
    badge: '33 Professional Printable Generators',
    titleLine1: 'Create ',
    titleHighlight: 'Professional Printables',
    titleLine2: 'for Your Business',
    subtitle: 'Generate word searches, math worksheets, coloring pages, and puzzles. Try free with watermark. Sell on Etsy, Amazon KDP, or your own shop. 11 languages, 3,000+ images.',
    ctaPrimary: 'Try Free with Watermark',
    ctaSecondary: 'See All 33 Generators',
    trustLanguages: '11 Languages',
    trustImages: '3000+ Images',
    trustLicense: 'Commercial License',
    answerKey: 'Answer Key',
    previewTitles: ['Addition', 'Word Search'],
  },
  de: {
    badge: '33 professionelle Druckvorlagen-Generatoren',
    titleLine1: 'Erstellen Sie ',
    titleHighlight: 'professionelle Druckvorlagen',
    titleLine2: 'für Ihr Business',
    subtitle: 'Generieren Sie Wortsuchrätsel, Mathe-Arbeitsblätter, Ausmalbilder und Puzzles. Kostenlos testen mit Wasserzeichen. Verkaufen Sie auf Etsy, Amazon KDP oder in Ihrem eigenen Shop.',
    ctaPrimary: 'Gratis mit Wasserzeichen testen',
    ctaSecondary: 'Alle 33 Generatoren entdecken',
    trustLanguages: '11 Sprachen',
    trustImages: '3000+ Bilder',
    trustLicense: 'Kommerzielle Nutzung',
    answerKey: 'Lösungsschlüssel',
    previewTitles: ['Addition', 'Wortsuche'],
  },
  fr: {
    badge: '33 générateurs d\'imprimables professionnels',
    titleLine1: 'Créez des ',
    titleHighlight: 'imprimables professionnels',
    titleLine2: 'pour votre business',
    subtitle: 'Générez des mots mêlés, des fiches de maths, des coloriages et des puzzles. Essai gratuit avec filigrane. Vendez sur Etsy, Amazon KDP ou votre propre boutique.',
    ctaPrimary: 'Essai gratuit avec filigrane',
    ctaSecondary: 'Explorer les 33 générateurs',
    trustLanguages: '11 langues',
    trustImages: '3000+ images',
    trustLicense: 'Usage commercial inclus',
    answerKey: 'Corrigé inclus',
    previewTitles: ['Addition', 'Mots mêlés'],
  },
  es: {
    badge: '33 generadores de imprimibles profesionales',
    titleLine1: 'Crea ',
    titleHighlight: 'imprimibles profesionales',
    titleLine2: 'para tu negocio',
    subtitle: 'Genera sopas de letras, fichas de matemáticas, páginas para colorear y puzzles. Prueba gratis con marca de agua. Vende en Etsy, Amazon KDP o tu propia tienda.',
    ctaPrimary: 'Probar gratis con marca de agua',
    ctaSecondary: 'Ver los 33 generadores',
    trustLanguages: '11 idiomas',
    trustImages: '3000+ imágenes',
    trustLicense: 'Uso comercial incluido',
    answerKey: 'Con respuestas',
    previewTitles: ['Sumas', 'Sopa de letras'],
  },
  it: {
    badge: '33 generatori di stampabili professionali',
    titleLine1: 'Crea ',
    titleHighlight: 'stampabili professionali',
    titleLine2: 'per il tuo business',
    subtitle: 'Genera crucipuzzle, schede di matematica, pagine da colorare e puzzle. Prova gratis con filigrana. Vendi su Etsy, Amazon KDP o il tuo negozio.',
    ctaPrimary: 'Prova gratis con filigrana',
    ctaSecondary: 'Esplora tutti i 33 generatori',
    trustLanguages: '11 lingue',
    trustImages: 'Oltre 3000 immagini',
    trustLicense: 'Licenza commerciale inclusa',
    answerKey: 'Soluzioni incluse',
    previewTitles: ['Addizioni', 'Cerca parole'],
  },
  pt: {
    badge: '33 geradores de imprimíveis profissionais',
    titleLine1: 'Crie ',
    titleHighlight: 'imprimíveis profissionais',
    titleLine2: 'para o seu negócio',
    subtitle: 'Gere caça-palavras, fichas de matemática, páginas para colorir e puzzles. Teste grátis com marca d\'agua. Venda no Etsy, Amazon KDP ou na sua própria loja.',
    ctaPrimary: 'Testar grátis com marca d\'agua',
    ctaSecondary: 'Explorar todos os 33 geradores',
    trustLanguages: '11 idiomas',
    trustImages: 'Mais de 3000 imagens',
    trustLicense: 'Licença comercial inclusa',
    answerKey: 'Gabarito incluso',
    previewTitles: ['Adição', 'Caça-palavras'],
  },
  nl: {
    badge: '33 professionele printbare generatoren',
    titleLine1: 'Maak ',
    titleHighlight: 'professionele printables',
    titleLine2: 'voor je business',
    subtitle: 'Genereer woordzoekers, rekenwerkbladen, kleurplaten en puzzels. Probeer gratis met watermerk. Verkoop op Etsy, Amazon KDP of je eigen winkel.',
    ctaPrimary: 'Gratis proberen met watermerk',
    ctaSecondary: 'Ontdek alle 33 generatoren',
    trustLanguages: '11 talen',
    trustImages: '3000+ afbeeldingen',
    trustLicense: 'Commerciële licentie',
    answerKey: 'Antwoordblad',
    previewTitles: ['Optellen', 'Woordzoeker'],
  },
  da: {
    badge: '33 professionelle printbare generatorer',
    titleLine1: 'Skab ',
    titleHighlight: 'professionelle printables',
    titleLine2: 'til din virksomhed',
    subtitle: 'Generer ordsøgninger, regneopgaver, tegnesider og puslespil. Prøv gratis med vandmærke. Sælg på Etsy, Amazon KDP eller din egen butik.',
    ctaPrimary: 'Prøv gratis med vandmærke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustLanguages: '11 sprog',
    trustImages: 'Over 3000 billeder',
    trustLicense: 'Kommerciel licens',
    answerKey: 'Facitliste',
    previewTitles: ['Addition', 'Find ord'],
  },
  sv: {
    badge: '33 professionella utskriftsgeneratorer',
    titleLine1: 'Skapa ',
    titleHighlight: 'professionella utskrifter',
    titleLine2: 'för ditt företag',
    subtitle: 'Generera ordsökningar, mattearbetsblad, målarbilder och pussel. Prova gratis med vattenstämpel. Sälj på Etsy, Amazon KDP eller din egen butik.',
    ctaPrimary: 'Prova gratis med vattenstämpel',
    ctaSecondary: 'Se alla 33 generatorer',
    trustLanguages: '11 språk',
    trustImages: 'Över 3000 bilder',
    trustLicense: 'Kommersiell licens',
    answerKey: 'Facit',
    previewTitles: ['Addition', 'Ordsök'],
  },
  no: {
    badge: '33 profesjonelle utskriftsgeneratorer',
    titleLine1: 'Lag ',
    titleHighlight: 'profesjonelle utskrifter',
    titleLine2: 'for din virksomhet',
    subtitle: 'Generer ordsøk, matteoppgaver, fargeleggingssider og puslespill. Prøv gratis med vannmerke. Selg på Etsy, Amazon KDP eller din egen butikk.',
    ctaPrimary: 'Prøv gratis med vannmerke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustLanguages: '11 språk',
    trustImages: 'Over 3000 bilder',
    trustLicense: 'Kommersiell lisens',
    answerKey: 'Fasit',
    previewTitles: ['Addisjon', 'Finn ord'],
  },
  fi: {
    badge: '33 ammattimaista tulostusgeneraattoria',
    titleLine1: 'Luo ',
    titleHighlight: 'ammattimaisia tulostettavia',
    titleLine2: 'yrityksellesi',
    subtitle: 'Generoi sananhakuja, matematiikkatehtäviä, värityskuvia ja palapelit. Kokeile ilmaiseksi vesileimalla. Myy Etsyssä, Amazon KDP:ssä tai omassa kaupassa.',
    ctaPrimary: 'Kokeile ilmaiseksi vesileimalla',
    ctaSecondary: 'Tutustu kaikkiin 33 generaattoriin',
    trustLanguages: '11 kieltä',
    trustImages: 'Yli 3000 kuvaa',
    trustLicense: 'Kaupallinen lisenssi',
    answerKey: 'Vastaukset',
    previewTitles: ['Yhteenlasku', 'Sananetsintä'],
  },
};

export default function HomepageHero({ locale, heroImages }: HomepageHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<'left' | 'right' | null>(null);
  const isVideoPlaying = false;
  const containerRef = useRef<HTMLDivElement>(null);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Use server-provided hero images (baked into ISR HTML for immediate display)
  // Falls back to empty strings if prop not provided
  const heroImageSources = heroImages || { portrait: '', landscape: '' };

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(mousePosition.x, springConfig);
  const springY = useSpring(mousePosition.y, springConfig);

  // Pre-compute inverted spring transforms at top level (hooks must not be called conditionally)
  const invertedSpringX = useTransform(springX, v => v * -0.5);
  const invertedSpringY = useTransform(springY, v => v * -0.5);

  useEffect(() => {
    // Skip on touch devices \u2014 mousemove is irrelevant and wastes CPU
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 40,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 40,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Preview worksheets - real samples
  const getAltText = (type: 'addition' | 'wordsearch') => {
    const altTexts = {
      addition: {
        en: 'Addition Worksheet Sample',
        de: 'Additions-Arbeitsblatt Beispiel',
        fr: 'Exemple de fiche d\'addition',
        es: 'Ejemplo de ficha de sumas',
        it: 'Esempio di scheda di addizioni',
        pt: 'Exemplo de atividade de adi\u00e7\u00e3o',
        nl: 'Voorbeeld optelwerkblad',
        da: 'Eksempel p\u00e5 additionsopgave',
        sv: 'Exempel p\u00e5 additions\u00f6vningsblad',
        no: 'Eksempel p\u00e5 addisjonsoppgave',
        fi: 'Esimerkki yhteenlaskuteht\u00e4v\u00e4st\u00e4',
      },
      wordsearch: {
        en: 'Word Search Worksheet Sample',
        de: 'Wortsuche-Arbeitsblatt Beispiel',
        fr: 'Exemple de mots m\u00eal\u00e9s',
        es: 'Ejemplo de sopa de letras',
        it: 'Esempio di cerca parole',
        pt: 'Exemplo de ca\u00e7a-palavras',
        nl: 'Voorbeeld woordzoeker',
        da: 'Eksempel p\u00e5 find ord-opgave',
        sv: 'Exempel p\u00e5 ords\u00f6ks\u00f6vningsblad',
        no: 'Eksempel p\u00e5 finn ord-oppgave',
        fi: 'Esimerkki sananetsint\u00e4teht\u00e4v\u00e4st\u00e4',
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

      {/* Animated mesh gradient orbs \u2014 CSS animations, paused via class when video plays */}
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

      {/* Floating geometric shapes \u2014 hidden on mobile to reduce paint cost */}
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
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Text content \u2014 CSS animations instead of Framer Motion */}
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

              {/* Title \u2014 NO animation, must be visible instantly (LCP element) */}
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
                  href={`/${locale}/apps`}
                  
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
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start hero-fade-in hero-stagger-4">
                {[
                  { icon: '\ud83c\udf0d', label: content.trustLanguages },
                  { icon: '\ud83c\udfa8', label: content.trustImages },
                  { icon: '\ud83d\udcbc', label: content.trustLicense },
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
                <motion.div
                  className="absolute top-8 left-0 w-[280px]"
                  style={{
                    x: springX,
                    y: springY,
                    rotateY: isHovered === 'left' ? 5 : -5,
                    rotateX: isHovered === 'left' ? -5 : 5,
                    scale: isHovered === 'left' ? 1.05 : 1,
                    zIndex: isHovered === 'left' ? 20 : 1,
                  }}
                  onHoverStart={() => setIsHovered('left')}
                  onHoverEnd={() => setIsHovered(null)}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                </motion.div>

                {/* Right preview card */}
                <motion.div
                  className="absolute bottom-8 right-0 w-[300px]"
                  style={{
                    x: invertedSpringX,
                    y: invertedSpringY,
                    rotateY: isHovered === 'right' ? -5 : 5,
                    rotateX: isHovered === 'right' ? 5 : -5,
                    scale: isHovered === 'right' ? 1.05 : 1,
                    zIndex: isHovered === 'right' ? 20 : 1,
                  }}
                  onHoverStart={() => setIsHovered('right')}
                  onHoverEnd={() => setIsHovered(null)}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                </motion.div>

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
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 scroll-indicator-ring">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
}
