// Create new template collections structure
// Train templates for Alphabet Train and Pattern Train apps
// Worksheet templates for Prepositions app

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function createTemplateCollections() {
  try {
    console.log('🚂 Creating template collections for apps...');
    
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
    
    // 1. Remove old worksheet_templates collection
    console.log('Removing old worksheet_templates collection...');
    try {
      await fetch(`${DIRECTUS_URL}/collections/worksheet_templates`, {
        method: 'DELETE',
        headers
      });
      console.log('✅ Removed old worksheet_templates');
    } catch (e) {
      console.log('Old collection might not exist');
    }
    
    // 2. Create Train Template Themes collection
    console.log('\n🚂 Creating Train Template Themes collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'train_template_themes',
        meta: {
          collection: 'train_template_themes',
          icon: 'train',
          display_template: '{{folder_name}} - {{translations.en}}',
          color: '#FF5722',
          note: 'Templates for Alphabet Train and Pattern Train apps',
          translations: [{
            language: 'en-US',
            translation: 'Train Template Themes',
            singular: 'Train Template Theme',
            plural: 'Train Template Themes'
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
              note: 'Folder name (e.g., classic_train, modern_train)',
              options: {
                placeholder: 'classic_train'
              }
            }
          },
          {
            field: 'sort_order',
            type: 'integer',
            meta: {
              interface: 'input',
              width: 'half',
              note: 'Display order'
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
                  en: 'Classic Train',
                  de: 'Klassischer Zug',
                  fr: 'Train classique',
                  es: 'Tren clásico',
                  pt: 'Trem clássico',
                  it: 'Treno classico',
                  nl: 'Klassieke trein',
                  sv: 'Klassiskt tåg',
                  da: 'Klassisk tog',
                  no: 'Klassisk tog',
                  fi: 'Klassinen juna'
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
              width: 'half'
            },
            schema: {
              default_value: true
            }
          }
        ]
      })
    });
    console.log('✅ Created train_template_themes');
    
    // 3. Create Train Template Images collection
    console.log('\n🖼️ Creating Train Template Images collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'train_template_images',
        meta: {
          collection: 'train_template_images',
          icon: 'image',
          display_template: '{{file_name}} - {{translations.en}}',
          color: '#FF7043',
          translations: [{
            language: 'en-US',
            translation: 'Train Template Images',
            singular: 'Train Template Image',
            plural: 'Train Template Images'
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
            field: 'theme_id',
            type: 'integer',
            meta: {
              interface: 'select-dropdown-m2o',
              width: 'half',
              required: true,
              note: 'Select train template theme'
            },
            schema: {
              foreign_key_table: 'train_template_themes',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'image_file',
            type: 'uuid',
            meta: {
              interface: 'file-image',
              display: 'image',
              width: 'full',
              note: 'Upload the template image',
              special: ['file']
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
                  en: 'Train Template 1',
                  de: 'Zugvorlage 1',
                  fr: 'Modèle de train 1',
                  es: 'Plantilla de tren 1',
                  pt: 'Modelo de trem 1',
                  it: 'Modello treno 1',
                  nl: 'Treinsjabloon 1',
                  sv: 'Tågmall 1',
                  da: 'Togskabelon 1',
                  no: 'Togmal 1',
                  fi: 'Junamalli 1'
                }, null, 2)
              },
              note: 'Template name in all 11 languages'
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
    console.log('✅ Created train_template_images');
    
    // 4. Create Worksheet Template Themes collection
    console.log('\n📝 Creating Worksheet Template Themes collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'worksheet_template_themes',
        meta: {
          collection: 'worksheet_template_themes',
          icon: 'description',
          display_template: '{{folder_name}} - {{translations.en}}',
          color: '#3F51B5',
          note: 'Templates for Prepositions app',
          translations: [{
            language: 'en-US',
            translation: 'Worksheet Template Themes',
            singular: 'Worksheet Template Theme',
            plural: 'Worksheet Template Themes'
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
              note: 'Folder name (e.g., basic_worksheet, advanced_worksheet)',
              options: {
                placeholder: 'basic_worksheet'
              }
            }
          },
          {
            field: 'sort_order',
            type: 'integer',
            meta: {
              interface: 'input',
              width: 'half',
              note: 'Display order'
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
                  en: 'Basic Worksheet',
                  de: 'Grundlegendes Arbeitsblatt',
                  fr: 'Feuille de travail de base',
                  es: 'Hoja de trabajo básica',
                  pt: 'Planilha básica',
                  it: 'Foglio di lavoro di base',
                  nl: 'Basis werkblad',
                  sv: 'Grundläggande arbetsblad',
                  da: 'Grundlæggende arbejdsark',
                  no: 'Grunnleggende arbeidsark',
                  fi: 'Perustyöarkki'
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
              width: 'half'
            },
            schema: {
              default_value: true
            }
          }
        ]
      })
    });
    console.log('✅ Created worksheet_template_themes');
    
    // 5. Create Worksheet Template Images collection
    console.log('\n🖼️ Creating Worksheet Template Images collection...');
    await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'worksheet_template_images',
        meta: {
          collection: 'worksheet_template_images',
          icon: 'image',
          display_template: '{{file_name}} - {{translations.en}}',
          color: '#5C6BC0',
          translations: [{
            language: 'en-US',
            translation: 'Worksheet Template Images',
            singular: 'Worksheet Template Image',
            plural: 'Worksheet Template Images'
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
            field: 'theme_id',
            type: 'integer',
            meta: {
              interface: 'select-dropdown-m2o',
              width: 'half',
              required: true,
              note: 'Select worksheet template theme'
            },
            schema: {
              foreign_key_table: 'worksheet_template_themes',
              foreign_key_column: 'id'
            }
          },
          {
            field: 'image_file',
            type: 'uuid',
            meta: {
              interface: 'file-image',
              display: 'image',
              width: 'full',
              note: 'Upload the template image',
              special: ['file']
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
                  en: 'Worksheet Template 1',
                  de: 'Arbeitsblattvorlage 1',
                  fr: 'Modèle de feuille 1',
                  es: 'Plantilla de hoja 1',
                  pt: 'Modelo de planilha 1',
                  it: 'Modello foglio 1',
                  nl: 'Werkbladsjabloon 1',
                  sv: 'Arbetsbladsmall 1',
                  da: 'Arbejdsarkskabelon 1',
                  no: 'Arbeidsarkmal 1',
                  fi: 'Työarkkimalli 1'
                }, null, 2)
              },
              note: 'Template name in all 11 languages'
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
    console.log('✅ Created worksheet_template_images');
    
    console.log('\n🎉 Template collections created successfully!');
    console.log('\n📚 New structure:');
    console.log('🚂 Train Templates (for Alphabet Train & Pattern Train):');
    console.log('  - train_template_themes');
    console.log('  - train_template_images');
    console.log('\n📝 Worksheet Templates (for Prepositions):');
    console.log('  - worksheet_template_themes');
    console.log('  - worksheet_template_images');
    console.log('\nAll collections support full translations and match the main image library structure!');
    
  } catch (error) {
    console.error('Failed to create template collections:', error);
    process.exit(1);
  }
}

// Run creation
createTemplateCollections();