document.querySelectorAll('[data-bento]').forEach(function (el) {
	var fotos = el.dataset.fotos.split(',');
	var ruta = el.dataset.ruta;
	var imgs = el.querySelectorAll('img');
	var n = imgs.length;
	var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (fotos.length <= n || reducir) return;

	var inicio = 0;
	var timer = null;

	function cambiar() {
		inicio = (inicio + n) % fotos.length;
		imgs.forEach(function (img, i) {
			var nueva = ruta + fotos[(inicio + i) % fotos.length] + '.webp';
			setTimeout(function () {
				img.classList.add('is-fading');
				setTimeout(function () {
					var pre = new Image();
					pre.onload = function () {
						img.src = nueva;
						img.classList.remove('is-fading');
					};
					pre.src = nueva;
				}, 500);
			}, i * 150);
		});
	}

	function iniciar() { if (!timer) timer = setInterval(cambiar, 5000); }
	function detener() { clearInterval(timer); timer = null; }

	new IntersectionObserver(function (entries) {
		entries[0].isIntersecting ? iniciar() : detener();
	}).observe(el);
});