export type { StartContent } from './types';

export async function getStartContent(startId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${startId}`);
    return (mod.default ?? null) as import('./types').StartContent | null;
  } catch {
    return null;
  }
}
