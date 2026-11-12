'use client';

/**
 * The steps of the path from a visitor to the Teacher plan (Daily Teaching System, Part 11.1; PLAN.md Part 11).
 *
 * Aggregate counting only, through the first-party beacon (components/tracking/UmamiBeacon.tsx): no cookie, no
 * stored id, and no property that names a person. Every property comes from a fixed list below, never from free
 * text, so a report can count it and nothing identifying can ride along.
 *
 *   <PathStep name="pricing-open" />   one event when the page opens, with where the visitor was sent from
 *   <TeacherFileClicks surface="unit" />   one event per click on a Teacher-only file or button of the page
 *   pathFrom()                           the same "from" for an event sent elsewhere (sign-up, checkout)
 *
 * Read by scripts/seo/path-report.sh.
 */
import { useEffect } from 'react';

type Umami = { track: (event: string, data?: Record<string, unknown>) => void };
const beacon = (): Umami | undefined => (window as unknown as { umami?: Umami }).umami;

/** where a wall or a gate sends a visitor from (app/api/quota/dl, components/quota, components/units) */
const FROM = new Set(['download', 'download-limit', 'wall', 'teacher-file', 'workspace', 'play']);

/** the `from` of this page's address, or "direct" (anything outside the list is "other": no free text is recorded) */
export function pathFrom(): string {
  try {
    const f = new URLSearchParams(window.location.search).get('from');
    return f == null ? 'direct' : FROM.has(f) ? f : 'other';
  } catch {
    return 'direct';
  }
}

/** sends when the beacon is there; it loads after the page is interactive, so a step waits for it for a few seconds */
function send(name: string, data: Record<string, unknown>) {
  let tries = 0;
  const go = () => {
    const u = beacon();
    if (u) { try { u.track(name, data); } catch { /* counting must never break a page */ } return; }
    if (++tries < 16) window.setTimeout(go, 250);
  };
  go();
}

export function PathStep({ name }: { name: 'pricing-open' | 'signup-open' }) {
  useEffect(() => { send(name, { from: pathFrom() }); }, [name]);
  return null;
}

/** what a Teacher-only file is, from its name in the gate's address (lib/teacher-files.ts): a short fixed word */
export function fileKind(file: string): string {
  const [folder, , name = ''] = file.split('/');
  const base = name.replace(/\.pdf$/, '').replace(/-[ab]$/, '');
  if (folder === 'checks') return base === 'key' ? 'check-key' : base === 'teacher-pages' ? 'check-teacher-pages' : 'check-other';
  if (folder === 'units') return /guide/.test(base) ? 'unit-guide' : /scope|plan/.test(base) ? 'year-plan' : 'unit-other';
  if (folder === 'sub-plans') return 'sub-plan-file';
  return 'other';
}

export function TeacherFileClicks({ surface }: { surface: 'unit' | 'year-plan' | 'sub-plan' | 'curriculum' }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('a[href*="/api/quota/dl?kind=teacher"], [data-path-event]');
      if (!el) return;
      let what = el.getAttribute('data-path-event') || 'other';
      const href = el.getAttribute('href') || '';
      if (href.includes('kind=teacher')) {
        try { what = fileKind(new URL(href, window.location.origin).searchParams.get('file') || ''); } catch { /* keep "other" */ }
      }
      const u = beacon();
      try { u?.track('teacher-file-click', { what, surface }); } catch { /* no-op */ }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [surface]);
  return null;
}
