'use client';

import HeroSection from './HeroSection';
import SampleGallery from './SampleGallery';
import FeaturesGrid from './FeaturesGrid';
import HowToGuide from './HowToGuide';
import UseCases from './UseCases';
import FAQSection from './FAQSection';
import RelatedApps from './RelatedApps';

// Type definitions for page content
export interface Sample {
  id: string;
  worksheetSrc: string;
  answerKeySrc: string;
  altText: string;
  pdfDownloadUrl?: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface UseCase {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RelatedApp {
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export interface ProductPageContent {
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    previewImageSrc?: string;
    ctaLabels?: {
      tryFree: string;
      viewSamples: string;
    };
    trustBadges?: {
      languages: string;
      images: string;
      license: string;
    };
  };

  // Sample Gallery
  samples: {
    sectionTitle: string;
    downloadLabel?: string;
    worksheetLabel?: string;
    answerKeyLabel?: string;
    items: Sample[];
  };

  // Features Grid
  features: {
    sectionTitle: string;
    sectionDescription?: string;
    highlightBadgeText?: string;
    items: Feature[];
  };

  // How-To Guide
  howTo: {
    sectionTitle: string;
    sectionDescription?: string;
    ctaText?: string;
    steps: Step[];
  };

  // Use Cases
  useCases: {
    sectionTitle: string;
    sectionDescription?: string;
    items: UseCase[];
  };

  // FAQ Section
  faq: {
    sectionTitle: string;
    sectionDescription?: string;
    showMoreText?: string;
    showLessText?: string;
    items: FAQItem[];
  };

  // Pricing (for FAQ section sidebar)
  pricing: {
    title: string;
    price: string;
    priceInterval: string;
    priceSuffix?: string;
    benefits: string[];
    ctaText: string;
    guaranteeText?: string;
  };

  // Related Apps
  relatedApps: {
    sectionTitle: string;
    sectionDescription?: string;
    items: RelatedApp[];
    ctaTitle?: string;
    ctaDescription?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
  };
}

interface ProductPageClientProps {
  locale: string;
  content: ProductPageContent;
}

export default function ProductPageClient({
  locale,
  content,
}: ProductPageClientProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Part 1: Hero Section */}
      <HeroSection
        locale={locale}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        previewImageSrc={content.hero.previewImageSrc || ''}
        ctaLabels={content.hero.ctaLabels}
        trustBadges={content.hero.trustBadges}
      />

      {/* Part 2: Sample Gallery */}
      {content.samples.items.length > 0 && (
        <SampleGallery
          locale={locale}
          sectionTitle={content.samples.sectionTitle}
          downloadLabel={content.samples.downloadLabel}
          worksheetLabel={content.samples.worksheetLabel}
          answerKeyLabel={content.samples.answerKeyLabel}
          samples={content.samples.items}
        />
      )}

      {/* Part 3: Features Grid */}
      <FeaturesGrid
        locale={locale}
        sectionTitle={content.features.sectionTitle}
        sectionDescription={content.features.sectionDescription}
        features={content.features.items}
        highlightBadgeText={content.features.highlightBadgeText}
      />

      {/* Part 4: How-To Guide */}
      <HowToGuide
        locale={locale}
        sectionTitle={content.howTo.sectionTitle}
        sectionDescription={content.howTo.sectionDescription}
        steps={content.howTo.steps}
        ctaText={content.howTo.ctaText}
        ctaHref={`/${locale}/auth/signup`}
      />

      {/* Part 5: Use Cases */}
      <UseCases
        locale={locale}
        sectionTitle={content.useCases.sectionTitle}
        sectionDescription={content.useCases.sectionDescription}
        useCases={content.useCases.items}
      />

      {/* Part 6: FAQ & Subscription */}
      <FAQSection
        locale={locale}
        sectionTitle={content.faq.sectionTitle}
        sectionDescription={content.faq.sectionDescription}
        faqs={content.faq.items}
        showMoreText={content.faq.showMoreText}
        showLessText={content.faq.showLessText}
        pricingTitle={content.pricing.title}
        price={content.pricing.price}
        priceInterval={content.pricing.priceInterval}
        priceSuffix={content.pricing.priceSuffix}
        benefits={content.pricing.benefits}
        ctaText={content.pricing.ctaText}
        ctaHref={`/${locale}/auth/signup`}
        guaranteeText={content.pricing.guaranteeText}
      />

      {/* Part 7: Related Apps & CTA */}
      <RelatedApps
        locale={locale}
        sectionTitle={content.relatedApps.sectionTitle}
        sectionDescription={content.relatedApps.sectionDescription}
        apps={content.relatedApps.items}
        ctaTitle={content.relatedApps.ctaTitle}
        ctaDescription={content.relatedApps.ctaDescription}
        primaryCtaText={content.relatedApps.primaryCtaText}
        primaryCtaHref={`/${locale}/auth/signup`}
        secondaryCtaText={content.relatedApps.secondaryCtaText}
        secondaryCtaHref={`/${locale}/apps`}
      />
    </main>
  );
}
