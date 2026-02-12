'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import VideoLightbox from '../homepage/VideoLightbox';

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
  readMoreLabel?: string;
  showLessLabel?: string;
  floatingStats?: {
    time: string;
    action: string;
    quality: string;
  };
  videos?: {
    commonFeatures?: {
      videoId: string;
      buttonText: string;
      modalTitle: string;
    };
    appSpecific?: {
      videoId: string;
      buttonText: string;
      modalTitle: string;
    };
  };
}

const defaultCtaLabels = {
  tryFree: 'Start Creating',
  viewSamples: 'View Samples',
};

const defaultTrustBadges = {
  languages: '11 Languages',
  images: '3000+ Images',
  license: 'Commercial License',
};

const defaultFloatingStats = {
  time: '3 min',
  action: 'Create & Download',
  quality: '300 DPI',
};

// Dynamic font sizing based on longest word length - prevents mid-word breaking
const getTitleFontSize = (title: string): string => {
  const longestWordLength = Math.max(
    ...title.split(/[\s\-\u2013\u2014]+/).map(word => word.length)
  );
  if (longestWordLength > 20) return 'clamp(1.75rem, 3.5vw + 0.25rem, 2.75rem)';
  if (longestWordLength > 15) return 'clamp(2rem, 4vw + 0.5rem, 3.5rem)';
  if (longestWordLength > 10) return 'clamp(2.25rem, 4.5vw + 0.75rem, 4rem)';
  return 'clamp(2.5rem, 5vw + 1rem, 4.5rem)';
};

