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

// Image click functionality (only for anime series inside #Anime)
const animeImages = document.querySelectorAll('#Anime img');

animeImages.forEach(img => {
    img.addEventListener('click', (e) => {
        const card = img.closest('.anime-card');
        const animeName = card.querySelector('.anime-name').textContent;
        
        if (animeName.includes('NARUTO')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/sony/naruto-all-season-hindi-tamil-telugu-bengali-malayalam-episodes-download-hd/', '_blank');
        } else if (animeName.includes('DEMON SLAYER')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/demon-slayer-season-1-episodes-hindi-dubbed-download-hd-jio-cinema/', '_blank');
        } else if (animeName.includes('ATTACK ON TITAN')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/attack-on-titan-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('JUJUTSU KAISEN')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/crunchyroll/jujutsu-kaisen-season-1-hindi-dubbed-episodes-download-fhd/', '_blank');
        } else if (animeName.includes('SOLO LEVELING')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/solo-leveling-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('DRAGON BALL')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/dragon-ball-1986-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('DORAEMON')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/hindi-dub/doraemon-all-seasons-hindi-episodes-download-hd/', '_blank');
        } else if (animeName.includes('POKEMON')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/hindi-dub/pokemon-all-series-seasons-hindi-tamil-telugu-download-360p-480p-720p-hd-1080p-fhd/', '_blank');
        } else if (animeName.includes('ALYA')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/alya-sometimes-hides-her-feelings-in-russian-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('GETTING MARRIED')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/im-getting-married-to-a-girl-i-hate-in-my-class-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('CLASSROOM OF THE ELITE')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/classroom-of-the-elite-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('RENT-A-GIRLFRIEND')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/rent-a-girlfriend-season-1-episodes-hindi-dubbed-download-hd/', '_blank');
        } else if (animeName.includes('COUPLE OF CUCKOOS')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/a-couple-of-cuckoos-season-1-episodes-hindi-dubbed-download-hd/', '_blank');
        } else if (animeName.includes('SHIUNJI FAMILY')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/the-shiunji-family-children-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('DETECTIVE IS ALREADY DEAD')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/crunchyroll/the-detective-is-already-dead-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
        } else if (animeName.includes('DRESS-UP DARLING')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/my-dress-up-darling-season-1-episodes-hindi-dubbed-download-hd/', '_blank');
        } else if (animeName.includes('APOTHECARY DIARIES')) {
            e.stopPropagation();
            window.open('https://www.rareanimes.co/anime/the-apothecary-diaries-season-1-hindi-episodes-download/', '_blank');
        } else if (img.src) {
            window.open(img.src, '_blank');
        }
    });
});

// Smooth scrolling for navigation links (and keep tab in sync)
// Only intercept links that are in-page hash links (href starts with '#').
document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return; // don't hijack normal page links

    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = href.substring(1);

        // Disable smooth scrolling on low-end devices
        const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
        const scrollBehavior = isLowEndDevice ? 'auto' : 'smooth';

        if (targetId === 'home') {
            searchInput.value = '';
            document.querySelectorAll('#Anime .anime-card').forEach(card => card.style.display = '');
            noResults.classList.remove('show');
            suggestionsBox.classList.remove('show');
            window.scrollTo({ top: 0, behavior: scrollBehavior });
            showTab('Anime');
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: scrollBehavior });
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

    // Debounce search for low-end devices
    const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
    if (isLowEndDevice) {
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => performSearch(query), 300);
    } else {
        performSearch(query);
    }
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
    // Disable animations on low-end devices
    const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
    const animationStyle = isLowEndDevice ? '' : 'fadeIn 0.4s ease-in';

    cards.forEach(card => {
        const name = card.querySelector('.anime-name').textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            card.style.display = '';
            card.style.animation = animationStyle;
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

// Card click functionality (only for anime series inside #Anime, or movies if on movies page)
if (!isMoviesPage) {
    cards.forEach(card => {
        // Skip cards that are already links
        if (card.tagName === 'A') {
            return;
        }

        const animeName = card.querySelector('.anime-name').textContent;

        if (animeName.includes('NARUTO')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/sony/naruto-all-season-hindi-tamil-telugu-bengali-malayalam-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('DEMON SLAYER')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/demon-slayer-season-1-episodes-hindi-dubbed-download-hd-jio-cinema/', '_blank');
            });
        } else if (animeName.includes('ATTACK ON TITAN')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/attack-on-titan-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('JUJUTSU KAISEN')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/crunchyroll/jujutsu-kaisen-season-1-hindi-dubbed-episodes-download-fhd/', '_blank');
            });
        } else if (animeName.includes('SOLO LEVELING')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/solo-leveling-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('DRAGON BALL')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/dragon-ball-1986-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('DORAEMON')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/hindi-dub/doraemon-all-seasons-hindi-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('POKEMON')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/hindi-dub/pokemon-all-series-seasons-hindi-tamil-telugu-download-360p-480p-720p-hd-1080p-fhd/', '_blank');
            });
        } else if (animeName.includes('ALYA')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/alya-sometimes-hides-her-feelings-in-russian-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('GETTING MARRIED')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/im-getting-married-to-a-girl-i-hate-in-my-class-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('CLASSROOM OF THE ELITE')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/classroom-of-the-elite-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('RENT-A-GIRLFRIEND')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/rent-a-girlfriend-season-1-episodes-hindi-dubbed-download-hd/', '_blank');
            });
        } else if (animeName.includes('COUPLE OF CUCKOOS')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/a-couple-of-cuckoos-season-1-episodes-hindi-dubbed-download-hd/', '_blank');
            });
        } else if (animeName.includes('SHIUNJI FAMILY')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/the-shiunji-family-children-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('DETECTIVE IS ALREADY DEAD')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/crunchyroll/the-detective-is-already-dead-season-1-hindi-dubbed-episodes-download-hd/', '_blank');
            });
        } else if (animeName.includes('DRESS-UP DARLING')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/my-dress-up-darling-season-1-episodes-hindi-dubbed-download-hd/', '_blank');
            });
        } else if (animeName.includes('APOTHECARY DIARIES')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.rareanimes.co/anime/the-apothecary-diaries-season-1-hindi-episodes-download/', '_blank');
            });
        }
    });
}

