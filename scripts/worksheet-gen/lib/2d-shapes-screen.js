/**
 * 2d-shapes-screen.js — Level Set 2026-10-04 (2D Shapes, PDF + interactive): the SCREEN version and the ANSWER KEY of a
 * built K-368 page (the base or one of its faces), built from the printed page's OWN drawings (the figure svgs are
 * lifted out of the printed body, so the screen shows exactly the shapes the sheet shows), plus the robot's
 * INDEPENDENT oracle, which classifies every figure from its drawn outline (path / circle / ellipse) and reads the
 * bank for the names and the riddles — never the page's answer marks. New pages only: the published pages never
 * reach this file.
 *
 *   base         (K-368)   a shape → tap its name (the card's own name tags, printed order)
 *   real-or-not  (G1-381)  under each name, tap every shape that really is that shape (tap-select)
 *   around-us    (K-371)   a picture → tap circle or rectangle (the two tiles, fixed order as on the sheet)
 *   write-name   (G1-382)  a shape → tap its name among the four names of the box (rotated order)
 *   riddles      (G1-383)  a riddle → tap the shape's name (the card's own tags)
 *   dot-draw     (K-372)   no screen: a drawing has more than one right answer (PDF only)
 *
 * The key is the printed page with the answers in coral: the right tag / tile ringed, every true figure of a
 * real-or-not row ringed, and each name SEATED on its lane's writing row (key-on-row.js).
 */
'use strict';
const { seatOnRow } = require('./key-on-row.js');
const { fileUri } = require('./b2-common.js');
const { bank: loadBank } = require('./b5-common.js');
const { flatShape } = require('../primitives/flat-shape.js');
const tokens = require('../primitives/_tokens.js');

const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = tokens.color.teal;
const SCR_W = 660, OPT_H = 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);

/* ---------------------------------------------------------------- lifting the printed figures */
/** every flat-shape svg of a body, in document order */
function figuresOf(html) {
  return [...String(html).matchAll(/<svg[^>]*data-lcs-prim="flat-shape"[\s\S]*?<\/svg>/g)].map((m) => m[0]);
}
/** the drawn outline of a flat-shape svg (the teal element), as data the oracle can classify */
function outlineOf(svg) {
  const el = [...svg.matchAll(/<(path|circle|ellipse)\b([^>]*)\/?>/g)].find((m) => new RegExp(`stroke="${TEAL}"`, 'i').test(m[2]));
  if (!el) throw new Error('2d-shapes screen: a figure without its teal outline');
  const a = (n) => ((new RegExp(`\\b${n}="([^"]*)"`).exec(el[2])) || [])[1];
  if (el[1] === 'path') return { t: 'path', d: a('d') };
  if (el[1] === 'circle') return { t: 'circle', r: +a('r') };
  return { t: 'ellipse', rx: +a('rx'), ry: +a('ry') };
}
/** the svg at a new on-screen size (its viewBox keeps the drawing exact); the white lens stays */
const scaled = (svg, px) => svg.replace(/\swidth="[^"]*" height="[^"]*"/, ` width="${px}" height="${px}"`);

/* ---------------------------------------------------------------- the oracle's own geometry */
/**
 * classify(outline) — circle / square / rectangle / triangle / hexagon for a TRUE closed figure; anything else
 * (an ellipse, an open path, a curved side, rounded corners, a chord, a slanted quadrilateral) names what it is.
 */
