/* ==========================================================
   Discovery loop — interactive hero visual
   Candidates (hexagons) travel around a closed loop:
   simulate → represent → learn → select → validate.
   The centre plot compares "best material found" for
   ML-guided selection vs. random screening.
   Edit the text in STEPS below to change labels and captions.
   ========================================================== */
(function () {
    'use strict';

    var root = document.getElementById('discovery-loop');
    if (!root) return;

    var STEPS = {
        adsorption: {
            chart: 'Best adsorbent found',
            reject: 0.5,
            intro: '<b>A closed loop for discovering adsorbents.</b> Hover or tap a step to see what happens there.',
            nodes: [
                { t: 'Simulate',  s: ['GCMC uptake', '& selectivity'],
                  c: '<b>Simulate.</b> Molecular simulation (GCMC) predicts how much gas each candidate framework takes up, and how selectively.' },
                { t: 'Represent', s: ['Interaction', 'fingerprints'],
                  c: '<b>Represent.</b> Each material becomes a compact, physics-informed fingerprint, such as a histogram of host–guest interaction energies.' },
                { t: 'Learn',     s: ['Data-efficient', 'ML models'],
                  c: '<b>Learn.</b> Machine-learning models capture structure–property relationships from a small number of costly simulations.' },
                { t: 'Select',    s: ['Active', 'learning'],
                  c: '<b>Select.</b> Active learning chooses which candidates are worth simulating next, so most of the design space never has to be computed.' },
                { t: 'Validate',  s: ['Stability &', 'synthesizability'],
                  c: '<b>Validate.</b> Promising hits are screened for thermodynamic stability and synthesizability before they reach the lab.' }
            ]
        },
        catalysis: {
            chart: 'Best catalyst found',
            reject: 0.6,
            intro: '<b>Next: the same loop, applied to catalysis.</b> Adsorption is the first step of every catalytic cycle.',
            nodes: [
                { t: 'Simulate',  s: ['DFT &', 'ML potentials'],
                  c: '<b>Simulate.</b> Electronic-structure and machine-learned potentials describe how reactants bind and transform at active sites.' },
                { t: 'Represent', s: ['Active-site', 'descriptors'],
                  c: '<b>Represent.</b> Descriptors capture the chemistry of the active site and the confinement provided by the surrounding pore.' },
                { t: 'Learn',     s: ['Transferable', 'models'],
                  c: '<b>Learn.</b> Models carry what we know about adsorption over to binding and reactivity, where data is even scarcer.' },
                { t: 'Select',    s: ['Activity vs.', 'stability'],
                  c: '<b>Select.</b> Candidates are ranked by balancing activity, selectivity and stability, then queued for the next round.' },
                { t: 'Validate',  s: ['Stability in', 'operation'],
                  c: '<b>Validate.</b> Stability under reaction conditions, and comparison with experiment, closes the loop.' }
            ]
        }
    };

    var NS = 'http://www.w3.org/2000/svg';
    var W = 600, H = 520, CX = 300, CY = 270, R = 172, NR = 25;
    var ANG = [-90, -18, 54, 126, 198];
    var MAXN = 36;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function el(name, attrs, parent) {
        var e = document.createElementNS(NS, name);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(e);
        return e;
    }
    function rad(d) { return d * Math.PI / 180; }
    function pt(deg, r) { return [CX + (r || R) * Math.cos(rad(deg)), CY + (r || R) * Math.sin(rad(deg))]; }

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-labelledby': 'dl-title dl-desc' });
    var title = el('title', { id: 'dl-title' }, svg);
    title.textContent = 'Discovery loop';
    var desc = el('desc', { id: 'dl-desc' }, svg);
    desc.textContent = 'Animated diagram of a five-step materials discovery loop: simulate, represent, learn, select and validate. A central plot shows machine-learning-guided selection finding the best material in fewer evaluations than random screening.';
    root.querySelector('.loop-canvas').appendChild(svg);

    /* ring */
    el('circle', { cx: CX, cy: CY, r: R, class: 'lp-ring' }, svg);
    var ringActive = el('circle', { cx: CX, cy: CY, r: R, class: 'lp-ring-active' }, svg);
    // direction chevrons between nodes
    for (var a = 0; a < 5; a++) {
        var mid = ANG[a] + 36, p = pt(mid);
        el('path', { d: 'M -4 -5 L 3 0 L -4 5', transform: 'translate(' + p[0] + ',' + p[1] + ') rotate(' + (mid + 90) + ')',
            fill: 'none', stroke: 'var(--rule-strong)', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, svg);
    }

    /* centre chart */
    var X0 = 218, X1 = 382, Y0 = 206, Y1 = 304;
    var chartTitle = el('text', { x: CX, y: 188, class: 'lp-ctitle' }, svg);
    for (var g = 1; g <= 3; g++) {
        var gy = Y1 - (Y1 - Y0) * g / 4;
        el('line', { x1: X0, x2: X1, y1: gy, y2: gy, class: 'lp-grid' }, svg);
    }
    el('line', { x1: X0, x2: X0, y1: Y0 - 4, y2: Y1, class: 'lp-axis' }, svg);
    el('line', { x1: X0, x2: X1, y1: Y1, y2: Y1, class: 'lp-axis' }, svg);
    var xl = el('text', { x: CX, y: Y1 + 15, class: 'lp-statlbl' }, svg); xl.textContent = 'evaluations →';
    var rndLine = el('polyline', { class: 'lp-line-rnd', points: '' }, svg);
    var mlLine = el('polyline', { class: 'lp-line-ml', points: '' }, svg);
    var mlDot = el('circle', { r: 3.5, class: 'lp-particle', cx: X0, cy: Y1, opacity: 0 }, svg);

    // legend
    var lg = el('g', { transform: 'translate(' + (CX - 86) + ',' + (Y1 + 34) + ')' }, svg);
    el('line', { x1: 0, x2: 18, y1: 0, y2: 0, class: 'lp-line-ml' }, lg);
    var l1 = el('text', { x: 24, y: 3.5, class: 'lp-legend' }, lg); l1.textContent = 'ML-guided';
    el('line', { x1: 98, x2: 116, y1: 0, y2: 0, class: 'lp-line-rnd' }, lg);
    var l2 = el('text', { x: 122, y: 3.5, class: 'lp-legend' }, lg); l2.textContent = 'Random';

    // stats
    var statN = el('text', { x: CX - 46, y: Y1 + 66, class: 'lp-stat' }, svg);
    var statNl = el('text', { x: CX - 46, y: Y1 + 80, class: 'lp-statlbl' }, svg); statNl.textContent = 'evaluated';
    var statB = el('text', { x: CX + 46, y: Y1 + 66, class: 'lp-stat' }, svg);
    var statBl = el('text', { x: CX + 46, y: Y1 + 80, class: 'lp-statlbl' }, svg); statBl.textContent = 'best found (ML)';

    /* particles layer (under nodes) */
    var pLayer = el('g', {}, svg);

    /* nodes */
    var nodes = [];
    ANG.forEach(function (deg, i) {
        var p = pt(deg);
        var g = el('g', { class: 'lp-node', tabindex: 0, role: 'button' }, svg);
        var pulse = el('circle', { cx: p[0], cy: p[1], r: NR, class: 'lp-pulse' }, g);
        el('circle', { cx: p[0], cy: p[1], r: NR, class: 'bg' }, g);
        var num = el('text', { x: p[0], y: p[1], class: 'num' }, g); num.textContent = '0' + (i + 1);
        // label placement: top = above, sides = outside, bottom = below
        var lx, ly, anchor = 'middle';
        if (i === 0) { lx = p[0]; ly = p[1] - 74; }
        else if (i === 1) { lx = p[0] + NR + 12; ly = p[1] - 10; anchor = 'start'; }
        else if (i === 4) { lx = p[0] - NR - 12; ly = p[1] - 10; anchor = 'end'; }
        else { lx = p[0]; ly = p[1] + NR + 22; }
        var t = el('text', { x: lx, y: ly, class: 'lbl', 'text-anchor': anchor }, g);
        var s = el('text', { x: lx, y: ly + 17, class: 'sub', 'text-anchor': anchor }, g);
        var s1 = el('tspan', { x: lx }, s);
        var s2 = el('tspan', { x: lx, dy: 14 }, s);
        nodes.push({ g: g, pulse: pulse, t: t, s1: s1, s2: s2, pulseT: 0 });
        g.addEventListener('mouseenter', function () { userPick(i); });
        g.addEventListener('focus', function () { userPick(i); });
        g.addEventListener('click', function () { userPick(i); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); userPick(i); } });
    });

    var caption = root.querySelector('.loop-caption');
    var mode = 'adsorption';
    var active = -1, autoPausedUntil = 0, lastAuto = 0;

    function setActive(i) {
        active = i;
        nodes.forEach(function (n, k) { n.g.classList.toggle('on', k === i); });
        caption.innerHTML = i < 0 ? STEPS[mode].intro : STEPS[mode].nodes[i].c;
    }
    function userPick(i) { autoPausedUntil = performance.now() + 9000; setActive(i); }

    function applyMode(m) {
        mode = m;
        root.setAttribute('data-mode', m);
        STEPS[m].nodes.forEach(function (d, i) { nodes[i].t.textContent = d.t; nodes[i].s1.textContent = d.s[0]; nodes[i].s2.textContent = d.s[1]; });
        chartTitle.textContent = STEPS[m].chart;
        root.querySelectorAll('.loop-switch button').forEach(function (b) {
            b.setAttribute('aria-pressed', b.dataset.mode === m ? 'true' : 'false');
        });
        resetChart();
        setActive(-1);
        lastAuto = performance.now();
        if (reduce) fillChartStatic();
    }
    root.querySelectorAll('.loop-switch button').forEach(function (b) {
        b.addEventListener('click', function () { if (b.dataset.mode !== mode) applyMode(b.dataset.mode); });
    });

    /* ---- chart state ---- */
    var n = 0, bestML = 0, bestR = 0, ptsML = [], ptsR = [];
    var rand = Math.random;
    function rnd() { return rand(); }
    function resetChart() {
        n = 0; bestML = 0; bestR = 0; ptsML = []; ptsR = [];
        drawChart();
    }
    function sx(i) { return X0 + (X1 - X0) * i / MAXN; }
    function sy(v) { return Y1 - (Y1 - Y0) * v; }
    function evaluate() {
        if (n >= MAXN) return;
        n++;
        // Random screening: good materials are rare (heavy-tailed)
        bestR = Math.max(bestR, Math.pow(rnd(), 7) * 0.98);
        // ML-guided: proposals improve as the model learns
        var q = 1 - 0.62 * Math.exp(-n / 6.5);
        bestML = Math.max(bestML, q * (0.86 + 0.14 * rnd()));
        ptsML.push(sx(n).toFixed(1) + ',' + sy(bestML).toFixed(1));
        ptsR.push(sx(n).toFixed(1) + ',' + sy(bestR).toFixed(1));
        drawChart();
        if (n >= MAXN && !reduce) setTimeout(resetChart, 2200);
    }
    function drawChart() {
        var head = [sx(0) + ',' + sy(0)];
        mlLine.setAttribute('points', n ? head.concat(ptsML).join(' ') : '');
        rndLine.setAttribute('points', n ? head.concat(ptsR).join(' ') : '');
        mlDot.setAttribute('opacity', n ? 1 : 0);
        mlDot.setAttribute('cx', sx(n)); mlDot.setAttribute('cy', sy(bestML));
        statN.textContent = n;
        statB.textContent = Math.round(bestML * 100) + '%';
    }
    function fillChartStatic() {
        resetChart();
        var seed = 7;
        rand = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (var i = 0; i < MAXN; i++) evaluate();
        rand = Math.random;
    }

    /* ---- particles ---- */
    var HEX = 'M0,-6 L5.2,-3 L5.2,3 L0,6 L-5.2,3 L-5.2,-3 Z';
    var parts = [];
    var SPEED = 360 / 8.5; // degrees per second
    var spawnEvery = 1.05, spawnT = 0;

    function spawn(a0) {
        var a = a0 === undefined ? -90 : a0;
        var p = { a: a, passed: Math.floor((a + 90) / 72), rej: false, fade: 1, el: el('path', { d: HEX, class: 'lp-particle' }, pLayer) };
        parts.push(p);
    }
    function pulseNode(i) { nodes[i].pulseT = 1; }

    function step(dt) {
        spawnT += dt;
        if (spawnT > spawnEvery && parts.length < 11) { spawnT = 0; spawn(); }
        for (var k = parts.length - 1; k >= 0; k--) {
            var p = parts[k];
            p.a += SPEED * dt;
            // crossing node boundaries
            var next = p.passed + 1; // index of next node (1..5, where 5 == back to start)
            var target = -90 + 72 * next;
            if (p.a >= target) {
                p.passed = next;
                var idx = next % 5;
                if (!p.rej) pulseNode(idx);
                if (idx === 3 && !p.rej && rnd() < STEPS[mode].reject) { p.rej = true; p.el.setAttribute('class', 'lp-particle rej'); }
                if (next === 5) {
                    if (!p.rej) evaluate();
                    p.el.remove(); parts.splice(k, 1); continue;
                }
            }
            var r = R, op = 1;
            if (p.rej) {
                p.fade -= dt * 0.9;
                r = R + (1 - p.fade) * 26; op = Math.max(0, p.fade);
                if (op <= 0) { p.el.remove(); parts.splice(k, 1); continue; }
            }
            var c = pt(p.a, r);
            p.el.setAttribute('transform', 'translate(' + c[0].toFixed(1) + ',' + c[1].toFixed(1) + ') rotate(' + ((p.a * 2) % 360).toFixed(0) + ')');
            p.el.setAttribute('opacity', op.toFixed(2));
        }
        nodes.forEach(function (nd) {
            if (nd.pulseT > 0) {
                nd.pulseT = Math.max(0, nd.pulseT - dt * 1.6);
                nd.pulse.setAttribute('r', NR + (1 - nd.pulseT) * 14);
                nd.pulse.setAttribute('opacity', (nd.pulseT * 0.6).toFixed(2));
            }
        });
        ringActive.setAttribute('stroke-dashoffset', ((performance.now() / 40) % 9 * -1).toFixed(2));
    }

    var running = false, last = 0, visible = true;
    function frame(t) {
        if (!running) return;
        var dt = Math.min(0.05, (t - last) / 1000 || 0);
        last = t;
        step(dt);
        if (t > autoPausedUntil && t - lastAuto > 3600) {
            lastAuto = t;
            setActive((active + 1) % 5);
        }
        requestAnimationFrame(frame);
    }
    function start() { if (running || reduce) return; running = true; last = performance.now(); requestAnimationFrame(frame); }
    function stop() { running = false; }

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
            visible = es[0].isIntersecting;
            if (visible && !document.hidden) start(); else stop();
        }).observe(root);
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (visible) start(); });

    applyMode('adsorption');
    if (!reduce) { for (var k0 = 0; k0 < 7; k0++) spawn(-90 + 30 + k0 * 46); }
    start();
})();
