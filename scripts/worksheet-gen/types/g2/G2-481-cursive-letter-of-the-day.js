/**
 * G2-481 — Cursive Letter of the Day (Cursive Handwriting maker 2026-11-02, NEW-TEMPLATES §35 T2): one letter of the
 * locale's school script practised in steps on school lines — the letter alone (the ink model in the margin, grey joined
 * chains of it), the letter joined to its neighbours (grey pairs), the letter in a word (grey word, then written alone).
 * The letter comes from the unit's own teaching order (G2-377's lessons, flattened): copy k = the k-th letter, so the
 * copies walk the script the way the country's school introduces it; a teacher may type the letter (a one-letter slot,
 * accepted only if it is a letter of the script's lessons). Pairs: the bank's reviewed joins that hold the letter first
 * (never a one-letter digraph, nl "ij"), then the letter joined to the vowels of the lessons; the word: a reviewed cursive
 * word (bank words, join words) holding the letter, at most 9 letters — none in the lists → that step is not printed.
 * Built on G2-377's face machinery (one unit, the locale's school ruling, ONE text node per grey item).
 * Levels: 1 the small letter alone and in pairs, two lines each · 2 the small letter alone, in pairs, in a word ·
 * 3 the CAPITAL alone (a pair "M M", capitals do not join each other) and in a name or word, then the small letter.
 * Budget 700 px less a teacher's longer title (fitsChrome); every step fills the page with one or two free lines.
 */
'use strict';
const G = require('./G2-377-cursive-writing.js');
const C6 = require('../../templates/components-b6.js');
const SR = require('../../primitives/school-ruling.js');
const slot = require('../../lib/slot.js');
const { color } = require('../../primitives/_tokens.js');
const CW = G._cw;
const ID = 'G2-481';

const D = {
  1: { steps: ['alone', 'pairs'] },
  2: { steps: ['alone', 'pairs', 'word'] },
  3: { steps: ['capital', 'name', 'alone'] },
};
const BUDGET = 700, MARGIN = 96, LEFT_PAD = 16;
const VOWELS = 'aeiouyäöüåæøéèàáíóú';

/** the unit's teaching order (lessons flattened, each letter once) */
function teachingOrder(bankLoc, u) { return [...new Set((bankLoc.lessons[u] || []).flat())]; }

/** up to 3 pairs holding the letter: the bank's reviewed joins first, then the letter joined to the lessons' vowels */
function pairsFor(L, bankLoc, ls, u, order, loc) {
  const one = CW.ONE_LETTER_DIGRAPHS[loc] || [];
  const out = [];
  const add = (p) => { if (out.length < 3 && p.length === 2 && p.includes(L) && !one.includes(p) && !out.includes(p) && [...p].every((ch) => order.includes(ch))) out.push(p); };
  for (const j of ((bankLoc.joins || {})[u] || []).concat((ls && ls.joinsMore) || [])) add(j.pair);
  const vowels = order.filter((ch) => VOWELS.includes(ch) && ch !== L);
  const cons = order.filter((ch) => !VOWELS.includes(ch) && ch !== L && ch !== 'ß');
  for (const v of vowels) add(L + v);
  for (const k of cons) add(k + L);
  return out;
}

/* letters a word must not carry unless it is the letter of the day: a loanword spelling or a rare letter around it
   (de Aquarium for u, nl aquarium for i, no sandwich for i — native review 2026-11-02). q everywhere; per locale the
   letters its own words rarely use */
const RARE = { en: 'q', de: 'qxy', fr: 'qkw', es: 'qkw', pt: 'qkwy', it: 'qjkwxy', nl: 'qx', da: 'cqwxz', no: 'cqwxz' };

