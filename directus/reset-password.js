const bcrypt = require('bcryptjs');

// Generate bcrypt hash for 'admin'
const password = 'admin';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Hash for "admin":', hash);
  console.log('\nSQL to update password:');
  console.log(`UPDATE directus_users SET password = '${hash}' WHERE email = 'admin@lessoncraftstudio.com';`);
});