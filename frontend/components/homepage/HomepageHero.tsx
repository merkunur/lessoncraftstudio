'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface HomepageHeroProps {
  locale: string;
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
    badge: '33 Professional Worksheet Generators',
    titleLine1: 'Create ',
    titleHighlight: 'Beautiful',
    titleLine2: 'Educational Materials',
    subtitle: 'Professional worksheet generators trusted by teachers worldwide. Create, customize, and download in minutes.',
    ctaPrimary: 'View Free Samples',
    ctaSecondary: 'See All Generators',
    trustLanguages: '11 Languages',
    trustImages: '3000+ Images',
    trustLicense: 'Commercial License',
    answerKey: 'Answer Key',
    previewTitles: ['Addition', 'Word Search'],
  },
  de: {
    badge: '33 professionelle Arbeitsblatt-Generatoren',
    titleLine1: 'Erstellen Sie ',
    titleHighlight: 'wunderschöne',
    titleLine2: 'Unterrichtsmaterialien',
    subtitle: 'Professionelle Arbeitsblatt-Generatoren, denen Lehrkräfte weltweit vertrauen. Erstellen, anpassen und herunterladen – in wenigen Minuten.',
    ctaPrimary: 'Gratis-Beispiele entdecken',
    ctaSecondary: 'Alle Generatoren entdecken',
    trustLanguages: '11 Sprachen',
    trustImages: '3000+ Bilder',
    trustLicense: 'Kommerzielle Nutzung',
    answerKey: 'Lösungsschlüssel',
    previewTitles: ['Addition', 'Wortsuche'],
  },
  fr: {
    badge: '33 générateurs de fiches pédagogiques',
    titleLine1: 'Créez des supports ',
    titleHighlight: 'pédagogiques',
    titleLine2: 'exceptionnels',
    subtitle: 'Des outils professionnels plébiscités par les enseignants du monde entier. Concevez, personnalisez et téléchargez vos fiches en quelques minutes.',
    ctaPrimary: 'Découvrir les exemples gratuits',
    ctaSecondary: 'Explorer tous les générateurs',
    trustLanguages: '11 langues',
    trustImages: '3000+ images',
    trustLicense: 'Usage commercial inclus',
    answerKey: 'Corrigé inclus',
    previewTitles: ['Addition', 'Mots mêlés'],
  },
  es: {
    badge: '33 generadores de fichas educativas',
    titleLine1: 'Crea materiales ',
    titleHighlight: 'educativos',
    titleLine2: 'increíbles',
    subtitle: 'Herramientas profesionales que usan maestros en todo el mundo. Diseña, personaliza y descarga tus fichas en minutos.',
    ctaPrimary: 'Ver ejemplos gratis',
    ctaSecondary: 'Explorar todos los generadores',
    trustLanguages: '11 idiomas',
    trustImages: '3000+ imágenes',
    trustLicense: 'Uso comercial incluido',
    answerKey: 'Con respuestas',
    previewTitles: ['Sumas', 'Sopa de letras'],
  },
  it: {
    badge: '33 generatori di schede didattiche',
    titleLine1: 'Crea materiali ',
    titleHighlight: 'didattici',
    titleLine2: 'straordinari',
    subtitle: 'Strumenti professionali utilizzati da insegnanti in tutto il mondo. Crea, personalizza e scarica le tue schede in pochi minuti.',
    ctaPrimary: 'Scopri gli esempi gratuiti',
    ctaSecondary: 'Esplora tutti i generatori',
    trustLanguages: '11 lingue',
    trustImages: 'Oltre 3000 immagini',
    trustLicense: 'Licenza commerciale inclusa',
    answerKey: 'Soluzioni incluse',
    previewTitles: ['Addizioni', 'Cerca parole'],
  },
  pt: {
    badge: '33 geradores de atividades profissionais',
    titleLine1: 'Crie materiais ',
    titleHighlight: 'educativos',
    titleLine2: 'incríveis',
    subtitle: 'Ferramentas profissionais usadas por professores no mundo todo. Crie, personalize e baixe suas atividades em poucos minutos.',
    ctaPrimary: 'Ver exemplos grátis',
    ctaSecondary: 'Explorar todos os geradores',
    trustLanguages: '11 idiomas',
    trustImages: 'Mais de 3000 imagens',
    trustLicense: 'Licença comercial inclusa',
    answerKey: 'Gabarito incluso',
    previewTitles: ['Adição', 'Caça-palavras'],
  },
  nl: {
    badge: '33 professionele werkbladgeneratoren',
    titleLine1: 'Maak ',
    titleHighlight: 'prachtige',
    titleLine2: 'lesmateriaal',
    subtitle: 'Professionele werkbladgeneratoren waar leerkrachten wereldwijd op vertrouwen. Maak, pas aan en download binnen enkele minuten.',
    ctaPrimary: 'Bekijk gratis voorbeelden',
    ctaSecondary: 'Ontdek alle generatoren',
    trustLanguages: '11 talen',
    trustImages: '3000+ afbeeldingen',
    trustLicense: 'Commerciële licentie',
    answerKey: 'Antwoordblad',
    previewTitles: ['Optellen', 'Woordzoeker'],
  },
  da: {
    badge: '33 professionelle opgavegeneratorer',
    titleLine1: 'Skab ',
    titleHighlight: 'flotte',
    titleLine2: 'undervisningsmaterialer',
    subtitle: 'Professionelle opgavegeneratorer, som lærere verden over stoler på. Opret, tilpas og download på få minutter.',
    ctaPrimary: 'Se gratis eksempler',
    ctaSecondary: 'Udforsk alle generatorer',
    trustLanguages: '11 sprog',
    trustImages: 'Over 3000 billeder',
    trustLicense: 'Kommerciel licens',
    answerKey: 'Facitliste',
    previewTitles: ['Addition', 'Find ord'],
  },
  sv: {
    badge: '33 professionella övningsbladsgeneratorer',
    titleLine1: 'Skapa ',
    titleHighlight: 'professionella',
    titleLine2: 'övningsblad',
    subtitle: 'Övningsbladsgeneratorer som lärare världen över litar på. Skapa, anpassa och ladda ner på några minuter.',
    ctaPrimary: 'Se gratis exempel',
    ctaSecondary: 'Utforska alla generatorer',
    trustLanguages: '11 språk',
    trustImages: 'Över 3000 bilder',
    trustLicense: 'Kommersiell licens',
    answerKey: 'Facit',
    previewTitles: ['Addition', 'Ordsök'],
  },
};

