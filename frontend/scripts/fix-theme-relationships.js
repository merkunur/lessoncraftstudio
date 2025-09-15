const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = 'http://localhost:8055';
const API_TOKEN = 'static-api-token-for-sync';

// Theme mappings based on folder names
const THEME_MAPPINGS = {
    'animals': 2,
    'alphabet': 1,
    'coloring': 3,
    'food': 4,
    'general': 5,
    'icons': 6,
    'prepositions': 7,
    'symbols': 8,
    'furniture': 9,
    'object': 10,
    'vehicles': 11,  // Might need to check/create
    'miscellaneous': 12,
    'alphabetsvg': 13,
    'drawing lines': 14
};

const BACKGROUND_THEME_MAPPINGS = {
    'summer': 1,
    'winter': 2,
    'autumn': 3,
    'spring': 4,
    'forest': 5
};

const BORDER_STYLE_MAPPINGS = {
    'spring': 1,
    'math': 2
};

async function getOrCreateTheme(themeName, collection = 'image_themes') {
    // Check if theme exists
    const checkUrl = `${DIRECTUS_URL}/items/${collection}?filter[folder_name][_eq]=${themeName}`;
    const checkRes = await fetch(checkUrl, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });

    if (checkRes.ok) {
        const data = await checkRes.json();
        if (data.data && data.data.length > 0) {
            return data.data[0].id;
        }
    }

    // Create new theme
    const createRes = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            folder_name: themeName,
            name: {
                en: themeName.charAt(0).toUpperCase() + themeName.slice(1)
            },
            is_active: true,
            sort_order: 999
        })
    });

    if (createRes.ok) {
        const result = await createRes.json();
        console.log(`Created new theme: ${themeName} with ID ${result.data.id}`);
        return result.data.id;
    }

    return null;
}

async function fixImageAssets() {
    console.log('\n📷 Fixing Image Assets Theme Relationships...');

    // Get all image assets without theme
    const response = await fetch(`${DIRECTUS_URL}/items/image_assets?limit=500&fields=id,file_name,theme_id`, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });

    if (!response.ok) {
        console.error('Failed to fetch image assets');
        return;
    }

    const data = await response.json();
    const assets = data.data;

    console.log(`Found ${assets.length} image assets`);

    let updated = 0;
    let skipped = 0;

    // Group assets by likely theme based on file patterns
    for (const asset of assets) {
        if (asset.theme_id) {
            skipped++;
            continue;
        }

        let themeId = null;
        const fileName = asset.file_name.toLowerCase();

        // Try to match theme from filename
        if (fileName.includes('cat') || fileName.includes('dog') || fileName.includes('bird') ||
            fileName.includes('lion') || fileName.includes('bear') || fileName.includes('cow') ||
            fileName.includes('mouse') || fileName.includes('fish') || fileName.includes('fox')) {
            themeId = THEME_MAPPINGS['animals'];
        } else if (fileName.includes('apple') || fileName.includes('banana') || fileName.includes('pizza') ||
                   fileName.includes('cake') || fileName.includes('bread')) {
            themeId = THEME_MAPPINGS['food'];
        } else if (fileName.includes('car') || fileName.includes('bus') || fileName.includes('train') ||
                   fileName.includes('plane') || fileName.includes('bike')) {
            themeId = await getOrCreateTheme('vehicles');
        } else if (fileName.includes('chair') || fileName.includes('table') || fileName.includes('sofa')) {
            themeId = THEME_MAPPINGS['furniture'];
        } else if (fileName.match(/^[a-z]$/i)) {
            themeId = THEME_MAPPINGS['alphabet'];
        } else {
            // Default to general
            themeId = THEME_MAPPINGS['general'];
        }

        if (themeId) {
            const updateRes = await fetch(`${DIRECTUS_URL}/items/image_assets/${asset.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ theme_id: themeId })
            });

            if (updateRes.ok) {
                updated++;
                console.log(`✅ Updated ${asset.file_name} -> theme ${themeId}`);
            }
        }
    }

    console.log(`Updated ${updated} assets, skipped ${skipped} (already had theme)`);
}

async function fixBorderImages() {
    console.log('\n🖼️ Fixing Border Images Style Relationships...');

    const response = await fetch(`${DIRECTUS_URL}/items/border_images?limit=500&fields=id,file_name,style_id`, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });

    if (!response.ok) {
        console.error('Failed to fetch border images');
        return;
    }

    const data = await response.json();
    const borders = data.data;

    let updated = 0;

    for (const border of borders) {
        if (!border.style_id) {
            // Guess style from filename
            const fileName = border.file_name.toLowerCase();
            let styleId = BORDER_STYLE_MAPPINGS['spring']; // Default

            if (fileName.includes('math') || fileName.includes('number') || fileName.includes('untitled')) {
                styleId = BORDER_STYLE_MAPPINGS['math'];
            }

            const updateRes = await fetch(`${DIRECTUS_URL}/items/border_images/${border.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ style_id: styleId })
            });

            if (updateRes.ok) {
                updated++;
                console.log(`✅ Updated border ${border.file_name} -> style ${styleId}`);
            }
        }
    }

    console.log(`Updated ${updated} border images`);
}

