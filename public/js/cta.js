(() => {
    const bubble = document.querySelector('[data-bubble]');
    if (!bubble) return;

    const KEY = 'cf-bubble-dismissed';
    try { if (sessionStorage.getItem(KEY)) return; } catch { /* sin storage */ }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const open = () => {
        bubble.classList.add('is-open');
        setTimeout(() => bubble.classList.add('is-ready'), reduced ? 0 : 1400);
    };

    const close = () => {
        bubble.classList.remove('is-open');
        try { sessionStorage.setItem(KEY, '1'); } catch { /* sin storage */ }
    };

    const closeBtn = bubble.querySelector('[data-bubble-close]');
    if (closeBtn) {
        closeBtn.addEventListener('click', close);
    }

    // Mostrar después de 20 segundos (20000 milisegundos)
    setTimeout(() => {
        open();
    }, 20000);
})();