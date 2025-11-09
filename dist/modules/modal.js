let modal = null;
export function openModal() {
    if (!modal)
        return;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}
export function closeModal() {
    if (!modal)
        return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}
export function initModal() {
    modal = document.getElementById('modal');
    if (!modal)
        return;
    modal.addEventListener('click', (e) => {
        if (e.target === modal)
            closeModal();
    });
}
