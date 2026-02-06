'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';

type AppTier = 'free' | 'core' | 'full';

interface App {
  id: string;
  name: string;
  tier: AppTier;
  category: string;
  icon: string;
  popular?: boolean;
}

interface AppCardProps {
  app: App;
  locale: string;
  appName: string;
  categoryName: string;
}

// Helper function to get the product page slug for an app in a specific locale
function getProductSlug(appId: string, locale: string): string {
  return getSlugForLocale(appId, locale as SupportedLocale) || appIdToProductSlug[appId] || appId;
}

// Legacy: Map app IDs to default (English) product page slugs
// Used as fallback when locale-specific slug is not available
const appIdToProductSlug: { [key: string]: string } = {
  'word-search': 'word-search-worksheets',
  'image-addition': 'addition-worksheets',
  'alphabet-train': 'alphabet-train-worksheets',
  'coloring': 'coloring-worksheets',
  'math-worksheet': 'math-worksheets',
  'word-scramble': 'word-scramble-worksheets',
  'find-and-count': 'find-and-count-worksheets',
  'matching-app': 'matching-worksheets',
  'drawing-lines': 'drawing-lines-worksheets',
  'picture-bingo': 'picture-bingo-worksheets',
  'sudoku': 'sudoku-worksheets',
  'big-small-app': 'big-small-worksheets',
  'chart-count-color': 'chart-count-worksheets',
  'code-addition': 'code-addition-worksheets',
  'draw-and-color': 'draw-and-color-worksheets',
  'find-objects': 'find-objects-worksheets',
  'grid-match': 'grid-match-worksheets',
  'image-crossword': 'crossword-worksheets',
  'image-cryptogram': 'cryptogram-worksheets',
  'math-puzzle': 'math-puzzle-worksheets',
  'missing-pieces': 'missing-pieces-worksheets',
  'more-less': 'more-less-worksheets',
  'odd-one-out': 'odd-one-out-worksheets',
  'pattern-train': 'pattern-train-worksheets',
  'pattern-worksheet': 'pattern-worksheets',
  'picture-path': 'picture-path-worksheets',
  'picture-sort': 'picture-sort-worksheets',
  'prepositions': 'prepositions-worksheets',
  'shadow-match': 'shadow-match-worksheets',
  'subtraction': 'subtraction-worksheets',
  'treasure-hunt': 'treasure-hunt-worksheets',
  'word-guess': 'word-guess-worksheets',
  'writing-app': 'writing-worksheets',
};

// Map app slugs to HTML filenames
const slugToHtmlMap: { [key: string]: string } = {
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
  'subtraction': 'subtraction.html',
  'treasure-hunt': 'treasure hunt.html',
  'word-guess': 'word guess.html',
  'writing-app': 'writing.html'
};

