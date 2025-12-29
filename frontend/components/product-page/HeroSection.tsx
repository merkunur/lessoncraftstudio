'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  locale: string;
  title: string;
  subtitle: string;
  description: string;
  previewImageSrc: string;
  ctaLabels?: {
    tryFree: string;
    viewSamples: string;
  };
  trustBadges?: {
    languages: string;
    images: string;
    license: string;
  };
}

const defaultCtaLabels = {
  tryFree: 'Try Free',
  viewSamples: 'View Samples',
};

const defaultTrustBadges = {
  languages: '11 Languages',
  images: '3000+ Images',
  license: 'Commercial License',
};

export default function HeroSection({
  locale,
  title,
  subtitle,
  description,
  previewImageSrc,
  ctaLabels = defaultCtaLabels,
  trustBadges = defaultTrustBadges,
}: HeroSectionProps) {
  const scrollToSamples = () => {
    const samplesSection = document.getElementById('samples-gallery');
    if (samplesSection) {
      samplesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 15, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #6366f1 1px, transparent 1px),
            linear-gradient(to bottom, #6366f1 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            {/* Subtitle badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 text-sm font-medium text-indigo-700 shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
                {subtitle}
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              <span className="block">{title.split(' ').slice(0, 2).join(' ')}</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title.split(' ').slice(2).join(' ')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href={`/${locale}/auth/signup`}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
                <span className="relative flex items-center gap-2">
                  {ctaLabels.tryFree}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <button
                onClick={scrollToSamples}
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl transition-all duration-300 hover:border-indigo-300 hover:bg-white hover:shadow-lg hover:shadow-indigo-100/50 active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {ctaLabels.viewSamples}
                </span>
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { icon: '🌍', label: trustBadges.languages },
                { icon: '🎨', label: trustBadges.images },
                { icon: '✓', label: trustBadges.license },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/80 text-sm font-medium text-slate-700 shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="text-base">{badge.icon}</span>
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Preview image */}
          <motion.div
            className="relative lg:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative elements behind the image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-indigo-200/40 via-blue-100/30 to-purple-200/40 blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Floating worksheet cards */}
            <motion.div
              className="absolute -left-4 top-1/4 w-16 h-20 lg:w-20 lg:h-24 rounded-xl bg-white shadow-xl shadow-indigo-200/50 border border-slate-100 overflow-hidden"
              animate={{
                y: [0, -10, 0],
                rotate: [-5, -8, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <span className="text-2xl lg:text-3xl">➕</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-2 lg:right-0 top-1/3 w-14 h-18 lg:w-18 lg:h-22 rounded-xl bg-white shadow-xl shadow-purple-200/50 border border-slate-100 overflow-hidden"
              animate={{
                y: [0, 8, 0],
                rotate: [8, 12, 8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                <span className="text-xl lg:text-2xl">🧮</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-8 lg:left-12 bottom-1/4 w-12 h-16 lg:w-16 lg:h-20 rounded-xl bg-white shadow-xl shadow-blue-200/50 border border-slate-100 overflow-hidden"
              animate={{
                y: [0, -8, 0],
                rotate: [3, 6, 3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center">
                <span className="text-lg lg:text-xl">📝</span>
              </div>
            </motion.div>

            {/* Main preview image */}
            <motion.div
              className="relative z-10 w-full max-w-md lg:max-w-lg"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/60 border-4 border-white/80 bg-white">
                {/* Browser-like header */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-white rounded-md border border-slate-200 flex items-center px-3">
                      <span className="text-xs text-slate-400 truncate">lessoncraftstudio.com</span>
                    </div>
                  </div>
                </div>

                {/* Image container */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-indigo-50 to-white">
                  {previewImageSrc ? (
                    <Image
                      src={previewImageSrc}
                      alt={`${title} preview`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    /* Placeholder when no image */
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="aspect-square rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                          >
                            <div className="flex items-center gap-1 text-lg">
                              <span className="text-indigo-500">🍎</span>
                              <span className="text-slate-400">+</span>
                              <span className="text-indigo-500">🍎</span>
                              <span className="text-slate-400">=</span>
                              <span className="font-bold text-indigo-600">{i + 1}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-slate-500 font-medium">Addition Worksheet Preview</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating stats badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white rounded-2xl shadow-xl shadow-indigo-200/50 border border-slate-100 px-5 py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">3 min</p>
                    <p className="text-sm text-slate-500">Create & Download</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
