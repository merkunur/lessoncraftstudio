# CLAUDE.md - LessonCraftStudio Complete Project Guide

## 🎯 PROJECT OVERVIEW

### What We're Building
**LessonCraftStudio** - A professional worksheet generator platform for educators and parents
- **33 interactive worksheet generator apps** (word search, math puzzles, coloring pages, etc.)
- **Multi-language support** for 11 languages (EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)
- **Dynamic image library** managed through Directus CMS
- **Subscription-based SaaS** with free tier, core bundle, and full access
- **Professional publishing quality** - outputs in standard page sizes for printing/publishing businesses

### Why We're Building It
- **For Educators**: Easy-to-use tools to create custom educational materials
- **For Publishing Businesses**: Professional-quality worksheets in standard formats
- **For Global Reach**: Full multilingual support for international markets
- **For Easy Management**: Non-technical admins can manage all content through Directus CMS

### The Core Architecture
```
Frontend (Next.js) → API Routes → Directus CMS → PostgreSQL
     ↓                    ↓              ↓            ↓
33 HTML Apps      Image Proxy     Image Library   Database
     ↓                    ↓              ↓            ↓
Web Components    Authentication  141+ Images    Translations
```

## 📊 CURRENT PROJECT STATUS: 85% Complete

### ✅ COMPLETED (What's Working)
1. **Infrastructure** (100%)
   - Docker containerization with PostgreSQL
   - Next.js 14 frontend at http://localhost:3000
   - Express.js API at http://localhost:3001
   - Directus CMS at http://localhost:8055

2. **Directus CMS Integration** (100%)
   - Full image library management system
   - 141 images uploaded and categorized
   - Special collections: backgrounds, borders, templates
   - Multilingual translations for all content
   - API authentication and proxy endpoints

3. **Frontend Structure** (100%)
   - All 33 app pages working
   - App listing page with categories
   - Navigation and routing
   - 11 language support infrastructure

4. **Image Library System** (100%)
   - Dynamic loading from Directus
   - API endpoint: `/api/images`
   - Image proxy: `/api/directus-image`
   - Real-time updates from CMS
   - Search and theme filtering

5. **Web Components** (100%)
   - All 33 apps converted to web components
   - Located in `frontend/web-components/`
   - Working at `/en/apps/[app-name]`

### ⚠️ IN PROGRESS (Partially Complete)

1. **Multilingual Implementation** (10%)
   - ✅ Completed: Word Search, Alphabet Train, Coloring Pages
   - ❌ Remaining: 30 apps need multilingual support
   - Each app needs translation.js integration

2. **Canvas Scaling Issues** (10%)
   - ✅ Fixed: Word Search, Image Addition, Alphabet Train, Coloring Pages
   - ❌ Remaining: 29 apps have canvas clipping issues
   - Need overflow:visible and proper zoom implementation

3. **API Response Handling** (90%)
   - ✅ Most apps handle `{images: [...]}` structure
   - ⚠️ Some apps may still need fixes for API response extraction

### ❌ NOT STARTED (To Do)

1. **Authentication System** (0%)
   - User registration/login
   - Dashboard implementation
   - Session management

2. **Payment Integration** (0%)
   - Stripe checkout
   - Subscription management
   - Tier access control

3. **Email System** (0%)
   - Welcome emails
   - Payment confirmations
   - Password reset

## 🔧 CRITICAL PATTERNS & FIXES

### Pattern 1: API Response Structure
**Problem**: API returns `{images: [...], pagination: {...}}` but apps expect array
```javascript
// ❌ WRONG - Breaks when API returns object
const images = await response.json();

// ✅ CORRECT - Handles both formats
const data = await response.json();
const images = data.images || data;
```

### Pattern 2: Loading Default Content
**Problem**: "All Themes" shows empty library
```javascript
// ✅ SOLUTION - Load animals theme as default
if (theme === 'all' && !query) {
    const response = await fetch(`/api/images?theme=animals&locale=${currentLocale}`);
    const data = await response.json();
    imagesToDisplay = data.images || data;
}
```

### Pattern 3: Missing Function Calls
**Problem**: Functions exist but aren't called on page load
```javascript
// ✅ SOLUTION - Call after themes load
loadThemes().then(() => {
    loadDictionary(); // or renderDictionary() or loadThemeImages()
});
```

### Pattern 4: Canvas Display Scaling
**Problem**: Canvas gets clipped when zoomed
```javascript
// ✅ CORRECT ORDER
c.setZoom(finalZoom);           // First: Apply zoom
c.setDimensions({                // Second: Set viewport size
    width: displayWidth,
    height: displayHeight
});
```

## 📁 KEY FILES & LOCATIONS

