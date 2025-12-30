'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Sample {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  pdfUrl: string;
  productPageSlug: string;
}

interface SampleGalleryProps {
  locale: string;
}

// Real samples from /samples/english/ folder
const samples: Sample[] = [
  {
    id: '1',
    name: 'Addition Worksheets',
    category: 'Math',
    imageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
    pdfUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
    productPageSlug: 'addition-worksheets',
  },
  {
    id: '2',
    name: 'Word Search',
    category: 'Language',
    imageSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
    pdfUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
    productPageSlug: 'word-search-worksheets',
  },
  {
    id: '3',
    name: 'Crossword Puzzles',
    category: 'Language',
    imageSrc: '/samples/english/crossword/crossword_worksheet.jpeg',
    pdfUrl: '/samples/english/crossword/crossword_worksheet.jpeg',
    productPageSlug: 'crossword-worksheets',
  },
  {
    id: '4',
    name: 'Drawing Lines',
    category: 'Visual',
    imageSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg',
    pdfUrl: '/samples/english/drawing lines/drawing_lines_curve 1.pdf',
    productPageSlug: 'drawing-lines-worksheets',
  },
  {
    id: '5',
    name: 'Alphabet Train',
    category: 'Creative',
    imageSrc: '/samples/english/alphabet-train/alphabet train landscape.jpeg',
    pdfUrl: '/samples/english/alphabet-train/alphabet train landscape.pdf',
    productPageSlug: 'alphabet-train-worksheets',
  },
  {
    id: '6',
    name: 'Sudoku Puzzles',
    category: 'Logic',
    imageSrc: '/samples/english/sudoku/sudoku hard.jpeg',
    pdfUrl: '/samples/english/sudoku/sudoku hard.pdf',
    productPageSlug: 'sudoku-worksheets',
  },
  {
    id: '7',
    name: 'Coloring Pages',
    category: 'Creative',
    imageSrc: '/samples/english/coloring/coloring portrait 1.png',
    pdfUrl: '/samples/english/coloring/coloring portrait 1.pdf',
    productPageSlug: 'coloring-worksheets',
  },
  {
    id: '8',
    name: 'Find Objects',
    category: 'Visual',
    imageSrc: '/samples/english/find objects/find objects landscape.jpeg',
    pdfUrl: '/samples/english/find objects/find objects landscape.pdf',
    productPageSlug: 'find-objects-worksheets',
  },
  {
    id: '9',
    name: 'Matching Game',
    category: 'Visual',
    imageSrc: '/samples/english/matching/matching landscape.jpeg',
    pdfUrl: '/samples/english/matching/matching landscape.pdf',
    productPageSlug: 'matching-worksheets',
  },
  {
    id: '10',
    name: 'Code Addition',
    category: 'Math',
    imageSrc: '/samples/english/code addition/code addition landscape.jpeg',
    pdfUrl: '/samples/english/code addition/code addition landscape.pdf',
    productPageSlug: 'code-addition-worksheets',
  },
];

const categoryColors: Record<string, string> = {
  Math: 'from-cyan-500 to-blue-500',
  Language: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Creative: 'from-green-500 to-emerald-500',
  Logic: 'from-rose-500 to-red-500',
};

export default function SampleGallery({ locale }: SampleGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (sample: Sample) => {
    setDownloadingId(sample.id);

    // Create download link
    const link = document.createElement('a');
    link.href = sample.pdfUrl;
    link.download = `${sample.name.replace(/\s+/g, '-').toLowerCase()}-sample.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset after animation
    setTimeout(() => setDownloadingId(null), 1500);
  };

  return (
    <section
      id="samples-gallery"
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          #051020 0%,
          #0a1628 30%,
          #0f1f3a 70%,
          #0a1628 100%
        )`,
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm font-medium text-emerald-400">Free Samples</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Download Free Worksheet Samples
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Try before you subscribe. Download high-quality PDF samples from our most popular generators.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-sm text-white/40">Free Samples</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">300 DPI</div>
              <div className="text-sm text-white/40">Print Quality</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">PDF</div>
              <div className="text-sm text-white/40">Format</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Samples grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {samples.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
              onMouseEnter={() => setHoveredId(sample.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium text-white bg-gradient-to-r ${categoryColors[sample.category]}`}
                  >
                    {sample.category}
                  </span>
                </div>

                {/* Image container */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden">
                  <Image
                    src={sample.imageSrc}
                    alt={sample.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hoveredId === sample.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4"
                      >
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          onClick={() => handleDownload(sample)}
                          disabled={downloadingId === sample.id}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-70"
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {downloadingId === sample.id ? (
                            <>
                              <motion.svg
                                className="w-4 h-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </motion.svg>
                              Downloading...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download PDF
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card footer */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white truncate mb-2">
                    {sample.name}
                  </h3>
                  <Link
                    href={`/${locale}/apps/${sample.productPageSlug}`}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View Details
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-200"
          >
            View All 33 Generators
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
