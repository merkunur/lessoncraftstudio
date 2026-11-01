/**
 * The REAL store rules (frontend/lib/makers/store.ts — what the website's /api/makers/* routes run) served locally,
 * over an in-memory database, through the same `handle(req, res, url, query, who)` signature as
 * scripts/makers/local-store.js — so the maker screen's gates (saves-shell.js, play-shell.js) can be driven against
 * the website's logic without Next or Postgres:
 *
 *   node scripts/makers/tests/run-gate-with-real-store.js saves-shell
 *
 * store.ts is bundled with esbuild on load (out/makers/_tests/store.bundle.js; out/ is gitignored). The database
 * persists in the local stand-in's file and shape (out/makers/_local/store.json: `recipes` by id, `links` by linkId),
 * which the gates read directly to check what was saved. Differences from the website, by construction and on purpose:
 *   - every signed-in caller is the one local teacher (as in local-store.js; there are no accounts locally)
 *   - the subscription oracle: `teacherUsable` = the link was minted by a subscriber (`minter`), because there is no
 *     subscription to read — the website reads isSubscriptionUsable(teacher) at request time (db.ts)
 *   - recipe ids are 'r' + 15 chars (the website uses cuids); presets come from out/makers/_local/decks/<deckId>.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const REPO = path.join(__dirname, '..', '..', '..');
const local = require('../local-store.js');
const { FILE, DECKS, MAX_RECIPE_BYTES } = local;

function bundleStore() {
  const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
  const out = path.join(REPO, 'out', 'makers', '_tests', 'store.bundle.js');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  esbuild.buildSync({ entryPoints: [path.join(REPO, 'frontend', 'lib', 'makers', 'store.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error' });
  return require(out);
}
const store = bundleStore();

const TEACHER = 'local-teacher';
const LINK_ALPHABET = store.LINK_ALPHABET;
const newId = (n) => { const b = crypto.randomBytes(n); let s = ''; for (let i = 0; i < n; i++) s += LINK_ALPHABET[b[i] % LINK_ALPHABET.length]; return s; };

function load() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) { return { recipes: {}, links: {} }; } }
function save(db) { fs.mkdirSync(path.dirname(FILE), { recursive: true }); fs.writeFileSync(FILE + '.tmp', JSON.stringify(db, null, 1)); fs.renameSync(FILE + '.tmp', FILE); }
const row = (r) => (r ? { id: r.id, teacherId: r.teacher, maker: r.maker, lang: r.lang, title: r.title, template: r.template, recipe: r.recipe, rev: r.rev, deletedAt: r.deletedAt || null, updatedAt: r.updatedAt } : null);

/** store.ts MakerDb over the local file */
const memDb = {
  async listMine(teacherId) {
    return Object.values(load().recipes).filter((r) => r.teacher === teacherId && !r.deletedAt).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .map((r) => ({ id: r.id, title: r.title, maker: r.maker, lang: r.lang, template: r.template, updatedAt: r.updatedAt }));
  },
  async getRecipe(id) { return row(load().recipes[id]); },
  async countMine(teacherId) { return Object.values(load().recipes).filter((r) => r.teacher === teacherId && !r.deletedAt).length; },
  async createRecipe(teacherId, meta) {
    const db = load(); const now = new Date().toISOString(); const id = 'r' + newId(15);
    db.recipes[id] = { id, teacher: teacherId, title: meta.title, maker: meta.maker, lang: meta.lang, template: meta.template, recipe: meta.recipe, rev: 1, createdAt: now, updatedAt: now };
    save(db); return { id, rev: 1 };
  },
  async updateRecipe(id, expectedRev, meta) {
    const db = load(); const r = db.recipes[id];
    if (!r || r.deletedAt || r.rev !== expectedRev) return null;
    Object.assign(r, { title: meta.title, maker: meta.maker, lang: meta.lang, template: meta.template, recipe: meta.recipe, rev: r.rev + 1, updatedAt: new Date().toISOString() });
    save(db); return { rev: r.rev };
  },
  async deleteRecipe(id) { const db = load(); if (db.recipes[id]) { db.recipes[id].deletedAt = new Date().toISOString(); save(db); } },
  async findLink(recipeId, kind) {
    const e = Object.entries(load().links).find(([, l]) => l.recipeId === recipeId && l.kind === kind && !l.revokedAt);
    return e ? { linkId: e[0], recipeId: e[1].recipeId, teacherId: TEACHER, kind: e[1].kind, revokedAt: null } : null;
  },
  async createLink(link) {
    const db = load();
    db.links[link.linkId] = { recipeId: link.recipeId, kind: link.kind, minter: memDb._minter || 'free', createdAt: new Date().toISOString() };
    save(db);
  },
  async getLink(linkId) {
    const db = load(); const l = db.links[linkId]; const r = l && db.recipes[l.recipeId];
    if (!l || !r) return null;
    return { link: { linkId, recipeId: l.recipeId, teacherId: r.teacher, kind: l.kind, revokedAt: l.revokedAt || null }, recipe: row(r), teacherUsable: l.minter === 'sub' };
  },
  async revokeLink(linkId) { const db = load(); if (db.links[linkId]) { db.links[linkId].revokedAt = new Date().toISOString(); save(db); } },
  _minter: null,
};

/** the public link record, as local-store.readLink returns it (the preview server's /s/<id> reads it) */
function readLink(id) {
  let out = null;
  // linkRecord is async over an in-memory file: resolve it synchronously through the file for the sync callers
  const db = load(); const l = db.links[id]; const r = l && !l.revokedAt && db.recipes[l.recipeId];
  if (!r || r.deletedAt) return null;
  out = { linkId: id, recipe: r.recipe, kind: l.kind, meter: l.minter !== 'sub', title: r.title, maker: r.maker, lang: r.lang };
  return out;
}

function handle(req, res, url, query, who) {
  if (!url.startsWith('/api/makers/')) return false;
  const me = typeof who === 'boolean' ? (who ? 'sub' : 'anon') : (who || 'anon');
  const send = (status, body, cache) => { res.writeHead(status, { 'content-type': 'application/json', 'cache-control': cache === 'public' ? 'public, max-age=0, s-maxage=300' : 'no-store' }); res.end(JSON.stringify(body)); };
  const body = () => new Promise((resolve) => { let b = ''; req.on('data', (c) => { b += c; }); req.on('end', () => { try { resolve(JSON.parse(b || '{}')); } catch (e) { resolve(null); } }); });
  const parts = url.split('/').filter(Boolean);
  if (parts[2] === 'preset' && req.method === 'GET' && parts[3]) { const p = local.readPreset(parts[3]); return (p ? send(200, p) : send(404, { error: 'not_found' })), true; }
  (async () => {
    const b = req.method === 'POST' || req.method === 'PUT' ? await body() : undefined;
    memDb._minter = me;
    const r = await store.dispatch(memDb, { method: req.method, path: url, body: b, me: me === 'anon' ? null : { userId: TEACHER }, newLinkId: () => newId(12) });
    if (!r) return send(404, { error: 'no_route' });
    send(r.status, r.body, r.cache);
  })().catch((e) => send(500, { error: 'store_error', message: e.message }));
  return true;
}

module.exports = { handle, readLink, readPreset: local.readPreset, FILE, DECKS, MAX_RECIPE_BYTES, memDb, store };
