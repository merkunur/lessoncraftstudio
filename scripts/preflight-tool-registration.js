#!/usr/bin/env node
/* =====================================================================
   preflight-tool-registration.js — a tool must be COMPLETELY registered
   ---------------------------------------------------------------------
   Run:  node scripts/preflight-tool-registration.js [--poison]
   Wired into deploy.sh beside preflight-indexable-routes.js. Exit 1 fails
   the deploy.

   ⚠ WHY THIS EXISTS. Registering a tool touches several files, and the two
   that were NOT on the §21.5/§23.5 checklist both fail SILENTLY:

     - missing from TOOL_CATEGORY  -> toolCategory() falls back to 'number',
       so the tool renders, in the WRONG hub section, forever.
     - missing tool-previews/<key>.webp -> the hub card falls back to a
       generic "plus over minus" glyph (ActivityGlyph's last-resort math
       branch) instead of a picture of the apparatus.

   Tool #38 (draw-bag) shipped with both. Neither errored, no gate caught
   them, and the operator found the thumbnail. That is exactly the shape
   preflight-activity-routes.js was written for (a manifest omission that
   404'd every locale and surfaced only at deploy), so it gets the same
   treatment: make the class structurally unshippable rather than trusting
   a checklist.

   ⚠ THE PREVIEW CHECK IS SELF-DISABLING. The webps are gitignored
   (.gitignore:106) — they are generated locally and scp'd to
   /var/www/lcs-media/mini-tools/tool-previews/. A hard failure would break
   a fresh clone that has never run the generator. So the check activates
   only when the previews directory ALREADY holds at least one webp, i.e.
   previews are in use in this environment — and then every tool must have
   one. No-op on a clean checkout; bites everywhere it matters.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POISON = process.argv.includes('--poison');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };

/* ⚠ A RATCHET BASELINE, NOT APPROVAL — the same device as KNOWN_UNGATED in
   preflight-indexable-routes.js. These gaps pre-date this gate, so freezing
   them lets it fail only on NEW omissions instead of blocking every deploy
   on old debt. **The set may only SHRINK. Never add an entry to make a
   build pass.**
     heart-words:fi — fi.json carries 41 tool entries where en.json carries
     42; heart-words has no Finnish landing copy, so its fi slug is absent
     from LIVE_TOOL_SLUGS and /fi/tools/<heart-words-slug> has no carve-out
     from the /tools 410 teardown. Found by this gate on its first run.
     Wants a Finnish entry, not an exemption. */
const KNOWN_GAPS = new Set(['heart-words:fi']);

