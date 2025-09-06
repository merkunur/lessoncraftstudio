// This script creates all necessary Strapi content type files
const fs = require('fs');
const path = require('path');

// Helper function to create directories
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Helper function to write file
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`Created file: ${filePath}`);
}

// Create image-theme controller, routes, services
const imageThemeDir = path.join(__dirname, '..', 'strapi', 'src', 'api', 'image-theme');
ensureDir(path.join(imageThemeDir, 'controllers'));
ensureDir(path.join(imageThemeDir, 'routes'));
ensureDir(path.join(imageThemeDir, 'services'));

// Image Theme Controller
writeFile(path.join(imageThemeDir, 'controllers', 'image-theme.js'), `'use strict';

/**
 * image-theme controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::image-theme.image-theme');`);

// Image Theme Routes
writeFile(path.join(imageThemeDir, 'routes', 'image-theme.js'), `'use strict';

/**
 * image-theme router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::image-theme.image-theme');`);

// Image Theme Services
writeFile(path.join(imageThemeDir, 'services', 'image-theme.js'), `'use strict';

/**
 * image-theme service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::image-theme.image-theme');`);

// Create image-asset content type
const imageAssetDir = path.join(__dirname, '..', 'strapi', 'src', 'api', 'image-asset');
ensureDir(path.join(imageAssetDir, 'content-types', 'image-asset'));
ensureDir(path.join(imageAssetDir, 'controllers'));
ensureDir(path.join(imageAssetDir, 'routes'));
ensureDir(path.join(imageAssetDir, 'services'));

// Image Asset Schema
writeFile(path.join(imageAssetDir, 'content-types', 'image-asset', 'schema.json'), JSON.stringify({
  "kind": "collectionType",
  "collectionName": "image_assets",
  "info": {
    "singularName": "image-asset",
    "pluralName": "image-assets",
    "displayName": "Image Asset",
    "description": "Individual images for worksheet generators"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "fileKey": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "displayName": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "file": {
      "type": "media",
      "required": true,
      "allowedTypes": ["images"]
    },
    "themes": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::image-theme.image-theme"
    },
    "isPremium": {
      "type": "boolean",
      "default": false
    },
    "metadata": {
      "type": "json"
    }
  }
}, null, 2));

// Image Asset Controller
writeFile(path.join(imageAssetDir, 'controllers', 'image-asset.js'), `'use strict';

/**
 * image-asset controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::image-asset.image-asset');`);

// Image Asset Routes
writeFile(path.join(imageAssetDir, 'routes', 'image-asset.js'), `'use strict';

/**
 * image-asset router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::image-asset.image-asset');`);

// Image Asset Services
writeFile(path.join(imageAssetDir, 'services', 'image-asset.js'), `'use strict';

/**
 * image-asset service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::image-asset.image-asset');`);

console.log('\n✅ All content type files created successfully!');
console.log('\nNext steps:');
console.log('1. Restart Strapi to load the new content types');
console.log('2. Run the migration script to upload data');
console.log('3. Configure permissions in Strapi admin panel');