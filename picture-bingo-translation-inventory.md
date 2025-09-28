# Picture Bingo - Complete Translation Inventory
## Generated: December 2024
## File: frontend/public/worksheet-generators/bingo.html

## SUMMARY STATISTICS
- **Total Translatable Texts Found: 141**
- **Elements with data-translate: 0** (0% coverage!)
- **Hardcoded JavaScript Messages: 29**
- **Missing Attributes: ALL (100%)**

## CRITICAL FINDING
**This app has ZERO translation attributes!** Every single UI text needs to have data-translate attributes added. This is a complete absence of any translation infrastructure.

## COMPLETE TEXT INVENTORY

### HTML Elements WITHOUT data-translate Attributes (ALL 112 HTML elements!)

#### Panel Header & Structure
- **Line 164**: `<h2>Worksheet Settings</h2>`
  - Type: Panel Header
  - Context: Main sidebar title
  - Key: `worksheetSettings`
  - Text: "Worksheet Settings"

#### Language Section (Lines 167-182)
- **Line 168**: `<label style="color: var(--app-text-secondary-dark-theme); font-size: 13px;">Language:</label>`
  - Key: `language`
  - Text: "Language:"

- **Line 170-180**: Language options
  - "English", "Deutsch (German)", "Français (French)", "Español (Spanish)", "Português (Portuguese)", "Italiano (Italian)", "Nederlands (Dutch)", "Svenska (Swedish)", "Dansk (Danish)", "Norsk (Norwegian)", "Suomi (Finnish)"

#### Accordion Headers
- **Line 186**: `<button class="accordion-button active">Page Setup</button>`
  - Key: `pageSetup`
  - Text: "Page Setup"

- **Line 230**: `<button class="accordion-button">Text Tools</button>`
  - Key: `textTools`
  - Text: "Text Tools"

- **Line 254**: `<button class="accordion-button">Bingo Card Settings</button>`
  - Key: `bingoCardSettings`
  - Text: "Bingo Card Settings"

- **Line 279**: `<button class="accordion-button">Image Library</button>`
  - Key: `imageLibrary`
  - Text: "Image Library"

- **Line 294**: `<button class="accordion-button">Upload Custom Images</button>`
  - Key: `uploadCustomImages`
  - Text: "Upload Custom Images"

#### Page Setup Section (Lines 186-226)
- **Line 188**: `<label for="pageSizeSelect">Page Size:</label>`
  - Key: `pageSize`
  - Text: "Page Size:"