async function fixBackgroundImages() {
    console.log('\n🎨 Fixing Background Images Theme Relationships...');

    // First ensure background themes exist
    const bgThemes = ['summer', 'winter', 'autumn', 'spring', 'forest'];
    for (const theme of bgThemes) {
        await getOrCreateTheme(theme, 'background_themes');
    }

    const response = await fetch(`${DIRECTUS_URL}/items/background_images?limit=500&fields=id,file_name,theme_id`, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });

    if (!response.ok) {
        console.error('Failed to fetch background images');
        return;
    }

    const data = await response.json();
    const backgrounds = data.data;

    let updated = 0;

    for (const bg of backgrounds) {
        if (!bg.theme_id) {
            const fileName = bg.file_name.toLowerCase();
            let themeId = 1; // Default to summer

            // Try to match theme from filename
            if (fileName.includes('winter') || fileName.includes('snow')) {
                themeId = 2;
            } else if (fileName.includes('autumn') || fileName.includes('fall')) {
                themeId = 3;
            } else if (fileName.includes('spring') || fileName.includes('flower')) {
                themeId = 4;
            } else if (fileName.includes('forest') || fileName.includes('tree')) {
                themeId = 5;
            }

            const updateRes = await fetch(`${DIRECTUS_URL}/items/background_images/${bg.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ theme_id: themeId })
            });

            if (updateRes.ok) {
                updated++;
                console.log(`✅ Updated background ${bg.file_name} -> theme ${themeId}`);
            }
        }
    }

    console.log(`Updated ${updated} background images`);
}

async function analyzeFilesystem() {
    console.log('\n📂 Analyzing filesystem to detect proper themes...');

    const imagesPath = path.join(__dirname, '..', 'public', 'images');

    // Scan main image folders
    if (fs.existsSync(imagesPath)) {
        const folders = fs.readdirSync(imagesPath, { withFileTypes: true })
            .filter(d => d.isDirectory() && !['borders', 'backgrounds', 'template'].includes(d.name));

        console.log('Found image folders:', folders.map(f => f.name));

        // Create themes for any missing folders
        for (const folder of folders) {
            const themeId = await getOrCreateTheme(folder.name);
            if (themeId && !THEME_MAPPINGS[folder.name]) {
                THEME_MAPPINGS[folder.name] = themeId;
                console.log(`Added theme mapping: ${folder.name} -> ${themeId}`);
            }
        }
    }
}

async function showStats() {
    console.log('\n📊 Final Statistics:');

    const collections = [
        { name: 'image_assets', field: 'theme_id' },
        { name: 'border_images', field: 'style_id' },
        { name: 'background_images', field: 'theme_id' }
    ];

    for (const col of collections) {
        const withTheme = await fetch(
            `${DIRECTUS_URL}/items/${col.name}?filter[${col.field}][_nnull]=true&limit=1&meta=total_count`,
            { headers: { 'Authorization': `Bearer ${API_TOKEN}` } }
        );

        const withoutTheme = await fetch(
            `${DIRECTUS_URL}/items/${col.name}?filter[${col.field}][_null]=true&limit=1&meta=total_count`,
            { headers: { 'Authorization': `Bearer ${API_TOKEN}` } }
        );

        if (withTheme.ok && withoutTheme.ok) {
            const withData = await withTheme.json();
            const withoutData = await withoutTheme.json();

            console.log(`${col.name}:`);
            console.log(`  ✅ With ${col.field}: ${withData.meta?.total_count || 0}`);
            console.log(`  ❌ Without ${col.field}: ${withoutData.meta?.total_count || 0}`);
        }
    }
}

async function main() {
    console.log('🔧 Fixing Theme Relationships in Directus...');
    console.log('This will assign proper themes to all images based on their content.\n');

    try {
        // First analyze filesystem to ensure all themes exist
        await analyzeFilesystem();

        // Fix each collection
        await fixImageAssets();
        await fixBorderImages();
        await fixBackgroundImages();

        // Show final stats
        await showStats();

        console.log('\n✅ Theme relationships fixed!');
        console.log('The admin dashboard should now show proper themes for all items.');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the script
main().catch(console.error);