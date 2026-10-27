(function () {
    'use strict';

    var counters = document.querySelectorAll('.cf-counter');
    if (!counters.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DURATION = 2000;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animate(el) {
        var target = parseInt(el.dataset.target, 10);
        var prefix = el.dataset.prefix || '';
        var suffix = el.dataset.suffix || '';

        if (reduceMotion || isNaN(target)) {
            el.textContent = prefix + target + suffix;
            return;
        }

        var start = null;

        function step(timestamp) {
            if (start === null) start = timestamp;
            var progress = Math.min((timestamp - start) / DURATION, 1);
            var value = Math.round(easeOutCubic(progress) * target);
            el.textContent = prefix + value + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        el.textContent = prefix + '0' + suffix;
        requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
        counters.forEach(animate);
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (el) {
        observer.observe(el);
    });
})();