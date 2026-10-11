# Terminal setup for Claude Code

> **中文說明**：把這份文件的網址貼給 Claude Code，它會幫你設定：不閃爍的全螢幕模式、打 `cc` 就開工的快捷鍵，以及（可選）寫長段文字用的編輯器。
> **For humans**: paste this page's link into Claude Code. It will set up flicker-free fullscreen mode, a `cc` shortcut, and (optionally) an editor for long messages.

Part of the free beginner guide by Benson. Free to use and share for non-commercial learning.

---

## Instructions for the AI agent

You are helping a beginner who does not write code. Follow these rules throughout:

- Reply in the user's language, in plain words. Explain what you are doing in one short sentence per step.
- Do the work yourself. Don't hand commands back to the user unless the step truly requires them (for example, a password prompt).
- Detect the OS and shell yourself (`uname -s`, `echo $SHELL`; on Windows check `$env:OS` in PowerShell).
- **Back up every file before changing it** (copy to `<file>.bak-YYYYMMDD-HHMMSS`). Merge into existing settings; never overwrite them.
- Wrap anything you append to a shell profile in marker comments (`# >>> beginner-guide <name> >>>` … `# <<< beginner-guide <name> <<<`). If the block already exists, replace it instead of adding a second copy.
- Ask the user only what you can't find out yourself. Use one short question at a time.

### Step 1: Ask two questions

1. "Which folder should be your Claude workspace?" (Suggest creating one such as `~/Documents/My AI Agent` if they don't have one. Create it if they agree.)
2. "Do you want the optional long-text editor (CotEditor, Mac only)?" (Explain: pasting long text into the terminal collapses it into one line; an external editor fixes this.)

### Step 2: Flicker-free fullscreen mode

Fullscreen rendering keeps the screen stable, enables mouse clicks and scrolling back, and copies text when it is selected.

1. Check the current official docs at https://code.claude.com/docs for the exact setting name in the installed version (`claude --version`).
2. In recent versions this is the `tui` key in `~/.claude/settings.json`: merge `"tui": "fullscreen"` into the existing JSON (use `jq` if available, otherwise a short Node/PowerShell script; never hand-edit by string replacement).
3. If the installed version doesn't support that key, fall back to the environment variable `CLAUDE_CODE_NO_FLICKER=1` in the shell profile.
4. Validate the JSON afterwards (`jq . ~/.claude/settings.json` or equivalent). If it's invalid, restore the backup.

Tell the user: in fullscreen mode `⌘+F` / `Ctrl+F` search doesn't work; use `Ctrl+O` then `/` to search the conversation.

### Step 3: The `cc` shortcut

Goal: typing `cc` opens the workspace folder and starts Claude.

**macOS / Linux** (zsh → `~/.zshrc`, bash → `~/.bashrc`):

```sh
# >>> beginner-guide cc >>>
alias cc='cd "WORKSPACE_PATH" && claude'
# <<< beginner-guide cc <<<
```

Replace `WORKSPACE_PATH` with the absolute path from Step 1.

Note for the user: on Mac and Linux, `cc` is also the name of the C compiler. That doesn't matter for non-programmers. If they do compile C code, use another name such as `cl`.

**Windows** (PowerShell profile; create it if missing with `New-Item -ItemType File -Path $PROFILE -Force`):

```powershell
# >>> beginner-guide cc >>>
function cc { Set-Location 'WORKSPACE_PATH'; claude @args }
# <<< beginner-guide cc <<<
```

If PowerShell blocks scripts, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (explain that this only allows the user's own scripts).

### Step 4 (optional, Mac): CotEditor as the long-text editor

1. If CotEditor isn't in `/Applications`, install it from the official source: the Mac App Store, https://coteditor.com, or `brew install --cask coteditor` if Homebrew exists. Don't download it from anywhere else.
2. Link its command-line tool: `mkdir -p ~/.local/bin && ln -sf /Applications/CotEditor.app/Contents/SharedSupport/bin/cot ~/.local/bin/cot`. Make sure `~/.local/bin` is on `PATH`.
3. Add to the shell profile (inside a marker block):
   ```sh
   export VISUAL="$HOME/.local/bin/cot -w"
   export EDITOR="$VISUAL"
   ```
   `-w` makes the terminal wait until the CotEditor window is closed.
4. Explain how to use it: in Claude press `Ctrl+G` → CotEditor opens → write → `⌘S` to save, `⌘W` to close → the text returns to the input box → press Enter.
5. Known conflict: Google Chrome's Gemini shortcut can take over `Ctrl+G` system-wide. If that happens, bind the editor to another key in `~/.claude/keybindings.json` (merge, don't overwrite):
   ```json
   {
     "bindings": [
       { "context": "Chat", "bindings": { "ctrl+e": "chat:externalEditor" } }
     ]
   }
   ```
   Check https://code.claude.com/docs/en/keybindings if the format has changed.

### Step 5: Finish

1. Tell the user that settings only apply in a **new** session: quit this one (`/exit`), open a new terminal tab, and type `cc`.
2. Summarize in plain words: what changed, which files were edited, where the backups are, and how to undo it (restore the `.bak` file or delete the marker block).
3. Give them a quick checklist: `cc` opens Claude in the workspace; the screen doesn't flicker; selecting text copies it; (if installed) the editor shortcut opens CotEditor.
