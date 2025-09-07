# CLAUDE.md - LessonCraftStudio Implementation Guide

## 🚨 CRITICAL FIX: Image Translation Support
**PROBLEM**: Image file names stay in English even when users select another language from language settings.

**SOLUTION**: Add locale parameter to all image API calls and display translated names.

**Implementation Steps**:

### 1. Add currentLocale Variable
```javascript
let currentLocale = 'en'; // Current language setting
```

### 2. Initialize Locale from URL
```javascript
const urlParams = new URLSearchParams(window.location.search);
const localeParam = urlParams.get('locale');
if (localeParam && languageSelect) {
  languageSelect.value = localeParam;
  currentLocale = localeParam;
}
```

### 3. Add Locale to ALL Image API Calls
```javascript
// For themes
const response = await fetch(`/api/themes/nested?locale=${currentLocale}`);

// For image search
const response = await fetch(`/api/images?search=${query}&locale=${currentLocale}`);

// For theme images  
const response = await fetch(`/api/images?theme=${theme}&locale=${currentLocale}`);
```

### 4. Display Translated Names
```javascript
// Use translated name if available, otherwise fall back to word
const displayName = imgData.name || imgData.word;
item.innerHTML = `<img src="${imgData.path}" alt="${displayName}" loading="lazy"/><span>${displayName}</span>`;
```

### 5. Reload on Language Change (if not reloading page)
```javascript
languageSelect.addEventListener('change', function() {
  currentLocale = this.value;
  applyTranslations();
  loadThemes(); // Reload with new locale
  if (dictThemeEl.value && dictThemeEl.value !== 'all') {
    renderImagesAfterLoadOrSearch(); // Reload images
  }
});
```

**APPS FIXED**: Word Search ✅, Math Worksheets ✅
**NEEDS FIXING**: All remaining 31 apps that display images

## 🚨 CRITICAL FIX: Canvas Clipping Issue with Zoom
**PROBLEM**: When using `canvas.setZoom()` for display scaling, elements get cut off when moved to the right or bottom edges of the canvas.

**ROOT CAUSE**: The canvas wrapper has `overflow: auto` which clips the zoomed content. The canvas viewport doesn't match the zoomed dimensions.

**SOLUTION** (Apply to ALL apps with zoom scaling):

### 1. Fix CSS Overflow
```css
.canvas-container-wrapper {
    overflow: visible;  /* Changed from auto */
    position: relative;
}

/* Ensure Fabric.js container doesn't clip */
.canvas-container { 
    overflow: visible !important;
    position: relative !important;
}
```

### 2. Update Canvas Dimensions After Zoom
```javascript
function updateCanvasDisplayDimensions(width, height) {
    // Apply zoom first
    const finalZoom = (displayWidth / width);
    canvas.setZoom(finalZoom);
    
    // Set dimensions AFTER zoom to match viewport
    canvas.setDimensions({
        width: displayWidth,
        height: displayHeight
    });
}
```

### 3. Fix Export Functions
```javascript
async function getCanvasDataURL(canvasInstance) {
    // Save current state
    const currentZoom = canvasInstance.getZoom();
    const currentWidth = canvasInstance.getWidth();
    const currentHeight = canvasInstance.getHeight();
    
    // Reset for export
    canvasInstance.setZoom(1);
    canvasInstance.setDimensions({
        width: currentCanvasConfig.width,
        height: currentCanvasConfig.height
    });
    
    let dataURL = canvasInstance.toDataURL(...);
    
    // Restore display state
    canvasInstance.setZoom(currentZoom);
    canvasInstance.setDimensions({
        width: currentWidth,
        height: currentHeight
    });
    
    return dataURL;
}
```

**APPS FIXED**: Word Search ✅, Image Addition ✅, Alphabet Train ✅, Coloring Pages ✅
**NEEDS FIXING**: All remaining 29 apps that implement zoom scaling

## 📐 STANDARD PAGE SIZES FOR PUBLISHING
**CRITICAL**: All apps MUST use industry-standard page dimensions for professional publishing:

### Universal Publishing Standards (in points)
- **Letter Portrait**: 612×792 (8.5" × 11")
- **Letter Landscape**: 792×612 (11" × 8.5")
- **A4 Portrait**: 595×842 (210mm × 297mm)
- **A4 Landscape**: 842×595 (297mm × 210mm)
- **Square**: 1200×1200 (custom format)

