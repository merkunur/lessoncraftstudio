import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@localhost.com';
  const password = 'admin123';

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create or update admin user
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      isAdmin: true,
      emailVerified: true,
    },
    create: {
      email,
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
      emailVerified: true,
      language: 'en',
    },
  });

  console.log('✅ Admin user created/updated:');
  console.log('   Email:', email);
  console.log('   Password:', password);
  console.log('   User ID:', user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
