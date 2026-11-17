/**
 * sound-position-g1.js — two Grade 1 pages for the lesson "First, middle, or last sound?" (RF.1.2.c) of the unit "Sounds
 * and Short-Vowel Words" (English literacy year, Daily Teaching System Part 12.3, 2026-11-17; revised after the reading
 * specialist's review the same day). The picture words are data/literacy/sound-position-g1.en.json: one syllable, one short
 * vowel; CVC words (three sounds) and CCVC words (four sounds). Every picture is one a first grader names with exactly that
 * word (each looked at; the refused ones and why are in the bank: the doll reads as a girl, every library duck is a
 * duckling). The work is with SOUNDS: one box stands for one sound (Elkonin), so a CCVC word has four boxes. "First" is
 * the first box, "last" the last box, and "middle" is asked only of a CVC word, where it is always the vowel; the second
 * sound of a blend is never asked. The sound asked for stands in exactly ONE place of its word (no pop for /p/). A word
 * whose vowel some American speakers say another way (pen like pin; dog, log, frog; bag and flag like beg or with a long a;
 * leg; fan) is never asked for its middle sound, and two words count as sharing their vowel when any way of saying them
 * gives one vowel (so bag and leg, flag and leg, fan and pen are never a pair). The first sound of dress, drum, and truck is
 * never asked (many first graders hear /j/ and /ch/). What the teacher says stands at the foot of the ANSWER KEY, never on
 * the child's page (a printed word shows its letters, and so the answer); the key says "Answer key".
 *
 *   where  G1-624 First, Middle, or Last? (day 1). Twelve pictures in two columns, each with its sound boxes. The teacher
 *          says the picture word and a sound (the key's teacher lines: 1 sun /s/); the child colors the box where the sound
 *          is heard.
 *     level 1  the sound is the first or the last one (boxes of 50 px to color)
 *     level 2  the first, the middle (the vowel of a CVC word), or the last sound, each three times or more
 *     level 3  CVC words only, boxes of 60 px: the child writes the letter for the sound in its box; every sound asked is
 *              spelled by one letter in its word (never /k/, which c, k, and ck spell, never the ck, ll, ss, or sh of a word)
 *          The places asked follow no pattern, in the numbered order and down each column.
 *   share  G1-625 Two Words, One Sound (day 2). The child says the first, the middle, and the last sound of each picture word
 *          (three boxes under each picture to touch) and finds the sound two words share: they share it in ONE place and in
 *          no other (no sound of one word stands in another place of the other). The key's teacher lines name the pictures.
 *     level 1  five pairs that share their first or their last sound: circle first or last
 *     level 2  five pairs that share their first, middle, or last sound (each at least once): circle first, middle, or last
 *     level 3  four rows of three pictures: two share a sound in one place, the third shares no sound with either: circle
 *              the two pictures, then circle first, middle, or last
 *          The places of the right answers follow no pattern.
 *
 * Grade 1 sizes: pictures 60 px or more (larger on the child's page, which ends at its task, than on the key), words a child
 * reads 20 px or more, a box for one letter 60 px. Ligatures are off (the rule stands before the page root, which carries
 * data-lcs-noliga), and an f before i, f, l or t gets room of its own. No page leaves a blank band of more than 40 px: the
 * cards and rows stretch to fill the child's page. The instruction of each level is INSTR (registered as strings; verify()
 * reads it on the page); verify() carries its OWN copy of every ruled text and measure (SPEC). English only. Themeless: a
 * copy draws other words. PDF only (the answer key is for checks and review). The bank is checked when this file loads
 * (spFaultsOf), including trial draws of every level; nothing looks a picture up while the file loads.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const BANK = require('../../data/literacy/sound-position-g1.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;
const T = TOK.color;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const INNER = W - 24;
const MODES = ['where', 'share'];
const POS = ['first', 'middle', 'last'];

const INSTR = {
  where: { 1: 'A sound can come first or last in a word.', 2: 'A sound can come first, in the middle, or last in a word.', 3: 'A sound can come first, in the middle, or last in a word.' },
  share: { 1: 'Two words can share a sound in the same place.', 2: 'Two words can share a sound in the same place.', 3: 'Two words can share a sound in the same place.' },
};
const LINES = {
  where: { 1: ['Your teacher says a picture word and a sound. Color the box where you hear the sound: the first box or the last box.'],
    2: ['Your teacher says a picture word and a sound. Color the box where you hear the sound.'],
    3: ['Your teacher says a picture word and a sound. Write the letter for the sound in its box.'] },
  share: { 1: ['Say the first, middle, and last sound of each picture word. Touch a box for each sound.', 'Where do the two words share a sound? Circle first or last.'],
    2: ['Say the first, middle, and last sound of each picture word. Touch a box for each sound.', 'Where do the two words share a sound? Circle first, middle, or last.'],
    3: ['Say the first, middle, and last sound of each picture word. Touch a box for each sound.', 'Circle the two pictures that share a sound. Then circle first, middle, or last.'] },
};
/** what the teacher says stands at the foot of the ANSWER KEY, never on the child's page (review 2026-11-17, ruling B) */
const TSTRIP = 'For the teacher: read these lines aloud.';
const KEYTAG = 'Answer key';
const TSAY = { where: 'Say the picture word, then the sound.', share: 'Read the picture words to the class first:' };

