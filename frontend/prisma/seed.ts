import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password for all test users
  const passwordHash = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'admin@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'full',
      isAdmin: true,
      language: 'en',
      timezone: 'America/New_York',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create Full Tier User
  const fullUser = await prisma.user.upsert({
    where: { email: 'full@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'full@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Full',
      lastName: 'Subscriber',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'full',
      isAdmin: false,
      language: 'en',
      timezone: 'America/Los_Angeles',
    },
  });
  console.log('✅ Created full tier user:', fullUser.email);

  // Create Core Tier User
  const coreUser = await prisma.user.upsert({
    where: { email: 'core@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'core@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Core',
      lastName: 'Subscriber',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'core',
      isAdmin: false,
      language: 'en',
      timezone: 'America/Chicago',
    },
  });
  console.log('✅ Created core tier user:', coreUser.email);

  // Create Free Tier User
  const freeUser = await prisma.user.upsert({
    where: { email: 'free@lessoncraftstudio.com' },
    update: {},
    create: {
      email: 'free@lessoncraftstudio.com',
      passwordHash,
      firstName: 'Free',
      lastName: 'User',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      subscriptionTier: 'free',
      isAdmin: false,
      language: 'en',
      timezone: 'UTC',
    },
  });
  console.log('✅ Created free tier user:', freeUser.email);

  console.log('\n🎉 Seeding completed!');
  console.log('\n📝 Test Users Created:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: admin@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: full | Admin: ✅');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: full@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: full | Admin: ❌');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: core@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: core | Admin: ❌');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Email: free@lessoncraftstudio.com');
  console.log('Password: password123');
  console.log('Tier: free | Admin: ❌');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
