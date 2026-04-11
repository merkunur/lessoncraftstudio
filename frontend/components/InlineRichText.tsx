'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ReadMoreText from './ReadMoreText';
import { isValidInternalLink, resolveInternalLinkSlug } from '@/lib/resolve-internal-link';

interface InlineRichTextProps {
  text: string;
  locale: string;
  className?: string;
  lines?: number;
  preserveWhitespace?: boolean;
}

const LINK_RE = /\[([^\]\n]+)\]\((\/[^)\s]+)\)/g;

const PAGE_TYPE_BY_SEGMENT: Record<string, string> = {
  tools: 'tool',
  guides: 'guide',
  blog: 'blog',
  apps: 'app',
  bundles: 'bundle',
  start: 'start',
  ideas: 'idea',
};

const LINK_CLASS =
  'text-emerald-700 font-medium underline underline-offset-2 decoration-emerald-300 hover:text-emerald-900 hover:decoration-emerald-500 transition-colors';

export default function InlineRichText({
  text,
  locale,
  className = '',
  lines = 8,
  preserveWhitespace = false,
}: InlineRichTextProps) {
  if (!text.includes('](/')) {
    return (
      <ReadMoreText
        text={text}
        locale={locale}
        className={className}
        lines={lines}
        preserveWhitespace={preserveWhitespace}
      />
    );
  }

  const children: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    const [full, anchor, path] = match;
    const start = match.index;

    if (start > lastIndex) {
      children.push(text.slice(lastIndex, start));
    }

    const firstSegment = path.split('/')[1] ?? '';
    const restSegments = path.split('/').slice(2).join('/');
    const pageType = PAGE_TYPE_BY_SEGMENT[firstSegment];

    let rendered: ReactNode = anchor;
    if (pageType && restSegments && isValidInternalLink(pageType, restSegments)) {
      const resolved = resolveInternalLinkSlug(pageType, restSegments, locale) ?? restSegments;
      const href = `/${locale}/${firstSegment}/${resolved}`;
      rendered = (
        <Link key={`l-${keyCounter}`} href={href} className={LINK_CLASS}>
          {anchor}
        </Link>
      );
    }

    children.push(rendered);
    lastIndex = start + full.length;
    keyCounter += 1;
  }

  if (lastIndex < text.length) {
    children.push(text.slice(lastIndex));
  }

  return (
    <ReadMoreText
      text={text}
      locale={locale}
      className={className}
      lines={lines}
      preserveWhitespace={preserveWhitespace}
    >
      {children}
    </ReadMoreText>
  );
}
