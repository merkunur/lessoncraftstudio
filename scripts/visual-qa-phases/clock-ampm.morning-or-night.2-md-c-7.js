/* =====================================================================
   visual-qa phase driver — a.m. and p.m. (2.MD.C.7).
   #158 of the one-by-one rebuild: THE DAY WHEEL (day-wheel-activity).

     open     — the card, the clock at midnight, the moon in the window.
     missed   — the hands wound to the card's face in the OTHER lap and
                checked: the window ringed, the lap hint. (Winding alone
                moves no control or live text, so it is not its own phase.)
     helped   — a second Check: the dashed arrow one lap on / back.
     resolved — the right lap: the picture seats on the wheel, the stamp,
                Sprocket bounces, the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_wind/_check, the
     same functions the drag and the button call). FAST is set.
   ===================================================================== */
'use strict';

const G = 'DayWheelActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, minutes: t.minutes,
    ghost: document.querySelectorAll('[data-ghost]').length, stamp: document.querySelectorAll('[data-stamp]').length };
}, G);
const act = (page, fn) => page.evaluate((g, src) => { const t = window[g], st = t.st, r = st.round; (new Function('t', 'st', 'r', src))(t, st, r); }, G, fn);
/* the same face in the other lap */
const OTHER = 't._wind(r.answer < 720 ? r.answer + 720 : r.answer - 720);';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__dwK = window[g].st.k), G); await back(page, k);
        await act(page, OTHER + ' t._check();'); await wait(120);
        const s = await state(page);
        if (s.verdict !== 'lap') throw new Error('the other lap was not a lap miss');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__dwK); await back(page, k);
        await act(page, OTHER + ' t._check(); t._check();'); await wait(120);
        const s = await state(page);
        if (!s.help || s.ghost < 1) throw new Error('a second miss showed no arrow');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__dwK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, 't._wind(r.answer); t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.stamp !== 1) throw new Error('the round did not finish stamped');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
