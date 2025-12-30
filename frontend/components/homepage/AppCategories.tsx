'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface App {
  nameEn: string;
  nameDe: string;
  slug: string;
  icon: string;
  descriptionEn: string;
  descriptionDe: string;
}

interface Category {
  id: string;
  nameEn: string;
  nameDe: string;
  icon: string;
  gradient: string;
  borderColor: string;
  apps: App[];
}

interface AppCategoriesProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  learnMore: string;
  viewAllGenerators: string;
}> = {
  en: {
    badge: '33 Worksheet Generators',
    title: 'Browse by Category',
    subtitle: 'From math exercises to creative activities, find the perfect worksheet generator for your classroom.',
    learnMore: 'Learn more',
    viewAllGenerators: 'View All 33 Generators',
  },
  de: {
    badge: '33 Arbeitsblatt-Generatoren',
    title: 'Nach Kategorie durchsuchen',
    subtitle: 'Von Matheübungen bis zu kreativen Aktivitäten – finden Sie den perfekten Generator für Ihren Unterricht.',
    learnMore: 'Mehr erfahren',
    viewAllGenerators: 'Alle 33 Generatoren ansehen',
  },
};

// Real apps with their product page slugs and German translations
const categories: Category[] = [
  {
    id: 'math',
    nameEn: 'Math',
    nameDe: 'Mathematik',
    icon: '🔢',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
    apps: [
      { nameEn: 'Addition', nameDe: 'Addition', slug: 'addition-worksheets', icon: '➕', descriptionEn: 'Visual counting & sums', descriptionDe: 'Anschauliches Zählen & Rechnen' },
      { nameEn: 'Code Addition', nameDe: 'Rechencode', slug: 'code-addition-worksheets', icon: '🔐', descriptionEn: 'Crack the code math', descriptionDe: 'Knack den Zahlencode' },
      { nameEn: 'Math Worksheet', nameDe: 'Mathe-Arbeitsblatt', slug: 'math-worksheets', icon: '📐', descriptionEn: 'Custom math problems', descriptionDe: 'Individuelle Rechenaufgaben' },
      { nameEn: 'Chart Count', nameDe: 'Diagramm-Zählen', slug: 'chart-count-worksheets', icon: '📊', descriptionEn: 'Counting with charts', descriptionDe: 'Zählen mit Diagrammen' },
    ],
  },
  {
    id: 'language',
    nameEn: 'Language',
    nameDe: 'Sprache',
    icon: '📝',
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
    apps: [
      { nameEn: 'Word Search', nameDe: 'Wortsuche', slug: 'word-search-worksheets', icon: '🔍', descriptionEn: 'Hidden word puzzles', descriptionDe: 'Versteckte Wörter finden' },
      { nameEn: 'Crossword', nameDe: 'Kreuzworträtsel', slug: 'crossword-worksheets', icon: '⬜', descriptionEn: 'Classic word puzzles', descriptionDe: 'Klassische Worträtsel' },
      { nameEn: 'Cryptogram', nameDe: 'Kryptogramm', slug: 'cryptogram-worksheets', icon: '🔮', descriptionEn: 'Secret message codes', descriptionDe: 'Geheime Botschaften' },
      { nameEn: 'Word Scramble', nameDe: 'Buchstabensalat', slug: 'word-scramble-worksheets', icon: '🔀', descriptionEn: 'Unscramble letters', descriptionDe: 'Buchstaben entwirren' },
    ],
  },
  {
    id: 'visual',
    nameEn: 'Visual Learning',
    nameDe: 'Visuelles Lernen',
    icon: '👁️',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20',
    apps: [
      { nameEn: 'Matching', nameDe: 'Zuordnung', slug: 'matching-worksheets', icon: '🎯', descriptionEn: 'Match pairs together', descriptionDe: 'Paare zuordnen' },
      { nameEn: 'Drawing Lines', nameDe: 'Linien zeichnen', slug: 'drawing-lines-worksheets', icon: '✏️', descriptionEn: 'Trace & connect', descriptionDe: 'Nachspuren & Verbinden' },
      { nameEn: 'Find Objects', nameDe: 'Suchbilder', slug: 'find-objects-worksheets', icon: '🔎', descriptionEn: 'I Spy activities', descriptionDe: 'Objekte suchen & finden' },
      { nameEn: 'Grid Match', nameDe: 'Gitter-Zuordnung', slug: 'grid-match-worksheets', icon: '🔲', descriptionEn: 'Pattern matching', descriptionDe: 'Muster erkennen' },
      { nameEn: 'Find & Count', nameDe: 'Suchen & Zählen', slug: 'find-and-count-worksheets', icon: '🧮', descriptionEn: 'Count hidden items', descriptionDe: 'Versteckte Objekte zählen' },
    ],
  },
  {
    id: 'creative',
    nameEn: 'Creative',
    nameDe: 'Kreativ',
    icon: '🎨',
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    apps: [
      { nameEn: 'Coloring', nameDe: 'Ausmalen', slug: 'coloring-worksheets', icon: '🖍️', descriptionEn: 'Color by sections', descriptionDe: 'Nach Bereichen ausmalen' },
      { nameEn: 'Draw & Color', nameDe: 'Zeichnen & Ausmalen', slug: 'draw-and-color-worksheets', icon: '🎨', descriptionEn: 'Grid drawing', descriptionDe: 'Rasterzeichnen' },
      { nameEn: 'Alphabet Train', nameDe: 'ABC-Zug', slug: 'alphabet-train-worksheets', icon: '🚂', descriptionEn: 'ABC on trains', descriptionDe: 'Buchstaben auf Zügen' },
      { nameEn: 'Picture Bingo', nameDe: 'Bilder-Bingo', slug: 'picture-bingo-worksheets', icon: '🎰', descriptionEn: 'Visual bingo cards', descriptionDe: 'Bingokarten mit Bildern' },
    ],
  },
  {
    id: 'logic',
    nameEn: 'Logic & Puzzles',
    nameDe: 'Logik & Rätsel',
    icon: '🧩',
    gradient: 'from-rose-500/10 to-red-500/10',
    borderColor: 'border-rose-500/20',
    apps: [
      { nameEn: 'Sudoku', nameDe: 'Sudoku', slug: 'sudoku-worksheets', icon: '🔢', descriptionEn: 'Number logic grids', descriptionDe: 'Zahlenrätsel' },
      { nameEn: 'Big & Small', nameDe: 'Groß & Klein', slug: 'big-small-worksheets', icon: '📏', descriptionEn: 'Size comparison', descriptionDe: 'Größenvergleich' },
    ],
  },
];

