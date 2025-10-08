const {prisma} = require('../lib/prisma');

async function check() {
  try {
    const content = await prisma.homepageContent.findUnique({where: {id: 'homepage'}});
    const data = content.content;

    console.log('=== PRICING STRUCTURE DEBUG ===');
    if (data.pricing && data.pricing[0]) {
      const firstTier = data.pricing[0];
      console.log('\nFirst pricing tier name:', firstTier.name);
      console.log('Features type:', typeof firstTier.features);
      console.log('Features is array?:', Array.isArray(firstTier.features));

      if (typeof firstTier.features === 'object' && !Array.isArray(firstTier.features)) {
        console.log('\n⚠️  PROBLEM: Features is an object, not an array!');
        console.log('Features keys:', Object.keys(firstTier.features));
        console.log('Features.en:', firstTier.features.en);
        console.log('\nEach feature item:');
        if (firstTier.features.en && Array.isArray(firstTier.features.en)) {
          firstTier.features.en.slice(0, 2).forEach((f, i) => {
            console.log(`  [${i}] type:`, typeof f, '  value:', f);
          });
        }
      } else if (Array.isArray(firstTier.features)) {
        console.log('\n✓ Features is an array');
        console.log('First 2 features:', firstTier.features.slice(0, 2));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
