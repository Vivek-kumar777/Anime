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

const animeLinks = {
    'NARUTO': 'https://www.rareanimes.co/sony/naruto-all-season-hindi-tamil-telugu-bengali-malayalam-episodes-download-hd/',
    'DEMON SLAYER': 'https://www.rareanimes.co/anime/demon-slayer-season-1-episodes-hindi-dubbed-download-hd-jio-cinema/',
    'ATTACK ON TITAN': 'https://www.rareanimes.co/anime/attack-on-titan-season-1-hindi-dubbed-episodes-download-hd/',
    'JUJUTSU KAISEN': 'https://www.rareanimes.co/crunchyroll/jujutsu-kaisen-season-1-hindi-dubbed-episodes-download-fhd/',
    'SOLO LEVELING': 'https://www.rareanimes.co/anime/solo-leveling-season-1-hindi-dubbed-episodes-download-hd/',
    'DRAGON BALL': 'https://www.rareanimes.co/anime/dragon-ball-1986-hindi-dubbed-episodes-download-hd/',
    'DORAEMON': 'https://www.rareanimes.co/hindi-dub/doraemon-all-seasons-hindi-episodes-download-hd/',
    'POKEMON': 'https://www.rareanimes.co/hindi-dub/pokemon-all-series-seasons-hindi-tamil-telugu-download-360p-480p-720p-hd-1080p-fhd/',
    'ALYA': 'https://www.rareanimes.co/anime/alya-sometimes-hides-her-feelings-in-russian-season-1-hindi-dubbed-episodes-download-hd/',
    'GETTING MARRIED': 'https://www.rareanimes.co/anime/im-getting-married-to-a-girl-i-hate-in-my-class-season-1-hindi-dubbed-episodes-download-hd/',
    'CLASSROOM OF THE ELITE': 'https://www.rareanimes.co/anime/classroom-of-the-elite-season-1-hindi-dubbed-episodes-download-hd/',
    'RENT-A-GIRLFRIEND': 'https://www.rareanimes.co/anime/rent-a-girlfriend-season-1-episodes-hindi-dubbed-download-hd/',
    'COUPLE OF CUCKOOS': 'https://www.rareanimes.co/anime/a-couple-of-cuckoos-season-1-episodes-hindi-dubbed-download-hd/',
    'SHIUNJI FAMILY': 'https://www.rareanimes.co/anime/the-shiunji-family-children-season-1-hindi-dubbed-episodes-download-hd/',
    'DETECTIVE IS ALREADY DEAD': 'https://www.rareanimes.co/crunchyroll/the-detective-is-already-dead-season-1-hindi-dubbed-episodes-download-hd/',
    'DRESS-UP DARLING': 'https://www.rareanimes.co/anime/my-dress-up-darling-season-1-episodes-hindi-dubbed-download-hd/',
    'APOTHECARY DIARIES': 'https://www.rareanimes.co/anime/the-apothecary-diaries-season-1-hindi-episodes-download/'
};

document.querySelectorAll('#Anime img').forEach(img => {
    img.addEventListener('click', (e) => {
        const card = img.closest('.anime-card');
        const animeName = card.querySelector('.anime-name').textContent;
        
        for (const [key, url] of Object.entries(animeLinks)) {
            if (animeName.includes(key)) {
                e.stopPropagation();
                window.open(url, '_blank');
                return;
            }
        }
        if (img.src) window.open(img.src, '_blank');
    });
});

document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return;

    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = href.substring(1);

        if (targetId === 'home') {
            searchInput.value = '';
            document.querySelectorAll('#Anime .anime-card').forEach(card => card.style.display = '');
            noResults.classList.remove('show');
            suggestionsBox.classList.remove('show');
            window.scrollTo({ top: 0, behavior: 'auto' });
            showTab('Anime');
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'auto' });
            }
            showTab(targetId);
        }
    });
});

// Get elements
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');
const noResults = document.getElementById('no-results');

// Determine if we're on movies page
const isMoviesPage = location.pathname.endsWith('movies.html') || location.pathname.endsWith('/movies.html');
const cardsSelector = isMoviesPage ? '#Movies .anime-card' : '#Anime .anime-card';
const cards = document.querySelectorAll(cardsSelector);

const itemList = Array.from(cards).map(card => {
    const name = card.querySelector('.anime-name').textContent.replace(/^(Anime:-|Movie:-)\s*/i, '').trim();
    return { name, element: card };
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        suggestionsBox.classList.remove('show');
        cards.forEach(card => card.style.display = '');
        noResults.classList.remove('show');
        return;
    }

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => performSearch(query), 200);
});

