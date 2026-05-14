// ================================
// COLLECTION DATA
// ================================
// YOUR CURRENT COLLECTION - Items you already own
const collection = [
    {
        name: "Portgas. D. Ace",
        type: "funko", // or "figure"
        image: "portgas-d-ace(100).jpeg", // Add image filename when you have it, or leave empty for placeholder
        value: 20 // Estimated value in dollars
    },
    {
        name: "Aokiji",
        type: "figure",
        image: "aokiji-figure.jpeg",
        value: 85
    },
    {
        name: "Roronoa Zoro",
        type: "funko",
        image: "roronoa-zoro(923).jpeg",
        value: 27
    },
    {
        name: "Usohachi",
        type: "funko",
        image: "usohachi(1474).jpeg",
        value: 24
    },
    {
        name: "Franosuke",
        type: "funko",
        image: "franosuke(1476).jpeg",
        value: 30
    },
    {
        name: "Chopperemon",
        type: "funko",
        image: "chopperemon(1471).jpeg",
        value: 22
    },
    {
        name: "Kaido",
        type: "funko",
        image: "kaido(1267).jpeg",
        value: 55
    },
    {
        name: "Nami (Crying)",
        type: "funko",
        image: "nami(1772).jpeg",
        value: 35
    },
    {
        name: "Ussop",
        type: "funko",
        image: "usop(401).jpeg",
        value: 47
    },
    {
        name: "Ben Beckman",
        type: "figure",
        image: "ben-beckman-figure1.jpeg",
        value: 60
    },
    {
        name: "Oden",
        type: "funko",
        image: "oden(1275).jpeg",
        value: 21
    },
    {
        name: "Whitebeard (Chase)",
        type: "funko",
        image: "whitebeard-chase(1270).jpeg",
        value: 85
    },
    {
        name: "Jinbe",
        type: "funko",
        image: "jinbe(1265).jpeg",
        value: 20
    },
	{
        name: "Monkey D. Luffy (98)",
        type: "funko",
        image: "luffy98.jpeg",
        value: 20
    },
	{
        name: "Snake Man Luffy (1266)",
        type: "funko",
        image: "snake-man-luffy.jpeg",
        value: 20
    }
];

// ================================
// WISHLIST DATA
// ================================
// ITEMS YOU WANT TO GET - Add new items here
const wishlistItems = [
    {
        name: "Franky With Black Rhino Ride",
        type: "funko",
        image: "rides-deluxe-franky-with black-rhino(144).jpeg" // Upload image to 'images' folder and add filename
    },
    {
        name: "Monkey D. Dragon",
        type: "funko",
        image: "monkey-d-dragon(2206).jpeg"
    },
    {
        name: "Bartolomeo",
        type: "funko",
        image: "bartolomeo(2234).jpeg"
    },
    {
        name: "Garp (Galaxy Impact)",
        type: "funko",
        image: "monkey-d-garp-galaxy-impact(2172).jpeg"
    },
    {
        name: "Monkey D. Luffy (Gatling)",
        type: "funko",
        image: "monkey-d-luffy-gatling(2217).jpeg"
    }
    // Add more wishlist items here
];

// ================================
// DOM ELEMENTS
// ================================
const searchInput = document.getElementById('searchInput');
const collectionGrid = document.getElementById('collectionGrid');
const noResults = document.getElementById('noResults');
const totalCount = document.getElementById('totalCount');
const displayCount = document.getElementById('displayCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalType = document.getElementById('modalType');
const modalClose = document.getElementById('modalClose');

// ================================
// STATE
// ================================
let currentFilter = 'all';
let currentView = 'grid';

// 3D Carousel State
let carousel3D = null;
let carouselAngle = 0;
let carouselRotationSpeed = 0.2;
let isDragging = false;
let startX = 0;
let currentX = 0;
let velocity = 0;
let animationFrame = null;

// ================================
// INITIALIZE
// ================================
document.addEventListener('DOMContentLoaded', () => {
    renderCollection(collection);
    updateStats(collection.length, collection.length);
    animateCollectionValue();

    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Parallax effect
    initParallax();

    // Create floating particles
    createParticles();

    // Wishlist badge click
    document.getElementById('wishlistBadge').addEventListener('click', showWishlist);

    // Render wishlist
    renderWishlist();

    // Scroll effects
    initScrollEffects();

    // Modal close events
    modalClose.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
    });
});

