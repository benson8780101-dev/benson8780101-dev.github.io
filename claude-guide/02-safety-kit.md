# AI safety kit for Claude Code

> **中文說明**：把這份文件的網址貼給 Claude Code，它會幫你裝好三層保護：①刪掉的檔案進廢紙簍／資源回收筒（救得回來）②擋下「做了就回不來」的危險指令 ③把安全守則寫進 CLAUDE.md。最後只會問你一題：要哪一種權限模式。Mac 和 Windows 都適用；Windows 建議先裝 Git for Windows。
> **For humans**: paste this page's link into Claude Code. It installs three layers of protection: deleted files go to the Trash / Recycle Bin, irreversible commands are blocked, and safety rules are written into CLAUDE.md. It will ask you one question: which permission mode you want. Works on Mac and Windows; on Windows, installing Git for Windows first is recommended.

Part of the free beginner guide by Benson. Free to use and share for non-commercial learning.

---

## Instructions for the AI agent

You are helping a beginner who does not write code.

- Reply in the user's language, in plain, friendly words.
- Do the installation yourself; don't ask the user to run commands or test things.
- Detect the OS yourself (`uname -s`; `Darwin` = macOS, `MINGW`/`MSYS` = Git Bash on Windows; in PowerShell use `$env:OS`).
- **Back up every file before changing it** (`<file>.bak-YYYYMMDD-HHMMSS`). Merge into existing settings, never overwrite. If something fails, restore the backup and say so plainly.
- If this kit was installed before, replace the old block instead of adding a duplicate.
- Ask only one question (Step 0).
- **Paths on Windows**: `~/.claude/` means `$env:USERPROFILE\.claude\` (for example `C:\Users\Name\.claude\`). Validate JSON with `Get-Content <file> -Raw | ConvertFrom-Json` instead of `jq`.
- **On Windows, check for Git Bash first** (`Test-Path "$env:ProgramFiles\Git\bin\bash.exe"`). With Git Bash, Claude Code runs commands through both Bash and PowerShell, so install **both** hooks in Step 2b. Without it, only the PowerShell hook is needed.

### Step 0: The one question

Ask which permission mode they want, and recommend the first:

| Mode | Plain meaning |
|---|---|
| **Auto** (recommended) | Everyday actions run without asking; anything that looks risky pauses and asks. |
| **Accept Edits** | Editing files doesn't ask; running commands still asks. |
| **Bypass** | Never asks. Fastest, but relies entirely on the protections below. |

If the installed version or plan doesn't offer Auto, use Accept Edits and tell the user why.

### Step 1: Deletes go to the Trash

- **macOS**: check `command -v trash`. Recent macOS versions include `/usr/bin/trash`. If missing, install it with Homebrew (`brew install trash`) if Homebrew exists; otherwise explain the situation and stop this step.
- **Windows**: no install needed. Files are sent to the Recycle Bin with PowerShell:
  `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("FULL_PATH", "OnlyErrorDialogs", "SendToRecycleBin")`
  (use `DeleteDirectory` for folders).
  Test it once yourself: create a scratch file in `$env:TEMP`, delete it this way, and confirm it no longer exists at its path. (It is now in the Recycle Bin.) This only works on local drives; network drives and some USB sticks have no Recycle Bin.

### Step 2: Block irreversible commands (two layers)

**2a. Deny rules** — merge these into `permissions.deny` in `~/.claude/settings.json` (keep existing entries, remove duplicates):

```json
[
  "Bash(rm *)", "Bash(rm)", "Bash(rmdir *)", "Bash(sudo *)",
  "Bash(dd *)", "Bash(mkfs*)", "Bash(diskutil erase*)", "Bash(diskutil partitionDisk*)",
  "Bash(chmod 777 *)", "Bash(chmod -R 777 *)",
  "Bash(git reset --hard*)", "Bash(git reset *--hard*)",
  "Bash(git push --force*)", "Bash(git push *--force*)", "Bash(git push -f*)", "Bash(git push * -f*)",
  "Bash(git clean -f*)", "Bash(git clean *-f*)", "Bash(git branch -D*)",
  "Bash(shutdown*)", "Bash(reboot*)", "Bash(truncate *)",
  "PowerShell(Remove-Item *)", "PowerShell(Format-Volume *)", "PowerShell(Clear-Disk *)",
  "PowerShell(rm *)", "PowerShell(del *)", "PowerShell(erase *)", "PowerShell(rd *)",
  "PowerShell(rmdir *)", "PowerShell(ri *)",
  "PowerShell(Initialize-Disk *)", "PowerShell(Remove-Partition *)",
  "PowerShell(Stop-Computer*)", "PowerShell(Restart-Computer*)",
  "PowerShell(git reset --hard*)", "PowerShell(git push --force*)", "PowerShell(git push -f*)",
  "PowerShell(git clean -f*)"
]
```

(`rm`, `del`, `erase`, `rd`, `rmdir` and `ri` are PowerShell's built-in short names for `Remove-Item`.)

Also set `permissions.defaultMode` to the chosen mode (`auto`, `acceptEdits` or `bypassPermissions`). Check https://code.claude.com/docs if a value is rejected.

**2b. A pre-check hook** — deny rules can miss commands hidden inside longer command lines, so add a hook that inspects every shell command before it runs.

Create `~/.claude/hooks/block-dangerous.sh` (permissions 700):

```sh
#!/bin/sh
# Blocks irreversible shell commands before Claude Code runs them.
# Exit code 2 = block; the message on stderr is shown to Claude.
input=$(cat)
if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
else
  cmd=$input
