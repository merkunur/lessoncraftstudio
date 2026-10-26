/* =====================================================================
   visual-qa phase driver — pronoun / case (L.1.1.d)
   #124 of the one-by-one rebuild: THE PRONOUN PRISM (pronoun-prism-activity).
   (The previous driver drove the retired pronoun-activity.js; it is in git.)

     open      — the referent block with its thread, the sentence with its
                 gap, three prisms in the tray.
     picked    — a WRONG prism laid in the gap: its word stands in the
                 sentence. ⭐ Nothing is graded yet — no arrow, no glow, no
                 hint: a choice is not a verdict.
     missed    — the wrong prism + Check: the arrow (or the owner string)
                 drops, the referent block pings, the hint names why, the
                 wrong word stays in the gap to be re-read.
     resolved  — the right prism turned to the right face + Check: the arrow
                 lands, the word in teal, the success line, a hat in the
                 window; 0.5 s later the shell's Next.

   ⚠ PRISMS ARE REACHED BY PERSON (data-k="prism-<person>"), NEVER BY WORD —
   the words change per locale and per round (owner words agree with the
   thing). The face is turned with the real turn button until the model's
   face index is the round's job.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'PronounPrismActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], rd = t && t.st && t.st.rd;
  if (!rd || rd.kind !== 'prism') return null;
  return { person: rd.person, ji: rd.ji, wrong: rd.tray.filter((p) => p !== rd.person)[0] };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function turnTo(page, person, ji) {
  for (let i = 0; i < 3; i++) {
    const f = await page.evaluate((g, p) => window[g].st.face[p], G, person);
    if (f === ji) return true;
    if (!(await tap(page, '[data-k="turn"]'))) return false;
  }
  return false;
}

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a prism round on window.' + G);
        if (!(await tap(page, '[data-k="prism-' + r.wrong + '"]'))) throw new Error('prism ' + r.wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          inGap: !!document.querySelector('.vp-gapbox'), arrows: document.querySelectorAll('.vp-arrow,.vp-string').length,
          glow: document.querySelectorAll('.vp-prism.is-glow').length, note: document.querySelector('.vp-note').textContent.trim()
        }));
        if (!st.inGap) throw new Error('the prism did not go into the gap');
        if (st.arrows) throw new Error('an arrow fired before Check — the board is grading a choice');
        if (st.glow) throw new Error('a prism glows before Check');
        if (st.note) throw new Error('a hint before Check: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a prism round on window.' + G);
        if (!(await tap(page, '[data-k="prism-' + r.wrong + '"]'))) throw new Error('prism ' + r.wrong + ' absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({
          hint: document.querySelector('.vp-note').classList.contains('is-hint') && !!document.querySelector('.vp-note').textContent.trim(),
          bad: document.querySelectorAll('.vp-arrow.is-bad,.vp-string.is-bad').length, ping: !!document.querySelector('.vp-ref.is-ping'), inGap: !!document.querySelector('.vp-gapbox')
        }));
        if (!st.hint) throw new Error('no hint after a wrong prism');
        if (st.bad !== 1) throw new Error('the arrow did not drop (' + st.bad + ')');
        if (!st.ping) throw new Error('the referent block did not ping for the wrong person');
        if (!st.inGap) throw new Error('the wrong word left the gap — the child has nothing to re-read');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a prism round on window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        if (!(await tap(page, '[data-k="prism-' + r.person + '"]'))) throw new Error('the right prism absent');
        if (!(await turnTo(page, r.person, r.ji))) throw new Error('could not turn to the right face');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.vp-note').classList.contains('is-ok'), landed: document.querySelectorAll('.vp-arrow.is-ok,.vp-string.is-ok').length, gap: !!document.querySelector('.vp-gapbox.is-ok'),
            hat: document.querySelectorAll('.vp-hat.on').length, celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.gap) throw new Error('no success line / the gap is not marked right');
        if (st.landed !== 1) throw new Error('the arrow did not land (' + st.landed + ')');
        if (!st.hat) throw new Error('no hat in the window');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
