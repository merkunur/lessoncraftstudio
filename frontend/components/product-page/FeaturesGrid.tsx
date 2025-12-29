'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
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
}

const defaultProps = {
  highlightBadgeText: 'Key Feature',
};

// Icon backgrounds for variety
const iconBackgrounds = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-purple-600',
];

export default function FeaturesGrid({
  locale,
  sectionTitle,
  sectionDescription,
  features,
  highlightBadgeText = defaultProps.highlightBadgeText,
}: FeaturesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative blurred shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Features
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {sectionTitle}
          </h2>

          {sectionDescription && (
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          )}
        </motion.div>

        {/* Features grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className={`group relative ${
                feature.highlighted
                  ? 'md:col-span-2 lg:col-span-1'
                  : ''
              }`}
            >
              {/* Card */}
              <div
                className={`relative h-full p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                  feature.highlighted
                    ? 'bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-xl shadow-indigo-100/50 border-2 border-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-200/50'
                    : 'bg-white shadow-lg shadow-slate-100/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200'
                } hover:-translate-y-1`}
              >
                {/* Highlight badge */}
                {feature.highlighted && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-indigo-300/50">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {highlightBadgeText}
                    </span>
                  </div>
                )}

                {/* Decorative gradient line for highlighted cards */}
                {feature.highlighted && (
                  <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
                )}

                {/* Icon */}
                <div className="mb-5">
                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${
                      iconBackgrounds[index % iconBackgrounds.length]
                    } text-white text-2xl shadow-lg ${
                      feature.highlighted ? 'shadow-indigo-300/50' : 'shadow-slate-200/50'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-3 ${
                    feature.highlighted ? 'text-indigo-900' : 'text-slate-900'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover arrow indicator */}
                <div className="mt-5 flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/[0.02] group-hover:to-purple-500/[0.02] transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-slate-50 border border-slate-200">
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              All features included
            </span>
            <span className="w-px h-4 bg-slate-300" />
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No hidden fees
            </span>
            <span className="w-px h-4 bg-slate-300" />
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
