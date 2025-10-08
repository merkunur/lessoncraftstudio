const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        emailVerified: true,
        subscriptionTier: true,
        isAdmin: true,
        createdAt: true
      }
    });

    console.log('=== USERS IN DATABASE ===');
    console.log(`Total users: ${users.length}\n`);

    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log(`Admin: ${user.isAdmin}`);
      console.log(`Email Verified: ${user.emailVerified}`);
      console.log(`Subscription: ${user.subscriptionTier}`);
      console.log(`Created: ${user.createdAt}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
