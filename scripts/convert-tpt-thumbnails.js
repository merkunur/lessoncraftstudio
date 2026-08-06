const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const TPT_DIR = path.join(__dirname, '..', 'tpt-thumbnails');

// Recursively find all HTML files in directory and subdirectories
function findHtmlFiles(dir, baseDir = dir) {
    let results = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results = results.concat(findHtmlFiles(fullPath, baseDir));
        } else if (item.endsWith('.html') && item.startsWith('tpt-thumbnail')) {
            // Store relative path from base directory
            const relativePath = path.relative(baseDir, fullPath);
            results.push(relativePath);
        }
    }

    return results;
}

async function convertTptThumbnails() {
    // Get all TPT thumbnail HTML files (including subfolders)
    const htmlFiles = findHtmlFiles(TPT_DIR).sort();

    console.log(`Found ${htmlFiles.length} HTML files to convert\n`);

    // Launch browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const htmlFile of htmlFiles) {
        const htmlPath = path.join(TPT_DIR, htmlFile);
        const pngName = htmlFile.replace('.html', '.png');
        const pngPath = path.join(TPT_DIR, pngName);

        // Ensure output directory exists for subfolder files
        const pngDir = path.dirname(pngPath);
        if (!fs.existsSync(pngDir)) {
            fs.mkdirSync(pngDir, { recursive: true });
        }

        console.log(`Converting: ${htmlFile}`);

        try {
            const page = await browser.newPage();

            // Set viewport to TPT square format (1000x1000 CSS pixels)
            // deviceScaleFactor: 2 captures at 2x resolution for sharper worksheet images
            await page.setViewport({
                width: 1000,
                height: 1000,
                deviceScaleFactor: 2
            });

            // Load the HTML file
            const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
            await page.goto(fileUrl, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Wait for fonts to load
            await page.evaluateHandle('document.fonts.ready');

            // Wait for images to load
            await page.evaluate(() => {
                return Promise.all(
                    Array.from(document.images)
                        .filter(img => !img.complete)
                        .map(img => new Promise(resolve => {
                            img.onload = img.onerror = resolve;
                        }))
                );
            });

            // Small delay to ensure everything renders
            await new Promise(resolve => setTimeout(resolve, 500));

            // Take screenshot as PNG at 2x resolution (2000x2000 physical pixels)
            // clip uses CSS pixels; deviceScaleFactor scales the output automatically
            await page.screenshot({
                path: pngPath,
                type: 'png',
                clip: {
                    x: 0,
                    y: 0,
                    width: 1000,
                    height: 1000
                }
            });

            await page.close();

            const stats = fs.statSync(pngPath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`  ✓ Saved: ${pngName} (${sizeKB} KB)\n`);

        } catch (error) {
            console.error(`  ✗ Error converting ${htmlFile}: ${error.message}\n`);
        }
    }

    await browser.close();

    console.log('='.repeat(50));
    console.log(`Conversion complete! Files saved to:\n${TPT_DIR}`);

    // List output files
    const outputFiles = fs.readdirSync(TPT_DIR).filter(f => f.endsWith('.png'));
    console.log(`\nGenerated ${outputFiles.length} PNG files:`);
    outputFiles.forEach(f => console.log(`  - ${f}`));
}

convertTptThumbnails().catch(console.error);
