const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'lessoncraftstudio',
  user: 'lcsuser',
  password: 'lcspass'
});

async function configurePublicPermissions() {
  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Get the public role ID
    const roleResult = await client.query(`
      SELECT id FROM up_roles WHERE type = 'public'
    `);
    
    if (roleResult.rows.length === 0) {
      console.error('❌ Public role not found');
      return;
    }
    
    const publicRoleId = roleResult.rows[0].id;
    console.log(`📋 Public role ID: ${publicRoleId}\n`);

    // Define permissions to grant
    const permissions = [
      // App Info permissions
      { action: 'api::app-info.app-info.find' },
      { action: 'api::app-info.app-info.findOne' },
      // Image Theme permissions
      { action: 'api::image-theme.image-theme.find' },
      { action: 'api::image-theme.image-theme.findOne' },
      // Image Asset permissions
      { action: 'api::image-asset.image-asset.find' },
      { action: 'api::image-asset.image-asset.findOne' },
      // Upload plugin permissions for viewing images
      { action: 'plugin::upload.content-api.find' },
      { action: 'plugin::upload.content-api.findOne' }
    ];

    console.log('🔓 Configuring public permissions...\n');

    for (const perm of permissions) {
      // Check if permission exists
      const existingPerm = await client.query(`
        SELECT id FROM up_permissions 
        WHERE action = $1 AND role_id = $2
      `, [perm.action, publicRoleId]);

      if (existingPerm.rows.length === 0) {
        // Create new permission
        await client.query(`
          INSERT INTO up_permissions (action, role_id, created_at, updated_at)
          VALUES ($1, $2, NOW(), NOW())
        `, [perm.action, publicRoleId]);
        console.log(`✅ Added permission: ${perm.action}`);
      } else {
        console.log(`⚠️  Permission already exists: ${perm.action}`);
      }
    }

    console.log('\n✨ Public permissions configured successfully!');
    console.log('The following APIs are now publicly accessible:');
    console.log('  - /api/app-infos');
    console.log('  - /api/image-themes');
    console.log('  - /api/image-assets');
    console.log('  - /api/upload/files');

  } catch (error) {
    console.error('❌ Error configuring permissions:', error.message);
  } finally {
    await client.end();
  }
}

configurePublicPermissions();