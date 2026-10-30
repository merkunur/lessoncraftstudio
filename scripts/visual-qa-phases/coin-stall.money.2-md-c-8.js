/* =====================================================================
   visual-qa phase driver — Pip's Market Stall (2.MD.C.8).
   #164 of the one-by-one rebuild: THE WORTH TILL (worth-till-activity).

     open     — the spilled till (level 1): coins on the counter, empty cups, the dial.
     missed   — every coin sorted, the dial one short: Check, the parade (no numbers).
     helped   — a second wrong total: miss 2, the parade with running totals.
     resolved — the right total: the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE MODEL'S OWN HANDS (drop/spin) and the
     activity's own _check — the same functions the cups, the dial and Check call.
   ===================================================================== */
'use strict';

const G = 'WorthTillActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.WorthTillCore); }, G, src);
const SORT = 't.st.coins.forEach(function (c) { if (c.at === "counter") C.drop(t.st, c.id, c.v); });';
const DIAL = (d) => 'var n = t.st.round.total + (' + d + '); t.st.dial.t = Math.floor(n / 10); t.st.dial.o = n % 10; t.st.verdict = null; t._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__wtK = window[g].st.k), G); await back(page, k);
        await act(page, SORT + DIAL(-1)); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('one short was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__wtK); await back(page, k);
        await act(page, SORT + DIAL(-1) + DIAL(-2)); await wait(1200);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__wtK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, SORT + DIAL(0));
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right total did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
