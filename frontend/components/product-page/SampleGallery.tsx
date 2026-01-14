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

interface DynamicSample {
  slot: number;
  hasWorksheet: boolean;
  hasWorksheetThumb: boolean;
  hasWorksheetPreview: boolean;
  hasAnswer: boolean;
  hasAnswerThumb: boolean;
  hasAnswerPreview: boolean;
  hasPdf: boolean;
}

// Locale to language folder mapping for dynamic mode
const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// App ID to folder mapping for dynamic mode
const appIdToFolder: Record<string, string> = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'math-worksheet': 'math',
  'pattern-worksheet': 'pattern',
  'wordsearch': 'wordsearch',
  'word-scramble': 'word-scramble',
  'word-guess': 'word-guess',
  'alphabet-train': 'alphabet-train',
  'prepositions': 'prepositions',
  'bingo': 'bingo',
  'coloring': 'coloring',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'odd-one-out': 'odd-one-out',
  'picture-path': 'picture-path',
  'pattern-train': 'pattern-train',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'matching': 'matching',
  'math-puzzle': 'math-puzzle',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'picture-sort': 'picture-sort',
  'shadow-match': 'shadow-match',
  'writing': 'writing',
  'big-small': 'big-small',
  'chart-count': 'chart-count',
  'code-addition': 'code-addition',
};

interface SampleGalleryProps {
  locale: string;
  samples?: Sample[];  // Optional for backward compatibility
  appId?: string;      // For dynamic mode - loads samples from server
  sectionTitle?: string;
  sectionDescription?: string;
  downloadLabel?: string;
  worksheetLabel?: string;
  answerKeyLabel?: string;
  viewAllLabel?: string;
  noPdfLabel?: string;
  freePdfCountLabel?: string;
  badgeText?: string;
  downloadingLabel?: string;
  ofLabel?: string;
}

const defaultLabels = {
  sectionTitle: 'Sample Worksheets',
  sectionDescription: 'Download free sample worksheets to see our professional quality',
  downloadLabel: 'Download PDF',
  worksheetLabel: 'Worksheet',
  answerKeyLabel: 'Answer Key',
  viewAllLabel: 'View larger',
  noPdfLabel: 'Preview only',
  freePdfCountLabel: 'free downloads',
  badgeText: 'Free Samples',
  downloadingLabel: 'Downloading...',
  ofLabel: 'of',
};

// Generate descriptive filename from altText
function generateFilename(altText: string): string {
  // Extract key words from alt text and create a clean filename
  const cleaned = altText
    .toLowerCase()
    .replace(/worksheet|sample|mode|with|for|and|the|a|an/gi, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 4)
    .join('-');
  return `${cleaned || 'worksheet'}-sample.pdf`;
}

// Convert image path to optimized thumbnail path (400px webp)
function getThumbnailPath(src: string): string {
  if (!src) return src;
  // Remove extension and add _thumb.webp
  const lastDot = src.lastIndexOf('.');
  if (lastDot === -1) return src;
  return src.substring(0, lastDot) + '_thumb.webp';
}

// Convert image path to optimized preview path (800px webp)
function getPreviewPath(src: string): string {
  if (!src) return src;
  // Remove extension and add _preview.webp
  const lastDot = src.lastIndexOf('.');
  if (lastDot === -1) return src;
  return src.substring(0, lastDot) + '_preview.webp';
}

// Convert dynamic samples to the Sample interface for consistent rendering
function convertDynamicSamples(
  dynamicSamples: DynamicSample[],
  locale: string,
  appId: string
): Sample[] {
  const language = localeToFolder[locale] || 'english';
  const folder = appIdToFolder[appId] || appId;
  const basePath = `/samples/${language}/${folder}`;
  // Cache buster ensures fresh images are loaded after uploads via the content manager
  const cacheBuster = `?v=${Date.now()}`;

  return dynamicSamples
    .filter(s => s.hasWorksheet) // Only include slots with worksheets
    .map(s => ({
      id: `sample-${s.slot}`,
      worksheetSrc: `${basePath}/sample-${s.slot}.jpeg${cacheBuster}`,
      answerKeySrc: s.hasAnswer
        ? `${basePath}/sample-${s.slot}-answer.jpeg${cacheBuster}`
        : `${basePath}/sample-${s.slot}.jpeg${cacheBuster}`,
      altText: `Sample worksheet ${s.slot}`,
      pdfDownloadUrl: s.hasPdf ? `${basePath}/sample-${s.slot}.pdf` : undefined,
    }));
}

