#!/usr/bin/env node
/**
 * Fetches, READ-ONLY from the live origin, the thumbnail and the printed text of every page the week days hand out
 * (out/sub-plans/weeks-plan.json, written by lists/build-en-weeks.js --plan), so that each guest teacher script is
 * written from the picture and the text of its pages (Part 5 rule 4). Everything goes to out/sub-plans/thumbs/
 * (gitignored): pages/<slug>.png and text/<slug>.txt (pdftotext -enc UTF-8 of the printable PDF; the PDF is not kept).
 *
 *   node scripts/sub-plans/fetch-pages.js [--text]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const REPO = path.join(__dirname, '..', '..');
const T = path.join(REPO, 'out', 'sub-plans', 'thumbs');
const TEXT = process.argv.includes('--text');
const MANIFEST = process.argv.includes('--manifest');
const plan = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'sub-plans', 'weeks-plan.json'), 'utf8'));
const slugs = [...new Set(plan.map((b) => b.core))];
for (const d of ['pages', 'text']) fs.mkdirSync(path.join(T, d), { recursive: true });
const ORIGIN = 'https://www.lessoncraftstudio.com/en/decks/';
const curl = (url, out) => new Promise((res) => execFile('curl', ['-s', '--max-time', '60', '--resolve', 'www.lessoncraftstudio.com:443:65.108.5.250', '-o', out, '-w', '%{http_code}', url], (e, so) => res(String(so))));
const run = (cmd, args) => new Promise((res) => execFile(cmd, args, { maxBuffer: 1 << 24 }, (e, so) => res(e ? null : so)));
(async () => {
  let i = 0, bad = 0;
  const work = async () => {
    while (i < slugs.length) {
      const slug = slugs[i++];
      const png = path.join(T, 'pages', slug + '.png');
      if (!fs.existsSync(png)) { const c = await curl(ORIGIN + slug + '/thumbnail.png', png); if (c !== '200') { bad++; console.log('FAIL  ' + slug + ' thumbnail ' + c); fs.rmSync(png, { force: true }); } }
      // the page's manifest names its pictures in order (vocabulary): the words a sound task's script names
      const man = path.join(T, 'text', slug + '.json');
      if (MANIFEST && !fs.existsSync(man)) { const c = await curl(ORIGIN + slug + '/manifest.json', man); if (c !== '200') { bad++; console.log('FAIL  ' + slug + ' manifest ' + c); fs.rmSync(man, { force: true }); } else { const j = JSON.parse(fs.readFileSync(man, 'utf8')); fs.writeFileSync(man, JSON.stringify({ vocabulary: j.vocabulary, images: j.images_used, settings: j.settings })); } }
      const txt = path.join(T, 'text', slug + '.txt');
      if (TEXT && !fs.existsSync(txt)) {
        const pdf = path.join(T, 'text', slug + '.pdf');
        const c = await curl(ORIGIN + slug + '/' + slug + '-printable.pdf', pdf);
        if (c !== '200') { bad++; console.log('FAIL  ' + slug + ' pdf ' + c); } else { const t = await run('pdftotext', ['-enc', 'UTF-8', pdf, '-']); fs.writeFileSync(txt, t || ''); }
        fs.rmSync(pdf, { force: true });
      }
    }
  };
  await Promise.all(Array.from({ length: 8 }, work));
  console.log(slugs.length + ' pages, ' + bad + ' failure(s)');
  process.exit(bad ? 1 : 0);
})();
