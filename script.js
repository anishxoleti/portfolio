/* ============================================
   PORTFOLIO JAVASCRIPT
   - Handles all interactive functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================
       ROTATING TEXT
       - Cycles through words defined in data-words attribute
       - Edit the data-words in HTML to change the words
       - Edit ROTATION_INTERVAL to change speed (milliseconds)
       ============================================ */
    const ROTATION_INTERVAL = 2500; // Time between word changes (ms)

    const rotatingText = document.querySelector('.rotating-text');

    if (rotatingText) {
        // Get words from data attribute (comma-separated)
        const words = rotatingText.dataset.words.split(',').map(w => w.trim());
        let currentIndex = 0;

        function rotateWord() {
            // Add fade-out animation
            rotatingText.classList.add('fade-out');

            setTimeout(() => {
                // Move to next word
                currentIndex = (currentIndex + 1) % words.length;
                rotatingText.textContent = words[currentIndex];

                // Switch to fade-in animation
                rotatingText.classList.remove('fade-out');
                rotatingText.classList.add('fade-in');

                setTimeout(() => {
                    rotatingText.classList.remove('fade-in');
                }, 300);
            }, 300);
        }

        // Start rotation
        setInterval(rotateWord, ROTATION_INTERVAL);
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       - Handles clicking on navigation links
       - Scrolls smoothly to target section
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ============================================
       NAVBAR SCROLL EFFECT
       - Adds/removes class based on scroll position
       - Can be used to change navbar appearance on scroll
       ============================================ */
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add 'scrolled' class when not at top
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    /* ============================================
       PROJECT CARD STACKING EFFECT
       - Cards stick and stack as you scroll
       - Adds visual depth with scale/shadow
       ============================================ */
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length > 0) {
        // Set z-index for stacking order (first card on top when stacked)
        projectCards.forEach((card, index) => {
            card.style.zIndex = projectCards.length - index;
        });

        // Optional: Add parallax/scale effect on scroll
        window.addEventListener('scroll', () => {
            projectCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const navHeight = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--nav-height'));

                // Check if card is stuck at top
                if (rect.top <= navHeight + 20) {
                    // Scale down slightly when stuck (creates depth)
                    const scale = Math.max(0.95, 1 - (index * 0.02));
                    card.style.transform = `scale(${scale})`;
                } else {
                    card.style.transform = '';
                }
            });
        });
    }

    /* ============================================
       INTERSECTION OBSERVER FOR ANIMATIONS
       - Adds 'visible' class when elements enter viewport
       - Use for fade-in animations on scroll
       ============================================ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.project-detail, .skill-category, .note-item')
        .forEach(el => observer.observe(el));

    /* ============================================
       CURRENT YEAR FOR COPYRIGHT
       - Automatically updates the year
       ============================================ */
    const copyrightYear = document.querySelector('.copyright');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace(/\d{4}/, year);
    }

});

/* ============================================
   OPTIONAL: CURSOR FOLLOWER
   - Uncomment to add custom cursor effect
   - Requires adding .cursor element to HTML
   ============================================ */
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
*/