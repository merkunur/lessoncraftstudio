# Step 21: File Management System - Test Guide

## Overview
This step implements a comprehensive file management system with upload, storage, optimization, preview, and versioning capabilities for managing all platform assets and documents.

## Components Created

### 1. File Management Interface
- `app/admin/files/page.tsx`: Main file browser interface
- Grid and list view toggles
- Drag-and-drop file upload
- Multi-file selection with Ctrl/Cmd
- Real-time upload progress tracking
- File information modal

### 2. File Upload API
- `app/api/admin/files/upload/route.ts`: File upload endpoint
- Multi-file support
- Size validation (100MB per file, 500MB total)
- Metadata extraction
- Automatic thumbnail generation for images

### 3. Image Optimization
- `app/api/admin/files/optimize/route.ts`: Image optimization service
- Multiple format generation (WebP, AVIF, JPEG, PNG)
- Responsive image generation
- Quality control
- Batch optimization support

### 4. Document Preview
- `app/admin/files/preview/[id]/page.tsx`: File preview interface
- Support for images, PDFs, videos, audio
- Zoom and rotation controls
- Fullscreen mode
- Version history sidebar

### 5. File Versioning
- `app/api/admin/files/versions/route.ts`: Version management
- Version history tracking
- Compare versions
- Restore previous versions
- Comment and tag support

## Testing Instructions

### Prerequisites
1. Admin user must be logged in
2. Development server running
3. Sample files ready for upload

### Test 1: File Upload (Drag & Drop)
1. Navigate to `/admin/files`
2. Drag files onto the upload area
3. Verify:
   - Drop zone highlights on drag over
   - Files appear in upload queue
   - Progress bars show upload progress
   - Success message after completion

### Test 2: File Upload (Button)
1. Click "Upload Files" button
2. Select multiple files
3. Verify:
   - File picker opens
   - Multiple files can be selected
   - Upload progress panel shows

### Test 3: View Toggle
1. Click grid/list view toggle
2. Verify:
   - Grid view shows thumbnails
   - List view shows detailed info
   - Toggle state persists

### Test 4: File Selection
1. Single click on file:
   - File highlights
   - Info modal opens
2. Ctrl/Cmd + click:
   - Multiple files selected
   - Selection count shows

### Test 5: File Search
1. Type in search box
2. Verify:
   - Results filter in real-time
   - Matches file names
   - Clear button works

### Test 6: Folder Navigation
1. Double-click folder
2. Verify:
   - Enters folder
   - Breadcrumb updates
   - Back navigation works

### Test 7: File Information Modal
1. Click on any file
2. Info modal should show:
   - File preview/thumbnail
   - Name, size, type
   - Upload date and user
   - Version count
   - Tags
   - Share/Download buttons

### Test 8: Context Menu
1. Right-click on file
2. Menu should show:
   - Download
   - Share
   - Rename
   - Move
   - Delete
3. Test each action

### Test 9: File Preview
1. Click "View" on image file
2. Navigate to preview page
3. Verify preview controls:
   - Zoom in/out (25%-200%)
   - Rotate (90° increments)
   - Fullscreen toggle
   - Download button

### Test 10: Preview Info Panel
1. In preview, click Info button
2. Panel should show:
   - File information
   - Version history
   - Tags
   - Statistics
   - Action buttons

### Test 11: Image Optimization
1. Upload large image (>2MB)
2. Check optimization:
   ```
   POST /api/admin/files/optimize
   {
     "fileId": "xxx",
     "fileUrl": "xxx",
     "options": {
       "quality": 85,
       "format": "webp",
       "generateFormats": ["webp", "jpeg"]
     }
   }
   ```
3. Verify response includes:
   - Original and optimized sizes
   - Reduction percentage
   - Generated formats

### Test 12: Batch Optimization
1. Select multiple images
2. Choose "Optimize" action
3. Verify:
   - Progress for each file
   - Summary statistics
   - New optimized versions created

### Test 13: Version Creation
1. Upload same file again
2. Add version comment
3. Verify:
   - New version created
   - Version number increments
   - Comment saved

