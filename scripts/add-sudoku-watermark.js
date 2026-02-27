const fs = require('fs');
const filePath = 'REFERENCE APPS/sudoku.html';
let content = fs.readFileSync(filePath, 'utf8');

// Detect line ending
const lineEnding = content.includes('\r\n') ? '\r\n' : '\n';
const NL = lineEnding;

// Check if watermark already exists
if (content.includes('addWatermarkToCanvas')) {
  console.log('Watermark code already present in sudoku.html');
  process.exit(0);
}

// 1. Add isFreeTier + watermark functions before downloadImageFile
const watermarkCode = [
  '',
  '    // Check if user is on free tier',
  '    function isFreeTier() {',
  '        const urlParams = new URLSearchParams(window.location.search);',
  "        return urlParams.get('tier') === 'free';",
  '    }',
  '',
  '    // Add watermark to canvas before export',
  '    function addWatermarkToCanvas(canvas) {',
  '        if (!isFreeTier()) return null;',
  '',
  "        const watermarkText = new fabric.Text('FREE VERSION - LessonCraftStudio.com', {",
  '            fontSize: 40,',
  "            fill: 'rgba(0, 0, 0, 0.2)',",
  '            angle: -45,',
  '            left: canvas.width / 2,',
  '            top: canvas.height / 2,',
  "            originX: 'center',",
  "            originY: 'center',",
  '            selectable: false,',
  '            evented: false,',
  "            fontFamily: 'Arial, sans-serif',",
  "            fontWeight: 'bold'",
  '        });',
  '',
  '        // Add multiple watermarks across the canvas',
  '        const watermarks = [];',
  '        const spacing = 250;',
  '        for (let x = 0; x < canvas.width; x += spacing) {',
  '            for (let y = 0; y < canvas.height; y += spacing) {',
  "                const wm = new fabric.Text('FREE VERSION', {",
  '                    fontSize: 20,',
  "                    fill: 'rgba(0, 0, 0, 0.15)',",
  '                    angle: -45,',
  '                    left: x,',
  '                    top: y,',
  '                    selectable: false,',
  '                    evented: false,',
  "                    fontFamily: 'Arial, sans-serif'",
  '                });',
  '                watermarks.push(wm);',
  '                canvas.add(wm);',
  '            }',
  '        }',
  '',
  '        // Add main watermark',
  '        canvas.add(watermarkText);',
  '        canvas.renderAll();',
  '',
  '        return { mainWatermark: watermarkText, watermarks };',
  '    }',
  '',
  '    // Remove watermark after export',
  '    function removeWatermarkFromCanvas(canvas, watermarkData) {',
  '        if (!watermarkData) return;',
  '',
  '        if (watermarkData.mainWatermark) {',
  '            canvas.remove(watermarkData.mainWatermark);',
  '        }',
  '        if (watermarkData.watermarks) {',
  '            watermarkData.watermarks.forEach(wm => canvas.remove(wm));',
  '        }',
  '        canvas.renderAll();',
  '    }',
  '',
].join(NL);

// Insert before downloadImageFile
const insertMarker = '    async function downloadImageFile(canvasToExport, filename) {';
const insertIdx = content.indexOf(insertMarker);
if (insertIdx === -1) {
  console.error('Could not find downloadImageFile function');
  process.exit(1);
}
content = content.substring(0, insertIdx) + watermarkCode + content.substring(insertIdx);
console.log('Inserted watermark functions before downloadImageFile');

// 2. Modify downloadImageFile — insert watermark add before try, remove after catch
// Find the line "        const exportOptions = { multiplier: downloadMultiplier, applyGrayscale: grayscaleToggle.checked };"
// inside downloadImageFile and add watermark before it
const imageExportLine = content.indexOf(
  '        const exportOptions = { multiplier: downloadMultiplier, applyGrayscale: grayscaleToggle.checked };',
  insertIdx
);
if (imageExportLine === -1) {
  console.error('Could not find exportOptions in downloadImageFile');
  process.exit(1);
}
// Insert watermark add line before exportOptions
const wmAddLine = '        // Add watermark if free tier' + NL + '        const watermarkData = addWatermarkToCanvas(canvasToExport);' + NL;
content = content.substring(0, imageExportLine) + wmAddLine + content.substring(imageExportLine);

// Find the closing "} catch(e)" of the image download try block and add watermark removal after it
// The pattern is: "        } catch(e) { showMessage(t('sudoku.msg.jpeg.error'), 'error'); console.error(e); }"
// followed by "    }" (end of downloadImageFile)
const imageCatchLine = "} catch(e) { showMessage(t('sudoku.msg.jpeg.error'), 'error'); console.error(e); }";
const imageCatchIdx = content.indexOf(imageCatchLine, insertIdx);
if (imageCatchIdx === -1) {
  console.error('Could not find image catch block');
  process.exit(1);
}
const afterImageCatch = imageCatchIdx + imageCatchLine.length;
const wmRemoveLine = NL + '        // Remove watermark after export' + NL + '        removeWatermarkFromCanvas(canvasToExport, watermarkData);';
content = content.substring(0, afterImageCatch) + wmRemoveLine + content.substring(afterImageCatch);
console.log('Modified downloadImageFile with watermark');

// 3. Modify downloadPDF — same pattern
// Find the second exportOptions line (inside downloadPDF)
const pdfFnMarker = '    async function downloadPDF(canvasToExport, filename) {';
const pdfFnIdx = content.indexOf(pdfFnMarker);
if (pdfFnIdx === -1) {
  console.error('Could not find downloadPDF function');
  process.exit(1);
}

// Find the "showMessage(formatTranslation..." line inside downloadPDF, then the try block
const pdfTryLine = content.indexOf('        try {', pdfFnIdx + pdfFnMarker.length);
if (pdfTryLine === -1) {
  console.error('Could not find try in downloadPDF');
  process.exit(1);
}
// Insert watermark add before "try {"
const wmPdfAddLine = '        // Add watermark if free tier' + NL + '        const watermarkData = addWatermarkToCanvas(canvasToExport);' + NL;
content = content.substring(0, pdfTryLine) + wmPdfAddLine + content.substring(pdfTryLine);

// Find the closing catch of the PDF try block
const pdfCatchLine = "} catch(e) { showMessage(t('sudoku.msg.pdf.error'), 'error'); console.error(e); }";
const pdfCatchIdx = content.indexOf(pdfCatchLine, pdfFnIdx);
if (pdfCatchIdx === -1) {
  console.error('Could not find PDF catch block');
  process.exit(1);
}
const afterPdfCatch = pdfCatchIdx + pdfCatchLine.length;
const wmPdfRemoveLine = NL + '        // Remove watermark after export' + NL + '        removeWatermarkFromCanvas(canvasToExport, watermarkData);';
content = content.substring(0, afterPdfCatch) + wmPdfRemoveLine + content.substring(afterPdfCatch);
console.log('Modified downloadPDF with watermark');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added watermark to sudoku.html!');
