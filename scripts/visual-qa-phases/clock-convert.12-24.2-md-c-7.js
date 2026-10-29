/* =====================================================================
   visual-qa phase driver — 12-hour and 24-hour time (2.MD.C.7 extended).
   #159 of the one-by-one rebuild: THE SECOND RING (second-ring-activity).

     open     — the open card, the empty answer boxes (and chips), the
                clock showing the given time, the empty inner ring.
     missed   — the right hour with the minutes changed, checked: the run
                to the child's time, the given time as dashed outlines,
                the tag, the tokens dropped on the second lap, the hint.
     helped   — a second HOUR miss: the given time's run with its last
                token face-down (a minutes-only miss keeps its own hint).
     resolved — the right answer: the hands land in the outlines, the tag
                turns gold, the token stays, the success line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_type/_focus/_part/
     _check, the same functions the pad, the boxes and the chips call).
   ===================================================================== */
'use strict';

const G = 'SecondRingActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, ask: document.querySelectorAll('.sr-socket.is-ask').length };
}, G);
/* write an answer through the activity's own hands: the right one, or the right one with the minutes moved on by five */
const WRITE = (wrong) => `var r = t.st.round, h = r.dir === 'to24' ? r.h24 : (r.h24 % 12 || 12), m = (r.m + ${wrong ? 5 : 0}) % 60;
  String(h).split('').forEach(function (d) { t._type(d); }); t._focus('m'); (m < 10 ? '0' + m : String(m)).split('').forEach(function (d) { t._type(d); });
  if (r.dir === 'to12') t._part(r.accepted[0]);`;
const act = (page, src) => page.evaluate((g, src) => { const t = window[g]; (new Function('t', src))(t); }, G, src);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__srK = window[g].st.k), G); await back(page, k);
        await act(page, WRITE(true) + ' t._check();'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'minute') throw new Error('the changed minutes were not a minute miss (' + s.verdict + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__srK); await back(page, k);
        /* an hour miss twice (the minutes-only miss keeps its own hint, by design) */
        await act(page, "var r = t.st.round, h = r.dir === 'to24' ? (r.h24 + 2) % 24 : ((r.h24 + 2) % 12 || 12); for (var n = 0; n < 2; n++) { while (t.st.h || t.st.m) t._back(); t._focus('h'); String(h).split('').forEach(function (d) { t._type(d); }); t._focus('m'); (r.m < 10 ? '0' + r.m : String(r.m)).split('').forEach(function (d) { t._type(d); }); if (r.dir === 'to12' && !t.st.part) t._part(r.accepted[0]); t._check(); }"); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__srK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, WRITE(false) + ' t._check();');
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
