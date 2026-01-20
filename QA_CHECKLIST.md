# Quick QA Testing Checklist

## Pre-Testing Setup
- [ ] Clear browser cache
- [ ] Open browser DevTools (F12)
- [ ] Enable mobile device emulation
- [ ] Check network throttling settings

---

## Page-by-Page Quick Check

### Homepage (index.html)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Navigation menu works
- [ ] All service cards display
- [ ] Stats counter animates
- [ ] Testimonials section visible
- [ ] Contact form works
- [ ] Footer links work
- [ ] Search modal opens (Cmd/Ctrl+K)
- [ ] Mobile menu toggles

### Services Page (services.html)
- [ ] Page loads correctly
- [ ] All service sections display
- [ ] Service cards are clickable
- [ ] Forms work
- [ ] Links to other pages work

### Success Stories (success-stories.html)
- [ ] Case studies display
- [ ] Images load
- [ ] Links work
- [ ] PDF downloads work

### Expertise Page (expertise.html)
- [ ] Certifications display
- [ ] Team member cards work
- [ ] Bio modals open/close
- [ ] All content visible

### Clients Page (clients.html)
- [ ] Client logos display
- [ ] All logos load correctly
- [ ] Links work

### Contact Page (contact.html)
- [ ] Contact form displays
- [ ] Form validation works
- [ ] Required fields enforced
- [ ] Email validation works
- [ ] Submit button works
- [ ] Success message displays
- [ ] Phone/email links work

### FAQ Page (faq.html)
- [ ] All questions display
- [ ] Accordion/collapse works (if used)
- [ ] Content is readable

### Regional Pages
- [ ] Utah page loads
- [ ] California page loads
- [ ] Midwest page loads
- [ ] Surrounding States page loads

---

## Functional Quick Tests

### Navigation
- [ ] Click each main menu item
- [ ] Mobile menu opens/closes
- [ ] Footer links work
- [ ] Back button works
- [ ] Browser history works

### Search
- [ ] Click search icon
- [ ] Press Cmd/Ctrl+K
- [ ] Type search query
- [ ] Results display
- [ ] Click result navigates
- [ ] Escape closes modal

### Forms
- [ ] Fill out contact form
- [ ] Submit with empty fields (should show errors)
- [ ] Submit with invalid email (should show error)
- [ ] Submit with valid data (should succeed)

### Modals
- [ ] Bio modals open
- [ ] Bio modals close (X button, overlay click, Escape)
- [ ] Exit intent popup triggers
- [ ] Exit intent popup closes

### Interactive Elements
- [ ] Hover effects work
- [ ] Button clicks work
- [ ] Smooth scrolling works
- [ ] Share dropdown works
- [ ] Copy to clipboard works

---

## Browser Quick Test

### Chrome
- [ ] All pages load
- [ ] No console errors
- [ ] Forms work
- [ ] Mobile view works

### Firefox
- [ ] All pages load
- [ ] No console errors
- [ ] Forms work
- [ ] Mobile view works

### Safari
- [ ] All pages load
- [ ] No console errors
- [ ] Forms work
- [ ] Mobile view works

### Edge
- [ ] All pages load
- [ ] No console errors
- [ ] Forms work
- [ ] Mobile view works

---

## Mobile Quick Test

### iPhone (375px)
- [ ] Mobile menu works
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Forms work
- [ ] No horizontal scroll

### iPad (768px)
- [ ] Layout adapts
- [ ] Navigation works
- [ ] Forms work

### Android (375px)
- [ ] Mobile menu works
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Forms work

---

## Performance Quick Check

### Lighthouse Scores (Target)
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 90+
- [ ] SEO: 95+

### Load Times
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s

---

## SEO Quick Check

### Meta Tags
- [ ] Title tag present and unique
- [ ] Meta description present and unique
- [ ] Open Graph tags present
- [ ] Twitter Card tags present

### Technical
- [ ] sitemap.xml accessible
- [ ] robots.txt accessible
- [ ] Canonical URLs correct
- [ ] Structured data valid (use Google Rich Results Test)

---

## Accessibility Quick Check

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] All links/buttons accessible via keyboard

### Screen Reader
- [ ] Page title announced
- [ ] Navigation landmarks work
- [ ] Form labels announced
- [ ] Images have alt text

### Color Contrast
- [ ] Text is readable
- [ ] Links are distinguishable
- [ ] Buttons have good contrast

---

## Common Issues to Watch For

- [ ] Broken images (404 errors)
- [ ] JavaScript console errors
- [ ] CSS layout breaks
- [ ] Forms not submitting
- [ ] Links pointing to wrong pages
- [ ] Mobile menu not closing
- [ ] Overlapping text
- [ ] Missing alt text on images
- [ ] Slow page loads
- [ ] Horizontal scrolling on mobile

---

## Critical Path Test

**Must work for site to be functional:**
1. Homepage loads
2. Navigation works
3. Contact form submits
4. Mobile menu works
5. All pages accessible
6. No critical JavaScript errors

---

## Notes Section

**Date**: _______________
**Tester**: _______________
**Browser**: _______________
**Device**: _______________

**Issues Found**:
1. 
2. 
3. 

**Notes**:
- 
- 
- 

---

**Quick Reference**: Keep this checklist handy during testing sessions for rapid verification of key functionality.