export default function AppCard({ app, locale, appName, categoryName }: AppCardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

  // Check if user has access to this app
  // Calculate access immediately when user data is available, even during loading
  // This ensures tier recognition works right after sign-in without requiring a page refresh
  // If subscription tier changes after API verification, this will recalculate automatically
  useEffect(() => {
    console.log('[AppCard] Access check:', {
      appName: app.name,
      appTier: app.tier,
      userTier: user?.subscriptionTier,
      loading,
      user: user ? 'exists' : 'null'
    });
    const tierHierarchy = { free: 0, core: 1, full: 2 };
    const userTierLevel = tierHierarchy[user?.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requiredTierLevel = tierHierarchy[app.tier as keyof typeof tierHierarchy] || 0;
    const hasAccessValue = userTierLevel >= requiredTierLevel;
    console.log('[AppCard] Setting hasAccess to:', hasAccessValue);
    setHasAccess(hasAccessValue);
  }, [user?.subscriptionTier, app.tier, loading]);

  const tierColors: Record<AppTier, string> = {
    free: 'border-green-500 bg-green-50',
    core: 'border-blue-500 bg-blue-50',
    full: 'border-purple-500 bg-purple-50'
  };

  const tierBadgeColors: Record<AppTier, string> = {
    free: 'bg-green-500 text-white',
    core: 'bg-blue-500 text-white',
    full: 'bg-purple-500 text-white'
  };

  const getTierLabel = () => {
    if (locale === 'de') return app.tier === 'free' ? 'Kostenlos' : app.tier === 'core' ? 'Basis' : 'Voll';
    if (locale === 'fr') return app.tier === 'free' ? 'Gratuit' : app.tier === 'core' ? 'Essentiel' : 'Complet';
    if (locale === 'es') return app.tier === 'free' ? 'Gratis' : app.tier === 'core' ? 'Esencial' : 'Completo';
    if (locale === 'it') return app.tier === 'free' ? 'Gratuito' : app.tier === 'core' ? 'Essenziale' : 'Completo';
    if (locale === 'pt') return app.tier === 'free' ? 'Gratuito' : app.tier === 'core' ? 'Essencial' : 'Completo';
    if (locale === 'nl') return app.tier === 'free' ? 'Gratis' : app.tier === 'core' ? 'Basis' : 'Volledig';
    if (locale === 'sv') return app.tier === 'free' ? 'Gratis' : app.tier === 'core' ? 'Bas' : 'Full';
    if (locale === 'da') return app.tier === 'free' ? 'Gratis' : app.tier === 'core' ? 'Kerne' : 'Fuld';
    if (locale === 'no') return app.tier === 'free' ? 'Gratis' : app.tier === 'core' ? 'Kjerne' : 'Full';
    if (locale === 'fi') return app.tier === 'free' ? 'Ilmainen' : app.tier === 'core' ? 'Perus' : 'Täysi';
    return app.tier;
  };

  const getPopularLabel = () => {
    if (locale === 'de') return 'Beliebt';
    if (locale === 'fr') return 'Populaire';
    if (locale === 'es') return 'Popular';
    if (locale === 'it') return 'Popolare';
    if (locale === 'pt') return 'Popular';
    if (locale === 'nl') return 'Populair';
    if (locale === 'sv') return 'Populär';
    if (locale === 'da') return 'Populær';
    if (locale === 'no') return 'Populær';
    if (locale === 'fi') return 'Suosittu';
    return 'Popular';
  };

  // "Learn More" button translations - natural phrasing for each language
  const getLearnMoreLabel = () => {
    if (locale === 'de') return 'Mehr erfahren';
    if (locale === 'fr') return 'En savoir plus';
    if (locale === 'es') return 'Más información';
    if (locale === 'it') return 'Scopri di più';
    if (locale === 'pt') return 'Saiba mais';
    if (locale === 'nl') return 'Meer informatie';
    if (locale === 'sv') return 'Läs mer';
    if (locale === 'da') return 'Læs mere';
    if (locale === 'no') return 'Les mer';
    if (locale === 'fi') return 'Lue lisää';
    return 'Learn More';
  };

  const handleClick = () => {
    // If loading, do nothing
    if (loading) return;

    const htmlFile = slugToHtmlMap[app.id];

    if (hasAccess && htmlFile) {
      // User has access - open worksheet generator with tier parameter
      const userTier = user?.subscriptionTier || 'free';
      window.open(`/worksheet-generators/${encodeURIComponent(htmlFile)}?tier=${userTier}&locale=${locale}`, '_blank');
    } else {
      // User doesn't have access - navigate to product page (use locale-specific slug if available)
      const productSlug = getProductSlug(app.id, locale);
      router.push(`/${locale}/apps/${productSlug}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-6 rounded-lg border-2 ${tierColors[app.tier]} hover:shadow-lg transition-all duration-200 cursor-pointer h-full`}
    >
      {app.popular && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          {getPopularLabel()}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{app.icon}</div>
        <span className={`text-xs px-2 py-1 rounded ${tierBadgeColors[app.tier]} uppercase font-semibold`}>
          {getTierLabel()}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{appName}</h3>
      <p className="text-sm text-gray-600 mb-4">{categoryName}</p>

      {/* Learn More button - links to SEO-optimized product page (uses locale-specific slug) */}
      <Link
        href={`/${locale}/apps/${getProductSlug(app.id, locale)}`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
      >
        {getLearnMoreLabel()}
        <svg
          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
