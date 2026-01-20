# Site-Wide Component System

## Overview
This document describes the component system for SalesforceConsultants.io, which allows for reusable, site-wide components like headers, footers, and navigation.

## Component Files

### `/components/header.html`
- Site-wide header with logo and navigation
- Includes mobile menu button
- Consistent across all pages

### `/components/footer.html`
- Site-wide footer with company info, services, resources, and service areas
- Compact design with proper spacing
- Includes copyright and legal links

### `/components.js`
- JavaScript loader that injects components into pages
- Supports placeholder elements (`#site-header-placeholder`, `#site-footer-placeholder`)
- Can also replace existing elements for gradual migration

## Usage

### Method 1: Placeholder Elements (Recommended for New Pages)
```html
<!-- In your HTML file -->
<div id="site-header-placeholder"></div>
<!-- Page content -->
<div id="site-footer-placeholder"></div>

<!-- Load components -->
<script src="/components.js?v=2025.1.20"></script>
```

### Method 2: Direct Include (For Static Sites)
For GitHub Pages, you can also directly include the component HTML:
```html
<!-- Include header -->
<!--#include virtual="/components/header.html" -->
```

However, GitHub Pages doesn't support SSI, so Method 1 (JavaScript) is preferred.

## Component Styles

All components use classes from `/components.css`:
- `.footer-component` - Footer styling
- `.footer-grid` - Footer grid layout
- `.footer-section` - Individual footer sections
- `.container-component` - Consistent container width

## Benefits

1. **Consistency**: All pages use the same header/footer
2. **Maintainability**: Update once, changes everywhere
3. **Performance**: Components are cached by browser
4. **Flexibility**: Easy to customize per page if needed

## Migration Strategy

1. Create component HTML files
2. Add placeholder elements to new pages
3. Gradually replace existing headers/footers
4. Remove duplicate footer code from individual pages

## Current Status

- ✅ Component files created (`/components/header.html`, `/components/footer.html`)
- ✅ Component loader created (`/components.js`)
- ✅ Component styles in `/components.css`
- ⚠️ Pages still have individual footers (need migration)
- ⚠️ Need to add component loader to all pages

## Next Steps

1. Add `<script src="/components.js">` to all HTML files
2. Replace existing footer HTML with `<div id="site-footer-placeholder"></div>`
3. Replace existing header HTML with `<div id="site-header-placeholder"></div>`
4. Test all pages to ensure components load correctly
5. Remove old footer/header code once verified
