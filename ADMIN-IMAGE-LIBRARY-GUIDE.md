# Admin Guide: Managing the Image Library in Strapi

## Overview
The LessonCraftStudio image library is managed through Strapi's admin panel. This guide shows you how to add, edit, and organize images and themes with translations in all 11 supported languages.

## Access the Admin Panel
1. Open your browser and go to: http://localhost:1337/admin
2. Log in with your admin credentials
3. You'll see the main dashboard

## Managing Image Themes (Folders)

### View All Themes
1. In the left sidebar, click **Content Manager**
2. Click **Image Themes**
3. You'll see all themes/folders with their translations

### Add a New Theme
1. Click **Content Manager** → **Image Themes**
2. Click the **Create new entry** button (top right)
3. Fill in the fields:
   - **Folder Name**: The actual folder name (e.g., "animals") - MUST match the folder in the file system
   - **Display Name**: English name (e.g., "Animals")
   - **Translations**: Click to expand and add translations for all languages:
     ```json
     {
       "en": "Animals",
       "de": "Tiere",
       "fr": "Animaux",
       "es": "Animales",
       "pt": "Animais",
       "it": "Animali",
       "nl": "Dieren",
       "sv": "Djur",
       "da": "Dyr",
       "no": "Dyr",
       "fi": "Eläimet"
     }
     ```
   - **Sort Order**: Number for ordering (0, 1, 2, etc.)
4. Click **Save** then **Publish**

### Edit Theme Translations
1. Click **Content Manager** → **Image Themes**
2. Click on the theme you want to edit
3. Update the translations JSON field
4. Click **Save** to update

## Managing Images

### View All Images
1. Click **Content Manager** → **Image Assets**
2. You'll see all images with their metadata

### Add a New Image
1. Click **Content Manager** → **Image Assets**
2. Click **Create new entry**
3. Fill in the fields:
   - **File Name**: The image filename (e.g., "cat.png")
   - **Display Name**: English name (e.g., "Cat")
   - **File**: Click **Add media assets** to upload the image file
   - **Themes**: Select which theme(s) this image belongs to
   - **Translations**: Add translations for all languages:
     ```json
     {
       "en": "Cat",
       "de": "Katze",
       "fr": "Chat",
       "es": "Gato",
       "pt": "Gato",
       "it": "Gatto",
       "nl": "Kat",
       "sv": "Katt",
       "da": "Kat",
       "no": "Katt",
       "fi": "Kissa"
     }
     ```
   - **Is Premium**: Check if this is a premium-only image
4. Click **Save** then **Publish**

### Link Images to Themes
1. Open an image in **Image Assets**
2. In the **Themes** field, click **Add relation**
3. Select the theme(s) this image belongs to
4. Click **Save**

## Bulk Operations

### Import Multiple Images
1. Prepare a CSV file with columns: fileName, displayName, theme, translations
2. Use the migration script: `node scripts/migrate-images-simple.js`

### Quick Translation Tips
1. Use Google Translate for initial translations
2. Format as JSON in the translations field
3. Always include all 11 languages:
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

## How Worksheet Apps Use the Images

When a user selects a language in any worksheet app:
1. The app queries Strapi for themes in that language
2. Theme names appear translated in dropdowns
3. When a theme is selected, images load with translated names
4. Image labels show in the selected language

## Testing Your Changes

### Test in Math Worksheet App
1. Open: http://localhost:3000/worksheet-generators/math%20worksheet.html
2. Change the language selector
3. Verify themes show translated names
4. Select a theme and verify image names are translated

### Test API Directly
```bash
# Get themes in German
curl http://localhost:1337/api/image-themes/translated?locale=de

# Get images for "animals" theme in French
curl http://localhost:1337/api/image-themes/folder/animals?locale=fr
```

## Common Tasks

### Add a Holiday Theme
1. Create theme: "holidays" 
2. Add translations: Christmas (en) → Weihnachten (de) → Noël (fr)
3. Upload images: santa.png, tree.png, gifts.png
4. Add translations for each image
5. Link images to the theme

### Update All Animal Names to Spanish
1. Go to **Image Assets**
2. Filter by theme: "animals"
3. Edit each image
4. Update the Spanish translation in the JSON
5. Save and publish

### Make Images Premium
1. Select the image
2. Check "Is Premium"
3. Save

## Best Practices

1. **Always add all 11 language translations** - Even if using the English word
2. **Keep folder names consistent** - They must match the file system
3. **Use sort order** - To control theme display order
4. **Test after changes** - Verify in the worksheet apps
5. **Backup regularly** - Export your content periodically

## Troubleshooting

### Images Not Showing
- Check image is linked to a theme
- Verify image is published (not draft)
- Check file upload was successful

### Translations Not Appearing
- Ensure JSON format is correct
- All language codes must be lowercase
- Refresh the app/clear cache

### Theme Not Listed
- Verify theme is published
- Check folderName matches exactly
- Ensure translations JSON is valid

## Support
For technical issues, contact the development team with:
- Screenshot of the error
- Which theme/image you were editing
- What language was selected