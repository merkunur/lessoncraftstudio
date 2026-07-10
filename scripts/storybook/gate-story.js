#!/usr/bin/env node
/* =====================================================================
   gate-story.js — the QUALITATIVE quality-gate suite (C2).

   validate-story.js is the FATAL schema/spatial/asset gate. This wraps it
   (runs it first as a child process) and then layers the qualitative-mechanical
   gates built 1:1 from the authoring-playbook.md FAILURE-MODE CATALOG (§6):

     age-wrong      -> page-count · line-length · lines-per-page · number-ceiling · reading-level(WARN)
     confusing      -> single-answer · distractor-count
     scoring-leak   -> no-scoring (forbidden tokens in narration/hints)
     locale-leak    -> english-leak(WARN)   (locale-completeness owned by validate-story)
     one-point-drift-> single-teaching-point (blueprint)
     standard-over  -> alignment-honesty (blueprint; PK must be readiness)
     asset-gap      -> asset-worklist-complete (blueprint)
     generic        -> arc-present · one-guide
     (SEP)          -> sep-consistency (descriptor<->visual)

   Some catalog items are NOT machine-checkable (distractor *plausibility* nuance,
   no-gild *visual* tell, "instantiates the standard") — those are protocol-rubric
   items in production-protocol.md, not gates. This file only asserts what code can.

   USAGE:
     node scripts/storybook/gate-story.js <storyId|dir> [--grade PK|K|1|2|3] [--blueprint <path>] [--json]
     node scripts/storybook/gate-story.js --blueprint <path>          (blueprint-only pre-authoring gate)
   Exit 0 = pass (validate-story passed AND zero HARD gate findings). Exit 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');

/* Grade envelope — MIRRORS authoring-playbook.md §2/§4. Single SoT for the numbers.
   pages: [7,10] for ALL grades per the 250-story Interactive Story Library standard
   (operator-ruled 2026-07-10; supersedes the earlier per-grade 3-4/4-5/... bands —
   PK/K stories stay gentle via tiny repetitive steps per page, not fewer pages).
   Pre-library fixtures (pips-picnic, pip-counts-along, pk-*) predate this band; exempt
   them from any batch-regate rather than reshaping them.
   numberSev: PK is HARD (≤5 is a firm readiness cap nothing legit exceeds). K–3 are WARN,
   NOT HARD: a single per-grade quantity ceiling is in genuine tension with place-value + teen
   standards that legitimately exceed the operation ceiling (K.NBT teens 11–19, 1.NBT tens-and-ones
   to ~99/120, 2.NBT three-digit to 1000). A HARD block over-rejects those; a WARN flags a large
   quantity for human judgement without blocking. (Calibration surfaced during C3 exemplar work.) */
const GRADE_ENV = {
  PK: { pages: [7, 10], maxWords: 6, maxLines: 1, numberCeil: 5, numberSev: 'HARD' },
  K:  { pages: [7, 10], maxWords: 8, maxLines: 2, numberCeil: 10, numberSev: 'WARN' },
  '1': { pages: [7, 10], maxWords: 12, maxLines: 2, numberCeil: 20, numberSev: 'WARN' },
  '2': { pages: [7, 10], maxWords: 16, maxLines: 3, numberCeil: 100, numberSev: 'WARN' },
  '3': { pages: [7, 10], maxWords: 20, maxLines: 3, numberCeil: 1000, numberSev: 'WARN' },
};
const ARCS = ['quest', 'help-a-friend', 'fix-a-mess', 'discovery', 'collect-and-sort'];
/* Scoring/pressure/judgement tokens forbidden in narration (playbook §3). EN core +
   a few cross-locale cognates; non-EN completeness is a protocol-rubric item. */
const FORBIDDEN = [
  'score', 'scored', 'points', 'timer', 'streak', 'countdown', 'level up',
  'correct', 'incorrect', 'wrong', 'hurry', 'quick', 'fast as you can',
  'better than', 'beat', 'win', 'winner', 'lose', 'fail', 'perfect score',
];
/* taskData keys that hold geometry/config, NOT child-facing quantities — excluded from number-ceiling. */
const NON_QUANTITY_KEYS = new Set([
  'seed', 'x', 'y', 'w', 'h', 'rect', 'cols', 'rows', 'index', 'scale', 'angle',
  'pauseAfterMs', 'holdMs', 'minute', 'minuteStep', 'hour', 'version', 'cut', 'n',
  /* pre-school spatial modules — geometry endpoints, tolerance/size config, and
     picture labels are NOT child-facing quantities (sb-maze/trace/shape-fit/…). */
  'x1', 'y1', 'x2', 'y2', 'snapDu', 'tolDu', 'corridorWidth', 'pathBandHalfWidth',
  'missing', 'symbol', 'glyph',
]);

function readJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; } }

/* Collect child-facing integers from a taskData subtree (for number-ceiling). */
function collectNumbers(node, keyName, out) {
  if (node == null) return;
  if (typeof node === 'number' && Number.isFinite(node) && !NON_QUANTITY_KEYS.has(keyName)) {
    if (Number.isInteger(node) && node > 0) out.push({ key: keyName, value: node });
    return;
  }
  if (typeof node === 'string') {
    // numeric-text options ("7", "12") ARE child-facing quantities
    if (!NON_QUANTITY_KEYS.has(keyName) && /^\d{1,4}$/.test(node.trim())) out.push({ key: keyName, value: parseInt(node, 10) });
    return;
  }
  if (Array.isArray(node)) { node.forEach((v) => collectNumbers(v, keyName, out)); return; }
  if (typeof node === 'object') { for (const k in node) collectNumbers(node[k], k, out); }
}

/* The gate engine — pure, returns {findings:[{gate,severity,msg}], grade}. Require-able for C5. */
function runGates(storyId, opts) {
  opts = opts || {};
  const findings = [];
  const add = (gate, severity, msg) => findings.push({ gate, severity, msg });

  const blueprintPath = opts.blueprint;
  const blueprint = blueprintPath ? readJson(blueprintPath) : null;

  // ---- blueprint-only mode (pre-authoring) ----
  const storyDir = storyId ? (fs.existsSync(storyId) ? storyId : path.join(MINI, 'stories', storyId)) : null;
  const story = storyDir ? readJson(path.join(storyDir, 'story.json')) : null;
  const strings = storyDir ? readJson(path.join(storyDir, 'strings.json')) : null;

  // ---- resolve grade ----
  let grade = opts.grade || (blueprint && blueprint.teachingPoint && blueprint.teachingPoint.grade) || null;
  if (grade && !GRADE_ENV[grade]) { add('grade', 'WARN', `unknown grade "${grade}" — grade-band gates skipped`); grade = null; }
  const env = grade ? GRADE_ENV[grade] : null;

  /* ---- per-story number-ceiling override (250-library commission support) ----
     The commission lists PK teaching points whose number space exceeds the default
     readiness cap (e.g. lib-p02-01 "Count objects 1-10"). A blueprint may declare
     numberCeilOverride: { value, reason } — explicit, justified, capped at 10 for
     PK (the commission's PK maximum), and surfaced as a WARN so every use is
     visible. The default env ceiling is unchanged for stories without one. */
  let numberCeil = env ? env.numberCeil : null;
  const nco = blueprint && blueprint.numberCeilOverride;
  if (nco && env) {
    if (typeof nco.value !== 'number' || !nco.reason || !String(nco.reason).trim()) {
      add('number-ceiling-override', 'HARD', 'numberCeilOverride needs { value:number, reason:non-empty } — the override must be justified');
    } else if (grade === 'PK' && nco.value > 10) {
      add('number-ceiling-override', 'HARD', `PK override ${nco.value} > 10 — the commission's PK maximum is 10`);
    } else {
      numberCeil = nco.value;
      add('number-ceiling-override', 'WARN', `number ceiling ${env.numberCeil} → ${nco.value} for this story (${nco.reason})`);
    }
  }

  // ================= BLUEPRINT gates =================
  if (blueprint) {
    const tp = blueprint.teachingPoint;
    if (!tp || !tp.id) add('single-teaching-point', 'HARD', 'blueprint has no teachingPoint.id — a story teaches exactly ONE point (playbook §2)');
    if (!blueprint.arc) add('arc-present', 'HARD', 'blueprint has no arc — pick one of ' + ARCS.join('/') + ' (playbook §1)');
    else if (!ARCS.includes(blueprint.arc)) add('arc-present', 'HARD', `arc "${blueprint.arc}" is not one of the 5 templates (playbook §1)`);
    // alignment honesty
    const code = tp && tp.cssCode;
    if (grade === 'PK' && code) add('alignment-honesty', 'HARD', `PK is readiness-only — cssCode must be null, got "${code}" (preschool-audit.md)`);
    if (code && !/^[0-9A-Za-z.\-]+$/.test(code)) add('alignment-honesty', 'HARD', `cssCode "${code}" is not a plausible CCSS code`);
    // asset worklist completeness (vs pages, if story present)
    if (Array.isArray(blueprint.pages)) {
      const declared = new Set((blueprint.assets || []).map((a) => a.id || a));
      blueprint.pages.forEach((pg, i) => {
        const need = [];
        if (pg.scene && pg.scene.image) need.push(pg.scene.image);
        (pg.characters || []).forEach((c) => c.atlasBase && need.push(c.atlasBase));
        need.forEach((id) => { if (!declared.has(id)) add('asset-worklist-complete', 'HARD', `page ${i + 1} references asset "${id}" not in blueprint.assets worklist`); });
      });
      // page count vs grade
      if (env && (blueprint.pages.length < env.pages[0] || blueprint.pages.length > env.pages[1]))
        add('page-count', 'HARD', `${blueprint.pages.length} pages; grade ${grade} wants ${env.pages[0]}–${env.pages[1]} (playbook §2)`);
    }
  }

  // ================= STORY gates =================
  if (story) {
    // one guide
    const guides = (story.cast || []).filter((c) => c.role === 'guide');
    if (guides.length !== 1) add('one-guide', 'HARD', `exactly ONE guide required, found ${guides.length} (cast-bible)`);

    const pages = story.pages || [];
    if (env && (pages.length < env.pages[0] || pages.length > env.pages[1]))
      add('page-count', 'HARD', `${pages.length} pages; grade ${grade} wants ${env.pages[0]}–${env.pages[1]} (playbook §2)`);
    if (!grade) add('grade', 'WARN', 'no grade resolved (pass --grade or a blueprint) — grade-band gates skipped');

    const locales = story.locales || ['en'];
    const strOf = (key, loc) => (strings && strings[key] && strings[key][loc]) || null;

    pages.forEach((pg, i) => {
      const pn = i + 1;
      const inter = pg.interaction || {};
      const cues = (pg.narration && pg.narration.cues) || [];

      // lines-per-page + line-length + no-scoring + english-leak (narration)
      if (env && cues.length > env.maxLines)
        add('lines-per-page', 'HARD', `page ${pn}: ${cues.length} narration lines; grade ${grade} max ${env.maxLines} (playbook §2)`);
      cues.forEach((c) => {
        const en = strOf(c.id, 'en');
        if (en != null) {
          const words = en.trim().split(/\s+/).filter(Boolean).length;
          if (env && words > env.maxWords)
            add('line-length', 'HARD', `page ${pn} line "${c.id}": ${words} words ("${en}"); grade ${grade} max ${env.maxWords} (playbook §2)`);
          const low = en.toLowerCase();
          FORBIDDEN.forEach((tok) => { if (new RegExp('\\b' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(low)) add('no-scoring', 'HARD', `page ${pn} line "${c.id}" contains forbidden token "${tok}" — no scoring/pressure/judgement (playbook §3)`); });
          // reading-level proxy: avg word length
          if (env) { const avg = low.replace(/[^a-zà-ÿ ]/g, '').split(/\s+/).filter(Boolean).reduce((s, w) => s + w.length, 0) / Math.max(1, words); const cap = grade === 'PK' ? 5.5 : grade === 'K' ? 6 : 7.5; if (avg > cap) add('reading-level', 'WARN', `page ${pn} line "${c.id}": avg word length ${avg.toFixed(1)} high for grade ${grade}`); }
        }
        // english-leak: a non-en narration value identical to en (heuristic; proper nouns exempt-ish)
        locales.filter((l) => l !== 'en').forEach((loc) => {
          const v = strOf(c.id, loc), e = strOf(c.id, 'en');
          if (v != null && e != null && v.trim() === e.trim() && e.trim().split(/\s+/).length > 1)
            add('english-leak', 'WARN', `page ${pn} line "${c.id}" [${loc}] identical to EN — likely untranslated`);
        });
      });

      // single-answer + distractor-count (per module)
      const td = inter.taskData || {};
      const mt = inter.moduleType;
      if (mt === 'sb-choice-board') {
        const opts = td.options || [];
        const correct = opts.filter((o) => o.key === td.targetKey);
        if (correct.length !== 1) add('single-answer', 'HARD', `page ${pn} choice-board: exactly ONE option must match targetKey "${td.targetKey}", found ${correct.length} (playbook §4)`);
        if (opts.length < 2) add('distractor-count', 'HARD', `page ${pn} choice-board: needs ≥1 distractor (${opts.length} options) (playbook §4)`);
      } else if (mt === 'sb-listen') {
        const opts = td.options || [];
        if (!opts.some((o) => o.key === td.correct)) add('single-answer', 'HARD', `page ${pn} listen: correct "${td.correct}" not among options`);
        if (opts.length < 2) add('distractor-count', 'HARD', `page ${pn} listen: needs ≥2 options`);
      } else if (mt === 'sb-count-tap') {
        if (typeof td.target === 'number' && typeof td.total === 'number' && (td.target < 1 || td.target >= td.total)) add('single-answer', 'HARD', `page ${pn} count-tap: target ${td.target} must be 1..total-1 (${td.total})`);
      }

      // number-ceiling (child-facing quantities in taskData; per-story override-aware)
      if (env) {
        const nums = []; collectNumbers(td, 'taskData', nums);
        const over = nums.filter((n) => n.value > numberCeil);
        if (over.length) { const worst = over.sort((a, b) => b.value - a.value)[0]; add('number-ceiling', env.numberSev, `page ${pn} ${mt}: quantity ${worst.value} (field "${worst.key}") exceeds grade ${grade} ceiling ${numberCeil} (playbook §4)`); }
      }

      // SEP consistency (worksheet-exercise pages)
      if (mt === 'sb-worksheet-exercise' && td.package) {
        const dPath = path.join(storyDir, td.package, 'descriptor.json');
        const d = readJson(dPath);
        if (!d) add('sep-consistency', 'HARD', `page ${pn}: SEP descriptor missing at ${td.package}/descriptor.json`);
        else {
          if (!d.visual || !d.visual.width || !d.visual.height) add('sep-consistency', 'HARD', `page ${pn}: SEP descriptor.visual missing dims`);
          if (!d.elements || Object.keys(d.elements).length === 0) add('sep-consistency', 'HARD', `page ${pn}: SEP descriptor has no elements`);
          // answer presence per family
          const e = d.elements || {};
          const hasAnswer = (e.slots && e.slots.some((s) => s.expected != null)) ||
            (e.paletteTiles && e.paletteTiles.some((t) => typeof t.originalCellIndex === 'number')) ||
            (e.pairs && e.pairs.length) || (e.connections && e.connections.length) || (e.legend);
          if (!hasAnswer) add('sep-consistency', 'WARN', `page ${pn}: SEP descriptor has no detectable answer key (family ${d.family})`);
        }
      }
    });
  } else if (!blueprint) {
    add('input', 'HARD', 'no story and no blueprint found — nothing to gate');
  }

  return { findings, grade };
}

/* ---- validate-story.js as the fatal pre-gate ---- */
function runValidate(storyId) {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'validate-story.js'), storyId], { encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const flag = (k) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : null; };
  const asJson = argv.includes('--json');
  const storyId = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--grade' && argv[argv.indexOf(a) - 1] !== '--blueprint');
  const opts = { grade: flag('grade'), blueprint: flag('blueprint') };

  let validateFail = false;
  if (storyId) {
    const v = runValidate(storyId);
    if (v.code !== 0) { validateFail = true; }
    if (!asJson) { console.log('── validate-story (fatal gate) ──'); console.log(v.out.trim()); }
  }

  const { findings, grade } = runGates(storyId, opts);
  const hard = findings.filter((f) => f.severity === 'HARD');
  const warn = findings.filter((f) => f.severity === 'WARN');

  if (asJson) { console.log(JSON.stringify({ validateFail, grade, hard, warn }, null, 2)); }
  else {
    console.log('\n── gate-story (quality gate) ── grade=' + (grade || '?'));
    if (!findings.length) console.log('  ✓ no quality findings');
    hard.forEach((f) => console.log('  ✗ [HARD] ' + f.gate + ': ' + f.msg));
    warn.forEach((f) => console.log('  ⚠ [WARN] ' + f.gate + ': ' + f.msg));
    console.log(`\n${validateFail ? '✗ validate-story FAILED' : '✓ validate-story passed'} · ${hard.length} HARD · ${warn.length} WARN`);
  }
  process.exit(validateFail || hard.length ? 1 : 0);
}

module.exports = { runGates, GRADE_ENV, ARCS };
