/**
 * coloring-page.js — the Coloring Pages maker's composer (2026-11-02; ENGINES Part 3 §E, ENGINES-ART §9). Black-and-white
 * line drawings of the image library ONLY (a colour theme is refused: a page never mixes colour and line art, and a
 * colour picture is nothing to colour). One engine, four modes:
 *   pictures  1 / 2 / 4 drawings in frames (the old `coloring` app's page)
 *   trace     each drawing with its name in dashed school letters to trace (level 3: and an empty line to write it)
 *   scene     several drawings standing in one big frame — a scene to colour, upright, never overlapping
 *   key       numbered drawings and a key: number → crayon + a colour word; the teacher may type every key line herself
 *             (free-text slots), so the key says what she wants ("your favourite colour") — an open page, never graded
 * Every drawing is a slot (`pic`, the theme's own drawings). No answer key: a coloring page is open. No screen: colouring
 * on paper is the task (screen verdict "writing").
 * Words come from image-vocabulary through the reviewed picture-word rules (lib/picture-word-review.js), so a caption is a
 * plain noun a child can name from the drawing.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { entriesFor, displayWord, traceable, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const { WORD_EXCLUDE, isPhrase, isNonNoun } = require('../../lib/picture-word-review.js');
const { strokeWordLane } = require('../../primitives/trace-path.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const tokens = require('../../primitives/_tokens.js');

// words a child should not trace as a picture's name here (the 2026-11-02 review): an English spelling (pt "Trailer"),
// a formal long word for what children call "auto" (it "Automobile")
const TRACE_SKIP = { pt: ['camper'], it: ['car'] };
const isBw = (th) => /\bbw(\s+\d+)?$/i.test(String(th || ''));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// the key's crayons: colours a child names without help, far apart on paper
const KEY_COLOURS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
const KEY_HEX = { red: tokens.codeColors.codeRed, blue: tokens.codeColors.codeBlue, yellow: tokens.codeColors.codeYellow, green: tokens.codeColors.codeGreen, orange: tokens.codeColors.codeOrange, purple: tokens.codeColors.codePurple };   // the palette's code colours (the page lint)

/** the drawings of a B&W theme a page may use (refused drawings out); `named`: only those with a plain, traceable name */
function poolFor(theme, loc, named, maxLetters) {
  if (!isBw(theme)) throw new Error(`coloring-page: ${theme} is a colour theme — coloring pages print line art only (refused)`);
  let pool = entriesFor(theme, loc).filter((e) => !refusedPicture(theme, e.noun));
  if (named) {
    pool = pool.map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => !WORD_EXCLUDE.all.includes(e.vocabKey) && !(WORD_EXCLUDE[loc] || []).includes(e.vocabKey) && !isNonNoun(e.vocabKey) && !isPhrase(e.word))
      .filter((e) => !(TRACE_SKIP[loc] || []).includes(e.vocabKey))
      .filter((e) => traceable(e.word) && [...e.word].length <= maxLetters);
    pool = distinctByWord(pool, (e) => e.word);
  }
  return pool;
}

const img = (theme, e, px, ctx, i, extra = '') =>
  `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${esc(e.vocabKey)}"${slot.attr(ctx, 'pic', i)}${extra} ` +
  `style="width:${px}px;height:${px}px;object-fit:contain">`;

/** a small crayon in a key colour (the swatch beside the key word: a B&W printer still prints the word) */
function crayon(hex, w = 70, h = 28) {
  const tip = 15, body = w - tip - 6;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" data-lcs-prim="crayon">` +
    `<path d="M3 5Q3 3 5 3H${body}L${body + tip} ${h / 2}L${body} ${h - 3}H5Q3 ${h - 3} 3 ${h - 5}Z" fill="${hex}" stroke="#3A3530" stroke-width="1.8" stroke-linejoin="round"/>` +
    `<path d="M${body} 3V${h - 3}" stroke="#3A3530" stroke-width="1.6"/></svg>`;
}