function performSearch(query) {
    const matches = itemList.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(item =>
            `<div class="suggestion-item" data-name="${item.name}">${item.name}</div>`
        ).join('');
        suggestionsBox.classList.add('show');

        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemName = item.dataset.name;
                searchInput.value = itemName;
                filterItems(itemName);
                suggestionsBox.classList.remove('show');
            });
        });
    } else {
        suggestionsBox.innerHTML = '<div class="suggestion-item">No items found</div>';
        suggestionsBox.classList.add('show');
    }

    filterItems(query);
}

function filterItems(query) {
    let visibleCount = 0;

    cards.forEach(card => {
        const name = card.querySelector('.anime-name').textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            card.style.display = '';
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

if (!isMoviesPage) {
    cards.forEach(card => {
        if (card.tagName === 'A') return;

        const animeName = card.querySelector('.anime-name').textContent;
        
        for (const [key, url] of Object.entries(animeLinks)) {
            if (animeName.includes(key)) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => window.open(url, '_blank'));
                break;
            }
        }
    });
}

// Tab switching logic with smooth fade animation
function showTab(id) {
    const sections = document.querySelectorAll('main section');
    const targetSection = document.getElementById(id);
    
    sections.forEach(section => {
        if (!section.id || section === targetSection) return;
        if (section.style.display !== 'none') {
            section.classList.add('fade-out');
            setTimeout(() => {
                section.style.display = 'none';
                section.classList.remove('fade-out');
            }, 300);
        }
    });

    if (targetSection) {
        targetSection.style.display = '';
        targetSection.classList.add('fade-out');
        setTimeout(() => targetSection.classList.remove('fade-out'), 10);
    }

    // update merged switch buttons active state
    document.querySelectorAll('.switch-btn').forEach(btn => {
        const isActive = btn.dataset.target === id;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // update url hash without scrolling
    if (history.replaceState) {
        history.replaceState(null, '', '#' + id);
    } else {
        location.hash = '#' + id;
    }


}

document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        if (target === 'Movies') {
            if (!location.pathname.endsWith('movies.html')) {
                window.location.href = 'movies.html';
                return;
            }
            showTab('Movies');
            window.scrollTo({ top: 0, behavior: 'auto' });
            return;
        }

        if (target === 'Anime') {
            if (location.pathname.endsWith('movies.html')) {
                window.location.href = 'index.html';
                return;
            }
            showTab('Anime');
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    });
});

// White light fall effect - optimized for performance
function createLight() {
    const overlay = document.querySelector('.light-overlay');
    if (!overlay) return;
    
    if (window.__activeLightsCount === undefined) window.__activeLightsCount = 0;
    const maxLights = 12;
    if (window.__activeLightsCount >= maxLights) return;

    const light = document.createElement('div');
    light.className = 'light';

    const left = (Math.random() * 100).toFixed(0) + 'vw';
    const size = '3px';
    const dur = (Math.random() * 6 + 16).toFixed(0) + 's';
    const delay = (Math.random() * 1).toFixed(1) + 's';
    const opacity = '1';

    light.style.setProperty('--left', left);
    light.style.setProperty('--size', size);
    light.style.setProperty('--dur', dur);
    light.style.setProperty('--delay', delay);
    light.style.setProperty('--opacity', opacity);

    overlay.appendChild(light);
    window.__activeLightsCount++;

    setTimeout(() => {
        if (light && light.parentNode) light.parentNode.removeChild(light);
        window.__activeLightsCount--;
    }, (parseFloat(dur) + 2) * 1000);
}

function startLightfall() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;
    
    const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 4;
    if (isLowEndDevice) return;

    for (let i = 0; i < 3; i++) {
        setTimeout(createLight, i * 300);
    }

    window.__lightfallInterval = setInterval(createLight, 1500);
}

// Initialize tab on load
window.addEventListener('load', () => {
    try { startLightfall(); } catch (err) {}

    const isMoviesPage = location.pathname.endsWith('movies.html');
    const defaultHash = isMoviesPage ? '#Movies' : '#Anime';
    const hash = (location.hash || defaultHash).replace('#', '');
    if (document.getElementById(hash)) showTab(hash);
    else showTab(isMoviesPage ? 'Movies' : 'Anime');
});