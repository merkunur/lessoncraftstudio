'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';

interface LaunchAppButtonProps {
  appSlug: string;
  sourceFile: string;
  locale: string;
  appName: string;
  appTier: string;
  tierColor: string;
}

export default function LaunchAppButton({
  appSlug,
  sourceFile,
  locale,
  appName,
  appTier,
  tierColor
}: LaunchAppButtonProps) {
  const { user, loading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

  // Calculate access immediately when user data is available, even during loading
  // This ensures tier recognition works right after sign-in without requiring a page refresh
  // If subscription tier changes after API verification, this will recalculate automatically
  useEffect(() => {
    if (user) {
      // Check if user has access based on subscription tier
      const tierHierarchy = { free: 0, core: 1, full: 2 };
      const userTierLevel = tierHierarchy[user.subscriptionTier as keyof typeof tierHierarchy] || 0;
      const requiredTierLevel = tierHierarchy[appTier as keyof typeof tierHierarchy] || 0;
      setHasAccess(userTierLevel >= requiredTierLevel);
    } else {
      setHasAccess(false);
    }
  }, [user?.subscriptionTier, appTier]);

  const handleLaunchApp = () => {
    const url = `/worksheet-generators/${sourceFile}?tier=${user?.subscriptionTier || 'free'}&locale=${locale}`;
    window.open(url, '_blank');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User has access - show launch button
  if (hasAccess) {
    return (
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* App Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 text-4xl">
                🚀
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Create Amazing Worksheets?
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Click the button below to launch <strong>{appName}</strong> in a new window.
              You'll have full access to all features and be able to create, customize, and print professional worksheets.
            </p>

            {/* Launch Button */}
            <button
              onClick={handleLaunchApp}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Launch {appName}
            </button>

            {/* Info Note */}
            <p className="mt-6 text-sm text-gray-500">
              The app will open in a new window for the best experience
            </p>
          </div>
        </div>
      </section>
    );
  }

  // User doesn't have access - show upgrade message
  const getLocalizedTierLabel = () => {
    if (appTier === 'core') {
      return locale === 'de' ? 'Core Bundle' : 'Core Bundle';
    } else if (appTier === 'full') {
      return locale === 'de' ? 'Vollzugriff' : 'Full Access';
    }
    return locale === 'de' ? 'Kostenlos' : 'Free';
  };

  const uiTranslations = {
    de: {
      accessRequired: {
        core: 'Diese App erfordert Core Bundle',
        full: 'Diese App erfordert Vollzugriff'
      },
      upgradeMessage: 'Upgraden Sie Ihren Plan, um auf diesen Arbeitsblattgenerator und viele weitere professionelle Tools zuzugreifen.',
      viewPricing: 'Preispläne ansehen',
      browseFreeApps: 'Kostenlose Apps durchsuchen'
    },
    en: {
      accessRequired: {
        core: 'This app requires Core Bundle',
        full: 'This app requires Full Access'
      },
      upgradeMessage: 'Upgrade your plan to access this worksheet generator and many more professional tools.',
      viewPricing: 'View Pricing Plans',
      browseFreeApps: 'Browse Free Apps'
    }
  };

  const t = (key: string, fallback: string) => {
    const translations = locale === 'de' ? uiTranslations.de : uiTranslations.en;
    return (translations as any)[key] || fallback;
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-50 py-16">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold mb-4">
          {locale === 'de'
            ? uiTranslations.de.accessRequired[appTier as keyof typeof uiTranslations.de.accessRequired] || `Diese App erfordert ${getLocalizedTierLabel()}`
            : `This app requires ${appTier === 'core' ? 'Core Bundle' : 'Full Access'}`}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('upgradeMessage', 'Upgrade your plan to access this worksheet generator and many more professional tools.')}
        </p>
        <div className="space-y-4">
          <Button href={`/${locale}/pricing`} variant="primary" size="lg" fullWidth>
            {t('viewPricing', 'View Pricing Plans')}
          </Button>
          <Button href={`/${locale}/apps`} variant="ghost" size="lg" fullWidth>
            {t('browseFreeApps', 'Browse Free Apps')}
          </Button>
        </div>
      </div>
    </div>
  );
}
