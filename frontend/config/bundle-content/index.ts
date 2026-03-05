export type { BundleContent } from './types';

export async function getBundleContent(bundleId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${bundleId}`);
    return (mod.default ?? null) as import('./types').BundleContent | null;
  } catch {
    return null;
  }
}
