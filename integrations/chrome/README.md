# Pronounce — Chrome / Edge / Brave extension

Click any tech word on any web page — hear how engineers actually say it. 1880-entry sourced dictionary, the same one that powers the [CLI](../../bin/say-it), [VS Code extension](https://open-vsx.org/extension/sayit/pronounce), and [Pronounce.ai](https://pronounce.renlab.ai/).

> **Sideload only** (v0.3). The extension is not yet on the Chrome Web Store — load it unpacked or as a `.zip`.

## Install (Chromium-based: Chrome / Edge / Brave / Arc / Opera)

1. Download [`pronounce-chrome-0.3.1.zip`](pronounce-chrome-0.3.1.zip) (checked into this folder).
2. Unzip somewhere stable (e.g. `~/Applications/pronounce-chrome/`).
3. Open `chrome://extensions/`.
4. Toggle **Developer mode** (top-right).
5. Click **Load unpacked** → pick the unzipped folder.

The 🔊 Pronounce icon should appear in the toolbar. Click it for a search popup; click any known tech word on a webpage for an inline tooltip.

## What it does

- **Click any tech word** on any web page (default mode). A tooltip shows IPA, English-style respelling, both readings if contested, the source citation, and a 🔊 Play button (Web Speech API).
- **Toolbar popup** — fuzzy-search all 1880 entries with `↑↓ Enter`.
- **Settings**: click → options → toggle on/off, switch trigger to Alt/⌘+click only, change speech rate.

## Privacy

- The dictionary ships inside the extension — **no network requests** at any time.
- Settings are stored via `chrome.storage.sync` — Chrome's encrypted sync if you're signed in, otherwise local.
- No telemetry, no analytics, no tracking.

## Dev

```bash
# build a fresh zip
cd integrations/chrome
zip -r ../../pronounce-chrome-0.3.1.zip . -x "*.DS_Store" -x "node_modules/*"
```

Source: [`integrations/chrome/`](.) in the main repo.

## License

MIT.
