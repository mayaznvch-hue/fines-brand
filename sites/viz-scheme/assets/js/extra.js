/* Финес Студио · макет: пауза визуализации вне экрана + два примера 3D в блоке услуг */
(function () {
  'use strict';
  var v = document.querySelector('.viz');
  if (v && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { v.classList.toggle('is-off', !en[0].isIntersecting); }).observe(v);
})();
/* Финес Студио · первый экран «хаос в порядок» · чистый WebGL, без библиотек */
(function () {
  'use strict';
  var hero = document.querySelector('[data-3d="chaos"]');
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
  var cols = small ? 40 : 54, rows = small ? 24 : 32, N = cols * rows;
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
    ' g.yz=r(-.5-uS*.6+uTilt.y)*g.yz;',
    ' g.xz=r(uS*.25+uTilt.x)*g.xz;',
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
    ' vA=mix(.16+.84*depth*depth,1.,p);',
    ' vK=aS.z;',
    '}'
  ].join('\n');
  var FS = [
    'precision mediump float;varying float vA;varying float vK;',
    'void main(){',
    ' float d=length(gl_PointCoord-.5);',
    ' float a=smoothstep(.5,.34,d);',
    ' vec3 col=mix(vec3(.957,.945,.918),vec3(.949,.314,.110),vK);',
    ' gl_FragColor=vec4(col,a*mix(vA*.9,min(1.,vA+.35),vK));',
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
    if (true) { px = W * 0.5; py = H * 0.5; Rpx = Math.min(W * 0.36, H * 0.44); } else if (W <= 1000) {
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
    gl.uniform1f(U.uPx, dpr * Math.max(2.3, Math.min(3.8, Rpx * 2 / cols * 0.42)));
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
    window.addEventListener('scroll', function () { return; St = Math.max(0, Math.min(1, window.scrollY / Math.max(300, H * 0.8))); }, { passive: true });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      cxT = (e.clientX / window.innerWidth - 0.5) * 0.3; cyT = (e.clientY / window.innerHeight - 0.5) * 0.18;
      var b = hero.getBoundingClientRect();
      mx = (e.clientX - b.left) / b.width * 2 - 1; my = 1 - (e.clientY - b.top) / b.height * 2; maT = 1;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { maT = 0; });
    document.addEventListener('visibilitychange', kick);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis) t0 = performance.now(); kick(); }, { threshold: 0.35 }).observe(hero);
  }
  cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); cv.classList.remove('on'); });
})();

