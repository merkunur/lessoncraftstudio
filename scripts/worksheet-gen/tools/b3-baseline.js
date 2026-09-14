#!/usr/bin/env node
/**
 * b3-baseline.js --capture | --check [--expect=<file>] [--quick] [--types=A,B] [--locales=a,b] [--diffs=1,2]
 *                --poison
 *
 * Byte-identity harness for the nt20-C (b3) batch — the release condition for
 * every shared edit (enumerate.js, rng.js, render-instance.js, manifest.js,
 * deck-html.js, _shared factories, components, primitives, data banks).
 *
 * Two sections, both stored in out/b3-baseline.json:
 *   build — sha1(build().bodyHtml | resolved strings) for EVERY spec on disk
 *           (loadAllTypes: every wave-001..011 was types:"all" in 11 locales,
 *           so every spec is live everywhere) × themes × d1-3 × 11 locales.
 *           The b2 harness hashed a hand list in en/de/fi only and could not
 *           see the division-glyph fix (its consumers were not listed and sv
 *           was not hashed).
 *   enum  — sha1 of "deckId=seed" lines for every waves/*.json. The build hash
 *           cannot see deckId/seed, which is exactly what the unitAxis knob
 *           touches; a drift here means an enumerator change reached a
 *           published wave.
 *
 * --check [--expect=<file>]  the drift set must EQUAL the keys listed in the
 *   file (one per line; build keys "ID|theme|dN|loc", enum keys "wave:<id>").
 *   Without --expect the expected drift set is empty. Either direction fails:
 *   an unexpected drift AND an expected drift that did not happen.
 * --quick  en/de/sv/fi × d2 (the edit loop); the full run is the release gate.
 * --poison self-test: an env hook perturbs exactly one build hash and one
 *   wave hash; each must surface as exactly one drift, and the unperturbed
 *   control must be 0 drift. "NEEDLE MATCHED NOTHING" if the hook found no
 *   coordinate.
 *
 * Pure build() hashing — no browser. ~7 min full, ~1 min --quick.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadAllTypes } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { resolveStrings } = require('../i18n/strings.js');
const { enumerate } = require('../enumerate.js');

const OUT = path.join(__dirname, '..', 'out', 'b3-baseline.json');
const WAVES_DIR = path.join(__dirname, '..', 'waves');
const ALL_LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const THEMES = ['animals', 'fruits'];
const BW_THEMES = ['animals bw', 'fruits bw'];

function arg(name, def) {
  const a = process.argv.find((x) => x.startsWith('--' + name + '='));
  return a ? a.slice(name.length + 3) : def;
}
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));

function sha1(s) { return crypto.createHash('sha1').update(s).digest('hex'); }

async function computeBuild(opts) {
  const poison = opts.poison || null;
  const specs = loadAllTypes().filter((s) => s.id && (!opts.types || opts.types.includes(s.id)));
  const locales = opts.locales || ALL_LOCALES;
  const diffs = opts.diffs || [1, 2, 3];
  const res = {};
  let poisoned = 0;
  for (const type of specs) {
    const id = type.id;
    const ax = type.themeAxis || {};
    const themes = ax.applicable ? (ax.bwOnly ? BW_THEMES : THEMES) : [null];
    for (const theme of themes) for (const difficulty of diffs) for (const locale of locales) {
      const key = `${id}|${theme || 'nothm'}|d${difficulty}|${locale}`;
      try {
        const rng = makeRng(instanceSeed({ typeId: id, theme, difficulty, seedEpoch: 1 }));
        const built = await type.build({ theme, difficulty, locale }, { rng });
        const strings = resolveStrings(id, locale, type);
        let body = built.bodyHtml;
        if (poison && poison.build === key) { body += '|poison'; poisoned++; }
        res[key] = sha1(body + '|' + JSON.stringify(strings));
      } catch (e) {
        res[key] = 'ERR:' + String(e.message).slice(0, 80);
      }
    }
  }
  if (poison && poison.build && !poisoned) throw new Error('NEEDLE MATCHED NOTHING: build ' + poison.build);
  return res;
}

function computeEnum(opts) {
  const poison = opts.poison || null;
  const res = {};
  let poisoned = 0;
  const files = fs.readdirSync(WAVES_DIR).filter((f) => f.endsWith('.json')).sort();
  for (const f of files) {
    let plan;
    try { plan = JSON.parse(fs.readFileSync(path.join(WAVES_DIR, f), 'utf8')); } catch (e) { res['wave:' + f] = 'ERR:parse ' + e.message.slice(0, 60); continue; }
    const key = 'wave:' + (plan.id || f);
    // the eleven legacy types:'all' waves (001-011) enumerate by the spec's POSITION in loadAllTypes(),
    // so ANY new spec file shifts their theme round-robin — inherent, and harmless because those waves
    // are only ever regenerated PINNED (tools/divfix-regen.js). Snapshotting them would fail every
    // new family; skip them and hash only the explicit-type waves.
    if (plan.types === 'all') continue;
    try {
      const { instances, skipped } = enumerate(plan);
      const lines = instances.map((i) => i.deckId + '=' + i.seed);
      if (poison && poison.enum === key && lines.length) { lines[0] += '|p'; poisoned++; }
      res[key] = sha1(lines.join('\n') + '\n#skipped=' + skipped.length);
    } catch (e) {
      res[key] = 'ERR:' + String(e.message).slice(0, 80);
    }
  }
  if (poison && poison.enum && !poisoned) throw new Error('NEEDLE MATCHED NOTHING: enum ' + poison.enum);
  return res;
}

async function computeAll(opts) {
  return { build: await computeBuild(opts), enum: computeEnum(opts) };
}

function diffSets(base, now) {
  const drift = [];
  const missing = [];
  for (const sec of ['build', 'enum']) {
    for (const k of Object.keys(base[sec] || {})) {
      if (!(k in (now[sec] || {}))) missing.push(sec + ':' + k);
      else if (base[sec][k] !== now[sec][k]) drift.push(k);
    }
  }
  return { drift, missing };
}

function readExpect(file) {
  if (!file) return new Set();
  return new Set(fs.readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#')));
}

function quickOpts() {
  const o = {};
  const t = arg('types'); if (t) o.types = t.split(',');
  const l = arg('locales'); if (l) o.locales = l.split(',');
  const d = arg('diffs'); if (d) o.diffs = d.split(',').map(Number);
  if (flags.has('--quick')) { o.locales = o.locales || ['en', 'de', 'sv', 'fi']; o.diffs = o.diffs || [2]; }
  return o;
}

async function main() {
  if (flags.has('--poison')) return runPoison();
  const mode = flags.has('--capture') ? 'capture' : flags.has('--check') ? 'check' : null;
  if (!mode) { console.error('usage: b3-baseline.js --capture|--check [--expect=<file>] [--quick] [--types=] [--locales=] [--diffs=] | --poison'); process.exit(2); }
  const opts = quickOpts();
  const t0 = Date.now();
  const now = await computeAll(opts);
  const nb = Object.keys(now.build).length, ne = Object.keys(now.enum).length;
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  if (mode === 'capture') {
    if (opts.types || opts.locales || opts.diffs) { console.error('refuse: --capture must be the FULL run (no --quick/--types/--locales/--diffs)'); process.exit(2); }
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(now, null, 1) + '\n');
    const errs = Object.entries(now.build).filter(([, v]) => v.startsWith('ERR:'));
    const eerrs = Object.entries(now.enum).filter(([, v]) => v.startsWith('ERR:'));
    console.log(`captured build ${nb} coordinates + enum ${ne} waves → ${OUT} in ${secs}s (${errs.length} build errors, ${eerrs.length} wave errors)`);
    errs.slice(0, 10).forEach(([k, v]) => console.log('  ' + k + ' ' + v));
    eerrs.slice(0, 10).forEach(([k, v]) => console.log('  ' + k + ' ' + v));
    return process.exit(0);
  }
  if (!fs.existsSync(OUT)) { console.error('no baseline captured'); process.exit(2); }
  const base = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  // narrow the baseline to what was recomputed (quick/filtered runs)
  const narrowed = { build: {}, enum: base.enum };
  for (const k of Object.keys(base.build)) if (k in now.build) narrowed.build[k] = base.build[k];
  const { drift, missing } = diffSets(narrowed, now);
  const expect = readExpect(arg('expect'));
  const unexpected = drift.filter((k) => !expect.has(k));
  const notDrifted = [...expect].filter((k) => !drift.includes(k) && (k in now.build || k in now.enum));
  console.log(`checked build ${nb} + enum ${ne} in ${secs}s: ${drift.length} drifted (${expect.size} expected), ${missing.length} missing`);
  unexpected.slice(0, 40).forEach((k) => console.log('  DRIFT ' + k));
  if (unexpected.length > 40) console.log('  … +' + (unexpected.length - 40) + ' more');
  notDrifted.slice(0, 40).forEach((k) => console.log('  EXPECTED-BUT-STABLE ' + k));
  missing.slice(0, 20).forEach((k) => console.log('  MISSING ' + k));
  const bad = unexpected.length + notDrifted.length + missing.length;
  console.log(bad ? 'FAIL' : 'PASS');
  process.exit(bad ? 1 : 0);
}

async function runPoison() {
  // control + two perturbations on a small, fast slice
  const opts = { types: ['K-004', 'G2-216'], locales: ['en', 'sv'], diffs: [2] };
  const control = await computeAll(opts);
  const again = await computeAll(opts);
  const c = diffSets(control, again);
  if (c.drift.length || c.missing.length) { console.log('control drifted on an unchanged tree — non-deterministic build: ' + c.drift.join(',')); process.exit(1); }
  const buildKey = Object.keys(control.build).find((k) => !control.build[k].startsWith('ERR:'));
  const enumKey = Object.keys(control.enum).find((k) => !control.enum[k].startsWith('ERR:'));
  let killed = 0;
  for (const [name, poison, sec] of [['build', { build: buildKey }, 'build'], ['enum', { enum: enumKey }, 'enum']]) {
    let p;
    try { p = await computeAll({ ...opts, poison }); } catch (e) { console.log('  ' + name + ': ' + e.message); continue; }
    const d = diffSets(control, p);
    const ok = d.drift.length === 1 && d.drift[0] === poison[sec];
    console.log(`  poison ${name}: ${ok ? 'KILLED' : 'SURVIVED'} (${d.drift.length} drift: ${d.drift.slice(0, 3).join(',')})`);
    if (ok) killed++;
  }
  console.log(`poison ${killed}/2 killed`);
  process.exit(killed === 2 ? 0 : 1);
}

main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
