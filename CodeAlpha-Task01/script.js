// Gallery Data
const galleryData = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", category: "nature", title: "Majestic Peaks", artist: "Elena Carter" },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", category: "nature", title: "Misty Valley", artist: "David Chen" },
    { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800", category: "nature", title: "Forest Serenity", artist: "Sophia Martinez" },
    { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800", category: "city", title: "Metropolis Nights", artist: "James Wilson" },
    { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800", category: "city", title: "Urban Geometry", artist: "Maria Garcia" },
    { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800", category: "city", title: "City Lights", artist: "Alex Turner" },
    //{ src: "https://images.unsplash.com/photo-1535268647677-300dbf7d6a1b?w=800", category: "animals", title: "Graceful Gaze", artist: "Oliver King" },
    { src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800", category: "animals", title: "Savannah Majesty", artist: "Emma Watson" },
    { src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800", category: "animals", title: "Wild Spirit", artist: "Liam Brown" }
];

let currentFilter = "all";
let currentIndex = 0;

// Render Gallery
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const filtered = currentFilter === "all" 
        ? galleryData 
        : galleryData.filter(img => img.category === currentFilter);
    
    grid.innerHTML = filtered.map((item, idx) => `
        <div class="gallery-item" data-index="${idx}" data-category="${item.category}">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-title">${item.title}</div>
                <div class="gallery-category">
                    <i class="fas ${getCategoryIcon(item.category)}"></i>
                    ${item.artist}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click events
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const originalIndex = galleryData.findIndex(img => img.src === imgSrc);
            currentIndex = originalIndex;
            openLightbox(currentIndex);
        });
    });
}

function getCategoryIcon(category) {
    switch(category) {
        case 'nature': return 'fa-tree';
        case 'city': return 'fa-building';
        case 'animals': return 'fa-dog';
        default: return 'fa-image';
    }
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderGallery();
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxCounter = document.getElementById('lightboxCounter');

function openLightbox(index) {
    const item = galleryData[index];
    lightboxImage.src = item.src;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = `${item.artist} • ${item.category.toUpperCase()}`;
    lightboxCounter.textContent = `${index + 1} / ${galleryData.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = galleryData.length - 1;
    if (currentIndex >= galleryData.length) currentIndex = 0;
    openLightbox(currentIndex);
}

// Event listeners
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
document.getElementById('prevImage').addEventListener('click', () => changeImage(-1));
document.getElementById('nextImage').addEventListener('click', () => changeImage(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('button, .gallery-item, .filter-btn, .nav-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = '#c0a080';
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
});

// Initial render
renderGallery();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});