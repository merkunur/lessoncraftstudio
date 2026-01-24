@echo off
REM ============================================================================
REM MASTER SYNCHRONIZATION SCRIPT
REM ============================================================================
REM Purpose: Sync REFERENCE folders (source of truth) to ALL local copies
REM
REM REFERENCE APPS           -> legacy-apps/public
REM REFERENCE APPS           -> worksheet generators/apps
REM REFERENCE APPS           -> frontend/public/worksheet-generators
REM REFERENCE TRANSLATIONS   -> frontend/public/worksheet-generators/js
REM
REM Run this script after ANY modification to REFERENCE files
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo   MASTER SYNC: REFERENCE folders to ALL local copies
echo ============================================================
echo.

REM Change to project root directory
cd /d "%~dp0\.."

REM ============================================================================
REM STEP 1: Verify REFERENCE folders exist and have files
REM ============================================================================
echo [STEP 1] Verifying REFERENCE folders...
echo.

if not exist "REFERENCE APPS" (
    echo ERROR: REFERENCE APPS folder not found!
    echo        This folder must exist and contain production files.
    exit /b 1
)

if not exist "REFERENCE TRANSLATIONS" (
    echo ERROR: REFERENCE TRANSLATIONS folder not found!
    echo        This folder must exist and contain translation files.
    exit /b 1
)

REM Count files
set APPS_COUNT=0
for %%f in ("REFERENCE APPS\*.html") do set /a APPS_COUNT+=1

set TRANS_COUNT=0
for %%f in ("REFERENCE TRANSLATIONS\*.js") do set /a TRANS_COUNT+=1

echo   REFERENCE APPS:         %APPS_COUNT% HTML files
echo   REFERENCE TRANSLATIONS: %TRANS_COUNT% JS files
echo.

if %APPS_COUNT% LSS 30 (
    echo ERROR: REFERENCE APPS has fewer than 30 files!
    echo        Expected 33 worksheet generators.
    echo        Aborting to prevent data loss.
    exit /b 1
)

if %TRANS_COUNT% LSS 30 (
    echo ERROR: REFERENCE TRANSLATIONS has fewer than 30 files!
    echo        Expected 38 translation files.
    echo        Aborting to prevent data loss.
    exit /b 1
)

echo   Verification PASSED
echo.

REM ============================================================================
REM STEP 2: Sync REFERENCE APPS to legacy-apps/public
REM ============================================================================
echo [STEP 2] Syncing to legacy-apps/public...

if not exist "legacy-apps\public" (
    echo   Creating directory: legacy-apps\public
    mkdir "legacy-apps\public"
)

set COPIED=0
for %%f in ("REFERENCE APPS\*.html") do (
    copy /Y "%%f" "legacy-apps\public\" >nul 2>&1
    set /a COPIED+=1
)
echo   Copied %COPIED% files to legacy-apps\public
echo.

REM ============================================================================
REM STEP 3: Sync REFERENCE APPS to worksheet generators/apps
REM ============================================================================
echo [STEP 3] Syncing to worksheet generators/apps...

if not exist "worksheet generators\apps" (
    echo   Creating directory: worksheet generators\apps
    mkdir "worksheet generators\apps"
)

set COPIED=0
for %%f in ("REFERENCE APPS\*.html") do (
    copy /Y "%%f" "worksheet generators\apps\" >nul 2>&1
    set /a COPIED+=1
)
echo   Copied %COPIED% files to worksheet generators\apps
echo.

REM ============================================================================
REM STEP 4: Sync REFERENCE APPS to frontend/public/worksheet-generators
REM ============================================================================
echo [STEP 4] Syncing to frontend/public/worksheet-generators...

if not exist "frontend\public\worksheet-generators" (
    echo   Creating directory: frontend\public\worksheet-generators
    mkdir "frontend\public\worksheet-generators"
)

set COPIED=0
for %%f in ("REFERENCE APPS\*.html") do (
    copy /Y "%%f" "frontend\public\worksheet-generators\" >nul 2>&1
    set /a COPIED+=1
)
echo   Copied %COPIED% files to frontend\public\worksheet-generators
echo.

REM ============================================================================
REM STEP 5: Sync REFERENCE TRANSLATIONS to frontend/public/worksheet-generators/js
REM ============================================================================
echo [STEP 5] Syncing translations to frontend/public/worksheet-generators/js...

if not exist "frontend\public\worksheet-generators\js" (
    echo   Creating directory: frontend\public\worksheet-generators\js
    mkdir "frontend\public\worksheet-generators\js"
)

set COPIED=0
for %%f in ("REFERENCE TRANSLATIONS\*.js") do (
    copy /Y "%%f" "frontend\public\worksheet-generators\js\" >nul 2>&1
    set /a COPIED+=1
)
echo   Copied %COPIED% translation files
echo.

REM ============================================================================
REM STEP 6: Summary
REM ============================================================================
echo ============================================================
echo   SYNC COMPLETE
echo ============================================================
echo.
echo   All local copies are now synchronized with REFERENCE folders.
echo.
echo   To deploy to production server, run:
echo     scripts\deploy-to-production.bat
echo.
echo   Or manually upload specific files using pscp.
echo.

endlocal
exit /b 0
