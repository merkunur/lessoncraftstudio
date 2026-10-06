/**
 * question-words-screen.js — Level Set 2026-09-29 (Question Words, PDF + interactive): the screen version (tap-choice)
 * and the answer key for G1-353 and four of its faces, built from the PRINTED page (the same instance: render-instance
 * rebuilds with a fresh rng and asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every
 * answer from the bank's sentence FRAMES (each template turned into a pattern: the sentence is parsed back into its
 * frame and its words) — never from the page's stamps.
 *
 *   base   the sentence with its highlight → tap the question word that asks for it (the page's chips)
 *   match  a question → tap its answer (short answers; the harder level: whole answer sentences, a name on two rows)
 *   fill   the question with its gap + the answer with its highlight → tap the missing question word
 *   sort   a word tile → tap the question it answers (the bins)
 *   write  the sentence with ONE highlight → tap the question that asks for it (the harder level: one item per highlight)
 * The ask page (G2-357) is open-ended: printable only, no key.
 */
'use strict';
const { slotFor, seededShuffle, pageSalt } = require('./answer-slots.js');
let PAGE_SALT = '';

const CORAL = '#F2784B';
const { seatOnRow } = require('./key-on-row.js');
const SCR_W = 660, OPT_H = 104;   // the Level Set screen sizes: 104 page-px reaches the 44 px tap floor at 360 wide
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const MARK = (t) => `<span style="background:#FCE3D6;border-bottom:3px solid ${CORAL};border-radius:4px;padding:0 4px">${esc(t)}</span>`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center">${top}</div>${body}</div>`;
}
function opt(i, label, correct, w, px) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;min-height:${OPT_H}px;height:auto;box-sizing:border-box;font-size:${px}px;padding:6px 12px;text-align:center;line-height:1.2;white-space:normal">${esc(label)}</span>`;
}
const opts = (html) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${html}</div>`;
const line = (html, px = 30) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;line-height:1.35;color:#3A3530">${html}</span>`;
const word = (w, px = 42) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:#3A3530">${esc(w)}</span>`;
/** n options on one row (short labels) or one per row (sentences: 600 wide) */
const optW = (n) => Math.min(200, Math.floor((SCR_W - 24 - (n - 1) * 12) / n));

/** Every element carrying `attr` in the printed body, with its attributes (the screen reads the page it wraps). */
function elements(html, attr) {
  const out = [];
  const re = new RegExp(`<(\\w+)\\s[^>]*\\b${attr}(?=[\\s=>])(?:="[^"]*")?[^>]*>`, 'g');
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0], at = {};
    tag.replace(/([\w-]+)="([^"]*)"/g, (_, k, v) => { at[k] = unesc(v); return ''; });
    tag.replace(/([\w-]+)='([^']*)'/g, (_, k, v) => { at[k] = unesc(v); return ''; });
    out.push({ tag, at, index: m.index });
  }
  return out;
}
/** The text + the marked spans of the first `<p data-lcs-sentence>` after `from`. */
function sentenceAt(html, from) {
  const i = html.indexOf('data-lcs-sentence', from);
  const s = html.indexOf('>', i) + 1, e = html.indexOf('</p>', s);
  const inner = html.slice(s, e);
  const marks = [...inner.matchAll(/<span data-lcs-mark[^>]*>([^<]*)<\/span>/g)].map((m) => unesc(m[1]));
  return { text: unesc(inner.replace(/<[^>]*>/g, '')).trim(), marks };
}
/** The sentence with ONE of its marks shown (the screen shows a single highlight). */
function markedHtml(text, mark) {
  const i = text.indexOf(mark);
  if (i < 0) throw new Error(`question-words screen: "${mark}" is not in "${text}"`);
  return esc(text.slice(0, i)) + MARK(mark) + esc(text.slice(i + mark.length));
}
/** The i-th option set of a page: the correct label at position i % n among the others (no fixed-position tell). */
function rotate(correct, others, i, n = 3) {
  const pool = others.filter((x) => x !== correct).slice(0, n - 1);
  if (pool.length < n - 1) throw new Error(`question-words screen: ${pool.length + 1} options for "${correct}" (want ${n})`);
  const at = slotFor(PAGE_SALT + correct + '|' + i, n);   // never i % n (a diagonal tell, 2026-10-06)
  return [...pool.slice(0, at), correct, ...pool.slice(at)];
}

