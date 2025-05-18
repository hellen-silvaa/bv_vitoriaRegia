document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(function(element) {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.style.animationDelay = '0.2s';
                element.style.animationDuration = '0.8s';
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    
    checkIfInView();
    
    const carousel = document.querySelector('.carousel-inner');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let position = 0;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(${position}px)`;
    }
    
    nextBtn.addEventListener('click', function() {
        const carouselWidth = carousel.offsetWidth;
        const cardWidth = document.querySelector('.historia-card').offsetWidth + 20; // 20px é o margin
        
        if (position > -(carouselWidth - cardWidth * 3)) {
            position -= cardWidth;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        const cardWidth = document.querySelector('.historia-card').offsetWidth + 20;
        
        if (position < 0) {
            position += cardWidth;
            updateCarousel();
        }
    });
    
    function animateCounter(id, end, prefix = '') {
        const counter = document.getElementById(id);
        const duration = 2000; 
        const frameDuration = 1000 / 60; 
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        const animate = () => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(end * progress);
            
            counter.textContent = prefix + currentCount.toLocaleString();
            
            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter('counter-1', 500);
                animateCounter('counter-2', 400000, 'R$ ');
                animateCounter('counter-3', 350);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const numerosSection = document.querySelector('.numeros');
    if (numerosSection) {
        observer.observe(numerosSection);
    }
});
