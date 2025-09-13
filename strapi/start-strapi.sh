#!/bin/sh

echo "Starting Strapi with custom configuration..."

# Remove the upload plugin that's causing issues
echo "Removing @strapi/plugin-upload..."
rm -rf node_modules/@strapi/plugin-upload

# Start Strapi
echo "Starting Strapi..."
npm run develop