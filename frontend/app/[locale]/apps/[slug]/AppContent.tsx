'use client';

import { useState } from 'react';

interface AppContentProps {
  appSlug: string;
  locale: string;
  appName: string;
  requiredTier?: string;
}

// Map app slugs to HTML files
const appFileMap: Record<string, string> = {
  'word-search': 'wordsearch.html',
  'image-addition': 'addition.html',
  'alphabet-train': 'alphabet train.html',
  'coloring': 'coloring.html',
  'math-worksheet': 'math worksheet.html',
  'word-scramble': 'word scramble.html',
  'find-and-count': 'find and count.html',
  'matching-app': 'matching.html',
  'drawing-lines': 'drawing lines.html',
  'picture-bingo': 'bingo.html',
  'sudoku': 'sudoku.html',
  'big-small-app': 'big small.html',
  'chart-count-color': 'chart count.html',
  'code-addition': 'code addition.html',
  'draw-and-color': 'draw and color.html',
  'find-objects': 'find objects.html',
  'grid-match': 'grid match.html',
  'image-crossword': 'crossword.html',
  'image-cryptogram': 'cryptogram.html',
  'math-puzzle': 'math puzzle.html',
  'missing-pieces': 'missing pieces.html',
  'more-less': 'more less.html',
  'odd-one-out': 'odd one out.html',
  'pattern-train': 'pattern train.html',
  'pattern-worksheet': 'pattern worksheet.html',
  'picture-path': 'picture path.html',
  'picture-sort': 'picture sort.html',
  'prepositions': 'prepositions.html',
  'shadow-match': 'shadow match.html',
  'story-dice': 'story-dice.html',
  'subtraction': 'subtraction.html',
  'treasure-hunt': 'treasure hunt.html',
  'word-guess': 'word guess.html',
  'writing-app': 'writing.html',
};

export default function AppContent({ appSlug, locale, appName }: AppContentProps) {
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [iframeKey, setIframeKey] = useState(0);

  const htmlFile = appFileMap[appSlug] || `${appSlug}.html`;
  const iframeUrl = `/worksheet-generators/${encodeURIComponent(htmlFile)}?locale=${selectedLocale}&tier=free`;

  return (
    <div className="app-content-container">
      <div className="app-iframe-container">
        <iframe
          key={iframeKey}
          src={iframeUrl}
          className="w-full h-full border-0"
          title={appName}
        />
      </div>

      <style jsx>{`
        .app-content-container {
          height: 100%;
          min-height: 400px;
          width: 100%;
          background-color: #f5f5f5;
          overflow: hidden;
        }

        .app-iframe-container {
          width: 100%;
          height: 100%;
          background-color: white;
        }

        @media (max-width: 640px) {
          .app-content-container {
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
