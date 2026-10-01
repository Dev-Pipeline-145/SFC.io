/**
 * Navigation & Link Integrity Tests
 * Verifies internal links resolve to actual files and nav structure is consistent
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Core navigation links that should be present on every main page
const coreNavLinks = [
  { href: '/services/', label: 'Services' },
  { href: '/success-stories/', label: 'Success Stories' },
  { href: '/expertise/', label: 'Expertise' },
  { href: '/clients/', label: 'Clients' },
  { href: '/contact/', label: 'Contact' },
];

// All internal link targets that should resolve to real files
const expectedFiles = [
  'index.html',
  'contact/index.html',
  'services/index.html',
  'success-stories/index.html',
  'expertise/index.html',
  'clients/index.html',
  'faq/index.html',
  'business/index.html',
  'california/region/index.html',
  'midwest/region/index.html',
  'rocky-mountain/region/index.html',
  'salesforce-consulting-services/index.html',
  'salesforce-success-stories-case-studies/index.html',
  'salesforce-expertise-certifications/index.html',
  'salesforce-clients-partners/index.html',
  'services/implementation-recovery.html',
];

// Main pages to check for nav links
const mainPages = [
  'index.html',
  'contact/index.html',
  'services/index.html',
  'success-stories/index.html',
  'expertise/index.html',
  'clients/index.html',
  'faq/index.html',
];

function readPage(filePath) {
  const fullPath = path.resolve(ROOT, filePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf-8');
}

describe('File Existence', () => {
  expectedFiles.forEach((file) => {
    it(`should have file: ${file}`, () => {
      const fullPath = path.resolve(ROOT, file);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });
});

describe('Core Navigation Links', () => {
  mainPages.forEach((page) => {
    describe(page, () => {
      let html;

      beforeAll(() => {
        html = readPage(page);
      });

      it('should exist', () => {
        expect(html).not.toBeNull();
      });

      coreNavLinks.forEach(({ href, label }) => {
        it(`should contain nav link to ${href} (${label})`, () => {
          if (!html) return;
          expect(html).toContain(`href="${href}"`);
        });
      });
    });
  });
});

describe('Footer Links', () => {
  mainPages.forEach((page) => {
    describe(page, () => {
      let html;

      beforeAll(() => {
        html = readPage(page);
      });

      it('should have a <footer> element', () => {
        if (!html) return;
        expect(html).toContain('<footer');
      });

      it('should have phone number in footer', () => {
        if (!html) return;
        expect(html).toMatch(/385[\s-.]?309[\s-.]?0807/);
      });
    });
  });
});

describe('Shared Assets', () => {
  it('should have styles.css', () => {
    expect(fs.existsSync(path.resolve(ROOT, 'styles.css'))).toBe(true);
  });

  it('should have components.css', () => {
    expect(fs.existsSync(path.resolve(ROOT, 'components.css'))).toBe(true);
  });

  it('should have script.js', () => {
    expect(fs.existsSync(path.resolve(ROOT, 'script.js'))).toBe(true);
  });

  it('should have scripts/sendEmail.js', () => {
    expect(fs.existsSync(path.resolve(ROOT, 'scripts/sendEmail.js'))).toBe(true);
  });

  it('should have robots.txt', () => {
    expect(fs.existsSync(path.resolve(ROOT, 'robots.txt'))).toBe(true);
  });

  it('should have sitemap.xml', () => {
    expect(fs.existsSync(path.resolve(ROOT, 'sitemap.xml'))).toBe(true);
  });
});

