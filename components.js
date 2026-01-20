// Site-Wide Component Loader for SalesforceConsultants.io
// Loads shared header and footer components into all pages

(function() {
    'use strict';
    
    // Load component from file
    async function loadComponent(componentName) {
        try {
            const response = await fetch(`/components/${componentName}.html`);
            if (!response.ok) {
                console.warn(`Component ${componentName} not found, skipping...`);
                return null;
            }
            return await response.text();
        } catch (error) {
            console.warn(`Error loading component ${componentName}:`, error);
            return null;
        }
    }
    
    // Insert component into DOM
    function insertComponent(selector, html) {
        if (!html) return;
        
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = html;
            
            // Re-initialize any scripts that need to run after component load
            if (typeof initializeSite === 'function') {
                initializeSite();
            }
        }
    }
    
    // Load all components when DOM is ready
    document.addEventListener('DOMContentLoaded', async function() {
        // Load header if placeholder exists
        const headerPlaceholder = document.querySelector('#site-header-placeholder');
        if (headerPlaceholder) {
            const headerHtml = await loadComponent('header');
            if (headerHtml) {
                insertComponent('#site-header-placeholder', headerHtml);
            }
        }
        
        // Load footer if placeholder exists
        const footerPlaceholder = document.querySelector('#site-footer-placeholder');
        if (footerPlaceholder) {
            const footerHtml = await loadComponent('footer');
            if (footerHtml) {
                insertComponent('#site-footer-placeholder', footerHtml);
            }
        }
        
        // Alternative: Replace existing header/footer if they exist
        // This allows gradual migration
        const existingHeader = document.querySelector('header');
        const existingFooter = document.querySelector('footer');
        
        // Only replace if we have placeholders (for gradual migration)
        // Otherwise, components will be loaded via placeholders
    });
})();
