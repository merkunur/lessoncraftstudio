/**
 * The Prisma implementation of store.ts's `ClassDb` (tables class_rooms, class_seats, class_assignments,
 * class_attempts; migration 20271111000000_add_class_results) and the catalogue lookups a pasted link needs.
 * The teacher's subscription is read WITH the class, so "is this class link live" is decided at request time.
 */
import { resolveActivitySlug } from '@/lib/activities';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { isSubscriptionUsable } from '@/lib/entitlements';
import { loadLadder } from '@/lib/level-sets-db';
import { deckTitleIn } from '@/lib/level-sets';
import { getMonolingualLandings } from '@/lib/seo/landing-content';
import type { AssignmentContent, AssignmentKind, AssignmentRow, AttemptRow, ClassDb, ClassRow, Level, NamesMode } from './store';
import { CODE_ALPHABET, LEVELS } from './store';

type DbClass = { id: string; teacherId: string; name: string; code: string; namesMode: string; locale: string; lastUsedAt: Date; createdAt: Date };
const asClass = (c: DbClass): ClassRow => ({ id: c.id, teacherId: c.teacherId, name: c.name, code: c.code, namesMode: c.namesMode as NamesMode, locale: c.locale, lastUsedAt: c.lastUsedAt, createdAt: c.createdAt });
const SEAT = { id: true, classId: true, seatNo: true, displayName: true, icon: true } as const;
type DbAssignment = { id: string; classId: string; kind: string; title: string; content: unknown; position: number; closedAt: Date | null; createdAt: Date };
const asAssignment = (a: DbAssignment): AssignmentRow => ({ id: a.id, classId: a.classId, kind: a.kind as AssignmentKind, title: a.title, content: a.content as AssignmentContent, position: a.position, closedAt: a.closedAt, createdAt: a.createdAt });
type DbAttempt = { id: string; token: string; assignmentId: string; seatId: string; pageRef: string; level: string | null; right: number | null; total: number | null; items: unknown; checks: number; finished: boolean; createdAt: Date; reportedAt: Date | null };
const asAttempt = (a: DbAttempt): AttemptRow => ({ id: a.id, token: a.token, assignmentId: a.assignmentId, seatId: a.seatId, pageRef: a.pageRef, level: (a.level as Level | null) || null, right: a.right, total: a.total, items: (a.items as number[] | null) || null, checks: a.checks, finished: a.finished, createdAt: a.createdAt, reportedAt: a.reportedAt });
const toJson = (x: unknown) => JSON.parse(JSON.stringify(x));

const DECKS_DIR = process.env.DECKS_DIR || '/var/www/lcs-media/decks';

/**
 * Does the published page give a child something to check on screen? Read from THE PAGE ITSELF (its Check button or
 * its celebration) rather than from the hand-kept list of interactive families (lib/level-sets.ts pageIsInteractive).
 * Measured over all 172,996 published pages (docs/daily-teaching-system/graph/FINDINGS.md): the list is right, but on
 * 143 pages whose address carries a unit after the type code the site cannot read the code and calls a print-only page
 * playable. Reading the page has no such gap and cannot drift when a family gains or loses its screen. Unreadable file =
 * no (a refusal can be retried; a child stuck on a page cannot).
 */
