const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    const devEmail = 'admin@example.com';
    const devPassword = 'admin123';

    // Check if dev-admin user exists by email
    const existing = await prisma.user.findUnique({
      where: { email: devEmail }
    });

    // Hash the password
    const passwordHash = await bcrypt.hash(devPassword, 10);

    if (existing) {
      // Update the existing user with proper password
      const updated = await prisma.user.update({
        where: { email: devEmail },
        data: {
          passwordHash,
          isAdmin: true,
          firstName: 'Admin',
          lastName: 'User'
        }
      });
      console.log('✅ Updated dev-admin user with proper password');
      console.log('📧 Email: ' + devEmail);
      console.log('🔑 Password: ' + devPassword);
      return;
    }

    // Create dev-admin user
    const user = await prisma.user.create({
      data: {
        email: devEmail,
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true,
        passwordHash,
      }
    });

    console.log('✅ Created dev-admin user');
    console.log('📧 Email: ' + devEmail);
    console.log('🔑 Password: ' + devPassword);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code === 'P2002') {
      console.log('ℹ️ User with this email already exists');
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
