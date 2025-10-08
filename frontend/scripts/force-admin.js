const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function forceAdmin() {
  try {
    // Make ALL users admin temporarily so you can definitely log in
    await prisma.user.updateMany({
      data: {
        isAdmin: true,
        emailVerified: true
      }
    });

    console.log('✅ ALL users are now admin!');
    console.log('');
    console.log('NEXT STEPS:');
    console.log('1. Go to http://localhost:3000');
    console.log('2. Sign OUT completely');
    console.log('3. Sign back IN with ANY account');
    console.log('4. You will now have admin access!');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

forceAdmin();
