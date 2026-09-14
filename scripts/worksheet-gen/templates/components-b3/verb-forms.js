/**
 * components-b3/verb-forms.js — the G2-317 `verb-forms` family components
 * (design: docs/worksheet-gen/b3-designs/G2-317-verb-forms.md §2). Merged into
 * the templates/components-b3.js namespace; HTML + the token palette only, no
 * new primitive; ground truth rides on data-lcs-* attributes; a gap cell
 * NEVER prints its form.
 *
 * Exports (the NEW names the design file lists):
 *   verbTable({mode, header, colLabels, rows, w, rowH, boxW, boxH, pronounW,
 *              labelW, colW, iconPx, headerH, tint, verb, inf})
 *       mode 'persons': ONE verb, one row per pronoun. Outer `w` (330 / 675),
 *       border 2 teal r 14, white; header `headerH` (84) on tealSoft = the
 *       action picture `.ws-icon` `iconPx` (64/72; `header.src:null` = chip-only,
 *       Face 4) + the infinitive Baloo 2 700 24 teal; body rows grid
 *       `${pronounW}px 1fr` (96 / 120), gap 8, padding 0 8, row `rowH` (46/52);
 *       pronoun Nunito 800 18 ink; even rows tinted creamDeep inline.
 *       Table stamps data-lcs-table data-lcs-verb data-lcs-inf.
 *       mode 'tense': six verbs × two tenses. Outer 675; header row 44 = an
 *       empty label cell + `colLabels` (Baloo 2 700 20 teal); rows grid
 *       `${labelW}px ${colW}px ${colW}px` (199 / 220 / 220), gap 8, padding 0 8,
 *       row `rowH` (52); label cell = `.ws-icon` `iconPx` (44) + the infinitive
 *       Nunito 800 18. Each row stamps data-lcs-row data-lcs-verb data-lcs-inf.
 *       Both modes: the table is a flex column whose rows are `flex:1 0 rowH`
 *       — they hold rowH at the worst chrome and share any slack the spec's
 *       stack hands the table (the lanes take theirs first, up to laneMax).
 *       Cells (both modes): data-lcs-col data-lcs-cell="given|gap|anchor"
 *       data-lcs-form; a gap = `.ws-blankbox` boxW×boxH (206×36 / 400×36) +
 *       data-lcs-hard="1" and NO text; given / anchor = Nunito 800 20 ink, the
 *       form printed at padding-left 8.
 *   sentenceGap({src, text, gapW=170, gapH=38, hint, render='gap', chips=[],
 *                form, minH, attrs})
 *       a `.ws-lane` (page.css:401, padding 12 16 → inner 639) on grid
 *       `56px 1fr` gap 12: the verb's action picture (56; a 56 px spacer when
 *       src is null) and the paragraph Nunito 800 19 ink / 1.3. `text` carries
 *       `{form}` exactly once: render 'gap' → an inline `.ws-blankbox` gapW×gapH;
 *       render 'text' → the literal `form` printed in place (Face 6, the child
 *       underlines it); render 'choice' → a gap + a `pillChoice` row of `chips`
 *       (Face 5). `hint` (the infinitive) → a `.ws-nchip` h 30 Baloo 2 700 16
 *       teal `(run)` after the sentence. Stamps data-lcs-lane data-lcs-render
 *       + the caller's `attrs` (verb / col / form / frame).
 *       Phase 2 (faces; ADDITIVE, absent = today's markup byte-for-byte):
 *       `padding` (an inline override of the .ws-lane padding), `lineHeight`
 *       (1.3), `chipsGap` (6), `pillPx` / `pillH` / `pillPad` (Face 5 pills —
 *       pillH set → own fixed-height markup, else the shared pillChoice),
 *       `answerBox {w,h}` (Face 6: a right-aligned dashed box on line 2, stamped
 *       data-lcs-infbox), `idx` (stamped data-lcs-idx = the correct pill's
 *       position, Face 5). render 'choice' refuses < 2 chips or a duplicate chip.
 *   formMatch({left, right, order, itemH=56, itemW=250, w, attrs, padY=6,
 *              padX=30, leftW, rightW, leftH, rightH, fontPx=20, leftPad=14,
 *              iconPx})
 *       Face 2 (Phase 2): the lit-letter-knowledge match markup — a `.ws-match`
 *       with two `.ws-match-col`; left items {label, src?, spacer?, attrs?} (spacer
 *       = an iconPx blank where an unpictured label keeps the pictured rows'
 *       alignment) carry a right
 *       dot, right items {form, role:'target'|'distractor', attrs?} a left dot,
 *       rendered in `order` (a derangement the caller computed). The right
 *       column may hold 2n items (tense mode: past + present of each verb).
 *       Left stamps data-lcs-match-left="<label>", right
 *       data-lcs-match-right="<form>" data-lcs-role; every text span stamps
 *       data-lcs-match-text (the gate measures it against its item). Per-column
 *       width / height (leftW rightW leftH rightH) fall back to itemW / itemH;
 *       padY / padX are the .ws-match padding. Not exercised by the base page.
 *   matchBlock({header:{inf, src}|null, w=330, headerH=60, iconPx=44, verb,
 *               inf, match})
 *       Face 2: a bordered block (border 2 teal r 14, white, `w`) = an optional
 *       header strip (headerH on tealSoft: the action picture + the infinitive
 *       Baloo 2 700 22 teal; header:null = no strip, the tense face) + a
 *       formMatch body (`match` = its options). Stamps data-lcs-matchblock
 *       data-lcs-verb data-lcs-inf; the header's infinitive stamps data-lcs-inf.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { pillChoice } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;
const FORM_SLOT = /\{form\}/g;

function cellAttrs(c) {
  const a = [`data-lcs-col="${esc(c.col)}"`, `data-lcs-cell="${esc(c.state)}"`, `data-lcs-form="${esc(c.form)}"`];
  if (c.state === 'gap') a.push('data-lcs-hard="1"');
  return a.join(' ');
}

/** A form cell: a dashed box (gap) or the printed form (given / anchor). */
function formCell(c, { boxW, boxH, fontPx = 20 }) {
  if (c.state === 'gap') {
    return `<div ${cellAttrs(c)} style="display:flex;align-items:center;min-width:0">` +
      `<span class="ws-blankbox" style="width:${boxW}px;height:${boxH}px;flex:0 0 ${boxW}px"></span></div>`;
  }
  return `<div ${cellAttrs(c)} style="display:flex;align-items:center;min-width:0;padding-left:8px;` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;color:${T.ink};white-space:nowrap;overflow:visible">${esc(c.form)}</div>`;
}

