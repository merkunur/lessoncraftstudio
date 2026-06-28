#!/usr/bin/env node
/* =====================================================================
   verify-activity-content-fr.js — the GATE proving every FRENCH activity
   page renders REAL hand-authored per-activity copy, NOT a template.

   For every FR activity (each `*-activities.json` row in `mini tools/` with a
   slug.fr), assert `frontend/messages/activity-content/fr.json` has a Tier-1
   FULL-OVERRIDE `prose[id]` = { about[≥2], practices[≥3], howToPlay[≥2],
   learningGoals[≥2] } — so getActivityContent() resolves isFullOverride===true
   and NO activity falls back to the byStrand/generic template. Plus: no leftover
   {placeholders}; no two pages share an identical `about[0]`; and — per §20.10 —
   NO French prose contains "Common Core" or a raw CCSS code (the code lives only
   in machine metadata / JSON-LD, never the human copy; FR cites "les programmes
   officiels" or omits the framework).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const FR = path.join(REPO, 'frontend', 'messages', 'activity-content', 'fr.json');

const fails = [];
const F = (c, m) => { if (!c) fails.push(m); };

const CODE_RE = /\b[K0-9]\.[A-Z]{1,3}\.[A-Z0-9]/; // CCSS code shape e.g. K.CC.A.3 / 2.OA.C.4
const CC_RE = /common core/i;

(function main() {
  const fr = JSON.parse(fs.readFileSync(FR, 'utf8'));
  const prose = fr.prose || {};

  // collect every FR activity id (slug.fr present)
  const ids = [];
  for (const f of fs.readdirSync(MINI).filter((f) => f.endsWith('-activities.json'))) {
    let d; try { d = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    for (const a of (Array.isArray(d) ? d : [])) if (a.slug && a.slug.fr) ids.push(a.id);
  }
  F(ids.length >= 50, `only ${ids.length} FR activities found`);

  const seenAbout = {};
  let templated = 0;
  for (const id of ids) {
    const a = prose[id];
    if (!a || Array.isArray(a) || !Array.isArray(a.about)) { templated++; fails.push(`TEMPLATE (no full-override prose): ${id}`); continue; }
    F(a.about.length >= 2, `${id}: about<2`);
    F(Array.isArray(a.practices) && a.practices.length >= 3, `${id}: practices<3`);
    F(Array.isArray(a.howToPlay) && a.howToPlay.length >= 2, `${id}: howToPlay<2`);
    F(Array.isArray(a.learningGoals) && a.learningGoals.length >= 2, `${id}: learningGoals<2`);
    const all = [].concat(a.about, a.practices, a.howToPlay, a.learningGoals).join(' ');
    F(!/\{[a-z]+\}/.test(all), `${id}: leftover {placeholder}`);
    F(!CC_RE.test(all), `${id}: "Common Core" in FR prose (§20.10 — use "les programmes officiels" or omit)`);
    F(!CODE_RE.test(all), `${id}: raw CCSS code in FR prose (§20.10) — "${(all.match(CODE_RE) || [])[0]}"`);
    const o = a.about[0] || '';
    if (seenAbout[o]) fails.push(`DUP about[0]: ${id} == ${seenAbout[o]}`); else seenAbout[o] = id;
  }

  console.log(`FR activities: ${ids.length} | full-override prose: ${ids.length - templated} | templated: ${templated}`);
  if (fails.length) { console.error(`VERIFY-ACTIVITY-CONTENT-FR FAILED — ${fails.length} issue(s):`); fails.slice(0, 30).forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ACTIVITY-CONTENT-FR PASSED — every FR activity has real per-activity copy (full-override prose); 0 templates, 0 placeholders, 0 duplicate openers, 0 Common-Core/code leaks.');
  process.exit(0);
})();
