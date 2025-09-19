// Universal FAQ Accordion Fix
(function() {
    'use strict';

    function initAllFAQs() {
        console.log('FAQ Fix: Initializing all FAQ accordions...');

        // Find all FAQ sections with the specific class pattern
        const faqSections = document.querySelectorAll('[class*="faq-section-"]');

        faqSections.forEach(section => {
            const className = section.className.match(/faq-section-(\d+)/);
            if (!className) return;

            const id = className[1];
            console.log(`FAQ Fix: Processing FAQ section ${id}`);

            const faqItems = section.querySelectorAll(`.faq-item-${id}`);

            faqItems.forEach(item => {
                const header = item.querySelector(`.faq-header-${id}`);

                if (!header) {
                    console.warn(`FAQ Fix: No header found for item in section ${id}`);
                    return;
                }

                // Remove any existing listeners first
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);

                // Add click event listener
                newHeader.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const isActive = item.classList.contains('active');

                    // Close all items in this section
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });

                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                        console.log(`FAQ Fix: Opened item in section ${id}`);
                    } else {
                        console.log(`FAQ Fix: Closed item in section ${id}`);
                    }
                });
            });

            console.log(`FAQ Fix: Initialized ${faqItems.length} items in section ${id}`);
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllFAQs);
    } else {
        // DOM is already ready, run immediately
        initAllFAQs();
    }

    // Also run after a delay in case content is dynamically loaded
    setTimeout(initAllFAQs, 1000);

    // Expose function globally for manual initialization if needed
    window.fixFAQAccordions = initAllFAQs;

    console.log('FAQ Fix: Script loaded and ready');
})();