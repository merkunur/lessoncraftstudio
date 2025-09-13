// Update template types for specific apps
// Using native fetch in Node 18+

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function updateTemplateTypes() {
  try {
    console.log('Updating template types...');
    
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
    
    // Update the app_type field choices in worksheet_templates
    console.log('Updating app_type field choices...');
    
    // First get the field info
    const fieldResponse = await fetch(
      `${DIRECTUS_URL}/fields/worksheet_templates/app_type`,
      { headers }
    );
    
    if (fieldResponse.ok) {
      const fieldData = await fieldResponse.json();
      
      // Update field with new choices
      const updateResponse = await fetch(
        `${DIRECTUS_URL}/fields/worksheet_templates/app_type`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            meta: {
              ...fieldData.data.meta,
              options: {
                choices: [
                  { text: 'Prepositions', value: 'prepositions' },
                  { text: 'Alphabet Train', value: 'alphabet-train' },
                  { text: 'Pattern Train', value: 'pattern-train' },
                  { text: 'General', value: 'general' }
                ]
              }
            }
          })
        }
      );
      
      if (updateResponse.ok) {
        console.log('✅ Updated app_type field choices');
      } else {
        const error = await updateResponse.text();
        console.log('⚠️ Failed to update field:', error);
      }
    }
    
    console.log('\n✅ Template types update complete!');
    console.log('Available template types:');
    console.log('- prepositions: For the Prepositions app');
    console.log('- alphabet-train: For the Alphabet Train app');
    console.log('- pattern-train: For the Pattern Train app');
    console.log('- general: For other apps');
    
  } catch (error) {
    console.error('Failed to update template types:', error);
    process.exit(1);
  }
}

// Run update
updateTemplateTypes();