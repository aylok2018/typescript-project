var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { openModal } from './modal.js';
const postsContainer = document.getElementById('posts-container');
const loadMoreBtn = document.getElementById('load-more');
let currentPage = 1;
const pageSize = 5;
export function fetchPosts(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * limit}&_limit=${limit}`);
        if (!resp.ok)
            throw new Error('Network error');
        return yield resp.json();
    });
}
export function fetchPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!resp.ok)
            throw new Error('Network error');
        return yield resp.json();
    });
}
export function renderPosts(posts) {
    if (!postsContainer)
        return;
    posts.forEach(post => {
        const el = document.createElement('div');
        el.className = 'post';
        el.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p><button data-id="${post.id}" class="details">Деталі</button>`;
        postsContainer.appendChild(el);
        requestAnimationFrame(() => el.classList.add('visible'));
    });
    const detailButtons = postsContainer.querySelectorAll('button.details');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(e.currentTarget.dataset.id);
            openModal();
            const post = yield fetchPostById(id);
            const content = document.querySelector('.modal-content');
            if (content)
                content.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        }));
    });
}
export function initPosts() {
    fetchPosts(currentPage, pageSize)
        .then(renderPosts)
        .catch(err => console.error(err));
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            currentPage++;
            const posts = yield fetchPosts(currentPage, pageSize);
            renderPosts(posts);
        }));
    }
}
