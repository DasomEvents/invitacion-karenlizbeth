/* ==========================================================================
   Karen Lizbeth · Mis 40 años — Invitación digital
   JavaScript: countdown, reveal-on-scroll, partículas sutiles,
   música de fondo (con manejo de autoplay y archivo ausente) y
   confirmación de asistencia por WhatsApp.
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ *
   * 1) Cuenta regresiva
   * ------------------------------------------------------------------ */
  (function initCountdown() {
    // 17 de octubre de 2026, 5:00 PM, hora de Ciudad de México (UTC-06:00, sin horario de verano).
    var eventDate = new Date("2026-10-17T17:00:00-06:00").getTime();

    var elDias = document.getElementById("cd-dias");
    var elHoras = document.getElementById("cd-horas");
    var elMin = document.getElementById("cd-min");
    var elSeg = document.getElementById("cd-seg");

    if (!elDias || !elHoras || !elMin || !elSeg) return;

    function pad(n) {
      return String(Math.max(0, n)).padStart(2, "0");
    }

    function tick() {
      var now = Date.now();
      var diff = eventDate - now;

      if (diff <= 0) {
        elDias.textContent = "00";
        elHoras.textContent = "00";
        elMin.textContent = "00";
        elSeg.textContent = "00";
        return;
      }

      var dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      var horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var min = Math.floor((diff / (1000 * 60)) % 60);
      var seg = Math.floor((diff / 1000) % 60);

      elDias.textContent = pad(dias);
      elHoras.textContent = pad(horas);
      elMin.textContent = pad(min);
      elSeg.textContent = pad(seg);
    }

    tick();
    window.setInterval(tick, 1000);
  })();

  /* ------------------------------------------------------------------ *
   * 2) Reveal on scroll (aparición progresiva y sutil de secciones)
   * ------------------------------------------------------------------ */
  (function initReveal() {
    var revealEls = document.querySelectorAll("[data-reveal]");

    if (!revealEls.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) { observer.observe(el); });

    // La portada se revela de inmediato al cargar, sin esperar scroll.
    var heroEls = document.querySelectorAll("#portada [data-reveal]");
    window.requestAnimationFrame(function () {
      heroEls.forEach(function (el) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    });
  })();

  /* ------------------------------------------------------------------ *
   * 3) Barra de progreso de scroll (hilo plateado sutil)
   * ------------------------------------------------------------------ */
  (function initScrollProgress() {
    var bar = document.getElementById("scrollProgressBar");
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ------------------------------------------------------------------ *
   * 4) Partículas / destellos muy sutiles en el canvas de la portada
   *    (se omiten por completo si el usuario prefiere menos movimiento)
   * ------------------------------------------------------------------ */
  function initParticles(canvasId) {
    if (prefersReducedMotion) return;

    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var particles = [];
    var width, height, dpr;
    var rafId = null;
    var running = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      var count = Math.min(46, Math.round((width * height) / 26000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + 0.4,
          baseAlpha: Math.random() * 0.35 + 0.15,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.15 + 0.03,
          driftX: (Math.random() - 0.5) * 0.06,
          driftY: -(Math.random() * 0.08 + 0.02)
        });
      }
    }

    function draw(time) {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var twinkle = Math.sin(time * 0.001 * p.speed * 4 + p.phase) * 0.5 + 0.5;
        var alpha = p.baseAlpha * (0.5 + twinkle * 0.5);

        p.x += p.driftX;
        p.y += p.driftY;

        if (p.y < -4) p.y = height + 4;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 231, 236, " + alpha.toFixed(3) + ")";
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    rafId = window.requestAnimationFrame(draw);

    window.addEventListener("resize", function () {
      resize();
      createParticles();
    });

    // Pausar el canvas cuando la pestaña no está visible (ahorro de batería).
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running && rafId === null) {
        rafId = window.requestAnimationFrame(draw);
      }
    });
  }

  initParticles("particles");
  initParticles("particles2");

  /* ------------------------------------------------------------------ *
   * 4b) Capa de brillantina animada para TODA la página: usa la
   *     librería Sparticles (js/vendor/sparticles.min.js) en vez de una
   *     animación hecha a mano, para un movimiento y parpadeo reales
   *     (caída suave + parpadeo tipo "twinkle" + giro) con muchas
   *     partículas a la vez. Se coloca POR ENCIMA del contenido (no es
   *     un fondo) y se omite por completo con prefers-reduced-motion.
   * ------------------------------------------------------------------ */
  (function initGlobalSparkles() {
    var container = document.getElementById("globalSparkles");
    if (!container || typeof window.Sparticles === "undefined") return;

    if (prefersReducedMotion) {
      container.style.display = "none";
      return;
    }

    new window.Sparticles(container, {
      count: 115,
      speed: 11,
      parallax: 22,
      direction: 180,
      xVariance: 6,
      yVariance: 3,
      rotate: true,
      rotation: 3,
      drift: 4,
      glow: 2,
      twinkle: true,
      alphaSpeed: 22,
      alphaVariance: 6,
      minAlpha: 0.18,
      maxAlpha: 0.85,
      minSize: 6,
      maxSize: 13,
      style: "fill",
      shape: ["star", "diamond", "circle"],
      color: ["#ffffff", "#f2f2f4", "#e2e3e8", "#c7c9cf"]
    });
  })();

  /* ------------------------------------------------------------------ *
   * 5) Música de fondo: play/pause, volumen inicial 50%,
   *    manejo elegante de restricciones de autoplay y de archivo ausente.
   * ------------------------------------------------------------------ */
  (function initMusic() {
    var audio = document.getElementById("bgMusic");
    var toggle = document.getElementById("musicToggle");
    var iconPlay = document.getElementById("iconPlay");
    var iconPause = document.getElementById("iconPause");
    var status = document.getElementById("musicStatus");
    var tooltip = document.getElementById("musicTooltip");

    if (!audio || !toggle) return;

    audio.volume = 0.5;

    var audioUnavailable = false;
    var triedAutoStart = false;
    var tooltipTimer = null;

    function setPlayingUI(isPlaying) {
      toggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
      toggle.setAttribute("aria-label", isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo");
      iconPlay.hidden = isPlaying;
      iconPause.hidden = !isPlaying;
    }

    function announce(message) {
      if (status) status.textContent = message;
    }

    // Muestra un mensaje visible junto al botón (no solo para lectores de
    // pantalla) para que quede claro que el botón SÍ respondió al clic,
    // incluso cuando party.mp3 todavía no existe.
    function showTooltip(message) {
      if (!tooltip) return;
      tooltip.textContent = message;
      tooltip.classList.add("is-shown");
      window.clearTimeout(tooltipTimer);
      tooltipTimer = window.setTimeout(function () {
        tooltip.classList.remove("is-shown");
      }, 3200);
    }

    // Si el archivo party.mp3 todavía no existe, el resto de la página
    // debe seguir funcionando con total normalidad.
    audio.addEventListener("error", function () {
      audioUnavailable = true;
      setPlayingUI(false);
      announce("La música de fondo no está disponible todavía.");
    });

    function tryPlay(showFeedback) {
      if (audioUnavailable) {
        announce("La música de fondo no está disponible todavía.");
        if (showFeedback) showTooltip("Música aún no disponible: falta subir audio/party.mp3");
        return;
      }

      var playPromise = audio.play();

      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(function () {
            setPlayingUI(true);
            if (showFeedback) announce("Reproduciendo música de fondo.");
          })
          .catch(function () {
            // El navegador bloqueó el autoplay o el archivo aún no existe.
            setPlayingUI(false);
            if (showFeedback) {
              announce("Toca el botón de música para reproducir el audio.");
              showTooltip("Música aún no disponible: falta subir audio/party.mp3");
            }
          });
      }
    }

    toggle.addEventListener("click", function () {
      if (audio.paused) {
        tryPlay(true);
      } else {
        audio.pause();
        setPlayingUI(false);
        announce("Música en pausa.");
      }
    });

    // Intento elegante de inicio automático: en cuanto la persona
    // interactúa por primera vez con la página (clic, toque o scroll),
    // se intenta iniciar la música. Si el navegador lo impide, el botón
    // de Play permanece disponible para iniciarla manualmente.
    function firstInteraction() {
      if (!triedAutoStart && audio.paused && !audioUnavailable) {
        triedAutoStart = true;
        tryPlay(false);
      }
      window.removeEventListener("click", firstInteraction);
      window.removeEventListener("touchstart", firstInteraction);
      window.removeEventListener("scroll", firstInteraction);
      window.removeEventListener("keydown", firstInteraction);
    }

    window.addEventListener("click", firstInteraction, { passive: true });
    window.addEventListener("touchstart", firstInteraction, { passive: true });
    window.addEventListener("scroll", firstInteraction, { passive: true, once: true });
    window.addEventListener("keydown", firstInteraction);
  })();

  /* ------------------------------------------------------------------ *
   * 6) Confirmación de asistencia por WhatsApp
   * ------------------------------------------------------------------ */
  (function initRSVP() {
    var form = document.getElementById("rsvpForm");
    if (!form) return;

    var input = document.getElementById("guestName");
    var errorMsg = document.getElementById("guestNameError");
    var WHATSAPP_NUMBER = "527712277589";

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = (input.value || "").trim();

      if (!name) {
        input.classList.add("is-invalid");
        errorMsg.hidden = false;
        input.focus();
        return;
      }

      input.classList.remove("is-invalid");
      errorMsg.hidden = true;

      var message =
        "Hola, soy " + name +
        " y quiero confirmar mi asistencia al cumpleaños de Karen Lizbeth. " +
        "¡Nos vemos para celebrar sus 40 años!";

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

      window.open(url, "_blank", "noopener,noreferrer");
    });

    // Quita el estado de error en cuanto la persona empieza a escribir.
    input.addEventListener("input", function () {
      if (input.classList.contains("is-invalid") && input.value.trim()) {
        input.classList.remove("is-invalid");
        errorMsg.hidden = true;
      }
    });
  })();

})();
