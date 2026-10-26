/* =====================================================================
   visual-qa phase driver — hazel-word-bridge / joining-words (L.1.1.g)
   #126 of the one-by-one rebuild: THE TURNING BRIDGE (turning-bridge-activity).
   (The previous driver drove the retired chip activity; it is in git.)

     open      — two signboards on two banks, an empty bridge over the
                 river, the planks on the rack.
     picked    — a WRONG plank laid on the bridge: the strip reads its
                 sentence. ⭐ Nothing is graded yet — no car drive, no glow,
                 no hint: a choice is not a verdict.
     missed    — the wrong plank + Check: the hint names why, the car drives
                 the plank's way, the plank stays to be re-read.
     resolved  — the right plank (on its right face) + Check: the success
                 line, a plank on the long bridge; 0.5 s later the shell's
                 Next.

   ⚠ PLANKS ARE REACHED BY KIND (data-k="plank-<and|but|or|arrow>"),
   NEVER BY WORD — the words change per locale and the arrow plank's face.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'TurningBridgeActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], C = window.TurningBridgeCore, rd = t && t.st && t.st.rd;
  if (!rd || rd.kind !== 'pick') return null;
  const right = C.rightPlank(rd);
  return { right: right, face: right === 'arrow' ? C.rightFace(rd, t.st.order) : null, wrong: rd.rack.filter((p) => p !== right)[0] };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a plank round on window.' + G);
        if (!(await tap(page, '[data-k="plank-' + r.wrong + '"]'))) throw new Error('plank ' + r.wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          onBridge: !!document.querySelector('.tb-plank.on-bridge'), drive: document.querySelectorAll('.tb-car[class*="dr-"]').length,
          glow: document.querySelectorAll('.tb-plank.is-glow').length, note: document.querySelector('.tb-note').textContent.trim()
        }));
        if (!st.onBridge) throw new Error('the plank did not go onto the bridge');
        if (st.drive) throw new Error('the car drove before Check — the board is grading a choice');
        if (st.glow) throw new Error('a plank glows before Check');
        if (st.note) throw new Error('a hint before Check: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a plank round on window.' + G);
        if (!(await tap(page, '[data-k="plank-' + r.wrong + '"]'))) throw new Error('plank ' + r.wrong + ' absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({
          hint: document.querySelector('.tb-note').classList.contains('is-hint') && !!document.querySelector('.tb-note').textContent.trim(),
          drive: document.querySelectorAll('.tb-car[class*="dr-"]').length, onBridge: !!document.querySelector('.tb-plank.on-bridge')
        }));
        if (!st.hint) throw new Error('no hint after a wrong plank');
        if (st.drive !== 1) throw new Error('the car did not drive the plank\'s way (' + st.drive + ')');
        if (!st.onBridge) throw new Error('the wrong plank left the bridge — the child has nothing to re-read');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a plank round on window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        if (!(await tap(page, '[data-k="plank-' + r.right + '"]'))) throw new Error('the right plank absent');
        if (r.right === 'arrow') { const f = await page.evaluate((g) => window[g].st.face, G); if (f !== r.face && !(await tap(page, '[data-k="flip"]'))) throw new Error('the turner absent'); }
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.tb-note').classList.contains('is-ok'), seg: document.querySelectorAll('.tb-seg').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok) throw new Error('no success line');
        if (st.seg < 1) throw new Error('no plank on the long bridge');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
