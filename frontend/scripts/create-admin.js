const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { isAdmin: true }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   ID: ${existingAdmin.id}`);
      console.log(`   Email Verified: ${existingAdmin.emailVerified}`);
      return;
    }

    // Check if any user exists
    const anyUser = await prisma.user.findFirst();

    if (anyUser) {
      // Make first user admin
      await prisma.user.update({
        where: { id: anyUser.id },
        data: {
          isAdmin: true,
          emailVerified: true
        }
      });
      console.log('✅ Made existing user admin:');
      console.log(`   Email: ${anyUser.email}`);
      console.log(`   Password: (use your existing password)`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const admin = await prisma.user.create({
        data: {
          email: 'admin@lessoncraftstudio.com',
          passwordHash: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          isAdmin: true,
          emailVerified: true,
          subscriptionTier: 'full'
        }
      });

      console.log('✅ Created new admin user:');
      console.log(`   Email: admin@lessoncraftstudio.com`);
      console.log(`   Password: admin123`);
      console.log(`   ID: ${admin.id}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
