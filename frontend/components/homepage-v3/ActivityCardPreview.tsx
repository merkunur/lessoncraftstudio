/* ActivityCardPreview — a faux Direction A activity card, rendered inline
   on the homepage prototype. The real activity card lives in lcs-shell.css
   served from /var/www/lcs-media/mini-tools/. We can't iframe it inside the
   hero (too heavy + iframe chrome looks wrong at preview scale), so we
   replicate the look in JSX/CSS using the same palette + dual-shadow.

   Two variants:
   - "compact" (default): smaller, used in hero. Single-language render.
   - "full": Pillar 1 showcase. Larger; same shape; richer detail. */

import type { CSSProperties } from 'react';

export interface ActivityCardPreviewProps {
  variant?: 'compact' | 'full';
  /* Header */
  title: string;          // e.g. "Constructeur de syllabes"
  prompt: string;         // e.g. "Touche les syllabes dans l'ordre…"
  /* Visual subject */
  subjectEmoji?: string;  // simple fallback when no image
  subjectImg?: string;    // optional path
  subjectAlt?: string;
  /* Tiles + slots */
  tiles: string[];        // e.g. ["tor","tue"]
  slotsFilled?: boolean;  // when true, slots show the tiles (post-check); when false, empty
  filledOrder?: string[]; // ordered fill of slots (if slotsFilled)
  /* Chrome */
  ccCode: string;         // e.g. "RF.K.2.B"
  gradeLabel: string;     // e.g. "Grande section" or "Maternelle"
  checkLabel: string;     // e.g. "Vérifier"
  /* Floating language chip on header */
  langChip?: string;      // e.g. "FR"
  /* Outer tilt for hero anchor */
  tilt?: number;          // degrees
  /* Float animation */
  float?: boolean;
  className?: string;
}

export default function ActivityCardPreview({
  variant = 'compact',
  title,
  prompt,
  subjectEmoji = '🐢',
  subjectImg,
  subjectAlt = '',
  tiles,
  slotsFilled = false,
  filledOrder,
  ccCode,
  gradeLabel,
  checkLabel,
  langChip,
  tilt = 0,
  float = false,
  className = '',
}: ActivityCardPreviewProps) {
  const tiltStyle = tilt
    ? ({ '--rot': `${tilt}deg`, transform: `rotate(${tilt}deg)` } as CSSProperties & Record<string, string>)
    : {};

  const sizes = variant === 'full'
    ? {
        outerPad: 'p-8 md:p-10',
        titleSize: 'text-xl md:text-2xl',
        promptSize: 'text-base md:text-lg',
        subjectSize: 'text-7xl md:text-8xl',
        subjectImg: 'w-32 md:w-40',
        tileSize: 'h-14 md:h-16 px-5 md:px-6',
        slotSize: 'h-14 md:h-16 px-5 md:px-6',
        gap: 'gap-3 md:gap-4',
        cardClass: 'hv3-card-deep',
      }
    : {
        outerPad: 'p-5 md:p-6',
        titleSize: 'text-base md:text-lg',
        promptSize: 'text-sm md:text-base',
        subjectSize: 'text-5xl md:text-6xl',
        subjectImg: 'w-20 md:w-24',
        tileSize: 'h-10 md:h-11 px-3 md:px-4',
        slotSize: 'h-10 md:h-11 px-3 md:px-4',
        gap: 'gap-2 md:gap-3',
        cardClass: 'hv3-card',
      };

  const fillForSlot = (idx: number): string | null => {
    if (!slotsFilled) return null;
    const arr = filledOrder ?? tiles;
    return arr[idx] ?? null;
  };

  return (
    <div
      className={`${className} ${float ? 'hv3-float' : ''}`}
      style={tiltStyle}
    >
      <div className={`${sizes.cardClass} ${sizes.outerPad} relative`}>
        {/* Header row: title (left) + small chrome icons (right) */}
        <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
          <h3 className={`font-lcsDisplay font-semibold ${sizes.titleSize} text-lcs-teal leading-tight tracking-tight`}>
            {title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            {langChip && (
              <span className="hv3-locale-chip hv3-locale-chip-active">{langChip}</span>
            )}
            {/* settings/fullscreen icon placeholders, matching real chrome */}
            <span
              className="w-6 h-6 rounded-full bg-lcs-teal/10 inline-flex items-center justify-center"
              aria-hidden="true"
            >
              <svg className="w-3.5 h-3.5 text-lcs-teal" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                <circle cx="8" cy="13" r="1.2" fill="currentColor" />
              </svg>
            </span>
            <span
              className="w-6 h-6 rounded-full bg-lcs-teal/10 inline-flex items-center justify-center"
              aria-hidden="true"
            >
              <svg className="w-3.5 h-3.5 text-lcs-teal" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 3h4M3 3v4M13 3h-4M13 3v4M3 13h4M3 13v-4M13 13h-4M13 13v-4" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Prompt */}
        <p className={`font-lcsBody ${sizes.promptSize} text-lcs-teal/85 leading-relaxed mb-5 md:mb-6`}>
          {prompt}
        </p>

        {/* Subject */}
        <div className="flex justify-center items-center mb-5 md:mb-6 min-h-[80px] md:min-h-[120px]">
          {subjectImg ? (
            <img
              src={subjectImg}
              alt={subjectAlt}
              className={`${sizes.subjectImg} h-auto block`}
            />
          ) : (
            <span className={`${sizes.subjectSize} leading-none select-none`} aria-hidden="true">
              {subjectEmoji}
            </span>
          )}
        </div>

        {/* Slots row */}
        <div className={`flex justify-center items-center ${sizes.gap} mb-3 md:mb-4`}>
          {tiles.map((_, i) => {
            const fill = fillForSlot(i);
            return (
              <div
                key={`slot-${i}`}
                className={`hv3-slot ${sizes.slotSize} flex items-center justify-center min-w-[80px] md:min-w-[100px]`}
              >
                {fill && (
                  <span className="font-lcsDisplay font-semibold text-lcs-teal text-lg md:text-xl">
                    {fill}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Tile palette row (greyed when slotsFilled) */}
        <div className={`flex justify-center items-center ${sizes.gap} mb-6 md:mb-7`}>
          {tiles.map((t, i) => (
            <div
              key={`tile-${i}`}
              className={`hv3-tile ${sizes.tileSize} flex items-center justify-center min-w-[60px] md:min-w-[72px] ${slotsFilled ? 'opacity-35' : ''}`}
            >
              <span className="font-lcsDisplay font-semibold text-lcs-teal text-base md:text-lg">
                {t}
              </span>
            </div>
          ))}
        </div>

        {/* Check button */}
        <div className="flex justify-center">
          <button
            type="button"
            className={`hv3-cta-coral font-lcsDisplay font-semibold ${variant === 'full' ? 'text-lg md:text-xl px-8 py-3 md:py-3.5' : 'text-base px-6 py-2.5'}`}
            tabIndex={-1}
            aria-hidden="true"
          >
            {checkLabel}
          </button>
        </div>

        {/* CC code chip + grade label — bottom corner */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
          <span className="hv3-code-chip">{gradeLabel}</span>
          <span className="hv3-code-chip hv3-code-chip-mono">{ccCode}</span>
        </div>
      </div>
    </div>
  );
}
