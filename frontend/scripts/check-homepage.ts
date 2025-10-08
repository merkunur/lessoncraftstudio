import { prisma } from '../lib/prisma';

async function checkHomepage() {
  try {
    const content = await prisma.homepageContent.findUnique({
      where: { id: 'homepage' }
    });

    if (!content) {
      console.log('❌ No homepage content found in database');
      return;
    }

    console.log('✅ Homepage content exists');
    const data: any = content.content;
    console.log('📊 Content structure:');
    console.log('  - Hero:', !!data.hero);
    console.log('  - Features:', data.features?.length || 0);
    console.log('  - Samples:', data.samples?.length || 0);
    console.log('  - Pricing:', data.pricing?.length || 0);
    console.log('  - samplesSection:', !!data.samplesSection);

    if (data.samples && data.samples.length > 0) {
      console.log('\n📝 First sample:');
      console.log('  ', JSON.stringify(data.samples[0], null, 2).substring(0, 200));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkHomepage();
