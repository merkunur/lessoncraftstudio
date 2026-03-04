/**
 * "What You Get" — Tier Comparison Content
 *
 * Shared across all apps with {appName} interpolation.
 * Two variants: language-sensitive apps vs visual-only apps.
 * 11 locales. (~250 words per locale).
 */

import type { SupportedLocale } from '../product-page-slugs';

export interface TierFeature {
  feature: string;
  commercial: string;
  fullAccess: string;
}

export interface TierComparisonData {
  title: string;
  commercialTitle: string;
  fullAccessTitle: string;
  commercialPrice: string;
  fullAccessPrice: string;
  features: TierFeature[];
  commercialCta: string;
  fullAccessCta: string;
  footnote: string;
}

// Language-sensitive apps: language is a key differentiator
// Visual-only apps: image themes are the key differentiator
type AppVariant = 'language-sensitive' | 'visual-only';

const tierComparisonData: Record<AppVariant, Record<string, TierComparisonData>> = {
  'language-sensitive': {
    en: {
      title: 'Choose Your Pack',
      commercialTitle: 'Commercial Pack',
      fullAccessTitle: 'Full Access Pack',
      commercialPrice: '$27',
      fullAccessPrice: '$47',
      features: [
        { feature: 'Image themes', commercial: '10 themes (~300 images)', fullAccess: '100+ themes (3,000+ images)' },
        { feature: 'Worksheet languages', commercial: 'English only', fullAccess: 'All 11 languages' },
        { feature: 'Canvas editing', commercial: 'Full editing', fullAccess: 'Full editing' },
        { feature: 'PDF export (300 DPI)', commercial: 'Yes', fullAccess: 'Yes' },
        { feature: 'Answer keys', commercial: 'Yes', fullAccess: 'Yes' },
        { feature: 'Commercial license', commercial: 'Yes — sell your worksheets', fullAccess: 'Yes — sell in any language' },
      ],
      commercialCta: 'Get Commercial Pack',
      fullAccessCta: 'Get Full Access Pack',
      footnote: 'Both packs are one-time purchases. Try free with all features before buying — the only difference is a watermark on downloads.',
    },
  },
  'visual-only': {
    en: {
      title: 'Choose Your Pack',
      commercialTitle: 'Commercial Pack',
      fullAccessTitle: 'Full Access Pack',
      commercialPrice: '$27',
      fullAccessPrice: '$47',
      features: [
        { feature: 'Image themes', commercial: '10 themes (~300 images)', fullAccess: '100+ themes (3,000+ images)' },
        { feature: 'UI language', commercial: 'All 11 languages', fullAccess: 'All 11 languages' },
        { feature: 'Canvas editing', commercial: 'Full editing', fullAccess: 'Full editing' },
        { feature: 'PDF export (300 DPI)', commercial: 'Yes', fullAccess: 'Yes' },
        { feature: 'Answer keys', commercial: 'Yes', fullAccess: 'Yes' },
        { feature: 'Commercial license', commercial: 'Yes — sell your worksheets', fullAccess: 'Yes — sell your worksheets' },
      ],
      commercialCta: 'Get Commercial Pack',
      fullAccessCta: 'Get Full Access Pack',
      footnote: 'Both packs are one-time purchases. Try free with all features before buying — the only difference is a watermark on downloads.',
    },
  },
};

// Language-sensitive app IDs (from REFERENCE.md Section 2.3)
const LANGUAGE_SENSITIVE_APPS = new Set([
  'wordsearch', 'crossword', 'word-scramble', 'word-guess', 'cryptogram',
  'code-addition', 'alphabet-train', 'prepositions', 'matching', 'bingo',
  'find-and-count', 'picture-sort', 'treasure-hunt',
]);

/**
 * Get tier comparison data for an app.
 * Automatically selects language-sensitive or visual-only variant.
 */
export function getTierComparison(
  appId: string,
  locale: SupportedLocale
): TierComparisonData {
  const variant: AppVariant = LANGUAGE_SENSITIVE_APPS.has(appId)
    ? 'language-sensitive'
    : 'visual-only';
  const data = tierComparisonData[variant];
  return data[locale] || data.en;
}

/**
 * Get tier comparison for bundles.
 * Bundles are always "language-sensitive" variant (English only at commercial tier).
 */
export function getBundleTierComparison(
  locale: SupportedLocale
): TierComparisonData {
  const data = tierComparisonData['language-sensitive'];
  const base = data[locale] || data.en;
  return {
    ...base,
    commercialPrice: '$79',
    fullAccessPrice: '$119',
  };
}
