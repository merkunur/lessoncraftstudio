'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Zap, Crown, Shield, LogOut, Grid3X3, ExternalLink,
  Package, Check, Tag, ChevronRight, Key, Mail,
} from 'lucide-react';
import { ALL_APPS, APP_CATEGORIES, WPLUS_PRODUCTS, WPLUS_FUNNELS } from '@/config/warriorplus-products';
import type { AppId, CategoryId } from '@/config/warriorplus-products';
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
 * Returns { themes: string[] | 'all', langs: string[] | 'all' }
 * - 'all' means no restriction
 * - Array means only those values are allowed
 */
function computeEntitlements(
  appId: AppId,
  ownedProductIds: string[],
  highestTier: string
): { themes: string[] | 'all'; langs: string[] | 'all' } {
  // Full-access / commercial / agency overrides everything
  if (highestTier === 'full-access' || highestTier === 'commercial' || highestTier === 'agency') {
    return { themes: 'all', langs: 'all' };
  }

  // Find the funnel for this app (if any)
  const funnel = Object.values(WPLUS_FUNNELS).find(f => {
    const feProduct = WPLUS_PRODUCTS[f.fe];
    return feProduct?.apps.includes(appId);
  });

  if (!funnel) {
    // No funnel defined for this app — no restrictions (legacy behavior)
    return { themes: 'all', langs: 'all' };
  }

  // Check which funnel products the user owns
  const ownsFE = ownedProductIds.includes(funnel.fe);
  const ownsOTO1 = ownedProductIds.includes(funnel.oto1);
  const ownsOTO2 = funnel.oto2 ? ownedProductIds.includes(funnel.oto2) : false;

  // Themes: OTO1 unlocks all themes, otherwise FE themes only
  const feProduct = WPLUS_PRODUCTS[funnel.fe];
  const feThemes = feProduct?.includedThemes ?? [];
  const themes: string[] | 'all' = ownsOTO1 ? 'all' : (feThemes.length > 0 ? feThemes : 'all');

  // Languages: OTO2 unlocks all languages, otherwise English only
  const langs: string[] | 'all' = ownsOTO2 ? 'all' : ['en'];

  return { themes, langs };
}