### Default Canvas Configuration
```javascript
let currentCanvasConfig = { width: 612, height: 792 }; // Letter Portrait
```

### Page Size Options (ALL APPS MUST MATCH)
```html
<select id="pageSizeSelect">
    <option value="612x792">Letter Portrait (612x792)</option>
    <option value="792x612">Letter Landscape (792x612)</option>
    <option value="595x842">A4 Portrait (595x842)</option>
    <option value="842x595">A4 Landscape (842x595)</option>
    <option value="1200x1200">Square (1200x1200)</option>
    <option value="custom">Custom</option>
</select>
```

**FIXED APPS**: Word Search ✅, Image Addition ✅, Coloring Pages ✅
**NEEDS STANDARDIZATION**: Alphabet Train and remaining 29 apps

### User-Selected Dimensions (Publishing/Printing)
- **Downloads ALWAYS respect user-selected page dimensions**
- **All presets follow industry standards for professional publishing**
- **For publishing businesses**: Users can select exact dimensions they need
- **Implementation**: `updateCanvasDisplayDimensions()` updates both canvas and `currentCanvasConfig`
- **PDF/JPEG exports**: Automatically use `currentCanvasConfig.width` and `currentCanvasConfig.height`

## 🚨 CRITICAL UNDERSTANDING: Image Library is the CORE
**The entire purpose of using Strapi is to make image library management easy for non-technical admins.**
- All 33 worksheet generators depend on the image library
- Image file/folder names are essential for app functionality
- Must support 11 languages with translations
- Admin must be able to add/edit/organize images through Strapi
- **WITHOUT THIS, THE PROJECT IS NOT COMPLETE**

## PROJECT STATUS: 80% Complete
- ✅ Infrastructure: Docker, PostgreSQL, API, Frontend working
- ✅ Apps listing page: All 33 apps display correctly at /en/apps
- ✅ Individual app pages: ALL WORKING! (e.g., /en/apps/image-addition)
- ✅ Legacy HTML Apps: All 33 apps functional in iframe display
- ✅ Web Components: ALL 33 APPS CONVERTED AND WORKING!
- ✅ **Multilingual Support: 3/33 apps fully multilingual (Word Search, Alphabet Train, Coloring Pages)**
  - Full support for 11 languages (EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)
  - Theme names translate correctly
  - Image names translate correctly
  - Language-specific alphabets for Word Search and Alphabet Train
  - All apps use standard canvas size (765x990)
- ⚠️ **CRITICAL: Image Library NOT integrated with Strapi** (20% of project)
  - Apps currently use static images from folders
  - Admin cannot manage images through Strapi
  - This is THE CORE FEATURE that needs completion
- ✅ Payments: Basic Stripe integration structure in place
- ⚠️ Strapi: Running with SQLite (needs image content types fixed)

## 🌍 MULTILINGUAL IMPLEMENTATION (CRITICAL FOR REMAINING 31 APPS)

### ⚠️ CRITICAL LESSONS LEARNED
1. **JavaScript Order Matters**: Using DOM elements before they're defined breaks EVERYTHING
2. **Image Performance**: 300-600KB images as thumbnails = DISASTER. Use lazy loading!
3. **ID Consistency**: HTML `id="languageSelect"` ≠ JS `getElementById("language-select")`

### ✅ Completed Apps (3/33)
- **Word Search**: Full multilingual with language-specific alphabets, standard canvas size
- **Alphabet Train**: Full multilingual with proper alphabet ordering for each language
- **Coloring Pages**: Full multilingual with lazy loading, standard canvas size

### 📋 Quick Implementation Checklist
1. **Set standard canvas size**: `currentCanvasConfig = { width: 765, height: 990 }`
2. Add `<script src="js/translations.js"></script>` to head
3. Add language selector HTML (use `id="languageSelect"`)
4. Initialize `currentLocale` BEFORE DOM elements
5. Add language handler AFTER DOM elements defined
6. Use `/api/themes-translated?locale=${currentLocale}` for themes
7. Add `&locale=${currentLocale}` to all image API calls
8. **STANDARD**: Load "animals" theme by default when "All Themes" selected with no search
9. Implement lazy loading for images (load first 10, defer rest)
10. **FIX CANVAS CLIPPING**: Change overflow to visible, set dimensions after zoom
11. Test all 11 languages

