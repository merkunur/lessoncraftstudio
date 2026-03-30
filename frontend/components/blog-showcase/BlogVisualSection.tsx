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
      return (
        <HeroBanner
          images={config.heroImages}
          accentColor={config.accentColor}
          locale={locale}
        />
      );

    case 'B':
      if (!config.productCards) return null;
      return (
        <ProductCards
          items={config.productCards.items}
          locale={locale}
        />
      );

    case 'C':
      if (!config.beforeAfter) return null;
      return (
        <BeforeAfter
          lcsImage={config.beforeAfter.lcsImage}
          locale={locale}
        />
      );

    case 'D':
      if (!config.difficultyTiers) return null;
      return (
        <DifficultyTiers
          beginner={config.difficultyTiers.beginner}
          intermediate={config.difficultyTiers.intermediate}
          advanced={config.difficultyTiers.advanced}
          locale={locale}
          accentColor={config.accentColor}
        />
      );

    case 'E':
      if (!config.themedGrid) return null;
      return (
        <ThemedGrid
          images={config.themedGrid.images}
          locale={locale}
        />
      );

    case 'F':
      if (!config.bundle) return null;
      return (
        <BundleVisualization
          images={config.bundle.images}
          pageCount={config.bundle.pageCount}
          locale={locale}
        />
      );

    case 'G':
      if (!config.worksheetAnswerPair) return null;
      return (
        <WorksheetAnswerPair
          worksheet={config.worksheetAnswerPair.worksheet}
          answerKey={config.worksheetAnswerPair.answerKey}
          locale={locale}
        />
      );

    case 'H':
      if (!config.platformMockup) return null;
      return (
        <PlatformMockup
          platform={config.platformMockup.platform}
          image={config.platformMockup.image}
          locale={locale}
        />
      );

    case 'I':
      return <StatsBar locale={locale} />;

    case 'J':
      return (
        <CtaWithSample
          image={config.ctaSample}
          locale={locale}
          ctaHeading={content.cta?.heading || ''}
          ctaDescription={content.cta?.description || ''}
          ctaButtonText={content.cta?.buttonText || ''}
          ctaButtonUrl={content.cta?.buttonUrl || '/apps'}
        />
      );

    default:
      return null;
  }
}
