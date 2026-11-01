#!/usr/bin/env node
/**
 * The student play tree (ARCHITECTURE §1 `/makers/play/<v>/`, task 2 of the ten): everything /s/<linkId> needs that
 * is not a maker bundle, content-hashed into one immutable version folder:
 *
 *   out/makers/play/<version>/  index.html · play.js · play.css · recipe.js · resolve-version.js (the two shell modules
 *                               play.js imports) · strings.json (i18n/play-strings.json) · landings.json (the indexable
 *                               page per maker × language, play/makers-index.js) · chrome/<loc>.json ×11 (site chrome)
 *   out/makers/play/current.txt the version the website route serves (frontend/app/s/[id]/route.ts reads
 *                               MAKERS_PLAY_DIR/<current>/…)
 *
 *   node scripts/makers/build-play.js            (build-bundles.js does not call it yet — see the handoff; run it after)
 *
 * The preview server (serve.js) serves the same sources straight from the repo, so a local run needs no build.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..', '..');
const OUT = path.join(REPO, 'out', 'makers', 'play');
const SRC = path.join(__dirname, 'play');
const { landings, LOCALES } = require('./play/makers-index.js');
const { chromeFor } = require('./play/chrome.js');
const ssr = require('./play/ssr.js');

function main() {
  const files = {};
  for (const f of ['index.html', 'play.js', 'play.css']) files[f] = fs.readFileSync(path.join(SRC, f), 'utf8');
  for (const f of ['recipe.js', 'resolve-version.js']) files[f] = fs.readFileSync(path.join(__dirname, 'shell', f), 'utf8');
  const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'play-strings.json'), 'utf8'));
  for (const block of ['play', 'share']) for (const [k, by] of Object.entries(strings[block])) for (const loc of LOCALES) if (!by[loc] || !String(by[loc]).trim()) throw new Error(`play-strings.json: ${block}.${k} has no ${loc}`);
  for (const m of ssr.MARKERS) if (!files['index.html'].includes(m)) throw new Error('play/index.html: marker ' + m + ' missing');
  files['strings.json'] = JSON.stringify(strings);
  const L = landings();
  for (const [maker, by] of Object.entries(L)) for (const loc of LOCALES) { const e = by[loc]; if (!e || !/^\/[a-z]{2}\/tools(\/[a-z0-9-]+)?$/.test(e.url) || !e.name) throw new Error(`landings: ${maker} ${loc} → ${JSON.stringify(e)}`); }
  files['landings.json'] = JSON.stringify(L);
  for (const loc of LOCALES) files['chrome/' + loc + '.json'] = JSON.stringify(chromeFor(loc));
  const hash = crypto.createHash('sha1');
  for (const k of Object.keys(files).sort()) hash.update(k + '\0' + files[k] + '\0');
  const version = hash.digest('hex').slice(0, 12);
  const dir = path.join(OUT, version);
  fs.mkdirSync(path.join(dir, 'chrome'), { recursive: true });
  for (const [k, v] of Object.entries(files)) fs.writeFileSync(path.join(dir, k), v);
  fs.writeFileSync(path.join(OUT, 'current.txt'), version + '\n');
  console.log(`play tree: ${version} (${Object.keys(files).length} files) → ${path.relative(REPO, dir)}`);
  return version;
}

if (require.main === module) { try { main(); } catch (e) { console.error('build-play: ' + e.message); process.exit(1); } }
module.exports = { main, OUT };
