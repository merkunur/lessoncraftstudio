#!/usr/bin/env node
/* =====================================================================
   audit-settings-efficacy.js — EVERY SETTINGS OPTION MUST CHANGE THE BOARD.

   ⚠ WHY THIS EXISTS. The operator opened the Ten Frame Activity, set
   "Counter shape" to Heart, and the board kept drawing cats. The chip
   highlighted, the drawer said Heart, nothing on the board moved:
   ten-frame-activity.js replaces paint() wholesale for themed rows and
   hard-codes the image token, so `s.shape` and `s.color` are read
   NOWHERE on 4 of the 8 activities.

   Two instruments already existed and NEITHER could see it.

     • A static "declared key never referenced" scan over all 53
       settings-bearing files returns ZERO findings, against a live
       defect. The key IS referenced — inside a function an override
       shadows. "The string exists" is not "the string is reached".

     • audit-tool-control-liveness.js scopes its __world() signature to
       `.lcs-app`, and buildDrawer() appends the drawer INSIDE `.lcs-app`
       (lcs-shell.js:587). A chip flipping its own aria-checked therefore
       already counts as "the world changed". That is the recorded
       consequence-free-control blind spot in its purest form.

   So this gate measures the one thing neither can: does changing an
   option change anything OUTSIDE THE DRAWER?

   ⚠⚠ THREE CHANNELS WOULD LET THIS GATE MARK ITS OWN HOMEWORK, AND ALL
   THREE ARE SHUT HERE. Each fires on a DEAD option:

     1. the drawer itself — the chip's own aria-checked / the switch's own.
        Shut by removing .lcs-drawer + .lcs-drawer-scrim from the signature,
        and by PROVING the removal removed something (a selector the page
        never emits would compare two identical strings forever).
     2. localStorage — ~40 of the 53 tools call _saveStore() from
        onSettings, so storage mutates on EVERY commit whatever the
        consequence. Shut by keeping storage OUT of the verdict entirely.
        It is printed for triage and is never evidence.
     3. tool.render() — the shell calls it unconditionally (:636), so any
        tool that reshuffles or re-randomises on render diffs for every
        setting. Shut by the NULL TRANSITION below.

   ⚠⚠ THE NULL TRANSITION IS THE CONTROL GROUP. Before any field can be
   credited LIVE, the gate re-commits the value the field ALREADY has and
   runs the identical script twice. If TRACE(V) != TRACE(V) the tool
   churns under re-render and a plain diff proves nothing — the field is
   UNPROVEN, never LIVE. Without this, channel 3 hands out 143 passes.

   ⚠ THE CRITERION IS TRACE(A) != TRACE(B), not "something happened".
   Two runs of an identical script from identical fresh pages, differing
   only in the option under test. That reframing is what makes a
   deferred-effect setting measurable at all: the script fires the same
   taps, beeps and speech in both runs, so only the difference
   attributable to the option survives.

   ⚠ AND "IT APPLIED" IS NOT "IT STUCK". ten-frame's Frames really does
   repaint on commit and is then overwritten by the next task's setup().
   An immediate-diff gate scores that LIVE. The REVERTED verdict drives
   the activity to the next round and re-reads the value.

   ⚠ IT DISCOVERS SURFACES, it does not take a list. A new tool with
   settings needs no entry here; --all is scope, not registration.

   VERDICTS  LIVE (ok) · DEAD (FAIL) · REVERTED (FAIL) · UNPROVEN (must shrink)

   Usage:
     node scripts/audit-settings-efficacy.js --contract-only     # static, browser-free
     node scripts/audit-settings-efficacy.js --tool=ruler
     node scripts/audit-settings-efficacy.js --activity=ten-frame.how-many.0-10.animals
     node scripts/audit-settings-efficacy.js --all               # every tool surface
     node scripts/audit-settings-efficacy.js --all-activities    # every activity surface
     node scripts/audit-settings-efficacy.js --tool=ruler --poison=drawer-scope
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMG = path.join(ROOT, 'frontend', 'public', 'image-library-webp');
const MIME = {
  '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg'
};
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = ['choice', 'color', 'toggle'];

const arg = (k, d) => { const h = process.argv.find(a => a.startsWith('--' + k + '=')); return h ? h.split('=').slice(1).join('=') : d; };
const CONTRACT_ONLY = process.argv.includes('--contract-only');
const ALL_TOOLS = process.argv.includes('--all');
const ALL_ACTS = process.argv.includes('--all-activities');
const WANT_TOOL = arg('tool', '');
const WANT_ACT = arg('activity', '');
const LANG = arg('lang', 'en');
const SETTLE = parseInt(arg('settle', '420'), 10);
/* ⚠ HOW FAR THE APPARATUS IS DRIVEN BEFORE A FIELD IS JUDGED. Four
   clicks was not enough and the gate cried wolf on its first sweep:
   class-graph's `pop` only fires on the bar you JUST voted for
   (:522), center-board's `showNames` needs a group that HAS member
   names (:743), calendar-wall's `weatherSet` needs the weather panel
   open (:1190). All three are correct settings that simply cannot act
   on an untouched board, and reporting them DEAD is the gate lying.
   The answer is the liveness gate's own: a control is dead only if it
   acts on NO reachable state, so reach further. */
