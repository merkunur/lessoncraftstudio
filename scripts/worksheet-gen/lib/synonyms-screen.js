/**
 * synonyms-screen.js — Level Set 2026-10-01 (Synonyms, PDF + interactive): the SCREEN version and the ANSWER KEY of a
 * built G2-358 page (the base or one of its five faces), built from the printed page's own meta (the same instance:
 * render-instance asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every answer from the
 * merged bank (never from the page's marks). New pages only — the published pages never reach this file.
 *
 *   base      (G2-358)  the big word → tap the word that means the same (the card's own tags)
 *   pictures  (G1-395)  a picture + one word for it → tap the OTHER word that means the picture (the card's tags)
 *   pairs     (G2-373)  a word from the left → tap its partner (three words of the right column)
 *   shades    (G1-396)  three words → tap them from the weakest to the strongest (tap-spell, word tiles)
 *   say       (G2-374)  a sentence with a gap → tap the word that fits (three words of the bubble)
 *   fields    (G3-397)  a pile word → tap the field it belongs to (the two field signs)
 * Every target is >= 96 page px (44 px on a 360 px phone). The key is the printed page with the answers in coral:
 * circled tags outlined, matching numbers on the pairs, the ranks in the boxes, the word in each gap (centered), and
 * each field word SEATED on its field's writing row (key-on-row.js).
 */
'use strict';
const { seatOnRow } = require('./key-on-row.js');
const { fileUri } = require('./b2-common.js');

const CORAL = '#F2784B', INK = '#1F2B2A';
const SCR_W = 660, OPT_H = 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
function opt(i, label, correct, w, px) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(label)}</span>`;
}
const optW = (n) => (n >= 4 ? 150 : n === 3 ? 200 : 290);
const optPx = (labels) => { const g = Math.max(...labels.map((l) => [...String(l)].length)); const n = labels.length; const w = optW(n); return Math.max(18, Math.min(30, Math.floor((w - 24) / (0.6 * g)))); };
const opts = (labels, correct) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${labels.map((l, j) => opt(j, l, j === correct, optW(labels.length), optPx(labels))).join('')}</div>`;
const word = (w, px = 44) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:${INK}">${esc(w)}</span>`;
const text = (w, px = 26) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;line-height:1.35;color:${INK}">${esc(w)}</span>`;
const pic = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;
const EQ = `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:40px;color:#146B5E">=</span>`;

/** Options for item i: its own answer + up to `k` OTHER labels, the right one at i % (k + 1) (no position tell). */
function rotation(own, others, i) {
  const o = others.slice();
  const at = i % (o.length + 1);
  o.splice(at, 0, own);
  return { opts: o, at };
}
/** the next `k` DIFFERENT entries of `list` after position i, skipping `own` */
function nextOthers(list, i, own, k, loc) {
  const out = [];
  for (let s = 1; s < list.length && out.length < k; s++) { const x = list[(i + s) % list.length]; if (low(x, loc) !== low(own, loc) && !out.some((y) => low(y, loc) === low(x, loc))) out.push(x); }
  return out;
}

/** The k-th writing row (0-based) after `needle`, with `t` seated on it. */
function seatNth(html, needle, k, t) {
  const at = html.indexOf(needle);
  if (at < 0) throw new Error(`synonyms key: no element "${needle.slice(0, 60)}"`);
  let from = at;
  for (let i = 0; ; i++) {
    const rel = html.slice(from).search(/<svg[^>]*data-lcs-prim="writing-row"/);
    if (rel < 0) throw new Error(`synonyms key: no writing row ${k} after "${needle.slice(0, 60)}"`);
    const s = from + rel;
    const e = html.indexOf('</svg>', s) + 6;
    if (i === k) return html.slice(0, s) + seatOnRow(html.slice(s, e), t, { fill: CORAL, font: 'baloo2-700', em: 0.64 }) + html.slice(e);
    from = e;
  }
}

/**
 * screenOrKey(mode, built, ctx, loc, bank) — bank = the merged Level Set bank (G2-358 mergedBank).
 */
