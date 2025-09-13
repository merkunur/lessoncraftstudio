// Redesign special collections to be intuitive with multilingual support
// Matching the main image library experience

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function redesignCollections() {
  try {
    console.log('🎨 Redesigning special collections for better UX...');
    
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
    
    // 1. Drop old tables
    console.log('Dropping old tables...');
    try {
      await fetch(`${DIRECTUS_URL}/collections/background_images`, {
        method: 'DELETE',
        headers
      });
      await fetch(`${DIRECTUS_URL}/collections/border_images`, {
        method: 'DELETE',
        headers
      });
      await fetch(`${DIRECTUS_URL}/collections/worksheet_templates`, {
        method: 'DELETE',
        headers
      });
    } catch (e) {
      console.log('Old collections may not exist, continuing...');
    }
    
    // 2. Create redesigned Background Themes collection
    console.log('\n📸 Creating Background Themes collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'background_themes',
        meta: {
          collection: 'background_themes',
          icon: 'wallpaper',
          display_template: '{{folder_name}} - {{translations.en}}',
          color: '#2E7D32',
          translations: [{
            language: 'en-US',
            translation: 'Background Themes',
            singular: 'Background Theme',
            plural: 'Background Themes'
          }]
        },
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: {
              interface: 'input',
              readonly: true,
              hidden: true
            },
            schema: {
              is_primary_key: true,
              has_auto_increment: true
            }
          },
          {
            field: 'folder_name',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half',
              required: true,
              note: 'Folder name (e.g., forest, ocean, sky)',
              options: {
                placeholder: 'forest'
              }
            }
          },
          {
            field: 'sort_order',
            type: 'integer',
            meta: {
              interface: 'input',
              width: 'half',
              note: 'Display order (lower numbers appear first)'
            },
            schema: {
              default_value: 999
            }
          },
          {
            field: 'translations',
            type: 'json',
            meta: {
              interface: 'input-code',
              width: 'full',
              options: {
                language: 'json',
                template: JSON.stringify({
                  en: 'Forest',
                  de: 'Wald',
                  fr: 'Forêt',
                  es: 'Bosque',
                  pt: 'Floresta',
                  it: 'Foresta',
                  nl: 'Bos',
                  sv: 'Skog',
                  da: 'Skov',
                  no: 'Skog',
                  fi: 'Metsä'
                }, null, 2)
              },
              note: 'Theme name in all 11 languages'
            }
          },
          {
            field: 'is_active',
            type: 'boolean',
            meta: {
              interface: 'boolean',
              width: 'half',
              options: {
                label: 'Active'
              }
            },
            schema: {
              default_value: true
            }
          }
        ]
      })
    });
    console.log('✅ Created background_themes collection');
    
    // 3. Create Background Images collection (linked to themes)
    console.log('\n🖼️ Creating Background Images collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'background_images',
        meta: {
          collection: 'background_images',
          icon: 'image',
          display_template: '{{file_name}} - {{translations.en}}',
          color: '#4CAF50',
          translations: [{
            language: 'en-US',
            translation: 'Background Images',
            singular: 'Background Image',
            plural: 'Background Images'
          }]
        },
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: {
              interface: 'input',
              readonly: true,
              hidden: true
            },
            schema: {
              is_primary_key: true,
              has_auto_increment: true
            }
          },
          {
            field: 'file_name',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half',
              required: true,
              note: 'Filename without extension (e.g., forest_bg_1)'
            }
          },
          {
            field: 'theme_id',
            type: 'integer',
            meta: {
              interface: 'select-dropdown-m2o',
              width: 'half',
              required: true,
              note: 'Select background theme'
            },
            schema: {
              foreign_key_table: 'background_themes',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'image_file',
            type: 'uuid',
            meta: {
              interface: 'file-image',
              width: 'full',
              required: true,
              note: 'Upload background image'
            },
            schema: {
              foreign_key_table: 'directus_files',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'translations',
            type: 'json',
            meta: {
              interface: 'input-code',
              width: 'full',
              options: {
                language: 'json',
                template: JSON.stringify({
                  en: 'Forest Background',
                  de: 'Waldhintergrund',
                  fr: 'Fond de forêt',
                  es: 'Fondo de bosque',
                  pt: 'Fundo de floresta',
                  it: 'Sfondo foresta',
                  nl: 'Bosachtergrond',
                  sv: 'Skogsbakgrund',
                  da: 'Skovbaggrund',
                  no: 'Skogbakgrunn',
                  fi: 'Metsätausta'
                }, null, 2)
              },
              note: 'Image name in all 11 languages'
            }
          },
          {
            field: 'status',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              width: 'half',
              options: {
                choices: [
                  { text: 'Active', value: 'active' },
                  { text: 'Inactive', value: 'inactive' }
                ]
              }
            },
            schema: {
              default_value: 'active'
            }
          }
        ]
      })
    });
    console.log('✅ Created background_images collection');
    
    // 4. Create Border Styles collection
    console.log('\n🔲 Creating Border Styles collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'border_styles',
        meta: {
          collection: 'border_styles',
          icon: 'border_outer',
          display_template: '{{style_name}} - {{translations.en}}',
          color: '#FF9800',
          translations: [{
            language: 'en-US',
            translation: 'Border Styles',
            singular: 'Border Style',
            plural: 'Border Styles'
          }]
        },
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: {
              interface: 'input',
              readonly: true,
              hidden: true
            },
            schema: {
              is_primary_key: true,
              has_auto_increment: true
            }
          },
          {
            field: 'style_name',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half',
              required: true,
              note: 'Style identifier (e.g., math, fun, simple)'
            }
          },
          {
            field: 'sort_order',
            type: 'integer',
            meta: {
              interface: 'input',
              width: 'half'
            },
            schema: {
              default_value: 999
            }
          },
          {
            field: 'translations',
            type: 'json',
            meta: {
              interface: 'input-code',
              width: 'full',
              options: {
                language: 'json',
                template: JSON.stringify({
                  en: 'Math Borders',
                  de: 'Mathe-Rahmen',
                  fr: 'Bordures mathématiques',
                  es: 'Bordes matemáticos',
                  pt: 'Bordas matemáticas',
                  it: 'Bordi matematici',
                  nl: 'Wiskundige randen',
                  sv: 'Matematik ramar',
                  da: 'Matematik rammer',
                  no: 'Matematikk rammer',
                  fi: 'Matematiikka reunat'
                }, null, 2)
              },
              note: 'Style name in all 11 languages'
            }
          },
          {
            field: 'is_active',
            type: 'boolean',
            meta: {
              interface: 'boolean',
              width: 'half'
            },
            schema: {
              default_value: true
            }
          }
        ]
      })
    });
    console.log('✅ Created border_styles collection');
    
    // 5. Create Border Images collection
    console.log('\n🖼️ Creating Border Images collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'border_images',
        meta: {
          collection: 'border_images',
          icon: 'crop_square',
          display_template: '{{file_name}} - {{translations.en}}',
          color: '#FFA726',
          translations: [{
            language: 'en-US',
            translation: 'Border Images',
            singular: 'Border Image',
            plural: 'Border Images'
          }]
        },
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: {
              interface: 'input',
              readonly: true,
              hidden: true
            },
            schema: {
              is_primary_key: true,
              has_auto_increment: true
            }
          },
          {
            field: 'file_name',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half',
              required: true,
              note: 'Filename without extension'
            }
          },
          {
            field: 'style_id',
            type: 'integer',
            meta: {
              interface: 'select-dropdown-m2o',
              width: 'half',
              required: true,
              note: 'Select border style'
            },
            schema: {
              foreign_key_table: 'border_styles',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'image_file',
            type: 'uuid',
            meta: {
              interface: 'file-image',
              width: 'full',
              required: true,
              note: 'Upload border image'
            },
            schema: {
              foreign_key_table: 'directus_files',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'translations',
            type: 'json',
            meta: {
              interface: 'input-code',
              width: 'full',
              options: {
                language: 'json'
              },
              note: 'Border name in all 11 languages'
            }
          },
          {
            field: 'status',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              width: 'half',
              options: {
                choices: [
                  { text: 'Active', value: 'active' },
                  { text: 'Inactive', value: 'inactive' }
                ]
              }
            },
            schema: {
              default_value: 'active'
            }
          }
        ]
      })
    });
    console.log('✅ Created border_images collection');
    
    // 6. Create Worksheet Templates collection (simplified)
    console.log('\n📄 Creating Worksheet Templates collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'worksheet_templates',
        meta: {
          collection: 'worksheet_templates',
          icon: 'dashboard',
          display_template: '{{template_name}} - {{app_type}}',
          color: '#9C27B0',
          note: 'Templates for specific worksheet apps',
          translations: [{
            language: 'en-US',
            translation: 'Worksheet Templates',
            singular: 'Worksheet Template',
            plural: 'Worksheet Templates'
          }]
        },
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: {
              interface: 'input',
              readonly: true,
              hidden: true
            },
            schema: {
              is_primary_key: true,
              has_auto_increment: true
            }
          },
          {
            field: 'template_name',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half',
              required: true,
              note: 'Template identifier (e.g., worksheet_1)'
            }
          },
          {
            field: 'app_type',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              width: 'half',
              required: true,
              note: 'Which app uses this template',
              options: {
                choices: [
                  { text: '📝 Prepositions Worksheet', value: 'prepositions' },
                  { text: '🚂 Alphabet Train', value: 'alphabet-train' },
                  { text: '🚂 Pattern Train', value: 'pattern-train' }
                ]
              }
            }
          },
          {
            field: 'template_image',
            type: 'uuid',
            meta: {
              interface: 'file-image',
              width: 'full',
              required: true,
              note: 'Upload template image'
            },
            schema: {
              foreign_key_table: 'directus_files',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'translations',
            type: 'json',
            meta: {
              interface: 'input-code',
              width: 'full',
              options: {
                language: 'json',
                template: JSON.stringify({
                  en: 'Prepositions Worksheet',
                  de: 'Präpositionen-Arbeitsblatt',
                  fr: 'Feuille de prépositions',
                  es: 'Hoja de preposiciones',
                  pt: 'Planilha de preposições',
                  it: 'Foglio di preposizioni',
                  nl: 'Voorzetsels werkblad',
                  sv: 'Prepositioner arbetsblad',
                  da: 'Præpositioner arbejdsark',
                  no: 'Preposisjoner arbeidsark',
                  fi: 'Prepositiot työarkki'
                }, null, 2)
              },
              note: 'Template name in all 11 languages'
            }
          },
          {
            field: 'description',
            type: 'text',
            meta: {
              interface: 'input-multiline',
              width: 'full',
              note: 'Optional description of the template'
            }
          },
          {
            field: 'status',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              width: 'half',
              options: {
                choices: [
                  { text: 'Active', value: 'active' },
                  { text: 'Inactive', value: 'inactive' }
                ]
              }
            },
            schema: {
              default_value: 'active'
            }
          },
          {
            field: 'sort_order',
            type: 'integer',
            meta: {
              interface: 'input',
              width: 'half'
            },
            schema: {
              default_value: 0
            }
          }
        ]
      })
    });
    console.log('✅ Created worksheet_templates collection');
    
    console.log('\n🎉 Redesign complete!');
    console.log('\nThe new collections are now:');
    console.log('✨ Background Themes & Images - with full translations');
    console.log('✨ Border Styles & Images - with full translations');
    console.log('✨ Worksheet Templates - only for specific apps');
    console.log('\nAll collections now support 11 languages just like the main image library!');
    console.log('\nAccess at: http://localhost:8055/admin');
    
  } catch (error) {
    console.error('Failed to redesign collections:', error);
    process.exit(1);
  }
}

// Run redesign
redesignCollections();