#!/usr/bin/env node
/**
 * starterfix-regen.js [--locales=en,de] [--dry-run] [--evidence]
 *
 * 2026-09-21: regenerate the live decks changed by two shared fixes, under
 * their ORIGINAL wave ids with the PUBLISHED themes pinned, so deckIdFor
 * reproduces the live basenames (the enumerator's round-robin has shifted
 * since June — a bare re-run of wave-001 puts G2-235 on fruits+vehicles while
 * the live d2 decks are shapes+toys):
 *   • rulingBlock / factLane starter sizing (components-b2 / components-b3):
 *     K-335 · G2-278 · G2-299 · G2-318 · G2-339 · G2-340 · G2-341 · G2-342
 *     (d2, the shipped face of each) — 8 × 11 locales
 *   • G2-235 ruler registration (flex-shrink; d3 rows 4→3): legacy d2
 *     shapes+toys (wave-00N) + wave-measurement-<loc> d1 animals/toys + d3
 *     animals (toys d3 was QA-dropped in June; if it passes now it is NEW,
 *     and the republish script removes never-published ZIPs, never INSERTs)
 * ⚠ The noun pools have shifted since the waves shipped, so a regenerated
 * deck is the same coordinate with a possibly different valid instance;
 * title / description / slug are unchanged (--evidence proves it per ZIP).
 *
 * Per locale: back up the originals to out/staging/_starterfix/orig/<loc>/,
 * write waves/wave-00N-starterfix-{a,b}.json (G2-235 shapes / toys, id kept),
 * dry-run and assert every live basename is reproduced, generate --force,
 * copy the fresh ZIPs to out/staging/_starterfix/<loc>/. --evidence compares
 * old vs new per ZIP and lists UNCHANGED ones (deck.html byte-equal, e.g. fr
 * K-335 whose `because` is a recorded null) to drop from the republish.
 * NEVER run prune-stale-zips.js with the pin waves.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const AdmZip = require('adm-zip');

const WG = path.resolve(__dirname, '..');
const WAVE_OF = { en: '001', de: '002', es: '003', nl: '004', fr: '005', it: '006', pt: '007', sv: '008', da: '009', no: '010', fi: '011' };
const STARTER_TYPES = ['K-335', 'G2-278', 'G2-299', 'G2-318', 'G2-339', 'G2-340', 'G2-341', 'G2-342', 'G1-306', 'G1-333'];
// --only=G1-306,G1-333 restricts the live set + jobs to those ids (round 2 republishes only the lane decks;
// the round-1 set is already live at v2 and must not be bumped to v3 for nothing)
const RE_LIVE = /^wsg-\w+-(g2235|k335|g2278|g2299|g2318|g2339|g2340|g2341|g2342|g1306|g1333)-/;   // round 2 (2026-09-21): + the syllableLane rime consumers

const argv = process.argv.slice(2);
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const LOCALES = String(arg('locales', Object.keys(WAVE_OF).join(','))).split(',').filter(Boolean);
const DRY = argv.includes('--dry-run');
const EVIDENCE = argv.includes('--evidence');
const ONLY = arg('only', null) ? new Set(arg('only').split(',')) : null;
const onlyRe = ONLY ? new RegExp('^wsg-[a-z0-9]+-(' + [...ONLY].map((t) => t.toLowerCase().replace('-', '')).join('|') + ')-') : null;

function node(args) { return execFileSync(process.execPath, args, { cwd: WG, encoding: 'utf8', maxBuffer: 64 << 20 }); }
function dryIds(waveFile, types) {
  return node(['cli.js', 'generate', '--wave', waveFile, '--dry-run'].concat(types ? ['--types=' + types.join(',')] : [])).split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('wsg-'));
}
function zipsIn(dir) { return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => RE_LIVE.test(f) && f.endsWith('.zip') && (!onlyRe || onlyRe.test(f))) : []; }

function evidence(oldZip, newZip) {
  const a = new AdmZip(oldZip), b = new AdmZip(newZip);
  const rep = [];
  let unchanged = false;
  for (const name of ['manifest.json', 'deck.html']) {
    const ea = a.getEntry(name), eb = b.getEntry(name);
    if (!ea || !eb) { rep.push(name + ': MISSING'); continue; }
    const ba = ea.getData(), bb = eb.getData();
    if (name === 'manifest.json') {
      const ma = JSON.parse(ba.toString('utf8')), mb = JSON.parse(bb.toString('utf8'));
      const diff = Object.keys(Object.assign({}, ma, mb)).filter((k) => JSON.stringify(ma[k]) !== JSON.stringify(mb[k]));
      rep.push('manifest differs in: ' + (diff.join(',') || 'nothing') + (JSON.stringify(ma.title) === JSON.stringify(mb.title) ? ' (title same)' : ' (TITLE DIFFERS)'));
    } else {
      const t = (s) => (s.match(/<title>[\s\S]*?<\/title>/) || [''])[0];
      const d = (s) => (s.match(/<meta name="description" content="[^"]*"/) || [''])[0];
      const sa = ba.toString('utf8'), sb = bb.toString('utf8');
      unchanged = ba.equals(bb);
      rep.push('deck.html ' + (unchanged ? 'BYTE-EQUAL (unchanged — drop from the republish)' : 'changed') + ', title ' + (t(sa) === t(sb) ? 'EQUAL' : 'DIFFERS') + ', meta ' + (d(sa) === d(sb) ? 'EQUAL' : 'DIFFERS'));
    }
  }
  return { text: rep.join(' · '), unchanged };
}

/** The wave files + type filters that hold this locale's live affected decks. */
function jobs(loc) {
  const w = WAVE_OF[loc];
  return [
    { wave: `waves/wave-${w}-starterfix-a.json`, pin: { base: `waves/wave-${w}.json`, types: ['G2-235'], themeOverrides: { 'G2-235': 'shapes' } }, staging: `wave-${w}` },
    { wave: `waves/wave-${w}-starterfix-b.json`, pin: { base: `waves/wave-${w}.json`, types: ['G2-235'], themeOverrides: { 'G2-235': 'toys' } }, staging: `wave-${w}` },
    { wave: `waves/wave-measurement-${loc}.json`, types: ['G2-235'], staging: `wave-measurement-${loc}` },
    { wave: `waves/wave-b2-${loc}.json`, types: ['G2-278'], staging: `wave-b2-${loc}` },
    { wave: `waves/wave-b2var-${loc}.json`, types: ['G2-299'], staging: `wave-b2var-${loc}` },
    { wave: `waves/wave-b3-${loc}.json`, types: ['G2-318', 'G1-306'], staging: `wave-b3-${loc}` },
    { wave: `waves/wave-b3var-${loc}.json`, types: ['K-335', 'G2-339', 'G2-340', 'G2-341', 'G2-342', 'G1-333'], staging: `wave-b3var-${loc}` },
  ];
}

