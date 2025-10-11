'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

interface AppContentProps {
  appSlug: string;
  locale: string;
  appName: string;
  requiredTier: 'free' | 'core' | 'full';
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'da', name: 'Dansk' },
  { code: 'no', name: 'Norsk' },
  { code: 'fi', name: 'Suomi' }
];

// Natural, native-sounding translations for upgrade messages
const upgradeMessages = {
  en: {
    title: 'Upgrade Required',
    description: 'This app requires a {tier} subscription or higher.',
    currentPlan: 'Your current plan:',
    upgradeButton: 'Upgrade Now',
    dashboardButton: 'Go to Dashboard'
  },
  de: {
    title: 'Upgrade erforderlich',
    description: 'Für diese App benötigen Sie ein {tier}-Abonnement oder höher.',
    currentPlan: 'Ihr aktueller Plan:',
    upgradeButton: 'Jetzt upgraden',
    dashboardButton: 'Zum Dashboard'
  },
  fr: {
    title: 'Mise à niveau requise',
    description: 'Cette application nécessite un abonnement {tier} ou supérieur.',
    currentPlan: 'Votre formule actuelle :',
    upgradeButton: 'Passer à la version supérieure',
    dashboardButton: 'Accéder au tableau de bord'
  },
  es: {
    title: 'Actualización necesaria',
    description: 'Esta aplicación requiere una suscripción {tier} o superior.',
    currentPlan: 'Tu plan actual:',
    upgradeButton: 'Actualizar ahora',
    dashboardButton: 'Ir al panel'
  },
  it: {
    title: 'Aggiornamento necessario',
    description: 'Questa app richiede un abbonamento {tier} o superiore.',
    currentPlan: 'Il tuo piano attuale:',
    upgradeButton: 'Aggiorna ora',
    dashboardButton: 'Vai alla dashboard'
  },
  pt: {
    title: 'Atualização necessária',
    description: 'Esta aplicação requer uma subscrição {tier} ou superior.',
    currentPlan: 'O seu plano atual:',
    upgradeButton: 'Atualizar agora',
    dashboardButton: 'Ir para o painel'
  },
  nl: {
    title: 'Upgrade vereist',
    description: 'Voor deze app heb je een {tier}-abonnement of hoger nodig.',
    currentPlan: 'Je huidige abonnement:',
    upgradeButton: 'Nu upgraden',
    dashboardButton: 'Naar dashboard'
  },
  sv: {
    title: 'Uppgradering krävs',
    description: 'Den här appen kräver en {tier}-prenumeration eller högre.',
    currentPlan: 'Din nuvarande plan:',
    upgradeButton: 'Uppgradera nu',
    dashboardButton: 'Gå till instrumentpanelen'
  },
  da: {
    title: 'Opgradering påkrævet',
    description: 'Denne app kræver et {tier}-abonnement eller højere.',
    currentPlan: 'Din nuværende plan:',
    upgradeButton: 'Opgrader nu',
    dashboardButton: 'Gå til kontrolpanel'
  },
  no: {
    title: 'Oppgradering kreves',
    description: 'Denne appen krever et {tier}-abonnement eller høyere.',
    currentPlan: 'Din nåværende plan:',
    upgradeButton: 'Oppgrader nå',
    dashboardButton: 'Gå til dashbordet'
  },
  fi: {
    title: 'Päivitys vaaditaan',
    description: 'Tämä sovellus vaatii {tier}-tilauksen tai korkeamman.',
    currentPlan: 'Nykyinen tilauksesi:',
    upgradeButton: 'Päivitä nyt',
    dashboardButton: 'Siirry hallintapaneeliin'
  }
};

// Tier name translations - natural and localized
const tierNames = {
  en: { free: 'Free', core: 'Core', full: 'Full' },
  de: { free: 'Kostenlos', core: 'Core', full: 'Vollversion' },
  fr: { free: 'Gratuite', core: 'Core', full: 'Complète' },
  es: { free: 'Gratuito', core: 'Core', full: 'Completo' },
  it: { free: 'Gratuito', core: 'Core', full: 'Completo' },
  pt: { free: 'Gratuito', core: 'Core', full: 'Completo' },
  nl: { free: 'Gratis', core: 'Core', full: 'Volledig' },
  sv: { free: 'Gratis', core: 'Core', full: 'Fullständig' },
  da: { free: 'Gratis', core: 'Core', full: 'Fuld' },
  no: { free: 'Gratis', core: 'Core', full: 'Full' },
  fi: { free: 'Ilmainen', core: 'Core', full: 'Täysi' }
};

