$lines = Get-Content 'C:\Users\rkgen\lessoncraftstudio\frontend\public\worksheet-generators\treasure hunt.html'

# Fix the broken enforceZOrder function at line 800
# It currently has just the opening but no body

$enforceZOrderBody = @(
'      function enforceZOrder(canvas) {',
'        if (!canvas) return;',
'        const background = canvas.getObjects().find(o => o.isBackground);',
'        if (background) canvas.sendToBack(background);',
'',
'        // Handle page borders (multiple objects with isPageBorder flag)',
'        const borders = canvas.getObjects().filter(o => o.isPageBorder);',
'        borders.forEach(border => {',
'            canvas.sendToBack(border);',
'            if (background) canvas.bringForward(border);',
'        });',
'',
'        // Legacy single border support',
'        const border = canvas.getObjects().find(o => o.isBorder);',
'        if (border) {',
'            canvas.sendToBack(border);',
'            if (background) canvas.bringForward(border);',
'        }',
'      }'
)

# Replace lines 800-801 with the complete function
$newLines = $lines[0..799] + $enforceZOrderBody + $lines[802..($lines.Length-1)]

$newLines | Set-Content 'C:\Users\rkgen\lessoncraftstudio\frontend\public\worksheet-generators\treasure hunt.html'

Write-Host "Fixed broken enforceZOrder function"
