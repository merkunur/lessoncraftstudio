/**
 * G1-247 — Doubles and Halves (nt20-B; `doubles-halves`, G1, 1.OA.C.6 —
 * Verdoppeln und Halbieren / doubles et moitiés / dubbelt och hälften).
 * Left column DOUBLES: a group of theme pictures and its exact mirror
 * across a dashed line — the double IS the reflection; beneath, `4 + 4 = ▢`.
 * Right column HALVES: 2N pictures in two equal rows with a dashed coral cut
 * line; beneath, `12 = ▢ + ▢` (1.OA.D.8-honest). One authored pill per
 * column is the only text. d1 4 cards · d2 6 · d3 8 numeric-only.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const { mirrorGroups, dotPanel } = require('../../templates/components-b2.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { safeNouns } = require('../../lib/b2-common.js');
const { LABELS } = require('../../data/b2/labels.js');

const NUM = (s) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#3A3530">${s}</span>`;
const OP = (s) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${s}</span>`;

module.exports = {
  id: 'G1-247',
  slug: 'doubles-and-halves',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'doubles-halves',
  themeAxis: { applicable: true, minNouns: 1, excludeBw: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, dMin: 1, dMax: 4, hMin: 1, hMax: 4, icon: 52, perRow: 2, numeric: false },
    2: { cards: 6, cols: 2, rows: 3, dMin: 2, dMax: 6, hMin: 2, hMax: 6, icon: 40, perRow: 3, numeric: false },
    3: { cards: 8, cols: 2, rows: 4, dMin: 5, dMax: 10, hMin: 5, hMax: 10, icon: 0, perRow: 3, numeric: true },
  },
  i18n: {
    en: {
      title: 'Doubles and Halves',
      instruction: 'Find the double of each group and the half of each group. Write the numbers in the boxes.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc] && LABELS[loc].doublesHalves;
    if (!L) throw new Error(`G1-247: no labels for ${loc}`);
    const noun = rng.pick(safeNouns(theme, loc));
    const src = fileUri(theme, noun.noun);
    const half = d.cards / 2;
    const dRange = []; for (let v = d.dMin; v <= d.dMax; v++) dRange.push(v);
    const hRange = []; for (let v = d.hMin; v <= d.hMax; v++) hRange.push(v);
    // `ops` lets a face be doubles-ONLY or halves-ONLY. The base always builds
    // cards/2 of each, so every shipped face mixes — but doubling and halving are
    // taught on different days and a teacher prints the single-move fluency sheet
    // far more often than the mixed one.
    // ⚠ The default path must consume the RNG in exactly the same order, so the
    // two rng.sample calls stay in place and in sequence when `ops` is absent
    // (b2-baseline: 0 drift).
    const ops = d.ops || ['double', 'half'];
    const solo = ops.length === 1;
    const nD = ops.includes('double') ? (solo ? d.cards : half) : 0;
    const nH = ops.includes('half') ? (solo ? d.cards : half) : 0;
    const doubles = nD ? rng.sample(dRange, nD) : [];
    const halves = nH ? rng.sample(hRange, nH) : [];
    // Stamped ONLY when a face declares ops, so the default DOM is byte-identical.
    const opsAttr = d.ops ? ` data-lcs-ops="${ops.join(',')}"` : '';
    const pill = (key) => `<span style="display:inline-flex;align-items:center;justify-content:center;background:#FBE3D8;border-radius:12px;padding:2px 14px;font-family:'Nunito';font-weight:800;font-size:14px;color:#3A3530" data-lcs-pill="${key}">${L[key]}</span>`;
    const cards = [];
    for (let i = 0; i < Math.max(nD, nH); i++) {
      if (i < nD) {
      const n = doubles[i];
      const stage = d.numeric ? dotPanel({ w: 250, h: 56 }) : `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px;width:100%">${mirrorGroups({ src, n, iconPx: d.icon, perRow: Math.ceil(n / Math.ceil(n / d.perRow)) })}</div>`;
      cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:8px;justify-content:space-evenly" data-lcs-op="double" data-lcs-n="${n}"${opsAttr}>${pill('double')}${stage}` +
        `<div style="display:flex;align-items:center;gap:8px" data-lcs-strip>${NUM(n)}${OP('+')}${NUM(n)}${OP('=')}${answerBox({ w: 64, h: 48, answer: 2 * n })}</div></div>`);
      }
      if (i >= nH) continue;
      const m = halves[i];
      let hstage = d.numeric ? dotPanel({ w: 250, h: 56 }) : '';
      if (!d.numeric) {
        const row = () => `<div style="display:flex;gap:6px" data-lcs-row>${Array.from({ length: m }, () => `<img class="ws-icon" src="${src}" alt="" style="width:${d.icon}px;height:${d.icon}px">`).join('')}</div>`;
        const w = m * d.icon + (m - 1) * 6;
        hstage = `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px;width:100%;display:flex;flex-direction:column;align-items:center;gap:6px">${row()}` +
          `<svg width="${w + 20}" height="10" viewBox="0 0 ${w + 20} 10" aria-hidden="true"><line x1="2" y1="5" x2="${w + 18}" y2="5" stroke="#F2784B" stroke-width="2.5" stroke-dasharray="7 5"/><line x1="2" y1="1" x2="2" y2="9" stroke="#F2784B" stroke-width="2.5"/><line x1="${w + 18}" y1="1" x2="${w + 18}" y2="9" stroke="#F2784B" stroke-width="2.5"/></svg>${row()}</div>`;
      }
      cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:8px;justify-content:space-evenly" data-lcs-op="half" data-lcs-n="${m}"${opsAttr}>${pill('half')}${hstage}` +
        `<div style="display:flex;align-items:center;gap:8px" data-lcs-strip>${NUM(2 * m)}${OP('=')}${answerBox({ w: 64, h: 48, answer: m })}${OP('+')}${answerBox({ w: 64, h: 48, answer: m })}</div></div>`);
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: { doubles, halves } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const items = [...document.querySelectorAll('[data-lcs-op]')];
      if (items.length < 4) fails.push(`only ${items.length} cards`);
      const seen = { double: new Set(), half: new Set() };
      items.forEach((it, i) => {
        const op = it.dataset.lcsOp, n = +it.dataset.lcsN;
        if (seen[op].has(n)) fails.push(`card ${i + 1}: ${op} ${n} repeated`);
        seen[op].add(n);
        const boxes = [...it.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
        const strip = it.querySelector('[data-lcs-strip]').textContent.replace(/\s+/g, ' ');
        const pill = it.querySelector('[data-lcs-pill]');
        if (!pill || !pill.textContent.trim()) fails.push(`card ${i + 1}: pill missing`);
        if (op === 'double') {
          if (boxes.join(',') !== String(2 * n)) fails.push(`card ${i + 1}: double answer ${boxes}`);
          if (new RegExp(`(^|\\D)${2 * n}(\\D|$)`).test(strip)) fails.push(`card ${i + 1}: answer ${2 * n} printed`);
          const g1 = it.querySelectorAll('[data-lcs-g1] img').length, g2 = it.querySelectorAll('[data-lcs-g2] img').length;
          if (g1 || g2) {
            if (g1 !== n || g2 !== n) fails.push(`card ${i + 1}: groups ${g1}/${g2}, want ${n}/${n}`);
            const m = it.querySelector('[data-lcs-mirror]');
            if (!m || !/scaleX\(-1\)/.test(m.getAttribute('style') || '')) fails.push(`card ${i + 1}: mirror group not mirrored`);
          }
        } else {
          if (boxes.join(',') !== `${n},${n}`) fails.push(`card ${i + 1}: half answers ${boxes}`);
          if (new RegExp(`(^|\\D)${n}(\\D|$)`).test(strip)) fails.push(`card ${i + 1}: answer ${n} printed`);
          const rows = [...it.querySelectorAll('[data-lcs-row]')];
          if (rows.length) {
            if (rows.length !== 2 || rows.some((r) => r.querySelectorAll('img').length !== n)) fails.push(`card ${i + 1}: halves rows wrong`);
          }
        }
        if (boxes.some((b) => b < 1 || b > 20)) fails.push(`card ${i + 1}: answer out of band`);
      });
      const pills = new Set([...document.querySelectorAll('[data-lcs-pill]')].map((p) => p.textContent.trim()));
      // Both of these were hardcoded to the mixed page and BOTH had to move.
      // The second is the one that is easy to miss: a single-op page has exactly
      // ONE pill label, so `pills.size !== 2` would fail a correct sheet.
      const declared = (items[0] && items[0].dataset.lcsOps)
        ? items[0].dataset.lcsOps.split(',') : ['double', 'half'];
      if (pills.size !== declared.length) fails.push(`${pills.size} distinct pill label(s), want ${declared.length}`);
      declared.forEach((o) => { if (!seen[o] || !seen[o].size) fails.push(`missing declared op ${o}`); });
      items.forEach((it, i) => { if (!declared.includes(it.dataset.lcsOp)) fails.push(`card ${i + 1}: undeclared op ${it.dataset.lcsOp}`); });
      return fails;
    });
  },
};
