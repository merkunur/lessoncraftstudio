        console.log('SCRIPT STARTED - find-and-count-v2.html');

        // Initialize WorksheetBase - COMMENTED OUT BECAUSE worksheet-base.js IS NOT LOADED
        // const worksheetApp = new WorksheetBase({
        //     apiVersion: 'v2',
        //     enableCaching: true,
        //     cacheTTL: 5 * 60 * 1000,
        //     enableLazyLoad: true,
        //     defaultTheme: 'animals'
        // });

        // App-specific variables
        let currentLocale = typeof getCurrentLocale !== 'undefined' ? getCurrentLocale() : 'en';
        let worksheetCanvas, answerCanvas;
        let selectedImages = [];
        let targetImages = [];
        let placedImages = [];
        let currentBorder = null;
        let currentBackground = null;

        // Initialize canvases
        function initializeCanvases() {
            worksheetCanvas = new fabric.Canvas('worksheetCanvas', {
                width: 816,
                height: 1056,
                backgroundColor: 'white'
            });

            answerCanvas = new fabric.Canvas('answerCanvas', {
                width: 816,
                height: 1056,
                backgroundColor: 'white'
            });
        }

        // Load themes into dropdown - SIMPLIFIED WITHOUT WorksheetBase
        async function loadThemes() {
            const themeSelect = document.getElementById('themeSelect');

            try {
                // Fetch themes directly from API like subtraction-v2.html does
                const response = await fetch('/api/themes');
                if (!response.ok) {
                    console.error('Failed to load themes');
                    return Promise.resolve(); // ALWAYS return a promise
                }

                const themes = await response.json();

                // Keep "All Themes" option
                themeSelect.innerHTML = '<option value="all" data-translate="all_themes">All Themes</option>';

                themes.forEach(theme => {
                    const option = document.createElement('option');
                    option.value = theme.folder_name || theme;
                    option.textContent = theme.translations?.[currentLocale] || theme.folder_name || theme;
                    themeSelect.appendChild(option);
                });

                // Load initial images
                loadImages();
                return Promise.resolve(); // ALWAYS return a promise
            } catch (error) {
                console.error('Error loading themes:', error);
                return Promise.resolve(); // ALWAYS return a promise even on error
            }
        }

        // Add border to canvas
        function addBorderToCanvas(imagePath) {
            [worksheetCanvas, answerCanvas].forEach(canvas => {
                const existing = canvas.getObjects().find(obj => obj.isBorder);
                if (existing) canvas.remove(existing);

                fabric.Image.fromURL(imagePath, function(img) {
                    img.scaleToWidth(canvas.width);
                    img.scaleToHeight(canvas.height);
                    img.set({
                        left: 0,
                        top: 0,
                        selectable: false,
                        evented: false,
                        isBorder: true
                    });
                    canvas.add(img);
                    canvas.sendToBack(img);
                    if (canvas.getObjects().find(obj => obj.isBackground)) {
                        canvas.sendToBack(canvas.getObjects().find(obj => obj.isBackground));
                    }
                    canvas.renderAll();
                });
            });
            currentBorder = imagePath;
        }

        // Add background to canvas
        function addBackgroundToCanvas(imagePath) {
            [worksheetCanvas, answerCanvas].forEach(canvas => {
                const existing = canvas.getObjects().find(obj => obj.isBackground);
                if (existing) canvas.remove(existing);

                fabric.Image.fromURL(imagePath, function(img) {
                    img.scaleToWidth(canvas.width);
                    img.scaleToHeight(canvas.height);
                    img.set({
                        left: 0,
                        top: 0,
                        opacity: 0.3,
                        selectable: false,
                        evented: false,
                        isBackground: true
                    });
                    canvas.add(img);
                    canvas.sendToBack(img);
                    canvas.renderAll();
                });
            });
            currentBackground = imagePath;
        }

        // Load images using WorksheetBase
        async function loadImages() {
            const theme = document.getElementById('themeSelect').value;
            const search = document.getElementById('searchInput').value.trim();
            const dictionary = document.getElementById('imageDictionary');

            dictionary.innerHTML = '<div class="dictionary-loading">Loading images...</div>';

            try {
                let images;

                // Fetch images directly from API like subtraction-v2.html
                let url = `/api/images?locale=${currentLocale}`;
                if (search) {
                    url += `&search=${encodeURIComponent(search)}`;
                } else if (theme === 'all') {
                    url += `&theme=animals`; // Default to animals
                } else {
                    url += `&theme=${theme}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }

                const data = await response.json();
                const images = data.images || data;

                if (!images || images.length === 0) {
                    dictionary.innerHTML = '<div class="dictionary-message">No images found</div>';
                    return;
                }

                dictionary.innerHTML = '';

                images.forEach(image => {
                    const item = document.createElement('div');
                    item.className = 'dictionary-item';
                    item.dataset.imageId = image.id;
                    item.dataset.imagePath = image.path;
                    item.dataset.imageName = image.name || image.word;

                    const img = document.createElement('img');
                    img.src = image.thumbnail || image.path;
                    img.alt = image.name || image.word;
                    img.loading = 'lazy';

                    const label = document.createElement('span');
                    label.textContent = image.name || image.word;

                    item.appendChild(img);
                    item.appendChild(label);

                    item.addEventListener('click', () => selectImage(image));

                    dictionary.appendChild(item);
                });

                // Highlight already selected items
                selectedImages.forEach(selImg => {
                    const item = document.querySelector(`[data-image-id="${selImg.id}"]`);
                    if (item) item.classList.add('selected');
                });

                // No worksheetApp.setupLazyLoading since we're not using WorksheetBase

            } catch (error) {
                console.error('Failed to load images:', error);
                dictionary.innerHTML = '<div class="dictionary-message">Failed to load images. Please try again.</div>';
            }
        }

        // Select image for worksheet
        function selectImage(image) {
            const maxImages = 10;
            const existingIndex = selectedImages.findIndex(img => img.id === image.id);

            if (existingIndex === -1) {
                if (selectedImages.length >= maxImages) {
                    showMessage(`Maximum ${maxImages} images allowed`, 'error');
                    return;
                }
                selectedImages.push(image);
                showMessage(`Selected: ${image.name}`, 'success');

                const item = document.querySelector(`[data-image-id="${image.id}"]`);
                if (item) item.classList.add('selected');
            } else {
                selectedImages.splice(existingIndex, 1);
                showMessage(`Deselected: ${image.name}`, 'info');

                const item = document.querySelector(`[data-image-id="${image.id}"]`);
                if (item) item.classList.remove('selected');
            }

            updateSelectedPreview();
        }

        // Update selected images preview
        function updateSelectedPreview() {
            const preview = document.getElementById('selectedImagesPreview');
            const count = document.getElementById('selectedCount');

            if (selectedImages.length === 0) {
                preview.innerHTML = '<span class="dictionary-message">No images selected</span>';
            } else {
                preview.innerHTML = '';
                selectedImages.forEach((img, index) => {
                    const imgEl = document.createElement('img');
                    imgEl.src = img.thumbnail || img.path;
                    imgEl.alt = img.name;
                    imgEl.title = img.name;
                    imgEl.onclick = () => {
                        selectedImages.splice(index, 1);
                        const item = document.querySelector(`[data-image-id="${img.id}"]`);
                        if (item) item.classList.remove('selected');
                        updateSelectedPreview();
                        showMessage(`Removed: ${img.name}`, 'info');
                    };
                    preview.appendChild(imgEl);
                });
            }

            count.textContent = `Selected: ${selectedImages.length}`;
        }

        // Generate worksheet
        function generateWorksheet() {
            const gridSize = parseInt(document.getElementById('gridSize').value);
            const totalImages = parseInt(document.getElementById('totalImages').value);
            const targetCount = parseInt(document.getElementById('targetCount').value);
            const showGridLines = document.getElementById('showGridLines').checked;
            const randomRotation = document.getElementById('randomRotation').checked;
            const title = document.getElementById('worksheetTitle').value;
            const instruction = document.getElementById('instructionText').value;
            const fontFamily = document.getElementById('fontFamily').value;
            const titleFontSize = parseInt(document.getElementById('titleFontSize').value);
            const imageSize = parseInt(document.getElementById('imageSize').value);

            if (selectedImages.length < targetCount) {
                showMessage(`Please select at least ${targetCount} images`, 'error');
                return;
            }

            // Clear canvases
            worksheetCanvas.clear();
            answerCanvas.clear();
            worksheetCanvas.backgroundColor = 'white';
            answerCanvas.backgroundColor = 'white';

            // Re-add border and background if they exist
            if (currentBackground) addBackgroundToCanvas(currentBackground);
            if (currentBorder) addBorderToCanvas(currentBorder);

            // Select random target images
            targetImages = [];
            const tempImages = [...selectedImages];
            for (let i = 0; i < targetCount && tempImages.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * tempImages.length);
                targetImages.push(tempImages.splice(randomIndex, 1)[0]);
            }

            // Draw title
            const titleText = new fabric.Text(title, {
                left: worksheetCanvas.width / 2,
                top: 40,
                fontSize: titleFontSize,
                fontFamily: fontFamily,
                fontWeight: 'bold',
                fill: '#333',
                originX: 'center',
                originY: 'center',
                selectable: false
            });
            worksheetCanvas.add(titleText);
            answerCanvas.add(titleText.clone());

            // Draw instruction
            const instructionTextObj = new fabric.Text(instruction, {
                left: worksheetCanvas.width / 2,
                top: 80,
                fontSize: 16,
                fontFamily: fontFamily,
                fill: '#555',
                originX: 'center',
                originY: 'center',
                selectable: false
            });
            worksheetCanvas.add(instructionTextObj);
            answerCanvas.add(instructionTextObj.clone());

            // Draw target images to find
            const targetY = 140;
            const targetSpacing = 100;
            const startX = (worksheetCanvas.width - (targetImages.length * targetSpacing)) / 2;

            targetImages.forEach((img, index) => {
                const x = startX + (index * targetSpacing) + targetSpacing / 2;

                // Draw on worksheet
                fabric.Image.fromURL(img.path, function(fabricImg) {
                    fabricImg.set({
                        left: x,
                        top: targetY,
                        width: 60,
                        height: 60,
                        originX: 'center',
                        originY: 'center',
                        selectable: false
                    });
                    worksheetCanvas.add(fabricImg);

                    // Add count box
                    const box = new fabric.Rect({
                        left: x,
                        top: targetY + 50,
                        width: 40,
                        height: 30,
                        fill: 'transparent',
                        stroke: '#999',
                        strokeWidth: 2,
                        strokeDashArray: [5, 5],
                        originX: 'center',
                        originY: 'center',
                        selectable: false
                    });
                    worksheetCanvas.add(box);
                });

                // Draw on answer key with count
                fabric.Image.fromURL(img.path, function(fabricImg) {
                    fabricImg.set({
                        left: x,
                        top: targetY,
                        width: 60,
                        height: 60,
                        originX: 'center',
                        originY: 'center',
                        selectable: false
                    });
                    answerCanvas.add(fabricImg);
                });
            });

            // Create grid for find and count area
            const gridStartY = 250;
            const gridHeight = 700;
            const cellSize = gridHeight / gridSize;
            const gridStartX = (worksheetCanvas.width - (gridSize * cellSize)) / 2;

            // Draw grid lines if enabled
            if (showGridLines) {
                for (let i = 0; i <= gridSize; i++) {
                    // Horizontal lines
                    const hLine = new fabric.Line(
                        [gridStartX, gridStartY + i * cellSize, gridStartX + gridSize * cellSize, gridStartY + i * cellSize],
                        { stroke: '#e0e0e0', strokeWidth: 1, selectable: false }
                    );
                    worksheetCanvas.add(hLine);
                    answerCanvas.add(hLine.clone());

                    // Vertical lines
                    const vLine = new fabric.Line(
                        [gridStartX + i * cellSize, gridStartY, gridStartX + i * cellSize, gridStartY + gridHeight],
                        { stroke: '#e0e0e0', strokeWidth: 1, selectable: false }
                    );
                    worksheetCanvas.add(vLine);
                    answerCanvas.add(vLine.clone());
                }
            }

            // Place images randomly in grid
            placedImages = [];
            const positions = [];
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    positions.push({ row, col });
                }
            }

            // Shuffle positions
            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }

            // Track counts for answer key
            const imageCounts = {};
            targetImages.forEach(img => {
                imageCounts[img.id] = 0;
            });

            // Place images
            for (let i = 0; i < Math.min(totalImages, positions.length); i++) {
                const pos = positions[i];
                const x = gridStartX + pos.col * cellSize + cellSize / 2;
                const y = gridStartY + pos.row * cellSize + cellSize / 2;

                // Choose random image (favoring target images)
                let chosenImage;
                if (Math.random() < 0.6 && targetImages.length > 0) {
                    // 60% chance to place a target image
                    chosenImage = targetImages[Math.floor(Math.random() * targetImages.length)];
                    if (imageCounts[chosenImage.id] !== undefined) {
                        imageCounts[chosenImage.id]++;
                    }
                } else {
                    // Place a random image from selected pool
                    chosenImage = selectedImages[Math.floor(Math.random() * selectedImages.length)];
                }

                const rotation = randomRotation ? (Math.random() - 0.5) * 60 : 0;

                // Place on worksheet
                fabric.Image.fromURL(chosenImage.path, function(fabricImg) {
                    fabricImg.set({
                        left: x,
                        top: y,
                        width: imageSize,
                        height: imageSize,
                        angle: rotation,
                        originX: 'center',
                        originY: 'center',
                        selectable: false
                    });
                    worksheetCanvas.add(fabricImg);
                });

                // Place on answer key (with highlight for target images)
                fabric.Image.fromURL(chosenImage.path, function(fabricImg) {
                    // Add highlight circle for target images
                    if (imageCounts[chosenImage.id] !== undefined) {
                        const circle = new fabric.Circle({
                            left: x,
                            top: y,
                            radius: imageSize / 2 + 5,
                            fill: 'transparent',
                            stroke: '#00cc00',
                            strokeWidth: 3,
                            originX: 'center',
                            originY: 'center',
                            selectable: false
                        });
                        answerCanvas.add(circle);
                    }

                    fabricImg.set({
                        left: x,
                        top: y,
                        width: imageSize,
                        height: imageSize,
                        angle: rotation,
                        originX: 'center',
                        originY: 'center',
                        selectable: false
                    });
                    answerCanvas.add(fabricImg);
                });
            }

            // Add counts to answer key
            targetImages.forEach((img, index) => {
                const x = startX + (index * targetSpacing) + targetSpacing / 2;
                const count = imageCounts[img.id] || 0;

                const countText = new fabric.Text(count.toString(), {
                    left: x,
                    top: targetY + 50,
                    fontSize: 20,
                    fontFamily: fontFamily,
                    fontWeight: 'bold',
                    fill: '#00cc00',
                    originX: 'center',
                    originY: 'center',
                    selectable: false
                });
                answerCanvas.add(countText);
            });

            // Show answer key
            document.querySelector('.canvas-container:nth-child(2)').style.display = 'block';

            showMessage('Worksheet generated!', 'success');
        }

        // Clear worksheet
        function clearWorksheet() {
            worksheetCanvas.clear();
            answerCanvas.clear();
            worksheetCanvas.backgroundColor = 'white';
            answerCanvas.backgroundColor = 'white';
            selectedImages = [];
            targetImages = [];
            placedImages = [];
            currentBorder = null;
            currentBackground = null;

            document.querySelectorAll('.dictionary-item').forEach(item => {
                item.classList.remove('selected');
            });

            document.querySelectorAll('.border-thumbnail-item').forEach(item => {
                item.classList.remove('selected');
            });

            updateSelectedPreview();

            document.querySelector('.canvas-container:nth-child(2)').style.display = 'none';

            showMessage('Worksheet cleared', 'info');
        }

        // Download as PDF
        function downloadPDF() {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'pt', 'letter');

            const worksheetData = worksheetCanvas.toDataURL('image/png');
            pdf.addImage(worksheetData, 'PNG', 0, 0, 612, 792);

            if (document.querySelector('.canvas-container:nth-child(2)').style.display !== 'none') {
                pdf.addPage();
                const answerData = answerCanvas.toDataURL('image/png');
                pdf.addImage(answerData, 'PNG', 0, 0, 612, 792);
            }

            pdf.save('find_and_count_worksheet.pdf');
            showMessage('PDF downloaded!', 'success');
        }

        // Print worksheet
        function printWorksheet() {
            const printWindow = window.open('', '_blank');
            const worksheetData = worksheetCanvas.toDataURL('image/png');
            const answerData = answerCanvas.toDataURL('image/png');

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Find and Count Worksheet</title>
                        <style>
                            @media print {
                                .page-break { page-break-after: always; }
                            }
                            img { max-width: 100%; height: auto; }
                        </style>
                    </head>
                    <body>
                        <img src="${worksheetData}" />
                        ${document.querySelector('.canvas-container:nth-child(2)').style.display !== 'none' ?
                            `<div class="page-break"></div><img src="${answerData}" />` : ''}
                    </body>
                </html>
            `);

            printWindow.document.close();
            printWindow.onload = function() {
                printWindow.print();
                printWindow.close();
            };
        }

        // Show message toast
        function showMessage(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `message-toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        // Initialize accordion
        function initializeAccordion() {
            document.querySelectorAll('.accordion-button').forEach(button => {
                button.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    content.classList.toggle('active');
                });
            });
        }

        // Debounce helper
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Border and background loading functions - MUST be defined before init()
        async function populateBorderThemes() {
            console.log('populateBorderThemes called');
            const borderThemeSelect = document.getElementById('borderThemeSelect');
            console.log('borderThemeSelect element:', borderThemeSelect);
            console.log('borderThemeSelect exists:', !!borderThemeSelect);

            try {
                borderThemeSelect.innerHTML = '<option value="none">None</option>';
                const response = await fetch('/api/borders/themes');
                if (!response.ok) {
                    console.error('Failed to load border themes');
                    return;
                }

                const themes = await response.json();
                console.log('Border themes received:', themes);

                themes.forEach(theme => {
                    const themeValue = typeof theme === 'object' ? theme.value : theme;
                    const displayName = typeof theme === 'object'
                        ? theme.displayName
                        : theme.charAt(0).toUpperCase() + theme.slice(1);
                    borderThemeSelect.innerHTML += `<option value="${themeValue}">${displayName}</option>`;
                });

                console.log('Border themes loaded, select has', borderThemeSelect.options.length, 'options');
            } catch (error) {
                console.error('Error loading border themes:', error);
            }
        }

        async function populateBackgroundThemes() {
            console.log('populateBackgroundThemes called');
            const backgroundThemeSelect = document.getElementById('backgroundThemeSelect');

            try {
                backgroundThemeSelect.innerHTML = '<option value="none">None</option>';
                const response = await fetch('/api/backgrounds/themes');
                if (!response.ok) {
                    console.error('Failed to load background themes');
                    return;
                }

                const themes = await response.json();
                console.log('Background themes received:', themes);

                themes.forEach(theme => {
                    const themeValue = typeof theme === 'object' ? theme.value : theme;
                    const displayName = typeof theme === 'object'
                        ? theme.displayName
                        : theme.charAt(0).toUpperCase() + theme.slice(1);
                    backgroundThemeSelect.innerHTML += `<option value="${themeValue}">${displayName}</option>`;
                });

                console.log('Background themes loaded, select has', backgroundThemeSelect.options.length, 'options');
            } catch (error) {
                console.error('Error loading background themes:', error);
            }
        }

        // Initialize app
        async function init() {
            console.log('init() function called');
            initializeCanvases();
            initializeAccordion();

            // Load themes sequentially to ensure proper initialization
            console.log('Loading main themes...');
            try {
                await loadThemes();
            } catch (error) {
                console.error('Error loading main themes:', error);
            }

            // Load border and background themes IMMEDIATELY
            console.log('Loading border/background themes immediately...');
            console.log('typeof populateBorderThemes:', typeof populateBorderThemes);
            console.log('typeof populateBackgroundThemes:', typeof populateBackgroundThemes);

            try {
                console.log('About to call populateBorderThemes...');
                await populateBorderThemes();
                console.log('populateBorderThemes completed');

                console.log('About to call populateBackgroundThemes...');
                await populateBackgroundThemes();
                console.log('populateBackgroundThemes completed');

                console.log('Border/background themes loaded successfully');
            } catch (error) {
                console.error('Error loading border/background themes:', error);
            }

            // Set up event listeners
            document.getElementById('themeSelect').addEventListener('change', loadImages);
            document.getElementById('searchInput').addEventListener('input', debounce(loadImages, 300));
            document.getElementById('borderThemeSelect').addEventListener('change', loadBorderImages);
            document.getElementById('backgroundThemeSelect').addEventListener('change', loadBackgroundImages);
            document.getElementById('generateBtn').addEventListener('click', generateWorksheet);
            document.getElementById('clearBtn').addEventListener('click', clearWorksheet);
            document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
            document.getElementById('printBtn').addEventListener('click', printWorksheet);

            // Apply translations if available
            if (typeof applyTranslations === 'function') {
                applyTranslations();
            }
        }

        // Start app when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOMContentLoaded fired - calling init()');

            // Just call init() which does everything!
            init();
        });
    </script>