// ================================
// RENDER COLLECTION
// ================================
function renderCollection(items) {
    collectionGrid.innerHTML = '';

    if (items.length === 0) {
        noResults.style.display = 'block';
        collectionGrid.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    collectionGrid.style.display = 'grid';
    collectionGrid.classList.remove('carousel-mode');

    items.forEach((item, index) => {
        const card = createCard(item, index);
        collectionGrid.appendChild(card);
    });
}

// ================================
// CREATE CARD ELEMENT
// ================================
function createCard(item, index, showWishlistBtn = false) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${index * 0.05}s`;

    // Determine image source
    const imageSrc = getImagePath(item.image);
    const isPlaceholder = !item.image;

    card.innerHTML = `
        <div class="card-image-container">
            <img
                src="${imageSrc}"
                alt="${item.name}"
                class="card-image ${isPlaceholder ? 'placeholder' : ''}"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%231a2347%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2260%22 fill=%22%23a8b3cf%22 opacity=%220.3%22%3E%3F%3C/text%3E%3C/svg%3E'"
            >
        </div>
        <div class="card-content">
            <div class="card-name">${item.name}</div>
            <div class="card-type ${item.type}">${item.type === 'funko' ? 'Funko Pop' : 'Action Figure'}</div>
        </div>
    `;

    // Add click event to open modal
    const imageContainer = card.querySelector('.card-image-container');
    imageContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(item, imageSrc);
    });

    return card;
}

// ================================
// GET IMAGE PATH
// ================================
function getImagePath(imageName) {
    if (!imageName) {
        // Return placeholder SVG
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%231a2347' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='60' fill='%23a8b3cf' opacity='0.3'%3E%3F%3C/text%3E%3C/svg%3E`;
    }

    // Check if it's already a full path/URL
    if (imageName.startsWith('http') || imageName.startsWith('data:')) {
        return imageName;
    }

    // Assume it's in the images folder
    return `images/${imageName}`;
}

// ================================
// SEARCH FUNCTIONALITY
// ================================
function handleSearch(event) {
    applyFiltersAndSearch();
}

// ================================
// UPDATE STATS
// ================================
function updateStats(total, showing) {
    totalCount.textContent = total;
    displayCount.textContent = showing;
}

// ================================
// ANIMATE COLLECTION VALUE
// ================================
function animateCollectionValue() {
    const valueElement = document.getElementById('collectionValue');
    const totalValue = collection.reduce((sum, item) => sum + (item.value || 0), 0);

    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = totalValue / (duration / 16); // 60fps

    const animate = () => {
        currentValue += increment;
        if (currentValue >= totalValue) {
            currentValue = totalValue;
            valueElement.textContent = `$${Math.round(currentValue)}`;
        } else {
            valueElement.textContent = `$${Math.round(currentValue)}`;
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// ================================
// FILTER FUNCTIONALITY
// ================================
function handleFilter(event) {
    const filterValue = event.target.dataset.filter;
    currentFilter = filterValue;

    // Update active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Apply filter
    applyFiltersAndSearch();
}


// ================================
// APPLY FILTERS AND SEARCH
// ================================
function applyFiltersAndSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    let filteredItems = collection;

    // Apply type filter
    if (currentFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.type === currentFilter);
    }

    // Apply search
    if (searchTerm !== '') {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
    }

    renderCollection(filteredItems);
    updateStats(collection.length, filteredItems.length);
}


// ================================
// FLOATING PARTICLES
// ================================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    const colors = ['rgba(0, 217, 255, 0.6)', 'rgba(176, 48, 255, 0.6)', 'rgba(255, 255, 255, 0.5)'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${startX}%`;
        particle.style.bottom = '-10px';
        particle.style.setProperty('--drift', `${drift}px`);
        particle.style.animation = `float ${duration}s ${delay}s linear infinite`;

        container.appendChild(particle);
    }
}

// ================================
// WISHLIST FUNCTIONALITY
// ================================
function showWishlist() {
    const wishlistSection = document.getElementById('wishlistSection');
    wishlistSection.scrollIntoView({ behavior: 'smooth' });
}

function renderWishlist() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    const emptyWishlist = document.getElementById('emptyWishlist');
    const wishlistSection = document.getElementById('wishlistSection');
    const wishlistCount = document.getElementById('wishlistCount');

    // Update count
    wishlistCount.textContent = wishlistItems.length;

    wishlistGrid.innerHTML = '';

    if (wishlistItems.length === 0) {
        wishlistSection.style.display = 'block';
        wishlistGrid.style.display = 'none';
        emptyWishlist.style.display = 'block';
        return;
    }

    wishlistSection.style.display = 'block';
    emptyWishlist.style.display = 'none';

    // Render wishlist as 3D carousel
    wishlistGrid.style.display = 'block';
    wishlistGrid.classList.add('carousel-mode');
    init3DCarouselWishlist(wishlistItems);
}

