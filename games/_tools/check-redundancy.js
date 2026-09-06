#!/usr/bin/env node
/* check-redundancy.js — finds "one game with two coats of paint" and prior-art collisions.
 *
 * Reads catalogue/CATALOGUE.md rows shaped:
 *   | 001 | slug | Title | subject | topic | band | P1 | objective | description | F-1,F-2 |
 * and (when present) specs/NNN-slug.md Identity + Objective lines, which override the row.
 *
 * Reports (markdown to stdout):
 *   DUP-KEY   two rows share (subject, topic, band, pattern)                       → decide or annotate
 *   DUP-OBJ   objective token-set Jaccard >= 0.60                                  → decide or annotate
 *   DUP-SLUG  slug or title repeated                                               → fix
 *   PRIOR-ART a row's title+objective shares >= 3 content tokens with a live free activity title → eyeball
 *   BALANCE   counts per subject / band / pattern (vs the split declared in the CATALOGUE preamble)
 *
 * A row may carry the marker `[deliberate: <reason>]` in its description to silence DUP-* for that row.
 * Usage: node _tools/check-redundancy.js [--specs]   (--specs also reads specs/ files)
 * Exit 1 if any un-annotated DUP-* remains.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const CAT = path.join(ROOT, "design", "catalogue", "CATALOGUE.md");
const PRIOR = path.join(ROOT, "design", "research", "PRIOR-ART.md");
const SPECS = path.join(ROOT, "design", "specs");
const useSpecs = process.argv.includes("--specs");

const STOP = new Set(("a an the and or of to in on for with by from at as is are be into onto up down out its it this that " +
  "child children tap taps tapping choose chooses picks pick select selects game player each one two three then when which " +
  "correct correctly right matching match matches given shown show shows using use uses can does do " +
  /* MISSION VERBS (2026-09-06). The line above stops the TAP vocabulary because every objective
     contained it; after the mission redesign every objective contains the TRAVEL vocabulary the same
     way, and an unstopped universal word is pure noise in a Jaccard score. MEASURED on the 200 live
     rows: adding just six shared mission words to every objective took DUP-OBJ pairs >=0.60 from
     2 to 13 (6.5x). Stopping them holds it at 2. Poison-tested both directions in _poison/. */
  "move moves moving walk walks walking carry carries carrying collect collects collecting deliver " +
  "delivers delivering travel travels travelling reach reaches reaching bring brings take takes " +
  "mission character goal journey along across through toward towards arrive arrives step steps " +
  "path route world level scene").split(" "));
function tokens(s) {
  return new Set(String(s).toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/)
    .map((w) => w.replace(/(ies)$/, "y").replace(/(ing|ed|es|s)$/, "")).filter((w) => w.length > 2 && !STOP.has(w)));
}
function jaccard(a, b) { let i = 0; for (const x of a) if (b.has(x)) i++; const u = a.size + b.size - i; return u ? i / u : 0; }

