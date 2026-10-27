/* =====================================================================
   visual-qa phase driver — match-pairs / add-it-both-ways (1.OA.B.3)
   #135 of the one-by-one rebuild: THE LEAPFROG PARTS (leapfrog-parts-activity).

     open      — six cards whose two numbers are blocks of cubes, the
                 empty twin shelf.
     picked    — one card lifted. ⭐ Nothing is graded and nothing has
                 leapfrogged yet: no glow, no hint.
     missed    — laid on a same-total impostor: the card shows its
                 leapfrog, the impostor glows at the cube where the
                 colours disagree, the hint.
     resolved  — all three twins: three plates on the shelf, the round
                 line; 0.5 s later the shell's Next.

   ⚠ CARDS ARE REACHED BY INDEX (data-k="card-<i>"; the twins are read
     from the model), NEVER BY LABEL. The driver plays turnarounds to 20
     (the default).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'LeapfrogPartsActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.rd.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const cards = (page) => page.evaluate((g) => window[g].st.rd.cards.map((c) => ({ pair: c.pair, t: c.kind === 'take' ? c.w : c.a + c.b })), G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
const twin = (cs, i) => cs.findIndex((c, j) => j !== i && c.pair === cs[i].pair);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        if (!(await tap(page, '[data-k="card-0"]'))) throw new Error('card 0 absent');
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({ leapt: !!document.querySelector('.is-leapt'), glow: !!document.querySelector('.lp-bad'), note: document.querySelector('.lp-note').textContent.trim() }));
        if (st.leapt || st.glow || st.note) throw new Error('the card leapfrogged or was graded on a single tap — the skill would leak out of the task');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const cs = await cards(page), imp = cs.findIndex((c, j) => j !== 0 && j !== twin(cs, 0));
        await tap(page, '[data-k="card-0"]'); await tap(page, '[data-k="card-' + imp + '"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.lp-note').classList.contains('is-hint'), leapt: !!document.querySelector('.is-leapt'), bad: !!document.querySelector('.lp-card.is-bad') }));
        if (!st.hint || !st.leapt || !st.bad) throw new Error('no hint / no leapfrog shown / the impostor does not show the mismatch');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const cs = await cards(page), done = new Set();
        for (let i = 0; i < 6; i++) { if (done.has(cs[i].pair)) continue; await tap(page, '[data-k="card-' + i + '"]'); await tap(page, '[data-k="card-' + twin(cs, i) + '"]'); done.add(cs[i].pair); }
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.lp-note').classList.contains('is-ok'), plates: document.querySelectorAll('.lp-plate').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || st.plates !== 3) throw new Error('no round line / not three plates');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
