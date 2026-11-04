/**
 * G1-500 — Open Cloze (Sentences maker 2026-11-02, NEW-TEMPLATES §47 T2; L.1.1 / RF.1.4.c use context; de
 * "Lückentext", fr "texte à trous"): sentences with one gap and no word bank; the child writes the missing word. The
 * bank sentences gap their picture noun and show its picture beside the sentence, as many as the sentence says (the picture makes the one right word;
 * data/b2/sentences.js frames, the G1-249 rules); the teacher may type her own sentence instead and mark the gap in
 * square brackets — "The cat sleeps on the [mat]." — with other words she accepts after a comma ("[mat, rug]")
 * (sentences-Q1: an open cloze is allowed with own text; her sentence carries a small pencil, teacher-made, and no
 * picture). Level 1 gives one box per letter; levels 2-3 one box for the word. Every box is an answer box.
 * Levels: 1 five sentences, letter boxes · 2 six sentences · 3 eight sentences.
 */
'use strict';
const { frameSentences } = require('../_shared/sentence-items.js');
const slot = require('../../lib/slot.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 5, letters: true, px: 70 }, 2: { n: 6, letters: false, px: 62 }, 3: { n: 8, letters: false, px: 50 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const PENCIL = `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style="flex:0 0 auto"><path d="M4 20l1-5L15 5l4 4L9 19z" fill="none" stroke="${T.teal}" stroke-width="2" stroke-linejoin="round"/><path d="M13 7l4 4" stroke="${T.teal}" stroke-width="2"/></svg>`;

/** the teacher's sentence: exactly one [gap], the answer letters only, an end mark → { before, answer, alts, after } */
function ownGap(s) {
  const m = String(s).match(/^([^[\]]*)\[([^[\]]+)\]([^[\]]*)$/);
  if (!m || !/[.?!]$/.test(s.trim())) return null;
  const words = m[2].split(/[,|]/).map((w) => w.trim()).filter(Boolean);
  if (!words.length || words.some((w) => !/^[\p{L}'-]{1,20}$/u.test(w))) return null;
  if (!/\p{L}/u.test(m[1] + m[3])) return null;
  return { before: m[1], answer: words[0], alts: words.slice(1), after: m[3] };
}

module.exports = {
  id: 'G1-500',
  slug: 'open-cloze',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'cloze',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Fill in the Blank', instruction: 'Read each sentence. Look at the picture and write the missing word.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const items = frameSentences({ locale: L, theme, rng, n: d.n, maxTokens: 9 });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const rows = items.map((it, i) => {
      // the bank sentence with its noun as the gap (the first time the noun stands as a whole word)
      const re = new RegExp(`(^|[^\\p{L}])(${it.noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\p{L}])`, 'u');
      const m = it.canonical.match(re);
      if (!m) throw new Error(`G1-500: ${L} the noun "${it.noun}" is not in "${it.canonical}"`);
      const at = m.index + m[1].length;
      let gap = { before: it.canonical.slice(0, at), answer: it.noun, alts: [], after: it.canonical.slice(at + it.noun.length) };
      const typed = slot.text(ctx, `${gap.before}[${gap.answer}]${gap.after}`, 'sent' + i, 90);
      let own = false;
      if (typed !== `${gap.before}[${gap.answer}]${gap.after}`) { const g = ownGap(typed); if (g) { gap = g; own = true; } else slot.refuse(ctx, 'sent' + i); }
      const n = [...gap.answer].length;
      const letterBoxes = d.letters && !gap.alts.length;
      // a letter box is 32 px wide, 3 px apart (2026-11-04, screen-geometry: at 30 px the screen's tap targets could not reach
      // the 34-px floor without overlapping the next letter)
      const box = letterBoxes
        ? `<span style="display:inline-flex;gap:3px;vertical-align:middle;margin:0 4px">${[...gap.answer].map((ch) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(ch)}"` : ''} style="display:inline-flex;width:32px;height:40px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:7px;background:#FFFFFF"></span>`).join('')}</span>`
        : `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(gap.answer)}"${gap.alts.length ? ` data-lcs-alts="${esc(gap.alts.join('|'))}"` : ''}` : ''} style="display:inline-flex;vertical-align:middle;width:${Math.min(240, Math.max(130, n * 16 + 30))}px;height:42px;margin:0 4px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
      // as many of the thing as the sentence says (three cats: three pictures)
      const k = Math.round(d.px * (it.count > 3 ? 0.5 : 0.62));
      const pic = own ? PENCIL : `<span data-lcs-cloze-pics="${it.count}" style="display:flex;flex-wrap:wrap;justify-content:center;gap:2px;width:${d.px * 1.3}px">${Array.from({ length: it.count }, () => `<img class="ws-icon" src="${it.src}" alt="" style="width:${k}px;height:${k}px;object-fit:contain">`).join('')}</span>`;
      return slot.stamp(ctx, 'sent' + i, 0, `<div data-lcs-cloze-row="${i + 1}" data-lcs-own="${own ? 1 : 0}" style="display:flex;align-items:center;gap:14px;padding:4px 12px;border-radius:14px;background:${T.cream}">`) +
        `<span style="flex:0 0 ${Math.round(d.px * 1.3)}px;display:flex;justify-content:center">${pic}</span>` +
        `<div style="flex:1;min-width:0;font:700 24px/1.6 'Baloo 2',cursive;color:${T.ink}">${esc(gap.before)}${box}${esc(gap.after)}</div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-cloze style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}</div>`,
      meta: { sentences: items.map((it) => it.canonical.replace(it.noun, `[${it.noun}]`)) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-cloze-row]')];
      if (rows.length < 5) fails.push(`${rows.length} sentences`);
      const root = document.querySelector('[data-lcs-cloze]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`sentence ${i + 1} leaves the page`);
        const im = r.querySelector('img'); if (im && (!im.complete || !im.naturalWidth)) fails.push(`sentence ${i + 1}: the picture did not load`);
        if (!r.querySelector('.ws-answerbox')) fails.push(`sentence ${i + 1} has no gap`);
      });
      return fails;
    });
  },
};