export default function AppContent({ appSlug, locale, appName, requiredTier }: AppContentProps) {
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [iframeKey, setIframeKey] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Map app slugs to HTML files
  const appFileMap: { [key: string]: string } = {
    'word-search': 'wordsearch.html',
    'image-addition': 'addition.html',
    'alphabet-train': 'alphabet train.html',
    'coloring': 'coloring.html',
    'math-worksheet': 'math worksheet.html',
    'word-scramble': 'word scramble.html',
    'find-and-count': 'find and count.html',
    'matching-app': 'matching.html',
    'drawing-lines': 'drawing lines.html',
    'picture-bingo': 'bingo.html',
    'sudoku': 'sudoku.html',
    'big-small-app': 'big small.html',
    'chart-count-color': 'chart count.html',
    'code-addition': 'code addition.html',
    'draw-and-color': 'draw and color.html',
    'find-objects': 'find objects.html',
    'grid-match': 'grid match.html',
    'image-crossword': 'crossword.html',
    'image-cryptogram': 'cryptogram.html',
    'math-puzzle': 'math puzzle.html',
    'missing-pieces': 'missing pieces.html',
    'more-less': 'more less.html',
    'odd-one-out': 'odd one out.html',
    'pattern-train': 'pattern train.html',
    'pattern-worksheet': 'pattern worksheet.html',
    'picture-path': 'picture path.html',
    'picture-sort': 'picture sort.html',
    'prepositions': 'prepositions.html',
    'shadow-match': 'shadow match.html',
    'story-dice': 'story-dice.html',
    'subtraction': 'subtraction.html',
    'treasure-hunt': 'treasure hunt.html',
    'word-guess': 'word guess.html',
    'writing-app': 'writing.html'
  };

  const handleLanguageChange = (newLocale: string) => {
    setSelectedLocale(newLocale);
    // Force iframe reload with new locale
    setIframeKey(prev => prev + 1);
  };

  // Normalize tier values to handle variations (pro, premium, paid -> full)
  const normalizeTier = (tier: string | undefined): 'free' | 'core' | 'full' => {
    const normalized = (tier || 'free').toLowerCase().trim();

    // Map common variations to standard tiers
    if (normalized === 'full' || normalized === 'pro' || normalized === 'premium' || normalized === 'paid') {
      return 'full';
    }
    if (normalized === 'core' || normalized === 'plus') {
      return 'core';
    }
    return 'free';
  };

  // Check if user has access to this tier
  const userTier = normalizeTier(user?.subscriptionTier);
  const canAccess = () => {
    console.log('[AppContent] Access Check:', {
      appSlug,
      userTierRaw: user?.subscriptionTier,
      userTierNormalized: userTier,
      requiredTier,
      isAdmin: user?.isAdmin,
      user: user ? { email: user.email, tier: user.subscriptionTier } : 'no user'
    });

    // Admins always have full access
    if (user?.isAdmin) {
      console.log('[AppContent] Access Result: true (admin)');
      return true;
    }

    // Free tier apps are accessible to everyone
    if (requiredTier === 'free') {
      console.log('[AppContent] Access Result: true (free app)');
      return true;
    }

    // Core tier users can access core apps (free apps already handled above)
    if (userTier === 'core') {
      const hasAccess = requiredTier === 'core';
      console.log('[AppContent] Access Result:', hasAccess, '(core user)');
      return hasAccess;
    }

    // Full tier users can access all apps
    if (userTier === 'full') {
      console.log('[AppContent] Access Result: true (full user)');
      return true;
    }

    // Free tier users can only access free apps
    console.log('[AppContent] Access Result: false (insufficient tier)');
    return false;
  };

  // Get the HTML file name for the app
  const htmlFile = appFileMap[appSlug] || `${appSlug}.html`;

  // Build the iframe URL with locale AND tier parameters - encode the filename to handle spaces
  const iframeUrl = `/worksheet-generators/${encodeURIComponent(htmlFile)}?locale=${selectedLocale}&tier=${userTier}`;

  // Check if this is the writing app (English only)
  const isWritingApp = appSlug === 'writing-app';

  // Show loading state while auth is being verified
  if (loading) {
    return (
      <div className="app-content-container">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user doesn't have access, show upgrade message
  if (!canAccess()) {
    // Get translations for current locale, fallback to English
    const messages = upgradeMessages[locale as keyof typeof upgradeMessages] || upgradeMessages.en;
    const tiers = tierNames[locale as keyof typeof tierNames] || tierNames.en;

    // Get localized tier names
    const localizedRequiredTier = tiers[requiredTier as keyof typeof tiers];
    const localizedUserTier = tiers[userTier as keyof typeof tiers];

    return (
      <div className="app-content-container">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{messages.title}</h2>
              <p className="text-gray-600">
                {messages.description.replace('{tier}', localizedRequiredTier)}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-500">{messages.currentPlan} <strong>{localizedUserTier}</strong></p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/${locale}/pricing`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                {messages.upgradeButton}
              </Link>
              <Link
                href={`/${locale}/dashboard`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                {messages.dashboardButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-content-container">
      {/* App iframe */}
      <div className="app-iframe-container">
        <iframe
          key={iframeKey}
          src={iframeUrl}
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 120px)' }}
          title={appName}
        />
      </div>

      <style jsx>{`
        .app-content-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .app-iframe-container {
          width: 100%;
          height: calc(100vh - 60px);
          background-color: white;
        }

        ${isWritingApp ? `
          .app-iframe-container {
            height: 100vh;
          }
        ` : ''}
      `}</style>
    </div>
  );
}