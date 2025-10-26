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
    en: {
      accessRequired: {
        core: 'Core Bundle Required',
        full: 'Full Access Required'
      },
      upgradeMessage: 'Upgrade your plan to access this worksheet generator and many more professional tools.',
      viewPricing: 'View Pricing Plans',
      browseFreeApps: 'Browse Free Apps'
    },
    de: {
      accessRequired: {
        core: 'Core-Paket erforderlich',
        full: 'Vollzugriff erforderlich'
      },
      upgradeMessage: 'Upgraden Sie Ihr Paket, um diesen Arbeitsblattgenerator und viele weitere professionelle Tools zu nutzen.',
      viewPricing: 'Preispläne ansehen',
      browseFreeApps: 'Kostenlose Apps durchsuchen'
    },
    fr: {
      accessRequired: {
        core: 'Abonnement Core requis',
        full: 'Accès complet requis'
      },
      upgradeMessage: 'Passez à un abonnement supérieur pour accéder à ce générateur et à de nombreux autres outils professionnels.',
      viewPricing: 'Voir les tarifs',
      browseFreeApps: 'Applications gratuites'
    },
    es: {
      accessRequired: {
        core: 'Plan Core requerido',
        full: 'Acceso completo requerido'
      },
      upgradeMessage: 'Mejora tu plan para acceder a este generador y muchas más herramientas profesionales.',
      viewPricing: 'Ver planes',
      browseFreeApps: 'Aplicaciones gratuitas'
    },
    it: {
      accessRequired: {
        core: 'Piano Core richiesto',
        full: 'Accesso completo richiesto'
      },
      upgradeMessage: 'Passa a un piano superiore per accedere a questo generatore e a molti altri strumenti professionali.',
      viewPricing: 'Vedi i piani',
      browseFreeApps: 'App gratuite'
    },
    pt: {
      accessRequired: {
        core: 'Plano Core necessário',
        full: 'Acesso completo necessário'
      },
      upgradeMessage: 'Mude para um plano superior para aceder a este gerador e a muitas outras ferramentas profissionais.',
      viewPricing: 'Ver planos',
      browseFreeApps: 'Aplicações gratuitas'
    },
    nl: {
      accessRequired: {
        core: 'Core-abonnement vereist',
        full: 'Volledige toegang vereist'
      },
      upgradeMessage: 'Upgrade je abonnement om toegang te krijgen tot deze generator en vele andere professionele tools.',
      viewPricing: 'Bekijk tarieven',
      browseFreeApps: 'Gratis apps'
    },
    sv: {
      accessRequired: {
        core: 'Core-abonnemang krävs',
        full: 'Full åtkomst krävs'
      },
      upgradeMessage: 'Uppgradera ditt abonnemang för att få tillgång till denna generator och många fler professionella verktyg.',
      viewPricing: 'Se priser',
      browseFreeApps: 'Gratis appar'
    },
    da: {
      accessRequired: {
        core: 'Core-abonnement påkrævet',
        full: 'Fuld adgang påkrævet'
      },
      upgradeMessage: 'Opgrader dit abonnement for at få adgang til denne generator og mange flere professionelle værktøjer.',
      viewPricing: 'Se priser',
      browseFreeApps: 'Gratis apps'
    },
    no: {
      accessRequired: {
        core: 'Core-abonnement kreves',
        full: 'Full tilgang kreves'
      },
      upgradeMessage: 'Oppgrader abonnementet ditt for å få tilgang til denne generatoren og mange flere profesjonelle verktøy.',
      viewPricing: 'Se priser',
      browseFreeApps: 'Gratis apper'
    },
    fi: {
      accessRequired: {
        core: 'Core-tilaus vaaditaan',
        full: 'Täysi pääsy vaaditaan'
      },
      upgradeMessage: 'Päivitä tilauksesi saadaksesi käyttöoikeuden tähän generaattoriin ja moniin muihin ammattilaistyökaluihin.',
      viewPricing: 'Katso hinnat',
      browseFreeApps: 'Ilmaiset sovellukset'
    }
  };

  const t = (key: string, fallback: string) => {
    const translations = (uiTranslations as any)[locale] || uiTranslations.en;
    return translations[key] || fallback;
  };

  const getAccessRequiredTitle = () => {
    const translations = (uiTranslations as any)[locale] || uiTranslations.en;
    const tierKey = appTier === 'core' ? 'core' : 'full';
    return translations.accessRequired[tierKey] || `${appTier.toUpperCase()} Required`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold mb-4">
          {getAccessRequiredTitle()}
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
