const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    const email = process.argv[2] || 'test@example.com';

    console.log(`\nMaking ${email} an admin...`);

    const user = await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
      select: {
        email: true,
        firstName: true,
        isAdmin: true,
      },
    });

    console.log('\n✅ Success!');
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.firstName}`);
    console.log(`Admin: ${user.isAdmin ? 'YES ✅' : 'NO ❌'}`);
    console.log('\nYou can now access:');
    console.log('- Image Library: http://localhost:3003/en/admin/images');
    console.log('- Blog Manager: http://localhost:3003/en/admin/blog');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nUsage: node scripts/make-admin.js <email>');
    console.log('Example: node scripts/make-admin.js test@example.com');
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
