import { homepageContentManager } from '../lib/homepage-content-manager';

async function initializeHomepageContent() {
  console.log('🚀 Initializing homepage content...');

  try {
    // Get homepage content (this will load defaults if database is empty)
    const content = await homepageContentManager.getHomepageContent('en');

    console.log('✅ Homepage content initialized successfully!');
    console.log('📝 Content includes:');
    console.log(`   - Hero section: ${content.hero?.title?.en || 'N/A'}`);
    console.log(`   - Features: ${content.features?.length || 0} items`);
    console.log(`   - Worksheet Samples: ${content.samples?.length || 0} samples`);
    console.log(`   - Pricing tiers: ${content.pricing?.length || 0} tiers`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing homepage content:', error);
    process.exit(1);
  }
}

initializeHomepageContent();
