// Reset Strapi Admin Password Script
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'lcsuser',
  password: process.env.DB_PASSWORD || 'lcspass',
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME || 'lessoncraftstudio'
};

// New admin credentials
const NEW_ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const NEW_ADMIN_PASSWORD = 'Admin123!';

async function resetAdminPassword() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(NEW_ADMIN_PASSWORD, 10);
    
    // Check if admin user exists
    const checkQuery = `SELECT id, email FROM admin_users WHERE email = $1 OR id = 1 LIMIT 1`;
    const checkResult = await client.query(checkQuery, [NEW_ADMIN_EMAIL]);
    
    if (checkResult.rows.length > 0) {
      // Update existing admin
      const updateQuery = `
        UPDATE admin_users 
        SET password = $1, email = $2, is_active = true, blocked = false
        WHERE id = $3
      `;
      await client.query(updateQuery, [hashedPassword, NEW_ADMIN_EMAIL, checkResult.rows[0].id]);
      console.log(`✓ Admin password reset successfully for: ${NEW_ADMIN_EMAIL}`);
    } else {
      // Create new admin if none exists
      const insertQuery = `
        INSERT INTO admin_users (
          firstname, lastname, username, email, password, 
          is_active, blocked, prefered_language, created_at, updated_at
        ) VALUES (
          'Admin', 'User', 'admin', $1, $2,
          true, false, 'en', NOW(), NOW()
        )
      `;
      await client.query(insertQuery, [NEW_ADMIN_EMAIL, hashedPassword]);
      console.log(`✓ New admin created: ${NEW_ADMIN_EMAIL}`);
    }
    
    console.log('\n=================================');
    console.log('Strapi Admin Credentials:');
    console.log('=================================');
    console.log(`Email: ${NEW_ADMIN_EMAIL}`);
    console.log(`Password: ${NEW_ADMIN_PASSWORD}`);
    console.log(`URL: http://localhost:1337/admin`);
    console.log('=================================\n');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nNote: Make sure PostgreSQL is running and the database exists.');
  } finally {
    await client.end();
  }
}

// Check if bcryptjs is installed
try {
  require.resolve('bcryptjs');
  require.resolve('pg');
  resetAdminPassword();
} catch(e) {
  console.log('Installing required packages...');
  const { execSync } = require('child_process');
  execSync('npm install bcryptjs pg', { stdio: 'inherit', cwd: __dirname });
  console.log('Packages installed. Please run the script again.');
}