/**
 * The worksheet makers' saved-worksheet + share-link store — the RULES (ARCHITECTURE §5, §8; task 3 of the ten).
 *
 * This module is the contract scripts/makers/local-store.js implements locally, written once over a small database
 * interface (`MakerDb`) so the SAME rules run (a) on the website through Prisma (frontend/lib/makers/db.ts, the
 * /api/makers/* routes) and (b) in the gate suite through an in-memory database (scripts/makers/tests/real-store-local.js),
 * where saves-shell.js and play-shell.js drive the maker screen against these very functions. No Next, no Prisma, no
 * Node module is imported here: a pure function of (db, caller, request).
 *
 *   POST   /api/makers/recipes            { recipe }        → 201 { id, rev }       sign-in required
 *   GET    /api/makers/recipes?mine                         → { items: [{ id, title, maker, lang, template, updatedAt }] }
 *   GET    /api/makers/recipes/<id>                         → { id, rev, recipe }    the owner only
 *   PUT    /api/makers/recipes/<id>       { recipe, rev }   → { rev } · 409 { rev } when it changed elsewhere
 *   DELETE /api/makers/recipes/<id>                         → { ok }                 (kept, marked deleted)
 *   POST   /api/makers/links              { recipeId, kind }→ 201 { linkId } (200 when that link exists already)
 *   GET    /api/makers/links/<linkId>                       → { recipe, kind, meter }  public: the link is the key
 *   DELETE /api/makers/links/<linkId>                       → { ok }                 the owner takes a link back
 *
 * Refusals: 401 not signed in · 404 not found / not yours · 413 recipe over the size cap · 400 malformed ·
 * 429 the teacher's recipe cap (ARCHITECTURE §10.2: 500 live recipes per teacher).
 */

export const MAX_RECIPE_BYTES = 256 * 1024; // = scripts/makers/shell/recipe.js MAX_RECIPE_BYTES
export const RECIPES_PER_TEACHER = 500; // ARCHITECTURE §10.2
export const LINK_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789'; // = frontend/lib/hosted-worksheets/core.ts generateHostedLinkId
export const LINK_KINDS = ['student', 'colleague'] as const;
export type LinkKind = (typeof LINK_KINDS)[number];

/** the recipe as the maker screen saves it (scripts/makers/shell/recipe.js) — opaque beyond the fields the store reads */
export interface RecipeJson {
  v: number;
  maker: string;
  lang: string;
  title: string;
  pages: Array<{ template: string; [k: string]: unknown }>;
  [k: string]: unknown;
}

export interface RecipeRow {
  id: string;
  teacherId: string;
  maker: string;
  lang: string;
  title: string;
  template: string;
  recipe: RecipeJson;
  rev: number;
  deletedAt: Date | string | null;
  updatedAt: Date | string;
}
export interface RecipeMeta {
  maker: string;
  lang: string;
  title: string;
  template: string;
  recipe: RecipeJson;
}
export interface LinkRow {
  linkId: string;
  recipeId: string;
  teacherId: string;
  kind: LinkKind;
  revokedAt: Date | string | null;
}
export interface ListItem {
  id: string;
  title: string;
  maker: string;
  lang: string;
  template: string;
  updatedAt: string;
}

/** The database the rules run over — one statement per call; the Prisma and the in-memory implementations. */
export interface MakerDb {
  /** the teacher's live recipes, newest first */
  listMine(teacherId: string): Promise<ListItem[]>;
  /** a recipe by id, deleted or not (the rules decide), null when unknown */
  getRecipe(id: string): Promise<RecipeRow | null>;
  countMine(teacherId: string): Promise<number>;
  createRecipe(teacherId: string, meta: RecipeMeta): Promise<{ id: string; rev: number }>;
  /** update when the stored rev equals `expectedRev`; null when it changed elsewhere (or is gone) */
  updateRecipe(id: string, expectedRev: number, meta: RecipeMeta): Promise<{ rev: number } | null>;
  deleteRecipe(id: string): Promise<void>;
  /** the live (unrevoked) link of this recipe and kind, if any */
  findLink(recipeId: string, kind: LinkKind): Promise<LinkRow | null>;
  createLink(link: LinkRow): Promise<void>;
  /** a link with its recipe and whether the recipe's teacher may use paid features (isSubscriptionUsable, read NOW) */
  getLink(linkId: string): Promise<{ link: LinkRow; recipe: RecipeRow; teacherUsable: boolean } | null>;
  revokeLink(linkId: string): Promise<void>;
}

