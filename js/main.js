/* =========================================================
   Herederos de Cicumba — Interacciones de la landing
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // Cerrar el menú al hacer clic en un enlace (móvil)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .card, .coord, .event, .media-frame, .gallery__item, .contact__form"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: mostrar todo si no hay soporte
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Formulario de contacto (validación básica) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form__note";

      var nombre = form.nombre.value.trim();
      var email = form.email.value.trim();
      var mensaje = form.mensaje.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !email || !mensaje) {
        note.textContent = "Por favor completa todos los campos.";
        note.classList.add("err");
        return;
      }
      if (!emailOk) {
        note.textContent = "El correo no parece válido.";
        note.classList.add("err");
        return;
      }

      // NOTA: GitHub Pages es estático y no procesa formularios.
      // En la Fase 4 se puede conectar a Supabase o a un servicio de correo.
      // Por ahora abrimos el cliente de correo del usuario como fallback.
      var asunto = encodeURIComponent("Contacto web — " + nombre);
      var cuerpo = encodeURIComponent(mensaje + "\n\nDe: " + nombre + " (" + email + ")");
      window.location.href =
        "mailto:contacto@example.com?subject=" + asunto + "&body=" + cuerpo; // TODO: correo real

      note.textContent = "¡Gracias! Se abrirá tu correo para enviar el mensaje.";
      note.classList.add("ok");
      form.reset();
    });
  }
})();
