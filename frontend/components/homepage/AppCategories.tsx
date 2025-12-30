'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface App {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  borderColor: string;
  apps: App[];
}

interface AppCategoriesProps {
  locale: string;
}

// Real apps with their product page slugs
const categories: Category[] = [
  {
    id: 'math',
    name: 'Math',
    icon: '🔢',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
    apps: [
      { name: 'Addition', slug: 'addition-worksheets', icon: '➕', description: 'Visual counting & sums' },
      { name: 'Code Addition', slug: 'code-addition-worksheets', icon: '🔐', description: 'Crack the code math' },
      { name: 'Math Worksheet', slug: 'math-worksheets', icon: '📐', description: 'Custom math problems' },
      { name: 'Chart Count', slug: 'chart-count-worksheets', icon: '📊', description: 'Counting with charts' },
    ],
  },
  {
    id: 'language',
    name: 'Language',
    icon: '📝',
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
    apps: [
      { name: 'Word Search', slug: 'word-search-worksheets', icon: '🔍', description: 'Hidden word puzzles' },
      { name: 'Crossword', slug: 'crossword-worksheets', icon: '⬜', description: 'Classic word puzzles' },
      { name: 'Cryptogram', slug: 'cryptogram-worksheets', icon: '🔮', description: 'Secret message codes' },
      { name: 'Word Scramble', slug: 'word-scramble-worksheets', icon: '🔀', description: 'Unscramble letters' },
    ],
  },
  {
    id: 'visual',
    name: 'Visual Learning',
    icon: '👁️',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20',
    apps: [
      { name: 'Matching', slug: 'matching-worksheets', icon: '🎯', description: 'Match pairs together' },
      { name: 'Drawing Lines', slug: 'drawing-lines-worksheets', icon: '✏️', description: 'Trace & connect' },
      { name: 'Find Objects', slug: 'find-objects-worksheets', icon: '🔎', description: 'I Spy activities' },
      { name: 'Grid Match', slug: 'grid-match-worksheets', icon: '🔲', description: 'Pattern matching' },
      { name: 'Find & Count', slug: 'find-and-count-worksheets', icon: '🧮', description: 'Count hidden items' },
    ],
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '🎨',
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    apps: [
      { name: 'Coloring', slug: 'coloring-worksheets', icon: '🖍️', description: 'Color by sections' },
      { name: 'Draw & Color', slug: 'draw-and-color-worksheets', icon: '🎨', description: 'Grid drawing' },
      { name: 'Alphabet Train', slug: 'alphabet-train-worksheets', icon: '🚂', description: 'ABC on trains' },
      { name: 'Picture Bingo', slug: 'picture-bingo-worksheets', icon: '🎰', description: 'Visual bingo cards' },
    ],
  },
  {
    id: 'logic',
    name: 'Logic & Puzzles',
    icon: '🧩',
    gradient: 'from-rose-500/10 to-red-500/10',
    borderColor: 'border-rose-500/20',
    apps: [
      { name: 'Sudoku', slug: 'sudoku-worksheets', icon: '🔢', description: 'Number logic grids' },
      { name: 'Big & Small', slug: 'big-small-worksheets', icon: '📏', description: 'Size comparison' },
    ],
  },
];

export default function AppCategories({ locale }: AppCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('math');
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

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
            <span className="text-sm font-medium text-amber-700">33 Worksheet Generators</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Browse by Category
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            From math exercises to creative activities, find the perfect worksheet generator for your classroom.
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
                <span>{category.name}</span>
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
                          {app.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-stone-500 mb-4">
                          {app.description}
                        </p>

                        {/* Link indicator */}
                        <div className="flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:text-amber-700">
                          <span>Learn more</span>
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
            View All 33 Generators
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
