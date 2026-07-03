#!/usr/bin/env node
/* =====================================================================
   studio-server.js — the Storybook Studio's local server.

   LOCAL-ONLY operator tool (127.0.0.1; no auth — the preview-server /
   qa-harness precedent). Serves the Studio page, the real player, the
   image library and audio, and adds the Studio API: story load/save
   (etag-guarded, timestamped .bak per write), library/scene/cast/SEP
   enumeration, scaffolding, and spawning the REAL validator.

   USAGE:  node scripts/storybook/studio-server.js  [--port 5055]
           → http://127.0.0.1:5055/mini-tools/storybook-studio.html
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { execFile, exec } = require('child_process');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');
const STORIES = path.join(MINI, 'stories');
const LIB = path.join(REPO, 'image-library-webp', 'themes');
const arg = (k, d) => {
  const eq = process.argv.find(a => a.startsWith('--' + k + '='));
  if (eq) return eq.split('=').slice(1).join('=');
  const i = process.argv.indexOf('--' + k);
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  return d;
};
const PORT = Number(arg('port', process.env.LCS_STUDIO_PORT || 5055));

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2'
};

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
function safeId(id) { return /^[a-z0-9-]+$/.test(String(id || '')); }

function storyEtag(id) {
  const h = crypto.createHash('sha1');
  for (const f of ['story.json', 'strings.json']) {
    const p = path.join(STORIES, id, f);
    if (fs.existsSync(p)) h.update(fs.readFileSync(p));
  }
  return h.digest('hex').slice(0, 16);
}

function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', c => { buf += c; if (buf.length > 20 * 1024 * 1024) reject(new Error('too large')); });
    req.on('end', () => resolve(buf));
    req.on('error', reject);
  });
}
/* raw BINARY body (for the worksheet-import ZIP — readBody's string concat corrupts bytes) */
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []; let n = 0;
    req.on('data', c => { n += c.length; if (n > 40 * 1024 * 1024) return reject(new Error('too large')); chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

/* B&W theme filter: EN marker per CLAUDE.md §20.5 (locale-aware markers exist,
   but the on-disk folder names use the EN convention 'bw' / 'BW' suffixes). */
function isBWTheme(name) {
  return /\bbw(\s*\d+)?$/i.test(name.trim());
}

let _libCache = null;
function libraryIndex(refresh) {
  if (_libCache && !refresh) return _libCache;
  const themes = [];
  for (const t of fs.readdirSync(LIB)) {
    const dir = path.join(LIB, t);
    if (!fs.statSync(dir).isDirectory()) continue;
    if (isBWTheme(t)) continue;
    if (/^(BACKGROUNDS|BORDERS)$/i.test(t)) continue;
    const files = fs.readdirSync(dir).filter(f => /@2x\.webp$/i.test(f));
    if (!files.length) continue;
    themes.push({
      theme: t,
      count: files.length,
      nouns: files.map(f => f.replace(/@2x\.webp$/i, '')).sort()
    });
  }
  themes.sort((a, b) => a.theme.localeCompare(b.theme));
  _libCache = { themes };
  return _libCache;
}

function listStories() {
  if (!fs.existsSync(STORIES)) return [];
  const out = [];
  for (const id of fs.readdirSync(STORIES)) {
    const sp = path.join(STORIES, id, 'story.json');
    if (!fs.existsSync(sp)) continue;
    try {
      const s = JSON.parse(fs.readFileSync(sp, 'utf8'));
      const strings = JSON.parse(fs.readFileSync(path.join(STORIES, id, 'strings.json'), 'utf8'));
      const titleKey = String(s.title || '').replace(/^@/, '');
      out.push({
        id: s.id || id,
        title: (strings[titleKey] && strings[titleKey].en) || id,
        pages: (s.pages || []).length,
        firstScene: s.pages && s.pages[0] && s.pages[0].scene && s.pages[0].scene.image
          ? (s.assets[s.pages[0].scene.image] || {}).src || null : null,
        etag: storyEtag(id)
      });
    } catch (e) { out.push({ id, title: id + ' (unreadable)', pages: 0, error: String(e.message) }); }
  }
  return out;
}

function listCast() {
  const cast = [];
  if (!fs.existsSync(STORIES)) return cast;
  for (const sid of fs.readdirSync(STORIES)) {
    const castDir = path.join(STORIES, sid, 'cast');
    if (!fs.existsSync(castDir)) continue;
    for (const ch of fs.readdirSync(castDir)) {
      const baseJson = path.join(castDir, ch, ch + '.base.json');
      if (!fs.existsSync(baseJson)) continue;
      let poses = [];
      try {
        const j = JSON.parse(fs.readFileSync(baseJson, 'utf8'));
        poses = Object.keys(j.frames).filter(n => n.startsWith('pose_')).map(n => n.slice(5));
      } catch (e) {}
      const clips = fs.existsSync(path.join(castDir, ch, ch + '.clips.json'));
      cast.push({
        characterId: ch, fromStory: sid, poses: poses,
        atlasBase: '/mini-tools/stories/' + sid + '/cast/' + ch + '/' + ch + '.base.json',
        atlasClips: clips ? '/mini-tools/stories/' + sid + '/cast/' + ch + '/' + ch + '.clips.json' : null
      });
    }
  }
  return cast;
}

function listScenes(id) {
  const dir = path.join(STORIES, id, 'scenes');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /\.webp$/i.test(f))
    .map(f => ({ file: f, src: '/mini-tools/stories/' + id + '/scenes/' + f }));
}

function listExercises() {
  const out = [];
  if (!fs.existsSync(STORIES)) return out;
  for (const sid of fs.readdirSync(STORIES)) {
    const exDir = path.join(STORIES, sid, 'exercises');
    if (!fs.existsSync(exDir)) continue;
    for (const ex of fs.readdirSync(exDir)) {
      const dPath = path.join(exDir, ex, 'descriptor.json');
      if (!fs.existsSync(dPath)) continue;
      try {
        const d = JSON.parse(fs.readFileSync(dPath, 'utf8'));
        out.push({
          package: 'exercises/' + ex, fromStory: sid, family: d.family,
          appType: d.appType, prompt: (d.locales && d.locales.en && d.locales.en.prompt) || '',
          absolute: '/mini-tools/stories/' + sid + '/exercises/' + ex
        });
      } catch (e) {}
    }
  }
  return out;
}

function saveStory(id, body) {
  const dir = path.join(STORIES, id);
  fs.mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  for (const [file, data] of [['story.json', body.story], ['strings.json', body.strings]]) {
    const p = path.join(dir, file);
    if (fs.existsSync(p)) {
      fs.copyFileSync(p, path.join(dir, file.replace('.json', '.' + stamp + '.bak')));
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
  }
  /* keep only the newest 10 .bak per file */
  const baks = fs.readdirSync(dir).filter(f => /\.bak$/.test(f)).sort();
  while (baks.length > 20) fs.unlinkSync(path.join(dir, baks.shift()));
  return storyEtag(id);
}

function scaffoldStory(body) {
  const id = body.id;
  const dir = path.join(STORIES, id);
  if (fs.existsSync(path.join(dir, 'story.json'))) {
    const e = new Error('exists'); e.code = 409; throw e;
  }
  const cast = body.cast || {
    characterId: 'pip',
    atlasBase: '/mini-tools/stories/pips-picnic/cast/pip/pip.base.json',
    poses: ['neutral', 'talk', 'happy', 'point']
  };
  const story = {
    schemaVersion: 'sb-1',
    id: id,
    title: '@story.title',
    locales: ['en'],
    theme: { letterboxColor: '#FBF3E4', transition: 'crossfade' },
    cast: [{
      id: cast.characterId, name: '@cast.' + cast.characterId + '.name', role: 'guide',
      atlasBase: 'atlas.' + cast.characterId + '.base', poses: cast.poses
    }],
    assets: {},
    reward: { id: 'story.' + id, label: { en: body.title || id }, emoji: '⭐' },
    pages: [{
      id: 'p01',
      scene: { image: 'scene.placeholder' },
      characters: [{ characterId: cast.characterId, pose: cast.poses[0] || 'neutral',
                     anchor: { x: 300, y: 880 }, scale: 1, flip: false }],
      narration: { gate: 'end', cues: [] },
      interaction: null,
      success: { celebration: 'burst', holdMs: 1000 }
    }]
  };
  story.assets['atlas.' + cast.characterId + '.base'] = { kind: 'atlas', src: cast.atlasBase };
  story.assets['scene.placeholder'] = {
    kind: 'image',
    src: '/mini-tools/stories/pips-picnic/scenes/page-01.webp',
    size: { w: 1600, h: 1000 }
  };
  const strings = {};
  strings['story.title'] = { en: body.title || id };
  strings['cast.' + cast.characterId + '.name'] = { en: body.castName || 'Pip' };
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'story.json'), JSON.stringify(story, null, 2) + '\n');
  fs.writeFileSync(path.join(dir, 'strings.json'), JSON.stringify(strings, null, 2) + '\n');
  return { id, etag: storyEtag(id) };
}

