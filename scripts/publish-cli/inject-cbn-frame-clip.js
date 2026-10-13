#!/usr/bin/env node
/**
 * Color by Number frame-corner retrofit (2026-10-13).
 *
 * The tap-paint screen lays the live picture SVG (.lcs-paint-art) over the page screenshot at the SVG's box. The page
 * frame clips the picture to a rounded corner (lib/cbn-type.js: border 3px, radius 22px, overflow:hidden), but the
 * overlay was square, so its background covered the frame's four corners on screen (the PDF was always right).
 * New decks carry the clip in the bundle (art.rx / art.ry, MEASURED by render-instance.js; runtime applies it). This
 * script gives every already-published tap-paint deck the same clip as a marker-guarded <style> at the top of <head>.
 *
 * Radius per deck = the frame's inner radius (22 − 3 = 19 px) over the SVG's on-page size: width 440 px when the key
 * has more than 6 colours, else 520 (cbn-type.js), height = width × viewBox h / w. Cross-checked against the measured
 * art.rx/ry of regenerated decks (agree within 0.005 %). Decks whose bundle already carries art.rx are skipped.
 *
 * Usage: node scripts/publish-cli/inject-cbn-frame-clip.js [--locale=<code>] [--file=<deck.html>] [--confirm]
 *   without --confirm: dry-run (nothing written). Idempotent. No backup files (§A.14.12).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DECKS_ROOT = '/var/www/lcs-media/decks';
const ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const MARKER = 'id="lcs-cbn-frame-clip"';
const INNER_RADIUS_PX = 19;

const argv = process.argv.slice(2);
const CONFIRM = argv.includes('--confirm');
const flag = (n) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : null; };

/** @returns {{skip:string}|{already:true}|{content:string, rx:number, ry:number}} */
function patch(html) {
  if (html.indexOf('"paint":{') === -1) return { skip: 'not tap-paint' };
  if (html.indexOf(MARKER) !== -1) return { already: true };
  const m = html.match(/window\.DECK_BUNDLE\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
  if (!m) throw new Error('no DECK_BUNDLE');
  const B = JSON.parse(m[1]);
  const P = B.ctx && B.ctx.paint;
  if (!P || !P.art) return { skip: 'no paint art' };
  if (P.art.rx != null) return { skip: 'bundle already carries the clip' };
  const vb = (P.art.svg.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) throw new Error('art svg has no viewBox');
  const [, , vw, vh] = vb.split(/[ ,]+/).map(Number);
  const colours = new Set(P.crayons.map((c) => c.colour)).size;
  const pw = colours > 6 ? 440 : 520, ph = pw * vh / vw;
  const rx = +(INNER_RADIUS_PX / pw * 100).toFixed(3), ry = +(INNER_RADIUS_PX / ph * 100).toFixed(3);
  const style = `<style ${MARKER}>.lcs-paint-art{overflow:hidden;border-radius:${rx}% / ${ry}%}</style>\n`;
  const h = /<head\b[^>]*>/i.exec(html);
  if (!h) throw new Error('no <head>');
  const at = h.index + h[0].length;
  return { content: html.slice(0, at) + '\n' + style + html.slice(at), rx, ry };
}

function write(file, content) { const tmp = file + '.tmp'; fs.writeFileSync(tmp, content, 'utf8'); fs.renameSync(tmp, file); }

function run(file, s) {
  const r = patch(fs.readFileSync(file, 'utf8'));
  if (r.skip) { s.skipped++; return; }
  if (r.already) { s.already++; return; }
  if (CONFIRM) write(file, r.content);
  s.applied++;
}

function main() {
  console.log(`=== inject-cbn-frame-clip (${CONFIRM ? 'WRITE' : 'DRY-RUN'}) ===`);
  const one = flag('file');
  if (one) { const s = { applied: 0, already: 0, skipped: 0, failed: 0 }; run(one, s); console.log(JSON.stringify(s)); return; }
  const locales = flag('locale') ? [flag('locale')] : ALL_LOCALES;
  let failed = 0;
  for (const loc of locales) {
    const dir = path.join(DECKS_ROOT, loc);
    if (!fs.existsSync(dir)) continue;
    const s = { applied: 0, already: 0, skipped: 0, failed: 0 };
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('.') || /-v\d+$/.test(name)) continue;
      const link = path.join(dir, name);
      let file;
      try { if (!fs.lstatSync(link).isSymbolicLink()) continue; file = path.join(fs.realpathSync(link), 'deck.html'); }
      catch (e) { s.skipped++; continue; }   // dangling legacy symlink — nothing served there
      if (!fs.existsSync(file)) { s.skipped++; continue; }
      try { run(file, s); } catch (e) { s.failed++; console.log(`  FAIL ${loc}/${name}: ${e.message}`); }
    }
    failed += s.failed;
    console.log(`  ${loc}: applied=${s.applied} already=${s.already} skipped=${s.skipped} failed=${s.failed}`);
  }
  process.exit(failed ? 1 : 0);
}

if (require.main === module) main();
module.exports = { patch };
