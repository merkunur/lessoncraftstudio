/* =====================================================================
   visual-qa phase driver — skipcount / fill (2.NBT.A.2)
   #141 of the one-by-one rebuild: THE FLIP PADS (flip-pads-activity).

     open      — the pond: a chain of lily pads on split-flaps, Hopper on
                 the pad before the empty one with his hop sign, the flap
                 board (the empty pad, a copy of the pad before) and Check.
     missed    — the ones flap flipped once and checked: the leap meter
                 (+1) beside Hopper's hop, the hint.
     helped    — a second wrong Check: the pad before lined up over the
                 board, the flaps that must change ringed.
     resolved  — every empty pad flipped to its number: the column show,
                 the round line; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("flap-2-up", "sign-up", "check"),
     NEVER BY LABEL. The driver plays the default (5, 10, 100).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'FlipPadsActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function miss(page) { await tap(page, '[data-k="flap-2-up"]'); await tap(page, '[data-k="check"]'); }
/* the shortest taps to a target, worked out on the core's own rule */
async function playTo(page, target) {
  const taps = await page.evaluate((g, target) => {
    const C = window.FlipPadsCore, st = window[g].st, want = C.flaps(target, st.places); let b = st.board.slice(); const out = [];
    for (let pass = 0; pass < 3 && C.valueOf(b) !== target; pass++) for (let i = 0; i < b.length; i++) {
      let best = null;
      for (const d of [1, -1]) { let x = b.slice(), n = 0; while (x[i] !== want[i] && n < 10) { C.flipDigits(x, i, d); n++; } if (x[i] === want[i] && (!best || n < best.n)) best = { d, n, x }; }
      if (best && best.n) { for (let q = 0; q < best.n; q++) out.push([i, best.d]); b = best.x; }
    }
    return out;
  }, G, target);
  for (const [i, d] of taps) await tap(page, '[data-k="flap-' + i + '-' + (d > 0 ? 'up' : 'down') + '"]');
}

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page); await miss(page);
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.fp-note').classList.contains('is-hint'), misses: window.FlipPadsActivity.st.misses }));
        if (!st.hint || st.misses !== 1) throw new Error('a wrong pad did not give a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page); await miss(page); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ help: window.FlipPadsActivity.st.help, ladder: document.querySelectorAll('.fp-ladder .fp-colrow').length }));
        if (!st.help || st.ladder !== 2) throw new Error('miss 2 did not line up the pad before');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const rd = await page.evaluate((g) => window[g].st.rd, G);
        if (rd.hop) {
          const step = rd.seq[1] - rd.seq[0];
          if (step < 0) await tap(page, '[data-k="sign-up"]');
          await playTo(page, Math.abs(step)); await tap(page, '[data-k="check"]');
        } else {
          for (let g = 0; g < 3; g++) {
            const s = await page.evaluate((gg) => { const t = window[gg].st; return { done: t.done, bi: t.bi }; }, G);
            if (s.done) break;
            await playTo(page, rd.seq[rd.buds[s.bi]]); await tap(page, '[data-k="check"]');
          }
        }
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { done: window.FlipPadsActivity.st.done, ok: document.querySelector('.fp-note').classList.contains('is-ok'), celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.done || !st.ok) throw new Error('the round did not finish with its line');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
