const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.log('❌ No token provided!');
  console.log('\n📝 How to use:');
  console.log('1. Get your token from Strapi Admin > Settings > API Tokens');
  console.log('2. Run: set STRAPI_API_TOKEN=your_token && node scripts/test-strapi-token.js');
  process.exit(1);
}

console.log('Testing Strapi connection...');
console.log('Token:', STRAPI_TOKEN.substring(0, 10) + '...');

fetch(STRAPI_URL + '/api/image-assets', {
  headers: { 'Authorization': 'Bearer ' + STRAPI_TOKEN }
})
.then(res => {
  if (res.ok) {
    console.log('✅ Success! Token is valid.');
  } else if (res.status === 401) {
    console.log('❌ Invalid token!');
  } else {
    console.log('❌ Error:', res.status);
  }
})
.catch(err => console.log('❌ Connection failed:', err.message));
