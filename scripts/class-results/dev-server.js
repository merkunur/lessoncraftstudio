#!/usr/bin/env node
/**
 * The local class preview: class links and results, end to end, with nothing written anywhere.
 *
 *   node scripts/class-results/dev-server.js [--port=8495] [--seed]      → http://localhost:8495/teacher
 *
 * The REAL rules (frontend/lib/class-results/store.ts) run over an in-memory database (mem-db.js); the REAL
 * children's page (child-page.ts) and teacher screen (teacher-app.ts) are bundled as the website bundles them.
 * Everything else is the local makers preview (scripts/makers/serve.js), so a maker student link plays here, and
 * a published deck page is fetched from the live site (read only, QA header) with the local working copies of
 * lcs-meter.js and lcs-class.js swapped in — a child can tap a seat, play a real page and the result lands on the
 * dashboard.
 *
 *   /<loc>/activities/<slug>         an activity page: the REAL class mode (components/activities/ActivityClassMode.tsx,
 *                                    bundled with React) over the local working copy of the activity in "mini tools/"
 *   /teacher                         the teacher screen (as a subscriber)
 *   /c/<code>                        a class link
 *   /api/classes/*  /api/class/*     the two APIs
 *   /__class/as?who=sub|free|anon    who the teacher is (free = a lapsed plan: the class link closes, reading stays)
 *   /__class/clock?hours=7           move the clock forward (a sitting ends after six hours)
 *   /__class/state                   the database as JSON
 *
 * --seed makes one class with eight children, three assignments and some results.
 * Exports { start } for the robots (tests/class-page.js, tests/teacher-app.js).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const REPO = path.join(__dirname, '..', '..');
const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
const { memDb } = require('./mem-db.js');
const LIB = path.join(REPO, 'frontend', 'lib', 'class-results');
const OUT = path.join(REPO, 'out', 'class-results', '_dev');
const WEB = path.join(__dirname, 'web');
const TEACHER = 'local-teacher'; // = scripts/makers/local-store.js TEACHER: her maker links are hers here too
const LIVE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/** real pages of the live catalogue (read 2026-11-11), enough to play with */
const DECKS = {
  'en/telling-time-easy-g1148-2': { title: 'Telling Time', interactive: true },
  'en/number-words-easy-g1210-10': { title: 'Number Words', interactive: true },
  'en/maze-puzzles-easy-g1420-2': { title: 'Maze Puzzles', interactive: true },
  'en/picture-tracing-k418': { title: 'Picture Tracing', interactive: false },
};
const LADDERS = {
  'en/g1116': { code: 'g1116', title: 'Number Lines', levels: {
    easy: [7, 8, 9, 10, 11].map((n) => 'number-lines-easy-g1116-' + n),
    core: [2, 3, 4, 5, 6].map((n) => 'number-lines-g1116-' + n), // the set's first page (number-lines-g1116) has no screen version

    hard: [12, 13, 14, 15, 16].map((n) => 'number-lines-hard-g1116-' + n),
  } },
};

