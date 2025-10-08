// Test script to simulate the auth check
const jwt = require('jsonwebtoken');

// Check if JWT_SECRET is set
const secret = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';

console.log('JWT_SECRET configured:', secret ? 'YES' : 'NO');
console.log('');
console.log('To fix auth issues:');
console.log('1. Make sure you are signed in');
console.log('2. Open browser DevTools (F12)');
console.log('3. Go to Application > Cookies');
console.log('4. Check if you have "accessToken" cookie');
console.log('5. If not, sign out and sign back in');
console.log('');
console.log('OR check the Network tab when clicking Create User:');
console.log('- Does the request have Authorization header?');
console.log('- What is the response?');
