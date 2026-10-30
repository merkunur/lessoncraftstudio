/* =====================================================================
   visual-qa phase driver — Same Size, Different Shape (2.G.A.3).
   #171 of the one-by-one rebuild: THE DOUGH PRESS (dough-press-activity).

     open     — the model on its board, the tray of its patties, the press,
                the four tiles.
     missed   — a wrong tile pressed: its patties land on the model's (rims,
                gaps, an extra or a missing patty) and the hint.
     helped   — a second miss: every tile shows its patties.
     resolved — the right tile: every patty fits, the success line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_tap, _check) — the
     same functions the tiles and Check call.
   ===================================================================== */
'use strict';

const G = 'DoughPressActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k, 0); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.DoughPressCore); }, G, src);
const WRONG = 'var w = t.st.tiles.findIndex(function (x, i) { return !C.tileRight(t.st, i); }); t._tap(w); t._check();';
const RIGHT = 'var r = t.st.tiles.findIndex(function (x, i) { return C.tileRight(t.st, i); }); t._tap(r); t._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__dpK = window[g].st.k), G); await back(page, k);
        await act(page, WRONG); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong tile was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__dpK); await back(page, k);
        await act(page, WRONG + 't._check();'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__dpK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, RIGHT);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right tile did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
