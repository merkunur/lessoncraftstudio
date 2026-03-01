'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, ExternalLink, Check, ArrowLeft, Mail,
  ShoppingCart, LayoutGrid, LifeBuoy, User,
  Menu, X, KeyRound,
} from 'lucide-react';
import { ALL_APPS, WPLUS_PRODUCTS, WPLUS_FUNNELS } from '@/config/warriorplus-products';
import type { AppId, WPlusFunnel } from '@/config/warriorplus-products';
import { getSalesPageByProductId } from '@/config/sales-pages';
import { useAuth } from '@/contexts/auth-context';

interface MemberAccess {
  email: string;
  apps: string[];
  highestTier: string;
  hasCommercialLicense: boolean;
  licenses: Array<{
    licenseKey: string;
    productId: string;
    productTier: string;
    status: string;
    createdAt: string;
    expiresAt: string | null;
  }>;
}

/**
 * Compute theme/language/mode entitlements for an app based on owned product IDs.
 * Supports per-funnel OTO semantics via oto1Unlocks/oto2Unlocks fields.
 */
function computeEntitlements(
  appId: AppId,
  ownedProductIds: string[],
  highestTier: string
): { themes: string[] | 'all'; langs: string[] | 'all'; modes: string[] | 'all' } {
  if (highestTier === 'full-access' || highestTier === 'commercial' || highestTier === 'agency') {
    return { themes: 'all', langs: 'all', modes: 'all' };
  }

  const funnel = Object.values(WPLUS_FUNNELS).find(f => {
    const feProduct = WPLUS_PRODUCTS[f.fe];
    return feProduct?.apps.includes(appId);
  });

  if (!funnel) {
    return { themes: 'all', langs: 'all', modes: 'all' };
  }

  const ownsOTO1 = ownedProductIds.includes(funnel.oto1);
  const ownsOTO2 = funnel.oto2 ? ownedProductIds.includes(funnel.oto2) : false;

  const feProduct = WPLUS_PRODUCTS[funnel.fe];
  const feThemes = feProduct?.includedThemes ?? [];

  // What each OTO unlocks (defaults match existing funnel behavior)
  const oto1Unlocks = funnel.oto1Unlocks || 'themes';
  const oto2Unlocks = funnel.oto2Unlocks || 'languages';

  // Themes: unlocked by whichever OTO targets 'themes'
  let themes: string[] | 'all';
  if ((oto1Unlocks === 'themes' && ownsOTO1) || (oto2Unlocks === 'themes' && ownsOTO2)) {
    themes = 'all';
  } else {
    themes = feThemes.length > 0 ? feThemes : 'all';
  }

  // Languages: unlocked by OTO targeting 'languages', or included in FE
  let langs: string[] | 'all';
  if (oto2Unlocks === 'languages' && ownsOTO2) {
    langs = 'all';
  } else {
    const feLanguages = feProduct?.languages ?? 1;
    langs = feLanguages >= 11 ? 'all' : ['en'];
  }

  // Modes: only gated when a funnel has oto1Unlocks === 'modes'
  let modes: string[] | 'all';
  if (oto1Unlocks === 'modes') {
    modes = ownsOTO1 ? 'all' : ['regular'];
  } else {
    modes = 'all';
  }

  return { themes, langs, modes };
}

/**
 * Find the funnel (if any) that gates the given app.
 */
function getFunnelForApp(appId: AppId): WPlusFunnel | null {
  for (const funnel of Object.values(WPLUS_FUNNELS)) {
    const feProduct = WPLUS_PRODUCTS[funnel.fe];
    if (feProduct?.apps.includes(appId)) return funnel;
  }
  return null;
}

