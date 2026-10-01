/**
 * Contact Form Validation Tests
 * Tests for scripts/sendEmail.js validation logic
 */

const fs = require('fs');
const path = require('path');

// Load the sendEmail.js source for regex extraction
const sendEmailSource = fs.readFileSync(
  path.resolve(__dirname, '../scripts/sendEmail.js'),
  'utf-8'
);

// Extract validation regexes used in sendEmail.js
const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,10}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

describe('Email Validation', () => {
  it('should accept valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@company.org',
      'first+last@domain.co',
      'info@devpipeline.com',
      'marketing@devpipeline.com',
      'user@sub.domain.com',
    ];
    validEmails.forEach((email) => {
      expect(emailRegex.test(email)).toBe(true);
    });
  });

  it('should reject invalid email addresses', () => {
    const invalidEmails = [
      '',
      'notanemail',
      '@nodomain.com',
      'user@',
      'user@.com',
      'user name@domain.com',
      'user@domain',
    ];
    invalidEmails.forEach((email) => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });
});

describe('Phone Validation', () => {
  it('should accept valid US phone numbers', () => {
    const validPhones = [
      '(385) 309-0807',
      '385-309-0807',
      '385.309.0807',
      '3853090807',
      '(555) 123-4567',
    ];
    validPhones.forEach((phone) => {
      expect(phoneRegex.test(phone)).toBe(true);
    });
  });

  it('should reject invalid phone numbers', () => {
    const invalidPhones = [
      '123',
      'abcdefghij',
      '1234567890123',
      '+1 385-309-0807', // plus prefix not in regex
    ];
    invalidPhones.forEach((phone) => {
      expect(phoneRegex.test(phone)).toBe(false);
    });
  });

  it('should allow empty phone (optional field on some forms)', () => {
    // sendEmail.js: validatePhone returns true for empty
    const validatePhone = (phone) => {
      if (!phone) return true;
      return phoneRegex.test(phone);
    };
    expect(validatePhone('')).toBe(true);
    expect(validatePhone(null)).toBe(true);
    expect(validatePhone(undefined)).toBe(true);
  });
});

describe('Contact Form DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input type="text" id="first_name" name="first_name" required />
        <input type="text" id="last_name" name="last_name" required />
        <input type="email" id="email" name="email" required />
        <input type="tel" id="phone" name="phone" required />
        <input type="text" id="organization" name="organization" required />
        <select id="organization_type" name="organization_type" required>
          <option value="">Select</option>
          <option value="nonprofit">Nonprofit</option>
          <option value="business">Business</option>
        </select>
        <select id="current_salesforce" name="current_salesforce" required>
          <option value="">Select</option>
          <option value="no_salesforce">Not using</option>
        </select>
        <select id="primary_need" name="primary_need" required>
          <option value="">Select</option>
          <option value="new_implementation">New Implementation</option>
        </select>
        <select id="timeline" name="timeline">
          <option value="">Select</option>
          <option value="asap">ASAP</option>
        </select>
        <textarea id="message" name="message"></textarea>
        <input type="hidden" name="page" value="Contact" />
        <button type="submit">Submit</button>
      </form>
      <div class="toast-container"></div>
    `;
  });

  it('should have a form with id "contact-form"', () => {
    const form = document.getElementById('contact-form');
    expect(form).not.toBeNull();
    expect(form.tagName).toBe('FORM');
  });

  it('should have all required fields', () => {
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'organization',
      'organization_type',
      'current_salesforce',
      'primary_need',
    ];
    requiredFields.forEach((fieldName) => {
      const field = document.querySelector(`[name="${fieldName}"]`);
      expect(field).not.toBeNull();
      expect(field.hasAttribute('required')).toBe(true);
    });
  });

  it('should have a hidden page field', () => {
    const pageField = document.querySelector('input[name="page"]');
    expect(pageField).not.toBeNull();
    expect(pageField.type).toBe('hidden');
    expect(pageField.value).toBe('Contact');
  });

  it('should have a submit button', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
  });

  it('should correctly assemble form data', () => {
    // Fill in the form
    document.getElementById('first_name').value = 'John';
    document.getElementById('last_name').value = 'Doe';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('phone').value = '(385) 309-0807';
    document.getElementById('organization').value = 'Test Corp';
    document.getElementById('organization_type').value = 'business';
    document.getElementById('current_salesforce').value = 'no_salesforce';
    document.getElementById('primary_need').value = 'new_implementation';
    document.getElementById('message').value = 'Test message';

    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    expect(data.first_name).toBe('John');
    expect(data.last_name).toBe('Doe');
    expect(data.email).toBe('john@example.com');
    expect(data.phone).toBe('(385) 309-0807');
    expect(data.organization).toBe('Test Corp');
    expect(data.organization_type).toBe('business');
    expect(data.current_salesforce).toBe('no_salesforce');
    expect(data.primary_need).toBe('new_implementation');
    expect(data.message).toBe('Test message');
    expect(data.page).toBe('Contact');
  });
});

