/* =====================================================================
   visual-qa phase driver — Marina's Headline Desk (RI.2.2).
   #173 of the one-by-one rebuild: THE STAPLER (marina-headline-desk-activity).

     open     — the strips on the desk, the empty headline slot, the stapler,
                the fan, the headline cards.
     missed   — a detail in the slot, the stapler pressed: one strip stapled,
                the others blown onto the floor band, the hint.
     helped   — a second miss: the strips back on the desk with the thread
                words underlined.
     resolved — the right headline: every strip stapled, the front page,
                the success line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_choose, _check) — the
     same functions the cards and the stapler call.
   ===================================================================== */
'use strict';

const G = 'MarinaHeadlineDeskActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k, 0); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.HeadlineDeskCore); }, G, src);
const pick = (cond) => 't._choose(t.st.cards.findIndex(function (c, i) { return ' + cond + '; }));';
const DETAIL = pick('c.covers.length === 1') + 't._check();';
const NEIGH = pick('!C.cardRight(t.st, i) && c.covers.length !== 1') + 't._check();';
const RIGHT = pick('C.cardRight(t.st, i)') + 't._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__hdK = window[g].st.k), G); await back(page, k);
        await act(page, DETAIL); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a detail was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__hdK); await back(page, k);
        await act(page, DETAIL + NEIGH); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__hdK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, RIGHT);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right headline did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
