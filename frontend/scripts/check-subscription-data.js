const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@lessoncraftstudio.com' },
    select: {
      id: true,
      email: true,
      subscriptionTier: true,
      stripeCustomerId: true,
    }
  });

  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
  });

  console.log('==========================================');
  console.log('USER DATA:');
  console.log('  Email:', user.email);
  console.log('  Tier:', user.subscriptionTier);
  console.log('  Stripe Customer ID:', user.stripeCustomerId);
  console.log('');
  console.log('SUBSCRIPTION RECORD:');
  if (subscription) {
    console.log('  Database ID:', subscription.id);
    console.log('  Stripe Subscription ID:', subscription.stripeSubscriptionId || 'NULL');
    console.log('  Status:', subscription.status);
    console.log('  Tier:', subscription.tier);
  } else {
    console.log('  NO SUBSCRIPTION RECORD IN DATABASE');
  }
  console.log('==========================================');

  await prisma.$disconnect();
}

check().catch(console.error);
