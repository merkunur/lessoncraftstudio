#!/bin/bash

# ========================================
# FIX CRITICAL DEPLOYMENT ISSUES
# ========================================
# This script fixes the most critical issues
# preventing successful deployment
# ========================================

set -e

echo "🔧 Starting critical fixes for LessonCraftStudio deployment..."

# ========================================
# 1. Create Production Dockerfile
# ========================================
echo ""
echo "📝 Creating production Dockerfile..."

cat > frontend/Dockerfile << 'EOF'
# Stage 1: Install dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Stage 2: Build application
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js
RUN npm run build

# Stage 3: Production runtime
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create directories for persistent data
RUN mkdir -p /app/public/images /app/public/data
RUN chown -R nextjs:nodejs /app/public/images /app/public/data

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
EOF

echo "✅ Dockerfile created"

# ========================================
# 2. Update docker-compose.prod.yml
# ========================================
echo ""
echo "📝 Updating docker-compose.prod.yml with persistent volumes..."

# Backup original
cp docker-compose.prod.yml docker-compose.prod.yml.backup

# Add volumes section if not exists
if ! grep -q "frontend_uploads:" docker-compose.prod.yml; then
  cat >> docker-compose.prod.yml << 'EOF'
  frontend_uploads:
  frontend_data:
EOF
fi

# Add volumes to frontend service (this is tricky in bash, better to do manually)
echo "⚠️  NOTE: You need to manually add volumes to frontend service in docker-compose.prod.yml:"
echo ""
echo "  frontend:"
echo "    volumes:"
echo "      - frontend_uploads:/app/public/images"
echo "      - frontend_data:/app/public/data"
echo ""

# ========================================
# 3. Fix API URL in content manager
# ========================================
echo "📝 Fixing hardcoded API URL in content-manager-v2.html..."

sed -i.backup "s|const API_URL = 'http://localhost:3000';|const API_URL = window.location.origin;|g" \
  frontend/public/worksheet-generators/content-manager-v2.html

echo "✅ API URL fixed"

# ========================================
# 4. Add environment variables
# ========================================
echo ""
echo "📝 Checking environment variables..."

if [ ! -f .env ]; then
  echo "⚠️  .env file not found. Please create it from .env.example"
else
  # Add missing variables if not present
  if ! grep -q "NEXT_PUBLIC_MAX_FILE_SIZE" .env; then
    echo "" >> .env
    echo "# File Upload Configuration" >> .env
    echo "NEXT_PUBLIC_MAX_FILE_SIZE=5242880  # 5MB in bytes" >> .env
    echo "NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/svg+xml,image/webp" >> .env
    echo "✅ Added file upload configuration to .env"
  fi
fi

# ========================================
# 5. Update next.config.js for standalone
# ========================================
echo ""
echo "📝 Checking next.config.js for standalone output..."

if [ -f frontend/next.config.js ]; then
  if ! grep -q "output: 'standalone'" frontend/next.config.js; then
    echo "⚠️  WARNING: next.config.js doesn't have 'output: standalone'"
    echo "   Add this to next.config.js:"
    echo ""
    echo "   module.exports = {"
    echo "     output: 'standalone',"
    echo "     // ... rest of config"
    echo "   }"
    echo ""
  fi
fi

# ========================================
# 6. Create fix for file upload in content manager
# ========================================
echo ""
echo "📝 Creating fixed version of saveImage function..."

cat > frontend/public/worksheet-generators/content-manager-upload-fix.js << 'EOF'
// Add this to content-manager-v2.html to fix file upload
// Replace the existing saveImage() function with this one

