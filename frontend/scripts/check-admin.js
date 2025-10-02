const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        isAdmin: true,
      },
    });

    console.log('\n=== Users in Database ===');
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.firstName}`);
      console.log(`Admin: ${user.isAdmin ? 'YES ✅' : 'NO ❌'}`);
      console.log('---');
    });

    if (users.length === 0) {
      console.log('⚠️  No users found in database');
    }

    // Check themes
    const themes = await prisma.imageTheme.count();
    console.log(`\nImage Themes: ${themes}`);

    // Check blog posts
    const posts = await prisma.blogPost.count();
    console.log(`Blog Posts: ${posts}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
