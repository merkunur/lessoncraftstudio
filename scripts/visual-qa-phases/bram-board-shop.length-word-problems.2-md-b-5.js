/* =====================================================================
   visual-qa phase driver — length word problems (2.MD.B.5).
   #156 of the one-by-one rebuild: THE SPIRIT LEVEL (spirit-bench-activity).

     open     — the order ticket, the empty bench, three boards on the rack.
     built    — the story's two lengths on the right rails, the mystery
                place sized, a number typed into it.
     missed   — the keyword answer typed: the cut board, the leaning level,
                the gap shaded, the hint.
     helped   — a second miss: the count-up marks on the bench ruler.
     decoy    — the trap board on the bench: its own hint.
     tested   — the level tapped on a half-built bench.
     resolved — the right number: the level stands straight, the ticket is
                stamped, the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_put/_type/_back/
     _test/_check, the same functions the taps call). FAST is set.
   ===================================================================== */
'use strict';

const G = 'SpiritBenchActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, placed: (t.top === null ? 0 : 1) + t.bottom.length,
    cut: document.querySelectorAll('[data-cut]').length, level: (document.querySelector('[data-level]') || {}).getAttribute ? document.querySelector('[data-level]').getAttribute('data-level') : null,
    span: document.querySelectorAll('[data-span]').length, stamp: document.querySelectorAll('[data-stamp]').length };
}, G);
const act = (page, fn) => page.evaluate((g, src) => { const t = window[g], st = t.st, r = st.round, C = window.SpiritBenchCore; (new Function('t', 'st', 'r', 'C', src))(t, st, r, C); }, G, fn);
/* build the story's bench with the activity's own hands */
const BUILD = 'var d = r.rack.indexOf(r.decoy), used = []; var pick = function (v) { for (var i = 0; i < 3; i++) if (i !== d && used.indexOf(i) < 0 && r.rack[i] === v) { used.push(i); return i; } };'
  + ' if (r.topKnown !== null) t._put(pick(r.topKnown), "top"); r.bottomKnown.forEach(function (v) { t._put(pick(v), "bottom"); });';
const TYPE = (expr) => 'String(' + expr + ').split("").forEach(function (x) { t._type(x); });';

module.exports = {
  steps: [
    {
      name: 'built',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__sbK = window[g].st.k), G); await back(page, k);
        await act(page, BUILD + TYPE('r.answer')); await wait(150);
        const s = await state(page);
        if (s.placed !== 2) throw new Error('the bench did not take the two story lengths');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate(() => window.__sbK); await back(page, k);
        await act(page, BUILD + TYPE('r.decoy') + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'number' || s.cut !== 1 || s.level === 'flat') throw new Error('the keyword number did not cut a board and lean the level');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__sbK); await back(page, k);
        await act(page, BUILD + TYPE('r.decoy') + ' t._check(); t._back(); t._back(); ' + TYPE('r.answer + 5') + ' t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help || s.span < 1) throw new Error('a second miss showed no count-up marks');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'decoy',
      async drive(page) {
        const k = await page.evaluate(() => window.__sbK); await back(page, k);
        await act(page, 'var d = r.rack.indexOf(r.decoy), o = [0, 1, 2].filter(function (i) { return i !== d; }); t._put(d, "top"); t._put(o[0], "bottom");' + TYPE('5') + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'decoy') throw new Error('the trap board on the bench was not called out');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'tested',
      async drive(page) {
        const k = await page.evaluate(() => window.__sbK); await back(page, k);
        await act(page, 'var d = r.rack.indexOf(r.decoy), o = [0, 1, 2].filter(function (i) { return i !== d; }); t._put(o[0], "bottom"); t._test();'); await wait(150);
        const s = await state(page);
        if (!s.level) throw new Error('the level test drew no level');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__sbK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, BUILD + TYPE('r.answer') + ' t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.level !== 'flat' || s.stamp !== 1) throw new Error('the round did not finish level and stamped');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
