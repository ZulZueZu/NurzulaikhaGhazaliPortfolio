/* SIDEBAR */

const menuBtn = document.querySelector('#menu-btn');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-times');
    sidebar.classList.toggle('active');
    document.body.classList.toggle('active');
})

window.onscroll = () => {
    if(window.innerWidth < 1024){
        menuBtn.classList.remove('fa-times');
        sidebar.classList.remove('active');
        document.body.classList.remove('active');
    }
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.navbar a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    },
    { threshold: 0.6 } // 60% visible to trigger
);

sections.forEach((section) => observer.observe(section));



/* THEME BUTTON */

const themeBtn = document.querySelector('.theme-btn');
const themeToggle = document.querySelector('#theme-toggle');

themeBtn.addEventListener('click', () => {
    themeToggle.classList.toggle('fa-moon');
    themeToggle.classList.add('animate-toggle');
    document.body.classList.toggle('dark-theme');
});


/* TYPING */

const typingText = document.querySelector('.typing-text span');

const phrases = ['UI/UX Designer', 'Frontend Developer', 'Web Developer', 'Software Developer'];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
        currentCharIndex--;
    } else {
        currentCharIndex++;
    }
    typingText.textContent = currentPhrase.substring(0, currentCharIndex);
    let speed = isDeleting ? 100 : 200;
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        speed = 2000; // Pause
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Next phrase
    }

    setTimeout(typeAnimation, speed);
}

typeAnimation();

/* FOOTER */

document.getElementById('year').textContent = new Date().getFullYear();