function classify(o) {
  if (o.t === 'circle') return 'circle';
  if (o.t === 'ellipse') return Math.abs(o.rx / o.ry - 1) < 0.01 ? 'circle' : 'ellipse';
  const d = String(o.d || '');
  if (!/Z\s*$/.test(d)) return 'open';
  if (/[QCA]/.test(d)) return 'curved';
  if (/[^MLZ\d\s.,-]/.test(d)) return 'unknown';
  const n = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  let P = [];
  for (let i = 0; i + 1 < n.length; i += 2) P.push([n[i], n[i + 1]]);
  if (P.length > 1 && Math.hypot(P[0][0] - P[P.length - 1][0], P[0][1] - P[P.length - 1][1]) < 1e-6) P.pop();
  P = P.filter((v, i) => { const a = P[(i - 1 + P.length) % P.length], b = P[(i + 1) % P.length]; return Math.abs((v[0] - a[0]) * (b[1] - v[1]) - (v[1] - a[1]) * (b[0] - v[0])) > 1e-3 * Math.hypot(v[0] - a[0], v[1] - a[1]) * Math.hypot(b[0] - v[0], b[1] - v[1]); });
  const s = P.map((p, i) => Math.hypot(P[(i + 1) % P.length][0] - p[0], P[(i + 1) % P.length][1] - p[1]));
  if (P.length === 3) return 'triangle';
  if (P.length === 4) {
    const ang = P.map((v, i) => { const a = P[(i - 1 + 4) % 4], b = P[(i + 1) % 4]; const u = [a[0] - v[0], a[1] - v[1]], w = [b[0] - v[0], b[1] - v[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))))) * 180 / Math.PI; });
    if (!ang.every((x) => Math.abs(x - 90) <= 1)) return 'quadrilateral';
    return Math.max(...s) / Math.min(...s) <= 1.01 ? 'square' : 'rectangle';
  }
  if (P.length === 6 && Math.max(...s) / Math.min(...s) <= 1.01) return 'hexagon';
  return 'polygon-' + P.length;
}

/* ---------------------------------------------------------------- screen pieces */
function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
const optW = (n) => (n >= 4 ? 150 : n === 3 ? 200 : 290);
const optPx = (labels, w) => { const g = Math.max(...labels.map((l) => [...String(l)].length)); return Math.max(18, Math.min(32, Math.floor((w - 24) / (0.6 * g)))); };
function opts(labels, correct, glyphs) {
  const w = optW(labels.length), px = optPx(labels, glyphs ? w - 70 : w);
  return `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">` + labels.map((l, j) =>
    `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(l)}"${j === correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap;gap:10px">` +
    `${glyphs ? glyphs[j] : ''}${esc(l)}</span>`).join('') + `</div>`;
}
/** the tile glyph of the around-us sheet (outline circle / rectangle) at screen size */
function glyph(kind) {
  if (kind === 'circle') return flatShape({ kind: 'circle', R: 22, pad: 2, sw: 3 }).svg;
  return flatShape({ kind: 'rectangle', aspect: 1.7, R: 28, pad: 2, sw: 3 }).svg.replace(/\swidth="[^"]*" height="[^"]*"/, ' width="56" height="56"');
}
const pill = (label) => `<span style="display:inline-flex;align-items:center;height:56px;padding:0 26px;background:#146B5E;border-radius:999px;font-family:'Baloo 2',cursive;font-weight:700;font-size:34px;color:#fff">${esc(label)}</span>`;
const riddleText = (t) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:30px;line-height:1.35;color:${INK};max-width:600px">${esc(t)}</span>`;
const figAttrs = (svg) => `data-lcs-fig="${esc(JSON.stringify(outlineOf(svg)))}"`;

/** the names of the page (kind → printed literal), as the page stamped them on its root */
function pageNames(html) {
  const m = /data-lcs-names="([^"]*)"/.exec(html);
  if (!m) throw new Error('2d-shapes screen: no names stamp');
  return JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'));
}

/**
 * screenOrKey(mode, built, ctx, loc, block) — block = the locale's bank block (names + riddles).
 */
