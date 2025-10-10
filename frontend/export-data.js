const { PrismaClient } = require('@prisma/client');
  const fs = require('fs');

  const prisma = new PrismaClient();

  async function exportData() {
    console.log('Exporting data from localhost...');

    const data = {
      imageThemes: await prisma.imageTheme.findMany(),
      imageLibraryItems: await prisma.imageLibraryItem.findMany(),
      blogCategories: await prisma.blogCategory.findMany(),
      blogPosts: await prisma.blogPost.findMany({ include: { categories: true, tags: true } }),
      blogTags: await prisma.blogTag.findMany(),
      sampleWorksheets: await prisma.sampleWorksheet.findMany(),
      homepageContent: await prisma.homepageContent.findMany(),
    };

    fs.writeFileSync('production_data.json', JSON.stringify(data, null, 2));
    console.log('✅ Data exported to production_data.json');
    console.log(`- ${data.imageThemes.length} themes`);
    console.log(`- ${data.imageLibraryItems.length} images`);
    console.log(`- ${data.blogCategories.length} blog categories`);
    console.log(`- ${data.blogPosts.length} blog posts`);
    console.log(`- ${data.sampleWorksheets.length} sample worksheets`);

    await prisma.$disconnect();
  }

  exportData().catch(console.error);