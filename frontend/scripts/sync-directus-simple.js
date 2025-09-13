#!/usr/bin/env node

// Simple sync script that doesn't require axios
// Just ensures folders exist for themes

const fs = require('fs');
const path = require('path');

console.log('🔄 Preparing image library folders...\n');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('✅ Image library ready!\n');
console.log('Note: Full Directus sync will happen when Directus is available.');