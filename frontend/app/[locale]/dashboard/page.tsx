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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<WorksheetGeneration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

            {/* Popular Apps */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Apps</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '➕', name: 'Addition', locked: user?.subscriptionTier === 'free' },
                  { icon: '🔤', name: 'Word Scramble', locked: user?.subscriptionTier === 'free' },
                  { icon: '🎨', name: 'Coloring', locked: user?.subscriptionTier === 'free' },
                  { icon: '🧩', name: 'Sudoku', locked: user?.subscriptionTier === 'free' },
                ].map((app, index) => (
                  <div key={index} className="relative">
                    <div className={`p-4 text-center border rounded-lg ${app.locked ? 'opacity-50' : 'hover:border-blue-500 cursor-pointer'}`}>
                      <div className="text-3xl mb-2">{app.icon}</div>
                      <p className="text-sm font-medium">{app.name}</p>
                    </div>
                    {app.locked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs px-2 py-1 bg-gray-800 text-white rounded">🔒 Upgrade</span>
                      </div>
                    )}
                  </div>
                ))}
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