/* ---- the key list is the SoT everything else is checked against ---- */
function toolKeys(src) {
  const m = /export const TOOL_KEYS = \[([\s\S]*?)\] as const;/.exec(src);
  if (!m) { console.error('FATAL: TOOL_KEYS not found in frontend/lib/seo/tool-content.ts'); process.exit(1); }
  const keys = [...m[1].matchAll(/['"]([a-z0-9-]+)['"]/g)].map((x) => x[1]);
  if (!keys.length) { console.error('FATAL: TOOL_KEYS parsed empty'); process.exit(1); }
  return keys;
}

/* ---- the checks. Each takes the loaded sources and returns a list of
   offending keys, so the poison test can drive them on doctored input. -- */
const CHECKS = [
  {
    id: 'category',
    what: 'frontend/lib/tool-categories.ts TOOL_CATEGORY',
    why: 'falls back to \'number\' and files the tool in the wrong hub section, silently',
    run: (S) => S.keys.filter((k) => !new RegExp("['\"]" + k + "['\"]\\s*:").test(S.categories))
  },
  {
    id: 'hub-card',
    what: 'frontend/lib/manipulatives.ts MANIPULATIVES',
    why: 'the tool has no card on the hub at all',
    run: (S) => S.keys.filter((k) => S.manipulatives.indexOf('id: "' + k + '"') === -1)
  },
  {
    id: 'mini-url',
    what: 'frontend/lib/seo/tool-content.ts TOOL_MINI_URL',
    why: 'the landing page cannot resolve an iframe src',
    /* ⚠ A HYPHEN-FREE KEY IS WRITTEN UNQUOTED in the object literal
       (`ruler:` / `rekenrek:` / `wodb:`), so a quotes-only pattern reports
       three perfectly-registered tools as missing. Accept both forms. */
    run: (S) => S.keys.filter((k) =>
      !new RegExp("(^|[\\s{,])['\"]?" + k.replace(/-/g, '\\-') + "['\"]?\\s*:\\s*'/mini-tools/" + k.replace(/-/g, '\\-') + "\\.html'", 'm').test(S.toolContent))
  },
  {
    id: 'live-slug',
    what: 'frontend/config/live-tool-slugs.ts TOOL_KEYS',
    why: '⚠ ALL ELEVEN LOCALES RETURN 410 — /tools/* is a seller-era teardown and this is the carve-out',
    run: (S) => S.keys.filter((k) => !new RegExp("['\"]" + k + "['\"]").test(S.liveSlugs))
  },
  {
    id: 'landing-content',
    what: 'frontend/messages/tool-content/<locale>.json',
    why: 'the locale has no landing copy and the slug cannot be carved out of the 410',
    run: (S) => {
      const bad = [];
      for (const k of S.keys) {
        const missing = LOCALES.filter((loc) =>
          !KNOWN_GAPS.has(k + ':' + loc) &&
          (!S.content[loc] || !S.content[loc][k] || !S.content[loc][k].slug));
        if (missing.length) bad.push(k + ' (' + missing.join(',') + ')');
      }
      return bad;
    }
  },
  {
    id: 'apparatus',
    what: 'mini tools/<key>.{js,html}',
    why: 'the iframe would 404',
    run: (S) => S.keys.filter((k) =>
      !fs.existsSync(path.join(ROOT, 'mini tools', k + '.js')) ||
      !fs.existsSync(path.join(ROOT, 'mini tools', k + '.html')))
  },
  {
    id: 'preview',
    what: 'frontend/public/mini-tools/tool-previews/<key>.webp',
    why: 'the hub card falls back to a generic "plus over minus" glyph instead of the apparatus',
    /* self-disabling: only when previews are in use in this environment */
    run: (S) => (S.previewCount === 0 ? [] : S.keys.filter((k) => !S.previews.has(k)))
  }
];

function loadState() {
  const toolContent = read('frontend/lib/seo/tool-content.ts');
  const previewDir = path.join(ROOT, 'frontend', 'public', 'mini-tools', 'tool-previews');
  const previews = new Set();
  if (fs.existsSync(previewDir)) {
    for (const f of fs.readdirSync(previewDir)) if (f.endsWith('.webp')) previews.add(f.slice(0, -5));
  }
  const content = {};
  for (const loc of LOCALES) {
    try { content[loc] = JSON.parse(read('frontend/messages/tool-content/' + loc + '.json')); }
    catch (e) { content[loc] = null; }
  }
  return {
    keys: toolKeys(toolContent),
    toolContent,
    categories: read('frontend/lib/tool-categories.ts'),
    manipulatives: read('frontend/lib/manipulatives.ts'),
    liveSlugs: read('frontend/config/live-tool-slugs.ts'),
    previews,
    previewCount: previews.size,
    content
  };
}

const S = loadState();

/* =====================================================================
   ⚠ POISON TEST FIRST. A gate nobody has seen fail is not known to work
   (§21.7). Every check is driven against a state doctored to violate it,
   and must report exactly the doctored key. If a check has stopped being
   able to fail, that is itself a build failure.
   ===================================================================== */
(function poison() {
  const VICTIM = S.keys[S.keys.length - 1];
  const strip = (s, k) => s.split("'" + k + "'").join("'__gone__'").split('"' + k + '"').join('"__gone__"');
  const cases = {
    category: () => Object.assign({}, S, { categories: strip(S.categories, VICTIM) }),
    'hub-card': () => Object.assign({}, S, { manipulatives: S.manipulatives.split('id: "' + VICTIM + '"').join('id: "__gone__"') }),
    'mini-url': () => Object.assign({}, S, { toolContent: S.toolContent.split("'" + VICTIM + "': '/mini-tools/" + VICTIM + ".html'").join("'__gone__': '/mini-tools/__gone__.html'") }),
    'live-slug': () => Object.assign({}, S, { liveSlugs: strip(S.liveSlugs, VICTIM) }),
    'landing-content': () => {
      const c = {};
      for (const loc of LOCALES) c[loc] = Object.assign({}, S.content[loc]);
      delete c.fi[VICTIM];
      return Object.assign({}, S, { content: c });
    },
    apparatus: () => Object.assign({}, S, { keys: S.keys.concat(['__no_such_tool__']) }),
    preview: () => {
      const p = new Set(S.previews);
      p.delete(VICTIM);
      return Object.assign({}, S, { previews: p, previewCount: p.size || 1 });
    }
  };
  let bad = 0;
  for (const chk of CHECKS) {
    const doctored = cases[chk.id]();
    let fired = false;
    try { fired = chk.run(doctored).length > 0; } catch (e) { fired = false; }
    if (!fired) { console.error('  POISON FAILED  check "' + chk.id + '" no longer fires on a violation'); bad++; }
  }
  if (bad) { console.error('FATAL: ' + bad + ' check(s) cannot fail — this gate is not a gate'); process.exit(1); }
  console.log('poison: ' + CHECKS.length + '/' + CHECKS.length + ' checks still fire on a violation');
})();

if (POISON) { console.log('(--poison: poison test only, no real check run)'); process.exit(0); }

/* =====================================================================
   THE REAL RUN
   ===================================================================== */
for (const chk of CHECKS) {
  const bad = chk.run(S);
  if (bad.length) err(chk.what + ' is missing: ' + bad.join(', ') + '\n           -> ' + chk.why);
}

if (S.previewCount === 0) {
  console.log('  note   no tool previews on disk — the preview check is a no-op here');
  console.log('         (they are gitignored; generate with scripts/generate-tool-previews.js)');
}

console.log('');
if (ERRORS) {
  console.error('FAIL — ' + ERRORS + ' incomplete tool registration(s) across ' + S.keys.length + ' tools');
  console.error('See the registration points in CLAUDE.md §23.5 / docs/claude-md/premium-tools-v4.md');
  process.exit(1);
}
console.log('PASS — all ' + S.keys.length + ' tools fully registered (' + CHECKS.length + ' checks each)');
