/* ==========================================================
   Site behaviour: mobile menu · publication filter · reveal on scroll
   ========================================================== */
(function () {
    'use strict';

    /* ---- Mobile menu ---- */
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
    }

    /* ---- Publication filter (by theme) ---- */
    var tools = document.getElementById('pub-filter');
    if (tools) {
        var buttons = tools.querySelectorAll('.fbtn');
        var pubs = document.querySelectorAll('#pub-list .pub');
        var years = document.querySelectorAll('#pub-list .pub-year');
        var count = document.getElementById('pub-count');

        var apply = function (f) {
            var shown = 0;
            pubs.forEach(function (p) {
                var ok = f === 'all' || (' ' + p.dataset.themes + ' ').indexOf(' ' + f + ' ') > -1;
                p.classList.toggle('hide', !ok);
                if (ok) shown++;
            });
            years.forEach(function (y) {
                var any = document.querySelector('#pub-list .pub[data-year="' + y.dataset.year + '"]:not(.hide)');
                y.classList.toggle('hide', !any);
            });
            if (count) count.textContent = shown + (shown === 1 ? ' publication' : ' publications');
        };

        buttons.forEach(function (b) {
            b.addEventListener('click', function () {
                buttons.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
                b.setAttribute('aria-pressed', 'true');
                apply(b.dataset.filter);
                if (history.replaceState) history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + b.dataset.filter);
            });
        });

        // allow deep links like /publications/#catalysis
        var initial = location.hash.replace('#', '');
        var match = initial && tools.querySelector('.fbtn[data-filter="' + initial + '"]');
        if (match) match.click(); else apply('all');
    }

    /* ---- Reveal on scroll ---- */
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && items.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('in'); });
    }
})();
