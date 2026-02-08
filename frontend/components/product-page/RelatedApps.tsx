'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RelatedApp {
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

interface RelatedAppsProps {
  locale: string;
  sectionTitle: string;
  sectionDescription?: string;
  apps: RelatedApp[];
  ctaTitle?: string;
  ctaDescription?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badgeText?: string;
  exploreText?: string;
  trustBadges?: {
    guarantee?: string;
    securePayment: string;
    cancelAnytime: string;
  };
}

const defaultProps = {
  ctaTitle: 'Ready to Create Amazing Worksheets?',
  ctaDescription: 'Join educators creating professional worksheets. Unlimited generation, commercial license included.',
  primaryCtaText: 'Start Free Trial',
  secondaryCtaText: 'View All 33 Apps',
  badgeText: 'Works Great With',
  exploreText: 'Explore all apps',
  trustBadges: {
    guarantee: '',
    securePayment: 'Secure payment',
    cancelAnytime: 'Cancel anytime',
  },
};

// Category colors for variety
const categoryColors: Record<string, { bg: string; text: string }> = {
  'Math': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Art & Creativity': { bg: 'bg-pink-100', text: 'text-pink-700' },
  'Language Arts': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Early Learning': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Logic': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Fine Motor': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
};

export default function RelatedApps({
  locale,
  sectionTitle,
  sectionDescription,
  apps,
  ctaTitle = defaultProps.ctaTitle,
  ctaDescription = defaultProps.ctaDescription,
  primaryCtaText = defaultProps.primaryCtaText,
  primaryCtaHref,
  secondaryCtaText = defaultProps.secondaryCtaText,
  secondaryCtaHref,
  badgeText = defaultProps.badgeText,
  exploreText = defaultProps.exploreText,
  trustBadges = defaultProps.trustBadges,
}: RelatedAppsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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
    <section className="relative overflow-hidden">
      {/* Related Apps Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-sm font-medium text-amber-700 mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {badgeText}
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              {sectionTitle}
            </h2>

            {sectionDescription && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </motion.div>

          {/* Apps grid - Desktop */}
          <motion.div
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {apps.map((app) => {
              const colors = categoryColors[app.category] || { bg: 'bg-slate-100', text: 'text-slate-700' };

              return (
                <motion.div key={app.id} variants={cardVariants}>
                  <Link
                    href={`/${locale}/apps/${app.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
                      {/* Icon */}
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        {app.icon}
                      </motion.div>

                      {/* Category badge */}
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} mb-3`}>
                        {app.category}
                      </span>

                      {/* Name */}
                      <h3
                        className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                      >
                        {app.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {app.description}
                      </p>

                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center text-sm font-medium text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Explore {app.name}</span>
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Apps carousel - Mobile */}
          <div className="md:hidden relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {apps.map((app, index) => {
                const colors = categoryColors[app.category] || { bg: 'bg-slate-100', text: 'text-slate-700' };

                return (
                  <motion.div
                    key={app.id}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 w-72 snap-center"
                  >
                    <Link
                      href={`/${locale}/apps/${app.slug}`}
                      className="group block h-full"
                    >
                      <div className="h-full bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-2xl flex-shrink-0">
                            {app.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} mb-1`}>
                              {app.category}
                            </span>
                            <h3 className="font-bold text-slate-900 truncate">
                              {app.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                          {app.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {apps.map((_, index) => (
                <div
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-slate-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />

          {/* Floating shapes */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-2xl"
            animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.2, 1], y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 right-10 w-12 h-12 border border-white/20 rounded-lg rotate-45"
            animate={{ rotate: [45, 55, 45] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main CTA content */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              {ctaTitle}
            </h2>

            <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              {ctaDescription}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={primaryCtaHref || `/${locale}/auth/signup`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-xl shadow-indigo-900/30 hover:shadow-2xl hover:shadow-indigo-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {primaryCtaText}
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href={secondaryCtaHref || `/${locale}/apps`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {secondaryCtaText}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-indigo-200"
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {trustBadges.guarantee && (
                <>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {trustBadges.guarantee}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-indigo-400" />
                </>
              )}
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {trustBadges.securePayment}
              </span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {trustBadges.cancelAnytime}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