/**
 * the word for the letter (lower: holding it; capital: starting with it), at most 9 letters, from the reviewed cursive
 * words (bank words, join words). Never a word with a rare letter the letter of the day is not (RARE); among the rest the
 * best: one that carries a pair the page just practised (+2), then a short one (≤ 6 letters, +1) — seeded choice among
 * the best. The capital: German capitalises its nouns, so a German noun may stand for its capital; elsewhere ONLY a
 * proper name of the locale's list (a common noun printed with a capital, nl "Ufo", teaches wrong capitalisation).
 */
function wordFor(L, capital, bankLoc, ls, u, rng, loc, pairs) {
  const low = L.toLocaleLowerCase(loc);
  const rare = [...(RARE[loc] || 'q')].filter((ch) => ch !== low);
  const ok = (w) => w && /^\p{L}+$/u.test(w) && [...w].length <= 9 && ![...w.toLocaleLowerCase(loc)].some((ch) => rare.includes(ch));
  let pool;
  if (capital) {
    const names = ((ls && ls.capitals) || []).filter((e) => e.capital === L && (loc === 'de' || e.kind !== 'word')).map((e) => e.word);
    const nouns = loc === 'de' ? Object.values(bankLoc.words || {}).map(CW.wordText).filter((w) => w && w[0] === L) : [];
    pool = names.concat(nouns).filter(ok);
  } else {
    const words = Object.values(bankLoc.words || {}).map(CW.wordText)
      .concat(((bankLoc.joins || {})[u] || []).map((j) => j.word), ((ls && ls.joinsMore) || []).map((j) => j.word));
    pool = words.filter((w) => ok(w) && w.toLocaleLowerCase(loc).includes(low));
  }
  pool = [...new Set(pool)].sort();
  if (!pool.length) return null;
  const score = (w) => ((pairs || []).some((p) => w.toLocaleLowerCase(loc).includes(p)) ? 2 : 0) + ([...w].length <= 6 ? 1 : 0);
  const best = Math.max(...pool.map(score));
  return rng.pick(pool.filter((w) => score(w) === best));
}

