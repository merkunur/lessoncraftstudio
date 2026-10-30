/* =====================================================================
   visual-qa phase driver — Make and Count Squares (2.G.A.2).
   #170 of the one-by-one rebuild: THE STAMP SHEET (stamp-sheet-activity).

     open     — the sheet with its two rails and wheels, the order card,
                the press (the album on a wide screen).
     missed   — a wrong grid: the press printed every piece (true stamps,
                torn edges, white left over) and the hint.
     helped   — a second miss: the dotted squares and the glowing notches.
     counting — the true grid: every stamp printed, the keypad.
     counthelp— two wrong counts: the rows apart, their running totals.
     resolved — the right total: the success line, Next 0.5 s.

   ⚠ STATES ARE SET THROUGH THE MODEL'S OWN HANDS (toggleCut, type) and the
     activity's own _check — the same functions the rails, the keys and
     Check call.
   ===================================================================== */
'use strict';

const G = 'StampSheetActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k, 0); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { step: t.step, misses: t.misses, help: t.help, cmisses: t.cmisses, chelp: t.chelp, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.StampSheetCore); }, G, src);
/* a wrong grid: one line at a half notch, nothing else */
const WRONG = 'C.toggleCut(t.st, "col", 1); if (t.st.rows > 1) C.toggleCut(t.st, "row", 2);';
/* the true grid: a line at every whole square */
const GRID = 'for (var h = 2; h < 2 * t.st.cols; h += 2) C.toggleCut(t.st, "col", h); for (var h2 = 2; h2 < 2 * t.st.rows; h2 += 2) C.toggleCut(t.st, "row", h2);';
const WRONG_COUNT = 't._type(String((t.st.rows * t.st.cols) % 9 + 1));';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__stsK = window[g].st.k), G); await back(page, k);
        await act(page, WRONG + 't._check();'); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong grid was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__stsK); await back(page, k);
        await act(page, WRONG + 't._check(); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'counting',
      async drive(page) {
        const k = await page.evaluate(() => window.__stsK); await back(page, k);
        await act(page, GRID + 't._check();'); await wait(150);
        const s = await state(page);
        if (s.step !== 'count') throw new Error('the true grid did not open the count step (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'counthelp',
      async drive(page) {
        const k = await page.evaluate(() => window.__stsK); await back(page, k);
        await act(page, GRID + 't._check();' + WRONG_COUNT + 't._check(); t._check();'); await wait(250);
        const s = await state(page);
        if (!s.chelp) throw new Error('two wrong counts turned no count help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__stsK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, GRID + 't._check(); String(t.st.rows * t.st.cols).split("").forEach(function (d) { t._type(d); }); t._check();');
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