function runValidator(id) {
  return new Promise(resolve => {
    execFile(process.execPath, [path.join(__dirname, 'validate-story.js'), id],
      { cwd: REPO, timeout: 60000 }, (err, stdout, stderr) => {
        const lines = String(stdout || '') + String(stderr || '');
        const errors = [], warns = [];
        for (const ln of lines.split('\n')) {
          const m = ln.match(/^\s+(ERROR|WARN)\s+(.*)$/);
          if (!m) continue;
          (m[1] === 'ERROR' ? errors : warns).push(m[2].trim());
        }
        resolve({ ok: errors.length === 0, errors, warns, raw: lines.slice(-4000) });
      });
  });
}

/* ------------------------------------------------------------------ */
/* server                                                              */
/* ------------------------------------------------------------------ */
const srv = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://127.0.0.1');
    const p = decodeURIComponent(u.pathname);

    /* ---------- Studio API ---------- */
    if (p === '/studio/ping') return json(res, 200, { ok: true, studio: true });
    if (p === '/studio/stories') return json(res, 200, { stories: listStories() });
    if (p === '/studio/library') return json(res, 200, libraryIndex(u.searchParams.get('refresh') === '1'));
    if (p === '/studio/cast') return json(res, 200, { cast: listCast() });
    if (p === '/studio/exercises') return json(res, 200, { exercises: listExercises() });

    let m;
    if ((m = p.match(/^\/studio\/story\/([a-z0-9-]+)$/))) {
      const id = m[1];
      if (req.method === 'GET') {
        const sp = path.join(STORIES, id, 'story.json');
        if (!fs.existsSync(sp)) return json(res, 404, { error: 'not found' });
        return json(res, 200, {
          story: JSON.parse(fs.readFileSync(sp, 'utf8')),
          strings: JSON.parse(fs.readFileSync(path.join(STORIES, id, 'strings.json'), 'utf8')),
          etag: storyEtag(id)
        });
      }
      if (req.method === 'POST') {
        const body = JSON.parse(await readBody(req));
        if (!body.story || !body.strings) return json(res, 400, { error: 'story + strings required' });
        const current = fs.existsSync(path.join(STORIES, id, 'story.json')) ? storyEtag(id) : null;
        if (current && body.baseEtag && body.baseEtag !== current) {
          return json(res, 409, { error: 'conflict', etag: current });
        }
        const etag = saveStory(id, body);
        return json(res, 200, { ok: true, etag });
      }
    }
    if ((m = p.match(/^\/studio\/scenes\/([a-z0-9-]+)$/))) {
      return json(res, 200, { scenes: listScenes(m[1]) });
    }
    if ((m = p.match(/^\/studio\/audio\/([a-z0-9-]+)$/))) {
      /* which narration mp3s exist: { "<locale>/<lineId>": true } */
      const dir = path.join(STORIES, m[1], 'audio');
      const have = {};
      if (fs.existsSync(dir)) {
        for (const loc of fs.readdirSync(dir)) {
          const ld = path.join(dir, loc);
          if (!fs.statSync(ld).isDirectory()) continue;
          for (const f of fs.readdirSync(ld)) {
            if (f.endsWith('.mp3')) have[loc + '/' + f.replace(/\.mp3$/, '')] = true;
          }
        }
      }
      return json(res, 200, { have });
    }
    if ((m = p.match(/^\/studio\/validate\/([a-z0-9-]+)$/)) && req.method === 'POST') {
      return json(res, 200, await runValidator(m[1]));
    }
    if (p === '/studio/scaffold' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      if (!safeId(body.id)) return json(res, 400, { error: 'id must be lowercase letters, numbers, dashes' });
      try { return json(res, 200, scaffoldStory(body)); }
      catch (e) { return json(res, e.code === 409 ? 409 : 500, { error: e.code === 409 ? 'That name is taken' : String(e.message) }); }
    }
    if ((m = p.match(/^\/studio\/reveal\/([a-z0-9-]+)$/)) && req.method === 'POST') {
      const dir = path.join(STORIES, m[1], 'scenes');   /* the scenes/ subfolder, where the message says to drop files */
      try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {}
      if (fs.existsSync(dir)) {
        if (process.platform === 'win32') exec('explorer "' + dir + '"');
        else if (process.platform === 'darwin') exec('open "' + dir + '"');
        else exec('xdg-open "' + dir + '"');
      }
      return json(res, 200, { ok: true, dir });
    }
    /* import an SEP worksheet export (ZIP: descriptor.json + visual@2x.webp [+ assets/]) into a story */
    if ((m = p.match(/^\/studio\/import-exercise\/([a-z0-9-]+)$/)) && req.method === 'POST') {
      const storyId = m[1];
      const storyDir = path.join(STORIES, storyId);
      if (!fs.existsSync(storyDir)) return json(res, 404, { error: 'story not found' });
      let AdmZip; try { AdmZip = require('adm-zip'); } catch (e) { return json(res, 500, { error: 'adm-zip not available on the server' }); }
      const buf = await readRawBody(req);
      let zip; try { zip = new AdmZip(buf); } catch (e) { return json(res, 400, { error: 'that file is not a valid .zip' }); }
      const dEntry = zip.getEntry('descriptor.json');
      if (!dEntry) return json(res, 400, { error: 'the zip has no descriptor.json — is it a "Export for Storybook" file?' });
      let desc; try { desc = JSON.parse(zip.readAsText(dEntry)); } catch (e) { return json(res, 400, { error: 'descriptor.json is not valid JSON' }); }
      if (desc.formatVersion !== 'sep-1') return json(res, 400, { error: 'not a sep-1 worksheet export (formatVersion=' + desc.formatVersion + ')' });
      const appType = String(desc.appType || 'worksheet').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      const exId = appType + '-' + crypto.createHash('sha1').update(buf).digest('hex').slice(0, 6);
      const outDir = path.join(storyDir, 'exercises', exId);
      fs.mkdirSync(outDir, { recursive: true });
      zip.getEntries().forEach(e => {
        if (e.isDirectory) return;
        const safe = e.entryName.replace(/\\/g, '/').split('/').filter(s => s && s !== '..').join('/');   /* path-traversal guard */
        if (!safe) return;
        const dest = path.join(outDir, safe);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, e.getData());
      });
      return json(res, 200, { ok: true, exId, package: 'exercises/' + exId });
    }
    /* upload a picture from the operator's computer into a story's uploads/ folder */
    if ((m = p.match(/^\/studio\/import-image\/([a-z0-9-]+)$/)) && req.method === 'POST') {
      const storyId = m[1];
      const storyDir = path.join(STORIES, storyId);
      if (!fs.existsSync(storyDir)) return json(res, 404, { error: 'story not found' });
      const buf = await readRawBody(req);
      if (!buf || !buf.length) return json(res, 400, { error: 'empty upload' });
      /* sniff the image type by magic bytes */
      let ext = null;
      if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) ext = 'png';
      else if (buf.length > 3 && buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) ext = 'jpg';
      else if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') ext = 'webp';
      else if (buf.length > 6 && buf.toString('ascii', 0, 3) === 'GIF') ext = 'gif';
      if (!ext) return json(res, 400, { error: 'that file is not a PNG, JPG, WEBP, or GIF image' });
      const name = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 12) + '.' + ext;
      const upDir = path.join(storyDir, 'uploads');
      fs.mkdirSync(upDir, { recursive: true });
      fs.writeFileSync(path.join(upDir, name), buf);
      return json(res, 200, { ok: true, src: '/mini-tools/stories/' + storyId + '/uploads/' + name });
    }
    /* upload a CHARACTER from the operator's computer: an image → a single-frame atlas
       (pose_neutral = the whole image) that renders through the existing atlas pipeline */
    if ((m = p.match(/^\/studio\/import-character\/([a-z0-9-]+)$/)) && req.method === 'POST') {
      const storyId = m[1];
      const storyDir = path.join(STORIES, storyId);
      if (!fs.existsSync(storyDir)) return json(res, 404, { error: 'story not found' });
      const buf = await readRawBody(req);
      if (!buf || !buf.length) return json(res, 400, { error: 'empty upload' });
      let ext = null;
      if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) ext = 'png';
      else if (buf.length > 3 && buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) ext = 'jpg';
      else if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') ext = 'webp';
      else if (buf.length > 6 && buf.toString('ascii', 0, 3) === 'GIF') ext = 'gif';
      if (!ext) return json(res, 400, { error: 'that file is not a PNG, JPG, WEBP, or GIF image' });
      let W = 0, H = 0;
      try { const meta = await require('sharp')(buf).metadata(); W = meta.width || 0; H = meta.height || 0; }
      catch (e) { return json(res, 500, { error: 'could not read the image (' + e.message + ')' }); }
      if (!W || !H) return json(res, 400, { error: 'could not read the image dimensions' });
      let slug = String(u.searchParams.get('name') || '').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'character';
      if (fs.existsSync(path.join(storyDir, 'cast', slug))) slug = slug + '-' + crypto.createHash('sha1').update(buf).digest('hex').slice(0, 4);
      const dir = path.join(storyDir, 'cast', slug);
      fs.mkdirSync(dir, { recursive: true });
      const imgName = slug + '.base.' + ext;
      fs.writeFileSync(path.join(dir, imgName), buf);
      const atlas = { frames: { pose_neutral: { frame: { x: 0, y: 0, w: W, h: H }, rotated: false, trimmed: false, spriteSourceSize: { x: 0, y: 0, w: W, h: H }, sourceSize: { w: W, h: H } } }, meta: { app: 'lcs-upload', version: '1.0', image: imgName, format: 'RGBA8888', size: { w: W, h: H }, scale: '1' } };
      fs.writeFileSync(path.join(dir, slug + '.base.json'), JSON.stringify(atlas));
      return json(res, 200, { ok: true, characterId: slug, atlasBase: '/mini-tools/stories/' + storyId + '/cast/' + slug + '/' + slug + '.base.json', poses: ['neutral'] });
    }

    /* ---------- static mounts ---------- */
    let file = null;
    if (p === '/' ) { res.writeHead(302, { Location: '/mini-tools/storybook-studio.html' }); return res.end(); }
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.replace('/mini-tools/', ''));
    else if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p.replace(/^\//, ''));
    else if (p.startsWith('/audio/')) file = path.join(REPO, 'frontend', 'public', p.replace(/^\//, ''));
    else if (p.startsWith('/worksheet-generators/')) file = path.join(REPO, 'frontend', 'public', p.replace(/^\//, ''));
    if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      return fs.createReadStream(file).pipe(res);
    }
    res.writeHead(404); res.end('404 ' + p);
  } catch (e) {
    json(res, 500, { error: String(e.message) });
  }
});

if (require.main === module) {
  srv.listen(PORT, '127.0.0.1', () => {
    console.log('[studio] Storybook Studio → http://127.0.0.1:' + PORT + '/mini-tools/storybook-studio.html');
  });
}
module.exports = { srv, libraryIndex, listStories, listCast, scaffoldStory };
