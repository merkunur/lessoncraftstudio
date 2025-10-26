'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';

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
    const tierHierarchy = { free: 0, core: 1, full: 2 };
    const userTierLevel = tierHierarchy[user?.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requiredTierLevel = tierHierarchy[app.tier as keyof typeof tierHierarchy] || 0;
    setHasAccess(userTierLevel >= requiredTierLevel);
  }, [user?.subscriptionTier, app.tier]);

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

  const getUpgradeLabel = () => {
    if (locale === 'de') return 'Upgrade';
    if (locale === 'fr') return 'Premium';
    if (locale === 'es') return 'Premium';
    if (locale === 'it') return 'Premium';
    if (locale === 'pt') return 'Premium';
    if (locale === 'nl') return 'Upgrade';
    if (locale === 'sv') return 'Uppgradera';
    if (locale === 'da') return 'Opgrader';
    if (locale === 'no') return 'Oppgrader';
    if (locale === 'fi') return 'Päivitä';
    return 'Upgrade';
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
      // User doesn't have access - navigate to app page to show paywall
      router.push(`/${locale}/apps/${app.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-6 rounded-lg border-2 ${tierColors[app.tier]} hover:shadow-lg transition-all duration-200 cursor-pointer h-full ${!hasAccess && !loading ? 'opacity-75' : ''}`}
    >
      {app.popular && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          {getPopularLabel()}
        </div>
      )}

      {!hasAccess && !loading && (
        <div className="absolute -top-2 -left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          🔒 {getUpgradeLabel()}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{app.icon}</div>
        <span className={`text-xs px-2 py-1 rounded ${tierBadgeColors[app.tier]} uppercase font-semibold`}>
          {getTierLabel()}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{appName}</h3>
      <p className="text-sm text-gray-600">{categoryName}</p>
    </div>
  );
}
