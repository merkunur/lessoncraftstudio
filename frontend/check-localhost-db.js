const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const content = await prisma.homepageContent.findUnique({ 
      where: { id: 'homepage' } 
    });
    
    console.log('=== LOCALHOST DATABASE CHECK ===');
    console.log('Database state:', content ? 'HAS CONTENT' : 'EMPTY');
    
    if (content) {
      console.log('Samples count:', content.content?.samples?.length || 0);
      console.log('First 5 sample IDs:', content.content?.samples?.slice(0, 5).map(s => s.id).join(', '));
      console.log('First sample name:', content.content?.samples?.[0]?.name?.en);
    }
    
    await prisma.$disconnect();
  } catch(e) {
    console.error('Error:', e.message);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
