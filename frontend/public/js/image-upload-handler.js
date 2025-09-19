// Image Upload Handler for Homepage Content Manager
class ImageUploadHandler {
    constructor() {
        this.uploadEndpoint = '/api/upload/image';
    }

    // Initialize drag and drop for an element
    initDragDrop(element, callback) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            element.addEventListener(eventName, () => this.highlight(element), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, () => this.unhighlight(element), false);
        });

        // Handle dropped files
        element.addEventListener('drop', (e) => this.handleDrop(e, callback), false);
    }

    // Initialize file input
    initFileInput(inputElement, callback) {
        inputElement.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                this.handleFiles(files, callback);
            }
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight(element) {
        element.classList.add('drag-highlight');
    }

    unhighlight(element) {
        element.classList.remove('drag-highlight');
    }

    handleDrop(e, callback) {
        const dt = e.dataTransfer;
        const files = dt.files;
        this.handleFiles(files, callback);
    }

    handleFiles(files, callback) {
        ([...files]).forEach(file => this.uploadFile(file, callback));
    }

    async uploadFile(file, callback) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            // For now, create a local URL for the image
            // In production, this would upload to a server
            const url = URL.createObjectURL(file);

            // Create a proper image object
            const img = new Image();
            img.onload = () => {
                callback({
                    url: url,
                    file: file,
                    width: img.width,
                    height: img.height,
                    name: file.name,
                    size: file.size
                });
            };
            img.src = url;
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload image');
        }
    }

    // Create a drag-drop zone UI
    createDropZone(container, callback) {
        const dropZone = document.createElement('div');
        dropZone.className = 'image-drop-zone';
        dropZone.innerHTML = `
            <div class="drop-zone-content">
                <svg class="drop-zone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <p class="drop-zone-text">
                    <strong>Drop image here</strong><br>
                    or click to browse
                </p>
                <input type="file" class="drop-zone-input" accept="image/*" style="display: none;">
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .image-drop-zone {
                border: 2px dashed #cbd5e0;
                border-radius: 8px;
                padding: 32px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                background-color: #f7fafc;
                margin: 16px 0;
            }

            .image-drop-zone:hover {
                border-color: #4299e1;
                background-color: #ebf8ff;
            }

            .image-drop-zone.drag-highlight {
                border-color: #38a169;
                background-color: #f0fff4;
            }

            .drop-zone-icon {
                color: #a0aec0;
                margin: 0 auto 16px;
            }

            .drop-zone-text {
                color: #4a5568;
                font-size: 14px;
                margin: 0;
            }

            .drop-zone-text strong {
                color: #2d3748;
                font-weight: 600;
            }

            .image-preview {
                max-width: 200px;
                max-height: 150px;
                margin: 10px auto;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
        `;

        if (!document.querySelector('style[data-image-upload]')) {
            style.setAttribute('data-image-upload', 'true');
            document.head.appendChild(style);
        }

        const fileInput = dropZone.querySelector('.drop-zone-input');

        // Make entire zone clickable
        dropZone.addEventListener('click', () => fileInput.click());

        // Initialize drag and drop
        this.initDragDrop(dropZone, callback);
        this.initFileInput(fileInput, callback);

        container.appendChild(dropZone);
        return dropZone;
    }

    // Create image preview
    createImagePreview(imageData) {
        const preview = document.createElement('div');
        preview.className = 'image-preview-container';
        preview.innerHTML = `
            <img src="${imageData.url}" alt="${imageData.name}" class="image-preview">
            <p style="font-size: 12px; color: #666; margin: 5px 0 0 0;">${imageData.name}</p>
        `;
        return preview;
    }
}

// Export for use
window.ImageUploadHandler = ImageUploadHandler;