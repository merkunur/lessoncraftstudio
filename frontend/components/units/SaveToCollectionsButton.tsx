'use client';
/* "Save the pages to my collections": the worksheets of a unit or a sub pack become one collection of the teacher's,
 * in lesson order (POST /api/collections/from-pack). Collections belong to the paid plan, like the two files of the
 * box this button sits in: a visitor who is not signed in is sent to sign-up, an account without the plan to pricing. */
import { useState } from 'react';

interface Labels { button: string; done: string; open: string; failed: string }

export default function SaveToCollectionsButton({ locale, kind, slug, labels }: { locale: string; kind: 'unit' | 'sub-plan'; slug: string; labels: Labels }) {
  const [state, setState] = useState<{ phase: 'idle' | 'working' | 'done' | 'failed'; n: number }>({ phase: 'idle', n: 0 });

  async function save() {
    if (state.phase === 'working') return;
    let token: string | null = null;
    try { token = window.localStorage.getItem('accessToken'); } catch { /* storage blocked: treated as signed out */ }
    if (!token) { window.location.href = `/${locale}/auth/signup?from=teacher-file`; return; }
    setState({ phase: 'working', n: 0 });
    try {
      const res = await fetch('/api/collections/from-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind, locale, slug }),
      });
      if (res.status === 401) { window.location.href = `/${locale}/auth/signin?from=teacher-file`; return; }
      if (res.status === 403) { window.location.href = `/${locale}/pricing?from=teacher-file`; return; }
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { total: number };
      setState({ phase: 'done', n: data.total });
    } catch {
      setState({ phase: 'failed', n: 0 });
    }
  }

  return (
    <div className="un-save">
      <button type="button" className="un-btn un-btn-ghost" data-path-event="save-to-collections" onClick={save} disabled={state.phase === 'working'} aria-busy={state.phase === 'working'}>{labels.button}</button>
      <p className="un-bundle-status" role="status" aria-live="polite">
        {state.phase === 'done' ? <>{labels.done.replace('{n}', String(state.n))} <a href={`/${locale}/collections`}>{labels.open}</a></> : state.phase === 'failed' ? labels.failed : ''}
      </p>
    </div>
  );
}
