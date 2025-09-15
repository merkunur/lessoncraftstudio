/**
 * Border & Background Sizer Utility
 *
 * Ensures borders and backgrounds are properly sized to fit the page height
 * while maintaining aspect ratio and centering.
 *
 * @author LessonCraftStudio Team
 * @version 1.0.0
 */

class BorderBackgroundSizer {
    /**
     * Scale an image to fit the canvas height exactly
     * @param {fabric.Image} image - The Fabric.js image object
     * @param {fabric.Canvas} canvas - The target canvas
     * @param {Object} options - Additional options
     * @returns {fabric.Image} The scaled image
     */
    static scaleToPageHeight(image, canvas, options = {}) {
        const defaults = {
            maintainAspectRatio: true,
            centerHorizontally: true,
            centerVertically: true
        };

        const settings = { ...defaults, ...options };

        // Calculate the scale factor to fit height
        const scaleFactorHeight = canvas.height / image.height;

        // Apply the scale
        image.scale(scaleFactorHeight);

        // Center the image
        if (settings.centerHorizontally) {
            image.set('left', canvas.width / 2);
            image.set('originX', 'center');
        }

        if (settings.centerVertically) {
            image.set('top', canvas.height / 2);
            image.set('originY', 'center');
        }

        console.log(`[BorderBackgroundSizer] Scaled image to fit height: ${canvas.height}px`);

        return image;
    }

    /**
     * Scale an image to cover the entire canvas
     * @param {fabric.Image} image - The Fabric.js image object
     * @param {fabric.Canvas} canvas - The target canvas
     * @returns {fabric.Image} The scaled image
     */
    static scaleToCover(image, canvas) {
        const scaleFactorHeight = canvas.height / image.height;
        const scaleFactorWidth = canvas.width / image.width;

        // Use the larger scale factor to ensure full coverage
        const scaleFactor = Math.max(scaleFactorHeight, scaleFactorWidth);

        image.scale(scaleFactor);
        image.set({
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: 'center',
            originY: 'center'
        });

        console.log(`[BorderBackgroundSizer] Scaled image to cover canvas`);

        return image;
    }

    /**
     * Scale an image to fit within the canvas
     * @param {fabric.Image} image - The Fabric.js image object
     * @param {fabric.Canvas} canvas - The target canvas
     * @returns {fabric.Image} The scaled image
     */
    static scaleToFit(image, canvas) {
        const scaleFactorHeight = canvas.height / image.height;
        const scaleFactorWidth = canvas.width / image.width;

        // Use the smaller scale factor to ensure it fits
        const scaleFactor = Math.min(scaleFactorHeight, scaleFactorWidth);

        image.scale(scaleFactor);
        image.set({
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: 'center',
            originY: 'center'
        });

        console.log(`[BorderBackgroundSizer] Scaled image to fit within canvas`);

        return image;
    }

    /**
     * Add a border to canvas with proper sizing
     * @param {string} imagePath - Path to the border image
     * @param {fabric.Canvas} canvas - The target canvas
     * @param {Object} options - Additional options
     */
    static async addBorderToCanvas(imagePath, canvas, options = {}) {
        return new Promise((resolve, reject) => {
            fabric.Image.fromURL(imagePath, (img) => {
                if (!img) {
                    reject(new Error('Failed to load border image'));
                    return;
                }

                // Remove existing border
                const existingBorder = canvas.getObjects().find(obj => obj.isBorder);
                if (existingBorder) {
                    canvas.remove(existingBorder);
                }

                // Set border properties
                img.set({
                    isBorder: true,
                    selectable: options.selectable !== false,
                    evented: options.evented !== false,
                    opacity: options.opacity || 1
                });

                // Scale to page height
                this.scaleToPageHeight(img, canvas);

                // Add to canvas
                canvas.add(img);

                // Ensure borders are on top
                canvas.bringToFront(img);

                canvas.renderAll();
                resolve(img);

            }, { crossOrigin: 'anonymous' });
        });
    }

    /**
     * Add a background to canvas with proper sizing
     * @param {string} imagePath - Path to the background image
     * @param {fabric.Canvas} canvas - The target canvas
     * @param {Object} options - Additional options
     */
    static async addBackgroundToCanvas(imagePath, canvas, options = {}) {
        return new Promise((resolve, reject) => {
            fabric.Image.fromURL(imagePath, (img) => {
                if (!img) {
                    reject(new Error('Failed to load background image'));
                    return;
                }

                // Remove existing background
                const existingBackground = canvas.getObjects().find(obj => obj.isBackground);
                if (existingBackground) {
                    canvas.remove(existingBackground);
                }

                // Set background properties
                img.set({
                    isBackground: true,
                    selectable: options.selectable !== false,
                    evented: options.evented !== false,
                    opacity: options.opacity || 1
                });

                // Scale to page height
                this.scaleToPageHeight(img, canvas);

                // Add to canvas
                canvas.add(img);

                // Ensure backgrounds are at the bottom
                canvas.sendToBack(img);

                canvas.renderAll();
                resolve(img);

            }, { crossOrigin: 'anonymous' });
        });
    }

    /**
     * Update sizing when canvas dimensions change
     * @param {fabric.Canvas} canvas - The canvas to update
     */
    static updateSizing(canvas) {
        const border = canvas.getObjects().find(obj => obj.isBorder);
        const background = canvas.getObjects().find(obj => obj.isBackground);

        if (border) {
            this.scaleToPageHeight(border, canvas);
        }

        if (background) {
            this.scaleToPageHeight(background, canvas);
        }

        canvas.renderAll();
    }

    /**
     * Auto-fix sizing issues on any page
     */
    static autoFix() {
        // Find all Fabric canvases on the page
        const canvases = [];

        // Check common canvas variable names
        ['worksheetCanvas', 'answerKeyCanvas', 'canvas', 'fabricCanvas'].forEach(name => {
            if (window[name] && window[name]._objects) {
                canvases.push(window[name]);
            }
        });

        if (canvases.length === 0) {
            console.warn('[BorderBackgroundSizer] No Fabric.js canvases found');
            return;
        }

        canvases.forEach(canvas => {
            this.updateSizing(canvas);
        });

        console.log(`[BorderBackgroundSizer] Fixed sizing on ${canvases.length} canvas(es)`);
    }
}

// Export for use
window.BorderBackgroundSizer = BorderBackgroundSizer;

// Add keyboard shortcut for quick fix
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+S to fix sizing
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        console.log('🔧 Fixing border/background sizing...');
        BorderBackgroundSizer.autoFix();
    }
});

console.log('📏 BorderBackgroundSizer loaded - Press Ctrl+Shift+S to fix sizing issues');