### Test 14: Version History
1. Open file with versions
2. Check version panel:
   - Lists all versions
   - Shows upload date/user
   - Size for each version
   - Comments displayed

### Test 15: Version Comparison
1. Select two versions
2. Click "Compare"
3. Should show:
   - Size difference
   - Metadata changes
   - Tag changes
   - Time elapsed

### Test 16: Restore Version
1. Select older version
2. Click "Restore"
3. Verify:
   - New version created
   - Content from old version
   - "Restored from version X" comment

### Test 17: Storage Metrics
1. Check sidebar storage info
2. Should display:
   - Used space
   - Total space
   - Percentage bar
   - File count by type

### Test 18: Upload Size Limits
1. Try uploading >100MB file
2. Should show error message
3. Try multiple files >500MB total
4. Should show total size error

### Test 19: File Type Icons
1. Upload different file types
2. Verify correct icons:
   - Images: image icon
   - PDFs: document icon
   - Videos: video icon
   - Audio: music icon
   - ZIP: archive icon

### Test 20: Responsive Images
1. For uploaded images, check:
   ```
   GET /api/admin/files/optimize/responsive?fileId=xxx
   ```
2. Verify srcset generated:
   - Multiple breakpoints
   - Appropriate sizes string

## Advanced Features

### Test 21: PDF Preview
1. Upload PDF file
2. Open preview
3. Verify:
   - Page count shown
   - Navigation between pages
   - Download option available

### Test 22: Video Preview
1. Upload video file
2. Open preview
3. Verify:
   - Video player loads
   - Play/pause controls
   - Duration displayed

### Test 23: Audio Preview
1. Upload audio file
2. Open preview
3. Verify:
   - Audio player appears
   - Play controls work
   - Duration shown

### Test 24: Metadata Extraction
1. Upload image with EXIF data
2. Check metadata:
   - Dimensions extracted
   - Color space detected
   - Format identified

### Test 25: Tag Management
1. Add tags to file
2. Verify:
   - Tags saved
   - Searchable by tag
   - Tag removal works

## API Testing

### Upload API
```bash
curl -X POST /api/admin/files/upload \
  -F "files=@test.jpg" \
  -F "parentId=folder_1" \
  -F "tags=test,sample" \
  -F "optimize=true"
```

### Optimization API
```bash
curl -X POST /api/admin/files/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "fileId": "file_1",
    "fileUrl": "https://example.com/image.jpg",
    "options": {
      "quality": 85,
      "format": "webp"
    }
  }'
```

### Version API
```bash
# Get versions
curl /api/admin/files/versions?fileId=file_1

# Create version
curl -X POST /api/admin/files/versions \
  -F "fileId=file_1" \
  -F "file=@new_version.pdf" \
  -F "comment=Updated content"
```

## Performance Benchmarks
1. File upload: < 5 seconds for 10MB
2. Thumbnail generation: < 500ms
3. Image optimization: < 2 seconds per image
4. Preview load: < 1 second
5. Version switch: < 500ms

## Success Criteria
✅ Files upload successfully
✅ Drag and drop works
✅ Progress tracking accurate
✅ Previews load correctly
✅ Optimization reduces file size
✅ Versions tracked properly
✅ Search and filter work
✅ Storage metrics accurate
✅ Performance targets met
✅ No console errors

## Common Issues & Solutions

### Issue: Upload fails silently
- Check network tab for errors
- Verify file size limits
- Check file type restrictions
- Review console for errors

### Issue: Preview not loading
- Verify file URL accessible
- Check CORS settings
- Ensure mime type correct
- Try different browser

### Issue: Optimization timeout
- File may be too large
- Try smaller quality setting
- Process fewer files at once
- Check server resources

### Issue: Version not saving
- Verify file permissions
- Check storage space
- Ensure unique version number
- Review API response

## File Management Tips
1. Organize files in folders
2. Use meaningful file names
3. Add tags for easy search
4. Keep versions for important files
5. Optimize images before use
6. Regular cleanup of unused files

## Next Steps
Step 22 will implement User Profile and Settings with:
- Profile customization
- Preference management
- Security settings
- Activity history
- API key management