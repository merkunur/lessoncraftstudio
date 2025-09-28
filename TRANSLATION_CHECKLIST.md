# Word Search App Translation Checklist

## Translation Architecture
1. **Next.js Layer** (page.tsx) - Header, breadcrumbs, feature pills
2. **HTML Layer** (wordsearch.html) - UI elements
3. **JavaScript Layer** (translations.js) - Translation strings
4. **Dynamic Content** (API) - Borders, backgrounds, themes

## Elements That Need Translation

### 1. Static Text in HTML (data-translate-key attributes needed)
- [x] "Image names and themes will be displayed in the selected language." → imageNamesAndThemes
- [x] "Letter Portrait (8.5×11")" → letterPortrait
- [x] "Letter Landscape (11×8.5")" → letterLandscape
- [x] "A4 Portrait (210×297mm)" → a4Portrait
- [x] "A4 Landscape (297×210mm)" → a4Landscape
- [x] "Custom" → custom
- [x] "Width (px):" → widthPx
- [x] "Height (px):" → heightPx
- [x] "Background" → background
- [x] "Fallback Color:" → fallbackColor
- [x] "None (Use Fallback Color)" → noneUseFallbackColor
- [x] "Select a theme for backgrounds." → selectThemeForBackgrounds
- [x] "Border" → border
- [x] "None" → none
- [x] "Select a theme to see borders." → selectThemeToSeeBorders
- [x] "Add New Text" → addNewText
- [x] "Content:" → content
- [x] "Hello!" (placeholder) → helloPlaceholder
- [x] "Selected Text Properties" → selectedTextProperties
- [x] "Color:" → color
- [x] "Size:" → size
- [x] "Font:" → font
- [x] "Outline Color:" → outlineColor
- [x] "Outline (0-10):" → outlineWidth
- [x] "Rows:" → rows
- [x] "Columns:" → columns
- [x] "Puzzle Options" → puzzleOptions
- [x] "Allow Reverse Words" → allowReverseWords
- [x] "Image Source for Puzzle" → imageSourceForPuzzle
- [x] "-- Use Random Theme --" → useRandomTheme
- [x] "Individual Image Selection" → individualImageSelection
- [x] "Filter by Theme:" → filterByTheme
- [x] "Available Images (max 8):" → availableImages
- [x] "Selected Images:" → selectedImages
- [x] "Select image(s) to upload:" → selectImagesToUpload
- [x] "Your Uploaded Images (This Session):" → uploadedImages
- [x] "Your uploaded images will appear here." → yourUploadedImagesWillAppearHere
- [x] "Align Selected:" → alignSelected
- [x] "Align to Page:" → alignToPage

### 2. Dynamic Messages (JavaScript generated)
- [x] "Searching..." → searching
- [x] "Loading theme..." → loadingTheme
- [x] "No images found" → noImagesFound
- [x] "No images found matching" → noImagesFoundMatching
- [x] "Loading images..." → loadingImages

### 3. Next.js Layer (Already completed)
- [x] App name: "Word Search" → "Sopa de Letras"
- [x] App description
- [x] Category: "Word Games" → "Juegos de palabras"
- [x] Feature pills translations

## Verification Steps
1. Check all accordion sections expand/collapse
2. Verify all labels are translated
3. Test dynamic messages appear in Spanish
4. Confirm placeholders are translated
5. Validate dropdown options are translated
6. Check tooltip and help text translations

## Languages Completed
- [x] German (de)
- [x] French (fr)
- [x] Spanish (es)
- [ ] Portuguese (pt)
- [ ] Italian (it)
- [ ] Dutch (nl)
- [ ] Swedish (sv)
- [ ] Danish (da)
- [ ] Norwegian (no)
- [ ] Finnish (fi)