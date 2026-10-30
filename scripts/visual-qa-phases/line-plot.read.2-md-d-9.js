/* =====================================================================
   visual-qa phase driver — Read a Line Plot (2.MD.D.9).
   #167 of the one-by-one rebuild: THE TIDE YOU PUSH (tide-plot-activity).

     open     — the question, the tide-line with its X's, the two wave
                handles, the buoy, the pebbles (or, in a measuring round, the
                board with the shell on its ruler above the beach).
     missed   — read: the sea set right, a wrong pebble: the dry X's number
                themselves, hintCountDry. measure: every shell dropped where
                its unzeroed edge ends, hintZero / hintEdge.
     helped   — a second miss: the sea moves to the right place and the
                answer is ringed (read), or the shell slides to 0 with a teal
                guide down to its length (measure).
     resolved — the right tide and answer (or every shell on its length):
                the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE MODEL'S OWN HANDS (canonicalTide, choose,
     slide, drop) and the activity's own _check — the same functions the
     waves, pebbles, shells and Check call.
   ===================================================================== */
'use strict';

const G = 'TidePlotActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', 'C', src))(t, window.TidePlotCore); t._paint(); }, G, src);
/* a wrong answer that is still a real choice: a pebble 1..8, or another column of the tide-line */
const WRONG = 'var r = t.st.round, a = C.answerOf(r), alt = r.kind === "mode" ? t.st.cols.filter(function (v) { return v !== a; })[off] : ((a + off) % 8) + 1;';
const MISS = (off) => 'var off = ' + off + '; if (t.st.round.kind === "measure") { while (C.boardShell(t.st) != null) { var s = t.st.shells[C.boardShell(t.st)]; C.drop(t.st, t.st.cols[(t.st.cols.indexOf(s.len) + 1 + off) % t.st.cols.length]); } } else { t.st.tide = C.canonicalTide(t.st); ' + WRONG + ' C.choose(t.st, alt); } t._check();';
const SOLVE = 'if (t.st.round.kind === "measure") { while (C.boardShell(t.st) != null) { var s = t.st.shells[C.boardShell(t.st)]; C.slide(t.st, 0); C.drop(t.st, s.len); } } else { t.st.tide = C.canonicalTide(t.st); C.choose(t.st, C.answerOf(t.st.round)); } t._check();';

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__tpK = window[g].st.k), G); await back(page, k);
        await act(page, MISS(0)); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong answer was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__tpK); await back(page, k);
        await act(page, MISS(0)); await act(page, 'var r0 = t.st.round; if (r0.kind === "measure") { t.st.shells.forEach(function (s, j) { if (s.col != null) C.undrop(t.st, j); }); } ' + MISS(1).replace('var off = 1;', 'var off = 1;')); await wait(200);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__tpK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, SOLVE);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right tide and answer did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
