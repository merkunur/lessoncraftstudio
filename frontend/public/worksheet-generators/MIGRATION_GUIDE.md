# Migration Guide: Standardizing All 33 Worksheet Apps

## The New Architecture

Instead of each app having 200+ lines of locale handling code, we now have:
1. `locale-manager.js` - Centralized locale management
2. `app-initializer.js` - Common initialization for all apps

## Migration Steps for Each App

### Step 1: Update the `<head>` section

Replace:
```html
<script src="js/translations.js"></script>
```

With:
```html
<script src="js/translations.js"></script>
<script src="js/locale-manager.js"></script>
<script src="js/app-initializer.js"></script>
```

### Step 2: Remove ALL locale handling code

Delete these sections from each app:
- `let currentLocale = 'en';`
- `if (typeof getCurrentLocale !== 'undefined') { ... }`
- `function getLocale() { ... }`
- All manual locale parameter additions to API calls

### Step 3: Replace initialization code

Replace the entire DOMContentLoaded section for themes with:

```javascript
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize common functionality
    await AppInitializer.init({
        borderThemeSelect: 'borderThemeSelect',
        backgroundThemeSelect: 'backgroundThemeSelect',
        themeSelect: 'themeSelect'
    });

    // Your app-specific code continues here...
});
```

### Step 4: Update API calls

Replace all manual API calls:
```javascript
// OLD
fetch(`/api/images?theme=${theme}&locale=${currentLocale}`)

// NEW
LocaleManager.fetchWithLocale(`/api/images?theme=${theme}`)
```

### Step 5: Update image loading functions

Replace complex image loading with:
```javascript
async function loadThemeImages() {
    const theme = document.getElementById('themeSelect').value;
    const images = await AppInitializer.loadImages(theme);
    // Process images...
}
```

## Benefits of This Migration

1. **Reduced Code**: Each app loses ~200 lines of boilerplate
2. **Consistency**: All apps work exactly the same way
3. **Maintainability**: Fix once, works everywhere
4. **Reliability**: Centralized, tested code
5. **Performance**: Parallel loading, better caching

## Testing After Migration

Each migrated app should:
1. Load border themes in the correct language
2. Load background themes in the correct language
3. Load image themes in the correct language
4. Persist locale across page refreshes
5. Work with all 11 supported languages

## Order of Migration

Start with the most complex apps to prove the system:
1. find and count.html
2. word search.html
3. alphabet train.html
4. Then the remaining 30 apps