'use client';

export default function DirectusGuide() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Directus Admin Panel Guide</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Access Information</h2>
        <div className="space-y-2">
          <p><strong>URL:</strong> <a href="http://localhost:8055/admin" target="_blank" className="text-blue-600 hover:underline">http://localhost:8055/admin</a></p>
          <p><strong>Email:</strong> admin@lessoncraftstudio.com</p>
          <p><strong>Password:</strong> admin123!</p>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Add Image Themes</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>Login to Directus admin panel</li>
            <li>Click on <strong>"Content"</strong> in the left sidebar</li>
            <li>Select <strong>"Image Themes"</strong></li>
            <li>Click <strong>"+ Create Item"</strong> button</li>
            <li>Fill in the required fields:
              <ul className="ml-6 mt-2 space-y-1">
                <li>• <strong>Folder Name:</strong> lowercase name (e.g., "ocean")</li>
                <li>• <strong>Name:</strong> JSON with translations for all 11 languages</li>
                <li>• <strong>Sort Order:</strong> Number for display order</li>
                <li>• <strong>Is Active:</strong> Toggle to enable/disable</li>
              </ul>
            </li>
            <li>Click <strong>"Save"</strong></li>
          </ol>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Example JSON for Name field:</p>
            <pre className="text-sm overflow-x-auto">{`{
  "en": "Ocean",
  "de": "Ozean",
  "fr": "Océan",
  "es": "Océano",
  "pt": "Oceano",
  "it": "Oceano",
  "nl": "Oceaan",
  "sv": "Hav",
  "da": "Hav",
  "no": "Hav",
  "fi": "Meri"
}`}</pre>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Add Images</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>In Directus, go to <strong>"Content" → "Worksheet Images"</strong></li>
            <li>Click <strong>"+ Create Item"</strong></li>
            <li>Fill in the fields:
              <ul className="ml-6 mt-2 space-y-1">
                <li>• <strong>Name:</strong> JSON with translations</li>
                <li>• <strong>File Name:</strong> Original filename (e.g., "dolphin.png")</li>
                <li>• <strong>Image File:</strong> Upload the actual image</li>
                <li>• <strong>Theme:</strong> Select the theme this image belongs to</li>
                <li>• <strong>Tags:</strong> Add searchable tags</li>
                <li>• <strong>Status:</strong> Active or Archived</li>
              </ul>
            </li>
            <li>Click <strong>"Save"</strong></li>
          </ol>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Example JSON for Name field:</p>
            <pre className="text-sm overflow-x-auto">{`{
  "en": "Dolphin",
  "de": "Delfin",
  "fr": "Dauphin",
  "es": "Delfín",
  "pt": "Golfinho",
  "it": "Delfino",
  "nl": "Dolfijn",
  "sv": "Delfin",
  "da": "Delfin",
  "no": "Delfin",
  "fi": "Delfiini"
}`}</pre>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Testing Your Changes</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>After adding themes and images in Directus</li>
            <li>Go to any worksheet app (e.g., <a href="http://localhost:3000/en/apps/word-search" target="_blank" className="text-blue-600 hover:underline">Word Search</a>)</li>
            <li>The new themes should appear in the theme dropdown</li>
            <li>Selecting a theme should show your uploaded images</li>
            <li>Test different languages to verify translations work</li>
          </ol>
        </section>

        <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
          <ul className="space-y-2">
            <li>• Images are automatically synced with the file system</li>
            <li>• All 11 languages must have translations for best user experience</li>
            <li>• Use Google Translate if you need help with translations</li>
            <li>• Keep folder names lowercase without spaces (use hyphens if needed)</li>
            <li>• Image files should be optimized (under 500KB for best performance)</li>
          </ul>
        </section>

        <section className="bg-green-50 border-l-4 border-green-500 p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="http://localhost:8055/admin/content/image_themes" target="_blank" 
               className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold">Manage Themes</h3>
              <p className="text-sm text-gray-600">Add or edit image themes</p>
            </a>
            <a href="http://localhost:8055/admin/content/worksheet_images" target="_blank"
               className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold">Manage Images</h3>
              <p className="text-sm text-gray-600">Upload and organize images</p>
            </a>
            <a href="http://localhost:3000/en/apps" target="_blank"
               className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold">Test Apps</h3>
              <p className="text-sm text-gray-600">See your changes in action</p>
            </a>
            <a href="http://localhost:8055/admin/settings/data-model" target="_blank"
               className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold">Data Model</h3>
              <p className="text-sm text-gray-600">View/edit collection structure</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}