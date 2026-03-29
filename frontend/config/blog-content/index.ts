export type { BlogContent, BlogCategory } from './types';

export async function getBlogContent(blogId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${blogId}`);
    return (mod.default ?? null) as import('./types').BlogContent | null;
  } catch {
    return null;
  }
}
