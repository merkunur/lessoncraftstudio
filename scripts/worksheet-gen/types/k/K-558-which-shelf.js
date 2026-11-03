/**
 * K-558 — Which Shelf? (Ordinal Numbers maker 2026-11-02, NEW-TEMPLATES §52 T2; K.CC ordinals to 10 read VERTICALLY —
 * the line faces only read across; de "Wer wohnt in welchem Stock?" pages, nl "rangtelwoorden kleuters"): a bookcase,
 * one picture on each shelf, the shelves counted from the bottom; questions ask what is on the k-th shelf (circle the
 * picture) and which shelf a picture is on (circle the ordinal). A bookcase, never the floors of a house (the first
 * floor is the ground floor in en-US, one up in de / fr / es …). The questions are literals per locale
 * (data/ordinal-numbers/shelf.js), the ordinals the reviewed bank (types/_shared/ordinal-more.js). Every circled
 * answer is a choice; the right one is ringed on the key.
 * Levels: 1 four shelves, each labelled 1st … 4th · 2 six shelves, only the bottom one labelled (1st) · 3 six shelves, an
 * arrow up beside the bottom one (count from there). No person on a shelf (a baby on a shelf), no two animals that look
 * alike in one bookcase (donkey and horse, leopard and tiger), and the questions never run straight up or down (the
 * answer would follow the question number) — native review 2026-11-02.
 */
'use strict';
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const { SHELF } = require('../../data/ordinal-numbers/shelf.js');
const { ord } = require('../_shared/ordinal-more.js');
const { bank } = require('../../lib/b3-common.js');
const T = require('../../primitives/_tokens.js').color;

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const D = { 1: { shelves: 4, labels: 'all', q: 4 }, 2: { shelves: 6, labels: 'bottom', q: 4 }, 3: { shelves: 6, labels: 'arrow', q: 4 } };
// people never stand on a shelf; animals a child confuses at this size never share a bookcase (beside the bank's twins)
const PEOPLE = new Set(['baby', 'girl', 'boy', 'man', 'woman', 'child', 'student', 'teacher']);
const ALIKE = [['donkey', 'horse', 'foal', 'zebra'], ['reindeer', 'moose', 'deer', 'antelope', 'gazelle'], ['leopard', 'tiger', 'cheetah', 'jaguar', 'lion'],
  ['doll', 'baby'], ['wolf', 'dog', 'fox'], ['frog', 'toad'], ['alligator', 'crocodile', 'lizard'], ['rabbit', 'hare', 'bunny']];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const WOOD = '#C8935A', WOOD_DARK = '#9C6B3C';

