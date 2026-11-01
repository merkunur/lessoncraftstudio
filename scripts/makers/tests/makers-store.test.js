#!/usr/bin/env node
/**
 * The store contract (frontend/lib/makers/store.ts = the website's /api/makers/* rules), route by route, over an
 * in-memory database — the same sequence scripts/makers/local-store.js answers locally, so the two cannot drift:
 *
 *   node scripts/makers/tests/makers-store.test.js        exit 1 on any failure
 *
 * Every refusal has a twin that passes (poison both ways): 401 vs signed in · 400 per bad field vs a valid recipe ·
 * 413 at the cap+1 vs the cap · 404 another teacher's vs the owner's · 409 a stale rev vs the fresh one · one link per
 * recipe and kind · a revoked / deleted link is 404 · meter follows the TEACHER at read time, not the mint.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');

const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
const out = path.join(REPO, 'out', 'makers', '_tests', 'store.bundle.js');
fs.mkdirSync(path.dirname(out), { recursive: true });
esbuild.buildSync({ entryPoints: [path.join(REPO, 'frontend', 'lib', 'makers', 'store.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error' });
const S = require(out);

/** an in-memory MakerDb with a per-teacher subscription flag (the website reads it from Prisma at request time) */
function memDb() {
  const recipes = new Map(), links = new Map(); let n = 0;
  const usable = new Set(['sub']);
  return {
    usable,
    async listMine(t) { return [...recipes.values()].filter((r) => r.teacherId === t && !r.deletedAt).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((r) => ({ id: r.id, title: r.title, maker: r.maker, lang: r.lang, template: r.template, updatedAt: r.updatedAt })); },
    async getRecipe(id) { return recipes.get(id) || null; },
    async countMine(t) { return [...recipes.values()].filter((r) => r.teacherId === t && !r.deletedAt).length; },
    async createRecipe(t, m) { const id = 'c' + String(++n).padStart(9, '0'); recipes.set(id, { id, teacherId: t, ...m, rev: 1, deletedAt: null, updatedAt: new Date(Date.now() + n).toISOString() }); return { id, rev: 1 }; },
    async updateRecipe(id, rev, m) { const r = recipes.get(id); if (!r || r.deletedAt || r.rev !== rev) return null; Object.assign(r, m, { rev: rev + 1, updatedAt: new Date(Date.now() + ++n).toISOString() }); return { rev: r.rev }; },
    async deleteRecipe(id) { recipes.get(id).deletedAt = new Date().toISOString(); },
    async findLink(rid, kind) { return [...links.values()].find((l) => l.recipeId === rid && l.kind === kind && !l.revokedAt) || null; },
    async createLink(l) { links.set(l.linkId, { ...l }); },
    async getLink(id) { const l = links.get(id); if (!l) return null; const r = recipes.get(l.recipeId); return { link: l, recipe: r, teacherUsable: usable.has(r.teacherId) }; },
    async revokeLink(id) { links.get(id).revokedAt = new Date().toISOString(); },
  };
}

let pass = 0; const fails = [];
const check = (name, ok, extra) => { if (ok) pass++; else fails.push(name + (extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 200))); };
const recipe = (over = {}) => ({ v: 1, maker: 'counting', lang: 'de', title: 'Zählen', makerVersion: 'abc', dataVersion: 'def', paper: 'a4', answerKey: false, pages: [{ template: 'K-002', level: 2, seed: 'r:1', theme: 'farm animals', unit: null }], ...over });
let ids = 0; const nextId = () => 'abcdefghijkm'.slice(0, 11) + 'abcdefghijkmnpqrstuvwxyz23456789'[ids++ % 32];

