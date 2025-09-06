# PowerShell script to run the Strapi migration

# Set environment variables
$env:STRAPI_URL = "http://localhost:1337"
$env:STRAPI_API_TOKEN = "258d6ae6b0dd2c238b5558652df468f8ac166812a18ba5cc6129594e86ad84bd9956381bc0f3bc8851128c83f67aeb1a6d16925a96f68920f013172b837fc7691efef85d71cc0dda3c925b6af7d46fba94ef49c7d0f76ac29f3fdaa972bcda870a30eb3d9b71bea9a1c73ae57967e9d8008e20ffd919b5d6bbc539dbb7dfc8ad"

Write-Host "Testing Strapi connection..." -ForegroundColor Yellow
node scripts/test-strapi-token.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nRunning image migration..." -ForegroundColor Yellow
    node scripts/migrate-images.js
} else {
    Write-Host "Failed to connect to Strapi. Please check your token and URL." -ForegroundColor Red
}