### 🔧 Canvas Size Implementation
```javascript
// Default size on load
let currentCanvasConfig = { width: 765, height: 990 };

// When user selects different size
function handlePageSizeChange() {
    const [w, h] = this.value.split('x').map(Number);
    updateCanvasDisplayDimensions(w, h);  // Updates currentCanvasConfig
}

// Downloads automatically use current dimensions
async function downloadPDF() {
    const pdf = new jsPDF({ 
        orientation: orientation, 
        unit: 'pt', 
        format: [currentCanvasConfig.width, currentCanvasConfig.height]  // User's selected size
    });
    // PDF will be exact dimensions user selected
}
```

### 📚 Full Documentation
See `MULTILINGUAL-WORKFLOW.md` for complete step-by-step instructions

## CRITICAL ISSUES TO FIX FIRST

### 1. Strapi Database Configuration
**Status**: Switched to SQLite for development
**Location**: strapi/config/database.js configured for SQLite
**Note**: PostgreSQL can be re-enabled in production

### 2. Strapi Running Locally
**Status**: Running at http://localhost:1337
**Content Types**: app-info, image-asset, image-theme created
**API Routes**: Public access enabled for development

### 3. All App Pages Working
**Status**: FIXED - All 33 app pages accessible
**Solution**: Modified getAppData to always return data
**Location**: frontend/app/[locale]/apps/[slug]/page.tsx

## STEP-BY-STEP COMPLETION PLAN

### PHASE 1: Fix Current Blockers (Do This First!)
```bash
# 1. Fix database connection
docker-compose down
# Edit docker-compose.yml - ensure all passwords are lcspass123!
docker-compose up -d postgres
docker-compose up -d api

# 2. Fix Strapi
cd strapi
npm install
cd ..
docker-compose up -d strapi

# 3. Test everything
curl http://localhost:3001/health  # Should return {"status":"healthy"}
curl http://localhost:1337/admin   # Should load Strapi admin
curl http://localhost:3000/en/apps # Should show all apps
```

### PHASE 2: Web Components ✅ COMPLETE!

#### Status: ALL 33 APPS CONVERTED!
- ✅ All web components created in frontend/web-components/
- ✅ Copied to ../lessoncraftstudio-latest/frontend/web-components/
- ✅ All apps working at http://localhost:3000/en/apps/[app-name]

#### Completed Apps:
- Free Tier (1): word-search
- Core Bundle (10): image-addition, alphabet-train, coloring, math-worksheet, word-scramble, find-and-count, matching-app, drawing-lines, picture-bingo, sudoku
- Full Access (22): All remaining apps

#### Conversion Steps for Each App:
```javascript
// 1. Copy HTML from frontend/public/[app-name].html
// 2. Create frontend/web-components/[app-name]/index.js
// 3. Use this template:

import { BaseWebComponent } from '../shared/BaseWebComponent.js';

class AppNameGenerator extends BaseWebComponent {
  get appName() { return 'app-name'; }
  
  render() {
    // Copy HTML structure here
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="app-container">
        <!-- HTML from legacy app -->
      </div>
    `;
  }
  
  getStyles() {
    // Copy CSS from legacy app
    return `/* styles here */`;
  }
}

customElements.define('lcs-app-name', AppNameGenerator);
```

### PHASE 3: CRITICAL - Complete Image Library System (HIGHEST PRIORITY!)

#### Why This Is Critical:
- **Image library is the HEART of the entire system** - all 33 apps depend on it
- **File/folder names are essential** - apps scan folders as themes and use filenames
- **Must be multilingual** - support 11 languages for global reach
- **Must be admin-friendly** - non-tech users need to manage images easily

#### Current Image Structure:
```
frontend/public/images/
├── animals/        (cat.png, dog.png, bird.png...)
├── food/           (apple.png, banana.png, pizza.png...)
├── transportation/ (car.png, bus.png, plane.png...)
├── nature/         (tree.png, flower.png, sun.png...)
├── school/         (pencil.png, book.png, desk.png...)
├── sports/         (ball.png, tennis.png, swimming.png...)
└── 100+ more themes with 1000+ images total
```

#### Step-by-Step Implementation:

##### Step 1: Fix Strapi Image Content Types
```javascript
// strapi/src/api/image-theme/content-types/image-theme/schema.json
{
  "attributes": {
    "folderName": { // CRITICAL: This matches actual folder name
      "type": "string",
      "required": true,
      "unique": true
    },
    "translations": { // Store all 11 language translations
      "type": "json",
      "required": true
      // Format: { "en": "Animals", "de": "Tiere", "fr": "Animaux"... }
    },
    "parentTheme": { // For nested themes
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::image-theme.image-theme"
    },
    "sortOrder": {
      "type": "integer"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    }
  }
}

