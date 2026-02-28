'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, ExternalLink, Check, Key, Mail,
  ShoppingCart, LayoutGrid, LifeBuoy, User,
  Menu, X,
} from 'lucide-react';
import { ALL_APPS, WPLUS_PRODUCTS, WPLUS_FUNNELS } from '@/config/warriorplus-products';
import type { AppId, WPlusFunnel } from '@/config/warriorplus-products';
import { getSalesPageByProductId } from '@/config/sales-pages';

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
 * Compute theme/language entitlements for an app based on owned product IDs.
 */
function computeEntitlements(
  appId: AppId,
  ownedProductIds: string[],
  highestTier: string
): { themes: string[] | 'all'; langs: string[] | 'all' } {
  if (highestTier === 'full-access' || highestTier === 'commercial' || highestTier === 'agency') {
    return { themes: 'all', langs: 'all' };
  }

  const funnel = Object.values(WPLUS_FUNNELS).find(f => {
    const feProduct = WPLUS_PRODUCTS[f.fe];
    return feProduct?.apps.includes(appId);
  });

  if (!funnel) {
    return { themes: 'all', langs: 'all' };
  }

  const ownsFE = ownedProductIds.includes(funnel.fe);
  const ownsOTO1 = ownedProductIds.includes(funnel.oto1);
  const ownsOTO2 = funnel.oto2 ? ownedProductIds.includes(funnel.oto2) : false;

  const feProduct = WPLUS_PRODUCTS[funnel.fe];
  const feThemes = feProduct?.includedThemes ?? [];
  const themes: string[] | 'all' = ownsOTO1 ? 'all' : (feThemes.length > 0 ? feThemes : 'all');
  const langs: string[] | 'all' = ownsOTO2 ? 'all' : ['en'];

  return { themes, langs };
}

/** Get user-friendly position label */
function positionLabel(pos: 'fe' | 'oto1' | 'oto2'): string {
  if (pos === 'fe') return 'Front-End';
  return 'Add-On';
}

export default function MemberDashboard() {
  const router = useRouter();
  const [access, setAccess] = useState<MemberAccess | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('memberAccess');
    if (!stored) {
      router.push('/member');
      return;
    }
    try {
      setAccess(JSON.parse(stored));
    } catch {
      router.push('/member');
    }
  }, [router]);

  if (!access) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-700" />
      </div>
    );
  }

  const hasFullAccess = access.highestTier === 'full-access' ||
                        access.highestTier === 'commercial' ||
                        access.highestTier === 'agency';

  const accessibleApps = hasFullAccess
    ? Object.keys(ALL_APPS) as AppId[]
    : (access.apps.filter(id => id in ALL_APPS) as AppId[]);

  function handleLogout() {
    sessionStorage.removeItem('memberAccess');
    router.push('/member');
  }

  function handleLaunchApp(appId: AppId) {
    const htmlFile = ALL_APPS[appId].htmlFile;
    const tier = access?.highestTier || 'free';

    const ownedProductIds = access?.licenses.map(l => l.productId) || [];
    const { themes, langs } = computeEntitlements(appId, ownedProductIds, tier);

    const params = new URLSearchParams();
    params.set('tier', tier);
    params.set('themes', themes === 'all' ? 'all' : themes.join(','));
    params.set('langs', langs === 'all' ? 'all' : langs.join(','));

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
      {/* ── Dark Navy Navbar ── */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1 rounded hover:bg-slate-700 transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center">
                <LayoutGrid className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight hidden sm:inline">LessonCraftStudio</span>
            </div>
            {/* Nav links (desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              <span className="px-3 py-1.5 text-sm font-medium text-white bg-white/10 rounded-md">
                My Apps
              </span>
              <a
                href="mailto:support@lessoncraftstudio.com"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Support
              </a>
            </nav>
          </div>
          {/* Right: user + logout */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-300">{access.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
            <div className="h-8 w-8 bg-slate-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-slate-300" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ── Left Sidebar ── */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-56 bg-white border-r border-gray-200 shrink-0`}>
          <nav className="py-4 px-3 space-y-1">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium">
              <LayoutGrid className="h-4 w-4" />
              Apps
            </div>
            <a
              href="mailto:support@lessoncraftstudio.com"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors"
            >
              <LifeBuoy className="h-4 w-4" />
              Support
            </a>
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* ── My Apps Section ── */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Apps</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessibleApps.map(appId => {
                  const app = ALL_APPS[appId];
                  return (
                    <div
                      key={appId}
                      className="bg-white rounded-lg border border-gray-200 p-5"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Create {app.name.toLowerCase()} worksheets
                      </p>

                      <div className="border-t border-gray-100 mt-4 pt-4 flex gap-2">
                        <button
                          onClick={() => handleLaunchApp(appId)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-full transition-colors"
                        >
                          Access Now
                        </button>
                        <a
                          href="mailto:support@lessoncraftstudio.com"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-full transition-colors"
                        >
                          Support
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

            {/* ── Your Toolkit (Funnel Products) ── */}
            {funnelGroups.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Toolkit</h2>

                <div className="space-y-6">
                  {funnelGroups.map(({ funnel, feAppName, feAppId, products }) => (
                    <div key={funnel.id}>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {feAppName} Studio
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Your {feAppName.toLowerCase()} products and add-ons
                      </p>

                      <div className="bg-gray-100 rounded-xl p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {products.map(({ productId, owned, position }) => {
                            const product = WPLUS_PRODUCTS[productId];
                            if (!product) return null;
                            const salesPage = getSalesPageByProductId(productId);

                            return (
                              <div
                                key={productId}
                                className="bg-white rounded-lg border border-gray-200 p-4 relative"
                              >
                                {/* Green check for owned */}
                                {owned && (
                                  <div className="absolute top-3 right-3 h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <Check className="h-3.5 w-3.5 text-white" />
                                  </div>
                                )}

                                <h4 className="text-sm font-semibold text-gray-900 pr-8">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {positionLabel(position)}
                                </p>

                                <div className="mt-4">
                                  {owned ? (
                                    <button
                                      onClick={() => handleLaunchApp(feAppId)}
                                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors"
                                    >
                                      Access Now
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </button>
                                  ) : salesPage ? (
                                    <a
                                      href={`/get/${salesPage.slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                                    >
                                      Purchase Now
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
                  ))}
                </div>
              </section>
            )}

            {/* ── License Keys ── */}
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Your Licenses</h2>
              <div className="space-y-2">
                {access.licenses.map((license, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between flex-wrap gap-2"
                  >
                    <div className="min-w-0">
                      <span className="block font-mono text-xs text-gray-700 tracking-wide truncate">
                        {license.licenseKey}
                      </span>
                      <span className="block text-xs text-gray-400 mt-0.5">
                        {WPLUS_PRODUCTS[license.productId]?.name || license.productTier}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          license.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {license.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(license.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Need help?{' '}
            <a
              href="mailto:support@lessoncraftstudio.com"
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              support@lessoncraftstudio.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
