#!/usr/bin/env node
/**
 * Record a template fix in docs/makers/migrations/<maker>.json (tracked in git; out/ is not) — ARCHITECTURE §5.3,
 * OPEN-DECISIONS #5 (ruled 5a).
 *
 *   node scripts/makers/record-fix.js --maker=counting --templates=K-002,K-006 --note="…" [--kind=content-fix|polish]
 *
 * RUN IT RIGHT AFTER BUILDING THE FIXED VERSION (node scripts/makers/build-bundles.js): the entry's `at` is the
 * maker's CURRENT hash (+ `atData`, the data hash it was built with) = the first version that contains the fix.
 * shell/resolve-version.js then re-routes every saved recipe and student link pinned to an EARLIER version that uses
 * one of these templates to the current version, with a one-line banner. `polish` is recorded but never re-routes.
 *
 * Refuses (exit 1, one sentence): maker not built; a template not in the current templates.json; the current version
 * already has an entry for the same template.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const OUT = path.resolve(REPO, args.out || 'out/makers');
const MIG_DIR = path.resolve(REPO, args['migrations-dir'] || 'docs/makers/migrations');
const refuse = (msg) => { console.error(msg); process.exit(1); };

const maker = String(args.maker || '');
const templates = String(args.templates || '').split(',').map((s) => s.trim()).filter(Boolean);
const kind = String(args.kind || 'content-fix');
const note = typeof args.note === 'string' ? args.note.trim() : '';
if (!/^[a-z0-9-]+$/.test(maker)) refuse('Give --maker=<maker id>.');
if (!templates.length) refuse('Give --templates=<id>[,<id>…].');
if (kind !== 'content-fix' && kind !== 'polish') refuse('--kind must be content-fix or polish.');
if (!note) refuse('Give --note="<what was corrected>" (it becomes the banner text).');

const curFile = path.join(OUT, maker, 'current.txt');
const hash = fs.existsSync(curFile) ? fs.readFileSync(curFile, 'utf8').trim() : '';
const tplFile = path.join(OUT, maker, hash, 'templates.json');
if (!hash || !fs.existsSync(tplFile)) refuse(`The maker "${maker}" is not built — run scripts/makers/build-bundles.js first.`);
const known = new Set(JSON.parse(fs.readFileSync(tplFile, 'utf8')).templates.map((t) => t.id));
const unknown = templates.filter((t) => !known.has(t));
if (unknown.length) refuse(`Template ${unknown.join(', ')} is not in ${maker}@${hash}'s templates.json.`);

const verFile = path.join(OUT, 'versions.json');
const ledger = fs.existsSync(verFile) ? JSON.parse(fs.readFileSync(verFile, 'utf8'))[maker] : null;
if (!ledger || ledger.current !== hash || !(ledger.history || []).some((h) => h.hash === hash)) refuse(`${maker}@${hash} is not recorded in out/makers/versions.json — rebuild with build-bundles.js first.`);
const atData = ledger.currentData || null;

const migFile = path.join(MIG_DIR, maker + '.json');
const list = fs.existsSync(migFile) ? JSON.parse(fs.readFileSync(migFile, 'utf8')) : [];
const dup = templates.filter((t) => list.some((m) => m.at === hash && (m.atData || null) === atData && (m.templates || []).includes(t)));
if (dup.length) refuse(`${maker}@${hash} already has a recorded fix for ${dup.join(', ')}.`);

const entry = { at: hash, atData, templates, kind, note, date: new Date().toISOString().slice(0, 10) };
list.push(entry);
fs.mkdirSync(MIG_DIR, { recursive: true });
fs.writeFileSync(migFile, JSON.stringify(list, null, 1) + '\n');
console.log(`recorded ${kind} for ${maker}@${hash}: ${templates.join(', ')} → ${path.relative(REPO, migFile).replace(/\\/g, '/')}`);
