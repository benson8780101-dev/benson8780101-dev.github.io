# Connect Gmail and Google Calendar (read-only)

> **中文說明**：把這份文件的網址貼給 Claude Code，它會一步一步帶你，用**只能讀、不能改**的安全方式，讓 Claude 看得到你的 Gmail、Google 行事曆和雲端硬碟。大約要 20–30 分鐘，中間有幾個畫面要你自己在瀏覽器按。
> **For humans**: paste this page's link into Claude Code. It will walk you through letting Claude **read** (not change) your Gmail, Google Calendar and Drive. Allow 20–30 minutes; you'll click through a few browser screens yourself.

Part of the free beginner guide by Benson. Free to use and share for non-commercial learning.

This uses the open-source [Google Workspace MCP server](https://github.com/taylorwilsdon/google_workspace_mcp) (community project, not made by Google).

---

## Instructions for the AI agent

You are guiding a beginner who does not write code.

- Reply in the user's language, in plain words. **One step at a time**: give one instruction, wait for the user to report back, then continue.
- Do everything on the computer yourself. The user only clicks in the Google Cloud website and the login screen.
- **Credentials are secret.** Never ask the user to paste the Client Secret into the chat, never print it, never store it in the project folder or in Git. The user types it into a local file themselves (Step 3).
- Start **read-only**. Don't send, create, change or delete anything to test the connection.
- Back up any file before changing it. Merge settings; never overwrite.
- Before following these steps, skim the upstream README for changes in flags or setup: https://github.com/taylorwilsdon/google_workspace_mcp

### Step 1: Prepare uv

The server runs through `uv`. Check `command -v uvx` (also look in `~/.local/bin`). If missing, install it with the official installer:
- macOS / Linux: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- Windows (PowerShell): `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`

Note the full path to `uvx` (for example `~/.local/bin/uvx`); you'll need it in Step 4.

### Step 2: Google Cloud (the user clicks, you guide)

Ask which Google account they want Claude to read (a personal Gmail is simplest). Remind them to log in to https://console.cloud.google.com with **that** account; if the browser keeps switching to a work account, use a private/incognito window.

Guide them through, one screen at a time:
1. **Create a project** (any name, e.g. "My Claude assistant").
2. **APIs & Services → Library**: enable **Gmail API** and **Google Calendar API** (add **Google Drive API** if they want Drive).
3. **Google Auth Platform / OAuth consent screen**: user type **External**; fill in the app name and their own email; under **Audience / Test users** add their own Gmail address.
4. **Clients → Create client**: application type **Desktop app**. Afterwards they'll see a **Client ID** and **Client Secret**. Tell them to keep that page open and **not** paste the values into the chat.

### Step 3: Store the credentials locally (the user types them)

Create a private file and open it for the user to fill in:

- macOS / Linux: `~/.config/google-workspace-mcp/env`, folder permission 700, file permission 600.
- Windows: `%USERPROFILE%\.config\google-workspace-mcp\env`, readable only by the user.

Template to write into it:

```sh
GOOGLE_OAUTH_CLIENT_ID=paste-client-id-here
GOOGLE_OAUTH_CLIENT_SECRET=paste-client-secret-here
USER_GOOGLE_EMAIL=their-gmail-address
```

You may fill in `USER_GOOGLE_EMAIL` yourself (ask them). Then open the file in a text editor for them (`open -e <file>` on Mac, `notepad <file>` on Windows) and ask them to paste the ID and Secret, save, and close. Afterwards check only that both lines no longer contain `paste-…-here` (for example with `grep -c 'paste-' <file>`); don't print the values.

### Step 4: A small start script

Claude Code starts plugins in a clean environment that may not see the user's `PATH`, so use full paths.

macOS / Linux: create `~/.config/google-workspace-mcp/start.sh` (permission 700):

```sh
#!/bin/sh
set -a
. "$HOME/.config/google-workspace-mcp/env"
set +a
exec "$HOME/.local/bin/uvx" workspace-mcp --single-user --transport stdio \
  --tool-tier core \
  --permissions gmail:readonly calendar:readonly drive:readonly
```

Adjust the `uvx` path to what you found in Step 1, and drop `drive:readonly` if they didn't enable Drive. If the installed version rejects `--permissions`, check `uvx workspace-mcp --help` for the current read-only option.

Windows: create an equivalent `start.ps1` that loads the env file into environment variables and runs the same `uvx` command.

Register it for all projects:

```sh
claude mcp add google-workspace -s user -- "$HOME/.config/google-workspace-mcp/start.sh"
```

(Back up `~/.claude.json` first.)

### Step 5: First login

1. Tell the user to quit Claude (`/exit`) and start a **new** session; plugins added mid-session aren't visible to the old one.
2. In the new session, they ask something read-only, for example: "List today's calendar event titles. Don't create, change or delete anything."
3. A Google login link appears. They open it in the browser (a private window if the wrong account shows up), choose their account, and allow the read-only permissions.
   - "Google hasn't verified this app" is expected for an app they made for themselves: **Advanced → Go to (app name)**.
   - When copying the link from the terminal, a line break or space can sneak into the middle; remove it if the page errors.
   - If Google reports `redirect_uri_mismatch`, create a **Web application** client instead and add `http://localhost:8000/oauth2callback` as an authorized redirect URI (match the port the server prints), then update the env file.
4. Confirm the answer looks right.

### Step 6: Avoid re-login every 7 days

While the consent screen is in **Testing**, Google expires the login after 7 days. Once everything works, guide the user to **Publish app** (status "In production") on the Audience page. Verification by Google isn't needed for personal use. They'll need to log in once more after publishing.

### Step 7: Finish

Tell the user in plain words:
- What Claude can now read (Gmail, Calendar, maybe Drive) and that it **cannot** send, change or delete anything.
- Where the private files are (`env`, `start.sh`) and that they must never be shared.
- Ask them whether to write "I have read-only access to Gmail/Calendar/Drive via google-workspace" into their CLAUDE.md, so future sessions know about it.
- To allow more later (for example adding calendar events), change one permission at a time in `start.sh` (e.g. `calendar:full`), then clear the old login in `/mcp` → google-workspace → **Clear authentication** and log in again so Google asks for the new permission.
- To remove: `claude mcp remove google-workspace -s user`, and revoke access at https://myaccount.google.com/permissions.
