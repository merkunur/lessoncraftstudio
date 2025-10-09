'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

interface AppContentProps {
  appSlug: string;
  locale: string;
  appName: string;
  requiredTier: 'free' | 'core' | 'full';
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

export default function AppContent({ appSlug, locale, appName, requiredTier }: AppContentProps) {
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [iframeKey, setIframeKey] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

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

  // Check if user has access to this tier
  const userTier = user?.subscriptionTier || 'free';
  const canAccess = () => {
    if (requiredTier === 'free') return true;
    if (userTier === 'core') return requiredTier === 'core';
    if (userTier === 'full') return true;
    return false;
  };

  // Get the HTML file name for the app
  const htmlFile = appFileMap[appSlug] || `${appSlug}.html`;

  // Build the iframe URL with locale AND tier parameters - encode the filename to handle spaces
  const iframeUrl = `/worksheet-generators/${encodeURIComponent(htmlFile)}?locale=${selectedLocale}&tier=${userTier}`;

  // Check if this is the writing app (English only)
  const isWritingApp = appSlug === 'writing-app';

  // If user doesn't have access, show upgrade message
  if (!canAccess()) {
    return (
      <div className="app-content-container">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade Required</h2>
              <p className="text-gray-600">
                This app requires a <span className="font-semibold text-blue-600">{requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}</span> subscription or higher.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-500">Your current plan: <strong>{userTier.charAt(0).toUpperCase() + userTier.slice(1)}</strong></p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/${locale}/pricing`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Upgrade Now
              </Link>
              <Link
                href={`/${locale}/dashboard`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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