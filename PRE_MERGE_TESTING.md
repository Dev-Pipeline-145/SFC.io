# Pre-Merge Testing Checklist
**Date**: January 2025  
**Branch**: `fix/critical-issues` → `main`  
**Purpose**: Thorough testing before merging location priority and tagging changes

---

## 🧪 TESTING PLAN

### 1. HTML Validation & Structure
- [ ] All HTML files validate (no syntax errors)
- [ ] Meta tags present and correct
- [ ] Structured data (JSON-LD) valid
- [ ] Canonical URLs correct
- [ ] Open Graph tags present
- [ ] Twitter Card tags present

### 2. Location Priority Verification
- [ ] Homepage: California first in title/description
- [ ] Homepage: Missouri/Kansas added to service areas
- [ ] Service areas displayed in correct order: CA → MO/KS → UT
- [ ] Geographic meta tags: California first
- [ ] Structured data areaServed: California first
- [ ] All pages have location-specific keywords

### 3. Content Verification
- [ ] Hero section: "Serving California, Missouri, Kansas & Utah"
- [ ] California cities listed: LA, SF, San Diego, Orange County, Sacramento, San Jose
- [ ] Missouri cities listed: Kansas City, St. Louis, Springfield, Columbia
- [ ] Kansas cities listed: Wichita, Overland Park
- [ ] Utah cities still present: Salt Lake City, Provo, Ogden, etc.
- [ ] No duplicate content
- [ ] Testimonials reference correct locations

### 4. SEO & Meta Tags
- [ ] Page titles include location priority
- [ ] Meta descriptions include location context
- [ ] Keywords meta tags include new locations
- [ ] Geo.region tags: California first
- [ ] Geo.placename tags: Los Angeles first, then MO/KS cities
- [ ] Structured data includes Missouri/Kansas addresses

### 5. Google Analytics
- [ ] service_area property: california_missouri_kansas_utah_region
- [ ] primary_location: california
- [ ] secondary_locations: missouri_kansas_utah
- [ ] No duplicate page_view events
- [ ] Search event tracking works correctly

### 6. Cross-Page Consistency
- [ ] Homepage → Services page: Consistent location priority
- [ ] Homepage → Contact page: Consistent location priority
- [ ] Homepage → Success Stories: LA Chamber highlighted
- [ ] California region page: Los Angeles emphasized
- [ ] Midwest region page: Missouri/Kansas emphasized

### 7. Functionality Testing
- [ ] All links work
- [ ] Forms submit correctly
- [ ] JavaScript functions work
- [ ] No console errors
- [ ] Images load correctly
- [ ] CSS renders properly

### 8. Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile responsive

---

## 📋 TEST RESULTS

### Test Execution Log

**Date**: [To be filled during testing]  
**Tester**: Auto  
**Environment**: Local branch `fix/critical-issues`

---

## ✅ PRE-MERGE CHECKLIST

- [ ] All tests passed
- [ ] No critical issues found
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Ready for merge

---

**Status**: Testing in progress...