export default function AppCategories({ locale }: AppCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('math');
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getCategoryName = (category: Category) => locale === 'de' ? category.nameDe : category.nameEn;
  const getAppName = (app: App) => locale === 'de' ? app.nameDe : app.nameEn;
  const getAppDescription = (app: App) => locale === 'de' ? app.descriptionDe : app.descriptionEn;

  const activeData = categories.find(c => c.id === activeCategory);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #f8fafc 0%,
            #ffffff 30%,
            #fefce8 70%,
            #fffbeb 100%
          )`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
            top: '20%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-100 border border-amber-200"
          >
            <span className="text-amber-600">✨</span>
            <span className="text-sm font-medium text-amber-700">{content.badge}</span>
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

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                relative px-4 sm:px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300
                ${activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'text-stone-600 hover:text-stone-800 bg-white/50 hover:bg-white border border-stone-200'
                }
              `}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{getCategoryName(category)}</span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Apps grid */}
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {activeData.apps.map((app, index) => (
                <motion.div
                  key={app.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/${locale}/apps/${app.slug}`}
                    className="block group"
                    onMouseEnter={() => setHoveredApp(app.slug)}
                    onMouseLeave={() => setHoveredApp(null)}
                  >
                    <motion.div
                      className={`
                        relative p-6 rounded-2xl bg-white border-2 transition-all duration-300
                        ${activeData.borderColor}
                        ${hoveredApp === app.slug ? 'border-opacity-100 shadow-xl' : 'border-opacity-50 shadow-md'}
                      `}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* Background gradient on hover */}
                      <div
                        className={`
                          absolute inset-0 rounded-2xl bg-gradient-to-br ${activeData.gradient}
                          transition-opacity duration-300
                          ${hoveredApp === app.slug ? 'opacity-100' : 'opacity-0'}
                        `}
                      />

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="text-4xl mb-4">{app.icon}</div>

                        {/* Name */}
                        <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-stone-900">
                          {getAppName(app)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-stone-500 mb-4">
                          {getAppDescription(app)}
                        </p>

                        {/* Link indicator */}
                        <div className="flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:text-amber-700">
                          <span>{content.learnMore}</span>
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ x: hoveredApp === app.slug ? 3 : 0 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
          >
            {content.viewAllGenerators}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