export default function HomepageHero({ locale }: HomepageHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(mousePosition.x, springConfig);
  const springY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
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

  const scrollToSamples = () => {
    const samplesSection = document.getElementById('samples-gallery');
    if (samplesSection) {
      samplesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Preview worksheets - real samples
  const getAltText = (type: 'addition' | 'wordsearch') => {
    const altTexts = {
      addition: {
        en: 'Addition Worksheet Sample',
        de: 'Additions-Arbeitsblatt Beispiel',
        fr: 'Exemple de fiche d\'addition',
        es: 'Ejemplo de ficha de sumas',
        it: 'Esempio di scheda di addizioni',
        pt: 'Exemplo de atividade de adição',
        nl: 'Voorbeeld optelwerkblad',
        da: 'Eksempel på additionsopgave',
        sv: 'Exempel på additionsövningsblad',
      },
      wordsearch: {
        en: 'Word Search Worksheet Sample',
        de: 'Wortsuche-Arbeitsblatt Beispiel',
        fr: 'Exemple de mots mêlés',
        es: 'Ejemplo de sopa de letras',
        it: 'Esempio di cerca parole',
        pt: 'Exemplo de caça-palavras',
        nl: 'Voorbeeld woordzoeker',
        da: 'Eksempel på find ord-opgave',
        sv: 'Exempel på ordsöksövningsblad',
      },
    };
    return altTexts[type][locale as keyof typeof altTexts.addition] || altTexts[type].en;
  };

  const previewWorksheets = [
    {
      src: '/samples/english/addition/addition_worksheet portrait.jpeg',
      alt: getAltText('addition'),
      title: content.previewTitles[0],
    },
    {
      src: '/samples/english/wordsearch/wordsearch landscape.jpeg',
      alt: getAltText('wordsearch'),
      title: content.previewTitles[1],
    },
  ];

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
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
            top: '-20%',
            right: '-15%',
            x: springX,
            y: springY,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary purple orb */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
            bottom: '-10%',
            left: '-10%',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Accent pink orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 60%)',
            top: '40%',
            left: '30%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        {/* Floating diamond */}
        <motion.div
          className="absolute w-4 h-4 border border-cyan-500/20 rotate-45"
          style={{ top: '15%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            rotate: [45, 90, 45],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating circle */}
        <motion.div
          className="absolute w-3 h-3 rounded-full border border-purple-500/30"
          style={{ top: '25%', right: '15%' }}
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Floating plus */}
        <motion.div
          className="absolute text-pink-500/20 text-2xl font-light"
          style={{ bottom: '30%', left: '8%' }}
          animate={{
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          +
        </motion.div>

        {/* More floating elements */}
        <motion.div
          className="absolute w-2 h-8 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full"
          style={{ top: '40%', right: '8%' }}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

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
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-cyan-300">
                  {content.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
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
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                {content.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
                <button
                  onClick={scrollToSamples}
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
                </button>

                <Link
                  href={`/${locale}/apps`}
                  className="group px-8 py-4 rounded-xl font-semibold text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {content.ctaSecondary}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-6 justify-center lg:justify-start"
              >
                {[
                  { icon: '🌍', label: content.trustLanguages },
                  { icon: '🎨', label: content.trustImages },
                  { icon: '💼', label: content.trustLicense },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <span className="text-base">{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Preview cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
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
                  }}
                  whileHover={{ scale: 1.05, zIndex: 20 }}
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
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 20px rgba(6,182,212,0.4)',
                      }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      300 DPI
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right preview card */}
                <motion.div
                  className="absolute bottom-8 right-0 w-[300px]"
                  style={{
                    x: useTransform(springX, v => v * -0.5),
                    y: useTransform(springY, v => v * -0.5),
                    rotateY: isHovered === 'right' ? -5 : 5,
                    rotateX: isHovered === 'right' ? 5 : -5,
                  }}
                  whileHover={{ scale: 1.05, zIndex: 20 }}
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
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      className="absolute -top-3 -left-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5"
                      style={{
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 20px rgba(236,72,153,0.4)',
                      }}
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {content.answerKey}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Center decorative element */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
