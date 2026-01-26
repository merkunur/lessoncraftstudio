'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoLightboxProps {
  locale: string;
  videoId?: string;           // Default: 'Df9fknBBRFA' (common features)
  buttonText?: string;        // Override default locale-based text
  modalTitle?: string;        // Override default locale-based title
}

// Localized content - natural, not translated
const localeContent: Record<string, { buttonText: string; modalTitle: string }> = {
  en: { buttonText: 'See How It Works', modalTitle: 'Quick Feature Overview' },
  de: { buttonText: "So einfach geht's", modalTitle: 'Funktionen im Überblick' },
  fr: { buttonText: 'Découvrir en vidéo', modalTitle: 'Aperçu des fonctionnalités' },
  es: { buttonText: 'Mira cómo funciona', modalTitle: 'Vista rápida de funciones' },
  it: { buttonText: 'Guarda come funziona', modalTitle: 'Panoramica delle funzioni' },
  pt: { buttonText: 'Veja como funciona', modalTitle: 'Visão geral das funções' },
  nl: { buttonText: 'Bekijk hoe het werkt', modalTitle: 'Overzicht van functies' },
  sv: { buttonText: 'Se hur det fungerar', modalTitle: 'Funktionsöversikt' },
  da: { buttonText: 'Se hvordan det virker', modalTitle: 'Funktionsoversigt' },
  no: { buttonText: 'Se hvordan det fungerer', modalTitle: 'Funksjonsoversikt' },
  fi: { buttonText: 'Katso miten se toimii', modalTitle: 'Toimintojen yleiskatsaus' },
};

const DEFAULT_VIDEO_ID = 'Df9fknBBRFA';

export default function VideoLightbox({
  locale,
  videoId = DEFAULT_VIDEO_ID,
  buttonText,
  modalTitle,
}: VideoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const defaultContent = localeContent[locale] || localeContent.en;
  const content = {
    buttonText: buttonText || defaultContent.buttonText,
    modalTitle: modalTitle || defaultContent.modalTitle,
  };

  // Reset iframe loaded state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false);
    }
  }, [isOpen]);

  // Handle escape key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // YouTube thumbnail URLs - try maxres first, fall back to hqdefault
  const thumbnailUrl = thumbnailError
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {/* Watch Demo Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-white/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(168,85,247,0.15))',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
        }}
        aria-label={content.buttonText}
      >
        {/* Animated play icon */}
        <span className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
          {/* Gradient background */}
          <span
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
            }}
          />
          {/* Pulsing ring animation */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Play triangle */}
          <svg
            className="relative w-4 h-4 ml-0.5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>

        {/* Button text */}
        <span className="relative">{content.buttonText}</span>

        {/* Hover glow effect */}
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: '0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(168,85,247,0.2)',
          }}
        />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(3,3,5,0.95)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="relative w-full max-w-4xl"
            >
              {/* Glow effect */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-50 blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(168,85,247,0.3) 50%, rgba(236,72,153,0.2) 100%)',
                }}
              />

              {/* Container */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(10,10,20,0.98) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px rgba(6,182,212,0.15), 0 0 100px rgba(168,85,247,0.1)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    {/* Animated dot */}
                    <motion.span
                      className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <h2
                      id="video-modal-title"
                      className="text-lg font-semibold text-white/90"
                    >
                      {content.modalTitle}
                    </h2>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200"
                    aria-label="Close video"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Video container - 16:9 aspect ratio with facade pattern */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {/* Thumbnail facade - shows immediately while iframe loads */}
                  {!iframeLoaded && (
                    <div className="absolute inset-0 bg-black">
                      {/* YouTube thumbnail image */}
                      <img
                        src={thumbnailUrl}
                        alt={content.modalTitle}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => setThumbnailError(true)}
                      />

                      {/* Loading overlay with spinner */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                        {/* Spinning loader */}
                        <div className="relative">
                          <motion.div
                            className="w-16 h-16 rounded-full border-4 border-white/20"
                            style={{
                              borderTopColor: '#06b6d4',
                              borderRightColor: '#8b5cf6',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          {/* Play icon in center */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white/80 ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Loading text */}
                        <motion.p
                          className="mt-4 text-white/70 text-sm font-medium"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          Loading video...
                        </motion.p>
                      </div>
                    </div>
                  )}

                  {/* YouTube iframe - loads in background, shown when ready */}
                  <iframe
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                      iframeLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={content.modalTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
