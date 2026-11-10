#!/usr/bin/env node
/**
 * fl-art.js — the flagship drawings (art-src/<set>.js) to pictures (docs/makers/FLAGSHIP.md).
 *   node tools/fl-art.js sheet <set|all> [out.png] [--only=a,b] [--size=300] [--cols=6]   a contact sheet to read
 *   node tools/fl-art.js install [set]                                                     webp into cache/themes + themes-512
 */
'use strict';
const fs = require('fs'); const path = require('path');
const sharp = require('sharp');
const K = require('../art-src/kit.js');

const SRC = path.join(__dirname, '..', 'art-src');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const sets = (name) => (name === 'all' || !name ? fs.readdirSync(SRC).filter((f) => f.endsWith('.js') && f !== 'kit.js' && !f.startsWith('_')).map((f) => f.slice(0, -3)) : name.split(','));
const load = (set) => { delete require.cache[require.resolve(path.join(SRC, set + '.js'))]; return require(path.join(SRC, set + '.js')); };

async function sheet(name, out) {
  const only = arg('only') ? new Set(arg('only').split(',')) : null;
  const S = +arg('size', 300), cols = +arg('cols', 6);
  const items = [];
  for (const set of sets(name)) for (const [n, layers] of Object.entries(load(set).pictures)) if (!only || only.has(n)) items.push([set, n, layers]);
  const rows = Math.ceil(items.length / cols), comps = [];
  for (let i = 0; i < items.length; i++) {
    const [, n, layers] = items[i];
    const png = await sharp(Buffer.from(K.svg(layers, S - 10))).flatten({ background: '#fff' }).png().toBuffer();
    comps.push({ input: png, left: (i % cols) * S + 5, top: Math.floor(i / cols) * (S + 22) + 3 });
    comps.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="20"><text x="${S / 2}" y="15" font-family="Arial" font-size="14" text-anchor="middle" fill="#666">${n}</text></svg>`), left: (i % cols) * S, top: Math.floor(i / cols) * (S + 22) + S - 3 });
  }
  await sharp({ create: { width: cols * S, height: rows * (S + 22), channels: 3, background: '#fff' } }).composite(comps).png().toFile(out);
  console.log(`${items.length} drawings → ${out}`);
}

/** every drawing as the library's own files: cache/themes/<theme>/<noun>@3x.webp (1536 px, alpha) + the derived 512 px copy, and a
 *  manifest entry with vocabKey null, so no word-based maker ever sees it (docs/makers/FLAGSHIP.md rule 2) */
async function install(name) {
  const CACHE = path.join(__dirname, '..', 'cache'), MAN = path.join(CACHE, 'manifest.json');
  const man = JSON.parse(fs.readFileSync(MAN, 'utf8'));
  let n = 0;
  for (const set of sets(name)) {
    const m = load(set), names = Object.keys(m.pictures);
    for (let i = 0; i < names.length; i++) {
      const pic = names[i], theme = m.themeOf ? m.themeOf(pic, i) : m.theme, noun = pic.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
      const file = noun + '@3x.webp';
      for (const d of ['themes', 'themes-512']) fs.mkdirSync(path.join(CACHE, d, theme), { recursive: true });
      const png = await sharp(Buffer.from(K.svg(m.pictures[pic], 1536))).png().toBuffer();
      await sharp(png).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(CACHE, 'themes', theme, file));
      await sharp(png).resize(512, 512, { fit: 'inside' }).webp({ quality: 88, alphaQuality: 95 }).toFile(path.join(CACHE, 'themes-512', theme, file));
      const t = man.themes[theme] = man.themes[theme] || { bw: true, baseTheme: theme.replace(/ bw$/, ''), fl: true, nouns: {} };
      t.nouns[noun] = { files: [file], vocabKey: null, px: [1536, 1536], alpha: true, fl: pic };
      n++;
    }
  }
  fs.writeFileSync(MAN, JSON.stringify(man, null, 2));
  console.log(n + ' drawings installed');
}

/**
 * the REDRAWN drawings (art-src/drawn/<noun>.svg, docs/makers/ART-BRIEF.md) as the library's own files, in the theme the set
 * module gives the noun: the same webp pair and manifest entry install() writes. Only the drawings the review passed
 * (docs/makers/art-passed.json) unless --all; --only=a,b for a few. A noun with no redrawn file keeps what is installed.
 */
async function installDrawn() {
  const CACHE = path.join(__dirname, '..', 'cache'), MAN = path.join(CACHE, 'manifest.json'), DRAWN = path.join(SRC, 'drawn');
  const man = JSON.parse(fs.readFileSync(MAN, 'utf8'));
  const passed = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'docs', 'makers', 'art-passed.json'), 'utf8')));
  const only = arg('only') ? new Set(arg('only').split(',')) : null, all = process.argv.includes('--all');
  const themeOf = {}, picOf = {};
  for (const set of sets('all')) { const m = load(set); Object.keys(m.pictures).forEach((p, i) => { const noun = p.replace(/[^a-z0-9]+/gi, '_').toLowerCase(); themeOf[noun] = m.themeOf ? m.themeOf(p, i) : m.theme; picOf[noun] = p; }); }
  let n = 0, skipped = 0;
  for (const f of fs.readdirSync(DRAWN).filter((x) => x.endsWith('.svg')).sort()) {
    const noun = f.slice(0, -4);
    if (only ? !only.has(noun) : !all && !passed.has(noun)) { skipped++; continue; }
    const theme = themeOf[noun];
    if (!theme) { console.log('no theme for ' + noun + ': not installed'); continue; }
    const file = noun + '@3x.webp', svg = fs.readFileSync(path.join(DRAWN, f));
    for (const d of ['themes', 'themes-512']) fs.mkdirSync(path.join(CACHE, d, theme), { recursive: true });
    const png = await sharp(svg, { density: 72 * 1536 / 600 }).resize(1536, 1536, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    await sharp(png).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(CACHE, 'themes', theme, file));
    await sharp(png).resize(512, 512, { fit: 'inside' }).webp({ quality: 88, alphaQuality: 95 }).toFile(path.join(CACHE, 'themes-512', theme, file));
    const t = man.themes[theme] = man.themes[theme] || { bw: true, baseTheme: theme.replace(/ bw$/, ''), fl: true, nouns: {} };
    t.nouns[noun] = { files: [file], vocabKey: null, px: [1536, 1536], alpha: true, fl: picOf[noun], drawn: true };
    n++;
  }
  fs.writeFileSync(MAN, JSON.stringify(man, null, 2));
  console.log(`${n} redrawn drawings installed (${skipped} not passed yet, left as they were)`);
}

async function main() {
  const [cmd, name, out] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (cmd === 'install-drawn') return installDrawn();
  if (cmd === 'sheet') return sheet(name, out || path.join(process.env.TEMP, 'fl', 'art.png'));
  if (cmd === 'install') return install(name);
  console.error('usage: fl-art.js sheet <set|all> [out.png]'); process.exit(2);
}
main().catch((e) => { console.error(e); process.exit(1); });
