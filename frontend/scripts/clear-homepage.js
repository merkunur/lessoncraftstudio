const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Clearing HomepageContent table...');
    await prisma.homepageContent.deleteMany({});
    console.log('Homepage content cleared successfully!');
    console.log('The database will automatically reinitialize with 33 samples on next API call.');
  } catch (error) {
    console.error('Error clearing homepage content:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