module.exports = {
  id: 'K-558',
  slug: 'which-shelf',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'ordinal-numbers',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Which Shelf?', instruction: 'Count the shelves from the bottom. Answer each question: circle the right picture or the right shelf.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const S = SHELF[L];
    if (!S) throw new Error(`K-558: no questions for ${L}`);
    const pool = entriesFor(theme, L).filter((e) => !nameRefused(theme, e.noun) && !REFUSED_NOUNS.has(e.noun) && !PEOPLE.has(e.vocabKey));
    if (pool.length < d.shelves) throw new Error(`K-558: theme ${theme}/${L} has ${pool.length} pictures (< ${d.shelves})`);
    // never two pictures of one word, nor two the bank marks as twins at this size (data/b3/ordinals.js lookalikes)
    const twins = ((bank('ordinals', 'en').lookalikes || {})[theme] || []);
    const group = (e) => { const g = twins.findIndex((grp) => grp.includes(e.noun)); if (g >= 0) return 'g:' + g; const a = ALIKE.findIndex((grp) => grp.includes(e.vocabKey)); return a >= 0 ? 'a:' + a : 'k:' + (e.vocabKey || e.noun); };
    const pics = [], used = new Set();
    for (const e of rng.shuffle(pool)) { if (pics.length === d.shelves) break; const g = group(e); if (!used.has(g)) { used.add(g); pics.push(e); } }
    if (pics.length < d.shelves) throw new Error(`K-558: theme ${theme}/${L} has ${pics.length} different pictures (< ${d.shelves})`);
    // pics[k-1] stands on the k-th shelf from the bottom
    const spots = pics.map(() => rng.pick(['flex-start', 'center', 'flex-end']));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const H = Math.floor(640 / d.shelves), px = Math.min(76, H - 22);
    const shelves = [];
    for (let k = d.shelves; k >= 1; k--) {
      const show = d.labels === 'all' || (d.labels === 'bottom' && k === 1);
      const lab = `<span data-lcs-shelf-label style="flex:0 0 auto;width:58px;text-align:right;font:700 ${show ? 22 : 30}px/1 'Baloo 2',cursive;color:${T.teal}">${show ? esc(ord(k, L, S.fem ? 'f' : 'm').notation) : d.labels === 'arrow' && k === 1 ? '↑' : ''}</span>`;
      shelves.push(`<div data-lcs-shelf="${k}" style="display:flex;align-items:flex-end;gap:10px;height:${H}px;box-sizing:border-box">${lab}` +
        `<div style="flex:1;height:100%;display:flex;align-items:flex-end;justify-content:${spots[k - 1]};padding:0 14px;box-sizing:border-box;border-left:8px solid ${WOOD_DARK};border-right:8px solid ${WOOD_DARK};border-bottom:10px solid ${WOOD}">` +
        `<img class="ws-icon" src="${fileUri(theme, pics[k - 1].noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;margin-bottom:2px"></div></div>`);
    }
    // the top board sits right on the top shelf; the bookcase stands on the bottom of the page
    const bookcase = `<div data-lcs-bookcase style="width:290px;display:flex;flex-direction:column;justify-content:flex-end"><div style="margin-left:68px;height:10px;background:${WOOD_DARK}"></div><div style="padding-top:6px">${shelves.join('')}</div></div>`;
    // the questions: alternately "what is on the k-th shelf?" (three pictures) and "which shelf?" (three ordinals)
    let ks;
    do { ks = rng.sample(Array.from({ length: d.shelves }, (_, i) => i + 1), d.q); }
    while (ks.every((v, i) => !i || v === ks[i - 1] + 1) || ks.every((v, i) => !i || v === ks[i - 1] - 1));
    const choice = (inner, right) => `<span data-lcs-pick="1"${mark && right ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;min-width:64px;height:64px;padding:0 10px;box-sizing:border-box;border:2.5px solid ${T.grid};border-radius:14px;background:#FFFFFF">${inner}</span>`;
    const others = (k) => rng.sample(Array.from({ length: d.shelves }, (_, i) => i + 1).filter((x) => x !== k), 2);
    const qs = ks.map((k, i) => {
      const opts = rng.shuffle([k, ...others(k)]);
      if (i % 2 === 0) {
        return `<div data-lcs-shelf-q="what" data-lcs-k="${k}" style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border-radius:14px;background:${T.cream}">` +
          `<div style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(S.what[k])}</div>` +
          `<div class="ws-choices" style="display:flex;gap:14px;justify-content:center">${opts.map((o) => choice(`<img class="ws-icon" src="${fileUri(theme, pics[o - 1].noun)}" alt="" style="width:50px;height:50px;object-fit:contain">`, o === k)).join('')}</div></div>`;
      }
      return `<div data-lcs-shelf-q="which" data-lcs-k="${k}" style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border-radius:14px;background:${T.cream}">` +
        `<div style="display:flex;align-items:center;gap:12px"><img class="ws-icon" src="${fileUri(theme, pics[k - 1].noun)}" alt="" style="width:50px;height:50px;object-fit:contain"><span style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(S.which)}</span></div>` +
        `<div class="ws-choices" style="display:flex;gap:14px;justify-content:center">${opts.map((o) => choice(`<span style="font:700 26px/1 'Baloo 2',cursive;color:${T.ink}">${esc(ord(o, L, S.fem ? 'f' : 'm').notation)}</span>`, o === k)).join('')}</div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-which-shelf style="flex:1;display:flex;gap:22px;align-items:stretch;min-height:0">${bookcase}` +
        `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px">${qs.join('')}</div></div>`,
      meta: { shelves: pics.map((p) => p.vocabKey || p.noun), questions: ks },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const shelves = [...document.querySelectorAll('[data-lcs-shelf]')].map((s) => +s.dataset.lcsShelf);
      if (shelves.join() !== [...shelves].sort((a, b) => b - a).join()) fails.push('the shelves are not counted from the bottom');
      const qs = [...document.querySelectorAll('[data-lcs-shelf-q]')];
      if (qs.length < 3) fails.push(`${qs.length} questions`);
      const root = document.querySelector('[data-lcs-which-shelf]').getBoundingClientRect();
      [...qs, document.querySelector('[data-lcs-bookcase]')].forEach((e, i) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
      document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      return fails;
    });
  },
};
