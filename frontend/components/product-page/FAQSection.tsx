'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  locale: string;
  sectionTitle: string;
  sectionDescription?: string;
  faqs: FAQItem[];
  initialVisibleCount?: number;
  showMoreText?: string;
  showLessText?: string;
  pricingTitle?: string;
  price?: string;
  priceInterval?: string;
  priceSuffix?: string;
  benefits?: string[];
  ctaText?: string;
  ctaHref?: string;
  guaranteeText?: string;
}

const defaultProps = {
  initialVisibleCount: 6,
  showMoreText: 'Show more questions',
  showLessText: 'Show less',
  pricingTitle: 'Core Bundle',
  price: '$144',
  priceInterval: '/year',
  priceSuffix: 'Billed annually',
  benefits: [
    'Unlimited worksheet creation',
    'Commercial license included',
    '11 languages supported',
    '3000+ themed images',
    '300 DPI print quality',
    'Answer keys included',
  ],
  ctaText: 'Start Creating Now',
  guaranteeText: '30-day money-back guarantee',
};

export default function FAQSection({
  locale,
  sectionTitle,
  sectionDescription,
  faqs,
  initialVisibleCount = defaultProps.initialVisibleCount,
  showMoreText = defaultProps.showMoreText,
  showLessText = defaultProps.showLessText,
  pricingTitle = defaultProps.pricingTitle,
  price = defaultProps.price,
  priceInterval = defaultProps.priceInterval,
  priceSuffix = defaultProps.priceSuffix,
  benefits = defaultProps.benefits,
  ctaText = defaultProps.ctaText,
  ctaHref,
  guaranteeText = defaultProps.guaranteeText,
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialVisibleCount);
  const hasMore = faqs.length > initialVisibleCount;

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
      </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
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

        {/* Two column layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* FAQ Column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {visibleFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div
                      className={`bg-white rounded-xl border transition-all duration-300 ${
                        openId === faq.id
                          ? 'border-indigo-200 shadow-lg shadow-indigo-100/50'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span
                          className={`font-semibold pr-4 transition-colors ${
                            openId === faq.id ? 'text-indigo-700' : 'text-slate-900'
                          }`}
                          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                        >
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: openId === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            openId === faq.id
                              ? 'bg-indigo-100 text-indigo-600'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-0">
                              <div className="h-px bg-slate-100 mb-4" />
                              <p className="text-slate-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show more/less button */}
            {hasMore && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  {showAll ? showLessText : showMoreText}
                  <motion.svg
                    className="w-4 h-4"
                    animate={{ rotate: showAll ? 180 : 0 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Pricing CTA Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-8">
              <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                {/* Gradient header */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 py-8 text-center">
                  <p className="text-indigo-200 text-sm font-medium mb-2">
                    {pricingTitle}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className="text-5xl font-bold text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                    >
                      {price}
                    </span>
                    <span className="text-xl text-indigo-200">{priceInterval}</span>
                  </div>
                  <p className="text-indigo-200 text-sm mt-2">{priceSuffix}</p>
                </div>

                {/* Benefits list */}
                <div className="px-6 py-6">
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Link
                    href={ctaHref || `/${locale}/auth/signup`}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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

                {/* Guarantee badge */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium text-emerald-700">{guaranteeText}</span>
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full pointer-events-none" />
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Cancel anytime
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
