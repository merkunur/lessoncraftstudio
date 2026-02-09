'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UseCase {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  accentColor?: string;
}

interface UseCasesProps {
  locale: string;
  sectionTitle: string;
  sectionDescription?: string;
  useCases: UseCase[];
  badgeText?: string;
  readMoreLabel?: string;
  showLessLabel?: string;
}

// Default accent colors for variety - premium palette
const defaultAccentColors = [
  { bg: 'from-rose-500 to-rose-600', light: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600' },
  { bg: 'from-amber-500 to-amber-600', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
  { bg: 'from-emerald-600 to-emerald-700', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' },
  { bg: 'from-stone-600 to-stone-700', light: 'bg-stone-100', border: 'border-stone-200', text: 'text-stone-600' },
  { bg: 'from-teal-500 to-teal-600', light: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600' },
  { bg: 'from-amber-600 to-orange-600', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' },
];

// Collapsible use case card
function UseCaseCard({
  useCase,
  index,
  colors,
  readMoreLabel,
  showLessLabel,
}: {
  useCase: UseCase;
  index: number;
  colors: typeof defaultAccentColors[0];
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  // Split description into sentences - show only 3 sentences by default (collapsed)
  const sentences = useCase.description.split(/(?<=[.!?])\s+/);
  const maxSentences = 3;
  const shouldTruncate = sentences.length > maxSentences;
  const displayText = isExpanded ? useCase.description : sentences.slice(0, maxSentences).join(' ');

  return (
    <motion.div
      initial={hasMounted ? { opacity: 0, y: 20, scale: 0.95 } : false}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative h-full bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-stone-100/60 border border-stone-200/60 hover:shadow-xl hover:border-stone-300/60 transition-all duration-300 hover:-translate-y-1">
        {/* Accent top bar */}
        <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${colors.bg} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />

        {/* Icon/Avatar area */}
        <div className="flex items-start gap-4 mb-5">
          <motion.div
            className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white text-2xl shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {useCase.icon}
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-bold text-stone-800 mb-1 group-hover:text-amber-700 transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {useCase.title}
            </h3>
            <p className={`text-sm font-medium ${colors.text}`}>
              {useCase.subtitle}
            </p>
          </div>
        </div>

        {/* Collapsible Description */}
        <div className="mb-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={hasMounted ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={hasMounted ? { opacity: 0 } : undefined}
              transition={{ duration: 0.15 }}
              className="text-stone-600 leading-relaxed"
            >
              {displayText}
              {!isExpanded && shouldTruncate && '...'}
            </motion.p>
          </AnimatePresence>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors"
            >
              {isExpanded ? showLessLabel : readMoreLabel}
              <motion.svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          )}
        </div>

        {/* Quote (if provided) */}
        {useCase.quote && (
          <div className={`relative ${colors.light} rounded-xl p-4 border ${colors.border}`}>
            {/* Quote mark */}
            <svg
              className={`absolute -top-2 -left-2 w-8 h-8 ${colors.text} opacity-30`}
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
            </svg>

            <p className="text-sm text-stone-700 italic relative z-10">
              &ldquo;{useCase.quote}&rdquo;
            </p>
          </div>
        )}

        {/* Decorative corner element */}
        <div className={`absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br ${colors.bg} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity`} />
      </div>
    </motion.div>
  );
}

export default function UseCases({
  locale,
  sectionTitle,
  sectionDescription,
  useCases,
  badgeText = 'Who It\'s For',
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
}: UseCasesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-100/30 to-amber-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-stone-100/20 rounded-full blur-3xl" />
      </div>

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2378716c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={hasMounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={hasMounted ? { opacity: 0, scale: 0.95 } : false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-sm font-medium text-rose-700 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {badgeText}
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {sectionTitle}
          </h2>

          {sectionDescription && (
            <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          )}
        </motion.div>

        {/* Persona cards grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {useCases.map((useCase, index) => {
            const colors = defaultAccentColors[index % defaultAccentColors.length];

            return (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                index={index}
                colors={colors}
                readMoreLabel={readMoreLabel}
                showLessLabel={showLessLabel}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
