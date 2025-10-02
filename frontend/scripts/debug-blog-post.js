const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugBlogPost() {
  try {
    const post = await prisma.blogPost.findFirst();
    console.log('\n📝 Blog Post Structure:');
    console.log(JSON.stringify(post, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugBlogPost();
