const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Delete all sessions for the admin user
  const result = await prisma.session.deleteMany({
    where: {
      userId: 'cmggy1i8l0000da8gjytjxk2x' // Admin user ID from logs
    }
  });

  console.log(`✅ Deleted ${result.count} sessions`);
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