(async () => {
  const db = memDb();
  const as = (who) => (who === 'anon' ? null : { userId: who });
  const call = (method, p, body, who = 'sub') => S.dispatch(db, { method, path: p, body, me: as(who), newLinkId: nextId });

  // ---- sign-in
  check('POST recipes signed out → 401', (await call('POST', '/api/makers/recipes', { recipe: recipe() }, 'anon')).status === 401);
  check('GET recipes?mine signed out → 401', (await call('GET', '/api/makers/recipes?mine', undefined, 'anon')).status === 401);
  check('POST links signed out → 401', (await call('POST', '/api/makers/links', { recipeId: 'x', kind: 'student' }, 'anon')).status === 401);
  // ---- create + the bad fields (each refused, the valid twin accepted)
  for (const [field, bad] of [['recipe version', { v: 2 }], ['maker', { maker: 'Bad Maker' }], ['language', { lang: 'deu' }], ['pages', { pages: [] }], ['title', { title: 'x'.repeat(201) }], ['template', { pages: [{ template: 'nope' }] }]]) {
    const r = await call('POST', '/api/makers/recipes', { recipe: recipe(bad) });
    check(`POST a bad ${field} → 400 ${field}`, r.status === 400 && r.body.field === field, r);
  }
  check('POST no json → 400', (await call('POST', '/api/makers/recipes', null)).status === 400);
  const big = recipe({ pages: [{ template: 'K-002', ink: 'x'.repeat(S.MAX_RECIPE_BYTES) }] });
  check('POST over the cap → 413', (await call('POST', '/api/makers/recipes', { recipe: big })).status === 413);
  const atCap = recipe({ pages: [{ template: 'K-002', ink: 'x'.repeat(S.MAX_RECIPE_BYTES - S.recipeBytes(recipe({ pages: [{ template: 'K-002', ink: '' }] }))) }] });
  check('POST exactly at the cap → 201', S.recipeBytes(atCap) === S.MAX_RECIPE_BYTES && (await call('POST', '/api/makers/recipes', { recipe: atCap })).status === 201, S.recipeBytes(atCap));
  check('recipeBytes counts UTF-8 bytes (ä = 2)', S.recipeBytes({ t: 'ä' }) === Buffer.byteLength(JSON.stringify({ t: 'ä' })));
  const c = await call('POST', '/api/makers/recipes', { recipe: recipe() });
  check('POST a valid recipe → 201 { id, rev: 1 }', c.status === 201 && typeof c.body.id === 'string' && c.body.rev === 1, c);
  const id = c.body.id;
  // ---- list, own, other
  const list = await call('GET', '/api/makers/recipes?mine');
  check('GET ?mine lists the teacher\'s recipes newest first with the list fields', list.status === 200 && list.body.items.length === 2 && list.body.items[0].id === id && list.body.items[0].template === 'K-002' && list.body.items[0].title === 'Zählen', list.body.items);
  check('GET ?mine as another teacher is empty', (await call('GET', '/api/makers/recipes?mine', undefined, 'other')).body.items.length === 0);
  const g = await call('GET', '/api/makers/recipes/' + id);
  check('GET own → { id, rev, recipe }', g.status === 200 && g.body.rev === 1 && g.body.recipe.title === 'Zählen', g);
  check('GET another teacher\'s → 404', (await call('GET', '/api/makers/recipes/' + id, undefined, 'other')).status === 404);
  check('GET a malformed id → 404', (await call('GET', '/api/makers/recipes/not%20an%20id')).status === 404);
  // ---- update + the rev
  const u = await call('PUT', '/api/makers/recipes/' + id, { recipe: recipe({ title: 'Neu' }), rev: 1 });
  check('PUT with the loaded rev → 200 { rev: 2 }', u.status === 200 && u.body.rev === 2, u);
  const stale = await call('PUT', '/api/makers/recipes/' + id, { recipe: recipe({ title: 'Alt' }), rev: 1 });
  check('PUT with a stale rev → 409 { rev: 2 }, nothing overwritten', stale.status === 409 && stale.body.rev === 2 && (await db.getRecipe(id)).title === 'Neu', stale);
  check('PUT another teacher\'s → 404', (await call('PUT', '/api/makers/recipes/' + id, { recipe: recipe(), rev: 2 }, 'other')).status === 404);
  check('PUT a bad recipe → 400', (await call('PUT', '/api/makers/recipes/' + id, { recipe: recipe({ v: 3 }), rev: 2 })).status === 400);
  // ---- links
  check('POST links with a bad kind → 400', (await call('POST', '/api/makers/links', { recipeId: id, kind: 'public' })).status === 400);
  check('POST links for another teacher\'s recipe → 404', (await call('POST', '/api/makers/links', { recipeId: id, kind: 'student' }, 'other')).status === 404);
  const l1 = await call('POST', '/api/makers/links', { recipeId: id, kind: 'student' });
  check('POST links → 201 { linkId } of 12 alphabet chars', l1.status === 201 && /^[a-z2-9]{12}$/.test(l1.body.linkId), l1);
  const l2 = await call('POST', '/api/makers/links', { recipeId: id, kind: 'student' });
  check('minting the same kind again → 200, the same link', l2.status === 200 && l2.body.linkId === l1.body.linkId, l2);
  const l3 = await call('POST', '/api/makers/links', { recipeId: id, kind: 'colleague' });
  check('a colleague link is its own link', l3.status === 201 && l3.body.linkId !== l1.body.linkId);
  const pub = await call('GET', '/api/makers/links/' + l1.body.linkId, undefined, 'anon');
  check('GET a link is public → { recipe, kind, meter }, edge-cacheable', pub.status === 200 && pub.cache === 'public' && pub.body.kind === 'student' && pub.body.recipe.title === 'Neu' && pub.body.meter === false, pub);
  check('GET an unknown link → 404, not cached', (await call('GET', '/api/makers/links/zzzzzzzzzzzz', undefined, 'anon')).status === 404 && !(await call('GET', '/api/makers/links/zzzzzzzzzzzz', undefined, 'anon')).cache);
  // meter follows the TEACHER at read time
  db.usable.delete('sub');
  check('the teacher lapses → her link is metered now (read time, not mint time)', (await call('GET', '/api/makers/links/' + l1.body.linkId, undefined, 'anon')).body.meter === true);
  db.usable.add('sub');
  check('she renews → her link skips the meter again', (await call('GET', '/api/makers/links/' + l1.body.linkId, undefined, 'anon')).body.meter === false);
  const freeRecipe = (await call('POST', '/api/makers/recipes', { recipe: recipe() }, 'free')).body.id;
  const fl = (await call('POST', '/api/makers/links', { recipeId: freeRecipe, kind: 'student' }, 'free')).body.linkId;
  check('a free account\'s link is metered', (await call('GET', '/api/makers/links/' + fl, undefined, 'anon')).body.meter === true);
  // revoke
  check('DELETE a link as another teacher → 404', (await call('DELETE', '/api/makers/links/' + l1.body.linkId, undefined, 'other')).status === 404);
  check('DELETE a link signed out → 401', (await call('DELETE', '/api/makers/links/' + l1.body.linkId, undefined, 'anon')).status === 401);
  check('DELETE a link as the owner → { ok }', (await call('DELETE', '/api/makers/links/' + l1.body.linkId)).status === 200);
  check('a taken-back link → 404', (await call('GET', '/api/makers/links/' + l1.body.linkId, undefined, 'anon')).status === 404);
  check('taking it back twice → 404', (await call('DELETE', '/api/makers/links/' + l1.body.linkId)).status === 404);
  const l4 = await call('POST', '/api/makers/links', { recipeId: id, kind: 'student' });
  check('after a revoke, minting again makes a NEW student link', l4.status === 201 && l4.body.linkId !== l1.body.linkId);
  // delete the recipe: gone from the list, its links are gone, the id is 404
  check('DELETE another teacher\'s recipe → 404', (await call('DELETE', '/api/makers/recipes/' + id, undefined, 'other')).status === 404);
  check('DELETE own recipe → { ok }', (await call('DELETE', '/api/makers/recipes/' + id)).status === 200);
  check('a deleted recipe is 404, out of the list, and its colleague link is gone', (await call('GET', '/api/makers/recipes/' + id)).status === 404 && !(await call('GET', '/api/makers/recipes?mine')).body.items.some((x) => x.id === id) && (await call('GET', '/api/makers/links/' + l3.body.linkId, undefined, 'anon')).status === 404);
  check('linkRecord (the student page\'s read) mirrors GET link: null when gone', (await S.linkRecord(db, l3.body.linkId)) === null && (await S.linkRecord(db, l4.body.linkId)) === null && (await S.linkRecord(db, fl)) && (await S.linkRecord(db, fl)).meter === true);
  // the recipe cap
  const capDb = memDb(); capDb.countMine = async () => S.RECIPES_PER_TEACHER;
  check('the 501st recipe → 429', (await S.createRecipe(capDb, { userId: 't' }, { recipe: recipe() })).status === 429);
  capDb.countMine = async () => S.RECIPES_PER_TEACHER - 1;
  check('the 500th recipe → 201', (await S.createRecipe(capDb, { userId: 't' }, { recipe: recipe() })).status === 201);
  // routes that do not exist
  check('an unknown route → 404 no_route', (await call('GET', '/api/makers/nothing')).status === 404 && (await call('GET', '/api/makers/recipes/a/b')).status === 404);
  check('a path outside /api/makers is not ours', (await call('GET', '/api/quota/status')) === null);

  console.log(`makers-store: ${pass} pass, ${fails.length} fail`);
  fails.forEach((f) => console.log('FAIL ' + f));
  if (fails.length) process.exit(1);
})().catch((e) => { console.error(e); process.exit(1); });
