export type { GuideContent } from './types';

export async function getGuideContent(guideId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${guideId}`);
    return (mod.default ?? null) as import('./types').GuideContent | null;
  } catch {
    return null;
  }
}
