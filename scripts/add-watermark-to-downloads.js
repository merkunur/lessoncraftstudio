const fs = require('fs').promises;
const path = require('path');

// Watermark code to inject
const watermarkCode = `
    // Check if user is on free tier
    function isFreeTier() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('tier') === 'free';
    }

    // Add watermark to canvas before export
    function addWatermarkToCanvas(canvas) {
        if (!isFreeTier()) return;
        
        const watermarkText = new fabric.Text('FREE VERSION - LessonCraftStudio.com', {
            fontSize: 40,
            fill: 'rgba(0, 0, 0, 0.2)',
            angle: -45,
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        
        // Add multiple watermarks across the canvas
        const watermarks = [];
        const spacing = 250;
        for (let x = 0; x < canvas.width; x += spacing) {
            for (let y = 0; y < canvas.height; y += spacing) {
                const wm = new fabric.Text('FREE VERSION', {
                    fontSize: 20,
                    fill: 'rgba(0, 0, 0, 0.15)',
                    angle: -45,
                    left: x,
                    top: y,
                    selectable: false,
                    evented: false,
                    fontFamily: 'Arial, sans-serif'
                });
                watermarks.push(wm);
                canvas.add(wm);
            }
        }
        
        // Add main watermark
        canvas.add(watermarkText);
        canvas.renderAll();
        
        return { mainWatermark: watermarkText, watermarks };
    }

    // Remove watermark after export
    function removeWatermarkFromCanvas(canvas, watermarkData) {
        if (!watermarkData) return;
        
        if (watermarkData.mainWatermark) {
            canvas.remove(watermarkData.mainWatermark);
        }
        if (watermarkData.watermarks) {
            watermarkData.watermarks.forEach(wm => canvas.remove(wm));
        }
        canvas.renderAll();
    }

    // Override the original downloadPDF function
    const originalDownloadPDF = typeof downloadPDF !== 'undefined' ? downloadPDF : null;
    if (originalDownloadPDF) {
        window.downloadPDF = async function(canvasToExport, fileName) {
            if (!canvasToExport || canvasToExport.getObjects().length === 0) {
                return showMessage('Please generate content first.', 'error');
            }
            showMessage('Preparing PDF...', 'info', 0);
            
            // Add watermark if free tier
            const watermarkData = addWatermarkToCanvas(canvasToExport);
            
            try {
                const { jsPDF } = window.jspdf;
                const orientation = canvasToExport.width > canvasToExport.height ? 'l' : 'p';
                const pdf = new jsPDF({ 
                    orientation, 
                    unit: 'pt', 
                    format: [canvasToExport.width, canvasToExport.height] 
                });

                const exportOptions = { 
                    multiplier: typeof downloadMultiplier !== 'undefined' ? downloadMultiplier : 6, 
                    applyGrayscale: typeof grayscaleToggle !== 'undefined' && grayscaleToggle.checked 
                };
                
                const dataURL = await getCanvasDataURLWithOptions(canvasToExport, exportOptions);
                pdf.addImage(dataURL, 'JPEG', 0, 0, canvasToExport.width, canvasToExport.height);
                
                pdf.save(fileName);
                showMessage('PDF downloaded!', 'success');
            } catch(e) { 
                showMessage('Error creating PDF.', 'error'); 
                console.error(e); 
            } finally {
                // Remove watermark after export
                removeWatermarkFromCanvas(canvasToExport, watermarkData);
            }
        };
    }

    // Override the original downloadJPEG function if it exists
    const originalDownloadJPEG = typeof downloadJPEG !== 'undefined' ? downloadJPEG : null;
    if (originalDownloadJPEG) {
        window.downloadJPEG = async function(canvasToExport, fileName) {
            if (!canvasToExport || canvasToExport.getObjects().length === 0) {
                return showMessage('Please generate a worksheet first.', 'error');
            }
            showMessage('Preparing JPEG...', 'info', 0);
            
            // Add watermark if free tier
            const watermarkData = addWatermarkToCanvas(canvasToExport);
            
            try {
                const exportOptions = { 
                    multiplier: typeof downloadMultiplier !== 'undefined' ? downloadMultiplier : 6, 
                    applyGrayscale: typeof grayscaleToggle !== 'undefined' && grayscaleToggle.checked 
                };
                const dataURL = await getCanvasDataURLWithOptions(canvasToExport, exportOptions);
                
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = fileName;
                link.click();
                showMessage('JPEG download initiated!', 'success');
            } catch(e) { 
                showMessage('Error preparing JPEG.', 'error'); 
                console.error(e); 
            } finally {
                // Remove watermark after export
                removeWatermarkFromCanvas(canvasToExport, watermarkData);
            }
        };
    }
`;

async function addWatermarkToFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf-8');
        
        // Check if watermark code already exists
        if (content.includes('function isFreeTier()')) {
            console.log(`Watermark already added to ${path.basename(filePath)}`);
            return;
        }
        
        // Find a good place to inject the code - after the main script starts
        // Look for the downloadPDF function definition
        const downloadPDFIndex = content.indexOf('async function downloadPDF');
        
        if (downloadPDFIndex !== -1) {
            // Insert our watermark code before the downloadPDF function
            content = content.slice(0, downloadPDFIndex) + watermarkCode + '\n' + content.slice(downloadPDFIndex);
            
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`✓ Added watermark to ${path.basename(filePath)}`);
        } else {
            // If no downloadPDF function, add at the end of the script
            const lastScriptIndex = content.lastIndexOf('</script>');
            if (lastScriptIndex !== -1) {
                content = content.slice(0, lastScriptIndex) + watermarkCode + '\n' + content.slice(lastScriptIndex);
                await fs.writeFile(filePath, content, 'utf-8');
                console.log(`✓ Added watermark to ${path.basename(filePath)} (at end)`);
            } else {
                console.log(`✗ Could not add watermark to ${path.basename(filePath)} - no suitable location found`);
            }
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

async function main() {
    const worksheetDir = path.join(__dirname, '..', 'frontend', 'public', 'worksheet-generators');
    
    try {
        const files = await fs.readdir(worksheetDir);
        const htmlFiles = files.filter(f => f.endsWith('.html'));
        
        console.log(`Found ${htmlFiles.length} HTML files to process`);
        
        for (const file of htmlFiles) {
            const filePath = path.join(worksheetDir, file);
            await addWatermarkToFile(filePath);
        }
        
        console.log('\nWatermark addition complete!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();