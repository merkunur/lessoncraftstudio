'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, ExternalLink, Mail,
  LayoutGrid, LifeBuoy, User,
  Menu, X,
} from 'lucide-react';
import { ALL_APPS } from '@/config/products';
import type { AppId } from '@/config/products';
import { useAuth } from '@/contexts/auth-context';

interface MemberAccess {
  email: string;
  apps: string[];
}

/* ──────────────────────────────────────────────
   Category styling for the branded card design
   ────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, {
  border: string;
  text: string;
  button: string;
}> = {
  math:     { border: 'border-l-blue-500',    text: 'text-blue-600',    button: 'bg-blue-500 hover:bg-blue-600' },
  literacy: { border: 'border-l-emerald-500',  text: 'text-emerald-600',  button: 'bg-emerald-500 hover:bg-emerald-600' },
  visual:   { border: 'border-l-amber-500',    text: 'text-amber-600',    button: 'bg-amber-500 hover:bg-amber-600' },
  matching: { border: 'border-l-violet-500',   text: 'text-violet-600',   button: 'bg-violet-500 hover:bg-violet-600' },
  puzzle:   { border: 'border-l-red-500',      text: 'text-red-600',      button: 'bg-red-500 hover:bg-red-600' },
  search:   { border: 'border-l-cyan-500',     text: 'text-cyan-600',     button: 'bg-cyan-500 hover:bg-cyan-600' },
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

  const accessibleApps = access.apps.filter(id => id in ALL_APPS) as AppId[];

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

    const url = `/worksheet-generators/${encodeURIComponent(htmlFile)}?${params.toString()}`;
    window.open(url, '_blank');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Branded Header ── */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

          <div className="flex items-center gap-3">
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

        <div className="h-[3px] bg-gradient-to-r from-primary to-secondary" />

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

      {/* ── Main Content ── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <section>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-5">My Apps</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {accessibleApps.map(appId => {
                const app = ALL_APPS[appId];
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
                        onClick={() => handleLaunchApp(appId)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white ${colors.button} rounded-full transition-colors`}
                      >
                        Access Now
                        <ExternalLink className="h-3.5 w-3.5" />
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
                <p className="text-gray-500 text-sm">No apps purchased yet. Visit our pricing page to get started.</p>
              </div>
            )}
          </section>
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
