#!/usr/bin/env node
/* =====================================================================
   new-activity.js — start the next NEW activity from the coverage backlog.

   The worksheet→activity coverage plan lives in
   docs/activities-rebuild/new/backlog.json (one entry per new instrument,
   numbered after the 204 rebuild rows) and NEW-ORDER.md (the human view).
   "build the next activity", once ORDER.md is done, = the first NEW-ORDER
   row not marked LIVE → `node scripts/new-activity.js --num=<N>`.

   It creates a RUNNING SKELETON so every gate runs on day one, then you
   replace the skeleton with the invention named in the design sheet:
     mini tools/<key>-core.js · <key>-activity.js · <key>-activity.html
     mini tools/<key>-activities.json  (the manifest row; EN slug/title/intro
                                         from the backlog, the other 10 locales
                                         authored at build time)
     scripts/verify-<key>-core.js · mutate-<key>.js · local-test-<key>.js ·
             live-verify-<key>.js
     docs/activities-rebuild/new/<N>-<key>.md  (only if absent — the design
                                         sheet written from the backlog)
   and registers the manifest in frontend/lib/activities.ts MANIFEST_FILES.

   It NEVER overwrites a file (use --force to overwrite the generated code
   files; the design sheet is never overwritten). Idempotent: a second run
   reports every step as already done. --dry-run prints what it would do.
   It does NOT bump ACTIVITY_WRAPPER_VERSION (do that once, in the commit
   that ships the activity) and it does not touch any shared core or
   lcs-shell.*.

   Usage: node scripts/new-activity.js --num=205 [--dry-run] [--force]
          node scripts/new-activity.js --list        (the backlog, status)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const T = path.join(__dirname, 'activity-scaffold', 'templates');
const BACKLOG = path.join(REPO, 'docs', 'activities-rebuild', 'new', 'backlog.json');
const ACTS_TS = path.join(REPO, 'frontend', 'lib', 'activities.ts');
const arg = (k) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : null; };
const has = (k) => process.argv.includes('--' + k);
const DRY = has('dry-run'), FORCE = has('force');

function die(msg) { console.error('new-activity: ' + msg); process.exit(1); }
if (!fs.existsSync(BACKLOG)) die('no backlog at ' + path.relative(REPO, BACKLOG));
const backlog = JSON.parse(fs.readFileSync(BACKLOG, 'utf8'));
const entries = backlog.activities || backlog;

if (has('list')) {
  for (const e of entries) {
    const built = fs.existsSync(path.join(MINI, e.key + '-activities.json'));
    console.log(`${String(e.num).padStart(3)}  ${built ? 'SCAFFOLDED' : '          '}  ${e.grade}  ${(e.code || '').padEnd(14)}  ${e.key}  — ${e.title}`);
  }
  process.exit(0);
}

const num = Number(arg('num'));
if (!num) die('give --num=<backlog number> (or --list)');
const e = entries.find(x => Number(x.num) === num);
if (!e) die('no backlog entry #' + num);
for (const f of ['key', 'id', 'title', 'grade', 'code', 'strand']) if (!e[f]) die(`backlog #${num} lacks "${f}"`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.key)) die('key must be kebab-case: ' + e.key);
if (fs.existsSync(path.join(MINI, e.key + '-activity.js')) && !FORCE && !fs.existsSync(path.join(MINI, e.key + '-activities.json'))) die(`mini tools/${e.key}-activity.js already exists and is not this scaffold — pick another key`);

/* the id must not collide with any existing activity */
const ids = new Set();
for (const f of fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json') && f !== e.key + '-activities.json')) for (const r of JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8'))) ids.add(r.id);
if (ids.has(e.id)) die('activity id already exists: ' + e.id);

