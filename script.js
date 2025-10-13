// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Update button icon
    if (body.classList.contains('light-theme')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
    }
});

// Notification functionality
const notification = document.querySelector('.Notiflication');
const notificationText = '🎌 Notice to All Anime Fans! 🎌 New updates are live on our anime channel! 🚀 From fresh episode reviews to fan theories and quizzes, we\'re leveling up your anime experience. Stay tuned, explore, and don\'t forget to share your favorite moments with us! 💬✨ 📅 Updated weekly | 📺 Powered by passion for anime';
notification.innerHTML = `<span class="scroll-text start-scroll">${notificationText}</span>`;

// Image click functionality
const animeImages = document.querySelectorAll('.Anime.image img');

animeImages.forEach(img => {
    img.addEventListener('click', () => {
        if (img.src) {
            window.open(img.src, '_blank');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});