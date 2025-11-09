import { openModal, closeModal, initModal } from './modules/modal.js';
import { initHeaderScroll } from './modules/header.js';
import { initPosts } from './modules/posts.js';

document.addEventListener('DOMContentLoaded', () => {
  initModal();

  const openModalBtn = document.getElementById('open-modal') as HTMLButtonElement | null;
  const closeModalBtn = document.getElementById('close-modal') as HTMLButtonElement | null;

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  initHeaderScroll();
  initPosts();
});
