/* =====================================================================
   visual-qa phase driver — Match Analog and Digital (2.MD.C.7).
   #160 of the one-by-one rebuild: THE DRIVE CABLES (drive-cables-activity).

     open     — four clocks, three cards with loose cables, no lamp lit.
     missed   — the card the lure baits plugged into the lure, the other two
                right; checked: two lamps lit, the lure clock carries the
                card's dashed hands, the hand that disagrees blinks, the hint.
     helped   — the same, checked twice: five-minute dots along the dashed
                long hand and the numbers beside the dashed short hand bold.
     resolved — all three right: three lamps, the rooster, the success line,
                Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_plug/_check, the same
     functions the taps and drags call).
   ===================================================================== */
'use strict';

const G = 'DriveCablesActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done, ghosts: document.querySelectorAll('.dc-ghost').length, dots: document.querySelectorAll('.dc-dot').length }; }, G);
/* plug the baited card into the lure, the others right */
const WRONG = "var r = t.st.round; t._plug(r.baited, r.layout.indexOf('L')); [0, 1, 2].forEach(function (c) { if (c !== r.baited) t._plug(c, r.layout.indexOf(c)); });";
const RIGHT = 'var r = t.st.round; [0, 1, 2].forEach(function (c) { t._plug(c, r.layout.indexOf(c)); });';
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', src))(t); }, G, src);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__dcK = window[g].st.k), G); await back(page, k);
        await act(page, WRONG + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.misses !== 1 || s.ghosts !== 1) throw new Error('the lure pair did not show its ghost hands (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__dcK); await back(page, k);
        await act(page, WRONG + ' t._check(); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help || !s.dots) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__dcK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, RIGHT + ' t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right plugs did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