/** a round number badge on a drawing (the key mode) */
const badge = (n) => `<span style="position:absolute;left:8px;top:8px;width:40px;height:40px;border-radius:50%;background:#FFFFFF;border:3px solid ${tokens.color.teal};display:inline-flex;align-items:center;justify-content:center;font-family:'Baloo 2',cursive;font-weight:700;font-size:24px;color:#3A3530" data-lcs-badge="${n}">${n}</span>`;

function makeColoringPage(cfg) {
  return {
    id: cfg.id, slug: cfg.slug, gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: 'coloring-page',
    themeAxis: { applicable: true, minNouns: cfg.minNouns || 6, bwOnly: true, needsBwSibling: true },
    difficulty: cfg.difficulty,
    i18n: cfg.i18n,

    build({ theme, difficulty, locale }, ctx) {
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const rng = ctx.rng;
      const loc = (locale || 'en').slice(0, 2);
      const named = cfg.mode === 'trace';
      const pool = poolFor(theme, loc, named, d.maxLetters || 12);
      if (pool.length < d.n) throw new Error(`${cfg.id}: ${theme} has ${pool.length} drawings for ${d.n} (${loc}) — refused`);
      const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme, 'pic');
      // white frames: a coloring page is coloured on white paper (a cream card would print a tint under every crayon)
      const cardStyle = 'align-items:center;justify-content:center;gap:8px;padding:10px;background:#FFFFFF;border:2px solid #E6DCCB';
      let body;

      if (cfg.mode === 'pictures' || cfg.mode === 'trace') {
        const cols = d.n === 4 ? 2 : 1, rows = Math.ceil(d.n / cols);
        const cw = cols === 2 ? 324 : 660, ch = Math.floor((700 - (rows - 1) * 12) / rows);
        const cards = picks.map((e, i) => {
          let inner = img(theme, e, d.px, ctx, i);
          if (cfg.mode === 'trace') {
            const lane = strokeWordLane({ text: e.word, w: cw - 24, h: d.laneH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true, emptyLast: !!d.write, padLeft: 8, align: d.write ? 'left' : 'center' });
            inner += `<div data-lcs-caption="${esc(e.word)}">${lane.svg}</div>`;
          }
          return `<div class="ws-card" style="width:${cw}px;height:${ch}px;flex:0 0 auto;${cardStyle}" data-lcs-frame="${i + 1}">${inner}</div>`;
        });
        body = `<div style="flex:1;display:grid;grid-template-columns:repeat(${cols},${cw}px);gap:12px;justify-content:center;align-content:space-evenly" data-ws-content data-lcs-pictures="${d.n}">${cards.join('')}</div>`;
      } else if (cfg.mode === 'scene') {
        // one big frame: a jittered grid, one drawing a cell, upright, never overlapping (cells are larger than drawings)
        const W = 640, H = 690, cols = d.cols, rws = Math.ceil(d.n / cols), cellW = W / cols, cellH = H / rws;
        const cells = [];
        for (let r = 0; r < rws; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
        const at = rng.shuffle(cells).slice(0, d.n);
        const placed = picks.map((e, i) => {
          const [c, r] = at[i];
          const jx = Math.max(0, (cellW - d.px) / 2 - 4), jy = Math.max(0, (cellH - d.px) / 2 - 4);
          const x = c * cellW + (cellW - d.px) / 2 + (rng.next() * 2 - 1) * jx, y = r * cellH + (cellH - d.px) / 2 + (rng.next() * 2 - 1) * jy;
          return `<div style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${d.px}px;height:${d.px}px">${img(theme, e, d.px, ctx, i)}</div>`;
        });
        body = `<div style="flex:1;display:flex;align-items:center;justify-content:center" data-ws-content data-lcs-pictures="${d.n}">` +
          `<div class="ws-card" style="width:660px;height:710px;padding:10px;align-items:center;justify-content:center;background:#FFFFFF;border:2px solid #E6DCCB"><div style="position:relative;width:${W}px;height:${H}px" data-lcs-scene>${placed.join('')}</div></div></div>`;
      } else if (cfg.mode === 'key') {
        const words = COLOR_WORDS[loc] || COLOR_WORDS.en;
        const colours = rng.sample(KEY_COLOURS, d.n);
        const cols = d.n >= 3 ? 2 : 1, rows = Math.ceil(d.n / cols);
        const cw = cols === 2 ? 324 : 660, ch = Math.floor((560 - (rows - 1) * 12) / rows);
        const cards = picks.map((e, i) => `<div class="ws-card" style="width:${cw}px;height:${ch}px;flex:0 0 auto;position:relative;${cardStyle}" data-lcs-frame="${i + 1}">${badge(i + 1)}${img(theme, e, d.px, ctx, i)}</div>`);
        // the key: number · crayon · the colour word — every line a free-text slot (the teacher writes her own key)
        const lines = colours.map((c, k) => {
          const label = slot.text(ctx, words[c], 'key' + k, 20);
          return `<span style="display:inline-flex;align-items:center;gap:8px;height:52px;padding:0 12px;border:2px solid #E6DCCB;border-radius:14px;background:#FFFFFF" data-lcs-key-line="${k + 1}">` +
            `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:26px;color:#3A3530">${k + 1}</span>${crayon(KEY_HEX[c])}` +
            `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:19px;color:#3A3530;white-space:nowrap" data-lcs-key-word${slot.attr(ctx, 'key' + k, 0)}>${esc(label)}</span></span>`;
        });
        body = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:12px" data-ws-content data-lcs-pictures="${d.n}">` +
          `<div class="ws-card" style="width:660px;padding:10px 8px;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px" data-lcs-key>${lines.join('')}</div>` +
          `<div style="display:grid;grid-template-columns:repeat(${cols},${cw}px);gap:12px;justify-content:center">${cards.join('')}</div></div>`;
      } else throw new Error('coloring-page: unknown mode ' + cfg.mode);

      return { bodyHtml: body, meta: { theme, pictures: picks.map((e) => e.vocabKey) } };   // (a trace word follows from its picture)
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const want = +((document.querySelector('[data-lcs-pictures]') || {}).dataset || {}).lcsPictures || 0;
        const pics = [...document.querySelectorAll('img[data-lcs-pic]')];
        if (!want || pics.length !== want) fails.push(`${pics.length} drawings, want ${want}`);
        // line art only: every drawing from a black-and-white theme folder (the localized marker rule: EN dir names end "bw")
        for (const p of pics) { const src = decodeURIComponent(p.getAttribute('src') || ''); if (!/\bbw(\s+\d+)?\//i.test(src)) fails.push('a drawing outside the black-and-white themes: ' + src.slice(-60)); }
        const keys = pics.map((p) => p.dataset.lcsPic);
        if (new Set(keys).size !== keys.length) fails.push('a drawing twice on one page');
        // every drawing whole inside the page body, no two drawings overlapping
        const R = pics.map((p) => p.getBoundingClientRect());
        for (let i = 0; i < R.length; i++) for (let j = i + 1; j < R.length; j++) {
          const a = R[i], b = R[j];
          if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) fails.push(`drawings ${i + 1} and ${j + 1} overlap`);
        }
        if (mode === 'trace') {
          const caps = [...document.querySelectorAll('[data-lcs-caption]')];
          if (caps.length !== want) fails.push(`${caps.length} words to trace, want ${want}`);
          caps.forEach((c) => { const lane = c.querySelector('[data-lcs-prim="trace-word"]'); if (!lane || lane.getAttribute('data-lcs-text') !== c.getAttribute('data-lcs-caption')) fails.push('a trace lane does not trace its caption'); });
        }
        if (mode === 'key') {
          const lines = [...document.querySelectorAll('[data-lcs-key-line]')];
          if (lines.length !== want) fails.push(`${lines.length} key lines, want ${want}`);
          const badges = [...document.querySelectorAll('[data-lcs-badge]')].map((b) => +b.dataset.lcsBadge).sort((x, y) => x - y);
          if (badges.join() !== lines.map((_, k) => k + 1).join()) fails.push('the numbers on the drawings are not the key\'s numbers');
          if (lines.some((l) => !l.querySelector('[data-lcs-key-word]').textContent.trim())) fails.push('an empty key line');
        }
        return fails;
      }, cfg.mode);
    },
  };
}

module.exports = { makeColoringPage, isBw };