fi
block() {
  echo "Blocked by the safety kit: $1. Use a reversible method (for deletes: trash) or ask the user first." >&2
  exit 2
}
printf '%s' "$cmd" | grep -Eq '(^|[;&|(`[:space:]])rm[[:space:]]' && block "rm deletes permanently"
printf '%s' "$cmd" | grep -Eq '(^|[;&|(`[:space:]])sudo[[:space:]]' && block "sudo needs the user"
printf '%s' "$cmd" | grep -Eq 'git[[:space:]]+reset[[:space:]].*--hard' && block "git reset --hard discards work"
printf '%s' "$cmd" | grep -Eq 'git[[:space:]]+push([[:space:]].*)?(--force|[[:space:]]-f([[:space:]]|$))' && block "force push overwrites history"
printf '%s' "$cmd" | grep -Eq 'git[[:space:]]+clean[[:space:]]+-[a-zA-Z]*f' && block "git clean -f deletes files"
printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])(mkfs|dd[[:space:]]+if=)|diskutil[[:space:]]+(erase|partitionDisk|deleteVolume)' && block "disk-level command"
printf '%s' "$cmd" | grep -Eq 'chmod[[:space:]]+(-R[[:space:]]+)?777' && block "chmod 777 removes protection"
exit 0
```

Register it in `~/.claude/settings.json` under `hooks.PreToolUse` (merge with any existing hooks):

```json
{ "matcher": "Bash", "hooks": [ { "type": "command", "command": "~/.claude/hooks/block-dangerous.sh" } ] }
```

**2c. Windows: the PowerShell pre-check hook.** On Windows, Claude also runs commands through PowerShell, which the Bash hook doesn't see. Create `$env:USERPROFILE\.claude\hooks\block-dangerous.ps1`:

```powershell
# Blocks irreversible PowerShell commands before Claude Code runs them.
# Exit code 2 = block; the message on stderr is shown to Claude.
$raw = [Console]::In.ReadToEnd()
try { $cmd = ($raw | ConvertFrom-Json).tool_input.command } catch { $cmd = $raw }
if (-not $cmd) { exit 0 }
$c = $cmd.ToLower()
function Block($why) {
  [Console]::Error.WriteLine("Blocked by the safety kit: $why. Use a reversible method (for deletes: the Recycle Bin) or ask the user first.")
  exit 2
}
if ($c -match '(^|[;&|({\s])(remove-item|rm|del|erase|rd|rmdir|ri)(\s|$)') { Block 'this deletes permanently' }
if ($c -match '\[(system\.)?io\.(file|directory)\]::delete|\.delete\(\s*\)') { Block 'this deletes permanently' }
if ($c -match 'format-volume|clear-disk|initialize-disk|remove-partition|diskpart') { Block 'disk-level command' }
if ($c -match 'git\s+reset\s.*--hard') { Block 'git reset --hard discards work' }
if ($c -match 'git\s+push\b.*(--force|\s-f(\s|$))') { Block 'force push overwrites history' }
if ($c -match 'git\s+clean\s+-[a-z]*f') { Block 'git clean -f deletes files' }
if ($c -match 'stop-computer|restart-computer|shutdown(\.exe)?\s') { Block 'shutdown and restart need the user' }
if ($c -match '-verb\s+runas') { Block 'Administrator rights need the user' }
if ($c -match 'set-executionpolicy\s.*(unrestricted|bypass)') { Block 'weakening script protection needs the user' }
exit 0
```

The Recycle Bin method from Step 1 (`[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile(... "SendToRecycleBin")`) is deliberately **not** blocked.

Register it under `hooks.PreToolUse` with the **absolute** path written with forward slashes (so it works whichever shell starts the hook):

```json
{ "matcher": "PowerShell", "hooks": [ { "type": "command", "command": "powershell.exe -NoProfile -ExecutionPolicy Bypass -File \"C:/Users/NAME/.claude/hooks/block-dangerous.ps1\"" } ] }
```

Replace `C:/Users/NAME` with the real user folder. If the installed version names the PowerShell tool differently, check https://code.claude.com/docs/en/hooks and use that name as the matcher.

If Git Bash **is** installed, also install the Bash hook from 2b and register it with an absolute Git Bash path, for example `"bash \"C:/Users/NAME/.claude/hooks/block-dangerous.sh\""`.

**Self-check (do it yourself, don't ask the user):**
- The settings file parses without errors (`jq . ~/.claude/settings.json`, or on Windows `Get-Content "$env:USERPROFILE\.claude\settings.json" -Raw | ConvertFrom-Json`).
- Mac / Linux / Git Bash:
  - `echo '{"tool_input":{"command":"rm -rf /tmp/x"}}' | ~/.claude/hooks/block-dangerous.sh; echo $?` prints `2`.
  - `echo '{"tool_input":{"command":"ls -la"}}' | ~/.claude/hooks/block-dangerous.sh; echo $?` prints `0`.
- Windows PowerShell (`$h = "$env:USERPROFILE\.claude\hooks\block-dangerous.ps1"`):
  - `'{"tool_input":{"command":"Remove-Item C:\\temp\\x -Recurse"}}' | powershell -NoProfile -ExecutionPolicy Bypass -File $h; $LASTEXITCODE` prints `2`.
  - `'{"tool_input":{"command":"Get-ChildItem"}}' | powershell -NoProfile -ExecutionPolicy Bypass -File $h; $LASTEXITCODE` prints `0`.
If any check fails, fix it or restore the backup.

### Step 3: Write the working rules

Append this block to `~/.claude/CLAUDE.md` (create the file if needed; replace the block if it exists). Write it in the user's language; the English version is:

```markdown
<!-- beginner-guide safety:start -->
## Safety rules
- Before deleting a file or folder, make sure it's what the user wants deleted.
  - Mac: use `trash <full path>` to move it to the Trash. Never use `rm`.
  - Windows: send it to the Recycle Bin with the PowerShell VisualBasic `DeleteFile`/`DeleteDirectory` method. Never use rm, del or Remove-Item. If that isn't possible (network drive, USB stick), list the full path and ask the user to delete it in File Explorer.
- Before changing, moving or deleting many files, make a backup (or a Git commit if the folder uses Git) and tell the user how to go back.
- If a safety rule blocks you, use a reversible method or ask the user in plain words. Never work around the block, and never change or switch off these protections yourself.
- No force push, hard reset or forced clean. Before publishing, going live, sending email, paying, or changing permissions, confirm with the user in one sentence.
- Everyday reading, research, writing files and saving versions: just do it without asking each time.
<!-- beginner-guide safety:end -->
```

### Step 4: Finish

Summarize for the user in plain words:
- 🗑️ Deleted files now go to the Trash / Recycle Bin.
- 🚫 Irreversible commands are blocked.
- ⚡ Permission mode: (their choice).
- 🧠 Safety rules are in CLAUDE.md.
- Where the backups are, and that the changes take effect in a **new** Claude session.
