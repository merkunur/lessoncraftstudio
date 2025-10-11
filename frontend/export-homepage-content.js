const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

(async () => {
  try {
    const content = await prisma.homepageContent.findUnique({ 
      where: { id: 'homepage' } 
    });
    
    if (content) {
      // Export to JSON file
      fs.writeFileSync(
        'homepage-content-export.json',
        JSON.stringify(content.content, null, 2)
      );
      console.log('✅ Exported homepage content to homepage-content-export.json');
      console.log('Samples count:', content.content?.samples?.length || 0);
    } else {
      console.log('❌ No content found in database');
    }
    
    await prisma.$disconnect();
  } catch(e) {
    console.error('Error:', e.message);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