module.exports = {
  id: ID,
  slug: 'cursive-letter-of-the-day',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'cursive-writing',
  themeAxis: { applicable: false },
  // the base page's script (de: LA, as the published letters page)
  unitAxis: { ...G.unitAxis, exemplar: (loc) => { const b = CW.loadBank(CW.KEY, String(loc).slice(0, 2)); return (b.exemplarByMode && b.exemplarByMode.base) || b.exemplar; } },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Cursive Letter of the Day', instruction: 'Trace the grey letters, joining them, then write them on your own on the empty lines: the letter alone, joined to other letters, and in a word.' } },

  build({ difficulty, locale, unit }, ctx0) {
    const ctx = ctx0 || {}, rng = ctx.rng;
    const d = D[difficulty] || D[2], loc = String(locale || 'en').slice(0, 2);
    if (CW.NEUTRAL.refusedLocales[loc]) throw new Error(`${ID}: refused in ${loc}: no national joined school script (${CW.NEUTRAL.refusedLocales[loc]})`);
    const bankLoc = CW.loadBank(CW.KEY, loc), ls = CW.levelSetData(loc);
    const u0 = unit || (bankLoc.exemplarByMode && bankLoc.exemplarByMode.base) || bankLoc.exemplar;
    const capPage = d.steps.includes('capital');
    // the letter size + ruling of the borrowed face: the capitals face for the capital page, the joins face otherwise
    // at the BASE letters page's size (a letter-focus page: the letter as big as the school's first letters page)
    const ctxMode = capPage ? 'capitals' : 'joins', xp = bankLoc.xPx || {};
    const xNudge = Number.isFinite(xp.base) && Number.isFinite(xp[ctxMode]) ? Math.max(0, xp.base - xp[ctxMode]) : 0;
    const c = { ...CW.faceContext(bankLoc, { mode: ctxMode, xNudge }, loc, u0), typeId: ID, mode: 'copy' };
    const all = teachingOrder(bankLoc, c.unit);
    // a level offers only the letters that carry every step its instruction names (the word step needs a reviewed word:
    // da q, no j have none; the capital step a word that starts with the capital: pt Ç has none) — those letters stay on
    // level 1 (alone + pairs)
    const first = { pick: (a) => a[0] };
    const order = all.filter((ch) => {
      if (capPage && !(ch.toLocaleUpperCase(loc) !== ch && [...ch.toLocaleUpperCase(loc)].length === 1)) return false;
      if (d.steps.includes('word') && !wordFor(ch, false, bankLoc, ls, c.unit, first, loc)) return false;
      if (d.steps.includes('name') && !wordFor(ch.toLocaleUpperCase(loc), true, bankLoc, ls, c.unit, first, loc)) return false;
      return true;
    });
    if (!order.length) throw new Error(`${ID}: ${loc} ${c.unit} has no lesson letters`);
    const copy = Math.max(1, parseInt(String(ctx.variant || 1), 10) || 1);
    const own = order[(copy - 1) % order.length];
    let L = slot.text(ctx, own, 'letter', 1);
    if (!order.includes(L)) { if (L !== own) slot.refuse(ctx, 'letter'); L = own; }
    const C = L.toLocaleUpperCase(loc);
    // the steps this letter can carry (no reviewed word → the word step is not printed)
    const steps = [];
    for (const s of d.steps) {
      if (s === 'alone') steps.push({ s, model: L, grey: [L.repeat(3), L.repeat(3)] });
      else if (s === 'pairs') { const ps = pairsFor(L, bankLoc, ls, c.unit, all, loc); if (ps.length) steps.push({ s, grey: ps }); }
      else if (s === 'word') { const w = wordFor(L, false, bankLoc, ls, c.unit, rng, loc, pairsFor(L, bankLoc, ls, c.unit, all, loc)); if (w) steps.push({ s, grey: [w, w] }); }
      else if (s === 'capital') steps.push({ s, model: C, grey: [C + ' ' + C] });
      else if (s === 'name') { const w = wordFor(C, true, bankLoc, ls, c.unit, rng, loc); if (w) steps.push({ s, grey: [w, w] }); }
    }
    if (steps.length < 2) throw new Error(`${ID}: ${loc} ${c.unit} "${L}": only ${steps.length} step(s) (refuse)`);
    // capital headroom when a capital is on the page (the capital step, a name, a German noun)
    const geom = CW.geomFor(c, steps.some((st) => st.grey.concat(st.model || []).some((g) => g !== g.toLocaleLowerCase(loc))));
    // the grey items fit their line (the margin cell holds the ink model)
    const fs = c.X / SR.metricsFor(c.unit).xHeight;
    // free lines: one under every step, then one more per step in turn (the first steps first, at most 4 each) while the
    // budget holds them — the page fills its body with writing lines, never with a blank band
    const budget = BUDGET - ((ctx && ctx.chromeExtra) || 0);
    const free = steps.map(() => 1);
    const stackOf = () => CW.faceStack(c, geom, steps.length, (k) => 1 + free[k], false, 0);
    for (let grew = true; grew;) {
      grew = false;
      for (let k = 0; k < steps.length; k++) { if (free[k] >= 4) continue; free[k]++; if (stackOf() > budget) free[k]--; else grew = true; }
    }
    const stack = stackOf();
    if (stack > budget) throw new Error(`${ID}: ${loc} ${c.unit}: ${steps.length} steps need ${stack} px > ${budget} (refuse)`);
    const blocks = steps.map((st, k) => C6.cwFaceBlock({
      unit: c.unit, kind: c.kind, geom, seyes: c.kind === 'seyes' ? CW.seyesFor(c, 1 + free[k], true) : null, w: CW.BODY_W, marginX: MARGIN,
      writeRows: free[k], dashHelpers: c.dashHelpers, blockIndex: k, rowGap: [CW.ROW_GAP, CW.GAP_MAX.faceRow],
      attrs: { step: st.s, letter: L },
      rowAInner: (f, yB) => (st.model ? C6.cwText({ unit: c.unit, text: st.model, fs: f, yB, left: 0, width: MARGIN, align: 'center', role: 'model' }) : '') +
        C6.cwRun({ unit: c.unit, fs: f, yB, left: MARGIN + LEFT_PAD, gap: Math.round(fs * 0.9), items: st.grey.map((g) => ({ text: g, role: 'trace', attrs: { kind: st.s } })) }),
    }).replace('class="cw-block"', k === 0 ? `class="cw-block"${slot.attr(ctx, 'letter', 0)}` : 'class="cw-block"'));
    const body = CW.faceColumn(c, 'letter', geom, blocks, 0, stack, ` data-lcs-letter="${L}" data-lcs-steps="${steps.map((x) => x.s).join('|')}" data-lcs-budget="${budget}"`, steps.length);
    return { bodyHtml: body, meta: { letter: L, steps: steps.map((x) => x.s), unit: c.unit, stack } };
  },

  async verify(page) {
    const info = await page.evaluate(() => { const r = document.querySelector('[data-lcs-cw][data-lcs-type="G2-481"]'); return r ? { budget: +r.dataset.lcsBudget } : null; });
    if (!info) return [`${ID}: no cursive root`];
    const fails = await page.evaluate(CW.browserVerify, { ID, STACK_MAX: info.budget, ink: CW.hexToRgb(color.ink), grid: CW.hexToRgb(color.grid), face: { mode: 'letter', freeLines: null } });
    const own = await page.evaluate(() => {
      const out = [];
      const root = document.querySelector('[data-lcs-cw]'), L = root.dataset.lcsLetter, C = L.toLocaleUpperCase(root.dataset.lcsLocale);
      const blocks = [...root.querySelectorAll('.cw-block')];
      if (blocks.length < 2) out.push(`${blocks.length} steps`);
      blocks.forEach((b, k) => {
        const s = b.dataset.lcsStep, grey = [...b.querySelectorAll('[data-lcs-role="trace"]')].map((x) => x.textContent), model = b.querySelector('[data-lcs-role="model"]');
        const row = b.querySelector('.cw-row').getBoundingClientRect();
        if (!grey.length) out.push(`step ${k + 1}: nothing to trace`);
        if (s === 'alone' && (!model || model.textContent !== L || grey.some((g) => g !== L.repeat(3)))) out.push(`step ${k + 1}: the letter alone is not "${L}"`);
        if (s === 'capital' && (!model || model.textContent !== C || grey.some((g) => g !== C + ' ' + C))) out.push(`step ${k + 1}: the capital is not "${C}"`);
        if (s === 'pairs' && grey.some((g) => !g.includes(L) || [...g].length !== 2)) out.push(`step ${k + 1}: a pair without "${L}"`);
        if (s === 'word' && grey.some((g) => !g.toLocaleLowerCase().includes(L))) out.push(`step ${k + 1}: the word has no "${L}"`);
        if (s === 'name' && grey.some((g) => g[0] !== C)) out.push(`step ${k + 1}: the name does not start with "${C}"`);
        const empty = [...b.querySelectorAll('.cw-row')].filter((r) => !r.querySelector('[data-lcs-cursive]')).length;
        if (empty < 1) out.push(`step ${k + 1}: no empty line to write on`);
        const last = [...b.querySelectorAll('[data-lcs-role="trace"]')].pop();
        if (last && last.getBoundingClientRect().right > row.right - 40) out.push(`step ${k + 1}: the grey items run to the end of the line (no room to continue)`);
      });
      return out;
    });
    const all = fails.concat(own.map((f) => `${ID}: ${f}`));
    if (page.live) return all;
    return all.concat(await CW.rasterVerify(page, { ID }));
  },
};
