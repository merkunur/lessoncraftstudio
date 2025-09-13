// Template loadDictionary function to add to apps that are missing it

async function loadDictionary() {
    const themeSelect = document.getElementById('themeSelect');
    const searchInput = document.getElementById('searchInput');
    const dictionaryDiv = document.getElementById('dictionary');
    
    const theme = themeSelect.value;
    const query = searchInput.value.trim().toLowerCase();
    
    dictionaryDiv.innerHTML = '';
    let imagesToDisplay = [];
    
    try {
        if (theme === 'all') {
            if (!query) {
                // Load animals theme by default when "All Themes" is selected with no search
                dictionaryDiv.innerHTML = `<p class="dictionary-message">Loading default theme...</p>`;
                const response = await fetch(`/api/images?theme=animals&locale=${currentLocale}`);
                if (!response.ok) throw new Error('Failed to load default theme');
                const data = await response.json();
                imagesToDisplay = data.images || data; // Handle both new and old API formats
            } else {
                // Search across all themes
                dictionaryDiv.innerHTML = `<p class="dictionary-message">Searching...</p>`;
                const response = await fetch(`/api/images?search=${encodeURIComponent(query)}&locale=${currentLocale}`);
                if (!response.ok) throw new Error(`Failed to search for "${query}"`);
                const data = await response.json();
                imagesToDisplay = data.images || data; // Handle both new and old API formats
            }
        } else {
            // Load specific theme
            dictionaryDiv.innerHTML = `<p class="dictionary-message">Loading theme...</p>`;
            const response = await fetch(`/api/images?theme=${encodeURIComponent(theme)}&locale=${currentLocale}`);
            if (!response.ok) throw new Error(`Failed to load theme: ${theme}`);
            const data = await response.json();
            const themeImages = data.images || data; // Handle both new and old API formats
            
            // Filter by search query if present
            imagesToDisplay = query ? themeImages.filter(img => {
                const displayName = (img.name || img.word || '').toLowerCase();
                return displayName.includes(query);
            }) : themeImages;
        }
        
        // Render the images
        if (imagesToDisplay.length === 0) {
            dictionaryDiv.innerHTML = `<p class="dictionary-message">No images found${query ? ` matching "${query}"` : ''}.</p>`;
            return;
        }
        
        imagesToDisplay.forEach(img => {
            const item = document.createElement('div');
            item.className = 'dictionary-item';
            const displayName = img.name || img.word || 'Image';
            item.innerHTML = `
                <img src="${img.path || img.url}" alt="${displayName}" loading="lazy"/>
                <span>${displayName}</span>
            `;
            item.onclick = () => {
                // Toggle selection
                if (item.classList.contains('selected')) {
                    item.classList.remove('selected');
                    // Remove from selected images array if you have one
                } else {
                    item.classList.add('selected');
                    // Add to selected images array if you have one
                }
            };
            dictionaryDiv.appendChild(item);
        });
        
    } catch (error) {
        console.error('Error loading images:', error);
        dictionaryDiv.innerHTML = `<p class="dictionary-message">Error loading images: ${error.message}</p>`;
    }
}

// Also need to add event listeners:
/*
themeSelect.addEventListener('change', loadDictionary);
searchInput.addEventListener('input', () => {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(loadDictionary, 300);
});

// And call it after themes load:
loadThemes().then(() => {
    loadDictionary(); // Load images after themes are loaded
});
*/