/**
 * opposites-screen.js — Level Set 2026-09-28 (Opposites, PDF + interactive): the screen version (tap-choice) and
 * the answer key for G1-307 and its faces, built from the printed page's own meta (the SAME instance: fresh rng,
 * same seed — render-instance asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every
 * answer from the merged bank (never from the page's marks).
 *
 *   write  (G1-307)  the given word → tap its opposite (3 of the page's answers, rotation)
 *   frames (G1-335)  the sentence with a gap → tap the word that completes it (the opposite)
 *   match  (K-351)   a picture + word → tap the picture + word that shows its opposite
 *   choice (G1-337)  the word → tap its opposite among the page's own pills (2, 3 or 4)
 *   prefix (G2-320)  the word → tap the word that is its opposite (the prefixed words of the page)
 * G1-336 (pair up) is printable only: sorting twelve words into written pairs has no single-answer tap.
 */
'use strict';
const { slotFor, pageSalt } = require('./answer-slots.js');
let PAGE_SALT = '';

const CORAL = '#F2784B';
const { seatAfter } = require('./key-on-row.js');
const SCR_W = 660, OPT_H = 104;   // Cloze's measured screen sizes: 104 page-px reaches the 44 px tap floor at 360 wide
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
function opt(i, label, html, correct, w) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:30px;gap:8px">${html}</span>`;
}
const opts = (html) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${html}</div>`;
const word = (w, px = 40) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:#3A3530">${esc(w)}</span>`;
const pic = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;
const sentence = (pre, post) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:30px;line-height:1.35;color:#3A3530">${esc(pre)}${GAP}${esc(post || '')}</span>`;
const ARROW = `<span style="font-size:40px;color:#146B5E;font-weight:800">&#8596;</span>`;

/** Three options for item i: its own answer + the next two of the page's list, the right one at position i % 3. */
function rotation(list, i) {
  const own = list[i];
  const others = [1, 2].map((k) => list[(i + k) % list.length]).filter((x) => x !== own);
  const o = others.slice(0, 2);
  const at = slotFor(PAGE_SALT + own + '|' + i, o.length + 1);   // never i % 3 (a diagonal tell, 2026-10-06)
  o.splice(at, 0, own);
  return { opts: o, at };
}

/**
 * @param layout 'write' | 'frames' | 'match' | 'choice' | 'prefix'
 * @param built  the printed page's { bodyHtml, meta }
 * @param bank   the merged bank the page was built from
 * @param resolvePic G1-307's picture resolver (theme/noun → { src })
 */
