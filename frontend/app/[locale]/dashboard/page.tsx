'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Sparkles, Crown, Zap, LogOut, Search, Filter, MessageSquare, CreditCard } from 'lucide-react';
import SubscriptionOverview from '@/components/dashboard/SubscriptionOverview';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier: string;
}

interface WorksheetGeneration {
  id: string;
  appName: string;
  generatedAt: string;
  configuration: any;
  watermarked: boolean;
}

interface WorksheetApp {
  name: string;
  url: string;
  icon: string;
  tier: 'free' | 'core' | 'full';
  category: string;
  description: string;
  translationKey: string;
}

const allApps: WorksheetApp[] = [
  // Free Tier (1 app with watermark)
  { name: 'Word Search', url: '/worksheet-generators/wordsearch.html', icon: '🔍', tier: 'free', category: 'Language', description: 'Create engaging word search puzzles', translationKey: 'wordSearch' },

  // Core Bundle (9 apps total)
  { name: 'Addition', url: '/worksheet-generators/addition.html', icon: '➕', tier: 'core', category: 'Math', description: 'Practice addition problems', translationKey: 'addition' },
  { name: 'Subtraction', url: '/worksheet-generators/subtraction.html', icon: '➖', tier: 'core', category: 'Math', description: 'Master subtraction skills', translationKey: 'subtraction' },
  { name: 'Alphabet Train', url: '/worksheet-generators/alphabet%20train.html', icon: '🚂', tier: 'core', category: 'Language', description: 'Fun alphabet learning', translationKey: 'alphabetTrain' },
  { name: 'Find and Count', url: '/worksheet-generators/find%20and%20count.html', icon: '🔢', tier: 'core', category: 'Math', description: 'Visual counting exercises', translationKey: 'findAndCount' },
  { name: 'Matching', url: '/worksheet-generators/matching.html', icon: '🎯', tier: 'core', category: 'Logic', description: 'Connect matching items', translationKey: 'matching' },
  { name: 'Crossword', url: '/worksheet-generators/crossword.html', icon: '📝', tier: 'core', category: 'Language', description: 'Custom crossword puzzles', translationKey: 'crossword' },
  { name: 'Sudoku', url: '/worksheet-generators/sudoku.html', icon: '🎲', tier: 'core', category: 'Logic', description: 'Number puzzle challenges', translationKey: 'sudoku' },
  { name: 'Coloring', url: '/worksheet-generators/coloring.html', icon: '🎨', tier: 'core', category: 'Art', description: 'Creative coloring sheets', translationKey: 'coloring' },
  { name: 'Math Worksheet', url: '/worksheet-generators/math%20worksheet.html', icon: '📐', tier: 'core', category: 'Math', description: 'Comprehensive math practice', translationKey: 'mathWorksheet' },

  // Full Access (33 apps total = 1 free + 9 core + 23 full)
  { name: 'Math Puzzle', url: '/worksheet-generators/math%20puzzle.html', icon: '🧮', tier: 'full', category: 'Math', description: 'Advanced math challenges', translationKey: 'mathPuzzle' },
  { name: 'Word Scramble', url: '/worksheet-generators/word%20scramble.html', icon: '🔤', tier: 'full', category: 'Language', description: 'Unscramble word games', translationKey: 'wordScramble' },
  { name: 'Chart Count', url: '/worksheet-generators/chart%20count.html', icon: '📊', tier: 'full', category: 'Math', description: 'Data and charting practice', translationKey: 'chartCount' },
  { name: 'Drawing Lines', url: '/worksheet-generators/drawing%20lines.html', icon: '✏️', tier: 'full', category: 'Art', description: 'Line drawing exercises', translationKey: 'drawingLines' },
  { name: 'Big Small', url: '/worksheet-generators/big%20small.html', icon: '📏', tier: 'full', category: 'Visual', description: 'Size comparison activities', translationKey: 'bigSmall' },
  { name: 'Code Addition', url: '/worksheet-generators/code%20addition.html', icon: '🔐', tier: 'full', category: 'Math', description: 'Decode addition problems', translationKey: 'codeAddition' },
  { name: 'Cryptogram', url: '/worksheet-generators/cryptogram.html', icon: '🗝️', tier: 'full', category: 'Language', description: 'Cipher word puzzles', translationKey: 'cryptogram' },
  { name: 'Draw and Color', url: '/worksheet-generators/draw%20and%20color.html', icon: '🖍️', tier: 'full', category: 'Art', description: 'Drawing and coloring combo', translationKey: 'drawAndColor' },
  { name: 'Find Objects', url: '/worksheet-generators/find%20objects.html', icon: '👀', tier: 'full', category: 'Visual', description: 'Hidden object games', translationKey: 'findObjects' },
  { name: 'Grid Match', url: '/worksheet-generators/grid%20match.html', icon: '⚡', tier: 'full', category: 'Logic', description: 'Pattern matching grids', translationKey: 'gridMatch' },
  { name: 'More Less', url: '/worksheet-generators/more%20less.html', icon: '⚖️', tier: 'full', category: 'Math', description: 'Compare quantities', translationKey: 'moreLess' },
  { name: 'Odd One Out', url: '/worksheet-generators/odd%20one%20out.html', icon: '🎭', tier: 'full', category: 'Logic', description: 'Find the different item', translationKey: 'oddOneOut' },
  { name: 'Picture Path', url: '/worksheet-generators/picture%20path.html', icon: '🗺️', tier: 'full', category: 'Visual', description: 'Follow visual pathways', translationKey: 'picturePath' },
  { name: 'Picture Sort', url: '/worksheet-generators/picture%20sort.html', icon: '📦', tier: 'full', category: 'Logic', description: 'Categorize images', translationKey: 'pictureSort' },
  { name: 'Prepositions', url: '/worksheet-generators/prepositions.html', icon: '📍', tier: 'full', category: 'Language', description: 'Position word practice', translationKey: 'prepositions' },
  { name: 'Treasure Hunt', url: '/worksheet-generators/treasure%20hunt.html', icon: '💎', tier: 'full', category: 'Game', description: 'Adventure-based learning', translationKey: 'treasureHunt' },
  { name: 'Word Guess', url: '/worksheet-generators/word%20guess.html', icon: '💭', tier: 'full', category: 'Language', description: 'Word guessing games', translationKey: 'wordGuess' },
  { name: 'Writing', url: '/worksheet-generators/writing.html', icon: '✍️', tier: 'full', category: 'Language', description: 'Handwriting practice sheets', translationKey: 'writing' },
  { name: 'Bingo', url: '/worksheet-generators/bingo.html', icon: '🎱', tier: 'full', category: 'Game', description: 'Custom bingo cards', translationKey: 'bingo' },
  { name: 'Shadow Match', url: '/worksheet-generators/shadow%20match.html', icon: '👥', tier: 'full', category: 'Visual', description: 'Match objects to shadows', translationKey: 'shadowMatch' },
  { name: 'Pattern Train', url: '/worksheet-generators/pattern%20train.html', icon: '🚆', tier: 'full', category: 'Logic', description: 'Pattern recognition practice', translationKey: 'patternTrain' },
  { name: 'Pattern Worksheet', url: '/worksheet-generators/pattern%20worksheet.html', icon: '🔷', tier: 'full', category: 'Logic', description: 'Complete pattern sequences', translationKey: 'patternWorksheet' },
  { name: 'Missing Pieces', url: '/worksheet-generators/missing%20pieces.html', icon: '🧩', tier: 'full', category: 'Logic', description: 'Find the missing pieces', translationKey: 'missingPieces' },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<WorksheetGeneration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('dashboard');
  const tCats = useTranslations('dashboard.categories');
  const tApps = useTranslations('dashboard.apps');
  const tTierNames = useTranslations('dashboard.tierNames');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/auth/signin');
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);
    fetchRecentGenerations(token);
  }, [router]);

  const fetchRecentGenerations = async (token: string) => {
    try {
      const response = await fetch('/api/users/me/generations?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRecentGenerations(data.generations || []);
      }
    } catch (error) {
      console.error('Failed to fetch generations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/auth/signin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-indigo-600 animate-pulse" />
        </div>
      </div>
    );
  }

  const getTierBadge = (tier: string) => {
    if (tier === 'free') return { color: 'bg-gradient-to-r from-green-400 to-emerald-500', text: tTierNames('free'), icon: Sparkles };
    if (tier === 'core') return { color: 'bg-gradient-to-r from-blue-500 to-indigo-600', text: tTierNames('core'), icon: Zap };
    return { color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500', text: tTierNames('full'), icon: Crown };
  };

  const filteredApps = allApps.filter(app => {
    const searchMatch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch = selectedCategory === 'all' || app.category === selectedCategory;
    return searchMatch && catMatch;
  });

  const categories = ['all', ...Array.from(new Set(allApps.map(app => app.category)))];

  const canAccess = (appTier: string) => {
    if (appTier === 'free') return true;
    if (user?.subscriptionTier === 'core') return appTier === 'free' || appTier === 'core';
    if (user?.subscriptionTier === 'full') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Elegant Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.firstName ? t('header.welcome', { name: user.firstName }) : t('header.welcomeFallback')}
                </h1>
                <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href={`/${locale}/dashboard/billing`}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">{t('header.billing')}</span>
              </Link>
              <Link
                href={`/${locale}/dashboard/support`}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">Support</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">{t('header.signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-purple-100 rounded-xl p-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {user?.subscriptionTier === 'free' ? '1' : user?.subscriptionTier === 'core' ? '10' : '33'}
                  </span>
                </div>
                <h3 className="text-gray-900 font-semibold">{t('stats.appsAvailable')}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('stats.inYourPlan')}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-rose-100 rounded-xl p-3">
                    <Crown className="h-6 w-6 text-rose-600" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                    {user?.subscriptionTier === 'free' ? tTierNames('free') : user?.subscriptionTier === 'core' ? tTierNames('core') : tTierNames('full')}
                  </span>
                </div>
                <h3 className="text-gray-900 font-semibold">{t('stats.currentPlan')}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('stats.yourMembership')}</p>
              </div>
            </div>

            {/* Worksheet Generators */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-4">{t('generators.title')}</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('generators.searchPlaceholder')}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-white/50 outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <select
                      className="pl-10 pr-8 py-3 rounded-xl border-0 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-white/50 outline-none appearance-none cursor-pointer min-w-[160px]"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? t('generators.categoryAll') : tCats(cat)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApps.map((app) => {
                    const hasAccess = canAccess(app.tier);
                    const badge = getTierBadge(app.tier);
                    const BadgeIcon = badge.icon;

                    return (
                      <div
                        key={app.name}
                        className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 transition-all duration-300 ${
                          hasAccess
                            ? 'border-gray-200 hover:border-indigo-400 hover:shadow-2xl cursor-pointer transform hover:-translate-y-1'
                            : 'border-gray-200 opacity-60'
                        }`}
                        onClick={() => hasAccess && window.open(`${app.url}?tier=${user?.subscriptionTier || 'free'}&locale=${locale}`, '_blank')}
                      >
                        {/* Tier Badge */}
                        <div className={`absolute -top-3 -right-3 ${badge.color} rounded-xl px-3 py-1 shadow-lg flex items-center space-x-1`}>
                          <BadgeIcon className="h-3 w-3 text-white" />
                          <span className="text-xs font-bold text-white">{badge.text}</span>
                        </div>

                        {/* Icon */}
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4 text-3xl group-hover:scale-110 transition-transform duration-300">
                          {app.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={tApps(`${app.translationKey}.name`)}>{tApps(`${app.translationKey}.name`)}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={tApps(`${app.translationKey}.description`)}>{tApps(`${app.translationKey}.description`)}</p>

                        {/* Category */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            {tCats(app.category)}
                          </span>
                          {hasAccess && (
                            <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm font-medium">{t('generators.open')}</span>
                            </div>
                          )}
                        </div>

                        {/* Lock Icon */}
                        {!hasAccess && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white rounded-full p-4 shadow-xl border-2 border-gray-200">
                              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {filteredApps.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">{t('generators.noResults')}</p>
                    <p className="text-sm text-gray-400 mt-2">{t('generators.tryAdjusting')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            <SubscriptionOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
