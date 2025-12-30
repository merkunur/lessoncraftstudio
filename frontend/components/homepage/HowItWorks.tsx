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
  titleEs: string;
  titleIt: string;
  titlePt: string;
  titleNl: string;
  titleDa: string;
  titleSv: string;
  titleNo: string;
  descriptionEn: string;
  descriptionDe: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt: string;
  descriptionPt: string;
  descriptionNl: string;
  descriptionDa: string;
  descriptionSv: string;
  descriptionNo: string;
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
  es: {
    badge: 'Inicio rápido',
    title: 'Cómo funciona',
    subtitle: 'Crea fichas profesionales en 4 pasos sencillos. No necesitas saber diseñar.',
    ctaButton: 'Empieza a crear ahora',
  },
  it: {
    badge: 'Guida rapida',
    title: 'Come funziona',
    subtitle: 'Crea schede professionali in 4 semplici passaggi. Nessuna competenza grafica richiesta.',
    ctaButton: 'Inizia a creare ora',
  },
  pt: {
    badge: 'Início rápido',
    title: 'Como funciona',
    subtitle: 'Crie atividades profissionais em 4 passos simples. Não precisa saber design.',
    ctaButton: 'Comece a criar agora',
  },
  nl: {
    badge: 'Snel aan de slag',
    title: 'Zo werkt het',
    subtitle: 'Maak professionele werkbladen in 4 simpele stappen. Geen ontwerpvaardigheden nodig.',
    ctaButton: 'Begin nu met maken',
  },
  da: {
    badge: 'Hurtig start',
    title: 'Sådan virker det',
    subtitle: 'Lav professionelle opgaveark i 4 enkle trin. Ingen designfærdigheder påkrævet.',
    ctaButton: 'Begynd at lave nu',
  },
  sv: {
    badge: 'Snabbstart',
    title: 'Så här fungerar det',
    subtitle: 'Skapa professionella övningsblad i 4 enkla steg. Inga designkunskaper krävs.',
    ctaButton: 'Börja skapa nu',
  },
  no: {
    badge: 'Hurtigstart',
    title: 'Slik fungerer det',
    subtitle: 'Lag profesjonelle oppgaveark i 4 enkle trinn. Ingen designkunnskaper nødvendig.',
    ctaButton: 'Begynn å lage nå',
  },
};

