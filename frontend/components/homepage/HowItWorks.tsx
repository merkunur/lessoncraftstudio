'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Step {
  number: number;
  icon: string;
  titleEn: string;
  titleDe: string;
  titleFr: string;
  descriptionEn: string;
  descriptionDe: string;
  descriptionFr: string;
}

interface HowItWorksProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  ctaButton: string;
}> = {
  en: {
    badge: 'Quick Start',
    title: 'How It Works',
    subtitle: 'Create professional worksheets in 4 simple steps. No design skills required.',
    ctaButton: 'Start Creating Now',
  },
  de: {
    badge: 'Schnellstart',
    title: 'So funktioniert es',
    subtitle: 'Erstellen Sie professionelle Arbeitsblätter in 4 einfachen Schritten. Keine Designkenntnisse erforderlich.',
    ctaButton: 'Jetzt starten',
  },
  fr: {
    badge: 'Démarrage rapide',
    title: 'Comment ça marche',
    subtitle: 'Créez des fiches professionnelles en 4 étapes simples. Aucune compétence en design requise.',
    ctaButton: 'Commencer maintenant',
  },
};

const steps: Step[] = [
  {
    number: 1,
    icon: '🎯',
    titleEn: 'Choose a Generator',
    titleDe: 'Generator auswählen',
    titleFr: 'Choisissez un générateur',
    descriptionEn: 'Select from 33 professional worksheet generators. Math, language, puzzles, and creative activities for all ages.',
    descriptionDe: 'Wählen Sie aus 33 professionellen Arbeitsblatt-Generatoren. Mathematik, Sprache, Rätsel und kreative Aktivitäten für alle Altersgruppen.',
    descriptionFr: 'Sélectionnez parmi 33 générateurs professionnels. Maths, langue, énigmes et activités créatives pour tous les âges.',
  },
  {
    number: 2,
    icon: '🖼️',
    titleEn: 'Select Your Theme',
    titleDe: 'Thema wählen',
    titleFr: 'Sélectionnez votre thème',
    descriptionEn: 'Browse 3000+ child-friendly images organized by category. Animals, food, vehicles, seasons, and more.',
    descriptionDe: 'Durchsuchen Sie über 3000 kindgerechte Bilder nach Kategorien. Tiere, Essen, Fahrzeuge, Jahreszeiten und mehr.',
    descriptionFr: 'Parcourez plus de 3000 images adaptées aux enfants par catégorie. Animaux, nourriture, véhicules, saisons et plus encore.',
  },
  {
    number: 3,
    icon: '✨',
    titleEn: 'Customize',
    titleDe: 'Anpassen',
    titleFr: 'Personnalisez',
    descriptionEn: 'Edit every element on the canvas. Add text, upload images, adjust difficulty. Make it perfect for your students.',
    descriptionDe: 'Bearbeiten Sie jedes Element auf der Arbeitsfläche. Text hinzufügen, Bilder hochladen, Schwierigkeit anpassen. Perfekt für Ihre Schüler.',
    descriptionFr: 'Modifiez chaque élément sur le canevas. Ajoutez du texte, importez des images, ajustez la difficulté. Parfait pour vos élèves.',
  },
  {
    number: 4,
    icon: '📥',
    titleEn: 'Download & Print',
    titleDe: 'Herunterladen & Drucken',
    titleFr: 'Téléchargez et imprimez',
    descriptionEn: 'Export as high-quality PDF at 300 DPI. Answer keys included. Print or sell commercially.',
    descriptionDe: 'Exportieren Sie als hochwertiges PDF mit 300 DPI. Lösungsblätter inklusive. Drucken oder kommerziell verkaufen.',
    descriptionFr: 'Exportez en PDF haute qualité à 300 DPI. Corrigés inclus. Imprimez ou vendez à des fins commerciales.',
  },
];

export default function HowItWorks({ locale }: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getStepTitle = (step: Step) => {
    if (locale === 'fr') return step.titleFr;
    if (locale === 'de') return step.titleDe;
    return step.titleEn;
  };
  const getStepDescription = (step: Step) => {
    if (locale === 'fr') return step.descriptionFr;
    if (locale === 'de') return step.descriptionDe;
    return step.descriptionEn;
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #fef3c7 0%,
            #fffbeb 30%,
            #f8fafc 70%,
            #f1f5f9 100%
          )`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-stone-100 border border-stone-200"
          >
            <span className="text-stone-600">🚀</span>
            <span className="text-sm font-medium text-stone-700">{content.badge}</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-stone-200" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`
                  relative flex items-start gap-6 md:gap-12
                  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                  md:py-8
                `}
              >
                {/* Step number circle - mobile */}
                <div className="relative z-10 flex-shrink-0 md:hidden">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  className={`
                    flex-1 md:w-5/12
                    ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300">
                    <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="text-3xl flex-shrink-0">{step.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-stone-800 mb-2">
                          {getStepTitle(step)}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {getStepDescription(step)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Center number - desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Empty space for alignment - desktop */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href={`/${locale}/auth/signup`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
          >
            {content.ctaButton}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
