window.addEventListener("load", () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

const cards = {
    "card-1": {
        title: "Expand Your Horizons",
        description: "Learn how to showcase your unique skills and stand out in the competitive job market.",
        image: "img/134006.png"
    },
    "card-2": {
        title: "Creative Portfolios Made Easy",
        description: "We provide tools to make your portfolio shine and attract the right recruiters effortlessly.",
        image: "img/134006.png"
    },
    "card-3": {
        title: "Achieve Your Goals",
        description: "Take the next step in your career journey with Jobly's seamless job-matching platform.",
        image: "img/134006.png"
    }
};

function createCardTemplate({ title, description, image }) {
    return `
        <div class="card">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
            <img src="${image}" alt="${title}" class="card-image">
        </div>
    `;
}

function displayCard(cardData) {
    const cardDisplay = document.querySelector('.card-display');
    if (!cardDisplay) return;
    cardDisplay.innerHTML = createCardTemplate(cardData);
}

function handleFeatureClicks() {
    const features = document.querySelectorAll('.feature');

    if (features.length > 0) {
        features[0].classList.add('active');
        displayCard(cards['card-1']);
    }

    features.forEach((feature, index) => {
        feature.addEventListener('click', () => {
            features.forEach(f => f.classList.remove('active'));
            feature.classList.add('active');
            const cardKey = `card-${index + 1}`;
            if (cards[cardKey]) {
                displayCard(cards[cardKey]);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    handleFeatureClicks();

 


    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });


});
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        // Параметры слайдера
        loop: true, // Бесконечная прокрутка
        autoplay: {
            delay: 3000, // Автопрокрутка каждые 3 секунды
            disableOnInteraction: false, // Продолжать автопрокрутку после взаимодействия
        },

        // Пагинация
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Разрешить клик по точкам пагинации
        },

        // Навигационные кнопки
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Отступы между слайдами
        spaceBetween: 30,

        // Количество слайдов для показа одновременно
        slidesPerView: 1, // Показываем только одну карточку

        
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        },
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const openButtons = document.querySelectorAll('.sign, .login');
    const closeButtons = document.querySelectorAll('#closeModal, #cancelBtn, #okBtn');

    // Открытие модального окна
    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Задержка для анимации
            setTimeout(() => {
                modalOverlay.querySelector('.modal').classList.add('active');
            }, 50);
        });
    });

    // Закрытие модального окна
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.querySelector('.modal').classList.remove('active');
            
            // Задержка для завершения анимации
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
});