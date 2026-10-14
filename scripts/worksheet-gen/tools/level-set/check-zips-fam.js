#!/usr/bin/env node
/**
 * check-zips-fam.js — pre-upload check of the Family Members Level Set ZIPs (walk #66, 2026-10-14; adapted from
 * check-zips-wp). Per ZIP: marked indexable:false; the checkable faces carry a screen version (DECK_BUNDLE) + answer key,
 * the PDF-only faces (Trace and Write K-375, the Tree Template G1-387) carry NEITHER; title <= 100; description 120-170.
 * Per locale: no title twice; per (face, level): no thumbnail twice (copies differ). Exit 1 on any finding.
 *   node tools/level-set/check-zips-fam.js [--dir=out/staging]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const root = path.resolve(arg('dir', path.join(__dirname, '..', '..', 'out', 'staging')));
const un = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const PRINT_ONLY = /-(k375|g1387)-/;
let bad = 0, total = 0;
for (const w of fs.readdirSync(root).filter((d) => /^wave-fam-[a-z]{2}$/.test(d)).sort()) {
  const dir = path.join(root, w);
  const titles = {}, thumbs = {};
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.zip'))) {
    total++;
    const z = new AdmZip(path.join(dir, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    const html = z.readAsText('deck.html');
    const title = un((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '');
    const desc = un((/name="description" content="([^"]*)"/.exec(html) || [])[1] || '');
    const probs = [];
    if (m.indexable !== false) probs.push('NOT marked indexable:false');
    const screen = !!m.interactive && !!z.getEntry('answer-key.pdf') && /window.DECK_BUNDLE=/.test(html);
    if (PRINT_ONLY.test(f)) { if (m.interactive || z.getEntry('answer-key.pdf') || /window.DECK_BUNDLE=/.test(html)) probs.push('a PDF-only face carries a screen version or a key'); }
    else if (!screen) probs.push('no screen version or no answer key');
    if (title.length > 100) probs.push(`title ${title.length} > 100`);
    if (desc.length < 120 || desc.length > 170) probs.push(`desc ${desc.length}`);
    if (titles[title]) probs.push(`title also on ${titles[title]}`); else titles[title] = f;
    const key = (m.settings.worksheet_type || '') + ' d' + m.settings.difficulty;
    const th = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    (thumbs[key] = thumbs[key] || {});
    if (thumbs[key][th]) probs.push(`same thumbnail as ${thumbs[key][th]}`); else thumbs[key][th] = f;
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
  }
}
if (!total) { console.error('check-zips-fam: 0 ZIPs found — nothing was checked'); process.exit(1); }
console.log(`check-zips-fam: ${total} ZIPs, ${bad} with findings`);
process.exit(bad ? 1 : 0);
