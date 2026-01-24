/**
 * Generate admin auth token for import script
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function getAdminToken() {
  try {
    // Find admin user
    const user = await prisma.user.findUnique({
      where: { email: 'admin@lessoncraftstudio.com' }
    });

    if (!user) {
      console.error('❌ Admin user not found');
      process.exit(1);
    }

    // Verify password
    const passwordMatch = await bcrypt.compare('Letsplaywise@34', user.password);
    if (!passwordMatch) {
      console.error('❌ Invalid password');
      process.exit(1);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-secret-key-here',
      { expiresIn: '24h' }
    );

    console.log(token);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

getAdminToken();