function screenOrKey(layout, built, ctx, loc, bank, resolvePic) {
  PAGE_SALT = pageSalt(built);   // every slot hash of this page joins its fingerprint (2026-10-06)
  const m = built.meta;
  const out = { bodyHtml: built.bodyHtml, meta: m };
  const byId = new Map(bank.pairs.map((p) => [p.id, p]));
  if (ctx.interactive) {
    let items = [];
    if (layout === 'write') {
      items = m.pairs.map((id, i) => {
        const r = rotation(m.answers, i);
        return item(`data-lcs-pair="${esc(id)}" data-lcs-given="${esc(m.given[i])}"`, `${word(m.given[i], 44)}${ARROW}${GAP}`,
          opts(r.opts.map((w, j) => opt(j, w, esc(w), j === r.at, 200)).join('')));
      });
    } else if (layout === 'frames') {
      items = m.pairs.map((id, i) => {
        const fr = (bank.frames || []).find((f) => f.pair === id && f.answer === m.answers[i]);
        if (!fr) throw new Error(`opposites screen: no frame ${id} → ${m.answers[i]}`);
        const text = String(fr.text).split('{name}').join(m.names[i] || '');
        const [pre, post] = text.split('___');
        const p = byId.get(id);
        const given = p.a === m.answers[i] ? p.b : p.a;
        const r = rotation(m.answers, i);
        return item(`data-lcs-pair="${esc(id)}" data-lcs-given="${esc(given)}"`, sentence(pre, post),
          opts(r.opts.map((w, j) => opt(j, w, esc(w), j === r.at, 200)).join('')));
      });
    } else if (layout === 'match') {
      const side = (p, s) => {
        const src = p.pic.kind === 'scale' ? resolvePic({ theme: p.pic.theme, noun: p.pic.noun, key: p.pic.key }, loc, 'screen').src : resolvePic(p.pic[s], loc, 'screen').src;
        return { src, w: s === 'a' ? p.a : p.b, px: p.pic.kind === 'scale' && s === 'b' ? 64 : 92 };
      };
      const rights = m.pairs.map((id) => byId.get(id).b);
      items = m.pairs.map((id, i) => {
        const p = byId.get(id);
        const L = side(p, 'a');
        const r = rotation(rights, i);
        return item(`data-lcs-pair="${esc(id)}" data-lcs-given="${esc(p.a)}"`, `${pic(L.src, 110)}${word(L.w, 40)}`,
          opts(r.opts.map((w, j) => {
            const q = byId.get(m.pairs[rights.indexOf(w)]);
            const R = side(q, 'b');
            return opt(j, w, `${pic(R.src, R.px)}<span>${esc(w)}</span>`, j === r.at, 190);
          }).join('')));
      });
    } else if (layout === 'choice') {
      items = m.pairs.map((id, i) => {
        const p = byId.get(id);
        const ws = m.pills[i];
        const w = ws.length > 3 ? 150 : 190;
        return item(`data-lcs-pair="${esc(id)}" data-lcs-given="${esc(p.a)}"`, `${word(p.a, 44)}${ARROW}${GAP}`,
          opts(ws.map((x, j) => opt(j, x, esc(x), j === m.correct[i], w)).join('')));
      });
    } else if (layout === 'prefix') {
      const items0 = (bank.prefix || {}).items || [];
      const exp = m.bases.map((b) => { const it = items0.find((x) => x.base === b); if (!it) throw new Error(`opposites screen: no prefix item ${b}`); return it.expected; });
      items = m.bases.map((b, i) => {
        const r = rotation(exp, i);
        return item(`data-lcs-base="${esc(b)}"`, `${word(b, 44)}${ARROW}${GAP}`,
          opts(r.opts.map((w, j) => opt(j, w, esc(w), j === r.at, 220)).join('')));
      });
    } else throw new Error(`opposites screen: layout "${layout}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="opposites" data-lcs-screen="${layout}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // answer key: the printed page with every answer shown in coral — a written answer is SEATED on its own writing
  // row (key-on-row.js: on the base rule, x-height to the dashed midline), never placed with a guessed CSS offset
  const css = [];
  const seat = (needle, w) => { out.bodyHtml = seatAfter(out.bodyHtml, needle, w, { fill: CORAL, font: 'baloo2-700' }); };
  if (layout === 'write') m.pairs.forEach((id, i) => seat(`data-lcs-pair="${esc(id)}"`, m.answers[i]));
  else if (layout === 'frames') {
    if (/data-lcs-choose/.test(out.bodyHtml)) css.push(`[data-lcs-correct-pill]{outline:4px solid ${CORAL};outline-offset:2px}`);
    else m.pairs.forEach((id, i) => seat(`data-lcs-frame="${esc(id)}"`, m.answers[i]));
  } else if (layout === 'match') {
    css.push('[data-lcs-left],[data-lcs-right]{position:relative}');
    m.pairs.forEach((id, i) => {
      const b = `content:"${i + 1}";position:absolute;top:-10px;min-width:28px;height:28px;border-radius:14px;background:${CORAL};color:#fff;font:700 17px/28px 'Baloo 2',cursive;text-align:center;z-index:2`;
      css.push(`[data-lcs-left="${cssStr(id)}"]::before{${b};left:-10px}`, `[data-lcs-right="${cssStr(id)}"]::before{${b};right:-10px}`);
    });
  } else if (layout === 'choice') css.push(`[data-lcs-correct-pill]{outline:4px solid ${CORAL};outline-offset:2px}`);
  else if (layout === 'prefix') {
    const items0 = (bank.prefix || {}).items || [];
    m.bases.forEach((b) => seat(`data-lcs-base="${esc(b)}"`, items0.find((x) => x.base === b).expected));
  }
  out.bodyHtml = out.bodyHtml + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/** The robot's truth per screen item, from the MERGED BANK only: the item's pair (or prefix base) → its answer. */
function oracle(layout, items, loc, bank) {
  const lc = (x) => String(x).normalize('NFC').toLocaleLowerCase(loc);
  const byId = new Map(bank.pairs.map((p) => [p.id, p]));
  return items.map((it) => {
    let want;
    if (layout === 'prefix') {
      const b = it.meta['data-lcs-base'];
      const x = ((bank.prefix || {}).items || []).find((y) => y.base === b);
      if (!x) throw new Error(`oracle: no prefix item "${b}"`);
      want = x.expected;
    } else {
      const p = byId.get(it.meta['data-lcs-pair']);
      if (!p) throw new Error(`oracle: no pair "${it.meta['data-lcs-pair']}"`);
      const given = it.meta['data-lcs-given'];
      if (lc(given) !== lc(p.a) && lc(given) !== lc(p.b)) throw new Error(`oracle: "${given}" is not a member of ${p.id}`);
      want = lc(given) === lc(p.a) ? p.b : p.a;
    }
    const labels = (it.options || []).map((o) => (o && typeof o === 'object' ? o.label : o));
    const idx = labels.findIndex((l) => lc(l) === lc(want));
    if (idx < 0) throw new Error(`oracle: "${want}" not among ${labels.join('/')} (${layout})`);
    if (labels.filter((l) => lc(l) === lc(want)).length > 1) throw new Error(`oracle: "${want}" offered twice (${layout})`);
    return idx;
  });
}

module.exports = { screenOrKey, oracle, rotation };
