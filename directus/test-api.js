const axios = require('axios');

async function test() {
  // Login
  const auth = await axios.post('http://localhost:8055/auth/login', {
    email: 'admin@lessoncraftstudio.com',
    password: 'admin123!'
  });
  
  const token = auth.data.data.access_token;
  console.log('Token obtained');
  
  // Check collection fields
  try {
    const fields = await axios.get('http://localhost:8055/fields/image_themes', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('\nImage Themes Fields:');
    fields.data.data.forEach(field => {
      console.log(`- ${field.field}: ${field.type} ${field.schema?.is_primary_key ? '(PRIMARY)' : ''} ${field.schema?.auto_increment ? '(AUTO)' : ''}`);
    });
  } catch (e) {
    console.error('Error getting fields:', e.message);
  }
  
  // Try to create a theme without ID
  try {
    console.log('\nTrying to create theme...');
    const result = await axios.post('http://localhost:8055/items/image_themes', {
      folder_name: 'test_theme',
      name: { en: 'Test', de: 'Test' },
      sort_order: 999,
      is_active: true
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Theme created:', result.data.data);
  } catch (e) {
    console.error('❌ Error creating theme:', e.response?.data || e.message);
  }
}

test();