function personsTable(o) {
  const { header, rows, w = 330, rowH = 46, boxW = 206, boxH = 36, pronounW = 96, iconPx = 64, headerH = 84, verb, inf } = o;
  const pic = header && header.src
    ? `<img class="ws-icon" src="${header.src}" alt="" data-lcs-pic="${esc(verb || header.inf)}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 ${iconPx}px">`
    : `<span data-lcs-nopic style="display:inline-block;width:${iconPx}px;height:${iconPx}px;flex:0 0 ${iconPx}px"></span>`;
  const head = `<div data-lcs-thead style="display:flex;align-items:center;gap:12px;height:${headerH}px;flex:0 0 ${headerH}px;padding:0 12px;background:${T.tealSoft};border-radius:12px 12px 0 0">` +
    pic + `<span data-lcs-inf style="font-family:${F.display},cursive;font-weight:700;font-size:24px;line-height:1.1;color:${T.teal};min-width:0">${esc(header.inf)}</span></div>`;
  const body = rows.map((r, i) => {
    const c = r.cells[0];
    return `<div data-lcs-prow="${esc(r.key)}" style="display:grid;grid-template-columns:${pronounW}px 1fr;column-gap:8px;align-items:center;flex:1 0 ${rowH}px;min-height:${rowH}px;padding:0 8px;` +
      `background:${i % 2 === 1 ? T.creamDeep : T.white}${i === rows.length - 1 ? ';border-radius:0 0 12px 12px' : ''}">` +
      `<span data-lcs-pronoun="${esc(r.key)}" style="font-family:${F.body},sans-serif;font-weight:800;font-size:18px;color:${T.ink};white-space:nowrap;min-width:0">${esc(r.label)}</span>` +
      formCell(c, { boxW, boxH }) + `</div>`;
  }).join('');
  return `<div data-lcs-table data-lcs-mode="persons" data-lcs-verb="${esc(verb || header.inf)}" data-lcs-inf="${esc(inf || header.inf)}" data-ws-content ` +
    `style="width:${w}px;flex:0 0 ${w}px;display:flex;flex-direction:column;background:${T.white};border:2px solid ${T.teal};border-radius:14px;overflow:hidden">${head}${body}</div>`;
}