const LEVELS = {
  // pic: the pictures on the child's page (it ends at its task); kpic: on the answer key, which also holds the teacher lines
  where: { 1: { n: 12, box: 50, pic: 84, kpic: 76, asks: ['first', 'last'] }, 2: { n: 12, box: 50, pic: 84, kpic: 76, asks: POS }, 3: { n: 12, box: 60, pic: 84, kpic: 76, asks: POS, write: true } },
  share: { 1: { rows: 5, pos: ['first', 'last'], pic: 76, kpic: 66, tbox: 32 }, 2: { rows: 5, pos: POS, pic: 76, kpic: 66, tbox: 32 }, 3: { rows: 4, pos: POS, pic: 80, kpic: 70, tbox: 32, three: true } },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
const say = (s) => '/' + s + '/';
function blockRepeat(s) {
  for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
  const runs = String(s).match(/(.)\1*/g) || [];
  return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length);
}
function placesOk(p, k) {
  const n = p.length, s = p.join('');
  const need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
  if (new Set(p).size < need) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
  if (blockRepeat(s)) return false;
  const cap = n === 4 && k === 2 ? 3 : Math.floor((2 * n) / 3);
  if (n >= 3 && Math.max(...[...new Set(p)].map((v) => p.filter((x) => x === v).length)) > cap) return false;
  return true;
}
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, c) => a + Math.floor(next() * (c - a + 1)) }; }
/** the box of a place in a word (first: 0, middle: 1 of a CVC word, last: the last) */
const boxOf = (wd, pos) => (pos === 'first' ? 0 : pos === 'last' ? wd.sounds.length - 1 : wd.sounds.length === 3 ? 1 : -1);
/** a place may be asked of a word: middle only of a CVC word, and the sound stands in exactly one place of the word */
const askable = (wd, pos) => { const i = boxOf(wd, pos); return i >= 0 && !(pos === 'middle' && wd.alt) && !(pos === 'first' && wd.noFirst) && wd.sounds.filter((s) => s === wd.sounds[i]).length === 1; };
/** level 3 of G1-624: the sound is spelled by one letter in its word, and it is not /k/ */
const writable = (wd, pos) => { const i = boxOf(wd, pos); return i >= 0 && wd.letters[i].length === 1 && wd.sounds[i] !== 'k'; };
/** the places two CVC words share (same sound in the same place) and whether a sound of one stands in ANOTHER place of the other */
function shareOf(a, b) { const vs = (w) => [w.sounds[1], ...(w.alt || [])];
  // the vowel counts as shared when any way of saying the two words gives one vowel; a shared middle is a sure one only when
  // both vowels are said one way
  const same = [0, 1, 2].filter((i) => (i === 1 ? vs(a).some((v) => vs(b).includes(v)) : a.sounds[i] === b.sounds[i]));
  const cross = [0, 1, 2].some((i) => [0, 1, 2].some((j) => i !== j && a.sounds[i] === b.sounds[j]));
  const sure = same.length === 1 && (same[0] !== 1 || (!a.alt && !b.alt));
  return { same, cross, sure }; }

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
function spFaultsOf(b) {
  const f = [];
  const Wd = b.words || {};
  const VOW = /^[ăĕĭŏŭ]$/;
  if (Object.keys(Wd).length < 24) f.push('words: fewer than twenty-four picture words');
  for (const [w, x] of Object.entries(Wd)) {
    if (!x || !Array.isArray(x.pic) || x.pic.length !== 2 || /bw( ?\d+)?$/i.test(x.pic[0]) || x.kind !== w || !x.cls) f.push(`"${w}": not a colour picture with a kind and a class`);
    const n = (x.sounds || []).length;
    if (n !== 3 && n !== 4) { f.push(`"${w}": not three or four sounds`); continue; }
    if ((x.letters || []).length !== n || x.letters.join('') !== w) f.push(`"${w}": its letters do not spell the word sound by sound`);
    const vi = x.sounds.findIndex((s) => VOW.test(s));
    if (x.sounds.filter((s) => VOW.test(s)).length !== 1 || vi !== n - 2) f.push(`"${w}": not one short vowel just before the last sound (CVC or CCVC)`);
    if (x.sounds.some((s, i) => i !== vi && !/^(b|d|f|g|h|j|k|l|m|n|p|r|s|t|v|w|y|z|sh|ch|th)$/.test(s))) f.push(`"${w}": a consonant sound is not written as one sound`);
    // a CCVC word: the first two sounds are a blend (two consonants), so its first and last sounds are the only ones asked
    if (n === 4 && !(/^[a-z]+$/.test(x.sounds[0]) && /^[lr]$/.test(x.sounds[1]))) f.push(`"${w}": a word of four sounds is not a blend with l or r and a vowel`);
    if (!['first', 'last'].some((p) => askable(x, p))) f.push(`"${w}": no sound of it can be asked by its place`);
    if (/^[dt]r/.test(w) && !x.noFirst) f.push(`"${w}": a word with dr or tr at the start has no mark that its first sound is never asked`);
    if ((b.refused || {})[w]) f.push(`"${w}" is a picture word and a refused one`);
    if ((b.modelOnly || []).includes(w)) f.push(`"${w}" is a picture word and a model word`);
  }
  if ((b.modelOnly || []).length < 3) f.push('modelOnly: fewer than three words');
  if (Object.keys(b.refused || {}).length < 15) f.push('refused: fewer than fifteen pictures looked at and left out');
  if ((b.banned || []).length < 10) f.push('banned: fewer than ten words');
  const cvc = Object.values(Wd).filter((x) => x.sounds.length === 3);
  if (cvc.length < 20) f.push('fewer than twenty CVC words');
  for (const p of POS) if (cvc.filter((x) => askable(x, p) && writable(x, p)).length < 10) f.push(`fewer than ten CVC words whose ${p} sound a child can write with one letter`);
  if (f.length) return f;
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawPage(b, mode, lv, seedRng(s * 7 + lv)); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); break; }
  }
  return f;
}

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
function drawPage(b, mode, lv, rng) {
  const d = LEVELS[mode][lv], Wd = b.words, all = Object.keys(Wd);
  const kOf = (p) => d.asks ? d.asks.indexOf(p) : d.pos.indexOf(p);
  if (mode === 'where') {
    const pool = all.filter((w) => !d.write || Wd[w].sounds.length === 3);
    for (let t = 0; t < 3000; t++) {
      const ws = shuffle(pool, rng).slice(0, d.n);
      if (ws.length !== d.n) throw new Error('not enough words');
      const asks = ws.map((w) => { const ok = d.asks.filter((p) => askable(Wd[w], p) && (!d.write || writable(Wd[w], p))); return ok.length ? ok[rng.int(0, ok.length - 1)] : null; });
      if (asks.some((x) => !x)) continue;
      const k = asks.map(kOf);
      // each place often enough: level 1 first and last four times or more, levels 2 and 3 each place three times or more
      if (d.asks.some((p) => asks.filter((x) => x === p).length < (d.asks.length === 2 ? 4 : 3))) continue;
      // no pattern in the numbered order nor down a column (1-6 the left column, 7-12 the right)
      if (!placesOk(k, d.asks.length) || !placesOk(k.slice(0, 6), d.asks.length) || !placesOk(k.slice(6), d.asks.length)) continue;
      const cards = ws.map((w, i) => ({ word: w, ask: asks[i], box: boxOf(Wd[w], asks[i]), sound: Wd[w].sounds[boxOf(Wd[w], asks[i])] }));
      return { cards, items: cards.map((c) => 'ask:' + c.word + ':' + c.ask) };
    }
    throw new Error('no cards');
  }
  if (mode === 'share') {
    const cvc = all.filter((w) => Wd[w].sounds.length === 3);
    for (let t = 0; t < 4000; t++) {
      const used = new Set(), rows = [];
      let ok = true;
      for (let r = 0; r < d.rows && ok; r++) {
        let row = null;
        for (let k = 0; k < 200 && !row; k++) {
          const free = shuffle(cvc.filter((w) => !used.has(w)), rng);
          const a = free[0], c = free.find((x) => { if (x === a) return false; const s = shareOf(Wd[a], Wd[x]); return s.sure && !s.cross && d.pos.includes(POS[s.same[0]]); });
          if (!c) continue;
          const pos = POS[shareOf(Wd[a], Wd[c]).same[0]];
          if (!d.three) { row = { ws: rng.int(0, 1) ? [a, c] : [c, a], pair: [a, c], pos }; continue; }
          const e = free.find((x) => x !== a && x !== c && [a, c].every((y) => { const s = shareOf(Wd[x], Wd[y]); return !s.same.length && !s.cross; }));
          if (!e) continue;
          const order = shuffle([a, c, e], rng);
          row = { ws: order, pair: [a, c], odd: e, pos };
        }
        if (!row) { ok = false; break; }
        row.ws.forEach((w) => used.add(w)); rows.push(row);
      }
      if (!ok) continue;
      const k = rows.map((x) => d.pos.indexOf(x.pos));
      if (!placesOk(k, d.pos.length) || (d.pos.length === 3 && !d.three && new Set(k).size < 3)) continue;
      if (d.three && !placesOk(rows.map((x) => x.ws.indexOf(x.odd)), 3)) continue;
      return { rows, items: rows.map((x) => 'row:' + x.ws.slice().sort().join('-') + ':' + x.pos) };
    }
    throw new Error('no rows');
  }
  throw new Error('sound-position-g1: unknown mode ' + mode);
}

