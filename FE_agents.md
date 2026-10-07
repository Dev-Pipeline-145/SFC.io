# AGENTS Guidelines for this repository

This repository contains a **static HTML/CSS/JavaScript** website for SalesforceConsultants.io (a DevPipeline division). There is no framework (no React, no Next.js). The site is deployed as static files to Cloudflare Pages / GitHub Pages.

When working on the project interactively with an agent, please follow the guidelines below so that the development experience continues to work smoothly.

## 1. Use the Development Server

- **Always** start a local server while iterating:
  ```bash
  npx http-server -p 8000
  # or
  python3 -m http.server 8000
  ```
- Browse to `http://localhost:8000` to verify changes.
- **Do _not_ push directly to `main`** — work on a feature branch first.

## 2. Keep Dependencies in Sync

If you add or update dependencies, remember to:

1. Please ask the user before installing.
2. Make sure that `package-lock.json` is updated.
3. The only runtime dependency is the external Flask mailer API on Heroku (`flask-mailer-04f370a78f42.herokuapp.com/send`). All other code is client-side.

## 3. Coding Conventions

- **HTML**: Semantic HTML5. Use ARIA attributes for accessibility. Each page must include the full GA4 snippet and structured data (JSON-LD).
- **CSS**: Use CSS custom properties (variables) defined in `styles.css` for all colors, spacing, and theming. Do not hardcode hex values — use `var(--teal)`, `var(--dark)`, etc.
- **JavaScript**: Vanilla JS only (ES6+). No transpiler or bundler. Keep scripts modular — one file per feature in `scripts/`.
- Prefer editing existing files over creating new ones.
- Check for existing CSS classes in `styles.css` and `components.css` before writing new ones.
- Minimize inline `style=""` attributes — extract repeated patterns into `styles.css` or `components.css`.

### CSS Variables (defined in `styles.css`)

The site uses these CSS custom properties for theming. Always reference them:
- `--teal` / `--teal-light` / `--primary-teal` — brand primary color
- `--dark` — dark background/text
- `--white` — white
- `--light-gray` — light backgrounds
- `--text-dark` / `--text-light` — text colors
- `--accent-orange` / `--accent-gold` — accent colors
- `--border-radius` — standard border radius
- `--spacing-sm` / `--spacing-md` / `--spacing-lg` / `--spacing-xl` — spacing scale

## 4. Project Structure

```
SFC.io/
├── index.html                              # Homepage
├── styles.css                              # Global stylesheet (CSS variables, base styles)
├── components.css                          # Reusable component styles
├── critical.css                            # Above-the-fold critical CSS
├── script.js                               # Main site JavaScript
├── robots.txt                              # SEO crawling rules
├── sitemap.xml                             # XML sitemap
├── CNAME                                   # Custom domain config
├── site.webmanifest                        # PWA manifest
├── sw.js                                   # Service worker
├── _config.yml                             # GitHub Pages config
├── _headers                                # Custom HTTP headers
├── _redirects                              # Redirect rules
│
├── assets/                                 # Static assets
│   ├── logos/                              # Brand logos & SVGs
│   ├── css/                                # Page-specific CSS
│   │   └── business.css                    # Business page styles
│   └── (images)                            # Photos, graphics, profile images
│
├── components/                             # Reusable HTML partials
│   ├── header.html                         # Shared header template
│   └── footer.html                         # Shared footer template
│
├── scripts/                                # Feature-specific JavaScript
│   └── sendEmail.js                        # Contact form submission & validation
│
├── favicon/                                # Favicon assets (all sizes)
│
├── contact/index.html                      # Contact page (primary lead form)
├── services/index.html                     # Services overview
├── success-stories/index.html              # Client testimonials
├── expertise/index.html                    # Team expertise & certifications
├── clients/index.html                      # Client showcase
├── faq/index.html                          # Frequently asked questions
├── business/index.html                     # Business solutions
│
├── privacy-policy/index.html               # Privacy policy (opt-out)
├── cookie-policy/index.html                # Cookie policy (opt-out)
│
├── california/region/index.html            # Redirect only — not a California service-area page
├── midwest/region/index.html               # Missouri & Kansas regional page
├── rocky-mountain/region/index.html        # Rocky Mountain regional page
├── surrounding-states/region/index.html    # Surrounding states page
├── utah/region/index.html                  # Utah regional page
│
├── salesforce-consulting-services/index.html           # SEO landing: services
├── salesforce-success-stories-case-studies/index.html  # SEO landing: success stories
├── salesforce-expertise-certifications/index.html      # SEO landing: expertise
├── salesforce-clients-partners/index.html              # SEO landing: clients
│
├── services/implementation-recovery.html   # Service detail page
│
├── tests/                                  # Test directory
│   ├── form-validation.test.js             # Contact form validation tests
│   ├── navigation.test.js                  # Navigation & link integrity tests
│   └── seo.test.js                         # SEO meta tag & structured data tests
│
├── package.json                            # Dependencies & npm scripts
└── FE_agents.md                            # This file — agent guidelines
```

