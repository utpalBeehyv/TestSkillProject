# Installs the frontend pack's workflow skills and agents for the current user.
# Re-run after moving or updating the pack. A changed file is backed up to <file>.bak first.
$ErrorActionPreference = 'Stop'

$packRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path -replace '\\', '/'
$claudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME '.claude' }
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

function Install-PackFile([string] $src, [string] $dest) {
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
  $text = [IO.File]::ReadAllText($src).Replace('{{PACK_ROOT}}', $packRoot)
  if ((Test-Path $dest) -and ([IO.File]::ReadAllText($dest) -ne $text)) {
    Copy-Item $dest "$dest.bak" -Force
    Write-Host "backed up $dest"
  }
  [IO.File]::WriteAllText($dest, $text, $utf8NoBom)
  Write-Host "installed $dest"
}

Get-ChildItem (Join-Path $packRoot 'install/skills') -Directory | ForEach-Object {
  Install-PackFile (Join-Path $_.FullName 'SKILL.md') (Join-Path $claudeDir "skills/$($_.Name)/SKILL.md")
}

Get-ChildItem (Join-Path $packRoot 'agents') -Filter *.md | ForEach-Object {
  Install-PackFile $_.FullName (Join-Path $claudeDir "agents/$($_.Name)")
}

Write-Host "Pack root: $packRoot"
