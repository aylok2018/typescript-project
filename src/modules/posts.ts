import { Post } from '../types/post.js';
import { openModal } from './modal.js';

const postsContainer = document.getElementById('posts-container') as HTMLDivElement | null;
const loadMoreBtn = document.getElementById('load-more') as HTMLButtonElement | null;

let currentPage = 1;
const pageSize = 5;

export async function fetchPosts(page: number, limit: number): Promise<Post[]> {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(page-1)*limit}&_limit=${limit}`);
  if (!resp.ok) throw new Error('Network error');
  return await resp.json();
}

export async function fetchPostById(id: number): Promise<Post> {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!resp.ok) throw new Error('Network error');
  return await resp.json();
}

export function renderPosts(posts: Post[]): void {
  if (!postsContainer) return;

  posts.forEach(post => {
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p><button data-id="${post.id}" class="details">Деталі</button>`;
    postsContainer.appendChild(el);

    requestAnimationFrame(() => el.classList.add('visible'));
  });

  const detailButtons = postsContainer.querySelectorAll('button.details');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = Number((e.currentTarget as HTMLElement).dataset.id);
      openModal();
      const post = await fetchPostById(id);
      const content = document.querySelector('.modal-content') as HTMLDivElement | null;
      if (content) content.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
    });
  });
}

export function initPosts(): void {
  fetchPosts(currentPage, pageSize)
    .then(renderPosts)
    .catch(err => console.error(err));

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', async () => {
      currentPage++;
      const posts = await fetchPosts(currentPage, pageSize);
      renderPosts(posts);
    });
  }
}
