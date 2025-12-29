'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Sample {
  id: string;
  worksheetSrc: string;
  answerKeySrc: string;
  altText: string;
  pdfDownloadUrl?: string;
}

interface SampleGalleryProps {
  locale: string;
  samples: Sample[];
  sectionTitle?: string;
  downloadLabel?: string;
  worksheetLabel?: string;
  answerKeyLabel?: string;
  viewAllLabel?: string;
}

const defaultLabels = {
  sectionTitle: 'Worksheet Samples',
  downloadLabel: 'Download Free Sample',
  worksheetLabel: 'Worksheet',
  answerKeyLabel: 'Answer Key',
  viewAllLabel: 'Click to zoom',
};

export default function SampleGallery({
  locale,
  samples,
  sectionTitle = defaultLabels.sectionTitle,
  downloadLabel = defaultLabels.downloadLabel,
  worksheetLabel = defaultLabels.worksheetLabel,
  answerKeyLabel = defaultLabels.answerKeyLabel,
  viewAllLabel = defaultLabels.viewAllLabel,
}: SampleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentSample = samples[currentIndex];
  const currentImageSrc = showAnswerKey
    ? currentSample?.answerKeySrc
    : currentSample?.worksheetSrc;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const thumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (samples.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % samples.length);
  }, [samples.length]);

  const goToPrevious = useCallback(() => {
    if (samples.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + samples.length) % samples.length);
  }, [samples.length]);

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrevious();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (!samples || samples.length === 0) {
    return null;
  }

  return (
    <section id="samples-gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {sectionTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Preview our professionally designed worksheets. Each sample shows exactly
            what you&apos;ll create with our generator.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Main preview container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Toggle and counter bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              {/* Sample counter */}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-semibold text-indigo-600">{currentIndex + 1}</span>
                <span>/</span>
                <span>{samples.length}</span>
                <span className="text-slate-400 ml-2">samples</span>
              </div>

              {/* Worksheet/Answer Key toggle */}
              <div className="relative inline-flex items-center p-1 bg-slate-100 rounded-full">
                <motion.div
                  className="absolute h-[calc(100%-8px)] rounded-full bg-white shadow-md"
                  initial={false}
                  animate={{
                    x: showAnswerKey ? '100%' : '0%',
                    width: showAnswerKey ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{ left: 4, top: 4 }}
                />
                <button
                  onClick={() => setShowAnswerKey(false)}
                  className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    !showAnswerKey ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {worksheetLabel}
                </button>
                <button
                  onClick={() => setShowAnswerKey(true)}
                  className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    showAnswerKey ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {answerKeyLabel}
                </button>
              </div>

              {/* Download button */}
              {currentSample?.pdfDownloadUrl && (
                <a
                  href={currentSample.pdfDownloadUrl}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {downloadLabel}
                </a>
              )}
            </div>

            {/* Main image display */}
            <div
              className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-200/50"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-indigo-200 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-indigo-200 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-indigo-200 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-indigo-200 rounded-br-lg pointer-events-none" />

              {/* Image container */}
              <div
                className="relative aspect-[4/3] cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${currentIndex}-${showAnswerKey}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="absolute inset-0"
                  >
                    {currentImageSrc && (
                      <Image
                        src={currentImageSrc}
                        alt={currentSample?.altText || 'Worksheet sample'}
                        fill
                        className={`object-contain p-6 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        priority={currentIndex === 0}
                      />
                    )}

                    {/* Loading skeleton */}
                    {isLoading && (
                      <div className="absolute inset-6 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Zoom hint overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-slate-900/0 hover:bg-slate-900/10 transition-colors duration-300 group"
                  whileHover={{ scale: 1 }}
                >
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1 }}
                  >
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600">{viewAllLabel}</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Navigation arrows */}
              {samples.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200/50 text-slate-600 hover:text-indigo-600 hover:bg-white hover:scale-110 transition-all duration-200"
                    aria-label="Previous sample"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200/50 text-slate-600 hover:text-indigo-600 hover:bg-white hover:scale-110 transition-all duration-200"
                    aria-label="Next sample"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {samples.length > 1 && (
              <div className="mt-6 relative">
                <div
                  ref={thumbnailContainerRef}
                  className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {samples.map((sample, index) => (
                    <motion.button
                      key={sample.id}
                      onClick={() => goToIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden snap-center transition-all duration-300 ${
                        index === currentIndex
                          ? 'ring-2 ring-indigo-500 ring-offset-2 shadow-lg scale-105'
                          : 'ring-1 ring-slate-200 hover:ring-indigo-300 hover:shadow-md'
                      }`}
                      whileHover={{ scale: index === currentIndex ? 1.05 : 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={sample.worksheetSrc}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                      {/* Active indicator */}
                      {index === currentIndex && (
                        <motion.div
                          className="absolute inset-0 bg-indigo-500/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                      {/* Index badge */}
                      <div className="absolute bottom-1 right-1 w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-semibold text-slate-600 shadow-sm">
                        {index + 1}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>
            )}

            {/* Dot indicators for mobile */}
            {samples.length > 1 && samples.length <= 10 && (
              <div className="flex justify-center gap-2 mt-4 sm:hidden">
                {samples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-indigo-600 w-6'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to sample ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
            />

            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation in lightbox */}
            {samples.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200"
                  aria-label="Previous sample"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200"
                  aria-label="Next sample"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Toggle in lightbox */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="inline-flex items-center p-1 bg-white/10 backdrop-blur-sm rounded-full">
                <button
                  onClick={() => setShowAnswerKey(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    !showAnswerKey ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {worksheetLabel}
                </button>
                <button
                  onClick={() => setShowAnswerKey(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    showAnswerKey ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {answerKeyLabel}
                </button>
              </div>
            </div>

            {/* Lightbox image */}
            <motion.div
              className="relative w-full h-full max-w-5xl max-h-[85vh] m-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`lightbox-${currentIndex}-${showAnswerKey}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  {currentImageSrc && (
                    <Image
                      src={currentImageSrc}
                      alt={currentSample?.altText || 'Worksheet sample'}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Counter in lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/70 text-sm font-medium">
              {currentIndex + 1} / {samples.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
