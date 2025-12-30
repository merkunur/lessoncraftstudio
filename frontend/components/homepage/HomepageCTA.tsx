'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
    badge: 'Join Thousands of Educators',
    titleStart: 'Ready to Create ',
    titleHighlight: 'Professional Worksheets',
    subtitle: 'Start with our free tier. Try Word Search, Crossword, and Math Worksheets. Upgrade anytime for full access to all 33 generators.',
    ctaPrimary: 'Start Free Trial',
    ctaSecondary: 'View All 33 Generators',
    trustNoCard: 'No credit card required',
    trustFreeGenerators: '3 free generators',
    trustCancelAnytime: 'Cancel anytime',
  },
  de: {
    badge: 'Tausende Lehrkräfte vertrauen uns',
    titleStart: 'Bereit, ',
    titleHighlight: 'professionelle Arbeitsblätter',
    subtitle: 'Starten Sie kostenlos. Testen Sie Wortsuche, Kreuzworträtsel und Mathe-Arbeitsblätter. Jederzeit auf alle 33 Generatoren erweitern.',
    ctaPrimary: 'Kostenlos starten',
    ctaSecondary: 'Alle 33 Generatoren entdecken',
    trustNoCard: 'Keine Kreditkarte erforderlich',
    trustFreeGenerators: '3 kostenlose Generatoren',
    trustCancelAnytime: 'Jederzeit kündbar',
  },
  fr: {
    badge: 'Rejoignez des milliers d\'enseignants',
    titleStart: 'Prêt à créer des ',
    titleHighlight: 'fiches professionnelles',
    subtitle: 'Commencez gratuitement. Testez les mots mêlés, mots croisés et fiches de maths. Passez à l\'accès complet aux 33 générateurs quand vous voulez.',
    ctaPrimary: 'Commencer gratuitement',
    ctaSecondary: 'Explorer les 33 générateurs',
    trustNoCard: 'Aucune carte bancaire requise',
    trustFreeGenerators: '3 générateurs gratuits',
    trustCancelAnytime: 'Résiliable à tout moment',
  },
  es: {
    badge: 'Únete a miles de maestros',
    titleStart: '¿Listo para crear ',
    titleHighlight: 'fichas profesionales',
    subtitle: 'Empieza gratis. Prueba Sopa de Letras, Crucigramas y Fichas de Matemáticas. Pasa a los 33 generadores cuando quieras.',
    ctaPrimary: 'Comenzar gratis',
    ctaSecondary: 'Explorar los 33 generadores',
    trustNoCard: 'Sin tarjeta de crédito',
    trustFreeGenerators: '3 generadores gratis',
    trustCancelAnytime: 'Cancela cuando quieras',
  },
  it: {
    badge: 'Unisciti a migliaia di insegnanti',
    titleStart: 'Pronto a creare ',
    titleHighlight: 'schede professionali',
    subtitle: 'Inizia gratis. Prova Cerca parole, Cruciverba e Schede di matematica. Passa a tutti i 33 generatori quando vuoi.',
    ctaPrimary: 'Inizia gratis',
    ctaSecondary: 'Esplora tutti i 33 generatori',
    trustNoCard: 'Nessuna carta di credito richiesta',
    trustFreeGenerators: '3 generatori gratuiti',
    trustCancelAnytime: 'Annulla quando vuoi',
  },
  pt: {
    badge: 'Junte-se a milhares de educadores',
    titleStart: 'Pronto para criar ',
    titleHighlight: 'atividades profissionais',
    subtitle: 'Comece de graça. Experimente Caça-palavras, Palavras cruzadas e Atividades de matemática. Tenha acesso a todos os 33 geradores quando quiser.',
    ctaPrimary: 'Começar gratuitamente',
    ctaSecondary: 'Explorar todos os 33 geradores',
    trustNoCard: 'Sem cartão de crédito',
    trustFreeGenerators: '3 geradores grátis',
    trustCancelAnytime: 'Cancele quando quiser',
  },
};

export default function HomepageCTA({ locale }: HomepageCTAProps) {
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
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
            bottom: '-15%',
            left: '-5%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
            top: '30%',
            left: '40%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
              border: '1px solid rgba(6,182,212,0.2)',
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-cyan-300">
              {content.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
            {locale === 'de' ? ' zu erstellen?' : locale === 'es' || locale === 'it' || locale === 'pt' ? '?' : ' ?'}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto"
          >
            {content.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/${locale}/auth/signup`}
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
          </motion.div>

          {/* Trust elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/40"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
