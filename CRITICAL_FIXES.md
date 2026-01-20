# Critical Fixes - Priority List
**Branch**: `fix/critical-issues`  
**Date**: January 2025  
**Status**: 🔴 **URGENT - BLOCKING ISSUES**

---

## 🔴 CRITICAL PRIORITY (Fix Immediately)

### 1. Fix Font Rendering Issue
**Severity**: 🔴 **CRITICAL**  
**Impact**: Site-wide text rendering broken  
**Files**: `styles.css`

**Problem**: Text displays with spaces inserted (e.g., "Sale force" instead of "Salesforce")

**Root Cause**: `@font-face` declaration missing `src` property

**Fix Required**:
```css
/* styles.css lines 28-33 */
@font-face {
    font-family: 'Oceanwide Pro';
    font-display: swap;  /* Remove duplicate font-display: fallback */
    src: url('path/to/oceanwide-pro.woff2') format('woff2'),
         url('path/to/oceanwide-pro.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
```

**Action Items**:
- [x] Remove broken `@font-face` declaration
- [x] Remove duplicate `font-display: fallback`
- [x] Comment out font-face until font files are added
- [ ] Locate Oceanwide Pro font files and add to assets
- [ ] Uncomment and fix `@font-face` with proper `src`
- [ ] Test font loading
- [ ] Verify text renders correctly

**Status**: ✅ **FIXED** - Font-face commented out, using system font fallbacks
**Estimated Time**: 30 minutes (15 min done, 15 min remaining for font files)

---

### 2. Fix Form Handler Conflict
**Severity**: 🔴 **CRITICAL**  
**Impact**: Contact form may not submit correctly  
**Files**: `script.js`, `contact.html`

**Problem**: Multiple form handlers conflict - `script.js` prevents submission, `sendEmail.js` is the real handler

**Fix Required**:

**Remove from `script.js`**:
- [ ] Delete `initializeFormHandling()` function (lines 914-950)
- [ ] Remove call to `initializeFormHandling()` from `initializeSite()` (line 161)
- [ ] Remove `validateForm()` call from `initializeSite()` (line 158) - it validates empty form on load

**Keep**:
- ✅ `scripts/sendEmail.js` - This is the working handler

**Code Changes**:
```javascript
// script.js - Remove from initializeSite()
function initializeSite() {
    // ... other initializations ...
    
    // ❌ REMOVE THIS:
    // validateForm();
    // initializeFormHandling();
    
    // ... rest of initialization ...
}
```

**Action Items**:
- [x] Remove `initializeFormHandling()` function
- [x] Remove `initializeFormValidation()` function
- [x] Remove `validateForm()` function
- [x] Remove calls from `initializeSite()`
- [ ] Test form submission on contact page
- [ ] Verify only `sendEmail.js` handles form

**Status**: ✅ **FIXED** - Conflicting handlers removed
**Estimated Time**: 15 minutes (done)

---

### 3. Fix Duplicate Resource Loading
**Severity**: ⚠️ **HIGH**  
**Impact**: Performance, caching issues  
**Files**: `index.html`

**Problem**: Resources preloaded without versions, then loaded with versions (mismatch)

**Fix Required**:
```html
<!-- Option 1: Match versions in preload -->
<link rel="preload" href="/styles.css?v=2024.1.24" as="style">
<link rel="preload" href="/script.js?v=2024.1.22" as="script">

<!-- Option 2: Remove preload if using deferred loading -->
<!-- Remove lines 97-98 entirely -->
```

**Action Items**:
- [x] Remove preload for styles.css and script.js (version mismatch)
- [x] Keep preload for images (no version conflict)
- [ ] Test page load performance
- [ ] Verify no console warnings

**Status**: ✅ **FIXED** - Preload removed for conflicting resources
**Estimated Time**: 10 minutes (done)

---

## ⚠️ HIGH PRIORITY (Fix Soon)

### 4. Remove Redundant Color Contrast Fixing
**Severity**: ⚠️ **MEDIUM**  
**Impact**: Performance  
**Files**: `script.js`

