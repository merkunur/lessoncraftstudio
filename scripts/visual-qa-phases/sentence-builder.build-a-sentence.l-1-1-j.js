/* =====================================================================
   visual-qa phase driver — sentence-builder / build-a-sentence (L.1.1.j)
   #128 of the one-by-one rebuild: THE SENTENCE STAGE (sentence-stage-activity).

     open      — the theatre (the actor as a clue in level 1), an empty
                 script line, the word blocks in the wings.
     picked    — the sentence laid with two words swapped. ⭐ Nothing is
                 graded yet — no flicker, no frozen stage, no hint.
     missed    — Check: the show plays and freezes at the first word that
                 cannot follow; that place flickers, the hint names it.
     resolved  — the sentence + Check: the show plays to the end, the bow,
                 every block green, the success line; 0.5 s later the
                 shell's Next.

   ⚠ BLOCKS ARE REACHED BY ID (data-k="block-<id>"), NEVER BY WORD.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'SentenceStageActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], rd = t && t.st && t.st.rd;
  if (!rd || rd.kind !== 'build') return null;
  const w = rd.canon.slice(); const x = w[1]; w[1] = w[2]; w[2] = x;
  return { right: rd.canon, wrong: w };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function lay(page, ids) { for (const id of ids) if (!(await tap(page, '[data-k="block-' + id + '"]'))) throw new Error('block ' + id + ' absent'); }

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a build round on window.' + G);
        await lay(page, r.wrong);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          full: document.querySelectorAll('.ss-slot.is-full').length, stop: document.querySelectorAll('.ss-slot.is-stop').length,
          frozen: document.querySelectorAll('.ss-stage.is-frozen').length, note: document.querySelector('.ss-note').textContent.trim()
        }));
        if (st.full !== r.wrong.length) throw new Error('the blocks did not go onto the script line');
        if (st.stop || st.frozen) throw new Error('a place flickers before Check — the board is grading a choice');
        if (st.note) throw new Error('a hint before Check: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a build round on window.' + G);
        await lay(page, r.wrong);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({
          hint: document.querySelector('.ss-note').classList.contains('is-hint') && !!document.querySelector('.ss-note').textContent.trim(),
          stop: document.querySelectorAll('.ss-slot.is-stop').length, frozen: document.querySelectorAll('.ss-stage.is-frozen').length
        }));
        if (!st.hint) throw new Error('no hint after a wrong order');
        if (st.stop !== 1) throw new Error('the place where the show stopped does not flicker');
        if (!st.frozen) throw new Error('the stage is not frozen at the wrong word');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a build round on window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await lay(page, r.right);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate((n) => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.ss-note').classList.contains('is-ok'), green: document.querySelectorAll('.ss-slot.is-ok').length === n, bow: !!document.querySelector('.ss-stage.is-bow'),
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        }, r.right.length);
        if (!st.ok) throw new Error('no success line');
        if (!st.green || !st.bow) throw new Error('the script is not green / no bow');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