/** every activity of the local manifests: '<loc>/<slug>' → { id, title, tool } (the lookup lib/activities.ts does on the site) */
function activityIndex() {
  const dir = path.join(REPO, 'mini tools'), out = {};
  for (const f of fs.readdirSync(dir).filter((x) => /-activities\.json$/.test(x))) {
    let m; try { m = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { continue; }
    for (const row of (m.activities || m)) {
      if (!row || !row.id || !row.tool || !row.slug) continue;
      for (const loc of LOCALES) {
        const slug = row.slug[loc], title = row.page_title && row.page_title[loc];
        if (slug && title && !out[loc + '/' + slug]) out[loc + '/' + slug] = { id: row.id, tool: row.tool, title: title.replace(/\s*\([^()]*\)\s*$/, '').slice(0, 200) };
      }
    }
  }
  return out;
}

/** the class mode of an activity page, bundled for the browser. poison: the rule "a Check the activity pressed itself gives no marks" is taken out */
function buildActivityMode(poison) {
  fs.mkdirSync(OUT, { recursive: true });
  const srcFile = path.join(REPO, 'frontend', 'components', 'activities', 'ActivityClassMode.tsx');
  let src = fs.readFileSync(srcFile, 'utf8');
  if (poison) {
    const needle = 'if (!real && !said) marks = false;';
    if (src.split(needle).length !== 2) throw new Error('the poison needle is gone from ActivityClassMode.tsx');
    src = src.replace(needle, '');
  }
  const copy = path.join(OUT, 'ActivityClassMode.tsx');
  fs.writeFileSync(copy, src);
  const q = (x) => JSON.stringify(x.split(path.sep).join('/'));
  fs.writeFileSync(path.join(OUT, 'activity-mode-entry.tsx'),
    'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport ActivityClassMode from ' + q(copy) + ';\nimport { CLASS_BACK_LABEL } from ' + q(path.join(LIB, 'back-label.ts')) + ';\n'
    + 'const loc = document.documentElement.lang;\ncreateRoot(document.getElementById("lcs-class-mode-host") as HTMLElement).render(React.createElement(ActivityClassMode, { backLabel: CLASS_BACK_LABEL[loc] || CLASS_BACK_LABEL.en }));\n');
  esbuild.buildSync({ entryPoints: [path.join(OUT, 'activity-mode-entry.tsx')], bundle: true, platform: 'browser', format: 'iife', target: 'es2017', jsx: 'automatic', nodePaths: [path.join(REPO, 'frontend', 'node_modules')], define: { 'process.env.NODE_ENV': '"production"' }, outfile: path.join(OUT, 'activity-mode.js'), logLevel: 'error' });
}

function build() {
  fs.mkdirSync(OUT, { recursive: true });
  const server = path.join(OUT, 'server.bundle.js');
  fs.writeFileSync(path.join(OUT, 'server-entry.ts'), "export * as store from '" + path.join(LIB, 'store.ts').replace(/\\/g, '/') + "';\nexport { childPageHtml, CHILD_PAGE_HEADERS } from '" + path.join(LIB, 'child-page.ts').replace(/\\/g, '/') + "';\nexport { pickSkillIndex } from '" + path.join(LIB, 'skill-index.ts').replace(/\\/g, '/') + "';\n");
  esbuild.buildSync({ entryPoints: [path.join(OUT, 'server-entry.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: server, logLevel: 'error', alias: { '@': path.join(REPO, 'frontend') } });
  const teacherSrc = path.join(LIB, 'teacher-app.ts');
  if (fs.existsSync(teacherSrc)) esbuild.buildSync({ entryPoints: [teacherSrc], bundle: true, platform: 'browser', format: 'iife', globalName: 'LCSClasses', target: 'es2017', outfile: path.join(OUT, 'teacher-app.js'), logLevel: 'error' });
  delete require.cache[require.resolve(server)];
  return require(server);
}

function start({ port = 0, seed = false, poisonActivity = false } = {}) {
  process.env.CLASS_RESULTS_ENABLED = '1';
  const B = build();
  buildActivityMode(poisonActivity);
  const ACTIVITIES = activityIndex();
  const S = B.store;
  const makers = require(path.join(REPO, 'scripts', 'makers', 'serve.js'));
  const localStore = require(path.join(REPO, 'scripts', 'makers', 'local-store.js'));
  const QA = require(path.join(REPO, 'scripts', 'lib', 'qa-header.js')).headers();
  const state = { who: 'sub', skew: 0 };
  const now = () => new Date(Date.now() + state.skew);
  const usable = new Set([TEACHER]);
  const db = memDb({
    now, usable, decks: DECKS, ladders: LADDERS, activities: ACTIVITIES,
    resolveLanding: () => null,
    resolveMakerLink: (linkId, teacherId) => { const l = teacherId === TEACHER ? localStore.readLink(linkId) : null; return l && l.kind === 'student' ? { linkId, title: (typeof l.title === 'string' && l.title) || (l.recipe && l.recipe.title) || 'Worksheet' } : null; },
  });
  const A = S.CODE_ALPHABET;
  const draw = (n) => () => { let s = ''; for (let i = 0; i < n; i++) s += A[Math.floor(Math.random() * A.length)]; return s; };
  const newCode = draw(10), newToken = draw(20);
  // (names: the first-names permission; on by default here so the names paths stay tested, off with /__class/as?names=0 —
  //  which is what every teacher is at launch)
  const me = () => (state.who === 'anon' ? null : { userId: TEACHER, usable: state.who === 'sub', names: state.names !== false });
  const deckCache = new Map();

  const send = (res, status, body, headers) => { const h = { 'content-type': 'application/json', 'cache-control': 'no-store' }; for (const k of Object.keys(headers || {})) h[k.toLowerCase()] = headers[k]; res.writeHead(status, h); res.end(typeof body === 'string' ? body : JSON.stringify(body)); };
  const readBody = (req) => new Promise((resolve) => { let t = ''; req.on('data', (c) => { t += c; if (t.length > 16 * 1024) req.destroy(); }); req.on('end', () => { try { resolve(JSON.parse(t)); } catch (e) { resolve(null); } }); req.on('error', () => resolve(null)); });

  async function api(req, res, parts, query) {
    const M = req.method;
    const body = M === 'POST' || M === 'PATCH' ? await readBody(req) : null;
    let r = null;
    if (parts[1] === 'classes') {
      const [, , id, sub, subId] = parts;
      if (!id) r = M === 'GET' ? await S.listClasses(db, me()) : M === 'POST' ? await S.createClass(db, me(), body, newCode) : null;
      else if (!sub) r = M === 'GET' ? await S.getClass(db, me(), id) : M === 'PATCH' ? await S.updateClass(db, me(), id, body, newCode, now()) : M === 'DELETE' ? await S.deleteClass(db, me(), id) : null;
      else if (sub === 'seats' && !subId) r = M === 'POST' ? await S.addSeats(db, me(), id, body, now()) : null;
      else if (sub === 'seats') r = M === 'PATCH' ? await S.updateSeat(db, me(), id, subId, body) : M === 'DELETE' ? await S.deleteSeat(db, me(), id, subId, query.get('results') === '1') : null;
      else if (sub === 'assignments' && !subId) r = M === 'POST' ? await S.addAssignment(db, me(), id, body, now()) : null;
      else if (sub === 'assignments') r = M === 'PATCH' ? await S.updateAssignment(db, me(), id, subId, body, now()) : M === 'DELETE' ? await S.deleteAssignment(db, me(), id, subId) : null;
      else if (sub === 'results') r = M === 'GET' ? await S.classResults(db, me(), id) : null;
      else if (sub === 'skills') r = M === 'GET' ? await S.classSkills(db, me(), id, query.get('curriculum'), B.pickSkillIndex) : null;
    } else if (parts[1] === 'class') {
      if (parts[2] === 'start') r = M === 'POST' ? await S.startAttempt(db, body, newToken, now()) : null;
      else if (parts[2] === 'report') r = M === 'POST' ? await S.report(db, body, newToken, now()) : null;
      else if (parts[3] === 'seat') r = M === 'GET' ? await S.seatPage(db, parts[2], parts[4], now()) : null;
      else if (parts.length === 3) r = M === 'GET' ? await S.classPage(db, parts[2]) : null;
    }
    if (!r) return send(res, 405, { error: 'method_not_allowed' });
    send(res, r.status, r.body, { 'x-robots-tag': 'noindex' });
  }

  /** a published deck page from the live site, with the local scripts swapped in (and the analytics script removed) */
  async function deck(res, pathname) {
    if (!deckCache.has(pathname)) {
      const r = await fetch(LIVE + pathname, { headers: QA });
      if (!r.ok) return send(res, r.status, 'the live site answered ' + r.status + ' for ' + pathname, { 'content-type': 'text/plain' });
      let html = await r.text();
      html = html.replace(/<script[^>]*lcs-insights\.js[^>]*><\/script>/g, '').replace(/https:\/\/www\.lessoncraftstudio\.com\/worksheet-generators\/js\/lcs-meter\.js(\?v=\d+)?/g, '/worksheet-generators/js/lcs-meter.js');
      deckCache.set(pathname, html);
    }
    send(res, 200, deckCache.get(pathname), { 'content-type': 'text/html; charset=utf-8' });
  }

  const TEACHER_HOST = (lang) => '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Classes (local preview)</title>'
    + '<style>@font-face{font-family:"Baloo 2";font-weight:700;src:url(/makers-assets/fonts/baloo2-700-latin.woff2) format("woff2")}@font-face{font-family:"Nunito";font-weight:400;src:url(/makers-assets/fonts/nunito-400-latin.woff2) format("woff2")}@font-face{font-family:"Nunito";font-weight:700;src:url(/makers-assets/fonts/nunito-700-latin.woff2) format("woff2")}'
    + ':root{--font-baloo2:"Baloo 2";--font-nunito:"Nunito"}body{margin:0;background:#DDD4C2;font-family:"Nunito",system-ui,sans-serif}#host{max-width:1152px;margin:0 auto;padding:32px 16px 48px}</style></head>'
    + '<body><div id="host" data-workspace-root=""><div id="lcs-classes-root"></div></div><script src="/__class/teacher-app.js"></script><script>'
    + 'fetch("/__class/strings?lang=' + lang + '").then(function(r){return r.json()}).then(function(s){window.__classes=LCSClasses.mountClasses(document.getElementById("lcs-classes-root"),{locale:"' + lang + '",strings:s,origin:location.origin,signedIn:' + (state.who !== 'anon') + ',usable:' + (state.who === 'sub') + ',pricingUrl:"/' + lang + '/pricing",signInUrl:"/' + lang + '/auth/signin",qrUrl:function(u){return "/api/qr?u="+encodeURIComponent(u.replace(location.origin,"https://www.lessoncraftstudio.com"))}})});'
    + '</script></body></html>';

  /** the activity page as the site builds it, reduced to what class mode touches: the site's header and footer, the frame in its wrapper, the class mode */
  const plain = (t) => String(t).replace(/[<>&"]/g, '');
  const ACTIVITY_HOST = (loc, a) => '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>' + plain(a.title) + ' (local preview)</title>'
    + '<style>body{margin:0;background:#FBF3E4;font-family:system-ui,sans-serif}header,footer{padding:16px;background:#146B5E}header a,footer a{color:#fff}.lcs-prototype-iframe-wrapper{max-width:760px;margin:16px auto}.lcs-prototype-iframe-wrapper iframe{display:block;width:100%;border:0;min-height:320px}</style></head>'
    + '<body><header><a id="site-home" href="/' + loc + '">LessonCraftStudio</a></header>'
    + '<div class="lcs-prototype-iframe-wrapper"><iframe id="act" title="' + plain(a.title) + '" scrolling="no" style="height:420px" src="/mini-tools/' + a.tool + '.html?activity=' + encodeURIComponent(a.id) + '&lang=' + loc + '&embed=1"></iframe><div id="lcs-class-mode-host"></div></div>'
    + '<footer><a id="site-foot" href="/' + loc + '/worksheets">Worksheets</a></footer>'
    + '<script>addEventListener("message",function(e){var d=e.data;if(d&&d.type==="lcs-activity-resize"&&d.height>0)document.getElementById("act").style.height=Math.max(320,Math.ceil(d.height))+"px"});</script>'
    + '<script src="/__class/activity-mode.js"></script></body></html>';
  const MINI = path.join(REPO, 'mini tools');
  const MINI_MIME = { '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg' };

  async function handler(req, res) {
    try {
      const [rawPath, rawQuery] = req.url.split('?');
      const query = new URLSearchParams(rawQuery || '');
      const pathname = decodeURIComponent(rawPath);
      const parts = pathname.split('/').filter(Boolean);
      if (parts[0] === '__class') {
        if (parts[1] === 'as') { const w = query.get('who'); if (['sub', 'free', 'anon'].includes(w)) state.who = w; if (query.has('names')) state.names = query.get('names') !== '0'; if (state.who === 'sub') usable.add(TEACHER); else usable.delete(TEACHER); return send(res, 200, { who: state.who }); }
        if (parts[1] === 'clock') { state.skew += (Number(query.get('hours')) || 0) * 3600 * 1000; return send(res, 200, { now: now().toISOString() }); }
        if (parts[1] === 'state') return send(res, 200, { who: state.who, now: now().toISOString(), classes: [...db.classes.values()], seats: [...db.seats.values()], assignments: [...db.assignments.values()], attempts: [...db.attempts.values()] });
        if (parts[1] === 'teacher-app.js') { const f = path.join(OUT, 'teacher-app.js'); return fs.existsSync(f) ? send(res, 200, fs.readFileSync(f, 'utf8'), { 'content-type': 'text/javascript; charset=utf-8' }) : send(res, 404, 'not built', { 'content-type': 'text/plain' }); }
        if (parts[1] === 'activity-mode.js') return send(res, 200, fs.readFileSync(path.join(OUT, 'activity-mode.js'), 'utf8'), { 'content-type': 'text/javascript; charset=utf-8' });
        if (parts[1] === 'strings') { const l = LOCALES.includes(query.get('lang')) ? query.get('lang') : 'en'; const f = path.join(REPO, 'frontend', 'messages', 'classes', l + '.json'); return fs.existsSync(f) ? send(res, 200, fs.readFileSync(f, 'utf8')) : send(res, 404, {}); }
        return send(res, 404, { error: 'not_found' });
      }
      if (parts[0] === 'teacher') return send(res, 200, TEACHER_HOST(LOCALES.includes(query.get('lang')) ? query.get('lang') : 'en'), { 'content-type': 'text/html; charset=utf-8' });
      if (parts[0] === 'c' && parts.length === 2) return S.CODE_RE.test(parts[1]) ? send(res, 200, B.childPageHtml(), B.CHILD_PAGE_HEADERS) : send(res, 404, 'not found', B.CHILD_PAGE_HEADERS);
      if (parts[0] === 'api' && (parts[1] === 'classes' || parts[1] === 'class')) return api(req, res, parts, query);
      if (pathname === '/worksheet-generators/js/lcs-class.js') return send(res, 200, fs.readFileSync(path.join(WEB, 'lcs-class.js'), 'utf8'), { 'content-type': 'text/javascript; charset=utf-8' });
      if (pathname === '/worksheet-generators/js/lcs-meter.js') return send(res, 200, fs.readFileSync(path.join(WEB, 'lcs-meter.js'), 'utf8').replace("var HOST = 'https://www.lessoncraftstudio.com';", "var HOST = '';"), { 'content-type': 'text/javascript; charset=utf-8' });
      if (pathname.startsWith('/image-library-webp/')) {
        const f = path.join(REPO, pathname);
        if (f.startsWith(path.join(REPO, 'image-library-webp')) && fs.existsSync(f) && fs.statSync(f).isFile()) { res.writeHead(200, { 'content-type': 'image/webp', 'cache-control': 'max-age=3600' }); return fs.createReadStream(f).pipe(res); }
        return send(res, 404, 'not found', { 'content-type': 'text/plain' });
      }
      if (LOCALES.includes(parts[0]) && parts[1] === 'decks' && parts.length === 3) return deck(res, '/' + parts[0] + '/decks/' + parts[2] + '/');
      if (LOCALES.includes(parts[0]) && parts[1] === 'activities' && parts.length === 3) {
        const a = ACTIVITIES[parts[0] + '/' + parts[2]];
        return a ? send(res, 200, ACTIVITY_HOST(parts[0], a), { 'content-type': 'text/html; charset=utf-8' }) : send(res, 404, 'not found', { 'content-type': 'text/plain' });
      }
      if (parts[0] === 'mini-tools' && parts.length >= 2) {
        const f = path.join(MINI, parts.slice(1).join('/'));
        if (f.startsWith(MINI + path.sep) && fs.existsSync(f) && fs.statSync(f).isFile()) { res.writeHead(200, { 'content-type': MINI_MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); return fs.createReadStream(f).pipe(res); }
        return send(res, 404, 'not found', { 'content-type': 'text/plain' });
      }
      return makers.handler(req, res);
    } catch (e) { console.error(e); try { send(res, 500, { error: 'server_error' }); } catch (e2) { /* sent */ } }
  }

  async function seedData() {
    const sub = { userId: TEACHER, usable: true, names: true };
    const made = await S.createClass(db, sub, { name: 'Class 1B', namesMode: 'names', locale: 'en', names: 'Max\nAna María\nTom\nLena\nOmar\nYuki\nSofia\nBen' }, newCode);
    const id = made.body.id, code = made.body.code;
    const add = async (link) => (await S.addAssignment(db, sub, id, { link }, now())).body.id;
    const set = await add(LIVE + '/en/worksheets/sets/g1116');
    const time = await add(LIVE + '/en/decks/telling-time-easy-g1148-2/');
    const maze = await add(LIVE + '/en/decks/maze-puzzles-easy-g1420-2/');
    const seats = (await S.getClass(db, sub, id)).body.seats;
    const play = async (seat, assignment, marks, backHours) => {
      const save = state.skew; state.skew = save - backHours * 3600 * 1000;
      const st = await S.startAttempt(db, { code, seatId: seat.id, assignmentId: assignment }, newToken, now());
      if (st.body.url) await S.report(db, Object.assign({ token: st.body.url.split('#lcs=')[1] }, marks), newToken, now());
      state.skew = save;
    };
    // Max: passed the core page, struggled on the hard one (the strategy note's own example); Ana: mastered; Tom: needed the easier page
    await play(seats[0], set, { right: 5, total: 5 }, 50); await play(seats[0], set, { right: 2, total: 6 }, 49);
    await play(seats[1], set, { right: 6, total: 6 }, 50); await play(seats[1], set, { right: 5, total: 5 }, 49);
    await play(seats[2], set, { right: 2, total: 6 }, 50); await play(seats[2], set, { right: 5, total: 6 }, 49);
    await play(seats[3], set, { right: 4, total: 6 }, 30);
    await play(seats[0], time, { right: 4, total: 6 }, 28); await play(seats[1], time, { right: 6, total: 6 }, 28); await play(seats[3], time, { right: 3, total: 6 }, 27); await play(seats[4], time, { right: 5, total: 6 }, 27);
    await play(seats[0], maze, { finished: true }, 26); await play(seats[2], maze, { finished: false }, 26);
    return { id, code, set, time, maze };
  }

  return new Promise((resolve) => {
    const srv = http.createServer(handler);
    srv.listen(port, async () => {
      const base = 'http://localhost:' + srv.address().port;
      const seeded = seed ? await seedData() : null;
      resolve({ base, srv, db, state, store: S, pick: B.pickSkillIndex, seeded, seedData, teacher: TEACHER, close: () => new Promise((r) => srv.close(r)) });
    });
  });
}

if (require.main === module) {
  const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
  start({ port: Number(arg('port')) || 8495, seed: process.argv.includes('--seed') }).then((s) => {
    console.log('class preview: ' + s.base + '/teacher');
    if (s.seeded) console.log('seeded class link: ' + s.base + '/c/' + s.seeded.code);
  });
}
module.exports = { start, DECKS, LADDERS };
