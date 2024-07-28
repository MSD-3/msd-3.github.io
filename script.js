document.addEventListener("DOMContentLoaded", function() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const fadeOutSections = document.querySelectorAll('.fade-out-section');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    const options = {
        threshold: [0.1, 0.9] // Adjust threshold for earlier fade-out
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.1) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, options);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    fadeOutSections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Downscroll
            navbar.classList.add('navbar-hidden');
        } else {
            // Upscroll
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollTop = scrollTop;
    });
});
