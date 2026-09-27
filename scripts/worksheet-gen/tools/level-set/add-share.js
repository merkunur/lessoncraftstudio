#!/usr/bin/env node
/**
 * add-share.js — add the apps' Share + Embed row to already-built interactive worksheet-gen ZIPs
 * (2026-09-28), with the SAME emit/deck-share.js insertShareRow the generator now calls — so a
 * patched deck.html is byte-identical to a freshly generated one. Idempotent.
 *
 *   node tools/level-set/add-share.js <staging-folder> [...]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { insertShareRow } = require('../../emit/deck-share.js');
const { loadType } = require('../../lib/load-types.js');
const { resolveStrings } = require('../../i18n/strings.js');
const { resolveUnitTokens } = require('../../lib/unit-axis.js');

let patched = 0, already = 0, skipped = 0;
for (const dir of process.argv.slice(2)) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.zip'))) {
    const p = path.join(dir, f);
    const z = new AdmZip(p);
    const m = JSON.parse(z.readAsText('manifest.json'));
    if (!m.interactive) { skipped++; continue; }
    const html = z.readAsText('deck.html');
    const spec = loadType(m.settings.worksheet_type);
    const strings = resolveUnitTokens(resolveStrings(spec.id, m.language, spec), spec, m.unit || null, m.language);
    const out = insertShareRow(html, { locale: m.language, title: strings.title });
    if (out === html) { already++; continue; }
    z.updateFile('deck.html', Buffer.from(out, 'utf8'));
    z.writeZip(p);
    patched++;
  }
}
console.log(`patched ${patched}, already had it ${already}, not interactive ${skipped}`);
