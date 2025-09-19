'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
}

const allApps: WorksheetApp[] = [
  // Free Tier (3 apps)
  { name: 'Word Search', url: '/worksheet-generators/wordsearch.html', icon: '🔍', tier: 'free', category: 'Language' },
  { name: 'Addition', url: '/worksheet-generators/addition.html', icon: '➕', tier: 'free', category: 'Math' },
  { name: 'Coloring', url: '/worksheet-generators/coloring.html', icon: '🎨', tier: 'free', category: 'Art' },

  // Core Bundle (7 more apps = 10 total)
  { name: 'Subtraction', url: '/worksheet-generators/subtraction.html', icon: '➖', tier: 'core', category: 'Math' },
  { name: 'Alphabet Train', url: '/worksheet-generators/alphabet%20train.html', icon: '🚂', tier: 'core', category: 'Language' },
  { name: 'Find and Count', url: '/worksheet-generators/find%20and%20count.html', icon: '🔢', tier: 'core', category: 'Math' },
  { name: 'Matching', url: '/worksheet-generators/matching.html', icon: '🎯', tier: 'core', category: 'Logic' },
  { name: 'Crossword', url: '/worksheet-generators/crossword.html', icon: '📝', tier: 'core', category: 'Language' },
  { name: 'Sudoku', url: '/worksheet-generators/sudoku.html', icon: '🎲', tier: 'core', category: 'Logic' },
  { name: 'Shadow Match', url: '/worksheet-generators/shadow%20match.html', icon: '👥', tier: 'core', category: 'Visual' },

  // Full Access (23 more apps = 33 total)
  { name: 'Math Puzzle', url: '/worksheet-generators/math%20puzzle.html', icon: '🧮', tier: 'full', category: 'Math' },
  { name: 'Word Scramble', url: '/worksheet-generators/word%20scramble.html', icon: '🔤', tier: 'full', category: 'Language' },
  { name: 'Chart Count', url: '/worksheet-generators/chart%20count.html', icon: '📊', tier: 'full', category: 'Math' },
  { name: 'Drawing Lines', url: '/worksheet-generators/drawing%20lines.html', icon: '✏️', tier: 'full', category: 'Art' },
  { name: 'Big Small', url: '/worksheet-generators/big%20small.html', icon: '📏', tier: 'full', category: 'Visual' },
  { name: 'Code Addition', url: '/worksheet-generators/code%20addition.html', icon: '🔐', tier: 'full', category: 'Math' },
  { name: 'Cryptogram', url: '/worksheet-generators/cryptogram.html', icon: '🗝️', tier: 'full', category: 'Language' },
  { name: 'Draw and Color', url: '/worksheet-generators/draw%20and%20color.html', icon: '🖍️', tier: 'full', category: 'Art' },
  { name: 'Find Objects', url: '/worksheet-generators/find%20objects.html', icon: '👀', tier: 'full', category: 'Visual' },
  { name: 'Grid Match', url: '/worksheet-generators/grid%20match.html', icon: '⚡', tier: 'full', category: 'Logic' },
  { name: 'Math Worksheet', url: '/worksheet-generators/math%20worksheet.html', icon: '📐', tier: 'full', category: 'Math' },
  { name: 'More Less', url: '/worksheet-generators/more%20less.html', icon: '⚖️', tier: 'full', category: 'Math' },
  { name: 'Odd One Out', url: '/worksheet-generators/odd%20one%20out.html', icon: '🎭', tier: 'full', category: 'Logic' },
  { name: 'Picture Path', url: '/worksheet-generators/picture%20path.html', icon: '🗺️', tier: 'full', category: 'Visual' },
  { name: 'Picture Sort', url: '/worksheet-generators/picture%20sort.html', icon: '📦', tier: 'full', category: 'Logic' },
  { name: 'Prepositions', url: '/worksheet-generators/prepositions.html', icon: '📍', tier: 'full', category: 'Language' },
  { name: 'Treasure Hunt', url: '/worksheet-generators/treasure%20hunt.html', icon: '🗝️', tier: 'full', category: 'Adventure' },
  { name: 'Word Guess', url: '/worksheet-generators/word%20guess.html', icon: '💭', tier: 'full', category: 'Language' },
  { name: 'Writing', url: '/worksheet-generators/writing.html', icon: '✍️', tier: 'full', category: 'Language' },
  { name: 'Bingo', url: '/worksheet-generators/bingo.html', icon: '🎱', tier: 'full', category: 'Game' },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<WorksheetGeneration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const t = useTranslations('dashboard');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/auth/signin');
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);

    // Fetch recent generations
    fetchRecentGenerations(token);
  }, [router]);

  const fetchRecentGenerations = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/users/me/generations?limit=5', {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'core':
        return 'bg-blue-100 text-blue-800';
      case 'full':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpgradeMessage = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'Upgrade to Core or Full Access to unlock all features and remove watermarks';
      case 'core':
        return 'Upgrade to Full Access for all 33 apps and priority support';
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, {user?.firstName || 'User'}!
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/apps/word-search">
                  <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">🔍</span>
                      <div>
                        <h3 className="font-semibold">Word Search Generator</h3>
                        <p className="text-sm text-gray-600">Create custom word puzzles</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/apps">
                  <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">📚</span>
                      <div>
                        <h3 className="font-semibold">Browse All Apps</h3>
                        <p className="text-sm text-gray-600">Explore 33 worksheet generators</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Worksheets</h2>
              {recentGenerations.length > 0 ? (
                <div className="space-y-3">
                  {recentGenerations.map((generation) => (
                    <div key={generation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {generation.appName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(generation.generatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {generation.watermarked && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                          Watermarked
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No worksheets generated yet</p>
                  <Link href="/apps">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Create Your First Worksheet
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Worksheet Apps */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Worksheet Generators</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-1 border rounded-md text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="px-3 py-1 border rounded-md text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {[...new Set(allApps.map(app => app.category))].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {allApps
                  .filter(app => {
                    const searchMatch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const catMatch = selectedCategory === 'all' || app.category === selectedCategory;
                    return searchMatch && catMatch;
                  })
                  .map((app) => {
                    const canAccess = app.tier === 'free' ||
                      (user?.subscriptionTier === 'core' && (app.tier === 'free' || app.tier === 'core')) ||
                      user?.subscriptionTier === 'full';

                    return (
                      <div
                        key={app.name}
                        className={`relative p-3 text-center border rounded-lg transition-all ${
                          canAccess
                            ? 'hover:border-blue-500 hover:shadow-md cursor-pointer'
                            : 'opacity-60 bg-gray-50'
                        }`}
                        onClick={() => canAccess && window.open(app.url, '_blank')}
                      >
                        <div className="text-2xl mb-1">{app.icon}</div>
                        <p className="text-xs font-medium">{app.name}</p>
                        <span className={`text-xs px-1 py-0.5 rounded mt-1 inline-block ${
                          app.tier === 'free' ? 'bg-green-100 text-green-700' :
                          app.tier === 'core' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {app.tier === 'free' ? 'Free' : app.tier === 'core' ? 'Core' : 'Pro'}
                        </span>
                        {!canAccess && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10 rounded-lg">
                            <span className="text-xs px-2 py-1 bg-gray-800 text-white rounded">🔒</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subscription</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTierBadgeColor(user?.subscriptionTier || 'free')}`}>
                    {user?.subscriptionTier?.toUpperCase() || 'FREE'}
                  </span>
                </div>
              </div>
            </div>

            {/* Upgrade CTA */}
            {user?.subscriptionTier !== 'full' && (
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Unlock More Features</h3>
                <p className="text-sm mb-4 opacity-90">
                  {getUpgradeMessage(user?.subscriptionTier || 'free')}
                </p>
                <Link href="/pricing">
                  <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
                    View Plans
                  </button>
                </Link>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Worksheets Created</span>
                  <span className="font-semibold">{recentGenerations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Apps Available</span>
                  <span className="font-semibold">
                    {user?.subscriptionTier === 'free' ? '1' : user?.subscriptionTier === 'core' ? '10' : '33'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">Today</span>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h3>
              <div className="space-y-2">
                <Link href="/docs">
                  <p className="text-blue-600 hover:text-blue-700 cursor-pointer">📖 Documentation</p>
                </Link>
                <Link href="/tutorials">
                  <p className="text-blue-600 hover:text-blue-700 cursor-pointer">🎥 Video Tutorials</p>
                </Link>
                <Link href="/contact">
                  <p className="text-blue-600 hover:text-blue-700 cursor-pointer">💬 Contact Support</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}