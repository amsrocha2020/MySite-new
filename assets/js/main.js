(function () {
	'use strict';

	// ---- Theme toggle ----
	var root = document.documentElement;
	var themeToggle = document.getElementById('theme-toggle');
	var storedTheme = null;
	try { storedTheme = localStorage.getItem('theme'); } catch (e) {}
	if (storedTheme === 'light' || storedTheme === 'dark') {
		root.setAttribute('data-theme', storedTheme);
	}

	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			var current = root.getAttribute('data-theme');
			var isLight = current === 'light' || (!current && window.matchMedia('(prefers-color-scheme: light)').matches);
			var next = isLight ? 'dark' : 'light';
			root.setAttribute('data-theme', next);
			try { localStorage.setItem('theme', next); } catch (e) {}
		});
	}

	// ---- Mobile nav ----
	var navToggle = document.getElementById('nav-toggle');
	var nav = document.getElementById('nav');
	if (navToggle && nav) {
		navToggle.addEventListener('click', function () {
			var isOpen = nav.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			navToggle.querySelector('.fa').className = 'fa ' + (isOpen ? 'fa-times' : 'fa-bars');
		});
		nav.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () {
				nav.classList.remove('open');
				navToggle.setAttribute('aria-expanded', 'false');
				navToggle.querySelector('.fa').className = 'fa fa-bars';
			});
		});
	}

	// ---- Active nav link ----
	var currentPage = location.pathname.split('/').pop() || 'index.html';
	document.querySelectorAll('#nav a').forEach(function (link) {
		var href = link.getAttribute('href');
		if (href === currentPage || (currentPage === '' && href === 'index.html')) {
			link.classList.add('active');
		}
	});

	// ---- Scroll reveal ----
	var revealEls = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window && revealEls.length) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
		revealEls.forEach(function (el) { observer.observe(el); });
	} else {
		revealEls.forEach(function (el) { el.classList.add('is-visible'); });
	}

	// ---- Lightbox ----
	var lightbox = document.getElementById('lightbox');
	if (lightbox) {
		var lightboxImg = lightbox.querySelector('img');
		var lightboxCaption = lightbox.querySelector('.lightbox-caption');
		var groups = {};
		var currentGroup = null;
		var currentIndex = 0;

		document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
			var group = btn.getAttribute('data-lightbox');
			groups[group] = groups[group] || [];
			groups[group].push(btn);
			btn.addEventListener('click', function () {
				currentGroup = group;
				currentIndex = groups[group].indexOf(btn);
				showLightbox();
			});
		});

		function showLightbox() {
			var btn = groups[currentGroup][currentIndex];
			var src = btn.getAttribute('data-src') || btn.querySelector('img').src;
			var caption = btn.getAttribute('data-title') || '';
			lightboxImg.src = src;
			lightboxImg.alt = caption;
			lightboxCaption.textContent = caption;
			lightbox.classList.add('open');
			document.body.style.overflow = 'hidden';
		}

		function closeLightbox() {
			lightbox.classList.remove('open');
			document.body.style.overflow = '';
		}

		function step(delta) {
			var items = groups[currentGroup];
			currentIndex = (currentIndex + delta + items.length) % items.length;
			showLightbox();
		}

		lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
		lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { step(-1); });
		lightbox.querySelector('.lightbox-next').addEventListener('click', function () { step(1); });
		lightbox.addEventListener('click', function (e) {
			if (e.target === lightbox) closeLightbox();
		});
		document.addEventListener('keydown', function (e) {
			if (!lightbox.classList.contains('open')) return;
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowLeft') step(-1);
			if (e.key === 'ArrowRight') step(1);
		});
	}
})();
