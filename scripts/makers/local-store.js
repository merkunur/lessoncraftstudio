/**
 * The saved-worksheet store, LOCAL stand-in (ARCHITECTURE §8). The same routes, rules and answers as the website's
 * future `/api/makers/*` (Prisma tables MakerRecipe + MakerShareLink, §8.1), so the maker screen is built and tested
 * against the real contract; at release the website routes replace this file (operator 2026-10-31: no maker reaches
 * the website before all 60 are finished — and website code would ship with any unrelated deploy).
 *
 *   POST   /api/makers/recipes            { recipe }        → 201 { id, rev }       sign-in required
 *   GET    /api/makers/recipes?mine                         → { items: [{ id, title, maker, lang, template, updatedAt }] }
 *   GET    /api/makers/recipes/<id>                         → { id, rev, recipe }    the owner only
 *   PUT    /api/makers/recipes/<id>       { recipe, rev }   → { rev } · 409 { rev } when it changed elsewhere
 *   DELETE /api/makers/recipes/<id>                         → { ok }                 (kept, marked deleted)
 *   POST   /api/makers/links              { recipeId, kind }→ { linkId }            one link per recipe and kind
 *                                          kind: 'colleague' (opens the maker read-only) | 'student' (opens /s/<linkId>)
 *   GET    /api/makers/links/<linkId>                       → { recipe, kind, meter }  public: the link is the key
 *                                          meter: false when the teacher who minted it is a subscriber (operator ruling
 *                                          2026-11-01 D.4-4: her student links skip the per-device play meter); the
 *                                          website computes it at read time from the teacher's subscription
 *   DELETE /api/makers/links/<linkId>                       → { ok }                 the owner takes a link back (404 from then on)
 *   GET    /api/makers/preset/<deckId>                      → { maker, lang, template, level, theme, unit, variant, deckId, title }
 *                                          public: a published deck's settings for "Make your own" (play/preset.js); the
 *                                          local stand-in reads the deck's manifest from out/makers/_local/decks/<deckId>.json
 *
 * Refusals: 401 not signed in · 404 not found / not yours · 413 recipe over the size cap · 400 malformed.
 * The file lives in out/makers/_local/store.json (never committed; one local teacher, "you").
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { presetFromManifest } = require('./play/preset.js');
const { makerOf } = require('./play/makers-index.js');

const FILE = path.join(__dirname, '..', '..', 'out', 'makers', '_local', 'store.json');
const DECKS = path.join(__dirname, '..', '..', 'out', 'makers', '_local', 'decks');
const MAX_RECIPE_BYTES = 256 * 1024;                     // = shell/recipe.js MAX_RECIPE_BYTES
const LINK_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789'; // = frontend/lib/hosted-worksheets/core.ts generateHostedLinkId
const TEACHER = 'local-teacher';

function load() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) { return { recipes: {}, links: {} }; }
}
function save(db) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE + '.tmp', JSON.stringify(db, null, 1));
  fs.renameSync(FILE + '.tmp', FILE);
}
const newId = (n, alphabet) => { const b = crypto.randomBytes(n); let s = ''; for (let i = 0; i < n; i++) s += alphabet[b[i] % alphabet.length]; return s; };

/** A recipe the store accepts: the shape the screen writes (shell/recipe.js), within the cap. */
function validRecipe(r) {
  if (!r || typeof r !== 'object' || r.v !== 1) return 'recipe version';
  if (typeof r.maker !== 'string' || !/^[a-z0-9-]{2,40}$/.test(r.maker)) return 'maker';
  if (typeof r.lang !== 'string' || !/^[a-z]{2}$/.test(r.lang)) return 'language';
  if (!Array.isArray(r.pages) || r.pages.length < 1 || r.pages.length > 10) return 'pages';
  if (typeof r.title !== 'string' || r.title.length > 200) return 'title';
  return null;
}

/** A public link's record (the play page and the preview server's /s/<id> read it): null when unknown, revoked or deleted. */
function readLink(id) {
  const db = load();
  const link = db.links[id];
  const r = link && !link.revokedAt && db.recipes[link.recipeId];
  if (!r || r.deletedAt) return null;
  // the meter follows the TEACHER (the website reads her subscription at request time); locally, who minted the link
  return { linkId: id, recipe: r.recipe, kind: link.kind, meter: link.minter !== 'sub', title: r.title, maker: r.maker, lang: r.lang };
}

/** A published deck's preset (locally: out/makers/_local/decks/<deckId>.json holds the deck's manifest). */
function readPreset(deckId) {
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(deckId)) return null;
  let m;
  try { m = JSON.parse(fs.readFileSync(path.join(DECKS, deckId + '.json'), 'utf8')); } catch (e) { return null; }
  return presetFromManifest(m, makerOf);
}

/**
 * Handle /api/makers/*; `who` says who the caller is: 'anon' | 'free' | 'sub' (a boolean is accepted as before:
 * true = a signed-in subscriber, false = anonymous). Returns false if not a store route.
 */
