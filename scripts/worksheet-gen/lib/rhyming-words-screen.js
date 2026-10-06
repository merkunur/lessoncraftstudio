/**
 * rhyming-words-screen.js — Level Set 2026-09-30 (Rhyming Words, PDF + interactive): the screen version (tap-choice)
 * and the answer key for G1-309 and its faces, built from the printed page's own meta (the SAME instance: fresh rng,
 * same seed — render-instance asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every
 * answer from the merged bank (class membership), never from the page's marks.
 *
 *   base    (G1-309)  the first picture → tap the picture that rhymes with it (the row's own rings, same order)
 *   judge   (K-352)   two pictures → tap the tick (they rhyme) or the cross
 *   sort    (G1-343)  one bank picture → tap the big picture it rhymes with (level 3: or the cross — it fits none)
 *   couplet (G1-344)  the verse with a gap → tap the word that rhymes and finishes it
 *   string  (G1-345)  one bank word → tap the picture it rhymes with, or the cross (a word that fits nowhere)
 * G1-346 (write your own rhymes) is printable only: open answers have no single right tap.
 */
'use strict';
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const TEAL = '#146B5E';
const { seatOnRow } = require('./key-on-row.js');
const { fileUri } = require('./b2-common.js');
const { rhymeMark } = require('../templates/components-b3/rhyming-words.js');

const INSTRUCTION = { base: 'pick', judge: 'judge', sort: 'sort', couplet: 'verse', string: 'string' };
const SCR_W = 660;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** vocabKey → { m, cls } over the bank's members (cls = the owning class) and near-miss foils (cls = owner or null). */
function lookup(bank) {
  const map = new Map();
  for (const c of bank.classes) for (const m of c.members) map.set(m.vocabKey, { m, cls: c.id });
  for (const c of bank.classes) for (const m of c.nearMiss || []) if (!map.has(m.vocabKey)) map.set(m.vocabKey, { m, cls: null });
  return map;
}
const srcOf = (L, key) => { const x = L.get(key); if (!x) throw new Error(`rhyming screen: "${key}" is not in the bank`); return fileUri(x.m.pic.theme, x.m.pic.noun); };

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
const opts = (html) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${html}</div>`;
const img = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">`;
const mark = () => `<span style="display:inline-flex">${rhymeMark({ px: 30 })}</span>`;
/** a picture option: the picture alone (no word — the child names it) */
function picOpt(i, label, src, correct, w = 146) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${w}px;box-sizing:border-box;padding:8px">${img(src, w - 30)}</span>`;
}
function wordOpt(i, label, correct, w = 200) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:104px;box-sizing:border-box;font-size:30px">${esc(label)}</span>`;
}
const SVG = (d) => `<svg width="64" height="64" viewBox="0 0 52 52" aria-hidden="true"><path d="${d}" fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const TICK = SVG('M14 27 l9 9 l17 -18');
const CROSS = SVG('M16 16 l20 20 M36 16 l-20 20');
function markOpt(i, label, svg, correct, w = 146) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${w}px;box-sizing:border-box">${svg}</span>`;
}
const word = (w, px = 44) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:#3A3530">${esc(w)}</span>`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;
const verseLine = (html) => `<div style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1.35;color:#3A3530">${html}</div>`;

/** Three word options for verse i: its answer + two words of `pool` from other classes, the right one at i % 3. */
function verseOptions(ans, ansCls, pool, i) {
  const others = pool.filter((p) => p.cls !== ansCls && p.word !== ans);
  const o = [others[i % others.length], others[(i + 1) % others.length]].filter(Boolean);
  if (o.length < 2 || o[0].word === o[1].word) throw new Error(`rhyming screen: too few other words for verse ${i + 1}`);
  const at = slotFor(ans + '|' + i, 3);   // never i % 3 (a diagonal tell, 2026-10-06)
  const list = o.map((x) => x.word);
  list.splice(at, 0, ans);
  return { list, at };
}

/** Seat `text` on the `nth` (0-based) writing row after `needle`, removing a printed starter glyph on that row first. */
function seatNth(html, needle, nth, text) {
  const at = html.indexOf(needle);
  if (at < 0) throw new Error(`rhyming key: no element "${needle.slice(0, 70)}"`);
  let from = at;
  let s = -1;
  for (let k = 0; k <= nth; k++) {
    const rel = html.slice(from).search(/<svg[^>]*data-lcs-prim="writing-row"/);
    if (rel < 0) throw new Error(`rhyming key: no writing row ${nth + 1} after "${needle.slice(0, 70)}"`);
    s = from + rel;
    from = s + 4;
  }
  const e = html.indexOf('</svg>', s) + 6;
  const row = html.slice(s, e).replace(/<text\b[^>]*data-lcs-starter[^>]*>[^<]*<\/text>/g, '');
  return html.slice(0, s) + seatOnRow(row, text, { fill: CORAL, font: 'baloo2-700', em: 0.62 }) + html.slice(e);
}

/**
 * @param mode  'base' | 'judge' | 'sort' | 'couplet' | 'string'
 * @param built the printed page's { bodyHtml, meta }
 * @param bank  the merged bank the page was built from
 */
