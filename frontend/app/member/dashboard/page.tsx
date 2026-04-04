'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, ExternalLink, Mail, Play,
  User, ShoppingCart,
  Menu, X, CheckCircle, Calculator,
  BookOpen, Palette, Puzzle, Lightbulb, Search,
  Package, ChevronDown, ChevronUp, LayoutGrid,
} from 'lucide-react';
import { ALL_APPS, APP_CATEGORIES } from '@/config/products';
import type { AppId, CategoryId } from '@/config/products';
import { getCheckoutUrl, getBundleCheckoutUrl } from '@/config/lemonsqueezy-products';
import { useAuth } from '@/contexts/auth-context';

interface MemberAccess {
  email: string;
  apps: string[];
}

/* ──────────────────────────────────────────────
   Category styling
   ────────────────────────────────────────────── */

const CATEGORY_STYLES: Record<string, {
  border: string;
  text: string;
  button: string;
  bg: string;
  bgLight: string;
  ring: string;
  iconBg: string;
}> = {
  math: {
    border: 'border-blue-500',
    text: 'text-blue-600',
    button: 'bg-blue-500 hover:bg-blue-600',
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    ring: 'ring-blue-200',
    iconBg: 'bg-blue-100',
  },
  literacy: {
    border: 'border-emerald-500',
    text: 'text-emerald-600',
    button: 'bg-emerald-500 hover:bg-emerald-600',
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    ring: 'ring-emerald-200',
    iconBg: 'bg-emerald-100',
  },
  visual: {
    border: 'border-amber-500',
    text: 'text-amber-600',
    button: 'bg-amber-500 hover:bg-amber-600',
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    ring: 'ring-amber-200',
    iconBg: 'bg-amber-100',
  },
  matching: {
    border: 'border-violet-500',
    text: 'text-violet-600',
    button: 'bg-violet-500 hover:bg-violet-600',
    bg: 'bg-violet-500',
    bgLight: 'bg-violet-50',
    ring: 'ring-violet-200',
    iconBg: 'bg-violet-100',
  },
  puzzle: {
    border: 'border-red-500',
    text: 'text-red-600',
    button: 'bg-red-500 hover:bg-red-600',
    bg: 'bg-red-500',
    bgLight: 'bg-red-50',
    ring: 'ring-red-200',
    iconBg: 'bg-red-100',
  },
  search: {
    border: 'border-cyan-500',
    text: 'text-cyan-600',
    button: 'bg-cyan-500 hover:bg-cyan-600',
    bg: 'bg-cyan-500',
    bgLight: 'bg-cyan-50',
    ring: 'ring-cyan-200',
    iconBg: 'bg-cyan-100',
  },
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  calculator: Calculator,
  'book-open': BookOpen,
  palette: Palette,
  puzzle: Puzzle,
  lightbulb: Lightbulb,
  search: Search,
};

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */

export default function MemberDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [access, setAccess] = useState<MemberAccess | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/member');
      return;
    }
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

  if (!access) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-primary" />
        <p className="text-sm text-gray-500 font-medium">Loading your toolkit...</p>
      </div>
    );
  }

  const purchasedApps = new Set(access.apps.filter(id => id in ALL_APPS));
  const totalPurchased = purchasedApps.size;
  const totalApps = Object.keys(ALL_APPS).length;

  async function handleLogout() {
    await logout();
    router.push('/member');
  }

  function handleLaunchApp(appId: AppId) {
    const htmlFile = ALL_APPS[appId].htmlFile;
    const params = new URLSearchParams();
    params.set('tier', 'full-access');
    params.set('themes', 'all');
    params.set('langs', 'all');
    params.set('modes', 'all');
    window.open(`/worksheet-generators/${encodeURIComponent(htmlFile)}?${params.toString()}`, '_blank');
  }

  function handleFreeTrial(appId: AppId) {
    const htmlFile = ALL_APPS[appId].htmlFile;
    window.open(`/worksheet-generators/${encodeURIComponent(htmlFile)}?tier=free`, '_blank');
  }

  function toggleCategory(categoryId: string) {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }

  const categoryEntries = Object.entries(APP_CATEGORIES) as [CategoryId, typeof APP_CATEGORIES[CategoryId]][];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Site Navigation (matches main site) ── */}
      <nav className="bg-white border-b border-gray-200 relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[60px] md:h-[140px]">
            {/* Logo — same as main Navigation */}
            <a href="/en" className="flex items-center space-x-2 md:space-x-4 h-full relative z-10">
              <div className="flex items-center justify-center h-[67px] md:h-[151px] w-auto max-w-[108px] md:max-w-[242px]">
                <picture>
                  <source srcSet="/logo-lcs.webp" type="image/webp" />
                  <img
                    src="/logo-lcs-optimized.png"
                    alt="LessonCraftStudio"
                    loading="eager"
                    fetchPriority="high"
                    width={242}
                    height={313}
                    className="max-h-[67px] md:max-h-[151px] max-w-[108px] md:max-w-[242px] w-auto h-auto object-contain relative -z-10"
                  />
                </picture>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-display font-bold text-base sm:text-lg md:text-2xl text-gray-900 tracking-tight leading-none">
                  LessonCraftStudio
                </span>
                <span className="hidden sm:block text-[10px] md:text-xs text-gray-500 tracking-wide mt-0.5">
                  Professional Printable Generator
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/en/apps" className="text-gray-600 hover:text-primary transition-colors">Apps</a>
              <a href="/en/pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <span className="text-primary font-medium border-b-2 border-primary pb-0.5">My Apps</span>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-500">{access.email}</span>
              <div className="h-6 w-px bg-gray-300" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="/en/apps" className="block py-2 text-gray-600 hover:text-primary transition-colors">Apps</a>
              <a href="/en/pricing" className="block py-2 text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <span className="block py-2 text-primary font-medium">My Apps</span>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <p className="text-sm text-gray-500">{access.email}</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Main Content ── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ── Stats Bar ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  Your Toolkit
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {totalPurchased === 0
                    ? 'Try any app free with watermark, or purchase for clean exports + commercial license.'
                    : `${totalPurchased} of ${totalApps} apps purchased`}
                </p>
              </div>
              <div className="flex items-center gap-3 min-w-[200px]">
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${(totalPurchased / totalApps) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {totalPurchased}/{totalApps}
                </span>
              </div>
            </div>
          </div>

          {/* ── Category Sections ── */}
          {categoryEntries.map(([categoryId, category]) => {
            const styles = CATEGORY_STYLES[categoryId] || CATEGORY_STYLES.math;
            const IconComponent = CATEGORY_ICONS[category.icon] || LayoutGrid;
            const apps = category.apps;
            const ownedInCategory = apps.filter(id => purchasedApps.has(id)).length;
            const allOwned = ownedInCategory === apps.length;
            const isCollapsed = collapsedCategories.has(categoryId);

            return (
              <section key={categoryId} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Category Header */}
                <div
                  className={`px-6 py-5 border-b border-gray-100 cursor-pointer select-none ${styles.bgLight}`}
                  onClick={() => toggleCategory(categoryId)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl ${styles.iconBg} flex items-center justify-center shrink-0`}>
                        <IconComponent className={`h-6 w-6 ${styles.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-display font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          {allOwned ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Complete
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-gray-400">
                              {ownedInCategory}/{apps.length} owned
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {!allOwned && (
                        <a
                          href={getBundleCheckoutUrl(categoryId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white ${styles.button} rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
                        >
                          <Package className="h-4 w-4" />
                          Buy Bundle - $149
                        </a>
                      )}
                      {isCollapsed
                        ? <ChevronDown className="h-5 w-5 text-gray-400" />
                        : <ChevronUp className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                </div>

                {/* App Cards Grid */}
                {!isCollapsed && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {apps.map(appId => {
                        const app = ALL_APPS[appId];
                        const owned = purchasedApps.has(appId);

                        if (owned) {
                          return (
                            <div
                              key={appId}
                              className={`relative rounded-xl border-2 ${styles.border} bg-white p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${styles.text}`}>
                                    {category.name}
                                  </span>
                                  <h4 className="text-base font-display font-semibold text-gray-900 mt-0.5">
                                    {app.name}
                                  </h4>
                                </div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
                                  <CheckCircle className="h-3 w-3" />
                                  Owned
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mb-4">
                                Create {app.name.toLowerCase()} worksheets
                              </p>
                              <button
                                onClick={() => handleLaunchApp(appId)}
                                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white ${styles.button} rounded-xl transition-colors`}
                              >
                                <ExternalLink className="h-4 w-4" />
                                Access Now
                              </button>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={appId}
                            className="relative rounded-xl border border-gray-200 bg-white p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                  {category.name}
                                </span>
                                <h4 className="text-base font-display font-semibold text-gray-900 mt-0.5">
                                  {app.name}
                                </h4>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">
                              Create {app.name.toLowerCase()} worksheets
                            </p>
                            <div className="flex gap-2">
                              <a
                                href={getCheckoutUrl(appId)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors"
                              >
                                <ShoppingCart className="h-3.5 w-3.5" />
                                Buy $49
                              </a>
                              <button
                                onClick={() => handleFreeTrial(appId)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                              >
                                <Play className="h-3.5 w-3.5" />
                                Free Trial
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          {/* ── Empty State (no apps in system — shouldn't happen but safety) ── */}
          {totalApps === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <LayoutGrid className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No apps available</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Something went wrong loading the app catalog. Please contact support.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            {'©'} {new Date().getFullYear()} LessonCraftStudio
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
