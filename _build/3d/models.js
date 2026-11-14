/* Финес Студио · 20 лёгких 3D-моделей · чистый WebGL, без библиотек.
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
  function lathe(pr, n) {
    var v = [], N = [], i, j;
    for (i = 0; i < pr.length; i++) { var a = pr[Math.max(0, i - 1)], b = pr[Math.min(pr.length - 1, i + 1)], dr = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dr * dr + dy * dy) || 1; N.push([-dy / l, dr / l]); }
    function pt(i, j) { var a = j / n * 2 * PI, c = Math.cos(a), s = Math.sin(a); v.push(pr[i][0] * c, pr[i][1], pr[i][0] * s, N[i][0] * c, N[i][1], N[i][0] * s); }
    for (i = 0; i < pr.length - 1; i++) for (j = 0; j < n; j++) { pt(i, j); pt(i, j + 1); pt(i + 1, j + 1); pt(i, j); pt(i + 1, j + 1); pt(i + 1, j); }
    return { v: v };
  }
  function ext(pts, h) {
    var p = [], n = pts.length, cx = 0, cy = 0, z = h / 2, i;
    for (i = 0; i < n; i++) { cx += pts[i][0] / n; cy += pts[i][1] / n; }
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      p.push([cx, cy, z], [a[0], a[1], z], [b[0], b[1], z], [cx, cy, -z], [b[0], b[1], -z], [a[0], a[1], -z], [a[0], a[1], z], [a[0], a[1], -z], [b[0], b[1], -z], [a[0], a[1], z], [b[0], b[1], -z], [b[0], b[1], z]);
    }
    return flat(p);
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
  var SC = {}, UNIT = sphere(1, 18, 12);
  function ball(m, r, p, f) { return P(UNIT, m, p, 0, [r, r, r], f); }
  function lerp3(a, b, k) { return [mix(a[0], b[0], k), mix(a[1], b[1], k), mix(a[2], b[2], k)]; }

  // 01 · Telegram-бот: самолёт летит по орбите и оставляет след
  SC.plane = function () {
    var N = [1.4, -0.05, 0], K = [-1.0, -0.72, 0], A = [-1.0, 0.02, 0.15], B = [-1.0, 0.02, -0.15], L = [-1.2, 0.42, 0.95], R = [-1.2, 0.42, -0.95];
    var body = join([flat([N, A, L])], [flat([N, R, B])], [flat([N, K, A])], [flat([N, B, K])]);
    var RX = 1.5, RZ = 0.95, W = 0.75;
    function at(a) { return [RX * Math.cos(a), 0.12 * Math.sin(2 * a), RZ * Math.sin(a)]; }
    var parts = [P(torus(1, 0.008, 96, 6), 'k', 0, [PI / 2, 0, 0], [RX, RZ, 1])], i;
    parts.push(P(body, 'c', 0, 0, [0.5, 0.5, 0.5], function (t, o) {
      var a = t * W; o.p = at(a); o.p[1] += 0.2;
      o.r[1] = Math.atan2(-RZ * Math.cos(a), -RX * Math.sin(a)); o.r[0] = -0.4; o.r[2] = 0.1 * Math.cos(2 * a);
    }));
    for (i = 0; i < 8; i++) (function (i) {
      parts.push(P(UNIT, 'o', 0, 0, 0, function (t, o) { var s = 0.062 * (1 - i / 9); o.p = at(t * W - 0.5 - 0.2 * i); o.p[1] += 0.14; o.s = [s, s, s]; }));
    })(i);
    return { scale: 0.8, tilt: [0.42, 0, 0.06], sway: [0.12, 0.4], still: 2.1, parts: parts };
  };

  // 02 · Диалог: бот печатает, отвечает и предлагает кнопки
  SC.chat = function () {
    var bub = rbox(1.9, 0.8, 0.3, 0.15, 3), l1 = rbox(1.15, 0.09, 0.05, 0.03), l2 = rbox(0.72, 0.09, 0.05, 0.03), chip = rbox(0.66, 0.26, 0.14, 0.07, 3);
    var parts = [P(bub, 'g', [-0.42, 0.74, 0])], i;
    for (i = 0; i < 3; i++) (function (i) {
      parts.push(ball('c', 0.085, [-0.42 + (i - 1) * 0.3, 0.74, 0.19], function (t, o) { o.p[1] += 0.09 * Math.max(0, Math.sin(t * 3.4 - i * 0.8)); }));
    })(i);
    function pop(B, rel, a, b) { return function (t, o) { var T = t % 7, k = Math.max(0.001, seg(T, a, b) * (1 - seg(T, 6.4, 6.8))); o.p = [B[0] + rel[0] * k, B[1] + rel[1] * k + 0.03 * Math.sin(t * 1.1), B[2] + rel[2] * k]; o.s = [k, k, k]; }; }
    var B = [0.42, -0.22, 0.32];
    parts.push(P(bub, 'o', B, 0, 0, pop(B, [0, 0, 0], 1.5, 1.95)), P(l1, 'c', B, 0, 0, pop(B, [-0.2, 0.13, 0.17], 1.5, 1.95)), P(l2, 'c', B, 0, 0, pop(B, [-0.415, -0.13, 0.17], 1.5, 1.95)));
    parts.push(P(chip, 's', 0, 0, 0, pop([-0.2, -0.92, 0.3], [0, 0, 0], 2.3, 2.65)), P(chip, 's', 0, 0, 0, pop([0.56, -0.92, 0.3], [0, 0, 0], 2.5, 2.85)));
    return { scale: 0.74, off: [0, 0.08, 0], tilt: [0.1, -0.5, 0], sway: [0.22, 0.45], still: 3.5, parts: parts };
  };

  // 03 · Воронка продаж: заявок входит много, до сделки доходит одна
  SC.funnel = function () {
    var PR = [[1.3, 0.8], [1.2, 0.6], [0.5, -0.12], [0.27, -0.32], [0.27, -0.85]];
    function wall(u) { var f = Math.max(0, Math.min(u, 0.999)) * 4, i = Math.floor(f), k = f - i; return [mix(PR[i][0], PR[i + 1][0], k), mix(PR[i][1], PR[i + 1][1], k)]; }
    var parts = [P(lathe(PR, 64), 'g'), P(torus(1.3, 0.035, 72, 8), 's', [0, 0.8, 0], [PI / 2, 0, 0]), P(torus(0.27, 0.025, 36, 8), 's', [0, -0.85, 0], [PI / 2, 0, 0])];
    [0.3, 0.44, 0.34, 0.6, 0.5, 0.72, 0.4].forEach(function (cut, i) {
      parts.push(P(UNIT, 'c', 0, 0, 0, function (t, o) {
        var u = (t * 0.13 + i * 0.143) % 1, w = wall(u), a = u * 9 + i * 2.1, r = Math.max(0, w[0] - 0.1), s = 0.075 * Math.max(0.001, seg(u, 0, 0.04) * (1 - seg(u, cut - 0.07, cut)));
        o.p = [r * Math.cos(a), w[1] + 0.07, r * Math.sin(a)]; o.s = [s, s, s];
      }));
    });
    parts.push(P(UNIT, 'o', 0, 0, 0, function (t, o) {
      var u = ((t * 0.16) % 1) * 1.3, w = wall(u), a = u * 9 + 2.0, r = Math.max(0, w[0] - 0.15) * (1 - seg(u, 0.55, 0.78)), s = 0.13 * Math.max(0.001, seg(u, 0, 0.05) * (1 - seg(u, 1.2, 1.3)));
      o.p = [r * Math.cos(a), u < 1 ? w[1] + 0.1 : -0.85 - (u - 1) * 2.2, r * Math.sin(a)]; o.s = [s, s, s];
    }));
    return { scale: 0.6, off: [0, 0.1, 0], tilt: [0.6, 0, 0], sway: [0, 0], still: 1.44, parts: parts };
  };

  // 04 · CRM: сделка переходит по этапам
  SC.kanban = function () {
    var cw = 0.84, ch = 0.32, card = rbox(cw, ch, 0.07, 0.05), parts = [P(rbox(3.1, 2.0, 0.08, 0.08, 3), 'd', [0, 0, -0.05])], X = [-1, 0, 1], cnt = [3, 2, 1], i, j;
    var slot = join([rbox(cw, 0.02, 0.02, 0.008), [0, ch / 2, 0]], [rbox(cw, 0.02, 0.02, 0.008), [0, -ch / 2, 0]], [rbox(0.02, ch, 0.02, 0.008), [-cw / 2, 0, 0]], [rbox(0.02, ch, 0.02, 0.008), [cw / 2, 0, 0]]);
    function y(k) { return 0.5 - k * 0.4; }
    for (i = 0; i < 3; i++) {
      parts.push(P(rbox(cw, 0.06, 0.03, 0.02), 's', [X[i], 0.82, 0.01]));
      for (j = 0; j < cnt[i]; j++) parts.push(P(card, 'k', [X[i], y(j), 0.03]), P(rbox(0.36 + 0.1 * ((i + j) % 3), 0.04, 0.02, 0.01), 'g', [X[i] - 0.14, y(j), 0.07]));
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
    return { scale: 0.68, tilt: [-0.55, -0.3, 0], sway: [0.14, 0.4], still: 2.2, parts: parts };
  };

  // 05 · Интеграции: разные системы обмениваются данными сами
  SC.hub = function () {
    var nodes = [[-1.45, 0.72, 0.3], [1.4, 0.82, -0.4], [-1.2, -0.88, -0.3], [1.3, -0.72, 0.5], [0.05, 1.22, -0.55]];
    var shapes = [rbox(0.4, 0.4, 0.4, 0.09), cyl(0.24, 0.36, 32), rbox(0.56, 0.38, 0.1, 0.05), torus(0.22, 0.075, 32, 10), sphere(0.25, 24, 16)];
    var parts = [P(rbox(0.74, 0.74, 0.74, 0.13, 3), 's')];
    nodes.forEach(function (n, i) {
      parts.push(P(shapes[i], 'k', n, [0.2 * i, 0.5 * i, 0]), P(rod([0, 0, 0], n, 0.02, 8), 'k'));
      parts.push(ball('o', 0.075, 0, function (t, o) { var k = 0.46 + 0.25 * (0.5 - 0.5 * Math.cos(t * 1.15 + i * 1.7)); o.p = [n[0] * k, n[1] * k, n[2] * k]; }));
    });
    return { scale: 0.6, tilt: [0.18, 0.4, 0], sway: [0.5, 0.3], still: 1.2, parts: parts };
  };

  // 06 · Защита: щит вращается вокруг ядра, атаки до него не доходят
  SC.shield = function () {
    var arc = torus(1, 0.055, 48, 10, 2.1), thin = torus(1.4, 0.02, 40, 6, 1.3), i;
    var parts = [P(rbox(0.62, 0.62, 0.62, 0.12, 3), 'c', 0, 0, 0, function (t, o) { o.r[1] = t * 0.3; o.r[0] = 0.3; })];
    [0, PI].forEach(function (a) { parts.push(P(arc, 'o', 0, 0, 0, function (t, o) { o.r[2] = a + t * 0.5; })); });
    [0.4, 0.4 + 2 * PI / 3, 0.4 + 4 * PI / 3].forEach(function (a) { parts.push(P(thin, 's', 0, 0, 0, function (t, o) { o.r[2] = a - t * 0.22; })); });
    for (i = 0; i < 9; i++) (function (i) {
      var b = i * 2 * PI / 9 + 0.3;
      parts.push(P(UNIT, 's', 0, 0, 0, function (t, o) {
        var T = (t * 0.45 + i * 0.37) % 1, r = mix(2.6, 1.16, seg(T, 0, 0.6)) + 0.3 * seg(T, 0.6, 1), s = 0.05 * Math.max(0.001, seg(T, 0, 0.1) * (1 - seg(T, 0.7, 1)));
        o.p = [r * Math.cos(b), r * Math.sin(b), 0]; o.s = [s, s, s];
      }));
    })(i);
    return { scale: 0.62, tilt: [0.2, -0.45, 0], sway: [0.25, 0.4], still: 1, parts: parts };
  };

  // 07 · Резервные копии: копия проявляется во втором хранилище диск за диском
  SC.backup = function () {
    var disc = cyl(0.6, 0.26, 48), ring = torus(0.6, 0.012, 56, 6), parts = [], Y = [-0.46, -0.1, 0.26], C = 7.5;
    Y.forEach(function (y, j) {
      parts.push(P(disc, 's', [-0.95, y, 0]));
      parts.push(P(ring, 'k', [0.95, y - 0.13, 0], [PI / 2, 0, 0]), P(ring, 'k', [0.95, y + 0.13, 0], [PI / 2, 0, 0]));
      parts.push(P(disc, 'k', [0.95, y, 0], 0, 0, function (t, o) { var T = t % C, k = Math.max(0.001, seg(T, 1.5 + j * 2, 1.9 + j * 2) * (1 - seg(T, 6.7, 7.2))); o.s = [k, 1, k]; }));
    });
    parts.push(P(cyl(0.6, 0.07, 48), 'o', 0, 0, 0, function (t, o) {
      var T = t % C, j = Math.min(2, Math.floor(T / 2)), k = seg(T, 0.3 + j * 2, 1.7 + j * 2), s = T > 6 ? 0.001 : Math.max(0.001, seg(T, j * 2, j * 2 + 0.3) * (1 - seg(T, 1.7 + j * 2, 1.95 + j * 2)));
      o.p = [mix(-0.95, 0.95, k), mix(0.5, Y[j] + 0.18, k) + 0.6 * Math.sin(PI * k), 0]; o.s = [s, 1, s];
    }));
    return { scale: 0.68, off: [0, -0.25, 0], tilt: [0.4, -0.3, 0], sway: [0.18, 0.4], still: 4.9, parts: parts };
  };

  // 08 · Сайт и веб-сервис: интерфейс в слоях, курсор жмёт кнопку
  SC.site = function () {
    function lv(n) { return function (t, o) { o.p[2] = 0.05 + n * (0.08 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.8))); }; }
    var cardg = rbox(0.76, 0.44, 0.06, 0.05);
    var parts = [
      P(rbox(2.7, 1.84, 0.08, 0.09, 3), 'g'),
      P(rbox(2.5, 0.03, 0.02, 0.01), 'k', [0, 0.62, 0.05]),
      ball('o', 0.04, [-1.14, 0.76, 0.07]), ball('c', 0.04, [-1.0, 0.76, 0.07]), ball('c', 0.04, [-0.86, 0.76, 0.07]),
      P(rbox(1.4, 0.6, 0.06, 0.05), 'k', [-0.4, 0.14, 0], 0, 0, lv(1)),
      P(rbox(0.86, 0.6, 0.06, 0.05), 'k', [0.82, 0.14, 0], 0, 0, lv(1)),
      P(cardg, 'k', [-0.72, -0.52, 0], 0, 0, lv(1)), P(cardg, 'k', [0.1, -0.52, 0], 0, 0, lv(1)), P(cardg, 'k', [0.92, -0.52, 0], 0, 0, lv(1)),
      P(rbox(0.9, 0.09, 0.04, 0.02), 'c', [-0.42, 0.27, 0], 0, 0, lv(2)),
      P(rbox(0.64, 0.22, 0.07, 0.07), 'o', [-0.55, -0.01, 0], 0, 0, lv(2.6)),
      P(ext([[0, 0], [0, -0.5], [0.12, -0.39], [0.2, -0.57], [0.28, -0.53], [0.2, -0.36], [0.35, -0.36]], 0.04), 'c', 0, 0, 0, function (t, o) { var k = 0.5 - 0.5 * Math.cos(t * 1.1); o.p = [mix(0.9, -0.5, k), mix(-0.6, -0.02, k), 0.5]; })
    ];
    return { scale: 0.66, tilt: [-0.36, -0.58, 0], sway: [0.18, 0.4], still: 2.85, parts: parts };
  };

  // 09 · Отчёты: цифры растут на фоне сетки
  SC.bars = function () {
    var bar = rbox(0.32, 1, 0.32, 0.05), Hh = [0.45, 0.75, 0.6, 1.05, 1.5], parts = [P(rbox(2.7, 0.1, 1.2, 0.05), 'g', [0, -0.8, 0])], i;
    [-0.3, 0.2, 0.7].forEach(function (y) { parts.push(P(rbox(2.5, 0.014, 0.014, 0.006), 'k', [0, y, -0.56])); });
    for (i = 0; i < 5; i++) (function (i) {
      parts.push(P(bar, i === 4 ? 'o' : (i % 2 ? 's' : 'k'), [-0.96 + i * 0.48, 0, 0], 0, 0, function (t, o) {
        var T = t % 8, h = mix(0.06, Hh[i], seg(T, 0.3 + i * 0.25, 1.3 + i * 0.25) * (1 - seg(T, 7, 7.8)));
        o.s = [1, h, 1]; o.p[1] = -0.75 + h / 2;
      }));
    })(i);
    return { scale: 0.7, off: [0, 0.12, 0], tilt: [0.36, -0.62, 0], sway: [0.22, 0.4], still: 4, parts: parts };
  };

  // 10 · Оплата: карта и волны бесконтактной оплаты
  SC.pay = function () {
    var card = rbox(2.2, 1.38, 0.07, 0.11, 3), num = rbox(0.34, 0.07, 0.02, 0.02), parts, i;
    function bob(ph) { return function (t, o) { o.p[1] += 0.05 * Math.sin(t * 1.1 + ph); }; }
    parts = [
      P(card, 'k', [-0.3, 0.36, -0.34], [0, 0, 0.1], 0, bob(1.4)),
      P(rbox(2.2, 0.2, 0.02, 0.01), 'd', [-0.34, 0.78, -0.3], [0, 0, 0.1], 0, bob(1.4)),
      P(card, 'c', [-0.2, -0.1, 0], 0, 0, bob(0)),
      P(rbox(0.36, 0.28, 0.03, 0.05), 's', [-0.84, 0.08, 0.045], 0, 0, bob(0)),
      P(rbox(0.36, 0.018, 0.012, 0.005), 'd', [-0.84, 0.08, 0.064], 0, 0, bob(0)),
      P(rbox(0.018, 0.28, 0.012, 0.005), 'd', [-0.84, 0.08, 0.064], 0, 0, bob(0)),
      P(rbox(0.72, 0.06, 0.02, 0.02), 'k', [-0.66, -0.58, 0.04], 0, 0, bob(0))
    ];
    for (i = 0; i < 4; i++) parts.push(P(num, 'g', [-0.85 + i * 0.43, -0.32, 0.04], 0, 0, bob(0)));
    [0.26, 0.46, 0.66].forEach(function (R, i) {
      parts.push(P(torus(R, 0.03, 28, 8, 1.3), 'o', [1.06, -0.1, 0.06], [0, 0, -0.65], 0, function (t, o) { var k = 0.86 + 0.14 * Math.sin(t * 2.4 - i * 0.9); o.s = [k, k, k]; o.p[1] += 0.05 * Math.sin(t * 1.1); }));
    });
    return { scale: 0.66, off: [-0.2, -0.1, 0], tilt: [0.14, -0.5, -0.1], sway: [0.3, 0.45], still: 1, parts: parts };
  };

  // 11 · ИИ-ассистент: сигнал проходит по сети
  SC.ai = function () {
    var L = [[-1.25, [0.66, 0, -0.66]], [0, [0.99, 0.33, -0.33, -0.99]], [1.25, [0.36, -0.36]]], pos = [], parts = [];
    L.forEach(function (l, a) { pos.push(l[1].map(function (y, b) { return [l[0], y, 0.24 * Math.sin(a * 2.1 + b * 1.7)]; })); });
    [0, 1].forEach(function (a) { pos[a].forEach(function (p) { pos[a + 1].forEach(function (q) { parts.push(P(rod(p, q, 0.011, 6), 'k')); }); }); });
    pos.forEach(function (l, a) { l.forEach(function (p) { parts.push(ball(a === 1 ? 'g' : 's', a === 1 ? 0.13 : 0.16, p)); }); });
    [[0, 1, 0], [1, 2, 1], [2, 0, 0], [0, 3, 1], [2, 2, 0]].forEach(function (q, n) {
      var A = pos[0][q[0]], B = pos[1][q[1]], C = pos[2][q[2]];
      parts.push(P(UNIT, 'o', 0, 0, 0, function (t, o) {
        var T = (t * 0.4 + n * 0.31) % 1, s = 0.07 * Math.max(0.001, seg(T, 0, 0.06) * (1 - seg(T, 0.92, 1)));
        o.p = T < 0.5 ? lerp3(A, B, seg(T, 0.04, 0.46)) : lerp3(B, C, seg(T, 0.5, 0.9)); o.p[2] += 0.02; o.s = [s, s, s];
      }));
    });
    return { scale: 0.68, tilt: [0.1, -0.4, 0], sway: [0.3, 0.4], still: 1, parts: parts };
  };

  // 12 · Онлайн-запись: календарь, один день выбран
  SC.cal = function () {
    var tile = rbox(0.4, 0.34, 0.07, 0.05), parts = [P(rbox(2.7, 2.0, 0.08, 0.09, 3), 'g', [0, 0, -0.05]), P(rbox(2.32, 0.2, 0.05, 0.04), 'k', [0, 0.72, 0.01])], i, j;
    [-0.7, 0.7].forEach(function (x) { parts.push(P(rbox(0.08, 0.3, 0.08, 0.035), 's', [x, 0.98, 0.02])); });
    for (i = 0; i < 5; i++) for (j = 0; j < 3; j++) (function (i, j) {
      var pick = i === 3 && j === 1, p = [-0.96 + i * 0.48, 0.34 - j * 0.42, 0.03];
      parts.push(P(tile, pick ? 'o' : 'k', p, 0, 0, function (t, o) {
        var w = Math.max(0, Math.sin(t * 1.4 - (i + j) * 0.7));
        o.p[2] = pick ? 0.15 + 0.03 * Math.sin(t * 1.4) : 0.03 + 0.07 * w * w;
      }));
    })(i, j);
    return { scale: 0.7, off: [0, -0.08, 0], tilt: [-0.42, -0.34, 0], sway: [0.14, 0.4], still: 1, parts: parts };
  };

  // 13 · Напоминания: колокольчик звонит
  SC.bell = function () {
    var PV = [0, 0.95];
    function env(t) { var T = ((t % 4.2) + 4.2) % 4.2; return 0.34 * Math.exp(-T * 0.9) * Math.sin(T * 7); }
    function sw(q, lag, amp) { return function (t, o) { var a = env(t - (lag || 0)) * (amp || 1), c = Math.cos(a), s = Math.sin(a); o.p = [PV[0] + q[0] * c - q[1] * s, PV[1] + q[0] * s + q[1] * c, 0]; o.r[2] = a; }; }
    var body = lathe([[0.001, 0.86], [0.08, 0.855], [0.16, 0.83], [0.24, 0.77], [0.32, 0.68], [0.4, 0.55], [0.46, 0.38], [0.5, 0.18], [0.53, -0.05], [0.6, -0.3], [0.84, -0.56], [0.9, -0.64], [0.93, -0.68], [0.9, -0.72], [0.8, -0.72]], 56);
    var parts = [
      P(body, 's', 0, 0, 0, sw([0, -0.95])),
      ball('s', 0.1, 0, sw([0, -0.03])),
      ball('k', 0.18, 0, sw([0, -1.72], 0.12, 1.5)),
      ball('o', 0.2, [0.68, 0.7, 0.24], function (t, o) { var k = 0.2 * (0.88 + 0.12 * Math.sin(t * 3)); o.s = [k, k, k]; })
    ];
    return { scale: 0.7, off: [-0.1, -0.1, 0], tilt: [0.05, -0.35, 0], sway: [0.25, 0.4], still: 0.25, parts: parts };
  };

  // 14 · Автоматизация: шестерни в зацеплении
  SC.gears = function () {
    function gear(n, r0, r1, h) {
      var pts = [], i, w = 2 * PI / n;
      for (i = 0; i < n; i++) [[r0, -0.5], [r0, -0.24], [r1, -0.13], [r1, 0.13], [r0, 0.24]].forEach(function (q) { var a = (i + q[1]) * w; pts.push([q[0] * Math.cos(a), q[0] * Math.sin(a)]); });
      return ext(pts, h);
    }
    var W = 0.5, cA = [-0.45, -0.32], RA = 0.8, parts = [];
    function add(n, R, m, c, f) {
      parts.push(P(gear(n, R - 0.1, R + 0.07, 0.24), m, [c[0], c[1], 0], 0, 0, f));
      parts.push(P(cyl(R * 0.36, 0.3, 28), 'd', [c[0], c[1], 0], [PI / 2, 0, 0]), ball('s', R * 0.12, [c[0], c[1], 0.15]));
    }
    add(12, RA, 'k', cA, function (t, o) { o.r[2] = t * W; });
    [[8, 'o', 0.25], [6, 's', 1.95]].forEach(function (g) {
      var n = g[0], R = RA * n / 12, th = g[2], c = [cA[0] + (RA + R) * Math.cos(th), cA[1] + (RA + R) * Math.sin(th)];
      add(n, R, g[1], c, function (t, o) { o.r[2] = -(12 / n) * (t * W - th) + th + PI + PI / n; });
    });
    return { scale: 0.68, off: [-0.1, 0.02, 0], tilt: [0.06, -0.14, 0], sway: [0.1, 0.4], still: 1, parts: parts };
  };

  // 15 · Документы: лист заполнен, печать встаёт на место
  SC.doc = function () {
    var sheet = rbox(1.5, 2.0, 0.03, 0.03), i, w;
    var parts = [P(sheet, 'k', [0.22, 0.04, -0.16], [0, 0, -0.22]), P(sheet, 's', [0.11, 0.02, -0.08], [0, 0, -0.11]), P(sheet, 'c'), P(rbox(0.7, 0.1, 0.02, 0.02), 'g', [-0.25, 0.72, 0.02])];
    for (i = 0; i < 5; i++) { w = [1.2, 1.0, 1.2, 0.8, 0.5][i]; parts.push(P(rbox(w, 0.05, 0.02, 0.015), 'k', [-0.6 + w / 2, 0.44 - i * 0.2, 0.02])); }
    parts.push(P(cyl(0.25, 0.04, 40), 'o', [0.36, -0.66, 0.04], [PI / 2, 0, 0], 0, function (t, o) {
      var T = t % 5, s = Math.max(0.001, seg(T, 0.5, 0.8) * (1 - seg(T, 4.4, 4.8)));
      o.p[2] = mix(0.9, 0.04, seg(T, 0.8, 1.15)); o.s = [s, 1, s];
    }));
    return { scale: 0.74, tilt: [-0.25, -0.45, 0.05], sway: [0.2, 0.4], still: 2, parts: parts };
  };

  // 16 · Адаптив: один интерфейс на экране и в телефоне
  SC.devices = function () {
    function bob(ph) { return function (t, o) { o.p[1] += 0.04 * Math.sin(t * 1.1 + ph); }; }
    var a = bob(0), b = bob(1.3);
    var parts = [
      P(rbox(2.3, 1.5, 0.08, 0.08, 3), 'g', [-0.35, 0.12, -0.3], 0, 0, a),
      P(rbox(0.14, 0.4, 0.08, 0.03), 'k', [-0.35, -0.8, -0.34], 0, 0, a), P(rbox(0.8, 0.06, 0.4, 0.03), 'k', [-0.35, -1.0, -0.3], 0, 0, a),
      P(rbox(1.0, 0.5, 0.04, 0.04), 'k', [-0.86, 0.36, -0.25], 0, 0, a), P(rbox(0.86, 0.5, 0.04, 0.04), 'k', [0.16, 0.36, -0.25], 0, 0, a),
      P(rbox(0.9, 0.09, 0.03, 0.02), 'c', [-0.91, -0.08, -0.25], 0, 0, a), P(rbox(0.5, 0.18, 0.05, 0.05), 'o', [-1.11, -0.34, -0.24], 0, 0, a),
      P(rbox(0.82, 1.56, 0.09, 0.1, 3), 'k', [0.98, -0.22, 0.35], 0, 0, b), P(rbox(0.7, 1.42, 0.02, 0.06), 'd', [0.98, -0.22, 0.4], 0, 0, b),
      P(rbox(0.56, 0.4, 0.03, 0.04), 'k', [0.98, 0.22, 0.42], 0, 0, b), P(rbox(0.5, 0.07, 0.03, 0.02), 'c', [0.95, -0.1, 0.42], 0, 0, b),
      P(rbox(0.56, 0.26, 0.03, 0.04), 'k', [0.98, -0.36, 0.42], 0, 0, b), P(rbox(0.56, 0.18, 0.05, 0.05), 'o', [0.98, -0.72, 0.43], 0, 0, b)
    ];
    return { scale: 0.72, off: [0, 0.1, 0], tilt: [0.1, -0.45, 0], sway: [0.25, 0.4], still: 1, parts: parts };
  };

  // 17 · Мониторинг: стрелка следит за нагрузкой
  SC.gauge = function () {
    var parts = [P(torus(1.1, 0.07, 56, 10, PI - 0.6), 'k', 0, [0, 0, 0.6]), P(torus(1.1, 0.075, 16, 10, 0.6), 'o')], i, a;
    for (i = 0; i <= 8; i++) { a = PI * i / 8; parts.push(P(rbox(0.12, 0.03, 0.03, 0.012), 's', [0.86 * Math.cos(a), 0.86 * Math.sin(a), 0], [0, 0, a])); }
    parts.push(P(rbox(0.07, 0.8, 0.05, 0.025), 'c', 0, 0, 0, function (t, o) {
      var k = 0.55 + 0.22 * Math.sin(t * 0.8) + 0.03 * Math.sin(t * 6.3), g = PI * (1 - k);
      o.p = [0.4 * Math.cos(g), 0.4 * Math.sin(g), 0.07]; o.r[2] = g - PI / 2;
    }));
    parts.push(P(cyl(0.2, 0.06, 32), 'k', 0, [PI / 2, 0, 0]), ball('s', 0.09, [0, 0, 0.08]));
    return { scale: 0.86, off: [0, -0.5, 0], tilt: [0.1, -0.3, 0], sway: [0.25, 0.4], still: 1, parts: parts };
  };

  // 18 · Хостинг и поддержка: серверы работают
  SC.server = function () {
    var parts = [], i;
    for (i = 0; i < 3; i++) (function (i) {
      var y = (i - 1) * 0.52;
      parts.push(P(rbox(2.1, 0.44, 1.1, 0.07, 3), i === 1 ? 'k' : 'g', [0, y, 0]));
      parts.push(P(rbox(0.8, 0.022, 0.02, 0.01), 's', [0.45, y + 0.07, 0.555]), P(rbox(0.8, 0.022, 0.02, 0.01), 's', [0.45, y - 0.07, 0.555]));
      parts.push(ball('c', 0.045, [-0.82, y, 0.56]));
      parts.push(P(UNIT, 'o', [-0.64, y, 0.56], 0, 0, function (t, o) { var k = 0.05 * (0.92 + 0.08 * Math.sin(t * 3.1 + i * 2.1)); o.s = [k, k, k]; }));
    })(i);
    return { scale: 0.78, tilt: [0.32, -0.6, 0], sway: [0.2, 0.4], still: 1, parts: parts };
  };

  // 19 · Соответствие закону: пункты закрываются один за другим
  SC.check = function () {
    var e = sphere(0.03, 8, 6), tick = join([rod([-0.11, 0, 0], [-0.03, -0.09, 0], 0.03, 8)], [rod([-0.03, -0.09, 0], [0.13, 0.11, 0], 0.03, 8)], [e, [-0.11, 0, 0]], [e, [-0.03, -0.09, 0]], [e, [0.13, 0.11, 0]]);
    var parts = [P(rbox(2.4, 1.9, 0.08, 0.09, 3), 'g', [0, 0, -0.05])], W = [1.15, 0.85, 1.0], i;
    for (i = 0; i < 3; i++) (function (i) {
      var y = 0.52 - i * 0.52;
      parts.push(P(rbox(0.34, 0.34, 0.06, 0.07), 'k', [-0.8, y, 0.02]), P(rbox(W[i], 0.1, 0.04, 0.03), 's', [-0.42 + W[i] / 2, y, 0.02]));
      parts.push(P(tick, 'o', [-0.8, y, 0.09], 0, 0, function (t, o) { var T = t % 6.5, k = Math.max(0.001, seg(T, 0.8 + i * 0.9, 1.1 + i * 0.9) * (1 - seg(T, 5.7, 6.1))); o.s = [k, k, k]; o.p[2] = 0.09 + 0.14 * (1 - k); }));
    })(i);
    return { scale: 0.74, tilt: [-0.34, -0.36, 0], sway: [0.16, 0.4], still: 3.4, parts: parts };
  };

  // 20 · 3D и анимация: куб собирается из частей
  SC.cube = function () {
    var c = rbox(0.56, 0.56, 0.56, 0.08, 3), parts = [], M = ['k', 's', 'g'], x, y, z;
    for (x = -1; x <= 1; x += 2) for (y = -1; y <= 1; y += 2) for (z = -1; z <= 1; z += 2) (function (x, y, z) {
      var n = (x > 0 ? 1 : 0) + (y > 0 ? 2 : 0) + (z > 0 ? 4 : 0);
      parts.push(P(c, n === 7 ? 'o' : M[n % 3], 0, 0, 0, function (t, o) { var g = 0.3 + 0.24 * (0.5 - 0.5 * Math.cos(t * 0.9 - n * 0.15)); o.p = [x * g, y * g, z * g]; }));
    })(x, y, z);
    return { scale: 0.72, tilt: [0.5, 0.7, 0], sway: [0.5, 0.25], still: 1.5, parts: parts };
  };

  /* ---------- шейдеры ---------- */
  var VS = 'attribute vec3 aP;attribute vec3 aN;uniform mat3 uR;uniform vec3 uT;uniform vec3 uSc;uniform float uAsp;uniform float uScale;varying vec3 vN;varying vec3 vP;' +
    'void main(){vec3 p=(aP*uSc)*uR+uT;vN=(aN/uSc)*uR;vP=p;float d=6.-p.z;vec2 xy=p.xy/d*6.*uScale;gl_Position=vec4(xy.x/uAsp,xy.y,d/6.-1.,1.);}';
  var FS = 'precision mediump float;varying vec3 vN;varying vec3 vP;uniform vec3 uCol;uniform vec4 uMt;' +
    'void main(){vec3 n=normalize(vN);vec3 v=normalize(vec3(0.,0.,6.)-vP);if(dot(n,v)<0.)n=-n;' +
    'vec3 l=normalize(vec3(.45,.8,.6));float df=max(dot(n,l),0.);vec3 r=reflect(-v,n);' +
    'float sp=pow(max(dot(r,l),0.),26.);float fr=pow(1.-max(dot(n,v),0.),3.);float env=.5+.5*r.y;' +
    'float fl=max(dot(n,normalize(vec3(-.7,-.15,.5))),0.);vec3 c=uCol*(uMt.x+uMt.y*df+.25*env+.16*fl)+vec3(1.,.95,.9)*sp*uMt.z+vec3(.85,.87,.95)*fr*uMt.w;gl_FragColor=vec4(c,1.);}';

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
