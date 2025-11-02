# HeyMax SubCaps Viewer - Chromium Extension

A Chrome extension using Manifest V3 that monitors network requests by monkey patching fetch() and XMLHttpRequest for UOB SubCaps calculation.

## Features

✅ **Network Request Monitoring**: Monkey patches `fetch()` and `XMLHttpRequest` to intercept all network requests  
✅ **Patch Protection**: Monitors to ensure monkey patches aren't overwritten by other scripts  
✅ **Auto-Recovery**: Automatically re-applies patches if they are detected as overwritten (checks every second)  
✅ **Manifest V3**: Uses the latest Chrome extension standards  
✅ **Silent Operation**: Operates without console logging or data storage

## Quick Start

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **"Load unpacked"** and select the `src` directory
4. The extension will operate silently in the background

## Documentation

- **[EXTENSION_README.md](EXTENSION_README.md)** - Comprehensive extension documentation
- **[src/test/TESTING.md](src/test/TESTING.md)** - Detailed testing instructions
- **[src/test/test.html](src/test/test.html)** - Interactive test page to verify functionality

## How It Works

The extension injects a monitoring script that:
1. Stores references to original `fetch()` and `XMLHttpRequest` methods
2. Replaces them with patched versions to intercept network requests
3. Monitors every second to detect if patches are overwritten
4. Automatically restores patches if tampering is detected

All operations occur silently without any console logging or data storage.

## Testing

Test files are available in `src/test/` for development and verification purposes.

See [src/test/TESTING.md](src/test/TESTING.md) for detailed instructions.

## License

See [LICENSE](LICENSE) file for details.
