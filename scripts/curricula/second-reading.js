#!/usr/bin/env node
/**
 * A second reading of a crosswalk after its framework was re-read (Daily Teaching System, Part 2).
 *
 * When a builder is found to have missed part of the official text, the reviewers' rows stay valid but they were
 * chosen without the objectives that were missing. This writes ONE brief for one reviewer: the objectives that are
 * NEW (not in the earlier framework), and every teaching point with the rows it has now. The reviewer changes only
 * the points for which a new objective is a better or a further home.
 *
 *   node scripts/curricula/second-reading.js <registry> <earlier framework.json> "<who the reviewer is>"
 *     → out/curricula/<registry>/second-reading.md        (the brief and the data, one file)
 *     the reviewer writes out/curricula/<registry>/second-reading.out.json
 *   then: node scripts/curricula/apply-review.js <registry> --authored <the first files…> <second-reading.out.json>
 *     (a file named second-reading* is applied after the first files and may replace their entries; `was` is kept)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const [reg, beforeFile, who] = process.argv.slice(2);
if (!reg || !beforeFile || !who) { console.error('usage: second-reading.js <registry> <earlier framework.json> "<who>"'); process.exit(1); }
const dir = path.join(REPO, 'frontend', 'content', 'curricula', reg);
const fw = JSON.parse(fs.readFileSync(path.join(dir, 'framework.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(beforeFile, 'utf8'));
const authored = JSON.parse(fs.readFileSync(path.join(dir, 'crosswalk-authored.json'), 'utf8')).points;
const points = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points;
const key = (n) => n.f + '|' + n.grade + '|' + n.text;
const had = new Set(before.nodes.map(key));
const byId = new Map(fw.nodes.map((n) => [n.id, n]));
const fresh = fw.nodes.filter((n) => n.kind !== 'area' && !had.has(key(n)));
const title = new Map(fw.frameworks.map((f) => [f.key, f.title]));
const tick = String.fromCharCode(96);
const out = path.join(REPO, 'out', 'curricula', reg, 'second-reading.out.json');

let md = '# Brief: a second reading of the crosswalk of registry ' + tick + reg + tick + '\n\n';
md += 'You are ' + who + '. A worksheet site keeps, for each of its 306 "teaching points", the objectives of your curriculum that the point teaches, prepares or extends. Two colleagues wrote these rows. Afterwards it was found that the list of objectives they worked from was INCOMPLETE: ' + fresh.length + ' objectives of the official text were missing from it. They are now in. Your job is the second reading: find the teaching points for which one of the NEW objectives is a better home, or a further one, and correct those points. This is a careful reading task. Do it yourself: do not launch other agents, and run no script other than a short one to check your own output file.\n\n';
md += '## What to read\n\nRead THIS file completely (read it in parts with the Read tool until you have seen all of it).\n\n- **PART A** lists the ' + fresh.length + ' new objectives with their official wording, by document and year.\n- **PART B** lists all 306 teaching points: id, the year the worksheets sit in (counted the American way: K is the year before the first school year, 1, 2, 3 the first three school years), the subject, the skill in one English line, and the rows the point has today (relation, id, the first words of the objective) or the reason it has none.\n\nFor the full wording of any objective that is not new, search the file ' + tick + path.join(REPO, 'out', 'curricula', reg, 'list.txt') + tick + ' for its id.\n\n';
md += '## The three relations\n\n- **teaches**: a child who does these worksheets does what the objective asks (or a clearly stated part of it), at the level the objective belongs to.\n- **prepares**: the worksheets are a step BEFORE the objective (readiness, a smaller number range, the idea before its formal form).\n- **extends**: the worksheets go beyond the objective on the same line of learning.\n\n';
md += '## Rules\n\n1. Decide only from the official wording, never from memory of the curriculum. Use only ids that are written in this file or in the list file, exactly.\n2. Go through PART B point by point with PART A in mind. Change a point ONLY when a new objective fits it better than a row it has, fits it as well (add it), or gives a home to a point that has none. Leave every other point out of your file.\n3. For a point you change, write its COMPLETE new entry: all the rows it should have now (you may keep, drop or re-label the old rows), usually 1 to 3, never more than 5, and a reason. Prefer the objective of the year nearest to the worksheets\' year; an objective of an earlier year than a row the point already has is usually the better home.\n4. A worksheet is paper or a screen page a child works alone: an objective about speaking, listening, discussing, investigating, building or playing is at most "prepares" unless the worksheet\'s skill is the content the objective names.\n5. Mind the details of the wording (number ranges, units, the kinds of words or texts named) against the skill line.\n6. Write every "why" and every note in English; quote the official wording in its own language where it decides.\n\n';
md += '## What to write\n\nONE JSON file, with the Write tool, at\n\n' + tick + out + tick + '\n\nin exactly this shape, holding ONLY the points you change:\n\n' + tick + tick + tick + 'json\n{\n "points": {\n  "<point id>": { "rows": [ { "id": "<an objective\'s id>", "rel": "teaches" } ], "why": "one or two sentences: what in the wording decides it, and what changed against the first reading" }\n },\n "notes": [ "what the site\'s owner should know after the second reading, each one or two sentences: which complaints of the first reviewers about missing parts are now answered, what is STILL missing from the official text as you know it, skills your curriculum places in another year than the worksheets" ]\n}\n' + tick + tick + tick + '\n\nBefore you finish, check with a short node command that the file parses as JSON, that every key of "points" is an id of PART B, and that every row id is an id of ' + tick + path.join(dir, 'framework.json') + tick + ' (its "nodes" array, field "id"). Fix anything that fails.\n\nYour final message: the file\'s path, how many points you changed, and in two or three sentences what is still missing or odd in the objectives as a teacher of your country sees it.\n\n';
md += '---\n\n## PART A — the ' + fresh.length + ' new objectives\n';
let lastF = null, lastG = null;
for (const n of fresh) {
  if (n.f !== lastF) { md += '\n### ' + title.get(n.f) + '\n'; lastF = n.f; lastG = null; }
  if (n.grade !== lastG) { md += '\n**Year ' + n.grade + '**\n\n'; lastG = n.grade; }
  md += '- ' + tick + n.id + tick + ' [' + n.grade + ']' + (n.domain ? ' (' + n.domain + ')' : '') + ' ' + n.text + '\n';
}
md += '\n---\n\n## PART B — the 306 teaching points and their rows today\n';
let lastS = null;
for (const p of points.slice().sort((a, b) => a.subject.localeCompare(b.subject) || 'K123'.indexOf(a.grade) - 'K123'.indexOf(b.grade) || a.order - b.order)) {
  if (p.subject !== lastS) { md += '\n### Subject: ' + p.subject + '\n\n'; lastS = p.subject; }
  const e = authored[p.id] || {};
  md += '- ' + tick + p.id + tick + ' (year ' + p.grade + ') ' + p.skill + '\n';
  if (e.rows && e.rows.length) for (const r of e.rows) { const n = byId.get(r.id); md += '    - ' + r.rel + ' ' + tick + r.id + tick + ' [' + (n ? n.grade : '?') + '] ' + (n ? n.text.slice(0, 110) : '') + '\n'; }
  else md += '    - NONE: ' + (e.none || '') + '\n';
}
const f = path.join(REPO, 'out', 'curricula', reg, 'second-reading.md');
fs.writeFileSync(f, md);
console.log(path.relative(REPO, f) + ': ' + fresh.length + ' new objectives, ' + points.length + ' points, ' + Math.round(md.length / 1024) + ' KB');
