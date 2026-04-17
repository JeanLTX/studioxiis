document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileMenu.classList.toggle('active');
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing once active? (Optional)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal-text, .fade-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax Zoom Effect for Hero
    const parallaxImg = document.querySelector('.parallax-zoom');
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (parallaxImg) {
            parallaxImg.style.transform = `scale(${1 + scroll * 0.0003}) translateY(${scroll * 0.1}px)`;
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Form Submission Feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Obrigado! Recebemos sua mensagem e entraremos em contato em breve.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Scroll Spy - Highlight current section link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            // Allow exact match or if href contains `#${current}`
            const href = item.getAttribute('href');
            if (href === `#${current}` || href === `/#${current}` || href.includes(`#${current}`)) {
                item.classList.add('active');
            }
        });
    });

    // Testimonials Logic (Native Twitter Cards)
    function initTestimonials() {
        const container = document.getElementById('cards-container');
        if (!container) return;
        
        container.classList.add('twitter-testimonials-container');
        container.classList.remove('cards-container'); // cleanup old class

        const testimonials = [
            {
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
                username: "Maria S.",
                handle: "@maria_silva",
                content: "O Studio Xiis não apenas tirou fotos, eles capturaram nossa essência de família. O acompanhamento foi impecável. A emoção que sinto ao ver essas fotos é indescritível! 📸✨",
                date: "Mar 14, 2024",
                verified: true,
                likes: 124,
                retweets: 12
            },
            {
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
                username: "Carlos P.",
                handle: "@carlos_ceo",
                content: "Profissionais incríveis. As fotos corporativas deram outra cara para minha empresa e meu personal branding no LinkedIn decolou. O resultado final é de altíssimo padrão! 💼🚀",
                date: "Fev 28, 2024",
                verified: true,
                likes: 89,
                retweets: 5
            },
            {
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
                username: "Ana R.",
                handle: "@anaestilista",
                content: "Atemporal e sensível. A forma como a luz natural foi usada nas minhas fotos me deixou sem palavras. Recomendo o Thailon e a Thais de olhos fechados. Maravilhosos! 🤍",
                date: "Fev 15, 2024",
                verified: true,
                likes: 245,
                retweets: 34
            }
        ];
        
        // Reverse order so index 0 is Back, 1 is Middle, 2 is Front
        testimonials.reverse();

        container.innerHTML = '';
        const cards = [];

        testimonials.forEach((test, index) => {
            const card = document.createElement('div');
            card.className = 'twitter-card';
            card.setAttribute('data-index', index);
            card.style.zIndex = index; // 0, 1, 2 = back, middle, front
            
            card.innerHTML = `
                <div class="tc-header">
                    <div class="tc-avatar"><img src="${test.avatar}" alt="${test.username}"></div>
                    <div class="tc-info">
                        <div class="tc-name-wrap">
                            <span class="tc-name">${test.username}</span>
                            ${test.verified ? '<svg class="tc-verified" viewBox="0 0 22 22" fill="currentColor"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg>' : ''}
                        </div>
                        <span class="tc-handle">${test.handle}</span>
                    </div>
                    <svg class="tc-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </div>
                <div class="tc-content">${test.content}</div>
                <div class="tc-footer">
                    <span>${test.date}</span>
                    <div class="tc-stats">
                        <div class="tc-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg><span>${test.likes}</span></div>
                        <div class="tc-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg><span>${test.retweets}</span></div>
                    </div>
                </div>
            `;
            
            cards.push(card);
            container.appendChild(card);
        });

        // Hover Logic (Push cards down)
        function updateHover(hoverIndex) {
            cards.forEach((c, idx) => {
                c.classList.remove('pushed-y', 'pushed-y-x', 'pushed-y-xx');
                if (hoverIndex === 0 && idx === 1) c.classList.add('pushed-y-x');
                if (hoverIndex === 0 && idx === 2) c.classList.add('pushed-y-xx');
                if (hoverIndex === 1 && idx === 2) c.classList.add('pushed-y-xx'); // approx same push for front
            });
        }

        cards.forEach((card, idx) => {
            card.addEventListener('mouseenter', () => updateHover(idx));
            card.addEventListener('mouseleave', () => updateHover(null));

            // Click logic
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Previne que o evento suba para outros listeners
                
                const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                if (isTouchDevice) {
                    if (!card.classList.contains('active-tap')) {
                        cards.forEach(c => c.classList.remove('active-tap'));
                        card.classList.add('active-tap');
                        updateHover(idx);
                    }
                } else {
                    cards.forEach(c => c.classList.remove('active-tap'));
                    card.classList.add('active-tap');
                    updateHover(idx);
                }
            });
        });
    }
    
    // Initialize standard elements on DOM Load
    initTestimonials();

    // Initialize Swup for page transitions
    if (typeof window.Swup !== 'undefined') {
        const swup = new window.Swup();
        // Re-initialize scripts after page transition
        swup.hooks.on('page:view', () => {
            initTestimonials();
            // Re-bind intersection observers for new page elements
            const animatedElements = document.querySelectorAll('.reveal-text, .fade-up, .fade-in-left, .fade-in-right');
            animatedElements.forEach(el => observer.observe(el));
        });
    }
});
