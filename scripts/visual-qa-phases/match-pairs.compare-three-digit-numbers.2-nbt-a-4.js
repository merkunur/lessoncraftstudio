/* =====================================================================
   visual-qa phase driver — compare three-digit numbers (2.NBT.A.4).
   #151 of the one-by-one rebuild: THE DECIDING GATE (deciding-gate-activity).

     open     — the board (a [sign box] b), the sign tiles, the track:
                gate headers to tap, two lanes, the finish flag.
     late     — a gate called too late: the run stops at the true gate,
                the bar drops in front of the smaller number, the hint.
     early    — a gate called too early on 247/274: the equal hundreds glow.
     helped   — a second miss: the deciding digits grow, hintVs.
     four     — the four-digit setting: big 3-D cubes at the thousands gate.
     order    — order four: the tags and the four-step podium, miss 2 with
                the pair panel.
     resolved — the right call: the long view on the ruler, Next 0.5 s later.

   ⚠ CONTROLS ARE REACHED BY data-k ("gate-1", "sign-lt", "slot", "tag-2",
     "step-0", "check"), NEVER BY LABEL. FAST is set.
   ===================================================================== */
'use strict';

const G = 'DecidingGateActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function useJob(page, job, digits, k) {
  await page.evaluate((g, job, digits, k) => {
    const t = window[g]; t.FAST = true; t.api.settings.job = job; t.api.settings.digits = digits;
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, job, digits, k == null ? null : k);
  await wait(120);
}
const back = (page, k) => useJob(page, 'compare', 'three', k);
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
const state = (page) => page.evaluate((g) => {
  const t = window[g].st, n = document.querySelector('.dg-note');
  return { r: t.round, verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, ran: t.ran, note: n.textContent,
    bar: document.querySelectorAll('.dg-gatebar').length, glow: document.querySelectorAll('.dg-cell.is-glow').length, big: document.querySelectorAll('.dg-plate.is-big').length,
    bigCubes: document.querySelectorAll('.dg-big').length, pair: document.querySelectorAll('.dg-pair').length, wrong: document.querySelectorAll('.dg-step.is-wrong').length, long: document.querySelectorAll('.dg-long').length };
}, G);
const sgn = (s) => (s === '<' ? 'lt' : s === '>' ? 'gt' : 'eq');

module.exports = {
  steps: [
    {
      name: 'late',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__dgK = window[g].st.k), G); await back(page, k);
        const s0 = await state(page), g = s0.r.gate;
        await tap(page, 'gate-' + (g === 3 ? 0 : 3)); await tap(page, 'sign-' + sgn(s0.r.sign)); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (!s.ran || !s.verdict) throw new Error('a wrong call did not run the race');
        return true;
      }
    },
    {
      name: 'early',
      async drive(page) {
        const k = await page.evaluate(() => window.__dgK);
        await useJob(page, 'compare', 'three', 3); /* 247 / 274: decided at the tens */
        await tap(page, 'gate-0'); await tap(page, 'sign-lt'); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'gateEarly' || s.glow !== 2) throw new Error('an early call did not light the equal hundreds');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__dgK);
        await useJob(page, 'compare', 'three', 0); /* 389 / 412 */
        await tap(page, 'gate-2'); await tap(page, 'sign-gt'); await tap(page, 'check'); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (!s.help || s.big !== 2 || s.bar !== 1) throw new Error('a second miss did not grow the deciding digits');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'four',
      async drive(page) {
        const k = await page.evaluate(() => window.__dgK);
        await useJob(page, 'compare', 'four', 2); /* 1999 / 2001 */
        await tap(page, 'gate-1'); await tap(page, 'sign-lt'); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'gateLate' || s.bigCubes < 3) throw new Error('the four-digit race did not show the big cubes');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'order',
      async drive(page) {
        const k = await page.evaluate(() => window.__dgK);
        await useJob(page, 'order', 'three', 0); /* 389, 412, 398, 421 */
        for (let i = 0; i < 4; i++) { await tap(page, 'tag-' + i); await tap(page, 'step-' + i); }
        await tap(page, 'check'); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'order' || !s.help || s.pair !== 1 || s.wrong < 2) throw new Error('two order misses did not show the pair');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__dgK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const s0 = await state(page);
        await tap(page, 'gate-' + s0.r.gate); await tap(page, 'sign-' + sgn(s0.r.sign)); await tap(page, 'check');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.long !== 1) throw new Error('the round did not finish with the long view');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
