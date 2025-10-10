'use client';

export const dynamic = 'force-dynamic';

import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import {
  Grid3x3,
  TrendingUp,
  FileText,
  Clock,
  Star,
  ArrowRight,
  Zap,
  BookOpen,
  Users,
  Download,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: 'Worksheets Created', value: '0', icon: FileText, color: 'bg-blue-500' },
    { name: 'Downloads This Month', value: '0', icon: Download, color: 'bg-green-500' },
    { name: 'Active Since', value: 'Today', icon: Clock, color: 'bg-purple-500' },
    { name: 'Generators Available', value: user?.subscriptionTier === 'full' ? '33' : user?.subscriptionTier === 'core' ? '15' : '5', icon: Grid3x3, color: 'bg-orange-500' },
  ];

  const quickActions = [
    {
      title: 'Create a Worksheet',
      description: 'Start creating engaging educational content',
      href: '/dashboard/generators',
      icon: Zap,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Browse Templates',
      description: 'Explore our collection of worksheet templates',
      href: '/dashboard/templates',
      icon: BookOpen,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'View Activity',
      description: 'Check your recent worksheet creation history',
      href: '/dashboard/activity',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  const featuredGenerators = [
    { name: 'Word Search', description: 'Create custom word search puzzles', available: true },
    { name: 'Math Worksheets', description: 'Generate math practice sheets', available: true },
    { name: 'Crossword Puzzle', description: 'Build engaging crosswords', available: user?.subscriptionTier !== 'free' },
    { name: 'Coloring Pages', description: 'Design creative coloring activities', available: true },
    { name: 'Alphabet Train', description: 'Letter learning activities', available: true },
    { name: 'Sudoku', description: 'Number puzzle challenges', available: user?.subscriptionTier === 'full' },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            {user?.emailVerified ? (
              "Ready to create amazing educational content? Let's get started!"
            ) : (
              <span className="text-amber-600">
                Please verify your email to access all features.
              </span>
            )}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <div className={`flex-shrink-0 rounded-lg p-3 ${action.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-500 truncate">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured generators */}
        <div>
          <div className="sm:flex sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Featured Worksheet Generators</h2>
            <Link
              href="/dashboard/generators"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              View all generators →
            </Link>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {featuredGenerators.map((generator) => (
                <li key={generator.name}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Grid3x3 className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {generator.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {generator.description}
                          </p>
                        </div>
                      </div>
                      {generator.available ? (
                        <Link
                          href={`/worksheet-generators/${generator.name.toLowerCase().replace(' ', '-')}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Open
                        </Link>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full text-gray-700 bg-gray-100">
                          <Star className="h-3 w-3 mr-1" />
                          Upgrade to unlock
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upgrade prompt for free users */}
        {user?.subscriptionTier === 'free' && (
          <div className="mt-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">
                  Unlock More Worksheet Generators
                </h3>
                <p className="mt-1 text-sm text-blue-100">
                  Upgrade to Core or Full plan to access more generators and features.
                </p>
              </div>
              <Link
                href="/pricing"
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}