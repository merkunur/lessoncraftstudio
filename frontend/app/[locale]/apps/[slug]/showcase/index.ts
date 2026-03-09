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

import { showcaseConfigs, getLocalizedShowcaseConfig, type ShowcaseConfig } from './showcase-configs';

export type { ShowcaseConfig };

export function getShowcaseConfig(appId: string, locale: string = 'en'): ShowcaseConfig | null {
  return getLocalizedShowcaseConfig(appId, locale);
}

export function hasShowcase(appId: string): boolean {
  return appId in showcaseConfigs;
}
