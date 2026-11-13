/* Финес Студио · первый экран «гироскоп» · чистый WebGL, без библиотек */
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
    if (W <= 1000) {
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
    window.addEventListener('scroll', function () { scT = Math.min(1.4, window.scrollY / Math.max(300, H)); }, { passive: true });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      cxT = (e.clientX / window.innerWidth - 0.5) * 0.9; cyT = (e.clientY / window.innerHeight - 0.5) * 0.6;
    }, { passive: true });
    document.addEventListener('visibilitychange', kick);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; kick(); }).observe(hero);
  }
  cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); cv.classList.remove('on'); });
})();
