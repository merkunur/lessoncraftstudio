/* =====================================================================
   visual-qa phase driver — The Harbor Post (RI.2.6).
   #174 of the one-by-one rebuild: THE THREE HARBOR MACHINES
   (author-purpose-activity).

     open     — Marlow's note, the three machines on the quay under their
                signs, nothing lit.
     missed   — the note posted in a machine that is not its kind: the
                machine sputters, every sentence shows the shape of the
                machine it would power, the hint.
     helped   — a second miss: every machine shows its own count at once.
     resolved — the right machine runs (beam / curtain / ship), the success
                line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HAND (_post) — the same
     function the machines and the 1/2/3 keys call.
   ===================================================================== */
'use strict';

const G = 'AuthorPurposeActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function back(page, k) {
  await page.evaluate((g, k) => { const t = window[g]; t.FAST = true; t._pool = null; t._ensurePool(); t._start(k); t._render2(); }, G, k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
/* the machines that are NOT the note's purpose, and the one that is */
const wrongs = (page) => page.evaluate((g) => { const t = window[g], C = window.HarborMachinesCore, main = C.mainMachine(t.st.note); return t.st.list.filter((m) => m !== main); }, G);
const right = (page) => page.evaluate((g) => window.HarborMachinesCore.mainMachine(window[g].st.note), G);
const post = (page, m) => page.evaluate((g, m) => window[g]._post(m), G, m);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__hmK = window[g].st.k), G); await back(page, k);
        await post(page, (await wrongs(page))[0]); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('a wrong machine was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__hmK); await back(page, k);
        const w = await wrongs(page);
        await post(page, w[0]); await post(page, w[w.length - 1]); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__hmK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await post(page, await right(page));
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the right machine did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
