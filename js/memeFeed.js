// Meme Feed JavaScript

// Sample meme data (in production, this would come from an API)
const sampleMemes = [
    {
        id: 1,
        title: "When you realize it's Monday",
        image: "https://via.placeholder.com/500x500/ff00ff/ffffff?text=Meme+1",
        category: "relatable",
        likes: 1247,
        comments: 89,
        votes: 892,
        author: "meme_lord_69",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#monday", "#relatable", "#work"],
        trending: true
    },
    {
        id: 2,
        title: "Tech support in a nutshell",
        image: "https://via.placeholder.com/500x500/00ffff/000000?text=Meme+2",
        category: "tech",
        likes: 2156,
        comments: 156,
        votes: 1834,
        author: "tech_memer",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#tech", "#support", "#funny"],
        trending: true
    },
    {
        id: 3,
        title: "Student life",
        image: "https://via.placeholder.com/500x500/00ff00/000000?text=Meme+3",
        category: "student",
        likes: 3421,
        comments: 234,
        votes: 2890,
        author: "student_memes",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#student", "#college", "#life"],
        trending: true
    },
    {
        id: 4,
        title: "Dark humor incoming",
        image: "https://via.placeholder.com/500x500/ffff00/000000?text=Meme+4",
        category: "dark",
        likes: 892,
        comments: 67,
        votes: 623,
        author: "dark_jokes",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#dark", "#humor"],
        trending: false
    },
    {
        id: 5,
        title: "Just another day",
        image: "https://via.placeholder.com/500x500/cc00ff/ffffff?text=Meme+5",
        category: "funny",
        likes: 567,
        comments: 45,
        votes: 489,
        author: "daily_memes",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#funny", "#daily"],
        trending: false
    },
    {
        id: 6,
        title: "Relatable content",
        image: "https://via.placeholder.com/500x500/ff00ff/ffffff?text=Meme+6",
        category: "relatable",
        likes: 1234,
        comments: 98,
        votes: 1056,
        author: "relatable_memes",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#relatable", "#life"],
        trending: false
    },
    {
        id: 7,
        title: "Tech problems",
        image: "https://via.placeholder.com/500x500/00ffff/000000?text=Meme+7",
        category: "tech",
        likes: 789,
        comments: 56,
        votes: 678,
        author: "tech_humor",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#tech", "#problems"],
        trending: false
    },
    {
        id: 8,
        title: "College struggles",
        image: "https://via.placeholder.com/500x500/00ff00/000000?text=Meme+8",
        category: "student",
        likes: 1456,
        comments: 123,
        votes: 1234,
        author: "college_memes",
        authorAvatar: "https://via.placeholder.com/40",
        tags: ["#student", "#college", "#struggles"],
        trending: false
    }
];

let currentPage = 1;
const memesPerPage = 8;

// Load trending memes
function loadTrendingMemes() {
    const trendingContainer = document.getElementById('trendingMemes');
    if (!trendingContainer) return;
    
    const trending = sampleMemes.filter(meme => meme.trending);
    trendingContainer.innerHTML = trending.map(meme => createMemeCard(meme)).join('');
}

// Load latest memes
function loadLatestMemes() {
    const latestContainer = document.getElementById('latestMemes');
    if (!latestContainer) return;
    
    const start = (currentPage - 1) * memesPerPage;
    const end = start + memesPerPage;
    const memesToShow = sampleMemes.slice(start, end);
    
    if (currentPage === 1) {
        latestContainer.innerHTML = memesToShow.map(meme => createMemeCard(meme)).join('');
    } else {
        latestContainer.innerHTML += memesToShow.map(meme => createMemeCard(meme)).join('');
    }
}

// Create meme card HTML
function createMemeCard(meme) {
    return `
        <div class="meme-card bg-gray-900 rounded-lg overflow-hidden border border-gray-800" data-category="${meme.category}">
            <a href="meme.html?id=${meme.id}">
                <img src="${meme.image}" alt="${meme.title}" class="w-full h-auto cursor-pointer">
            </a>
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <img src="${meme.authorAvatar}" alt="${meme.author}" class="w-8 h-8 rounded-full border-2 border-neon-cyan">
                        <span class="text-sm text-neon-cyan">@${meme.author}</span>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full bg-gray-800 text-neon-pink">${meme.category}</span>
                </div>
                <h3 class="font-semibold mb-3 text-white">${meme.title}</h3>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${meme.tags.map(tag => `<span class="text-xs text-neon-green hover:text-neon-cyan cursor-pointer">${tag}</span>`).join('')}
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button onclick="handleLike(${meme.id})" class="flex items-center space-x-1 text-gray-400 hover:text-neon-pink transition">
                            <span>❤️</span>
                            <span id="likes-${meme.id}">${meme.likes}</span>
                        </button>
                        <button onclick="handleUpvote(${meme.id})" class="flex items-center space-x-1 text-gray-400 hover:text-neon-green transition">
                            <span>⬆️</span>
                            <span id="votes-${meme.id}">${meme.votes}</span>
                        </button>
                        <a href="meme.html?id=${meme.id}" class="flex items-center space-x-1 text-gray-400 hover:text-neon-cyan transition">
                            <span>💬</span>
                            <span>${meme.comments}</span>
                        </a>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="shareMeme('whatsapp', ${meme.id})" class="text-gray-400 hover:text-green-400 transition" title="Share on WhatsApp">📱</button>
                        <button onclick="shareMeme('twitter', ${meme.id})" class="text-gray-400 hover:text-blue-400 transition" title="Share on X">🐦</button>
                        <button onclick="toggleSave(${meme.id})" id="save-btn-${meme.id}" class="text-gray-400 hover:text-neon-pink transition" title="Save">🔖</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load more memes (infinite scroll)
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            loadLatestMemes();
            // In a real app, you'd check if there are more memes to load
        });
    }
    
    // Infinite scroll implementation
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            currentPage++;
            loadLatestMemes();
        }
    });
});

