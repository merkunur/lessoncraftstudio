/* =====================================================================
   visual-qa phase driver — Count Out the Money (2.MD.C.8).
   #165 of the one-by-one rebuild: THE SAY-IT SLOT (say-it-slot-activity).

     open     — the coin box at 0, the price pin, the treat, the purse on the cloth.
     missed   — a wrong count on the biggest coin that fits: the coin spat back,
                the said number on its slip, hintMiss1.
     helped   — the same coin wrong again: miss 2, the count-on steps.
     resolved — biggest-first to the price: the bell, the drawer, the parade,
                the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_drop) — the same
     function the slot calls; the counter is set as the wheels would.
   ===================================================================== */
'use strict';

const G = 'SayItSlotActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.missTotal, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.SayItSlotCore); }, G, src);
const BIG = 'var r = t.st.round, c = C.where(t.st, "cloth").filter(function (x) { return x.v <= r.price; }).sort(function (a, b) { return b.v - a.v; })[0];';
const WRONG = BIG + 't.st.counter = c.v + 1 <= r.price ? c.v + 1 : c.v - 1; t._drop(c.id);';
const PAY = 'var r = t.st.round; for (var g = 0; g < 12 && !t.st.done; g++) { var gap = r.price - C.inBox(t.st), c = C.where(t.st, "cloth").filter(function (x) { return x.v <= gap; }).sort(function (a, b) { return b.v - a.v; })[0]; if (!c) break; t.st.counter = C.inBox(t.st) + c.v; t._drop(c.id); }';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__siK = window[g].st.k), G); await back(page, k);
        await page.evaluate((g) => { window[g].FAST = false; }, G);
        await act(page, WRONG); await wait(120);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong count was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__siK); await back(page, k);
        await act(page, WRONG + WRONG); await wait(200);
        const s = await state(page);
        if (s.misses !== 2) throw new Error('a second wrong count on the same coin was not miss 2');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__siK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, PAY);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('biggest-first did not pay the price');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