export interface Reply {
  status: number;
  body: unknown;
  /** set on the one public, edge-cacheable answer (a live link) */
  cache?: 'public';
}
export type Caller = { userId: string } | null;

const json = (status: number, body: unknown): Reply => ({ status, body });
export const RECIPE_ID_RE = /^[a-z0-9]{8,40}$/i; // a cuid on the website; 'r' + 15 chars in the local stand-in
export const LINK_ID_RE = /^[a-z0-9]{6,20}$/i;

/** A recipe the store accepts: the shape the screen writes (shell/recipe.js), within the cap. Returns the bad field. */
export function validRecipe(r: unknown): string | null {
  const x = r as Partial<RecipeJson> | null;
  if (!x || typeof x !== 'object' || x.v !== 1) return 'recipe version';
  if (typeof x.maker !== 'string' || !/^[a-z0-9-]{2,40}$/.test(x.maker)) return 'maker';
  if (typeof x.lang !== 'string' || !/^[a-z]{2}$/.test(x.lang)) return 'language';
  if (!Array.isArray(x.pages) || x.pages.length < 1 || x.pages.length > 10) return 'pages';
  if (typeof x.title !== 'string' || x.title.length > 200) return 'title';
  const t = x.pages[0] && (x.pages[0] as { template?: unknown }).template;
  if (typeof t !== 'string' || !/^[A-Z]\d?-\d{3}$/.test(t)) return 'template';
  return null;
}

/** UTF-8 byte length without Buffer (this module also runs in the esbuild test bundle) */
export function recipeBytes(recipe: unknown): number {
  const s = JSON.stringify(recipe);
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    n += c < 0x80 ? 1 : c < 0x800 ? 2 : c >= 0xd800 && c <= 0xdbff ? (i++, 4) : 3;
  }
  return n;
}

/** a recipe body (POST / PUT) → its row metadata, or the refusal */
function metaOf(body: unknown): { meta: RecipeMeta } | { reply: Reply } {
  const b = body as { recipe?: unknown } | null;
  if (!b || typeof b !== 'object') return { reply: json(400, { error: 'bad_json' }) };
  const bad = validRecipe(b.recipe);
  if (bad) return { reply: json(400, { error: 'bad_recipe', field: bad }) };
  const r = b.recipe as RecipeJson;
  if (recipeBytes(r) > MAX_RECIPE_BYTES) return { reply: json(413, { error: 'too_large' }) };
  return { meta: { maker: r.maker, lang: r.lang, title: r.title, template: r.pages[0].template, recipe: r } };
}

/** the caller's own live recipe, or null */
async function own(db: MakerDb, me: { userId: string }, id: string): Promise<RecipeRow | null> {
  if (!RECIPE_ID_RE.test(id)) return null;
  const r = await db.getRecipe(id);
  return r && r.teacherId === me.userId && !r.deletedAt ? r : null;
}

export async function listRecipes(db: MakerDb, me: Caller): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  return json(200, { items: await db.listMine(me.userId) });
}

export async function createRecipe(db: MakerDb, me: Caller, body: unknown): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  const m = metaOf(body);
  if ('reply' in m) return m.reply;
  if ((await db.countMine(me.userId)) >= RECIPES_PER_TEACHER) return json(429, { error: 'recipe_cap', cap: RECIPES_PER_TEACHER });
  const { id, rev } = await db.createRecipe(me.userId, m.meta);
  return json(201, { id, rev });
}

export async function getRecipe(db: MakerDb, me: Caller, id: string): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  const r = await own(db, me, id);
  return r ? json(200, { id: r.id, rev: r.rev, recipe: r.recipe }) : json(404, { error: 'not_found' });
}

export async function updateRecipe(db: MakerDb, me: Caller, id: string, body: unknown): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  const m = metaOf(body);
  if ('reply' in m) return m.reply;
  const r = await own(db, me, id);
  if (!r) return json(404, { error: 'not_found' });
  const rev = (body as { rev?: unknown }).rev;
  if (rev !== r.rev) return json(409, { error: 'changed_elsewhere', rev: r.rev });
  const u = await db.updateRecipe(id, r.rev, m.meta);
  // the row moved between the read and the write: the same answer as a stale rev (the screen keeps its copy)
  if (!u) { const now = await db.getRecipe(id); return json(409, { error: 'changed_elsewhere', rev: now ? now.rev : r.rev }); }
  return json(200, { rev: u.rev });
}

export async function deleteRecipe(db: MakerDb, me: Caller, id: string): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  const r = await own(db, me, id);
  if (!r) return json(404, { error: 'not_found' });
  await db.deleteRecipe(id);
  return json(200, { ok: true });
}

