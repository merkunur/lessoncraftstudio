'use client';
/* An activity played through a class link (Daily Teaching System, Part 9 release 2).
 *
 * The activity page renders this component ONLY while class results are switched on (CLASS_RESULTS_ENABLED); it does
 * nothing unless the address carries an attempt token after '#' (#lcs=<20 characters>), which only the class page
 * hands out. With a token it does four things, and nothing in any activity or in the activity shell changes for it:
 *
 *  1. Class mode. The activity fills the screen; the site's header, footer and every link out are covered, so a
 *     child cannot wander off. No score, streak, timer or ranking is shown to the child.
 *  2. It listens. The activity shell calls window.LCS_TRACK(event, payload) on every press of ITS Check button
 *     ("<tool>:task:check", { id, ok }); the activity runs in a same-origin frame, so the hook is set on the frame's
 *     window from here. A task counts as right when its FIRST try was right.
 *  3. It never invents a mark. Measured 2026-11-11 over the 203 activities: in 167 the activity judges a try itself,
 *     keeps a wrong try to itself and presses the shell's Check only once the task is solved, so the shell hears
 *     "right" for every task. Marks from those would read 7 of 7 for every child. A solved task therefore counts
 *     toward marks only when its tries are KNOWN, in one of two ways:
 *       a. the shell judged it: every Check the shell heard was a real press by the child (a click event the browser
 *          marks as trusted), so each wrong try was heard as { ok: false };
 *       b. the activity said so itself (THE CONTRACT for an activity that judges its own tries): it calls
 *          api.track('task:try', { ok }) on EVERY try, right or wrong, before it presses the shell's Check. Class
 *          mode hears "<tool>:task:try". An activity whose Check the shell judges must NOT send it (a wrong try
 *          would count twice).
 *     One task of a sitting with unknown tries makes the whole sitting "finished" with no number.
 *  4. It reports once. After TASKS solved tasks it posts { token, right, total, items, finished: true }, or only
 *     { token, finished: true }, to /api/class/report (the same contract the worksheet pages use: the first report
 *     of an attempt is its result) and shows the one button back to the class page UNDER the activity (in the page's
 *     flow, scrolled into view: a button floating over the activity covered the activity's own message at phone
 *     width). A child who stops earlier leaves no result: the teacher sees "started", never a partial number.
 *
 * Fail-open: a report that cannot be sent never blocks play; the way back then comes from what the class page left
 * in this tab (sessionStorage 'lcs-class-back').
 */
import { useEffect, useState } from 'react';

