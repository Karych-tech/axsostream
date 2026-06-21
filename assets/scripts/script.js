﻿﻿﻿/**
 * Main site script for AxoStream
 * Organized for future editing and maintenance.
 *
 * Section guide:
 * 1. DOM selectors
 * 2. Utility helpers
 * 3. Component initializers
 * 4. Event bindings
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ----------------------------------------------------------------------
       1. DOM Selectors
       ---------------------------------------------------------------------- */
    const fadeElements = document.querySelectorAll('.fade-in');
    const counters = document.querySelectorAll('.counter');
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    const pricingTables = document.querySelectorAll('.pricing-table');
    // This connects to the 'Order via WhatsApp' buttons in the pricing cards
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const backToTopButton = document.getElementById('back-to-top');

    const counterSpeed = 200;

    /* ----------------------------------------------------------------------
       2. Utility helpers
       ---------------------------------------------------------------------- */
    // Smoothly scrolls the window back to the very top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generates a pre-filled WhatsApp link based on the selected plan name
    const buildWhatsAppUrl = (planName) => {
        const message = encodeURIComponent(`I'm interested in the ${planName} IPTV plan.`);
        return `https://wa.me/212677510190?text=${message}`;
    };

    /* ----------------------------------------------------------------------
       3. Component initializers
       ---------------------------------------------------------------------- */
    // Uses IntersectionObserver to trigger 'fade-in' animations only when elements appear on screen
    // Performance Note: This is highly efficient as it doesn't run on every scroll tick.
    const initScrollReveal = () => {
        if (!fadeElements.length) return;

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, observerOptions);

        fadeElements.forEach((element) => revealObserver.observe(element));
    };

    // Logic to animate numbers from 0 to their target value
    const animateCounter = (counterElement) => {
        const targetValue = Number(counterElement.getAttribute('data-target')) || 0;
        const update = () => {
            const currentValue = Number(counterElement.innerText) || 0;
            // Adjust increment speed based on the target value
            const increment = targetValue / counterSpeed;

            if (currentValue < targetValue) {
                counterElement.innerText = Math.ceil(currentValue + increment);
                requestAnimationFrame(update);
            } else {
                counterElement.innerText = targetValue;
            }
        };

        update();
    };

    // Starts the counter animation only when the stats section is scrolled into view
    const initCounters = () => {
        if (!counters.length) return;

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 1.0 });

        counters.forEach((counter) => counterObserver.observe(counter));
    };

    // Handles switching between 'Standard' and 'Premium' pricing tables
    const initPricingToggle = () => {
        if (!pricingButtons.length || !pricingTables.length) return;

        pricingButtons.forEach((button) => {
            button.addEventListener('click', () => {
                pricingButtons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');

                const selectedType = button.getAttribute('data-type');
                pricingTables.forEach((table) => {
                    table.style.display = table.getAttribute('data-type') === selectedType ? 'flex' : 'none';
                });
            });
        });

        const defaultButton = document.querySelector('.pricing-btn.active') || pricingButtons[0];
        if (defaultButton) {
            defaultButton.click();
        }
    };

    // Logic for the WhatsApp order buttons
    const initWhatsAppButtons = () => {
        whatsappButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const planName = button.getAttribute('data-plan') || 'selected';
                window.open(buildWhatsAppUrl(planName), '_blank');
            });
        });
    };

    // Simple toggle for FAQ accordion items
    const initFAQAccordion = () => {
        faqQuestions.forEach((question) => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                faqItem?.classList.toggle('active');
            });
        });
    };

    // Ensures smooth scrolling when clicking links that point to an ID on the same page (e.g., #catalog)
    const initSmoothInternalLinks = () => {
        // Select links that are either fragments (#id) or root-relative fragments (/#id)
        document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href || href === '#' || href === '/#') return;
                
                // Extract the ID from the href (works for both "#id" and "/#id")
                const targetId = href.includes('#') ? '#' + href.split('#')[1] : null;
                if (!targetId) return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    };

    // Manages the visibility and functionality of the 'Back to Top' button
    const initBackToTop = () => {
        if (!backToTopButton) return;

        // Performance Note: This listener runs on every scroll move.
        window.addEventListener('scroll', () => {
            backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });

        // Trigger the scroll to top helper
        backToTopButton.addEventListener('click', scrollToTop);
    };

    /* ----------------------------------------------------------------------
       4. Initialize all components
       ---------------------------------------------------------------------- */
    initScrollReveal();
    initCounters();
    initPricingToggle();
    initWhatsAppButtons();
    initFAQAccordion();
    initSmoothInternalLinks();
    initBackToTop();
});
