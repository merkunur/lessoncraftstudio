/**
 * Image-cache puller — downloads @3x WebP theme images from production into
 * cache/themes/<theme>/<noun>@3x.webp and maintains cache/manifest.json (the
 * honesty manifest: which nouns actually exist per theme, their pixel size,
 * and their vocab-key resolution).
 *
 * Inventory SoT: image-cache/inventory-3x.txt — a `<theme>/<noun>@3x.webp`
 * line dump from /var/www/lcs-media/image-library-webp/themes/ (refresh via
 * the plink find command in the header of that file's git history).
 *
 * Usage:
 *   node scripts/worksheet-gen/image-cache/pull-themes.js animals fruits
 *   node scripts/worksheet-gen/image-cache/pull-themes.js --all-color
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const { loadVocab } = require('../../publish-cli/deck-rich-alt.js');

const ROOT = path.join(__dirname, '..');
const CACHE = path.join(ROOT, 'cache');
const INVENTORY = path.join(__dirname, 'inventory-3x.txt');
const MANIFEST = path.join(CACHE, 'manifest.json');
const BASE_URL = 'https://www.lessoncraftstudio.com/image-library-webp/themes/';
const CONCURRENCY = 4;
const EXCLUDED_THEMES = new Set(['BACKGROUNDS', 'BORDERS']);

const BW_RE = /\sbw(\s\d+)?$/i;

function isBwTheme(theme) { return BW_RE.test(theme); }
function baseTheme(theme) { return theme.replace(BW_RE, '').trim(); }

/** "cat 2" / "cat " → "cat"; keeps multiword nouns like "french fries". */
function normalizeNoun(noun) {
  return noun.replace(/\s+\d+$/, '').trim();
}

/** Vocab keys are hyphenated lowercase ("french-fries"); files use spaces. */
function nounToVocabKey(noun, vocab) {
  const candidates = [
    noun.toLowerCase().replace(/\s+/g, '-'),
    noun.toLowerCase(),
  ];
  for (const c of candidates) if (vocab[c]) return c;
  return null;
}

function readInventory() {
  const lines = fs.readFileSync(INVENTORY, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
  const themes = {};
  for (const line of lines) {
    const m = line.match(/^(.+?)\/(.+)@3x\.webp$/);
    if (!m) continue;
    const [, theme, noun] = m;
    if (EXCLUDED_THEMES.has(theme)) continue;
    (themes[theme] = themes[theme] || []).push(noun);
  }
  return themes;
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'lcs-worksheet-gen-cache' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(url + ' -> ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function pullTheme(theme, nouns, vocab, manifest) {
  const dir = path.join(CACHE, 'themes', theme);
  fs.mkdirSync(dir, { recursive: true });
  const entry = { bw: isBwTheme(theme), baseTheme: baseTheme(theme), nouns: {} };
  const queue = nouns.slice();
  let pulled = 0, skipped = 0, failed = 0;

  async function worker() {
    while (queue.length) {
      const noun = queue.shift();
      const file = noun + '@3x.webp';
      const dest = path.join(dir, file);
      try {
        if (!fs.existsSync(dest)) {
          const url = BASE_URL + encodeURIComponent(theme) + '/' + encodeURIComponent(noun + '@3x') + '.webp';
          fs.writeFileSync(dest, await get(url));
          pulled++;
        } else skipped++;
        const meta = await sharp(dest).metadata();
        const key = normalizeNoun(noun);
        if (!entry.nouns[key]) entry.nouns[key] = { files: [], vocabKey: nounToVocabKey(key, vocab), px: [meta.width, meta.height], alpha: !!meta.hasAlpha };
        entry.nouns[key].files.push(file);
      } catch (e) {
        failed++;
        console.warn('  FAIL', theme + '/' + noun, e.message);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  manifest.themes[theme] = entry;
  const nounCount = Object.keys(entry.nouns).length;
  const unresolved = Object.values(entry.nouns).filter((n) => !n.vocabKey).length;
  console.log(`${theme}: ${nounCount} nouns (${pulled} pulled, ${skipped} cached, ${failed} failed, ${unresolved} no-vocab)`);
}

(async () => {
  const args = process.argv.slice(2);
  const inventory = readInventory();
  let themes;
  if (args.includes('--all-color')) themes = Object.keys(inventory).filter((t) => !isBwTheme(t));
  else if (args.includes('--all')) themes = Object.keys(inventory);
  else themes = args;
  if (!themes.length) {
    console.log('Themes available:', Object.keys(inventory).join(', '));
    process.exit(1);
  }
  const vocab = loadVocab();
  let manifest = { generatedAt: null, themes: {} };
  if (fs.existsSync(MANIFEST)) manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  for (const theme of themes) {
    if (!inventory[theme]) { console.warn('SKIP unknown theme:', theme); continue; }
    await pullTheme(theme, inventory[theme], vocab, manifest);
  }
  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('manifest.json updated:', Object.keys(manifest.themes).length, 'themes cached');
})();
