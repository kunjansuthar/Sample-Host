/**
 * CRILOF Luxury Brand E-Commerce Static Enhancements
 * - Smooth Back-to-Top Button
 * - Mobile Navigation Synchronization
 * - FAQ Accordion and Search Integration
 */
(function () {
  'use strict';

  // 1. Back-To-Top Button Functionality
  document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
      const handleScroll = function () {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollY > 250) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // 2. FAQ Accordion Click Handler (if present)
    const faqButtons = document.querySelectorAll('.faq-header-btn');
    faqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const isAlreadyActive = btn.classList.contains('active');
        const collapseBody = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-q-icon i');

        // Toggle this FAQ
        if (isAlreadyActive) {
          btn.classList.remove('active');
          if (collapseBody) collapseBody.classList.remove('show');
          if (icon) {
            icon.className = 'fas fa-plus';
          }
        } else {
          btn.classList.add('active');
          if (collapseBody) collapseBody.classList.add('show');
          if (icon) {
            icon.className = 'fas fa-minus';
          }
        }
      });
    });

    // 3. Mobile Nav Drawer Theme Buttons Sync
    const mobileThemeBtns = document.querySelectorAll('.mobile-theme-btn');
    mobileThemeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const theme = btn.getAttribute('data-bs-theme-value');
        if (!theme) return;

        localStorage.setItem('theme', theme);
        if (theme === 'auto') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
        } else {
          document.documentElement.setAttribute('data-bs-theme', theme);
        }

        mobileThemeBtns.forEach(b => b.classList.toggle('active', b === btn));

        // Sync desktop theme icons if present
        document.querySelectorAll('.color-modes').forEach(function (cm) {
          const target = cm.querySelector('[data-bs-theme-value="' + theme + '"]');
          if (target) {
            cm.querySelectorAll('[data-bs-theme-value]').forEach(el => el.classList.remove('active'));
            target.classList.add('active');
            const svgUse = target.querySelector('svg use');
            const activeUse = cm.querySelector('.theme-icon-active use');
            if (svgUse && activeUse) {
              activeUse.setAttribute('href', svgUse.getAttribute('href'));
            }
          }
        });
      });
    });

    // 4. Live FAQ Search Filter (if present on FAQs page)
    const faqSearchInput = document.getElementById('faqSearch');
    const faqNoResults = document.getElementById('faqNoResults');
    if (faqSearchInput) {
      faqSearchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        const items = document.querySelectorAll('.faq-item');
        const sections = document.querySelectorAll('.faq-section-row');
        let matchedCount = 0;

        items.forEach(function (item) {
          const text = ((item.getAttribute('data-faq-text') || '') + ' ' + item.textContent).toLowerCase();
          const matches = !query || text.includes(query);
          item.style.display = matches ? '' : 'none';
          if (matches) matchedCount++;
        });

        sections.forEach(function (sec) {
          const visibleInSec = sec.querySelectorAll('.faq-item:not([style*="display: none"])');
          sec.style.display = (visibleInSec.length > 0 || !query) ? '' : 'none';
        });

        if (faqNoResults) {
          faqNoResults.classList.toggle('d-none', matchedCount > 0 || !query);
        }
      });
    }
  });
})();

