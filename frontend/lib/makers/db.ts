/**
 * The Prisma implementation of store.ts's `MakerDb` (tables maker_recipes + maker_share_links, migration
 * 20271101000000_add_maker_recipes_and_links). One statement per call (ARCHITECTURE §10.1: the maker API handlers
 * never do more than that); the teacher's subscription is read WITH the link so `meter` is computed at read time.
 */
import { prisma } from '@/lib/prisma';
import { isSubscriptionUsable } from '@/lib/entitlements';
import type { MakerDb, RecipeRow, RecipeMeta, LinkRow, LinkKind, ListItem, RecipeJson } from './store';
import { LINK_ALPHABET } from './store';
import crypto from 'crypto';

const asRow = (r: { id: string; teacherId: string; maker: string; lang: string; title: string; template: string; recipe: unknown; rev: number; deletedAt: Date | null; updatedAt: Date }): RecipeRow => ({
  id: r.id, teacherId: r.teacherId, maker: r.maker, lang: r.lang, title: r.title, template: r.template, recipe: r.recipe as RecipeJson, rev: r.rev, deletedAt: r.deletedAt, updatedAt: r.updatedAt,
});
const toJson = (recipe: RecipeJson) => JSON.parse(JSON.stringify(recipe));

export const prismaMakerDb: MakerDb = {
  async listMine(teacherId): Promise<ListItem[]> {
    const rows = await prisma.makerRecipe.findMany({
      where: { teacherId, deletedAt: null },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, maker: true, lang: true, template: true, updatedAt: true },
      take: 1000,
    });
    return rows.map((r) => ({ id: r.id, title: r.title, maker: r.maker, lang: r.lang, template: r.template, updatedAt: r.updatedAt.toISOString() }));
  },
  async getRecipe(id) {
    const r = await prisma.makerRecipe.findUnique({ where: { id } });
    return r ? asRow(r) : null;
  },
  countMine(teacherId) {
    return prisma.makerRecipe.count({ where: { teacherId, deletedAt: null } });
  },
  async createRecipe(teacherId, meta: RecipeMeta) {
    const r = await prisma.makerRecipe.create({
      data: { teacherId, maker: meta.maker, lang: meta.lang, title: meta.title, template: meta.template, recipe: toJson(meta.recipe) },
      select: { id: true, rev: true },
    });
    return r;
  },
  async updateRecipe(id, expectedRev, meta: RecipeMeta) {
    // the rev guard IS the optimistic lock: zero rows updated = it changed elsewhere (or was deleted meanwhile)
    const u = await prisma.makerRecipe.updateMany({
      where: { id, rev: expectedRev, deletedAt: null },
      data: { maker: meta.maker, lang: meta.lang, title: meta.title, template: meta.template, recipe: toJson(meta.recipe), rev: { increment: 1 } },
    });
    return u.count === 1 ? { rev: expectedRev + 1 } : null;
  },
  async deleteRecipe(id) {
    await prisma.makerRecipe.update({ where: { id }, data: { deletedAt: new Date() } });
  },
  async findLink(recipeId, kind: LinkKind) {
    const l = await prisma.makerShareLink.findFirst({ where: { recipeId, kind, revokedAt: null }, select: { linkId: true, recipeId: true, teacherId: true, kind: true, revokedAt: true } });
    return l ? { ...l, kind: l.kind as LinkKind } : null;
  },
  async createLink(link: LinkRow) {
    await prisma.makerShareLink.create({ data: { linkId: link.linkId, recipeId: link.recipeId, teacherId: link.teacherId, kind: link.kind } });
  },
  async getLink(linkId) {
    const l = await prisma.makerShareLink.findUnique({
      where: { linkId },
      include: { recipe: { include: { teacher: { select: { isAdmin: true, subscription: true } } } } },
    });
    if (!l) return null;
    const { teacher, ...recipe } = l.recipe;
    return {
      link: { linkId: l.linkId, recipeId: l.recipeId, teacherId: l.teacherId, kind: l.kind as LinkKind, revokedAt: l.revokedAt },
      recipe: asRow(recipe),
      teacherUsable: isSubscriptionUsable(teacher),
    };
  },
  async revokeLink(linkId) {
    await prisma.makerShareLink.update({ where: { linkId }, data: { revokedAt: new Date() } });
  },
};

/** 12 chars of the hosted-link alphabet (frontend/lib/hosted-worksheets/core.ts generateHostedLinkId) */
export function newLinkId(): string {
  const bytes = crypto.randomBytes(12);
  let out = '';
  for (let i = 0; i < 12; i++) out += LINK_ALPHABET[bytes[i] % LINK_ALPHABET.length];
  return out;
}
