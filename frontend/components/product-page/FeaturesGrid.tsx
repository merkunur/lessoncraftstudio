'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

interface FeaturesGridProps {
  locale: string;
  sectionTitle: string;
  sectionDescription?: string;
  features: Feature[];
  highlightBadgeText?: string;
  readMoreLabel?: string;
  showLessLabel?: string;
}

const defaultProps = {
  highlightBadgeText: 'Key Feature',
  readMoreLabel: 'Read more',
  showLessLabel: 'Show less',
};

// Collapsible feature card
function FeatureCard({
  feature,
  index,
  highlightBadgeText,
  readMoreLabel,
  showLessLabel,
}: {
  feature: Feature;
  index: number;
  highlightBadgeText: string;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split description into sentences - show only 3 sentences by default (collapsed)
  const sentences = feature.description.split(/(?<=[.!?])\s+/);
  const maxSentences = 3;
  const shouldTruncate = sentences.length > maxSentences;
  const displayText = isExpanded ? feature.description : sentences.slice(0, maxSentences).join(' ');

  // Icon accent colors - premium palette
  const accentColors = [
    'from-amber-500 to-amber-600',
    'from-stone-600 to-stone-700',
    'from-rose-500 to-rose-600',
    'from-emerald-600 to-emerald-700',
    'from-amber-600 to-orange-600',
    'from-slate-600 to-slate-700',
    'from-teal-500 to-teal-600',
  ];

  return (
    <motion.div
      className={`group relative ${
        feature.highlighted ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className={`relative h-full p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
          feature.highlighted
            ? 'bg-gradient-to-br from-amber-50/80 via-white to-stone-50 shadow-xl shadow-amber-100/30 border-2 border-amber-200/50 hover:shadow-2xl'
            : 'bg-white shadow-lg shadow-stone-100/60 border border-stone-200/60 hover:shadow-xl hover:border-stone-300/60'
        } hover:-translate-y-1`}
      >
        {/* Highlight badge */}
        {feature.highlighted && (
          <div className="absolute -top-3 left-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-semibold shadow-lg shadow-amber-200/50">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {highlightBadgeText}
            </span>
          </div>
        )}

        {/* Accent line for highlighted */}
        {feature.highlighted && (
          <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full" />
        )}

        {/* Icon */}
        <div className="mb-5">
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${
              accentColors[index % accentColors.length]
            } text-white text-2xl shadow-lg ${
              feature.highlighted ? 'shadow-amber-200/50' : 'shadow-stone-200/50'
            }`}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {feature.icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold mb-3 ${
            feature.highlighted ? 'text-amber-900' : 'text-stone-800'
          }`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {feature.title}
        </h3>

        {/* Collapsible Description */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              className="mt-3 inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors"
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

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 to-stone-500/0 group-hover:from-amber-500/[0.02] group-hover:to-stone-500/[0.02] transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function FeaturesGrid({
  locale,
  sectionTitle,
  sectionDescription,
  features,
  highlightBadgeText = defaultProps.highlightBadgeText,
  readMoreLabel = defaultProps.readMoreLabel,
  showLessLabel = defaultProps.showLessLabel,
}: FeaturesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-gradient-to-b from-white via-stone-50/30 to-white relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #78716c 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/60 border border-amber-200/60 text-sm font-medium text-amber-800 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Features
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

        {/* Features grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              highlightBadgeText={highlightBadgeText}
              readMoreLabel={readMoreLabel}
              showLessLabel={showLessLabel}
            />
          ))}
        </div>

        {/* Bottom trust element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/80 border border-stone-200/60 shadow-sm">
            <span className="flex items-center gap-2 text-sm text-stone-600">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              All features included
            </span>
            <span className="w-px h-4 bg-stone-200" />
            <span className="flex items-center gap-2 text-sm text-stone-600">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No hidden fees
            </span>
            <span className="w-px h-4 bg-stone-200" />
            <span className="flex items-center gap-2 text-sm text-stone-600">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
