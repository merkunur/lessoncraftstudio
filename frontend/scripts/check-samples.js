const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSamples() {
  try {
    const content = await prisma.homepageContent.findUnique({
      where: { id: 'homepage' }
    });

    if (!content) {
      console.log('❌ No homepage content found');
      return;
    }

    const data = content.content;

    if (data.samples && data.samples.length > 0) {
      console.log('=== FIRST SAMPLE STRUCTURE ===');
      const firstSample = data.samples[0];
      console.log('\nSample ID:', firstSample.id);
      console.log('\nName type:', typeof firstSample.name);
      console.log('Name value:', JSON.stringify(firstSample.name, null, 2));
      console.log('\nDescription type:', typeof firstSample.description);
      console.log('Description value:', JSON.stringify(firstSample.description, null, 2));
      console.log('\nAge Range type:', typeof firstSample.age_range);
      console.log('Age Range value:', JSON.stringify(firstSample.age_range, null, 2));
    } else {
      console.log('❌ No samples found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSamples();
