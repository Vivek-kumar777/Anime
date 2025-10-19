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
notification.innerHTML = `<span class="notice-label">Notice:- </span><span class="scroll-text start-scroll">${notificationText}</span>`;

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
        
        if (targetId === 'home') {
            searchInput.value = '';
            animeCards.forEach(card => card.style.display = 'flex');
            noResults.classList.remove('show');
            suggestionsBox.classList.remove('show');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Get elements
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');
const animeCards = document.querySelectorAll('.anime-card');
const noResults = document.getElementById('no-results');

const animeList = Array.from(animeCards).map(card => {
    const name = card.querySelector('.anime-name').textContent.replace('Anime:- ', '').trim();
    return { name, element: card };
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        suggestionsBox.classList.remove('show');
        animeCards.forEach(card => card.style.display = 'flex');
        noResults.classList.remove('show');
        return;
    }
    
    const matches = animeList.filter(anime => 
        anime.name.toLowerCase().includes(query)
    );
    
    if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(anime => 
            `<div class="suggestion-item" data-name="${anime.name}">${anime.name}</div>`
        ).join('');
        suggestionsBox.classList.add('show');
        
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const animeName = item.dataset.name;
                searchInput.value = animeName;
                filterAnime(animeName);
                suggestionsBox.classList.remove('show');
            });
        });
    } else {
        suggestionsBox.innerHTML = '<div class="suggestion-item">No anime found</div>';
        suggestionsBox.classList.add('show');
    }
    
    filterAnime(query);
});

function filterAnime(query) {
    let visibleCount = 0;
    animeCards.forEach(card => {
        const name = card.querySelector('.anime-name').textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease-in';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (visibleCount === 0) {
        noResults.classList.add('show');
    } else {
        noResults.classList.remove('show');
    }
}

document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.remove('show');
    }
});