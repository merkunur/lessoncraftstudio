# Treasure Hunt App - Features Analysis (Source of Truth)

## App Overview
The Treasure Hunt app creates educational worksheets for teaching directional vocabulary and visual recognition. Students identify images on a grid and describe their locations using directional language.

## 6 Main Accordion Sections

### 1. Language Settings (Lines 581-602)
- **UI Language Selection**: 11 languages
  - English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- **Impact**: Changes both UI and content language
- **Content Generation**: Image filenames in selected language create directions

### 2. Page Setup (Lines 604-636)
**Page Size Options** (Line 607-614):
- Letter Portrait (612×792)
- Letter Landscape (792×612)
- A4 Portrait (595×842)
- A4 Landscape (842×595)
- Square (1200×1200)
- Custom (user-defined width/height)

**Background Theme** (Line 625):
- Dropdown populated with theme options
- Background Opacity slider (0.1 to 1.0)

**Border Theme** (Line 631):
- Dropdown populated with theme options
- Border Opacity slider (0.1 to 1.0)

### 3. Text Tools (Lines 639-659)
**Font Settings**:
- Text Color picker
- Font Size (default 48, min 8)
- Font Family options:
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana

### 4. Puzzle Setup (Lines 661-680)
**Theme-Based Generation** (Line 664-666):
- Select from pre-populated theme dropdown
- Auto-selects 6 images from theme
- Overrides manual selection

**Manual Image Selection**:
- Select exactly 6 images from library
- Preview area shows selected images
- Click to remove from selection

**Direction Type** (Lines 673-676):
- **Basic Directions**: Up/Down/Left/Right (Pre-K to 1st Grade)
- **Cardinal Directions**: North/South/East/West (2nd Grade+)
- Description explains language level appropriateness

### 5. Image Library (Lines 684-694)
**Theme Selection**:
- Dropdown populated with 3000+ image themes
- Organized by categories

**Search Functionality**:
- Search images by keyword
- Example: "apple, car"

**Dictionary Display**:
- Shows filtered images based on theme/search
- Click images to select (max 6)
- Visual feedback for selection

### 6. Upload Custom Images (Lines 696-710)
**File Upload**:
- Multi-file selection
- Supported formats: JPEG, PNG, GIF
- Preview area shows uploaded images
- Can combine with library images

## How the App Works

### Worksheet Generation Flow:
1. **Select 6 Images**: Either from theme OR manually select 6 individual images
2. **Choose Direction Type**: Basic (up/down/left/right) or Cardinal (north/south/east/west)
3. **Language Selection**: Determines direction vocabulary used
4. **Generate**: Creates grid with 6 images placed randomly
5. **Directions Created**: App generates questions asking "Where is the [object]?" and student must answer with directions

### Canvas Features (Full Editability):
- All 6 images are editable on canvas
- Drag images to reposition
- Resize images
- Delete images
- Add new images from library
- Add text elements
- Change backgrounds and borders
- Full customization after generation

### Export Options:
- **Download as PDF**: High-quality printable format
- **Download as JPEG**: Image format
- **Grayscale Option**: Save ink when printing
- **300 DPI**: Professional quality for classroom and commercial use

## Key Educational Value
- **Directional Vocabulary**: Teaches spatial reasoning (up/down/left/right OR north/south/east/west)
- **Visual Recognition**: Students identify objects and their positions
- **Grid Reading**: Develops coordinate understanding
- **Language Learning**: Available in 11 languages for ESL/world language instruction
- **Age Appropriate**: Two difficulty levels (Pre-K to 1st OR 2nd Grade+)

## Unique Features
1. **Dual Direction Systems**: Basic vs Cardinal directions for different age groups
2. **Language-Based Content**: Direction vocabulary matches selected language
3. **Grid-Based Layout**: 2x3 or 3x2 grid (depends on orientation)
4. **Interactive Learning**: Students practice both visual recognition and directional language

## Technical Details
- **Image Library**: 3000+ child-friendly images
- **Themes**: Organized by categories (animals, food, school, etc.)
- **Multi-language Support**: 11 UI languages
- **Custom Upload**: Combine library + uploaded images
- **Full Canvas Editing**: Fabric.js-powered editor
- **Professional Export**: 300 DPI PDF/JPEG

## Subscription Tier
**Treasure Hunt = Full Access ($240/year or $25/month)**
