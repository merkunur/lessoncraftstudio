/**
 * Prisma client wrapper for publish-cli DB operations per Brief B Phase 3 v4 Surface 4.
 *
 * Operations:
 *   - findExistingBySlug(language, slug)        — for --update-slug lookup (sole edit-in-place mechanism for v1)
 *   - resolveSlugCollision(language, candidate) — slug-suffix algorithm
 *   - insertDeck(...)                            — new deck INSERT
 *   - updateDeck(id, ...)                        — edit-in-place UPDATE
 *
 * Uses the Prisma client at frontend/lib/prisma. publish-cli runs from Hetzner
 * where DATABASE_URL is local (frontend/.env). Per Phase 3 v4 architecture,
 * publish-cli requires the same Prisma client the Next.js app uses.
 *
 * Note: Phase 1 Deck schema does NOT have a deck_id column. The v3-review nit
 * proposed --update-deck-id alongside --update-slug; the dropped flag would
 * have keyed lookup against a non-existent column. Pre-Phase-4 hygiene
 * (this commit) drops the flag entirely. Future schema amendment would
 * require its own brief touching §17.8.7 forward-compatibility.
 */

'use strict';

var path = require('path');

// Resolve Prisma client from the frontend's node_modules.
// publish-cli lives at scripts/publish-cli/ at the repo root; frontend/lib/prisma.ts
// exports the singleton. Direct require of @prisma/client from frontend/node_modules.
var prismaClientPath = path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client');
var PrismaClient;
try {
  PrismaClient = require(prismaClientPath).PrismaClient;
} catch (e) {
  throw new Error('db: Prisma client not found at ' + prismaClientPath + '. Run `npm install` in frontend/ first. ' + e.message);
}

var _client = null;

function client() {
  if (!_client) {
    _client = new PrismaClient();
  }
  return _client;
}

async function disconnect() {
  if (_client) {
    await _client.$disconnect();
    _client = null;
  }
}

/**
 * Lookup existing deck by (language, slug). Returns row or null.
 */
async function findExistingBySlug(language, slug) {
  return await client().deck.findFirst({
    where: { language: language, slug: slug }
  });
}

/**
 * Slug collision resolution per §17.8.5.
 * Returns the resolved slug (candidate or candidate-N for some N).
 *
 * Caps at -50; throws if pathologically exhausted.
 */
async function resolveSlugCollision(language, candidate, excludeId) {
  var c = client();
  // Query all rows matching candidate or candidate-N.
  var existing = await c.deck.findMany({
    where: {
      language: language,
      OR: [
        { slug: candidate },
        { slug: { startsWith: candidate + '-' } }
      ]
    },
    select: { id: true, slug: true }
  });
  // Filter out excludeId (used for edit-in-place; the row being updated doesn't count as collision).
  if (excludeId) {
    existing = existing.filter(function (r) { return r.id !== excludeId; });
  }
  var taken = {};
  existing.forEach(function (r) { taken[r.slug] = true; });
  if (!taken[candidate]) return candidate;
  for (var n = 2; n <= 50; n++) {
    var s = candidate + '-' + n;
    if (!taken[s]) return s;
  }
  throw new Error(
    'db.resolveSlugCollision: pathological collision — candidate "' + candidate +
    '" with -2 through -50 all taken in language "' + language + '". Manual investigation required.'
  );
}

/**
 * INSERT new deck row.
 * Returns the created row.
 */
async function insertDeck(opts) {
  var data = {
    slug: opts.slug,
    title: opts.title,                          // Json: { <language>: <h1-text> }
    description: opts.description,              // Json: { <language>: <description-text> }
    exerciseType: opts.exerciseType,
    exerciseMode: opts.exerciseMode || null,
    language: opts.language,
    subjectTags: opts.subjectTags || [],
    topicSlugs: opts.topicSlugs || [],
    ageRange: opts.ageRange,
    htmlUrl: opts.htmlUrl,
    pdfUrl: opts.pdfUrl,
    answerKeyUrl: opts.answerKeyUrl || null,
    thumbnailUrl: opts.thumbnailUrl,
    manifestUrl: opts.manifestUrl,
    publishedAt: new Date(),
    status: 'published',
    createdBy: opts.createdBy,
    version: 1,
    contentFamilyId: null
  };
  return await client().deck.create({ data: data });
}

/**
 * UPDATE existing deck row (edit-in-place).
 * Preserves slug, publishedAt, createdBy. Increments version. Refreshes title,
 * description, asset URLs, and updated_at (auto via Prisma's @updatedAt).
 */
async function updateDeck(id, opts) {
  var existing = await client().deck.findUnique({ where: { id: id } });
  if (!existing) {
    throw new Error('db.updateDeck: deck with id "' + id + '" not found');
  }
  var data = {
    title: opts.title,
    description: opts.description,
    exerciseType: opts.exerciseType,
    exerciseMode: opts.exerciseMode || null,
    subjectTags: opts.subjectTags || existing.subjectTags,
    topicSlugs: opts.topicSlugs || existing.topicSlugs,
    ageRange: opts.ageRange,
    htmlUrl: opts.htmlUrl,
    pdfUrl: opts.pdfUrl,
    answerKeyUrl: opts.answerKeyUrl || null,
    thumbnailUrl: opts.thumbnailUrl,
    manifestUrl: opts.manifestUrl,
    status: 'published',
    version: existing.version + 1
  };
  return await client().deck.update({ where: { id: id }, data: data });
}

module.exports = {
  client: client,
  disconnect: disconnect,
  findExistingBySlug: findExistingBySlug,
  resolveSlugCollision: resolveSlugCollision,
  insertDeck: insertDeck,
  updateDeck: updateDeck
};
