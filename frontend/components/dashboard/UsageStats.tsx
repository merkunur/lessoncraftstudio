'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Download, Zap, TrendingUp } from 'lucide-react';

interface UsageData {
  worksheetsGenerated: number;
  downloadsThisMonth: number;
  generatorsAccessed: number;
  monthlyLimit: number;
}

export default function UsageStats() {
  const t = useTranslations('dashboard.activity');
  const [usage, setUsage] = useState<UsageData>({
    worksheetsGenerated: 0,
    downloadsThisMonth: 0,
    generatorsAccessed: 0,
    monthlyLimit: -1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      // This would be a real API call in production
      // For now, using mock data
      const mockData = {
        worksheetsGenerated: 12,
        downloadsThisMonth: 8,
        generatorsAccessed: 3,
        monthlyLimit: -1, // Unlimited
      };

      setUsage(mockData);
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: t('worksheetsCreated'),
      value: usage.worksheetsGenerated,
      icon: FileText,
      color: 'text-blue-600 bg-blue-50',
      change: t('thisWeek'),
    },
    {
      label: t('downloads'),
      value: usage.downloadsThisMonth,
      limit: usage.monthlyLimit,
      icon: Download,
      color: 'text-green-600 bg-green-50',
      change: t('thisMonth'),
    },
    {
      label: t('generatorsUsed'),
      value: usage.generatorsAccessed,
      icon: Zap,
      color: 'text-purple-600 bg-purple-50',
      change: t('uniqueApps'),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const percentage = stat.limit && stat.limit !== -1
            ? Math.min(100, (stat.value / stat.limit) * 100)
            : 0;

          return (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.limit && stat.limit !== -1 && (
                        <span className="text-sm font-normal text-gray-500"> / {stat.limit}</span>
                      )}
                      {stat.limit === -1 && (
                        <span className="text-sm font-normal text-gray-500"> ({t('unlimited')})</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {stat.limit && stat.limit !== -1 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${stat.color.replace('bg-', 'bg-opacity-100 bg-')}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          {t('trackingNote')}
        </p>
      </div>
    </div>
  );
}
