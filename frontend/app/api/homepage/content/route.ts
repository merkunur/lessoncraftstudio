import { NextRequest, NextResponse } from 'next/server';
import { homepageContentManager } from '@/lib/homepage-content-manager';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const raw = searchParams.get('raw') === 'true';

  try {
    const rawContent = await homepageContentManager.getHomepageContent(locale);

    // If raw is requested, return the multilingual data (for content manager)
    // This is used by the homepage-content-manager.html
    if (raw) {
      return NextResponse.json(rawContent);
    }

    // Extract locale-specific content
    const content = {
      navigation: rawContent.navigation || {
        logo: { text: 'LessonCraftStudio', image: '' },
        menuItems: {
          apps: { en: 'Apps' },
          pricing: { en: 'Pricing' },
          blog: { en: 'Blog' }
        },
        buttons: {
          signIn: { en: 'Sign In' },
          startFree: { en: 'Start Free' }
        }
      },
      hero: {
        title: rawContent.hero.title[locale] || rawContent.hero.title.en,
        subtitle: rawContent.hero.subtitle[locale] || rawContent.hero.subtitle.en,
        ctaButtons: {
          tryFree: rawContent.hero.cta_primary_text[locale] || rawContent.hero.cta_primary_text.en,
          viewApps: rawContent.hero.cta_secondary_text[locale] || rawContent.hero.cta_secondary_text.en
        }
      },
      features: {
        title: rawContent.featuresSection?.title[locale] || rawContent.featuresSection?.title.en || 'Everything You Need',
        items: rawContent.features.map(f => ({
          icon: f.icon,
          title: f.title[locale] || f.title.en,
          description: f.description[locale] || f.description.en
        }))
      },
      samples: rawContent.samples.map(s => ({
        id: s.id,
        name: s.name[locale] || s.name.en,
        description: s.description[locale] || s.description.en,
        category: s.category,
        difficulty: s.difficulty,
        ageRange: typeof s.age_range === 'object' ? ((s.age_range as any)[locale] || (s.age_range as any).en) : s.age_range,
        image: s.image_url
      })),
      samplesSection: {
        title: rawContent.samplesSection?.title[locale] || rawContent.samplesSection?.title.en || 'Worksheet Samples Gallery',
        subtitle: rawContent.samplesSection?.subtitle[locale] || rawContent.samplesSection?.subtitle.en || 'Click on any worksheet to see a larger preview',
        cta: rawContent.samplesSection?.cta[locale] || rawContent.samplesSection?.cta.en || 'Explore All 33 Worksheet Generators →',
        categories: rawContent.samplesSection?.categories
          ? Object.keys(rawContent.samplesSection.categories).reduce((acc, key) => {
              acc[key] = rawContent.samplesSection.categories[key][locale] || rawContent.samplesSection.categories[key].en;
              return acc;
            }, {} as Record<string, string>)
          : {},
        difficulties: rawContent.samplesSection?.difficulties
          ? Object.keys(rawContent.samplesSection.difficulties).reduce((acc, key) => {
              acc[key] = rawContent.samplesSection.difficulties[key][locale] || rawContent.samplesSection.difficulties[key].en;
              return acc;
            }, {} as Record<string, string>)
          : {},
        modalLabels: {
          ageRange: rawContent.samplesSection?.modalLabels?.ageRange?.[locale] || rawContent.samplesSection?.modalLabels?.ageRange?.en || 'Age Range',
          difficulty: rawContent.samplesSection?.modalLabels?.difficulty?.[locale] || rawContent.samplesSection?.modalLabels?.difficulty?.en || 'Difficulty',
          category: rawContent.samplesSection?.modalLabels?.category?.[locale] || rawContent.samplesSection?.modalLabels?.category?.en || 'Category'
        }
      },
      pricing: {
        title: rawContent.pricingSection?.title[locale] || rawContent.pricingSection?.title.en || 'Simple, Transparent Pricing',
        free: {
          name: rawContent.pricing.find(p => p.name.en === 'Free' || p.name.en === 'Free Tier')?.name[locale] || 'Free Tier',
          price: rawContent.pricing.find(p => p.name.en === 'Free' || p.name.en === 'Free Tier')?.price || '$0',
          period: '',
          features: rawContent.pricing.find(p => p.name.en === 'Free' || p.name.en === 'Free Tier')?.features[locale] || [],
          cta: rawContent.pricing.find(p => p.name.en === 'Free' || p.name.en === 'Free Tier')?.cta_text[locale] || 'Start Free'
        },
        core: {
          name: rawContent.pricing.find(p => p.name.en === 'Core Bundle')?.name[locale] || 'Core Bundle',
          price: rawContent.pricing.find(p => p.name.en === 'Core Bundle')?.price || '$15',
          period: rawContent.pricingSection?.periods?.month?.[locale] || '/month',
          features: rawContent.pricing.find(p => p.name.en === 'Core Bundle')?.features[locale] || [],
          cta: rawContent.pricing.find(p => p.name.en === 'Core Bundle')?.cta_text[locale] || 'Choose Core'
        },
        full: {
          name: rawContent.pricing.find(p => p.name.en === 'Full Access')?.name[locale] || 'Full Access',
          price: rawContent.pricing.find(p => p.name.en === 'Full Access')?.price || '$25',
          period: rawContent.pricingSection?.periods?.month?.[locale] || '/month',
          popular: rawContent.pricing.find(p => p.name.en === 'Full Access')?.badge_text[locale] || 'Most Popular',
          features: rawContent.pricing.find(p => p.name.en === 'Full Access')?.features[locale] || [],
          cta: rawContent.pricing.find(p => p.name.en === 'Full Access')?.cta_text[locale] || 'Get Full Access'
        }
      },
      footer: {
        companyName: rawContent.footer?.companyName?.[locale] || rawContent.footer?.companyName?.en || 'LessonCraftStudio',
        companyTagline: rawContent.footer?.companyTagline?.[locale] || rawContent.footer?.companyTagline?.en || 'Professional worksheet generators for educational publishers.',
        sections: {
          product: {
            title: rawContent.footer?.sections?.product?.title?.[locale] || rawContent.footer?.sections?.product?.title?.en || 'Product',
            links: {
              apps: rawContent.footer?.sections?.product?.links?.apps?.[locale] || rawContent.footer?.sections?.product?.links?.apps?.en || 'Apps',
              pricing: rawContent.footer?.sections?.product?.links?.pricing?.[locale] || rawContent.footer?.sections?.product?.links?.pricing?.en || 'Pricing',
              blog: rawContent.footer?.sections?.product?.links?.blog?.[locale] || rawContent.footer?.sections?.product?.links?.blog?.en || 'Blog'
            }
          },
          support: {
            title: rawContent.footer?.sections?.support?.title?.[locale] || rawContent.footer?.sections?.support?.title?.en || 'Support',
            links: {
              helpCenter: rawContent.footer?.sections?.support?.links?.helpCenter?.[locale] || rawContent.footer?.sections?.support?.links?.helpCenter?.en || 'Help Center',
              contact: rawContent.footer?.sections?.support?.links?.contact?.[locale] || rawContent.footer?.sections?.support?.links?.contact?.en || 'Contact',
              faq: rawContent.footer?.sections?.support?.links?.faq?.[locale] || rawContent.footer?.sections?.support?.links?.faq?.en || 'FAQ'
            }
          },
          legal: {
            title: rawContent.footer?.sections?.legal?.title?.[locale] || rawContent.footer?.sections?.legal?.title?.en || 'Legal',
            links: {
              terms: rawContent.footer?.sections?.legal?.links?.terms?.[locale] || rawContent.footer?.sections?.legal?.links?.terms?.en || 'Terms of Service',
              privacy: rawContent.footer?.sections?.legal?.links?.privacy?.[locale] || rawContent.footer?.sections?.legal?.links?.privacy?.en || 'Privacy Policy',
              license: rawContent.footer?.sections?.legal?.links?.license?.[locale] || rawContent.footer?.sections?.legal?.links?.license?.en || 'License Terms'
            }
          }
        },
        copyright: rawContent.footer?.copyright?.[locale] || rawContent.footer?.copyright?.en || '© 2024 LessonCraftStudio. All rights reserved.'
      },
      seo: {
        title: rawContent.seo?.title?.[locale] || rawContent.seo?.title?.en || 'LessonCraftStudio - Professional Worksheet Generator',
        description: rawContent.seo?.description?.[locale] || rawContent.seo?.description?.en || '33 powerful worksheet generators with 100+ themed images',
        keywords: rawContent.seo?.keywords?.[locale] || rawContent.seo?.keywords?.en || 'worksheet generator, educational resources'
      }
    };

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { section, content } = data;

    console.log('[Homepage Content API] POST request received:', { section, contentKeys: Object.keys(content || {}) });

    let success = false;

    switch (section) {
      case 'hero':
        success = await homepageContentManager.saveHeroSection(content);
        break;
      case 'navigation':
        success = await homepageContentManager.saveNavigationSection(content);
        break;
      case 'features':
        success = await homepageContentManager.saveFeaturesSection(content);
        break;
      case 'samples':
        success = await homepageContentManager.saveSamplesSection(content);
        break;
      case 'pricing':
        success = await homepageContentManager.savePricingSection(content);
        break;
      case 'footer':
        success = await homepageContentManager.saveFooterSection(content);
        break;
      case 'translations':
        success = await homepageContentManager.saveTranslationsSection(content);
        break;
      case 'seo':
        success = await homepageContentManager.saveSEOSection(content);
        break;
      case 'all':
        console.log('[Homepage Content API] Saving all content...');
        success = await homepageContentManager.saveAllContent(content);
        console.log('[Homepage Content API] Save all content result:', success);
        break;
      case 'feature':
        success = await homepageContentManager.saveFeature(content);
        break;
      case 'sample':
        success = await homepageContentManager.saveSample(content);
        break;
      case 'pricing':
        success = await homepageContentManager.savePricingTier(content);
        break;
      default:
        console.error('[Homepage Content API] Invalid section type:', section);
        return NextResponse.json(
          { error: 'Invalid section type' },
          { status: 400 }
        );
    }

    if (success) {
      console.log('[Homepage Content API] Save successful');
      return NextResponse.json({ success: true });
    } else {
      console.error('[Homepage Content API] Save failed - success=false');
      return NextResponse.json(
        { error: 'Failed to save content' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Homepage Content API] Exception during save:', error);
    return NextResponse.json(
      { error: `Failed to save homepage content: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const id = searchParams.get('id');

    if (!section || !id) {
      return NextResponse.json(
        { error: 'Missing section or id parameter' },
        { status: 400 }
      );
    }

    let success = false;

    switch (section) {
      case 'feature':
        success = await homepageContentManager.deleteFeature(id);
        break;
      case 'sample':
        success = await homepageContentManager.deleteSample(id);
        break;
      case 'pricing':
        success = await homepageContentManager.deletePricingTier(id);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid section type' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting homepage content:', error);
    return NextResponse.json(
      { error: 'Failed to delete homepage content' },
      { status: 500 }
    );
  }
}