(() => {
    const nav = document.querySelector('.cf-nav');
    if (!nav) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Menú móvil
    const burger = nav.querySelector('.navbar-burger');
    const menu = document.getElementById(burger.dataset.target);
    const setMenu = (open) => {
        burger.classList.toggle('is-active', open);
        menu.classList.toggle('is-active', open);
        burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-active')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

    // Sombra al bajar
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Sección activa en el menú
    const links = new Map();
    nav.querySelectorAll('.cf-link').forEach((a) => {
        const id = (a.getAttribute('href') || '').split('#')[1];
        if (id) links.set(id, a);
    });

    const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            links.forEach((a) => a.classList.remove('is-current'));
            const a = links.get(e.target.id);
            if (a) a.classList.add('is-current');
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    links.forEach((_, id) => {
        const s = document.getElementById(id);
        if (s) spy.observe(s);
    });

    // Aparición suave de las secciones
    if (reduced) return;

    const targets = document.querySelectorAll('main .section .container > *');
    const reveal = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
        });
    }, { threshold: 0.12 });

    targets.forEach((el) => {
        const i = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty('--d', Math.min(i, 4) * 90 + 'ms');
        el.classList.add('cf-reveal');
        reveal.observe(el);
    });
})();