const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ADS_DIR = path.join(__dirname, '..', 'pinterest-pins', 'advertisements');

async function convertAdsToJpeg() {
    // Process both hero and carousel directories
    const directories = [
        { name: 'hero', path: path.join(ADS_DIR, 'hero') },
        { name: 'carousel', path: path.join(ADS_DIR, 'carousel') }
    ];

    console.log('Pinterest Advertisement Converter');
    console.log('='.repeat(50));
    console.log('');

    // Launch browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let totalConverted = 0;

    for (const dir of directories) {
        if (!fs.existsSync(dir.path)) {
            console.log(`Skipping ${dir.name} - directory not found`);
            continue;
        }

        // Get all HTML files
        const htmlFiles = fs.readdirSync(dir.path)
            .filter(file => file.endsWith('.html'))
            .sort();

        if (htmlFiles.length === 0) {
            console.log(`No HTML files found in ${dir.name}/`);
            continue;
        }

        console.log(`\n[${dir.name.toUpperCase()}] Converting ${htmlFiles.length} files...`);
        console.log('-'.repeat(40));

        for (const htmlFile of htmlFiles) {
            const htmlPath = path.join(dir.path, htmlFile);
            const jpegName = htmlFile.replace('.html', '.jpeg');
            const jpegPath = path.join(dir.path, jpegName);

            console.log(`  Converting: ${htmlFile}`);

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
                console.log(`    ✓ Saved: ${jpegName} (${sizeKB} KB)`);
                totalConverted++;

            } catch (error) {
                console.error(`    ✗ Error: ${error.message}`);
            }
        }
    }

    await browser.close();

    console.log('\n' + '='.repeat(50));
    console.log(`Conversion complete! ${totalConverted} files converted.`);
    console.log('');
    console.log('Output locations:');
    console.log(`  Hero ads:     ${path.join(ADS_DIR, 'hero')}`);
    console.log(`  Carousel ads: ${path.join(ADS_DIR, 'carousel')}`);

    // List all generated files
    console.log('\nGenerated files:');
    for (const dir of directories) {
        if (fs.existsSync(dir.path)) {
            const jpegFiles = fs.readdirSync(dir.path).filter(f => f.endsWith('.jpeg'));
            if (jpegFiles.length > 0) {
                console.log(`\n  [${dir.name}]`);
                jpegFiles.forEach(f => console.log(`    - ${f}`));
            }
        }
    }
}

convertAdsToJpeg().catch(console.error);