/* Финес Студио · первый экран «гироскоп» · чистый WebGL, без библиотек */
(function () {
  'use strict';
  var hero = document.querySelector('[data-3d="gyro"]');
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

  var VS = [
    'attribute vec3 aP;attribute vec3 aN;',
    'uniform mat4 uM;uniform float uAsp,uScale;uniform vec2 uOff;',
    'varying vec3 vN;varying vec3 vV;',
    'void main(){',
    ' vec4 p=uM*vec4(aP,1.);',
    ' vN=mat3(uM)*aN;',
    ' float z=p.z+5.;',
    ' vV=normalize(vec3(-p.xy,5.-p.z+0.0001));',
    ' vec2 xy=p.xy/z*5.*uScale;',
    ' gl_Position=vec4(xy.x/uAsp+uOff.x,xy.y+uOff.y,z*.1-.5,1.);',
    '}'
  ].join('\n');
  // металл: процедурная «студия» из двух мягких ламп и тёплого контрового света
  var FS = [
    'precision mediump float;varying vec3 vN;varying vec3 vV;',
    'uniform vec3 uCol;uniform float uEm;',
    'float box(vec3 r,vec3 d,float w){return smoothstep(1.-w,1.-w*.25,dot(r,normalize(d)));}',
    'void main(){',
    ' vec3 n=normalize(vN);vec3 v=normalize(vV);',
    ' if(uEm>.5){vec3 l=normalize(vec3(.35,.85,.6));float df=max(dot(n,l),0.);float sp=pow(max(dot(reflect(-l,n),v),0.),28.);float rim=pow(1.-max(dot(n,v),0.),2.5);gl_FragColor=vec4(uCol*(.42+.82*df)+vec3(1.,.86,.76)*sp*.85+uCol*rim*.3,1.);return;}',
    ' vec3 r=reflect(-v,n);',
    ' float e=.27+.26*smoothstep(-.6,1.,r.y);',
    ' e+=1.25*box(r,vec3(.35,.85,.35),.22);',
    ' e+=.70*box(r,vec3(-.8,.25,.5),.2);',
    ' e+=.45*box(r,vec3(.85,.1,.45),.16);',
    ' e+=.30*box(r,vec3(.1,-.9,.3),.10);',
    ' float fr=pow(1.-max(dot(n,v),0.),3.);',
    ' vec3 c=uCol*e+vec3(.95,.42,.2)*.16*box(r,vec3(.9,-.2,-.4),.2)+vec3(.9)*fr*.22;',
    ' gl_FragColor=vec4(c,1.);',
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
  var aP = gl.getAttribLocation(pr, 'aP'), aN = gl.getAttribLocation(pr, 'aN');
  var U = {};
  ['uM', 'uAsp', 'uScale', 'uOff', 'uCol', 'uEm'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });

  function mesh(pos, nor, idx) {
    var m = { n: idx.length };
    m.p = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    m.nr = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, m.nr); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nor), gl.STATIC_DRAW);
    m.i = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    return m;
  }
  // кольцо в плоскости XY: R радиус, a/b полуоси сечения (плоская лента смотрится тоньше и даёт длинный блик)
  function ring(R, a, b, seg, tube) {
    var pos = [], nor = [], idx = [], i, j;
    for (i = 0; i <= seg; i++) {
      var u = i / seg * Math.PI * 2, cu = Math.cos(u), su = Math.sin(u);
      for (j = 0; j <= tube; j++) {
        var v = j / tube * Math.PI * 2, cvv = Math.cos(v), sv = Math.sin(v);
        pos.push((R + a * cvv) * cu, (R + a * cvv) * su, b * sv);
        var nx = b * cvv, nz = a * sv, l = Math.sqrt(nx * nx + nz * nz) || 1;
        nor.push(nx / l * cu, nx / l * su, nz / l);
      }
    }
    for (i = 0; i < seg; i++) for (j = 0; j < tube; j++) {
      var p0 = i * (tube + 1) + j, p1 = p0 + tube + 1;
      idx.push(p0, p1, p0 + 1, p1, p1 + 1, p0 + 1);
    }
    return mesh(pos, nor, idx);
  }
  function sphere(R, seg) {
    var pos = [], nor = [], idx = [], i, j;
    for (i = 0; i <= seg; i++) {
      var th = i / seg * Math.PI;
      for (j = 0; j <= seg; j++) {
        var ph = j / seg * Math.PI * 2, x = Math.sin(th) * Math.cos(ph), y = Math.cos(th), z = Math.sin(th) * Math.sin(ph);
        pos.push(x * R, y * R, z * R); nor.push(x, y, z);
      }
    }
    for (i = 0; i < seg; i++) for (j = 0; j < seg; j++) {
      var p0 = i * (seg + 1) + j, p1 = p0 + seg + 1;
      idx.push(p0, p1, p0 + 1, p1, p1 + 1, p0 + 1);
    }
    return mesh(pos, nor, idx);
  }
  var rings = [ring(1.0, 0.015, 0.050, 240, 12), ring(0.8, 0.014, 0.045, 220, 12), ring(0.6, 0.013, 0.040, 200, 12)];
  var dot = sphere(0.17, 40);

  function mul(a, b) {
    var o = new Float32Array(16), i, j, k;
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) { var s = 0; for (k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k]; o[i * 4 + j] = s; }
    return o;
  }
  function rx(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]); }
  function ry(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]); }
  function rz(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); }

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  var W = 0, H = 0, off = [0, 0], scale = 0.4;
  function layout() {
    var r = hero.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    var px, py, R;
    if (true) { px = W * 0.5; py = H * 0.5; R = Math.min(W * 0.3, H * 0.37); } else if (W <= 1000) {
      var title = hero.querySelector('.hero__title'), meta = hero.querySelector('.hero__meta');
      var top = meta ? meta.getBoundingClientRect().bottom - r.top : 60;
      var bot = title ? title.getBoundingClientRect().top - r.top : top + 240;
      px = W * 0.5; py = (top + bot) / 2; R = Math.min(W * 0.36, Math.max(60, (bot - top) * 0.38));
    } else {
      px = W * 0.775; py = H * 0.455; R = Math.min(H * 0.3, W * 0.155);
    }
    off = [px / W * 2 - 1, 1 - py / H * 2];
    scale = R / (H / 2);
  }
  function bind(m) {
    gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.nr); gl.enableVertexAttribArray(aN); gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i);
  }
  var tx = 0, ty = 0, cxT = 0, cyT = 0, sc = 0, scT = 0, t0 = performance.now(), raf = 0, vis = true;
  function draw(now) {
    var t = reduce ? 0 : (now - t0) / 1000;
    tx += (cxT - tx) * 0.05; ty += (cyT - ty) * 0.05; sc += (scT - sc) * 0.08;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(U.uAsp, W / H); gl.uniform1f(U.uScale, scale); gl.uniform2f(U.uOff, off[0], off[1]);
    var base = mul(rx(-0.38 + ty + sc * 0.9), mul(ry(0.42 + tx + sc * 1.4), rz(0.16)));
    // внешние кольца покачиваются и никогда не встают ребром, внутреннее вращается полностью
    var m0 = mul(base, ry(0.5 * Math.sin(t * 0.23)));
    var m1 = mul(m0, rx(1.12 + 0.42 * Math.sin(t * 0.31 + 1.0)));
    var m2 = mul(m1, ry(0.9 + t * 0.45));
    var ms = [m0, m1, m2];
    gl.uniform1f(U.uEm, 0); gl.uniform3f(U.uCol, 0.93, 0.915, 0.885);
    for (var i = 0; i < 3; i++) { bind(rings[i]); gl.uniformMatrix4fv(U.uM, false, ms[i]); gl.drawElements(gl.TRIANGLES, rings[i].n, gl.UNSIGNED_SHORT, 0); }
    gl.uniform1f(U.uEm, 1); gl.uniform3f(U.uCol, 0.949, 0.314, 0.110);
    bind(dot); gl.uniformMatrix4fv(U.uM, false, base); gl.drawElements(gl.TRIANGLES, dot.n, gl.UNSIGNED_SHORT, 0);
  }
  function loop(now) { raf = 0; if (!vis || document.hidden) return; draw(now); raf = requestAnimationFrame(loop); }
  function kick() { if (reduce) { draw(0); return; } if (!raf) raf = requestAnimationFrame(loop); }

  layout(); kick();
  requestAnimationFrame(function () { cv.classList.add('on'); });
  var rs = 0;
  window.addEventListener('resize', function () { clearTimeout(rs); rs = setTimeout(function () { layout(); kick(); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layout(); kick(); });
  if (!reduce) {
    window.addEventListener('scroll', function () { return; scT = Math.min(1.4, window.scrollY / Math.max(300, H)); }, { passive: true });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      cxT = (e.clientX / window.innerWidth - 0.5) * 0.9; cyT = (e.clientY / window.innerHeight - 0.5) * 0.6;
    }, { passive: true });
    document.addEventListener('visibilitychange', kick);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; kick(); }).observe(hero);
  }
  cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); cv.classList.remove('on'); });
})();

