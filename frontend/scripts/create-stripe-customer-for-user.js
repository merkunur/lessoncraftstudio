/**
 * Script to create a Stripe customer for a user who doesn't have one
 * Useful for manually-granted subscriptions that need to be connected to Stripe
 */

const { PrismaClient } = require('@prisma/client');
const Stripe = require('stripe');

const prisma = new PrismaClient();

const userId = process.argv[2];
if (!userId) {
  console.error('❌ Usage: node create-stripe-customer-for-user.js <userId>');
  process.exit(1);
}

async function main() {
  // Initialize Stripe
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
    process.exit(1);
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-11-20.acacia',
  });

  console.log(`🔍 Looking up user: ${userId}\n`);

  // Find the user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.error(`❌ User not found: ${userId}`);
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`✅ Found user: ${user.email}`);
  console.log(`   Tier: ${user.subscriptionTier}`);
  console.log(`   Current stripeCustomerId: ${user.stripeCustomerId || 'NONE'}\n`);

  if (user.stripeCustomerId) {
    console.log('⚠️  User already has a Stripe customer ID');
    console.log('   Nothing to do.');
    await prisma.$disconnect();
    return;
  }

  console.log('🔨 Creating Stripe customer...');

  try {
    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: [user.firstName, user.lastName].filter(Boolean).join(' ') || undefined,
      metadata: {
        userId: user.id,
        tier: user.subscriptionTier,
      },
    });

    console.log(`✅ Stripe customer created: ${customer.id}`);

    // Update user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    console.log(`✅ User record updated with customer ID\n`);
    console.log(`${'='.repeat(60)}`);
    console.log(`✅ SUCCESS!`);
    console.log(`   User ${user.email} now has Stripe customer ID: ${customer.id}`);
    console.log(`   Payment History and other billing features should now work`);
    console.log(`${'='.repeat(60)}\n`);

  } catch (error) {
    console.error(`❌ Error creating Stripe customer:`, error.message);
    await prisma.$disconnect();
    process.exit(1);
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
