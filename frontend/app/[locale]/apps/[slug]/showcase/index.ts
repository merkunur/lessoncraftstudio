export {
  WorksheetShowcaseSection,
  TieredShowcaseSection,
  SpotlightSection,
  GallerySection,
} from './ShowcaseSections';

export type {
  HeroShowcaseConfig,
  TieredShowcaseConfig,
  SpotlightConfig,
  GalleryConfig,
} from './ShowcaseSections';

import { showcaseConfigs, type ShowcaseConfig } from './showcase-configs';

export type { ShowcaseConfig };

export function getShowcaseConfig(appId: string): ShowcaseConfig | null {
  return showcaseConfigs[appId] ?? null;
}

export function hasShowcase(appId: string): boolean {
  return appId in showcaseConfigs;
}
