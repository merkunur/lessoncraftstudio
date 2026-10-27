/* =====================================================================
   visual-qa phase driver — word-clinic / spell-by-ear (L.1.2.e)
   #130 of the one-by-one rebuild: THE MIRROR CHART (mirror-chart-activity).

     open      — the patient on the chart, the fogged mirror, the word
                 boxes with one sick box, the tray.
     picked    — a wrong tile in the sick box. ⭐ Nothing is graded yet —
                 the mirror is still fogged, no hint.
     missed    — Mirror: the mirror shows what the letters really spell
                 (another picture, or fog with the letters in it), the hint.
     resolved  — the right tile + Mirror: the patient in the mirror, the
                 success line; 0.5 s later the shell's Next.

   ⚠ TILES ARE REACHED BY INDEX (data-k="tile-<n>"; tile-0 is the right
     one in the data, the tray order is the plan's), NEVER BY LETTERS.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'MirrorChartActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const kind = (page) => page.evaluate((g) => { const t = window[g]; return t && t.st ? t.st.rd.kind : null; }, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function tile(page, i) { if (!(await tap(page, '[data-k="tile-' + i + '"]'))) throw new Error('tile ' + i + ' absent'); }

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        if ((await kind(page)) === 'write') throw new Error('a writing round on window.' + G + ' — the driver needs a tile round');
        await tile(page, 1);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({ full: document.querySelectorAll('.mc-box.is-sick.is-full').length, fog: !!document.querySelector('.mc-glass .mc-fog'), shows: document.querySelectorAll('.mc-glass img').length, note: document.querySelector('.mc-note').textContent.trim() }));
        if (!st.full) throw new Error('the tile did not go into the sick box');
        if (!st.fog || st.shows) throw new Error('the mirror cleared before Mirror — the board is grading a choice');
        if (st.note) throw new Error('a hint before Mirror: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        await tile(page, 1);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Mirror absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.mc-note').classList.contains('is-hint') && !!document.querySelector('.mc-note').textContent.trim(), miss: !!document.querySelector('.mc-mirror.is-miss'), shows: document.querySelectorAll('.mc-glass img').length + document.querySelectorAll('.mc-finger').length }));
        if (!st.hint) throw new Error('no hint after a wrong tile');
        if (!st.miss || !st.shows) throw new Error('the mirror does not show what the letters spell');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await tile(page, 0);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Mirror absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.mc-note').classList.contains('is-ok'), healed: !!document.querySelector('.mc-mirror.is-ok'),
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.healed) throw new Error('no success line / the mirror is not healed');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