const EXERCISE = parseInt(arg('exercise', '14'), 10);
const POISON = arg('poison', '');           /* drawer-scope | store — see the poison notes */
const JSON_OUT = arg('json', '');

/* the entitlement states. A premium-gated option is unreachable
   anonymously; a value the tool BOUNCES BACK for a free account is only
   visible anonymously. premium is the default because grading a
   premium-gated option under `free` manufactures false DEADs. */
const ALL_STATES = [
  { id: 'anon', token: false, premium: false },
  { id: 'free', token: true, premium: false },
  { id: 'premium', token: true, premium: true }
];
const STATE_SEL = arg('states', 'premium');
const STATES = STATE_SEL === 'all' ? ALL_STATES : ALL_STATES.filter(s => STATE_SEL.split(',').includes(s.id));

/* ⚠ AN AUDITABLE LIST, NOT A LOOSENED RULE. A field lands here only when
   a written reason says why no probe in this harness can reach it. The
   list may only SHRINK — never add an entry to make a run pass. It
   starts empty on purpose: entries are earned by a run that proves the
   need. */
const KNOWN_UNPROVABLE = {
  /* 'surface-id': { fieldKey: 'why no probe can observe it' } */
};

/* ⚠ A PROBE ADDS REACH. IT NEVER RELAXES THE CRITERION. The comparison
   is still TRACE(A) != TRACE(B) over the same four channels; a probe only
   says HOW to get the apparatus into a state where the option can be
   seen at all. Every entry carries the reason it is needed, and the
   reason must name the code that makes the observable unreachable
   otherwise — if it cannot, the honest verdict is DEAD, not a probe. */
const PROBES = {
  'class-graph': {
    pop: {
      finalClick: '.cgr-vote',
      why: 'the pop class is added ONLY to the stamp of the bar just voted for, '
         + 'and _buildBoard clears _justVoted at its end (class-graph.js:522,553), '
         + 'so the very next render wipes it — including the render that '
         + 'commitSettings itself triggers. It is observable only in the frame '
         + 'immediately after a vote, so the vote has to be the LAST action.'
    }
  }
};

let PASS = 0, FAIL = 0, UNPROVEN = 0, VACUOUS = 0;
const ok = (m) => { PASS++; console.log('  ok        ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL      ' + m); };
const unk = (m) => { UNPROVEN++; console.log('  UNPROVEN  ' + m); };
const vac = (m) => { VACUOUS++; console.error('  VACUOUS   ' + m); };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const findings = [];

/* ============================ source extraction (browser-free) ========= */
function balanced(src, headRe, open, close) {
  const m = src.match(headRe);
  if (!m) return null;
  const start = src.indexOf(open, src.indexOf(m[0]));
  let depth = 0, j = start;
  for (; j < src.length; j++) {
    const c = src[j];
    if (c === open) depth++;
    else if (c === close) { depth--; if (!depth) { j++; break; } }
  }
  return src.slice(start, j);
}

/* Every one of the 53 settings arrays and defaults objects in the corpus
   is a pure literal — measured, not assumed. If that ever stops being
   true the eval throws and the file is reported, never silently skipped. */
