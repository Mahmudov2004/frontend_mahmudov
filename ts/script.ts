/// <reference lib="dom" />

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface Card {
    id: string;
    title: string;
    description: string;
    image: string;
}

document.addEventListener("DOMContentLoaded", async () => {
    const preloader = document.querySelector('.preloader') as HTMLElement | null;
    preloader?.style.setProperty('display', 'block', 'important');

    try {
        const [posts, photos] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=3').then(res => res.json()) as Promise<Post[]>,
            fetch('https://jsonplaceholder.typicode.com/photos?_limit=3').then(res => res.json()) as Promise<Photo[]>
        ]);

        const cards: Card[] = posts.map((post, index): Card => ({
            id: `card-${index + 1}`,
            title: post.title,
            description: post.body,
            image: photos[index]?.thumbnailUrl || 'img/134006.png'
        }));

        initCardSwitcher(cards);
        initSlider(cards);
        initModals();

    } finally {
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    }
});

function initCardSwitcher(cards: Card[]): void {
    const features = document.querySelectorAll('.feature') as NodeListOf<HTMLElement>;
    const cardDisplay = document.querySelector('.card-display') as HTMLElement | null;

    if (features.length && cardDisplay) {
        features[0].classList.add('active');
        cardDisplay.innerHTML = createCardTemplate(cards[0]);
    }

    features.forEach((feature, index) => {
        feature.addEventListener('click', () => {
            features.forEach(f => f.classList.remove('active'));
            feature.classList.add('active');
            if (cardDisplay) cardDisplay.innerHTML = createCardTemplate(cards[index]);
        });
    });
}

function createCardTemplate({ title, description, image }: Card): string {
    return `
        <div class="card">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
            <img src="${image}" alt="${title}" class="card-image">
        </div>
    `;
}

function initSlider(cards: Card[]): void {
    const swiperWrapper = document.querySelector('.swiper-wrapper') as HTMLElement | null;
    if (!swiperWrapper) return;

    swiperWrapper.innerHTML = cards.map(card => `
        <div class="swiper-slide">${createCardTemplate(card)}</div>
    `).join('');

    // @ts-ignore
    new Swiper('.swiper-container', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        spaceBetween: 30,
        slidesPerView: 1
    });
}

function initModals(): void {
    const modalOverlay = document.getElementById('modalOverlay') as HTMLElement | null;
    if (!modalOverlay) return;

    document.querySelectorAll('.sign, .login').forEach(btn => {
        btn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const modal = modalOverlay.querySelector('.modal');
                modal?.classList.add('active');
            }, 50);
        });
    });

    modalOverlay.querySelectorAll('#closeModal, #cancelBtn, #okBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = modalOverlay.querySelector('.modal');
            modal?.classList.remove('active');
            
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    });

    modalOverlay.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modalOverlay) {
            const modal = modalOverlay.querySelector('.modal');
            modal?.classList.remove('active');
            
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });
}