export function pageHasScreen(locale: string, slug: string): boolean {
  if (!/^[a-z]{2}$/.test(locale) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return false;
  try {
    const html = fs.readFileSync(path.join(DECKS_DIR, locale, slug, 'deck.html'), 'utf8');
    return html.includes('id="lcs-check"') || html.includes('id="lcs-celebration"');
  } catch {
    return false;
  }
}

export const prismaClassDb: ClassDb = {
  async listClasses(teacherId) {
    const rows = await prisma.classroom.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, code: true, namesMode: true, locale: true, lastUsedAt: true, _count: { select: { seats: true, assignments: true } } },
      take: 100,
    });
    return rows.map((c) => ({ id: c.id, name: c.name, code: c.code, namesMode: c.namesMode as NamesMode, locale: c.locale, seats: c._count.seats, assignments: c._count.assignments, lastUsedAt: c.lastUsedAt.toISOString() }));
  },
  countClasses(teacherId) {
    return prisma.classroom.count({ where: { teacherId } });
  },
  async createClass(teacherId, c) {
    return asClass(await prisma.classroom.create({ data: { teacherId, name: c.name, code: c.code, namesMode: c.namesMode, locale: c.locale } }));
  },
  async getClass(id) {
    const c = await prisma.classroom.findUnique({ where: { id } });
    return c ? asClass(c) : null;
  },
  async getClassByCode(code) {
    const c = await prisma.classroom.findUnique({ where: { code }, include: { teacher: { select: { isAdmin: true, subscription: true } } } });
    if (!c) return null;
    return { cls: asClass(c), teacherUsable: isSubscriptionUsable(c.teacher) };
  },
  async updateClass(id, patch) {
    await prisma.classroom.update({ where: { id }, data: patch });
  },
  async touchClass(id, now) {
    await prisma.classroom.update({ where: { id }, data: { lastUsedAt: now } });
  },
  async deleteClass(id) {
    await prisma.classroom.delete({ where: { id } }); // seats, assignments and attempts cascade
  },

  async listSeats(classId) {
    return prisma.classSeat.findMany({ where: { classId }, orderBy: { seatNo: 'asc' }, select: SEAT });
  },
  getSeat(id) {
    return prisma.classSeat.findUnique({ where: { id }, select: SEAT });
  },
  async createSeats(classId, seats) {
    await prisma.classSeat.createMany({ data: seats.map((s) => ({ classId, seatNo: s.seatNo, displayName: s.displayName, icon: s.icon })) });
  },
  async updateSeat(id, patch) {
    await prisma.classSeat.update({ where: { id }, data: patch });
  },
  async clearSeatNames(classId) {
    await prisma.classSeat.updateMany({ where: { classId }, data: { displayName: null } });
  },
  async deleteSeat(id) {
    await prisma.classSeat.delete({ where: { id } }); // the child's attempts cascade
  },
  async deleteAttemptsOfSeat(seatId) {
    await prisma.classAttempt.deleteMany({ where: { seatId } });
  },

  async listAssignments(classId) {
    return (await prisma.classAssignment.findMany({ where: { classId }, orderBy: [{ position: 'asc' }, { createdAt: 'asc' }] })).map(asAssignment);
  },
  async getAssignment(id) {
    const a = await prisma.classAssignment.findUnique({ where: { id } });
    return a ? asAssignment(a) : null;
  },
  async createAssignment(classId, a) {
    return asAssignment(await prisma.classAssignment.create({ data: { classId, kind: a.kind, title: a.title, content: toJson(a.content), position: a.position } }));
  },
  async updateAssignment(id, patch) {
    await prisma.classAssignment.update({ where: { id }, data: { closedAt: patch.closedAt ?? null } });
  },
  async deleteAssignment(id) {
    await prisma.classAssignment.delete({ where: { id } });
  },

  async listAttemptsOfClass(classId) {
    return (await prisma.classAttempt.findMany({ where: { assignment: { classId } }, orderBy: { createdAt: 'asc' }, take: 50000 })).map(asAttempt);
  },
  async listAttempts(assignmentId, seatId) {
    return (await prisma.classAttempt.findMany({ where: { assignmentId, seatId }, orderBy: { createdAt: 'asc' } })).map(asAttempt);
  },
  async createAttempt(a) {
    return asAttempt(await prisma.classAttempt.create({ data: { token: a.token, assignmentId: a.assignmentId, seatId: a.seatId, pageRef: a.pageRef, level: a.level } }));
  },
  async getAttempt(token) {
    const a = await prisma.classAttempt.findUnique({ where: { token } });
    return a ? asAttempt(a) : null;
  },
  async saveReport(id, patch) {
    const data: Record<string, unknown> = {};
    if (patch.right !== undefined) data.right = patch.right;
    if (patch.total !== undefined) data.total = patch.total;
    if (patch.items !== undefined) data.items = patch.items === null ? undefined : patch.items;
    if (patch.checks !== undefined) data.checks = patch.checks;
    if (patch.finished !== undefined) data.finished = patch.finished;
    if (patch.reportedAt !== undefined) data.reportedAt = patch.reportedAt;
    await prisma.classAttempt.update({ where: { id }, data });
  },

  async resolveDeck(locale, slug) {
    const d = await prisma.deck.findFirst({
      where: { language: locale, slug, status: 'published' },
      select: { slug: true, title: true },
    });
    if (!d) return null;
    return {
      slug: d.slug,
      title: deckTitleIn(d.title, locale) || d.slug,
      interactive: pageHasScreen(locale, d.slug),
    };
  },
  async resolveLadder(locale, code) {
    const l = await loadLadder(locale, code);
    if (!l) return null;
    const levels = { easy: [], core: [], hard: [] } as Record<Level, string[]>;
    for (const lv of LEVELS) levels[lv] = l.pages[lv].filter((p) => pageHasScreen(locale, p.slug)).sort((a, b) => a.copy - b.copy).map((p) => p.slug);
    return { code: l.code, title: l.title, levels };
  },
  async resolveLanding(locale, landingSlug) {
    const l = getMonolingualLandings(locale).find((x) => x.slug === landingSlug);
    return l && l.canonicalDeckSlug ? { slug: l.canonicalDeckSlug } : null;
  },
  async resolvePlayLink(linkId) {
    const l = await prisma.playLink.findUnique({ where: { linkId }, select: { deck: { select: { language: true, slug: true, status: true } } } });
    return l && l.deck && l.deck.status === 'published' ? { locale: l.deck.language, slug: l.deck.slug } : null;
  },
  async resolveMakerLink(linkId, teacherId) {
    const l = await prisma.makerShareLink.findUnique({ where: { linkId }, select: { kind: true, teacherId: true, revokedAt: true, recipe: { select: { title: true, deletedAt: true } } } });
    if (!l || l.kind !== 'student' || l.revokedAt || l.teacherId !== teacherId || l.recipe.deletedAt) return null;
    return { linkId, title: l.recipe.title };
  },
  async resolveActivity(locale, slug) {
    // the same lookup the activity page itself uses: a slug of this language in the registered manifests
    const row = await resolveActivitySlug(slug, locale);
    const title = row && row.page_title ? row.page_title[locale] : null;
    return row && title ? { id: row.id, slug, title: title.replace(/\s*\([^()]*\)\s*$/, '').slice(0, 200) } : null;   // (a page title often ends in its grade: "… (Grade 2)")
  },
};

function draw(len: number): string {
  const bytes = crypto.randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length]; // 32 symbols: no modulo bias
  return out;
}
/** the class link's key: 10 characters, 32^10 ≈ 1.1e15 */
export const newClassCode = () => draw(10);
/** an attempt token: 20 characters, 32^20 ≈ 1.3e30 */
export const newAttemptToken = () => draw(20);
