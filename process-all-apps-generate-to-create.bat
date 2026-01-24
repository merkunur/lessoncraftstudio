@echo off
REM Process all 21 apps: Generate -> Create
REM Following DEPLOYMENT.md 6-step workflow

setlocal enabledelayedexpansion

set "REFDIR=C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS"
set "WORKDIR=C:\Users\rkgen\lessoncraftstudio"

REM List of apps to process
set apps[0]=alphabet train.html
set apps[1]=word scramble.html
set apps[2]=find and count.html
set apps[3]=sudoku.html
set apps[4]=big small.html
set apps[5]=chart count.html
set apps[6]=code addition.html
set apps[7]=draw and color.html
set apps[8]=find objects.html
set apps[9]=grid match.html
set apps[10]=cryptogram.html
set apps[11]=math puzzle.html
set apps[12]=missing pieces.html
set apps[13]=more less.html
set apps[14]=odd one out.html
set apps[15]=pattern train.html
set apps[16]=pattern worksheet.html
set apps[17]=picture path.html
set apps[18]=picture sort.html
set apps[19]=shadow match.html
set apps[20]=treasure hunt.html

echo ========================================
echo Processing 21 apps: Generate -^> Create
echo ========================================
echo.

set count=0
for /L %%i in (0,1,20) do (
    set "app=!apps[%%i]!"

    echo [%%i/20] Processing: !app!

    REM Step 1: Copy from REFERENCE APPS
    copy "%REFDIR%\!app!" "%WORKDIR%\!app:.html=-MODIFIED.html!" >nul

    REM Step 2: Apply fix
    python "%WORKDIR%\fix-html-generate-final.py" "%WORKDIR%\!app:.html=-MODIFIED.html!" "%WORKDIR%\!app:.html=-MODIFIED.html!"

    if !ERRORLEVEL! EQU 0 (
        echo    [OK] Fixed: !app!
        set /a count+=1
    ) else (
        echo    [ERROR] Failed to fix: !app!
    )

    echo.
)

echo ========================================
echo COMPLETED: %count%/21 apps processed
echo ========================================
echo.
echo Next steps:
echo 1. Review -MODIFIED.html files
echo 2. Upload to production server
echo 3. Copy to standalone and restart PM2
echo 4. Update REFERENCE APPS folder (Step 5 - MANDATORY)
echo.
