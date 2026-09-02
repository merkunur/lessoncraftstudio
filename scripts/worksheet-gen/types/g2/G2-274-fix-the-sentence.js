/**
 * G2-274 — Fix the Sentence (nt20-B; `capitals-punctuation`, G2, L.1.2.b +
 * L.2.2 — Satzanfang groß, Punkt am Ende / majuscule et point). Five
 * "broken" sentences — no capital, no end mark, the name (and in German
 * every noun) in lowercase — each over a school-line ruling. The child plays
 * editor and rewrites it correctly. A checklist banner (A · Aa · .?!) says
 * what to look for without a paragraph. The corruption is a pure function
 * (lib/sentence-bank.js corrupt) that verify() re-derives inline.
 * d1: 4 lanes, capital + period · d2: 5 lanes, + names · d3: 5 lanes, the
 * end mark must be chosen (? and .; ! only for `exclaimStrict` frames).
 */
'use strict';
const { rulingBlock, fixChecklist } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, fileUri, countable } = require('../../lib/b2-common.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const SB = require('../../lib/sentence-bank.js');

module.exports = {
  id: 'G2-274',
  slug: 'fix-the-sentence',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'capitals-punctuation',
  themeAxis: { applicable: true, minNouns: 5, excludeBw: true },
  difficulty: {
    1: { lanes: 4, needCaps: 0, ends: ['.'], font: 18, rulH: 66, glyphH: 28, icon: 56, chips: ['capital', 'end'] },
    2: { lanes: 5, needCaps: 3, ends: ['.'], font: 16, rulH: 60, glyphH: 26, icon: 44, chips: ['capital', 'name', 'end'] },
    3: { lanes: 5, needCaps: 3, ends: ['.', '?', '!'], needQ: 2, font: 16, rulH: 60, glyphH: 26, icon: 44, chips: ['capital', 'name', 'end'] },
  },
  i18n: {
    en: {
      title: 'Fix the Sentence',
      instruction: 'Each sentence has lost its capital letter and its end mark. Write it again correctly on the line.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const bank = SENTENCES[loc];
    if (!bank) throw new Error(`G2-274: no sentence bank for ${loc}`);
    const entries = entriesFor(theme, loc).filter(countable);
    const pool = bank.frames.filter((f) => f.kind === 'simple' && (f.uses || []).includes('fix'))
      .filter((f) => { const end = SB.endMark(f.text); if (!d.ends.includes(end)) return false; if (end === '!' && !f.exclaimStrict) return false; return true; });
    // choose frames: ≥ needCaps with a {name} (a capital inside), ≥ needQ questions at d3
    let frames = null, guard = 0;
    while (!frames && guard++ < 200) {
      const cand = rng.shuffle(pool.slice()).slice(0, d.lanes);
      if (cand.length < d.lanes) break;
      const withName = cand.filter((f) => /\{name\}/.test(f.text)).length;
      const qs = cand.filter((f) => SB.endMark(f.text) === '?').length;
      if (withName < d.needCaps) continue;
      if (d.needQ && qs < d.needQ) continue;
      // Keyed on the CONFIG, not the difficulty index. A page whose checklist has
      // no Names chip must not print a name, and `needCaps === 0` is exactly the
      // config that omits that chip. Keying on `difficulty === 1` let a variation
      // that re-points the d1 config at d2 slip through: G2-281 shipped
      // "anna has a big fox" under a two-chip banner that never mentions names.
      // The nt20-B-VAR convention replicates one config across d1/d2/d3, so any
      // future face inherits the hole unless the guard reads the config.
      if (d.needCaps === 0 && cand.some((f) => /\{name\}/.test(f.text))) continue;
      frames = cand;
    }
    if (!frames) throw new Error(`G2-274: bank ${loc} cannot satisfy d${difficulty} (fix frames: ${pool.length})`);
    const nouns = rng.sample(entries, d.lanes);
    const lanes = frames.map((frame, i) => {
      const e = nouns[i];
      const mode = bank.nounCase === 'keep' ? 'keep' : 'lower';
      const nounText = SB.resolveNoun(bank, frame, { ...e, singular: displayWord(e.singular, loc, mode), plural: displayWord(e.plural, loc, mode) }, loc);
      const name = rng.sample(bank.names, 2); // array: a second {name} gets the second name
      const canonical = SB.fillFrame(frame.text, { name, noun: nounText, n: '', color: '' });
      const broken = SB.corrupt(canonical, loc);
      return `<div class="ws-lane" style="display:grid;grid-template-columns:${d.icon}px 1fr;gap:12px;align-items:center;padding:10px 14px" data-lcs-item data-lcs-frame="${frame.id}" data-lcs-canonical="${canonical.replace(/"/g, '&quot;')}" data-lcs-end="${SB.endMark(canonical)}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${d.icon}px;height:${d.icon}px">` +
        `<div style="display:flex;flex-direction:column;gap:6px;min-width:0">` +
        `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:5px 14px;font-family:'Nunito';font-weight:700;font-size:${d.font}px;color:#3A3530" data-lcs-broken>${broken}</div>` +
        rulingBlock({ rows: 1, w: 660 - d.icon - 12 - 28, h: d.rulH, glyphH: d.glyphH }) + `</div></div>`;
    });
    const glyphs = { capital: 'A', name: 'Aa', end: difficulty === 3 ? '.?!' : '.' };
    const chips = fixChecklist({ chips: d.chips.map((k) => ({ key: k, glyph: glyphs[k], label: bank.fixLabels[k] })) });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:10px;justify-content:space-evenly" data-ws-content>${chips}${lanes.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const corrupt = (s) => s.trim().replace(/^[¿¡]+\s*/, '').replace(/[\s  ]*[.?!…]+$/, '').toLocaleLowerCase(lang);
      const lanes = [...document.querySelectorAll('[data-lcs-item]')];
      // Floor of 3, not 4. The name-free variant cannot reach four lanes in every
      // language: measured, the fix frames that carry no name number 10 in en but
      // only 5 in pt and it, and no 4-lane name-free configuration builds in all
      // eleven. No shipped coordinate has fewer than four lanes, so relaxing the
      // floor changes nothing that exists (b2-baseline: 0 drift).
      if (lanes.length < 3) fails.push(`only ${lanes.length} lanes`);
      const frames = new Set(), canon = new Set();
      const ends = [];
      lanes.forEach((lane, i) => {
        const c = lane.dataset.lcsCanonical, b = lane.querySelector('[data-lcs-broken]');
        if (frames.has(lane.dataset.lcsFrame)) fails.push(`lane ${i + 1}: frame repeated`);
        frames.add(lane.dataset.lcsFrame);
        if (canon.has(c)) fails.push(`lane ${i + 1}: sentence repeated`);
        canon.add(c);
        if (!b) { fails.push(`lane ${i + 1}: no broken pill`); return; }
        if (b.textContent.trim() !== corrupt(c)) fails.push(`lane ${i + 1}: broken text is not corrupt(canonical)`);
        if (b.textContent.trim() === c.trim()) fails.push(`lane ${i + 1}: nothing to fix`);
        if (!/^[¿¡]?\p{Lu}/u.test(c)) fails.push(`lane ${i + 1}: canonical does not start with a capital`);
        if (!/[.?!]$/.test(c)) fails.push(`lane ${i + 1}: canonical has no end mark`);
        if (/[.?!¿¡]/.test(b.textContent) || /\p{Lu}/u.test(b.textContent)) fails.push(`lane ${i + 1}: broken text still has a capital or mark`);
        if (/\{/.test(c)) fails.push(`lane ${i + 1}: unfilled slot`);
        ends.push(lane.dataset.lcsEnd);
        if (!lane.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`lane ${i + 1}: no ruling`);
        const vis = [...lane.querySelectorAll('*')].map((n) => n.textContent.trim());
        if (vis.some((v) => v === c.trim())) fails.push(`lane ${i + 1}: canonical printed`);
      });
      const chips = document.querySelectorAll('[data-lcs-fixchip]');
      if (chips.length < 2) fails.push('checklist missing');
      return fails;
    });
  },
};