function screenOrKey(mode, built, ctx, loc, block) {
  const m = built.meta, html = built.bodyHtml;
  const out = { bodyHtml: html, meta: m };
  const names = { ...pageNames(html), ...(block.names || {}) };
  if (ctx.interactive) {
    let items = [];
    if (mode === 'base') {
      const figs = figuresOf(html);
      if (figs.length !== m.cards.length) throw new Error(`2d-shapes screen: ${figs.length} figures for ${m.cards.length} cards`);
      items = m.cards.map((c, i) => item(`data-lcs-word="${i + 1}" ${figAttrs(figs[i])}`, scaled(figs[i], 210), opts(c.tags.map((k) => names[k]), c.tags.indexOf(c.kind))));
    } else if (mode === 'write-name') {
      const figs = figuresOf(html);
      if (figs.length !== m.answers.length) throw new Error(`2d-shapes screen: ${figs.length} figures for ${m.answers.length} lanes`);
      // the box's four names, the order turned one step per shape (the right name never keeps one place)
      items = m.answers.map((k, i) => {
        const order = m.bank.map((_, j) => m.bank[(j + i) % m.bank.length]);
        return item(`data-lcs-word="${i + 1}" ${figAttrs(figs[i])}`, scaled(figs[i], 210), opts(order.map((x) => names[x]), order.indexOf(k)));
      });
    } else if (mode === 'riddles') {
      // each card's tags in PRINTED order, read off the printed card (the meta keeps only the answer slots)
      const cardTags = html.split('data-lcs-riddle="').slice(1).map((seg) => [...seg.matchAll(/data-lcs-tag="([a-z]+)"/g)].map((x) => x[1]));
      if (cardTags.length !== m.riddles.length) throw new Error(`2d-shapes screen: ${cardTags.length} riddle cards for ${m.riddles.length} riddles`);
      items = m.riddles.map((key, i) => {
        const [k, ri] = key.split(':');
        const text = block.riddles[k][+ri].text;
        const tags = cardTags[i];
        if (tags.indexOf(k) !== m.slots[i]) throw new Error(`2d-shapes screen: card ${i + 1} tags ${tags} disagree with slot ${m.slots[i]}`);
        return item(`data-lcs-word="${esc(text)}"`, riddleText(text), opts(tags.map((x) => names[x]), tags.indexOf(k)));
      });
    } else if (mode === 'around-us') {
      items = m.objects.map((obj, i) => {
        const [theme, noun] = [obj.slice(0, obj.lastIndexOf('/')), obj.slice(obj.lastIndexOf('/') + 1)];
        const pic = `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:220px;height:220px;object-fit:contain;flex:0 0 auto">`;
        const kinds = ['circle', 'rectangle'];
        return item(`data-lcs-word="${i + 1}" data-lcs-obj="${esc(obj)}"`, pic, opts(kinds.map((k) => names[k]), kinds.indexOf(m.answers[i]), kinds.map(glyph)));
      });
    } else if (mode === 'real-or-not') {
      const figs = figuresOf(html);
      let at = 0;
      const rows = m.rows.map((r, ri) => {
        const cells = r.truth.map((t, j) => {
          const svg = figs[at++];
          return `<span data-lcs-item data-lcs-word="${esc(names[r.target])}" data-lcs-target="${esc(r.target)}" ${figAttrs(svg)}${t ? ' data-lcs-hit="1"' : ''} data-ws-content style="display:flex;align-items:center;justify-content:center;width:150px;height:150px;box-sizing:border-box;background:#FFFDF8;border:3px solid #EFE4D2;border-radius:20px">${scaled(svg, 136)}</span>`;
        }).join('');
        return `<div data-lcs-screen-row="${ri + 1}" style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 4px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
          `${pill(names[r.target])}<div style="display:flex;gap:10px;justify-content:center">${cells}</div></div>`;
      });
      if (at !== figs.length) throw new Error(`2d-shapes screen: ${figs.length} figures for ${at} real-or-not cells`);
      items = rows;
    } else throw new Error(`2d-shapes screen: mode "${mode}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="2d-shapes" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }

  // the answer key
  const css = [];
  let h = html;
  const ring = (sel, r = '999px') => css.push(`${sel}{outline:4px solid ${CORAL};outline-offset:3px;border-radius:${r}}`);
  if (mode === 'base') m.cards.forEach((c, i) => ring(`[data-lcs-card="${i + 1}"] [data-lcs-tag="${c.kind}"]`));
  else if (mode === 'riddles') m.riddles.forEach((key, i) => ring(`[data-lcs-card="${i + 1}"] [data-lcs-tag="${key.split(':')[0]}"]`));
  else if (mode === 'around-us') m.answers.forEach((k, i) => ring(`[data-lcs-card="${i + 1}"] [data-lcs-tile="${k}"]`, '12px'));
  else if (mode === 'real-or-not') m.rows.forEach((r, ri) => r.truth.forEach((t, j) => { if (t) ring(`[data-lcs-stage] > [data-lcs-row]:nth-child(${ri + 1}) [data-lcs-lens-slot="${j + 1}"]`, '50%'); }));
  else if (mode === 'write-name') {
    // each lane holds exactly one writing row: seat the k-th answer on the k-th row of the page
    let from = 0;
    m.answers.forEach((k) => {
      const rel = h.slice(from).search(/<svg[^>]*data-lcs-prim="writing-row"/);
      if (rel < 0) throw new Error('2d-shapes key: fewer writing rows than lanes');
      const s = from + rel, e = h.indexOf('</svg>', s) + 6;
      const seated = seatOnRow(h.slice(s, e), names[k], { fill: CORAL, font: 'baloo2-700', em: 0.64 });
      h = h.slice(0, s) + seated + h.slice(e);
      from = s + seated.length;
    });
  } else throw new Error(`2d-shapes key: mode "${mode}" has no key`);
  out.bodyHtml = h + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/* ---------------------------------------------------------------- the robot's oracle */
const OBJECTS = () => require('../data/b5/2d-shapes.js').OBJECTS;
function oracle(mode, items, loc) {
  const B = loadBank('2d-shapes', loc);
  const kindOf = (label) => { const k = Object.keys(B.names).filter((x) => low(B.names[x], loc) === low(label, loc)); if (k.length !== 1) throw new Error(`2d-shapes oracle: "${label}" names ${k.length} kinds`); return k[0]; };
  const one = (L, want, what) => {
    const hits = L.map((l, i) => (kindOf(l) === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`2d-shapes oracle: ${what}: ${hits.length} options name ${want} (${L.join(', ')})`);
    return hits[0];
  };
  return items.map((it) => {
    const M = it.meta || {};
    if (mode === 'real-or-not') return classify(JSON.parse(M['data-lcs-fig'])) === M['data-lcs-target'];
    const L = it.options;
    if (mode === 'base' || mode === 'write-name') {
      const k = classify(JSON.parse(M['data-lcs-fig']));
      if (!B.names[k]) throw new Error(`2d-shapes oracle: the drawn figure classifies as "${k}"`);
      return one(L, k, `figure ${it.label}`);
    }
    if (mode === 'riddles') {
      const ks = Object.keys(B.riddles).filter((k) => B.riddles[k].some((r) => r.text === it.label));
      if (ks.length !== 1) throw new Error(`2d-shapes oracle: riddle "${it.label}" belongs to ${ks.length} kinds`);
      return one(L, ks[0], it.label);
    }
    if (mode === 'around-us') {
      const o = OBJECTS().find((x) => `${x.theme}/${x.noun}` === M['data-lcs-obj']);
      if (!o) throw new Error(`2d-shapes oracle: no object ${M['data-lcs-obj']}`);
      return one(L, o.shape, M['data-lcs-obj']);
    }
    throw new Error(`2d-shapes oracle: mode ${mode}`);
  });
}

/** the interactive spec of a face; dot-draw has none */
function interactiveFor(mode) {
  if (mode === 'dot-draw') return undefined;
  if (mode === 'real-or-not') {
    return {
      kind: 'tap-select', item: '[data-lcs-item]', answerAttr: 'data-lcs-hit', labelAttr: 'data-lcs-word',
      metaAttrs: ['data-lcs-fig', 'data-lcs-target'], instructionKey: mode, screenHeight: 3600,
      oracle: (items, l) => oracle(mode, items, (l || 'en').slice(0, 2)),
    };
  }
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: mode === 'around-us' ? ['data-lcs-obj'] : mode === 'riddles' ? [] : ['data-lcs-fig'], instructionKey: mode, screenHeight: 4200,
    oracle: (items, l) => oracle(mode, items, (l || 'en').slice(0, 2)),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor, classify, outlineOf, figuresOf };
