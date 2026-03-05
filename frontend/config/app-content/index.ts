export type {
  AppContent,
  AppContentSEO,
  AppContentHero,
  HowItWorksStep,
  KeyFeature,
  BusinessUseCase,
  FAQ,
  InternalLink,
  PageVisuals,
} from './types';
export { getCategoryAudience } from './category-audience';
export { getBundleTierComparison } from './tier-comparison';

export async function getAppContent(appId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${appId}`);
    return (mod.default ?? null) as import('./types').AppContent | null;
  } catch {
    return null;
  }
}
