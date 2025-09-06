# Image Folder Structure Documentation

## Folder Categories

### 1. **General Image Library Folders** (Managed in Strapi)
These folders contain images that are available to ALL worksheet generator apps through the image library:

- **alphabet** - Alphabet letters and related images
- **animals** - Animal images (cat, dog, lion, etc.)
- **coloring** - Images suitable for coloring pages
- **food** - Food items (apple, banana, etc.)
- **general** - Miscellaneous/general purpose images
- **icons** - Icon-style images
- **prepositions** - Images for teaching prepositions
- **symbols** - Mathematical and other symbols

**Total: 8 valid theme folders**

### 2. **App-Specific Folders** (NOT in general library)
These folders are used by specific apps only and should NOT appear in the general image library:

#### Special Purpose Folders:
- **borders** - Used exclusively for border themes in apps that support borders
  - Has its own API endpoint: `/api/borders/themes` and `/api/borders/images`
  
- **backgrounds** - Used exclusively for background themes
  - Has its own API endpoint: `/api/backgrounds/themes` and `/api/backgrounds/images`

#### App-Specific Template Folders:
- **drawing lines** - Used ONLY by the Drawing Lines app
  - API endpoint: `/api/templates`
  
- **template** - Used ONLY by the Pattern Train app
  - API endpoint: `/api/train-templates`
  
- **alphabetsvg** - Used ONLY by the Writing app
  - Contains SVG files for letter tracing

### 3. **Excluded Folders Summary**

| Folder | Used By | API Endpoint | Reason for Exclusion |
|--------|---------|--------------|---------------------|
| borders | Border-supporting apps | `/api/borders/*` | Special border themes |
| backgrounds | Background-supporting apps | `/api/backgrounds/*` | Special background themes |
| drawing lines | Drawing Lines app | `/api/templates` | App-specific templates |
| template | Pattern Train app | `/api/train-templates` | App-specific templates |
| alphabetsvg | Writing app | Direct file access | App-specific SVG files |

## API Structure

### General Image Library API
```javascript
// Get all valid themes (excludes special folders)
GET /api/themes
Returns: ['alphabet', 'animals', 'coloring', 'food', 'general', 'icons', 'prepositions', 'symbols']

// Get images from a theme
GET /api/images?theme=animals
Returns: Array of images from the animals folder

// Search across all valid themes
GET /api/images?search=cat
Returns: Images matching 'cat' from all valid themes
```

### App-Specific APIs
```javascript
// Borders API
GET /api/borders/themes
GET /api/borders/images?theme=simple

// Backgrounds API  
GET /api/backgrounds/themes
GET /api/backgrounds/images?theme=nature

// Drawing Lines templates
GET /api/templates

// Pattern Train templates
GET /api/train-templates
```

## Strapi Content Management

### What's in Strapi:
✅ **Image Themes** - Only the 8 valid general library themes
✅ **Image Assets** - Individual images from those 8 themes
✅ **Translations** - Multilingual support for all images

### What's NOT in Strapi:
❌ borders folder
❌ backgrounds folder
❌ drawing lines folder
❌ template folder
❌ alphabetsvg folder

## Key Principle
**General Image Library = Shared resources for ALL apps**
**App-Specific Folders = Resources for SPECIFIC apps only**

The Strapi Content Manager should only contain images that are part of the general, shared image library that all worksheet generators can access. App-specific resources are managed separately through their dedicated APIs.