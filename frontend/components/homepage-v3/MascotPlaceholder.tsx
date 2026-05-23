/* MascotPlaceholder — friendly elephant silhouette used as a layout
   placeholder while the real elephant character art is being commissioned.

   The silhouette geometry is pose-neutral on purpose: rounded body, ear,
   trunk, two legs visible. Friendly enough that the layout composes
   correctly; obviously a placeholder (low opacity sage fill + monospace
   "MASCOT • elephant • pose TBD" caption) so it doesn't accidentally
   ship as final art.

   Slots: hero | transition | signup. Each slot has its own size + tone.
   Marked with data-mascot-slot="<slot>" for ease of finding/swapping later. */

type MascotSize = 'hero' | 'transition' | 'signup';
type MascotTone = 'sage' | 'cream' | 'teal-soft';

interface MascotPlaceholderProps {
  size?: MascotSize;
  fillTone?: MascotTone;
  poseHint?: string;       // appears in the caption: "pose: <hint>"
  className?: string;
  flip?: boolean;          // horizontal mirror
}

const SIZE_PX: Record<MascotSize, number> = {
  hero: 280,
  transition: 320,
  signup: 220,
};

const TONE_FILL: Record<MascotTone, string> = {
  sage: '#A8B79B',
  cream: '#F5EFDF',
  'teal-soft': '#E3EEEB',
};

export default function MascotPlaceholder({
  size = 'hero',
  fillTone = 'sage',
  poseHint = 'TBD',
  className = '',
  flip = false,
}: MascotPlaceholderProps) {
  const heightPx = SIZE_PX[size];
  const fill = TONE_FILL[fillTone];

  // Caption color matches the surrounding ground — caller decides via className
  // (text-lcs-teal/60 on cream, text-lcs-cream/80 on teal).
  return (
    <div
      data-mascot-slot={size}
      className={`hv3-mascot-slot inline-flex flex-col items-center select-none ${className}`}
      style={{ width: heightPx, maxWidth: '100%' }}
      aria-hidden="true"
    >
      {/* Elephant silhouette — pose-neutral. Friendly proportions: large
          head, rounded body, big floppy ear, gentle trunk, two visible
          stocky legs. */}
      <svg
        viewBox="0 0 240 240"
        width="100%"
        height="auto"
        style={{
          transform: flip ? 'scaleX(-1)' : undefined,
          filter: 'drop-shadow(0 8px 18px rgba(20, 107, 94, 0.18))',
        }}
        className="hv3-mascot-silhouette"
      >
        {/* Body — chunky rounded pear shape */}
        <path
          d="M 60 165
             C 50 140, 50 100, 75 85
             C 100 65, 140 60, 165 75
             C 195 90, 200 130, 188 160
             C 195 175, 200 195, 190 205
             C 180 215, 165 210, 158 200
             C 145 205, 120 207, 105 202
             C 95 215, 75 215, 65 205
             C 55 198, 55 180, 60 165 Z"
          fill={fill}
          opacity="0.78"
        />
        {/* Head — big rounded ear merged into body */}
        <path
          d="M 70 100
             C 55 95, 45 75, 55 60
             C 65 45, 90 45, 100 55
             C 100 70, 90 90, 78 100 Z"
          fill={fill}
          opacity="0.78"
        />
        {/* Inner ear shadow */}
        <path
          d="M 70 90
             C 62 85, 60 75, 68 67
             C 78 60, 88 65, 88 75
             C 88 82, 80 90, 70 90 Z"
          fill={fill}
          opacity="0.4"
        />
        {/* Trunk — curving down + small curl at tip */}
        <path
          d="M 100 100
             C 95 130, 100 155, 120 165
             C 130 170, 138 168, 140 158
             C 138 152, 128 150, 124 155
             C 122 152, 122 145, 130 142
             C 142 138, 152 145, 150 158
             C 148 175, 130 182, 115 178
             C 88 170, 78 140, 88 105
             C 90 95, 96 92, 100 100 Z"
          fill={fill}
          opacity="0.78"
        />
        {/* Tiny eye dot — keeps the silhouette friendly */}
        <circle cx="92" cy="78" r="3.5" fill={fill} opacity="0.95" />
        {/* Legs — two visible front+back */}
        <rect x="85" y="190" width="22" height="32" rx="6" fill={fill} opacity="0.78" />
        <rect x="155" y="190" width="22" height="32" rx="6" fill={fill} opacity="0.78" />
        {/* Tail — tiny stroke */}
        <path
          d="M 192 165 C 200 168, 206 172, 205 178"
          fill="none"
          stroke={fill}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.78"
        />
      </svg>

      {/* Caption label — monospace, clearly a placeholder. */}
      <div className="hv3-mascot-caption mt-2 text-center leading-tight">
        <span className="block opacity-80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-lcs-coral mr-1.5 align-middle" />
          MASCOT • elephant
        </span>
        <span className="block opacity-60 mt-0.5">pose: {poseHint}</span>
      </div>
    </div>
  );
}
