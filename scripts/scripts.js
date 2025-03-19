document.addEventListener("DOMContentLoaded", async () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'block';

    try {
        // Получаем данные с сервера
        const [posts, photos] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=3').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/photos?_limit=3').then(res => res.json())
        ]);

        // Формируем карточки
        const cards = posts.map((post, index) => ({
            id: `card-${index + 1}`,
            title: post.title,
            description: post.body,
            image: photos[index]?.thumbnailUrl || 'img/134006.png'
        }));

        // Инициализация компонентов
        initCardSwitcher(cards);
        initSlider(cards);
        initModals();

    } finally {
        // Скрываем прелоадер
        preloader.classList.add('hidden');
        setTimeout(() => preloader.style.display = 'none', 500);
    }
});

function initCardSwitcher(cards) {
    const features = document.querySelectorAll('.feature');
    const cardDisplay = document.querySelector('.card-display');

    // Начальное отображение
    if (features.length && cardDisplay) {
        features[0].classList.add('active');
        cardDisplay.innerHTML = createCardTemplate(cards[0]);
    }

    // Обработчики кликов
    features.forEach((feature, index) => {
        feature.addEventListener('click', () => {
            features.forEach(f => f.classList.remove('active'));
            feature.classList.add('active');
            cardDisplay.innerHTML = createCardTemplate(cards[index]);
        });
    });
}

function createCardTemplate({ title, description, image }) {
    return `
        <div class="card">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
            <img src="${image}" alt="${title}" class="card-image">
        </div>
    `;
}

function initSlider(cards) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return;

    // Генерация слайдов
    swiperWrapper.innerHTML = cards.map(card => `
        <div class="swiper-slide">${createCardTemplate(card)}</div>
    `).join('');

    // Инициализация Swiper
    new Swiper('.swiper-container', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        spaceBetween: 30,
        slidesPerView: 1,
        breakpoints: { 
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 }
        }
    });
}

function initModals() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Открытие модалки
    document.querySelectorAll('.sign, .login').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => modalOverlay.querySelector('.modal').classList.add('active'), 50);
        });
    });

    // Закрытие модалки
    document.querySelectorAll('#closeModal, #cancelBtn, #okBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.querySelector('.modal').classList.remove('active');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    });

    // Закрытие по клику на подложку
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.querySelector('.modal').classList.remove('active');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });
}