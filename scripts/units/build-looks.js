#!/usr/bin/env node
/**
 * A LOOK at the files of the Teacher plan (Daily Teaching System, Part 11.6): until now a page could only TELL a
 * visitor what the plan holds; the files themselves are behind the plan. This script makes, per language and grade,
 * three pictures of real pages, taken from the built files and never drawn:
 *
 *   unit   the first lesson sheet of the teacher guide of the first unit of the grade's mathematics plan
 *   pack   the first page (the day at a glance) of the guest teacher pages of the grade's first sub plan
 *   check  the first teacher page of the unit check of that unit (or of the grade's first live check)
 *
 *   node scripts/units/build-looks.js --loc=en [--check]
 *     reads   out/teacher-files/<loc>/…           (built by build-guide.js, sub-plans/build-pack.js, assessments/build-teacher-pages.js)
 *     writes  out/teaching-looks/<loc>/<name>.<hash>.webp   640 px wide; uploaded by scripts/units/upload-looks.sh,
 *                                                           served at /teaching-looks/ (patch-nginx-teaching-looks.py)
 *             frontend/content/units/looks.<loc>.json       GENERATED and committed: what each grade shows and the
 *                                                           picture's address, width and height
 *
 * PC ONLY: a PDF page is rendered with Python's PyMuPDF (`python -c "import pymupdf"`), which the server does not
 * have. The pictures are renders: they are never committed. The file name carries the picture's hash, so a rebuilt
 * picture has a new address and a browser never shows an old one.
 * --check: the committed looks file is what the script writes today (same grades, same files, same hashes).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..', '..');
const sharp = require(path.join(REPO, 'frontend', 'node_modules', 'sharp'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const check = process.argv.includes('--check');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const C = path.join(REPO, 'frontend', 'content');
const FILES = path.join(REPO, 'out', 'teacher-files', loc);
const OUT = path.join(REPO, 'out', 'teaching-looks', loc);
const WIDTH = 640;
const GRADE_ORDER = ['P', 'K', '1', '2', '3', '4', '5'];

function renderPage(pdf, pageIndex) {
  const png = path.join(OUT, '_page.png');
  const r = spawnSync('python', ['-c', 'import sys,pymupdf\nd=pymupdf.open(sys.argv[1])\nd[int(sys.argv[2])].get_pixmap(dpi=120).save(sys.argv[3])', pdf, String(pageIndex), png], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('could not render ' + path.relative(REPO, pdf) + ' page ' + (pageIndex + 1) + ' (Python with PyMuPDF is needed on the PC): ' + (r.stderr || '').trim().split('\n').pop());
  return png;
}

(async () => {
  const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json'));
  const packsPath = path.join(C, 'sub-plans', 'packs.' + loc + '.json');
  const checksPath = path.join(C, 'assessments', 'checks.' + loc + '.json');
  const packs = fs.existsSync(packsPath) ? readJson(packsPath).packs.filter((p) => p.status === 'live') : [];
  const checks = fs.existsSync(checksPath) ? readJson(checksPath).checks.filter((c) => c.status === 'live') : [];
  const liveUnits = unitsFile.units.filter((u) => u.status === 'live');
  const byId = new Map(liveUnits.map((u) => [u.id, u]));
  fs.mkdirSync(OUT, { recursive: true });
  const looks = {}; const made = [];
  for (const grade of GRADE_ORDER) {
    const mine = liveUnits.filter((u) => String(u.grade) === grade);
    if (!mine.length) continue;
    // the first unit of the grade's mathematics plan; without a plan, the grade's first unit
    const plan = unitsFile.plans.find((p) => p.status === 'live' && String(p.grade) === grade && p.subject === 'math') || unitsFile.plans.find((p) => p.status === 'live' && String(p.grade) === grade);
    const unit = (plan && byId.get(plan.units[0].id)) || mine[0];
    const pack = packs.find((p) => String(p.grade) === grade) || null;
    const chk = checks.find((c) => c.unit === unit.id) || checks.find((c) => byId.get(c.unit) && String(byId.get(c.unit).grade) === grade) || null;
    const want = [
      ['unit', path.join(FILES, 'units', unit.id, 'teacher-guide.pdf'), 1, { slug: unit.slug, title: unit.title }],
      pack ? ['pack', path.join(FILES, 'sub-plans', pack.id, 'guest-teacher-pages.pdf'), 0, { slug: pack.slug, title: pack.title }] : null,
      chk ? ['check', path.join(FILES, 'checks', chk.unit, 'teacher-pages.pdf'), 0, { slug: chk.slug, title: byId.get(chk.unit).title }] : null,
    ].filter(Boolean);
    const entry = {};
    for (const [kind, pdf, pageIndex, meta] of want) {
      if (!fs.existsSync(pdf)) throw new Error('grade ' + grade + ' ' + kind + ': ' + path.relative(REPO, pdf) + ' is not built');
      const png = renderPage(pdf, pageIndex);
      const buf = await sharp(png).resize({ width: WIDTH }).webp({ quality: 82 }).toBuffer();
      const { width, height } = await sharp(buf).metadata();
      const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
      const name = 'g' + grade.toLowerCase() + '-' + kind + '.' + hash + '.webp';
      if (!check) fs.writeFileSync(path.join(OUT, name), buf);
      made.push(name);
      entry[kind] = { ...meta, src: '/teaching-looks/' + loc + '/' + name, width, height };
    }
    looks[grade] = entry;
  }
  if (fs.existsSync(path.join(OUT, '_page.png'))) fs.unlinkSync(path.join(OUT, '_page.png'));
  // pictures of an earlier build have other names: they leave the folder, so the upload sends only what the file names
  if (!check) for (const f of fs.readdirSync(OUT)) if (f.endsWith('.webp') && !made.includes(f)) fs.unlinkSync(path.join(OUT, f));
  const file = path.join(C, 'units', 'looks.' + loc + '.json');
  const out = JSON.stringify({ $comment: 'GENERATED by scripts/units/build-looks.js: the pictures of real pages of the Teacher plan each grade shows. Never edit by hand.', locale: loc, looks }, null, 1) + '\n';
  if (check) {
    const cur = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : '';
    if (cur !== out) { console.log(loc + ': the looks file is not what the script writes today (node scripts/units/build-looks.js --loc=' + loc + ', then upload)'); process.exit(1); }
    console.log(loc + ': looks file is current'); return;
  }
  fs.writeFileSync(file, out);
  console.log(loc + ': ' + made.length + ' picture(s) for ' + Object.keys(looks).length + ' grade(s) → ' + path.relative(REPO, OUT) + ', ' + path.relative(REPO, file));
})().catch((e) => { console.error(e.message); process.exit(1); });
