/* =====================================================================
   visual-qa phase driver — Dr. Plume's Sentence Clinic (L.2.1 · L.2.2).
   #176 of the one-by-one rebuild: THE LISTENING LINE
   (sentence-clinic-activity). The swept pool is Level 2 (the default).

     open     — the run of words on the bed, the tray, no line yet.
     knot     — only the end mark placed, Check: the Listening Line drawn,
                a knot frozen at the seam, the knot hint.
     helped   — a second miss: the seam spotlit, the scissors wiggling.
     one      — Level 1, the round's card with a wrong mark at every end:
                three kinks frozen under the card.
     three    — Level 3, the add-a-word / change-a-word drawer open (or a
                lifted word waiting, for the rounds without options).
     resolved — Level 2 cured: every line rests or holds open, the bed sits
                up, the success line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HAND (_pickTool, _tapGap,
     _tapWord, _pickOption, _check) — the calls a tap makes.
   ===================================================================== */
'use strict';

const G = 'SentenceClinicActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k, level) {
  await page.evaluate((g, k, level) => { const t = window[g]; t.FAST = true; t.api.settings.level = level; t.api.settings.line = 'check'; t._ensurePool(); t._start(k); t._render2(); }, G, k, level);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
const keyOf = (page) => page.evaluate((g) => (window.__scK = window[g]._order ? window[g]._order[0] : 0), G);
/* the end mark only (Level 2): the seam is left open */
const endOnly = (page) => page.evaluate((g) => { const t = window[g], r = t.st.round, u = r.units[1]; t._view.tool = u.tune === 'A' ? '?' : '.'; t._tapGap(u.to); t._check(); }, G);

module.exports = {
  steps: [
    {
      name: 'knot',
      async drive(page) {
        const k = await keyOf(page); await back(page, k, 'two');
        await endOnly(page); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('the open seam was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k, 'two') };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__scK); await back(page, k, 'two');
        await endOnly(page); await page.evaluate((g) => window[g]._check(), G); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k, 'two') };
      }
    },
    {
      name: 'one',
      async drive(page) {
        const k = await page.evaluate(() => window.__scK); await back(page, k % 8, 'one');
        await page.evaluate((g) => { const t = window[g]; t.st.round.units.forEach((u) => { t._view.tool = u.tune === 'A' ? '.' : '?'; t._tapGap(u.to); }); t._check(); }, G);
        await wait(150);
        if ((await state(page)).misses !== 1) throw new Error('three wrong marks were not a miss');
        return { restore: async () => back(page, k, 'two') };
      }
    },
    {
      name: 'three',
      async drive(page) {
        const k = await page.evaluate(() => window.__scK); await back(page, k, 'three');
        await page.evaluate((g) => {
          const t = window[g], r = t.st.round, C = window.SentenceClinicCore;
          if (r.kind === 'form') { t._pickTool('wheel'); t._tapWord(C.wheelAt(t.st)); }
          else if (r.kind === 'ins') { t._pickTool('ins'); t._tapGap(r.at); }
          else { t._pickTool('lift'); t._tapWord(0); }
        }, G);
        await wait(150);
        return { restore: async () => back(page, k, 'two') };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__scK); await back(page, k, 'two');
        await page.evaluate((g) => { window[g].OK_MS = 500; const t = window[g]; t.st.round.units.forEach((u) => { t._view.tool = u.tune === 'A' ? '?' : '.'; t._tapGap(u.to); }); t._check(); }, G);
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the cured run did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
