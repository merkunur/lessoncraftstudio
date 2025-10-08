const {prisma} = require('../lib/prisma');

function checkForMultilingual(obj, path = '') {
  if (obj === null || obj === undefined) return;

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const keys = Object.keys(obj);
    // Check if this looks like a multilingual object
    if (keys.includes('en') && keys.includes('sv') && keys.includes('da') && keys.length === 11) {
      console.log(`⚠️  MULTILINGUAL OBJECT at: ${path || 'root'}`);
      console.log('   Keys:', keys.join(', '));
      console.log('   Sample value (en):', JSON.stringify(obj.en).substring(0, 100));
      console.log('');
      return;
    }

    // Recursively check all properties
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      checkForMultilingual(value, currentPath);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      checkForMultilingual(item, `${path}[${index}]`);
    });
  }
}

async function findMultilingual() {
  try {
    const content = await prisma.homepageContent.findUnique({where: {id: 'homepage'}});
    const data = content.content;

    console.log('=== SEARCHING FOR MULTILINGUAL OBJECTS ===\n');

    // Check specific sections
    console.log('Checking navigation...');
    checkForMultilingual(data.navigation, 'navigation');

    console.log('Checking hero...');
    checkForMultilingual(data.hero, 'hero');

    console.log('Checking features...');
    checkForMultilingual(data.features, 'features');

    console.log('Checking samples...');
    if (data.samples && data.samples[0]) {
      checkForMultilingual(data.samples[0], 'samples[0]');
    }

    console.log('Checking pricing...');
    if (data.pricing && data.pricing[0]) {
      checkForMultilingual(data.pricing[0], 'pricing[0]');
    }

    console.log('Checking pricingSection...');
    checkForMultilingual(data.pricingSection, 'pricingSection');

    console.log('Checking samplesSection...');
    checkForMultilingual(data.samplesSection, 'samplesSection');

    console.log('Checking footer...');
    checkForMultilingual(data.footer, 'footer');

    console.log('=== SEARCH COMPLETE ===');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findMultilingual();