if (!fs.existsSync(CAT)) { console.error("no catalogue/CATALOGUE.md yet"); process.exit(2); }
const rows = [];
for (const line of fs.readFileSync(CAT, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\|\s*(\d{3})\s*\|(.*)\|\s*$/);
  if (!m) continue;
  const c = m[2].split("|").map((s) => s.trim());
  if (c.length < 8) continue;
  rows.push({ n: m[1], slug: c[0].replace(/`/g, ""), title: c[1], subject: c[2].toLowerCase(), topic: c[3].toLowerCase(),
    band: c[4].replace(/`/g, ""), pattern: (c[5].match(/P\d{1,2}/) || [c[5]])[0], objective: c[6], desc: c[7] || "", refs: c[8] || "",
    deliberate: /\[deliberate:/i.test(line) });
}
if (useSpecs && fs.existsSync(SPECS)) {
  for (const f of fs.readdirSync(SPECS).filter((f) => /^\d{3}-.+\.md$/.test(f))) {
    const s = fs.readFileSync(path.join(SPECS, f), "utf8");
    const r = rows.find((r) => r.n === f.slice(0, 3));
    if (!r) continue;
    const obj = (s.match(/-\s*Objective:\s*(.+)/) || [])[1]; if (obj) r.objective = obj.trim();
    const pat = (s.match(/-\s*Interaction pattern:\s*`?(P\d{1,2})/) || [])[1]; if (pat) r.pattern = pat;
    const band = (s.match(/-\s*Age band:\s*`?(\d-\d)/) || [])[1]; if (band) r.band = band;
  }
}
let out = "# Redundancy report — " + rows.length + " catalogue rows" + (useSpecs ? " (+ specs)" : "") + "\n\n";
let hard = 0;

/* DUP-SLUG */
const seenSlug = {}, seenTitle = {};
for (const r of rows) {
  if (seenSlug[r.slug]) { out += "- DUP-SLUG " + r.n + " repeats " + seenSlug[r.slug] + " (" + r.slug + ")\n"; hard++; }
  seenSlug[r.slug] = r.n;
  const t = r.title.toLowerCase();
  if (seenTitle[t]) { out += "- DUP-SLUG " + r.n + " repeats title of " + seenTitle[t] + " (" + t + ")\n"; hard++; }
  seenTitle[t] = r.n;
}

/* DUP-KEY */
const byKey = {};
for (const r of rows) { const k = [r.subject, r.topic, r.band, r.pattern].join("|"); (byKey[k] = byKey[k] || []).push(r); }
for (const k in byKey) if (byKey[k].length > 1) {
  const g = byKey[k]; const ann = g.every((r) => r.deliberate);
  out += "- DUP-KEY " + (ann ? "(deliberate) " : "") + g.map((r) => r.n).join(",") + " share " + k + "\n"; if (!ann) hard++;
}

/* DUP-OBJ */
const toks = rows.map((r) => tokens(r.objective + " " + r.topic));
for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
  const s = jaccard(toks[i], toks[j]);
  if (s >= 0.6) {
    const ann = rows[i].deliberate || rows[j].deliberate;
    out += "- DUP-OBJ " + (ann ? "(deliberate) " : "") + rows[i].n + " ~ " + rows[j].n + " (" + s.toFixed(2) + ") " + rows[i].pattern + "/" + rows[j].pattern + " — " + rows[i].objective + " || " + rows[j].objective + "\n";
    if (!ann && rows[i].pattern === rows[j].pattern) hard++;
  }
}

/* PRIOR-ART */
if (fs.existsSync(PRIOR)) {
  const prior = [];
  for (const line of fs.readFileSync(PRIOR, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\|\s*([^|]+)\|\s*([^|]+)\|/); if (!m || m[1].trim() === "id" || /^-+$/.test(m[1].trim())) continue;
    prior.push({ id: m[1].trim(), title: m[2].trim(), t: tokens(m[2]) });
  }
  out += "\n## PRIOR-ART overlaps (>= 3 shared content tokens with a live free activity — eyeball, not automatic)\n";
  for (const r of rows) {
    const mine = tokens(r.title + " " + r.objective + " " + r.topic);
    const hits = prior.map((p) => { let c = 0; for (const x of mine) if (p.t.has(x)) c++; return [c, p]; }).filter(([c]) => c >= 3).sort((a, b) => b[0] - a[0]).slice(0, 3);
    if (hits.length) out += "- " + r.n + " " + r.slug + " ↔ " + hits.map(([c, p]) => c + ":" + p.title.slice(0, 70)).join(" | ") + "\n";
  }
}

/* BALANCE */
const count = (key) => { const m = {}; for (const r of rows) m[r[key]] = (m[r[key]] || 0) + 1; return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + " " + v + " (" + Math.round(100 * v / rows.length) + "%)").join(", "); };
out += "\n## BALANCE\n- subject: " + count("subject") + "\n- band: " + count("band") + "\n- pattern: " + count("pattern") + "\n";
out += "\n" + hard + " un-annotated hard duplicate(s)\n";
process.stdout.write(out);
process.exit(hard ? 1 : 0);
