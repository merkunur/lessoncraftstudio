'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { mountClasses } from '@/lib/class-results/teacher-app';

/**
 * Mounts the framework-free Classes screen (lib/class-results/teacher-app.ts) once the visitor's account is known.
 *
 * The screen talks to /api/classes/* with the site's own cookie (the refresh cookie identifies the teacher, as for
 * the play meter and the makers), so nothing here handles a token. What the account may do is decided by the API on
 * every call; `usable` only chooses the first screen (the list, or the example dashboard).
 */
const ORIGIN = 'https://www.lessoncraftstudio.com'; // the class link a teacher copies is always the www address

export default function ClassesClient({ locale, strings, plan, pricingPublic }: { locale: string; strings: Record<string, string>; plan: string; pricingPublic: boolean }) {
  const { user, loading } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const signedIn = !!user;
  const usable = isLcsSubscriptionActive(user);

  useEffect(() => {
    if (loading || !ref.current) return undefined;
    const app = mountClasses(ref.current, {
      locale,
      strings,
      origin: ORIGIN,
      signedIn,
      usable,
      plan,
      pricingUrl: pricingPublic ? `/${locale}/pricing` : null,
      signInUrl: `/${locale}/auth/signin`,
      worksheetsUrl: `/${locale}/worksheets`,
      qrUrl: (link: string) => '/api/qr?u=' + encodeURIComponent(link),
    });
    return () => app.destroy();
  }, [loading, signedIn, usable, locale, strings, plan, pricingPublic]);

  return <div ref={ref} />;
}
