'use client';

import { useState, useRef, useEffect } from 'react';
import { getSectionLabel } from '@/config/section-labels';

export default function ReadMoreText({
  text,
  locale,
  className = '',
  lines = 8,
  preserveWhitespace = false,
}: {
  text: string;
  locale: string;
  className?: string;
  lines?: number;
  preserveWhitespace?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(true);

  useEffect(() => {
    if (ref.current) {
      setIsClamped(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [text, lines]);

  const useInlineClamp = lines > 6;
  const clampClass = useInlineClamp
    ? ''
    : lines === 3 ? 'line-clamp-3' : lines === 4 ? 'line-clamp-4' : lines === 5 ? 'line-clamp-5' : 'line-clamp-6';
  const clampStyle = useInlineClamp && !expanded
    ? { display: '-webkit-box' as const, WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' as const }
    : undefined;

  return (
    <div>
      <div
        ref={ref}
        className={`${className} ${preserveWhitespace ? 'whitespace-pre-line' : ''} ${expanded ? '' : clampClass}`}
        style={clampStyle}
      >
        {text}
      </div>
      {(isClamped || expanded) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-amber-600 text-sm font-medium mt-1 hover:text-amber-700 transition-colors"
        >
          {expanded
            ? getSectionLabel('readLess', locale)
            : getSectionLabel('readMore', locale)}
        </button>
      )}
    </div>
  );
}
