/**
 * BlogVisualSection — Dispatcher component.
 * Renders the correct visual section component based on the section type.
 */

import type { VisualSectionType, BlogVisualConfig } from '@/config/blog-visual-sections/types';
import type { BlogContent } from '@/config/blog-content/types';
import HeroBanner from './HeroBanner';
import ProductCards from './ProductCards';
import BeforeAfter from './BeforeAfter';
import DifficultyTiers from './DifficultyTiers';
import ThemedGrid from './ThemedGrid';
import BundleVisualization from './BundleVisualization';
import WorksheetAnswerPair from './WorksheetAnswerPair';
import PlatformMockup from './PlatformMockup';
import StatsBar from './StatsBar';
import CtaWithSample from './CtaWithSample';

interface BlogVisualSectionProps {
  type: VisualSectionType;
  config: BlogVisualConfig;
  content: BlogContent;
  locale: string;
}

export default function BlogVisualSection({ type, config, content, locale }: BlogVisualSectionProps) {
  switch (type) {
    case 'A':
      return <HeroBanner images={config.heroImages} accentColor={config.accentColor} locale={locale} />;
    case 'B':
      return config.productCards ? <ProductCards items={config.productCards.items} locale={locale} /> : null;
    case 'C':
      return config.beforeAfter ? <BeforeAfter lcsImage={config.beforeAfter.lcsImage} locale={locale} /> : null;
    case 'D':
      return config.difficultyTiers ? <DifficultyTiers beginner={config.difficultyTiers.beginner} intermediate={config.difficultyTiers.intermediate} advanced={config.difficultyTiers.advanced} locale={locale} accentColor={config.accentColor} /> : null;
    case 'E':
      return config.themedGrid ? <ThemedGrid images={config.themedGrid.images} locale={locale} /> : null;
    case 'F':
      return config.bundle ? <BundleVisualization images={config.bundle.images} pageCount={config.bundle.pageCount} locale={locale} /> : null;
    case 'G':
      return config.worksheetAnswerPair ? <WorksheetAnswerPair worksheet={config.worksheetAnswerPair.worksheet} answerKey={config.worksheetAnswerPair.answerKey} locale={locale} /> : null;
    case 'H':
      return config.platformMockup ? <PlatformMockup platform={config.platformMockup.platform} image={config.platformMockup.image} locale={locale} /> : null;
    case 'I':
      return <StatsBar locale={locale} />;
    case 'J':
      return <CtaWithSample image={config.ctaSample} locale={locale} ctaHeading={content.cta?.heading || ''} ctaDescription={content.cta?.description || ''} ctaButtonText={content.cta?.buttonText || ''} ctaButtonUrl={content.cta?.buttonUrl || '/apps'} />;
    default:
      return null;
  }
}
