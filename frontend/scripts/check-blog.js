const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkBlog() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        _count: {
          select: { pdfs: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n📝 Blog Posts in Database:');
    if (posts.length === 0) {
      console.log('   No blog posts yet.\n');
    } else {
      posts.forEach(post => {
        console.log(`\n   📄 ${post.translations.en?.title || post.slug}`);
        console.log(`      Slug: ${post.slug}`);
        console.log(`      Status: ${post.status}`);
        console.log(`      Featured: ${post.featured ? 'Yes' : 'No'}`);
        console.log(`      PDFs: ${post._count.pdfs}`);
        console.log(`      Created: ${post.createdAt.toISOString().split('T')[0]}`);
      });
      console.log('');
    }

    console.log(`\n📊 Total: ${posts.length} blog posts\n`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlog();
