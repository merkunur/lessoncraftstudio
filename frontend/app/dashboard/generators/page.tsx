'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import {
  worksheetGenerators,
  worksheetCategories,
  getGeneratorsByCategory,
  getGeneratorsByTier,
  searchGenerators,
  getPopularGenerators,
} from '@/lib/worksheet-generators';
import {
  Search,
  Filter,
  Grid3x3,
  Star,
  Lock,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  Brain,
  Palette,
  Calculator,
  Type,
  Eye,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  literacy: Type,
  math: Calculator,
  puzzles: Brain,
  creative: Palette,
  cognitive: Brain,
  visual: Eye,
};

export default function GeneratorsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter generators based on user preferences
  const filteredGenerators = useMemo(() => {
    let generators = [...worksheetGenerators];

    // Search filter
    if (searchQuery) {
      generators = searchGenerators(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      generators = generators.filter(g => g.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      generators = generators.filter(g => g.difficulty === selectedDifficulty);
    }

    // Availability filter
    if (showOnlyAvailable) {
      generators = getGeneratorsByTier(user?.subscriptionTier as any || 'free')
        .filter(g => generators.includes(g));
    }

    return generators;
  }, [searchQuery, selectedCategory, selectedDifficulty, showOnlyAvailable, user?.subscriptionTier]);

  // Get counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: worksheetGenerators.length };
    worksheetCategories.forEach(cat => {
      counts[cat.id] = getGeneratorsByCategory(cat.id).length;
    });
    return counts;
  }, []);

  // Check if generator is available for user's tier
  const isGeneratorAvailable = (generator: any) => {
    const tierHierarchy = { free: 0, core: 1, full: 2 };
    const userTierLevel = tierHierarchy[user?.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requiredLevel = tierHierarchy[generator.minTier];
    return userTierLevel >= requiredLevel;
  };

  const popularGenerators = getPopularGenerators();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Worksheet Generators
          </h2>
          <p className="mt-2 text-gray-600">
            Choose from {worksheetGenerators.length} educational worksheet generators
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Grid3x3 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Available</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {getGeneratorsByTier(user?.subscriptionTier as any || 'free').length} / {worksheetGenerators.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Popular</dt>
                    <dd className="text-lg font-medium text-gray-900">{popularGenerators.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                    <dd className="text-lg font-medium text-gray-900">{worksheetCategories.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Your Tier</dt>
                    <dd className="text-lg font-medium text-gray-900 capitalize">
                      {user?.subscriptionTier || 'Free'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search generators..."
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showOnlyAvailable}
                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available only</span>
                </label>

                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 text-sm ${
                      viewMode === 'grid'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 text-sm ${
                      viewMode === 'list'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories ({categoryCounts.all})
              </button>
              {worksheetCategories.map(cat => {
                const Icon = categoryIcons[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4 mr-1" />}
                    {cat.name} ({categoryCounts[cat.id]})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredGenerators.length} worksheet generator{filteredGenerators.length !== 1 ? 's' : ''}
        </div>

        {/* Generators Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGenerators.map(generator => {
              const isAvailable = isGeneratorAvailable(generator);
              const Icon = categoryIcons[generator.category];
              
              return (
                <div
                  key={generator.id}
                  className={`relative rounded-lg border ${
                    isAvailable
                      ? 'border-gray-200 bg-white hover:shadow-md'
                      : 'border-gray-200 bg-gray-50'
                  } p-6 transition-shadow`}
                >
                  {generator.popular && (
                    <div className="absolute -top-2 -right-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-start">
                    <div className={`flex-shrink-0 rounded-lg p-3 ${
                      worksheetCategories.find(c => c.id === generator.category)?.color || 'bg-gray-100'
                    }`}>
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {generator.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {generator.description}
                      </p>
                      
                      <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                        {generator.ageRange && (
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            Age {generator.ageRange}
                          </span>
                        )}
                        {generator.difficulty && (
                          <span className="flex items-center capitalize">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {generator.difficulty}
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        {isAvailable ? (
                          <Link
                            href={generator.url}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Open Generator
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center text-sm text-gray-500">
                              <Lock className="h-4 w-4 mr-1" />
                              {generator.minTier === 'core' ? 'Core' : 'Full'} plan required
                            </span>
                            <Link
                              href="/dashboard/subscription"
                              className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                              Upgrade
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredGenerators.map(generator => {
                const isAvailable = isGeneratorAvailable(generator);
                const Icon = categoryIcons[generator.category];
                
                return (
                  <li key={generator.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`flex-shrink-0 rounded-lg p-2 ${
                            worksheetCategories.find(c => c.id === generator.category)?.color || 'bg-gray-100'
                          }`}>
                            {Icon && <Icon className="h-5 w-5" />}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {generator.name}
                              </p>
                              {generator.popular && (
                                <Star className="ml-2 h-4 w-4 text-yellow-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {generator.description}
                            </p>
                            <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                              {generator.ageRange && (
                                <span>Age {generator.ageRange}</span>
                              )}
                              {generator.difficulty && (
                                <span className="capitalize">{generator.difficulty}</span>
                              )}
                              {generator.subjects && (
                                <span>{generator.subjects.join(', ')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {isAvailable ? (
                            <Link
                              href={generator.url}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Open
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          ) : (
                            <div className="text-center">
                              <Lock className="h-5 w-5 text-gray-400 mx-auto" />
                              <p className="mt-1 text-xs text-gray-500">
                                {generator.minTier === 'core' ? 'Core' : 'Full'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Empty state */}
        {filteredGenerators.length === 0 && (
          <div className="text-center py-12">
            <Grid3x3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No generators found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setShowOnlyAvailable(false);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Upgrade CTA for free users */}
        {user?.subscriptionTier === 'free' && (
          <div className="mt-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">
                  <Sparkles className="inline h-5 w-5 mr-2" />
                  Unlock {worksheetGenerators.length - getGeneratorsByTier('free').length} More Generators
                </h3>
                <p className="mt-1 text-sm text-indigo-100">
                  Upgrade to Core or Full plan to access all worksheet generators and premium features.
                </p>
              </div>
              <Link
                href="/dashboard/subscription"
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
              >
                View Plans
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}