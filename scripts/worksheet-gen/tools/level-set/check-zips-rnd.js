#!/usr/bin/env node
/**
 * check-zips-rnd.js — pre-upload check of the Rounding Numbers Level Set ZIPs (walk #63, 2026-10-14).
 * Per ZIP: marked indexable:false, a screen version (DECK_BUNDLE) + answer key, title <= 100, description 120-170,
 * and on the "round to a ten" face (G3-390) the title names the SAME target the page rounds to (the title is swapped
 * per copy — a stale "50" over a page that rounds to 30 would be a false heading). Per locale: no title twice; per
 * (face, level): no thumbnail twice (copies differ). Exit 1 on any finding; refuses to pass on 0 ZIPs.
 *   node tools/level-set/check-zips-rnd.js [--dir=out/staging]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const root = path.resolve(arg('dir', path.join(__dirname, '..', '..', 'out', 'staging')));
const un = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
let bad = 0, total = 0;
for (const w of fs.readdirSync(root).filter((d) => /^wave-rnd-[a-z]{2}$/.test(d)).sort()) {
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
    if (!m.interactive || !z.getEntry('answer-key.pdf') || !/window.DECK_BUNDLE=/.test(html)) probs.push('no screen version or no answer key');
    if (title.length > 100) probs.push(`title ${title.length} > 100`);
    if (desc.length < 120 || desc.length > 170) probs.push(`desc ${desc.length}`);
    if (/g3390/.test(m.deck_id)) {
      const t = (/data-lcs-target(?:="|":")(\d+)/.exec(html) || [])[1];   // the page attribute or the screen bundle's JSON
      if (!t) probs.push('no target stamped in the screen bundle');
      else if (!new RegExp('(?<!\\d)' + t + '(?!\\d)').test(title)) probs.push(`title "${title}" does not name the page's target ${t}`);
    }
    if (titles[title]) probs.push(`title also on ${titles[title]}`); else titles[title] = f;
    const key = (m.settings.worksheet_type || '') + ' d' + m.settings.difficulty;
    const th = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    (thumbs[key] = thumbs[key] || {});
    if (thumbs[key][th]) probs.push(`same thumbnail as ${thumbs[key][th]}`); else thumbs[key][th] = f;
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
  }
}
if (!total) { console.error('check-zips-rnd: 0 ZIPs found — nothing was checked'); process.exit(1); }
console.log(`check-zips-rnd: ${total} ZIPs, ${bad} with findings`);
process.exit(bad ? 1 : 0);
