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

const animeURLMap = {
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

animeImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = img.closest('.anime-card');
        const animeName = card.querySelector('.anime-name').textContent.replace('Anime:- ', '');
        const url = Object.entries(animeURLMap).find(([key]) => animeName.includes(key))?.[1];
        window.open(url || img.src, '_blank');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        if (targetId === 'home') {
            searchInput.value = '';
            animeCards.forEach(card => card.style.display = '');
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
        animeCards.forEach(card => card.style.display = '');
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
            card.style.display = '';
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

// Anime card click functionality
animeCards.forEach(card => {
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