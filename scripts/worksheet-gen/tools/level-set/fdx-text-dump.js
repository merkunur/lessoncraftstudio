#!/usr/bin/env node
/**
 * fdx-text-dump.js — the Find the Differences Level Set's visible TEXT in every locale, compact, for the ONE native-speaker
 * + pedagogy reviewer (CLAUDE.md rule #2): per locale, every distinct title (with the face and levels it is on), the
 * instruction of every face × level, and per word-face page the word strip with the CHANGED words marked [*] and what
 * changed. Built through the real type modules (copyStrings + build), never re-authored here.
 *   node tools/level-set/fdx-text-dump.js > dump.txt   [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const { resolveStrings } = require('../../i18n/strings.js');
const ROOT = path.join(__dirname, '..', '..');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fdx', 'allocation.json'), 'utf8'));
const B = require('../../data/b7/find-the-differences.js');
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const load = (id) => { for (const d of ['k', 'g1', 'g2']) { const dir = path.join(ROOT, 'types', d); const f = fs.readdirSync(dir).find((x) => x.startsWith(id + '-')); if (f) return require(path.join(dir, f)); } throw new Error(id); };
const strip = (h) => String(h).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const out = [];
for (const loc of LOCALES) {
  out.push(`\n==================== ${loc} ====================`);
  const titles = new Map(), instr = new Map(), words = [];
  for (const [id, lvs] of Object.entries(A.faces)) {
    const type = load(id);
    for (const [lv, list] of Object.entries(lvs)) for (const c of list) {
      const s0 = resolveStrings(id, loc, type);
      const s1 = type.copyStrings ? type.copyStrings(s0, { locale: loc, difficulty: +lv, unit: c.unit, variant: c.copy, seedVariant: 1 }) : s0;
      let t = s1.printTitle || s1.title;
      if (/\{\w+\}/.test(t) &&type.unitAxis && type.unitAxis.tokens) { const tk = type.unitAxis.tokens(c.unit, loc); t = t.replace(/\{(\w+)\}/g, (m, k) => (tk[k] != null ? tk[k] : m)); }
      if (!titles.has(t)) titles.set(t, []); titles.get(t).push(`${id} L${lv}`);
      const ins = s1.instruction || s1.printInstruction;
      const ik = `${id} L${lv}`; if (!instr.has(ik)) instr.set(ik, new Set()); instr.get(ik).add(ins);
      const mode = type.difficulty[lv].mode;
      if (B.WORD_MODES.includes(mode)) {
        const seed = instanceSeed({ typeId: id, theme: null, difficulty: +lv, seedEpoch: 1, variant: 1, unit: c.unit });
        const b = type.build({ theme: null, difficulty: +lv, locale: loc, unit: c.unit, strings: s1 }, { rng: makeRng(seed), variant: c.copy, seedVariant: 1 });
        const sc = B.loadScene(c.unit.replace(/@c$/, ''));
        const what = String(b.meta.ops).split(',').map((o) => { const [k, i, src] = o.split(':'); const l = sc.items.find((x) => x.idx === +i); return `${k} ${B.vocabKeyOf(src || (l && l.src) || '?')}${src && l ? ' (was ' + B.vocabKeyOf(l.src) + ')' : ''}`; }).join('; ');
        const bank = [...String(b.bodyHtml).matchAll(/data-lcs-bank-word="([^"]+)"/g)].map((m) => m[1]);
        const ib = type.build({ theme: null, difficulty: +lv, locale: loc, unit: c.unit, strings: s1 }, { rng: makeRng(seed), variant: c.copy, seedVariant: 1, interactive: true });
        const ticks = [...String(ib.bodyHtml).matchAll(/data-lcs-label="([^"]+)"(?:\s+data-lcs-fd-diff="1")?/g)].map((m) => m[1] + (m[0].includes('fd-diff') ? '[*]' : ''));
        words.push(`${id} L${lv} c${c.copy}: CHANGED ${what} || ${mode === 'write' ? 'STRIPS ' + bank.join(' | ') : 'WORDS ' + ticks.join(' | ')}`);
      }
    }
  }
  out.push('-- TITLES (title · where) --');
  for (const [t, w] of titles) out.push(`${t}   · ${[...new Set(w)].join(', ')}`);
  out.push('-- INSTRUCTIONS (face level · text) --');
  for (const [k, v] of instr) for (const x of v) out.push(`${k} · ${x}`);
  out.push('-- WORD FACES --');
  out.push(...words);
}
process.stdout.write(out.join('\n') + '\n');