- **Line 190-195**: Page size options
  - "Letter Portrait (8.5×11")", "Letter Landscape (11×8.5")", "A4 Portrait (210×297mm)", "A4 Landscape (297×210mm)", "Square (1200x1200)", "Custom"

- **Line 198**: `<label for="pageWidth">Width (px):</label>`
  - Key: `widthPx`
  - Text: "Width (px):"

- **Line 200**: `<label for="pageHeight">Height (px):</label>`
  - Key: `heightPx`
  - Text: "Height (px):"

- **Line 203**: `<label for="pageColor">Page Color:</label>`
  - Key: `pageColor`
  - Text: "Page Color:"

- **Line 205**: `<button id="setPageSizeBtn">Apply Size</button>`
  - Key: `applySize`
  - Text: "Apply Size"

#### Background Section (Lines 207-214)
- **Line 207**: `<h4>Background</h4>`
  - Key: `background`
  - Text: "Background"
  - Note: CRITICAL - User specifically mentioned this wasn't translated

- **Line 208**: `<label for="backgroundThemeSelect">Background Theme:</label>`
  - Key: `backgroundTheme`
  - Text: "Background Theme:"

- **Line 210**: `<option value="none">None</option>`
  - Key: `none`
  - Text: "None"

- **Line 212**: `<p class="dictionary-message">Select a theme for backgrounds.</p>`
  - Key: `selectBackgroundTheme`
  - Text: "Select a theme for backgrounds."

- **Line 213**: `<label for="backgroundOpacitySlider">Background Opacity:</label>`
  - Key: `backgroundOpacity`
  - Text: "Background Opacity:"

#### Border Section (Lines 216-225)
- **Line 216**: `<h4>Border</h4>`
  - Key: `border`
  - Text: "Border"
  - Note: CRITICAL - User specifically mentioned this wasn't translated

- **Line 217**: `<label for="borderThemeSelect">Border Theme:</label>`
  - Key: `borderTheme`
  - Text: "Border Theme:"

- **Line 219**: `<option value="none">None</option>`
  - Key: `none`
  - Text: "None"

- **Line 222**: `<p class="dictionary-message">Select a theme to see borders.</p>`
  - Key: `selectBorderTheme`
  - Text: "Select a theme to see borders."

- **Line 224**: `<label for="borderOpacitySlider">Border Opacity:</label>`
  - Key: `borderOpacity`
  - Text: "Border Opacity:"

#### Text Tools Section (Lines 230-250)
- **Line 232**: `<h4>Add New Text</h4>`
  - Key: `addNewText`
  - Text: "Add New Text"

- **Line 233**: `<label for="textInput">Content:</label>`
  - Key: `content`
  - Text: "Content:"

- **Line 233**: `placeholder="Hello!"`
  - Key: `helloPlaceholder`
  - Text: "Hello!"

- **Line 234**: `<button id="addTextBtn">Add Text</button>`
  - Key: `addText`
  - Text: "Add Text"

- **Line 235**: `<h4>Selected Text Properties</h4>`
  - Key: `selectedTextProperties`
  - Text: "Selected Text Properties"

- **Line 236**: `<label for="textColor">Color:</label>`
  - Key: `color`
  - Text: "Color:"

- **Line 237**: `<label for="fontSize">Size:</label>`
  - Key: `size`
  - Text: "Size:"

- **Line 238**: `<label for="fontFamily">Font:</label>`
  - Key: `font`
  - Text: "Font:"

- **Line 240-246**: Font options
  - "Lexend Deca", "Baloo 2", "Nunito", "Quicksand", "Fredoka", "Arial", "Verdana"

- **Line 248**: `<label for="textStrokeColor">Outline Color:</label>`
  - Key: `outlineColor`
  - Text: "Outline Color:"

- **Line 249**: `<label for="textStrokeWidth">Outline (0-10):</label>`
  - Key: `outlineWidth`
  - Text: "Outline (0-10):"

#### Bingo Card Settings Section (Lines 254-275)
- **Line 256**: `<label for="bingoRows">Rows (3–5):</label>`
  - Key: `bingoRows`
  - Text: "Rows (3–5):"

- **Line 258**: `<label for="bingoCols">Columns (3–5):</label>`
  - Key: `bingoColumns`
  - Text: "Columns (3–5):"

- **Line 260**: `<label for="bingoCardCount">Number of Cards (1–10):</label>`
  - Key: `numberOfCards`
  - Text: "Number of Cards (1–10):"

- **Line 262**: `<label for="cardFill">Card Cell Fill:</label>`
  - Key: `cardCellFill`
  - Text: "Card Cell Fill:"

- **Line 264-265**: Card fill options
  - "Image", "Word"
  - Keys: `image`, `word`

- **Line 267**: `<label for="chipFill">Chip Fill:</label>`
  - Key: `chipFill`
  - Text: "Chip Fill:"

- **Line 269-270**: Chip fill options
  - "Image", "Word"
  - Keys: `image`, `word`

- **Line 273**: `Use custom selection (below)`
  - Key: `useCustomSelection`
  - Text: "Use custom selection (below)"

#### Image Library Section (Lines 279-290)
- **Line 281**: `<label for="themeSelect">Select Theme:</label>`
  - Key: `selectTheme`
  - Text: "Select Theme:"

- **Line 283**: `<label for="searchInput">Search Images:</label>`
  - Key: `searchImages`
  - Text: "Search Images:"

- **Line 284**: `placeholder="e.g., apple, car"`
  - Key: `searchPlaceholder`
  - Text: "e.g., apple, car"

- **Line 285**: `<p class="selected-count" id="selectedCountMsg">Selected for custom call-outs: 0</p>`
  - Key: `selectedForCustomCallouts`
  - Text: "Selected for custom call-outs: {count}"

- **Line 286**: `<label>Available Images (Click to select for custom call-outs):</label>`
  - Key: `availableImagesCallouts`
  - Text: "Available Images (Click to select for custom call-outs):"

- **Line 287**: `<p class='dictionary-message'>Loading images...</p>`
  - Key: `loadingImages`
  - Text: "Loading images..."

- **Line 288**: `<label style="margin-top:10px;">Selected Custom Images:</label>`
  - Key: `selectedCustomImages`
  - Text: "Selected Custom Images:"

#### Upload Custom Images Section (Lines 294-302)
- **Line 296**: `<label for="imageUploadInput">Select image(s) to upload:</label>`
  - Key: `selectImagesToUpload`
  - Text: "Select image(s) to upload:"

- **Line 298**: `<label style="margin-top:10px;">Your Uploaded Images (This Session):</label>`
  - Key: `yourUploadedImages`
  - Text: "Your Uploaded Images (This Session):"

- **Line 300**: `<p class="dictionary-message">Your uploaded images will appear here.</p>`
  - Key: `uploadedImagesWillAppear`
  - Text: "Your uploaded images will appear here."

#### Toolbar Elements (Lines 313-348)
- **Line 315**: `title="Layers"`
  - Key: `layers`
  - Text: "Layers"

- **Line 317**: `Bring Forward`
  - Key: `bringForward`
  - Text: "Bring Forward"

- **Line 318**: `Send Backward`
  - Key: `sendBackward`
  - Text: "Send Backward"

- **Line 324**: `title="Align"`
  - Key: `align`
  - Text: "Align"

- **Line 326**: `Align Selected:`
  - Key: `alignSelected`
  - Text: "Align Selected:"

- **Line 338**: `Align to Page:`
  - Key: `alignToPage`
  - Text: "Align to Page:"

- **Line 347**: `title="Delete Selected"`
  - Key: `deleteSelected`
  - Text: "Delete Selected"

#### Top Action Buttons (Lines 351-364)
- **Line 351**: `<button id="generateWorksheetBtn" class="action-button accent">Generate</button>`
  - Key: `generate`
  - Text: "Generate"

- **Line 353**: `Download <i class="fas fa-caret-down"></i>`
  - Key: `download`
  - Text: "Download"

- **Line 355**: `Worksheet (JPEG)`
  - Key: `worksheetJpeg`
  - Text: "Worksheet (JPEG)"

- **Line 356**: `Call-out (JPEG)`
  - Key: `calloutJpeg`
  - Text: "Call-out (JPEG)"

- **Line 357**: `Worksheet (PDF)`
  - Key: `worksheetPdf`
  - Text: "Worksheet (PDF)"

- **Line 358**: `Call-out (PDF)`
  - Key: `calloutPdf`
  - Text: "Call-out (PDF)"

- **Line 360**: `Grayscale`
  - Key: `grayscale`
  - Text: "Grayscale"
  - Note: CRITICAL - User specifically mentioned this wasn't translated

- **Line 364**: `<button id="clearBtn" class="action-button danger">Clear All</button>`
  - Key: `clearAll`
  - Text: "Clear All"

#### Tab Labels (Lines 366-368)
- **Line 367**: `<button class="tab-button active" data-tab="worksheetTab">Cards + Chips</button>`
  - Key: `cardsAndChips`
  - Text: "Cards + Chips"

- **Line 368**: `<button class="tab-button" data-tab="calloutsTab">Call-outs</button>`
  - Key: `callouts`
  - Text: "Call-outs"

### JavaScript Dynamic Messages (29 messages)

#### Success Messages
- **Line 1444**: `"Bingo worksheet generated!"`
  - Key: `bingoWorksheetGenerated`
  - Text: "Bingo worksheet generated!"

- **Line 1510**: `'Download Initiated!'`
  - Key: `downloadInitiated`
  - Text: "Download Initiated!"

- **Line 1573**: `'ZIP Download Initiated!'`
  - Key: `zipDownloadInitiated`
  - Text: "ZIP Download Initiated!"

- **Line 1645**: `'PDF Downloaded!'`
  - Key: `pdfDownloaded`
  - Text: "PDF Downloaded!"

- **Line 1683**: `"Form cleared."`
  - Key: `formCleared`
  - Text: "Form cleared."

- **Line 1721**: `${uploadedImages.length} custom image(s) available.`
  - Key: `customImagesAvailable`
  - Text: "{count} custom image(s) available."

- **Line 1838**: `'FREE VERSION - LessonCraftStudio.com'`
  - Key: `watermarkText`
  - Text: "FREE VERSION - LessonCraftStudio.com"

- **Line 1857**: `'FREE VERSION'`
  - Key: `watermarkSmallText`
  - Text: "FREE VERSION"

- **Line 1922**: `'PDF downloaded!'`
  - Key: `pdfDownloaded`
  - Text: "PDF downloaded!"

- **Line 1956**: `'JPEG download initiated!'`
  - Key: `jpegDownloadInitiated`
  - Text: "JPEG download initiated!"

#### Error Messages
- **Line 1101**: `Need ${requiredCount} images for the call-out list, but only ${imagePool.length} are selected. Please select more.`
  - Key: `needMoreImagesForCallout`
  - Text: "Need {required} images for the call-out list, but only {selected} are selected. Please select more."

- **Line 1116**: `The selected image library only has ${themeImages.length} images. Need ${requiredCount} to generate the game. Please choose a larger theme or use custom selection.`
  - Key: `notEnoughImagesInLibrary`
  - Text: "The selected image library only has {available} images. Need {required} to generate the game. Please choose a larger theme or use custom selection."

- **Line 1424**: `Could not generate ${cardCount} unique cards.`
  - Key: `couldNotGenerateCards`
  - Text: "Could not generate {count} unique cards."

- **Line 1507**: `"Canvas is empty."`
  - Key: `canvasIsEmpty`
  - Text: "Canvas is empty."

- **Line 1511**: `Error preparing JPEG: ${error.message}`
  - Key: `errorPreparingJpeg`
  - Text: "Error preparing JPEG: {error}"

- **Line 1522**: `"No card data available."`
  - Key: `noCardDataAvailable`
  - Text: "No card data available."

- **Line 1575**: `Error creating ZIP: ${error.message}`
  - Key: `errorCreatingZip`
  - Text: "Error creating ZIP: {error}"

- **Line 1593**: `"No card data available."`
  - Key: `noCardDataAvailable`
  - Text: "No card data available."

- **Line 1648**: `Error creating PDF: ${error.message}`
  - Key: `errorCreatingPdf`
  - Text: "Error creating PDF: {error}"

- **Line 1673**: Border/Background dictionary reset
  - Key: `selectBorderTheme`/`selectBackgroundTheme`

- **Line 1724**: `Error reading file: ${file.name}`
  - Key: `errorReadingFile`
  - Text: "Error reading file: {filename}"

- **Line 1763**: `Generation failed: ${e.message}`
  - Key: `generationFailed`
  - Text: "Generation failed: {error}"

- **Line 1897**: `'Please generate content first.'`
  - Key: `pleaseGenerateContentFirst`
  - Text: "Please generate content first."

- **Line 1924**: `'Error creating PDF.'`
  - Key: `errorCreatingPdf`
  - Text: "Error creating PDF."

- **Line 1938**: `'Please generate a worksheet first.'`
  - Key: `pleaseGenerateWorksheetFirst`
  - Text: "Please generate a worksheet first."

- **Line 1958**: `'Error preparing JPEG.'`
  - Key: `errorPreparingJpeg`
  - Text: "Error preparing JPEG."

#### Info Messages
- **Line 1503**: `Preparing ${filename}...`
  - Key: `preparingFile`
  - Text: "Preparing {filename}..."

- **Line 1516**: `'Preparing ZIP file...'`
  - Key: `preparingZipFile`
  - Text: "Preparing ZIP file..."

- **Line 1582**: `Preparing ${filename}...`
  - Key: `preparingFile`
  - Text: "Preparing {filename}..."

- **Line 1709**: `Loading ${filesToLoad} image(s)...`
  - Key: `loadingImages`
  - Text: "Loading {count} image(s)..."

- **Line 1899**: `'Preparing PDF...'`
  - Key: `preparingPdf`
  - Text: "Preparing PDF..."

- **Line 1940**: `'Preparing JPEG...'`
  - Key: `preparingJpeg`
  - Text: "Preparing JPEG..."

### File Input Default Text (Browser-Controlled)
- File inputs display "Choose files" / "No file chosen"
  - Note: CRITICAL - User specifically mentioned these weren't translated
  - These are browser-controlled and require special handling

## CRITICAL ISSUES

1. **ZERO Translation Coverage**: This app has 0% translation coverage - NO elements have data-translate attributes
2. **141 Total Texts**: All 141 translatable texts need attributes added
3. **29 Hardcoded Messages**: All JavaScript messages are hardcoded strings
4. **Missing Core UI Elements**: Background, Border, Grayscale labels not translatable
5. **File Input Text**: "Choose files" and "No file chosen" are browser-controlled
6. **Bingo-specific terminology**: "Cards + Chips", "Call-outs" need translation

## IMPLEMENTATION URGENCY

**HIGHEST PRIORITY**: This app needs immediate and comprehensive attention as it has ZERO translation infrastructure. Every single UI element needs data-translate attributes added before any translation can work.

## COMPARISON WITH OTHER APPS
- **wordsearch.html**: 83 elements with data-translate (53% coverage)
- **bingo.html**: 0 elements with data-translate (0% coverage) ⚠️
- **drawing lines.html**: 0 elements with data-translate (0% coverage)
- **matching.html**: 1 element with data-translate (0.5% coverage)
- **word scramble.html**: 5 elements with data-translate (2.8% coverage)
- **find and count.html**: 0 elements with data-translate (0% coverage)
- **addition.html**: 2 elements with data-translate (1.4% coverage)
- **alphabet train.html**: 2 elements with data-translate (1.2% coverage)
- **coloring.html**: 3 elements with data-translate (2.4% coverage)
- **math worksheet.html**: 0 elements with data-translate (0% coverage)
- **subtraction.html**: 0 elements with data-translate (0% coverage)

## UNIQUE FEATURES REQUIRING TRANSLATION

1. **Bingo-specific terms**: "Cards", "Chips", "Call-outs"
2. **Card configuration**: "Rows (3–5)", "Columns (3–5)", "Number of Cards (1–10)"
3. **Fill options**: "Card Cell Fill", "Chip Fill" with "Image" or "Word" options
4. **Custom selection interface**: Messages for selecting custom call-out images
5. **Multi-file download**: ZIP file generation messages
6. **Free tier watermarks**: Multiple watermark texts