// strapi/src/api/image-asset/content-types/image-asset/schema.json
{
  "attributes": {
    "fileName": { // CRITICAL: Original filename without extension
      "type": "string",
      "required": true
    },
    "translations": { // All 11 language translations
      "type": "json",
      "required": true
      // Format: { "en": "Cat", "de": "Katze", "fr": "Chat"... }
    },
    "file": {
      "type": "media",
      "required": true,
      "allowedTypes": ["images"]
    },
    "theme": { // Link to theme
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::image-theme.image-theme"
    },
    "tags": { // For search and filtering
      "type": "json"
    }
  }
}
```

##### Step 2: Create Admin-Friendly Strapi Interface
```javascript
// strapi/src/admin/app.js
export default {
  config: {
    locales: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'],
  },
  bootstrap(app) {
    // Add custom image library manager button to admin panel
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'bulk-translate',
      Component: BulkTranslateButton
    });
  }
};
```

##### Step 3: Migration Script with Translations
```javascript
// scripts/migrate-images-with-translations.js
const translations = {
  // Theme translations
  "animals": {
    "en": "Animals",
    "de": "Tiere",
    "fr": "Animaux",
    "es": "Animales",
    "pt": "Animais",
    "it": "Animali",
    "nl": "Dieren",
    "sv": "Djur",
    "da": "Dyr",
    "no": "Dyr",
    "fi": "Eläimet"
  },
  // Image translations
  "cat": {
    "en": "Cat",
    "de": "Katze",
    "fr": "Chat",
    "es": "Gato",
    "pt": "Gato",
    "it": "Gatto",
    "nl": "Kat",
    "sv": "Katt",
    "da": "Kat",
    "no": "Katt",
    "fi": "Kissa"
  }
  // ... complete translation dictionary
};

async function migrateWithTranslations() {
  // 1. Scan all folders in frontend/public/images/
  // 2. Create theme entries with translations
  // 3. Upload images and create asset entries with translations
  // 4. Maintain folder/file structure relationships
}
```

##### Step 4: Create API Endpoints for Apps
```javascript
// frontend/app/api/image-library/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';
  
  // Fetch from Strapi with translations
  const response = await fetch(`${STRAPI_URL}/api/image-assets?filters[theme][folderName][$eq]=${theme}`);
  const data = await response.json();
  
  // Return images with localized names
  return NextResponse.json({
    theme: data.theme.translations[locale],
    images: data.images.map(img => ({
      url: img.file.url,
      name: img.translations[locale],
      fileName: img.fileName
    }))
  });
}
```

##### Step 5: Update Web Components to Use Dynamic Images
```javascript
// frontend/web-components/shared/ImageLibraryMixin.js
export const ImageLibraryMixin = {
  async loadThemeImages(themeName) {
    const locale = this.getAttribute('locale') || 'en';
    const response = await fetch(`/api/image-library?theme=${themeName}&locale=${locale}`);
    const data = await response.json();
    this.images = data.images;
    this.updateImageGrid();
  }
};

// Update each web component to use the mixin
class WordSearchGenerator extends BaseWebComponent {
  async connectedCallback() {
    await this.loadThemeImages('animals'); // Load from Strapi
    super.connectedCallback();
  }
}
```

##### Step 6: Admin Workflows in Strapi
1. **Add New Theme**: Content Manager → Image Themes → Create
   - Enter folder name (matches file system)
   - Add translations for all 11 languages
   - Set sort order and active status

2. **Add New Images**: Content Manager → Image Assets → Create
   - Upload image file
   - Select theme
   - Add translations for all 11 languages
   - Add searchable tags

3. **Bulk Operations**: Custom admin panel features
   - Bulk translate using Google Translate API
   - Bulk upload with CSV for translations
   - Export/Import theme configurations

##### Step 7: Maintain File System Sync
```javascript
// strapi/src/api/image-asset/services/image-asset.js
module.exports = createCoreService('api::image-asset.image-asset', ({ strapi }) => ({
  async afterCreate(event) {
    // When image added in Strapi, also save to file system
    const { result, params } = event;
    const theme = await strapi.entityService.findOne('api::image-theme.image-theme', result.theme.id);
    
    // Save to frontend/public/images/{theme.folderName}/{fileName}
    await saveToFileSystem(result.file, theme.folderName, result.fileName);
  },
  
  async afterUpdate(event) {
    // Sync changes to file system
  },
  
  async afterDelete(event) {
    // Remove from file system
  }
}));
```

#### Testing Checklist:
- [ ] Admin can add new theme with translations
- [ ] Admin can upload images with translations
- [ ] Web components load images dynamically
- [ ] Images display with correct language
- [ ] File system stays in sync
- [ ] Bulk operations work efficiently

### PHASE 4: Complete Authentication Flow

Files to complete:
- frontend/app/[locale]/(auth)/signin/page.tsx
- frontend/app/[locale]/(auth)/signup/page.tsx
- frontend/app/[locale]/(auth)/verify/page.tsx
- frontend/app/[locale]/dashboard/page.tsx

### PHASE 5: Implement Payments

```javascript
// 1. Get Stripe keys from dashboard.stripe.com
// 2. Update .env:
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

