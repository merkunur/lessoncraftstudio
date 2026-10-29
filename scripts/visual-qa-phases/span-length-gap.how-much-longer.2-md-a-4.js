/* =====================================================================
   visual-qa phase driver — how much longer, in cm (2.MD.A.4).
   #155 of the one-by-one rebuild: THE SNIP-OUT TAPE (snip-tape-activity).

     open     — the tray, two things against the wall, the tape, two parked
                clips, the keypad.
     clipped  — both clips at the ends: the glowing gap, the plumb lines,
                a number typed into the readout.
     missed   — the sum typed and checked: the piece snipped into the tray,
                the dashed strip of the child's number beside it, the hint.
     helped   — a second miss: one dot in every centimetre space.
     clipmiss — the orange clip one short: the part it missed shaded.
     loose    — loose starts: the things off the wall, pushable.
     resolved — the right number: the piece counts itself, the overhang
                glows, the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_clip/_type/_back/
     _check, the same functions the taps call). FAST is set.
   ===================================================================== */
'use strict';

const G = 'SnipTapeActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function useMode(page, starts, k) {
  await page.evaluate((g, starts, k) => {
    const t = window[g]; t.FAST = true; t.api.settings.starts = starts;
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, starts, k == null ? null : k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done,
    glow: document.querySelectorAll('[data-glow]').length, piece: document.querySelectorAll('[data-piece]').length, ghost: document.querySelectorAll('[data-ghost]').length,
    dots: document.querySelectorAll('[data-dot]').length, missed: document.querySelectorAll('[data-missed]').length, things: document.querySelectorAll('button.st-thing').length, over: document.querySelectorAll('[data-over]').length };
}, G);
const act = (page, fn) => page.evaluate((g, src) => { const t = window[g], st = t.st, r = st.round; (new Function('t', 'st', 'r', src))(t, st, r); }, G, fn);
const CLIPS = 't._clip("a", r.a.len); t._clip("b", r.b.len);';
const TYPE = (expr) => 'String(' + expr + ').split("").forEach(function (d) { t._type(d); });';
const back = (page, k) => useMode(page, 'lined', k);

module.exports = {
  steps: [
    {
      name: 'clipped',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__stK = window[g].st.k), G); await back(page, k);
        await act(page, CLIPS + TYPE('r.gap')); await wait(150);
        const s = await state(page);
        if (s.glow !== 1) throw new Error('both clips on the tape and no glow');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate(() => window.__stK); await back(page, k);
        await act(page, CLIPS + TYPE('r.a.len + r.b.len') + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'number' || s.piece !== 1 || s.ghost !== 1) throw new Error('a wrong number did not snip the piece beside the dashed strip');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__stK); await back(page, k);
        await act(page, CLIPS + TYPE('r.a.len + r.b.len') + ' t._check(); t._back(); t._back(); ' + TYPE('r.gap + 1') + ' t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help || s.dots < 1) throw new Error('a second miss showed no dots');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'clipmiss',
      async drive(page) {
        const k = await page.evaluate(() => window.__stK); await back(page, k);
        await act(page, 't._clip("a", r.a.len - 1); t._clip("b", r.b.len);' + TYPE('r.gap') + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'clipA' || s.missed !== 1) throw new Error('a clip one short shaded nothing');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'loose',
      async drive(page) {
        const k = await page.evaluate(() => window.__stK); await useMode(page, 'loose', k);
        const s = await state(page);
        if (s.things !== 2) throw new Error('loose starts gave no pushable things');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__stK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, CLIPS + TYPE('r.gap') + ' t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.piece !== 1 || s.over !== 1) throw new Error('the round did not finish with the piece and the overhang');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
