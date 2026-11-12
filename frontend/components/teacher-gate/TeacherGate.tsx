'use client';

/**
 * What a visitor without the plan sees when she asks for a Teacher-only file (Daily Teaching System, Part 11.2).
 *
 * Before: the gate (GET /api/quota/dl?kind=teacher) answered with a bare redirect to the sign-up or the pricing
 * page, and nothing said why. Now the page asks the gate first (its `probe=1` answer). A subscriber gets the file as
 * before. Everybody else gets a panel on the same page: what the file is, what the plan costs, what else the plan
 * gives in this language, and one button to the plan.
 *
 * Mounted once per page (unit, year plan, sub plan). It handles every link to the gate on the page, and the two
 * buttons that ask the gate themselves (UnitBundleButton, SaveToCollectionsButton) hand over through the event
 * `lcs-teacher-gate`. It also counts the click (components/tracking/PathEvents.tsx; counts only).
 *
 * Without JavaScript the links still work as before: they are plain links to the gate.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { fileKind } from '@/components/tracking/PathEvents';
import type { TeacherGateProps } from '@/lib/teacher-gate';

type Umami = { track: (event: string, data?: Record<string, unknown>) => void };
const track = (name: string, data: Record<string, unknown>) => { try { (window as unknown as { umami?: Umami }).umami?.track(name, data); } catch { /* counting never breaks a page */ } };
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));

export interface TeacherGateDetail { what: string; to?: string | null }

export default function TeacherGate({ locale, plan, surface, gate }: { locale: string; plan: string; surface: 'unit' | 'year-plan' | 'sub-plan'; gate: TeacherGateProps }) {
  const { ui, price, monthly, facts } = gate;
  const [open, setOpen] = useState<{ what: string; signedOut: boolean } | null>(null);
  const main = useRef<HTMLAnchorElement>(null);
  const back = useRef<HTMLElement | null>(null);

  const show = useCallback((what: string, to: string | null | undefined) => {
    back.current = document.activeElement as HTMLElement | null;
    setOpen({ what, signedOut: !!to && to.includes('/auth/') });
  }, []);
  const close = useCallback(() => { setOpen(null); back.current?.focus?.(); }, []);

  useEffect(() => {
    // a link to the gate: ask first, then give the file or open the panel
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="/api/quota/dl?kind=teacher"]') as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute('href') || '';
      let what = 'other';
      try { what = fileKind(new URL(href, window.location.origin).searchParams.get('file') || ''); } catch { /* keep "other" */ }
      track('teacher-file-click', { what, surface });
      e.preventDefault();
      fetch(`${href}&probe=1`, { credentials: 'include', cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
        .then((answer: { ok: boolean; to: string | null }) => { if (answer.ok) window.location.href = href; else show(what, answer.to); })
        .catch(() => { window.location.href = href; });          // the gate itself decides when the question fails
    };
    // a button that asked the gate itself and was refused
    const onGate = (e: Event) => {
      const d = (e as CustomEvent<TeacherGateDetail>).detail;
      if (!d || !d.what) return;
      e.preventDefault();                                          // tells the button that the panel has taken over
      track('teacher-file-click', { what: d.what, surface });
      show(d.what, d.to);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('lcs-teacher-gate', onGate);
    return () => { document.removeEventListener('click', onClick); window.removeEventListener('lcs-teacher-gate', onGate); };
  }, [show, surface]);

  useEffect(() => {
    if (!open) return;
    main.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;
  // a line is shown from two of a thing on: every string is written in the plural
  const gives: string[] = [ui.gives_downloads];
  if (facts.units > 1) gives.push(fill(ui.gives_units, { n: facts.units }));
  if (facts.plans > 1) gives.push(fill(ui.gives_plans, { n: facts.plans }));
  if (facts.subPlans > 1) gives.push(fill(ui.gives_subPlans, { n: facts.subPlans }));
  if (facts.checks > 1) gives.push(fill(ui.gives_checks, { n: facts.checks }));
  const cta = (which: 'plan' | 'sign-in') => () => {
    track('teacher-gate-cta', { what: open.what, cta: which });
    try { window.sessionStorage.setItem('lcs-return', window.location.pathname); } catch { /* not kept */ }   // read once by components/my-teaching/MyTeaching.tsx
  };
  return (
    <div className="un-gate" role="presentation" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="un-gate-panel" role="dialog" aria-modal="true" aria-labelledby="un-gate-title">
        <button type="button" className="un-gate-x" onClick={close} aria-label={ui.closeLabel}>×</button>
        <h2 id="un-gate-title">{fill(ui.title, { plan })}</h2>
        <p className="un-gate-what">{fill(ui[`what_${open.what}`] || ui.what_other, { plan })}</p>
        <div className="un-gate-plan">
          <p className="un-gate-plan-name">{fill(ui.planTitle, { plan })}</p>
          <p className="un-gate-price">{fill(ui.planPrice, { price, monthly })}</p>
          <p className="un-gate-gives">{ui.planGives}</p>
          <ul>{gives.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>
        <a ref={main} className="un-btn un-btn-main" href={`/${locale}/pricing?from=teacher-file`} onClick={cta('plan')}>{fill(ui.seePlan, { plan })}</a>
        {open.signedOut ? <a className="un-gate-link" href={`/${locale}/auth/signin?from=teacher-file`} onClick={cta('sign-in')}>{ui.signIn}</a> : null}
        <button type="button" className="un-gate-later" onClick={close}>{ui.notNow}</button>
      </div>
    </div>
  );
}
