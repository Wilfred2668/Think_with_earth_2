document.addEventListener('DOMContentLoaded', function() {
    initNavToggle();
    initFaqAccordion();
    initScrollAnimations();
    initFormSubmission();
    animateHeroElements();
    initScrollIndicator();
    initCountdown();
});

function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');

            if (navToggle.classList.contains('active')) {
                navToggle.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                navToggle.children[1].style.opacity = '0';
                navToggle.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                navToggle.children[0].style.transform = 'none';
                navToggle.children[1].style.opacity = '1';
                navToggle.children[2].style.transform = 'none';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.children[0].style.transform = 'none';
                navToggle.children[1].style.opacity = '1';
                navToggle.children[2].style.transform = 'none';
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.children[0].style.transform = 'none';
            navToggle.children[1].style.opacity = '1';
            navToggle.children[2].style.transform = 'none';
        }
    });
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });
}

function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    document.querySelectorAll('.section-title, .about-text, .about-image, .track-card, .timeline-item, .faq-item, .contact-form, .contact-info').forEach(el => {
        if (!el.classList.contains('scroll-animation')) {
            el.classList.add('scroll-animation');
        }
    });

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;

        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            }
        });
    };

    const throttle = (callback, delay) => {
        let previousCall = new Date().getTime();
        return function() {
            const time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    };

    window.addEventListener('scroll', throttle(handleScrollAnimation, 100));

    handleScrollAnimation();
}

function initCursorInteractivity() {
    const hero = document.querySelector('.hero');

    if (!hero) return;

    hero.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        const distance = Math.sqrt(x * x + y * y);

        const highlight = document.querySelector('.highlight');
        if (highlight) {
            const intensity = Math.max(0.5, 1 - distance * 2);
            highlight.style.textShadow = `0 0 ${10 + intensity * 15}px rgba(57, 255, 20, ${0.5 + intensity * 0.5})`;
        }
    });
}

function initFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {

                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = newsletterForm.querySelector('input[type="email"]').value;

            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter your email address.');
            }
        });
    }
}

function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');

    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroSubtitle) {
        heroSubtitle.classList.add('fade-in');
        heroSubtitle.classList.add('delay-1');
    }
    if (ctaButton) {
        ctaButton.classList.add('fade-in');
        ctaButton.classList.add('delay-2');
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const pageProgress = document.querySelector('.page-progress');

    window.addEventListener('scroll', function() {

        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        scrollIndicator.style.height = `${scrollPercentage}%`;

        pageProgress.style.width = `${scrollPercentage}%`;

        const sections = ['home', 'about', 'tracks', 'timeline', 'faq', 'contact'];
        let nearSection = false;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();

                if (rect.top > -100 && rect.top < 100) {
                    nearSection = true;
                }
            }
        });

        if (nearSection) {
            scrollIndicator.classList.add('pulse');
            setTimeout(() => {
                scrollIndicator.classList.remove('pulse');
            }, 500);
        }
    });

    window.dispatchEvent(new Event('scroll'));
}

function initCountdown() {

    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 10);

    function updateCountdown() {
        const currentDate = new Date();
        const difference = eventDate - currentDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (difference < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').innerHTML = '<div class="countdown-title">Event has started!</div>';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}