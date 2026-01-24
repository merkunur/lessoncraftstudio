# Picture Sort App - Complete Features Analysis

**Source**: `REFERENCE APPS/picture sort.html`
**Analysis Date**: 2025-12-13
**Purpose**: Document ALL actual features for SEO app page content

---

## ACCORDION SECTIONS (5 Total)

### 1. Sorting Categories
**Line**: 769-778

**Features**:
- **Left Category Theme Select** (line 773): Dropdown to select theme for left category
- **Right Category Theme Select** (line 776): Dropdown to select theme for right category
- **Automatic Generation Mode**: When both themes are selected, app auto-generates worksheet
- **Manual Selection Mode**: Special option to manually select and categorize images

**Translation Keys**:
- `picture.sort.sorting.categories`
- `picture.sort.auto.generation`
- `picture.sort.left.category.theme`
- `picture.sort.right.category.theme`

---

### 2. Image Library
**Line**: 781-798

**Features**:
- **Theme Selection** (line 785): Browse images by theme (includes "All Themes" option)
- **Search Functionality** (line 787): Text search across all images
- **Image Browser** (line 790): Visual grid showing available images with thumbnails
- **Click to Add**: Click any image to add to selection
- **Selected Images Preview** (line 794-796): Shows all selected images with:
  - Image thumbnail
  - Image name
  - Category dropdown (Left or Right)
  - Remove button for each image
- **Count Display** (line 793): "Total: X/12" shows current selection count

**Constraints**:
- Minimum 6 images total (MIN_TOTAL_IMAGES)
- Maximum 12 images total (MAX_TOTAL_IMAGES)
- Minimum 3 per category (MIN_PER_CATEGORY)
- Maximum 6 per category (MAX_PER_CATEGORY)

**Translation Keys**:
- `picture.sort.image.library`
- `picture.sort.browse.select`
- `picture.sort.browser.theme`
- `picture.sort.search.images`
- `picture.sort.available.images`
- `picture.sort.selected.images`

---

### 3. Upload Custom Images
**Line**: 801-814

**Features**:
- **Multi-file Upload** (line 808): Select multiple image files at once
- **Accepted Formats**: All common image formats (JPEG, PNG, GIF)
- **Custom File Button** (line 805): Styled "Choose files" button
- **File Status Display** (line 806): Shows "No file chosen" or file count
- **Uploaded Images Preview** (line 810-812): Shows uploaded images in grid
- **Session Persistence**: Uploaded images available during current session
- **Integration**: Uploaded images can be clicked to add to selection like library images

**Translation Keys**:
- `picture.sort.upload.custom`
- `picture.sort.upload.select`
- `picture.sort.upload.button`
- `picture.sort.uploaded.images`

---

### 4. Page Setup
**Line**: 817-853

**Features**:

