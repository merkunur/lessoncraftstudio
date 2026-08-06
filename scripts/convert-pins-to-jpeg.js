const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PREMIUM_DIR = path.join(__dirname, '..', 'pinterest-pins', 'premium');
const OUTPUT_DIR = path.join(PREMIUM_DIR, 'jpeg');

async function convertHtmlToJpeg() {
    // Create output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Get all HTML files
    const htmlFiles = fs.readdirSync(PREMIUM_DIR)
        .filter(file => file.endsWith('.html'))
        .sort();

    console.log(`Found ${htmlFiles.length} HTML files to convert\n`);

    // Launch browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const htmlFile of htmlFiles) {
        const htmlPath = path.join(PREMIUM_DIR, htmlFile);
        const jpegName = htmlFile.replace('.html', '.jpeg');
        const jpegPath = path.join(OUTPUT_DIR, jpegName);

        console.log(`Converting: ${htmlFile}`);

        try {
            const page = await browser.newPage();

            // Set viewport to exact pin dimensions
            await page.setViewport({
                width: 1000,
                height: 1500,
                deviceScaleFactor: 1
            });

            // Load the HTML file
            const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
            await page.goto(fileUrl, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Wait for fonts to load
            await page.evaluateHandle('document.fonts.ready');

            // Small delay to ensure everything renders
            await new Promise(resolve => setTimeout(resolve, 500));

            // Take screenshot as JPEG
            await page.screenshot({
                path: jpegPath,
                type: 'jpeg',
                quality: 92,
                clip: {
                    x: 0,
                    y: 0,
                    width: 1000,
                    height: 1500
                }
            });

            await page.close();

            const stats = fs.statSync(jpegPath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`  ✓ Saved: ${jpegName} (${sizeKB} KB)\n`);

        } catch (error) {
            console.error(`  ✗ Error converting ${htmlFile}: ${error.message}\n`);
        }
    }

    await browser.close();

    console.log('='.repeat(50));
    console.log(`Conversion complete! Files saved to:\n${OUTPUT_DIR}`);

    // List output files
    const outputFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.jpeg'));
    console.log(`\nGenerated ${outputFiles.length} JPEG files:`);
    outputFiles.forEach(f => console.log(`  - ${f}`));
}

convertHtmlToJpeg().catch(console.error);
