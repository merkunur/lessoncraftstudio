import type { BlogCategory } from '@/config/blog-content/types';
import type { SectionPlacement, BlogVisualConfig } from './types';

/**
 * Determine which visual sections to show and where, based on blog category.
 * Returns an ordered list of section placements.
 */
export function getSectionPlacements(
  category: BlogCategory,
  sectionCount: number,
  config: BlogVisualConfig,
): SectionPlacement[] {
  const placements: SectionPlacement[] = [];

  // Section A: Hero — EVERY post, after hero text
  placements.push({ type: 'A', position: 'after-hero' });

  if (category === 'product-guide') {
    // Category 1: A + B + D + G + J
    if (config.productCards) {
      placements.push({ type: 'B', position: 'after-section', sectionIndex: 0 });
    }
    if (config.difficultyTiers) {
      placements.push({
        type: 'D',
        position: 'after-section',
        sectionIndex: Math.max(1, Math.floor(sectionCount / 3)),
      });
    }
    if (config.worksheetAnswerPair) {
      placements.push({
        type: 'G',
        position: 'after-section',
        sectionIndex: Math.max(2, Math.floor((2 * sectionCount) / 3)),
      });
    }
  } else if (category === 'platform-strategy') {
    // Category 2: A + I + one of (C, F, H) + J
    // Pick whichever extra section is configured
    if (config.beforeAfter) {
      placements.push({ type: 'C', position: 'after-section', sectionIndex: Math.min(1, sectionCount - 1) });
    } else if (config.bundle) {
      placements.push({ type: 'F', position: 'after-section', sectionIndex: Math.min(1, sectionCount - 1) });
    } else if (config.platformMockup) {
      placements.push({ type: 'H', position: 'after-section', sectionIndex: Math.min(1, sectionCount - 1) });
    }
    // Stats bar toward the end
    placements.push({
      type: 'I',
      position: 'after-section',
      sectionIndex: Math.max(2, Math.floor((2 * sectionCount) / 3)),
    });
  } else if (category === 'niche-seasonal') {
    // Category 3: A + E + B + J
    if (config.themedGrid) {
      placements.push({ type: 'E', position: 'after-section', sectionIndex: 0 });
    }
    if (config.productCards) {
      placements.push({
        type: 'B',
        position: 'after-section',
        sectionIndex: Math.max(1, Math.floor(sectionCount / 2)),
      });
    }
  } else if (category === 'how-to') {
    // Category 4: A + (D or G) + J
    if (config.difficultyTiers) {
      placements.push({
        type: 'D',
        position: 'after-section',
        sectionIndex: Math.max(1, Math.floor(sectionCount / 2)),
      });
    } else if (config.worksheetAnswerPair) {
      placements.push({
        type: 'G',
        position: 'after-section',
        sectionIndex: Math.max(1, Math.floor(sectionCount / 2)),
      });
    }
  }

  // Section J: CTA — EVERY post, before takeaways
  placements.push({ type: 'J', position: 'before-takeaways' });

  return placements;
}

/**
 * Build a map of text section index -> visual sections to insert AFTER that section.
 * Also returns sections for special positions (after-hero, after-intro, before-takeaways).
 */
export function buildInsertionMap(placements: SectionPlacement[]) {
  const afterHero: SectionPlacement[] = [];
  const afterIntro: SectionPlacement[] = [];
  const beforeTakeaways: SectionPlacement[] = [];
  const afterSection: Map<number, SectionPlacement[]> = new Map();

  for (const p of placements) {
    if (p.position === 'after-hero') {
      afterHero.push(p);
    } else if (p.position === 'after-intro') {
      afterIntro.push(p);
    } else if (p.position === 'before-takeaways') {
      beforeTakeaways.push(p);
    } else if (p.position === 'after-section' && p.sectionIndex !== undefined) {
      const list = afterSection.get(p.sectionIndex) || [];
      list.push(p);
      afterSection.set(p.sectionIndex, list);
    }
  }

  return { afterHero, afterIntro, beforeTakeaways, afterSection };
}
