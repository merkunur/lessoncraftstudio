/* =====================================================================
   visual-qa phase driver — estimate lengths in cm and m (2.MD.A.3).
   #154 of the one-by-one rebuild: THE GROWING PICTURE (growing-picture-activity).

     open     — the question, the "?" frame, the benchmark, three estimates.
     grown    — the largest estimate tapped: the picture grown to it beside
                the benchmark, one scale.
     missed   — that estimate checked: too big, the dashed ghost of the real
                size, the hint.
     helped   — a second miss: the comparison hint.
     unit     — level 2: both benchmarks, the number given, the wrong unit
                checked.
     resolved — the right estimate: the picture at its real size, the stamp,
                the album, the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_choose/_check, the
     same functions the taps call). FAST is set.
   ===================================================================== */
'use strict';

const G = 'GrowingPictureActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function useLevel(page, level, k) {
  await page.evaluate((g, level, k) => {
    const t = window[g]; t.FAST = true; t.api.settings.level = level;
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, level, k == null ? null : k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done,
    pic: document.querySelectorAll('.gp-picbox').length, bar: document.querySelectorAll('.gp-sizebar').length, ghost: document.querySelectorAll('.gp-ghost').length,
    ruler: document.querySelectorAll('.gp-ruler').length, stick: document.querySelectorAll('.gp-stick').length, album: document.querySelectorAll('.gp-athumb').length };
}, G);
const act = (page, fn) => page.evaluate((g, src) => { const t = window[g], st = t.st, r = st.round; (new Function('t', 'st', 'r', src))(t, st, r); }, G, fn);
/* the largest WRONG estimate (its slot in the shown order), and the right one */
const WRONG = 'var w = r.cards.map(function (c, i) { return i; }).filter(function (i) { return r.cards[i] !== r.answer; }); var i = w[w.length - 1];';
const RIGHT = 'var i = r.cards.indexOf(r.answer);';

module.exports = {
  steps: [
    {
      name: 'grown',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__gpK = window[g].st.k), G); await useLevel(page, 'estimate', k);
        await act(page, WRONG + ' t._choose(i);'); await wait(150);
        const s = await state(page);
        if (s.pic + s.bar < 1) throw new Error('a tapped estimate drew nothing');
        return { restore: async () => useLevel(page, 'estimate', k) };
      }
    },
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate(() => window.__gpK); await useLevel(page, 'estimate', k);
        await act(page, WRONG + ' t._choose(i); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.verdict || s.ghost !== 1) throw new Error('a wrong estimate showed no ghost');
        return { restore: async () => useLevel(page, 'estimate', k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__gpK); await useLevel(page, 'estimate', k);
        await act(page, WRONG + ' t._choose(i); t._check(); var j = r.cards.findIndex(function (c, x) { return c !== r.answer && x !== i; }); t._choose(j); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss did not help');
        return { restore: async () => useLevel(page, 'estimate', k) };
      }
    },
    {
      name: 'unit',
      async drive(page) {
        const k = await page.evaluate(() => window.__gpK);
        await useLevel(page, 'unit', k % 10);
        await act(page, 'var i = r.cards.indexOf(r.answer === "cm" ? "m" : "cm"); t._choose(i); t._check();'); await wait(150);
        const s = await state(page);
        if (s.ruler !== 1 || s.stick !== 1 || !s.verdict) throw new Error('level 2 did not show both benchmarks and a miss');
        return { restore: async () => useLevel(page, 'estimate', k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__gpK); await useLevel(page, 'estimate', k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, RIGHT + ' t._choose(i); t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.album < 1) throw new Error('the round did not finish into the album');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
