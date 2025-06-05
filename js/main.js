document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const loader = document.querySelector('.loader');
    setTimeout(function() {
        loader.classList.add('fade-out');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typing Effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ["Insights", "Innovation", "Solutions", "Success"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start the typing effect on load
    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const skillLevel = bar.parentElement.querySelector('.skill-info span:last-child').textContent;
            bar.style.width = skillLevel;
        });
    }
    
    // Animate skill bars when they come into view
    const skillsSection = document.querySelector('.about-skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentSlide = 0;
    
    // Create dots
    testimonialSlides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        testimonialDots.appendChild(dot);
    });
    
    // Show first slide
    showSlide(currentSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[n].classList.add('active');
        setTimeout(() => {
            testimonialSlides[n].style.opacity = '1';
        }, 10);
        
        dots[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
        // Reset timer when manually changing slides
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Technologies Slider Animation
    const techSlider = document.querySelector('.tech-slider');
    if (techSlider) {
        const techSlides = document.querySelectorAll('.tech-slide');
        const slideWidth = techSlides[0].offsetWidth;
        const slideMargin = parseInt(window.getComputedStyle(techSlides[0]).marginRight);
        const totalWidth = (slideWidth + slideMargin) * techSlides.length;
        
        // Duplicate slides for infinite effect
        techSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            techSlider.appendChild(clone);
        });
        
        let position = 0;
        const speed = 1;
        
        function animateSlider() {
            position -= speed;
            if (position <= -totalWidth) {
                position = 0;
            }
            techSlider.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateSlider);
        }
        
        animateSlider();
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Optional: Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields.');
                return;
            }

            // Simulate form submission (replace with actual API or service call if needed)
            // Example for Netlify / Formspree / custom backend integration can be added
            console.log("Form Data Submitted:", { name, email, subject, message });

            // Show success message
            alert('Thank you for contacting us, ' + name + '! We will get back to you shortly.');

            // Clear form fields
            contactForm.reset();
        });
    }
});
