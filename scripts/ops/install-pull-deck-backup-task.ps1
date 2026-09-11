# install-pull-deck-backup-task.ps1 - registers (or refreshes) the weekly Windows Task Scheduler job
# that pulls the live deck tree from Hetzner to this PC (scripts/ops/pull-deck-backup.sh).
#
# Run once from an elevated or normal PowerShell in the repo root:
#   powershell -ExecutionPolicy Bypass -File scripts\ops\install-pull-deck-backup-task.ps1
#
# Schedule: Sundays 03:00 local; wakes the PC; runs ASAP after a missed start (PC was off);
# won't start a second instance if the previous is still streaming; 4 h limit (a pull is ~70 min).
# Log: C:\Users\rkgen\lcs-backups\pull.log   Remove: schtasks /delete /tn "LCS deck backup pull" /f
#
# Windows PowerShell 5.1 compatible (no ternaries, no && chains).

$ErrorActionPreference = 'Stop'
$taskName = 'LCS deck backup pull'
$repo     = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$bash     = 'C:\Program Files\Git\bin\bash.exe'
$script   = (Join-Path $repo 'scripts\ops\pull-deck-backup.sh') -replace '\\', '/'
if (-not (Test-Path $bash)) { throw "Git Bash not found at $bash" }
if (-not (Test-Path (Join-Path $repo 'scripts\ops\pull-deck-backup.sh'))) { throw "pull-deck-backup.sh not found under $repo" }

# bash -l so ~/.ssh and PATH resolve as in an interactive Git Bash session.
$action   = New-ScheduledTaskAction -Execute $bash -Argument ('-lc "' + $script + '"')
$trigger  = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 03:00
$settings = New-ScheduledTaskSettingsSet -WakeToRun -StartWhenAvailable -MultipleInstances IgnoreNew `
            -ExecutionTimeLimit (New-TimeSpan -Hours 4) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) { Unregister-ScheduledTask -TaskName $taskName -Confirm:$false }
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal `
    -Description 'Weekly off-host backup: streams /var/www/lcs-media/decks from Hetzner to C:\Users\rkgen\lcs-backups (CLAUDE.md A.14.6).' | Out-Null

$t = Get-ScheduledTask -TaskName $taskName
Write-Host ("Registered '{0}' - state {1}; next run {2}" -f $taskName, $t.State, (Get-ScheduledTaskInfo -TaskName $taskName).NextRunTime)
Write-Host ("  action: {0} {1}" -f $t.Actions[0].Execute, $t.Actions[0].Arguments)
