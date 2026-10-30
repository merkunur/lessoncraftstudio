/* =====================================================================
   visual-qa phase driver — Make Change with Coins (2.MD.C.8).
   #166 of the one-by-one rebuild: THE CHANGE BOX (change-box-activity).

     open     — the toy and its tag, the payment, the change box's pile, the
                customer's tray, Pip's dish.
     missed   — everything given back: Pip has nothing, his count stops short
                of the tag (ringed), hintShort.
     helped   — a second miss: the tray empties back, the count-up from the
                price to the payment, the change coins outlined in the pile.
     resolved — the right change: Pip lands on the price, the stamp, the
                success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE MODEL'S OWN HANDS (move) and the activity's
     own _check — the same functions the coins and Check call.
   ===================================================================== */
'use strict';

const G = 'ChangeBoxActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k, 0); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.ChangeBoxCore); }, G, src);
const ALL = 'C.where(t.st, "pile").forEach(function (c) { C.move(t.st, c.id); }); t._check();';
const ONE_BACK = 'var d = C.where(t.st, "tray").sort(function (x, y) { return x.v - y.v; })[0]; C.move(t.st, d.id); t._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__cbK = window[g].st.k), G); await back(page, k);
        await act(page, ALL); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('everything given back was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__cbK); await back(page, k);
        await act(page, ALL + ONE_BACK); await wait(200);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__cbK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, 'var U = C.countUp(t.st); U.ids.forEach(function (id) { C.move(t.st, id); }); t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right change did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
