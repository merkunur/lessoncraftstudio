# MatchUp Maker - Complete Features Analysis

**Source:** REFERENCE APPS\matching.html
**Date:** 2025-12-12
**Purpose:** Factual analysis of actual app features for SEO content creation

---

## App Overview

MatchUp Maker is a matching worksheet generator that creates educational worksheets where students draw lines to connect matching pairs. The app supports multiple matching modes and provides complete customization of worksheet content and appearance.

---

## Core Matching Features

### 1. Four Matching Modes

The app offers four distinct matching modes:

#### Mode 1: Image ↔ Beginning Letter
- Left column shows images
- Right column shows the first letter of each image's name (uppercase)
- Images are automatically selected from themes based on selection method
- Example: apple image ↔ "A", banana image ↔ "B"

#### Mode 2: Image+Word ↔ Image+Word
- Both columns show image WITH word label below
- Pairs match identical items
- Used for memory/recognition exercises
- Example: (apple image + "apple") ↔ (apple image + "apple")

#### Mode 3: Image/Word ↔ Image/Word
- Can show EITHER image OR word on each side
- User chooses image or word display for each item in each column
- Most flexible mode
- Example: apple image ↔ "apple" text, OR "banana" text ↔ banana image

#### Mode 4: Image ↔ Custom Word
- Left column shows images
- Right column shows custom text entered by user
- Perfect for vocabulary, translations, definitions
- Example: apple image ↔ "red fruit", dog image ↔ "loyal pet"

### 2. Number of Pairs

- Configurable: 4, 5, or 6 pairs per worksheet
- Dropdown selection in Worksheet Configuration section
- Default: 6 pairs

### 3. Image Selection Methods

For "Image ↔ Beginning Letter" mode, three selection methods:

#### Random Theme & Images
- Automatically picks random theme from all available themes
- Randomly selects required number of images from that theme
- Zero user input required - fully automatic

#### Random from Chosen Theme
- User selects a specific theme from dropdown
- App randomly picks required images from that theme
- Theme dropdown populated with all available themes

#### Select Specific Images
- User manually selects specific images from library
- Can also upload custom images
- Complete control over which images appear

For other modes (imgname, imgorfname, custom):
- User picks images through Item Configuration panel
- Can select from library or use uploaded images

---

## Item Configuration System

For modes: Image+Word ↔ Image+Word, Image/Word ↔ Image/Word, and Image ↔ Custom Word

### Configuration Panel
- Appears in left sidebar under "Item Configuration"
- Shows numbered slots (1-6 depending on pair count)
- Each slot has Left and Right sections

### For Image+Word and Image/Word modes:
- "Pick Img" button for each column
- Opens modal to browse image library by theme
- Label shows selected image name
- For Image/Word mode: dropdown to choose "Image" or "Word" display for each item

### For Image ↔ Custom Word mode:
- Left side: "Pick Img" button to choose image
- Right side: Text input field for custom word/phrase
- User types custom text for each pair

---

## Worksheet Customization Options

### Include Name/Date Fields
- Checkbox option
- When checked: adds "Name: ______" and "Date: ______" fields at top of worksheet
- Default: unchecked

### Include Item Numbers
- Checkbox option
- When checked: shows "1.", "2.", "3." etc. next to each item
- Default: checked

### Show Bullets/Dots
- Checkbox option
- When checked: shows bullet points/dots before each item
- Default: checked

---

## Answer Key Features

### Answer Key Generation
- Separate "Generate Answer Key" button (enabled after worksheet generation)
- Creates answer key on separate canvas
- Shows pairs in correct matching order (not shuffled)
- Draws connecting lines between matched pairs
- Copies background and border from worksheet
- Preserves user-added custom elements

### Answer Key Canvas
- Separate tab ("Answer Key") in main area
- Independent from worksheet canvas
- Can be edited separately
- Downloads separately

---

## Visual Customization

### Background Themes
- Theme-based background selection
- "Filter by Theme" dropdown
- Background dictionary shows thumbnail previews
- Click thumbnail to apply background
- Opacity slider (0-100%)
- Can be removed

### Border Themes
- Theme-based border selection
- "Filter by Theme" dropdown
- Border dictionary shows thumbnail previews
- Click thumbnail to apply border
- Opacity slider (0-100%)
- Can be removed

