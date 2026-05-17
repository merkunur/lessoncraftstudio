'use client';

/**
 * Sign-in gate — replaces the prior quota gate.
 *
 * Per CLAUDE.md §7 (post-subscription-pivot): every download / play /
 * generator-app-action requires the user to be signed in. Browsing the
 * catalog (search / filter / view deck pages) stays anonymous-accessible
 * for SEO. Sample-deck iframes on marketing pages stay ungated for the
 * §3 acquisition flywheel.
 *
 * Usage:
 *   const { gatedClick } = useSignInGate();
 *   <a href={url} onClick={e => gatedClick(e, url)}>...</a>
 *
 * On click:
 *   - signed-in: navigate normally
 *   - not signed in: e.preventDefault() → redirect to
 *     /[locale]/auth/signup?redirect=<url>
 *
 * No modal — just a clean redirect with the original URL preserved for
 * post-signup return.
 */
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function useSignInGate() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const gatedClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      url: string,
      target: 'self' | 'blank' = 'self'
    ) => {
      // While auth state is loading on first paint, treat as unsigned to be
      // safe — but allow the navigation so users don't get redirected to
      // signup mid-hydration. Practical effect: 1-frame race window.
      if (loading) return;

      if (!user) {
        e.preventDefault();
        const signupUrl = `/${locale}/auth/signup?redirect=${encodeURIComponent(url)}`;
        if (target === 'blank') {
          window.open(signupUrl, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = signupUrl;
        }
        return;
      }
      // signed in — allow normal navigation (target=blank already on the
      // <a>; target=self happens via default click behavior)
    },
    [user, loading, locale]
  );

  return { gatedClick };
}
