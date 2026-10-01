# Standardized Spacing System

## Overview
This document describes the standardized spacing system for SalesforceConsultants.io to ensure consistent padding, margins, and gaps throughout the site.

## CSS Variables

### Spacing Scale
```css
--spacing-xs: 0.5rem;      /* 8px */
--spacing-sm: 1rem;        /* 16px */
--spacing-md: 1.5rem;      /* 24px */
--spacing-lg: 2rem;        /* 32px */
--spacing-xl: 3rem;        /* 48px */
--spacing-2xl: 4rem;       /* 64px */
--spacing-3xl: 6rem;       /* 96px */
```

### Section Padding
```css
--section-padding-sm: 3rem 0;      /* Small sections */
--section-padding-md: 5rem 0;      /* Medium sections (default) */
--section-padding-lg: 8rem 0;      /* Large sections */
```

### Card Padding
```css
--card-padding-sm: 1.5rem;
--card-padding-md: 2rem;
--card-padding-lg: 3rem;
```

### Gaps
```css
--gap-xs: 0.5rem;
--gap-sm: 1rem;
--gap-md: 1.5rem;
--gap-lg: 2rem;
--gap-xl: 3rem;
```

## Utility Classes

### Section Padding
- `.section-padding-sm` - Small section padding (3rem 0)
- `.section-padding-md` - Medium section padding (5rem 0) - **Default**
- `.section-padding-lg` - Large section padding (8rem 0)

### Card Padding
- `.card-padding-sm` - Small card padding (1.5rem)
- `.card-padding-md` - Medium card padding (2rem)
- `.card-padding-lg` - Large card padding (3rem)

### Gaps
- `.gap-xs`, `.gap-sm`, `.gap-md`, `.gap-lg`, `.gap-xl`
- `.grid-gap-sm`, `.grid-gap-md`, `.grid-gap-lg`, `.grid-gap-xl`

### Margins
- `.mb-xs`, `.mb-sm`, `.mb-md`, `.mb-lg`, `.mb-xl`, `.mb-2xl`, `.mb-3xl` (margin-bottom)
- `.mt-xs`, `.mt-sm`, `.mt-md`, `.mt-lg`, `.mt-xl`, `.mt-2xl`, `.mt-3xl` (margin-top)

### Padding
- `.p-xs`, `.p-sm`, `.p-md`, `.p-lg`, `.p-xl` (all sides)
- `.py-xs`, `.py-sm`, `.py-md`, `.py-lg`, `.py-xl` (vertical only)

## Usage Guidelines

### ✅ DO:
- Use utility classes instead of inline styles
- Use section padding classes for all `<section>` elements
- Use card padding classes for cards and containers
- Use gap classes for grid layouts
- Use margin utilities for spacing between elements

### ❌ DON'T:
- Use inline `padding` or `margin` styles
- Mix different spacing values (e.g., `padding: 3rem` and `padding: 4rem`)
- Use arbitrary values like `padding: 7rem` or `margin: 2.5rem`

## Examples

### Before (Bad):
```html
<section style="padding: 8rem 0;">
    <div style="padding: 3rem; margin-bottom: 6rem;">
        <div style="gap: 3rem;">
```

### After (Good):
```html
<section class="section-padding-lg">
    <div class="card-padding-lg mb-3xl">
        <div class="grid-gap-xl">
```

## Migration Status

- ✅ CSS variables defined
- ✅ Utility classes created
- ⏳ Inline styles being replaced (in progress)
- ⏳ All pages to be updated