// Collapsible text component \u2014 CSS transition instead of AnimatePresence
function CollapsibleText({
  text,
  maxSentences = 3,
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
}: {
  text: string;
  maxSentences?: number;
  readMoreLabel?: string;
  showLessLabel?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sentences = text.split(/(?<=[.!?])\s+/);
  const shouldTruncate = sentences.length > maxSentences;
  const shortText = sentences.slice(0, maxSentences).join(' ');

  return (
    <div className="relative">
      <div>
        <p className="speakable-summary text-lg sm:text-xl leading-relaxed text-white/80">
          {isExpanded ? text : shortText + (shouldTruncate ? '...' : '')}
        </p>
      </div>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-medium text-sm transition-colors group"
        >
          {isExpanded ? showLessLabel : readMoreLabel}
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function HeroSection({
  locale,
  title,
  subtitle,
  description,
  previewImageSrc,
  ctaLabels = defaultCtaLabels,
  trustBadges = defaultTrustBadges,
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
  floatingStats = defaultFloatingStats,
  videos,
}: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices \u2014 mousemove is irrelevant and wastes CPU
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSamples = () => {
    const samplesSection = document.getElementById('samples-gallery');
    if (samplesSection) {
      samplesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split title for dramatic styling
  const titleWords = title.split(' ');
  const firstPart = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  const secondPart = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dark dramatic background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }} />

      {/* Animated mesh gradient background \u2014 CSS orbs on mobile, motion on desktop */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 hero-orb-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 hero-orb-drift"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 hero-orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
            top: '40%',
            left: '30%',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating geometric shapes \u2014 hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div
          className="absolute w-32 h-32 border border-cyan-500/20 rounded-2xl geo-rotate"
          style={{ top: '15%', right: '15%' }}
        />
        <div
          className="absolute w-20 h-20 border border-purple-500/20 rounded-full geo-float"
          style={{ top: '60%', right: '25%' }}
        />
        <div
          className="absolute w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl geo-spin"
          style={{ bottom: '20%', left: '10%' }}
        />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left column - Text content \u2014 CSS animations instead of Framer Motion */}
          <div className="lg:col-span-7 hero-fade-in-left">
            {/* Subtitle badge */}
            <div className="mb-8 hero-fade-in hero-stagger-1">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-sm font-semibold text-cyan-300 backdrop-blur-sm">
                <span
                  className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                />
                {subtitle}
              </span>
            </div>

            {/* Main title \u2014 NO animation, must be visible instantly (LCP element) */}
            <h1
              className="speakable-headline font-black tracking-tight leading-[1.2] mb-8"
              style={{
                fontSize: getTitleFontSize(title),
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontWeight: 900,
                hyphens: 'none',
              }}
              lang={locale}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 pb-1">
                {firstPart}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 pb-3">
                {secondPart}
              </span>
            </h1>

            {/* Collapsible Description */}
            <div className="mb-10 max-w-xl hero-fade-in hero-stagger-2">
              <CollapsibleText
                text={description}
                maxSentences={3}
                readMoreLabel={readMoreLabel}
                showLessLabel={showLessLabel}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 hero-fade-in hero-stagger-3">
              <Link
                href={`/${locale}/auth/signup`}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-xl font-bold text-lg transition-all duration-300"
              >
                {/* Gradient border effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl" />
                <span className="absolute inset-[2px] bg-[#0a0a0a] rounded-[10px] group-hover:bg-transparent transition-all duration-300" />
                <span className="relative flex items-center gap-2 text-white group-hover:text-white">
                  {ctaLabels.tryFree}
                  <svg
                    className="w-5 h-5 arrow-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <button
                onClick={scrollToSamples}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                  {ctaLabels.viewSamples}
                </span>
              </button>
            </div>

            {/* Video Demo Buttons */}
            {videos && (
              <div className="flex flex-wrap gap-3 mb-8 hero-fade-in hero-stagger-3">
                {videos.commonFeatures && (
                  <VideoLightbox
                    locale={locale}
                    videoId={videos.commonFeatures.videoId}
                    buttonText={videos.commonFeatures.buttonText}
                    modalTitle={videos.commonFeatures.modalTitle}
                  />
                )}
                {videos.appSpecific && (
                  <VideoLightbox
                    locale={locale}
                    videoId={videos.appSpecific.videoId}
                    buttonText={videos.appSpecific.buttonText}
                    modalTitle={videos.appSpecific.modalTitle}
                  />
                )}
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 hero-fade-in hero-stagger-4">
              {[
                { icon: '\ud83c\udf0d', label: trustBadges.languages, color: 'from-cyan-500/20 to-cyan-600/20' },
                { icon: '\ud83c\udfa8', label: trustBadges.images, color: 'from-purple-500/20 to-purple-600/20' },
                { icon: '\u2713', label: trustBadges.license, color: 'from-emerald-500/20 to-emerald-600/20' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${badge.color} border border-white/10 backdrop-blur-sm`}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm font-medium text-white/90">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Preview (CSS entrance, Framer Motion for mouse tracking) */}
          <div className="lg:col-span-5 relative hero-fade-in-right">
            {/* Glowing background effect */}
            <div
              className="absolute inset-0 blur-3xl opacity-50 glow-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)',
              }}
            />

            {/* Preview card with 3D effect */}
            <motion.div
              className="relative"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateX: mousePosition.y * 0.1,
                rotateY: mousePosition.x * 0.1,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            >
              {/* Main preview card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                {/* Gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl" />
                <div className="absolute inset-[2px] bg-[#1a1a2e] rounded-[14px] overflow-hidden">
                  {/* Browser-like header */}
                  <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] px-4 py-3 border-b border-white/10 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <div className="w-3 h-3 rounded-full bg-green-400/60" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-6 bg-white/5 rounded-lg border border-white/10 flex items-center px-3">
                        <svg className="w-3 h-3 text-white/30 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-xs text-white/40">lessoncraftstudio.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Image container */}
                  <div className="relative aspect-[4/3]">
                    {previewImageSrc ? (
                      <Image
                        src={previewImageSrc}
                        alt={`${title} preview`}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                        <div className="grid grid-cols-2 gap-4 p-8">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center"
                            >
                              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                {i}+{i}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/50 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 hero-pop-in-1">
                <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl p-5 shadow-2xl shadow-purple-500/20 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                      <span className="text-2xl emoji-wiggle">{'\u26a1'}</span>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{floatingStats.time}</p>
                      <p className="text-sm text-white/60">{floatingStats.action}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge - top left */}
              <div className="absolute -top-4 -left-4 hero-pop-in-2">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full px-4 py-2 shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-white">{floatingStats.quality}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2 scroll-indicator-ring">
          <div className="w-1.5 h-3 bg-white/60 rounded-full scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
}
