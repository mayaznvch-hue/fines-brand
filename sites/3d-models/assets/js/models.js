/* Финес Студио · 10 лёгких 3D-моделей · чистый WebGL, без библиотек.
   Сцена живёт только пока её окно на экране: контекст создаётся при появлении и освобождается при уходе. */
(function () {
  'use strict';
  var stages = document.querySelectorAll('[data-m]');
  if (!stages.length || !window.WebGLRenderingContext) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PI = Math.PI;
  var fix = /[?&]mt=([\d.]+)/.exec(location.search);
  if (fix) { fix = +fix[1]; reduce = true; }

  /* ---------- математика (матрицы 3x3 по строкам) ---------- */
  function mul(a, b) {
    var o = new Array(9), i, j;
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) o[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
    return o;
  }
  function rx(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, c, -s, 0, s, c]; }
  function ry(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, s, 0, 1, 0, -s, 0, c]; }
  function rz(a) { var c = Math.cos(a), s = Math.sin(a); return [c, -s, 0, s, c, 0, 0, 0, 1]; }
  function rot(r) { return mul(ry(r[1]), mul(rx(r[0]), rz(r[2]))); }
  function app(m, v) { return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]]; }
  function sm(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); }
  function seg(t, a, b) { return sm((t - a) / (b - a)); }
  function mix(a, b, k) { return a + (b - a) * k; }

  /* ---------- геометрия: массив [x,y,z,nx,ny,nz] на вершину ---------- */
  function rbox(w, h, d, r, s) {
    s = s || 2;
    var H = [w / 2, h / 2, d / 2], v = [], a, b, c, sg, i, j;
    r = Math.max(0.004, Math.min(r || 0, H[0], H[1], H[2]));
    function cs(hh) { var o = [], k; for (k = 0; k <= s; k++) o.push(-hh + r * k / s); for (k = 0; k <= s; k++) o.push(hh - r + r * k / s); return o; }
    function vert(P) {
      var I = [], N = [], L = 0, k, m;
      for (k = 0; k < 3; k++) { m = H[k] - r; I[k] = Math.max(-m, Math.min(m, P[k])); N[k] = P[k] - I[k]; L += N[k] * N[k]; }
      L = Math.sqrt(L) || 1;
      for (k = 0; k < 3; k++) N[k] /= L;
      v.push(I[0] + N[0] * r, I[1] + N[1] * r, I[2] + N[2] * r, N[0], N[1], N[2]);
    }
    for (a = 0; a < 3; a++) {
      b = (a + 1) % 3; c = (a + 2) % 3;
      var cb = cs(H[b]), cc = cs(H[c]);
      for (sg = -1; sg <= 1; sg += 2) for (i = 0; i < cb.length - 1; i++) for (j = 0; j < cc.length - 1; j++) {
        var q = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j], [i + 1, j + 1], [i, j + 1]], k2;
        for (k2 = 0; k2 < 6; k2++) { var P = []; P[a] = sg * H[a]; P[b] = cb[q[k2][0]]; P[c] = cc[q[k2][1]]; vert(P); }
      }
    }
    return { v: v };
  }
  function cyl(r, h, n) {
    var v = [], i, a0, a1, c0, s0, c1, s1, y = h / 2;
    for (i = 0; i < n; i++) {
      a0 = i / n * 2 * PI; a1 = (i + 1) / n * 2 * PI; c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      v.push(r * c0, -y, r * s0, c0, 0, s0, r * c1, -y, r * s1, c1, 0, s1, r * c1, y, r * s1, c1, 0, s1,
             r * c0, -y, r * s0, c0, 0, s0, r * c1, y, r * s1, c1, 0, s1, r * c0, y, r * s0, c0, 0, s0,
             0, y, 0, 0, 1, 0, r * c0, y, r * s0, 0, 1, 0, r * c1, y, r * s1, 0, 1, 0,
             0, -y, 0, 0, -1, 0, r * c0, -y, r * s0, 0, -1, 0, r * c1, -y, r * s1, 0, -1, 0);
    }
    return { v: v };
  }
  function sphere(r, nu, nv) {
    var v = [], i, j;
    function pt(u, w) { var a = u / nu * 2 * PI, b = w / nv * PI, x = Math.sin(b) * Math.cos(a), y = Math.cos(b), z = Math.sin(b) * Math.sin(a); v.push(x * r, y * r, z * r, x, y, z); }
    for (i = 0; i < nu; i++) for (j = 0; j < nv; j++) { pt(i, j); pt(i + 1, j); pt(i + 1, j + 1); pt(i, j); pt(i + 1, j + 1); pt(i, j + 1); }
    return { v: v };
  }
  function torus(R, r, nu, nv, arc) {
    var v = [], i, j; arc = arc || 2 * PI;
    function pt(u, w) { var a = u / nu * arc, b = w / nv * 2 * PI, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b); v.push((R + r * cb) * ca, (R + r * cb) * sa, r * sb, cb * ca, cb * sa, sb); }
    for (i = 0; i < nu; i++) for (j = 0; j < nv; j++) { pt(i, j); pt(i + 1, j); pt(i + 1, j + 1); pt(i, j); pt(i + 1, j + 1); pt(i, j + 1); }
    return { v: v };
  }
  function rod(A, B, r, n) {
    var d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], L = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), v = [], i, k;
    d = [d[0] / L, d[1] / L, d[2] / L];
    var t = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    var u = [d[1] * t[2] - d[2] * t[1], d[2] * t[0] - d[0] * t[2], d[0] * t[1] - d[1] * t[0]], ul = Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]);
    u = [u[0] / ul, u[1] / ul, u[2] / ul];
    var w = [d[1] * u[2] - d[2] * u[1], d[2] * u[0] - d[0] * u[2], d[0] * u[1] - d[1] * u[0]];
    function pt(P, a) { var c = Math.cos(a), s = Math.sin(a), nx = u[0] * c + w[0] * s, ny = u[1] * c + w[1] * s, nz = u[2] * c + w[2] * s; v.push(P[0] + nx * r, P[1] + ny * r, P[2] + nz * r, nx, ny, nz); }
    for (i = 0; i < n; i++) { var a0 = i / n * 2 * PI, a1 = (i + 1) / n * 2 * PI; pt(A, a0); pt(A, a1); pt(B, a1); pt(A, a0); pt(B, a1); pt(B, a0); }
    return { v: v };
  }
  function flat(p) {
    var v = [], i, k;
    for (i = 0; i < p.length; i += 3) {
      var a = p[i], b = p[i + 1], c = p[i + 2], e = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], f = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      var n = [e[1] * f[2] - e[2] * f[1], e[2] * f[0] - e[0] * f[2], e[0] * f[1] - e[1] * f[0]], l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]) || 1;
      for (k = 0; k < 3; k++) v.push(p[i + k][0], p[i + k][1], p[i + k][2], n[0] / l, n[1] / l, n[2] / l);
    }
    return { v: v };
  }
  function join() {
    var v = [], i, j;
    for (i = 0; i < arguments.length; i++) { var g = arguments[i][0].v, o = arguments[i][1] || [0, 0, 0]; for (j = 0; j < g.length; j += 6) v.push(g[j] + o[0], g[j + 1] + o[1], g[j + 2] + o[2], g[j + 3], g[j + 4], g[j + 5]); }
    return { v: v };
  }

  /* ---------- материалы: цвет + [фон, рассеянный, блик, кромка] ---------- */
  var MAT = {
    g: { c: [0.27, 0.27, 0.31], m: [0.5, 0.8, 0.28, 0.5] },   // графит
    k: { c: [0.4, 0.4, 0.44], m: [0.4, 0.75, 0.3, 0.25] },    // сталь
    s: { c: [0.76, 0.76, 0.79], m: [0.22, 0.62, 0.55, 0.14] },// серебро
    c: { c: [0.96, 0.945, 0.92], m: [0.34, 0.6, 0.2, 0.04] }, // крем
    o: { c: [0.95, 0.315, 0.11], m: [0.52, 0.6, 0.34, 0.12] }, // акцент
    d: { c: [0.15, 0.15, 0.18], m: [0.5, 0.8, 0.22, 0.6] }     // тёмная основа
  };
  /* ---------- палитры: только цвета, свет и геометрия те же. ?pal=имя или data-pal у сцены ---------- */
  var PAL = {
    blue: { g: [0.24, 0.26, 0.32], k: [0.36, 0.39, 0.46], s: [0.72, 0.75, 0.82], c: [0.93, 0.95, 0.98], o: [0.16, 0.4, 0.98], d: [0.13, 0.14, 0.18] },
    brass: { g: [0.29, 0.27, 0.25], k: [0.42, 0.4, 0.37], s: [0.76, 0.73, 0.68], c: [0.96, 0.93, 0.87], o: [0.8, 0.6, 0.27], d: [0.16, 0.15, 0.14] },
    emerald: { g: [0.24, 0.28, 0.27], k: [0.36, 0.41, 0.4], s: [0.73, 0.78, 0.76], c: [0.94, 0.96, 0.94], o: [0.08, 0.62, 0.44], d: [0.13, 0.16, 0.155] },
    mono: { g: [0.25, 0.25, 0.27], k: [0.36, 0.36, 0.38], s: [0.5, 0.5, 0.53], c: [0.62, 0.62, 0.64], o: [1, 1, 1], d: [0.14, 0.14, 0.16] },
    paper: { g: [0.38, 0.38, 0.41], k: [0.29, 0.29, 0.32], s: [0.2, 0.2, 0.24], c: [0.11, 0.11, 0.14], o: [0.95, 0.315, 0.11], d: [0.46, 0.455, 0.45] }
  };
  var gpal = /[?&]pal=([a-z]+)/.exec(location.search);
  gpal = gpal && PAL[gpal[1]] ? gpal[1] : '';
  if (gpal) document.documentElement.setAttribute('data-pal', gpal);
  function P(g, m, p, r, s, f) { return { g: g, k: m, m: MAT[m], p: p || [0, 0, 0], r: r || [0, 0, 0], s: s || [1, 1, 1], f: f || null }; }

  /* ---------- сцены ---------- */
  var SC = {};

  // 01 · Telegram-бот: бумажный самолёт (два крыла и сложенный корпус)
  SC.plane = function () {
    var N = [1.4, -0.05, 0], K = [-1.0, -0.72, 0], A = [-1.0, 0.02, 0.15], B = [-1.0, 0.02, -0.15], L = [-1.2, 0.42, 0.95], R = [-1.2, 0.42, -0.95];
    var wingL = flat([N, A, L]), wingR = flat([N, R, B]), sideL = flat([N, K, A]), sideR = flat([N, B, K]), dot = sphere(1, 14, 10);
    function fly(t, o) { o.p[1] += 0.09 * Math.sin(t * 1.3); o.r[0] = 0.2 * Math.sin(t * 0.9); o.r[2] = 0.05 * Math.sin(t * 1.3 + 1); }
    var O = [0.32, 0.12, 0];
    var parts = [P(wingL, 'c', O, 0, 0, fly), P(wingR, 'c', O, 0, 0, fly), P(sideL, 'c', O, 0, 0, fly), P(sideR, 'c', O, 0, 0, fly)];
    [[-1.14, 0.11], [-1.54, 0.088], [-1.9, 0.068]].forEach(function (d, i) {
      parts.push(P(dot, 'o', [d[0], 0.11, 0], 0, 0, function (t, o) { var k = d[1] * (0.75 + 0.25 * Math.sin(t * 3 - i * 1.1)); o.s = [k, k, k]; o.p[1] += 0.05 * Math.sin(t * 1.3 - 0.5 - i * 0.4); }));
    });
    return { scale: 0.6, tilt: [0.14, -0.55, 0.16], sway: [0.18, 0.5], still: 1, parts: parts };
  };

  // 02 · Диалог: бот печатает и отвечает
  SC.chat = function () {
    var bub = rbox(1.9, 0.86, 0.3, 0.15, 3), dot = sphere(0.085, 14, 10), l1 = rbox(1.15, 0.09, 0.05, 0.03), l2 = rbox(0.72, 0.09, 0.05, 0.03);
    var parts = [P(bub, 'g', [-0.42, 0.56, 0])], i;
    for (i = 0; i < 3; i++) (function (i) {
      parts.push(P(dot, 'c', [-0.42 + (i - 1) * 0.3, 0.56, 0.19], 0, 0, function (t, o) { o.p[1] += 0.09 * Math.max(0, Math.sin(t * 3.4 - i * 0.8)); }));
    })(i);
    var B = [0.42, -0.5, 0.32];
    function pop(rel) { return function (t, o) { var T = t % 7, k = Math.max(0.001, seg(T, 1.5, 1.95) * (1 - seg(T, 6.4, 6.8))); o.p = [B[0] + rel[0] * k, B[1] + rel[1] * k + 0.03 * Math.sin(t * 1.1), B[2] + rel[2] * k]; o.s = [k, k, k]; }; }
    parts.push(P(bub, 'o', B, 0, 0, pop([0, 0, 0])), P(l1, 'c', B, 0, 0, pop([-0.2, 0.13, 0.17])), P(l2, 'c', B, 0, 0, pop([-0.415, -0.13, 0.17])));
    return { scale: 0.7, tilt: [0.1, -0.5, 0], sway: [0.22, 0.45], still: 3.5, parts: parts };
  };

  // 03 · Воронка продаж: на каждом уровне заявок меньше, одна выходит сделкой
  SC.funnel = function () {
    var R = [1.3, 0.8, 0.45, 0.28, 0.28], Y = [0.85, 0.38, -0.06, -0.42, -0.86], M = R.length, N = [7, 4, 2], parts = [], bead = sphere(0.085, 14, 10), i, j, a;
    for (i = 0; i < M - 1; i++) for (j = 0; j < 12; j++) { a = j / 12 * 2 * PI; parts.push(P(rod([R[i] * Math.cos(a), Y[i], R[i] * Math.sin(a)], [R[i + 1] * Math.cos(a), Y[i + 1], R[i + 1] * Math.sin(a)], 0.015, 6), 's')); }
    for (i = 0; i < M; i++) {
      parts.push(P(torus(R[i], 0.045, 56, 10), 's', [0, Y[i], 0], [PI / 2, 0, 0]));
      for (j = 0; j < (N[i] || 0); j++) (function (i, j) {
        parts.push(P(bead, 'c', [0, Y[i], 0], 0, 0, function (t, o) { var a = t * (0.35 + i * 0.12) * (i % 2 ? -1 : 1) + j * 2 * PI / N[i]; o.p[0] = R[i] * Math.cos(a); o.p[2] = R[i] * Math.sin(a); }));
      })(i, j);
    }
    parts.push(P(sphere(0.24, 22, 16), 'o', [0, Y[M - 1] - 0.5, 0], 0, 0, function (t, o) { o.p[1] += 0.06 * Math.sin(t * 1.5); }));
    return { scale: 0.58, off: [0, 0.2, 0], tilt: [0.42, 0, 0], sway: [0, 0], still: 1, parts: parts };
  };

  // 04 · CRM: сделка переходит по этапам
  SC.kanban = function () {
    var cw = 0.84, ch = 0.32, card = rbox(cw, ch, 0.07, 0.05), parts = [P(rbox(3.1, 2.0, 0.08, 0.08, 3), 'd', [0, 0, -0.05])], X = [-1, 0, 1], cnt = [3, 2, 1], i, j;
    var slot = join([rbox(cw, 0.02, 0.02, 0.008), [0, ch / 2, 0]], [rbox(cw, 0.02, 0.02, 0.008), [0, -ch / 2, 0]], [rbox(0.02, ch, 0.02, 0.008), [-cw / 2, 0, 0]], [rbox(0.02, ch, 0.02, 0.008), [cw / 2, 0, 0]]);
    function y(k) { return 0.5 - k * 0.4; }
    for (i = 0; i < 3; i++) {
      parts.push(P(rbox(cw, 0.06, 0.03, 0.02), 's', [X[i], 0.82, 0.01]));
      for (j = 0; j < cnt[i]; j++) parts.push(P(card, 'k', [X[i], y(j), 0.03]));
    }
    var A = [X[0], y(3)], B = [X[1], y(2)], C = [X[2], y(1)];
    [A, B, C].forEach(function (q) { parts.push(P(slot, 'k', [q[0], q[1], 0])); });
    function path(t) {
      var T = t % 9, a, b, k;
      if (T < 3) { a = A; b = B; k = seg(T, 1.5, 3); } else if (T < 6) { a = B; b = C; k = seg(T, 4.5, 6); } else { a = C; b = A; k = seg(T, 7.5, 9); }
      return [mix(a[0], b[0], k), mix(a[1], b[1], k), Math.sin(PI * k), b[0], b[1]];
    }
    parts.push(P(slot, 'o', [B[0], B[1], 0.004], 0, 0, function (t, o) { var q = path(t); o.p[0] = q[3]; o.p[1] = q[4]; }));
    parts.push(P(card, 'o', [A[0], A[1], 0.03], 0, 0, function (t, o) {
      var q = path(t);
      o.p = [q[0], q[1], 0.03 + 0.34 * q[2]];
      o.r[0] = -0.25 * q[2]; o.r[1] = 0.2 * q[2];
    }));
    return { scale: 0.62, tilt: [-0.62, -0.36, 0], sway: [0.14, 0.4], still: 2.2, parts: parts };
  };

  // 05 · Интеграции: системы обмениваются данными сами
  SC.hub = function () {
    var nodes = [[-1.45, 0.72, 0.3], [1.4, 0.82, -0.4], [-1.2, -0.88, -0.3], [1.3, -0.72, 0.5], [0.05, 1.22, -0.55]], node = rbox(0.4, 0.4, 0.4, 0.09), pulse = sphere(0.075, 14, 10);
    var parts = [P(rbox(0.74, 0.74, 0.74, 0.13, 3), 's')];
    nodes.forEach(function (n, i) {
      parts.push(P(node, 'g', n), P(rod([0, 0, 0], n, 0.018, 8), 'k'));
      parts.push(P(pulse, 'o', [0, 0, 0], 0, 0, function (t, o) { var k = 0.46 + 0.25 * (0.5 - 0.5 * Math.cos(t * 1.15 + i * 1.7)); o.p = [n[0] * k, n[1] * k, n[2] * k]; }));
    });
    return { scale: 0.6, tilt: [0.18, 0.4, 0], sway: [0.5, 0.3], still: 1.2, parts: parts };
  };

  // 06 · Защита: замок закрывается
  SC.lock = function () {
    var sh = join([torus(0.42, 0.09, 28, 12, PI)], [rod([0.42, 0.01, 0], [0.42, -0.6, 0], 0.09, 12)], [rod([-0.42, 0.01, 0], [-0.42, -0.6, 0], 0.09, 12)]);
    var parts = [
      P(sh, 's', [0, 0.52, 0], 0, 0, function (t, o) { var T = t % 6.5; o.p[1] += 0.26 * (1 - seg(T, 0.9, 1.3) + seg(T, 5.6, 6.1)); }),
      P(rbox(1.36, 1.1, 0.56, 0.15, 3), 'k', [0, -0.3, 0]),
      P(cyl(0.26, 0.05, 36), 'o', [0, -0.3, 0.285], [PI / 2, 0, 0]),
      P(cyl(0.075, 0.02, 24), 'd', [0, -0.24, 0.315], [PI / 2, 0, 0]),
      P(rbox(0.07, 0.2, 0.02, 0.01), 'd', [0, -0.36, 0.315])
    ];
    return { scale: 0.7, off: [0, -0.2, 0], tilt: [0.1, -0.48, 0], sway: [0.32, 0.45], still: 3, parts: parts };
  };

  // 07 · Резервные копии: данные уходят во второе хранилище
  SC.backup = function () {
    var disc = cyl(0.6, 0.26, 44), parts = [], i, Y = [-0.36, 0, 0.36];
    for (i = 0; i < 3; i++) parts.push(P(disc, 's', [-0.9, Y[i] - 0.1, 0]), P(disc, 'g', [0.9, Y[i] - 0.1, 0]));
    parts.push(P(cyl(0.6, 0.09, 44), 'o', [-0.9, 0.5, 0], 0, 0, function (t, o) {
      var T = t % 4.6, k = seg(T, 0.6, 2.5), s = Math.max(0.001, seg(T, 0, 0.5) * (1 - seg(T, 2.8, 3.3)));
      o.p = [mix(-0.9, 0.9, k), 0.5 + 0.62 * Math.sin(PI * k), 0]; o.s = [s, 1, s]; o.r[2] = -0.5 * Math.sin(PI * k) * (0.5 - k) * 2;
    }));
    var tr = sphere(1, 12, 8);
    [0.09, 0.17, 0.25, 0.33].forEach(function (lag, n) {
      parts.push(P(tr, 'o', [0, 0, 0], 0, 0, function (t, o) {
        var T = t % 4.6, k = seg(T, 0.6, 2.5), kk = Math.max(0, k - lag), s = (0.07 - n * 0.012) * (k > lag + 0.02 && k < 0.99 ? 1 : 0.001);
        o.p = [mix(-0.9, 0.9, kk), 0.5 + 0.62 * Math.sin(PI * kk), 0]; o.s = [s, s, s];
      }));
    });
    return { scale: 0.62, off: [0, -0.15, 0], tilt: [0.4, -0.3, 0], sway: [0.18, 0.4], still: 1.9, parts: parts };
  };

  // 08 · Сайт и веб-сервис: интерфейс в слоях
  SC.site = function () {
    function lv(n) { return function (t, o) { o.p[2] = 0.05 + n * (0.08 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.8))); }; }
    var cardg = rbox(0.76, 0.44, 0.06, 0.05), dot = sphere(0.04, 10, 8);
    var parts = [
      P(rbox(2.7, 1.84, 0.08, 0.09, 3), 'g'),
      P(rbox(2.5, 0.03, 0.02, 0.01), 'k', [0, 0.62, 0.05]),
      P(dot, 'o', [-1.14, 0.76, 0.07]), P(dot, 'c', [-1.0, 0.76, 0.07]), P(dot, 'c', [-0.86, 0.76, 0.07]),
      P(rbox(1.4, 0.6, 0.06, 0.05), 'k', [-0.4, 0.14, 0], 0, 0, lv(1)),
      P(rbox(0.86, 0.6, 0.06, 0.05), 'k', [0.82, 0.14, 0], 0, 0, lv(1)),
      P(cardg, 'k', [-0.72, -0.52, 0], 0, 0, lv(1)), P(cardg, 'k', [0.1, -0.52, 0], 0, 0, lv(1)), P(cardg, 'k', [0.92, -0.52, 0], 0, 0, lv(1)),
      P(rbox(0.9, 0.09, 0.04, 0.02), 'c', [-0.42, 0.27, 0], 0, 0, lv(2)),
      P(rbox(0.64, 0.22, 0.07, 0.07), 'o', [-0.55, -0.01, 0], 0, 0, lv(2.6))
    ];
    return { scale: 0.6, tilt: [-0.36, -0.58, 0], sway: [0.18, 0.4], still: 2, parts: parts };
  };

  // 09 · Отчёты: цифры растут
  SC.bars = function () {
    var bar = rbox(0.32, 1, 0.32, 0.05), Hh = [0.45, 0.75, 0.6, 1.05, 1.5], parts = [P(rbox(2.7, 0.1, 1.2, 0.05), 'g', [0, -0.8, 0])], i;
    for (i = 0; i < 5; i++) (function (i) {
      parts.push(P(bar, i === 4 ? 'o' : (i % 2 ? 's' : 'k'), [-0.96 + i * 0.48, 0, 0], 0, 0, function (t, o) {
        var T = t % 8, h = mix(0.06, Hh[i], seg(T, 0.3 + i * 0.25, 1.3 + i * 0.25) * (1 - seg(T, 7, 7.8)));
        o.s = [1, h, 1]; o.p[1] = -0.75 + h / 2;
      }));
    })(i);
    return { scale: 0.62, tilt: [0.36, -0.62, 0], sway: [0.22, 0.4], still: 4, parts: parts };
  };

  // 10 · Оплата: карта
  SC.pay = function () {
    var card = rbox(2.2, 1.38, 0.07, 0.11, 3), num = rbox(0.34, 0.07, 0.02, 0.02), parts, i;
    function bob(ph) { return function (t, o) { o.p[1] += 0.05 * Math.sin(t * 1.1 + ph); }; }
    parts = [
      P(card, 'k', [0.4, 0.34, -0.34], [0, 0, 0.1], 0, bob(1.4)),
      P(rbox(2.2, 0.2, 0.02, 0.01), 'd', [0.36, 0.76, -0.3], [0, 0, 0.1], 0, bob(1.4)),
      P(card, 'c', [-0.08, -0.08, 0], 0, 0, bob(0)),
      P(rbox(0.36, 0.28, 0.03, 0.05), 'o', [-0.72, 0.1, 0.045], 0, 0, bob(0)),
      P(rbox(0.36, 0.018, 0.012, 0.005), 'd', [-0.72, 0.1, 0.064], 0, 0, bob(0)),
      P(rbox(0.018, 0.28, 0.012, 0.005), 'd', [-0.72, 0.1, 0.064], 0, 0, bob(0)),
      P(rbox(0.72, 0.06, 0.02, 0.02), 'k', [-0.54, -0.56, 0.04], 0, 0, bob(0))
    ];
    for (i = 0; i < 4; i++) parts.push(P(num, 'g', [-0.73 + i * 0.43, -0.3, 0.04], 0, 0, bob(0)));
    return { scale: 0.6, off: [-0.1, -0.1, 0], tilt: [0.14, -0.5, -0.1], sway: [0.34, 0.45], still: 1, parts: parts };
  };

  /* ---------- шейдеры ---------- */
  var VS = 'attribute vec3 aP;attribute vec3 aN;uniform mat3 uR;uniform vec3 uT;uniform vec3 uSc;uniform float uAsp;uniform float uScale;varying vec3 vN;varying vec3 vP;' +
    'void main(){vec3 p=(aP*uSc)*uR+uT;vN=(aN/uSc)*uR;vP=p;float d=6.-p.z;vec2 xy=p.xy/d*6.*uScale;gl_Position=vec4(xy.x/uAsp,xy.y,d/6.-1.,1.);}';
  var FS = 'precision mediump float;varying vec3 vN;varying vec3 vP;uniform vec3 uCol;uniform vec4 uMt;' +
    'void main(){vec3 n=normalize(vN);vec3 v=normalize(vec3(0.,0.,6.)-vP);if(dot(n,v)<0.)n=-n;' +
    'vec3 l=normalize(vec3(.45,.8,.6));float df=max(dot(n,l),0.);vec3 r=reflect(-v,n);' +
    'float sp=pow(max(dot(r,l),0.),26.);float fr=pow(1.-max(dot(n,v),0.),3.);float env=.5+.5*r.y;' +
    'vec3 c=uCol*(uMt.x+uMt.y*df+.25*env)+vec3(1.,.95,.9)*sp*uMt.z+vec3(.85,.87,.95)*fr*uMt.w;gl_FragColor=vec4(c,1.);}';

  /* ---------- сцена в окне ---------- */
  var mx = 0, my = 0;
  if (!reduce && window.matchMedia && matchMedia('(hover:hover)').matches) {
    window.addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  }

  function Stage(el) {
    var make = SC[el.getAttribute('data-m')];
    if (!make) return;
    var pal = PAL[el.getAttribute('data-pal') || gpal] || null;
    var def = null, cv = null, gl = null, U = null, bufs = [], raf = 0, t0 = 0, W = 0, H = 0, live = false, tx = 0, ty = 0;

    function start() {
      if (live) return;
      cv = document.createElement('canvas');
      cv.setAttribute('aria-hidden', 'true');
      try { gl = cv.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' }); } catch (e) { gl = null; }
      if (!gl) { cv = null; if (window.console) console.warn('3d: no webgl context'); return; }
      var pr = gl.createProgram(), ok = true;
      [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, FS]].forEach(function (s) {
        var o = gl.createShader(s[0]); gl.shaderSource(o, s[1]); gl.compileShader(o);
        if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) ok = false;
        gl.attachShader(pr, o);
      });
      gl.linkProgram(pr);
      if (!ok || !gl.getProgramParameter(pr, gl.LINK_STATUS)) { gl = null; cv = null; return; }
      gl.useProgram(pr);
      U = {}; ['uR', 'uT', 'uSc', 'uAsp', 'uScale', 'uCol', 'uMt'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
      U.aP = gl.getAttribLocation(pr, 'aP'); U.aN = gl.getAttribLocation(pr, 'aN');
      gl.enableVertexAttribArray(U.aP); gl.enableVertexAttribArray(U.aN);
      gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0);
      if (!def) def = make();
      bufs = [];
      def.parts.forEach(function (p) {
        var i, b = null;
        for (i = 0; i < bufs.length; i++) if (bufs[i].g === p.g) b = bufs[i];
        if (!b) { b = { g: p.g, b: gl.createBuffer(), n: p.g.v.length / 6 }; gl.bindBuffer(gl.ARRAY_BUFFER, b.b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p.g.v), gl.STATIC_DRAW); bufs.push(b); }
        p.buf = b;
      });
      el.insertBefore(cv, el.firstChild);
      live = true; t0 = performance.now(); W = H = 0;
      size(); frame(t0);
      requestAnimationFrame(function () { if (cv) cv.className = 'on'; });
    }
    function stop() {
      if (!live) return;
      live = false; cancelAnimationFrame(raf);
      var ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
      if (cv.parentNode) cv.parentNode.removeChild(cv);
      cv = null; gl = null; bufs = [];
    }
    function size() {
      var r = el.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d);
      if (!w || !h || (w === W && h === H)) return;
      W = w; H = h; cv.width = w; cv.height = h; gl.viewport(0, 0, w, h);
    }
    function frame(now) {
      if (!live) return;
      size();
      var t = fix !== null ? fix : reduce ? def.still : (now - t0) / 1000 + def.still;
      tx += (mx - tx) * 0.06; ty += (my - ty) * 0.06;
      var S = mul(rz(def.tilt[2]), mul(rx(def.tilt[0] + ty * 0.22), ry(def.tilt[1] + def.sway[0] * Math.sin(t * def.sway[1]) + tx * 0.35)));
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform1f(U.uAsp, W / H); gl.uniform1f(U.uScale, def.scale * 1.08);
      var i, p, o = { p: null, r: null, s: null }, last = null;
      for (i = 0; i < def.parts.length; i++) {
        p = def.parts[i];
        o.p = [p.p[0], p.p[1], p.p[2]]; o.r = [p.r[0], p.r[1], p.r[2]]; o.s = p.s;
        if (p.f) p.f(t, o);
        gl.uniformMatrix3fv(U.uR, false, mul(S, rot(o.r)));
        if (def.off) { o.p[0] += def.off[0]; o.p[1] += def.off[1]; o.p[2] += def.off[2]; }
        gl.uniform3fv(U.uT, app(S, o.p)); gl.uniform3fv(U.uSc, o.s);
        gl.uniform3fv(U.uCol, pal ? pal[p.k] : p.m.c); gl.uniform4fv(U.uMt, p.m.m);
        if (last !== p.buf) { last = p.buf; gl.bindBuffer(gl.ARRAY_BUFFER, last.b); gl.vertexAttribPointer(U.aP, 3, gl.FLOAT, false, 24, 0); gl.vertexAttribPointer(U.aN, 3, gl.FLOAT, false, 24, 12); }
        gl.drawArrays(gl.TRIANGLES, 0, last.n);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    window.addEventListener('resize', function () { if (live && reduce) frame(0); });
    document.addEventListener('visibilitychange', function () { if (!live || reduce) return; cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }, { rootMargin: '80px 0px' }).observe(el);
    else start();
  }
  for (var i = 0; i < stages.length; i++) Stage(stages[i]);
})();
