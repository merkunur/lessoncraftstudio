const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update existing user with new password
      await prisma.user.update({
        where: { email },
        data: {
          passwordHash: hashedPassword,
          isAdmin: true,
          emailVerified: true
        }
      });
      console.log('\n✅ User updated!');
    } else {
      // Create new user
      await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          firstName: 'Test',
          lastName: 'User',
          isAdmin: true,
          emailVerified: true
        }
      });
      console.log('\n✅ User created!');
    }

    console.log('\nLogin credentials:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('\nSign in at: http://localhost:3000/en/auth/signin');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