// 3. Implement in api/src/controllers/subscription.controller.ts
// 4. Add checkout to frontend/app/[locale]/pricing/page.tsx
```

## PROJECT STRUCTURE (Reference Only)

```
lessoncraftstudio/
├── frontend/           # Next.js 14 app
│   ├── app/           # App router pages
│   ├── components/    # React components
│   ├── web-components/# 33 worksheet generators (1/33 done)
│   └── public/        # Legacy HTML apps & images
├── api/               # Express.js API
├── strapi/            # Strapi v5 CMS
├── docker-compose.yml # Container orchestration
└── .env               # Environment variables
```

## QUICK COMMANDS

```bash
# Start everything
docker-compose up -d

# Check status
docker ps

# View logs
docker logs lcs-frontend
docker logs lcs-api
docker logs lcs-strapi

# Restart a service
docker-compose restart frontend

# Test endpoints
curl http://localhost:3000/en/apps     # Frontend
curl http://localhost:3001/health      # API
curl http://localhost:1337/admin       # Strapi
```

## CURRENT WORKING URLS
- ✅ http://localhost:3000/en - Homepage
- ✅ http://localhost:3000/en/apps - Apps directory (all 33 apps display)
- ✅ http://localhost:3000/en/apps/word-search - Individual app pages NOW WORKING!
- ✅ http://localhost:3000/en/apps/image-addition - All apps load in iframe
- ✅ http://localhost:3000/en/apps/coloring - Full functionality available
- ✅ http://localhost:3000/worksheet-generators/addition.html - Direct HTML access
- ✅ http://localhost:3001/health - API health check
- ⚠️ http://localhost:1337/admin - Strapi admin (container issues - not critical)

## ENVIRONMENT VARIABLES (.env)
```
DB_USER=lcsuser
DB_PASSWORD=lcspass123!
DB_NAME=lessoncraftstudio
JWT_SECRET=Or838tWGlXCOY0zIr5IwWVKg8AOXZA0KsPTDl/2SYAw=
ADMIN_JWT_SECRET=ZJstR/AazMMJKDTzTo70zAFGtDcdpLivvekTmMdo7Tc=
NEXTAUTH_SECRET=tqEULwU9scBVe5UDr+Dbz/baIDQ22fjdyHexktkOGR8=
APP_KEYS=Ev15Ad/Z/ykj3W8zIE7kMg==,EjsvTnunOUDAj0IDxGj9iQ==,app-key-3,app-key-4
```

## COMPLETION CHECKLIST

### Infrastructure (95% ✅)
- [x] Docker setup
- [x] PostgreSQL database
- [x] Express API server
- [x] Next.js frontend
- [ ] Strapi CMS (running but connection issues)

### Frontend (80% ✅)
- [x] Homepage
- [x] Apps listing page
- [x] Navigation & layout
- [x] 11 language support
- [ ] Individual app pages (404 issue)
- [ ] User dashboard

### Web Components (3% ❌)
- [x] Word Search (1/33)
- [ ] Core Bundle apps (0/10)
- [ ] Full Access apps (0/22)

### Features (10% ❌)
- [ ] Image library migration
- [ ] User authentication flow
- [ ] Payment integration
- [ ] Subscription management
- [ ] Email notifications

## REMEMBER
1. **Don't rebuild Docker images** - User explicitly said not to
2. **Apps were working before** - Focus on restoring, not rewriting
3. **Use existing code** - Legacy HTML apps are in frontend/public/
4. **Test incrementally** - Verify each step works before moving on
5. **Prioritize Core Bundle** - Get 10 most popular apps working first