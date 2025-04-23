/// <reference lib="dom" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var preloader, _a, posts, photos_1, cards;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                preloader = document.querySelector('.preloader');
                preloader === null || preloader === void 0 ? void 0 : preloader.style.setProperty('display', 'block', 'important');
                _b.label = 1;
            case 1:
                _b.trys.push([1, , 3, 4]);
                return [4 /*yield*/, Promise.all([
                        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3').then(function (res) { return res.json(); }),
                        fetch('https://jsonplaceholder.typicode.com/photos?_limit=3').then(function (res) { return res.json(); })
                    ])];
            case 2:
                _a = _b.sent(), posts = _a[0], photos_1 = _a[1];
                cards = posts.map(function (post, index) {
                    var _a;
                    return ({
                        id: "card-".concat(index + 1),
                        title: post.title,
                        description: post.body,
                        image: ((_a = photos_1[index]) === null || _a === void 0 ? void 0 : _a.thumbnailUrl) || 'img/134006.png'
                    });
                });
                initCardSwitcher(cards);
                initSlider(cards);
                initModals();
                return [3 /*break*/, 4];
            case 3:
                if (preloader) {
                    preloader.classList.add('hidden');
                    setTimeout(function () { return preloader.style.display = 'none'; }, 500);
                }
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
function initCardSwitcher(cards) {
    var features = document.querySelectorAll('.feature');
    var cardDisplay = document.querySelector('.card-display');
    if (features.length && cardDisplay) {
        features[0].classList.add('active');
        cardDisplay.innerHTML = createCardTemplate(cards[0]);
    }
    features.forEach(function (feature, index) {
        feature.addEventListener('click', function () {
            features.forEach(function (f) { return f.classList.remove('active'); });
            feature.classList.add('active');
            if (cardDisplay)
                cardDisplay.innerHTML = createCardTemplate(cards[index]);
        });
    });
}
function createCardTemplate(_a) {
    var title = _a.title, description = _a.description, image = _a.image;
    return "\n        <div class=\"card\">\n            <h3 class=\"card-title\">".concat(title, "</h3>\n            <p class=\"card-description\">").concat(description, "</p>\n            <img src=\"").concat(image, "\" alt=\"").concat(title, "\" class=\"card-image\">\n        </div>\n    ");
}
function initSlider(cards) {
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper)
        return;
    swiperWrapper.innerHTML = cards.map(function (card) { return "\n        <div class=\"swiper-slide\">".concat(createCardTemplate(card), "</div>\n    "); }).join('');
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
function initModals() {
    var modalOverlay = document.getElementById('modalOverlay');
    if (!modalOverlay)
        return;
    document.querySelectorAll('.sign, .login').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(function () {
                var modal = modalOverlay.querySelector('.modal');
                modal === null || modal === void 0 ? void 0 : modal.classList.add('active');
            }, 50);
        });
    });
    modalOverlay.querySelectorAll('#closeModal, #cancelBtn, #okBtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var modal = modalOverlay.querySelector('.modal');
            modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
            setTimeout(function () {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    });
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            var modal = modalOverlay.querySelector('.modal');
            modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
            setTimeout(function () {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });
}