function screenOrKey(mode, built, ctx, loc, bank) {
  const m = built.meta;
  const out = { bodyHtml: built.bodyHtml, meta: m };
  const groups = new Map((bank.groups || []).map((g) => [g.concept, g]));
  if (ctx.interactive) {
    let items = [];
    if (mode === 'base') {
      items = m.cards.map((c, i) => {
        const others = c.tags.filter((t) => t !== c.answer);
        const r = rotation(c.answer, others, i);
        return item(`data-lcs-word="${esc(c.target)}" data-lcs-concept="${esc(c.concept)}"`, word(c.target) + EQ + GAP, opts(r.opts, r.at));
      });
    } else if (mode === 'pictures') {
      items = m.cards.map((c, i) => {
        const P = bank._pictures[c.concept];
        const r = rotation(c.answers[1], c.distractors, i);
        return item(`data-lcs-word="${esc(c.answers[0])}" data-lcs-concept="${esc(c.concept)}"`, pic(fileUri(P.theme, P.noun), 140) + word(c.answers[0], 40) + EQ + GAP, opts(r.opts, r.at));
      });
    } else if (mode === 'pairs') {
      items = m.left.map((w, i) => {
        const j = m.rOrder.indexOf(i);
        const own = m.right[j];
        const r = rotation(own, nextOthers(m.right, j, own, 2, loc), i);
        return item(`data-lcs-word="${esc(w)}"`, word(w) + EQ + GAP, opts(r.opts, r.at));
      });
    } else if (mode === 'shades') {
      const scales = new Map((bank.scales || []).map((s) => [s.id, s.words]));
      items = m.rows.map((r) => {
        const ws = scales.get(r.id);
        if (!ws) throw new Error(`synonyms screen: no scale ${r.id}`);
        const shown = r.order.map((k) => ws[k]);
        const g = Math.max(...ws.map((x) => [...x].length));
        const px = Math.max(20, Math.min(30, Math.floor(176 / (0.6 * g))));
        const tiles = `<div style="display:flex;gap:12px;justify-content:center">${shown.map((x) => `<span class="ws-achip" data-lcs-tile data-lcs-label="${esc(x)}" style="width:200px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(x)}</span>`).join('')}</div>`;
        const slots = `<div style="display:flex;gap:12px;justify-content:center;align-items:flex-end">${[1, 2, 3].map((k) => `<span data-lcs-slot style="display:inline-block;width:200px;height:${60 + k * 10}px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:12px;background:#FFF"></span>`).join('')}</div>`;
        return `<div data-lcs-item data-lcs-scale="${esc(r.id)}" data-lcs-answer="${esc(ws.join(''))}" data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${slots}${tiles}</div>`;
      });
    } else if (mode === 'say') {
      const sents = new Map(bank.fields.say.sentences.map((s) => [s.id, s]));
      items = m.rows.map((r, i) => {
        const s = sents.get(r.id);
        const t = s.text.split('{name}').join(m.names[i]);
        const [pre, post] = t.split('{gap}');
        const rr = rotation(r.answer, nextOthers(m.bank, m.bank.indexOf(r.answer), r.answer, 2, loc), i);
        return item(`data-lcs-word="${esc(r.id)}" data-lcs-sentence-id="${esc(r.id)}"`, `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1.35;color:${INK}">${esc(pre)}${GAP}${esc(post || '')}</span>`, opts(rr.opts, rr.at));
      });
    } else if (mode === 'fields') {
      const F = bank.fields;
      const heads = m.fields.map((f) => bank.quotes[0] + F[f].head + bank.quotes[1]);
      items = m.pile.map((x) => {
        const [w, f] = [x.slice(0, x.lastIndexOf(':')), x.slice(x.lastIndexOf(':') + 1)];
        return item(`data-lcs-word="${esc(w)}"`, word(w), opts(heads, m.fields.indexOf(f)));
      });
    } else throw new Error(`synonyms screen: mode "${mode}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="synonyms" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }

  // the answer key
  const css = [];
  let h = out.bodyHtml;
  const ring = (sel) => css.push(`${sel}{outline:4px solid ${CORAL};outline-offset:3px}`);
  if (mode === 'base') {
    m.cards.forEach((c, i) => ring(`[data-lcs-card="${i + 1}"] [data-lcs-tag][data-lcs-slot="${c.slot}"]`));
  } else if (mode === 'pictures') {
    m.cards.forEach((c, i) => c.slots.forEach((s) => ring(`[data-lcs-card="${i + 1}"] [data-lcs-tag][data-lcs-slot="${s}"]`)));
  } else if (mode === 'pairs') {
    const badge = `position:absolute;top:-13px;width:26px;height:26px;border-radius:13px;background:${CORAL};color:#fff;font:700 16px/26px 'Baloo 2',cursive;text-align:center`;
    m.left.forEach((w, i) => {
      const j = m.rOrder.indexOf(i);
      css.push(`[data-lcs-col="left"] > :nth-child(${i + 1}){position:relative}[data-lcs-col="left"] > :nth-child(${i + 1})::after{content:"${i + 1}";${badge};left:8px}`);
      css.push(`[data-lcs-col="right"] > :nth-child(${j + 1}){position:relative}[data-lcs-col="right"] > :nth-child(${j + 1})::after{content:"${i + 1}";${badge};right:8px}`);
    });
  } else if (mode === 'shades') {
    css.push(`[data-lcs-rank-box]{position:relative}[data-lcs-rank-box]::after{content:attr(data-lcs-answer);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 22px 'Baloo 2',cursive;color:${CORAL}}`);
  } else if (mode === 'say') {
    m.rows.forEach((r, i) => {
      const sel = `[data-lcs-say-row="${i + 1}"] [data-lcs-gapbox]`;
      css.push(`${sel}{position:relative}`, `${sel}::after{content:"${cssStr(r.answer)}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 20px 'Baloo 2',cursive;color:${CORAL};white-space:nowrap;pointer-events:none}`);
    });
  } else if (mode === 'fields') {
    for (const f of m.fields) {
      const ws = m.pile.filter((x) => x.endsWith(':' + f)).map((x) => x.slice(0, x.lastIndexOf(':')));
      ws.forEach((w, k) => { h = seatNth(h, `data-lcs-field="${esc(f)}"`, k, w); });
    }
  }
  out.bodyHtml = h + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/** The robot's oracle: the right option INDEX (tap-choice) or the word order (tap-spell), re-derived from the merged bank. */
function oracle(mode, items, loc, bank) {
  const groups = bank.groups || [];
  const groupOf = (w) => groups.filter((g) => g.words.some((x) => low(x, loc) === low(w, loc)));
  const one = (L, pred, what) => {
    const hits = L.map((l, i) => (pred(l) ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`synonyms oracle: ${what}: ${hits.length} right options (${L.join(', ')})`);
    return hits[0];
  };
  return items.map((it) => {
    const L = it.options, M = it.meta || {};
    if (mode === 'base' || mode === 'pairs') {
      const g = groupOf(it.label);
      if (g.length !== 1) throw new Error(`synonyms oracle: "${it.label}" is in ${g.length} groups`);
      return one(L, (o) => low(o, loc) !== low(it.label, loc) && g[0].words.some((x) => low(x, loc) === low(o, loc)), it.label);
    }
    if (mode === 'pictures') {
      const g = groups.find((x) => x.concept === M['data-lcs-concept']);
      if (!g) throw new Error(`synonyms oracle: no group for ${M['data-lcs-concept']}`);
      return one(L, (o) => low(o, loc) !== low(it.label, loc) && g.words.some((x) => low(x, loc) === low(o, loc)), it.label);
    }
    if (mode === 'shades') {
      const s = (bank.scales || []).find((x) => x.id === M['data-lcs-scale']);
      if (!s) throw new Error(`synonyms oracle: no scale ${M['data-lcs-scale']}`);
      return s.words.slice();
    }
    if (mode === 'say') {
      const s = bank.fields.say.sentences.find((x) => x.id === M['data-lcs-sentence-id']);
      if (!s) throw new Error(`synonyms oracle: no sentence ${M['data-lcs-sentence-id']}`);
      return one(L, (o) => s.fit[o] === true, s.id);
    }
    if (mode === 'fields') {
      const F = bank.fields;
      return one(L, (o) => ['go', 'look'].some((f) => F[f] && o === bank.quotes[0] + F[f].head + bank.quotes[1] && F[f].words.some((x) => low(x, loc) === low(it.label, loc))), it.label);
    }
    throw new Error(`synonyms oracle: mode ${mode}`);
  });
}

const META_ATTRS = { base: ['data-lcs-concept'], pictures: ['data-lcs-concept'], pairs: [], shades: ['data-lcs-scale'], say: ['data-lcs-sentence-id'], fields: [] };
/** the interactive spec of a face (`bankOf` = the merged Level Set bank of a locale) */
function interactiveFor(mode, bankOf) {
  if (mode === 'shades') {
    return {
      kind: 'tap-spell', item: '[data-lcs-item]', tile: '[data-lcs-tile]', slot: '[data-lcs-slot]',
      answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-scale', metaAttrs: META_ATTRS.shades, instructionKey: 'shades', screenHeight: 3600,
      oracle: (items, l) => { const loc = (l || 'en').slice(0, 2); return oracle('shades', items, loc, bankOf(loc)); },
    };
  }
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: META_ATTRS[mode], instructionKey: mode, screenHeight: mode === 'fields' ? 4800 : 3600,
    oracle: (items, l) => { const loc = (l || 'en').slice(0, 2); return oracle(mode, items, loc, bankOf(loc)); },
  };
}

module.exports = { screenOrKey, oracle, interactiveFor };
