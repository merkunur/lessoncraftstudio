'use client';

import { useState, useEffect } from 'react';
import DirectusGuide from './directus-guide';

export default function ImageLibraryAdmin() {
  const [showGuide, setShowGuide] = useState(true);
  
  if (showGuide) {
    return (
      <div>
        <DirectusGuide />
        <div className="text-center mt-8">
          <button
            onClick={() => setShowGuide(false)}
            className="text-blue-600 hover:underline"
          >
            Show Legacy Admin Interface
          </button>
        </div>
      </div>
    );
  }
  
  const [themes, setThemes] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('');
  
  // Theme form
  const [themeName, setThemeName] = useState('');
  const [folderName, setFolderName] = useState('');
  
  // Image form
  const [imageName, setImageName] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    const response = await fetch('/api/themes');
    const data = await response.json();
    setThemes(data);
  };

  const fetchImages = async (theme) => {
    const response = await fetch(`/api/images?theme=${theme}`);
    const data = await response.json();
    setImages(data);
  };

  const addTheme = async () => {
    const response = await fetch('/api/themes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: themeName,
        folderName: folderName,
        translations: {
          en: themeName,
          de: themeName, // Add German translation
          fr: themeName, // Add French translation
          // Add more translations as needed
        }
      })
    });
    
    if (response.ok) {
      fetchThemes();
      setThemeName('');
      setFolderName('');
    }
  };

  const addImage = async () => {
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: imageName,
        fileName: fileName,
        theme: selectedTheme,
        imageUrl: `/images/${selectedTheme}/${fileName}`,
        translations: {
          en: imageName,
          de: imageName, // Add German translation
          fr: imageName, // Add French translation
          // Add more translations as needed
        }
      })
    });
    
    if (response.ok) {
      fetchImages(selectedTheme);
      setImageName('');
      setFileName('');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Image Library Management</h1>
      
      {/* Add Theme Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Theme</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Theme Name (e.g., Animals)"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Folder Name (e.g., animals)"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={addTheme}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Theme
        </button>
      </div>

      {/* Themes List */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Existing Themes</h2>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => {
                setSelectedTheme(theme.folderName);
                fetchImages(theme.folderName);
              }}
              className="border p-4 rounded cursor-pointer hover:bg-gray-50"
            >
              <p className="font-semibold">{theme.name}</p>
              <p className="text-sm text-gray-600">{theme.folderName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Image Section */}
      {selectedTheme && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Add Image to {selectedTheme}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image Name (e.g., Cat)"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="File Name (e.g., cat.png)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={addImage}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Image
          </button>
        </div>
      )}

      {/* Images List */}
      {selectedTheme && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Images in {selectedTheme}
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border p-2 rounded">
                <img
                  src={image.imageUrl}
                  alt={image.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <p className="text-sm font-semibold">{image.name}</p>
                <p className="text-xs text-gray-600">{image.fileName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}