function schemaFromSource(stem) {
  const src = fs.readFileSync(path.join(MINI, stem + '.js'), 'utf8');
  const setTxt = balanced(src, /\n\s*settings:\s*\[/, '[', ']');
  if (!setTxt || !/key\s*:/.test(setTxt)) return null;
  const defTxt = balanced(src, /\n\s*defaults:\s*\{/, '{', '}');
  let settings, defaults;
  try { settings = new Function('return ' + setTxt)(); }
  catch (e) { return { parseError: 'settings array is not a literal: ' + e.message }; }
  try { defaults = defTxt ? new Function('return ' + defTxt)() : null; }
  catch (e) { return { parseError: 'defaults object is not a literal: ' + e.message }; }
  return {
    settings, defaults,
    hasRender: /\n\s*render:\s*function/.test(src),
    hasOnSettings: /\n\s*onSettings:\s*function/.test(src),
    misnamed: ['onSetting', 'onSettingChange', 'onSettingsChange']
      .filter(k => new RegExp('\\n\\s*' + k + '\\s*:\\s*function').test(src))
  };
}

function settingsBearingStems() {
  return fs.readdirSync(MINI).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, ''))
    .filter(stem => {
      const src = fs.readFileSync(path.join(MINI, stem + '.js'), 'utf8');
      const t = balanced(src, /\n\s*settings:\s*\[/, '[', ']');
      return !!t && /key\s*:/.test(t);
    });
}

/* --------------------------- the static half --------------------------
   ⚠ THE SOURCE LITERAL IS A TEMPLATE, NOT THE SHIPPED SCHEMA, AND THIS
   GATE LEARNED THAT BY CONDEMNING TWO CORRECT TOOLS ON ITS FIRST RUN.
   money-mat.js:275 declares `coinsFrom` with `options: []` and rebuilds
   the whole array in init() (`this.settings = this._applicableSettings()`,
   :644-670, filtering rows by locale and band and formatting the coin
   faces); part-whole-frame.js:320 does the same for `scheme`, filling
   `this.settings[2].options` at :493 with the actual gradients. Both are
   correct, both are deliberate — the shell builds the drawer LAZILY on
   first click, long after init(), which is exactly what makes it legal.

   So anything about OPTIONS or about a default's membership in them is
   unanswerable from source and is asserted in the runtime half instead,
   against the array the shell was actually handed. What stays here is
   only what a rebuild cannot change. Widening this to "look, it's empty"
   would be the ban-too-wide trap, and it would teach the next author to
   route around the gate rather than report it. */
function staticChecks(label, schema) {
  if (schema.parseError) { bad(`${label}: ${schema.parseError}`); return; }
  for (const f of schema.settings) {
    const at = `${label}: field "${f.key}"`;
    if (TYPES.indexOf(f.type) < 0)
      bad(`${at} has type "${f.type}" — the shell renders only ${TYPES.join('/')} and has no else branch (lcs-shell.js:590-631), so it is a label with no control`);
    if (schema.defaults && !(f.key in schema.defaults))
      bad(`${at} has no entry in defaults — lcs-shell.js:472 seeds only from defaults, so it starts undefined and no chip reads as selected`);
    if (!f.labelKey) bad(`${at} has no labelKey — the drawer renders an empty label`);
    if (!f.key) bad(`${label}: a field has no key — the drawer writes to settings[undefined]`);
  }
  if (!schema.hasRender && !schema.hasOnSettings)
    bad(`${label}: declares settings but has neither render() nor onSettings() — commitSettings guards BOTH (lcs-shell.js:635-636), so every option is inert by construction`);
  if (schema.misnamed.length)
    bad(`${label}: hook(s) ${schema.misnamed.join(', ')} are spelled wrong — the shell only ever calls onSettings(), silently`);
}

/* ⚠ POISON THE STATIC CHECKS IN BOTH DIRECTIONS, IN MEMORY. Never on
   disk: a poison experiment undone with `git checkout --` once discarded
   fourteen unrelated fixes in this repo. Each case names what it proves,
   and the MUST-PASS half is not decoration — three gates here shipped
   condemning correct code, and this one already did it once (money-mat). */
function poisonStatic() {
  const cases = [
    { name: 'unknown type', fire: true, s: { settings: [{ key: 'k', type: 'slider', labelKey: 'l' }], defaults: { k: 1 }, hasRender: true, hasOnSettings: false, misnamed: [] } },
    { name: 'key missing from defaults', fire: true, s: { settings: [{ key: 'k', type: 'toggle', labelKey: 'l' }], defaults: {}, hasRender: true, hasOnSettings: false, misnamed: [] } },
    { name: 'no labelKey', fire: true, s: { settings: [{ key: 'k', type: 'toggle' }], defaults: { k: 1 }, hasRender: true, hasOnSettings: false, misnamed: [] } },
    { name: 'no render and no onSettings', fire: true, s: { settings: [{ key: 'k', type: 'toggle', labelKey: 'l' }], defaults: { k: 1 }, hasRender: false, hasOnSettings: false, misnamed: [] } },
    { name: 'misspelled hook', fire: true, s: { settings: [{ key: 'k', type: 'toggle', labelKey: 'l' }], defaults: { k: 1 }, hasRender: true, hasOnSettings: false, misnamed: ['onSettingsChange'] } },
    /* the half that matters most: a CORRECT tool must survive */
    { name: 'correct toggle', fire: false, s: { settings: [{ key: 'k', type: 'toggle', labelKey: 'l' }], defaults: { k: true }, hasRender: true, hasOnSettings: false, misnamed: [] } },
    /* and the shape that already produced a false alarm: options filled
       at init(), declared empty in source. MUST PASS. */
    { name: 'options assembled at init (money-mat shape)', fire: false, s: { settings: [{ key: 'k', type: 'choice', labelKey: 'l', options: [] }], defaults: { k: 0 }, hasRender: true, hasOnSettings: true, misnamed: [] } }
  ];
  let bugs = 0;
  for (const c of cases) {
    const before = FAIL;
    const realErr = console.error; console.error = () => {};
    staticChecks('poison', c.s);
    console.error = realErr;
    const fired = FAIL > before;
    FAIL = before;
    if (fired === c.fire) console.log(`  ok        poison "${c.name}" ${c.fire ? 'FIRES' : 'passes'} as required`);
    else { bugs++; console.error(`  FAIL      poison "${c.name}" ${fired ? 'fired but must PASS' : 'did not fire but must FAIL'}`); }
  }
  console.log(`\npoison: ${cases.length - bugs}/${cases.length} correct`);
  process.exit(bugs ? 1 : 0);
}

function runContractOnly() {
  if (POISON === 'static') poisonStatic();
  const stems = settingsBearingStems();
  console.log(`settings-efficacy · contract-only · ${stems.length} settings-bearing file(s)`);
  let fields = 0;
  for (const stem of stems) {
    const schema = schemaFromSource(stem);
    if (!schema) continue;
    if (!schema.parseError) fields += schema.settings.length;
    staticChecks(stem, schema);
  }
  /* non-vacuity: a contract run that parsed nothing must say so */
  if (!stems.length || !fields) { vac('parsed 0 settings fields — this run measured nothing'); }
  else console.log(`  ok        ${fields} field(s) across ${stems.length} file(s) satisfy the drawer contract`);
  console.log(`\n${FAIL} failed, ${VACUOUS} vacuous`);
  process.exit(FAIL || VACUOUS ? 1 : 0);
}

if (CONTRACT_ONLY) runContractOnly();

/* ===================== everything below needs a browser =============== */
const puppeteer = require('puppeteer');

function serve() {
  return http.createServer((req, res) => {
    const clean = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (clean.startsWith('/image-library-webp/')) file = path.join(IMG, clean.slice('/image-library-webp/'.length));
    else if (clean.startsWith('/mini-tools/')) file = path.join(MINI, clean.slice('/mini-tools/'.length));
    else file = path.join(MINI, clean.replace(/^\//, ''));
    fs.readFile(file, (e, b) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

function mountGlobal(htmlFile) {
  const src = fs.readFileSync(path.join(MINI, htmlFile), 'utf8');
  const m = src.match(/LCS\.mount\(\s*([A-Za-z0-9_$]+)/);
  return m ? m[1] : null;
}

function activitySurfacesFor(coreStem) {
  const out = [];
  const wrappers = fs.readdirSync(MINI).filter(f => f.endsWith('.html'))
    .filter(f => fs.readFileSync(path.join(MINI, f), 'utf8').includes(coreStem + '.js'));
  for (const w of wrappers) {
    const stem = w.replace(/\.html$/, '');
    for (const mf of fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json'))) {
      let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, mf), 'utf8')); } catch (_) { continue; }
      if (!Array.isArray(rows)) continue;
      rows.filter(r => r.tool === stem).forEach(r => out.push({
        kind: 'activity', id: r.id, stem: coreStem, html: w, global: mountGlobal(w),
        url: `/${w}?activity=${encodeURIComponent(r.id)}&lang=${LANG}&embed=1`
      }));
    }
  }
  return out;
}

function resolveSurfaces() {
  const tools = [], acts = [];
  for (const stem of settingsBearingStems()) {
    if (fs.existsSync(path.join(MINI, stem + '.html'))) {
      tools.push({ kind: 'tool', id: stem, stem, html: stem + '.html', global: mountGlobal(stem + '.html'),
        url: `/${stem}.html?lang=${LANG}&embed=1` });
    } else {
      acts.push(...activitySurfacesFor(stem));   /* a core with no page of its own */
    }
  }
  if (WANT_TOOL) return tools.filter(s => WANT_TOOL.split(',').includes(s.id));
  if (WANT_ACT) return acts.filter(s => WANT_ACT.split(',').includes(s.id));
  if (ALL_TOOLS && ALL_ACTS) return tools.concat(acts);
  if (ALL_TOOLS) return tools;
  if (ALL_ACTS) return acts;
  return [];
}

/* ------------------------------------------------------------ page boot */
function pageBoot(state, poison) {
  try { localStorage.clear(); } catch (_) {}
  if (state.token) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }

  /* ⚠ A SEEDED PRNG, because several engines shuffle their round order
     on every mount (§A.13.60). Without this, two loads of the SAME
     activity differ before any setting is touched and the control below
     would mark every field UNPROVEN. Seeding removes a source of
     variance that has nothing to do with settings; it does NOT tell the
     gate what to expect. */
  (function () {
    var s = 0x2f6e2b1;
    Math.random = function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e6) / 1e6; };
  }());

  window.__printed = 0; window.__spoken = []; window.__tones = [];
  window.print = function () { window.__printed++; };

  /* The shell's tone hook is a closure over an AudioContext and is NOT
     exported (lcs-shell.js:102-127; LCS.Audio is LCSAudio, a different
     object). The constructor is the only seam, and instrumenting it is
     what makes clacks / pop / tileSound / drum / rattle / flickSound
     measurable at all. */
  function FakeCtx() {
    this.currentTime = 0; this.state = 'running'; this.destination = {};
    this.resume = function () {};
    this.createGain = function () {
      return { gain: { setValueAtTime: function () {}, exponentialRampToValueAtTime: function () {}, linearRampToValueAtTime: function () {}, value: 0 }, connect: function () {} };
    };
    this.createOscillator = function () {
      var o = {
        type: '', frequency: { value: 0, setValueAtTime: function (v) { o.frequency.value = v; } },
        connect: function () {},
        start: function () { window.__tones.push(o.type + ':' + o.frequency.value); },
        stop: function () {}
      };
      return o;
    };
    this.createBufferSource = function () { return { buffer: null, connect: function () {}, start: function () { window.__tones.push('buf'); }, stop: function () {} }; };
    this.createBuffer = function () { return { getChannelData: function () { return new Float32Array(8); } }; };
  }
  window.AudioContext = FakeCtx; window.webkitAudioContext = FakeCtx;

  var install = function () {
    if (!window.LCSAudio) return false;
    window.LCSAudio.speak = function (o) { window.__spoken.push(((o && o.type) || '') + ':' + ((o && o.text) || '')); };
    window.LCSAudio.cancel = function () {};
    window.LCSAudio._loadInventory = function () { return Promise.resolve({}); };
    return true;
  };
  if (!install()) {
    var iv = setInterval(function () { if (install()) clearInterval(iv); }, 10);
    setTimeout(function () { clearInterval(iv); }, 4000);
  }

  /* THE SIGNATURE — four channels, and storage is deliberately not one
     of them (see the header). `removed` travels out so the caller can
     prove the drawer exclusion excluded something. */
  window.__sig = function () {
    var app = document.querySelector('.lcs-app');
    if (!app) return null;
    var c = app.cloneNode(true);
    var nodes = c.querySelectorAll('.lcs-drawer, .lcs-drawer-scrim');
    var removed = nodes.length;
    /* --poison=drawer-scope leaves the drawer IN, to demonstrate that
       the exclusion is the thing doing the work. */
    if (poison !== 'drawer-scope') { for (var i = 0; i < nodes.length; i++) nodes[i].remove(); }
    var canv = '';
    var cs = document.querySelectorAll('.lcs-app canvas');
    for (var k = 0; k < cs.length; k++) {
      try {
        var g = cs[k].getContext('2d');
        var d = g.getImageData(0, 0, cs[k].width, cs[k].height).data;
        var h = 0;
        for (var p = 0; p < d.length; p += 97) { h = (h * 31 + d[p]) >>> 0; }
        canv += cs[k].width + 'x' + cs[k].height + ':' + h + ';';
      } catch (_) { canv += 'x;'; }
    }
    var out = {
      board: app.className + '|' + c.innerHTML,
      body: document.body.className + '|' + document.documentElement.className,
      canvas: canv,
      spoken: window.__spoken.join('~'),
      tones: window.__tones.join('~'),
      printed: window.__printed,
      removed: removed,
      /* informational only — NEVER part of the verdict */
      store: (function () { try { return JSON.stringify(localStorage); } catch (_) { return ''; } })()
    };
    return out;
  };

  /* ⚠ FIND THE GEAR BY WHAT IT OPENS, NOT BY ITS LABEL. The label is
     i18n.chrome('settings') and changes in all eleven locales; matching
     on text would make this gate monolingual. */
  window.__openDrawer = function () {
    var btns = document.querySelectorAll('.lcs-app .lcs-ctrl');
    for (var i = 0; i < btns.length; i++) {
      btns[i].click();
      if (document.querySelector('.lcs-drawer')) return true;
    }
    return false;
  };

  window.__drawerFields = function () {
    return Array.prototype.map.call(document.querySelectorAll('.lcs-drawer .lcs-field'), function (f) {
      var chips = f.querySelectorAll('.lcs-chip');
      return {
        label: (f.querySelector('label') || {}).textContent || '',
        chips: chips.length,
        checked: Array.prototype.findIndex.call(chips, function (c) { return c.getAttribute('aria-checked') === 'true'; }),
        toggle: !!f.querySelector('.lcs-switch'),
        /* a field with neither a segment nor a switch is the inert
           unknown-type row — caught at runtime as well as statically */
        inert: !chips.length && !f.querySelector('.lcs-switch')
      };
    });
  };

  /* optIdx === null means "re-commit the value it already has" — the
     null transition. For a toggle that is two clicks (out and back),
     which fires commitSettings twice and lands on the same value. */
  window.__setField = function (idx, optIdx) {
    var f = document.querySelectorAll('.lcs-drawer .lcs-field')[idx];
    if (!f) return false;
    var chips = f.querySelectorAll('.lcs-chip');
    if (chips.length) {
      if (optIdx === null) {
        var cur = Array.prototype.findIndex.call(chips, function (c) { return c.getAttribute('aria-checked') === 'true'; });
        chips[cur < 0 ? 0 : cur].click(); return true;
      }
      if (!chips[optIdx]) return false;
      chips[optIdx].click(); return true;
    }
    var sw = f.querySelector('.lcs-switch');
    if (!sw) return false;
    sw.click();
    if (optIdx === null) sw.click();
    return true;
  };

  window.__closeDrawer = function () {
    var x = document.querySelector('.lcs-drawer-head .lcs-ctrl');
    if (x) x.click();
  };

  /* A fixed, deterministic use of the apparatus, so a setting whose
     effect only appears once the child DOES something has a chance to
     show itself. Deliberately ordered and capped — a random walk would
     defeat the control. */
  window.__exercise = function (max) {
    var stage = document.querySelector('.lcs-stage') || document.querySelector('.lcs-app');
    if (!stage) return 0;
    var hit = 0;
    var cand = Array.prototype.filter.call(
      stage.querySelectorAll('button, [role="button"], [tabindex]'),
      function (e) {
        var r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && !e.disabled && !e.closest('.lcs-drawer') && !e.closest('.lcs-controls');
      });
    /* ⚠ ONE OF EACH KIND, NOT THE FIRST N OF ONE KIND. Taking candidates
       in raw DOM order spent the whole budget on the first control class
       it met — 14 day-cells on calendar-wall, 14 tiles elsewhere — and
       never reached the mode switch two rows down. Grouping by className
       and taking a couple from each group covers the tool's VERB SPACE
       instead of one corner of it, at the same cost. Deterministic:
       groups keep first-appearance order. */
    var groups = [], byCls = {};
    for (var g = 0; g < cand.length; g++) {
      var cls = cand[g].className || cand[g].tagName;
      if (!byCls[cls]) { byCls[cls] = []; groups.push(byCls[cls]); }
      byCls[cls].push(cand[g]);
    }
    var order = [], round = 0;
    while (order.length < cand.length && round < 4) {
      for (var q = 0; q < groups.length; q++) if (groups[q][round]) order.push(groups[q][round]);
      round++;
    }
    for (var i = 0; i < Math.min(max || 4, order.length); i++) {
      try { order[i].click(); hit++; } catch (_) {}
    }
    var chk = document.querySelector('.lcs-activity-check');
    if (chk && !chk.disabled) { try { chk.click(); hit++; } catch (_) {} }
    return hit;
  };

  /* drive the activity to the next round, so "it applied" can be told
     apart from "it stuck" */
  window.__nextRound = function () {
    var n = document.querySelector('.lcs-activity-next');
    if (n && !n.disabled) { n.click(); return true; }
    if (typeof window.LCS_reloadFirstTask === 'function') { window.LCS_reloadFirstTask(); return true; }
    return false;
  };

  window.__schema = function (g) {
    var t = window[g];
    if (!t || !t.settings) return null;
    return {
      settings: t.settings.map(function (f) {
        return {
          key: f.key, type: f.type, labelKey: f.labelKey,
          options: (f.options || []).map(function (o) { return (o && typeof o === 'object') ? o.value : o; }),
          optionLabelKeys: (f.options || []).map(function (o) { return (o && typeof o === 'object') ? (o.labelKey || null) : null; })
        };
      }),
      defaults: t.defaults || {},
      strings: t.strings || {},
      hasRender: typeof t.render === 'function',
      hasOnSettings: typeof t.onSettings === 'function',
      hasTasks: !!(t.tasks || t.nextTask)
    };
  };

  window.__value = function (g, key) {
    var t = window[g];
    if (!t || !t.api || !t.api.settings) return undefined;
    return t.api.settings[key];
  };
}

/* ---------------------------------------------------------- page helper */
async function openPage(browser, surface, state, PORT) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => r.url().includes('/api/auth/me')
    ? r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(state.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      })
    : r.continue());
  await page.evaluateOnNewDocument(pageBoot, state, POISON);
  await page.goto(`http://127.0.0.1:${PORT}${surface.url}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.lcs-app', { timeout: 12000 });
  await wait(950);   /* async manifest / theme fetches settle */
  return page;
}

/* the verdict compares these four channels ONLY. store is carried for
   triage and is never read here — see channel 2 in the header. */
function sameTrace(a, b) {
  if (!a || !b) return false;
  return a.board === b.board && a.body === b.body && a.canvas === b.canvas
    && a.spoken === b.spoken && a.tones === b.tones && a.printed === b.printed;
}
function whichChannel(a, b) {
  if (!a || !b) return '?';
  if (a.board !== b.board) return 'BOARD';
  if (a.canvas !== b.canvas) return 'CANVAS';
  if (a.spoken !== b.spoken) return 'SPEECH';
  if (a.tones !== b.tones) return 'BEEP';
  if (a.body !== b.body) return 'PAGE';
  if (a.printed !== b.printed) return 'PRINT';
  return '?';
}

/* one measurement: fresh page → open drawer → set field i to option j
   (null = re-commit the current value) → measure at rest → exercise →
   measure again. Returns both, plus the value the tool now holds. */
async function trace(browser, surface, state, PORT, sets, key, probe) {
  const page = await openPage(browser, surface, state, PORT);
  try {
    if (!(await page.evaluate(() => window.__openDrawer()))) return null;
    await wait(180);
    for (const s of sets) {
      const done = await page.evaluate((i, o) => window.__setField(i, o), s.field, s.opt);
      if (!done) return null;
      await wait(SETTLE);
    }
    await page.evaluate(() => window.__closeDrawer());
    await wait(120);
    const atRest = await page.evaluate(() => window.__sig());
    await page.evaluate((n) => window.__exercise(n), EXERCISE);
    await wait(SETTLE);
    if (probe && probe.finalClick) {
      await page.evaluate((sel) => {
        const e = document.querySelector(sel);
        if (e && !e.disabled) e.click();
      }, probe.finalClick);
      await wait(SETTLE);
    }
    const afterUse = await page.evaluate(() => window.__sig());
    let stuck = null;
    if (key) {
      const before = await page.evaluate((g, k) => window.__value(g, k), surface.global, key);
      const moved = await page.evaluate(() => window.__nextRound());
      if (moved) {
        await wait(SETTLE + 250);
        const after = await page.evaluate((g, k) => window.__value(g, k), surface.global, key);
        stuck = { before, after, checked: true };
      }
    }
    return { atRest, afterUse, stuck };
  } finally { await page.close(); }
}

/* ================================================================ audit */
async function auditSurface(browser, surface, state, PORT) {
  const tag = `${surface.id} · ${state.id}`;
  console.log(`\n[${tag}]`);

  const seed = await openPage(browser, surface, state, PORT);
  const schema = await seed.evaluate((g) => window.__schema(g), surface.global);
  if (!schema) { vac(`${tag}: no settings schema on window.${surface.global} — wrong mount global, or the tool declares none`); await seed.close(); return; }

  /* ---- the checks that are only answerable AFTER init() ----
     Options and defaults live here, not in the static half, because a
     tool may legitimately assemble its rows in init() (money-mat,
     part-whole-frame). This is the array the shell was actually handed,
     and the merged strings object is the real one. */
  const CSS_COLOR = /^(#[0-9a-f]{3,8}|rgb|hsl|[a-z]+$)/i;
  for (const f of schema.settings) {
    const at = `${tag}: field "${f.key}"`;
    if ((f.type === 'choice' || f.type === 'color') && !f.options.length)
      bad(`${at} reached the drawer as a ${f.type} with NO options — lcs-shell.js:599 throws on it, which leaves the drawer detached and bricks every other setting on the tool`);
    if (f.options.length && (f.key in schema.defaults) && f.options.indexOf(schema.defaults[f.key]) < 0)
      bad(`${at} defaults to ${JSON.stringify(schema.defaults[f.key])}, which is not one of its own options ${JSON.stringify(f.options)} — the drawer cannot show the true state, so it shows a false one`);
    if (f.type === 'color') {
      const badCol = f.options.filter(o => !CSS_COLOR.test(String(o)));
      if (badCol.length) bad(`${at} has option(s) that are not CSS colours ${JSON.stringify(badCol)} — lcs-shell.js:604 sets them as a background, so the swatch renders blank`);
    }
    for (const lk of [f.labelKey].concat(f.optionLabelKeys.filter(Boolean))) {
      const entry = schema.strings[lk];
      if (!entry) { bad(`${tag}: labelKey "${lk}" is missing from the merged tool.strings — the drawer renders the raw key`); continue; }
      const missing = LOCALES.filter(l => !entry[l]);
      if (missing.length) bad(`${tag}: labelKey "${lk}" has no ${missing.join(',')} — those locales see English or the raw key`);
    }
  }

  /* ---- non-vacuity, asserted before any verdict is emitted ---- */
  if (!(await seed.evaluate(() => window.__openDrawer()))) {
    vac(`${tag}: no control opens a drawer, on a tool declaring ${schema.settings.length} field(s)`);
    await seed.close(); return;
  }
  await wait(200);
  const fields = await seed.evaluate(() => window.__drawerFields());
  if (fields.length !== schema.settings.length)
    vac(`${tag}: the drawer rendered ${fields.length} field(s) for a schema of ${schema.settings.length} — index alignment is not safe, so nothing below can be trusted`);
  fields.forEach((f, i) => { if (f.inert) bad(`${tag}: field "${(schema.settings[i] || {}).key}" rendered with no control at all — an unknown type produces a label-only row`); });
  const probe = await seed.evaluate(() => window.__sig());
  await seed.close();
  if (!probe) { vac(`${tag}: no .lcs-app to measure`); return; }
  if (!probe.removed) { vac(`${tag}: the drawer-exclusion selector matched NOTHING with the drawer open — this gate would be comparing the drawer against itself`); return; }
  if (!probe.board || probe.board.length < 40) { vac(`${tag}: the board signature is empty — this run measured nothing`); return; }
  if (fields.length !== schema.settings.length) return;

  /* ---------------------- efficacy, per field ---------------------- */
  for (let i = 0; i < schema.settings.length; i++) {
    const f = schema.settings[i];
    const name = `"${f.key}"`;
    const nOpts = fields[i].chips || 2;

    /* THE CONTROL. Two identical null transitions from fresh pages. If
       they differ, tool.render() churns and a diff proves nothing. */
    const probe = (PROBES[surface.id] || {})[f.key] || null;
    const n1 = await trace(browser, surface, state, PORT, [{ field: i, opt: null }], null, probe);
    const n2 = await trace(browser, surface, state, PORT, [{ field: i, opt: null }], null, probe);
    if (!n1 || !n2) { vac(`${tag}: ${name} could not be driven — no chip or switch answered`); continue; }
    const stable = sameTrace(n1.atRest, n2.atRest) && sameTrace(n1.afterUse, n2.afterUse);
    if (!stable) {
      const excused = (KNOWN_UNPROVABLE[surface.id] || {})[f.key];
      if (excused) { ok(`${tag}: ${name} excused — ${excused}`); continue; }
      unk(`${tag}: ${name} — re-committing the SAME value twice gives two different boards (${whichChannel(n1.atRest, n2.atRest)}/${whichChannel(n1.afterUse, n2.afterUse)}); this tool churns under re-render, so a diff here would prove nothing`);
      findings.push({ surface: surface.id, state: state.id, key: f.key, verdict: 'UNPROVEN-CHURN' });
      continue;
    }

    /* real transitions */
    let live = null;
    for (let o = 0; o < nOpts && !live; o++) {
      if (fields[i].chips && o === fields[i].checked) continue;   /* that is the null transition */
      const t = await trace(browser, surface, state, PORT, [{ field: i, opt: o }], schema.hasTasks ? f.key : null, probe);
      if (!t) continue;
      if (!sameTrace(n1.atRest, t.atRest)) live = { how: 'at rest', ch: whichChannel(n1.atRest, t.atRest), t };
      else if (!sameTrace(n1.afterUse, t.afterUse)) live = { how: 'after use', ch: whichChannel(n1.afterUse, t.afterUse), t };
    }

    /* paired depth — a field can be genuinely unable to act until a
       SIBLING moves (a counter colour cannot show while the counter is a
       picture). Refusing to look deeper is what makes such a control
       look dead forever. */
    if (!live) {
      outer:
      for (let j = 0; j < schema.settings.length; j++) {
        if (j === i) continue;
        const nj = fields[j].chips || 2;
        for (let oj = 0; oj < nj; oj++) {
          if (fields[j].chips && oj === fields[j].checked) continue;
          const base = await trace(browser, surface, state, PORT, [{ field: j, opt: oj }, { field: i, opt: null }], null, probe);
          if (!base) continue;
          for (let oi = 0; oi < nOpts; oi++) {
            if (fields[i].chips && oi === fields[i].checked) continue;
            const t = await trace(browser, surface, state, PORT, [{ field: j, opt: oj }, { field: i, opt: oi }], null, probe);
            if (!t) continue;
            if (!sameTrace(base.atRest, t.atRest)) { live = { how: 'after ' + schema.settings[j].key, ch: whichChannel(base.atRest, t.atRest), t }; break outer; }
            if (!sameTrace(base.afterUse, t.afterUse)) { live = { how: 'after ' + schema.settings[j].key, ch: whichChannel(base.afterUse, t.afterUse), t }; break outer; }
          }
        }
      }
    }

    const excused = (KNOWN_UNPROVABLE[surface.id] || {})[f.key];
    if (live) {
      /* "it applied" is not "it stuck" */
      const s = live.t.stuck;
      if (s && s.checked && s.before !== undefined && s.before !== s.after) {
        bad(`${tag}: ${name} REVERTED — the tool honours it, then the next task overwrites it (${JSON.stringify(s.before)} → ${JSON.stringify(s.after)}); the teacher's choice does not survive one round`);
        findings.push({ surface: surface.id, state: state.id, key: f.key, verdict: 'REVERTED' });
      } else {
        ok(`${tag}: ${name} changes the board via ${live.ch} (${live.how}${probe ? ', via probe' : ''})`);
      }
    } else if (excused) {
      ok(`${tag}: ${name} excused — ${excused}`);
    } else {
      bad(`${tag}: ${name} CHANGES NOTHING outside the drawer — not at rest, not after use, not paired with any other field, on a control whose null transition is provably stable`);
      findings.push({ surface: surface.id, state: state.id, key: f.key, verdict: 'DEAD' });
    }
  }
}

/* ================================================================= main */
(async () => {
  const surfaces = resolveSurfaces();
  if (!surfaces.length) {
    console.error('  usage: --contract-only | --tool=<stem>[,<stem>] | --activity=<manifest-id> | --all | --all-activities');
    process.exit(2);
  }
  if (POISON) console.log(`  ⚠ POISON MODE "${POISON}" — this run is a demonstration, not a verdict`);
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  console.log(`settings-efficacy · ${surfaces.length} surface(s) × ${STATES.length} state(s) · lang=${LANG}`);
  for (const s of surfaces) {
    if (!s.global) { vac(`${s.id}: could not read the LCS.mount global from ${s.html}`); continue; }
    for (const st of STATES) {
      try { await auditSurface(browser, s, st, PORT); }
      catch (e) { bad(`${s.id} · ${st.id}: ${String(e && e.message || e).slice(0, 200)}`); }
    }
  }
  await browser.close();
  server.close();
  if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(findings, null, 2));
  console.log(`\n${PASS} live, ${FAIL} failed, ${UNPROVEN} unproven, ${VACUOUS} vacuous`);
  process.exit(FAIL || VACUOUS ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