### Image Library Apps (33 HTML files)
```
frontend/public/worksheet-generators/
├── word-search.html          ✅ Fully multilingual
├── alphabet-train.html       ✅ Fully multilingual  
├── coloring.html             ✅ Fully multilingual
├── image-addition.html       ✅ API fixed, needs multilingual
├── find-and-count.html       ✅ API fixed, needs multilingual
├── code-addition.html        ✅ API fixed, needs multilingual
├── grid-match.html           ✅ API fixed, needs multilingual
└── [26 more apps]            ⚠️ Need API fixes & multilingual
```

### API Endpoints
```
frontend/app/api/
├── images/route.ts           # Main image library endpoint
├── directus-image/route.ts   # Proxy for Directus assets
├── borders/route.ts          # Border images endpoint
├── backgrounds/route.ts      # Background images endpoint
└── themes/route.ts           # Theme listing endpoint
```

### Web Components
```
frontend/web-components/
├── shared/BaseWebComponent.js
├── word-search/index.js
├── image-addition/index.js
└── [31 more components]
```

## 🚀 IMMEDIATE NEXT STEPS

### Priority 1: Fix Remaining Apps (High Impact)
1. **Find apps that don't load images**
   ```bash
   # Test each app's image library
   grep -l "fetchFromApi\|fetch('/api/images" frontend/public/worksheet-generators/*.html
   ```

2. **Apply API response fix pattern**
   ```javascript
   const data = await response.json();
   const images = data.images || data;
   ```

3. **Ensure loadDictionary/renderDictionary called on load**

### Priority 2: Complete Multilingual Support
1. Add `<script src="js/translations.js"></script>` to remaining 30 apps
2. Initialize `currentLocale` variable
3. Add `&locale=${currentLocale}` to all API calls
4. Implement language selector

### Priority 3: Fix Canvas Clipping
1. Change CSS `overflow: auto` to `overflow: visible`
2. Apply correct zoom pattern (zoom first, then dimensions)
3. Test with different page sizes

## 🏗️ PROJECT COMPLETION CHECKLIST

### Phase 1: Core Functionality (85% ✅)
- [x] Docker infrastructure
- [x] Directus CMS setup
- [x] Image library integration
- [x] All 33 apps accessible
- [x] Web components conversion
- [ ] All apps load images correctly (90%)
- [ ] Canvas scaling issues resolved (10%)

### Phase 2: Internationalization (10% ⚠️)
- [x] Translation infrastructure
- [x] 3/33 apps multilingual
- [ ] 30/33 apps need translation support
- [ ] Language-specific content (alphabets, etc.)

### Phase 3: User Features (0% ❌)
- [ ] User authentication
- [ ] User dashboard
- [ ] Save/load worksheets
- [ ] Download history

### Phase 4: Monetization (0% ❌)
- [ ] Stripe integration
- [ ] Subscription tiers
- [ ] Access control
- [ ] Payment webhooks

### Phase 5: Polish & Launch (0% ❌)
- [ ] Email notifications
- [ ] Error handling
- [ ] Performance optimization
- [ ] Production deployment

## 💡 DEBUGGING TIPS

### When Apps Don't Load Images:
1. Check browser console for errors
2. Verify API response: `curl http://localhost:3000/api/images?theme=animals`
3. Look for these patterns:
   - Missing `data.images || data` extraction
   - Function never called on page load
   - Function called but not defined

### Quick Test Commands:
```bash
# Test API
curl http://localhost:3000/api/images?theme=animals&locale=en | jq

# Check Directus
curl http://localhost:8055/items/image_library

# View Docker logs
docker logs lcs-frontend -f
docker logs lcs-directus -f
```

## 🎯 SUCCESS METRICS

When complete, the platform will:
1. **Load images instantly** in all 33 apps
2. **Reflect Directus changes** immediately
3. **Support 11 languages** fully
4. **Export professional PDFs** in standard sizes
5. **Handle subscriptions** automatically
6. **Scale to thousands of users**

## 🔴 CRITICAL REMINDERS

1. **NEVER rebuild Docker images** unless absolutely necessary
2. **API returns objects**, not arrays: `{images: [...], pagination: {...}}`
3. **Default to animals theme** when "All Themes" selected with no search
4. **Test incrementally** - verify each fix before moving on
5. **Canvas zoom order matters** - zoom first, then dimensions

## 📝 SESSION CONTEXT

### Last Session Accomplishments:
- Fixed API response handling in code-addition.html, find-and-count.html, grid-match.html
- Ensured all three apps properly extract images array from API response
- Made apps load default "animals" theme when "All Themes" selected
- Verified loadDictionary/renderDictionary functions are called on page load

### Current Working State:
- Directus CMS: Running with 141 images
- API: Serving images with proper structure
- Frontend: 33 apps accessible, most loading images correctly
- Remaining Issues: Some apps may still need API fixes, multilingual support needed

### Next Logical Steps:
1. Test all 33 apps systematically for image loading
2. Fix any remaining API response issues
3. Begin multilingual implementation for remaining 30 apps
4. Address canvas clipping issues in 29 apps

---
*This is a living document. Update as the project evolves.*