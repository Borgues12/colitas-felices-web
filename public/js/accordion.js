(() => {
    const groups = document.querySelectorAll('.cf-accordion');
    if (!groups.length) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DURATION = reduced ? 0 : 350;
    const EASING = 'cubic-bezier(.4, 0, .2, 1)';

    const animate = (d, from, to, done) => {
        d.style.overflow = 'hidden';
        d._anim = d.animate(
            { height: [from + 'px', to + 'px'] },
            { duration: DURATION, easing: EASING }
        );
        d._anim.onfinish = () => {
            d._anim = null;
            d.style.overflow = '';
            done();
        };
    };

    const openIt = (d) => {
        const from = d.offsetHeight;
        d.open = true;
        const to = d.scrollHeight;
        animate(d, from, to, () => { });
    };

    const closeIt = (d) => {
        const from = d.offsetHeight;
        const to = d.querySelector('summary').offsetHeight;
        animate(d, from, to, () => { d.open = false; });
    };

    groups.forEach((group) => {
        group.querySelectorAll('details').forEach((d) => {
            // El atributo name cierra los demás de golpe; la exclusividad se maneja aquí
            d.removeAttribute('name');

            d.querySelector('summary').addEventListener('click', (e) => {
                e.preventDefault();
                if (d._anim) return;

                if (d.open) {
                    closeIt(d);
                } else {
                    group.querySelectorAll('details[open]').forEach((o) => {
                        if (o !== d && !o._anim) closeIt(o);
                    });
                    openIt(d);
                }
            });
        });
    });
})();