### Page Border
- Automatic decorative border around worksheet edge
- Coral color (#FF7F50)
- 8px stroke width
- Rounded corners
- Responsive to page size
- Selectable and editable

---

## Text Tools

### Add Custom Text
- Text input field in "Text Tools" section
- "Add Text" button
- Font family dropdown (multiple fonts available)
- Font size input (number)
- Text color picker
- Text stroke color picker
- Text stroke width input

### Text Features
- Creates Fabric.js Textbox object
- Fully editable on canvas
- Can be moved, resized, rotated, deleted
- Supports all standard text formatting

---

## Image Upload

### Custom Image Upload
- Multi-file upload support
- Accepts: JPEG, PNG, GIF
- "Choose files" button (HTML file input)
- Shows "No file chosen" until files selected
- Displays upload status

### Uploaded Images Preview
- Shows thumbnails of all uploaded images
- 64x64px thumbnails
- Click thumbnail to select for use
- Stored in uploadedImages array
- Can be used in all matching modes

---

## Image Library

### Theme-Based Organization
- Images organized by themes (animals, food, transportation, etc.)
- "Filter by Theme" dropdown
- "All Themes" option to show all images
- Theme list dynamically loaded from API

### Image Search
- Search input field
- Placeholder: "e.g., apple, car"
- Filters images by name/word
- Real-time search

### Image Selection
- Dictionary displays image thumbnails with names
- Click image to select (for custom/select specific modes)
- Selected images move to "Selected Images" preview area
- Can select multiple images
- Click again to deselect

---

## Canvas Editing Features

### Object Context Toolbar
- Appears when object is selected
- Fixed position at top center of canvas area
- Grouped toolbar buttons

### Layer Management
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

### Alignment Tools
- Align Selected: Left, Center Horizontal, Right, Top, Center Vertical, Bottom
- Align to Page: Center Horizontal on Page, Center Vertical on Page

### Lock/Unlock
- Lock button: prevents object from moving/editing
- Unlock button: enables editing again
- Locked objects show lock icon
- "Unlock All" button appears when objects are locked

### Delete
- Delete button (trash icon, red color)
- Removes selected object from canvas
- Keyboard shortcut: Delete key

---

## History Management

### Undo/Redo System
- Undo button (Ctrl+Z keyboard shortcut)
- Redo button (Ctrl+Y keyboard shortcut)
- Buttons disabled when no actions to undo/redo
- Saves canvas state after each action
- Prevents state saving during generation (isGenerating flag)

---

## Zoom Controls

### Zoom Levels
- Zoom In button (+ icon)
- Zoom Out button (- icon)
- Reset Zoom button (compress arrows icon)
- Zoom percentage display (e.g., "100%")
- Maintains aspect ratio
- Canvas container allows overflow for zoomed view

---

## Page Setup

### Page Size Options
- Letter Portrait (612x792 pts)
- Letter Landscape (792x612 pts)
- A4 Portrait (595x842 pts)
- A4 Landscape (842x595 pts)
- Dropdown selection
- Updates both canvases (worksheet and answer key)

### Orientation Support
- Portrait: vertical orientation, tall layout
- Landscape: horizontal orientation, wide layout
- Header layout adapts to orientation
- Item positioning adjusts to page size

---

## Multi-Language Support

### UI Languages (11 total)
- English, German, French, Spanish, Italian, Portuguese, Dutch, Danish, Swedish, Norwegian, Finnish
- Language switcher in left sidebar
- All UI elements translate
- Button labels, placeholders, messages translate

### Content Languages
- Image filenames in selected language
- Affects word generation for Image+Word modes
- Important for beginning letter matching
- API fetches images by locale parameter

### Localized Headers
- Default worksheet title for each language:
  - English: "Match Up!"
  - German: "Paare Finden!"
  - French: "Trouve les Paires!"
  - Spanish: "¡Encuentra Parejas!"
  - Italian: "Trova le Coppie!"
  - Portuguese: "Encontre os Pares!"
  - Dutch: "Zoek de Paren!"
  - Swedish: "Matcha Paren!"
  - Danish: "Find Parrene!"
  - Norwegian: "Finn Parene!"
  - Finnish: "Yhdistä Parit!"

- Default description for each language:
  - English: "Draw lines to connect the matching pairs!"
  - German: "Verbinde die zusammenpassenden Paare mit Linien!"
  - French: "Relie les paires qui vont ensemble!"
  - Spanish: "¡Conecta las parejas que coinciden!"
  - Italian: "Collega le coppie che si abbinano!"
  - Portuguese: "Ligue os pares que combinam!"
  - Dutch: "Verbind de passende paren met lijnen!"
  - Swedish: "Dra linjer för att koppla ihop paren!"
  - Danish: "Forbind de matchende par med linjer!"
  - Norwegian: "Koble sammen de riktige parene!"
  - Finnish: "Piirrä viivat yhdistääksesi parit!"

---

## Download Options

### File Formats
- JPEG (worksheet)
- JPEG (answer key)
- PDF (worksheet)
- PDF (answer key)
- Separate download buttons for each

### Grayscale Option
- Checkbox in download dropdown
- When checked: converts to grayscale before download
- Saves ink when printing
- Applies to both JPEG and PDF

### Export Quality
- 300 DPI (downloadMultiplier = 6)
- High resolution for professional printing
- Maintains image quality
- Suitable for commercial use

---

## Mobile Responsiveness

### Mobile Menu
- Hamburger menu button (< 1024px screen width)
- Side panel slides in from left
- Close button (×) in panel header
- Overlay darkens background when menu open
- Touch-friendly interface

### Responsive Header
- Compact layout on smaller screens
- Tab buttons adapt to available space
- Action buttons stack appropriately

---

## Professional Features

### Commercial Licensing
- All worksheets created can be sold
- Print-on-demand compatible
- 300 DPI export quality
- No attribution required (implied by POD license)

### Watermark
- No visible watermark on worksheets
- Clean, professional appearance
- Suitable for selling on Teachers Pay Teachers, Etsy, etc.

---

## Technical Implementation

### Canvas Technology
- Fabric.js 5.3.1 for canvas manipulation
- Two separate canvases (worksheet and answer key)
- Responsive canvas sizing
- Export area for high-res rendering

### Object Properties
- isGeneratedItem: marks worksheet items
- isAnswerKeyItem: marks answer key items
- isBackground: marks background image
- isBorder: marks border image
- isPageBorder: marks decorative page border
- isHeaderElement: marks header components
- isHeaderDesc: marks description text
- position: tracks item position (left/right)
- originalIndex: tracks item order for transform preservation

### State Management
- configSlots array: stores item configuration
- selectedImages array: stores manually selected images
- uploadedImages array: stores user-uploaded images
- currentGeneratedData: stores current worksheet/answer key data
- themes array: stores available themes
- letterType: tracks selection method for letter mode

### Transform Preservation
- Saves position, scale, rotation of items
- Restores transforms when regenerating with same pair count
- Clears transforms when pair count changes
- Preserves name/date field position always

---

## Default Settings (Initial Worksheet)

When app loads, automatically generates worksheet with:
- Theme: Animals
- Page size: Letter Portrait (612x792)
- Include item numbers: Yes
- Show bullets: Yes
- Number of pairs: 6
- Matching mode: Image ↔ Beginning Letter
- Selection method: Random from Chosen Theme (Animals)

---

## Summary of All Features (Quick Reference)

**Matching Modes:** 4 modes (letter, imgname, imgorfname, custom)
**Pair Count:** 4, 5, or 6 pairs
**Image Selection:** Random all, random theme, manual select, upload
**Item Configuration:** Visual configuration panel with pick buttons
**Worksheet Options:** Name/date, item numbers, bullets
**Answer Key:** Separate generation with connecting lines
**Backgrounds:** Theme-based, opacity control
**Borders:** Theme-based, opacity control
**Text Tools:** Add custom text with formatting
**Image Upload:** Multi-file, all common formats
**Image Library:** 3000+ images, theme-based, searchable
**Canvas Editing:** Full drag/resize/rotate/delete
**Toolbar:** Layers, alignment, lock, delete
**Undo/Redo:** Full history management
**Zoom:** In/out/reset controls
**Page Sizes:** Letter/A4, portrait/landscape
**Languages:** 11 UI and content languages
**Download:** JPEG/PDF, worksheet/answer key
**Grayscale:** Optional for ink saving
**Quality:** 300 DPI professional export
**Mobile:** Responsive design with slide-in menu
**Commercial:** POD license included

---

## End of Analysis
