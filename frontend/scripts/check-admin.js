const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    // List all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        isAdmin: true,
        emailVerified: true
      }
    });

    console.log('\n📋 All users in database:\n');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Admin: ${user.isAdmin ? '✅ YES' : '❌ NO'}`);
      console.log(`   Email Verified: ${user.emailVerified ? '✅ YES' : '❌ NO'}`);
      console.log('');
    });

    const adminCount = users.filter(u => u.isAdmin).length;
    console.log(`Total users: ${users.length}`);
    console.log(`Admin users: ${adminCount}\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
