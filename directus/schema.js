// Directus Schema for LessonCraftStudio
// This schema defines the data model for managing the image library
// Critical for all 33 worksheet generator apps

module.exports = {
  collections: [
    {
      collection: 'image_themes',
      meta: {
        collection: 'image_themes',
        icon: 'folder',
        note: 'Themes for organizing worksheet images',
        display_template: '{{name}}',
        translations: [
          { language: 'en-US', translation: 'Image Themes' },
          { language: 'de-DE', translation: 'Bildthemen' },
          { language: 'fr-FR', translation: 'Thèmes d\'images' }
        ]
      },
      schema: {
        name: 'image_themes',
        comment: 'Themes for organizing worksheet images'
      },
      fields: [
        {
          field: 'id',
          type: 'integer',
          meta: {
            hidden: true,
            readonly: true,
            interface: 'input',
            special: ['auto-increment', 'primary-key']
          },
          schema: {
            is_primary_key: true,
            auto_increment: true
          }
        },
        {
          field: 'name',
          type: 'json',
          meta: {
            interface: 'input-code',
            display: 'raw',
            note: 'Theme name in multiple languages (JSON format)',
            required: true,
            options: {
              language: 'json',
              template: '{
  "en": "English Name",
  "de": "German Name",
  "fr": "French Name",
  "es": "Spanish Name",
  "pt": "Portuguese Name",
  "it": "Italian Name",
  "nl": "Dutch Name",
  "sv": "Swedish Name",
  "da": "Danish Name",
  "no": "Norwegian Name",
  "fi": "Finnish Name"
}'
            }
          },
          schema: {
            comment: 'Multilingual theme names in JSON format'
          }
        },
        {
          field: 'folder_name',
          type: 'string',
          meta: {
            interface: 'input',
            display: 'raw',
            note: 'Folder name in file system',
            required: true,
            validation: {
              _and: [
                { folder_name: { _regex: '^[a-z0-9-]+$' } }
              ]
            }
          },
          schema: {
            is_unique: true
          }
        },
        {
          field: 'description',
          type: 'json',
          meta: {
            interface: 'input-code',
            display: 'raw',
            note: 'Theme description in multiple languages (JSON format)',
            options: {
              language: 'json'
            }
          }
        },
        {
          field: 'icon',
          type: 'string',
          meta: {
            interface: 'select-icon',
            display: 'icon'
          }
        },
        {
          field: 'sort_order',
          type: 'integer',
          meta: {
            interface: 'input',
            display: 'raw'
          },
          schema: {
            default_value: 0
          }
        },
        {
          field: 'is_active',
          type: 'boolean',
          meta: {
            interface: 'boolean',
            display: 'boolean',
            special: ['cast-boolean']
          },
          schema: {
            default_value: true
          }
        },
        {
          field: 'images',
          type: 'alias',
          meta: {
            interface: 'one-to-many',
            display: 'related-values',
            special: ['o2m']
          }
        }
      ]
    },
    {
      collection: 'worksheet_images',
      meta: {
        collection: 'worksheet_images',
        icon: 'image',
        note: 'Images for worksheet generators',
        display_template: '{{name}} ({{file_name}})',
        archive_field: 'status',
        archive_value: 'archived'
      },
      schema: {
        name: 'worksheet_images'
      },
      fields: [
        {
          field: 'id',
          type: 'integer',
          meta: {
            hidden: true,
            readonly: true,
            interface: 'input',
            special: ['auto-increment', 'primary-key']
          },
          schema: {
            is_primary_key: true,
            auto_increment: true
          }
        },
        {
          field: 'name',
          type: 'json',
          meta: {
            interface: 'input-code',
            display: 'raw',
            note: 'Image name in multiple languages (JSON format)',
            required: true,
            options: {
              language: 'json',
              template: '{
  "en": "English Name",
  "de": "German Name",
  "fr": "French Name",
  "es": "Spanish Name",
  "pt": "Portuguese Name",
  "it": "Italian Name",
  "nl": "Dutch Name",
  "sv": "Swedish Name",
  "da": "Danish Name",
  "no": "Norwegian Name",
  "fi": "Finnish Name"
}'
            }
          }
        },
        {
          field: 'file_name',
          type: 'string',
          meta: {
            interface: 'input',
            display: 'raw',
            note: 'Original filename',
            required: true
          }
        },
        {
          field: 'image_file',
          type: 'uuid',
          meta: {
            interface: 'file-image',
            display: 'image',
            note: 'Upload the image file'
          },
          schema: {
            foreign_key_table: 'directus_files',
            foreign_key_column: 'id'
          }
        },
        {
          field: 'theme',
          type: 'integer',
          meta: {
            interface: 'select-dropdown-m2o',
            display: 'related-values',
            special: ['m2o']
          },
          schema: {
            foreign_key_table: 'image_themes',
            foreign_key_column: 'id'
          }
        },
        {
          field: 'tags',
          type: 'json',
          meta: {
            interface: 'tags',
            display: 'labels',
            note: 'Tags for searching and filtering'
          }
        },
        {
          field: 'status',
          type: 'string',
          meta: {
            interface: 'select-dropdown',
            display: 'labels',
            options: {
              choices: [
                { text: 'Active', value: 'active' },
                { text: 'Archived', value: 'archived' }
              ]
            }
          },
          schema: {
            default_value: 'active'
          }
        }
      ]
    },
    {
      collection: 'blog_posts',
      meta: {
        collection: 'blog_posts',
        icon: 'article',
        note: 'Blog posts for SEO and content marketing',
        display_template: '{{title}}',
        archive_field: 'status',
        archive_value: 'draft'
      },
      fields: [
        {
          field: 'id',
          type: 'uuid',
          meta: {
            hidden: true,
            readonly: true,
            interface: 'input',
            special: ['uuid']
          },
          schema: {
            is_primary_key: true
          }
        },
        {
          field: 'title',
          type: 'json',
          meta: {
            interface: 'translations',
            display: 'translations',
            required: true
          }
        },
        {
          field: 'slug',
          type: 'string',
          meta: {
            interface: 'input',
            display: 'raw',
            required: true
          },
          schema: {
            is_unique: true
          }
        },
        {
          field: 'content',
          type: 'json',
          meta: {
            interface: 'input-rich-text-html',
            display: 'formatted-value'
          }
        },
        {
          field: 'excerpt',
          type: 'json',
          meta: {
            interface: 'input-multiline',
            display: 'formatted-value'
          }
        },
        {
          field: 'featured_image',
          type: 'uuid',
          meta: {
            interface: 'file-image',
            display: 'image'
          }
        },
        {
          field: 'seo_title',
          type: 'string',
          meta: {
            interface: 'input',
            note: 'SEO title (max 60 characters)'
          }
        },
        {
          field: 'seo_description',
          type: 'text',
          meta: {
            interface: 'input-multiline',
            note: 'SEO meta description (max 160 characters)'
          }
        },
        {
          field: 'seo_keywords',
          type: 'json',
          meta: {
            interface: 'tags',
            note: 'SEO keywords'
          }
        },
        {
          field: 'published_date',
          type: 'timestamp',
          meta: {
            interface: 'datetime',
            display: 'datetime'
          }
        },
        {
          field: 'status',
          type: 'string',
          meta: {
            interface: 'select-dropdown',
            options: {
              choices: [
                { text: 'Draft', value: 'draft' },
                { text: 'Published', value: 'published' }
              ]
            }
          },
          schema: {
            default_value: 'draft'
          }
        }
      ]
    },
    {
      collection: 'seo_settings',
      meta: {
        singleton: true,
        collection: 'seo_settings',
        icon: 'search',
        note: 'Global SEO settings'
      },
      fields: [
        {
          field: 'site_title',
          type: 'string',
          meta: {
            interface: 'input',
            note: 'Default site title'
          }
        },
        {
          field: 'site_description',
          type: 'text',
          meta: {
            interface: 'input-multiline',
            note: 'Default site description'
          }
        },
        {
          field: 'og_image',
          type: 'uuid',
          meta: {
            interface: 'file-image',
            note: 'Default Open Graph image'
          }
        },
        {
          field: 'google_analytics_id',
          type: 'string',
          meta: {
            interface: 'input',
            note: 'Google Analytics tracking ID'
          }
        },
        {
          field: 'sitemap_enabled',
          type: 'boolean',
          meta: {
            interface: 'boolean'
          },
          schema: {
            default_value: true
          }
        }
      ]
    }
  ]
};