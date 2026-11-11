/**
 * Shared by the registry builders (Daily Teaching System, Part 2): writing a registry, and turning an AUTHORED
 * crosswalk (frontend/content/curricula/<reg>/crosswalk-authored.json, written by a teacher-reviewer of that country
 * from the official text) into crosswalk.json with each row's grade taken from its node.
 *
 * A registry lives in frontend/content/curricula/<reg>/, where <reg> is a language (en, de, sv …) for the national
 * framework or <language>-<state> (en-tx, de-by …) for a state layer.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const REPO = path.join(__dirname, '..', '..');
const ROOT = path.join(REPO, 'frontend', 'content', 'curricula');
const RELS = ['teaches', 'prepares', 'extends'];
const text = (o) => JSON.stringify(o, null, 1) + '\n';
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const points = () => JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points;

/** crosswalk-authored.json → { rows, problems, counts }; a point the author left out is reported, not guessed */
function crosswalkFromAuthored(reg, nodes) {
  const problems = [];
  const f = path.join(ROOT, reg, 'crosswalk-authored.json');
  if (!fs.existsSync(f)) return { rows: null, problems: [], authored: 0, none: 0 };
  const authored = JSON.parse(fs.readFileSync(f, 'utf8')).points || {};
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const rows = {};
  let n = 0, none = 0;
  for (const p of points()) {
    const a = authored[p.id];
    if (!a) { problems.push(reg + ': crosswalk-authored.json does not hold ' + p.id); continue; }
    const list = [];
    for (const r of a.rows || []) {
      if (!byId.has(r.id)) { problems.push(reg + ': ' + p.id + ' names ' + r.id + ', which is not a node'); continue; }
      if (!RELS.includes(r.rel)) { problems.push(reg + ': ' + p.id + ' → ' + r.id + ' has the relation "' + r.rel + '"'); continue; }
      list.push({ id: r.id, rel: r.rel, grade: byId.get(r.id).grade });
    }
    if (list.length) { rows[p.id] = { rows: list, by: 'authored' }; n++; }
    else { rows[p.id] = { none: a.none || 'no counterpart in this curriculum', by: 'authored' }; none++; }
  }
  for (const id of Object.keys(authored)) if (!points().some((p) => p.id === id)) problems.push(reg + ': crosswalk-authored.json holds an unknown point ' + id);
  return { rows, problems, authored: n, none };
}

/** writes (or with check=true compares) framework.json and, when there are rows, crosswalk.json */
function writeRegistry(reg, framework, crosswalk, check) {
  const dir = path.join(ROOT, reg);
  const files = [[path.join(dir, 'framework.json'), text(framework)]];
  if (crosswalk) files.push([path.join(dir, 'crosswalk.json'), text(crosswalk)]);
  let diff = 0;
  if (check) { for (const [f, t] of files) if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n') !== t) { diff++; console.log('FAIL  ' + path.relative(REPO, f) + ' is not what the builder produces'); } }
  else { fs.mkdirSync(dir, { recursive: true }); for (const [f, t] of files) fs.writeFileSync(f, t); }
  return diff;
}

/** a file in out/curricula/<reg>/, fetched once; returns its bytes */
async function fetchRaw(reg, name, url) {
  const dir = path.join(REPO, 'out', 'curricula', reg);
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, name);
  if (!fs.existsSync(f)) {
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; curriculum-reader)' } });
    if (!r.ok) throw new Error(url + ' answered ' + r.status);
    fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
    console.log('fetched ' + name);
  }
  return fs.readFileSync(f);
}

/** the text of a PDF in out/curricula/<reg>/ (pdftotext must be installed) */
function pdfText(reg, name) {
  const dir = path.join(REPO, 'out', 'curricula', reg);
  const txt = path.join(dir, name.replace(/\.pdf$/, '.txt'));
  if (!fs.existsSync(txt)) require('child_process').execFileSync('pdftotext', ['-enc', 'UTF-8', path.join(dir, name), txt], { stdio: 'ignore' });
  return fs.readFileSync(txt, 'utf8').replace(/\r\n/g, '\n');
}

/** letters and digits only, lower case: what is compared with a PDF's text (which breaks lines, hyphenates and uses typographic quotes) */
const flat = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '');
/**
 * Is this wording in the PDF's (flattened) text? 0 = its first 24 letters and digits are not there; 3 = they are, and
 * so are an 18-letter run from its middle and one from its end; 2 = the beginning and one of the two; 1 = the
 * beginning alone (a page break or a footnote mark sits inside the other runs).
 */
function inPdf(pdfFlat, wording) {
  const t = flat(wording);
  if (!pdfFlat.includes(t.slice(0, 24))) return 0;
  if (t.length < 60) return 3;
  const mid = Math.floor(t.length / 2) - 9;
  return 1 + (pdfFlat.includes(t.slice(mid, mid + 18)) ? 1 : 0) + (pdfFlat.includes(t.slice(-18)) ? 1 : 0);
}

module.exports = { REPO, ROOT, RELS, text, sha256, points, crosswalkFromAuthored, writeRegistry, fetchRaw, pdfText, flat, inPdf };
