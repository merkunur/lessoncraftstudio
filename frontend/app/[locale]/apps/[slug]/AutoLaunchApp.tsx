'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AutoLaunchAppProps {
  appSlug: string;
  sourceFile: string;
  locale: string;
  appName: string;
  appTier: string;
}

export default function AutoLaunchApp({
  appSlug,
  sourceFile,
  locale,
  appName,
  appTier
}: AutoLaunchAppProps) {
  const { user, loading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [launched, setLaunched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Check if user has access based on subscription tier
      const tierHierarchy = { free: 0, core: 1, full: 2 };
      const userTierLevel = tierHierarchy[user.subscriptionTier as keyof typeof tierHierarchy] || 0;
      const requiredTierLevel = tierHierarchy[appTier as keyof typeof tierHierarchy] || 0;
      const access = userTierLevel >= requiredTierLevel;
      setHasAccess(access);

      // Auto-launch if user has access
      if (access && !launched) {
        setLaunched(true);
        const url = `/worksheet-generators/${sourceFile}?tier=${user?.subscriptionTier || 'free'}&locale=${locale}`;

        // Small delay to ensure smooth UX
        setTimeout(() => {
          window.open(url, '_blank');
          // Redirect back to apps page after launching
          router.push(`/${locale}/apps`);
        }, 300);
      }
    }
  }, [user, loading, appTier, launched, sourceFile, locale, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User has access - show launching message
  if (hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 text-5xl animate-bounce">
              🚀
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Launching {appName}...
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Opening your worksheet generator in a new window
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
            <span>Please wait...</span>
          </div>
        </div>
      </div>
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md mx-auto">
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
