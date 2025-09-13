// Script to set up webhook in Directus for instant sync
const fetch = require('node-fetch');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';
const WEBHOOK_SECRET = 'your-webhook-secret-here';
const FRONTEND_URL = 'http://lcs-frontend:3000'; // Internal Docker network URL

async function setupWebhook() {
  try {
    console.log('Setting up Directus webhook...');
    
    // Authenticate
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with Directus');
    }
    
    const authData = await authResponse.json();
    const token = authData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Check if webhook already exists
    const webhooksResponse = await fetch(`${DIRECTUS_URL}/flows`, { headers });
    const webhooks = await webhooksResponse.json();
    
    const existingWebhook = webhooks.data?.find(
      flow => flow.name === 'Sync Image Library to Frontend'
    );
    
    if (existingWebhook) {
      console.log('Webhook already exists, updating...');
      // Delete existing webhook
      await fetch(`${DIRECTUS_URL}/flows/${existingWebhook.id}`, {
        method: 'DELETE',
        headers
      });
    }
    
    // Create new flow (webhook)
    const flowResponse = await fetch(`${DIRECTUS_URL}/flows`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Sync Image Library to Frontend',
        icon: 'sync',
        description: 'Automatically sync image library changes to the frontend',
        status: 'active',
        trigger: 'event',
        options: {
          type: 'action',
          scope: ['items.create', 'items.update', 'items.delete'],
          collections: ['image_themes', 'worksheet_images']
        }
      })
    });
    
    if (!flowResponse.ok) {
      const error = await flowResponse.text();
      console.error('Failed to create flow:', error);
      throw new Error('Failed to create webhook flow');
    }
    
    const flow = await flowResponse.json();
    console.log('Created flow:', flow.data.id);
    
    // Create operation for the flow
    const operationResponse = await fetch(`${DIRECTUS_URL}/operations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        flow: flow.data.id,
        name: 'Trigger Frontend Sync',
        key: 'webhook_trigger',
        type: 'request',
        position_x: 19,
        position_y: 1,
        options: {
          method: 'POST',
          url: `${FRONTEND_URL}/api/webhook/directus`,
          headers: [
            {
              header: 'x-webhook-secret',
              value: WEBHOOK_SECRET
            },
            {
              header: 'Content-Type',
              value: 'application/json'
            }
          ],
          body: JSON.stringify({
            event: '{{$trigger.event}}',
            collection: '{{$trigger.collection}}',
            payload: '{{$trigger.payload}}',
            keys: '{{$trigger.keys}}'
          })
        }
      })
    });
    
    if (!operationResponse.ok) {
      const error = await operationResponse.text();
      console.error('Failed to create operation:', error);
      throw new Error('Failed to create webhook operation');
    }
    
    console.log('✅ Webhook successfully configured!');
    console.log('The frontend will now automatically sync when you:');
    console.log('- Add, edit, or delete themes');
    console.log('- Add, edit, or delete images');
    console.log('- Upload new image files');
    
  } catch (error) {
    console.error('Failed to set up webhook:', error);
    process.exit(1);
  }
}

// Run the setup
setupWebhook();