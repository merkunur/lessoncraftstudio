'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Shield, LogOut, Grid3X3, ExternalLink,
  Package, Check, Tag, Key, Mail, ChevronRight,
  ShoppingCart,
} from 'lucide-react';
import { ALL_APPS, APP_CATEGORIES, WPLUS_PRODUCTS, WPLUS_FUNNELS } from '@/config/warriorplus-products';
import type { AppId, CategoryId, WPlusFunnel } from '@/config/warriorplus-products';
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

// Category color strips for app cards
const CATEGORY_STYLES: Record<string, { strip: string }> = {
  math:     { strip: 'bg-blue-500' },
  literacy: { strip: 'bg-emerald-500' },
  visual:   { strip: 'bg-amber-500' },
  matching: { strip: 'bg-violet-500' },
  puzzle:   { strip: 'bg-red-500' },
  search:   { strip: 'bg-cyan-500' },
};

/** Get user-friendly position label */
function positionLabel(pos: 'fe' | 'oto1' | 'oto2'): string {
  if (pos === 'fe') return 'Front-End';
  return 'Add-On';
}

export default function MemberDashboard() {
  const router = useRouter();
  const [access, setAccess] = useState<MemberAccess | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-indigo-600 animate-pulse" />
        </div>
      </div>
    );
  }

  const hasFullAccess = access.highestTier === 'full-access' ||
                        access.highestTier === 'commercial' ||
                        access.highestTier === 'agency';

  const accessibleApps = hasFullAccess
    ? Object.keys(ALL_APPS) as AppId[]
    : (access.apps.filter(id => id in ALL_APPS) as AppId[]);

  const filteredApps = activeCategory === 'all'
    ? accessibleApps
    : accessibleApps.filter(id => ALL_APPS[id].category === activeCategory);

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

  const tierLabels: Record<string, string> = {
    'single-app': 'Single App',
    'category-bundle': 'Category Bundle',
    'full-access': 'Full Access',
    'commercial': 'Commercial License',
    'agency': 'Agency License',
  };

  const tierLabel = tierLabels[access.highestTier] || access.highestTier;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LessonCraftStudio
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Info Bar (replaces stat cards) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              <Shield className="h-3.5 w-3.5" />
              {tierLabel}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 font-medium">{accessibleApps.length} apps</span>
            {access.hasCommercialLicense && (
              <>
                <span className="text-gray-400">|</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-semibold">
                  <Check className="h-3 w-3" />
                  Commercial
                </span>
              </>
            )}
          </div>
          <span className="text-sm text-gray-500">{access.email}</span>
        </div>

        {/* Generators Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header with filters */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Grid3X3 className="h-5 w-5 text-white" />
              <h2 className="text-lg font-bold text-white">Your Generators</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-indigo-700 shadow-md'
                    : 'bg-white/20 text-white/90 hover:bg-white/30'
                }`}
              >
                All ({accessibleApps.length})
              </button>
              {(Object.entries(APP_CATEGORIES) as [CategoryId, typeof APP_CATEGORIES[CategoryId]][]).map(([catId, cat]) => {
                const count = accessibleApps.filter(id => ALL_APPS[id].category === catId).length;
                if (count === 0) return null;
                return (
                  <button
                    key={catId}
                    onClick={() => setActiveCategory(catId)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeCategory === catId
                        ? 'bg-white text-indigo-700 shadow-md'
                        : 'bg-white/20 text-white/90 hover:bg-white/30'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* App grid — compact */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredApps.map(appId => {
                const app = ALL_APPS[appId];
                const catStyle = CATEGORY_STYLES[app.category] || CATEGORY_STYLES.math;

                return (
                  <div
                    key={appId}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    onClick={() => handleLaunchApp(appId)}
                  >
                    <div className={`h-1 ${catStyle.strip}`} />
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2.5 leading-snug">
                        {app.name}
                      </h3>
                      <button
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm"
                        onClick={(e) => { e.stopPropagation(); handleLaunchApp(appId); }}
                      >
                        Launch App
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 text-sm">No apps in this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Your Toolkit — funnel-grouped */}
        {funnelGroups.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Your Toolkit</h2>
            </div>

            <div className="space-y-5">
              {funnelGroups.map(({ funnel, feAppName, feAppId, products }) => (
                <div key={funnel.id}>
                  {/* Funnel heading */}
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    {feAppName} Studio
                  </h3>

                  {/* Product cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.map(({ productId, owned, position }) => {
                      const product = WPLUS_PRODUCTS[productId];
                      if (!product) return null;
                      const salesPage = getSalesPageByProductId(productId);

                      return (
                        <div
                          key={productId}
                          className={`bg-white rounded-xl border overflow-hidden shadow-sm ${
                            owned
                              ? 'border-l-4 border-l-emerald-500 border-t-gray-200 border-r-gray-200 border-b-gray-200'
                              : 'border-l-4 border-l-amber-400 border-t-gray-200 border-r-gray-200 border-b-gray-200'
                          }`}
                        >
                          <div className="p-3">
                            {/* Top row: name + check/price */}
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-gray-900 leading-tight">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {positionLabel(position)}
                                </p>
                              </div>
                              {owned ? (
                                <div className="shrink-0 bg-emerald-100 rounded-full p-1">
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                </div>
                              ) : (
                                <span className="shrink-0 text-sm font-bold text-gray-600">
                                  ${product.price}
                                </span>
                              )}
                            </div>

                            {/* Action button */}
                            <div className="mt-3">
                              {owned ? (
                                <button
                                  onClick={() => handleLaunchApp(feAppId)}
                                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
                                >
                                  Access Now
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </button>
                              ) : salesPage ? (
                                <a
                                  href={`/get/${salesPage.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors shadow-sm"
                                >
                                  Purchase Now
                                  <ShoppingCart className="h-3.5 w-3.5" />
                                </a>
                              ) : (
                                <p className="text-xs text-gray-400 text-center py-1.5">Coming Soon</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* License Keys — compact */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Key className="h-4 w-4 text-gray-700" />
            <h2 className="text-base font-semibold text-gray-900">Your Licenses</h2>
          </div>
          <div className="space-y-2">
            {access.licenses.map((license, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2.5 flex items-center justify-between flex-wrap gap-2"
              >
                <div className="min-w-0">
                  <span className="block font-mono text-xs text-gray-700 tracking-wide truncate">
                    {license.licenseKey}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">
                    {WPLUS_PRODUCTS[license.productId]?.name || tierLabels[license.productTier] || license.productTier}
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
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Need help?{' '}
            <a
              href="mailto:support@lessoncraftstudio.com"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