function tenseTable(o) {
  const { colLabels, rows, w = 675, rowH = 52, boxW = 206, boxH = 36, labelW = 199, colW = 220, iconPx = 44, headerH = 44 } = o;
  const grid = `${labelW}px ${colW}px ${colW}px`;
  const head = `<div data-lcs-thead style="display:grid;grid-template-columns:${grid};column-gap:8px;align-items:center;height:${headerH}px;flex:0 0 ${headerH}px;padding:0 8px;background:${T.tealSoft};border-radius:12px 12px 0 0">` +
    `<span></span>` + colLabels.map((l) => `<span data-lcs-collabel="${esc(l.key)}" style="font-family:${F.display},cursive;font-weight:700;font-size:20px;line-height:1.1;color:${T.teal};white-space:nowrap;min-width:0;padding-left:8px">${esc(l.label)}</span>`).join('') + `</div>`;
  const body = rows.map((r, i) => {
    const pic = r.src
      ? `<img class="ws-icon" src="${r.src}" alt="" data-lcs-pic="${esc(r.key)}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 ${iconPx}px">`
      : `<span data-lcs-nopic style="display:inline-block;width:${iconPx}px;height:${iconPx}px;flex:0 0 ${iconPx}px"></span>`;
    return `<div data-lcs-row data-lcs-verb="${esc(r.key)}" data-lcs-inf="${esc(r.label)}" style="display:grid;grid-template-columns:${grid};column-gap:8px;align-items:center;flex:1 0 ${rowH}px;min-height:${rowH}px;padding:0 8px;` +
      `background:${i % 2 === 1 ? T.creamDeep : T.white}${i === rows.length - 1 ? ';border-radius:0 0 12px 12px' : ''}">` +
      `<span style="display:flex;align-items:center;gap:8px;min-width:0">${pic}<span data-lcs-inf style="font-family:${F.body},sans-serif;font-weight:800;font-size:18px;color:${T.ink};white-space:nowrap;min-width:0">${esc(r.label)}</span></span>` +
      r.cells.map((c) => formCell(c, { boxW, boxH })).join('') + `</div>`;
  }).join('');
  return `<div data-lcs-table data-lcs-mode="tense" data-ws-content style="width:${w}px;flex:1 1 auto;display:flex;flex-direction:column;background:${T.white};border:2px solid ${T.teal};border-radius:14px;overflow:hidden">${head}${body}</div>`;
}

function verbTable(o) {
  if (!o || !Array.isArray(o.rows) || !o.rows.length) throw new Error('verbTable: rows are required');
  for (const r of o.rows) for (const c of r.cells || []) {
    if (!['given', 'gap', 'anchor'].includes(c.state)) throw new Error(`verbTable: cell state "${c.state}"`);
    if (typeof c.form !== 'string' || !c.form) throw new Error(`verbTable: cell ${r.key}/${c.col} has no form`);
  }
  if (o.mode === 'tense') { if (!Array.isArray(o.colLabels) || o.colLabels.length !== 2) throw new Error('verbTable: tense mode needs two colLabels'); return tenseTable(o); }
  if (o.mode === 'persons') { if (!o.header || !o.header.inf) throw new Error('verbTable: persons mode needs header.inf'); return personsTable(o); }
  throw new Error(`verbTable: mode "${o.mode}"`);
}