const failures = [];
const summary = [];
for (const loc of LOCALES) {
  const round = arg('round', '');
  const origDir = path.join(WG, 'out', 'staging', '_starterfix' + round, 'orig', loc);
  const freshDir = path.join(WG, 'out', 'staging', '_starterfix' + round, loc);
  const J = jobs(loc).map((j) => (ONLY && !j.pin ? { ...j, types: j.types.filter((t) => ONLY.has(t)) } : j)).filter((j) => (j.pin ? !ONLY || ONLY.has('G2-235') : j.types.length));
  // the live set = every affected ZIP in the staging pools this locale shipped from
  const live = new Map();
  for (const j of J) for (const z of zipsIn(path.join(WG, 'out', 'staging', j.staging))) live.set(z, j.staging);
  if (EVIDENCE) {
    // the live set is the BACKUP (the pools already hold the fresh ZIPs, plus any newly-passing coordinate)
    live.clear(); for (const z of zipsIn(origDir)) live.set(z, 'orig');
    let unchanged = 0;
    for (const z of [...live.keys()].sort()) {
      const o = path.join(origDir, z), n = path.join(freshDir, z);
      if (!fs.existsSync(o) || !fs.existsSync(n)) { console.log(`${loc} ${z}: MISSING old or new`); continue; }
      const e = evidence(o, n); if (e.unchanged) unchanged++;
      console.log(`${loc} ${z}: ${e.text}`);
    }
    for (const z of fs.readdirSync(freshDir).filter((f) => f.endsWith('.zip') && !live.has(f))) console.log(`${loc} ${z}: NEW (never published — the republish removes it)`);
    console.log(`${loc}: ${live.size} live, ${unchanged} unchanged`);
    continue;
  }
  // pin waves for the legacy d2 decks
  for (const j of J) if (j.pin) {
    const base = JSON.parse(fs.readFileSync(path.join(WG, j.pin.base), 'utf8'));
    const plan = { id: base.id, seedEpoch: base.seedEpoch || 1, locales: [loc], themes: base.themes, themesPerType: 1, difficulties: [2], types: j.pin.types, themeOverrides: j.pin.themeOverrides,
      _note: '2026-09-21 starter/ruler fix: pinned re-generation of the live G2-235 d2 deck; id kept so deckIdFor reproduces the live basename. Never prune with this file.' };
    fs.writeFileSync(path.join(WG, j.wave), JSON.stringify(plan, null, 2) + '\n');
  }
  // every live basename must be reproduced by its job's enumeration
  const produced = new Set();
  for (const j of J) for (const id of dryIds(j.wave, j.pin ? null : j.types)) produced.add(id + '.zip');
  const missing = [...live.keys()].filter((z) => !produced.has(z));
  if (missing.length) { console.error(`${loc}: the pinned enumeration does NOT reproduce ${missing.length} live basename(s): ${missing.join(' ')}`); process.exit(1); }
  const extra = [...produced].filter((z) => !live.has(z));
  console.log(`${loc}: enumeration reproduces all ${live.size} live basenames${extra.length ? ` (+${extra.length} not live: ${extra.join(' ')})` : ''}`);
  if (DRY) continue;

  fs.mkdirSync(origDir, { recursive: true }); fs.mkdirSync(freshDir, { recursive: true });
  for (const [z, st] of live) if (!fs.existsSync(path.join(origDir, z))) fs.copyFileSync(path.join(WG, 'out', 'staging', st, z), path.join(origDir, z));
  for (const j of J) {
    const out = node(['cli.js', 'generate', '--wave', j.wave, '--force'].concat(j.pin ? [] : ['--types=' + j.types.join(',')]));
    const line = out.split(/\r?\n/).filter((l) => /zipped:|failed:/.test(l)).join(' ');
    console.log(`${loc} ${path.basename(j.wave)}: ${line}`);
    if (!/failed: 0/.test(out)) failures.push(`${loc} ${j.wave}: ${out.split(/\r?\n/).filter((l) => /^FAIL|QA/.test(l)).slice(0, 4).join(' | ')}`);
  }
  let copied = 0;
  for (const [z, st] of live) { const p = path.join(WG, 'out', 'staging', st, z); if (fs.existsSync(p)) { fs.copyFileSync(p, path.join(freshDir, z)); copied++; } }
  // `extra` (a coordinate that passes QA now but was never published, e.g. g2235-toys-d3) stays in its
  // pool and OUT of the republish batch — publishing new decks is a separate decision
  summary.push(`${loc}: ${copied}/${live.size} fresh ZIPs in ${freshDir}`);
  console.log(summary[summary.length - 1]);
}
if (failures.length) { console.error('\nQA FAILURES (the live original stays in its pool; not copied to fresh):\n' + failures.join('\n')); process.exit(1); }
