# Browser Cache Issue - isPopupVisible Error

## Problem
The browser is loading the **cached old version** of `script.js?v=2024.1.22` instead of the new `script.js?v=2025.1.20`.

## Root Cause
Browser cache is serving the old JavaScript file even though:
- ✅ Code is fixed (variables at module level)
- ✅ All HTML files updated to version 2025.1.20
- ✅ Code pushed to GitHub

## Solution

### For Users/Visitors:
1. **Hard Refresh**: 
   - Windows/Linux: `Ctrl + F5` or `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
   - Or: `Cmd + Option + E` (clear cache and reload)

2. **Clear Browser Cache**:
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files
   - Firefox: Settings → Privacy → Clear Data → Cached Web Content
   - Safari: Develop → Empty Caches

### For Development:
The code is correct. The variables `isPopupVisible` and `hasShownPopup` are declared at **module level** (line 1260-1261), which means they're accessible to all functions in the file.

**Code Structure:**
```javascript
// Line 1259-1261: Module-level variables
let hasShownPopup = false;
let isPopupVisible = false;

// Line 1303: Function that uses the variable
function showExitIntentPopup() {
    if (popup && !isPopupVisible) { // ✅ Variable is in scope
        // ...
    }
}
```

## Verification
- ✅ JavaScript syntax is valid
- ✅ Variables declared at module level
- ✅ Variables accessible to functions
- ✅ All HTML files use version 2025.1.20
- ✅ Code pushed to GitHub

## Next Steps
1. Wait for GitHub Pages to deploy (1-2 minutes)
2. Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
3. Verify console shows `script.js?v=2025.1.20` (not 2024.1.22)
4. Error should be resolved