// Tab switching logic (buttons added in header)
function showTab(id) {
    document.querySelectorAll('main section').forEach(section => {
        if (!section.id) return; // skip sections without id
        section.style.display = section.id === id ? '' : 'none';
    });

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

    // If switching to the Anime tab, make sure the page jumps to the top
    // of the Anime section (so the list starts from the beginning).
    const targetEl = document.getElementById(id);
    if (targetEl && id === 'Anime') {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const top = Math.max(0, targetEl.offsetTop - headerHeight);
        // Disable smooth scrolling on low-end devices
        const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
        const scrollBehavior = isLowEndDevice ? 'auto' : 'auto'; // Keep auto for tab switching
        window.scrollTo({ top, behavior: scrollBehavior });
    }
}

// Wire up tab buttons
document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        // Disable smooth scrolling on low-end devices
        const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
        const scrollBehavior = isLowEndDevice ? 'auto' : 'smooth';

        if (target === 'Movies') {
            // Navigate to movies page in the same tab if not already there
            if (!location.pathname.endsWith('movies.html')) {
                window.location.href = 'movies.html';
                return;
            }
            // already on movies page: show Movies section if present
            showTab('Movies');
            const el = document.getElementById('Movies');
            if (el) el.scrollIntoView({ behavior: scrollBehavior });
            return;
        }

        if (target === 'Anime') {
            // If we're on the movies page, go back to the main index
            if (location.pathname.endsWith('movies.html')) {
                window.location.href = 'index.html';
                return;
            }
            showTab('Anime');
            const targetElement = document.getElementById('Anime');
            if (targetElement) targetElement.scrollIntoView({ behavior: scrollBehavior });
        }
    });
});

// White light fall effect with JS-generated elements inside .light-overlay
function createLight() {
    let overlay = document.querySelector('.light-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'light-overlay';
        document.body.prepend(overlay);
    }
    // enforce a stricter cap on active lights to reduce DOM load
    if (window.__activeLightsCount === undefined) window.__activeLightsCount = 0;
    const maxLights = window.__maxLights || (window.matchMedia('(max-width: 768px)').matches ? 8 : 20);
    if (window.__activeLightsCount >= maxLights) return;

    const light = document.createElement('div');
    light.className = 'light';

    // Randomize visual properties via CSS variables
    const left = (Math.random() * 100).toFixed(2) + 'vw';
    // tiny star sizes (1 - 4px) but intense glow
    const size = (Math.random() * 3 + 1).toFixed(1) + 'px'; // 1 - 4px
    const dur = (Math.random() * 8 + 14).toFixed(2) + 's'; // 14 - 22s slower fall
    const delay = (Math.random() * 1.2).toFixed(2) + 's';
    const opacity = (Math.random() * 0.15 + 0.9).toFixed(2); // 0.9 - 1.05
    const twinkle = (Math.random() * 1.8 + 0.6).toFixed(2) + 's'; // 0.6 - 2.4s

    light.style.setProperty('--left', left);
    light.style.setProperty('--size', size);
    light.style.setProperty('--dur', dur);
    light.style.setProperty('--delay', delay);
    light.style.setProperty('--opacity', opacity);
    light.style.setProperty('--twinkle', twinkle);

    overlay.appendChild(light);
    window.__activeLightsCount++;

    // Remove after the animation duration to avoid memory growth
    const removeAfter = (parseFloat(dur) + 3) * 1000;
    setTimeout(() => {
        if (light && light.parentNode) light.parentNode.removeChild(light);
        window.__activeLightsCount = Math.max(0, window.__activeLightsCount - 1);
    }, removeAfter);
}

function startLightfall() {
    // create a small burst to begin with
    for (let i = 0; i < 4; i++) {
        setTimeout(createLight, i * 200);
    }

    // On mobile, slow generation and cap lights
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const interval = isMobile ? 1200 : 600; // slower generation to reduce load
    // store interval id so it could be cleared later if needed
    window.__lightfallInterval = setInterval(createLight, interval);
    return window.__lightfallInterval;
}

// Initialize tab on load (default to Anime)
window.addEventListener('load', () => {
    // Start the falling light effect only on devices with sufficient memory (>2GB RAM)
    const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;
    if (!isLowEndDevice) {
        try { startLightfall(); } catch (err) { /* non-fatal */ }
    }

    const isMoviesPage = location.pathname.endsWith('movies.html') || location.pathname.endsWith('/movies.html');
    const defaultHash = isMoviesPage ? '#Movies' : '#Anime';
    const hash = (location.hash || defaultHash).replace('#', '');
    if (document.getElementById(hash)) showTab(hash);
    else showTab(isMoviesPage ? 'Movies' : 'Anime');
});