### Legacy / Redirect Pages

These `.html` files at root level exist for backward compatibility and redirect to clean URLs:
- `contact.html` → `/contact/`
- `services.html` → `/services/`
- `expertise.html` → `/expertise/`
- `clients.html` → `/clients/`
- `faq.html` → `/faq/`
- `success-stories.html` → `/success-stories/`
- `contact-salesforce-consultants.html` → `/contact/`
- `salesforce-consulting-services.html` → `/salesforce-consulting-services/`
- `salesforce-expertise-certifications.html` → `/salesforce-expertise-certifications/`
- `salesforce-clients-partners.html` → `/salesforce-clients-partners/`
- `salesforce-success-stories-case-studies.html` → `/salesforce-success-stories-case-studies/`
- `salesforce-consulting-faq.html` → `/faq/`
- `contact-redirect.html` → `/contact/`

## 5. Google Analytics 4 (GA4) — CRITICAL

**Measurement ID**: `G-JXKDK1RBS0` (runs on landing unless the visitor opts out)
**Inactive / do not use**: `G-8ZNLKDLFEC`

### Every page MUST include the privacy/opt-out loader

Place this in the `<head>` of every HTML page. Do **not** inline gtag.js. Analytics and commercial ad pixels may run on landing. A privacy notice must appear, with a visible **Do Not Sell or Share My Info** opt-out (footer + banner). Honor Global Privacy Control.

```html
<script src="/scripts/consent.js" defer></script>
```

`scripts/consent.js` grants Consent Mode on landing, loads `G-JXKDK1RBS0`, shows the privacy notice, and turns analytics/ads off if the visitor opts out. See `/privacy-policy/` and `/cookie-policy/`.

### Custom Dimensions & Events

The site tracks these custom parameters:
- `custom_parameter_1`: `service_type`
- `custom_parameter_2`: `page_section`
- `custom_parameter_3`: `location`
- `custom_parameter_4`: `service_area`
- `custom_parameter_5`: `region`
- `custom_parameter_6`: `country`

### Events tracked in code:
- `form_submit` — contact form successful submission (`scripts/sendEmail.js`)
- `generate_lead` — lead conversion event (`scripts/sendEmail.js`)
- `search` — internal site search (`script.js`)
- `exit_intent_popup_shown` — exit intent popup (`script.js`)

### Performance tags (include in `<head>`):
```html
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
```

## 6. Contact Form & Lead Capture

- The contact form handler is `scripts/sendEmail.js`
- It POSTs JSON to the Flask mailer: `https://flask-mailer-04f370a78f42.herokuapp.com/send`
- Leads are emailed to `marketing@devpipeline.com`
- **Every page with a contact form MUST load** `scripts/sendEmail.js`
- The form must have `id="contact-form"` for the script to bind to it
- On successful submission, GA4 events `form_submit` and `generate_lead` are fired

### Required form fields:
- `first_name` (required)
- `last_name` (required)
- `email` (required, validated)
- `phone` (required, validated)
- `organization` (required)
- `organization_type` (required, select)
- `current_salesforce` (required, select)
- `primary_need` (required, select)
- `timeline` (optional, select)
- `message` (optional, textarea)
- `page` (hidden, identifies which page the form is on)

## 7. Testing

Tests live in `tests/` and use **Jest** with **jsdom**.

Run tests:
```bash
npm test
```

### Test categories:
- **`form-validation.test.js`** — validates email/phone regex, required field logic, form data assembly
- **`navigation.test.js`** — checks that all internal links resolve, no broken anchors
- **`seo.test.js`** — verifies every page has required meta tags, GA4 snippet, canonical URL, JSON-LD

### Writing new tests:
- Place test files in `tests/` with the `.test.js` extension
- Use `describe` / `it` blocks
- For DOM testing, use jsdom (built into Jest's default environment)

## 8. Additional Instructions

- Do not create unnecessary documentation files
- Please create your plan and share it with me prior to making any changes so that I can review and approve the plan
- When modifying pages, ensure styles match the live site at https://salesforceconsultants.io/
- Do not remove or alter GA4 tracking code unless explicitly asked
- Do not modify the Flask mailer endpoint without confirmation
- **Service area is the United States.** Feature Silicon Slopes, Rocky Mountain, MO/KS, and Utah urban/rural. Do not market California or countries outside the U.S. as service areas. LA Chamber of Commerce may remain as a client / testimonial. Global client operations (for example AP Systems) may be mentioned without treating those countries as target markets.
- Do not add unlabeled generative-AI images. Utah’s synthetic-media labeling statute is aimed at political ads (Utah Code § 20A-11-1104). Utah consumer AI law (Utah Code § 13-77-103) requires disclosure when generative AI interacts with a person. This site has no AI chatbot; do not add one without a clear “you are interacting with AI” disclosure.

---

Following these practices ensures that the agent-assisted development workflow stays fast and dependable.