// Category → Tailwind color classes (can't be dynamic)
const CATEGORY_STYLES: Record<string, { strip: string; badge: string; badgeText: string }> = {
  math:     { strip: 'bg-blue-500',    badge: 'bg-blue-100',    badgeText: 'text-blue-700' },
  literacy: { strip: 'bg-emerald-500', badge: 'bg-emerald-100', badgeText: 'text-emerald-700' },
  visual:   { strip: 'bg-amber-500',   badge: 'bg-amber-100',   badgeText: 'text-amber-700' },
  matching: { strip: 'bg-violet-500',  badge: 'bg-violet-100',  badgeText: 'text-violet-700' },
  puzzle:   { strip: 'bg-red-500',     badge: 'bg-red-100',     badgeText: 'text-red-700' },
  search:   { strip: 'bg-cyan-500',    badge: 'bg-cyan-100',    badgeText: 'text-cyan-700' },
};

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

  // Loading state
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-30" />
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  LessonCraftStudio
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                    Member
                  </span>
                  <span className="text-sm text-gray-500">{access.email}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-100 rounded-xl p-3">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {accessibleApps.length}
              </span>
            </div>
            <h3 className="text-gray-900 font-semibold">Apps Available</h3>
            <p className="text-sm text-gray-500 mt-1">In your current plan</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-rose-100 rounded-xl p-3">
                <Crown className="h-6 w-6 text-rose-600" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                {tierLabels[access.highestTier] || access.highestTier}
              </span>
            </div>
            <h3 className="text-gray-900 font-semibold">Your Plan</h3>
            {access.hasCommercialLicense && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Commercial Rights
                </span>
              </div>
            )}
            {!access.hasCommercialLicense && (
              <p className="text-sm text-gray-500 mt-1">Your membership level</p>
            )}
          </div>
        </div>

        {/* Generators Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Gradient header with filters */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 sm:px-8 py-6">
            <div className="flex items-center gap-3 mb-4">
              <Grid3X3 className="h-6 w-6 text-white" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Your Generators</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
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
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
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

          {/* App grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredApps.map(appId => {
                const app = ALL_APPS[appId];
                const category = APP_CATEGORIES[app.category as CategoryId];
                const catStyle = CATEGORY_STYLES[app.category] || CATEGORY_STYLES.math;

                return (
                  <div
                    key={appId}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onClick={() => handleLaunchApp(appId)}
                  >
                    {/* Category color strip */}
                    <div className={`h-1.5 ${catStyle.strip}`} />

                    <div className="p-5">
                      <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 ${catStyle.badge} ${catStyle.badgeText}`}>
                        {category?.name}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mb-4 leading-snug">
                        {app.name}
                      </h3>
                      <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={(e) => { e.stopPropagation(); handleLaunchApp(appId); }}
                      >
                        Launch App
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 font-medium">No apps in this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Your Toolkit */}
        {(() => {
          const ownedProductIds = new Set(access.licenses.map(l => l.productId));
          const funnelProducts: Array<{
            productId: string;
            owned: boolean;
            position: 'fe' | 'oto1' | 'oto2';
          }> = [];

          for (const funnel of Object.values(WPLUS_FUNNELS)) {
            const ownsFE = ownedProductIds.has(funnel.fe);
            if (!ownsFE) continue;

            funnelProducts.push({ productId: funnel.fe, owned: true, position: 'fe' });
            funnelProducts.push({ productId: funnel.oto1, owned: ownedProductIds.has(funnel.oto1), position: 'oto1' });
            if (funnel.oto2) {
              funnelProducts.push({ productId: funnel.oto2, owned: ownedProductIds.has(funnel.oto2), position: 'oto2' });
            }
          }

          if (funnelProducts.length === 0) return null;

          return (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Your Toolkit</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">Products you own and available add-ons</p>
              <div className="space-y-4">
                {funnelProducts.map(({ productId, owned }) => {
                  const product = WPLUS_PRODUCTS[productId];
                  if (!product) return null;
                  const salesPage = getSalesPageByProductId(productId);

                  return (
                    <div
                      key={productId}
                      className={`bg-white rounded-2xl shadow-md overflow-hidden border-l-4 ${
                        owned ? 'border-l-emerald-500' : 'border-l-amber-400'
                      }`}
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          {owned ? (
                            <div className="shrink-0 bg-emerald-100 rounded-xl p-2.5">
                              <Check className="h-5 w-5 text-emerald-600" />
                            </div>
                          ) : (
                            <div className="shrink-0 bg-amber-100 rounded-xl p-2.5">
                              <Tag className="h-5 w-5 text-amber-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
                              {owned && (
                                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">
                                  Owned
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{product.description}</p>
                          </div>
                        </div>

                        {!owned && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <ul className="space-y-1.5 mb-4">
                              {product.features.slice(0, 3).map((feat, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                  {feat}
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                {product.comparePrice && (
                                  <span className="text-sm text-gray-400 line-through">${product.comparePrice}</span>
                                )}
                                <span className="text-xs text-gray-400">one-time</span>
                              </div>
                              {salesPage && (
                                <a
                                  href={`/get/${salesPage.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                  Learn More
                                  <ChevronRight className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* License Keys */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Key className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Your Licenses</h2>
          </div>
          <div className="space-y-3">
            {access.licenses.map((license, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 flex items-center justify-between flex-wrap gap-3"
              >
                <div className="space-y-1">
                  <span className="block font-mono text-sm text-gray-800 tracking-wide">
                    {license.licenseKey}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {WPLUS_PRODUCTS[license.productId]?.name || tierLabels[license.productTier] || license.productTier}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      license.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {license.status}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(license.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
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
