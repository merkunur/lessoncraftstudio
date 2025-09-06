#!/usr/bin/env node

/**
 * Image Migration Script
 * Migrates all images from legacy-apps/public/images to Strapi CMS
 * Creates ImageTheme and ImageAsset entries
 */

const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || 'YOUR_API_TOKEN_HERE';
const IMAGES_DIR = path.join(__dirname, '../legacy-apps/public/images');
const EXCLUDED_FOLDERS = ['borders', 'backgrounds', 'drawing lines', 'template'];

console.log('🚀 Starting image migration to Strapi...');
console.log(`📁 Source directory: ${IMAGES_DIR}`);
console.log(`🌐 Strapi URL: ${STRAPI_URL}`);
console.log('⚠️  Note: You need to generate an API token in Strapi admin panel');
console.log('   Go to Settings > API Tokens > Create new API Token');
console.log('   Give it full access and copy the token');
console.log('   Then run: STRAPI_API_TOKEN=your_token_here node scripts/migrate-images-to-strapi.js');
