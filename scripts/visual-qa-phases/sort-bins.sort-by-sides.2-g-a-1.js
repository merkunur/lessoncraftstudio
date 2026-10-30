/* =====================================================================
   visual-qa phase driver — Sort Shapes by Sides (2.G.A.1).
   #169 of the one-by-one rebuild: THE TRUNDLE WHEEL (trundle-wheel-activity).

     open     — the lane (a short dock strip on a phone), the tray of shapes,
                the board (crates / cabinet / rings).
     missed   — every shape placed, one in the wrong place: it comes home
                wearing the ticket the wheel printed for it.
     helped   — a second miss: the ticket's dashes are numbered and the
                right place pulses.
     resolved — every shape in its place: the success line, Next 0.5 s.

   ⚠ STATES ARE SET THROUGH THE MODEL'S OWN HANDS (put) and the activity's
     own _check — the same functions the drag, the taps and Check call.
   ===================================================================== */
'use strict';

const G = 'TrundleWheelActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.TrundleWheelCore); }, G, src);
/* every tray shape in its place, the empty drawer filled with the fitting shelf shape */
const PLACE_ALL = 'var b = t.st.board; t.st.items.forEach(function (it) { if (it.from === "t") C.put(t.st, it.key, C.placeFor(b, C.infoOf(it))); });'
  + 'if (t.st.missing) { var fit = t.st.items.filter(function (it) { return it.from === "d" && C.placeFor(b, C.infoOf(it)) === t.st.missing; })[0]; C.put(t.st, fit.key, t.st.missing); }';
/* the first tray shape moved to a place where it does not belong */
const ONE_WRONG = 'var w = t.st.items[0], right = String(C.placeFor(t.st.board, C.infoOf(w))), other = C.places(t.st).filter(function (p) { return String(p) !== right; })[0]; C.put(t.st, w.key, other);';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__twK = window[g].st.k), G); await back(page, k);
        await act(page, PLACE_ALL + ONE_WRONG + 't._check();'); await wait(200);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('one shape in the wrong place was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__twK); await back(page, k);
        await act(page, PLACE_ALL + ONE_WRONG + 't._check();' + ONE_WRONG + 't._check();'); await wait(250);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__twK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, PLACE_ALL + 't._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('every shape in its place did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