/** how many solved tasks make one sitting of an activity (every activity holds at least seven different tasks) */
export const TASKS = 7;
const TOKEN_IN_HASH = /[#&]lcs=([a-z2-9]{20})(?:&|$)/;
const FRAME = '.lcs-prototype-iframe-wrapper';
const SHELL_CHECK = '.lcs-activity-check';

const CSS = `
body.lcs-class-mode { overflow: hidden !important; }
body.lcs-class-mode ${FRAME} { position: fixed !important; inset: 0; z-index: 2147483000; margin: 0; padding: 8px 8px 24px; background: #FBF3E4; overflow: auto; -webkit-overflow-scrolling: touch; }
#lcs-class-go { margin: 12px auto 0; width: 76px; height: 76px; border-radius: 50%; border: 4px solid #FBF3E4; background: #146B5E; color: #FBF3E4; box-shadow: 0 6px 18px rgba(0,0,0,.28); display: flex; align-items: center; justify-content: center; padding: 0; text-decoration: none; -webkit-tap-highlight-color: transparent; animation: lcs-class-in .35s ease-out; }
#lcs-class-go:focus-visible { outline: 4px solid #1B1B1B; outline-offset: 3px; }
#lcs-class-go svg { width: 40px; height: 40px; display: block; }
@keyframes lcs-class-in { from { transform: scale(.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { #lcs-class-go { animation: none; } }
`;

const sameSite = (p: unknown): p is string => typeof p === 'string' && /^\/c\/[a-z2-9]{10}$/.test(p);
function homePath(): string | null {
  try { const v = window.sessionStorage.getItem('lcs-class-back'); return sameSite(v) ? v : null; } catch { return null; }
}

export default function ActivityClassMode({ backLabel }: { backLabel: string }) {
  const [back, setBack] = useState<string | null>(null);

  useEffect(() => {
    const m = TOKEN_IN_HASH.exec(window.location.hash || '');
    if (!m) return;
    const token = m[1];
    document.body.classList.add('lcs-class-mode');

    const items: number[] = [];   // one entry per solved task: 1 = right at its first try
    let wrong = 0;                // wrong tries of the task now on screen
    let said = false;             // the activity itself reported the right try of the task now on screen (3b above)
    let sent = false;
    let marks = true;             // the tries of every task so far are known (3. above)
    let press: boolean | null = null; // the last press of the shell's Check: real (true), made by the activity (false), not seen (null)

    const send = () => {
      if (sent) return;
      sent = true;
      const right = items.reduce((s, x) => s + x, 0);
      const done = (reply: { back?: unknown } | null) => setBack(reply && sameSite(reply.back) ? reply.back : homePath());
      try {
        fetch('/api/class/report', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(marks ? { token, right, total: items.length, items, finished: true } : { token, finished: true }),
          credentials: 'omit', cache: 'no-store', keepalive: true,
        }).then((res) => (res.ok ? res.json() : null)).then(done, () => done(null));
      } catch { done(null); }
    };

    const onTrack = (event: unknown, payload: unknown) => {
      if (typeof event !== 'string' || !payload || typeof payload !== 'object') return;
      const ok = (payload as { ok?: unknown }).ok;
      if (ok !== true && ok !== false) return;
      if (/:task:try$/.test(event)) { if (ok) said = true; else wrong++; return; }   // the activity's own word about a try it judged
      if (!/:task:check$/.test(event)) return;
      const real = press === true;   // the child pressed the shell's Check
      press = null;
      if (ok === false) { if (real) wrong++; else marks = false; return; }
      if (!real && !said) marks = false;
      said = false;
      if (sent) return;
      items.push(wrong === 0 ? 1 : 0);
      wrong = 0;
      if (items.length >= TASKS) send();
    };

    // the hook lives on the FRAME's window; set it now, on every load of the frame, and until the frame exists
    // … and so does the listener that sees WHO pressed the shell's Check (capture: it runs before the shell's own handler)
    let frame: HTMLIFrameElement | null = null;
    const seen = new WeakSet<Document>();
    const onPress = (e: Event) => {
      const t = e.target as Element | null;
      if (t && typeof t.closest === 'function' && t.closest(SHELL_CHECK)) press = e.isTrusted === true;
    };
    const hook = () => {
      const f = document.querySelector<HTMLIFrameElement>(`${FRAME} iframe`);
      if (!f) return false;
      if (f !== frame) { frame = f; f.addEventListener('load', hook); }
      try {
        const doc = f.contentDocument;
        if (!doc || !f.contentWindow) return false;
        if (!seen.has(doc)) { seen.add(doc); doc.addEventListener('click', onPress, true); }
        (f.contentWindow as unknown as { LCS_TRACK?: unknown }).LCS_TRACK = onTrack;
        return true;
      } catch { return false; }
    };
    hook();
    const retry = window.setInterval(hook, 500);
    const stop = window.setTimeout(() => window.clearInterval(retry), 20000);

    return () => {
      window.clearInterval(retry);
      window.clearTimeout(stop);
      if (frame) frame.removeEventListener('load', hook);
      document.body.classList.remove('lcs-class-mode');
    };
  }, []);

  // the button is under the activity; bring it into view when it appears. The activity usually GROWS right after its
  // last Check (its message, its Next button), which pushes the button down again: follow the frame for a few seconds.
  useEffect(() => {
    if (!back) return;
    const el = document.getElementById('lcs-class-go');
    if (!el) return;
    // scroll the class-mode layer to its end (not scrollIntoView: the button grows in as it appears, and a box
    // measured mid-growth leaves the full-size button cut off)
    const show = () => { const layer = el.closest(FRAME); if (layer) layer.scrollTop = layer.scrollHeight; };
    show();
    const f = document.querySelector(`${FRAME} iframe`);
    const ro = f && typeof ResizeObserver === 'function' ? new ResizeObserver(show) : null;
    if (ro && f) ro.observe(f);
    const end = window.setTimeout(() => { if (ro) ro.disconnect(); }, 5000);
    return () => { window.clearTimeout(end); if (ro) ro.disconnect(); };
  }, [back]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {back ? (
        <a id="lcs-class-go" href={back} aria-label={backLabel} title={backLabel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 11.5 12 4l8 7.5" /><path d="M6.5 10v9.5h11V10" />
          </svg>
        </a>
      ) : null}
    </>
  );
}
