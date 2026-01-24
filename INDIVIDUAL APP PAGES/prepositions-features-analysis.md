# Prepositions Worksheet Generator - Complete Features Analysis

**Source:** REFERENCE APPS/prepositions.html
**Analysis Date:** 2025-12-13
**App Type:** Educational language/spatial concepts worksheet generator

---

## CRITICAL INFORMATION

**Pricing Tier:** Full Access ($240/year or $25/month)
**Verification:** Line 218 in SEO-RULES.md confirms Prepositions = Full Access ($240/year)

**IMPORTANT:** NEVER use "Core Bundle" or "$144/$15" when writing about this app. ONLY use "Full Access" and "$240/$25".

---

## 1. PREPOSITIONS AVAILABLE (8 Total)

**Source:** Line 887 in prepositions.html

The app teaches 8 prepositions with full multilingual support:

1. **in**
2. **on top of**
3. **under**
4. **next to**
5. **behind**
6. **between**
7. **above**
8. **in front of**

**User Control:** Users can select which prepositions to include via checkboxes (line 679, 1204-1218, 2715)

**Translations Available:** All 8 prepositions translated into 11 languages (lines 890-924)

---

## 2. EXERCISE MODES (2 Options)

**Source:** Lines 667-672

### Fill-in-the-Blank Mode (Default)
- Students write the preposition in a blank space
- Uses whiteboard template
- Shows item, shape, and spatial relationship

### Multiple Choice Mode
- Provides multiple preposition options to choose from
- Custom description field available (line 673-675)
- Hides template selector when active (lines 1844-1857)

**User Control:** Dropdown selector changes exercise format (line 669)

---

## 3. PAGE SETUP OPTIONS

**Source:** Lines 599-641

### Paper Size Options (6 Choices)
**Source:** Lines 601-609

