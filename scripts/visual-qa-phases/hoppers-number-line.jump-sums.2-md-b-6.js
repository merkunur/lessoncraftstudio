/* =====================================================================
   visual-qa phase driver — hops on a number line (2.MD.B.6).
   #157 of the one-by-one rebuild: THE SPRING AND THE LANDING PAD
   (landing-pad-activity).

     open     — the story, the pond of stones, Hopper and the pad waiting.
     built    — Hopper on his start facing the story's way, the spring
                loaded with the hop, the pad floated on the landing.
     missed   — the pad one stone short (the start counted): Hopper hops
                and splashes, the ripples, the hint.
     helped   — a second miss: the dotted hops.
     resolved — the pad on the landing: Hopper lands, the lotus, the
                stamp, the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_frog/_turn/_coil/
     _count/_pad/_check, the same functions the taps call). FAST is set.
   ===================================================================== */
'use strict';

const G = 'LandingPadActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, frog: t.frogAt, pad: t.padAt, coils: t.coils.length,
    splash: document.querySelectorAll('[data-splash]').length, ghost: document.querySelectorAll('[data-ghost]').length,
    lotus: document.querySelectorAll('[data-lotus]').length, stamp: document.querySelectorAll('[data-stamp]').length };
}, G);
const act = (page, fn) => page.evaluate((g, src) => { const t = window[g], st = t.st, r = st.round, C = window.LandingPadCore; (new Function('t', 'st', 'r', 'C', src))(t, st, r, C); }, G, fn);
/* the story's build with the activity's own hands: start, facing, the coils, the count */
const BUILD = 't._frog(r.start); if (t.st.facing !== r.dir) t._turn(); for (var i = 0; i < Math.floor(r.size / 10); i++) t._coil(10); for (var j = 0; j < r.size % 10; j++) t._coil(1); if (r.level === "eq") t._count(r.count);';
const PAD = (expr) => 'if (r.kind !== "div") t._pad(' + expr + ');';
/* a division round has no pad to misplace: one hop too few is its miss */
const MISS = 'if (r.kind === "div") t._count(r.count - 1); else t._pad(r.answer - r.dir * r.step);';

module.exports = {
  steps: [
    {
      name: 'built',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__lpK = window[g].st.k), G); await back(page, k);
        await act(page, BUILD + PAD('r.answer')); await wait(150);
        const s = await state(page);
        if (s.frog === null || !s.coils || s.pad === null) throw new Error('the build did not take');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate(() => window.__lpK); await back(page, k);
        await act(page, BUILD + MISS + ' t._check();'); await wait(150);
        const s = await state(page);
        if (!s.verdict || s.verdict === 'start') throw new Error('the near miss did not hop');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__lpK); await back(page, k);
        await act(page, BUILD + MISS + ' t._check(); ' + 'if (r.kind === "div") t._count(r.count + 1); else t._pad(r.answer + r.dir * r.step);' + ' t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help || s.ghost < 1) throw new Error('a second miss showed no dotted hops');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__lpK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, BUILD + PAD('r.answer') + ' t._check();');
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
