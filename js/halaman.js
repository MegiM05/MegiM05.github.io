// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', function() {
        // Close all other accordion items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Scroll Animation
const animateElements = document.querySelectorAll('.animate');

function checkScroll() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('show');
        }
    });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations on load
window.addEventListener('load', function() {
    // Trigger initial animations
    checkScroll();
    
    // Add loaded class to body for any potential loading animations
    document.body.classList.add('loaded');
});

// Carousel Image Gallery with Swipe & Autoplay
document.addEventListener('DOMContentLoaded', function() {
    // 1. Pastikan ada container .gallery-section dan .gallery
    const gallerySection = document.querySelector('.gallery-section');
    const gallery = document.querySelector('.gallery');
    if (!gallerySection || !gallery) return;

    // 2. Ambil semua gambar dari .gallery
    const galleryImages = gallery.querySelectorAll('img');
    if (galleryImages.length === 0) return;

    // 3. Buat carousel container
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    carousel.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-track"></div>
        </div>
        <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
        <div class="carousel-dots"></div>
    `;
    gallerySection.appendChild(carousel);

    const carouselTrack = carousel.querySelector('.carousel-track');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let currentIndex = 0;
    let intervalId;
    const autoplayDelay = 3000;

    // 4. Generate carousel items & dots dari gambar aslinya
    galleryImages.forEach((img, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <img src="${img.src}" alt="${img.alt}">
            <div class="image-caption">${img.alt}</div>
        `;
        carouselTrack.appendChild(carouselItem);

        // Create dots
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // 5. Sembunyikan galeri asli (supaya tidak dobel)
    gallery.style.display = 'none';

    // Sisanya: sama seperti kode kamu (inialisasi, swipe, navigasi, autoplay, dsb)
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoplay();
    }

    function startAutoplay() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, autoplayDelay);
    }

    function resetAutoplay() {
        clearInterval(intervalId);
        startAutoplay();
    }

    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(intervalId);
    }, {passive: true});
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) nextSlide();
        else if (touchEndX > touchStartX + threshold) prevSlide();
    }

    // Button events
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Hover
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', () => startAutoplay());

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Init
    updateCarousel();
    startAutoplay();
});
