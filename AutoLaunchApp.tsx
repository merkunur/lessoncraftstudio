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

  // Multilingual UI translations
  const uiTranslations: Record<string, any> = {
    en: {
      loading: 'Loading...',
      launching: 'Launching',
      launchingMessage: 'Opening your worksheet generator in a new window',
      pleaseWait: 'Please wait...',
      accessRequired: {
        core: 'This app requires Core Bundle',
        full: 'This app requires Full Access'
      },
      upgradeMessage: 'Upgrade your plan to access this worksheet generator and many more professional tools.',
      viewPricing: 'View Pricing Plans',
      browseFreeApps: 'Browse Free Apps'
    },
    de: {
      loading: 'Wird geladen...',
      launching: 'Wird gestartet',
      launchingMessage: 'Ihr Arbeitsblattgenerator wird in einem neuen Fenster geöffnet',
      pleaseWait: 'Bitte warten...',
      accessRequired: {
        core: 'Diese App erfordert Core Bundle',
        full: 'Diese App erfordert Vollzugriff'
      },
      upgradeMessage: 'Upgraden Sie Ihren Plan, um auf diesen Arbeitsblattgenerator und viele weitere professionelle Tools zuzugreifen.',
      viewPricing: 'Preispläne ansehen',
      browseFreeApps: 'Kostenlose Apps durchsuchen'
    },
    fr: {
      loading: 'Chargement...',
      launching: 'Lancement de',
      launchingMessage: 'Ouverture de votre générateur de fiches dans une nouvelle fenêtre',
      pleaseWait: 'Veuillez patienter...',
      accessRequired: {
        core: 'Cette application nécessite le forfait Essentiel',
        full: 'Cette application nécessite le forfait Complet'
      },
      upgradeMessage: 'Améliorez votre forfait pour accéder à ce générateur de fiches et à de nombreux autres outils professionnels.',
      viewPricing: 'Voir les forfaits',
      browseFreeApps: 'Parcourir les apps gratuites'
    },
    es: {
      loading: 'Cargando...',
      launching: 'Abriendo',
      launchingMessage: 'Abriendo tu generador de fichas en una ventana nueva',
      pleaseWait: 'Por favor espera...',
      accessRequired: {
        core: 'Esta aplicación requiere el paquete Esencial',
        full: 'Esta aplicación requiere Acceso Completo'
      },
      upgradeMessage: 'Actualiza tu plan para acceder a este generador de fichas y muchas más herramientas profesionales.',
      viewPricing: 'Ver planes de precios',
      browseFreeApps: 'Explorar apps gratuitas'
    },
    it: {
      loading: 'Caricamento...',
      launching: 'Avvio di',
      launchingMessage: 'Apertura del tuo generatore di schede in una nuova finestra',
      pleaseWait: 'Attendere prego...',
      accessRequired: {
        core: 'Questa app richiede il pacchetto Essenziale',
        full: 'Questa app richiede Accesso Completo'
      },
      upgradeMessage: 'Aggiorna il tuo piano per accedere a questo generatore di schede e molti altri strumenti professionali.',
      viewPricing: 'Visualizza i piani tariffari',
      browseFreeApps: 'Sfoglia app gratuite'
    },
    pt: {
      loading: 'Carregando...',
      launching: 'Abrindo',
      launchingMessage: 'Abrindo seu gerador de fichas numa nova janela',
      pleaseWait: 'Por favor aguarde...',
      accessRequired: {
        core: 'Este aplicativo requer o pacote Essencial',
        full: 'Este aplicativo requer Acesso Completo'
      },
      upgradeMessage: 'Atualize seu plano para acessar este gerador de fichas e muitas outras ferramentas profissionais.',
      viewPricing: 'Ver planos de preços',
      browseFreeApps: 'Explorar apps gratuitos'
    },
    nl: {
      loading: 'Laden...',
      launching: 'Openen van',
      launchingMessage: 'Uw werkbladgenerator wordt geopend in een nieuw venster',
      pleaseWait: 'Even geduld...',
      accessRequired: {
        core: 'Deze app vereist het Basis pakket',
        full: 'Deze app vereist Volledige Toegang'
      },
      upgradeMessage: 'Upgrade uw abonnement om toegang te krijgen tot deze werkbladgenerator en vele andere professionele tools.',
      viewPricing: 'Prijzen bekijken',
      browseFreeApps: 'Gratis apps bekijken'
    },
    sv: {
      loading: 'Laddar...',
      launching: 'Startar',
      launchingMessage: 'Öppnar din arbetsbladsgenerator i ett nytt fönster',
      pleaseWait: 'Vänligen vänta...',
      accessRequired: {
        core: 'Denna app kräver Bas-paketet',
        full: 'Denna app kräver Full åtkomst'
      },
      upgradeMessage: 'Uppgradera ditt abonnemang för att få tillgång till denna arbetsbladsgenerator och många fler professionella verktyg.',
      viewPricing: 'Se prisplaner',
      browseFreeApps: 'Bläddra bland gratis appar'
    },
    da: {
      loading: 'Indlæser...',
      launching: 'Starter',
      launchingMessage: 'Åbner din regnearksgenerator i et nyt vindue',
      pleaseWait: 'Vent venligst...',
      accessRequired: {
        core: 'Denne app kræver Kerne-pakken',
        full: 'Denne app kræver Fuld adgang'
      },
      upgradeMessage: 'Opgrader dit abonnement for at få adgang til denne regnearksgenerator og mange flere professionelle værktøjer.',
      viewPricing: 'Se prisplaner',
      browseFreeApps: 'Gennemse gratis apps'
    },
    no: {
      loading: 'Laster...',
      launching: 'Starter',
      launchingMessage: 'Åpner arbeidsarkgeneratoren din i et nytt vindu',
      pleaseWait: 'Vennligst vent...',
      accessRequired: {
        core: 'Denne appen krever Kjerne-pakken',
        full: 'Denne appen krever Full tilgang'
      },
      upgradeMessage: 'Oppgrader abonnementet ditt for å få tilgang til denne arbeidsarkgeneratoren og mange flere profesjonelle verktøy.',
      viewPricing: 'Se prisplaner',
      browseFreeApps: 'Bla gjennom gratis apper'
    },
    fi: {
      loading: 'Ladataan...',
      launching: 'Käynnistetään',
      launchingMessage: 'Avataan työarkki generaattorisi uuteen ikkunaan',
      pleaseWait: 'Odota hetki...',
      accessRequired: {
        core: 'Tämä sovellus vaatii Perus-paketin',
        full: 'Tämä sovellus vaatii Täyden pääsyn'
      },
      upgradeMessage: 'Päivitä tilauksesi saadaksesi käyttöön tämän työarkki generaattorin ja monet muut ammattimaiset työkalut.',
      viewPricing: 'Näytä hinnoittelu',
      browseFreeApps: 'Selaa ilmaisia sovelluksia'
    }
  };

  const t = uiTranslations[locale] || uiTranslations['en'];

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">{t.loading}</p>
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
            {t.launching} {appName}...
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t.launchingMessage}
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
            <span>{t.pleaseWait}</span>
          </div>
        </div>
      </div>
    );
  }

  // User doesn't have access - show upgrade message
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold mb-4">
          {t.accessRequired[appTier as keyof typeof t.accessRequired] || t.accessRequired.core}
        </h2>
        <p className="text-gray-600 mb-8">
          {t.upgradeMessage}
        </p>
        <div className="space-y-4">
          <Button href={`/${locale}/pricing`} variant="primary" size="lg" fullWidth>
            {t.viewPricing}
          </Button>
          <Button href={`/${locale}/apps`} variant="ghost" size="lg" fullWidth>
            {t.browseFreeApps}
          </Button>
        </div>
      </div>
    </div>
  );
}
