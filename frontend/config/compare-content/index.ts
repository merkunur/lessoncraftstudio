export type { CompareContent } from './types';

export async function getCompareContent(compareId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${compareId}`);
    return (mod.default ?? null) as import('./types').CompareContent | null;
  } catch {
    return null;
  }
}
