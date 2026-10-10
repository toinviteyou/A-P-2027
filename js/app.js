/* =====================================================================
   منطق کارت عروسی — معمولاً نیازی به ویرایش این فایل نیست.
   همه‌ی متن‌ها و تنظیمات در js/config.js هستند.
   ===================================================================== */
(function () {
  "use strict";

  var CFG = window.WEDDING_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var qs = new URLSearchParams(location.search);
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var LANGS = {
    fa: { label: "فارسی", locale: "fa-IR-u-ca-persian", dir: "rtl" },
    en: { label: "English", locale: "en-GB", dir: "ltr" },
    fr: { label: "Français", locale: "fr-FR", dir: "ltr" }
  };

  // «و» به‌جای علامت & (شکل تزئینی & در فونت‌های نوشتاری گاهی شبیه «ع» دیده می‌شود)
  var AND = { fa: "و", en: "and", fr: "et" };
  var guest = (qs.get("guest") || "").trim().slice(0, 60);
  var target = new Date(CFG.date.iso);
  var lang = pickLang();
  var opened = false;

  /* ---------- ابزارها ---------- */
  function pickLang() {
    var q = qs.get("lang");
    if (q && CFG.languages.indexOf(q) > -1) return q;
    try {
      var s = localStorage.getItem("wc_lang");
      if (s && CFG.languages.indexOf(s) > -1) return s;
    } catch (e) {}
    return CFG.languages.indexOf(CFG.defaultLang) > -1 ? CFG.defaultLang : CFG.languages[0];
  }
  function C() { return CFG.content[lang]; }
  function toFa(s) { return String(s).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  function num(s) { return lang === "fa" ? toFa(s) : String(s); }
  function fill(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function setText(sel, text) {
    var n = $(sel);
    if (!n) return;
    n.textContent = text || "";
    n.hidden = !text;
  }
  function fmt(date, opts, l) {
    var o = { timeZone: CFG.date.timeZone };
    for (var k in opts) o[k] = opts[k];
    try { return new Intl.DateTimeFormat(LANGS[l || lang].locale, o).format(date); }
    catch (e) { return ""; }
  }

  /* ---------- گل و برگ (SVG) ---------- */
  function flowerSVG(c1, c2, petals, attrs, delay, size) {
    var p = "", i, a, step = 360 / petals;
    for (i = 0; i < petals; i++) {
      a = i * step;
      p += '<g transform="rotate(' + a + ' 50 50)"><path class="petal" style="--i:' + i +
        '" d="M50 50C37 41 36 20 50 6C64 20 63 41 50 50Z"/></g>';
    }
    for (i = 0; i < petals; i++) {
      a = i * step + step / 2;
      p += '<g transform="rotate(' + a + ' 50 50)"><path class="petal in" style="--i:' + (i + petals) +
        '" d="M50 50C42 44 41 31 50 21C59 31 58 44 50 50Z"/></g>';
    }
    p += '<circle class="core" cx="50" cy="50" r="6"/>' +
      '<circle class="dot" cx="47" cy="48" r="1.1"/><circle class="dot" cx="53" cy="49" r="1.1"/>' +
      '<circle class="dot" cx="50" cy="54" r="1.1"/>';
    return '<svg class="flower" viewBox="0 0 100 100"' + (attrs ? " " + attrs : "") +
      ' style="--c1:' + c1 + ';--c2:' + c2 +
      (delay != null ? ";--d:" + delay + "s" : "") +
      (size ? ";--fs:" + size + "px" : "") +
      '" aria-hidden="true">' + p + "</svg>";
  }
  function leafSVG() {
    return '<svg class="leaf" viewBox="0 0 100 100" aria-hidden="true">' +
      '<path d="M6 94C4 46 36 8 94 6C94 62 58 94 6 94Z"/>' +
      '<path class="vein" d="M10 90C36 62 62 36 88 12"/></svg>';
  }

  var PALETTES = [
    ["#f7d9de", "#e59aae"],   // گلبهی
    ["#fff4ee", "#e9b8a8"],   // عاجی
    ["#e9d6f0", "#b58cc8"],   // یاسی
    ["#fbe3c9", "#e7a977"]    // هلویی
  ];

  function buildGarden() {
    var host = $("#garden");
    if (!host) return;
    // [x%, y%, اندازه به vmin, چرخش, تأخیر(ثانیه), شماره‌ی پالت, تعداد گلبرگ]
    var corner = [
      [6, 6, 34, 10, 0.1, 0, 9], [23, 3, 21, -20, 0.5, 1, 8],
      [3, 23, 23, 25, 0.7, 2, 8], [18, 16, 17, 0, 1.0, 3, 7]
    ];
    var html = "";
    function add(x, y, s, r, d, pal, n, mirrorX, mirrorY) {
      var fx = mirrorX ? 100 - x : x, fy = mirrorY ? 100 - y : y;
      html += '<div class="fl" style="--x:' + fx + "%;--y:" + fy + "%;--s:" + s + "vmin;--r:" + r +
        "deg;--d:" + d + 's">' + flowerSVG(PALETTES[pal][0], PALETTES[pal][1], n) + "</div>";
    }
    function leaf(x, y, s, r, d, mirrorX, mirrorY) {
      var fx = mirrorX ? 100 - x : x, fy = mirrorY ? 100 - y : y;
      html += '<div class="lf" style="--x:' + fx + "%;--y:" + fy + "%;--s:" + s + "vmin;--r:" + r +
        "deg;--d:" + d + 's">' + leafSVG() + "</div>";
    }
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(function (m, idx) {
      var mx = !!m[0], my = !!m[1], k = idx * 0.15;
      // برگ‌ها پشت گل‌ها
      leaf(14, 4, 20, mx ? 200 : 20, 0.0 + k, mx, my);
      leaf(4, 14, 20, mx ? 250 : 70, 0.1 + k, mx, my);
      leaf(24, 11, 15, mx ? 220 : 40, 0.2 + k, mx, my);
      corner.forEach(function (c) {
        add(c[0], c[1], c[2], c[3], c[4] + k, (c[5] + idx) % PALETTES.length, c[6], mx, my);
      });
    });
    host.innerHTML = html;
  }

  /* ---------- ساقه، برگ و گل دور طاق ----------
     یک ساقه‌ی پیچ‌خورده دو طرف خط طلایی طاق را می‌گیرد و در بالا به هم می‌رسد.
     انیمیشن‌ها با SMIL (داخل خود SVG) ساخته شده‌اند تا در همه‌ی مرورگرها یکسان رفتار کنند.
     برای خاموش‌کردن: در config.js بنویسید  decoration: { vine: false }  */
  var vineDrawn = false, vineT0 = 0;
  var LEAF_COLORS = ["#5f8070", "#6f9480", "#7f9c8a", "#8fb09b"];
  var SPLINE = ' calcMode="spline" keyTimes="0;1" keySplines=".2 .8 .2 1"';

  function seeded(seed) {
    return function () { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  }

  function buildVine() {
    if (CFG.decoration && CFG.decoration.vine === false) return;
    var arch = $(".arch");
    if (!arch) return;
    var W = arch.offsetWidth, H = arch.offsetHeight;
    if (W < 160 || H < W / 2 + 80) return;          // هنوز نمایش داده نشده
    var old = arch.querySelector(".vine");
    if (old) old.remove();

    var elapsed = vineT0 ? (performance.now() - vineT0) / 1000 : 0;   // چند ثانیه از شروع انیمیشن گذشته
    var anim = !reduceMotion && elapsed < 5.5;
    var M = 34;                         // حاشیه‌ی اضافه دور طاق برای گل‌هایی که بیرون می‌زنند
    var I = 9;                          // فاصله‌ی خط طلایی از لبه (مثل css)
    var R = W / 2 - I;
    var straight = H - I - W / 2;
    var total = straight + Math.PI * R / 2;
    var T0 = 0.6, TD = 2.6;             // شروع و مدت رشد (ثانیه)
    var out = "";

    // نقطه‌ی روی خط (سمت چپ) با مماس و عمود بیرونی؛ m = آینه برای سمت راست
    function base(s) {
      if (s <= straight) return { x: I, y: H - I - s, tx: 0, ty: -1, nx: -1, ny: 0 };
      var a = (s - straight) / R, c = Math.cos(a), n = Math.sin(a);
      return { x: W / 2 - R * c, y: W / 2 - R * n, tx: n, ty: -c, nx: -c, ny: -n };
    }
    function pt(s, m) {
      var p = base(s);
      return m ? { x: W - p.x, y: p.y, tx: -p.tx, ty: p.ty, nx: -p.nx, ny: p.ny } : p;
    }
    function onStem(s, m, phase, amp) {
      var p = pt(s, m);
      var env = Math.max(0, Math.min(1, s / 50, (total - s) / 50));
      var o = amp * Math.sin(s / 11 + phase) * env;
      return { x: p.x + p.nx * o, y: p.y + p.ny * o, tx: p.tx, ty: p.ty, nx: p.nx, ny: p.ny };
    }
    function stemPath(m, phase, amp) {
      var d = "", len = 0, px = 0, py = 0, s = 0, p;
      for (; s < total; s += 3) {
        p = onStem(s, m, phase, amp);
        if (s) len += Math.hypot(p.x - px, p.y - py);
        d += (s === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1);
        px = p.x; py = p.y;
      }
      p = onStem(total, m, phase, amp);
      len += Math.hypot(p.x - px, p.y - py);
      return { d: d + "L" + p.x.toFixed(1) + " " + p.y.toFixed(1), len: Math.ceil(len) + 2 };
    }

    // رشد از صفر تا یک حول مبدأ محلی (0,0) — بدون transform-origin
    function scaleIn(inner, delay, dur) {
      if (!anim) return inner;
      return '<g transform="scale(0)">' + inner +
        '<animateTransform attributeName="transform" type="scale" from="0" to="1" begin="' + delay.toFixed(2) +
        's" dur="' + dur + 's" fill="freeze"' + SPLINE + "/></g>";
    }
    function stem(m, phase, amp, cls, delay) {
      var sp = stemPath(m, phase, amp);
      out += '<path class="vstem' + cls + '" d="' + sp.d + '"' +
        (anim ? ' stroke-dasharray="' + sp.len + '" stroke-dashoffset="' + sp.len + '"' : "") + ">" +
        (anim ? '<animate attributeName="stroke-dashoffset" from="' + sp.len + '" to="0" begin="' + delay.toFixed(2) +
          's" dur="' + TD + 's" fill="freeze"/>' : "") + "</path>";
    }
    function leaf(x, y, ang, k, color, delay) {
      out += '<g transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang.toFixed(0) +
        ") scale(" + k.toFixed(2) + ')">' +
        scaleIn('<path d="M0 0C5 -6 15 -6 23 0C15 6 5 6 0 0Z" fill="' + color + '"/>' +
          '<path d="M1.5 0L19 0" stroke="rgba(255,255,255,.35)" stroke-width=".9" fill="none"/>', delay, 0.9) + "</g>";
    }
    function bloom(x, y, size, pal, petals, rot, delay) {
      var half = size / 2;
      var f = flowerSVG(PALETTES[pal][0], PALETTES[pal][1], petals,
        'x="' + (-half) + '" y="' + (-half) + '" width="' + size + '" height="' + size + '"');
      if (anim) {
        f = '<g transform="rotate(-50)">' + f +
          '<animateTransform attributeName="transform" type="rotate" from="-50" to="0" begin="' + delay.toFixed(2) +
          's" dur="1.5s" fill="freeze"' + SPLINE + "/></g>";
      }
      out += '<g transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + rot + ')">' +
        scaleIn(f, delay, 1.5) + "</g>";
    }

    var AMP = 5.5;
    // ۱) ساقه‌ها و برگ‌ها
    [false, true].forEach(function (m, vi) {
      var rnd = seeded(7 + vi * 13), phase = vi ? 1.7 : 0, s, i = 0;
      stem(m, phase, AMP, "", T0);
      stem(m, phase + Math.PI, 3.8, " thin", T0 + 0.15);
      for (s = 24; s < total - 36; s += 21 + rnd() * 6) {
        var side = (i++ % 2) ? 1 : -1;
        var p = onStem(s, m, phase, AMP);
        var phi = (40 + rnd() * 22) * Math.PI / 180;
        var dx = Math.cos(phi) * p.tx + Math.sin(phi) * side * p.nx;
        var dy = Math.cos(phi) * p.ty + Math.sin(phi) * side * p.ny;
        var k = (side > 0 ? 1 : 0.78) * (0.85 + rnd() * 0.4);
        var dl = T0 + 0.1 + (s / total) * TD;
        leaf(p.x, p.y, Math.atan2(dy, dx) * 180 / Math.PI, k, LEAF_COLORS[Math.floor(rnd() * LEAF_COLORS.length)], dl);
        if (rnd() < 0.2) {                       // غنچه‌ی کوچک
          var bx = p.x - side * p.nx * 9 + p.tx * 4, by = p.y - side * p.ny * 9 + p.ty * 4;
          out += '<line x1="' + p.x.toFixed(1) + '" y1="' + p.y.toFixed(1) + '" x2="' + bx.toFixed(1) +
            '" y2="' + by.toFixed(1) + '" stroke="#6f9480" stroke-width="1"' + (anim ? ' opacity="0"' : "") + ">" +
            (anim ? '<animate attributeName="opacity" from="0" to="1" begin="' + dl.toFixed(2) + 's" dur=".6s" fill="freeze"/>' : "") +
            '</line><g transform="translate(' + bx.toFixed(1) + " " + by.toFixed(1) + ')">' +
            scaleIn('<circle r="2.4" fill="#d68c9f"/>', dl + 0.2, 0.7) + "</g>";
        }
      }
    });

    // ۲) گل‌های کوچک روی ساقه
    [false, true].forEach(function (m, vi) {
      var phase = vi ? 1.7 : 0;
      [[0.3, 24, 0], [0.58, 20, 2], [0.82, 26, 3]].forEach(function (f, j) {
        var p = onStem(total * f[0], m, phase, AMP);
        bloom(p.x, p.y, f[1], (f[2] + vi) % PALETTES.length, 8, j * 25 + vi * 12, T0 + 0.25 + f[0] * TD);
      });
    });

    // ۳) دسته‌گل‌های گوشه‌ی پایین
    [false, true].forEach(function (m, vi) {
      var cx = m ? W - I : I, cy = H - I, dir = m ? -1 : 1;
      [-150, -110, -70, -30].forEach(function (a, j) {
        leaf(cx, cy, m ? 180 - a : a, 1.15 + (j % 2) * 0.15, LEAF_COLORS[(j + vi) % LEAF_COLORS.length], T0 + 0.05 + j * 0.06);
      });
      bloom(cx + dir * 22, cy - 5, 26, (1 + vi * 2) % PALETTES.length, 7, 10, T0 + 0.25);
      bloom(cx, cy - 2, 44, vi ? 3 : 0, 9, vi * 20, T0 + 0.1);
    });

    // ۴) گل بزرگ بالای طاق
    [false, true].forEach(function (m, vi) {
      var p = onStem(total - 40, m, vi ? 1.7 : 0, AMP);
      bloom(p.x, p.y, 24, vi ? 0 : 2, 8, 15, T0 + TD - 0.1);
    });
    [-165, -125, -55, -15].forEach(function (a, j) {
      leaf(W / 2, I, a, 1.2, LEAF_COLORS[j % LEAF_COLORS.length], T0 + TD - 0.2);
    });
    bloom(W / 2, I, 52, 1, 10, 0, T0 + TD);

    arch.insertAdjacentHTML("beforeend",
      '<svg class="vine" width="' + (W + 2 * M) + '" height="' + (H + 2 * M) + '" viewBox="' + (-M) + " " + (-M) + " " +
      (W + 2 * M) + " " + (H + 2 * M) + '" aria-hidden="true" focusable="false">' + out + "</svg>");
    var el = arch.querySelector(".vine");
    if (anim && el && el.setCurrentTime) {
      try { el.setCurrentTime(elapsed); el.unpauseAnimations(); } catch (e) {}
    }
    if (!vineT0) vineT0 = performance.now();
    vineDrawn = true;
  }

  // اولین ساخت بعد از آماده‌شدن فونت‌ها و ثابت‌شدن اندازه‌ی طاق انجام می‌شود
  // (تا بارگذاری دیرهنگام فونت، جای گل‌های پایین را عوض نکند).
  // اگر بعد از آن اندازه عوض شد، ساقه‌ها دوباره و با ادامه‌ی همان انیمیشن ساخته می‌شوند.
  function watchArch() {
    var arch = $(".arch"), timer = 0;
    if (!arch) return;
    function fontsReady() {
      var slow = new Promise(function (r) { setTimeout(r, 2500); });
      return (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, slow]) : Promise.resolve();
    }
    function later() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (vineDrawn) { buildVine(); return; }
        fontsReady().then(function () { setTimeout(buildVine, 150); });
      }, vineDrawn ? 120 : 300);
    }
    if (window.ResizeObserver) new ResizeObserver(later).observe(arch);
    else window.addEventListener("resize", later);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(later);
  }

  function buildOrnaments() {
    document.querySelectorAll("[data-flower]").forEach(function (n) {
      n.innerHTML = flowerSVG("#f7d9de", "#d68c9f", 8);
    });
  }

  /* ---------- پس‌زمینه ---------- */
  function applyBackground() {
    var bg = $("#bg"), b = CFG.background || {};
    var mobile = window.matchMedia && matchMedia("(max-width: 700px)").matches;
    var src = (mobile && b.imageMobile) ? b.imageMobile : b.image;
    bg.style.setProperty("--bg-overlay", b.overlay != null ? b.overlay : 0.2);
    bg.style.setProperty("--bg-pos", b.position || "center");
    document.documentElement.style.setProperty("--panel-alpha", b.panelOpacity != null ? b.panelOpacity : 0.92);
    if (!src) { bg.style.backgroundImage = ""; bg.classList.remove("has-image"); return; }
    var img = new Image();
    img.onload = function () {
      // مسیر کامل نسبت به صفحه (نه نسبت به فایل CSS)
      var abs = new URL(src, document.baseURI).href;
      bg.style.backgroundImage = 'url("' + abs + '")';
      bg.classList.add("has-image");
    };
    img.onerror = function () {
      bg.style.backgroundImage = "";
      bg.classList.remove("has-image");
    };
    img.src = src;
  }

  /* ---------- موسیقی ---------- */
  var music = (function () {
    var m = CFG.music || {};
    var audio = null, yt = null, ytReady = false, want = false, playing = false, broken = false;
    var btn = $("#musicBtn");

    function available() {
      if (broken) return false;
      return (m.type === "youtube" && !!m.youtubeId) || (m.type === "file" && !!m.src);
    }
    function setPlaying(v) {
      playing = v;
      document.body.classList.toggle("music-on", v);
      btn.setAttribute("aria-pressed", v ? "true" : "false");
    }
    function failed() { broken = true; btn.hidden = true; setPlaying(false); }

    function init() {
      if (!available()) { btn.hidden = true; return; }
      if (m.type === "file") {
        audio = new Audio();
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = m.volume != null ? m.volume : 0.6;
        audio.addEventListener("error", failed);
        audio.addEventListener("loadedmetadata", function () {
          if (m.startAt) { try { audio.currentTime = m.startAt; } catch (e) {} }
        });
        audio.src = m.src;
      } else {
        window.onYouTubeIframeAPIReady = function () {
          yt = new YT.Player("ytHost", {
            height: "1", width: "1", videoId: m.youtubeId,
            playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: m.youtubeId, playsinline: 1, rel: 0, start: m.startAt || 0 },
            events: {
              onReady: function () {
                ytReady = true;
                try { yt.setVolume(Math.round((m.volume != null ? m.volume : 0.6) * 100)); } catch (e) {}
                if (want) play();
              },
              onStateChange: function (e) { setPlaying(e.data === 1); },
              onError: failed
            }
          });
        };
        var s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        s.onerror = failed;
        document.head.appendChild(s);
      }
    }
    function play() {
      want = true;
      if (audio) {
        var pr = audio.play();
        if (pr && pr.then) pr.then(function () { setPlaying(true); }, function () { setPlaying(false); });
        else setPlaying(true);
      } else if (yt && ytReady) {
        yt.playVideo();
      }
    }
    function pause() {
      want = false;
      if (audio) audio.pause();
      if (yt && ytReady) yt.pauseVideo();
      setPlaying(false);
    }
    function toggle() { playing ? pause() : play(); }

    btn.addEventListener("click", toggle);
    init();
    return { play: play, pause: pause, available: available };
  })();

  /* ---------- پاکت ---------- */
  function openEnvelope() {
    if (opened) return;
    opened = true;
    var splash = $("#splash"), env = $("#envelope"), card = $("#card");
    env.classList.add("open");
    music.play();

    var t1 = reduceMotion ? 150 : 1900, t2 = reduceMotion ? 500 : 2900;
    setTimeout(function () {
      card.hidden = false;
      document.body.classList.remove("is-locked");
      window.scrollTo(0, 0);
      card.classList.add("shown");
      splash.classList.add("leaving");
      if (music.available()) $("#musicBtn").hidden = false;
    }, t1);
    setTimeout(function () { splash.hidden = true; }, t2);
  }

  function skipIntro() {
    opened = true;
    $("#splash").hidden = true;
    $("#card").hidden = false;
    $("#card").classList.add("shown");
    document.body.classList.remove("is-locked");
    if (music.available()) $("#musicBtn").hidden = false;
  }

  /* ---------- رندر متن‌ها ---------- */
  function renderLangSwitch() {
    var box = $("#langSwitch");
    box.innerHTML = "";
    if (CFG.languages.length < 2) { box.hidden = true; return; }
    CFG.languages.forEach(function (code) {
      var b = el("button", "", LANGS[code].label);
      b.type = "button";
      b.lang = code;
      b.setAttribute("aria-pressed", code === lang ? "true" : "false");
      b.addEventListener("click", function (e) { e.stopPropagation(); setLang(code); });
      box.appendChild(b);
    });
  }

  function setLang(code) {
    lang = code;
    try { localStorage.setItem("wc_lang", code); } catch (e) {}
    render();
  }

  function render() {
    var c = C(), root = document.documentElement;
    root.lang = lang;
    root.dir = LANGS[lang].dir;
    document.title = c.meta.title;
    renderLangSwitch();

    var both = c.names[0] + " " + AND[lang] + " " + c.names[1];
    $("#splashNames").textContent = both;
    $("#letterNames").textContent = both;
    $("#sealText").textContent = c.sealText;
    $("#tapHint").textContent = c.tapHint;
    $("#envelope").setAttribute("aria-label", c.ui.open);
    $("#musicBtn").setAttribute("aria-label", c.ui.music);
    $("#musicBtn").title = c.ui.music;

    // صفحه‌ی اصلی
    setText("#topLine", c.topLine);
    setText("#greeting", guest ? fill(c.greeting, { name: guest }) : "");
    var names = $("#names");
    names.innerHTML = "";
    names.appendChild(el("span", "", c.names[0]));
    names.appendChild(el("span", "amp", AND[lang]));
    names.appendChild(el("span", "", c.names[1]));
    setText("#invite", c.invite);

    var poem = $("#poem");
    poem.innerHTML = "";
    for (var i = 0; i < c.poem.length; i += 2) {
      var beyt = el("div", "beyt");
      beyt.appendChild(el("span", "mesra", c.poem[i]));
      if (c.poem[i + 1]) beyt.appendChild(el("span", "mesra", c.poem[i + 1]));
      poem.appendChild(beyt);
    }
    if (c.poemBy) poem.appendChild(el("p", "poem-by", c.poemBy));

    // تاریخ و ساعت
    var custom = CFG.date.customText && CFG.date.customText[lang];
    $("#dateMain").textContent = custom ||
      fmt(target, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var sub = "";
    if (!custom && lang === "fa" && CFG.date.showSecondaryDate) {
      sub = fmt(target, { day: "numeric", month: "long", year: "numeric" }, "en");
    }
    setText("#dateSub", sub);
    var time = fmt(target, { hour: "2-digit", minute: "2-digit", hour12: false });
    setText("#dateTime", fill(c.timeLabel, { time: time }));

    // شمارش معکوس
    $("#cdTitle").textContent = c.countdown.title;
    $("#cdDL").textContent = c.countdown.days;
    $("#cdHL").textContent = c.countdown.hours;
    $("#cdML").textContent = c.countdown.minutes;
    $("#cdSL").textContent = c.countdown.seconds;
    tick();

    // مکان
    $("#venueTitle").textContent = c.venue.title;
    $("#venueName").textContent = c.venue.name;
    $("#venueAddr").textContent = c.venue.address;
    renderMapButtons();

    // برنامه
    $("#scheduleTitle").textContent = c.schedule.title;
    var tl = $("#timeline");
    tl.innerHTML = "";
    CFG.schedule.forEach(function (it) {
      var li = el("li", "tl-item");
      li.appendChild(el("span", "tl-time", num(it.time)));
      var body = el("div", "tl-body");
      body.appendChild(el("p", "tl-title", it.title[lang] || ""));
      if (it.desc && it.desc[lang]) body.appendChild(el("p", "tl-desc", it.desc[lang]));
      li.appendChild(body);
      tl.appendChild(li);
    });

    renderRsvp();
    $("#footerText").textContent = c.footer;
  }

  /* ---------- نقشه ---------- */
  function buildMap() {
    var v = CFG.venue, box = $("#mapBox"), src = v.embedUrl;
    if (!src && v.lat != null && v.lng != null) {
      var dx = 0.006, dy = 0.0035;
      src = "https://www.openstreetmap.org/export/embed.html?bbox=" +
        [v.lng - dx, v.lat - dy, v.lng + dx, v.lat + dy].join("%2C") +
        "&layer=mapnik&marker=" + v.lat + "%2C" + v.lng;
    }
    if (!src) { box.hidden = true; return; }
    var f = document.createElement("iframe");
    f.src = src; f.loading = "lazy"; f.title = "Map";
    f.referrerPolicy = "no-referrer-when-downgrade";
    box.appendChild(f);
  }

  function renderMapButtons() {
    var v = CFG.venue, c = C(), row = $("#mapBtns");
    row.innerHTML = "";
    if (v.lat == null || v.lng == null) return;
    var ll = v.lat + "," + v.lng;
    var links = [
      [c.venue.google, v.googleUrl || ("https://www.google.com/maps/search/?api=1&query=" + ll), true],
      [c.venue.apple, "https://maps.apple.com/?ll=" + ll + "&q=" + encodeURIComponent(c.venue.name)],
      [c.venue.waze, "https://waze.com/ul?ll=" + ll + "&navigate=yes"]
    ];
    links.forEach(function (l) {
      var a = el("a", "btn" + (l[2] ? " primary" : ""), l[0]);
      a.href = l[1]; a.target = "_blank"; a.rel = "noopener";
      row.appendChild(a);
    });
  }

  /* ---------- پاسخ به دعوت و تقویم ---------- */
  function renderRsvp() {
    var r = CFG.rsvp || {}, c = C(), sec = $("#rsvp");
    var row = $("#rsvpBtns"), cal = $("#calBtns");
    row.innerHTML = ""; cal.innerHTML = "";

    var vars = { guest: guest || "" };
    var msg = fill(c.rsvp.whatsappMsg, vars).replace(/\s+/g, " ").replace(/^\s+/, "");
    var any = false;
    if (r.whatsapp) {
      var w = el("a", "btn primary", c.rsvp.whatsapp);
      w.href = "https://wa.me/" + r.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg);
      w.target = "_blank"; w.rel = "noopener"; row.appendChild(w); any = true;
    }
    if (r.email) {
      var m = el("a", "btn" + (r.whatsapp ? "" : " primary"), c.rsvp.email);
      m.href = "mailto:" + r.email + "?subject=" + encodeURIComponent(c.rsvp.emailSubject) +
        "&body=" + encodeURIComponent(msg);
      row.appendChild(m); any = true;
    }
    if (r.formUrl) {
      var f = el("a", "btn", c.rsvp.form);
      f.href = r.formUrl; f.target = "_blank"; f.rel = "noopener"; row.appendChild(f); any = true;
    }

    var deadline = r.deadline ? fmt(new Date(r.deadline + "T12:00:00"), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "";
    $("#rsvpTitle").textContent = c.rsvp.title;
    $("#rsvpText").textContent = deadline ? fill(c.rsvp.text, { deadline: deadline }) : "";
    $("#rsvpText").hidden = !deadline;
    $("#rsvpTitle").hidden = !any;
    $("#rsvpText").hidden = !any || !deadline;
    row.hidden = !any;

    var add = el("button", "btn", c.calendar.add);
    add.type = "button";
    add.addEventListener("click", downloadICS);
    var g = el("a", "btn", c.calendar.google);
    g.href = googleCalUrl(); g.target = "_blank"; g.rel = "noopener";
    cal.appendChild(add); cal.appendChild(g);
    cal.classList.toggle("cal", any);
    sec.hidden = false;
  }

  function endDate() {
    return new Date(target.getTime() + (CFG.date.durationHours || 6) * 3600 * 1000);
  }
  function icsDate(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  function icsEsc(s) {
    return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  }
  function locationText() {
    var c = C();
    return c.venue.name + ", " + c.venue.address.replace(/\n/g, ", ");
  }
  function downloadICS() {
    var c = C();
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//WeddingCard//EN", "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:" + icsDate(target) + "@wedding-card",
      "DTSTAMP:" + icsDate(new Date()),
      "DTSTART:" + icsDate(target),
      "DTEND:" + icsDate(endDate()),
      "SUMMARY:" + icsEsc(c.calendar.eventTitle),
      "LOCATION:" + icsEsc(locationText()),
      "DESCRIPTION:" + icsEsc(c.calendar.eventDesc),
      "END:VEVENT", "END:VCALENDAR"
    ];
    var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "wedding.ics";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }
  function googleCalUrl() {
    var c = C();
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(c.calendar.eventTitle) +
      "&dates=" + icsDate(target) + "/" + icsDate(endDate()) +
      "&location=" + encodeURIComponent(locationText()) +
      "&details=" + encodeURIComponent(c.calendar.eventDesc);
  }

  /* ---------- شمارش معکوس ---------- */
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var diff = target.getTime() - Date.now();
    var c = C(), grid = $("#cdGrid"), done = $("#cdDone");
    if (diff <= 0) {
      grid.hidden = true;
      done.hidden = false;
      var sameDay = fmt(new Date(), { year: "numeric", month: "numeric", day: "numeric" }, "en") ===
        fmt(target, { year: "numeric", month: "numeric", day: "numeric" }, "en");
      done.textContent = sameDay ? c.countdown.done : c.countdown.after;
      return;
    }
    grid.hidden = false; done.hidden = true;
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60); s -= m * 60;
    $("#cdD").textContent = num(d);
    $("#cdH").textContent = num(pad(h));
    $("#cdM").textContent = num(pad(m));
    $("#cdS").textContent = num(pad(s));
  }

  /* ---------- شروع ---------- */
  function start() {
    applyBackground();
    buildGarden();
    buildOrnaments();
    watchArch();
    buildMap();
    render();
    setInterval(tick, 1000);

    var splash = $("#splash"), env = $("#envelope");
    splash.addEventListener("click", openEnvelope);
    env.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
    });
    if (qs.get("intro") === "0") skipIntro();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