const steps: Step[] = [
  {
    number: 1,
    icon: '🎯',
    titleEn: 'Choose a Generator',
    titleDe: 'Generator auswählen',
    titleFr: 'Choisissez un générateur',
    titleEs: 'Elige un generador',
    titleIt: 'Scegli un generatore',
    titlePt: 'Escolha um gerador',
    titleNl: 'Kies een generator',
    titleDa: 'Vælg en generator',
    titleSv: 'Välj en generator',
    titleNo: 'Velg en generator',
    descriptionEn: 'Select from 33 professional worksheet generators. Math, language, puzzles, and creative activities for all ages.',
    descriptionDe: 'Wählen Sie aus 33 professionellen Arbeitsblatt-Generatoren. Mathematik, Sprache, Rätsel und kreative Aktivitäten für alle Altersgruppen.',
    descriptionFr: 'Sélectionnez parmi 33 générateurs professionnels. Maths, langue, énigmes et activités créatives pour tous les âges.',
    descriptionEs: 'Elige entre 33 generadores profesionales. Matemáticas, lenguaje, rompecabezas y actividades creativas para todas las edades.',
    descriptionIt: 'Scegli tra 33 generatori professionali. Matematica, linguaggio, rompicapo e attività creative per tutte le età.',
    descriptionPt: 'Escolha entre 33 geradores profissionais. Matemática, linguagem, jogos de lógica e atividades criativas para todas as idades.',
    descriptionNl: 'Kies uit 33 professionele werkbladgeneratoren. Rekenen, taal, puzzels en creatieve activiteiten voor alle leeftijden.',
    descriptionDa: 'Vælg mellem 33 professionelle opgavegeneratorer. Matematik, sprog, puslespil og kreative aktiviteter til alle aldre.',
    descriptionSv: 'Välj bland 33 professionella övningsbladsgeneratorer. Matte, språk, pyssel och kreativa aktiviteter för alla åldrar.',
    descriptionNo: 'Velg blant 33 profesjonelle oppgavegeneratorer. Matte, språk, hjernetrim og kreative aktiviteter for alle aldre.',
  },
  {
    number: 2,
    icon: '🖼️',
    titleEn: 'Select Your Theme',
    titleDe: 'Thema wählen',
    titleFr: 'Sélectionnez votre thème',
    titleEs: 'Selecciona tu tema',
    titleIt: 'Scegli il tuo tema',
    titlePt: 'Escolha seu tema',
    titleNl: 'Kies je thema',
    titleDa: 'Vælg dit tema',
    titleSv: 'Välj ditt tema',
    titleNo: 'Velg ditt tema',
    descriptionEn: 'Browse 3000+ child-friendly images organized by category. Animals, food, vehicles, seasons, and more.',
    descriptionDe: 'Durchsuchen Sie über 3000 kindgerechte Bilder nach Kategorien. Tiere, Essen, Fahrzeuge, Jahreszeiten und mehr.',
    descriptionFr: 'Parcourez plus de 3000 images adaptées aux enfants par catégorie. Animaux, nourriture, véhicules, saisons et plus encore.',
    descriptionEs: 'Explora más de 3000 imágenes para niños organizadas por categoría. Animales, comida, vehículos, estaciones y más.',
    descriptionIt: 'Esplora oltre 3000 immagini per bambini organizzate per categoria. Animali, cibo, veicoli, stagioni e molto altro.',
    descriptionPt: 'Explore mais de 3000 imagens infantis organizadas por categoria. Animais, comida, veículos, estações do ano e muito mais.',
    descriptionNl: 'Blader door meer dan 3000 kindvriendelijke afbeeldingen ingedeeld per categorie. Dieren, eten, voertuigen, seizoenen en meer.',
    descriptionDa: 'Gennemse over 3000 børnevenlige billeder organiseret efter kategori. Dyr, mad, køretøjer, årstider og meget mere.',
    descriptionSv: 'Bläddra bland över 3000 barnvänliga bilder sorterade efter kategori. Djur, mat, fordon, årstider och mer.',
    descriptionNo: 'Bla gjennom over 3000 barnevennlige bilder sortert etter kategori. Dyr, mat, kjøretøy, årstider og mer.',
  },
  {
    number: 3,
    icon: '✨',
    titleEn: 'Customize',
    titleDe: 'Anpassen',
    titleFr: 'Personnalisez',
    titleEs: 'Personaliza',
    titleIt: 'Personalizza',
    titlePt: 'Personalize',
    titleNl: 'Pas aan',
    titleDa: 'Tilpas',
    titleSv: 'Anpassa',
    titleNo: 'Tilpass',
    descriptionEn: 'Edit every element on the canvas. Add text, upload images, adjust difficulty. Make it perfect for your students.',
    descriptionDe: 'Bearbeiten Sie jedes Element auf der Arbeitsfläche. Text hinzufügen, Bilder hochladen, Schwierigkeit anpassen. Perfekt für Ihre Schüler.',
    descriptionFr: 'Modifiez chaque élément sur le canevas. Ajoutez du texte, importez des images, ajustez la difficulté. Parfait pour vos élèves.',
    descriptionEs: 'Edita cada elemento en el lienzo. Agrega texto, sube imágenes, ajusta la dificultad. Hazlo perfecto para tus alumnos.',
    descriptionIt: 'Modifica ogni elemento sulla tela. Aggiungi testo, carica immagini, regola la difficoltà. Rendilo perfetto per i tuoi studenti.',
    descriptionPt: 'Edite cada elemento na tela. Adicione texto, envie imagens, ajuste a dificuldade. Deixe perfeito para seus alunos.',
    descriptionNl: 'Bewerk elk element op het canvas. Voeg tekst toe, upload afbeeldingen, pas de moeilijkheidsgraad aan. Maak het perfect voor jouw leerlingen.',
    descriptionDa: 'Rediger hvert element på lærredet. Tilføj tekst, upload billeder, juster sværhedsgrad. Gør det perfekt til dine elever.',
    descriptionSv: 'Redigera varje element på arbetsytan. Lägg till text, ladda upp bilder, justera svårighetsgrad. Gör det perfekt för dina elever.',
    descriptionNo: 'Rediger hvert element på lerretet. Legg til tekst, last opp bilder, juster vanskelighetsgrad. Gjør det perfekt for elevene dine.',
  },
  {
    number: 4,
    icon: '📥',
    titleEn: 'Download & Print',
    titleDe: 'Herunterladen & Drucken',
    titleFr: 'Téléchargez et imprimez',
    titleEs: 'Descarga e imprime',
    titleIt: 'Scarica e stampa',
    titlePt: 'Baixe e imprima',
    titleNl: 'Download en print',
    titleDa: 'Download og print',
    titleSv: 'Ladda ner och skriv ut',
    titleNo: 'Last ned og skriv ut',
    descriptionEn: 'Export as high-quality PDF at 300 DPI. Answer keys included. Print or sell commercially.',
    descriptionDe: 'Exportieren Sie als hochwertiges PDF mit 300 DPI. Lösungsblätter inklusive. Drucken oder kommerziell verkaufen.',
    descriptionFr: 'Exportez en PDF haute qualité à 300 DPI. Corrigés inclus. Imprimez ou vendez à des fins commerciales.',
    descriptionEs: 'Exporta como PDF de alta calidad a 300 DPI. Incluye respuestas. Imprime o vende comercialmente.',
    descriptionIt: 'Esporta come PDF di alta qualità a 300 DPI. Soluzioni incluse. Stampa o vendi commercialmente.',
    descriptionPt: 'Exporte como PDF de alta qualidade a 300 DPI. Gabarito incluso. Imprima ou venda comercialmente.',
    descriptionNl: 'Exporteer als hoogwaardige PDF met 300 DPI. Antwoordbladen inbegrepen. Print of verkoop commercieel.',
    descriptionDa: 'Eksporter som højkvalitets-PDF i 300 DPI. Facitlister inkluderet. Print eller sælg kommercielt.',
    descriptionSv: 'Exportera som högkvalitets-PDF i 300 DPI. Facit inkluderat. Skriv ut eller sälj kommersiellt.',
    descriptionNo: 'Eksporter som høykvalitets-PDF i 300 DPI. Fasit inkludert. Skriv ut eller selg kommersielt.',
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
    if (locale === 'no') return step.titleNo;
    if (locale === 'sv') return step.titleSv;
    if (locale === 'da') return step.titleDa;
    if (locale === 'nl') return step.titleNl;
    if (locale === 'pt') return step.titlePt;
    if (locale === 'it') return step.titleIt;
    if (locale === 'es') return step.titleEs;
    if (locale === 'fr') return step.titleFr;
    if (locale === 'de') return step.titleDe;
    return step.titleEn;
  };
  const getStepDescription = (step: Step) => {
    if (locale === 'no') return step.descriptionNo;
    if (locale === 'sv') return step.descriptionSv;
    if (locale === 'da') return step.descriptionDa;
    if (locale === 'nl') return step.descriptionNl;
    if (locale === 'pt') return step.descriptionPt;
    if (locale === 'it') return step.descriptionIt;
    if (locale === 'es') return step.descriptionEs;
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
