/* =====================================================================
   visual-qa phase driver — choice-board / even-odd (2.OA.C.3)
   #137 of the one-by-one rebuild: THE CHIMNEY ROOF (chimney-roof-activity).

     open      — the bag with its number, the two roofs (flat = even,
                 chimney = odd), the empty glass tower.
     missed    — every brick poured, the wrong roof dropped on: it falls,
                 the top glows, the hint.
     helped    — the wrong roof again: every layer's pair bracketed, a
                 lone brick ringed.
     resolved  — the right roof, the two equal parts typed, Check: the
                 success line; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("bag", "roof-flat", "key-6",
     "check"), NEVER BY LABEL. The driver plays the default (to 20, the
     roof after the tower).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'ChimneyRoofActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
const info = (page) => page.evaluate((g) => { const s = window[g].st; return { n: s.n, num: s.num, bags: s.bags ? s.bags.map((b) => b.n) : null }; }, G);
async function pourAll(page) { const i = await info(page); for (let k = 0; k < i.n; k++) await tap(page, '[data-k="bag"]'); return i; }

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const i = await pourAll(page);
        await tap(page, '[data-k="roof-' + (i.n % 2 ? 'flat' : 'chimney') + '"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.cr-note').classList.contains('is-hint'), glow: !!document.querySelector('.cr-brick.is-glow') }));
        if (!st.hint || !st.glow) throw new Error('the wrong roof did not fall with a glowing top and a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page);
        const i = await pourAll(page), wrong = '[data-k="roof-' + (i.n % 2 ? 'flat' : 'chimney') + '"]';
        await tap(page, wrong); await tap(page, wrong);
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ pairs: document.querySelectorAll('.cr-pair').length }));
        if (!st.pairs) throw new Error('miss 2 did not bracket the pairs');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const i = await pourAll(page), h = Math.floor(i.n / 2);
        await tap(page, '[data-k="roof-' + (i.n % 2 ? 'chimney' : 'flat') + '"]');
        for (const box of [0, 1]) { await tap(page, '[data-k="box-' + box + '"]'); for (const d of String(h)) await tap(page, '[data-k="key-' + d + '"]'); }
        await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.cr-note').classList.contains('is-ok'), celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok) throw new Error('no success line');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