1. **Letter Portrait** (8.5×11") - 612x792px
2. **Letter Landscape** (11×8.5") - 792x612px
3. **A4 Portrait** (210×297mm) - 595x842px
4. **A4 Landscape** (297×210mm) - 842x595px
5. **Square** - 1200x1200px
6. **Custom** - User-defined width and height

**Default:** Letter Portrait (line 3704)

### Template Selection
**Source:** Lines 619-620, 1775-1826

- **Worksheet templates** loaded from API
- **Whiteboard template** selected by default (lines 1794-1806)
- Templates can be removed/changed (line 1828-1836)
- Templates hide in Multiple Choice mode (line 1846)

### Page Color
**Source:** Line 622-623

- **Color picker** for background page color
- **Default:** White (#FFFFFF)

### Background Themes
**Source:** Lines 624-631, 1324-1325

- **Theme selector** with "None" option (line 627)
- **Opacity control** 0-100% via slider (line 629-630)
- **Dictionary display** shows available backgrounds (line 631)
- Backgrounds load from API by theme (similar to other apps)

### Border Themes
**Source:** Lines 632-637, 1322-1323

- **Theme selector** with "None" option (line 634)
- **Opacity control** 0-100% via slider (line 635-636)
- **Dictionary display** shows available borders (line 637)
- Borders load from API by theme

---

## 4. CONFIGURATION OPTIONS

**Source:** Lines 665-684

### Exercise Count
**Source:** Lines 676-678

- **Range:** 1-8 exercises per worksheet
- **Default:** 8 exercises (line 3705)
- Controls how many preposition exercises appear on worksheet

### Preposition Selection
**Source:** Lines 678-682, 1204-1218

- **Checkboxes** for each of 8 prepositions
- **Default:** All 8 checked (lines 3706, 3740)
- Users can select specific prepositions to practice
- Displays translated preposition names based on UI language (line 1215)

### Name/Date Fields
**Source:** Lines 680-682

- **Checkbox option** to include name and date fields on worksheet
- **Default:** Unchecked (line 3703)

---

## 5. ITEM SELECTION (Main Objects)

**Source:** Lines 687-702

### Generation Mode (2 Options)
**Source:** Lines 689-693

1. **Manual Selection** - User chooses specific images
2. **All Themes** - Randomly selects from all available images

### Manual Selection Features
**Source:** Lines 694-700

- **Theme dropdown** - Select from available image themes (line 696)
- **Search box** - Search for specific items (line 697)
- **Dictionary grid** - Visual selection of images (line 698)
- **Selected counter** - Shows "Selected: X/8" (line 699)
- Users must select at least as many items as exercise count (line 2720)

### Image Sources
**Source:** Lines 2718-2728

- **Theme images** from API
- **Uploaded custom images** can be included
- **All themes mode** fetches from `/api/images?search=&locale=${currentLocale}`
- **Specific theme** fetches from `/api/images?theme=${theme}&locale=${locale}`

---

## 6. SHAPE REPLACEMENT (Reference Objects)

**Source:** Lines 705-720

### Generation Mode (2 Options)
**Source:** Lines 707-711

1. **Manual Shape Selection** - User chooses specific shape images
2. **All Themes** - Randomly selects from all available images

### Manual Selection Features
**Source:** Lines 712-717

- **Shape theme dropdown** - Select from available image themes (line 713-715)
- **Dictionary grid** - Visual selection of shape images (line 716)
- **Selected counter** - Shows "Selected: X/8" (line 717)

### Default Shapes (8 Basic Shapes)
**Source:** Line 886

If insufficient shape images selected, system uses default geometric shapes:

1. circle
2. cube
3. cylinder
4. heart
5. hexagon
6. square
7. star
8. triangle

**Source:** Lines 2739-2742 - Default shapes used as fallback when not enough custom shapes

---

## 7. UPLOAD CUSTOM IMAGES

**Source:** Lines 723-734

- **Multi-file upload** capability
- **File input** for selecting images
- Custom images can be used as items OR shapes
- Uploaded images integrated with theme images (lines 2725, 2736)

---

## 8. TEXT TOOLS

**Source:** Lines 642-662

### Add New Text
**Source:** Lines 644-646

- **Text input field** for content
- **"Add Text to Worksheet" button** adds text to canvas
- Default placeholder: "Worksheet Title..."

### Selected Text Properties
**Source:** Lines 647-661

**Text Color** (line 648)
- Color picker
- Default: #333333 (dark gray)
- Disabled until text selected

**Font Size** (line 649)
- Number input
- Default: 36px
- Minimum: 8px
- Disabled until text selected

**Font Family** (lines 650-659)
7 font options:
1. Lexend Deca
2. Baloo 2
3. Nunito
4. Quicksand
5. Fredoka
6. Arial
7. Verdana

**Text Outline** (lines 660-661)
- Outline color picker (default: #000000)
- Outline width slider (0-10 range, 0.5 step)
- Disabled until text selected

---

## 9. CANVAS EDITING FEATURES

**Source:** Throughout HTML file

### Object Manipulation
**Source:** Lines 1220-1246

- **Select objects** - Click to select
- **Drag objects** - Move freely on canvas
- **Rotate objects** - Rotation handles
- **Scale objects** - Resize handles
- **Delete objects** - Delete key or toolbar button

### Layer Controls
**Source:** Lines 1133-1137, Object Context Toolbar section

- **Bring to Front** - Move object to top layer
- **Bring Forward** - Move up one layer
- **Send Backward** - Move down one layer
- **Send to Back** - Move to bottom layer

### Alignment Tools
**Source:** Lines 1137-1138

- Align objects relative to each other or canvas
- Accessible via toolbar

### Lock/Unlock Objects
**Source:** Lines 1139, 2282-2296

- **Lock selected objects** - Prevent editing
- **Unlock All button** appears when locked objects exist (lines 432-471)
- Locked objects cannot be moved, scaled, or rotated

### Undo/Redo
**Source:** Lines 392-430, 1141-1144

- **Undo button** - Revert last change
- **Redo button** - Restore undone change
- Disabled states when no history available
- History tracked via state management (throughout code)

### Zoom Controls
**Source:** Lines 349-390, 1142-1145

- **Zoom In** - Increase canvas zoom
- **Zoom Out** - Decrease canvas zoom
- **Zoom Reset** - Return to 100%
- **Zoom percentage display** - Shows current zoom level

---

## 10. LANGUAGE SUPPORT (11 Languages)

**Source:** Lines 579-593

### UI and Content Languages
1. **English** (en)
2. **German / Deutsch** (de)
3. **French / Français** (fr)
4. **Spanish / Español** (es)
5. **Portuguese / Português** (pt)
6. **Italian / Italiano** (it)
7. **Dutch / Nederlands** (nl)
8. **Swedish / Svenska** (sv)
9. **Danish / Dansk** (da)
10. **Norwegian / Norsk** (no)
11. **Finnish / Suomi** (fi)

**Critical Feature:** Preposition translations mean worksheets display correct spatial terms in each language (lines 890-924)

**Description:** "Choose your language. Worksheets will show prepositions and image names in the selected language." (line 593)

---

## 11. GENERATION OPTIONS

**Source:** Lines 1116-1119, 753-756

### Generate Dropdown
**Source:** Generate button dropdown

**Generate New Worksheet** (line 754)
- Creates fresh worksheet with selected settings
- Uses selected prepositions, items, shapes
- Randomly assigns spatial relationships (lines 2744-2754)
- Saves generation data for answer key (line 2744)

**Generate Answer Key** (line 755)
- Creates answer sheet showing correct prepositions
- Disabled until worksheet generated (line 755)
- Uses last generated assignments (line 3625-3650)

---

## 12. DOWNLOAD OPTIONS

**Source:** Lines 1120-1126, 757-766

### Download Formats

**JPEG Downloads:**
- **Worksheet JPEG** (line 758)
- **Answer Key JPEG** (line 759)

**PDF Downloads:**
- **Worksheet PDF** (line 760)
- **Answer Key PDF** (line 761)

### Grayscale Toggle
**Source:** Line 763

- **Checkbox option** to convert to grayscale
- **Default:** Unchecked (line 3703)
- Saves printer ink
- Applies to all downloads

**Disabled State:** Download buttons disabled until worksheet generated (updateDownloadButtonsState throughout code)

---

## 13. ADDITIONAL FEATURES

### Clear Worksheet Function
**Source:** Lines 3681-3714

- **Clear button** resets entire worksheet
- Removes all canvas objects
- Resets all settings to defaults
- Clears selected items and shapes
- Re-enables all prepositions

### Auto-Launch Feature
**Source:** Lines 3716-3750

- **Automatic initial worksheet** generated on load
- Uses Animals theme (line 3735)
- Letter Portrait size (line 3729)
- All 8 prepositions selected (line 3740)
- Provides immediate preview

### Mobile Responsive
**Source:** Lines 249-255

- **Menu toggle button** on mobile/tablet
- **Sliding panel** for controls
- **Overlay** when menu open
- Optimized for touch devices

### Object Context Toolbar
**Source:** Lines 256-267

- **Floating toolbar** appears when object selected
- Contains quick-access editing tools
- Positioned above canvas (line 256)
- Auto-hides when no selection

---

## SUMMARY OF KEY FEATURES FOR SEO CONTENT

### Educational Focus
1. **8 prepositions** covering essential spatial concepts
2. **2 exercise modes** (fill-in, multiple choice)
3. **11 languages** for multilingual education
4. **Customizable difficulty** (1-8 exercises, select specific prepositions)

### Creation Flexibility
1. **Multiple paper sizes** (Letter, A4, Square, Custom)
2. **Theme-based generation** or manual item selection
3. **Upload custom images** for personalization
4. **Shape replacement** with 8 default geometric shapes
5. **Worksheet templates** including whiteboard

### Customization Options
1. **Full canvas editing** (drag, rotate, scale, delete)
2. **Text tools** with 7 fonts and outline options
3. **Background and border themes** with opacity control
4. **Page color** customization
5. **Layers control** and object locking

### Professional Output
1. **Answer key generation** for teacher convenience
2. **Multiple download formats** (JPEG, PDF)
3. **Grayscale option** to save ink
4. **300 DPI quality** (professional standard)
5. **Name/Date fields** option

### User Experience
1. **Auto-launch worksheet** for immediate preview
2. **Undo/Redo** functionality
3. **Zoom controls** for detail work
4. **Search functionality** for finding images
5. **Mobile responsive** design

---

## NOTES FOR APP PAGE CONTENT

1. **Primary Use Case:** Teaching spatial relationships and prepositions to kindergarten through grade 3 students

2. **Language Learning:** Particularly valuable for ESL/EFL instruction with 11 language support

3. **Differentiation:** Teachers can adjust difficulty by selecting specific prepositions or changing exercise count

4. **Visual Learning:** Combines images with text to reinforce spatial concept understanding

5. **Assessment:** Answer key generation makes this ideal for testing comprehension

6. **Commercial Use:** With Full Access subscription, teachers can create and sell preposition worksheets

7. **Time Savings:** Auto-generation saves hours compared to manual worksheet creation

8. **Personalization:** Custom image upload allows teachers to use familiar objects from their classroom or student interests

---

**End of Features Analysis**
