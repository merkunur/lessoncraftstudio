const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findUnique({
    where: { email: 'oliviaprincess@gmail.com' },
    include: { subscription: true }
  });

  console.log('=== CURRENT STATE ===');
  console.log('User tier:', user?.subscriptionTier);
  console.log('Has subscription:', !!user?.subscription);
  if (user?.subscription) {
    console.log('Subscription plan:', user.subscription.planName);
    console.log('Subscription status:', user.subscription.status);
  }

  await prisma.$disconnect();
}

check().catch(console.error);
