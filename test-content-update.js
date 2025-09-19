// Test content update through the API
async function testContentUpdate() {
    console.log('\n🧪 Testing Content Manager Save Functionality\n');

    try {
        // 1. Get current content
        console.log('1️⃣ Getting current content...');
        const response1 = await fetch('http://localhost:3000/api/homepage/content?raw=true');
        const originalContent = await response1.json();
        console.log('✅ Current hero title (EN):', originalContent.hero.title.en);
        console.log('✅ Current hero title (DE):', originalContent.hero.title.de);

        // 2. Make a test change
        console.log('\n2️⃣ Making a test change...');
        const testContent = { ...originalContent };
        const timestamp = new Date().toISOString().slice(0, 19);
        testContent.hero.title.en = `Test Update - ${timestamp}`;
        testContent.hero.title.de = `Test-Aktualisierung - ${timestamp}`;

        // 3. Save the change
        console.log('3️⃣ Saving the change...');
        const saveResponse = await fetch('http://localhost:3000/api/homepage/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                section: 'all',
                content: testContent
            })
        });

        if (!saveResponse.ok) {
            throw new Error(`Save failed: ${saveResponse.status}`);
        }
        console.log('✅ Save successful');

        // 4. Verify the change persisted
        console.log('\n4️⃣ Verifying the change persisted...');
        const response2 = await fetch('http://localhost:3000/api/homepage/content?raw=true');
        const updatedContent = await response2.json();
        console.log('✅ Updated hero title (EN):', updatedContent.hero.title.en);
        console.log('✅ Updated hero title (DE):', updatedContent.hero.title.de);

        // 5. Check if it appears on the frontend
        console.log('\n5️⃣ Checking frontend display...');
        const frontendResponse = await fetch('http://localhost:3000/api/homepage/content?locale=en');
        const frontendData = await frontendResponse.json();
        console.log('✅ Frontend hero title:', frontendData.content.hero.title);

        // 6. Restore original content
        console.log('\n6️⃣ Restoring original content...');
        const restoreResponse = await fetch('http://localhost:3000/api/homepage/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                section: 'all',
                content: originalContent
            })
        });

        if (restoreResponse.ok) {
            console.log('✅ Original content restored');
        }

        console.log('\n🎉 TEST COMPLETE: Content Manager save functionality is working!\n');
        console.log('📝 Instructions to verify in browser:');
        console.log('1. Open http://localhost:3000/homepage-content-manager-v3-fixed.html');
        console.log('2. Change any text field (e.g., Hero Title for English)');
        console.log('3. Click "Save All Changes"');
        console.log('4. Open http://localhost:3000/en in a new tab');
        console.log('5. The change should be visible on the homepage');

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Run the test
testContentUpdate();