#### Page Size (line 820-836)
- **Predefined Options**:
  - Letter Portrait (8.5×11" = 612x792px) - line 821
  - Letter Landscape (11×8.5" = 792x612px) - line 822
  - A4 Portrait (210×297mm = 595x842px) - line 823
  - A4 Landscape (297×210mm = 842x595px) - line 824
  - Square (1200x1200px) - line 825
  - **Custom** - line 826
- **Custom Dimensions** (line 829-833): When "Custom" selected:
  - Width input (pixels)
  - Height input (pixels)
  - Apply button to set custom size
- **Page Color** (line 834-835): Color picker for background

#### Name/Date Fields (line 837-839)
- **Checkbox Toggle**: Include or exclude Name and Date fields
- **Positioning**: Automatically placed on worksheet

#### Background (line 840-845)
- **Background Theme Select** (line 842): Choose from themed backgrounds
- **Background Dictionary** (line 843): Visual browser for background images
- **Background Opacity Slider** (line 844-845): Adjust from 0 to 1 (0% to 100%)

#### Border (line 846-851)
- **Border Theme Select** (line 848): Choose from themed borders
- **Border Dictionary** (line 849): Visual browser for border images
- **Border Opacity Slider** (line 850-851): Adjust from 0 to 1 (0% to 100%)

**Translation Keys**:
- `picture.sort.page.setup`
- `picture.sort.page.size`
- `picture.sort.page.color`
- `picture.sort.include.name.date`
- `picture.sort.background.title`
- `picture.sort.border.title`

---

### 5. Text Tools
**Line**: 856-877

**Features**:

#### Add New Text (line 858-860)
- **Text Input Field** (line 859): Type text content
- **Add Text Button** (line 860): Adds text to canvas

#### Text Properties (line 861-876) - Active when text selected
- **Text Color** (line 862): Color picker
- **Font Size** (line 863): Number input, minimum 8px
- **Font Family** (line 865-873): 7 font options:
  - Lexend Deca (line 866)
  - Baloo 2 (line 867)
  - Nunito (line 868)
  - Quicksand (line 869)
  - Fredoka (line 870)
  - Arial (line 871)
  - Verdana (line 872)
- **Outline Color** (line 874): Color picker for text stroke
- **Outline Width** (line 875): Slider 0-10, step 0.5

**Translation Keys**:
- `picture.sort.text.tools`
- `picture.sort.text.add.new`
- `picture.sort.text.properties`

---

## HEADER CONTROLS

### Language Selector (line 748-764)
**Features**:
- **11 Languages Available** (line 750-760):
  - English (en)
  - German (de)
  - French (fr)
  - Spanish (es)
  - Portuguese (pt)
  - Italian (it)
  - Dutch (nl)
  - Swedish (sv)
  - Danish (da)
  - Norwegian (no)
  - Finnish (fi)
- **Content Language Control**: Changes image library language
- **Description** (line 762-764): Clarifies this controls content, not UI

---

### Tab Row (line 888-934)

#### Tabs (line 890-891)
- **Worksheet Tab**: Shows main worksheet canvas
- **Answer Key Tab**: Shows solution canvas

#### Zoom Controls (line 894-899)
- **Zoom Out Button** (line 895): Decrease zoom
- **Zoom Percentage Display** (line 896): Shows current zoom (e.g., "100%")
- **Zoom In Button** (line 897): Increase zoom
- **Zoom Reset Button** (line 898): Reset to 100%

#### History Controls (line 900-903)
- **Undo Button** (line 901): Undo last action (Ctrl+Z)
- **Redo Button** (line 902): Redo undone action (Ctrl+Y)
- **State Management**: Disabled when no actions to undo/redo

#### Unlock All Button (line 905-910)
- **Visibility**: Only shown when locked objects exist
- **Function**: Unlocks all locked objects on canvas
- **Icon**: Unlock icon with label

#### Generate Dropdown (line 911-917)
- **Create Worksheet** (line 914): Generates main worksheet
- **Create Answer Key** (line 915): Generates solution (disabled until worksheet created)
- **State**: Disabled until valid selection made

#### Download Dropdown (line 919-931)
- **Worksheet JPEG** (line 921): Download worksheet as JPEG
- **Answer Key JPEG** (line 922): Download answer key as JPEG
- **Worksheet PDF** (line 924): Download worksheet as PDF
- **Answer Key PDF** (line 925): Download answer key as PDF
- **Grayscale Toggle** (line 927-929): Checkbox to download in grayscale
- **State**: Disabled until content generated

#### Clear All Button (line 932)
- **Function**: Removes all content from active canvas
- **Confirmation**: Likely prompts user before clearing

---

## CONTEXTUAL TOOLBAR (line 936-978)
**Visibility**: Only shows when object(s) selected on canvas

### Layers Group (line 938-946)
**Dropdown with 4 options**:
- **Bring to Front** (line 941): Move to topmost layer
- **Bring Forward** (line 942): Move up one layer
- **Send Backward** (line 943): Move down one layer
- **Send to Back** (line 944): Move to bottom layer

### Align Group (line 948-970)
**Dropdown with alignment options**:

#### Align Selected Objects (line 953-962)
- **Align Left** (line 954): Align selected to leftmost
- **Center Horizontally** (line 955): Align to horizontal center
- **Align Right** (line 956): Align to rightmost
- **Align Top** (line 959): Align to topmost
- **Center Vertically** (line 960): Align to vertical center
- **Align Bottom** (line 961): Align to bottommost

#### Align to Page (line 964-968)
- **Center on Page Horizontally** (line 966): Center relative to page width
- **Center on Page Vertically** (line 967): Center relative to page height

### Lock/Unlock Button (line 973)
- **Function**: Toggle lock state of selected object(s)
- **Icon Changes**: Shows lock-open when unlocked, lock when locked

### Delete Button (line 976)
- **Function**: Delete selected object(s)
- **Color**: Red (danger color) to indicate destructive action

---

## CANVAS FEATURES (From JavaScript)

### Worksheet Generation (line 1837-1984)

#### Layout System (line 1925-1962)
- **Responsive Layout**: Adapts to page orientation (landscape vs portrait)
- **Header Section**: Fixed height with title and instructions
  - Landscape: 165px header height
  - Portrait: 240px header height
- **Professional Margins**: 8% of width or 50px maximum
- **Category Frames**: 40% of content area
  - Left frame and Right frame side-by-side
  - Visual boxes for sorted items
- **Cutouts Grid**: 55% of content area
  - Mixed images for sorting
  - Auto-calculated grid layout
  - Maintains aspect ratios

#### Preserving User Edits (line 1891-1904)
- **Transform Preservation**: Saves position, scale, rotation of moved items
- **Regeneration**: When creating new worksheet, preserves manual adjustments
- **User Objects**: Non-generated objects (text, decorations) stay in place

### Answer Key Generation (line 1986-1999)
- **Sorted Layout**: Shows images placed in correct categories
- **Transform Preservation**: Maintains any manual adjustments
- **Frame System**: Visual indication of correct placement

### Canvas Interaction (line 1530-1540)
- **Fabric.js Canvas**: Professional canvas editing library
- **Retina Support**: High-resolution rendering
- **Object Stacking**: Maintains z-order of elements
- **Preserved Stacking**: User-set layering persists

---

## IMAGE CONSTRAINTS

### Selection Limits (line 1767-1769, 1824-1834)
- **Total Images**: 6-12 images required
- **Per Category**: 3-6 images per category (left or right)
- **Validation**: Generate button disabled if limits not met

### Theme Mode Requirements (line 1871-1872)
- **Minimum Images Per Theme**: Must have sufficient images in theme
- **Random Selection**: Randomly picks images from chosen themes
- **Auto-categorization**: Theme-selected images auto-assigned to category

---

## MULTI-LANGUAGE SUPPORT

### UI Language (line 998)
- **URL Parameter Based**: Set via URL query parameter
- **11 Languages Supported**: Same as content languages
- **Interface Translation**: All buttons, labels, messages translated

### Content Language (line 999, 1601-1622)
- **Sidebar Selector**: User can change during session
- **Image Library**: Loads language-specific image names
- **UnifiedLanguageManager**: Coordinated language switching
- **Cache Management**: Clears and reloads images on language change

---

## DOWNLOAD OPTIONS

### Export Formats (line 1586-1589)
- **JPEG**: Both worksheet and answer key
- **PDF**: Both worksheet and answer key
- **Grayscale Mode**: Optional for all exports

### Export Quality
- **Professional 300 DPI**: High resolution for printing (inferred from platform standard)
- **Actual Dimensions**: Exports at configured page size, not display size

---

## ADDITIONAL FEATURES

### File Upload (line 1594)
- **Multiple Files**: Can upload multiple images at once
- **Session Storage**: Uploaded images available until session ends
- **Integration**: Uploads appear in preview area like library images

### Undo/Redo System (line 1577-1579, 1978-1983)
- **History Stack**: Tracks canvas state changes
- **Keyboard Shortcuts**: Ctrl+Z (undo), Ctrl+Y (redo)
- **Button State**: Updates based on history availability
- **Generation Reset**: Clears history on new worksheet generation

### Zoom System (line 1573-1575)
- **Zoom Levels**: Configurable zoom in/out
- **Percentage Display**: Real-time zoom level shown
- **Reset Function**: Quick return to 100%

### Lock System (line 1650, 1652)
- **Object Locking**: Prevent accidental edits
- **Toggle Lock**: Lock/unlock selected objects
- **Unlock All**: Batch unlock via header button
- **Visual Indicator**: Locked objects shown differently

---

## THEME SYSTEM

### Theme Categories (line 1658-1683)
- **API Integration**: Fetches themes from `/api/themes-translated?locale={locale}`
- **Language-Specific**: Themes translated per language
- **Dynamic Loading**: Themes loaded on app start and language change

### Background Themes (line 1636)
- **Theme Selection**: Choose from available backgrounds
- **Preview Browser**: Visual selection of backgrounds
- **Opacity Control**: Adjust transparency

### Border Themes (line 1638)
- **Theme Selection**: Choose from available borders
- **Preview Browser**: Visual selection of borders
- **Opacity Control**: Adjust transparency

---

## SUMMARY: CORE SELLING POINTS

1. **Dual Generation Modes**: Theme-based auto-generation OR manual image selection
2. **Categorization System**: Left/Right category assignment with visual frames
3. **11 Languages**: Full UI and content support
4. **Professional Layouts**: Responsive design for all page sizes
5. **Full Editability**: Move, scale, rotate all elements after generation
6. **Custom Images**: Upload own images
7. **Theme Library**: 3000+ images organized by theme
8. **Text Tools**: Add custom text with 7 fonts and styling
9. **Backgrounds & Borders**: Decorative theming with opacity control
10. **Export Options**: JPEG and PDF for both worksheet and answer key
11. **Undo/Redo**: Full history management
12. **Professional Quality**: High-resolution export suitable for printing
