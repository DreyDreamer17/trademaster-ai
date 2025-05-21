// Scroll Animation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation classes to elements
    const benefitsSection = document.querySelector('.benefits');
    const benefits = document.querySelectorAll('.benefit');
    const servicesSection = document.querySelector('.services');
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutSection = document.querySelector('.about');
    const aboutContent = document.querySelector('.about__content');

    // Add scroll classes to elements
    if (benefitsSection) {
        benefitsSection.querySelector('.benefits__title').classList.add('js-scroll', 'js-scroll--up');
        benefits.forEach(benefit => {
            benefit.classList.add('js-scroll', 'js-scroll--up');
        });
    }

    if (servicesSection) {
        servicesSection.querySelector('.services__title').classList.add('js-scroll', 'js-scroll--up');
        servicesSection.querySelector('.services__subtitle').classList.add('js-scroll', 'js-scroll--up');
        serviceCards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('js-scroll', 'js-scroll--left');
            } else {
                card.classList.add('js-scroll', 'js-scroll--right');
            }
        });
    }

    if (aboutSection) {
        aboutSection.querySelector('.about__title').classList.add('js-scroll', 'js-scroll--up');
        aboutContent.classList.add('js-scroll', 'js-scroll--up');
    }

    // Scroll animation function
    const scrollElements = document.querySelectorAll('.js-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // Initialize on load
    handleScrollAnimation();

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Typing effect for hero title (optional)
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;

        // Only clear and animate if we're going to run the animation
        // Otherwise keep the original text
        const runTypingEffect = false; // Set to true to enable typing effect

        if (runTypingEffect) {
            heroTitle.textContent = '';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };

            setTimeout(typeWriter, 500);
        }
    }
});