export default function SampleGallery({
  locale,
  samples: propSamples,
  appId,
  sectionTitle = defaultLabels.sectionTitle,
  sectionDescription = defaultLabels.sectionDescription,
  downloadLabel = defaultLabels.downloadLabel,
  worksheetLabel = defaultLabels.worksheetLabel,
  answerKeyLabel = defaultLabels.answerKeyLabel,
  viewAllLabel = defaultLabels.viewAllLabel,
  noPdfLabel = defaultLabels.noPdfLabel,
  freePdfCountLabel = defaultLabels.freePdfCountLabel,
  badgeText = defaultLabels.badgeText,
  downloadingLabel = defaultLabels.downloadingLabel,
  ofLabel = defaultLabels.ofLabel,
}: SampleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [failedThumbs, setFailedThumbs] = useState<Set<string>>(new Set());
  const [failedPreviews, setFailedPreviews] = useState<Set<string>>(new Set());
  const [dynamicSamples, setDynamicSamples] = useState<Sample[]>([]);
  const [dynamicLoading, setDynamicLoading] = useState(!!appId);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch dynamic samples if appId is provided
  useEffect(() => {
    if (!appId) return;

    const fetchDynamicSamples = async () => {
      try {
        setDynamicLoading(true);
        const response = await fetch('/api/product-samples/list');
        const data = await response.json();

        if (data.success && data.matrix[locale]) {
          const appData = data.matrix[locale].apps[appId];
          if (appData && appData.slots) {
            const converted = convertDynamicSamples(appData.slots, locale, appId);
            setDynamicSamples(converted);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic samples:', error);
      } finally {
        setDynamicLoading(false);
      }
    };

    fetchDynamicSamples();
  }, [appId, locale]);

  // Use dynamic samples if appId is provided and samples exist, otherwise fall back to prop samples
  // This allows the content manager uploads to take precedence, but falls back to hardcoded samples if none uploaded
  const samples = (appId && dynamicSamples.length > 0) ? dynamicSamples : (propSamples || []);

  // Count samples with PDFs available
  const samplesWithPdf = samples.filter(s => s.pdfDownloadUrl).length;

  // Download handler - directly download via anchor link
  const handleDownload = useCallback(async (e: React.MouseEvent, sample: Sample) => {
    e.stopPropagation();
    if (!sample.pdfDownloadUrl || downloadingId === sample.id) return;

    setDownloadingId(sample.id);

    try {
      // Create anchor and trigger download
      const link = document.createElement('a');
      link.href = sample.pdfDownloadUrl;
      link.download = generateFilename(sample.altText);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      window.open(sample.pdfDownloadUrl, '_blank');
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  }, [downloadingId]);

  const currentSample = samples[currentIndex];
  // Original source (for lightbox full quality)
  const currentImageSrc = showAnswerKey
    ? currentSample?.answerKeySrc
    : currentSample?.worksheetSrc;
  // Optimized preview (for main preview area - 800px)
  const currentPreviewSrc = getPreviewPath(currentImageSrc || '');

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

  // Show loading state for dynamic samples
  if (appId && dynamicLoading) {
    return (
      <section id="samples-gallery" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-white/70">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Loading samples...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!samples || samples.length === 0) {
    return null;
  }

  return (
    <section id="samples-gallery" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-blue-200 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {badgeText}
          </motion.div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {sectionTitle}
          </h2>

          <p className="text-lg text-blue-100/70 max-w-2xl mx-auto mb-4">
            {sectionDescription}
          </p>

          {samplesWithPdf > 0 && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">{samplesWithPdf}</span>
              <span>{freePdfCountLabel}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Thumbnail Grid with Download Buttons */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            ref={thumbnailContainerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {samples.map((sample, index) => (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Thumbnail Card */}
                <div
                  onClick={() => goToIndex(index)}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-4 ring-blue-400 ring-offset-4 ring-offset-[#16213e] scale-105 shadow-2xl shadow-blue-500/30'
                      : 'ring-1 ring-white/20 hover:ring-white/40 hover:shadow-xl hover:shadow-white/10 hover:scale-102'
                  }`}
                >
                  <Image
                    src={failedThumbs.has(sample.id) ? sample.worksheetSrc : getThumbnailPath(sample.worksheetSrc)}
                    alt={sample.altText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    onError={() => setFailedThumbs(prev => new Set(prev).add(sample.id))}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Selected indicator */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>

                {/* Download Button ON the thumbnail */}
                {sample.pdfDownloadUrl && (
                  <motion.button
                    onClick={(e) => handleDownload(e, sample)}
                    disabled={downloadingId === sample.id}
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                      downloadingId === sample.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/95 text-slate-800 hover:bg-emerald-500 hover:text-white shadow-lg shadow-black/30 hover:shadow-emerald-500/40'
                    } backdrop-blur-sm`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {downloadingId === sample.id ? (
                      <>
                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>PDF</span>
                      </>
                    )}
                  </motion.button>
                )}

                {/* No PDF indicator */}
                {!sample.pdfDownloadUrl && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white/10 backdrop-blur-sm text-white/60 text-xs">
                    {noPdfLabel}
                  </div>
                )}

                {/* Sample number */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-slate-700 shadow">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Preview Area */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Toggle bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            {/* Worksheet/Answer Key toggle */}
            <div className="relative flex items-center p-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <motion.div
                className="absolute h-[calc(100%-8px)] rounded-full bg-white"
                initial={false}
                animate={{
                  x: showAnswerKey ? 'calc(100% + 4px)' : '0%',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ left: 4, top: 4, width: 'calc(50% - 4px)' }}
              />
              <button
                onClick={() => setShowAnswerKey(false)}
                className={`relative z-10 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 flex-1 min-w-[120px] flex items-center justify-center whitespace-nowrap ${
                  !showAnswerKey ? 'text-slate-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {worksheetLabel}
              </button>
              <button
                onClick={() => setShowAnswerKey(true)}
                className={`relative z-10 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 flex-1 min-w-[120px] flex items-center justify-center whitespace-nowrap ${
                  showAnswerKey ? 'text-slate-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {answerKeyLabel}
              </button>
            </div>

            {/* Current sample info */}
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <span className="font-semibold text-white">{currentIndex + 1}</span>
              <span>{ofLabel}</span>
              <span>{samples.length}</span>
            </div>
          </div>

          {/* Main image display */}
          <div
            className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
                  {currentPreviewSrc && (
                    <Image
                      src={failedPreviews.has(`${currentSample?.id}-${showAnswerKey}`) ? currentImageSrc : currentPreviewSrc}
                      alt={currentSample?.altText || 'Worksheet sample'}
                      fill
                      className={`object-contain p-6 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => setIsLoading(false)}
                      onError={() => setFailedPreviews(prev => new Set(prev).add(`${currentSample?.id}-${showAnswerKey}`))}
                      priority={currentIndex === 0}
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  )}

                  {/* Loading skeleton */}
                  {isLoading && (
                    <div className="absolute inset-6 rounded-xl bg-white/10 animate-pulse" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Zoom hint overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-300 group"
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-slate-600 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-200"
                  aria-label="Previous sample"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-slate-600 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-200"
                  aria-label="Next sample"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Current sample download button (larger, for main preview) */}
          {currentSample?.pdfDownloadUrl && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={(e) => handleDownload(e, currentSample)}
                disabled={downloadingId === currentSample.id}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
              >
                {downloadingId === currentSample.id ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{downloadingLabel}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{downloadLabel}</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
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
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
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
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[120px] text-center whitespace-nowrap ${
                    !showAnswerKey ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {worksheetLabel}
                </button>
                <button
                  onClick={() => setShowAnswerKey(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[120px] text-center whitespace-nowrap ${
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

            {/* Counter and download in lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
              <span className="text-white/70 text-sm font-medium">
                {currentIndex + 1} / {samples.length}
              </span>
              {currentSample?.pdfDownloadUrl && (
                <button
                  onClick={(e) => handleDownload(e, currentSample)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {downloadLabel}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
