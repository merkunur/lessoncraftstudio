/* =====================================================================
   visual-qa phase driver — measure with a ruler (2.MD.A.1).
   #153 of the one-by-one rebuild: THE CM CUTTER (cm-cutter-activity).

     open     — the strip on the table, the ruler where the cat left it,
                the jar and Tildy, Check.
     read     — the numeral at the strip's end tapped as the ruler lies,
                then Check: the stub left on the table, or the air snips.
     helped   — a second miss: the pin at the strip's start.
     broken   — tricky rulers, a broken ruler with two spaces stitched
                past the strip, Check: the puffs, the count tag.
     shelf    — tricky rulers, a pick round: the shelf of three rulers,
                the shortest one picked and read, Check: the tail.
     resolved — the ruler slid to the strip, the end read: the jar, the
                success line, the rail, Next 0.5 s later.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HANDS (_slide/_read/
     _stitch/_pick/_check, the same functions the pointer calls). FAST
     is set.
   ===================================================================== */
'use strict';

const G = 'CmCutterActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function useLevel(page, level, k) {
  await page.evaluate((g, level, k) => {
    const t = window[g]; t.FAST = true; t.api.settings.level = level;
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, level, k == null ? null : k);
  await wait(150);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { kind: t.round.kind, verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done,
    left: document.querySelectorAll('.cc-left').length, puff: document.querySelectorAll('.cc-puff').length, pin: document.querySelectorAll('.cc-pin,[data-endline]').length,
    rack: document.querySelectorAll('[data-k^="rack-"]').length, pieces: document.querySelectorAll('.cc-piece').length, orders: document.querySelectorAll('.cc-order').length };
}, G);
const back = (page, k) => useLevel(page, 'align', k);
const act = (page, fn) => page.evaluate((g, src) => { const t = window[g], st = t.st, r = st.round; (new Function('t', 'st', 'r', src))(t, st, r); }, G, fn);

module.exports = {
  steps: [
    {
      name: 'read',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__ccK = window[g].st.k), G); await back(page, k);
        await act(page, 't._read(Math.max(0, Math.min(st.len, r.e - st.zero))); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.verdict || (s.left + s.puff) < 1) throw new Error('a misplaced ruler left nothing on the table');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__ccK); await back(page, k);
        await act(page, 't._read(Math.max(0, Math.min(st.len, r.e - st.zero))); t._check(); t._check();'); await wait(150);
        const s = await state(page);
        if (!s.help || s.pin < 1) throw new Error('a second miss did not show the pin');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'broken',
      async drive(page) {
        const k = await page.evaluate(() => window.__ccK);
        await useLevel(page, 'tricky', k % 3);
        await act(page, 'for (var i = r.s; i < r.e + 2; i++) t._stitch(i); t._check();'); await wait(150);
        const s = await state(page);
        if (s.kind !== 'broken' || s.verdict !== 'miscount' || s.puff < 1) throw new Error('stitches past a broken strip did not puff');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'shelf',
      async drive(page) {
        const k = await page.evaluate(() => window.__ccK);
        await useLevel(page, 'tricky', 5 + (k % 3));
        await act(page, 'var i = st.rack.indexOf(Math.min.apply(null, st.rack)); t._pick(i); t._slide(r.s); t._read(st.len); t._check();'); await wait(150);
        const s = await state(page);
        if (s.rack !== 3 || s.verdict !== 'short' || s.left < 1) throw new Error('the shortest ruler did not leave a tail');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__ccK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await act(page, 't._slide(r.s); t._read(r.e - r.s); t._check();');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.pieces < 1 || s.orders < 1) throw new Error('the round did not finish with the jar and the rail');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
