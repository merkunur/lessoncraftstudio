/* Mascot — friendly elephant character, real art (10 poses) in
   /public/mascot/. Pose hint maps to a PNG; size/tone props left for
   API compat with the prior placeholder; caption removed (real art
   doesn't need a "placeholder" label).

   Slots: hero | transition | signup. Each gets its own size + pose. */

import Image from 'next/image';

type MascotSize = 'hero' | 'transition' | 'signup' | 'inline';
type MascotTone = 'sage' | 'cream' | 'teal-soft';

type MascotPose =
  | 'greeting'
  | 'idle'
  | 'explaining'
  | 'emphasizing'
  | 'explain-showing-left'
  | 'explain-showing-right'
  | 'point-left'
  | 'point-right'
  | 'showing-down-left'
  | 'showing-down-right';

interface MascotPlaceholderProps {
  size?: MascotSize;
  fillTone?: MascotTone; // unused on real art; kept for API compat
  /** Either a known pose key OR free text (back-compat fallback to greeting). */
  poseHint?: MascotPose | string;
  className?: string;
  flip?: boolean;
  alt?: string;
}

const SIZE_PX: Record<MascotSize, number> = {
  hero: 360,
  transition: 420,
  signup: 280,
  inline: 200,
};

const POSE_FALLBACK: Record<string, MascotPose> = {
  welcoming: 'greeting',
  waving: 'greeting',
  wave: 'greeting',
  bridging: 'explain-showing-right',
  pointing: 'point-right',
  TBD: 'idle',
};

function resolvePose(hint: string | undefined): MascotPose {
  if (!hint) return 'greeting';
  const knownPoses: MascotPose[] = [
    'greeting', 'idle', 'explaining', 'emphasizing',
    'explain-showing-left', 'explain-showing-right',
    'point-left', 'point-right',
    'showing-down-left', 'showing-down-right',
  ];
  if (knownPoses.includes(hint as MascotPose)) return hint as MascotPose;
  return POSE_FALLBACK[hint] || 'greeting';
}

export default function MascotPlaceholder({
  size = 'hero',
  fillTone: _fillTone,
  poseHint,
  className = '',
  flip = false,
  alt = 'Friendly elephant mascot',
}: MascotPlaceholderProps) {
  const pose = resolvePose(poseHint);
  const heightPx = SIZE_PX[size];
  const src = `/mascot/${pose}.png`;

  return (
    <div
      data-mascot-slot={size}
      data-mascot-pose={pose}
      className={`hv3-mascot-slot inline-flex select-none ${className}`}
      style={{ width: heightPx, maxWidth: '100%' }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={600}
        priority={size === 'hero'}
        style={{
          width: '100%',
          height: 'auto',
          transform: flip ? 'scaleX(-1)' : undefined,
          filter: 'drop-shadow(0 18px 24px rgba(0, 0, 0, 0.22))',
        }}
        className="hv3-mascot-img"
      />
    </div>
  );
}
