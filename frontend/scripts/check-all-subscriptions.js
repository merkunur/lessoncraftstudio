const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAll() {
  console.log('==========================================');
  console.log('CHECKING ALL USERS AND SUBSCRIPTIONS');
  console.log('==========================================\n');

  // Find admin user
  const user = await prisma.user.findUnique({
    where: { email: 'admin@lessoncraftstudio.com' },
    select: {
      id: true,
      email: true,
      subscriptionTier: true,
      stripeCustomerId: true,
    }
  });

  console.log('USER DATA:');
  console.log('  User ID:', user.id);
  console.log('  Email:', user.email);
  console.log('  Tier:', user.subscriptionTier);
  console.log('  Stripe Customer ID:', user.stripeCustomerId);
  console.log('');

  // Check ALL subscriptions for this user (regardless of status)
  const allSubscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`SUBSCRIPTION RECORDS (${allSubscriptions.length} total):`);
  if (allSubscriptions.length === 0) {
    console.log('  ❌ NO SUBSCRIPTION RECORDS IN DATABASE');
  } else {
    allSubscriptions.forEach((sub, index) => {
      console.log(`\n  Subscription ${index + 1}:`);
      console.log('    Database ID:', sub.id);
      console.log('    Status:', sub.status);
      console.log('    Tier:', sub.tier);
      console.log('    Plan Name:', sub.planName);
      console.log('    Stripe Subscription ID:', sub.stripeSubscriptionId || 'NULL');
      console.log('    Stripe Price ID:', sub.stripePriceId || 'NULL');
      console.log('    Cancel At Period End:', sub.cancelAtPeriodEnd);
      console.log('    Created At:', sub.createdAt);
      console.log('    Current Period End:', sub.currentPeriodEnd || 'NULL');
    });
  }

  console.log('\n==========================================');
  console.log('WHAT THE GET ENDPOINT WOULD RETURN:');
  console.log('==========================================');

  // Simulate what GET endpoint does
  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      status: { in: ['active', 'past_due'] },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!activeSubscription) {
    const manualTier = (user.subscriptionTier || 'free').toUpperCase();
    console.log('  Status:', manualTier !== 'FREE' ? 'manual' : 'inactive');
    console.log('  Tier:', manualTier);
    console.log('  Message:', manualTier !== 'FREE' ? 'Manual subscription (no billing)' : 'No active subscription');
    console.log('\n  ✅ Cancel button SHOULD BE HIDDEN (status: manual)');
  } else {
    console.log('  Found active subscription:');
    console.log('    ID:', activeSubscription.id);
    console.log('    Status:', activeSubscription.status);
    console.log('    Stripe Subscription ID:', activeSubscription.stripeSubscriptionId || 'NULL');

    if (!activeSubscription.stripeSubscriptionId) {
      console.log('\n  ⚠️  PROBLEM: Subscription exists but has NO stripeSubscriptionId!');
      console.log('     Cancel button WILL SHOW but cancellation WILL FAIL!');
    }
  }

  console.log('\n==========================================\n');

  await prisma.$disconnect();
}

checkAll().catch(console.error);
