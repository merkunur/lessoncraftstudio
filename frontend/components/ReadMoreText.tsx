'use client';

import { useState } from 'react';
import { getSectionLabel } from '@/config/section-labels';

export default function ReadMoreText({
  text,
  locale,
  className = '',
  lines = 3,
  preserveWhitespace = false,
}: {
  text: string;
  locale: string;
  className?: string;
  lines?: number;
  preserveWhitespace?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const clampClass = lines === 3 ? 'line-clamp-3' : lines === 4 ? 'line-clamp-4' : 'line-clamp-5';

  return (
    <div>
      <div
        className={`${className} ${preserveWhitespace ? 'whitespace-pre-line' : ''} ${expanded ? '' : clampClass}`}
      >
        {text}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-amber-600 text-sm font-medium mt-1 hover:text-amber-700 transition-colors"
      >
        {expanded
          ? getSectionLabel('readLess', locale)
          : getSectionLabel('readMore', locale)}
      </button>
    </div>
  );
}
