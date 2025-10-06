const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if dev-admin user exists
    const existing = await prisma.user.findUnique({
      where: { id: 'dev-admin' }
    });

    if (existing) {
      console.log('✅ dev-admin user already exists');
      return;
    }

    // Create dev-admin user
    const user = await prisma.user.create({
      data: {
        id: 'dev-admin',
        email: 'dev@localhost',
        firstName: 'Dev',
        lastName: 'Admin',
        isAdmin: true,
        passwordHash: 'dev-only-no-real-password',
        // Add any other required fields based on your User model
      }
    });

    console.log('✅ Created dev-admin user:', user);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code === 'P2002') {
      console.log('ℹ️ User with email dev@localhost already exists');
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
