const fetch = require('node-fetch');

async function test() {
  const response = await fetch(
    'http://localhost:8055/items/image_assets?filter[theme_id][_eq]=1&limit=2&fields=*,image_file.*',
    {
      headers: {
        'Authorization': 'Bearer static-api-token-for-sync'
      }
    }
  );
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test();