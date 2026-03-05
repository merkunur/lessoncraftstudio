export type { IdeaContent } from './types';

export async function getIdeaContent(ideaId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${ideaId}`);
    return (mod.default ?? null) as import('./types').IdeaContent | null;
  } catch {
    return null;
  }
}
