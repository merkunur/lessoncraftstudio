#!/usr/bin/env node
/**
 * The gates of units and sub packs (Daily Teaching System, Parts 3–5). They read COMMITTED files only, so they run
 * on the server too (deploy.sh). What needs the published catalogue (does every page exist?) is checked where the
 * catalogue table is: scripts/units/assemble.js and scripts/sub-plans/assemble.js with --check, and check-live.js.
 *
 *   node scripts/units/gates.js            exit 1 on any failure
 *   node scripts/units/gates.js --warn     report, exit 0
 *   node scripts/units/gates.js --poison   every gate must FAIL on a file spoiled for it, and pass on the real files
 *
 *   P1  shape      ids and slugs unique and url-safe per language; status pilot | live; title, metadata present;
 *                  meta description 110–170 characters, meta title at most 70
 *   P2  points     every lesson and block names a teaching point of the content graph
 *   P3  no filler  a unit has at least 4 lessons; a lesson at least two real assets (pages, a tool, an activity);
 *                  a teacher note says a mistake, gives WORDS (something in quotation marks) and what to watch for;
 *                  no two teaching points share a note (word 3-grams, Jaccard 0.5 or more)
 *   P4  scripts    a sub pack has at least 5 blocks with reading, writing and math; every block's script has what to
 *                  say (in quotation marks), how to start together and what to do when a child is stuck
 *   P5  tier truth no visible string says the material is free (the plan's name comes from the pricing catalogue)
 *   P6  strings    every language's ui file holds exactly the keys of the English one
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const C = path.join(REPO, 'frontend', 'content');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const FREE = { en: /\bfree\b/i, de: /\b(kostenlos|gratis|umsonst)\b/i, fr: /\b(gratuit|gratuite|gratuits|gratuites|gratuitement)\b/i, es: /\b(gratis|gratuit[oa]s?)\b/i, pt: /\b(grátis|gratuit[oa]s?)\b/i, it: /\b(gratis|gratuit[oaie])\b/i, nl: /\b(gratis|kosteloos)\b/i, sv: /\b(gratis|kostnadsfri\w*)\b/i, da: /\b(gratis)\b/i, no: /\b(gratis)\b/i, fi: /(ilmai[ns]\w*|maksut\w*)/i };
const readJson = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null);
const QUOTED = /["“„«»”][^"“”„«»]{3,}["”“»«]/;

function load() {
  const d = { points: new Set(readJson(path.join(C, 'teaching-graph', 'points.json')).points.map((p) => p.id)), loc: {} };
  for (const l of LOCALES) {
    const units = readJson(path.join(C, 'units', 'units.' + l + '.json'));
    const packs = readJson(path.join(C, 'sub-plans', 'packs.' + l + '.json'));
    if (!units && !packs) continue;
    d.loc[l] = { units: units ? units.units : [], packs: packs ? packs.packs : [], uiU: readJson(path.join(C, 'units', 'ui.' + l + '.json')), uiS: readJson(path.join(C, 'sub-plans', 'ui.' + l + '.json')) };
  }
  return d;
}
const grams = (s) => { const w = s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean); const g = new Set(); for (let i = 0; i + 2 < w.length; i++) g.add(w[i] + ' ' + w[i + 1] + ' ' + w[i + 2]); return g; };
const jaccard = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); };

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push(g + '  ' + m);
  for (const [l, L] of Object.entries(d.loc)) {
    for (const [kind, list] of [['unit', L.units], ['pack', L.packs]]) {
      const ids = new Set(), slugs = new Set();
      for (const x of list) {
        const w = l + ' ' + kind + ' ' + x.id;
        if (ids.has(x.id)) fail('P1', w + ': id used twice'); ids.add(x.id);
        if (slugs.has(x.slug)) fail('P1', w + ': slug used twice'); slugs.add(x.slug);
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug || '')) fail('P1', w + ': slug is not url-safe');
        if (!['pilot', 'live'].includes(x.status)) fail('P1', w + ': status "' + x.status + '"');
        if (!x.title || !x.metaTitle || !x.metaDescription) fail('P1', w + ': title or metadata missing');
        else {
          if (x.metaTitle.length > 70) fail('P1', w + ': meta title has ' + x.metaTitle.length + ' characters (70 at most)');
          if (x.metaDescription.length < 110 || x.metaDescription.length > 170) fail('P1', w + ': meta description has ' + x.metaDescription.length + ' characters (110 to 170)');
        }
        for (const s of [x.title, x.metaTitle, x.metaDescription]) if (s && FREE[l].test(s)) fail('P5', w + ': "' + s.slice(0, 60) + '" says free');
      }
    }
    // units
    const notes = new Map();
    for (const u of L.units) {
      const w = l + ' unit ' + u.id;
      if (u.lessons.length < 4) fail('P3', w + ': ' + u.lessons.length + ' lessons (at least 4)');
      for (const x of u.lessons) {
        const lw = w + ' lesson ' + x.n;
        if (!d.points.has(x.point)) fail('P2', lw + ': ' + x.point + ' is no teaching point');
        const real = x.paper.length + (x.tool ? 1 : 0) + (x.screen && x.screen.kind === 'activity' ? 1 : 0);
        if (real < 2) fail('P3', lw + ': fewer than two real assets');
        const n = x.note || {};
        if (!n.mistake || n.mistake.length < 60) fail('P3', lw + ': the note names no mistake');
        if (!n.words || !QUOTED.test(n.words)) fail('P3', lw + ': the note gives no words to use (nothing in quotation marks)');
        if (!n.watch || n.watch.length < 40) fail('P3', lw + ': the note does not say what to watch for');
        for (const s of [x.title, x.objective, n.mistake, n.words, n.watch]) if (s && FREE[l].test(s)) fail('P5', lw + ': "' + s.slice(0, 60) + '" says free');
        if (n.mistake && !notes.has(x.point)) notes.set(x.point, grams([n.mistake, n.words, n.watch].join(' ')));
      }
    }
    const ps = [...notes];
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { const s = jaccard(ps[i][1], ps[j][1]); if (s >= 0.5) fail('P3', l + ': the notes of ' + ps[i][0] + ' and ' + ps[j][0] + ' are nearly the same (' + s.toFixed(2) + ')'); }
    // sub packs
    for (const p of L.packs) {
      const w = l + ' pack ' + p.id;
      if (p.blocks.length < 5) fail('P4', w + ': ' + p.blocks.length + ' blocks (at least 5)');
      for (const m of ['reading', 'writing', 'math']) if (!p.blocks.some((b) => b.key === m)) fail('P4', w + ': no ' + m + ' block');
      for (const b of p.blocks) {
        const bw = w + ' block ' + b.key;
        if (!d.points.has(b.point)) fail('P2', bw + ': ' + b.point + ' is no teaching point');
        const s = b.script || {};
        if (!s.say || !QUOTED.test(s.say)) fail('P4', bw + ': the script does not give what to say (nothing in quotation marks)');
        if (!s.first || s.first.length < 40) fail('P4', bw + ': the script does not say how to start together');
        if (!s.stuck || s.stuck.length < 40) fail('P4', bw + ': the script does not say what to do when a child is stuck');
        for (const t of [s.say, s.first, s.stuck]) if (t && FREE[l].test(t)) fail('P5', bw + ': "' + t.slice(0, 60) + '" says free');
        if (L.uiS && !L.uiS['block_' + b.key]) fail('P6', bw + ': the ui file has no name for this kind of block');
      }
    }
    // the pages' own strings
    for (const [name, ui, base] of [['units/ui', L.uiU, d.loc.en && d.loc.en.uiU], ['sub-plans/ui', L.uiS, d.loc.en && d.loc.en.uiS]]) {
      if (!ui) { if ((name === 'units/ui' ? L.units : L.packs).length) fail('P6', l + ': no ' + name + ' file'); continue; }
      for (const [k, v] of Object.entries(ui)) { if (typeof v !== 'string' || !v.trim()) fail('P6', l + ' ' + name + ': "' + k + '" is empty'); else if (FREE[l].test(v)) fail('P5', l + ' ' + name + ': "' + k + '" says free'); }
      if (base && l !== 'en') { const a = Object.keys(base).sort().join('|'), b = Object.keys(ui).sort().join('|'); if (a !== b) fail('P6', l + ' ' + name + ': its keys are not the keys of the English file'); }
    }
  }
  return fails;
}

const clone = (x) => JSON.parse(JSON.stringify(x));
const POISONS = [
  ['two units with one slug', 'P1', (d) => { const u = clone(d.loc.en.units[0]); u.id += '-b'; d.loc.en.units.push(u); }],
  ['a meta description of 60 characters', 'P1', (d) => { d.loc.en.units[0].metaDescription = 'A unit about adding and subtracting for the first grade here.'; }],
  ['a lesson on a teaching point that does not exist', 'P2', (d) => { d.loc.en.units[0].lessons[0].point = '9:nothing'; }],
  ['a block on a teaching point that does not exist', 'P2', (d) => { d.loc.en.packs[0].blocks[0].point = '9:nothing'; }],
  ['a unit of three lessons', 'P3', (d) => { d.loc.en.units[0].lessons.length = 3; }],
  ['a lesson with one worksheet and nothing else', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 1; delete x.tool; delete x.screen; }],
  ['a note whose words to use quote nothing', 'P3', (d) => { d.loc.en.units[0].lessons[1].note.words = 'Use clear language and encourage the children to explain their thinking.'; }],
  ['two points with the same note', 'P3', (d) => { const a = d.loc.en.units[0].lessons; a[2].note = clone(a[3].note); }],
  ['a pack without a math block', 'P4', (d) => { d.loc.en.packs[0].blocks = d.loc.en.packs[0].blocks.filter((b) => b.key !== 'math'); }],
  ['a script that says nothing aloud', 'P4', (d) => { d.loc.en.packs[0].blocks[1].script.say = 'Introduce the page and explain the task to the class.'; }],
  ['a string that says free', 'P5', (d) => { d.loc.en.uiU.teacherLead = 'Download the whole unit free.'; }],
  ['a script that says free', 'P5', (d) => { d.loc.en.packs[0].blocks[0].script.stuck += ' This page is free for everyone.'; }],
  ['an empty string of the page', 'P6', (d) => { d.loc.en.uiS.bundleBtn = ' '; }],
  ['a block kind the ui file does not name', 'P6', (d) => { delete d.loc.en.uiS.block_logic; }],
];

if (process.argv.includes('--poison')) {
  const real = run(load());
  let bad = real.length ? 1 : 0;
  if (real.length) console.log('FAIL  the real files do not pass: ' + real[0]);
  for (const [name, gate, spoil] of POISONS) {
    const d = load();
    spoil(d);
    const hit = run(d).some((f) => f.startsWith(gate));
    if (!hit) { bad++; console.log('FAIL  poison not caught by ' + gate + ': ' + name); }
  }
  console.log(bad ? bad + ' poison problem(s)' : 'all ' + POISONS.length + ' poisons caught, the real files pass');
  process.exit(bad ? 1 : 0);
}
const d = load();
const fails = run(d);
for (const f of fails) console.log('FAIL  ' + f);
const n = Object.values(d.loc).reduce((a, L) => a + L.units.length, 0), m = Object.values(d.loc).reduce((a, L) => a + L.packs.length, 0);
console.log(fails.length ? fails.length + ' failure(s)' : 'units and sub packs: ' + n + ' unit(s), ' + m + ' pack(s) in ' + Object.keys(d.loc).length + ' language(s); all gates pass');
process.exit(fails.length && !process.argv.includes('--warn') ? 1 : 0);
