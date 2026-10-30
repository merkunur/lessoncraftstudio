/* =====================================================================
   visual-qa phase driver — Pip's Stacking Fence (2.MD.D.10).
   #168 of the one-by-one rebuild: THE LEVEL RAIL (level-rail-activity).

     open     — the fence (post, pickets, labels), the rail parked on the
                ground, the answer (dial / True-False / nothing).
     missed   — a wrong answer: miss 1 lays the rail level where it helps
                (or, in a build round, wobbles the wrong picket).
     helped   — a second miss: the planks to count carry their tags.
     resolved — the right answer: the success line, Pip runs, Next 0.5 s.

   ⚠ STATES ARE SET THROUGH THE MODEL'S OWN HANDS (setDial, choose,
     setPicket) and the activity's own _check.
   ===================================================================== */
'use strict';

const G = 'LevelRailActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.LevelRailCore); }, G, src);
/* a wrong answer of the round's own kind; off picks a different wrong one for the second miss */
const WRONG = (off) => 'var r = t.st.round, ty = C.answerType(r), a = C.answerOf(r), off = ' + off + ';'
  + 'if (C.isBuild(r)) { var c = r.cats[0], u = C.unitOf(r); C.setPicket(t.st, c, r.data[c] + (off ? -u : u)); }'
  + 'else if (ty === "dial") { var v = a + 1 + off; C.setDial(t.st, Math.floor(v / 10), v % 10); }'
  + 'else if (ty === "tf") { if (off) C.choose(t.st, a); C.choose(t.st, !a); }'
  + 'else C.choose(t.st, t.st.cats.filter(function (x) { return x !== a; })[off]);'
  + 't._check();';
const SOLVE = 'var r = t.st.round, ty = C.answerType(r), a = C.answerOf(r);'
  + 'if (C.isBuild(r)) r.cats.forEach(function (c) { C.setPicket(t.st, c, r.data[c]); });'
  + 'else if (ty === "dial") C.setDial(t.st, Math.floor(a / 10), a % 10); else C.choose(t.st, a);'
  + 't._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__lrK = window[g].st.k), G); await back(page, k);
        await act(page, WRONG(0)); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong answer was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__lrK); await back(page, k);
        await act(page, WRONG(0)); await act(page, WRONG(1)); await wait(200);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__lrK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, SOLVE);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right answer did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
