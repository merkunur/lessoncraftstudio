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
    /* ⭐⭐ CHECK 8, AND IT EXISTS BECAUSE CHECK 7 CERTIFIED A HALF-FORMED
       ENTRY. `landing-content` asserts the entry has a `.slug` — one of
       the EIGHT fields ToolEntry requires. Tool #42 shipped with five,
       this gate reported "all 45 tools fully registered", and the BUILD
       then failed the static export of all eleven of its pages.

       A COMPLETENESS CHECK THAT LISTS A SUBSET OF THE REQUIRED FIELDS IS
       WORSE THAN NO CHECK AT ALL, because it certifies. And tsc cannot
       cover this: tool-content/*.json is untyped at runtime.

       ⚠ The field list is READ OFF THE INTERFACE, never hand-listed, so
       it cannot drift when ToolEntry gains a field — and the check
       refuses to run at all if it parses implausibly few, rather than
       silently becoming vacuous. */
    id: 'landing-fields',
    what: 'every ToolEntry field in frontend/messages/tool-content/<locale>.json',
    why: 'a missing field throws during the static export and fails the whole build',
    run: (S) => {
      const iface = fs.readFileSync(path.join(ROOT, 'frontend/lib/seo/tool-content.ts'), 'utf8');
      const blk = /export interface ToolEntry \{([\s\S]*?)\}/.exec(iface);
      if (!blk) return ['could not parse the ToolEntry interface — this check cannot be trusted'];
      const req = blk[1].split(String.fromCharCode(10))
        .map((l) => (/^\s*([A-Za-z]+)\??:\s*string(\[\])?;/.exec(l) || [])[1])
        .filter(Boolean);
      if (req.length < 6) return ['only ' + req.length + ' fields parsed off ToolEntry — refusing to report a vacuous pass'];
      const bad = [];
      for (const k of S.keys) {
        const holes = [];
        for (const loc of LOCALES) {
          if (KNOWN_GAPS.has(k + ':' + loc)) continue;
          const e = S.content[loc] && S.content[loc][k];
          if (!e) continue;                       /* check 7 already owns "absent" */
          const miss = req.filter((f) => {
            const v = e[f];
            if (Array.isArray(v)) return v.length === 0 || v.some((x) => typeof x !== 'string' || !x.trim());
            return typeof v !== 'string' || !v.trim();
          });
          if (miss.length) holes.push(loc + ':' + miss.join('/'));
        }
        if (holes.length) bad.push(k + ' (' + holes.slice(0, 3).join(' ') + (holes.length > 3 ? ' +' + (holes.length - 3) : '') + ')');
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
    id: 'shell-strings',
    what: "a `title` and an `instruction` in mini tools/<key>.js, in all 11 locales",
    why: 'the SHELL prints the raw key as the subtitle AND in the aria label',
    /* ⚠⚠ THIS SHIPPED. `lcs-shell.js:449` does
         var _toolInstruction = i18n.t(tool.strings, 'instruction');
       and feeds it BOTH the line under the title and the aria label. When the
       key is absent `t` returns the key, so arrow-strip rendered the literal
       word "instruction" on every one of its pages in every language, and a
       screen reader read "Interaktive Der Kaeferplan-Aufgabe. instruction".
       Nothing errored. No gate looked. I found it by reading a 2560px render
       for an unrelated reason, which is not a process.
       ⚠ A tool may DELEGATE its strings to a core (`strings: FooCore.strings`),
       which is why this resolves the delegation instead of grepping the tool
       file — ten-frame does exactly that and a naive scan condemns it. */
    run: (S) => S.keys.filter((k) => {
      const f = path.join(ROOT, 'mini tools', k + '.js');
      if (!fs.existsSync(f)) return false;            /* the apparatus check owns that */
      let src = fs.readFileSync(f, 'utf8');
      const deleg = /strings:\s*([A-Za-z_$][\w$]*)\.strings/.exec(src);
      if (deleg) {
        const core = path.join(ROOT, 'mini tools', deleg[1]
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + '.js');
        if (fs.existsSync(core)) src += String.fromCharCode(10) + fs.readFileSync(core, 'utf8');
        else return false;                            /* cannot resolve: do not guess */
      }
      for (const key of ['title', 'instruction']) {
        /* ⚠ BUILD THE SOURCE FROM DOUBLED BACKSLASHES. Written as '\s' inside a
           JS string literal it degrades to a bare 's', so the pattern became
           `titles*:s*{...}` and matched nothing — which condemned all 47 tools
           at once AND satisfied the poison for the wrong reason. A poison that
           passes because the check is universally true has proved nothing. */
        const m = new RegExp('(?:^|[\\s{,])' + key + '\\s*:\\s*\\{([^}]*)\\}').exec(src);
        if (!m) return true;
        for (const loc of LOCALES) {
          /* ⚠ CONSULT THE SAME RATCHET THE OTHER LOCALE CHECKS USE. This found
             a SECOND real gap on its first honest run — heart-words declares
             ten locales and no `fi`, on both title and instruction — and
             `KNOWN_GAPS` already carries `heart-words:fi` for its missing fi
             landing copy. Same tool, same locale, another surface: it belongs
             to the existing baseline entry, not to a new one. The list may
             still only shrink. */
          if (KNOWN_GAPS.has(k + ':' + loc)) continue;
          if (!new RegExp('(?:^|[\\s{,])' + loc + '\\s*:').test(m[1])) return true;
        }
      }
      return false;
    })
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
    /* ⚠ the doctored entry KEEPS its slug — otherwise this would be
       poisoning check 7's condition, not its own, and would pass while
       the field check itself stayed vacuous. Strip a DIFFERENT required
       field so only `landing-fields` can catch it. */
    'landing-fields': () => {
      const c = {};
      for (const loc of LOCALES) c[loc] = Object.assign({}, S.content[loc]);
      c.fi[VICTIM] = Object.assign({}, c.fi[VICTIM], { classroomIdeas: [] });
      return Object.assign({}, S, { content: c });
    },
    /* ⚠ POISON IT WITH A TOOL THAT EXISTS AND HAS NO STRINGS, not with a
       missing file — a missing file is the `apparatus` check's condition,
       and poisoning one check with another's violation is how a hollow
       check certifies itself. `lcs-shell` is a real file in the same
       directory that legitimately declares neither title nor instruction. */
    'shell-strings': () => Object.assign({}, S, { keys: S.keys.concat(['lcs-shell']) }),
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
