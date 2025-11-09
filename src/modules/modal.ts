let modal: HTMLDivElement | null = null;

export function openModal(): void {
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

export function closeModal(): void {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

export function initModal(): void {
  modal = document.getElementById('modal') as HTMLDivElement | null;
  if (!modal) return;

  modal.addEventListener('click', (e: MouseEvent) => {
    if (e.target === modal) closeModal();
  });
}
