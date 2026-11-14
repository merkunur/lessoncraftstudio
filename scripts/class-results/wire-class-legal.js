#!/usr/bin/env node
/**
 * After a native writer has added languages to frontend/content/class-legal/src/ (Part 9, condition E7): wires them
 * into the site. Run again whenever a language is added; a second run changes nothing.
 *
 *   node scripts/class-results/wire-class-legal.js
 *
 *   1. builds legal.<locale>.json for every complete language (build-class-legal.js; stops when a text breaks a rule)
 *   2. frontend/lib/class-results/legal.tsx: one import per built language, and the LEGAL list
 *   3. frontend/messages/<locale>.json: pricingPage.faq.a4Classes from src/strings-new.json, right after a4
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..', '..');
const DIR = path.join(REPO, 'frontend', 'content', 'class-legal');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const b = spawnSync(process.execPath, [path.join(__dirname, 'build-class-legal.js')], { encoding: 'utf8' });
process.stdout.write(b.stdout || '');
if (b.status !== 0) { console.error('the texts do not build: fix them first'); process.exit(1); }
const built = LOCALES.filter((l) => fs.existsSync(path.join(DIR, 'legal.' + l + '.json')));

{ // 2
  const f = path.join(REPO, 'frontend', 'lib', 'class-results', 'legal.tsx');
  const raw = fs.readFileSync(f, 'utf8'); const crlf = raw.includes('\r\n'); let t = raw.replace(/\r\n/g, '\n');
  const imports = built.map((l) => "import " + l + " from '@/content/class-legal/legal." + l + ".json';").join('\n');
  const list = 'const LEGAL: Record<string, Record<LegalDoc, string>> = { ' + built.join(', ') + ' };';
  const a = /(?:import [a-z]{2} from '@\/content\/class-legal\/legal\.[a-z]{2}\.json';\n)+/, c = /const LEGAL: Record<string, Record<LegalDoc, string>> = \{[^}]*\};/;
  if (!a.test(t) || !c.test(t)) throw new Error('legal.tsx: the imports or the list were not found');
  t = t.replace(a, imports + '\n').replace(c, list);
  fs.writeFileSync(f, crlf ? t.replace(/\n/g, '\r\n') : t);
  console.log('legal.tsx: ' + built.length + ' language(s): ' + built.join(', '));
}
{ // 3
  const sf = path.join(DIR, 'src', 'strings-new.json');
  if (!fs.existsSync(sf)) { console.log('no src/strings-new.json: the pricing answer stays as it is'); process.exit(0); }
  const S = JSON.parse(fs.readFileSync(sf, 'utf8'));
  let n = 0;
  for (const l of LOCALES.filter((x) => x !== 'en')) {
    const v = S[l] && S[l].a4Classes; if (typeof v !== 'string' || !v.trim()) { console.log('  ' + l + ': no a4Classes'); continue; }
    const f = path.join(REPO, 'frontend', 'messages', l + '.json'); const raw = fs.readFileSync(f, 'utf8'); const j = JSON.parse(raw);
    const a4 = j.pricingPage && j.pricingPage.faq && j.pricingPage.faq.a4; if (typeof a4 !== 'string') throw new Error(l + ': no pricingPage.faq.a4');
    if (j.pricingPage.faq.a4Classes === v.trim()) continue;
    let t;
    if (typeof j.pricingPage.faq.a4Classes === 'string') {
      const O = '"a4Classes": ' + JSON.stringify(j.pricingPage.faq.a4Classes); if (raw.split(O).length !== 2) throw new Error(l + ': a4Classes not found once');
      t = raw.replace(O, () => '"a4Classes": ' + JSON.stringify(v.trim()));
    } else {
      const A = '"a4": ' + JSON.stringify(a4); if (raw.split(A).length !== 2) throw new Error(l + ': a4 not found once in the file text');
      const indent = (new RegExp('\\n([ \\t]*)"a4": ').exec(raw) || [, '      '])[1];
      t = raw.replace(A, () => A + ',\n' + indent + '"a4Classes": ' + JSON.stringify(v.trim()));
    }
    JSON.parse(t); fs.writeFileSync(f, t); n++;
  }
  console.log('pricing answer: ' + n + ' language file(s) changed');
}
