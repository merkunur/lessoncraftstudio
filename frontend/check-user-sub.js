const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser() {
  const userEmail = 'oliviaprincess@gmail.com';

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      subscription: true,
    },
  });

  if (!user) {
    console.log('User not found');
    return;
  }

  console.log('\n=== USER DATA ===');
  console.log('Email:', user.email);
  console.log('Subscription Tier (user.subscriptionTier):', user.subscriptionTier);
  console.log('\n=== SUBSCRIPTION RECORDS ===');
  if (user.subscription) {
    console.log('Found subscription record:');
    console.log('  Plan Name:', user.subscription.planName);
    console.log('  Status:', user.subscription.status);
    console.log('  Stripe ID:', user.subscription.stripeSubscriptionId);
  } else {
    console.log('No subscription record found (this is correct for manual upgrades)');
  }

  await prisma.$disconnect();
}

checkUser().catch(console.error);