**Problem**: Color contrast function runs 3+ times (initial + setTimeout + setInterval every 10s)

**Fix Required**:
```javascript
// script.js lines 182-183 - REMOVE
// setTimeout(fixAllColorContrastIssues, 2000);
// setInterval(fixAllColorContrastIssues, 10000);

// Keep only line 146:
fixAllColorContrastIssues();  // Run once on page load
```

**Action Items**:
- [x] Remove setTimeout call (line 182)
- [x] Remove setInterval call (line 183)
- [ ] Test page rendering
- [ ] Verify color contrast still works

**Status**: ✅ **FIXED** - Redundant calls removed
**Estimated Time**: 5 minutes (done)

---

### 5. Clean Up Unused Form Validation Code
**Severity**: ⚠️ **MEDIUM**  
**Impact**: Code quality, maintenance  
**Files**: `script.js`

**Problem**: `initializeFormValidation()` function exists but never called

**Fix Required**:
```javascript
// script.js lines 1155-1165 - REMOVE if not needed
// OR integrate with sendEmail.js if validation needed
```

**Action Items**:
- [x] Review validation - sendEmail.js handles all validation
- [x] Remove `initializeFormValidation()` function
- [x] Remove `validateForm()` function

**Status**: ✅ **FIXED** - Unused validation code removed (handled by sendEmail.js)
**Estimated Time**: 10 minutes (done)

---

## 📋 MEDIUM PRIORITY (Fix When Possible)

### 6. Consolidate Font Declarations
**Severity**: ⚠️ **LOW**  
**Impact**: Code maintainability  
**Files**: `styles.css`, `critical.css`, multiple HTML files

**Problem**: Same font-family stack repeated 10+ times

**Fix Required**:
```css
/* Add to styles.css :root */
:root {
    --font-primary: 'Oceanwide Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Use throughout */
font-family: var(--font-primary);
```

**Action Items**:
- [ ] Add CSS variable for font-family
- [ ] Replace all font-family declarations with variable
- [ ] Test across all pages
- [ ] Verify font still loads correctly

**Estimated Time**: 30 minutes

---

## ✅ TESTING CHECKLIST

After fixes, test:

- [ ] **Font Rendering**: All text displays correctly (no spaces in words)
- [ ] **Form Submission**: Contact form submits successfully
- [ ] **Console Errors**: No JavaScript errors
- [ ] **Performance**: No preload warnings
- [ ] **Cross-Browser**: Test in Chrome, Firefox, Safari
- [ ] **Mobile**: Test on mobile devices
- [ ] **Accessibility**: Text is readable and accessible

---

## 📊 FIX SUMMARY

| Priority | Issue | Files | Time Estimate |
|----------|-------|-------|---------------|
| 🔴 Critical | Font Rendering | `styles.css` | 30 min |
| 🔴 Critical | Form Handler Conflict | `script.js`, `contact.html` | 15 min |
| ⚠️ High | Duplicate Resource Loading | `index.html` | 10 min |
| ⚠️ High | Redundant Color Fixing | `script.js` | 5 min |
| ⚠️ High | Unused Validation Code | `script.js` | 10 min |
| ⚠️ Low | Font Declarations | Multiple | 30 min |

**Total Estimated Time**: ~1.5 hours

---

## 🚀 DEPLOYMENT CHECKLIST

Before merging to main:

- [ ] All critical fixes tested
- [ ] No console errors
- [ ] Form submission works
- [ ] Font renders correctly
- [ ] Performance improved
- [ ] Code reviewed
- [ ] QA testing complete

---

## 📝 NOTES

- Font files need to be located/added to assets directory
- Form handler fix is blocking - form may not work correctly currently
- Preload warnings are performance issues but not blocking
- All fixes should be tested on staging before production

---

**Created**: January 2025  
**Branch**: `fix/critical-issues`  
**Next Steps**: Start with Critical Priority fixes
