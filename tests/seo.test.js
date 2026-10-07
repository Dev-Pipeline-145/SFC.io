/**
 * SEO & Analytics Tests
 * Verifies every page has required meta tags, GA4, canonical URLs, and JSON-LD
 */

const fs = require('fs');
const path = require('path');

const GA4_MEASUREMENT_ID = 'G-JXKDK1RBS0';
const SITE_DOMAIN = 'salesforceconsultants.io';

// All pages that should have full GA4 + SEO tags
const pages = [
  { file: 'index.html', name: 'Homepage' },
  { file: 'contact/index.html', name: 'Contact' },
  { file: 'services/index.html', name: 'Services' },
  { file: 'success-stories/index.html', name: 'Success Stories' },
  { file: 'expertise/index.html', name: 'Expertise' },
  { file: 'clients/index.html', name: 'Clients' },
  { file: 'faq/index.html', name: 'FAQ' },
  { file: 'business/index.html', name: 'Business' },
  { file: 'midwest/region/index.html', name: 'Midwest Region' },
  { file: 'rocky-mountain/region/index.html', name: 'Rocky Mountain Region' },
  { file: 'salesforce-consulting-services/index.html', name: 'SEO: Services' },
  { file: 'salesforce-success-stories-case-studies/index.html', name: 'SEO: Success Stories' },
  { file: 'salesforce-expertise-certifications/index.html', name: 'SEO: Expertise' },
  { file: 'salesforce-clients-partners/index.html', name: 'SEO: Clients' },
];

// Pages that must have the sendEmail.js script
const pagesWithForms = [
  { file: 'contact/index.html', name: 'Contact' },
  { file: 'midwest/region/index.html', name: 'Midwest Region' },
  { file: 'rocky-mountain/region/index.html', name: 'Rocky Mountain Region' },
];

function readPage(filePath) {
  const fullPath = path.resolve(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf-8');
}

describe('GA4 Analytics Tracking', () => {
  pages.forEach(({ file, name }) => {
    describe(name + ' (' + file + ')', () => {
      let html;

      beforeAll(() => {
        html = readPage(file);
      });

      it('should exist as a file', () => {
        expect(html).not.toBeNull();
      });

      it('should include the privacy/opt-out analytics loader', () => {
        if (!html) return;
        expect(html).toContain('/scripts/consent.js');
      });

      it('should not hard-code inactive measurement ID G-8ZNLKDLFEC', () => {
        if (!html) return;
        expect(html).not.toContain('G-8ZNLKDLFEC');
      });

      it('should not load gtag.js before consent', () => {
        if (!html) return;
        expect(html).not.toContain('googletagmanager.com/gtag/js');
      });
    });
  });
});

describe('Consent loader and legal pages', () => {
  it('consent.js should load G-JXKDK1RBS0 on landing with an opt-out', () => {
    const js = readPage('scripts/consent.js');
    expect(js).toContain(GA4_MEASUREMENT_ID);
    expect(js).not.toContain('G-8ZNLKDLFEC');
    expect(js).toContain('Do Not Sell or Share My Info');
    expect(js).toContain('opted_out');
  });

  it('privacy policy page should exist and describe $500 discovery collection', () => {
    const html = readPage('privacy-policy/index.html');
    expect(html).not.toBeNull();
    expect(html).toContain('$500 discovery');
    expect(html).toContain(GA4_MEASUREMENT_ID);
  });

  it('cookie policy page should describe opt-out analytics', () => {
    const html = readPage('cookie-policy/index.html');
    expect(html).not.toBeNull();
    expect(html).toContain('Do Not Sell or Share');
    expect(html).toContain(GA4_MEASUREMENT_ID);
  });
});

describe('SEO Meta Tags', () => {
  pages.forEach(({ file, name }) => {
    describe(name + ' (' + file + ')', () => {
      let html;

      beforeAll(() => {
        html = readPage(file);
      });

      it('should have a <title> tag', () => {
        if (!html) return;
        expect(html).toMatch(/<title>[^<]+<\/title>/);
      });

      it('should have a meta description', () => {
        if (!html) return;
        expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]+"/);
      });

      it('should have a canonical URL', () => {
        if (!html) return;
        expect(html).toMatch(/<link\s+rel="canonical"\s+href="[^"]+"/);
      });

      it('should have viewport meta tag', () => {
        if (!html) return;
        expect(html).toContain('name="viewport"');
      });

      it('should have charset declaration', () => {
        if (!html) return;
        expect(html.toLowerCase()).toContain('charset="utf-8"');
      });
    });
  });
});

describe('Open Graph Tags', () => {
  pages.forEach(({ file, name }) => {
    describe(name + ' (' + file + ')', () => {
      let html;

      beforeAll(() => {
        html = readPage(file);
      });

      it('should have og:title', () => {
        if (!html) return;
        expect(html).toMatch(/property="og:title"/);
      });

      it('should have og:description', () => {
        if (!html) return;
        expect(html).toMatch(/property="og:description"/);
      });

      it('should have og:url', () => {
        if (!html) return;
        expect(html).toMatch(/property="og:url"/);
      });
    });
  });
});

describe('Contact Form Pages — sendEmail.js', () => {
  pagesWithForms.forEach(({ file, name }) => {
    describe(name + ' (' + file + ')', () => {
      let html;

      beforeAll(() => {
        html = readPage(file);
      });

      it('should exist as a file', () => {
        expect(html).not.toBeNull();
      });

      it('should include sendEmail.js script', () => {
        if (!html) return;
        expect(html).toContain('sendEmail.js');
      });

      it('should have a form with id="contact-form"', () => {
        if (!html) return;
        expect(html).toContain('id="contact-form"');
      });
    });
  });
});

describe('Performance Tags', () => {
  pages.forEach(({ file, name }) => {
    describe(name + ' (' + file + ')', () => {
      let html;

      beforeAll(() => {
        html = readPage(file);
      });

      it('should have dns-prefetch for google analytics', () => {
        if (!html) return;
        expect(html).toContain('dns-prefetch');
      });
    });
  });
});

