/* Финес Студио · первый экран «хаос в порядок» · чистый WebGL, без библиотек */
(function () {
  'use strict';
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var cv = document.createElement('canvas');
  cv.className = 'h3d';
  cv.setAttribute('aria-hidden', 'true');
  var gl = null;
  try { gl = cv.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: 'low-power' }); } catch (e) {}
  if (!gl) return;
  hero.insertBefore(cv, hero.firstChild);
  hero.classList.add('has3d');

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = window.innerWidth <= 700;
  var cols = small ? 44 : 64, rows = small ? 26 : 38, N = cols * rows;
  var GX = 1.6, GY = GX * (rows - 1) / (cols - 1);

  var VS = [
    'attribute vec3 aC;attribute vec3 aG;attribute vec3 aS;',
    'uniform float uT,uP,uS,uAsp,uScale,uPx,uMA;uniform vec2 uOff,uTilt,uM;',
    'varying float vA;varying float vK;',
    'mat2 r(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
    'void main(){',
    ' float p=clamp((uP-aS.x*.45)/.55,0.,1.);p=p*p*(3.-2.*p);',
    ' vec3 c=aC;',
    ' c+=.07*vec3(sin(uT*.6+aS.x*40.),cos(uT*.5+aS.y*71.),sin(uT*.4+aS.x*23.));',
    ' c.xz=r(uT*.16)*c.xz;c.yz=r(.35)*c.yz;',
    ' vec3 g=aG;g.z+=.05*sin(uT*.8+g.x*1.7+g.y*1.2);',
    ' g.yz=r(-.46-uS*.75+uTilt.y)*g.yz;',
    ' g.xz=r(.30+uS*.3+uTilt.x)*g.xz;',
    ' vec3 q=mix(c,g,p);',
    ' q+=sin(p*3.14159)*.35*vec3(aS.y-.5,aS.x-.5,aS.y-.5);',
    ' float z=q.z+4.2;float k=4.2/z;',
    ' vec2 s=vec2(q.x*k*uScale/uAsp+uOff.x,q.y*k*uScale+uOff.y);',
    ' vec2 d=(s-uM)*vec2(uAsp,1.);float f=exp(-dot(d,d)/.018)*uMA;',
    ' s+=normalize(d+vec2(.0001))*f*.055/vec2(uAsp,1.);',
    ' gl_Position=vec4(s,0.,1.);',
    ' float base=mix(.75+aS.y*1.1,1.,p);',
    ' gl_PointSize=uPx*base*k*(1.+aS.z*.5);',
    ' float depth=smoothstep(5.7,2.9,z);',
    ' vA=mix(.16+.84*depth*depth,.66+.34*depth,p);',
    ' vK=aS.z;',
    '}'
  ].join('\n');
  var FS = [
    'precision mediump float;varying float vA;varying float vK;',
    'void main(){',
    ' float d=length(gl_PointCoord-.5);',
    ' float a=smoothstep(.5,.34,d);',
    ' vec3 col=mix(vec3(.957,.945,.918),vec3(.949,.314,.110),vK);',
    ' gl_FragColor=vec4(col,a*mix(vA*.82,min(1.,vA+.35),vK));',
    '}'
  ].join('\n');

  function sh(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  var pr;
  try {
    pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  } catch (e) { cv.remove(); hero.classList.remove('has3d'); return; }
  gl.useProgram(pr);

  // детерминированный генератор: картинка одинаковая при каждой загрузке
  var seed = 20261113;
  function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }

  var data = new Float32Array(N * 9);
  var accRow = Math.round(rows * 0.63);
  var order = [], i, j, t;
  for (i = 0; i < N; i++) order.push(i);
  for (i = N - 1; i > 0; i--) { j = Math.floor(rnd() * (i + 1)); t = order[i]; order[i] = order[j]; order[j] = t; }
  for (i = 0; i < N; i++) {
    var k = order[i], cx = k % cols, cy = Math.floor(k / cols), o = i * 9;
    // хаос: точки в объёме шара, к центру плотнее
    var u = rnd() * 2 - 1, ph = rnd() * 6.2831853, rr = 1.42 * Math.pow(rnd(), 0.52), sq = Math.sqrt(1 - u * u);
    data[o] = rr * sq * Math.cos(ph); data[o + 1] = rr * u; data[o + 2] = rr * sq * Math.sin(ph);
    data[o + 3] = (cx / (cols - 1) - 0.5) * 2 * GX;
    data[o + 4] = (cy / (rows - 1) - 0.5) * 2 * GY;
    data[o + 5] = 0;
    data[o + 6] = rnd(); data[o + 7] = rnd();
    data[o + 8] = cy === accRow ? 1 : 0;
  }
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  [['aC', 0], ['aG', 12], ['aS', 24]].forEach(function (a) {
    var loc = gl.getAttribLocation(pr, a[0]);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 36, a[1]);
  });
  var U = {};
  ['uT', 'uP', 'uS', 'uAsp', 'uScale', 'uPx', 'uMA', 'uOff', 'uTilt', 'uM'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  var W = 0, H = 0, dpr = 1, off = [0, 0], scale = 0.4, Rpx = 200, box = null;
  function layout() {
    box = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(box.width)); H = Math.max(1, Math.round(box.height));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    var px, py;
    if (W <= 1000) {
      var title = hero.querySelector('.hero__title'), meta = hero.querySelector('.hero__meta');
      var top = meta ? meta.getBoundingClientRect().bottom - box.top : 60;
      var bot = title ? title.getBoundingClientRect().top - box.top : top + 240;
      px = W * 0.5; py = (top + bot) / 2; Rpx = Math.min(W * 0.4, Math.max(60, (bot - top) * 0.52));
    } else {
      px = W * 0.762; py = H * 0.43; Rpx = Math.min(H * 0.3, W * 0.158);
    }
    off = [px / W * 2 - 1, 1 - py / H * 2];
    scale = (Rpx / GX) / (H / 2);
  }

  var START = 0.9, DUR = 3.0;
  var S = 0, St = 0, tx = 0, ty = 0, cxT = 0, cyT = 0, mx = 9, my = 9, ma = 0, maT = 0;
  var t0 = performance.now(), raf = 0, vis = true;
  function draw(now) {
    var t = reduce ? 0 : (now - t0) / 1000;
    var a = reduce ? 1 : Math.max(0, Math.min(1, (t - START) / DUR));
    var P = a * a * (3 - 2 * a);
    S += (St - S) * 0.08; tx += (cxT - tx) * 0.05; ty += (cyT - ty) * 0.05; ma += (maT - ma) * 0.08;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.uT, t); gl.uniform1f(U.uP, P); gl.uniform1f(U.uS, S); gl.uniform1f(U.uAsp, W / H);
    gl.uniform1f(U.uScale, scale);
    gl.uniform1f(U.uPx, dpr * Math.max(2.1, Math.min(3.2, Rpx * 2 / cols * 0.4)));
    gl.uniform1f(U.uMA, ma);
    gl.uniform2f(U.uOff, off[0], off[1]); gl.uniform2f(U.uTilt, tx, ty); gl.uniform2f(U.uM, mx, my);
    gl.drawArrays(gl.POINTS, 0, N);
  }
  function loop(now) { raf = 0; if (!vis || document.hidden) return; draw(now); raf = requestAnimationFrame(loop); }
  function kick() { if (reduce) { draw(0); return; } if (!raf) raf = requestAnimationFrame(loop); }

  layout(); kick();
  requestAnimationFrame(function () { cv.classList.add('on'); });
  var rs = 0;
  window.addEventListener('resize', function () { clearTimeout(rs); rs = setTimeout(function () { layout(); kick(); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layout(); kick(); });
  if (!reduce) {
    window.addEventListener('scroll', function () { St = Math.max(0, Math.min(1, window.scrollY / Math.max(300, H * 0.8))); }, { passive: true });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      cxT = (e.clientX / window.innerWidth - 0.5) * 0.3; cyT = (e.clientY / window.innerHeight - 0.5) * 0.18;
      var b = hero.getBoundingClientRect();
      mx = (e.clientX - b.left) / b.width * 2 - 1; my = 1 - (e.clientY - b.top) / b.height * 2; maT = 1;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { maT = 0; });
    document.addEventListener('visibilitychange', kick);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; kick(); }).observe(hero);
  }
  cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); cv.classList.remove('on'); });
})();
