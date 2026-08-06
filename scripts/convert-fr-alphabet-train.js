const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'tpt-thumbnails', 'French', 'alphabet-train');

async function convert() {
    const htmlFiles = fs.readdirSync(DIR)
        .filter(f => f.endsWith('.html') && f.startsWith('tpt-thumbnail'))
        .sort();

    console.log('Found ' + htmlFiles.length + ' HTML files in French/alphabet-train\n');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const htmlFile of htmlFiles) {
        const htmlPath = path.join(DIR, htmlFile);
        const pngPath = htmlPath.replace('.html', '.png');

        console.log('Converting: ' + htmlFile);

        try {
            const page = await browser.newPage();
            await page.setViewport({ width: 1000, height: 1000, deviceScaleFactor: 2 });

            const fileUrl = 'file:///' + htmlPath.split(path.sep).join('/');
            await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
            await page.evaluateHandle('document.fonts.ready');
            await page.evaluate(() => {
                return Promise.all(
                    Array.from(document.images)
                        .filter(img => !img.complete)
                        .map(img => new Promise(resolve => {
                            img.onload = img.onerror = resolve;
                        }))
                );
            });
            await new Promise(resolve => setTimeout(resolve, 500));

            await page.screenshot({
                path: pngPath,
                type: 'png',
                clip: { x: 0, y: 0, width: 1000, height: 1000 }
            });

            await page.close();

            const stats = fs.statSync(pngPath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log('  Done: ' + path.basename(pngPath) + ' (' + sizeKB + ' KB)\n');

        } catch (error) {
            console.error('  Error: ' + error.message + '\n');
        }
    }

    await browser.close();
    console.log('All conversions complete!');
}

convert().catch(console.error);
