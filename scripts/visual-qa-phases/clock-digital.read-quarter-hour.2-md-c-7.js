/* =====================================================================
   visual-qa phase driver — Read the Clock to the Quarter-Hour (2.MD.C.7).
   #162 of the one-by-one rebuild: THE HOUR BALL (hour-ball-activity).

     open     — the clock with its ball run, the lid shut, four cards.
     missed   — the neighbour-hour card with the right minutes, checked: the
                cup open, the marble bounced, the hint.
     helped   — then the right-hour card with the mirror minutes: miss 2,
                the run-on and back, the help.
     resolved — the right card: the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_post/_check, the
     same functions the cards and Check call).
   ===================================================================== */
'use strict';

const G = 'HourBallActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
/* the card index that shows h:m in this round */
const IDX = (expr) => `var r = t.st.round, w = ${expr}, i = r.cards.findIndex(function (c) { return c.h === w.h && c.m === w.m; });`;
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', src))(t); }, G, src);
const NEIGHBOUR = "{ h: r.cards[2].h, m: r.m }", MIRROR = "{ h: r.h, m: 60 - r.m }";

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__hbK = window[g].st.k), G); await back(page, k);
        await act(page, IDX(NEIGHBOUR) + ' t._post(i); t._check();'); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('the neighbour-hour card was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__hbK); await back(page, k);
        await act(page, IDX(NEIGHBOUR) + ' t._post(i); t._check(); ' + IDX(MIRROR).replace('var r = t.st.round, w', 'w').replace(', i =', '; i =') + ' t._post(i); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__hbK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, IDX('{ h: r.h, m: r.m }') + ' t._post(i); t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right card did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
