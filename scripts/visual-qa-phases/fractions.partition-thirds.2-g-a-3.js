/* =====================================================================
   visual-qa phase driver — Make Thirds (2.G.A.3).
   #172 of the one-by-one rebuild: THE RAIN TABLE (rain-table-activity).

     open     — the shape on its table (notches, pegs), the empty tubes
                with their gold line, Check.
     missed   — a wrong wall set rained on: tubes over / under / dry, the
                parts tinted, the hint.
     helped   — a second miss: the dotted walls and their glowing marks.
     resolved — the round's right walls: every tube at the line, the
                rainbow, the success line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_toggle, _check) — the
     same functions the marks and Check call.
   ===================================================================== */
'use strict';

const G = 'RainTableActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k, 0); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.RainTableCore); }, G, src);
/* a wrong set: the first two offered walls that do NOT make the round's equal parts */
const WRONG = 'var ids = t.st.offered.map(function (w) { return w.id; }), pick = null; for (var i = 0; i < ids.length && !pick; i++) for (var j = i + 1; j < ids.length && !pick; j++) { var s2 = C.newState(t.st.n, t.st.k); C.toggle(s2, ids[i]); C.toggle(s2, ids[j]); if (!C.isEqual(C.partsNow(s2), t.st.n, C.whole(t.st.round.shape))) pick = [ids[i], ids[j]]; } pick.forEach(function (id) { t._toggle(id); }); t._check();';
const RIGHT = 't.st.round.ghost.forEach(function (id) { t._toggle(id); }); t._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__rtK = window[g].st.k), G); await back(page, k);
        await act(page, WRONG); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong wall set was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__rtK); await back(page, k);
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
        const k = await page.evaluate(() => window.__rtK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, RIGHT);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right walls did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