function handle(req, res, url, query, who) {
  if (!url.startsWith('/api/makers/')) return false;
  const me = typeof who === 'boolean' ? (who ? 'sub' : 'anon') : (who || 'anon');
  const signedIn = me !== 'anon';
  const send = (status, body) => { res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(body)); };
  const body = () => new Promise((resolve) => { let b = ''; req.on('data', (c) => { b += c; }); req.on('end', () => { try { resolve(JSON.parse(b || '{}')); } catch (e) { resolve(null); } }); });
  const parts = url.split('/').filter(Boolean); // api, makers, recipes|links|preset, id?
  const kind = parts[2], id = parts[3];

  // a shared link is public: the twelve-character id is the key (32^12)
  if (kind === 'links' && req.method === 'GET' && id) {
    const l = readLink(id);
    if (!l) return send(404, { error: 'not_found' }), true;
    return send(200, { recipe: l.recipe, kind: l.kind, meter: l.meter }), true;
  }
  // a deck's preset is public too (the deck is)
  if (kind === 'preset' && req.method === 'GET' && id) {
    const p = readPreset(id);
    return (p ? send(200, p) : send(404, { error: 'not_found' })), true;
  }
  if (!signedIn) return send(401, { error: 'signin_required' }), true;
  if (kind === 'links' && req.method === 'DELETE' && id) {
    const db = load();
    const link = db.links[id];
    const r = link && !link.revokedAt && db.recipes[link.recipeId];
    if (!r || r.teacher !== TEACHER) return send(404, { error: 'not_found' }), true;
    link.revokedAt = new Date().toISOString(); save(db);
    return send(200, { ok: true }), true;
  }

  if (kind === 'recipes') {
    const db = load();
    if (req.method === 'GET' && !id) {
      const items = Object.values(db.recipes).filter((r) => r.teacher === TEACHER && !r.deletedAt).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((r) => ({ id: r.id, title: r.title, maker: r.maker, lang: r.lang, template: r.template, updatedAt: r.updatedAt }));
      return send(200, { items }), true;
    }
    const own = id && db.recipes[id] && db.recipes[id].teacher === TEACHER && !db.recipes[id].deletedAt ? db.recipes[id] : null;
    if (req.method === 'GET') return own ? send(200, { id, rev: own.rev, recipe: own.recipe }) : send(404, { error: 'not_found' }), true;
    if (req.method === 'DELETE') { if (!own) return send(404, { error: 'not_found' }), true; own.deletedAt = new Date().toISOString(); save(db); return send(200, { ok: true }), true; }
    if (req.method === 'POST' || req.method === 'PUT') {
      body().then((b) => {
        if (!b) return send(400, { error: 'bad_json' });
        const bad = validRecipe(b.recipe);
        if (bad) return send(400, { error: 'bad_recipe', field: bad });
        if (Buffer.byteLength(JSON.stringify(b.recipe)) > MAX_RECIPE_BYTES) return send(413, { error: 'too_large' });
        const now = new Date().toISOString();
        const meta = { title: b.recipe.title, maker: b.recipe.maker, lang: b.recipe.lang, template: b.recipe.pages[0].template };
        if (req.method === 'POST') {
          const rid = 'r' + newId(15, LINK_ALPHABET);
          db.recipes[rid] = { id: rid, teacher: TEACHER, ...meta, recipe: b.recipe, rev: 1, createdAt: now, updatedAt: now };
          save(db);
          return send(201, { id: rid, rev: 1 });
        }
        if (!own) return send(404, { error: 'not_found' });
        if (b.rev !== own.rev) return send(409, { error: 'changed_elsewhere', rev: own.rev });
        Object.assign(own, meta, { recipe: b.recipe, rev: own.rev + 1, updatedAt: now });
        save(db);
        return send(200, { rev: own.rev });
      });
      return true;
    }
  }
  if (kind === 'links' && req.method === 'POST') {
    body().then((b) => {
      const db = load();
      const r = b && db.recipes[b.recipeId];
      if (!r || r.teacher !== TEACHER || r.deletedAt) return send(404, { error: 'not_found' });
      if (!['colleague', 'student'].includes(b.kind)) return send(400, { error: 'bad_kind' });
      const have = Object.entries(db.links).find(([, l]) => l.recipeId === r.id && l.kind === b.kind && !l.revokedAt);
      if (have) return send(200, { linkId: have[0] });
      const linkId = newId(12, LINK_ALPHABET);
      db.links[linkId] = { recipeId: r.id, kind: b.kind, minter: me, createdAt: new Date().toISOString() };
      save(db);
      return send(201, { linkId });
    });
    return true;
  }
  return send(404, { error: 'no_route' }), true;
}

module.exports = { handle, readLink, readPreset, FILE, DECKS, MAX_RECIPE_BYTES };
