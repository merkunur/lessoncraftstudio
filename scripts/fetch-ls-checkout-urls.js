const https = require('https');
const fs = require('fs');

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhNmQyYzkxN2NkOGQ0OGNmNzhiZmNmMjc0ZmVjYjVkMjExM2EwOGEwYjNjZjhiZjVhNDQ3ZjM0NWEyZWY5OGE5Y2JmZTIzYWM3ZmRiYTFjYSIsImlhdCI6MTc3NTMwMjk1Mi42NTgyODQsIm5iZiI6MTc3NTMwMjk1Mi42NTgyOTcsImV4cCI6MTc5MTA3MjAwMC4wMzU2MzEsInN1YiI6IjY3ODAzNTEiLCJzY29wZXMiOltdfQ.pCNbSOck-IvK6fEJl1caK4xRCZPtgWgYikqjS1_MQbpsZlREIuCGsMbTCq7d2u0fFuLR7msxOx2GjFEVML2cZWwwEWQNSylsI4Bb_sOT3lfz0O-myL-ZLL5xzH6nXD0M1dEQNgpjzOUFKw-hcEjjb8IAg08bCQemlBSmGn5MA5n9o9X0CBemvqtODM-42vP_WC2LWXKBNTMJvxsD6GGWaKMZtLOkbPGHr4RUIYK6sNFMtYQ4YGC8YwAZmVyz0iAcDYlLH1FKjH7XvKeCVfU6GRxJMLDGBik1fUokBwmQ827l2LCOsPGPX1irYRDOqRXeyYozbaZJZSowb9EK55ELVMtPxb8b_oD6p9NuifdXxkRDPOMjb5FfdkyvX7AF5A7-yQiRadshZKV4zErSIG6sOf_jm-K0jpYbxKft5fRQ4gqjvuKSHlft4Q4xGtBC5wlVzU6rb-5xW4gDiLAzbMf3tZ0b7UkZ0dwT8U5lD8s7PQ5wtlETBFbvMCYSjIdL2KjZm9WFU96EywoE9C4zkC8-m0BxeZVxtmgJLOYLivdGGXBSUMD7tlFb4_avg-LdH_VgKeXpngIFmz_2xL3bFbGjoLt_P2CVxwFvJ5Z42MoCVs5qhSFnIKAfqp0aVmrqn57p6WQoSS7f2by6BSG7t2TX6JpyEA8TcknJbznM-rMSYNQ';

function lsApi(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.lemonsqueezy.com',
      path: `/v1${path}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Accept': 'application/vnd.api+json' },
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  let all = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await lsApi(`/products?filter[store_id]=327460&page[size]=50&page[number]=${page}`);
    all = all.concat(res.data || []);
    hasMore = res.meta?.page?.lastPage > page;
    page++;
  }

  const result = {};
  for (const p of all) {
    result[p.attributes.name] = {
      productId: p.id,
      slug: p.attributes.slug,
      buyNowUrl: p.attributes.buy_now_url,
      price: p.attributes.price,
    };
  }

  fs.writeFileSync('scripts/ls-checkout-urls.json', JSON.stringify(result, null, 2));
  console.log(`Saved ${Object.keys(result).length} products`);

  // Print for easy copy-paste
  for (const [name, data] of Object.entries(result)) {
    console.log(`${name}: ${data.buyNowUrl}`);
  }
}

main().catch(console.error);
