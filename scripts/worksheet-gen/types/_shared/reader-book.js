/**
 * reader-book.js — the readers of the Daily Teaching System (Part 8): one mini-book = one sheet folded twice.
 *
 * Books, word list and gate live in scripts/readers/ (books.<loc>.js, gate.js). A book that does not pass the gate
 * is never built: build() runs the gate on the book it prints and throws.
 *
 *   mode 'first'   a decodable mini-book: cover with the title and a line for the child's name as illustrator; three
 *                  pages with the text and an empty frame. NO picture: the child reads, then draws what the page says
 *                  (no picture can give a word away).
 *   mode 'theme'   a picture reader: cover with the title and a library picture; three pages, each a picture and its
 *                  sentence. `bw: true` prints the line-art drawings of the same pictures (to colour); a book has that
 *                  version only when EVERY picture has its line-art drawing.
 *   mode 'talk'    the companion page of any book: the whole text once more in large type, the new sounds and warm-up
 *                  words (decodable books), the book's words by kind, two or three questions for the adult, boxes to
 *                  tick for each reading, and the teacher's line.
 *
 * The fold is the one of the Mini Coloring Booklet (K-516, types/_shared/coloring-page.js): top left page 3, top
 * right page 2 (both upside down), bottom left page 4, bottom right the cover; verify() asserts '3u,2u,4,1'.
 * A page's text breaks where the book says (" | "): a line never wraps by itself, and no word stands alone on a line.
 * A unit = a book (unitAxis); a language without books of the series has no unit and the type refuses it.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const tokens = require('../../primitives/_tokens.js');
const { fileUri } = require('../../lib/b2-common.js');
const { manifest } = require('../../image-cache/resolve.js');

const READERS = path.join(__dirname, '..', '..', '..', 'readers');
const booksOf = (loc) => { const f = path.join(READERS, 'books.' + loc + '.js'); return fs.existsSync(f) ? require(f) : []; };
const gateOf = () => require(path.join(READERS, 'gate.js'));
const lexOf = (loc) => JSON.parse(fs.readFileSync(path.join(READERS, 'lexicon.' + loc + '.json'), 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const INK = tokens.color.ink, TEAL = tokens.color.teal, SOFT = tokens.color.inkSoft, CORAL = tokens.color.coral, GRID = tokens.color.grid;
const DISPLAY = `'Baloo 2',cursive`, BODY = `'Nunito',sans-serif`;
const MAX_LINE = 22;   // letters and spaces a printed line of a page may hold at 22 px or more in a 300 px column
const linesOf = (text) => text.split('|').map((x) => x.trim());
const twin = (p) => { const th = manifest().themes; return Object.keys(th).find((t) => t.toLowerCase() === (p.theme + ' bw').toLowerCase() && th[t].nouns[p.noun]); };

/** the picture a page prints: the colour drawing, or its line-art twin (theme "<name> bw") for the version to colour */
function pictureOf(p, bw, id) {
  const themes = manifest().themes;
  const theme = bw ? twin(p) : p.theme;
  if (bw && !theme) throw new Error(`${id}: no line-art drawing of ${p.theme}/${p.noun} — the book is refused in the version to colour`);
  if (!themes[theme] || !themes[theme].nouns[p.noun]) throw new Error(`${id}: no picture ${theme}/${p.noun} in the library — refused`);
  return { theme, noun: p.noun };
}
const img = (pic, px, word) => `<img class="ws-icon" src="${fileUri(pic.theme, pic.noun)}" alt="" data-lcs-pic="${esc(word || pic.noun)}" style="width:${px}px;height:${px}px;object-fit:contain">`;

