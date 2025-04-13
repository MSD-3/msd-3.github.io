document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    const navItems = document.querySelectorAll('.nav-item a');
    
    // Toggle sidebar on hamburger click
    hamburger.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close sidebar when X is clicked
    closeBtn.addEventListener('click', function() {
        closeSidebar();
    });
    
    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', function() {
        closeSidebar();
    });
    
    // Close sidebar when a menu item is clicked (on mobile)
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Dark mode toggle functionality
    const themeButton = document.getElementById('theme-button');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateButtonText(savedTheme);
    } else {
        // Check if user prefers dark mode
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            htmlElement.setAttribute('data-theme', 'dark');
            updateButtonText('dark');
        }
    }
    
    themeButton.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateButtonText(newTheme);
    });
    
    function updateButtonText(theme) {
        const buttonText = document.querySelector('#theme-button span');
        buttonText.textContent = theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
    }
    
    // Improved highlight active section logic
    const sections = document.querySelectorAll('.section');
    const navItemLinks = document.querySelectorAll('.nav-item');
    
    // Initially highlight the About section when at the top of the page
    highlightAboutSection();
    
    // Check active section on scroll with throttling
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(function() {
                highlightActiveSection();
                isScrolling = false;
            }, 100);
        }
    });
    
    function highlightAboutSection() {
        // Clear any active classes
        navItemLinks.forEach(item => {
            item.classList.remove('active');
        });
        
        // Highlight the About section at the top of the page
        const aboutNavItem = document.querySelector('.nav-item a[href="#about"]');
        if (aboutNavItem) {
            aboutNavItem.parentElement.classList.add('active');
        }
    }
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        if (scrollY < 50) {
            highlightAboutSection();
            return;
        }
        
        let current = '';
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const offset = sectionId === 'about' ? 200 : 150;
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
            current = sections[sections.length - 1].getAttribute('id');
        }
        
        // Remove active class from all nav items
        navItemLinks.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current nav item
        if (current) {
            const activeNavItem = document.querySelector(`.nav-item a[href="#${current}"]`);
            if (activeNavItem) {
                activeNavItem.parentElement.classList.add('active');
            }
        }
    }
    
    // Check window resize to handle sidebar visibility
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset sidebar and overlay on desktop
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});