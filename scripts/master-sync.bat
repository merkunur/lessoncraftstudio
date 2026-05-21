@echo off
REM ============================================================================
REM MASTER SYNCHRONIZATION SCRIPT
REM ============================================================================
REM Purpose: Sync REFERENCE folders (source of truth) to the dev-server mirror
REM
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
REM STEP 2: Sync REFERENCE APPS to frontend/public/worksheet-generators
REM   (the dormant legacy-apps/ and "worksheet generators/" Express
REM    deployments were removed in commit chore: remove dormant ...; only
REM    the dev-server-served frontend/public/ mirror is populated now.)
REM ============================================================================
echo [STEP 2] Syncing to frontend/public/worksheet-generators...

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
REM STEP 3: Sync REFERENCE TRANSLATIONS to frontend/public/worksheet-generators/js
REM ============================================================================
echo [STEP 3] Syncing translations to frontend/public/worksheet-generators/js...

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
REM STEP 4: Sync "mini tools/" to frontend/public/mini-tools
REM   Mirrors the worksheet-generators pattern: git-tracked source folder,
REM   gitignored local mirror in public/. *.test.js excluded from the mirror
REM   (devtools, not for serving).
REM ============================================================================
echo [STEP 4] Syncing mini tools/ to frontend/public/mini-tools...

if not exist "mini tools" (
    echo   WARNING: "mini tools" folder not found - skipping STEP 4
    goto :skip_mini_tools
)

REM Count files in source (excluding *.test.js)
set MT_COUNT=0
for %%f in ("mini tools\*.html") do set /a MT_COUNT+=1
for %%f in ("mini tools\*.css")  do set /a MT_COUNT+=1
for %%f in ("mini tools\*.js")   do (
    set "FNAME=%%~nxf"
    setlocal enabledelayedexpansion
    echo !FNAME! | findstr /E ".test.js" >nul
    if errorlevel 1 (
        endlocal
        set /a MT_COUNT+=1
    ) else (
        endlocal
    )
)

if %MT_COUNT% LSS 3 (
    echo ERROR: "mini tools" has fewer than 3 shippable files!
    echo        Expected at least lcs-shell.{css,js} + one tool.
    echo        Aborting to prevent partial sync.
    exit /b 1
)

echo   mini tools/ shippable files: %MT_COUNT%

if not exist "frontend\public\mini-tools" (
    echo   Creating directory: frontend\public\mini-tools
    mkdir "frontend\public\mini-tools"
)

REM Copy *.html, *.css, *.json unconditionally (JSON manifests for activities)
set COPIED=0
for %%f in ("mini tools\*.html") do (
    copy /Y "%%f" "frontend\public\mini-tools\" >nul 2>&1
    set /a COPIED+=1
)
for %%f in ("mini tools\*.css") do (
    copy /Y "%%f" "frontend\public\mini-tools\" >nul 2>&1
    set /a COPIED+=1
)
for %%f in ("mini tools\*.json") do (
    copy /Y "%%f" "frontend\public\mini-tools\" >nul 2>&1
    set /a COPIED+=1
)
REM Copy *.js excluding *.test.js
for %%f in ("mini tools\*.js") do (
    set "FNAME=%%~nxf"
    setlocal enabledelayedexpansion
    echo !FNAME! | findstr /E ".test.js" >nul
    if errorlevel 1 (
        endlocal
        copy /Y "%%f" "frontend\public\mini-tools\" >nul 2>&1
        set /a COPIED+=1
    ) else (
        endlocal
    )
)
echo   Copied %COPIED% files to frontend\public\mini-tools
echo.

:skip_mini_tools

REM ============================================================================
REM Summary
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
