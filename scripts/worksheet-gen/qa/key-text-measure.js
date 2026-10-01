/**
 * key-text-measure.js — the measurement behind qa/verify-key-text.js, shared with render/render-instance.js so that
 * EVERY answer key is measured while it is generated (a misaligned key fails its deck's build; it can never be
 * published). Operator ruling 2026-09-28: "make sure that you will never repeat this alignment mistake" — the same
 * mistake (text placed on writing lines by a guessed offset) had shipped before (the 2026-09-21 starters).
 *
 * measureKeyPage(page) -> m   judgeKey(m, tag) -> string[] failures (see verify-key-text.js for the rules A B C P G)
 */
'use strict';
async function measureKeyPage(page) {
  return page.evaluate(() => {
    const out = { texts: [], pseudo: [], gap: [], rows: 0, fontOk: true };
    const cv = document.createElement('canvas').getContext('2d');
    const ink = (spec) => { cv.font = spec; return { x: cv.measureText('x').actualBoundingBoxAscent, b: cv.measureText('b').actualBoundingBoxAscent }; };
    const rowsOf = (el) => {
      const svg = el.ownerSVGElement || el;   // a writing-row <svg>, or a trace lane's empty trio <g> (its own three rules)
      const lines = [...el.querySelectorAll('line')].filter((l) => l.getAttribute('y1') === l.getAttribute('y2'));
      const ys = lines.map((l) => { const p = svg.createSVGPoint(); p.x = 0; p.y = +l.getAttribute('y1'); return { y: p.matrixTransform(l.getScreenCTM()).y, dashed: !!l.getAttribute('stroke-dasharray') }; }).sort((a, b) => a.y - b.y);
      return ys.length === 3 ? { top: ys[0].y, mid: ys[1].y, base: ys[2].y, box: el.getBoundingClientRect() } : null;
    };
    // Singular and Plural (2026-10-01): answers seated in a trace lane's EMPTY TRIO are measured against that trio's
    // own rules — only trios that carry a key text, so no other page is measured differently
    const trios = [...document.querySelectorAll('g[data-lcs-empty-trio]')].filter((g) => g.querySelector('text[data-lcs-keytext]'));
    const rows = [...document.querySelectorAll('svg[data-lcs-prim="writing-row"]'), ...trios].map((s) => ({ svg: s, r: rowsOf(s) })).filter((x) => x.r);
    out.rows = rows.length;
    // scale: an svg that flex-shrinks is drawn scaled (lines AND text together); the font's ink measured at its
    // unscaled font-size must be scaled the same way, or a long sentence in a narrow lane reads as "off" (G2-281 de)
    const rec = (el, row, baseline, kind, scale = 1) => {
      const cs = getComputedStyle(el);
      const spec = `${cs.fontWeight} ${parseFloat(cs.fontSize)}px ${cs.fontFamily}`;
      if (!document.fonts.check(spec, 'xb')) out.fontOk = false;
      const k = ink(spec), b = el.getBoundingClientRect();
      out.texts.push({ text: el.textContent.trim(), kind, baseline, xInk: k.x * scale, bInk: k.b * scale, top: row.top, mid: row.mid, base: row.base, right: b.right, rowRight: row.box.right, starter: el.hasAttribute('data-lcs-starter') && !el.hasAttribute('data-lcs-keytext') });
    };
    for (const { svg, r } of rows) {
      svg.querySelectorAll('text').forEach((t) => {
        const p = (svg.ownerSVGElement || svg).createSVGPoint(); p.x = +t.getAttribute('x'); p.y = +t.getAttribute('y');
        const m = t.getScreenCTM();
        rec(t, r, p.matrixTransform(m).y, 'svg', Math.hypot(m.a, m.b));
      });
    }
    // HTML text laid over a row (a span positioned onto the lines)
    document.querySelectorAll('body *').forEach((el) => {
      if (el.closest('svg') || !el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      const row = rows.find(({ r }) => b.left < r.box.right && b.right > r.box.left && Math.min(b.bottom, r.base + 2) - Math.max(b.top, r.top - 2) > b.height * 0.5);
      if (!row) return;
      // the element's OWN text must lie over the row — a sentence that merely CONTAINS an inline gap row (G3-399) has its
      // words beside the row, not on it (2026-09-29: measured as "over" and failed a correct key)
      const over = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).some((n) => {
        const rg = document.createRange(); rg.selectNodeContents(n);
        return [...rg.getClientRects()].some((q) => q.left < row.r.box.right - 1 && q.right > row.r.box.left + 1 && q.top < row.r.base && q.bottom > row.r.top);
      });
      if (!over) return;
      const probe = document.createElement('span');
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      el.appendChild(probe);
      const baseline = probe.getBoundingClientRect().top;
      probe.remove();
      rec(el, row.r, baseline, 'html');
    });
    // ::after text over a row, and gap-box answers
    document.querySelectorAll('body *').forEach((el) => {
      const ps = getComputedStyle(el, '::after');
      const c = ps.content;
      if (!c || c === 'none' || c === 'normal' || c === '""') return;
      const b = el.getBoundingClientRect();
      if (el.hasAttribute('data-lcs-gapbox')) {
        const centered = ps.position === 'absolute' && ps.display === 'flex' && ps.alignItems === 'center' && ps.justifyContent === 'center' && parseFloat(ps.top) === 0 && parseFloat(ps.left) === 0;
        out.gap.push({ text: c, centered });
        return;
      }
      if (/^"\d{1,2}"$/.test(c)) return;   // a numbered badge, not an answer
      const row = rows.find(({ r }) => b.left < r.box.right && b.right > r.box.left && b.top < r.base && b.bottom > r.top);
      if (row) out.pseudo.push({ text: c, tag: el.tagName + [...el.attributes].filter((a) => a.name.startsWith('data-lcs')).map((a) => `[${a.name}]`).join('') });
    });
    return out;
  });
}

function judgeKey(m, tag) {
  const fails = [];
  if (!m.fontOk) fails.push(`${tag}: a key font is not loaded (fallback measured)`);
  for (const p of m.pseudo) fails.push(`${tag}: ::after text ${p.text} over a writing row (${p.tag}) — a guessed offset (P)`);
  for (const g of m.gap) if (!g.centered) fails.push(`${tag}: gap-box answer ${g.text} is not centered in its box (G)`);
  for (const s of m.texts) {
    const t = `${tag} "${s.text.slice(0, 30)}"`;
    if (Math.abs(s.baseline - s.base) > 1) fails.push(`${t}: baseline ${s.baseline.toFixed(1)} vs base rule ${s.base.toFixed(1)} (A)`);
    const xTop = s.baseline - s.xInk;
    if (Math.abs(xTop - s.mid) > 1.5) fails.push(`${t}: x-height top ${xTop.toFixed(1)} vs mid rule ${s.mid.toFixed(1)} (B)`);
    if (s.bInk > s.base - s.top + 1) fails.push(`${t}: ascender over the top rule (C)`);
    if (s.right > s.rowRight + 1) fails.push(`${t}: runs ${Math.round(s.right - s.rowRight)} px past the row (C)`);
  }
  return fails;
}


module.exports = { measureKeyPage, judgeKey };