async function saveImage() {
  const fileInput = document.getElementById('imageFileInput');
  const file = fileInput.files[0];
  const displayName = document.getElementById('imageDisplayName').value;

  if (!file) {
    showToast('Please select a file', 'error');
    return;
  }

  if (!currentTheme) {
    showToast('Please select a theme first', 'error');
    return;
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast(`File too large. Max size: 5MB (file is ${(file.size / 1024 / 1024).toFixed(2)}MB)`, 'error');
    return;
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    showToast('Invalid file type. Allowed: JPG, PNG, SVG, WebP', 'error');
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('files', file);
  formData.append('themeId', currentTheme);

  // Collect translations
  const translations = {};
  languages.forEach(lang => {
    const input = document.getElementById(`trans_${lang.code}`);
    if (input && input.value) {
      translations[lang.code] = input.value;
    }
  });

  // Add display name as English translation if provided
  if (displayName) {
    translations['en'] = displayName;
  }

  formData.append('translations', JSON.stringify({ [file.name]: translations }));

  try {
    showToast('Uploading...', 'success');

    const response = await fetch(`${API_URL}/api/admin/images/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (response.ok) {
      const result = await response.json();
      closeModal();
      showToast(`Successfully uploaded ${result.images.length} image(s)!`, 'success');

      // Clear form
      fileInput.value = '';
      document.getElementById('imageDisplayName').value = '';
      languages.forEach(lang => {
        const input = document.getElementById(`trans_${lang.code}`);
        if (input) input.value = '';
      });

      // Reload content
      loadContent(currentType);
    } else {
      const error = await response.json();
      showToast(error.error || 'Upload failed', 'error');
    }
  } catch (error) {
    console.error('Upload error:', error);
    showToast('Upload failed. Check console for details.', 'error');
  }
}
EOF

echo "✅ Created content-manager-upload-fix.js"
echo "   You need to manually integrate this into content-manager-v2.html"

# ========================================
# 7. Create deployment verification script
# ========================================
echo ""
echo "📝 Creating deployment verification script..."

cat > verify-deployment.sh << 'EOF'
#!/bin/bash

# Deployment Verification Script
echo "🔍 Verifying LessonCraftStudio deployment..."

# Check if containers are running
echo ""
echo "Checking containers..."
docker-compose -f docker-compose.prod.yml ps

# Check frontend health
echo ""
echo "Checking frontend..."
curl -f http://localhost:3000 > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Frontend is responding"
else
  echo "❌ Frontend is not responding"
fi

# Check API health
echo ""
echo "Checking API..."
curl -f http://localhost:3001 > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ API is responding"
else
  echo "❌ API is not responding"
fi

# Check content manager
echo ""
echo "Checking content manager..."
curl -f http://localhost:3000/worksheet-generators/content-manager-v2.html > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Content manager is accessible"
else
  echo "❌ Content manager is not accessible"
fi

# Check database
echo ""
echo "Checking database..."
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U lcsuser -d lessoncraftstudio -c "SELECT 1" > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Database is accessible"
else
  echo "❌ Database is not accessible"
fi

# Check volumes
echo ""
echo "Checking volumes..."
docker volume ls | grep -q "frontend_uploads"
if [ $? -eq 0 ]; then
  echo "✅ frontend_uploads volume exists"
else
  echo "❌ frontend_uploads volume does not exist"
fi

docker volume ls | grep -q "frontend_data"
if [ $? -eq 0 ]; then
  echo "✅ frontend_data volume exists"
else
  echo "❌ frontend_data volume does not exist"
fi

echo ""
echo "🎉 Verification complete!"
EOF

chmod +x verify-deployment.sh
echo "✅ Created verify-deployment.sh"

# ========================================
# Summary
# ========================================
echo ""
echo "=========================================="
echo "✅ CRITICAL FIXES COMPLETED"
echo "=========================================="
echo ""
echo "Fixed:"
echo "  ✅ Created production Dockerfile"
echo "  ✅ Fixed hardcoded API URL in content-manager-v2.html"
echo "  ✅ Added environment variables for file uploads"
echo "  ✅ Created upload fix JavaScript"
echo "  ✅ Created deployment verification script"
echo ""
echo "MANUAL STEPS REQUIRED:"
echo ""
echo "1. Edit docker-compose.prod.yml and add volumes to frontend service:"
echo "   volumes:"
echo "     - frontend_uploads:/app/public/images"
echo "     - frontend_data:/app/public/data"
echo ""
echo "2. Integrate content-manager-upload-fix.js into content-manager-v2.html"
echo "   Replace the saveImage() function with the new one"
echo ""
echo "3. Check next.config.js has: output: 'standalone'"
echo ""
echo "4. Move content manager to protected route (recommended)"
echo "   From: frontend/public/worksheet-generators/content-manager-v2.html"
echo "   To: frontend/app/admin/content-manager/page.tsx"
echo ""
echo "5. Test locally before deploying:"
echo "   docker-compose -f docker-compose.prod.yml build"
echo "   docker-compose -f docker-compose.prod.yml up -d"
echo "   ./verify-deployment.sh"
echo ""
echo "=========================================="
echo ""
echo "For full details, see: CONTENT_MANAGER_DEPLOYMENT_ANALYSIS.md"