const pascal = e.key.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
const pfx = e.prefix || (e.key.split('-').map(w => w[0]).join('') + 'x').slice(0, 3);
const env = e.key.replace(/-/g, '_').toUpperCase();
const tokens = {
  __KEY__: e.key, __GLOBAL__: pascal, __CORE__: pascal + 'Core', __ACT__: pascal + 'Activity', __PFX__: pfx, __ENV__: env,
  __ID__: e.id, __TITLE__: e.title.replace(/'/g, '’'), __GRADE__: e.grade, __CODE__: e.code, __STRAND__: e.strand, __NUM__: String(num),
  __TEACHES__: (e.teaches || '').replace(/\*\//g, '* /'), __INVENTION__: (e.invention || '').replace(/\*\//g, '* /')
};
const fill = (s) => s.replace(/__[A-Z]+__/g, (m) => (m in tokens ? tokens[m] : m));

const plan = [];
const write = (rel, content, opts) => {
  const abs = path.join(REPO, rel);
  const exists = fs.existsSync(abs);
  if (exists && !(FORCE && !(opts && opts.never))) { plan.push(['kept', rel]); return; }
  plan.push([exists ? 'overwrote' : 'created', rel]);
  if (!DRY) { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, content); }
};

write(`mini tools/${e.key}-core.js`, fill(fs.readFileSync(path.join(T, 'core.js.tmpl'), 'utf8')));
write(`mini tools/${e.key}-activity.js`, fill(fs.readFileSync(path.join(T, 'activity.js.tmpl'), 'utf8')));
write(`mini tools/${e.key}-activity.html`, fill(fs.readFileSync(path.join(T, 'activity.html.tmpl'), 'utf8')));
write(`scripts/verify-${e.key}-core.js`, fill(fs.readFileSync(path.join(T, 'verify.js.tmpl'), 'utf8')));
write(`scripts/mutate-${e.key}.js`, fill(fs.readFileSync(path.join(T, 'mutate.js.tmpl'), 'utf8')));
write(`scripts/local-test-${e.key}.js`, fill(fs.readFileSync(path.join(T, 'local-test.js.tmpl'), 'utf8')));
write(`scripts/live-verify-${e.key}.js`, fill(fs.readFileSync(path.join(T, 'live-verify.js.tmpl'), 'utf8')));

/* the manifest row: EN from the backlog; the other ten locales are authored at build time */
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const row = {
  id: e.id, tool: e.key + '-activity', task_template: e.key,
  alignment: { framework: e.framework || 'CCSS', code: e.code, grade: e.grade, strand: e.strand },
  params: { backlog: num },
  theme: null,
  slug: { en: e.slug || slugify(e.title) },
  page_title: { en: e.page_title || e.title },
  page_intro: { en: e.page_intro || e.teaches || '' },
  kid_prompt_template: e.key
};
write(`mini tools/${e.key}-activities.json`, JSON.stringify([row], null, 2) + '\n');

/* the design sheet, from the backlog (never overwritten) */
const L = (k, v) => (v ? `- **${k}:** ${Array.isArray(v) ? v.join(', ') : v}\n` : '');
const sheet = `# New #${num} — ${e.title} (${e.code})\n\n` +
  `Backlog entry #${num} of the worksheet→activity coverage plan (docs/activities-rebuild/new/NEW-ORDER.md). Grade ${e.grade} · ${e.framework || 'CCSS'} ${e.code} · ${e.strand}. Files: \`${e.key}-core.js\`, \`${e.key}-activity.js\`, \`${e.key}-activity.html\`, \`${e.key}-activities.json\` (id \`${e.id}\`).\n\n` +
  `## The skill\n${e.teaches || ''}\n\n## The apparatus and its invention\n${e.invention || ''}\n\n` +
  L('Misconception the apparatus makes visible', e.misconception) + L('Pictures', e.pictures) + L('Settings', e.settings) + L('Rounds', e.rounds) +
  L('Worksheets it covers', e.worksheets) + L('Distinct from', e.distinct_from) + L('Build risk', e.risk) +
  `\n## Layout\n(TBD at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)\n\n## Gates\n(TBD at build — the LAW recipe.)\n`;
write(`docs/activities-rebuild/new/${num}-${e.key}.md`, sheet, { never: true });

/* register the manifest */
const ts = fs.readFileSync(ACTS_TS, 'utf8');
const entry = `'${e.key}-activities.json'`;
if (ts.includes(entry)) plan.push(['kept', 'frontend/lib/activities.ts MANIFEST_FILES (already registered)']);
else {
  const start = ts.indexOf('const MANIFEST_FILES = [');
  const end = ts.indexOf('];', start);
  if (start < 0 || end < 0) die('MANIFEST_FILES not found in activities.ts');
  const next = ts.slice(0, end).replace(/\s*$/, '') + `\n  ${entry},\n` + ts.slice(end);
  plan.push(['registered', 'frontend/lib/activities.ts MANIFEST_FILES += ' + entry]);
  if (!DRY) fs.writeFileSync(ACTS_TS, next);
}

for (const [what, rel] of plan) console.log(`${what.padEnd(10)} ${rel}`);
console.log(`\n${DRY ? '(dry run — nothing written)\n' : ''}Next, in order (docs/activities-rebuild/new/NEW-RECIPE.md):
  1. Read docs/activities-rebuild/new/${num}-${e.key}.md and the LAW; open the contact sheet for any picture theme.
  2. Replace the skeleton in ${e.key}-core.js / -activity.js with the invention; rewrite verify [A]-[C], the mutations, local-test view().
  3. Strings x11 (EN first) + manifest slug/title/intro x11 + GRADE_OVERRIDE / STRAND_OVERRIDE where a locale needs it.
  4. node scripts/apply-activity-prose.js ${e.id} <prose.json>   (page prose x11)
  5. verify -> mutate -> local-test --locales=all -> visual-qa-activity --activity=${e.id} -> audit-activity-hierarchy -> audit-settings-efficacy --tool=${e.key}-activity -> preflight -> content x11 / claims / serp / tells.
  6. ONE reviewer (native x11 + pedagogy) over the compact dump; fix; preview seed; bump ACTIVITY_WRAPPER_VERSION; commit; deploy; live-verify; mark NEW-ORDER.`);
