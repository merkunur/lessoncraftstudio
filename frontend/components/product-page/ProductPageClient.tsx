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
  // SEO Metadata - used for routing and hreflang
  // Optional for backwards compatibility during migration to language-specific slugs
  seo?: {
    slug: string;           // Language-specific slug (e.g., 'ordletar-arbetsblad' for Swedish)
    appId: string;          // Internal app identifier (e.g., 'word-search')
    title: string;          // SEO title
    description: string;    // Meta description
    keywords?: string;      // Meta keywords
    canonicalUrl?: string;  // Canonical URL
  };

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
    readMoreLabel?: string;
    showLessLabel?: string;
    floatingStats?: {
      time: string;
      action: string;
      quality: string;
    };
  };

  // Sample Gallery
  samples: {
    sectionTitle: string;
    sectionDescription?: string;
    downloadLabel?: string;
    worksheetLabel?: string;
    answerKeyLabel?: string;
    viewAllLabel?: string;
    noPdfLabel?: string;
    freePdfCountLabel?: string;
    badgeText?: string;
    downloadingLabel?: string;
    ofLabel?: string;
    items: Sample[];
  };

  // Features Grid (optional for partial content)
  features?: {
    sectionTitle: string;
    sectionDescription?: string;
    highlightBadgeText?: string;
    readMoreLabel?: string;
    showLessLabel?: string;
    badgeText?: string;
    trustBadges?: {
      allFeatures: string;
      noHiddenFees: string;
      cancelAnytime: string;
    };
    items: Feature[];
  };

  // How-To Guide (optional for partial content)
  howTo?: {
    sectionTitle: string;
    sectionDescription?: string;
    ctaText?: string;
    badgeText?: string;
    stepLabel?: string;
    completionTitle?: string;
    completionSubtitle?: string;
    readyTime?: string;
    noSkillsNeeded?: string;
    readMoreLabel?: string;
    showLessLabel?: string;
    steps: Step[];
  };

  // Use Cases (optional for partial content)
  useCases?: {
    sectionTitle: string;
    sectionDescription?: string;
    badgeText?: string;
    readMoreLabel?: string;
    showLessLabel?: string;
    items: UseCase[];
    ctaText?: string;
    bundleDescription?: string;
    bundleApps?: string[];
    benefits?: string[];
  };

  // FAQ Section (optional for partial content)
  faq?: {
    sectionTitle: string;
    sectionDescription?: string;
    showMoreText?: string;
    showLessText?: string;
    badgeText?: string;
    readMoreLabel?: string;
    showLessLabel?: string;
    secureCheckout?: string;
    cancelAnytime?: string;
    items: FAQItem[];
  };

  // Pricing (for FAQ section sidebar, optional for partial content)
  pricing?: {
    title: string;
    price: string;
    priceInterval: string;
    priceSuffix?: string;
    benefits: string[];
    ctaText: string;
    guaranteeText?: string;
    bundleDescription?: string;
    bundleApps?: string[];
  };

  // Related Apps (optional for partial content)
  relatedApps?: {
    sectionTitle: string;
    sectionDescription?: string;
    items: RelatedApp[];
    ctaTitle?: string;
    ctaDescription?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
    badgeText?: string;
    exploreText?: string;
    trustBadges?: {
      guarantee?: string;
      securePayment: string;
      cancelAnytime: string;
    };
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
        readMoreLabel={content.hero.readMoreLabel}
        showLessLabel={content.hero.showLessLabel}
        floatingStats={content.hero.floatingStats}
      />

      {/* Part 2: Sample Gallery */}
      {/* Dynamic mode: use appId if available, falls back to static samples */}
      {(content.seo?.appId || content.samples.items.length > 0) && (
        <SampleGallery
          locale={locale}
          appId={content.seo?.appId}  // Enables dynamic loading from content manager
          sectionTitle={content.samples.sectionTitle}
          sectionDescription={content.samples.sectionDescription}
          downloadLabel={content.samples.downloadLabel}
          worksheetLabel={content.samples.worksheetLabel}
          answerKeyLabel={content.samples.answerKeyLabel}
          viewAllLabel={content.samples.viewAllLabel}
          noPdfLabel={content.samples.noPdfLabel}
          freePdfCountLabel={content.samples.freePdfCountLabel}
          badgeText={content.samples.badgeText}
          downloadingLabel={content.samples.downloadingLabel}
          ofLabel={content.samples.ofLabel}
          samples={content.samples.items}  // Fallback to static samples if no dynamic ones
        />
      )}

      {/* Part 3: Features Grid (optional) */}
      {content.features && (
        <FeaturesGrid
          locale={locale}
          sectionTitle={content.features.sectionTitle}
          sectionDescription={content.features.sectionDescription}
          features={content.features.items}
          highlightBadgeText={content.features.highlightBadgeText}
          readMoreLabel={content.features.readMoreLabel}
          showLessLabel={content.features.showLessLabel}
          badgeText={content.features.badgeText}
          trustBadges={content.features.trustBadges}
        />
      )}

      {/* Part 4: How-To Guide (optional) */}
      {content.howTo && (
        <HowToGuide
          locale={locale}
          sectionTitle={content.howTo.sectionTitle}
          sectionDescription={content.howTo.sectionDescription}
          steps={content.howTo.steps}
          ctaText={content.howTo.ctaText}
          ctaHref={`/${locale}/auth/signup`}
          badgeText={content.howTo.badgeText}
          stepLabel={content.howTo.stepLabel}
          completionTitle={content.howTo.completionTitle}
          completionSubtitle={content.howTo.completionSubtitle}
          readyTime={content.howTo.readyTime}
          noSkillsNeeded={content.howTo.noSkillsNeeded}
          readMoreLabel={content.howTo.readMoreLabel}
          showLessLabel={content.howTo.showLessLabel}
        />
      )}

      {/* Part 5: Use Cases (optional) */}
      {content.useCases && (
        <UseCases
          locale={locale}
          sectionTitle={content.useCases.sectionTitle}
          sectionDescription={content.useCases.sectionDescription}
          useCases={content.useCases.items}
          badgeText={content.useCases.badgeText}
          readMoreLabel={content.useCases.readMoreLabel}
          showLessLabel={content.useCases.showLessLabel}
        />
      )}

      {/* Part 6: FAQ & Subscription (optional) */}
      {content.faq && content.pricing && (
        <FAQSection
          locale={locale}
          sectionTitle={content.faq.sectionTitle}
          sectionDescription={content.faq.sectionDescription}
          faqs={content.faq.items}
          showMoreText={content.faq.showMoreText}
          showLessText={content.faq.showLessText}
          badgeText={content.faq.badgeText}
          readMoreLabel={content.faq.readMoreLabel}
          showLessLabel={content.faq.showLessLabel}
          secureCheckout={content.faq.secureCheckout}
          cancelAnytime={content.faq.cancelAnytime}
          pricingTitle={content.pricing.title}
          price={content.pricing.price}
          priceInterval={content.pricing.priceInterval}
          priceSuffix={content.pricing.priceSuffix}
          benefits={content.pricing.benefits}
          ctaText={content.pricing.ctaText}
          ctaHref={`/${locale}/auth/signup`}
          guaranteeText={content.pricing.guaranteeText}
          bundleDescription={content.pricing.bundleDescription}
          bundleApps={content.pricing.bundleApps}
        />
      )}

      {/* Part 7: Related Apps & CTA (optional) */}
      {content.relatedApps && (
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
          badgeText={content.relatedApps.badgeText}
          exploreText={content.relatedApps.exploreText}
          trustBadges={content.relatedApps.trustBadges}
        />
      )}
    </main>
  );
}
