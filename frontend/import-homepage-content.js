const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

(async () => {
  try {
    const contentData = JSON.parse(
      fs.readFileSync('homepage-content-export.json', 'utf8')
    );
    
    console.log('Importing homepage content...');
    console.log('Samples count:', contentData.samples?.length || 0);
    console.log('First 5 IDs:', contentData.samples?.slice(0, 5).map(s => s.id).join(', '));
    
    await prisma.homepageContent.deleteMany();
    
    await prisma.homepageContent.create({
      data: {
        id: 'homepage',
        content: contentData
      }
    });
    
    console.log('Homepage content imported successfully!');
    
    const verify = await prisma.homepageContent.findUnique({
      where: { id: 'homepage' }
    });
    console.log('Verified - Samples in DB:', verify?.content?.samples?.length || 0);
    
    await prisma.$disconnect();
  } catch(e) {
    console.error('Error:', e.message);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
