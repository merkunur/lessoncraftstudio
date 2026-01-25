'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Sample {
  id: string;
  worksheetSrc: string;
  answerKeySrc: string;
  altText: string;
  imageTitle?: string;
  pdfDownloadUrl?: string;
}

interface DynamicSample {
  filename: string;
  worksheetPath: string;
  answerKeyPath?: string;
  hasThumb: boolean;
  hasPreview: boolean;
  hasPdf: boolean;
  pdfPath?: string;
  // SEO metadata from database (returned by API)
  altText?: string;
  title?: string;
  description?: string;
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

// App ID to folder mapping for dynamic mode (use spaces, not hyphens)
const appIdToFolder: Record<string, string> = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'math-worksheet': 'math worksheet',
  'pattern-worksheet': 'pattern worksheet',
  'wordsearch': 'wordsearch',
  'word-scramble': 'word scramble',
  'word-guess': 'word guess',
  'alphabet-train': 'alphabet train',
  'prepositions': 'prepositions',
  'bingo': 'bingo',
  'coloring': 'coloring',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure hunt',
  'odd-one-out': 'odd one out',
  'picture-path': 'picture path',
  'pattern-train': 'pattern train',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'find-and-count': 'find and count',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'matching': 'matching',
  'math-puzzle': 'math puzzle',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'picture-sort': 'picture sort',
  'shadow-match': 'shadow match',
  'writing': 'writing',
  'big-small': 'big small',
  'chart-count': 'chart count',
  'code-addition': 'code addition',
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
  const [pathPart, queryPart] = src.split('?');
  const lastDot = pathPart.lastIndexOf('.');
  if (lastDot === -1) return src;
  const newPath = pathPart.substring(0, lastDot) + '_thumb.webp';
  return queryPart ? `${newPath}?${queryPart}` : newPath;
}

// Convert image path to optimized preview path (800px webp)
function getPreviewPath(src: string): string {
  if (!src) return src;
  const [pathPart, queryPart] = src.split('?');
  const lastDot = pathPart.lastIndexOf('.');
  if (lastDot === -1) return src;
  const newPath = pathPart.substring(0, lastDot) + '_preview.webp';
  return queryPart ? `${newPath}?${queryPart}` : newPath;
}

// Normalize filename for comparison (lowercase, decode URI)
function normalizeFilename(path: string): string {
  const filename = path.split('/').pop() || '';
  try {
    return decodeURIComponent(filename).toLowerCase();
  } catch {
    return filename.toLowerCase();
  }
}

