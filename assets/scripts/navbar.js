/**
 * Navbar and Mobile Menu logic for AxoStream
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements for the navigation menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Helper function to check if the current screen width is mobile-sized
    const isMobileViewport = () => window.innerWidth <= 768;

    // Function to close the mobile menu by removing 'active' and 'toggle' classes
    const closeMobileMenu = () => {
        if (!navLinks) return;
        navLinks.classList.remove('active');
        hamburger?.classList.remove('toggle');
        // Prevents the background from scrolling when the menu is open
        document.body.classList.remove('menu-open');
    };

    // Function to toggle the mobile menu state
    const openMobileMenu = () => {
        if (!navLinks) return;
        navLinks.classList.toggle('active');
        hamburger?.classList.toggle('toggle');
        document.body.classList.toggle('menu-open');
    };

    // Main initialization for the hamburger menu events
    const initHamburgerMenu = () => {
        if (!hamburger || !navLinks) return;

        // Opens/Closes menu when clicking the hamburger icon
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            openMobileMenu();
        });

        // Closes the menu if the user clicks anywhere outside the navigation bar
        document.addEventListener('click', (event) => {
            if (!isMobileViewport()) return;
            if (navbar && !navbar.contains(event.target) && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Closes the mobile menu automatically when a link inside it is clicked
        document.querySelectorAll('.nav-links a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    };

    initHamburgerMenu();
});