function makeReaderBook(cfg) {
  // the version to colour exists only for a book whose EVERY picture has its line-art twin (the same drawing)
  const mine = (loc) => booksOf(loc).filter((b) => (cfg.mode === 'talk' ? true : b.series === cfg.mode && (!cfg.bw || [b.cover, ...b.pics].every(twin))));
  return {
    id: cfg.id, slug: cfg.slug, gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: 'readers',
    themeAxis: { applicable: false },
    unitAxis: {
      applicable: true,
      units: (loc) => mine(loc).map((b) => b.id),
      exemplar: (loc) => (mine(loc)[0] || {}).id,
      tokens: (unit, loc) => { const b = booksOf(loc).find((x) => x.id === unit); const t = b ? b.title : unit; return { U: t, L: t, UNIT: t }; },
    },
    difficulty: { 1: {}, 2: {}, 3: {} },
    i18n: cfg.i18n,
    levelSetWords(m) { return [m.book]; },
    // the page title names a BOOK, not a worksheet (emit/deck-html.js)
    noWorksheetWord: true,
    seoName: (title, loc) => ((cfg.i18n[loc] || cfg.i18n.en).seoName || '{T}').replace('{T}', title),

    build({ locale, unit }, ctx) {
      const loc = (locale || 'en').slice(0, 2);
      const books = mine(loc);
      if (!books.length) throw new Error(`${cfg.id}: no ${cfg.mode === 'talk' ? '' : cfg.mode + ' '}reader in "${loc}" — refused (every language gets its own books)`);
      const b = unit ? books.find((x) => x.id === unit) : books[0];
      if (!b) throw new Error(`${cfg.id}: no book "${unit}" in "${loc}"`);
      const gate = gateOf(); const lex = lexOf(loc);
      const problems = gate.checkBook(b, lex);
      if (problems.length) throw new Error(`${cfg.id}: the book ${b.id} does not pass the gate — ${problems.join('; ')}`);
      for (const [i, t] of b.pages.entries()) for (const ln of linesOf(t)) if ([...ln].length > MAX_LINE) throw new Error(`${cfg.id}: ${b.id} page ${i + 2}: the line "${ln}" holds ${[...ln].length} characters (${MAX_LINE} at most: break it with " | ")`);
      const S = (k) => (cfg.i18n[loc] || cfg.i18n.en)[k] || cfg.i18n.en[k];
      const extra = (ctx && ctx.chromeExtra) || 0;
      const tag = b.series === 'first' ? S('stage').replace('{N}', b.stage).replace('{L}', gate.stageName(b.stage)) : S('level').replace('{N}', b.level);

      if (cfg.mode === 'talk') {
        const w = gate.wordsOf(b, lex);
        const warm = gate.warmUp(b, lex);
        const kinds = b.series === 'first' ? [['decodable', S('wSound')], ['heart', S('wHeart')]] : [['new', S('wNew')], ['picture', S('wPicture')], ['sight', S('wSight')], ['decodable', S('wSound')]];
        const chip = (x, kind) => `<span style="display:inline-block;padding:2px 11px;margin:3px 4px;border:2px solid ${GRID};border-radius:14px;font:800 19px ${BODY};color:${INK};background:#FFFFFF" data-lcs-word="${esc(x)}" data-lcs-kind="${kind}">${esc(x)}</span>`;
        const head = (t) => `<div style="font:700 18px ${DISPLAY};color:${TEAL};margin:0 0 3px">${esc(t)}</div>`;
        // a book with two sentences a page prints its text a size smaller here, so the page keeps room for the questions
        const long = Math.max(...b.pages.map((t) => gate.plain(t).length)) > 34;
        const lines = b.pages.map((t, i) => `<div style="display:flex;align-items:baseline;gap:14px;margin:6px 0"><span style="flex:0 0 26px;height:26px;border-radius:50%;background:${TEAL};color:#FFFFFF;font:700 15px ${DISPLAY};display:inline-flex;align-items:center;justify-content:center">${i + 2}</span>` +
          `<span style="font:800 ${long ? 21 : 25}px/1.25 ${BODY};color:${INK}" data-lcs-text="${i + 2}">${esc(gate.plain(t))}</span></div>`).join('');
        const boxes = `<span style="display:inline-flex;align-items:center;gap:8px;font:700 16px ${BODY};color:${INK}" data-lcs-read-boxes>${esc(S('readIt'))}${[1, 2, 3].map(() => `<span style="display:inline-block;width:22px;height:22px;border:2.5px solid ${TEAL};border-radius:6px;background:#FFFFFF"></span>`).join('')}</span>`;
        const first = b.series === 'first'
          ? `<div class="ws-card" style="padding:12px 22px;display:grid;grid-template-columns:auto 1fr;gap:4px 26px;align-items:center" data-lcs-warm>` +
            `<div>${head(S('wNewSounds'))}<div style="font:800 28px ${BODY};color:${CORAL};letter-spacing:0.1em" data-lcs-new-sounds>${esc(gate.stageName(b.stage))}</div></div>` +
            `<div>${head(S('warm'))}<div>${warm.map((x) => chip(x, 'warm')).join('')}</div></div></div>` : '';
        const present = kinds.filter(([k]) => w[k].length);
        const body = `<div style="flex:1;display:flex;flex-direction:column;gap:${long ? 7 : 10}px;width:660px;margin:0 auto" data-ws-content data-lcs-reader-talk="${esc(b.id)}">` +
          first +
          `<div class="ws-card" style="padding:12px 22px" data-lcs-story><div style="display:flex;justify-content:space-between;align-items:baseline">${head(b.title)}<span style="font:700 13px ${BODY};color:${SOFT}">${esc(tag)}</span></div>${lines}</div>` +
          `<div class="ws-card" style="padding:12px 22px;${present.length > 2 ? 'display:grid;grid-template-columns:1fr 1fr;gap:4px 20px' : ''}" data-lcs-words>${present.map(([k, label]) => `<div style="margin:3px 0">${head(label)}<div>${w[k].map((x) => chip(x, k)).join('')}</div></div>`).join('')}</div>` +
          `<div class="ws-card" style="padding:12px 22px;flex:1" data-lcs-talk><div style="display:flex;justify-content:space-between;align-items:center">${head(S('talk'))}${boxes}</div>${b.talk.map((q, i) => `<div style="display:flex;gap:10px;margin:${long ? 5 : 8}px 0;font:700 ${long ? 17 : 18}px/1.25 ${BODY};color:${INK}"><span style="color:${CORAL}">${i + 1}.</span><span data-lcs-question>${esc(q)}</span></div>`).join('')}</div>` +
          `<div style="font:600 ${b.note.length > 190 ? 12.5 : 13.5}px/1.3 ${BODY};color:${SOFT};padding:0 6px" data-lcs-teacher-note><b>${esc(S('teacher'))}</b> ${esc(b.note)}</div></div>`;
        return { bodyHtml: body, meta: { book: b.id, series: b.series, stage: b.stage || null, level: b.level || null } };
      }

      const pw = 330, ph = Math.floor((706 - extra) / 2);
      const pageNo = (k) => `<span style="position:absolute;right:10px;bottom:6px;font:700 16px ${DISPLAY};color:${SOFT}" data-lcs-page-no="${k}">${k}</span>`;
      const panel = (inner, k, flip) => `<div style="position:relative;box-sizing:border-box;width:${pw}px;height:${ph}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px 12px 22px;${flip ? 'transform:rotate(180deg);' : ''}" data-lcs-booklet-page="${k}"${flip ? ' data-lcs-upside-down="1"' : ''}>${inner}${pageNo(k)}</div>`;
      // the type size follows the longest line the book sets: a line never wraps by itself
      const sizeOf = (t) => { const longest = Math.max(...linesOf(t).map((l) => [...l].length)); return Math.max(22, Math.min(30, Math.floor(296 / (longest * 0.6)))); };
      const textH = (t) => Math.ceil(linesOf(t).length * sizeOf(t) * 1.3);
      const sentence = (t, k) => `<div style="font:800 ${sizeOf(t)}px/1.3 ${BODY};color:${INK};text-align:center;word-spacing:0.12em" data-lcs-text="${k}" data-lcs-lines="${linesOf(t).length}">${linesOf(t).map((l) => `<span style="display:block;white-space:nowrap" data-lcs-line>${esc(l)}</span>`).join('')}</div>`;
      const titleHtml = `<div style="font:700 ${[...b.title].length > 14 ? 30 : 36}px/1.1 ${DISPLAY};color:${TEAL};text-align:center" data-lcs-cover-name>${esc(b.title)}</div>`;
      const tagHtml = `<span style="position:absolute;left:10px;bottom:7px;font:700 12.5px ${BODY};color:${SOFT}" data-lcs-book-tag>${esc(tag)}</span>`;
      let pages; let pictures = [];
      if (cfg.mode === 'first') {
        const frame = (k, t) => `<div style="width:${pw - 56}px;height:${ph - 62 - textH(t)}px;border:2.5px dashed ${GRID};border-radius:16px;background:#FFFFFF" data-lcs-draw-frame="${k}"></div>`;
        const by = `<div style="display:flex;align-items:flex-end;gap:8px;font:700 17px ${BODY};color:${INK}" data-lcs-by><span>${esc(S('by'))}</span><span style="display:inline-block;width:150px;border-bottom:2px solid ${SOFT}"></span></div>`;
        pages = { 1: titleHtml + `<div style="width:${pw - 110}px;height:${ph - 210}px;border:2.5px dashed ${GRID};border-radius:16px;background:#FFFFFF" data-lcs-draw-frame="1"></div>` + by + tagHtml };
        b.pages.forEach((t, i) => { pages[i + 2] = frame(i + 2, t) + sentence(t, i + 2); });
      } else {
        const cover = pictureOf(b.cover, cfg.bw, cfg.id);
        const pics = b.pics.map((p) => pictureOf(p, cfg.bw, cfg.id));
        pictures = [cover, ...pics].map((p) => p.theme + '/' + p.noun);
        pages = { 1: titleHtml + img(cover, Math.min(170, ph - 150)) + tagHtml };
        // a picture is 205 px unless the book scales it (the little mouse, the very big whale); never past its page
        b.pages.forEach((t, i) => { const room = Math.min(ph - 62 - textH(t), pw - 40); pages[i + 2] = img(pics[i], Math.round(Math.min(room, 205 * (b.pics[i].scale || 1))), b.pics[i].words[0]) + sentence(t, i + 2); });
      }
      const sheet = `<div style="position:relative;display:grid;grid-template-columns:${pw}px ${pw}px;grid-template-rows:${ph}px ${ph}px;border:2px solid #E6DCCB;background:#FFFFFF" data-lcs-booklet data-lcs-reader="${esc(b.id)}" data-lcs-texts="${esc(JSON.stringify(b.pages.map((t) => linesOf(t).join(''))))}">` +
        panel(pages[3], 3, true) + panel(pages[2], 2, true) + panel(pages[4], 4, false) + panel(pages[1], 1, false) +
        `<div style="position:absolute;left:0;right:0;top:${ph - 1}px;border-top:2px dashed ${SOFT}" data-lcs-fold="1"></div>` +
        `<div style="position:absolute;top:0;bottom:0;left:${pw - 1}px;border-left:2px dashed ${SOFT}" data-lcs-fold="2"></div></div>`;
      const body = `<div style="flex:1;display:flex;align-items:center;justify-content:center" data-ws-content data-lcs-pictures="${pictures.length}">${sheet}</div>`;
      return { bodyHtml: body, meta: { book: b.id, series: b.series, stage: b.stage || null, level: b.level || null, pictures, texts: b.pages } };
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        if (mode === 'talk') {
          const root = document.querySelector('[data-lcs-reader-talk]');
          if (!root) return ['no companion page'];
          if (document.querySelectorAll('[data-lcs-text]').length !== 3) fails.push('the text has not three lines');
          const q = document.querySelectorAll('[data-lcs-question]').length; if (q < 2 || q > 3) fails.push(q + ' questions');
          if (!document.querySelectorAll('[data-lcs-word]').length) fails.push('no word list');
          if (!document.querySelector('[data-lcs-teacher-note]')) fails.push('no teacher line');
          if (!document.querySelector('[data-lcs-read-boxes]')) fails.push('no boxes to tick for each reading');
          const warm = [...document.querySelectorAll('[data-lcs-kind="warm"]')].map((x) => x.textContent);
          const inBook = new Set([...document.querySelectorAll('[data-lcs-word]:not([data-lcs-kind="warm"])')].map((x) => x.textContent.toLowerCase()));
          if (document.querySelector('[data-lcs-warm]') && (warm.length < 4 || warm.some((x) => inBook.has(x.toLowerCase())))) fails.push('the warm-up words: ' + warm.length + ' words, or one of them stands in the book');
          const R = document.querySelector('[data-ws-content]').getBoundingClientRect();
          root.querySelectorAll('[data-lcs-text],[data-lcs-question],[data-lcs-word],[data-lcs-teacher-note],[data-lcs-read-boxes]').forEach((x) => { const r = x.getBoundingClientRect(); if (r.left < R.left - 1 || r.right > R.right + 1 || r.bottom > R.bottom + 1) fails.push('text leaves the page: ' + x.textContent.slice(0, 30)); });
          return fails;
        }
        const pages = [...document.querySelectorAll('[data-lcs-booklet-page]')].map((p) => p.dataset.lcsBookletPage + (p.dataset.lcsUpsideDown ? 'u' : ''));
        if (pages.join() !== '3u,2u,4,1') fails.push('the book is not laid out to fold: ' + pages.join());
        if (document.querySelectorAll('[data-lcs-fold]').length !== 2) fails.push('the two fold lines are missing');
        const texts = JSON.parse(document.querySelector('[data-lcs-booklet]').dataset.lcsTexts);
        document.querySelectorAll('[data-lcs-booklet-page]').forEach((p) => {
          const R0 = p.getBoundingClientRect(); const k = p.dataset.lcsBookletPage;
          p.querySelectorAll('img,[data-lcs-line],[data-lcs-cover-name],[data-lcs-draw-frame],[data-lcs-by],[data-lcs-book-tag]').forEach((x) => { const r = x.getBoundingClientRect(); if (r.left < R0.left + 3 || r.right > R0.right - 3 || r.top < R0.top + 3 || r.bottom > R0.bottom - 3) fails.push('page ' + k + ': something leaves the page (' + (x.textContent || x.tagName).slice(0, 24) + ')'); });
          if (k !== '1') {
            const t = p.querySelector('[data-lcs-text]'); if (!t) { fails.push('page ' + k + ' has no text'); return; }
            if (t.textContent !== texts[Number(k) - 2]) fails.push('page ' + k + ' prints another text than the book');
            if (parseFloat(getComputedStyle(t).fontSize) < 22) fails.push('page ' + k + ': the type is smaller than 22 px');
            const lines = [...t.querySelectorAll('[data-lcs-line]')];
            if (lines.length > 1 && lines[lines.length - 1].textContent.trim().split(' ').length < 2) fails.push('page ' + k + ': the last line holds one word alone');
            const has = mode === 'first' ? p.querySelector('[data-lcs-draw-frame]') : p.querySelector('img');
            if (!has) fails.push('page ' + k + (mode === 'first' ? ' has no frame to draw in' : ' has no picture'));
            if (mode === 'first' && p.querySelector('img')) fails.push('page ' + k + ': a decodable page carries a picture');
            if (mode === 'first' && has && has.getBoundingClientRect().height < 110) fails.push('page ' + k + ': the frame to draw in is lower than 110 px');
          }
        });
        const imgs = [...document.querySelectorAll('[data-lcs-booklet] img')];
        if (mode !== 'first' && imgs.length !== 4) fails.push(imgs.length + ' pictures (a cover and three pages)');
        if (imgs.some((i) => !i.complete || !i.naturalWidth)) fails.push('a picture did not load');
        return fails;
      }, cfg.mode);
    },
  };
}
module.exports = { makeReaderBook };
