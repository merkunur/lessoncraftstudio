/**
 * Delete all Stripe products
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/delete-stripe-products.js
 *
 * This script:
 * 1. Lists all products on the Stripe account
 * 2. Deactivates all prices for each product
 * 3. Attempts to delete the product (falls back to archive if it had transactions)
 */

const Stripe = require('stripe');

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('ERROR: Set STRIPE_SECRET_KEY environment variable');
  console.error('Usage: STRIPE_SECRET_KEY=sk_live_... node scripts/delete-stripe-products.js');
  process.exit(1);
}

const stripe = new Stripe(key);

async function main() {
  console.log('Fetching all products...');

  let allProducts = [];
  let hasMore = true;
  let startingAfter;

  while (hasMore) {
    const params = { limit: 100 };
    if (startingAfter) params.starting_after = startingAfter;
    const batch = await stripe.products.list(params);
    allProducts = allProducts.concat(batch.data);
    hasMore = batch.has_more;
    if (batch.data.length > 0) startingAfter = batch.data[batch.data.length - 1].id;
  }

  console.log(`Found ${allProducts.length} products\n`);

  let deleted = 0;
  let archived = 0;
  let errors = 0;

  for (const product of allProducts) {
    console.log(`Processing: ${product.name || product.id}`);

    // Deactivate all prices first
    try {
      const prices = await stripe.prices.list({ product: product.id, limit: 100 });
      for (const price of prices.data) {
        if (price.active) {
          await stripe.prices.update(price.id, { active: false });
          console.log(`  Deactivated price: ${price.id}`);
        }
      }
    } catch (err) {
      console.log(`  Warning: could not list/deactivate prices: ${err.message}`);
    }

    // Try to delete, fall back to archive
    try {
      await stripe.products.del(product.id);
      console.log(`  DELETED: ${product.id}`);
      deleted++;
    } catch (err) {
      if (err.message.includes('cannot be deleted')) {
        try {
          await stripe.products.update(product.id, { active: false });
          console.log(`  ARCHIVED (has transactions): ${product.id}`);
          archived++;
        } catch (archiveErr) {
          console.log(`  ERROR archiving: ${archiveErr.message}`);
          errors++;
        }
      } else {
        console.log(`  ERROR deleting: ${err.message}`);
        errors++;
      }
    }
  }

  console.log(`\nDone! Deleted: ${deleted}, Archived: ${archived}, Errors: ${errors}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