// Convert dynamic samples to the Sample interface for consistent rendering
// SEO Priority: 1) Database (from API) → 2) Content file (propSamples) → 3) Generic fallback
// FILENAME-BASED LOOKUP: Matches samples by filename, not array index
function convertDynamicSamples(
  dynamicSamples: DynamicSample[],
  locale: string,
  appId: string,
  propSamples?: Sample[]
): Sample[] {
  // Cache buster ensures fresh images are loaded after uploads via the content manager
  const cacheBuster = `?v=${Date.now()}`;

  // Build a lookup map by normalized filename for SEO metadata from content files
  // This allows samples uploaded via content manager (sample-1.jpeg, etc.)
  // to match SEO entries regardless of their position in the filesystem listing
  const contentSeoMap = new Map<string, { altText: string; imageTitle?: string }>();
  if (propSamples) {
    for (const sample of propSamples) {
      const filename = normalizeFilename(sample.worksheetSrc);
      contentSeoMap.set(filename, {
        altText: sample.altText,
        imageTitle: sample.imageTitle,
      });
    }
  }

  return dynamicSamples.map((s, index) => {
    // Filename-based SEO lookup: match by actual filename, not array position
    const filename = normalizeFilename(s.worksheetPath);
    const contentSeo = contentSeoMap.get(filename);

    // Priority: API database SEO → Content file SEO → Generic fallback
    const altText = s.altText || contentSeo?.altText || `Sample worksheet ${index + 1}`;
    const imageTitle = s.title || contentSeo?.imageTitle;

    return {
      id: `sample-${index + 1}`,
      worksheetSrc: `${s.worksheetPath}${cacheBuster}`,
      answerKeySrc: s.answerKeyPath
        ? `${s.answerKeyPath}${cacheBuster}`
        : `${s.worksheetPath}${cacheBuster}`,
      altText,
      imageTitle,
      pdfDownloadUrl: s.hasPdf ? s.pdfPath : undefined,
    };
  });
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
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
          if (appData && appData.samples) {
            const converted = convertDynamicSamples(appData.samples, locale, appId, propSamples);
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
  }, [appId, locale, propSamples]);

  // Use dynamic samples if appId is provided and samples exist, otherwise fall back to prop samples
  const samples = (appId && dynamicSamples.length > 0) ? dynamicSamples : (propSamples || []);

  // Count samples with PDFs available
  const samplesWithPdf = samples.filter(s => s.pdfDownloadUrl).length;

  // Check scroll overflow state for thumbnail strip arrows
  const updateScrollState = useCallback(() => {
    const el = thumbnailContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = thumbnailContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [samples.length, updateScrollState]);

  // Download handler - directly download via anchor link
  const handleDownload = useCallback(async (e: React.MouseEvent, sample: Sample) => {
    e.stopPropagation();
    if (!sample.pdfDownloadUrl || downloadingId === sample.id) return;

    setDownloadingId(sample.id);

    try {
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
  const currentImageSrc = showAnswerKey
    ? currentSample?.answerKeySrc
    : currentSample?.worksheetSrc;
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

  // Scroll selected thumbnail into view
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

  // Scroll the thumbnail strip by a set amount
  const scrollStrip = (dir: 'left' | 'right') => {
    const el = thumbnailContainerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
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

  // Skeleton loading state
  if (appId && dynamicLoading) {
    return (
      <section id="samples-gallery" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Skeleton header */}
          <div className="text-center mb-16">
            <div className="inline-block w-32 h-8 rounded-full bg-white/10 animate-pulse mb-6" />
            <div className="w-80 h-12 mx-auto rounded-lg bg-white/10 animate-pulse mb-4" />
            <div className="w-96 h-6 mx-auto rounded bg-white/8 animate-pulse" />
          </div>

          {/* Skeleton preview */}
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            {/* Skeleton thumbnail strip */}
            <div className="flex gap-3 mt-6 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[100px] sm:w-[120px] aspect-[3/4] rounded-lg bg-white/8 animate-pulse" />
              ))}
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

        {/* Main Preview Area */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Top bar: toggle + counter */}
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

            {/* Counter pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              <span className="font-bold text-white tabular-nums">{currentIndex + 1}</span>
              <span className="text-white/50">{ofLabel}</span>
              <span className="font-bold text-white tabular-nums">{samples.length}</span>
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
                      title={currentSample?.imageTitle || currentSample?.altText || 'Worksheet sample'}
                      fill
                      unoptimized
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

            {/* Navigation arrows on main preview */}
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

          {/* Current sample download button */}
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

          {/* ── Horizontal Thumbnail Carousel ── */}
          <motion.div
            className="relative mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {/* Scroll-fade left */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-[#16213e] to-transparent" />
            )}
            {/* Scroll-fade right */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-[#16213e] to-transparent" />
            )}

            {/* Strip scroll arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scrollStrip('left')}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-slate-600 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label="Scroll thumbnails left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scrollStrip('right')}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-slate-600 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label="Scroll thumbnails right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Scrollable thumbnail strip */}
            <div
              ref={thumbnailContainerRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {samples.map((sample, index) => (
                <figure
                  key={sample.id}
                  onClick={() => goToIndex(index)}
                  className={`relative flex-shrink-0 w-[100px] sm:w-[120px] md:w-[130px] aspect-[3/4] rounded-lg overflow-hidden cursor-pointer m-0 snap-center transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-[#16213e] scale-105 shadow-xl shadow-blue-500/25'
                      : 'ring-1 ring-white/15 hover:ring-white/40 hover:scale-[1.03] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={failedThumbs.has(sample.id) ? sample.worksheetSrc : getThumbnailPath(sample.worksheetSrc)}
                    alt={sample.altText}
                    title={sample.imageTitle || sample.altText}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="130px"
                    onError={() => setFailedThumbs(prev => new Set(prev).add(sample.id))}
                    priority={index < 4}
                  />

                  {/* Selected glow */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-500/15" />
                  )}

                  {/* PDF badge on thumbnail */}
                  {sample.pdfDownloadUrl && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-emerald-500/90 text-[10px] font-bold text-white leading-none">
                      PDF
                    </div>
                  )}

                  {/* Number badge */}
                  <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white/90">
                    {index + 1}
                  </div>

                  {/* Screen-reader only figcaption for SEO */}
                  <figcaption className="sr-only">
                    {sample.altText}
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>
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
                      title={currentSample?.imageTitle || currentSample?.altText || 'Worksheet sample'}
                      fill
                      unoptimized
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
              <span className="text-white/70 text-sm font-medium tabular-nums">
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