function sentenceGap({ src, text, gapW = 170, gapH = 38, hint, render = 'gap', chips = [], form, minH, attrs = '', padding, lineHeight = 1.3, chipsGap = 6, pillPx = 20, pillH, pillPad = 18, answerBox, idx }) {
  const n = (String(text).match(FORM_SLOT) || []).length;
  if (n !== 1) throw new Error(`sentenceGap: text must carry {form} exactly once ("${text}")`);
  if (!['gap', 'text', 'choice'].includes(render)) throw new Error(`sentenceGap: render "${render}"`);
  if (render === 'text' && !form) throw new Error('sentenceGap: render "text" needs the form');
  if (render === 'choice' && (!Array.isArray(chips) || chips.length < 2)) throw new Error('sentenceGap: render "choice" needs >= 2 chips');
  if (render === 'choice' && new Set(chips.map((c) => String(c).trim().toLocaleLowerCase())).size !== chips.length) throw new Error('sentenceGap: duplicate chips');
  const slot = render === 'text'
    ? `<span data-lcs-printed-form>${esc(form)}</span>`
    : `<span class="ws-blankbox" data-lcs-gapbox style="width:${gapW}px;height:${gapH}px;vertical-align:middle;margin:0 4px"></span>`;
  const parts = String(text).split('{form}').map(esc);
  const sentence = parts[0] + slot + parts[1];
  const chip = hint ? ` <span class="ws-nchip" data-lcs-hint style="height:30px;padding:0 10px;font-size:16px;line-height:1;margin-left:8px;vertical-align:middle;white-space:nowrap">(${esc(hint)})</span>` : '';
  const pic = src
    ? `<img class="ws-icon" src="${src}" alt="" data-lcs-lanepic style="width:56px;height:56px;flex:0 0 56px">`
    : `<span data-lcs-nopic style="display:inline-block;width:56px;height:56px"></span>`;
  // Face 5 pills: pillH set → own fixed-height markup (the row budget is measured against it); absent → the shared pillChoice (b2)
  const pills = render === 'choice' && chips.length
    ? (pillH
      ? `<div data-lcs-chips style="margin-top:${chipsGap}px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap">` +
        chips.map((c) => `<span class="ws-pill" data-lcs-pill="${esc(c)}" style="font-size:${pillPx}px;height:${pillH}px;padding:0 ${pillPad}px;line-height:1;white-space:nowrap">${esc(c)}</span>`).join('') + `</div>`
      : `<div data-lcs-chips style="margin-top:${chipsGap}px">${pillChoice({ items: chips.map((c) => ({ key: c, label: c })), fontPx: pillPx })}</div>`)
    : '';
  // Face 6: a right-aligned dashed box on line 2 (the child writes the base form)
  const answer = render === 'text' && answerBox
    ? `<div data-lcs-answer style="display:flex;justify-content:flex-end;margin-top:${chipsGap}px"><span class="ws-blankbox" data-lcs-infbox style="width:${answerBox.w}px;height:${answerBox.h}px"></span></div>`
    : '';
  const idxAttr = idx != null ? ` data-lcs-idx="${idx}"` : '';
  return `<div class="ws-lane" data-lcs-lane data-lcs-render="${render}"${idxAttr} ${attrs} style="display:grid;grid-template-columns:56px 1fr;column-gap:12px;align-items:center;min-width:0${minH ? ';min-height:' + minH + 'px' : ''}${padding ? ';padding:' + padding : ''}">` +
    pic + `<div style="min-width:0"><p data-lcs-sentence style="margin:0;font-family:${F.body},sans-serif;font-weight:800;font-size:19px;line-height:${lineHeight};color:${T.ink}">${sentence}${chip}</p>${pills}${answer}</div></div>`;
}

