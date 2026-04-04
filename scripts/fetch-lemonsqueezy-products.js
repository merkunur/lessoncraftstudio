/**
 * Fetch all Lemon Squeezy products and their variants
 */

const https = require('https');
const fs = require('fs');

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhNmQyYzkxN2NkOGQ0OGNmNzhiZmNmMjc0ZmVjYjVkMjExM2EwOGEwYjNjZjhiZjVhNDQ3ZjM0NWEyZWY5OGE5Y2JmZTIzYWM3ZmRiYTFjYSIsImlhdCI6MTc3NTMwMjk1Mi42NTgyODQsIm5iZiI6MTc3NTMwMjk1Mi42NTgyOTcsImV4cCI6MTc5MTA3MjAwMC4wMzU2MzEsInN1YiI6IjY3ODAzNTEiLCJzY29wZXMiOltdfQ.pCNbSOck-IvK6fEJl1caK4xRCZPtgWgYikqjS1_MQbpsZlREIuCGsMbTCq7d2u0fFuLR7msxOx2GjFEVML2cZWwwEWQNSylsI4Bb_sOT3lfz0O-myL-ZLL5xzH6nXD0M1dEQNgpjzOUFKw-hcEjjb8IAg08bCQemlBSmGn5MA5n9o9X0CBemvqtODM-42vP_WC2LWXKBNTMJvxsD6GGWaKMZtLOkbPGHr4RUIYK6sNFMtYQ4YGC8YwAZmVyz0iAcDYlLH1FKjH7XvKeCVfU6GRxJMLDGBik1fUokBwmQ827l2LCOsPGPX1irYRDOqRXeyYozbaZJZSowb9EK55ELVMtPxb8b_oD6p9NuifdXxkRDPOMjb5FfdkyvX7AF5A7-yQiRadshZKV4zErSIG6sOf_jm-K0jpYbxKft5fRQ4gqjvuKSHlft4Q4xGtBC5wlVzU6rb-5xW4gDiLAzbMf3tZ0b7UkZ0dwT8U5lD8s7PQ5wtlETBFbvMCYSjIdL2KjZm9WFU96EywoE9C4zkC8-m0BxeZVxtmgJLOYLivdGGXBSUMD7tlFb4_avg-LdH_VgKeXpngIFmz_2xL3bFbGjoLt_P2CVxwFvJ5Z42MoCVs5qhSFnIKAfqp0aVmrqn57p6WQoSS7f2by6BSG7t2TX6JpyEA8TcknJbznM-rMSYNQ';
const STORE_ID = '327460';

function lsApi(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.lemonsqueezy.com',
      path: `/v1${path}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/vnd.api+json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Parse error: ${body.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  // Fetch all products (paginated)
  let allProducts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await lsApi(`/products?filter[store_id]=${STORE_ID}&page[size]=50&page[number]=${page}`);
    allProducts = allProducts.concat(res.data || []);
    hasMore = res.meta?.page?.lastPage > page;
    page++;
  }

  console.log(`Found ${allProducts.length} products\n`);

  // Fetch all variants
  let allVariants = [];
  page = 1;
  hasMore = true;

  while (hasMore) {
    const res = await lsApi(`/variants?filter[store_id]=${STORE_ID}&page[size]=50&page[number]=${page}`);
    allVariants = allVariants.concat(res.data || []);
    hasMore = res.meta?.page?.lastPage > page;
    page++;
  }

  // Map variant by product ID
  const variantsByProduct = {};
  for (const v of allVariants) {
    const prodId = v.attributes.product_id;
    if (!variantsByProduct[prodId]) variantsByProduct[prodId] = [];
    variantsByProduct[prodId].push(v);
  }

  // Print all products with their variants
  console.log('Products:');
  console.log('=========\n');

  for (const product of allProducts) {
    const attrs = product.attributes;
    const variants = variantsByProduct[product.id] || [];
    const defaultVariant = variants[0];

    console.log(`Name: ${attrs.name}`);
    console.log(`  Product ID: ${product.id}`);
    console.log(`  Price: $${attrs.price / 100}`);
    console.log(`  Status: ${attrs.status}`);
    if (defaultVariant) {
      console.log(`  Variant ID: ${defaultVariant.id}`);
    }
    console.log('');
  }

  // Save full JSON for config generation
  const output = allProducts.map(p => ({
    productId: p.id,
    name: p.attributes.name,
    price: p.attributes.price,
    status: p.attributes.status,
    slug: p.attributes.slug,
    variantId: (variantsByProduct[p.id] || [])[0]?.id || null,
  }));

  fs.writeFileSync('scripts/lemonsqueezy-product-ids.json', JSON.stringify(output, null, 2));
  console.log('Saved to scripts/lemonsqueezy-product-ids.json');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
