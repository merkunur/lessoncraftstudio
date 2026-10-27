/* =====================================================================
   visual-qa phase driver — array / equal-groups (2.OA.C.4)
   #139 of the one-by-one rebuild: THE ACCORDION SENTENCE (accordion-activity).

     open      — Level 1: empty bead trays, the pot and the times book, an
                 empty accordion strip with its squeeze handle, the total
                 box, the keys and Check.
     missed    — the trays filled with one group a bead over, Check: the
                 strip springs back, the odd pleat stands out, the hint.
     helped    — a second unequal Check: the beads in one row, the extra
                 bead marked.
     resolved  — equal groups, the strip folded, the right total: the
                 success line; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("tray-0", "squeeze", "key-4", "total",
     "check"), NEVER BY LABEL. The driver plays the default (Level 1).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'AccordionActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k, 0); t._view.spring = false; t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
const info = (page) => page.evaluate((g) => { const s = window[g].st; return { g: s.g, e: s.e }; }, G);
async function typeIn(page, box, v) { await tap(page, '[data-k="' + box + '"]'); for (const d of String(v)) await tap(page, '[data-k="key-' + d + '"]'); }
async function fill(page, extra) { const i = await info(page); for (let k = 0; k < i.g; k++) for (let j = 0; j < i.e + (extra && k === i.g - 1 ? 1 : 0); j++) await tap(page, '[data-k="tray-' + k + '"]'); return i; }

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const i = await fill(page, true); await typeIn(page, 'total', i.g * i.e); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.ac-note').classList.contains('is-hint'), odd: document.querySelectorAll('.ac-pleat.is-tall, .ac-tray.is-odd').length }));
        if (!st.hint || st.odd < 2) throw new Error('unequal groups did not spring back with the odd pleat and a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page);
        const i = await fill(page, true); await typeIn(page, 'total', i.g * i.e); await tap(page, '[data-k="check"]'); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ row: document.querySelectorAll('.ac-rowbead').length, extra: document.querySelectorAll('.ac-rowbead.is-extra').length }));
        if (!st.row || st.extra !== 1) throw new Error('miss 2 did not show the beads in one row with the extra one marked');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const i = await fill(page, false); await tap(page, '[data-k="squeeze"]'); await typeIn(page, 'total', i.g * i.e); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.ac-note').classList.contains('is-ok'), face: !!document.querySelector('.ac-face'), celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.face) throw new Error('no success line on a folded strip');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