{ const fb = spFaultsOf(BANK); if (fb.length) throw new Error('sound-position-g1.en.json: ' + fb.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
const img = (w, size, more = '') => `<img class="ws-icon" data-lcs-pic="${attr(w)}" data-lcs-pickind="${attr(BANK.words[w].kind)}" src="${fileUri(BANK.words[w].pic[0], BANK.words[w].pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain;${more}">`;
/** "Answer key" on the corner of the first block of a key (it takes no room: it stands over the block's top edge) */
const keyTag = () => `<span data-lcs-keytag style="position:absolute;right:14px;top:-17px;padding:2px 10px;border-radius:999px;background:${T.teal};color:#FFFFFF;font:800 14px/18px 'Nunito',sans-serif;white-space:nowrap">${esc(KEYTAG)}</span>`;
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="position:relative;display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html) => `<div data-lcs-label data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${k}.</span> ${html}</div>`;
const badge = (n, more = '') => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 16px/1 'Nunito',sans-serif;${more}">${n}</span>`;
const ring = (r = '50%') => `<span data-lcs-ring style="position:absolute;left:-5px;right:-5px;top:-5px;bottom:-5px;border:3.5px solid ${T.teal};border-radius:${r};pointer-events:none"></span>`;
/** the teacher lines, on the ANSWER KEY only, at its foot: what the teacher says, numbered like the pictures or rows */
const strip = (mode, items) => `<div data-lcs-tstrip style="flex:0 0 auto;display:flex;flex-direction:column;gap:3px;padding-top:8px;border-top:2px solid ${T.inkSoft}">` +
  `<div data-lcs-tstriphead data-lcs-read style="font:800 16px/1.3 'Nunito',sans-serif;color:${T.inkSoft}">${esc(TSTRIP)} <span data-lcs-tsay style="font-weight:600">${esc(TSAY[mode])}</span></div>` +
  `<div style="display:flex;flex-wrap:wrap;column-gap:20px;row-gap:2px">` + items.map((x, i) => `<span data-lcs-tstripitem="${i + 1}" data-lcs-read style="white-space:nowrap;font:600 16px/1.35 'Nunito',sans-serif;color:${T.inkSoft}"><b style="font-weight:800">${i + 1}</b> ${x}</span>`).join('') + `</div></div>`;
/** the sound boxes of a word: one box a sound; the key fills the box asked (levels 1 and 2) or writes its letter (level 3) */
const soundBoxes = (w, size, mark, letter) => `<div data-lcs-boxes="${attr(w)}" style="display:flex;gap:5px">` + BANK.words[w].sounds.map((_, i) =>
  `<span data-lcs-sbox="${i}"${mark === i ? ' data-lcs-keybox="1"' : ''} style="box-sizing:border-box;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:8px;background:${mark === i && !letter ? T.teal : '#FFFFFF'};display:flex;align-items:center;justify-content:center;font:800 ${Math.round(size * 0.6)}px/1 'Nunito',sans-serif;color:${T.teal}">${mark === i && letter ? esc(letter) : ''}</span>`).join('') + `</div>`;

function renderPage(plan, mode, lv, d, key) {
  const blocks = [], L = LINES[mode][lv];
  if (mode === 'where') {
    const pic = key ? d.kpic : d.pic;
    const card = (c, i) => `<div data-lcs-wcard="${i + 1}" data-lcs-word="${attr(c.word)}" data-lcs-ask="${c.ask}" style="flex:1 1 0;min-height:0;display:flex;align-items:center;gap:10px;padding:4px 10px;border-radius:12px;background:#FFFFFF">` +
      `<span style="position:relative;display:block">${img(c.word, pic)}${badge(i + 1, 'position:absolute;left:-6px;top:-4px')}</span>` +
      soundBoxes(c.word, d.box, key ? c.box : -1, key && d.write ? BANK.words[c.word].letters[c.box] : '') + `</div>`;
    const col = (a) => `<div style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:6px">${a.join('')}</div>`;
    const cards = plan.cards.map(card);
    blocks.push(cream('data-lcs-task="where"', (key ? keyTag() : '') + label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;gap:10px">${col(cards.slice(0, 6))}${col(cards.slice(6))}</div>`, 8, 6, 'flex:1 1 auto;'));
    if (key) blocks.push(strip('where', plan.cards.map((c) => `<i data-lcs-sword style="font-weight:600">${esc(c.word)}</i> <span data-lcs-ssound>${esc(say(c.sound))}</span>`)));
  }
  if (mode === 'share') {
    const pic = (w, ok) => `<div data-lcs-spic="${attr(w)}"${ok ? ' data-lcs-ok="1"' : ''} style="position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:2px 4px">${img(w, key ? d.kpic : d.pic)}` +
      `<div data-lcs-touch style="display:flex;gap:4px">${[0, 1, 2].map(() => `<span data-lcs-tbox style="display:block;width:${d.tbox}px;height:${d.tbox}px;box-sizing:border-box;border:2px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span>`).join('')}</div>${key && ok && d.three ? ring('16px') : ''}</div>`;
    const choices = (x) => `<div data-lcs-choices style="flex:0 0 auto;display:flex;flex-direction:column;gap:2px;align-items:flex-start">` + d.pos.map((p) => `<span data-lcs-choice="${p}"${p === x.pos ? ' data-lcs-ok="1"' : ''} style="position:relative;display:inline-block;padding:0 8px;font:800 22px/1.2 'Nunito',sans-serif;color:${T.ink}">${p}${key && p === x.pos ? ring('999px') : ''}</span>`).join('') + `</div>`;
    const row = (x, r) => `<div data-lcs-srow="${r + 1}" data-lcs-pos="${x.pos}" style="flex:1 1 0;min-height:0;display:flex;align-items:center;gap:10px;padding:5px 12px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}` +
      `<div style="flex:1 1 auto;display:flex;justify-content:space-evenly">${x.ws.map((w) => pic(w, d.three && x.pair.includes(w))).join('')}</div>${choices(x)}</div>`;
    blocks.push(cream('data-lcs-task="share"', (key ? keyTag() : '') + label(1, esc(L[0])) + label(2, esc(L[1])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:8px">${plan.rows.map(row).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
    if (key) blocks.push(strip('share', plan.rows.map((x) => `<span data-lcs-snames>${x.ws.map(esc).join(', ')}</span>`)));
  }
  return blocks;
}

/* ---------------------------------------------------------------- verify's own copy of the ruled texts and measures ---------------------------------------------------------------- */
const SPEC = {
  INSTR: {
    where: { 1: 'A sound can come first or last in a word.', 2: 'A sound can come first, in the middle, or last in a word.', 3: 'A sound can come first, in the middle, or last in a word.' },
    share: { 1: 'Two words can share a sound in the same place.', 2: 'Two words can share a sound in the same place.', 3: 'Two words can share a sound in the same place.' },
  },
  LINES: {
    where: { 1: ['Your teacher says a picture word and a sound. Color the box where you hear the sound: the first box or the last box.'],
      2: ['Your teacher says a picture word and a sound. Color the box where you hear the sound.'],
      3: ['Your teacher says a picture word and a sound. Write the letter for the sound in its box.'] },
    share: { 1: ['Say the first, middle, and last sound of each picture word. Touch a box for each sound.', 'Where do the two words share a sound? Circle first or last.'],
      2: ['Say the first, middle, and last sound of each picture word. Touch a box for each sound.', 'Where do the two words share a sound? Circle first, middle, or last.'],
      3: ['Say the first, middle, and last sound of each picture word. Touch a box for each sound.', 'Circle the two pictures that share a sound. Then circle first, middle, or last.'] },
  },
  TSTRIP: 'For the teacher: read these lines aloud.', KEYTAG: 'Answer key', TSAY: { where: 'Say the picture word, then the sound.', share: 'Read the picture words to the class first:' },
  PIC: 60, READ: 16, CHOICE: 20, BAND: 40, FILL: 0.8, COLORBOX: 48, LETTERBOX: 60, TOUCH: 30,
  HOLD: { where: { 1: { n: 12, asks: ['first', 'last'], min: 4 }, 2: { n: 12, asks: ['first', 'middle', 'last'], min: 3 }, 3: { n: 12, asks: ['first', 'middle', 'last'], min: 3, write: true } },
    share: { 1: { rows: 5, pos: ['first', 'last'] }, 2: { rows: 5, pos: ['first', 'middle', 'last'], all: true }, 3: { rows: 4, pos: ['first', 'middle', 'last'], three: true } } },
};

function makeSoundPositionG1Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('sound-position-g1: unknown mode ' + mode);
  const desc = `Free printable ${i18n.en.title} Worksheet for Grade 1. ${INSTR[mode][2]} Download the free PDF.`;
  if (desc.length < 120 || desc.length > 170) throw new Error(`${id}: the description has ${desc.length} letters (120 to 170)`);
  const INFO = { words: BANK.words, refused: Object.keys(BANK.refused), banned: BANK.banned, modelOnly: BANK.modelOnly };
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the picture words are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2];
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, ctx.rng);
      const blocks = renderPage(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-sp="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((S, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-sp]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsSp.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fsz = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const all = (q, e = root) => [...e.querySelectorAll(q)];
        const one = (q, e = root) => e.querySelector(q);
        const rb = R(root);
        const Wd = INFO.words, H = S.HOLD[mode][lv];
        const say = (s) => '/' + s + '/';
        const POS = ['first', 'middle', 'last'];
        const blockRepeat = (s) => { for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
          const runs = String(s).match(/(.)\1*/g) || []; return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length); };
        const placesOk = (p, k) => {
          const n = p.length, s = p.join(''), need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
          if (new Set(p).size < need) return false;
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
          if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
          if (blockRepeat(s)) return false;
          const cap = n === 4 && k === 2 ? 3 : Math.floor((2 * n) / 3);
          if (n >= 3 && Math.max(...[...new Set(p)].map((v) => p.filter((x) => x === v).length)) > cap) return false;
          return true;
        };
        const boxOf = (wd, pos) => (pos === 'first' ? 0 : pos === 'last' ? wd.sounds.length - 1 : wd.sounds.length === 3 ? 1 : -1);
        const shareOf = (a, b) => { const vs = (w) => [w.sounds[1], ...(w.alt || [])];
          const same = [0, 1, 2].filter((i) => (i === 1 ? vs(a).some((v) => vs(b).includes(v)) : a.sounds[i] === b.sounds[i]));
          const cross = [0, 1, 2].some((i) => [0, 1, 2].some((j) => i !== j && a.sounds[i] === b.sounds[j]));
          return { same, cross, sure: same.length === 1 && (same[0] !== 1 || (!a.alt && !b.alt)) }; };

        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if (all('*').some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if (/['"]/.test(root.textContent)) fails.push('a straight apostrophe or quote on the page');
        const imgs = all('img');
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < S.PIC - 0.5 || R(im).height < S.PIC - 0.5) fails.push(`a picture smaller than ${S.PIC} px`);
          const w = im.dataset.lcsPic; if (!Wd[w] || INFO.refused.includes(w)) fails.push(`"${w}" is not a picture word of the bank`); });
        if (new Set(imgs.map((im) => im.dataset.lcsPickind)).size !== imgs.length) fails.push('two pictures of one kind on the page');
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        { const ls = all('[data-lcs-label]'), want = S.LINES[mode][lv];
          if (ls.length !== want.length) fails.push(`${ls.length} task lines, not ${want.length}`);
          ls.forEach((l, i) => { const t = txt(l), m = /^(\d+)\. (.*)$/.exec(t); if (!m || +m[1] !== i + 1 || m[2] !== want[i]) fails.push(`task line ${i + 1} is not the line of level ${lv}: "${t}"`); }); }
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.closest('[data-lcs-keytag]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
        blocks.forEach((b) => { const iv = [], s = cs(b);
          [b, ...b.querySelectorAll('*')].forEach((e) => {
            const r = R(e); if (!r.width || !r.height || e === b || e.closest('[data-lcs-keytag]')) return;
            if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') return;
            if (e.tagName.toLowerCase() === 'svg') { iv.push([r.top, r.bottom]); return; }
            const st = cs(e), own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)');
            if (e.tagName === 'IMG' || own || border || (st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== cs(b).backgroundColor)) iv.push([r.top, r.bottom]);
          });
          iv.sort((p, q) => p[0] - q[0]);
          // from the inside of the border: padding is blank paper too (80 px of padding under the rule of the teacher
          // lines went unreported while the band was measured from the end of the padding, round 2)
          let top = R(b).top + parseFloat(s.borderTopWidth), worst = 0;
          for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
          worst = Math.max(worst, R(b).bottom - parseFloat(s.borderBottomWidth) - top);
          if (worst > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(worst)} px that a reader sees in the ${b.dataset.lcsTask || Object.keys(b.dataset)[0] || 'block'} block`); });
        all('[data-lcs-read]').forEach((e) => { if (fsz(e) < S.READ - 0.1) fails.push(`text the teacher reads is ${fsz(e)} px (${S.READ} or more)`); });
        all('[data-lcs-choice]').forEach((e) => { if (fsz(e) < S.CHOICE - 0.1) fails.push(`a word to circle is printed at ${fsz(e)} px (${S.CHOICE} or more)`); });
        if (!isKey && (all('[data-lcs-ring], [data-lcs-keybox]').length || all('[data-lcs-sbox]').some((e) => txt(e) || cs(e).backgroundColor !== 'rgb(255, 255, 255)'))) fails.push('an answer is marked on the page of the child');
        { const ws = root.textContent.toLowerCase().match(/[a-z]+/g) || []; const bad = ws.filter((w) => INFO.banned.includes(w) || INFO.modelOnly.includes(w)); if (bad.length) fails.push('a word of the never list or a model word: ' + [...new Set(bad)].join(', ')); }
        // what the teacher says: on the ANSWER KEY only, at its foot; the child's page holds nothing of it (no strip, no word
        // of a picture written out, no sound between slashes)
        const ts = isKey ? one('[data-lcs-tstrip]') : null, items = ts ? all('[data-lcs-tstripitem]', ts) : [];
        if (!isKey) { const pt = root.textContent; if (one('[data-lcs-tstrip]') || pt.includes(S.TSTRIP) || pt.includes(S.TSAY[mode]) || /\/[a-zăĕĭŏŭāēīōô]+\//i.test(pt) || imgs.some((im) => new RegExp('(^|[^a-z])' + im.dataset.lcsPic + '([^a-z]|$)', 'i').test(pt))) fails.push('a text of the teacher lines (a word of a picture or a sound) stands on the page of the child'); }
        else if (!ts || ts !== blocks[blocks.length - 1]) fails.push('no teacher lines at the foot of the key');
        else if (!txt(one('[data-lcs-tstriphead]', ts)).startsWith(S.TSTRIP) || txt(one('[data-lcs-tsay]', ts)) !== S.TSAY[mode]) fails.push('the teacher lines do not say they are read aloud and what to say');
        // "Answer key" on the key only, over the corner of the first block, touching no text and no picture
        { const tg = all('[data-lcs-keytag]');
          if (!isKey && tg.length) fails.push('the page of the child says it is the answer key');
          if (isKey) { if (tg.length !== 1 || txt(tg[0]) !== S.KEYTAG || !blocks[0].contains(tg[0])) fails.push('the key does not say "Answer key" at the top');
            else { const q = R(tg[0]), hit = (e) => { const z = R(e); return z.width && z.left < q.right && z.right > q.left && z.top < q.bottom && z.bottom > q.top; };
              if (q.top < rb.top - 30 || [instr, ...all('[data-lcs-label], [data-lcs-read], [data-lcs-badge], img')].filter(Boolean).some(hit)) fails.push('the "Answer key" tag touches a text or a picture'); } } }

        if (mode === 'where') {
          const cards = all('[data-lcs-wcard]');
          if (cards.length !== H.n) fails.push(`${cards.length} pictures, not ${H.n}`);
          if (isKey && items.length !== cards.length) fails.push(`${items.length} teacher lines for ${cards.length} pictures`);
          const k = [];
          cards.forEach((c, i) => {
            const w = c.dataset.lcsWord, ask = c.dataset.lcsAsk, wd = Wd[w], tag = 'picture ' + (i + 1);
            if (!wd) { fails.push(`${tag}: not a word of the bank`); return; }
            if (one('img', c).dataset.lcsPic !== w) fails.push(`${tag}: the picture is not of its word`);
            const bx = all('[data-lcs-sbox]', c);
            if (bx.length !== wd.sounds.length) fails.push(`${tag}: ${bx.length} boxes for ${wd.sounds.length} sounds`);
            bx.forEach((b) => { if (R(b).width < (H.write ? S.LETTERBOX : S.COLORBOX) - 0.5 || R(b).height < (H.write ? S.LETTERBOX : S.COLORBOX) - 0.5) fails.push(`${tag}: a box smaller than ${H.write ? S.LETTERBOX : S.COLORBOX} px`); });
            const bi = boxOf(wd, ask);
            if (!H.asks.includes(ask) || bi < 0) { fails.push(`${tag}: the place "${ask}" is not asked on this level, or not of this word`); return; }
            if (wd.sounds.filter((s) => s === wd.sounds[bi]).length !== 1) fails.push(`${tag}: the sound asked stands in more than one place of "${w}"`);
            if (ask === 'middle' && wd.alt) fails.push(`${tag}: the vowel of "${w}" is said more than one way, and it is asked`);
            if (ask === 'first' && /^[dt]r/.test(w)) fails.push(`${tag}: the first sound of "${w}" (dr or tr) is asked`);
            if (H.write && (wd.sounds.length !== 3 || wd.letters[bi].length !== 1 || wd.sounds[bi] === 'k')) fails.push(`${tag}: the sound asked is not spelled by one letter of a CVC word`);
            k.push(H.asks.indexOf(ask));
            const it = items[i];
            if (isKey && (!it || !txt(it).startsWith((i + 1) + ' ') || txt(one('[data-lcs-sword]', it)) !== w || txt(one('[data-lcs-ssound]', it)) !== say(wd.sounds[bi]))) fails.push(`${tag}: the teacher lines do not say "${w}" and the sound asked`);
            const kb = bx.filter((b) => b.dataset.lcsKeybox);
            if (isKey && (kb.length !== 1 || bx.indexOf(kb[0]) !== bi || (H.write ? txt(kb[0]) !== wd.letters[bi] : cs(kb[0]).backgroundColor === 'rgb(255, 255, 255)'))) fails.push(`${tag}: the key does not mark the box of the sound`);
          });
          H.asks.forEach((p, j) => { if (k.filter((x) => x === j).length < H.min) fails.push(`the ${p} sound is asked fewer than ${H.min} times`); });
          if (k.length === H.n && (!placesOk(k, H.asks.length) || !placesOk(k.slice(0, 6), H.asks.length) || !placesOk(k.slice(6), H.asks.length))) fails.push('the places asked follow a pattern: ' + k.join(''));
          // the two columns: pictures 1 to 6 on the left, 7 to 12 on the right, each down its column
          if (cards.length === 12 && !(cards.slice(0, 6).every((c, i) => !i || R(c).top > R(cards[i - 1]).top) && cards.slice(6).every((c, i) => !i || R(c).top > R(cards[i + 5]).top) && R(cards[6]).left > R(cards[0]).right)) fails.push('the pictures do not stand 1 to 6 down the left column and 7 to 12 down the right');
        }
        if (mode === 'share') {
          const rows = all('[data-lcs-srow]');
          if (rows.length !== H.rows) fails.push(`${rows.length} rows, not ${H.rows}`);
          if (isKey && items.length !== rows.length) fails.push(`${items.length} teacher lines for ${rows.length} rows`);
          const k = [], odd = [];
          rows.forEach((rw, r) => {
            const tag = 'row ' + (r + 1), ps = all('[data-lcs-spic]', rw), ws = ps.map((p) => p.dataset.lcsSpic), pos = rw.dataset.lcsPos;
            if (ps.length !== (H.three ? 3 : 2) || ws.some((w) => !Wd[w] || Wd[w].sounds.length !== 3)) { fails.push(`${tag}: not ${H.three ? 3 : 2} pictures of CVC words`); return; }
            ps.forEach((p) => { const tb = all('[data-lcs-tbox]', p); if (tb.length !== 3 || tb.some((b) => R(b).width < S.TOUCH - 0.5)) fails.push(`${tag}: a picture has not three boxes to touch`); });
            const pair = H.three ? ps.filter((p) => p.dataset.lcsOk).map((p) => p.dataset.lcsSpic) : ws;
            if (pair.length !== 2) { fails.push(`${tag}: not two pictures keyed`); return; }
            const s = shareOf(Wd[pair[0]], Wd[pair[1]]);
            if (!s.sure || s.cross || POS[s.same[0]] !== pos || !H.pos.includes(pos)) fails.push(`${tag}: the two words do not share one sound in one place (${pos}) and no other`);
            if (H.three) { const o = ws.find((w) => !pair.includes(w)); if ([pair[0], pair[1]].some((y) => { const t = shareOf(Wd[o], Wd[y]); return t.same.length || t.cross; })) fails.push(`${tag}: the third picture shares a sound with one of the two`); odd.push(ws.indexOf(o));
              if (isKey && (all('[data-lcs-spic] > [data-lcs-ring]', rw).length !== 2 || ps.some((p) => !!one(':scope > [data-lcs-ring]', p) !== !!p.dataset.lcsOk))) fails.push(`${tag}: the key does not circle the two pictures`); }
            const ch = all('[data-lcs-choice]', rw);
            if (ch.map((c) => txt(c)).join(' ') !== H.pos.join(' ')) fails.push(`${tag}: the words to circle are not ${H.pos.join(', ')}`);
            const okc = ch.filter((c) => c.dataset.lcsOk); if (okc.length !== 1 || okc[0].dataset.lcsChoice !== pos) fails.push(`${tag}: the place keyed is not the one shared`);
            if (isKey && (!okc[0] || !one('[data-lcs-ring]', okc[0]) || all('[data-lcs-choices] [data-lcs-ring]', rw).length !== 1)) fails.push(`${tag}: the key does not circle the place`);
            k.push(H.pos.indexOf(pos));
            if (isKey && (!items[r] || txt(one('[data-lcs-snames]', items[r])) !== ws.join(', ') || !txt(items[r]).startsWith((r + 1) + ' '))) fails.push(`${tag}: the teacher lines do not name its pictures`);
          });
          if (k.length === H.rows && !placesOk(k, H.pos.length)) fails.push('the places shared follow a pattern: ' + k.join(''));
          if (H.all && new Set(k).size < 3) fails.push('not every place is shared at least once');
          if (H.three && odd.length === H.rows && !placesOk(odd, 3)) fails.push('the third pictures stand in a pattern: ' + odd.join(''));
        }
        return fails;
      }, SPEC, INFO);
    },
  };
}

module.exports = { makeSoundPositionG1Type, spFaultsOf, drawPage, LEVELS, INSTR, LINES, SPEC, MODES, placesOk, shareOf };
