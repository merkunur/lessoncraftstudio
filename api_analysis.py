#!/usr/bin/env python3

import os
import re
import glob

def analyze_app_api_integration():
    """Analyze all worksheet generator apps for API integration patterns."""

    worksheet_dir = r"C:\Users\rkgen\lessoncraftstudio\frontend\public\worksheet-generators"
    html_files = glob.glob(os.path.join(worksheet_dir, "*.html"))

    # Exclude debug file
    html_files = [f for f in html_files if not f.endswith("debug-images.html")]

    results = {
        "fully_compliant": [],
        "missing_extraction": [],
        "wrong_backgrounds": [],
        "wrong_borders": [],
        "missing_animals_default": [],
        "no_api_integration": []
    }

    for html_file in html_files:
        app_name = os.path.basename(html_file)
        print(f"\n=== Analyzing {app_name} ===")

        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for API integration at all
        has_api_images = '/api/images' in content
        has_fetch_api = 'fetchFromApi' in content or 'fetch(' in content

        if not has_api_images and not has_fetch_api:
            results["no_api_integration"].append(app_name)
            print(f"  ERROR: No API integration found")
            continue

        # Check for proper data extraction
        has_extraction = bool(re.search(r'\.images\s*\|\|\s*\w+', content))
        if not has_extraction:
            results["missing_extraction"].append(app_name)
            print(f"  WARNING: Missing data.images || data extraction pattern")
        else:
            print(f"  OK: Has proper API response extraction")

        # Check background API endpoint
        wrong_bg = bool(re.search(r'/api/backgrounds/images\?theme=', content))
        if wrong_bg:
            results["wrong_backgrounds"].append(app_name)
            print(f"  ERROR: Using wrong background endpoint: /api/backgrounds/images?theme=")
        else:
            correct_bg = bool(re.search(r'/api/backgrounds\?locale=', content))
            if '/api/backgrounds' in content and not correct_bg:
                results["wrong_backgrounds"].append(app_name)
                print(f"  WARNING: Has backgrounds but wrong endpoint format")
            elif correct_bg:
                print(f"  OK: Correct background endpoint")

        # Check border API endpoint
        wrong_border = bool(re.search(r'/api/borders/images\?theme=', content))
        if wrong_border:
            results["wrong_borders"].append(app_name)
            print(f"  ERROR: Using wrong border endpoint: /api/borders/images?theme=")
        else:
            correct_border = bool(re.search(r'/api/borders\?locale=', content))
            if '/api/borders' in content and not correct_border:
                results["wrong_borders"].append(app_name)
                print(f"  WARNING: Has borders but wrong endpoint format")
            elif correct_border:
                print(f"  OK: Correct border endpoint")

        # Check for animals default loading
        has_animals_default = bool(re.search(r'theme=animals.*locale=', content))
        has_all_themes_check = "selectedTheme === 'all'" in content
        if has_all_themes_check and not has_animals_default:
            results["missing_animals_default"].append(app_name)
            print(f"  WARNING: May not load animals as default for 'All Themes'")
        elif has_animals_default:
            print(f"  OK: Loads animals as default theme")

        # Determine overall status
        issues = []
        if app_name in results["missing_extraction"]:
            issues.append("extraction")
        if app_name in results["wrong_backgrounds"]:
            issues.append("backgrounds")
        if app_name in results["wrong_borders"]:
            issues.append("borders")
        if app_name in results["missing_animals_default"]:
            issues.append("animals_default")

        if not issues:
            results["fully_compliant"].append(app_name)
            print(f"  SUCCESS: FULLY COMPLIANT")

    # Print summary report
    print("\n" + "="*60)
    print("COMPREHENSIVE API INTEGRATION ANALYSIS REPORT")
    print("="*60)

    print(f"\nSUCCESS - FULLY COMPLIANT APPS ({len(results['fully_compliant'])})")
    for app in sorted(results['fully_compliant']):
        print(f"  * {app}")

    print(f"\nWARNING - APPS MISSING DATA EXTRACTION PATTERN ({len(results['missing_extraction'])})")
    for app in sorted(results['missing_extraction']):
        print(f"  * {app} - needs data.images || data pattern")

    print(f"\nERROR - APPS WITH WRONG BACKGROUND ENDPOINTS ({len(results['wrong_backgrounds'])})")
    for app in sorted(results['wrong_backgrounds']):
        print(f"  * {app} - needs /api/backgrounds?locale= instead of /api/backgrounds/images?theme=")

    print(f"\nERROR - APPS WITH WRONG BORDER ENDPOINTS ({len(results['wrong_borders'])})")
    for app in sorted(results['wrong_borders']):
        print(f"  * {app} - needs /api/borders?locale= instead of /api/borders/images?theme=")

    print(f"\nWARNING - APPS MISSING ANIMALS DEFAULT ({len(results['missing_animals_default'])})")
    for app in sorted(results['missing_animals_default']):
        print(f"  * {app} - may not default to animals theme when 'All Themes' selected")

    print(f"\nERROR - APPS WITH NO API INTEGRATION ({len(results['no_api_integration'])})")
    for app in sorted(results['no_api_integration']):
        print(f"  * {app} - needs complete API integration")

    # Priority recommendations
    print(f"\nPRIORITY FIXES NEEDED:")
    print(f"  1. HIGH: Fix {len(results['wrong_backgrounds']) + len(results['wrong_borders'])} apps with wrong endpoints")
    print(f"  2. MEDIUM: Fix {len(results['missing_extraction'])} apps missing data extraction")
    print(f"  3. LOW: Check {len(results['missing_animals_default'])} apps for animals default")

    total_apps = len(html_files)
    working_apps = len(results['fully_compliant'])
    print(f"\nOVERALL STATUS: {working_apps}/{total_apps} apps fully compliant ({working_apps/total_apps*100:.1f}%)")

if __name__ == "__main__":
    analyze_app_api_integration()