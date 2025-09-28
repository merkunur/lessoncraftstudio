'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AppContentProps {
  appSlug: string;
  locale: string;
  appName: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'da', name: 'Dansk' },
  { code: 'no', name: 'Norsk' },
  { code: 'fi', name: 'Suomi' }
];

export default function AppContent({ appSlug, locale, appName }: AppContentProps) {
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [iframeKey, setIframeKey] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Map app slugs to HTML files
  const appFileMap: { [key: string]: string } = {
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
    'writing-app': 'writing.html'
  };

  const handleLanguageChange = (newLocale: string) => {
    setSelectedLocale(newLocale);
    // Force iframe reload with new locale
    setIframeKey(prev => prev + 1);
  };

  // Get the HTML file name for the app
  const htmlFile = appFileMap[appSlug] || `${appSlug}.html`;
  
  // Build the iframe URL with locale parameter - encode the filename to handle spaces
  const iframeUrl = `/worksheet-generators/${encodeURIComponent(htmlFile)}?locale=${selectedLocale}`;

  // Check if this is the writing app (English only)
  const isWritingApp = appSlug === 'writing-app';

  return (
    <div className="app-content-container">
      {/* App iframe */}
      <div className="app-iframe-container">
        <iframe
          key={iframeKey}
          src={iframeUrl}
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 120px)' }}
          title={appName}
        />
      </div>

      <style jsx>{`
        .app-content-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .app-iframe-container {
          width: 100%;
          height: calc(100vh - 60px);
          background-color: white;
        }

        ${isWritingApp ? `
          .app-iframe-container {
            height: 100vh;
          }
        ` : ''}
      `}</style>
    </div>
  );
}