/** one link per recipe and kind: minting again returns the existing one (200), a new one is 201 */
export async function mintLink(db: MakerDb, me: Caller, body: unknown, newLinkId: () => string): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  const b = body as { recipeId?: unknown; kind?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  const r = typeof b.recipeId === 'string' ? await own(db, me, b.recipeId) : null;
  if (!r) return json(404, { error: 'not_found' });
  if (!LINK_KINDS.includes(b.kind as LinkKind)) return json(400, { error: 'bad_kind' });
  const kind = b.kind as LinkKind;
  const have = await db.findLink(r.id, kind);
  if (have) return json(200, { linkId: have.linkId });
  const linkId = newLinkId();
  if (!/^[a-z2-9]{12}$/.test(linkId)) throw new Error('newLinkId must return 12 chars of LINK_ALPHABET');
  await db.createLink({ linkId, recipeId: r.id, teacherId: me.userId, kind, revokedAt: null });
  return json(201, { linkId });
}

/**
 * A shared link is public: the twelve-character id is the key. `meter` is computed at READ time from the recipe's
 * teacher — a subscriber's student links skip the per-device play meter (operator ruling 2026-11-01 D.4-4), so a
 * lapsed teacher's links become metered and a renewed one's skip it again within the 5-minute edge cache.
 */
export async function readLink(db: MakerDb, linkId: string): Promise<Reply> {
  if (!LINK_ID_RE.test(linkId)) return json(404, { error: 'not_found' });
  const l = await db.getLink(linkId);
  if (!l || l.link.revokedAt || l.recipe.deletedAt) return json(404, { error: 'not_found' });
  return { status: 200, body: { recipe: l.recipe.recipe, kind: l.link.kind, meter: !l.teacherUsable }, cache: 'public' };
}

/** the same read, as the student page route and the local preview server use it: null when there is no live link */
export async function linkRecord(db: MakerDb, linkId: string): Promise<{ linkId: string; kind: LinkKind; recipe: RecipeJson; meter: boolean; title: string; maker: string; lang: string } | null> {
  if (!LINK_ID_RE.test(linkId)) return null;
  const l = await db.getLink(linkId);
  if (!l || l.link.revokedAt || l.recipe.deletedAt) return null;
  return { linkId, kind: l.link.kind, recipe: l.recipe.recipe, meter: !l.teacherUsable, title: l.recipe.title, maker: l.recipe.maker, lang: l.recipe.lang };
}

export async function revokeLink(db: MakerDb, me: Caller, linkId: string): Promise<Reply> {
  if (!me) return json(401, { error: 'signin_required' });
  if (!LINK_ID_RE.test(linkId)) return json(404, { error: 'not_found' });
  const l = await db.getLink(linkId);
  if (!l || l.link.revokedAt || l.recipe.deletedAt || l.recipe.teacherId !== me.userId) return json(404, { error: 'not_found' });
  await db.revokeLink(linkId);
  return json(200, { ok: true });
}

/**
 * One dispatcher over the eight routes, for the local test server (the Next routes call the functions above directly;
 * this keeps the method × path table in one place so the two cannot drift: scripts/makers/tests/makers-store.test.js
 * asserts every route through it).
 */
export async function dispatch(db: MakerDb, req: { method: string; path: string; body?: unknown; me: Caller; newLinkId: () => string }): Promise<Reply | null> {
  const parts = req.path.split('?')[0].split('/').filter(Boolean); // api, makers, recipes|links, id?
  if (parts[0] !== 'api' || parts[1] !== 'makers') return null;
  const [, , kind, id] = parts;
  if (parts.length > 4) return json(404, { error: 'no_route' });
  if (kind === 'recipes') {
    if (!id && req.method === 'GET') return listRecipes(db, req.me);
    if (!id && req.method === 'POST') return createRecipe(db, req.me, req.body);
    if (id && req.method === 'GET') return getRecipe(db, req.me, id);
    if (id && req.method === 'PUT') return updateRecipe(db, req.me, id, req.body);
    if (id && req.method === 'DELETE') return deleteRecipe(db, req.me, id);
  }
  if (kind === 'links') {
    if (!id && req.method === 'POST') return mintLink(db, req.me, req.body, req.newLinkId);
    if (id && req.method === 'GET') return readLink(db, id);
    if (id && req.method === 'DELETE') return revokeLink(db, req.me, id);
  }
  return json(404, { error: 'no_route' });
}
