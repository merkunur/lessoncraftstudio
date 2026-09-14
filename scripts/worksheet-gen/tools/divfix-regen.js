#!/usr/bin/env node
/**
 * divfix-regen.js [--locales=sv,da] [--dry-run] [--evidence]
 *
 * nt20-C prerequisite C2 (2026-09-14): regenerate the live decks changed by
 * two shared-factory fixes, under their ORIGINAL wave ids with the PUBLISHED
 * themes PINNED, so deckIdFor reproduces the live basenames:
 *   • notation (sv '/' · de/it/nl/da/no/fi ':'): G2-216 ×2, G2-217 ×2,
 *     G3-309 ×2, G3-310 ×1, G3-311 ×2 in those 7 locales (63 decks)
 *   • G3-311 fact-family column gap 10→8 (its last box printed 3 px into the
 *     attribution band, every locale): + G3-311 ×2 in en/es/fr/pt (8 decks)
 *   • sv calendar G2-277 (ordinal 21:e → 21:a)
 * Why pinned: the enumerator's round-robin theme index is the spec's position
 * in loadAllTypes(), which has shifted since these waves shipped (a bare
 * re-enumeration of wave-008 puts G2-216 on fruits+vehicles; live = animals+
 * shapes). ⚠ The noun pools have ALSO shifted since June, so a regenerated
 * deck is the same coordinate with a DIFFERENT valid instance (different
 * nouns → different RNG stream); titles / descriptions / slugs are unchanged.
 * Recorded honestly in the README close-out; the landing prose quotes the
 * config, not the instance.
 *
 * Per locale: back up the originals to out/staging/_divfix/orig/<loc>/, write
 * waves/wave-00N-divfix-{a,b}.json, dry-run and assert the deckIds == the
 * backed-up basenames, generate --force (all pin waves run even if one QA-
 * fails; failures reported at the end), copy the fresh ZIPs to
 * out/staging/_divfix/<loc>/. --evidence compares old vs new per ZIP.
 * NEVER run prune-stale-zips.js with the pin waves.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const AdmZip = require('adm-zip');

const WG = path.resolve(__dirname, '..');
const WAVE_OF = { en: '001', de: '002', es: '003', nl: '004', fr: '005', it: '006', pt: '007', sv: '008', da: '009', no: '010', fi: '011' };
const GLYPH_LOCALES = new Set(['de', 'nl', 'it', 'sv', 'da', 'no', 'fi']);
const PINS_FULL = {
  a: { types: ['G2-216', 'G2-217', 'G3-309', 'G3-310', 'G3-311'], themeOverrides: { 'G2-216': 'animals', 'G2-217': 'animals', 'G3-309': 'fruits', 'G3-311': 'shapes' } },
  b: { types: ['G2-216', 'G2-217', 'G3-309', 'G3-311'], themeOverrides: { 'G2-216': 'shapes', 'G2-217': 'fruits', 'G3-309': 'vehicles', 'G3-311': 'toys' } },
};
const PINS_G3311 = {
  a: { types: ['G3-311'], themeOverrides: { 'G3-311': 'shapes' } },
  b: { types: ['G3-311'], themeOverrides: { 'G3-311': 'toys' } },
};
const RE_FULL = /^wsg-w\d+-(g2216|g2217|g3309|g3310|g3311)-/;
const RE_G3311 = /^wsg-w\d+-g3311-/;

const argv = process.argv.slice(2);
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const LOCALES = String(arg('locales', Object.keys(WAVE_OF).join(','))).split(',').filter(Boolean);
const DRY = argv.includes('--dry-run');
const EVIDENCE = argv.includes('--evidence');

function node(args) { return execFileSync(process.execPath, args, { cwd: WG, encoding: 'utf8', maxBuffer: 64 << 20 }); }
function dryIds(waveFile) {
  return node(['cli.js', 'generate', '--wave', waveFile, '--dry-run']).split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('wsg-'));
}

function evidence(oldZip, newZip) {
  const a = new AdmZip(oldZip), b = new AdmZip(newZip);
  const rep = [];
  for (const name of ['manifest.json', 'deck.html', 'printable.pdf']) {
    const ea = a.getEntry(name), eb = b.getEntry(name);
    if (!ea || !eb) { rep.push(name + ': MISSING'); continue; }
    const ba = ea.getData(), bb = eb.getData();
    if (name === 'manifest.json') {
      const ma = JSON.parse(ba.toString('utf8')), mb = JSON.parse(bb.toString('utf8'));
      const diff = Object.keys(Object.assign({}, ma, mb)).filter((k) => JSON.stringify(ma[k]) !== JSON.stringify(mb[k]));
      rep.push('manifest differs in: ' + (diff.join(',') || 'nothing') + (ma.title && mb.title && JSON.stringify(ma.title) === JSON.stringify(mb.title) ? ' (title same)' : ' (TITLE DIFFERS)'));
    } else if (name === 'deck.html') {
      const t = (s) => (s.match(/<title>[\s\S]*?<\/title>/) || [''])[0];
      const d = (s) => (s.match(/<meta name="description" content="[^"]*"/) || [''])[0];
      const sa = ba.toString('utf8'), sb = bb.toString('utf8');
      rep.push('deck.html title ' + (t(sa) === t(sb) ? 'EQUAL' : 'DIFFERS') + ', meta ' + (d(sa) === d(sb) ? 'EQUAL' : 'DIFFERS'));
    } else rep.push('pdf ' + ba.length + '→' + bb.length + ' bytes');
  }
  return rep.join(' · ');
}

const failures = [];
for (const loc of LOCALES) {
  const w = WAVE_OF[loc];
  const full = GLYPH_LOCALES.has(loc);
  const PINS = full ? PINS_FULL : PINS_G3311;
  const RE = full ? RE_FULL : RE_G3311;
  const expectN = full ? 9 : 2;
  const stagingDir = path.join(WG, 'out', 'staging', 'wave-' + w);
  const origDir = path.join(WG, 'out', 'staging', '_divfix', 'orig', loc);
  const freshDir = path.join(WG, 'out', 'staging', '_divfix', loc);
  const zips = fs.readdirSync(stagingDir).filter((f) => RE.test(f) && f.endsWith('.zip'));
  if (zips.length !== expectN) throw new Error(loc + ': expected ' + expectN + ' ZIPs in ' + stagingDir + ', found ' + zips.length);
  const calZip = loc === 'sv' ? 'wsg-wb2sv-g2277-nothm-d2-sv.zip' : null;

  if (EVIDENCE) {
    for (const z of zips.concat(calZip ? [calZip] : [])) {
      const o = path.join(origDir, z), n = path.join(freshDir, z);
      console.log(loc + ' ' + z + ': ' + (fs.existsSync(o) && fs.existsSync(n) ? evidence(o, n) : 'MISSING old or new'));
    }
    continue;
  }

  const base = JSON.parse(fs.readFileSync(path.join(WG, 'waves', 'wave-' + w + '.json'), 'utf8'));
  const files = {};
  for (const k of ['a', 'b']) {
    const plan = { id: base.id, seedEpoch: base.seedEpoch || 1, locales: [loc], themes: base.themes, themesPerType: 1, difficulties: [2], types: PINS[k].types, themeOverrides: PINS[k].themeOverrides,
      _note: 'nt20-C prerequisite C2 (2026-09-14): pinned re-generation of live decks after the notation + G3-311 gap fixes; id kept so deckIdFor reproduces the live basenames. Never prune with this file.' };
    const f = path.join(WG, 'waves', 'wave-' + w + '-divfix-' + k + '.json');
    fs.writeFileSync(f, JSON.stringify(plan, null, 2) + '\n');
    files[k] = 'waves/wave-' + w + '-divfix-' + k + '.json';
  }
  const ids = dryIds(files.a).concat(dryIds(files.b)).sort();
  const want = zips.map((z) => z.replace(/\.zip$/, '')).sort();
  if (JSON.stringify(ids) !== JSON.stringify(want)) {
    console.error(loc + ': pinned enumeration does NOT reproduce the published basenames\n  got  ' + ids.join(' ') + '\n  want ' + want.join(' '));
    process.exit(1);
  }
  console.log(loc + ': pinned enumeration reproduces the ' + expectN + ' published basenames');
  if (DRY) continue;

  fs.mkdirSync(origDir, { recursive: true });
  fs.mkdirSync(freshDir, { recursive: true });
  for (const z of zips) if (!fs.existsSync(path.join(origDir, z))) fs.copyFileSync(path.join(stagingDir, z), path.join(origDir, z));
  if (calZip && !fs.existsSync(path.join(origDir, calZip))) fs.copyFileSync(path.join(WG, 'out', 'staging', 'wave-b2-sv', calZip), path.join(origDir, calZip));
  for (const k of ['a', 'b']) {
    const out = node(['cli.js', 'generate', '--wave', files[k], '--force']);
    console.log(loc + ' ' + k + ': ' + out.split(/\r?\n/).filter((l) => /zipped:|failed:/.test(l)).join(' '));
    if (!/failed: 0/.test(out)) failures.push(loc + ' ' + k + ': ' + out.split(/\r?\n/).filter((l) => l.startsWith('FAIL')).join(' | '));
  }
  if (calZip) {
    const out = node(['cli.js', 'generate', '--wave', 'waves/wave-b2-sv.json', '--types=G2-277', '--force']);
    console.log('sv calendar: ' + out.split(/\r?\n/).filter((l) => /zipped:|failed:/.test(l)).join(' '));
    if (!/failed: 0/.test(out)) failures.push('sv calendar: ' + out.slice(-300));
    else fs.copyFileSync(path.join(WG, 'out', 'staging', 'wave-b2-sv', calZip), path.join(freshDir, calZip));
  }
  for (const z of zips) fs.copyFileSync(path.join(stagingDir, z), path.join(freshDir, z));
  console.log(loc + ': ' + (zips.length + (calZip ? 1 : 0)) + ' ZIPs in ' + freshDir);
}
if (failures.length) { console.error('\nQA FAILURES:\n' + failures.join('\n')); process.exit(1); }