function screenOrKey(mode, built, ctx, loc, bank) {
  const m = built.meta;
  const L = lookup(bank);
  const out = { bodyHtml: built.bodyHtml, meta: m };
  // Rhyme Strings level 3 prints the class's native extra words too (no picture): key `x:<class>:<word>`
  const wordOf = (key) => { if (String(key).startsWith('x:')) return String(key).split(':').slice(2).join(':'); const x = L.get(key); if (!x) throw new Error(`rhyming screen: no word for "${key}"`); return x.m.word; };
  if (ctx.interactive) {
    let items = [];
    if (mode === 'base') {
      items = m.rows.map((r) => {
        const ds = r.distractors.slice();
        const keys = [];
        const nOpt = r.distractors.length + 1;   // fixed BEFORE the loop: ds shrinks as it is consumed
        for (let k = 0; k < nOpt; k++) keys.push(k === r.pos ? r.partner : ds.shift().key);
        return item(`data-lcs-given="${esc(r.anchor)}"`, `${img(srcOf(L, r.anchor), 150)}${mark()}`,
          opts(keys.map((k, j) => picOpt(j, k, srcOf(L, k), j === r.pos)).join('')));
      });
    } else if (mode === 'judge') {
      items = m.cards.map((c) => item(`data-lcs-given="${esc(c.a)}" data-lcs-given-b="${esc(c.b)}"`, `${img(srcOf(L, c.a), 140)}${mark()}${img(srcOf(L, c.b), 140)}`,
        opts(markOpt(0, 'yes', TICK, c.rhyme) + markOpt(1, 'no', CROSS, !c.rhyme))));
    } else if (mode === 'sort') {
      const heads = m.bins.map((b) => b.head);
      const none = Array.isArray(m.extras) && m.extras.length;
      items = m.bank.map((key) => {
        const bi = m.bins.findIndex((b) => b.members.includes(key));
        const ow = heads.length + (none ? 1 : 0) > 4 ? 110 : 146;
        const html = heads.map((h, j) => picOpt(j, h, srcOf(L, h), j === bi, ow)).join('') + (none ? markOpt(heads.length, 'none', CROSS, bi < 0, ow) : '');
        return item(`data-lcs-given="${esc(key)}"`, img(srcOf(L, key), 150), opts(html));
      });
    } else if (mode === 'couplet') {
      const byId = new Map((bank.couplets || []).map((c) => [c.id, c]));
      const rowsInfo = m.couplets.map((id, i) => {
        const cp = byId.get(id);
        if (!cp) throw new Error(`rhyming screen: no couplet "${id}"`);
        const key = cp.answer.vocabKey;
        return { id, cp, key, word: m.answers[i], cls: (L.get(key) || {}).cls };
      });
      const clsOfWord = (w) => { for (const [, x] of L) if (x.m.word === w) return x.cls; return null; };
      const pool = (m.box || m.answers).map((w) => ({ word: w, cls: clsOfWord(w) }));
      const cueFree = Array.isArray(m.box);
      items = rowsInfo.map((r, i) => {
        const [pre, post] = String(r.cp.lines[1]).split('___');
        let list, at;
        if (Array.isArray(m.choices)) { list = m.choices[i]; at = list.indexOf(r.word); } else ({ list, at } = verseOptions(r.word, r.cls, pool, i));
        const top = (cueFree ? '' : img(srcOf(L, r.key), 110)) + `<div>${verseLine(esc(r.cp.lines[0]))}${verseLine(`${esc(pre)}${GAP}${esc(post || '')}`)}</div>`;
        return item(`data-lcs-couplet-id="${esc(r.id)}" data-lcs-given="${esc(r.id)}"`, top, opts(list.map((w, j) => wordOpt(j, w, j === at)).join('')));
      });
    } else if (mode === 'string') {
      const anchors = m.anchors.map((a) => a.anchor);
      const none = m.foils.length > 0;
      const wordToKey = new Map();
      for (const a of m.anchors) for (const k of a.answers) wordToKey.set(wordOf(k), k);
      for (const k of m.foils) wordToKey.set(wordOf(k), k);
      items = m.bank.map((w) => {
        const key = wordToKey.get(w);
        const ai = m.anchors.findIndex((a) => a.answers.includes(key));
        const ow = anchors.length + (none ? 1 : 0) > 4 ? 110 : 146;
        const html = anchors.map((k, j) => picOpt(j, k, srcOf(L, k), j === ai, ow)).join('') + (none ? markOpt(anchors.length, 'none', CROSS, ai < 0, ow) : '');
        return item(`data-lcs-given="${esc(w)}"`, word(w, 48), opts(html));
      });
    } else throw new Error(`rhyming screen: mode "${mode}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="rhyming-words" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // answer key: the printed page with every answer shown in coral — a written word is SEATED on its own writing row
  // (key-on-row.js: on the base rule, x-height to the dashed midline), never placed with a guessed CSS offset
  const css = [];
  let html = out.bodyHtml;
  if (mode === 'base') {
    css.push(`[data-lcs-rhyme="1"]{outline:4px solid ${CORAL};outline-offset:2px}`);
    m.rows.forEach((r) => { html = seatNth(html, `data-lcs-anchor="${esc(r.anchor)}" data-lcs-class=`, 0, wordOf(r.partner)); });
  } else if (mode === 'judge') {
    css.push(`[data-lcs-rhyme="1"] [data-lcs-chip="yes"],[data-lcs-rhyme="0"] [data-lcs-chip="no"]{outline:4px solid ${CORAL};outline-offset:3px}`);
  } else if (mode === 'sort') {
    m.bins.forEach((b, i) => b.members.forEach((k, n) => { html = seatNth(html, `data-lcs-bin="${i + 1}"`, n, wordOf(k)); }));
    if (Array.isArray(m.extras) && m.extras.length) {
      const g = (deg) => `linear-gradient(${deg}deg,transparent 45%,${CORAL} 45%,${CORAL} 55%,transparent 55%)`;
      css.push(`[data-lcs-extra]::after{content:"";position:absolute;left:8px;top:8px;right:0;bottom:0;background:${g(45)},${g(-45)}}`);
    }
  } else if (mode === 'couplet') {
    // seat row by row: each couplet's own row (found by its answer stamp, unique on the page)
    const byId = new Map((bank.couplets || []).map((c) => [c.id, c]));
    m.couplets.forEach((id, i) => { const key = byId.get(id).answer.vocabKey; html = seatNth(html, `data-lcs-answer="${esc(key)}"`, 0, m.answers[i]); });
    if (Array.isArray(m.choices)) css.push(`[data-lcs-correct-choice]{outline:4px solid ${CORAL};outline-offset:2px}`);
    if (Array.isArray(m.box)) css.push(`[data-lcs-role="foil"]{text-decoration:line-through;text-decoration-color:${CORAL};text-decoration-thickness:3px}`);
  } else if (mode === 'string') {
    m.anchors.forEach((a) => a.answers.forEach((k, n) => { html = seatNth(html, `data-lcs-string="1" data-lcs-anchor="${esc(a.anchor)}"`, n, wordOf(k)); }));
    if (m.foils.length) css.push(`[data-lcs-role="foil"]{text-decoration:line-through;text-decoration-color:${CORAL};text-decoration-thickness:3px}`);
  } else throw new Error(`rhyming key: mode "${mode}" has no key`);
  out.bodyHtml = html + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/** The robot's truth per screen item, from the MERGED BANK only (class membership, the couplet's answer). */
function oracle(mode, items, loc, bank) {
  const L = lookup(bank);
  const lc = (x) => String(x).normalize('NFC').toLocaleLowerCase(loc);
  const clsOf = (key) => (L.get(key) || {}).cls || null;
  const byWord = new Map();
  for (const c of bank.classes) for (const m of c.members) byWord.set(lc(m.word), c.id);
  // extra (unpictured) rhyme words a Rhyme Strings bank may print; a word already owned by a member keeps that class
  for (const c of bank.classes) for (const w of c.extra || []) if (!byWord.has(lc(w))) byWord.set(lc(w), c.id);
  const couplets = new Map((bank.couplets || []).map((c) => [c.id, c]));
  return items.map((it) => {
    const labels = (it.options || []).map((o) => (o && typeof o === 'object' ? o.label : o));
    const given = it.meta['data-lcs-given'];
    let want;
    if (mode === 'judge') {
      const a = clsOf(given), b = clsOf(it.meta['data-lcs-given-b']);
      want = a && a === b ? 'yes' : 'no';
    } else if (mode === 'couplet') {
      const cp = couplets.get(it.meta['data-lcs-couplet-id']);
      if (!cp) throw new Error(`oracle: no couplet "${it.meta['data-lcs-couplet-id']}"`);
      const x = L.get(cp.answer.vocabKey);
      if (!x) throw new Error(`oracle: couplet answer "${cp.answer.vocabKey}" is not a bank member`);
      const hits = labels.filter((l) => lc(l) === lc(x.m.word));
      if (hits.length !== 1) throw new Error(`oracle: "${x.m.word}" offered ${hits.length} times`);
      // no OTHER option may rhyme with the verse (a second right answer)
      const other = labels.filter((l) => lc(l) !== lc(x.m.word) && byWord.get(lc(l)) === x.cls);
      if (other.length) throw new Error(`oracle: "${other[0]}" also rhymes with the verse`);
      want = x.m.word;
    } else {
      const cls = mode === 'string' ? byWord.get(lc(given)) : clsOf(given);
      if (!cls) throw new Error(`oracle: "${given}" has no rhyme class`);
      const hits = labels.filter((l) => l !== 'none' && l !== given && clsOf(l) === cls);
      if (hits.length > 1) throw new Error(`oracle: ${hits.length} options rhyme with "${given}" (${mode})`);
      want = hits.length ? hits[0] : 'none';
    }
    const idx = labels.findIndex((l) => lc(l) === lc(want));
    if (idx < 0) throw new Error(`oracle: "${want}" not among ${labels.join('/')} (${mode})`);
    return idx;
  });
}

module.exports = { screenOrKey, oracle, INSTRUCTION };
