/**
 * Migration script to fix users who have active subscriptions but no stripeCustomerId
 * This can happen if the webhook failed or the subscription was created before this field was added
 */

const { PrismaClient } = require('@prisma/client');
const Stripe = require('stripe');

const prisma = new PrismaClient();

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

  console.log('🔍 Finding users with active subscriptions but no stripeCustomerId...\n');

  // Find users with subscriptions but no stripeCustomerId
  const users = await prisma.user.findMany({
    where: {
      subscriptionTier: { not: 'free' },
      stripeCustomerId: null,
    },
    include: {
      subscription: true,
    },
  });

  console.log(`Found ${users.length} users with missing stripeCustomerId\n`);

  if (users.length === 0) {
    console.log('✅ No users need fixing!');
    await prisma.$disconnect();
    return;
  }

  let fixed = 0;
  let failed = 0;

  for (const user of users) {
    console.log(`\n📧 Processing user: ${user.email}`);
    console.log(`   User ID: ${user.id}`);
    console.log(`   Tier: ${user.subscriptionTier}`);

    try {
      const sub = user.subscription;

      if (!sub || !sub.stripeSubscriptionId) {
        console.log(`   ⚠️  No Stripe subscription ID found in database - skipping`);
        failed++;
        continue;
      }

      console.log(`   📦 Fetching subscription ${sub.stripeSubscriptionId} from Stripe...`);

      // Fetch subscription from Stripe to get customer ID
      const stripeSubscription = await stripe.subscriptions.retrieve(sub.stripeSubscriptionId);

      const customerId = stripeSubscription.customer;

      if (!customerId) {
        console.log(`   ❌ No customer ID found in Stripe subscription`);
        failed++;
        continue;
      }

      console.log(`   💾 Updating user with customer ID: ${customerId}`);

      // Update user with customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: typeof customerId === 'string' ? customerId : customerId.id,
        },
      });

      console.log(`   ✅ Successfully updated!`);
      fixed++;

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Fixed: ${fixed} users`);
  console.log(`❌ Failed: ${failed} users`);
  console.log(`${'='.repeat(60)}\n`);

  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