function init3DCarouselWishlist(items) {
    const wishlistGrid = document.getElementById('wishlistGrid');

    // Create carousel container
    const container = document.createElement('div');
    container.className = 'carousel-3d';
    wishlistGrid.appendChild(container);

    const itemCount = items.length;
    const angleStep = 360 / itemCount;

    // Adjust radius based on screen size - increased for better visibility
    const isMobile = window.innerWidth <= 768;
    const baseRadius = isMobile ? 20 : 30;
    const minRadius = isMobile ? 150 : 250;
    const radius = Math.max(minRadius, itemCount * baseRadius);

    // Create cards in 3D circle
    items.forEach((item, index) => {
        const card = createCard(item, index);
        const angle = angleStep * index;

        card.style.transform = `
            rotateY(${angle}deg)
            translateZ(${radius}px)
        `;

        container.appendChild(card);
    });

    // Mouse/Touch events for grabbing - only on container, not on images
    container.addEventListener('mousedown', (e) => {
        // Don't start drag if clicking on an image
        if (e.target.classList.contains('card-image') ||
            e.target.classList.contains('card-image-container')) {
            return;
        }
        startDragWishlist(e);
    });

    container.addEventListener('touchstart', (e) => {
        // Don't start drag if touching an image
        if (e.target.classList.contains('card-image') ||
            e.target.classList.contains('card-image-container')) {
            return;
        }
        startDragWishlist(e);
    });

    // Start auto-rotation for wishlist
    animateWishlistCarousel(container);
}

let wishlistAngle = 0;
let wishlistDragging = false;
let wishlistAnimFrame = null;

function startDragWishlist(e) {
    wishlistDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    currentX = startX;
    velocity = 0;

    document.addEventListener('mousemove', dragWishlist);
    document.addEventListener('touchmove', dragWishlist);
    document.addEventListener('mouseup', stopDragWishlist);
    document.addEventListener('touchend', stopDragWishlist);
}

function dragWishlist(e) {
    if (!wishlistDragging) return;

    e.preventDefault();
    const x = e.pageX || (e.touches && e.touches[0].pageX);
    const deltaX = x - currentX;

    velocity = deltaX * 0.5;
    wishlistAngle += deltaX * 0.5;
    currentX = x;

    const container = document.querySelector('#wishlistGrid .carousel-3d');
    if (container) {
        container.style.transform = `rotateY(${wishlistAngle}deg)`;
    }
}

function stopDragWishlist() {
    wishlistDragging = false;
    document.removeEventListener('mousemove', dragWishlist);
    document.removeEventListener('touchmove', dragWishlist);
    document.removeEventListener('mouseup', stopDragWishlist);
    document.removeEventListener('touchend', stopDragWishlist);
}

function animateWishlistCarousel(container) {
    if (!container || !document.contains(container)) return;

    if (!wishlistDragging) {
        // Smooth, slower auto-rotation
        wishlistAngle += 0.15;
        velocity *= 0.97;
        wishlistAngle += velocity;
    }

    // Simple rotation without extra movement
    container.style.transform = `rotateY(${wishlistAngle}deg)`;
    wishlistAnimFrame = requestAnimationFrame(() => animateWishlistCarousel(container));
}

// ================================
// SCROLL EFFECTS - OPTIMIZED
// ================================
function initScrollEffects() {
    // Make elements visible immediately (no scroll animation)
    const reveals = document.querySelectorAll('.section-header, .stats, .controls');
    reveals.forEach(element => {
        element.classList.add('scroll-reveal', 'visible');
    });
}

function revealOnScroll() {
    // Disabled for performance
}

// ================================
// PARALLAX EFFECT
// ================================
function initParallax() {
    // Particles handle the visual effect now
}

// ================================
// IMAGE MODAL
// ================================
function openModal(item, imageSrc) {
    modalImage.src = imageSrc;
    modalImage.alt = item.name;
    modalName.textContent = item.name;
    modalType.textContent = item.type === 'funko' ? 'Funko Pop' : 'Action Figure';
    modalType.className = `modal-type ${item.type}`;

    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling

    // Clear image after animation
    setTimeout(() => {
        if (!imageModal.classList.contains('active')) {
            modalImage.src = '';
        }
    }, 300);
}
