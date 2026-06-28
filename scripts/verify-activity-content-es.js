#!/usr/bin/env node
/* =====================================================================
   verify-activity-content-es.js — the GATE proving every SPANISH (MEXICAN)
   activity page renders REAL hand-authored per-activity copy, NOT a template.

   For every es activity (each `*-activities.json` row in `mini tools/` with a
   slug.es), assert `frontend/messages/activity-content/es.json` has a Tier-1
   FULL-OVERRIDE `prose[id]` = { about[≥2], practices[≥3], howToPlay[≥2],
   learningGoals[≥2] }. Plus: no leftover {placeholders}; no duplicate `about[0]`;
   §20.10 NO "Common Core"/raw CCSS code; and MEXICAN-register guards — NO
   "Currículo LOMLOE" (Spain), NO "jardín infantil" (non-MX), NO peninsular
   "ordenador"/"móvil"/"vosotros"/"vuestro". es prose cites "los planes y
   programas de estudio (SEP)" or omits the framework.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const ES = path.join(REPO, 'frontend', 'messages', 'activity-content', 'es.json');

const fails = [];
const F = (c, m) => { if (!c) fails.push(m); };

const CODE_RE = /\b[K0-9]\.[A-Z]{1,3}\.[A-Z0-9]/; // CCSS code shape e.g. K.CC.A.3 / 2.OA.C.4
const CC_RE = /common core/i;
const MX_BAD = /lomloe|jard[ií]n infantil|\bordenador|\bm[oó]vil\b|\bvosotros\b|vuestr/i; // Spain/non-MX tells

(function main() {
  const es = JSON.parse(fs.readFileSync(ES, 'utf8'));
  const prose = es.prose || {};

  const ids = [];
  for (const f of fs.readdirSync(MINI).filter((f) => f.endsWith('-activities.json'))) {
    let d; try { d = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    for (const a of (Array.isArray(d) ? d : [])) if (a.slug && a.slug.es) ids.push(a.id);
  }
  F(ids.length >= 50, `only ${ids.length} es activities found`);

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
    F(!CC_RE.test(all), `${id}: "Common Core" in es prose (§20.10 — use "los planes y programas de estudio (SEP)" or omit)`);
    F(!CODE_RE.test(all), `${id}: raw CCSS code in es prose (§20.10) — "${(all.match(CODE_RE) || [])[0]}"`);
    F(!MX_BAD.test(all), `${id}: non-Mexican / peninsular term — "${(all.match(MX_BAD) || [])[0]}"`);
    const o = a.about[0] || '';
    if (seenAbout[o]) fails.push(`DUP about[0]: ${id} == ${seenAbout[o]}`); else seenAbout[o] = id;
  }

  console.log(`es activities: ${ids.length} | full-override prose: ${ids.length - templated} | templated: ${templated}`);
  if (fails.length) { console.error(`VERIFY-ACTIVITY-CONTENT-ES FAILED — ${fails.length} issue(s):`); fails.slice(0, 30).forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ACTIVITY-CONTENT-ES PASSED — every es activity has real Mexican per-activity copy (full-override prose); 0 templates, 0 placeholders, 0 dup openers, 0 Common-Core/code leaks, 0 peninsular/Spain tells.');
  process.exit(0);
})();
