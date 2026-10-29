/* =====================================================================
   visual-qa phase driver — Tell Time to the Nearest 5 Minutes (2.MD.C.7).
   #163 of the one-by-one rebuild: THE RUN-ON TEST (run-on-activity).

     open     — the target card, the clock at its rest pose, the empty readout.
     missed   — the long hand right, the short hand 15° off: Check, the
                readout, the crooked run-on, the hint.
     helped   — a second wrong short hand: miss 2, the minute ring, the slots.
     resolved — both hands right: the bell, the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_setLong/_setShort/
     _check, the same functions the grips and Check call).
   ===================================================================== */
'use strict';

const G = 'RunOnActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.RunOnCore); }, G, src);
const SLOT = 'var sl = C.slots(t.st.round);';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__roK = window[g].st.k), G); await back(page, k);
        await act(page, SLOT + ' t._setLong(sl.long); t._setShort(sl.short + 15); t._check();'); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('the wrong short hand was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__roK); await back(page, k);
        await act(page, SLOT + ' t._setLong(sl.long); t._setShort(sl.short + 15); t._check(); t._setShort(sl.short - 15); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__roK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, SLOT + ' t._setLong(sl.long); t._setShort(sl.short); t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right pose did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