function formMatch({ left, right, order, itemH = 56, itemW = 250, w, attrs = '', padY = 6, padX = 30, leftW, rightW, leftH, rightH, fontPx = 20, leftPad = 14, iconPx }) {
  if (!Array.isArray(left) || !left.length || !Array.isArray(right) || !right.length) throw new Error('formMatch: left and right are required');
  const ord = Array.isArray(order) ? order : right.map((_, i) => i);
  if (ord.length !== right.length || new Set(ord).size !== ord.length) throw new Error('formMatch: order must be a permutation of the right items');
  const lw = leftW || itemW, rw = rightW || itemW, lh = leftH || itemH, rh = rightH || itemH;
  const ip = iconPx || Math.min(44, lh - 12);
  const L = left.map((it) =>
    `<div class="ws-match-item" data-lcs-match-left="${esc(it.label)}" ${it.attrs || ''} style="width:${lw}px;height:${lh}px;gap:10px;justify-content:flex-start;padding:0 ${leftPad}px">` +
    (it.src ? `<img class="ws-icon" src="${it.src}" alt="" style="width:${ip}px;height:${ip}px;flex:0 0 ${ip}px">` : it.spacer ? `<span data-lcs-nopic style="display:inline-block;width:${ip}px;height:${ip}px;flex:0 0 ${ip}px"></span>` : '') +
    `<span data-lcs-match-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;color:${T.ink};white-space:nowrap;min-width:0">${esc(it.label)}</span>` +
    `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
  const R = ord.map((i) => right[i]).map((it) =>
    `<div class="ws-match-item ws-match-item--plain" data-lcs-match-right="${esc(it.form)}" data-lcs-role="${esc(it.role || 'target')}" ${it.attrs || ''} style="width:${rw}px;height:${rh}px">` +
    `<span class="ws-match-dot ws-match-dot--left"></span>` +
    `<span data-lcs-match-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;color:${T.ink};white-space:nowrap;min-width:0">${esc(it.form)}</span></div>`).join('');
  return `<div class="ws-match" data-lcs-match data-ws-content ${attrs} style="padding:${padY}px ${padX}px${w ? ';width:' + w + 'px' : ''}"><div class="ws-match-col">${L}</div><div class="ws-match-col">${R}</div></div>`;
}

function matchBlock({ header, w = 330, headerH = 60, iconPx = 44, verb, inf, match }) {
  if (!match) throw new Error('matchBlock: match options are required');
  const head = header
    ? `<div data-lcs-thead style="display:flex;align-items:center;gap:12px;height:${headerH}px;flex:0 0 ${headerH}px;padding:0 12px;background:${T.tealSoft};border-radius:12px 12px 0 0">` +
      (header.src
        ? `<img class="ws-icon" src="${header.src}" alt="" data-lcs-pic="${esc(verb || header.inf)}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 ${iconPx}px">`
        : `<span data-lcs-nopic style="display:inline-block;width:${iconPx}px;height:${iconPx}px;flex:0 0 ${iconPx}px"></span>`) +
      `<span data-lcs-inf style="font-family:${F.display},cursive;font-weight:700;font-size:22px;line-height:1.1;color:${T.teal};min-width:0">${esc(header.inf)}</span></div>`
    : '';
  const v = verb || (header && header.inf) || '';
  return `<div data-lcs-matchblock data-lcs-verb="${esc(v)}" data-lcs-inf="${esc(inf || v)}" style="width:${w}px;flex:1 1 ${w}px;min-width:0;display:flex;flex-direction:column;background:${T.white};border:2px solid ${T.teal};border-radius:14px;overflow:hidden">${head}${formMatch(match)}</div>`;
}

module.exports = { verbTable, sentenceGap, formMatch, matchBlock };
