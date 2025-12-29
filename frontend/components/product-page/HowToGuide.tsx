'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
}

interface HowToGuideProps {
  locale: string;
  sectionTitle: string;
  sectionDescription?: string;
  steps: Step[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultIcons = ['🖼️', '⚙️', '✨', '✏️', '📥'];

export default function HowToGuide({
  locale,
  sectionTitle,
  sectionDescription,
  steps,
  ctaText = 'Start Creating Now',
  ctaHref,
}: HowToGuideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-sm font-medium text-emerald-700 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            How It Works
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {sectionTitle}
          </h2>

          {sectionDescription && (
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">
              {sectionDescription}
            </p>
          )}
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Central timeline line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-200 via-stone-200 to-stone-200" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-500 via-amber-600 to-emerald-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile timeline line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-200 via-stone-200 to-stone-200" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-500 via-amber-600 to-emerald-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="relative space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const icon = step.icon || defaultIcons[index] || '📌';

              return (
                <motion.div
                  key={step.id}
                  custom={index}
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className={`relative flex items-center gap-6 lg:gap-0 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step number circle - Mobile */}
                  <div className="lg:hidden flex-shrink-0 relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-200/50"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 lg:w-[calc(50%-60px)] ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div
                      className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-stone-100/60 border border-stone-200/60 hover:shadow-xl hover:border-amber-200/60 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      {/* Icon badge */}
                      <div className="absolute -top-4 right-6">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-amber-200/50"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                          {icon}
                        </motion.div>
                      </div>

                      {/* Step label */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-xs font-semibold text-stone-600 mb-4">
                        Step {step.number}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl sm:text-2xl font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-stone-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Decorative arrow pointing to timeline - Desktop only */}
                      <div
                        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-stone-200/60 ${
                          isEven
                            ? 'right-0 translate-x-1/2 rotate-45'
                            : 'left-0 -translate-x-1/2 -rotate-[135deg]'
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Center step indicator - Desktop only */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-amber-200/50 ring-4 ring-white"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout - Desktop only */}
                  <div className="hidden lg:block lg:w-[calc(50%-60px)]" />
                </motion.div>
              );
            })}

            {/* End marker */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {/* Mobile position */}
              <div className="lg:hidden absolute left-8 -translate-x-1/2 z-10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Desktop position */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-200/50 ring-4 ring-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>

              {/* Completion message */}
              <div className="ml-20 lg:ml-0 lg:mt-8 text-center">
                <p className="text-lg font-semibold text-emerald-600 mb-1">Done!</p>
                <p className="text-sm text-stone-500">Your worksheet is ready</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 border border-amber-100/60">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['⏱️', '💡', '🎯'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-stone-800">Ready in under 3 minutes</p>
                <p className="text-xs text-stone-500">No design skills needed</p>
              </div>
            </div>

            <div className="w-px h-10 bg-stone-200 hidden sm:block" />

            <Link
              href={ctaHref || `/${locale}/auth/signup`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white font-semibold rounded-xl shadow-lg shadow-stone-300/40 hover:bg-stone-900 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
            >
              {ctaText}
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