/* ──────────────────────────────────────────────
   Category styling for the branded card design
   ────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, {
  border: string;
  text: string;
  bg: string;
  button: string;
  pill: string;
  gradient: string;
}> = {
  math:     { border: 'border-l-blue-500',    text: 'text-blue-600',    bg: 'bg-blue-50',    button: 'bg-blue-500 hover:bg-blue-600',     pill: 'bg-blue-100 text-blue-700',     gradient: 'from-blue-500' },
  literacy: { border: 'border-l-emerald-500',  text: 'text-emerald-600',  bg: 'bg-emerald-50',  button: 'bg-emerald-500 hover:bg-emerald-600', pill: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-500' },
  visual:   { border: 'border-l-amber-500',    text: 'text-amber-600',    bg: 'bg-amber-50',    button: 'bg-amber-500 hover:bg-amber-600',   pill: 'bg-amber-100 text-amber-700',   gradient: 'from-amber-500' },
  matching: { border: 'border-l-violet-500',   text: 'text-violet-600',   bg: 'bg-violet-50',   button: 'bg-violet-500 hover:bg-violet-600', pill: 'bg-violet-100 text-violet-700', gradient: 'from-violet-500' },
  puzzle:   { border: 'border-l-red-500',      text: 'text-red-600',      bg: 'bg-red-50',      button: 'bg-red-500 hover:bg-red-600',       pill: 'bg-red-100 text-red-700',       gradient: 'from-red-500' },
  search:   { border: 'border-l-cyan-500',     text: 'text-cyan-600',     bg: 'bg-cyan-50',     button: 'bg-cyan-500 hover:bg-cyan-600',     pill: 'bg-cyan-100 text-cyan-700',     gradient: 'from-cyan-500' },
};

const CATEGORY_LABELS: Record<string, string> = {
  math: 'Math & Number',
  literacy: 'Letters & Words',
  visual: 'Drawing & Art',
  matching: 'Matching & Sorting',
  puzzle: 'Puzzles & Logic',
  search: 'Search & Find',
};

export default function MemberDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [access, setAccess] = useState<MemberAccess | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppId | null>(null);
  const [activateKey, setActivateKey] = useState('');
  const [activateLoading, setActivateLoading] = useState(false);
  const [activateMsg, setActivateMsg] = useState('');
  const [showActivate, setShowActivate] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/member');
      return;
    }
    // Fetch license data from authenticated API
    const token = localStorage.getItem('accessToken');
    if (!token) { router.push('/member'); return; }
    fetch('/api/member/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setAccess(data))
      .catch(() => router.push('/member'));
  }, [authLoading, isAuthenticated, router]);

  /* ── Loading state ── */
  if (!access) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-primary" />
        <p className="text-sm text-gray-500 font-medium">Loading your toolkit...</p>
      </div>
    );
  }

  const hasFullAccess = access.highestTier === 'full-access' ||
                        access.highestTier === 'commercial' ||
                        access.highestTier === 'agency';

  const accessibleApps = hasFullAccess
    ? Object.keys(ALL_APPS) as AppId[]
    : (access.apps.filter(id => id in ALL_APPS) as AppId[]);

  async function handleLogout() {
    await logout();
    router.push('/member');
  }

  async function handleActivateKey(e: React.FormEvent) {
    e.preventDefault();
    setActivateLoading(true);
    setActivateMsg('');
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/license/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ licenseKey: activateKey.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setActivateMsg(data.error || 'Activation failed'); return; }
      setActivateMsg('License activated! Refreshing...');
      // Reload dashboard data
      const dashRes = await fetch('/api/member/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (dashRes.ok) setAccess(await dashRes.json());
      setActivateKey('');
      setTimeout(() => { setShowActivate(false); setActivateMsg(''); }, 1500);
    } catch { setActivateMsg('Something went wrong'); }
    finally { setActivateLoading(false); }
  }

  function handleLaunchApp(appId: AppId) {
    const htmlFile = ALL_APPS[appId].htmlFile;
    const tier = access?.highestTier || 'free';

    const ownedProductIds = access?.licenses.map(l => l.productId) || [];
    const { themes, langs, modes } = computeEntitlements(appId, ownedProductIds, tier);

    const params = new URLSearchParams();
    params.set('tier', tier);
    params.set('themes', themes === 'all' ? 'all' : themes.join(','));
    params.set('langs', langs === 'all' ? 'all' : langs.join(','));
    params.set('modes', modes === 'all' ? 'all' : modes.join(','));

    const url = `/worksheet-generators/${encodeURIComponent(htmlFile)}?${params.toString()}`;
    window.open(url, '_blank');
  }

  // Build funnel data for toolkit section
  const ownedProductIds = new Set(access.licenses.map(l => l.productId));

  type FunnelGroup = {
    funnel: WPlusFunnel;
    feAppName: string;
    feAppId: AppId;
    products: Array<{
      productId: string;
      owned: boolean;
      position: 'fe' | 'oto1' | 'oto2';
    }>;
  };

  const funnelGroups: FunnelGroup[] = [];
  for (const funnel of Object.values(WPLUS_FUNNELS)) {
    const ownsFE = ownedProductIds.has(funnel.fe);
    if (!ownsFE) continue;

    const feProduct = WPLUS_PRODUCTS[funnel.fe];
    if (!feProduct) continue;
    const feAppId = feProduct.apps[0];
    const feAppName = ALL_APPS[feAppId]?.name || feProduct.name;

    const products: FunnelGroup['products'] = [];
    products.push({ productId: funnel.fe, owned: true, position: 'fe' });
    products.push({ productId: funnel.oto1, owned: ownedProductIds.has(funnel.oto1), position: 'oto1' });
    if (funnel.oto2) {
      products.push({ productId: funnel.oto2, owned: ownedProductIds.has(funnel.oto2), position: 'oto2' });
    }

    funnelGroups.push({ funnel, feAppName, feAppId, products });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Branded Header ── */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: hamburger + logo + nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 bg-primary-50 rounded-xl flex items-center justify-center">
                <LayoutGrid className="h-5 w-5 text-primary" />
              </div>
              <span className="text-base font-display font-semibold text-primary tracking-tight hidden sm:inline">
                LessonCraftStudio
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-1">
              <span className="px-3 py-1.5 text-sm font-medium text-primary bg-primary-50 rounded-lg">
                My Apps
              </span>
              <a
                href="mailto:support@lessoncraftstudio.com"
                className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Support
              </a>
            </nav>
          </div>

          {/* Right: activate + email + logout + avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowActivate(!showActivate)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
              title="Activate another license key"
            >
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">Activate License</span>
            </button>
            <span className="hidden sm:inline text-sm text-gray-500">{access.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
            <div className="h-9 w-9 bg-primary-50 rounded-xl flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Gradient accent border */}
        <div className="h-[3px] bg-gradient-to-r from-primary to-secondary" />

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
            <nav className="px-4 py-3 space-y-1">
              <span className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-primary bg-primary-50 text-sm font-medium">
                <LayoutGrid className="h-4 w-4" />
                My Apps
              </span>
              <a
                href="mailto:support@lessoncraftstudio.com"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors"
              >
                <LifeBuoy className="h-4 w-4" />
                Support
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ── Activate License Bar ── */}
      {showActivate && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8 py-3">
          <form onSubmit={handleActivateKey} className="max-w-xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={activateKey}
              onChange={(e) => setActivateKey(e.target.value.toUpperCase())}
              placeholder="LCS-XXXXX-XXXXX-XXXXX-XXXXX"
              className="flex-1 px-3 py-2 text-sm border border-blue-300 rounded-lg font-mono"
              required
            />
            <button
              type="submit"
              disabled={activateLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 transition-colors"
            >
              {activateLoading ? 'Activating...' : 'Activate'}
            </button>
            {activateMsg && (
              <span className={`text-sm ${activateMsg.includes('activated') ? 'text-green-600' : 'text-red-600'}`}>
                {activateMsg}
              </span>
            )}
          </form>
        </div>
      )}

      {/* ── Main Content (full-width, no sidebar) ── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">

          {selectedApp === null ? (
            /* ════════════════════════════════════════
               VIEW 1: App Card Grid
               ════════════════════════════════════════ */
            <section>
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-5">My Apps</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {accessibleApps.map(appId => {
                  const app = ALL_APPS[appId];
                  const hasFunnel = !!getFunnelForApp(appId);
                  const colors = CATEGORY_COLORS[app.category] || CATEGORY_COLORS.math;

                  return (
                    <div
                      key={appId}
                      className={`bg-white rounded-lg border border-gray-200 border-l-4 ${colors.border} p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
                    >
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${colors.text}`}>
                        {CATEGORY_LABELS[app.category] || app.category}
                      </span>
                      <h3 className="text-lg font-display font-semibold text-gray-900 mt-1">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Create {app.name.toLowerCase()} worksheets
                      </p>

                      <div className="border-t border-gray-100 mt-4 pt-4 flex items-center gap-2">
                        <button
                          onClick={() => hasFunnel ? setSelectedApp(appId) : handleLaunchApp(appId)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white ${colors.button} rounded-full transition-colors`}
                        >
                          Access Now
                        </button>
                        <a
                          href="mailto:support@lessoncraftstudio.com"
                          className="inline-flex items-center justify-center w-9 h-9 text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-full transition-colors shrink-0"
                          title="Support"
                        >
                          <LifeBuoy className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {accessibleApps.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No apps available</p>
                </div>
              )}
            </section>
          ) : (
            /* ════════════════════════════════════════
               VIEW 2: Funnel Detail View
               ════════════════════════════════════════ */
            (() => {
              const app = ALL_APPS[selectedApp];
              const funnel = getFunnelForApp(selectedApp);
              if (!funnel) return null;

              const group = funnelGroups.find(g => g.funnel.id === funnel.id);
              const products = group?.products ?? [];
              const colors = CATEGORY_COLORS[app.category] || CATEGORY_COLORS.math;

              return (
                <section>
                  {/* Back link with slide animation */}
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to My Apps
                  </button>

                  {/* Heading with category badge */}
                  <div className="text-center mb-8">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${colors.pill} mb-3`}>
                      {CATEGORY_LABELS[app.category] || app.category}
                    </span>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      {app.name} Generator
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
                      Use the Access Now options to access your purchases. Additional upgrades unlock more features.
                    </p>
                  </div>

                  {/* White container with colored top gradient */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <div className={`h-1.5 bg-gradient-to-r ${colors.gradient} to-transparent`} />
                    <div className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                        {products.map(({ productId, owned }) => {
                          const product = WPLUS_PRODUCTS[productId];
                          if (!product) return null;
                          const salesPage = getSalesPageByProductId(productId);

                          return owned ? (
                            /* ── Owned product card ── */
                            <div
                              key={productId}
                              className="bg-emerald-50 rounded-lg border border-emerald-200 p-5 relative"
                            >
                              <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                                <Check className="h-3 w-3" />
                                Owned
                              </span>
                              <h4 className="text-sm font-semibold text-gray-900 pr-16">
                                {product.name}
                              </h4>
                              <div className="mt-4">
                                <button
                                  onClick={() => handleLaunchApp(selectedApp)}
                                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                                >
                                  Access Now
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* ── Available upgrade card ── */
                            <div
                              key={productId}
                              className="bg-gray-50 rounded-lg border border-gray-200 p-5"
                            >
                              <h4 className="text-sm font-semibold text-gray-900">
                                {product.name}
                              </h4>
                              <div className="mt-4">
                                {salesPage ? (
                                  <a
                                    href={`/get/${salesPage.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-secondary-600 rounded-lg transition-colors"
                                  >
                                    Get This Upgrade
                                    <ShoppingCart className="h-3.5 w-3.5" />
                                  </a>
                                ) : (
                                  <p className="text-xs text-gray-400 text-center py-2">Coming Soon</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })()
          )}

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            {'\u00A9'} {new Date().getFullYear()} LessonCraftStudio
          </p>
          <a
            href="mailto:support@lessoncraftstudio.com"
            className="text-xs text-primary hover:text-primary-700 font-medium flex items-center gap-1.5 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            support@lessoncraftstudio.com
          </a>
        </div>
      </footer>
    </div>
  );
}
