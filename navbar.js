// navbar.js
let lastScrollTop = 0;
const navbar = document.getElementById('navbar-container');

window.addEventListener('scroll', function() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden-navbar');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden-navbar');
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
});

const hamburger = document.getElementById("hamburger-menu");
const navMenu = document.querySelector(".navigation-list-container");

function toggleMenu() {
    navMenu.classList.toggle("active");
}

// Toggle menu on click, touchstart, or mousedown
hamburger.addEventListener("click", toggleMenu);
hamburger.addEventListener("touchstart", toggleMenu);
hamburger.addEventListener("mousedown", toggleMenu);


// Hide menu on scroll for mobile
window.addEventListener("scroll", () => {
    if (window.innerWidth <= 640) {
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }
    }
});