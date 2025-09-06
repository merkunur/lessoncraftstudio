const fetch = require('node-fetch');

const API_URL = process.env.API_URL || 'http://localhost:3001';

async function testAuthEndpoints() {
  console.log('Testing Authentication API endpoints...\n');
  
  // Generate test data
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'SecurePass123!';
  
  try {
    // Test 1: Register
    console.log('1. Testing /api/auth/register...');
    const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        firstName: 'Test',
        lastName: 'User',
        locale: 'en'
      })
    });
    
    const registerData = await registerResponse.json();
    if (registerResponse.ok) {
      console.log('✅ Registration successful:', registerData.message);
    } else {
      console.log('❌ Registration failed:', registerData.error);
    }
    
    // Test 2: Login
    console.log('\n2. Testing /api/auth/login...');
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });
    
    const loginData = await loginResponse.json();
    if (loginResponse.ok && loginData.accessToken) {
      console.log('✅ Login successful');
      console.log('   User ID:', loginData.user?.id);
      console.log('   Subscription Tier:', loginData.user?.subscriptionTier);
    } else {
      console.log('❌ Login failed:', loginData.error || 'No access token received');
    }
    
    // Test 3: Check health endpoint
    console.log('\n3. Testing /health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    if (healthResponse.ok) {
      console.log('✅ Health check passed:', healthData.status);
    } else {
      console.log('❌ Health check failed');
    }
    
  } catch (error) {
    console.error('❌ Error testing endpoints:', error.message);
    console.log('\nMake sure the API server is running:');
    console.log('  cd api && npm run dev');
  }
}

testAuthEndpoints();