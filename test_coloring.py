import requests
import json

print("Testing Coloring app...")
print("-" * 40)

# Test 1: Check themes API
print("\n1. Testing themes API:")
try:
    response = requests.get("http://localhost:3000/api/themes-translated?locale=en")
    if response.status_code == 200:
        themes = response.json()
        print(f"   ✓ Themes loaded: {len(themes)} themes")
        if themes:
            print(f"   ✓ Sample theme: {themes[0].get('displayName', 'N/A')}")
    else:
        print(f"   ✗ Failed to load themes: {response.status_code}")
except Exception as e:
    print(f"   ✗ Error: {e}")

# Test 2: Check images API with animals theme
print("\n2. Testing images API (animals theme):")
try:
    response = requests.get("http://localhost:3000/api/images?theme=animals&locale=en")
    if response.status_code == 200:
        data = response.json()
        images = data.get('images', data) if isinstance(data, dict) else data
        print(f"   ✓ Animals loaded: {len(images)} images")
        if images and len(images) > 0:
            print(f"   ✓ Sample image: {images[0].get('name', 'N/A')}")
    else:
        print(f"   ✗ Failed to load images: {response.status_code}")
except Exception as e:
    print(f"   ✗ Error: {e}")

# Test 3: Check search functionality
print("\n3. Testing search API:")
try:
    response = requests.get("http://localhost:3000/api/images?search=cat&locale=en")
    if response.status_code == 200:
        data = response.json()
        images = data.get('images', data) if isinstance(data, dict) else data
        print(f"   ✓ Search results: {len(images)} images for 'cat'")
    else:
        print(f"   ✗ Failed to search: {response.status_code}")
except Exception as e:
    print(f"   ✗ Error: {e}")

# Test 4: Check if coloring.html loads
print("\n4. Testing coloring.html page:")
try:
    response = requests.get("http://localhost:3000/worksheet-generators/coloring.html")
    if response.status_code == 200:
        content = response.text
        # Check for key elements
        has_translations = "translations.js" in content
        has_locale = "currentLocale" in content
        has_api_calls = "/api/images" in content
        has_themes = "themeSelect" in content
        
        print(f"   ✓ Page loads successfully")
        print(f"   {'✓' if has_translations else '✗'} Has translations.js")
        print(f"   {'✓' if has_locale else '✗'} Has currentLocale")
        print(f"   {'✓' if has_api_calls else '✗'} Has API calls")
        print(f"   {'✓' if has_themes else '✗'} Has theme selector")
    else:
        print(f"   ✗ Failed to load page: {response.status_code}")
except Exception as e:
    print(f"   ✗ Error: {e}")

print("\n" + "=" * 40)
print("✅ Coloring app test complete!")
