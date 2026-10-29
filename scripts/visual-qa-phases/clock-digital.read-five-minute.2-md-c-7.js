/* =====================================================================
   visual-qa phase driver — Read the Clock to Five Minutes (2.MD.C.7).
   #161 of the one-by-one rebuild: THE MINUTE TRAIN (minute-train-activity).

     open     — the clock with its railway, an empty track, the empty card.
     missed   — the round's hour + 1 written with the right minutes (on the
                hour: the minutes wrong instead), checked: the lap / the
                child's own train, the hint.
     helped   — a second, changed wrong answer: the right train with "?" on
                its last roof, the hour numeral bold.
     resolved — the right answer: the success line, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_focus/_type/_back/
     _check, the same functions the boxes, the pad and Check call).
   ===================================================================== */
'use strict';

const G = 'MinuteTrainActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done, kind: t.verdict && t.verdict.kind }; }, G);
/* write h:mm through the activity's own hands */
const WRITE = (expr) => `var r = t.st.round, a = ${expr}; t._focus('h'); while (t.st.h || t.st.m) { t._focus(t.st.m ? 'm' : 'h'); t._back(); } t._focus('h'); String(a.h).split('').forEach(function (d) { t._type(d); }); t._focus('m'); (a.m < 10 ? '0' + a.m : String(a.m)).split('').forEach(function (d) { t._type(d); });`;
const MISS = "r.m ? { h: r.h % 12 + 1, m: r.m } : { h: r.h, m: 5 }";
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', src))(t); }, G, src);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__mtK = window[g].st.k), G); await back(page, k);
        await act(page, WRITE(MISS) + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('the wrong answer was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__mtK); await back(page, k);
        await act(page, WRITE(MISS) + ' t._check();' + WRITE("{ h: r.h % 12 + 1, m: (r.m + 10) % 60 }") + ' t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__mtK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, WRITE('{ h: r.h, m: r.m }') + ' t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right answer did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
