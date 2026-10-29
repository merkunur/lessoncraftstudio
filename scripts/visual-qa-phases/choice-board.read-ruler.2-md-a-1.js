/* =====================================================================
   visual-qa phase driver — read the ruler (2.MD.A.1).
   #152 of the one-by-one rebuild: THE GLOW RULER (glow-ruler-activity).

     open     — the object on the glass ruler, the marker parked at 0,
                the control row (back · readout · on), Check.
     over     — the marker two past the end: the light runs on, the extra
                spaces glow coral, hintOver.
     under    — the marker two short: the unlit end of the object dims,
                hintUnder.
     helped   — a second miss: the dashed drop line, the end tick pulses.
     fives    — level 2 (only 0, 5, 10, 15 printed) at miss 2: the printed
                number below the end glows, the count-on numerals.
     resolved — the right end: the light, the tag on the object, the
                shelf chart, Next 0.5 s later.

   ⚠ CONTROLS ARE REACHED BY data-k ("nudge-on", "nudge-back", "check"),
     NEVER BY LABEL. FAST is set.
   ===================================================================== */
'use strict';

const G = 'GlowRulerActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function useLevel(page, level, k) {
  await page.evaluate((g, level, k) => {
    const t = window[g]; t.FAST = true; t.api.settings.numbers = level;
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, level, k == null ? null : k);
  await wait(150);
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
const state = (page) => page.evaluate((g) => {
  const t = window[g].st;
  return { len: t.round.len, level: t.level, marker: t.marker, verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done,
    over: document.querySelectorAll('.gr-lit.is-over').length, dim: document.querySelectorAll('.gr-dim').length, drop: document.querySelectorAll('.gr-drop').length,
    on: document.querySelectorAll('.gr-count.is-on').length, glow: document.querySelectorAll('.gr-num.is-glow').length, tag: document.querySelectorAll('.gr-tag').length, shelf: document.querySelectorAll('.gr-col').length };
}, G);
async function slideTo(page, n) {
  for (let i = 0; i < 20; i++) {
    const m = await page.evaluate((g) => window[g].st.marker, G);
    if (m === n) return true;
    if (!(await tap(page, m < n ? 'nudge-on' : 'nudge-back'))) return false;
  }
  return false;
}
const back = (page, k) => useLevel(page, 'every', k);

module.exports = {
  steps: [
    {
      name: 'over',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__grK = window[g].st.k), G); await back(page, k);
        const s0 = await state(page);
        await slideTo(page, Math.min(15, s0.len + 2)); await tap(page, 'check'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'over' || s.over < 1) throw new Error('a marker past the end did not light coral spaces');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'under',
      async drive(page) {
        const k = await page.evaluate(() => window.__grK); await back(page, k);
        const s0 = await state(page);
        await slideTo(page, s0.len - 2); await tap(page, 'check'); await wait(150);
        const s = await state(page);
        if (s.verdict !== 'under' || s.dim !== 1) throw new Error('a short marker did not dim the end');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__grK); await back(page, k);
        const s0 = await state(page);
        await slideTo(page, s0.len + 1); await tap(page, 'check'); await tap(page, 'check'); await wait(150);
        const s = await state(page);
        if (!s.help || s.drop !== 1) throw new Error('a second miss did not drop the line');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'fives',
      async drive(page) {
        const k = await page.evaluate(() => window.__grK);
        await useLevel(page, 'fives', k);
        const s0 = await state(page);
        await slideTo(page, s0.len - 1); await tap(page, 'check'); await tap(page, 'check'); await wait(150);
        const s = await state(page);
        if (!s.help || s.drop !== 1 || s.on < 1) throw new Error('level 2 at miss 2 did not count on');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__grK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const s0 = await state(page);
        await slideTo(page, s0.len); await tap(page, 'check');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.tag !== 1 || s.shelf < 1) throw new Error('the round did not finish with the tag and the shelf');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
