# Homepage Content Manager - Debug Guide

## 🔍 Issue Reported

"The homepage content manager doesn't show the existing content."

---

## 🧪 Debugging Steps Added

I've added comprehensive console logging to help identify the issue:

### 1. In `loadContent()` function (lines 825-829):
```javascript
console.log('=== Homepage Content Loaded ===');
console.log('Has hero?', homepageContent.hero ? 'YES' : 'NO');
console.log('Has samplesSection?', homepageContent.samplesSection ? 'YES' : 'NO');
console.log('Hero title.en:', homepageContent.hero?.title?.en);
console.log('Full hero:', homepageContent.hero);
```

### 2. In `renderHeroSection()` function (lines 1591-1615):
```javascript
console.log('renderHeroSection called');
console.log('homepageContent.hero:', homepageContent.hero);
// ... detailed logging for each language
console.log('renderHeroSection completed');
```

---

## 📋 How to Debug

### Step 1: Open Content Manager with Console

1. Visit: http://localhost:3005/homepage-content-manager-v3-fixed.html
2. Press F12 to open Developer Tools
3. Click on "Console" tab
4. Look for the log messages

### Step 2: Check What Logs Appear

You should see messages like:

#### ✅ **Good Case** (Data loaded successfully):
```
=== Homepage Content Loaded ===
Has hero? YES
Has samplesSection? YES
Hero title.en: Create Professional Worksheets in Minutes
Full hero: {title: {…}, subtitle: {…}, cta_primary_text: {…}, ...}
renderHeroSection called
homepageContent.hero: {title: {…}, subtitle: {…}, ...}
Setting en values: {title: "Create Professional Worksheets...", titleElExists: true}
Setting de values: {title: "Erstellen Sie professionelle...", titleElExists: true}
...
renderHeroSection completed
```

#### ❌ **Bad Case** (Data missing):
```
=== Homepage Content Loaded ===
Has hero? NO
Has samplesSection? NO
Hero title.en: undefined
Full hero: undefined
renderHeroSection called
ERROR: homepageContent.hero is missing!
```

### Step 3: Share Console Output

Copy all console messages and share them so I can identify the exact problem.

---

## 🔍 Possible Causes & Solutions

### Cause 1: API Returns Empty/Wrong Structure

**Symptom**: Console shows `Has hero? NO`

**Solution**: Check what API is returning:
```bash
# Test from command line
curl http://localhost:3005/api/homepage/content?raw=true
```

If API is empty, reinitialize database:
```bash
cd frontend
node scripts/clear-homepage.js
```

Then reload content manager.

### Cause 2: Form Elements Not Created Yet

**Symptom**: Console shows `titleElExists: false`

**Solution**: The HTML might not be created before trying to populate. This happens if `renderAllSections()` fails.

**Fix**: Check for JavaScript errors in console before the "renderHeroSection called" message.

### Cause 3: Data Structure Mismatch

**Symptom**: Console shows hero exists but fields are empty

**Solution**: The API might return data in a different format than expected.

**Expected structure**:
```json
{
  "hero": {
    "title": {
      "en": "Create Professional Worksheets...",
      "de": "Erstellen Sie professionelle...",
      ...
    },
    "subtitle": {
      "en": "...",
      "de": "...",
      ...
    },
    "cta_primary_text": {
      "en": "...",
      "de": "...",
      ...
    },
    "cta_secondary_text": {
      "en": "...",
      "de": "...",
      ...
    }
  }
}
```

### Cause 4: Browser Cache

**Symptom**: Old version of HTML loading

**Solution**: Hard refresh the page
- Chrome/Edge: Ctrl + Shift + R
- Firefox: Ctrl + F5
- Or clear browser cache

---

## 🛠️ Quick Fixes to Try

### Fix 1: Clear Database and Reinitialize

```bash
cd frontend
node scripts/clear-homepage.js
```

Then visit content manager and check if it loads.

### Fix 2: Check API Endpoint

Visit in browser: http://localhost:3005/api/homepage/content?raw=true

Should see JSON with `hero`, `samplesSection`, `features`, etc.

### Fix 3: Check Server Logs

Look for errors in the terminal where `npm run dev` is running.

Particularly look for:
- `GET /api/homepage/content?raw=true` - Should return 200
- Any error messages about database or Prisma

---

## 📊 Expected vs Actual Behavior

### Expected Behavior

1. Page loads
2. Console shows "=== Homepage Content Loaded ==="
3. Console shows all sections exist (hero, samplesSection, etc.)
4. Console shows all form fields being populated
5. Form fields display with existing content

### Actual Behavior (To Confirm)

Please provide:
1. Screenshot of console output
2. Screenshot of empty form fields
3. Any error messages in console (red text)

---

## 🔧 Temporary Workaround

If content manager doesn't load existing content, you can still:

1. Type new content into the fields
2. Click "Save All Content"
3. Refresh the page
4. Check if content now appears

If this works, the issue is with loading, not saving.

---

## 📝 Next Steps

After checking console output, we'll know which of these is the issue:

1. **API not returning data** → Fix API or database
2. **HTML elements not created** → Fix renderAllSections()
3. **Data structure mismatch** → Update content manager to match API structure
4. **JavaScript error** → Fix the error

---

## 🚨 Critical Check

The API route should return raw multilingual data when `raw=true`:

**File**: `frontend/app/api/homepage/content/route.ts` (Line 14-16)
```typescript
if (raw) {
  return NextResponse.json(rawContent);
}
```

This `rawContent` comes from:
```typescript
const rawContent = await homepageContentManager.getHomepageContent(locale);
```

The content manager expects this exact structure with all multilingual keys.

---

**Status**: Debugging logs added
**Next**: User needs to check browser console
**File Modified**: `frontend/public/homepage-content-manager-v3-fixed.html`
