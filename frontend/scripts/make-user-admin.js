const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function makeUserAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.log('Usage: node scripts/make-user-admin.js <email>');
    console.log('Example: node scripts/make-user-admin.js user@example.com');
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return;
    }

    await prisma.user.update({
      where: { email },
      data: {
        isAdmin: true,
        emailVerified: true
      }
    });

    console.log(`✅ User is now admin: ${email}`);
    console.log('   Please refresh your browser and you should have admin access!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

makeUserAdmin();