function screenOrKey(mode, built, ctx, loc, bank) {
  PAGE_SALT = pageSalt(built);   // every slot hash of this page joins its fingerprint (2026-10-06)
  const html = built.bodyHtml;
  const out = { bodyHtml: html, meta: built.meta };
  const qw = bank.qwords;
  const pre = bank.qPrefix || '';
  const whole = /data-lcs-whole="1"/.test(html);
  const two = /data-lcs-two="1"/.test(html);
  if (ctx.interactive) {
    let items = [];
    if (mode === 'base') {
      const lanes = elements(html, 'data-lcs-row');
      const chips = elements(html, 'data-lcs-chip').slice(0, (/data-lcs-kinds="([^"]*)"/.exec(html) || [])[1].split(',').length).map((c) => c.at['data-lcs-label']);
      items = lanes.map((ln, i) => {
        const s = sentenceAt(html, ln.index);
        const want = qw[ln.at['data-lcs-ask']];
        return item(`data-lcs-sentence="${esc(s.text)}" data-lcs-mark="${esc(s.marks[0])}"`, line(markedHtml(s.text, s.marks[0])),
          opts(chips.map((c, j) => opt(j, c, c === want, optW(chips.length), 30)).join('')));
      });
    } else if (mode === 'match') {
      const qs = elements(html, 'data-lcs-q'), as = elements(html, 'data-lcs-a');
      const lit = (j) => as.find((a) => +a.at['data-lcs-a'] === j).at['data-lcs-literal'];
      items = qs.map((q, i) => {
        const qText = unesc(html.slice(html.indexOf('>', html.indexOf('data-lcs-match-text', q.index)) + 1, html.indexOf('</span>', html.indexOf('data-lcs-match-text', q.index))));
        const correct = lit(i);
        // the harder level: the TWIN sentence (the same name) is always among the distractors
        const others = qs.map((_, j) => j).filter((j) => j !== i);
        if (whole) others.sort((a, b) => (qs[b].at['data-lcs-name'] === q.at['data-lcs-name']) - (qs[a].at['data-lcs-name'] === q.at['data-lcs-name']));
        // the distractors are any two OTHER questions of the page, drawn per card (2026-10-06: "the next two in page order"
        // made the right one always the earliest of the three in the page's cycle)
        else others.splice(0, others.length, ...seededShuffle(others, qs.map((_, j) => lit(j)).join('|') + '|' + i));
        const labels = rotate(correct, others.map(lit), i);
        return item(`data-lcs-question="${esc(qText)}"`, line(esc(qText), 32),
          opts(labels.map((l, j) => opt(j, l, l === correct, whole ? 600 : optW(3), whole ? 26 : 28)).join('')));
      });
    } else if (mode === 'fill') {
      const lanes = elements(html, 'data-lcs-question');
      const rowsAt = elements(html, 'data-lcs-row');
      const bankWords = elements(html, 'data-lcs-bank-word').map((w) => w.at['data-lcs-bank-word']);
      const kinds = (/data-lcs-kinds="([^"]*)"/.exec(html) || [])[1].split(',');
      const labels = bankWords.length ? bankWords : kinds.map((k) => qw[k]);
      items = rowsAt.map((ln, i) => {
        const qi = html.indexOf('data-lcs-question', ln.index);
        const qInner = html.slice(html.indexOf('>', qi) + 1, html.indexOf('</p>', qi));
        const before = unesc(qInner.slice(0, qInner.indexOf('<span class="ws-blankbox"')).replace(/<[^>]*>/g, ''));
        const after = unesc(qInner.slice(qInner.indexOf('</span>', qInner.indexOf('ws-blankbox')) + 7).replace(/<[^>]*>/g, '')).trim();
        const s = sentenceAt(html, ln.index);
        const want = ln.at['data-lcs-answer'];
        return item(`data-lcs-sentence="${esc(s.text)}" data-lcs-mark="${esc(s.marks[0])}" data-lcs-rest="${esc(after)}"`,
          line(esc(before) + GAP + esc(after), 30) + line(markedHtml(s.text, s.marks[0]), 24),
          opts(labels.map((c, j) => opt(j, c, c === want, optW(labels.length), labels.length > 4 ? 22 : 28)).join('')));
      });
      void lanes;
    } else if (mode === 'sort') {
      const tiles = elements(html, 'data-lcs-sortword');
      const heads = elements(html, 'data-lcs-sorthead').map((h) => unesc(html.slice(html.indexOf('>', h.index) + 1, html.indexOf('</span>', h.index))));
      items = tiles.map((t) => {
        const k = +t.at['data-lcs-key'];
        return item(`data-lcs-tile="${esc(t.at['data-lcs-sortword'])}"`, word(t.at['data-lcs-sortword'], 44),
          opts(heads.map((h, j) => opt(j, h, j === k, optW(heads.length), 30)).join('')));
      });
    } else if (mode === 'write') {
      const rows = elements(html, 'data-lcs-row');
      const all = rows.flatMap((ln) => (two ? JSON.parse(ln.at['data-lcs-answers']) : [ln.at['data-lcs-answer']]));
      let n = 0;
      rows.forEach((ln, ri) => {
        const s = sentenceAt(html, ln.index);
        const answers = two ? JSON.parse(ln.at['data-lcs-answers']) : [ln.at['data-lcs-answer']];
        const marks = two ? s.marks : [s.marks[0]];
        // the harder level's first mark is the name: its highlight must be the NAME, found first in the sentence
        marks.forEach((mk, k) => {
          const correct = answers[k];
          // distractors: the page's OTHER question about the same sentence (two), else the next row's questions
          const sib = two ? answers.filter((a) => a !== correct) : [];
          const others = [...sib, ...seededShuffle(all.filter((a) => a !== correct), all.join('|') + '|' + n)].filter((a, j, arr) => a !== correct && arr.indexOf(a) === j);   // not "the next rows" (2026-10-06)
          const labels = rotate(correct, others, n++);
          items.push(item(`data-lcs-sentence="${esc(s.text)}" data-lcs-mark="${esc(mk)}"`, line(markedHtml(s.text, mk), 30),
            opts(labels.map((l, j) => opt(j, l, l === correct, optW(3), 20)).join(''))));   // three questions side by side (one per row overflowed the 3600 screen at 10 items)
        });
        void ri;
      });
    } else throw new Error(`question-words screen: mode "${mode}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="question-words" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // ---- the answer key: the printed page with every answer shown in coral
  const css = [];
  let body = html;
  if (mode === 'base') {
    const kinds = new Set(elements(html, 'data-lcs-row').map((ln) => ln.at['data-lcs-ask']));
    for (const k of kinds) css.push(`[data-lcs-row][data-lcs-ask="${k}"] [data-lcs-chip="${k}"]{outline:4px solid ${CORAL};outline-offset:2px}`);
  } else if (mode === 'match') {
    // the same coral number on a question and on its answer
    const badge = (n) => `content:"${n}";position:absolute;top:-10px;min-width:24px;height:24px;border-radius:12px;background:${CORAL};color:#fff;font:700 15px/24px 'Baloo 2',cursive;text-align:center;z-index:2`;
    css.push('[data-lcs-q],[data-lcs-a]{position:relative}');
    elements(html, 'data-lcs-q').forEach((q) => {
      const i = +q.at['data-lcs-q'];
      css.push(`[data-lcs-q="${i}"]::before{${badge(i + 1)};left:-8px}`, `[data-lcs-a="${i}"]::before{${badge(i + 1)};left:-8px}`);
    });
  } else if (mode === 'fill') {
    // the question word CENTERED in its gap box (the box itself centers it: inset 0, flex)
    elements(html, 'data-lcs-row').forEach((ln) => {
      const sel = `[data-lcs-row="${ln.at['data-lcs-row']}"] [data-lcs-gapbox]`;
      css.push(`${sel}{position:relative}`, `${sel}::after{content:"${cssStr(ln.at['data-lcs-answer'])}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 22px 'Baloo 2',cursive;color:${CORAL};white-space:nowrap;pointer-events:none}`);
    });
  } else if (mode === 'sort') {
    // each tile written ON its own bin line, inside the bin's svg (never laid over with a guessed offset)
    const heads = elements(html, 'data-lcs-sorthead').length;
    const byBin = {};
    elements(html, 'data-lcs-sortword').forEach((c) => { (byBin[c.at['data-lcs-key']] = byBin[c.at['data-lcs-key']] || []).push(c.at['data-lcs-sortword']); });
    for (let b = 0; b < heads; b++) {
      const at = body.indexOf(`data-lcs-sortbin="${b}"`);
      const gapY = +((/data-lcs-gapy="([\d.]+)"/.exec(body.slice(at, at + 200)) || [])[1]);
      const s = body.indexOf('<svg', body.indexOf('class="ws-bin"', at)), e = body.indexOf('</svg>', s);
      if (at < 0 || !(gapY > 0) || s < 0) throw new Error(`question-words key: bin ${b} has no lined svg`);
      const px = Math.min(20, Math.floor(gapY * 0.55));
      const texts = (byBin[b] || []).map((t, k) => `<text x="10" y="${((k + 1) * gapY - 3).toFixed(1)}" font-family="Baloo 2" font-weight="700" font-size="${px}" fill="${CORAL}" data-lcs-keytext="1">${esc(t)}</text>`).join('');
      body = body.slice(0, e) + texts + body.slice(e);
    }
  } else if (mode === 'write') {
    // each question SEATED on its ruling (key-on-row.js); the printed starter gives way to the whole question
    const rows = elements(html, 'data-lcs-row');
    for (let k = rows.length - 1; k >= 0; k--) {
      const ln = rows[k];
      const answers = two ? JSON.parse(ln.at['data-lcs-answers']) : [ln.at['data-lcs-answer']];
      const start = body.indexOf(ln.tag);
      const end = k + 1 < rows.length ? body.indexOf(rows[k + 1].tag) : body.length;
      let seg = body.slice(start, end);
      let from = 0;
      answers.forEach((a) => {
        const s = seg.slice(from).search(/<svg[^>]*data-lcs-prim="writing-row"/);
        if (s < 0) throw new Error(`question-words key: row ${k + 1} has too few rulings`);
        const at = from + s, e = seg.indexOf('</svg>', at) + 6;
        const svg = seg.slice(at, e).replace(/<text[^>]*data-lcs-starter="1"[^>]*>[^<]*<\/text>/g, '');
        const seated = seatOnRow(svg, a, { fill: CORAL, font: 'baloo2-700', em: 0.6 });
        seg = seg.slice(0, at) + seated + seg.slice(e);
        from = at + seated.length;
      });
      body = body.slice(0, start) + seg + body.slice(end);
    }
  } else throw new Error(`question-words key: mode "${mode}" has no key`);
  out.bodyHtml = body + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/* ------------------------------------------------------------------ the oracle (independent: parses the frames) ------------------------------------------------------------------ */

const reEsc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** A template → a pattern: each {slot} (or {slot:mod}) a lazy capture; the bindings must agree where a slot repeats. */
function pattern(tpl) {
  const names = [];
  const src = String(tpl).split(/\{([A-Za-z][\w:]*)\}/).map((part, i) => (i % 2 ? (names.push(part), '(.+?)') : reEsc(part))).join('');
  return { re: new RegExp('^' + src + '$', 'u'), names };
}
function bind(tpl, text) {
  const { re, names } = pattern(tpl);
  const m = re.exec(String(text).normalize('NFC'));
  if (!m) return null;
  const b = {};
  for (let i = 0; i < names.length; i++) { if (b[names[i]] != null && b[names[i]] !== m[i + 1]) return null; b[names[i]] = m[i + 1]; }
  return b;
}
const fillB = (tpl, b) => String(tpl).replace(/\{([A-Za-z][\w:]*)\}/g, (_, k) => (b[k] == null ? `{${k}}` : b[k]));
const KIND_ASK = { thing: 'what', place: 'where', time: 'when', count: 'howmany' };

function lexicon(loc, bank, names) {
  const { numberWord } = require('./number-words.js');
  return {
    names: new Set(names),
    places: new Set((bank.places || []).map((p) => p.text)),
    times: new Set((bank.times || []).map((t) => t.text)),
    numbers: new Set((bank.numbers || [2, 3, 4, 5]).map((n) => numberWord(n, loc))),
  };
}
/** Every (frame, bindings) that reads the sentence, with bindings that are real words of the bank. */
function parses(sentence, bank, L) {
  return bank.frames.map((f) => ({ f, b: bind(f.text, sentence) })).filter(({ f, b }) => {
    if (!b || !L.names.has(b.name)) return false;
    if (f.kind === 'place' && !L.places.has(b.place)) return false;
    if (f.kind === 'time' && !L.times.has(b.time)) return false;
    if (f.kind === 'count' && !L.numbers.has(b.n)) return false;
    return true;
  });
}
/** The ask a highlight asks for: the name → who; else the frame's own kind, when the highlight IS its slot's words. */
function askOfMark(sentence, mark, bank, L) {
  const hits = new Set();
  for (const { f, b } of parses(sentence, bank, L)) {
    if (b.name === mark) hits.add('who');
    const own = f.kind === 'count' ? b.n : f.kind === 'place' ? b.place : f.kind === 'time' ? b.time : Object.entries(b).filter(([k]) => /^(thing|part|dat|pl)$/.test(k)).map(([, v]) => v)[0];
    if (own === mark) hits.add(KIND_ASK[f.kind]);
  }
  if (hits.size !== 1) throw new Error(`oracle: the highlight "${mark}" in "${sentence}" asks for ${hits.size ? [...hits].join('/') : 'nothing'}`);
  return [...hits][0];
}
/** The questions a sentence answers, per ask: every parse's q templates filled with its bindings. */
function questionsOf(sentence, bank, L) {
  const out = [];
  for (const { f, b } of parses(sentence, bank, L)) for (const [ask, tpl] of Object.entries(f.q || {})) { const q = fillB(tpl, b); if (!/\{/.test(q)) out.push({ ask, q }); }
  return out;
}
/** The kind of a bare answer word (sort tiles, short match answers). */
function kindOfLiteral(w, L) {
  const hits = [];
  if (L.names.has(w)) hits.push('who');
  if (L.places.has(w)) hits.push('where');
  if (L.times.has(w)) hits.push('when');
  if (L.numbers.has(w)) hits.push('howmany');
  if (!hits.length) hits.push('what');
  if (hits.length > 1) throw new Error(`oracle: "${w}" is ${hits.join(' and ')}`);
  return hits[0];
}

function oracle(mode, items, loc, bank, names) {
  const L = lexicon(loc, bank, names);
  const lc = (x) => String(x).normalize('NFC');
  const pickOne = (labels, ok, what) => {
    const idx = labels.map((l, i) => (ok(l) ? i : -1)).filter((i) => i >= 0);
    if (idx.length !== 1) throw new Error(`oracle: ${idx.length} options ${what} (${labels.join(' / ')})`);
    return idx[0];
  };
  // the question's ask, read from the frame templates (never from a stamp)
  const askOfQuestion = (q) => {
    const asks = new Set();
    for (const f of bank.frames) for (const [ask, tpl] of Object.entries(f.q || {})) if (bind(tpl, q)) asks.add(ask);
    if (asks.size !== 1) throw new Error(`oracle: the question "${q}" reads as ${[...asks].join('/') || 'no frame'}`);
    return [...asks][0];
  };
  return items.map((it) => {
    const labels = (it.options || []).map((o) => lc(o && typeof o === 'object' ? o.label : o));
    const m = it.meta;
    if (mode === 'base' || mode === 'fill') {
      const want = bank.qwords[askOfMark(lc(m['data-lcs-sentence']), lc(m['data-lcs-mark']), bank, L)];
      if (mode === 'fill') {
        // and the question line, finished with that word, is one of the sentence's own questions
        const q = (bank.qPrefix || '') + want + ' ' + lc(m['data-lcs-rest']);
        if (!questionsOf(lc(m['data-lcs-sentence']), bank, L).some((x) => x.q === q)) throw new Error(`oracle: "${q}" is not a question of "${m['data-lcs-sentence']}"`);
      }
      return pickOne(labels, (l) => l === want, `are "${want}"`);
    }
    if (mode === 'sort') {
      const k = kindOfLiteral(lc(m['data-lcs-tile']), L);
      const heads = { ...(bank.bins || {}) };
      if (!heads.when && bank.bins && bank.bins.who) heads.when = bank.bins.who.replace(bank.qwords.who, bank.qwords.when);
      return pickOne(labels, (l) => l === heads[k], `are the ${k} bin`);
    }
    if (mode === 'match') {
      const q = lc(m['data-lcs-question']);
      // a whole sentence answers the question when the question is one of that sentence's own questions
      if (labels.some((l) => /[.!]$/.test(l))) return pickOne(labels, (l) => questionsOf(l, bank, L).some((x) => x.q === q), `answer "${q}"`);
      const ask = askOfQuestion(q);
      return pickOne(labels, (l) => kindOfLiteral(l, L) === ask, `are ${ask} answers to "${q}"`);
    }
    if (mode === 'write') {
      const s = lc(m['data-lcs-sentence']);
      const ask = askOfMark(s, lc(m['data-lcs-mark']), bank, L);
      const qs = questionsOf(s, bank, L).filter((x) => x.ask === ask).map((x) => x.q);
      return pickOne(labels, (l) => qs.includes(l), `ask for "${m['data-lcs-mark']}"`);
    }
    throw new Error(`oracle: mode "${mode}"`);
  });
}

module.exports = { screenOrKey, oracle, _pattern: pattern, _bind: bind };
