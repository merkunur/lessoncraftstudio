#!/bin/sh

# Fix sharp module for Alpine Linux
echo "Fixing sharp module for Alpine Linux..."

# Check if @strapi/plugin-upload has its own sharp
if [ -d "node_modules/@strapi/plugin-upload/node_modules/sharp" ]; then
    echo "Found sharp in @strapi/plugin-upload, rebuilding..."
    cd node_modules/@strapi/plugin-upload
    npm rebuild sharp --platform=linuxmusl --arch=x64
    cd ../..
fi

# Also rebuild the main sharp module
if [ -d "node_modules/sharp" ]; then
    echo "Rebuilding main sharp module..."
    npm rebuild sharp --platform=linuxmusl --arch=x64
fi

echo "Sharp module fix complete!"