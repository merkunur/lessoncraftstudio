#!/bin/sh

echo "Starting Strapi with fixed sharp module..."

# Install sharp properly for Alpine Linux
echo "Installing sharp for Alpine Linux..."
npm install sharp@0.33.4 --platform=linuxmusl --arch=x64 --save

# If upload plugin exists, rebuild its sharp
if [ -d "node_modules/@strapi/plugin-upload/node_modules/sharp" ]; then
    echo "Fixing sharp in upload plugin..."
    cd node_modules/@strapi/plugin-upload
    npm install sharp@0.33.4 --platform=linuxmusl --arch=x64 --save
    cd ../..
fi

# Start Strapi
echo "Starting Strapi..."
npm run develop