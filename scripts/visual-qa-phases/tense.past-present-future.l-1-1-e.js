/* =====================================================================
   visual-qa phase driver — tense / past, present, future (L.1.1.e)
   #125 of the one-by-one rebuild: PHOTO, WINDOW, ENVELOPE — the Clock
   Tower (time-frames-activity).
   (The previous driver drove the retired tense activity; it is in git.)

     open      — the sentence card with its picture, the time word and an
                 empty gap; the verb cards; the tower's album, window and
                 post slot.
     picked    — a WRONG card laid in the gap: its words stand in the
                 sentence. ⭐ Nothing is graded yet — no frame at an
                 opening, no glow, no hint: a choice is not a verdict.
     missed    — the wrong card + Check: it develops into its frame and
                 bumps against the opening the time word names; the hint
                 names that opening; the card stays in the gap to be re-read.
     resolved  — the right card + Check: it develops and files into its
                 opening, the success line; 0.5 s later the shell's Next.

   ⚠ CARDS ARE REACHED BY TENSE (data-k="card-<tense>"), NEVER BY WORD —
   the words change per locale and per round.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'TimeFramesActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], rd = t && t.st && t.st.rd;
  if (!rd || (rd.kind !== 'pick' && rd.kind !== 'time')) return null;
  return { right: rd.right, wrong: rd.cards.filter((c) => c.tense !== rd.right)[0].tense };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a card round on window.' + G);
        if (!(await tap(page, '[data-k="card-' + r.wrong + '"]'))) throw new Error('card ' + r.wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          inGap: !!document.querySelector('[data-k="gap"]'), frames: document.querySelectorAll('.vt-op .vt-fr').length,
          glow: document.querySelectorAll('.vt-cardw.is-glow').length, note: document.querySelector('.vt-note').textContent.trim()
        }));
        if (!st.inGap) throw new Error('the card did not go into the gap');
        if (st.frames) throw new Error('a frame at an opening before Check — the board is grading a choice');
        if (st.glow) throw new Error('a card glows before Check');
        if (st.note) throw new Error('a hint before Check: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a card round on window.' + G);
        if (!(await tap(page, '[data-k="card-' + r.wrong + '"]'))) throw new Error('card ' + r.wrong + ' absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({
          hint: document.querySelector('.vt-note').classList.contains('is-hint') && !!document.querySelector('.vt-note').textContent.trim(),
          bump: document.querySelectorAll('.vt-op .vt-fr.is-bump').length, inGap: !!document.querySelector('[data-k="gap"]')
        }));
        if (!st.hint) throw new Error('no hint after a wrong card');
        if (st.bump !== 1) throw new Error('the card did not bump against its opening (' + st.bump + ')');
        if (!st.inGap) throw new Error('the wrong card left the gap — the child has nothing to re-read');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a card round on window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        if (!(await tap(page, '[data-k="card-' + r.right + '"]'))) throw new Error('the right card absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.vt-note').classList.contains('is-ok'), filed: document.querySelectorAll('.vt-op .vt-fr.is-in').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok) throw new Error('no success line');
        if (st.filed !== 1) throw new Error('the card did not file into its opening (' + st.filed + ')');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
